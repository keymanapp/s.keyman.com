if(typeof keyman === 'undefined') {console.log('Keyboard requires KeymanWeb 10.0 or later');if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");} else {KeymanWeb.KR(new Keyboard_otoe_missouria());}function Keyboard_otoe_missouria(){this._v=(typeof keyman!="undefined"&&typeof keyman.version=="string")?parseInt(keyman.version,10):9;this.KI="Keyboard_otoe_missouria";this.KN="Otoe-Missouria";this.KMINVER="10.0";this.KV={F:' 1em "Arial"',K102:0};this.KV.KLS={"shift": ["́","!","@","#","$","%","^","&","*","(",")","_","+","","","","Ą","W","E","R","T","Y","U","I","O","P","{","}","|","","","","A","S","D","Ð","G","H","J","K","Į",":","\"","","","","","","","Z","X","C","Ų","B","N","M","<",">","?","","","","","",""],"default": ["́","1","2","3","4","5","6","7","8","9","0","-","=","","","","ą","w","e","r","t","y","u","i","o","p","[","]","\\","","","","a","s","d","ð","g","h","j","k","į",";","'","","","","","","","z","x","c","ų","b","n","m",",",".","/","","","","","",""]};this.KV.BK=(function(x){var e=Array.apply(null,Array(65)).map(String.prototype.valueOf,""),r=[],v,i,m=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];for(i=m.length-1;i>=0;i--)if((v=x[m[i]])||r.length)r=(v?v:e).slice().concat(r);return r})(this.KV.KLS);this.KDU=0;this.KH='';this.KM=0;this.KBVER="1.0";this.KMBM=0x0010;this.KVKL={"phone":{"displayUnderlying":false,"layer":[{"id":"default","row":[{"id":"1","key":[{"width":"125","id":"K_Q","text":"\u0105"},{"width":"125","id":"K_W","text":"w"},{"width":"125","id":"K_E","text":"e"},{"width":"125","id":"K_R","text":"r"},{"width":"125","id":"K_T","text":"t"},{"width":"125","id":"K_Y","text":"y"},{"width":"125","id":"K_U","text":"u"},{"width":"125","id":"K_I","text":"i"},{"width":"125","id":"K_O","text":"o"},{"width":"125","id":"K_P","text":"p"}]},{"id":"2","key":[{"width":"125","id":"K_BKQUOTE","text":"\u0301"},{"width":"125","id":"K_A","text":"a"},{"width":"125","id":"K_S","text":"s"},{"width":"125","id":"K_D","text":"d"},{"width":"125","id":"K_F","text":"\u00F0"},{"width":"125","id":"K_G","text":"g"},{"width":"125","id":"K_H","text":"h"},{"width":"125","id":"K_J","text":"j"},{"width":"125","id":"K_K","text":"k"},{"width":"125","id":"K_L","text":"\u012F"}]},{"id":"3","key":[{"nextlayer":"shift","layer":"default","width":"175","id":"K_SHIFT","pad":"30","sp":"1","text":"*Shift*"},{"width":"125","id":"K_Z","text":"z"},{"width":"125","id":"K_X","text":"x"},{"width":"125","id":"K_C","text":"c"},{"width":"125","id":"K_V","text":"\u0173"},{"width":"125","id":"K_B","text":"b"},{"width":"125","id":"K_N","text":"n"},{"width":"125","id":"K_M","text":"m"},{"width":"175","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"4","key":[{"width":"150","id":"K_LOPT","sp":"1","text":"*Menu*"},{"nextlayer":"numerals","width":"150","id":"K_NUMLOCK","sp":"1","text":"*123*"},{"width":"800","id":"K_SPACE","text":"space"},{"width":"225","id":"K_ENTER","sp":"1","text":"return"}]}]},{"id":"shift","row":[{"id":"1","key":[{"width":"125","id":"U_0104","text":"\u0104"},{"width":"125","id":"K_W","text":"W"},{"width":"125","id":"K_E","text":"E"},{"width":"125","id":"K_R","text":"R"},{"width":"125","id":"K_T","text":"T"},{"width":"125","id":"K_Y","text":"Y"},{"width":"125","id":"K_U","text":"U"},{"width":"125","id":"K_I","text":"I"},{"width":"125","id":"K_O","text":"O"},{"width":"125","id":"K_P","text":"P"}]},{"id":"2","key":[{"width":"125","id":"K_BKQUOTE","text":"\u0301"},{"width":"125","id":"K_A","text":"A"},{"width":"125","id":"K_S","text":"S"},{"width":"125","id":"K_D","text":"D"},{"width":"125","id":"U_00D0","text":"\u00D0"},{"width":"125","id":"K_G","text":"G"},{"width":"125","id":"K_H","text":"H"},{"width":"125","id":"K_J","text":"J"},{"width":"125","id":"K_K","text":"K"},{"width":"125","id":"U_012E","text":"\u012E"}]},{"id":"3","key":[{"nextlayer":"default","width":"175","id":"K_SHIFT","pad":"30","sp":"1","text":"*Shift*"},{"width":"125","id":"K_Z","text":"Z"},{"width":"125","id":"K_X","text":"X"},{"width":"125","id":"K_C","text":"C"},{"width":"125","id":"U_0172","text":"\u0172"},{"width":"125","id":"K_B","text":"B"},{"width":"125","id":"K_N","text":"N"},{"width":"125","id":"K_M","text":"M"},{"width":"175","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"4","key":[{"width":"150","id":"K_LOPT","sp":"1","text":"*Menu*"},{"nextlayer":"numerals","width":"150","id":"K_NUMLOCK","sp":"1","text":"*123*"},{"width":"800","id":"K_SPACE"},{"width":"225","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"numerals","row":[{"id":"1","key":[{"width":"125","id":"K_1","text":"1"},{"width":"125","id":"K_2","text":"2"},{"width":"125","id":"K_3","text":"3"},{"width":"125","id":"K_4","text":"4"},{"width":"125","id":"K_5","text":"5"},{"width":"125","id":"K_6","text":"6"},{"width":"125","id":"K_7","text":"7"},{"width":"125","id":"K_8","text":"8"},{"width":"125","id":"K_9","text":"9"},{"width":"125","id":"K_0","text":"0"}]},{"id":"2","key":[{"width":"125","id":"K_HYPHEN","text":"-"},{"width":"125","id":"K_SLASH","text":"\/"},{"width":"125","id":"K_COLON","text":":"},{"layer":"shift","width":"125","id":"K_COLON","text":";"},{"layer":"shift","width":"125","id":"K_9","text":"("},{"layer":"shift","width":"125","id":"K_0","text":")"},{"layer":"shift","width":"125","id":"K_4","text":"$"},{"layer":"shift","width":"125","id":"K_7","text":"&"},{"layer":"shift","width":"125","id":"K_2","text":"@"},{"layer":"shift","width":"125","id":"K_QUOTE","text":"\""}]},{"id":"3","key":[{"nextlayer":"rightalt","width":"150","id":"K_NUMLOCK","sp":"1","text":"#+="},{"width":"200","id":"K_PERIOD","text":"."},{"width":"200","id":"K_COMMA","text":","},{"layer":"shift","width":"200","id":"K_SLASH","text":"?"},{"layer":"shift","width":"200","id":"K_1","text":"!"},{"width":"200","id":"K_QUOTE","text":"'"},{"width":"150","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"4","key":[{"width":"125","id":"K_LOPT","sp":"1","text":"*Menu*"},{"nextlayer":"default","width":"150","id":"K_LOWER","sp":"1","text":"*ABC*"},{"width":"800","id":"K_SPACE","text":"space"},{"width":"275","id":"K_ENTER","sp":"1","text":"return"}]}]},{"id":"rightalt","row":[{"id":"1","key":[{"width":"125","id":"K_LBRKT","text":"["},{"width":"125","id":"K_RBRKT","text":"]"},{"layer":"default","width":"125","id":"K_Q","text":"q"},{"layer":"default","width":"125","id":"K_V","text":"v"},{"layer":"shift","width":"125","id":"K_3","text":"#"},{"layer":"shift","width":"125","id":"K_5","text":"%"},{"layer":"shift","width":"125","id":"K_6","text":"^"},{"layer":"shift","width":"125","id":"K_8","text":"*"},{"layer":"shift","width":"125","id":"K_EQUAL","text":"+"},{"width":"125","id":"K_EQUAL","text":"="}]},{"id":"2","key":[{"layer":"shift","width":"125","id":"K_HYPHEN","text":"_"},{"width":"125","id":"K_BKSLASH","text":"\\"},{"layer":"default","width":"125","id":"K_L","text":"l"},{"layer":"shift","width":"125","id":"K_COLON","text":"f"},{"layer":"shift","width":"125","id":"K_COMMA","text":"<"},{"layer":"shift","width":"125","id":"K_PERIOD","text":">"},{"layer":"shift","width":"125","id":"K_F","text":"F"},{"layer":"shift","width":"125","id":"K_L","text":"L"},{"layer":"shift","width":"125","id":"K_Q","text":"Q"},{"layer":"shift","width":"125","id":"K_V","text":"V"}]},{"id":"3","key":[{"nextlayer":"numerals","width":"150","id":"K_NUMLOCK","sp":"1","text":"*123*"},{"width":"200","id":"K_PERIOD","text":"."},{"width":"200","id":"K_COMMA","text":","},{"layer":"shift","width":"200","id":"K_SLASH","text":"?"},{"layer":"shift","width":"200","id":"K_1","text":"!"},{"width":"200","id":"K_QUOTE","text":"'"},{"width":"150","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"4","key":[{"width":"125","id":"K_LOPT","sp":"1","text":"*Menu*"},{"nextlayer":"default","width":"150","id":"K_LOWER","sp":"1","text":"*ABC*"},{"width":"800","id":"K_SPACE","text":"space"},{"width":"275","id":"K_ENTER","sp":"1","text":"return"}]}]}]}};this.KVER="15.0.270.0";this.KVS=[];this.gs=function(t,e) {return this.g0(t,e);};this.gs=function(t,e) {return this.g0(t,e);};this.g0=function(t,e) {var k=KeymanWeb,r=0,m=0;if(k.KKM(e,16400,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"!");}}else if(k.KKM(e,16400,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\"");}}else if(k.KKM(e,16400,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"#");}}else if(k.KKM(e,16400,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"$");}}else if(k.KKM(e,16400,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"%");}}else if(k.KKM(e,16400,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"&");}}else if(k.KKM(e,16384,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"'");}}else if(k.KKM(e,16400,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"(");}}else if(k.KKM(e,16400,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,")");}}else if(k.KKM(e,16400,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"*");}}else if(k.KKM(e,16400,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"+");}}else if(k.KKM(e,16384,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,",");}}else if(k.KKM(e,16384,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"-");}}else if(k.KKM(e,16384,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,".");}}else if(k.KKM(e,16384,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"/");}}else if(k.KKM(e,16384,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"0");}}else if(k.KKM(e,16384,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"1");}}else if(k.KKM(e,16384,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"2");}}else if(k.KKM(e,16384,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"3");}}else if(k.KKM(e,16384,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"4");}}else if(k.KKM(e,16384,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"5");}}else if(k.KKM(e,16384,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"6");}}else if(k.KKM(e,16384,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"7");}}else if(k.KKM(e,16384,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"8");}}else if(k.KKM(e,16384,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"9");}}else if(k.KKM(e,16400,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,":");}}else if(k.KKM(e,16384,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,";");}}else if(k.KKM(e,16400,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"<");}}else if(k.KKM(e,16384,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"=");}}else if(k.KKM(e,16400,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,">");}}else if(k.KKM(e,16400,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"?");}}else if(k.KKM(e,16400,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"@");}}else if(k.KKM(e,16400,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"A");}}else if(k.KKM(e,16400,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"B");}}else if(k.KKM(e,16400,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"C");}}else if(k.KKM(e,16400,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"D");}}else if(k.KKM(e,16400,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"E");}}else if(k.KKM(e,16400,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ð");}}else if(k.KKM(e,16400,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"G");}}else if(k.KKM(e,16400,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"H");}}else if(k.KKM(e,16400,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"I");}}else if(k.KKM(e,16400,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"J");}}else if(k.KKM(e,16400,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"K");}}else if(k.KKM(e,16400,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Į");}}else if(k.KKM(e,16400,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"M");}}else if(k.KKM(e,16400,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"N");}}else if(k.KKM(e,16400,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"O");}}else if(k.KKM(e,16400,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"P");}}else if(k.KKM(e,16400,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ą");}}else if(k.KKM(e,16400,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"R");}}else if(k.KKM(e,16400,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"S");}}else if(k.KKM(e,16400,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"T");}}else if(k.KKM(e,16400,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"U");}}else if(k.KKM(e,16400,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ų");}}else if(k.KKM(e,16400,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"W");}}else if(k.KKM(e,16400,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"X");}}else if(k.KKM(e,16400,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Y");}}else if(k.KKM(e,16400,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Z");}}else if(k.KKM(e,16384,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"[");}}else if(k.KKM(e,16384,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\\");}}else if(k.KKM(e,16384,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"]");}}else if(k.KKM(e,16400,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"^");}}else if(k.KKM(e,16400,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"_");}}else if(k.KKM(e,16384,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"́");}}else if(k.KKM(e,16384,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"a");}}else if(k.KKM(e,16384,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"b");}}else if(k.KKM(e,16384,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"c");}}else if(k.KKM(e,16384,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"d");}}else if(k.KKM(e,16384,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"e");}}else if(k.KKM(e,16384,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ð");}}else if(k.KKM(e,16384,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"g");}}else if(k.KKM(e,16384,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"h");}}else if(k.KKM(e,16384,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"i");}}else if(k.KKM(e,16384,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"j");}}else if(k.KKM(e,16384,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"k");}}else if(k.KKM(e,16384,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"į");}}else if(k.KKM(e,16384,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"m");}}else if(k.KKM(e,16384,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"n");}}else if(k.KKM(e,16384,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"o");}}else if(k.KKM(e,16384,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"p");}}else if(k.KKM(e,16384,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ą");}}else if(k.KKM(e,16384,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"r");}}else if(k.KKM(e,16384,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"s");}}else if(k.KKM(e,16384,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"t");}}else if(k.KKM(e,16384,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"u");}}else if(k.KKM(e,16384,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ų");}}else if(k.KKM(e,16384,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"w");}}else if(k.KKM(e,16384,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"x");}}else if(k.KKM(e,16384,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"y");}}else if(k.KKM(e,16384,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"z");}}else if(k.KKM(e,16400,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"{");}}else if(k.KKM(e,16400,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"|");}}else if(k.KKM(e,16400,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"}");}}else if(k.KKM(e,16400,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"́");}}return r;};}