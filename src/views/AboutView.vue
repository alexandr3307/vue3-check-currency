<template>
  <div class="home">
    <h2 class="valute-title">
      Конвертер валют (перевод из одной валюты в другую через базовую RUB)
    </h2>
    <div class="converter" v-if="valuteList">
      <div class="converter-item">
        <my-input
          class="converter__input"
          v-model="valute"
          placeholder="Количество"
        ></my-input>
        <MySelectDropdown
          v-model="currentVal"
          placeholder="Валюта"
          class="converter__dropdown"
          title-key="Name"
          :value="currentVal"
          :items="valuteList"
        />
      </div>
      <div class="converter-item">
        <swap-icon @click="reverseValutes" />
      </div>
      <div class="converter-item">
        <div class="converter__value">
          {{ calculateValute }}
        </div>
        <MySelectDropdown
          v-model="searchingVal"
          placeholder="Валюта"
          :value="searchingVal"
          class="converter__dropdown"
          title-key="Name"
          :items="valuteList"
        />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import MyInput from "@/components/custom/MyInput";
import MySelectDropdown from "@/components/custom/MySelectDropdown";
import SwapIcon from "@/components/SwapIcon";
export default {
  name: "HomeView",
  components: { SwapIcon, MySelectDropdown, MyInput },
  data() {
    return {
      arrow: require("@/assets/arrow-down_icon.svg"),
      swap: require("@/assets/swap.svg"),
      valute: "",
      currentVal: "",
      searchingVal: "",
    };
  },
  computed: {
    ...mapState({
      valuteList: (state) => state.valuteList,
      lastUpdateDate: (state) => state.lastUpdateDate,
    }),
    calculateValute() {
      return this.valute && this.currentVal && this.searchingVal
        ? (
            (this.valute * this.currentVal.Value) /
            this.searchingVal.Value
          ).toFixed(4)
        : "Введите количество";
    },
  },
  methods: {
    ...mapActions(["fetchValuteList"]),
    reverseValutes() {
      const reverse = this.currentVal;
      this.currentVal = this.searchingVal;
      this.searchingVal = reverse;
    },
  },
  mounted() {
    this.fetchValuteList();
  },
};
</script>
<style lang="scss" scoped>
.converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 991px) {
    flex-direction: row;
  }
  &-item {
    display: flex;
    margin-top: 10px;
    align-items: center;
  }
  &__dropdown {
    width: 200px;
  }
  &__input {
    max-width: 150px;
  }
  &__value {
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
  }
}
</style>
