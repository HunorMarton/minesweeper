<template>
  <div id="app">
    <div>
      <header>
        <div>{{ bombsRemaining }}</div>
        <button @click="reset">{{ gameStatus }}</button>
        <div>0</div>
      </header>
      <div class="board">
        <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" @reveal="reveal(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "./components/Tile";
import {
  generateTiles,
  totalNumberOfBombs,
  getCoordinates,
  getIndex,
} from "./utils";

export default {
  name: "App",
  components: {
    Tile,
  },
  data: function () {
    return {
      tiles: generateTiles(),
    };
  },
  computed: {
    bombsRemaining() {
      const totalFlags = this.tiles.filter((tile) => tile.flagged).length;
      return totalNumberOfBombs - totalFlags;
    },
    gameFailed() {
      return this.tiles.find((tile) => tile.bomb && tile.revealed);
    },
    gameWon() {
      const tilesRevealed = this.tiles.filter((tile) => tile.revealed).length;
      return tilesRevealed + totalNumberOfBombs == 100;
    },
    gameStatus() {
      if (this.gameFailed) return "😔";
      if (this.gameWon) return "😎";
      return "🙂";
    },
  },
  methods: {
    reset() {
      this.tiles = generateTiles();
    },
    reveal(index) {
      if (index == undefined) return;

      const tile = this.tiles[index];
      if (!tile.revealed) {
        tile.revealed = true;

        if (!tile.bomb && tile.surroundingBombs == 0) {
          const { row, column } = getCoordinates(index);

          this.reveal(getIndex(row - 1, column - 1));
          this.reveal(getIndex(row - 1, column - 0));
          this.reveal(getIndex(row - 1, column + 1));
          this.reveal(getIndex(row - 0, column - 1));
          this.reveal(getIndex(row - 0, column + 1));
          this.reveal(getIndex(row + 1, column - 1));
          this.reveal(getIndex(row + 1, column - 0));
          this.reveal(getIndex(row + 1, column + 1));
        }
      }
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Courier New", Courier, monospace;
  font-weight: 700;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 2em;
}

button {
  font-size: inherit;
}

.board {
  display: grid;
  grid-template-rows: repeat(10, auto);
  grid-template-columns: repeat(10, auto);
}
</style>
