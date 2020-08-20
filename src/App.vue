<template>
  <div id="app">
    <div>
      <header>
        <div>{{ bombsRemaining }}</div>
        <button @click="reset">🙂</button>
        <div>0</div>
      </header>
      <div class="board">
        <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" />
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "./components/Tile";
import { generateTiles, totalNumberOfBombs } from "./utils";

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
  },
  methods: {
    reset() {
      this.tiles = generateTiles();
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
