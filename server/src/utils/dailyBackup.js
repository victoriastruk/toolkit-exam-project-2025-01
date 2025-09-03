const fs = require('fs');
const path = require('path');
const { LOG_FILE_PATH, BACKUP_DIR_PATH } = require('../constants');

if (!fs.existsSync(BACKUP_DIR_PATH)) {
  fs.mkdirSync(BACKUP_DIR_PATH, { recursive: true });
}

function transformLogLine(line) {
  try {
    const entry = JSON.parse(line);
    return {
      message: entry.message,
      code: entry.code,
      time: entry.time,
    };
  } catch (err) {
    return null;
  }
}

function dailyBackup() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) return;

    const lines = fs
      .readFileSync(LOG_FILE_PATH, 'utf-8')
      .split('\n')
      .filter(Boolean);
    const transformed = lines.map(transformLogLine).filter(Boolean);

    if (transformed.length === 0) return;

    const timestamp = Date.now();
    const backupFilePath = path.join(BACKUP_DIR_PATH, `errors_${timestamp}.log`);

    fs.writeFileSync(
      backupFilePath,
      transformed.map(JSON.stringify).join('\n'),
      'utf-8',
    );

    fs.truncateSync(LOG_FILE_PATH, 0);

    console.log(`Backup created: ${backupFilePath}`);
  } catch (err) {
    console.error('Backup failed:', err);
  }
}

module.exports = { dailyBackup };
