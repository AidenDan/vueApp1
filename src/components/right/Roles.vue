<template>
<div>
  <!--    导航栏区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card class="box-card">
    <el-row>
      <el-col>
        <el-button type="primary" >添加角色</el-button>
      </el-col>
    </el-row>

    <!--表格区域 -->
    <el-table class="el-table_class" :data="rolesList" style="width: 100%" border stripe>
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>

      <el-table-column label="操作" width="185px" align="center">
        <template slot-scope="scope">
          <!--编辑按钮-->
          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
          <!--删除按钮-->
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <!--分配角色按钮-->
          <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Roles",
  data(){
    return{
      rolesList:[]
    }
  },
  created() {
    this.getRolesList();
  },
  methods:{
    async getRolesList(){
      const {data: response} = await this.$http.get("roles");
      console.log(response)
      if (response.meta.status !==200){
        this.$message.error("获取角色列表失败")
      } else {
        this.rolesList = response.data;
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
