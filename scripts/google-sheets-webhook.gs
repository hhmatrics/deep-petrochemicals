/**
 * Deep Petrochemicals — website enquiry → Google Sheet webhook.
 *
 * This runs inside Google (not in the website). It receives each enquiry the
 * site sends and appends it as a new row in the attached sheet. See
 * GOOGLE_SHEETS_SETUP.md for the 5-minute deploy steps.
 *
 * Deploy summary:
 *   1. Open your Google Sheet → Extensions → Apps Script.
 *   2. Delete any sample code, paste this whole file, Save.
 *   3. Deploy → New deployment → type "Web app".
 *   4. Execute as: Me · Who has access: Anyone. Deploy, authorise.
 *   5. Copy the Web app URL (ends in /exec) into GOOGLE_SHEETS_WEBHOOK_URL
 *      in the website's .env.local.
 */

// Optional: get an email on every enquiry too. Put your address between the
// quotes to enable (e.g. "sales@deeppetrochemicals.com"); leave "" to disable.
const NOTIFY_EMAIL = "";

const HEADERS = [
  "Submitted At",
  "Type",
  "Name",
  "Company",
  "Email",
  "Phone",
  "Product",
  "Grade",
  "Quantity",
  "Destination",
  "Message",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write a bold, frozen header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const row = [
      data.submittedAt || new Date().toISOString(),
      data.type || "",
      data.name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.product || "",
      data.grade || "",
      data.quantity || "",
      data.region || "",
      data.message || "",
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New website enquiry — " + (data.company || data.name || "unknown"),
        replyTo: data.email || "",
        body: HEADERS.map(function (h, i) {
          return h + ": " + row[i];
        }).join("\n"),
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
