(()=>{var m=Object.defineProperty;var f=(l,b)=>m(l,"name",{value:b,configurable:!0});function _(l,b,u,y){function h(e){return e instanceof u?e:new u(function(t){t(e)})}return f(h,"adopt"),new(u||(u=Promise))(function(e,t){function n(a){try{r(y.next(a))}catch(d){t(d)}}f(n,"fulfilled");function i(a){try{r(y.throw(a))}catch(d){t(d)}}f(i,"rejected");function r(a){a.done?e(a.value):h(a.value).then(n,i)}f(r,"step"),r((y=y.apply(l,b||[])).next())})}f(_,"__awaiter");var p,o=window.keyman;if(o){if(!(!((p=o.ui)===null||p===void 0)&&p.name))try{let l=o.util;if(l.isTouchDevice())throw"";let y=class y{constructor(){this.name="toggle",this.initialized=!1,this.controller=null,this.oskButton=null,this.kbdButton=null,this.controllerHovered=!1,this.keyboards=[],this.lastActiveKeyboard=-1,this.selectedMenuItem=null,this.updateList=!0,this.updateTimer=null,this.switchOsk=()=>{if(!(o.getActiveKeyboard()==""||o.isCJK())&&o.osk){let e=!o.osk.isEnabled();o.osk.show(e),this.oskButton._setSelected(e)}},this.switchSingleKbd=()=>_(this,void 0,void 0,function*(){let e=o.getActiveKeyboard()=="",t=0,n="",i="";if(e){if(this.keyboards.length==0)return;this.lastActiveKeyboard<this.keyboards.length&&this.lastActiveKeyboard>=0&&(t=this.lastActiveKeyboard),n=this.keyboards[t]._InternalName,i=this.keyboards[t]._LanguageCode,yield o.setActiveKeyboard(n,i),this.lastActiveKeyboard=t}else yield o.setActiveKeyboard("");this.kbdButton&&this.kbdButton._setSelected(e)}),this.switchNextKbd=()=>_(this,void 0,void 0,function*(){let e=o.getActiveKeyboard()=="",t="",n="";if(e){if(this.keyboards.length==0)return;t=this.keyboards[0]._InternalName,n=this.keyboards[0]._LanguageCode,yield o.setActiveKeyboard(t,n),this.lastActiveKeyboard=0}else this.lastActiveKeyboard==this.keyboards.length-1?(yield o.setActiveKeyboard(""),e=!1):(t=this.keyboards[++this.lastActiveKeyboard]._InternalName,n=this.keyboards[this.lastActiveKeyboard]._LanguageCode,yield o.setActiveKeyboard(t,n),e=!0);this.kbdButton&&this.kbdButton._setSelected(e)}),this.updateKeyboardList=()=>{if(!(o.initialized||this.initialized))return;this.updateList=!1;let e=o.getKeyboards(),t=l.getOption("resources")+"ui/toggle/";if(e.length>1){let i=document.getElementById("KMW_Controller_Img");i.src=t+"kmw_logo_16_down.gif",i.style.width="100%",this.controller.style.background="url("+t+"kmwcontroller2x.gif)",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="36px",this.kbdButton._onmouseover=()=>{this.keyboardMenu.className="sfhover"},this.kbdButton._onmouseout=()=>{this.keyboardMenu.className="sfunhover"},this.kbdButton._onclick=null,this.createMenu()}else if(e.length==1){let i=document.getElementById("KMW_Controller_Img");i.src=t+"kmw_logo_16.gif",this.kbdButton.getElem().id="kmwico",this.kbdButton.getElem().style.width="24px";let r=e[0].InternalName,a=e[0].LanguageCode;this.controller.style.background="url("+t+"kmwcontroller2.gif)",this.keyboards.push({_InternalName:r,_LanguageCode:a,_Index:0}),this.kbdButton._onclick=this.switchSingleKbd,this.kbdButton._onmouseover=function(){},this.kbdButton._onmouseout=function(){},this.createMenu(),typeof this.keyboardMenu!="undefined"&&delete this.keyboardMenu}let n=o.getSavedKeyboard().split(":");this.updateMenu(n[0],n[1])}}doFocus(e,t,n){if(!this.initialized)return;window.event&&o.isAttached(window.event.srcElement)&&(e=window.event.srcElement),t?this.controller.style.display="block":!o.getUIState().activationPending&&!this.controllerHovered&&(this.controller.style.display="none");let i,r,a=l.getAbsolute(e),d=a.x,s=a.y,c=e.ownerDocument;c.designMode=="on"&&c.defaultView&&c.defaultView.frameElement?(i=c.defaultView.frameElement.clientWidth,r=c.defaultView.frameElement.clientHeight):(i=e.offsetWidth,r=e.offsetHeight),d+i>window.innerWidth+document.documentElement.scrollLeft-this.controller.offsetWidth-1?s+=r:(d+=i+2,s+=r-29),!(isNaN(d)||isNaN(s))&&(this.controller.style.left=d+"px",this.controller.style.top=s+"px")}registerEvents(){let e=o.osk;e&&(e.addEventListener("show",t=>(this.controller.style.display="block",this.oskButton._setSelected(!0),t)),e.addEventListener("hide",t=>{t.HiddenByUser&&this.oskButton._setSelected(!1)}))}button(e,t,n){let i=this,a=class a{getElem(){return this._elem}__updatestyle(){let s=this._elem.style;this._over?(s.margin="0px",this._selected?(s.border="solid 1px #ad4a28",s.background="#dfb4b4"):(s.border="solid 1px #dfb4b4",s.background="#f3e5de")):this._selected?(s.background="#f3e5de",s.margin="0px",s.border="solid 1px #ad4a28"):(s.background="none",s.margin="1px",s.border="none")}_setSelected(s){o.activatingUI(!1),this._selected=s,this.__updatestyle()}_getSelected(){return this._selected}_getOver(){return this._over}_getDown(){return this._down}constructor(){this._onclick=null,this._onmouseover=null,this._onmouseout=null,this._down=!1,this._over=!1,this.__mouseover=()=>{i.controllerHovered=!0,this._over=!0,this._onmouseover!=null&&this._onmouseover(),this.__updatestyle()},this.__mouseout=()=>{i.controllerHovered=!1,this._over=!1,this._onmouseout!=null&&this._onmouseout(),this.__updatestyle()},this.__click=()=>(o.activatingUI(!1),this._onclick!=null?this._onclick():!1),this.__mousedown=()=>(o.activatingUI(!0),this._down=!0,this.__updatestyle(),!1),this.__mouseup=()=>{this._down=!1,this.__updatestyle()},this._selected=n;let s=l.getOption("resources")+"ui/toggle/",c=l.createElement("img");this._elem=l.createElement("div"),this._elem._owningObject=this,c.style.display="block",c.src=s+e,c.id="KMW_Controller_Img",this._elem.style.margin="0px",this._elem.style.width="24px",this._elem.style.height="24px",this._elem.style.zIndex="10002",this._elem.style.lineHeight="100%",this._elem.style.cssFloat="left",c.title=t,c.alt=t,this._elem.appendChild(c),this._elem.onmouseover=this.__mouseover,this._elem.onmouseout=this.__mouseout,this._elem.onmousedown=this.__mousedown,this._elem.onmouseup=this.__mouseup,c._owningObject=this,c.onclick=this.__click,this.__updatestyle()}};f(a,"Button");let r=a;return new r}initialize(){if(!o.initialized||l.isTouchDevice())return;this.initialized?this.controller.innerHTML="":this.controller=l.createElement("div");let e=l.getOption("resources")+"ui/toggle/";this.controller.style.background="url("+e+"kmwcontroller2x.gif)",this.controller.style.padding="1px 2px";let t=l.loadCookie("KeymanWeb_Keyboard"),n=!1;typeof t.current!="undefined"&&(n=t.current.indexOf("---")<0),this.kbdButton=this.button("kmw_logo_16.gif","Use Web Keyboard",n),this.controller.appendChild(this.kbdButton.getElem());let i=l.loadCookie("KeymanWeb_OnScreenKeyboard"),r=!0;typeof i.visible!="undefined"&&(r=i.visible==1),this.oskButton=this.button("kmw_osk_16.gif","Show On Screen Keyboard",r),this.oskButton._onclick=this.switchOsk,this.controller.appendChild(this.oskButton.getElem()),this.initialized||(this.controller.style.display="none"),this.controller.style.zIndex="10001",this.controller.style.position="absolute",this.initialized||document.body.appendChild(this.controller),this.initialized=!0,this.updateKeyboardList(),this.registerEvents(),l.addStyleSheet(this.stylingCSS)}shutdown(){let e=this.controller;e&&e.parentNode.removeChild(e)}selectKbd(e){return _(this,void 0,void 0,function*(){let t,n;return e<0?(t="",n=""):(t=this.keyboards[e]._InternalName,n=this.keyboards[e]._LanguageCode),yield o.setActiveKeyboard(t,n),o.focusLastActiveElement(),this.kbdButton._setSelected(t!=""),e>=0&&(this.lastActiveKeyboard=e),!1})}updateMenu(e,t){let n=document.getElementById("KMWSel_$");for(let i=0;i<this.keyboards.length;i++)this.keyboards[i]._InternalName==e&&this.keyboards[i]._LanguageCode==t&&(n=document.getElementById("KMWSel_"+this.keyboards[i]._InternalName+"$"+this.keyboards[i]._Index));n&&(this.selectedMenuItem!=null&&(this.selectedMenuItem.className=""),n.className="selected",this.selectedMenuItem=n),this.oskButton&&(t=="cmn"||t=="jpn"||t=="kor"?this.oskButton.getElem().style.display="none":e==""?this.oskButton.getElem().style.display="none":this.oskButton.getElem().style.display="block")}get stylingCSS(){return`
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
`}createMenu(){typeof this.keyboardMenu=="undefined"?(this.keyboardMenu=l.createElement("ul"),this.keyboardMenu.id="KeymanWeb_KbdList",this.keyboardMenu.className="sfunhover"):this.keyboardMenu.innerHTML="";let e=l.createElement("li"),t=l.createElement("a");t.innerHTML="(System keyboard)",t.href="#",t.onclick=()=>this.selectKbd(-1),t.id="KMWSel_$",t.className="selected",e.appendChild(t),this.selectedMenuItem=t,this.keyboardMenu.appendChild(e);let n=o.getKeyboards(),i={};this.keyboards=[];for(let r=0;r<n.length;r++){let a=l.createElement("li"),d=l.createElement("a");d.innerHTML=n[r].LanguageName+" - "+n[r].Name,i[n[r].InternalName]||(i[n[r].InternalName]=0),i[n[r].InternalName]++;let s=i[n[r].InternalName];this.keyboards.push({_InternalName:n[r].InternalName,_LanguageCode:n[r].LanguageCode,_Index:s}),d.href="#",d.onclick=(c=>()=>this.selectKbd(c))(this.keyboards.length-1),d.id="KMWSel_"+n[r].InternalName+"$"+s,a.appendChild(d),this.keyboardMenu.appendChild(a)}this.keyboardMenu.parentNode!=this.kbdButton.getElem()&&this.kbdButton.getElem().appendChild(this.keyboardMenu)}};f(y,"ToggleUI");let b=y,u=o.ui=new b;o.addHotKey(191,32,u.switchSingleKbd),o.addHotKey(191,48,u.switchNextKbd),o.addHotKey(191,64,u.switchOsk),o.addEventListener("controlfocused",function(h){u.doFocus(h.target,!0,h.activeControl)}),o.addEventListener("controlblurred",function(h){u.doFocus(h.target,!1,null)}),o.addEventListener("keyboardregistered",function(h){u.updateList=!0,u.updateTimer&&clearTimeout(u.updateTimer),u.updateTimer=window.setTimeout(u.updateKeyboardList,200)}),o.addEventListener("keyboardchange",function(h){u.updateMenu(h.internalName,h.languageCode)}),u.initialize()}catch(l){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuitoggle.js.map
