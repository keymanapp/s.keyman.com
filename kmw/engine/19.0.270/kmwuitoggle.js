(()=>{var m=Object.defineProperty;var h=(a,b)=>m(a,"name",{value:b,configurable:!0});function p(a,b,u,y){function f(e){return e instanceof u?e:new u(function(t){t(e)})}return h(f,"adopt"),new(u||(u=Promise))(function(e,t){function n(s){try{o(y.next(s))}catch(c){t(c)}}h(n,"fulfilled");function r(s){try{o(y.throw(s))}catch(c){t(c)}}h(r,"rejected");function o(s){s.done?e(s.value):f(s.value).then(n,r)}h(o,"step"),o((y=y.apply(a,b||[])).next())})}h(p,"__awaiter");var _,i=window.keyman;if(i){if(!(!((_=i.ui)===null||_===void 0)&&_.name))try{let a=i.util;if(a.isTouchDevice())throw"";let y=class y{constructor(){this.name="toggle",this.initialized=!1,this.controller=null,this.oskButton=null,this.kbdButton=null,this.controllerHovered=!1,this.keyboards=[],this.lastActiveKeyboard=-1,this.selectedMenuItem=null,this.updateList=!0,this.updateTimer=null,this.switchOsk=()=>{if(!(i.getActiveKeyboard()==""||i.isCJK())&&i.osk){let e=!i.osk.isEnabled();i.osk.show(e),this.oskButton._setSelected(e)}},this.switchSingleKbd=()=>p(this,void 0,void 0,function*(){let e=i.getActiveKeyboard()=="",t=0,n="",r="";if(e){if(this.keyboards.length==0)return;this.lastActiveKeyboard<this.keyboards.length&&this.lastActiveKeyboard>=0&&(t=this.lastActiveKeyboard),n=this.keyboards[t]._InternalName,r=this.keyboards[t]._LanguageCode,yield i.setActiveKeyboard(n,r),this.lastActiveKeyboard=t}else yield i.setActiveKeyboard("");this.kbdButton&&this.kbdButton._setSelected(e)}),this.switchNextKbd=()=>p(this,void 0,void 0,function*(){let e=i.getActiveKeyboard()=="",t="",n="";if(e){if(this.keyboards.length==0)return;t=this.keyboards[0]._InternalName,n=this.keyboards[0]._LanguageCode,yield i.setActiveKeyboard(t,n),this.lastActiveKeyboard=0}else this.lastActiveKeyboard==this.keyboards.length-1?(yield i.setActiveKeyboard(""),e=!1):(t=this.keyboards[++this.lastActiveKeyboard]._InternalName,n=this.keyboards[this.lastActiveKeyboard]._LanguageCode,yield i.setActiveKeyboard(t,n),e=!0);this.kbdButton&&this.kbdButton._setSelected(e)}),this.updateKeyboardList=()=>{if(!(i.initialized||this.initialized))return;this.updateList=!1;let e=i.getKeyboards(),t=a.getOption("resources")+"ui/toggle/";if(e.length>1){let o=document.getElementById("KMW_Controller_Img");o.src=t+"kmw_logo_16_down.gif",o.style.width="100%",this.controller.style.background="url("+t+"kmwcontroller2x.gif)",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="36px",this.kbdButton._onmouseover=()=>{this.keyboardMenu.className="sfhover"},this.kbdButton._onmouseout=()=>{this.keyboardMenu.className="sfunhover"},this.kbdButton._onclick=null,this.createMenu()}else if(e.length==1){let o=document.getElementById("KMW_Controller_Img");o.src=t+"kmw_logo_16.gif",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="24px";let s=e[0].InternalName,c=e[0].LanguageCode;this.controller.style.background="url("+t+"kmwcontroller2.gif)",this.keyboards.push({_InternalName:s,_LanguageCode:c,_Index:0}),this.kbdButton._onclick=this.switchSingleKbd,this.kbdButton._onmouseover=function(){},this.kbdButton._onmouseout=function(){},this.createMenu(),typeof this.keyboardMenu!="undefined"&&delete this.keyboardMenu}let n=i.getActiveKeyboard(),r="";if(n)r=i.getActiveLanguage();else{let o=i.getSavedKeyboard().split(":");n=o[0],r=o[1]}this.updateMenu(n,r)}}doFocus(e,t,n){if(!this.initialized)return;window.event&&i.isAttached(window.event.srcElement)&&(e=window.event.srcElement),t?this.controller.style.display="block":!i.getUIState().activationPending&&!this.controllerHovered&&(this.controller.style.display="none");let r,o,s=a.getAbsolute(e),c=s.x,l=s.y,d=e.ownerDocument;d.designMode=="on"&&d.defaultView&&d.defaultView.frameElement?(r=d.defaultView.frameElement.clientWidth,o=d.defaultView.frameElement.clientHeight):(r=e.offsetWidth,o=e.offsetHeight),c+r>window.innerWidth+document.documentElement.scrollLeft-this.controller.offsetWidth-1?l+=o:(c+=r+2,l+=o-29),!(isNaN(c)||isNaN(l))&&(this.controller.style.left=c+"px",this.controller.style.top=l+"px")}registerEvents(){let e=i.osk;e&&(e.addEventListener("show",t=>(this.controller.style.display="block",this.oskButton._setSelected(!0),t)),e.addEventListener("hide",t=>{t.HiddenByUser&&this.oskButton._setSelected(!1)}))}button(e,t,n){let r=this,s=class s{getElem(){return this._elem}__updatestyle(){let l=this._elem.style;this._over?(l.margin="0px",this._selected?(l.border="solid 1px #ad4a28",l.background="#dfb4b4"):(l.border="solid 1px #dfb4b4",l.background="#f3e5de")):this._selected?(l.background="#f3e5de",l.margin="0px",l.border="solid 1px #ad4a28"):(l.background="none",l.margin="1px",l.border="none")}_setSelected(l){i.activatingUI(!1),this._selected=l,this.__updatestyle()}_getSelected(){return this._selected}_getOver(){return this._over}_getDown(){return this._down}constructor(){this._onclick=null,this._onmouseover=null,this._onmouseout=null,this._down=!1,this._over=!1,this.__mouseover=()=>{r.controllerHovered=!0,this._over=!0,this._onmouseover!=null&&this._onmouseover(),this.__updatestyle()},this.__mouseout=()=>{r.controllerHovered=!1,this._over=!1,this._onmouseout!=null&&this._onmouseout(),this.__updatestyle()},this.__click=()=>(i.activatingUI(!1),this._onclick!=null?this._onclick():!1),this.__mousedown=()=>(i.activatingUI(!0),this._down=!0,this.__updatestyle(),!1),this.__mouseup=()=>{this._down=!1,this.__updatestyle()},this._selected=n;let l=a.getOption("resources")+"ui/toggle/",d=a.createElement("img");this._elem=a.createElement("div"),this._elem._owningObject=this,d.style.display="block",d.src=l+e,d.id="KMW_Controller_Img",this._elem.style.margin="0px",this._elem.style.width="24px",this._elem.style.height="24px",this._elem.style.zIndex="10002",this._elem.style.lineHeight="100%",this._elem.style.cssFloat="left",d.title=t,d.alt=t,this._elem.appendChild(d),this._elem.onmouseover=this.__mouseover,this._elem.onmouseout=this.__mouseout,this._elem.onmousedown=this.__mousedown,this._elem.onmouseup=this.__mouseup,d._owningObject=this,d.onclick=this.__click,this.__updatestyle()}};h(s,"Button");let o=s;return new o}initialize(){if(!i.initialized||a.isTouchDevice())return;this.initialized?this.controller.innerHTML="":this.controller=a.createElement("div");let e=a.getOption("resources")+"ui/toggle/";this.controller.style.background="url("+e+"kmwcontroller2x.gif)",this.controller.style.padding="1px 2px";let t=a.loadCookie("KeymanWeb_Keyboard"),n=!1;typeof t.current!="undefined"&&(n=t.current.indexOf("---")<0),this.kbdButton=this.button("kmw_logo_16.gif","Use Web Keyboard",n),this.controller.appendChild(this.kbdButton.getElem());let r=a.loadCookie("KeymanWeb_OnScreenKeyboard"),o=!0;typeof r.visible!="undefined"&&(o=r.visible==1),this.oskButton=this.button("kmw_osk_16.gif","Show On Screen Keyboard",o),this.oskButton._onclick=this.switchOsk,this.controller.appendChild(this.oskButton.getElem()),this.initialized||(this.controller.style.display="none"),this.controller.style.zIndex="10001",this.controller.style.position="absolute",this.initialized||document.body.appendChild(this.controller),this.initialized=!0,this.updateKeyboardList(),this.registerEvents(),a.addStyleSheet(this.stylingCSS)}shutdown(){let e=this.controller;e&&e.parentNode.removeChild(e)}selectKbd(e){return p(this,void 0,void 0,function*(){let t,n;return e<0?(t="",n=""):(t=this.keyboards[e]._InternalName,n=this.keyboards[e]._LanguageCode),yield i.setActiveKeyboard(t,n),i.focusLastActiveElement(),this.kbdButton._setSelected(t!=""),e>=0&&(this.lastActiveKeyboard=e),!1})}updateMenu(e,t){let n=document.getElementById("KMWSel_$");for(let r=0;r<this.keyboards.length;r++)this.keyboards[r]._InternalName==e&&this.keyboards[r]._LanguageCode==t&&(n=document.getElementById("KMWSel_"+this.keyboards[r]._InternalName+"$"+this.keyboards[r]._Index));n&&(this.selectedMenuItem!=null&&(this.selectedMenuItem.className=""),n.className="selected",this.selectedMenuItem=n),this.oskButton&&(t=="cmn"||t=="jpn"||t=="kor"?this.oskButton.getElem().style.display="none":e==""?this.oskButton.getElem().style.display="none":this.oskButton.getElem().style.display="block")}get stylingCSS(){return`
#KeymanWeb_KbdList {
  display: block;
  position: absolute;
  width: auto;
  line-height: 100%;
  margin: 0;
  clear: both;
  float: none;
  top: auto;
  border: solid 2px #ad4a28;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  box-shadow: 4px 4px 2px rgba(136,136,136,.5);
  -webkit-box-shadow: 4px 4px 2px rgba(136,136,136,.5);
  -moz-box-shadow: 4px 4px 2px rgba(136,136,136,.5);
  list-style: none;
  padding: 0;
  background: white;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  z-index: 10001; /* above the osk */
}

.sfunhover#KeymanWeb_KbdList {
  display: none; left: -999px;
}

.sfhover#KeymanWeb_KbdList {
  display: block;
  left: auto;
}

#KeymanWeb_KbdList li {
  float: none;
  width: auto;
  padding: 0;
  margin: 0;
  text-align: left;
}

#KeymanWeb_KbdList li a {
  display: block;
  padding: 2px 4px;
  color: #404040;
  font-family: Tahoma,Verdana,Arial,sans-serif;
  font-size: 8pt;
  text-decoration: none;
}

#KeymanWeb_KbdList li a.selected {
  font-weight: bold;
  color: black;
}

#KeymanWeb_KbdList li a:hover {
  color: white;
  background-color: #ad4a28;
  text-decoration: underline;
}
`}createMenuItem(e,t,n,r){let o=a.createElement("li"),s=a.createElement("a");return s.innerHTML=n,s.href="#",s.onclick=(c=>()=>this.selectKbd(c))(e),s.id=t,r&&(s.className="selected"),o.appendChild(s),{li:o,a:s}}createMenu(){typeof this.keyboardMenu=="undefined"?(this.keyboardMenu=a.createElement("ul"),this.keyboardMenu.id="KeymanWeb_KbdList",this.keyboardMenu.className="sfunhover"):this.keyboardMenu.innerHTML="";let{li:e,a:t}=this.createMenuItem(-1,"KMWSel_$","(System keyboard)",!0);this.selectedMenuItem=t,this.keyboardMenu.appendChild(e),this.keyboards=[];let n=i.getKeyboards(),r={};for(let o=0;o<n.length;o++){r[n[o].InternalName]||(r[n[o].InternalName]=0),r[n[o].InternalName]++;let s=r[n[o].InternalName];this.keyboards.push({_InternalName:n[o].InternalName,_LanguageCode:n[o].LanguageCode,_Index:s});let{li:c}=this.createMenuItem(this.keyboards.length-1,`KMWSel_${n[o].InternalName}$${s}`,`${n[o].LanguageName} - ${n[o].Name}`,!1);this.keyboardMenu.appendChild(c)}this.keyboardMenu.parentNode!=this.kbdButton.getElem()&&this.kbdButton.getElem().appendChild(this.keyboardMenu)}};h(y,"ToggleUI");let b=y,u=i.ui=new b;i.addHotKey(191,32,u.switchSingleKbd),i.addHotKey(191,48,u.switchNextKbd),i.addHotKey(191,64,u.switchOsk),i.addEventListener("controlfocused",function(f){u.doFocus(f.target,!0,f.activeControl)}),i.addEventListener("controlblurred",function(f){u.doFocus(f.target,!1,null)}),i.addEventListener("keyboardregistered",function(f){u.updateList=!0,u.updateTimer&&clearTimeout(u.updateTimer),u.updateTimer=window.setTimeout(u.updateKeyboardList,200)}),i.addEventListener("keyboardchange",function(f){u.updateMenu(f.internalName,f.languageCode)}),u.initialize()}catch(a){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuitoggle.js.map
