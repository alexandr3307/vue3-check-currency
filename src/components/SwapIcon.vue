<template>
  <img class="swap" :src="swap" alt="swap" />
</template>

<script>
export default {
  name: "SwapIcon",
  data() {
    return {
      swap: require("@/assets/swap.svg"),
    };
  },
};
</script>

<style scoped lang="scss">
.swap {
  width: 20px;
  cursor: pointer;
  margin: 0 20px;
  transition: all ease-in-out 0.3s;

  &:active {
    transform: rotate(360deg);
  }
}
</style>
