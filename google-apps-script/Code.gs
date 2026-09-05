const SHEET_ID = '1c6fSahMeN7zd4D9gA9RnrL8-zBd371dlWJqMO6t33IA';
const SHEET_NAME = 'Leads';

function safe(value) {
  const s = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return ContentService.createTextOutput('ok');
    if (p.privacy_consent !== 'yes') return ContentService.createTextOutput('consent_required');

    const phone = String(p.phone || '').replace(/[\s()-]/g, '');
    if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) return ContentService.createTextOutput('invalid_phone');

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) throw new Error('Leads sheet not found');

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const now = new Date();
      const leadId = 'ETL-' + Utilities.formatDate(now, 'Asia/Riyadh', 'yyyyMMdd-HHmmss') + '-' + Math.floor(Math.random()*9000+1000);
      sh.appendRow([
        now,
        leadId,
        safe(p.name),
        safe(phone),
        safe(p.destination),
        safe(p.travelers),
        safe(p.travel_date),
        safe(p.notes),
        safe(p.page_path),
        safe(p.page_url),
        safe(p.utm_source),
        safe(p.utm_medium),
        safe(p.utm_campaign),
        safe(p.utm_term),
        safe(p.utm_content),
        safe(p.gclid),
        safe(p.gbraid),
        safe(p.wbraid),
        'نعم',
        'جديد',
        '',
        '',
        '',
        safe(p.source || 'Website Form')
      ]);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput('ok');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('error');
  }
}
