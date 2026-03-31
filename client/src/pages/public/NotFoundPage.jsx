import { Container } from '@/components/common/Container.jsx';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { Button } from '@/components/ui/Button.jsx';

export function NotFoundPage() {
  return (
    <div className="section-shell">
      <Container className="surface-card p-8 sm:p-10">
        <PageIntro
          eyebrow="404"
          title="Page not found"
          description="The route you requested is not part of the current public scaffold. Use the main navigation to continue exploring the site structure."
        />
        <div className="mt-6">
          <Button to="/">Return home</Button>
        </div>
      </Container>
    </div>
  );
}