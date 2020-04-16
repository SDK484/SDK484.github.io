"use strict";window.DOMHandler=class{constructor(a,b){this._iRuntime=a,this._componentId=b,this._hasTickCallback=!1,this._tickCallback=()=>this.Tick()}Attach(){}PostToRuntime(a,b,c,d){this._iRuntime.PostToRuntimeComponent(this._componentId,a,b,c,d)}PostToRuntimeAsync(a,b,c,d){return this._iRuntime.PostToRuntimeComponentAsync(this._componentId,a,b,c,d)}_PostToRuntimeMaybeSync(a,b,c){this._iRuntime.UsesWorker()?this.PostToRuntime(a,b,c):this._iRuntime._GetLocalRuntime()["_OnMessageFromDOM"]({"type":"event","component":this._componentId,"handler":a,"dispatchOpts":c||null,"data":b,"responseId":null})}AddRuntimeMessageHandler(a,b){this._iRuntime.AddRuntimeComponentMessageHandler(this._componentId,a,b)}AddRuntimeMessageHandlers(a){for(const[b,c]of a)this.AddRuntimeMessageHandler(b,c)}GetRuntimeInterface(){return this._iRuntime}GetComponentID(){return this._componentId}_StartTicking(){this._hasTickCallback||(this._iRuntime._AddRAFCallback(this._tickCallback),this._hasTickCallback=!0)}_StopTicking(){this._hasTickCallback&&(this._iRuntime._RemoveRAFCallback(this._tickCallback),this._hasTickCallback=!1)}Tick(){}},window.RateLimiter=class{constructor(a,b){this._callback=a,this._interval=b,this._timerId=-1,this._lastCallTime=-Infinity,this._timerCallFunc=()=>this._OnTimer(),this._ignoreReset=!1,this._canRunImmediate=!1}SetCanRunImmediate(a){this._canRunImmediate=!!a}Call(){if(-1===this._timerId){const a=Date.now(),b=a-this._lastCallTime,c=this._interval;b>=c&&this._canRunImmediate?(this._lastCallTime=a,this._RunCallback()):this._timerId=self.setTimeout(this._timerCallFunc,Math.max(c-b,4))}}_RunCallback(){this._ignoreReset=!0,this._callback(),this._ignoreReset=!1}Reset(){this._ignoreReset||(this._CancelTimer(),this._lastCallTime=Date.now())}_OnTimer(){this._timerId=-1,this._lastCallTime=Date.now(),this._RunCallback()}_CancelTimer(){-1!==this._timerId&&(self.clearTimeout(this._timerId),this._timerId=-1)}Release(){this._CancelTimer(),this._callback=null,this._timerCallFunc=null}};

"use strict";window.DOMElementHandler=class extends DOMHandler{constructor(a,b){super(a,b),this._elementMap=new Map,this._autoAttach=!0,this.AddRuntimeMessageHandler("create",(a)=>this._OnCreate(a)),this.AddRuntimeMessageHandler("destroy",(a)=>this._OnDestroy(a)),this.AddRuntimeMessageHandler("set-visible",(a)=>this._OnSetVisible(a)),this.AddRuntimeMessageHandler("update-position",(a)=>this._OnUpdatePosition(a)),this.AddRuntimeMessageHandler("update-state",(a)=>this._OnUpdateState(a)),this.AddRuntimeMessageHandler("focus",(a)=>this._OnSetFocus(a)),this.AddRuntimeMessageHandler("set-css-style",(a)=>this._OnSetCssStyle(a))}SetAutoAttach(a){this._autoAttach=!!a}AddDOMElementMessageHandler(a,b){this.AddRuntimeMessageHandler(a,(a)=>{const c=a["elementId"],d=this._elementMap.get(c);return b(d,a)})}_OnCreate(a){const b=a["elementId"],c=this.CreateElement(b,a);this._elementMap.set(b,c),a["isVisible"]||(c.style.display="none"),this._autoAttach&&document.body.appendChild(c)}CreateElement(){throw new Error("required override")}DestroyElement(){}_OnDestroy(a){const b=a["elementId"],c=this._elementMap.get(b);this.DestroyElement(c),this._autoAttach&&c.parentElement.removeChild(c),this._elementMap.delete(b)}PostToRuntimeElement(a,b,c){c||(c={}),c["elementId"]=b,this.PostToRuntime(a,c)}_PostToRuntimeElementMaybeSync(a,b,c){c||(c={}),c["elementId"]=b,this._PostToRuntimeMaybeSync(a,c)}_OnSetVisible(a){if(this._autoAttach){const b=this._elementMap.get(a["elementId"]);b.style.display=a["isVisible"]?"":"none"}}_OnUpdatePosition(a){if(this._autoAttach){const b=this._elementMap.get(a["elementId"]);b.style.left=a["left"]+"px",b.style.top=a["top"]+"px",b.style.width=a["width"]+"px",b.style.height=a["height"]+"px";const c=a["fontSize"];null!==c&&(b.style.fontSize=c+"em")}}_OnUpdateState(a){const b=this._elementMap.get(a["elementId"]);this.UpdateState(b,a)}UpdateState(){throw new Error("required override")}_OnSetFocus(a){const b=this._elementMap.get(a["elementId"]);a["focus"]?b.focus():b.blur()}_OnSetCssStyle(a){const b=this._elementMap.get(a["elementId"]);b.style[a["prop"]]=a["val"]}GetElementById(a){return this._elementMap.get(a)}};

"use strict";{function a(a){if(a.isStringSrc){const b=document.createElement("script");b.async=!1,b.textContent=a.str,document.head.appendChild(b)}else return new Promise((b,c)=>{const d=document.createElement("script");d.onload=b,d.onerror=c,d.async=!1,d.src=a,document.head.appendChild(d)})}async function b(a){const b=await c(a),d=new TextDecoder("utf-8");return d.decode(b)}function c(a){return new Promise((b,c)=>{const d=new FileReader;d.onload=(a)=>b(a.target.result),d.onerror=(a)=>c(a),d.readAsArrayBuffer(a)})}function d(a){return o.has(a)}const e=/(iphone|ipod|ipad)/i.test(navigator.userAgent);let f=new Audio;const g={"audio/webm; codecs=opus":!!f.canPlayType("audio/webm; codecs=opus"),"audio/ogg; codecs=opus":!!f.canPlayType("audio/ogg; codecs=opus"),"audio/webm; codecs=vorbis":!!f.canPlayType("audio/webm; codecs=vorbis"),"audio/ogg; codecs=vorbis":!!f.canPlayType("audio/ogg; codecs=vorbis"),"audio/mp4":!!f.canPlayType("audio/mp4"),"audio/mpeg":!!f.canPlayType("audio/mpeg")};f=null;const h=[];let i=0;window["RealFile"]=window["File"];const j=[],k=new Map,l=new Map;let m=0;const n=[];self.runOnStartup=function(a){if("function"!=typeof a)throw new Error("runOnStartup called without a function");n.push(a)};const o=new Set(["cordova","playable-ad","instant-games"]);window.RuntimeInterface=class f{constructor(a){this._useWorker=a.useWorker,this._messageChannelPort=null,this._baseUrl="",this._scriptFolder=a.scriptFolder,this._workerScriptBlobURLs={},this._worker=null,this._localRuntime=null,this._domHandlers=[],this._runtimeDomHandler=null,this._canvas=null,this._jobScheduler=null,this._rafId=-1,this._rafFunc=()=>this._OnRAFCallback(),this._rafCallbacks=[],this._exportType=a.exportType,d(this._exportType)&&this._useWorker&&(console.warn("[C3 runtime] Worker mode is enabled and supported, but is disabled in WebViews due to crbug.com/923007. Reverting to DOM mode."),this._useWorker=!1),this._transferablesBroken=!1,this._localFileBlobs=null,this._localFileStrings=null,("html5"===this._exportType||"playable-ad"===this._exportType)&&"file"===location.protocol.substr(0,4)&&alert("Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)"),this.AddRuntimeComponentMessageHandler("runtime","cordova-fetch-local-file",(a)=>this._OnCordovaFetchLocalFile(a)),this.AddRuntimeComponentMessageHandler("runtime","create-job-worker",(a)=>this._OnCreateJobWorker(a)),"cordova"===this._exportType?document.addEventListener("deviceready",()=>this._Init(a)):this._Init(a)}Release(){this._CancelAnimationFrame(),this._messageChannelPort&&(this._messageChannelPort.onmessage=null,this._messageChannelPort=null),this._worker&&(this._worker.terminate(),this._worker=null),this._localRuntime&&(this._localRuntime.Release(),this._localRuntime=null),this._canvas&&(this._canvas.parentElement.removeChild(this._canvas),this._canvas=null)}GetCanvas(){return this._canvas}GetBaseURL(){return this._baseUrl}UsesWorker(){return this._useWorker}GetExportType(){return this._exportType}IsiOSCordova(){return e&&"cordova"===this._exportType}IsiOSWebView(){return e&&d(this._exportType)}async _Init(a){if("playable-ad"===this._exportType){this._localFileBlobs=self["c3_base64files"],this._localFileStrings={},await this._ConvertDataUrisToBlobs();for(let b=0,c=a.engineScripts.length;b<c;++b){const c=a.engineScripts[b].toLowerCase();this._localFileStrings.hasOwnProperty(c)?a.engineScripts[b]={isStringSrc:!0,str:this._localFileStrings[c]}:this._localFileBlobs.hasOwnProperty(c)&&(a.engineScripts[b]=URL.createObjectURL(this._localFileBlobs[c]))}}if(a.baseUrl)this._baseUrl=a.baseUrl;else{const a=location.origin;this._baseUrl=("null"===a?"file:///":a)+location.pathname;const b=this._baseUrl.lastIndexOf("/");-1!==b&&(this._baseUrl=this._baseUrl.substr(0,b+1))}if(a.workerScripts)for(const[b,c]of Object.entries(a.workerScripts))this._workerScriptBlobURLs[b]=URL.createObjectURL(c);const b=new MessageChannel;this._messageChannelPort=b.port1,this._messageChannelPort.onmessage=(a)=>this["_OnMessageFromRuntime"](a.data),window["c3_addPortMessageHandler"]&&window["c3_addPortMessageHandler"]((a)=>this._OnMessageFromDebugger(a)),this._jobScheduler=new self.JobSchedulerDOM(this),await this._jobScheduler.Init(),this.MaybeForceBodySize(),"object"==typeof window["StatusBar"]&&window["StatusBar"]["hide"](),"object"==typeof window["AndroidFullScreen"]&&window["AndroidFullScreen"]["immersiveMode"](),await this._TestTransferablesWork(),this._useWorker?await this._InitWorker(a,b.port2):await this._InitDOM(a,b.port2)}_GetWorkerURL(a){return this._workerScriptBlobURLs.hasOwnProperty(a)?this._workerScriptBlobURLs[a]:a.endsWith("/workermain.js")&&this._workerScriptBlobURLs.hasOwnProperty("workermain.js")?this._workerScriptBlobURLs["workermain.js"]:"playable-ad"===this._exportType&&this._localFileBlobs.hasOwnProperty(a.toLowerCase())?URL.createObjectURL(this._localFileBlobs[a.toLowerCase()]):a}async CreateWorker(a,b,c){if(a.startsWith("blob:"))return new Worker(a,c);if(this.IsiOSCordova()){const b=await this.CordovaFetchLocalFileAsArrayBuffer(this._scriptFolder+a),d=new Blob([b],{type:"application/javascript"});return new Worker(URL.createObjectURL(d),c)}const d=new URL(a,b),e=location.origin!==d.origin;if(e){const a=await fetch(d);if(!a.ok)throw new Error("failed to fetch worker script");const b=await a.blob();return new Worker(URL.createObjectURL(b),c)}return new Worker(d,c)}MaybeForceBodySize(){if(this.IsiOSWebView()){const a=document["documentElement"].style,b=document["body"].style,c=window.innerWidth<window.innerHeight,d=c?window["screen"]["width"]:window["screen"]["height"],e=c?window["screen"]["height"]:window["screen"]["width"];b["height"]=a["height"]=e+"px",b["width"]=a["width"]=d+"px"}}_GetCommonRuntimeOptions(a){return{"baseUrl":this._baseUrl,"windowInnerWidth":window.innerWidth,"windowInnerHeight":window.innerHeight,"devicePixelRatio":window.devicePixelRatio,"isFullscreen":f.IsDocumentFullscreen(),"projectData":a.projectData,"previewImageBlobs":window["cr_previewImageBlobs"]||this._localFileBlobs,"previewProjectFileBlobs":window["cr_previewProjectFileBlobs"],"exportType":a.exportType,"isDebug":-1<self.location.search.indexOf("debug"),"ife":!!self.ife,"jobScheduler":this._jobScheduler.GetPortData(),"supportedAudioFormats":g,"opusWasmScriptUrl":window["cr_opusWasmScriptUrl"]||this._scriptFolder+"opus.wasm.js","opusWasmBinaryUrl":window["cr_opusWasmBinaryUrl"]||this._scriptFolder+"opus.wasm.wasm","isiOSCordova":this.IsiOSCordova(),"isiOSWebView":this.IsiOSWebView(),"isFBInstantAvailable":"undefined"!=typeof self["FBInstant"]}}async _InitWorker(a,b){const c=this._GetWorkerURL(a.workerMainUrl);this._worker=await this.CreateWorker(c,this._baseUrl,{name:"Runtime"}),this._canvas=document.createElement("canvas"),this._canvas.style.display="none";const d=this._canvas["transferControlToOffscreen"]();document.body.appendChild(this._canvas),window["c3canvas"]=this._canvas,this._worker.postMessage(Object.assign(this._GetCommonRuntimeOptions(a),{"type":"init-runtime","isInWorker":!0,"messagePort":b,"canvas":d,"workerDependencyScripts":a.workerDependencyScripts||[],"engineScripts":a.engineScripts,"projectScripts":window.cr_allProjectScripts,"projectScriptsStatus":self["C3_ProjectScriptsStatus"]}),[b,d,...this._jobScheduler.GetPortTransferables()]),this._domHandlers=j.map((a)=>new a(this)),this._FindRuntimeDOMHandler(),self["c3_callFunction"]=(a,b)=>this._runtimeDomHandler._InvokeFunctionFromJS(a,b),"preview"===this._exportType&&(self["goToLastErrorScript"]=()=>this.PostToRuntimeComponent("runtime","go-to-last-error-script"))}async _InitDOM(b,c){this._canvas=document.createElement("canvas"),this._canvas.style.display="none",document.body.appendChild(this._canvas),window["c3canvas"]=this._canvas,this._domHandlers=j.map((a)=>new a(this)),this._FindRuntimeDOMHandler();const d=b.engineScripts.map((a)=>"string"==typeof a?new URL(a,this._baseUrl).toString():a);if(Array.isArray(b.workerDependencyScripts)&&d.unshift(...b.workerDependencyScripts),await Promise.all(d.map((b)=>a(b))),b.projectScripts&&0<b.projectScripts.length){const c=self["C3_ProjectScriptsStatus"];try{if(await Promise.all(b.projectScripts.map((b)=>a(b[1]))),Object.values(c).some((a)=>!a))return void self.setTimeout(()=>this._ReportProjectScriptError(c),100)}catch(a){return console.error("[Preview] Error loading project scripts: ",a),void self.setTimeout(()=>this._ReportProjectScriptError(c),100)}}if("preview"===this._exportType&&"object"!=typeof self.C3.ScriptsInEvents){return console.error("[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."),void alert("Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.")}const e=Object.assign(this._GetCommonRuntimeOptions(b),{"isInWorker":!1,"messagePort":c,"canvas":this._canvas,"runOnStartupFunctions":n});this._localRuntime=self["C3_CreateRuntime"](e),await self["C3_InitRuntime"](this._localRuntime,e)}_ReportProjectScriptError(a){const b=Object.entries(a).filter((a)=>!a[1]).map((a)=>a[0]),c=`Failed to load project script '${b[0]}'. Check all your JavaScript code has valid syntax.`;console.error("[Preview] "+c),alert(c)}async _OnCreateJobWorker(){const a=await this._jobScheduler._CreateJobWorker();return{"outputPort":a,"transferables":[a]}}_GetLocalRuntime(){if(this._useWorker)throw new Error("not available in worker mode");return this._localRuntime}PostToRuntimeComponent(a,b,c,d,e){this._messageChannelPort.postMessage({"type":"event","component":a,"handler":b,"dispatchOpts":d||null,"data":c,"responseId":null},this._transferablesBroken?void 0:e)}PostToRuntimeComponentAsync(a,b,c,d,e){const f=m++,g=new Promise((a,b)=>{l.set(f,{resolve:a,reject:b})});return this._messageChannelPort.postMessage({"type":"event","component":a,"handler":b,"dispatchOpts":d||null,"data":c,"responseId":f},this._transferablesBroken?void 0:e),g}["_OnMessageFromRuntime"](a){const b=a["type"];if("event"===b)this._OnEventFromRuntime(a);else if("result"===b)this._OnResultFromRuntime(a);else if("runtime-ready"===b)this._OnRuntimeReady();else if("alert"===b)alert(a["message"]);else throw new Error(`unknown message '${b}'`)}_OnEventFromRuntime(a){const b=a["component"],c=a["handler"],d=a["data"],e=a["responseId"],f=k.get(b);if(!f)return void console.warn(`[DOM] No event handlers for component '${b}'`);const g=f.get(c);if(!g)return void console.warn(`[DOM] No handler '${c}' for component '${b}'`);let h=null;try{h=g(d)}catch(a){return console.error(`Exception in '${b}' handler '${c}':`,a),void(null!==e&&this._PostResultToRuntime(e,!1,a.toString()))}null!==e&&(h&&h.then?h.then((a)=>this._PostResultToRuntime(e,!0,a)).catch((a)=>{console.error(`Rejection from '${b}' handler '${c}':`,a),this._PostResultToRuntime(e,!1,a.toString())}):this._PostResultToRuntime(e,!0,h))}_PostResultToRuntime(a,b,c){let d;c&&c["transferables"]&&(d=c["transferables"]),this._messageChannelPort.postMessage({"type":"result","responseId":a,"isOk":b,"result":c},d)}_OnResultFromRuntime(a){const b=a["responseId"],c=a["isOk"],d=a["result"],e=l.get(b);c?e.resolve(d):e.reject(d),l.delete(b)}AddRuntimeComponentMessageHandler(a,b,c){let d=k.get(a);if(d||(d=new Map,k.set(a,d)),d.has(b))throw new Error(`[DOM] Component '${a}' already has handler '${b}'`);d.set(b,c)}static AddDOMHandlerClass(a){if(j.includes(a))throw new Error("DOM handler already added");j.push(a)}_FindRuntimeDOMHandler(){for(const a of this._domHandlers)if("runtime"===a.GetComponentID())return void(this._runtimeDomHandler=a);throw new Error("cannot find runtime DOM handler")}_OnMessageFromDebugger(a){this.PostToRuntimeComponent("debugger","message",a)}_OnRuntimeReady(){for(const a of this._domHandlers)a.Attach()}static IsDocumentFullscreen(){return!!(document["fullscreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"])}async GetRemotePreviewStatusInfo(){return await this.PostToRuntimeComponentAsync("runtime","get-remote-preview-status-info")}_AddRAFCallback(a){this._rafCallbacks.push(a),this._RequestAnimationFrame()}_RemoveRAFCallback(a){const b=this._rafCallbacks.indexOf(a);if(-1===b)throw new Error("invalid callback");this._rafCallbacks.splice(b,1),this._rafCallbacks.length||this._CancelAnimationFrame()}_RequestAnimationFrame(){-1===this._rafId&&this._rafCallbacks.length&&(this._rafId=requestAnimationFrame(this._rafFunc))}_CancelAnimationFrame(){-1!==this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=-1)}_OnRAFCallback(){this._rafId=-1;for(const a of this._rafCallbacks)a();this._RequestAnimationFrame()}TryPlayMedia(a){this._runtimeDomHandler.TryPlayMedia(a)}RemovePendingPlay(a){this._runtimeDomHandler.RemovePendingPlay(a)}_PlayPendingMedia(){this._runtimeDomHandler._PlayPendingMedia()}SetSilent(a){this._runtimeDomHandler.SetSilent(a)}IsAudioFormatSupported(a){return!!g[a]}async _WasmDecodeWebMOpus(a){const b=await this.PostToRuntimeComponentAsync("runtime","opus-decode",{"arrayBuffer":a},null,[a]);return new Float32Array(b)}IsAbsoluteURL(a){return /^(?:[a-z]+:)?\/\//.test(a)||"data:"===a.substr(0,5)||"blob:"===a.substr(0,5)}IsRelativeURL(a){return!this.IsAbsoluteURL(a)}async _OnCordovaFetchLocalFile(a){const b=a["filename"];switch(a["as"]){case"text":return await this.CordovaFetchLocalFileAsText(b);case"buffer":return await this.CordovaFetchLocalFileAsArrayBuffer(b);default:throw new Error("unsupported type");}}_GetPermissionAPI(){const a=window["cordova"]&&window["cordova"]["plugins"]&&window["cordova"]["plugins"]["permissions"];if("object"!=typeof a)throw new Error("Permission API is not loaded");return a}_MapPermissionID(a,b){const c=a[b];if("string"!=typeof c)throw new Error("Invalid permission name");return c}_HasPermission(a){const b=this._GetPermissionAPI();return new Promise((c,d)=>b["checkPermission"](this._MapPermissionID(b,a),(a)=>c(!!a["hasPermission"]),d))}_RequestPermission(a){const b=this._GetPermissionAPI();return new Promise((c,d)=>b["requestPermission"](this._MapPermissionID(b,a),(a)=>c(!!a["hasPermission"]),d))}async RequestPermissions(a){if("cordova"!==this.GetExportType())return!0;if(this.IsiOSCordova())return!0;for(const b of a){const a=await this._HasPermission(b);if(a)continue;const c=await this._RequestPermission(b);if(!1===c)return!1}return!0}async RequirePermissions(...a){if(!1===(await this.RequestPermissions(a)))throw new Error("Permission not granted")}CordovaFetchLocalFile(a){const b=window["cordova"]["file"]["applicationDirectory"]+"www/"+a.toLowerCase();return new Promise((a,c)=>{window["resolveLocalFileSystemURL"](b,(b)=>{b["file"](a,c)},c)})}async CordovaFetchLocalFileAsText(a){const c=await this.CordovaFetchLocalFile(a);return await b(c)}_CordovaMaybeStartNextArrayBufferRead(){if(h.length&&!(i>=8)){i++;const a=h.shift();this._CordovaDoFetchLocalFileAsAsArrayBuffer(a.filename,a.successCallback,a.errorCallback)}}CordovaFetchLocalFileAsArrayBuffer(a){return new Promise((b,c)=>{h.push({filename:a,successCallback:(a)=>{i--,this._CordovaMaybeStartNextArrayBufferRead(),b(a)},errorCallback:(a)=>{i--,this._CordovaMaybeStartNextArrayBufferRead(),c(a)}}),this._CordovaMaybeStartNextArrayBufferRead()})}async _CordovaDoFetchLocalFileAsAsArrayBuffer(a,b,d){try{const d=await this.CordovaFetchLocalFile(a),e=await c(d);b(e)}catch(a){d(a)}}async _ConvertDataUrisToBlobs(){const a=[];for(const[b,c]of Object.entries(this._localFileBlobs))a.push(this._ConvertDataUriToBlobs(b,c));await Promise.all(a)}async _ConvertDataUriToBlobs(a,b){if("object"==typeof b)this._localFileBlobs[a]=new Blob([b["str"]],{"type":b["type"]}),this._localFileStrings[a]=b["str"];else{let c=await this._FetchDataUri(b);c||(c=this._DataURIToBinaryBlobSync(b)),this._localFileBlobs[a]=c}}async _FetchDataUri(a){try{const b=await fetch(a);return await b.blob()}catch(a){return console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.",a),null}}_DataURIToBinaryBlobSync(a){const b=this._ParseDataURI(a);return this._BinaryStringToBlob(b.data,b.mime_type)}_ParseDataURI(a){const b=a.indexOf(",");if(0>b)throw new URIError("expected comma in data: uri");const c=a.substring(5,b),d=a.substring(b+1),e=c.split(";"),f=e[0]||"",g=e[1],h=e[2];let i;return i="base64"===g||"base64"===h?atob(d):decodeURIComponent(d),{mime_type:f,data:i}}_BinaryStringToBlob(a,b){let c,d,e=a.length,f=e>>2,g=new Uint8Array(e),h=new Uint32Array(g.buffer,0,f);for(c=0,d=0;c<f;++c)h[c]=a.charCodeAt(d++)|a.charCodeAt(d++)<<8|a.charCodeAt(d++)<<16|a.charCodeAt(d++)<<24;for(let c=3&e;c--;)g[d]=a.charCodeAt(d),++d;return new Blob([g],{"type":b})}_TestTransferablesWork(){let a=null;const b=new Promise((b)=>a=b),c=new ArrayBuffer(1),d=new MessageChannel;return d.port2.onmessage=(b)=>{b.data&&b.data["arrayBuffer"]||(this._transferablesBroken=!0,console.warn("MessageChannel transfers determined to be broken. Disabling transferables.")),a()},d.port1.postMessage({"arrayBuffer":c},[c]),b}}}

"use strict";{function a(a){return a["sourceCapabilities"]&&a["sourceCapabilities"]["firesTouchEvents"]||a["originalEvent"]&&a["originalEvent"]["sourceCapabilities"]&&a["originalEvent"]["sourceCapabilities"]["firesTouchEvents"]}function b(a){return new Promise((b,c)=>{const d=document.createElement("link");d.onload=()=>b(d),d.onerror=(a)=>c(a),d.rel="stylesheet",d.href=a,document.head.appendChild(d)})}function c(a){return new Promise((b,c)=>{const d=new Image;d.onload=()=>b(d),d.onerror=(a)=>c(a),d.src=a})}async function d(a){const b=URL.createObjectURL(a);try{return await c(b)}finally{URL.revokeObjectURL(b)}}function e(a){return new Promise((b,c)=>{let d=new FileReader;d.onload=(a)=>b(a.target.result),d.onerror=(a)=>c(a),d.readAsText(a)})}async function f(a,b,c){if(!/firefox/i.test(navigator.userAgent))return await d(a);let f=await e(a);const g=new DOMParser,h=g.parseFromString(f,"image/svg+xml"),i=h.documentElement;if(i.hasAttribute("width")&&i.hasAttribute("height")){const b=i.getAttribute("width"),c=i.getAttribute("height");if(!b.includes("%")&&!c.includes("%"))return await d(a)}i.setAttribute("width",b+"px"),i.setAttribute("height",c+"px");const j=new XMLSerializer;return f=j.serializeToString(h),a=new Blob([f],{type:"image/svg+xml"}),await d(a)}function g(a){do{if(a.parentNode&&a.hasAttribute("contenteditable"))return!0;a=a.parentNode}while(a);return!1}function h(a){const b=a.target.tagName.toLowerCase();p.has(b)&&a.preventDefault()}function i(a){(a.metaKey||a.ctrlKey)&&a.preventDefault()}function j(){try{return window.parent&&window.parent.document.hasFocus()}catch(a){return!1}}function k(){const a=document.activeElement;if(!a)return!1;const b=a.tagName.toLowerCase(),c=new Set(["email","number","password","search","tel","text","url"]);return!("textarea"!==b)||("input"===b?c.has(a.type.toLowerCase()||"text"):g(a))}const l=new Map([["OSLeft","MetaLeft"],["OSRight","MetaRight"]]),m={"dispatchRuntimeEvent":!0,"dispatchUserScriptEvent":!0},n={"dispatchUserScriptEvent":!0},o={"dispatchRuntimeEvent":!0};const p=new Set(["canvas","body","html"]);self["C3_GetSvgImageSize"]=async function(a){const b=await d(a);if(0<b.width&&0<b.height)return[b.width,b.height];else{b.style.position="absolute",b.style.left="0px",b.style.top="0px",b.style.visibility="hidden",document.body.appendChild(b);const a=b.getBoundingClientRect();return document.body.removeChild(b),[a.width,a.height]}},self["C3_RasterSvgImageBlob"]=async function(a,b,c,d,e){const g=await f(a,b,c),h=document.createElement("canvas");h.width=d,h.height=e;const i=h.getContext("2d");return i.drawImage(g,0,0,b,c),h};let q=!1;document.addEventListener("pause",()=>q=!0),document.addEventListener("resume",()=>q=!1);const r=class extends DOMHandler{constructor(a){super(a,"runtime"),this._isFirstSizeUpdate=!0,this._simulatedResizeTimerId=-1,this._targetOrientation="any",this._attachedDeviceOrientationEvent=!1,this._attachedDeviceMotionEvent=!1,this._debugHighlightElem=null,this._pointerRawUpdateRateLimiter=null,this._lastPointerRawUpdateEvent=null,a.AddRuntimeComponentMessageHandler("canvas","update-size",(a)=>this._OnUpdateCanvasSize(a)),a.AddRuntimeComponentMessageHandler("runtime","invoke-download",(a)=>this._OnInvokeDownload(a)),a.AddRuntimeComponentMessageHandler("runtime","raster-svg-image",(a)=>this._OnRasterSvgImage(a)),a.AddRuntimeComponentMessageHandler("runtime","get-svg-image-size",(a)=>this._OnGetSvgImageSize(a)),a.AddRuntimeComponentMessageHandler("runtime","set-target-orientation",(a)=>this._OnSetTargetOrientation(a)),a.AddRuntimeComponentMessageHandler("runtime","register-sw",()=>this._OnRegisterSW()),a.AddRuntimeComponentMessageHandler("runtime","post-to-debugger",(a)=>this._OnPostToDebugger(a)),a.AddRuntimeComponentMessageHandler("runtime","go-to-script",(a)=>this._OnPostToDebugger(a)),a.AddRuntimeComponentMessageHandler("runtime","before-start-ticking",()=>this._OnBeforeStartTicking()),a.AddRuntimeComponentMessageHandler("runtime","debug-highlight",(a)=>this._OnDebugHighlight(a)),a.AddRuntimeComponentMessageHandler("runtime","enable-device-orientation",()=>this._AttachDeviceOrientationEvent()),a.AddRuntimeComponentMessageHandler("runtime","enable-device-motion",()=>this._AttachDeviceMotionEvent()),a.AddRuntimeComponentMessageHandler("runtime","add-stylesheet",(a)=>this._OnAddStylesheet(a));const b=new Set(["input","textarea","datalist"]);window.addEventListener("contextmenu",(a)=>{const c=a.target,d=c.tagName.toLowerCase();b.has(d)||g(c)||a.preventDefault()});const c=a.GetCanvas();window.addEventListener("selectstart",h),window.addEventListener("gesturehold",h),c.addEventListener("selectstart",h),c.addEventListener("gesturehold",h),window.addEventListener("touchstart",h,{"passive":!1}),"undefined"==typeof PointerEvent?c.addEventListener("touchstart",h):(window.addEventListener("pointerdown",h,{"passive":!1}),c.addEventListener("pointerdown",h)),this._mousePointerLastButtons=0,window.addEventListener("mousedown",(a)=>{1===a.button&&a.preventDefault()}),window.addEventListener("mousewheel",i,{"passive":!1}),window.addEventListener("wheel",i,{"passive":!1}),window.addEventListener("resize",()=>this._OnWindowResize()),a.IsiOSWebView()&&window.addEventListener("focusout",()=>{k()||(document.scrollingElement.scrollTop=0)}),this._mediaPendingPlay=new Set,this._mediaRemovedPendingPlay=new WeakSet,this._isSilent=!1}_OnBeforeStartTicking(){return"cordova"===this._iRuntime.GetExportType()?(document.addEventListener("pause",()=>this._OnVisibilityChange(!0)),document.addEventListener("resume",()=>this._OnVisibilityChange(!1))):document.addEventListener("visibilitychange",()=>this._OnVisibilityChange(document.hidden)),{"isSuspended":!!(document.hidden||q)}}Attach(){window.addEventListener("focus",()=>this._PostRuntimeEvent("window-focus")),window.addEventListener("blur",()=>{this._PostRuntimeEvent("window-blur",{"parentHasFocus":j()}),this._mousePointerLastButtons=0}),window.addEventListener("fullscreenchange",()=>this._OnFullscreenChange()),window.addEventListener("webkitfullscreenchange",()=>this._OnFullscreenChange()),window.addEventListener("mozfullscreenchange",()=>this._OnFullscreenChange()),window.addEventListener("fullscreenerror",(a)=>this._OnFullscreenError(a)),window.addEventListener("webkitfullscreenerror",(a)=>this._OnFullscreenError(a)),window.addEventListener("mozfullscreenerror",(a)=>this._OnFullscreenError(a)),window.addEventListener("keydown",(a)=>this._OnKeyEvent("keydown",a)),window.addEventListener("keyup",(a)=>this._OnKeyEvent("keyup",a)),window.addEventListener("dblclick",(a)=>this._OnMouseEvent("dblclick",a,m)),window.addEventListener("wheel",(a)=>this._OnMouseWheelEvent("wheel",a)),"undefined"==typeof PointerEvent?(window.addEventListener("mousedown",(a)=>this._OnMouseEventAsPointer("pointerdown",a)),window.addEventListener("mousemove",(a)=>this._OnMouseEventAsPointer("pointermove",a)),window.addEventListener("mouseup",(a)=>this._OnMouseEventAsPointer("pointerup",a)),window.addEventListener("touchstart",(a)=>this._OnTouchEvent("pointerdown",a)),window.addEventListener("touchmove",(a)=>this._OnTouchEvent("pointermove",a)),window.addEventListener("touchend",(a)=>this._OnTouchEvent("pointerup",a)),window.addEventListener("touchcancel",(a)=>this._OnTouchEvent("pointercancel",a))):(window.addEventListener("pointerdown",(a)=>this._OnPointerEvent("pointerdown",a)),this._iRuntime.UsesWorker()&&"undefined"!=typeof window["onpointerrawupdate"]?(this._pointerRawUpdateRateLimiter=new RateLimiter(()=>this._DoSendPointerRawUpdate(),5),this._pointerRawUpdateRateLimiter.SetCanRunImmediate(!0),window.addEventListener("pointerrawupdate",(a)=>this._OnPointerRawUpdate(a))):window.addEventListener("pointermove",(a)=>this._OnPointerEvent("pointermove",a)),window.addEventListener("pointerup",(a)=>this._OnPointerEvent("pointerup",a)),window.addEventListener("pointercancel",(a)=>this._OnPointerEvent("pointercancel",a)));const a=()=>this._PlayPendingMedia();window.addEventListener("pointerup",a,!0),window.addEventListener("touchend",a,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",a,!0),window.addEventListener("gamepadconnected",a,!0)}_PostRuntimeEvent(a,b){this.PostToRuntime(a,b||null,o)}_GetWindowInnerWidth(){return Math.max(window.innerWidth,1)}_GetWindowInnerHeight(){return Math.max(window.innerHeight,1)}_OnWindowResize(){const a=this._GetWindowInnerWidth(),b=this._GetWindowInnerHeight();this._PostRuntimeEvent("window-resize",{"innerWidth":a,"innerHeight":b,"devicePixelRatio":window.devicePixelRatio}),this._iRuntime.IsiOSWebView()&&(-1!==this._simulatedResizeTimerId&&clearTimeout(this._simulatedResizeTimerId),this._OnSimulatedResize(a,b,0))}_ScheduleSimulatedResize(a,b,c){-1!==this._simulatedResizeTimerId&&clearTimeout(this._simulatedResizeTimerId),this._simulatedResizeTimerId=setTimeout(()=>this._OnSimulatedResize(a,b,c),48)}_OnSimulatedResize(a,b,c){const d=this._GetWindowInnerWidth(),e=this._GetWindowInnerHeight();this._simulatedResizeTimerId=-1,d!=a||e!=b?this._PostRuntimeEvent("window-resize",{"innerWidth":d,"innerHeight":e,"devicePixelRatio":window.devicePixelRatio}):10>c&&this._ScheduleSimulatedResize(d,e,c+1)}_OnSetTargetOrientation(a){this._targetOrientation=a["targetOrientation"]}_TrySetTargetOrientation(){const a=this._targetOrientation;if(screen["orientation"]&&screen["orientation"]["lock"])screen["orientation"]["lock"](a).catch((a)=>console.warn("[Construct 3] Failed to lock orientation: ",a));else try{let b=!1;screen["lockOrientation"]?b=screen["lockOrientation"](a):screen["webkitLockOrientation"]?b=screen["webkitLockOrientation"](a):screen["mozLockOrientation"]?b=screen["mozLockOrientation"](a):screen["msLockOrientation"]&&(b=screen["msLockOrientation"](a)),b||console.warn("[Construct 3] Failed to lock orientation")}catch(a){console.warn("[Construct 3] Failed to lock orientation: ",a)}}_OnFullscreenChange(){const a=RuntimeInterface.IsDocumentFullscreen();a&&"any"!==this._targetOrientation&&this._TrySetTargetOrientation(),this.PostToRuntime("fullscreenchange",{"isFullscreen":a,"innerWidth":this._GetWindowInnerWidth(),"innerHeight":this._GetWindowInnerHeight()})}_OnFullscreenError(a){console.warn("[Construct 3] Fullscreen request failed: ",a),this.PostToRuntime("fullscreenerror",{"isFullscreen":RuntimeInterface.IsDocumentFullscreen(),"innerWidth":this._GetWindowInnerWidth(),"innerHeight":this._GetWindowInnerHeight()})}_OnVisibilityChange(a){a?this._iRuntime._CancelAnimationFrame():this._iRuntime._RequestAnimationFrame(),this.PostToRuntime("visibilitychange",{"hidden":a})}_OnKeyEvent(a,b){"Backspace"===b.key&&h(b);const c=l.get(b.code)||b.code;this._PostToRuntimeMaybeSync(a,{"code":c,"key":b.key,"which":b.which,"repeat":b.repeat,"altKey":b.altKey,"ctrlKey":b.ctrlKey,"metaKey":b.metaKey,"shiftKey":b.shiftKey,"timeStamp":b.timeStamp},m)}_OnMouseWheelEvent(a,b){this.PostToRuntime(a,{"clientX":b.clientX,"clientY":b.clientY,"deltaX":b.deltaX,"deltaY":b.deltaY,"deltaZ":b.deltaZ,"deltaMode":b.deltaMode,"timeStamp":b.timeStamp},m)}_OnMouseEvent(b,c,d){a(c)||("mousedown"===b&&window!==window.top&&window.focus(),this._PostToRuntimeMaybeSync(b,{"button":c.button,"buttons":c.buttons,"clientX":c.clientX,"clientY":c.clientY,"timeStamp":c.timeStamp},d))}_OnMouseEventAsPointer(b,c){if(a(c))return;"pointerdown"===b&&window!==window.top&&window.focus();const d=this._mousePointerLastButtons;"pointerdown"===b&&0!==d?b="pointermove":"pointerup"==b&&0!==c.buttons&&(b="pointermove"),this._PostToRuntimeMaybeSync(b,{"pointerId":1,"pointerType":"mouse","button":c.button,"buttons":c.buttons,"lastButtons":d,"clientX":c.clientX,"clientY":c.clientY,"width":0,"height":0,"pressure":0,"tangentialPressure":0,"tiltX":0,"tiltY":0,"twist":0,"timeStamp":c.timeStamp},m),this._mousePointerLastButtons=c.buttons,this._OnMouseEvent(c.type,c,n)}_OnPointerEvent(a,b){"pointerdown"===a&&window!==window.top&&window.focus(),this._pointerRawUpdateRateLimiter&&"pointermove"!==a&&this._pointerRawUpdateRateLimiter.Reset();let c=0;if("mouse"===b.pointerType&&(c=this._mousePointerLastButtons),this._PostToRuntimeMaybeSync(a,{"pointerId":b.pointerId,"pointerType":b.pointerType,"button":b.button,"buttons":b.buttons,"lastButtons":c,"clientX":b.clientX,"clientY":b.clientY,"width":b.width||0,"height":b.height||0,"pressure":b.pressure||0,"tangentialPressure":b["tangentialPressure"]||0,"tiltX":b.tiltX||0,"tiltY":b.tiltY||0,"twist":b["twist"]||0,"timeStamp":b.timeStamp},m),"mouse"===b.pointerType){let c="mousemove";"pointerdown"===a?c="mousedown":"pointerup"==a&&(c="pointerup"),this._OnMouseEvent(c,b,n),this._mousePointerLastButtons=b.buttons}}_OnPointerRawUpdate(a){this._lastPointerRawUpdateEvent=a,this._pointerRawUpdateRateLimiter.Call()}_DoSendPointerRawUpdate(){this._OnPointerEvent("pointermove",this._lastPointerRawUpdateEvent),this._lastPointerRawUpdateEvent=null}_OnTouchEvent(a,b){"pointerdown"===a&&window!==window.top&&window.focus();for(let c=0,d=b.changedTouches.length;c<d;++c){const d=b.changedTouches[c];this._PostToRuntimeMaybeSync(a,{"pointerId":d.identifier,"pointerType":"touch","button":0,"buttons":0,"lastButtons":0,"clientX":d.clientX,"clientY":d.clientY,"width":2*(d["radiusX"]||d["webkitRadiusX"]||0),"height":2*(d["radiusY"]||d["webkitRadiusY"]||0),"pressure":d["force"]||d["webkitForce"]||0,"tangentialPressure":0,"tiltX":0,"tiltY":0,"twist":d["rotationAngle"]||0,"timeStamp":b.timeStamp},m)}}_AttachDeviceOrientationEvent(){this._attachedDeviceOrientationEvent||(this._attachedDeviceOrientationEvent=!0,window.addEventListener("deviceorientation",(a)=>this._OnDeviceOrientation(a)))}_AttachDeviceMotionEvent(){this._attachedDeviceMotionEvent||(this._attachedDeviceMotionEvent=!0,window.addEventListener("devicemotion",(a)=>this._OnDeviceMotion(a)))}_OnDeviceOrientation(a){this.PostToRuntime("deviceorientation",{"alpha":a["alpha"]||0,"beta":a["beta"]||0,"gamma":a["gamma"]||0,"timeStamp":a.timeStamp},m)}_OnDeviceMotion(a){let b=null;const c=a["acceleration"];c&&(b={"x":c["x"]||0,"y":c["y"]||0,"z":c["z"]||0});let d=null;const e=a["accelerationIncludingGravity"];e&&(d={"x":e["x"]||0,"y":e["y"]||0,"z":e["z"]||0});let f=null;const g=a["rotationRate"];g&&(f={"alpha":g["alpha"]||0,"beta":g["beta"]||0,"gamma":g["gamma"]||0}),this.PostToRuntime("devicemotion",{"acceleration":b,"accelerationIncludingGravity":d,"rotationRate":f,"interval":a["interval"],"timeStamp":a.timeStamp},m)}_OnUpdateCanvasSize(a){const b=this.GetRuntimeInterface(),c=b.GetCanvas();c.style.width=a["styleWidth"]+"px",c.style.height=a["styleHeight"]+"px",c.style.marginLeft=a["marginLeft"]+"px",c.style.marginTop=a["marginTop"]+"px",b.MaybeForceBodySize(),this._isFirstSizeUpdate&&(c.style.display="",this._isFirstSizeUpdate=!1)}_OnInvokeDownload(b){const c=b["url"],d=b["filename"],e=document.createElement("a"),a=document.body;e.textContent=d,e.href=c,e.download=d,a.appendChild(e),e.click(),a.removeChild(e)}async _OnRasterSvgImage(a){const b=a["blob"],c=a["imageWidth"],d=a["imageHeight"],e=a["surfaceWidth"],f=a["surfaceHeight"],g=a["imageBitmapOpts"],h=await self["C3_RasterSvgImageBlob"](b,c,d,e,f);let i;return i=g?await createImageBitmap(h,g):await createImageBitmap(h),{"imageBitmap":i,"transferables":[i]}}async _OnGetSvgImageSize(a){return await self["C3_GetSvgImageSize"](a["blob"])}async _OnAddStylesheet(a){await b(a["url"])}_PlayPendingMedia(){const a=[...this._mediaPendingPlay];if(this._mediaPendingPlay.clear(),!this._isSilent)for(const b of a){const a=b.play();a&&a.catch(()=>{this._mediaRemovedPendingPlay.has(b)||this._mediaPendingPlay.add(b)})}}TryPlayMedia(a){if("function"!=typeof a.play)throw new Error("missing play function");this._mediaRemovedPendingPlay.delete(a);let b;try{b=a.play()}catch(b){return void this._mediaPendingPlay.add(a)}b&&b.catch(()=>{this._mediaRemovedPendingPlay.has(a)||this._mediaPendingPlay.add(a)})}RemovePendingPlay(a){this._mediaPendingPlay.delete(a),this._mediaRemovedPendingPlay.add(a)}SetSilent(a){this._isSilent=!!a}_OnDebugHighlight(a){const b=a["show"];if(!b)return void(this._debugHighlightElem&&(this._debugHighlightElem.style.display="none"));this._debugHighlightElem||(this._debugHighlightElem=document.createElement("div"),this._debugHighlightElem.id="inspectOutline",document.body.appendChild(this._debugHighlightElem));const c=this._debugHighlightElem;c.style.display="",c.style.left=a["left"]-1+"px",c.style.top=a["top"]-1+"px",c.style.width=a["width"]+2+"px",c.style.height=a["height"]+2+"px",c.textContent=a["name"]}_OnRegisterSW(){window["C3_RegisterSW"]&&window["C3_RegisterSW"]()}_OnPostToDebugger(a){window["c3_postToMessagePort"]&&(a["from"]="runtime",window["c3_postToMessagePort"](a))}_InvokeFunctionFromJS(a,b){return this.PostToRuntimeAsync("js-invoke-function",{"name":a,"params":b})}};RuntimeInterface.AddDOMHandlerClass(r)}

"use strict";{const a=document.currentScript.src;self.JobSchedulerDOM=class{constructor(b){this._runtimeInterface=b,this._baseUrl=a?a.substr(0,a.lastIndexOf("/")+1):b.GetBaseURL(),this._maxNumWorkers=Math.min(navigator.hardwareConcurrency||2,16),this._dispatchWorker=null,this._jobWorkers=[],this._inputPort=null,this._outputPort=null}async Init(){if(this._hasInitialised)throw new Error("already initialised");this._hasInitialised=!0;const a=this._runtimeInterface._GetWorkerURL("dispatchworker.js");this._dispatchWorker=await this._runtimeInterface.CreateWorker(a,this._baseUrl,{name:"DispatchWorker"});const b=new MessageChannel;this._inputPort=b.port1,this._dispatchWorker.postMessage({"type":"_init","in-port":b.port2},[b.port2]),this._outputPort=await this._CreateJobWorker()}async _CreateJobWorker(){const a=this._jobWorkers.length,b=this._runtimeInterface._GetWorkerURL("jobworker.js"),c=await this._runtimeInterface.CreateWorker(b,this._baseUrl,{name:"JobWorker"+a}),d=new MessageChannel,e=new MessageChannel;return this._dispatchWorker.postMessage({"type":"_addJobWorker","port":d.port1},[d.port1]),c.postMessage({"type":"init","number":a,"dispatch-port":d.port2,"output-port":e.port2},[d.port2,e.port2]),this._jobWorkers.push(c),e.port1}GetPortData(){return{"inputPort":this._inputPort,"outputPort":this._outputPort,"maxNumWorkers":this._maxNumWorkers}}GetPortTransferables(){return[this._inputPort,this._outputPort]}}}

"use strict";if(window["C3_IsSupported"]){const a=true,b="undefined"!=typeof OffscreenCanvas;window["c3_runtimeInterface"]=new RuntimeInterface({useWorker:a&&b,workerMainUrl:"workermain.js",engineScripts:["scripts/c3runtime.js"],scriptFolder:"scripts/",workerDependencyScripts:[],exportType:"html5"})}