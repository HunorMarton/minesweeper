<template>
  <div id="app">
    <Tile :index="1" />
    <Tile :index="2" />
    <Tile :index="3" />
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
