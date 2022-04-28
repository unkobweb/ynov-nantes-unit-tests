class Minesweeper {
  constructor(input) {
    this.checkInput(input);
  }

  checkInput(input) {
    if (typeof input !== "string") {
      throw new Error("First line must be a string");
    }

    const lines = input.split("\n");

    if (lines.pop() !== "0 0") {
      throw new Error("Last line must be 0 0");
    }

    const firstLinePattern = new RegExp(
      /^\b([1-9]|[1-9][0-9]|100)\b\s\b([1-9]|[1-9][0-9]|100)\b$/,
      "gm"
    );

    if (!firstLinePattern.test(lines[0])) {
      throw new Error(
        "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
      );
    }

    const [linesNb, columnsNb] = lines
      .shift()
      .split(" ")
      .map((nb) => parseInt(nb));

    if (
      lines.length !== linesNb ||
      !lines.every((line) => line.length === columnsNb)
    ) {
      throw new Error("Lines and columns doesn't match with length expected");
    }

    const planGamePattern = new RegExp(/^(\.|\*)+$/);

    if (!lines.every((line) => planGamePattern.test(line))) {
      throw new Error("Lines must contains * or . characters");
    }
  }
}

module.exports = { Minesweeper };
