(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fb7b8372"],{1219:function(t,e,n){},"17b3":function(t,e,n){},"28a0":function(t,e){"function"===typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},3022:function(t,e,n){(function(t){var r=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),n={},r=0;r<e.length;r++)n[e[r]]=Object.getOwnPropertyDescriptor(t,e[r]);return n},i=/%[sdj%]/g;e.format=function(t){if(!w(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(a(arguments[n]));return e.join(" ")}n=1;for(var r=arguments,o=r.length,s=String(t).replace(i,(function(t){if("%%"===t)return"%";if(n>=o)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}})),c=r[n];n<o;c=r[++n])y(c)||!L(c)?s+=" "+c:s+=" "+a(c);return s},e.deprecate=function(n,r){if("undefined"!==typeof t&&!0===t.noDeprecation)return n;if("undefined"===typeof t)return function(){return e.deprecate(n,r).apply(this,arguments)};var i=!1;function o(){if(!i){if(t.throwDeprecation)throw new Error(r);t.traceDeprecation?console.trace(r):console.error(r),i=!0}return n.apply(this,arguments)}return o};var o,s={};function a(t,n){var r={seen:[],stylize:l};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),b(n)?r.showHidden=n:n&&e._extend(r,n),$(r.showHidden)&&(r.showHidden=!1),$(r.depth)&&(r.depth=2),$(r.colors)&&(r.colors=!1),$(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),h(r,t,r.depth)}function c(t,e){var n=a.styles[e];return n?"["+a.colors[n][0]+"m"+t+"["+a.colors[n][1]+"m":t}function l(t,e){return t}function u(t){var e={};return t.forEach((function(t,n){e[t]=!0})),e}function h(t,n,r){if(t.customInspect&&n&&O(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,t);return w(i)||(i=h(t,i,r)),i}var o=p(t,n);if(o)return o;var s=Object.keys(n),a=u(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(n)),k(n)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return d(n);if(0===s.length){if(O(n)){var c=n.name?": "+n.name:"";return t.stylize("[Function"+c+"]","special")}if(_(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(P(n))return t.stylize(Date.prototype.toString.call(n),"date");if(k(n))return d(n)}var l,b="",y=!1,D=["{","}"];if(v(n)&&(y=!0,D=["[","]"]),O(n)){var S=n.name?": "+n.name:"";b=" [Function"+S+"]"}return _(n)&&(b=" "+RegExp.prototype.toString.call(n)),P(n)&&(b=" "+Date.prototype.toUTCString.call(n)),k(n)&&(b=" "+d(n)),0!==s.length||y&&0!=n.length?r<0?_(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special"):(t.seen.push(n),l=y?f(t,n,r,a,s):s.map((function(e){return g(t,n,r,a,e,y)})),t.seen.pop(),m(l,b,D)):D[0]+b+D[1]}function p(t,e){if($(e))return t.stylize("undefined","undefined");if(w(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return S(e)?t.stylize(""+e,"number"):b(e)?t.stylize(""+e,"boolean"):y(e)?t.stylize("null","null"):void 0}function d(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,n,r,i){for(var o=[],s=0,a=e.length;s<a;++s)F(e,String(s))?o.push(g(t,e,n,r,String(s),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(g(t,e,n,r,i,!0))})),o}function g(t,e,n,r,i,o){var s,a,c;if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?a=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(a=t.stylize("[Setter]","special")),F(r,i)||(s="["+i+"]"),a||(t.seen.indexOf(c.value)<0?(a=y(n)?h(t,c.value,null):h(t,c.value,n-1),a.indexOf("\n")>-1&&(a=o?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n"))):a=t.stylize("[Circular]","special")),$(s)){if(o&&i.match(/^\d+$/))return a;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function m(t,e,n){var r=t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return r>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function v(t){return Array.isArray(t)}function b(t){return"boolean"===typeof t}function y(t){return null===t}function D(t){return null==t}function S(t){return"number"===typeof t}function w(t){return"string"===typeof t}function x(t){return"symbol"===typeof t}function $(t){return void 0===t}function _(t){return L(t)&&"[object RegExp]"===C(t)}function L(t){return"object"===typeof t&&null!==t}function P(t){return L(t)&&"[object Date]"===C(t)}function k(t){return L(t)&&("[object Error]"===C(t)||t instanceof Error)}function O(t){return"function"===typeof t}function j(t){return null===t||"boolean"===typeof t||"number"===typeof t||"string"===typeof t||"symbol"===typeof t||"undefined"===typeof t}function C(t){return Object.prototype.toString.call(t)}function N(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(n){if($(o)&&(o=Object({NODE_ENV:"production",BASE_URL:"/admin/contrib/"}).NODE_DEBUG||""),n=n.toUpperCase(),!s[n])if(new RegExp("\\b"+n+"\\b","i").test(o)){var r=t.pid;s[n]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",n,r,t)}}else s[n]=function(){};return s[n]},e.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=v,e.isBoolean=b,e.isNull=y,e.isNullOrUndefined=D,e.isNumber=S,e.isString=w,e.isSymbol=x,e.isUndefined=$,e.isRegExp=_,e.isObject=L,e.isDate=P,e.isError=k,e.isFunction=O,e.isPrimitive=j,e.isBuffer=n("d60a");var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function M(){var t=new Date,e=[N(t.getHours()),N(t.getMinutes()),N(t.getSeconds())].join(":");return[t.getDate(),T[t.getMonth()],e].join(" ")}function F(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",M(),e.format.apply(e,arguments))},e.inherits=n("28a0"),e._extend=function(t,e){if(!e||!L(e))return t;var n=Object.keys(e),r=n.length;while(r--)t[n[r]]=e[n[r]];return t};var A="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function E(t,e){if(!t){var n=new Error("Promise was rejected with a falsy value");n.reason=t,t=n}return e(t)}function R(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var i=n.pop();if("function"!==typeof i)throw new TypeError("The last argument must be of type Function");var o=this,s=function(){return i.apply(o,arguments)};e.apply(this,n).then((function(e){t.nextTick(s,null,e)}),(function(e){t.nextTick(E,e,s)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(e)),Object.defineProperties(n,r(e)),n}e.promisify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');if(A&&t[A]){var e=t[A];if("function"!==typeof e)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,n,r=new Promise((function(t,r){e=t,n=r})),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push((function(t,r){t?n(t):e(r)}));try{t.apply(this,i)}catch(s){n(s)}return r}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),A&&Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,r(t))},e.promisify.custom=A,e.callbackify=R}).call(this,n("4362"))},"898f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.serviceList.length>0?n("v-container",{attrs:{fluid:""}},[n("v-card",{staticClass:"mt-1"},[n("v-toolbar",{attrs:{dense:"",flat:""}},[n("v-btn",{attrs:{icon:""},on:{click:t.goBack}},[n("v-icon",[t._v("mdi-arrow-left")])],1)],1),n("v-card-title",{staticClass:"pt-0"},[t._v(t._s(t.collectionTitle))]),n("v-card-subtitle",[t._v(t._s(t.breadcrumbs))]),n("v-card-text",{staticClass:"pt-4"},[n("v-row",[n("v-col",{attrs:{cols:"12",md:"6"}},[n("div",{staticClass:"max-w-400"},[n("v-text-field",{staticClass:"shrink",attrs:{dense:"",clearable:"","hide-details":"",placeholder:t.$t("message.3"),"append-icon":"mdi-magnify"},on:{input:function(e){return t.documentSearch()}},scopedSlots:t._u([{key:"append-outer",fn:function(){return[n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,i=e.attrs;return[n("v-btn",t._g(t._b({staticStyle:{"margin-top":"-10px"},attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(e){return t.pasteSearchData()}}},"v-btn",i,!1),r),[n("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-paste")])],1)]}}],null,!1,638326765)},[n("span",[t._v(t._s(t.$t("message.71")))])])]},proxy:!0}],null,!1,1766464419),model:{value:t.updateSearchQuery,callback:function(e){t.updateSearchQuery=e},expression:"updateSearchQuery"}})],1)]),n("v-col",{staticClass:"text-md-right",attrs:{cols:"12",md:"6"}},[n("v-btn",{attrs:{dark:"",depressed:"",color:t.btnGreen.bg,to:t.docUrlNoIndex+"/new"}},[n("v-icon",{attrs:{left:"",color:t.btnGreen.icon}},[t._v("mdi-file-plus-outline")]),n("span",{class:t.btnGreen.text},[t._v(t._s(t.$t("message.25")))])],1)],1)],1),n("v-row",[n("v-col",{attrs:{cols:"12"}},[t.docsToBeDeleted.length>0?n("v-btn",{attrs:{dark:"",depressed:"",color:t.btnRed.bg},on:{click:function(e){return t.deleteDocs()}}},[n("v-icon",{attrs:{left:"",color:t.btnRed.icon}},[t._v("mdi-close-thick")]),n("span",{class:t.btnRed.text},[t._v(t._s(t.$t("message.4")))])],1):t._e()],1)],1),n("v-row",[n("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[n("div",{staticClass:"w-260"},[n("v-select",{attrs:{items:t.itemsSortDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDocList,callback:function(e){t.updateSortDocList=e},expression:"updateSortDocList"}})],1)]),n("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[n("div",{staticClass:"w-180"},[n("v-select",{attrs:{items:t.itemsSortDirectDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDirectDocList,callback:function(e){t.updateSortDirectDocList=e},expression:"updateSortDirectDocList"}})],1)]),n("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[n("v-btn",{attrs:{dark:"",small:"",depressed:"",color:t.btnBlue.bg,disabled:0===t.dataFilters.length},on:{click:function(e){t.showFilterDoc=!0}}},[n("v-icon",{attrs:{left:"",color:t.btnBlue.icon}},[t._v("mdi-filter")]),n("span",{class:t.dataFilters.length>0?t.btnBlue.text:""},[t._v(t._s(t.$t("message.64")))])],1)],1)],1),n("v-simple-table",{staticClass:"mt-4",attrs:{"fixed-header":""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",{staticClass:"document-list",style:t.$vuetify.theme.dark?"background: #1d1f34;":"background: #f5f6fb;"},[n("tr",[n("th",{staticStyle:{"text-align":"left !important"},attrs:{align:"left"}},[t._v(" № ")]),n("th",{attrs:{align:"center"}},[n("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",color:"red darken-2",disabled:0===t.documents.length},on:{change:function(e){return t.markAllDocsForDeletion()}},model:{value:t.deleteAllDocsFlag,callback:function(e){t.deleteAllDocsFlag=e},expression:"deleteAllDocsFlag"}})],1),t._l(t.fields,(function(e,r){return n("th",{key:"header-"+r,attrs:{align:"center"}},[t._v(" "+t._s(e.title)+" ")])})),n("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.29")))]),n("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.30")))]),n("th",{attrs:{align:"center"}},[t._v("ID")])],2)]),n("tbody",{staticClass:"document-list"},t._l(t.documents,(function(e,r){return n("tr",{key:"doc-"+r},[n("td",{staticClass:"pr-0",staticStyle:{"text-align":"left !important"},attrs:{width:"76",align:"left"}},[t._v(" "+t._s(r+t.progressionStep)+" ")]),n("td",{staticClass:"pr-0",attrs:{width:"76",align:"center"}},[n("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",value:r,color:"red darken-2"},on:{change:function(e){return t.checkStatusListSelectedDocsDeleted()}},model:{value:t.docsToBeDeleted,callback:function(e){t.docsToBeDeleted=e},expression:"docsToBeDeleted"}})],1),t._l(t.fields,(function(i,o){return[n("td",{key:o,attrs:{align:"center"}},[0===o?[n("span",[n("v-btn",t._g(t._b({staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(n){return t.copyLinkNameDoc(e[i.field])}}},"v-btn",t.attrs,!1),t.on),[n("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-copy")])],1)],1),n("span",[n("router-link",{attrs:{to:t.getDocFormUrl(r)}},[t._v(t._s(e[i.field]))])],1)]:n("span",{domProps:{innerHTML:t._s(e[i.field])}})],2)]})),n("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.created_at))}}),n("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.updated_at))}}),n("td",{attrs:{align:"center"}},[n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(r){var i=r.on,o=r.attrs;return[n("v-btn",t._g(t._b({attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(n){return t.copyHashDoc(e.hash)}}},"v-btn",o,!1),i),[n("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-copy")])],1)]}}],null,!0)},[n("span",[t._v(t._s(e.hash))])])],1)],2)})),0)]},proxy:!0}],null,!1,997725484)})],1),n("v-card-actions",[n("v-row",[n("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[n("div",{staticClass:"w-80 block-center"},[n("v-select",{attrs:{items:t.countPerPage,"hide-details":"",dense:""},on:{change:function(e){return t.changeDocsPerPage()}},model:{value:t.updateDocsPerPage,callback:function(e){t.updateDocsPerPage=e},expression:"updateDocsPerPage"}})],1)]),n("v-col",{attrs:{cols:"12 pb-4"}},[t.blockPagination?t._e():n("v-pagination",{attrs:{circle:"",color:"#2196f38f",length:t.pageCount,"total-visible":5},on:{input:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateCurrentPageNumber,callback:function(e){t.updateCurrentPageNumber=e},expression:"updateCurrentPageNumber"}})],1)],1)],1)],1),n("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.showFilterDoc,callback:function(e){t.showFilterDoc=e},expression:"showFilterDoc"}},[n("v-card",[n("v-card-actions",{staticClass:"pr-3 pt-2 pb-0"},[n("v-spacer"),n("v-btn",{attrs:{icon:"",small:"",color:"red"},on:{click:function(e){t.showFilterDoc=!1}}},[n("v-icon",[t._v("mdi-close")])],1)],1),n("v-card-title",{staticClass:"pt-0 pb-6"},[t._v(t._s(t.$t("message.65")))]),n("v-card-text",[n("v-row",{attrs:{justify:"center"}},t._l(t.dataFilters,(function(e,r){return n("v-col",{key:"filter-"+r,staticClass:"mb-4",attrs:{cols:"12"}},[n("v-autocomplete",{staticClass:"shrink",attrs:{dense:"",chips:e.multiple,"deletable-chips":e.multiple,"small-chips":e.multiple,clearable:"","hide-details":"","item-text":"title","item-value":"value",label:e.label,multiple:e.multiple,items:e.items},on:{input:function(e){return t.getDocumentList()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(r){var i=r.on;return[n("v-btn",{attrs:{fab:"",dark:"",small:"",depressed:"",color:e.negation?t.btnBlue.bg:t.btnRed.bg},on:{click:function(n){e.negation=!e.negation,t.getDocumentList()}}},[n("v-icon",t._g({attrs:{color:e.negation?t.btnBlue.icon:t.btnRed.icon}},i),[t._v(t._s(e.negation?"mdi-minus":"mdi-plus"))])],1)]}}],null,!0)},[t._v(" "+t._s(t.$t("message.69"))+" ")])]},proxy:!0}],null,!0),model:{value:t.selectDataFilters[e.field],callback:function(n){t.$set(t.selectDataFilters,e.field,n)},expression:"selectDataFilters[filter.field]"}})],1)})),1)],1)],1)],1)],1):t._e()},i=[],o=n("5530"),s=(n("498a"),n("99af"),n("d3b7"),n("25f0"),n("ac1f"),n("5319"),n("fb6a"),n("159b"),n("9129"),n("a9e3"),n("4e82"),n("caad"),n("2532"),n("2f62")),a=n("d3bd"),c=n.n(a),l=n("d444"),u=n.n(l),h={name:"DocumentList",data:function(){return{deleteAllDocsFlag:!1,docsToBeDeleted:[],countPerPage:[10,20,30,40,50,60,70,80,90,100],showFilterDoc:!1}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(s["d"])(["serviceList","btnRed","btnBlue","btnGreen"])),Object(s["d"])("documentList",["documents","currentPageNumber","pageCount","progressionStep","docsPerPage","sortDocList","sortDirectDocList","sortTypes","searchQuery","dataFilters","selectDataFilters","blockPagination","blockLoadDocs"])),{},{updateCurrentPageNumber:{get:function(){return this.currentPageNumber},set:function(t){this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[],this.setCurrentPageNumber(t)}},updateSearchQuery:{get:function(){return this.searchQuery},set:function(t){this.setSearchQuery(t?t.trim():t)}},updateDocsPerPage:{get:function(){return this.docsPerPage},set:function(t){this.setDocsPerPage(t)}},updateSortDocList:{get:function(){return this.sortDocList},set:function(t){this.setSortDocList(t)}},updateSortDirectDocList:{get:function(){return this.sortDirectDocList},set:function(t){this.setSortDirectDocList(t)}},collectionTitle:function(){var t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].title},breadcrumbs:function(){var t=this.$route.params.indexService,e=this.serviceList[t].service.title;return"".concat(e," > ").concat(this.collectionTitle)},docUrlNoIndex:function(){var t=this.$i18n.locale,e=this.$route.params.indexService,n=this.$route.params.indexCollection,r=this.serviceList[e],i=c()(r.service.title,{locale:t}),o=c()(this.collectionTitle,{locale:t});return"/".concat(i,"/").concat(e,"/").concat(o,"/").concat(n,"/document")},fields:function(){var t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].fields}}),watch:{blockLoadDocs:function(t){t||(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[])}},filters:{upperCase:function(t){return t?(t=t.toString(),t.toUpperCase()):""}},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(s["c"])("documentList",["setCurrentPageNumber","setProgressionStep","setDocsPerPage","setSortDocList","setSortDirectDocList","setSearchQuery"])),Object(s["c"])("popUpMsgs",["setShowMsg"])),Object(s["b"])("documentList",["ajaxGetDocumentList","ajaxGetDataFilters","resetPageNumberDefault"])),Object(s["b"])("popUpMsgs",["runShowMsg"])),Object(s["b"])("overlays",["runShowOverlayPageLockout"])),{},{goBack:function(){this.setShowMsg(!1),this.$router.replace({name:"home"})},pasteSearchData:function(){var t=this;this.updateSearchQuery="",navigator.clipboard.readText().then((function(e){t.updateSearchQuery=e,t.documentSearch()}))},itemsSortDocList:function(){return[{text:this.$t("message.40"),value:this.sortTypes[0]},{text:this.$t("message.29"),value:this.sortTypes[1]},{text:this.$t("message.30"),value:this.sortTypes[2]}]},itemsSortDirectDocList:function(){return[{text:this.$t("message.42"),value:-1},{text:this.$t("message.43"),value:1}]},changeDocsPerPage:function(){var t="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=1&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);document.location.replace(t)},copyLinkNameDoc:function(t){var e=this;navigator.clipboard.writeText(t).then((function(){}),(function(){e.runShowMsg({text:"Clipboard write failed.",status:"error"})}))},copyHashDoc:function(t){var e=this;navigator.clipboard.writeText(t).then((function(){}),(function(){e.runShowMsg({text:"Clipboard write failed.",status:"error"})}))},getDocumentList:function(){var t=this;return this.setShowMsg(!1),this.runShowOverlayPageLockout(!0),this.docsToBeDeleted.length>0&&(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[]),new Promise((function(e,n){t.ajaxGetDocumentList().then((function(){t.runShowOverlayPageLockout(!1),e()})).catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"}),n(e)}))}))},refreshUrlState:function(){var t=this.currentPageNumber;this.setProgressionStep(this.docsPerPage*(t-1)+1),this.$route.query.page=t;var e="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=").concat(t,"&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);history.replaceState(null,null,e)},documentSearch:function(){var t=this;this.blockLoadDocs?setTimeout((function(){t.documentSearch()}),100):(this.resetPageNumberDefault(this.getRequestParams()),this.getDocumentList())},getDocFormUrl:function(t){return"".concat(this.docUrlNoIndex,"/").concat(t)},formattingDate:function(t){var e=new Date(t+"Z"),n=e.toLocaleDateString([this.$i18n.locale,"en"]),r=e.toLocaleTimeString().slice(0,8);return'<span class="cyan--text text--darken-2">'.concat(n,'</span> <span class="orange--text text--darken-2">').concat(r,"</span>")},markAllDocsForDeletion:function(){this.docsToBeDeleted=this.deleteAllDocsFlag?u()(0,this.documents.length-1):[]},checkStatusListSelectedDocsDeleted:function(){this.deleteAllDocsFlag=this.docsToBeDeleted.length===this.documents.length},restartDocList:function(){var t=this.currentPageNumber;if(t>1&&this.pageCount<t){var e="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=").concat(--t,"&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);document.location.replace(e)}},deleteDocs:function(){var t=this;this.setShowMsg(!1),this.runShowOverlayPageLockout(!0);var e=this.$route.params.indexService,n=this.$route.params.indexCollection,r=this.serviceList[e],i=[];this.docsToBeDeleted.forEach((function(e){i.push(t.documents[e].hash)}));var o={model_key:r.collections[n].model_key,doc_hash_list:i};this.axios.post("/admin/delete-many-doc",o).then((function(e){var n=e.data;n.is_authenticated?0===n.msg_err.length?(t.setShowMsg(!1),t.getDocumentList().then((function(){t.restartDocList()}))):(console.log(n.msg_err),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:n.msg_err,status:"error"})):(t.runShowOverlayPageLockout(!1),t.setIsAuthenticated(!1))})).catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"})}))},getRequestParams:function(){var t=this.$route.query.page;t=void 0!==t?parseInt(t):1,Number.isNaN(t)&&this.runShowMsg({text:this.$t("message.36"),status:"error"});var e=this.$route.query.per;e=void 0!==e?parseInt(e):this.docsPerPage,Number.isNaN(e)&&this.runShowMsg({text:this.$t("message.38"),status:"error"});var n=this.$route.query.sort;n=void 0!==n?n:this.sortDocList,this.sortTypes.includes(n)||this.runShowMsg({text:this.$t("message.44"),status:"error"});var r=this.$route.query.direct;return r=void 0!==r?parseInt(r):this.sortDirectDocList,Number.isNaN(r)&&this.runShowMsg({text:this.$t("message.45"),status:"error"}),this.setProgressionStep(e*(t-1)+1),{numPage:t,numPer:e,sortType:n,sortDirect:r}}}),created:function(){var t=this;this.resetPageNumberDefault(this.getRequestParams()),this.blockLoadDocs||this.getDocumentList().then((function(){t.restartDocList(),0===t.dataFilters.length&&t.ajaxGetDataFilters().catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"})}))}))}},p=h,d=(n("ab7d"),n("2877")),f=n("6544"),g=n.n(f),m=n("c6a6"),v=n("8336"),b=n("b0af"),y=n("99d9"),D=n("ac7c"),S=n("62ad"),w=n("a523"),x=n("169a"),$=n("132d"),_=n("2909"),L=(n("d81d"),n("17b3"),n("9d26")),P=n("dc22"),k=n("a9ad"),O=n("de2c"),j=n("7560"),C=n("58df"),N=Object(C["a"])(k["a"],Object(O["a"])({onVisible:["init"]}),j["a"]).extend({name:"v-pagination",directives:{Resize:P["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(o["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var n=e%2===0?1:0,r=Math.floor(e/2),i=this.length-r+1+n;if(this.value>r&&this.value<i){var o=1,s=this.length,a=this.value-r+2,c=this.value+r-2-n,l=a-1===o+1?2:"...",u=c+1===s-1?c+1:"...";return[1,l].concat(Object(_["a"])(this.range(a,c)),[u,this.length])}if(this.value===r){var h=this.value+r-1-n;return[].concat(Object(_["a"])(this.range(1,h)),["...",this.length])}if(this.value===i){var p=this.value-r+1;return[1,"..."].concat(Object(_["a"])(this.range(p,this.length)))}return[].concat(Object(_["a"])(this.range(1,r)),["..."],Object(_["a"])(this.range(i,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var n=[];t=t>0?t:1;for(var r=t;r<=e;r++)n.push(r);return n},genIcon:function(t,e,n,r,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":n},attrs:{disabled:n,type:"button","aria-label":i},on:n?{}:{click:r}},[t(L["a"],[e])])])},genItem:function(t,e){var n=this,r=e===this.value&&(this.color||"primary"),i=e===this.value,o=i?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(r,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":i,"aria-label":this.$vuetify.lang.t(o,e)},on:{click:function(){return n.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(n,r){return t("li",{key:r},[isNaN(Number(n))?t("span",{class:"v-pagination__more"},[n.toString()]):e.genItem(t,n)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}}),T=n("0fd9"),M=n("b974"),F=(n("8b37"),n("80d2")),A=Object(C["a"])(j["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(o["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(F["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),E=n("2fa4"),R=n("8654"),B=n("71d9"),I=n("3a2f"),z=Object(d["a"])(p,r,i,!1,null,null,null);e["default"]=z.exports;g()(z,{VAutocomplete:m["a"],VBtn:v["a"],VCard:b["a"],VCardActions:y["a"],VCardSubtitle:y["b"],VCardText:y["c"],VCardTitle:y["d"],VCheckbox:D["a"],VCol:S["a"],VContainer:w["a"],VDialog:x["a"],VIcon:$["a"],VPagination:N,VRow:T["a"],VSelect:M["a"],VSimpleTable:A,VSpacer:E["a"],VTextField:R["a"],VToolbar:B["a"],VTooltip:I["a"]})},"8b37":function(t,e,n){},ab7d:function(t,e,n){"use strict";n("1219")},d444:function(t,e,n){"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */const r=n("3022"),i=n("fd8e"),o=t=>null!==t&&"object"===typeof t&&!Array.isArray(t),s=t=>e=>!0===t?Number(e):String(e),a=t=>"number"===typeof t||"string"===typeof t&&""!==t,c=t=>Number.isInteger(+t),l=t=>{let e=""+t,n=-1;if("-"===e[0]&&(e=e.slice(1)),"0"===e)return!1;while("0"===e[++n]);return n>0},u=(t,e,n)=>"string"===typeof t||"string"===typeof e||!0===n.stringify,h=(t,e,n)=>{if(e>0){let n="-"===t[0]?"-":"";n&&(t=t.slice(1)),t=n+t.padStart(n?e-1:e,"0")}return!1===n?String(t):t},p=(t,e)=>{let n="-"===t[0]?"-":"";n&&(t=t.slice(1),e--);while(t.length<e)t="0"+t;return n?"-"+t:t},d=(t,e)=>{t.negatives.sort((t,e)=>t<e?-1:t>e?1:0),t.positives.sort((t,e)=>t<e?-1:t>e?1:0);let n,r=e.capture?"":"?:",i="",o="";return t.positives.length&&(i=t.positives.join("|")),t.negatives.length&&(o=`-(${r}${t.negatives.join("|")})`),n=i&&o?`${i}|${o}`:i||o,e.wrap?`(${r}${n})`:n},f=(t,e,n,r)=>{if(n)return i(t,e,{wrap:!1,...r});let o=String.fromCharCode(t);if(t===e)return o;let s=String.fromCharCode(e);return`[${o}-${s}]`},g=(t,e,n)=>{if(Array.isArray(t)){let e=!0===n.wrap,r=n.capture?"":"?:";return e?`(${r}${t.join("|")})`:t.join("|")}return i(t,e,n)},m=(...t)=>new RangeError("Invalid range arguments: "+r.inspect(...t)),v=(t,e,n)=>{if(!0===n.strictRanges)throw m([t,e]);return[]},b=(t,e)=>{if(!0===e.strictRanges)throw new TypeError(`Expected step "${t}" to be a number`);return[]},y=(t,e,n=1,r={})=>{let i=Number(t),o=Number(e);if(!Number.isInteger(i)||!Number.isInteger(o)){if(!0===r.strictRanges)throw m([t,e]);return[]}0===i&&(i=0),0===o&&(o=0);let a=i>o,c=String(t),v=String(e),b=String(n);n=Math.max(Math.abs(n),1);let y=l(c)||l(v)||l(b),D=y?Math.max(c.length,v.length,b.length):0,S=!1===y&&!1===u(t,e,r),w=r.transform||s(S);if(r.toRegex&&1===n)return f(p(t,D),p(e,D),!0,r);let x={negatives:[],positives:[]},$=t=>x[t<0?"negatives":"positives"].push(Math.abs(t)),_=[],L=0;while(a?i>=o:i<=o)!0===r.toRegex&&n>1?$(i):_.push(h(w(i,L),D,S)),i=a?i-n:i+n,L++;return!0===r.toRegex?n>1?d(x,r):g(_,null,{wrap:!1,...r}):_},D=(t,e,n=1,r={})=>{if(!c(t)&&t.length>1||!c(e)&&e.length>1)return v(t,e,r);let i=r.transform||(t=>String.fromCharCode(t)),o=(""+t).charCodeAt(0),s=(""+e).charCodeAt(0),a=o>s,l=Math.min(o,s),u=Math.max(o,s);if(r.toRegex&&1===n)return f(l,u,!1,r);let h=[],p=0;while(a?o>=s:o<=s)h.push(i(o,p)),o=a?o-n:o+n,p++;return!0===r.toRegex?g(h,null,{wrap:!1,options:r}):h},S=(t,e,n,r={})=>{if(null==e&&a(t))return[t];if(!a(t)||!a(e))return v(t,e,r);if("function"===typeof n)return S(t,e,1,{transform:n});if(o(n))return S(t,e,0,n);let i={...r};return!0===i.capture&&(i.wrap=!0),n=n||i.step||1,c(n)?c(t)&&c(e)?y(t,e,n,i):D(t,e,Math.max(Math.abs(n),1),i):null==n||o(n)?S(t,e,1,n):b(n,i)};t.exports=S},d60a:function(t,e){t.exports=function(t){return t&&"object"===typeof t&&"function"===typeof t.copy&&"function"===typeof t.fill&&"function"===typeof t.readUInt8}},eb9e:function(t,e,n){"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */t.exports=function(t){return"number"===typeof t?t-t===0:"string"===typeof t&&""!==t.trim()&&(Number.isFinite?Number.isFinite(+t):isFinite(+t))}},fd8e:function(t,e,n){"use strict";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */const r=n("eb9e"),i=(t,e,n)=>{if(!1===r(t))throw new TypeError("toRegexRange: expected the first argument to be a number");if(void 0===e||t===e)return String(t);if(!1===r(e))throw new TypeError("toRegexRange: expected the second argument to be a number.");let s={relaxZeros:!0,...n};"boolean"===typeof s.strictZeros&&(s.relaxZeros=!1===s.strictZeros);let a=String(s.relaxZeros),l=String(s.shorthand),u=String(s.capture),h=String(s.wrap),p=t+":"+e+"="+a+l+u+h;if(i.cache.hasOwnProperty(p))return i.cache[p].result;let d=Math.min(t,e),f=Math.max(t,e);if(1===Math.abs(d-f)){let n=t+"|"+e;return s.capture?`(${n})`:!1===s.wrap?n:`(?:${n})`}let g=v(t)||v(e),m={min:t,max:e,a:d,b:f},b=[],y=[];if(g&&(m.isPadded=g,m.maxLen=String(m.max).length),d<0){let t=f<0?Math.abs(f):1;y=c(t,Math.abs(d),m,s),d=m.a=0}return f>=0&&(b=c(d,f,m,s)),m.negatives=y,m.positives=b,m.result=o(y,b,s),!0===s.capture?m.result=`(${m.result})`:!1!==s.wrap&&b.length+y.length>1&&(m.result=`(?:${m.result})`),i.cache[p]=m,m.result};function o(t,e,n){let r=l(t,e,"-",!1,n)||[],i=l(e,t,"",!1,n)||[],o=l(t,e,"-?",!0,n)||[],s=r.concat(o).concat(i);return s.join("|")}function s(t,e){let n=1,r=1,i=d(t,n),o=new Set([e]);while(t<=i&&i<=e)o.add(i),n+=1,i=d(t,n);i=f(e+1,r)-1;while(t<i&&i<=e)o.add(i),r+=1,i=f(e+1,r)-1;return o=[...o],o.sort(h),o}function a(t,e,n){if(t===e)return{pattern:t,count:[],digits:0};let r=u(t,e),i=r.length,o="",s=0;for(let a=0;a<i;a++){let[t,e]=r[a];t===e?o+=t:"0"!==t||"9"!==e?o+=m(t,e,n):s++}return s&&(o+=!0===n.shorthand?"\\d":"[0-9]"),{pattern:o,count:[s],digits:i}}function c(t,e,n,r){let i,o=s(t,e),c=[],l=t;for(let s=0;s<o.length;s++){let t=o[s],e=a(String(l),String(t),r),u="";n.isPadded||!i||i.pattern!==e.pattern?(n.isPadded&&(u=b(t,n,r)),e.string=u+e.pattern+g(e.count),c.push(e),l=t+1,i=e):(i.count.length>1&&i.count.pop(),i.count.push(e.count[0]),i.string=i.pattern+g(i.count),l=t+1)}return c}function l(t,e,n,r,i){let o=[];for(let s of t){let{string:t}=s;r||p(e,"string",t)||o.push(n+t),r&&p(e,"string",t)&&o.push(n+t)}return o}function u(t,e){let n=[];for(let r=0;r<t.length;r++)n.push([t[r],e[r]]);return n}function h(t,e){return t>e?1:e>t?-1:0}function p(t,e,n){return t.some(t=>t[e]===n)}function d(t,e){return Number(String(t).slice(0,-e)+"9".repeat(e))}function f(t,e){return t-t%Math.pow(10,e)}function g(t){let[e=0,n=""]=t;return n||e>1?`{${e+(n?","+n:"")}}`:""}function m(t,e,n){return`[${t}${e-t===1?"":"-"}${e}]`}function v(t){return/^-?(0+)\d/.test(t)}function b(t,e,n){if(!e.isPadded)return t;let r=Math.abs(e.maxLen-String(t).length),i=!1!==n.relaxZeros;switch(r){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${r}}`:`0{${r}}`}}i.cache={},i.clearCache=()=>i.cache={},t.exports=i}}]);
//# sourceMappingURL=chunk-fb7b8372-legacy.d6ad9748.js.map