<template>
  <Welcome></Welcome>
  <a-affix :offset-top="10" style="position: absolute;margin-top: 20px;margin-left: 40px;">
    <a-tooltip  title="添加图片水印" color="yellow" placement="bottom">
      <a-button type="link" shape="circle" style="height: 60px;width: 60px;background: #dddddd">
        <embed src="svg/img-img.svg" type="image/svg+xml" style="width: 40px"/>
      </a-button>
    </a-tooltip>
  </a-affix>

  <a-row type="flex" justify="center" style="margin-top: 40px">

    <a-col :span="8">
      <a-card class="setShadow" size="small" title="图片选择">
        <div class="clearfix" style="border: 1px dashed #dddddd;background: rgba(242,242,242,0.24);">
          <a-upload
              accept="image/png,image/jpeg"
              v-model:file-list="fileList"
              list-type="picture-card"
              @preview="handlePreview"
              multiple="true"
              :before-upload="beforeUpload"
          >
            <div v-if="fileList.length < 8">
              <plus-outlined />
              <div style="margin-top: 8px">添加</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-card>
    </a-col>
    <a-col :span="2">
      <center>
        <a-button style="margin-top: 40px" type="primary" @click="addImgLogo" :loading="uploading" :disabled="canUpload">
          <template #icon>
            <FileSyncOutlined />
          </template>
          开始添加
        </a-button>
        <a-button style="margin-top: 40px" type="primary" @click="downLoad" :disabled="canDownLoad">
          <template #icon>
            <DownloadOutlined />
          </template>
          下载文件
        </a-button>
      </center>
    </a-col>
    <a-col :span="8">
      <a-card class="setShadow" size="small" title="图片预览">
        <div>
          <span v-if="newFileUrlList.length==0" >
            <div style="height: 104px;width: 104px;display:inline-block;">
              <div style="height: 102px;width: 102px;display:inline-block;padding: 8px 8px 8px 8px;border: 1px solid gainsboro;text-align: center">
                <EyeOutlined style="margin-top: 25px"/>
                <p>图片预览</p>
              </div>
            </div>
          </span>
          <a-image-preview-group>
            <template v-for="url in newFileUrlList" :key="url">
              <div style="height: 104px;width: 104px;display:inline-block;">
                <div style="height: 102px;width: 102px;display:inline-block;padding: 8px 8px 8px 8px;border: 1px solid gainsboro">
                  <a-image :src="'http://39.103.221.127:8082'+url" style="height: 86px;width: 86px"></a-image>
                </div>
              </div>
            </template>
          </a-image-preview-group>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" style="margin-top: 40px">
    <a-col :span="8">
      <a-card class="setShadow" size="small" title="效果演示">
        <div style="width: 100%;height: 320px;background: no-repeat;background-image: url('http://39.103.221.127:8082/sys_files/background_logo.jpg') ;background-size: 100% ">
          <div  style="height: 100px;width:100%">
            <a-row v-show="formState.fontLocationY=='上'" style="height: 100px;text-align: center;line-height: 100px">
              <a-col :span="8"><img v-show="formState.fontLocationX=='左'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='中'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='右'" :style="style" :src="previewImage2" /></a-col>
            </a-row>
          </div>
          <div  style="height: 100px;width:100%">
            <a-row v-show="formState.fontLocationY=='中'" style="height: 100px;text-align: center;line-height: 100px">
              <a-col :span="8"><img v-show="formState.fontLocationX=='左'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='中'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='右'" :style="style" :src="previewImage2" /></a-col>
            </a-row>
          </div>
          <div  style="height: 100px;width:100%">
            <a-row v-show="formState.fontLocationY=='下'" style="height: 100px;text-align: center;line-height: 100px">
              <a-col :span="8"><img v-show="formState.fontLocationX=='左'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='中'" :style="style" :src="previewImage2" /></a-col>
              <a-col :span="8"><img v-show="formState.fontLocationX=='右'" :style="style" :src="previewImage2" /></a-col>
            </a-row>
          </div >
        </div>
      </a-card>
    </a-col>
    <a-col :span="2">

    </a-col>
    <a-col :span="8">
      <a-card class="setShadow" size="small" title="参数及水印选择">
        <a-form ref="formRef" :model="formState" :labelCol="{ span: 8 }" :wrapper-col="{ span: 16 }">

          <a-row>
            <a-col :span="12">
              <a-form-item label="logo图片" name="logoFile">
                <a-upload
                    accept="image/png,image/jpeg"
                    v-model:file-list="formState.logoFile"
                    list-type="picture-card"
                    @preview="handlePreview2"
                    :beforeUpload="beforeUpload2"
                >
                  <div v-if="formState.logoFile.length < 1">
                    <plus-outlined />
                    <div style="margin-top: 8px">上传</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible2" :title="previewTitle2" :footer="null" @cancel="handleCancel2">
                  <img alt="example" style="width: 100%" :src="previewImage2"/>
                </a-modal>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="缩放比例" name="zoomFactor">
                <a-input-number v-model:value="formState.zoomFactor" :step="0.1" string-mode :min="0.1" :max="0.5" @change="changeImgLogo" />
              </a-form-item>
              <a-form-item label="透明度" name="opacity">
                <a-input-number v-model:value="formState.opacity" :step="0.1" string-mode :min="0.1" :max="1" @change="changeImgLogo" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row >
            <a-col :span="12">
              <a-form-item label="横向位置" name="fontLocationX">
                <a-select
                    ref="select"
                    v-model:value="formState.fontLocationX"
                    style="width: 90px"
                    @change="changeImgLogo"
                >
                  <a-select-option value="左">左</a-select-option>
                  <a-select-option value="中">中</a-select-option>
                  <a-select-option value="右">右</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="纵向位置" name="fontLocationY">
                <a-select
                    ref="select"
                    v-model:value="formState.fontLocationY"
                    style="width: 90px"
                    @change="changeImgLogo"
                >
                  <a-select-option value="上">上</a-select-option>
                  <a-select-option value="中">中</a-select-option>
                  <a-select-option value="下">下</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

        </a-form>
      </a-card>
      <a-card class="setShadow" style="margin-top: 10px">
        <p>
          请选择要添加logo的图片以及logo，在选择完参数后点击<a-tag style="margin-left: 4px" color="blue">开始添加</a-tag>
        </p>
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
import { PlusOutlined,DownloadOutlined,FileSyncOutlined,EyeOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, ref, toRefs, watch} from 'vue';
import {imgAddImgLogo} from "@/api/word";
import {message} from "ant-design-vue";
import Welcome from "@/views/Welcome";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  name: "ImgAddImgLogo",
  components: {
    PlusOutlined,
    DownloadOutlined,
    FileSyncOutlined,
    EyeOutlined,
    Welcome
  },

  setup() {

    const state=reactive({
      fileList: [],

      canUpload: true,
      uploading:false,
      canDownLoad:true,
      formState: {
        logoFile:[],
        zoomFactor:0.2,
        opacity:0.5,
        fontLocationX: '左',
        fontLocationY:'上'
      },
      newFileUrlList:[],
      style:{
        height:50+'px'
      }
    })

    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = '';
    };

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);

    };

    const beforeUpload = file => {

      state.preview=true
      state.fileList = [...state.fileList, file];
      return false
    };

    const addImgLogo = () => {
      state.newFileUrlList=[]
      state.uploading=true
      const formData = new FormData();
      state.fileList.forEach(file => {
        formData.append('files', file.originFileObj);
      });
      formData.append('logoFile',state.formState.logoFile[0].originFileObj)
      formData.append('zoomFactor',state.formState.zoomFactor)
      formData.append('opacity',state.formState.opacity)
      formData.append('fontLocationX',state.formState.fontLocationX)
      formData.append('fontLocationY',state.formState.fontLocationY)

      imgAddImgLogo(formData).then(res=>{
        state.uploading=false
        state.canDownLoad=false
        state.newFileUrlList=Array.from(res.data)
        message.success("水印添加完成")
      }).catch(()=>{
        state.uploading=false
        message.error("水印添加失败")
      })
    }

    const changeImgLogo=()=>{
      state.style.height=state.formState.zoomFactor*10*50+'px'
    }

    const downLoad =  () => {
      for (let x of state.newFileUrlList){
        var fileName=x.substring(x.lastIndexOf('/')+1)

        var url = "http://39.103.221.127:80/file/downLoadFile/"+fileName
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.style.height = 0;
        iframe.src = url;
        document.body.appendChild(iframe);
        setTimeout(() => iframe.remove(), 5 * 60 * 1000);
      }
    }

    const previewVisible2 = ref(false);
    const previewImage2 = ref('');
    const previewTitle2 = ref('');

    const handleCancel2 = () => {
      previewVisible2.value = false;
      previewTitle2.value = '';
    };

    const handlePreview2 = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage2.value = file.url || file.preview;
      previewVisible2.value = true;
      previewTitle2.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    };

    const beforeUpload2 = file => {
      state.formState.logoFile = [...state.formState.logoFile, file];
      return false
    };

    //监视 state.fileList
    watch(()=>state.fileList,(value, oldValue) =>{
      if (value!=oldValue){
        if (state.fileList.length==0||state.formState.logoFile.length==0){
          state.canUpload=true
        }else {
          state.canUpload=false
        }
      }
    })

    watch(()=>state.formState.logoFile,async (value, oldValue) => {
      if (value != oldValue) {
        if (!state.formState.logoFile[0].url && !state.formState.logoFile[0].preview) {
          state.formState.logoFile[0].preview = await getBase64(state.formState.logoFile[0].originFileObj);
        }
        previewImage2.value = state.formState.logoFile[0].url || state.formState.logoFile[0].preview;
        previewTitle2.value = state.formState.logoFile[0].name || state.formState.logoFile[0].url.substring(state.formState.logoFile[0].url.lastIndexOf('/') + 1);

        //使按钮能够触发
        if (state.fileList.length==0||state.formState.logoFile.length==0){
          state.canUpload=true
        }else {
          state.canUpload=false
        }
      }
    })

    return {
      ...toRefs(state),
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      previewTitle,
      beforeUpload,
      addImgLogo,
      changeImgLogo,
      downLoad,
      handleCancel2,
      handlePreview2,
      previewVisible2,
      previewImage2,
      previewTitle2,
      beforeUpload2
    };
  },

});
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>