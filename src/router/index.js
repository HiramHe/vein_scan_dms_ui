import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout/index";

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hasSub: false               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 为true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

/*
页面侧边栏是否展示某个路由，由2个东西决定：hidden、meta，
hidden：为true，表明该路由不会展示在侧边栏中。如果不配置，默认为false。
meta：如果不配置，侧边栏不会显示该路由。
*/

/*
如果希望浏览器中，子路由的path显示在父路由path的后面，那么子路由的path的起始不要加上“/”。
 */

/*
路由的父组件，会显示在App.vue的router-view中。
子路由的页面会显示在父路由页面的router-view中。
 */

/*
  1.
  第一阶段：所有路由都放到constantRoutes中。
  2.todo
  第二阶段：参考vue-element-admin。将来换成asyncRoutes数组。
  3.todo
  第三阶段：参考若依。将asyncRoutes数组去掉，改为根据用户角色，从数据库中获取用户可以访问的路由。
*/

// 公共路由
const constantRoutes = [
  {
    path: "/home",
    component: () => import("@/views/Home"),
    hidden: true,
    meta: {
      title: "home"
    }
  },

  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/login/Login"),
    hidden: true,
    meta: {
      title: "Login"
    }
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    hasSub: false,
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "首页",
          icon: "dashboard"
        }
      }
    ]
  },

  /*将来换成asyncRoutes数组*/

  {
    path: "/patient",
    component: Layout,
    redirect: "/patient/index",
    hasSub: false,
    children: [
      {
        name: "patient",
        path: "index",
        component: () => import("@/views/patient/index"),
        meta: {
          title: "患者信息",
          icon: "i-inpatient"
        }
      }
    ]
  },

  /*子路由>=2个时，父路由的hasSub不会起作用*/
  {
    name: "image",
    path: "/image",
    component: Layout,
    redirect: "/image/infrared",
    meta: {
      title: "图像管理",
      icon: "image"
    },
    children: [
      {
        name: "infrared",
        path: "infrared",
        component: () => import("@/views/image/infrared/index"),
        meta: {
          title: "红外图像",
          icon: "infrared"
        }
      },
      {
        name: "BUltrasound",
        path: "BUltrasound",
        component: () => import("@/views/image/BUltrasound/index"),
        meta: {
          title: "B超图像",
          icon: "ultrasound"
        }
      }
    ]
  },

  {
    name: "treatment",
    path: "/treatment",
    component: Layout,
    redirect: "/treatment/doctor",
    meta: {
      title: "治疗方案",
      icon: "treatmentProgram"
    },
    children: [
      {
        name: "doctor",
        path: "doctor",
        component: () => import("@/views/treatment/doctor/index"),
        meta: {
          title: "医生方案",
          icon: "doctor"
        }
      },
      {
        name: "KnowledgeGraph",
        path: "KnowledgeGraph",
        component: () => import("@/views/treatment/system/index"),
        meta: {
          title: "系统方案",
          icon: "KnowledgeGraph"
        }
      }
    ]
  },

  {
    name: "system",
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "系统管理",
      icon: "system"
    },
    children: [
      {
        name: "user",
        path: "user",
        component: () => import("@/views/system/user/index"),
        meta: {
          title: "用户管理",
          icon: "user"
        }
      },
      {
        name: "role",
        path: "role",
        component: () => import("@/views/system/role/index"),
        meta: {
          title: "角色管理",
          icon: "peoples"
        }
      }
    ]
  }
];

/*
这里只添加constantRoutes，
至于asyncRoutes里面的路由，会根据用户的角色，从asyncRoutes里面筛选出路由，通过
router.addRoutes添加到这里。
 */
const createRouter = () =>
  new VueRouter({
    // 去掉url中的#
    mode: "history",
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
