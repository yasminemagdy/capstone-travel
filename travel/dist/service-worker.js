if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,t)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const n={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return n;default:return e(r)}}))).then((e=>{const r=t(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-0d8277e8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./index.html",revision:"3235bd29c22a2e0cbb328f5f1c644dfa"},{url:"main.css",revision:"4bd4da802cb99ddbaea118dfec5800df"},{url:"main.js",revision:"2f37cc32394d90057eb93280e6b2fafb"},{url:"weather.jpeg",revision:"d40e78658d671e12c81aea55d6eea3a1"}],{})}));
