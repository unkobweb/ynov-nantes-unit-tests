class Minesweeper {
  constructor(input) {
    const lines = input.split("\n");
    if (lines[0].test(/^[0-9]+\s[0-9]+$/)) {
      throw new Error("First line must e two number separated by a space");
    }
  }
}

module.exports = { Minesweeper };
