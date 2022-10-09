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
          v-if="valuteList"
          v-model="currentVal"
          placeholder="Валюта"
          class="converter__dropdown"
          title-key="Name"
          :items="valuteList"
        />
      </div>
      <div class="converter-item">
        <img
          :src="swap"
          alt="swap"
          class="converter__swap"
          @click="reverseValutes(valute)"
        />
      </div>
      <div class="converter-item">
        <div class="converter__value">
          {{ calculateValute }}
        </div>
        <MySelectDropdown
          v-if="valuteList"
          v-model="searchingVal"
          placeholder="Валюта"
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
export default {
  name: "HomeView",
  components: { MySelectDropdown, MyInput },
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
    ...mapMutations(["changeOneField"]),
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
  @media (min-width: 991px) {
    flex-direction: row;
  }
  &-item {
    display: flex;
    margin-top: 10px;
    align-items: center;
  }
  &__dropdown {
    width: 300px;
  }
  &__swap {
    width: 20px;
    cursor: pointer;
    margin: 0 20px;
    transition: all ease-in-out 0.3s;
    &:active {
      transform: rotate(360deg);
    }
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
