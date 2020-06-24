<template>
  <div class="app-container">
    <h1>todo</h1>
    <el-row v-for="row in 3" :key="row">
      <el-col :span="5" v-for="(o,index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
        <el-card>
          <el-image
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            fit="fill"></el-image>
          <div>
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style scoped></style>
