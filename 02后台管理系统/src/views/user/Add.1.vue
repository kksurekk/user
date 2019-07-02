<template>
  <div>
    <el-form  label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.psw"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          action="http://192.168.38.31:8088/api/add"
          name="fileHeader"
          list-type="picture-card"
          ref="uploadPicture"
          :data="user"
          :limit="1"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="onUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加用户</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      user: {
        username: "",
        psw: ""
      }
    };
  },
  methods: {
    /**
     * 移除预览图片
     */
    handleRemove(file, fileList) {
      console.log("handleRemove>>>");
      console.log(file, fileList);
    },
    /**
     * 预览大图
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 手动上传图片
     */
    submitForm(){
       this.$refs.uploadPicture.submit();
    },
    /**
     * 上传成功回调
     */
    onUploadSuccess(){
      this.$router.push({path:'/user/list'})
    }
  }
};
</script>
