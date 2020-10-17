const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const createDBConnection = require('./config/db-config');
const { auth } = require("./middleware/auth");

dotenv.config({ path: './config/.env' });

const authRoutes = require('./routes/auth');
const guard = require('./routes/guard');
const avatar = require('./routes/avatar');

// connect to Database
createDBConnection();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(methodOverride('_method'));

// EXPRESS-SESSION CONFIG
app.use(
  require('express-session')({
    secret: 'way to cougar',
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.use('/auth', authRoutes);
app.use('/guards', guard);
app.use('/avatar', avatar);

app.get('*', auth, (req, res) => {
  res.redirect('/guards')
});


const PORT = process.env.PORT || 5000;

const SERVER = app.listen(PORT, () =>
  console.log(`Server running  on  port ${PORT}.`)
);

process.on('unhandledRejection', (error, promise) => {
  console.log(error.message);
  SERVER.close(() => process.exit(1));
});
