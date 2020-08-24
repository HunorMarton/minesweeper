export const getIndex = (row, column, config) => {
  // Simply return if coordinates are out of field
  if (row < 0) return;
  if (column < 0) return;
  if (row >= config.height) return;
  if (column >= config.width) return;

  // Return index
  return row * config.width + column;
};

export const getCoordinates = (index, config) => ({
  row: Math.floor(index / config.width),
  column: index % config.width,
});

export const generateTiles = (config) => {
  // Generate an empty array with the appropriate length
  const bombs = Array.from({ length: config.width * config.height });

  // Inject bombs to random positions
  let bombsPlanted = 0;
  while (bombsPlanted != config.totalNumberOfBombs) {
    // Pick a random index within the array
    const index = Math.floor(Math.random() * config.width * config.height);

    // If tile doesn't already contain a bomb then plant it
    if (!bombs[index]) {
      bombs[index] = true;
      bombsPlanted++;
    }
  }

  return bombs.map((bomb, i, array) => {
    const { row, column } = getCoordinates(i, config);

    // Count number of bombs in the surroinding tiles
    let surroundingBombs = 0;
    if (array[getIndex(row - 1, column - 1, config)]) surroundingBombs++;
    if (array[getIndex(row - 1, column - 0, config)]) surroundingBombs++;
    if (array[getIndex(row - 1, column + 1, config)]) surroundingBombs++;
    if (array[getIndex(row - 0, column - 1, config)]) surroundingBombs++;
    if (array[getIndex(row - 0, column + 1, config)]) surroundingBombs++;
    if (array[getIndex(row + 1, column - 1, config)]) surroundingBombs++;
    if (array[getIndex(row + 1, column - 0, config)]) surroundingBombs++;
    if (array[getIndex(row + 1, column + 1, config)]) surroundingBombs++;

    return {
      bomb, // The tile contains a bomb
      flagged: false, // The tile is flagged
      revealed: false, // The tile has been revealed
      surroundingBombs, // The number of bombs in the surrounding fields
    };
  });
};
