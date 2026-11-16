# Rootnode: business landing page

A dark, cinematic one-page business site. Built with Next.js, Tailwind CSS,
Framer Motion and (optionally) Supabase for the contact form.

## Run it on your computer
1. Install Node.js 20+ from https://nodejs.org
2. In this folder run `npm install`, then `npm run dev`
3. Open http://localhost:3000

## Make it yours
- **Company name, footer description, email, socials:** edit `site.config.ts`
- **Text of each section:** each section is one file in `components/`
  (Hero, Stats, Services, Process, Capabilities, Compare, Testimonials, FAQ, Contact, Footer)
- **Stats are samples. Client testimonials (components/Testimonials.tsx) are draft wordings: get each client to approve theirs.** Replace them with real ones before launch.
- **Colors:** the `@theme` block at the top of `app/globals.css`

## Contact form
Every enquiry is emailed to `enquiryEmail` in `site.config.ts` using FormSubmit.co (free, no account).
- The very first time the form is used, FormSubmit sends an "Activate Form" email to that address. Click the button in it once; after that every enquiry arrives in your inbox.
- Optional: FormSubmit's activation email also gives you a random alias. Put it in `enquiryEmail` instead of your address to hide your email from the site's code.

Optional copy in Supabase: run `supabase/migrations/0001_contact_messages.sql` in the Supabase SQL editor and set the two `NEXT_PUBLIC_SUPABASE_*` variables (see `.env.example`). Messages then also appear in Table Editor → `contact_messages`.

## Put it online (free)
Push this folder to a GitHub repo, then import it at https://vercel.com/new.
Add the two `NEXT_PUBLIC_SUPABASE_*` variables in Vercel's settings if you use the form.
