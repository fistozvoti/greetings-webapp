module.exports = function greetFactory() {

    var theNames = {};
    var theGreet = ''
    let isError = false;
    counterValue = () => Object.keys(theNames).length;

    greetUser = (name, lang) => {
        isError = false;
        let upperCaseName = name.toUpperCase().charAt(0) + name.slice(1).toLowerCase();

        if (name != '' && lang != undefined) {


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

        if (name === '' && lang != undefined) {
            isError = true;
            return 'Please enter name!';
        }
        if (lang === undefined && name != '') {
            isError = true;
            return 'Please select language!'
        }
        isError = true;
        return 'Please enter name or select language!';
    }
    greetTheUser = () => theGreet;

    updatePeopleObject = () => theNames;

    error = () => isError;

    return {
        greetUser,
        counterValue,
        greetTheUser,
        error,
        updatePeopleObject
    }
}