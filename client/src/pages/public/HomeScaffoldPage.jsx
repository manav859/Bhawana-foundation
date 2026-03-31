import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container.jsx';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { adminNavigation, publicNavigation } from '@/config/navigation.js';

export function HomeScaffoldPage() {
  return (
    <div>
      <section className="section-shell">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <PageIntro
              eyebrow="Phase 1 scaffold"
              title="Public website and admin architecture are ready for feature work"
              description="This route exists to validate the shared public shell, responsive layout system, navigation coverage, and admin entry points before business features are implemented."
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/about">Explore public routes</Button>
              <Button to="/admin/login" variant="secondary">
                Open admin login
              </Button>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand-dark">Navigation coverage</h2>
            <div className="mt-5 grid gap-3 text-sm text-brand-secondary sm:grid-cols-2">
              {publicNavigation.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-brand-border bg-slate-50 px-4 py-3 hover:border-brand-blue hover:text-brand-blue">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16 lg:pb-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <PlaceholderPanel
            title="Public site shell"
            description="Shared navbar, footer, route placeholders, responsive containers, design tokens, and service layer hooks are in place for the public experience."
            bullets={[
              'Desktop and mobile navigation are scaffolded.',
              'Tailwind tokens reflect the Pencil design palette.',
              'Public route coverage includes details, policies, and 404 handling.',
            ]}
            action={{ to: '/programs', label: 'View content route examples', variant: 'secondary' }}
          />

          <PlaceholderPanel
            title="Admin panel shell"
            description="The admin foundation includes a login flow, protected routing, sidebar navigation, dashboard shell, CRUD-ready route slots, and mock-auth support for local development."
            bullets={adminNavigation.slice(0, 8).map((item) => item.label)}
            action={{ to: '/admin/login', label: 'Go to admin login' }}
          />
        </Container>
      </section>
    </div>
  );
}