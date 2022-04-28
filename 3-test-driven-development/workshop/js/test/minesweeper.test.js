const { Minesweeper } = require("../src/minesweeper.js");

const generatePlanGame = (linesNb, columnsNb) => {
  let planGame = "";

  for (let i = 0; i < linesNb; i++) {
    for (let j = 0; j < columnsNb; j++) {
      planGame += Math.random() > 0.5 ? "." : "*";
    }
    if (i + 1 !== linesNb) {
      planGame += "\n";
    }
  }

  return `${linesNb} ${columnsNb}\n` + planGame + "\n0 0";
};

describe("Read input", () => {
  it("should throw an error if input is not a string", () => {
    expect(() => new Minesweeper(1)).toThrow("First line must be a string");
  });

  it("Check if first line of input is two numbers separate by a space", () => {
    expect(() => new Minesweeper("hello world!\n0 0")).toThrow(
      "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
    );
  });

  const numberValueCheck = [
    ["5 -1\n0 0", false],
    ["0 5\n0 0", false],
    ["1 120\n0 0", false],
    [generatePlanGame(1, 100), true],
    [generatePlanGame(4, 4), true],
  ];
  it.each(numberValueCheck)(
    "Check if first line number are greater than 0 and lower or equal than 100",
    (input, valid) => {
      if (valid) {
        expect(() => new Minesweeper(input)).not.toThrow();
      } else {
        expect(() => new Minesweeper(input)).toThrow(
          "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
        );
      }
    }
  );

  const linesCheck = [
    ["1 3\n-e-\n0 0", false],
    ["2 4\n_b__\n___b\n0 0", false],
    ["1 4\n...*\n0 0", true],
  ];
  it.each(linesCheck)(
    "should throw an error if lines not contains * or . characters ",
    (input, valid) => {
      if (valid) {
        expect(() => new Minesweeper(input)).not.toThrow();
      } else {
        expect(() => new Minesweeper(input)).toThrow(
          "All lines must be two number between ]0,100] separated by a space or ('.' or '*')"
        );
      }
    }
  );

  const linesLengthCheck = [
    ["2 2\n...\n...\n0 0", false],
    ["2 2\n..\n0 0", false],
    ["2 2\n.*\n*.\n0 0", true],
  ];
  it.each(linesLengthCheck)(
    "should have same line and column as expected",
    (input, valid) => {
      if (valid) {
        expect(() => new Minesweeper(input)).not.toThrow(
          "Lines and columns doesn't match with length expected"
        );
      } else {
        expect(() => new Minesweeper(input)).toThrow(
          "Lines and columns doesn't match with length expected"
        );
      }
    }
  );

  it("should have zero caracters at the end", () => {
    expect(() => new Minesweeper("2 2\n.*\n..")).toThrow(
      "Last line must be 0 0"
    );
  });

  const handleMultiple = [
    ["2 2\n.*\n..\n1 3\n..*\n0 0", true],
    ["1 1\n.\n*\n.\n0 0", false],
    ["2 2\n..\n.*\n2 3\n...\n0 0", false],
  ];
  it.each(handleMultiple)("should handle multiple fields", (input, valid) => {
    if (valid) {
      expect(() => new Minesweeper(input)).not.toThrow();
    } else {
      expect(() => new Minesweeper(input)).toThrow(
        "Lines and columns doesn't match with length expected"
      );
    }
  });
});

describe("Solving output", () => {
  it("should return field with id", () => {
    const field = new Minesweeper(`1 1\n.\n0 0`).solve();
    expect(field).toContain("Field #1:\n");
  });
});
