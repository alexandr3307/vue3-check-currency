<template>
  <h2 class="home" @click="showList">
    Посмотреть весь список пар валют с переключением основной валюты
  </h2>
  <span>Последняя дата обновления: {{ lastUpdateDate }}</span>
  <div>
    <div v-for="valute in valuteList" :key="valute.ID">
      <div>{{ valute.Name }}</div>
      <div>
        <div>
          <div>1 RUB</div>
          <div>{{ valute.Value }} {{ valute.CharCode }}</div>
        </div>
        <div
          :class="getDifferenceBackgroundColor(valute.Value, valute.Previous)"
        >
          {{ getDifference(valute.Value, valute.Previous) }}
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
      current: "",
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
    showList() {
      console.log(this.valuteList);
    },
    getDifference(val, prevVal) {
      return (val - prevVal).toFixed(4);
    },
    getDifferenceBackgroundColor(val, prevVal) {
      return val - prevVal > 0 ? "green" : "red";
    },
  },
  mounted() {
    this.fetchValuteList();
  },
};
</script>
<style scoped>
.red {
  background: red;
}
.green {
  background: green;
}
</style>
