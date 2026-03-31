import { useParams } from 'react-router-dom';
import { Container } from '@/components/common/Container.jsx';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';

export function DetailScaffoldPage({ title, entityLabel, paramKey = 'slug' }) {
  const params = useParams();
  const identifier = params[paramKey];

  return (
    <div className="section-shell">
      <Container className="space-y-8">
        <PageIntro
          eyebrow={`${entityLabel} detail`}
          title={title}
          description={`Dynamic route scaffold for ${entityLabel.toLowerCase()} detail pages. The current identifier is "${identifier}".`}
        />
        <PlaceholderPanel
          title="Phase 1 detail-page responsibilities"
          description="The route parameter, shared page shell, service boundary, and future CMS/API integration point are already wired. Later phases can replace this scaffold with fully designed detail content."
          bullets={[
            `URL parameter captured: ${identifier}`,
            'SEO and metadata hooks can be added later without route changes.',
            'Public API service methods already include matching detail endpoints.',
          ]}
        />
      </Container>
    </div>
  );
}