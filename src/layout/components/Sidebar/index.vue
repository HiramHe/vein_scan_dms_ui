<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- collapse为elementui组件el-menu的属性，只有el-menu的mode为vertical时，collapse才有效-->
      <!-- el-menu配置中，重点看activeMenu，default-active代表当前激活菜单的 index，也即当前激活的路由 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--循环遍历routes，渲染侧边栏-->
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :route="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem/SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, SidebarLogo },
  /*计算属性*/
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.showSidebarLogo;
    },
    variables() {
      return variables;
    },
    /*如果this.sidebar.opened为true，则传一个false值给子组件SidebarLogo*/
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
