-- Stores messages sent from the website's contact form.
create table if not exists public.contact_messages (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 200),
  budget      text check (char_length(budget) <= 60),
  message     text not null check (char_length(message) between 1 and 4000),
  created_at  timestamptz not null default now()
);

-- Row Level Security: visitors may only INSERT. Nobody can read rows
-- with the public key; you read them in the Supabase dashboard.
alter table public.contact_messages enable row level security;

create policy "Anyone can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
