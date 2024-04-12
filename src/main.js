import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import "ant-design-vue/dist/reset.css";
import Antdev from '@/plugins/antdev'

const store = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

createApp(App)
    .use(store)
    .use(Antdev)
    .mount('#app')

