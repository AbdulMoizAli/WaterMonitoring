import{__awaiter,__generator}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{f as readTask,c as writeTask}from"./index-b3eecb14.js";import{c as componentOnReady}from"./helpers-6e1e5b65.js";var startStatusTap=function(){var e=window;e.addEventListener("statusTap",(function(){readTask((function(){var t=e.innerWidth;var r=e.innerHeight;var n=document.elementFromPoint(t/2,r/2);if(!n){return}var o=n.closest("ion-content");if(o){new Promise((function(e){return componentOnReady(o,e)})).then((function(){writeTask((function(){return __awaiter(void 0,void 0,void 0,(function(){return __generator(this,(function(e){switch(e.label){case 0:o.style.setProperty("--overflow","hidden");return[4,o.scrollToTop(300)];case 1:e.sent();o.style.removeProperty("--overflow");return[2]}}))}))}))}))}}))}))};export{startStatusTap};