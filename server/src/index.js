const http = require('http');
require('dotenv').config();
const cron = require('node-cron');
const { dailyBackup } = require('./utils/dailyBackup');

const controller = require('./socketInit');
const app = require('./app');

const PORT = process.env.PORT || 3000;

cron.schedule('0 0 * * *', () => {
  dailyBackup();
  console.log('Daily backup executed.');
});

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
controller.createConnection(server);
