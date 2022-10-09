import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
    valuteList: [],
    lastUpdateDate: null,
  }),
  getters: {},
  mutations: {
    setValuteList(state, valuteList) {
      state.valuteList = valuteList;
    },
    setLastUpdateDate(state, lastUpdateDate) {
      state.lastUpdateDate = lastUpdateDate;
    },
    changeOneField(state, item, id) {
      state.valuteList[id] = item;
    },
  },
  actions: {
    async fetchValuteList({ commit }) {
      try {
        const response = await axios.get(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        commit("setValuteList", Object.values(response.data.Valute));
        commit("setLastUpdateDate", response.data.Date.split("T")[0]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
