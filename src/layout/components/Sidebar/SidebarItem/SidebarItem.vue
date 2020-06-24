<template>
  <!-- 如果route的hidden为true，就不展示在侧边栏中 -->
  <div v-if="!route.hidden">
    <!--
     先判断hasOneShowingChild，如果为false，则不用继续判断了.
     因此，如果hasOneShowingChild为true，则children的数量要么为0，要么为1；
     如果为0，则把parent赋给了onlyOneChild；
     如果为1，onlyOneChild就是该child。
     route的hasSub不设置时，默认为false.
     没有下级路由，
     -->
    <template
      v-if="
        hasOneShowingChild(route.children, route) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !route.hasSub
      "
    >
      <!-- 路由中有meta，才显示在侧边栏中 -->
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <MyMenuItem
            :icon="onlyOneChild.meta.icon || (route.meta && route.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </AppLink>
    </template>
    <!-- route有2个或以上的children -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(route.path)"
      popper-append-to-body
    >
      <template slot="title">
        <MyMenuItem
          v-if="route.meta"
          :icon="route.meta && route.meta.icon"
          :title="route.meta.title"
        />
      </template>
      <!--
       递归,
       nested:嵌套的。
       -->
      <SidebarItem
        v-for="child in route.children"
        :key="child.path"
        :is-nest="true"
        :route="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import MyMenuItem from "../item/MyMenuItem";
import AppLink from "../item/AppLink";
import FixIOSBug from "../item/FixIOSBug";

export default {
  name: "SidebarItem",
  components: { MyMenuItem, AppLink },
  mixins: [FixIOSBug],
  props: {
    // route object
    route: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      /*
      对children数组中的每一项进行检查，生成一个新的数组。
       */
      const showingChildren = children.filter(route => {
        if (route.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = route;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
