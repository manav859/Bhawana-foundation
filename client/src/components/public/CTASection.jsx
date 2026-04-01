import { Container } from '@/components/common/Container.jsx';
import { Button } from '@/components/ui/Button.jsx';

export function CTASection({
  title = 'Join Us in Making a Difference',
  description = 'Your support helps us reach more communities and create lasting impact.',
  primaryAction = { label: 'Donate Now', to: '/donate' },
  secondaryAction = { label: 'Become a Volunteer', to: '/volunteer' },
  theme = 'blue' // 'blue' or 'warm'
}) {
  const bgColors = {
    blue: 'bg-brand-blue text-white',
    warm: 'bg-brand-warm text-white'
  };

  const secondaryBtnVariant = {
    blue: 'outline-white',
    warm: 'outline' // since warm is yellow, a dark outline might read better or a white background one
  };

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className={`relative overflow-hidden rounded-[2.5rem] px-6 py-16 shadow-shell sm:px-12 sm:py-20 lg:flex lg:items-center lg:justify-between lg:px-20 ${bgColors[theme]}`}>
          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl mix-blend-overlay"></div>
          
          <div className="relative z-10 lg:w-2/3">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              {description}
            </p>
          </div>
          
          <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:w-1/3 lg:justify-end">
            {primaryAction && (
              <Button to={primaryAction.to} variant="white" size="lg" className="whitespace-nowrap shadow-lg">
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button to={secondaryAction.to} className={`whitespace-nowrap ${theme === 'warm' ? 'bg-black text-white hover:bg-black/80' : 'border-white text-white hover:bg-white/10'}`} variant={theme === 'warm' ? 'primary' : 'outline'} size="lg">
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
