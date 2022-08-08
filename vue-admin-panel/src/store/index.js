import Vue from "vue";
import Vuex from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import documentList from "@/store/modules/document_list";
import popUpMsgs from "@/store/modules/pop_up_msgs";
import pageLockout from "@/store/modules/page_lockout";
import ckeditor from "@/store/modules/ckeditor";
import colorPicker from "@/store/modules/color_picker";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    documentList,
    popUpMsgs,
    pageLockout,
    ckeditor,
    colorPicker,
  },
});
