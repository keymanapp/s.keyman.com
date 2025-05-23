(()=>{var g=Object.defineProperty;var _=(a,b)=>g(a,"name",{value:b,configurable:!0});var y,s=window.keyman;if(s){if(!(!((y=s.ui)===null||y===void 0)&&y.name))try{let a=s.util;if(a.isTouchDevice())throw"";let m=class m{constructor(){this.name="toggle",this.initialized=!1,this.controller=null,this.oskButton=null,this.kbdButton=null,this.controllerHovered=!1,this.keyboards=[],this.lastActiveKeyboard=-1,this.selectedMenuItem=null,this.updateList=!0,this.updateTimer=null,this.switchOsk=()=>{if(!(s.getActiveKeyboard()==""||s.isCJK())&&s.osk){let e=!s.osk.isEnabled();s.osk.show(e),this.oskButton._setSelected(e)}},this.switchSingleKbd=()=>{let e=s.getActiveKeyboard()=="",t=0,i="",o="";if(e){if(this.keyboards.length==0)return;this.lastActiveKeyboard<this.keyboards.length&&this.lastActiveKeyboard>=0&&(t=this.lastActiveKeyboard),i=this.keyboards[t]._InternalName,o=this.keyboards[t]._LanguageCode,s.setActiveKeyboard(i,o),this.lastActiveKeyboard=t}else s.setActiveKeyboard("");this.kbdButton&&this.kbdButton._setSelected(e)},this.switchNextKbd=()=>{let e=s.getActiveKeyboard()=="",t="",i="";if(e){if(this.keyboards.length==0)return;t=this.keyboards[0]._InternalName,i=this.keyboards[0]._LanguageCode,s.setActiveKeyboard(t,i),this.lastActiveKeyboard=0}else this.lastActiveKeyboard==this.keyboards.length-1?(s.setActiveKeyboard(""),e=!1):(t=this.keyboards[++this.lastActiveKeyboard]._InternalName,i=this.keyboards[this.lastActiveKeyboard]._LanguageCode,s.setActiveKeyboard(t,i),e=!0);this.kbdButton&&this.kbdButton._setSelected(e)},this.updateKeyboardList=()=>{if(!(s.initialized||this.initialized))return;this.updateList=!1;let e=s.getKeyboards(),t=a.getOption("resources")+"ui/toggle/";if(e.length>1){let o=document.getElementById("KMW_Controller_Img");o.src=t+"kmw_logo_16_down.gif",o.style.width="100%",this.controller.style.background="url("+t+"kmwcontroller2x.gif)",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="36px",this.kbdButton._onmouseover=()=>{this.keyboardMenu.className="sfhover"},this.kbdButton._onmouseout=()=>{this.keyboardMenu.className="sfunhover"},this.kbdButton._onclick=null,this.createMenu()}else if(e.length==1){let o=document.getElementById("KMW_Controller_Img");o.src=t+"kmw_logo_16.gif",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="24px";let n=e[0].InternalName,h=e[0].LanguageCode;this.controller.style.background="url("+t+"kmwcontroller2.gif)",this.keyboards.push({_InternalName:n,_LanguageCode:h,_Index:0}),this.kbdButton._onclick=this.switchSingleKbd,this.kbdButton._onmouseover=function(){},this.kbdButton._onmouseout=function(){},this.createMenu(),typeof this.keyboardMenu!="undefined"&&delete this.keyboardMenu}let i=s.getSavedKeyboard().split(":");this.updateMenu(i[0],i[1])}}doFocus(e,t,i){if(!this.initialized)return;window.event&&s.isAttached(window.event.srcElement)&&(e=window.event.srcElement),t?this.controller.style.display="block":!s.getUIState().activationPending&&!this.controllerHovered&&(this.controller.style.display="none");let o,n,h=a.getAbsolute(e),u=h.x,l=h.y,r=e.ownerDocument;r.designMode=="on"&&r.defaultView&&r.defaultView.frameElement?(o=r.defaultView.frameElement.clientWidth,n=r.defaultView.frameElement.clientHeight):(o=e.offsetWidth,n=e.offsetHeight),u+o>window.innerWidth+document.documentElement.scrollLeft-this.controller.offsetWidth-1?l+=n:(u+=o+2,l+=n-29),!(isNaN(u)||isNaN(l))&&(this.controller.style.left=u+"px",this.controller.style.top=l+"px")}registerEvents(){let e=s.osk;e&&(e.addEventListener("show",t=>(this.controller.style.display="block",this.oskButton._setSelected(!0),t)),e.addEventListener("hide",t=>{t.HiddenByUser&&this.oskButton._setSelected(!1)}))}button(e,t,i){let o=this,h=class h{getElem(){return this._elem}__updatestyle(){let l=this._elem.style;this._over?(l.margin="0px",this._selected?(l.border="solid 1px #ad4a28",l.background="#dfb4b4"):(l.border="solid 1px #dfb4b4",l.background="#f3e5de")):this._selected?(l.background="#f3e5de",l.margin="0px",l.border="solid 1px #ad4a28"):(l.background="none",l.margin="1px",l.border="none")}_setSelected(l){s.activatingUI(!1),this._selected=l,this.__updatestyle()}_getSelected(){return this._selected}_getOver(){return this._over}_getDown(){return this._down}constructor(){this._onclick=null,this._onmouseover=null,this._onmouseout=null,this._down=!1,this._over=!1,this.__mouseover=()=>{o.controllerHovered=!0,this._over=!0,this._onmouseover!=null&&this._onmouseover(),this.__updatestyle()},this.__mouseout=()=>{o.controllerHovered=!1,this._over=!1,this._onmouseout!=null&&this._onmouseout(),this.__updatestyle()},this.__click=()=>(s.activatingUI(!1),this._onclick!=null?this._onclick():!1),this.__mousedown=()=>(s.activatingUI(!0),this._down=!0,this.__updatestyle(),!1),this.__mouseup=()=>{this._down=!1,this.__updatestyle()},this._selected=i;let l=a.getOption("resources")+"ui/toggle/",r=a.createElement("img");this._elem=a.createElement("div"),this._elem._owningObject=this,r.style.display="block",r.src=l+e,r.id="KMW_Controller_Img",this._elem.style.margin="0px",this._elem.style.width="24px",this._elem.style.height="24px",this._elem.style.zIndex="10002",this._elem.style.lineHeight="100%",this._elem.style.cssFloat="left",r.title=t,r.alt=t,this._elem.appendChild(r),this._elem.onmouseover=this.__mouseover,this._elem.onmouseout=this.__mouseout,this._elem.onmousedown=this.__mousedown,this._elem.onmouseup=this.__mouseup,r._owningObject=this,r.onclick=this.__click,this.__updatestyle()}};_(h,"Button");let n=h;return new n}initialize(){if(!s.initialized||a.isTouchDevice())return;this.initialized?this.controller.innerHTML="":this.controller=a.createElement("div");let e=a.getOption("resources")+"ui/toggle/";this.controller.style.background="url("+e+"kmwcontroller2x.gif)",this.controller.style.padding="1px 2px";let t=a.loadCookie("KeymanWeb_Keyboard"),i=!1;typeof t.current!="undefined"&&(i=t.current.indexOf("---")<0),this.kbdButton=this.button("kmw_logo_16.gif","Use Web Keyboard",i),this.controller.appendChild(this.kbdButton.getElem());let o=a.loadCookie("KeymanWeb_OnScreenKeyboard"),n=!0;typeof o.visible!="undefined"&&(n=o.visible==1),this.oskButton=this.button("kmw_osk_16.gif","Show On Screen Keyboard",n),this.oskButton._onclick=this.switchOsk,this.controller.appendChild(this.oskButton.getElem()),this.initialized||(this.controller.style.display="none"),this.controller.style.zIndex="10001",this.controller.style.position="absolute",this.initialized||document.body.appendChild(this.controller),this.initialized=!0,this.updateKeyboardList(),this.registerEvents(),a.addStyleSheet(this.stylingCSS)}shutdown(){let e=this.controller;e&&e.parentNode.removeChild(e)}selectKbd(e){let t,i;return e<0?(t="",i=""):(t=this.keyboards[e]._InternalName,i=this.keyboards[e]._LanguageCode),s.setActiveKeyboard(t,i),s.focusLastActiveElement(),this.kbdButton._setSelected(t!=""),e>=0&&(this.lastActiveKeyboard=e),!1}updateMenu(e,t){let i=document.getElementById("KMWSel_$");for(let o=0;o<this.keyboards.length;o++)this.keyboards[o]._InternalName==e&&this.keyboards[o]._LanguageCode==t&&(i=document.getElementById("KMWSel_"+this.keyboards[o]._InternalName+"$"+this.keyboards[o]._Index));i&&(this.selectedMenuItem!=null&&(this.selectedMenuItem.className=""),i.className="selected",this.selectedMenuItem=i),this.oskButton&&(t=="cmn"||t=="jpn"||t=="kor"?this.oskButton.getElem().style.display="none":e==""?this.oskButton.getElem().style.display="none":this.oskButton.getElem().style.display="block")}get stylingCSS(){return`
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
`}createMenu(){typeof this.keyboardMenu=="undefined"?(this.keyboardMenu=a.createElement("ul"),this.keyboardMenu.id="KeymanWeb_KbdList",this.keyboardMenu.className="sfunhover"):this.keyboardMenu.innerHTML="";let e=a.createElement("li"),t=a.createElement("a");t.innerHTML="(System keyboard)",t.href="#",t.onclick=()=>this.selectKbd(-1),t.id="KMWSel_$",t.className="selected",e.appendChild(t),this.selectedMenuItem=t,this.keyboardMenu.appendChild(e);let i=s.getKeyboards(),o={};this.keyboards=[];for(let n=0;n<i.length;n++){let h=a.createElement("li"),u=a.createElement("a");u.innerHTML=i[n].LanguageName+" - "+i[n].Name,o[i[n].InternalName]||(o[i[n].InternalName]=0),o[i[n].InternalName]++;let l=o[i[n].InternalName];this.keyboards.push({_InternalName:i[n].InternalName,_LanguageCode:i[n].LanguageCode,_Index:l}),u.href="#",u.onclick=(r=>()=>this.selectKbd(r))(this.keyboards.length-1),u.id="KMWSel_"+i[n].InternalName+"$"+l,h.appendChild(u),this.keyboardMenu.appendChild(h)}this.keyboardMenu.parentNode!=this.kbdButton.getElem()&&this.kbdButton.getElem().appendChild(this.keyboardMenu)}};_(m,"ToggleUI");let b=m,d=s.ui=new b;s.addHotKey(191,32,d.switchSingleKbd),s.addHotKey(191,48,d.switchNextKbd),s.addHotKey(191,64,d.switchOsk),s.addEventListener("controlfocused",function(c){d.doFocus(c.target,!0,c.activeControl)}),s.addEventListener("controlblurred",function(c){d.doFocus(c.target,!1,null)}),s.addEventListener("keyboardregistered",function(c){d.updateList=!0,d.updateTimer&&clearTimeout(d.updateTimer),d.updateTimer=window.setTimeout(d.updateKeyboardList,200)}),s.addEventListener("keyboardchange",function(c){d.updateMenu(c.internalName,c.languageCode)}),d.initialize()}catch(a){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuitoggle.js.map
