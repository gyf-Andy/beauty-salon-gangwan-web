const keepalive = {
  namespaced: true,

  state: {
    includes: ['Basic', 'RouteView']
  },

  mutations: {
    SET_DATA: (state, data) => {
      state.includes.push(data)
    },
    REMOVE_DATA: (state, index) => {
      state.includes.splice(index, 1)
    }
  },

  getters: {
    keepalive: state => state.includes
  },

  actions: {
    AddKeepaliveComponent({ commit, state }, component) {
      const index = state.includes.indexOf(component)
      if (index > -1) {
        commit('REMOVE_DATA', index)
      }
      commit('SET_DATA', component)
    },
    RemoveKeepaliveComponent({ commit, state }, component) {
      const index = state.includes.indexOf(component)
      if (index > -1) {
        commit('REMOVE_DATA', index)
      }
    }
  }
}

export default keepalive
