<template>
  <welcome></welcome>
  <div class="gutter-example">
    <a-row :gutter="16" type="flex" justify="center" style="margin-top: 50px">
      <a-col class="gutter-row" :span="12" >
        <a-space  :size="13">
          <a-input v-model:value="fileName" placeholder="文件名" />
          <a-date-picker show-time v-model:value="startDate" :disabledDate="disabledDate">
            <template #renderExtraFooter>选择起始时间</template>
          </a-date-picker>
          <a-button type="primary" @click="searchFile">
            <template #icon><SearchOutlined /></template>
            查询
          </a-button>
        </a-space>
      </a-col>

      <a-col class="gutter-row" :span="3" >
        <a-button type="primary" style="margin-right: -0px" @click="showModal">
          <template #icon><UploadOutlined /></template>
          上传
        </a-button>
      </a-col>
    </a-row>
    <a-row :gutter="16" type="flex" justify="center" style="margin-top: 50px">
      <a-col class="gutter-row" :span="16" >
        <a-table :columns="columns" :data-source="fileInfoList"  >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'detail'">
              <a-button type="link" @click="deleteFile(record)">删除</a-button>
              <a-button type="link" @click="downLoadFile(record)">下载</a-button>
            </template>
            <template v-if="column.dataIndex === 'uploadDate'">
              {{changeDateType(record.uploadDate)}}
            </template>
            <template v-if="column.dataIndex === 'fileSize'">
              {{changeSize(record.fileSize) }}
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
  <a-modal v-model:visible="visible" title="文件上传" :footer="null" @ok="handleOk">

      <a-upload-dragger
          height="200px"
          multiple="true"
          :file-list="fileList"
          name="file"
          @change="handleChange"
          :remove="handleRemove"
          :before-upload="beforeUpload"
          customRequest=""
          class="upload-list-inline"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击选择文件或将文件拖入此处</p>
        <p class="ant-upload-hint">
          支持多文件上传
        </p>
      </a-upload-dragger>
    <div style="width: 100%">
      <a-button type="primary" @click="upLoad" style="margin-left: 380px;margin-top: 20px">上传</a-button>
    </div>
  </a-modal>
</template>
<script>
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue';
import Welcome from "@/views/Welcome";
import {SearchOutlined,UploadOutlined} from "@ant-design/icons-vue";
import {deleteOneFileInfo, getAllFileInfo, upLoadFiles} from "@/api/word";
import {message} from "ant-design-vue";

import moment from "moment";
import {formatFileSize} from "@/plugins/util";

const columns = [
  {
    title: '序号',
    customRender: ({ index }) => {
      return index + 1
    }
  },
  {
    title: '文件名',
    dataIndex: 'fileName'
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
  },
  {
    title: '文件大小',
    dataIndex: 'fileSize',
  },
  {
    title: '上传时间',
    dataIndex: 'uploadDate',
    sorter: (a, b) => { return a.time> b.time? 1 : -1 },
  },
  {
    title: '操作',
    dataIndex: 'detail',
  },
]

export default defineComponent({
  name: "UpDownLoad",
  components: {
    Welcome,
    SearchOutlined,
    UploadOutlined
  },
  setup() {
    const state=reactive({
      fileInfoList:[],
      fileName:'',
      startDate:null,
      fileList:[]
    })

    let copyFileList=[]
    //获取所有文件信息
    const getAll = () => {
      getAllFileInfo().then(res=>{
        copyFileList=res.data
        state.fileInfoList=res.data
      })
    }

    onMounted(getAll)

    //删除
    const deleteFile = (record) => {
      deleteOneFileInfo(record.fileId).then(()=>{
        message.success('删除成功！')
        getAll()
      }).catch(()=>{
        message.error('删除出错！')
      })
    }

    //下载
    const downLoadFile = (record) => {
      //从文件服务器的下载接口下载
      window.location.href="http://39.103.221.127:80/file/downloadSourceFile/"+record.fileName
    }

    //查询文件信息
    const searchFile = () => {
      if (state.fileName==''&&state.startDate==null){
        state.fileInfoList=copyFileList
      }else {
        if (state.startDate==null){
          state.fileInfoList = copyFileList.filter(file => {
            return file.fileName.indexOf(state.fileName)>-1
          })
        }else if (state.fileName==''){
          state.fileInfoList = copyFileList.filter(file => {
            return changeDateType(file.uploadDate) > changeDateType(state.startDate.$d)
          })
        }else {
          state.fileInfoList = copyFileList.filter(file => {
            return (changeDateType(file.uploadDate) > changeDateType(state.startDate.$d))&&(file.fileName.indexOf(state.fileName)>-1)
          })
        }
      }
    }

    //上传文件
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

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

    //上传文件
    const upLoad = () => {
      if (state.fileList.length==0){
        message.warn('请选择要提交的文件!')
      }else {
        const formData=new FormData()
        for (let file of state.fileList){
          formData.append("files",file)
        }
        upLoadFiles(formData).then(()=>{
          message.success('上传成功')
          visible.value=false //关闭模态框
          state.fileList=[]//清空文件
          getAll()
        }).catch(()=>{
          message.warn('上传失败')
        })
      }
    }

    //转换时间格式
    const changeDateType = (date) => {
      return  moment(date).format('YYYY-MM-DD HH:mm:ss')
    }

    //为文件大小添加单位
    const changeSize = (size) => {
      return formatFileSize(size,2)
    }

    //时间选择不可选择未来
    const disabledDate  = (current) => {
      // 不可选未来时间
      return current && current > Date.now();
    }

    return {
      ...toRefs(state),
      columns,
      getAll,
      deleteFile,
      downLoadFile,
      searchFile,
      visible,
      showModal,
      handleOk,
      handleChange,
      handleRemove,
      beforeUpload,
      upLoad,
      changeDateType,
      changeSize,
      disabledDate
    };
  },
});
</script>