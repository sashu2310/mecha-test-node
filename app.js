// defining express pre-requisities
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');


require('dotenv').config();

const app = express();

// routes file
const routes = require('./router/indexRoute');

// port number
const port = 3000;
//database url
const dbUrl = process.env.dbUrl;
//connecting database
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
//upon connection
mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('error',(error)=>{
  console.log(error);
});

// middlewares
app.use(cors());
app.use(helmet());
// app.use(expressValidator());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,Accept-Language');
  next();
});

app.get('/', (req, res, next) => {
  console.error(`${req.ip} tried to reach ${req.originalUrl}`);
  const err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
  res.send('Welcome to Mechademy-Test');
});

// routing
app.use('/test',cors(), routes);

// listening
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
