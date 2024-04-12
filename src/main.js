import { createApp } from 'vue'
import antdev from "@/plugins/antdev";
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import {createVueRouter} from "@/router";
import store from '@/store'

const router = createVueRouter()
const instance = createApp(App)
instance.use(router)
instance.use(Antd)
instance.use(antdev)
instance.use(store)
instance.mount('#app')

