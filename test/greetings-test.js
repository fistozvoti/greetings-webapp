const assert = require('assert');

const greetFactory = require('../greetings');


describe('Greetings function', function () {
    var greet = greetFactory();

    it('should be able to greet the inserted name with English as the selected language', function () {
        
        greet.greetUser("Iviwe", "English");
        assert.equal("Hello, Iviwe", greet.greetTheUser());
    });
    it('should be able to greet the inserted name with IsiXhosa as the selected language', function () {
        
        greet.greetUser("Iviwe", "IsiXhosa");
        assert.equal("Molo, Iviwe", greet.greetTheUser());
    });
    it('should be able to greet the inserted name with Afrikaans as the selected language', function () {
        
        greet.greetUser("Iviwe", "Afrikaans");
        assert.equal("Hallo, Iviwe", greet.greetTheUser());
    });
    it('the counter should be able to keep track of how many names that have been greeted', function () {
        var countNames = greetFactory();

        countNames.greetUser("Siya", "English");
        countNames.greetUser("Iviwe", "Afrikaans");
        countNames.greetUser("Xola", "IsiXhosa");


        assert.equal(3, countNames.counterValue());
    });
    it('the counter should not count the same name twice', function () {
        var countNames = greetFactory();

        countNames.greetUser("Bontle", "IsiXhosa");
        countNames.greetUser("Bontle", "IsiXhosa");
        countNames.greetUser("Xola", "IsiXhosa");


        assert.equal(2, countNames.counterValue());
    });
    it('the counter should count the name once even if it has been greeted in all three different languages', function () {
        var countNames = greetFactory();

        countNames.greetUser("Bontle", "IsiXhosa");
        countNames.greetUser("Bontle", "English");
        countNames.greetUser("Bontle", "Afrikaans");


        assert.equal(1, countNames.counterValue());
    });
});