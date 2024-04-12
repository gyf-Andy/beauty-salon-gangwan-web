import { login, logout, getUserRoles } from '@/api/common'
import { getParametersFromURL } from '@/plugins/util'
import { useSessionStorage } from '@/plugins/storage'

export const ACCESS_TOKEN = 'ACCESS_TOKEN'

const storage = useSessionStorage()
const { token } = getParametersFromURL()
if (token) {
  storage.set(ACCESS_TOKEN, token)
}

const user = {
  namespaced: true,
  state: {
    token: token || storage.get(ACCESS_TOKEN) || '',
    initMenuList: false,
    menuList: [],
    currentMenu: {},
    staff: {
      staffId: '',
      staffName: ''
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, token) => {
      state.token = token
      storage.set(ACCESS_TOKEN, token)
    },
    SET_MENU_DATA_LIST: (state, payload) => {
      state.menuList = payload
      state.initMenuList = true
    },
    SET_CURRENT_MENU: (state, payload) => {
      state.currentMenu = payload
    },
    SET_STAFF_INFO: (state, payload) => {
      state.staff.staffId = payload.staffId
      state.staff.staffName = payload.staffName
    }
  },
  actions: {
    LoadUserRolesData({ commit }) {
      return getUserRoles().then(({ staffId, staffName, functionGroupList }) => {
        commit('SET_STAFF_INFO', { staffId, staffName })
        commit('SET_MENU_DATA_LIST', functionGroupList)
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            if (response) {
              commit('SET_ACCESS_TOKEN', response.token)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_ACCESS_TOKEN', '')
            storage.clear()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
