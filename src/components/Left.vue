<template>
    <el-aside :width="iscollapse ? '64px':'200px'">
        <div
            class="toggle-button"
            @click="changecollapse"
        >|||</div>
            <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color='#409EFF'
                :unique-opened="true"
                :collapse="iscollapse"
                :collapse-transition="false"
                :router="true"
                :default-active="activePath"
            >

                <el-submenu
                    :index="item.id + ''"
                    v-for="item in MenuList"
                    :key="item.id"
                >
                    <template slot="title">
                        <i :class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item
                        :index="'/'+subitem.path"
                        v-for="subitem in item.children"
                        :key="subitem.id"
                        @click="saveNavState('/'+subitem.path)"
                    >
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                        </template>
                        </el-menu-item>
                        </el-submenu>
                        </el-menu>
    </el-aside>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {
      iconsObj: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-flag",
        "101": "el-icon-shopping-bag-2",
        "102": "el-icon-tickets",
        "145": "el-icon-s-marketing"
      },
      iscollapse: false,
      activePath: ""
    };
  },
  props: {
    MenuList: {
      type: []
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    changecollapse() {
      this.iscollapse = !this.iscollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    }
  }
};
</script>
<style scoped>
.el-icon {
  margin-right: 10px;
}
.el-menu {
  border-right: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>