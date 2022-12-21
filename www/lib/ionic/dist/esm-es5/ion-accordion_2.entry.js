import{__awaiter,__generator,__spreadArray}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{r as registerInstance,h,H as Host,i as getElement,e as createEvent}from"./index-b3eecb14.js";import{i as chevronDown}from"./index-e3f61316.js";import{c as config,b as getIonMode}from"./ionic-global-0ebe321c.js";import{r as raf,t as transitionEndAsync,a as addEventListener,b as removeEventListener,g as getElementRoot}from"./helpers-6e1e5b65.js";var accordionIosCss=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}";var accordionMdCss=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}";var Accordion=function(){function e(e){var t=this;registerInstance(this,e);this.updateListener=function(){return t.updateState(false)};this.state=1;this.isNext=false;this.isPrevious=false;this.value="ion-accordion-".concat(accordionIds++);this.disabled=false;this.readonly=false;this.toggleIcon=chevronDown;this.toggleIconSlot="end";this.setItemDefaults=function(){var e=t.getSlottedHeaderIonItem();if(!e){return}e.button=true;e.detail=false;if(e.lines===undefined){e.lines="full"}};this.getSlottedHeaderIonItem=function(){var e=t.headerEl;if(!e){return}var n=e.querySelector("slot");if(!n){return}var o=n.assignedElements&&n.assignedElements().find((function(e){return e.tagName==="ION-ITEM"}));return o};this.setAria=function(e){if(e===void 0){e=false}var n=t.getSlottedHeaderIonItem();if(!n){return}var o=getElementRoot(n);var r=o.querySelector("button");if(!r){return}r.setAttribute("aria-expanded","".concat(e))};this.slotToggleIcon=function(){var e=t.getSlottedHeaderIonItem();if(!e){return}var n=t,o=n.toggleIconSlot,r=n.toggleIcon;var i=e.querySelector(".ion-accordion-toggle-icon");if(i){return}var a=document.createElement("ion-icon");a.slot=o;a.lazy=false;a.classList.add("ion-accordion-toggle-icon");a.icon=r;a.setAttribute("aria-hidden","true");e.appendChild(a)};this.expandAccordion=function(e){if(e===void 0){e=false}if(e){t.state=4;return}if(t.state===4){return}var n=t,o=n.contentEl,r=n.contentElWrapper;if(o===undefined||r===undefined){return}if(t.currentRaf!==undefined){cancelAnimationFrame(t.currentRaf)}if(t.shouldAnimate()){raf((function(){t.state=8;t.currentRaf=raf((function(){return __awaiter(t,void 0,void 0,(function(){var e,t;return __generator(this,(function(n){switch(n.label){case 0:e=r.offsetHeight;t=transitionEndAsync(o,2e3);o.style.setProperty("max-height","".concat(e,"px"));return[4,t];case 1:n.sent();this.state=4;o.style.removeProperty("max-height");return[2]}}))}))}))}))}else{t.state=4}};this.collapseAccordion=function(e){if(e===void 0){e=false}if(e){t.state=1;return}if(t.state===1){return}var n=t.contentEl;if(n===undefined){return}if(t.currentRaf!==undefined){cancelAnimationFrame(t.currentRaf)}if(t.shouldAnimate()){t.currentRaf=raf((function(){return __awaiter(t,void 0,void 0,(function(){var e;var t=this;return __generator(this,(function(o){e=n.offsetHeight;n.style.setProperty("max-height","".concat(e,"px"));raf((function(){return __awaiter(t,void 0,void 0,(function(){var e;return __generator(this,(function(t){switch(t.label){case 0:e=transitionEndAsync(n,2e3);this.state=2;return[4,e];case 1:t.sent();this.state=1;n.style.removeProperty("max-height");return[2]}}))}))}));return[2]}))}))}))}else{t.state=1}};this.shouldAnimate=function(){if(typeof window==="undefined"){return false}var e=matchMedia("(prefers-reduced-motion: reduce)").matches;if(e){return false}var n=config.get("animated",true);if(!n){return false}if(t.accordionGroupEl&&!t.accordionGroupEl.animated){return false}return true};this.updateState=function(e){if(e===void 0){e=false}return __awaiter(t,void 0,void 0,(function(){var t,n,o,r,i,a,s,d;return __generator(this,(function(c){t=this.accordionGroupEl;n=this.value;if(!t){return[2]}o=t.value;r=Array.isArray(o)?o.includes(n):o===n;if(r){this.expandAccordion(e);this.isNext=this.isPrevious=false}else{this.collapseAccordion(e);i=this.getNextSibling();a=i&&i.value;if(a!==undefined){this.isPrevious=Array.isArray(o)?o.includes(a):o===a}s=this.getPreviousSibling();d=s&&s.value;if(d!==undefined){this.isNext=Array.isArray(o)?o.includes(d):o===d}}return[2]}))}))};this.getNextSibling=function(){if(!t.el){return}var e=t.el.nextElementSibling;if((e===null||e===void 0?void 0:e.tagName)!=="ION-ACCORDION"){return}return e};this.getPreviousSibling=function(){if(!t.el){return}var e=t.el.previousElementSibling;if((e===null||e===void 0?void 0:e.tagName)!=="ION-ACCORDION"){return}return e}}e.prototype.connectedCallback=function(){var e=this.accordionGroupEl=this.el&&this.el.closest("ion-accordion-group");if(e){this.updateState(true);addEventListener(e,"ionChange",this.updateListener)}};e.prototype.disconnectedCallback=function(){var e=this.accordionGroupEl;if(e){removeEventListener(e,"ionChange",this.updateListener)}};e.prototype.componentDidLoad=function(){var e=this;this.setItemDefaults();this.slotToggleIcon();raf((function(){var t=e.state===4||e.state===8;e.setAria(t)}))};e.prototype.toggleExpanded=function(){var e=this,t=e.accordionGroupEl,n=e.value,o=e.state;if(t){var r=o===1||o===2;t.requestAccordionToggle(n,r)}};e.prototype.render=function(){var e;var t=this;var n=this,o=n.disabled,r=n.readonly;var i=getIonMode(this);var a=this.state===4||this.state===8;var s=a?"header expanded":"header";var d=a?"content expanded":"content";this.setAria(a);return h(Host,{class:(e={},e[i]=true,e["accordion-expanding"]=this.state===8,e["accordion-expanded"]=this.state===4,e["accordion-collapsing"]=this.state===2,e["accordion-collapsed"]=this.state===1,e["accordion-next"]=this.isNext,e["accordion-previous"]=this.isPrevious,e["accordion-disabled"]=o,e["accordion-readonly"]=r,e["accordion-animated"]=config.getBoolean("animated",true),e)},h("div",{onClick:function(){return t.toggleExpanded()},id:"header",part:s,"aria-controls":"content",ref:function(e){return t.headerEl=e}},h("slot",{name:"header"})),h("div",{id:"content",part:d,role:"region","aria-labelledby":"header",ref:function(e){return t.contentEl=e}},h("div",{id:"content-wrapper",ref:function(e){return t.contentElWrapper=e}},h("slot",{name:"content"}))))};Object.defineProperty(e,"delegatesFocus",{get:function(){return true},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return e}();var accordionIds=0;Accordion.style={ios:accordionIosCss,md:accordionMdCss};var accordionGroupIosCss=":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){border-bottom:none}";var accordionGroupMdCss=":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion){-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;border-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion):first-of-type{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";var AccordionGroup=function(){function e(e){registerInstance(this,e);this.ionChange=createEvent(this,"ionChange",7);this.animated=true;this.disabled=false;this.readonly=false;this.expand="compact"}e.prototype.valueChanged=function(){var e=this,t=e.value,n=e.multiple;if(!n&&Array.isArray(t)){this.value=t[0]}else{this.ionChange.emit({value:this.value})}};e.prototype.disabledChanged=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,n,o,r;return __generator(this,(function(i){switch(i.label){case 0:e=this.disabled;return[4,this.getAccordions()];case 1:t=i.sent();for(n=0,o=t;n<o.length;n++){r=o[n];r.disabled=e}return[2]}}))}))};e.prototype.readonlyChanged=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,n,o,r;return __generator(this,(function(i){switch(i.label){case 0:e=this.readonly;return[4,this.getAccordions()];case 1:t=i.sent();for(n=0,o=t;n<o.length;n++){r=o[n];r.readonly=e}return[2]}}))}))};e.prototype.onKeydown=function(e){return __awaiter(this,void 0,void 0,(function(){var t,n,o,r,i,a;return __generator(this,(function(s){switch(s.label){case 0:t=document.activeElement;if(!t){return[2]}n=t.tagName==="ION-ACCORDION"?t:t.closest("ion-accordion");if(!n){return[2]}o=n.closest("ion-accordion-group");if(o!==this.el){return[2]}return[4,this.getAccordions()];case 1:r=s.sent();i=r.findIndex((function(e){return e===n}));if(i===-1){return[2]}if(e.key==="ArrowDown"){a=this.findNextAccordion(r,i)}else if(e.key==="ArrowUp"){a=this.findPreviousAccordion(r,i)}else if(e.key==="Home"){a=r[0]}else if(e.key==="End"){a=r[r.length-1]}if(a!==undefined&&a!==t){a.focus()}return[2]}}))}))};e.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){if(this.disabled){this.disabledChanged()}if(this.readonly){this.readonlyChanged()}return[2]}))}))};e.prototype.requestAccordionToggle=function(e,t){return __awaiter(this,void 0,void 0,(function(){var n,o,r,i,a,s,d,c,s,d;return __generator(this,(function(u){n=this,o=n.multiple,r=n.value,i=n.readonly,a=n.disabled;if(i||a){return[2]}if(t){if(o){s=r||[];d=Array.isArray(s)?s:[s];c=d.find((function(t){return t===e}));if(c===undefined&&e!==undefined){this.value=__spreadArray(__spreadArray([],d,true),[e],false)}}else{this.value=e}}else{if(o){s=r||[];d=Array.isArray(s)?s:[s];this.value=d.filter((function(t){return t!==e}))}else{this.value=undefined}}return[2]}))}))};e.prototype.findNextAccordion=function(e,t){var n=e[t+1];if(n===undefined){return e[0]}return n};e.prototype.findPreviousAccordion=function(e,t){var n=e[t-1];if(n===undefined){return e[e.length-1]}return n};e.prototype.getAccordions=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){return[2,Array.from(this.el.querySelectorAll(":scope > ion-accordion"))]}))}))};e.prototype.render=function(){var e;var t=this,n=t.disabled,o=t.readonly,r=t.expand;var i=getIonMode(this);return h(Host,{class:(e={},e[i]=true,e["accordion-group-disabled"]=n,e["accordion-group-readonly"]=o,e["accordion-group-expand-".concat(r)]=true,e),role:"presentation"},h("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{value:["valueChanged"],disabled:["disabledChanged"],readonly:["readonlyChanged"]}},enumerable:false,configurable:true});return e}();AccordionGroup.style={ios:accordionGroupIosCss,md:accordionGroupMdCss};export{Accordion as ion_accordion,AccordionGroup as ion_accordion_group};