class Minesweeper {
  constructor(input) {
    this.checkInput(input);
  }

  checkInput(input) {
    if (typeof input !== "string") {
      throw new Error("First line must be a string");
    }

    const lines = input.split("\n");

    const firstLinePattern = new RegExp(/^-?[0-9]+\s-?[0-9]+$/, "gm");

    if (!firstLinePattern.test(lines[0])) {
      throw new Error("First line must be two number separated by a space");
    }

    const numbers = lines[0].split(" ").map((nb) => parseInt(nb));

    if (!numbers.every((num) => num > 0 && num <= 100)) {
      throw new Error(
        "First line numbers must be greater than 0 and lower or equal than 100"
      );
    }
  }
}

module.exports = { Minesweeper };
