/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{c as t}from"./p-c919f1cc.js";import{g as o}from"./p-1e9961ec.js";import"./p-7853c104.js";import"./p-3b5bf7c6.js";const r=(r,c)=>{const i="back"===c.direction,a=c.leavingEl,s=o(c.enteringEl),e=s.querySelector("ion-toolbar"),p=t();if(p.addElement(s).fill("both").beforeRemoveClass("ion-page-invisible"),i?p.duration(c.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):p.duration(c.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),e){const o=t();o.addElement(e),p.addAnimation(o)}if(a&&i){p.duration(c.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const r=t();r.addElement(o(a)).onFinish((t=>{1===t&&r.elements.length>0&&r.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),p.addAnimation(r)}return p};export{r as mdTransitionAnimation}