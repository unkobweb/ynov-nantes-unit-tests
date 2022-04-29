const CLIENT_URL = `localhost:5000`;

Feature('Todo list');

Scenario('Test if I can create a task', ({ I }) => {
    I.amOnPage(CLIENT_URL);
    I.fillField('.form-control','Put out trash');
    I.click('#create-todo');
    I.waitForText('Put out trash');
});

Scenario('Test if I can complete a task', ({ I }) => {
    I.amOnPage(CLIENT_URL);
    I.fillField('.form-control', 'Hack NASA');
    I.click('#create-todo');
    I.see('Hack NASA', '#todo-body')
    I.click('#todo-body tr:last-child button')

    I.waitForText('Hack NASA', '#done-body')
});