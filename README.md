# Signage Times Co. website

A responsive marketing website for Arshi Javed / Signage Times Co., built with Next.js. It includes an editorial one-page layout, a projects section ready for photography, and an enquiry form that delivers leads by email through Resend.

## Requirements

- Node.js 20.9 or newer
- A Resend account for the live contact form
- A Vercel account for deployment (recommended)

## Run locally

Install the dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production check, run:

```bash
npm run build
npm run start
```

## Project structure

```text
app/
  api/contact/route.ts   Serverless API that sends contact-form emails via Resend
  globals.css            All responsive visual styles and layout rules
  layout.tsx             Global metadata, Google Analytics and AdSense scripts
  page.tsx               Website content, interactions and contact form
.env.example             Template for required and optional environment variables
```

## Contact form and Resend

Copy `.env.example` to `.env.local`, then add your actual values. Never commit `.env.local`.

```env
RESEND_API_KEY=re_your_actual_resend_api_key
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=Signage Times <hello@yourdomain.com>
```

`CONTACT_FROM_EMAIL` must use a domain you have verified in Resend. The fallback sender (`onboarding@resend.dev`) is useful for testing, but can only send to the email address associated with the Resend account.

The endpoint validates the name, phone number, and project description. It is at `POST /api/contact` and is automatically deployed as a Vercel serverless function.

## Common content changes

Most website copy is intentionally in one easy-to-edit place: [app/page.tsx](app/page.tsx).

| Change | Where to edit |
| --- | --- |
| About Arshi / studio story | The `about` section in `app/page.tsx` |
| Services | The `services` array at the top of `app/page.tsx` |
| Project names | The `projects` array at the top of `app/page.tsx` |
| Phone, email and Instagram | The `aside` block in the `contact` section |
| Form service choices | The `<select name="projectType">` options |
| Colours, fonts and responsive layout | `app/globals.css` |
| Browser title and SEO description | `metadata` in `app/layout.tsx` |

Replace the placeholder phone number, email address and Instagram link before publishing.

## Adding portfolio photos

When project photos are available, add them to `public/projects/` (for example, `public/projects/retail-facade.jpg`) and use Next.js's `Image` component in the project cards in `app/page.tsx`.

Suggested workflow:

1. Export web-ready images as `.webp` or compressed `.jpg` files, ideally below 500 KB each.
2. Use descriptive file names, such as `restaurant-signage-delhi.webp`.
3. Add meaningful alt text describing the work, rather than generic text like “project image”.
4. Keep the portfolio title and image together in the relevant project card.

The current colourful project cards are intentional placeholders, so the page remains polished until images are supplied.

## Traffic monitoring and AdSense

Add these optional values in `.env.local` locally and in Vercel’s environment settings for production:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

- `NEXT_PUBLIC_GA_ID` enables Google Analytics traffic tracking.
- `NEXT_PUBLIC_ADSENSE_CLIENT` loads the AdSense script. You must first have an approved AdSense account and comply with its site/content requirements. Ad units can then be added where desired.

## Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Next.js automatically—keep the default build command (`npm run build`).
4. Add all production environment variables from `.env.example` in **Project Settings → Environment Variables**.
5. Deploy and test the contact form on the public URL.
6. Connect the final domain and update the `metadataBase` value in `app/layout.tsx` to match it.

## Before going live

- Update all placeholder contact details.
- Verify the sending domain in Resend and test a real enquiry.
- Add actual project images and alt text.
- Add a privacy policy before enabling Analytics or AdSense.
- Replace `https://signagetimes.co.in` in `app/layout.tsx` if the final domain differs.
