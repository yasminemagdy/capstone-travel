var Client;(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t,n,r,o,a,u){try{var c=e[a](u),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(r,o)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var u=e.apply(t,r);function c(e){n(u,o,a,c,i,"next",e)}function i(e){n(u,o,a,c,i,"throw",e)}c(void 0)}))}}e.r(t),e.d(t,{action:()=>i});var o=document.getElementById("cityname"),a=document.getElementById("leave"),u=document.getElementById("date"),c=new Date;function i(e){e.preventDefault();var t=o.value;if(""==t)return alert("Please Fill Out The Empty Field"),!1;l("http://api.geonames.org/searchJSON?q=",t,"yasmine").then((function(e){console.log(e),s("/add",{countryName:e.geonames[0].countryName,longitude:e.geonames[0].lng,latitude:e.geonames[0].lat}),d()}))}c.getMonth(),c.getDate(),c.getFullYear(),document.getElementById("generate").addEventListener("click",i),o.value,a.value,u.value;var l=function(){var e=r(regeneratorRuntime.mark((function e(t,n,r){var o,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t+n+"country=&username="+r);case 2:return o=e.sent,e.prev=3,e.next=6,o.json();case 6:return a=e.sent,e.abrupt("return",a);case 10:e.prev=10,e.t0=e.catch(3),console.log("error",e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t,n,r){return e.apply(this,arguments)}}(),s=function(){var e=r(regeneratorRuntime.mark((function e(){var t,n,r,o,a=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:"",n=a.length>1&&void 0!==a[1]?a[1]:{},e.next=4,fetch(t,{method:"POST",mode:"cors",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({latitude:n.countryName,longitude:n.lat,country:n.lng})});case 4:return r=e.sent,e.prev=5,e.next=8,r.json();case 8:return o=e.sent,e.abrupt("return",o);case 12:e.prev=12,e.t0=e.catch(5),console.log("error",e.t0);case 15:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=r(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/all");case 2:return t=e.sent,e.prev=3,e.next=6,t.json();case 6:n=e.sent,document.getElementById("leave").innerHTML="You are leaving from : ".concat(n.country),document.getElementById("cityname").innerHTML="To: ".concat(n.latitude),document.getElementById("date").innerHTML="On: ".concat(n.longitude),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.log("error",e.t0);case 15:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(){return e.apply(this,arguments)}}();Client=t})();