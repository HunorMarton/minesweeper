<template>
  <div id="app">
    <div class="board">
      <Tile v-for="index in 100" :key="index" :index="index" />
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
