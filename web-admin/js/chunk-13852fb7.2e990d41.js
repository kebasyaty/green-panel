(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13852fb7"],{1219:function(t,e,r){},"17b3":function(t,e,r){},"28a0":function(t,e){"function"===typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},3022:function(t,e,r){(function(t){var n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},s=/%[sdj%]/g;e.format=function(t){if(!w(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(a(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,i=n.length,o=String(t).replace(s,(function(t){if("%%"===t)return"%";if(r>=i)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return t}})),c=n[r];r<i;c=n[++r])y(c)||!L(c)?o+=" "+c:o+=" "+a(c);return o},e.deprecate=function(r,n){if("undefined"!==typeof t&&!0===t.noDeprecation)return r;if("undefined"===typeof t)return function(){return e.deprecate(r,n).apply(this,arguments)};var s=!1;function i(){if(!s){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),s=!0}return r.apply(this,arguments)}return i};var i,o={};function a(t,r){var n={seen:[],stylize:l};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),v(r)?n.showHidden=r:r&&e._extend(n,r),$(n.showHidden)&&(n.showHidden=!1),$(n.depth)&&(n.depth=2),$(n.colors)&&(n.colors=!1),$(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=c),h(n,t,n.depth)}function c(t,e){var r=a.styles[e];return r?"["+a.colors[r][0]+"m"+t+"["+a.colors[r][1]+"m":t}function l(t,e){return t}function u(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}function h(t,r,n){if(t.customInspect&&r&&C(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var s=r.inspect(n,t);return w(s)||(s=h(t,s,n)),s}var i=p(t,r);if(i)return i;var o=Object.keys(r),a=u(o);if(t.showHidden&&(o=Object.getOwnPropertyNames(r)),k(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return d(r);if(0===o.length){if(C(r)){var c=r.name?": "+r.name:"";return t.stylize("[Function"+c+"]","special")}if(_(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(P(r))return t.stylize(Date.prototype.toString.call(r),"date");if(k(r))return d(r)}var l,v="",y=!1,D=["{","}"];if(b(r)&&(y=!0,D=["[","]"]),C(r)){var S=r.name?": "+r.name:"";v=" [Function"+S+"]"}return _(r)&&(v=" "+RegExp.prototype.toString.call(r)),P(r)&&(v=" "+Date.prototype.toUTCString.call(r)),k(r)&&(v=" "+d(r)),0!==o.length||y&&0!=r.length?n<0?_(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),l=y?g(t,r,n,a,o):o.map((function(e){return f(t,r,n,a,e,y)})),t.seen.pop(),m(l,v,D)):D[0]+v+D[1]}function p(t,e){if($(e))return t.stylize("undefined","undefined");if(w(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return S(e)?t.stylize(""+e,"number"):v(e)?t.stylize(""+e,"boolean"):y(e)?t.stylize("null","null"):void 0}function d(t){return"["+Error.prototype.toString.call(t)+"]"}function g(t,e,r,n,s){for(var i=[],o=0,a=e.length;o<a;++o)F(e,String(o))?i.push(f(t,e,r,n,String(o),!0)):i.push("");return s.forEach((function(s){s.match(/^\d+$/)||i.push(f(t,e,r,n,s,!0))})),i}function f(t,e,r,n,s,i){var o,a,c;if(c=Object.getOwnPropertyDescriptor(e,s)||{value:e[s]},c.get?a=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(a=t.stylize("[Setter]","special")),F(n,s)||(o="["+s+"]"),a||(t.seen.indexOf(c.value)<0?(a=y(r)?h(t,c.value,null):h(t,c.value,r-1),a.indexOf("\n")>-1&&(a=i?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n"))):a=t.stylize("[Circular]","special")),$(o)){if(i&&s.match(/^\d+$/))return a;o=JSON.stringify(""+s),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=t.stylize(o,"string"))}return o+": "+a}function m(t,e,r){var n=t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return n>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}function b(t){return Array.isArray(t)}function v(t){return"boolean"===typeof t}function y(t){return null===t}function D(t){return null==t}function S(t){return"number"===typeof t}function w(t){return"string"===typeof t}function x(t){return"symbol"===typeof t}function $(t){return void 0===t}function _(t){return L(t)&&"[object RegExp]"===j(t)}function L(t){return"object"===typeof t&&null!==t}function P(t){return L(t)&&"[object Date]"===j(t)}function k(t){return L(t)&&("[object Error]"===j(t)||t instanceof Error)}function C(t){return"function"===typeof t}function O(t){return null===t||"boolean"===typeof t||"number"===typeof t||"string"===typeof t||"symbol"===typeof t||"undefined"===typeof t}function j(t){return Object.prototype.toString.call(t)}function N(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if($(i)&&(i=Object({NODE_ENV:"production",BASE_URL:"/admin/contrib/"}).NODE_DEBUG||""),r=r.toUpperCase(),!o[r])if(new RegExp("\\b"+r+"\\b","i").test(i)){var n=t.pid;o[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else o[r]=function(){};return o[r]},e.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=b,e.isBoolean=v,e.isNull=y,e.isNullOrUndefined=D,e.isNumber=S,e.isString=w,e.isSymbol=x,e.isUndefined=$,e.isRegExp=_,e.isObject=L,e.isDate=P,e.isError=k,e.isFunction=C,e.isPrimitive=O,e.isBuffer=r("d60a");var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function M(){var t=new Date,e=[N(t.getHours()),N(t.getMinutes()),N(t.getSeconds())].join(":");return[t.getDate(),T[t.getMonth()],e].join(" ")}function F(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",M(),e.format.apply(e,arguments))},e.inherits=r("28a0"),e._extend=function(t,e){if(!e||!L(e))return t;var r=Object.keys(e),n=r.length;while(n--)t[r[n]]=e[r[n]];return t};var A="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function E(t,e){if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}function R(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var s=r.pop();if("function"!==typeof s)throw new TypeError("The last argument must be of type Function");var i=this,o=function(){return s.apply(i,arguments)};e.apply(this,r).then((function(e){t.nextTick(o,null,e)}),(function(e){t.nextTick(E,e,o)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,n(e)),r}e.promisify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');if(A&&t[A]){var e=t[A];if("function"!==typeof e)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise((function(t,n){e=t,r=n})),s=[],i=0;i<arguments.length;i++)s.push(arguments[i]);s.push((function(t,n){t?r(t):e(n)}));try{t.apply(this,s)}catch(o){r(o)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),A&&Object.defineProperty(e,A,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,n(t))},e.promisify.custom=A,e.callbackify=R}).call(this,r("4362"))},"898f":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.serviceList.length>0?r("v-container",{attrs:{fluid:""}},[r("v-card",{staticClass:"mt-1"},[r("v-toolbar",{attrs:{dense:"",flat:""}},[r("v-btn",{attrs:{icon:""},on:{click:t.goBack}},[r("v-icon",[t._v("mdi-arrow-left")])],1)],1),r("v-card-title",{staticClass:"pt-0"},[t._v(t._s(t.collectionTitle))]),r("v-card-subtitle",[t._v(t._s(t.breadcrumbs))]),r("v-card-text",{staticClass:"pt-4"},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"6"}},[r("div",{staticClass:"max-w-400"},[r("v-text-field",{staticClass:"shrink",attrs:{dense:"",clearable:"","hide-details":"",placeholder:t.$t("message.3"),"append-icon":"mdi-magnify"},on:{input:function(e){return t.documentSearch()}},scopedSlots:t._u([{key:"append-outer",fn:function(){return[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,s=e.attrs;return[r("v-btn",t._g(t._b({staticStyle:{"margin-top":"-10px"},attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(e){return t.pasteSearchData()}}},"v-btn",s,!1),n),[r("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-paste")])],1)]}}],null,!1,638326765)},[r("span",[t._v(t._s(t.$t("message.71")))])])]},proxy:!0}],null,!1,1766464419),model:{value:t.updateSearchQuery,callback:function(e){t.updateSearchQuery=e},expression:"updateSearchQuery"}})],1)]),r("v-col",{staticClass:"text-md-right",attrs:{cols:"12",md:"6"}},[r("v-btn",{attrs:{dark:"",depressed:"",color:t.btnGreen.bg,to:t.docUrlNoIndex+"/new"}},[r("v-icon",{attrs:{left:"",color:t.btnGreen.icon}},[t._v("mdi-file-plus-outline")]),r("span",{class:t.btnGreen.text},[t._v(t._s(t.$t("message.25")))])],1)],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[t.docsToBeDeleted.length>0?r("v-btn",{attrs:{dark:"",depressed:"",color:t.btnRed.bg},on:{click:function(e){return t.deleteDocs()}}},[r("v-icon",{attrs:{left:"",color:t.btnRed.icon}},[t._v("mdi-close-thick")]),r("span",{class:t.btnRed.text},[t._v(t._s(t.$t("message.4")))])],1):t._e()],1)],1),r("v-row",[r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("div",{staticClass:"w-260"},[r("v-select",{attrs:{items:t.itemsSortDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDocList,callback:function(e){t.updateSortDocList=e},expression:"updateSortDocList"}})],1)]),r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("div",{staticClass:"w-180"},[r("v-select",{attrs:{items:t.itemsSortDirectDocList(),"hide-details":"",dense:""},on:{change:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateSortDirectDocList,callback:function(e){t.updateSortDirectDocList=e},expression:"updateSortDirectDocList"}})],1)]),r("v-col",{staticClass:"py-0",attrs:{cols:"auto"}},[r("v-btn",{attrs:{dark:"",small:"",depressed:"",color:t.btnBlue.bg,disabled:0===t.dataFilters.length},on:{click:function(e){t.showFilterDoc=!0}}},[r("v-icon",{attrs:{left:"",color:t.btnBlue.icon}},[t._v("mdi-filter")]),r("span",{class:t.dataFilters.length>0?t.btnBlue.text:""},[t._v(t._s(t.$t("message.64")))])],1)],1)],1),r("v-simple-table",{staticClass:"mt-4",attrs:{"fixed-header":""},scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",{staticClass:"document-list",style:t.$vuetify.theme.dark?"background: #1d1f34;":"background: #f5f6fb;"},[r("tr",[r("th",{staticStyle:{"text-align":"left !important"},attrs:{align:"left"}},[t._v(" № ")]),r("th",{attrs:{align:"center"}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",color:"red darken-2",disabled:0===t.documents.length},on:{change:function(e){return t.markAllDocsForDeletion()}},model:{value:t.deleteAllDocsFlag,callback:function(e){t.deleteAllDocsFlag=e},expression:"deleteAllDocsFlag"}})],1),t._l(t.fields,(function(e,n){return r("th",{key:"header-"+n,attrs:{align:"center"}},[t._v(" "+t._s(e.title)+" ")])})),r("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.29")))]),r("th",{attrs:{align:"center"}},[t._v(t._s(t.$t("message.30")))]),r("th",{attrs:{align:"center"}},[t._v("ID")])],2)]),r("tbody",{staticClass:"document-list"},t._l(t.documents,(function(e,n){return r("tr",{key:"doc-"+n},[r("td",{staticClass:"pr-0",staticStyle:{"text-align":"left !important"},attrs:{width:"76",align:"left"}},[t._v(" "+t._s(n+t.progressionStep)+" ")]),r("td",{staticClass:"pr-0",attrs:{width:"76",align:"center"}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",value:n,color:"red darken-2"},on:{change:function(e){return t.checkStatusListSelectedDocsDeleted()}},model:{value:t.docsToBeDeleted,callback:function(e){t.docsToBeDeleted=e},expression:"docsToBeDeleted"}})],1),t._l(t.fields,(function(s,i){return[r("td",{key:i,attrs:{align:"center"}},[0===i?[r("span",[r("v-btn",t._g(t._b({staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(r){return t.copyLinkNameDoc(e[s.field])}}},"v-btn",t.attrs,!1),t.on),[r("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-copy")])],1)],1),r("span",[r("router-link",{attrs:{to:t.getDocFormUrl(n)}},[t._v(t._s(e[s.field]))])],1)]:r("span",{domProps:{innerHTML:t._s(e[s.field])}})],2)]})),r("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.created_at))}}),r("td",{attrs:{width:"180"},domProps:{innerHTML:t._s(t.formattingDate(e.updated_at))}}),r("td",{attrs:{align:"center"}},[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var s=n.on,i=n.attrs;return[r("v-btn",t._g(t._b({attrs:{fab:"",dark:"",small:"",depressed:"",color:t.btnGreen.bg},on:{click:function(r){return t.copyHashDoc(e.hash)}}},"v-btn",i,!1),s),[r("v-icon",{attrs:{color:t.btnGreen.icon}},[t._v("mdi-content-copy")])],1)]}}],null,!0)},[r("span",[t._v(t._s(e.hash))])])],1)],2)})),0)]},proxy:!0}],null,!1,997725484)})],1),r("v-card-actions",[r("v-row",[r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("div",{staticClass:"w-80 block-center"},[r("v-select",{attrs:{items:t.countPerPage,"hide-details":"",dense:""},on:{change:function(e){return t.changeDocsPerPage()}},model:{value:t.updateDocsPerPage,callback:function(e){t.updateDocsPerPage=e},expression:"updateDocsPerPage"}})],1)]),r("v-col",{attrs:{cols:"12 pb-4"}},[t.blockPagination?t._e():r("v-pagination",{attrs:{circle:"",color:"#2196f38f",length:t.pageCount,"total-visible":5},on:{input:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateCurrentPageNumber,callback:function(e){t.updateCurrentPageNumber=e},expression:"updateCurrentPageNumber"}})],1)],1)],1)],1),r("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.showFilterDoc,callback:function(e){t.showFilterDoc=e},expression:"showFilterDoc"}},[r("v-card",[r("v-card-actions",{staticClass:"pr-3 pt-2 pb-0"},[r("v-spacer"),r("v-btn",{attrs:{icon:"",small:"",color:"red"},on:{click:function(e){t.showFilterDoc=!1}}},[r("v-icon",[t._v("mdi-close")])],1)],1),r("v-card-title",{staticClass:"pt-0 pb-6"},[t._v(t._s(t.$t("message.65")))]),r("v-card-text",[r("v-row",{attrs:{justify:"center"}},t._l(t.dataFilters,(function(e,n){return r("v-col",{key:"filter-"+n,staticClass:"mb-4",attrs:{cols:"12"}},[r("v-autocomplete",{staticClass:"shrink",attrs:{dense:"",chips:e.multiple,"deletable-chips":e.multiple,"small-chips":e.multiple,clearable:"","hide-details":"","item-text":"title","item-value":"value",label:e.label,multiple:e.multiple,items:e.items},on:{input:function(e){return t.getDocumentList()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var s=n.on;return[r("v-btn",{attrs:{fab:"",dark:"",small:"",depressed:"",color:e.negation?t.btnBlue.bg:t.btnRed.bg},on:{click:function(r){e.negation=!e.negation,t.getDocumentList()}}},[r("v-icon",t._g({attrs:{color:e.negation?t.btnBlue.icon:t.btnRed.icon}},s),[t._v(t._s(e.negation?"mdi-minus":"mdi-plus"))])],1)]}}],null,!0)},[t._v(" "+t._s(t.$t("message.69"))+" ")])]},proxy:!0}],null,!0),model:{value:t.selectDataFilters[e.field],callback:function(r){t.$set(t.selectDataFilters,e.field,r)},expression:"selectDataFilters[filter.field]"}})],1)})),1)],1)],1)],1)],1):t._e()},s=[],i=r("2f62"),o=r("d3bd"),a=r.n(o),c=r("d444"),l=r.n(c),u={name:"DocumentList",data:()=>({deleteAllDocsFlag:!1,docsToBeDeleted:[],countPerPage:[10,20,30,40,50,60,70,80,90,100],showFilterDoc:!1}),computed:{...Object(i["d"])(["serviceList","btnRed","btnBlue","btnGreen"]),...Object(i["d"])("documentList",["documents","currentPageNumber","pageCount","progressionStep","docsPerPage","sortDocList","sortDirectDocList","sortTypes","searchQuery","dataFilters","selectDataFilters","blockPagination","blockLoadDocs"]),updateCurrentPageNumber:{get:function(){return this.currentPageNumber},set:function(t){this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[],this.setCurrentPageNumber(t)}},updateSearchQuery:{get:function(){return this.searchQuery},set:function(t){this.setSearchQuery(t?t.trim():t)}},updateDocsPerPage:{get:function(){return this.docsPerPage},set:function(t){this.setDocsPerPage(t)}},updateSortDocList:{get:function(){return this.sortDocList},set:function(t){this.setSortDocList(t)}},updateSortDirectDocList:{get:function(){return this.sortDirectDocList},set:function(t){this.setSortDirectDocList(t)}},collectionTitle:function(){const t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].title},breadcrumbs:function(){const t=this.$route.params.indexService,e=this.serviceList[t].service.title;return`${e} > ${this.collectionTitle}`},docUrlNoIndex:function(){const t=this.$i18n.locale,e=this.$route.params.indexService,r=this.$route.params.indexCollection,n=this.serviceList[e],s=a()(n.service.title,{locale:t}),i=a()(this.collectionTitle,{locale:t});return`/${s}/${e}/${i}/${r}/document`},fields:function(){const t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].fields}},watch:{blockLoadDocs:function(t){t||(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[])}},filters:{upperCase:function(t){return t?(t=t.toString(),t.toUpperCase()):""}},methods:{...Object(i["c"])("documentList",["setCurrentPageNumber","setProgressionStep","setDocsPerPage","setSortDocList","setSortDirectDocList","setSearchQuery"]),...Object(i["c"])("popUpMsgs",["setShowMsg"]),...Object(i["b"])("documentList",["ajaxGetDocumentList","ajaxGetDataFilters","resetPageNumberDefault"]),...Object(i["b"])("popUpMsgs",["runShowMsg"]),...Object(i["b"])("overlays",["runShowOverlayPageLockout"]),goBack(){this.setShowMsg(!1),this.$router.replace({name:"home"})},pasteSearchData(){this.updateSearchQuery="",navigator.clipboard.readText().then(t=>{this.updateSearchQuery=t,this.documentSearch()})},itemsSortDocList(){return[{text:this.$t("message.40"),value:this.sortTypes[0]},{text:this.$t("message.29"),value:this.sortTypes[1]},{text:this.$t("message.30"),value:this.sortTypes[2]}]},itemsSortDirectDocList(){return[{text:this.$t("message.42"),value:-1},{text:this.$t("message.43"),value:1}]},changeDocsPerPage(){const t=`${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=1&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`;document.location.replace(t)},copyLinkNameDoc(t){navigator.clipboard.writeText(t).then(()=>{},()=>{this.runShowMsg({text:"Clipboard write failed.",status:"error"})})},copyHashDoc(t){navigator.clipboard.writeText(t).then(()=>{},()=>{this.runShowMsg({text:"Clipboard write failed.",status:"error"})})},getDocumentList(){return this.setShowMsg(!1),this.runShowOverlayPageLockout(!0),this.docsToBeDeleted.length>0&&(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[]),new Promise((t,e)=>{this.ajaxGetDocumentList().then(()=>{this.runShowOverlayPageLockout(!1),t()}).catch(t=>{console.log(t),this.runShowOverlayPageLockout(!1),this.runShowMsg({text:t,status:"error"}),e(t)})})},refreshUrlState(){const t=this.currentPageNumber;this.setProgressionStep(this.docsPerPage*(t-1)+1),this.$route.query.page=t;const e=`${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${t}&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`;history.replaceState(null,null,e)},documentSearch(){this.blockLoadDocs?setTimeout(()=>{this.documentSearch()},100):(this.resetPageNumberDefault(this.getRequestParams()),this.getDocumentList())},getDocFormUrl(t){return`${this.docUrlNoIndex}/${t}`},formattingDate(t){const e=new Date(t+"Z"),r=e.toLocaleDateString([this.$i18n.locale,"en"]),n=e.toLocaleTimeString().slice(0,8);return`<span class="cyan--text text--darken-2">${r}</span> <span class="orange--text text--darken-2">${n}</span>`},markAllDocsForDeletion(){this.docsToBeDeleted=this.deleteAllDocsFlag?l()(0,this.documents.length-1):[]},checkStatusListSelectedDocsDeleted(){this.deleteAllDocsFlag=this.docsToBeDeleted.length===this.documents.length},restartDocList(){let t=this.currentPageNumber;if(t>1&&this.pageCount<t){const e=`${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${--t}&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`;document.location.replace(e)}},deleteDocs(){this.setShowMsg(!1),this.runShowOverlayPageLockout(!0);const t=this.$route.params.indexService,e=this.$route.params.indexCollection,r=this.serviceList[t],n=[];this.docsToBeDeleted.forEach(t=>{n.push(this.documents[t].hash)});const s={model_key:r.collections[e].model_key,doc_hash_list:n};this.axios.post("/admin/delete-many-doc",s).then(t=>{const e=t.data;e.is_authenticated?0===e.msg_err.length?(this.setShowMsg(!1),this.getDocumentList().then(()=>{this.restartDocList()})):(console.log(e.msg_err),this.runShowOverlayPageLockout(!1),this.runShowMsg({text:e.msg_err,status:"error"})):(this.runShowOverlayPageLockout(!1),this.setIsAuthenticated(!1))}).catch(t=>{console.log(t),this.runShowOverlayPageLockout(!1),this.runShowMsg({text:t,status:"error"})})},getRequestParams(){let t=this.$route.query.page;t=void 0!==t?parseInt(t):1,Number.isNaN(t)&&this.runShowMsg({text:this.$t("message.36"),status:"error"});let e=this.$route.query.per;e=void 0!==e?parseInt(e):this.docsPerPage,Number.isNaN(e)&&this.runShowMsg({text:this.$t("message.38"),status:"error"});let r=this.$route.query.sort;r=void 0!==r?r:this.sortDocList,this.sortTypes.includes(r)||this.runShowMsg({text:this.$t("message.44"),status:"error"});let n=this.$route.query.direct;return n=void 0!==n?parseInt(n):this.sortDirectDocList,Number.isNaN(n)&&this.runShowMsg({text:this.$t("message.45"),status:"error"}),this.setProgressionStep(e*(t-1)+1),{numPage:t,numPer:e,sortType:r,sortDirect:n}}},created(){this.resetPageNumberDefault(this.getRequestParams()),this.blockLoadDocs||this.getDocumentList().then(()=>{this.restartDocList(),0===this.dataFilters.length&&this.ajaxGetDataFilters().catch(t=>{console.log(t),this.runShowOverlayPageLockout(!1),this.runShowMsg({text:t,status:"error"})})})}},h=u,p=(r("ab7d"),r("2877")),d=r("6544"),g=r.n(d),f=r("c6a6"),m=r("8336"),b=r("b0af"),v=r("99d9"),y=r("ac7c"),D=r("62ad"),S=r("a523"),w=r("169a"),x=r("132d"),$=(r("17b3"),r("9d26")),_=r("dc22"),L=r("a9ad"),P=r("de2c"),k=r("7560"),C=r("58df"),O=Object(C["a"])(L["a"],Object(P["a"])({onVisible:["init"]}),k["a"]).extend({name:"v-pagination",directives:{Resize:_["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:t=>t%1===0},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data(){return{maxButtons:0,selected:null}},computed:{classes(){return{"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled,...this.themeClasses}},items(){const t=parseInt(this.totalVisible,10);if(0===t)return[];const e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);const r=e%2===0?1:0,n=Math.floor(e/2),s=this.length-n+1+r;if(this.value>n&&this.value<s){const t=1,e=this.length,s=this.value-n+2,i=this.value+n-2-r,o=s-1===t+1?2:"...",a=i+1===e-1?i+1:"...";return[1,o,...this.range(s,i),a,this.length]}if(this.value===n){const t=this.value+n-1-r;return[...this.range(1,t),"...",this.length]}if(this.value===s){const t=this.value-n+1;return[1,"...",...this.range(t,this.length)]}return[...this.range(1,n),"...",...this.range(s,this.length)]}},watch:{value(){this.init()}},mounted(){this.init()},methods:{init(){this.selected=null,this.$nextTick(this.onResize),setTimeout(()=>this.selected=this.value,100)},onResize(){const t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range(t,e){const r=[];t=t>0?t:1;for(let n=t;n<=e;n++)r.push(n);return r},genIcon(t,e,r,n,s){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":r},attrs:{disabled:r,type:"button","aria-label":s},on:r?{}:{click:n}},[t($["a"],[e])])])},genItem(t,e){const r=e===this.value&&(this.color||"primary"),n=e===this.value,s=n?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(r,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":n,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:()=>this.$emit("input",e)}}),[e.toString()])},genItems(t){return this.items.map((e,r)=>t("li",{key:r},[isNaN(Number(e))?t("span",{class:"v-pagination__more"},[e.toString()]):this.genItem(t,e)]))},genList(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render(t){const e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}}),j=r("0fd9"),N=r("b974"),T=(r("8b37"),r("80d2")),M=Object(C["a"])(k["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes(){return{"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom,...this.themeClasses}}},methods:{genWrapper(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(T["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),F=r("2fa4"),A=r("8654"),E=r("71d9"),R=r("3a2f"),B=Object(p["a"])(h,n,s,!1,null,null,null);e["default"]=B.exports;g()(B,{VAutocomplete:f["a"],VBtn:m["a"],VCard:b["a"],VCardActions:v["a"],VCardSubtitle:v["b"],VCardText:v["c"],VCardTitle:v["d"],VCheckbox:y["a"],VCol:D["a"],VContainer:S["a"],VDialog:w["a"],VIcon:x["a"],VPagination:O,VRow:j["a"],VSelect:N["a"],VSimpleTable:M,VSpacer:F["a"],VTextField:A["a"],VToolbar:E["a"],VTooltip:R["a"]})},"8b37":function(t,e,r){},ab7d:function(t,e,r){"use strict";r("1219")},d444:function(t,e,r){"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */const n=r("3022"),s=r("fd8e"),i=t=>null!==t&&"object"===typeof t&&!Array.isArray(t),o=t=>e=>!0===t?Number(e):String(e),a=t=>"number"===typeof t||"string"===typeof t&&""!==t,c=t=>Number.isInteger(+t),l=t=>{let e=""+t,r=-1;if("-"===e[0]&&(e=e.slice(1)),"0"===e)return!1;while("0"===e[++r]);return r>0},u=(t,e,r)=>"string"===typeof t||"string"===typeof e||!0===r.stringify,h=(t,e,r)=>{if(e>0){let r="-"===t[0]?"-":"";r&&(t=t.slice(1)),t=r+t.padStart(r?e-1:e,"0")}return!1===r?String(t):t},p=(t,e)=>{let r="-"===t[0]?"-":"";r&&(t=t.slice(1),e--);while(t.length<e)t="0"+t;return r?"-"+t:t},d=(t,e)=>{t.negatives.sort((t,e)=>t<e?-1:t>e?1:0),t.positives.sort((t,e)=>t<e?-1:t>e?1:0);let r,n=e.capture?"":"?:",s="",i="";return t.positives.length&&(s=t.positives.join("|")),t.negatives.length&&(i=`-(${n}${t.negatives.join("|")})`),r=s&&i?`${s}|${i}`:s||i,e.wrap?`(${n}${r})`:r},g=(t,e,r,n)=>{if(r)return s(t,e,{wrap:!1,...n});let i=String.fromCharCode(t);if(t===e)return i;let o=String.fromCharCode(e);return`[${i}-${o}]`},f=(t,e,r)=>{if(Array.isArray(t)){let e=!0===r.wrap,n=r.capture?"":"?:";return e?`(${n}${t.join("|")})`:t.join("|")}return s(t,e,r)},m=(...t)=>new RangeError("Invalid range arguments: "+n.inspect(...t)),b=(t,e,r)=>{if(!0===r.strictRanges)throw m([t,e]);return[]},v=(t,e)=>{if(!0===e.strictRanges)throw new TypeError(`Expected step "${t}" to be a number`);return[]},y=(t,e,r=1,n={})=>{let s=Number(t),i=Number(e);if(!Number.isInteger(s)||!Number.isInteger(i)){if(!0===n.strictRanges)throw m([t,e]);return[]}0===s&&(s=0),0===i&&(i=0);let a=s>i,c=String(t),b=String(e),v=String(r);r=Math.max(Math.abs(r),1);let y=l(c)||l(b)||l(v),D=y?Math.max(c.length,b.length,v.length):0,S=!1===y&&!1===u(t,e,n),w=n.transform||o(S);if(n.toRegex&&1===r)return g(p(t,D),p(e,D),!0,n);let x={negatives:[],positives:[]},$=t=>x[t<0?"negatives":"positives"].push(Math.abs(t)),_=[],L=0;while(a?s>=i:s<=i)!0===n.toRegex&&r>1?$(s):_.push(h(w(s,L),D,S)),s=a?s-r:s+r,L++;return!0===n.toRegex?r>1?d(x,n):f(_,null,{wrap:!1,...n}):_},D=(t,e,r=1,n={})=>{if(!c(t)&&t.length>1||!c(e)&&e.length>1)return b(t,e,n);let s=n.transform||(t=>String.fromCharCode(t)),i=(""+t).charCodeAt(0),o=(""+e).charCodeAt(0),a=i>o,l=Math.min(i,o),u=Math.max(i,o);if(n.toRegex&&1===r)return g(l,u,!1,n);let h=[],p=0;while(a?i>=o:i<=o)h.push(s(i,p)),i=a?i-r:i+r,p++;return!0===n.toRegex?f(h,null,{wrap:!1,options:n}):h},S=(t,e,r,n={})=>{if(null==e&&a(t))return[t];if(!a(t)||!a(e))return b(t,e,n);if("function"===typeof r)return S(t,e,1,{transform:r});if(i(r))return S(t,e,0,r);let s={...n};return!0===s.capture&&(s.wrap=!0),r=r||s.step||1,c(r)?c(t)&&c(e)?y(t,e,r,s):D(t,e,Math.max(Math.abs(r),1),s):null==r||i(r)?S(t,e,1,r):v(r,s)};t.exports=S},d60a:function(t,e){t.exports=function(t){return t&&"object"===typeof t&&"function"===typeof t.copy&&"function"===typeof t.fill&&"function"===typeof t.readUInt8}},eb9e:function(t,e,r){"use strict";
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
 */const n=r("eb9e"),s=(t,e,r)=>{if(!1===n(t))throw new TypeError("toRegexRange: expected the first argument to be a number");if(void 0===e||t===e)return String(t);if(!1===n(e))throw new TypeError("toRegexRange: expected the second argument to be a number.");let o={relaxZeros:!0,...r};"boolean"===typeof o.strictZeros&&(o.relaxZeros=!1===o.strictZeros);let a=String(o.relaxZeros),l=String(o.shorthand),u=String(o.capture),h=String(o.wrap),p=t+":"+e+"="+a+l+u+h;if(s.cache.hasOwnProperty(p))return s.cache[p].result;let d=Math.min(t,e),g=Math.max(t,e);if(1===Math.abs(d-g)){let r=t+"|"+e;return o.capture?`(${r})`:!1===o.wrap?r:`(?:${r})`}let f=b(t)||b(e),m={min:t,max:e,a:d,b:g},v=[],y=[];if(f&&(m.isPadded=f,m.maxLen=String(m.max).length),d<0){let t=g<0?Math.abs(g):1;y=c(t,Math.abs(d),m,o),d=m.a=0}return g>=0&&(v=c(d,g,m,o)),m.negatives=y,m.positives=v,m.result=i(y,v,o),!0===o.capture?m.result=`(${m.result})`:!1!==o.wrap&&v.length+y.length>1&&(m.result=`(?:${m.result})`),s.cache[p]=m,m.result};function i(t,e,r){let n=l(t,e,"-",!1,r)||[],s=l(e,t,"",!1,r)||[],i=l(t,e,"-?",!0,r)||[],o=n.concat(i).concat(s);return o.join("|")}function o(t,e){let r=1,n=1,s=d(t,r),i=new Set([e]);while(t<=s&&s<=e)i.add(s),r+=1,s=d(t,r);s=g(e+1,n)-1;while(t<s&&s<=e)i.add(s),n+=1,s=g(e+1,n)-1;return i=[...i],i.sort(h),i}function a(t,e,r){if(t===e)return{pattern:t,count:[],digits:0};let n=u(t,e),s=n.length,i="",o=0;for(let a=0;a<s;a++){let[t,e]=n[a];t===e?i+=t:"0"!==t||"9"!==e?i+=m(t,e,r):o++}return o&&(i+=!0===r.shorthand?"\\d":"[0-9]"),{pattern:i,count:[o],digits:s}}function c(t,e,r,n){let s,i=o(t,e),c=[],l=t;for(let o=0;o<i.length;o++){let t=i[o],e=a(String(l),String(t),n),u="";r.isPadded||!s||s.pattern!==e.pattern?(r.isPadded&&(u=v(t,r,n)),e.string=u+e.pattern+f(e.count),c.push(e),l=t+1,s=e):(s.count.length>1&&s.count.pop(),s.count.push(e.count[0]),s.string=s.pattern+f(s.count),l=t+1)}return c}function l(t,e,r,n,s){let i=[];for(let o of t){let{string:t}=o;n||p(e,"string",t)||i.push(r+t),n&&p(e,"string",t)&&i.push(r+t)}return i}function u(t,e){let r=[];for(let n=0;n<t.length;n++)r.push([t[n],e[n]]);return r}function h(t,e){return t>e?1:e>t?-1:0}function p(t,e,r){return t.some(t=>t[e]===r)}function d(t,e){return Number(String(t).slice(0,-e)+"9".repeat(e))}function g(t,e){return t-t%Math.pow(10,e)}function f(t){let[e=0,r=""]=t;return r||e>1?`{${e+(r?","+r:"")}}`:""}function m(t,e,r){return`[${t}${e-t===1?"":"-"}${e}]`}function b(t){return/^-?(0+)\d/.test(t)}function v(t,e,r){if(!e.isPadded)return t;let n=Math.abs(e.maxLen-String(t).length),s=!1!==r.relaxZeros;switch(n){case 0:return"";case 1:return s?"0?":"0";case 2:return s?"0{0,2}":"00";default:return s?`0{0,${n}}`:`0{${n}}`}}s.cache={},s.clearCache=()=>s.cache={},t.exports=s}}]);
//# sourceMappingURL=chunk-13852fb7.2e990d41.js.map