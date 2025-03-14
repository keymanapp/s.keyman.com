(()=>{var w=Object.defineProperty;var g=(n,o)=>w(n,"name",{value:o,configurable:!0});var _;if(!(!((_=keyman==null?void 0:keyman.ui)===null||_===void 0)&&_.name))try{let n=keyman,o=n.util;if(o.isTouchDevice())throw"";let K=class K{constructor(){this.name="button",this.init=!1,this.initTimer=null,this._KeymanWeb_KbdList=null,this._KMWSel=null,this.updateTimer=0,this.updateList=!0,this._insertedElem=null,this._SelectKeyboard=e=>{let t="";if(typeof e=="object"){let d=null;typeof e.target!="undefined"&&e.target?d=e.target:typeof e.srcElement!="undefined"&&e.srcElement&&(d=e.srcElement),d&&(t=d.id)}let s=/^KMWSel_(.*)\$(.*)$/.exec(t),l="",a="";if(s!==null){a=s[1].split("$")[0],l=t.split("$")[1],this._KMWSel!=null&&(this._KMWSel.className="");let d=document.getElementById(t);d&&(d.className="selected"),this._KMWSel=d,n.setActiveKeyboard(a,l)}else a=null;n.focusLastActiveElement();let r=n.osk;return r&&r.isEnabled()&&r.show(!0),this._ShowKeyboardButton(a),!1},this._SelectorMouseDown=e=>{n.getLastActiveElement()?n.focusLastActiveElement():this._FocusFirstInput(),n.activatingUI&&n.activatingUI(1)},this._SelectorMouseUp=e=>{n.getLastActiveElement()?n.focusLastActiveElement():this._FocusFirstInput()},this._SelectorMouseOver=e=>{this._ShowSelected(),n.activatingUI&&n.activatingUI(1),document.getElementById("kmwico_li").className="sfhover",this._ShowKeyboardButton()},this._SelectorMouseOut=e=>{n.activatingUI&&n.activatingUI(0),document.getElementById("kmwico_li").className="sfunhover"},this._ShowKeymanWebKeyboard=()=>{let e=document.getElementById("KMW_Keyboard"),t=n.osk;return e.className!="kmw_disabled"&&t&&t.show&&(t.isEnabled()?t.hide():t.show(!0)),window.event&&(window.event.returnValue=!1),n.focusLastActiveElement(),!1},this.initialize=()=>{if(this.initTimer&&(window.clearTimeout(this.initTimer),this.initTimer=null),!n.initialized){this.initTimer=window.setTimeout(this.initialize,50);return}if(this.init||o.isTouchDevice())return;this.init=!0,o.addStyleSheet(this._Appearance),this._KeymanWeb_KbdList=o.createElement("ul"),this._KeymanWeb_KbdList.id="KeymanWeb_KbdList";let e=document.getElementById("KeymanWebControl");if(!e){let c=document.getElementsByTagName("div");for(let m=0;m<c.length;m++)if(c[m].className=="KeymanWebControl"){e=c[m];break}}!e&&document.body!=null&&(e=document.createElement("DIV"),e.id="KeymanWebControl",document.body.insertBefore(e,document.body.firstChild),this._insertedElem=e);let t=o.getOption("resources")+"ui/button/";if(e){let c=document.createElement("DIV"),m=c.style;m.clear="both",e.parentNode.insertBefore(c,e.nextSibling);let u=o.createElement("img"),f=o.createElement("ul"),y=o.createElement("li");u.id="kmwico_a",u.src=t+"kmw_button.gif",u.onclick=function(){return!1},y.appendChild(u),y.id="kmwico_li",f.appendChild(y),f.id="kmwico",f.style.display="block",e.appendChild(f)}else return;if(!n.iOS){var i=o.createElement("li"),s=o.createElement("a"),l=o.createElement("img");l.src=t+"kbdicon.gif",s.appendChild(l);let c=document.createTextNode(" Hide Keyboard"),m=document.createTextNode(" Show Keyboard"),u=o.createElement("span");u.id="KMW_KbdVisibleMsg",u.appendChild(c),s.appendChild(u);var a=o.createElement("span");a.id="KMW_KbdHiddenMsg",a.appendChild(m),s.appendChild(a),s.onmousedown=this._ShowKeymanWebKeyboard,s.href="#",s.id="KMW_Keyboard",i.id="KMW_ButtonUI_KbdIcon",i.appendChild(s),this._KMWSel=s,this._KeymanWeb_KbdList.appendChild(i)}var r=o.createElement("li");r.id="KMW_ButtonUI_KbdList";var d=o.createElement("a");d.appendChild(document.createTextNode("(System keyboard)")),d.onclick=this._SelectKeyboard,d.href="#",d.id="KMWSel_$",d.className="selected",r.appendChild(d),this._KMWSel=d,this._KeymanWeb_KbdList.appendChild(r),this.updateKeyboardList(),document.getElementById("kmwico_li").appendChild(this._KeymanWeb_KbdList);var b=document.getElementById("kmwico_li");o.attachDOMEvent(b,"mousedown",this._SelectorMouseDown),o.attachDOMEvent(b,"mouseover",this._SelectorMouseOver),o.attachDOMEvent(b,"mouseout",this._SelectorMouseOut),o.attachDOMEvent(b,"mouseup",this._SelectorMouseUp),this.registerEvents(),n.focusLastActiveElement()},this.updateKeyboardList=()=>{if(this.updateList=!1,!this.init)return;for(let i=this._KeymanWeb_KbdList.childNodes.length;i>2;i--)this._KeymanWeb_KbdList.removeChild(this._KeymanWeb_KbdList.childNodes[i-1]);let e=n.getKeyboards();if(e.length>0)for(var t=0;t<e.length;t++)this.registerKeyboard(e[t].InternalName,e[t].LanguageName,e[t].Name,e[t].LanguageCode)},this._Appearance=`
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
`}_ShowSelected(){let e=n.getActiveKeyboard(),t=n.getActiveLanguage(),i=this._KeymanWeb_KbdList.childNodes,s=/^KMWSel_(.*)\$(.*)$/;for(let a=1;a<i.length;a++)i[a].childNodes[0].className="";let l;for(l=2;l<i.length;l++){let a=s.exec(i[l].childNodes[0].id);if(a&&a[1]==e&&a[2]==t)break}l>=i.length&&(l=1),i[l].childNodes[0].className="selected"}_FocusFirstInput(){let e=null,t=null,i=document.getElementsByTagName("input"),s=document.getElementsByTagName("textarea"),l;for(l=0;l<i.length&&i[l].type!="text";l++);l<i.length&&(e=i[l]),s.length>0&&(t=s[0]),!(!e&&!t)&&(e&&!t?e.focus():t&&!e?t.focus():e.offsetTop<t.offsetTop?e.focus():e.offsetTop>t.offsetTop?t.focus():e.offsetLeft<t.offsetLeft?e.focus():t.focus())}_ShowKeyboardButton(e){let t=n.getActiveKeyboard(),i=document.getElementById("KMW_Keyboard");if(arguments.length>0&&(t=e),i)if(t==""||n.isCJK())i.className="kmw_disabled";else{let s=n.osk;i.className=s&&s.isEnabled()?"kmw_show":"kmw_hide"}}registerEvents(){let e=n.osk;e&&(e.addEventListener("show",t=>{let i=n.getLastActiveElement();return i&&(t.userLocated||(t.x=o.getAbsoluteX(i),t.y=o.getAbsoluteY(i)+i.offsetHeight)),this._ShowKeyboardButton(),t}),e.addEventListener("hide",function(t){if(arguments.length>0&&t.HiddenByUser){let i=document.getElementById("KMW_Keyboard");i&&(i.className="kmw_hide")}}))}shutdown(){let e=this._insertedElem;e&&e.parentNode.removeChild(e)}registerKeyboard(e,t,i,s){let l=o.createElement("li"),a=o.createElement("a"),r=i.replace(/\s?keyboard/i,"");if(t){var d=t.split(",")[0];i.search(d)==-1&&(r=d+" ("+r+")")}r.length>26&&(r=r.substr(0,24)+"\u2026"),a.appendChild(document.createTextNode(r)),a.onclick=this._SelectKeyboard,a.href="#",a.id="KMWSel_"+e+"$"+s,l.appendChild(a),this._KeymanWeb_KbdList.appendChild(l)}};g(K,"UIButton");let p=K,h=n.ui=new p;n.addEventListener("keyboardregistered",function(k){h.updateList=!0,h.updateTimer&&clearTimeout(h.updateTimer),h.updateTimer=window.setTimeout(h.updateKeyboardList,20)}),h.initialize()}catch(n){}})();
//# sourceMappingURL=kmwuibutton.js.map
