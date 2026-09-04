import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { brand } from "../../lib/brand";

export const metadata: Metadata = {
  title: "Legal notice",
  description: `Publisher, hosting and terms of use of the ${brand.name} website.`,
};

export default function LegalPage() {
  const { legal } = brand;
  return (
    <PageShell tone="paper">
      <section className="page-hero" aria-labelledby="legal-title">
        <p className="eyebrow">Legal</p>
        <h1 id="legal-title" className="display h1">Legal notice</h1>
        <p className="lede">Who publishes this website, who hosts it, and the terms on which you may use it.</p>
      </section>

      <section className="container section--tight" aria-label="Legal notice">
        <div className="prose">
          <h2>Publisher</h2>
          <p>
            This website is published by {legal.entity}
            {legal.form ? ` (${legal.form})` : ""}
            {legal.address ? `, ${legal.address}` : ""}
            {legal.registration ? `, ${legal.registration}` : ""}.
            {legal.director ? ` Publication director: ${legal.director}.` : ""} Contact:{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
          </p>

          <h2>Hosting</h2>
          <p>{legal.host}.</p>

          <h2>Intellectual property</h2>
          <p>
            The texts, design, logos and photographs on this website belong to {legal.entity} or are used with permission. They may not be reproduced or reused without prior written consent. Client names and marks mentioned on the Work pages belong to their respective owners.
          </p>

          <h2>Use of the website</h2>
          <p>
            The content is provided for information. We do our best to keep it accurate and available, but we cannot guarantee that it is free of errors or interruptions, and we are not liable for how you use it. Links to other websites are provided for convenience; we are not responsible for their content.
          </p>

          <h2>Personal data</h2>
          <p>
            How we handle the data you send us is described in the <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>Applicable law</h2>
          <p>These terms are governed by the law applicable at the publisher's registered office.</p>
        </div>
      </section>
    </PageShell>
  );
}
