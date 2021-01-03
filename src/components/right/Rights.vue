<template>
  <div>
    <!--    导航栏区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!--表格区域 -->
      <el-table class="el-table_class" :data="rightsList" style="width: 100%" border stripe>
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <!--在作用域插槽中取值-->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
            <el-tag type="warning" v-else="scope.row.level === '2'">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取所有的权限列表
    async getRightsList() {
      const {data: response} = await this.$http.get("rights/list");
      console.log(response)
      if (response.meta.status !== 200) {
        this.$message.error("获取权限列表失败")
      } else {
        this.rightsList = response.data;
      }
    }
  }
}
</script>


<style lang="less" scoped>

</style>
