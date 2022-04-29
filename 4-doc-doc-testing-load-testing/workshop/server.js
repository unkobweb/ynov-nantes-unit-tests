
const mongoose = require('mongoose');
const DB_URI = 'mongodb://mongo:27017/toDoApp';
const PORT = 5000;

const app = require('./app');

mongoose.connect(DB_URI).then(() => {
  console.log('Listening on port: ' + PORT);
  app.listen(PORT);
});
