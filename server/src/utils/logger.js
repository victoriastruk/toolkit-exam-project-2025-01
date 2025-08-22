const fs = require('fs');
const { LOG_DIR_PATH, LOG_FILE_PATH } = require('../constants');

if (!fs.existsSync(LOG_DIR_PATH)) {
  fs.mkdirSync(LOG_DIR_PATH, { recursive: true });
}

function logError(error) {
  const logEntry = {
    message: error.message || 'Unknown error',
    time: Date.now(),
    code: error.code || 500,
    stackTrace: error.stack ? parseStack(error.stack) : {},
  };

  fs.appendFileSync(LOG_FILE_PATH, JSON.stringify(logEntry) + '\n', 'utf-8');
}

function parseStack(stack) {
  const lines = stack.split('\n').map((line) => line.trim());
  return lines;
}

module.exports = { logError };
