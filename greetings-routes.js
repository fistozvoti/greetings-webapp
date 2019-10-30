module.exports = function (greetFactory) {

    async function index(req, res) {
        let showCounter = await greetFactory.displayCounter();        

        res.render('index', {
            greet: await greetFactory.greetTheUser(),
            counter: showCounter,
        });
    }

    async function greet(req, res) {
        isError = false
        var name = req.body.name.replace(/[0-9]/g, '').replace(/[^\w\s]/gi, '');
        var language = req.body.language;

        
        
        if (name === '' && language !== undefined) {
            isError = true;
            req.flash('error', 'Please enter name!');
            res.redirect('/');
        }
        else if (language === undefined && name !== '') {
            isError = true;
            req.flash('error', 'Please select language!');
            res.redirect('/');
        }
        else if (name === '' && language === undefined) {
            isError = true;
            req.flash('error', 'Please enter name & select language!');
            res.redirect('/');
        } else {
            await greetFactory.greetUser(name, language);
            res.redirect('/');
        }
    }

    async function counter (req, res) {
        let name = req.params.tableOfNames;
        let number = await greetFactory.displayGreetingsFor(name);

        if (number === 1) {
            req.flash('recMsg', 'The user ' + name + ' got greeted ' + number + ' time');
        } else {
            req.flash('recMsg', 'The user ' + name + ' got greeted ' + number + ' times');
        }
            res.render('counter', {
            num: number 
            })
    }

    async function table (req, res) {
        let listNames = await greetFactory.tableInfo();
        res.render('table', {
            allNames: listNames
        });
    }

    async function reset(req, res) {
        let showCounter = await greetFactory.displayCounter();    
        greetFactory.reset() 
          

        res.render('index', {
            greet: await greetFactory.greetTheUser(),
            counter: showCounter,
        });
    }

    function homePage(req, res) {
        res.redirect('/');
    }

    function backToGreeted(req, res){
        res.redirect('/table')
    }

    return {
        index,
        greet,
        reset,
        table,
        counter,
        homePage,
        backToGreeted
    }


}