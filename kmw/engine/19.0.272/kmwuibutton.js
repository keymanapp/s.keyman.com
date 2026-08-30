(()=>{var K=Object.defineProperty;var f=(l,m)=>K(l,"name",{value:m,configurable:!0});function g(l,m,u,d){function w(e){return e instanceof u?e:new u(function(t){t(e)})}return f(w,"adopt"),new(u||(u=Promise))(function(e,t){function i(n){try{a(d.next(n))}catch(r){t(r)}}f(i,"fulfilled");function s(n){try{a(d.throw(n))}catch(r){t(r)}}f(s,"rejected");function a(n){n.done?e(n.value):w(n.value).then(i,s)}f(a,"step"),a((d=d.apply(l,m||[])).next())})}f(g,"__awaiter");var _,o=window.keyman;if(o){if(!(!((_=o.ui)===null||_===void 0)&&_.name))try{let l=o.util;if(l.isTouchDevice())throw"";let d=class d{constructor(){this.name="button",this.init=!1,this.initTimer=null,this._KeymanWeb_KbdList=null,this._KMWSel=null,this.updateTimer=0,this.updateList=!0,this._insertedElem=null,this._SelectKeyboard=e=>g(this,void 0,void 0,function*(){let t="";if(typeof e=="object"){let c=null;typeof e.target!="undefined"&&e.target?c=e.target:typeof e.srcElement!="undefined"&&e.srcElement&&(c=e.srcElement),c&&(t=c.id)}let s=/^KMWSel_(.*)\$(.*)$/.exec(t),a="",n="";if(s!==null){n=s[1].split("$")[0],a=t.split("$")[1],this._KMWSel!=null&&(this._KMWSel.className="");let c=document.getElementById(t);c&&(c.className="selected"),this._KMWSel=c,yield o.setActiveKeyboard(n,a)}else n=null;o.focusLastActiveElement();let r=o.osk;return r&&r.isEnabled()&&r.show(!0),this._ShowKeyboardButton(n),!1}),this._SelectorMouseDown=e=>{o.getLastActiveElement()?o.focusLastActiveElement():this._FocusFirstInput(),o.activatingUI&&o.activatingUI(1)},this._SelectorMouseUp=e=>{o.getLastActiveElement()?o.focusLastActiveElement():this._FocusFirstInput()},this._SelectorMouseOver=e=>{this._ShowSelected(),o.activatingUI&&o.activatingUI(1),document.getElementById("kmwico_li").className="sfhover",this._ShowKeyboardButton()},this._SelectorMouseOut=e=>{o.activatingUI&&o.activatingUI(0),document.getElementById("kmwico_li").className="sfunhover"},this._ShowKeymanWebKeyboard=()=>{let e=document.getElementById("KMW_Keyboard"),t=o.osk;return e.className!="kmw_disabled"&&t&&t.show&&(t.isEnabled()?t.hide():t.show(!0)),window.event&&(window.event.returnValue=!1),o.focusLastActiveElement(),!1},this.initialize=()=>{if(this.initTimer&&(window.clearTimeout(this.initTimer),this.initTimer=null),!o.initialized){this.initTimer=window.setTimeout(this.initialize,50);return}if(this.init||l.isTouchDevice())return;this.init=!0,l.addStyleSheet(this._Appearance),this._KeymanWeb_KbdList=l.createElement("ul"),this._KeymanWeb_KbdList.id="KeymanWeb_KbdList";let e=document.getElementById("KeymanWebControl");if(!e){let n=document.getElementsByTagName("div");for(let r=0;r<n.length;r++)if(n[r].className=="KeymanWebControl"){e=n[r];break}}!e&&document.body!=null&&(e=document.createElement("DIV"),e.id="KeymanWebControl",document.body.insertBefore(e,document.body.firstChild),this._insertedElem=e);let t=l.getOption("resources")+"ui/button/";if(e){let n=document.createElement("DIV"),r=n.style;r.clear="both",e.parentNode.insertBefore(n,e.nextSibling);let c=l.createElement("img"),p=l.createElement("ul"),h=l.createElement("li");c.id="kmwico_a",c.src=t+"kmw_button.gif",c.onclick=function(){return!1},h.appendChild(c),h.id="kmwico_li",p.appendChild(h),p.id="kmwico",p.style.display="block",e.appendChild(p)}else return;if(!o.iOS){let n=l.createElement("li"),r=l.createElement("a"),c=l.createElement("img");c.src=t+"kbdicon.gif",r.appendChild(c);let p=document.createTextNode(" Hide Keyboard"),h=document.createTextNode(" Show Keyboard"),y=l.createElement("span");y.id="KMW_KbdVisibleMsg",y.appendChild(p),r.appendChild(y);let b=l.createElement("span");b.id="KMW_KbdHiddenMsg",b.appendChild(h),r.appendChild(b),r.onmousedown=this._ShowKeymanWebKeyboard,r.href="#",r.id="KMW_Keyboard",n.id="KMW_ButtonUI_KbdIcon",n.appendChild(r),this._KMWSel=r,this._KeymanWeb_KbdList.appendChild(n)}let i=l.createElement("li");i.id="KMW_ButtonUI_KbdList";let s=l.createElement("a");s.appendChild(document.createTextNode("(System keyboard)")),s.onclick=this._SelectKeyboard,s.href="#",s.id="KMWSel_$",s.className="selected",i.appendChild(s),this._KMWSel=s,this._KeymanWeb_KbdList.appendChild(i),this.updateKeyboardList(),document.getElementById("kmwico_li").appendChild(this._KeymanWeb_KbdList);let a=document.getElementById("kmwico_li");l.attachDOMEvent(a,"mousedown",this._SelectorMouseDown),l.attachDOMEvent(a,"mouseover",this._SelectorMouseOver),l.attachDOMEvent(a,"mouseout",this._SelectorMouseOut),l.attachDOMEvent(a,"mouseup",this._SelectorMouseUp),this.registerEvents(),o.focusLastActiveElement()},this.updateKeyboardList=()=>{if(this.updateList=!1,!this.init)return;for(let t=this._KeymanWeb_KbdList.childNodes.length;t>2;t--)this._KeymanWeb_KbdList.removeChild(this._KeymanWeb_KbdList.childNodes[t-1]);let e=o.getKeyboards();if(e.length>0)for(let t=0;t<e.length;t++)this.registerKeyboard(e[t].InternalName,e[t].LanguageName,e[t].Name,e[t].LanguageCode)},this._Appearance=`
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
`}_ShowSelected(){let e=o.getActiveKeyboard(),t=o.getActiveLanguage(),i=this._KeymanWeb_KbdList.childNodes,s=/^KMWSel_(.*)\$(.*)$/;for(let n=1;n<i.length;n++)i[n].childNodes[0].className="";let a;for(a=2;a<i.length;a++){let n=s.exec(i[a].childNodes[0].id);if(n&&n[1]==e&&n[2]==t)break}a>=i.length&&(a=1),i[a].childNodes[0].className="selected"}_FocusFirstInput(){let e=null,t=null,i=document.getElementsByTagName("input"),s=document.getElementsByTagName("textarea"),a;for(a=0;a<i.length&&i[a].type!="text";a++);a<i.length&&(e=i[a]),s.length>0&&(t=s[0]),!(!e&&!t)&&(e&&!t?e.focus():t&&!e?t.focus():e.offsetTop<t.offsetTop?e.focus():e.offsetTop>t.offsetTop?t.focus():e.offsetLeft<t.offsetLeft?e.focus():t.focus())}_ShowKeyboardButton(e){let t=o.getActiveKeyboard(),i=document.getElementById("KMW_Keyboard");if(arguments.length>0&&(t=e),i)if(t==""||o.isCJK())i.className="kmw_disabled";else{let s=o.osk;i.className=s&&s.isEnabled()?"kmw_show":"kmw_hide"}}registerEvents(){let e=o.osk;e&&(e.addEventListener("show",t=>{let i=o.getLastActiveElement();return i&&(t.userLocated||(t.x=l.getAbsoluteX(i),t.y=l.getAbsoluteY(i)+i.offsetHeight)),this._ShowKeyboardButton(),t}),e.addEventListener("hide",function(t){if(arguments.length>0&&t.HiddenByUser){let i=document.getElementById("KMW_Keyboard");i&&(i.className="kmw_hide")}}))}shutdown(){let e=this._insertedElem;e&&e.parentNode.removeChild(e)}registerKeyboard(e,t,i,s){let a=l.createElement("li"),n=l.createElement("a"),r=i.replace(/\s?keyboard/i,"");if(t){let c=t.split(",")[0];i.search(c)==-1&&(r=c+" ("+r+")")}r.length>26&&(r=r.substr(0,24)+"\u2026"),n.appendChild(document.createTextNode(r)),n.onclick=this._SelectKeyboard,n.href="#",n.id="KMWSel_"+e+"$"+s,a.appendChild(n),this._KeymanWeb_KbdList.appendChild(a)}};f(d,"UIButton");let m=d,u=o.ui=new m;o.addEventListener("keyboardregistered",function(w){u.updateList=!0,u.updateTimer&&clearTimeout(u.updateTimer),u.updateTimer=window.setTimeout(u.updateKeyboardList,20)}),u.initialize()}catch(l){}}else throw new Error("`keyman` global is missing; Keyman Engine for Web script has not been loaded");})();
//# sourceMappingURL=kmwuibutton.js.map
