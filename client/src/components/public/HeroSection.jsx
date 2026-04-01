import { Button } from '@/components/ui/Button.jsx';
import { Container } from '@/components/common/Container.jsx';

export function HeroSection({
  title,
  highlightedText,
  description,
  primaryAction,
  secondaryAction,
  imageUrl,
  imageAlt,
  align = 'left',
}) {
  return (
    <section className="relative overflow-hidden bg-brand-light pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pb-40">
      <div className="absolute inset-0 bg-hero-fade opacity-50"></div>
      
      <Container className="relative z-10">
        <div className={`flex flex-col gap-12 lg:flex-row ${align === 'center' ? 'lg:flex-col lg:items-center text-center' : 'items-center lg:gap-16'}`}>
          <div className={align === 'center' ? 'max-w-3xl' : 'lg:w-1/2'}>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              {title}{' '}
              {highlightedText && (
                <span className="text-brand-blue">{highlightedText}</span>
              )}
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-brand-secondary sm:text-xl">
              {description}
            </p>
            
            <div className={`mt-10 flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
              {primaryAction && (
                <Button to={primaryAction.to} variant="primary" size="lg" className="shadow-shell transition-transform hover:-translate-y-1">
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button to={secondaryAction.to} variant="outline" size="lg" className="bg-white">
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
          
          {imageUrl && (
            <div className={align === 'center' ? 'mt-8 w-full max-w-4xl' : 'lg:w-1/2'}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-shell">
                <img
                  src={imageUrl}
                  alt={imageAlt || 'Hero visual'}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-brand-dark/10"></div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
