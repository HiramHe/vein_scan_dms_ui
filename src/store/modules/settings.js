import variables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";

const { showSettings, fixedHeader, showSidebarLogo } = defaultSettings;

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  showSidebarLogo: showSidebarLogo
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    //state.hasOwnProperty(key)
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
