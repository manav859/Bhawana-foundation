export function Card({ children, className = '', onClick, image, imageAlt }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} ${className}`}
    >
      {image && (
        <div className="w-full aspect-video overflow-hidden bg-slate-50">
          <img
            src={image}
            alt={imageAlt || ''}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-border-light ${className}`}>
      {children}
    </div>
  );
}
