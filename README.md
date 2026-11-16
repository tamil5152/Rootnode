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
- **Stats and testimonials are samples.** Replace them with real ones before launch.
- **Colors:** the `@theme` block at the top of `app/globals.css`

## Contact form (Supabase, optional)
Without keys, the form opens the visitor's email app. To save messages in Supabase:
1. In Supabase, open the SQL editor and run `supabase/migrations/0001_contact_messages.sql`
2. Copy `.env.example` to `.env.local` and paste your project URL and publishable (anon) key
3. Restart `npm run dev`. New messages appear in Table Editor → `contact_messages`.
Visitors can only add messages; they can never read them (Row Level Security).

## Put it online (free)
Push this folder to a GitHub repo, then import it at https://vercel.com/new.
Add the two `NEXT_PUBLIC_SUPABASE_*` variables in Vercel's settings if you use the form.
