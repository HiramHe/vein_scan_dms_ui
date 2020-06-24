/*
将所有子模块的getters聚合到一起
*/
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username
};
export default getters;
