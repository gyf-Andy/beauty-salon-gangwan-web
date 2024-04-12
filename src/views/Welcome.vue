<template>

  <a-menu v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          mode="horizontal"
          style="height: 70px;line-height: 70px;font-size: large;">

    <a-menu-item key="home" style="margin-left: 30px"  @click="toAllFunction">

      <HomeTwoTone style="font-size: xx-large;margin-top: 10px;" /> 首页
<!--      <img src="img/clearloveTS.jpg" style="height: 50px" @click="toWelcome">-->
    </a-menu-item>

    <a-sub-menu  key="word" style="margin-left: 90px">
      <template #icon>
        <img src="svg/word.svg" type="image/svg+xml" style="width: 20px;"/>
      </template>
      <template #title>WORD文档</template>
      <a-menu-item-group title="word处理">
        <a-menu-item key="1" @click="toWordToPdf">word转pdf</a-menu-item>
        <a-menu-item key="2" @click="toWordToHtml">word转html</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>

    <a-sub-menu key="pdf">
      <template #icon>
        <img src="svg/pdf.svg" type="image/svg+xml" style="width: 20px;"/>
      </template>
      <template #title>PDF文档</template>
      <a-menu-item-group title="pdf处理">
        <a-menu-item key="5" @click="toPdfToWord">pdf转word</a-menu-item>
        <a-menu-item key="6" @click="toImgToPdf">图片合并为pdf</a-menu-item>
        <a-menu-item key="7" @click="toPdfToPptx">pdf转ppt</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>

    <a-sub-menu key="img">
      <template #icon>
        <img src="svg/img.svg" type="image/svg+xml" style="width: 20px;"/>
      </template>
      <template #title>图片</template>
      <a-menu-item-group title="图片处理">
        <a-menu-item key="9" @click="toImgAddTextLogo">添加文字水印</a-menu-item>
        <a-menu-item key="10" @click="toImgAddImgLogo">添加图片水印</a-menu-item>
        <a-menu-item key="11" @click="toCompressImg">图片压缩</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>

    <a-menu-item key="getUploadFile"  @click="toUpDownLoad">
      <template #icon>
        <cloud-two-tone style="font-size: 25px;"/>
      </template>
      上传下载文件
    </a-menu-item>

    <a-menu-item key="alipay" style="margin-left: auto">
      <a  target="_blank" rel="noopener noreferrer" v-if="login">
        <a-popover v-model:visible="visible" title="个人信息" placement="leftTop" trigger="click">
          <template #content>
              <a-card hoverable style="width: 300px">
                <div v-if="flag===1" style="height: 258px;width: 100%;text-align: center" >
                  <a-form
                      :model="formState"
                      name="basic"
                      autocomplete="off"
                      @finish="onFinish"
                      @finishFailed="onFinishFailed"
                  >
                    <a-form-item
                        label=""
                        name="nikeName"
                        :rules="[{ required: true, message: '请输入昵称' }]"
                    >
                      <a-input placeholder="请输入昵称" v-model:value="formState.nikeName" />
                    </a-form-item>
                    <a-form-item
                        label=""
                        name="oldPassword"
                        :rules="[{ required: true, message: '请输入原密码' }]"
                    >
                      <a-input-password placeholder="请输入原密码" v-model:value="formState.oldPassword" />
                    </a-form-item>
                    <a-form-item
                        label=""
                        name="newPassword"
                        :rules="[{ required: true, message: '请输入新密码' },{validator:vaNewPassword}]"
                    >
                      <a-input-password placeholder="请输入新密码" v-model:value="formState.newPassword" />
                    </a-form-item>
                    <a-form-item
                        label=""
                        name="repeatNewPassword"
                        :rules="[{ required: true, message: '请输入新密码' },{validator:validatePassword}]"
                    >
                      <a-input-password  placeholder="请再次输入新密码" v-model:value="formState.repeatNewPassword" />
                    </a-form-item>
                    <a-form-item >
                      <a-button type="primary" html-type="submit" style="width: 110px;height: 35px;border-radius:20px;">保存</a-button>
                    </a-form-item>
                  </a-form>
                </div>

                <template #cover v-if="flag===0">
                  <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                </template>
                <a-card-meta v-if="flag===0" :title="formState.nikeName" :description="formState.userAccount" >
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-card-meta>
                <template #actions>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>返回</span>
                    </template>
                    <import-outlined  @click="back"/>
                  </a-tooltip>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>修改信息</span>
                    </template>
                    <edit-outlined key="edit" @click="fixUserInfo"/>
                  </a-tooltip>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>退出</span>
                    </template>
                    <logout-outlined @click="clearToken"/>
                  </a-tooltip>
                </template>
              </a-card>

          </template>

          <a-tooltip placement="topLeft">
            <template #title>
              <span>点击查看详细个人信息</span>
            </template>
            <a-button type="link" shape="circle" >
              <a-avatar :size="50" style="background-color: #87d068;">
                <template #icon><UserOutlined style="font-size: x-large"/></template>
              </a-avatar>
            </a-button>
          </a-tooltip>

        </a-popover>
      </a>
      <a  target="_blank" rel="noopener noreferrer" v-if="!login">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>登 陆</span>
          </template>
          <a-button type="link" style="height: 40px;height: 40px" shape="circle" @click="toLogin">
            <a-avatar :size="50">
              <login-outlined  style="font-size: xx-large;margin-top: 10px"/>
            </a-avatar>
          </a-button>
        </a-tooltip>
      </a>
    </a-menu-item>
  </a-menu>
<!--  <AllFunction></AllFunction>-->
<!--  <router-view ></router-view>-->
</template>
<script>
import {onMounted, onUpdated, reactive, ref, toRefs} from "vue";
import {
  UserOutlined,
  HomeTwoTone,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  ImportOutlined,
  CloudTwoTone
} from '@ant-design/icons-vue';
import { useRouter } from '@/router';
import {useRoute} from "vue-router";
import {getUserInfo, logout, updateUserInfo} from "@/api/authenticate";
import {message} from "ant-design-vue";
// import {useRoute} from "vue-router"
// import AllFunction from "@/views/AllFunction";
export default {
  components: {
    UserOutlined,
    HomeTwoTone,
    EditOutlined,
    LoginOutlined,
    LogoutOutlined,
    ImportOutlined,
    CloudTwoTone
    // AllFunction
  },

  name:'welcome',

  setup() {
    const state=reactive({
      selectedKeys:[],
      openKeys:[],
      login:false,
      formState:{
        userAccount:'',
        nikeName:'',
        oldPassword:'',
        newPassword:'',
        repeatNewPassword:'',
      },
      flag:0
    })

    const router = useRouter()

    const toWelcome = () => {
      router.push({
        path:'/'
      })
    }

    const toWordToPdf = () => {
      router.push({
        path:"/WordToPdf"
      })
    };
    const toPdfToWord = () => {
      router.push({
        path:"/PdfToWord"
      })
    };
    const toImgAddTextLogo=()=>{
      router.push({
        path:"/ImgAddTextLogo"
      })
    }
    const toImgAddImgLogo=()=>{
      router.push({
        path:"/ImgAddImgLogo"
      })
    }

    const toCompressImg = () => {
      router.push({
        path:"/CompressImg"
      })
    }

    const toImgToPdf = () => {
      router.push({
        path:"/ImgToPdf"
      })
    }

    const toLogin = () => {
      router.push({
        path:"/Login"
      })
    }

    const toAllFunction = () => {
      router.push({
        path:"/AllFunction"
      })
    }

    const toWordToHtml = () => {
      router.push({
        path:"/WordToHtml"
      })
    }

    const toPdfToPptx = () => {
      router.push({
        path:"/PdfToPptx"
      })
    }


    const toUpDownLoad = () => {
      router.push({
        path:"/UpDownLoad"
      })
    }
    //更新
    const onFinish = values => {
      console.log('Success:', values);
      const formData=new FormData()
      formData.append('userAccount',state.formState.userAccount)
      formData.append('password',state.formState.oldPassword)
      formData.append('newPassword',state.formState.newPassword)
      formData.append('nikeName',state.formState.nikeName)
      updateUserInfo(formData).then(res=>{
        if (res.data===1){
          message.success('更新成功请重新登陆！')
          clearToken()
        }else {
          message.error('原密码错误，更新失败！')
        }
      }).catch(()=>{
        message.error('更新失败！')
      })
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const clearToken = () => {
      localStorage.removeItem("token")
      logout().then(()=>{
        message.success("已登出！")
        router.push({
          path:"/login"
        })
      })
    }

    const fixUserInfo= () => {
      state.flag=1
    }

    const back = () => {
      state.flag=0
    }

    const vaNewPassword=(rule,value)=>{
      if (!value){
        return Promise.resolve()
      }else {

        if (state.formState.newPassword== state.formState.oldPassword){
          return Promise.reject('新密码与旧密码不能相同')
        }
        return Promise.resolve()
      }
    }

    const validatePassword=(rule,value)=>{
      if (!value){
        return Promise.resolve()
      }else {
        if (state.formState.newPassword!=state.formState.repeatNewPassword){
          return Promise.reject('新密码不一致')
        }
        return Promise.resolve()
      }
    }

    const visible = ref(false);

    const hide = () => {
      visible.value = false;
    };
    const route = useRoute()
    const isLogin = () => {
      if (route.query.userAccount){
        state.formState.userAccount=route.query.userAccount
      }
      if (localStorage.getItem("token")){
        state.login=true
        const formData=new FormData()
        formData.append('userAccount',localStorage.getItem("userAccount"))
        getUserInfo(formData).then(res=>{
          console.log(res.data)
          state.formState.nikeName=res.data.userNikename
          state.formState.userAccount=res.data.userAccount
        })
      }else {
        state.login=false
      }
    }

    onMounted(isLogin)
    onUpdated(isLogin)

    return {
      ...toRefs(state),
      visible,
      hide,
      isLogin,
      toWelcome,
      toWordToPdf,
      toPdfToWord,
      toImgAddTextLogo,
      toImgAddImgLogo,
      toCompressImg,
      toImgToPdf,
      toLogin,
      toAllFunction,
      toWordToHtml,
      toPdfToPptx,
      toUpDownLoad,
      clearToken,
      fixUserInfo,
      back,
      onFinish,
      onFinishFailed,
      validatePassword,
      vaNewPassword
    };
  }
};
</script>
<style>
.setShadow{
  box-shadow:0px 0px 2px rgba(19,133,106,0.20);
}
</style>
