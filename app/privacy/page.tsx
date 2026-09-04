import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { brand } from "../../lib/brand";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${brand.name} handles the personal information you share through this website.`,
};

const updated = "4 September 2026";

export default function PrivacyPage() {
  const { legal } = brand;
  // Built as one string so missing details leave no stray commas or gaps.
  const controller = [
    legal.entity + (legal.form ? ` (${legal.form})` : ""),
    legal.abn && `ABN ${legal.abn}`,
    legal.address,
    "Australia",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <PageShell tone="paper">
      <section className="page-hero" aria-labelledby="privacy-title">
        <p className="eyebrow">Legal</p>
        <h1 id="privacy-title" className="display h1">Privacy policy</h1>
        <p className="lede">Short version: we collect only what you send us, we use it only to answer you, and we do not track you.</p>
      </section>

      <section className="container section--tight" aria-label="Privacy policy">
        <div className="prose">
          <p className="mute">Last updated: {updated}</p>

          <h2>Who we are</h2>
          <p>
            {`${controller}. Questions about privacy go to `}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
          </p>
          <p>
            We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). If you contact us from the European Union or the United Kingdom, we also honour the access, correction and erasure rights you have there.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Contact form:</strong> first name, last name, email address, the name of your business if you give it, and your message.
            </li>
            <li>
              <strong>Technical data:</strong> our hosting provider records standard server logs, including IP address, browser and pages requested, to run and secure the service.
            </li>
          </ul>

          <h2>Why we use it</h2>
          <p>
            To reply to your message, to follow up on the conversation you started, and to keep the website running safely. We do not sell your information, and we do not use it for advertising.
          </p>
          <p>
            We only send you marketing messages if you ask for them, and every one carries a way to unsubscribe, as required by the Spam Act 2003 (Cth).
          </p>

          <h2>How long we keep it</h2>
          <p>
            Messages are kept for as long as needed to handle your enquiry and the conversation that follows, then deleted. Server logs are kept by our host for a limited period for security purposes.
          </p>

          <h2>Who else sees it</h2>
          <ul>
            <li>
              <strong>Hosting:</strong> {legal.host}.
            </li>
            <li>
              <strong>Email delivery:</strong> messages sent through the form are delivered to our mailbox by a transactional email provider acting on our instructions.
            </li>
          </ul>
          <p>
            Both providers store data outside Australia, including in the United States. By sending us a message you accept that your information may be handled overseas by them on our behalf.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This website sets no advertising or analytics cookies and uses no tracking scripts. If that ever changes, this page and a notice on the site will say so first.
          </p>

          <h2>Access, correction and complaints</h2>
          <p>
            You can ask to see the information we hold about you, have it corrected, or have it deleted, by writing to{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>. We answer within a reasonable time and at no cost.
          </p>
          <p>
            If you are not satisfied with how we handled your request, you can complain to the Office of the Australian Information Commissioner at{" "}
            <a href="https://www.oaic.gov.au" rel="noopener">oaic.gov.au</a>.
          </p>

          <h2>Changes</h2>
          <p>We will update this page when our practices change and note the date above.</p>

          <p>
            See also the <Link href="/legal">legal notice</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
