import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { useAuth } from '@/features/auth/auth.context.jsx';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'admin@bhawnafoundation.org', password: 'password123' });
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
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
        <BrandMark theme="dark" />
        <h1 className="mt-6 font-display text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-300">
          Mock auth is enabled by default for Phase 1 so the protected admin shell can be reviewed before full authentication is built.
        </p>
      </div>

      <form className="space-y-5 px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-brand-dark">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-brand-border bg-white px-4 py-3 outline-none transition focus:border-brand-blue"
            placeholder="admin@bhawnafoundation.org"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-brand-dark">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="w-full rounded-2xl border border-brand-border bg-white px-4 py-3 outline-none transition focus:border-brand-blue"
            placeholder="Enter password"
          />
        </label>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Enter admin panel'}
        </Button>
      </form>
    </div>
  );
}