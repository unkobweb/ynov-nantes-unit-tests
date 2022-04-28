const { Minesweeper } = require("../src/minesweeper.js");

const goodField = "3 3\n*..\n...\n.*.\n0 0";
const badField = "hello world!";

describe("Read input", () => {
  it("should throw an error if input is not a string", () => {
    expect(() => new Minesweeper(1)).toThrow("First line must be a string");
  });

  it("Check if first line of input is two numbers separate by a space", () => {
    expect(() => new Minesweeper(badField)).toThrow(
      "First line must be two number separated by a space"
    );
  });

  it("Check if first line number are greater than 0 and lower or equal than 100", () => {
    expect(() => new Minesweeper("5 -1")).toThrow(
      "First line numbers must be greater than 0 and lower or equal than 100"
    );
    expect(() => new Minesweeper("0 5")).toThrow(
      "First line numbers must be greater than 0 and lower or equal than 100"
    );
    expect(() => new Minesweeper("1 120")).toThrow(
      "First line numbers must be greater than 0 and lower or equal than 100"
    );
    expect(() => new Minesweeper("5 100"));
    expect(() => new Minesweeper("4 4"));
  });
});
