import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { useAuth } from '@/features/auth/auth.context.jsx';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.email || !form.email.includes('@')) {
      setError('Enter a valid admin email address.');
      return;
    }

    if (!form.password || form.password.length < 8) {
      setError('Enter a password with at least 8 characters.');
      return;
    }

    try {
      setSubmitting(true);
      await login(form);
      const destination = location.state?.from?.pathname || '/admin';
      navigate(destination, { replace: true });
    } catch (loginError) {
      // Extract specific error message from server if available
      const message = loginError.response?.data?.message || 'Invalid credentials';
      setError(message === 'Invalid email or password.' ? 'Invalid credentials' : message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
        <BrandMark theme="dark" />
        <h1 className="mt-6 font-display text-3xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-300">
          Sign in to access the foundation dashboard, manage content, and review operations.
        </p>
      </div>

      <form className="space-y-5 px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
        <div className="block space-y-2">
          <span className="text-sm font-medium text-brand-dark">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-brand-border bg-white px-4 py-3 outline-none transition focus:border-brand-blue"
            placeholder="Enter email"
          />
        </div>

        <div className="block space-y-2">
          <span className="text-sm font-medium text-brand-dark">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-brand-border bg-white px-4 py-3 pr-12 outline-none transition focus:border-brand-blue"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-blue"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Enter admin panel'}
        </Button>
      </form>
    </div>
  );
}
