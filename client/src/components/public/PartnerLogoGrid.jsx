import {Container} from '@/components/common/Container.jsx';
import {cn} from '@/utils/cn.js';

const partners = [
  'Global Giving',
  'UNESCO',
  'WHO India',
  'Skill India',
  'Digital India',
];

export function PartnerLogoGrid({className}) {
  return (
    <section className={cn('bg-brand-light py-20', className)}>
      <Container>
        <div className="flex flex-col items-center gap-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-muted">
            Trusted By Leading Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-70 transition-opacity hover:opacity-100">
            {partners.map((partner, index) => (
              <div 
                key={partner} 
                className="flex items-center justify-center rounded-xl bg-white px-8 py-5 shadow-sm border border-brand-border/50 transition-all hover:shadow-md hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="font-display text-lg font-bold text-brand-dark italic">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
