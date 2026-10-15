import type {Metadata} from 'next';
import {PageIntro} from '@/components/page-parts';
import {MetaBar} from '@/components/ui';
import {email} from '@/lib/data';

export const metadata: Metadata = {title: 'Privacy', alternates: {canonical: '/privacy'}};

export default function Privacy() {
  return (
    <div className="page-legal">
      <PageIntro title={['Your privacy.']} className="intro--short" />
      <section className="legal wrap">
        <MetaBar left="Updated 6 October 2026" middle="/ Privacy" right={null} className="meta-bar--half" />
        <div className="legal__body">
          <h2>What this website collects</h2>
          <p>This website does not use advertising cookies, analytics scripts or third-party video embeds. Fonts and videos are hosted with the website. Our hosting provider may process ordinary technical request logs, including IP address, browser information and pages requested, to operate and secure the service.</p>
          <h2>When you contact us</h2>
          <p>The contact form prepares an email in your own email application. The fields are not submitted to a website server or saved by this website. Your message leaves your device when you choose to send it through your email provider.</p>
          <p>If you email us, we use the information you provide to respond to and follow up on your enquiry. We do not sell your information or use it for advertising. Marketing communications are only sent if requested.</p>
          <h2>External project brief</h2>
          <p>The project brief link opens a separate website. Before entering information there, review the privacy information presented on that service. Opening external project links is also subject to each destination’s own policies.</p>
          <h2>Service providers and retention</h2>
          <p>Vercel and our mailbox services may process information overseas, including in the United States. We keep enquiry information for as long as needed to respond, provide agreed services and meet applicable legal obligations. Technical log retention is managed by our hosting provider.</p>
          <h2>Your choices and rights</h2>
          <p>You can request access, correction or deletion of personal information by contacting <a className="text-link" href={`mailto:${email}`}>{email}</a>. We will consider requests in accordance with applicable privacy law, including the Australian Privacy Principles and relevant EU or UK rights where they apply.</p>
          <h2>Concerns</h2>
          <p>Please contact us first if you have a privacy concern. You may also contact the <a className="text-link" href="https://www.oaic.gov.au/" target="_blank" rel="noreferrer">Office of the Australian Information Commissioner</a> or your relevant local authority.</p>
        </div>
      </section>
    </div>
  );
}
