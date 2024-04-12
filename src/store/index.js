import { createStore } from 'vuex'
// import user from '@/store/modules/user'
import keepalive from '@/store/modules/keepalive'
import breadcrumb from '@/store/modules/breadcrumb'
export default createStore({
  state: {
    dataset: {}
  },
  mutations: {
    SET_DATASET_DATA(state, data) {
      state.dataset = data
    },
    REMOVE_DATASET_DATA(state) {
      state.dataset = {}
    }
  },
  modules: {  keepalive, breadcrumb }
})
