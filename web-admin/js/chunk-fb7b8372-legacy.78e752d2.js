(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fb7b8372"],{1219:function(t,e,r){},"17b3":function(t,e,r){},"28a0":function(t,e){"function"===typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},3022:function(t,e,r){(function(t){var n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},i=/%[sdj%]/g;e.format=function(t){if(!w(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(s(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,o=n.length,a=String(t).replace(i,(function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return t}})),c=n[r];r<o;c=n[++r])y(c)||!L(c)?a+=" "+c:a+=" "+s(c);return a},e.deprecate=function(r,n){if("undefined"!==typeof t&&!0===t.noDeprecation)return r;if("undefined"===typeof t)return function(){return e.deprecate(r,n).apply(this,arguments)};var i=!1;function o(){if(!i){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),i=!0}return r.apply(this,arguments)}return o};var o,a={};function s(t,r){var n={seen:[],stylize:l};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),b(r)?n.showHidden=r:r&&e._extend(n,r),$(n.showHidden)&&(n.showHidden=!1),$(n.depth)&&(n.depth=2),$(n.colors)&&(n.colors=!1),$(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=c),h(n,t,n.depth)}function c(t,e){var r=s.styles[e];return r?"["+s.colors[r][0]+"m"+t+"["+s.colors[r][1]+"m":t}function l(t,e){return t}function u(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}function h(t,r,n){if(t.customInspect&&r&&O(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return w(i)||(i=h(t,i,n)),i}var o=d(t,r);if(o)return o;var a=Object.keys(r),s=u(a);if(t.showHidden&&(a=Object.getOwnPropertyNames(r)),P(r)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return p(r);if(0===a.length){if(O(r)){var c=r.name?": "+r.name:"";return t.stylize("[Function"+c+"]","special")}if(k(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(_(r))return t.stylize(Date.prototype.toString.call(r),"date");if(P(r))return p(r)}var l,b="",y=!1,D=["{","}"];if(v(r)&&(y=!0,D=["[","]"]),O(r)){var S=r.name?": "+r.name:"";b=" [Function"+S+"]"}return k(r)&&(b=" "+RegExp.prototype.toString.call(r)),_(r)&&(b=" "+Date.prototype.toUTCString.call(r)),P(r)&&(b=" "+p(r)),0!==a.length||y&&0!=r.length?n<0?k(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),l=y?f(t,r,n,s,a):a.map((function(e){return g(t,r,n,s,e,y)})),t.seen.pop(),m(l,b,D)):D[0]+b+D[1]}function d(t,e){if($(e))return t.stylize("undefined","undefined");if(w(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return S(e)?t.stylize(""+e,"number"):b(e)?t.stylize(""+e,"boolean"):y(e)?t.stylize("null","null"):void 0}function p(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,r,n,i){for(var o=[],a=0,s=e.length;a<s;++a)F(e,String(a))?o.push(g(t,e,r,n,String(a),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(g(t,e,r,n,i,!0))})),o}function g(t,e,r,n,i,o){var a,s,c;if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?s=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(s=t.stylize("[Setter]","special")),F(n,i)||(a="["+i+"]"),s||(t.seen.indexOf(c.value)<0?(s=y(r)?h(t,c.value,null):h(t,c.value,r-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+s.split("\n").map((function(t){return"   "+t})).join("\n"))):s=t.stylize("[Circular]","special")),$(a)){if(o&&i.match(/^\d+$/))return s;a=JSON.stringify(""+i),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+s}function m(t,e,r){var n=t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return n>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}function v(t){return Array.isArray(t)}function b(t){return"boolean"===typeof t}function y(t){return null===t}function D(t){return null==t}function S(t){return"number"===typeof t}function w(t){return"string"===typeof t}function x(t){return"symbol"===typeof t}function $(t){return void 0===t}function k(t){return L(t)&&"[object RegExp]"===C(t)}function L(t){return"object"===typeof t&&null!==t}function _(t){return L(t)&&"[object Date]"===C(t)}function P(t){return L(t)&&("[object Error]"===C(t)||t instanceof Error)}function O(t){return"function"===typeof t}function j(t){return null===t||"boolean"===typeof t||"number"===typeof t||"string"===typeof t||"symbol"===typeof t||"undefined"===typeof t}function C(t){return Object.prototype.toString.call(t)}function N(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if($(o)&&(o=Object({NODE_ENV:"production",BASE_URL:"/admin/contrib/"}).NODE_DEBUG||""),r=r.toUpperCase(),!a[r])if(new RegExp("\\b"+r+"\\b","i").test(o)){var n=t.pid;a[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else a[r]=function(){};return a[r]},e.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=v,e.isBoolean=b,e.isNull=y,e.isNullOrUndefined=D,e.isNumber=S,e.isString=w,e.isSymbol=x,e.isUndefined=$,e.isRegExp=k,e.isObject=L,e.isDate=_,e.isError=P,e.isFunction=O,e.isPrimitive=j,e.isBuffer=r("d60a");var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function M(){var t=new Date,e=[N(t.getHours()),N(t.getMinutes()),N(t.getSeconds())].join(":");return[t.getDate(),T[t.getMonth()],e].join(" ")}function F(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",M(),e.format.apply(e,arguments))},e.inherits=r("28a0"),e._extend=function(t,e){if(!e||!L(e))return t;var r=Object.keys(e),n=r.length;while(n--)t[r[n]]=e[r[n]];return t};var A="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function E(t,e){if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}function I(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var i=r.pop();if("function"!==typeof i)throw new TypeError("The last argument must be of type Function");var o=this,a=function(){return i.apply(o,arguments)};e.apply(this,r).then((function(e){t.nextTick(a,null,e)}),(function(e){t.nextTick(E,e,a)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,n(e)),r}e.promisify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');if(A&&t[A]){var e=t[A];if("function"!==typeof e)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise((function(t,n){e=t,r=n})),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push((function(t,n){t?r(t):e(n)}));try{t.apply(this,i)}catch(a){r(a)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),A&&Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,n(t))},e.promisify.custom=A,e.callbackify=I}).call(this,r("4362"))},"898f":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.serviceList.length>0?r("v-container",{attrs:{fluid:""}},[r("v-card",{staticClass:"mt-1"},[r("v-toolbar",{attrs:{dense:"",flat:""}},[r("v-btn",{attrs:{icon:""},on:{click:t.goBack}},[r("v-icon",[t._v("mdi-arrow-left")])],1)],1),r("v-card-title",{staticClass:"pt-0"},[t._v(t._s(t.collectionTitle))]),r("v-card-subtitle",[t._v(t._s(t.breadcrumbs))]),r("v-card-text",{staticClass:"pt-4"},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"6"}},[r("div",{staticClass:"max-w-400"},[r("v-text-field",{staticClass:"shrink",attrs:{dense:"",clearable:"","hide-details":"",placeholder:t.$t("message.3"),"append-icon":"mdi-magnify"},on:{input:function(e){return t.documentSearch()}},scopedSlots:t._u([{key:"append-outer",fn:function(){return[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[r("v-btn",t._g(t._b({staticStyle:{"margin-top":"-10px"},attrs:{fab:"",dark:"",small:"",depressed:"",color:"green darken-2"},on:{click:function(e){return t.pasteSearchData()}}},"v-btn",i,!1),n),[r("v-icon",[t._v("mdi-content-paste")])],1)]}}],null,!1,369154145)},[r("span",[t._v(t._s(t.$t("message.71")))])])]},proxy:!0}],null,!1,3880759469),model:{value:t.updateSearchQuery,callback:function(e){t.updateSearchQuery=e},expression:"updateSearchQuery"}})],1)]),r("v-col",{staticClass:"text-md-right",attrs:{cols:"12",md:"6"}},[r("v-btn",{attrs:{dark:"",depressed:"",color:"green darken-2",to:t.docUrlNoIndex+"/new"}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-file-plus-outline")]),r("span",[t._v(t._s(t.$t("message.25")))])],1)],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[t.docsToBeDeleted.length>0?r("v-btn",{attrs:{dark:"",depressed:"",color:"red darken-2"},on:{click:function(e){return t.deleteDocs()}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-delete")]),r("span",[t._v(t._s(t.$t("message.4")))])],1):t._e()],1)],1),r("v-row",[r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("div",{staticClass:"w-260"},[r("v-select",{attrs:{items:t.itemsSortDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDocList,callback:function(e){t.updateSortDocList=e},expression:"updateSortDocList"}})],1)]),r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("div",{staticClass:"w-180"},[r("v-select",{attrs:{items:t.itemsSortDirectDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDirectDocList,callback:function(e){t.updateSortDirectDocList=e},expression:"updateSortDirectDocList"}})],1)]),r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("v-btn",{attrs:{dark:"",small:"",depressed:"",color:"blue darken-2",disabled:0===t.dataFilters.length},on:{click:function(e){t.showFilterDoc=!0}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-filter")]),r("span",[t._v(t._s(t.$t("message.64")))])],1)],1)],1),r("v-simple-table",{staticClass:"mt-4",attrs:{"fixed-header":""},scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",{staticClass:"document-list",style:t.$vuetify.theme.dark?"background: #1d1f34;":"background: #f5f6fb;"},[r("tr",[r("th",{staticStyle:{"text-align":"left !important"},attrs:{align:"left"}},[t._v(" № ")]),r("th",{attrs:{align:"center"}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",color:"red darken-2",disabled:0===t.documents.length},on:{change:function(e){return t.markAllDocsForDeletion()}},model:{value:t.deleteAllDocsFlag,callback:function(e){t.deleteAllDocsFlag=e},expression:"deleteAllDocsFlag"}})],1),t._l(t.fields,(function(e,n){return r("th",{key:"header-"+n,attrs:{align:"center"}},[t._v(" "+t._s(e.title)+" ")])})),r("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.29")))]),r("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.30")))]),r("th",{attrs:{align:"center"}},[t._v("ID")])],2)]),r("tbody",{staticClass:"document-list"},t._l(t.documents,(function(e,n){return r("tr",{key:"doc-"+n},[r("td",{staticClass:"pr-0",staticStyle:{"text-align":"left !important"},attrs:{width:"76",align:"left"}},[t._v(" "+t._s(n+t.progressionStep)+" ")]),r("td",{staticClass:"pr-0",attrs:{width:"76",align:"center"}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",value:n,color:"red darken-2"},on:{change:function(e){return t.checkStatusListSelectedDocsDeleted()}},model:{value:t.docsToBeDeleted,callback:function(e){t.docsToBeDeleted=e},expression:"docsToBeDeleted"}})],1),t._l(t.fields,(function(i,o){return[r("td",{key:o,attrs:{align:"center"}},[0===o?[r("table",[r("tr",[r("td",[r("span",[r("v-btn",t._g(t._b({staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",depressed:"",color:"green darken-2"},on:{click:function(r){return t.copyLinkNameDoc(e[i.field])}}},"v-btn",t.attrs,!1),t.on),[r("v-icon",[t._v("mdi-content-copy")])],1)],1)]),r("td",[r("span",[r("router-link",{attrs:{to:t.getDocFormUrl(n)}},[t._v(t._s(e[i.field]))])],1)])])])]:r("span",{domProps:{innerHTML:t._s(e[i.field])}})],2)]})),r("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.created_at))}}),r("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.updated_at))}}),r("td",{attrs:{align:"center"}},[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var i=n.on,o=n.attrs;return[r("v-btn",t._g(t._b({attrs:{fab:"",dark:"",small:"",depressed:"",color:"green darken-2"},on:{click:function(r){return t.copyHashDoc(e.hash)}}},"v-btn",o,!1),i),[r("v-icon",[t._v("mdi-content-copy")])],1)]}}],null,!0)},[r("span",[t._v(t._s(e.hash))])])],1)],2)})),0)]},proxy:!0}],null,!1,3158335188)})],1),r("v-card-actions",[r("v-row",[r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("div",{staticClass:"w-80 block-center"},[r("v-select",{attrs:{items:t.countPerPage,"hide-details":"",dense:""},on:{change:function(e){return t.changeDocsPerPage()}},model:{value:t.updateDocsPerPage,callback:function(e){t.updateDocsPerPage=e},expression:"updateDocsPerPage"}})],1)]),r("v-col",{attrs:{cols:"12 pb-4"}},[t.blockPagination?t._e():r("v-pagination",{attrs:{circle:"",length:t.pageCount,"total-visible":5},on:{input:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateCurrentPageNumber,callback:function(e){t.updateCurrentPageNumber=e},expression:"updateCurrentPageNumber"}})],1)],1)],1)],1),r("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.showFilterDoc,callback:function(e){t.showFilterDoc=e},expression:"showFilterDoc"}},[r("v-card",[r("v-card-actions",{staticClass:"pr-3 pt-2 pb-0"},[r("v-spacer"),r("v-btn",{attrs:{icon:"",small:"",color:"red"},on:{click:function(e){t.showFilterDoc=!1}}},[r("v-icon",[t._v("mdi-close")])],1)],1),r("v-card-title",{staticClass:"pt-0 pb-6"},[t._v(t._s(t.$t("message.65")))]),r("v-card-text",[r("v-row",{attrs:{justify:"center"}},t._l(t.dataFilters,(function(e,n){return r("v-col",{key:"filter-"+n,staticClass:"mb-4",attrs:{cols:"12"}},[r("v-autocomplete",{staticClass:"shrink",attrs:{dense:"",chips:e.multiple,"deletable-chips":e.multiple,"small-chips":e.multiple,clearable:"","hide-details":"","item-text":"title","item-value":"value",label:e.label,multiple:e.multiple,items:e.items},on:{input:function(e){return t.getDocumentList()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var i=n.on;return[r("v-btn",{attrs:{fab:"",dark:"",small:"",depressed:"",color:e.negation?"blue darken-2":"red darken-2"},on:{click:function(r){e.negation=!e.negation,t.getDocumentList()}}},[r("v-icon",t._g({},i),[t._v(t._s(e.negation?"mdi-minus":"mdi-plus"))])],1)]}}],null,!0)},[t._v(" "+t._s(t.$t("message.69"))+" ")])]},proxy:!0}],null,!0),model:{value:t.selectDataFilters[e.field],callback:function(r){t.$set(t.selectDataFilters,e.field,r)},expression:"selectDataFilters[filter.field]"}})],1)})),1)],1)],1)],1)],1):t._e()},i=[],o=r("5530"),a=(r("498a"),r("99af"),r("d3b7"),r("25f0"),r("ac1f"),r("5319"),r("fb6a"),r("159b"),r("9129"),r("a9e3"),r("4e82"),r("caad"),r("2532"),r("2f62")),s=r("d3bd"),c=r.n(s),l=r("d444"),u=r.n(l),h={name:"DocumentList",data:function(){return{deleteAllDocsFlag:!1,docsToBeDeleted:[],countPerPage:[10,20,30,40,50,60,70,80,90,100],showFilterDoc:!1}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(a["d"])(["serviceList","btnRed","btnLightBlue","btnGreen"])),Object(a["d"])("documentList",["documents","currentPageNumber","pageCount","progressionStep","docsPerPage","sortDocList","sortDirectDocList","sortTypes","searchQuery","dataFilters","selectDataFilters","blockPagination","blockLoadDocs"])),{},{updateCurrentPageNumber:{get:function(){return this.currentPageNumber},set:function(t){this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[],this.setCurrentPageNumber(t)}},updateSearchQuery:{get:function(){return this.searchQuery},set:function(t){this.setSearchQuery(t?t.trim():t)}},updateDocsPerPage:{get:function(){return this.docsPerPage},set:function(t){this.setDocsPerPage(t)}},updateSortDocList:{get:function(){return this.sortDocList},set:function(t){this.setSortDocList(t)}},updateSortDirectDocList:{get:function(){return this.sortDirectDocList},set:function(t){this.setSortDirectDocList(t)}},collectionTitle:function(){var t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].title},breadcrumbs:function(){var t=this.$route.params.indexService,e=this.serviceList[t].service.title;return"".concat(e," > ").concat(this.collectionTitle)},docUrlNoIndex:function(){var t=this.$i18n.locale,e=this.$route.params.indexService,r=this.$route.params.indexCollection,n=this.serviceList[e],i=c()(n.service.title,{locale:t}),o=c()(this.collectionTitle,{locale:t});return"/".concat(i,"/").concat(e,"/").concat(o,"/").concat(r,"/document")},fields:function(){var t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].fields}}),watch:{blockLoadDocs:function(t){t||(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[])}},filters:{upperCase:function(t){return t?(t=t.toString(),t.toUpperCase()):""}},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(a["c"])("documentList",["setCurrentPageNumber","setProgressionStep","setDocsPerPage","setSortDocList","setSortDirectDocList","setSearchQuery"])),Object(a["c"])("popUpMsgs",["setShowMsg"])),Object(a["b"])("documentList",["ajaxGetDocumentList","ajaxGetDataFilters","resetPageNumberDefault"])),Object(a["b"])("popUpMsgs",["runShowMsg"])),Object(a["b"])("overlays",["runShowOverlayPageLockout"])),{},{goBack:function(){this.setShowMsg(!1),this.$router.replace({name:"home"})},pasteSearchData:function(){var t=this;this.updateSearchQuery="",navigator.clipboard.readText().then((function(e){t.updateSearchQuery=e,t.documentSearch()}))},itemsSortDocList:function(){return[{text:this.$t("message.40"),value:this.sortTypes[0]},{text:this.$t("message.29"),value:this.sortTypes[1]},{text:this.$t("message.30"),value:this.sortTypes[2]}]},itemsSortDirectDocList:function(){return[{text:this.$t("message.42"),value:-1},{text:this.$t("message.43"),value:1}]},changeDocsPerPage:function(){var t="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=1&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);document.location.replace(t)},copyLinkNameDoc:function(t){var e=this;navigator.clipboard.writeText(t).then((function(){}),(function(){e.runShowMsg({text:"Clipboard write failed.",status:"error"})}))},copyHashDoc:function(t){var e=this;navigator.clipboard.writeText(t).then((function(){}),(function(){e.runShowMsg({text:"Clipboard write failed.",status:"error"})}))},getDocumentList:function(){var t=this;return this.setShowMsg(!1),this.runShowOverlayPageLockout(!0),this.docsToBeDeleted.length>0&&(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[]),new Promise((function(e,r){t.ajaxGetDocumentList().then((function(){t.runShowOverlayPageLockout(!1),e()})).catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"}),r(e)}))}))},refreshUrlState:function(){var t=this.currentPageNumber;this.setProgressionStep(this.docsPerPage*(t-1)+1),this.$route.query.page=t;var e="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=").concat(t,"&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);history.replaceState(null,null,e)},documentSearch:function(){var t=this;this.blockLoadDocs?setTimeout((function(){t.documentSearch()}),100):(this.resetPageNumberDefault(this.getRequestParams()),this.getDocumentList())},getDocFormUrl:function(t){return"".concat(this.docUrlNoIndex,"/").concat(t)},formattingDate:function(t){var e=new Date(t+"Z"),r=e.toLocaleDateString([this.$i18n.locale,"en"]),n=e.toLocaleTimeString().slice(0,8);return'<span class="cyan--text text--darken-2">'.concat(r,'</span> <span class="orange--text text--darken-2">').concat(n,"</span>")},markAllDocsForDeletion:function(){this.docsToBeDeleted=this.deleteAllDocsFlag?u()(0,this.documents.length-1):[]},checkStatusListSelectedDocsDeleted:function(){this.deleteAllDocsFlag=this.docsToBeDeleted.length===this.documents.length},restartDocList:function(){var t=this.currentPageNumber;if(t>1&&this.pageCount<t){var e="".concat(window.location.protocol,"//").concat(window.location.host,"/admin").concat(this.$route.path,"?per=").concat(this.docsPerPage,"&page=").concat(--t,"&sort=").concat(this.sortDocList,"&direct=").concat(this.sortDirectDocList);document.location.replace(e)}},deleteDocs:function(){var t=this;this.setShowMsg(!1),this.runShowOverlayPageLockout(!0);var e=this.$route.params.indexService,r=this.$route.params.indexCollection,n=this.serviceList[e],i=[];this.docsToBeDeleted.forEach((function(e){i.push(t.documents[e].hash)}));var o={model_key:n.collections[r].model_key,doc_hash_list:i};this.axios.post("/admin/delete-many-doc",o).then((function(e){var r=e.data;r.is_authenticated?0===r.msg_err.length?(t.setShowMsg(!1),t.getDocumentList().then((function(){t.restartDocList()}))):(console.log(r.msg_err),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:r.msg_err,status:"error"})):(t.runShowOverlayPageLockout(!1),t.setIsAuthenticated(!1))})).catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"})}))},getRequestParams:function(){var t=this.$route.query.page;t=void 0!==t?parseInt(t):1,Number.isNaN(t)&&this.runShowMsg({text:this.$t("message.36"),status:"error"});var e=this.$route.query.per;e=void 0!==e?parseInt(e):this.docsPerPage,Number.isNaN(e)&&this.runShowMsg({text:this.$t("message.38"),status:"error"});var r=this.$route.query.sort;r=void 0!==r?r:this.sortDocList,this.sortTypes.includes(r)||this.runShowMsg({text:this.$t("message.44"),status:"error"});var n=this.$route.query.direct;return n=void 0!==n?parseInt(n):this.sortDirectDocList,Number.isNaN(n)&&this.runShowMsg({text:this.$t("message.45"),status:"error"}),this.setProgressionStep(e*(t-1)+1),{numPage:t,numPer:e,sortType:r,sortDirect:n}}}),created:function(){var t=this;this.resetPageNumberDefault(this.getRequestParams()),this.blockLoadDocs||this.getDocumentList().then((function(){t.restartDocList(),0===t.dataFilters.length&&t.ajaxGetDataFilters().catch((function(e){console.log(e),t.runShowOverlayPageLockout(!1),t.runShowMsg({text:e,status:"error"})}))}))}},d=h,p=(r("ab7d"),r("2877")),f=r("6544"),g=r.n(f),m=r("c6a6"),v=r("8336"),b=r("b0af"),y=r("99d9"),D=r("ac7c"),S=r("62ad"),w=r("a523"),x=r("169a"),$=r("132d"),k=r("2909"),L=(r("d81d"),r("17b3"),r("9d26")),_=r("dc22"),P=r("a9ad"),O=r("de2c"),j=r("7560"),C=r("58df"),N=Object(C["a"])(P["a"],Object(O["a"])({onVisible:["init"]}),j["a"]).extend({name:"v-pagination",directives:{Resize:_["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(o["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var r=e%2===0?1:0,n=Math.floor(e/2),i=this.length-n+1+r;if(this.value>n&&this.value<i){var o=1,a=this.length,s=this.value-n+2,c=this.value+n-2-r,l=s-1===o+1?2:"...",u=c+1===a-1?c+1:"...";return[1,l].concat(Object(k["a"])(this.range(s,c)),[u,this.length])}if(this.value===n){var h=this.value+n-1-r;return[].concat(Object(k["a"])(this.range(1,h)),["...",this.length])}if(this.value===i){var d=this.value-n+1;return[1,"..."].concat(Object(k["a"])(this.range(d,this.length)))}return[].concat(Object(k["a"])(this.range(1,n)),["..."],Object(k["a"])(this.range(i,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var r=[];t=t>0?t:1;for(var n=t;n<=e;n++)r.push(n);return r},genIcon:function(t,e,r,n,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":r},attrs:{disabled:r,type:"button","aria-label":i},on:r?{}:{click:n}},[t(L["a"],[e])])])},genItem:function(t,e){var r=this,n=e===this.value&&(this.color||"primary"),i=e===this.value,o=i?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(n,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":i,"aria-label":this.$vuetify.lang.t(o,e)},on:{click:function(){return r.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(r,n){return t("li",{key:n},[isNaN(Number(r))?t("span",{class:"v-pagination__more"},[r.toString()]):e.genItem(t,r)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}}),T=r("0fd9"),M=r("b974"),F=(r("8b37"),r("80d2")),A=Object(C["a"])(j["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(o["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(F["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),E=r("2fa4"),I=r("8654"),R=r("71d9"),B=r("3a2f"),z=Object(p["a"])(d,n,i,!1,null,null,null);e["default"]=z.exports;g()(z,{VAutocomplete:m["a"],VBtn:v["a"],VCard:b["a"],VCardActions:y["a"],VCardSubtitle:y["b"],VCardText:y["c"],VCardTitle:y["d"],VCheckbox:D["a"],VCol:S["a"],VContainer:w["a"],VDialog:x["a"],VIcon:$["a"],VPagination:N,VRow:T["a"],VSelect:M["a"],VSimpleTable:A,VSpacer:E["a"],VTextField:I["a"],VToolbar:R["a"],VTooltip:B["a"]})},"8b37":function(t,e,r){},ab7d:function(t,e,r){"use strict";r("1219")},d444:function(t,e,r){"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */const n=r("3022"),i=r("fd8e"),o=t=>null!==t&&"object"===typeof t&&!Array.isArray(t),a=t=>e=>!0===t?Number(e):String(e),s=t=>"number"===typeof t||"string"===typeof t&&""!==t,c=t=>Number.isInteger(+t),l=t=>{let e=""+t,r=-1;if("-"===e[0]&&(e=e.slice(1)),"0"===e)return!1;while("0"===e[++r]);return r>0},u=(t,e,r)=>"string"===typeof t||"string"===typeof e||!0===r.stringify,h=(t,e,r)=>{if(e>0){let r="-"===t[0]?"-":"";r&&(t=t.slice(1)),t=r+t.padStart(r?e-1:e,"0")}return!1===r?String(t):t},d=(t,e)=>{let r="-"===t[0]?"-":"";r&&(t=t.slice(1),e--);while(t.length<e)t="0"+t;return r?"-"+t:t},p=(t,e)=>{t.negatives.sort((t,e)=>t<e?-1:t>e?1:0),t.positives.sort((t,e)=>t<e?-1:t>e?1:0);let r,n=e.capture?"":"?:",i="",o="";return t.positives.length&&(i=t.positives.join("|")),t.negatives.length&&(o=`-(${n}${t.negatives.join("|")})`),r=i&&o?`${i}|${o}`:i||o,e.wrap?`(${n}${r})`:r},f=(t,e,r,n)=>{if(r)return i(t,e,{wrap:!1,...n});let o=String.fromCharCode(t);if(t===e)return o;let a=String.fromCharCode(e);return`[${o}-${a}]`},g=(t,e,r)=>{if(Array.isArray(t)){let e=!0===r.wrap,n=r.capture?"":"?:";return e?`(${n}${t.join("|")})`:t.join("|")}return i(t,e,r)},m=(...t)=>new RangeError("Invalid range arguments: "+n.inspect(...t)),v=(t,e,r)=>{if(!0===r.strictRanges)throw m([t,e]);return[]},b=(t,e)=>{if(!0===e.strictRanges)throw new TypeError(`Expected step "${t}" to be a number`);return[]},y=(t,e,r=1,n={})=>{let i=Number(t),o=Number(e);if(!Number.isInteger(i)||!Number.isInteger(o)){if(!0===n.strictRanges)throw m([t,e]);return[]}0===i&&(i=0),0===o&&(o=0);let s=i>o,c=String(t),v=String(e),b=String(r);r=Math.max(Math.abs(r),1);let y=l(c)||l(v)||l(b),D=y?Math.max(c.length,v.length,b.length):0,S=!1===y&&!1===u(t,e,n),w=n.transform||a(S);if(n.toRegex&&1===r)return f(d(t,D),d(e,D),!0,n);let x={negatives:[],positives:[]},$=t=>x[t<0?"negatives":"positives"].push(Math.abs(t)),k=[],L=0;while(s?i>=o:i<=o)!0===n.toRegex&&r>1?$(i):k.push(h(w(i,L),D,S)),i=s?i-r:i+r,L++;return!0===n.toRegex?r>1?p(x,n):g(k,null,{wrap:!1,...n}):k},D=(t,e,r=1,n={})=>{if(!c(t)&&t.length>1||!c(e)&&e.length>1)return v(t,e,n);let i=n.transform||(t=>String.fromCharCode(t)),o=(""+t).charCodeAt(0),a=(""+e).charCodeAt(0),s=o>a,l=Math.min(o,a),u=Math.max(o,a);if(n.toRegex&&1===r)return f(l,u,!1,n);let h=[],d=0;while(s?o>=a:o<=a)h.push(i(o,d)),o=s?o-r:o+r,d++;return!0===n.toRegex?g(h,null,{wrap:!1,options:n}):h},S=(t,e,r,n={})=>{if(null==e&&s(t))return[t];if(!s(t)||!s(e))return v(t,e,n);if("function"===typeof r)return S(t,e,1,{transform:r});if(o(r))return S(t,e,0,r);let i={...n};return!0===i.capture&&(i.wrap=!0),r=r||i.step||1,c(r)?c(t)&&c(e)?y(t,e,r,i):D(t,e,Math.max(Math.abs(r),1),i):null==r||o(r)?S(t,e,1,r):b(r,i)};t.exports=S},d60a:function(t,e){t.exports=function(t){return t&&"object"===typeof t&&"function"===typeof t.copy&&"function"===typeof t.fill&&"function"===typeof t.readUInt8}},eb9e:function(t,e,r){"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */t.exports=function(t){return"number"===typeof t?t-t===0:"string"===typeof t&&""!==t.trim()&&(Number.isFinite?Number.isFinite(+t):isFinite(+t))}},fd8e:function(t,e,r){"use strict";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */const n=r("eb9e"),i=(t,e,r)=>{if(!1===n(t))throw new TypeError("toRegexRange: expected the first argument to be a number");if(void 0===e||t===e)return String(t);if(!1===n(e))throw new TypeError("toRegexRange: expected the second argument to be a number.");let a={relaxZeros:!0,...r};"boolean"===typeof a.strictZeros&&(a.relaxZeros=!1===a.strictZeros);let s=String(a.relaxZeros),l=String(a.shorthand),u=String(a.capture),h=String(a.wrap),d=t+":"+e+"="+s+l+u+h;if(i.cache.hasOwnProperty(d))return i.cache[d].result;let p=Math.min(t,e),f=Math.max(t,e);if(1===Math.abs(p-f)){let r=t+"|"+e;return a.capture?`(${r})`:!1===a.wrap?r:`(?:${r})`}let g=v(t)||v(e),m={min:t,max:e,a:p,b:f},b=[],y=[];if(g&&(m.isPadded=g,m.maxLen=String(m.max).length),p<0){let t=f<0?Math.abs(f):1;y=c(t,Math.abs(p),m,a),p=m.a=0}return f>=0&&(b=c(p,f,m,a)),m.negatives=y,m.positives=b,m.result=o(y,b,a),!0===a.capture?m.result=`(${m.result})`:!1!==a.wrap&&b.length+y.length>1&&(m.result=`(?:${m.result})`),i.cache[d]=m,m.result};function o(t,e,r){let n=l(t,e,"-",!1,r)||[],i=l(e,t,"",!1,r)||[],o=l(t,e,"-?",!0,r)||[],a=n.concat(o).concat(i);return a.join("|")}function a(t,e){let r=1,n=1,i=p(t,r),o=new Set([e]);while(t<=i&&i<=e)o.add(i),r+=1,i=p(t,r);i=f(e+1,n)-1;while(t<i&&i<=e)o.add(i),n+=1,i=f(e+1,n)-1;return o=[...o],o.sort(h),o}function s(t,e,r){if(t===e)return{pattern:t,count:[],digits:0};let n=u(t,e),i=n.length,o="",a=0;for(let s=0;s<i;s++){let[t,e]=n[s];t===e?o+=t:"0"!==t||"9"!==e?o+=m(t,e,r):a++}return a&&(o+=!0===r.shorthand?"\\d":"[0-9]"),{pattern:o,count:[a],digits:i}}function c(t,e,r,n){let i,o=a(t,e),c=[],l=t;for(let a=0;a<o.length;a++){let t=o[a],e=s(String(l),String(t),n),u="";r.isPadded||!i||i.pattern!==e.pattern?(r.isPadded&&(u=b(t,r,n)),e.string=u+e.pattern+g(e.count),c.push(e),l=t+1,i=e):(i.count.length>1&&i.count.pop(),i.count.push(e.count[0]),i.string=i.pattern+g(i.count),l=t+1)}return c}function l(t,e,r,n,i){let o=[];for(let a of t){let{string:t}=a;n||d(e,"string",t)||o.push(r+t),n&&d(e,"string",t)&&o.push(r+t)}return o}function u(t,e){let r=[];for(let n=0;n<t.length;n++)r.push([t[n],e[n]]);return r}function h(t,e){return t>e?1:e>t?-1:0}function d(t,e,r){return t.some(t=>t[e]===r)}function p(t,e){return Number(String(t).slice(0,-e)+"9".repeat(e))}function f(t,e){return t-t%Math.pow(10,e)}function g(t){let[e=0,r=""]=t;return r||e>1?`{${e+(r?","+r:"")}}`:""}function m(t,e,r){return`[${t}${e-t===1?"":"-"}${e}]`}function v(t){return/^-?(0+)\d/.test(t)}function b(t,e,r){if(!e.isPadded)return t;let n=Math.abs(e.maxLen-String(t).length),i=!1!==r.relaxZeros;switch(n){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${n}}`:`0{${n}}`}}i.cache={},i.clearCache=()=>i.cache={},t.exports=i}}]);
//# sourceMappingURL=chunk-fb7b8372-legacy.78e752d2.js.map