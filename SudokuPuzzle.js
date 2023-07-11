class SudokuGenerator {
  constructor() {
    this.SIZE = 9;
    this.EMPTY_CELL = 0;
    this.board = [];
  }

  generateGame() {
    // Fill the entire board
    this.fillBoard();

    // Remove some numbers to create blank spaces
    this.removeNumbers();
  }

  fillBoard() {
    // Clear the board
    this.clearBoard();

    // Generate a random number for the first row
    let num = Math.floor(Math.random() * this.SIZE) + 1;

    // Fill the first row with random numbers
    for (let col = 0; col < this.SIZE; col++) {
      this.board[0][col] = (num + col) % this.SIZE + 1;
    }

    // Shuffle the numbers in the first row
    this.shuffleRow(0);

    // Fill the remaining rows using the first row as a guide
    for (let row = 1; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        this.board[row][col] = this.board[0][(col + row * 3) % this.SIZE];
      }
    }
  }

  shuffleRow(row) {
    for (let col = 0; col < this.SIZE; col++) {
      let randomCol = Math.floor(Math.random() * this.SIZE);
      let temp = this.board[row][col];
      this.board[row][col] = this.board[row][randomCol];
      this.board[row][randomCol] = temp;
    }
  }

  removeNumbers() {
    let cellsToRemove = this.SIZE * this.SIZE / 2;

    while (cellsToRemove > 0) {
      let row = Math.floor(Math.random() * this.SIZE);
      let col = Math.floor(Math.random() * this.SIZE);

      if (this.board[row][col] !== this.EMPTY_CELL) {
        this.board[row][col] = this.EMPTY_CELL;
        cellsToRemove--;
      }
    }
  }

  clearBoard() {
    for (let row = 0; row < this.SIZE; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.SIZE; col++) {
        this.board[row][col] = this.EMPTY_CELL;
      }
    }
  }

  printBoard() {
    for (let row = 0; row < this.SIZE; row++) {
      let rowString = "";
      for (let col = 0; col < this.SIZE; col++) {
        let value = this.board[row][col];
        let display = (value === this.EMPTY_CELL) ? " " : String(value);
        rowString += display + " ";
      }
      console.log(rowString);
    }
  }
}

const generator = new SudokuGenerator();
generator.generateGame();
generator.printBoard();
