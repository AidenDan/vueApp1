<template>
  <div>
    <p>Home组件</p>
    <el-button type="info" round @click="logout">退出登录</el-button>
  </div>

</template>

<script>
    export default {
        name: "Home",
        methods: {
          logout(){
            // 点击退出，就清空token，并重新转到登录页面
            window.sessionStorage.clear();
            this.$router.push("/login");
          }
        }
    }
</script>

<style scoped>

</style>
