<template>
  <div class="login">
    <el-form
      :model="loginData"
      :rules="loginRules"
      ref="loginFormRef"
      auto-complete="on"
      class="login-form"
    >
      <h3 class="title">后台管理系统</h3>

      <el-form-item prop="username">
        <el-input
          v-model="loginData.username"
          type="text"
          auto-complete="on"
          prefix-icon="el-icon-user"
          placeholder="账号"
          name="username"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <!--@keyup.enter.native：监听键盘回车事件-->
        <el-input
          v-model="loginData.password"
          show-password
          placeholder="密码"
          name="password"
          prefix-icon="el-icon-lock"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          icon="el-icon-mouse"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span>Copyright © 2020-2021 ISYSLAB All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      loginData: {
        username: "Hiram",
        password: "12345"
      },
      redirect: undefined,
      loginRules: {
        username: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.loading = true;
          /*
          由于多个模块的store整合到一起了，所以可能存在不同模块的方法有相同方法名，因此需要指定模块名。
          user/login中，user即是指定模块名。
           */
          this.$store
            .dispatch("user/dologin", this.loginData)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(error => {
              /*
              错误信息上抛路径：request.js -> api/login.js -> store/modules/login.js -> views/login/Login.vue,
              中间可对信息进行加工。
              错误信息，最终处理，此处只是打印。
              弹出相应提示信息，在 request.js 中已经做了，也可以移到这里进行弹出。
              */
              console.log(error);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: aqua;
}

.login-form {
  background: white;
  border-radius: 1rem;
  /*
    外层视图容器的大小，内层视图容器大小会继承外层视图容器大小；
    但是控件大小不继承视图容器大小，它有默认的大小，或者编码时显式指定大小。
    */
  width: 40rem;
  padding: 2rem 2rem 1rem 2rem;

  .title {
    text-align: center;
    margin: 0 auto 3rem auto;
    font-size: 2rem;
  }

  .el-form-item {
    margin: 0 auto 3rem auto;
    input {
      width: 100%;
      height: 5rem;
      font-size: 2rem;
    }
    button {
      width: 100%;
      height: 4rem;
    }
  }
}

.el-login-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 4rem;
  line-height: 4rem;
  letter-spacing: 0.1rem;
}
</style>
