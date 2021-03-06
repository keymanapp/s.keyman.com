namespace com.keyman {
  /*
  * Note that for many of the actual events represented by methods in this file, `this` is replaced 
  * automatically by JavaScript's event handling system.  As such, many 'wrapper' variants of the events
  * exist to restore the object-oriented hierarchy below.
  * 
  */

  export class CommonDOMStates {
    _DisableInput: boolean = false;         // Should input be disabled?
    _IgnoreNextSelChange: number = 0;       // when a visual keyboard key is mouse-down, ignore the next sel change because this stuffs up our history  
    _Selection = null;
    _SelectionControl: any = null;   // Type behavior is as with activeElement and the like.
    
    activeElement: any;       // TODO:  Add type and fix resulting bugs!
    lastActiveElement: any;   // TODO:  Add type and fix resulting bugs!

    focusing: boolean;
    focusTimer: number;

    changed: boolean;         // Tracks if the element has been edited since gaining focus.

    /* ----------------------- Static event-related methods ------------------------ */

    setFocusTimer(): void {
      this.focusing=true;

      this.focusTimer = window.setTimeout(function() {
        this.focusing=false;
      }.bind(this), 1000)
    }
  }

  /**
   * Declares a base, non-touch oriented implementation of all relevant DOM-related event handlers and state functions.
   */
  export class DOMEventHandlers {
    // TODO:  resolve/refactor out!
    protected keyman: KeymanBase;

    // This is only static within a given initialization of KeymanWeb.  Perhaps it would be best as an initialization 
    // parameter and member field?
    static states: CommonDOMStates = new CommonDOMStates();

    constructor(keyman: KeymanBase) {
      this.keyman = keyman;
    }

    /**
     * Handle receiving focus by simulated input field
     */       
    setFocus: (e?: TouchEvent|MSPointerEvent) => void = function(e?: TouchEvent|MSPointerEvent): void {
      // Touch-only handler.
    }.bind(this);
    
    /**
     * Get simulated input field content
     *    
     * @param       {Object}        e     element (object) of simulated input field
     * @return      {string}              entire text in simulated input field
     */       
    getText(e: HTMLElement): string {
      // Touch-only method.
      return '';
    }
    
    /**
     *Insert text into simulated input field at indicated character position
      * 
      * @param       {Object}      e     simulated input field DIV
      * @param       {?string}     t     text to insert in element
      * @param       {?number}     cp    caret position (characters)     
      */       
    setText(e: HTMLElement, t?: string, cp?: number): void {
      // Touch-only method.
    }
    
    /**
     * Get text up to the caret from simulated input field 
     *    
     * @return      {string}   
     */       
    getTextBeforeCaret(e: HTMLElement): string {
      // Touch-only method.
      return '';
    }

    /**
     * Replace text up to the caret in the simulated input field 
     *    
     * @param       {Object}        e     element (object) of simulated input field
     * @param       {string}        t     Context for simulated input field
     */       
    setTextBeforeCaret(e: HTMLElement, t: string): void {
      // Touch-only method.
    }

    /**
     * Description  Get current position of caret in simulated input field 
     *    
     * @param       {Object}        e     element (object) of simulated input field
     * @return      {number}              caret character position in simulated input field
     */       
    getTextCaret(e: HTMLElement): number {
      // Touch-only method.
      return 0;
    }
    
    /**
     * Set current position of caret in simulated input field then display the caret 
     *    
     * @param       {Object}        e     element (object) of simulated input field
     * @param       {number}        cp    caret character position in simulated input field
     */       
    setTextCaret(e: HTMLElement, cp: number): void {
      // Touch-only method.
    }
    
    /**
     * Hides the simulated caret for touch-aliased elements.
     */       
    hideCaret(): void {
      // Touch-only method.
    }
    
    /**
     * Toggle state of caret in simulated input field
     */       
    flashCaret: () => void = function(): void {
      // Touch-only handler.
    }.bind(this);

    /**
     * Correct the position and size of a duplicated input element
     *    
     * @param       {Object}        x     element
     */       
    updateInput(x: HTMLElement) {
      // Touch-only method.
    }

    /** 
     * Handles touch-based loss of focus events.
     */
    setBlur: (e: FocusEvent) => void = function(e: FocusEvent) {
      // Touch-only handler.
    }.bind(this);

    // End of I3363 (Build 301) additions

    // Universal DOM event handlers (both desktop + touch)

    //TODO: add more complete description of what ControlFocus really does
    /**
     * Respond to KeymanWeb-aware input element receiving focus 
     */    
    _ControlFocus: (e: FocusEvent) => boolean = function(this: DOMEventHandlers, e: FocusEvent): boolean {
      var Ltarg: HTMLElement | Document, Ln;
      var device = this.keyman.util.device;
      var osk = this.keyman.osk;

      e = this.keyman._GetEventObject<FocusEvent>(e);     // I2404 - Manage IE events in IFRAMEs
      Ltarg = this.keyman.util.eventTarget(e) as HTMLElement;
      if (Ltarg == null) {
        return true;
      }
    
      // Prevent any action if a protected input field
      if(device.touchable && (Ltarg.className == null || Ltarg.className.indexOf('keymanweb-input') < 0)) {
        return true;
      }

      // Or if not a remappable input field
      var en=Ltarg.nodeName.toLowerCase();
      if(Ltarg.ownerDocument && Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLInputElement) {
        var et=Ltarg.type.toLowerCase();
        if(!(et == 'text' || et == 'search')) {
          return true;
        }
      } else if((device.touchable || !Ltarg.isContentEditable) 
          && !(Ltarg.ownerDocument && Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLTextAreaElement)) {
        return true;
      }

      DOMTouchHandlers.states.activeElement = Ltarg;  // I3363 (Build 301)  

      if (Ltarg.nodeType == 3) { // defeat Safari bug
        Ltarg = Ltarg.parentNode as HTMLElement;
      }
        
      var LfocusTarg = Ltarg;

      // Ensure that focussed element is visible above the keyboard
      if(Ltarg.className == null || Ltarg.className.indexOf('keymanweb-input') < 0) {
        if(this instanceof DOMTouchHandlers) {
          (this as DOMTouchHandlers).scrollBody(Ltarg);
        }
      }
          
      if(Ltarg.ownerDocument && Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLIFrameElement) { //**TODO: check case reference
        this.keyman.domManager._AttachToIframe(Ltarg as HTMLIFrameElement);
        Ltarg=Ltarg.contentWindow.document;
      }

      //??keymanweb._Selection = null;

      // We condition on 'priorElement' below as a check to allow KMW to set a default active keyboard.
      var priorElement = DOMEventHandlers.states.lastActiveElement;
      DOMEventHandlers.states.lastActiveElement = Ltarg;

      if(this.keyman.uiManager.justActivated) {
        this._BlurKeyboardSettings();
      } else {
        this._FocusKeyboardSettings(priorElement ? false : true);
      }

      // Always do the common focus stuff, instantly returning if we're in an editable iframe.
      if(this._CommonFocusHelper(Ltarg)) {
        return true;
      };

      Ltarg._KeymanWebSelectionStart = Ltarg._KeymanWebSelectionEnd = null; // I3363 (Build 301)

      // Set element directionality (but only if element is empty)
      if(Ltarg.ownerDocument && Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLElement) {
        this.keyman.domManager._SetTargDir(Ltarg);
      }

      //Execute external (UI) code needed on focus if required
      this.doControlFocused(LfocusTarg, DOMEventHandlers.states.lastActiveElement);
    
      // Force display of OSK for touch input device, or if a CJK keyboard, to ensure visibility of pick list
      if(device.touchable) {
        osk._Enabled = true;
      } else {
        // Conditionally show the OSK when control receives the focus
        if(osk.ready) {
          if(this.keyman.keyboardManager.isCJK()) {
            osk._Enabled = true;
          }
          if(osk._Enabled) {
            osk._Show();
          } else {
            osk._Hide(false);
          }
        }
      }

      return true;
    }.bind(this);

    /**
     * Function     doControlFocused
     * Scope        Private
     * @param       {Object}            _target         element gaining focus
     * @param       {Object}            _activeControl  currently active control
     * @return      {boolean}   
     * Description  Execute external (UI) code needed on focus
     */       
    doControlFocused(_target: HTMLElement, _activeControl: HTMLElement): boolean {
      var p={};
      p['target']=_target;
      p['activeControl']=_activeControl;

      return this.keyman.util.callEvent('kmw.controlfocused',p);
    }

    /**
     * Respond to KMW losing focus on event
     */    
    _ControlBlur: (e: FocusEvent) => boolean = function(this: DOMEventHandlers, e: FocusEvent): boolean {
      var Ltarg: HTMLElement | Document;  

      e = this.keyman._GetEventObject<FocusEvent>(e);   // I2404 - Manage IE events in IFRAMEs
      Ltarg = this.keyman.util.eventTarget(e) as HTMLElement;
      if (Ltarg == null) {
        return true;
      }

      DOMEventHandlers.states.activeElement = null; // I3363 (Build 301)

      // Hide the touch device input caret, if applicable  I3363 (Build 301)
      if(this instanceof DOMTouchHandlers) {
        this.hideCaret();
      }
      
      if (Ltarg.nodeType == 3) { // defeat Safari bug
        Ltarg = Ltarg.parentNode as HTMLElement;
      }

      if(Ltarg.ownerDocument) {
        if(Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLIFrameElement) {
          Ltarg=Ltarg.contentWindow.document;
        }
          
        if (Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLInputElement 
            || Ltarg instanceof Ltarg.ownerDocument.defaultView.HTMLTextAreaElement) {
          //Ltarg._KeymanWebSelectionStart = Ltarg.selectionStart;
          //Ltarg._KeymanWebSelectionEnd = Ltarg.selectionEnd;
          Ltarg._KeymanWebSelectionStart = Ltarg.value._kmwCodeUnitToCodePoint(Ltarg.selectionStart);  //I3319
          Ltarg._KeymanWebSelectionEnd = Ltarg.value._kmwCodeUnitToCodePoint(Ltarg.selectionEnd);  //I3319
        }
      }
      
      ////keymanweb._SelectionControl = null;    
      this._BlurKeyboardSettings();

      // Now that we've handled all prior-element maintenance, update the 'last active element'.
      DOMEventHandlers.states.lastActiveElement = Ltarg;

      /* If the KeymanWeb UI is active as a user changes controls, all UI-based effects should be restrained to this control in case
      * the user is manually specifying languages on a per-control basis.
      */
      this.keyman.uiManager.justActivated = false;
      
      var isActivating = this.keyman.uiManager.isActivating;
      if(!isActivating) {
        this.keyman.keyboardManager.notifyKeyboard(0, Ltarg, 0);  // I2187
      }

      //e = this.keyman._GetEventObject<FocusEvent>(e);   // I2404 - Manage IE events in IFRAMEs  //TODO: is this really needed again????
      this.doControlBlurred(Ltarg, e, isActivating);

      // Hide the OSK when the control is blurred, unless the UI is being temporarily selected
      if(this.keyman.osk.ready && !isActivating) {
        this.keyman.osk._Hide(false);
      }

      this.doChangeEvent(Ltarg);
      this.keyman.interface.resetContext();

      return true;
    }.bind(this);

    /**
     * Function     doControlBlurred
     * Scope        Private
     * @param       {Object}            _target       element losing focus
     * @param       {Event}             _event        event object
     * @param       {(boolean|number)}  _isActivating activation state
     * @return      {boolean}      
     * Description  Execute external (UI) code needed on blur
     */       
    doControlBlurred(_target: HTMLElement|Document, _event: Event, _isActivating: boolean|number): boolean {
      var p={};
      p['target']=_target;
      p['event']=_event;
      p['isActivating']=_isActivating;

      return this.keyman.util.callEvent('kmw.controlblurred',p);
    }

    /**
     * Function             _BlurKeyboardSettings
     * Description          Stores the last active element's keyboard settings.  Should be called
     *                      whenever a KMW-enabled page element loses control.
     */
    _BlurKeyboardSettings(PInternalName?: string, PLgCode?: string) {
      var keyboardID = this.keyman.keyboardManager.activeKeyboard ? this.keyman.keyboardManager.activeKeyboard['KI'] : '';
      var langCode = this.keyman.keyboardManager.getActiveLanguage();
      
      if(PInternalName !== undefined && PLgCode !== undefined) {
        keyboardID = PInternalName;
        langCode = PLgCode;
      }
      
      var lastElem = DOMEventHandlers.states.lastActiveElement;
      if(lastElem && lastElem._kmwAttachment.keyboard != null) {
        lastElem._kmwAttachment.keyboard = keyboardID;
        lastElem._kmwAttachment.languageCode = langCode;
      } else {
        this.keyman.globalKeyboard = keyboardID;
        this.keyman.globalLanguageCode = langCode;
      }
    }

    /**
     * Function             _FocusKeyboardSettings
     * @param   {boolean}   blockGlobalChange   A flag indicating if the global keyboard setting should be ignored for this call.
     * Description          Restores the newly active element's keyboard settings.  Should be called
     *                      whenever a KMW-enabled page element gains control, but only once the prior
     *                      element's loss of control is guaranteed.
     */ 
    _FocusKeyboardSettings(blockGlobalChange: boolean) {
      var lastElem = DOMEventHandlers.states.lastActiveElement;
      if(lastElem && lastElem._kmwAttachment.keyboard != null) {      
        this.keyman.keyboardManager.setActiveKeyboard(lastElem._kmwAttachment.keyboard, 
          lastElem._kmwAttachment.languageCode); 
      } else if(!blockGlobalChange) { 
        this.keyman.keyboardManager.setActiveKeyboard(this.keyman.globalKeyboard, this.keyman.globalLanguageCode);
      }
    }

    /**
     * Function             _CommonFocusHelper
     * @param   {Element}   target 
     * @returns {boolean}
     * Description          Performs common state management for the various focus events of KeymanWeb.                      
     *                      The return value indicates whether (true) or not (false) the calling event handler 
     *                      should be terminated immediately after the call.
     */
    _CommonFocusHelper(target: HTMLElement|Document): boolean {
      var uiManager = this.keyman.uiManager;
      //TODO: the logic of the following line doesn't look right!!  Both variables are true, but that doesn't make sense!
      //_Debug(keymanweb._IsIEEditableIframe(Ltarg,1) + '...' +keymanweb._IsMozillaEditableIframe(Ltarg,1));
      if(target.ownerDocument && target instanceof target.ownerDocument.defaultView.HTMLIFrameElement) {
        if(!this.keyman.domManager._IsIEEditableIframe(target, 1) ||
            !this.keyman.domManager._IsMozillaEditableIframe(target, 1)) {
          DOMEventHandlers.states._DisableInput = true; 
          return true;
        }
      }
      DOMEventHandlers.states._DisableInput = false; 

      if(!uiManager.justActivated) {
        // Needs refactor when the Callbacks interface PR goes through!
        this.keyman['interface']._DeadKeys = [];
        this.keyman.keyboardManager.notifyKeyboard(0,target,1);  // I2187
      }
    
      if(!uiManager.justActivated && DOMEventHandlers.states._SelectionControl != target) {
        uiManager.isActivating = false;
      }
      uiManager.justActivated = false;

      DOMEventHandlers.states._SelectionControl = target;
      return false;
    }

    /**
     * Function   _SelectionChange
     * Scope      Private
     * Description Respond to selection change event 
     */
    _SelectionChange: () => boolean = function(this: DOMEventHandlers): boolean {
      if(DOMEventHandlers.states._IgnoreNextSelChange) {
        DOMEventHandlers.states._IgnoreNextSelChange--;
      } 
      return true;
    }.bind(this);


    /**
     * Function     _KeyDown
     * Scope        Private
     * Description  Processes keydown event and passes data to keyboard. 
     * 
     * Note that the test-case oriented 'recorder' stubs this method to facilitate keystroke
     * recording for use in test cases.  If changing this function, please ensure the recorder is
     * not affected.
     */ 
    _KeyDown: (e: KeyboardEvent) => boolean = function(this: DOMEventHandlers, e: KeyboardEvent): boolean {
      var activeKeyboard = this.keyman.keyboardManager.activeKeyboard;
      var osk = this.keyman.osk;
      var util = this.keyman.util;

      if(DOMEventHandlers.states._DisableInput || activeKeyboard == null) {
        return true;
      }

      // Prevent mapping element is readonly or tagged as kmw-disabled
      var el=util.eventTarget(e) as HTMLElement;
      if(util.device.touchable) {
        if(el && typeof el.kmwInput != 'undefined' && el.kmwInput == false) {
          return true;
        }
      } else if(el && el.className.indexOf('kmw-disabled') >= 0) {
        return true; 
      }
      
      // Or if OSK not yet ready (for any reason)
      if(!osk.ready) {
        return true;
      }
      
      return this.keyman.textProcessor.keyDown(e);
    }.bind(this);

    doChangeEvent(_target: HTMLElement|Document) {
      if(DOMEventHandlers.states.changed) {
        var event: Event;
        if(typeof Event == 'function') {
          event = new Event('change', {"bubbles": true, "cancelable": false});
        } else { // IE path
          event = document.createEvent("HTMLEvents");
          event.initEvent('change', true, false);
        }

        // Ensure that touch-aliased elements fire as if from the aliased element.
        if(_target['base'] && _target['base']['kmw_ip']) {
          _target = _target['base'];
        }
        _target.dispatchEvent(event);
      }

      DOMEventHandlers.states.changed = false;
    }

    /**
     * Function     _KeyPress
     * Scope        Private
     * Description Processes keypress event (does not pass data to keyboard)
     */       
    _KeyPress: (e: KeyboardEvent) => boolean = function(this: DOMEventHandlers, e: KeyboardEvent): boolean {
      if(DOMEventHandlers.states._DisableInput || this.keyman.keyboardManager.activeKeyboard == null) {
        return true;
      }

      return this.keyman.textProcessor.keyPress(e);
    }.bind(this);

    /**
     * Function     _KeyUp
     * Scope        Private
     * Description Processes keyup event and passes event data to keyboard
     */       
    _KeyUp: (e: KeyboardEvent) => boolean = function(this: DOMEventHandlers, e: KeyboardEvent): boolean {
      var keyboardManager = this.keyman.keyboardManager;
      let processor = this.keyman.textProcessor;
      var osk = this.keyman.osk;

      var Levent = processor._GetKeyEventProperties(e, false);
      if(Levent == null || !osk.ready) {
        return true;
      }

      // Since this part concerns DOM element + browser interaction management, we preprocess it for
      // browser form commands before passing control to the Processor module.
      if(Levent.Lcode == 13) {
        var ignore = false;
        if(Levent.Ltarg instanceof Levent.Ltarg.ownerDocument.defaultView.HTMLTextAreaElement) {
          ignore = true;
        }
      
        if(Levent.Ltarg.base && Levent.Ltarg.base instanceof Levent.Ltarg.base.ownerDocument.defaultView.HTMLTextAreaElement) {
          ignore = true;
        }

        if(!ignore) {
          // For input fields, move to next input element
          if(Levent.Ltarg instanceof Levent.Ltarg.ownerDocument.defaultView.HTMLInputElement) {
            var inputEle = Levent.Ltarg;
            if(inputEle.type == 'search' || inputEle.type == 'submit') {
              inputEle.form.submit();
            } else {
              this.keyman.domManager.moveToNext(false);
            }
          }
          return true;
        }
      }      
                  
      return processor.keyUp(e);
    }.bind(this);
  }

  // -------------------------------------------------------------------------

  /**
   * Defines numerous functions for handling and modeling touch-based aliases.
   */
  export class DOMTouchHandlers extends DOMEventHandlers {
    // Stores the simulated caret element.
    caret: HTMLDivElement;
    caretTimerId: number;

    firstTouch: {
      x: number;
      y: number;
    };

    
    constructor(keyman: KeymanBase) {
      super(keyman);

      this.initCaret();
    }

    initCaret(): void {
      /**
       * Create a caret to be appended to the scroller of the focussed input field. 
       * The caret is appended to the scroller so that it will automatically be clipped 
       * when the user manually scrolls it outside the element boundaries.          
       * It is positioned exactly over the hidden span that is inserted between the
       * text spans before and after the insertion point.          
       */
      this.caret=<HTMLDivElement> document.createElement('DIV');
      var cs=this.caret.style;
      cs.position='absolute';
      cs.height='16px';           // default height, actual height set from element properties
      cs.width='2px';
      cs.backgroundColor='blue';
      cs.border='none';
      cs.left=cs.top='0px';           // actual position set relative to parent when displayed
      cs.display='block';         
      cs.visibility='hidden';
      cs.zIndex='9998';           // immediately below the OSK

      // Start the caret flash timer
      this.caretTimerId = window.setInterval(this.flashCaret,500);
    }

    /**
     * Handle receiving focus by simulated input field 
     *      
     */       
    setFocus: (e?: TouchEvent|MSPointerEvent) => void = function(this: DOMTouchHandlers, e?: TouchEvent|MSPointerEvent): void {
      var kmw = this.keyman;
      var osk = this.keyman.osk;
      var util = this.keyman.util;

      DOMEventHandlers.states.setFocusTimer();

      var tEvent: {
        clientX: number;
        clientY: number;
        target?: EventTarget;
      };

      if(Util.instanceof(e, "TouchEvent")) {
          tEvent=(e as TouchEvent).touches[0];
      } else { // Allow external code to set focus and thus display the OSK on touch devices if required (KMEW-123)
        tEvent={clientX:0, clientY:0}
        // Will usually be called from setActiveElement, which should define DOMEventHandlers.states.lastActiveElement
        if(DOMEventHandlers.states.lastActiveElement) {
          tEvent.target = DOMEventHandlers.states.lastActiveElement['kmw_ip'];
        // but will default to first input or text area on page if DOMEventHandlers.states.lastActiveElement is null
        } else {
          tEvent.target = this.keyman.domManager.sortedInputs[0]['kmw_ip'];
        }
      }    
      
      var touchX=tEvent.clientX,touchY=tEvent.clientY;
      var tTarg=tEvent.target as HTMLElement;
      var scroller: HTMLElement;

      // Identify the scroller element
      if(Util.instanceof(tTarg, "HTMLSpanElement")) {
        scroller=tTarg.parentNode as HTMLElement;
      } else if(tTarg.className != null && tTarg.className.indexOf('keymanweb-input') >= 0) {
        scroller=tTarg.firstChild as HTMLElement;
      } else {
        scroller=tTarg;
      }

      // And the actual target element        
      var target=scroller.parentNode as HTMLElement;

      // Move the caret and refocus if necessary     
      if(DOMEventHandlers.states.activeElement != target) {
        // Hide the KMW caret
        this.hideCaret(); 
        DOMEventHandlers.states.activeElement=target;
        // The issue here is that touching a DIV does not actually set the focus for iOS, even when enabled to accept focus (by setting tabIndex=0)
        // We must explicitly set the focus in order to remove focus from any non-KMW input
        target.focus();  //Android native browsers may not like this, but it is needed for Chrome, Safari
      }  
      
      // Correct element directionality if required
      this.keyman.domManager._SetTargDir(target);  
      // What we really want to do is to blur any active element that is not a KMW input, 
      // but the following line does not work as might be expected, even though the correct element is referenced.
      // It is as though blur is ignored if focus is supposed to have been moved, even if it has not in fact been moved?
      //if(document.activeElement.nodeName != 'DIV' && document.activeElement.nodeName != 'BODY') document.activeElement.blur();
      
      // And display the OSK if not already visible
      if(osk.ready && !osk._Visible) {
        osk._Show();
      }
      
      // If clicked on DIV, set caret to end of text
      if(Util.instanceof(tTarg, "HTMLDivElement")) { 
        var x,cp;
        x=util._GetAbsoluteX(scroller.firstChild as HTMLElement);        
        if(target.dir == 'rtl') { 
          x += (scroller.firstChild as HTMLElement).offsetWidth;        
          cp=(touchX > x ? 0 : 100000);
        } else {
          cp=(touchX<x ? 0 : 100000);
        }
    
        this.setTextCaret(target,cp);
        this.scrollInput(target);        
      } else { // Otherwise, if clicked on text in SPAN, set at touch position
        var caret,cp,cpMin,cpMax,x,y,dy,yRow,iLoop;
        caret=scroller.childNodes[1]; //caret span
        cpMin=0;
        cpMax=this.getText(target)._kmwLength();
        cp=this.getTextCaret(target);
        dy=document.body.scrollTop;

        // Vertical scrolling
        if(target.base instanceof target.base.ownerDocument.defaultView.HTMLTextAreaElement) {
          yRow=Math.round(target.base.offsetHeight/(target.base as HTMLTextAreaElement).rows);     
          for(iLoop=0; iLoop<16; iLoop++)
          {
            y=util._GetAbsoluteY(caret)-dy;  //top of caret            
            if(y > touchY && cp > cpMin && cp != cpMax) {cpMax=cp; cp=Math.round((cp+cpMin)/2);}
            else if(y < touchY-yRow && cp < cpMax && cp != cpMin) {cpMin=cp; cp=Math.round((cp+cpMax)/2);}
            else break;
            this.setTextCaret(target,cp);
          }

          while(util._GetAbsoluteY(caret)-dy > touchY && cp > cpMin) {
            this.setTextCaret(target,--cp);
          }

          while(util._GetAbsoluteY(caret)-dy < touchY-yRow && cp < cpMax) {
            this.setTextCaret(target,++cp);
          }
        }

        // Caret repositioning for horizontal scrolling of RTL text

        // snapOrder - 'snaps' the touch location in a manner corresponding to the 'ltr' vs 'rtl' orientation.
        // Think of it as performing a floor() function, but the floor depends on the origin's direction.
        var snapOrder;
        if(target.dir == 'rtl') {  // I would use arrow functions, but IE doesn't like 'em.
          snapOrder = function(a, b) {
            return a < b; 
          };
        } else {
          snapOrder = function(a, b) { 
            return a > b; 
          };
        }

        for(iLoop=0; iLoop<16; iLoop++) {
          x=util._GetAbsoluteX(caret);  //left of caret            
          if(snapOrder(x, touchX) && cp > cpMin && cp != cpMax) {
            cpMax=cp; 
            cp=Math.round((cp+cpMin)/2);
          } else if(!snapOrder(x, touchX) && cp < cpMax && cp != cpMin) {
            cpMin=cp; 
            cp=Math.round((cp+cpMax)/2);
          } else {
            break;
          }
          this.setTextCaret(target,cp);
        }

        while(snapOrder(util._GetAbsoluteX(caret), touchX) && cp > cpMin) {
          this.setTextCaret(target,--cp);
        }
        while(!snapOrder(util._GetAbsoluteX(caret), touchX) && cp < cpMax) {
          this.setTextCaret(target,++cp);
        }
      }

      /**
       * This event will trigger before keymanweb.setBlur is triggered.  Now that we're allowing independent keyboard settings
       * for controls, we have to act here to preserve the outgoing control's keyboard settings.
       *
       * If we 'just activated' the KeymanWeb UI, we need to save the new keyboard change as appropriate.
       */  
      this._BlurKeyboardSettings();

      // With the attachment API update, we now directly track the old legacy control behavior.
      DOMEventHandlers.states.lastActiveElement = target;

      /**
       * If we 'just activated' the KeymanWeb UI, we need to save the new keyboard change as appropriate.
       * If not, we need to activate the control's preferred keyboard.
       */
      this._FocusKeyboardSettings(false);
      
      // Always do the common focus stuff, instantly returning if we're in an editable iframe.
      // This parallels the if-statement in _ControlFocus - it may be needed as this if-statement in the future,
      // despite its present redundancy.
      if(this._CommonFocusHelper(target)) {
        return;
      }
    }.bind(this);
        
    getText(e: HTMLElement): string {
      if(e == null) {
        return '';
      }

      return e.textContent;
    } 

    setText(e: HTMLElement, t?: string, cp?: number): void {
      if(e && e.childNodes.length > 0) {
        var d=e.firstChild,tLen=0;
        if(d.childNodes.length >= 3) {
          var s1=<HTMLElement> d.childNodes[0], s2=<HTMLElement> d.childNodes[2],t1,t2;
          
          // Read current text if null passed (for caret positioning)
          if(t === null) {
            t1=s1.textContent;
            t2=s2.textContent;
            t=t1+t2;        
          }

          if(cp < 0) {
            cp = 0;    //if(typeof t._kmwLength == 'undefined') return;
          }
          tLen=t._kmwLength();
          
          if(cp === null || cp > tLen) {
            cp=tLen;
          }
          t1=t._kmwSubstr(0,cp);
          t2=t._kmwSubstr(cp);
                              
          s1.textContent=t1;
          s2.textContent=t2;
        }
      }

      this.updateBaseElement(e,tLen); // KMW-3, KMW-29
    }

    getTextBeforeCaret(e: HTMLElement) {
      if(e && e.childNodes.length > 1) {
        var d=e.firstChild;
        if(d.childNodes.length > 0) {
          var s1=<HTMLElement> d.childNodes[0];
          return s1.textContent;
        }
      }

      return '';    
    }
        
    setTextBeforeCaret(e: HTMLElement, t: string): void {
      if(e && e.childNodes.length > 0) {
        var d=e.firstChild,tLen=0;
        if(d.childNodes.length > 1) {
          var s1=<HTMLElement> d.childNodes[0], s2=<HTMLElement> d.childNodes[2];
          // Collapse (trailing) whitespace to a single space for INPUT fields (also prevents wrapping)
          if(e.base.nodeName != 'TEXTAREA') {
            t=t.replace(/\s+$/,' ');
          }
          s1.textContent=t;
          // Test total length in order to control base element visibility 
          tLen=t.length;
          tLen=tLen+s2.textContent.length;           
        }
      }
      
      // Update the base element then scroll into view if necessary      
      this.updateBaseElement(e,tLen); //KMW-3, KMW-29      
      this.scrollInput(e); 
    }

    getTextCaret(e: HTMLElement): number {
      return this.getTextBeforeCaret(e)._kmwLength();
    }
    
    setTextCaret(e: HTMLElement, cp: number): void {
      this.setText(e,null,cp);
      this.showCaret(e);
    }

    hideCaret() {
      var e=DOMEventHandlers.states.lastActiveElement, s=null;
      if(e && e.className != null && e.className.indexOf('keymanweb-input') >= 0) {
        // Always copy text back to underlying field on blur
        if(e.base instanceof e.base.ownerDocument.defaultView.HTMLTextAreaElement
            ||e.base instanceof e.base.ownerDocument.defaultView.HTMLInputElement) {
          e.base.value = this.getText(e);
        }
        
        // And set the scroller caret to the end of the element content
        this.setText(e, null, 100000);
        
        // Set the element scroll to zero (or max for RTL INPUT)
        var ss=(e.firstChild as HTMLElement).style;
        if(e.base.nodeName == 'TEXTAREA') {
          ss.top='0'; 
        } else {
          if(e.base.dir == 'rtl') {
            ss.left=(e.offsetWidth-(e.firstChild as HTMLElement).offsetWidth-8)+'px';
          } else {
            ss.left='0';
          }
        }
        
        
        // And hide the caret and scrollbar       
        if(this.caret.parentNode) {
          this.caret.parentNode.removeChild(this.caret);
        }

        this.caret.style.visibility='hidden';
        if(e.childNodes.length > 1 ) {
          (e.childNodes[1] as HTMLElement).style.visibility='hidden';
        }
      }    
    }

    flashCaret: () => void = function(this: DOMTouchHandlers): void {
      if(this.keyman.util.device.touchable && DOMEventHandlers.states.activeElement != null) {
        var cs=this.caret.style;
        cs.visibility = cs.visibility != 'visible' ? 'visible' : 'hidden';
      }
    }.bind(this);

    /**
     * Position the caret at the start of the second span within the scroller
     *      
     * @param   {Object}  e   input DIV element (copy of INPUT or TEXTAREA)
     */
    showCaret(e: HTMLElement) {                          
      if(!e || !e.firstChild || (e.firstChild.childNodes.length<3)) {
        return;
      }

      var scroller=e.firstChild, cs=this.caret.style, sp2=<HTMLElement>scroller.childNodes[1];
      
      // Attach the caret to this scroller and position it over the caret span
      if(this.caret.parentNode != <Node>scroller) {
        scroller.appendChild(this.caret);
      }

      cs.left=sp2.offsetLeft+'px'; 
      cs.top=sp2.offsetTop+'px';
      cs.height=(sp2.offsetHeight-1)+'px';
      cs.visibility='hidden';   // best to wait for timer to display caret
      
      // Scroll into view if required
      this.scrollBody(e);
    
      // Display and position the scrollbar if necessary
      this.setScrollBar(e);
    }
          
    updateInput(x: HTMLDivElement) {
      var util = this.keyman.util;

      var xs=x.style,b=x.base,
          s=window.getComputedStyle(b,null),
          mLeft=parseInt(s.marginLeft,10),
          mTop=parseInt(s.marginTop,10),
          x1=util._GetAbsoluteX(b), y1=util._GetAbsoluteY(b);

      var p=x.offsetParent as HTMLElement;
      if(p) {
        x1=x1-util._GetAbsoluteX(p);
        y1=y1-util._GetAbsoluteY(p);
      }
      
      if(isNaN(mLeft)) {
        mLeft=0;
      }
      if(isNaN(mTop)) {
        mTop=0;
      }
      
      xs.left=(x1-mLeft)+'px';
      xs.top=(y1-mTop)+'px';

      // FireFox does not want the offset!
      if(typeof(s.MozBoxSizing) != 'undefined') {
        xs.left=x1+'px';
        xs.top=y1+'px';
      }     

      var w=b.offsetWidth, h=b.offsetHeight,
          pLeft=parseInt(s.paddingLeft,10), pRight=parseInt(s.paddingRight,10),      
          pTop=parseInt(s.paddingTop,10), pBottom=parseInt(s.paddingBottom,10),
          bLeft=parseInt(s.borderLeft,10), bRight=parseInt(s.borderRight,10),    
          bTop=parseInt(s.borderTop,10), bBottom=parseInt(s.borderBottom,10);
    
      // If using content-box model, must subtract the padding and border, 
      // but *not* for border-box (as for WordPress PlugIn)
      var boxSizing='undefined';
      if(typeof(s.boxSizing) != 'undefined') {
        boxSizing=s.boxSizing;
      } else if(typeof(s.MozBoxSizing) != 'undefined') {
        boxSizing=s.MozBoxSizing;
      }

      if(boxSizing == 'content-box') {
        if(!isNaN(pLeft)) w -= pLeft;
        if(!isNaN(pRight)) w -= pRight;
        if(!isNaN(bLeft)) w -= bLeft;
        if(!isNaN(bRight)) w -= bRight;
        
        if(!isNaN(pTop)) h -= pTop;
        if(!isNaN(pBottom)) h -= pBottom;
        if(!isNaN(bTop)) h -= bTop;
        if(!isNaN(bBottom)) h -= bBottom;
      }
    
      if(util.device.OS == 'Android') {
        // FireFox - adjust padding to match input and text area defaults 
        if(typeof(s.MozBoxSizing) != 'undefined') {
          xs.paddingTop=(pTop+1)+'px';
          xs.paddingLeft=pLeft+'px';
          
          if(x.base.nodeName == 'TEXTAREA') {
            xs.marginTop='1px';
          } else {
            xs.marginLeft='1px';
          }

          w--;
          h--;
        } else { // Chrome, Opera, native browser (?)
          w++;
          h++;
        }
      }

      xs.width=w+'px';
      xs.height=h+'px';   
    }

    /**
     * Set content, visibility, background and borders of input and base elements (KMW-3,KMW-29) 
     *
     * @param       {Object}        e     input element 
     * @param       {number}        n     length of text in field
     */                      
    updateBaseElement(e: HTMLElement, n: number) {
      var Ldv = e.base.ownerDocument.defaultView;
      if(e.base instanceof Ldv.HTMLInputElement ||e.base instanceof Ldv.HTMLTextAreaElement) {
        e.base.value = this.getText(e); //KMW-29
      } else {
        e.base.textContent = this.getText(e);
      }

      e.style.backgroundColor=(n==0?'transparent':window.getComputedStyle(e.base,null).backgroundColor);
      if(this.keyman.util.device.OS == 'iOS') {
        e.base.style.visibility=(n==0?'visible':'hidden');
      }
    }

    /**
     * Close OSK and remove simulated caret on losing focus
     */          
    cancelInput(): void { 
      DOMEventHandlers.states.activeElement=null; 
      this.hideCaret(); 
      this.keyman.osk.hideNow();
    };

    /**
     * Handle losing focus from simulated input field 
     */
    setBlur: (e: FocusEvent) => void = function(this: DOMTouchHandlers, e: FocusEvent) {
      // This works OK for iOS, but may need something else for other platforms

      this.keyman.interface.resetContext();

      if(('relatedTarget' in e) && e.relatedTarget) {
        var elem: HTMLElement = e.relatedTarget as HTMLElement;
        this.doChangeEvent(elem);
        if(elem.nodeName != 'DIV' || elem.className.indexOf('keymanweb-input') == -1) {
          this.cancelInput(); 
          return;
        }
      }

      //Hide the OSK
      if(!DOMEventHandlers.states.focusing) {
        this.cancelInput();
      }
    }.bind(this);

    /**
     * Display and position a scrollbar in the input field if needed
     * 
     * @param   {Object}  e   input DIV element (copy of INPUT or TEXTAREA)
     */
    setScrollBar(e: HTMLElement) {
      // Display the scrollbar if necessary.  Added TEXTAREA condition to correct rotation issue KMW-5.  Fixed for 310 beta.
      var scroller=<HTMLElement>e.childNodes[0], sbs=(<HTMLElement>e.childNodes[1]).style;
      if((scroller.offsetWidth > e.offsetWidth || scroller.offsetLeft < 0) && (e.base.nodeName != 'TEXTAREA')) {
        sbs.height='4px';
        sbs.width=100*(e.offsetWidth/scroller.offsetWidth)+'%';
        sbs.left=100*(-scroller.offsetLeft/scroller.offsetWidth)+'%';
        sbs.top='0';
        sbs.visibility='visible';  
      } else if(scroller.offsetHeight > e.offsetHeight || scroller.offsetTop < 0) {
        sbs.width='4px';
        sbs.height=100*(e.offsetHeight/scroller.offsetHeight)+'%';
        sbs.top=100*(-scroller.offsetTop/scroller.offsetHeight)+'%';
        sbs.left='0';    
        sbs.visibility='visible';        
      } else {
        sbs.visibility='hidden';
      }
    }                    

    /**
     * Handle the touch move event for an input element
     */         
    dragInput: (e: TouchEvent|MouseEvent) => void = function(this: DOMTouchHandlers, e: TouchEvent|MouseEvent) {
      // Prevent dragging window 
      e.preventDefault();
      e.stopPropagation();      

      // Identify the target from the touch list or the event argument (IE 10 only)
      var target: HTMLElement;
      
      if(Util.instanceof(e, "TouchEvent")) {
        target = (e as TouchEvent).targetTouches[0].target as HTMLElement;
      } else {
        target = e.target as HTMLElement;
      }
      if(target == null) {
        return;
      }
      
      // Identify the input element from the touch event target (touched element may be contained by input)
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) target=<HTMLElement> target.parentNode;
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) target=<HTMLElement> target.parentNode;
      if(target.className == null || target.className.indexOf('keymanweb-input') < 0) return;
      
      var x, y;

      if(Util.instanceof(e, "TouchEvent")) {
        x = (e as TouchEvent).touches[0].screenX;
        y = (e as TouchEvent).touches[0].screenY;
      } else {
        x = (e as MouseEvent).screenX;
        y = (e as MouseEvent).screenY;
      }
                
      // Allow content of input elements to be dragged horizontally or vertically
      if(typeof this.firstTouch == 'undefined' || this.firstTouch == null) {
        this.firstTouch={x:x,y:y};
      } else {
        var x0=this.firstTouch.x,y0=this.firstTouch.y,
          scroller=target.firstChild as HTMLElement,dx,dy,x1;
        
        if(target.base.nodeName == 'TEXTAREA') {
          var yOffset=parseInt(scroller.style.top,10);
          if(isNaN(yOffset)) yOffset=0;
          dy=y0-y;
          if(dy < -4 || dy > 4) {
            scroller.style.top=(yOffset<dy?yOffset-dy:0)+'px';
            this.firstTouch.y=y;  
          } 
        } else {
          var xOffset=parseInt(scroller.style.left,10);
          if(isNaN(xOffset)) xOffset=0;
          dx=x0-x;
          if(dx < -4 || dx > 4)
          {
            // Limit dragging beyond the defined text (to avoid dragging the text completely out of view)
            var xMin=0,xMax=this.keyman.util._GetAbsoluteX(target)+target.offsetWidth-scroller.offsetWidth-32;
            if(target.base.dir == 'rtl')xMin=16; else xMax=xMax-24;            
            x1=xOffset-dx;
            if(x1 > xMin) x1=xMin;
            if(x1 < xMax) x1=xMax;
            scroller.style.left=x1+'px';
            this.firstTouch.x=x;       
          }    
        }
      }
      this.setScrollBar(target);
    }.bind(this);

    /**
     * Scroll the input field horizontally (INPUT base element) or 
     * vertically (TEXTAREA base element) to bring the caret into view
     * as text is entered or deleted form an element     
     *      
     * @param       {Object}      e        simulated input field object with focus
     */         
    scrollInput(e: HTMLElement) {
      if(!e || !e.firstChild || e.className == null || e.className.indexOf('keymanweb-input') < 0 ) {
        return;
      }

      var scroller=e.firstChild as HTMLElement;
      if(scroller.childNodes.length < 3) {
        return;
      }

      var util = this.keyman.util;

      // Get the actual absolute position of the caret and the element 
      var s2=scroller.childNodes[1] as HTMLElement,
        cx=util._GetAbsoluteX(s2),cy=util._GetAbsoluteY(s2),
        ex=util._GetAbsoluteX(e),ey=util._GetAbsoluteY(e),
        x=parseInt(scroller.style.left,10),
        y=parseInt(scroller.style.top,10),
        dx=0,dy=0; 
      
      // Scroller offsets must default to zero
      if(isNaN(x)) x=0; if(isNaN(y)) y=0;

      // Scroll input field vertically if necessary
      if(e.base instanceof e.base.ownerDocument.defaultView.HTMLTextAreaElement) { 
        var rowHeight=Math.round(e.offsetHeight/e.base.rows);
        if(cy < ey) dy=cy-ey;
        if(cy > ey+e.offsetHeight-rowHeight) dy=cy-ey-e.offsetHeight+rowHeight;   
        if(dy != 0)scroller.style.top=(y<dy?y-dy:0)+'px';
      } else { // or scroll horizontally if needed
        if(cx < ex+8) dx=cx-ex-12;
        if(cx > ex+e.offsetWidth-12) dx=cx-ex-e.offsetWidth+12;   
        if(dx != 0)scroller.style.left=(x<dx?x-dx:0)+'px';
      }    

      // Display the caret (and scroll into view if necessary)
      this.showCaret(e);
    }

    /**
     * Scroll the document body vertically to bring the active input into view
     * 
     * @param       {Object}      e        simulated input field object being focussed
     */         
    scrollBody(e: HTMLElement): void {
      var osk = this.keyman.osk;
      var util = this.keyman.util;

      if(!e || e.className == null || e.className.indexOf('keymanweb-input') < 0 || !osk.ready) {
        return;
      }

      // Get the absolute position of the caret
      var s2=<HTMLElement>e.firstChild.childNodes[1], y=util._GetAbsoluteY(s2), t=window.pageYOffset,dy=0;
      if(y < t) {
        dy=y-t;
      } else {
        dy=y-t-(window.innerHeight-osk._Box.offsetHeight-s2.offsetHeight-2);
        if(dy < 0) dy=0;
      }    
      // Hide OSK, then scroll, then re-anchor OSK with absolute position (on end of scroll event)
      if(dy != 0) {
        window.scrollTo(0,dy+window.pageYOffset);
      }
    }
  }
}