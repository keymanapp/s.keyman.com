if(typeof keyman === 'undefined') {console.log('Keyboard requires KeymanWeb 10.0 or later');if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");} else {KeymanWeb.KR(new Keyboard_nisenan());}function Keyboard_nisenan(){this._v=(typeof keyman!="undefined"&&typeof keyman.version=="string")?parseInt(keyman.version,10):9;this.KI="Keyboard_nisenan";this.KN="Nisenan";this.KMINVER="10.0";this.KV={F:' 1em "Arial"',K102:0};this.KV.KLS={"default": ["`","1","2","3","4","5","6","7","8","9","0","-","=","","","","q","w","e","r","t","y","u","i","o","p","[","]","\\","","","","a","s","d","f","g","h","j","k","l",";","'","","","","","","\\","z","x","c","v","b","n","m",",",".","/","","","","","",""],"shift": ["~","!","@","#","$","%","^","&","*","(",")","_","+","","","","Q","W","E","R","T","Y","U","I","O","P","{","}","|","","","","A","S","D","F","G","H","J","K","L",":","\"","","","","","","|","Z","X","C","V","B","N","M","<",">","?","","","","","",""],"rightalt": ["aī","a˙ī","","","","","","","","","","̆","́","","","","","","ĕ","","t́","","ŭ","ĭ","ŏ","ṕ","ʉ","ü","˙","","","","","","","","","","","ḱ","","","","","","","","","","","","ć","","","","","","","","","","","","",""],"rightalt-shift": ["AĪ","A˙Ī","","","","","","","","","","","","","","","","","Ĕ","","T́","","Ŭ","Ĭ","Ŏ","Ṕ","Ʉ","Ü","’","","","","","","","","","","","Ḱ","","","","","","","","","","","","Ć","","","","","","","","","","","","",""]};this.KV.BK=(function(x){var e=Array.apply(null,Array(65)).map(String.prototype.valueOf,""),r=[],v,i,m=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];for(i=m.length-1;i>=0;i--)if((v=x[m[i]])||r.length)r=(v?v:e).slice().concat(r);return r})(this.KV.KLS);this.KDU=1;this.KH='';this.KM=0;this.KBVER="1.0";this.KMBM=0x0018;this.KVKD="T_0061_012B T_0061_02D9_012B T_0041_012A T_0041_02D9_012A T_0074_0301 T_0054_0301";this.KVKL={"tablet":{"font":"Tahoma","displayUnderlying":false,"layer":[{"id":"default","row":[{"id":"1","key":[{"id":"U_0115","text":"\u0115"},{"id":"U_012D","text":"\u012D"},{"id":"U_014F","text":"\u014F"},{"id":"U_016D","text":"\u016D"},{"id":"U_0289","text":"\u0289"},{"id":"U_00FC","text":"\u00FC"},{"id":"U_0107","text":"\u0107"},{"id":"U_1E31","text":"\u1E31"},{"id":"U_1E55","text":"\u1E55"},{"id":"T_0074_0301","text":"t\u0301"},{"id":"T_0061_012B","text":"a\u012B"}]},{"id":"2","key":[{"id":"K_Q","text":"q"},{"id":"K_W","text":"w"},{"id":"K_E","text":"e"},{"id":"K_R","text":"r"},{"id":"K_T","text":"t"},{"id":"K_Y","text":"y"},{"id":"K_U","text":"u"},{"id":"K_I","text":"i"},{"id":"K_O","text":"o"},{"id":"K_P","text":"p"},{"id":"T_0061_02D9_012B","text":"a\u02D9\u012B"}]},{"id":"3","key":[{"id":"K_A","text":"a"},{"id":"K_S","text":"s"},{"id":"K_D","text":"d"},{"id":"K_F","text":"f"},{"id":"K_G","text":"g"},{"id":"K_H","text":"h"},{"id":"K_J","text":"j"},{"id":"K_K","text":"k"},{"id":"K_L","text":"l"},{"id":"U_02D9","text":"\u02D9"},{"id":"U_2019","text":"\u2019"}]},{"id":"4","key":[{"nextlayer":"shift","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_Z","text":"z"},{"id":"K_X","text":"x"},{"id":"K_C","text":"c"},{"id":"K_V","text":"v"},{"id":"K_B","text":"b"},{"id":"K_N","text":"n"},{"id":"K_M","text":"m"},{"id":"K_PERIOD","text":".","sk":[{"id":"K_COMMA","text":","},{"layer":"shift","id":"K_1","text":"!"},{"layer":"shift","id":"K_SLASH","text":"?"},{"id":"K_QUOTE","text":"'"},{"layer":"shift","id":"K_QUOTE","text":"\""},{"id":"K_BKSLASH","text":"\\"},{"layer":"shift","id":"K_COLON","text":":"},{"id":"K_COLON","text":";"}]},{"id":"U_0306","text":"\u0306"},{"id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"5","key":[{"nextlayer":"numeric","width":"140","id":"K_NUMLOCK","sp":"1","text":"*123*"},{"width":"120","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"720","id":"K_SPACE"},{"width":"180","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"shift","row":[{"id":"1","key":[{"id":"U_0114","text":"\u0114"},{"id":"U_012C","text":"\u012C"},{"id":"U_014E","text":"\u014E"},{"id":"U_016A","text":"\u016A"},{"id":"U_0244","text":"\u0244"},{"id":"U_00DC","text":"\u00DC"},{"id":"U_0106","text":"\u0106"},{"id":"U_1E30","text":"\u1E30"},{"id":"U_1E54","text":"\u1E54"},{"id":"T_0054_0301","text":"T\u0301"},{"id":"T_0041_012A","text":"A\u012A"}]},{"id":"2","key":[{"id":"K_Q","text":"Q"},{"id":"K_W","text":"W"},{"id":"K_E","text":"E"},{"id":"K_R","text":"R"},{"id":"K_T","text":"T"},{"id":"K_Y","text":"Y"},{"id":"K_U","text":"U"},{"id":"K_I","text":"I"},{"id":"K_O","text":"O"},{"id":"K_P","text":"P"},{"id":"T_0041_02D9_012A","text":"A\u02D9\u012A"}]},{"id":"3","key":[{"id":"K_A","text":"A"},{"id":"K_S","text":"S"},{"id":"K_D","text":"D"},{"id":"K_F","text":"F"},{"id":"K_G","text":"G"},{"id":"K_H","text":"H"},{"id":"K_J","text":"J"},{"id":"K_K","text":"K"},{"id":"K_L","text":"L"},{"id":"U_02D9","text":"\u02D9"},{"id":"U_2019","text":"\u2019"}]},{"id":"4","key":[{"nextlayer":"default","id":"K_SHIFT","sp":"2","text":"*Shift*"},{"id":"K_Z","text":"Z"},{"id":"K_X","text":"X"},{"id":"K_C","text":"C"},{"id":"K_V","text":"V"},{"id":"K_B","text":"B"},{"id":"K_N","text":"N"},{"id":"K_M","text":"M"},{"layer":"default","id":"K_PERIOD","text":".","sk":[{"layer":"default","id":"K_COMMA","text":","},{"layer":"shift","id":"K_1","text":"!"},{"layer":"shift","id":"K_SLASH","text":"?"},{"layer":"default","id":"K_QUOTE","text":"'"},{"layer":"shift","id":"K_QUOTE","text":"\""},{"layer":"default","id":"K_BKSLASH","text":"\\"},{"layer":"shift","id":"K_COLON","text":":"},{"layer":"default","id":"K_COLON","text":";"}]},{"id":"U_0301","text":"\u0301"},{"id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"5","key":[{"nextlayer":"numeric","width":"140","id":"K_NUMLOCK","sp":"1","text":"*123*"},{"width":"120","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"720","id":"K_SPACE"},{"width":"180","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]},{"id":"numeric","row":[{"id":"1","key":[{"id":"K_1","text":"1"},{"id":"K_2","text":"2"},{"id":"K_3","text":"3"},{"id":"K_4","text":"4"},{"id":"K_5","text":"5"},{"id":"K_6","text":"6"},{"id":"K_7","text":"7"},{"id":"K_8","text":"8"},{"id":"K_9","text":"9"},{"id":"K_0","text":"0"}]},{"id":"2","key":[{"layer":"shift","id":"K_4","pad":"70","text":"$"},{"layer":"shift","id":"K_2","text":"@"},{"layer":"shift","id":"K_3","text":"#"},{"layer":"shift","id":"K_5","text":"%"},{"layer":"shift","id":"K_7","text":"&"},{"layer":"shift","id":"K_HYPHEN","text":"_"},{"layer":"default","id":"K_EQUAL","text":"="},{"layer":"shift","id":"K_BKSLASH","text":"|"},{"layer":"default","id":"K_BKSLASH","text":"\\"},{"width":"10","id":"T_new_164","sp":"10"}]},{"id":"3","key":[{"nextlayer":"shift","width":"110","id":"K_SHIFT","sp":"1","text":"*Shift*"},{"id":"K_LBRKT","text":"[","sk":[{"id":"U_00AB","text":"\u00AB"},{"layer":"shift","id":"K_COMMA","text":"<"},{"layer":"shift","id":"K_LBRKT","text":"{"}]},{"layer":"shift","id":"K_9","text":"("},{"layer":"shift","id":"K_0","text":")"},{"id":"K_RBRKT","text":"]","sk":[{"id":"U_00BB","text":"\u00BB"},{"layer":"shift","id":"K_PERIOD","text":">"},{"layer":"shift","id":"K_RBRKT","text":"}"}]},{"layer":"shift","id":"K_EQUAL","text":"+"},{"layer":"default","id":"K_HYPHEN","text":"-"},{"layer":"shift","id":"K_8","text":"*"},{"layer":"default","id":"K_SLASH","text":"\/"},{"width":"90","id":"K_BKSP","sp":"1","text":"*BkSp*"}]},{"id":"4","key":[{"nextlayer":"default","width":"140","id":"K_LOWER","sp":"1","text":"*abc*"},{"width":"120","id":"K_LOPT","sp":"1","text":"*Menu*"},{"width":"630","id":"K_SPACE"},{"width":"140","id":"K_ENTER","sp":"1","text":"*Enter*"}]}]}]}};this.KVER="15.0.265.0";this.KVS=[];this.gs=function(t,e) {return this.g0(t,e);};this.gs=function(t,e) {return this.g0(t,e);};this.g0=function(t,e) {var k=KeymanWeb,r=0,m=0;if(k.KKM(e,16392,189)) {if(k.KFCM(1,t,['e'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ĕ");}else if(k.KFCM(1,t,['i'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ĭ");}else if(k.KFCM(1,t,['o'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ŏ");}else if(k.KFCM(1,t,['u'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ŭ");}else if(k.KFCM(1,t,['E'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ĕ");}else if(k.KFCM(1,t,['I'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ĭ");}else if(k.KFCM(1,t,['O'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ŏ");}else if(k.KFCM(1,t,['U'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ŭ");}else if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"̆");}}else if(k.KKM(e,16392,187)) {if(k.KFCM(1,t,['c'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ć");}else if(k.KFCM(1,t,['k'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ḱ");}else if(k.KFCM(1,t,['p'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"ṕ");}else if(k.KFCM(1,t,['t'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"t́");}else if(k.KFCM(1,t,['C'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ć");}else if(k.KFCM(1,t,['K'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ḱ");}else if(k.KFCM(1,t,['P'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"Ṕ");}else if(k.KFCM(1,t,['T'])){r=m=1;k.KDC(1,t);k.KO(-1,t,"T́");}else if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"́");}}else if(k.KKM(e,16408,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"T́");}}else if(k.KKM(e,16392,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"t́");}}else if(k.KKM(e,16408,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ḱ");}}else if(k.KKM(e,16392,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ḱ");}}else if(k.KKM(e,16408,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ć");}}else if(k.KKM(e,16392,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ć");}}else if(k.KKM(e,16408,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ṕ");}}else if(k.KKM(e,16392,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ṕ");}}else if(k.KKM(e,16392,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"˙");}}else if(k.KKM(e,16408,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"’");}}else if(k.KKM(e,16408,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ü");}}else if(k.KKM(e,16392,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ü");}}else if(k.KKM(e,16408,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ʉ");}}else if(k.KKM(e,16392,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ʉ");}}else if(k.KKM(e,16408,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"AĪ");}}else if(k.KKM(e,16392,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"aī");}}else if(k.KKM(e,16408,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"A˙Ī");}}else if(k.KKM(e,16392,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"a˙ī");}}else if(k.KKM(e,16392,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ŭ");}}else if(k.KKM(e,16408,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ŭ");}}else if(k.KKM(e,16392,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ĭ");}}else if(k.KKM(e,16408,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ĭ");}}else if(k.KKM(e,16392,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ŏ");}}else if(k.KKM(e,16408,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ŏ");}}else if(k.KKM(e,16392,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ĕ");}}else if(k.KKM(e,16408,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ĕ");}}else if(k.KKM(e,16384,256)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"aī");}}else if(k.KKM(e,16384,257)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"a˙ī");}}else if(k.KKM(e,16400,258)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"AĪ");}}else if(k.KKM(e,16400,259)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"A˙Ī");}}else if(k.KKM(e,16384,260)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"t́");}}else if(k.KKM(e,16400,261)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"T́");}}return r;};}