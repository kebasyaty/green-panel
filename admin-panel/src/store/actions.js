export default {
  addConfigCKEditor({ commit }, payload) {
    if (payload instanceof Object) {
      commit('setConfigCKEditor', payload)
    }
  }
}
