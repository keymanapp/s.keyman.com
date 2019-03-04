/**
  @preserve (C) 2012 Tavultesoft Pty Ltd
  
  Adds functions to treat supplementary plane characters in the same 
  way as basic multilingual plane characters in JavaScript.
  
  Version 0.1
  
  License
  
  The contents of this file are subject to the Mozilla Public License
  Version 1.1 (the "License"); you may not use this file except in
  compliance with the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/

  Software distributed under the License is distributed on an "AS IS"
  basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
  License for the specific language governing rights and limitations
  under the License.

  The Original Code is (C) 2012 Tavultesoft Pty Ltd.

  The Initial Developer of the Original Code is Tavultesoft.
*/

/**
 * Constructs a string from one or more Unicode character codepoint values 
 * passed as integer parameters.
 * 
 * @param  {number} cp0,...   1 or more Unicode codepoints, e.g. 0x0065, 0x10000
 * @return {string|null}      The new String object.
 */
String.kmwFromCharCode = function(cp0) {
  var chars = [], i;
  for (i = 0; i < arguments.length; i++) {
    var c = Number(arguments[i]);
    if (!isFinite(c) || c < 0 || c > 0x10FFFF || Math.floor(c) !== c) {
      throw new RangeError("Invalid code point " + c);
	  }
    if (c < 0x10000) {
      chars.push(c);
    } else {
      c -= 0x10000;
      chars.push((c >> 10) + 0xD800);
      chars.push((c % 0x400) + 0xDC00);
    }
  }
  return String.fromCharCode.apply(undefined, chars);
}

/**
 * Returns a number indicating the Unicode value of the character at the given 
 * code point index, with support for supplementary plane characters.
 * 
 * @param  {number}  codePointIndex  The code point index into the string (not 
                                     the code unit index) to return
 * @return {number}                  The Unicode character value
 */
String.prototype.kmwCharCodeAt = function(codePointIndex) {
  var str = String(this);
  var codeUnitIndex = 0;
  
  if (codePointIndex < 0 || codePointIndex  >= str.length) {
    return NaN;
  }

  for(var i = 0; i < codePointIndex; i++) {
    codeUnitIndex = str.kmwNextChar(codeUnitIndex);
    if(codeUnitIndex === null) return NaN;
  }
  
  var first = str.charCodeAt(codeUnitIndex);
  if (first >= 0xD800 && first <= 0xDBFF && str.length > codeUnitIndex + 1) {
    var second = str.charCodeAt(codeUnitIndex + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      return ((first - 0xD800) << 10) + (second - 0xDC00) + 0x10000;
    }
  }
  return first;  
}

/**
 * Returns the code point index within the calling String object of the first occurrence
 * of the specified value, or -1 if not found.
 * 
 * @param  {string}  searchValue    The value to search for
 * @param  {number}  fromIndex      Optional code point index to start searching from
 * @return {number}                 The code point index of the specified search value
 */
String.prototype.kmwIndexOf = function(searchValue, fromIndex) {
  var str = String(this);
  var codeUnitIndex = str.indexOf(searchValue, fromIndex);
  
  if(codeUnitIndex < 0) {
    return codeUnitIndex;
  }
  
  var codePointIndex = 0;
  for(var i = 0; i !== null && i < codeUnitIndex; i = str.kmwNextChar(i)) codePointIndex++;
  return codePointIndex;
}

/**
 * Returns the code point index within the calling String object of the last occurrence 
 * of the specified value, or -1 if not found.
 * 
 * @param  {string}  searchValue    The value to search for
 * @param  {number}  fromIndex      Optional code point index to start searching from
 * @return {number}                 The code point index of the specified search value
 */
String.prototype.kmwLastIndexOf = function(searchValue, fromIndex)
{
  var str = String(this);
  var codeUnitIndex = str.lastIndexOf(searchValue, fromIndex);
  
  if(codeUnitIndex < 0) {
    return codeUnitIndex;
  }
  
  var codePointIndex = 0;
  for(var i = 0; i !== null && i < codeUnitIndex; i = str.kmwNextChar(i)) codePointIndex++;
  return codePointIndex;
}

/**
 * Returns the length of the string in code points, as opposed to code units.
 * 
 * @return {number}                 The length of the string in code points
 */
String.prototype.kmwLength = function() {
  var str = String(this);
  
  if(str.length == 0) return 0;
  
  for(var i = 0, codeUnitIndex = 0; codeUnitIndex !== null; i++) 
    codeUnitIndex = str.kmwNextChar(codeUnitIndex);
  return i;
}

/**
 * Extracts a section of a string and returns a new string.
 * 
 * @param  {number}  beginSlice    The start code point index in the string to 
 *                                 extract from
 * @param  {number}  endSlice      Optional end code point index in the string
 *                                 to extract to
 * @return {string}                The substring as selected by beginSlice and
 *                                 endSlice
 */
String.prototype.kmwSlice = function(beginSlice, endSlice) {
  var str = String(this);
  var beginSliceCodeUnit = str.kmwCodePointToCodeUnit(beginSlice);
  var endSliceCodeUnit = str.kmwCodePointToCodeUnit(endSlice);
  if(beginSliceCodeUnit === null || endSliceCodeUnit === null) 
    return '';
  else
    return str.slice(beginSliceCodeUnit, endSliceCodeUnit);
}

/**
 * Returns the characters in a string beginning at the specified location through
 * the specified number of characters.
 * 
 * @param  {number}  start         The start code point index in the string to 
 *                                 extract from
 * @param  {number}  length        Optional length to extract
 * @return {string}                The substring as selected by start and length
 */
String.prototype.kmwSubstr = function(start, length)
{
  var str = String(this);
  if(start < 0) 
  {
    start = str.kmwLength() + start;
  }
	if(start < 0) start = 0;
  var startCodeUnit = str.kmwCodePointToCodeUnit(start);
  var endCodeUnit = startCodeUnit;
  
  if(startCodeUnit === null) return '';
  
  if(arguments.length < 2) {
    endCodeUnit = str.length;
  } else {
    for(var i = 0; i < length; i++) endCodeUnit = str.kmwNextChar(endCodeUnit);
  }
  if(endCodeUnit === null)
    return str.substring(startCodeUnit);
  else
    return str.substring(startCodeUnit, endCodeUnit);
}

/**
 * Returns the characters in a string between two indexes into the string.
 * 
 * @param  {number}  indexA        The start code point index in the string to 
 *                                 extract from
 * @param  {number}  indexB        The end code point index in the string to 
 *                                 extract to
 * @return {string}                The substring as selected by indexA and indexB
 */
String.prototype.kmwSubstring = function(indexA, indexB)
{
  var str = String(this),indexACodeUnit,indexBCodeUnit;
  
  if(typeof(indexB) == 'undefined') 
  {
    indexACodeUnit = str.kmwCodePointToCodeUnit(indexA);
    indexBCodeUnit =  str.length;    
  } 
  else
  {
    if(indexA > indexB) { var c = indexA; indexA = indexB; indexB = c; }
  
    indexACodeUnit = str.kmwCodePointToCodeUnit(indexA);
    indexBCodeUnit = str.kmwCodePointToCodeUnit(indexB);
  }
  if(isNaN(indexACodeUnit) || indexACodeUnit === null) indexACodeUnit = 0;
  if(isNaN(indexBCodeUnit) || indexBCodeUnit === null) indexBCodeUnit = str.length;

  return str.substring(indexACodeUnit, indexBCodeUnit);
}

/*
  Helper functions
*/

/**
 * Returns the code unit index for the next code point in the string, accounting for
 * supplementary pairs 
 *
 * @param  {number|null}  codeUnitIndex  The code unit position to increment
 * @return {number|null}                 The index of the next code point in the string,
 *                                       in code units
 */
String.prototype.kmwNextChar = function(codeUnitIndex) {
  var str = String(this);

  if(codeUnitIndex === null || codeUnitIndex < 0 || codeUnitIndex >= str.length - 1) {
    return null;
  }
  
  var first = str.charCodeAt(codeUnitIndex);
  if (first >= 0xD800 && first <= 0xDBFF && str.length > codeUnitIndex + 1) {
    var second = str.charCodeAt(codeUnitIndex + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      if(codeUnitIndex == str.length - 2) {
        return null;
      }
      return codeUnitIndex + 2;
    }
  }
  return codeUnitIndex + 1;
}

/**
 * Returns the code unit index for the previous code point in the string, accounting
 * for supplementary pairs 
 *
 * @param  {number|null}  codeUnitIndex  The code unit position to decrement
 * @return {number|null}                 The index of the previous code point in the
 *                                       string, in code units
*/
String.prototype.kmwPrevChar = function(codeUnitIndex) {
  var str = String(this);

  if(codeUnitIndex == null || codeUnitIndex <= 0 || codeUnitIndex > str.length) {
    return null;
  }
  
  var second = str.charCodeAt(codeUnitIndex - 1);
  if (second >= 0xDC00 && second <= 0xDFFF && codeUnitIndex > 1) {
    var first = str.charCodeAt(codeUnitIndex - 2);
    if(first >= 0xD800 && first <= 0xDBFF) {
      return codeUnitIndex - 2;
    }
  }
  return codeUnitIndex - 1;
}

/**
 * Returns the corresponding code unit index to the code point index passed
 *
 * @param  {number|null} codePointIndex  A code point index in the string
 * @return {number|null}                 The corresponding code unit index
 */
String.prototype.kmwCodePointToCodeUnit = function(codePointIndex) {
  
  if(codePointIndex === null) return null;
  
  var str = String(this);
  var codeUnitIndex = 0;
  
  if(codePointIndex < 0) {
    codeUnitIndex = str.length;
    for(var i = 0; i > codePointIndex; i--) 
      codeUnitIndex = str.kmwPrevChar(codeUnitIndex);	
    return codeUnitIndex;
  }
  
  if(codePointIndex == str.kmwLength()) return str.length;
  
  for(var i = 0; i < codePointIndex; i++)
    codeUnitIndex = str.kmwNextChar(codeUnitIndex);
  return codeUnitIndex;
}

/**
 * Returns the corresponding code point index to the code unit index passed
 *
 * @param  {number|null}  codeUnitIndex  A code unit index in the string
 * @return {number|null}                 The corresponding code point index
 */
String.prototype.kmwCodeUnitToCodePoint = function(codeUnitIndex) {
  var str = String(this);
  
  if(codeUnitIndex === null)
    return null;
  else if(codeUnitIndex == 0)
    return 0;
  else if(codeUnitIndex < 0)     
    return str.substr(codeUnitIndex).kmwLength();
  else
    return str.substr(0,codeUnitIndex).kmwLength();
}

/**
 * Returns the character at a the code point index passed
 *
 * @param  {number}  codePointIndex  A code point index in the string
 * @return {string}                  The corresponding character
 */
String.prototype.kmwCharAt = function(codePointIndex) {
  var str = String(this);
  
  if(codePointIndex >= 0) return str.kmwSubstr(codePointIndex,1); else return '';
}

/**
 * String prototype library extensions for basic plane characters, 
 * to simplify enabling or disabling supplementary plane functionality (I3319)
 */
 
/**
 * Returns the code unit index for the next code point in the string
 *
 * @param  {number}  codeUnitIndex    A code point index in the string
 * @return {number}                   The corresponding character
 */ 
String.prototype.kmwBMPNextChar = function(codeUnitIndex)
{
  var str = String(this);
  if(codeUnitIndex < 0 || codeUnitIndex >= str.length - 1) {
    return undefined;
  }
  return codeUnitIndex + 1;
}  

/**
 * Returns the code unit index for the previous code point in the string
 *
 * @param  {number}  codeUnitIndex    A code unit index in the string
 * @return {number}                   The corresponding character
 */ 
String.prototype.kmwBMPPrevChar = function(codeUnitIndex)
{
  var str = String(this);

  if(codeUnitIndex <= 0 || codeUnitIndex > str.length) {
    return undefined;
  }
  return codeUnitIndex - 1;
}  

/**
 * Returns the code unit index for a code point index
 *
 * @param  {number}  codePointIndex   A code point index in the string
 * @return {number}                   The corresponding character
 */ 
String.prototype.kmwBMPCodePointToCodeUnit = function(codePointIndex)
{
  return codePointIndex;
}

/**
 * Returns the code point index for a code unit index
 *
 * @param  {number}  codeUnitIndex    A code point index in the string
 * @return {number}                   The corresponding character
 */ 
String.prototype.kmwBMPCodeUnitToCodePoint = function(codeUnitIndex)
{
  return codeUnitIndex;
}

/**
 * Returns the length of a BMP string
 *
 * @return {number}                   The length in code points
 */ 
String.prototype.kmwBMPLength = function()
{
  var str = String(this);
  return str.length;
}


/**
 * Returns a substring 
 *
 * @param  {number}  n
 * @param  {number}  ln
 * @return {string}                   
 */ 
String.prototype.kmwBMPSubstr = function(n,ln)
{
  var str=String(this);
  if(n > -1) 
    return str.substr(n,ln);
  else
    return str.substr(str.length+n,-n);  
}

/**
 * Enable or disable supplementary plane string handling
 *
 * @param  {boolean}  bEnable
 */ 
String.kmwEnableSupplementaryPlane = function(bEnable)
{
  var p=String.prototype;
  String._kmwFromCharCode = bEnable ? String.kmwFromCharCode : String.fromCharCode;
  p._kmwCharAt = bEnable ? p.kmwCharAt : p.charAt;
  p._kmwCharCodeAt = bEnable ? p.kmwCharCodeAt : p.charCodeAt;
  p._kmwIndexOf = bEnable ? p.kmwIndexOf :p.indexOf;
  p._kmwLastIndexOf = bEnable ? p.kmwLastIndexOf : p.lastIndexOf ;
  p._kmwSlice = bEnable ? p.kmwSlice : p.slice;
  p._kmwSubstring = bEnable ? p.kmwSubstring : p.substring;
  p._kmwSubstr = bEnable ? p.kmwSubstr : p.kmwBMPSubstr;
  p._kmwLength = bEnable ? p.kmwLength : p.kmwBMPLength;
  p._kmwNextChar = bEnable ? p.kmwNextChar : p.kmwBMPNextChar;
  p._kmwPrevChar = bEnable ? p.kmwPrevChar : p.kmwBMPPrevChar;
  p._kmwCodePointToCodeUnit = bEnable ? p.kmwCodePointToCodeUnit : p.kmwBMPCodePointToCodeUnit;
  p._kmwCodeUnitToCodePoint = bEnable ? p.kmwCodeUnitToCodePoint : p.kmwBMPCodeUnitToCodePoint;
}

/**
 * @preserve KeymanWeb 2.0 Copyright 2010 Tavultesoft Pty Ltd
 */
 
/**  
 * Base code: Declare tavultesoft, major component namespaces and instances, utility functions 
 */  

/** @define {number} */
var __BUILD__ = 300;

(function() 
{
  // Define exposed base object
  var tavultesoft = window['tavultesoft'] = {}; 

  var keymanweb = tavultesoft['keymanweb'] = {
    _TitleElement: null,      // I1972 - KeymanWeb Titlebar should not be a link
    _Enabled: 1,              // Is KeymanWeb running?
    _IE: 0,                   // browser version identification
    legacy: 0,               // set true for IE 3,4,5 (I2186 - multiple IE tweaks needed)
    _IsActivatingKeymanWebUI: 0,    // ActivatingKeymanWebUI - is the KeymanWeb DIV in process of being clicked on?
    _JustActivatedKeymanWebUI: 0,   // JustActivatedKeymanWebUI - focussing back to control after KeymanWeb UI interaction  
    _IgnoreNextSelChange: 0,  // when a visual keyboard key is mouse-down, ignore the next sel change because this stuffs up our history  
    _Selection: null,
    _SelectionControl: null,
    _KeyboardStubs: [],       // KeyboardStubs - array of available keyboards
    dfltStub: null,           // First keyboard stub loaded - default for touch-screen devices, ignored on desktops
    _Keyboards: [],           // Keyboards - array of loaded keyboards
    _ActiveKeyboard: null,    // ActiveKeyboard - points to active keyboard in Keyboards array
    _ActiveStub: null,        // ActiveStub - points to active stub in KeyboardStubs  
    _LoadingInternalName: null,
    _AnyIndices: [],          // AnyIndex - array of any/index match indices
    _DeadKeys: [],            // DeadKeys - array of matched deadkeys
    _EventHandlers: [],       // For IE's broken event model, to kill memory leaks  	
    _ActiveControl: null,     // Currently active control in _Controls array
    _Controls: [],            // Array of controls with specific states: .Control, .Enabled, .DefaultInternalName  
    _AttachedElements: [],    // I1596 - attach to controls dynamically
    _ActiveElement: null,     // Currently active (focused) element  I3363 (Build 301)
    _LastActiveElement: null, // LastElem - Last active element
    _DfltStyle: '',           // Default styles
    _MasterDocument: null,    // Document with controller (to allow iframes to distinguish local/master control)
    _HotKeys: [],             // Array of document-level hotkey objects
    focusTimer: null,         // Timer to manage loss of focus to unmapped input
    focusing: false,          // Flag to manage movement of focus
    resizing: false,          // Flag to control resize events when resetting viewport parameters
    sortedInputs: [],         // List of all INPUT and TEXTAREA elements ordered top to bottom, left to right
    inputList: [],            // List of simulated input divisions for touch-devices   I3363 (Build 301)
    deferredKRS: [],          // Array of pending keyboard stubs, to be installed at end of initialization
    deferredKR: [],           // Array of pending keyboards, to be installed at end of initialization
    loadTimer:null,           // Keyboard loading timer, to manage load failure
    waiting:null,             // Element displayed during keyboard load time
    baseFont: 'sans-serif',   // Default font for mapped input elements
    appliedFont: '',          // Chain of fonts to be applied to mapped input elements
    embeddedFonts: []         // Array of currently embedded fonts   
  };

  keymanweb['initialized'] = 0;
  keymanweb['build'] = __BUILD__;
  keymanweb['version'] = '2.0';
  keymanweb['helpURL'] = 'http://keyman.com/web/';  //TODO: correct this is necessary, or delete if not required

  // Expose (old) KeymanWeb object for use by compiled keyboards (replaces legacy object in earlier versions)
  window['KeymanWeb'] = keymanweb;

  // Define public OSK, user interface and utility function objects 
  var util = keymanweb['util'] = {};
  var osk = keymanweb['osk'] = {ready:false};
  var ui = keymanweb['ui'] = {};

  // Define private options object
  keymanweb.options = {};
  
  // Generalized component event registration
  util.events = [];  
  util.currentEvents = [];

/*  

 osk.positionChanged = function(newPosition)
  {
    return util.callEvent('osk.positionChanged', newPosition);
  }
  
  osk['setPosition'] = function(newPosition)
  {
    divOsk.left = newPosition.left;
    ...
    osk.positionChanged({left: divOsk.left, top: divOsk.top, ...});
  }
  
  ui.oskPositionChanged = function(newPosition)
  {
    // do something with the osk
  }
  
  ui.init = function()
  {
    osk.addEventListener('positionChanged', ui.oskPositionChanged);
  }
  

*/

  /**
   * Function    addEventListener
   * Scope       Private
   * @param      {string}     event     name of event prefixed by module, e.g. osk.touchmove
   * @param      {function(Object)}   func      event handler
   * @return     {boolean}         
   * Description Add (or replace) an event listener for this component 
   */    
  util.addEventListener = function(event, func)
  {
    util.removeEventListener(event, func);
    util.events[event].push(func);
    return true;
  }    
  
  /**
   * Function    removeEventListener
   * Scope       Private
   * @param      {string}     event     name of event prefixed by module, e.g. osk.touchmove
   * @param      {function(Object)}   func      event handler
   * @return     {boolean}         
   * Description Remove the specified function from the listeners for this event 
   */    
  util.removeEventListener = function(event, func)
  {
    if(typeof util.events[event] == 'undefined') util.events[event] = [];
    for(var i=0; i<util.events[event].length; i++)
    {
      if(util.events[event][i] == func)
      { 
        util.events[event].splice(i, 1);
        return true;
      }
    }
    return false;
  }
  
  /**
   * Function    callEvent
   * Scope       Private
   * @param      {string}     event     name of event prefixed by module, e.g. osk.touchmove
   * @param      {Array}      params    parameter array for function
   * @return     {boolean}         
   * Description Invoke an event using any function with up to four arguments 
   */    
  util.callEvent = function(event,params)
  {
    if(typeof util.events[event] == 'undefined') return true;
    if(typeof util.currentEvents[event] != 'undefined') return false;
    util.currentEvents.push(event);    
    for(var i=0; i<util.events[event].length; i++)
    {
      var func=util.events[event][i],result=false;
      try { result=func(params); }
      catch(strExcept) { result=false; }//don't know whether to use true or false here      
      if(!result) { util.currentEvents.pop(); return false; }
    }    
    util.currentEvents.pop();
    return true;
  }
  
  /**
   * Function     attachDOMEvent: Note for most browsers, adds an event to a chain, doesn't stop existing events  
   * Scope        Public
   * @param       {Object}    Pelem       Element to which event is being attached
   * @param       {string}    Peventname  Name of event without 'on' prefix
   * @param       {function(Object)}  Phandler    Event handler for event
   * @param       {boolean=}  PuseCapture True only if event to be handled on way to target element      
   * Description  Attaches event handler to element DOM event
   */  
  util['attachDOMEvent'] = util.attachDOMEvent = function(Pelem, Peventname, Phandler, PuseCapture)
  {
    util.detachDOMEvent(Pelem, Peventname, Phandler, PuseCapture);
    if(Pelem.attachEvent)
      // IE
      Pelem.attachEvent('on'+Peventname, Phandler);
    else if(Pelem.addEventListener)
      // Firefox
      Pelem.addEventListener(Peventname, Phandler, PuseCapture?true:false);
    var Levent = {Lelem:Pelem, Lname:Peventname, Lhandler:Phandler, LuseCapture:PuseCapture?true:false};
    keymanweb._EventHandlers=keymanweb._push(keymanweb._EventHandlers,Levent);
  }    
 
  /**
   * Function     detachDOMEvent
   * Scope        Public
   * @param       {Object}    Pelem       Element from which event is being detached
   * @param       {string}    Peventname  Name of event without 'on' prefix
   * @param       {function(Object)}  Phandler    Event handler for event
   * @param       {boolean=}  PuseCapture True if event was being handled on way to target element      
   * Description Detaches event handler from element to prevent memory leaks 
   */  
  util['detachDOMEvent'] = util.detachDOMEvent = function(Pelem, Peventname, Phandler, PuseCapture)
  {
    var Ln, Leh;
    for(Ln=0; Ln <keymanweb._EventHandlers.length; Ln++) // I1511 - array prototype extended
    {
      Leh=keymanweb._EventHandlers[Ln];
      if(Leh.Lname==Peventname  &&  Leh.Lelem==Pelem  &&  Leh.Lhandler==Phandler)
      {
        if(Leh.Lelem.detachEvent)
          Leh.Lelem.detachEvent('on'+Leh.Lname, Leh.Lhandler);
        else if(Leh.Lelem.removeEventListener)
          Leh.Lelem.removeEventListener(Leh.Lname, Leh.Lhandler, Leh.LuseCapture);      
          
        keymanweb._EventHandlers = 
          keymanweb._EventHandlers.slice(0,Ln).
            concat(keymanweb._EventHandlers.slice(Ln+1)); //in both lines, changed parseInt(Ln) to Ln - probably old code JMD 27/8
        break;
      }
    }
  }    
 
  /**
   * Function     getOption
   * Scope        Public
   * @param       {string}    option      Name of option
   * @param       {*=}        dflt        Default value of option
   * @return      {*}               
   * Description  Returns value of named option
   */  
  util['getOption'] = util.getOption = function(optionName,dflt)
  {
    if(optionName in keymanweb.options) return keymanweb.options[optionName]; 
    else if(arguments.length > 1) return dflt;
    else return '';
  }

  /**
   * Function     setOption
   * Scope        Public
   * @param       {string}    option      Name of option
   * @param       {*=}        value       Value of option
   * Description  Sets value of named option
   */  
  util['setOption'] = util.setOption = function(optionName,value)
  {
    keymanweb.options[optionName] = value;
  }
  
  /**
   * Return a path that has is always terminated by a slash
   *    
   * @param   {string}  p folder path   
   * @return  {string}   
  **/      
  util.fixPath = function(p)
  {
    if(p.length == 0) return p;
    var q=p.substr(p.length-1,1);
    if(q == '/' || q == '\\') return p;
    return p+'/'; 
  }          
  
  /**
   * Function     getAbsoluteX
   * Scope        Public
   * @param       {Object}    Pobj        HTML element
   * @return      {number}               
   * Description  Returns x-coordinate of Pobj element absolute position with respect to page
   */  
  util['getAbsoluteX'] = util._GetAbsoluteX = function(Pobj)  // I1476 - Handle SELECT overlapping END

  {
    if(!Pobj) return 0;
    
    var Lcurleft = Pobj.offsetLeft ? Pobj.offsetLeft : 0, Lobj = Pobj;   	// I2404 - Support for IFRAMEs
    if (Lobj.offsetParent)
    {
      while (Lobj.offsetParent)
      {
        Lobj = Lobj.offsetParent;
        Lcurleft += Lobj.offsetLeft;
      }
    }
    // Correct position if element is within a frame (but not if the controller is in document within that frame)
    if(Lobj && Lobj.ownerDocument && (Pobj.ownerDocument != keymanweb._MasterDocument)) Lobj=Lobj.ownerDocument;   // I2404 - Support for IFRAMEs    
    
    // The following two lines are old code and may or may not still be needed - possibly should be conditioned similalry to above    
    if(Lobj && Lobj.parentWindow && Lobj.parentWindow.frameElement) return Lcurleft + util._GetAbsoluteX(Lobj.parentWindow.frameElement) - Lobj.documentElement.scrollLeft;
    if(Lobj && Lobj.defaultView && Lobj.defaultView.frameElement) return Lcurleft + util._GetAbsoluteX(Lobj.defaultView.frameElement) - Lobj.documentElement.scrollLeft;
    return Lcurleft;
  }

  /**
   * Function     getAbsoluteY
   * Scope        Public
   * @param       {Object}    Pobj        HTML element
   * @return      {number}               
   * Description  Returns y-coordinate of Pobj element absolute position with respect to page
   */  
  util['getAbsoluteY'] = util._GetAbsoluteY = function(Pobj)
  {
    if(!Pobj) return 0;
    var Lcurtop = Pobj.offsetTop ? Pobj.offsetTop : 0, Lobj = Pobj;  // I2404 - Support for IFRAMEs
    if (Lobj.offsetParent)
    {
      while (Lobj.offsetParent)
      {
        Lobj = Lobj.offsetParent;
        Lcurtop += Lobj.offsetTop;
      }
    }
    // Correct position if element is within a frame (but not if the controller is in document within that frame)
    if(Lobj && Lobj.ownerDocument && (Pobj.ownerDocument != keymanweb._MasterDocument)) Lobj=Lobj.ownerDocument;   // I2404 - Support for IFRAMEs    
    
    // The following two lines are old code and may or may not still be needed - possibly should be conditioned similalry to above    
    if(Lobj && Lobj.parentWindow && Lobj.parentWindow.frameElement) return Lcurtop + util._GetAbsoluteY(Lobj.parentWindow.frameElement) - Lobj.documentElement.scrollTop;
    if(Lobj && Lobj.defaultView && Lobj.defaultView.frameElement) return Lcurtop + util._GetAbsoluteY(Lobj.defaultView.frameElement) - Lobj.documentElement.scrollTop;
    return Lcurtop;
  }

  /**
   * Function     getAbsolute
   * Scope        Public
   * @param       {Object}    Pobj        HTML element
   * @return      {Object.<string,number>}               
   * Description  Returns absolute position of Pobj element with respect to page
   */  
  util['getAbsolute'] = util._GetAbsolute = function(Pobj)
  {
    var p={};
    p['x'] = util._GetAbsoluteX(Pobj);
    p['y'] = util._GetAbsoluteY(Pobj);
    return p;
  }
  
  /**
   * Creates and returns an unselectable HTML element for OnScreen Keyboard and User Interface
   * The purpose is to permit interaction with UI elements without moving the focus from the 
   * current input element
   *          
   * @param       {string}      nodeName         Type of HTML element to create
   * @return      {Object}               
   */  
  util['createElement'] =  util._CreateElement = function(nodeName) 
  { 
    var e = document.createElement(nodeName);
    // Make element unselectable (Internet Explorer)
    if (typeof e.onselectstart != 'undefined') //IE route
	  {
      e.unSelectable='on'; e.onselectstart=function(){return false;};
    }
    // And for well-behaved browsers (may also work for IE9+, but not necessary)
    else  
    {
      e.style.MozUserSelect="none"; e.style.KhtmlUserSelect="none";  
      e.style.UserSelect="none"; e.style.WebkitUserSelect="none";
    }    
    return e;
  }
              
  /**
   * Function     getIEVersion
   * Scope        Public
   * @return      {number}               
   * Description  Return IE version number (or 999 if browser not IE)
   */       
  util['getIEVersion'] = util._GetIEVersion = function()
  {                                  
    var n,agent='';
    
    if('userAgent' in navigator) agent=navigator.userAgent;
    
    // Test first for old versions
    if('selection' in document)          // only defined for IE and not for IE 11!!!
    {                         
      var appVer=navigator.appVersion;        
      n=appVer.indexOf('MSIE ');
      if(n >= 0) 
      {
        // Check for quirks mode page, always return 6 if so
        if(document.compatMode == 'BackCompat') return 6;
        
        appVer=appVer.substr(n+5);
        n=appVer.indexOf('.');
        if(n > 0) return parseInt(appVer.substr(0,n),10);
      }              
    }
       
    // Finally test for IE 11 (and later?)
    n=agent.indexOf('Trident/');
    if(n < 0) return 999;  
    
    agent=agent.substr(n+8);
    n=agent.indexOf('.');
    if(n > 0) return parseInt(agent.substr(0,n),10)+4;
  
    return 999;
  }

  /**
   * Get device horizontal DPI for touch devices, to set actual size of active regions
   * Note that the actual physical DPI may be somewhat different.
   * 
   * @return      {number}               
   */       
  util.getDPI = function()
  {
    var t=document.createElement('DIV'),s=t.style,dpi=96;
    if(document.readyState !== 'complete') return dpi;
    
    t.id='calculateDPI';
    s.position='absolute'; s.display='block';s.visibility='hidden';
    s.left='10px'; s.top='10px'; s.width='1in'; s.height='10px';
    document.body.appendChild(t);
    dpi=(typeof window.devicePixelRatio == 'undefined') ? t.offsetWidth : t.offsetWidth * window.devicePixelRatio;
    document.body.removeChild(t);
    return dpi;    
  }

  /**
   * Get browser-independent computed style value for element
   * 
   * @param       {Element}     e             HTML element
   * @param       {string}      s             CSS style name 
   * @return      {*}               
   */       
  util.getStyleValue = function(e,s)
  { 
    // Build 349: error trap added, since on iOS, getPropertyValue may fail 
    // and crash in some cases, possibly if passed a text node 
    try  
    {
      if(e && (typeof(window.getComputedStyle) != 'undefined'))
          return window.getComputedStyle(e,'').getPropertyValue(s);
      else if(e && (typeof(e.currentStyle) != 'undefined'))    //IE 8 and earlier
        return e.currentStyle[s];
  }    
    catch(ex){}
    
    // Return empty string if unable to get style value
    return '';
  }    

  /**
   * Get browser-independent computed style integer value for element  (Build 349)
   * 
   * @param       {Element}     e             HTML element
   * @param       {string}      s             CSS style name 
   * @param       {number=}     d             default value if NaN   
   * @return      {number}                    integer value of style
   */       
  util.getStyleInt = function(e,s,d)
  {
    var x=parseInt(util.getStyleValue(e,s),10);
    if(!isNaN(x)) return x;
    
    // Return the default value if numeric, else 0 
    if(typeof(d) == 'number') return d; else return 0;
  }
    
  /**
   * Set device parameters according to platform 
   *    TODO: put into separate function (?) 
   */
  var device=util.device={
    touchable:!!('ontouchstart' in window),OS:'',
    formFactor:'desktop',
    dyPortrait:0,
    dyLandscape:0,
    app:'',
    version:'0',
    orientation:window.orientation
  };
  
  if(navigator && navigator.userAgent)
  {
    var agent=navigator.userAgent;
    if(agent.indexOf('iPad') >= 0) 
    {
      device.OS='iOS';device.formFactor='tablet';
      device.dyPortrait=device.dyLandscape=0;
    }
    if(agent.indexOf('iPhone') >= 0)
    { 
      device.OS='iOS';device.formFactor='phone';
      device.dyPortrait=device.dyLandscape=25;
    }
    if(agent.indexOf('Android') >= 0) 
    {
      device.OS='Android';device.formFactor='phone';    // form factor may be redefined on initialization
      device.dyPortrait=75; device.dyLandscape=25;
      try
      {
        var rx=new RegExp("(?:Android\\s+)(\\d+\\.\\d+\\.\\d+)");
        device.version=agent.match(rx)[1];
      } catch(ex){}
      
    }  
    if(agent.indexOf('Windows NT') >= 0)
    {
      device.OS='Windows';
      if(agent.indexOf('Touch') >= 0) device.formFactor='phone';   // will be redefined as tablet if resolution high enough
      
      // Windows Phone and Tablet PC
      if(typeof navigator.msMaxTouchPoints == 'number' && navigator.msMaxTouchPoints > 0) device.touchable=true; 
    } 
  }  
  // var sxx=device.formFactor;
  // Check and possibly revise form factor according to actual screen size (adjusted for Galaxy S, maybe OK generally?)
  if(device.formFactor == 'tablet' && Math.min(screen.width,screen.height) < 400) device.formFactor='phone';
  if(device.formFactor == 'phone'  && Math.max(screen.width,screen.height) > 720) device.formFactor='tablet';
  //                           alert(sxx+'->'+device.formFactor);
  // Check for phony iOS devices!
  if(device.OS == 'iOS' && !('ongesturestart' in window)) device.OS='Android';
 
  // Determine application or browser
  device.browser='web';
  if(util._GetIEVersion() < 999) device.browser='ie';
  else
  {
    if(device.OS == 'iOS' || device.OS.toLowerCase() == 'macosx') device.browser='safari';    
    var bMatch=/Firefox|Chrome|OPR/;
    if(bMatch.test(navigator.userAgent))
    {
      if((navigator.userAgent.indexOf('Firefox') >= 0) && ('onmozorientationchange' in screen)) 
        device.browser='firefox';
      else if(navigator.userAgent.indexOf('OPR') >= 0) 
        device.browser='opera';
      else if(navigator.userAgent.indexOf('Chrome') >= 0) 
        device.browser='chrome';
    } 
  }
                       
  /**
   * Expose the touchable state for UIs - will disable external UIs entirely
   **/      
  util['isTouchDevice'] = function()
  {
    return device.touchable;
  }
  
  /**
   * Get orientation of tablet or phone  display
   *    
   * @return      {boolean}               
   */       
  util.portraitView = function()	// new for I3363 (Build 301)
  {
    return !util.landscapeView();
  }
  
  /**
   * Get orientation of tablet or phone  display
   *    
   * @return      {boolean}               
   */       
  util.landscapeView = function()	// new for I3363 (Build 301)
  { 
    // Assume portrait mode if orientation undefined
    if(typeof(window.orientation) == 'undefined') return false;
    
    // Else landscape for +/-90, portrait for 0, +/-180   
    return (Math.abs(window.orientation/90) == 1); 
  }
  
  /**
   * Get viewport scale factor for this document
   *    
   * @return      {number}               
   */       
  util.getViewportScale = function() 
  {       
    // Get viewport width 
    var viewportWidth = document.documentElement.clientWidth; 

    // Return a default value if screen width is greater than the viewport width (not fullscreen). 
    if(screen.width > viewportWidth) return 1; 
    
    // Get the orientation corrected screen width 
    var screenWidth = screen.width; 
    if(util.landscapeView()) 
    {                     
      // Take larger of the two dimensions 
      if(screen.width < screen.height) screenWidth = screen.height; 
    } 
    else 
    {                               
      // Take smaller of the two dimensions 
      if(screen.width > screen.height) screenWidth = screen.height; 
    } 
    // Calculate viewport scale 
    return Math.round(100*screenWidth / window.innerWidth)/100; 
  }
  
  /**
   * Return height of URL bar on mobile devices, if visible
   * TODO: This does not seem to be right, so is not currently used   
   *    
   * @return      {number}               
   */       
  util.barHeight = function()
  {
    var dy=0;
    if(device.formFactor == 'phone')
    {
      dy=screen.height/2-window.innerHeight-(util.landscapeView()?device.dyLandscape:device.dyPortrait);
    }
    return dy;    
  }
  
  /**
   * Function     _EncodeEntities
   * Scope        Private
   * @param       {string}      P_txt         string to be encoded
   * @return      {string}                    encoded (html-safe) string               
   * Description Encode angle brackets and ampersand in text string
   */       
  util._EncodeEntities = function(P_txt)
  {
    return P_txt.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;');  // I1452 part 2
  }  


  /**
   * Function     createShim
   * Scope        Public
   * @return      {Object}      IFRAME element           
   * Description  Create an IFRAME element to go between KMW and drop down (to fix IE6 bug)
   */    
  util['createShim'] = util.createShim = function()     // I1476 - Handle SELECT overlapping BEGIN
  {
    var e = util._CreateElement('IFRAME');
    e.src = '';
    e.style.display = 'none';
    e.style.position = 'absolute';
    e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
    e.frameBorder = '0';
    e.scrolling = 'no';
    return e;
  }

  // I1476 - Handle SELECT overlapping BEGIN
  
  /**
   * Function     showShim
   * Scope        Public
   * @param       {Object}      Pvkbd         Visual keyboard DIV element 
   * @param       {Object}      Pframe        IFRAME shim element
   * @param       {Object}      Phelp         OSK Help DIV element               
   * Description  Display iFrame under OSK at its currently defined position, to allow OSK to overlap SELECT elements (IE6 fix)  
   */    
  util['showShim'] = util.showShim = function(Pvkbd,Pframe,Phelp)     
  {
    if(Pframe)
      try
      {
        Pframe.style.left = util._GetAbsoluteX(Pvkbd)+'px';
        Pframe.style.top = util._GetAbsoluteY(Pvkbd)+'px';
        if(Phelp)
        {
          Pframe.style.width = (util._GetAbsoluteX(Phelp)-util._GetAbsoluteX(Pvkbd)+Phelp.offsetWidth)+"px";
          Pframe.style.height = (util._GetAbsoluteY(Phelp)-util._GetAbsoluteY(Pvkbd)+Phelp.offsetHeight)+"px";
        }
        else
        {
          Pframe.style.width = Pvkbd.offsetWidth+"px";
          Pframe.style.height = Pvkbd.offsetHeight+"px";
        }
        Pframe.style.zindex = '9999';
        Pframe.style.display = 'block';
      } catch (Lerr) {} 
  }

  /**
   * Function     hideShim
   * Scope        Public
   * @param       {Object}      Pframe        IFRAME shim element
   * Description  Hide iFrame shim containing OSK 
   */    
  util['hideShim'] = function(Pframe)
  {
    try {
      if(Pframe) Pframe.style.display = 'none';
    } catch (err) {}      
  }
  // I1476 - Handle SELECT overlapping END

  /**
   * Function     rgba
   * Scope        Public
   * @param       {Object}      s           element style object
   * @param       {number}      r           red value, 0-255
   * @param       {number}      g           green value, 0-255
   * @param       {number}      b           blue value, 0-255
   * @param       {number}      a           opacity value, 0-1.0
   * @return      {string}                  background colour style string
   * Description  Browser-independent alpha-channel management
   */       
  util['rgba'] = util.rgba = function(s,r,g,b,a)
  { var bgColor='transparent';
    if(util._GetIEVersion() < 9)
    {
      var pcOpacity=Math.floor(100*a),rs=r.toString(16),gs=g.toString(16),bs=b.toString(16),hexColor;
      rs=('00'+rs).substr(-2); gs=('00'+gs).substr(-2); bs=('00'+bs).substr(-2);
      hexColor=pcOpacity+rs+gs+bs; 
      s.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr=#'+hexColor+',endColorstr=#'+hexColor+')';
      s.zoom='1';
    }
    else
    {   
      try
      { 
        bgColor='rgba('+r+','+g+','+b+','+a+')';
      }
      catch(ex)
      {
        bgColor='rgb('+r+','+g+','+b+')';
      }
    } 
    return bgColor;
  }
  
  /**
   * Add a stylesheet to a page programmatically, for use by the OSK, the UI or the page creator 
   * 
   * @param       {string}        s             style string
   * @return      {Object}                      returns the object reference
   **/      
  util['addStyleSheet'] = util.addStyleSheet = function(s)
  {        
    var _ElemStyle = document.createElement('STYLE'); 

    _ElemStyle.type = 'text/css';
    if(_ElemStyle.styleSheet) // IE only
    {
      _ElemStyle.styleSheet.cssText = s;
    }
    else                      // all other browsers
    {
      _ElemStyle.appendChild(document.createTextNode(s));
    }
    var _ElemHead=document.getElementsByTagName('HEAD'); 
    if(_ElemHead.length > 0)
    {
      _ElemHead[0].appendChild(_ElemStyle);
    }
    else
    {
      document.body.appendChild(_ElemStyle); // Won't work on Chrome, ah well
    }
    return _ElemStyle;
  }

  /**
   * Remove a stylesheet element
   * 
   * @param       {Object}        s             style sheet reference
   * @return      {boolean}                     false if element is not a style sheet   
   **/      
  util['removeStyleSheet'] = util.removeStyleSheet = function(s)
  {
    if(s == null || typeof(s) != 'object') return false;
    if(s.nodeName != 'STYLE') return false;
    if(typeof(s.parentNode) == 'undefined' || s.parentNode == null) return false;
    s.parentNode.removeChild(s);
    return true;
  }

  /**
   * Add a reference to an external stylesheet file
   * 
   * @param   {string}  s   path to stylesheet file      
   */      
  util['linkStyleSheet']=util.linkStyleSheet = function(s)
  {
    var headElements=document.getElementsByTagName('head');
    if(headElements.length > 0)
    {
      var linkElement=document.createElement('link');
      linkElement.type='text/css';
      linkElement.rel='stylesheet';
      linkElement.href=s;  
      headElements[0].appendChild(linkElement);
    }
  }    

  /**
   *  Add a stylesheet with a font-face CSS descriptor for the embedded font appropriate 
   *  for the browser being used
   *      
   *  @param    {Object}  fd  keymanweb font descriptor
   **/
  util.addFontFaceStyleSheet = function(fd)
  {
    // Test if a valid font descriptor
    if(typeof(fd) == 'undefined' || typeof(fd['files']) == 'undefined') return;

    var i,ttf='',woff='',eot='',fList=[];
    
    // Do not add a new font-face style sheet if already added for this font
    for(i=0; i<keymanweb.embeddedFonts.length; i++)
      if(keymanweb.embeddedFonts[i] == fd['family']) return;
    
    if(typeof(fd['files']) == 'string') fList[0]=fd['files']; else fList=fd['files'];
    
    for(i=0;i<fList.length;i++)
    {
      if(fList[i].indexOf('.ttf') > 0) ttf=fList[i];
      if(fList[i].indexOf('.woff') > 0) woff=fList[i];
      if(fList[i].indexOf('.eot') > 0) eot=fList[i];
    }

    // Font path qualified to support page-relative fonts (build 347)
    if(ttf != '' && (ttf.indexOf('/') < 0))  ttf=keymanweb.options['fonts']+ttf;
    if(woff != '' && (woff.indexOf('/') < 0)) woff=keymanweb.options['fonts']+woff;
    if(eot != '' && (eot.indexOf('/') < 0))  eot=keymanweb.options['fonts']+eot;   

    // Build the font-face definition according to the browser being used
    var s='@font-face {\nfont-family:'
      +fd['family']+';\nfont-style:normal;\nfont-weight:normal;\n';
    
    // Detect if Internet Explorer and version if so
    var IE=util._GetIEVersion(); 
    
    // Build the font source string according to the browser, 
    // but return without adding the style sheet if the required font type is unavailable
    
    // Non-IE browsers: use TTF if possible, otherwise use WOFF and TTF
    if(IE >= 999)
    {
      if(device.OS == 'iOS')
      {
        if(ttf != '') 
          s=s+'src:url(\''+ttf+'\') format(\'truetype\');';
        else return; 
      }
      else 
      {
        if(ttf != '' && woff != '')
          s=s+'src:url(\''+woff+'\') format(\'woff\'),url(\''+ttf+'\') format(\'truetype\');';
          // TODO: The following may be better but needs more testing to be sure
          //s=s+'src:url(\''+ttf+'\') format(\'truetype\'),url(\''+woff+'\') format(\'woff\');';
        else if(woff != '')
          s=s+'src:url(\''+woff+'\') format(\'woff\');';
        else if(ttf != '')
          s=s+'src:url(\''+ttf+'\') format(\'truetype\');';
        else return;
      }
    }    
    // IE
    else
    {
      if(eot != '' && IE < 9) // IE6 - IE8
        s=s+'src:url(\''+eot+'?#iefix\') format(\'embedded-opentype\');';
      else if(eot != '')      // IE9 compatibility mode(?)
        s=s+'src:url(\''+eot+'\');';
      else return;  
    }
    s=s+'\n}\n';    
  
    util.addStyleSheet(s);
    keymanweb.embeddedFonts.push(fd['family']);
  }     

  /**
   * Document cookie parsing for use by kernel, OSK, UI etc.
   * 
   * @param       {string=}       cn        cookie name (optional)
   * @return      {Object}                  array of names and strings, or array of variables and values       
   */      
  util['loadCookie'] = util.loadCookie = function(cn)
  {
    var v={}; 
    if(arguments.length > 0)
    {
      var cx = util['loadCookie']();
      for(var t in cx) 
      { 
        if(t == cn) 
        {
          var d = unescape(cx[t]).split(';');
          for(var i=0; i<d.length; i++)
          {
            var xc = d[i].split('=');
            if(xc.length > 1) v[xc[0]] = xc[1]; else v[xc[0]] = '';              
          }
        }
      } 
    }
    else
    { 
      if(typeof(document.cookie) != 'undefined' && document.cookie != '')
      {     
        var c = document.cookie.split(/;\s*/);
        for(var i = 0; i < c.length; i++)
        {
          var d = c[i].split('=');
          if(d.length == 2) v[d[0]] = d[1];
        }
      }
    }
    return v;
  }
  
  /**
   * Standard cookie saving for use by kernel, OSK, UI etc.
   * 
   * @param       {string}      cn            name of cookie
   * @param       {Object}      cv            object with array of named arguments and values   
   */      
  
  util['saveCookie'] = util.saveCookie = function(cn,cv)
  {
    var s='';
    for(var v in cv)
      s = s + v+'='+cv[v]+";";    

    var d = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 30).toGMTString();
    document.cookie = cn+'='+escape(s)+'; path=/; expires='+d;//Fri, 31 Dec 2099 23:59:59 GMT;';
  }
  
  /**
   * Function     toNumber
   * Scope        Public
   * @param       {string}      s            numeric string
   * @param       {number}      v            default value
   * @return      {number}               
   * Description  Return string converted to integer or default value
   */       
  util['toNumber'] = util.toNumber = function(s,dflt)
  {
    var x = parseInt(s,10);
    return isNaN(x) ? dflt : x;
  }

  /**
   * Function     toNumber
   * Scope        Public
   * @param       {string}      s            numeric string
   * @param       {number}      v            default value
   * @return      {number}               
   * Description  Return string converted to real value or default value
   */       
  util['toFloat'] = util.toFloat = function(s,dflt)
  {
    var x = parseFloat(s);
    return isNaN(x) ? dflt : x;
  }
  
  /**
   * Function     toNzString
   * Scope        Public
   * @param       {*}           item         variable to test
   * @param       {?*=}         dflt         default value
   * @return      {*}               
   * Description  Test if a variable is null, false, empty string, or undefined, and return as string
   */       
  util['toNzString'] = util.nzString = function(item,dflt)
  {
    var dfltValue = '';
    if(arguments.length > 1) dfltValue = dflt; 
    if(typeof(item) == 'undefined') return dfltValue;
    if(item == null) return dfltValue;
    if(item == 0 || item == '') return dfltValue;
    return ''+item;
  }

  /**
   * Function     deepCopy
   * Scope        Private
   * @param       {Object}      p           object to copy
   * @param       {Array=}      c0          array member being copied
   * @return      {Object}                  clone ('deep copy') of object
   * Description  Makes an actual copy (not a reference) of an object, copying simple members, 
   *              arrays and member objects but not functions, so use with care!
   */              
  util.deepCopy = function(p,c0) 
  {
    var c = c0 || {};
    for (var i in p) 
    {
      if(typeof p[i] === 'object') 
      {
        c[i] = (p[i].constructor === Array )? [] : {};
        util.deepCopy(p[i],c[i]);
      } 
      else c[i] = p[i];
    }
    return c;
  }

  /**
   * Extend Array function by adding indexOf array member if undefined (IE < IE9)
  */
  if(! ('indexOf' in Array)) 
  {
    Array.prototype.indexOf = function(obj, start) 
    {
        for(var i=(start || 0); i<this.length; i++) 
        {
          if(this[i] == obj) return i;
        }
      return -1;
    }
  }
 
  /**
   * Return the event target for any browser
   *    
   * @param       {Event}      e        event
   * @return      {Object}              HTML element
   */       
  util.eventTarget = function(e)
  {
    if(e && e.target)        // most browsers
      return e.target;
    else if(window.event)     //IE 8 (and earlier)
      return window.event.srcElement;
    else
      return null;            // shouldn't happen!
  }

  /**
   * Return the event type for any browser
   *    
   * @param       {Event}      e        event
   * @return      {string}              type of event
   */       
  util.eventType = function(e)
  {
    if(e && e.type)        // most browsers
      return e.type;
    else if(window.event)     //IE 8 (and earlier)
      return window.event.type;
    else
      return '';            // shouldn't happen!
  }
  
  /**
   * Customized alert 
   *    
   * @param     {string}        s       alert text
   * @param     {function()=}   fn      function to call when alert dismissed   
   */       
  util['alert'] = util.alert = function(s,fn)
  {
    var bg=keymanweb.waiting,nn=bg.firstChild.childNodes;
    nn[0].style.display='block';
    nn[1].className='kmw-alert-text'; nn[1].innerHTML=s;
    nn[2].style.display='none';
    bg.style.display='block';
    if(arguments.length > 1) bg.dismiss=fn; else bg.dismiss=null;
  }
  
  /**
   *  Prepare the background and keyboard loading wait box
   *  Cannot be called before options are defined during initialization
   **/           
  util.prepareWait = function()
  { 
    var bg=document.createElement('DIV'),
        lb=document.createElement('DIV'),
        lt=document.createElement('DIV'),    
        gr=document.createElement('DIV'),
        bx=document.createElement('DIV');

    bg.className='kmw-wait-background'; lb.className='kmw-wait-box'; bg.dismiss=null;
    lt.className='kmw-wait-text'; gr.className='kmw-wait-graphic';
    bx.className='kmw-alert-close';
    // Close alert if anywhere in box is touched, since close box is too small on mobiles 
    lb.ontouchstart=lb.onmousedown=lb.onclick=function(e)
    {
      // Ignore if wait, only handle for alert
      if(bx.style.display == 'block')
      {
        bg.style.display='none';
        if(bg.dismiss)bg.dismiss();
      }
    }  
    bg.ontouchstart=bg.onmousedown=bg.onclick=function(e){e.preventDefault();e.stopPropagation();}
    lb.appendChild(bx); lb.appendChild(lt); lb.appendChild(gr);
    bg.appendChild(lb); document.body.appendChild(bg);
    keymanweb.waiting=bg;    
  }
  
  /**
   * Customized wait display 
   *    
   * @param   {string|boolean}   s       displayed text (or false)
   */       
  util.wait = function(s)
  {
    if(device.app != '') return;
    var bg=keymanweb.waiting,nn=bg.firstChild.childNodes;
    if(s)
    {
      bg.pending=true;
      window.setTimeout(function()
        {
          if(bg.pending)
          {            
            window.scrollTo(0,0); 
            nn[0].style.display='none';
            nn[1].className='kmw-wait-text'; nn[1].innerHTML=s; 
            nn[2].style.display='block';
            bg.style.display='block';
          }
        },1000);
    }
    else
    {
      if(bg.pending)
      {
        nn[1].innerHTML=''; 
        bg.pending=false; bg.style.display='none';
      }
    }
  }

  /**
   * Get path of keymanweb script, for relative references
   * (Not currently used, but keep for future use.)   
   * 
   *@return   {string}      path to source, with trailing slash
   **/           
  util.myPath = function()
  {
    var sName='keymanweb',i,scripts=document.getElementsByTagName('script'),ss;
    
    // Allow alternate script name for KeymanTouch
    if(device.app != '') sName='keymanios';
    
    for(i=0; i<scripts.length; i++)
    {
      ss=scripts[i];
      if(ss.src.indexOf(sName) >= 0) 
        return ss.src.substr(0,ss.src.lastIndexOf('/')+1);      
    }
    return '';
  }
  /**
   * Return the appropriate test string for a given font
   * 
   * TODO: Tidy up and remove arrays once 'sample' included in font metadata
   * 
   *  @param  {Object}    fd    font meta-data object
   *  @return {string}          string to compare width
   *
   */                   
  util.testString = function(fd)
  {
    var fontName=fd['family'], 
    i,s='BESbswy';
    if('sample' in fd && typeof(fd['sample']) == 'string')
      return s+fd['sample'];

    var f=['TamilWeb','TibetanWeb','LatinWeb','CherokeeWeb',    
          'EgyptianWeb','SinhalaWeb','KhmerWeb','ArabicWeb',
          'BurmeseWeb','LaoWeb','OriyaWeb','GeezWeb'],
        t=['\u0BBE\u0BF5','\u0F7F\u0FD0','\u02B0\u02A4','\u13D0\u13C9',
          '\uA723\uF7D3','\u0DD8\u0DA3','\u17D6\u178E','\u0639\u06B3',
          '\u1038\u1024','\u0EC0\u0EDD','\u0B03\u0B06','\u1361\u132C'];
    for(i=0; i<f.length; i++)
    {
      if(fontName == f[i]) return s+t[i];
    }
    return s; 
  }
 
  /**
   * Test if a font is installed (or available) on the target platform
   *    
   * @param       {Object}        fd    font structure
   * @return      {boolean}             true if font available
   */       
  util.checkFont = function(fd)
  {
    var fontReady=false,fontName=fd['family'];
    
  	// Create an absolute positioned div and two paragraph elements with spans for the test string.
  	// The paragraph elements ensure that the spans are measured from the same point, otherwise
  	// pixel rounding can result in different widths for the same string and styles.
  	// Using a separate invisible DIV is more reliable than other positioning.
    var d=document.createElement('DIV'),ds=d.style,
        p1=document.createElement('P'),
        p2=document.createElement('P'),
        t1=document.createElement('SPAN'),s1=t1.style,
        t2=document.createElement('SPAN'),s2=t2.style;
 
    //var dbg=keymanweb.debug;   
    ds.position='absolute';ds.top='10px';ds.left='10px';
    ds.visibility='hidden';
    document.body.appendChild(d);
  	d.appendChild(p1); d.appendChild(p2); 
  	p1.appendChild(t1); p2.appendChild(t2); 

  	// Firefox fails without the !important prefix on the fallback font, 
  	// apparently applying the same font to both elements.
    // But it also fails to distinguish the two if !important is added to the test font!  
  	// *** TODO: See if still true after changes Dec 2013 *** 
    // Must apply !important tag to font-family, but must apply it to the CSS style, not the JS object member
    // c.f. http://stackoverflow.com/questions/462537/overriding-important-style-using-javascript 
    t1.setAttribute('style','font-family:monospace !important');
    s2.fontFamily=fontName+',monospace'; 
  	s1.fontSize=s2.fontSize='24px';      // Not too large, to avoid wrapping or overflow 
    
    // Include narrow and wide characters from each unique script
  	t1.innerHTML=t2.innerHTML=util.testString(fd); 
    
  	// Compare the actual width of each span. Checking monospace, serif, 
    // and sans-serif helps to avoid falsely reporting the font as ready
    // The width must be different for all three tests.
  	if(t1.offsetWidth != t2.offsetWidth)
    { 
      t1.setAttribute('style','font-family:sans-serif !important');
      s2.fontFamily=fontName+',sans-serif';
      if(t1.offsetWidth != t2.offsetWidth) 
      {
        t1.setAttribute('style','font-family:serif !important');
        s2.fontFamily=fontName+',serif';        
      }
  	}    
    fontReady=(t1.offsetWidth != t2.offsetWidth);
    
    // Delete test elements
	  p1.removeChild(t1);p2.removeChild(t2);
	  d.removeChild(p1);d.removeChild(p2);
	  document.body.removeChild(d);

    return fontReady;
  }
   
  /**
   * Check a font descriptor for font availability, returning true if undefined
   * 
   *  @param  {Object}  fd  font descriptor member of keyboard stub
   *  @return {boolean}           
   **/
  util.checkFontDescriptor = function(fd)
  {  
    if(typeof(fd) == 'undefined' || typeof(fd['family']) != 'string') return true;
    return util.checkFont(fd);
  }
      
})();

// KeymanWeb 2.0
// Copyright 2010 Tavultesoft Pty Ltd

/******************************************************************
 *  Main Keyman Web Module    
 *   
 *  Code enclosed as an anonymous function to protect name space                          
 *    
 ******************************************************************/

(function() 
{ 
  // Declare KeymanWeb, OnScreen Keyboard and Util objects
  var keymanweb=window['tavultesoft']['keymanweb'],osk=keymanweb['osk'],util=keymanweb['util'],device=util.device;

  /**
   * Function     debug
   * Scope        Private
   * @param       {(string|Object)}     s   string (or object) to print
   * Description  Simple debug display (upper right of screen)
   */       
  keymanweb['debug']=keymanweb.debug=function(s){
    var p;//=document.getElementById('debug_output'); 
    if(keymanweb.debugElement == null)
    {
      var d=document.createElement('DIV'),ds=d.style;
      ds.position='absolute';ds.width='30%';ds.maxHeight='50%';ds.top='0';ds.right='0';
      ds.minHeight='50px'; ds.border='1px solid blue'; ds.whiteSpace='pre-line';ds.overflowY='scroll';
      p=document.createElement('P'); p.id='debug_output';p.style.margin='2px';
      d.appendChild(p);
      document.body.appendChild(d);   
      keymanweb.debugElement=p;  
    } 
    if((p=document.getElementById('debug_output')) == null) return; 

    if(arguments.length == 0)
      if(typeof p.textContent != 'undefined') p.textContent=''; else p.innerHTML='';
    else
    {
      var ts=new Date().toTimeString().substr(3,5),t=s,m;
      if(typeof s == 'object')
      {
        if(s == null)
        {
          t='null';
        }
        else
        {
          t='{';
          for(m in s) 
          {
            t=t+m+':';
            switch(typeof s[m])
            {
              case 'string':
              case 'number':
              case 'boolean':
                t=t+s[m]; break;
              default:
                t=t+typeof s[m]; break;
            }
            t=t+'; ';
          }
          if(t.length > 2) t=t.substr(0,t.length-2); //drop final semi-colon
          t+='}';
         } 
      } 
      if(typeof p.textContent != 'undefined')
        p.textContent=ts+' '+t+'\n'+p.textContent;
      else
        p.innerHTML=ts+' '+t+'<br />'+p.innerHTML;
      
    }
  }
  keymanweb.debugElement=null;
  var dbg=keymanweb.debug;
      
  /**
   * Function     addEventListener
   * Scope        Public
   * @param       {string}            event     event to handle
   * @param       {function(Event)}   func      event handler function
   * @return      {boolean}                     value returned by util.addEventListener
   * Description  Wrapper function to add and identify KeymanWeb-specific event handlers
   */       
  keymanweb['addEventListener'] = function(event, func)
  {
    return util.addEventListener('kmw.'+event, func);
  }

  /**
   * Function    setUpTouchDevice
   * Scope       Private
   * Description Initialize event handling and duplicate input fields for touch-input devices
   */       
  keymanweb.setupTouchDevice = function()
  { 
    /**
     * Ideally, OSK behaviour should emulate internal keyboard, but 
     * it is not possible to do that while allowing native scrolling.
     * The compromise adopted is that a touchstart or touchmove event
     * on any part of the page other than an input element or the OSK 
     * itself will temporarily hide the OSK until the touchend or 
     * window.scroll event is fired. Hiding the OSK in this way seems
     * less disturbing than having it move as the page is scrolled.
     * 
     * All of this may be better if we can reliably get the y-offset 
     * from the CSS transform and apply that to repositioning the OSK
     * using a timed event loop.           
     */  

    /**
     * Close OSK and remove simulated caret on losing focus
     */          
    keymanweb.cancelInput = function()
    { 
      keymanweb._ActiveElement=null; 
      keymanweb.hideCaret(); 
      osk.hideNow();
    }
    
    /**
     * Handle losing focus from simulated input field 
     *      
     * @param       {Event}      e    event
     */       
    keymanweb.setBlur = function(e)
    {                       
      // This works OK for iOS, but may need something else for other platforms
      if(('relatedTarget' in e) && e.relatedTarget)
      {                     
        if(e.relatedTarget.nodeName != 'DIV' || e.relatedTarget.className.indexOf('keymanweb-input') == -1)
        {         
          keymanweb.cancelInput(); return;        
        }
      }        
      //Hide the OSK      
      if(!keymanweb.focusing) keymanweb.cancelInput(); 
    }   
    
    /**
     * Handle receiving focus by simulated input field 
     *      
     * @param       {Event}      e    event
     */       
    keymanweb.setFocus=function(e)
    {                     
      //e.stopPropagation();  // not doing anything useful, no child elements
      //e.preventDefault();   // prevents user selection or scrolling, may be better if they are allowed?

      keymanweb.focusing=true;
      keymanweb.focusTimer=window.setTimeout(function(){keymanweb.focusing=false;},1000);
      
      var tEvent=e;      
      if(typeof e.touches == 'object') tEvent=e.touches[0];
      
      var touchX=tEvent.clientX,touchY=tEvent.clientY,tTarg=tEvent.target,scroller;
      
      // Identify the scroller element
      if(tTarg.nodeName == 'SPAN')
        scroller=tTarg.parentNode;
      else if(tTarg.className != null && tTarg.className.indexOf('keymanweb-input') >= 0) 
        scroller=tTarg.firstChild;
      else
        scroller=tTarg;

      // And the actual target element        
      var target=scroller.parentNode;

      // Move the caret and refocus if necessary     
      if(keymanweb._ActiveElement != target) 
      {                         
        // Hide the KMW caret
        keymanweb.hideCaret(); 
        keymanweb._ActiveElement=target; 
        // The issue here is that touching a DIV does not actually set the focus for iOS, even when enabled to accept focus (by setting tabIndex=0)
        // We must explicitly set the focus in order to remove focus from any non-KMW input
        target.focus();  //Android native browsers may not like this, but it is needed for Chrome, Safari
      }  
      
      // What we really want to do is to blur any active element that is not a KMW input, 
      // but the following line does not work as might be expected, even though the correct element is referenced.
      // It is as though blur is ignored if focus is supposed to have been moved, even if it has not in fact been moved?
      //if(document.activeElement.nodeName != 'DIV' && document.activeElement.nodeName != 'BODY') document.activeElement.blur();
      
      // Refresh the internal keyboard flag state
      keymanweb.useInternalKeyboard=false;
      
      // And display the OSK if not already visible
      if(osk.ready && !osk._Visible) osk._Show();
      
      // If clicked on DIV, set caret to end of text
      if(tTarg.nodeName == 'DIV' )
      { 
        var x,cp;
        x=util._GetAbsoluteX(scroller.firstChild);        
        if(target.dir == 'rtl')
        { 
          x += scroller.firstChild.offsetWidth;        
          cp=(touchX > x ? 0 : 100000);
        }        
        else
          cp=(touchX<x ? 0 : 100000);
     
        keymanweb.setTextCaret(target,cp);
        keymanweb.scrollInput(target);        
      }
      // Otherwise, if clicked on text in SPAN, set at touch position
      else  
      { 
        var caret,cp,cpMin,cpMax,x,y,dy,yRow,iLoop;
        caret=scroller.childNodes[1]; //caret span
        cpMin=0;
        cpMax=keymanweb.getText(target)._kmwLength();
        cp=keymanweb.getTextCaret(target);
        dy=document.body.scrollTop;

        // Vertical scrolling
        if(target.base.nodeName == 'TEXTAREA')
        {
          yRow=Math.round(target.base.offsetHeight/target.base.rows);     
          for(iLoop=0; iLoop<16; iLoop++)
          {
            y=util._GetAbsoluteY(caret)-dy;  //top of caret            
            if(y > touchY && cp > cpMin && cp != cpMax) {cpMax=cp; cp=Math.round((cp+cpMin)/2);}
            else if(y < touchY-yRow && cp < cpMax && cp != cpMin) {cpMin=cp; cp=Math.round((cp+cpMax)/2);}
            else break;
            keymanweb.setTextCaret(target,cp);
          }
          while(util._GetAbsoluteY(caret)-dy > touchY && cp > cpMin)keymanweb.setTextCaret(target,--cp);
          while(util._GetAbsoluteY(caret)-dy < touchY-yRow && cp < cpMax) keymanweb.setTextCaret(target,++cp);
        }
        // Caret repositioning for horizontal scrolling of RTL text
        if(target.dir == 'rtl')
        {
          for(iLoop=0; iLoop<16; iLoop++)
          {
            x=util._GetAbsoluteX(caret);  //left of caret            
            if(x < touchX && cp > cpMin && cp != cpMax) {cpMax=cp; cp=Math.round((cp+cpMin)/2);}
            else if(x > touchX && cp < cpMax && cp != cpMin) {cpMin=cp; cp=Math.round((cp+cpMax)/2);}
            else break;
            keymanweb.setTextCaret(target,cp);
          }
          while(util._GetAbsoluteX(caret) < touchX && cp > cpMin) keymanweb.setTextCaret(target,--cp);
          while(util._GetAbsoluteX(caret) > touchX && cp < cpMax) keymanweb.setTextCaret(target,++cp);
        }
        // Caret repositioning for horizontal scrolling of standard (LTR) text
        else
        {
          for(iLoop=0; iLoop<16; iLoop++) // assumes fields shorter than 2**16 characters
          {
            x=util._GetAbsoluteX(caret);  //left of caret            
            if(x > touchX && cp > cpMin && cp != cpMax)
            {
              cpMax=cp; cp=Math.round((cp+cpMin)/2);
            }
            else if(x < touchX && cp < cpMax && cp != cpMin)
            {
              cpMin=cp; cp=Math.round((cp+cpMax)/2);
            }
            else break;
            keymanweb.setTextCaret(target,cp);
          }
          while(util._GetAbsoluteX(caret) > touchX && cp > cpMin) keymanweb.setTextCaret(target,--cp);
          while(util._GetAbsoluteX(caret) < touchX && cp < cpMax) keymanweb.setTextCaret(target,++cp);
        }
      }
      
    // TODO: The following is copied from old control focus... not sure how much is needed  
      
      keymanweb._ActiveControl = null;
      keymanweb._LastActiveElement = target;
      for(var Ln=0; Ln < keymanweb._Controls.length; Ln++) // I1511 - array prototype extended
        if(keymanweb._Controls[Ln].LControl == target)
        {
          keymanweb._ActiveControl = keymanweb._Controls[Ln];
          break;
        }
  
      if(keymanweb._ActiveControl != null  &&  keymanweb._ActiveControl.LDefaultInternalName != null)
      {
        if(!keymanweb._JustActivatedKeymanWebUI)
        {
          keymanweb._SetActiveKeyboard(keymanweb._ActiveControl.LDefaultInternalName,'',true); 
        }
        else
          keymanweb._ActiveControl.LDefaultInternalName = keymanweb._ActiveKeyboard == null ? '' : keymanweb._ActiveKeyboard['KI'];
      }
      
      //TODO: the logic of the following line doesn't look right!!  Both variables are true, but that doesn't make sense!
      //_Debug(keymanweb._IsIEEditableIframe(Ltarg,1) + '...' +keymanweb._IsMozillaEditableIframe(Ltarg,1));
      if(!keymanweb._IsIEEditableIframe(target,1) || !keymanweb._IsMozillaEditableIframe(target,1))
      {
        keymanweb._DisableInput = 1; return;
      }
      keymanweb._DisableInput = 0;
  
      if(!keymanweb._JustActivatedKeymanWebUI)
      {
        keymanweb._DeadKeys = [];
        keymanweb._NotifyKeyboard(0,target,1);  // I2187
      }
     
      if(!keymanweb._JustActivatedKeymanWebUI  &&  keymanweb._SelectionControl != target)
        keymanweb._IsActivatingKeymanWebUI = 0;
      keymanweb._JustActivatedKeymanWebUI = 0;
  
      keymanweb._SelectionControl = target;
    }

    /**
     * Create a caret to be appended to the scroller of the focussed input field. 
     * The caret is appended to the scroller so that it will automatically be clipped 
     * when the user manually scrolls it outside the element boundaries.          
     * It is positioned exactly over the hidden span that is inserted between the
     * text spans before and after the insertion point.          
     */
    keymanweb.caret=document.createElement('DIV');
    var cs=keymanweb.caret.style;
    cs.position='absolute';
    cs.height='16px';           // default height, actual height set from element properties
    cs.width='2px';
    cs.backgroundColor='blue';
    cs.border='none';
    cs.left=cs.top=0;           // actual position set relative to parent when displayed
    cs.display='block';         
    cs.visibility='hidden';
    cs.zIndex='9998';           // immediately below the OSK
    
    /**
     * Position the caret at the start of the second span within the scroller
     *      
     * @param   {Object}  e   input DIV element (copy of INPUT or TEXTAREA)
     */
    keymanweb.showCaret=function(e)
    {                          
      if(!e || !e.firstChild || (e.firstChild.childNodes.length<3)) return;

      var scroller=e.firstChild,cs=keymanweb.caret.style,sp2=scroller.childNodes[1];
      
      // Attach the caret to this scroller and position it over the caret span
      if(keymanweb.caret.parentNode != scroller) scroller.appendChild(keymanweb.caret);
      cs.left=sp2.offsetLeft+'px'; 
      cs.top=sp2.offsetTop+'px';
      cs.height=(sp2.offsetHeight-1)+'px';
      cs.visibility='hidden';   // best to wait for timer to display caret
      
      // Scroll into view if required
      keymanweb.scrollBody(e);
     
      // Display and position the scrollbar if necessary
      keymanweb.setScrollBar(e);
    }

    /**
     * Display and position a scrollbar in the input field if needed
     * 
     * @param   {Object}  e   input DIV element (copy of INPUT or TEXTAREA)
     */
    keymanweb.setScrollBar=function(e)
    {
      // Display the scrollbar if necessary.  Added TEXTAREA condition to correct rotation issue KMW-5.  Fixed for 310 beta.
      var scroller=e.childNodes[0],sbs=e.childNodes[1].style;
      if((scroller.offsetWidth > e.offsetWidth || scroller.offsetLeft < 0) && (e.base.nodeName != 'TEXTAREA')) 
      {
        sbs.height='4px';
        sbs.width=100*(e.offsetWidth/scroller.offsetWidth)+'%';
        sbs.left=100*(-scroller.offsetLeft/scroller.offsetWidth)+'%';
        sbs.top='0';
        sbs.visibility='visible';  
      }
      else if(scroller.offsetHeight > e.offsetHeight || scroller.offsetTop < 0)
      {
        sbs.width='4px';
        sbs.height=100*(e.offsetHeight/scroller.offsetHeight)+'%';
        sbs.top=100*(-scroller.offsetTop/scroller.offsetHeight)+'%';
        sbs.left='0';    
        sbs.visibility='visible';        
      }
      else
      {
        sbs.visibility='hidden';
      }
    }                    

    /**
     * Description Toggle state of caret in simulated input field
     */         
    keymanweb.flashCaret = function()
    {
      if(device.touchable && keymanweb._ActiveElement != null)
      {
        var cs=keymanweb.caret.style;
        if(cs.visibility != 'visible') cs.visibility='visible'; else cs.visibility='hidden';
      }
    }
  
    /**
     * Hide caret in simulated input field, update underlying INPUT or TEXTAREA
     */         
    keymanweb.hideCaret = function()
    {
      var e=keymanweb._LastActiveElement,s=null;
      if(e && e.className != null && e.className.indexOf('keymanweb-input') >= 0)
      {
        // Always copy text back to underlying field on blur
        e.base.value = keymanweb.getText(e);
        
        // And set the scroller caret to the end of the element content
        keymanweb.setText(e,null,100000);
        
        // Set the element scroll to zero (or max for RTL INPUT)
        var ss=e.firstChild.style;
        if(e.base.nodeName == 'TEXTAREA')
          ss.top='0'; 
        else
        {
          if(e.base.dir == 'rtl') ss.left=(e.offsetWidth-e.firstChild.offsetWidth-8)+'px';
          else ss.left='0';
        }
        
        
        // And hide the caret and scrollbar       
        if(keymanweb.caret.parentNode) keymanweb.caret.parentNode.removeChild(keymanweb.caret);
        keymanweb.caret.style.visibility='hidden';
        if(e.childNodes.length > 1 ) e.childNodes[1].style.visibility='hidden';
      }    
    }
    
    // Start the caret flash timer
    keymanweb.timerId = window.setInterval(keymanweb.flashCaret,500);

    /**
     * Insert text into simulated input field at indicated character position
     * 
     * @param       {Object}      e     simulated input field DIV
     * @param       {?string}     t     text to insert in element
     * @param       {?number}     cp    caret position (characters)     
     */         
    keymanweb.setText = function(e,t,cp)
    {
      if(e && e.childNodes.length > 0)
      {
        var d=e.firstChild,tLen=0;
        if(d.childNodes.length >= 3)
        {
          var s1=d.childNodes[0],s2=d.childNodes[2],t1,t2;
          
          // Read current text if null passed (for caret positioning)
          if(t === null)
          {
            t1=(typeof(s1.textContent) == 'string' ? s1.textContent : s1.innerText);
            t2=(typeof(s2.textContent) == 'string' ? s2.textContent : s2.innerText);
            t=t1+t2;        
          }
          if(cp < 0) cp = 0;
          tLen=t._kmwLength();
          
          if(cp === null || cp > tLen) cp=tLen;
          t1=t._kmwSubstr(0,cp); t2=t._kmwSubstr(cp);
                              
          if(typeof(s1.textContent) == 'string') s1.textContent=t1; else s1.innerText=t1;
          if(typeof(s2.textContent) == 'string') s2.textContent=t2; else s2.innerText=t2;          
        }
      }
      keymanweb.updateBaseElement(e,tLen); // KMW-3, KMW-29
    }

    /**
     * Set content, visibility, background and borders of input and base elements (KMW-3,KMW-29) 
     *
     * @param       {Object}        e     input element 
     * @param       {number}        n     length of text in field
     */                      
    keymanweb.updateBaseElement=function(e,n)
    {
      e.base.value=keymanweb.getText(e); //KMW-29
      e.style.backgroundColor=(n==0?'transparent':window.getComputedStyle(e.base,null).backgroundColor);
      if(device.OS == 'iOS')
      {
        e.base.style.visibility=(n==0?'visible':'hidden');
      }
    }
    
    /**
     * Get simulated input field content
     * 
     * @param       {Object}        e     simulated input field DIV
     * @return      {string}              entire text in simulated input field
     */         
    keymanweb.getText=function(e)
    {
      if(e == null) return '';
      return (typeof(e.textContent) == 'string' ? e.textContent : e.innerText);
    } 
   
     /**
     * Get text up to the caret from simulated input field 
     * 
     * @param       {Object}        e     simulated input field DIV
     * @return      {string}              Context for simulated input field
     */         
    keymanweb.getTextBeforeCaret=function(e)
    {
      if(e && e.childNodes.length > 1) 
      {
        var d=e.firstChild;
        if(d.childNodes.length > 0) 
        {
          var s1=d.childNodes[0];
          if('textContent' in s1)
            return s1.textContent;
          if('innerText' in s1)
            return s1.innerText;
        }
      }
      return '';    
    }
  
     /**
     * Replace text up to the caret in the simulated input field 
     * 
     * @param       {Object}        e     simulated input field DIV
     * @param       {string}        t     string to insert 
     */         
    keymanweb.setTextBeforeCaret=function(e,t)
    {
      if(e && e.childNodes.length > 0) 
      {
        var d=e.firstChild,tLen=0;
        if(d.childNodes.length > 1) 
        {
          var s1=d.childNodes[0],s2=d.childNodes[2];
          // Collapse (trailing) whitespace to a single space for INPUT fields (also prevents wrapping)
          if(e.base.nodeName != 'TEXTAREA') t=t.replace(/\s+$/,' ');
          if('textContent' in s1) s1.textContent=t;
          else if('innerText' in s1) s1.innerText=t; 
          // Test total length in order to control base element visibility 
          tLen=t.length;
          if('textContent' in s2) tLen=tLen+s2.textContent.length;
          else if('innerText' in s2) tLen=tLen+s2.innerText.length;            
        }
      }
      
      // Update the base element then scroll into view if necessary      
      keymanweb.updateBaseElement(e,tLen); //KMW-3, KMW-29      
      keymanweb.scrollInput(e); 
           
    }
    
     /**
     * Description  Get current position of caret in simulated input field 
     * 
     * @param       {Object}        e     simulated input field DIV
     * @return      {number}              caret character position in simulated input field
     */         
    keymanweb.getTextCaret=function(e)
    {
      return keymanweb.getTextBeforeCaret(e)._kmwLength();
    }

     /**
     * Set current position of caret in simulated input field then display the caret 
     * 
     * @param       {Object}        e     element (object) or element id (string) of simulated input field
     * @param       {number}        cp    caret position (character index)
     */         
    keymanweb.setTextCaret=function(e,cp)
    {
      keymanweb.setText(e,null,cp);
      keymanweb.showCaret(e);
    }

     /**
     * Handle the touch move event for an input element
     * 
     * @param       {Event}           e     touchmove event
     */         
    keymanweb.dragInput=function(e)
    {    
      // Prevent dragging window 
      e.preventDefault();  e.stopPropagation();      

      // Identify the target from the touch list or the event argument (IE 10 only) 
      var target=(typeof e.targetTouches == 'object' ? e.targetTouches[0].target : e.target);     
      if(target == null) return;
      
      // Identify the input element from the touch event target (touched element may be contained by input)
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) target=target.parentNode;
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) target=target.parentNode;
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) return;
      
      var x=(typeof e.touches == 'object' ? e.touches[0].screenX : e.screenX),       
          y=(typeof e.touches == 'object' ? e.touches[0].screenY : e.screenY);
                
      // Allow content of input elements to be dragged horizontally or vertically
      if(typeof keymanweb.firstTouch == 'undefined' || keymanweb.firstTouch == null)
        keymanweb.firstTouch={x:x,y:y};
      else
      {
        var x0=keymanweb.firstTouch.x,y0=keymanweb.firstTouch.y,
          scroller=target.firstChild,dx,dy,x1;
        
        if(target.base.nodeName == 'TEXTAREA')
        {
          var yOffset=parseInt(scroller.style.top,10);
          if(isNaN(yOffset)) yOffset=0;
          dy=y0-y;
          if(dy < -4 || dy > 4)
          {
            scroller.style.top=(yOffset<dy?yOffset-dy:0)+'px';
            keymanweb.firstTouch.y=y;  
          } 
        }
        else
        {
          var xOffset=parseInt(scroller.style.left,10);
          if(isNaN(xOffset)) xOffset=0;
          dx=x0-x;
          if(dx < -4 || dx > 4)
          {
            // Limit dragging beyond the defined text (to avoid dragging the text completely out of view)
            var xMin=0,xMax=util._GetAbsoluteX(target)+target.offsetWidth-scroller.offsetWidth-32;
            if(target.base.dir == 'rtl')xMin=16; else xMax=xMax-24;            
            x1=xOffset-dx;
            if(x1 > xMin) x1=xMin;
            if(x1 < xMax) x1=xMax;
            scroller.style.left=x1+'px';
            keymanweb.firstTouch.x=x;       
          }    
        }
      }
      keymanweb.setScrollBar(target);
    }

    /**
     * Scroll the input field horizontally (INPUT base element) or 
     * vertically (TEXTAREA base element) to bring the caret into view
     * as text is entered or deleted form an element     
     *      
     * @param       {Object}      e        simulated input field object with focus
     */         
    keymanweb.scrollInput=function(e)
    {
      if(!e || !e.firstChild || e.className == null || e.className.indexOf('keymanweb-input') < 0 ) return;

      var scroller=e.firstChild;
      if(scroller.childNodes.length < 3) return;
 
      // Get the actual absolute position of the caret and the element 
      var s2=scroller.childNodes[1],
        cx=util._GetAbsoluteX(s2),cy=util._GetAbsoluteY(s2),
        ex=util._GetAbsoluteX(e),ey=util._GetAbsoluteY(e),
        x=parseInt(scroller.style.left,10),
        y=parseInt(scroller.style.top,10),
        dx=0,dy=0; 
      
      // Scroller offsets must default to zero
      if(isNaN(x)) x=0; if(isNaN(y)) y=0;
 
      // Scroll input field vertically if necessary
      if(e.base.nodeName == 'TEXTAREA')
      { 
        var rowHeight=Math.round(e.offsetHeight/e.base.rows);
        if(cy < ey) dy=cy-ey;
        if(cy > ey+e.offsetHeight-rowHeight) dy=cy-ey-e.offsetHeight+rowHeight;   
        if(dy != 0)scroller.style.top=(y<dy?y-dy:0)+'px';
      } 
      // or scroll horizontally if needed
      else
      {
        if(cx < ex+8) dx=cx-ex-12;
        if(cx > ex+e.offsetWidth-12) dx=cx-ex-e.offsetWidth+12;   
        if(dx != 0)scroller.style.left=(x<dx?x-dx:0)+'px';
      }    

      // Display the caret (and scroll into view if necessary)
      keymanweb.showCaret(e);
    }

    /**
     * Scroll the document body vertically to bring the active input into view
     * 
     * @param       {Object}      e        simulated input field object being focussed
     */         
    keymanweb.scrollBody=function(e)
    { 
      if(!e || e.className == null || e.className.indexOf('keymanweb-input') < 0 || !osk.ready) return;

      // Get the absolute position of the caret
      var s2=e.firstChild.childNodes[1],y=util._GetAbsoluteY(s2),t=window.pageYOffset,dy=0;
      if(y < t) 
      {
        dy=y-t;
      }
      else
      {
        dy=y-t-(window.innerHeight-osk._Box.offsetHeight-s2.offsetHeight-2);
        if(dy < 0) dy=0;
      }    
      // Hide OSK, then scroll, then re-anchor OSK with absolute position (on end of scroll event)
      if(dy != 0) 
        window.scrollTo(0,dy+window.pageYOffset);
    }

    /**
     *  Correct the position and size of a duplicated input element
     *  @param  {Object}  x   simulated input element
     **/              
    keymanweb.updateInput = function(x)
    {
      var xs=x.style,b=x.base,
          s=window.getComputedStyle(b,null),
          mLeft=parseInt(s.marginLeft,10),
          mTop=parseInt(s.marginTop,10),
          x1=util._GetAbsoluteX(b),y1=util._GetAbsoluteY(b);
 
      var p=x.offsetParent;
      if(p)
      {
        x1=x1-util._GetAbsoluteX(p); y1=y1-util._GetAbsoluteY(p);
      }
      
      if(isNaN(mLeft)) mLeft=0; if(isNaN(mTop)) mTop=0;
      
      xs.left=(x1-mLeft)+'px'; xs.top=(y1-mTop)+'px';

      // FireFox does not want the offset!
      if(typeof(s.MozBoxSizing) != 'undefined') {xs.left=x1+'px'; xs.top=y1+'px';}     

      var w=b.offsetWidth,h=b.offsetHeight,
          pLeft=parseInt(s.paddingLeft,10),pRight=parseInt(s.paddingRight,10),      
          pTop=parseInt(s.paddingTop,10),pBottom=parseInt(s.paddingBottom,10),
          bLeft=parseInt(s.borderLeft,10),bRight=parseInt(s.borderRight,10),    
          bTop=parseInt(s.borderTop,10),bBottom=parseInt(s.borderBottom,10);
    
      // If using content-box model, must subtract the padding and border, 
      // but *not* for border-box (as for WordPress PlugIn)
      var boxSizing='undefined';
      if(typeof(s.boxSizing) != 'undefined') boxSizing=s.boxSizing;
      else if(typeof(s.MozBoxSizing) != 'undefined') boxSizing=s.MozBoxSizing;
      if(boxSizing == 'content-box')
      {
        if(!isNaN(pLeft)) w -= pLeft; if(!isNaN(pRight)) w -= pRight;
        if(!isNaN(bLeft)) w -= bLeft; if(!isNaN(bRight)) w -= bRight;
        
        if(!isNaN(pTop)) h -= pTop; if(!isNaN(pBottom)) h -= pBottom;
        if(!isNaN(bTop)) h -= bTop; if(!isNaN(bBottom)) h -= bBottom;
      }
    
      if(device.OS == 'Android') 
      {
        // FireFox - adjust padding to match input and text area defaults 
        if(typeof(s.MozBoxSizing) != 'undefined') 
        {
          xs.paddingTop=(pTop+1)+'px';
          xs.paddingLeft=pLeft+'px';
          
          if(x.base.nodeName == 'TEXTAREA')
            xs.marginTop='1px';
          else
            xs.marginLeft='1px';
  
          w--;h--;
        }
        // Chrome, Opera, native browser (?)
        else
        {
          w++;h++;
        }
      }
      xs.width=w+'px'; xs.height=h+'px';   
    }

    /**
     * Align all input fields with underlying elements after a rotation, resize, or change of element font
     * and/or set visibility     
     * 
     *  @param  {boolean}   align    align and make visible, else hide
     * 
     **/
    keymanweb.alignInputs = function(align)
    {                 
      if(device.touchable && (device.app == ''))
      {
        for(var i=0; i<keymanweb.inputList.length; i++)
        {
          if(align) 
          {     
            keymanweb.updateInput(keymanweb.inputList[i]);
            keymanweb.inputList[i].style.visibility='visible';
            if(keymanweb.inputList[i].base.textContent.length > 0)
              keymanweb.inputList[i].base.style.visibility='hidden';
          }
          else
          {
            keymanweb.inputList[i].style.visibility='hidden';
            keymanweb.inputList[i].base.style.visibility='visible';
          }
        }        
      }
    }    
             
    /**
     * Create a simulated input element for each INPUT or TEXTAREA on the page, comprising:
     *    an outer DIV, matching the position, size and style of the base element
     *    a scrollable DIV within that outer element
     *    two SPAN elements within the scrollable DIV, to hold the text before and after the caret
     *    
     *    The left border of the second SPAN is flashed on and off as a visible caret                    
     */ 
                    
    // Superimpose custom input fields for each input or textarea, unless readonly or disabled
    for(var k=0; k<2; k++)
    {
      var ipList=document.getElementsByTagName(k==0?'INPUT':'TEXTAREA');  
      for(var n=0;n<ipList.length;n++) 
      { 
        if(ipList[n].kmwInput)
        {        
          var x=document.createElement('DIV'); 
          x['base']=x.base=ipList[n];
          
          // Set font for base element
          if(x.base.className) 
            x.base.className=x.base.className+' keymanweb-font';
          else
            x.base.className='keymanweb-font';
  
          // Add the exposed member 'kmw_ip' to allow page to refer to duplicated element
          ipList[n]['kmw_ip']=x;
          keymanweb.inputList.push(x);
        }
        // Always hide the OSK for non-mapped inputs
        else
        {
          ipList[n].addEventListener('touchstart',function()
            {
              keymanweb.focusing=false;
              clearTimeout(keymanweb.focusTimer);
              osk.hideNow();
            },false);
        }
      }
    }
 
    // Copy essential styles from each base element to the new DIV      
    var d,s1,s2,s3,bs,xs,ds,ss1,ss2,ss3,x1,y1;
    for(var n=0;n<keymanweb.inputList.length;n++)
    {
      var x=keymanweb.inputList[n];
      x.className='keymanweb-input';
      x.dir=x.base.dir;
      
      // Add a scrollable interior div 
      d=document.createElement('DIV'); 
      bs=window.getComputedStyle(x.base,null);
      xs=x.style;
      xs.overflow='hidden';
      xs.position='absolute';
      //xs.border='1px solid gray';
      xs.border='hidden';      // hide when element empty - KMW-3
      xs.border='none';
      xs.borderRadius='5px';

      // Add a scroll bar (horizontal for INPUT elements, vertical for TEXTAREA elements)
      var sb=document.createElement('DIV'), sbs=sb.style;
      sbs.position='absolute';
      sbs.height=sbs.width='4px';
      sbs.left=sbs.top='0';
      sbs.display='block';
      sbs.visibility='hidden';          
      sbs.backgroundColor='#808080';
      sbs.borderRadius='2px';
      
      // And add two spans for the text content before and after the caret, and a caret span
      s1=document.createElement('SPAN');
      s2=document.createElement('SPAN');
      s3=document.createElement('SPAN');      
      s1.innerHTML=s2.innerHTML=s3.innerHTML='';
      s1.className=s2.className=s3.className='keymanweb-font';
      d.appendChild(s1);d.appendChild(s3);d.appendChild(s2);
      x.appendChild(d); x.appendChild(sb);

      // Adjust input element properties so that it matches the base element as closely as possible
      ds=d.style; ds.position='absolute'; 

      ss1=s1.style;ss2=s2.style;ss3=s3.style;ss1.border=ss2.border='none';
      //ss1.backgroundColor='rgb(220,220,255)';ss2.backgroundColor='rgb(220,255,220)'; //only for testing 
      ss1.height=ss2.height='100%';          
      ss1.fontFamily=ss2.fontFamily=ds.fontFamily=bs.fontFamily;
 
      // Set vertical centering for input elements
      if(x.base.nodeName == 'INPUT')
      {
        if(!isNaN(parseInt(bs.height,10)))  
          ss1.lineHeight=ss2.lineHeight=bs.height;      
      }
      
      // The invisible caret-positioning span must have a border to ensure that 
      // it remains in the layout, but colour doesn't matter, as it is never visible.
      // Span margins are adjusted to compensate for the border and maintain text positioning.  
      ss3.border='1px solid red';  
      ss3.visibility='hidden';       
      ss3.marginLeft=ss3.marginRight='-1px';
      
      // Set the outer element padding *after* appending the element, 
      // otherwise Firefox misaligns the two elements
      xs.padding='8px';
      
      // Set internal padding to match the TEXTAREA and INPUT elements
      ds.padding='0px 2px'; // OK for iPad, possibly device-dependent
  
      if(device.OS == 'Android' && bs.backgroundColor == 'transparent')
        ds.backgroundColor='#fff';
      else  
        ds.backgroundColor=bs.backgroundColor;

      
      //if(bs.backgroundColor == 'transparent') ds.backgroundColor='#fff';
      //ds.backgroundColor='red';     //helpful for debugging

      // Set the tabindex to 0 to allow a DIV to accept focus and keyboard input 
      // c.f. http://www.w3.org/WAI/GL/WCAG20/WD-WCAG20-TECHS/SCR29.html
      x.tabIndex='0'; 

      // Disable (internal) pan and zoom on KMW input elements for IE10
      x.style.msTouchAction='none';

      // On touch event, reposition the text caret and prepare for OSK input
      // Removed 'onfocus=' as that resulted in handling the event twice (on iOS, anyway) 
      x.onmspointerdown=x.ontouchstart=keymanweb.setFocus;

      x.onmspointerup=x.ontouchend=function(e){e.stopPropagation();}
      
      // Disable internal scroll when input element in focus 
      x.onmspointermove=x.ontouchmove=keymanweb.dragInput;
      
      // Hide keyboard and caret when losing focus from simulated input field
      x.onblur=keymanweb.setBlur;
      
      // Note that touchend event propagates and is processed by body touchend handler
      // re-setting the first touch point for a drag

      if(x.base.nodeName == 'TEXTAREA')
        s1.style.whiteSpace=s2.style.whiteSpace='pre-wrap'; //scroll vertically
      else
        s1.style.whiteSpace=s2.style.whiteSpace='pre';      //scroll horizontally
      
      x.base.parentNode.appendChild(x);
     
      // Refresh style pointers, and match the field sizes
      keymanweb.updateInput(x);
      xs=x.style; 
      xs.color=bs.color; //xs.backgroundColor=bs.backgroundColor; 
      xs.fontFamily=bs.fontFamily; xs.fontSize=bs.fontSize;
      xs.fontWeight=bs.fontWeight; xs.textDecoration=bs.textDecoration;
      xs.padding=bs.padding; xs.margin=bs.margin; 
      xs.border=bs.border; xs.borderRadius=bs.borderRadius;
    
      //xs.color='red';  //use only for checking alignment
  
      // Prevent highlighting of underlying element (Android)
      if('webkitTapHighlightColor' in xs)
        xs.webkitTapHighlightColor='rgba(0,0,0,0)';
      
      if(x.base.nodeName == 'TEXTAREA')
      {
        // Correct rows value if defaulted and box height set by CSS
        // The rows value is used when setting the caret vertically
        if(x.base.rows == 2)  // 2 is default value
        {
          var h=parseInt(bs.height,10)-parseInt(bs.paddingTop,10)-parseInt(bs.paddingBottom,10),
            dh=parseInt(bs.fontSize,10),calcRows=Math.round(h/dh);
          if(calcRows > x.base.rows+1) x.base.rows=calcRows;
        }
        ds.width=xs.width; ds.minHeight=xs.height;
      }
      else
      {
        ds.minWidth=xs.width; ds.height=xs.height;
      }
      x.base.style.visibility='hidden'; // hide by default: KMW-3
      
      // Add an explicit event listener to allow the duplicated input element 
      // to be adjusted for any changes in base element location or size
      // This will be called for each element after any rotation, as well as after user-initiated changes
      // It has to be wrapped in an anonymous function to preserve scope and be applied to each element.
      (function(xx){xx.base.addEventListener('resize',function(e){keymanweb.updateInput(xx);},false);})(x);
        
      // And copy the text content
      keymanweb.setText(x,x.base.value,null);
    }  
  }
  
  /*********************************************************
   *  
   * End of main touch-device initialization.
   *     
   *********************************************************/
   
  /**
   * Function     setupDesktopPage
   * Scope        Private
   * Description  Save list of inputs for non-touch devices (desktop browsers)
   */       
  keymanweb.setupDesktopPage = function()
  { 
    for(var k=0; k<2; k++)
    {
      var ipList=document.getElementsByTagName(k==0?'INPUT':'TEXTAREA');
      for(var n=0;n<ipList.length;n++) 
      {      
        if(ipList[n].className.indexOf('kmw-disabled') < 0 && !ipList[n].readOnly )
          keymanweb.inputList.push(ipList[n]);
        if(ipList[n].className) 
          ipList[n].className=ipList[n].className+' keymanweb-font';
        else
          ipList[n].className='keymanweb-font';
      }
    }
    //TODO: sort list by y, x position on page
    
  }  

  /**
   * Get the user-specified (or default) font for the first mapped input or textarea element
   * before applying any keymanweb styles or classes
   * 
   *  @return   {string}
   **/                 
  keymanweb.getBaseFont = function()
  {
    var ipInput=document.getElementsByTagName('INPUT'),
        ipTextArea=document.getElementsByTagName('TEXTAREA'),
        n=0,fs,fsDefault='Arial,sans-serif';
    
    if(ipInput.length == 0 && ipTextArea.length == 0) n=0;
    else if(ipInput.length > 0 && ipTextArea.length == 0) n=1;
    else if(ipInput.length == 0 && ipTextArea.length > 0) n=2;    
    else if(ipInput[0].offsetTop < ipTextArea[0].offsetTop) n=1;    
    else if(ipInput[0].offsetTop > ipTextArea[0].offsetTop) n=2;
    else if(ipInput[0].offsetLeft < ipTextArea[0].offsetLeft) n=1;    
    else if(ipInput[0].offsetLeft > ipTextArea[0].offsetLeft) n=2;
    
    switch(n)
    {
      case 0:
        fs=fsDefault;
      case 1:     
        fs=util.getStyleValue(ipInput[0],'font-family');
      case 2:       
        fs=util.getStyleValue(ipTextArea[0],'font-family');
    }
    if(typeof(fs) == 'undefined' || fs == 'monospace') fs=fsDefault;
    
    return fs;
  }
 
  /**
   * Input element stub functions, redefined when a touch device is initialized
   */  
    
  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Event}         e     event
   */       
  keymanweb.setFocus = function(e){};
  keymanweb.timerID = null;
  
  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        e     element (object) or element id (string) of simulated input field
   * @return      {string}              entire text in simulated input field
   */       
  keymanweb.getText = function(e){return '';};
  
  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        e     element (object) or element id (string) of simulated input field
   * @param       {?string}       t     text to insert in element
   * @param       {?number}       cp    caret position (characters)     
   */       
  keymanweb.setText = function(e,t,cp){};
  
  /**
   * Function stub, for desktop browsers
   *    
   * @return      {string}   
   */       
  keymanweb.getTextBeforeCaret = function(){return '';};

  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        e     element (object) or element id (string) of simulated input field
   * @return      {string}              Context for simulated input field
   */       
  keymanweb.setTextBeforeCaret = function(e){};

  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        e     element (object) or element id (string) of simulated input field
   * @return      {number}              caret character position in simulated input field
   */       
  keymanweb.getTextCaret = function(e){return 0;};
  
  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        e     element (object) or element id (string) of simulated input field
   * @param       {number}        cp    caret character position in simulated input field
   */       
  keymanweb.setTextCaret = function(e,cp){};
  
  /**
   * Function stub, for desktop browser    
   */       
  keymanweb.hideCaret = function(){};
  
  /**
   * Function stub, for desktop browsers    
   */       
  keymanweb.flashCaret = function(){};

  /**
   * Function stub, for desktop browsers
   *    
   * @param       {Object}        x     element
   */       
  keymanweb.updateInput=function(x){};
 
  /**
   * Function stub, for desktop browsers
   * 
   *  @param  {boolean}   x   align or hide
   * 
   **/
  keymanweb.alignInputs = function(x){};
 
  // End of I3363 (Build 301) additions

  /**
   * Browser dependent initialization
   */       
  if(document.selection)          // only defined for IE
  {
    var appVer=navigator.appVersion;
   // Legacy support variables
    if(typeof(document.createEventObject)=='undefined'  &&  (appVer.indexOf('MSIE 5.0') >= 0 
      || appVer.indexOf('MSIE 4.0') >= 0 || appVer.indexOf('MSIE 3.0') >= 0)) keymanweb.legacy=1;
    else if(appVer.indexOf('MSIE 6.0') >= 0) keymanweb._IE = 6;
    else if(appVer.indexOf('MSIE 7.0') >= 0) keymanweb._IE = 7;
    else if(appVer.indexOf('MSIE 8.0') >= 0) keymanweb._IE = 8;
    if(keymanweb._IE && document.compatMode=='BackCompat') keymanweb._IE = 6;
  }

  // I732 START - Support for European underlying keyboards #1
  if(typeof(window['KeymanWeb_BaseLayout']) !== 'undefined') 
    osk._BaseLayout = window['KeymanWeb_BaseLayout'];
  else
    osk._BaseLayout = 'us';    
  
  
  keymanweb._BrowserIsSafari = (navigator.userAgent.indexOf('AppleWebKit') >= 0);  // I732 END - Support for European underlying keyboards #1 

  /**
   * Function     _GetEventObject
   * Scope        Private   
   * @param       {Event=}     e     Event object if passed by browser
   * @return                          Event object              
   * Description Gets the event object from the window when using Internet Explorer
   *             and handles getting the event correctly in frames 
   */     
  keymanweb._GetEventObject=function(e)   // I2404 - Attach to controls in IFRAMEs
  {
    if (!e)
    {
      e = window.event;
      if(!e)
      {
        e = keymanweb._GetLastActiveElement();
        if(e)
        {
          e = e.ownerDocument;
          if(e) e = e.parentWindow;
          if(!e) return null;
          e = e.event;
        }
      }
    }
    return e;    
  }

  /**
   * Function     _push
   * Scope        Private   
   * @param       {Array}     Parray    Array   
   * @param       {*}         Pval      Value to be pushed or appended to array   
   * @return      {Array}               Returns extended array
   * Description  Push (if possible) or append a value to an array 
   */  
  keymanweb._push = function(Parray, Pval)
  {
    if(Parray.push) Parray.push(Pval);
    else Parray=Parray.concat(Pval);
    return Parray;
  }

  /**
   * Function     _IsAttached
   * Scope        Private   
   * @param       {Object}  Pelem     Element to be tested
   * @return      {number}            Returns 1 if attached, else 0
   * Description  Tests whether or not KeymanWeb is attached to element 
   */  
  keymanweb._IsAttached = function(Pelem)
  {
    for(var i = 0; i < keymanweb._AttachedElements.length; i++)
      if(keymanweb._AttachedElements[i] == Pelem) return 1;
    return 0;
  }
  
  /**
   * Function     attachToControl
   * Scope        Public
   * @param       {Object}    Pelem       Element to which KMW will be attached
   * Description  Attaches KMW to control (or IFrame) 
   */  
  keymanweb['attachToControl'] = keymanweb.attachToControl = function(Pelem)
  {
    // Check that the element is neither readonly nor disabled for KeymanWeb
    var ro=Pelem.attributes['readonly'],cn=Pelem.className;
    if(typeof ro == 'object' && ro.value != 'false' ) return; 
    if(typeof cn == 'string' && cn.indexOf('kmw-disabled') >= 0) return; 
    
    if(Pelem.tagName.toLowerCase() == 'iframe') 
      keymanweb._AttachToIframe(Pelem);
    else
    {     
      util.attachDOMEvent(Pelem,'focus', keymanweb._ControlFocus);
      util.attachDOMEvent(Pelem,'blur', keymanweb._ControlBlur);
      Pelem.onkeypress = keymanweb._KeyPress;
      Pelem.onkeydown = keymanweb._KeyDown;
      Pelem.onkeyup = keymanweb._KeyUp;      
    }
    // I1596 - attach to controls dynamically
    if(!keymanweb._IsAttached(Pelem)) keymanweb._AttachedElements.push(Pelem);
  }
       
  /**
   * Function     _AttachToIframe
   * Scope        Private
   * @param       {Object}      Pelem       IFrame to which KMW will be attached
   * Description  Attaches KeymanWeb to IFrame 
   */  
  keymanweb._AttachToIframe = function(Pelem)
  {
    try
    {
      var Lelem=Pelem.contentWindow.document;
      /* editable Iframe */
      if(Lelem)
      {
        if(Lelem.parentWindow)
        {
          // Internet Explorer
          if(Lelem.designMode.toLowerCase() == 'on' || Lelem.body.isContentEditable)   // I1295 - fix non-attachment for some forms of IFRAMEs
          {
	          // I1480 - Attach to IFRAME instead of document
            util.attachDOMEvent(Pelem,'focus', keymanweb._ControlFocus);
            util.attachDOMEvent(Pelem,'blur', keymanweb._ControlBlur);
            util.attachDOMEvent(Lelem,'keydown', keymanweb._KeyDown);   // I2404 - Update for attaching to elements within IFRAMEs, don't attach to read-only IFRAMEs
            util.attachDOMEvent(Lelem,'keypress', keymanweb._KeyPress);
            util.attachDOMEvent(Lelem,'keyup', keymanweb._KeyUp);
            
            if(!keymanweb.legacy)
            { // I1481 - Attach to the selectionchange in the iframe (and do a selchange to get the new selection)
              /* IE: call _SelectionChange when the user changes the selection */
              util.attachDOMEvent(Lelem, 'selectionchange', keymanweb._SelectionChange);
              keymanweb._SelectionChange();
            }
          }
        }
        else
        {
          if(Lelem.designMode.toLowerCase() == 'on')
          {
            // Mozilla      // I2404 - Attach to  IFRAMEs child objects, only editable IFRAMEs here
            util.attachDOMEvent(Lelem,'focus', keymanweb._ControlFocus);
            util.attachDOMEvent(Lelem,'blur', keymanweb._ControlBlur);
            util.attachDOMEvent(Lelem,'keydown', keymanweb._KeyDown);
            util.attachDOMEvent(Lelem,'keypress', keymanweb._KeyPress);
            util.attachDOMEvent(Lelem,'keyup', keymanweb._KeyUp);
          }
          else
          {
            keymanweb._AttachToControls(Lelem);	   // I2404 - Manage IE events in IFRAMEs
          }
        }
      }
    }
    catch(err)
    {
      // do not attempt to attach to the iframe as it is from another domain - XSS denied!
    }  
  }
     
  /**
   * Function     GetEnabled
   * Scope        Private
   * @return      {boolean}      True if KMW enabled
   * Description Test if KMW enabled 
   */    
  keymanweb.GetEnabled = function()
  {
    return keymanweb._Enabled;
  }
  
  /**
   * Function     SetEnabled
   * Scope        Private
   * @param       {(boolean|number)}     Pvalue   True to enable KMW
   * Description  Enable or disable KMW
   */    
  keymanweb.SetEnabled = function(Pvalue)
  {
    if(Pvalue) Pvalue=1; else Pvalue=0;
    if(keymanweb._Enabled != Pvalue)
    {
      keymanweb._Enabled = Pvalue;
      if((!Pvalue) && keymanweb['HideInterface']) keymanweb['HideInterface'](); //JMD 3/9/10
    }
  }  
  
  /**
   * Function     DisableControl
   * Scope        Private
   * @param       {Object}      Pelem       Element to be disabled
   * Description  Disable KMW control element 
   */    
  keymanweb.DisableControl = function(Pelem)
  {
    var Ln, Lc;
    for(Ln=0; Ln<keymanweb._Controls.length; Ln++)  // I1511 - array prototype extended
      if(keymanweb._Controls[Ln].LControl == Pelem)
      {
        keymanweb._Controls[Ln].LEnabled = 0;
        return;
      }
    Lc = {LControl:Pelem, LEnabled:0, LDefaultInternalName:'-'};
    keymanweb._Controls=keymanweb._push(keymanweb._Controls,Lc);
  }

  /**
   * Function     EnableControl
   * Scope        Private
   * @param       {Object}    Pelem   Element to be enabled
   * Description  Enable KMW control element 
   */    
  keymanweb.EnableControl = function(Pelem)
  {
    var Ln, Lc;
    for(Ln=0; Ln<keymanweb._Controls.length; Ln++) // I1511 - array prototype extended
      if(keymanweb._Controls[Ln].LControl == Pelem)
      {
        keymanweb._Controls[Ln].LEnabled = 1;
        return;
      }
    Lc = {LControl:Pelem, LEnabled:1, LDefaultInternalName:'-'};
    keymanweb._Controls=keymanweb._push(keymanweb._Controls,Lc);
  }
  
  /**
   * Function     SetDefaultKeyboardForControl
   * Scope        Private   
   * @param       {Object}      Pelem    Control element 
   * @param       {string}      Pkbd     Keyboard   
   * Description  Set default keyboard for control 
   */    
  keymanweb.SetDefaultKeyboardForControl = function(Pelem, Pkbd)
  {
    var Ln, Lc;
    /* pass null for kbd to specify no default, or '' to specify English */
    for(Ln=0; Ln< keymanweb._Controls.length; Ln++) // I1511 - array prototype extended
      if(keymanweb._Controls[Ln].LControl == Pelem)
      {
        keymanweb._Controls[Ln].LDefaultInternalName = Pkbd;
        return;
      }
    Lc = {LControl:Pelem, LEnabled:1, LDefaultInternalName:Pkbd};
    keymanweb._Controls=keymanweb._push(keymanweb._Controls,Lc);
  }
    
  /**
   * Set focus to last active target element (browser-dependent)
   */    
  keymanweb['focusLastActiveElement'] = keymanweb._FocusLastActiveElement = function()
  {
    if(!keymanweb._LastActiveElement) return;

    keymanweb._JustActivatedKeymanWebUI = 1;
    if(keymanweb._IsMozillaEditableIframe(keymanweb._LastActiveElement,0))
      keymanweb._LastActiveElement.defaultView.focus(); // I3363 (Build 301)
    else if(keymanweb._LastActiveElement.focus) keymanweb._LastActiveElement.focus();
  }
   
  /**
   * Get the last active target element *before* KMW activated (I1297)
   * 
   * @return      {Object}        
   */    
  keymanweb['getLastActiveElement'] = keymanweb._GetLastActiveElement = function()
  {
    return keymanweb._LastActiveElement;
  }

  /**
   *  Set the active input element directly without setting focus (for embedded mobile apps)
   * 
   *  @param  {Object|string} e   element id or element
   **/
  keymanweb['setActiveElement']=keymanweb.setActiveElement=function(e)
  {
    if(typeof(e) == 'string') e=document.getElementById(e);
    keymanweb._ActiveElement=keymanweb._LastActiveElement=e; 
  }
  
  /**
   * Function     getUIState
   * Scope        Public   
   * @return      {Object.<string,(boolean|number)>}
   * Description  Return object with activation state of UI:
   *                activationPending (bool):   KMW being activated
   *                activated         (bool):   KMW active    
   */    
  keymanweb['getUIState'] = keymanweb.getUIState = function()
  {
    var p={};
    p['activationPending'] = p.activationPending = keymanweb._IsActivatingKeymanWebUI;
    p['activated'] = p.activated = keymanweb._JustActivatedKeymanWebUI;
    return p;
  }

  /**
   * Set or clear the IsActivatingKeymanWebUI flag (exposed function)
   * 
   * @param       {(boolean|number)}  state  Activate (true,false)
   */
  keymanweb['activatingUI'] = function(state)
  {
    keymanweb._IsActivatingKeymanWebUI = (state ? 1 : 0);
  }      

  /******** START VALIDATION CODE *********/
  //_ValidateDomain_data = _q;
  /******** END VALIDATION CODE ***********/


//TODO: add more complete description of what ControlFocus really does

  /**
   * Respond to KeymanWeb-aware input element receiving focus 
   * 
   * @param       {Event}       e       Event object
   * @return      {boolean}             always true  (?) 
   */    
  keymanweb._ControlFocus = function(e)
  {
    var Ltarg, Ln; 
    if(!keymanweb._Enabled) return true;
    e = keymanweb._GetEventObject(e);     // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    if (e.target) Ltarg = e.target;
    else if (e.srcElement) Ltarg = e.srcElement;
    else return true;
  
    // Prevent any action if a protected input field
    if(device.touchable && (Ltarg.className == null || Ltarg.className.indexOf('keymanweb-input') < 0)) return true;

    // Or if not a remappable input field
    var en=Ltarg.nodeName.toLowerCase();
    if(en == 'input')
    {
      var et=Ltarg.type.toLowerCase();
      if(!(et == 'text' || et == 'search')) return true;
    }
    else if(en != 'textarea') return true;

    keymanweb._ActiveElement=Ltarg;  // I3363 (Build 301)  

    if (Ltarg.nodeType == 3) // defeat Safari bug
      Ltarg = Ltarg.parentNode;
      
    var LfocusTarg = Ltarg;

    // Ensure that focussed element is visible above the keyboard
    if(device.touchable && (Ltarg.className == null || Ltarg.className.indexOf('keymanweb-input') < 0)) keymanweb.scrollBody(Ltarg);
         
    if(Ltarg.tagName=='IFRAME') //**TODO: check case reference
    {
      keymanweb._AttachToIframe(Ltarg);
      Ltarg=Ltarg.contentWindow.document;
    }
        
    //??keymanweb._Selection = null;
    keymanweb._ActiveControl = null;
    keymanweb._LastActiveElement = Ltarg;
    for(Ln=0; Ln < keymanweb._Controls.length; Ln++) // I1511 - array prototype extended
      if(keymanweb._Controls[Ln].LControl == Ltarg)
      {
        keymanweb._ActiveControl = keymanweb._Controls[Ln];
        break;
      }

    if(keymanweb._ActiveControl != null  &&  keymanweb._ActiveControl.LDefaultInternalName != null)
    {
      if(!keymanweb._JustActivatedKeymanWebUI)
      {
        keymanweb._SetActiveKeyboard(keymanweb._ActiveControl.LDefaultInternalName,'',true); 
      }
      else
        keymanweb._ActiveControl.LDefaultInternalName = keymanweb._ActiveKeyboard == null ? '' : keymanweb._ActiveKeyboard['KI'];
    }
    
    //TODO: the logic of the following line doesn't look right!!  Both variables are true, but that doesn't make sense!
    //_Debug(keymanweb._IsIEEditableIframe(Ltarg,1) + '...' +keymanweb._IsMozillaEditableIframe(Ltarg,1));
    if(!keymanweb._IsIEEditableIframe(Ltarg,1) || !keymanweb._IsMozillaEditableIframe(Ltarg,1))
    {
      keymanweb._DisableInput = 1; 
      return true;
    }
    keymanweb._DisableInput = 0;

    if(!keymanweb._JustActivatedKeymanWebUI)
    {
      keymanweb._DeadKeys = [];
      keymanweb._NotifyKeyboard(0,Ltarg,1);  // I2187
    }
   
    if(!keymanweb._JustActivatedKeymanWebUI  &&  keymanweb._SelectionControl != Ltarg)
      keymanweb._IsActivatingKeymanWebUI = 0;
    keymanweb._JustActivatedKeymanWebUI = 0;

    keymanweb._SelectionControl = Ltarg;
    Ltarg._KeymanWebSelectionStart = Ltarg._KeymanWebSelectionEnd = null; // I3363 (Build 301)

    // Set element directionality (but only if element is empty)
    keymanweb._SetTargDir(Ltarg); 

    //Execute external (UI) code needed on focus if required
    keymanweb.doControlFocused(LfocusTarg,keymanweb._ActiveControl);

    // Force display of OSK for touch input device, or if a CJK keyboard, to ensure visibility of pick list
    if(device.touchable)
    {
      osk._Enabled=1;
    }
    else
    {
      // Conditionally show the OSK when control receives the focus
      if(osk.ready)
      {
        if(keymanweb.isCJK()) osk._Enabled=1;
        if(osk._Enabled) osk._Show(); else osk._Hide(false);
      }
    }
    // TODO: This is possibly the main sequencing issue, as ControlFocus may get called before other elements
    // are ready, or keyboards downloaded.  Need some way to ensure that the OSK is displayed when everything is ready.
    
    
    // We have slightly different focus management on IE to other browsers.  This is because
    // IE has problems with loss of focus when clicking on another element.  This can probably
    // be resolved in the future by using MouseDown and MouseUp events instead of Click events
    // on the VK elements but for now we just use the smoother interaction on Firefox and Chrome,
    // and let IE do the focus dance.  This means some careful management of the
    // IsActivatingKeymanWebUI and LastActiveElement variables, so be careful with any changes
    // to these.
    //    if(keymanweb._IE) keymanweb._LastActiveElement = null; // I2498 - KeymanWeb OSK does not accept clicks in FF when using automatic UI
      
    return true;
  }                
  
  /**
   * Function     _IsIEEditableIframe
   * Scope        Private
   * @param       {Object}          Pelem         Iframe element
   *              {boolean|number}  PtestOn       1 to test if frame content is editable (TODO: unclear exactly what this is doing!)   
   * @return      {boolean}
   * Description  Test if element is an IE editable IFrame 
   */    
  keymanweb._IsIEEditableIframe = function(Pelem,PtestOn)
  {
    var Ldv, Lvalid = Pelem  &&  (Ldv=Pelem.tagName)  &&  Ldv.toLowerCase() == 'body'  &&  (Ldv=Pelem.ownerDocument)  &&  Ldv.parentWindow;
    return (!PtestOn  &&  Lvalid) || (PtestOn  &&  (!Lvalid || Pelem.isContentEditable));
  }

  /******** START VALIDATION CODE *********/
  //for(_ValidateDomain_i=0;_ValidateDomain_i<_ValidateDomain_str.length;_ValidateDomain_i++)
  //  _ValidateDomain_data = _ValidateDomain_table[(_ValidateDomain_data ^ _ValidateDomain_str.charCodeAt(_ValidateDomain_i)) & 0xff] ^ (_ValidateDomain_data >>> 8);
  /******** END VALIDATION CODE ***********/

  /**
   * Function     _IsMozillaEditableIframe
   * Scope        Private
   * @param       {Object}           Pelem    Iframe element
   * @param       {boolean|number}   PtestOn  1 to test if 'designMode' is 'ON'    
   * @return      {boolean} 
   * Description  Test if element is a Mozilla editable IFrame 
   */    
  keymanweb._IsMozillaEditableIframe = function(Pelem,PtestOn)
  {
    var Ldv, Lvalid = Pelem  &&  (Ldv=Pelem.defaultView)  &&  Ldv.frameElement;
    return (!PtestOn  &&  Lvalid) || (PtestOn  &&  (!Lvalid || Ldv.document.designMode.toLowerCase()=='on'));
  }
    
  /**
   * Respond to KMW losing focus on event
   * 
   * @param       {Event}       e       Event object
   * @return      {boolean}             Always true  (?) 
   */    
  keymanweb._ControlBlur = function(e)
  {
    var Ltarg;  

    if(!keymanweb._Enabled) return true;

    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    if (e.target) Ltarg = e.target;
    else if (e.srcElement) Ltarg = e.srcElement;
    else return true;

    keymanweb._ActiveElement = null; // I3363 (Build 301)

    // Hide the touch device input caret, if applicable  I3363 (Build 301)
    if(device.touchable) keymanweb.hideCaret();
        
    if (Ltarg.nodeType == 3) // defeat Safari bug
      Ltarg = Ltarg.parentNode;

    if(Ltarg.tagName=='IFRAME')
      Ltarg=Ltarg.contentWindow.document;
      
    if (Ltarg.setSelectionRange)
    {
      //Ltarg._KeymanWebSelectionStart = Ltarg.selectionStart;
      //Ltarg._KeymanWebSelectionEnd = Ltarg.selectionEnd;
      Ltarg._KeymanWebSelectionStart = Ltarg.value._kmwCodeUnitToCodePoint(Ltarg.selectionStart);  //I3319
      Ltarg._KeymanWebSelectionEnd = Ltarg.value._kmwCodeUnitToCodePoint(Ltarg.selectionEnd);  //I3319
      
    }
    
    ////keymanweb._SelectionControl = null;
    
    keymanweb._LastActiveElement = Ltarg;
    
    if(keymanweb._ActiveControl != null  &&  keymanweb._ActiveControl.LDefaultInternalName != null)
      if(keymanweb._ActiveKeyboard == null)
        keymanweb._ActiveControl.LDefaultInternalName = '';
      else
        keymanweb._ActiveControl.LDefaultInternalName = keymanweb._ActiveKeyboard['KI'];

    keymanweb._ActiveControl = null;
    
    if(!keymanweb._IsActivatingKeymanWebUI) keymanweb._NotifyKeyboard(0,Ltarg,0);  // I2187

    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs  //TODO: is this really needed again????
    keymanweb.doControlBlurred(Ltarg,e,keymanweb._IsActivatingKeymanWebUI);

    // Hide the OSK when the control is blurred, unless the UI is being temporarily selected
    if(osk.ready && !keymanweb._IsActivatingKeymanWebUI) osk._Hide(false);

    return true;
  }

  /****************************************************************
   *  
   * Provide for external processing on events
   *    
   ***************************************************************/     
   
  /**
   * Function     doControlBlurred
   * Scope        Private
   * @param       {Object}            _target       element losing focus
   * @param       {Event}             _event        event object
   * @param       {(boolean|number)}  _isActivating activation state
   * @return      {boolean}      
   * Description  Execute external (UI) code needed on blur
   */       
  keymanweb.doControlBlurred = function(_target,_event,_isActivating)
  {
    var p={}; p['target']=_target; p['event']=_event; p['isActivating']=_isActivating;
    return util.callEvent('kmw.controlblurred',p);
  }

  /**
   * Function     doControlFocused
   * Scope        Private
   * @param       {Object}            _target         element gaining focus
   * @param       {Object}            _activeControl  currently active control
   * @return      {boolean}   
   * Description  Execute external (UI) code needed on focus
   */       
  keymanweb.doControlFocused = function(_target,_activeControl)
  {
    var p={}; p['target']=_target; p['activeControl']=_activeControl;  
    return util.callEvent('kmw.controlfocused',p);
  }
  
  /**
   * Execute external (UI) code needed on registering keyboard
   *    
   * @param       {string}            _internalName
   * @param       {string}            _language
   * @param       {string}            _keyboardName
   * @param       {string}            _languageCode
   * @return      {boolean}   
   */       
  keymanweb.doKeyboardRegistered = function(_internalName,_language,_keyboardName,_languageCode)
  {
    // This must be called after registering each keyboard to be sure that a previously active keyboard is reloaded
    //var sk=keymanweb.getSavedKeyboard().split(':');
    //if(sk && sk.length == 2 && sk[0] == _internalName && sk[1] == _languageCode) keymanweb.restoreCurrentKeyboard();      
//TODO: reenable the above statment if really needed, but logically it should NOT be here    
    var p={}; p['internalName']=_internalName; p['language']=_language; p['keyboardName']=_keyboardName; p['languageCode']=_languageCode;
    return util.callEvent('kmw.keyboardregistered',p);
  }
  
  /**
   * Execute external (UI) code needed on laoding keyboard
   * 
   * @param       {string}            _internalName
   * @return      {boolean}   
   */       
  keymanweb.doKeyboardLoaded = function(_internalName)
  {
    var p={}; p['keyboardName']=_internalName; 
    return util.callEvent('kmw.keyboardloaded',p);
  }
    
  /**
   * Function     doBeforeKeyboardChange
   * Scope        Private
   * @param       {string}            _internalName
   * @param       {string}            _languageCode
   * @return      {boolean}   
   * Description  Execute external (UI) code needed before changing keyboard
   */       
  keymanweb.doBeforeKeyboardChange = function(_internalName,_languageCode)
  {
    var p={}; p['internalName']=_internalName; p['languageCode']=_languageCode;
    return util.callEvent('kmw.beforekeyboardchange',p);
  }

  /**
   * Execute external (UI) code needed *after* changing keyboard
   * 
   * @param       {string}            _internalName
   * @param       {string}            _languageCode
   * @param       {boolean=}           _indirect
   * @return      {boolean}   
   */       
  keymanweb.doKeyboardChange = function(_internalName,_languageCode,_indirect)
  {
    var p={}; p['internalName']=_internalName; p['languageCode']=_languageCode; 
    p['indirect']=(arguments.length > 2 ? _indirect : false);
    return util.callEvent('kmw.keyboardchange',p);
  }

  /**
   * Function     doUnloadOSK
   * Scope        Private
   * @return      {boolean}   
   * Description  Execute external (UI) code if any needed after unloading OSK (probably not required)
   */       
  keymanweb.doUnloadOSK = function()
  {
    var p={};
    return util.callEvent('kmw.unloadosk',p);
  }

  /**
   * Function     doLoadUI
   * Scope        Private
   * @return      {boolean}   
   * Description  Execute UI initialization code after loading the UI
   */       
  keymanweb.doLoadUI = function()
  {
    var p={};
    return util.callEvent('kmw.loaduserinterface',p);
  }

  /**
   * Function     doUnloadUI
   * Scope        Private
   * @return      {boolean}   
   * Description  Execute UI cleanup code before unloading the UI (may not be required?)
   */       
  keymanweb.doUnloadUI = function()
  {
    var p={};
    return util.callEvent('kmw.unloaduserinterface',p);
  }

  /******** START VALIDATION CODE *********/
  /*
  _v = _ValidateDomain_data;
  _ValidateDomain_m += _ValidateDomain_k;
  //UNENCRYPTED: _v=domainKey.indexOf((_v^0xffffffff))!=-1;
  for(_ValidateDomain_i = 0; _ValidateDomain_i < _ValidateDomain_m.length; _ValidateDomain_i++)
    _ValidateDomain_j += String.fromCharCode(_ValidateDomain_m.charCodeAt(_ValidateDomain_i) ^ 0x3c);
  */  
  /******** END VALIDATION CODE *********/


  /*****************************************************************************
   *  
   * Provide for handling the initial focus event differently
   * The first focus event can happen before we get the WindowLoad, 
   * e.g. if the page activates a control on WindowLoad itself,
   * so trap that and run it through to the page 
   * 
   *****************************************************************************/

  /**
   * Function     _BubbledFocus
   * Scope        Private
   * @param       {Event}       e         Event object
   * Description  Respond to KMW receiving bubbled focus on event (TODO: may not be needed, not currently doing anything) 
   */    
  keymanweb._BubbledFocus = function(e) { /*KeymanWeb._WindowLoad(e);*/ }
    
  if (window.addEventListener)
    window.addEventListener('focus', keymanweb._BubbledFocus, true);  

  /**
   * Function     _GetKeyEventProperties
   * Scope        Private
   * @param       {Event}       e       Event object
   * @return      {Object.<string,*>}   KMW keyboard event object: 
   * Description  Get object with target element, key code, shift state, virtual key state 
   *                Ltarg=target element
   *                Lcode=keyCode
   *                Lmodifiers=shiftState
   *                LisVirtualKeyCode e.g. ctrl/alt key
   *                LisVirtualKey     e.g. Virtual key or non-keypress event
   */    
  keymanweb._GetKeyEventProperties = function(e)
  {
    var s = new Object();
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return null;
    
    if(e.cancelBubble === true) return null; // I2457 - Facebook meta-event generation mess -- two events generated for a keydown in Facebook contentEditable divs
    
    if (e.target) s.Ltarg = e.target;
    else if (e.srcElement) s.Ltarg = e.srcElement;
    else return null;
    if (s.Ltarg.nodeType == 3) // defeat Safari bug
      s.Ltarg = s.Ltarg.parentNode;

    if (e.keyCode) s.Lcode = e.keyCode;
    else if (e.which) s.Lcode = e.which;    
    else return null;
    
    s.Lmodifiers = 
      (e.shiftKey ? 0x10 : 0) |
      (e.ctrlKey ? (e.ctrlLeft ? 0x20 : 0x20) : 0) | 
      (e.altKey ? (e.altLeft ? 0x40 : 0x40) : 0);  // I3363 (Build 301)
    
    //s.LisVirtualKey = (e.charCode != null  &&  (e.charCode == 0 || (s.Lmodifiers & 0x60) != 0)) || e.type != 'keypress';
    //s.LisVirtualKeyCode = false;
    s.LisVirtualKeyCode = (typeof e.charCode != 'undefined' && e.charCode != null  &&  (e.charCode == 0 || (s.Lmodifiers & 0x60) != 0));
    s.LisVirtualKey = s.LisVirtualKeyCode || e.type != 'keypress';
    
    return s;
  }

  /**
   * Function   _SelectionChange
   * Scope      Private
   * @return    {boolean} 
   * Description Respond to selection change event 
   */
  keymanweb._SelectionChange = function()
  {
    if(keymanweb._IgnoreNextSelChange)
    {
      keymanweb._IgnoreNextSelChange--;
    }
    else
    {
      var Ls=document.selection;
      if(Ls.type.toLowerCase()!='control') //  &&  document.selection.createRange().parentElement() == keymanweb._SelectionControl) //  &&  window.event.srcElement == keymanweb._SelectionControl)
      {
        var Lrange=Ls.createRange();
        if(!keymanweb._Selection || !keymanweb._Selection.isEqual(Lrange))
        {
          keymanweb._Selection = Lrange;

          /* Delete deadkeys for IE when certain keys pressed */
          keymanweb._DeadKeys = [];
        }
      }
    }
    return true;
  }
  
// TODO: find out if _FindCaret is still needed for current FireFox, delete if not

  /**
   * Function     _FindCaret
   * Scope        Private
   * @param       {Object}    Pelem    element
   * Description  Work around a problem with scrolling text boxes and input boxes in Firefox, not needed for other browsers
   */
  keymanweb._FindCaret = function(Pelem)     // I779
  {
    if(!Pelem.createTextRange && Pelem.selectionStart)
    {      
      var Levent=document.createEvent('KeyboardEvent');
      if(Levent.initKeyEvent)
      {
        Levent.initKeyEvent('keypress',true,true,null,false,false,false,false,0,32);
        var LkeyPress = keymanweb._KeyPress; 
        
        /**
         * Function     _KeyPress
         * Scope        Private
         * @param       {Event}     e     event         
         * Description  Temporarily disable keypress event handling  TODO: does this really work??? objects are passed by reference so should be OK
         */       
        keymanweb._KeyPress = function(e) {};
        Pelem.dispatchEvent(Levent);
        Levent=document.createEvent('KeyboardEvent');
        Levent.initKeyEvent('keypress',true,true,null,false,false,false,false,8,0);
        Pelem.dispatchEvent(Levent);
        keymanweb._KeyPress = LkeyPress;
      }
    }
  }
  
  /**
   * Function     _NotifyKeyboard
   * Scope        Private
   * @param       {number}    _PCommand     event code (16,17,18) or 0
   * @param       {Object}    _PTarget      target element
   * @param       {number}    _PData        1 or 0    
   * Description  Notifies keyboard of keystroke or other event
   */    
  keymanweb._NotifyKeyboard = function(_PCommand,_PTarget,_PData)  // I2187
  {
    if(keymanweb._ActiveKeyboard != null && typeof(keymanweb._ActiveKeyboard['KNS']) == 'function') keymanweb._ActiveKeyboard['KNS'](_PCommand,_PTarget,_PData);
  }
        
  /**
   * Function     _KeyDown
   * Scope        Private
   * @param       {Event}       e     event
   * @return      {boolean}           
   * Description  Processes keydown event and passes data to keyboard 
   */    
  keymanweb._KeyDown = function(e)
  {
    var Ldv,eClass=''; 

    keymanweb._KeyPressToSwallow = 0;
    if(!keymanweb._Enabled || keymanweb._DisableInput || keymanweb._ActiveKeyboard == null ||
      (keymanweb._ActiveControl != null  &&  !keymanweb._ActiveControl.LEnabled)) return true;

    // Prevent mapping element is readonly or tagged as kmw-disabled
    var el=util.eventTarget(e);
    if(device.touchable)
    {
      if(el && typeof el.kmwInput != 'undefined' && el.kmwInput == false) return true;
    }    
    else if(el && el.className.indexOf('kmw-disabled') >= 0) return true; 
    
    // Or if OSK not yet ready (for any reason)
    if(!osk.ready) return true;
    
    // Get event properties  
    var Levent = keymanweb._GetKeyEventProperties(e);
    if(Levent == null) return true;
    switch(Levent.Lcode)
    {
      case 8: 
        keymanweb._DeadKeys = []; 
        break; // I3318 (always clear deadkeys after backspace) 
      case 16: 
      case 17: 
      case 18: 
        keymanweb._NotifyKeyboard(Levent.Lcode,Levent.Ltarg,1); 
        return osk._UpdateVKShift(Levent, Levent.Lcode-15, 1); // I2187
    }
    
    // I1207
    if((Ldv=Levent.Ltarg.ownerDocument)  &&  (Ldv=Ldv.selection)  &&  (Levent.Lcode<33 || Levent.Lcode>40))
    {
      Ldv.createRange().select();
    }

    if(!window.event)
    {
      // I1466 - Convert the - keycode on mnemonic as well as positional layouts
      // FireFox, Mozilla Suite
      if(keymanweb._VKMap_FF_IE['k'+Levent.Lcode]) Levent.Lcode=keymanweb._VKMap_FF_IE['k'+Levent.Lcode];
    }
    //else 
    //{
    // Safari, IE, Opera?
    //}
    
    if(!keymanweb._ActiveKeyboard['KM'])
    {
      // Positional Layout

      var LeventMatched=0;
      /* 13/03/2007 MCD: Swedish: Start mapping of keystroke to US keyboard */
      var Lbase=keymanweb._VKMap[osk._BaseLayout];
      if(Lbase && Lbase['k'+Levent.Lcode]) Levent.Lcode=Lbase['k'+Levent.Lcode];
      /* 13/03/2007 MCD: Swedish: End mapping of keystroke to US keyboard */
      
      if(typeof(keymanweb._ActiveKeyboard['KM'])=='undefined'  &&  !(Levent.Lmodifiers & 0x60))
      {
        // Support version 1.0 KeymanWeb keyboards that do not define positional vs mnemonic
        var Levent2={Lcode:keymanweb._USKeyCodeToCharCode(Levent),Ltarg:Levent.Ltarg,Lmodifiers:0,LisVirtualKey:0};
        if(keymanweb.callKeyboardStartGroup(Levent2.Ltarg,Levent2)) LeventMatched=1;
      }
      
      LeventMatched = LeventMatched || keymanweb.callKeyboardStartGroup(Levent.Ltarg,Levent);
      
      // Support backspace in simulated input DIV from physical keyboard where not matched in rule  I3363 (Build 301)
      if(Levent.Lcode == 8 && !LeventMatched && Levent.Ltarg.className != null && Levent.Ltarg.className.indexOf('keymanweb-input') >= 0)
        keymanweb.KO(1,keymanweb._LastActiveElement,"");
    }
    else 
    {
      // Mnemonic layout
      if(Levent.Lcode == 8) // I1595 - Backspace for mnemonic
      {
        keymanweb._KeyPressToSwallow = 1;
        if(!keymanweb.callKeyboardStartGroup(Levent.Ltarg,Levent))
          keymanweb.KO(1,keymanweb._LastActiveElement,""); // I3363 (Build 301)
        return false;  //added 16/3/13 to fix double backspace on mnemonic layouts on desktop
      }
      else
        keymanweb._KeyPressToSwallow = 0;
    }

    if(!LeventMatched  &&  Levent.Lcode >= 96  &&  Levent.Lcode <= 111)
    {
      // Number pad, numlock on
//      _Debug('KeyPress NumPad code='+Levent.Lcode+'; Ltarg='+Levent.Ltarg.tagName+'; LisVirtualKey='+Levent.LisVirtualKey+'; _KeyPressToSwallow='+keymanweb._KeyPressToSwallow+'; keyCode='+(e?e.keyCode:'nothing'));

      if(Levent.Lcode < 106) var Lch = Levent.Lcode-48;
      else Lch = Levent.Lcode-64;
      keymanweb.KO(0, Levent.Ltarg, String._kmwFromCharCode(Lch)); //I3319

      LeventMatched = 1;
    }
   
    if(LeventMatched)
    {
      keymanweb._FindCaret(Levent.Ltarg); //I779
      if(e  &&  e.preventDefault) e.preventDefault();
      keymanweb._KeyPressToSwallow = (e?e.keyCode:0);
      return false;
    }
    else keymanweb._KeyPressToSwallow = 0;
    
    if(Levent.Lcode == 8)
    {
      /* Backspace - delete deadkeys, also special rule if desired? */
      // This is needed to prevent jumping to previous page, but why???  // I3363 (Build 301)
      if(Levent.Ltarg.className != null && Levent.Ltarg.className.indexOf('keymanweb-input') >= 0) return false;
    }
    return true;
  }                

  keymanweb.callKeyboardStartGroup = function(Ltarg, Levent) {
    keymanweb._CachedSelectionStart = null; // I3319
    keymanweb._DeadkeyResetMatched();       // I3318    
    keymanweb.cachedContext.reset();
    return keymanweb._ActiveKeyboard['gs'](Ltarg, Levent);
  }

  /******** START VALIDATION CODE *********/
  //eval(_ValidateDomain_j);
  /******** END VALIDATION CODE *********/
  
  /**
   * Function     _KeyPress
   * Scope        Private
   * @param       {Event}       e     event
   * @return      {boolean}           
   * Description Processes keypress event (does not pass data to keyboard)
   */       
  keymanweb._KeyPress = function(e)
  {
    var Levent;
    if(!keymanweb._Enabled || keymanweb._DisableInput || keymanweb._ActiveKeyboard == null ||
      (keymanweb._ActiveControl != null  &&  !keymanweb._ActiveControl.LEnabled)) return true;

    Levent = keymanweb._GetKeyEventProperties(e);
    if(Levent == null || Levent.LisVirtualKey) return true;

//    _Debug('KeyPress code='+Levent.Lcode+'; Ltarg='+Levent.Ltarg.tagName+'; LisVirtualKey='+Levent.LisVirtualKey+'; _KeyPressToSwallow='+keymanweb._KeyPressToSwallow+'; keyCode='+(e?e.keyCode:'nothing'));

    /* I732 START - 13/03/2007 MCD: Swedish: Start positional keyboard layout code: prevent keystroke */
    if(!keymanweb._ActiveKeyboard['KM'])
    {
      if(!keymanweb._KeyPressToSwallow) return true;
      if(Levent.Lcode < 0x20 || (keymanweb._BrowserIsSafari  &&  (Levent.Lcode > 0xF700  &&  Levent.Lcode < 0xF900))) return true;
      e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
      if(e) e.returnValue = false;
      return false;
    }
    /* I732 END - 13/03/2007 MCD: Swedish: End positional keyboard layout code */
    
    if(keymanweb._KeyPressToSwallow || keymanweb.callKeyboardStartGroup(Levent.Ltarg,Levent))
    {
      keymanweb._KeyPressToSwallow=0;
      if(e  &&  e.preventDefault) e.preventDefault();
      keymanweb._FindCaret(Levent.Ltarg);  // I779
      return false;
    }
    keymanweb._KeyPressToSwallow=0;
    return true;
  }

  /**
   * Function     _KeyUp
   * Scope        Private
   * @param       {Event}       e     event
   * @return      {boolean}           
   * Description Processes keyup event and passes event data to keyboard
   */       
  keymanweb._KeyUp = function(e)
  {
    var Levent = keymanweb._GetKeyEventProperties(e);
    if(Levent == null || !osk.ready) return true;

    switch(Levent.Lcode)
    {
      case 13:  
        if(Levent.Ltarg.nodeName == 'TEXTAREA') break;
      
        // For input fields, move to next input element
        if(Levent.Ltarg.type == 'search' || Levent.Ltarg.type == 'submit')
          Levent.Ltarg.form.submit();
        else
          keymanweb.moveToNext(false);
        return true;        
                
      case 16: 
      case 17: 
      case 18: keymanweb._NotifyKeyboard(Levent.Lcode,Levent.Ltarg,0); return osk._UpdateVKShift(Levent, Levent.Lcode-15, 1);  // I2187
    }
    
    // I736 start
    var Ldv;
    if((Ldv=Levent.Ltarg.ownerDocument)  &&  (Ldv=Ldv.selection)  &&  Ldv.type != 'control')   // I1479 - avoid createRange on controls
    {
      Ldv=Ldv.createRange();
      //if(Ldv.parentElement()==Levent.Ltarg) //I1505
      keymanweb._Selection = Ldv;
    }
    // I736 end
    
    //if(document.selection  &&  document.selection.type=='Text') keymanweb._Selection=document.selection.createRange();
    //if(!KeymanWeb._Enabled) return true;
    //if (!e) e = window.event;
    return false;
  }
  
//TODO: check return of _KeyUp - what happens if returning true or false ?? what if null returned?

  /**
  * Move focus to next (or previous) input or text area element on TAB
  *   Uses list of actual input elements
  *     
  *   Note that _ActiveElement on touch devices returns the DIV that overlays
  *   the input element, not the element itself.
  * 
  * @param      {number|boolean}  bBack     Direction to move (0 or 1)
  */
  keymanweb.moveToNext=function(bBack)
  {
    var i,t=keymanweb.sortedInputs,
      activeBase=keymanweb._ActiveElement;
    
    // For touchable devices, get the base element of the DIV
    if(device.touchable) activeBase=activeBase.base;

    // Identify the active element in the list of inputs ordered by position
    for(i=0; i<t.length; i++)
    {          
      if(t[i] == activeBase) break;
    }   
    
    // Find the next (or previous) element in the list
    if(bBack) i=i-1; else i=i+1; 
    if(i >= t.length) i=i-t.length;
    if(i < 0) i=i+t.length;

    // Move to the selected element
    if(device.touchable)
    {                     
      // Set focusing flag to prevent OSK disappearing 
      keymanweb.focusing=true;
      var target=t[i]['kmw_ip'];
      
      // Focus if next element is non-mapped
      if(typeof(target) == 'undefined')
      {
        t[i].focus();
      }
      
      // Or reposition the caret on the input DIV if mapped
      else  
      {
        keymanweb._ActiveElement=keymanweb._LastActiveElement=target;    
        keymanweb.setTextCaret(target,10000);                            
        keymanweb.scrollInput(target);                                   
      } 
    }
    // Behaviour for desktop browsers
    else
    {
      t[i].focus();
    }    
  }          

  /**
   * Move focus to user-specified element
   * 
   *  @param  {string|Object}   e   element or element id
   *           
   **/
  keymanweb['moveToElement'] = function(e)
  {
    var i;
    
    if(typeof(e) == 'string') e=document.getElementById(e);
    
    if(device.touchable && e['kmw_ip'])
      e['kmw_ip'].focus();
    else
      e.focus();
  }

  /**
   * Change active keyboard to keyboard selected by (internal) name and language code
   * 
   *  Test if selected keyboard already loaded, and simply update active stub if so.
   *  Otherwise, insert a script to download and insert the keyboard from the repository
   *  or user-indicated file location. 
   * 
   * @param       {string}    PInternalName
   * @param       {string}    PLgCode
   * @param       {boolean}   saveCookie   
   */    
  keymanweb._SetActiveKeyboard = function(PInternalName,PLgCode,saveCookie)
  {
    var n,Ln,lgCode;

    // Set default language code
    if(arguments.length < 2 || (!PLgCode)) lgCode='---'; else lgCode=PLgCode;

    // Check that the saved keyboard is currently registered
    for(n=0; n<keymanweb._KeyboardStubs.length; n++)
    {
      if(PInternalName == keymanweb._KeyboardStubs[n]['KI'])
      {
        if(lgCode == keymanweb._KeyboardStubs[n]['KLC'] || lgCode == '---') break;
      }
    }

    // Mobile device addition: force selection of the first keyboard if none set
    if(device.touchable && (PInternalName == '' || PInternalName == null || n >= keymanweb._KeyboardStubs.length))
    {
      PInternalName=keymanweb._KeyboardStubs[0]['KI']; lgCode=keymanweb._KeyboardStubs[0]['KLC'];   
    }

    // Save name of keyboard (with language code) as a cookie
    if(saveCookie) keymanweb.saveCurrentKeyboard(PInternalName,lgCode);

    // Check if requested keyboard and stub are currently active
    if(keymanweb._ActiveStub && keymanweb._ActiveKeyboard 
      && keymanweb._ActiveKeyboard['KI'] == PInternalName 
      && keymanweb._ActiveStub['KI'] == PInternalName     //this part of test should not be necessary, but keep anyway
      && keymanweb._ActiveStub['KLC'] == PLgCode
      && device.app == '') return;   

    // Check if current keyboard matches requested keyboard, but not stub
    if(keymanweb._ActiveKeyboard && (keymanweb._ActiveKeyboard['KI'] == PInternalName))
    {
      // If so, simply update the active stub
      for(Ln=0; Ln<keymanweb._KeyboardStubs.length; Ln++)
      {
        if((keymanweb._KeyboardStubs[Ln]['KI'] == PInternalName) && (keymanweb._KeyboardStubs[Ln]['KLC'] == PLgCode))
        {
          keymanweb._ActiveStub = keymanweb._KeyboardStubs[Ln]; 
          
          // Update the stylesheet if fonts specified by stub
           osk.appendStyleSheet();
          
          // OSK initialization is required here for KeymanTouch
          if(device.app != '') osk._Load();
          return;
        }
      }      
    } 
    keymanweb._ActiveKeyboard = null; keymanweb._ActiveStub = null;

    // Hide OSK and do not update keyboard list if using internal keyboard (desktops)
    if(PInternalName == '') 
    {
      osk._Hide(false); return;
    }

    for(Ln=0; Ln<keymanweb._Keyboards.length; Ln++)  // I1511 - array prototype extended
    {
      if(keymanweb._Keyboards[Ln]['KI'] == PInternalName)
      {
        keymanweb._ActiveKeyboard = keymanweb._Keyboards[Ln];
        keymanweb._SetTargDir(keymanweb._LastActiveElement);  // I2077 - LTR/RTL timing
      
        // and update the active stub
        for(var Ls=0; Ls<keymanweb._KeyboardStubs.length; Ls++)
        {
          if((keymanweb._KeyboardStubs[Ls]['KI'] == PInternalName) && (keymanweb._KeyboardStubs[Ls]['KLC'] == PLgCode))
          {
            keymanweb._ActiveStub = keymanweb._KeyboardStubs[Ls]; break;
          }
        }
        break;
      }
    }

    if(PLgCode == 'undefined' || PLgCode == '') PLgCode = '---';
    if(keymanweb._ActiveKeyboard == null)
    {
      for(Ln=0; Ln<keymanweb._KeyboardStubs.length; Ln++)  // I1511 - array prototype extended
      {   
        if((keymanweb._KeyboardStubs[Ln]['KI'] == PInternalName) 
          && ((keymanweb._KeyboardStubs[Ln]['KLC'] == PLgCode) || (PLgCode == '---')))
        {
          // Force OSK display for CJK keyboards (keyboards using a pick list)
          if(keymanweb.isCJK(keymanweb._KeyboardStubs[Ln]) || device.touchable) osk._Enabled = 1;

          // Create a script to load from the server - when it finishes loading, it will register itself, 
          //  detect that it is active, and focus as appropriate. The second test is needed to allow recovery from a failed script load
          if(keymanweb._LoadingInternalName == null || keymanweb._LoadingInternalName != PInternalName)
          { 
            // Always (temporarily) hide the OSK when loading a new keyboard, to ensure that a failure to load doesn't leave the current OSK displayed
            if(osk.ready) osk._Hide(false);
       
            keymanweb._LoadingInternalName = PInternalName;

            //Start a keyboard loading timer to allow fall back to the default if the keyboard cannot be found
            if(device.app != '')
              keymanweb.loadTimer=null;
            else
              keymanweb.loadTimer=window.setTimeout(function()
              {
                util.wait(false);
                var Ps=keymanweb._KeyboardStubs[Ln],kbdName=Ps['KN'],lgName=Ps['KL'];
                kbdName=kbdName.replace(/\s*keyboard\s*/i,'');
                util.alert('Sorry, the '+kbdName+' keyboard for '+lgName+' is not currently available!',keymanweb.setDfltKeyboard);
                return;
              },10000);  //TODO: Is 10 seconds enough?

            //Display the loading delay bar (Note: only append 'keyboard' if not included in name.) 
            //var wText='Installing '+keymanweb._KeyboardStubs[Ln]['KN'].replace(/\s*keyboard\s*/i,'')+' keyboard...';
            var wText='Installing keyboard<br/>'+keymanweb._KeyboardStubs[Ln]['KN'].replace(/\s*keyboard\s*/i,'');
            util.wait(wText);
            
            var Lscript = util._CreateElement('SCRIPT');
            Lscript.charset="UTF-8";        // KMEW-89
            var Lfilename = keymanweb._KeyboardStubs[Ln]['KF']; 
             
            // KeymanWeb 2 revised (buid 348) keyboard location specification:
            //  (a) absolute URL (includes ':') - load from specified URL
            //  (b) relative URL (starts with /, ./, ../) - load with respect to current page
            //  (c) filename only (anything else) - prepend keyboards option to URL 
            //      (e.g. default keyboards option will be set by Cloud)              
            if(device.app == '')
            {            
              var rx=RegExp('^(([\.]/)|([\.][\.]/)|(/))|(:)');   
              if(!rx.test(Lfilename))     
                  Lfilename=keymanweb.options['keyboards']+Lfilename;
            }

            // Always set local path for KeymanTouch
            else 
            {
              Lfilename=util.myPath()+'languages/'+Lfilename;
            }          
              
            Lscript.src = Lfilename;
            Lscript.type = 'text/javascript';
            try {
              document.body.appendChild(Lscript);
              }
            catch(ex) {
              document.getElementsByTagName('head')[0].appendChild(Lscript);
              }            
          }          
          keymanweb._ActiveStub = keymanweb._KeyboardStubs[Ln];
          return;
        }
      }
      keymanweb._SetTargDir(keymanweb._LastActiveElement);  // I2077 - LTR/RTL timing
    } 

    var Pk=keymanweb._ActiveKeyboard;  // I3319
    if(Pk !== null)  // I3363 (Build 301)
      String.kmwEnableSupplementaryPlane(Pk && ((Pk['KS'] && (Pk['KS'] == 1)) || (Pk['KN'] == 'Hieroglyphic'))); // I3319
    
    // Initialize the OSK (provided that the base code has been loaded)
    osk._Load();
  }

  /**
   * Set the default keyboard
  **/
  keymanweb.setDfltKeyboard=function()
  {
    keymanweb._SetActiveKeyboard('Keyboard_us','eng',true);
    keymanweb.doKeyboardChange('Keyboard_us','eng',true);
  }

  /**
   * Function    isCJK
   * Scope       Public
   * @param      {Object=}  k0 
   * @return     {boolean}
   * Description Tests if active keyboard (or optional argument) uses a pick list (Chinese, Japanese, Korean, etc.)
   *             (This function accepts either keyboard structure.)   
   */    
  keymanweb['isCJK'] = function(k0)
  { 
    var k=keymanweb._ActiveKeyboard, lg=''; 

    if(arguments.length > 0) k = k0; 
    
    if(k)
    {
      if(typeof(k['KLC']) != 'undefined') lg = k['KLC'];
      else if(typeof(k['LanguageCode']) != 'undefined') lg = k['LanguageCode'];
    }
    
    return ((lg == 'cmn') || (lg == 'jpn') || (lg == 'kor'));
  }
  keymanweb.isCJK = keymanweb['isCJK']; // I3363 (Build 301)
   
  /**
   * Allow to change active keyboard by (internal) keyboard name
   * 
   * @param       {string}    PInternalName   Internal name
   * @param       {string}    PLgCode         Language code
   */    
  keymanweb['setActiveKeyboard'] = function(PInternalName,PLgCode)
  {
    //TODO: This does not make sense: the callbacks should be in _SetActiveKeyboard, not here,
    //      since this is always called FROM the UI, which should not need notification.
    //      If UI callbacks are needed at all, they should be within _SetActiveKeyboard  
    keymanweb.doBeforeKeyboardChange(PInternalName,PLgCode);
    keymanweb._SetActiveKeyboard(PInternalName,PLgCode,true);    
    if(keymanweb._LastActiveElement != null) keymanweb._FocusLastActiveElement();
    keymanweb.doKeyboardChange(PInternalName,PLgCode);
  }
  
  /**
   * Function     getActiveKeyboard
   * Scope        Public
   * @return      {string}      Name of active keyboard
   * Description  Return internal name of currently active keyboard
   */    
  keymanweb['getActiveKeyboard'] = function()
  {
    if(keymanweb._ActiveKeyboard == null) return '';
    return keymanweb._ActiveKeyboard['KI'];
  }

  /**
   * Function    getActiveLanguage
   * Scope       Public
   * @return     {string}         language code
   * Description Return language code for currently selected language
   */    
  keymanweb['getActiveLanguage'] = function()
  {
    if(keymanweb._ActiveStub == null) return '';
    return keymanweb._ActiveStub['KLC'];
  }

//TODO: find all references to next three routines and disambiguate!!
  
  /**
   * Get keyboard meta data for the selected keyboard and language
   * 
   * @param       {string}    PInternalName     Internal name of keyboard
   * @param       {string=}   PlgCode           language code
   * @return      {Object}                      Details of named keyboard 
   *                                            
   **/    
  keymanweb['getKeyboard'] = function(PInternalName,PlgCode)
  {
    var Ln, Lrn;
    for(Ln=0; Ln<keymanweb._KeyboardStubs.length; Ln++)  
    {    
      Lrn = keymanweb._GetKeyboardDetail(keymanweb._KeyboardStubs[Ln]);
      if(Lrn['InternalName'] == PInternalName)
      { 
        if(arguments.length < 2) return Lrn;
        if(Lrn['LanguageCode'] == PlgCode) return Lrn;
      } 
    }
    return null;
  }

  /**
   * Function     GetKeyboardDetail
   * Scope        Private
   * @param       {string}    PInternalName     Internal name of keyboard
   * @return      {Object}                       Details of named keyboard 
   *                                            TODO: should it be Array or Object???
   * Description  Return keyboard details object
   */    
  keymanweb.GetKeyboardDetail = function(PInternalName)  // I2079 - GetKeyboardDetail function
  {
    var Lr=keymanweb['getKeyboards']();
    for(var Ln=0; Ln<Lr.length; Ln++)
      if(Lr[Ln]['InternalName'] == PInternalName) return Lr[Ln];
    return null;
  }
  
  /**
   * Get an associative array of keyboard identification strings
   *   This was defined as an array, so is kept that way, but  
   *   Javascript treats it as an object anyway 
   *    
   * @param       {Object}    Lkbd       Keyboard object
   * @return      {Array}                Copy of keyboard identification strings
   * 
   */    
  keymanweb._GetKeyboardDetail = function(Lkbd)   // I2078 - Full keyboard detail
  {
    var Lr=[];  
    Lr['Name'] = Lkbd['KN'];
    Lr['InternalName'] =  Lkbd['KI'];
    Lr['LanguageName'] = Lkbd['KL'];  // I1300 - Add support for language names
    Lr['LanguageCode'] = Lkbd['KLC']; // I1702 - Add support for language codes, region names, region codes, country names and country codes
    Lr['RegionName'] = Lkbd['KR'];
    Lr['RegionCode'] = Lkbd['KRC'];
    Lr['CountryName'] = Lkbd['KC'];
    Lr['CountryCode'] = Lkbd['KCC'];
    Lr['KeyboardID'] = Lkbd['KD'];
    Lr['Font'] = Lkbd['KFont'];
    Lr['OskFont'] = Lkbd['KOskFont'];
    return Lr;
  }
  
  /**
   * Get array of available keyboard stubs 
   * 
   * @return   {Array}     Array of available keyboards
   * 
   */    
  keymanweb['getKeyboards'] = function()
  {
    var Lr = [], Ln, Lstub, Lrn;

    for(Ln=0; Ln<keymanweb._KeyboardStubs.length; Ln++)  // I1511 - array prototype extended
    {    
      Lstub = keymanweb._KeyboardStubs[Ln];
      Lrn = keymanweb._GetKeyboardDetail(Lstub);  // I2078 - Full keyboard detail
      Lr=keymanweb._push(Lr,Lrn);
    } 
    return Lr;
  }
   
  /**
   * Function     _WindowUnload
   * Scope        Private
   * Description  Remove handlers before detaching KMW window  
   */    
  keymanweb._WindowUnload = function()
  {
    var Ln, Leh;
    for(Ln=0; Ln<keymanweb._EventHandlers.length; Ln++)
    {
      Leh=keymanweb._EventHandlers[Ln];
      try {
        if(Leh.Lelem.detachEvent) Leh.Lelem.detachEvent('on'+Leh.Lname, Leh.Lhandler);      
        else Leh.Lelem.removeEventListener(Leh.Lname, Leh.Lhandler, Leh.LuseCapture);
        
        if(Leh.Lhandler == keymanweb._ControlFocus)
          /* Detach the events for managed controls */
          Leh.Lelem.onkeypress = Leh.Lelem.onkeydown = Leh.Lelem.onkeyup = null;
      } catch(err) { /* IFRAME XSS access-denied avoidance */ }
      Leh.Lelem = 0;
    }
    
    // Allow the UI to release its own resources
    keymanweb.doUnloadUI();
    
    // Allow the OSK to release its own resources
    if(osk.ready) osk._Unload(); // I3363 (Build 301)
    
    keymanweb._EventHandlers = keymanweb._LastActiveElement = 0;
  }
  
    // Complete page initialization only after the page is fully loaded, including any embedded fonts
  // This avoids the need to use a timer to test for the fonts
  
  util.attachDOMEvent(window, 'load',function(e){
    //keymanweb.completeInitialization();
    // Always return to top of page after a page reload
    document.body.scrollTop=0;
    if(typeof document.documentElement != 'undefined') document.documentElement.scrollTop=0;
    },false);
  
  // Attach this handler to window unload event  
  util.attachDOMEvent(window, 'unload', keymanweb._WindowUnload,false);  // added fourth argument (default value)
              
  /**
   * Function     _AttachToControls
   * Scope        Private
   * Parameters   {Object}    Pelem    element  
   * Description  Attach KMW to editable controls
   */    
  keymanweb._AttachToControls = function(Pelem)    // I1961
  {
    /**
     * Function     LiTmp
     * Scope        Private
     * @param       {string}    _colon    type of element
     * @return      {Array}               array of elements of specified type                       
     * Description  Local function to get list of editable controls
     */    
    var LiTmp = function(_colon){return Pelem.getElementsByTagName(_colon);};
    
    var Linputs = LiTmp('INPUT'), 
      Ltextareas = LiTmp('TEXTAREA'), 
      Lframes = LiTmp('IFRAME'),
      Lce = document.evaluate ? document.evaluate('//*[@contenteditable and @contenteditable != "false"]', document, null, XPathResult.ANY_TYPE, null) : null;	// I2457 - support contentEditable elements in mozilla, webkit

    for(var Li = 0; Li < Linputs.length; Li++)
      if(Linputs[Li].type.toLowerCase() == 'text') keymanweb.attachToControl(Linputs[Li]);        
    
    for(Li = 0; Li < Ltextareas.length; Li++)
      keymanweb.attachToControl(Ltextareas[Li]);
    
    for(Li = 0; Li < Lframes.length; Li++)
      try {
        if(Lframes[Li].contentWindow.document)
          keymanweb._AttachToIframe(Lframes[Li]);
      }
      catch(err) { /* Do not attempt to access iframes outside this site */ }
      
    if(Lce)  // I2457 - support contentEditable elements in mozilla, webkit
    {
      for (var Lc = Lce.iterateNext(); Lc; Lc = Lce.iterateNext())
      {
        keymanweb.attachToControl(Lc);
      }
    }

    // Attach keymanweb-input DIV elements  I3363 (Build 301)
    for(Li = 0; Li<keymanweb.inputList.length; Li++)
    {
      keymanweb.attachToControl(keymanweb.inputList[Li]);
    }
  }
  
  /***** START VALIDATION CODE *****/
  /*
  var _ValidateDomain_polynomial=0xedb88320;
  var _ValidateDomain_i, _ValidateDomain_j = '', _ValidateDomain_k, _ValidateDomain_l, _ValidateDomain_table = [], _ValidateDomain_m;

  //UNENCRYPTED: tavultesoft.keymanweb["_v"]=document.location.hostname;tavultesoft.keymanweb["_q"]=0xc134b453;
  _ValidateDomain_k = unescape('H%5DJIPHYOSZH%12WYEQ%5DRKY%5Eg%1EcJ%1Ea%01XS_IQYRH%12PS_%5DHUSR%12TSOHR%5DQY%07H%5DJIPHYOSZH%12WYEQ%5DRKY%5Eg%1EcM%1Ea%01%0CD_%0D%0F%08%5E%08%09%0F%07');
  for(_ValidateDomain_i = 0; _ValidateDomain_i < _ValidateDomain_k.length; _ValidateDomain_i++)
    _ValidateDomain_j += String.fromCharCode(_ValidateDomain_k.charCodeAt(_ValidateDomain_i) ^ 0x3c);
  var _ValidateDomain_data;

  eval(_ValidateDomain_j);

  var _ValidateDomain_str = keymanweb["_v"];
  for(_ValidateDomain_i=0;_ValidateDomain_i<256;_ValidateDomain_i++)
  {
    for(_ValidateDomain_k=0,_ValidateDomain_j=_ValidateDomain_i;_ValidateDomain_k<8;_ValidateDomain_k++)
    {
      _ValidateDomain_l = ((_ValidateDomain_j & 0xfffffffe) / 2) & 0x7fffffff;
      _ValidateDomain_j = (_ValidateDomain_j & 1) ? _ValidateDomain_l ^ _ValidateDomain_polynomial : _ValidateDomain_l;
    }
    _ValidateDomain_table[_ValidateDomain_i] = _ValidateDomain_j;
  }
  _ValidateDomain_j = '';
  
  //UNENCRYPTED: tavultesoft.keymanweb["_v"]=typeof(KeymanWeb_Key)=="string"&&KeymanWeb_Key.indexOf((tavultesoft.keymanweb["_v"]^0xffffffff^0))!=-1;
  _ValidateDomain_k = unescape('H%5DJIPHYOSZH%12WYEQ%5DRKY%5Eg%1EcJ%1Ea%01HELYSZ%14wYEQ%5DRkY%5EcwYE%15%01%01%1EOHNUR%5B%1E%1A%1AwYEQ%5DRkY%5EcwYE%12URXYDsZ%14%14H%5DJIPHYOSZH%12WYEQ%5DRKY%5Eg%1EcJ%1Eab%0CDZZZZZZZZ%15%15%1D%01%11%0D%07');
  
  // Use the following code for standalone KeymanWeb
  _ValidateDomain_m = ''; 
  
  // Use the following code for subscription KeymanWeb
  _ValidateDomain_m = unescape('cJ%5D%01RYK%1Cx%5DHY%14%15%07cJ%5D%01q%5DHT%12NSIRX%14%14cJ%5D%12%5BYHih%7Fx%5DHY%14%15%17%14cJ%5D%12%5BYHih%7FqSRHT%14%15%00%00%09%15%15%13%09%15%19%04%0E%07');
  
  _ValidateDomain_data = keymanweb["_q"];

  for(_ValidateDomain_i=0;_ValidateDomain_i<_ValidateDomain_str.length;_ValidateDomain_i++)
    _ValidateDomain_data = _ValidateDomain_table[(_ValidateDomain_data ^ _ValidateDomain_str.charCodeAt(_ValidateDomain_i)) & 0xff] ^ (_ValidateDomain_data >>> 8);

  keymanweb["_v"] = _ValidateDomain_data;
  _ValidateDomain_m += _ValidateDomain_k;

  for(_ValidateDomain_i = 0; _ValidateDomain_i < _ValidateDomain_m.length; _ValidateDomain_i++)
    _ValidateDomain_j += String.fromCharCode(_ValidateDomain_m.charCodeAt(_ValidateDomain_i) ^ 0x3c);
    
  keymanweb["_w"] = _ValidateDomain_j;
  */
  /******** END VALIDATION CODE *********/

  /**
   * Determine host of keymanweb component 
   *    
   * This is best done during load, since the active script will then always be the  
   * last script loaded.  Otherwise the script must be identified by name.
 */  
  var scripts=document.getElementsByTagName('script');
  keymanweb.srcPath=scripts[scripts.length-1].src;    
     
  /**
   * Function     Initialization
   * Scope        Public
   * @param       {Object}  arg     object array of user-defined properties
   * Description  KMW window initialization  
   */    
  keymanweb['init'] = keymanweb.init = function(arg) 
  {     
    // Only initialize options the first time init is called   
    if(typeof(keymanweb.options['resources']) == 'undefined') 
    {
      var root='',fontSource='',resources='',keyboards='';
           
      // Get values of global variables, if defined, e.g. for subscribers
      if(typeof(window['KeymanWeb_Root']) == 'string') root=window['KeymanWeb_Root'];
      if(typeof(window['KeymanWeb_Resources']) == 'string') resources=window['KeymanWeb_Resources'];
      if(typeof(window['KeymanWeb_Keyboards']) == 'string') keyboards=window['KeymanWeb_Keyboards'];
      if(typeof(window['KeymanWeb_FontUriBasePath']) == 'string') fontSource=window['KeymanWeb_FontUriBasePath'];
   
      var opt={};
      opt['root']=root;
      opt['resources']=resources;
      opt['keyboards']=keyboards;
      opt['fonts'] = fontSource;      

      opt['key'] = '';
      opt['attachType'] = (device.touchable ? 'manual' : 'auto');
      opt['controlDownColor'] = '#e0e0e0';
      opt['keyDownColor'] = '#c0c0ff';
      opt['keyHoverColor'] = '#e0e0ff';  
      opt['unmappedKeyboardName'] = 'English';
      opt['defaultKeyboardHelp'] = 'Please wait while keyboard loads...';
      opt['ui'] = (device.touchable ? 'none' : '');
      opt['app'] = '';      //provide for KeymanWeb embedding in mobile apps      
 
      keymanweb.options = opt;    
    }
    else
    {
      var opt=keymanweb.options;
    }
    
    // Update the option if required by a subsequent call
    if(arguments.length > 0 && typeof(arg)=='object' && arg != null)
    { 
      for(var p in opt)
      { 
        if(arg.hasOwnProperty(p)) opt[p] = arg[p];
      }
    }

    // Use root-relative paths for resources and keyboards if not set by page source
    if(opt['root'] == '') opt['root']=util.myPath();
    if(opt['resources'] == '') opt['resources']=opt['root']+'engine/'+keymanweb['build']+'/';
    if(opt['keyboards'] == '') opt['keyboards']=opt['root']+'kbd/';
    if(opt['fonts'] == '') opt['fonts']=opt['root']+'font/';
    
    // Ensure that resources, keyboards and fonts path options are either empty strings, or are terminated by slash
    opt['resources']=util.fixPath(opt['resources']);
    opt['keyboards']=util.fixPath(opt['keyboards']);
    opt['fonts']=util.fixPath(opt['fonts']);    
    
    // Special initialization for KeymanTouch
    if(opt['app'] != '')
    {
      device.touchable=true; device.formFactor='phone'; device.app=opt['app'];
      keymanweb.options['attachType'] = opt['attachType'] = 'manual';
      if(navigator && navigator.userAgent && navigator.userAgent.indexOf('iPad') >= 0) device.formFactor='tablet';
      if(device.app.indexOf('Mobile') >= 0) device.formFactor='phone';
      if(device.app.indexOf('Tablet') >= 0) device.formFactor='tablet';
      device.browser='native';
    }
 
    // Initialize external legacy variables (key is needed for validation code)
    //window['KeymanWeb_Root'] = opt['root']; 
    window['KeymanWeb_AttachType'] = opt['attachType']; 
    window['KeymanWeb_ControlDownColor'] = opt['controlDownColor']; 
    window['KeymanWeb_KeyDownColor'] = opt['keyDownColor']; 
    window['KeymanWeb_KeyHoverColor'] = opt['keyHoverColor']; 
    window['KeymanWeb_DefaultKeyboardName'] = opt['defaultKeyboardName']; 
    window['KeymanWeb_DefaultKeyboardHelp'] = opt['defaultKeyboardHelp'];
    window['KeymanWeb_Key'] = opt['key']; 
    
    // Only do remainder of initialization once!  
    if(keymanweb['initialized']) return;

    // Do not initialize until the document has been fully loaded
    if(document.readyState !== 'complete')
    {
      window.setTimeout(function(){keymanweb.init(arg);},50);
      return;
    }

    keymanweb._MasterDocument = window.document;

    // Test for keyboard and language cookie, returning default (US English) if cookie is not set
    var d=keymanweb.getSavedKeyboard();
    
    // Initialize and protect input elements for touch-screen devices (but never for apps)
    // NB: now set disabled=true rather than readonly, since readonly does not always 
    // prevent element from getting focus, e.g. within a LABEL element.
    // c.f. http://kreotekdev.wordpress.com/2007/11/08/disabled-vs-readonly-form-fields/ 
    if(device.touchable)
    { 
      var i,eTextArea,eInput;
      eTextArea=document.getElementsByTagName("textarea");
      eInput=document.getElementsByTagName("input");
      for(i=0; i<eTextArea.length; i++) 
      {
        var e=eTextArea[i],c=e.className;
        e.kmwInput=false;
        if((!c || c.indexOf('kmw-disabled') < 0) && !e.readOnly)  
        { 
          e.disabled=true; e.kmwInput=true; 
        }
      }
      for(i=0; i<eInput.length; i++) 
      {
        var e=eInput[i],c=e.className;
        e.kmwInput=false;                
        if((!c || c.indexOf('kmw-disabled') < 0) && !e.readOnly)
        {
          if(e.type == 'text' || e.type == 'search') 
          {
            e.disabled=true; e.kmwInput=true;       
          } 
        }
      }      
    }
    /**
     * Initialization of touch devices and browser interfaces must be done 
     * after all resources are loaded, during final stage of initialization
     *      
     * if(device.touchable) keymanweb.setupTouchDevice(); else keymanweb.setupDesktopPage();
     *      
     */            
    
    // Treat Android devices as phones if either (reported) screen dimension is less than 4" 
    if(device.OS == 'Android')
    {
      // Determine actual device characteristics  I3363 (Build 301)
      device.dpi = util.getDPI(); //TODO: this will not work when called from HEAD!!
      device.formFactor=((screen.height < 4.0*device.dpi) || (screen.width < 4.0*device.dpi)) ? 'phone' : 'tablet';
    }

    // Special initialization for embedded KeymanWeb
 
    /**
     * Function     noShow (stub only)
     * Scope        Private
     * @param       {number=} Px  x-coordinate for OSK rectangle
     * @param       {number=} Py  y-coordinate for OSK rectangle 
     * Description  Local function stub to disable OSK display
     */       
    osk.noShow = function(Px,Py){};  
    
    /******** APPLY VALIDATION *********/
    /*    
    // Test the validity of the license key passed by keymanweb.init
    //eval(keymanweb["_w"]);  // is key is valid for the domain? 

    //Disable mapping and OSK display if invalid
    if(!keymanweb["_v"]) 
    {
      keymanweb._KeyDown = keymanweb._KeyUp; 
      keymanweb._KeyPress = keymanweb._KeyUp;
      osk._Show = osk.noShow;
    }
    */
    /******** END VALIDATION CODE *********/

    if (window.removeEventListener)
      window.removeEventListener('focus', keymanweb._BubbledFocus, true);
  
    if(keymanweb.options['attachType'] != 'manual')
      keymanweb._AttachToControls(document);  // I1961

    // Set exposed initialization flag member for UI (and other) code to use 
    keymanweb['initialized'] = 1;
 
    // Test if UI script already installed, install compiled version specified in initialization options if not
    if(!device.touchable) keymanweb.loadUI();
    
    // Finish keymanweb and OSK initialization once all necessary resources are available
    osk.prepare();
   
    // Register deferred keyboard stubs
    var j;
    for(j=0; j<keymanweb.deferredKRS.length; j++)
      keymanweb.KRS(keymanweb.deferredKRS[j]);
   
    // Initialize the desktop UI
    keymanweb.initializeUI()
  
    // Create and save the keyboard loading delay indicator
    util.prepareWait();
  
    // Register deferred keyboards 
    for(j=0; j<keymanweb.deferredKR.length; j++)
      keymanweb.KR(keymanweb.deferredKR[j]);
  
    // Exit initialization here if KMW is embedded in a mobile app
    if(keymanweb.options['app'] != '') return;

    // Determine the default font for mapped elements
    keymanweb.appliedFont=keymanweb.baseFont=keymanweb.getBaseFont();

    // Create an ordered list of all input and textarea fields
    keymanweb.listInputs();
    
    // Initialize touch-screen device interface  I3363 (Build 301)
    if(device.touchable) 
      keymanweb.setupTouchDevice();

    // Initialize desktop browser interface
    else 
      keymanweb.setupDesktopPage();
   
    // Initialize the OSK and set default OSK styles
    // Note that this should *never* be called before the OSK has been initialized.
    // However, it possibly may be called before the OSK has been fully defined with the current keyboard, need to check.    
    //osk._Load(); 
    
    
    // I1476 - Handle SELECT overlapping BEGIN   TODO: Move this to float UI code ??
    if(util._GetIEVersion() == 6) osk.shim = util['createShim']();  // I3363 (Build 301)
    // I1476 - Handle SELECT overlapping END
    
    //document.body.appendChild(osk._Box); 

    //osk._Load(false);
    
    // I3363 (Build 301)
    if(device.touchable)
    {
      // Handle OSK touchend events (prevent propagation)
      osk._Box.ontouchend=function(e){e.stopPropagation();}

      // Add a blank DIV to the bottom of the page to allow the bottom of the page to be shown
      var dTrailer=document.createElement('DIV'),ds=dTrailer.style;
      ds.width='100%';ds.height=(screen.width/2)+'px';
      document.body.appendChild(dTrailer);  
      
      // On Chrome, scrolling up or down causes the URL bar to be shown or hidden 
      // according to whether or not the document is at the top of the screen.
      // But when doing that, each OSK row top and height gets modified by Chrome
      // looking very ugly.  Itwould be best to hide the OSK then show it again 
      // when the user scroll finishes, but Chrome has no way to reliably report
      // the touch end event after a move. c.f. http://code.google.com/p/chromium/issues/detail?id=152913
      // The best compromise behaviour is simply to hide the OSK whenever any 
      // non-input and non-OSK element is touched.
      if(device.OS == 'Android' && navigator.userAgent.indexOf('Chrome') > 0)
      {
        keymanweb.hideOskWhileScrolling=function(e)
        {           
          if(typeof(osk._Box) == 'undefined') return;
          if(typeof(osk._Box.style) == 'undefined') return;

          // The following tests are needed to prevent the OSK from being hidden during normal input!
          var p=e.target.parentNode;
          if(typeof(p) != 'undefined' && p != null)
          {
            if(p.className.indexOf('keymanweb-input') >= 0) return; 
            if(p.className.indexOf('kmw-key-') >= 0) return; 
            if(typeof(p.parentNode) != 'undefined')
            {
              p=p.parentNode;
              if(p.className.indexOf('keymanweb-input') >= 0) return; 
              if(p.className.indexOf('kmw-key-') >= 0) return; 
            }
          }          
          osk.hideNow(); 
        }        
        document.body.addEventListener('touchstart',keymanweb.hideOskWhileScrolling,false);
      } 
    } 

    if(osk.shim) 
      document.body.appendChild(osk.shim);  // I1476 - Handle SELECT overlapping
    //document.body.appendChild(keymanweb._StyleBlock);

    // IE: call _SelectionChange when the user changes the selection 
    if(document.selection  &&  !keymanweb.legacy)
      util.attachDOMEvent(document, 'selectionchange', keymanweb._SelectionChange);
       
    // Add event listeners and attach manually-positioned KMW objects
    if(keymanweb.options['attachType'] != 'manual')  // I1961
    {
      if(document.attachEvent)
        document.attachEvent('onfocusin', keymanweb._IEFocusIn);
      else if(document.addEventListener)
        document.addEventListener('DOMNodeInserted', keymanweb._DOMNodeInserted, true);
    }
   
    // Restore and reload the currently selected keyboard 
    keymanweb.restoreCurrentKeyboard(); 

    // Set exposed initialization flag to 2 to indicate deferred initialization also complete
    keymanweb['initialized']=2;
  }  

  // Create an ordered list of all text and search input elements and textarea elements
  // except any tagged with class 'kmw-disabled'
  // TODO: email and url types should perhaps use default keyboard only
  keymanweb.listInputs = function()
  {
    var i,eList=[],
      t1=document.getElementsByTagName('INPUT'),
      t2=document.getElementsByTagName('TEXTAREA');

    for(i=0; i<t1.length; i++)
    { 
      switch(t1[i].type)
      {
        case 'text':
        case 'search':
        case 'email':
        case 'url':
          if(t1[i].className.indexOf('kmw-disabled') < 0)
            eList.push({ip:t1[i],x:util._GetAbsoluteX(t1[i]),y:util._GetAbsoluteY(t1[i])});
          break;    
      }
    }
    for(i=0; i<t2.length; i++)
    { 
      if(t2[i].className.indexOf('kmw-disabled') < 0)
        eList.push({ip:t2[i],x:util._GetAbsoluteX(t2[i]),y:util._GetAbsoluteY(t2[i])});
    }
    
    /**
     * Local function to sort by screen position
     * 
     * @param       {Object}     e1     first object
     * @param       {Object}     e2     second object
     * @return      {number}            y-difference between object positions, or x-difference if y values the same
     */       
    var xySort=function(e1,e2)
    {
      if(e1.y != e2.y) return e1.y-e2.y;
      return e1.x-e2.x;    
    }
    
    // Sort elements by Y then X
    eList.sort(xySort);
    
    // Create a new list of sorted elements
    var tList=[];
    for(i=0;i<eList.length;i++)
      tList.push(eList[i].ip);
  
    // Return the sorted element list
    keymanweb.sortedInputs=tList;
  }
  
  /**
   * Load a desktop UI from the repository, unless already loaded
  **/
  keymanweb.loadUI = function()
  {
   // Test if UI script already installed, install compiled version specified in initialization options if not
    var uiName=keymanweb['ui']['name'],opt=keymanweb.options;
    if(typeof(uiName) != 'string' || uiName == '')
    { 
      uiName = ''; 
      if(typeof(opt['ui']) == 'string') uiName = opt['ui']; 
      else if(typeof(opt['ui']['name']) != 'undefined') uiName = opt['ui']['name'];

      // Do not re-load if called again
      var s=document.getElementsByTagName('SCRIPT');
      for(var i=0; i<s.length; i++) if(s[i].id == 'kmw-ui-script') uiName='';
      
      // Downloaded UI scripts will be within the folder for the specific UI
      //  e.g. <resources>/ui/toolbar/kmwuitoolbar.js  (22/6/13)
      //  where <resources> will be at <static root>/kmw/nnn/, where nnn is build no 
      if(uiName != '')
      {     
        var Lscript = util._CreateElement('SCRIPT');
        Lscript.id='kmw-ui-script';
        var Lfilename = 'kmwui'+uiName+'-release.js',Lpath='ui/'+uiName+'/'; 
        Lfilename = opt['resources']+Lpath+Lfilename; 
        Lscript.src = Lfilename; 
        Lscript.type = 'text/javascript'; 
        Lscript.charset="UTF-8";  // KMEW-89
        
        // IE8 (and probably earlier) does not handle onload event for a dynamically loaded script, 
        // so it has been replaced by an initialization call at end of each UI script's code      
        // Lscript.onload = keymanweb._InitUI; 
        document.body.appendChild(Lscript);
      }
    }
  }
      
  /**
   * Initialize the desktop user interface as soon as it is ready
  **/       
  keymanweb.initializeUI = function()
  {
    if(typeof(keymanweb['ui']['initialize'])=='function')
    {
      keymanweb['ui']['initialize']();
      // Display the OSK (again) if enabled, in order to set its position correctly after
      // adding the UI to the page 
      osk._Show();     
    }
    else
      window.setTimeout(keymanweb.initializeUI,1000);
  }      
  
  /**
   * Function     _SelPos
   * Scope        Private
   * @param       {Object}  Pelem   Element
   * @return      {number}          Selection start
   * Description  Get start of selection (with supplementary plane modifications)
   */   
  keymanweb._SelPos = function(Pelem)
  {
    var Ldoc, Ldv, isMSIE=(util._GetIEVersion()<999); // I3363 (Build 301)

    if(device.touchable)
      return keymanweb.getTextCaret(Pelem);

    if(Pelem._KeymanWebSelectionStart) 
      return Pelem._KeymanWebSelectionStart;
    
    // Mozilla, IE9 
    else if (Pelem.setSelectionRange)  
      return Pelem.value.substr(0,Pelem.selectionStart)._kmwLength();        
   
    // contentEditable elements, Mozilla midas
    else if((Ldv=Pelem.ownerDocument)  &&  (Ldv=Ldv.defaultView)  &&  Ldv.getSelection
      &&  Pelem.ownerDocument.designMode.toLowerCase() == 'on') {
      var Lsel = Ldv.getSelection();
      if(Lsel.focusNode.nodeType == 3) 
        return Lsel.focusNode.substringData(0,Lsel.focusOffset)._kmwLength(); 
    }
    
    // IE8 and earlier
    else if(isMSIE)
    { 
      // Get position within input or textarea element       
      if(typeof(Pelem.value) == 'string') {
        var ss=keymanweb.getInputSelection(Pelem);               
        return Pelem.value.substr(0,ss.start)._kmwLength();        
      }
      
      // Get position within content-editable region
      if(Pelem.body) Ldoc=Pelem; else Ldoc=Pelem.ownerDocument;	// I1481 - integration with rich editors not working 100%

      if(Ldoc) Ldv=Ldoc.selection; else return 0;
          
      var Lrange = Ldv.createRange();
      Lrange.moveStart('textedit',-1);
      return Lrange.text._kmwLength();    
    }
    return 0;
  }  

  /*    Old code without SMP mods
  
  keymanweb._SelPos = function(Pelem)
  {
    var Ldv;
    if(Pelem._KeymanWebSelectionStart) return Pelem._KeymanWebSelectionStart;
    else if (Pelem.setSelectionRange)
      return Pelem.selectionStart;
    else if((Ldv=Pelem.ownerDocument)  &&  (Ldv=Ldv.defaultView)  &&  Ldv.getSelection  &&  Pelem.ownerDocument.designMode.toLowerCase() == 'on') //  &&  Pelem.tagName == 'HTML')
    {
      var Lsel = Ldv.getSelection();
      if(Lsel.focusNode.nodeType == 3) return Lsel.focusOffset;
    }
    return 0;
  }*/   
  
  /**
   * Function     getInputSelection
   * Scope        Private
   * @param       {Object}      el          element
   * @return      {Object.<string,number>}  selection start
   * Description Get input selection for all(?) browsers, per Tim Down
   *            http://stackoverflow.com/questions/3053542/how-to-get-the-start-and-end-points-of-selection-in-text-area/3053640#3053640 
   *            But only works for input fields, not for content editable fields!!!  
   **/            
  keymanweb.getInputSelection = function(el)
  { 
    var start = 0, end = 0, normalizedValue = '', range, textInputRange, len = 0, endRange; 
 
    if(typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") { 
      start = el.selectionStart; end = el.selectionEnd; 
    } else { 
      range = document.selection.createRange(); 
 
      if(range && range.parentElement() == el) { 
        len = el.value.length; 
        normalizedValue = el.value.replace(/\r\n/g, "\n"); 
            
        // Create a working TextRange that lives only in the input 
        textInputRange = el.createTextRange(); 
        textInputRange.moveToBookmark(range.getBookmark()); 
 
        // Check if the start and end of the selection are at the very end of the input,
        // since moveStart/moveEnd doesn't return what we want in those cases 
        endRange = el.createTextRange(); 
        endRange.collapse(false); 
 
        if(textInputRange.compareEndPoints("StartToEnd", endRange) > -1) { 
          start = end = len; 
        } else { 
          start = -textInputRange.moveStart("character", -len); 
          start += normalizedValue.slice(0, start).split("\n").length - 1; 
 
          if(textInputRange.compareEndPoints("EndToEnd", endRange) > -1) { 
            end = len; 
          } else { 
            end = -textInputRange.moveEnd("character", -len); 
            end += normalizedValue.slice(0, end).split("\n").length - 1; 
          } 
        } 
      } 
    } 
    return {start: start, end: end}; 
  }
  // *** I3319 Supplementary Plane modifications - end new code

  // I3318 - deadkey changes START
  /**
   * Function     _DeadkeyResetMatched
   * Scope        Private
   * Description  Clear all matched deadkey flags
   */       
  keymanweb._DeadkeyResetMatched = function()
  {
    var Li, _Dk = keymanweb._DeadKeys;
    for(Li = 0; Li < _Dk.length; Li++) _Dk[Li].matched = 0;
  }

  /**
   * Function     _DeadkeyDeleteMatched
   * Scope        Private
   * Description  Delete matched deadkeys from context
   */       
  keymanweb._DeadkeyDeleteMatched = function()
  {
    var Li, _Dk = keymanweb._DeadKeys;
    for(Li = 0; Li < _Dk.length; Li++) if(_Dk[Li].matched) _Dk.splice(Li,1);
  }

  /**
   * Function     _DeadkeyAdjustPos
   * Scope        Private
   * @param       {number}      Lstart      start position in context
   * @param       {number}      Ldelta      characters to adjust by   
   * Description  Adjust saved positions of deadkeys in context
   */       
  keymanweb._DeadkeyAdjustPos = function(Lstart, Ldelta)
  {
    var Li, _Dk = keymanweb._DeadKeys;
    for(Li = 0; Li < _Dk.length; Li++) if(_Dk[Li].p > Lstart) _Dk[Li].p += Ldelta;
  }
  // I3318 - deadkey changes END
 
  /**
   * Set target element text direction (LTR or RTL), but only if the element is empty
   *    
   * If the element base directionality is changed after it contains content, unless all the text
   * has the same directionality, text runs will be re-ordered which is confusing and causes
   * incorrect caret positioning
   *    
   * @param       {Object}      Ptarg      Target element
   */    
  keymanweb._SetTargDir = function(Ptarg)
  {  
    var elDir=((keymanweb._ActiveKeyboard != null) && (keymanweb._ActiveKeyboard['KRTL'])) ? 'rtl' : 'ltr';  
    if(Ptarg && (device.app == ''))   //don't do anything for KMTouch
    {
      if(device.touchable)
      {
        if(Ptarg.textContent.length == 0) 
        {
          Ptarg.base.dir=Ptarg.dir=elDir;
          keymanweb.setTextCaret(Ptarg,10000);
        }
      }
      else 
      {
        if(Ptarg.value.length == 0) Ptarg.dir=elDir;
      }
    }
  }

//TODO: check use of following function, what value should it return??
  /**
   * Callback used by IE/non-IE browsers to attach KMW objects to elements 
   **/    
  keymanweb._IEFocusIn = function()        // I1596 - attach to controls dynamically 
  {
    var e = keymanweb._GetEventObject(null);   // I2404 - Support for IE events in IFRAMEs
    if(!e) return;
    var Pelem=e.srcElement;
    if(Pelem != null && !keymanweb._IsAttached(Pelem))
      if((Pelem.tagName.toLowerCase() == 'input' && Pelem.type.toLowerCase() == 'text') || Pelem.tagName.toLowerCase() == 'textarea' || Pelem.tagName.toLowerCase() == 'iframe')
        keymanweb.attachToControl(Pelem);
  }

  /**
   *  Callback used by non-IE browsers to attach KMW objects to elements  
   *  Actions to execute if new elements are added to page
   * 
   * @param       {Event}      e      event object
   **/       
  keymanweb._DOMNodeInserted = function(e)
  {
    var Pelem=e.target; 
    if(Pelem != null && Pelem.nodeType == 1) // I1703 - crash when nodeType != 1
    { //TODO: Should this really be used for touch devices???
      keymanweb._AttachToControls(Pelem); // I1961, I1976
    }
  }
   
  /**
   * Reset OSK shift states when entering or exiting the active element
   **/    
  keymanweb._ResetVKShift = function()
  {
    if(!keymanweb._IsActivatingKeymanWebUI) 
    {
      if(osk._UpdateVKShift) osk._UpdateVKShift(null,15,0);  //this should be enabled !!!!! TODO
    }
  }

  /**
   * Function     addHotKey
   * Scope        Public
   * @param       {number}            keyCode
   * @param       {number}            shiftState
   * @param       {function(Object)}  handler
   * Description  Add hot key handler to array of document-level hotkeys triggered by key up event
   */
  keymanweb['addHotKey'] = keymanweb.addHotKey = function(keyCode,shiftState,handler)
  {
    // Test if existing handler for this code and replace it if so
    for(var i=0; i<keymanweb._HotKeys.length; i++)
    {
      if(keymanweb._HotKeys[i].Code == keyCode && keymanweb._HotKeys[i].Shift == shiftState)
      {
        keymanweb._HotKeys[i].Handler = handler; return;
      }
    }
    // Otherwise add it to the array
    keymanweb._HotKeys.push({Code:keyCode,Shift:shiftState,Handler:handler});
  }              

  /**
   * Function     removeHotKey
   * Scope        Public
   * @param       {number}        keycode
   * @param       {number}        shiftState
   * Description  Remove a hot key handler from array of document-level hotkeys triggered by key up event
   */
  keymanweb['removeHotKey'] = keymanweb.removeHotKey = function(keyCode,shiftState)
  {
    for(var i=0; i<keymanweb._HotKeys.length; i++)
    {
      if(keymanweb._HotKeys[i].Code == keyCode && keymanweb._HotKeys[i].Shift == shiftState)
      {
        keymanweb._HotKeys.splice(i,1); return;
      }
    }
  }
                
  /**
   * Function     _ProcessHotKeys
   * Scope        Private
   * @param       {Event}       e       event
   * Description  Passes control to handlers according to the hotkey pressed
   */
  keymanweb._ProcessHotKeys = function(e)
  {
    if(!e) e = window.event;
    if (e.keyCode) var _Lcode = e.keyCode;
    else if (e.which) var _Lcode = e.which;
    else return 0;
    
	// Removed testing of e.shiftKey==null  I3363 (Build 301)
    var _Lmodifiers = 
      (e.shiftKey ? 0x10 : 0) |
      (e.ctrlKey ? (e.ctrlLeft ? 0x20 : 0x20) : 0) | 
      (e.altKey ? (e.altLeft ? 0x40 : 0x40) : 0);

    for(var i=0; i<keymanweb._HotKeys.length; i++)
    {  
      if(_Lcode == keymanweb._HotKeys[i].Code)
      { 
        if(_Lmodifiers == keymanweb._HotKeys[i].Shift) 
        { 
          keymanweb._HotKeys[i].Handler(); 
          e.returnValue = 0; 
          if(e && e.preventDefault) e.preventDefault(); 
          e.cancelBubble = true; 
          return false; 
        }
      }
    }
    return true;
  }

  util.attachDOMEvent(document, 'keyup', keymanweb._ProcessHotKeys,false);  

/* TODO: why not use util.loadCookie and saveCookie?? */  
  
  /**
   * Function     saveCurrentKeyboard
   * Scope        Private
   * @param       {string}    PInternalName       name of keyboard
   * @param       {string}    PLgCode             language code   
   * Description Saves current keyboard as a cookie
   */    
  keymanweb.saveCurrentKeyboard = function(PInternalName,PLgCode)
  {        
    var s = "current="+PInternalName+":"+PLgCode; 
    util.saveCookie('KeymanWeb_Keyboard',{'current':PInternalName+':'+PLgCode});
  }

  /**
   * Restore the most recently used keyboard, if still available
   */    
  keymanweb.restoreCurrentKeyboard = function()
  {
    var stubs=keymanweb._KeyboardStubs,i,n=stubs.length;

    // Do nothing if no stubs loaded
    if(stubs.length < 1) return;

    // If no saved keyboard, default to US English, else first loaded stub
    var d=keymanweb.getSavedKeyboard();
    var t=d.split(':'); 

    // Identify the stub with the saved keyboard
    t=d.split(':'); 
    if(t.length < 2) t[1]='';

    // This loop is needed to select the correct stub when several apply to a given keyboard
    // TODO: There should be a better way!
    for(i=0; i<n; i++)
    {
      if(stubs[i]['KI'] == t[0] && (stubs[i]['KLC'] == t[1] || t[1] == '')) break;
    }
   
    // Restore the stub with the saved keyboard, or else the first keyboard that matches
    // if((i < n) || (device.touchable && (keymanweb._ActiveKeyboard == null)))
    if((i < n) || (keymanweb._ActiveKeyboard == null))
    {
      keymanweb._SetActiveKeyboard(t[0],t[1],false);
      keymanweb.doKeyboardChange(t[0],t[1]);        // And update the UI if necessary
    }
  } 

  /**
   * Gets the cookie for the name and language code of the most recently active keyboard
   * 
   *  Defaults to US English, but this needs to be user-set in later revision (TODO)      
   * 
   * @return      {string}          InternalName:LanguageCode 
   **/    
  keymanweb['getSavedKeyboard'] = keymanweb.getSavedKeyboard = function()
  {  
    var v=util.loadCookie('KeymanWeb_Keyboard');
    return (typeof(v['current']) == 'string') ? v['current'] : 'Keyboard_us:eng';    
  }

  /**
   * Function     addEventListener
   * Scope        Private
   * @param       {Event}             event     event object
   * @param       {function(Event)}   func      event handler
   * @return      {boolean}    
   * Description  Function to add event listener to keymanweb module
   */       
  keymanweb.addEventListener = function(event, func)
  {
    return util.addEventListener('kmw.'+event, func);
  }
  
  util.attachDOMEvent(window, 'focus', keymanweb._ResetVKShift,false);  // I775
  util.attachDOMEvent(window, 'blur', keymanweb._ResetVKShift,false);   // I775
  
  
  /**
   * Adjust copied input elements sizes and positions after resizing the window
   * (Only required on Android - iOS handles this automatically)     
   */    
  keymanweb.resizeView = function()
  {
    keymanweb.alignInputs(true); 
  }
  
  /**
   * This function could possibly be used to detect the start of a rotation and hide the OSK before it is adjusted in size
   * 
   *  @param  {Object}    e   accelerometer rotation event      
   *      
  keymanweb.testRotation = function(e)
  {
    var r=e.rotationRate;
    if(typeof(r) != 'undefined')
    {
//      dbg(r.alpha+' '+r.beta+' '+r.gamma);
    }
  }
  */ 
  
  /**
   *  Hide the URL bar and resize the OSK after rotation (device dependent)
   * 
   *  @param       {Event}      e    event (not used directly)
   * 
   */       
  keymanweb.rotateDevice = function(e)  // Rewritten for I3363 (Build 301)
  {
    osk.hideLanguageList();  

    if(!osk._Visible) return;
            
    // Always re-adjust OSK rows for rounding to nearest pixel
//    if(osk.ready) 
//    {
      //nLayer=osk.resetRowLengths();  // clear aligned flag for all layers     
      //osk.adjustRowLengths(nLayer);  // adjust lengths in visible layer      
//    }
           
    osk.adjustHeights();       
      
    // Hide the URL bar on Android phones - offset is zero for iPhone, but should not be applied here 
    if(device.formFactor == 'phone' && device.OS == 'Android') 
      window.setTimeout(function(){window.scrollTo(0,1);},1000);      
  }
  
  // Add orientationchange event handler to manage orientation changes on mobile devices
  if(device.touchable && device.app == '')
  {
    util.attachDOMEvent(window,'orientationchange',keymanweb.rotateDevice);
    
    // Recognize rotation changes in Firefox (on Android mobile)
    if('onmozorientationchange' in screen)
      util.attachDOMEvent(screen,'mozorientationchange',keymanweb.rotateDevice);
    
    // Also manage viewport rescaling
    if(device.OS == 'Android') util.attachDOMEvent(window,'resize',keymanweb.resizeView);

    //TODO: may be able to recognize start of rotation using accelerometer call...
    //util.attachDOMEvent(window,'devicemotion',keymanweb.testRotation);
  }
  // Initialize supplementary plane string extensions
  String.kmwEnableSupplementaryPlane(false);    

})();

/**
 ****************************************************************************************** 
 *                                                                                         
 *   Keyman 2.0: Keyboard callbacks                                                        
 *   Copyright 2010 Tavultesoft Pty Ltd                                                    
 *                                                                                         
 ******************************************************************************************
 */

(function() 
{
  // Declare KeymanWeb and util objects
  var keymanweb=window['tavultesoft']['keymanweb'], util=keymanweb['util'], 
    osk=keymanweb['osk'],device=util.device,dbg=keymanweb.debug;     //osk defined here, build 350
  
  keymanweb.TSS_LAYER = 33;
  keymanweb.TSS_PLATFORM = 31;
  
  keymanweb._BeepObjects=[];
  keymanweb._BeepTimeout=0;

  /**
   * Function     KSF
   * Scope        Public
   * Description  Save keyboard focus
   */    
  keymanweb['KSF'] = keymanweb.KSF = function()     // KeyboardSaveFocus
  {
    keymanweb._IgnoreNextSelChange = 1;
  }
    
  /**
   * Function     KT
   * Scope        Public
   * @param       {string}      Ptext     Text to insert
   * @param       {?number}     PdeadKey  Dead key number, if any (???)
   * @return      {boolean}               true if inserted
   * Description  Insert text into active control
   */    
  keymanweb['KT'] = keymanweb.KT = function(Ptext,PdeadKey)  // KeyboardInsertText
  {
    keymanweb.cachedContext.reset();
    //_DebugEnter('InsertText');  
    var Lelem = keymanweb._LastActiveElement, Ls, Le, Lkc, Lsel, Lv=false;
    if(Lelem != null)
    {
      Ls=Lelem._KeymanWebSelectionStart;
      Le=Lelem._KeymanWebSelectionEnd;
      Lsel=keymanweb._Selection;
      //if(!Lsel || Lsel.parentElement() == Lelem)  // I1506
      //{
        keymanweb._IsActivatingKeymanWebUI = 1;
        keymanweb._IgnoreNextSelChange = 100;
        keymanweb._FocusLastActiveElement();
        if(keymanweb._IsMozillaEditableIframe(Lelem,0)) Lelem = Lelem.documentElement;  // I3363 (Build 301)
        if(document.selection  &&  Lsel != null) Lsel.select();
        Lelem._KeymanWebSelectionStart=Ls;
        Lelem._KeymanWebSelectionEnd=Le;
        keymanweb._IgnoreNextSelChange = 0;
        if(Ptext!=null)keymanweb.KO(0, Lelem, Ptext);
        if(typeof(PdeadKey)!='undefined') keymanweb.KDO(0, Lelem, PdeadKey);
        Lelem._KeymanWebSelectionStart=null;
        Lelem._KeymanWebSelectionEnd=null;
        Lv=true;
      //}
    }
    //_DebugExit('InsertText');
    return Lv;
  }
  
  /**
   * Function     KR                    
   * Scope        Public
   * @param       {Object}      Pk      Keyboard  object
   * Description  Register and load the keyboard
   */    
  keymanweb['KR'] = keymanweb.KR = function(Pk)
  {

    // Clear the load failure timer
    if(keymanweb.loadTimer)
    {
      window.clearTimeout(keymanweb.loadTimer); keymanweb.loadTimer=null;
    }

    // If initialization not yet complete, list the keyboard to be registered on completion of initialization
    if(!keymanweb['initialized'])
    {
      keymanweb.deferredKR.push(Pk); return;
    }
    
    var Li,Lstub;
 
    // Check if the active stub refers to this keyboard, else find applicable stub
    var Ps=keymanweb._ActiveStub;
    if(!Ps || !('KI' in Ps) || (Ps['KI'] != Pk['KI']))
    {
      // Find the first stub for this keyboard
      for(Lstub=0;Lstub < keymanweb._KeyboardStubs.length; Lstub++)  // I1511 - array prototype extended
      {  
        Ps=keymanweb._KeyboardStubs[Lstub];
        if(Pk['KI'] == Ps['KI'])break;
        Ps=null;
      }
    } 
    // Register the stub for this language (unless it is already registered)
    keymanweb.KRS(Ps?Ps:Pk); 

    // Test if keyboard already loaded
    for(Li=0; Li<keymanweb._Keyboards.length; Li++)
    {
      if(Pk['KI'] == keymanweb._Keyboards[Li]['KI']) return;
    }
   
    // Append to keyboards array
    keymanweb._Keyboards=keymanweb._push(keymanweb._Keyboards,Pk);

    if(keymanweb._LoadingInternalName == Pk['KI']) 
    {   
      keymanweb.doBeforeKeyboardChange(Pk['KI'],Ps['KLC']);
      keymanweb._ActiveKeyboard=Pk;

      if(keymanweb._LastActiveElement != null) 
      {
        keymanweb._JustActivatedKeymanWebUI = 1;
        keymanweb._SetTargDir(keymanweb._LastActiveElement);            
      }
      keymanweb._LoadingInternalName = null;
      
      // Copy remaining properties from stub --TODO: this is not right, the keyboard does NOT have these properties
      Pk['KL'] = typeof Ps['KL'] != 'undefined' ? Ps['KL'] : '';  // I1300 - Language support, I2309 - errors loading keyboards without all K?? properties defined
      Pk['KLC'] = typeof Ps['KLC'] != 'undefined' ? Ps['KLC'] : '';
      Pk['KR'] = typeof Ps['KR'] != 'undefined' ? Ps['KR'] : '';
      Pk['KRC'] = typeof Ps['KRC'] != 'undefined' ? Ps['KRC'] : '';
      Pk['KC'] = typeof Ps['KC'] != 'undefined' ? Ps['KC'] : '';
      Pk['KCC'] = typeof Ps['KCC'] != 'undefined' ? Ps['KCC'] : '';
      Pk['KD'] = typeof Ps['KD'] != 'undefined' ? Ps['KD'] : '';  
      Pk['KS'] = typeof Ps['KS'] != 'undefined' ? Ps['KS'] : 0; //I3319     
    
      String.kmwEnableSupplementaryPlane(Ps && ((Ps['KS'] && (Ps['KS'] == 1)) || (Pk['KN'] == 'Hieroglyphic'))); // I3319 - SMP extension, I3363 (Build 301)
      keymanweb.saveCurrentKeyboard(Pk['KI'],Ps['KLC']);
    
      // Prepare and show the OSK for this keyboard
      osk._Load();

      // Remove the wait indicator
      util.wait(false);
    }
    
    // Execute any external (UI) code needed after loading keyboard
    keymanweb.doKeyboardLoaded(Pk['KI']);
    
    keymanweb._LoadingInternalName = null;
  }

  /**
   * Add the basic keyboard parameters (keyboard stub) to the array of keyboard stubs
   * If no language code is specified in a keyboard it cannot be registered, 
   * and a keyboard stub must be registered before the keyboard is loaded 
   * for the keyboard to be usable.
   * 
   * @param       {Object}      Pstub     Keyboard stub object
   * @return      {?number}               1 if already registered, else null
   */    
//var ts0=new Date().toTimeString().substr(3,5);
  keymanweb['KRS'] = keymanweb.KRS = function(Pstub)   
  {
    var Lk;
    
    // In initialization not complete, list the stub to be registered on completion of initialization
    if(!keymanweb['initialized'])
    {
      keymanweb.deferredKRS.push(Pstub); 
      return;
    }

    // The default stub is always the first keyboard stub loaded [and will be ignored by desktop browsers - not for beta, anyway]
    if(keymanweb.dfltStub == null)
    {
      keymanweb.dfltStub=Pstub;
      //if(device.formFactor == 'desktop') return 1;    //Needs further thought before release
    }

    // If no language code has been defined, and no stub has been registered for this keyboard, register with empty string as the language code
    if(typeof(Pstub['KLC']) == 'undefined') Pstub['KLC'] = '';
    if(typeof(Pstub['KL']) == 'undefined')  Pstub['KL'] = 'undefined';

    // If language code already defined (or not specified in stub), check to see if stub already registered
    for(Lk=0; Lk<keymanweb._KeyboardStubs.length; Lk++)
    {
      if(keymanweb._KeyboardStubs[Lk]['KI'] == Pstub['KI'])
      {
        if(Pstub['KLC'] == '' || (keymanweb._KeyboardStubs[Lk]['KLC'] == Pstub['KLC'])) return 1; // no need to register
      }
    }
   
    // Register stub (add to KeyboardStubs array)
    keymanweb._KeyboardStubs=keymanweb._push(keymanweb._KeyboardStubs,Pstub);
/*    
    // Sort stub array so that English is always first
    if(keymanweb._KeyboardStubs.length > 1) keymanweb._KeyboardStubs.sort(function(a,b){
      var ax,bx;
      switch(a['KLC'])
      {
        case 'eng': ax=0; break;
        case 'fra': ax=1; break;
        case 'deu': ax=2; break;
        default: ax=10; break;
      }
      switch(b['KLC'])
      {
        case 'eng': bx=0; break;
        case 'fra': bx=1; break;
        case 'deu': bx=2; break;
        default: bx=10; break;
      }
      return ax-bx;
      });
*/
    // TODO: Need to distinguish between initial loading of a large number of stubs and any subsequent loading.
    //   UI initialization should not be needed for each registration, only at end.
    // Reload this keyboard if it was the last active keyboard and 
    // make any changes needed by UI for new keyboard stub
    //keymanweb.doKeyboardRegistered(Pstub['KI'],Pstub['KL'],Pstub['KN'],Pstub['KLC']);
  }

  /**
   * Get keyboard context for a specified range, relative to caret
   * 
   * @param       {number}      n       Number of characters to move back from caret
   * @param       {number}      ln      Number of characters to return
   * @param       {Object}      Pelem   Element to work with (must be currently focused element)
   * @return      {string}              Context string 
   * 
   * Example     [abcdef|ghi] as INPUT, with the caret position marked by |:
   *             KC(2,1,Pelem) == "e"
   *             KC(3,3,Pelem) == "def"
   *             KC(10,10,Pelem) == "abcdef"  i.e. return as much as possible of the requested string
   */    
  
  keymanweb['KC'] = keymanweb.KC = function(n, ln, Pelem)
  {
    var v = keymanweb.cachedContext.get(n, ln);
    if(v !== null) {
      return v;
    }
    
    var r = keymanweb.KC_(n, ln, Pelem); 
    keymanweb.cachedContext.set(n, ln, r);
    return r;
  }
  
  keymanweb.KC_ = function(n, ln, Pelem) 
  {
    var Ldv;
    if(Pelem.body) var Ldoc=Pelem; else var Ldoc=Pelem.ownerDocument; // I1481 - use Ldoc to get the ownerDocument when no selection is found

    if(device.touchable && (device.app == ''))
      return keymanweb.getTextBeforeCaret(Pelem)._kmwSubstr(-n)._kmwSubstr(0,ln);
   
    if(keymanweb.legacy)
    {
      return Pelem.value._kmwSubstr(Pelem.length-n, ln); //I3319
    }
    else if(Ldoc  &&  (Ldv=Ldoc.defaultView)  &&  Ldv.getSelection  &&
      (Ldoc.designMode.toLowerCase() == 'on' || Pelem.contentEditable == 'true' || Pelem.contentEditable == 'plaintext-only' || Pelem.contentEditable === '')) //  &&  Pelem.tagName == 'HTML')  &&  Pelem.tagName == 'HTML')
		  // I2457 - support contentEditable elements in mozilla, webkit
    {
      /* Mozilla midas html editor and editable elements */
      var Lsel = Ldv.getSelection();
      if(Lsel.focusNode.nodeType == 3)
      {
        if(Lsel.focusOffset > 2*n)  // I3319 SMP extension
          return Lsel.focusNode.substringData(Lsel.focusOffset - 2*n, 2*n)._kmwSubstr(-n)._kmwSubstr(0,ln); // I3319
        else
          return Lsel.focusNode.substringData(0, Lsel.focusOffset)._kmwSubstr(-n)._kmwSubstr(0,ln);         // I3319
      }
      else
        return "";
    }
    else if (Pelem.setSelectionRange)
    {
      /* Mozilla other controls */
      var LselectionStart, LselectionEnd;
      if(Pelem._KeymanWebSelectionStart) 
      {
        LselectionStart = Pelem._KeymanWebSelectionStart;
        LselectionEnd = Pelem._KeymanWebSelectionEnd;
        //KeymanWeb._Debug('KeymanWeb.KC: _KeymanWebSelectionStart=TRUE LselectionStart='+LselectionStart+'; LselectionEnd='+LselectionEnd);
      }
      else
      {
        if(keymanweb._CachedSelectionStart === null || Pelem.selectionStart !== keymanweb._LastCachedSelection) // I3319, KMW-1
        {
          keymanweb._LastCachedSelection = Pelem.selectionStart; // KMW-1
          keymanweb._CachedSelectionStart = Pelem.value._kmwCodeUnitToCodePoint(Pelem.selectionStart); // I3319
          keymanweb._CachedSelectionEnd = Pelem.value._kmwCodeUnitToCodePoint(Pelem.selectionEnd);     // I3319
        }
        LselectionStart = keymanweb._CachedSelectionStart; // I3319
        LselectionEnd = keymanweb._CachedSelectionEnd;     // I3319           
      }
      if(LselectionStart < n)
      {
//dbg(n+' '+ln+' '+Pelem.value._kmwSubstring(0,LselectionStart));
        return Pelem.value._kmwSubstr(0,LselectionStart); //I3319, KMW-1
      }
//dbg(n+' '+ln+' '+Pelem.value._kmwSubstring(LselectionStart-n,LselectionStart-n+ln));
      return Pelem.value._kmwSubstring(LselectionStart-n,LselectionStart-n+ln); //I3319, KMW-1
    }
    
    else if(Ldoc  &&  (Ldv=Ldoc.selection)) // build 77 - use elem.ownerDocument instead of document
                                            // I1481 - use Ldoc to get the ownerDocument when no selection is found
    {  
      /* IE */
      var Lrange = Ldv.createRange();
      //if (Lrange.parentElement() == Pelem) {  // build 77 - ignore parent of selection
      Lrange.moveStart('character',-2*n);                     //I3319

      return Lrange.text._kmwSubstr(-n)._kmwSubstring(0,ln);  //I3319
      //}
    }

    return "";
  }  
  
  /**
   * Function     KN    
   * Scope        Public
   * @param       {number}      n       Length of context to check
   * @param       {Object}      Pelem   Element to work with (must be currently focused element)
   * @return      {boolean}             True if length of context is less than or equal to n
   * Description  Test length of context, return true if the length of the context is less than or equal to n
   * 
   * Example     [abc|def] as INPUT, with the caret position marked by |:
   *             KN(3,Pelem) == TRUE
   *             KN(2,Pelem) == FALSE
   *             KN(4,Pelem) == TRUE
   */    
  keymanweb['KN'] = keymanweb.KN = function(n, Ptarg)    // KeyboardNul
  {
    var cx=this.KC(n+1, n+1, Ptarg);
    if(cx === false) return true; else return (cx._kmwLength() < n+1); // I2243 - support nul in context; I3319
  }

  /**
   * Function     KCM   
   * Scope        Public
   * @param       {number}      n       Number of characters to move back from caret
   * @param       {Object}      Ptarg   Focused element
   * @param       {string}      val     String to match
   * @param       {number}      ln      Number of characters to return
   * @return      {boolean}             True if selected context matches val
   * Description  Test keyboard context for match
   */    
  keymanweb['KCM'] = keymanweb.KCM = function(n, Ptarg, val, ln)  // Keyboard_ContextMatch 
  {             
    //KeymanWeb._Debug('KeymanWeb.KCM(n='+n+', Ptarg, val='+val+', ln='+ln+'): return '+(this.KC(n,ln,Ptarg)==val)); 
    var cx=this.KC(n, ln, Ptarg);
    if(cx !== false && cx === val) return true; // I3318
    this._DeadkeyResetMatched();                // I3318
    return false;
   }

  /**
   * Function     KIK      
   * Scope        Public
   * @param       {Object}  e   keystroke event
   * @return      {boolean}     true if keypress event
   * Description  Test if event as a keypress event
   */    
  keymanweb['KIK'] = keymanweb.KIK = function(e)          // Keyboard_IsKeypress 
  {                      
    if(keymanweb._ActiveKeyboard['KM'])    // I1380 - support KIK for positional layouts
      return !e.LisVirtualKey;             // will now return true for U_xxxx keys, but not for T_xxxx keys
    else  
      return keymanweb._USKeyCodeToCharCode(e) ? true : false; // I1380 - support KIK for positional layouts
    //if(e.charCode != 0) != null)
    // return e.charCode != 0;
    //return e.type == 'keypress';
  }
  
  /**
   * Function     KKM      
   * Scope        Public
   * @param       {Object}      e           keystroke event
   * @param       {number}      Lruleshift
   * @param       {number}      Lrulekey
   * @return      {boolean}                 True if key matches rule
   * Description  Test keystroke with modifiers against rule
   */    
  keymanweb['KKM'] = keymanweb.KKM = function(e,Lruleshift,Lrulekey)  // Keyboard_KeyMatch 
  { 
    var retVal = 0; // I3318
    var keyCode = (e.Lcode == 173 ? 189 : e.Lcode);  //I3555 (Firefox hyphen issue)

    if(e.vkCode > 255) keyCode = e.vkCode;           // added to support extended (touch-hold) keys for mnemonic layouts
      
    if(e.LisVirtualKey || keyCode > 255)            // added keyCode test for same reason
    {
      if((Lruleshift & 0x4000) == 0x4000 || (keyCode > 255))  // added keyCode test to support extended keys
      {
        retVal = ((Lrulekey == keyCode)  &&  ((Lruleshift&0x7F) == e.Lmodifiers)); //I3318, I3555
      }
    }
    else if((Lruleshift & 0x4000) == 0)
    {
      retVal = (keyCode == Lrulekey);         // I3318, I3555
    }
    if(!retVal) this._DeadkeyResetMatched();  // I3318
    return retVal;                            // I3318
  };
  
  /**
   * Function     KKI      
   * Scope        Public
   * @param       {number}      n
   * @param       {Object}      Ptarg
   * @param       {string}      val
   * @param       {number}      ln
   * @return      {Object}              Object with event's virtual key flag, key code, and modifiers
   * Description  Get object with extended key event information
   */    
  keymanweb['KKI'] = keymanweb.KKI = function(e)
  {
    var ei = {};
    ei['vk'] = e.LisVirtualKey; ei['code'] = e.Lcode; ei['modifiers'] = e.Lmodifiers;
    return ei;
  };
  
  /**
   * Function     KDM      
   * Scope        Public
   * @param       {number}      n       current cursor position
   * @param       {Object}      Ptarg   target element
   * @param       {number}      d       deadkey
   * @return      {boolean}             True if deadkey found selected context matches val
   * Description  Match deadkey at current cursor position
   */    
  keymanweb['KDM'] = keymanweb.KDM = function(n, Ptarg, d)
  {            
    if(keymanweb._DeadKeys.length == 0) return false; // I3318  
  
    var sp=keymanweb._SelPos(Ptarg); 
    n = sp - n;   
    for(var i = 0; i < keymanweb._DeadKeys.length; i++)
      if(keymanweb._DeadKeys[i].p == n  &&  keymanweb._DeadKeys[i].d == d) {
        keymanweb._DeadKeys[i].matched = 1; return 1; // I3318        
      }
    this._DeadkeyResetMatched();                      // I3318

    return false;
  }
  
  /**
   * Function     KBR      
   * Scope        Public
   * Description  Reset/terminate beep or flash (not currently used: Aug 2011)
   */    
  keymanweb['KBR'] = keymanweb.KBR = function() // KeyboardBeepReset
  {
    keymanweb.cachedContext.reset();
    
    var Lbo;
    keymanweb._BeepTimeout = 0;
    for(Lbo=0;Lbo<keymanweb._BeepObjects.length;Lbo++)  // I1511 - array prototype extended
    {
      keymanweb._BeepObjects[Lbo].e.style.backgroundColor = keymanweb._BeepObjects[Lbo].c;
    }
    keymanweb._BeepObjects = [];
  }
    
  /**
   * Function     KB      
   * Scope        Public
   * @param       {Object}      Pelem     element to flash
   * Description  Flash body as substitute for audible beep
   */    
  keymanweb['KB'] = keymanweb.KB = function(Pelem)    // Keyboard_Beep
  {    
    keymanweb.cachedContext.reset();
    
    if(Pelem.body) Pelem=Pelem.body; // I1446 - beep sometimes fails to flash when using OSK and rich control
    
    if(!Pelem.style || typeof(Pelem.style.backgroundColor)=='undefined') return;

    for(var Lbo=0;Lbo<keymanweb._BeepObjects.length;Lbo++)   // I1446 - beep sometimes fails to return background color to normal
    {                                                     // I1511 - array prototype extended
      if(keymanweb._BeepObjects[Lbo].e == Pelem) return;
    }
    
    keymanweb._BeepObjects=keymanweb._push(keymanweb._BeepObjects,{e:Pelem, c:Pelem.style.backgroundColor});
    Pelem.style.backgroundColor = '#000000';
    if(keymanweb._BeepTimeout == 0)
    {
      keymanweb._BeepTimeout = 1;
      window.setTimeout(keymanweb.KBR, 50);
    }
    //Pelem.style.backgroundColor = Lcolour;
  }
  
  /**
   * Function     KA      
   * Scope        Public
   * @param       {number}      n     character position (index) 
   * @param       {string}      ch    character to find in string
   * @param       {string}      s     'any' string   
   * @return      {boolean}           True if character found in 'any' string, sets index accordingly
   * Description  Test for character matching
   */    
  keymanweb['KA'] = keymanweb.KA = function(n,ch,s)  // Keyboard_Any()
  {   
    if(ch == '') return 0;
    var Lix = s._kmwIndexOf(ch); //I3319
    keymanweb._AnyIndices[n] = Lix;
    return Lix >= 0;
  }
  
  /**
   * Function     KO      
   * Scope        Public
   * @param       {number}      dn      number of characters to overwrite
   * @param       {Object}      Pelem   element to output to 
   * @param       {string}      s       string to output   
   * Description  Keyboard output
   */    
  keymanweb['KO'] = keymanweb.KO = function(dn, Pelem, s) // Keyboard_Output()
  {
    keymanweb.cachedContext.reset();
    
   // KeymanTouch for Android uses direct insertion of the character string
   if('oninserttext' in keymanweb)
   {
      keymanweb['oninserttext'](dn,s); 
   }   
   
    if(Pelem.body) var Ldoc=Pelem; else var Ldoc=Pelem.ownerDocument;	// I1481 - integration with rich editors not working 100%
    var Li, Ldv;
   
    if(Pelem.className.indexOf('keymanweb-input') >= 0) 
    {
      var t=keymanweb.getTextBeforeCaret(Pelem);
      if(dn > 0) t=t._kmwSubstr(0,t._kmwLength()-dn)+s; else t=t+s;
      keymanweb.setTextBeforeCaret(Pelem,t);
      return;
    }
   
    if (keymanweb.legacy)
    { 
      if(dn>0)
        Pelem.value=Pelem.value._kmwSubstr(0,Pelem.value._kmwLength()-dn)+s;  //I3319
      else
        Pelem.value=Pelem.value+s;
    }
    else if (Ldoc  &&  (Ldv=Ldoc.defaultView)  &&  Ldv.getSelection  &&  
        (Ldoc.designMode.toLowerCase() == 'on' || Pelem.contentEditable == 'true' || Pelem.contentEditable == 'plaintext-only' || Pelem.contentEditable === '')      
      )  // I2457 - support contentEditable elements in mozilla, webkit
    {
      /* Editable iframe and contentEditable elements for mozilla */
      var _IsEditableIframe = Ldoc.designMode.toLowerCase() == 'on';
      if(_IsEditableIframe) var _CacheableCommands = keymanweb._CacheCommands(Ldoc);
     
      var Lsel = Ldv.getSelection();
      var LselectionStart = Lsel.focusNode.nodeValue ? Lsel.focusNode.substringData(0,Lsel.focusOffset)._kmwLength() : 0;  // I3319
      
      if(!Lsel.isCollapsed) Lsel.deleteFromDocument();  // I2134, I2192
      //KeymanWeb._Debug('KO: focusOffset='+Lsel.focusOffset+', dn='+dn+', s='+s+' focusNode.type='+Lsel.focusNode.nodeType+', focusNode.parentNode.tagName='+(Lsel.focusNode.parentNode?Lsel.focusNode.parentNode.tagName:'NULL') );

      var Lrange = Lsel.getRangeAt(0);
      if(dn > 0) { 
        Lrange.setStart(Lsel.focusNode, Lsel.focusOffset - Lsel.focusNode.nodeValue.substr(0,Lsel.focusOffset)._kmwSubstr(-dn).length); // I3319
        Lrange.deleteContents(); 
      }

      //KeymanWeb._Debug('KO: focusOffset='+Lsel.focusOffset+', dn='+dn+', s='+s+' focusNode.type='+Lsel.focusNode.nodeType+', focusNode.parentNode.tagName='+(Lsel.focusNode.parentNode?Lsel.focusNode.parentNode.tagName:'NULL') );

      if(s._kmwLength() > 0)  // I2132 - exception if s.length > 0, I3319
      {
        if(Lsel.focusNode.nodeType == 3)
        {
					// I2134, I2192
          // Already in a text node
          //KeymanWeb._Debug('KO: Already in a text node, adding "'+s+'": '+Lsel.focusOffset + '-> '+Lsel.toString());
          var LfocusOffset = Lsel.focusOffset;
          //KeymanWeb._Debug('KO: node.text="'+Lsel.focusNode.data+'", node.length='+Lsel.focusNode.length);
          Lsel.focusNode.insertData(Lsel.focusOffset, s);
          try
          {
            Lsel.extend(Lsel.focusNode, LfocusOffset + s.length); 
          }
          catch(e)
          {
            // Chrome (through 4.0 at least) throws an exception because it has not synchronised its content with the selection.  scrollIntoView synchronises the content for selection
            Lsel.focusNode.parentNode.scrollIntoView();
            Lsel.extend(Lsel.focusNode, LfocusOffset + s.length);
          }
        }
        else
        {
          // Create a new text node - empty control
          //KeymanWeb._Debug('KO: Creating a new text node for "'+s+'"');
          var n = Ldoc.createTextNode(s);
          Lrange.insertNode(n);
          Lsel.extend(n,s.length);
        }
      }
      if(_IsEditableIframe) keymanweb._CacheCommandsReset(Ldoc, _CacheableCommands, null);// I2457 - support contentEditable elements in mozilla, webkit
      
      Lsel.collapseToEnd();

      // Adjust deadkey positions 
      if(dn >= 0)
      {
        keymanweb._DeadkeyDeleteMatched();                                  // I3318
        keymanweb._DeadkeyAdjustPos(LselectionStart, -dn + s._kmwLength()); // I3318
      }
    }
    
    // Internet Explorer   (including IE9)   
    else if(Ldoc  &&  (Ldv=Ldoc.selection)) // build 77 - use elem.ownerDocument.selection
    { 
      if(Ldoc.body.isContentEditable || Ldoc.designMode.toLowerCase()=='on')  // I1295 - isContentEditable
      {
        var _CacheableCommands = keymanweb._CacheCommands(Ldoc);
      }
   
      var Lrange = Ldv.createRange(), Ls1;
      if(Lrange.text != '') 
      {
        Ldv.clear();
        dn = 0;
      }
      else Lrange.collapse(true);

      if(dn > 0) {              
        Lrange.moveStart('character',-2*dn);  // I3319 (next four lines
        var s0=Lrange.text,s1=s0._kmwSubstr(-dn);
        Lrange.collapse(false); //move start back to end
        Lrange.moveStart('character',-s1.length);
      }
      else dn = 0;

      Lrange.text = s;

      if(Ldoc.body.isContentEditable || Ldoc.designMode.toLowerCase()=='on') // I1295 - isContentEditable
      {
        Lrange.moveStart('character',-s.length);
        
        keymanweb._CacheCommandsReset(Ldoc, _CacheableCommands,Lrange.select);
        Lrange.moveStart('character',s.length);
        Lrange.select();
      }
      // Adjust deadkey positions 
      if(dn >= 0)
      {
        keymanweb._DeadkeyDeleteMatched();                                  // I3318
        keymanweb._DeadkeyAdjustPos(LselectionStart, -dn + s._kmwLength()); // I3318
      }
 
      keymanweb._Selection = Ldv.createRange();
      keymanweb._Selection.select();
      keymanweb._Selection.scrollIntoView();
    }    

    // Mozilla et al; IE9+ also recognizes setSelectionRange, but does not seem to work in exactly the same way as Mozilla
    else if (Pelem.setSelectionRange)
    {                                        
      var LselectionStart, LselectionEnd;
            
      if(Pelem._KeymanWebSelectionStart != null) // changed to allow a value of 0
      {
        LselectionStart = Pelem._KeymanWebSelectionStart;
        LselectionEnd = Pelem._KeymanWebSelectionEnd;
      }
      else
      {
        LselectionStart = Pelem.value._kmwCodeUnitToCodePoint(Pelem.selectionStart);  // I3319
        LselectionEnd = Pelem.value._kmwCodeUnitToCodePoint(Pelem.selectionEnd);      // I3319
      }
      
      var LscrollTop, LscrollLeft;
      if(Pelem.type.toLowerCase() == 'textarea' && typeof(Pelem.scrollTop) != 'undefined') {
        LscrollTop = Pelem.scrollTop; LscrollLeft = Pelem.scrollLeft;
      }

      if(dn < 0) // Don't delete, leave context alone (dn = -1)
      {
        Pelem.value = Pelem.value._kmwSubstring(0,LselectionStart) + s + Pelem.value._kmwSubstring(LselectionEnd);    //I3319
        dn = 0;
      }
      else if(LselectionStart < dn)
        Pelem.value = s + Pelem.value._kmwSubstring(LselectionEnd); //I3319
      else
        Pelem.value = Pelem.value._kmwSubstring(0,LselectionStart-dn) + s + Pelem.value._kmwSubstring(LselectionEnd); //I3319

      // Adjust deadkey positions 
      if(dn >= 0)
      {
        keymanweb._DeadkeyDeleteMatched(); // I3318
        keymanweb._DeadkeyAdjustPos(LselectionStart, -dn + s._kmwLength()); // I3318,I3319
      }

      if (typeof(LscrollTop) != 'undefined') {
        Pelem.scrollTop = LscrollTop;
        Pelem.scrollLeft = LscrollLeft;
      } 
      var caretPos=LselectionStart-dn+s._kmwLength();                   // I3319
      var caretPosUnits=Pelem.value._kmwCodePointToCodeUnit(caretPos);  // I3319
      
      Pelem.setSelectionRange(caretPosUnits,caretPosUnits);             // I3319
      Pelem._KeymanWebSelectionStart = null; Pelem._KeymanWebSelectionEnd = null;      
    }

    // Pass event to iPhone app
    if('ontextchange' in keymanweb) keymanweb['ontextchange'](Pelem);
    
  }
  
  /**
   * Function     KDO      
   * Scope        Public
   * @param       {number}      Pdn     no of character to overwrite (delete) 
   * @param       {Object}      Pelem   element to output to 
   * @param       {number}      Pd      deadkey id
   * Description  Record a deadkey at current cursor position, deleting Pdn characters first
   */    
  keymanweb['KDO'] = keymanweb.KDO = function(Pdn,Pelem,Pd)
  {               
    keymanweb.cachedContext.reset();
    var Lc = new Object(); 
    if(Pdn >= 0) keymanweb.KO(Pdn,Pelem,"");  //I3318 corrected to >=
    Lc.p=keymanweb._SelPos(Pelem); Lc.d=Pd;                 
    keymanweb._DeadKeys=keymanweb._push(keymanweb._DeadKeys,Lc);        
             
//    _DebugDeadKeys(Pelem, 'KDeadKeyOutput: dn='+Pdn+'; deadKey='+Pd);
  }

  /**
   * Function     KIO      
   * Scope        Public
   * @param       {number}      Pdn     no of character to overwrite (delete) 
   * @param       {string}      Ps      string
   * @param       {numebr}      Pn      index
   * @param       {Object}      Pelem   element to output to 
   * Description  Output a character selected from the string according to the offset in the index array
   */    
  keymanweb['KIO'] = keymanweb.KIO = function(Pdn,Ps,Pn,Pelem)
  {
    keymanweb.cachedContext.reset();
    if(keymanweb._AnyIndices[Pn-1] < Ps._kmwLength())                      //I3319        
      keymanweb.KO(Pdn,Pelem,Ps._kmwCharAt(keymanweb._AnyIndices[Pn-1]));  //I3319
  }
  
/**
 * Function     _CacheCommands
 * Scope        Private
 * @param       {Object}    _Document
 * @return      {Array.<string>}        List of style commands that are cacheable
 * Description  Build reate list of styles that can be applied in iframes
 */    
  keymanweb._CacheCommands = function(_Document) // I1204 - style application in IFRAMEs, I2192, I2134, I2192   
  {
    //var _CacheableBackColor=(_Document.selection?'hilitecolor':'backcolor');
    var _CacheableCommands=[['backcolor',1],['fontname',1],['fontsize',1],['forecolor',1],['bold',0],['italic',0],['strikethrough',0],['subscript',0],['superscript',0],['underline',0]];
    if(_Document.defaultView) keymanweb._push(_CacheableCommands,['hilitecolor',1]);
      
    for(var n=0;n < _CacheableCommands.length; n++)  // I1511 - array prototype extended
    {
      //KeymanWeb._Debug('Command:'+_CacheableCommands[n][0]);
      keymanweb._push(_CacheableCommands[n],_CacheableCommands[n][1] ? _Document.queryCommandValue(_CacheableCommands[n][0]) : _Document.queryCommandState(_CacheableCommands[n][0]));
    }
    return _CacheableCommands;
  }
  
  /**
   * Function     _CacheCommandReset
   * Scope        Private
   * @param       _Document
   *             _CacheableCommands
   *             _func      
   * @return      Nothing
   * Description  Restore styles in IFRAMEs (??)
   */    
  keymanweb._CacheCommandsReset = function(_Document, _CacheableCommands, _func)
  {
    for(var n=0;n < _CacheableCommands.length; n++)  // I1511 - array prototype extended
    {
      //KeymanWeb._Debug('ResetCacheCommand:'+_CacheableCommands[n][0]+'='+_CacheableCommands[n][2]);
      if(_CacheableCommands[n][1])
      {
        if(_Document.queryCommandValue(_CacheableCommands[n][0]) != _CacheableCommands[n][2])
        {
          if(_func)_func();
          _Document.execCommand(_CacheableCommands[n][0], false, _CacheableCommands[n][2]);
        }
      }
      else if(_Document.queryCommandState(_CacheableCommands[n][0]) != _CacheableCommands[n][2])
      {if(_func)_func();
        //KeymanWeb._Debug('executing command '+_CacheableCommand[n][0]);
        _Document.execCommand(_CacheableCommands[n][0], false, null);
      }
    }
  }
  
  /**
   * KIFS compares the content of a system store with a string value 
   * 
   * @param       {number}      systemId    ID of the system store to test (only TSS_LAYER currently supported)
   * @param       {string}      strValue    String value to compare to
   * @param       {Object}      Pelem       Currently active element (may be needed by future tests)     
   * @return      {boolean}                 True if the test succeeds 
 */       
  keymanweb['KIFS'] = keymanweb.KIFS = function(systemId,strValue,Pelem)
  {     
    var result=true;             
    if(systemId == keymanweb.TSS_LAYER) 
      result = (osk.layerId === strValue);
    else if(systemId == keymanweb.TSS_PLATFORM)
    {
      var i,constraint,constraints=strValue.split(' ');
      for(i=0; i<constraints.length; i++)
      {
        constraint=constraints[i].toLowerCase();
        switch(constraint)
        {
          case 'touch':
          case 'hardware':
            if(device.touchable != (constraint == 'touch')) result=false;
        }
        switch(constraint)
        {
          case 'windows':
          case 'android':
          case 'ios':
          case 'macosx':
          case 'linux':
            if(device.OS.toLowerCase() != constraint) result=false;
        }
        switch(constraint)
        {
          case 'tablet':
          case 'phone':
          case 'desktop':
            if(device.formFactor != constraint) result=false;
        }
        switch(constraint)
        {
          case 'native':
          case 'web':
          case 'ie':
          case 'chrome':
          case 'firefox':
          case 'safari':
          case 'opera':
            if(device.browser != constraint) result=false;  
        }
      }
    }  
    return result;    //Moved from previous line, now supports layer selection, Build 350 
  }
 
  /**
   * KSETS sets the value of a system store to a string  
   * 
   * @param       {number}      systemId    ID of the system store to set (only TSS_LAYER currently supported)
   * @param       {string}      strValue    String to set as the system store content 
   * @param       {Object}      Pelem       Currently active element (may be needed in future tests)     
   * @return      {boolean}                 True if command succeeds
   *                                        (i.e. for TSS_LAYER, if the layer is successfully selected)
   */    
  keymanweb['KSETS'] = function(systemId,strValue,Pelem)
  {
    keymanweb.cachedContext.reset();
    if(systemId == keymanweb.TSS_LAYER)
      return osk.showLayer(strValue);     //Buld 350, osk reference now OK, so should work
    else
      return false;
  }
 
  /**
   * Load an option store value from a cookie or default value
   * 
   * @param       {string}      kbdName     keyboard internal name
   * @param       {string}      storeName   store (option) name, embedded in cookie name
   * @param       {string}      dfltValue   default value
   * @return      {string}                  current or default option value   
   */    
  keymanweb['KLOAD'] = function(kbdName,storeName,dfltValue)
  {
    keymanweb.cachedContext.reset();
    var cName='KeymanWeb_'+kbdName+'_Option_'+storeName,cValue=util.loadCookie(cName);
    if(typeof cValue[storeName] != 'undefined') 
      return unescape(cValue[storeName]);
    else
      return dfltValue;
  }

  /**
   * Save an option store value to a cookie 
   * 
   * @param       {string}      storeName   store (option) name, embedded in cookie name
   * @param       {string}      optValue    option value to save
   * @return      {boolean}                 true if save successful
   */    
  keymanweb['KSAVE'] = function(storeName,optValue)
  {
    keymanweb.cachedContext.reset();
    var kbd=keymanweb._ActiveKeyboard;
    if(!kbd || typeof kbd['KI'] == 'undefined' || kbd['KI'] == '') return false;
    
    var cName='KeymanWeb_'+kbd['KI']+'_Option_'+storeName,cValue=escape(optValue);

    util.saveCookie(cName,cValue);
    return true;
  }

 /**
  * Legacy entry points (non-standard names)- included only to allow existing IME keyboards to continue to be used
  */
  keymanweb['GetLastActiveElement'] = function() { return keymanweb._LastActiveElement; }
  keymanweb['FocusLastActiveElement'] = function() { keymanweb._FocusLastActiveElement(); }

  //The following entry points are defined but should not normally be used in a keyboard, as OSK display is no longer determined by the keyboard
  keymanweb['HideHelp'] = function() {osk._Hide(true);}
  keymanweb['ShowHelp'] = function(Px,Py) {osk._Show(Px,Py);}  
  keymanweb['ShowPinnedHelp'] = function() {osk.userPositioned=true; osk._Show(-1,-1);}
  
  /**
   * Cache of context storing and retrieving return values from KC
   * Must be reset prior to each keystroke and after any text changes
   * MCD 3/1/14   
   **/         
  keymanweb.cachedContext = {
    _cache: [],
    reset: function() { 
      this._cache = []; 
    },
    get: function(n, ln) { 
      // return null; // uncomment this line to disable context caching
      if(typeof this._cache[n] == 'undefined') {
        return null;
      } else if(typeof this._cache[n][ln] == 'undefined') {
        return null;
      }
      return this._cache[n][ln];
    },
    set: function(n, ln, val) { 
      if(typeof this._cache[n] == 'undefined') { 
        this._cache[n] = []; 
      } 
      this._cache[n][ln] = val; 
    }
  };
  
})();  
// KeymanWeb 2.0
// Copyright 2010 Tavultesoft Pty Ltd

/*****************************************/
/*                                       */
/*   On-Screen (Visual) Keyboard Code    */
/*                                       */
/*****************************************/

(function()
{
  // Declare KeymanWeb object
  var keymanweb=window['tavultesoft']['keymanweb'];
  
  // Define standard keycode numbers  
  var keyCodes={
  	"K_BKSP":8,"K_TAB":9,"K_ENTER":13,
  	"K_SHIFT":16,"K_CONTROL":17,"K_ALT":18,"K_PAUSE":19,"K_CAPS":20,
  	"K_ESC":27,"K_SPACE":32,"K_PGUP":33,
  	"K_PGDN":34,"K_END":35,"K_HOME":36,"K_LEFT":37,"K_UP":38,
  	"K_RIGHT":39,"K_DOWN":40,"K_SEL":41,"K_PRINT":42,"K_EXEC":43,
  	"K_INS":45,"K_DEL":46,"K_HELP":47,"K_0":48,
  	"K_1":49,"K_2":50,"K_3":51,"K_4":52,"K_5":53,"K_6":54,"K_7":55,
  	"K_8":56,"K_9":57,"K_A":65,"K_B":66,"K_C":67,"K_D":68,"K_E":69,
  	"K_F":70,"K_G":71,"K_H":72,"K_I":73,"K_J":74,"K_K":75,"K_L":76,
  	"K_M":77,"K_N":78,"K_O":79,"K_P":80,"K_Q":81,"K_R":82,"K_S":83,
  	"K_T":84,"K_U":85,"K_V":86,"K_W":87,"K_X":88,"K_Y":89,"K_Z":90,
  	"K_NP0":96,"K_NP1":97,"K_NP2":98,
  	"K_NP3":99,"K_NP4":100,"K_NP5":101,"K_NP6":102,
  	"K_NP7":103,"K_NP8":104,"K_NP9":105,"K_NPSTAR":106,
  	"K_NPPLUS":107,"K_SEPARATOR":108,"K_NPMINUS":109,"K_NPDOT":110,
  	"K_NPSLASH":111,"K_F1":112,"K_F2":113,"K_F3":114,"K_F4":115,
  	"K_F5":116,"K_F6":117,"K_F7":118,"K_F8":119,"K_F9":120,
  	"K_F10":121,"K_F11":122,"K_F12":123,"K_NUMLOCK":144,"K_SCROLL":145,
  	"K_LSHIFT":160,"K_RSHIFT":161,"K_LCONTROL":162,"K_RCONTROL":163,	
  	"K_LALT":164,"K_RALT":165,
    "K_COLON":186,"K_EQUAL":187,"K_COMMA":188,"K_HYPHEN":189,
    "K_PERIOD":190,"K_SLASH":191,"K_BKQUOTE":192,
    "K_LBRKT":219,"K_BKSLASH":220,"K_RBRKT":221,
  	"K_QUOTE":222,"K_oE2":226,
    "K_LOPT":50001,"K_ROPT":50002,
    "K_NUMERALS":50003,"K_SYMBOLS":50004,"K_CURRENCIES":50005,
    "K_UPPER":50006,"K_LOWER":50007,"K_ALPHA":50008,
    "K_SHIFTED":50009,"K_ALTGR":50010,
    "K_TABBACK":50011,"K_TABFWD":50012
	};
  
  var codesUS=[['0123456789',';=,-./`','[\\]\''],[')!@#$%^&*(',':+<_>?~','{|}"']];

  var dfltCodes=["K_BKQUOTE","K_1","K_2","K_3","K_4","K_5","K_6","K_7","K_8","K_9","K_0",
    "K_HYPHEN","K_EQUAL","K_*","K_*","K_*","K_Q","K_W","K_E","K_R","K_T",
    "K_Y","K_U","K_I","K_O","K_P","K_LBRKT","K_RBRKT","K_BKSLASH","K_*",
    "K_*","K_*","K_A","K_S","K_D","K_F","K_G","K_H","K_J","K_K","K_L",
    "K_COLON","K_QUOTE","K_*","K_*","K_*","K_*","K_*","K_oE2",
    "K_Z","K_X","K_C","K_V","K_B","K_N","K_M","K_COMMA","K_PERIOD",
    "K_SLASH","K_*","K_*","K_*","K_*","K_*","K_SPACE"];
  
  var dfltText='`1234567890-=\xA7~~qwertyuiop[]\\~~~asdfghjkl;\'~~~~~?zxcvbnm,./~~~~~ '
              +'~!@#$%^&*()_+\xA7~~QWERTYUIOP{}\\~~~ASDFGHJKL:"~~~~~?ZXCVBNM<>?~~~~~ ';
    
  // Declare keymanweb osk, util and device objects
  var osk=keymanweb['osk'],util=keymanweb['util'],device=util.device,dbg=keymanweb.debug;
  
  osk._Box=null;              // Main DIV for OSK
	osk._DivVKbd=null;
  osk._DivVKbdHelp=null;
  osk._Visible=0;             // Whether or not actually visible
  osk._Enabled=1;             // Whether or not enabled by UI
  osk._VShift=[];
  osk._VKeySpans=[];
  osk._VKeyDown=null;
	osk._VKbdContainer=null;
	osk._VOriginalWidth=1;      // Non-zero default value needed
  osk._BaseLayout='us';       // default BaseLayout
  osk._BaseLayoutEuro={};     // I1299 (not currently exposed, but may need to be e.g. for external users)
  osk._BaseLayoutEuro['se'] = '\u00a71234567890+´~~~QWERTYUIOP\u00c5\u00a8\'~~~ASDFGHJKL\u00d6\u00c4~~~~~<ZXCVBNM,.-~~~~~ ';  // Swedish
  osk._BaseLayoutEuro['uk'] = '`1234567890-=~~~QWERTYUIOP[]#~~~ASDFGHJKL;\'~~~~~\\ZXCVBNM,./~~~~~ '; // UK
  
  // Additional members (mainly for touch input devices)
  osk.lgTimer=null;           // language switching timer
  osk.lgKey=null;             // language menu key element
  osk.hkKey=null;             // OSK hide key element
  osk.spaceBar=null;          // space bar key element
  osk.lgList=null;            // language menu list
  osk.frameColor='#ad4a28';   // KeymanWeb standard frame color
  osk.keyPending=null;        // currently depressed key (if any)
  osk.fontFamily='';          // layout-specified font for keyboard
  osk.fontSize='1em';         // layout-specified fontsize for keyboard
  osk.layout=null;            // reference to complete layout
  osk.layers=null;            // reference to layout (layers array for this device)
  osk.layerId='default';      // currently active OSK layer (if any)
  osk.nextLayer='default';    // layer to be activated after pressing key in current layer  
  osk.layerIndex=0;           // currently displayed layer index
  osk.currentKey='';          // id of currently pressed key (desktop OSK only)
  osk.subkeyDelayTimer=null;  // id for touch-hold delay timer
  osk.popupPending=false;     // KMTouch popup flag 
  osk.styleSheet=null;        // current OSK style sheet object, if any
  osk.loadRetry=0;            // counter for delayed loading, if keyboard loading prevents OSK being ready at start
  
  // Additional members for desktop OSK
  osk.x=99;                    // last visible offset left
  osk.y=0;                    // last visible offset top
  osk.width=1;                // Saved width of OSK (since actual width only available if visible)
  osk.height=1;               // Saved height of OSK
  osk.rowHeight=1;            // Current row height in px
  osk.nRows=1;                // Number of rows in each layer of current layout
  osk.vpScale=1;              // Current viewport scale factor  (not valid until initialized)
  osk.closeButton=null;       // icon to hide OSK
  osk.resizeIcon=null;        // resizing icon 
  osk.resizing=0;             // resizing flag
  osk.pinImg=null;            // icon to restore OSK to default position
  osk.userPositioned=0;       // Set to true(<>0) if dragged by user
  osk.dfltX='';               // Left position set by page code
  osk.dfltY='';               // Top position set by page code
  osk.noDrag=false;           // allow page to override user OSK dragging
  osk.shim=null;              // Shim DIV for OSK
  osk.keytip=null;            // Key hint (phones)
  osk.touchY=0;               // First y position of touched key

  /**
   * Function     addEventListener
   * Scope        Public
   * @param       {string}            event     event name
   * @param       {function(Object)}  func      event handler
   * @return      {boolean}   
   * Description  Wrapper function to add and identify OSK-specific event handlers
   */    
  osk['addEventListener'] = function(event, func)
  {
    return util.addEventListener('osk.'+event, func);
  }
  
  /**
   * Function     _TitleBarInterior
   * Scope        Private   
   * Description  Title bar interior formatting and element event handling
   */       
  osk._TitleBarInterior = function()
  {
    var Ldiv = util._CreateElement('DIV');
    var Ls = Ldiv.style;
    Ls.paddingLeft='2px';
    Ls.cursor='move';
    Ls.background='#ad4a28';
    Ls.font='8pt Tahoma,Arial,sans-serif';  //I2186
    
    // Add container for buttons, handle mousedown event
    var LdivButtons = util._CreateElement('DIV');
    LdivButtons.className = 'kmw-title-bar-actions';
    LdivButtons.onmousedown=osk._CancelMouse;

    // Add close button, handle click and mousedown events    
    var Limg = util._CreateElement('DIV');
    Limg.className='kmw-close-button';
    Limg.onmousedown=osk._CancelMouse;
    Limg.onclick=function () {osk._Hide(true);}
    osk.closeButton = Limg;    
    LdivButtons.appendChild(Limg);
    
    /**
     * Move OSK back to default position
     */    
    osk.restorePosition = function()
    {
      if(osk._Visible) 
      { 
        keymanweb._FocusLastActiveElement();  // I2036 - OSK does not unpin to correct location
        osk.loadCookie(); osk.userPositioned=false; osk.saveCookie();
        osk._Show();
        osk.doResizeMove(); //allow the UI to respond to OSK movements
      }
      if(osk.pinImg) osk.pinImg.style.display='none';
      if(window.event) window.event.returnValue=false;
    }
    
    // Add 'Unpin' button for restoring OSK to default location, handle mousedown and click events
    Limg=osk.pinImg = util._CreateElement('DIV');  //I2186
    Limg.className='kmw-pin-image';
    Limg.title='Pin the On Screen Keyboard to its default location on the active text box';
    Limg.onclick=osk.restorePosition;
    Limg.onmousedown=osk._CancelMouse;
    Limg.style.display='none'; 
    
    // Do not use Unpin button on touch screens (OSK location fixed)
    if(!device.touchable) LdivButtons.appendChild(Limg); // I3363 (Build 301)
    
    // Attach button container to title bar 
    Ldiv.appendChild(LdivButtons);

    // Add title bar caption
    Limg=keymanweb._TitleElement=util._CreateElement('SPAN');  // I1972
    Limg.className='kmw-title-bar-caption';
    Limg.innerHTML='Tavultesoft KeymanWeb';
    Ldiv.appendChild(Limg);
    
    return Ldiv;
  }
  
  // End of TitleBarInterior
               
  /**
   * Function     enabled
   * Scope        Public   
   * @return      {boolean|integer}    True if KMW OSK enabled
   * Description  Test if KMW OSK is enabled
   */    
  osk['isEnabled'] = osk.isEnabled = function()
  {
    return osk._Enabled;
  }

  /**
   * Function     isVisible
   * Scope        Public   
   * @return      {boolean|integer}    True if KMW OSK visible
   * Description  Test if KMW OSK is actually visible
   * Note that this will usually return false after any UI event that results in (temporary) loss of input focus    
   */    
  osk['isVisible'] = osk.isVisible = function()
  {    
    return osk._Visible;
  }

  /**
   * Function     getRect //TODO:  This is probably not correct, anyway!!!!!
   * Scope        Public   
   * @return      {Object.<string,number>}   Array object with position and size of OSK container
   * Description  Get rectangle containing KMW Virtual Keyboard 
   */    
  osk['getRect'] = osk.getRect = function()			// I2405
  {
    var p={};
    if(osk._DivVKbd)
    {
      p['left'] = p.left = util._GetAbsoluteX(osk._DivVKbd); 
      p['top']  = p.top  = util._GetAbsoluteY(osk._DivVKbd); 
      p['width']  = p.width  = util._GetAbsoluteX(osk._DivVKbdHelp) - util._GetAbsoluteX(osk._DivVKbd) + osk._DivVKbdHelp.offsetWidth;
      p['height'] = p.height = util._GetAbsoluteY(osk._DivVKbdHelp) - util._GetAbsoluteY(osk._DivVKbd) + osk._DivVKbdHelp.offsetHeight;
    }
    else
    {
      p['left'] = p.left = util._GetAbsoluteX(osk._Box); 
      p['top']  = p.top  = util._GetAbsoluteY(osk._Box); 
      p['width']  = p.width  = util._GetAbsoluteX(osk._Box) + osk._Box.offsetWidth;
      p['height'] = p.height = util._GetAbsoluteY(osk._Box) + osk._Box.offsetHeight;
    } 
    return p;
  } 

  /**
   * Allow the UI or page to set the position and size of the OSK
   * and (optionally) override user repositioning or sizing
   * 
   * @param       {Object.<string,number>}   p  Array object with position and size of OSK container
  **/    
  osk['setRect'] = osk.setRect = function(p)			
  {
    var q={};

    if(osk._Box == null || device.formFactor != 'desktop') return;
    
    var b=osk._Box,bs=b.style;
    if('left' in p)
    {
      bs.left=(p['left']-util._GetAbsoluteX(b)+b.offsetLeft)+'px';
      osk.dfltX=bs.left;
    }
    
    if('top' in p)
    {
      bs.top=(p['top']-util._GetAbsoluteY(b)+b.offsetTop)+'px';
      osk.dfltY=bs.top;
    }
    
    //Do not allow user resizing for non-standard keyboards (e.g. EuroLatin)
    if(osk._DivVKbd != null)
    {  
      var d=osk._DivVKbd,ds=d.style;
      
      // Set width, but limit to reasonable value
      if('width' in p)
      {
        var w=(p['width']-(b.offsetWidth-d.offsetWidth));
        if(w < 0.2*screen.width) w=0.2*screen.width; 
        if(w > 0.9*screen.width) w=0.9*screen.width;        
        ds.width=w+'px'; osk.width=w;
      }
      
      // Set height, but limit to reasonable value
      // This sets the default font size for the OSK in px, but that
      // can be modified at the key text level by setting 
      // the font size in em in the kmw-key-text class
      if('height' in p)
      {
        var h=(p['height']-(b.offsetHeight-d.offsetHeight));
        if(h < 0.1*screen.height) h=0.1*screen.height;
        if(h > 0.5*screen.height) h=0.5*screen.height;            
        ds.height=h+'px'; ds.fontSize=(h/8)+'px'; osk.height=h;
      }
      
      // Fix or release user resizing
      if('nosize' in p)
        if(osk.resizeIcon) osk.resizeIcon.style.display=(p['nosize'] ? 'none' : 'block');

    } 
    // Fix or release user dragging   
    if('nomove' in p)
    {
      osk.noDrag=p['nomove'];
      if(osk.pinImg) osk.pinImg.style.display=(p['nomove'] || !osk.userPositioned) ? 'none' : 'block';
    }
    // Save the user-defined OSK size
    osk.saveCookie();
  } 
 
    
  /**
   * Get position of OSK window
   * 
   * @return      {Object.<string,number>}     Array object with OSK window position
  **/    
  osk.getPos = function()
  {
    var Lkbd=osk._Box, p={};
    p.left = osk._Visible ? Lkbd.offsetLeft : osk.x; 
    p.top = osk._Visible ? Lkbd.offsetTop : osk.y; 
    return p;
  }
  
  /**
   * Function     setPos
   * Scope        Private   
   * @param       {Object.<string,number>}    p     Array object with OSK left, top
   * Description  Set position of OSK window, but limit to screen, and ignore if  a touch input device
   */    
  osk['setPos'] = osk.setPos = function(p)
  {
    if(typeof(osk._Box) == 'undefined' || device.touchable) return; // I3363 (Build 301)
    if(osk.userPositioned)
    {
      var Px=p['left'],Py=p['top'];
      if(typeof(Px) != 'undefined')
      {
        if(Px < -0.8*osk._Box.offsetWidth) Px = -0.8*osk._Box.offsetWidth; 
        if(osk.userPositioned) {osk._Box.style.left=Px+'px'; osk.x = Px;}  
      }
      // May not be needed - vertical positioning is handled differently and defaults to input field if off screen
      if(typeof(Py) != 'undefined')
      {
        if(Py < 0) Py = 0;  
        if(osk.userPositioned) {osk._Box.style.top=Py+'px'; osk.y = Py;}
      }
    }
        
    if(osk.pinImg)
      osk.pinImg.style.display=(osk.userPositioned ? 'block' : 'none');
  }
  
  /**
   * Function     _VKeyGetTarget
   * Scope        Private
   * @param       {Object}    e     OSK event
   * @return      {Object}          Target element for key in OSK
   * Description  Identify the OSK key clicked 
   */    
  osk._VKeyGetTarget = function(e)
  {
    var Ltarg;
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return null;
    if (e.target) Ltarg = e.target;
    else if (e.srcElement) Ltarg = e.srcElement;
    else return null;
    if (Ltarg.nodeType == 3) // defeat Safari bug
      Ltarg = Ltarg.parentNode;
    if (Ltarg.tagName == 'SPAN') Ltarg = Ltarg.parentNode;
    return Ltarg;
  }
   
   /**
   * Handle button touch event 
   * 
   * @param       {Object}    k      element touched
   * @param       {Object}    e      OSK event   
   */    
  osk.touchKey = function(k,e)
  {
    e.preventDefault(); e.cancelBubble=true;
    if(typeof e.stopImmediatePropagation == 'function') e.stopImmediatePropagation();
    else if(typeof e.stopPropagation == 'function') e.stopPropagation();

    // Ignore multi-touch events
    if(typeof e.touches == 'object' && e.touches.length > 1) return;

    osk.touchY=(typeof(e.touches) == 'object' ? e.touches[0].clientY : e.clientY);
     
    // Position and display the key tip (phones)    (Build 349)
    if(osk.keytip != null)
    {           
      if(k.className.indexOf('kmw-key-default') > 0 && k.id.indexOf('K_SPACE') < 0)
      {                      
        var kc=k.firstChild,kcs=kc.style,kt=osk.keytip,kts=kt.style;
        kt.textContent=kc.textContent;     
        kts.fontFamily=util.getStyleValue(kc,'font-family');
        var px=util.getStyleInt(kc,'font-size');
        if(px != 0) kts.fontSize=(1.5*px)+'px';
        var xLeft=util._GetAbsoluteX(k),
          xTop=util._GetAbsoluteY(k),
          xWidth=k.offsetWidth;
        
        // Cannot read height or width of tip, calculate from size of text and padding
        var tWidth=(1.5*kc.offsetWidth)+
            util.getStyleInt(kt,'padding-left')+
            util.getStyleInt(kt,'padding-right'),
          kmRight=util.getStyleInt(k,'margin-right'),
          tHeight=(1.5*kc.offsetHeight)+
            util.getStyleInt(kt,'padding-top')+
            util.getStyleInt(kt,'padding-bottom'),
          kmTop=util.getStyleInt(k,'margin-top');
        kts.left=(xLeft-kmRight+(xWidth-tWidth)/2)+'px';
        kts.top=(util._GetAbsoluteY(k)-kmTop-osk._Box.offsetTop-tHeight)+'px';
        kts.display='block';  
      }
    }
    
    // Get key name (K_...) from element ID
    var keyName=k.id.split('-')[1];

    // Special function keys need immediate action
    if(keyName == 'K_LOPT' || keyName == 'K_ROPT')
    {
      // TODO: using deferred action helps to prevent unwanted selection of background element 
      // on Android, but still doesn't do it properly
      osk.highlightKey(k,true);
      window.setTimeout(function(){osk.clickKey(k);},0);
    }
    // Also backspace, to allow delete to repeat while key held
    else if(keyName == 'K_BKSP')
    {
      osk.highlightKey(k,true);
      keymanweb.KO(1,keymanweb._LastActiveElement,"");
      osk.deleting=true;
      window.setTimeout(osk.repeatDelete,500);
    }
    // Otherwise enable keystroke on release
    else if(osk.keyPending == null) 
    {
      // Save active key to enable correct touch-move and release behaviour
      osk.keyPending=k; 
    
      // Highlight key when touched pending action or release 
      osk.highlightKey(k,true);
    
      // If this key has subkey, start timer to display subkeys after delay, set up release
      var popupDelay=(device.app == '' ? 500 : 100);  // Delay must be less than native touch-hold delay (build 352)
      if(k.subKeys != null) osk.subkeyDelayTimer=window.setTimeout(function(){osk.showSubKeys(k);},popupDelay);
  
    }
  } 
  
  /**
   *  Repeat backspace as long as the backspace key is held down
   **/      
  osk.repeatDelete = function()
  {
    if(osk.deleting)
    {
      keymanweb.KO(1,keymanweb._LastActiveElement,"");
      window.setTimeout(osk.repeatDelete,200);
    }
  }
  
  /**
   *  Add or remove a class from a keyboard key (when touched or clicked)
   *  (Assumes that there is a default class name as well.)   
   *  
   *  @param    {Object}    key   key affected
   *  @param    {boolean}   on    add or remove highlighting
   *  @param    {string=}   name  name of class to append, defaulting to kmw-key-touched     
   **/                  
  osk.highlightKey = function(key,on,name)
  {
    var classes=key.className,
        cs=arguments.length>2?' '+arguments[2]:' kmw-key-touched';
    if(classes != '')
    {  
      if(classes.indexOf(cs) >= 0)
      {
        if(!on) key.className=classes.replace(cs,'');
      }
      else
      {
        if(on) key.className=classes+cs;
      }
    }
  }
  
   /**
   * Highlight active keyboard button when moving pointer over key
   * 
   * @param       {Object}      k      element touched
   * @param       {Object}      e      OSK event   
   */    
  osk.moveOverKeys = function(k,e)
  { 
    e.preventDefault(); e.cancelBubble=true;
    if(typeof e.stopImmediatePropagation == 'function') e.stopImmediatePropagation();
    else if(typeof e.stopPropagation == 'function') e.stopPropagation();
    
    // Don't change highlighting unless a key is pressed
    if(osk.keyPending == null) return;
    
    // Get touch position, active key element coordinates, and active key name
    var x=typeof e.touches == 'object' ? e.touches[0].clientX : e.clientX,
        y=typeof e.touches == 'object' ? e.touches[0].clientY : e.clientY;
    var x0=util._GetAbsoluteX(k),y0=util._GetAbsoluteY(k),//-document.body.scrollTop,
      x1=x0+k.offsetWidth,y1=y0+k.offsetHeight,
      keyName=k.id.split('-')[1],
      onKey=(x > x0 && x < x1 && y > y0 && y < y1);
    
    // Control key highlighting for KeymanWeb 
    if(device.app == '') 
    {
      // Highlight key at touch position (except for special control keys, for which separate timing is needed)
      if(keyName != 'K_LOPT' && keyName != 'K_ROPT') osk.highlightKey(k,onKey);  
  
      // Test for subkey array, highlight key at touch position (and clear other highlighting) if so
      if(k.subKeys != null)
      {
        var i,sk,skBox;
        skBox=document.getElementById('kmw-popup-keys');
 
        // Show popup keys immediately if touch moved up towards key array (KMEW-100, Build 353)
        if((osk.touchY-y > 5) && skBox == null)
        {
          if(osk.subkeyDelayTimer) window.clearTimeout(osk.subkeyDelayTimer);
          osk.showSubKeys(k); skBox=document.getElementById('kmw-popup-keys');
        } 
 
        for(i=0; i<k.subKeys.length; i++)
        {
          try 
          {
            sk=skBox.childNodes[i].firstChild;
            x0=util._GetAbsoluteX(sk); y0=util._GetAbsoluteY(sk);//-document.body.scrollTop;
            x1=x0+sk.offsetWidth; y1=y0+sk.offsetHeight;
            onKey=(x > x0 && x < x1 && y > y0 && y < y1);
            osk.highlightKey(sk,onKey);
            if(onKey) osk.highlightKey(k,false);
          } catch(ex){}           
        }    
      }
    }
    // and for KeymanTouch
    else
    {
      osk.highlightKey(k,onKey);
      
      //Prevent pop-up key array from being displayed if already moved off key
      // This is no longer used - cleared by delay instead
      // if(!onKey  && osk.popupPending && typeof(window['oskCreatePopup']) == 'function') 
      // {
      //   window['oskCreatePopup'](null,0,0); osk.popupPending = false;
      // } 
    }
  }
     
   /**
   * Display touch-hold array of 'sub-keys' above the currently touched key
   * @param       {Object}    e      primary key element 
   */    
  osk.showSubKeys = function(e)
  {
    // Do not show subkeys if key already released
    if(osk.keyPending == null) return;

    // Clear keytip hint if any
    if(osk.keytip != null) osk.keytip.style.display='none';
    
    // Do not display subkey array for Shift if extra layers do not exist
    
    // Create holder DIV for subkey array, and set styles
    
    // The holder is position:fixed, but the keys do not need to be, as no scrolling 
    // is possible while the array is visible.  So it is simplest to let the keys have
    // position:static and display:inline-block
    var subKeys=document.createElement('DIV'),i,sk,
      t,ts,t1,ts1,kDiv,ks,btn,bs;
    
    subKeys.id='kmw-popup-keys';
    
    // Must set position dynamically, not in CSS
    var ss=subKeys.style;
    ss.bottom=(parseInt(e.style.bottom,10)+parseInt(e.style.height,10)+10)+'px';

    // Set key font according to layout, or defaulting to OSK font
    // (copied, not inherited, since OSK is not a parent of popup keys)
    ss.fontFamily=osk.fontFamily;

    // Copy the font size from the parent key, allowing for style inheritance
    ss.fontSize=util.getStyleValue(e,'font-size');
    ss.visibility='hidden';
 
    var nKeys=e.subKeys.length,nRow,nRows,nCols;
    nRows=Math.min(Math.ceil(nKeys/9),2);
    nCols=Math.ceil(nKeys/nRows);
    if(nRows > 1) ss.width=(nCols*e.offsetWidth+nCols*5)+'px';

    
    // Add nested button elements for each sub-key
    for(i=0; i<nKeys; i++)
    {
      sk=e.subKeys[i];   
      kDiv=document.createElement('DIV');
      kDiv.className='kmw-key-square-ex';
      kDiv.keyId=sk['id'];          
      ks=kDiv.style; 
      nRow=Math.floor(i/nCols);
      if(nRows > 1 && nRow > 0) ks.marginTop='5px'; 
      if(typeof sk['width'] != 'undefined')
        kDiv.width=ks.width=(parseInt(sk['width'],10)*e.offsetWidth/100)+'px';
      else      
        kDiv.width=ks.width=e.offsetWidth+'px'; 
      ks.height=e.offsetHeight+'px';
      
      btn=document.createElement('DIV');
      osk.setButtonClass(sk,btn);
      
      // Create (temporarily) unique ID by prefixing 'popup-' to actual key ID
      if(typeof(sk['layer']) == 'string' && sk['layer'] != '')
        btn.id='popup-'+sk['layer']+'-'+sk['id'];
      else
        btn.id='popup-default-'+sk['id'];    
      
      // Must set button size (in px) dynamically, not from CSS
      bs=btn.style; bs.height=ks.height; bs.width=ks.width;
      bs.boxSizing=bs.MozBoxSizing='border-box';
        
      // Must set position explicitly, at least for Android
      bs.position='absolute';     
      
      t=util._CreateElement('SPAN'); 
      t.className='kmw-key-text'; 
      if(sk['text'] == null || sk['text'] == '') 
      {
        t.innerHTML='\xa0';
        if(typeof sk['id'] == 'string')
        {
          if(/^U_[0-9A-F]{4}$/i.test(sk['id'])) 
            t.innerHTML=String.fromCharCode(parseInt(sk['id'].substr(2),16));
        } 
      } 
      else t.innerHTML=sk['text'];
      
      // The following  line is needed to ensure correct cell sizing with auto-sized container            
      bs.overflow='hidden';
      bs.border='1px solid #888888'; 
      bs.webkitTapHighlightColor='rgba(0,0,0,0)';

      // Override the font name and size if set in the layout
      ts=t.style; 
      ts.fontSize=osk.fontSize;     //Build 344, KMEW-90 
      if(typeof sk['font'] == 'string' && sk['font'] != '') ts.fontFamily=sk['font'];      
      if(typeof sk['fontsize'] == 'string' && sk['fontsize'] != 0) ts.fontSize=sk['fontsize']; 
 
      btn.appendChild(t);                              
      kDiv.appendChild(btn);
      subKeys.appendChild(kDiv);      
    }
                                                                                   
    // Send the subkey array to iOS, with centre,top of base key position
    if(device.app != '' && typeof(window['oskCreatePopup']) == 'function')
    {                           
      var xBase=util._GetAbsoluteX(e)-util._GetAbsoluteX(osk._DivVKbd)+e.offsetWidth/2,
          yBase=util._GetAbsoluteY(e)-util._GetAbsoluteY(osk._DivVKbd);
      osk.popupPending=true;
      window['oskCreatePopup'](e.subKeys,xBase,yBase);
      
      // Since the pop-up keys are created with a separate thread, we need to
      // suppress key action - especially layer change - until key touched again. 
      // This helped for KMEA but caused issues for KMEI and has now been disabled again.
      // May want to restrict this fix to KMEA Shift key. (KMEA-1)
      //osk.highlightKey(osk.keyPending,false);
      //osk.keyPending=null;     
      
      return;
    }

    // Otherwise append the touch-hold (subkey) array to the OSK    
    osk._Box.appendChild(subKeys);

    // And correct its position with respect to that element
    ss=subKeys.style;
    var x=util._GetAbsoluteX(e)+0.5*(e.offsetWidth-subKeys.offsetWidth), y,
      xMax=(util.landscapeView()?screen.height:screen.width)-subKeys.offsetWidth;
    
    if(x > xMax) x=xMax; if(x < 0) x=0; ss.left=x+'px';   
    
    // Then add the callout DIV triangle (with a border, by superposing a second DIV triangle)
    t=document.createElement('DIV'); t.className='arrow-border'; ts=t.style;
    x=util._GetAbsoluteX(e)+0.5*e.offsetWidth-16;
    y=subKeys.offsetTop+subKeys.offsetHeight-1;
    ts.left=x+'px'; ts.top=y+'px';
    
    t1=document.createElement('DIV'); t1.className='arrow-content'; 
    ts=t1.style;
    ts.left=(x+1)+'px'; ts.top=(y-1)+'px';
    t.appendChild(t1);
    
    subKeys.appendChild(t);  
    
    // Finally make it visible
    ss.visibility='visible'; 
  }
         
  /**
   * Function     getVKDictionaryCode
   * Scope        Private
   * @param       {string}      keyName   custom virtual key code to lookup in the dictionary   
   * @return      {number}                key code > 255 on success, or 0 if not found
   * Description  Look up a custom virtual key code in the virtual key code dictionary KVKD.  On first run, will build the dictionary.
   */    
  osk.getVKDictionaryCode = function(keyName)
  {
    if(!keymanweb._ActiveKeyboard['VKDictionary'])
    {
      var a=[];
      if(typeof keymanweb._ActiveKeyboard['KVKD'] == 'string') 
      {
        // Build the VK dictionary
        // TODO: Move the dictionary build into the compiler -- so compiler generates code such as following.  Makes the VKDictionary member unnecessary 
        //       this.KVKD={"K_ABC":256,"K_DEF":257,...};
        var s=keymanweb._ActiveKeyboard['KVKD'].split(' ');
        for(var i=0; i<s.length; i++) a[s[i]]=i+256;
      }
      keymanweb._ActiveKeyboard['VKDictionary']=a;
    }
    
    var res=keymanweb._ActiveKeyboard['VKDictionary'][keyName];
    return res ? res : 0;
  }
  
  /**
   * Simulate a keystroke according to the touched keyboard button element
   * 
   * @param       {Object}      e      element touched (or clicked)
   */    
  osk.clickKey = function(e)
  { 
    var Lelem = keymanweb._LastActiveElement, Ls, Le, Lkc, Lsel;    

    // Each button id is of the form <layer>-<keyCode>, e.g. 'ctrlshift-K_Q' or 'popup-shift-K_501', etc.
    var t=e.id.split('-');
    if(t.length < 2) return true; //shouldn't happen, but...
 
    // Test of code used for callback from KMEI, KMEA   (Build 353)
    //if(t[0] == 'popup') {keymanweb['executePopupKey'](e.id.replace('popup-','')); return true;}

    // Remove popup prefix before processing keystroke (KMEW-93)
    if(t[0] == 'popup') t.splice(0,1);
        
    if(Lelem != null)
    {
      // Get key name and keyboard shift state (needed only for default layouts and physical keyboard handling) 
      var layer=t[0],keyName=t[1], keyShiftState=osk.getModifierState(osk.layerId),nextLayer=keyShiftState;

      if(typeof(e.key) != 'undefined') nextLayer=e.key['nextlayer']; 
      if(keymanweb._ActiveElement == null) keymanweb._ActiveElement=Lelem;    
      switch(keyName)
      {
        case 'K_LSHIFT':
        case 'K_RSHIFT':
        case 'K_SHIFT':
          osk.highlightKey(e,false);
          osk.updateLayer(nextLayer ? nextLayer : 'shift');
          osk._Show();
          return true;
        case 'K_LCONTROL':
        case 'K_RCONTROL':
        case 'K_LCTRL':
        case 'K_RCTRL':
        case 'K_CTRL':        
          osk.highlightKey(e,false);
          osk.updateLayer(nextLayer ? nextLayer : 'ctrl');
          osk._Show();
          return true;
        case 'K_LALT':
        case 'K_RALT':
        case 'K_ALT':
          osk.highlightKey(e,false);
          osk.updateLayer(nextLayer ? nextLayer : 'alt');
          osk._Show();
          return true;
        case 'K_ALTGR':
          osk.highlightKey(e,false);
          osk.updateLayer(nextLayer ? nextLayer : 'ctrlalt');
          osk._Show();
          return true;
        case 'K_LOPT':
          if(device.app == '')
            osk.showLanguageMenu();
          else
          {
            osk.highlightKey(e,false);            
            if('showKeyboardList' in keymanweb) keymanweb['showKeyboardList']();
          }   
          return true;
        case 'K_ROPT':
          if(device.app == '')
          { 
            keymanweb._IsActivatingKeymanWebUI=0; osk._Hide(true); 
            keymanweb.hideCaret(); keymanweb._LastActiveElement = 0;
          }
          else
          {
            osk.highlightKey(e,false);            
            if('hideKeyboard' in keymanweb) keymanweb['hideKeyboard']();
          }
          return true;
          
        case 'K_CURRENCIES':
        case 'K_NUMERALS':
        case 'K_SHIFTED': 
        case 'K_UPPER':
        case 'K_LOWER':
        case 'K_SYMBOLS':
          osk.highlightKey(e,false);
          osk.updateLayer(nextLayer ? nextLayer : 'default');
          osk._Show();        
          return true;         
          
        default:
      }        

      // Restore default key color
      osk.highlightKey(e,false);

      // Prevent any output from 'ghost' (unmapped) keys
      if(keyName != 'K_SPACE')
      {
        var keyText=e.childNodes[0].innerHTML;
        if(keyText == '' || keyText == '&nbsp;') return true;
      }

      Ls=Lelem._KeymanWebSelectionStart;
      Le=Lelem._KeymanWebSelectionEnd;
      Lsel=keymanweb._Selection; 
      keymanweb._IsActivatingKeymanWebUI = 1;
      keymanweb._IgnoreNextSelChange = 100;
      keymanweb._FocusLastActiveElement();
      if(keymanweb._IsMozillaEditableIframe(Lelem,0)) Lelem = Lelem.documentElement;
      if(document.selection && Lsel != null) Lsel.select();
      Lelem._KeymanWebSelectionStart=Ls;
      Lelem._KeymanWebSelectionEnd=Le;
      keymanweb._IgnoreNextSelChange = 0;
       // ...end I3363 (Build 301)     
      keymanweb._CachedSelectionStart = null; // I3319
      keymanweb._DeadkeyResetMatched();       // I3318

      // First check the virtual key, and process shift, control, alt or function keys 
      Lkc = {Ltarg:Lelem,Lmodifiers:0,Lcode:keyCodes[keyName],LisVirtualKey:true}; 

      // Set LisVirtualKey to flase to ensure that nomatch rule does not fire for U_xxxx keys
      if(keyName.substr(0,2) == 'U_') Lkc.LisVirtualKey=false;

      // Get code for non-physical keys (T_KOKAI, U_05AB etc)
      if(typeof Lkc.Lcode == 'undefined')
      {
        Lkc.Lcode = osk.getVKDictionaryCode(keyName);// Updated for Build 347
        if(!Lkc.Lcode)
        {
          // Key code will be Unicode value for U_xxxx keys
          if(keyName.substr(0,2) == 'U_')
          {                 
            var tUnicode=parseInt(keyName.substr(2),16);
            if(!isNaN(tUnicode)) Lkc.Lcode=tUnicode;  
          }
        }
      }

      // Override key shift state if specified for key in layout (corrected for popup keys KMEW-93)            
      var lx=(typeof e.key == 'undefined' ? null : e.key['layer']);
      if(lx == null) 
        keyShiftState=osk.getModifierState(layer);
      else
        keyShiftState=osk.getModifierState(lx);                 

      // Define modifiers value for sending to keyboard mapping function
      Lkc.Lmodifiers = keyShiftState*0x10; 

      // Include *limited* support for mnemonic keyboards (Sept 2012)
      if(keymanweb._ActiveKeyboard && (keymanweb._ActiveKeyboard['KM']))
      {         
        var keyText=e.firstChild.firstChild.wholeText;
        Lkc.LisVirtualKey=false; Lkc.LisVirtualKeyCode=false;
        Lkc.vkCode=Lkc.Lcode;      
        if(Lkc.Lcode != 32) // exception required, March 2013
        {
          if(typeof keyText == 'string' && keyText != '')
            Lkc.Lcode=keyText.charCodeAt(0);
          else
            Lkc.Lcode=0;          
          if(Lkc.Lcode == 160) Lkc.Lcode = 0;
        }
        Lkc.Lmodifiers=0;  
      }
      else Lkc.vkCode=Lkc.Lcode;

      // Support version 1.0 KeymanWeb keyboards that do not define positional vs mnemonic
      if(typeof keymanweb._ActiveKeyboard['KM'] == 'undefined')
      {
        Lkc.Lcode=keymanweb._USKeyCodeToCharCode(Lkc); Lkc.LisVirtualKey=false;
      }
      // Pass this key code and state to the keyboard program
      if(!keymanweb._ActiveKeyboard || (Lkc.Lcode != 0 && !keymanweb._ActiveKeyboard['gs'](Lelem, Lkc))) 
      {              
        // Restore the virtual key code if a mnemonic keyboard is being used
        Lkc.Lcode=Lkc.vkCode;  

        // Handle unmapped keys, including special keys 
        switch(keyName)
        {
          case 'K_BKSP':  //Only desktop UI, not touch devices. TODO: add repeat while mouse down for desktop UI 
            keymanweb.KO(1,keymanweb._LastActiveElement,"");               
            break;
          case 'K_TAB':
            var bBack=(osk.layerId == 'shift');
            keymanweb.moveToNext(bBack);         
            break;
          case 'K_TABBACK':
            keymanweb.moveToNext(true);         
            break;
          case 'K_TABFWD':          
            keymanweb.moveToNext(false);         
            break;            
          case 'K_ENTER':     
            // Insert new line in text area fields
            if(Lelem.nodeName == 'TEXTAREA' || (typeof Lelem.base != 'undefined' && Lelem.base.nodeName == 'TEXTAREA')) 
              keymanweb.KO(0, Lelem, '\n');
            // Or move to next field from TEXT fields
            else
            { 
              if(Lelem.nodeName == 'INPUT' && (Lelem.type == 'search' || Lelem.type == 'submit'))
                Lelem.form.submit();
              else if(typeof(Lelem.base) != 'undefined' && (Lelem.base.type == 'search' || Lelem.base.type == 'submit'))
              {
                Lelem.base.disabled=false;  
                Lelem.base.form.submit();
              }
              else 
                keymanweb.moveToNext(false);                         
             }
            break;
          case 'K_SPACE':
            keymanweb.KO(0, Lelem, ' ');
            break;
          default:
          // All of the following is physical layout dependent, so should be avoided if possible.  All keys should be mapped.
            var ch=0,n=Lkc.Lcode;
            // Test for fall back to U_xxxx key id (Build 350)            
            if((keyName.substr(0,2) == 'U_') && (n > 32) && !(n>127 && n<!160))  
              ch=String.fromCharCode(n);
            else if(n >= 48 && n <= 57)
              ch = codesUS[keyShiftState][0][n-48];
            else if(n >=65 && n <= 90)
              ch = String.fromCharCode(n+(keyShiftState?0:32));
            else if(n >= 186 && n <= 192)
              ch = codesUS[keyShiftState][1][n-186];
            else if(n >= 219 && n <= 222)
              ch = codesUS[keyShiftState][2][n-219];

            if(ch)keymanweb.KO(0, Lelem, ch);           
        }        
      }

      // Test if this key has a non-default next layer
      if(typeof e.key != 'undefined' && e.key['nextlayer'] !== null) osk.nextLayer=e.key['nextlayer'];

      // Refresh the OSK if a different layer must be displayed
      if(osk.nextLayer != osk.layerId)
      {
        osk.layerId=osk.nextLayer; 
        osk._Show();
      }                

      /* I732 END - 13/03/2007 MCD: End Positional Layout support in OSK */
      Lelem._KeymanWebSelectionStart=null;
      Lelem._KeymanWebSelectionEnd=null;
    }
    keymanweb._IsActivatingKeymanWebUI = 0;	// I2498 - KeymanWeb OSK does not accept clicks in FF when using automatic UI
    return true;  
  }    

   /**
   * Function     getlayerId
   * Scope        Private
   * @param       {number}      m     shift modifier code
   * @return      {string}            layer string from shift modifier code (desktop keyboards)
   * Description  Get name of layer form code (Note reversal: ctrlalt, not altctrl)
   */    
  osk.getLayerId = function(m)
  {
    var s='';
    if(m == 0) return 'default';
    if(m & 1) s = 'shift';
    if(m & 4) s = 'alt'+s;
    if(m & 2) s = 'ctrl'+s;
    return s;
  }
  
  /**
   * Get modifier key state from layer id
   * 
   * @param       {string}      layerId       layer id (e.g. ctrlshift)
   * @return      {number}                    modifier key state (desktop keyboards)
   */    
  osk.getModifierState = function(layerId)
  {
      var modifier=0;   
      if(layerId.indexOf('shift') >= 0) modifier += 1;
      if(layerId.indexOf('ctrl')  >= 0) modifier += 2;
      if(layerId.indexOf('alt')   >= 0) modifier += 4;
      return modifier;
  }
  
  /**
   * Sets the new layer id, allowing for toggling shift/ctrl/alt
   * 
   * @param       {string}      id      layer id (e.g. ctrlshift)
   */    
  osk.updateLayer = function(id)
  {
    var s=osk.layerId,idx=id;
    // Need to test if target layer is a standard layer
    idx=idx.replace('shift','');
    idx=idx.replace('ctrl','');
    idx=idx.replace('alt','');
    // If default or a non-standard layer, select it
    if(osk.layerId == 'default' || osk.layerId == 'numeric' || osk.layerId == 'symbol' || osk.layerId == 'currency' || idx != '')
    {
      s = id; 
    }
    // Otherwise modify the layer according to the current state and key pressed
    else
    {
      var modifier=osk.getModifierState(s);
      s=s.replace('shift','');
      s=s.replace('ctrl','');
      s=s.replace('alt','');
      switch(id)
      {
        case 'shift':
          modifier ^= 1; break;
        case 'ctrl':
          modifier ^= 2; break;
        case 'alt':
          modifier ^= 4; break;
        default:
          s = id;   
      }
      //
      if(s != 'default')
      {
        if(modifier & 1) s = 'shift'+s;
        if(modifier & 2) s = 'ctrl'+s;
        if(modifier & 4) s = 'alt'+s;
      }
    }
    if(s == '') s = 'default';

    // Re-order alt-ctrl (layer is called ctrlalt, since that is more familiar)
    osk.layerId = s.replace('altctrl','ctrlalt');
 
    // Check that requested layer is defined   (KMEA-1, but does not resolve issue)
    for(var i=0; i<osk.layers.length; i++)
      if(osk.layerId == osk.layers[i].id) return;

    // Show default layer if an undefined layer has been requested
    osk.layerId='default';
    
  }   

  /**
   * Indicate the current language and keyboard on the space bar
   **/
  osk.showLanguage = function()
  {
    var lgName='',kbdName='';

    if(keymanweb._ActiveStub)
    {
      lgName=keymanweb._ActiveStub['KL'];
      kbdName=keymanweb._ActiveStub['KN'];
    }
    else if(keymanweb._ActiveLanguage)
      lgName=keymanweb._ActiveLanguage['KN'];
    else
      lgName='English';

    try
    {
      var t=osk.spaceBar.firstChild.firstChild;
      if(typeof(t.parentNode.className) == 'undefined' || t.parentNode.className == '')
        t.parentNode.className='kmw-spacebar';
      else
        t.parentNode.className +=' kmw-spacebar';
      
      t.className='kmw-spacebar-caption';
      kbdName=kbdName.replace(/\s*keyboard\s*/i,'');
      if(kbdName == lgName) t.innerHTML=lgName; else t.innerHTML=lgName+' ('+kbdName+')';
    }
    catch(ex){}    
  }
      
  /**
   * Cancel any pending (timed) keystroke touch events 
   * 
   * @param       {Object}      Ltarg     touched element
   * @param       {Object}      e         touchend event
   */    
  osk.releaseKey = function(Ltarg,e)
  { //if(Ltarg.keyCode.Lcode != -4) return;
    e.preventDefault(); e.cancelBubble=true;
    if(typeof e.stopImmediatePropagation == 'function') e.stopImmediatePropagation(); 
    else if(typeof e.stopPropagation == 'function') e.stopPropagation(); 
      
    //Clear the keytip, if any
    if(osk.keytip != null) osk.keytip.style.display='none';
    
    if(osk.subkeyDelayTimer) window.clearTimeout(osk.subkeyDelayTimer);
    if(osk.lgTimer) window.clearTimeout(osk.lgTimer);
    osk.subkeyDelayTimer=osk.lgTimer=null; 
 
    // Remove highlighting from backspace key 
    if(e.target.id && e.target.id.indexOf('K_BKSP') >= 0)
      osk.highlightKey(e.target,false);
    else if(e.target.parentNode.id && e.target.parentNode.id.indexOf('K_BKSP') >= 0)
      osk.highlightKey(e.target.parentNode,false); 
    osk.deleting=false;

    if(osk.keyPending !== null)
    {   
      var lastKey=null;    
      if(typeof e.changedTouches != 'undefined' && e.changedTouches.length > 0)
        lastKey=document.elementFromPoint(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
      else if(typeof e.target != 'undefined') 
        lastKey=e.target;

      if(lastKey != null) 
      {
        if(lastKey.id == '') lastKey=lastKey.parentNode;
        {          

          // Check that still in subkey array or on original target, then execute keystroke if so
          if(lastKey == osk.keyPending || lastKey.parentNode.parentNode.id == 'kmw-popup-keys') 
          {             
            osk.clickKey(lastKey); osk.keyPending=null; 
          }
          else
          {
            osk.highlightKey(osk.keyPending,false);
          }
        }          
      }
      osk.keyPending=null; 
    }    
    
    // Remove the subkey array, if any
    var sk=document.getElementById('kmw-popup-keys');
    if(sk != null) sk.parentNode.removeChild(sk);
  }
  
  /**
   * Display list of installed keyboards in pop-up menu
   **/    
  osk.showLanguageMenu = function()
  {
    var n=0,kbdList=keymanweb._KeyboardStubs,nKbds=kbdList.length;  
    if(nKbds < 1) return;
            
    // Create the menu list container element 
    var menu=osk.lgList=util._CreateElement('DIV'),ss;
    osk.lgList.id='kmw-language-menu';
    
    // Insert a transparent overlay to prevent anything else happening during keyboard selection,
    // but allow the menu to be closed if anywhere else on screen is touched
    menu.shim=util._CreateElement('DIV');
    menu.shim.id='kmw-language-menu-background';
    menu.shim.addEventListener('touchstart',
      function(e)
      {
        e.preventDefault(); osk.hideLanguageList();
        if(e.touches.length > 1) 
        {
          var sX=e.touches[1].pageX,sY=e.touches[1].pageY;
          if(sX > osk.hkKey.offsetLeft && sX < osk.hkKey.offsetLeft+osk.hkKey.offsetWidth &&
             sY > osk.hkKey.offsetTop && sY < osk.hkKey.offsetTop+osk.hkKey.offsetHeight) osk.showBuild();
        }
      },false);   
    document.body.appendChild(menu.shim);
            
    // Add two nested DIVs to properly support iOS scrolling with momentum 
    //  c.f. https://github.com/joelambert/ScrollFix/issues/2
    var m2=util._CreateElement('DIV'),s2=m2.style,
        m3=util._CreateElement('DIV'),s3=m3.style;
    m2.id='kmw-menu-scroll-container'; m3.id='kmw-menu-scroller';

    // Support momentum scrolling on iOS
    if('WebkitOverflowScrolling' in s2) s2.WebkitOverflowScrolling='touch'; 
        
    m2.appendChild(m3); 
    menu.appendChild(m2);

    // Add menu index strip
    var i,x,mx=util._CreateElement('DIV');
    mx.id='kmw-menu-index';
    for(i=1; i<=26; i++)
    {
      x=util._CreateElement('P'); 
      x.innerHTML=String.fromCharCode(i+64);
      mx.appendChild(x);
    } 
  
    // Add index selection (for a large menu)
    mx.ontouchstart=function(e){osk.scrollToLanguage(e,m2,m3);}
    menu.appendChild(mx);
        
 //TODO: not sure if either of these two handlers ar actually needed.  touchmove handler may be doing all that is necessary.   
    // Add scroll end event handling to override body scroll
    menu.addEventListener('scroll',function(e){
      osk.lgList.scrolling=true;
      },false);
    m2.addEventListener('scroll',function(e){
      //osk.lgList.scrolling=true;
      if(m2.scrollTop < 1)m2.scrollTop=1;
      if(m2.scrollTop > m2.scrollHeight-m2.offsetHeight-1)m2.scrollTop=m2.scrollHeight-m2.offsetHeight-1;
      },false);

    // Add a list of keyboards to the innermost DIV
    osk.lgList.activeLgNo=osk.addLanguagesToMenu(m3,kbdList);
    
    // Get number of visible (language) selectors
    var nLgs=m3.childNodes.length-1;
     
    // Do not display until sizes have been calculated
    osk.lgList.visibility='hidden';
   
    // Append menu to document body, not to OSK
    document.body.appendChild(osk.lgList); 

    // Adjust size for viewport scaling (probably not needed for iOS, but check!)
    if(device.OS == 'Android' && 'devicePixelRatio' in window)
      osk.lgList.style.fontSize=(2/window.devicePixelRatio)+'em';    
     
    // Adjust height according to user-set style
    var itemHeight=m3.firstChild.offsetHeight,barWidth=0,
        s=menu.style,menuHeight=nLgs*itemHeight,
        maxHeight=window.innerHeight-osk.lgKey.offsetHeight-16; 
    menu.firstY=0;
    
    // Adjust width for pixel scaling on Android tablets
    if(device.OS == 'Android' && device.formFactor == 'tablet' && 'devicePixelRatio' in window)
    {
      var w=parseInt(util.getStyleValue(menu,'width'),10),ms=menu.style;
      if(!isNaN(w)) ms.width=ms.maxWidth=(2*w/window.devicePixelRatio)+'px';
      w=parseInt(util.getStyleValue(m2,'width'),10); ms=m2.style;
      if(!isNaN(w)) ms.width=ms.maxWidth=(2*w/window.devicePixelRatio)+'px';      
      w=parseInt(util.getStyleValue(m3,'width'),10); ms=m3.style;
      if(!isNaN(w)) ms.width=ms.maxWidth=(2*w/window.devicePixelRatio)+'px';      
    }
  
    // Correct maxheight for viewport scaling (iPhone/iPod only)
    if(device.OS == 'iOS' && device.formFactor == 'phone')
    {
      barWidth=(util.landscapeView() ? 36 : 0);
      maxHeight=(maxHeight-barWidth)*util.getViewportScale();
    }
    
    // Explicitly set position and height 
    s.left=util._GetAbsoluteX(osk.lgKey)+'px'; 
    if(menuHeight > maxHeight) menuHeight=maxHeight;
    s.height=menuHeight+'px';

    // Anchor menu to bottom of screen, except for Firefox!   
    if('onmozorientationchange' in screen)   // probably the best test for Firefox
    {
      s.top=(util._GetAbsoluteY(osk._Box)+osk._Box.offsetHeight-menuHeight+window.pageYOffset-4)+'px';
      s.bottom='auto';
    }
    else
    {
      s.bottom=-window.pageYOffset+barWidth+'px';
      s.top='auto';
    }
    
    // Explicitly set the scroller and index heights to the container height
    mx.style.height=s2.height=s.height;
    
    // Adjust the index font size and line height
    var dy=mx.childNodes[1].offsetTop-mx.childNodes[0].offsetTop,
        lineHeight=Math.floor(menu.offsetHeight/26.0),
        scale=Math.round(100.0*lineHeight/dy)/100.0,
        factor=(scale > 0.6 ? 1 : 2);

    if(scale > 1.25) scale=1.25;
    
    for(i=0;i<26;i++)
    {
      var qs=mx.childNodes[i].style;
      if(factor == 2 && (i%2) == 1) 
      {
        qs.display='none';        
      }
      else
      {
        qs.fontSize=(scale*factor)+'em';
        qs.lineHeight=(lineHeight*factor)+'px';
      }
    }

    // Increase width of outer menu DIV by index, else hide index
    var menuWidth=m2.offsetWidth;
    if(m2.scrollHeight > m2.offsetHeight+2)
      menuWidth = menuWidth+mx.offsetWidth;
    else
      mx.style.display='none';
    menu.style.width=menuWidth+'px';

    // Now display the menu
    osk.lgList.visibility='';
    
    // Set initial scroll to show current language (but never less than 1, to avoid dragging body)
    var top=m3.firstChild.offsetHeight*osk.lgList.activeLgNo+1;
    m2.scrollTop=top;

    // The scrollTop value is limited by the device, and must be limited to avoid dragging the document body
    if(m2.scrollTop < top) m2.scrollTop=m2.scrollHeight-m2.offsetHeight;
    if(m2.scrollTop > m2.scrollHeight-m2.offsetHeight-1)m2.scrollTop=m2.scrollHeight-m2.offsetHeight-1;

  }   

  /**
   * Add an index to the language menu
   * 
   *  @param  {Object}  e         touch start event from index   
   *  @param  {Object}  m2        menu scroller DIV
   *  @param  {Object}  menu      DIV with list of languages  
   */             
  osk.scrollToLanguage = function(e,m2,menu)
  {
    e.stopImmediatePropagation();e.preventDefault();
    if(e.touches[0].target.nodeName != 'P') return;    
    var i,t,top=0,initial=e.touches[0].target.innerHTML.charCodeAt(0),nn=menu.childNodes;
    try {
      for(i=0; i<nn.length-1; i++)
      {
        t=nn[i].firstChild.innerHTML.toUpperCase().charCodeAt(0);
        if(t >= initial) break; 
      }      
    }    
    catch(ex){}
    try
    {
      top=menu.firstChild.offsetHeight*i+1; 
      m2.scrollTop=top;
    }
    catch(ex){top=0;}
    try
    {
      if(m2.scrollTop < top) m2.scrollTop=m2.scrollHeight-m2.offsetHeight;
      if(m2.scrollTop > m2.scrollHeight-m2.offsetHeight-1) m2.scrollTop=m2.scrollHeight-m2.offsetHeight-1;
    } 
    catch(ex){}
  }
  
  /**
   * Display all languages for installed keyboards in scrollable list
   * 
   *    @param    {Object}    menu      DIV to which language selectors will be added
   *    @param    {Object}    kbdList   array of keyboard stub objects
   *    @return   {number}              index of currently active language         
   **/    
  osk.addLanguagesToMenu = function(menu,kbdList)
  {
    var nStubs=kbdList.length;
    
    // Create and sort a list of languages
    var k,n,lg,langs=[];
    for(n=0; n<nStubs; n++)
    {
      lg=kbdList[n]['KL'];
      if(langs.indexOf(lg) == -1) langs.push(lg);
    }
    langs.sort();

    // Get current scale factor (reciprocal of viewport scale)
    var scale=Math.round(100/util.getViewportScale())/100;

    var dx,lgBar,kList,i,kb,activeLanguageIndex=-1;
    for(k=0; k<langs.length; k++)
    {
      dx=util._CreateElement('DIV');dx.className='kbd-list-closed';
      lgBar=util._CreateElement('P');
      lgBar.kList=[];
      
      for(n=0; n<nStubs; n++)
      {
        if(kbdList[n]['KL'] == langs[k]) lgBar.kList.push(kbdList[n]);        
      }

      // Adjust bar size for current viewport scaling (iOS only!)
      if(device.OS == 'iOS' && device.formFactor == 'phone') 
        lgBar.style.fontSize=scale+'em';
    
      // Add to menu  
      dx.appendChild(lgBar);
      menu.appendChild(dx);
      
      if(langs[k] == keymanweb._ActiveStub['KL']) activeLanguageIndex=k;
      
      // Several keyboards for this language
      if(lgBar.kList.length > 1)
      {
        lgBar.className='kbd-list'; 
        lgBar.innerHTML=langs[k]+'...';
        lgBar.scrolled=false;
        lgBar.ontouchend=function(e)
        { 
          e.preventDefault();e.stopPropagation();
          if(e.target.scrolled) 
            e.target.scrolled=false;
          else 
            this.parentNode.className=(this.parentNode.className=='kbd-list-closed'?'kbd-list-open':'kbd-list-closed');
        }
        lgBar.ontouchstart=function(e){e.stopPropagation();}
        lgBar.ontouchmove=function(e){e.target.scrolled=true;e.stopPropagation();}
       
        for(i=0; i<lgBar.kList.length; i++)
        {
          kb=util._CreateElement('P');kb.className='kbd-list-entry';
          osk.addKeyboardToMenu(lgBar.kList[i],kb,false);          
          dx.appendChild(kb);
        }        
      }

      // Only one keyboard for this language
      else
      {
        lgBar.innerHTML=langs[k];
        lgBar.className='kbd-single-entry';
        osk.addKeyboardToMenu(lgBar.kList[0],lgBar,true);
      }
      if(k == activeLanguageIndex) lgBar.className=lgBar.className+' current';       
    }
    
    // Add a non-selectable bottom bar so to allow scrolling to the last language
    var padLast=util._CreateElement('DIV'); padLast.id='kmw-menu-footer';
    padLast.ontouchstart=padLast.ontouchmove=padLast.ontouchend=function(e){e.preventDefault();e.stopPropagation();}
    menu.appendChild(padLast);
    
    return activeLanguageIndex;
  }

  /**
   * Add a keyboard entry to the language menu *
   *    
   * @param   {Object}    kbd     keyboard object       
   * @param   {Object}    kb      element being added and styled
   * @param   {boolean}   unique  is this the only keyboard for the language?
   */     
  osk.addKeyboardToMenu = function(kbd,kb,unique)
  {
    kb.kn=kbd['KI'];        // InternalName; 
    kb.kc=kbd['KLC'];       // LanguageCode;                  
    kb.innerHTML=unique?kbd['KL']:kbd['KN'].replace(' Keyboard',''); // Name    

    // Touchstart (or mspointerdown) event highlights the touched list item  
    kb.onmspointerdown=kb.ontouchstart=function(e)
    {
      e.stopPropagation(); 
      if(this.className.indexOf('selected') <= 0) this.className=this.className+' selected';
      osk.lgList.scrolling=false;
      osk.lgList.y0=e.touches[0].pageY;//osk.lgList.childNodes[0].scrollTop;
      return true;
    }
//TODO: Still drags Android background sometimes (not consistently)
    // Touchmove drags the list and prevents release from selecting the language
    kb.onmspointermove=kb.ontouchmove=function(e)
    { 
      e.stopImmediatePropagation();
      var scroller=osk.lgList.childNodes[0],
          yMax=scroller.scrollHeight-scroller.offsetHeight,
          y=e.touches[0].pageY, dy=y-osk.lgList.y0;
      
      // Scroll up (show later listed languages)
      if(dy < 0)
      {
        if(scroller.scrollTop >= yMax-1) 
        {
          e.preventDefault(); osk.lgList.y0=y;
        }
      }
      // Scroll down (show earlier listed languages)
      else if(dy > 0)
      {
        if(scroller.scrollTop < 2)
        {
          e.preventDefault(); osk.lgList.y0=y;
        }
      }
      // Dont' scroll - can happen if changing scroll direction
      else
        return;
            
      // Disable selected language if drag more than 5px
      if(dy < -5 || dy > 5)
      {
        osk.lgList.scrolling=true;  
        this.className=this.className.replace(/\s*selected/,'');
        osk.lgList.y0=y;
      }
      return true;
    }

    // Touch release (click) event selects touched list item   
    kb.onmspointerout=kb.ontouchend=function(e)
    { 
      e.preventDefault();
      if(typeof(e.stopImmediatePropagation) != 'undefined') e.stopImmediatePropagation();else e.stopPropagation();

      if(osk.lgList.scrolling)
      {
        this.className=this.className.replace(/\s*selected/,'');
      }
      else
      { 
        keymanweb.focusing=true;   
        keymanweb.focusTimer=window.setTimeout(function(){keymanweb.focusing=false;},1000);
                                
        osk.lgList.style.display='none'; //still allows blank menu momentarily on selection
        keymanweb._SetActiveKeyboard(this.kn,this.kc,true);
        keymanweb._FocusLastActiveElement();
        osk.hideLanguageList();
               
        // Update the OSK with the new keyboard
        osk._Show(); 
      }
      return true;
    }    
  }
  
  /**
   * Remove the language menu again
   **/
  osk.hideLanguageList = function()
  {
    if(osk.lgList)    
    {
      osk.highlightKey(osk.lgKey.firstChild,false);
      osk.lgList.style.visibility='hidden';
      window.setTimeout(function(){
        document.body.removeChild(osk.lgList.shim);
        document.body.removeChild(osk.lgList);
        osk.lgList=null;
        },500);
    }
  }
  
  /**
   * Highlight active language button when moving pointer it
   *  
   * @param       {Object}      k      element touched
   * @param       {Object}      e      OSK event   
       
  osk.moveOverMenu = function(k,e)
  { 
    e.preventDefault(); e.cancelBubble=true;
    if(typeof e.stopImmediatePropagation == 'function') e.stopImmediatePropagation();
    else if(typeof e.stopPropagation == 'function') e.stopPropagation();
    
    // Don't change highlighting unless a key is pressed
    //if(osk.keyPending == null) return;
    
    // Get touch position, active key element coordinates, and active key name
    var x=typeof e.touches == 'object' ? e.touches[0].clientX : e.clientX,
        y=typeof e.touches == 'object' ? e.touches[0].clientY : e.clientY;
    var x0=util._GetAbsoluteX(k),y0=util._GetAbsoluteY(k),//-document.body.scrollTop,
      x1=x0+k.offsetWidth,y1=y0+k.offsetHeight;
      
    osk.highlightKey(k,(x > x0 && x < x1 && y > y0 && y < y1),); 
    }
   */         
  /**
   * Function     _UpdateVKShift
   * Scope        Private
   * @param       {Object}            e     OSK event
   * @param       {number}            v     keyboard shift state
   * @param       {(boolean|number)}  d     set (1) or clear(0) shift state bits  
   * @return                                Always true
   * Description  Update the current shift state within KMW 
   */    
  osk._UpdateVKShift = function(e, v, d)
  {
    var keyShiftState=0;
    if(e)
      // read shift states from Pevent
      keyShiftState = e.Lmodifiers/0x10;
    else if(d)
      keyShiftState |= v; 
    else
      keyShiftState &= ~v;

    // Find and display the selected OSK layer
    osk.layerId=osk.getLayerId(keyShiftState);
    if(osk._Visible) osk._Show();
    
    return true;
  }

  /**
   * Function     _CancelMouse
   * Scope        Private   
   * @param       {Object}      e     event      
   * @return      {boolean}           always false 
   * Description  Closes mouse click event 
   */     
  osk._CancelMouse=function(e)
  {
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(e && e.preventDefault) e.preventDefault();
    if(e) { e.cancelBubble=true; e.returnValue=false; } // I2409 - Avoid focus loss for visual keyboard events    
    return false;
  }
  
  /**
   * Function     showLayer
   * Scope        Private
   * @param       {string}      id      ID of the layer to show
   * @return      {boolean}             true if the layer is shown, or false if it cannot be found
   * Description  Shows the layer identified by 'id' in the on screen keyboard
   */    
  osk.showLayer = function(id)
  {
    if(keymanweb._ActiveKeyboard) 
    {
      for(var i=0; i<osk.layers.length; i++)
      {
        if(osk.layers[i].id == id)
        {
          osk.layerId=id;      
          osk._Show();
          return true;
        }
      }
    }
    return false;
  }
   
  /**
   * Get the wanted height of the OSK for touch devices
   * 
   *  @return   {number}    height in pixels      
   **/
  osk.getHeight=function()
  {
    
    // KeymanTouch - get OSK height from device
    if(typeof(keymanweb['getOskHeight']) == 'function') return keymanweb['getOskHeight']();
             
    var oskHeightLandscapeView=Math.floor(Math.min(screen.availHeight,screen.availWidth)/2), 
        height=oskHeightLandscapeView; 
 
    if(device.formFactor == 'phone')
    { 
      var sx=Math.min(screen.height,screen.width),
          sy=Math.max(screen.height,screen.width);  
      
      if(util.portraitView()) 
        height=Math.floor(Math.max(screen.availHeight,screen.availWidth)/3);
      else
        height=height*(sy/sx)/1.6;  //adjust for aspect ratio, increase slightly for iPhone 5      
    }

    // Correct for viewport scaling (iOS - Android 4.2 does not want this, at least on Galaxy Tab 3))
    if(device.OS == 'iOS') height=height/util.getViewportScale();

    // Correct for devicePixelratio - needed on Android 4.1.2 phones, 
    // for Opera, Chrome and Firefox, but not for native browser!   Exclude native browser for Build 344.
    if(device.OS == 'Android' && device.formFactor == 'phone' && 'devicePixelRatio' in window)
    { 
      var bMatch=/Firefox|Chrome|OPR/;
      if(bMatch.test(navigator.userAgent)) height = height*window.devicePixelRatio;
    }       

    return height;
  }        
  
  /**
   * Create the OSK for a particular keyboard and device
   * 
   * @param       {Array.<Object>}      layout      Array of OSK layout objects
   * @param       {string}              formFactor  layout form factor
   * @return      {Object}                          fully formatted OSK object
   */
   osk.deviceDependentLayout=function(layout,formFactor)
   {
      var lDiv=util._CreateElement('DIV'),ls=lDiv.style,actualHeight=0;
            
      // Set OSK box default style
      lDiv.className='kmw-key-layer-group';

      // Adjust OSK height for mobile and tablet devices TODO move outside this function???
      switch(formFactor)
      {
        case 'phone':
        case 'tablet':
          actualHeight=osk.getHeight();
          ls.height=actualHeight+'px';
          break;
      }

      // Return empty DIV if no layout defined
      if(layout == null) return lDiv;
      
      // Set default OSK font size (Build 344, KMEW-90)
      if(typeof(layout['fontsize']) == 'undefined' || layout['fontsize'] == null) 
        ls.fontSize='1em';
      else
        ls.fontSize=layout['fontsize'];
        
      osk.fontSize=ls.fontSize;       //TODO: move outside function*********
      
      // Create a separate OSK div for each OSK layer, only one of which will ever be visible
      var n,i,j,layers,layer,gDiv,rows,row,rowHeight,rDiv,keys,key,kDiv,pDiv,rs,ks,btn,bs,ps,gs;
     
      layers=layout['layer'];

      // Set key default attributes (must use exportable names!)
      var tKey={};
      tKey['text']=''; tKey['fontsize']=ls.fontSize; 
      tKey['width']='100'; tKey['pad']='5'; tKey['sp']='0';
      tKey['layer']=null; tKey['nextlayer']=null;

      // Identify key labels (e.g. *Shift*) that require the special OSK font 
      var specialLabel=/\*\w+\*/;
   
      // ***Delete any empty rows at the end added by compiler bug...
      for(n=0; n<layers.length; n++)
      {
        layer=layers[n]; rows=layer['row'];        
        for(i=rows.length; i>0; i--)
        {
          if(rows[i-1]['key'].length > 0) break; 
        }      
        if(i < rows.length) rows.splice(i-rows.length,rows.length-i);
      }
      // ...remove to here when compiler bug fixed ***
   
      // Set the OSK row height, **assuming all layers have the same number of rows**
      
      // Calculate default row height
      rowHeight=100/rows.length;
      
      // For desktop OSK, use a percentage of the OSK height      
      if(formFactor == 'desktop')
      {
        rowHeight=100/rows.length;
      }

      for(n=0; n<layers.length; n++)
      {
        layer=layers[n]; 
        layer.aligned=false;
        gDiv=util._CreateElement('DIV'),gs=gDiv.style; 
        gDiv.className='kmw-key-layer';

        // Always make the first layer visible 
        gs.display=(n==0?'block':'none');
        gs.height=ls.height;

        // TODO: Controlling visibility rather than display may result in faster rendering, but needs testing
        // gs.visibility=(n==0?'visible':'hidden');

        // Set font for layer if defined in layout
        if('font' in layout) gs.fontFamily=layout['font']; else gs.fontFamily=''; 

        gDiv.layer=gDiv.nextLayer=layer['id'];
        if(typeof layer['nextlayer'] == 'string') gDiv.nextLayer=layer['nextlayer'];

        // Create a DIV for each row of the group
        rows=layer['row'];    
                   
        // Calculate the maximum row width (in layout units)
        var totalWidth=0;
        for(i=0; i<rows.length; i++)
        {
          var width=0;
          row=rows[i]; keys=row['key'];
          for(j=0; j<keys.length; j++)
          {
            key=keys[j];
            
            // Test for a trailing comma included in spec, added as null object by IE            
            if(key == null) 
            {
              keys.length = keys.length-1;   
            }
            else
            {
              if(typeof key['width'] == 'string' && key['width'] != '') width += parseInt(key['width'],10); else width += 100;
              if(typeof key['pad'] == 'string' && key['pad'] != '') width += parseInt(key['pad'],10); else width += 5;
            }
          }
          if(width > totalWidth) totalWidth = width;
        }

        // Add default right margin
        totalWidth += 5;
         
        for(i=0; i<rows.length; i++)
        {
          rDiv=util._CreateElement('DIV');
          rDiv.className='kmw-key-row';
          // The following event trap is needed to prevent loss of focus in IE9 when clicking on a key gap.
          // Unclear why normal _CreateElement prevention of loss of focus does not seem to work here.
          // Appending handler to event handler chain does not work (other event handling remains active).
          rDiv.onmousedown=function(e){if(e)e.preventDefault();}
          //util.attachDOMEvent(rDiv,'mousedown',function(e){if(e)e.preventDefault(); 
          
          row=rows[i]; rs=rDiv.style;

          // Set row height. (Phone and tablet heights are later recalculated 
          // and set in px, allowing for viewport scaling.)
          rs.maxHeight=rs.height=rowHeight+'%';
  
          // Apply defaults, setting the width and other undefined properties for each key
          keys=row['key'];         
          for(j=0; j<keys.length; j++)
          {
            key=keys[j];            
            for(var tp in tKey)
            {
              if(typeof key[tp] != 'string') key[tp]=tKey[tp];
            }
            
            // Add default key padding of 5 units
            if(key['pad'] == '') key['pad']='5';    
            
            // Modify the key type for special keys with non-standard labels
            // to allow the keyboard font to ovveride the SpecialOSK font.
            switch(key['sp'])
            {
              case '1':
                if(!specialLabel.test(key['text'])) key['sp']='3';  
                break;
              case '2':
                if(!specialLabel.test(key['text'])) key['sp']='4';
                break;
            } 
          }
 
          // Calculate actual key widths by summing defined widths and scaling each key to %,
          // adjusting the width of the last key to make the total exactly 100%
          // Save each percentage key width as a separate member (do *not* overwrite layout specified width!)    
          var keyPercent,padPercent,totalPercent=0;        
          for(j=0; j<keys.length-1; j++)
          {
            if(keys[j]['width'] == '') keys[j]['width']='100';
            keyPercent=parseInt(keys[j]['width'],10)*100/totalWidth;            
            keys[j]['widthpc']=keyPercent+'%'; 
            padPercent=parseInt(keys[j]['pad'],10)*100/totalWidth;
            keys[j]['padpc']=padPercent+'%';
            totalPercent += padPercent+keyPercent;
          }  
                    
          // Allow for right OSK margin  
          totalPercent += 500/totalWidth;

          // If a single key, and padding is negative, add padding to right align the key  
          if(keys.length == 1 && parseInt(keys[0]['pad'],10) < 0)
          {
            keyPercent=parseInt(keys[0]['width'],10)*100/totalWidth;            
            keys[0]['widthpc']=keyPercent+'%';             
            totalPercent += keyPercent;
            keys[0]['padpc']=(100.0-totalPercent)+'%';        
          }
          else if(keys.length > 0)           
          { 
            j=keys.length-1;
            padPercent=parseInt(keys[j]['pad'],10)*100/totalWidth;
            keys[j]['padpc']=padPercent+'%';
            totalPercent += padPercent;
            keys[j]['widthpc']=(100.0-totalPercent)+'%'; 
          }
   
          //Create the key square (an outer DIV) for each key element with padding, and an inner DIV for the button (btn)
          totalPercent=0;
          for(j=0; j<keys.length; j++)
          {
            key=keys[j];
            kDiv=util._CreateElement('DIV');
            kDiv.keyId=key['id'];           
            kDiv.className='kmw-key-square';
            ks=kDiv.style;
            if(formFactor != 'desktop')
            { 
              ks.left=(totalPercent+parseFloat(keys[j]['padpc']))+'%';
            }
            totalPercent=totalPercent+parseFloat(keys[j]['padpc'])+parseFloat(keys[j]['widthpc']);            
            kDiv.width=ks.width=key['widthpc']; 

            if(formFactor != 'desktop')
            {
              ks.bottom=rs.bottom;ks.height=rs.height;  //these must be specified in px for rest of layout to work correctly
            }
            else 
            {
              ks.marginLeft=key['padpc']; 
            }
            
            btn=util._CreateElement('DIV'),bs=btn.style; 
            bs.boxSizing=bs.MozBoxSizing='border-box';

            // Set button class
            osk.setButtonClass(key,btn);
            
 //TODO change according to formfactor???
            
            // Set distinct phone and tablet button position properties
            if(device.touchable)
            {
              bs.position='fixed'; bs.left=ks.left; bs.width=ks.width;             
            } 
            
            // Add the (US English) keycap label for desktop OSK or if KDU flag is non-zero
            var q=null;
            if(layout.keyLabels || (formFactor == 'desktop')) //desktop or KDU flag set
            {
              // Create the default key cap labels (letter keys, etc.)
              var x=keyCodes[key.id];         
              switch(x)
              {
                case 186: x=59; break; 
                case 187: x=61; break;               
                case 188: x=44; break;               
                case 189: x=45; break;               
                case 190: x=46; break;               
                case 191: x=47; break;
                case 192: x=96; break;               
                case 219: x=91; break;              
                case 220: x=92; break;                
                case 221: x=93; break;                                             
                case 222: x=39; break;               
                default:
                  if(x < 48 || x > 90) x=0;
              }
              
              if(x > 0)
              { 
                q=util._CreateElement('DIV');
                q.className='kmw-key-label'; 
                q.innerHTML=String.fromCharCode(x);
                kDiv.appendChild(q);
              }
            }
            
            // The following  line is needed to ensure correct cell sizing with auto-sized container            
            bs.overflow='hidden';
            bs.border='1px solid #888888'; 
            bs.webkitTapHighlightColor='rgba(0,0,0,0)';
            
            // Define each key element id by layer id and key id (duplicate possible for SHIFT - does it matter?)
            btn.id=layer['id']+'-'+key.id;
            btn.key=key;  //attach reference to key layout spec to element
            
            // Add reference to subkey array if defined
            if(typeof key['sk'] != 'undefined' && key['sk'] != null) 
            {
              var bsn,bsk=btn.subKeys=key['sk']; 
              for(bsn=0; bsn<bsk.length; bsn++)
                if(bsk[bsn]['sp'] == '1' || bsk[bsn]['sp'] == '2')  
                { 
                  var oldText=bsk[bsn]['text'];                            
                  bsk[bsn]['text']=osk.renameSpecialKey(oldText);
                }
            }
            else btn.subKeys=null; 
                       
            // Define callbacks to handle key touches: iOS and Android tablets and phones
            if("ontouchstart" in window)
            {
              btn.ontouchstart=function(e){osk.touchKey(this,e);}; 
              btn.ontouchend=function(e){osk.releaseKey(this,e);};
              btn.ontouchmove=function(e){osk.moveOverKeys(this,e);};
              // The following handler is also needed on Android to prevent spurious background element selection
              // It should not be necessary, and is not needed on iOS.
             
              btn.onclick=function(e){e.preventDefault(); e.stopPropagation();};
            }
            // Windows tablets and phones(?)
            else if(device.touchable && device.OS == 'Windows')
            {
              btn.style.msTouchAction='none'; //prevent default touch action on OSK keys
              btn.onmspointerdown=function(e){osk.touchKey(this,e);}; 
              btn.onmspointerup=function(e){osk.releaseKey(this,e);};
              btn.onmspointermove=function(e){osk.moveOverKeys(this,e);};
              // The following handler is also needed on Android to prevent spurious background element selection
              // It should not be necessary, and is not needed on iOS.
              //btn.onclick=function(e){e.preventDefault(); e.stopPropagation();};
            
            }
            // Handle mouse button events for browsers on desktop devices
            else
            {              
              // Highlight key while mouse down or if moving back over originally selected key
              btn.onmouseover=btn.onmousedown=function(e)
              {
                var t=util.eventTarget(e);
                if(t === null) return; 
                if(t.nodeName == 'SPAN') t=t.parentNode;
                if(util.eventType(e) == 'mousedown')
                {
                  osk.currentKey=t.id; osk._CancelMouse(e);
                  osk.highlightKey(t,true);
                  //t.style.backgroundColor='rgb(128,128,255)';
                }
                else if(t.id == osk.currentKey) 
                {
                  osk.highlightKey(t,true);
                  //t.style.backgroundColor='rgb(128,128,255)';
                }
              }
              
              // Remove highlighting when key released or moving off selected element         
              btn.onmouseup=btn.onmouseout=function(e)
              {
                var t=util.eventTarget(e);
                if(t === null) return; 
                
                if(t.nodeName == 'SPAN') t=t.parentNode;                
                osk.highlightKey(t,false);
                
                // Process as click if mouse button released anywhere over key
                if(util.eventType(e) == 'mouseup')
                {
                    if(t.id == osk.currentKey) osk.clickKey(t); 
                    osk.currentKey='';
                }
              }
            }  
             
            var t=util._CreateElement('SPAN'),ts=t.style;
            if(key['text'] == null || key['text'] == '') 
            { 
              t.innerHTML='\xa0';
              if(typeof key['id'] == 'string')
              {
                if(/^U_[0-9A-F]{4}$/i.test(key['id'])) 
                  t.innerHTML=String.fromCharCode(parseInt(key['id'].substr(2),16));
              } 
            } 
            else t.innerHTML=key['text'];
            t.className='kmw-key-text'; 
           
            // Use special case lookup for modifier keys
            if(key['sp'] == '1' || key['sp'] == '2')
            {
              var tId=((key['text'] == '*Tab*' && n == 1) ? '*TabLeft*' : key['text']);
              t.innerHTML=osk.renameSpecialKey(tId);    
            }

            //Override font spec if set for this key in the layout 
            if('font' in key) ts.fontFamily=key['font'];
            if('fontsize' in key) ts.fontSize=key['fontsize'];
                                    
            // Add text to button and button to placeholder div
            btn.appendChild(t);                          
            kDiv.appendChild(btn);

            // Prevent user selection of key captions
            //t.style.webkitUserSelect='none';
            
            // If a subkey array is defined, add an icon
            if(typeof(key['sk']) != 'undefined' && key['sk'] != null)
            {
              var skIcon=util._CreateElement('DIV');
              skIcon.className='kmw-key-popup-icon';
              kDiv.appendChild(skIcon);
            }
            // Add key to row
            rDiv.appendChild(kDiv);
          }
          // Add row to layer
          gDiv.appendChild(rDiv);
        }
        // Add layer to group
        lDiv.appendChild(gDiv);
      }      
      return lDiv;
   }    
 
  /**
   * Replace default key names by special font codes for modifier keys
   *
   *  @param    {string}  oldText    
   *  @return {string}      
   **/
  osk.renameSpecialKey = function(oldText)
  {
    var specialText=['*Shift*','*Enter*','*Tab*','*BkSp*','*Menu*','*Hide*','*Alt*','*Ctrl*','*Caps*',
      '*ABC*','*abc*','*123*','*Symbol*','*Currency*','*Shifted*','*AltGr*','*TabLeft*'];
    var codePUA=[8,5,6,4,11,10,25,1,3,16,17,19,21,20,8,2,7]; // set SHIFTED->9 for filled arrow icon
    
    //Note:  U+E000 *is* PUA but was not accepted by IE as a character in the EOT font, so Alt recoded as U+E019
    for(var i=0; i<specialText.length; i++) 
      if(oldText == specialText[i]) return String.fromCharCode(0xE000+codePUA[i]);
    return oldText;                    
  }
          
  /**
   * Attach appropriate class to each key button, according to the layout 
   * 
   * @param       {Object}    key     key object
   * @param       {Object}    btn     button object
   */    
  osk.setButtonClass = function(key,btn)
  {
    var n=0,keyTypes=['default','shift','shift-on','special','special-on','','','','deadkey','blank','hidden'];
    if(typeof key['dk'] == 'string' && key['dk'] == '1') n=8;
    if(typeof key['sp'] == 'string') n=parseInt(key['sp'],10);
    if(n < 0 || n > 10) n=0;                  
    btn.className='kmw-key kmw-key-'+keyTypes[n];
  }

  /**
   * Build a default layout for keyboards with no explicit layout 
   * 
   * @param   {Object}  PVK     keyboard object (as loaded)
   * @param   {string}  formFactor   
   * @return  {Object}
   */
  osk.buildDefaultLayout = function(PVK,formFactor)
  {
    var layout;
    
    // Build a layout using the default for the device
    var layoutType=formFactor,dfltLayout=window['dfltLayout'];
    if(typeof dfltLayout[layoutType] != 'object') layoutType = 'desktop';

    // Clone the default layout object for this device
    layout=util.deepCopy(dfltLayout[layoutType]);
   
    var n,layers=layout['layer'],keyLabels=PVK['BK'],key102=PVK['K102'];
    var i,j,k,m,row,rows,key,keys;

    // Identify key labels (e.g. *Shift*) that require the special OSK font 
    var specialLabel=/\*\w+\*/;

    // For default layouts, add other layers as modified copies of the default layer
    var idList=['default','shift','ctrl','ctrlshift','alt','altshift','ctrlalt','ctrlaltshift'];
    //var shiftKeyLabels=['Shift','Shifted','Ctrl','CtrlShift','Alt','AltShift','CtrlAlt','CtrlAltShift'];
    //var shiftedId=['K_SHIFT','K_SHIFT','K_LCTRL','K_SHIFT','K_LALT','K_SHIFT','K_ALTGR','K_SHIFT'];
    for(n=0; n<8; n++)
    {
      // Populate non-default (shifted) keygroups 
      if(n > 0) layers[n]=util.deepCopy(layers[0]);
      layers[n]['id']=idList[n];
      layers[n]['nextlayer']=idList[n]; // This would only be different for a dynamic keyboard

      // Correct appearance of state-dependent modifier keys according to group
      for(i=0; i<layers[n]['row'].length; i++)
      {
        row=layers[n]['row'][i]; 
        keys=row['key'];
        for(j=0; j<keys.length; j++)
        {
          key=keys[j];
          switch(key['id'])
          {
            case 'K_SHIFT':
            case 'K_LSHIFT':
            case 'K_RSHIFT':
              if((n & 1) == 1) key['sp'] = '2';
              if((formFactor != 'desktop') && (n > 0)) key['nextlayer']='default';
              break; 
            case 'K_CONTROL':
            case 'K_LCTRL':
            case 'K_LCONTROL':
            case 'K_RCTRL':
            case 'K_RCONTROL':
              if((n & 2) == 2) key['sp'] = '2';
              break; 
            case 'K_ALT':
            case 'K_LALT':
            case 'K_RALT':
              if((n & 4) == 4) key['sp'] = '2';
              break; 
          }              
        }
      }
      
      // Hide extra key (OEM 102) if none in keyboard definition
      if(typeof key102 == 'undefined' || !key102)
      {
        for(i=0; i<layers[n]['row'].length; i++)
        {
          for(j=0; j<layers[n]['row'][i]['key'].length; j++)
          {
            if(layers[n]['row'][i]['key'][j]['id'] == 'K_oE2')
            {
              if(formFactor == 'desktop')
              {
                layers[n]['row'][i]['key'].splice(j,1);
                layers[n]['row'][i]['key'][0]['width']='200';
              }
              else
              {
                layers[n]['row'][i]['key'][j]['sp']='10';
              }
            }
          }
        }
      }           
    }
    // Add default key labels and key styles     
    for(n=0; n<layers.length; n++)
    {        
      var layer=layers[n],kx,shiftKey=null,nextKey=null,allText='';
      rows=layer['row'];
      for(i=0; i<rows.length; i++)
      {
        keys=rows[i]['key'];
        for(j=0; j<keys.length; j++)
        {
          key=keys[j]; 
          kx=dfltCodes.indexOf(key['id']);
          
          // Get keycap text from visual keyboard array, if defined in keyboard
          if(typeof keyLabels != 'undefined' && kx >= 0 && kx+65*n < keyLabels.length) key['text']=keyLabels[kx+65*n]; 
         
          // Fall back to US English keycap text (any 'ghost' keys must now be explicitly defined in layout)
          if(key['text'] == '' &&  key['id'] != 'K_SPACE' && kx+65*n < dfltText.length) key['text']=dfltText[kx+65*n];  

          // Leave any unmarked key caps as null strings
          if(typeof(key['text']) == 'undefined') key['text']='';
          
          if(key['id'] == 'K_SHIFT') shiftKey=key; 
          if(key['id'] == 'K_TAB') nextKey=key;
 
          // Concatenate all keys for this layer, excluding special keys, to check for existence of layer
          if(!specialLabel.test(key['text'])) allText=allText+key['text'];
        }
      } 
      
      // Mark layer as valid if any key caps (excluding special keys) are defined, invalid otherwise
      layer.valid=(allText.trim().length > 0);
      layer.shiftKey=shiftKey;

       // Set modifier key appearance and behaviour for non-desktop devices using the default layout
      if(formFactor != 'desktop')
      {
        if(n > 0 && shiftKey != null)
        {
          shiftKey['sp']='2';
          shiftKey['sk']=null;
          switch(layers[n].id)
          {
            case 'ctrl':
              shiftKey['text']='*Ctrl*'; break;
            case 'alt':
              shiftKey['text']='*Alt*'; break;
            case 'ctrlalt':
              shiftKey['text']='*AltGr*'; break;
          };
        }        
      }
    }
    
    // Remove pop-up shift keys referencing invalid layers (Build 349)
    for(n=0; n<8; n++)
    {
      rows=layers[n]['row'];
      for(i=0; i<rows.length; i++)
      {
        keys=rows[i]['key'];
        for(j=0; j<keys.length; j++)
        {
          key=keys[j];
          if(key['sk'] != null)
          {
            for(m=0; m<8; m++)
            {
              for(k=0; k<key['sk'].length; k++)
              {
                if(key['sk'][k]['nextlayer'] == idList[m])
                {
                  if(!layers[m].valid) key['sk'].splice(k,1);
                  break;
                }
              }
            }
            if(key['sk'].length == 0) key['sk']=null;
          } 
        }        
      }    
    }
    return layout;              
  }
                  
  /**
   * Function     _GenerateVisualKeyboard
   * Scope        Private
   * @param       {Object}      PVK    Visual keyboard name 
   * @param       {Object}      Lhelp  true if OSK defined for this keyboard   
   * @return      Nothing
   * Description  Generates the visual keyboard element and attaches it to KMW 
   */    
  osk._GenerateVisualKeyboard = function(PVK,Lhelp,layout0)
  {                 
    var Ldiv,LdivC,layout=layout0;
    var Lkbd=util._CreateElement('DIV'), oskWidth;//s=Lkbd.style,

    // Build a layout using the default for the device
    if(typeof layout != 'object' || layout == null)
      layout=osk.buildDefaultLayout(PVK,device.formFactor);
   
    // Create the collection of HTML elements from the device-dependent layout object
    osk.layout=layout;
    osk.layers=layout['layer'];
    
    // Override font if specified by keyboard
    if('font' in layout) osk.fontFamily=layout['font']; else osk.fontFamily='';

    // Set flag to add default (US English) key label if specified by keyboard
    layout.keyLabels=((typeof(keymanweb._ActiveKeyboard['KDU']) != 'undefined') && keymanweb._ActiveKeyboard['KDU']);
    LdivC=osk.deviceDependentLayout(layout,device.formFactor);    
    
    osk.ddOSK = true;

    // Append the OSK layer group container element to the containing element
    osk.keyMap = LdivC; Lkbd.appendChild(LdivC);
   
    // Set base class and box class
    osk._DivVKbdHelp = osk._DivVKbd = Lkbd;
    osk._Box.className=device.formFactor+' kmw-osk-frame';
    Lkbd.className=device.formFactor+' kmw-osk-inner-frame';
    
    // Add header element to OSK only for desktop browsers
    if(device.formFactor == 'desktop') 
      osk._Box.appendChild(osk.controlBar());
    
    // Add primary keyboard element to OSK  
    osk._Box.appendChild(Lkbd);
        
    // Add footer element to OSK only for desktop browsers
    if(device.formFactor == 'desktop') 
      osk._Box.appendChild(osk.resizeBar());  
      
    // For other devices, adjust the object heights, allowing for viewport scaling      
    else
      osk.adjustHeights();    
  }

  /**
   * Create copy of the OSK that can be used for embedding in documentation or help
   * The currently active keyboard will be returned if PInternalName is null    
   * 
   *  @param  {string}          PInternalName   internal name of keyboard, with or without Keyboard_ prefix
   *  @param  {number}          Pstatic         static keyboard flag  (unselectable elements) 
   *  @param  {string=}         argFormFactor   layout form factor, defaulting to 'desktop'
   *  @param  {(string|number)=}  argLayerId    name or index of layer to show, defaulting to 'default'
   *  @return [Object}                          DIV object with filled keyboard layer content   
   */             
  keymanweb['BuildVisualKeyboard'] = keymanweb.buildOSK = function(PInternalName,Pstatic,argFormFactor,argLayerId)  // I777
  {           
    var PKbd=keymanweb._ActiveKeyboard,Ln,kbd=null,           
        formFactor=(typeof(argFormFactor) == 'undefined' ? 'desktop' : argFormFactor),
        layerId=(typeof(argLayerId) == 'undefined' ? 'default' : argLayerId);
  
    if(PInternalName != null)
    {
      var p=PInternalName.toLowerCase().replace('keyboard_','');                    
      for(Ln=0; Ln<keymanweb._Keyboards.length; Ln++)
      { 
        if(p == keymanweb._Keyboards[Ln]['KI'].toLowerCase().replace('keyboard_',''))
        {         
          PKbd=keymanweb._Keyboards[Ln]; break;
        }
      }
    }
 
    if(!PKbd) return null;

    var layouts=PKbd['KVKL'],layout=null,PVK=PKbd['KV'];
  
    // Get the layout defined in the keyboard, or its nearest equivalent
    if(typeof layouts == 'object')
    {
      if(typeof(layouts[formFactor]) == 'object' && layouts[formFactor] != null)
        layout=layouts[formFactor];
      else if(formFactor == 'phone' && typeof(layouts['tablet']) == 'object' && layouts['tablet'] != null)
        layout=layouts['tablet'];
      else if(formFactor == 'tablet' && typeof(layouts['phone']) == 'object' && layouts['phone'] != null)
        layout=layouts['phone'];
      else if(typeof(layouts['desktop']) == 'object' && layouts['desktop'] != null)
        layout=layouts['desktop'];       
    }     

    // Else get a default layout for the device for this keyboard
    if(layout == null && PVK != null)
      layout=osk.buildDefaultLayout(PVK,formFactor); 
    
    // Cannot create an OSK if no layout defined, just return empty DIV
    if(layout != null)     
      layout.keyLabels=((typeof(PKbd['KDU']) != 'undefined') && PKbd['KDU']);
    
    kbd=osk.deviceDependentLayout(layout,formFactor);
    kbd.className='desktop kmw-osk-inner-frame';

    // Select the layer to display, and adjust sizes 
    if(layout != null)
    {
      var layer,row,key,Lr,Lk;
      for(Ln=0; Ln<layout.layer.length; Ln++) 
      {             
        layer=kbd.childNodes[Ln];
        layer.style.height='100%';
        for(Lr=0; Lr<layer.childNodes.length; Lr++)
        {
          row=layer.childNodes[Lr];
          for(Lk=0; Lk<row.childNodes.length; Lk++)
          {
            key=row.childNodes[Lk];
            key.style.height='100%';
            key.style.left='auto';
            key.style.padding='0%';
          }
        }      
        if(typeof(layerId) == 'number')
          layer.style.display=(Ln == layerId && layerId >= 0 ? 'block' : 'none');
        else if(typeof(layerId) == 'string')
          layer.style.display=(layout.layer[Ln].id == layerId ? 'block' : 'none');
        else 
          layer.style.display=(Ln == 0 ? 'block' : 'none');
      }    
    }
    else
    {
      kbd.innerHTML="<p style='color:#c40; font-size:0.5em;margin:10px;'>No "+formFactor+" layout is defined for "+PKbd['KN']+".</p>";
    }
    // Add a faint border
    kbd.style.border='1px solid #ccc';
    return kbd; 
  }

  /**
   * Adjust the absolute height of each keyboard element after a rotation
   *    
   **/      
  keymanweb['correctOSKTextSize']=osk.adjustHeights=function()
  {        
    var layers=osk._Box.firstChild.firstChild.childNodes,
        nRows=layers[0].childNodes.length,
        oskHeight=osk.getHeight(),
        rowHeight=Math.floor(oskHeight/nRows),
        nLayer,nRow,rs,keys,nKeys,nKey,key,ks,j,pad=4,fs=1.0;
        
    if(device.OS == 'Android' && 'devicePixelRatio' in window) 
      rowHeight = rowHeight/window.devicePixelRatio;
    
    oskHeight=nRows*rowHeight;

    var b=osk._Box,bs=b.style;
    bs.height=bs.maxHeight=(oskHeight+3)+'px';
    b=b.firstChild.firstChild; bs=b.style;
    bs.height=bs.maxHeight=(oskHeight+3)+'px';
    if(device.formFactor == 'phone')
    {
      pad=2;fs=0.6;
    }
    // TODO: Logically, this should be needed for Android, too - may need to be changed for the next version!
    if(device.OS == 'iOS') 
      fs=fs/util.getViewportScale();

    bs.fontSize=fs+'em';  
    var resizeLabels=(device.OS == 'iOS' && device.formFactor == 'phone' && util.landscapeView());
 
    for(nLayer=0;nLayer<layers.length; nLayer++)
    {
      layers[nLayer].style.height=(oskHeight+3)+'px';       
      for(nRow=0; nRow<nRows; nRow++)
      {                                  
        rs=layers[nLayer].childNodes[nRow].style;
        rs.bottom=(nRows-nRow-1)*rowHeight+'px';       
        rs.maxHeight=rs.height=rowHeight+'px';      
        keys=layers[nLayer].childNodes[nRow].childNodes;
        nKeys=keys.length;     
        for(nKey=0;nKey<nKeys;nKey++)
        {                      
          key=keys[nKey];
          // Must set the height of the text DIV, not the label (if any)
          for(j=0;j<key.childNodes.length;j++)
            if(key.childNodes[j].className.indexOf('key-label') < 0) break;
          ks=key.childNodes[j].style;
          ks.bottom=rs.bottom; 
          ks.height=(rowHeight-pad)+'px'; 
                          
          // Rescale keycap labels on iPhone (iOS 7)
          if(resizeLabels && (j > 0)) key.childNodes[0].style.fontSize='6px'; 
        }
      }    
    } 
  }
    
  /**
   * Create a control bar with title and buttons for the desktop OSK 
   */    
  osk.controlBar = function()
  {
    var bar=util._CreateElement('DIV'),title='';
    bar.id='keymanweb_title_bar'; 
    bar.className='kmw-title-bar';
    bar.onmousedown=osk._VMoveMouseDown;
    
    if(keymanweb._ActiveKeyboard) title=keymanweb._ActiveKeyboard['KN'];
    var Ltitle=util._CreateElement('SPAN');
    Ltitle.className='kmw-title-bar-caption';
    Ltitle.innerHTML=title; 
    bar.appendChild(Ltitle);
    
    var Limg=osk.closeButton=util._CreateElement('DIV');
    Limg.id='kmw-close-button';
    Limg.className='kmw-title-bar-image';
    Limg.onmousedown=osk._CancelMouse;
    Limg.onclick=function(){osk._Hide(true);}    
    bar.appendChild(Limg);

    Limg=osk.helpImg=util._CreateElement('DIV'); 
    Limg.id='kmw-help-image';
    Limg.className='kmw-title-bar-image';
    Limg.title='KeymanWeb Help';
    Limg.onclick=function()
      {
        var p={}; util.callEvent('osk.helpclick',p);
        if(window.event) window.event.returnValue=false;
        return false;
      }
    Limg.onmousedown=osk._CancelMouse;     
    bar.appendChild(Limg);

    Limg=osk.configImg=util._CreateElement('DIV');  
    Limg.id='kmw-config-image';
    Limg.className='kmw-title-bar-image';
    Limg.title='KeymanWeb Configuration Options';
    Limg.onclick=function()
      {
        var p={}; util.callEvent('osk.configclick',p);
        if(window.event) window.event.returnValue=false;
        return false;
      }
    Limg.onmousedown=osk._CancelMouse;     
    bar.appendChild(Limg);

    Limg=osk.pinImg=util._CreateElement('DIV');  //I2186
    Limg.id='kmw-pin-image';
    Limg.className='kmw-title-bar-image';
    Limg.title='Pin the On Screen Keyboard to its default location on the active text box';
    Limg.onclick=function()
      {
        osk.loadCookie(); osk.userPositioned=false; osk.saveCookie();
        osk._Show();
        osk.doResizeMove(); //allow the UI to respond to OSK movements
        if(osk.pinImg) osk.pinImg.style.display='none';
        if(window.event) window.event.returnValue=false;
        return false;
      }
    Limg.onmousedown=osk._CancelMouse;     
    bar.appendChild(Limg);
    
    return bar;  
  }
  
  /**
   * Display build number
   */
  osk.showBuild = function()
  {
    util.alert('KeymanWeb Build '+keymanweb['build']+'<br /><br />'
      +'<span style="font-size:0.8em">Copyright &copy; 2013 Tavultesoft Pty Ltd</span>');
  } 
        
  /**
   * Create a bottom bar with a resizing icon for the desktop OSK 
   */    
  osk.resizeBar = function()
  {
    var bar=util._CreateElement('DIV');
    bar.className='kmw-footer';
    bar.onmousedown=osk._CancelMouse;
    
    // Add caption
    var Ltitle=util._CreateElement('DIV');
    Ltitle.className='kmw-footer-caption';
    Ltitle.innerHTML='Keyboard &copy; 2013 Tavultesoft Pty Ltd';
    Ltitle.id='keymanweb-osk-footer-caption';
    
    // Display build number on shift+double click
    util.attachDOMEvent(Ltitle,'dblclick',function(e){if(e && e.shiftKey)osk.showBuild();},false);

    // Prevent selection of caption (IE - set by class for other browsers)
    if('onselectstart' in Ltitle) Ltitle.onselectstart= function(){return false;} //IE
    
    bar.appendChild(Ltitle);
    
    var Limg = util._CreateElement('DIV');
    Limg.className='kmw-footer-resize';
    Limg.onmousedown=osk._VResizeMouseDown;  
    Limg.onmouseover=Limg.onmouseout=osk._VResizeMouseOut; 
    bar.appendChild(Limg);
    osk.resizeIcon=Limg;
    //TODO: the image never appears in IE8, have no idea why!
    return bar;  
  }
    
  /**
   * Function     _VKbdMouseOver
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Activate the KMW UI on mouse over 
   */    
  osk._VKbdMouseOver = function(e)
  {
    keymanweb._IsActivatingKeymanWebUI = 1;
  }

  /**
   * Function     _VKbdMouseOut
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Cancel activation of KMW UI on mouse out 
   */    
  osk._VKbdMouseOut = function(e)
  {
    keymanweb._IsActivatingKeymanWebUI = 0;
  }
    
  /**
   * Function     _VResizeMouseOver, _VResizeMouseOut
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Process end of resizing of KMW UI  
   */    
  osk._VResizeMouseOver = osk._VResizeMouseOut = function(e)
  {
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return false;
    if(e  &&  e.preventDefault) e.preventDefault();
    var r=osk.getRect();
    osk.width=r.width; osk.height=r.height;
    e.cancelBubble = true;
    return false;
  }
    
  /**
   * Function     _VResizeMouseDown
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Process resizing of KMW UI  
   */    
  osk._VResizeMouseDown = function(e)
  {
    keymanweb._JustActivatedKeymanWebUI = 1;
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    osk.resizing = 1;
    var Lposx,Lposy;
    if (e.pageX) {
		  Lposx = e.pageX; Lposy = e.pageY;
		  }
	  else if(e.clientX) {
 	    Lposx = e.clientX + document.body.scrollLeft;
 	    Lposy = e.clientY + document.body.scrollTop;
 	    }
	  osk._ResizeMouseX = Lposx; 
	  osk._ResizeMouseY = Lposy; 
	  if(document.onmousemove != osk._VResizeMouseMove  &&  document.onmousemove != osk._VMoveMouseMove)  // I1472 - Dragging off edge of browser window causes muckup
	  {
  	  osk._VPreviousMouseMove = document.onmousemove;
	    osk._VPreviousMouseUp = document.onmouseup;
	  }
    osk._VPreviousCursor = document.body.style.cursor;
    osk._VPreviousMouseButton = (typeof(e.which)=='undefined' ? e.button : e.which);

	  osk._VOriginalWidth = osk._DivVKbd.offsetWidth;
	  osk._VOriginalHeight = osk._DivVKbd.offsetHeight;
    document.onmousemove = osk._VResizeMouseMove;
    document.onmouseup = osk._VResizeMoveMouseUp;
  
    if(document.body.style.cursor) document.body.style.cursor = 'se-resize';
    if(e  &&  e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    return false;
  }
  
  /**
   * Function     _VResizeMouseMove
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Process mouse movement during resizing of OSK  
   */    
  osk._VResizeMouseMove = function(e)
  {
    var Lposx,Lposy;
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    osk.resizing = 1;

    if(osk._VPreviousMouseButton != (typeof(e.which)=='undefined' ? e.button : e.which)) // I1472 - Dragging off edge of browser window causes muckup
    {
      return osk._VResizeMoveMouseUp(e);
    }
    else
    {
      if (e.pageX) {
		    Lposx = e.pageX; Lposy=e.pageY;
		    }
	    else if (e.clientX) {
 	      Lposx = e.clientX + document.body.scrollLeft;
 	      Lposy = e.clientY + document.body.scrollTop;
        }
      var newWidth=(osk._VOriginalWidth + Lposx - osk._ResizeMouseX),
          newHeight=(osk._VOriginalHeight + Lposy - osk._ResizeMouseY);
   
      // Set the smallest and largest OSK size
      if(newWidth < 0.2*screen.width) newWidth = 0.2*screen.width; 
      if(newHeight < 0.1*screen.height) newHeight = 0.1*screen.height;
      if(newWidth > 0.9*screen.width) newWidth=0.9*screen.width;
      if(newHeight > 0.5*screen.height) newWidth=0.5*screen.height;            
      
      // Set OSK width 
      osk._DivVKbd.style.width=newWidth+'px';
      
      // Explicitly change OSK height and font size - cannot safely rely on scaling from font
      osk._DivVKbd.style.height=newHeight+'px';
      osk._DivVKbd.style.fontSize=(newHeight/8)+'px';
      
      util['showShim'](osk._DivVKbd, osk.shim, osk._DivVKbdHelp);  // I1476 - Handle SELECT overlapping
  	  
      if(e  &&  e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      return false;
    }
  }
  
  /**
   * Function     _VMoveMouseDown
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Process mouse down on OSK  
   */    
  osk._VMoveMouseDown = function(e)
  {
    var Lposx, Lposy;
    keymanweb._JustActivatedKeymanWebUI = 1;
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;

    osk.resizing = 1;
    if (e.pageX)
		  { Lposx = e.pageX; Lposy = e.pageY; }
	  else if (e.clientX)
 	    { Lposx = e.clientX + document.body.scrollLeft; Lposy = e.clientY + document.body.scrollTop; }

	  if(document.onmousemove != osk._VResizeMouseMove  &&  document.onmousemove != osk._VMoveMouseMove)  // I1472 - Dragging off edge of browser window causes muckup
	  {
      osk._VPreviousMouseMove = document.onmousemove;
	    osk._VPreviousMouseUp = document.onmouseup;
	  }
    osk._VPreviousCursor = document.body.style.cursor;
    osk._VPreviousMouseButton = (typeof(e.which)=='undefined' ? e.button : e.which);
    
    osk._VMoveX = Lposx - osk._Box.offsetLeft;
    osk._VMoveY = Lposy - osk._Box.offsetTop;
    
    if(keymanweb.isCJK()) osk.pinImg.style.left='15px';

    document.onmousemove = osk._VMoveMouseMove;
    document.onmouseup = osk._VResizeMoveMouseUp;
    if(document.body.style.cursor) document.body.style.cursor = 'move';
    if(e  &&  e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    return false;
  }
 
  /**
   * Process mouse drag on OSK  
   * 
   * @param       {Object}      e      event 
   */    
  osk._VMoveMouseMove = function(e)
  { 
    var Lposx, Lposy;
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    
    if(osk.noDrag) return true;
    
    osk.resizing = 1;

    osk.userPositioned = true;
    osk.pinImg.style.display='block';

    if(osk._VPreviousMouseButton != (typeof(e.which)=='undefined' ? e.button : e.which)) // I1472 - Dragging off edge of browser window causes muckup
    {
      return osk._VResizeMoveMouseUp(e);
    }
    else
    {
      if (e.pageX)
		    { Lposx = e.pageX; Lposy = e.pageY; }
	    else if (e.clientX)
 	      { Lposx = e.clientX + document.body.scrollLeft; Lposy = e.clientY + document.body.scrollTop; }
 	    osk._Box.style.left = (Lposx-osk._VMoveX)+'px';
 	    osk._Box.style.top = (Lposy-osk._VMoveY)+'px';

      // I1476 - Handle SELECT overlapping BEGIN
      if(osk._DivVKbd)
        util['showShim'](osk._DivVKbd, osk.shim, osk._DivVKbdHelp);
      else
        util['showShim'](osk._Box, osk.shim);
      // I1476 - Handle SELECT overlapping END

      if(e  &&  e.preventDefault) e.preventDefault();
      var r=osk.getRect();
      osk.width=r.width;osk.height=r.height; 
      e.cancelBubble = true;
      return false;
    }	  
  }

  /**
   * Function     _VResizeMoveMouseUp
   * Scope        Private
   * @param       {Object}      e      event 
   * Description  Process mouse up during resizing of KMW UI  
   */    
  osk._VResizeMoveMouseUp = function(e)
  {
    e = keymanweb._GetEventObject(e);   // I2404 - Manage IE events in IFRAMEs
    if(!e) return true;
    osk.resizing = 0; osk.currentKey=null;
    document.onmousemove = osk._VPreviousMouseMove;
    document.onmouseup = osk._VPreviousMouseUp;
    if(document.body.style.cursor) document.body.style.cursor = osk._VPreviousCursor;
    keymanweb._FocusLastActiveElement();
    if(e  &&  e.preventDefault) e.preventDefault();
    keymanweb._JustActivatedKeymanWebUI = 0;
    keymanweb._IsActivatingKeymanWebUI = 0;
	  if(osk._DivVKbd) {
      osk._VOriginalWidth = osk._DivVKbd.offsetWidth;
      osk._VOriginalHeight = osk._DivVKbd.offsetHeight;
      }
    osk.doResizeMove();
    e.cancelBubble = true;
    osk.saveCookie();
    return false;
  }
  
  /**
   * Function     userPositioned
   * Scope        Public
   * @return      {(boolean|number)}          true if user located
   * Description  Test if OSK window has been repositioned by user
   */    
  osk['userLocated'] = function()
  {
    return osk.userPositioned;
  }

  /**
   * Description  Display KMW OSK (at position set in callback to UI) 
   * Function     show
   * Scope        Public   
   * @param       {(boolean|number)=}      bShow     True to display, False to hide, omitted to toggle
   */    
  osk['show'] = function(bShow)
  {        
    if(arguments.length > 0) 
    { 
      osk._Enabled=bShow;
      if(bShow) osk._Show(); else osk._Hide(true);   
    }
    else
    {   
      if(osk._Visible) osk._Hide(true); else osk._Show();
    }
  } 

  /**
   * Allow UI to respond to OSK being shown (passing position and properties)
   * 
   * @param       {Object=}       p     object with coordinates and userdefined flag
   * @return      {boolean}   
   * 
   */    
  osk.doShow = function(p)
  {
    return util.callEvent('osk.show',p);  
  }

  /**
   * Allow UI to update respond to OSK being hidden
   * 
   * @param       {Object=}       p     object with coordinates and userdefined flag
   * @return      {boolean}   
   * 
   */    
  osk.doHide = function(p)
  {
    return util.callEvent('osk.hide',p);  
  }
  
  /**
   * Allow UI to update OSK position and properties
   * 
   * @param       {Object=}     p       object with coordinates and userdefined flag
   * 
   */    
  osk.doResizeMove = function(p)
  {
    return util.callEvent('osk.resizemove',p);  
  } 
  
  
  /**
   * Display KMW OSK at specified position (returns nothing) 
   * 
   * @param       {number=}     Px      x-coordinate for OSK rectangle
   * @param       {number=}     Py      y-coordinate for OSK rectangle 
   */  
  osk._Show = function(Px, Py)
  {      
    // Do not try to display OSK if undefined, or no active element  
    if(osk._Box == null || keymanweb._ActiveElement == null) return;
        
    // Never display the OSK for desktop browsers unless KMW element is focused, and a keyboard selected
    if((!device.touchable) && (keymanweb._ActiveKeyboard == null || !osk._Enabled)) return;
    
    var Ls = osk._Box.style;
    
    // Do not display OSK until it has been positioned correctly    
    if(device.touchable && Ls.bottom == '') Ls.visibility='hidden';

    // The following code will always be executed except for externally created OSK such as EuroLatin
    if(osk.ddOSK)
    {
      // Enable the currently active keyboard layer and update the default nextLayer member
      var n,nLayer=-1,b=osk._DivVKbd.childNodes[0].childNodes;
      for(n=0; n<b.length; n++)
      {
        if(b[n].layer == osk.layerId)
        {
          b[n].style.display='block'; 
          //b[n].style.visibility='visible'; 
          osk.nextLayer=osk.layerId;
          osk.layerIndex=nLayer=n;
          if(typeof osk.layers[n]['nextlayer'] == 'string') osk.nextLayer=osk.layers[n]['nextlayer'];
        }
        else 
        {     
          b[n].style.display='none';
          //b[n].style.visibility='hidden';
        }
      }     

      if(device.touchable) 
      {    
        Ls.position='fixed';   
        Ls.left=Ls.bottom='0px';
        Ls.height=Ls.maxHeight=osk._Box.firstChild.firstChild.style.height;       
        Ls.border='none'; Ls.borderTop='1px solid gray';
        osk._Enabled=1; osk._Visible=1; // I3363 (Build 301)
        
        // Adjust keyboard font sizes
        if(device.formFactor == 'phone') // I3363 (Build 301) 
          osk._DivVKbd.style.fontSize='120%'; //'1.875em';  
        else
        {         
          // The following is a *temporary* fix for small format tablets, e.g. PendoPad
          if(device.OS == 'Android' && device.formFactor == 'tablet'  &&
              parseInt(Ls.height,10) < 300) 
            osk._DivVKbd.style.fontSize='120%';
          else
            osk._DivVKbd.style.fontSize='200%'; //'2.5em';        
        }
        // Identify and save references to the language key, hide keyboard key, and space bar 
        osk.lgKey=osk.getSpecialKey(nLayer,'K_LOPT');     //TODO: should be saved with layer
        osk.hkKey=osk.getSpecialKey(nLayer,'K_ROPT');
        
        // Always adjust screen height if iPhone or iPod, to take account of viewport changes
        if(device.OS == 'iOS' && device.formFactor == 'phone') osk.adjustHeights();
      }
      
      // Define for both desktop and touchable OSK
      osk.spaceBar=osk.getSpecialKey(nLayer,'K_SPACE'); //TODO: should be saved with layer      
    }
      
    //TODO: may need to return here for touch devices??
    Ls.display='block'; //Ls.visibility='visible';
    osk.showLanguage();

    if(device.formFactor == 'desktop')
    {  
      Ls.position='absolute'; Ls.display='block'; //Ls.visibility='visible';
      Ls.left='0px'; 
      osk.loadCookie();
      if(Px >= 0) //probably never happens, legacy support only
      {
        Ls.left = Px + 'px'; Ls.top = Py + 'px';
      }
      else
      {
        if(osk.userPositioned)
        {
          Ls.left=osk.x+'px'; Ls.top=osk.y+'px';
        }
        else
        {
          var el=keymanweb._ActiveElement;
          if(osk.dfltX != '')
            Ls.left=osk.dfltX;
          else if(typeof el != 'undefined' && el != null)
            Ls.left=util._GetAbsoluteX(el)+'px';

          if(osk.dfltY != '')
            Ls.top=osk.dfltY;
          else if(typeof el != 'undefined' && el != null)
            Ls.top=(util._GetAbsoluteY(el)+el.offsetHeight)+'px';
        }
      }
      osk._Enabled=1; osk._Visible=1;
      if(osk._DivVKbd)
      {
        osk.width=osk._DivVKbd.offsetWidth; osk.height=osk._DivVKbd.offsetHeight;
      }
      
      osk.saveCookie();
  
      var pin=osk.pinImg;
      if(typeof pin != 'undefined' && pin != null)          
        pin.style.display=osk.userPositioned?'block':'none';                 
    }

    // If OSK still hidden, make visible only after all calculation finished
    if(Ls.visibility == 'hidden') 
      window.setTimeout(function(){osk._Box.style.visibility='visible';},0);
      
    // Allow desktop UI to execute code when showing the OSK
    if(!device.touchable)
    {
      var Lpos={};
      Lpos['x']=osk._Box.offsetLeft; 
      Lpos['y']=osk._Box.offsetTop; 
      Lpos['userLocated']=osk.userPositioned;      
      osk.doShow(Lpos);
    }   
  }

  /**
   *  Adjust the width of the last cell in each row for length differences 
   *  due to rounding percentage widths to nearest pixel. 
   *      
   *  @param  {number}  nLayer    Index of currently visible layer               
   */    
  osk.adjustRowLengths = function(nLayer)
  {
    if(nLayer >= 0) return;   //TODO: TEST ONLY - remove code if not needed
    
    var maxWidth,layers=osk._DivVKbd.childNodes[0].childNodes;

    if(nLayer < 0 || nLayer >= layers.length || layers[nLayer].aligned) return;
    
    // Do not try and align if not visible!
    if(layers[nLayer].style.display != 'block') return;
    
    // Set max width to be 6 px less than OSK layer width (allow for inter-key spacing)
    // TODO: Adjustment needs to be device and orientation specific
    maxWidth=osk._DivVKbd.childNodes[0].offsetWidth-6;

    if(device.OS == 'Windows') 
    { 
      maxWidth -= util.landscapeView() ? 4: 40;
    }
    var i,rows=layers[nLayer].childNodes,keys,nKeys,lastKey,xMax;    
    for(i=0; i<rows.length; i++)
    {          
      keys=rows[i].childNodes;
      nKeys=keys.length;
      xMax=keys[nKeys-2].offsetLeft+keys[nKeys-2].offsetWidth;
      lastKey=keys[nKeys-1]; 
      lastKey.style.width=(maxWidth-xMax)+'px';
    } 
    layers[nLayer].aligned=true;
  }

  /**
   *  Clear the row alignement flag for each layer
   *  @return   {number}    number of currently active layer
   *                 
   */    
  osk.resetRowLengths = function()
  {
    var j,layers=osk._DivVKbd.childNodes[0].childNodes,nLayer=-1;
    for(j=0; j<layers.length; j++) 
    { 
      if(layers[j].style.display == 'block') nLayer=j;
      layers[j].aligned=false;     
    }
    return nLayer;
  }
  
  /**
   *  Set the reference to a special function key for the 
   *  currently visible OSK layer
   *       
   *  @param    {number}  nLayer  Index of visible layer   
   *  @param    {string}  keyId   key identifier
   *  @return   {Object}          Reference to key      
   */    
  osk.getSpecialKey = function(nLayer,keyId)
  {
    var k,layers,rows,keys;
    layers=osk._DivVKbd.childNodes[0].childNodes;    
    if(nLayer >= 0 && nLayer < layers.length)
    {      
      // Special function keys will always be in bottom row (must modify code if not)
      rows=layers[nLayer].childNodes;
      keys=rows[rows.length-1].childNodes;
      for(k=0; k<keys.length; k++)
      {
        if(keys[k].keyId == keyId) return keys[k];    
      }
    }
    return null;
  }

  /**
   * Function     hide
   * Scope        Public
   * Description  Prevent display of OSK window on focus
   */    
  osk['hide'] = function()
  {
    osk._Enabled=0; osk._Hide(true);
  }

  /**
   * Hide Keymanweb On Screen Keyboard
   * 
   * @param       {boolean}   hiddenByUser    Distinguish between hiding on loss of focus and explicit hiding by user
   */    
  osk._Hide = function(hiddenByUser)
  {  
    // The test for CJK languages is necessary to prevent a picklist (displayed in the OSK) from being hidden by the user
    // Once picklist functionality is separated out, this will no longer be needed. 
    // Logic is: execute always if hidden on lost focus, but if requested by user, only if not CJK 
     
    // Save current size if visible
    if(osk._Box && osk._Box.style.display == 'block' && osk._DivVKbd)
    { 
      osk.width=osk._DivVKbd.offsetWidth; osk.height=osk._DivVKbd.offsetHeight;
    }
    
    if(hiddenByUser)
    { 
      //osk.loadCookie(); // preserve current offset and userlocated state
      osk._Enabled = ((keymanweb.isCJK() || device.touchable)?1:0); // I3363 (Build 301) 
      osk.saveCookie();  // Save current OSK state, size and position (desktop only)
    }
    else if(device.formFactor == 'desktop')
    {
      //Allow desktop OSK to remain visible on blur if body class set
      if(document.body.className.indexOf('osk-always-visible') >= 0) return;        
    }
 
    osk._Visible = 0;
    if(osk._Box && device.touchable && osk._Box.offsetHeight > 0) // I3363 (Build 301)
    {
      var os=osk._Box.style,h=osk._Box.offsetHeight;  
      //Firefox doesn't transition opacity if start delay is explicitly set to 0!
      if(typeof(os.MozBoxSizing) == 'string') 
        os.transition='opacity 0.8s linear';
      else     
        os.transition=os.msTransition=os.WebkitTransition='opacity 0.5s linear 0';  
      
      // Cannot hide the OSK smoothly using a transitioned drop, since for 
      // position:fixed elements transitioning is incompatible with translate3d(),
      // and also does not work with top, bottom or height styles.
      // Opacity can be transitioned and is probably the simplest alternative.
      // We must condition on osk._Visible in case focus has since been moved to another 
      // input (in which case osk._Visible will be non-zero)
      window.setTimeout(function()
      {                          
        var os=osk._Box.style;      
        if(osk._Visible) 
        { 
          // Leave opacity alone and clear transition if another element activated       
          os.transition=os.msTransition=os.MozTransition=os.WebkitTransition='';
        }          
        else
        {
          // Set opacity to zero, should decrease smoothly 
          os.opacity='0';
  
          // Actually hide the OSK at the end of the transition  
          osk._Box.addEventListener('transitionend',osk.hideNow,false);
          osk._Box.addEventListener('webkitTransitionEnd',osk.hideNow,false);
        }            
      },200);      // Wait a bit before starting, to allow for moving to another element
      
    }
    else
    {        
      if(osk._Box) osk._Box.style.display = 'none';
      util['hideShim'](osk.shim);  // I1476 - Handle SELECT overlapping
    }
   
    // Allow UI to execute code when hiding the OSK
    var p={}; p['HiddenByUser']=hiddenByUser;
    osk.doHide(p);
    
    // If hidden by the UI, be sure to restore the focus
    if(hiddenByUser) keymanweb._FocusLastActiveElement();
  }

  /**
   * Function     hideNow
   * Scope        Private   
   * Description  Hide the OSK unconditionally and immediately, cancel any pending transition 
   */    
  osk.hideNow = function() // I3363 (Build 301)
  {   
    osk._Box.removeEventListener('transitionend',osk.hideNow,false);
    osk._Box.removeEventListener('webkitTransitionEnd',osk.hideNow,false);

    var os=osk._Box.style;
    os.display='none';
    os.opacity='1';
    osk._Visible=0;
    os.transition=os.msTransition=os.mozTransition=os.WebkitTransition='';

    // Remove highlighting from hide keyboard key, if applied
    if(typeof(osk.hkKey) != 'undefined') osk.highlightKey(osk.hkKey.firstChild,false);
    
  }
 
  // First time initialization of OSK
  osk.prepare = function()
  {    
    // Defer loading the OSK until KMW code initialization complete
    if(!keymanweb['initialized'])
    {
      window.setTimeout(osk.prepare,200);
      return;
    }
    // OSK initialization - create DIV and set default styles  
    if(!osk.ready) 
    {
      osk._Box = util._CreateElement('DIV');   // Container for OSK (Help DIV, displayed when user clicks Help icon)
      document.body.appendChild(osk._Box); 

//      if(device.app == 'iPhone' || device.app == 'iPad')
      if(device.app != '')
        util.linkStyleSheet(util.myPath()+'kmwosk.css');
      else
        util.linkStyleSheet(util['getOption']('resources')+'osk/kmwosk.css');

      // For mouse click to prevent loss of focus
      util.attachDOMEvent(osk._Box,'mousedown', function(){keymanweb._IsActivatingKeymanWebUI=1;});    
    
      // And to prevent touch event default behaviour on mobile devices 
      // TODO: are these needed, or do they interfere with other OSK event handling ????
      if(device.touchable) // I3363 (Build 301)
      {
        util.attachDOMEvent(osk._Box,'touchstart',function(e){keymanweb._IsActivatingKeymanWebUI=1; e.preventDefault();e.stopPropagation();});
        util.attachDOMEvent(osk._Box,'touchend',function(e){e.preventDefault(); e.stopPropagation();});
        util.attachDOMEvent(osk._Box,'touchmove',function(e){e.preventDefault();e.stopPropagation();});
        util.attachDOMEvent(osk._Box,'touchcancel',function(e){e.preventDefault();e.stopPropagation();});
        
        // Can only get (initial) viewport scale factor after page is fully loaded!
        osk.vpScale=util.getViewportScale();
      }      
    }  
    osk.loadCookie();  
    osk.ready=true;     
  } 
  /**
   * Function     _Load
   * Scope        Private
   * Description  OSK initialization when keyboard selected
   */    
  osk._Load = function()   // Load Help
  { 
    // For subscription model, _Load may be called before OSK is ready, and if so must wait   
    if(osk._Box == null)
    {
      if(osk.loadRetry >= 99) return; // fail silently, but should not happen
      window.setTimeout(osk._Load,100);
      osk.loadRetry++;
    }  
  
    if(keymanweb._TitleElement) keymanweb._TitleElement.innerHTML = 'Tavultesoft KeymanWeb'; // I1972

   
    osk._Visible=0;  // I3363 (Build 301)
    osk.layerId='default';
    var s=osk._Box.style;
    s.zIndex='9999'; s.display='none'; s.width='auto'; 
    s.position = (device.formFactor == 'desktop' ? 'absolute' : 'fixed'); 

    // Use smaller base font size for mobile devices 
    //if(screen.availHeight < 500) s.fontSize='10pt';
    //else if(screen.availHeight < 800) s.fontSize='11pt';
    //else s.fontSize='12pt';
    if(device.formFactor == 'phone') s.fontSize='1.6em';
    
    osk._DivVKbd = osk._DivVKbdHelp = null;  // I1476 - Handle SELECT overlapping
    osk._Box.innerHTML = '';
    osk._Box.onmouseover = osk._VKbdMouseOver;
    osk._Box.onmouseout = osk._VKbdMouseOut;    
    
    // TODO: find out and document why this should not be done for touch devices!!
    // (Probably to avoid having a null keyboard. But maybe that *is* an option, if there remains a way to get the language menu,
    //  such as a minimized menu button?)
    if(keymanweb._ActiveKeyboard == null && !device.touchable)  
    { 
      var Ldiv=util._CreateElement('DIV'); 
      Ldiv.className = "kmw-title-bar";
      Ldiv.appendChild(osk._TitleBarInterior());
      Ldiv.onmousedown = osk._VMoveMouseDown;
      osk._Box.appendChild(Ldiv);
      
      Ldiv = util._CreateElement('DIV');
      Ldiv.className='kmw-osk-none';
      osk._Box.appendChild(Ldiv);    
    }
    else
    {
      var Lviskbd=null,layouts=null,layout=null,Lhelp='';
      osk._Box.className = "";
      if(keymanweb._ActiveKeyboard != null)
      {
        Lviskbd=keymanweb._ActiveKeyboard['KV']; Lhelp=keymanweb._ActiveKeyboard['KH'];

        // Check if dynamic layout is defined within keyboard 
        layouts=keymanweb._ActiveKeyboard['KVKL'];  

        // If any keyboard layout file is provided, use that to override the generated layout
        if(typeof layouts != 'undefined' && layouts != null) 
        {
          layout=layouts[device.formFactor];
 
          // Use the layout for the device, if defined, otherwise use the desktop (default) layout
          if(typeof layout == 'undefined' || layout == null) 
          {
            if(device.formFactor == 'phone') layout=layouts['tablet'];
            else if(device.formFactor == 'tablet') layout=layouts['phone'];
            if(typeof layout == 'undefined' || layout == null) layout=layouts['desktop'];
          }          
        }
      }

      // Test if Visual keyboard is simply a place holder, set to null if so
      if(Lviskbd != null && Lviskbd['BK'] != null)
      {
        var keyCaps=Lviskbd['BK'],noKeyCaps=true;        
        {
          for(var i=0; i<keyCaps.length; i++)
          {
            if(keyCaps[i].length > 0)
            {
              noKeyCaps = false; break;
            }
          }
        }
        if(noKeyCaps) Lviskbd=null;
      }
 
      // Generate a visual keyboard from the layout (or layout default)
      // TODO: this should probably be unconditional now
      if(Lviskbd != null || Lhelp == '' || device.touchable) // I3363 (Build 301) 
      {
        // TODO: May want to define a default BK array here as well
        if(Lviskbd == null) Lviskbd={'F':'Tahoma','BK':dfltText}; //DDOSK

        osk._GenerateVisualKeyboard(Lviskbd, Lhelp, layout);
      }
      
      else //The following code applies only to preformatted 'help' such as European Latin
      {
        osk.ddOSK = false;
        Ldiv=util._CreateElement('DIV');  
        Ldiv.className = "kmw-title-bar";        
        Ldiv.appendChild(osk._TitleBarInterior());
        Ldiv.onmousedown = osk._VMoveMouseDown;
        osk._Box.appendChild(Ldiv);
        
        //Add content
        var Ldiv = util._CreateElement('DIV');
        Ldiv.className='kmw-osk-static';
        Ldiv.innerHTML = Lhelp;
        osk._Box.appendChild(Ldiv);
        if(keymanweb._ActiveKeyboard['KHF']) keymanweb._ActiveKeyboard['KHF'](osk._Box);
      }
      if(keymanweb._TitleElement)
      {
        keymanweb._TitleElement.innerHTML = "<span style='font-weight:bold'>"
          + keymanweb._ActiveKeyboard['KN'] + '</span> - ' + keymanweb._TitleElement.innerHTML; // I1972  // I2186
        keymanweb._TitleElement.className=''; keymanweb._TitleElement.style.color='#fff';
      }
    }

    // Create a keytip DIV if a phone device (Build 349)
    if(device.app == '' && device.formFactor == 'phone')
    {
      if(osk.keytip == null)
      {  
        osk.keytip=util._CreateElement('DIV'); osk.keytip.className='kmw-keytip';
      }
      osk._Box.appendChild(osk.keytip);
    }
        
    // Append a stylesheet for this keyboard if needed to specify an embedded font
    osk.appendStyleSheet();     
    if(osk._Enabled) osk._Show();
  }  
  
  /**
   *  Append a style sheet for the current keyboard if needed for specifying an embedded font
   *  or to re-apply the default element font   
   *  
   **/
  osk.appendStyleSheet = function()
  {
    // Do not do anything if a null stub
    if(keymanweb._ActiveStub == null) return;

    // First remove any existing keyboard style sheet 
    if(osk.styleSheet) util.removeStyleSheet(osk.styleSheet);
    
    var i,ks=keymanweb._ActiveStub,kfd=ks['KFont'],ofd=ks['KOskFont'];

    // Add style sheets for embedded fonts if necessary (each font-face style will only be added once)
    util.addFontFaceStyleSheet(kfd); util.addFontFaceStyleSheet(ofd);
    
    // Temporarily hide the duplicated elements on non-desktop browsers
    keymanweb.alignInputs(false);
    
    // Build the style string and append (or replace) the font style sheet
    // Note: Some browsers do not download the font-face font until it is applied,
    //       so must apply style before testing for font availability 
    osk.styleSheet = util.addStyleSheet(osk.addFontStyle(kfd,ofd));  
 
    // Wait until font is loaded before applying stylesheet - test each 100 ms
    if(device.app == '' && (typeof(kfd) != 'undefined' || typeof(ofd) != 'undefined'))
    {         
      var kReady=util.checkFontDescriptor(kfd),
          oReady=util.checkFontDescriptor(ofd);   
      if(!kReady || !oReady)
      {
        var fontCheckTimer=window.setInterval(function()
        {        
          kReady=util.checkFontDescriptor(kfd);
          oReady=util.checkFontDescriptor(ofd);
          if(kReady && oReady)
          {
            window.clearInterval(fontCheckTimer);fontCheckTimer=null;
            keymanweb.alignInputs(true);    
          }    
        },100); 
        // Align anyway as best as can if apparently still no font after 5 seconds   
        window.setTimeout(function()
        {
          if(fontCheckTimer)
          {
            window.clearInterval(fontCheckTimer);fontCheckTimer=null;
            keymanweb.alignInputs(true);
            // Don't notify - this is a management issue, not anything the user needs to deal with
            // TODO: Consider having an icon in the OSK with a bubble that indicates missing font
            //util.alert('Unable to download the font normally used with '+ks['KN']+'.');
          }
        },5000);
        return;
      }
    } 
    keymanweb.alignInputs(true);
  }
          
  /**
   *  Add or replace the style sheet used to set the font for input elements and OSK
   *
   *  @param  {Object}  kfd   KFont font descriptor
   *  @param  {Object}  ofd   OSK font descriptor (if any)
   *  @return {string}
   *     
   **/                     
  osk.addFontStyle = function(kfd,ofd)
  {
    // Get name of font to be applied 
    var fn=keymanweb.baseFont;
    if(typeof(kfd) != 'undefined' && typeof(kfd['family']) != 'undefined') fn=kfd['family'];

    // Set font family chain for mapped elements: remove name from chain if present
    var rx=new RegExp('\s?'+fn+',?'),ff=keymanweb.appliedFont;
    ff=ff.replace(rx,''); ff=ff.replace(/,$/,'');

    // Then replace it at the head of the chain
    if(ff == '') ff=fn; else ff=fn+','+ff;     

    // Add to the stylesheet, with !important to override any explicit style   
    var s='.keymanweb-font{\nfont-family:'+ff+' !important;\n}\n';
    
    // Set font family for OSK text
    if(typeof(ofd) != 'undefined')
      s=s+'.kmw-key-text{\nfont-family:'+ofd['family']+';\n}\n';  
    else if(typeof(kfd) != 'undefined')
      s=s+'.kmw-key-text{\nfont-family:'+kfd['family']+';\n}\n';
    
    // Store the current font chain
    keymanweb.appliedFont=ff;

    // Return the style string   
    return s;
  } 
  
  /**
   * Function     _Unload
   * Scope        Private
   * Description  Clears OSK variables prior to exit (JMD 1.9.1 - relocation of local variables 3/9/10)
   */
  osk._Unload = function()
  {
    osk._VShift = osk._DivVKbd = osk._VKeySpans = osk._Box = 0; 
  }   

  /**
   * Save size, position, font size and visibility of OSK
   */
  osk.saveCookie = function()
  {
    var c = util.loadCookie('KeymanWeb_OnScreenKeyboard');   
    var p=osk.getPos();
    
    c['visible'] = osk._Enabled ? 1 : 0;
    c['userSet'] = osk.userPositioned ? 1 : 0;
    c['left'] = p.left; c['top'] = p.top;
    if(osk._DivVKbd)
    {
      c['width'] = osk.width; c['height'] = osk.height;
    }
    util.saveCookie('KeymanWeb_OnScreenKeyboard',c);
  }

  /**
   * Restore size, position, font size and visibility of desktop OSK
   * 
   *  @return {boolean}
   */
  osk.loadCookie = function()
  {
    var c = util.loadCookie('KeymanWeb_OnScreenKeyboard');   
    if(typeof(c) == 'undefined' || c == null) 
    {
      osk.userPositioned=false; return false;
    }
    osk._Enabled = util.toNumber(c['visible'],true); 
    osk.userPositioned = util.toNumber(c['userSet'],false); 
    osk.x = util.toNumber(c['left'],-1);     
    osk.y = util.toNumber(c['top'],-1); 

    // Restore OSK size - font size now fixed in relation to OSK height, unless overridden (in em) by keyboard
    var dfltWidth=0.3*screen.width;
    //if(util.toNumber(c['width'],0) == 0) dfltWidth=0.5*screen.width; 
    var newWidth=util.toNumber(c['width'],dfltWidth),
        newHeight=util.toNumber(c['height'],0.15*screen.height);

    // Limit the OSK dimensions to reasonable values
    if(newWidth < 0.2*screen.width) newWidth = 0.2*screen.width; 
    if(newHeight < 0.1*screen.height) newHeight = 0.1*screen.height;
    if(newWidth > 0.9*screen.width) newWidth=0.9*screen.width;
    if(newHeight > 0.5*screen.height) newWidth=0.5*screen.height;
     
    if(osk._DivVKbd) 
    {
      osk._DivVKbd.style.width=newWidth+'px';
      osk._DivVKbd.style.height=newHeight+'px';
      osk._DivVKbd.style.fontSize=(newHeight/8)+'px';
    }

    // and OSK position if user located
    if(osk.x == -1 || osk.y == -1 || (!osk._Box)) osk.userPositioned = false;   
    
    if(osk.x < window.pageXOffset-0.8*newWidth) osk.x=window.pageXOffset-0.8*newWidth;    
    if(osk.y < 0) {osk.x=-1; osk.y=-1; osk.userPositioned=false;}    

    if(osk.userPositioned && osk._Box) osk.setPos({'left':osk.x,'top':osk.y});      
    
    return true;
  } 

 /**
   *  Accept an external key ID (from KeymanTouch) and pass to the keyboard mapping
   *  
   *  @param  {string}  keyName   key identifier
   **/            
  keymanweb['executePopupKey'] = function(keyName)
  {              
      if(!keymanweb._ActiveKeyboard) return false;

      // Changes for Build 353 to resolve KMEI popup key issues      
      keyName=keyName.replace('popup-',''); //remove popup prefix if present (unlikely)      
      
      var t=keyName.split('-'),layer=(t.length>1?t[0]:osk.layerId);
      keyName=t[t.length-1];       
      if(layer == 'undefined') layer=osk.layerId;
              
      var Lelem=keymanweb._LastActiveElement,Lkc,keyShiftState=osk.getModifierState(layer);
      
      if(keymanweb._ActiveElement == null) keymanweb._ActiveElement=Lelem;    
      
      switch(keyName)
      {
        case 'K_LSHIFT':
        case 'K_RSHIFT':
        case 'K_SHIFT':
          osk.updateLayer('shift');
          osk._Show();
          return true;
        case 'K_LCONTROL':  
        case 'K_RCONTROL':  
        case 'K_LCTRL':
        case 'K_RCTRL':
        case 'K_CTRL':
          osk.updateLayer('ctrl');
          osk._Show();
          return true;
        case 'K_LMENU':
        case 'K_RMENU':
        case 'K_LALT':
        case 'K_RALT':
        case 'K_ALT':
          osk.updateLayer('alt');
          osk._Show();
          return true;
        case 'K_ALTGR':
          osk.updateLayer('ctrlalt');
          osk._Show();
          return true;
        default:
      }        
      
      
      // First check the virtual key 
      Lkc = {Ltarg:Lelem,Lmodifiers:0,Lcode:keyCodes[keyName],LisVirtualKey:true}; 

      if(typeof Lkc.Lcode == 'undefined')
        Lkc.Lcode = osk.getVKDictionaryCode(keyName);

      if(!Lkc.Lcode)
      {
        // Key code will be Unicode value for U_xxxx keys
        if(keyName.substr(0,2) == 'U_')
        {                 
          var tUnicode=parseInt(keyName.substr(2),16);
          if(!isNaN(tUnicode)) Lkc.Lcode=tUnicode;  
        }
      }
     
      //if(!Lkc.Lcode) return false;  // Value is now zero if not known (Build 347)
      //Build 353: revert to prior test to try to fix lack of KMEI output, May 1, 2014      
      if(isNaN(Lkc.Lcode) || !Lkc.Lcode) return false;  
            
      Lkc.vkCode=Lkc.Lcode;

      // Ensure that KIK returns true for U_xxxx keys to avoid firing nomatch
      if(keyName.substr(0,2) == 'U_') Lkc.isVirtualKey=false;
      
      // Define modifiers value for sending to keyboard mapping function
      Lkc.Lmodifiers = keyShiftState*0x10; 

      // Pass this key code and state to the keyboard program
      if(!keymanweb._ActiveKeyboard) return false;
      if(Lkc.Lcode == 0 ) return false;
      if(keymanweb._ActiveKeyboard['gs'](Lelem, Lkc)) return true;

      var ch=0,n=Lkc.Lcode;
      // Test for fall back to U_xxxx key id (Build 350, added here for 355)            
      if((keyName.substr(0,2) == 'U_') && (n > 32) && !(n>127 && n<!160))  
        ch=String.fromCharCode(n);
      else if(n >= 48 && n <= 57)
        ch = codesUS[keyShiftState][0][n-48];
      else if(n >=65 && n <= 90)
        ch = String.fromCharCode(n+(keyShiftState?0:32));
      else if(n >= 186 && n <= 192)
        ch = codesUS[keyShiftState][1][n-186];
      else if(n >= 219 && n <= 222)
        ch = codesUS[keyShiftState][2][n-219];

      if(ch) keymanweb.KO(0, Lelem, ch);           
              
      return true;       
  }

 /**
   *  Return position of language menu key to KeymanTouch
   *  
   *  @return  {string}      comma-separated x,y position of language menu key
   *  
   **/            
  keymanweb['touchMenuPos'] = function()
  {
    if(osk.lgKey == null) return '';
      
    var x=util._GetAbsoluteX(osk.lgKey)-util._GetAbsoluteX(osk._DivVKbd)+osk.lgKey.offsetWidth/2,
        y=util._GetAbsoluteY(osk.lgKey)-util._GetAbsoluteY(osk._DivVKbd);
    return x+','+y;
  }
   
})();

// KeymanWeb 2.0
// Copyright 2010 Tavultesoft Pty Ltd

/**
 * Cross-browser compatibility keymaps    
 */    
(function() 
{
  // Declare KeymanWeb object
  var keymanweb=window['tavultesoft']['keymanweb'];

  /* I732 START - 13/03/2007 MCD: Swedish: Start mapping of keystroke to US keyboard #2 */ 
  var ffie = keymanweb._VKMap_FF_IE = {};
  
  //ffie['k109'] = 189; // -    // These two number-pad VK rules are *not* correct for more recent FF! JMD 8/11/12
  //ffie['k107'] = 187; // =    // FF 3.0 // I2062
  ffie['k61'] = 187;  // =      // FF 2.0
  ffie['k59'] = 186;  // ;
  
  keymanweb._VKMap_Opera_IE = {};
  
  keymanweb._VKMap_Safari_IE = {};
    
  // Swedish key map
  var kmap = keymanweb._VKMap = {};
 
  kmap['se'] = {};
  kmap['se']['k220'] =  192; // `
  kmap['se']['k187'] =  189; // -
  kmap['se']['k219'] =  187; // =
  kmap['se']['k221'] =  219; // [
  kmap['se']['k186'] =  221; // ]
  kmap['se']['k191'] =  220; // \
  kmap['se']['k192'] =  186; // ;
  kmap['se']['k189'] =  191; // /

  kmap['uk'] = {};  // I1299
  kmap['uk']['k223'] =  192; // // ` U+00AC (logical not) =>  ` ~
  kmap['uk']['k192'] =  222; // ' @  =>  ' "
  kmap['uk']['k222'] =  226; // # ~  => K_oE2     // I1504 - UK keyboard mixup #, \
  kmap['uk']['k220'] =  220; // \ |  => \ |       // I1504 - UK keyboard mixup #, \
 
  /* I732 END - 13/03/2007 MCD: Swedish: mapping of keystroke to US keyboard #2 */

  /* 13/03/2007 MCD: Swedish: Legacy keyboards - map US Key Code to Character Code */  
  var s0={},s1={};

  s0['k192'] = 96;
  s0['k49'] = 49;
  s0['k50'] = 50;
  s0['k51'] = 51;
  s0['k52'] = 52;
  s0['k53'] = 53;
  s0['k54'] = 54;
  s0['k55'] = 55;
  s0['k56'] = 56;
  s0['k57'] = 57;
  s0['k48'] = 48;
  s0['k189'] = 45;
  s0['k187'] = 61;
  s0['k81'] = 113;
  s0['k87'] = 119;
  s0['k69'] = 101;
  s0['k82'] = 114;
  s0['k84'] = 116;
  s0['k89'] = 121;
  s0['k85'] = 117;
  s0['k73'] = 105;
  s0['k79'] = 111;
  s0['k80'] = 112;
  s0['k219'] = 91;
  s0['k221'] = 93;
  s0['k220'] = 92;
  s0['k65'] = 97;
  s0['k83'] = 115;
  s0['k68'] = 100;
  s0['k70'] = 102;
  s0['k71'] = 103;
  s0['k72'] = 104;
  s0['k74'] = 106;
  s0['k75'] = 107;
  s0['k76'] = 108;
  s0['k186'] = 59;
  s0['k222'] = 39;
  s0['k90'] = 122;
  s0['k88'] = 120;
  s0['k67'] = 99;
  s0['k86'] = 118;
  s0['k66'] = 98;
  s0['k78'] = 110;
  s0['k77'] = 109;
  s0['k188'] = 44;
  s0['k190'] = 46;
  s0['k191'] = 47;

  s1['k192'] = 126;
  s1['k49'] = 33;
  s1['k50'] = 64;
  s1['k51'] = 35;
  s1['k52'] = 36;
  s1['k53'] = 37;
  s1['k54'] = 94;
  s1['k55'] = 38;
  s1['k56'] = 42;
  s1['k57'] = 40;
  s1['k48'] = 41;
  s1['k189'] = 95;
  s1['k187'] = 43;
  s1['k81'] = 81;
  s1['k87'] = 87;
  s1['k69'] = 69;
  s1['k82'] = 82;
  s1['k84'] = 84;
  s1['k89'] = 89;
  s1['k85'] = 85;
  s1['k73'] = 73;
  s1['k79'] = 79;
  s1['k80'] = 80;
  s1['k219'] = 123;
  s1['k221'] = 125;
  s1['k220'] = 124;
  s1['k65'] = 65;
  s1['k83'] = 83;
  s1['k68'] = 68;
  s1['k70'] = 70;
  s1['k71'] = 71;
  s1['k72'] = 72;
  s1['k74'] = 74;
  s1['k75'] = 75;
  s1['k76'] = 76;
  s1['k186'] = 58;
  s1['k222'] = 34;
  s1['k90'] = 90;
  s1['k88'] = 88;
  s1['k67'] = 67;
  s1['k86'] = 86;
  s1['k66'] = 66;
  s1['k78'] = 78;
  s1['k77'] = 77;
  s1['k188'] = 60;
  s1['k190'] = 62;
  s1['k191'] = 63;

  keymanweb._USCharCode = [s0,s1];
    
  /**
   * Function     _USKeyCodeToCharCode
   * Scope        Private
   * @param       {Event}     Levent      KMW event object
   * @return      {number}                Character code 
   * Description Translate keyboard codes to standard US layout codes
   */    
  keymanweb._USKeyCodeToCharCode = function(Levent)
  {
    return keymanweb._USCharCode[Levent.Lmodifiers & 0x10 ? 1 : 0]['k'+Levent.Lcode];
  };
  
})();  

window['dfltLayout'] = {
	"desktop":
		{
		"font":"Tahoma",
		"layer":[
			{	
				"id":"default",
				"row":[
					{
						"id":"1",
						"key":[
							{"id":"K_BKQUOTE"},
							{"id":"K_1"},
							{"id":"K_2"},
							{"id":"K_3"},
							{"id":"K_4"},
							{"id":"K_5"},
							{"id":"K_6"},
							{"id":"K_7"},
							{"id":"K_8"},
							{"id":"K_9"},
							{"id":"K_0"},
							{"id":"K_HYPHEN"},
							{"id":"K_EQUAL"},
      				{"id":"K_BKSP","text":"*BkSp*","sp":"1","width":"130"}
							]
					},
					{
						"id":"2",
						"key":[
      				{"id":"K_TAB","text":"*Tab*","sp":"1","width":"130"},
							{"id":"K_Q"},
							{"id":"K_W"},
							{"id":"K_E"},
							{"id":"K_R"},
							{"id":"K_T"},
							{"id":"K_Y"},
							{"id":"K_U"},
							{"id":"K_I"},
							{"id":"K_O"},
							{"id":"K_P"},
							{"id":"K_LBRKT"},
							{"id":"K_RBRKT"},
							{"id":"K_BKSLASH"}
							]
					},
					{
						"id":"3",
						"key":[
      				{"id":"K_CAPS","text":"*Caps*","sp":"1","width":"165"},
							{"id":"K_A"},
							{"id":"K_S"},
							{"id":"K_D"},
							{"id":"K_F"},
							{"id":"K_G"},
							{"id":"K_H"},
							{"id":"K_J"},
							{"id":"K_K"},
							{"id":"K_L"},
							{"id":"K_COLON"},
							{"id":"K_QUOTE"},
      				{"id":"K_ENTER","text":"*Enter*","sp":"1","width":"165"}
							]
					},
					{
						"id":"4",
						"key":[
      				{"id":"K_SHIFT","text":"*Shift*","sp":"1","width":"130"},
							{"id":"K_oE2"},
							{"id":"K_Z"},
							{"id":"K_X"},
							{"id":"K_C"},
							{"id":"K_V"},
							{"id":"K_B"},
							{"id":"K_N"},
							{"id":"K_M"},
							{"id":"K_COMMA"},
							{"id":"K_PERIOD"},
							{"id":"K_SLASH"},
      				{"id":"K_RSHIFT","text":"*Shift*","sp":"1","width":"130"}
							]
					},
					{
						"id":"5",
						"key":[
      				{"id":"K_LCONTROL","text":"*Ctrl*","sp":"1","width":"170"},
      				{"id":"K_LALT","text":"*Alt*","sp":"1","width":"160"},
							{"id":"K_SPACE","text":"","width":"770"},
      				{"id":"K_ALT","text":"*Alt*","sp":"1","width":"160"},
      				{"id":"K_RCONTROL","text":"*Ctrl*","sp":"1","width":"170"}
							]
					}
					]
			}      
			]
		},
	"tablet":
		{
		"font":"Tahoma",
		"layer":[
			{	
				"id":"default",
				"row":[
				  {
						"id":"0",
            "key":[
							{"id":"K_1"},
							{"id":"K_2"},
							{"id":"K_3"},
							{"id":"K_4"},
							{"id":"K_5"},
							{"id":"K_6"},
							{"id":"K_7"},
							{"id":"K_8"},
							{"id":"K_9"},
							{"id":"K_0"},
							{"id":"K_HYPHEN"},
							{"id":"K_EQUAL"},
							{"sp":"10","width":"1"}
              ]				  
				  },
					{
						"id":"1",
						"key":[
							{"id":"K_Q","pad":"25"},
							{"id":"K_W"},
							{"id":"K_E"},
							{"id":"K_R"},
							{"id":"K_T"},
							{"id":"K_Y"},
							{"id":"K_U"},
							{"id":"K_I"},
							{"id":"K_O"},
							{"id":"K_P"},
							{"id":"K_LBRKT"},
							{"id":"K_RBRKT"},
							{"sp":"10","width":"1"}
							]
					},
					{
						"id":"2",
						"key":[
							{"id":"K_A","pad":"50"},
							{"id":"K_S"},
							{"id":"K_D"},
							{"id":"K_F"},
							{"id":"K_G"},
							{"id":"K_H"},
							{"id":"K_J"},
							{"id":"K_K"},
							{"id":"K_L"},
							{"id":"K_COLON"}, 
							{"id":"K_QUOTE"},
							{"id":"K_BKSLASH","width":"90"}
							]
					},
					{
						"id":"3",
						"key":[
						  {"id":"K_oE2","width":"90"},
							{"id":"K_Z"},
							{"id":"K_X"},
							{"id":"K_C"},
							{"id":"K_V"},
							{"id":"K_B"},
							{"id":"K_N"},
							{"id":"K_M"},
							{"id":"K_COMMA"},
							{"id":"K_PERIOD"},
							{"id":"K_SLASH"},
							{"id":"K_BKQUOTE"},
							{"sp":"10","width":"1"}							
							]
					},
					{
						"id":"4",
						"key":[
      				{"id":"K_SHIFT","text":"*Shift*","sp":"1","width":"140","sk":[
                {"id":"K_LCONTROL","text":"*Ctrl*","sp":"1","width":"50","nextlayer":"ctrl"},
                {"id":"K_LALT","text":"*Alt*","sp":"1","width":"50","nextlayer":"alt"},
                {"id":"K_ALTGR","text":"*AltGr*","sp":"1","width":"50","nextlayer":"ctrlalt"}]
              },
      				{"id":"K_LOPT","text":"*Menu*","sp":"1","width":"120"},
      				{"id":"K_TAB","text":"*Tab*","sp":"1","width":"120"},
							{"id":"K_SPACE","text":"","width":"500"},
      				{"id":"K_BKSP","text":"*BkSp*","sp":"1","width":"120"},
      				{"id":"K_ROPT","text":"*Hide*","sp":"1","width":"120"},
      				{"id":"K_ENTER","text":"*Enter*","sp":"1","width":"120"}
							]
					}
					]
			}                                          
			]
		},
	"phone":
		{
		"font":"Tahoma",
		"layer":[
			{	
				"id":"default",
				"row":[
				  {
						"id":"0",
            "key":[
							{"id":"K_1"},
							{"id":"K_2"},
							{"id":"K_3"},
							{"id":"K_4"},
							{"id":"K_5"},
							{"id":"K_6"},
							{"id":"K_7"},
							{"id":"K_8"},
							{"id":"K_9"},
							{"id":"K_0"},
							{"id":"K_HYPHEN"},
							{"id":"K_EQUAL"},
							{"sp":"10","width":"1"}
              ]				  
				  },
					{
						"id":"1",
						"key":[
							{"id":"K_Q","pad":"25"},
							{"id":"K_W"},
							{"id":"K_E"},
							{"id":"K_R"},
							{"id":"K_T"},
							{"id":"K_Y"},
							{"id":"K_U"},
							{"id":"K_I"},
							{"id":"K_O"},
							{"id":"K_P"},
							{"id":"K_LBRKT"},
							{"id":"K_RBRKT"},
							{"sp":"10","width":"1"}
							]
					},
					{
						"id":"2",
						"key":[
							{"id":"K_A","pad":"50"},
							{"id":"K_S"},
							{"id":"K_D"},
							{"id":"K_F"},
							{"id":"K_G"},
							{"id":"K_H"},
							{"id":"K_J"},
							{"id":"K_K"},
							{"id":"K_L"},
							{"id":"K_COLON"}, 
							{"id":"K_QUOTE"},
							{"id":"K_BKSLASH","width":"90"}
							]
					},
					{
						"id":"3",
						"key":[
						  {"id":"K_oE2","width":"90"},
							{"id":"K_Z"},
							{"id":"K_X"},
							{"id":"K_C"},
							{"id":"K_V"},
							{"id":"K_B"},
							{"id":"K_N"},
							{"id":"K_M"},
							{"id":"K_COMMA"},
							{"id":"K_PERIOD"},
							{"id":"K_SLASH"},
							{"id":"K_BKQUOTE"},
							{"sp":"10","width":"1"}							
							]
					},
					{
						"id":"4",
						"key":[
      				{"id":"K_SHIFT","text":"*Shift*","sp":"1","width":"140","sk":[
                {"id":"K_LCONTROL","text":"*Ctrl*","sp":"1","width":"50","nextlayer":"ctrl"},
                {"id":"K_LALT","text":"*Alt*","sp":"1","width":"50","nextlayer":"alt"},
                {"id":"K_ALTGR","text":"*AltGr*","sp":"1","width":"50","nextlayer":"ctrlalt"}]
              },
      				{"id":"K_LOPT","text":"*Menu*","width":"120","sp":"1"},
      				{"id":"K_TAB","text":"*Tab*","width":"120","sp":"1"},
							{"id":"K_SPACE","width":"500","text":""},
      				{"id":"K_BKSP","text":"*BkSp*","width":"120","sp":"1"},
      				{"id":"K_ROPT","text":"*Hide*","width":"120","sp":"1"},
      				{"id":"K_ENTER","text":"*Enter*","width":"120","sp":"1"}
							]
					}
					]
			}                                          
			]
		}
	};

// KeymanWeb 2.0
// Copyright 2013 Tavultesoft Pty Ltd

/********************************************************/
/*                                                      */
/* Automatically initialize keymanweb with defaults for */ 
/* subscription version after the page is fully loaded  */ 
/*                                                      */
/********************************************************/

(function()
{
  // Declare KeymanWeb object
  var keymanweb=window['tavultesoft']['keymanweb'];

  if(document.readyState === 'complete')
  {
    keymanweb.init(null);
  }
  else
  {
    var readyStateCheckInterval = window.setInterval(function() {
      if (document.readyState === "complete") 
      {
        window.clearInterval(readyStateCheckInterval);
        keymanweb.init(null);
      }
    }, 10);    
  }      
})();
