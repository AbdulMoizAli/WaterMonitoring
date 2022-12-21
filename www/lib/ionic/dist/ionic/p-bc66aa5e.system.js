var __awaiter=this&&this.__awaiter||function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r["throw"](e))}catch(e){a(e)}}function c(e){e.done?n(e.value):o(e.value).then(i,u)}c((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,o,a,i;return i={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function u(e){return function(t){return c([e,t])}}function c(i){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,o&&(a=i[0]&2?o["return"]:i[0]?o["throw"]||((a=o["return"])&&a.call(o),0):o.next)&&!(a=a.call(o,i[1])).done)return a;if(o=0,a)i=[i[0]&2,a.value];switch(i[0]){case 0:case 1:a=i;break;case 4:n.label++;return{value:i[1],done:false};case 5:n.label++;o=i[1];i=[0];continue;case 7:i=n.ops.pop();n.trys.pop();continue;default:if(!(a=n.trys,a=a.length>0&&a[a.length-1])&&(i[0]===6||i[0]===2)){n=0;continue}if(i[0]===3&&(!a||i[1]>a[0]&&i[1]<a[3])){n.label=i[1];break}if(i[0]===6&&n.label<a[1]){n.label=a[1];a=i;break}if(a&&n.label<a[2]){n.label=a[2];n.ops.push(i);break}if(a[2])n.ops.pop();n.trys.pop();continue}i=t.call(e,n)}catch(e){i=[6,e];o=0}finally{r=a=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-25608353.system.js"],(function(e){"use strict";var t,n,r,o,a;return{setters:[function(e){t=e.a;n=e.b;r=e.r;o=e.p;a=e.c}],execute:function(){var i=this;var u=new WeakMap;var c=function(e,t,n,r){if(r===void 0){r=0}if(u.has(e)===n){return}if(n){s(e,t,r)}else{f(e,t)}};var l=function(e){return e===e.getRootNode().activeElement};var s=function(e,t,n){var r=t.parentNode;var o=t.cloneNode(false);o.classList.add("cloned-input");o.tabIndex=-1;r.appendChild(o);u.set(e,o);var a=e.ownerDocument;var i=a.dir==="rtl"?9999:-9999;e.style.pointerEvents="none";t.style.transform="translate3d(".concat(i,"px,").concat(n,"px,0) scale(0)")};var f=function(e,t){var n=u.get(e);if(n){u.delete(e);n.remove()}e.style.pointerEvents="";t.style.transform=""};var v=function(e,r,o){if(!o||!r){return function(){return}}var a=function(t){if(l(r)){c(e,r,t)}};var i=function(){return c(e,r,false)};var u=function(){return a(true)};var s=function(){return a(false)};t(o,"ionScrollStart",u);t(o,"ionScrollEnd",s);r.addEventListener("blur",i);return function(){n(o,"ionScrollStart",u);n(o,"ionScrollEnd",s);r.addEventListener("ionBlur",i)}};var d="input, textarea, [no-blur], [contenteditable]";var h=function(){var e=true;var r=false;var o=document;var a=function(){r=true};var i=function(){e=true};var u=function(t){if(r){r=false;return}var n=o.activeElement;if(!n){return}if(n.matches(d)){return}var a=t.target;if(a===n){return}if(a.matches(d)||a.closest(d)){return}e=false;setTimeout((function(){if(!e){n.blur()}}),50)};t(o,"ionScrollStart",a);o.addEventListener("focusin",i,true);o.addEventListener("touchend",u,false);return function(){n(o,"ionScrollStart",a,true);o.removeEventListener("focusin",i,true);o.removeEventListener("touchend",u,false)}};var m=.3;var p=function(e,t,n){var r=e.closest("ion-item,[ion-item]")||e;return w(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)};var w=function(e,t,n,r){var o=e.top;var a=e.bottom;var i=t.top;var u=Math.min(t.bottom,r-n);var c=i+15;var l=u*.75;var s=l-a;var f=c-o;var v=Math.round(s<0?-s:f>0?-f:0);var d=Math.min(v,o-i);var h=Math.abs(d);var p=h/m;var w=Math.min(400,Math.max(150,p));return{scrollAmount:d,scrollDuration:w,scrollPadding:n,inputSafeY:-(o-c)+4}};var y=function(e,t,n,r,a){var i;var u=function(e){i=o(e)};var c=function(u){if(!i){return}var c=o(u);if(!g(6,i,c)&&!l(t)){u.stopPropagation();b(e,t,n,r,a)}};e.addEventListener("touchstart",u,true);e.addEventListener("touchend",c,true);return function(){e.removeEventListener("touchstart",u,true);e.removeEventListener("touchend",c,true)}};var b=function(e,t,n,o,a){return __awaiter(i,void 0,void 0,(function(){var i,u,l,s,f,v;var d=this;return __generator(this,(function(h){switch(h.label){case 0:if(!n&&!o){return[2]}i=p(e,n||o,a);if(n&&Math.abs(i.scrollAmount)<4){t.focus();return[2]}c(e,t,true,i.inputSafeY);t.focus();r((function(){return e.click()}));if(!(typeof window!=="undefined"))return[3,3];l=function(){return __awaiter(d,void 0,void 0,(function(){return __generator(this,(function(r){switch(r.label){case 0:if(u!==undefined){clearTimeout(u)}window.removeEventListener("ionKeyboardDidShow",s);window.removeEventListener("ionKeyboardDidShow",l);if(!n)return[3,2];return[4,n.scrollByPoint(0,i.scrollAmount,i.scrollDuration)];case 1:r.sent();r.label=2;case 2:c(e,t,false,i.inputSafeY);t.focus();return[2]}}))}))};s=function(){window.removeEventListener("ionKeyboardDidShow",s);window.addEventListener("ionKeyboardDidShow",l)};if(!n)return[3,2];return[4,n.getScrollElement()];case 1:f=h.sent();v=f.scrollHeight-f.clientHeight;if(i.scrollAmount>v-f.scrollTop){if(t.type==="password"){i.scrollAmount+=50;window.addEventListener("ionKeyboardDidShow",s)}else{window.addEventListener("ionKeyboardDidShow",l)}u=setTimeout(l,1e3);return[2]}h.label=2;case 2:l();h.label=3;case 3:return[2]}}))}))};var g=function(e,t,n){if(t&&n){var r=t.x-n.x;var o=t.y-n.y;var a=r*r+o*o;return a>e*e}return false};var E="$ionPaddingTimer";var S=function(e){var t=document;var n=function(t){L(t.target,e)};var r=function(e){L(e.target,0)};t.addEventListener("focusin",n);t.addEventListener("focusout",r);return function(){t.removeEventListener("focusin",n);t.removeEventListener("focusout",r)}};var L=function(e,t){if(e.tagName!=="INPUT"){return}if(e.parentElement&&e.parentElement.tagName==="ION-INPUT"){return}if(e.parentElement&&e.parentElement.parentElement&&e.parentElement.parentElement.tagName==="ION-SEARCHBAR"){return}var n=e.closest("ion-content");if(n===null){return}var r=n[E];if(r){clearTimeout(r)}if(t>0){n.style.setProperty("--keyboard-offset","".concat(t,"px"))}else{n[E]=setTimeout((function(){n.style.setProperty("--keyboard-offset","0px")}),120)}};var _=true;var x=true;var D=e("startInputShims",(function(e){var t=document;var n=e.getNumber("keyboardHeight",290);var r=e.getBoolean("scrollAssist",true);var o=e.getBoolean("hideCaretOnScroll",true);var u=e.getBoolean("inputBlurring",true);var c=e.getBoolean("scrollPadding",true);var l=Array.from(t.querySelectorAll("ion-input, ion-textarea"));var s=new WeakMap;var f=new WeakMap;var d=function(e){return __awaiter(i,void 0,void 0,(function(){var t,i,u,c,l,l;return __generator(this,(function(d){switch(d.label){case 0:return[4,new Promise((function(t){return a(e,t)}))];case 1:d.sent();t=e.shadowRoot||e;i=t.querySelector("input")||t.querySelector("textarea");u=e.closest("ion-content");c=!u?e.closest("ion-footer"):null;if(!i){return[2]}if(!!u&&o&&!s.has(e)){l=v(e,i,u);s.set(e,l)}if((!!u||!!c)&&r&&!f.has(e)){l=y(e,i,u,c,n);f.set(e,l)}return[2]}}))}))};var m=function(e){if(o){var t=s.get(e);if(t){t()}s.delete(e)}if(r){var t=f.get(e);if(t){t()}f.delete(e)}};if(u&&_){h()}if(c&&x){S(n)}for(var p=0,w=l;p<w.length;p++){var b=w[p];d(b)}t.addEventListener("ionInputDidLoad",(function(e){d(e.detail)}));t.addEventListener("ionInputDidUnload",(function(e){m(e.detail)}))}))}}}));