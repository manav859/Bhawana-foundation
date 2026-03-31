import { Container } from '@/components/common/Container.jsx';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';

export function StandardScaffoldPage({ eyebrow = 'Public route', title, description, bullets = [] }) {
  return (
    <div className="section-shell">
      <Container className="space-y-8">
        <PageIntro eyebrow={eyebrow} title={title} description={description} />
        <PlaceholderPanel
          title="What is ready in Phase 1"
          description="This page is intentionally limited to layout, route structure, placeholder content states, and API integration boundaries so later phases can add real features without refactoring the shell."
          bullets={bullets}
        />
      </Container>
    </div>
  );
}