/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{c as t}from"./p-3b5bf7c6.js";import{h as o,a as e,b as n}from"./p-bc88d2ac.js";import{createGesture as c}from"./p-ca42820c.js";const r=(r,a)=>{let s,i;const d=(t,o,e)=>{if("undefined"==typeof document)return;const n=document.elementFromPoint(t,o);n&&a(n)?n!==s&&(f(),m(n,e)):f()},m=(o,e)=>{s=o,i||(i=s);const n=s;t((()=>n.classList.add("ion-activated"))),e()},f=(o=!1)=>{if(!s)return;const e=s;t((()=>e.classList.remove("ion-activated"))),o&&i!==s&&s.click(),s=void 0};return c({el:r,gestureName:"buttonActiveDrag",threshold:0,onStart:t=>d(t.currentX,t.currentY,e),onMove:t=>d(t.currentX,t.currentY,n),onEnd:()=>{f(!0),o(),i=void 0}})};export{r as c}