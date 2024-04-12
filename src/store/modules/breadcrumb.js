function getRouteBreadcrumb(path, menuList) {
  const breadcrumb = []
  if (Array.isArray(menuList)) {
    for (let group of menuList) {
      if (Array.isArray(group.functionList)) {
        for (let menu of group.functionList) {
          if (menu.funcSrc === path) {
            breadcrumb.push({ title: group.groupName })
            breadcrumb.push({ title: menu.funcName })
            return { breadcrumb, menu }
          }
          if (Array.isArray(menu.functionList)) {
            for (let func of menu.functionList) {
              if (func.funcSrc === path) {
                breadcrumb.push({ title: group.groupName })
                breadcrumb.push({ title: menu.funcName })
                return { breadcrumb, menu }
              }
            }
          }
        }
      }
    }
  }

  return { breadcrumb: [], menu: {} }
}

const store = {
  namespaced: true,

  state: {
    historyLength: 0,
    history: [],
    breadcrumb: [],
    title: ''
  },

  mutations: {
    SET_BREADCRUMB: (state, payload) => {
      state.breadcrumb = payload
    },
    SET_TITLE: (state, payload) => {
      state.title = payload
    },
    SET_HISTORY: (state, route) => {
      state.history.push(route)
    },
    REMOVE_HISTORY: (state, route) => {
      state.history.push(route)
      state.history.push(route)
    },
    CLEAR_HISTORY: state => {
      state.history = []
    },
    SET_HISTORY_LENGTH: (state, length) => {
      state.historyLength = length
    }
  },

  actions: {
    Generate({ commit, rootState }, route) {
      let breadcrumb = []
      let menu = {}
      if (route.meta && route.meta.back === true) {
        breadcrumb.push({ id: 'back' })
      }
      let obj
      for (let i = route.matched.length - 1; i >= 0; i--) {
        obj = getRouteBreadcrumb(route.matched[i].path, rootState.user.menuList)
        if (obj.breadcrumb.length > 0) {
          menu = obj.menu
          breadcrumb = breadcrumb.concat(obj.breadcrumb)
          break
        }
      }

      commit('SET_BREADCRUMB', breadcrumb)
      commit('user/SET_CURRENT_MENU', menu, { root: true })
    }
  }
}

export default store
