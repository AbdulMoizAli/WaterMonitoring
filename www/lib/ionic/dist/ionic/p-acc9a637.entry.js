/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as i,e as t,h as e,H as s,i as n}from"./p-3b5bf7c6.js";import{b as o}from"./p-73604786.js";import{r,g as a}from"./p-7853c104.js";import{a as l,b as p,h as c}from"./p-bc88d2ac.js";import{c as h}from"./p-1d0d7200.js";const d=class{constructor(e){i(this,e),this.ionChange=t(this,"ionChange",7),this.hapticsStarted=!1,this.isColumnVisible=!1,this.isActive=!1,this.items=[],this.color="primary",this.numericInput=!1,this.centerPickerItemInView=(i,t=!0)=>{const{el:e,isColumnVisible:s}=this;if(s){const s=i.offsetTop-3*i.clientHeight+i.clientHeight/2;e.scrollTop!==s&&e.scroll({top:s,left:0,behavior:t?"smooth":void 0})}},this.inputModeChange=i=>{if(!this.numericInput)return;const{useInputMode:t,inputModeColumn:e}=i.detail;this.isActive=!(!t||void 0!==e&&e!==this.el)},this.initializeScrollListener=()=>{const{el:i}=this;let t,e=this.activeItem;const s=()=>{r((()=>{t&&(clearTimeout(t),t=void 0),this.hapticsStarted||(l(),this.hapticsStarted=!0);const s=i.getBoundingClientRect(),n=i.shadowRoot.elementFromPoint(s.x+s.width/2,s.y+s.height/2);null!==e&&e.classList.remove(m),n!==e&&p(),e=n,n.classList.add(m),t=setTimeout((()=>{const i=n.getAttribute("data-index");if(null===i)return;const t=parseInt(i,10),e=this.items[t];e.value!==this.value&&(this.value=e.value,c(),this.hapticsStarted=!1)}),250)}))};r((()=>{i.addEventListener("scroll",s),this.destroyScrollListener=()=>{i.removeEventListener("scroll",s)}}))}}valueChange(){if(this.isColumnVisible){const{items:i,value:t}=this;this.scrollActiveItemIntoView();const e=i.find((i=>i.value===t));e&&this.ionChange.emit(e)}}componentWillLoad(){new IntersectionObserver((i=>{var t;if(i[0].isIntersecting){this.isColumnVisible=!0;const i=a(this.el).querySelector(`.${m}`);null==i||i.classList.remove(m),this.scrollActiveItemIntoView(),null===(t=this.activeItem)||void 0===t||t.classList.add(m),this.initializeScrollListener()}else this.isColumnVisible=!1,this.destroyScrollListener&&(this.destroyScrollListener(),this.destroyScrollListener=void 0)}),{threshold:.01}).observe(this.el);const i=this.el.closest("ion-picker-internal");null!==i&&i.addEventListener("ionInputModeChange",(i=>this.inputModeChange(i)))}componentDidRender(){var i;const{activeItem:t,items:e,isColumnVisible:s,value:n}=this;s&&(t?this.scrollActiveItemIntoView():(null===(i=e[0])||void 0===i?void 0:i.value)!==n&&(this.value=e[0].value))}async scrollActiveItemIntoView(){const i=this.activeItem;i&&this.centerPickerItemInView(i,!1)}get activeItem(){return a(this.el).querySelector(`.picker-item[data-value="${this.value}"]`)}render(){const{items:i,color:t,isActive:n,numericInput:r}=this,a=o(this);return e(s,{tabindex:0,class:h(t,{[a]:!0,"picker-column-active":n,"picker-column-numeric-input":r})},e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),i.map(((i,t)=>e("div",{class:"picker-item","data-value":i.value,"data-index":t,onClick:i=>{this.centerPickerItemInView(i.target)}},i.text))),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "))}get el(){return n(this)}static get watchers(){return{value:["valueChange"]}}},m="picker-item-active";d.style={ios:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}",md:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}"};export{d as ion_picker_column_internal}