import {Container} from '@/components/common/Container.jsx';
import {cn} from '@/utils/cn.js';

const stats = [
  {
    value: '50,000+',
    label: 'Lives Impacted',
    color: 'text-brand-blue',
  },
  {
    value: '2,500+',
    label: 'Active Volunteers',
    color: 'text-brand-accent',
  },
  {
    value: '120+',
    label: 'Projects Completed',
    color: 'text-brand-success',
  },
  {
    value: '25+',
    label: 'Cities Reached',
    color: 'text-brand-warm',
  },
];

export function ImpactStats({className}) {
  return (
    <section className={cn('bg-white', className)}>
      <Container>
        <div className="relative -mt-16 z-10 rounded-3xl bg-white p-8 shadow-shell lg:p-0">
          <div className="grid divide-y divide-brand-border/60 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center py-8 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn('font-display text-4xl font-bold tracking-tight lg:text-5xl', stat.color)}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-brand-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
