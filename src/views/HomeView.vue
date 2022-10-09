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
    <div class="valute-list" v-if="valuteList">
      <transition-group name="valute-list">
        <div
          class="valute-item"
          v-for="valute in sortedValutes"
          :key="valute.CharCode"
        >
          <div class="valute-item__name">{{ valute.Name }}</div>
          <div class="valute-item__content">
            <div class="valute-item__content-change">
              <div v-if="!valute.reversed">1 RUB</div>
              <div v-else>1 {{ valute.CharCode }}</div>
              <img
                class="valute-item__content-change__swap"
                :src="swap"
                alt="swap"
                @click="reverseValutes(valute)"
              />
              <div v-if="!valute.reversed">
                {{ valute.Value }} {{ valute.CharCode }}
              </div>
              <div v-else>{{ (1 / valute.Value).toFixed(4) }} RUB</div>
            </div>
            <div
              class="valute-item__content-difference"
              :class="
                getDifferenceBackgroundColor(valute.Value, valute.Previous)
              "
            >
              <img
                class="valute-item__content-difference-img"
                :src="arrow"
                alt="стрелка"
              />
              <span class="valute-item__content-difference-span">
                {{ getDifference(valute.Value, valute.Previous) }} RUB
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import MyInput from "@/components/custom/MyInput";
export default {
  name: "HomeView",
  components: { MyInput },
  data() {
    return {
      arrow: require("@/assets/arrow-down_icon.svg"),
      swap: require("@/assets/swap.svg"),
      currentVal: [],
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
    ...mapMutations(["changeOneField"]),
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
  .valute-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .valute-list-enter-active,
  .valute-list-leave-active {
    transition: all 0.3s;
  }
  .valute-list-enter, .valute-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .valute-list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    @media (min-width: 991px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .valute-item {
      margin-top: 10px;
      @media (min-width: 991px) {
        width: 50%;
      }
      &__name {
        font-weight: 700;
        font-size: 16px;
      }
      &__content {
        max-width: fit-content;
        margin: 5px auto;
        &-change {
          display: flex;
          &__swap {
            width: 20px;
            cursor: pointer;
            margin: 0 20px;
            transition: all ease-in-out 0.3s;
            &:active {
              transform: rotate(360deg);
            }
          }
        }
        &-difference {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 5px;
          &-img {
            width: 20px;
          }
        }
        .red {
          span {
            background: red;
          }
        }
        .green {
          span {
            background: green;
          }
          img {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>
