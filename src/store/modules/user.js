import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/token";
import { resetRouter } from "@/router";

/*
注意：token不仅放到了store中，还通过@/utils/token的setToken方法，将token 放到了cookies中。
因为浏览器刷新的时候，store中的数据会被清空，如果token被清空了，那么用户一旦刷新浏览器，就要重新登录了。
username没有放到cookeis中，所以用户每次刷新页面，都会调用后端接口，获取登录用户的信息。
*/

const state = {
  token: getToken(),
  username: "",
  avatar: "",
  description: "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, username) => {
    state.username = username;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  dologin({ commit }, userInfo) {
    const { username, password } = userInfo;
    /*
    异步执行 user api的login方法，
    返回一个Promise
    */
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          /*取出response中的data部分*/
          const { data } = response;
          /*将token 放到store中*/
          commit("SET_TOKEN", data.token);
          /*将token放到cookies中*/
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          /*错误信息，通过 return new Promise，上抛。*/
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { user, roleNames } = data;

          commit("SET_NAME", user.username);
          commit("SET_AVATAR", user.avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 退出系统
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetUser({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
