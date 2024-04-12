<template>
  <Welcome></Welcome>
  <a-affix :offset-top="10" style="position: absolute;margin-top: 20px;margin-left: 40px;">
    <a-tooltip  title="添加文字水印" color="yellow" placement="bottom">
      <a-button type="link" shape="circle" style="height: 60px;width: 60px;background: #dddddd">
        <embed src="svg/img-text.svg" type="image/svg+xml" style="width: 40px"/>
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
        <a-button style="margin-top: 40px" type="primary" @click="addTxtLogo" :loading="uploading" :disabled="canUpload">
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
              <a-col :span="8"><div v-show="formState.fontLocationX=='左'" :value="formState.fontContent" style="overflow-y:hidden" :style="attribute" :bordered="false" auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='中'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='右'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
            </a-row>
          </div>
          <div  style="height: 100px;width:100%">
            <a-row v-show="formState.fontLocationY=='中'" style="height: 100px;text-align: center;line-height: 100px">
              <a-col :span="8"><div v-show="formState.fontLocationX=='左'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='中'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='右'" :value="formState.fontContent"  style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
            </a-row>
          </div>
          <div  style="height: 100px;width:100%">
            <a-row v-show="formState.fontLocationY=='下'" style="height: 100px;text-align: center;line-height: 100px">
              <a-col :span="8"><div v-show="formState.fontLocationX=='左'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='中'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
              <a-col :span="8"><div v-show="formState.fontLocationX=='右'" :value="formState.fontContent" style="overflow:hidden" :style="attribute" :bordered="false"  auto-size>{{formState.fontContent}}</div></a-col>
            </a-row>
          </div >
        </div>
      </a-card>
    </a-col>
    <a-col :span="2">

    </a-col>
    <a-col :span="8">
      <a-card class="setShadow" size="small" title="选择参数">
        <a-form ref="formRef" :model="formState" :labelCol="{ span: 8 }" :wrapper-col="{ span: 16 }">

          <a-row>
            <a-col :span="12">
              <a-form-item label="文字内容" name="fontContent" >
                <a-input v-model:value="formState.fontContent" @change="changeTextLogo" style="width: 90px" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="文字大小" name="fontSize" >
                <a-input-number id="inputNumber" v-model:value="formState.fontSize" @change="changeTextLogo" :min="20" :max="150" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-item label="字体" name="fontFamily" >
                <a-select
                    ref="select"
                    v-model:value="formState.fontFamily"
                    style="width: 90px"
                    @change="changeTextLogo"
                >
                  <a-select-option value="新宋体">新宋体</a-select-option>
                  <a-select-option value="微软雅黑">微软雅黑</a-select-option>
                  <a-select-option value="华文黑体" >华文黑体</a-select-option>
                  <a-select-option value="楷体">楷体</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="文字颜色" name="fontColor" >
                <a-select
                    ref="select"
                    v-model:value="formState.fontColor"
                    style="width: 90px"
                    @change="changeTextLogo"
                >
                  <a-select-option value="black"><a-tag color="black">黑色</a-tag></a-select-option>
                  <a-select-option value="red"><a-tag color="red">红色</a-tag></a-select-option>
                  <a-select-option value="green" ><a-tag color="green">绿色</a-tag></a-select-option>
                  <a-select-option value="yellow"><a-tag color="yellow">黄色</a-tag></a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-item label="字体样式" name="fontStyle" >
                <a-select
                    ref="select"
                    v-model:value="formState.fontStyle"
                    style="width: 90px"
                    @change="changeTextLogo"
                >
                  <a-select-option value="normal">普通</a-select-option>
                  <a-select-option value="BOLD">加粗</a-select-option>
                  <a-select-option value="ITALIC">斜体</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
<!--              <a-form-item label="文字透明度" name="fontOpacity" >-->
<!--                <a-input-number-->
<!--                    v-model:value="formState.fontOpacity"-->
<!--                    style="width: 90px"-->
<!--                    :min="0"-->
<!--                    :max="1"-->
<!--                    :step="0.1"-->
<!--                    string-mode-->
<!--                    @change="changeTextLogo"-->
<!--                />-->
<!--              </a-form-item>-->
            </a-col>
          </a-row>
          <a-row >
            <a-col :span="12">
              <a-form-item label="横向位置" name="fontLocationX" >
                <a-select
                    ref="select"
                    v-model:value="formState.fontLocationX"
                    style="width: 90px"
                    @change="changeTextLogo"
                >
                  <a-select-option value="左">左</a-select-option>
                  <a-select-option value="中">中</a-select-option>
                  <a-select-option value="右">右</a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="纵向位置" name="fontLocationY" >
                <a-select
                    ref="select"
                    v-model:value="formState.fontLocationY"
                    style="width: 90px"
                    @change="changeTextLogo"
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
          请填写上方logo参数，在选择完参数后点击<a-tag style="margin-left: 4px" color="blue">开始添加</a-tag>
        </p>
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
import { PlusOutlined,DownloadOutlined,FileSyncOutlined,EyeOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, ref, toRefs, watch} from 'vue';
import {imgAddTextLogo} from "@/api/word";
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
  name: "ImgAddTextLogo",
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
        fontContent: 'logo',
        fontSize: 30,
        fontFamily: '新宋体',
        fontColor: 'black',
        fontOpacity: 0.5,
        fontStyle:'normal',
        fontLocationX: '左',
        fontLocationY:'上'
      },
      attribute: {
        fontSize: 30+'px',
        color:'black',
        fontStyle: 'normal',
        fontFamily: '新宋体',

      },
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

    const addTxtLogo = () => {
      state.newFileUrlList=[]
      state.uploading=true
      const formData = new FormData();
      state.fileList.forEach(file => {
        console.log(file)
        formData.append('files', file.originFileObj);
      });
      for (let key of Object.keys(state.formState)){
        formData.append(key,state.formState[key])
      }
      console.log(state.fileList)
      imgAddTextLogo(formData).then(res=>{
        state.uploading=false
        state.canDownLoad=false
        state.newFileUrlList=Array.from(res.data)
        message.success("水印添加完成")
      }).catch(()=>{
        state.uploading=false
        message.error("上传失败！")
      })
    }

    const changeTextLogo=()=>{
      state.attribute.color= state.formState.fontColor
      state.attribute.fontFamily=state.formState.fontFamily
      state.attribute.fontSize= state.formState.fontSize/2+'px'
      if (state.formState.fontStyle=='BOLD'){
        state.attribute['fontWeight']='bold'
      }else if (state.formState.fontStyle=='normal'){
        state.attribute['fontWeight']='normal'
        state.attribute.fontStyle='normal'
      }else {
        state.attribute.fontStyle=state.formState.fontStyle
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
      addTxtLogo,
      changeTextLogo,
      downLoad
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