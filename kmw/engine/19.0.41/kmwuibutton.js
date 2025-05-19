(()=>{var y=Object.defineProperty;var K=(s,u)=>y(s,"name",{value:u,configurable:!0});var _,n=window.keyman;if(n){if(!(!((_=n.ui)===null||_===void 0)&&_.name))try{let s=n.util;if(s.isTouchDevice())throw"";let b=class b{constructor(){this.name="button",this.init=!1,this.initTimer=null,this._KeymanWeb_KbdList=null,this._KMWSel=null,this.updateTimer=0,this.updateList=!0,this._insertedElem=null,this._SelectKeyboard=e=>{let t="";if(typeof e=="object"){let r=null;typeof e.target!="undefined"&&e.target?r=e.target:typeof e.srcElement!="undefined"&&e.srcElement&&(r=e.srcElement),r&&(t=r.id)}let d=/^KMWSel_(.*)\$(.*)$/.exec(t),a="",o="";if(d!==null){o=d[1].split("$")[0],a=t.split("$")[1],this._KMWSel!=null&&(this._KMWSel.className="");let r=document.getElementById(t);r&&(r.className="selected"),this._KMWSel=r,n.setActiveKeyboard(o,a)}else o=null;n.focusLastActiveElement();let l=n.osk;return l&&l.isEnabled()&&l.show(!0),this._ShowKeyboardButton(o),!1},this._SelectorMouseDown=e=>{n.getLastActiveElement()?n.focusLastActiveElement():this._FocusFirstInput(),n.activatingUI&&n.activatingUI(1)},this._SelectorMouseUp=e=>{n.getLastActiveElement()?n.focusLastActiveElement():this._FocusFirstInput()},this._SelectorMouseOver=e=>{this._ShowSelected(),n.activatingUI&&n.activatingUI(1),document.getElementById("kmwico_li").className="sfhover",this._ShowKeyboardButton()},this._SelectorMouseOut=e=>{n.activatingUI&&n.activatingUI(0),document.getElementById("kmwico_li").className="sfunhover"},this._ShowKeymanWebKeyboard=()=>{let e=document.getElementById("KMW_Keyboard"),t=n.osk;return e.className!="kmw_disabled"&&t&&t.show&&(t.isEnabled()?t.hide():t.show(!0)),window.event&&(window.event.returnValue=!1),n.focusLastActiveElement(),!1},this.initialize=()=>{if(this.initTimer&&(window.clearTimeout(this.initTimer),this.initTimer=null),!n.initialized){this.initTimer=window.setTimeout(this.initialize,50);return}if(this.init||s.isTouchDevice())return;this.init=!0,s.addStyleSheet(this._Appearance),this._KeymanWeb_KbdList=s.createElement("ul"),this._KeymanWeb_KbdList.id="KeymanWeb_KbdList";let e=document.getElementById("KeymanWebControl");if(!e){let o=document.getElementsByTagName("div");for(let l=0;l<o.length;l++)if(o[l].className=="KeymanWebControl"){e=o[l];break}}!e&&document.body!=null&&(e=document.createElement("DIV"),e.id="KeymanWebControl",document.body.insertBefore(e,document.body.firstChild),this._insertedElem=e);let t=s.getOption("resources")+"ui/button/";if(e){let o=document.createElement("DIV"),l=o.style;l.clear="both",e.parentNode.insertBefore(o,e.nextSibling);let r=s.createElement("img"),m=s.createElement("ul"),h=s.createElement("li");r.id="kmwico_a",r.src=t+"kmw_button.gif",r.onclick=function(){return!1},h.appendChild(r),h.id="kmwico_li",m.appendChild(h),m.id="kmwico",m.style.display="block",e.appendChild(m)}else return;if(!n.iOS){let o=s.createElement("li"),l=s.createElement("a"),r=s.createElement("img");r.src=t+"kbdicon.gif",l.appendChild(r);let m=document.createTextNode(" Hide Keyboard"),h=document.createTextNode(" Show Keyboard"),f=s.createElement("span");f.id="KMW_KbdVisibleMsg",f.appendChild(m),l.appendChild(f);let p=s.createElement("span");p.id="KMW_KbdHiddenMsg",p.appendChild(h),l.appendChild(p),l.onmousedown=this._ShowKeymanWebKeyboard,l.href="#",l.id="KMW_Keyboard",o.id="KMW_ButtonUI_KbdIcon",o.appendChild(l),this._KMWSel=l,this._KeymanWeb_KbdList.appendChild(o)}let i=s.createElement("li");i.id="KMW_ButtonUI_KbdList";let d=s.createElement("a");d.appendChild(document.createTextNode("(System keyboard)")),d.onclick=this._SelectKeyboard,d.href="#",d.id="KMWSel_$",d.className="selected",i.appendChild(d),this._KMWSel=d,this._KeymanWeb_KbdList.appendChild(i),this.updateKeyboardList(),document.getElementById("kmwico_li").appendChild(this._KeymanWeb_KbdList);let a=document.getElementById("kmwico_li");s.attachDOMEvent(a,"mousedown",this._SelectorMouseDown),s.attachDOMEvent(a,"mouseover",this._SelectorMouseOver),s.attachDOMEvent(a,"mouseout",this._SelectorMouseOut),s.attachDOMEvent(a,"mouseup",this._SelectorMouseUp),this.registerEvents(),n.focusLastActiveElement()},this.updateKeyboardList=()=>{if(this.updateList=!1,!this.init)return;for(let t=this._KeymanWeb_KbdList.childNodes.length;t>2;t--)this._KeymanWeb_KbdList.removeChild(this._KeymanWeb_KbdList.childNodes[t-1]);let e=n.getKeyboards();if(e.length>0)for(let t=0;t<e.length;t++)this.registerKeyboard(e[t].InternalName,e[t].LanguageName,e[t].Name,e[t].LanguageCode)},this._Appearance=`
#kmwico, #kmwkbd {
  vertical-align: middle;
}

#KeymanWebControl {
  float:left;
}

#KeymanWebControl * {
  letter-spacing: 0px !important;
  line-height: 1li !important;
  white-space: nowrap !important;
}

#KeymanWebControl #kmwico img {
  vertical-align: top;
  padding: 0;
  margin: 0;
  border: none;
}

#KeymanWebControl #kmwico, #kmwico ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

#KeymanWebControl #kmwico_a {
  display: block;
  /* border: none !important; */
  width: 22px; height: 23px;                                 /* sizes needed for kmw_button.gif */
}

#KeymanWebControl #kmwico li {
  text-align: left;
}

#KeymanWebControl #kmwico li ul {
  display: block;
  position: absolute;
  left: -5999px;
  border: solid 2px #ad4a28;
  background: white;
  border-radius: 4px;
  box-shadow: 4px 4px 2px #666;
  z-index: 10011; /* above the osk */
}

#KeymanWebControl #kmwico li.sfunhover ul {
  display: none; left: -5999px;
}

#KeymanWebControl #kmwico li:hover ul, #kmwico li.sfhover ul {
  display: block;
  left: auto;
}

#KeymanWebControl #kmwico ul li {
  float: none;
  padding: 0 !important;
  margin: 0 !important;
  width: 136px !important;
}

#KeymanWebControl #KMW_LanguageName {
  font-weight: bold;
}

#KeymanWebControl #kmwico ul li a, #kmwico ul li a:visited {
  display: block;
  padding: 2px 4px !important;
  border: none !important;
  /* width: auto; */
  color: #404040;
  font-family: Tahoma,Verdana,Arial,sans-serif;
  font-size: 8pt;
  text-decoration: none;
}

#KeymanWebControl #kmwico ul li a.selected {
  font-weight: bold;
  color: black;
}

#KeymanWebControl #kmwico ul li a:hover {
  color: white;
  background-color: #ad4a28;
}

#KeymanWebControl #kmwico ul li a.kmw_disabled, #KeymanWebControl #kmwico ul li a.kmw_disabled:hover {
  color: #c0c0c0; cursor: default;
  background-color: white;
}

#KeymanWebControl #kmwico ul li a.kmw_show span#KMW_KbdHiddenMsg, #KeymanWebControl #kmwico ul li a.kmw_disabled span#KMW_KbdVisibleMsg {
  display: none;
}

#KeymanWebControl #kmwico ul li a.kmw_show span#KMW_KbdVisibleMsg {
  display: inline;
}

#KeymanWebControl #kmwico ul li a.kmw_hide span#KMW_KbdHiddenMsg {
  display: inline;
}

#KeymanWebControl #kmwico ul li a.kmw_hide span#KMW_KbdVisibleMsg {
  display: none;
}

#KeymanWebControl #kmwico ul li#KMW_ButtonUI_KbdIcon {
  border-bottom: solid 1px #ad4a28;
}
`}_ShowSelected(){let e=n.getActiveKeyboard(),t=n.getActiveLanguage(),i=this._KeymanWeb_KbdList.childNodes,d=/^KMWSel_(.*)\$(.*)$/;for(let o=1;o<i.length;o++)i[o].childNodes[0].className="";let a;for(a=2;a<i.length;a++){let o=d.exec(i[a].childNodes[0].id);if(o&&o[1]==e&&o[2]==t)break}a>=i.length&&(a=1),i[a].childNodes[0].className="selected"}_FocusFirstInput(){let e=null,t=null,i=document.getElementsByTagName("input"),d=document.getElementsByTagName("textarea"),a;for(a=0;a<i.length&&i[a].type!="text";a++);a<i.length&&(e=i[a]),d.length>0&&(t=d[0]),!(!e&&!t)&&(e&&!t?e.focus():t&&!e?t.focus():e.offsetTop<t.offsetTop?e.focus():e.offsetTop>t.offsetTop?t.focus():e.offsetLeft<t.offsetLeft?e.focus():t.focus())}_ShowKeyboardButton(e){let t=n.getActiveKeyboard(),i=document.getElementById("KMW_Keyboard");if(arguments.length>0&&(t=e),i)if(t==""||n.isCJK())i.className="kmw_disabled";else{let d=n.osk;i.className=d&&d.isEnabled()?"kmw_show":"kmw_hide"}}registerEvents(){let e=n.osk;e&&(e.addEventListener("show",t=>{let i=n.getLastActiveElement();return i&&(t.userLocated||(t.x=s.getAbsoluteX(i),t.y=s.getAbsoluteY(i)+i.offsetHeight)),this._ShowKeyboardButton(),t}),e.addEventListener("hide",function(t){if(arguments.length>0&&t.HiddenByUser){let i=document.getElementById("KMW_Keyboard");i&&(i.className="kmw_hide")}}))}shutdown(){let e=this._insertedElem;e&&e.parentNode.removeChild(e)}registerKeyboard(e,t,i,d){let a=s.createElement("li"),o=s.createElement("a"),l=i.replace(/\s?keyboard/i,"");if(t){let r=t.split(",")[0];i.search(r)==-1&&(l=r+" ("+l+")")}l.length>26&&(l=l.substr(0,24)+"\u2026"),o.appendChild(document.createTextNode(l)),o.onclick=this._SelectKeyboard,o.href="#",o.id="KMWSel_"+e+"$"+d,a.appendChild(o),this._KeymanWeb_KbdList.appendChild(a)}};K(b,"UIButton");let u=b,c=n.ui=new u;n.addEventListener("keyboardregistered",function(g){c.updateList=!0,c.updateTimer&&clearTimeout(c.updateTimer),c.updateTimer=window.setTimeout(c.updateKeyboardList,20)}),c.initialize()}catch(s){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuibutton.js.map
