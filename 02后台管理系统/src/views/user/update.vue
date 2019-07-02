<template>
  <div>
    <el-form @submit.prevent="onuserUpdateSubmit">
      <el-input type="hidden" v-model="id"></el-input>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-image :src="`${base_url}/${fileUrl}`" class="headerImag">
              <div slot="error" class="image-slot">
                <el-image :src="require('../../assets/images/y.jpg')"/>
              </div>
        </el-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onuserUpdateSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { RequestUsersel, RequestUserUpdate, URL } from "../../api/api.js";
export default {
  data() {
    return {
      id: "",
      username: "",
      password: "",
      fileUrl: "",
      message: "",
      base_url: ""
    };
  },
  /**
   *根据uid查询数据
   */
  created() {
    this.base_url = URL;
    const uid = this.$route.query.uid;
    const params = `id=${uid}`;
    RequestUsersel(params)
      .then(data => {
        this.username = data.resultInfo.username;
        this.password = data.resultInfo.password;
        this.fileUrl = data.resultInfo.headerimg;
        this.id = data.resultInfo.uid;
      })
      .catch(err => {
        his.message = "查询用户出错 :" + err;
      });
  },
  methods: {
    /**
     *修改数据
    */
    onuserUpdateSubmit() {
      const params = `id=${this.id}&username=${this.username}&psw=${
        this.password
      }`;
      RequestUserUpdate(params).then(data => {
        if (data.resultCode === 1) {
          this.$router.replace({ path: '/user/list'});
        }
      });
    }
  }
};
</script>
<style scoped>
  .headerImag {
    width: 160px;
    height: 160px;
}
</style>







