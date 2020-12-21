<template>
  <div class="login_container">
    <!--    <el-alert title="你是猪" :closable="f"></el-alert>-->
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/tx.jpg" alt="">
      </div>
      <!--登录表单区域-->
      <!--loginForm为表单数据对象-->
      <!--loginFormRules为表单数据验证规则对象-->
      <!--loginFormRef为表单实例对象的引用-->
      <el-form ref="loginFormRef" :model="loginForm" :rules=" loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <!--prop绑定验证规则-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-denglushimima" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <!--登录-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <!--重置-->
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      f: true,
      // 定义登录表单的数据对象
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6到 15个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      console.log(this); //this为当前的组件对象
      this.$refs.loginFormRef.resetFields(); //调用当前表单对象的resetFields方法重置属性
    },
    login() {
      // 点击登录时对数据进行校验
      // validate()中传入一个回调函数
      // async异步
      this.$refs.loginFormRef.validate(async validate => {
        console.log(validate);
        if (!validate) {
          return;
        }
        // axios发送登录请求
        // 如果方法值为Promise, 可用await简化响应的结果. 但await只能用于async修饰的方法中，
        //  {data: responseResult}表示只取data对应的值，它是服务器返回的值
        const {data: responseResult} = await this.$http.post("login", this.loginForm);
        // console.log(responseResult);
        // console.log(responseResult.data);
        console.log(responseResult);
        if (responseResult.meta.status !== 200) {
          this.$message.error("登录失败");
          console.log("登录失败")
        } else {
          this.$message.success("登录成功");
          console.log("登录成功");
          // 在客户端保存服务器返回的token ,保存在window对象中，非持久化保存
          console.log(responseResult.data.token);
          window.sessionStorage.setItem("token", responseResult.data.token);

          // 登录成功，页面跳转，路由的url是/home
          this.$router.push("/home");
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .类class选择器，给div设置背景色
// 整个页面的容器
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

// 登录的盒子容器
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute; //相对定位位置
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); //再在此位置上横纵各移动50%
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd; // 阴影效果
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%); //给头像定位
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
