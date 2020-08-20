export const totalNumberOfBombs = 14;

export function getIndex(row, column) {
  if (row < 0) return;
  if (column < 0) return;
  if (row > 9) return;
  if (column > 9) return;

  return row * 10 + column;
}

export function getCoordinates(index) {
  return {
    row: Math.floor(index / 10),
    column: index % 10,
  };
}

export function generateTiles() {
  const bombs = Array.from({ length: 100 });

  let plantedBombs = 0;
  while (plantedBombs != totalNumberOfBombs) {
    const index = Math.floor(Math.random() * 100);

    if (!bombs[index]) {
      bombs[index] = 1;
      plantedBombs++;
    }
  }

  return bombs.map((bomb, index, array) => {
    const { row, column } = getCoordinates(index);

    let surroundingBombs = 0;
    if (array[getIndex(row - 1, column - 1)]) surroundingBombs++;
    if (array[getIndex(row - 1, column - 0)]) surroundingBombs++;
    if (array[getIndex(row - 1, column + 1)]) surroundingBombs++;
    if (array[getIndex(row - 0, column - 1)]) surroundingBombs++;
    if (array[getIndex(row - 0, column + 1)]) surroundingBombs++;
    if (array[getIndex(row + 1, column - 1)]) surroundingBombs++;
    if (array[getIndex(row + 1, column - 0)]) surroundingBombs++;
    if (array[getIndex(row + 1, column + 1)]) surroundingBombs++;

    return { bomb, surroundingBombs, flagged: false };
  });
}
