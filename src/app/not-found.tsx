import {PageIntro} from '@/components/page-parts';
import {Pill} from '@/components/ui';

export default function NotFound() {
  return (
    <div className="page-404">
      <PageIntro
        title={['Out of', {dot: true, text: 'sight.'}]}
        left={<Pill href="/work">Back to the work</Pill>}
        aside="We couldn’t find that page. There’s plenty of good work this way."
      />
    </div>
  );
}
