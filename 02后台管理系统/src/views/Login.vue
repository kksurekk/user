<template>
  <div class="login-wrap">
    <el-form
      :model="ruleForm2"
      :rules="loginRules"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item class="msg">{{$route.params.message}}</el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { RequestLogin } from "../api/api.js";
export default {
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted ");
  },
  data() {
    return {
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      checked: false,
      loginRules: {
        account: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit2() {
      const that = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          const params = `username=${that.ruleForm2.account}&password=${that.ruleForm2.checkPass}`;
          //保存用户登录状态到store中
          that.$store.dispatch("login", params).then(data => {
              that.$router.push({ path: "/main" });
            })
            .catch(err => {
              that.$message({
                showClose: true,
                message: data.resultInfo,
                type: "error"
              });
            });
        } else {
          that.$message({
            message: "请输入账号或密码"
          });
          return false;
        }
      });
    },
    handleRegister(){
       this.$router.push({ path: "/register" });
    }
  }
};
</script>



<style  scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
.login-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/images/bg.jpg");
}
.msg{
  color:#f30;
}
</style>
