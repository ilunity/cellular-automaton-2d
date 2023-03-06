export class CellularAutomaton {
  private readonly frameArray: Array<boolean> = [];
  private readonly size: number;

  constructor(size: number, initArray?: boolean[]) {
    this.size = size;
    if (initArray) {
      this.frameArray = [...initArray];
      return;
    }

    this.frameArray = [...Array(size * size)].map(() => false);
  }

  getElement(row: number, column: number) {
    const framelessRow = (this.size + row) % this.size;
    const framelessColumn = (this.size + column) % this.size;
    return this.frameArray[framelessRow * this.size + framelessColumn];
  }

  setElement(row: number, column: number, value: boolean) {
    this.frameArray[row * this.size + column] = value;
  }

  getCopy(): CellularAutomaton {
    const newFrame = new CellularAutomaton(this.size, this.frameArray);
    return newFrame;
  }

  toggleElement(row: number, column: number) {
    const elementValue = this.getElement(row, column);
    this.setElement(row, column, !elementValue);
  }

  getFrameWithToggledElement(row: number, column: number) {
    const newFrame = this.getCopy();

    const elementValue = this.getElement(row, column);
    newFrame.setElement(row, column, !elementValue);

    return newFrame;
  }

  defineNeighborhoods(row: number, column: number): number {
    let neighborhoods = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        if (this.getElement(row + i, column + j)) {
          neighborhoods += 1;
        }
      }
    }

    return neighborhoods;
  }

  getTransformedFrame(): CellularAutomaton {
    const newFrame = this.getCopy();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const neighborhoods = this.defineNeighborhoods(i, j);
        const isAlive = this.getElement(i, j);

        if (!isAlive) {
          if (neighborhoods === 3) {
            newFrame.toggleElement(i, j);
          }
          continue;
        }

        if (neighborhoods < 2 || neighborhoods > 3) {
          newFrame.toggleElement(i, j);
        }
      }
    }

    return newFrame;
  }
}
