<!--
其他地方在"调用"SvgIcon时，需要传入iconClass
-->

<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from "@/utils/validate";

export default {
  name: "SvgIcon",
  /*这里均用在了计算属性中*/
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    /*
    查看页面，svg-sprite-loader 将 svg 文件内容放到了 body 下面，每个icon放在了symbol标签里面。
    我们在vue.config.js里面配置svg-sprite-loader时，将symbol标签的id配置成了：icon-[name]，所以使用时，
    我们也需要这样使用。
    */
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
