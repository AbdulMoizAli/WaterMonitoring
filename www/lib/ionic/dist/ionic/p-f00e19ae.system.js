var __awaiter=this&&this.__awaiter||function(e,t,n,r){function i(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function u(e){try{s(r["throw"](e))}catch(e){o(e)}}function s(e){e.done?n(e.value):i(e.value).then(a,u)}s((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(e){return function(t){return s([e,t])}}function s(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;i=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){n.label=a[1];break}if(a[0]===6&&n.label<o[1]){n.label=o[1];o=a;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(a);break}if(o[2])n.ops.pop();n.trys.pop();continue}a=t.call(e,n)}catch(e){a=[6,e];i=0}finally{r=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,o;r<i;r++){if(o||!(r in t)){if(!o)o=Array.prototype.slice.call(t,0,r);o[r]=t[r]}}return e.concat(o||Array.prototype.slice.call(t))};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-e2d705bc.system.js","./p-8b8d1fdb.system.js","./p-25608353.system.js"],(function(e){"use strict";var t,n,r,i,o,a,u,s;return{setters:[function(e){t=e.b;n=e.c},function(e){r=e.OVERLAY_BACK_BUTTON_PRIORITY},function(e){i=e.c;o=e.f;a=e.a;u=e.b;s=e.g}],execute:function(){var c=this;var l=0;var f=e("h",new WeakMap);var d=function(e){return{create:function(t){return g(e,t)},dismiss:function(t,n,r){return q(document,t,n,e,r)},getTop:function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,j(document,e)]}))}))}}};var v=e("a",d("ion-alert"));var p=e("b",d("ion-action-sheet"));var h=e("l",d("ion-loading"));var m=e("m",d("ion-modal"));var y=e("p",d("ion-picker"));var b=e("c",d("ion-popover"));var w=e("t",d("ion-toast"));var _=e("e",(function(e){if(typeof document!=="undefined"){D(document)}var t=l++;e.overlayIndex=t;if(!e.hasAttribute("id")){e.id="ion-overlay-".concat(t)}}));var g=function(e,t){if(typeof window!=="undefined"&&typeof window.customElements!=="undefined"){return window.customElements.whenDefined(e).then((function(){var n=document.createElement(e);n.classList.add("overlay-hidden");Object.assign(n,Object.assign(Object.assign({},t),{hasController:true}));B(document).appendChild(n);return new Promise((function(e){return i(n,e)}))}))}return Promise.resolve()};var A='[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .ion-focusable:not([tabindex^="-"])';var x="input:not([type=hidden]), textarea, button, select";var k=e("j",(function(e,t){var n=e.querySelector(A);var r=n&&n.shadowRoot;if(r){n=r.querySelector(x)||n}if(n){o(n)}else{t.focus()}}));var S=function(e){return e.classList.contains("overlay-hidden")};var E=function(e,t){var n=Array.from(e.querySelectorAll(A));var r=n.length>0?n[n.length-1]:null;var i=r&&r.shadowRoot;if(i){r=i.querySelector(x)||r}if(r){r.focus()}else{t.focus()}};var P=function(e,t){var n=j(t,"ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover");var r=e.target;if(!n||!r){return}if(n.classList.contains("ion-disable-focus-trap")){return}var i=function(){if(n===r){n.lastFocus=undefined}else{var e=s(n);if(!e.contains(r)){return}var i=e.querySelector(".ion-overlay-wrapper");if(!i){return}if(i.contains(r)){n.lastFocus=r}else{var o=n.lastFocus;k(i,n);if(o===t.activeElement){E(i,n)}n.lastFocus=t.activeElement}}};var o=function(){if(n.contains(r)){n.lastFocus=r}else{var e=n.lastFocus;k(n,n);if(e===t.activeElement){E(n,n)}n.lastFocus=t.activeElement}};if(n.shadowRoot){o()}else{i()}};var D=function(e){if(l===0){l=1;e.addEventListener("focus",(function(t){P(t,e)}),true);e.addEventListener("ionBackButton",(function(t){var n=j(e);if(n&&n.backdropDismiss){t.detail.register(r,(function(){return n.dismiss(undefined,z)}))}}));e.addEventListener("keyup",(function(t){if(t.key==="Escape"){var n=j(e);if(n&&n.backdropDismiss){n.dismiss(undefined,z)}}}))}};var q=function(e,t,n,r,i){var o=j(e,r,i);if(!o){return Promise.reject("overlay does not exist")}return o.dismiss(t,n)};var L=function(e,t){if(t===undefined){t="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"}return Array.from(e.querySelectorAll(t)).filter((function(e){return e.overlayIndex>0}))};var j=e("k",(function(e,t,n){var r=L(e,t).filter((function(e){return!S(e)}));return n===undefined?r[r.length-1]:r.find((function(e){return e.id===n}))}));var O=function(e){if(e===void 0){e=false}var t=B(document);var n=t.querySelector("ion-router-outlet, ion-nav, #ion-view-container-root");if(!n){return}if(e){n.setAttribute("aria-hidden","true")}else{n.removeAttribute("aria-hidden")}};var F=e("d",(function(e,r,i,o,a){return __awaiter(c,void 0,void 0,(function(){var u,s,c,l,f;return __generator(this,(function(d){switch(d.label){case 0:if(e.presented){return[2]}O(true);e.presented=true;e.willPresent.emit();(u=e.willPresentShorthand)===null||u===void 0?void 0:u.emit();c=t(e);l=e.enterAnimation?e.enterAnimation:n.get(r,c==="ios"?i:o);return[4,C(e,l,e.el,a)];case 1:f=d.sent();if(f){e.didPresent.emit();(s=e.didPresentShorthand)===null||s===void 0?void 0:s.emit()}if(e.el.tagName!=="ION-TOAST"){R(e.el)}if(e.keyboardClose){e.el.focus()}return[2]}}))}))}));var R=function(e){return __awaiter(c,void 0,void 0,(function(){var t,n;return __generator(this,(function(r){switch(r.label){case 0:t=document.activeElement;if(!t){return[2]}n=t&&t.shadowRoot;if(n){t=n.querySelector(x)||t}return[4,e.onDidDismiss()];case 1:r.sent();t.focus();return[2]}}))}))};var T=e("f",(function(e,r,i,o,a,u,s){return __awaiter(c,void 0,void 0,(function(){var c,l,d,v,p;return __generator(this,(function(h){switch(h.label){case 0:if(!e.presented){return[2,false]}O(false);e.presented=false;h.label=1;case 1:h.trys.push([1,4,,5]);e.el.style.setProperty("pointer-events","none");e.willDismiss.emit({data:r,role:i});(c=e.willDismissShorthand)===null||c===void 0?void 0:c.emit({data:r,role:i});d=t(e);v=e.leaveAnimation?e.leaveAnimation:n.get(o,d==="ios"?a:u);if(!(i!=="gesture"))return[3,3];return[4,C(e,v,e.el,s)];case 2:h.sent();h.label=3;case 3:e.didDismiss.emit({data:r,role:i});(l=e.didDismissShorthand)===null||l===void 0?void 0:l.emit({data:r,role:i});f.delete(e);e.el.classList.add("overlay-hidden");e.el.style.removeProperty("pointer-events");return[3,5];case 4:p=h.sent();console.error(p);return[3,5];case 5:e.el.remove();return[2,true]}}))}))}));var B=function(e){return e.querySelector("ion-app")||e.body};var C=function(e,t,r,i){return __awaiter(c,void 0,void 0,(function(){var o,a,u;return __generator(this,(function(s){switch(s.label){case 0:r.classList.remove("overlay-hidden");o=e.el;a=t(o,i);if(!e.animated||!n.getBoolean("animated",true)){a.duration(0)}if(e.keyboardClose){a.beforeAddWrite((function(){var e=r.ownerDocument.activeElement;if(e&&e.matches("input,ion-input, ion-textarea")){e.blur()}}))}u=f.get(e)||[];f.set(e,__spreadArray(__spreadArray([],u,true),[a],false));return[4,a.play()];case 1:s.sent();return[2,true]}}))}))};var I=e("g",(function(e,t){var n;var r=new Promise((function(e){return n=e}));N(e,t,(function(e){n(e.detail)}));return r}));var N=function(e,t,n){var r=function(i){u(e,t,r);n(i)};a(e,t,r)};var G=e("i",(function(e){return e==="cancel"||e===z}));var W=function(e){return e()};var Y=e("s",(function(e,t){if(typeof e==="function"){var r=n.get("_zoneGate",W);return r((function(){try{return e(t)}catch(e){throw e}}))}return undefined}));var z=e("B","backdrop")}}}));