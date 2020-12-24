<template>
  <div>
    <!--    导航栏区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!--  搜索区域  -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!--     表格区域 -->
      <el-table class="el-table_class" :data="userList" style="width: 100%" border stripe>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态"></el-table-column>
        <el-table-column label="操作">
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      // 请求携带的参数
      queryInfo: {
        query: "",
        pagenum: 1,  // 当前页码
        pagesize: 2  // 每页显示的条数
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      // ajax发送异步请求
      const {data: result} = await this.$http.get("users", {params: this.queryInfo});
      if (result.meta.status !== 200) {
        return this.$message.error("获取数据失败!");
      }
      // const tt =  {id: 502, role_name: "测试角色2", username: "linken", create_time: 1486720211, mobile: "1213213123", mg_state: false, email: "asdf@qq.com"}
      // for (let i = 0; i < 1000; i++) {
      //   this.userList.push(tt);
      // }
      this.userList = result.data.users;
      this.total = result.data.total;
      console.log(result)
    }
  }
}
</script>

<style scoped>

</style>
