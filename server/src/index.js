const http = require('http');
// ============================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { dailyBackup } = require('./utils/dailyBackup');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

cron.schedule('0 0 * * *', () => {
  dailyBackup();
  console.log('Daily backup executed.');
});

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
controller.createConnection(server);
