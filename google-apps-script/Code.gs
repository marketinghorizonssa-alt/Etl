const SHEET_ID = '1c6fSahMeN7zd4D9gA9RnrL8-zBd371dlWJqMO6t33IA';
const MARKETING_SHEET = 'Marketing & UTM';
const SALES_SHEET = 'خدمة العملاء';

function safe(value) {
  const s = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return ContentService.createTextOutput('ok');
    if (p.privacy_consent !== 'yes') return ContentService.createTextOutput('consent_required');

    const phone = String(p.phone || '').replace(/[\s()-]/g, '');
    if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) return ContentService.createTextOutput('invalid_phone');

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const marketing = ss.getSheetByName(MARKETING_SHEET);
    const sales = ss.getSheetByName(SALES_SHEET);
    if (!marketing || !sales) throw new Error('Required lead sheets not found');

    lock.waitLock(10000);
    const now = new Date();
    const leadId = 'ETL-' + Utilities.formatDate(now, 'Asia/Riyadh', 'yyyyMMdd-HHmmss') + '-' + Math.floor(Math.random() * 9000 + 1000);

    marketing.appendRow([
      now,
      leadId,
      safe(p.destination),
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
      safe(p.source || 'Website Form'),
      'نعم'
    ]);

    sales.appendRow([
      now,
      leadId,
      safe(p.name),
      safe(phone),
      safe(p.destination),
      safe(p.travelers),
      safe(p.travel_date),
      safe(p.notes),
      'جديد',
      '',
      '',
      ''
    ]);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('error');
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet() {
  return ContentService.createTextOutput('Etlaala Website Leads Receiver');
}
