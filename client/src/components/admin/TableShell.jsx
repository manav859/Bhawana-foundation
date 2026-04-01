export function TableShell({ children, headings }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headings.map((heading, index) => (
                <th key={index} className="px-6 py-4 font-medium text-slate-900">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
