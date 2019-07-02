<template>
  <div style="width:100%">
    <el-form :model="user" :rules="userAddRules" ref="userForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input v-model="user.psw"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="/"
          name="headerImg"
          ref="picupload"
          :show-file-list="false"
          :auto-upload="true"
          :on-success="handleAvatarSuccess"
          :on-change="handleAvagtarChange"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onAddUserSubmit">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {RequestAdd} from '../../api/api'
export default {
  data() {
    return {
      imageUrl:null,
      user:{
        username:'',
        psw:''
      },
      myfile:null,
      userAddRules:{
          username:[
            { required: true, message: '请输入帐号', trigger: 'blur' }
          ],
          psw:[
              {required: true, message: '请输入密码', trigger: 'blur'},
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    /**
     * 图片上传之前
     */
    beforeAvatarUpload(file){
        this.myfile=file;
    },
    /**
     * 图片上传成功
     */
    handleAvatarSuccess(res, file){

    },
    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     */
    handleAvagtarChange(file, fileList){
      //  this.myfile=file;
       this.imageUrl = URL.createObjectURL(file.raw);
    },
    onAddUserSubmit(){
      const that = this;
      this.$refs.userForm.validate( valid =>{
         if(valid){
            const formData = new FormData();
            formData.append('username',that.user.username);
            formData.append('psw',that.user.psw);
            // console.log('that.user.file >>> :'+that.myfile);
            formData.append('fileHeader',that.myfile);

           RequestAdd(formData).then(data=>{
              if(data.resultCode === 1){
                 this.$router.push({path:'/user/list'})
              }else{
                that.$message({
                message: '上传失败',
              });
              }
            })
         }else{
            that.$message({
                message: '请输入账号或密码',
            });
            return false;
         }
      } )
    }
  }
};
</script>


<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
