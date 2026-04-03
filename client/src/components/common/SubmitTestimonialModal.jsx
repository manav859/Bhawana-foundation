import { useState } from 'react';
import { Modal } from '@/components/ui/Modal.jsx';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { publicService } from '@/features/api/services/public.service.js';

export function SubmitTestimonialModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await publicService.submitTestimonial(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', role: '', quote: '' });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSuccess(false);
      setError(null);
      setFormData({ name: '', role: '', quote: '' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Your Testimonial">
      {success ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 font-sans">
            Your testimonial has been submitted successfully and is pending review.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm font-sans">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <FormInput
              label="Full Name *"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              maxLength={100}
            />
            <FormInput
              label="Role / Relation (Optional)"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Volunteer, Donor, Beneficiary"
              maxLength={100}
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote" className="text-sm font-medium text-slate-700">
                Your Testimonial *
              </label>
              <textarea
                id="quote"
                required
                rows={4}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                placeholder="Share your experience with us..."
                maxLength={1000}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-primary-blue px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-blue/90 disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
