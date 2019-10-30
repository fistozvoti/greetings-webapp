const assert = require('assert');

const greetFactory = require('../greetings');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greeted_users_tests';

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('Testing Greetings WebApp', function () {
    describe('Testing database & app functionality', function () {
        it('The counter should return 0 if there is no name/ names entered', async function () {
            await pool.query('delete from greeted_users;');
            let testCounter = greetFactory(pool);

            let counter = await testCounter.displayCounter();
            assert.equal(counter, '0');
        });
        it('The counter should return 5 if there is five names entered', async function () {
            await pool.query('delete from greeted_users;');
            let testCounter = greetFactory(pool);
            await testCounter.greetUser('Iviwe');
            await testCounter.greetUser('Paul');
            await testCounter.greetUser('Steve');
            await testCounter.greetUser('Jack');
            await testCounter.greetUser('Kim');
            await testCounter.greetUser('Iviwe');

            let counter = await testCounter.displayCounter();
            assert.equal(counter, '5');
        });
        it('The counter should return 4, with 5 names entered and exclude the repeated name', async function () {
            await pool.query('delete from greeted_users;');
            let testCounter = greetFactory(pool);
            await testCounter.greetUser('Iviwe');
            await testCounter.greetUser('Steve');
            await testCounter.greetUser('Jack');
            await testCounter.greetUser('Kim');
            await testCounter.greetUser('Iviwe');

            let counter = await testCounter.displayCounter();
            assert.equal(counter, '4');
        });
        it('Should count the name once in the counter no matter what capitals are different in the name', async function () {
            await pool.query('delete from greeted_users;');
            let testCounter = greetFactory(pool);

            await testCounter.greetUser('Ashanti');
            await testCounter.greetUser('aSHanti');
            await testCounter.greetUser('ASHANTI');
            await testCounter.greetUser('ashANtI');

            let counter = await testCounter.displayCounter();
            assert.equal(counter, '1');
        });
        it('Should be able to clear data from the the table', async function () {
            await pool.query('delete from greeted_users;');
            let clearTable = greetFactory(pool);
            await clearTable.greetUser('Bontle');

            let insertName = await pool.query('SELECT names FROM greeted_users');
            assert.deepEqual(insertName.rows, [{ names: 'Bontle' }]);

            await clearTable.reset();
            insertName = await clearTable.tableInfo();
            assert.deepEqual(insertName, []);
        });
        it("Should be able to greet with the language IsiXhosa selected", async function () {
            await pool.query('delete from greeted_users;');
            let greetMessage1 = greetFactory(pool);
            await greetMessage1.greetUser('Iviwe', 'IsiXhosa');

            let greet = await greetMessage1.greetTheUser();
            assert.deepEqual(greet, 'Molo, Iviwe');
        });
        it("Should be able to greet with the language Afrikaans selected", async function () {
            await pool.query('delete from greeted_users;');
            let greetMessage2 = greetFactory(pool);
            await greetMessage2.greetUser('Iviwe', 'Afrikaans');

            let greet = await greetMessage2.greetTheUser();
            assert.deepEqual(greet, 'Hallo, Iviwe');
        });
        it("Should be able to greet with the language English selected", async function () {
            await pool.query('delete from greeted_users;');
            let greetMessage3 = greetFactory(pool);
            await greetMessage3.greetUser('Iviwe', 'English');

            let greet = await greetMessage3.greetTheUser();
            assert.deepEqual(greet, 'Hello, Iviwe');
        });
        it('Should return 4 names in total and exclude the repeated names ', async function () {
            await pool.query('delete from greeted_users;');
            let checkNames = greetFactory(pool);
            await checkNames.greetUser('Iviwe');
            await checkNames.greetUser('Yamkela');
            await checkNames.greetUser('Yamkela');
            await checkNames.greetUser('Siya');
            await checkNames.greetUser('Bontle');
            await checkNames.greetUser('Yamkela');
            let displayNames1 = await pool.query('SELECT names FROM greeted_users');
            assert.deepEqual(displayNames1.rows, [{ names: 'Iviwe' },{ names: 'Siya' },{ names: 'Bontle' },{ names: 'Yamkela' }]);
        });
        it('Should exclude the repeated name and return 2 of the entered names', async function () {
            await pool.query('delete from greeted_users;');
            let checkNames2 = greetFactory(pool);
            await checkNames2.greetUser('Lisa');
            await checkNames2.greetUser('Lisa');
            await checkNames2.greetUser('Helna');
            let displayNames2 = await pool.query('SELECT names FROM greeted_users');
            assert.deepEqual(displayNames2.rows, [{ names: 'Lisa' }, { names: 'Helna' }]);
        });
        it("Should be able to keep track of how many times a name has been greeted", async function () {
            await pool.query('delete from greeted_users;');
            let checkNames3 = greetFactory(pool);

            await checkNames3.greetUser('Iviwe');
            await checkNames3.greetUser('Iviwe');

            let timeGreeted1 = await checkNames3.displayGreetingsFor('Iviwe');
            assert.deepEqual(timeGreeted1, 2);
        });
        it("Should be able to keep track of how many times each name has been greeted", async function () {
            await pool.query('delete from greeted_users;');
            let checkNames4 = greetFactory(pool);

            await checkNames4.greetUser('Asanda');
            await checkNames4.greetUser('Asanda');
            await checkNames4.greetUser('Melissa');

            let timeGreeted2 = await checkNames4.displayGreetingsFor('Melissa');
            assert.deepEqual(timeGreeted2, 1);

            timeGreeted2 = await checkNames4.displayGreetingsFor('Asanda');
            assert.deepEqual(timeGreeted2, 2);
        });
    });
});