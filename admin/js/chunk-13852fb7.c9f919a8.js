(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13852fb7"],{1219:function(t,e,r){},"17b3":function(t,e,r){},"28a0":function(t,e){"function"===typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},3022:function(t,e,r){(function(t){var n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},i=/%[sdj%]/g;e.format=function(t){if(!S(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(a(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,s=n.length,o=String(t).replace(i,(function(t){if("%%"===t)return"%";if(r>=s)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return t}})),c=n[r];r<s;c=n[++r])y(c)||!_(c)?o+=" "+c:o+=" "+a(c);return o},e.deprecate=function(r,n){if("undefined"!==typeof t&&!0===t.noDeprecation)return r;if("undefined"===typeof t)return function(){return e.deprecate(r,n).apply(this,arguments)};var i=!1;function s(){if(!i){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),i=!0}return r.apply(this,arguments)}return s};var s,o={};function a(t,r){var n={seen:[],stylize:l};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),v(r)?n.showHidden=r:r&&e._extend(n,r),P(n.showHidden)&&(n.showHidden=!1),P(n.depth)&&(n.depth=2),P(n.colors)&&(n.colors=!1),P(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=c),h(n,t,n.depth)}function c(t,e){var r=a.styles[e];return r?"["+a.colors[r][0]+"m"+t+"["+a.colors[r][1]+"m":t}function l(t,e){return t}function u(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}function h(t,r,n){if(t.customInspect&&r&&k(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return S(i)||(i=h(t,i,n)),i}var s=p(t,r);if(s)return s;var o=Object.keys(r),a=u(o);if(t.showHidden&&(o=Object.getOwnPropertyNames(r)),j(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return d(r);if(0===o.length){if(k(r)){var c=r.name?": "+r.name:"";return t.stylize("[Function"+c+"]","special")}if(D(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(O(r))return t.stylize(Date.prototype.toString.call(r),"date");if(j(r))return d(r)}var l,v="",y=!1,w=["{","}"];if(b(r)&&(y=!0,w=["[","]"]),k(r)){var x=r.name?": "+r.name:"";v=" [Function"+x+"]"}return D(r)&&(v=" "+RegExp.prototype.toString.call(r)),O(r)&&(v=" "+Date.prototype.toUTCString.call(r)),j(r)&&(v=" "+d(r)),0!==o.length||y&&0!=r.length?n<0?D(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),l=y?g(t,r,n,a,o):o.map((function(e){return f(t,r,n,a,e,y)})),t.seen.pop(),m(l,v,w)):w[0]+v+w[1]}function p(t,e){if(P(e))return t.stylize("undefined","undefined");if(S(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return x(e)?t.stylize(""+e,"number"):v(e)?t.stylize(""+e,"boolean"):y(e)?t.stylize("null","null"):void 0}function d(t){return"["+Error.prototype.toString.call(t)+"]"}function g(t,e,r,n,i){for(var s=[],o=0,a=e.length;o<a;++o)A(e,String(o))?s.push(f(t,e,r,n,String(o),!0)):s.push("");return i.forEach((function(i){i.match(/^\d+$/)||s.push(f(t,e,r,n,i,!0))})),s}function f(t,e,r,n,i,s){var o,a,c;if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?a=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(a=t.stylize("[Setter]","special")),A(n,i)||(o="["+i+"]"),a||(t.seen.indexOf(c.value)<0?(a=y(r)?h(t,c.value,null):h(t,c.value,r-1),a.indexOf("\n")>-1&&(a=s?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n"))):a=t.stylize("[Circular]","special")),P(o)){if(s&&i.match(/^\d+$/))return a;o=JSON.stringify(""+i),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=t.stylize(o,"string"))}return o+": "+a}function m(t,e,r){var n=t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0);return n>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}function b(t){return Array.isArray(t)}function v(t){return"boolean"===typeof t}function y(t){return null===t}function w(t){return null==t}function x(t){return"number"===typeof t}function S(t){return"string"===typeof t}function $(t){return"symbol"===typeof t}function P(t){return void 0===t}function D(t){return _(t)&&"[object RegExp]"===L(t)}function _(t){return"object"===typeof t&&null!==t}function O(t){return _(t)&&"[object Date]"===L(t)}function j(t){return _(t)&&("[object Error]"===L(t)||t instanceof Error)}function k(t){return"function"===typeof t}function C(t){return null===t||"boolean"===typeof t||"number"===typeof t||"string"===typeof t||"symbol"===typeof t||"undefined"===typeof t}function L(t){return Object.prototype.toString.call(t)}function N(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if(P(s)&&(s=Object({NODE_ENV:"production",BASE_URL:"/admin/contrib/"}).NODE_DEBUG||""),r=r.toUpperCase(),!o[r])if(new RegExp("\\b"+r+"\\b","i").test(s)){var n=t.pid;o[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else o[r]=function(){};return o[r]},e.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=b,e.isBoolean=v,e.isNull=y,e.isNullOrUndefined=w,e.isNumber=x,e.isString=S,e.isSymbol=$,e.isUndefined=P,e.isRegExp=D,e.isObject=_,e.isDate=O,e.isError=j,e.isFunction=k,e.isPrimitive=C,e.isBuffer=r("d60a");var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function M(){var t=new Date,e=[N(t.getHours()),N(t.getMinutes()),N(t.getSeconds())].join(":");return[t.getDate(),T[t.getMonth()],e].join(" ")}function A(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",M(),e.format.apply(e,arguments))},e.inherits=r("28a0"),e._extend=function(t,e){if(!e||!_(e))return t;var r=Object.keys(e),n=r.length;while(n--)t[r[n]]=e[r[n]];return t};var E="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function I(t,e){if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}function B(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var i=r.pop();if("function"!==typeof i)throw new TypeError("The last argument must be of type Function");var s=this,o=function(){return i.apply(s,arguments)};e.apply(this,r).then((function(e){t.nextTick(o,null,e)}),(function(e){t.nextTick(I,e,o)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,n(e)),r}e.promisify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');if(E&&t[E]){var e=t[E];if("function"!==typeof e)throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,E,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise((function(t,n){e=t,r=n})),i=[],s=0;s<arguments.length;s++)i.push(arguments[s]);i.push((function(t,n){t?r(t):e(n)}));try{t.apply(this,i)}catch(o){r(o)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),E&&Object.defineProperty(e,E,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,n(t))},e.promisify.custom=E,e.callbackify=B}).call(this,r("4362"))},"898f":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.serviceList.length>0?r("v-container",{attrs:{fluid:""}},[r("v-card",{staticClass:"mt-1"},[r("v-toolbar",{attrs:{dense:"",flat:""}},[r("v-btn",{attrs:{icon:""},on:{click:t.goBack}},[r("v-icon",[t._v("mdi-arrow-left")])],1)],1),r("v-card-title",{staticClass:"pt-0"},[t._v(t._s(t.collectionTitle))]),r("v-card-subtitle",[t._v(t._s(t.breadcrumbs))]),r("v-card-text",{staticClass:"pt-4"},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"6"}},[r("v-text-field",{attrs:{dense:"",clearable:"","hide-details":"",placeholder:t.$t("message.3"),"append-icon":"mdi-magnify"},on:{input:function(e){return t.documentSearch()}},model:{value:t.updateSearchQuery,callback:function(e){t.updateSearchQuery=e},expression:"updateSearchQuery"}})],1),r("v-col",{staticClass:"text-md-right",attrs:{cols:"12",md:"6"}},[r("v-btn",{attrs:{text:"",color:"green",to:t.docUrlNoIndex+"/new"}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-file-plus-outline")]),t._v(" "+t._s(t.$t("message.25"))+" ")],1)],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[t.docsToBeDeleted.length>0?r("v-btn",{attrs:{dark:"",color:"red darken-3"},on:{click:function(e){return t.deleteDocs()}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-close-thick")]),t._v(" "+t._s(t.$t("message.4"))+" ")],1):t._e()],1)],1),r("v-simple-table",{staticClass:"mt-4",attrs:{"fixed-header":""},scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",[t._v("№")]),r("th",[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",color:"red darken-3",disabled:0===t.documents.length},on:{change:function(e){return t.markAllDocsForDeletion()}},model:{value:t.deleteAllDocsFlag,callback:function(e){t.deleteAllDocsFlag=e},expression:"deleteAllDocsFlag"}})],1),r("th",[t._v(t._s(t.serviceList[t.$route.params.indexService].collections[t.$route.params.indexCollection].doc_name.title))]),r("th",[t._v(t._s(t.$t("message.29")))]),r("th",[t._v(t._s(t.$t("message.30")))])])]),r("tbody",t._l(t.documents,(function(e,n){return r("tr",{key:n},[r("td",{staticClass:"pr-0",attrs:{width:"76"}},[t._v(t._s(n+t.progressionStep))]),r("td",{staticClass:"pr-0",attrs:{width:"76"}},[r("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",value:n,color:"red darken-3"},on:{change:function(e){return t.checkStatusListSelectedDocsDeleted()}},model:{value:t.docsToBeDeleted,callback:function(e){t.docsToBeDeleted=e},expression:"docsToBeDeleted"}})],1),r("td",[r("router-link",{attrs:{to:t.createDocumentUrl(n)}},[t._v(t._s(e.title))])],1),r("td",{attrs:{width:"160"},domProps:{innerHTML:t._s(t.formattingDate(e.created_at))}}),r("td",{attrs:{width:"160"},domProps:{innerHTML:t._s(t.formattingDate(e.updated_at))}})])})),0)]},proxy:!0}],null,!1,3070289125)})],1),r("v-card-actions",[r("v-row",[r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("div",{staticClass:"w-80 block-center"},[r("v-select",{attrs:{items:t.countPerPage,"hide-details":"",dense:""},on:{change:function(e){return t.changeDocsPerPage()}},model:{value:t.updateDocsPerPage,callback:function(e){t.updateDocsPerPage=e},expression:"updateDocsPerPage"}})],1)]),r("v-col",{attrs:{cols:"12 pb-4"}},[t.blockPagination?t._e():r("v-pagination",{attrs:{circle:"",length:t.pageCount,"total-visible":5},on:{input:function(e){t.getDocumentList(),t.refreshUrlState()}},model:{value:t.updateCurrentPageNumber,callback:function(e){t.updateCurrentPageNumber=e},expression:"updateCurrentPageNumber"}})],1)],1)],1)],1)],1):t._e()},i=[],s=(r("5319"),r("2f62")),o=r("d3bd"),a=r.n(o),c=r("d444"),l=r.n(c),u={name:"DocumentList",data:()=>({deleteAllDocsFlag:!1,docsToBeDeleted:[],countPerPage:[10,20,30,40,50,60,70,80,90,100,500,1e3]}),computed:{...Object(s["d"])(["serviceList"]),...Object(s["d"])("documentList",["documents","currentPageNumber","pageCount","progressionStep","docsPerPage","searchQuery","blockPagination","blockLoadDocs"]),updateCurrentPageNumber:{get:function(){return this.currentPageNumber},set:function(t){this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[],this.setCurrentPageNumber(t)}},updateSearchQuery:{get:function(){return this.searchQuery},set:function(t){this.setSearchQuery(t)}},updateDocsPerPage:{get:function(){return this.docsPerPage},set:function(t){this.setDocsPerPage(t)}},collectionTitle:function(){const t=this.$route.params.indexService,e=this.$route.params.indexCollection;return this.serviceList[t].collections[e].title},breadcrumbs:function(){const t=this.$route.params.indexService,e=this.serviceList[t].service.title;return`${e} > ${this.collectionTitle}`},docUrlNoIndex:function(){const t=this.$i18n.locale,e=this.$route.params.indexService,r=this.$route.params.indexCollection,n=this.serviceList[e],i=a()(n.service.title,{locale:t}),s=a()(this.collectionTitle,{locale:t});return`/${i}/${e}/${s}/${r}/document`}},watch:{blockLoadDocs:function(t){t||(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[])}},methods:{...Object(s["c"])("documentList",["setCurrentPageNumber","setProgressionStep","setDocsPerPage","setSearchQuery"]),...Object(s["c"])("popUpMsgs",["setShowMsg"]),...Object(s["b"])("documentList",["ajaxGetDocumentList","resetPageNumberDefault"]),...Object(s["b"])("popUpMsgs",["runShowMsg"]),...Object(s["b"])("overlays",["runShowOverlayPageLockout"]),goBack(){this.setShowMsg(!1),this.$router.replace({name:"home"})},changeDocsPerPage(){const t=`${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=1`;document.location.replace(t)},getDocumentList:function(){this.setShowMsg(!1),this.runShowOverlayPageLockout(!0),this.docsToBeDeleted.length>0&&(this.deleteAllDocsFlag=!1,this.docsToBeDeleted=[]),this.ajaxGetDocumentList().catch(t=>{window.console.log(t)}).then(()=>this.runShowOverlayPageLockout(!1))},refreshUrlState:function(){const t=this.currentPageNumber;this.setProgressionStep(this.docsPerPage*(t-1)+1),this.$route.query.page=t;const e=`${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${t}`;history.replaceState(null,null,e)},documentSearch:function(){this.resetPageNumberDefault(),this.getDocumentList()},createDocumentUrl:function(t){return`${this.docUrlNoIndex}/${t}`},formattingDate:function(t){const e=new Date(t+"Z"),r=e.toLocaleDateString([this.$i18n.locale,"en"]),n=e.toLocaleTimeString().slice(0,5);return`<span class="cyan--text text--darken-2">${r}</span> <span class="orange--text text--darken-2">${n}</span>`},markAllDocsForDeletion:function(){this.docsToBeDeleted=this.deleteAllDocsFlag?l()(0,this.documents.length-1):[]},checkStatusListSelectedDocsDeleted:function(){this.deleteAllDocsFlag=this.docsToBeDeleted.length===this.documents.length},deleteDocs:function(){this.setShowMsg(!1),this.runShowOverlayPageLockout(!0);const t=this.$route.params.indexService,e=this.$route.params.indexCollection,r=this.serviceList[t],n=[];this.docsToBeDeleted.forEach(t=>{n.push(this.documents[t].hash)});const i={model_key:r.collections[e].model_key,doc_hash_list:n};this.axios.post("/admin/delete-many-doc",i).then(t=>{const e=t.data;e.is_authenticated?0===e.msg_err.length?(this.setShowMsg(!1),this.resetPageNumberDefault(this.getPerPage()),this.getDocumentList()):(console.log(e.msg_err),this.runShowMsg({text:e.msg_err,status:"error"})):this.setIsAuthenticated(!1)}).catch(t=>{console.log(t),this.runShowMsg({text:t,status:"error"})}).then(()=>this.runShowOverlayPageLockout(!1))},getPerPage(){let t=this.$route.query.page;t=void 0!==t?parseInt(t):1,Number.isNaN(t)&&this.runShowMsg({text:this.$t("message.36"),status:"error"});let e=this.$route.query.per;return e=void 0!==e?parseInt(e):this.docsPerPage,Number.isNaN(e)&&this.runShowMsg({text:this.$t("message.38"),status:"error"}),{numPage:t,numPer:e}}},created(){this.resetPageNumberDefault(this.getPerPage()),this.getDocumentList()}},h=u,p=(r("ab7d"),r("2877")),d=r("6544"),g=r.n(d),f=r("8336"),m=r("b0af"),b=r("99d9"),v=r("ac7c"),y=r("62ad"),w=r("a523"),x=r("132d"),S=(r("17b3"),r("9d26")),$=r("dc22"),P=r("a9ad"),D=r("de2c"),_=r("7560"),O=r("58df"),j=Object(O["a"])(P["a"],Object(D["a"])({onVisible:["init"]}),_["a"]).extend({name:"v-pagination",directives:{Resize:$["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:t=>t%1===0},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data(){return{maxButtons:0,selected:null}},computed:{classes(){return{"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled,...this.themeClasses}},items(){const t=parseInt(this.totalVisible,10);if(0===t)return[];const e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);const r=e%2===0?1:0,n=Math.floor(e/2),i=this.length-n+1+r;if(this.value>n&&this.value<i){const t=this.value-n+2,e=this.value+n-2-r;return[1,"...",...this.range(t,e),"...",this.length]}if(this.value===n){const t=this.value+n-1-r;return[...this.range(1,t),"...",this.length]}if(this.value===i){const t=this.value-n+1;return[1,"...",...this.range(t,this.length)]}return[...this.range(1,n),"...",...this.range(i,this.length)]}},watch:{value(){this.init()}},mounted(){this.init()},methods:{init(){this.selected=null,this.$nextTick(this.onResize),setTimeout(()=>this.selected=this.value,100)},onResize(){const t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range(t,e){const r=[];t=t>0?t:1;for(let n=t;n<=e;n++)r.push(n);return r},genIcon(t,e,r,n,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":r},attrs:{disabled:r,type:"button","aria-label":i},on:r?{}:{click:n}},[t(S["a"],[e])])])},genItem(t,e){const r=e===this.value&&(this.color||"primary"),n=e===this.value,i=n?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(r,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":n,"aria-label":this.$vuetify.lang.t(i,e)},on:{click:()=>this.$emit("input",e)}}),[e.toString()])},genItems(t){return this.items.map((e,r)=>t("li",{key:r},[isNaN(Number(e))?t("span",{class:"v-pagination__more"},[e.toString()]):this.genItem(t,e)]))},genList(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render(t){const e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}}),k=r("0fd9"),C=r("b974"),L=(r("8b37"),r("80d2")),N=Object(O["a"])(_["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes(){return{"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom,...this.themeClasses}}},methods:{genWrapper(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(L["f"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),T=r("8654"),M=r("71d9"),A=Object(p["a"])(h,n,i,!1,null,null,null);e["default"]=A.exports;g()(A,{VBtn:f["a"],VCard:m["a"],VCardActions:b["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCheckbox:v["a"],VCol:y["a"],VContainer:w["a"],VIcon:x["a"],VPagination:j,VRow:k["a"],VSelect:C["a"],VSimpleTable:N,VTextField:T["a"],VToolbar:M["a"]})},"8b37":function(t,e,r){},ab7d:function(t,e,r){"use strict";r("1219")},d444:function(t,e,r){"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */const n=r("3022"),i=r("fd8e"),s=t=>null!==t&&"object"===typeof t&&!Array.isArray(t),o=t=>e=>!0===t?Number(e):String(e),a=t=>"number"===typeof t||"string"===typeof t&&""!==t,c=t=>Number.isInteger(+t),l=t=>{let e=""+t,r=-1;if("-"===e[0]&&(e=e.slice(1)),"0"===e)return!1;while("0"===e[++r]);return r>0},u=(t,e,r)=>"string"===typeof t||"string"===typeof e||!0===r.stringify,h=(t,e,r)=>{if(e>0){let r="-"===t[0]?"-":"";r&&(t=t.slice(1)),t=r+t.padStart(r?e-1:e,"0")}return!1===r?String(t):t},p=(t,e)=>{let r="-"===t[0]?"-":"";r&&(t=t.slice(1),e--);while(t.length<e)t="0"+t;return r?"-"+t:t},d=(t,e)=>{t.negatives.sort((t,e)=>t<e?-1:t>e?1:0),t.positives.sort((t,e)=>t<e?-1:t>e?1:0);let r,n=e.capture?"":"?:",i="",s="";return t.positives.length&&(i=t.positives.join("|")),t.negatives.length&&(s=`-(${n}${t.negatives.join("|")})`),r=i&&s?`${i}|${s}`:i||s,e.wrap?`(${n}${r})`:r},g=(t,e,r,n)=>{if(r)return i(t,e,{wrap:!1,...n});let s=String.fromCharCode(t);if(t===e)return s;let o=String.fromCharCode(e);return`[${s}-${o}]`},f=(t,e,r)=>{if(Array.isArray(t)){let e=!0===r.wrap,n=r.capture?"":"?:";return e?`(${n}${t.join("|")})`:t.join("|")}return i(t,e,r)},m=(...t)=>new RangeError("Invalid range arguments: "+n.inspect(...t)),b=(t,e,r)=>{if(!0===r.strictRanges)throw m([t,e]);return[]},v=(t,e)=>{if(!0===e.strictRanges)throw new TypeError(`Expected step "${t}" to be a number`);return[]},y=(t,e,r=1,n={})=>{let i=Number(t),s=Number(e);if(!Number.isInteger(i)||!Number.isInteger(s)){if(!0===n.strictRanges)throw m([t,e]);return[]}0===i&&(i=0),0===s&&(s=0);let a=i>s,c=String(t),b=String(e),v=String(r);r=Math.max(Math.abs(r),1);let y=l(c)||l(b)||l(v),w=y?Math.max(c.length,b.length,v.length):0,x=!1===y&&!1===u(t,e,n),S=n.transform||o(x);if(n.toRegex&&1===r)return g(p(t,w),p(e,w),!0,n);let $={negatives:[],positives:[]},P=t=>$[t<0?"negatives":"positives"].push(Math.abs(t)),D=[],_=0;while(a?i>=s:i<=s)!0===n.toRegex&&r>1?P(i):D.push(h(S(i,_),w,x)),i=a?i-r:i+r,_++;return!0===n.toRegex?r>1?d($,n):f(D,null,{wrap:!1,...n}):D},w=(t,e,r=1,n={})=>{if(!c(t)&&t.length>1||!c(e)&&e.length>1)return b(t,e,n);let i=n.transform||(t=>String.fromCharCode(t)),s=(""+t).charCodeAt(0),o=(""+e).charCodeAt(0),a=s>o,l=Math.min(s,o),u=Math.max(s,o);if(n.toRegex&&1===r)return g(l,u,!1,n);let h=[],p=0;while(a?s>=o:s<=o)h.push(i(s,p)),s=a?s-r:s+r,p++;return!0===n.toRegex?f(h,null,{wrap:!1,options:n}):h},x=(t,e,r,n={})=>{if(null==e&&a(t))return[t];if(!a(t)||!a(e))return b(t,e,n);if("function"===typeof r)return x(t,e,1,{transform:r});if(s(r))return x(t,e,0,r);let i={...n};return!0===i.capture&&(i.wrap=!0),r=r||i.step||1,c(r)?c(t)&&c(e)?y(t,e,r,i):w(t,e,Math.max(Math.abs(r),1),i):null==r||s(r)?x(t,e,1,r):v(r,i)};t.exports=x},d60a:function(t,e){t.exports=function(t){return t&&"object"===typeof t&&"function"===typeof t.copy&&"function"===typeof t.fill&&"function"===typeof t.readUInt8}},eb9e:function(t,e,r){"use strict";
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
 */const n=r("eb9e"),i=(t,e,r)=>{if(!1===n(t))throw new TypeError("toRegexRange: expected the first argument to be a number");if(void 0===e||t===e)return String(t);if(!1===n(e))throw new TypeError("toRegexRange: expected the second argument to be a number.");let o={relaxZeros:!0,...r};"boolean"===typeof o.strictZeros&&(o.relaxZeros=!1===o.strictZeros);let a=String(o.relaxZeros),l=String(o.shorthand),u=String(o.capture),h=String(o.wrap),p=t+":"+e+"="+a+l+u+h;if(i.cache.hasOwnProperty(p))return i.cache[p].result;let d=Math.min(t,e),g=Math.max(t,e);if(1===Math.abs(d-g)){let r=t+"|"+e;return o.capture?`(${r})`:!1===o.wrap?r:`(?:${r})`}let f=b(t)||b(e),m={min:t,max:e,a:d,b:g},v=[],y=[];if(f&&(m.isPadded=f,m.maxLen=String(m.max).length),d<0){let t=g<0?Math.abs(g):1;y=c(t,Math.abs(d),m,o),d=m.a=0}return g>=0&&(v=c(d,g,m,o)),m.negatives=y,m.positives=v,m.result=s(y,v,o),!0===o.capture?m.result=`(${m.result})`:!1!==o.wrap&&v.length+y.length>1&&(m.result=`(?:${m.result})`),i.cache[p]=m,m.result};function s(t,e,r){let n=l(t,e,"-",!1,r)||[],i=l(e,t,"",!1,r)||[],s=l(t,e,"-?",!0,r)||[],o=n.concat(s).concat(i);return o.join("|")}function o(t,e){let r=1,n=1,i=d(t,r),s=new Set([e]);while(t<=i&&i<=e)s.add(i),r+=1,i=d(t,r);i=g(e+1,n)-1;while(t<i&&i<=e)s.add(i),n+=1,i=g(e+1,n)-1;return s=[...s],s.sort(h),s}function a(t,e,r){if(t===e)return{pattern:t,count:[],digits:0};let n=u(t,e),i=n.length,s="",o=0;for(let a=0;a<i;a++){let[t,e]=n[a];t===e?s+=t:"0"!==t||"9"!==e?s+=m(t,e,r):o++}return o&&(s+=!0===r.shorthand?"\\d":"[0-9]"),{pattern:s,count:[o],digits:i}}function c(t,e,r,n){let i,s=o(t,e),c=[],l=t;for(let o=0;o<s.length;o++){let t=s[o],e=a(String(l),String(t),n),u="";r.isPadded||!i||i.pattern!==e.pattern?(r.isPadded&&(u=v(t,r,n)),e.string=u+e.pattern+f(e.count),c.push(e),l=t+1,i=e):(i.count.length>1&&i.count.pop(),i.count.push(e.count[0]),i.string=i.pattern+f(i.count),l=t+1)}return c}function l(t,e,r,n,i){let s=[];for(let o of t){let{string:t}=o;n||p(e,"string",t)||s.push(r+t),n&&p(e,"string",t)&&s.push(r+t)}return s}function u(t,e){let r=[];for(let n=0;n<t.length;n++)r.push([t[n],e[n]]);return r}function h(t,e){return t>e?1:e>t?-1:0}function p(t,e,r){return t.some(t=>t[e]===r)}function d(t,e){return Number(String(t).slice(0,-e)+"9".repeat(e))}function g(t,e){return t-t%Math.pow(10,e)}function f(t){let[e=0,r=""]=t;return r||e>1?`{${e+(r?","+r:"")}}`:""}function m(t,e,r){return`[${t}${e-t===1?"":"-"}${e}]`}function b(t){return/^-?(0+)\d/.test(t)}function v(t,e,r){if(!e.isPadded)return t;let n=Math.abs(e.maxLen-String(t).length),i=!1!==r.relaxZeros;switch(n){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${n}}`:`0{${n}}`}}i.cache={},i.clearCache=()=>i.cache={},t.exports=i}}]);
//# sourceMappingURL=chunk-13852fb7.c9f919a8.js.map