export const totalNumberOfBombs = 14;

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

  return bombs;
}
