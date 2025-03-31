(()=>{var f=Object.defineProperty;var y=(r,b)=>f(r,"name",{value:b,configurable:!0});var g,i=window.keyman;if(i){if(!(!((g=i.ui)===null||g===void 0)&&g.name))try{let r=i.util;if(r.isTouchDevice())throw"";let m=class m{constructor(){this.name="toggle",this.initialized=!1,this.controller=null,this.oskButton=null,this.kbdButton=null,this.controllerHovered=!1,this.keyboards=[],this.lastActiveKeyboard=-1,this.selectedMenuItem=null,this.updateList=!0,this.updateTimer=null,this.switchOsk=()=>{if(!(i.getActiveKeyboard()==""||i.isCJK())&&i.osk){let e=!i.osk.isEnabled();i.osk.show(e),this.oskButton._setSelected(e)}},this.switchSingleKbd=()=>{let e=i.getActiveKeyboard()=="",t=0,s="",o="";if(e){if(this.keyboards.length==0)return;this.lastActiveKeyboard<this.keyboards.length&&this.lastActiveKeyboard>=0&&(t=this.lastActiveKeyboard),s=this.keyboards[t]._InternalName,o=this.keyboards[t]._LanguageCode,i.setActiveKeyboard(s,o),this.lastActiveKeyboard=t}else i.setActiveKeyboard("");this.kbdButton&&this.kbdButton._setSelected(e)},this.switchNextKbd=()=>{let e=i.getActiveKeyboard()=="",t="",s="";if(e){if(this.keyboards.length==0)return;t=this.keyboards[0]._InternalName,s=this.keyboards[0]._LanguageCode,i.setActiveKeyboard(t,s),this.lastActiveKeyboard=0}else this.lastActiveKeyboard==this.keyboards.length-1?(i.setActiveKeyboard(""),e=!1):(t=this.keyboards[++this.lastActiveKeyboard]._InternalName,s=this.keyboards[this.lastActiveKeyboard]._LanguageCode,i.setActiveKeyboard(t,s),e=!0);this.kbdButton&&this.kbdButton._setSelected(e)},this.updateKeyboardList=()=>{if(!(i.initialized||this.initialized))return;this.updateList=!1;let e=i.getKeyboards(),t=r.getOption("resources")+"ui/toggle/";if(e.length>1){let d=document.getElementById("KMW_Controller_Img");d.src=t+"kmw_logo_16_down.gif",d.style.width="100%",this.controller.style.background="url("+t+"kmwcontroller2x.gif)",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="36px",this.kbdButton._onmouseover=()=>{this.keyboardMenu.className="sfhover"},this.kbdButton._onmouseout=()=>{this.keyboardMenu.className="sfunhover"},this.kbdButton._onclick=null,this.createMenu()}else if(e.length==1){let d=document.getElementById("KMW_Controller_Img");d.src=t+"kmw_logo_16.gif",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="24px";var s=e[0].InternalName,o=e[0].LanguageCode;this.controller.style.background="url("+t+"kmwcontroller2.gif)",this.keyboards.push({_InternalName:s,_LanguageCode:o,_Index:0}),this.kbdButton._onclick=this.switchSingleKbd,this.kbdButton._onmouseover=function(){},this.kbdButton._onmouseout=function(){},this.createMenu(),typeof this.keyboardMenu!="undefined"&&delete this.keyboardMenu}var n=i.getSavedKeyboard().split(":");this.updateMenu(n[0],n[1])}}doFocus(e,t,s){if(!this.initialized)return;window.event&&i.isAttached(window.event.srcElement)&&(e=window.event.srcElement),t?this.controller.style.display="block":!i.getUIState().activationPending&&!this.controllerHovered&&(this.controller.style.display="none");let o,n,d=r.getAbsolute(e),u=d.x,l=d.y;var a=e.ownerDocument;a.designMode=="on"&&a.defaultView&&a.defaultView.frameElement?(o=a.defaultView.frameElement.clientWidth,n=a.defaultView.frameElement.clientHeight):(o=e.offsetWidth,n=e.offsetHeight),u+o>window.innerWidth+document.documentElement.scrollLeft-this.controller.offsetWidth-1?l+=n:(u+=o+2,l+=n-29),!(isNaN(u)||isNaN(l))&&(this.controller.style.left=u+"px",this.controller.style.top=l+"px")}registerEvents(){let e=i.osk;e&&(e.addEventListener("show",t=>(this.controller.style.display="block",this.oskButton._setSelected(!0),t)),e.addEventListener("hide",t=>{t.HiddenByUser&&this.oskButton._setSelected(!1)}))}button(e,t,s){let o=this,d=class d{getElem(){return this._elem}__updatestyle(){var l=this._elem.style;this._over?(l.margin="0px",this._selected?(l.border="solid 1px #ad4a28",l.background="#dfb4b4"):(l.border="solid 1px #dfb4b4",l.background="#f3e5de")):this._selected?(l.background="#f3e5de",l.margin="0px",l.border="solid 1px #ad4a28"):(l.background="none",l.margin="1px",l.border="none")}_setSelected(l){i.activatingUI(!1),this._selected=l,this.__updatestyle()}_getSelected(){return this._selected}_getOver(){return this._over}_getDown(){return this._down}constructor(){this._onclick=null,this._onmouseover=null,this._onmouseout=null,this._down=!1,this._over=!1,this.__mouseover=()=>{o.controllerHovered=!0,this._over=!0,this._onmouseover!=null&&this._onmouseover(),this.__updatestyle()},this.__mouseout=()=>{o.controllerHovered=!1,this._over=!1,this._onmouseout!=null&&this._onmouseout(),this.__updatestyle()},this.__click=()=>(i.activatingUI(!1),this._onclick!=null?this._onclick():!1),this.__mousedown=()=>(i.activatingUI(!0),this._down=!0,this.__updatestyle(),!1),this.__mouseup=()=>{this._down=!1,this.__updatestyle()},this._selected=s;let l=r.getOption("resources")+"ui/toggle/",a=r.createElement("img");this._elem=r.createElement("div"),this._elem._owningObject=this,a.style.display="block",a.src=l+e,a.id="KMW_Controller_Img",this._elem.style.margin="0px",this._elem.style.width="24px",this._elem.style.height="24px",this._elem.style.zIndex="10002",this._elem.style.lineHeight="100%",this._elem.style.cssFloat="left",a.title=t,a.alt=t,this._elem.appendChild(a),this._elem.onmouseover=this.__mouseover,this._elem.onmouseout=this.__mouseout,this._elem.onmousedown=this.__mousedown,this._elem.onmouseup=this.__mouseup,a._owningObject=this,a.onclick=this.__click,this.__updatestyle()}};y(d,"Button");let n=d;return new n}initialize(){if(!i.initialized||r.isTouchDevice())return;this.initialized?this.controller.innerHTML="":this.controller=r.createElement("div");let e=r.getOption("resources")+"ui/toggle/";this.controller.style.background="url("+e+"kmwcontroller2x.gif)",this.controller.style.padding="1px 2px";let t=r.loadCookie("KeymanWeb_Keyboard"),s=!1;typeof t.current!="undefined"&&(s=t.current.indexOf("---")<0),this.kbdButton=this.button("kmw_logo_16.gif","Use Web Keyboard",s),this.controller.appendChild(this.kbdButton.getElem());let o=r.loadCookie("KeymanWeb_OnScreenKeyboard"),n=!0;typeof o.visible!="undefined"&&(n=o.visible==1),this.oskButton=this.button("kmw_osk_16.gif","Show On Screen Keyboard",n),this.oskButton._onclick=this.switchOsk,this.controller.appendChild(this.oskButton.getElem()),this.initialized||(this.controller.style.display="none"),this.controller.style.zIndex="10001",this.controller.style.position="absolute",this.initialized||document.body.appendChild(this.controller),this.initialized=!0,this.updateKeyboardList(),this.registerEvents(),r.addStyleSheet(this.stylingCSS)}shutdown(){var e=this.controller;e&&e.parentNode.removeChild(e)}selectKbd(e){let t,s;return e<0?(t="",s=""):(t=this.keyboards[e]._InternalName,s=this.keyboards[e]._LanguageCode),i.setActiveKeyboard(t,s),i.focusLastActiveElement(),this.kbdButton._setSelected(t!=""),e>=0&&(this.lastActiveKeyboard=e),!1}updateMenu(e,t){let s=document.getElementById("KMWSel_$");for(let o=0;o<this.keyboards.length;o++)this.keyboards[o]._InternalName==e&&this.keyboards[o]._LanguageCode==t&&(s=document.getElementById("KMWSel_"+this.keyboards[o]._InternalName+"$"+this.keyboards[o]._Index));s&&(this.selectedMenuItem!=null&&(this.selectedMenuItem.className=""),s.className="selected",this.selectedMenuItem=s),this.oskButton&&(t=="cmn"||t=="jpn"||t=="kor"?this.oskButton.getElem().style.display="none":e==""?this.oskButton.getElem().style.display="none":this.oskButton.getElem().style.display="block")}get stylingCSS(){return`
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
`}createMenu(){typeof this.keyboardMenu=="undefined"?(this.keyboardMenu=r.createElement("ul"),this.keyboardMenu.id="KeymanWeb_KbdList",this.keyboardMenu.className="sfunhover"):this.keyboardMenu.innerHTML="";var e=r.createElement("li"),t=r.createElement("a");t.innerHTML="(System keyboard)",t.href="#",t.onclick=()=>this.selectKbd(-1),t.id="KMWSel_$",t.className="selected",e.appendChild(t),this.selectedMenuItem=t,this.keyboardMenu.appendChild(e);let s=i.getKeyboards(),o={};this.keyboards=[];for(var n=0;n<s.length;n++){var d=r.createElement("li"),u=r.createElement("a");u.innerHTML=s[n].LanguageName+" - "+s[n].Name,o[s[n].InternalName]||(o[s[n].InternalName]=0),o[s[n].InternalName]++;var l=o[s[n].InternalName];this.keyboards.push({_InternalName:s[n].InternalName,_LanguageCode:s[n].LanguageCode,_Index:l}),u.href="#",u.onclick=(a=>()=>this.selectKbd(a))(this.keyboards.length-1),u.id="KMWSel_"+s[n].InternalName+"$"+l,d.appendChild(u),this.keyboardMenu.appendChild(d)}this.keyboardMenu.parentNode!=this.kbdButton.getElem()&&this.kbdButton.getElem().appendChild(this.keyboardMenu)}};y(m,"ToggleUI");let b=m,h=i.ui=new b;i.addHotKey(191,32,h.switchSingleKbd),i.addHotKey(191,48,h.switchNextKbd),i.addHotKey(191,64,h.switchOsk),i.addEventListener("controlfocused",function(c){h.doFocus(c.target,!0,c.activeControl)}),i.addEventListener("controlblurred",function(c){h.doFocus(c.target,!1,null)}),i.addEventListener("keyboardregistered",function(c){h.updateList=!0,h.updateTimer&&clearTimeout(h.updateTimer),h.updateTimer=window.setTimeout(h.updateKeyboardList,200)}),i.addEventListener("keyboardchange",function(c){h.updateMenu(c.internalName,c.languageCode)}),h.initialize()}catch(r){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuitoggle.js.map
