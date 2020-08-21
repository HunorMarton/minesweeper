<template>
  <div>{{ seconds }}</div>
</template>

<script>
export default {
  props: {
    gameInProgress: Boolean,
  },
  data: function () {
    return {
      seconds: 0,
      intervalID: undefined,
    };
  },
  watch: {
    gameInProgress(value) {
      if (value) {
        this.seconds = 0;
        this.intervalID = setInterval(() => {
          this.seconds++;
        }, 1000);
      } else {
        clearInterval(this.intervalID);
      }
    },
  },
};
</script>
