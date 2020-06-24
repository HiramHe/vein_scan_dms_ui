<!-- :=v-bind 用途之一：父向子传值 属性绑定 -->
<!-- @=v-on 用途之一：子向父传值 事件绑定 -->
<!--
 $route：代表当前正在跳转的路由对象。
 route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等
-->
<!--
$route.query：
对象，包含路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到$route.query.favorite == 'yes' 。
-->
<!--
url流程：
router（登录判断、拥有token判断、登录用户信息获取、动态添加路由）
-> store（保存全局共享数据，比如当前登录用户信息、角色信息、动态生成路由等）
-> api（调用后端接口,加入token、判断响应码等）
-->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
