/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as registerInstance,e as createEvent,h,H as Host,i as getElement}from"./index-b3eecb14.js";import{b as getIonMode}from"./ionic-global-0ebe321c.js";import{i as inheritAttributes}from"./helpers-6e1e5b65.js";var imgCss=":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}";var Img=function(){function t(t){var e=this;registerInstance(this,t);this.ionImgWillLoad=createEvent(this,"ionImgWillLoad",7);this.ionImgDidLoad=createEvent(this,"ionImgDidLoad",7);this.ionError=createEvent(this,"ionError",7);this.inheritedAttributes={};this.onLoad=function(){e.ionImgDidLoad.emit()};this.onError=function(){e.ionError.emit()}}t.prototype.srcChanged=function(){this.addIO()};t.prototype.componentWillLoad=function(){this.inheritedAttributes=inheritAttributes(this.el,["draggable"])};t.prototype.componentDidLoad=function(){this.addIO()};t.prototype.addIO=function(){var t=this;if(this.src===undefined){return}if(typeof window!=="undefined"&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype){this.removeIO();this.io=new IntersectionObserver((function(e){if(e[e.length-1].isIntersecting){t.load();t.removeIO()}}));this.io.observe(this.el)}else{setTimeout((function(){return t.load()}),200)}};t.prototype.load=function(){this.loadError=this.onError;this.loadSrc=this.src;this.ionImgWillLoad.emit()};t.prototype.removeIO=function(){if(this.io){this.io.disconnect();this.io=undefined}};t.prototype.render=function(){var t=this,e=t.loadSrc,i=t.alt,o=t.onLoad,r=t.loadError,n=t.inheritedAttributes;var s=n.draggable;return h(Host,{class:getIonMode(this)},h("img",{decoding:"async",src:e,alt:i,onLoad:o,onError:r,part:"image",draggable:isDraggable(s)}))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{src:["srcChanged"]}},enumerable:false,configurable:true});return t}();var isDraggable=function(t){switch(t){case"true":return true;case"false":return false;default:return undefined}};Img.style=imgCss;export{Img as ion_img};