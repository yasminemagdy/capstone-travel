var Client;(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t,n,r,a,o,c){try{var u=e[o](c),i=u.value}catch(e){return void n(e)}u.done?t(i):Promise.resolve(i).then(r,a)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var c=e.apply(t,r);function u(e){n(c,a,o,u,i,"next",e)}function i(e){n(c,a,o,u,i,"throw",e)}u(void 0)}))}}e.r(t),e.d(t,{action:()=>l});var a=document.getElementById("cityname"),o=document.getElementById("leave"),c=document.getElementById("date"),u=new Date,i=u.getMonth()+1+"-"+u.getDate()+"-"+u.getFullYear();function l(e){e.preventDefault();var t=c.value,n=a.value,r=o.value;return""==t?(alert("Please Fill Out The Date Field"),!1):""==n||""==r?(alert("Please Fill Out The Empty Field"),!1):void s("http://api.geonames.org/searchJSON?q=",n,"yasmine").then((function(e){console.log(e),d("/add",{cityv:n,leve:r,datv:t,countryName:e.geonames[0].countryName,lng:e.geonames[0].lng,lat:e.geonames[0].lat}),m()}))}document.getElementById("generate").addEventListener("click",l);var s=function(){var e=r(regeneratorRuntime.mark((function e(t,n,r){var a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t+n+"&maxRows=10&username="+r);case 2:return a=e.sent,e.prev=3,e.next=6,a.json();case 6:return o=e.sent,e.abrupt("return",o);case 10:e.prev=10,e.t0=e.catch(3),console.log("error",e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t,n,r){return e.apply(this,arguments)}}(),d=function(){var e=r(regeneratorRuntime.mark((function e(){var t,n,r,a,o=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:"",n=o.length>1&&void 0!==o[1]?o[1]:{},e.next=4,fetch(t,{method:"POST",mode:"cors",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({countryName:n.countryName,latitude:n.lat,longitude:n.lng,leaving:n.leve,cityName:n.cityv,date:c.value,daysLeft:i,temp:n.temp})});case 4:return r=e.sent,e.prev=5,e.next=8,r.json();case 8:return a=e.sent,e.abrupt("return",a);case 12:e.prev=12,e.t0=e.catch(5),console.log("error",e.t0);case 15:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=r(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/all");case 2:return t=e.sent,e.prev=3,e.next=6,t.json();case 6:n=e.sent,document.getElementById("l").innerHTML="You are leaving from : ".concat(o.value),document.getElementById("c").innerHTML="To: ".concat(n.cityName," in ").concat(n.countryName),document.getElementById("de").innerHTML="On: ".concat(n.date),document.getElementById("countdown").innerHTML="Time Left: ".concat(daysleft," "),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log("error",e.t0);case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(){return e.apply(this,arguments)}}();Client=t})();