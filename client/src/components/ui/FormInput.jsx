export function FormInput({
  label,
  error,
  helperText,
  required,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-dark">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          className={`w-full px-4 py-3 rounded-lg border bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all font-sans text-[15px] resize-y ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-border-light'
          }`}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-lg border bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all font-sans text-[15px] ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-border-light'
          }`}
          {...props}
        />
      )}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-text-secondary">{helperText}</p>}
    </div>
  );
}
