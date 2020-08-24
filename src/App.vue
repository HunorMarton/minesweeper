<template>
  <div class="v-container">
    <header>
      <button @click="setBeginnerDifficulty">Beginner</button>
      <button @click="setIntermediateDifficulty">Intermediate</button>
      <button @click="setExpertDifficulty">Expert</button>
    </header>
    <div class="h-container">
      <div class="v-container">
        <main :style="cssVars">
          <div class="status">
            <div>{{ bombsRemaining }}</div>
            <button @click="reset">{{ gameStatus }}</button>
            <Timer :gameInProgress="gameInProgress" />
          </div>
          <div class="board">
            <Tile
              v-for="(tile, index) in tiles"
              :key="index"
              :tile="tile"
              :gameFailed="gameFailed"
              @flag="flag(index)"
              @reveal="reveal(index)"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "./components/Tile";
import Timer from "./components/Timer";
import { generateTiles, getCoordinates, getIndex } from "./utils";

export default {
  name: "App",
  components: {
    Tile,
    Timer,
  },
  data: () => ({
    config: {}, // Initialized in created lifecycle hook
    tiles: [], // Initialized in created lifecycle hook
  }),
  created() {
    // At initialization set the game difficulty to beginner and re-render the game
    this.setBeginnerDifficulty();
  },
  computed: {
    cssVars() {
      return {
        "--width": this.config.width,
        "--height": this.config.height,
        "--size": `${this.config.size}px`,
      };
    },
    bombsRemaining() {
      // Reduce total number of bombs by the number of flagged tiles
      const numberOfFlaggedTiles = this.tiles.filter((t) => t.flagged).length;
      return this.config.totalNumberOfBombs - numberOfFlaggedTiles;
    },
    gameInProgress() {
      // If game has ended already then return false
      if (this.gameWon || this.gameFailed) return false;
      // If tiles are revealed then return true
      if (this.tiles.find((tile) => tile.revealed)) return true;
      // If game haven't even started then return false
      return false;
    },
    gameFailed() {
      // Once you reveal a tile that contains a bomb you failed
      return this.tiles.find((tile) => tile.bomb && tile.revealed) != undefined;
    },
    gameWon() {
      // To win the game you need to reveal all the tiles that do not contain a bomb
      const tilesRevealed = this.tiles.filter((tile) => tile.revealed).length;
      return (
        tilesRevealed + this.config.totalNumberOfBombs ==
        this.config.width * this.config.height
      );
    },
    gameStatus() {
      if (this.gameFailed) return "😔";
      if (this.gameWon) return "😎";
      return "🙂";
    },
  },
  methods: {
    setBeginnerDifficulty() {
      this.config = {
        width: 8,
        height: 8,
        totalNumberOfBombs: 10,
        size: 50,
      };
      this.reset();
    },
    setIntermediateDifficulty() {
      this.config = {
        width: 16,
        height: 16,
        totalNumberOfBombs: 40,
        size: 35,
      };
      this.reset();
    },
    setExpertDifficulty() {
      this.config = {
        width: 30,
        height: 16,
        totalNumberOfBombs: 99,
        size: 25,
      };
      this.reset();
    },
    reset() {
      // Reset tiles based on the config
      this.tiles = generateTiles(this.config);
    },
    reveal(i) {
      // Do nothing if the game has already failed
      if (this.gameFailed) return;

      // Do nothing in case of wrong input
      // This can happen when the neighbours of a tile are being revealed and the 'neighbour' is out of the field
      if (i == undefined) return;

      const tile = this.tiles[i];

      // You can't reveal a flagged tile, you need to unflag it first
      if (tile.flagged) return;

      // Only reveal a tile if it is not revealed already
      // Avoids infinite loop of tile revealing it's neighbour then neighbour revealing the original tile
      if (!tile.revealed) {
        // Reveal tile
        tile.revealed = true;

        // If the tile is empty, also reveal the neighbour tiles
        if (!tile.bomb && tile.surroundingBombs == 0) {
          const { row, column } = getCoordinates(i, this.config);

          this.reveal(getIndex(row - 1, column - 1, this.config)); // Reveal top left neighbour
          this.reveal(getIndex(row - 1, column - 0, this.config)); // Reveal top neighbour
          this.reveal(getIndex(row - 1, column + 1, this.config)); // Reveal top right neighbour
          this.reveal(getIndex(row - 0, column - 1, this.config)); // Reveal left neighbour
          this.reveal(getIndex(row - 0, column + 1, this.config)); // Reveal right neighbour
          this.reveal(getIndex(row + 1, column - 1, this.config)); // Reveal bottom left neighbour
          this.reveal(getIndex(row + 1, column - 0, this.config)); // Reveal bottom neighbour
          this.reveal(getIndex(row + 1, column + 1, this.config)); // Reveal bottom right neighbour
        }
      }
    },
    flag(i) {
      // Do nothing if the game has already failed
      if (this.gameFailed) return;

      // Do nothing if the tile is alerady revealed
      if (this.tiles[i].revealed) return;

      // Flag or unflag tile
      this.tiles[i].flagged = !this.tiles[i].flagged;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@700&display=swap");

html {
  height: 100%;
}

body {
  background-color: #006989;
  font-family: "Roboto", sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
}

.h-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}

.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

button {
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

button:focus {
  outline: none;
}

a:visited {
  color: inherit;
}

header {
  background-color: #0b2027;
}

header button {
  color: #d4d4d4;
  padding: 20px 30px;
}

main {
  background-color: #d4d4d4;
  border-radius: calc(var(--size) / 10);
  font-family: "Ubuntu Mono", monospace;
  font-weight: 700;
  padding: 0 20px 20px 20px;
}

.status {
  align-items: center;
  color: #0b2027;
  display: flex;
  flex-direction: row;
  font-size: 2em;
  justify-content: space-between;
  margin: 15px 0;
}

.status button {
  box-shadow: inset 4px 4px 0px 0px rgba(255, 255, 255, 0.45),
    inset -4px -4px 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.board {
  display: grid;
  grid-template-columns: repeat(var(--width), auto);
  grid-template-rows: repeat(var(--height), auto);
  user-select: none;
}
</style>
