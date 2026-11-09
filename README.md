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
