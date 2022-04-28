const { Minesweeper } = require("../src/minesweeper.js");

const goodField = "3 3\n*..\n...\n.*.\n0 0";
const badField = "hello world!";

describe("Read input", () => {
  it("should throw an error if input is not a string", () => {
    expect(() => new Minesweeper(1)).toThrow("First line must be a string");
  });

  it("Check if first line of input is two numbers separate by a space", () => {
    expect(() => new Minesweeper(badField)).toThrow(
      "First line must be two number greater than 0 and lower or equal than 100 separated by a space"
    );
  });

  const numberValueCheck = [
    ["5 -1", false],
    ["0 5", false],
    ["1 120", false],
    ["5 100", true],
    ["4 4", true],
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
    ["1 3\n-e-", false],
    ["2 4\n_b__\n___b", false],
    ["1 4\n...*", true],
  ];
  it.each(linesCheck)(
    "should throw an error if lines not contains * or . characters ",
    (input, valid) => {
      if (valid) {
        expect(() => new Minesweeper(input)).not.toThrow();
      } else {
        expect(() => new Minesweeper(input)).toThrow(
          "Lines must contains * or . characters"
        );
      }
    }
  );

  it("should have same line and column as expected", () => {
    expect(() => new Minesweeper("2 2\n...\n...")).toThrow();
    expect(() => new Minesweeper("2 2\n..")).toThrow();
    expect(() => new Minesweeper("2 2\n.*\n*.")).not.toThrow();
  });

  // todo does not match with number of lines and columns
});
