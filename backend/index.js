require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Boom = require('boom');
const personController = require('./controllers/personController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/person', personController);

app.use((err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const {
      statusCode,
      payload: { message },
    } = err.output;
    return res.status(statusCode).json({ message });
  }
  console.error('inside error', err, err.message, err.stack);
  return res.status(500).json({ message: 'Internal Error' });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
