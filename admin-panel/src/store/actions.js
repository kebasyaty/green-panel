export default {
  addConfigCKEditor({ commit }, config, lang = 'en') {
    if (config instanceof Object && Object.keys(config).length > 0) {
      config.language = lang
      commit('setConfigCKEditor', config)
    }
  }
}
