// ============================================================
// Google Apps Script — Viagem EUA 2027 PWA Sync
// ============================================================
// COMO USAR:
// 1. Crie uma planilha no Google Sheets
// 2. Vá em Extensões → Apps Script
// 3. Apague tudo e cole este código inteiro
// 4. Clique em "Implantar" → "Nova implantação"
//    - Tipo: App da Web
//    - Executar como: Eu
//    - Quem tem acesso: Qualquer pessoa
// 5. Autorize quando solicitado
// 6. Copie a URL gerada e cole no PWA em Ajustes → Sync
// ============================================================

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getOrCreateSheet();

    // Handle push via GET (workaround for CORS/redirect issues with POST)
    if (e.parameter && e.parameter.action === 'push' && e.parameter.data) {
      var payload = JSON.parse(e.parameter.data);
      var rows = sheet.getDataRange().getValues();
      var keyRows = {};
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0]) {
          keyRows[rows[i][0]] = { row: i + 1, ts: Number(rows[i][2]) || 0 };
        }
      }
      var changes = payload.changes || [];
      changes.forEach(function(c) {
        if (!c.key) return;
        var existing = keyRows[c.key];
        if (existing) {
          if (c.ts > existing.ts) {
            sheet.getRange(existing.row, 2).setValue(String(c.value));
            sheet.getRange(existing.row, 3).setValue(Number(c.ts));
          }
        } else {
          sheet.appendRow([String(c.key), String(c.value), Number(c.ts)]);
          keyRows[c.key] = { row: sheet.getLastRow(), ts: c.ts };
        }
      });
    }

    // Return current state
    var allRows = sheet.getDataRange().getValues();
    var data = {};
    for (var i = 1; i < allRows.length; i++) {
      if (allRows[i][0]) {
        data[allRows[i][0]] = { v: String(allRows[i][1]), ts: Number(allRows[i][2]) || 0 };
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = getOrCreateSheet();
    var payload = JSON.parse(e.postData.contents);
    var rows = sheet.getDataRange().getValues();
    var keyRows = {};
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0]) {
        keyRows[rows[i][0]] = { row: i + 1, ts: Number(rows[i][2]) || 0 };
      }
    }

    var changes = payload.changes || [];
    changes.forEach(function(c) {
      if (!c.key) return;
      var existing = keyRows[c.key];
      if (existing) {
        if (c.ts > existing.ts) {
          sheet.getRange(existing.row, 2).setValue(String(c.value));
          sheet.getRange(existing.row, 3).setValue(Number(c.ts));
        }
      } else {
        sheet.appendRow([String(c.key), String(c.value), Number(c.ts)]);
        keyRows[c.key] = { row: sheet.getLastRow(), ts: c.ts };
      }
    });

    // Return current state after merge
    var allRows = sheet.getDataRange().getValues();
    var data = {};
    for (var i = 1; i < allRows.length; i++) {
      if (allRows[i][0]) {
        data[allRows[i][0]] = { v: String(allRows[i][1]), ts: Number(allRows[i][2]) || 0 };
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sync');
  if (!sheet) {
    sheet = ss.insertSheet('Sync');
    sheet.appendRow(['key', 'value', 'timestamp']);
    sheet.getRange('A1:C1').setFontWeight('bold');
    sheet.setColumnWidth(1, 200);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 150);
  }
  return sheet;
}
