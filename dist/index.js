!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.driftMetaFrame=e():t.driftMetaFrame=e()}(this,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{initializeHost:()=>f,initializeMetaFrame:()=>d});var n=function(){window.drift=window.drift||function(){(drift.q=drift.q||[]).push(arguments)}},r=function(){var t=document.createElement("script");t.id="drift-widget-snippet",t.src="https://js.driftt.com/conductor",t.defer="defer",t.async="true",t.crossorigin="anonymous",document.body.appendChild(t)},o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.embed_id,n(),r()};function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.embed_id;if(!e)throw new Error("you must provide a Drift embed id");window.addEventListener("message",(function(t){if(t.source===window.parent){var n=t.data;n&&"drift_m_F::init"===n.type&&(drift("setContext",n.context),drift("page"),drift("init",e))}})),window.addEventListener("message",(function(t){if("https://js.driftt.com"===t.origin){var e=i(document.querySelectorAll("iframe")).map((function(t){return t.getBoundingClientRect()})).filter((function(t){return t.height>0})),n=e.map((function(t){return t.x})),r=e.map((function(t){return t.top})),o={type:"drift_m_F::bounds",bounds:{x:Math.min.apply(Math,i(n)),y:Math.min.apply(Math,i(r))}};window.parent.postMessage(o,"*")}}),!1),document.addEventListener("mousemove",(function(t){var e={type:"drift_m_F::scroll_update",isOnDrift:t.path[0].className.includes("drift-frame")};window.parent.postMessage(e,"*")})),o();var n={type:"drift_m_F::on_frame_load"};window.parent.postMessage(n,"*")},f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.frame_url,n=t.log,r=void 0!==n&&n;if(!e)throw new Error("frame_url must be provided to initializeHost");window.drift_meta_frame={bounds:{}};var o=function(){return{window:{location:{hash:window.location.hash,host:window.location.host,hostname:window.location.hostname,href:window.location.href,origin:window.location.origin,pathname:window.location.pathname,port:window.location.port,protocol:window.location.protocol,search:window.location.search},navigator:{language:window.navigator.language,browserLanguage:window.navigator.browserLanguage,userAgent:window.navigator.userAgent},innerHeight:window.innerHeight,innerWidth:window.innerWidth},document:{title:document.title,referrer:document.referrer}}},i=function(){var t=document.createElement("style");t.innerHTML="\n      #drift-meta-frame {\n        overflow: hidden;\n        height: 100vh;\n        width: 100vw;\n        margin: 0;\n        padding: 0;\n        position: fixed;\n        top: 0px;\n        left: 0px;\n      }\n     ";var n=document.createElement("iframe");return n.setAttribute("src",e),n.setAttribute("id","drift-meta-frame"),n.setAttribute("scrolling","no"),n.setAttribute("frameborder","0"),document.head.appendChild(t),document.body.appendChild(n),n},a=function(t){var e=t.isOnDrift,n=document.querySelector("#drift-meta-frame");r&&console.log("is on drift: ".concat(e)),n.style.pointerEvents=e?"":"none"},d={"drift_m_F::bounds":function(t){window.drift_meta_frame.bounds=t.bounds},"drift_m_F::scroll_update":function(t){a({isOnDrift:t.isOnDrift})},"drift_m_F::on_frame_load":function(t){document.querySelector("#drift-meta-frame").contentWindow.postMessage({type:"drift_m_F::init",context:o()},"*")}};window.addEventListener("message",(function(t){var e=document.querySelector("#drift-meta-frame");(e&&e.contentWindow||t.source!==iframe.contentWindow)&&t.data.type&&d[t.data.type]&&(0,d[t.data.type])(t.data)}),!1),document.addEventListener("mousemove",(function(t){var e=t.clientX>=window.drift_meta_frame.bounds.x,n=t.clientY>=window.drift_meta_frame.bounds.y;a({isOnDrift:e&&n})})),i()};return e})()}));