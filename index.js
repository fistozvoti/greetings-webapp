let express = require('express');
let bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

let greetFactory = require('./greetings');

let app = express();

const greetingsFactory = greetFactory();



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



app.get("/", function (req, res) {
    res.render('index', {
        greet: greetingsFactory.greetTheUser(),
        counter: greetingsFactory.counterValue()
    });
});

app.post('/select/language', function (req, res) {

    var name = req.body.name;
    var language = req.body.language;
    greetingsFactory.greetUser(name, language);

    res.redirect('/');
  });

let PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});