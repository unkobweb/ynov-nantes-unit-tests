class Minesweeper {
  constructor(input) {
    this.planGamePattern = new RegExp(/^(\.|\*)+$/);
    this.firstLinePattern = new RegExp(
      /^\b([1-9]|[1-9][0-9]|100)\b\s\b([1-9]|[1-9][0-9]|100)\b$/
    );
    this.checkInput(input);
  }

  checkField(lines) {
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

    // if (!lines.every((line) => this.planGamePattern.test(line))) {
    //   throw new Error("Lines must contains * or . characters");
    // }
  }

  checkInput(input) {
    if (typeof input !== "string") {
      throw new Error("First line must be a string");
    }

    const lines = input.split("\n");

    if (lines.pop() !== "0 0") {
      throw new Error("Last line must be 0 0");
    }

    if (!this.firstLinePattern.test(lines[0])) {
      throw new Error(
        "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
      );
    }

    if (
      !lines.every(
        (line) =>
          this.planGamePattern.test(line) || this.firstLinePattern.test(line)
      )
    ) {
      throw new Error(
        "All lines must be two number between ]0,100] separated by a space or ('.' or '*')"
      );
    }

    let field = [lines.shift()];

    for (let i = 0; i < lines.length; i++) {
      if (this.planGamePattern.test(lines[i])) {
        field.push(lines[i]);
      } else {
        this.checkField(field);
        field = [lines[i]];
      }
    }

    this.checkField(field);
  }
}

module.exports = { Minesweeper };
