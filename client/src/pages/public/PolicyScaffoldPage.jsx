import { Container } from '@/components/common/Container.jsx';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';

export function PolicyScaffoldPage({ title, description }) {
  return (
    <div className="section-shell">
      <Container className="space-y-8">
        <PageIntro eyebrow="Policy page" title={title} description={description} />
        <PlaceholderPanel
          title="Compliance-ready route scaffold"
          description="This placeholder keeps policy URLs stable from the start so legal copy can be added in later phases without changing navigation or footer structure."
          bullets={[
            'Footer links are already wired to these routes.',
            'Responsive text shell is in place.',
            'Later phases can hydrate this from CMS settings or legal content collections.',
          ]}
        />
      </Container>
    </div>
  );
}