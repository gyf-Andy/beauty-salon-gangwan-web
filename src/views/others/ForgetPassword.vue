<template>

  <a-row type="flex" justify="center" style="margin-top: 70px">
    <a-col :span="7">
      <a-card class="setShadow" title="身份验证" style="height: 350px;width: 500px;text-align: center" >
        <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinishRegister"
            @finishFailed="onFinishFailedRegister"
        >
          <a-form-item
              label=""
              name="userAccount"
              :rules="[{ required: true, message: '请输入账号' },{validator:validatePassword}]"
          >
            <a-input style="width: 300px;height: 40px" placeholder="邮箱账号" v-model:value="formState.userAccount" :disabled="IsAuthSuccess">
              <template #prefix>
                <MailOutlined type="user" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              label=""
              name="verifyCode"
              :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <a-input-search
                style="width: 300px;height: 50px"
                v-model:value="formState.verifyCode"
                placeholder="验证码"
                size="large"
                :disabled="IsAuthSuccess"
            >
              <template #enterButton>
                <a-button @click="sendEmail" :disabled="canClick" >{{second}}</a-button>
              </template>
            </a-input-search>
          </a-form-item>
          <a-form-item >
            <a-button type="primary" html-type="submit" style="width: 160px;height: 40px;" :disabled="IsAuthSuccess">验证</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
    <a-col :span="2">
    </a-col>
    <a-col :span="7">
      <a-card class="setShadow" title="密码修改" style="height: 350px;width: 500px;text-align: center">
        <a-form
            :model="formStateRepeat"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              label=""
              name="newPassword"
              :rules="[{ required: true, message: '密码不能为空'}]"
          >
            <a-input-password style="width: 300px;height: 40px" placeholder="请输入密码" v-model:value="formStateRepeat.newPassword" :disabled="!IsAuthSuccess">
              <template #prefix>
                <LockOutlined type="password" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
              label=""
              name="newPasswordRepeat"
              :rules="[{ required: true, message: '密码不能为空'}]"
          >
            <a-input-password style="width: 300px;height: 40px" v-model:value="formStateRepeat.newPasswordRepeat" placeholder="请再次输入密码" :disabled="!IsAuthSuccess">
              <template #prefix>
                <LockOutlined type="password" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item >
            <a-button type="primary" html-type="submit" style="width: 160px;height: 40px;" :disabled="!IsAuthSuccess">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
  <a-row type="flex" justify="center" style="margin-top: 40px">
    <a-col :span="16">
      <a-typography>
        <a-typography-title :level="2">账号找回</a-typography-title>
        <a-typography-paragraph>
          忘记密码后通过以下步骤找回账号
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ul>
            <a-row type="flex" justify="center" >
              <a-col :span="8">
                <li>
                <a-typography-link >获取验证码</a-typography-link>
                <a-typography-paragraph>
                  <blockquote>输入要找回的邮箱账号，点击发送获取验证码</blockquote>
                </a-typography-paragraph>
                </li>
              </a-col>
              <a-col :span="8">
                <li>
                  <a-typography-link >验证身份</a-typography-link>
                  <a-typography-paragraph>
                    <blockquote>输入得到的验证码点击验证按钮进行验证</blockquote>
                  </a-typography-paragraph>
                </li>
              </a-col>
              <a-col :span="8">
                <li>
                  <a-typography-link >修改密码</a-typography-link>
                  <a-typography-paragraph>
                    <blockquote>验证成功后，输入新密码并点击提交按钮</blockquote>
                  </a-typography-paragraph>
                </li>
              </a-col>
            </a-row>
          </ul>
        </a-typography-paragraph>
      </a-typography>
    </a-col>
  </a-row>

</template>

<script>
import {reactive, toRefs} from "vue";
import {message} from "ant-design-vue";
import {authenticate, getVerify} from "@/api/authenticate";
import  {MailOutlined,LockOutlined} from "@ant-design/icons-vue";
import {updatePasswordByUserAccount} from "@/api/authenticate";
import {useRouter} from "@/router";

export default {
  name: "ForgetPassword",
  components: {
    MailOutlined,
    LockOutlined
  },
  setup(){
    const state=reactive({
      formState:{
        userAccount:'',
        verifyCode: ''
      },
      formStateRepeat:{
        newPassword:'',
        newPasswordRepeat:''
      },
      canClick:false,
      second:'发送',
      IsAuthSuccess:false,
    })

    var times=''
    //发送验证码
    const sendEmail = () => {
      if (state.formState.userAccount===''){
        message.warn("邮箱账号不能为空！")
      }else {
        //state.second=Number(60)
        state.canClick=true
        state.second=60
        times=setInterval(countdown,1000)

        const formData=new FormData();
        formData.append("email",state.formState.userAccount)
        getVerify(formData).then(res=>{
          message.success(res.data)
        }).catch(()=>{
          message.error("发送失败！")
        })
      }
    }

    const validatePassword=(rule,value)=>{
      if (!value){
        return Promise.resolve()
      }else {
        let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)){
          return Promise.reject('邮箱格式不合法')
        }
        return Promise.resolve()
      }
    }

    //验证
    const onFinishRegister = values => {
      console.log(values)
      const formData=new FormData();
      formData.append("userAccount",state.formState.userAccount)
      formData.append("verifyCode",state.formState.verifyCode)
      authenticate(formData).then(res=>{
        if (res.data=='验证通过'){
          message.success(res.data)
          state.IsAuthSuccess=true
        }else {
          message.error(res.data)
        }
      }).catch(()=>{
        message.error("验证失败！")
      })
    }

    const onFinishFailedRegister = errorInfo => {
      console.log(errorInfo)
    }

    const countdown=() => {
      if (state.second===0){
        clearInterval(times)
        state.canClick=false
        state.second='发送'
      }else {
        state.second=state.second-1
      }
    }

    const router = useRouter()

    //修改密码
    const onFinish = values => {
      console.log(values)
      if (state.formStateRepeat.newPassword!=state.formStateRepeat.newPasswordRepeat){
        message.warn('密码不相同')
      }else {
        const formData=new FormData()
        formData.append('userAccount',state.formState.userAccount)
        formData.append('newPassword',state.formStateRepeat.newPassword)
        updatePasswordByUserAccount(formData).then(()=>{
          message.success('更改成功！')
          router.push({
            path:"/Login"
          })
        }).catch(()=>{
          message.error('更改失败！')
        })
      }
    }

    const onFinishFailed = values => {
      console.log(values)
    }

    return {
      ...toRefs(state),
      sendEmail,
      validatePassword,
      onFinishRegister,
      onFinishFailedRegister,
      onFinish,
      onFinishFailed
    }
  }
}
</script>

<style scoped>

</style>