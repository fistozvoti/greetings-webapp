const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const greetFactory = require('./greetings');
const GreetingsRoutes = require('./greetings-routes')

const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greeted_users';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const greetingsFactory = greetFactory(pool);
const greetRoutes = GreetingsRoutes(greetingsFactory)


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'what is used for displaying error messages',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//exposin the static folders
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

//Routes for my app
app.get('/', greetRoutes.index);
app.post('/inputName/greetUser/', greetRoutes.greet);
app.get('/counter/:tableOfNames', greetRoutes.counter);
app.post('/backToHomePage', greetRoutes.homePage);
app.get('/table',greetRoutes.table)
app.post('/reset', greetRoutes.reset);
app.get('/counter/:userName', greetRoutes.counter);

let PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});