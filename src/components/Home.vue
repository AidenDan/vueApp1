<template>
  <el-container class=" home_container">
    <el-header>
      <div class="container_sys">
        <img src="../assets/tx_log.jpg" alt="" class="img_log">
        <span class="span_sys">后台管理系统</span>
      </div>
      <el-button type="info" round @click="logout">退出登录</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <!--左侧菜单栏-->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

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

<!--各个组件的样式-->
<style lang="less" scoped>
  .home_container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .img_log {
    width: 55px;
    height: 55px;
  }

  .container_sys {
    display: flex;
    align-items: center;
  }

  .span_sys {
    margin-left: 15px;
  }
</style>
