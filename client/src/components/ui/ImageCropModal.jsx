import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, RotateCw, ZoomIn, Check } from 'lucide-react';

/**
 * Utility: create a cropped image blob from canvas.
 */
function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.crossOrigin = 'anonymous';
    image.src = url;
  });
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const rotRad = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rotRad));
  const cos = Math.abs(Math.cos(rotRad));
  const bBoxWidth = image.width * cos + image.height * sin;
  const bBoxHeight = image.width * sin + image.height * cos;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      'image/jpeg',
      0.92
    );
  });
}

const ASPECT_PRESETS = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];

export function ImageCropModal({ imageSrc, onCancel, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropDone = useCallback((_croppedArea, croppedAreaPixelsVal) => {
    setCroppedAreaPixels(croppedAreaPixelsVal);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    try {
      setProcessing(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedBlob);
    } catch (err) {
      console.error('Crop failed:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-[720px] overflow-hidden animate-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <h3 className="font-display text-lg font-semibold text-text-dark">Crop & Adjust Image</h3>
          <button onClick={onCancel} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full h-[400px] bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropDone}
          />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 space-y-4 border-t border-border-light">
          {/* Aspect Ratio Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-secondary mr-1">Ratio:</span>
            {ASPECT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setAspect(preset.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  aspect === preset.value
                    ? 'bg-primary-blue border-primary-blue text-white'
                    : 'bg-white border-border-light text-text-secondary hover:border-primary-blue/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Zoom + Rotation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 flex-1">
              <ZoomIn className="w-4 h-4 text-text-secondary shrink-0" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-primary-blue"
              />
              <span className="text-xs text-text-secondary w-10 text-right">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <RotateCw className="w-4 h-4 text-text-secondary shrink-0" />
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="flex-1 accent-primary-blue"
              />
              <span className="text-xs text-text-secondary w-10 text-right">{rotation}°</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-light bg-bg-light">
          <button
            onClick={onCancel}
            disabled={processing}
            className="px-5 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-secondary hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-blue text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60"
          >
            <Check className="w-4 h-4" />
            {processing ? 'Processing...' : 'Crop & Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
