<template>
  <div class="home">
    <h2 class="valute-title">
      Посмотреть весь список пар валют с переключением основной валюты
    </h2>
    <span class="valute-date"
      >Последняя дата обновления: {{ lastUpdateDate }}</span
    >
    <div class="valute-search">
      <my-input
        v-model="searchingValute"
        placeholder="Поиск по коду или названию валюты"
      ></my-input>
    </div>
    <ValuteList :valute-list="sortedValutes" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import MyInput from "@/components/custom/MyInput";
import ValuteList from "@/components/ValuteList";
export default {
  name: "HomeView",
  components: { ValuteList, MyInput },
  data() {
    return {
      searchingValute: "",
    };
  },
  computed: {
    ...mapState({
      valuteList: (state) => state.valuteList,
      lastUpdateDate: (state) => state.lastUpdateDate,
    }),
    sortedValutes() {
      return this.valuteList.filter(
        (item) =>
          item.Name.toLowerCase().includes(
            this.searchingValute.toLowerCase()
          ) ||
          item.CharCode.toLowerCase().includes(
            this.searchingValute.toLowerCase()
          )
      );
    },
  },
  methods: {
    ...mapActions(["fetchValuteList"]),
  },
  mounted() {
    this.fetchValuteList();
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  .valute-date {
    font-size: 20px;
  }
  .valute-title {
    font-size: 20px;
    @media (min-width: 991px) {
      font-size: 30px;
    }
  }
  .valute-search {
    max-width: 500px;
    margin: 10px auto;
  }
}
</style>
