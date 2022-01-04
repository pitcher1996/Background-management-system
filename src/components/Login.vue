<template>
    <div class="login_container">
        <!-- 头像区域 -->
        <div class="login_box">
            <div class="avatar_box">
                <img
                    src="@/assets/logo.png"
                    alt=""
                >
            </div>
            <!-- 登录表单区域 -->
            <el-form
                label-width="0px"
                class="login_form"
                :model="loginForm"
                :rules="ruleForm"
                ref="Reset"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="loginForm.password"
                        prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button
                        type="primary"
                        @click="verification"
                    >登录</el-button>
                        <el-button
                            type="info"
                            @click="formReset"
                        >重置</el-button>
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
      loginForm: {
        username: "admin",
        password: "123456"
      },
      ruleForm: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    formReset() {
      //   console.log(this);
      this.$refs.Reset.resetFields();
    },
    verification() {
      //修饰成异步函数
      this.$refs.Reset.validate(async vaild => {
        // console.log(vaild);
        if (!vaild) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) {
          return this.$message.error("登录失败");
        } else {
          this.$message.success("登录成功");
        }
        //1.将登录成功之后的token，保存到客户端的sessionStorage中
        //1.1 项目中出来登录之外的其他API接口，必须在登录之后才能访问
        //1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        //2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
</style>