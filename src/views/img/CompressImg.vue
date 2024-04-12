<template>
  <Welcome></Welcome>
  <a-affix :offset-top="10" style="position: absolute;margin-top: 20px;margin-left: 40px;">
    <a-tooltip  title="图片压缩" color="yellow" placement="bottom">
      <a-button type="link" shape="circle" style="height: 60px;width: 60px;background: #dddddd">
        <embed src="svg/compress-image.svg" type="image/svg+xml" style="width: 40px"/>
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
                  <a-image  :src="'http://39.103.221.127:8082'+url" style="height: 86px;width: 86px"></a-image>
                </div>
              </div>
            </template>
          </a-image-preview-group>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" style="margin-top: 40px;text-align: center">
    <a-col :span="8">
      <a-card class="setShadow">


        <a-row>
          <a-col :span="12">
            压缩方式：
            <a-select
                ref="select"
                v-model:value="compressStyle"
                style="width: 100px"
            >
              <a-select-option value="pixel">像素压缩</a-select-option>
              <a-select-option value="height">等比压缩</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="12">

            <template v-if="compressStyle=='pixel'">
              像素压缩：
              <a-select
                  ref="select"
                  v-model:value="targetSize"
                  style="width: 130px"
              >
                <a-select-option value="256">256KB以下</a-select-option>
                <a-select-option value="512">517KB以下</a-select-option>
                <a-select-option value="1024">1M以下</a-select-option>
                <a-select-option value="2048">2M以下</a-select-option>
              </a-select>
            </template>

            <template v-if="compressStyle=='height'">
              等比压缩：
              <a-input-number v-model:value="heightSize" :step="0.1" string-mode :min="0.1" :max="1.0"  />

            </template>
          </a-col>
        </a-row>

        <a-divider orientation="left">提示</a-divider>
        <p>
          如果你选择像素压缩的压缩大小大于你的图片的大小，系统在压缩图片时将会根据图片的大小进行自适应进行压缩
        </p>
      </a-card>
    </a-col>
    <a-col :span="2">

    </a-col>
    <a-col :span="8">
      <a-card class="setShadow">
        <a-divider orientation="left">功能描述</a-divider>
        <p style="text-align: left">
          像素压缩：不会改变图片的长和高，而是对图片的像素进行压缩
        </p>
        <p style="text-align: left">
          等比压缩：不会改变单位面积内的像素密度，会改变图片的长和高
        </p>
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
import { PlusOutlined,DownloadOutlined,FileSyncOutlined,EyeOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, ref, toRefs, watch} from 'vue';
import {compressImg, compressImgByRatio} from "@/api/word";
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
  name: "CompressImg",
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
      compressStyle:'pixel',
      targetSize: '512',
      heightSize: '0.5',
      newFileUrlList:[],
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
        formData.append('files', file.originFileObj)
      })

      //像素压缩
      if (state.compressStyle=='pixel'){
        formData.append('targetSize',state.targetSize)
        compressImg(formData).then(res=>{
          state.uploading=false
          state.canDownLoad=false
          state.newFileUrlList=Array.from(res.data)
          message.success("图片压缩完成")
        }).catch(()=>{
          state.uploading=false
          message.error("图片压缩失败！")
        })
      }else {
        formData.append('heightSize',state.heightSize)

        compressImgByRatio(formData).then(res=>{
          state.uploading=false
          state.canDownLoad=false
          state.newFileUrlList=Array.from(res.data)
          message.success("图片压缩完成")
        }).catch(()=>{
          state.uploading=false
          message.error("图片压缩失败！")
        })
      }
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