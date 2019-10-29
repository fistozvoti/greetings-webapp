module.exports = function greetFactory(pool) {

    var theGreet = ''
    let isError = false;
    let upperCaseName = '';
    var counter = 0;

    async function greetUser(name, lang) {
        upperCaseName = name.toUpperCase().charAt(0) + name.slice(1).toLowerCase();

        if (upperCaseName.length > 0) {

            let tableData = await pool.query('select * from greeted_users');
            let allUserData = tableData.rows
            for (var z = 0; z < allUserData.length; z++) {
                if (upperCaseName === allUserData[z].names) {
                    await pool.query('update greeted_users set times_greeted = $1 where names = $2', [allUserData[z].times_greeted + 1, upperCaseName]);
                    message(name, lang)
                    return;
                }
            }
            await pool.query('insert into greeted_users (names, times_greeted) values($1, $2)', [upperCaseName, 1]);
            message(name, lang)
            return;
        }
    }

    function message(name, lang) {

        if (name != '' && lang != undefined) {

            if (lang === "English") {
                theGreet = "Hello, " + upperCaseName;
            }
            else if (lang === "IsiXhosa") {
                theGreet = "Molo, " + upperCaseName;
            }
            else if (lang === "Afrikaans") {
                theGreet = "Hallo, " + upperCaseName;
            }

        }
        
    }

    async function displayGreetingsFor(name) {
        let times = await pool.query('SELECT * FROM greeted_users WHERE names = $1', [name]);
        let countTimes = times.rows[0].times_greeted;
        return countTimes;
    };

    async function tableInfo () {
        let listOfNames = await pool.query('SELECT * FROM greeted_users');
        return listOfNames.rows;
    };

    function greetTheUser() {
        return theGreet;
    }

    async function displayCounter() {
        let dbCounter = await pool.query('SELECT COUNT(*) FROM greeted_users');
    
        counter = dbCounter.rows[0].count;        
        return counter;
    };


    async function reset() {
        counter = 0;
        theGreet = '';
        upperCaseName = '';
        await pool.query('DELETE FROM greeted_users');
    }

    error = () => isError;

    return {
        reset,
        error,
        tableInfo,
        greetUser,
        greetTheUser,
        displayCounter,
        displayGreetingsFor,
    }
}