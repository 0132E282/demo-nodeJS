require('dotenv').config();
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const methodOverride  = require('method-override');
var flash = require('connect-flash');
const session = require('express-session');

const database = require( path.join(__dirname, 'src/config/database'))
const router = require( path.join(__dirname, 'src/routes/index'));


const app = express()
const port = process.env.APP_PORT || 3000;
app.use(methodOverride('_method'))
// middleware
app.use(express.urlencoded({
  extended: true,  // support for parsing application/x-www-form-urlencoded
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: process.env.SESSION_RASAVE,
  saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED,
  cookie: { maxAge: 600000 } // 10 minutes
}))
app.use(flash());

app.use(express.json())


// template engine
app.engine('handlebars', engine({
  helpers: require( path.join(__dirname, 'src/config/handlebars-helpers')) //only need this
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/resources/views'));


// router
app.use('/',router);

// database
database.connect();


app.listen(port, () => {
  console.log(`Example app listening on port http://${process.env.APP_NAME}:${port}`)
})