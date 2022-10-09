<template>
  <div class="valute-list" v-if="valuteList">
    <transition-group name="valute-list">
      <div
        class="valute-item"
        v-for="valute in valuteList"
        :key="valute.CharCode"
      >
        <div class="valute-item__name">{{ valute.Name }}</div>
        <div class="valute-item__content">
          <div class="valute-item__content-change">
            <div v-if="!valute.reversed">1 RUB</div>
            <div v-else>1 {{ valute.CharCode }}</div>
            <swap-icon @click="reverseValutes(valute)" />
            <div v-if="!valute.reversed">
              {{ valute.Value }} {{ valute.CharCode }}
            </div>
            <div v-else>{{ (1 / valute.Value).toFixed(4) }} RUB</div>
          </div>
          <div
            class="valute-item__content-difference"
            :class="getDifferenceBackgroundColor(valute.Value, valute.Previous)"
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
</template>

<script>
import SwapIcon from "@/components/SwapIcon";
export default {
  name: "ValuteList",
  components: { SwapIcon },
  data() {
    return {
      arrow: require("@/assets/arrow-down_icon.svg"),
    };
  },
  props: {
    valuteList: {
      required: true,
      type: Array,
    },
  },
  methods: {
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
};
</script>

<style scoped lang="scss">
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
</style>
