import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart, Heart, Share2, Star, Minus, Plus, ChevronRight,
  Loader2, AlertCircle, Copy, CheckCircle, Package,
} from 'lucide-react';
import { shopService } from '@/features/api/services/shop.service.js';
import { useCart } from '@/features/cart/CartContext.jsx';

export function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart, items } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await shopService.getProduct(slug);
        setProduct(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="w-16 h-16 text-gray-200 mb-4" />
        <h2 className="text-xl font-semibold text-text-dark">{error || 'Product not found'}</h2>
        <Link to="/shop" className="mt-4 px-6 py-2.5 bg-primary-blue text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0 && !product.isDonationOnly;
  const inCart = items.find((i) => i.productId === product._id);
  const images = product.images?.length > 0 ? product.images : [];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link to="/shop" className="hover:text-primary-blue transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          {product.category && (
            <>
              <span>{product.category.name}</span>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-text-dark font-medium truncate">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-border-light">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package className="w-24 h-24" />
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary-blue' : 'border-transparent hover:border-border-light'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Category & Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && (
                <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue text-xs font-bold rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              {product.isFeatured && (
                <span className="px-3 py-1 bg-warm-orange/10 text-warm-orange text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
              {product.isDonationOnly && (
                <span className="px-3 py-1 bg-success-green/10 text-success-green text-xs font-bold rounded-full">
                  Donation Only
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-text-dark leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-text-dark">₹{product.price.toLocaleString()}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-text-muted line-through">₹{product.compareAtPrice.toLocaleString()}</span>
                  <span className="px-2 py-0.5 bg-coral-red/10 text-coral-red text-sm font-bold rounded-full">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {isOutOfStock ? (
                <span className="flex items-center gap-1.5 text-sm text-coral-red font-medium">
                  <span className="w-2 h-2 rounded-full bg-coral-red" /> Out of Stock
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm text-success-green font-medium">
                  <span className="w-2 h-2 rounded-full bg-success-green" /> In Stock ({product.stock} available)
                </span>
              )}
            </div>

            {/* Description */}
            {product.shortDescription && (
              <p className="text-text-secondary leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Impact Message */}
            {product.impactMessage && (
              <div className="bg-gradient-to-r from-primary-blue/5 to-warm-orange/5 rounded-xl p-4 border border-primary-blue/10">
                <p className="text-sm font-semibold text-primary-blue">
                  🌟 {product.impactMessage}
                </p>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border-light rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-3 hover:bg-bg-light transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-text-dark min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-3 hover:bg-bg-light transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                    added ? 'bg-success-green' : 'bg-gradient-to-r from-primary-blue to-blue-600 hover:shadow-lg hover:shadow-primary-blue/25'
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}

            {inCart && !added && (
              <p className="text-sm text-success-green font-medium">
                ✓ {inCart.quantity} in your cart
              </p>
            )}

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-blue transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-success-green" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Link Copied!' : 'Share this product'}
            </button>
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-text-dark mb-6">About This Product</h2>
            <div
              className="prose prose-slate max-w-none prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Child Story */}
        {product.childStory?.name && (
          <div className="mt-16 bg-gradient-to-br from-warm-orange/5 via-white to-primary-blue/5 rounded-3xl p-8 lg:p-12 border border-warm-orange/10">
            <h2 className="font-display text-2xl font-bold text-text-dark mb-6 flex items-center gap-2">
              ❤️ Meet the Artist
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {product.childStory.photo && (
                <img
                  src={product.childStory.photo}
                  alt={product.childStory.name}
                  className="w-40 h-40 rounded-2xl object-cover shadow-lg flex-shrink-0"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-text-dark">
                  {product.childStory.name}
                  {product.childStory.age && (
                    <span className="text-text-muted font-normal ml-2">Age {product.childStory.age}</span>
                  )}
                </h3>
                {product.childStory.story && (
                  <p className="mt-3 text-text-secondary leading-relaxed whitespace-pre-line">
                    {product.childStory.story}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
