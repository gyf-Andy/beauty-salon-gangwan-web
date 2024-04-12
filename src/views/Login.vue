<template>
  <div class="login" >
    <img src="img/background_login.jpg" style="position: absolute;width: 100%;height: 100%;filter: blur(0px);">
    <div class="loginbox" style="text-align: center">

      <div  style="width: 50%;height: 100%;position: absolute">
        <div class="down" style="width: 100%;height: 100%;position: absolute;">
          <a-button id="btn" class="btn" type="primary" @click="btnClick" style="margin-top: 50%;width: 160px;height: 40px;border-radius:20px;">注 册</a-button>
        </div>
        <!--注册-->
        <div class="up" style="width: 100%;height: 100%;position: absolute;background: rgba(233,233,233,1);padding-top: 9%;border-radius:8px">
          <a-form
              :model="formStateR"
              name="basic"
              autocomplete="off"
              @finish="onFinishRegister"
              @finishFailed="onFinishFailedRegister"
          >
            <div  style="margin-bottom: 40px;font-size: xx-large;color: black;font-weight:20;font-family: 'Microsoft Yahei'">注 册</div>
            <a-form-item
                label=""
                name="userAccountR"
                :rules="[{ required: true, message: '请输入账号' },{validator:validatePassword}]"
            >
              <a-input style="width: 300px;height: 40px" v-model:value="formStateR.userAccountR" >
                <template #prefix>
                  <MailOutlined type="user" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
                label=""
                name="passwordR"
                :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password style="width: 300px;height: 40px" v-model:value="formStateR.passwordR" >
                <template #prefix>
                  <LockOutlined type="password"/>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item
                label=""
                name="verifyCode"
                :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <a-input-search
                  style="width: 300px;height: 50px"
                  v-model:value="formStateR.verifyCode"
                  placeholder="验证码"
                  size="large"
              >
                <template #enterButton>
                  <a-button @click="sendEmail" :disabled="canClick">{{second}}</a-button>
                </template>
              </a-input-search>
            </a-form-item>

            <a-form-item >
              <a-button type="primary" html-type="submit" style="width: 160px;height: 40px;border-radius:20px;" >注 册</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <div style="margin-left: 50%;width: 50%;height: 100%;">
        <div class="up" style="width: 50%;height: 100%;position: absolute;">
          <a-button  class="btn" type="primary" @click="btnClick" style="margin-top: 50%;width: 160px;height: 40px;border-radius:20px;">登陆</a-button>
        </div>
        <!--登陆-->
        <div class="down" style="width: 50%;height: 100%;position: absolute;background: rgba(233,233,233,1);padding-top: 9%;border-radius:8px">
          <a-form
              :model="formState"
              name="basic"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
          >
            <div  style="margin-bottom: 40px;font-size: xx-large;color: black;font-weight:20;font-family: 'Microsoft Yahei'">登 陆</div>
            <a-form-item
                label=""
                name="userAccount"
                :rules="[{ required: true, message: '请输入账号' },{validator:validatePassword}]"
            >
              <a-input style="width: 300px;height: 40px" v-model:value="formState.userAccount" >
                <template #prefix>
                  <MailOutlined type="user" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
                label=""
                name="password"
                :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password style="width: 300px;height: 40px" v-model:value="formState.password" >
                <template #prefix>
                  <LockOutlined type="password"/>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item >
              <a-button type="primary" html-type="submit" style="width: 160px;height: 40px;border-radius:20px;">登 陆</a-button>
            </a-form-item>
            <a-form-item>
              <router-link :to="{name:'AllFunction'}">
                <a style="">首页</a>
              </router-link>

              <router-link :to="{name:'ForgetPassword'}">
                <a style="margin-left: 210px">忘记密码?</a>
              </router-link>
            </a-form-item>
          </a-form>
        </div>
      </div>

    </div>
  </div>
</template>


<script>


import {reactive, toRefs} from "vue";
import {getVerify, login, register} from "@/api/authenticate";
import {message} from "ant-design-vue";
import {useRouter} from "@/router";
import {MailOutlined,LockOutlined} from "@ant-design/icons-vue";
export default {

  components: {
    MailOutlined,
    LockOutlined
  },

  setup() {
    const state = reactive({
      formState:{
        userAccount:'',
        password:'',
      },
      formStateR:{
        userAccountR:'',
        passwordR:'',
        verifyCode:'',
      },
      remember: true,
      second:'发送',
      canClick:false
    });

    const router=useRouter()

    //登陆
    const onFinish = values => {
      console.log('Success:', values);

      const formData=new FormData();
      formData.append("userAccount",state.formState.userAccount)
      formData.append("password",state.formState.password)
      login(formData).then(res=>{
        //添加token
        localStorage.setItem("token",res.data);
        localStorage.setItem("time",new Date().getTime())
        message.success("登陆成功！")
        localStorage.setItem("userAccount",state.formState.userAccount)
        router.push({
          path:"/AllFunction",
          query: { userAccount: state.formState.userAccount }
        })
      }).catch(()=>{
        message.error("账号或密码错误！")
      })
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    var times=''
    //发送验证码
    const sendEmail = () => {
      if (state.formStateR.userAccountR===''){
        message.warn("邮箱账号不能为空！")
      }else {
        //state.second=Number(60)
        state.canClick=true
        state.second=60
        times=setInterval(countdown,1000)

        const formData=new FormData();
        formData.append("email",state.formStateR.userAccountR)
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

    //注册
    const onFinishRegister = values => {
      console.log(values)
      const formData=new FormData();
      formData.append("userAccount",state.formStateR.userAccountR)
      formData.append("password",state.formStateR.passwordR)
      formData.append("verifyCode",state.formStateR.verifyCode)
      register(formData).then(res=>{
        message.warn(res.data)
      }).catch(()=>{
        message.error("注册失败！")
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

    const btnClick = () => {
      let element = document.getElementsByClassName('down');
      let upElement=document.getElementsByClassName('up');
      for (let x=0;x<2;x++){
        addClass(element[x],'active');
        upActiveClass(upElement[x],'upActive')
      }
    }

    const addClass = (element,className)=> {
      element.className = element.className.indexOf(className)===-1 ? element.className+' '+className : element.className.replace(' active','') ;
    }

    const upActiveClass = (element,className)=> {
      element.className = element.className.indexOf(className)===-1 ? element.className+' '+className : element.className.replace(' upActive','') ;
    }

    return {
      ...toRefs(state),
      validatePassword,
      onFinish,
      onFinishFailed,
      addClass,
      btnClick,
      sendEmail,
      onFinishRegister,
      onFinishFailedRegister
    }
  },
}
</script>

<style lang="less" scoped>


.login{
  height: 100vh;
  width:100%;
  border: #000 solid 0px;
  margin:  auto;

}
//.login img{
//  cursor: pointer;
//  transition: all 0.6s;
//}
//.login img:hover{
//  transform: scale(1.1);
//}

.loginbox{
  width: 700px;
  height: 400px;
  border: 1px solid white;
  border-radius: 9px;
  box-shadow: 0px 0px 7px #cdcdcd;
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.down{
  transform: scaleY(1);
  transition: transform 0.6s;
  transform-origin: top center;
}
.active {
  transform: scaleY(0);
  transition: transform 0.6s;
  transform-origin: bottom center;

}

.up{
  transform: scaleY(0);
  transition: transform 0.6s;
  transform-origin: top center;

}

.upActive{
  transform: scaleY(1);
  transition: transform 0.6s;
  transform-origin: bottom center;
}

.btn{
  display: inline-block;
  margin-bottom: 20px;
  padding: 3px 10px;
}
</style>
