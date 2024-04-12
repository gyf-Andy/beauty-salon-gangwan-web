<template>
  <Welcome></Welcome>
  <a-affix :offset-top="10" style="position: absolute;margin-top: 20px;margin-left: 40px;">
    <a-tooltip  title="图片压缩" color="yellow" placement="bottom">
      <a-button type="link" shape="circle" style="height: 60px;width: 60px;background: #dddddd">
        <embed src="svg/img-pdf.svg" type="image/svg+xml" style="width: 40px"/>
      </a-button>
    </a-tooltip>
  </a-affix>


  <a-row type="flex" justify="center" style="margin-top: 40px">

    <a-col :span="16">
      <a-card class="setShadow" size="small" title="图片选择">
        <div class="clearfix"  style="border: 1px dashed #dddddd;background: rgba(242,242,242,0.24);">
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
  </a-row>

  <a-row type="flex" justify="center" style="margin-top: 40px;text-align: center">
    <a-col :span="7">
      <a-card class="setShadow">
        <a-row>
          <a-col :span="12">
            <a-button  type="primary" @click="addImgLogo" :loading="uploading" :disabled="canUpload">
              <template #icon>
                <FileSyncOutlined />
              </template>
              开始合并
            </a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" @click="showDrawer" :disabled="canDownLoad">
              <template #icon>
                <EyeOutlined />
              </template>
              预览文件
            </a-button>
          </a-col>
        </a-row>

        <a-divider orientation="left">提示</a-divider>
        <p>
          最多对8张图片进行合并，超出的图片将不会被上传
        </p>
      </a-card>
    </a-col>
    <a-col :span="2">

    </a-col>
    <a-col :span="7">
      <a-card class="setShadow">
        <a-row>
          <a-col :span="24">
            <a-button type="primary" @click="downLoad" :disabled="canDownLoad">
              <template #icon>
                <DownloadOutlined />
              </template>
              下载文件
            </a-button>
          </a-col>
        </a-row>
        <a-divider orientation="left">功能描述</a-divider>
        <p style="text-align: left">
          转换后的文件将会存储到文件服务器，可以在上传下载文件模块查看
        </p>
      </a-card>
    </a-col>
  </a-row>

  <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      width="800px"
      title="图片合并为pdf"
      placement="right"
      @after-visible-change="afterVisibleChange"
  >
    <embed :src="pdfPath" type="application/pdf" width=770 height=600>
  </a-drawer>
</template>
<script>
import { PlusOutlined,DownloadOutlined,FileSyncOutlined ,EyeOutlined} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref, toRefs, watch} from 'vue';
import {imgToPdf} from "@/api/word";
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
  name: "ImgToPdf",
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
      pdfPath:'',
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
      state.uploading=true
      const formData = new FormData();
      state.fileList.forEach(file => {
        formData.append('files', file.originFileObj)
      })

      imgToPdf(formData).then(res=>{
        state.uploading=false
        state.pdfPath=res.data
        state.canDownLoad=false
        message.success("合并成功！" )
      })
    }

    const downLoad =  () => {
      var fileName=state.pdfPath.substring(state.pdfPath.lastIndexOf('/')+1)

      var url = "http://39.103.221.127:80/file/downLoadFile/"+fileName
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.height = 0;
      iframe.src = url;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 5 * 60 * 1000);

    }

    //监视 state.fileList
    watch(()=>state.fileList,(value, oldValue) =>{
      if (value!=oldValue){
        if (state.fileList.length==0){
          state.canUpload=true
        }else {
          state.canUpload=false
        }
      }
    })

    const visible = ref(false);

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      ...toRefs(state),
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      previewTitle,
      beforeUpload,
      addImgLogo,
      downLoad,
      visible,
      afterVisibleChange,
      showDrawer
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