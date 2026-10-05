-- Restrict account creation to the site owner.
-- Fires before any new row in auth.users (OAuth, magic link, etc.) and
-- rejects signups whose email does not match the owner allowlist.
-- To allow another account later, add its email to the IN list or drop the
-- trigger: drop trigger only_owner_signup on auth.users;

create or replace function public.reject_new_signups()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(new.email) is distinct from 'bjjaiswal@gmail.com' then
    raise exception 'Signups are restricted to the site owner';
  end if;
  return new;
end;
$$;

drop trigger if exists only_owner_signup on auth.users;

create trigger only_owner_signup
  before insert on auth.users
  for each row execute function public.reject_new_signups();
