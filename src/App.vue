<template>
  <div id="app">
    <!--路由占位符，将根组件与子组件串联起来-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}
</style>
