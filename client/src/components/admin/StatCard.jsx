export function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-brand-green" />}
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-3xl font-semibold text-slate-900">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
