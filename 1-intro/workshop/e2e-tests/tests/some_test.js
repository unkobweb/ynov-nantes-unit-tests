Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('.search-cta');
    I.fillField('.searchfield','info');
    I.click('.search-input-submit');
    I.waitForText('Bachelor Informatique');
});
