/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
System.register(["./p-25608353.system.js","./p-c2257c28.system.js","./p-48158f96.system.js","./p-ba2492cf.system.js"],(function(r){"use strict";var t,e,n;return{setters:[function(r){t=r.k},function(r){e=r.i},function(r){n=r.createGesture},function(){}],execute:function(){var a=r("createSwipeBackGesture",(function(r,a,i,u,v){var c=r.ownerDocument.defaultView;var s=e(r);var o=function(r){var t=50;var e=r.startX;if(s){return e>=c.innerWidth-t}return e<=t};var f=function(r){return s?-r.deltaX:r.deltaX};var d=function(r){return s?-r.velocityX:r.velocityX};var m=function(r){return o(r)&&a()};var y=function(r){var t=f(r);var e=t/c.innerWidth;u(e)};var h=function(r){var e=f(r);var n=c.innerWidth;var a=e/n;var i=d(r);var u=n/2;var s=i>=0&&(i>.2||e>u);var o=s?1-a:a;var m=o*n;var y=0;if(m>5){var h=m/Math.abs(i);y=Math.min(h,540)}v(s,a<=0?.01:t(0,a,.9999),y)};return n({el:r,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:m,onStart:i,onMove:y,onEnd:h})}))}}}));