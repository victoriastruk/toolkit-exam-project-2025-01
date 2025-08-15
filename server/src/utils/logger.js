const fs = require('fs');
const { LOG_FILE_PATH } = require('../constants');

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
