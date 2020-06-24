<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="less">
/*每个页面单独设置html、body、app的宽度*/
html,
body,
#app {
  height: 100%;
}
</style>
