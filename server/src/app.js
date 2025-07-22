const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const handlerError = require('./handlerError/handler');
const multerErrorHandler = require('./handlerError/multerHandler');
const { FILES_PATH } = require('./constants');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(FILES_PATH)));
app.use(router);
app.use(multerErrorHandler);
app.use(handlerError);

module.exports = app;
