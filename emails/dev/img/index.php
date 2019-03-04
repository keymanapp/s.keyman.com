<?php /*
  Name:             index
  Copyright:        Copyright (C) 2005 Tavultesoft Pty Ltd.
  Documentation:    
  Description:      
  Create Date:      17 Aug 2007

  Modified Date:    30 Aug 2007
  Authors:          mcdurdin
  Related Files:    
  Dependencies:     

  Bugs:             
  Todo:             
  Notes:            
  History:          17 Aug 2007 - mcdurdin - Initial version
                    30 Aug 2007 - mcdurdin - Fix logging of email open not working
*/
  if(!empty($_SERVER['QUERY_STRING']))
  {
    $DownloadLogContactEmailID = $_SERVER['QUERY_STRING'];
    if(is_numeric($DownloadLogContactEmailID))
    {
      require_once('br/downloadlog.php');
      $DownloadLog = new CRM_DownloadLog();
      $DownloadLog->LogEmailOpened($DownloadLogContactEmailID);
    }
  }
  
  $filename = 'banner.gif';
  
  header('Content-Type: image/gif');
  header('Content-Length: '.filesize($filename));
  readfile($filename, false);
?>
