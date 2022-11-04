const express = require('express');
const app = express();
const path = require('path');
// ! Uncomment lines 5 and 10 if we run into CORS issues
// const cors = require('cors');
const apiRouter = require('./routes/api');

const PORT = 3000;

//app.use(cors({origin: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving index.html to the root
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// All our front end requests should be handled in our apiRouter
app.use('/api', apiRouter);

// ! Basic backend check
app.get('/express', (req, res) => {
  return res.status(200).json({ express: 'express is connected' });
});

// 404 handlers
app.use('*', (req, res) => {
  res.status(404).json('Not Found, default 404 handler in server.js');
});

// Global error handler
// When returning next, we can modify the log which will be console logged, status which will be sent to our users request, and the message that is sent to the user
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
module.exports = app;
