import type {Metadata} from 'next';
import {PageIntro} from '@/components/page-parts';
import {MetaBar} from '@/components/ui';
import {email} from '@/lib/data';

export const metadata: Metadata = {title: 'Legal', alternates: {canonical: '/legal'}};

export default function Legal() {
  return (
    <div className="page-legal">
      <PageIntro title={['Legal.']} className="intro--short" />
      <section className="legal wrap">
        <MetaBar left="To Be Seen" middle="/ The essentials" right={null} className="meta-bar--half" />
        <div className="legal__body">
          <h2>Website operator</h2>
          <p>This website is operated by To Be Seen, Australia. For enquiries, contact <a className="text-link" href={`mailto:${email}`}>{email}</a>.</p>
          <h2>Hosting</h2>
          <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.</p>
          <h2>Intellectual property</h2>
          <p>The text, design, logos and photographs on this website belong to To Be Seen or their respective owners and are used for the presentation of the work. Project screenshots, client logos and business marks remain the property of their respective owners and are shown to identify the projects.</p>
          <p>Our portfolio distinguishes website work, internal products and studio experiments. Brands shown within Eva Meszoly’s portfolio are her project references, not claims of direct commissions to To Be Seen. Illustrative product compositions are identified on their project pages.</p>
          <h2>Website information</h2>
          <p>This website provides general information about our studio, work and services. Project scope, fees and delivery terms are agreed separately in writing. We aim to keep information accurate but do not guarantee the availability or content of linked third-party websites.</p>
          <h2>Your rights</h2>
          <p>Nothing in these terms excludes rights or guarantees that cannot be excluded under Australian Consumer Law. These terms are governed by the laws of Australia, subject to applicable non-excludable consumer rights.</p>
          <h2>Questions</h2>
          <p>Please contact us by email if you have a question about this website or the use of any material shown here.</p>
        </div>
      </section>
    </div>
  );
}
