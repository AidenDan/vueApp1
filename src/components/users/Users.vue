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
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!--作用域插槽中获取每一行的数据-->
          <template slot-scope="scope">
            <el-switch
              v-model=" scope.row.mg_state" @change="updateUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="185px" align="center">
          <template>
            <!--编辑按钮-->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <!--分配角色按钮-->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        pagesize: 5  // 每页显示的条数
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
      this.userList = result.data.users;
      this.total = result.data.total;
      console.log(result)
    },
    // 监听页码大小改变事件函数,组件自带的监听函数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听当前页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听更新用户状态put请求
    async updateUserStatus(userInfo) {
      const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      console.log(res)
      if (res.meta.status !== 200) {
        // 重置UI界面的用户状态显示
        userInfo.mg_state = !userInfo.mg_state;
        this.$message.error("更新用户状态失败");
      } else {
        this.$message.success("更新用户状态成功");
      }
    }
  }
}
</script>

<style scoped>

</style>
