module.exports = function (greetFactory) {

    function index(req, res) {

        res.render('index', {
            greet: greetFactory.greetTheUser(),
            counter: greetFactory.counterValue(),
        });
    }

    function greet(req, res) {
        isError = false
        var name = req.body.name;
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
            req.flash('error', 'Please enter name or select language!');
            res.redirect('/');
        } else {
            greetFactory.greetUser(name, language);
            res.redirect('/');
        }


    }

    function reset(req, res) {

        greetFactory.reset()
        res.render('index', {
            greet: greetFactory.greetTheUser(),
            counter: greetFactory.counterValue(),
        });
    }
    return {
        index,
        greet,
        reset
    }


}