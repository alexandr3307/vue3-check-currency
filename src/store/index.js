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
  },
  actions: {
    async fetchValuteList({ commit }) {
      try {
        const response = await axios.get(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        console.log(response.data);
        const data = response.data.
        commit("setValuteList", response.data.Valute);
        commit("setLastUpdateDate", response.data.Date);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
