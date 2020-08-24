<template>
  <div
    class="tile"
    :class="{
      revealed: tile.revealed,
      'wrong-pick': wrongPick,
    }"
    :style="{ color: color }"
    @click="reveal"
    @click.right.prevent="flag"
  >
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    tile: Object,
    gameFailed: Boolean,
  },
  computed: {
    content() {
      if (this.tile.flagged) return "❌";
      if (!this.tile.revealed) return "";
      if (this.tile.bomb) return "💣";
      if (this.tile.surroundingBombs) return this.tile.surroundingBombs;
      return "";
    },
    color() {
      if (this.tile.surroundingBombs == 1) return "blue";
      if (this.tile.surroundingBombs == 2) return "green";
      if (this.tile.surroundingBombs == 3) return "red";
      if (this.tile.surroundingBombs == 4) return "purple";
      if (this.tile.surroundingBombs == 5) return "brown";
      if (this.tile.surroundingBombs == 6) return "turqouise";
      if (this.tile.surroundingBombs == 7) return "black";
      return "gray";
    },
    wrongPick() {
      return (
        this.gameFailed &&
        ((this.tile.bomb && this.tile.revealed) ||
          (!this.tile.bomb && this.tile.flagged))
      );
    },
  },
  methods: {
    reveal() {
      this.$emit("reveal");
    },
    flag() {
      this.$emit("flag");
    },
  },
};
</script>

<style scoped>
.tile {
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
}

.tile:not(.revealed) {
  --shadow-1: calc(var(--size) / 12.5);
  --shadow-2: calc(var(--size) / 12.5 * -1);
  box-shadow: inset var(--shadow-1) var(--shadow-1) 0px 0px
      rgba(255, 255, 255, 0.45),
    inset var(--shadow-2) var(--shadow-2) 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: calc(var(--size) / 10);
  cursor: pointer;
}

.tile.revealed {
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
}

.tile.wrong-pick {
  background-color: lightcoral;
}
</style>
