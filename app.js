require('dotenv').config();
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const methodOverride  = require('method-override');
var flash = require('connect-flash');
const session = require('express-session');

const app = express()
const database = require( path.join(__dirname, 'src/config/database'))
const router = require(path.join(__dirname, 'src/routes/index'));
app.use(express.static(path.join(__dirname, 'src/public')));

const port = process.env.APP_PORT || 3000;
// Serve static files trong thư mục uploads
app.use('/storage', express.static('src/storage'));
// middleware
app.use(express.urlencoded({
  extended: true,  // support for parsing application/x-www-form-urlencoded
}));

app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: process.env.SESSION_RASAVE,
  saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED,
  cookie: { maxAge: 600000 } // 10 minutes
}))

app.use(flash());

// template engine
app.engine('handlebars', engine({
  helpers: require( path.join(__dirname, 'src/config/handlebars-helpers')) ,
  layoutsDir: path.join(__dirname, 'src/resources/views/layouts'),  // Thư mục chứa layout
  partialsDir: path.join(__dirname, 'src/resources/views/partials'),  // Thư mục chứa partials (components)
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/resources/views/pages'));

// router
app.use('/',router);

// database
database.connect();


app.listen(port, () => {
  console.log(`Example app listening on port http://${process.env.APP_NAME}:${port}`)
})