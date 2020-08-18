<template>
  <div id="app">
    <div>
      <header>
        <div>14</div>
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
import { generateTiles } from "./utils";

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
