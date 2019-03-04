function tavultesoftBanner(secure, path, banner, tsxa, tsxq)
{
  //banner = gif/728x90_Europe.gif
  
  var linktext;
  var root = secure ? "https://secure.tavultesoft.com/images/banners/" : "http://banners.tavultesoft.com/";

  var link = path;
  if(link.indexOf('?') >= 0) link += '&amp;'; else link += '?';
  link += 'tsxa='+tsxa;
  if(tsxq != '') link += '&amp;tsxq='+tsxq;
  
  if(banner.lastIndexOf('.swf') == banner.length - 4)
  {
    var s = "<a href='"+link+"' "+
      "onclick='javascript:window.top.location.href=\""+link+"\"; return false;'>"+
    
      '<'+'OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '+
      'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" '+
      'WIDTH="728" HEIGHT="90" id="tsAffBanner"><'+'PARAM NAME=movie VALUE="'+root+banner+'"><'+
      'PARAM NAME=quality VALUE=high><'+'PARAM NAME=bgcolor VALUE=#FFFFFF><'+'EMBED '+
      'src="'+root+banner+'" quality=high bgcolor=#FFFFFF WIDTH="728" HEIGHT="90" '+
      'NAME="tsAffBanner" ALIGN="" TYPE="application/x-shockwave-flash" '+
      'PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"><'+'/EMBED><'+'/OBJECT> </a>';
  }
  else
  {
    if(banner.value == '-') linktext='Tavultesoft';
    else linktext = "<img src='"+root+banner+"' border='0' alt='Get Keyman' />";

    var s = "<a href='"+link+"' "+
      "onclick='javascript:window.top.location.href=\""+link+"\"; return false;'><img "+
      "src='"+root+banner+"' border='0' alt='Get Keyman' /></a>";
  }
  //tsxa = affiliate reference
  //tsxq = affiliate custom code
  document.write(s);
}