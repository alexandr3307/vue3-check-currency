<template>
  <div class="home">
    <h2 @click="showList">
      Посмотреть весь список пар валют с переключением основной валюты
    </h2>
    <span>Последняя дата обновления: {{ lastUpdateDate }}</span>
    <div class="valute-list">
      <div
        class="valute-item"
        v-for="valute in valuteList"
        :key="valute.CharCode"
      >
        <div>{{ valute.Name }}</div>
        <div>
          <div>
            <div v-if="!valute.reversed">1 RUB</div>
            <div v-else>1 {{ valute.CharCode }}</div>
            <div @click="reverseValutes(valute)">CHANGE</div>
            <div v-if="!valute.reversed">
              {{ valute.Value }} {{ valute.CharCode }}
            </div>
            <div v-else>{{ (1 / valute.Value).toFixed(4) }} RUB</div>
          </div>
          <div
            :class="getDifferenceBackgroundColor(valute.Value, valute.Previous)"
          >
            {{ getDifference(valute.Value, valute.Previous) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "HomeView",
  data() {
    return {
      currentVal: [],
    };
  },
  computed: {
    ...mapState({
      valuteList: (state) => state.valuteList,
      lastUpdateDate: (state) => state.lastUpdateDate,
    }),
  },
  methods: {
    ...mapActions(["fetchValuteList"]),
    ...mapMutations(["changeOneField"]),
    showList() {
      console.log(this.valuteList);
    },
    getDifference(val, prevVal) {
      return (val - prevVal).toFixed(4);
    },
    getDifferenceBackgroundColor(val, prevVal) {
      return val - prevVal > 0 ? "green" : "red";
    },
    reverseValutes(valute) {
      !valute.reversed ? (valute.reversed = true) : (valute.reversed = false);
    },
  },
  mounted() {
    this.fetchValuteList();
  },
};
</script>
<style lang="scss" scoped>
.home {
  .red {
    background: red;
  }
  .green {
    background: green;
  }
}
</style>
