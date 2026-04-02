const statusStyles = {
  draft: 'bg-gray-100 text-gray-700',
  published: 'bg-green-100 text-green-700',
  upcoming: 'bg-blue-100 text-blue-700',
  past: 'bg-slate-100 text-slate-600',
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-red-100 text-red-600',
  pending: 'bg-amber-100 text-amber-700',
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-600',
};

export function StatusBadge({ status, className = '' }) {
  const style = statusStyles[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${style} ${className}`}>
      {status}
    </span>
  );
}
