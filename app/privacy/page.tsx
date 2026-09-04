import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { brand } from "../../lib/brand";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${brand.name} handles the personal data you share through this website.`,
};

const updated = "4 September 2026";

export default function PrivacyPage() {
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

          <h2>Who is responsible</h2>
          <p>
            The data controller is {brand.legal.entity}
            {brand.legal.address ? `, ${brand.legal.address}` : ""}. You can reach us at{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Contact form:</strong> first name, last name, e-mail address, the name of your business if you give it, and your message.
            </li>
            <li>
              <strong>Technical data:</strong> our hosting provider records standard server logs (IP address, browser, pages requested) to run and secure the service.
            </li>
          </ul>

          <h2>Why we use it</h2>
          <p>
            To reply to your message, to follow up on the conversation you started, and to keep the website running safely. We do not sell, rent or share your data for advertising.
          </p>

          <h2>Legal basis</h2>
          <p>
            Your consent, given when you tick the box on the contact form, and our legitimate interest in answering enquiries and protecting the service.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Messages are kept for as long as needed to handle your enquiry and the conversation that follows, then deleted. Server logs are kept by the host for a limited period for security purposes.
          </p>

          <h2>Who else sees it</h2>
          <ul>
            <li>
              <strong>Hosting:</strong> {brand.legal.host}.
            </li>
            <li>
              <strong>E-mail delivery:</strong> messages sent through the form are delivered to our mailbox by a transactional e-mail provider acting on our instructions.
            </li>
          </ul>

          <h2>Cookies and tracking</h2>
          <p>
            This website sets no advertising or analytics cookies and uses no tracking scripts. If that ever changes, this page and a consent notice will say so first.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask to access, correct, delete or receive a copy of your data, object to its use, or withdraw your consent at any time by writing to{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>. You may also lodge a complaint with your local data protection authority.
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
