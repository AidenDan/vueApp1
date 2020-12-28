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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="clearInputInfo()">
            <el-button slot="append" icon="el-icon-search" @click="queryUser()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser()">添加用户</el-button>
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

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addUserDialogCloseListener()">
      <!--      表格主体部分-->
      <el-form ref="addUserFormRef" :model="addUserFormModel" :rules="addUserFormRules" label-width="70px"
               class="class-addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserFormModel.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserFormModel.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserFormModel.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserFormModel.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>

      <!--      下部分-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAddUser()">取 消</el-button>
    <el-button type="primary" @click="confirmAddUser()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    const checkEmail = (rule, value, callback) => {
      // 校验邮箱的正则验证
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(value)) {
        // 不合法
        callback(new Error('邮箱格式不对'));
      } else {
        // 合法
        callback();
      }
    };

    // 验证手机号的正则
    const checkPhone = (rule, value, callback) => {
      // 校验邮箱的正则验证
      const regPhone = /^1[0-9]{10}$/;
      if (!regPhone.test(value)) {
        // 不合法
        callback(new Error('手机号格式不对'));
      } else {
        // 合法
        callback();
      }
    };

    return {
      // 请求携带的参数
      queryInfo: {
        query: "", //响应式动态绑定输入的搜索参数
        pagenum: 1,  // 当前页码
        pagesize: 5  // 每页显示的条数
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      addUserFormModel: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addUserFormRules: {
        username: [
          {required: true, message: '请输入有效名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入有效密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6到 15个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入有效邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'} // 自定义邮箱的校验规则
        ],
        mobile: [
          {required: true, message: '请输入有效手机号码', trigger: 'blur'},
          {validator: checkPhone, trigger: 'blur'} // 自定义手机号码的校验规则
        ]
      }
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
        return this.$message.error("获取数据失败");
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
    },
    // 搜索用户的功能
    queryUser() {
      this.getUserList();
    },
    // 清空输入框的内容，并重新发起请求
    clearInputInfo() {
      this.getUserList();
    },
    // 添加用户
    addUser() {
      this.dialogVisible = true;
    },
    // 取消添加用户
    cancelAddUser() {
      this.dialogVisible = false;
    },
    // 确定添加用户
    async confirmAddUser() {
      // 表单预校验
      // 点击登录时对数据进行校验
      // validate()中传入一个回调函数
      // async异步
      this.$refs.addUserFormRef.validate(async validate => {
        console.log(validate);
        if (!validate) {
          return;
        }

        // 发送添加用户的请求
        const {data: response} = await this.$http.post("users", this.addUserFormModel);
        console.log(response)
        if (response.meta.status !== 201) {
          this.$message.error("添加用户失败");
        } else {
          this.$message.success("添加用户成功");
          await this.getUserList();
        }
        this.dialogVisible = false;
      })
    },
    // 监听添加用户对话框关闭的事件 重置输入信息
    addUserDialogCloseListener() {
      this.$refs.addUserFormRef.resetFields();
    }
  }
}
</script>

<style scoped>
.class-addUserForm {
  margin-left: 0;
}

</style>
