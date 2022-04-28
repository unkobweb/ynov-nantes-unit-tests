const { Minesweeper } = require("../src/minesweeper.js");

const goodField = "3 3\n*..\n...\n.*.\n0 0";
const badField = "hello world!";

describe("Read input", () => {
  it("Check if first line of input is two numbers separate by a space", () => {
    expect(() => new Minesweeper(badField)).toThrow();
  });
});
