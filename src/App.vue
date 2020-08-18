<template>
  <div id="app">
    <div class="board">
      <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" />
    </div>
  </div>
</template>

<script>
import Tile from "./components/Tile";

export default {
  name: "App",
  components: {
    Tile,
  },
  data: function () {
    return {
      tiles: [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.board {
  display: grid;
  grid-template-rows: repeat(10, auto);
  grid-template-columns: repeat(10, auto);
}
</style>
