export function SectionHeader({ eyebrow, title, description, align = 'center', className = '' }) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`mb-12 max-w-2xl ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className="eyebrow mb-4 inline-block">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-brand-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
