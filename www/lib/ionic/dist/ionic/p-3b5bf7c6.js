/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const e="ionic";let t,l,n,s=!1,o=!1,i=!1,r=!1,c=!1;const f="undefined"!=typeof window?window:{},a=f.document||{head:{}},u={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,l,n)=>e.addEventListener(t,l,n),rel:(e,t,l,n)=>e.removeEventListener(t,l,n),ce:(e,t)=>new CustomEvent(e,t)},$=e=>{Object.assign(u,e)},d=e=>Promise.resolve(e),h=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),m=(e,t,l)=>{l&&l.map((([l,n,s])=>{const o=y(e,l),i=p(t,s),r=b(l);u.ael(o,n,i,r),(t.o=t.o||[]).push((()=>u.rel(o,n,i,r)))}))},p=(e,t)=>l=>{try{256&e.t?e.i[t](l):(e.u=e.u||[]).push([t,l])}catch(e){Oe(e)}},y=(e,t)=>4&t?a:8&t?f:16&t?a.body:e,b=e=>0!=(2&e),w="http://www.w3.org/1999/xlink",g=new WeakMap,v=(e,t,l)=>{let n=Ce.get(e);h&&l?(n=n||new CSSStyleSheet,n.replace(t)):n=t,Ce.set(e,n)},k=(e,t,l)=>{let n=j(t,l),s=Ce.get(n);if(e=11===e.nodeType?e:a,s)if("string"==typeof s){let t,l=g.get(e=e.head||e);l||g.set(e,l=new Set),l.has(n)||(e.host&&(t=e.querySelector(`[sty-id="${n}"]`))?t.innerHTML=s:(t=a.createElement("style"),t.innerHTML=s,e.insertBefore(t,e.querySelector("link"))),l&&l.add(n))}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s]);return n},j=(e,t)=>"sc-"+(t&&32&e.t?e.$+"-"+t:e.$),S=e=>e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g,"$1{"),O=e=>Re.push(e),x=e=>ve(e).h,M={},C=e=>"object"==(e=typeof e)||"function"===e,R=(e,t,...l)=>{let n=null,s=null,o=null,i=!1,r=!1,c=[];const f=t=>{for(let l=0;l<t.length;l++)n=t[l],Array.isArray(n)?f(n):null!=n&&"boolean"!=typeof n&&((i="function"!=typeof e&&!C(n))&&(n+=""),i&&r?c[c.length-1].m+=n:c.push(i?T(null,n):n),r=i)};if(f(l),t){t.key&&(s=t.key),t.name&&(o=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,N);const a=T(e,null);return a.p=t,c.length>0&&(a.g=c),a.v=s,a.k=o,a},T=(e,t)=>({t:0,j:e,m:t,S:null,g:null,p:null,v:null,k:null}),L={},N={forEach:(e,t)=>e.map(P).forEach(t),map:(e,t)=>e.map(P).map(t).map(_)},P=e=>({vattrs:e.p,vchildren:e.g,vkey:e.v,vname:e.k,vtag:e.j,vtext:e.m}),_=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),R(e.vtag,t,...e.vchildren||[])}const t=T(e.vtag,e.vtext);return t.p=e.vattrs,t.g=e.vchildren,t.v=e.vkey,t.k=e.vname,t},D=(e,t,l,n,s,o)=>{if(l!==n){let i=Se(e,t),r=t.toLowerCase();if("class"===t){const t=e.classList,s=I(l),o=I(n);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in l)n&&null!=n[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in n)l&&n[t]===l[t]||(t.includes("-")?e.style.setProperty(t,n[t]):e.style[t]=n[t])}else if("key"===t);else if("ref"===t)n&&n(e);else if(i||"o"!==t[0]||"n"!==t[1]){const c=C(n);if((i||c&&null!==n)&&!s)try{if(e.tagName.includes("-"))e[t]=n;else{let s=null==n?"":n;"list"===t?i=!1:null!=l&&e[t]==s||(e[t]=s)}}catch(e){}let f=!1;r!==(r=r.replace(/^xlink\:?/,""))&&(t=r,f=!0),null==n||!1===n?!1===n&&""!==e.getAttribute(t)||(f?e.removeAttributeNS(w,t):e.removeAttribute(t)):(!i||4&o||s)&&!c&&(n=!0===n?"":n,f?e.setAttributeNS(w,t,n):e.setAttribute(t,n))}else t="-"===t[2]?t.slice(3):Se(f,r)?r.slice(2):r[2]+t.slice(3),l&&u.rel(e,t,l,!1),n&&u.ael(e,t,n,!1)}},E=/\s/,I=e=>e?e.split(E):[],U=(e,t,l,n)=>{const s=11===t.S.nodeType&&t.S.host?t.S.host:t.S,o=e&&e.p||M,i=t.p||M;for(n in o)n in i||D(s,n,o[n],void 0,l,t.t);for(n in i)D(s,n,o[n],i[n],l,t.t)},W=(e,o,c,f)=>{let u,$,d,h=o.g[c],m=0;if(s||(i=!0,"slot"===h.j&&(t&&f.classList.add(t+"-s"),h.t|=h.g?2:1)),null!==h.m)u=h.S=a.createTextNode(h.m);else if(1&h.t)u=h.S=a.createTextNode("");else{if(r||(r="svg"===h.j),u=h.S=a.createElementNS(r?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&h.t?"slot-fb":h.j),r&&"foreignObject"===h.j&&(r=!1),U(null,h,r),null!=t&&u["s-si"]!==t&&u.classList.add(u["s-si"]=t),h.g)for(m=0;m<h.g.length;++m)$=W(e,h,m,u),$&&u.appendChild($);"svg"===h.j?r=!1:"foreignObject"===u.tagName&&(r=!0)}return u["s-hn"]=n,3&h.t&&(u["s-sr"]=!0,u["s-cr"]=l,u["s-sn"]=h.k||"",d=e&&e.g&&e.g[c],d&&d.j===h.j&&e.S&&F(e.S,!1)),u},F=(e,t)=>{u.t|=1;const l=e.childNodes;for(let e=l.length-1;e>=0;e--){const s=l[e];s["s-hn"]!==n&&s["s-ol"]&&(V(s).insertBefore(s,q(s)),s["s-ol"].remove(),s["s-ol"]=void 0,i=!0),t&&F(s,t)}u.t&=-2},A=(e,t,l,s,o,i)=>{let r,c=e["s-cr"]&&e["s-cr"].parentNode||e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);o<=i;++o)s[o]&&(r=W(null,l,o,e),r&&(s[o].S=r,c.insertBefore(r,q(t))))},B=(e,t,l,n,s)=>{for(;t<=l;++t)(n=e[t])&&(s=n.S,X(n),o=!0,s["s-ol"]?s["s-ol"].remove():F(s,!0),s.remove())},H=(e,t)=>e.j===t.j&&("slot"===e.j?e.k===t.k:e.v===t.v),q=e=>e&&e["s-ol"]||e,V=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,z=(e,t)=>{const l=t.S=e.S,n=e.g,s=t.g,o=t.j,i=t.m;let c;null===i?(r="svg"===o||"foreignObject"!==o&&r,"slot"===o||U(e,t,r),null!==n&&null!==s?((e,t,l,n)=>{let s,o,i=0,r=0,c=0,f=0,a=t.length-1,u=t[0],$=t[a],d=n.length-1,h=n[0],m=n[d];for(;i<=a&&r<=d;)if(null==u)u=t[++i];else if(null==$)$=t[--a];else if(null==h)h=n[++r];else if(null==m)m=n[--d];else if(H(u,h))z(u,h),u=t[++i],h=n[++r];else if(H($,m))z($,m),$=t[--a],m=n[--d];else if(H(u,m))"slot"!==u.j&&"slot"!==m.j||F(u.S.parentNode,!1),z(u,m),e.insertBefore(u.S,$.S.nextSibling),u=t[++i],m=n[--d];else if(H($,h))"slot"!==u.j&&"slot"!==m.j||F($.S.parentNode,!1),z($,h),e.insertBefore($.S,u.S),$=t[--a],h=n[++r];else{for(c=-1,f=i;f<=a;++f)if(t[f]&&null!==t[f].v&&t[f].v===h.v){c=f;break}c>=0?(o=t[c],o.j!==h.j?s=W(t&&t[r],l,c,e):(z(o,h),t[c]=void 0,s=o.S),h=n[++r]):(s=W(t&&t[r],l,r,e),h=n[++r]),s&&V(u.S).insertBefore(s,q(u.S))}i>a?A(e,null==n[d+1]?null:n[d+1].S,l,n,r,d):r>d&&B(t,i,a)})(l,n,t,s):null!==s?(null!==e.m&&(l.textContent=""),A(l,null,t,s,0,s.length-1)):null!==n&&B(n,0,n.length-1),r&&"svg"===o&&(r=!1)):(c=l["s-cr"])?c.parentNode.textContent=i:e.m!==i&&(l.data=i)},G=e=>{let t,l,n,s,o,i,r=e.childNodes;for(l=0,n=r.length;l<n;l++)if(t=r[l],1===t.nodeType){if(t["s-sr"])for(o=t["s-sn"],t.hidden=!1,s=0;s<n;s++)if(i=r[s].nodeType,r[s]["s-hn"]!==t["s-hn"]||""!==o){if(1===i&&o===r[s].getAttribute("slot")){t.hidden=!0;break}}else if(1===i||3===i&&""!==r[s].textContent.trim()){t.hidden=!0;break}G(t)}},J=[],K=e=>{let t,l,n,s,i,r,c=0,f=e.childNodes,a=f.length;for(;c<a;c++){if(t=f[c],t["s-sr"]&&(l=t["s-cr"])&&l.parentNode)for(n=l.parentNode.childNodes,s=t["s-sn"],r=n.length-1;r>=0;r--)l=n[r],l["s-cn"]||l["s-nr"]||l["s-hn"]===t["s-hn"]||(Q(l,s)?(i=J.find((e=>e.O===l)),o=!0,l["s-sn"]=l["s-sn"]||s,i?i.M=t:J.push({M:t,O:l}),l["s-sr"]&&J.map((e=>{Q(e.O,l["s-sn"])&&(i=J.find((e=>e.O===l)),i&&!e.M&&(e.M=i.M))}))):J.some((e=>e.O===l))||J.push({O:l}));1===t.nodeType&&K(t)}},Q=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,X=e=>{e.p&&e.p.ref&&e.p.ref(null),e.g&&e.g.map(X)},Y=e=>ve(e).C,Z=(e,t,l)=>{const n=Y(e);return{emit:e=>ee(n,t,{bubbles:!!(4&l),composed:!!(2&l),cancelable:!!(1&l),detail:e})}},ee=(e,t,l)=>{const n=u.ce(t,l);return e.dispatchEvent(n),n},te=(e,t)=>{t&&!e.R&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.R=t)))},le=(e,t)=>{if(e.t|=16,!(4&e.t))return te(e,e.T),Ie((()=>ne(e,t)));e.t|=512},ne=(e,t)=>{const l=e.i;let n;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>fe(l,e,t))),e.u=null),n=fe(l,"componentWillLoad")),n=ae(n,(()=>fe(l,"componentWillRender"))),ae(n,(()=>se(e,l,t)))},se=async(e,t,l)=>{const n=e.C,s=n["s-rc"];l&&(e=>{const t=e.L,l=e.C,n=t.t,s=k(l.shadowRoot?l.shadowRoot:l.getRootNode(),t,e.h);10&n&&(l["s-sc"]=s,l.classList.add(s+"-h"),2&n&&l.classList.add(s+"-s"))})(e);oe(e,t),s&&(s.map((e=>e())),n["s-rc"]=void 0);{const t=n["s-p"],l=()=>ie(e);0===t.length?l():(Promise.all(t).then(l),e.t|=4,t.length=0)}},oe=(e,r)=>{try{r=r.render&&r.render(),e.t&=-17,e.t|=2,((e,r)=>{const c=e.C,f=e.L,$=e.N||T(null,null),d=(e=>e&&e.j===L)(r)?r:R(null,null,r);if(n=c.tagName,f.P&&(d.p=d.p||{},f.P.map((([e,t])=>d.p[t]=c[e]))),d.j=null,d.t|=4,e.N=d,d.S=$.S=c.shadowRoot||c,t=c["s-sc"],l=c["s-cr"],s=0!=(1&f.t),o=!1,z($,d),u.t|=1,i){let e,t,l,n,s,o;K(d.S);let i=0;for(;i<J.length;i++)e=J[i],t=e.O,t["s-ol"]||(l=a.createTextNode(""),l["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=l,t));for(i=0;i<J.length;i++)if(e=J[i],t=e.O,e.M){for(n=e.M.parentNode,s=e.M.nextSibling,l=t["s-ol"];l=l.previousSibling;)if(o=l["s-nr"],o&&o["s-sn"]===t["s-sn"]&&n===o.parentNode&&(o=o.nextSibling,!o||!o["s-nr"])){s=o;break}(!s&&n!==t.parentNode||t.nextSibling!==s)&&t!==s&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),n.insertBefore(t,s))}else 1===t.nodeType&&(t.hidden=!0)}o&&G(d.S),u.t&=-2,J.length=0})(e,r)}catch(t){Oe(t,e.C)}return null},ie=e=>{const t=e.C,l=e.i,n=e.T;fe(l,"componentDidRender"),64&e.t?fe(l,"componentDidUpdate"):(e.t|=64,ue(t),fe(l,"componentDidLoad"),e._(t),n||ce()),e.D(t),e.R&&(e.R(),e.R=void 0),512&e.t&&De((()=>le(e,!1))),e.t&=-517},re=e=>{{const t=ve(e),l=t.C.isConnected;return l&&2==(18&t.t)&&le(t,!1),l}},ce=()=>{ue(a.documentElement),De((()=>ee(f,"appload",{detail:{namespace:"ionic"}})))},fe=(e,t,l)=>{if(e&&e[t])try{return e[t](l)}catch(e){Oe(e)}},ae=(e,t)=>e&&e.then?e.then(t):t(),ue=e=>e.classList.add("hydrated"),$e=(e,t,l,n,s,o,i)=>{let r,c,f,u;if(1===o.nodeType){for(r=o.getAttribute("c-id"),r&&(c=r.split("."),c[0]!==i&&"0"!==c[0]||(f={t:0,I:c[0],U:c[1],W:c[2],F:c[3],j:o.tagName.toLowerCase(),S:o,p:null,g:null,v:null,k:null,m:null},t.push(f),o.removeAttribute("c-id"),e.g||(e.g=[]),e.g[f.F]=f,e=f,n&&"0"===f.W&&(n[f.F]=f.S))),u=o.childNodes.length-1;u>=0;u--)$e(e,t,l,n,s,o.childNodes[u],i);if(o.shadowRoot)for(u=o.shadowRoot.childNodes.length-1;u>=0;u--)$e(e,t,l,n,s,o.shadowRoot.childNodes[u],i)}else if(8===o.nodeType)c=o.nodeValue.split("."),c[1]!==i&&"0"!==c[1]||(r=c[0],f={t:0,I:c[1],U:c[2],W:c[3],F:c[4],S:o,p:null,g:null,v:null,k:null,j:null,m:null},"t"===r?(f.S=o.nextSibling,f.S&&3===f.S.nodeType&&(f.m=f.S.textContent,t.push(f),o.remove(),e.g||(e.g=[]),e.g[f.F]=f,n&&"0"===f.W&&(n[f.F]=f.S))):f.I===i&&("s"===r?(f.j="slot",o["s-sn"]=c[5]?f.k=c[5]:"",o["s-sr"]=!0,n&&(f.S=a.createElement(f.j),f.k&&f.S.setAttribute("name",f.k),o.parentNode.insertBefore(f.S,o),o.remove(),"0"===f.W&&(n[f.F]=f.S)),l.push(f),e.g||(e.g=[]),e.g[f.F]=f):"r"===r&&(n?o.remove():(s["s-cr"]=o,o["s-cn"]=!0))));else if(e&&"style"===e.j){const t=T(null,o.textContent);t.S=o,t.F="0",e.g=[t]}},de=(e,t)=>{if(1===e.nodeType){let l=0;for(;l<e.childNodes.length;l++)de(e.childNodes[l],t);if(e.shadowRoot)for(l=0;l<e.shadowRoot.childNodes.length;l++)de(e.shadowRoot.childNodes[l],t)}else if(8===e.nodeType){const l=e.nodeValue.split(".");"o"===l[0]&&(t.set(l[1]+"."+l[2],e),e.nodeValue="",e["s-en"]=l[3])}},he=(e,t,l)=>{if(t.A){e.watchers&&(t.B=e.watchers);const n=Object.entries(t.A),s=e.prototype;if(n.map((([e,[n]])=>{31&n||2&l&&32&n?Object.defineProperty(s,e,{get(){return((e,t)=>ve(this).H.get(t))(0,e)},set(l){((e,t,l,n)=>{const s=ve(e),o=s.C,i=s.H.get(t),r=s.t,c=s.i;if(l=((e,t)=>null==e||C(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(l,n.A[t][0]),(!(8&r)||void 0===i)&&l!==i&&(!Number.isNaN(i)||!Number.isNaN(l))&&(s.H.set(t,l),c)){if(n.B&&128&r){const e=n.B[t];e&&e.map((e=>{try{c[e](l,i,t)}catch(e){Oe(e,o)}}))}2==(18&r)&&le(s,!1)}})(this,e,l,t)},configurable:!0,enumerable:!0}):1&l&&64&n&&Object.defineProperty(s,e,{value(...t){const l=ve(this);return l.q.then((()=>l.i[e](...t)))}})})),1&l){const l=new Map;s.attributeChangedCallback=function(e,t,n){u.jmp((()=>{const t=l.get(e);if(this.hasOwnProperty(t))n=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==n)return;this[t]=(null!==n||"boolean"!=typeof this[t])&&n}))},e.observedAttributes=n.filter((([e,t])=>15&t[0])).map((([e,n])=>{const s=n[1]||e;return l.set(s,e),512&n[0]&&t.P.push([e,s]),s}))}}return e},me=e=>{fe(e,"connectedCallback")},pe=e=>{if(0==(1&u.t)){const t=ve(e),l=t.L,n=()=>{};if(1&t.t)m(e,t,l.V),me(t.i);else{let n;if(t.t|=1,n=e.getAttribute("s-id"),n){if(1&l.t){const t=k(e.shadowRoot,l,e.getAttribute("s-mode"));e.classList.remove(t+"-h",t+"-s")}((e,t,l,n)=>{const s=e.shadowRoot,o=[],i=s?[]:null,r=n.N=T(t,null);u.G||de(a.body,u.G=new Map),e["s-id"]=l,e.removeAttribute("s-id"),$e(r,o,[],i,e,e,l),o.map((e=>{const l=e.I+"."+e.U,n=u.G.get(l),o=e.S;n&&""===n["s-en"]&&n.parentNode.insertBefore(o,n.nextSibling),s||(o["s-hn"]=t,n&&(o["s-ol"]=n,o["s-ol"]["s-nr"]=o)),u.G.delete(l)})),s&&i.map((e=>{e&&s.appendChild(e)}))})(e,l.$,n,t)}n||12&l.t&&ye(e);{let l=e;for(;l=l.parentNode||l.host;)if(1===l.nodeType&&l.hasAttribute("s-id")&&l["s-p"]||l["s-p"]){te(t,t.T=l);break}}l.A&&Object.entries(l.A).map((([t,[l]])=>{if(31&l&&e.hasOwnProperty(t)){const l=e[t];delete e[t],e[t]=l}})),De((()=>(async(e,t,l,n,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=Me(l)).then){const e=()=>{};s=await s,e()}s.isProxied||(l.B=s.watchers,he(s,l,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){Oe(e)}t.t&=-9,t.t|=128,e(),me(t.i)}if(s.style){let n=s.style;"string"!=typeof n&&(n=n[t.h=(e=>Re.map((t=>t(e))).find((e=>!!e)))(e)]);const o=j(l,t.h);if(!Ce.has(o)){const e=()=>{};v(o,n,!!(1&l.t)),e()}}}const o=t.T,i=()=>le(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(e,t,l)))}n()}},ye=e=>{const t=e["s-cr"]=a.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)},be=(e,t={})=>{const l=[],n=t.exclude||[],s=f.customElements,o=a.head,i=o.querySelector("meta[charset]"),r=a.createElement("style"),c=[],$=a.querySelectorAll("[sty-id]");let d,h=!0,m=0;for(Object.assign(u,t),u.l=new URL(t.resourcesUrl||"./",a.baseURI).href,u.t|=2;m<$.length;m++)v($[m].getAttribute("sty-id"),S($[m].innerHTML),!0);e.map((e=>{e[1].map((t=>{const o={t:t[0],$:t[1],A:t[2],V:t[3]};o.A=t[2],o.V=t[3],o.P=[],o.B={};const i=o.$,r=class extends HTMLElement{constructor(e){super(e),je(e=this,o),1&o.t&&e.attachShadow({mode:"open",delegatesFocus:!!(16&o.t)})}connectedCallback(){d&&(clearTimeout(d),d=null),h?c.push(this):u.jmp((()=>pe(this)))}disconnectedCallback(){u.jmp((()=>(()=>{if(0==(1&u.t)){const e=ve(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),fe(t,"disconnectedCallback")}})()))}componentOnReady(){return ve(this).J}};o.K=e[0],n.includes(i)||s.get(i)||(l.push(i),s.define(i,he(r,o,1)))}))})),r.innerHTML=l+"{visibility:hidden}.hydrated{visibility:inherit}",r.setAttribute("data-styles",""),o.insertBefore(r,i?i.nextSibling:o.firstChild),h=!1,c.length?c.map((e=>e.connectedCallback())):u.jmp((()=>d=setTimeout(ce,30)))},we=e=>{const t=new URL(e,u.l);return t.origin!==f.location.origin?t.href:t.pathname},ge=new WeakMap,ve=e=>ge.get(e),ke=(e,t)=>ge.set(t.i=e,t),je=(e,t)=>{const l={t:0,C:e,L:t,H:new Map};return l.q=new Promise((e=>l.D=e)),l.J=new Promise((e=>l._=e)),e["s-p"]=[],e["s-rc"]=[],m(e,l,t.V),ge.set(e,l)},Se=(e,t)=>t in e,Oe=(e,t)=>(0,console.error)(e,t),xe=new Map,Me=e=>{const t=e.$.replace(/-/g,"_"),l=e.K,n=xe.get(l);return n?n[t]:__sc_import_ionic(`./${l}.entry.js`).then((e=>(xe.set(l,e),e[t])),Oe)},Ce=new Map,Re=[],Te=[],Le=[],Ne=(e,t)=>l=>{e.push(l),c||(c=!0,t&&4&u.t?De(_e):u.raf(_e))},Pe=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){Oe(e)}e.length=0},_e=()=>{Pe(Te),Pe(Le),(c=Te.length>0)&&u.raf(_e)},De=e=>d().then(e),Ee=Ne(Te,!1),Ie=Ne(Le,!0),Ue={isDev:!1,isBrowser:!0,isServer:!1,isTesting:!1};export{Ue as B,L as H,e as N,O as a,be as b,Ie as c,a as d,Z as e,Ee as f,x as g,R as h,Y as i,re as j,we as k,d as p,ke as r,$ as s,f as w}