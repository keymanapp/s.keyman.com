if(typeof keyman === 'undefined') {console.log('Keyboard requires KeymanWeb 10.0 or later');if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");} else {KeymanWeb.KR(new Keyboard_tsakonian());}function Keyboard_tsakonian(){this._v=(typeof keyman!="undefined"&&typeof keyman.version=="string")?parseInt(keyman.version,10):9;this.KI="Keyboard_tsakonian";this.KN="tsakonian";this.KMINVER="10.0";this.KV={F:' 1em "Catrinity"',K102:1};this.KV.KLS={"default": ["̀","1","2","3","4","5","6","7","8","9","0","-","=","","","",";","ς","ε","ρ","τ","υ","θ","ι","ο","π","[","]","͵","","","","α","σ","δ","φ","γ","η","ξ","κ","λ","́","'","","","","","","ϡ","ζ","χ","ψ","ω","β","ν","μ",",",".","/","","","","","",""],"shift": ["~","!","@","#","$","%","ͻ","&","*","(",")","_","+","","","",":","Ͻ","Ε","Ρ","Τ","Υ","Θ","Ι","Ο","Π","{","}","ʹ","","","","Α","Σ","Δ","Φ","Γ","Η","Ξ","Κ","Λ","̈","\"","","","","","","Ϡ","Ζ","Χ","Ψ","Ω","Β","Ν","Μ","<",">","?","","","","","",""],"shift-alt": ["½","©","€","϶","ϱ","ϐ","ϕ","ϑ","ϴ","ϰ","Ͱ","°","Ͷ","","","","Ϙ","ς̌","Έ","Ρ̌","Τ̔","Ύ","Ϋ","Ί","Ό","Π̔","ϖ","¬","·","","","","Ά","Σ̓","Ϛ","Τ̌","Ϝ","Ή","Ϊ","Κ̔","Λ̣","Ϳ","|","","","","","","Ͳ","Ζ̌","Σ̌","Ϲ","Ώ","΄Ϋ","Ν̇","Ν̑","΄Ϊ","Ϗ","Ϟ","","","","","",""],"alt": ["̌","®","£","ϵ","ϼ","§","¶","¥","¤","¦","ͱ","±","ͷ","","","","ϙ","ς̓","έ","ρ̌","τ̔","ύ","ϋ","ί","ό","π̔","«","»","ͺ","","","","ά","σ̓","ϛ","τ̌","ϝ","ή","ϊ","κ̔","λ̣","ϳ","\\","","","","","","ͳ","ζ̌","σ̌","ϲ","ώ","ΰ","ν̇","ν̑","ΐ","ϗ","ϟ","","","","","",""]};this.KV.BK=(function(x){var e=Array.apply(null,Array(65)).map(String.prototype.valueOf,""),r=[],v,i,m=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];for(i=m.length-1;i>=0;i--)if((v=x[m[i]])||r.length)r=(v?v:e).slice().concat(r);return r})(this.KV.KLS);this.KDU=0;this.KH='';this.KM=0;this.KBVER="1.0";this.KMBM=0x0050;this.KVKL={"tablet":{"font":"Catrinity","displayUnderlying":false,"layer":[{"id":"default","row":[{"id":"1","key":[{"id":"K_1","text":"1"},{"id":"K_2","text":"2"},{"id":"K_3","text":"3"},{"id":"K_4","text":"4"},{"id":"K_5","text":"5"},{"id":"K_6","text":"6"},{"id":"K_7","text":"7"},{"id":"K_8","text":"8"},{"id":"K_9","text":"9"},{"id":"K_0","text":"0"},{"id":"K_HYPHEN","text":"-"},{"id":"K_EQUAL","text":"="},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"2","key":[{"id":"K_Q","pad":"75","text":"\u037E"},{"id":"K_W","text":"\u03C2"},{"id":"K_E","text":"\u03B5"},{"id":"K_R","text":"\u03C1"},{"id":"K_T","text":"\u03C4"},{"id":"K_Y","text":"\u03C5"},{"id":"K_U","text":"\u03B8"},{"id":"K_I","text":"\u03B9"},{"id":"K_O","text":"\u03BF"},{"id":"K_P","text":"\u03C0"},{"id":"K_LBRKT","text":"["},{"id":"K_RBRKT","text":"]"}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"\u0340"},{"id":"K_A","text":"\u03B1"},{"id":"K_S","text":"\u03C3"},{"id":"K_D","text":"\u03B4"},{"id":"K_F","text":"\u03C6"},{"id":"K_G","text":"\u03B3"},{"id":"K_H","text":"\u03B7"},{"id":"K_J","text":"\u03BE"},{"id":"K_K","text":"\u03BA"},{"id":"K_L","text":"\u03BB"},{"id":"K_COLON","text":"\u0341"},{"id":"K_QUOTE","text":"'"},{"id":"K_BKSLASH","text":"\u0375"}]},{"id":"4","key":[{"layer":"shift","width":"160","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_oE2","text":"\u03E1"},{"id":"K_Z","text":"\u03B6"},{"id":"K_X","text":"\u03C7"},{"id":"K_C","text":"\u03C8"},{"id":"K_V","text":"\u03C9"},{"id":"K_B","text":"\u03B2"},{"id":"K_N","text":"\u03BD"},{"id":"K_M","text":"\u03BC"},{"id":"K_COMMA","text":","},{"id":"K_PERIOD","text":"."},{"id":"K_SLASH","text":"\/"}]},{"id":"5","key":[{"nextlayer":"alt","layer":"rightalt","width":"130","id":"K_LCONTROL","sp":"1","text":"alt","sk":[{"nextlayer":"alt","id":"K_LCONTROL","sp":"1","text":"alt"},{"nextlayer":"shift-alt","id":"K_LCONTROL","sp":"1","text":"shift-alt"}]},{"width":"140","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"930","id":"K_SPACE"},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"shift","row":[{"id":"1","key":[{"id":"K_1","text":"!"},{"id":"K_2","text":"@"},{"id":"K_3","text":"#"},{"id":"K_4","text":"$"},{"id":"K_5","text":"%"},{"id":"K_6","text":"\u037B"},{"id":"K_7","text":"&"},{"id":"K_8","text":"*"},{"id":"K_9","text":"("},{"id":"K_0","text":")"},{"id":"K_HYPHEN","text":"_"},{"id":"K_EQUAL","text":"+"},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"2","key":[{"id":"K_Q","pad":"75","text":":"},{"id":"K_W","text":"\u03FD"},{"id":"K_E","text":"\u0395"},{"id":"K_R","text":"\u03A1"},{"id":"K_T","text":"\u03A4"},{"id":"K_Y","text":"\u03A5"},{"id":"K_U","text":"\u0398"},{"id":"K_I","text":"\u0399"},{"id":"K_O","text":"\u039F"},{"id":"K_P","text":"\u03A0"},{"id":"K_LBRKT","text":"{"},{"id":"K_RBRKT","text":"}"}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"~"},{"id":"K_A","text":"\u0391"},{"id":"K_S","text":"\u03A3"},{"id":"K_D","text":"\u0394"},{"id":"K_F","text":"\u03A6"},{"id":"K_G","text":"\u0393"},{"id":"K_H","text":"\u0397"},{"id":"K_J","text":"\u039E"},{"id":"K_K","text":"\u039A"},{"id":"K_L","text":"\u039B"},{"id":"K_COLON","text":"\u0308"},{"id":"K_QUOTE","text":"\""},{"id":"K_BKSLASH","text":"\u0374"}]},{"id":"4","key":[{"layer":"default","width":"160","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_oE2","text":"\u03E0"},{"id":"K_Z","text":"\u0396"},{"id":"K_X","text":"\u03A7"},{"id":"K_C","text":"\u03A8"},{"id":"K_V","text":"\u03A9"},{"id":"K_B","text":"\u0392"},{"id":"K_N","text":"\u039D"},{"id":"K_M","text":"\u039C"},{"id":"K_COMMA","text":"<"},{"id":"K_PERIOD","text":">"},{"id":"K_SLASH","text":"?"}]},{"id":"5","key":[{"nextlayer":"alt","layer":"rightalt-shift","width":"130","id":"K_LCONTROL","sp":"1","text":"alt","sk":[{"nextlayer":"alt","id":"K_LCONTROL","sp":"1","text":"alt"},{"nextlayer":"shift-alt","id":"K_LCONTROL","sp":"1","text":"shift-alt"}]},{"width":"140","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"930","id":"K_SPACE"},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"alt","row":[{"id":"1","key":[{"id":"K_1","text":"\u00AE"},{"id":"K_2","text":"\u00A3"},{"id":"K_3","text":"\u03F5"},{"id":"K_4","text":"\u03FC"},{"id":"K_5","text":"\u00A7"},{"id":"K_6","text":"\u00B6"},{"id":"K_7","text":"\u00A5"},{"id":"K_8","text":"\u00A4"},{"id":"K_9","text":"\u00A6"},{"id":"K_0","text":"\u0371"},{"id":"K_HYPHEN","text":"\u00B1"},{"id":"K_EQUAL","text":"\u0377"},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"2","key":[{"id":"K_Q","pad":"75","text":"\u03D9"},{"id":"K_W","text":"\u03C2\u0313"},{"id":"K_E","text":"\u03AD"},{"id":"K_R","text":"\u03C1\u030C"},{"id":"K_T","text":"\u03C4\u0314"},{"id":"K_Y","text":"\u03CD"},{"id":"K_U","text":"\u03CB"},{"id":"K_I","text":"\u03AF"},{"id":"K_O","text":"\u03CC"},{"id":"K_P","text":"\u03C0\u0314"},{"id":"K_LBRKT","text":"\u00AB"},{"id":"K_RBRKT","text":"\u00BB"}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"\u030C"},{"id":"K_A","text":"\u03AC"},{"id":"K_S","text":"\u03C3\u0313"},{"id":"K_D","text":"\u03DB"},{"id":"K_F","text":"\u03C4\u030C"},{"id":"K_G","text":"\u03DD"},{"id":"K_H","text":"\u03AE"},{"id":"K_J","text":"\u03CA"},{"id":"K_K","text":"\u03BA\u0314"},{"id":"K_L","text":"\u03BB\u0323"},{"id":"K_COLON","text":"\u03F3"},{"id":"K_QUOTE","text":"\\"},{"id":"K_BKSLASH","text":"\u037A"}]},{"id":"4","key":[{"layer":"rightalt-shift","width":"160","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_oE2","text":"\u0373"},{"id":"K_Z","text":"\u03B6\u030C"},{"id":"K_X","text":"\u03C3\u030C"},{"id":"K_C","text":"\u03F2"},{"id":"K_V","text":"\u03CE"},{"id":"K_B","text":"\u03B0"},{"id":"K_N","text":"\u03BD\u0307"},{"id":"K_M","text":"\u03BD\u0311"},{"id":"K_COMMA","text":"\u0390"},{"id":"K_PERIOD","text":"\u03D7"},{"id":"K_SLASH","text":"\u03DF"}]},{"id":"5","key":[{"nextlayer":"default","layer":"default","width":"130","id":"K_LCONTROL","sp":"1","text":"default","sk":[{"nextlayer":"shift-alt","id":"K_LCONTROL","sp":"1","text":"shift-alt"}]},{"width":"140","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"930","id":"K_SPACE"},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"shift-alt","row":[{"id":"1","key":[{"id":"K_1","text":"\u00A9"},{"id":"K_2","text":"\u20AC"},{"id":"K_3","text":"\u03F6"},{"id":"K_4","text":"\u03F1"},{"id":"K_5","text":"\u03D0"},{"id":"K_6","text":"\u03D5"},{"id":"K_7","text":"\u03D1"},{"id":"K_8","text":"\u03F4"},{"id":"K_9","text":"\u03F0"},{"id":"K_0","text":"\u0370"},{"id":"K_HYPHEN","text":"\u00B0"},{"id":"K_EQUAL","text":"\u0376"},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"2","key":[{"id":"K_Q","pad":"75","text":"\u03D8"},{"id":"K_W","text":"\u03C2\u030C"},{"id":"K_E","text":"\u0388"},{"id":"K_R","text":"\u03A1\u030C"},{"id":"K_T","text":"\u03A4\u0314"},{"id":"K_Y","text":"\u038E"},{"id":"K_U","text":"\u03AB"},{"id":"K_I","text":"\u038A"},{"id":"K_O","text":"\u038C"},{"id":"K_P","text":"\u03A0\u0314"},{"id":"K_LBRKT","text":"\u03D6"},{"id":"K_RBRKT","text":"\u00AC"}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"\u00BD"},{"id":"K_A","text":"\u0386"},{"id":"K_S","text":"\u03A3\u0313"},{"id":"K_D","text":"\u03DA"},{"id":"K_F","text":"\u03A4\u030C"},{"id":"K_G","text":"\u03DC"},{"id":"K_H","text":"\u0389"},{"id":"K_J","text":"\u03AA"},{"id":"K_K","text":"\u039A\u0314"},{"id":"K_L","text":"\u039B\u0323"},{"id":"K_COLON","text":"\u037F"},{"id":"K_QUOTE","text":"|"},{"id":"K_BKSLASH","text":"\u0387"}]},{"id":"4","key":[{"layer":"rightalt","width":"160","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_oE2","text":"\u0372"},{"id":"K_Z","text":"\u0396\u030C"},{"id":"K_X","text":"\u03A3\u030C"},{"id":"K_C","text":"\u03F9"},{"id":"K_V","text":"\u038F"},{"id":"K_B","text":"\u0384\u03AB"},{"id":"K_N","text":"\u039D\u0307"},{"id":"K_M","text":"\u039D\u0311"},{"id":"K_COMMA","text":"\u0384\u03AA"},{"id":"K_PERIOD","text":"\u03CF"},{"id":"K_SLASH","text":"\u03DE"}]},{"id":"5","key":[{"nextlayer":"default","layer":"shift","width":"130","id":"K_LCONTROL","sp":"1","text":"default","sk":[{"nextlayer":"alt","id":"K_LCONTROL","sp":"1","text":"alt"}]},{"width":"140","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"930","id":"K_SPACE"},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]}]}};this.KVER="15.0.270.0";this.KVS=[];this.gs=function(t,e) {return this.g0(t,e);};this.gs=function(t,e) {return this.g0(t,e);};this.g0=function(t,e) {var k=KeymanWeb,r=0,m=0;if(k.KKM(e,16384,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϡ");}}else if(k.KKM(e,16400,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϡ");}}else if(k.KKM(e,16464,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ͳ");}}else if(k.KKM(e,16448,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ͳ");}}else if(k.KKM(e,16464,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"©");}}else if(k.KKM(e,16400,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"!");}}else if(k.KKM(e,16464,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"|");}}else if(k.KKM(e,16400,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\"");}}else if(k.KKM(e,16464,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"϶");}}else if(k.KKM(e,16400,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"#");}}else if(k.KKM(e,16464,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϱ");}}else if(k.KKM(e,16400,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"$");}}else if(k.KKM(e,16464,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϐ");}}else if(k.KKM(e,16400,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"%");}}else if(k.KKM(e,16464,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϑ");}}else if(k.KKM(e,16400,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"&");}}else if(k.KKM(e,16448,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\\");}}else if(k.KKM(e,16384,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"'");}}else if(k.KKM(e,16464,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϰ");}}else if(k.KKM(e,16400,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"(");}}else if(k.KKM(e,16464,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ͱ");}}else if(k.KKM(e,16400,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,")");}}else if(k.KKM(e,16464,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϴ");}}else if(k.KKM(e,16400,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"*");}}else if(k.KKM(e,16464,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ͷ");}}else if(k.KKM(e,16400,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"+");}}else if(k.KKM(e,16448,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ΐ");}}else if(k.KKM(e,16384,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,",");}}else if(k.KKM(e,16448,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"±");}}else if(k.KKM(e,16384,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"-");}}else if(k.KKM(e,16448,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϗ");}}else if(k.KKM(e,16384,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,".");}}else if(k.KKM(e,16448,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϟ");}}else if(k.KKM(e,16384,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"/");}}else if(k.KKM(e,16448,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ͱ");}}else if(k.KKM(e,16384,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"0");}}else if(k.KKM(e,16448,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"®");}}else if(k.KKM(e,16384,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"1");}}else if(k.KKM(e,16448,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"£");}}else if(k.KKM(e,16384,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"2");}}else if(k.KKM(e,16448,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϵ");}}else if(k.KKM(e,16384,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"3");}}else if(k.KKM(e,16448,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϼ");}}else if(k.KKM(e,16384,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"4");}}else if(k.KKM(e,16448,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"§");}}else if(k.KKM(e,16384,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"5");}}else if(k.KKM(e,16448,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"¶");}}else if(k.KKM(e,16384,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"6");}}else if(k.KKM(e,16448,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"¥");}}else if(k.KKM(e,16384,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"7");}}else if(k.KKM(e,16448,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"¤");}}else if(k.KKM(e,16384,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"8");}}else if(k.KKM(e,16448,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"¦");}}else if(k.KKM(e,16384,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"9");}}else if(k.KKM(e,16464,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϳ");}}else if(k.KKM(e,16400,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"̈");}}else if(k.KKM(e,16448,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϳ");}}else if(k.KKM(e,16384,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"́");}}else if(k.KKM(e,16464,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"΄Ϊ");}}else if(k.KKM(e,16400,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"<");}}else if(k.KKM(e,16448,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ͷ");}}else if(k.KKM(e,16384,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"=");}}else if(k.KKM(e,16464,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϗ");}}else if(k.KKM(e,16400,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,">");}}else if(k.KKM(e,16464,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϟ");}}else if(k.KKM(e,16400,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"?");}}else if(k.KKM(e,16464,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"€");}}else if(k.KKM(e,16400,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"@");}}else if(k.KKM(e,16464,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ά");}}else if(k.KKM(e,16400,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Α");}}else if(k.KKM(e,16464,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"΄Ϋ");}}else if(k.KKM(e,16400,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Β");}}else if(k.KKM(e,16400,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ψ");}}else if(k.KKM(e,16464,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϲ");}}else if(k.KKM(e,16464,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϛ");}}else if(k.KKM(e,16400,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Δ");}}else if(k.KKM(e,16464,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Έ");}}else if(k.KKM(e,16400,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ε");}}else if(k.KKM(e,16464,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Τ̌");}}else if(k.KKM(e,16400,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Φ");}}else if(k.KKM(e,16464,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϝ");}}else if(k.KKM(e,16400,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Γ");}}else if(k.KKM(e,16464,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ή");}}else if(k.KKM(e,16400,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Η");}}else if(k.KKM(e,16464,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ί");}}else if(k.KKM(e,16400,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ι");}}else if(k.KKM(e,16464,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϊ");}}else if(k.KKM(e,16400,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ξ");}}else if(k.KKM(e,16464,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Κ̔");}}else if(k.KKM(e,16400,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Κ");}}else if(k.KKM(e,16464,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Λ̣");}}else if(k.KKM(e,16400,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Λ");}}else if(k.KKM(e,16400,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Μ");}}else if(k.KKM(e,16464,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ν̑");}}else if(k.KKM(e,16464,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ν̇");}}else if(k.KKM(e,16400,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ν");}}else if(k.KKM(e,16464,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ό");}}else if(k.KKM(e,16400,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ο");}}else if(k.KKM(e,16464,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Π̔");}}else if(k.KKM(e,16400,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Π");}}if(m) {}else if(k.KKM(e,16464,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϙ");}}else if(k.KKM(e,16400,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,":");}}else if(k.KKM(e,16464,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ρ̌");}}else if(k.KKM(e,16400,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ρ");}}else if(k.KKM(e,16464,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Σ̓");}}else if(k.KKM(e,16400,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Σ");}}else if(k.KKM(e,16464,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Τ̔");}}else if(k.KKM(e,16400,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Τ");}}else if(k.KKM(e,16464,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ϋ");}}else if(k.KKM(e,16400,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Θ");}}else if(k.KKM(e,16464,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ώ");}}else if(k.KKM(e,16400,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ω");}}else if(k.KKM(e,16400,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ͻ");}}else if(k.KKM(e,16464,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ς̌");}}else if(k.KKM(e,16464,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Σ̌");}}else if(k.KKM(e,16400,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Χ");}}else if(k.KKM(e,16464,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ύ");}}else if(k.KKM(e,16400,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Υ");}}else if(k.KKM(e,16464,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ζ̌");}}else if(k.KKM(e,16400,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ζ");}}else if(k.KKM(e,16448,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"«");}}else if(k.KKM(e,16384,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"[");}}else if(k.KKM(e,16448,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ͺ");}}else if(k.KKM(e,16384,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"͵");}}else if(k.KKM(e,16448,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"»");}}else if(k.KKM(e,16384,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"]");}}else if(k.KKM(e,16464,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϕ");}}else if(k.KKM(e,16400,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ͻ");}}else if(k.KKM(e,16464,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"°");}}else if(k.KKM(e,16400,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"_");}}else if(k.KKM(e,16448,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"̌");}}else if(k.KKM(e,16384,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"̀");}}else if(k.KKM(e,16448,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ά");}}else if(k.KKM(e,16384,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"α");}}else if(k.KKM(e,16448,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ΰ");}}else if(k.KKM(e,16384,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"β");}}else if(k.KKM(e,16448,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϲ");}}else if(k.KKM(e,16384,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ψ");}}else if(k.KKM(e,16448,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϛ");}}else if(k.KKM(e,16384,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"δ");}}else if(k.KKM(e,16448,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"έ");}}else if(k.KKM(e,16384,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ε");}}else if(k.KKM(e,16448,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"τ̌");}}else if(k.KKM(e,16384,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"φ");}}else if(k.KKM(e,16448,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϝ");}}else if(k.KKM(e,16384,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"γ");}}else if(k.KKM(e,16448,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ή");}}else if(k.KKM(e,16384,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"η");}}else if(k.KKM(e,16448,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ί");}}else if(k.KKM(e,16384,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ι");}}else if(k.KKM(e,16448,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϊ");}}else if(k.KKM(e,16384,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ξ");}}else if(k.KKM(e,16448,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"κ̔");}}else if(k.KKM(e,16384,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"κ");}}else if(k.KKM(e,16448,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"λ̣");}}else if(k.KKM(e,16384,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"λ");}}else if(k.KKM(e,16384,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"μ");}}else if(k.KKM(e,16448,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ν̑");}}else if(k.KKM(e,16448,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ν̇");}}else if(k.KKM(e,16384,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ν");}}else if(k.KKM(e,16448,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ό");}}else if(k.KKM(e,16384,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ο");}}else if(k.KKM(e,16448,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"π̔");}}else if(k.KKM(e,16384,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"π");}}else if(k.KKM(e,16448,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϙ");}}else if(k.KKM(e,16384,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,";");}}else if(k.KKM(e,16448,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ρ̌");}}else if(k.KKM(e,16384,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ρ");}}else if(k.KKM(e,16448,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"σ̓");}}else if(k.KKM(e,16384,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"σ");}}else if(k.KKM(e,16448,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"τ̔");}}else if(k.KKM(e,16384,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"τ");}}else if(k.KKM(e,16448,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϋ");}}else if(k.KKM(e,16384,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"θ");}}else if(k.KKM(e,16448,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ώ");}}else if(k.KKM(e,16384,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ω");}}else if(k.KKM(e,16448,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ς̓");}}else if(k.KKM(e,16384,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ς");}}else if(k.KKM(e,16448,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"σ̌");}}else if(k.KKM(e,16384,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"χ");}}else if(k.KKM(e,16448,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ύ");}}else if(k.KKM(e,16384,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"υ");}}else if(k.KKM(e,16448,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ζ̌");}}else if(k.KKM(e,16384,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ζ");}}else if(k.KKM(e,16464,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ϖ");}}else if(k.KKM(e,16400,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"{");}}else if(k.KKM(e,16464,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"·");}}else if(k.KKM(e,16400,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ʹ");}}else if(k.KKM(e,16464,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"¬");}}else if(k.KKM(e,16400,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"}");}}else if(k.KKM(e,16464,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"½");}}else if(k.KKM(e,16400,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"~");}}return r;};}