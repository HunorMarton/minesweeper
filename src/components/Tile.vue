<template>
  <div class="tile">{{ index }}</div>
</template>

<script>
export default {
  props: {
    index: Number,
  },
};
</script>

<style scoped>
.tile {
  width: 50px;
  height: 50px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
