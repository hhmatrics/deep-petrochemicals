# Enquiries → Google Sheet (free, unlimited)

Send every website enquiry (contact form **and** quote form) into a Google Sheet
you own. No cost, no monthly cap, no third-party account. ~5 minutes to set up.

The website already has the code — you just create the Sheet + webhook and paste
one URL into the environment.

---

## Step 1 — Create the Sheet
1. Go to <https://sheets.google.com> and create a **blank spreadsheet**.
2. Name it something like `Deep Petrochemicals — Website Enquiries`.
   (You don't need to add any column headers — the script does that automatically.)

## Step 2 — Add the webhook script
1. In the Sheet, click **Extensions → Apps Script**.
2. Delete whatever sample code is there.
3. Open `scripts/google-sheets-webhook.gs` from this project, copy **all** of it,
   and paste it into the Apps Script editor.
4. *(Optional)* To also get an email on every enquiry, put your address in the
   `NOTIFY_EMAIL = ""` line near the top (e.g. `"sales@deeppetrochemicals.com"`).
5. Click the **Save** (💾) icon.

## Step 3 — Deploy it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `enquiry webhook` (anything)
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← important, this lets the site post to it
4. Click **Deploy**.
5. Google asks you to **authorise** — click through: *Review permissions* →
   pick your account → *Advanced* → *Go to (project) (unsafe)* → *Allow*.
   (It says "unsafe" only because it's your own unverified script — it's fine.)
6. Copy the **Web app URL**. It ends in **`/exec`** and looks like:
   `https://script.google.com/macros/s/AKfy…long…/exec`

## Step 4 — Give the URL to the website
Create (or edit) **`.env.local`** in the project root and add:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy…/exec
```

Restart the dev/production server. Done — every enquiry now appends a row to your
Sheet. The first submission auto-creates the header row.

---

## Notes
- **Test it:** submit the contact form on the site → a new row should appear in the
  Sheet within a second or two.
- **Want email notifications too?** Set `NOTIFY_EMAIL` in the Apps Script (Step 2.4)
  — you'll get an email on every enquiry *in addition to* the Sheet row.
- **WhatsApp is separate/instant.** When the WhatsApp number is set, the forms hand
  off to WhatsApp for the customer; the Sheet still records the lead in the
  background as your permanent log.
- **Changing the script later:** after editing the `.gs` file you must
  **Deploy → Manage deployments → edit → Version: New version** for changes to
  take effect (the `/exec` URL stays the same).
- **Security:** the webhook only ever *appends* data. The URL lives server-side in
  `.env.local` (never shipped to the browser). The site validates + honeypot-filters
  before posting, so bots that skip the form can't spam your Sheet through it.
