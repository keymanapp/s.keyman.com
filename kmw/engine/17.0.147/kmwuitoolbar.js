(function(){var fe=Object.create;var P=Object.defineProperty;var he=Object.getOwnPropertyDescriptor;var pe=Object.getOwnPropertyNames;var ye=Object.getPrototypeOf,be=Object.prototype.hasOwnProperty;var ge=function(d,e){return function(){return e||d((e={exports:{}}).exports,e),e.exports}},ve=function(d,e){for(var i in e)P(d,i,{get:e[i],enumerable:!0})},S=function(d,e,i,t){if(e&&typeof e=="object"||typeof e=="function")for(var o=pe(e),r=0,n=o.length,a;r<n;r++)a=o[r],!be.call(d,a)&&a!==i&&P(d,a,{get:function(s){return e[s]}.bind(null,a),enumerable:!(t=he(e,a))||t.enumerable});return d},E=function(d,e,i){return S(d,e,"default"),i&&S(i,e,"default")},j=function(d,e,i){return i=d!=null?fe(ye(d)):{},S(e||!d||!d.__esModule?P(i,"default",{value:d,enumerable:!0}):i,d)};var R=ge(function(we,B){var D,F,I,x,H,W,U,G,z,V,X,Y,J,T,A,q,Q,Z,K,$,ee,te,oe,re,ie,ne,ae,se,O;(function(d){var e=typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:{};typeof define=="function"&&define.amd?define("tslib",["exports"],function(t){d(i(e,i(t)))}):typeof B=="object"&&typeof B.exports=="object"?d(i(e,i(B.exports))):d(i(e));function i(t,o){return t!==e&&(typeof Object.create=="function"?Object.defineProperty(t,"__esModule",{value:!0}):t.__esModule=!0),function(r,n){return t[r]=o?o(r,n):n}}})(function(d){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])};D=function(t,o){if(typeof o!="function"&&o!==null)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");e(t,o);function r(){this.constructor=t}t.prototype=o===null?Object.create(o):(r.prototype=o.prototype,new r)},F=Object.assign||function(t){for(var o,r=1,n=arguments.length;r<n;r++){o=arguments[r];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(t[a]=o[a])}return t},I=function(t,o){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&o.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)o.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r},x=function(t,o,r,n){var a=arguments.length,s=a<3?o:n===null?n=Object.getOwnPropertyDescriptor(o,r):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,o,r,n);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(s=(a<3?l(s):a>3?l(o,r,s):l(o,r))||s);return a>3&&s&&Object.defineProperty(o,r,s),s},H=function(t,o){return function(r,n){o(r,n,t)}},W=function(t,o,r,n,a,s){function l(w){if(w!==void 0&&typeof w!="function")throw new TypeError("Function expected");return w}for(var u=n.kind,f=u==="getter"?"get":u==="setter"?"set":"value",c=!o&&t?n.static?t:t.prototype:null,y=o||(c?Object.getOwnPropertyDescriptor(c,n.name):{}),p,h=!1,g=r.length-1;g>=0;g--){var _={};for(var v in n)_[v]=v==="access"?{}:n[v];for(var v in n.access)_.access[v]=n.access[v];_.addInitializer=function(w){if(h)throw new TypeError("Cannot add initializers after decoration has completed");s.push(l(w||null))};var N=(0,r[g])(u==="accessor"?{get:y.get,set:y.set}:y[f],_);if(u==="accessor"){if(N===void 0)continue;if(N===null||typeof N!="object")throw new TypeError("Object expected");(p=l(N.get))&&(y.get=p),(p=l(N.set))&&(y.set=p),(p=l(N.init))&&a.unshift(p)}else(p=l(N))&&(u==="field"?a.unshift(p):y[f]=p)}c&&Object.defineProperty(c,n.name,y),h=!0},U=function(t,o,r){for(var n=arguments.length>2,a=0;a<o.length;a++)r=n?o[a].call(t,r):o[a].call(t);return n?r:void 0},G=function(t){return typeof t=="symbol"?t:"".concat(t)},z=function(t,o,r){return typeof o=="symbol"&&(o=o.description?"[".concat(o.description,"]"):""),Object.defineProperty(t,"name",{configurable:!0,value:r?"".concat(r," ",o):o})},V=function(t,o){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(t,o)},X=function(t,o,r,n){function a(s){return s instanceof r?s:new r(function(l){l(s)})}return new(r||(r=Promise))(function(s,l){function u(y){try{c(n.next(y))}catch(p){l(p)}}function f(y){try{c(n.throw(y))}catch(p){l(p)}}function c(y){y.done?s(y.value):a(y.value).then(u,f)}c((n=n.apply(t,o||[])).next())})},Y=function(t,o){var r={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},n,a,s,l;return l={next:u(0),throw:u(1),return:u(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function u(c){return function(y){return f([c,y])}}function f(c){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,c[0]&&(r=0)),r;)try{if(n=1,a&&(s=c[0]&2?a.return:c[0]?a.throw||((s=a.return)&&s.call(a),0):a.next)&&!(s=s.call(a,c[1])).done)return s;switch(a=0,s&&(c=[c[0]&2,s.value]),c[0]){case 0:case 1:s=c;break;case 4:return r.label++,{value:c[1],done:!1};case 5:r.label++,a=c[1],c=[0];continue;case 7:c=r.ops.pop(),r.trys.pop();continue;default:if(s=r.trys,!(s=s.length>0&&s[s.length-1])&&(c[0]===6||c[0]===2)){r=0;continue}if(c[0]===3&&(!s||c[1]>s[0]&&c[1]<s[3])){r.label=c[1];break}if(c[0]===6&&r.label<s[1]){r.label=s[1],s=c;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(c);break}s[2]&&r.ops.pop(),r.trys.pop();continue}c=o.call(t,r)}catch(y){c=[6,y],a=0}finally{n=s=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}},J=function(t,o){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(o,r)&&O(o,t,r)},O=Object.create?function(t,o,r,n){n===void 0&&(n=r);var a=Object.getOwnPropertyDescriptor(o,r);(!a||("get"in a?!o.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(t,n,a)}:function(t,o,r,n){n===void 0&&(n=r),t[n]=o[r]},T=function(t){var o=typeof Symbol=="function"&&Symbol.iterator,r=o&&t[o],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(o?"Object is not iterable.":"Symbol.iterator is not defined.")},A=function(t,o){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),a,s=[],l;try{for(;(o===void 0||o-- >0)&&!(a=n.next()).done;)s.push(a.value)}catch(u){l={error:u}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(l)throw l.error}}return s},q=function(){for(var t=[],o=0;o<arguments.length;o++)t=t.concat(A(arguments[o]));return t},Q=function(){for(var t=0,o=0,r=arguments.length;o<r;o++)t+=arguments[o].length;for(var n=Array(t),a=0,o=0;o<r;o++)for(var s=arguments[o],l=0,u=s.length;l<u;l++,a++)n[a]=s[l];return n},Z=function(t,o,r){if(r||arguments.length===2)for(var n=0,a=o.length,s;n<a;n++)(s||!(n in o))&&(s||(s=Array.prototype.slice.call(o,0,n)),s[n]=o[n]);return t.concat(s||Array.prototype.slice.call(o))},K=function(t){return this instanceof K?(this.v=t,this):new K(t)},$=function(t,o,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=r.apply(t,o||[]),a,s=[];return a={},l("next"),l("throw"),l("return"),a[Symbol.asyncIterator]=function(){return this},a;function l(h){n[h]&&(a[h]=function(g){return new Promise(function(_,v){s.push([h,g,_,v])>1||u(h,g)})})}function u(h,g){try{f(n[h](g))}catch(_){p(s[0][3],_)}}function f(h){h.value instanceof K?Promise.resolve(h.value.v).then(c,y):p(s[0][2],h)}function c(h){u("next",h)}function y(h){u("throw",h)}function p(h,g){h(g),s.shift(),s.length&&u(s[0][0],s[0][1])}},ee=function(t){var o,r;return o={},n("next"),n("throw",function(a){throw a}),n("return"),o[Symbol.iterator]=function(){return this},o;function n(a,s){o[a]=t[a]?function(l){return(r=!r)?{value:K(t[a](l)),done:!1}:s?s(l):l}:s}},te=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=t[Symbol.asyncIterator],r;return o?o.call(t):(t=typeof T=="function"?T(t):t[Symbol.iterator](),r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r);function n(s){r[s]=t[s]&&function(l){return new Promise(function(u,f){l=t[s](l),a(u,f,l.done,l.value)})}}function a(s,l,u,f){Promise.resolve(f).then(function(c){s({value:c,done:u})},l)}},oe=function(t,o){return Object.defineProperty?Object.defineProperty(t,"raw",{value:o}):t.raw=o,t};var i=Object.create?function(t,o){Object.defineProperty(t,"default",{enumerable:!0,value:o})}:function(t,o){t.default=o};re=function(t){if(t&&t.__esModule)return t;var o={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&O(o,t,r);return i(o,t),o},ie=function(t){return t&&t.__esModule?t:{default:t}},ne=function(t,o,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof o=="function"?t!==o||!n:!o.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:o.get(t)},ae=function(t,o,r,n,a){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof o=="function"?t!==o||!a:!o.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?a.call(t,r):a?a.value=r:o.set(t,r),r},se=function(t,o){if(o===null||typeof o!="object"&&typeof o!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof t=="function"?o===t:t.has(o)},d("__extends",D),d("__assign",F),d("__rest",I),d("__decorate",x),d("__param",H),d("__esDecorate",W),d("__runInitializers",U),d("__propKey",G),d("__setFunctionName",z),d("__metadata",V),d("__awaiter",X),d("__generator",Y),d("__exportStar",J),d("__createBinding",O),d("__values",T),d("__read",A),d("__spread",q),d("__spreadArrays",Q),d("__spreadArray",Z),d("__await",K),d("__asyncGenerator",$),d("__asyncDelegator",ee),d("__asyncValues",te),d("__makeTemplateObject",oe),d("__importStar",re),d("__importDefault",ie),d("__classPrivateFieldGet",ne),d("__classPrivateFieldSet",ae),d("__classPrivateFieldIn",se)})});var k={};ve(k,{tslib:function(){return me}});E(k,j(R(),1));var me=j(R(),1);var M;if(!(!((M=keyman==null?void 0:keyman.ui)===null||M===void 0)&&M.name))try{if(b=keyman,m=b.util,m.isTouchDevice())throw"";_e=document.getElementById("KeymanWebControl"),le=function(){function d(){var e=this;this.init=!1,this.toolbarNode=null,this.backgroundNode=null,this.browseMapNode=null,this.keyboardsButtonNode=null,this.languageButtonsNode=null,this.offButtonNode=null,this.offBarNode=null,this.oskButtonNode=null,this.oskBarNode=null,this.selectorNode=null,this.regionLanguageListNodes={},this.regionsNode=null,this.regionNodes=null,this.langKeyboardNodes=[],this.langKeyboardListNodes=[],this.selectedRegion="as",this.listedKeyboards=[],this.catchAllRegion="un",this.keyboardListPriority=0,this.maxListedKeyboards=1,this.lastActiveControl=null,this.selectedKeyboard=null,this.selectedLanguage="",this.helpOffsetX=0,this.helpOffsetY=0,this.keyboardsForLangPopup=null,this.lastSelectedKeyboard=null,this.languages={},this.updateMap=!1,this.startTimer=0,this.lgText="",this.name="toolbar",this.ToolBar_Text={Keyboards:"Languages",OffTitle:"Turn off KeymanWeb keyboards",Off:"Off",ShowOSK:"Show On Screen Keyboard",LanguageSelector:"Select language",SelectKeyboardPre:"Select ",SelectKeyboardSuf:"keyboard",AltKeyboardsPre:"Alternate keyboards for ",AltKeyboardsSuf:"",ca:"Central America",sa:"South America",na:"Americas",eu:"Europe",af:"Africa",un:"Undetermined",as:"Asia",oc:"Oceania"},this.addKeyboardsToMap=function(){if(e.updateMap)e.updateMap=!1;else return;e.regionLanguageListNodes={};var i=b.getKeyboards();i.sort(e.sortKeyboards);var t=0;for(t=e.regionsNode.children.length;t>0;t--)e.regionsNode.children[t-1].className=="kmw_selector_region"&&e.regionsNode.removeChild(e.regionsNode.childNodes[t-1]);for(var o in e.regions){e.regionLanguageListNodes[o]=e.createNode("div",null,"kmw_selector_region");for(var r=e.createNode("div",null,"kmw_keyboard_col"),n=0,a=0,s="",l=0;l<i.length;l++){var u=i[l].RegionCode;if(e.regions[u]){if(u!=o)continue}else if(o!=e.catchAllRegion)continue;var f=b.util.getLanguageCodes(i[l].LanguageCode);f[0]!=s&&(s=f[0],n++)}n=Number(((n+3)/4).toFixed(0)),s="";for(var l=0;l<i.length;l++){var c=i[l].RegionCode;if(e.regions[c]){if(c!=o)continue}else if(o!=e.catchAllRegion)continue;var f=b.util.getLanguageCodes(i[l].LanguageCode);if(f[0]==s){var y=e.languages[s].keyboards;y.push?y.push(i[l]):e.languages[s].keyboards=y.concat(i[l]);continue}s=f[0],e.languages[s]={id:i[l].LanguageCode,name:i[l].LanguageName,keyboards:[i[l]]},a%n==0&&a>0&&(e.regionLanguageListNodes[o].appendChild(r),r=e.createNode("div",null,a/n==3?"kmw_keyboard_col_right":"kmw_keyboard_col")),a++;var p=e.createNode("div",null,"kmw_language"),h=e.createNode("a",null,null,i[l].LanguageName);h.href="#",h.onclick=function(v){return function(N){return e.selectLanguage(N,v)}}(e.languages[s]),p.appendChild(h),r.appendChild(p),t++}e.regionLanguageListNodes[o].appendChild(r),e.regionLanguageListNodes[o].appendChild(e.createNode("div",null,"kmw_clear")),e.regionsNode.appendChild(e.regionLanguageListNodes[o])}e.loadCookie(),e.selectRegion(null,e.selectedRegion),e.enableControls(),e.lastSelectedKeyboard&&e.changeKeyboardEvent(e.lastSelectedKeyboard),b.focusLastActiveElement()},this.sortKeyboards=function(i,t){return i.RegionCode<t.RegionCode?-2:i.RegionCode>t.RegionCode?2:i.LanguageName<t.LanguageName?-1:i.LanguageName>t.LanguageName?1:0},this.registerKeyboard=function(){e.updateMap=!0,e.startTimer&&clearTimeout(e.startTimer),e.startTimer=window.setTimeout(e.addKeyboardsToMap,0)},this.hideKeyboardsForLanguage=function(i){var t=e.keyboardsForLangPopup;return t&&(t.style.display="none"),e.CancelPopupDismissal(e.hideKeyboardsForLanguage),e.eventCapture(i)},this.showKeyboardsForLanguage=function(i,t){e.hideKeyboardsPopup(i);var o=e.langKeyboardListNodes[t.id];if(o){if(o.style.display=="block")return e.hideKeyboardsForLanguage(i);o.style.display="block",e.keyboardsForLangPopup=o,e.SetupPopupDismissal(o,e.hideKeyboardsForLanguage)}return e.eventCapture(i)},this.showOSK=function(i){var t=b.osk;if(!!t)return b.activatingUI(!0),t&&b.getActiveKeyboard()!=""&&(t.isEnabled()?t.hide():t.show(!0)),e.setLastFocus(),b.activatingUI(!1),e.eventCapture(i)},this.offButtonClickEvent=function(i){if(e.toolbarNode.className!="kmw_controls_disabled"){if(e.hideKeyboardsForLanguage(null),e.selectedLanguage){var t=e.findListedKeyboard(e.selectedLanguage);t!=null&&(e.listedKeyboards[t].buttonNode.className="kmw_button")}e.selectedKeyboard=null,e.selectedLanguage=null,e.offButtonNode.className="kmw_button_selected"}return e.setLastFocus(),b.setActiveKeyboard("",""),e.saveCookie(),e.enableControls(),e.eventCapture(i)},this.eventCapture=function(i){return i||(i=window.event),window.event&&(window.event.returnValue=!1),i&&(i.cancelBubble=!0),!1},this.selectRegion=function(i,t){var o=e.browseMapNode;return o&&(o.className="kmw_browsemap_"+t,typeof e.regionLanguageListNodes[t]=="undefined"&&(e.updateMap=!0,e.addKeyboardsToMap()),e.regionLanguageListNodes[t].style.display="block",e.regionNodes[t].className="selected",e.selectedRegion!=null&&e.selectedRegion!=t&&(e.regionLanguageListNodes[e.selectedRegion].style.display="none",e.regionNodes[e.selectedRegion].className=""),e.selectedRegion=t),e.eventCapture(i)},this.unhoverRegion=function(i,t){return e.browseMapNode.className=e.selectedRegion==null?"":"kmw_browsemap_"+e.selectedRegion,e.regionNodes[t].className=e.selectedRegion==t?"selected":"",e.eventCapture(i)},this.hoverRegion=function(i,t){return e.browseMapNode.className="kmw_browsemap_"+t+"_sel",e.regionNodes[t].className="hover",e.eventCapture(i)},this.focusControlEvent=function(i){if(!e.init)return!0;var t=i.target;if(t.tagName.toLowerCase()=="textarea"||t.tagName.toLowerCase()=="input"&&t.type.toLowerCase()=="text")if(e.lastActiveControl=t,e.pluck(t,"kmw_disable"))e.toolbarNode.className!="kmw_controls_disabled"&&(e.toolbarNode.className="kmw_controls_disabled");else{if(e.selectedKeyboard!=null)if(b.isCJK())e.oskButtonNode.style.display=e.oskBarNode.style.display="none";else{var o=b.osk;e.oskButtonNode.className=o&&o.isEnabled()?"kmw_button_selected":"kmw_button"}e.toolbarNode.className!=""&&(e.toolbarNode.className="");var r=void 0,n=void 0;t.KMW_HelpOffsetX?r=t.KMW_HelpOffsetX:r=64,t.KMW_HelpOffsetY?n=t.KMW_HelpOffsetY:n=0,e.helpOffsetX=m.getAbsoluteX(t)+r,e.helpOffsetY=m.getAbsoluteY(t)+t.offsetHeight+n}return!0},this.blurControlEvent=function(){return e.init&&e.oskButtonNode.style.display!="none"&&(e.oskButtonNode.className="kmw_button_disabled"),!0},this.changeKeyboardEvent=function(i){e.lastSelectedKeyboard=null;var t=i.internalName,o=b.util.getLanguageCodes(i.languageCode)[0];if(o!=""&&t!=""){var r=e.languages[o];if(r!=null){for(var n=0;n<r.keyboards.length;n++)if(r.keyboards[n].InternalName==t)return e.selectKeyboard(null,r,r.keyboards[n],!1),!0}e.lastSelectedKeyboard=(0,k.__assign)({},i)}return!0},this.onShowOSK=function(i){return e.init&&(e.oskButtonNode.className="kmw_button_selected"),i},this.onHideOSK=function(i){e.init&&i.HiddenByUser&&(e.oskButtonNode.className="kmw_button")},this.showKeyboardsPopup=function(i){return e.addKeyboardsToMap(),e.toolbarNode.className=="kmw_controls_disabled"?e.eventCapture(i):(e.hideKeyboardsForLanguage(null),e.selectorNode.className=="kmw_over"?e.hideKeyboardsPopup(i):(e.selectorNode.className="kmw_over",e.keyboardsButtonNode.className="kmw_button_selected",e.SetupPopupDismissal(e.selectorNode,e.hideKeyboardsPopup),e.eventCapture(i)))},this.hideKeyboardsPopup=function(i){return e.selectorNode.className="",e.keyboardsButtonNode.className="kmw_button",e.CancelPopupDismissal(e.hideKeyboardsPopup),e.eventCapture(i)},this.hideAllPopups=function(i){var t=e.keyboardsForLangPopup;return(!t||t.style.display=="none")&&e.selectorNode.className==""?!0:(e.hideKeyboardsPopup(i),e.hideKeyboardsForLanguage(i),e.eventCapture(i))},this.dismissalCallback=null,this.popupElement=null,this.lastDismissalCallback=null,this.PopupDismissal=function(i){var t=i&&i.target||window.event&&window.event.srcElement;if(t)for(;t.parentElement;){if(t==e.popupElement)return null;t=t.parentElement}return t.nodeName=="#document"&&e.hideAllPopups(i),e.dismissalCallback}}return d.prototype.createNode=function(e,i,t,o){var r=document.createElement(e);return i&&(r.id=i),t&&(r.className=t),o&&(r.innerHTML=o),(e=="a"||e=="area"||e=="map")&&(r.ondragstart=function(){return!1}),r},d.prototype.initialize=function(){var e=this;if(!(!b.initialized||this.init)){var i=document.getElementById("KeymanWebControl");if(!i){if(document.body==null)return;i=document.createElement("div"),i.id="KeymanWebControl",document.body.insertBefore(i,document.body.firstChild),this._insertedElem=i}if(i.style.visibility="hidden",i.style.maxHeight="35px",this.init=!0,!m.isTouchDevice()){this.regions={},this.regions.na={t:this.ToolBar_Text.na,m:"0,3,0,37,24,32,35,37,43,47,49,52,65,54,68,57,71,56,73,59,75,60,93,61,93,57,103,49,118,41,126,41,136,23,148,17,156,14,164,5,164,0,57,0,35,5,25,9,5,8,49,52,65,54,68,57,71,56,73,59,75,60,93,61,94,58,97,58,101,59,107,60,114,64,115,68,114,77,104,74,98,75,96,78,95,82,90,81,85,80,82,76,78,74,74,73,65,68,57,61,82,82,95,82,96,78,98,75,104,74,114,77,120,79,124,83,126,87,141,90,142,97,138,103,135,113,127,116,123,124,115,131,112,132,109,138,117,139,140,141,141,146,134,148,114,145,109,148,100,148,91,143,91,130,96,111,89,102,83,95,77,89"},this.regions.eu={t:this.ToolBar_Text.eu,m:"145,29,146,19,158,14,171,6,187,2,206,1,217,4,227,11,231,16,231,33,227,34,225,35,225,37,227,39,228,44,228,47,227,48,223,46,218,44,215,43,208,43,203,45,202,48,205,52,201,52,195,49,189,50,187,48,177,48,175,49,166,50,147,33"},this.regions.af={t:this.ToolBar_Text.af,m:"150,58,158,50,166,50,175,49,177,48,187,48,189,50,195,49,201,52,205,52,207,53,221,75,229,75,231,77,231,85,227,92,232,101,237,106,237,112,227,115,222,118,206,125,199,127,193,127,185,111,183,104,180,87,168,89,153,85,143,71,147,60"},this.regions.as={t:this.ToolBar_Text.as,m:"219,1,221,6,228,12,231,16,231,33,227,34,225,35,225,37,227,39,229,45,232,48,239,48,240,49,239,53,242,60,243,65,249,70,252,81,259,87,271,87,278,95,289,100,303,101,311,98,320,98,323,98,323,84,311,81,308,73,307,65,317,57,330,50,334,44,348,36,364,38,375,34,375,8,355,8,336,5,292,1,285,0,219,0"},this.regions.oc={t:this.ToolBar_Text.oc,m:"288,117,289,107,303,101,311,98,323,98,323,84,333,77,344,73,362,80,369,88,375,96,375,141,352,143,323,142,316,136,310,130,291,130"},this.regions.un={t:this.ToolBar_Text.un,m:"205,52,202,48,203,45,208,43,215,43,218,44,223,46,227,48,232,48,239,48,240,49,239,53,242,60,243,65,237,76,231,77,229,75,221,75,207,53"},this.toolbarNode=this.createNode("div","kmw_controls"),this.toolbarNode.style.display="block",m.linkStyleSheet(m.getOption("resources")+"ui/toolbar/kmwuitoolbar.css");var t=this.createNode("a","kmw_controls_start",null," ");t.href="https://keyman.com/developer/keymanweb/",t.target="_blank",this.toolbarNode.appendChild(t),this.keyboardsButtonNode=this.createNode("div","kmw_btn_keyboards","kmw_button"),this.keyboardsButtonNode.title=this.ToolBar_Text.LanguageSelector;var o=this.createNode("a",null,"kmw_button_a");o.href="#",o.onclick=this.showKeyboardsPopup,o.appendChild(this.createNode("div","kmw_img_keyboards","kmw_img")),o.appendChild(this.createNode("div",null,"kmw_a",this.ToolBar_Text.Keyboards)),o.appendChild(this.createNode("div",null,"kmw_drop")),this.keyboardsButtonNode.appendChild(o),this.selectorNode=this.createNode("div","kmw_selector"),this.regionsNode=this.createNode("div","kmw_selector_regions"),this.browseMapNode=this.createNode("div","kmw_browsemap");var r=this.createNode("img","kmw_region_browsemap");r.src=m.getOption("resources")+"ui/toolbar/blank.gif",r.useMap="#kmw_worldgrey16",this.browseMapNode.appendChild(r);var n=this.createNode("map","kmw_worldgrey16");n.name="kmw_worldgrey16";for(var a in this.regions){var s=this.createNode("area");s.shape="poly",s.alt="",s.href="#",s.title=this.regions[a].t,s.hidefocus="true",s.onclick=function(y){return function(p){return e.selectRegion(p,y)}}(a),s.onmouseover=function(y){return function(p){return e.hoverRegion(p,y)}}(a),s.onmouseout=function(y){return function(p){return e.unhoverRegion(p,y)}}(a),s.coords=this.regions[a].m,n.appendChild(s)}var l=this.createNode("area");l.shape="default",l.noHref=!0,l.alt="",l.onclick=this.eventCapture,n.appendChild(l),this.browseMapNode.appendChild(n),this.regionsNode.appendChild(this.browseMapNode),this.regionNodes={};var u=this.createNode("ul");for(var a in this.regions){var f=this.createNode("li");this.regionNodes[a]=this.createNode("a",null,null,this.regions[a].t),this.regionNodes[a].href="#",this.regionNodes[a].onclick=function(p){return function(h){return e.selectRegion(h,p)}}(a),this.regionNodes[a].onmouseover=function(p){return function(h){return e.hoverRegion(h,p)}}(a),this.regionNodes[a].onmouseout=function(p){return function(h){return e.unhoverRegion(h,p)}}(a),f.appendChild(this.regionNodes[a]),u.appendChild(f)}this.regionsNode.appendChild(u),this.selectorNode.appendChild(this.regionsNode),this.keyboardsButtonNode.appendChild(this.selectorNode),this.toolbarNode.appendChild(this.keyboardsButtonNode),this.toolbarNode.appendChild(this.offBarNode=this.createNode("div","kmw_bar_off","kmw_bar")),this.offButtonNode=this.createNode("div","kmw_btn_off","kmw_button_selected"),o=this.createNode("a",null,"kmw_button_a"),o.href="#",o.onclick=this.offButtonClickEvent,o.title=this.ToolBar_Text.OffTitle,o.appendChild(this.createNode("div","kmw_img_off","kmw_img")),o.appendChild(this.createNode("div",null,"kmw_a",this.ToolBar_Text.Off)),this.offButtonNode.appendChild(o),this.toolbarNode.appendChild(this.offButtonNode),this.toolbarNode.appendChild(this.languageButtonsNode=this.createNode("div","kmw_control_keyboards","kmw_button")),this.toolbarNode.appendChild(this.oskBarNode=this.createNode("div","kmw_bar_osk","kmw_bar")),this.oskButtonNode=this.createNode("div","kmw_btn_osk","kmw_button"),o=this.createNode("a",null,"kmw_button_a"),o.href="#",o.onclick=this.showOSK,o.onmousedown=function(){b.activatingUI(!0)},o.title=this.ToolBar_Text.ShowOSK,o.appendChild(this.createNode("div","kmw_img_osk","kmw_img")),this.oskButtonNode.appendChild(o),this.toolbarNode.appendChild(this.oskButtonNode),this.toolbarNode.appendChild(this.createNode("div","kmw_controls_end",null," "));var c=this.createNode("div");c.id="kmw_map_preload",this.toolbarNode.appendChild(c),this.toolbarNode.appendChild(this.createNode("br",null,"kmw_clear")),i.appendChild(this.toolbarNode),this.updateMap=!0,this.startTimer&&clearTimeout(this.startTimer),this.startTimer=window.setTimeout(this.addKeyboardsToMap,0),m.attachDOMEvent(document.body,"click",this.hideAllPopups,!1),this.selectedRegion="eu",this.registerEvents(),b.focusLastActiveElement()}}},d.prototype.shutdown=function(){var e=this.toolbarNode;e&&e.parentNode.removeChild(e),e=this._insertedElem,e&&e.parentNode.removeChild(e)},d.prototype.findListedKeyboard=function(e){typeof e!="string"&&(e=e.id);for(var i=0;i<this.listedKeyboards.length;i++)if(this.listedKeyboards[i].lang.id==e)return i;return null},d.prototype.addKeyboardToList=function(e,i){var t=this,o=this.findListedKeyboard(e);if(o==null){if(this.listedKeyboards.length>=this.maxListedKeyboards){for(var r=2147483647,n=null,a=0;a<this.listedKeyboards.length;a++)this.listedKeyboards[a].priority<r&&(n=a,r=this.listedKeyboards[a].priority);if(n!=null){var s=this.listedKeyboards[n];this.langKeyboardListNodes[s.lang.id]=null,this.langKeyboardNodes[s.lang.id]=null,this.languageButtonsNode.removeChild(s.buttonNode),n==0?this.listedKeyboards=this.listedKeyboards.slice(n+1):n==this.listedKeyboards.length-1?this.listedKeyboards=this.listedKeyboards.slice(0,n):this.listedKeyboards=this.listedKeyboards.slice(0,n).concat(this.listedKeyboards.slice(n+1))}}var l=this.createNode("div",null,"kmw_button"),u=this.createNode("a",null,"kmw_button_a"+(e.keyboards.length>1?" kmw_norightgap":""));u.href="#";var f=this.ToolBar_Text.SelectKeyboardPre+i.Name,c=this.ToolBar_Text.SelectKeyboardSuf;f.toLowerCase().indexOf(c.toLowerCase())<0&&(f=f+" "+c),u.title=f,u.onclick=function(L){return t.selectLanguage(L,e)},u.appendChild(this.createNode("div","kmw_img_kbd","kmw_img")),this.lgText=this.truncate(e.name,28),u.appendChild(this.createNode("div",null,"kmw_a",this.lgText)),l.appendChild(u);var y=u;if(e.keyboards.length>1){u=this.createNode("a",null,"kmw_button_a kmw_noleftgap"),u.href="#",u.title=this.ToolBar_Text.AltKeyboardsPre+e.name+this.ToolBar_Text.AltKeyboardsSuf,u.onclick=function(L){return t.showKeyboardsForLanguage(L,e)};var p=this.createNode("div",null,"kmw_a"),h=this.truncate(i.Name.replace(/\s?keyboard/i,""),40-this.lgText.length);p.appendChild(this.langKeyboardNodes[e.id]=this.createNode("span",null,"kmw_kbd",h)),u.appendChild(p),u.appendChild(this.createNode("div",null,"kmw_drop")),l.appendChild(u),this.langKeyboardListNodes[e.id]=this.createNode("ul",null,"kmw_selector_kbd"),this.langKeyboardListNodes[e.id].style.display="none";for(var g in e.keyboards){var _=this.createNode("li");h=e.keyboards[g].Name.replace(/\s?keyboard/i,""),h=h+" ["+e.keyboards[g].LanguageCode+"]",u=this.createNode("a",null,null,h),u.href="#",u.title="",u.onclick=function(L,ue){return function(ce){return t.selectKeyboard(ce,L,ue,!0)}}(e,e.keyboards[g]),_.appendChild(u),this.langKeyboardListNodes[e.id].appendChild(_)}l.appendChild(this.langKeyboardListNodes[e.id])}this.languageButtonsNode.appendChild(l);var v=e,N=l;this.listedKeyboards.push({priority:this.keyboardListPriority++,lang:v,keyboard:i,buttonNode:N,aNode:y})}else{this.listedKeyboards[o].priority=this.keyboardListPriority++,this.listedKeyboards[o].keyboard=i;var w=this.langKeyboardNodes[e.id];if(w){var de=i.Name.replace(/\s?keyboard/i,"");w.innerHTML=this.truncate(de,40-this.lgText.length)}if(this.listedKeyboards[o].aNode){var f=this.ToolBar_Text.SelectKeyboardPre+i.Name,c=this.ToolBar_Text.SelectKeyboardSuf;f.toLowerCase().indexOf(c.toLowerCase())<0&&(f=f+" "+c),this.listedKeyboards[o].aNode.title=f}}},d.prototype.truncate=function(e,i){return e.length<=i?e:e.substr(0,i-1)+"\u2026"},d.prototype.selectLanguage=function(e,i){var t=this.findListedKeyboard(i),o=null;return t==null?o=i.keyboards[0]:o=this.listedKeyboards[t].keyboard,o?this.selectKeyboard(e,i,o,!0):!1},d.prototype.selectKeyboard=function(e,i,t,o){if(b.activatingUI(!0),this.selectedLanguage){var r=this.findListedKeyboard(this.selectedLanguage);r!=null&&(this.listedKeyboards[r].buttonNode.className="kmw_button")}return this.offButtonNode.className="kmw_button",this.selectedKeyboard=t,this.selectedLanguage=t.LanguageCode,this.setLastFocus(),this.addKeyboardToList(i,t),o&&b.setActiveKeyboard(t.InternalName,t.LanguageCode),this.listedKeyboards[this.findListedKeyboard(i)].buttonNode.className="kmw_button_selected",this.saveCookie(),this.enableControls(),b.activatingUI(!1),this.hideKeyboardsPopup(e)||this.hideKeyboardsForLanguage(e)},d.prototype.enableControls=function(){var e=[this.offButtonNode,this.offBarNode,this.oskButtonNode,this.oskBarNode],i=!1;if(b.isCJK(this.selectedKeyboard)?i=!0:this.selectedKeyboard==null&&(i=e[2].style.display=="none"),this.selectedKeyboard!=null||this.listedKeyboards.length>0)for(var t=0;t<e.length;t++)e[t].style.display="";else for(var t=0;t<e.length;t++)e[t].style.display="none";return i?this.oskButtonNode.style.display=this.oskBarNode.style.display="none":this.selectedKeyboard==null&&(this.oskButtonNode.className="kmw_button_disabled"),this.toolbarNode.parentElement.style.visibility="visible",!0},d.prototype.setLastFocus=function(){b.focusLastActiveElement()},d.prototype.pluck=function(e,i){return e.getAttribute&&e.getAttribute(i)||e[i]},d.prototype.registerEvents=function(){var e=b.osk;!e||(e.addEventListener("show",this.onShowOSK),e.addEventListener("hide",this.onHideOSK))},d.prototype.SetupPopupDismissal=function(e,i){this.PopupDismissal==document.onclick&&this.CancelPopupDismissal(this.dismissalCallback),this.dismissalCallback=i,this.popupElement=e,this.lastDismissalCallback=document.onclick,document.onclick=this.PopupDismissal},d.prototype.CancelPopupDismissal=function(e){this.PopupDismissal==document.onclick&&(document.onclick=this.lastDismissalCallback,this.lastDismissalCallback=null,this.dismissalCallback=null,this.popupElement=null)},d.prototype.loadCookie=function(){var e="",i="",t=m.loadCookie("KeymanWeb_Keyboard");t.current!=null&&(e=t.current.split(":")[0]);var o=m.loadCookie("KeymanWeb_Toolbar");if(o.region!=null&&(this.selectedRegion=o.region),o.maxrecent!=null){for(var r=0;r<o.maxrecent;r++)if(o["recent"+r]!=null){var n=o["recent"+r].split(",");if(n.length==2){var a=this.languages[n[0]];if(a!=null){for(var s=0;s<a.keyboards.length;s++)if(a.keyboards[s].InternalName==n[1]){if(this.addKeyboardToList(a,a.keyboards[s]),a.keyboards[s].InternalName==e){this.selectKeyboard(null,a,a.keyboards[s],!0),window.focus(),this.setLastFocus();break}break}}}}}else{var l=b.getActiveKeyboard(),u=b.getActiveLanguage();if(u!=""&&l!=""){var f=this.languages[u];if(f!=null)for(var s=0;s<f.keyboards.length;s++)f.keyboards[s].InternalName==l&&(this.selectKeyboard(null,f,f.keyboards[s],!0),window.focus(),this.setLastFocus())}}},d.prototype.saveCookie=function(){var e={region:this.selectedRegion,maxrecent:this.listedKeyboards.length};e.region=this.selectedRegion,e.maxrecent=this.listedKeyboards.length;for(var i=0;i<this.listedKeyboards.length;i++)e["recent"+i]=this.listedKeyboards[i].lang.id+","+this.listedKeyboards[i].keyboard.InternalName;m.saveCookie("KeymanWeb_Toolbar",e)},d}(),C=b.ui=new le,b.addEventListener("keyboardregistered",C.registerKeyboard),b.addEventListener("controlfocused",C.focusControlEvent),b.addEventListener("controlblurred",C.blurControlEvent),b.addEventListener("keyboardchange",C.changeKeyboardEvent),C.initialize()}catch(d){}var b,m,_e,le,C;})();
//# sourceMappingURL=kmwuitoolbar.js.map