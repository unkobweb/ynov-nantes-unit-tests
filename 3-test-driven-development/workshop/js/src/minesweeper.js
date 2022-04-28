class Minesweeper {
  constructor(input) {
    this.checkInput(input);
  }

  checkInput(input) {
    const lines = input.split("\n");

    const firstLinePattern = new RegExp(/^[0-9]+\s[0-9]+$/, "gm");

    if (!firstLinePattern.test(lines[0])) {
      throw new Error("First line must be two number separated by a space");
    }
  }
}

module.exports = { Minesweeper };
