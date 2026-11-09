# booking-platform

A booking page for service businesses. Static site — HTML, CSS and vanilla
JavaScript, no build step and no dependencies.

The demo business is Sage & Stone Salon, in Phoenix, AZ.
It is fictional — the name, contact details and reviews are sample data.

## Run locally

```sh
python3 -m http.server 8080
```

Then open http://localhost:8080

Opening `index.html` directly from the filesystem also works; the page falls
back to a built-in copy of the data.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Styles. `--brand-accent` in `:root` sets the brand colour |
| `app.js` | Gallery, service list, booking drawer, time slots, support chat |
| `scraper-schema.json` | Business data (services, team, reviews, contact details) loaded at runtime |

## Booking flow

1. Customer picks a service and taps Book.
2. They choose a day and a time. Slots are generated every 15 minutes from
   09:00, and must fit the service duration plus a 15 or 30 minute buffer
   before closing (18:00).
3. They confirm with a social sign-in (Instagram, TikTok or Google) or with
   a guest name and phone number.
4. Confirmation screen shows the appointment summary.

Bookings are front-end only at the moment — no data is sent to a server yet.

## Adding another business

Copy the folder, replace the contents of `scraper-schema.json` with the new
business's data, and change `--brand-accent` in `styles.css`.

## To do

- Persist bookings (API + database)
- Provider login and dashboard
- Import businesses automatically from an existing booking URL
- SMS/email confirmations and reminders

## Testing social sign-in

The "Continue with Instagram / TikTok / Google" buttons run in test mode by
default. No real provider is contacted yet — the app IDs for live login don't
exist yet, and a static page can't complete a real OAuth token exchange on
its own (see "Going live").

Test mode runs the same shape of flow as the real thing:

1. Open the page and tap **Book**, then **Continue with Google** (or
   Instagram / TikTok).
2. You are redirected to `auth-test.html`, a local page that plays the
   provider's part. It does **not** ask for a provider password — never type
   one there. Change the name/handle if you want, then tap **Authorize**.
3. You are redirected back with a test code. The page creates an account,
   stores it in the browser's local storage (`booking.accounts`), and signs
   you in (`booking.session`). The first account created on a device is
   Account #1.
4. The bar at the top of the page shows who is signed in and how. The booking
   form is pre-filled with the account name, and **Sign out** ends the
   session. Signing in again with the same provider and handle reuses the
   same account instead of creating a new one.

To test the full loop, finish a booking after signing in — the confirmation
uses your account name.

## Provider sign-in (test mode)

Service providers can sign in via the **For businesses** link in the header:

1. Click **For businesses** and choose **Continue with Google / Instagram / TikTok**.
2. The flow redirects to `auth-test.html` with `role=provider`. No passwords are
   requested or stored.
3. On return, the provider account is saved in `localStorage` under
   `booking.providers` and the active session is saved under
   `booking.providerSession`, completely separate from customer accounts
   (`booking.accounts` / `booking.session`).
4. The provider dashboard displays the signed-in provider, their claimed
   business, and editable fields for **business name**, **public phone number**,
   and **hours**. Saving writes to `booking.businessEdits` in `localStorage` and
   updates the business profile immediately.

## Unclaimed businesses and claiming

Each business on BastaPapi gets a page at `<slug>.bastapapi.com`. The header
includes a switcher between two fictional sample profiles:

- **Sage & Stone Salon** (`sageandstonesalon.bastapapi.com`) — claimed by default,
  with working online booking.
- **Desert Bloom Barbers** (`desertbloombarbers.bastapapi.com`) — starts
  badged **Unclaimed**. It lists the business details and sample services, but
  online booking is disabled until the business is claimed.

On an unclaimed profile:

- **Text the owner** and **Call the owner** run **simulated** outreach flows in
  test mode. **Text the owner** previews the outreach SMS to the listed phone
  number and includes a "Notify me when they claim" option. **Call the owner**
  asks for the customer's first name (pre-filled from a signed-in customer
  account if present), plays a simulated call transcript line by line, and shows
  the follow-up text message. Nothing is actually sent or called; outreach
  records and notification preferences are stored in `localStorage`
  (`booking.outreach` and `booking.notifyRequests`). Real SMS sending, automated
  phone calls, and gathering/importing public business data from the web are
  backend tasks for later.
- **Claim this business** prompts the provider to sign in (if not already signed
  in) and confirm the claim. Once confirmed, the claim is saved in
  `localStorage` (`booking.claims`), the profile badge updates to **Claimed**,
  the business appears in the provider's dashboard, and normal online booking is
  enabled. If a customer previously used Text or Call and asked to be notified,
  viewing the claimed profile displays a notice that the business is now taking
  bookings.

## Going live with real sign-in

Each provider needs its own developer app, registered once by the account
owner:

- **Google** — Google Cloud Console: create an OAuth client ID (web), add
  the page URL as an authorised redirect URI.
- **Instagram** — Meta developer account: create an app with Instagram
  login, add the redirect URI. Test users can sign in while the app is in
  development mode; opening it to everyone needs Meta app review.
- **TikTok** — TikTok developer account: create an app with Login Kit, add
  the redirect URI. Sandbox test users work before review.

Then, in `app.js` (`AUTH_CONFIG` at the top of the auth section): paste each
client ID and set `mode: 'live'`. Redirects to the real consent screens work
from that point, but one piece is still needed before live accounts are
real: OAuth returns a code, and swapping it for the user's profile requires
a client secret, which must not ship in front-end code. Going live therefore
also needs a small backend endpoint (or an auth service such as Supabase or
Firebase Auth) to do the exchange and hold accounts server-side. Until
then, accounts exist only in each tester's browser.
