const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: './tests/**/*_test.js',
  output: 'dist',
  include: {
    I: './steps_file.js'
  },
  helpers: {
    Playwright: {
      url: ``,
      waitForTimeout: 5000,
      show: process.env.HEADLESS === 'true' ? false : true,
      timeout: 5000,
    },
    REST:{}
  },
  bootstrap: null,
  mocha: {},
  name: 'integrations-e2e'
}