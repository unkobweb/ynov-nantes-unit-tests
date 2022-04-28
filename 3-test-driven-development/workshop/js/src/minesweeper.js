class Minesweeper {
  constructor(input) {
    this.planGamePattern = new RegExp(/^(\.|\*)+$/);
    this.firstLinePattern = new RegExp(
      /^\b([1-9]|[1-9][0-9]|100)\b\s\b([1-9]|[1-9][0-9]|100)\b$/
    );
    this.checkInput(input);
    this.input = input;
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

  checkForBombs(line) {
    let result = "";

    const positions = line.split("");
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] === "*") {
        result += "*";
      } else {
        let neerBombs = 0;
        if (positions[i - 1] === "*") {
          neerBombs++;
        }
        if (positions[i + 1] === "*") {
          neerBombs++;
        }
        result += neerBombs;
      }
    }

    return result;
  }

  solve() {
    const lines = this.input.split("\n");
    lines.pop();
    const result = [];

    let fieldIndex = 1;

    lines.forEach((line) => {
      if (this.firstLinePattern.test(line)) {
        if (fieldIndex !== 1) {
          result.push("");
        }
        result.push(`Field #${fieldIndex}:`);
        fieldIndex++;
      } else {
        result.push(this.checkForBombs(line));
      }
    });

    return result.join("\n");
  }
}

module.exports = { Minesweeper };
