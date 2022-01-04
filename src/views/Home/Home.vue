<template>
    <el-container>
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img
                    src="@/assets/logo.png"
                    alt=""
                >
                    <span class="name">电商后台管理系统</span>
            </div>
            <div class="clickout">
                <el-button
                    type="primary"
                    @click="out"
                >退出</el-button>
            </div>

        </el-header>
        <el-container>
            <!-- 左侧区域 -->
            <Left :MenuList="MenuList"></Left>
            <!-- 主要区域 -->
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Left from "@/components/Left";
export default {
  name: "Home",
  data() {
    return {
      MenuList: []
    };
  },
  components: {
    Left
  },
  created() {
    this.getMenuList();
  },
  methods: {
    out() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("/menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.MenuList = res.data;
      console.log(res);
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
  background-color: #373d41;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding-left: 0;
  color: #eaedf1;
  font-size: 15px;
}
.clickout {
  align-items: center;
  padding-top: 10px;
}
.el-header img {
  height: 90%;
}
.el-header span {
  position: absolute;
  top: 18px;
}
.el-main {
  background-color: #eaedf1;
}
</style>