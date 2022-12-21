var __awaiter=this&&this.__awaiter||function(t,e,n,r){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r["throw"](t))}catch(t){o(t)}}function c(t){t.done?n(t.value):i(t.value).then(a,s)}c((r=r.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(t){return function(e){return c([t,e])}}function c(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;i=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){n.label=a[1];break}if(a[0]===6&&n.label<o[1]){n.label=o[1];o=a;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(a);break}if(o[2])n.ops.pop();n.trys.pop();continue}a=e.call(t,n)}catch(t){a=[6,t];i=0}finally{r=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var r=0,i=e.length,o;r<i;r++){if(o||!(r in e)){if(!o)o=Array.prototype.slice.call(e,0,r);o[r]=e[r]}}return t.concat(o||Array.prototype.slice.call(e))};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-1d420562.system.js","./p-a7fe7099.system.js","./p-e2d705bc.system.js","./p-25608353.system.js"],(function(t){"use strict";var e,n,r,i,o,a,s,c,d,u,l,h,f;return{setters:[function(t){e=t.r;n=t.h;r=t.H;i=t.i;o=t.e},function(t){a=t.i},function(t){s=t.c;c=t.b},function(t){d=t.r;u=t.t;l=t.a;h=t.b;f=t.g}],execute:function(){var p=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}";var g=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}";var m=t("ion_accordion",function(){function t(t){var n=this;e(this,t);this.updateListener=function(){return n.updateState(false)};this.state=1;this.isNext=false;this.isPrevious=false;this.value="ion-accordion-".concat(v++);this.disabled=false;this.readonly=false;this.toggleIcon=a;this.toggleIconSlot="end";this.setItemDefaults=function(){var t=n.getSlottedHeaderIonItem();if(!t){return}t.button=true;t.detail=false;if(t.lines===undefined){t.lines="full"}};this.getSlottedHeaderIonItem=function(){var t=n.headerEl;if(!t){return}var e=t.querySelector("slot");if(!e){return}var r=e.assignedElements&&e.assignedElements().find((function(t){return t.tagName==="ION-ITEM"}));return r};this.setAria=function(t){if(t===void 0){t=false}var e=n.getSlottedHeaderIonItem();if(!e){return}var r=f(e);var i=r.querySelector("button");if(!i){return}i.setAttribute("aria-expanded","".concat(t))};this.slotToggleIcon=function(){var t=n.getSlottedHeaderIonItem();if(!t){return}var e=n,r=e.toggleIconSlot,i=e.toggleIcon;var o=t.querySelector(".ion-accordion-toggle-icon");if(o){return}var a=document.createElement("ion-icon");a.slot=r;a.lazy=false;a.classList.add("ion-accordion-toggle-icon");a.icon=i;a.setAttribute("aria-hidden","true");t.appendChild(a)};this.expandAccordion=function(t){if(t===void 0){t=false}if(t){n.state=4;return}if(n.state===4){return}var e=n,r=e.contentEl,i=e.contentElWrapper;if(r===undefined||i===undefined){return}if(n.currentRaf!==undefined){cancelAnimationFrame(n.currentRaf)}if(n.shouldAnimate()){d((function(){n.state=8;n.currentRaf=d((function(){return __awaiter(n,void 0,void 0,(function(){var t,e;return __generator(this,(function(n){switch(n.label){case 0:t=i.offsetHeight;e=u(r,2e3);r.style.setProperty("max-height","".concat(t,"px"));return[4,e];case 1:n.sent();this.state=4;r.style.removeProperty("max-height");return[2]}}))}))}))}))}else{n.state=4}};this.collapseAccordion=function(t){if(t===void 0){t=false}if(t){n.state=1;return}if(n.state===1){return}var e=n.contentEl;if(e===undefined){return}if(n.currentRaf!==undefined){cancelAnimationFrame(n.currentRaf)}if(n.shouldAnimate()){n.currentRaf=d((function(){return __awaiter(n,void 0,void 0,(function(){var t;var n=this;return __generator(this,(function(r){t=e.offsetHeight;e.style.setProperty("max-height","".concat(t,"px"));d((function(){return __awaiter(n,void 0,void 0,(function(){var t;return __generator(this,(function(n){switch(n.label){case 0:t=u(e,2e3);this.state=2;return[4,t];case 1:n.sent();this.state=1;e.style.removeProperty("max-height");return[2]}}))}))}));return[2]}))}))}))}else{n.state=1}};this.shouldAnimate=function(){if(typeof window==="undefined"){return false}var t=matchMedia("(prefers-reduced-motion: reduce)").matches;if(t){return false}var e=s.get("animated",true);if(!e){return false}if(n.accordionGroupEl&&!n.accordionGroupEl.animated){return false}return true};this.updateState=function(t){if(t===void 0){t=false}return __awaiter(n,void 0,void 0,(function(){var e,n,r,i,o,a,s,c;return __generator(this,(function(d){e=this.accordionGroupEl;n=this.value;if(!e){return[2]}r=e.value;i=Array.isArray(r)?r.includes(n):r===n;if(i){this.expandAccordion(t);this.isNext=this.isPrevious=false}else{this.collapseAccordion(t);o=this.getNextSibling();a=o&&o.value;if(a!==undefined){this.isPrevious=Array.isArray(r)?r.includes(a):r===a}s=this.getPreviousSibling();c=s&&s.value;if(c!==undefined){this.isNext=Array.isArray(r)?r.includes(c):r===c}}return[2]}))}))};this.getNextSibling=function(){if(!n.el){return}var t=n.el.nextElementSibling;if((t===null||t===void 0?void 0:t.tagName)!=="ION-ACCORDION"){return}return t};this.getPreviousSibling=function(){if(!n.el){return}var t=n.el.previousElementSibling;if((t===null||t===void 0?void 0:t.tagName)!=="ION-ACCORDION"){return}return t}}t.prototype.connectedCallback=function(){var t=this.accordionGroupEl=this.el&&this.el.closest("ion-accordion-group");if(t){this.updateState(true);l(t,"ionChange",this.updateListener)}};t.prototype.disconnectedCallback=function(){var t=this.accordionGroupEl;if(t){h(t,"ionChange",this.updateListener)}};t.prototype.componentDidLoad=function(){var t=this;this.setItemDefaults();this.slotToggleIcon();d((function(){var e=t.state===4||t.state===8;t.setAria(e)}))};t.prototype.toggleExpanded=function(){var t=this,e=t.accordionGroupEl,n=t.value,r=t.state;if(e){var i=r===1||r===2;e.requestAccordionToggle(n,i)}};t.prototype.render=function(){var t;var e=this;var i=this,o=i.disabled,a=i.readonly;var d=c(this);var u=this.state===4||this.state===8;var l=u?"header expanded":"header";var h=u?"content expanded":"content";this.setAria(u);return n(r,{class:(t={},t[d]=true,t["accordion-expanding"]=this.state===8,t["accordion-expanded"]=this.state===4,t["accordion-collapsing"]=this.state===2,t["accordion-collapsed"]=this.state===1,t["accordion-next"]=this.isNext,t["accordion-previous"]=this.isPrevious,t["accordion-disabled"]=o,t["accordion-readonly"]=a,t["accordion-animated"]=s.getBoolean("animated",true),t)},n("div",{onClick:function(){return e.toggleExpanded()},id:"header",part:l,"aria-controls":"content",ref:function(t){return e.headerEl=t}},n("slot",{name:"header"})),n("div",{id:"content",part:h,role:"region","aria-labelledby":"header",ref:function(t){return e.contentEl=t}},n("div",{id:"content-wrapper",ref:function(t){return e.contentElWrapper=t}},n("slot",{name:"content"}))))};Object.defineProperty(t,"delegatesFocus",{get:function(){return true},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});return t}());var v=0;m.style={ios:p,md:g};var x=":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){border-bottom:none}";var b=":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion){-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;border-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion):first-of-type{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";var y=t("ion_accordion_group",function(){function t(t){e(this,t);this.ionChange=o(this,"ionChange",7);this.animated=true;this.disabled=false;this.readonly=false;this.expand="compact"}t.prototype.valueChanged=function(){var t=this,e=t.value,n=t.multiple;if(!n&&Array.isArray(e)){this.value=e[0]}else{this.ionChange.emit({value:this.value})}};t.prototype.disabledChanged=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,n,r,i;return __generator(this,(function(o){switch(o.label){case 0:t=this.disabled;return[4,this.getAccordions()];case 1:e=o.sent();for(n=0,r=e;n<r.length;n++){i=r[n];i.disabled=t}return[2]}}))}))};t.prototype.readonlyChanged=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,n,r,i;return __generator(this,(function(o){switch(o.label){case 0:t=this.readonly;return[4,this.getAccordions()];case 1:e=o.sent();for(n=0,r=e;n<r.length;n++){i=r[n];i.readonly=t}return[2]}}))}))};t.prototype.onKeydown=function(t){return __awaiter(this,void 0,void 0,(function(){var e,n,r,i,o,a;return __generator(this,(function(s){switch(s.label){case 0:e=document.activeElement;if(!e){return[2]}n=e.tagName==="ION-ACCORDION"?e:e.closest("ion-accordion");if(!n){return[2]}r=n.closest("ion-accordion-group");if(r!==this.el){return[2]}return[4,this.getAccordions()];case 1:i=s.sent();o=i.findIndex((function(t){return t===n}));if(o===-1){return[2]}if(t.key==="ArrowDown"){a=this.findNextAccordion(i,o)}else if(t.key==="ArrowUp"){a=this.findPreviousAccordion(i,o)}else if(t.key==="Home"){a=i[0]}else if(t.key==="End"){a=i[i.length-1]}if(a!==undefined&&a!==e){a.focus()}return[2]}}))}))};t.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.disabled){this.disabledChanged()}if(this.readonly){this.readonlyChanged()}return[2]}))}))};t.prototype.requestAccordionToggle=function(t,e){return __awaiter(this,void 0,void 0,(function(){var n,r,i,o,a,s,c,d,s,c;return __generator(this,(function(u){n=this,r=n.multiple,i=n.value,o=n.readonly,a=n.disabled;if(o||a){return[2]}if(e){if(r){s=i||[];c=Array.isArray(s)?s:[s];d=c.find((function(e){return e===t}));if(d===undefined&&t!==undefined){this.value=__spreadArray(__spreadArray([],c,true),[t],false)}}else{this.value=t}}else{if(r){s=i||[];c=Array.isArray(s)?s:[s];this.value=c.filter((function(e){return e!==t}))}else{this.value=undefined}}return[2]}))}))};t.prototype.findNextAccordion=function(t,e){var n=t[e+1];if(n===undefined){return t[0]}return n};t.prototype.findPreviousAccordion=function(t,e){var n=t[e-1];if(n===undefined){return t[t.length-1]}return n};t.prototype.getAccordions=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,Array.from(this.el.querySelectorAll(":scope > ion-accordion"))]}))}))};t.prototype.render=function(){var t;var e=this,i=e.disabled,o=e.readonly,a=e.expand;var s=c(this);return n(r,{class:(t={},t[s]=true,t["accordion-group-disabled"]=i,t["accordion-group-readonly"]=o,t["accordion-group-expand-".concat(a)]=true,t),role:"presentation"},n("slot",null))};Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{value:["valueChanged"],disabled:["disabledChanged"],readonly:["readonlyChanged"]}},enumerable:false,configurable:true});return t}());y.style={ios:x,md:b}}}}));