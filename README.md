# TBS° — To Be Seen

Website for To Be Seen, a studio building digital systems for independent businesses: websites, Loyalty Pass, online bookings and client follow-up.

Built with Next.js (App Router), TypeScript and hand-written CSS. No UI framework.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Where things live

| Path | What |
| --- | --- |
| `lib/brand.ts` | The single source of truth: name, tagline, claim, contact, CTA labels, legal identity. Change it here, it changes everywhere. |
| `lib/services.ts` | The six offers and the shared "how it works" process. |
| `lib/work.ts` | Client case studies. Outcomes and quotes are optional and hidden when empty. |
| `lib/results.ts` | "What changes": the four outcomes we design for. |
| `lib/nav.ts` | Primary and legal navigation. |
| `components/` | One `Header`, one `Footer`, one `PageShell`, the `MenuOverlay`, `ContactForm`, `Reveal`, `Marks`, `Seal`, `CtaBand`. |
| `app/globals.css` | Tokens (colour, type, space) and components. No `!important`. |
| `design/mockups/` | Reference mockups. Not served. |

## Contact form

The form posts to a Server Action (`app/contact/actions.ts`). Delivery uses Resend when these variables are set; otherwise the visitor gets a pre-filled e-mail link, so a message is never lost silently.

```
RESEND_API_KEY=...
CONTACT_TO=hello@example.com        # defaults to the brand e-mail
CONTACT_FROM="To Be Seen <hello@yourdomain.com>"   # verified sender on Resend
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com     # used for metadata, sitemap and Open Graph
```

## Before launch

- Complete `brand.legal` (legal form, address, registration, publication director).
- Set `brand.contact.bookingUrl` to the scheduling link, or leave it to fall back to e-mail.
- Confirm the sector, services, year, URL and images of each case in `lib/work.ts`; add outcomes and quotes only if they can be published.
- Move the contact address to an e-mail on the brand's own domain.
