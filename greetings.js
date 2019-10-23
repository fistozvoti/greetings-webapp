module.exports = function greetFactory(pool) {

    var theNames = {};
    var theGreet = ''
    let isError = false;
    counterValue = () => Object.keys(theNames).length;

    async function greetUser(name, lang){
        let upperCaseName = name.toUpperCase().charAt(0) + name.slice(1).toLowerCase();

        if (name != '' && lang != undefined) {

            // let testDB = await pool.query('SELECT * FROM greeted_users WHERE name = $1', [upperCaseName]);
            //     if (testDB.rowCount === 1) {
            //         let newName = testDB.rows[0].times_greeted;
            //         await pool.query('UPDATE greeted_users SET name = $1,times_greeted = $2 +1 WHERE id = $3', [upperCaseName, newName, testDB.rows[0].id]);
            //     } else {
            //         let dataBase = [
            //             upperCaseName,
            //             1
            //         ];
            //         await pool.query('insert into greeted_users (name, times_greeted) values ($1, $2) returning name, times_greeted', dataBase);
            //     }
            
            if (theNames[upperCaseName] === undefined) {
                theNames[upperCaseName] = 0;
            }
            else {
                theNames[upperCaseName]++;
            }
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
    

    async function reset(){
        theNames = {};
        theGreet = ''
    }

    greetTheUser = () => theGreet;

    updatePeopleObject = () => theNames;

    error = () => isError;

    return {
        greetUser,
        counterValue,
        greetTheUser,
        reset,
        error,
        updatePeopleObject
    }
}