if(typeof keyman === 'undefined') {console.log('Keyboard requires KeymanWeb 10.0 or later');if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");} else {KeymanWeb.KR(new Keyboard_batak());}function Keyboard_batak(){this._v=(typeof keyman!="undefined"&&typeof keyman.version=="string")?parseInt(keyman.version,10):9;this.KI="Keyboard_batak";this.KN="Batak";this.KMINVER="10.0";this.KV={F:' 1em "Noto Sans Batak"',K102:0};this.KV.KLS={"default": ["`","1","2","3","4","5","6","7","8","9","0","-","=","","","","᯲","ᯋ","ᯧ","ᯒ","ᯖ","ᯛ","ᯮ","ᯪ","ᯬ","ᯇ","[","]","\\","","","","ᯀ","ᯘ","ᯑ","ᯝ","ᯎ","ᯄ","ᯐ","ᯂ","ᯞ",";","'","","","","","","\\","ᯙ","ᯨ  ","ᯡ","ᯠ","ᯅ","ᯉ","ᯔ",",",".","/","","","","","",""],"shift": ["~","!","@","#","$","%","^","&","*","(",")","_","+","","","","᯳","ᯌ","ᯩ","ᯓ","ᯗ","ᯜ","ᯥ","ᯤ","ᯭ","ᯈ","{","}","|","","","","ᯁ","ᯚ","ᯢ","ᯰ ","ᯏ","ᯱ ","ᯫ ","ᯃ","ᯟ",":","\"","","","","","","|","ᯯ","ᯣ","᯦","ᯍ","ᯆ","ᯊ","ᯕ","<",">","?","","","","","",""]};this.KV.BK=(function(x){var e=Array.apply(null,Array(65)).map(String.prototype.valueOf,""),r=[],v,i,m=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];for(i=m.length-1;i>=0;i--)if((v=x[m[i]])||r.length)r=(v?v:e).slice().concat(r);return r})(this.KV.KLS);this.KDU=1;this.KH="https://bennylin.github.io/";this.KM=0;this.KBVER="1.0";this.KMBM=0x0010;this.KVKD="T_new_1 T_new_2 T_new_3 T_new_4";this.KVKL={"tablet":{"font":"Noto Sans Batak","displayUnderlying":false,"layer":[{"id":"default","row":[{"id":"1","key":[{"id":"K_1","text":"1","sk":[{"layer":"shift","id":"K_1","text":"!"}]},{"id":"K_2","text":"2","sk":[{"layer":"shift","id":"K_2","text":"@"}]},{"id":"K_3","text":"3","sk":[{"layer":"shift","id":"K_3","text":"#"}]},{"id":"K_4","text":"4","sk":[{"layer":"shift","id":"K_4","text":"$"}]},{"id":"K_5","text":"5","sk":[{"layer":"shift","id":"K_5","text":"%"}]},{"id":"K_6","text":"6","sk":[{"layer":"shift","id":"K_6","text":"^"}]},{"id":"K_7","text":"7","sk":[{"layer":"shift","id":"K_7","text":"&"}]},{"id":"K_8","text":"8","sk":[{"layer":"shift","id":"K_8","text":"*"}]},{"id":"K_9","text":"9","sk":[{"layer":"shift","id":"K_9","text":"("}]},{"id":"K_0","text":"0","sk":[{"layer":"shift","id":"K_0","text":")"}]},{"id":"K_HYPHEN","text":"-","sk":[{"layer":"shift","id":"K_HYPHEN","text":"_"}]},{"id":"K_EQUAL","text":"=","sk":[{"layer":"shift","id":"K_EQUAL","text":"+"}]}]},{"id":"2","key":[{"id":"K_Q","text":"\u1BF2","sk":[{"layer":"shift","id":"K_Q","text":"\u1BF3"}]},{"id":"K_W","text":"\u1BCB","sk":[{"layer":"shift","id":"K_W","text":"\u1BCC"}]},{"id":"K_E","text":"\u1BE7","sk":[{"layer":"shift","id":"K_E","text":"\u1BE9"}]},{"id":"K_R","text":"\u1BD2","sk":[{"layer":"shift","id":"K_R","text":"\u1BD3"}]},{"id":"K_T","text":"\u1BD6","sk":[{"layer":"shift","id":"K_T","text":"\u1BD7"}]},{"id":"K_Y","text":"\u1BDB","sk":[{"layer":"shift","id":"K_Y","text":"\u1BDC"}]},{"id":"K_U","text":"\u1BEE","sk":[{"layer":"shift","id":"K_U","text":"\u1BE5"}]},{"id":"K_I","text":"\u1BEA","sk":[{"layer":"shift","id":"K_I","text":"\u1BE4"}]},{"id":"K_O","text":"\u1BEC","sk":[{"layer":"shift","id":"K_O","text":"\u1BED"}]},{"id":"K_P","text":"\u1BC7","sk":[{"layer":"shift","id":"K_P","text":"\u1BC8"}]},{"id":"K_LBRKT","text":"[","sk":[{"layer":"shift","id":"K_LBRKT","text":"{"}]},{"id":"K_RBRKT","text":"]","sk":[{"layer":"shift","id":"K_RBRKT","text":"}"}]}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"`","sk":[{"layer":"shift","id":"K_BKQUOTE","text":"~"}]},{"id":"K_A","text":"\u1BC0","sk":[{"layer":"shift","id":"K_A","text":"\u1BC1"}]},{"id":"K_S","text":"\u1BD8","sk":[{"layer":"shift","id":"K_S","text":"\u1BDA"}]},{"id":"K_D","text":"\u1BD1","sk":[{"layer":"shift","id":"K_D","text":"\u1BE2"}]},{"id":"K_F","text":"\u1BDD","sk":[{"layer":"shift","id":"K_F","text":"\u1BF0"}]},{"id":"K_G","text":"\u1BCE","sk":[{"layer":"shift","id":"K_G","text":"\u1BCF"}]},{"id":"K_H","text":"\u1BC4","sk":[{"layer":"shift","id":"K_H","text":"\u1BF1"}]},{"id":"K_J","text":"\u1BD0","sk":[{"layer":"shift","id":"K_J","text":"\u1BEB"}]},{"id":"K_K","text":"\u1BC2","sk":[{"layer":"shift","id":"K_K","text":"\u1BC3"}]},{"id":"K_L","text":"\u1BDE","sk":[{"layer":"shift","id":"K_L","text":"\u1BDF"}]},{"id":"K_COLON","text":";","sk":[{"layer":"shift","id":"K_COLON","text":":"}]},{"id":"K_QUOTE","text":"'","sk":[{"layer":"shift","id":"K_QUOTE","text":"\""}]}]},{"id":"4","key":[{"nextlayer":"shift","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_Z","text":"\u1BDA","sk":[{"layer":"shift","id":"K_Z","text":"\u1BEF"}]},{"id":"K_X","text":"\u1BE8","sk":[{"layer":"shift","id":"K_X","text":"\u1BE3"}]},{"id":"K_C","text":"\u1BE0","sk":[{"layer":"shift","id":"K_C","text":"\u1BE6"}]},{"id":"K_V","text":"\u1BCD","sk":[{"layer":"shift","id":"K_V","text":"\u1BCD"}]},{"id":"K_B","text":"\u1BC5","sk":[{"layer":"shift","id":"K_B","text":"\u1BC6"}]},{"id":"K_N","text":"\u1BC9","sk":[{"layer":"shift","id":"K_N","text":"\u1BCA"}]},{"id":"K_M","text":"\u1BD4","sk":[{"layer":"shift","id":"K_M","text":"\u1BD5"}]},{"id":"K_COMMA","text":",","sk":[{"layer":"shift","id":"K_COMMA","text":"<"}]},{"id":"K_PERIOD","text":".","sk":[{"layer":"shift","id":"K_PERIOD","text":">"}]},{"id":"K_SLASH","text":"\/","sk":[{"layer":"shift","id":"K_SLASH","text":"?"}]},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"5","key":[{"id":"K_LOPT","sp":"1","text":"*Menu*"},{"id":"K_BKSLASH","text":"\\","sk":[{"layer":"shift","id":"K_BKSLASH","text":"|"}]},{"width":"700","id":"K_SPACE"},{"id":"T_new_1","text":"\u1BFC","sk":[{"layer":"default","id":"T_new_3","text":"\u1BFE"}]},{"id":"T_new_2","text":"\u1BFD","sk":[{"layer":"default","id":"T_new_4","text":"\u1BFF"}]},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"shift","row":[{"id":"1","key":[{"id":"K_1","text":"!"},{"id":"K_2","text":"@"},{"id":"K_3","text":"#"},{"id":"K_4","text":"$"},{"id":"K_5","text":"%"},{"id":"K_6","text":"^"},{"id":"K_7","text":"&"},{"id":"K_8","text":"*"},{"id":"K_9","text":"("},{"id":"K_0","text":")"},{"id":"K_HYPHEN","text":"_"},{"id":"K_EQUAL","text":"+"}]},{"id":"2","key":[{"id":"K_Q","text":"\u1BF3"},{"id":"K_W","text":"\u1BCC"},{"id":"K_E","text":"\u1BE9"},{"id":"K_R","text":"\u1BD3"},{"id":"K_T","text":"\u1BD7"},{"id":"K_Y","text":"\u1BDC"},{"id":"K_U","text":"\u1BE5"},{"id":"K_I","text":"\u1BE4"},{"id":"K_O","text":"\u1BED"},{"id":"K_P","text":"\u1BC8"},{"id":"K_LBRKT","text":"{"},{"id":"K_RBRKT","text":"}"}]},{"id":"3","key":[{"id":"K_BKQUOTE","text":"~"},{"id":"K_A","text":"\u1BC1"},{"id":"K_S","text":"\u1BD9"},{"id":"K_D","text":"\u1BE2"},{"id":"K_F","text":"\u1BF0"},{"id":"K_G","text":"\u1BCF"},{"id":"K_H","text":"\u1BF1"},{"id":"K_J","text":"\u1BEB"},{"id":"K_K","text":"\u1BC3"},{"id":"K_L","text":"\u1BDF"},{"id":"K_COLON","text":":"},{"id":"K_QUOTE","text":"\""}]},{"id":"4","key":[{"nextlayer":"default","id":"K_SHIFT","sp":"2","text":"*Shift*"},{"id":"K_Z","text":"\u1BEF"},{"id":"K_X","text":"\u1BE3"},{"id":"K_C","text":"\u1BE1"},{"id":"K_V","text":"\u1BCD"},{"id":"K_B","text":"\u1BC6"},{"id":"K_N","text":"\u1BCA"},{"id":"K_M","text":"\u1BD5"},{"id":"K_COMMA","text":"<"},{"id":"K_PERIOD","text":">"},{"id":"K_SLASH","text":"?"},{"width":"100","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"5","key":[{"id":"K_LOPT","sp":"1","text":"*Menu*"},{"id":"K_BKSLASH","text":"|"},{"width":"700","id":"K_SPACE"},{"layer":"default","id":"T_new_3","text":"\u1BFE"},{"layer":"default","id":"T_new_4","text":"\u1BFF"},{"width":"145","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]}]}};this.KVER="14.0.276.0";this.gs=function(t,e) {return this.g0(t,e);};this.g0=function(t,e) {var k=KeymanWeb,r=0,m=0;if(k.KKM(e,16384,256)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯼");}}else if(k.KKM(e,16384,257)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯽");}}else if(k.KKM(e,16384,258)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯾");}}else if(k.KKM(e,16384,259)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯿");}}else if(k.KKM(e,16400,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯁ");}}else if(k.KKM(e,16400,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯆ");}}else if(k.KKM(e,16400,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯦");}}else if(k.KKM(e,16400,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯢ");}}else if(k.KKM(e,16400,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯩ");}}else if(k.KKM(e,16400,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯰ");}}else if(k.KKM(e,16400,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯏ");}}else if(k.KKM(e,16400,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯱ");}}else if(k.KKM(e,16400,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯤ");}}else if(k.KKM(e,16400,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯫ");}}else if(k.KKM(e,16400,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯃ");}}else if(k.KKM(e,16400,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯟ");}}else if(k.KKM(e,16400,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯕ");}}else if(k.KKM(e,16400,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯊ");}}else if(k.KKM(e,16400,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯭ");}}else if(k.KKM(e,16400,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯈ");}}else if(k.KKM(e,16400,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯳");}}else if(k.KKM(e,16400,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯓ");}}else if(k.KKM(e,16400,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯚ");}}else if(k.KKM(e,16400,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯗ");}}else if(k.KKM(e,16400,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯥ");}}else if(k.KKM(e,16400,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯍ");}}else if(k.KKM(e,16400,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯌ");}}else if(k.KKM(e,16400,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯣ");}}else if(k.KKM(e,16400,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯜ");}}else if(k.KKM(e,16400,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯯ");}}else if(k.KKM(e,16384,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯀ");}}else if(k.KKM(e,16384,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯅ");}}else if(k.KKM(e,16384,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯡ");}}else if(k.KKM(e,16384,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯑ");}}else if(k.KKM(e,16384,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯧ");}}else if(k.KKM(e,16384,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯝ");}}else if(k.KKM(e,16384,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯎ");}}else if(k.KKM(e,16384,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯄ");}}else if(k.KKM(e,16384,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯪ");}}else if(k.KKM(e,16384,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯐ");}}else if(k.KKM(e,16384,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯂ");}}else if(k.KKM(e,16384,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯞ");}}else if(k.KKM(e,16384,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯔ");}}else if(k.KKM(e,16384,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯉ");}}else if(k.KKM(e,16384,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯬ");}}else if(k.KKM(e,16384,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯇ");}}else if(k.KKM(e,16384,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"᯲");}}else if(k.KKM(e,16384,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯒ");}}else if(k.KKM(e,16384,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯘ");}}else if(k.KKM(e,16384,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯖ");}}else if(k.KKM(e,16384,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯮ");}}else if(k.KKM(e,16384,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯠ");}}else if(k.KKM(e,16384,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯋ");}}else if(k.KKM(e,16384,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯨ");}}else if(k.KKM(e,16384,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯛ");}}else if(k.KKM(e,16384,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ᯙ");}}return r;};}