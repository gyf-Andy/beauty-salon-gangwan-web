<template>
  <Welcome></Welcome>
  <a-affix :offset-top="10" style="position: absolute;margin-top: 20px;margin-left: 40px;">
    <a-tooltip  title="PDF转WORD" color="yellow" placement="bottom">
      <a-button type="link" shape="circle" style="height: 60px;width: 60px;background: #dddddd">
        <embed src="svg/pdf-word.svg" type="image/svg+xml" style="width: 40px"/>
      </a-button>
    </a-tooltip>
  </a-affix>
  <a-row type="flex" justify="center" style="margin-top: 50px">

    <a-col :span="8">
      <a-card class="setShadow" size="small" title="文档选择">
        <a-upload-dragger
            accept="application/pdf"
            :reject="reject"
            height="300px"
            :file-list="fileList"
            name="file"
            multiple="false"
            @change="handleChange"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            customRequest=""
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">点击选择文件或将文件拖入此处</p>
          <p class="ant-upload-hint">
            支持单文件上传
          </p>
        </a-upload-dragger>
      </a-card>
    </a-col>
    <a-col :span="2">
      <center>
        <a-tooltip  key="yellow" title="若文件较大，无需等待，可以直接转换" color="yellow" :visible="tooltipVisible">
          <a-button
              type="primary"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 100px"
              @click="handleUpload"
          >
            <template #icon>
              <FileSyncOutlined />
            </template>
            {{ uploading ? '转换中' : '开始转换' }}

          </a-button>
        </a-tooltip>
        <a-button style="margin-top: 40px" type="primary" @click="showDrawer" :disabled="preview">
          <template #icon>
            <EyeOutlined />
          </template>
          文件预览
        </a-button>
        <a-tooltip  key="green" title="打开文件后点击启用编辑" placement="bottom" color="green">
          <a-button style="margin-top: 40px" type="primary" @click="downLoad" :disabled="preview">
            <template #icon>
              <DownloadOutlined />
            </template>
            文件下载
          </a-button>
        </a-tooltip>
      </center>
    </a-col>
    <a-col :span="8">
      <a-card class="setShadow" size="small" title="文档预览">
        <div style="height: 302px; border: 1px dashed;width: auto;background: #d8ffbf;text-align: center;">

          <template v-if="oldFileUrl==''" >
            <div style="margin: 100px auto">
              <FilePdfOutlined style="font-size: 40px;color: #b3ff3e"/>
              <h3 style="margin-top: 20px">pdf 文档预览区</h3>
            </div>
          </template>
          <template v-if="oldFileUrl!==''">
<!--            <iframe style="height: 300px" :src='oldFileUrl' width='100%' height='100%'  frameborder='0' >-->
<!--            </iframe>-->
                <embed :src="oldFileUrl" type="application/pdf" style="height: 300px;width: 100%" >

          </template>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" style="margin-top: 30px">
    <a-col :span="18">
      <a-card class="setShadow">
        <a-descriptions title="文档信息" :column="2">
          <a-descriptions-item label="文件名">{{fileInfo.name}}</a-descriptions-item>
          <a-descriptions-item label="文件类型">{{fileInfo.type}}</a-descriptions-item>
          <a-descriptions-item label="文件大小">{{fileInfo.size}}</a-descriptions-item>
          <a-descriptions-item label="预计转换时间">{{fileInfo.estimatedConversionTime}}</a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>

  <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      width="800px"
      title="word文档预览（预览显示效果与实际效果有偏差，以实际效果为准）"
      placement="right"
      @after-visible-change="afterVisibleChange"
  >
<!--    <embed :src="newFileUrl" type="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" width=770 height=600>-->
    <iframe :src="newFileUrl" width='100%' height='100%'  frameborder='0' >
    </iframe>
  </a-drawer>

</template>

<script>


import {InboxOutlined,FileSyncOutlined,EyeOutlined,FilePdfOutlined,DownloadOutlined } from '@ant-design/icons-vue';
import {reactive, ref, toRefs,watch} from "vue";
import {message} from "ant-design-vue";
import {pdfToWord, upLoadToFileServer} from "@/api/word";
import {conversionTime, formatFileSize} from "@/plugins/util";
import Welcome from "@/views/Welcome";

export default {
  name: "PdfToWord",
  components:{
    InboxOutlined,
    FileSyncOutlined,
    EyeOutlined,
    FilePdfOutlined,
    DownloadOutlined,
    Welcome
  },
  setup() {
    const state=reactive({
      fileList: [],
      fileInfo:{
        uid: '',
        name: '',
        size:'',
        type:'',
        estimatedConversionTime:''
      },
      uploading:false,
      preview:true,
      parseUrl:'http://vw.usdoc.cn/?src=',
      oldFileUrl:'',
      newFileUrl:'',
      tooltipVisible:false,
      downLoadFileName:''
    })

    const handleChange = info => {

      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功。`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败。`);

      }
    };


    const handleRemove = file => {
      // for (let item of state.fileInfo){
      // }
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      state.fileList = newFileList;
    };

    const beforeUpload = file => {
      state.preview=true
      state.fileList = [...state.fileList, file];
      return false;
    };

    const handleUpload = () => {
      const formData = new FormData();
      state.uploading = true;
      formData.append("file",state.fileList[0])
      console.log(state.fileList)
      pdfToWord(formData).then(res => {
        state.newFileUrl=''
        state.newFileUrl=state.parseUrl+res.data
        state.downLoadFileName=res.data.substring(res.data.lastIndexOf('/')+1)
        state.fileList = [];
        state.uploading = false;
        state.preview=false
        message.success('转换成功.');
      }).catch(() => {
        state.uploading = false;
        message.error('转换失败.');
      });

    };

    const reject= () =>{
      message.warn("您上传的文件类型错误，请上传pdf文档")
    }

    watch(()=>state.fileList,(value, oldValue) =>{
      if (value!=oldValue){
        if (value.length==2){
          state.fileList.shift()
        }
        if (value.length==0){
          // state.oldFileUrl=''
          return
        }else {
          state.fileInfo.name=value[0].name
          state.fileInfo.size=formatFileSize(value[0].size,4)
          state.fileInfo.type=value[0].type
          state.fileInfo.estimatedConversionTime=conversionTime(value[0].size,3)

          let fileType=state.fileInfo.name.substring(state.fileInfo.name.lastIndexOf('.') + 1);
          if (fileType=="pdf"){
            const formData = new FormData();
            formData.append("file",state.fileList[0])
            upLoadToFileServer(formData).then(res=>{
              state.oldFileUrl=res.data
              message.success('上传成功.')
              state.tooltipVisible=true
              showTooltip(3000).then(()=>{
                state.tooltipVisible=false
              })
            }).catch(() => {
              message.error('上传失败.');
            });
          }else {
            state.fileList=[]
            message.error('文件需是pdf文档.')
          }
        }
      }
    })

    const showTooltip= (time)=> {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const downLoad=()=>{

      //从文件服务器的下载接口下载
      window.location.href="http://39.103.221.127:80/file/downLoadFile/"+state.downLoadFileName
    }

    const visible = ref(false);

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      ...toRefs(state),
      handleChange,
      handleRemove,
      beforeUpload,
      handleUpload,
      visible,
      afterVisibleChange,
      showDrawer,
      reject,
      downLoad
    }
  }
}
</script>

<style scoped></style>
