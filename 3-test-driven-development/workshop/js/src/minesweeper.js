class Minesweeper {
  constructor(input) {
    this.checkInput(input);
  }

  checkInput(input) {
    if (typeof input !== "string") {
      throw new Error("First line must be a string");
    }

    const lines = input.split("\n");

    const firstLinePattern = new RegExp(
      /^\b([1-9]|[1-9][0-9]|100)\b\s\b([1-9]|[1-9][0-9]|100)\b$/,
      "gm"
    );

    if (!firstLinePattern.test(lines[0])) {
      throw new Error(
        "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
      );
    }
  }
}

module.exports = { Minesweeper };
