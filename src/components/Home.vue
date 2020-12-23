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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="collapse">III</div>
        <!--左侧菜单栏-->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" :unique-opened="true"
                 :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">

          <!--一级菜单-->
          <el-submenu :index="item.id +''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                          @click="saveActivePath('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      // 图像icon列表
      iconList: {
        125: "el-icon-s-custom",
        103: "el-icon-s-check",
        101: "el-icon-shopping-bag-1",
        102: "el-icon-document",
        145: "el-icon-data-line"
      },
      isCollapse: false,
      activePath: ""
    }
  },
  name: "Home",
  created() {
    this.getMenuList();
    // 当前组件一创建就设置session中的保存的活跃路由
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      // 点击退出，就清空token，并重新转到登录页面
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const {data: res} = await this.$http.get("menus");
      this.menuList = res.data;
      console.log(this.menuList)
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveActivePath(activePath) {
      this.activePath = activePath;
      // 把活跃路由处存到sessionStorage中
      window.sessionStorage.setItem("activePath", activePath);
    }
  }
}
</script>

<!--各个组件的样式-->
<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-menu {
  border-right: none;
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
  width: 200px;
}

.span_sys {
  margin-left: 15px;
}

.toggle {
  width: 100%;
  height: 25px;
  background: #4A5064;
  font-size: 20px;
  color: #ffffff;
  text-align: center; //文字居中
  cursor: pointer;
}
</style>
