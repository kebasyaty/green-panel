export default {
  addConfigCKEditor({ commit }, payload) {
    if (payload instanceof Object && Object.keys(payload).length > 0) {
      commit('setConfigCKEditor', payload)
    }
  }
}
