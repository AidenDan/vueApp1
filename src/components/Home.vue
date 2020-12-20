<template>
<!--    <p>Home组件</p>-->
<!--    <el-button type="info" round @click="logout">退出登录</el-button>-->
    <el-container class=" home_container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

</template>

<script>
  export default {
    name: "Home",
    methods: {
      logout() {
        // 点击退出，就清空token，并重新转到登录页面
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  }
</script>

<style lang="less" scoped>
  .home_container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
