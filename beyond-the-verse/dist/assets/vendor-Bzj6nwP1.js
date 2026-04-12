function TI(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wT={exports:{}},ch={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var SI=Symbol.for("react.transitional.element"),AI=Symbol.for("react.fragment");function bT(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var r in e)r!=="key"&&(n[r]=e[r])}else n=e;return e=n.ref,{$$typeof:SI,type:t,key:i,ref:e!==void 0?e:null,props:n}}ch.Fragment=AI;ch.jsx=bT;ch.jsxs=bT;wT.exports=ch;var m4=wT.exports,RT={exports:{}},re={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zm=Symbol.for("react.transitional.element"),wI=Symbol.for("react.portal"),bI=Symbol.for("react.fragment"),RI=Symbol.for("react.strict_mode"),II=Symbol.for("react.profiler"),CI=Symbol.for("react.consumer"),DI=Symbol.for("react.context"),NI=Symbol.for("react.forward_ref"),OI=Symbol.for("react.suspense"),MI=Symbol.for("react.memo"),IT=Symbol.for("react.lazy"),VI=Symbol.for("react.activity"),e_=Symbol.iterator;function kI(t){return t===null||typeof t!="object"?null:(t=e_&&t[e_]||t["@@iterator"],typeof t=="function"?t:null)}var CT={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},DT=Object.assign,NT={};function Oa(t,e,n){this.props=t,this.context=e,this.refs=NT,this.updater=n||CT}Oa.prototype.isReactComponent={};Oa.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Oa.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function OT(){}OT.prototype=Oa.prototype;function ep(t,e,n){this.props=t,this.context=e,this.refs=NT,this.updater=n||CT}var tp=ep.prototype=new OT;tp.constructor=ep;DT(tp,Oa.prototype);tp.isPureReactComponent=!0;var t_=Array.isArray;function Dd(){}var Be={H:null,A:null,T:null,S:null},MT=Object.prototype.hasOwnProperty;function np(t,e,n){var i=n.ref;return{$$typeof:Zm,type:t,key:e,ref:i!==void 0?i:null,props:n}}function PI(t,e){return np(t.type,e,t.props)}function ip(t){return typeof t=="object"&&t!==null&&t.$$typeof===Zm}function LI(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var n_=/\/+/g;function Af(t,e){return typeof t=="object"&&t!==null&&t.key!=null?LI(""+t.key):e.toString(36)}function UI(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Dd,Dd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Ps(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"bigint":case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Zm:case wI:a=!0;break;case IT:return a=t._init,Ps(a(t._payload),e,n,i,r)}}if(a)return r=r(t),a=i===""?"."+Af(t,0):i,t_(r)?(n="",a!=null&&(n=a.replace(n_,"$&/")+"/"),Ps(r,e,n,"",function(c){return c})):r!=null&&(ip(r)&&(r=PI(r,n+(r.key==null||t&&t.key===r.key?"":(""+r.key).replace(n_,"$&/")+"/")+a)),e.push(r)),1;a=0;var l=i===""?".":i+":";if(t_(t))for(var u=0;u<t.length;u++)i=t[u],s=l+Af(i,u),a+=Ps(i,e,n,s,r);else if(u=kI(t),typeof u=="function")for(t=u.call(t),u=0;!(i=t.next()).done;)i=i.value,s=l+Af(i,u++),a+=Ps(i,e,n,s,r);else if(s==="object"){if(typeof t.then=="function")return Ps(UI(t),e,n,i,r);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return a}function mu(t,e,n){if(t==null)return t;var i=[],r=0;return Ps(t,i,"","",function(s){return e.call(n,s,r++)}),i}function xI(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var i_=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}},zI={map:mu,forEach:function(t,e,n){mu(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return mu(t,function(){e++}),e},toArray:function(t){return mu(t,function(e){return e})||[]},only:function(t){if(!ip(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Activity=VI;re.Children=zI;re.Component=Oa;re.Fragment=bI;re.Profiler=II;re.PureComponent=ep;re.StrictMode=RI;re.Suspense=OI;re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Be;re.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Be.H.useMemoCache(t)}};re.cache=function(t){return function(){return t.apply(null,arguments)}};re.cacheSignal=function(){return null};re.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=DT({},t.props),r=t.key;if(e!=null)for(s in e.key!==void 0&&(r=""+e.key),e)!MT.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var a=Array(s),l=0;l<s;l++)a[l]=arguments[l+2];i.children=a}return np(t.type,r,i)};re.createContext=function(t){return t={$$typeof:DI,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:CI,_context:t},t};re.createElement=function(t,e,n){var i,r={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)MT.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return np(t,s,r)};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:NI,render:t}};re.isValidElement=ip;re.lazy=function(t){return{$$typeof:IT,_payload:{_status:-1,_result:t},_init:xI}};re.memo=function(t,e){return{$$typeof:MI,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=Be.T,n={};Be.T=n;try{var i=t(),r=Be.S;r!==null&&r(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Dd,i_)}catch(s){i_(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),Be.T=e}};re.unstable_useCacheRefresh=function(){return Be.H.useCacheRefresh()};re.use=function(t){return Be.H.use(t)};re.useActionState=function(t,e,n){return Be.H.useActionState(t,e,n)};re.useCallback=function(t,e){return Be.H.useCallback(t,e)};re.useContext=function(t){return Be.H.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t,e){return Be.H.useDeferredValue(t,e)};re.useEffect=function(t,e){return Be.H.useEffect(t,e)};re.useEffectEvent=function(t){return Be.H.useEffectEvent(t)};re.useId=function(){return Be.H.useId()};re.useImperativeHandle=function(t,e,n){return Be.H.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return Be.H.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return Be.H.useLayoutEffect(t,e)};re.useMemo=function(t,e){return Be.H.useMemo(t,e)};re.useOptimistic=function(t,e){return Be.H.useOptimistic(t,e)};re.useReducer=function(t,e,n){return Be.H.useReducer(t,e,n)};re.useRef=function(t){return Be.H.useRef(t)};re.useState=function(t){return Be.H.useState(t)};re.useSyncExternalStore=function(t,e,n){return Be.H.useSyncExternalStore(t,e,n)};re.useTransition=function(){return Be.H.useTransition()};re.version="19.2.4";RT.exports=re;var L=RT.exports;const p4=TI(L);var VT={exports:{}},hh={},kT={exports:{}},PT={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(j,ae){var te=j.length;j.push(ae);e:for(;0<te;){var be=te-1>>>1,k=j[be];if(0<r(k,ae))j[be]=ae,j[te]=k,te=be;else break e}}function n(j){return j.length===0?null:j[0]}function i(j){if(j.length===0)return null;var ae=j[0],te=j.pop();if(te!==ae){j[0]=te;e:for(var be=0,k=j.length,C=k>>>1;be<C;){var K=2*(be+1)-1,$=j[K],Q=K+1,ee=j[Q];if(0>r($,te))Q<k&&0>r(ee,$)?(j[be]=ee,j[Q]=te,be=Q):(j[be]=$,j[K]=te,be=K);else if(Q<k&&0>r(ee,te))j[be]=ee,j[Q]=te,be=Q;else break e}}return ae}function r(j,ae){var te=j.sortIndex-ae.sortIndex;return te!==0?te:j.id-ae.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var u=[],c=[],f=1,m=null,p=3,y=!1,I=!1,N=!1,D=!1,v=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;function M(j){for(var ae=n(c);ae!==null;){if(ae.callback===null)i(c);else if(ae.startTime<=j)i(c),ae.sortIndex=ae.expirationTime,e(u,ae);else break;ae=n(c)}}function B(j){if(N=!1,M(j),!I)if(n(u)!==null)I=!0,F||(F=!0,O());else{var ae=n(c);ae!==null&&He(B,ae.startTime-j)}}var F=!1,T=-1,_=5,S=-1;function b(){return D?!0:!(t.unstable_now()-S<_)}function R(){if(D=!1,F){var j=t.unstable_now();S=j;var ae=!0;try{e:{I=!1,N&&(N=!1,E(T),T=-1),y=!0;var te=p;try{t:{for(M(j),m=n(u);m!==null&&!(m.expirationTime>j&&b());){var be=m.callback;if(typeof be=="function"){m.callback=null,p=m.priorityLevel;var k=be(m.expirationTime<=j);if(j=t.unstable_now(),typeof k=="function"){m.callback=k,M(j),ae=!0;break t}m===n(u)&&i(u),M(j)}else i(u);m=n(u)}if(m!==null)ae=!0;else{var C=n(c);C!==null&&He(B,C.startTime-j),ae=!1}}break e}finally{m=null,p=te,y=!1}ae=void 0}}finally{ae?O():F=!1}}}var O;if(typeof A=="function")O=function(){A(R)};else if(typeof MessageChannel<"u"){var w=new MessageChannel,$e=w.port2;w.port1.onmessage=R,O=function(){$e.postMessage(null)}}else O=function(){v(R,0)};function He(j,ae){T=v(function(){j(t.unstable_now())},ae)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(j){j.callback=null},t.unstable_forceFrameRate=function(j){0>j||125<j||(_=0<j?Math.floor(1e3/j):5)},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_next=function(j){switch(p){case 1:case 2:case 3:var ae=3;break;default:ae=p}var te=p;p=ae;try{return j()}finally{p=te}},t.unstable_requestPaint=function(){D=!0},t.unstable_runWithPriority=function(j,ae){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var te=p;p=j;try{return ae()}finally{p=te}},t.unstable_scheduleCallback=function(j,ae,te){var be=t.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?be+te:be):te=be,j){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=te+k,j={id:f++,callback:ae,priorityLevel:j,startTime:te,expirationTime:k,sortIndex:-1},te>be?(j.sortIndex=te,e(c,j),n(u)===null&&j===n(c)&&(N?(E(T),T=-1):N=!0,He(B,te-be))):(j.sortIndex=k,e(u,j),I||y||(I=!0,F||(F=!0,O()))),j},t.unstable_shouldYield=b,t.unstable_wrapCallback=function(j){var ae=p;return function(){var te=p;p=ae;try{return j.apply(this,arguments)}finally{p=te}}}})(PT);kT.exports=PT;var BI=kT.exports,LT={exports:{}},qt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qI=L;function UT(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Fi(){}var Ut={d:{f:Fi,r:function(){throw Error(UT(522))},D:Fi,C:Fi,L:Fi,m:Fi,X:Fi,S:Fi,M:Fi},p:0,findDOMNode:null},HI=Symbol.for("react.portal");function FI(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:HI,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var Vo=qI.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function fh(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}qt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ut;qt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(UT(299));return FI(t,e,null,n)};qt.flushSync=function(t){var e=Vo.T,n=Ut.p;try{if(Vo.T=null,Ut.p=2,t)return t()}finally{Vo.T=e,Ut.p=n,Ut.d.f()}};qt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,Ut.d.C(t,e))};qt.prefetchDNS=function(t){typeof t=="string"&&Ut.d.D(t)};qt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=fh(n,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?Ut.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:r,fetchPriority:s}):n==="script"&&Ut.d.X(t,{crossOrigin:i,integrity:r,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};qt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=fh(e.as,e.crossOrigin);Ut.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&Ut.d.M(t)};qt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=fh(n,e.crossOrigin);Ut.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};qt.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=fh(e.as,e.crossOrigin);Ut.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else Ut.d.m(t)};qt.requestFormReset=function(t){Ut.d.r(t)};qt.unstable_batchedUpdates=function(t,e){return t(e)};qt.useFormState=function(t,e,n){return Vo.H.useFormState(t,e,n)};qt.useFormStatus=function(){return Vo.H.useHostTransitionStatus()};qt.version="19.2.4";function xT(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xT)}catch{}}xT(),LT.exports=qt;var jI=LT.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dt=BI,zT=L,GI=jI;function x(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function BT(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Al(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function qT(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function HT(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function r_(t){if(Al(t)!==t)throw Error(x(188))}function KI(t){var e=t.alternate;if(!e){if(e=Al(t),e===null)throw Error(x(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return r_(r),t;if(s===i)return r_(r),e;s=s.sibling}throw Error(x(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,l=r.child;l;){if(l===n){a=!0,n=r,i=s;break}if(l===i){a=!0,i=r,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,i=r;break}if(l===i){a=!0,i=s,n=r;break}l=l.sibling}if(!a)throw Error(x(189))}}if(n.alternate!==i)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?t:e}function FT(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=FT(t),e!==null)return e;t=t.sibling}return null}var qe=Object.assign,YI=Symbol.for("react.element"),pu=Symbol.for("react.transitional.element"),So=Symbol.for("react.portal"),Hs=Symbol.for("react.fragment"),jT=Symbol.for("react.strict_mode"),Nd=Symbol.for("react.profiler"),GT=Symbol.for("react.consumer"),fi=Symbol.for("react.context"),rp=Symbol.for("react.forward_ref"),Od=Symbol.for("react.suspense"),Md=Symbol.for("react.suspense_list"),sp=Symbol.for("react.memo"),Gi=Symbol.for("react.lazy"),Vd=Symbol.for("react.activity"),$I=Symbol.for("react.memo_cache_sentinel"),s_=Symbol.iterator;function fo(t){return t===null||typeof t!="object"?null:(t=s_&&t[s_]||t["@@iterator"],typeof t=="function"?t:null)}var QI=Symbol.for("react.client.reference");function kd(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===QI?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Hs:return"Fragment";case Nd:return"Profiler";case jT:return"StrictMode";case Od:return"Suspense";case Md:return"SuspenseList";case Vd:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case So:return"Portal";case fi:return t.displayName||"Context";case GT:return(t._context.displayName||"Context")+".Consumer";case rp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case sp:return e=t.displayName||null,e!==null?e:kd(t.type)||"Memo";case Gi:e=t._payload,t=t._init;try{return kd(t(e))}catch{}}return null}var Ao=Array.isArray,Z=zT.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ee=GI.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xr={pending:!1,data:null,method:null,action:null},Pd=[],Fs=-1;function ti(t){return{current:t}}function _t(t){0>Fs||(t.current=Pd[Fs],Pd[Fs]=null,Fs--)}function Ve(t,e){Fs++,Pd[Fs]=t.current,t.current=e}var Gn=ti(null),Jo=ti(null),or=ti(null),hc=ti(null);function fc(t,e){switch(Ve(or,e),Ve(Jo,t),Ve(Gn,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?hv(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=hv(e),t=hA(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}_t(Gn),Ve(Gn,t)}function da(){_t(Gn),_t(Jo),_t(or)}function Ld(t){t.memoizedState!==null&&Ve(hc,t);var e=Gn.current,n=hA(e,t.type);e!==n&&(Ve(Jo,t),Ve(Gn,n))}function dc(t){Jo.current===t&&(_t(Gn),_t(Jo)),hc.current===t&&(_t(hc),ul._currentValue=Xr)}var wf,a_;function Fr(t){if(wf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);wf=e&&e[1]||"",a_=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+wf+t+a_}var bf=!1;function Rf(t,e){if(!t||bf)return"";bf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(y){var p=y}Reflect.construct(t,[],m)}else{try{m.call()}catch(y){p=y}t.call(m.prototype)}}else{try{throw Error()}catch(y){p=y}(m=t())&&typeof m.catch=="function"&&m.catch(function(){})}}catch(y){if(y&&p&&typeof y.stack=="string")return[y.stack,p.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),a=s[0],l=s[1];if(a&&l){var u=a.split(`
`),c=l.split(`
`);for(r=i=0;i<u.length&&!u[i].includes("DetermineComponentFrameRoot");)i++;for(;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++;if(i===u.length||r===c.length)for(i=u.length-1,r=c.length-1;1<=i&&0<=r&&u[i]!==c[r];)r--;for(;1<=i&&0<=r;i--,r--)if(u[i]!==c[r]){if(i!==1||r!==1)do if(i--,r--,0>r||u[i]!==c[r]){var f=`
`+u[i].replace(" at new "," at ");return t.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",t.displayName)),f}while(1<=i&&0<=r);break}}}finally{bf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Fr(n):""}function XI(t,e){switch(t.tag){case 26:case 27:case 5:return Fr(t.type);case 16:return Fr("Lazy");case 13:return t.child!==e&&e!==null?Fr("Suspense Fallback"):Fr("Suspense");case 19:return Fr("SuspenseList");case 0:case 15:return Rf(t.type,!1);case 11:return Rf(t.type.render,!1);case 1:return Rf(t.type,!0);case 31:return Fr("Activity");default:return""}}function o_(t){try{var e="",n=null;do e+=XI(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Ud=Object.prototype.hasOwnProperty,ap=dt.unstable_scheduleCallback,If=dt.unstable_cancelCallback,WI=dt.unstable_shouldYield,JI=dt.unstable_requestPaint,an=dt.unstable_now,ZI=dt.unstable_getCurrentPriorityLevel,KT=dt.unstable_ImmediatePriority,YT=dt.unstable_UserBlockingPriority,mc=dt.unstable_NormalPriority,eC=dt.unstable_LowPriority,$T=dt.unstable_IdlePriority,tC=dt.log,nC=dt.unstable_setDisableYieldValue,wl=null,on=null;function tr(t){if(typeof tC=="function"&&nC(t),on&&typeof on.setStrictMode=="function")try{on.setStrictMode(wl,t)}catch{}}var ln=Math.clz32?Math.clz32:sC,iC=Math.log,rC=Math.LN2;function sC(t){return t>>>=0,t===0?32:31-(iC(t)/rC|0)|0}var gu=256,yu=262144,_u=4194304;function jr(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function dh(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var r=0,s=t.suspendedLanes,a=t.pingedLanes;t=t.warmLanes;var l=i&134217727;return l!==0?(i=l&~s,i!==0?r=jr(i):(a&=l,a!==0?r=jr(a):n||(n=l&~t,n!==0&&(r=jr(n))))):(l=i&~s,l!==0?r=jr(l):a!==0?r=jr(a):n||(n=i&~t,n!==0&&(r=jr(n)))),r===0?0:e!==0&&e!==r&&!(e&s)&&(s=r&-r,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:r}function bl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function aC(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function QT(){var t=_u;return _u<<=1,!(_u&62914560)&&(_u=4194304),t}function Cf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Rl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function oC(t,e,n,i,r,s){var a=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var l=t.entanglements,u=t.expirationTimes,c=t.hiddenUpdates;for(n=a&~n;0<n;){var f=31-ln(n),m=1<<f;l[f]=0,u[f]=-1;var p=c[f];if(p!==null)for(c[f]=null,f=0;f<p.length;f++){var y=p[f];y!==null&&(y.lane&=-536870913)}n&=~m}i!==0&&XT(t,i,0),s!==0&&r===0&&t.tag!==0&&(t.suspendedLanes|=s&~(a&~e))}function XT(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-ln(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function WT(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ln(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}function JT(t,e){var n=e&-e;return n=n&42?1:op(n),n&(t.suspendedLanes|e)?0:n}function op(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function lp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function ZT(){var t=Ee.p;return t!==0?t:(t=window.event,t===void 0?32:SA(t.type))}function l_(t,e){var n=Ee.p;try{return Ee.p=t,e()}finally{Ee.p=n}}var Dr=Math.random().toString(36).slice(2),St="__reactFiber$"+Dr,Xt="__reactProps$"+Dr,Ma="__reactContainer$"+Dr,xd="__reactEvents$"+Dr,lC="__reactListeners$"+Dr,uC="__reactHandles$"+Dr,u_="__reactResources$"+Dr,Il="__reactMarker$"+Dr;function up(t){delete t[St],delete t[Xt],delete t[xd],delete t[lC],delete t[uC]}function js(t){var e=t[St];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ma]||n[St]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=gv(t);t!==null;){if(n=t[St])return n;t=gv(t)}return e}t=n,n=t.parentNode}return null}function Va(t){if(t=t[St]||t[Ma]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function wo(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(x(33))}function ta(t){var e=t[u_];return e||(e=t[u_]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function yt(t){t[Il]=!0}var e0=new Set,t0={};function ys(t,e){ma(t,e),ma(t+"Capture",e)}function ma(t,e){for(t0[t]=e,t=0;t<e.length;t++)e0.add(e[t])}var cC=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),c_={},h_={};function hC(t){return Ud.call(h_,t)?!0:Ud.call(c_,t)?!1:cC.test(t)?h_[t]=!0:(c_[t]=!0,!1)}function xu(t,e,n){if(hC(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function vu(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ri(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function pn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function n0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function fC(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var r=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){n=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function zd(t){if(!t._valueTracker){var e=n0(t)?"checked":"value";t._valueTracker=fC(t,e,""+t[e])}}function i0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=n0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function pc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var dC=/[\n"\\]/g;function _n(t){return t.replace(dC,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Bd(t,e,n,i,r,s,a,l){t.name="",a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?t.type=a:t.removeAttribute("type"),e!=null?a==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+pn(e)):t.value!==""+pn(e)&&(t.value=""+pn(e)):a!=="submit"&&a!=="reset"||t.removeAttribute("value"),e!=null?qd(t,a,pn(e)):n!=null?qd(t,a,pn(n)):i!=null&&t.removeAttribute("value"),r==null&&s!=null&&(t.defaultChecked=!!s),r!=null&&(t.checked=r&&typeof r!="function"&&typeof r!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.name=""+pn(l):t.removeAttribute("name")}function r0(t,e,n,i,r,s,a,l){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){zd(t);return}n=n!=null?""+pn(n):"",e=e!=null?""+pn(e):n,l||e===t.value||(t.value=e),t.defaultValue=e}i=i??r,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=l?t.checked:!!i,t.defaultChecked=!!i,a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(t.name=a),zd(t)}function qd(t,e,n){e==="number"&&pc(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+pn(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function s0(t,e,n){if(e!=null&&(e=""+pn(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+pn(n):""}function a0(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(x(92));if(Ao(i)){if(1<i.length)throw Error(x(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=pn(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),zd(t)}function pa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var mC=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function f_(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||mC.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function o0(t,e,n){if(e!=null&&typeof e!="object")throw Error(x(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var r in e)i=e[r],e.hasOwnProperty(r)&&n[r]!==i&&f_(t,r,i)}else for(var s in e)e.hasOwnProperty(s)&&f_(t,s,e[s])}function cp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pC=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),gC=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function zu(t){return gC.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function di(){}var Hd=null;function hp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Gs=null,ia=null;function d_(t){var e=Va(t);if(e&&(t=e.stateNode)){var n=t[Xt]||null;e:switch(t=e.stateNode,e.type){case"input":if(Bd(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+_n(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=i[Xt]||null;if(!r)throw Error(x(90));Bd(i,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&i0(i)}break e;case"textarea":s0(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Df=!1;function l0(t,e,n){if(Df)return t(e,n);Df=!0;try{var i=t(e);return i}finally{if(Df=!1,(Gs!==null||ia!==null)&&(bh(),Gs&&(e=Gs,t=ia,ia=Gs=null,d_(e),t)))for(e=0;e<t.length;e++)d_(t[e])}}function Zo(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Xt]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(x(231,e,typeof n));return n}var Ai=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Fd=!1;if(Ai)try{var mo={};Object.defineProperty(mo,"passive",{get:function(){Fd=!0}}),window.addEventListener("test",mo,mo),window.removeEventListener("test",mo,mo)}catch{Fd=!1}var nr=null,fp=null,Bu=null;function u0(){if(Bu)return Bu;var t,e=fp,n=e.length,i,r="value"in nr?nr.value:nr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Bu=r.slice(t,1<i?1-i:void 0)}function qu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Eu(){return!0}function m_(){return!1}function Wt(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Eu:m_,this.isPropagationStopped=m_,this}return qe(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Eu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Eu)},persist:function(){},isPersistent:Eu}),e}var _s={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},mh=Wt(_s),Cl=qe({},_s,{view:0,detail:0}),yC=Wt(Cl),Nf,Of,po,ph=qe({},Cl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:dp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==po&&(po&&t.type==="mousemove"?(Nf=t.screenX-po.screenX,Of=t.screenY-po.screenY):Of=Nf=0,po=t),Nf)},movementY:function(t){return"movementY"in t?t.movementY:Of}}),p_=Wt(ph),_C=qe({},ph,{dataTransfer:0}),vC=Wt(_C),EC=qe({},Cl,{relatedTarget:0}),Mf=Wt(EC),TC=qe({},_s,{animationName:0,elapsedTime:0,pseudoElement:0}),SC=Wt(TC),AC=qe({},_s,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),wC=Wt(AC),bC=qe({},_s,{data:0}),g_=Wt(bC),RC={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},IC={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},CC={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function DC(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=CC[t])?!!e[t]:!1}function dp(){return DC}var NC=qe({},Cl,{key:function(t){if(t.key){var e=RC[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=qu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?IC[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:dp,charCode:function(t){return t.type==="keypress"?qu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?qu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),OC=Wt(NC),MC=qe({},ph,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),y_=Wt(MC),VC=qe({},Cl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:dp}),kC=Wt(VC),PC=qe({},_s,{propertyName:0,elapsedTime:0,pseudoElement:0}),LC=Wt(PC),UC=qe({},ph,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),xC=Wt(UC),zC=qe({},_s,{newState:0,oldState:0}),BC=Wt(zC),qC=[9,13,27,32],mp=Ai&&"CompositionEvent"in window,ko=null;Ai&&"documentMode"in document&&(ko=document.documentMode);var HC=Ai&&"TextEvent"in window&&!ko,c0=Ai&&(!mp||ko&&8<ko&&11>=ko),__=" ",v_=!1;function h0(t,e){switch(t){case"keyup":return qC.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function f0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ks=!1;function FC(t,e){switch(t){case"compositionend":return f0(e);case"keypress":return e.which!==32?null:(v_=!0,__);case"textInput":return t=e.data,t===__&&v_?null:t;default:return null}}function jC(t,e){if(Ks)return t==="compositionend"||!mp&&h0(t,e)?(t=u0(),Bu=fp=nr=null,Ks=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return c0&&e.locale!=="ko"?null:e.data;default:return null}}var GC={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function E_(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!GC[t.type]:e==="textarea"}function d0(t,e,n,i){Gs?ia?ia.push(i):ia=[i]:Gs=i,e=Vc(e,"onChange"),0<e.length&&(n=new mh("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Po=null,el=null;function KC(t){lA(t,0)}function gh(t){var e=wo(t);if(i0(e))return t}function T_(t,e){if(t==="change")return e}var m0=!1;if(Ai){var Vf;if(Ai){var kf="oninput"in document;if(!kf){var S_=document.createElement("div");S_.setAttribute("oninput","return;"),kf=typeof S_.oninput=="function"}Vf=kf}else Vf=!1;m0=Vf&&(!document.documentMode||9<document.documentMode)}function A_(){Po&&(Po.detachEvent("onpropertychange",p0),el=Po=null)}function p0(t){if(t.propertyName==="value"&&gh(el)){var e=[];d0(e,el,t,hp(t)),l0(KC,e)}}function YC(t,e,n){t==="focusin"?(A_(),Po=e,el=n,Po.attachEvent("onpropertychange",p0)):t==="focusout"&&A_()}function $C(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return gh(el)}function QC(t,e){if(t==="click")return gh(e)}function XC(t,e){if(t==="input"||t==="change")return gh(e)}function WC(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var cn=typeof Object.is=="function"?Object.is:WC;function tl(t,e){if(cn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Ud.call(e,r)||!cn(t[r],e[r]))return!1}return!0}function w_(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function b_(t,e){var n=w_(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=w_(n)}}function g0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?g0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function y0(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=pc(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=pc(t.document)}return e}function pp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var JC=Ai&&"documentMode"in document&&11>=document.documentMode,Ys=null,jd=null,Lo=null,Gd=!1;function R_(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Gd||Ys==null||Ys!==pc(i)||(i=Ys,"selectionStart"in i&&pp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Lo&&tl(Lo,i)||(Lo=i,i=Vc(jd,"onSelect"),0<i.length&&(e=new mh("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ys)))}function Hr(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var $s={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionrun:Hr("Transition","TransitionRun"),transitionstart:Hr("Transition","TransitionStart"),transitioncancel:Hr("Transition","TransitionCancel"),transitionend:Hr("Transition","TransitionEnd")},Pf={},_0={};Ai&&(_0=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function vs(t){if(Pf[t])return Pf[t];if(!$s[t])return t;var e=$s[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in _0)return Pf[t]=e[n];return t}var v0=vs("animationend"),E0=vs("animationiteration"),T0=vs("animationstart"),ZC=vs("transitionrun"),e1=vs("transitionstart"),t1=vs("transitioncancel"),S0=vs("transitionend"),A0=new Map,Kd="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Kd.push("scrollEnd");function Pn(t,e){A0.set(t,e),ys(e,[t])}var gc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}},mn=[],Qs=0,gp=0;function yh(){for(var t=Qs,e=gp=Qs=0;e<t;){var n=mn[e];mn[e++]=null;var i=mn[e];mn[e++]=null;var r=mn[e];mn[e++]=null;var s=mn[e];if(mn[e++]=null,i!==null&&r!==null){var a=i.pending;a===null?r.next=r:(r.next=a.next,a.next=r),i.pending=r}s!==0&&w0(n,r,s)}}function _h(t,e,n,i){mn[Qs++]=t,mn[Qs++]=e,mn[Qs++]=n,mn[Qs++]=i,gp|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function yp(t,e,n,i){return _h(t,e,n,i),yc(t)}function Es(t,e){return _h(t,null,null,e),yc(t)}function w0(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var r=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(r=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,r&&e!==null&&(r=31-ln(n),t=s.hiddenUpdates,i=t[r],i===null?t[r]=[e]:i.push(e),e.lane=n|536870912),s):null}function yc(t){if(50<Go)throw Go=0,dm=null,Error(x(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Xs={};function n1(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tn(t,e,n,i){return new n1(t,e,n,i)}function _p(t){return t=t.prototype,!(!t||!t.isReactComponent)}function yi(t,e){var n=t.alternate;return n===null?(n=tn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function b0(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Hu(t,e,n,i,r,s){var a=0;if(i=t,typeof t=="function")_p(t)&&(a=1);else if(typeof t=="string")a=oD(t,n,Gn.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Vd:return t=tn(31,n,e,r),t.elementType=Vd,t.lanes=s,t;case Hs:return Wr(n.children,r,s,e);case jT:a=8,r|=24;break;case Nd:return t=tn(12,n,e,r|2),t.elementType=Nd,t.lanes=s,t;case Od:return t=tn(13,n,e,r),t.elementType=Od,t.lanes=s,t;case Md:return t=tn(19,n,e,r),t.elementType=Md,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case fi:a=10;break e;case GT:a=9;break e;case rp:a=11;break e;case sp:a=14;break e;case Gi:a=16,i=null;break e}a=29,n=Error(x(130,t===null?"null":typeof t,"")),i=null}return e=tn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Wr(t,e,n,i){return t=tn(7,t,i,e),t.lanes=n,t}function Lf(t,e,n){return t=tn(6,t,null,e),t.lanes=n,t}function R0(t){var e=tn(18,null,null,0);return e.stateNode=t,e}function Uf(t,e,n){return e=tn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var I_=new WeakMap;function vn(t,e){if(typeof t=="object"&&t!==null){var n=I_.get(t);return n!==void 0?n:(e={value:t,source:e,stack:o_(e)},I_.set(t,e),e)}return{value:t,source:e,stack:o_(e)}}var Ws=[],Js=0,_c=null,nl=0,gn=[],yn=0,vr=null,Hn=1,Fn="";function ci(t,e){Ws[Js++]=nl,Ws[Js++]=_c,_c=t,nl=e}function I0(t,e,n){gn[yn++]=Hn,gn[yn++]=Fn,gn[yn++]=vr,vr=t;var i=Hn;t=Fn;var r=32-ln(i)-1;i&=~(1<<r),n+=1;var s=32-ln(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Hn=1<<32-ln(e)+r|n<<r|i,Fn=s+t}else Hn=1<<s|n<<r|i,Fn=t}function vp(t){t.return!==null&&(ci(t,1),I0(t,1,0))}function Ep(t){for(;t===_c;)_c=Ws[--Js],Ws[Js]=null,nl=Ws[--Js],Ws[Js]=null;for(;t===vr;)vr=gn[--yn],gn[yn]=null,Fn=gn[--yn],gn[yn]=null,Hn=gn[--yn],gn[yn]=null}function C0(t,e){gn[yn++]=Hn,gn[yn++]=Fn,gn[yn++]=vr,Hn=e.id,Fn=e.overflow,vr=t}var At=null,xe=null,ye=!1,lr=null,En=!1,Yd=Error(x(519));function Er(t){var e=Error(x(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw il(vn(e,t)),Yd}function C_(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[St]=t,e[Xt]=i,n){case"dialog":ce("cancel",e),ce("close",e);break;case"iframe":case"object":case"embed":ce("load",e);break;case"video":case"audio":for(n=0;n<ol.length;n++)ce(ol[n],e);break;case"source":ce("error",e);break;case"img":case"image":case"link":ce("error",e),ce("load",e);break;case"details":ce("toggle",e);break;case"input":ce("invalid",e),r0(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":ce("invalid",e);break;case"textarea":ce("invalid",e),a0(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||cA(e.textContent,n)?(i.popover!=null&&(ce("beforetoggle",e),ce("toggle",e)),i.onScroll!=null&&ce("scroll",e),i.onScrollEnd!=null&&ce("scrollend",e),i.onClick!=null&&(e.onclick=di),e=!0):e=!1,e||Er(t,!0)}function D_(t){for(At=t.return;At;)switch(At.tag){case 5:case 31:case 13:En=!1;return;case 27:case 3:En=!0;return;default:At=At.return}}function Vs(t){if(t!==At)return!1;if(!ye)return D_(t),ye=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||_m(t.type,t.memoizedProps)),n=!n),n&&xe&&Er(t),D_(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));xe=pv(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));xe=pv(t)}else e===27?(e=xe,Nr(t.type)?(t=Sm,Sm=null,xe=t):xe=e):xe=At?An(t.stateNode.nextSibling):null;return!0}function is(){xe=At=null,ye=!1}function xf(){var t=lr;return t!==null&&(Gt===null?Gt=t:Gt.push.apply(Gt,t),lr=null),t}function il(t){lr===null?lr=[t]:lr.push(t)}var $d=ti(null),Ts=null,mi=null;function Yi(t,e,n){Ve($d,e._currentValue),e._currentValue=n}function _i(t){t._currentValue=$d.current,_t($d)}function Qd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Xd(t,e,n,i){var r=t.child;for(r!==null&&(r.return=t);r!==null;){var s=r.dependencies;if(s!==null){var a=r.child;s=s.firstContext;e:for(;s!==null;){var l=s;s=r;for(var u=0;u<e.length;u++)if(l.context===e[u]){s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Qd(s.return,n,t),i||(a=null);break e}s=l.next}}else if(r.tag===18){if(a=r.return,a===null)throw Error(x(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Qd(a,n,t),a=null}else a=r.child;if(a!==null)a.return=r;else for(a=r;a!==null;){if(a===t){a=null;break}if(r=a.sibling,r!==null){r.return=a.return,a=r;break}a=a.return}r=a}}function ka(t,e,n,i){t=null;for(var r=e,s=!1;r!==null;){if(!s){if(r.flags&524288)s=!0;else if(r.flags&262144)break}if(r.tag===10){var a=r.alternate;if(a===null)throw Error(x(387));if(a=a.memoizedProps,a!==null){var l=r.type;cn(r.pendingProps.value,a.value)||(t!==null?t.push(l):t=[l])}}else if(r===hc.current){if(a=r.alternate,a===null)throw Error(x(387));a.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(t!==null?t.push(ul):t=[ul])}r=r.return}t!==null&&Xd(e,t,n,i),e.flags|=262144}function vc(t){for(t=t.firstContext;t!==null;){if(!cn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function rs(t){Ts=t,mi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function bt(t){return D0(Ts,t)}function Tu(t,e){return Ts===null&&rs(t),D0(t,e)}function D0(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},mi===null){if(t===null)throw Error(x(308));mi=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else mi=mi.next=e;return n}var i1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},r1=dt.unstable_scheduleCallback,s1=dt.unstable_NormalPriority,at={$$typeof:fi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Tp(){return{controller:new i1,data:new Map,refCount:0}}function Dl(t){t.refCount--,t.refCount===0&&r1(s1,function(){t.controller.abort()})}var Uo=null,Wd=0,ga=0,ra=null;function a1(t,e){if(Uo===null){var n=Uo=[];Wd=0,ga=Kp(),ra={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Wd++,e.then(N_,N_),e}function N_(){if(--Wd===0&&Uo!==null){ra!==null&&(ra.status="fulfilled");var t=Uo;Uo=null,ga=0,ra=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function o1(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(r){n.push(r)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var r=0;r<n.length;r++)(0,n[r])(e)},function(r){for(i.status="rejected",i.reason=r,r=0;r<n.length;r++)(0,n[r])(void 0)}),i}var O_=Z.S;Z.S=function(t,e){FS=an(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&a1(t,e),O_!==null&&O_(t,e)};var Jr=ti(null);function Sp(){var t=Jr.current;return t!==null?t:Ne.pooledCache}function Fu(t,e){e===null?Ve(Jr,Jr.current):Ve(Jr,e.pool)}function N0(){var t=Sp();return t===null?null:{parent:at._currentValue,pool:t}}var Pa=Error(x(460)),Ap=Error(x(474)),vh=Error(x(542)),Ec={then:function(){}};function M_(t){return t=t.status,t==="fulfilled"||t==="rejected"}function O0(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(di,di),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,k_(t),t;default:if(typeof e.status=="string")e.then(di,di);else{if(t=Ne,t!==null&&100<t.shellSuspendCounter)throw Error(x(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var r=e;r.status="fulfilled",r.value=i}},function(i){if(e.status==="pending"){var r=e;r.status="rejected",r.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,k_(t),t}throw Zr=e,Pa}}function Gr(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Zr=n,Pa):n}}var Zr=null;function V_(){if(Zr===null)throw Error(x(459));var t=Zr;return Zr=null,t}function k_(t){if(t===Pa||t===vh)throw Error(x(483))}var sa=null,rl=0;function Su(t){var e=rl;return rl+=1,sa===null&&(sa=[]),O0(sa,t,e)}function go(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Au(t,e){throw e.$$typeof===YI?Error(x(525)):(t=Object.prototype.toString.call(e),Error(x(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function M0(t){function e(v,E){if(t){var A=v.deletions;A===null?(v.deletions=[E],v.flags|=16):A.push(E)}}function n(v,E){if(!t)return null;for(;E!==null;)e(v,E),E=E.sibling;return null}function i(v){for(var E=new Map;v!==null;)v.key!==null?E.set(v.key,v):E.set(v.index,v),v=v.sibling;return E}function r(v,E){return v=yi(v,E),v.index=0,v.sibling=null,v}function s(v,E,A){return v.index=A,t?(A=v.alternate,A!==null?(A=A.index,A<E?(v.flags|=67108866,E):A):(v.flags|=67108866,E)):(v.flags|=1048576,E)}function a(v){return t&&v.alternate===null&&(v.flags|=67108866),v}function l(v,E,A,M){return E===null||E.tag!==6?(E=Lf(A,v.mode,M),E.return=v,E):(E=r(E,A),E.return=v,E)}function u(v,E,A,M){var B=A.type;return B===Hs?f(v,E,A.props.children,M,A.key):E!==null&&(E.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Gi&&Gr(B)===E.type)?(E=r(E,A.props),go(E,A),E.return=v,E):(E=Hu(A.type,A.key,A.props,null,v.mode,M),go(E,A),E.return=v,E)}function c(v,E,A,M){return E===null||E.tag!==4||E.stateNode.containerInfo!==A.containerInfo||E.stateNode.implementation!==A.implementation?(E=Uf(A,v.mode,M),E.return=v,E):(E=r(E,A.children||[]),E.return=v,E)}function f(v,E,A,M,B){return E===null||E.tag!==7?(E=Wr(A,v.mode,M,B),E.return=v,E):(E=r(E,A),E.return=v,E)}function m(v,E,A){if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return E=Lf(""+E,v.mode,A),E.return=v,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case pu:return A=Hu(E.type,E.key,E.props,null,v.mode,A),go(A,E),A.return=v,A;case So:return E=Uf(E,v.mode,A),E.return=v,E;case Gi:return E=Gr(E),m(v,E,A)}if(Ao(E)||fo(E))return E=Wr(E,v.mode,A,null),E.return=v,E;if(typeof E.then=="function")return m(v,Su(E),A);if(E.$$typeof===fi)return m(v,Tu(v,E),A);Au(v,E)}return null}function p(v,E,A,M){var B=E!==null?E.key:null;if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return B!==null?null:l(v,E,""+A,M);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case pu:return A.key===B?u(v,E,A,M):null;case So:return A.key===B?c(v,E,A,M):null;case Gi:return A=Gr(A),p(v,E,A,M)}if(Ao(A)||fo(A))return B!==null?null:f(v,E,A,M,null);if(typeof A.then=="function")return p(v,E,Su(A),M);if(A.$$typeof===fi)return p(v,E,Tu(v,A),M);Au(v,A)}return null}function y(v,E,A,M,B){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return v=v.get(A)||null,l(E,v,""+M,B);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case pu:return v=v.get(M.key===null?A:M.key)||null,u(E,v,M,B);case So:return v=v.get(M.key===null?A:M.key)||null,c(E,v,M,B);case Gi:return M=Gr(M),y(v,E,A,M,B)}if(Ao(M)||fo(M))return v=v.get(A)||null,f(E,v,M,B,null);if(typeof M.then=="function")return y(v,E,A,Su(M),B);if(M.$$typeof===fi)return y(v,E,A,Tu(E,M),B);Au(E,M)}return null}function I(v,E,A,M){for(var B=null,F=null,T=E,_=E=0,S=null;T!==null&&_<A.length;_++){T.index>_?(S=T,T=null):S=T.sibling;var b=p(v,T,A[_],M);if(b===null){T===null&&(T=S);break}t&&T&&b.alternate===null&&e(v,T),E=s(b,E,_),F===null?B=b:F.sibling=b,F=b,T=S}if(_===A.length)return n(v,T),ye&&ci(v,_),B;if(T===null){for(;_<A.length;_++)T=m(v,A[_],M),T!==null&&(E=s(T,E,_),F===null?B=T:F.sibling=T,F=T);return ye&&ci(v,_),B}for(T=i(T);_<A.length;_++)S=y(T,v,_,A[_],M),S!==null&&(t&&S.alternate!==null&&T.delete(S.key===null?_:S.key),E=s(S,E,_),F===null?B=S:F.sibling=S,F=S);return t&&T.forEach(function(R){return e(v,R)}),ye&&ci(v,_),B}function N(v,E,A,M){if(A==null)throw Error(x(151));for(var B=null,F=null,T=E,_=E=0,S=null,b=A.next();T!==null&&!b.done;_++,b=A.next()){T.index>_?(S=T,T=null):S=T.sibling;var R=p(v,T,b.value,M);if(R===null){T===null&&(T=S);break}t&&T&&R.alternate===null&&e(v,T),E=s(R,E,_),F===null?B=R:F.sibling=R,F=R,T=S}if(b.done)return n(v,T),ye&&ci(v,_),B;if(T===null){for(;!b.done;_++,b=A.next())b=m(v,b.value,M),b!==null&&(E=s(b,E,_),F===null?B=b:F.sibling=b,F=b);return ye&&ci(v,_),B}for(T=i(T);!b.done;_++,b=A.next())b=y(T,v,_,b.value,M),b!==null&&(t&&b.alternate!==null&&T.delete(b.key===null?_:b.key),E=s(b,E,_),F===null?B=b:F.sibling=b,F=b);return t&&T.forEach(function(O){return e(v,O)}),ye&&ci(v,_),B}function D(v,E,A,M){if(typeof A=="object"&&A!==null&&A.type===Hs&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case pu:e:{for(var B=A.key;E!==null;){if(E.key===B){if(B=A.type,B===Hs){if(E.tag===7){n(v,E.sibling),M=r(E,A.props.children),M.return=v,v=M;break e}}else if(E.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Gi&&Gr(B)===E.type){n(v,E.sibling),M=r(E,A.props),go(M,A),M.return=v,v=M;break e}n(v,E);break}else e(v,E);E=E.sibling}A.type===Hs?(M=Wr(A.props.children,v.mode,M,A.key),M.return=v,v=M):(M=Hu(A.type,A.key,A.props,null,v.mode,M),go(M,A),M.return=v,v=M)}return a(v);case So:e:{for(B=A.key;E!==null;){if(E.key===B)if(E.tag===4&&E.stateNode.containerInfo===A.containerInfo&&E.stateNode.implementation===A.implementation){n(v,E.sibling),M=r(E,A.children||[]),M.return=v,v=M;break e}else{n(v,E);break}else e(v,E);E=E.sibling}M=Uf(A,v.mode,M),M.return=v,v=M}return a(v);case Gi:return A=Gr(A),D(v,E,A,M)}if(Ao(A))return I(v,E,A,M);if(fo(A)){if(B=fo(A),typeof B!="function")throw Error(x(150));return A=B.call(A),N(v,E,A,M)}if(typeof A.then=="function")return D(v,E,Su(A),M);if(A.$$typeof===fi)return D(v,E,Tu(v,A),M);Au(v,A)}return typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint"?(A=""+A,E!==null&&E.tag===6?(n(v,E.sibling),M=r(E,A),M.return=v,v=M):(n(v,E),M=Lf(A,v.mode,M),M.return=v,v=M),a(v)):n(v,E)}return function(v,E,A,M){try{rl=0;var B=D(v,E,A,M);return sa=null,B}catch(T){if(T===Pa||T===vh)throw T;var F=tn(29,T,null,v.mode);return F.lanes=M,F.return=v,F}finally{}}}var ss=M0(!0),V0=M0(!1),Ki=!1;function wp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Jd(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ur(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function cr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ve&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,e=yc(t),w0(t,null,n),e}return _h(t,i,e,n),yc(t)}function xo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,WT(t,n)}}function zf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Zd=!1;function zo(){if(Zd){var t=ra;if(t!==null)throw t}}function Bo(t,e,n,i){Zd=!1;var r=t.updateQueue;Ki=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var u=l,c=u.next;u.next=null,a===null?s=c:a.next=c,a=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==a&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(s!==null){var m=r.baseState;a=0,f=c=u=null,l=s;do{var p=l.lane&-536870913,y=p!==l.lane;if(y?(ge&p)===p:(i&p)===p){p!==0&&p===ga&&(Zd=!0),f!==null&&(f=f.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var I=t,N=l;p=e;var D=n;switch(N.tag){case 1:if(I=N.payload,typeof I=="function"){m=I.call(D,m,p);break e}m=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=N.payload,p=typeof I=="function"?I.call(D,m,p):I,p==null)break e;m=qe({},m,p);break e;case 2:Ki=!0}}p=l.callback,p!==null&&(t.flags|=64,y&&(t.flags|=8192),y=r.callbacks,y===null?r.callbacks=[p]:y.push(p))}else y={lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=y,u=m):f=f.next=y,a|=p;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;y=l,l=y.next,y.next=null,r.lastBaseUpdate=y,r.shared.pending=null}}while(!0);f===null&&(u=m),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=f,s===null&&(r.shared.lanes=0),Sr|=a,t.lanes=a,t.memoizedState=m}}function k0(t,e){if(typeof t!="function")throw Error(x(191,t));t.call(e)}function P0(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)k0(n[t],e)}var ya=ti(null),Tc=ti(0);function P_(t,e){t=Ii,Ve(Tc,t),Ve(ya,e),Ii=t|e.baseLanes}function em(){Ve(Tc,Ii),Ve(ya,ya.current)}function bp(){Ii=Tc.current,_t(ya),_t(Tc)}var hn=ti(null),Sn=null;function $i(t){var e=t.alternate;Ve(tt,tt.current&1),Ve(hn,t),Sn===null&&(e===null||ya.current!==null||e.memoizedState!==null)&&(Sn=t)}function tm(t){Ve(tt,tt.current),Ve(hn,t),Sn===null&&(Sn=t)}function L0(t){t.tag===22?(Ve(tt,tt.current),Ve(hn,t),Sn===null&&(Sn=t)):Qi()}function Qi(){Ve(tt,tt.current),Ve(hn,hn.current)}function en(t){_t(hn),Sn===t&&(Sn=null),_t(tt)}var tt=ti(0);function Sc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Em(n)||Tm(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var wi=0,se=null,Ie=null,rt=null,Ac=!1,aa=!1,as=!1,wc=0,sl=0,oa=null,l1=0;function Xe(){throw Error(x(321))}function Rp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!cn(t[n],e[n]))return!1;return!0}function Ip(t,e,n,i,r,s){return wi=s,se=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Z.H=t===null||t.memoizedState===null?dS:xp,as=!1,s=n(i,r),as=!1,aa&&(s=x0(e,n,i,r)),U0(t),s}function U0(t){Z.H=al;var e=Ie!==null&&Ie.next!==null;if(wi=0,rt=Ie=se=null,Ac=!1,sl=0,oa=null,e)throw Error(x(300));t===null||lt||(t=t.dependencies,t!==null&&vc(t)&&(lt=!0))}function x0(t,e,n,i){se=t;var r=0;do{if(aa&&(oa=null),sl=0,aa=!1,25<=r)throw Error(x(301));if(r+=1,rt=Ie=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Z.H=mS,s=e(n,i)}while(aa);return s}function u1(){var t=Z.H,e=t.useState()[0];return e=typeof e.then=="function"?Nl(e):e,t=t.useState()[0],(Ie!==null?Ie.memoizedState:null)!==t&&(se.flags|=1024),e}function Cp(){var t=wc!==0;return wc=0,t}function Dp(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Np(t){if(Ac){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Ac=!1}wi=0,rt=Ie=se=null,aa=!1,sl=wc=0,oa=null}function Lt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rt===null?se.memoizedState=rt=t:rt=rt.next=t,rt}function nt(){if(Ie===null){var t=se.alternate;t=t!==null?t.memoizedState:null}else t=Ie.next;var e=rt===null?se.memoizedState:rt.next;if(e!==null)rt=e,Ie=t;else{if(t===null)throw se.alternate===null?Error(x(467)):Error(x(310));Ie=t,t={memoizedState:Ie.memoizedState,baseState:Ie.baseState,baseQueue:Ie.baseQueue,queue:Ie.queue,next:null},rt===null?se.memoizedState=rt=t:rt=rt.next=t}return rt}function Eh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Nl(t){var e=sl;return sl+=1,oa===null&&(oa=[]),t=O0(oa,t,e),e=se,(rt===null?e.memoizedState:rt.next)===null&&(e=e.alternate,Z.H=e===null||e.memoizedState===null?dS:xp),t}function Th(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Nl(t);if(t.$$typeof===fi)return bt(t)}throw Error(x(438,String(t)))}function Op(t){var e=null,n=se.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=se.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(r){return r.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Eh(),se.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=$I;return e.index++,n}function bi(t,e){return typeof e=="function"?e(t):e}function ju(t){var e=nt();return Mp(e,Ie,t)}function Mp(t,e,n){var i=t.queue;if(i===null)throw Error(x(311));i.lastRenderedReducer=n;var r=t.baseQueue,s=i.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}e.baseQueue=r=s,i.pending=null}if(s=t.baseState,r===null)t.memoizedState=s;else{e=r.next;var l=a=null,u=null,c=e,f=!1;do{var m=c.lane&-536870913;if(m!==c.lane?(ge&m)===m:(wi&m)===m){var p=c.revertLane;if(p===0)u!==null&&(u=u.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),m===ga&&(f=!0);else if((wi&p)===p){c=c.next,p===ga&&(f=!0);continue}else m={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(l=u=m,a=s):u=u.next=m,se.lanes|=p,Sr|=p;m=c.action,as&&n(s,m),s=c.hasEagerState?c.eagerState:n(s,m)}else p={lane:m,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(l=u=p,a=s):u=u.next=p,se.lanes|=m,Sr|=m;c=c.next}while(c!==null&&c!==e);if(u===null?a=s:u.next=l,!cn(s,t.memoizedState)&&(lt=!0,f&&(n=ra,n!==null)))throw n;t.memoizedState=s,t.baseState=a,t.baseQueue=u,i.lastRenderedState=s}return r===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Bf(t){var e=nt(),n=e.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);cn(s,e.memoizedState)||(lt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function z0(t,e,n){var i=se,r=nt(),s=ye;if(s){if(n===void 0)throw Error(x(407));n=n()}else n=e();var a=!cn((Ie||r).memoizedState,n);if(a&&(r.memoizedState=n,lt=!0),r=r.queue,Vp(H0.bind(null,i,r,t),[t]),r.getSnapshot!==e||a||rt!==null&&rt.memoizedState.tag&1){if(i.flags|=2048,_a(9,{destroy:void 0},q0.bind(null,i,r,n,e),null),Ne===null)throw Error(x(349));s||wi&127||B0(i,e,n)}return n}function B0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=se.updateQueue,e===null?(e=Eh(),se.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function q0(t,e,n,i){e.value=n,e.getSnapshot=i,F0(e)&&j0(t)}function H0(t,e,n){return n(function(){F0(e)&&j0(t)})}function F0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!cn(t,n)}catch{return!0}}function j0(t){var e=Es(t,2);e!==null&&$t(e,t,2)}function nm(t){var e=Lt();if(typeof t=="function"){var n=t;if(t=n(),as){tr(!0);try{n()}finally{tr(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:bi,lastRenderedState:t},e}function G0(t,e,n,i){return t.baseState=n,Mp(t,Ie,typeof i=="function"?i:bi)}function c1(t,e,n,i,r){if(Ah(t))throw Error(x(485));if(t=e.action,t!==null){var s={payload:r,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(a){s.listeners.push(a)}};Z.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,K0(e,s)):(s.next=n.next,e.pending=n.next=s)}}function K0(t,e){var n=e.action,i=e.payload,r=t.state;if(e.isTransition){var s=Z.T,a={};Z.T=a;try{var l=n(r,i),u=Z.S;u!==null&&u(a,l),L_(t,e,l)}catch(c){im(t,e,c)}finally{s!==null&&a.types!==null&&(s.types=a.types),Z.T=s}}else try{s=n(r,i),L_(t,e,s)}catch(c){im(t,e,c)}}function L_(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){U_(t,e,i)},function(i){return im(t,e,i)}):U_(t,e,n)}function U_(t,e,n){e.status="fulfilled",e.value=n,Y0(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,K0(t,n)))}function im(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,Y0(e),e=e.next;while(e!==i)}t.action=null}function Y0(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function $0(t,e){return e}function x_(t,e){if(ye){var n=Ne.formState;if(n!==null){e:{var i=se;if(ye){if(xe){t:{for(var r=xe,s=En;r.nodeType!==8;){if(!s){r=null;break t}if(r=An(r.nextSibling),r===null){r=null;break t}}s=r.data,r=s==="F!"||s==="F"?r:null}if(r){xe=An(r.nextSibling),i=r.data==="F!";break e}}Er(i)}i=!1}i&&(e=n[0])}}return n=Lt(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$0,lastRenderedState:e},n.queue=i,n=cS.bind(null,se,i),i.dispatch=n,i=nm(!1),s=Up.bind(null,se,!1,i.queue),i=Lt(),r={state:e,dispatch:null,action:t,pending:null},i.queue=r,n=c1.bind(null,se,r,s,n),r.dispatch=n,i.memoizedState=t,[e,n,!1]}function z_(t){var e=nt();return Q0(e,Ie,t)}function Q0(t,e,n){if(e=Mp(t,e,$0)[0],t=ju(bi)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Nl(e)}catch(a){throw a===Pa?vh:a}else i=e;e=nt();var r=e.queue,s=r.dispatch;return n!==e.memoizedState&&(se.flags|=2048,_a(9,{destroy:void 0},h1.bind(null,r,n),null)),[i,s,t]}function h1(t,e){t.action=e}function B_(t){var e=nt(),n=Ie;if(n!==null)return Q0(e,n,t);nt(),e=e.memoizedState,n=nt();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function _a(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=se.updateQueue,e===null&&(e=Eh(),se.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function X0(){return nt().memoizedState}function Gu(t,e,n,i){var r=Lt();se.flags|=t,r.memoizedState=_a(1|e,{destroy:void 0},n,i===void 0?null:i)}function Sh(t,e,n,i){var r=nt();i=i===void 0?null:i;var s=r.memoizedState.inst;Ie!==null&&i!==null&&Rp(i,Ie.memoizedState.deps)?r.memoizedState=_a(e,s,n,i):(se.flags|=t,r.memoizedState=_a(1|e,s,n,i))}function q_(t,e){Gu(8390656,8,t,e)}function Vp(t,e){Sh(2048,8,t,e)}function f1(t){se.flags|=4;var e=se.updateQueue;if(e===null)e=Eh(),se.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function W0(t){var e=nt().memoizedState;return f1({ref:e,nextImpl:t}),function(){if(ve&2)throw Error(x(440));return e.impl.apply(void 0,arguments)}}function J0(t,e){return Sh(4,2,t,e)}function Z0(t,e){return Sh(4,4,t,e)}function eS(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function tS(t,e,n){n=n!=null?n.concat([t]):null,Sh(4,4,eS.bind(null,e,t),n)}function kp(){}function nS(t,e){var n=nt();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&Rp(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function iS(t,e){var n=nt();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&Rp(e,i[1]))return i[0];if(i=t(),as){tr(!0);try{t()}finally{tr(!1)}}return n.memoizedState=[i,e],i}function Pp(t,e,n){return n===void 0||wi&1073741824&&!(ge&261930)?t.memoizedState=e:(t.memoizedState=n,t=GS(),se.lanes|=t,Sr|=t,n)}function rS(t,e,n,i){return cn(n,e)?n:ya.current!==null?(t=Pp(t,n,i),cn(t,e)||(lt=!0),t):!(wi&42)||wi&1073741824&&!(ge&261930)?(lt=!0,t.memoizedState=n):(t=GS(),se.lanes|=t,Sr|=t,e)}function sS(t,e,n,i,r){var s=Ee.p;Ee.p=s!==0&&8>s?s:8;var a=Z.T,l={};Z.T=l,Up(t,!1,e,n);try{var u=r(),c=Z.S;if(c!==null&&c(l,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var f=o1(u,i);qo(t,e,f,un(t))}else qo(t,e,i,un(t))}catch(m){qo(t,e,{then:function(){},status:"rejected",reason:m},un())}finally{Ee.p=s,a!==null&&l.types!==null&&(a.types=l.types),Z.T=a}}function d1(){}function rm(t,e,n,i){if(t.tag!==5)throw Error(x(476));var r=aS(t).queue;sS(t,r,e,Xr,n===null?d1:function(){return oS(t),n(i)})}function aS(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Xr,baseState:Xr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:bi,lastRenderedState:Xr},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:bi,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function oS(t){var e=aS(t);e.next===null&&(e=t.alternate.memoizedState),qo(t,e.next.queue,{},un())}function Lp(){return bt(ul)}function lS(){return nt().memoizedState}function uS(){return nt().memoizedState}function m1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=un();t=ur(n);var i=cr(e,t,n);i!==null&&($t(i,e,n),xo(i,e,n)),e={cache:Tp()},t.payload=e;return}e=e.return}}function p1(t,e,n){var i=un();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ah(t)?hS(e,n):(n=yp(t,e,n,i),n!==null&&($t(n,t,i),fS(n,e,i)))}function cS(t,e,n){var i=un();qo(t,e,n,i)}function qo(t,e,n,i){var r={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ah(t))hS(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,l=s(a,n);if(r.hasEagerState=!0,r.eagerState=l,cn(l,a))return _h(t,e,r,0),Ne===null&&yh(),!1}catch{}finally{}if(n=yp(t,e,r,i),n!==null)return $t(n,t,i),fS(n,e,i),!0}return!1}function Up(t,e,n,i){if(i={lane:2,revertLane:Kp(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Ah(t)){if(e)throw Error(x(479))}else e=yp(t,n,i,2),e!==null&&$t(e,t,2)}function Ah(t){var e=t.alternate;return t===se||e!==null&&e===se}function hS(t,e){aa=Ac=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function fS(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,WT(t,n)}}var al={readContext:bt,use:Th,useCallback:Xe,useContext:Xe,useEffect:Xe,useImperativeHandle:Xe,useLayoutEffect:Xe,useInsertionEffect:Xe,useMemo:Xe,useReducer:Xe,useRef:Xe,useState:Xe,useDebugValue:Xe,useDeferredValue:Xe,useTransition:Xe,useSyncExternalStore:Xe,useId:Xe,useHostTransitionStatus:Xe,useFormState:Xe,useActionState:Xe,useOptimistic:Xe,useMemoCache:Xe,useCacheRefresh:Xe};al.useEffectEvent=Xe;var dS={readContext:bt,use:Th,useCallback:function(t,e){return Lt().memoizedState=[t,e===void 0?null:e],t},useContext:bt,useEffect:q_,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Gu(4194308,4,eS.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Gu(4194308,4,t,e)},useInsertionEffect:function(t,e){Gu(4,2,t,e)},useMemo:function(t,e){var n=Lt();e=e===void 0?null:e;var i=t();if(as){tr(!0);try{t()}finally{tr(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Lt();if(n!==void 0){var r=n(e);if(as){tr(!0);try{n(e)}finally{tr(!1)}}}else r=e;return i.memoizedState=i.baseState=r,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},i.queue=t,t=t.dispatch=p1.bind(null,se,t),[i.memoizedState,t]},useRef:function(t){var e=Lt();return t={current:t},e.memoizedState=t},useState:function(t){t=nm(t);var e=t.queue,n=cS.bind(null,se,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:kp,useDeferredValue:function(t,e){var n=Lt();return Pp(n,t,e)},useTransition:function(){var t=nm(!1);return t=sS.bind(null,se,t.queue,!0,!1),Lt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=se,r=Lt();if(ye){if(n===void 0)throw Error(x(407));n=n()}else{if(n=e(),Ne===null)throw Error(x(349));ge&127||B0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,q_(H0.bind(null,i,s,t),[t]),i.flags|=2048,_a(9,{destroy:void 0},q0.bind(null,i,s,n,e),null),n},useId:function(){var t=Lt(),e=Ne.identifierPrefix;if(ye){var n=Fn,i=Hn;n=(i&~(1<<32-ln(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=wc++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=l1++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Lp,useFormState:x_,useActionState:x_,useOptimistic:function(t){var e=Lt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Up.bind(null,se,!0,n),n.dispatch=e,[t,e]},useMemoCache:Op,useCacheRefresh:function(){return Lt().memoizedState=m1.bind(null,se)},useEffectEvent:function(t){var e=Lt(),n={impl:t};return e.memoizedState=n,function(){if(ve&2)throw Error(x(440));return n.impl.apply(void 0,arguments)}}},xp={readContext:bt,use:Th,useCallback:nS,useContext:bt,useEffect:Vp,useImperativeHandle:tS,useInsertionEffect:J0,useLayoutEffect:Z0,useMemo:iS,useReducer:ju,useRef:X0,useState:function(){return ju(bi)},useDebugValue:kp,useDeferredValue:function(t,e){var n=nt();return rS(n,Ie.memoizedState,t,e)},useTransition:function(){var t=ju(bi)[0],e=nt().memoizedState;return[typeof t=="boolean"?t:Nl(t),e]},useSyncExternalStore:z0,useId:lS,useHostTransitionStatus:Lp,useFormState:z_,useActionState:z_,useOptimistic:function(t,e){var n=nt();return G0(n,Ie,t,e)},useMemoCache:Op,useCacheRefresh:uS};xp.useEffectEvent=W0;var mS={readContext:bt,use:Th,useCallback:nS,useContext:bt,useEffect:Vp,useImperativeHandle:tS,useInsertionEffect:J0,useLayoutEffect:Z0,useMemo:iS,useReducer:Bf,useRef:X0,useState:function(){return Bf(bi)},useDebugValue:kp,useDeferredValue:function(t,e){var n=nt();return Ie===null?Pp(n,t,e):rS(n,Ie.memoizedState,t,e)},useTransition:function(){var t=Bf(bi)[0],e=nt().memoizedState;return[typeof t=="boolean"?t:Nl(t),e]},useSyncExternalStore:z0,useId:lS,useHostTransitionStatus:Lp,useFormState:B_,useActionState:B_,useOptimistic:function(t,e){var n=nt();return Ie!==null?G0(n,Ie,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Op,useCacheRefresh:uS};mS.useEffectEvent=W0;function qf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:qe({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var sm={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=un(),r=ur(i);r.payload=e,n!=null&&(r.callback=n),e=cr(t,r,i),e!==null&&($t(e,t,i),xo(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=un(),r=ur(i);r.tag=1,r.payload=e,n!=null&&(r.callback=n),e=cr(t,r,i),e!==null&&($t(e,t,i),xo(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=un(),i=ur(n);i.tag=2,e!=null&&(i.callback=e),e=cr(t,i,n),e!==null&&($t(e,t,n),xo(e,t,n))}};function H_(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!tl(n,i)||!tl(r,s):!0}function F_(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&sm.enqueueReplaceState(e,e.state,null)}function os(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=qe({},n));for(var r in t)n[r]===void 0&&(n[r]=t[r])}return n}function pS(t){gc(t)}function gS(t){}function yS(t){gc(t)}function bc(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function j_(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function am(t,e,n){return n=ur(n),n.tag=3,n.payload={element:null},n.callback=function(){bc(t,e)},n}function _S(t){return t=ur(t),t.tag=3,t}function vS(t,e,n,i){var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var s=i.value;t.payload=function(){return r(s)},t.callback=function(){j_(e,n,i)}}var a=n.stateNode;a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){j_(e,n,i),typeof r!="function"&&(hr===null?hr=new Set([this]):hr.add(this));var l=i.stack;this.componentDidCatch(i.value,{componentStack:l!==null?l:""})})}function g1(t,e,n,i,r){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&ka(e,n,r,!0),n=hn.current,n!==null){switch(n.tag){case 31:case 13:return Sn===null?Nc():n.alternate===null&&We===0&&(We=3),n.flags&=-257,n.flags|=65536,n.lanes=r,i===Ec?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),Jf(t,i,r)),!1;case 22:return n.flags|=65536,i===Ec?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),Jf(t,i,r)),!1}throw Error(x(435,n.tag))}return Jf(t,i,r),Nc(),!1}if(ye)return e=hn.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=r,i!==Yd&&(t=Error(x(422),{cause:i}),il(vn(t,n)))):(i!==Yd&&(e=Error(x(423),{cause:i}),il(vn(e,n))),t=t.current.alternate,t.flags|=65536,r&=-r,t.lanes|=r,i=vn(i,n),r=am(t.stateNode,i,r),zf(t,r),We!==4&&(We=2)),!1;var s=Error(x(520),{cause:i});if(s=vn(s,n),jo===null?jo=[s]:jo.push(s),We!==4&&(We=2),e===null)return!0;i=vn(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=r&-r,n.lanes|=t,t=am(n.stateNode,i,t),zf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(hr===null||!hr.has(s))))return n.flags|=65536,r&=-r,n.lanes|=r,r=_S(r),vS(r,t,n,i),zf(n,r),!1}n=n.return}while(n!==null);return!1}var zp=Error(x(461)),lt=!1;function vt(t,e,n,i){e.child=t===null?V0(e,null,n,i):ss(e,t.child,n,i)}function G_(t,e,n,i,r){n=n.render;var s=e.ref;if("ref"in i){var a={};for(var l in i)l!=="ref"&&(a[l]=i[l])}else a=i;return rs(e),i=Ip(t,e,n,a,s,r),l=Cp(),t!==null&&!lt?(Dp(t,e,r),Ri(t,e,r)):(ye&&l&&vp(e),e.flags|=1,vt(t,e,i,r),e.child)}function K_(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!_p(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,ES(t,e,s,i,r)):(t=Hu(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Bp(t,r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:tl,n(a,i)&&t.ref===e.ref)return Ri(t,e,r)}return e.flags|=1,t=yi(s,i),t.ref=e.ref,t.return=e,e.child=t}function ES(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(tl(s,i)&&t.ref===e.ref)if(lt=!1,e.pendingProps=i=s,Bp(t,r))t.flags&131072&&(lt=!0);else return e.lanes=t.lanes,Ri(t,e,r)}return om(t,e,n,i,r)}function TS(t,e,n,i){var r=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,r=0;i!==null;)r=r|i.lanes|i.childLanes,i=i.sibling;i=r&~s}else i=0,e.child=null;return Y_(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Fu(e,s!==null?s.cachePool:null),s!==null?P_(e,s):em(),L0(e);else return i=e.lanes=536870912,Y_(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Fu(e,s.cachePool),P_(e,s),Qi(),e.memoizedState=null):(t!==null&&Fu(e,null),em(),Qi());return vt(t,e,r,n),e.child}function bo(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Y_(t,e,n,i,r){var s=Sp();return s=s===null?null:{parent:at._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Fu(e,null),em(),L0(e),t!==null&&ka(t,e,i,!0),e.childLanes=r,null}function Ku(t,e){return e=Rc({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function $_(t,e,n){return ss(e,t.child,null,n),t=Ku(e,e.pendingProps),t.flags|=2,en(e),e.memoizedState=null,t}function y1(t,e,n){var i=e.pendingProps,r=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ye){if(i.mode==="hidden")return t=Ku(e,i),e.lanes=536870912,bo(null,t);if(tm(e),(t=xe)?(t=dA(t,En),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:vr!==null?{id:Hn,overflow:Fn}:null,retryLane:536870912,hydrationErrors:null},n=R0(t),n.return=e,e.child=n,At=e,xe=null)):t=null,t===null)throw Er(e);return e.lanes=536870912,null}return Ku(e,i)}var s=t.memoizedState;if(s!==null){var a=s.dehydrated;if(tm(e),r)if(e.flags&256)e.flags&=-257,e=$_(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(x(558));else if(lt||ka(t,e,n,!1),r=(n&t.childLanes)!==0,lt||r){if(i=Ne,i!==null&&(a=JT(i,n),a!==0&&a!==s.retryLane))throw s.retryLane=a,Es(t,a),$t(i,t,a),zp;Nc(),e=$_(t,e,n)}else t=s.treeContext,xe=An(a.nextSibling),At=e,ye=!0,lr=null,En=!1,t!==null&&C0(e,t),e=Ku(e,i),e.flags|=4096;return e}return t=yi(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Yu(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(x(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function om(t,e,n,i,r){return rs(e),n=Ip(t,e,n,i,void 0,r),i=Cp(),t!==null&&!lt?(Dp(t,e,r),Ri(t,e,r)):(ye&&i&&vp(e),e.flags|=1,vt(t,e,n,r),e.child)}function Q_(t,e,n,i,r,s){return rs(e),e.updateQueue=null,n=x0(e,i,n,r),U0(t),i=Cp(),t!==null&&!lt?(Dp(t,e,s),Ri(t,e,s)):(ye&&i&&vp(e),e.flags|=1,vt(t,e,n,s),e.child)}function X_(t,e,n,i,r){if(rs(e),e.stateNode===null){var s=Xs,a=n.contextType;typeof a=="object"&&a!==null&&(s=bt(a)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=sm,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},wp(e),a=n.contextType,s.context=typeof a=="object"&&a!==null?bt(a):Xs,s.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(qf(e,n,a,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(a=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),a!==s.state&&sm.enqueueReplaceState(s,s.state,null),Bo(e,i,s,r),zo(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var l=e.memoizedProps,u=os(n,l);s.props=u;var c=s.context,f=n.contextType;a=Xs,typeof f=="object"&&f!==null&&(a=bt(f));var m=n.getDerivedStateFromProps;f=typeof m=="function"||typeof s.getSnapshotBeforeUpdate=="function",l=e.pendingProps!==l,f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l||c!==a)&&F_(e,s,i,a),Ki=!1;var p=e.memoizedState;s.state=p,Bo(e,i,s,r),zo(),c=e.memoizedState,l||p!==c||Ki?(typeof m=="function"&&(qf(e,n,m,i),c=e.memoizedState),(u=Ki||H_(e,n,u,i,p,c,a))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=a,i=u):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,Jd(t,e),a=e.memoizedProps,f=os(n,a),s.props=f,m=e.pendingProps,p=s.context,c=n.contextType,u=Xs,typeof c=="object"&&c!==null&&(u=bt(c)),l=n.getDerivedStateFromProps,(c=typeof l=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==m||p!==u)&&F_(e,s,i,u),Ki=!1,p=e.memoizedState,s.state=p,Bo(e,i,s,r),zo();var y=e.memoizedState;a!==m||p!==y||Ki||t!==null&&t.dependencies!==null&&vc(t.dependencies)?(typeof l=="function"&&(qf(e,n,l,i),y=e.memoizedState),(f=Ki||H_(e,n,f,i,p,y,u)||t!==null&&t.dependencies!==null&&vc(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,y,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,y,u)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=y),s.props=i,s.state=y,s.context=u,i=f):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,Yu(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=ss(e,t.child,null,r),e.child=ss(e,null,n,r)):vt(t,e,n,r),e.memoizedState=s.state,t=e.child):t=Ri(t,e,r),t}function W_(t,e,n,i){return is(),e.flags|=256,vt(t,e,n,i),e.child}var Hf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ff(t){return{baseLanes:t,cachePool:N0()}}function jf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=rn),t}function SS(t,e,n){var i=e.pendingProps,r=!1,s=(e.flags&128)!==0,a;if((a=s)||(a=t!==null&&t.memoizedState===null?!1:(tt.current&2)!==0),a&&(r=!0,e.flags&=-129),a=(e.flags&32)!==0,e.flags&=-33,t===null){if(ye){if(r?$i(e):Qi(),(t=xe)?(t=dA(t,En),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:vr!==null?{id:Hn,overflow:Fn}:null,retryLane:536870912,hydrationErrors:null},n=R0(t),n.return=e,e.child=n,At=e,xe=null)):t=null,t===null)throw Er(e);return Tm(t)?e.lanes=32:e.lanes=536870912,null}var l=i.children;return i=i.fallback,r?(Qi(),r=e.mode,l=Rc({mode:"hidden",children:l},r),i=Wr(i,r,n,null),l.return=e,i.return=e,l.sibling=i,e.child=l,i=e.child,i.memoizedState=Ff(n),i.childLanes=jf(t,a,n),e.memoizedState=Hf,bo(null,i)):($i(e),lm(e,l))}var u=t.memoizedState;if(u!==null&&(l=u.dehydrated,l!==null)){if(s)e.flags&256?($i(e),e.flags&=-257,e=Gf(t,e,n)):e.memoizedState!==null?(Qi(),e.child=t.child,e.flags|=128,e=null):(Qi(),l=i.fallback,r=e.mode,i=Rc({mode:"visible",children:i.children},r),l=Wr(l,r,n,null),l.flags|=2,i.return=e,l.return=e,i.sibling=l,e.child=i,ss(e,t.child,null,n),i=e.child,i.memoizedState=Ff(n),i.childLanes=jf(t,a,n),e.memoizedState=Hf,e=bo(null,i));else if($i(e),Tm(l)){if(a=l.nextSibling&&l.nextSibling.dataset,a)var c=a.dgst;a=c,i=Error(x(419)),i.stack="",i.digest=a,il({value:i,source:null,stack:null}),e=Gf(t,e,n)}else if(lt||ka(t,e,n,!1),a=(n&t.childLanes)!==0,lt||a){if(a=Ne,a!==null&&(i=JT(a,n),i!==0&&i!==u.retryLane))throw u.retryLane=i,Es(t,i),$t(a,t,i),zp;Em(l)||Nc(),e=Gf(t,e,n)}else Em(l)?(e.flags|=192,e.child=t.child,e=null):(t=u.treeContext,xe=An(l.nextSibling),At=e,ye=!0,lr=null,En=!1,t!==null&&C0(e,t),e=lm(e,i.children),e.flags|=4096);return e}return r?(Qi(),l=i.fallback,r=e.mode,u=t.child,c=u.sibling,i=yi(u,{mode:"hidden",children:i.children}),i.subtreeFlags=u.subtreeFlags&65011712,c!==null?l=yi(c,l):(l=Wr(l,r,n,null),l.flags|=2),l.return=e,i.return=e,i.sibling=l,e.child=i,bo(null,i),i=e.child,l=t.child.memoizedState,l===null?l=Ff(n):(r=l.cachePool,r!==null?(u=at._currentValue,r=r.parent!==u?{parent:u,pool:u}:r):r=N0(),l={baseLanes:l.baseLanes|n,cachePool:r}),i.memoizedState=l,i.childLanes=jf(t,a,n),e.memoizedState=Hf,bo(t.child,i)):($i(e),n=t.child,t=n.sibling,n=yi(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(a=e.deletions,a===null?(e.deletions=[t],e.flags|=16):a.push(t)),e.child=n,e.memoizedState=null,n)}function lm(t,e){return e=Rc({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Rc(t,e){return t=tn(22,t,null,e),t.lanes=0,t}function Gf(t,e,n){return ss(e,t.child,null,n),t=lm(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function J_(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Qd(t.return,e,n)}function Kf(t,e,n,i,r,s){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r,treeForkCount:s}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r,a.treeForkCount=s)}function AS(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;i=i.children;var a=tt.current,l=(a&2)!==0;if(l?(a=a&1|2,e.flags|=128):a&=1,Ve(tt,a),vt(t,e,i,n),i=ye?nl:0,!l&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&J_(t,n,e);else if(t.tag===19)J_(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Sc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Kf(e,!1,r,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Sc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Kf(e,!0,n,null,s,i);break;case"together":Kf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Ri(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Sr|=e.lanes,!(n&e.childLanes))if(t!==null){if(ka(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(x(153));if(e.child!==null){for(t=e.child,n=yi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=yi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Bp(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&vc(t)))}function _1(t,e,n){switch(e.tag){case 3:fc(e,e.stateNode.containerInfo),Yi(e,at,t.memoizedState.cache),is();break;case 27:case 5:Ld(e);break;case 4:fc(e,e.stateNode.containerInfo);break;case 10:Yi(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,tm(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?($i(e),e.flags|=128,null):n&e.child.childLanes?SS(t,e,n):($i(e),t=Ri(t,e,n),t!==null?t.sibling:null);$i(e);break;case 19:var r=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(ka(t,e,n,!1),i=(n&e.childLanes)!==0),r){if(i)return AS(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Ve(tt,tt.current),i)break;return null;case 22:return e.lanes=0,TS(t,e,n,e.pendingProps);case 24:Yi(e,at,t.memoizedState.cache)}return Ri(t,e,n)}function wS(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)lt=!0;else{if(!Bp(t,n)&&!(e.flags&128))return lt=!1,_1(t,e,n);lt=!!(t.flags&131072)}else lt=!1,ye&&e.flags&1048576&&I0(e,nl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Gr(e.elementType),e.type=t,typeof t=="function")_p(t)?(i=os(t,i),e.tag=1,e=X_(null,e,t,i,n)):(e.tag=0,e=om(null,e,t,i,n));else{if(t!=null){var r=t.$$typeof;if(r===rp){e.tag=11,e=G_(null,e,t,i,n);break e}else if(r===sp){e.tag=14,e=K_(null,e,t,i,n);break e}}throw e=kd(t)||t,Error(x(306,e,""))}}return e;case 0:return om(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,r=os(i,e.pendingProps),X_(t,e,i,r,n);case 3:e:{if(fc(e,e.stateNode.containerInfo),t===null)throw Error(x(387));i=e.pendingProps;var s=e.memoizedState;r=s.element,Jd(t,e),Bo(e,i,null,n);var a=e.memoizedState;if(i=a.cache,Yi(e,at,i),i!==s.cache&&Xd(e,[at],n,!0),zo(),i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=W_(t,e,i,n);break e}else if(i!==r){r=vn(Error(x(424)),e),il(r),e=W_(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(xe=An(t.firstChild),At=e,ye=!0,lr=null,En=!0,n=V0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(is(),i===r){e=Ri(t,e,n);break e}vt(t,e,i,n)}e=e.child}return e;case 26:return Yu(t,e),t===null?(n=_v(e.type,null,e.pendingProps,null))?e.memoizedState=n:ye||(n=e.type,t=e.pendingProps,i=kc(or.current).createElement(n),i[St]=e,i[Xt]=t,Rt(i,n,t),yt(i),e.stateNode=i):e.memoizedState=_v(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Ld(e),t===null&&ye&&(i=e.stateNode=mA(e.type,e.pendingProps,or.current),At=e,En=!0,r=xe,Nr(e.type)?(Sm=r,xe=An(i.firstChild)):xe=r),vt(t,e,e.pendingProps.children,n),Yu(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ye&&((r=i=xe)&&(i=$1(i,e.type,e.pendingProps,En),i!==null?(e.stateNode=i,At=e,xe=An(i.firstChild),En=!1,r=!0):r=!1),r||Er(e)),Ld(e),r=e.type,s=e.pendingProps,a=t!==null?t.memoizedProps:null,i=s.children,_m(r,s)?i=null:a!==null&&_m(r,a)&&(e.flags|=32),e.memoizedState!==null&&(r=Ip(t,e,u1,null,null,n),ul._currentValue=r),Yu(t,e),vt(t,e,i,n),e.child;case 6:return t===null&&ye&&((t=n=xe)&&(n=Q1(n,e.pendingProps,En),n!==null?(e.stateNode=n,At=e,xe=null,t=!0):t=!1),t||Er(e)),null;case 13:return SS(t,e,n);case 4:return fc(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=ss(e,null,i,n):vt(t,e,i,n),e.child;case 11:return G_(t,e,e.type,e.pendingProps,n);case 7:return vt(t,e,e.pendingProps,n),e.child;case 8:return vt(t,e,e.pendingProps.children,n),e.child;case 12:return vt(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,Yi(e,e.type,i.value),vt(t,e,i.children,n),e.child;case 9:return r=e.type._context,i=e.pendingProps.children,rs(e),r=bt(r),i=i(r),e.flags|=1,vt(t,e,i,n),e.child;case 14:return K_(t,e,e.type,e.pendingProps,n);case 15:return ES(t,e,e.type,e.pendingProps,n);case 19:return AS(t,e,n);case 31:return y1(t,e,n);case 22:return TS(t,e,n,e.pendingProps);case 24:return rs(e),i=bt(at),t===null?(r=Sp(),r===null&&(r=Ne,s=Tp(),r.pooledCache=s,s.refCount++,s!==null&&(r.pooledCacheLanes|=n),r=s),e.memoizedState={parent:i,cache:r},wp(e),Yi(e,at,r)):(t.lanes&n&&(Jd(t,e),Bo(e,null,null,n),zo()),r=t.memoizedState,s=e.memoizedState,r.parent!==i?(r={parent:i,cache:i},e.memoizedState=r,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=r),Yi(e,at,i)):(i=s.cache,Yi(e,at,i),i!==r.cache&&Xd(e,[at],n,!0))),vt(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(x(156,e.tag))}function si(t){t.flags|=4}function Yf(t,e,n,i,r){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(r&335544128)===r)if(t.stateNode.complete)t.flags|=8192;else if($S())t.flags|=8192;else throw Zr=Ec,Ap}else t.flags&=-16777217}function Z_(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!yA(e))if($S())t.flags|=8192;else throw Zr=Ec,Ap}function wu(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?QT():536870912,t.lanes|=e,va|=e)}function yo(t,e){if(!ye)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Ue(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&65011712,i|=r.flags&65011712,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function v1(t,e,n){var i=e.pendingProps;switch(Ep(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(e),null;case 1:return Ue(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),_i(at),da(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Vs(e)?si(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,xf())),Ue(e),null;case 26:var r=e.type,s=e.memoizedState;return t===null?(si(e),s!==null?(Ue(e),Z_(e,s)):(Ue(e),Yf(e,r,null,i,n))):s?s!==t.memoizedState?(si(e),Ue(e),Z_(e,s)):(Ue(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&si(e),Ue(e),Yf(e,r,t,i,n)),null;case 27:if(dc(e),n=or.current,r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&si(e);else{if(!i){if(e.stateNode===null)throw Error(x(166));return Ue(e),null}t=Gn.current,Vs(e)?C_(e):(t=mA(r,i,n),e.stateNode=t,si(e))}return Ue(e),null;case 5:if(dc(e),r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&si(e);else{if(!i){if(e.stateNode===null)throw Error(x(166));return Ue(e),null}if(s=Gn.current,Vs(e))C_(e);else{var a=kc(or.current);switch(s){case 1:s=a.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:s=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":s=a.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":s=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":s=a.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?a.createElement("select",{is:i.is}):a.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?a.createElement(r,{is:i.is}):a.createElement(r)}}s[St]=e,s[Xt]=i;e:for(a=e.child;a!==null;){if(a.tag===5||a.tag===6)s.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)break e;for(;a.sibling===null;){if(a.return===null||a.return===e)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}e.stateNode=s;e:switch(Rt(s,r,i),r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&si(e)}}return Ue(e),Yf(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&si(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(x(166));if(t=or.current,Vs(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,r=At,r!==null)switch(r.tag){case 27:case 5:i=r.memoizedProps}t[St]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||cA(t.nodeValue,n)),t||Er(e,!0)}else t=kc(t).createTextNode(i),t[St]=e,e.stateNode=t}return Ue(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=Vs(e),n!==null){if(t===null){if(!i)throw Error(x(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(557));t[St]=e}else is(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ue(e),t=!1}else n=xf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(en(e),e):(en(e),null);if(e.flags&128)throw Error(x(558))}return Ue(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(r=Vs(e),i!==null&&i.dehydrated!==null){if(t===null){if(!r)throw Error(x(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(x(317));r[St]=e}else is(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ue(e),r=!1}else r=xf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),r=!0;if(!r)return e.flags&256?(en(e),e):(en(e),null)}return en(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,r=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(r=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==r&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),wu(e,e.updateQueue),Ue(e),null);case 4:return da(),t===null&&Yp(e.stateNode.containerInfo),Ue(e),null;case 10:return _i(e.type),Ue(e),null;case 19:if(_t(tt),i=e.memoizedState,i===null)return Ue(e),null;if(r=(e.flags&128)!==0,s=i.rendering,s===null)if(r)yo(i,!1);else{if(We!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Sc(t),s!==null){for(e.flags|=128,yo(i,!1),t=s.updateQueue,e.updateQueue=t,wu(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)b0(n,t),n=n.sibling;return Ve(tt,tt.current&1|2),ye&&ci(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&an()>Cc&&(e.flags|=128,r=!0,yo(i,!1),e.lanes=4194304)}else{if(!r)if(t=Sc(s),t!==null){if(e.flags|=128,r=!0,t=t.updateQueue,e.updateQueue=t,wu(e,t),yo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!ye)return Ue(e),null}else 2*an()-i.renderingStartTime>Cc&&n!==536870912&&(e.flags|=128,r=!0,yo(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=an(),t.sibling=null,n=tt.current,Ve(tt,r?n&1|2:n&1),ye&&ci(e,i.treeForkCount),t):(Ue(e),null);case 22:case 23:return en(e),bp(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(Ue(e),e.subtreeFlags&6&&(e.flags|=8192)):Ue(e),n=e.updateQueue,n!==null&&wu(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&_t(Jr),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),_i(at),Ue(e),null;case 25:return null;case 30:return null}throw Error(x(156,e.tag))}function E1(t,e){switch(Ep(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return _i(at),da(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return dc(e),null;case 31:if(e.memoizedState!==null){if(en(e),e.alternate===null)throw Error(x(340));is()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(en(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(x(340));is()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return _t(tt),null;case 4:return da(),null;case 10:return _i(e.type),null;case 22:case 23:return en(e),bp(),t!==null&&_t(Jr),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return _i(at),null;case 25:return null;default:return null}}function bS(t,e){switch(Ep(e),e.tag){case 3:_i(at),da();break;case 26:case 27:case 5:dc(e);break;case 4:da();break;case 31:e.memoizedState!==null&&en(e);break;case 13:en(e);break;case 19:_t(tt);break;case 10:_i(e.type);break;case 22:case 23:en(e),bp(),t!==null&&_t(Jr);break;case 24:_i(at)}}function Ol(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var r=i.next;n=r;do{if((n.tag&t)===t){i=void 0;var s=n.create,a=n.inst;i=s(),a.destroy=i}n=n.next}while(n!==r)}}catch(l){we(e,e.return,l)}}function Tr(t,e,n){try{var i=e.updateQueue,r=i!==null?i.lastEffect:null;if(r!==null){var s=r.next;i=s;do{if((i.tag&t)===t){var a=i.inst,l=a.destroy;if(l!==void 0){a.destroy=void 0,r=e;var u=n,c=l;try{c()}catch(f){we(r,u,f)}}}i=i.next}while(i!==s)}}catch(f){we(e,e.return,f)}}function RS(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{P0(e,n)}catch(i){we(t,t.return,i)}}}function IS(t,e,n){n.props=os(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){we(t,e,i)}}function Ho(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(r){we(t,e,r)}}function jn(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(r){we(t,e,r)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(r){we(t,e,r)}else n.current=null}function CS(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(r){we(t,t.return,r)}}function $f(t,e,n){try{var i=t.stateNode;H1(i,t.type,n,e),i[Xt]=e}catch(r){we(t,t.return,r)}}function DS(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Nr(t.type)||t.tag===4}function Qf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||DS(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Nr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function um(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=di));else if(i!==4&&(i===27&&Nr(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(um(t,e,n),t=t.sibling;t!==null;)um(t,e,n),t=t.sibling}function Ic(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&Nr(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ic(t,e,n),t=t.sibling;t!==null;)Ic(t,e,n),t=t.sibling}function NS(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,r=e.attributes;r.length;)e.removeAttributeNode(r[0]);Rt(e,i,n),e[St]=t,e[Xt]=n}catch(s){we(t,t.return,s)}}var hi=!1,st=!1,Xf=!1,ev=typeof WeakSet=="function"?WeakSet:Set,gt=null;function T1(t,e){if(t=t.containerInfo,gm=xc,t=y0(t),pp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,u=-1,c=0,f=0,m=t,p=null;t:for(;;){for(var y;m!==n||r!==0&&m.nodeType!==3||(l=a+r),m!==s||i!==0&&m.nodeType!==3||(u=a+i),m.nodeType===3&&(a+=m.nodeValue.length),(y=m.firstChild)!==null;)p=m,m=y;for(;;){if(m===t)break t;if(p===n&&++c===r&&(l=a),p===s&&++f===i&&(u=a),(y=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=y}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(ym={focusedElem:t,selectionRange:n},xc=!1,gt=e;gt!==null;)if(e=gt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,gt=t;else for(;gt!==null;){switch(e=gt,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)r=t[n],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,r=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var I=os(n.type,r);t=i.getSnapshotBeforeUpdate(I,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(N){we(n,n.return,N)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)vm(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":vm(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(x(163))}if(t=e.sibling,t!==null){t.return=e.return,gt=t;break}gt=e.return}}function OS(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:oi(t,n),i&4&&Ol(5,n);break;case 1:if(oi(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(a){we(n,n.return,a)}else{var r=os(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(r,e,t.__reactInternalSnapshotBeforeUpdate)}catch(a){we(n,n.return,a)}}i&64&&RS(n),i&512&&Ho(n,n.return);break;case 3:if(oi(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{P0(t,e)}catch(a){we(n,n.return,a)}}break;case 27:e===null&&i&4&&NS(n);case 26:case 5:oi(t,n),e===null&&i&4&&CS(n),i&512&&Ho(n,n.return);break;case 12:oi(t,n);break;case 31:oi(t,n),i&4&&kS(t,n);break;case 13:oi(t,n),i&4&&PS(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=N1.bind(null,n),X1(t,n))));break;case 22:if(i=n.memoizedState!==null||hi,!i){e=e!==null&&e.memoizedState!==null||st,r=hi;var s=st;hi=i,(st=e)&&!s?li(t,n,(n.subtreeFlags&8772)!==0):oi(t,n),hi=r,st=s}break;case 30:break;default:oi(t,n)}}function MS(t){var e=t.alternate;e!==null&&(t.alternate=null,MS(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&up(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ge=null,jt=!1;function ai(t,e,n){for(n=n.child;n!==null;)VS(t,e,n),n=n.sibling}function VS(t,e,n){if(on&&typeof on.onCommitFiberUnmount=="function")try{on.onCommitFiberUnmount(wl,n)}catch{}switch(n.tag){case 26:st||jn(n,e),ai(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:st||jn(n,e);var i=Ge,r=jt;Nr(n.type)&&(Ge=n.stateNode,jt=!1),ai(t,e,n),Ko(n.stateNode),Ge=i,jt=r;break;case 5:st||jn(n,e);case 6:if(i=Ge,r=jt,Ge=null,ai(t,e,n),Ge=i,jt=r,Ge!==null)if(jt)try{(Ge.nodeType===9?Ge.body:Ge.nodeName==="HTML"?Ge.ownerDocument.body:Ge).removeChild(n.stateNode)}catch(s){we(n,e,s)}else try{Ge.removeChild(n.stateNode)}catch(s){we(n,e,s)}break;case 18:Ge!==null&&(jt?(t=Ge,dv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Aa(t)):dv(Ge,n.stateNode));break;case 4:i=Ge,r=jt,Ge=n.stateNode.containerInfo,jt=!0,ai(t,e,n),Ge=i,jt=r;break;case 0:case 11:case 14:case 15:Tr(2,n,e),st||Tr(4,n,e),ai(t,e,n);break;case 1:st||(jn(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&IS(n,e,i)),ai(t,e,n);break;case 21:ai(t,e,n);break;case 22:st=(i=st)||n.memoizedState!==null,ai(t,e,n),st=i;break;default:ai(t,e,n)}}function kS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Aa(t)}catch(n){we(e,e.return,n)}}}function PS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Aa(t)}catch(n){we(e,e.return,n)}}function S1(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new ev),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new ev),e;default:throw Error(x(435,t.tag))}}function bu(t,e){var n=S1(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var r=O1.bind(null,t,i);i.then(r,r)}})}function Ht(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i],s=t,a=e,l=a;e:for(;l!==null;){switch(l.tag){case 27:if(Nr(l.type)){Ge=l.stateNode,jt=!1;break e}break;case 5:Ge=l.stateNode,jt=!1;break e;case 3:case 4:Ge=l.stateNode.containerInfo,jt=!0;break e}l=l.return}if(Ge===null)throw Error(x(160));VS(s,a,r),Ge=null,jt=!1,s=r.alternate,s!==null&&(s.return=null),r.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)LS(e,t),e=e.sibling}var In=null;function LS(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ht(e,t),Ft(t),i&4&&(Tr(3,t,t.return),Ol(3,t),Tr(5,t,t.return));break;case 1:Ht(e,t),Ft(t),i&512&&(st||n===null||jn(n,n.return)),i&64&&hi&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var r=In;if(Ht(e,t),Ft(t),i&512&&(st||n===null||jn(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,r=r.ownerDocument||r;t:switch(i){case"title":s=r.getElementsByTagName("title")[0],(!s||s[Il]||s[St]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=r.createElement(i),r.head.insertBefore(s,r.querySelector("head > title"))),Rt(s,i,n),s[St]=t,yt(s),i=s;break e;case"link":var a=Ev("link","href",r).get(i+(n.href||""));if(a){for(var l=0;l<a.length;l++)if(s=a[l],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(l,1);break t}}s=r.createElement(i),Rt(s,i,n),r.head.appendChild(s);break;case"meta":if(a=Ev("meta","content",r).get(i+(n.content||""))){for(l=0;l<a.length;l++)if(s=a[l],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(l,1);break t}}s=r.createElement(i),Rt(s,i,n),r.head.appendChild(s);break;default:throw Error(x(468,i))}s[St]=t,yt(s),i=s}t.stateNode=i}else Tv(r,t.type,t.stateNode);else t.stateNode=vv(r,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?Tv(r,t.type,t.stateNode):vv(r,i,t.memoizedProps)):i===null&&t.stateNode!==null&&$f(t,t.memoizedProps,n.memoizedProps)}break;case 27:Ht(e,t),Ft(t),i&512&&(st||n===null||jn(n,n.return)),n!==null&&i&4&&$f(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Ht(e,t),Ft(t),i&512&&(st||n===null||jn(n,n.return)),t.flags&32){r=t.stateNode;try{pa(r,"")}catch(I){we(t,t.return,I)}}i&4&&t.stateNode!=null&&(r=t.memoizedProps,$f(t,r,n!==null?n.memoizedProps:r)),i&1024&&(Xf=!0);break;case 6:if(Ht(e,t),Ft(t),i&4){if(t.stateNode===null)throw Error(x(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(I){we(t,t.return,I)}}break;case 3:if(Xu=null,r=In,In=Pc(e.containerInfo),Ht(e,t),In=r,Ft(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Aa(e.containerInfo)}catch(I){we(t,t.return,I)}Xf&&(Xf=!1,US(t));break;case 4:i=In,In=Pc(t.stateNode.containerInfo),Ht(e,t),Ft(t),In=i;break;case 12:Ht(e,t),Ft(t);break;case 31:Ht(e,t),Ft(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,bu(t,i)));break;case 13:Ht(e,t),Ft(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(wh=an()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,bu(t,i)));break;case 22:r=t.memoizedState!==null;var u=n!==null&&n.memoizedState!==null,c=hi,f=st;if(hi=c||r,st=f||u,Ht(e,t),st=f,hi=c,Ft(t),i&8192)e:for(e=t.stateNode,e._visibility=r?e._visibility&-2:e._visibility|1,r&&(n===null||u||hi||st||Kr(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){u=n=e;try{if(s=u.stateNode,r)a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none";else{l=u.stateNode;var m=u.memoizedProps.style,p=m!=null&&m.hasOwnProperty("display")?m.display:null;l.style.display=p==null||typeof p=="boolean"?"":(""+p).trim()}}catch(I){we(u,u.return,I)}}}else if(e.tag===6){if(n===null){u=e;try{u.stateNode.nodeValue=r?"":u.memoizedProps}catch(I){we(u,u.return,I)}}}else if(e.tag===18){if(n===null){u=e;try{var y=u.stateNode;r?mv(y,!0):mv(u.stateNode,!1)}catch(I){we(u,u.return,I)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,bu(t,n))));break;case 19:Ht(e,t),Ft(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,bu(t,i)));break;case 30:break;case 21:break;default:Ht(e,t),Ft(t)}}function Ft(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(DS(i)){n=i;break}i=i.return}if(n==null)throw Error(x(160));switch(n.tag){case 27:var r=n.stateNode,s=Qf(t);Ic(t,s,r);break;case 5:var a=n.stateNode;n.flags&32&&(pa(a,""),n.flags&=-33);var l=Qf(t);Ic(t,l,a);break;case 3:case 4:var u=n.stateNode.containerInfo,c=Qf(t);um(t,c,u);break;default:throw Error(x(161))}}catch(f){we(t,t.return,f)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function US(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;US(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function oi(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)OS(t,e.alternate,e),e=e.sibling}function Kr(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Tr(4,e,e.return),Kr(e);break;case 1:jn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&IS(e,e.return,n),Kr(e);break;case 27:Ko(e.stateNode);case 26:case 5:jn(e,e.return),Kr(e);break;case 22:e.memoizedState===null&&Kr(e);break;case 30:Kr(e);break;default:Kr(e)}t=t.sibling}}function li(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,r=t,s=e,a=s.flags;switch(s.tag){case 0:case 11:case 15:li(r,s,n),Ol(4,s);break;case 1:if(li(r,s,n),i=s,r=i.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(c){we(i,i.return,c)}if(i=s,r=i.updateQueue,r!==null){var l=i.stateNode;try{var u=r.shared.hiddenCallbacks;if(u!==null)for(r.shared.hiddenCallbacks=null,r=0;r<u.length;r++)k0(u[r],l)}catch(c){we(i,i.return,c)}}n&&a&64&&RS(s),Ho(s,s.return);break;case 27:NS(s);case 26:case 5:li(r,s,n),n&&i===null&&a&4&&CS(s),Ho(s,s.return);break;case 12:li(r,s,n);break;case 31:li(r,s,n),n&&a&4&&kS(r,s);break;case 13:li(r,s,n),n&&a&4&&PS(r,s);break;case 22:s.memoizedState===null&&li(r,s,n),Ho(s,s.return);break;case 30:break;default:li(r,s,n)}e=e.sibling}}function qp(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Dl(n))}function Hp(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Dl(t))}function Rn(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)xS(t,e,n,i),e=e.sibling}function xS(t,e,n,i){var r=e.flags;switch(e.tag){case 0:case 11:case 15:Rn(t,e,n,i),r&2048&&Ol(9,e);break;case 1:Rn(t,e,n,i);break;case 3:Rn(t,e,n,i),r&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Dl(t)));break;case 12:if(r&2048){Rn(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,a=s.id,l=s.onPostCommit;typeof l=="function"&&l(a,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(u){we(e,e.return,u)}}else Rn(t,e,n,i);break;case 31:Rn(t,e,n,i);break;case 13:Rn(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,a=e.alternate,e.memoizedState!==null?s._visibility&2?Rn(t,e,n,i):Fo(t,e):s._visibility&2?Rn(t,e,n,i):(s._visibility|=2,Ls(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),r&2048&&qp(a,e);break;case 24:Rn(t,e,n,i),r&2048&&Hp(e.alternate,e);break;default:Rn(t,e,n,i)}}function Ls(t,e,n,i,r){for(r=r&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,a=e,l=n,u=i,c=a.flags;switch(a.tag){case 0:case 11:case 15:Ls(s,a,l,u,r),Ol(8,a);break;case 23:break;case 22:var f=a.stateNode;a.memoizedState!==null?f._visibility&2?Ls(s,a,l,u,r):Fo(s,a):(f._visibility|=2,Ls(s,a,l,u,r)),r&&c&2048&&qp(a.alternate,a);break;case 24:Ls(s,a,l,u,r),r&&c&2048&&Hp(a.alternate,a);break;default:Ls(s,a,l,u,r)}e=e.sibling}}function Fo(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,r=i.flags;switch(i.tag){case 22:Fo(n,i),r&2048&&qp(i.alternate,i);break;case 24:Fo(n,i),r&2048&&Hp(i.alternate,i);break;default:Fo(n,i)}e=e.sibling}}var Ro=8192;function ks(t,e,n){if(t.subtreeFlags&Ro)for(t=t.child;t!==null;)zS(t,e,n),t=t.sibling}function zS(t,e,n){switch(t.tag){case 26:ks(t,e,n),t.flags&Ro&&t.memoizedState!==null&&lD(n,In,t.memoizedState,t.memoizedProps);break;case 5:ks(t,e,n);break;case 3:case 4:var i=In;In=Pc(t.stateNode.containerInfo),ks(t,e,n),In=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=Ro,Ro=16777216,ks(t,e,n),Ro=i):ks(t,e,n));break;default:ks(t,e,n)}}function BS(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function _o(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];gt=i,HS(i,t)}BS(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)qS(t),t=t.sibling}function qS(t){switch(t.tag){case 0:case 11:case 15:_o(t),t.flags&2048&&Tr(9,t,t.return);break;case 3:_o(t);break;case 12:_o(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,$u(t)):_o(t);break;default:_o(t)}}function $u(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];gt=i,HS(i,t)}BS(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Tr(8,e,e.return),$u(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,$u(e));break;default:$u(e)}t=t.sibling}}function HS(t,e){for(;gt!==null;){var n=gt;switch(n.tag){case 0:case 11:case 15:Tr(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Dl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,gt=i;else e:for(n=t;gt!==null;){i=gt;var r=i.sibling,s=i.return;if(MS(i),i===n){gt=null;break e}if(r!==null){r.return=s,gt=r;break e}gt=s}}}var A1={getCacheForType:function(t){var e=bt(at),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return bt(at).controller.signal}},w1=typeof WeakMap=="function"?WeakMap:Map,ve=0,Ne=null,he=null,ge=0,Ae=0,Zt=null,ir=!1,La=!1,Fp=!1,Ii=0,We=0,Sr=0,es=0,jp=0,rn=0,va=0,jo=null,Gt=null,cm=!1,wh=0,FS=0,Cc=1/0,Dc=null,hr=null,ht=0,fr=null,Ea=null,vi=0,hm=0,fm=null,jS=null,Go=0,dm=null;function un(){return ve&2&&ge!==0?ge&-ge:Z.T!==null?Kp():ZT()}function GS(){if(rn===0)if(!(ge&536870912)||ye){var t=yu;yu<<=1,!(yu&3932160)&&(yu=262144),rn=t}else rn=536870912;return t=hn.current,t!==null&&(t.flags|=32),rn}function $t(t,e,n){(t===Ne&&(Ae===2||Ae===9)||t.cancelPendingCommit!==null)&&(Ta(t,0),rr(t,ge,rn,!1)),Rl(t,n),(!(ve&2)||t!==Ne)&&(t===Ne&&(!(ve&2)&&(es|=n),We===4&&rr(t,ge,rn,!1)),ni(t))}function KS(t,e,n){if(ve&6)throw Error(x(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||bl(t,e),r=i?I1(t,e):Wf(t,e,!0),s=i;do{if(r===0){La&&!i&&rr(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!b1(n)){r=Wf(t,e,!1),s=!1;continue}if(r===2){if(s=e,t.errorRecoveryDisabledLanes&s)var a=0;else a=t.pendingLanes&-536870913,a=a!==0?a:a&536870912?536870912:0;if(a!==0){e=a;e:{var l=t;r=jo;var u=l.current.memoizedState.isDehydrated;if(u&&(Ta(l,a).flags|=256),a=Wf(l,a,!1),a!==2){if(Fp&&!u){l.errorRecoveryDisabledLanes|=s,es|=s,r=4;break e}s=Gt,Gt=r,s!==null&&(Gt===null?Gt=s:Gt.push.apply(Gt,s))}r=a}if(s=!1,r!==2)continue}}if(r===1){Ta(t,0),rr(t,e,0,!0);break}e:{switch(i=t,s=r,s){case 0:case 1:throw Error(x(345));case 4:if((e&4194048)!==e)break;case 6:rr(i,e,rn,!ir);break e;case 2:Gt=null;break;case 3:case 5:break;default:throw Error(x(329))}if((e&62914560)===e&&(r=wh+300-an(),10<r)){if(rr(i,e,rn,!ir),dh(i,0,!0)!==0)break e;vi=e,i.timeoutHandle=fA(tv.bind(null,i,n,Gt,Dc,cm,e,rn,es,va,ir,s,"Throttled",-0,0),r);break e}tv(i,n,Gt,Dc,cm,e,rn,es,va,ir,s,null,-0,0)}}break}while(!0);ni(t)}function tv(t,e,n,i,r,s,a,l,u,c,f,m,p,y){if(t.timeoutHandle=-1,m=e.subtreeFlags,m&8192||(m&16785408)===16785408){m={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:di},zS(e,s,m);var I=(s&62914560)===s?wh-an():(s&4194048)===s?FS-an():0;if(I=uD(m,I),I!==null){vi=s,t.cancelPendingCommit=I(iv.bind(null,t,e,s,n,i,r,a,l,u,f,m,null,p,y)),rr(t,s,a,!c);return}}iv(t,e,s,n,i,r,a,l,u)}function b1(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!cn(s(),r))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rr(t,e,n,i){e&=~jp,e&=~es,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var r=e;0<r;){var s=31-ln(r),a=1<<s;i[s]=-1,r&=~a}n!==0&&XT(t,n,e)}function bh(){return ve&6?!0:(Ml(0),!1)}function Gp(){if(he!==null){if(Ae===0)var t=he.return;else t=he,mi=Ts=null,Np(t),sa=null,rl=0,t=he;for(;t!==null;)bS(t.alternate,t),t=t.return;he=null}}function Ta(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,G1(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),vi=0,Gp(),Ne=t,he=n=yi(t.current,null),ge=e,Ae=0,Zt=null,ir=!1,La=bl(t,e),Fp=!1,va=rn=jp=es=Sr=We=0,Gt=jo=null,cm=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var r=31-ln(i),s=1<<r;e|=t[r],i&=~s}return Ii=e,yh(),n}function YS(t,e){se=null,Z.H=al,e===Pa||e===vh?(e=V_(),Ae=3):e===Ap?(e=V_(),Ae=4):Ae=e===zp?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Zt=e,he===null&&(We=1,bc(t,vn(e,t.current)))}function $S(){var t=hn.current;return t===null?!0:(ge&4194048)===ge?Sn===null:(ge&62914560)===ge||ge&536870912?t===Sn:!1}function QS(){var t=Z.H;return Z.H=al,t===null?al:t}function XS(){var t=Z.A;return Z.A=A1,t}function Nc(){We=4,ir||(ge&4194048)!==ge&&hn.current!==null||(La=!0),!(Sr&134217727)&&!(es&134217727)||Ne===null||rr(Ne,ge,rn,!1)}function Wf(t,e,n){var i=ve;ve|=2;var r=QS(),s=XS();(Ne!==t||ge!==e)&&(Dc=null,Ta(t,e)),e=!1;var a=We;e:do try{if(Ae!==0&&he!==null){var l=he,u=Zt;switch(Ae){case 8:Gp(),a=6;break e;case 3:case 2:case 9:case 6:hn.current===null&&(e=!0);var c=Ae;if(Ae=0,Zt=null,Zs(t,l,u,c),n&&La){a=0;break e}break;default:c=Ae,Ae=0,Zt=null,Zs(t,l,u,c)}}R1(),a=We;break}catch(f){YS(t,f)}while(!0);return e&&t.shellSuspendCounter++,mi=Ts=null,ve=i,Z.H=r,Z.A=s,he===null&&(Ne=null,ge=0,yh()),a}function R1(){for(;he!==null;)WS(he)}function I1(t,e){var n=ve;ve|=2;var i=QS(),r=XS();Ne!==t||ge!==e?(Dc=null,Cc=an()+500,Ta(t,e)):La=bl(t,e);e:do try{if(Ae!==0&&he!==null){e=he;var s=Zt;t:switch(Ae){case 1:Ae=0,Zt=null,Zs(t,e,s,1);break;case 2:case 9:if(M_(s)){Ae=0,Zt=null,nv(e);break}e=function(){Ae!==2&&Ae!==9||Ne!==t||(Ae=7),ni(t)},s.then(e,e);break e;case 3:Ae=7;break e;case 4:Ae=5;break e;case 7:M_(s)?(Ae=0,Zt=null,nv(e)):(Ae=0,Zt=null,Zs(t,e,s,7));break;case 5:var a=null;switch(he.tag){case 26:a=he.memoizedState;case 5:case 27:var l=he;if(a?yA(a):l.stateNode.complete){Ae=0,Zt=null;var u=l.sibling;if(u!==null)he=u;else{var c=l.return;c!==null?(he=c,Rh(c)):he=null}break t}}Ae=0,Zt=null,Zs(t,e,s,5);break;case 6:Ae=0,Zt=null,Zs(t,e,s,6);break;case 8:Gp(),We=6;break e;default:throw Error(x(462))}}C1();break}catch(f){YS(t,f)}while(!0);return mi=Ts=null,Z.H=i,Z.A=r,ve=n,he!==null?0:(Ne=null,ge=0,yh(),We)}function C1(){for(;he!==null&&!WI();)WS(he)}function WS(t){var e=wS(t.alternate,t,Ii);t.memoizedProps=t.pendingProps,e===null?Rh(t):he=e}function nv(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Q_(n,e,e.pendingProps,e.type,void 0,ge);break;case 11:e=Q_(n,e,e.pendingProps,e.type.render,e.ref,ge);break;case 5:Np(e);default:bS(n,e),e=he=b0(e,Ii),e=wS(n,e,Ii)}t.memoizedProps=t.pendingProps,e===null?Rh(t):he=e}function Zs(t,e,n,i){mi=Ts=null,Np(e),sa=null,rl=0;var r=e.return;try{if(g1(t,r,e,n,ge)){We=1,bc(t,vn(n,t.current)),he=null;return}}catch(s){if(r!==null)throw he=r,s;We=1,bc(t,vn(n,t.current)),he=null;return}e.flags&32768?(ye||i===1?t=!0:La||ge&536870912?t=!1:(ir=t=!0,(i===2||i===9||i===3||i===6)&&(i=hn.current,i!==null&&i.tag===13&&(i.flags|=16384))),JS(e,t)):Rh(e)}function Rh(t){var e=t;do{if(e.flags&32768){JS(e,ir);return}t=e.return;var n=v1(e.alternate,e,Ii);if(n!==null){he=n;return}if(e=e.sibling,e!==null){he=e;return}he=e=t}while(e!==null);We===0&&(We=5)}function JS(t,e){do{var n=E1(t.alternate,t);if(n!==null){n.flags&=32767,he=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){he=t;return}he=t=n}while(t!==null);We=6,he=null}function iv(t,e,n,i,r,s,a,l,u){t.cancelPendingCommit=null;do Ih();while(ht!==0);if(ve&6)throw Error(x(327));if(e!==null){if(e===t.current)throw Error(x(177));if(s=e.lanes|e.childLanes,s|=gp,oC(t,n,s,a,l,u),t===Ne&&(he=Ne=null,ge=0),Ea=e,fr=t,vi=n,hm=s,fm=r,jS=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,M1(mc,function(){return iA(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=Z.T,Z.T=null,r=Ee.p,Ee.p=2,a=ve,ve|=4;try{T1(t,e,n)}finally{ve=a,Ee.p=r,Z.T=i}}ht=1,ZS(),eA(),tA()}}function ZS(){if(ht===1){ht=0;var t=fr,e=Ea,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Z.T,Z.T=null;var i=Ee.p;Ee.p=2;var r=ve;ve|=4;try{LS(e,t);var s=ym,a=y0(t.containerInfo),l=s.focusedElem,u=s.selectionRange;if(a!==l&&l&&l.ownerDocument&&g0(l.ownerDocument.documentElement,l)){if(u!==null&&pp(l)){var c=u.start,f=u.end;if(f===void 0&&(f=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(f,l.value.length);else{var m=l.ownerDocument||document,p=m&&m.defaultView||window;if(p.getSelection){var y=p.getSelection(),I=l.textContent.length,N=Math.min(u.start,I),D=u.end===void 0?N:Math.min(u.end,I);!y.extend&&N>D&&(a=D,D=N,N=a);var v=b_(l,N),E=b_(l,D);if(v&&E&&(y.rangeCount!==1||y.anchorNode!==v.node||y.anchorOffset!==v.offset||y.focusNode!==E.node||y.focusOffset!==E.offset)){var A=m.createRange();A.setStart(v.node,v.offset),y.removeAllRanges(),N>D?(y.addRange(A),y.extend(E.node,E.offset)):(A.setEnd(E.node,E.offset),y.addRange(A))}}}}for(m=[],y=l;y=y.parentNode;)y.nodeType===1&&m.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<m.length;l++){var M=m[l];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}xc=!!gm,ym=gm=null}finally{ve=r,Ee.p=i,Z.T=n}}t.current=e,ht=2}}function eA(){if(ht===2){ht=0;var t=fr,e=Ea,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Z.T,Z.T=null;var i=Ee.p;Ee.p=2;var r=ve;ve|=4;try{OS(t,e.alternate,e)}finally{ve=r,Ee.p=i,Z.T=n}}ht=3}}function tA(){if(ht===4||ht===3){ht=0,JI();var t=fr,e=Ea,n=vi,i=jS;e.subtreeFlags&10256||e.flags&10256?ht=5:(ht=0,Ea=fr=null,nA(t,t.pendingLanes));var r=t.pendingLanes;if(r===0&&(hr=null),lp(n),e=e.stateNode,on&&typeof on.onCommitFiberRoot=="function")try{on.onCommitFiberRoot(wl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=Z.T,r=Ee.p,Ee.p=2,Z.T=null;try{for(var s=t.onRecoverableError,a=0;a<i.length;a++){var l=i[a];s(l.value,{componentStack:l.stack})}}finally{Z.T=e,Ee.p=r}}vi&3&&Ih(),ni(t),r=t.pendingLanes,n&261930&&r&42?t===dm?Go++:(Go=0,dm=t):Go=0,Ml(0)}}function nA(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Dl(e)))}function Ih(){return ZS(),eA(),tA(),iA()}function iA(){if(ht!==5)return!1;var t=fr,e=hm;hm=0;var n=lp(vi),i=Z.T,r=Ee.p;try{Ee.p=32>n?32:n,Z.T=null,n=fm,fm=null;var s=fr,a=vi;if(ht=0,Ea=fr=null,vi=0,ve&6)throw Error(x(331));var l=ve;if(ve|=4,qS(s.current),xS(s,s.current,a,n),ve=l,Ml(0,!1),on&&typeof on.onPostCommitFiberRoot=="function")try{on.onPostCommitFiberRoot(wl,s)}catch{}return!0}finally{Ee.p=r,Z.T=i,nA(t,e)}}function rv(t,e,n){e=vn(n,e),e=am(t.stateNode,e,2),t=cr(t,e,2),t!==null&&(Rl(t,2),ni(t))}function we(t,e,n){if(t.tag===3)rv(t,t,n);else for(;e!==null;){if(e.tag===3){rv(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(hr===null||!hr.has(i))){t=vn(n,t),n=_S(2),i=cr(e,n,2),i!==null&&(vS(n,i,e,t),Rl(i,2),ni(i));break}}e=e.return}}function Jf(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new w1;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(Fp=!0,r.add(n),t=D1.bind(null,t,e,n),e.then(t,t))}function D1(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Ne===t&&(ge&n)===n&&(We===4||We===3&&(ge&62914560)===ge&&300>an()-wh?!(ve&2)&&Ta(t,0):jp|=n,va===ge&&(va=0)),ni(t)}function rA(t,e){e===0&&(e=QT()),t=Es(t,e),t!==null&&(Rl(t,e),ni(t))}function N1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),rA(t,n)}function O1(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(x(314))}i!==null&&i.delete(e),rA(t,n)}function M1(t,e){return ap(t,e)}var Oc=null,Us=null,mm=!1,Mc=!1,Zf=!1,sr=0;function ni(t){t!==Us&&t.next===null&&(Us===null?Oc=Us=t:Us=Us.next=t),Mc=!0,mm||(mm=!0,k1())}function Ml(t,e){if(!Zf&&Mc){Zf=!0;do for(var n=!1,i=Oc;i!==null;){if(t!==0){var r=i.pendingLanes;if(r===0)var s=0;else{var a=i.suspendedLanes,l=i.pingedLanes;s=(1<<31-ln(42|t)+1)-1,s&=r&~(a&~l),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,sv(i,s))}else s=ge,s=dh(i,i===Ne?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||bl(i,s)||(n=!0,sv(i,s));i=i.next}while(n);Zf=!1}}function V1(){sA()}function sA(){Mc=mm=!1;var t=0;sr!==0&&j1()&&(t=sr);for(var e=an(),n=null,i=Oc;i!==null;){var r=i.next,s=aA(i,e);s===0?(i.next=null,n===null?Oc=r:n.next=r,r===null&&(Us=n)):(n=i,(t!==0||s&3)&&(Mc=!0)),i=r}ht!==0&&ht!==5||Ml(t),sr!==0&&(sr=0)}function aA(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var a=31-ln(s),l=1<<a,u=r[a];u===-1?(!(l&n)||l&i)&&(r[a]=aC(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}if(e=Ne,n=ge,n=dh(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(Ae===2||Ae===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&If(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||bl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&If(i),lp(n)){case 2:case 8:n=YT;break;case 32:n=mc;break;case 268435456:n=$T;break;default:n=mc}return i=oA.bind(null,t),n=ap(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&If(i),t.callbackPriority=2,t.callbackNode=null,2}function oA(t,e){if(ht!==0&&ht!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Ih()&&t.callbackNode!==n)return null;var i=ge;return i=dh(t,t===Ne?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(KS(t,i,e),aA(t,an()),t.callbackNode!=null&&t.callbackNode===n?oA.bind(null,t):null)}function sv(t,e){if(Ih())return null;KS(t,e,!0)}function k1(){K1(function(){ve&6?ap(KT,V1):sA()})}function Kp(){if(sr===0){var t=ga;t===0&&(t=gu,gu<<=1,!(gu&261888)&&(gu=256)),sr=t}return sr}function av(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:zu(""+t)}function ov(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function P1(t,e,n,i,r){if(e==="submit"&&n&&n.stateNode===r){var s=av((r[Xt]||null).action),a=i.submitter;a&&(e=(e=a[Xt]||null)?av(e.formAction):a.getAttribute("formAction"),e!==null&&(s=e,a=null));var l=new mh("action","action",null,i,r);t.push({event:l,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(sr!==0){var u=a?ov(r,a):new FormData(r);rm(n,{pending:!0,data:u,method:r.method,action:s},null,u)}}else typeof s=="function"&&(l.preventDefault(),u=a?ov(r,a):new FormData(r),rm(n,{pending:!0,data:u,method:r.method,action:s},s,u))},currentTarget:r}]})}}for(var ed=0;ed<Kd.length;ed++){var td=Kd[ed],L1=td.toLowerCase(),U1=td[0].toUpperCase()+td.slice(1);Pn(L1,"on"+U1)}Pn(v0,"onAnimationEnd");Pn(E0,"onAnimationIteration");Pn(T0,"onAnimationStart");Pn("dblclick","onDoubleClick");Pn("focusin","onFocus");Pn("focusout","onBlur");Pn(ZC,"onTransitionRun");Pn(e1,"onTransitionStart");Pn(t1,"onTransitionCancel");Pn(S0,"onTransitionEnd");ma("onMouseEnter",["mouseout","mouseover"]);ma("onMouseLeave",["mouseout","mouseover"]);ma("onPointerEnter",["pointerout","pointerover"]);ma("onPointerLeave",["pointerout","pointerover"]);ys("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ys("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ys("onBeforeInput",["compositionend","keypress","textInput","paste"]);ys("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ys("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ys("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ol="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),x1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ol));function lA(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var l=i[a],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==s&&r.isPropagationStopped())break e;s=l,r.currentTarget=c;try{s(r)}catch(f){gc(f)}r.currentTarget=null,s=u}else for(a=0;a<i.length;a++){if(l=i[a],u=l.instance,c=l.currentTarget,l=l.listener,u!==s&&r.isPropagationStopped())break e;s=l,r.currentTarget=c;try{s(r)}catch(f){gc(f)}r.currentTarget=null,s=u}}}}function ce(t,e){var n=e[xd];n===void 0&&(n=e[xd]=new Set);var i=t+"__bubble";n.has(i)||(uA(e,t,2,!1),n.add(i))}function nd(t,e,n){var i=0;e&&(i|=4),uA(n,t,i,e)}var Ru="_reactListening"+Math.random().toString(36).slice(2);function Yp(t){if(!t[Ru]){t[Ru]=!0,e0.forEach(function(n){n!=="selectionchange"&&(x1.has(n)||nd(n,!1,t),nd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ru]||(e[Ru]=!0,nd("selectionchange",!1,e))}}function uA(t,e,n,i){switch(SA(e)){case 2:var r=fD;break;case 8:r=dD;break;default:r=Wp}n=r.bind(null,e,n,t),r=void 0,!Fd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function id(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var l=i.stateNode.containerInfo;if(l===r)break;if(a===4)for(a=i.return;a!==null;){var u=a.tag;if((u===3||u===4)&&a.stateNode.containerInfo===r)return;a=a.return}for(;l!==null;){if(a=js(l),a===null)return;if(u=a.tag,u===5||u===6||u===26||u===27){i=s=a;continue e}l=l.parentNode}}i=i.return}l0(function(){var c=s,f=hp(n),m=[];e:{var p=A0.get(t);if(p!==void 0){var y=mh,I=t;switch(t){case"keypress":if(qu(n)===0)break e;case"keydown":case"keyup":y=OC;break;case"focusin":I="focus",y=Mf;break;case"focusout":I="blur",y=Mf;break;case"beforeblur":case"afterblur":y=Mf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=p_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=vC;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=kC;break;case v0:case E0:case T0:y=SC;break;case S0:y=LC;break;case"scroll":case"scrollend":y=yC;break;case"wheel":y=xC;break;case"copy":case"cut":case"paste":y=wC;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=y_;break;case"toggle":case"beforetoggle":y=BC}var N=(e&4)!==0,D=!N&&(t==="scroll"||t==="scrollend"),v=N?p!==null?p+"Capture":null:p;N=[];for(var E=c,A;E!==null;){var M=E;if(A=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||A===null||v===null||(M=Zo(E,v),M!=null&&N.push(ll(E,M,A))),D)break;E=E.return}0<N.length&&(p=new y(p,I,null,n,f),m.push({event:p,listeners:N}))}}if(!(e&7)){e:{if(p=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",p&&n!==Hd&&(I=n.relatedTarget||n.fromElement)&&(js(I)||I[Ma]))break e;if((y||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,y?(I=n.relatedTarget||n.toElement,y=c,I=I?js(I):null,I!==null&&(D=Al(I),N=I.tag,I!==D||N!==5&&N!==27&&N!==6)&&(I=null)):(y=null,I=c),y!==I)){if(N=p_,M="onMouseLeave",v="onMouseEnter",E="mouse",(t==="pointerout"||t==="pointerover")&&(N=y_,M="onPointerLeave",v="onPointerEnter",E="pointer"),D=y==null?p:wo(y),A=I==null?p:wo(I),p=new N(M,E+"leave",y,n,f),p.target=D,p.relatedTarget=A,M=null,js(f)===c&&(N=new N(v,E+"enter",I,n,f),N.target=A,N.relatedTarget=D,M=N),D=M,y&&I)t:{for(N=z1,v=y,E=I,A=0,M=v;M;M=N(M))A++;M=0;for(var B=E;B;B=N(B))M++;for(;0<A-M;)v=N(v),A--;for(;0<M-A;)E=N(E),M--;for(;A--;){if(v===E||E!==null&&v===E.alternate){N=v;break t}v=N(v),E=N(E)}N=null}else N=null;y!==null&&lv(m,p,y,N,!1),I!==null&&D!==null&&lv(m,D,I,N,!0)}}e:{if(p=c?wo(c):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var F=T_;else if(E_(p))if(m0)F=XC;else{F=$C;var T=YC}else y=p.nodeName,!y||y.toLowerCase()!=="input"||p.type!=="checkbox"&&p.type!=="radio"?c&&cp(c.elementType)&&(F=T_):F=QC;if(F&&(F=F(t,c))){d0(m,F,n,f);break e}T&&T(t,p,c),t==="focusout"&&c&&p.type==="number"&&c.memoizedProps.value!=null&&qd(p,"number",p.value)}switch(T=c?wo(c):window,t){case"focusin":(E_(T)||T.contentEditable==="true")&&(Ys=T,jd=c,Lo=null);break;case"focusout":Lo=jd=Ys=null;break;case"mousedown":Gd=!0;break;case"contextmenu":case"mouseup":case"dragend":Gd=!1,R_(m,n,f);break;case"selectionchange":if(JC)break;case"keydown":case"keyup":R_(m,n,f)}var _;if(mp)e:{switch(t){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else Ks?h0(t,n)&&(S="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(c0&&n.locale!=="ko"&&(Ks||S!=="onCompositionStart"?S==="onCompositionEnd"&&Ks&&(_=u0()):(nr=f,fp="value"in nr?nr.value:nr.textContent,Ks=!0)),T=Vc(c,S),0<T.length&&(S=new g_(S,t,null,n,f),m.push({event:S,listeners:T}),_?S.data=_:(_=f0(n),_!==null&&(S.data=_)))),(_=HC?FC(t,n):jC(t,n))&&(S=Vc(c,"onBeforeInput"),0<S.length&&(T=new g_("onBeforeInput","beforeinput",null,n,f),m.push({event:T,listeners:S}),T.data=_)),P1(m,t,c,n,f)}lA(m,e)})}function ll(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Vc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||s===null||(r=Zo(t,n),r!=null&&i.unshift(ll(t,r,s)),r=Zo(t,e),r!=null&&i.push(ll(t,r,s))),t.tag===3)return i;t=t.return}return[]}function z1(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function lv(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var l=n,u=l.alternate,c=l.stateNode;if(l=l.tag,u!==null&&u===i)break;l!==5&&l!==26&&l!==27||c===null||(u=c,r?(c=Zo(n,s),c!=null&&a.unshift(ll(n,c,u))):r||(c=Zo(n,s),c!=null&&a.push(ll(n,c,u)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var B1=/\r\n?/g,q1=/\u0000|\uFFFD/g;function uv(t){return(typeof t=="string"?t:""+t).replace(B1,`
`).replace(q1,"")}function cA(t,e){return e=uv(e),uv(t)===e}function Re(t,e,n,i,r,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||pa(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&pa(t,""+i);break;case"className":vu(t,"class",i);break;case"tabIndex":vu(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vu(t,n,i);break;case"style":o0(t,i,s);break;case"data":if(e!=="object"){vu(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=zu(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Re(t,e,"name",r.name,r,null),Re(t,e,"formEncType",r.formEncType,r,null),Re(t,e,"formMethod",r.formMethod,r,null),Re(t,e,"formTarget",r.formTarget,r,null)):(Re(t,e,"encType",r.encType,r,null),Re(t,e,"method",r.method,r,null),Re(t,e,"target",r.target,r,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=zu(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=di);break;case"onScroll":i!=null&&ce("scroll",t);break;case"onScrollEnd":i!=null&&ce("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(x(61));if(n=i.__html,n!=null){if(r.children!=null)throw Error(x(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=zu(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":ce("beforetoggle",t),ce("toggle",t),xu(t,"popover",i);break;case"xlinkActuate":ri(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ri(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ri(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ri(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ri(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ri(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ri(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ri(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ri(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":xu(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=pC.get(n)||n,xu(t,n,i))}}function pm(t,e,n,i,r,s){switch(n){case"style":o0(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(x(61));if(n=i.__html,n!=null){if(r.children!=null)throw Error(x(60));t.innerHTML=n}}break;case"children":typeof i=="string"?pa(t,i):(typeof i=="number"||typeof i=="bigint")&&pa(t,""+i);break;case"onScroll":i!=null&&ce("scroll",t);break;case"onScrollEnd":i!=null&&ce("scrollend",t);break;case"onClick":i!=null&&(t.onclick=di);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!t0.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(r=n.endsWith("Capture"),e=n.slice(2,r?n.length-7:void 0),s=t[Xt]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,r),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,r);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):xu(t,n,i)}}}function Rt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ce("error",t),ce("load",t);var i=!1,r=!1,s;for(s in n)if(n.hasOwnProperty(s)){var a=n[s];if(a!=null)switch(s){case"src":i=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(x(137,e));default:Re(t,e,s,a,n,null)}}r&&Re(t,e,"srcSet",n.srcSet,n,null),i&&Re(t,e,"src",n.src,n,null);return;case"input":ce("invalid",t);var l=s=a=r=null,u=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":r=f;break;case"type":a=f;break;case"checked":u=f;break;case"defaultChecked":c=f;break;case"value":s=f;break;case"defaultValue":l=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(x(137,e));break;default:Re(t,e,i,f,n,null)}}r0(t,s,l,u,c,a,r,!1);return;case"select":ce("invalid",t),i=a=s=null;for(r in n)if(n.hasOwnProperty(r)&&(l=n[r],l!=null))switch(r){case"value":s=l;break;case"defaultValue":a=l;break;case"multiple":i=l;default:Re(t,e,r,l,n,null)}e=s,n=a,t.multiple=!!i,e!=null?na(t,!!i,e,!1):n!=null&&na(t,!!i,n,!0);return;case"textarea":ce("invalid",t),s=r=i=null;for(a in n)if(n.hasOwnProperty(a)&&(l=n[a],l!=null))switch(a){case"value":i=l;break;case"defaultValue":r=l;break;case"children":s=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(x(91));break;default:Re(t,e,a,l,n,null)}a0(t,i,r,s);return;case"option":for(u in n)if(n.hasOwnProperty(u)&&(i=n[u],i!=null))switch(u){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Re(t,e,u,i,n,null)}return;case"dialog":ce("beforetoggle",t),ce("toggle",t),ce("cancel",t),ce("close",t);break;case"iframe":case"object":ce("load",t);break;case"video":case"audio":for(i=0;i<ol.length;i++)ce(ol[i],t);break;case"image":ce("error",t),ce("load",t);break;case"details":ce("toggle",t);break;case"embed":case"source":case"link":ce("error",t),ce("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(x(137,e));default:Re(t,e,c,i,n,null)}return;default:if(cp(e)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&pm(t,e,f,i,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null&&Re(t,e,l,i,n,null))}function H1(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,s=null,a=null,l=null,u=null,c=null,f=null;for(y in n){var m=n[y];if(n.hasOwnProperty(y)&&m!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":u=m;default:i.hasOwnProperty(y)||Re(t,e,y,null,i,m)}}for(var p in i){var y=i[p];if(m=n[p],i.hasOwnProperty(p)&&(y!=null||m!=null))switch(p){case"type":s=y;break;case"name":r=y;break;case"checked":c=y;break;case"defaultChecked":f=y;break;case"value":a=y;break;case"defaultValue":l=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(x(137,e));break;default:y!==m&&Re(t,e,p,y,i,m)}}Bd(t,a,l,u,c,f,s,r);return;case"select":y=a=l=p=null;for(s in n)if(u=n[s],n.hasOwnProperty(s)&&u!=null)switch(s){case"value":break;case"multiple":y=u;default:i.hasOwnProperty(s)||Re(t,e,s,null,i,u)}for(r in i)if(s=i[r],u=n[r],i.hasOwnProperty(r)&&(s!=null||u!=null))switch(r){case"value":p=s;break;case"defaultValue":l=s;break;case"multiple":a=s;default:s!==u&&Re(t,e,r,s,i,u)}e=l,n=a,i=y,p!=null?na(t,!!n,p,!1):!!i!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":y=p=null;for(l in n)if(r=n[l],n.hasOwnProperty(l)&&r!=null&&!i.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:Re(t,e,l,null,i,r)}for(a in i)if(r=i[a],s=n[a],i.hasOwnProperty(a)&&(r!=null||s!=null))switch(a){case"value":p=r;break;case"defaultValue":y=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(x(91));break;default:r!==s&&Re(t,e,a,r,i,s)}s0(t,p,y);return;case"option":for(var I in n)if(p=n[I],n.hasOwnProperty(I)&&p!=null&&!i.hasOwnProperty(I))switch(I){case"selected":t.selected=!1;break;default:Re(t,e,I,null,i,p)}for(u in i)if(p=i[u],y=n[u],i.hasOwnProperty(u)&&p!==y&&(p!=null||y!=null))switch(u){case"selected":t.selected=p&&typeof p!="function"&&typeof p!="symbol";break;default:Re(t,e,u,p,i,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var N in n)p=n[N],n.hasOwnProperty(N)&&p!=null&&!i.hasOwnProperty(N)&&Re(t,e,N,null,i,p);for(c in i)if(p=i[c],y=n[c],i.hasOwnProperty(c)&&p!==y&&(p!=null||y!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(x(137,e));break;default:Re(t,e,c,p,i,y)}return;default:if(cp(e)){for(var D in n)p=n[D],n.hasOwnProperty(D)&&p!==void 0&&!i.hasOwnProperty(D)&&pm(t,e,D,void 0,i,p);for(f in i)p=i[f],y=n[f],!i.hasOwnProperty(f)||p===y||p===void 0&&y===void 0||pm(t,e,f,p,i,y);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!i.hasOwnProperty(v)&&Re(t,e,v,null,i,p);for(m in i)p=i[m],y=n[m],!i.hasOwnProperty(m)||p===y||p==null&&y==null||Re(t,e,m,p,i,y)}function cv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function F1(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var r=n[i],s=r.transferSize,a=r.initiatorType,l=r.duration;if(s&&l&&cv(a)){for(a=0,l=r.responseEnd,i+=1;i<n.length;i++){var u=n[i],c=u.startTime;if(c>l)break;var f=u.transferSize,m=u.initiatorType;f&&cv(m)&&(u=u.responseEnd,a+=f*(u<l?1:(l-c)/(u-c)))}if(--i,e+=8*(s+a)/(r.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var gm=null,ym=null;function kc(t){return t.nodeType===9?t:t.ownerDocument}function hv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function hA(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function _m(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rd=null;function j1(){var t=window.event;return t&&t.type==="popstate"?t===rd?!1:(rd=t,!0):(rd=null,!1)}var fA=typeof setTimeout=="function"?setTimeout:void 0,G1=typeof clearTimeout=="function"?clearTimeout:void 0,fv=typeof Promise=="function"?Promise:void 0,K1=typeof queueMicrotask=="function"?queueMicrotask:typeof fv<"u"?function(t){return fv.resolve(null).then(t).catch(Y1)}:fA;function Y1(t){setTimeout(function(){throw t})}function Nr(t){return t==="head"}function dv(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(r),Aa(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Ko(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Ko(n);for(var s=n.firstChild;s;){var a=s.nextSibling,l=s.nodeName;s[Il]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=a}}else n==="body"&&Ko(t.ownerDocument.body);n=r}while(n);Aa(e)}function mv(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function vm(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":vm(n),up(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function $1(t,e,n,i){for(;t.nodeType===1;){var r=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[Il])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==r.rel||t.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||t.getAttribute("title")!==(r.title==null?null:r.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(r.src==null?null:r.src)||t.getAttribute("type")!==(r.type==null?null:r.type)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=r.name==null?null:""+r.name;if(r.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=An(t.nextSibling),t===null)break}return null}function Q1(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=An(t.nextSibling),t===null))return null;return t}function dA(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=An(t.nextSibling),t===null))return null;return t}function Em(t){return t.data==="$?"||t.data==="$~"}function Tm(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function X1(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function An(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Sm=null;function pv(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return An(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function gv(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function mA(t,e,n){switch(e=kc(n),t){case"html":if(t=e.documentElement,!t)throw Error(x(452));return t;case"head":if(t=e.head,!t)throw Error(x(453));return t;case"body":if(t=e.body,!t)throw Error(x(454));return t;default:throw Error(x(451))}}function Ko(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);up(t)}var wn=new Map,yv=new Set;function Pc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ki=Ee.d;Ee.d={f:W1,r:J1,D:Z1,C:eD,L:tD,m:nD,X:rD,S:iD,M:sD};function W1(){var t=ki.f(),e=bh();return t||e}function J1(t){var e=Va(t);e!==null&&e.tag===5&&e.type==="form"?oS(e):ki.r(t)}var Ua=typeof document>"u"?null:document;function pA(t,e,n){var i=Ua;if(i&&typeof e=="string"&&e){var r=_n(e);r='link[rel="'+t+'"][href="'+r+'"]',typeof n=="string"&&(r+='[crossorigin="'+n+'"]'),yv.has(r)||(yv.add(r),t={rel:t,crossOrigin:n,href:e},i.querySelector(r)===null&&(e=i.createElement("link"),Rt(e,"link",t),yt(e),i.head.appendChild(e)))}}function Z1(t){ki.D(t),pA("dns-prefetch",t,null)}function eD(t,e){ki.C(t,e),pA("preconnect",t,e)}function tD(t,e,n){ki.L(t,e,n);var i=Ua;if(i&&t&&e){var r='link[rel="preload"][as="'+_n(e)+'"]';e==="image"&&n&&n.imageSrcSet?(r+='[imagesrcset="'+_n(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(r+='[imagesizes="'+_n(n.imageSizes)+'"]')):r+='[href="'+_n(t)+'"]';var s=r;switch(e){case"style":s=Sa(t);break;case"script":s=xa(t)}wn.has(s)||(t=qe({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),wn.set(s,t),i.querySelector(r)!==null||e==="style"&&i.querySelector(Vl(s))||e==="script"&&i.querySelector(kl(s))||(e=i.createElement("link"),Rt(e,"link",t),yt(e),i.head.appendChild(e)))}}function nD(t,e){ki.m(t,e);var n=Ua;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",r='link[rel="modulepreload"][as="'+_n(i)+'"][href="'+_n(t)+'"]',s=r;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=xa(t)}if(!wn.has(s)&&(t=qe({rel:"modulepreload",href:t},e),wn.set(s,t),n.querySelector(r)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(kl(s)))return}i=n.createElement("link"),Rt(i,"link",t),yt(i),n.head.appendChild(i)}}}function iD(t,e,n){ki.S(t,e,n);var i=Ua;if(i&&t){var r=ta(i).hoistableStyles,s=Sa(t);e=e||"default";var a=r.get(s);if(!a){var l={loading:0,preload:null};if(a=i.querySelector(Vl(s)))l.loading=5;else{t=qe({rel:"stylesheet",href:t,"data-precedence":e},n),(n=wn.get(s))&&$p(t,n);var u=a=i.createElement("link");yt(u),Rt(u,"link",t),u._p=new Promise(function(c,f){u.onload=c,u.onerror=f}),u.addEventListener("load",function(){l.loading|=1}),u.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Qu(a,e,i)}a={type:"stylesheet",instance:a,count:1,state:l},r.set(s,a)}}}function rD(t,e){ki.X(t,e);var n=Ua;if(n&&t){var i=ta(n).hoistableScripts,r=xa(t),s=i.get(r);s||(s=n.querySelector(kl(r)),s||(t=qe({src:t,async:!0},e),(e=wn.get(r))&&Qp(t,e),s=n.createElement("script"),yt(s),Rt(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(r,s))}}function sD(t,e){ki.M(t,e);var n=Ua;if(n&&t){var i=ta(n).hoistableScripts,r=xa(t),s=i.get(r);s||(s=n.querySelector(kl(r)),s||(t=qe({src:t,async:!0,type:"module"},e),(e=wn.get(r))&&Qp(t,e),s=n.createElement("script"),yt(s),Rt(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(r,s))}}function _v(t,e,n,i){var r=(r=or.current)?Pc(r):null;if(!r)throw Error(x(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Sa(n.href),n=ta(r).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Sa(n.href);var s=ta(r).hoistableStyles,a=s.get(t);if(a||(r=r.ownerDocument||r,a={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,a),(s=r.querySelector(Vl(t)))&&!s._p&&(a.instance=s,a.state.loading=5),wn.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},wn.set(t,n),s||aD(r,t,n,a.state))),e&&i===null)throw Error(x(528,""));return a}if(e&&i!==null)throw Error(x(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=xa(n),n=ta(r).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(x(444,t))}}function Sa(t){return'href="'+_n(t)+'"'}function Vl(t){return'link[rel="stylesheet"]['+t+"]"}function gA(t){return qe({},t,{"data-precedence":t.precedence,precedence:null})}function aD(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),Rt(e,"link",n),yt(e),t.head.appendChild(e))}function xa(t){return'[src="'+_n(t)+'"]'}function kl(t){return"script[async]"+t}function vv(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+_n(n.href)+'"]');if(i)return e.instance=i,yt(i),i;var r=qe({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),yt(i),Rt(i,"style",r),Qu(i,n.precedence,t),e.instance=i;case"stylesheet":r=Sa(n.href);var s=t.querySelector(Vl(r));if(s)return e.state.loading|=4,e.instance=s,yt(s),s;i=gA(n),(r=wn.get(r))&&$p(i,r),s=(t.ownerDocument||t).createElement("link"),yt(s);var a=s;return a._p=new Promise(function(l,u){a.onload=l,a.onerror=u}),Rt(s,"link",i),e.state.loading|=4,Qu(s,n.precedence,t),e.instance=s;case"script":return s=xa(n.src),(r=t.querySelector(kl(s)))?(e.instance=r,yt(r),r):(i=n,(r=wn.get(s))&&(i=qe({},n),Qp(i,r)),t=t.ownerDocument||t,r=t.createElement("script"),yt(r),Rt(r,"link",i),t.head.appendChild(r),e.instance=r);case"void":return null;default:throw Error(x(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,Qu(i,n.precedence,t));return e.instance}function Qu(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=i.length?i[i.length-1]:null,s=r,a=0;a<i.length;a++){var l=i[a];if(l.dataset.precedence===e)s=l;else if(s!==r)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function $p(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Qp(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Xu=null;function Ev(t,e,n){if(Xu===null){var i=new Map,r=Xu=new Map;r.set(n,i)}else r=Xu,i=r.get(n),i||(i=new Map,r.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),r=0;r<n.length;r++){var s=n[r];if(!(s[Il]||s[St]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var a=s.getAttribute(e)||"";a=t+a;var l=i.get(a);l?l.push(s):i.set(a,[s])}}return i}function Tv(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function oD(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function yA(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function lD(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var r=Sa(i.href),s=e.querySelector(Vl(r));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Lc.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,yt(s);return}s=e.ownerDocument||e,i=gA(i),(r=wn.get(r))&&$p(i,r),s=s.createElement("link"),yt(s);var a=s;a._p=new Promise(function(l,u){a.onload=l,a.onerror=u}),Rt(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Lc.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var sd=0;function uD(t,e){return t.stylesheets&&t.count===0&&Wu(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&Wu(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&sd===0&&(sd=62500*F1());var r=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Wu(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>sd?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(r)}}:null}function Lc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Wu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Uc=null;function Wu(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Uc=new Map,e.forEach(cD,t),Uc=null,Lc.call(t))}function cD(t,e){if(!(e.state.loading&4)){var n=Uc.get(t);if(n)var i=n.get(null);else{n=new Map,Uc.set(t,n);for(var r=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<r.length;s++){var a=r[s];(a.nodeName==="LINK"||a.getAttribute("media")!=="not all")&&(n.set(a.dataset.precedence,a),i=a)}i&&n.set(null,i)}r=e.instance,a=r.getAttribute("data-precedence"),s=n.get(a)||i,s===i&&n.set(null,r),n.set(a,r),this.count++,i=Lc.bind(this),r.addEventListener("load",i),r.addEventListener("error",i),s?s.parentNode.insertBefore(r,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(r,t.firstChild)),e.state.loading|=4}}var ul={$$typeof:fi,Provider:null,Consumer:null,_currentValue:Xr,_currentValue2:Xr,_threadCount:0};function hD(t,e,n,i,r,s,a,l,u){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Cf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cf(0),this.hiddenUpdates=Cf(null),this.identifierPrefix=i,this.onUncaughtError=r,this.onCaughtError=s,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=u,this.incompleteTransitions=new Map}function _A(t,e,n,i,r,s,a,l,u,c,f,m){return t=new hD(t,e,n,a,u,c,f,m,l),e=1,s===!0&&(e|=24),s=tn(3,null,null,e),t.current=s,s.stateNode=t,e=Tp(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},wp(s),t}function vA(t){return t?(t=Xs,t):Xs}function EA(t,e,n,i,r,s){r=vA(r),i.context===null?i.context=r:i.pendingContext=r,i=ur(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=cr(t,i,e),n!==null&&($t(n,t,e),xo(n,t,e))}function Sv(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Xp(t,e){Sv(t,e),(t=t.alternate)&&Sv(t,e)}function TA(t){if(t.tag===13||t.tag===31){var e=Es(t,67108864);e!==null&&$t(e,t,67108864),Xp(t,67108864)}}function Av(t){if(t.tag===13||t.tag===31){var e=un();e=op(e);var n=Es(t,e);n!==null&&$t(n,t,e),Xp(t,e)}}var xc=!0;function fD(t,e,n,i){var r=Z.T;Z.T=null;var s=Ee.p;try{Ee.p=2,Wp(t,e,n,i)}finally{Ee.p=s,Z.T=r}}function dD(t,e,n,i){var r=Z.T;Z.T=null;var s=Ee.p;try{Ee.p=8,Wp(t,e,n,i)}finally{Ee.p=s,Z.T=r}}function Wp(t,e,n,i){if(xc){var r=Am(i);if(r===null)id(t,e,i,zc,n),wv(t,i);else if(pD(r,t,e,n,i))i.stopPropagation();else if(wv(t,i),e&4&&-1<mD.indexOf(t)){for(;r!==null;){var s=Va(r);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var a=jr(s.pendingLanes);if(a!==0){var l=s;for(l.pendingLanes|=2,l.entangledLanes|=2;a;){var u=1<<31-ln(a);l.entanglements[1]|=u,a&=~u}ni(s),!(ve&6)&&(Cc=an()+500,Ml(0))}}break;case 31:case 13:l=Es(s,2),l!==null&&$t(l,s,2),bh(),Xp(s,2)}if(s=Am(i),s===null&&id(t,e,i,zc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else id(t,e,i,null,n)}}function Am(t){return t=hp(t),Jp(t)}var zc=null;function Jp(t){if(zc=null,t=js(t),t!==null){var e=Al(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=qT(e),t!==null)return t;t=null}else if(n===31){if(t=HT(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return zc=t,null}function SA(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ZI()){case KT:return 2;case YT:return 8;case mc:case eC:return 32;case $T:return 268435456;default:return 32}default:return 32}}var wm=!1,dr=null,mr=null,pr=null,cl=new Map,hl=new Map,Xi=[],mD="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function wv(t,e){switch(t){case"focusin":case"focusout":dr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":cl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":hl.delete(e.pointerId)}}function vo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Va(e),e!==null&&TA(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function pD(t,e,n,i,r){switch(e){case"focusin":return dr=vo(dr,t,e,n,i,r),!0;case"dragenter":return mr=vo(mr,t,e,n,i,r),!0;case"mouseover":return pr=vo(pr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return cl.set(s,vo(cl.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,hl.set(s,vo(hl.get(s)||null,t,e,n,i,r)),!0}return!1}function AA(t){var e=js(t.target);if(e!==null){var n=Al(e);if(n!==null){if(e=n.tag,e===13){if(e=qT(n),e!==null){t.blockedOn=e,l_(t.priority,function(){Av(n)});return}}else if(e===31){if(e=HT(n),e!==null){t.blockedOn=e,l_(t.priority,function(){Av(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ju(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Am(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Hd=i,n.target.dispatchEvent(i),Hd=null}else return e=Va(n),e!==null&&TA(e),t.blockedOn=n,!1;e.shift()}return!0}function bv(t,e,n){Ju(t)&&n.delete(e)}function gD(){wm=!1,dr!==null&&Ju(dr)&&(dr=null),mr!==null&&Ju(mr)&&(mr=null),pr!==null&&Ju(pr)&&(pr=null),cl.forEach(bv),hl.forEach(bv)}function Iu(t,e){t.blockedOn===e&&(t.blockedOn=null,wm||(wm=!0,dt.unstable_scheduleCallback(dt.unstable_NormalPriority,gD)))}var Cu=null;function Rv(t){Cu!==t&&(Cu=t,dt.unstable_scheduleCallback(dt.unstable_NormalPriority,function(){Cu===t&&(Cu=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],r=t[e+2];if(typeof i!="function"){if(Jp(i||n)===null)continue;break}var s=Va(n);s!==null&&(t.splice(e,3),e-=3,rm(s,{pending:!0,data:r,method:n.method,action:i},i,r))}}))}function Aa(t){function e(u){return Iu(u,t)}dr!==null&&Iu(dr,t),mr!==null&&Iu(mr,t),pr!==null&&Iu(pr,t),cl.forEach(e),hl.forEach(e);for(var n=0;n<Xi.length;n++){var i=Xi[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<Xi.length&&(n=Xi[0],n.blockedOn===null);)AA(n),n.blockedOn===null&&Xi.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var r=n[i],s=n[i+1],a=r[Xt]||null;if(typeof s=="function")a||Rv(n);else if(a){var l=null;if(s&&s.hasAttribute("formAction")){if(r=s,a=s[Xt]||null)l=a.formAction;else if(Jp(r)!==null)continue}else l=a.action;typeof l=="function"?n[i+1]=l:(n.splice(i,3),i-=3),Rv(n)}}}function wA(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(a){return r=a})},focusReset:"manual",scroll:"manual"})}function e(){r!==null&&(r(),r=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,r=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),r!==null&&(r(),r=null)}}}function Zp(t){this._internalRoot=t}Ch.prototype.render=Zp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(x(409));var n=e.current,i=un();EA(n,i,t,e,null,null)};Ch.prototype.unmount=Zp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;EA(t.current,2,null,t,null,null),bh(),e[Ma]=null}};function Ch(t){this._internalRoot=t}Ch.prototype.unstable_scheduleHydration=function(t){if(t){var e=ZT();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Xi.length&&e!==0&&e<Xi[n].priority;n++);Xi.splice(n,0,t),n===0&&AA(t)}};var Iv=zT.version;if(Iv!=="19.2.4")throw Error(x(527,Iv,"19.2.4"));Ee.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(x(188)):(t=Object.keys(t).join(","),Error(x(268,t)));return t=KI(e),t=t!==null?FT(t):null,t=t===null?null:t.stateNode,t};var yD={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Z,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Du=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Du.isDisabled&&Du.supportsFiber)try{wl=Du.inject(yD),on=Du}catch{}}hh.createRoot=function(t,e){if(!BT(t))throw Error(x(299));var n=!1,i="",r=pS,s=gS,a=yS;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(r=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(a=e.onRecoverableError)),e=_A(t,1,!1,null,null,n,i,null,r,s,a,wA),t[Ma]=e.current,Yp(t),new Zp(e)};hh.hydrateRoot=function(t,e,n){if(!BT(t))throw Error(x(299));var i=!1,r="",s=pS,a=gS,l=yS,u=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(a=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(u=n.formState)),e=_A(t,1,!0,e,n??null,i,r,u,s,a,l,wA),e.context=vA(null),n=e.current,i=un(),i=op(i),r=ur(i),r.callback=null,cr(n,r,i),n=i,e.current.lanes=n,Rl(e,n),ni(e),t[Ma]=e.current,Yp(t),new Ch(e)};hh.version="19.2.4";function bA(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bA)}catch{}}bA(),VT.exports=hh;var g4=VT.exports;/**
 * react-router v7.13.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Cv="popstate";function Dv(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function _D(t={}){function e(i,r){var c;let s=(c=r.state)==null?void 0:c.masked,{pathname:a,search:l,hash:u}=s||i.location;return bm("",{pathname:a,search:l,hash:u},r.state&&r.state.usr||null,r.state&&r.state.key||"default",s?{pathname:i.location.pathname,search:i.location.search,hash:i.location.hash}:void 0)}function n(i,r){return typeof r=="string"?r:fl(r)}return ED(e,n,null,t)}function Ke(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function On(t,e){if(!t)try{throw new Error(e)}catch{}}function vD(){return Math.random().toString(36).substring(2,10)}function Nv(t,e){return{usr:t.state,key:t.key,idx:e,masked:t.unstable_mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function bm(t,e,n=null,i,r){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?za(e):e,state:n,key:e&&e.key||i||vD(),unstable_mask:r}}function fl({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function za(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function ED(t,e,n,i={}){let{window:r=document.defaultView,v5Compat:s=!1}=i,a=r.history,l="POP",u=null,c=f();c==null&&(c=0,a.replaceState({...a.state,idx:c},""));function f(){return(a.state||{idx:null}).idx}function m(){l="POP";let D=f(),v=D==null?null:D-c;c=D,u&&u({action:l,location:N.location,delta:v})}function p(D,v){l="PUSH";let E=Dv(D)?D:bm(N.location,D,v);c=f()+1;let A=Nv(E,c),M=N.createHref(E.unstable_mask||E);try{a.pushState(A,"",M)}catch(B){if(B instanceof DOMException&&B.name==="DataCloneError")throw B;r.location.assign(M)}s&&u&&u({action:l,location:N.location,delta:1})}function y(D,v){l="REPLACE";let E=Dv(D)?D:bm(N.location,D,v);c=f();let A=Nv(E,c),M=N.createHref(E.unstable_mask||E);a.replaceState(A,"",M),s&&u&&u({action:l,location:N.location,delta:0})}function I(D){return TD(D)}let N={get action(){return l},get location(){return t(r,a)},listen(D){if(u)throw new Error("A history only accepts one active listener");return r.addEventListener(Cv,m),u=D,()=>{r.removeEventListener(Cv,m),u=null}},createHref(D){return e(r,D)},createURL:I,encodeLocation(D){let v=I(D);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:p,replace:y,go(D){return a.go(D)}};return N}function TD(t,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),Ke(n,"No window.location.(origin|href) available to create URL");let i=typeof t=="string"?t:fl(t);return i=i.replace(/ $/,"%20"),!e&&i.startsWith("//")&&(i=n+i),new URL(i,n)}function RA(t,e,n="/"){return SD(t,e,n,!1)}function SD(t,e,n,i){let r=typeof e=="string"?za(e):e,s=Ci(r.pathname||"/",n);if(s==null)return null;let a=IA(t);AD(a);let l=null;for(let u=0;l==null&&u<a.length;++u){let c=kD(s);l=MD(a[u],c,i)}return l}function IA(t,e=[],n=[],i="",r=!1){let s=(a,l,u=r,c)=>{let f={relativePath:c===void 0?a.path||"":c,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(i)&&u)return;Ke(f.relativePath.startsWith(i),`Absolute route path "${f.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(i.length)}let m=Kn([i,f.relativePath]),p=n.concat(f);a.children&&a.children.length>0&&(Ke(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),IA(a.children,e,p,m,u)),!(a.path==null&&!a.index)&&e.push({path:m,score:ND(m,a.index),routesMeta:p})};return t.forEach((a,l)=>{var u;if(a.path===""||!((u=a.path)!=null&&u.includes("?")))s(a,l);else for(let c of CA(a.path))s(a,l,!0,c)}),e}function CA(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let a=CA(i.join("/")),l=[];return l.push(...a.map(u=>u===""?s:[s,u].join("/"))),r&&l.push(...a),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function AD(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:OD(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var wD=/^:[\w-]+$/,bD=3,RD=2,ID=1,CD=10,DD=-2,Ov=t=>t==="*";function ND(t,e){let n=t.split("/"),i=n.length;return n.some(Ov)&&(i+=DD),e&&(i+=RD),n.filter(r=>!Ov(r)).reduce((r,s)=>r+(wD.test(s)?bD:s===""?ID:CD),i)}function OD(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function MD(t,e,n=!1){let{routesMeta:i}=t,r={},s="/",a=[];for(let l=0;l<i.length;++l){let u=i[l],c=l===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",m=Bc({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),p=u.route;if(!m&&c&&n&&!i[i.length-1].route.index&&(m=Bc({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},f)),!m)return null;Object.assign(r,m.params),a.push({params:r,pathname:Kn([s,m.pathname]),pathnameBase:xD(Kn([s,m.pathnameBase])),route:p}),m.pathnameBase!=="/"&&(s=Kn([s,m.pathnameBase]))}return a}function Bc(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=VD(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],a=s.replace(/(.)\/+$/,"$1"),l=r.slice(1);return{params:i.reduce((c,{paramName:f,isOptional:m},p)=>{if(f==="*"){let I=l[p]||"";a=s.slice(0,s.length-I.length).replace(/(.)\/+$/,"$1")}const y=l[p];return m&&!y?c[f]=void 0:c[f]=(y||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:a,pattern:t}}function VD(t,e=!1,n=!0){On(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,u,c,f)=>{if(i.push({paramName:l,isOptional:u!=null}),u){let m=f.charAt(c+a.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function kD(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return On(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Ci(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}var PD=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function LD(t,e="/"){let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?za(t):t,s;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?s=Mv(n.substring(1),"/"):s=Mv(n,e)):s=e,{pathname:s,search:zD(i),hash:BD(r)}}function Mv(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function ad(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function UD(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function eg(t){let e=UD(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function Dh(t,e,n,i=!1){let r;typeof t=="string"?r=za(t):(r={...t},Ke(!r.pathname||!r.pathname.includes("?"),ad("?","pathname","search",r)),Ke(!r.pathname||!r.pathname.includes("#"),ad("#","pathname","hash",r)),Ke(!r.search||!r.search.includes("#"),ad("#","search","hash",r)));let s=t===""||r.pathname==="",a=s?"/":r.pathname,l;if(a==null)l=n;else{let m=e.length-1;if(!i&&a.startsWith("..")){let p=a.split("/");for(;p[0]==="..";)p.shift(),m-=1;r.pathname=p.join("/")}l=m>=0?e[m]:"/"}let u=LD(r,l),c=a&&a!=="/"&&a.endsWith("/"),f=(s||a===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}var Kn=t=>t.join("/").replace(/\/\/+/g,"/"),xD=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),zD=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,BD=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,qD=class{constructor(t,e,n,i=!1){this.status=t,this.statusText=e||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function HD(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function FD(t){return t.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var DA=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function NA(t,e){let n=t;if(typeof n!="string"||!PD.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let i=n,r=!1;if(DA)try{let s=new URL(window.location.href),a=n.startsWith("//")?new URL(s.protocol+n):new URL(n),l=Ci(a.pathname,e);a.origin===s.origin&&l!=null?n=l+a.search+a.hash:r=!0}catch{On(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var OA=["POST","PUT","PATCH","DELETE"];new Set(OA);var jD=["GET",...OA];new Set(jD);var Ba=L.createContext(null);Ba.displayName="DataRouter";var Nh=L.createContext(null);Nh.displayName="DataRouterState";var GD=L.createContext(!1),MA=L.createContext({isTransitioning:!1});MA.displayName="ViewTransition";var KD=L.createContext(new Map);KD.displayName="Fetchers";var YD=L.createContext(null);YD.displayName="Await";var fn=L.createContext(null);fn.displayName="Navigation";var Pl=L.createContext(null);Pl.displayName="Location";var Ln=L.createContext({outlet:null,matches:[],isDataRoute:!1});Ln.displayName="Route";var tg=L.createContext(null);tg.displayName="RouteError";var VA="REACT_ROUTER_ERROR",$D="REDIRECT",QD="ROUTE_ERROR_RESPONSE";function XD(t){if(t.startsWith(`${VA}:${$D}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function WD(t){if(t.startsWith(`${VA}:${QD}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new qD(e.status,e.statusText,e.data)}catch{}}function JD(t,{relative:e}={}){Ke(qa(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=L.useContext(fn),{hash:r,pathname:s,search:a}=Ll(t,{relative:e}),l=s;return n!=="/"&&(l=s==="/"?n:Kn([n,s])),i.createHref({pathname:l,search:a,hash:r})}function qa(){return L.useContext(Pl)!=null}function Pi(){return Ke(qa(),"useLocation() may be used only in the context of a <Router> component."),L.useContext(Pl).location}var kA="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function PA(t){L.useContext(fn).static||L.useLayoutEffect(t)}function LA(){let{isDataRoute:t}=L.useContext(Ln);return t?hN():ZD()}function ZD(){Ke(qa(),"useNavigate() may be used only in the context of a <Router> component.");let t=L.useContext(Ba),{basename:e,navigator:n}=L.useContext(fn),{matches:i}=L.useContext(Ln),{pathname:r}=Pi(),s=JSON.stringify(eg(i)),a=L.useRef(!1);return PA(()=>{a.current=!0}),L.useCallback((u,c={})=>{if(On(a.current,kA),!a.current)return;if(typeof u=="number"){n.go(u);return}let f=Dh(u,JSON.parse(s),r,c.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Kn([e,f.pathname])),(c.replace?n.replace:n.push)(f,c.state,c)},[e,n,s,r,t])}L.createContext(null);function y4(){let{matches:t}=L.useContext(Ln),e=t[t.length-1];return e?e.params:{}}function Ll(t,{relative:e}={}){let{matches:n}=L.useContext(Ln),{pathname:i}=Pi(),r=JSON.stringify(eg(n));return L.useMemo(()=>Dh(t,JSON.parse(r),i,e==="path"),[t,r,i,e])}function eN(t,e){return UA(t,e)}function UA(t,e,n){var D;Ke(qa(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=L.useContext(fn),{matches:r}=L.useContext(Ln),s=r[r.length-1],a=s?s.params:{},l=s?s.pathname:"/",u=s?s.pathnameBase:"/",c=s&&s.route;{let v=c&&c.path||"";zA(l,!c||v.endsWith("*")||v.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${v==="/"?"*":`${v}/*`}">.`)}let f=Pi(),m;if(e){let v=typeof e=="string"?za(e):e;Ke(u==="/"||((D=v.pathname)==null?void 0:D.startsWith(u)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${u}" but pathname "${v.pathname}" was given in the \`location\` prop.`),m=v}else m=f;let p=m.pathname||"/",y=p;if(u!=="/"){let v=u.replace(/^\//,"").split("/");y="/"+p.replace(/^\//,"").split("/").slice(v.length).join("/")}let I=RA(t,{pathname:y});On(c||I!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),On(I==null||I[I.length-1].route.element!==void 0||I[I.length-1].route.Component!==void 0||I[I.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let N=sN(I&&I.map(v=>Object.assign({},v,{params:Object.assign({},a,v.params),pathname:Kn([u,i.encodeLocation?i.encodeLocation(v.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?u:Kn([u,i.encodeLocation?i.encodeLocation(v.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathnameBase])})),r,n);return e&&N?L.createElement(Pl.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...m},navigationType:"POP"}},N):N}function tN(){let t=cN(),e=HD(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:i},s={padding:"2px 4px",backgroundColor:i},a=null;return a=L.createElement(L.Fragment,null,L.createElement("p",null,"💿 Hey developer 👋"),L.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",L.createElement("code",{style:s},"ErrorBoundary")," or"," ",L.createElement("code",{style:s},"errorElement")," prop on your route.")),L.createElement(L.Fragment,null,L.createElement("h2",null,"Unexpected Application Error!"),L.createElement("h3",{style:{fontStyle:"italic"}},e),n?L.createElement("pre",{style:r},n):null,a)}var nN=L.createElement(tN,null),xA=class extends L.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError&&this.props.onError(t,e)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=WD(t.digest);n&&(t=n)}let e=t!==void 0?L.createElement(Ln.Provider,{value:this.props.routeContext},L.createElement(tg.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?L.createElement(iN,{error:t},e):e}};xA.contextType=GD;var od=new WeakMap;function iN({children:t,error:e}){let{basename:n}=L.useContext(fn);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=XD(e.digest);if(i){let r=od.get(e);if(r)throw r;let s=NA(i.location,n);if(DA&&!od.get(e))if(s.isExternal||i.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const a=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:i.replace}));throw od.set(e,a),a}return L.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return t}function rN({routeContext:t,match:e,children:n}){let i=L.useContext(Ba);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),L.createElement(Ln.Provider,{value:t},n)}function sN(t,e=[],n){let i=n==null?void 0:n.state;if(t==null){if(!i)return null;if(i.errors)t=i.matches;else if(e.length===0&&!i.initialized&&i.matches.length>0)t=i.matches;else return null}let r=t,s=i==null?void 0:i.errors;if(s!=null){let f=r.findIndex(m=>m.route.id&&(s==null?void 0:s[m.route.id])!==void 0);Ke(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),r=r.slice(0,Math.min(r.length,f+1))}let a=!1,l=-1;if(n&&i){a=i.renderFallback;for(let f=0;f<r.length;f++){let m=r[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(l=f),m.route.id){let{loaderData:p,errors:y}=i,I=m.route.loader&&!p.hasOwnProperty(m.route.id)&&(!y||y[m.route.id]===void 0);if(m.route.lazy||I){n.isStatic&&(a=!0),l>=0?r=r.slice(0,l+1):r=[r[0]];break}}}}let u=n==null?void 0:n.onError,c=i&&u?(f,m)=>{var p,y;u(f,{location:i.location,params:((y=(p=i.matches)==null?void 0:p[0])==null?void 0:y.params)??{},unstable_pattern:FD(i.matches),errorInfo:m})}:void 0;return r.reduceRight((f,m,p)=>{let y,I=!1,N=null,D=null;i&&(y=s&&m.route.id?s[m.route.id]:void 0,N=m.route.errorElement||nN,a&&(l<0&&p===0?(zA("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),I=!0,D=null):l===p&&(I=!0,D=m.route.hydrateFallbackElement||null)));let v=e.concat(r.slice(0,p+1)),E=()=>{let A;return y?A=N:I?A=D:m.route.Component?A=L.createElement(m.route.Component,null):m.route.element?A=m.route.element:A=f,L.createElement(rN,{match:m,routeContext:{outlet:f,matches:v,isDataRoute:i!=null},children:A})};return i&&(m.route.ErrorBoundary||m.route.errorElement||p===0)?L.createElement(xA,{location:i.location,revalidation:i.revalidation,component:N,error:y,children:E(),routeContext:{outlet:null,matches:v,isDataRoute:!0},onError:c}):E()},null)}function ng(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function aN(t){let e=L.useContext(Ba);return Ke(e,ng(t)),e}function oN(t){let e=L.useContext(Nh);return Ke(e,ng(t)),e}function lN(t){let e=L.useContext(Ln);return Ke(e,ng(t)),e}function ig(t){let e=lN(t),n=e.matches[e.matches.length-1];return Ke(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function uN(){return ig("useRouteId")}function cN(){var i;let t=L.useContext(tg),e=oN("useRouteError"),n=ig("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function hN(){let{router:t}=aN("useNavigate"),e=ig("useNavigate"),n=L.useRef(!1);return PA(()=>{n.current=!0}),L.useCallback(async(r,s={})=>{On(n.current,kA),n.current&&(typeof r=="number"?await t.navigate(r):await t.navigate(r,{fromRouteId:e,...s}))},[t,e])}var Vv={};function zA(t,e,n){!e&&!Vv[t]&&(Vv[t]=!0,On(!1,n))}L.memo(fN);function fN({routes:t,future:e,state:n,isStatic:i,onError:r}){return UA(t,void 0,{state:n,isStatic:i,onError:r})}function _4({to:t,replace:e,state:n,relative:i}){Ke(qa(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=L.useContext(fn);On(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=L.useContext(Ln),{pathname:a}=Pi(),l=LA(),u=Dh(t,eg(s),a,i==="path"),c=JSON.stringify(u);return L.useEffect(()=>{l(JSON.parse(c),{replace:e,state:n,relative:i})},[l,c,i,e,n]),null}function dN(t){Ke(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function mN({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:r,static:s=!1,unstable_useTransitions:a}){Ke(!qa(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=t.replace(/^\/*/,"/"),u=L.useMemo(()=>({basename:l,navigator:r,static:s,unstable_useTransitions:a,future:{}}),[l,r,s,a]);typeof n=="string"&&(n=za(n));let{pathname:c="/",search:f="",hash:m="",state:p=null,key:y="default",unstable_mask:I}=n,N=L.useMemo(()=>{let D=Ci(c,l);return D==null?null:{location:{pathname:D,search:f,hash:m,state:p,key:y,unstable_mask:I},navigationType:i}},[l,c,f,m,p,y,i,I]);return On(N!=null,`<Router basename="${l}"> is not able to match the URL "${c}${f}${m}" because it does not start with the basename, so the <Router> won't render anything.`),N==null?null:L.createElement(fn.Provider,{value:u},L.createElement(Pl.Provider,{children:e,value:N}))}function v4({children:t,location:e}){return eN(Rm(t),e)}function Rm(t,e=[]){let n=[];return L.Children.forEach(t,(i,r)=>{if(!L.isValidElement(i))return;let s=[...e,r];if(i.type===L.Fragment){n.push.apply(n,Rm(i.props.children,s));return}Ke(i.type===dN,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ke(!i.props.index||!i.props.children,"An index route cannot have child routes.");let a={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(a.children=Rm(i.props.children,s)),n.push(a)}),n}var Zu="get",ec="application/x-www-form-urlencoded";function Oh(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function pN(t){return Oh(t)&&t.tagName.toLowerCase()==="button"}function gN(t){return Oh(t)&&t.tagName.toLowerCase()==="form"}function yN(t){return Oh(t)&&t.tagName.toLowerCase()==="input"}function _N(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function vN(t,e){return t.button===0&&(!e||e==="_self")&&!_N(t)}var Nu=null;function EN(){if(Nu===null)try{new FormData(document.createElement("form"),0),Nu=!1}catch{Nu=!0}return Nu}var TN=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ld(t){return t!=null&&!TN.has(t)?(On(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ec}"`),null):t}function SN(t,e){let n,i,r,s,a;if(gN(t)){let l=t.getAttribute("action");i=l?Ci(l,e):null,n=t.getAttribute("method")||Zu,r=ld(t.getAttribute("enctype"))||ec,s=new FormData(t)}else if(pN(t)||yN(t)&&(t.type==="submit"||t.type==="image")){let l=t.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=t.getAttribute("formaction")||l.getAttribute("action");if(i=u?Ci(u,e):null,n=t.getAttribute("formmethod")||l.getAttribute("method")||Zu,r=ld(t.getAttribute("formenctype"))||ld(l.getAttribute("enctype"))||ec,s=new FormData(l,t),!EN()){let{name:c,type:f,value:m}=t;if(f==="image"){let p=c?`${c}.`:"";s.append(`${p}x`,"0"),s.append(`${p}y`,"0")}else c&&s.append(c,m)}}else{if(Oh(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Zu,i=null,r=ec,a=t}return s&&r==="text/plain"&&(a=s,s=void 0),{action:i,method:n.toLowerCase(),encType:r,formData:s,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function rg(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function AN(t,e,n,i){let r=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${i}`:r.pathname=`${r.pathname}.${i}`:r.pathname==="/"?r.pathname=`_root.${i}`:e&&Ci(r.pathname,e)==="/"?r.pathname=`${e.replace(/\/$/,"")}/_root.${i}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${i}`,r}async function wN(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch{return window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function bN(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function RN(t,e,n){let i=await Promise.all(t.map(async r=>{let s=e.routes[r.route.id];if(s){let a=await wN(s,n);return a.links?a.links():[]}return[]}));return NN(i.flat(1).filter(bN).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function kv(t,e,n,i,r,s){let a=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,l=(u,c)=>{var f;return n[c].pathname!==u.pathname||((f=n[c].route.path)==null?void 0:f.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return s==="assets"?e.filter((u,c)=>a(u,c)||l(u,c)):s==="data"?e.filter((u,c)=>{var m;let f=i.routes[u.route.id];if(!f||!f.hasLoader)return!1;if(a(u,c)||l(u,c))return!0;if(u.route.shouldRevalidate){let p=u.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((m=n[0])==null?void 0:m.params)||{},nextUrl:new URL(t,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function IN(t,e,{includeHydrateFallback:n}={}){return CN(t.map(i=>{let r=e.routes[i.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function CN(t){return[...new Set(t)]}function DN(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function NN(t,e){let n=new Set;return new Set(e),t.reduce((i,r)=>{let s=JSON.stringify(DN(r));return n.has(s)||(n.add(s),i.push({key:s,link:r})),i},[])}function BA(){let t=L.useContext(Ba);return rg(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function ON(){let t=L.useContext(Nh);return rg(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var sg=L.createContext(void 0);sg.displayName="FrameworkContext";function qA(){let t=L.useContext(sg);return rg(t,"You must render this element inside a <HydratedRouter> element"),t}function MN(t,e){let n=L.useContext(sg),[i,r]=L.useState(!1),[s,a]=L.useState(!1),{onFocus:l,onBlur:u,onMouseEnter:c,onMouseLeave:f,onTouchStart:m}=e,p=L.useRef(null);L.useEffect(()=>{if(t==="render"&&a(!0),t==="viewport"){let N=v=>{v.forEach(E=>{a(E.isIntersecting)})},D=new IntersectionObserver(N,{threshold:.5});return p.current&&D.observe(p.current),()=>{D.disconnect()}}},[t]),L.useEffect(()=>{if(i){let N=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(N)}}},[i]);let y=()=>{r(!0)},I=()=>{r(!1),a(!1)};return n?t!=="intent"?[s,p,{}]:[s,p,{onFocus:Eo(l,y),onBlur:Eo(u,I),onMouseEnter:Eo(c,y),onMouseLeave:Eo(f,I),onTouchStart:Eo(m,y)}]:[!1,p,{}]}function Eo(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function VN({page:t,...e}){let{router:n}=BA(),i=L.useMemo(()=>RA(n.routes,t,n.basename),[n.routes,t,n.basename]);return i?L.createElement(PN,{page:t,matches:i,...e}):null}function kN(t){let{manifest:e,routeModules:n}=qA(),[i,r]=L.useState([]);return L.useEffect(()=>{let s=!1;return RN(t,e,n).then(a=>{s||r(a)}),()=>{s=!0}},[t,e,n]),i}function PN({page:t,matches:e,...n}){let i=Pi(),{future:r,manifest:s,routeModules:a}=qA(),{basename:l}=BA(),{loaderData:u,matches:c}=ON(),f=L.useMemo(()=>kv(t,e,c,s,i,"data"),[t,e,c,s,i]),m=L.useMemo(()=>kv(t,e,c,s,i,"assets"),[t,e,c,s,i]),p=L.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let N=new Set,D=!1;if(e.forEach(E=>{var M;let A=s.routes[E.route.id];!A||!A.hasLoader||(!f.some(B=>B.route.id===E.route.id)&&E.route.id in u&&((M=a[E.route.id])!=null&&M.shouldRevalidate)||A.hasClientLoader?D=!0:N.add(E.route.id))}),N.size===0)return[];let v=AN(t,l,r.unstable_trailingSlashAwareDataRequests,"data");return D&&N.size>0&&v.searchParams.set("_routes",e.filter(E=>N.has(E.route.id)).map(E=>E.route.id).join(",")),[v.pathname+v.search]},[l,r.unstable_trailingSlashAwareDataRequests,u,i,s,f,e,t,a]),y=L.useMemo(()=>IN(m,s),[m,s]),I=kN(m);return L.createElement(L.Fragment,null,p.map(N=>L.createElement("link",{key:N,rel:"prefetch",as:"fetch",href:N,...n})),y.map(N=>L.createElement("link",{key:N,rel:"modulepreload",href:N,...n})),I.map(({key:N,link:D})=>L.createElement("link",{key:N,nonce:n.nonce,...D,crossOrigin:D.crossOrigin??n.crossOrigin})))}function LN(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var UN=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{UN&&(window.__reactRouterVersion="7.13.2")}catch{}function E4({basename:t,children:e,unstable_useTransitions:n,window:i}){let r=L.useRef();r.current==null&&(r.current=_D({window:i,v5Compat:!0}));let s=r.current,[a,l]=L.useState({action:s.action,location:s.location}),u=L.useCallback(c=>{n===!1?l(c):L.startTransition(()=>l(c))},[n]);return L.useLayoutEffect(()=>s.listen(u),[s,u]),L.createElement(mN,{basename:t,children:e,location:a.location,navigationType:a.action,navigator:s,unstable_useTransitions:n})}var HA=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,FA=L.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:r,reloadDocument:s,replace:a,unstable_mask:l,state:u,target:c,to:f,preventScrollReset:m,viewTransition:p,unstable_defaultShouldRevalidate:y,...I},N){let{basename:D,navigator:v,unstable_useTransitions:E}=L.useContext(fn),A=typeof f=="string"&&HA.test(f),M=NA(f,D);f=M.to;let B=JD(f,{relative:r}),F=Pi(),T=null;if(l){let He=Dh(l,[],F.unstable_mask?F.unstable_mask.pathname:"/",!0);D!=="/"&&(He.pathname=He.pathname==="/"?D:Kn([D,He.pathname])),T=v.createHref(He)}let[_,S,b]=MN(i,I),R=qN(f,{replace:a,unstable_mask:l,state:u,target:c,preventScrollReset:m,relative:r,viewTransition:p,unstable_defaultShouldRevalidate:y,unstable_useTransitions:E});function O(He){e&&e(He),He.defaultPrevented||R(He)}let w=!(M.isExternal||s),$e=L.createElement("a",{...I,...b,href:(w?T:void 0)||M.absoluteURL||B,onClick:w?O:e,ref:LN(N,S),target:c,"data-discover":!A&&n==="render"?"true":void 0});return _&&!A?L.createElement(L.Fragment,null,$e,L.createElement(VN,{page:B})):$e});FA.displayName="Link";var xN=L.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:r=!1,style:s,to:a,viewTransition:l,children:u,...c},f){let m=Ll(a,{relative:c.relative}),p=Pi(),y=L.useContext(Nh),{navigator:I,basename:N}=L.useContext(fn),D=y!=null&&KN(m)&&l===!0,v=I.encodeLocation?I.encodeLocation(m).pathname:m.pathname,E=p.pathname,A=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;n||(E=E.toLowerCase(),A=A?A.toLowerCase():null,v=v.toLowerCase()),A&&N&&(A=Ci(A,N)||A);const M=v!=="/"&&v.endsWith("/")?v.length-1:v.length;let B=E===v||!r&&E.startsWith(v)&&E.charAt(M)==="/",F=A!=null&&(A===v||!r&&A.startsWith(v)&&A.charAt(v.length)==="/"),T={isActive:B,isPending:F,isTransitioning:D},_=B?e:void 0,S;typeof i=="function"?S=i(T):S=[i,B?"active":null,F?"pending":null,D?"transitioning":null].filter(Boolean).join(" ");let b=typeof s=="function"?s(T):s;return L.createElement(FA,{...c,"aria-current":_,className:S,ref:f,style:b,to:a,viewTransition:l},typeof u=="function"?u(T):u)});xN.displayName="NavLink";var zN=L.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:r,state:s,method:a=Zu,action:l,onSubmit:u,relative:c,preventScrollReset:f,viewTransition:m,unstable_defaultShouldRevalidate:p,...y},I)=>{let{unstable_useTransitions:N}=L.useContext(fn),D=jN(),v=GN(l,{relative:c}),E=a.toLowerCase()==="get"?"get":"post",A=typeof l=="string"&&HA.test(l),M=B=>{if(u&&u(B),B.defaultPrevented)return;B.preventDefault();let F=B.nativeEvent.submitter,T=(F==null?void 0:F.getAttribute("formmethod"))||a,_=()=>D(F||B.currentTarget,{fetcherKey:e,method:T,navigate:n,replace:r,state:s,relative:c,preventScrollReset:f,viewTransition:m,unstable_defaultShouldRevalidate:p});N&&n!==!1?L.startTransition(()=>_()):_()};return L.createElement("form",{ref:I,method:E,action:v,onSubmit:i?u:M,...y,"data-discover":!A&&t==="render"?"true":void 0})});zN.displayName="Form";function BN(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jA(t){let e=L.useContext(Ba);return Ke(e,BN(t)),e}function qN(t,{target:e,replace:n,unstable_mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:l,unstable_defaultShouldRevalidate:u,unstable_useTransitions:c}={}){let f=LA(),m=Pi(),p=Ll(t,{relative:a});return L.useCallback(y=>{if(vN(y,e)){y.preventDefault();let I=n!==void 0?n:fl(m)===fl(p),N=()=>f(t,{replace:I,unstable_mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:l,unstable_defaultShouldRevalidate:u});c?L.startTransition(()=>N()):N()}},[m,f,p,n,i,r,e,t,s,a,l,u,c])}var HN=0,FN=()=>`__${String(++HN)}__`;function jN(){let{router:t}=jA("useSubmit"),{basename:e}=L.useContext(fn),n=uN(),i=t.fetch,r=t.navigate;return L.useCallback(async(s,a={})=>{let{action:l,method:u,encType:c,formData:f,body:m}=SN(s,e);if(a.navigate===!1){let p=a.fetcherKey||FN();await i(p,n,a.action||l,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:m,formMethod:a.method||u,formEncType:a.encType||c,flushSync:a.flushSync})}else await r(a.action||l,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:m,formMethod:a.method||u,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[i,r,e,n])}function GN(t,{relative:e}={}){let{basename:n}=L.useContext(fn),i=L.useContext(Ln);Ke(i,"useFormAction must be used inside a RouteContext");let[r]=i.matches.slice(-1),s={...Ll(t||".",{relative:e})},a=Pi();if(t==null){s.search=a.search;let l=new URLSearchParams(s.search),u=l.getAll("index");if(u.some(f=>f==="")){l.delete("index"),u.filter(m=>m).forEach(m=>l.append("index",m));let f=l.toString();s.search=f?`?${f}`:""}}return(!t||t===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:Kn([n,s.pathname])),fl(s)}function KN(t,{relative:e}={}){let n=L.useContext(MA);Ke(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=jA("useViewTransitionState"),r=Ll(t,{relative:e});if(!n.isTransitioning)return!1;let s=Ci(n.currentLocation.pathname,i)||n.currentLocation.pathname,a=Ci(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Bc(r.pathname,a)!=null||Bc(r.pathname,s)!=null}const YN=()=>{};var Pv={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},$N=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],a=t[n++],l=t[n++],u=((r&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],a=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|a&63)}}return e.join("")},KA={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const s=t[r],a=r+1<t.length,l=a?t[r+1]:0,u=r+2<t.length,c=u?t[r+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let p=(l&15)<<2|c>>6,y=c&63;u||(y=64,a||(p=64)),i.push(n[f],n[m],n[p],n[y])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(GA(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):$N(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const m=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||l==null||c==null||m==null)throw new QN;const p=s<<2|l>>4;if(i.push(p),c!==64){const y=l<<4&240|c>>2;if(i.push(y),m!==64){const I=c<<6&192|m;i.push(I)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class QN extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const XN=function(t){const e=GA(t);return KA.encodeByteArray(e,!0)},qc=function(t){return XN(t).replace(/\./g,"")},YA=function(t){try{return KA.decodeString(t,!0)}catch{}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WN(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JN=()=>WN().__FIREBASE_DEFAULTS__,ZN=()=>{if(typeof process>"u"||typeof Pv>"u")return;const t=Pv.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},eO=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&YA(t[1]);return e&&JSON.parse(e)},Mh=()=>{try{return YN()||JN()||ZN()||eO()}catch{return}},$A=t=>{var e,n;return(n=(e=Mh())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},QA=t=>{const e=$A(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},XA=()=>{var t;return(t=Mh())==null?void 0:t.config},WA=t=>{var e;return(e=Mh())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JA(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[qc(JSON.stringify(n)),qc(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nO(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Mt())}function iO(){var e;const t=(e=Mh())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function rO(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sO(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function aO(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function oO(){const t=Mt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function lO(){return!iO()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ZA(){try{return typeof indexedDB=="object"}catch{return!1}}function ew(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}function uO(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cO="FirebaseError";class Un extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=cO,Object.setPrototypeOf(this,Un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ss.prototype.create)}}class Ss{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],a=s?hO(s,i):"Error",l=`${this.serviceName}: ${a} (${r}).`;return new Un(r,l,i)}}function hO(t,e){return t.replace(fO,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const fO=/\{\$([^}]+)}/g;function dO(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Di(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const s=t[r],a=e[r];if(Lv(s)&&Lv(a)){if(!Di(s,a))return!1}else if(s!==a)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function Lv(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Io(t){const e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[r,s]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(s)}}),e}function Co(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function mO(t,e){const n=new pO(t,e);return n.subscribe.bind(n)}class pO{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");gO(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=ud),r.error===void 0&&(r.error=ud),r.complete===void 0&&(r.complete=ud);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch{}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function gO(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ud(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ha(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ag(t){return(await fetch(t,{credentials:"include"})).ok}class bn{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yO{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new tO;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vO(e))try{this.getOrInitializeService({instanceIdentifier:Yr})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=Yr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yr){return this.instances.has(e)}getOptions(e=Yr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);i===l&&a.resolve(r)}return r}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(i)??new Set;r.add(e),this.onInitCallbacks.set(i,r);const s=this.instances.get(i);return s&&e(s,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:_O(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Yr){return this.component?this.component.multipleInstances?e:Yr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _O(t){return t===Yr?void 0:t}function vO(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EO{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new yO(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(de||(de={}));const TO={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},SO=de.INFO,AO={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},wO=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=AO[e];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class og{constructor(e){this.name=e,this._logLevel=SO,this._logHandler=wO,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?TO[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}const bO=(t,e)=>e.some(n=>t instanceof n);let Uv,xv;function RO(){return Uv||(Uv=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function IO(){return xv||(xv=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const tw=new WeakMap,Im=new WeakMap,nw=new WeakMap,cd=new WeakMap,lg=new WeakMap;function CO(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",a)},s=()=>{n(Ei(t.result)),r()},a=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&tw.set(n,t)}).catch(()=>{}),lg.set(e,t),e}function DO(t){if(Im.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",a),t.removeEventListener("abort",a)},s=()=>{n(),r()},a=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",a),t.addEventListener("abort",a)});Im.set(t,e)}let Cm={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Im.get(t);if(e==="objectStoreNames")return t.objectStoreNames||nw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ei(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function NO(t){Cm=t(Cm)}function OO(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(hd(this),e,...n);return nw.set(i,e.sort?e.sort():[e]),Ei(i)}:IO().includes(t)?function(...e){return t.apply(hd(this),e),Ei(tw.get(this))}:function(...e){return Ei(t.apply(hd(this),e))}}function MO(t){return typeof t=="function"?OO(t):(t instanceof IDBTransaction&&DO(t),bO(t,RO())?new Proxy(t,Cm):t)}function Ei(t){if(t instanceof IDBRequest)return CO(t);if(cd.has(t))return cd.get(t);const e=MO(t);return e!==t&&(cd.set(t,e),lg.set(e,t)),e}const hd=t=>lg.get(t);function Vh(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const a=indexedDB.open(t,e),l=Ei(a);return i&&a.addEventListener("upgradeneeded",u=>{i(Ei(a.result),u.oldVersion,u.newVersion,Ei(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),r&&u.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function fd(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Ei(n).then(()=>{})}const VO=["get","getKey","getAll","getAllKeys","count"],kO=["put","add","delete","clear"],dd=new Map;function zv(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dd.get(e))return dd.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=kO.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||VO.includes(n)))return;const s=async function(a,...l){const u=this.transaction(a,r?"readwrite":"readonly");let c=u.store;return i&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),r&&u.done]))[0]};return dd.set(e,s),s}NO(t=>({...t,get:(e,n,i)=>zv(e,n)||t.get(e,n,i),has:(e,n)=>!!zv(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PO{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(LO(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function LO(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Dm="@firebase/app",Bv="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni=new og("@firebase/app"),UO="@firebase/app-compat",xO="@firebase/analytics-compat",zO="@firebase/analytics",BO="@firebase/app-check-compat",qO="@firebase/app-check",HO="@firebase/auth",FO="@firebase/auth-compat",jO="@firebase/database",GO="@firebase/data-connect",KO="@firebase/database-compat",YO="@firebase/functions",$O="@firebase/functions-compat",QO="@firebase/installations",XO="@firebase/installations-compat",WO="@firebase/messaging",JO="@firebase/messaging-compat",ZO="@firebase/performance",e2="@firebase/performance-compat",t2="@firebase/remote-config",n2="@firebase/remote-config-compat",i2="@firebase/storage",r2="@firebase/storage-compat",s2="@firebase/firestore",a2="@firebase/ai",o2="@firebase/firestore-compat",l2="firebase",u2="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm="[DEFAULT]",c2={[Dm]:"fire-core",[UO]:"fire-core-compat",[zO]:"fire-analytics",[xO]:"fire-analytics-compat",[qO]:"fire-app-check",[BO]:"fire-app-check-compat",[HO]:"fire-auth",[FO]:"fire-auth-compat",[jO]:"fire-rtdb",[GO]:"fire-data-connect",[KO]:"fire-rtdb-compat",[YO]:"fire-fn",[$O]:"fire-fn-compat",[QO]:"fire-iid",[XO]:"fire-iid-compat",[WO]:"fire-fcm",[JO]:"fire-fcm-compat",[ZO]:"fire-perf",[e2]:"fire-perf-compat",[t2]:"fire-rc",[n2]:"fire-rc-compat",[i2]:"fire-gcs",[r2]:"fire-gcs-compat",[s2]:"fire-fst",[o2]:"fire-fst-compat",[a2]:"fire-vertex","fire-js":"fire-js",[l2]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc=new Map,h2=new Map,Om=new Map;function qv(t,e){try{t.container.addComponent(e)}catch(n){Ni.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Mn(t){const e=t.name;if(Om.has(e))return Ni.debug(`There were multiple attempts to register component ${e}.`),!1;Om.set(e,t);for(const n of Hc.values())qv(n,t);for(const n of h2.values())qv(n,t);return!0}function As(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function nn(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f2={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},gr=new Ss("app","Firebase",f2);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d2{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new bn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws=u2;function m2(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Nm,automaticDataCollectionEnabled:!0,...e},r=i.name;if(typeof r!="string"||!r)throw gr.create("bad-app-name",{appName:String(r)});if(n||(n=XA()),!n)throw gr.create("no-options");const s=Hc.get(r);if(s){if(Di(n,s.options)&&Di(i,s.config))return s;throw gr.create("duplicate-app",{appName:r})}const a=new EO(r);for(const u of Om.values())a.addComponent(u);const l=new d2(n,i,a);return Hc.set(r,l),l}function kh(t=Nm){const e=Hc.get(t);if(!e&&t===Nm&&XA())return m2();if(!e)throw gr.create("no-app",{appName:t});return e}function Qt(t,e,n){let i=c2[t]??t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),s=e.match(/\s|\//);if(r||s){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ni.warn(a.join(" "));return}Mn(new bn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p2="firebase-heartbeat-database",g2=1,dl="firebase-heartbeat-store";let md=null;function iw(){return md||(md=Vh(p2,g2,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(dl)}catch{}}}}).catch(t=>{throw gr.create("idb-open",{originalErrorMessage:t.message})})),md}async function y2(t){try{const n=(await iw()).transaction(dl),i=await n.objectStore(dl).get(rw(t));return await n.done,i}catch(e){if(e instanceof Un)Ni.warn(e.message);else{const n=gr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ni.warn(n.message)}}}async function Hv(t,e){try{const i=(await iw()).transaction(dl,"readwrite");await i.objectStore(dl).put(e,rw(t)),await i.done}catch(n){if(n instanceof Un)Ni.warn(n.message);else{const i=gr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ni.warn(i.message)}}}function rw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _2=1024,v2=30;class E2{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new S2(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Fv();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats.length>v2){const a=A2(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Ni.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Fv(),{heartbeatsToSend:i,unsentEntries:r}=T2(this._heartbeatsCache.heartbeats),s=qc(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Ni.warn(n),""}}}function Fv(){return new Date().toISOString().substring(0,10)}function T2(t,e=_2){const n=[];let i=t.slice();for(const r of t){const s=n.find(a=>a.agent===r.agent);if(s){if(s.dates.push(r.date),jv(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),jv(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class S2{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ZA()?ew().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await y2(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Hv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Hv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function jv(t){return qc(JSON.stringify({version:2,heartbeats:t})).length}function A2(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w2(t){Mn(new bn("platform-logger",e=>new PO(e),"PRIVATE")),Mn(new bn("heartbeat",e=>new E2(e),"PRIVATE")),Qt(Dm,Bv,t),Qt(Dm,Bv,"esm2020"),Qt("fire-js","")}w2("");var Gv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yr,sw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function S(){}S.prototype=_.prototype,T.F=_.prototype,T.prototype=new S,T.prototype.constructor=T,T.D=function(b,R,O){for(var w=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)w[$e-2]=arguments[$e];return _.prototype[R].apply(b,w)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,n),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(T,_,S){S||(S=0);const b=Array(16);if(typeof _=="string")for(var R=0;R<16;++R)b[R]=_.charCodeAt(S++)|_.charCodeAt(S++)<<8|_.charCodeAt(S++)<<16|_.charCodeAt(S++)<<24;else for(R=0;R<16;++R)b[R]=_[S++]|_[S++]<<8|_[S++]<<16|_[S++]<<24;_=T.g[0],S=T.g[1],R=T.g[2];let O=T.g[3],w;w=_+(O^S&(R^O))+b[0]+3614090360&4294967295,_=S+(w<<7&4294967295|w>>>25),w=O+(R^_&(S^R))+b[1]+3905402710&4294967295,O=_+(w<<12&4294967295|w>>>20),w=R+(S^O&(_^S))+b[2]+606105819&4294967295,R=O+(w<<17&4294967295|w>>>15),w=S+(_^R&(O^_))+b[3]+3250441966&4294967295,S=R+(w<<22&4294967295|w>>>10),w=_+(O^S&(R^O))+b[4]+4118548399&4294967295,_=S+(w<<7&4294967295|w>>>25),w=O+(R^_&(S^R))+b[5]+1200080426&4294967295,O=_+(w<<12&4294967295|w>>>20),w=R+(S^O&(_^S))+b[6]+2821735955&4294967295,R=O+(w<<17&4294967295|w>>>15),w=S+(_^R&(O^_))+b[7]+4249261313&4294967295,S=R+(w<<22&4294967295|w>>>10),w=_+(O^S&(R^O))+b[8]+1770035416&4294967295,_=S+(w<<7&4294967295|w>>>25),w=O+(R^_&(S^R))+b[9]+2336552879&4294967295,O=_+(w<<12&4294967295|w>>>20),w=R+(S^O&(_^S))+b[10]+4294925233&4294967295,R=O+(w<<17&4294967295|w>>>15),w=S+(_^R&(O^_))+b[11]+2304563134&4294967295,S=R+(w<<22&4294967295|w>>>10),w=_+(O^S&(R^O))+b[12]+1804603682&4294967295,_=S+(w<<7&4294967295|w>>>25),w=O+(R^_&(S^R))+b[13]+4254626195&4294967295,O=_+(w<<12&4294967295|w>>>20),w=R+(S^O&(_^S))+b[14]+2792965006&4294967295,R=O+(w<<17&4294967295|w>>>15),w=S+(_^R&(O^_))+b[15]+1236535329&4294967295,S=R+(w<<22&4294967295|w>>>10),w=_+(R^O&(S^R))+b[1]+4129170786&4294967295,_=S+(w<<5&4294967295|w>>>27),w=O+(S^R&(_^S))+b[6]+3225465664&4294967295,O=_+(w<<9&4294967295|w>>>23),w=R+(_^S&(O^_))+b[11]+643717713&4294967295,R=O+(w<<14&4294967295|w>>>18),w=S+(O^_&(R^O))+b[0]+3921069994&4294967295,S=R+(w<<20&4294967295|w>>>12),w=_+(R^O&(S^R))+b[5]+3593408605&4294967295,_=S+(w<<5&4294967295|w>>>27),w=O+(S^R&(_^S))+b[10]+38016083&4294967295,O=_+(w<<9&4294967295|w>>>23),w=R+(_^S&(O^_))+b[15]+3634488961&4294967295,R=O+(w<<14&4294967295|w>>>18),w=S+(O^_&(R^O))+b[4]+3889429448&4294967295,S=R+(w<<20&4294967295|w>>>12),w=_+(R^O&(S^R))+b[9]+568446438&4294967295,_=S+(w<<5&4294967295|w>>>27),w=O+(S^R&(_^S))+b[14]+3275163606&4294967295,O=_+(w<<9&4294967295|w>>>23),w=R+(_^S&(O^_))+b[3]+4107603335&4294967295,R=O+(w<<14&4294967295|w>>>18),w=S+(O^_&(R^O))+b[8]+1163531501&4294967295,S=R+(w<<20&4294967295|w>>>12),w=_+(R^O&(S^R))+b[13]+2850285829&4294967295,_=S+(w<<5&4294967295|w>>>27),w=O+(S^R&(_^S))+b[2]+4243563512&4294967295,O=_+(w<<9&4294967295|w>>>23),w=R+(_^S&(O^_))+b[7]+1735328473&4294967295,R=O+(w<<14&4294967295|w>>>18),w=S+(O^_&(R^O))+b[12]+2368359562&4294967295,S=R+(w<<20&4294967295|w>>>12),w=_+(S^R^O)+b[5]+4294588738&4294967295,_=S+(w<<4&4294967295|w>>>28),w=O+(_^S^R)+b[8]+2272392833&4294967295,O=_+(w<<11&4294967295|w>>>21),w=R+(O^_^S)+b[11]+1839030562&4294967295,R=O+(w<<16&4294967295|w>>>16),w=S+(R^O^_)+b[14]+4259657740&4294967295,S=R+(w<<23&4294967295|w>>>9),w=_+(S^R^O)+b[1]+2763975236&4294967295,_=S+(w<<4&4294967295|w>>>28),w=O+(_^S^R)+b[4]+1272893353&4294967295,O=_+(w<<11&4294967295|w>>>21),w=R+(O^_^S)+b[7]+4139469664&4294967295,R=O+(w<<16&4294967295|w>>>16),w=S+(R^O^_)+b[10]+3200236656&4294967295,S=R+(w<<23&4294967295|w>>>9),w=_+(S^R^O)+b[13]+681279174&4294967295,_=S+(w<<4&4294967295|w>>>28),w=O+(_^S^R)+b[0]+3936430074&4294967295,O=_+(w<<11&4294967295|w>>>21),w=R+(O^_^S)+b[3]+3572445317&4294967295,R=O+(w<<16&4294967295|w>>>16),w=S+(R^O^_)+b[6]+76029189&4294967295,S=R+(w<<23&4294967295|w>>>9),w=_+(S^R^O)+b[9]+3654602809&4294967295,_=S+(w<<4&4294967295|w>>>28),w=O+(_^S^R)+b[12]+3873151461&4294967295,O=_+(w<<11&4294967295|w>>>21),w=R+(O^_^S)+b[15]+530742520&4294967295,R=O+(w<<16&4294967295|w>>>16),w=S+(R^O^_)+b[2]+3299628645&4294967295,S=R+(w<<23&4294967295|w>>>9),w=_+(R^(S|~O))+b[0]+4096336452&4294967295,_=S+(w<<6&4294967295|w>>>26),w=O+(S^(_|~R))+b[7]+1126891415&4294967295,O=_+(w<<10&4294967295|w>>>22),w=R+(_^(O|~S))+b[14]+2878612391&4294967295,R=O+(w<<15&4294967295|w>>>17),w=S+(O^(R|~_))+b[5]+4237533241&4294967295,S=R+(w<<21&4294967295|w>>>11),w=_+(R^(S|~O))+b[12]+1700485571&4294967295,_=S+(w<<6&4294967295|w>>>26),w=O+(S^(_|~R))+b[3]+2399980690&4294967295,O=_+(w<<10&4294967295|w>>>22),w=R+(_^(O|~S))+b[10]+4293915773&4294967295,R=O+(w<<15&4294967295|w>>>17),w=S+(O^(R|~_))+b[1]+2240044497&4294967295,S=R+(w<<21&4294967295|w>>>11),w=_+(R^(S|~O))+b[8]+1873313359&4294967295,_=S+(w<<6&4294967295|w>>>26),w=O+(S^(_|~R))+b[15]+4264355552&4294967295,O=_+(w<<10&4294967295|w>>>22),w=R+(_^(O|~S))+b[6]+2734768916&4294967295,R=O+(w<<15&4294967295|w>>>17),w=S+(O^(R|~_))+b[13]+1309151649&4294967295,S=R+(w<<21&4294967295|w>>>11),w=_+(R^(S|~O))+b[4]+4149444226&4294967295,_=S+(w<<6&4294967295|w>>>26),w=O+(S^(_|~R))+b[11]+3174756917&4294967295,O=_+(w<<10&4294967295|w>>>22),w=R+(_^(O|~S))+b[2]+718787259&4294967295,R=O+(w<<15&4294967295|w>>>17),w=S+(O^(R|~_))+b[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(R+(w<<21&4294967295|w>>>11))&4294967295,T.g[2]=T.g[2]+R&4294967295,T.g[3]=T.g[3]+O&4294967295}i.prototype.v=function(T,_){_===void 0&&(_=T.length);const S=_-this.blockSize,b=this.C;let R=this.h,O=0;for(;O<_;){if(R==0)for(;O<=S;)r(this,T,O),O+=this.blockSize;if(typeof T=="string"){for(;O<_;)if(b[R++]=T.charCodeAt(O++),R==this.blockSize){r(this,b),R=0;break}}else for(;O<_;)if(b[R++]=T[O++],R==this.blockSize){r(this,b),R=0;break}}this.h=R,this.o+=_},i.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var S=T.length-8;S<T.length;++S)T[S]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,S=0;S<4;++S)for(let b=0;b<32;b+=8)T[_++]=this.g[S]>>>b&255;return T};function s(T,_){var S=l;return Object.prototype.hasOwnProperty.call(S,T)?S[T]:S[T]=_(T)}function a(T,_){this.h=_;const S=[];let b=!0;for(let R=T.length-1;R>=0;R--){const O=T[R]|0;b&&O==_||(S[R]=O,b=!1)}this.g=S}var l={};function u(T){return-128<=T&&T<128?s(T,function(_){return new a([_|0],_<0?-1:0)}):new a([T|0],T<0?-1:0)}function c(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return D(c(-T));const _=[];let S=1;for(let b=0;T>=S;b++)_[b]=T/S|0,S*=4294967296;return new a(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return D(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const S=c(Math.pow(_,8));let b=m;for(let O=0;O<T.length;O+=8){var R=Math.min(8,T.length-O);const w=parseInt(T.substring(O,O+R),_);R<8?(R=c(Math.pow(_,R)),b=b.j(R).add(c(w))):(b=b.j(S),b=b.add(c(w)))}return b}var m=u(0),p=u(1),y=u(16777216);t=a.prototype,t.m=function(){if(N(this))return-D(this).m();let T=0,_=1;for(let S=0;S<this.g.length;S++){const b=this.i(S);T+=(b>=0?b:4294967296+b)*_,_*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(I(this))return"0";if(N(this))return"-"+D(this).toString(T);const _=c(Math.pow(T,6));var S=this;let b="";for(;;){const R=M(S,_).g;S=v(S,R.j(_));let O=((S.g.length>0?S.g[0]:S.h)>>>0).toString(T);if(S=R,I(S))return O+b;for(;O.length<6;)O="0"+O;b=O+b}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function I(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function N(T){return T.h==-1}t.l=function(T){return T=v(this,T),N(T)?-1:I(T)?0:1};function D(T){const _=T.g.length,S=[];for(let b=0;b<_;b++)S[b]=~T.g[b];return new a(S,~T.h).add(p)}t.abs=function(){return N(this)?D(this):this},t.add=function(T){const _=Math.max(this.g.length,T.g.length),S=[];let b=0;for(let R=0;R<=_;R++){let O=b+(this.i(R)&65535)+(T.i(R)&65535),w=(O>>>16)+(this.i(R)>>>16)+(T.i(R)>>>16);b=w>>>16,O&=65535,w&=65535,S[R]=w<<16|O}return new a(S,S[S.length-1]&-2147483648?-1:0)};function v(T,_){return T.add(D(_))}t.j=function(T){if(I(this)||I(T))return m;if(N(this))return N(T)?D(this).j(D(T)):D(D(this).j(T));if(N(T))return D(this.j(D(T)));if(this.l(y)<0&&T.l(y)<0)return c(this.m()*T.m());const _=this.g.length+T.g.length,S=[];for(var b=0;b<2*_;b++)S[b]=0;for(b=0;b<this.g.length;b++)for(let R=0;R<T.g.length;R++){const O=this.i(b)>>>16,w=this.i(b)&65535,$e=T.i(R)>>>16,He=T.i(R)&65535;S[2*b+2*R]+=w*He,E(S,2*b+2*R),S[2*b+2*R+1]+=O*He,E(S,2*b+2*R+1),S[2*b+2*R+1]+=w*$e,E(S,2*b+2*R+1),S[2*b+2*R+2]+=O*$e,E(S,2*b+2*R+2)}for(T=0;T<_;T++)S[T]=S[2*T+1]<<16|S[2*T];for(T=_;T<2*_;T++)S[T]=0;return new a(S,0)};function E(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function A(T,_){this.g=T,this.h=_}function M(T,_){if(I(_))throw Error("division by zero");if(I(T))return new A(m,m);if(N(T))return _=M(D(T),_),new A(D(_.g),D(_.h));if(N(_))return _=M(T,D(_)),new A(D(_.g),_.h);if(T.g.length>30){if(N(T)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var S=p,b=_;b.l(T)<=0;)S=B(S),b=B(b);var R=F(S,1),O=F(b,1);for(b=F(b,2),S=F(S,2);!I(b);){var w=O.add(b);w.l(T)<=0&&(R=R.add(S),O=w),b=F(b,1),S=F(S,1)}return _=v(T,R.j(_)),new A(R,_)}for(R=m;T.l(_)>=0;){for(S=Math.max(1,Math.floor(T.m()/_.m())),b=Math.ceil(Math.log(S)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),O=c(S),w=O.j(_);N(w)||w.l(T)>0;)S-=b,O=c(S),w=O.j(_);I(O)&&(O=p),R=R.add(O),T=v(T,w)}return new A(R,T)}t.B=function(T){return M(this,T).h},t.and=function(T){const _=Math.max(this.g.length,T.g.length),S=[];for(let b=0;b<_;b++)S[b]=this.i(b)&T.i(b);return new a(S,this.h&T.h)},t.or=function(T){const _=Math.max(this.g.length,T.g.length),S=[];for(let b=0;b<_;b++)S[b]=this.i(b)|T.i(b);return new a(S,this.h|T.h)},t.xor=function(T){const _=Math.max(this.g.length,T.g.length),S=[];for(let b=0;b<_;b++)S[b]=this.i(b)^T.i(b);return new a(S,this.h^T.h)};function B(T){const _=T.g.length+1,S=[];for(let b=0;b<_;b++)S[b]=T.i(b)<<1|T.i(b-1)>>>31;return new a(S,T.h)}function F(T,_){const S=_>>5;_%=32;const b=T.g.length-S,R=[];for(let O=0;O<b;O++)R[O]=_>0?T.i(O+S)>>>_|T.i(O+S+1)<<32-_:T.i(O+S);return new a(R,T.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,sw=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=c,a.fromString=f,yr=a}).apply(typeof Gv<"u"?Gv:typeof self<"u"?self:typeof window<"u"?window:{});var Ou=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var aw,Do,ow,tc,Mm,lw,uw,cw;(function(){var t,e=Object.defineProperty;function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ou=="object"&&Ou];for(var h=0;h<o.length;++h){var d=o[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var i=n(this);function r(o,h){if(h)e:{var d=i;o=o.split(".");for(var g=0;g<o.length-1;g++){var V=o[g];if(!(V in d))break e;d=d[V]}o=o[o.length-1],g=d[o],h=h(g),h!=g&&h!=null&&e(d,o,{configurable:!0,writable:!0,value:h})}}r("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(o){return o||function(h){var d=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&d.push([g,h[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},a=this||self;function l(o){var h=typeof o;return h=="object"&&o!=null||h=="function"}function u(o,h,d){return o.call.apply(o.bind,arguments)}function c(o,h,d){return c=u,c.apply(null,arguments)}function f(o,h){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function m(o,h){function d(){}d.prototype=h.prototype,o.Z=h.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(g,V,P){for(var q=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)q[ue-2]=arguments[ue];return h.prototype[V].apply(g,q)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function y(o){const h=o.length;if(h>0){const d=Array(h);for(let g=0;g<h;g++)d[g]=o[g];return d}return[]}function I(o,h){for(let g=1;g<arguments.length;g++){const V=arguments[g];var d=typeof V;if(d=d!="object"?d:V?Array.isArray(V)?"array":d:"null",d=="array"||d=="object"&&typeof V.length=="number"){d=o.length||0;const P=V.length||0;o.length=d+P;for(let q=0;q<P;q++)o[d+q]=V[q]}else o.push(V)}}class N{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function D(o){a.setTimeout(()=>{throw o},0)}function v(){var o=T;let h=null;return o.g&&(h=o.g,o.g=o.g.next,o.g||(o.h=null),h.next=null),h}class E{constructor(){this.h=this.g=null}add(h,d){const g=A.get();g.set(h,d),this.h?this.h.next=g:this.g=g,this.h=g}}var A=new N(()=>new M,o=>o.reset());class M{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let B,F=!1,T=new E,_=()=>{const o=Promise.resolve(void 0);B=()=>{o.then(S)}};function S(){for(var o;o=v();){try{o.h.call(o.g)}catch(d){D(d)}var h=A;h.j(o),h.h<100&&(h.h++,o.next=h.g,h.g=o)}F=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function R(o,h){this.type=o,this.g=this.target=h,this.defaultPrevented=!1}R.prototype.h=function(){this.defaultPrevented=!0};var O=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,h=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,h),a.removeEventListener("test",d,h)}catch{}return o}();function w(o){return/^[\s\xa0]*$/.test(o)}function $e(o,h){R.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,h)}m($e,R),$e.prototype.init=function(o,h){const d=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=h,h=o.relatedTarget,h||(d=="mouseover"?h=o.fromElement:d=="mouseout"&&(h=o.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&$e.Z.h.call(this)},$e.prototype.h=function(){$e.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var He="closure_listenable_"+(Math.random()*1e6|0),j=0;function ae(o,h,d,g,V){this.listener=o,this.proxy=null,this.src=h,this.type=d,this.capture=!!g,this.ha=V,this.key=++j,this.da=this.fa=!1}function te(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function be(o,h,d){for(const g in o)h.call(d,o[g],g,o)}function k(o,h){for(const d in o)h.call(void 0,o[d],d,o)}function C(o){const h={};for(const d in o)h[d]=o[d];return h}const K="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function $(o,h){let d,g;for(let V=1;V<arguments.length;V++){g=arguments[V];for(d in g)o[d]=g[d];for(let P=0;P<K.length;P++)d=K[P],Object.prototype.hasOwnProperty.call(g,d)&&(o[d]=g[d])}}function Q(o){this.src=o,this.g={},this.h=0}Q.prototype.add=function(o,h,d,g,V){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const q=oe(o,h,g,V);return q>-1?(h=o[q],d||(h.fa=!1)):(h=new ae(h,this.src,P,!!g,V),h.fa=d,o.push(h)),h};function ee(o,h){const d=h.type;if(d in o.g){var g=o.g[d],V=Array.prototype.indexOf.call(g,h,void 0),P;(P=V>=0)&&Array.prototype.splice.call(g,V,1),P&&(te(h),o.g[d].length==0&&(delete o.g[d],o.h--))}}function oe(o,h,d,g){for(let V=0;V<o.length;++V){const P=o[V];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==g)return V}return-1}var X="closure_lm_"+(Math.random()*1e6|0),le={};function Se(o,h,d,g,V){if(Array.isArray(h)){for(let P=0;P<h.length;P++)Se(o,h[P],d,g,V);return null}return d=dn(d),o&&o[He]?o.J(h,d,l(g)?!!g.capture:!1,V):Fe(o,h,d,!1,g,V)}function Fe(o,h,d,g,V,P){if(!h)throw Error("Invalid event type");const q=l(V)?!!V.capture:!!V;let ue=Vt(o);if(ue||(o[X]=ue=new Q(o)),d=ue.add(h,d,g,q,P),d.proxy)return d;if(g=Ce(),d.proxy=g,g.src=o,g.listener=d,o.addEventListener)O||(V=q),V===void 0&&(V=!1),o.addEventListener(h.toString(),g,V);else if(o.attachEvent)o.attachEvent(fe(h.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ce(){function o(d){return h.call(o.src,o.listener,d)}const h=Ct;return o}function Pe(o,h,d,g,V){if(Array.isArray(h))for(var P=0;P<h.length;P++)Pe(o,h[P],d,g,V);else g=l(g)?!!g.capture:!!g,d=dn(d),o&&o[He]?(o=o.i,P=String(h).toString(),P in o.g&&(h=o.g[P],d=oe(h,d,g,V),d>-1&&(te(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete o.g[P],o.h--)))):o&&(o=Vt(o))&&(h=o.g[h.toString()],o=-1,h&&(o=oe(h,d,g,V)),(d=o>-1?h[o]:null)&&Ze(d))}function Ze(o){if(typeof o!="number"&&o&&!o.da){var h=o.src;if(h&&h[He])ee(h.i,o);else{var d=o.type,g=o.proxy;h.removeEventListener?h.removeEventListener(d,g,o.capture):h.detachEvent?h.detachEvent(fe(d),g):h.addListener&&h.removeListener&&h.removeListener(g),(d=Vt(h))?(ee(d,o),d.h==0&&(d.src=null,h[X]=null)):te(o)}}}function fe(o){return o in le?le[o]:le[o]="on"+o}function Ct(o,h){if(o.da)o=!0;else{h=new $e(h,this);const d=o.listener,g=o.ha||o.src;o.fa&&Ze(o),o=d.call(g,h)}return o}function Vt(o){return o=o[X],o instanceof Q?o:null}var kt="__closure_events_fn_"+(Math.random()*1e9>>>0);function dn(o){return typeof o=="function"?o:(o[kt]||(o[kt]=function(h){return o.handleEvent(h)}),o[kt])}function je(){b.call(this),this.i=new Q(this),this.M=this,this.G=null}m(je,b),je.prototype[He]=!0,je.prototype.removeEventListener=function(o,h,d,g){Pe(this,o,h,d,g)};function Oe(o,h){var d,g=o.G;if(g)for(d=[];g;g=g.G)d.push(g);if(o=o.M,g=h.type||h,typeof h=="string")h=new R(h,o);else if(h instanceof R)h.target=h.target||o;else{var V=h;h=new R(g,o),$(h,V)}V=!0;let P,q;if(d)for(q=d.length-1;q>=0;q--)P=h.g=d[q],V=Cs(P,g,!0,h)&&V;if(P=h.g=o,V=Cs(P,g,!0,h)&&V,V=Cs(P,g,!1,h)&&V,d)for(q=0;q<d.length;q++)P=h.g=d[q],V=Cs(P,g,!1,h)&&V}je.prototype.N=function(){if(je.Z.N.call(this),this.i){var o=this.i;for(const h in o.g){const d=o.g[h];for(let g=0;g<d.length;g++)te(d[g]);delete o.g[h],o.h--}}this.G=null},je.prototype.J=function(o,h,d,g){return this.i.add(String(o),h,!1,d,g)},je.prototype.K=function(o,h,d,g){return this.i.add(String(o),h,!0,d,g)};function Cs(o,h,d,g){if(h=o.i.g[String(h)],!h)return!0;h=h.concat();let V=!0;for(let P=0;P<h.length;++P){const q=h[P];if(q&&!q.da&&q.capture==d){const ue=q.listener,ct=q.ha||q.src;q.fa&&ee(o.i,q),V=ue.call(ct,g)!==!1&&V}}return V&&!g.defaultPrevented}function af(o,h){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=c(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:a.setTimeout(o,h||0)}function Wl(o){o.g=af(()=>{o.g=null,o.i&&(o.i=!1,Wl(o))},o.l);const h=o.h;o.h=null,o.m.apply(null,h)}class Jl extends b{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Wl(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pr(o){b.call(this),this.h=o,this.g={}}m(Pr,b);var Xa=[];function Zl(o){be(o.g,function(h,d){this.g.hasOwnProperty(d)&&Ze(h)},o),o.g={}}Pr.prototype.N=function(){Pr.Z.N.call(this),Zl(this)},Pr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Wa=a.JSON.stringify,eu=a.JSON.parse,tu=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Ds(){}function nu(){}var Lr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function of(){R.call(this,"d")}m(of,R);function lf(){R.call(this,"c")}m(lf,R);var Ur={},hy=null;function iu(){return hy=hy||new je}Ur.Ia="serverreachability";function fy(o){R.call(this,Ur.Ia,o)}m(fy,R);function Ja(o){const h=iu();Oe(h,new fy(h))}Ur.STAT_EVENT="statevent";function dy(o,h){R.call(this,Ur.STAT_EVENT,o),this.stat=h}m(dy,R);function Pt(o){const h=iu();Oe(h,new dy(h,o))}Ur.Ja="timingevent";function my(o,h){R.call(this,Ur.Ja,o),this.size=h}m(my,R);function Za(o,h){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},h)}function eo(){this.g=!0}eo.prototype.ua=function(){this.g=!1};function ZR(o,h,d,g,V,P){o.info(function(){if(o.g)if(P){var q="",ue=P.split("&");for(let De=0;De<ue.length;De++){var ct=ue[De].split("=");if(ct.length>1){const mt=ct[0];ct=ct[1];const Bn=mt.split("_");q=Bn.length>=2&&Bn[1]=="type"?q+(mt+"="+ct+"&"):q+(mt+"=redacted&")}}}else q=null;else q=P;return"XMLHTTP REQ ("+g+") [attempt "+V+"]: "+h+`
`+d+`
`+q})}function eI(o,h,d,g,V,P,q){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+V+"]: "+h+`
`+d+`
`+P+" "+q})}function Ns(o,h,d,g){o.info(function(){return"XMLHTTP TEXT ("+h+"): "+nI(o,d)+(g?" "+g:"")})}function tI(o,h){o.info(function(){return"TIMEOUT: "+h})}eo.prototype.info=function(){};function nI(o,h){if(!o.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var d=P[o];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var V=g[0];if(V!="noop"&&V!="stop"&&V!="close")for(let q=1;q<g.length;q++)g[q]=""}}}}return Wa(P)}catch{return h}}var ru={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},py={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},gy;function uf(){}m(uf,Ds),uf.prototype.g=function(){return new XMLHttpRequest},gy=new uf;function to(o){return encodeURIComponent(String(o))}function iI(o){var h=1;o=o.split(":");const d=[];for(;h>0&&o.length;)d.push(o.shift()),h--;return o.length&&d.push(o.join(":")),d}function Ui(o,h,d,g){this.j=o,this.i=h,this.l=d,this.S=g||1,this.V=new Pr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new yy}function yy(){this.i=null,this.g="",this.h=!1}var _y={},cf={};function hf(o,h,d){o.M=1,o.A=au(zn(h)),o.u=d,o.R=!0,vy(o,null)}function vy(o,h){o.F=Date.now(),su(o),o.B=zn(o.A);var d=o.B,g=o.S;Array.isArray(g)||(g=[String(g)]),My(d.i,"t",g),o.C=0,d=o.j.L,o.h=new yy,o.g=Xy(o.j,d?h:null,!o.u),o.P>0&&(o.O=new Jl(c(o.Y,o,o.g),o.P)),h=o.V,d=o.g,g=o.ba;var V="readystatechange";Array.isArray(V)||(V&&(Xa[0]=V.toString()),V=Xa);for(let P=0;P<V.length;P++){const q=Se(d,V[P],g||h.handleEvent,!1,h.h||h);if(!q)break;h.g[q.key]=q}h=o.J?C(o.J):{},o.u?(o.v||(o.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,h)):(o.v="GET",o.g.ea(o.B,o.v,null,h)),Ja(),ZR(o.i,o.v,o.B,o.l,o.S,o.u)}Ui.prototype.ba=function(o){o=o.target;const h=this.O;h&&Bi(o)==3?h.j():this.Y(o)},Ui.prototype.Y=function(o){try{if(o==this.g)e:{const ue=Bi(this.g),ct=this.g.ya(),De=this.g.ca();if(!(ue<3)&&(ue!=3||this.g&&(this.h.h||this.g.la()||zy(this.g)))){this.K||ue!=4||ct==7||(ct==8||De<=0?Ja(3):Ja(2)),ff(this);var h=this.g.ca();this.X=h;var d=rI(this);if(this.o=h==200,eI(this.i,this.v,this.B,this.l,this.S,ue,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,V=this.g;if((g=V.g?V.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(g)){var P=g;break t}}P=null}if(o=P)Ns(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,df(this,o);else{this.o=!1,this.m=3,Pt(12),xr(this),no(this);break e}}if(this.R){o=!0;let mt;for(;!this.K&&this.C<d.length;)if(mt=sI(this,d),mt==cf){ue==4&&(this.m=4,Pt(14),o=!1),Ns(this.i,this.l,null,"[Incomplete Response]");break}else if(mt==_y){this.m=4,Pt(15),Ns(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Ns(this.i,this.l,mt,null),df(this,mt);if(Ey(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ue!=4||d.length!=0||this.h.h||(this.m=1,Pt(16),o=!1),this.o=this.o&&o,!o)Ns(this.i,this.l,d,"[Invalid Chunked Response]"),xr(this),no(this);else if(d.length>0&&!this.W){this.W=!0;var q=this.j;q.g==this&&q.aa&&!q.P&&(q.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Tf(q),q.P=!0,Pt(11))}}else Ns(this.i,this.l,d,null),df(this,d);ue==4&&xr(this),this.o&&!this.K&&(ue==4?Ky(this.j,this):(this.o=!1,su(this)))}else vI(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,Pt(12)):(this.m=0,Pt(13)),xr(this),no(this)}}}catch{}finally{}};function rI(o){if(!Ey(o))return o.g.la();const h=zy(o.g);if(h==="")return"";let d="";const g=h.length,V=Bi(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return xr(o),no(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<g;P++)o.h.h=!0,d+=o.h.i.decode(h[P],{stream:!(V&&P==g-1)});return h.length=0,o.h.g+=d,o.C=0,o.h.g}function Ey(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function sI(o,h){var d=o.C,g=h.indexOf(`
`,d);return g==-1?cf:(d=Number(h.substring(d,g)),isNaN(d)?_y:(g+=1,g+d>h.length?cf:(h=h.slice(g,g+d),o.C=g+d,h)))}Ui.prototype.cancel=function(){this.K=!0,xr(this)};function su(o){o.T=Date.now()+o.H,Ty(o,o.H)}function Ty(o,h){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Za(c(o.aa,o),h)}function ff(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ui.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(tI(this.i,this.B),this.M!=2&&(Ja(),Pt(17)),xr(this),this.m=2,no(this)):Ty(this,this.T-o)};function no(o){o.j.I==0||o.K||Ky(o.j,o)}function xr(o){ff(o);var h=o.O;h&&typeof h.dispose=="function"&&h.dispose(),o.O=null,Zl(o.V),o.g&&(h=o.g,o.g=null,h.abort(),h.dispose())}function df(o,h){try{var d=o.j;if(d.I!=0&&(d.g==o||mf(d.h,o))){if(!o.L&&mf(d.h,o)&&d.I==3){try{var g=d.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var V=g;if(V[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)hu(d),uu(d);else break e;Ef(d),Pt(18)}}else d.xa=V[1],0<d.xa-d.K&&V[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Za(c(d.Va,d),6e3));wy(d.h)<=1&&d.ta&&(d.ta=void 0)}else Br(d,11)}else if((o.L||d.g==o)&&hu(d),!w(h))for(V=d.Ba.g.parse(h),h=0;h<V.length;h++){let De=V[h];const mt=De[0];if(!(mt<=d.K))if(d.K=mt,De=De[1],d.I==2)if(De[0]=="c"){d.M=De[1],d.ba=De[2];const Bn=De[3];Bn!=null&&(d.ka=Bn,d.j.info("VER="+d.ka));const qr=De[4];qr!=null&&(d.za=qr,d.j.info("SVER="+d.za));const qi=De[5];qi!=null&&typeof qi=="number"&&qi>0&&(g=1.5*qi,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Hi=o.g;if(Hi){const du=Hi.g?Hi.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(du){var P=g.h;P.g||du.indexOf("spdy")==-1&&du.indexOf("quic")==-1&&du.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(pf(P,P.h),P.h=null))}if(g.G){const Sf=Hi.g?Hi.g.getResponseHeader("X-HTTP-Session-Id"):null;Sf&&(g.wa=Sf,Le(g.J,g.G,Sf))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var q=o;if(g.na=Qy(g,g.L?g.ba:null,g.W),q.L){by(g.h,q);var ue=q,ct=g.O;ct&&(ue.H=ct),ue.D&&(ff(ue),su(ue)),g.g=q}else jy(g);d.i.length>0&&cu(d)}else De[0]!="stop"&&De[0]!="close"||Br(d,7);else d.I==3&&(De[0]=="stop"||De[0]=="close"?De[0]=="stop"?Br(d,7):vf(d):De[0]!="noop"&&d.l&&d.l.qa(De),d.A=0)}}Ja(4)}catch{}}var aI=class{constructor(o,h){this.g=o,this.map=h}};function Sy(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ay(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function wy(o){return o.h?1:o.g?o.g.size:0}function mf(o,h){return o.h?o.h==h:o.g?o.g.has(h):!1}function pf(o,h){o.g?o.g.add(h):o.h=h}function by(o,h){o.h&&o.h==h?o.h=null:o.g&&o.g.has(h)&&o.g.delete(h)}Sy.prototype.cancel=function(){if(this.i=Ry(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ry(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let h=o.i;for(const d of o.g.values())h=h.concat(d.G);return h}return y(o.i)}var Iy=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function oI(o,h){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const g=o[d].indexOf("=");let V,P=null;g>=0?(V=o[d].substring(0,g),P=o[d].substring(g+1)):V=o[d],h(V,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function xi(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;o instanceof xi?(this.l=o.l,io(this,o.j),this.o=o.o,this.g=o.g,ro(this,o.u),this.h=o.h,gf(this,Vy(o.i)),this.m=o.m):o&&(h=String(o).match(Iy))?(this.l=!1,io(this,h[1]||"",!0),this.o=so(h[2]||""),this.g=so(h[3]||"",!0),ro(this,h[4]),this.h=so(h[5]||"",!0),gf(this,h[6]||"",!0),this.m=so(h[7]||"")):(this.l=!1,this.i=new oo(null,this.l))}xi.prototype.toString=function(){const o=[];var h=this.j;h&&o.push(ao(h,Cy,!0),":");var d=this.g;return(d||h=="file")&&(o.push("//"),(h=this.o)&&o.push(ao(h,Cy,!0),"@"),o.push(to(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ao(d,d.charAt(0)=="/"?cI:uI,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ao(d,fI)),o.join("")},xi.prototype.resolve=function(o){const h=zn(this);let d=!!o.j;d?io(h,o.j):d=!!o.o,d?h.o=o.o:d=!!o.g,d?h.g=o.g:d=o.u!=null;var g=o.h;if(d)ro(h,o.u);else if(d=!!o.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var V=h.h.lastIndexOf("/");V!=-1&&(g=h.h.slice(0,V+1)+g)}if(V=g,V==".."||V==".")g="";else if(V.indexOf("./")!=-1||V.indexOf("/.")!=-1){g=V.lastIndexOf("/",0)==0,V=V.split("/");const P=[];for(let q=0;q<V.length;){const ue=V[q++];ue=="."?g&&q==V.length&&P.push(""):ue==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),g&&q==V.length&&P.push("")):(P.push(ue),g=!0)}g=P.join("/")}else g=V}return d?h.h=g:d=o.i.toString()!=="",d?gf(h,Vy(o.i)):d=!!o.m,d&&(h.m=o.m),h};function zn(o){return new xi(o)}function io(o,h,d){o.j=d?so(h,!0):h,o.j&&(o.j=o.j.replace(/:$/,""))}function ro(o,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);o.u=h}else o.u=null}function gf(o,h,d){h instanceof oo?(o.i=h,dI(o.i,o.l)):(d||(h=ao(h,hI)),o.i=new oo(h,o.l))}function Le(o,h,d){o.i.set(h,d)}function au(o){return Le(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function so(o,h){return o?h?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ao(o,h,d){return typeof o=="string"?(o=encodeURI(o).replace(h,lI),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function lI(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Cy=/[#\/\?@]/g,uI=/[#\?:]/g,cI=/[#\?]/g,hI=/[#\?@]/g,fI=/#/g;function oo(o,h){this.h=this.g=null,this.i=o||null,this.j=!!h}function zr(o){o.g||(o.g=new Map,o.h=0,o.i&&oI(o.i,function(h,d){o.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}t=oo.prototype,t.add=function(o,h){zr(this),this.i=null,o=Os(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(h),this.h+=1,this};function Dy(o,h){zr(o),h=Os(o,h),o.g.has(h)&&(o.i=null,o.h-=o.g.get(h).length,o.g.delete(h))}function Ny(o,h){return zr(o),h=Os(o,h),o.g.has(h)}t.forEach=function(o,h){zr(this),this.g.forEach(function(d,g){d.forEach(function(V){o.call(h,V,g,this)},this)},this)};function Oy(o,h){zr(o);let d=[];if(typeof h=="string")Ny(o,h)&&(d=d.concat(o.g.get(Os(o,h))));else for(o=Array.from(o.g.values()),h=0;h<o.length;h++)d=d.concat(o[h]);return d}t.set=function(o,h){return zr(this),this.i=null,o=Os(this,o),Ny(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[h]),this.h+=1,this},t.get=function(o,h){return o?(o=Oy(this,o),o.length>0?String(o[0]):h):h};function My(o,h,d){Dy(o,h),d.length>0&&(o.i=null,o.g.set(Os(o,h),y(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var d=h[g];const V=to(d);d=Oy(this,d);for(let P=0;P<d.length;P++){let q=V;d[P]!==""&&(q+="="+to(d[P])),o.push(q)}}return this.i=o.join("&")};function Vy(o){const h=new oo;return h.i=o.i,o.g&&(h.g=new Map(o.g),h.h=o.h),h}function Os(o,h){return h=String(h),o.j&&(h=h.toLowerCase()),h}function dI(o,h){h&&!o.j&&(zr(o),o.i=null,o.g.forEach(function(d,g){const V=g.toLowerCase();g!=V&&(Dy(this,g),My(this,V,d))},o)),o.j=h}function mI(o,h){const d=new eo;if(a.Image){const g=new Image;g.onload=f(zi,d,"TestLoadImage: loaded",!0,h,g),g.onerror=f(zi,d,"TestLoadImage: error",!1,h,g),g.onabort=f(zi,d,"TestLoadImage: abort",!1,h,g),g.ontimeout=f(zi,d,"TestLoadImage: timeout",!1,h,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else h(!1)}function pI(o,h){const d=new eo,g=new AbortController,V=setTimeout(()=>{g.abort(),zi(d,"TestPingServer: timeout",!1,h)},1e4);fetch(o,{signal:g.signal}).then(P=>{clearTimeout(V),P.ok?zi(d,"TestPingServer: ok",!0,h):zi(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(V),zi(d,"TestPingServer: error",!1,h)})}function zi(o,h,d,g,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),g(d)}catch{}}function gI(){this.g=new tu}function yf(o){this.i=o.Sb||null,this.h=o.ab||!1}m(yf,Ds),yf.prototype.g=function(){return new ou(this.i,this.h)};function ou(o,h){je.call(this),this.H=o,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(ou,je),t=ou.prototype,t.open=function(o,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=h,this.readyState=1,uo(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(h.body=o),(this.H||a).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,lo(this)),this.readyState=0},t.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,uo(this)),this.g&&(this.readyState=3,uo(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ky(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ky(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}t.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var h=o.value?o.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!o.done}))&&(this.response=this.responseText+=h)}o.done?lo(this):uo(this),this.readyState==3&&ky(this)}},t.Oa=function(o){this.g&&(this.response=this.responseText=o,lo(this))},t.Na=function(o){this.g&&(this.response=o,lo(this))},t.ga=function(){this.g&&lo(this)};function lo(o){o.readyState=4,o.l=null,o.j=null,o.B=null,uo(o)}t.setRequestHeader=function(o,h){this.A.append(o,h)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=h.next();return o.join(`\r
`)};function uo(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ou.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Py(o){let h="";return be(o,function(d,g){h+=g,h+=":",h+=d,h+=`\r
`}),h}function _f(o,h,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Py(d),typeof o=="string"?d!=null&&to(d):Le(o,h,d))}function Qe(o){je.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(Qe,je);var yI=/^https?$/i,_I=["POST","PUT"];t=Qe.prototype,t.Fa=function(o){this.H=o},t.ea=function(o,h,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);h=h?h.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():gy.g(),this.g.onreadystatechange=p(c(this.Ca,this));try{this.B=!0,this.g.open(h,String(o),!0),this.B=!1}catch(P){Ly(this,P);return}if(o=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var V in g)d.set(V,g[V]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())d.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),V=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(_I,h,void 0)>=0)||g||V||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,q]of d)this.g.setRequestHeader(P,q);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){Ly(this,P)}};function Ly(o,h){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=h,o.o=5,Uy(o),lu(o)}function Uy(o){o.A||(o.A=!0,Oe(o,"complete"),Oe(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Oe(this,"complete"),Oe(this,"abort"),lu(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),lu(this,!0)),Qe.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?xy(this):this.Xa())},t.Xa=function(){xy(this)};function xy(o){if(o.h&&typeof s<"u"){if(o.v&&Bi(o)==4)setTimeout(o.Ca.bind(o),0);else if(Oe(o,"readystatechange"),Bi(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var g;if(g=P===0){let q=String(o.D).match(Iy)[1]||null;!q&&a.self&&a.self.location&&(q=a.self.location.protocol.slice(0,-1)),g=!yI.test(q?q.toLowerCase():"")}d=g}if(d)Oe(o,"complete"),Oe(o,"success");else{o.o=6;try{var V=Bi(o)>2?o.g.statusText:""}catch{V=""}o.l=V+" ["+o.ca()+"]",Uy(o)}}finally{lu(o)}}}}function lu(o,h){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,h||Oe(o,"ready");try{d.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Bi(o){return o.g?o.g.readyState:0}t.ca=function(){try{return Bi(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(o){if(this.g){var h=this.g.responseText;return o&&h.indexOf(o)==0&&(h=h.substring(o.length)),eu(h)}};function zy(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function vI(o){const h={};o=(o.g&&Bi(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(w(o[g]))continue;var d=iI(o[g]);const V=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=h[V]||[];h[V]=P,P.push(d)}k(h,function(g){return g.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function co(o,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||h}function By(o){this.za=0,this.i=[],this.j=new eo,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=co("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=co("baseRetryDelayMs",5e3,o),this.Za=co("retryDelaySeedMs",1e4,o),this.Ta=co("forwardChannelMaxRetries",2,o),this.va=co("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Sy(o&&o.concurrentRequestLimit),this.Ba=new gI,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=By.prototype,t.ka=8,t.I=1,t.connect=function(o,h,d,g){Pt(0),this.W=o,this.H=h||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Qy(this,null,this.W),cu(this)};function vf(o){if(qy(o),o.I==3){var h=o.V++,d=zn(o.J);if(Le(d,"SID",o.M),Le(d,"RID",h),Le(d,"TYPE","terminate"),ho(o,d),h=new Ui(o,o.j,h),h.M=2,h.A=au(zn(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=h.A,d=!0),d||(h.g=Xy(h.j,null),h.g.ea(h.A)),h.F=Date.now(),su(h)}$y(o)}function uu(o){o.g&&(Tf(o),o.g.cancel(),o.g=null)}function qy(o){uu(o),o.v&&(a.clearTimeout(o.v),o.v=null),hu(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function cu(o){if(!Ay(o.h)&&!o.m){o.m=!0;var h=o.Ea;B||_(),F||(B(),F=!0),T.add(h,o),o.D=0}}function EI(o,h){return wy(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=h.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Za(c(o.Ea,o,h),Yy(o,o.D)),o.D++,!0)}t.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const V=new Ui(this,this.j,o);let P=this.o;if(this.U&&(P?(P=C(P),$(P,this.U)):P=this.U),this.u!==null||this.R||(V.J=P,P=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=Fy(this,V,h),d=zn(this.J),Le(d,"RID",o),Le(d,"CVER",22),this.G&&Le(d,"X-HTTP-Session-Id",this.G),ho(this,d),P&&(this.R?h="headers="+to(Py(P))+"&"+h:this.u&&_f(d,this.u,P)),pf(this.h,V),this.Ra&&Le(d,"TYPE","init"),this.S?(Le(d,"$req",h),Le(d,"SID","null"),V.U=!0,hf(V,d,null)):hf(V,d,h),this.I=2}}else this.I==3&&(o?Hy(this,o):this.i.length==0||Ay(this.h)||Hy(this))};function Hy(o,h){var d;h?d=h.l:d=o.V++;const g=zn(o.J);Le(g,"SID",o.M),Le(g,"RID",d),Le(g,"AID",o.K),ho(o,g),o.u&&o.o&&_f(g,o.u,o.o),d=new Ui(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),h&&(o.i=h.G.concat(o.i)),h=Fy(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),pf(o.h,d),hf(d,g,h)}function ho(o,h){o.H&&be(o.H,function(d,g){Le(h,g,d)}),o.l&&be({},function(d,g){Le(h,g,d)})}function Fy(o,h,d){d=Math.min(o.i.length,d);const g=o.l?c(o.l.Ka,o.l,o):null;e:{var V=o.i;let ue=-1;for(;;){const ct=["count="+d];ue==-1?d>0?(ue=V[0].g,ct.push("ofs="+ue)):ue=0:ct.push("ofs="+ue);let De=!0;for(let mt=0;mt<d;mt++){var P=V[mt].g;const Bn=V[mt].map;if(P-=ue,P<0)ue=Math.max(0,V[mt].g-100),De=!1;else try{P="req"+P+"_"||"";try{var q=Bn instanceof Map?Bn:Object.entries(Bn);for(const[qr,qi]of q){let Hi=qi;l(qi)&&(Hi=Wa(qi)),ct.push(P+qr+"="+encodeURIComponent(Hi))}}catch(qr){throw ct.push(P+"type="+encodeURIComponent("_badmap")),qr}}catch{g&&g(Bn)}}if(De){q=ct.join("&");break e}}q=void 0}return o=o.i.splice(0,d),h.G=o,q}function jy(o){if(!o.g&&!o.v){o.Y=1;var h=o.Da;B||_(),F||(B(),F=!0),T.add(h,o),o.A=0}}function Ef(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Za(c(o.Da,o),Yy(o,o.A)),o.A++,!0)}t.Da=function(){if(this.v=null,Gy(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Za(c(this.Wa,this),o)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Pt(10),uu(this),Gy(this))};function Tf(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Gy(o){o.g=new Ui(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var h=zn(o.na);Le(h,"RID","rpc"),Le(h,"SID",o.M),Le(h,"AID",o.K),Le(h,"CI",o.F?"0":"1"),!o.F&&o.ia&&Le(h,"TO",o.ia),Le(h,"TYPE","xmlhttp"),ho(o,h),o.u&&o.o&&_f(h,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=au(zn(h)),d.u=null,d.R=!0,vy(d,o)}t.Va=function(){this.C!=null&&(this.C=null,uu(this),Ef(this),Pt(19))};function hu(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Ky(o,h){var d=null;if(o.g==h){hu(o),Tf(o),o.g=null;var g=2}else if(mf(o.h,h))d=h.G,by(o.h,h),g=1;else return;if(o.I!=0){if(h.o)if(g==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var V=o.D;g=iu(),Oe(g,new my(g,d)),cu(o)}else jy(o);else if(V=h.m,V==3||V==0&&h.X>0||!(g==1&&EI(o,h)||g==2&&Ef(o)))switch(d&&d.length>0&&(h=o.h,h.i=h.i.concat(d)),V){case 1:Br(o,5);break;case 4:Br(o,10);break;case 3:Br(o,6);break;default:Br(o,2)}}}function Yy(o,h){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*h}function Br(o,h){if(o.j.info("Error code "+h),h==2){var d=c(o.bb,o),g=o.Ua;const V=!g;g=new xi(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||io(g,"https"),au(g),V?mI(g.toString(),d):pI(g.toString(),d)}else Pt(2);o.I=0,o.l&&o.l.pa(h),$y(o),qy(o)}t.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Pt(2)):(this.j.info("Failed to ping google.com"),Pt(1))};function $y(o){if(o.I=0,o.ja=[],o.l){const h=Ry(o.h);(h.length!=0||o.i.length!=0)&&(I(o.ja,h),I(o.ja,o.i),o.h.i.length=0,y(o.i),o.i.length=0),o.l.oa()}}function Qy(o,h,d){var g=d instanceof xi?zn(d):new xi(d);if(g.g!="")h&&(g.g=h+"."+g.g),ro(g,g.u);else{var V=a.location;g=V.protocol,h=h?h+"."+V.hostname:V.hostname,V=+V.port;const P=new xi(null);g&&io(P,g),h&&(P.g=h),V&&ro(P,V),d&&(P.h=d),g=P}return d=o.G,h=o.wa,d&&h&&Le(g,d,h),Le(g,"VER",o.ka),ho(o,g),g}function Xy(o,h,d){if(h&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=o.Aa&&!o.ma?new Qe(new yf({ab:d})):new Qe(o.ma),h.Fa(o.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Wy(){}t=Wy.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function fu(){}fu.prototype.g=function(o,h){return new Jt(o,h)};function Jt(o,h){je.call(this),this.g=new By(h),this.l=o,this.h=h&&h.messageUrlParams||null,o=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(o?o["X-WebChannel-Content-Type"]=h.messageContentType:o={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(o?o["X-WebChannel-Client-Profile"]=h.sa:o={"X-WebChannel-Client-Profile":h.sa}),this.g.U=o,(o=h&&h.Qb)&&!w(o)&&(this.g.u=o),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!w(h)&&(this.g.G=h,o=this.h,o!==null&&h in o&&(o=this.h,h in o&&delete o[h])),this.j=new Ms(this)}m(Jt,je),Jt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Jt.prototype.close=function(){vf(this.g)},Jt.prototype.o=function(o){var h=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=Wa(o),o=d);h.i.push(new aI(h.Ya++,o)),h.I==3&&cu(h)},Jt.prototype.N=function(){this.g.l=null,delete this.j,vf(this.g),delete this.g,Jt.Z.N.call(this)};function Jy(o){of.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var h=o.__sm__;if(h){e:{for(const d in h){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,h=h!==null&&o in h?h[o]:void 0),this.data=h}else this.data=o}m(Jy,of);function Zy(){lf.call(this),this.status=1}m(Zy,lf);function Ms(o){this.g=o}m(Ms,Wy),Ms.prototype.ra=function(){Oe(this.g,"a")},Ms.prototype.qa=function(o){Oe(this.g,new Jy(o))},Ms.prototype.pa=function(o){Oe(this.g,new Zy)},Ms.prototype.oa=function(){Oe(this.g,"b")},fu.prototype.createWebChannel=fu.prototype.g,Jt.prototype.send=Jt.prototype.o,Jt.prototype.open=Jt.prototype.m,Jt.prototype.close=Jt.prototype.close,cw=function(){return new fu},uw=function(){return iu()},lw=Ur,Mm={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ru.NO_ERROR=0,ru.TIMEOUT=8,ru.HTTP_ERROR=6,tc=ru,py.COMPLETE="complete",ow=py,nu.EventType=Lr,Lr.OPEN="a",Lr.CLOSE="b",Lr.ERROR="c",Lr.MESSAGE="d",je.prototype.listen=je.prototype.J,Do=nu,Qe.prototype.listenOnce=Qe.prototype.K,Qe.prototype.getLastError=Qe.prototype.Ha,Qe.prototype.getLastErrorCode=Qe.prototype.ya,Qe.prototype.getStatus=Qe.prototype.ca,Qe.prototype.getResponseJson=Qe.prototype.La,Qe.prototype.getResponseText=Qe.prototype.la,Qe.prototype.send=Qe.prototype.ea,Qe.prototype.setWithCredentials=Qe.prototype.Fa,aw=Qe}).apply(typeof Ou<"u"?Ou:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Nt.UNAUTHENTICATED=new Nt(null),Nt.GOOGLE_CREDENTIALS=new Nt("google-credentials-uid"),Nt.FIRST_PARTY=new Nt("first-party-uid"),Nt.MOCK_USER=new Nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fa="12.11.0";function b2(t){Fa=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=new og("@firebase/firestore");function xs(){return ls.logLevel}function G(t,...e){if(ls.logLevel<=de.DEBUG){const n=e.map(ug);ls.debug(`Firestore (${Fa}): ${t}`,...n)}}function Oi(t,...e){if(ls.logLevel<=de.ERROR){const n=e.map(ug);ls.error(`Firestore (${Fa}): ${t}`,...n)}}function us(t,...e){if(ls.logLevel<=de.WARN){const n=e.map(ug);ls.warn(`Firestore (${Fa}): ${t}`,...n)}}function ug(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,hw(t,i,n)}function hw(t,e,n){let i=`FIRESTORE (${Fa}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw Oi(i),new Error(i)}function Te(t,e,n,i){let r="Unexpected state";typeof n=="string"?r=n:i=n,t||hw(e,r,i)}function ie(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends Un{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class R2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Nt.UNAUTHENTICATED))}shutdown(){}}class I2{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class C2{constructor(e){this.t=e,this.currentUser=Nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Te(this.o===void 0,42304);let i=this.i;const r=u=>this.i!==i?(i=this.i,n(u)):Promise.resolve();let s=new Ti;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ti,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},l=u=>{G("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(G("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ti)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(i=>this.i!==e?(G("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Te(typeof i.accessToken=="string",31837,{l:i}),new fw(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string",2055,{h:e}),new Nt(e)}}class D2{constructor(e,n,i){this.P=e,this.T=n,this.I=i,this.type="FirstParty",this.user=Nt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class N2{constructor(e,n,i){this.P=e,this.T=n,this.I=i}getToken(){return Promise.resolve(new D2(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(Nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Kv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class O2{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,nn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Te(this.o===void 0,3512);const i=s=>{s.error!=null&&G("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,G("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>i(s))};const r=s=>{G("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>r(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?r(s):G("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Kv(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Te(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Kv(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M2(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let i=0;i<t;i++)n[i]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const r=M2(40);for(let s=0;s<r.length;++s)i.length<20&&r[s]<n&&(i+=e.charAt(r[s]%62))}return i}}function me(t,e){return t<e?-1:t>e?1:0}function Vm(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const r=t.charAt(i),s=e.charAt(i);if(r!==s)return pd(r)===pd(s)?me(r,s):pd(r)?1:-1}return me(t.length,e.length)}const V2=55296,k2=57343;function pd(t){const e=t.charCodeAt(0);return e>=V2&&e<=k2}function wa(t,e,n){return t.length===e.length&&t.every((i,r)=>n(i,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yv="__name__";class qn{constructor(e,n,i){n===void 0?n=0:n>e.length&&J(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&J(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return qn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof qn?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const i=Math.min(e.length,n.length);for(let r=0;r<i;r++){const s=qn.compareSegments(e.get(r),n.get(r));if(s!==0)return s}return me(e.length,n.length)}static compareSegments(e,n){const i=qn.isNumericId(e),r=qn.isNumericId(n);return i&&!r?-1:!i&&r?1:i&&r?qn.extractNumericId(e).compare(qn.extractNumericId(n)):Vm(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return yr.fromString(e.substring(4,e.length-2))}}class Me extends qn{construct(e,n,i){return new Me(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const i of e){if(i.indexOf("//")>=0)throw new H(U.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(r=>r.length>0))}return new Me(n)}static emptyPath(){return new Me([])}}const P2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class wt extends qn{construct(e,n,i){return new wt(e,n,i)}static isValidIdentifier(e){return P2.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),wt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yv}static keyField(){return new wt([Yv])}static fromServerFormat(e){const n=[];let i="",r=0;const s=()=>{if(i.length===0)throw new H(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(i),i=""};let a=!1;for(;r<e.length;){const l=e[r];if(l==="\\"){if(r+1===e.length)throw new H(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new H(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=u,r+=2}else l==="`"?(a=!a,r++):l!=="."||a?(i+=l,r++):(s(),r++)}if(s(),a)throw new H(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new wt(n)}static emptyPath(){return new wt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(Me.fromString(e))}static fromName(e){return new Y(Me.fromString(e).popFirst(5))}static empty(){return new Y(Me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Me.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new Me(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(t,e,n){if(!n)throw new H(U.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function L2(t,e,n,i){if(e===!0&&i===!0)throw new H(U.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function $v(t){if(!Y.isDocumentKey(t))throw new H(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Qv(t){if(Y.isDocumentKey(t))throw new H(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function mw(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ph(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J(12329,{type:typeof t})}function xt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ph(t);throw new H(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(t,e){const n={typeString:t};return e&&(n.value=e),n}function xl(t,e){if(!mw(t))throw new H(U.INVALID_ARGUMENT,"JSON must be an object");let n;for(const i in e)if(e[i]){const r=e[i].typeString,s="value"in e[i]?{value:e[i].value}:void 0;if(!(i in t)){n=`JSON missing required field: '${i}'`;break}const a=t[i];if(r&&typeof a!==r){n=`JSON field '${i}' must be a ${r}.`;break}if(s!==void 0&&a!==s.value){n=`Expected '${i}' field to equal '${s.value}'`;break}}if(n)throw new H(U.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=-62135596800,Wv=1e6;class ze{static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*Wv);return new ze(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Xv)throw new H(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Wv}_compareTo(e){return this.seconds===e.seconds?me(this.nanoseconds,e.nanoseconds):me(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ze._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(xl(e,ze._jsonSchema))return new ze(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Xv;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ze._jsonSchemaVersion="firestore/timestamp/1.0",ze._jsonSchema={type:ut("string",ze._jsonSchemaVersion),seconds:ut("number"),nanoseconds:ut("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{static fromTimestamp(e){return new ne(e)}static min(){return new ne(new ze(0,0))}static max(){return new ne(new ze(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=-1;function U2(t,e){const n=t.toTimestamp().seconds,i=t.toTimestamp().nanoseconds+1,r=ne.fromTimestamp(i===1e9?new ze(n+1,0):new ze(n,i));return new Ar(r,Y.empty(),e)}function x2(t){return new Ar(t.readTime,t.key,ml)}class Ar{constructor(e,n,i){this.readTime=e,this.documentKey=n,this.largestBatchId=i}static min(){return new Ar(ne.min(),Y.empty(),ml)}static max(){return new Ar(ne.max(),Y.empty(),ml)}}function z2(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Y.comparator(t.documentKey,e.documentKey),n!==0?n:me(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class q2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ja(t){if(t.code!==U.FAILED_PRECONDITION||t.message!==B2)throw t;G("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new z((i,r)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(i,r)},this.catchCallback=s=>{this.wrapFailure(n,s).next(i,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof z?n:z.resolve(n)}catch(n){return z.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):z.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):z.reject(n)}static resolve(e){return new z((n,i)=>{n(e)})}static reject(e){return new z((n,i)=>{i(e)})}static waitFor(e){return new z((n,i)=>{let r=0,s=0,a=!1;e.forEach(l=>{++r,l.next(()=>{++s,a&&s===r&&n()},u=>i(u))}),a=!0,s===r&&n()})}static or(e){let n=z.resolve(!1);for(const i of e)n=n.next(r=>r?z.resolve(r):i());return n}static forEach(e,n){const i=[];return e.forEach((r,s)=>{i.push(n.call(this,r,s))}),this.waitFor(i)}static mapArray(e,n){return new z((i,r)=>{const s=e.length,a=new Array(s);let l=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(f=>{a[c]=f,++l,l===s&&i(a)},f=>r(f))}})}static doWhile(e,n){return new z((i,r)=>{const s=()=>{e()===!0?n().next(()=>{s()},r):i()};s()})}}function H2(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ga(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>n.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Lh.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=-1;function Uh(t){return t==null}function Fc(t){return t===0&&1/t==-1/0}function F2(t){return typeof t=="number"&&Number.isInteger(t)&&!Fc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw="";function j2(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Jv(e)),e=G2(t.get(n),e);return Jv(e)}function G2(t,e){let n=e;const i=t.length;for(let r=0;r<i;r++){const s=t.charAt(r);switch(s){case"\0":n+="";break;case pw:n+="";break;default:n+=s}}return n}function Jv(t){return t+pw+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Or(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function gw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,n){this.comparator=e,this.root=n||Et.EMPTY}insert(e,n){return new Ye(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(e){return new Ye(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Et.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return n.value;i<0?n=n.left:i>0&&(n=n.right)}return null}indexOf(e){let n=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return n+i.left.size;r<0?i=i.left:(n+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,i)=>(e(n,i),!1))}toString(){const e=[];return this.inorderTraversal((n,i)=>(e.push(`${n}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Mu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Mu(this.root,e,this.comparator,!1)}getReverseIterator(){return new Mu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Mu(this.root,e,this.comparator,!0)}}class Mu{constructor(e,n,i,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?i(e.key,n):1,n&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Et{constructor(e,n,i,r,s){this.key=e,this.value=n,this.color=i??Et.RED,this.left=r??Et.EMPTY,this.right=s??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,i,r,s){return new Et(e??this.key,n??this.value,i??this.color,r??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let r=this;const s=i(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,n,i),null):s===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let i,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return Et.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw J(43730,{key:this.key,value:this.value});if(this.right.isRed())throw J(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw J(27949);return e+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw J(57766)}get value(){throw J(16141)}get color(){throw J(16727)}get left(){throw J(29726)}get right(){throw J(36894)}copy(e,n,i,r,s){return this}insert(e,n,i){return new Et(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.comparator=e,this.data=new Ye(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,i)=>(e(n),!1))}forEachInRange(e,n){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let i;for(i=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new eE(this.data.getIterator())}getIteratorFrom(e){return new eE(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(i=>{n=n.add(i)}),n}isEqual(e){if(!(e instanceof ft)||this.size!==e.size)return!1;const n=this.data.getIterator(),i=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,s=i.getNext().key;if(this.comparator(r,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ft(this.comparator);return n.data=e,n}}class eE{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.fields=e,e.sort(wt.comparator)}static empty(){return new sn([])}unionWith(e){let n=new ft(wt.comparator);for(const i of this.fields)n=n.add(i);for(const i of e)n=n.add(i);return new sn(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return wa(this.fields,e.fields,(n,i)=>n.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new yw("Invalid base64 string: "+s):s}}(e);return new It(n)}static fromUint8Array(e){const n=function(r){let s="";for(let a=0;a<r.length;++a)s+=String.fromCharCode(r[a]);return s}(e);return new It(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return me(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}It.EMPTY_BYTE_STRING=new It("");const K2=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function wr(t){if(Te(!!t,39018),typeof t=="string"){let e=0;const n=K2.exec(t);if(Te(!!n,46558,{timestamp:t}),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(t);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:et(t.seconds),nanos:et(t.nanos)}}function et(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function br(t){return typeof t=="string"?It.fromBase64String(t):It.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w="server_timestamp",vw="__type__",Ew="__previous_value__",Tw="__local_write_time__";function fg(t){var n,i;return((i=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[vw])==null?void 0:i.stringValue)===_w}function xh(t){const e=t.mapValue.fields[Ew];return fg(e)?xh(e):e}function pl(t){const e=wr(t.mapValue.fields[Tw].timestampValue);return new ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y2{constructor(e,n,i,r,s,a,l,u,c,f,m){this.databaseId=e,this.appId=n,this.persistenceKey=i,this.host=r,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f,this.apiKey=m}}const jc="(default)";class gl{constructor(e,n){this.projectId=e,this.database=n||jc}static empty(){return new gl("","")}get isDefaultDatabase(){return this.database===jc}isEqual(e){return e instanceof gl&&e.projectId===this.projectId&&e.database===this.database}}function $2(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new H(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gl(t.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw="__type__",Q2="__max__",Vu={mapValue:{}},Aw="__vector__",Gc="value";function Rr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?fg(t)?4:W2(t)?9007199254740991:X2(t)?10:11:J(28295,{value:t})}function Jn(t,e){if(t===e)return!0;const n=Rr(t);if(n!==Rr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return pl(t).isEqual(pl(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const a=wr(r.timestampValue),l=wr(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return br(r.bytesValue).isEqual(br(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return et(r.geoPointValue.latitude)===et(s.geoPointValue.latitude)&&et(r.geoPointValue.longitude)===et(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return et(r.integerValue)===et(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const a=et(r.doubleValue),l=et(s.doubleValue);return a===l?Fc(a)===Fc(l):isNaN(a)&&isNaN(l)}return!1}(t,e);case 9:return wa(t.arrayValue.values||[],e.arrayValue.values||[],Jn);case 10:case 11:return function(r,s){const a=r.mapValue.fields||{},l=s.mapValue.fields||{};if(Zv(a)!==Zv(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Jn(a[u],l[u])))return!1;return!0}(t,e);default:return J(52216,{left:t})}}function yl(t,e){return(t.values||[]).find(n=>Jn(n,e))!==void 0}function ba(t,e){if(t===e)return 0;const n=Rr(t),i=Rr(e);if(n!==i)return me(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return me(t.booleanValue,e.booleanValue);case 2:return function(s,a){const l=et(s.integerValue||s.doubleValue),u=et(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return tE(t.timestampValue,e.timestampValue);case 4:return tE(pl(t),pl(e));case 5:return Vm(t.stringValue,e.stringValue);case 6:return function(s,a){const l=br(s),u=br(a);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),u=a.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=me(l[c],u[c]);if(f!==0)return f}return me(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,a){const l=me(et(s.latitude),et(a.latitude));return l!==0?l:me(et(s.longitude),et(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return nE(t.arrayValue,e.arrayValue);case 10:return function(s,a){var p,y,I,N;const l=s.fields||{},u=a.fields||{},c=(p=l[Gc])==null?void 0:p.arrayValue,f=(y=u[Gc])==null?void 0:y.arrayValue,m=me(((I=c==null?void 0:c.values)==null?void 0:I.length)||0,((N=f==null?void 0:f.values)==null?void 0:N.length)||0);return m!==0?m:nE(c,f)}(t.mapValue,e.mapValue);case 11:return function(s,a){if(s===Vu.mapValue&&a===Vu.mapValue)return 0;if(s===Vu.mapValue)return 1;if(a===Vu.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),c=a.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const p=Vm(u[m],f[m]);if(p!==0)return p;const y=ba(l[u[m]],c[f[m]]);if(y!==0)return y}return me(u.length,f.length)}(t.mapValue,e.mapValue);default:throw J(23264,{he:n})}}function tE(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return me(t,e);const n=wr(t),i=wr(e),r=me(n.seconds,i.seconds);return r!==0?r:me(n.nanos,i.nanos)}function nE(t,e){const n=t.values||[],i=e.values||[];for(let r=0;r<n.length&&r<i.length;++r){const s=ba(n[r],i[r]);if(s)return s}return me(n.length,i.length)}function Ra(t){return km(t)}function km(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const i=wr(n);return`time(${i.seconds},${i.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return br(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Y.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let i="[",r=!0;for(const s of n.values||[])r?r=!1:i+=",",i+=km(s);return i+"]"}(t.arrayValue):"mapValue"in t?function(n){const i=Object.keys(n.fields||{}).sort();let r="{",s=!0;for(const a of i)s?s=!1:r+=",",r+=`${a}:${km(n.fields[a])}`;return r+"}"}(t.mapValue):J(61005,{value:t})}function nc(t){switch(Rr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=xh(t);return e?16+nc(e):16;case 5:return 2*t.stringValue.length;case 6:return br(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((r,s)=>r+nc(s),0)}(t.arrayValue);case 10:case 11:return function(i){let r=0;return Or(i.fields,(s,a)=>{r+=s.length+nc(a)}),r}(t.mapValue);default:throw J(13486,{value:t})}}function iE(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Pm(t){return!!t&&"integerValue"in t}function dg(t){return!!t&&"arrayValue"in t}function rE(t){return!!t&&"nullValue"in t}function sE(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function ic(t){return!!t&&"mapValue"in t}function X2(t){var n,i;return((i=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[Sw])==null?void 0:i.stringValue)===Aw}function Yo(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Or(t.mapValue.fields,(n,i)=>e.mapValue.fields[n]=Yo(i)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Yo(t.arrayValue.values[n]);return e}return{...t}}function W2(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Q2}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this.value=e}static empty(){return new Yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let i=0;i<e.length-1;++i)if(n=(n.mapValue.fields||{})[e.get(i)],!ic(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Yo(n)}setAll(e){let n=wt.emptyPath(),i={},r=[];e.forEach((a,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,i,r),i={},r=[],n=l.popLast()}a?i[l.lastSegment()]=Yo(a):r.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,i,r)}delete(e){const n=this.field(e.popLast());ic(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Jn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=n.mapValue.fields[e.get(i)];ic(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(i)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,i){Or(n,(r,s)=>e[r]=s);for(const r of i)delete e[r]}clone(){return new Yt(Yo(this.value))}}function ww(t){const e=[];return Or(t.fields,(n,i)=>{const r=new wt([n]);if(ic(i)){const s=ww(i.mapValue).fields;if(s.length===0)e.push(r);else for(const a of s)e.push(r.child(a))}else e.push(r)}),new sn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,n,i,r,s,a,l){this.key=e,this.documentType=n,this.version=i,this.readTime=r,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ot(e,0,ne.min(),ne.min(),ne.min(),Yt.empty(),0)}static newFoundDocument(e,n,i,r){return new Ot(e,1,n,ne.min(),i,r,0)}static newNoDocument(e,n){return new Ot(e,2,n,ne.min(),ne.min(),Yt.empty(),0)}static newUnknownDocument(e,n){return new Ot(e,3,n,ne.min(),ne.min(),Yt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ne.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Yt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Yt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ne.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ot&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ot(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,n){this.position=e,this.inclusive=n}}function aE(t,e,n){let i=0;for(let r=0;r<t.position.length;r++){const s=e[r],a=t.position[r];if(s.field.isKeyField()?i=Y.comparator(Y.fromName(a.referenceValue),n.key):i=ba(a,n.data.field(s.field)),s.dir==="desc"&&(i*=-1),i!==0)break}return i}function oE(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Jn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e,n="asc"){this.field=e,this.dir=n}}function J2(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{}class ot extends bw{constructor(e,n,i){super(),this.field=e,this.op=n,this.value=i}static create(e,n,i){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,i):new eM(e,n,i):n==="array-contains"?new iM(e,i):n==="in"?new rM(e,i):n==="not-in"?new sM(e,i):n==="array-contains-any"?new aM(e,i):new ot(e,n,i)}static createKeyFieldInFilter(e,n,i){return n==="in"?new tM(e,i):new nM(e,i)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ba(n,this.value)):n!==null&&Rr(this.value)===Rr(n)&&this.matchesComparison(ba(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vn extends bw{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Vn(e,n)}matches(e){return Rw(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Rw(t){return t.op==="and"}function Iw(t){return Z2(t)&&Rw(t)}function Z2(t){for(const e of t.filters)if(e instanceof Vn)return!1;return!0}function Lm(t){if(t instanceof ot)return t.field.canonicalString()+t.op.toString()+Ra(t.value);if(Iw(t))return t.filters.map(e=>Lm(e)).join(",");{const e=t.filters.map(n=>Lm(n)).join(",");return`${t.op}(${e})`}}function Cw(t,e){return t instanceof ot?function(i,r){return r instanceof ot&&i.op===r.op&&i.field.isEqual(r.field)&&Jn(i.value,r.value)}(t,e):t instanceof Vn?function(i,r){return r instanceof Vn&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((s,a,l)=>s&&Cw(a,r.filters[l]),!0):!1}(t,e):void J(19439)}function Dw(t){return t instanceof ot?function(n){return`${n.field.canonicalString()} ${n.op} ${Ra(n.value)}`}(t):t instanceof Vn?function(n){return n.op.toString()+" {"+n.getFilters().map(Dw).join(" ,")+"}"}(t):"Filter"}class eM extends ot{constructor(e,n,i){super(e,n,i),this.key=Y.fromName(i.referenceValue)}matches(e){const n=Y.comparator(e.key,this.key);return this.matchesComparison(n)}}class tM extends ot{constructor(e,n){super(e,"in",n),this.keys=Nw("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class nM extends ot{constructor(e,n){super(e,"not-in",n),this.keys=Nw("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Nw(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(i=>Y.fromName(i.referenceValue))}class iM extends ot{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return dg(n)&&yl(n.arrayValue,this.value)}}class rM extends ot{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&yl(this.value.arrayValue,n)}}class sM extends ot{constructor(e,n){super(e,"not-in",n)}matches(e){if(yl(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!yl(this.value.arrayValue,n)}}class aM extends ot{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!dg(n)||!n.arrayValue.values)&&n.arrayValue.values.some(i=>yl(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oM{constructor(e,n=null,i=[],r=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=i,this.filters=r,this.limit=s,this.startAt=a,this.endAt=l,this.Te=null}}function lE(t,e=null,n=[],i=[],r=null,s=null,a=null){return new oM(t,e,n,i,r,s,a)}function mg(t){const e=ie(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(i=>Lm(i)).join(","),n+="|ob:",n+=e.orderBy.map(i=>function(s){return s.field.canonicalString()+s.dir}(i)).join(","),Uh(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Ra(i)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Ra(i)).join(",")),e.Te=n}return e.Te}function pg(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!J2(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Cw(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!oE(t.startAt,e.startAt)&&oE(t.endAt,e.endAt)}function Um(t){return Y.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,n=null,i=[],r=[],s=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=r,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function lM(t,e,n,i,r,s,a,l){return new Ka(t,e,n,i,r,s,a,l)}function zh(t){return new Ka(t)}function uE(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function uM(t){return Y.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function Ow(t){return t.collectionGroup!==null}function $o(t){const e=ie(t);if(e.Ee===null){e.Ee=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),n.add(s.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ft(wt.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new _l(s,i))}),n.has(wt.keyField().canonicalString())||e.Ee.push(new _l(wt.keyField(),i))}return e.Ee}function Yn(t){const e=ie(t);return e.Ie||(e.Ie=cM(e,$o(t))),e.Ie}function cM(t,e){if(t.limitType==="F")return lE(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(r=>{const s=r.dir==="desc"?"asc":"desc";return new _l(r.field,s)});const n=t.endAt?new Kc(t.endAt.position,t.endAt.inclusive):null,i=t.startAt?new Kc(t.startAt.position,t.startAt.inclusive):null;return lE(t.path,t.collectionGroup,e,t.filters,t.limit,n,i)}}function xm(t,e){const n=t.filters.concat([e]);return new Ka(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function hM(t,e){const n=t.explicitOrderBy.concat([e]);return new Ka(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}function zm(t,e,n){return new Ka(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Bh(t,e){return pg(Yn(t),Yn(e))&&t.limitType===e.limitType}function Mw(t){return`${mg(Yn(t))}|lt:${t.limitType}`}function zs(t){return`Query(target=${function(n){let i=n.path.canonicalString();return n.collectionGroup!==null&&(i+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(i+=`, filters: [${n.filters.map(r=>Dw(r)).join(", ")}]`),Uh(n.limit)||(i+=", limit: "+n.limit),n.orderBy.length>0&&(i+=`, orderBy: [${n.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),n.startAt&&(i+=", startAt: ",i+=n.startAt.inclusive?"b:":"a:",i+=n.startAt.position.map(r=>Ra(r)).join(",")),n.endAt&&(i+=", endAt: ",i+=n.endAt.inclusive?"a:":"b:",i+=n.endAt.position.map(r=>Ra(r)).join(",")),`Target(${i})`}(Yn(t))}; limitType=${t.limitType})`}function qh(t,e){return e.isFoundDocument()&&function(i,r){const s=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(s):Y.isDocumentKey(i.path)?i.path.isEqual(s):i.path.isImmediateParentOf(s)}(t,e)&&function(i,r){for(const s of $o(i))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(i,r){for(const s of i.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(i,r){return!(i.startAt&&!function(a,l,u){const c=aE(a,l,u);return a.inclusive?c<=0:c<0}(i.startAt,$o(i),r)||i.endAt&&!function(a,l,u){const c=aE(a,l,u);return a.inclusive?c>=0:c>0}(i.endAt,$o(i),r))}(t,e)}function fM(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Vw(t){return(e,n)=>{let i=!1;for(const r of $o(t)){const s=dM(r,e,n);if(s!==0)return s;i=i||r.field.isKeyField()}return 0}}function dM(t,e,n){const i=t.field.isKeyField()?Y.comparator(e.key,n.key):function(s,a,l){const u=a.data.field(s),c=l.data.field(s);return u!==null&&c!==null?ba(u,c):J(42886)}(t.field,e,n);switch(t.dir){case"asc":return i;case"desc":return-1*i;default:return J(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),i=this.inner[n];if(i!==void 0){for(const[r,s]of i)if(this.equalsFn(r,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,n]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[n]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Or(this.inner,(n,i)=>{for(const[r,s]of i)e(r,s)})}isEmpty(){return gw(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mM=new Ye(Y.comparator);function Mi(){return mM}const kw=new Ye(Y.comparator);function No(...t){let e=kw;for(const n of t)e=e.insert(n.key,n);return e}function Pw(t){let e=kw;return t.forEach((n,i)=>e=e.insert(n,i.overlayedDocument)),e}function $r(){return Qo()}function Lw(){return Qo()}function Qo(){return new bs(t=>t.toString(),(t,e)=>t.isEqual(e))}const pM=new Ye(Y.comparator),gM=new ft(Y.comparator);function pe(...t){let e=gM;for(const n of t)e=e.add(n);return e}const yM=new ft(me);function _M(){return yM}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fc(e)?"-0":e}}function Uw(t){return{integerValue:""+t}}function vM(t,e){return F2(e)?Uw(e):gg(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(){this._=void 0}}function EM(t,e,n){return t instanceof vl?function(r,s){const a={fields:{[vw]:{stringValue:_w},[Tw]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&fg(s)&&(s=xh(s)),s&&(a.fields[Ew]=s),{mapValue:a}}(n,e):t instanceof Ia?zw(t,e):t instanceof Ca?Bw(t,e):function(r,s){const a=xw(r,s),l=cE(a)+cE(r.Ae);return Pm(a)&&Pm(r.Ae)?Uw(l):gg(r.serializer,l)}(t,e)}function TM(t,e,n){return t instanceof Ia?zw(t,e):t instanceof Ca?Bw(t,e):n}function xw(t,e){return t instanceof Yc?function(i){return Pm(i)||function(s){return!!s&&"doubleValue"in s}(i)}(e)?e:{integerValue:0}:null}class vl extends Hh{}class Ia extends Hh{constructor(e){super(),this.elements=e}}function zw(t,e){const n=qw(e);for(const i of t.elements)n.some(r=>Jn(r,i))||n.push(i);return{arrayValue:{values:n}}}class Ca extends Hh{constructor(e){super(),this.elements=e}}function Bw(t,e){let n=qw(e);for(const i of t.elements)n=n.filter(r=>!Jn(r,i));return{arrayValue:{values:n}}}class Yc extends Hh{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function cE(t){return et(t.integerValue||t.doubleValue)}function qw(t){return dg(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e,n){this.field=e,this.transform=n}}function SM(t,e){return t.field.isEqual(e.field)&&function(i,r){return i instanceof Ia&&r instanceof Ia||i instanceof Ca&&r instanceof Ca?wa(i.elements,r.elements,Jn):i instanceof Yc&&r instanceof Yc?Jn(i.Ae,r.Ae):i instanceof vl&&r instanceof vl}(t.transform,e.transform)}class AM{constructor(e,n){this.version=e,this.transformResults=n}}class zt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new zt}static exists(e){return new zt(void 0,e)}static updateTime(e){return new zt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function rc(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Fh{}function Hw(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new jh(t.key,zt.none()):new zl(t.key,t.data,zt.none());{const n=t.data,i=Yt.empty();let r=new ft(wt.comparator);for(let s of e.fields)if(!r.has(s)){let a=n.field(s);a===null&&s.length>1&&(s=s.popLast(),a=n.field(s)),a===null?i.delete(s):i.set(s,a),r=r.add(s)}return new Mr(t.key,i,new sn(r.toArray()),zt.none())}}function wM(t,e,n){t instanceof zl?function(r,s,a){const l=r.value.clone(),u=fE(r.fieldTransforms,s,a.transformResults);l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Mr?function(r,s,a){if(!rc(r.precondition,s))return void s.convertToUnknownDocument(a.version);const l=fE(r.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(Fw(r)),u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(t,e,n):function(r,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function Xo(t,e,n,i){return t instanceof zl?function(s,a,l,u){if(!rc(s.precondition,a))return l;const c=s.value.clone(),f=dE(s.fieldTransforms,u,a);return c.setAll(f),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),null}(t,e,n,i):t instanceof Mr?function(s,a,l,u){if(!rc(s.precondition,a))return l;const c=dE(s.fieldTransforms,u,a),f=a.data;return f.setAll(Fw(s)),f.setAll(c),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,i):function(s,a,l){return rc(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(t,e,n)}function bM(t,e){let n=null;for(const i of t.fieldTransforms){const r=e.data.field(i.field),s=xw(i.transform,r||null);s!=null&&(n===null&&(n=Yt.empty()),n.set(i.field,s))}return n||null}function hE(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&wa(i,r,(s,a)=>SM(s,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class zl extends Fh{constructor(e,n,i,r=[]){super(),this.key=e,this.value=n,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Mr extends Fh{constructor(e,n,i,r,s=[]){super(),this.key=e,this.data=n,this.fieldMask=i,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Fw(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const i=t.data.field(n);e.set(n,i)}}),e}function fE(t,e,n){const i=new Map;Te(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let r=0;r<n.length;r++){const s=t[r],a=s.transform,l=e.data.field(s.field);i.set(s.field,TM(a,l,n[r]))}return i}function dE(t,e,n){const i=new Map;for(const r of t){const s=r.transform,a=n.data.field(r.field);i.set(r.field,EM(s,a,e))}return i}class jh extends Fh{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class RM extends Fh{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IM{constructor(e,n,i,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,n){const i=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const s=this.mutations[r];s.key.isEqual(e.key)&&wM(s,e,i[r])}}applyToLocalView(e,n){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(n=Xo(i,e,n,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(n=Xo(i,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const i=Lw();return this.mutations.forEach(r=>{const s=e.get(r.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=n.has(r.key)?null:l;const u=Hw(a,l);u!==null&&i.set(r.key,u),a.isValidDocument()||a.convertToNoDocument(ne.min())}),i}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),pe())}isEqual(e){return this.batchId===e.batchId&&wa(this.mutations,e.mutations,(n,i)=>hE(n,i))&&wa(this.baseMutations,e.baseMutations,(n,i)=>hE(n,i))}}class _g{constructor(e,n,i,r){this.batch=e,this.commitVersion=n,this.mutationResults=i,this.docVersions=r}static from(e,n,i){Te(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let r=function(){return pM}();const s=e.mutations;for(let a=0;a<s.length;a++)r=r.insert(s[a].key,i[a].version);return new _g(e,n,i,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CM{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DM{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it,_e;function NM(t){switch(t){case U.OK:return J(64938);case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0;default:return J(15467,{code:t})}}function jw(t){if(t===void 0)return Oi("GRPC error has no .code"),U.UNKNOWN;switch(t){case it.OK:return U.OK;case it.CANCELLED:return U.CANCELLED;case it.UNKNOWN:return U.UNKNOWN;case it.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case it.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case it.INTERNAL:return U.INTERNAL;case it.UNAVAILABLE:return U.UNAVAILABLE;case it.UNAUTHENTICATED:return U.UNAUTHENTICATED;case it.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case it.NOT_FOUND:return U.NOT_FOUND;case it.ALREADY_EXISTS:return U.ALREADY_EXISTS;case it.PERMISSION_DENIED:return U.PERMISSION_DENIED;case it.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case it.ABORTED:return U.ABORTED;case it.OUT_OF_RANGE:return U.OUT_OF_RANGE;case it.UNIMPLEMENTED:return U.UNIMPLEMENTED;case it.DATA_LOSS:return U.DATA_LOSS;default:return J(39323,{code:t})}}(_e=it||(it={}))[_e.OK=0]="OK",_e[_e.CANCELLED=1]="CANCELLED",_e[_e.UNKNOWN=2]="UNKNOWN",_e[_e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",_e[_e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",_e[_e.NOT_FOUND=5]="NOT_FOUND",_e[_e.ALREADY_EXISTS=6]="ALREADY_EXISTS",_e[_e.PERMISSION_DENIED=7]="PERMISSION_DENIED",_e[_e.UNAUTHENTICATED=16]="UNAUTHENTICATED",_e[_e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",_e[_e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",_e[_e.ABORTED=10]="ABORTED",_e[_e.OUT_OF_RANGE=11]="OUT_OF_RANGE",_e[_e.UNIMPLEMENTED=12]="UNIMPLEMENTED",_e[_e.INTERNAL=13]="INTERNAL",_e[_e.UNAVAILABLE=14]="UNAVAILABLE",_e[_e.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OM(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MM=new yr([4294967295,4294967295],0);function mE(t){const e=OM().encode(t),n=new sw;return n.update(e),new Uint8Array(n.digest())}function pE(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),i=e.getUint32(4,!0),r=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new yr([n,i],0),new yr([r,s],0)]}class vg{constructor(e,n,i){if(this.bitmap=e,this.padding=n,this.hashCount=i,n<0||n>=8)throw new Oo(`Invalid padding: ${n}`);if(i<0)throw new Oo(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Oo(`Invalid hash count: ${i}`);if(e.length===0&&n!==0)throw new Oo(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=yr.fromNumber(this.ge)}ye(e,n,i){let r=e.add(n.multiply(yr.fromNumber(i)));return r.compare(MM)===1&&(r=new yr([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=mE(e),[i,r]=pE(n);for(let s=0;s<this.hashCount;s++){const a=this.ye(i,r,s);if(!this.we(a))return!1}return!0}static create(e,n,i){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new vg(s,r,n);return i.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const n=mE(e),[i,r]=pE(n);for(let s=0;s<this.hashCount;s++){const a=this.ye(i,r,s);this.Se(a)}}Se(e){const n=Math.floor(e/8),i=e%8;this.bitmap[n]|=1<<i}}class Oo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(e,n,i,r,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=i,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,i){const r=new Map;return r.set(e,Bl.createSynthesizedTargetChangeForCurrentChange(e,n,i)),new Gh(ne.min(),r,new Ye(me),Mi(),pe())}}class Bl{constructor(e,n,i,r,s){this.resumeToken=e,this.current=n,this.addedDocuments=i,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,i){return new Bl(i,n,pe(),pe(),pe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,n,i,r){this.be=e,this.removedTargetIds=n,this.key=i,this.De=r}}class Gw{constructor(e,n){this.targetId=e,this.Ce=n}}class Kw{constructor(e,n,i=It.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=i,this.cause=r}}class gE{constructor(){this.ve=0,this.Fe=yE(),this.Me=It.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=pe(),n=pe(),i=pe();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:i=i.add(r);break;default:J(38017,{changeType:s})}}),new Bl(this.Me,this.xe,e,n,i)}qe(){this.Oe=!1,this.Fe=yE()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Te(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class VM{constructor(e){this.Ge=e,this.ze=new Map,this.je=Mi(),this.Je=ku(),this.He=ku(),this.Ze=new Ye(me)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const i=this.nt(n);switch(e.state){case 0:this.rt(n)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.qe(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),i.Le(e.resumeToken));break;default:J(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((i,r)=>{this.rt(r)&&n(r)})}st(e){const n=e.targetId,i=e.Ce.count,r=this.ot(n);if(r){const s=r.target;if(Um(s))if(i===0){const a=new Y(s.path);this.et(n,a,Ot.newNoDocument(a,ne.min()))}else Te(i===1,20013,{expectedCount:i});else{const a=this._t(n);if(a!==i){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,c)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:i="",padding:r=0},hashCount:s=0}=n;let a,l;try{a=br(i).toUint8Array()}catch(u){if(u instanceof yw)return us("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new vg(a,r,s)}catch(u){return us(u instanceof Oo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,n,i){return n.Ce.count===i-this.Pt(e,n.targetId)?0:2}Pt(e,n){const i=this.Ge.getRemoteKeysForTarget(n);let r=0;return i.forEach(s=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(n,s,null),r++)}),r}Tt(e){const n=new Map;this.ze.forEach((s,a)=>{const l=this.ot(a);if(l){if(s.current&&Um(l.target)){const u=new Y(l.target.path);this.Et(u).has(a)||this.It(a,u)||this.et(a,u,Ot.newNoDocument(u,e))}s.Be&&(n.set(a,s.ke()),s.qe())}});let i=pe();this.He.forEach((s,a)=>{let l=!0;a.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(s))}),this.je.forEach((s,a)=>a.setReadTime(e));const r=new Gh(e,n,this.Ze,this.je,i);return this.je=Mi(),this.Je=ku(),this.He=ku(),this.Ze=new Ye(me),r}Ye(e,n){if(!this.rt(e))return;const i=this.It(e,n.key)?2:0;this.nt(e).Ke(n.key,i),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Et(n.key).add(e)),this.He=this.He.insert(n.key,this.Rt(n.key).add(e))}et(e,n,i){if(!this.rt(e))return;const r=this.nt(e);this.It(e,n)?r.Ke(n,1):r.Ue(n),this.He=this.He.insert(n,this.Rt(n).delete(e)),this.He=this.He.insert(n,this.Rt(n).add(e)),i&&(this.je=this.je.insert(n,i))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let n=this.ze.get(e);return n||(n=new gE,this.ze.set(e,n)),n}Rt(e){let n=this.He.get(e);return n||(n=new ft(me),this.He=this.He.insert(e,n)),n}Et(e){let n=this.Je.get(e);return n||(n=new ft(me),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||G("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new gE),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function ku(){return new Ye(Y.comparator)}function yE(){return new Ye(Y.comparator)}const kM={asc:"ASCENDING",desc:"DESCENDING"},PM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},LM={and:"AND",or:"OR"};class UM{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Bm(t,e){return t.useProto3Json||Uh(e)?e:{value:e}}function $c(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yw(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function xM(t,e){return $c(t,e.toTimestamp())}function $n(t){return Te(!!t,49232),ne.fromTimestamp(function(n){const i=wr(n);return new ze(i.seconds,i.nanos)}(t))}function Eg(t,e){return qm(t,e).canonicalString()}function qm(t,e){const n=function(r){return new Me(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function $w(t){const e=Me.fromString(t);return Te(Zw(e),10190,{key:e.toString()}),e}function Hm(t,e){return Eg(t.databaseId,e.path)}function gd(t,e){const n=$w(e);if(n.get(1)!==t.databaseId.projectId)throw new H(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Y(Xw(n))}function Qw(t,e){return Eg(t.databaseId,e)}function zM(t){const e=$w(t);return e.length===4?Me.emptyPath():Xw(e)}function Fm(t){return new Me(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Xw(t){return Te(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function _E(t,e,n){return{name:Hm(t,e),fields:n.value.mapValue.fields}}function BM(t,e){let n;if("targetChange"in e){e.targetChange;const i=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:J(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],s=function(c,f){return c.useProto3Json?(Te(f===void 0||typeof f=="string",58123),It.fromBase64String(f||"")):(Te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),It.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(c){const f=c.code===void 0?U.UNKNOWN:jw(c.code);return new H(f,c.message||"")}(a);n=new Kw(i,r,s,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const r=gd(t,i.document.name),s=$n(i.document.updateTime),a=i.document.createTime?$n(i.document.createTime):ne.min(),l=new Yt({mapValue:{fields:i.document.fields}}),u=Ot.newFoundDocument(r,s,a,l),c=i.targetIds||[],f=i.removedTargetIds||[];n=new sc(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const r=gd(t,i.document),s=i.readTime?$n(i.readTime):ne.min(),a=Ot.newNoDocument(r,s),l=i.removedTargetIds||[];n=new sc([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const r=gd(t,i.document),s=i.removedTargetIds||[];n=new sc([],s,r,null)}else{if(!("filter"in e))return J(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:r=0,unchangedNames:s}=i,a=new DM(r,s),l=i.targetId;n=new Gw(l,a)}}return n}function qM(t,e){let n;if(e instanceof zl)n={update:_E(t,e.key,e.value)};else if(e instanceof jh)n={delete:Hm(t,e.key)};else if(e instanceof Mr)n={update:_E(t,e.key,e.data),updateMask:XM(e.fieldMask)};else{if(!(e instanceof RM))return J(16599,{dt:e.type});n={verify:Hm(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(i=>function(s,a){const l=a.transform;if(l instanceof vl)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ia)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ca)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Yc)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw J(20930,{transform:a.transform})}(0,i))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:xM(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:J(27497)}(t,e.precondition)),n}function HM(t,e){return t&&t.length>0?(Te(e!==void 0,14353),t.map(n=>function(r,s){let a=r.updateTime?$n(r.updateTime):$n(s);return a.isEqual(ne.min())&&(a=$n(s)),new AM(a,r.transformResults||[])}(n,e))):[]}function FM(t,e){return{documents:[Qw(t,e.path)]}}function jM(t,e){const n={structuredQuery:{}},i=e.path;let r;e.collectionGroup!==null?(r=i,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=Qw(t,r);const s=function(c){if(c.length!==0)return Jw(Vn.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const a=function(c){if(c.length!==0)return c.map(f=>function(p){return{field:Bs(p.field),direction:YM(p.dir)}}(f))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const l=Bm(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{ft:n,parent:r}}function GM(t){let e=zM(t.parent);const n=t.structuredQuery,i=n.from?n.from.length:0;let r=null;if(i>0){Te(i===1,65062);const f=n.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const p=Ww(m);return p instanceof Vn&&Iw(p)?p.getFilters():[p]}(n.where));let a=[];n.orderBy&&(a=function(m){return m.map(p=>function(I){return new _l(qs(I.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(p))}(n.orderBy));let l=null;n.limit&&(l=function(m){let p;return p=typeof m=="object"?m.value:m,Uh(p)?null:p}(n.limit));let u=null;n.startAt&&(u=function(m){const p=!!m.before,y=m.values||[];return new Kc(y,p)}(n.startAt));let c=null;return n.endAt&&(c=function(m){const p=!m.before,y=m.values||[];return new Kc(y,p)}(n.endAt)),lM(e,r,a,s,l,"F",u,c)}function KM(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J(28987,{purpose:r})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Ww(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const i=qs(n.unaryFilter.field);return ot.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=qs(n.unaryFilter.field);return ot.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=qs(n.unaryFilter.field);return ot.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=qs(n.unaryFilter.field);return ot.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return J(61313);default:return J(60726)}}(t):t.fieldFilter!==void 0?function(n){return ot.create(qs(n.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return J(58110);default:return J(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Vn.create(n.compositeFilter.filters.map(i=>Ww(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return J(1026)}}(n.compositeFilter.op))}(t):J(30097,{filter:t})}function YM(t){return kM[t]}function $M(t){return PM[t]}function QM(t){return LM[t]}function Bs(t){return{fieldPath:t.canonicalString()}}function qs(t){return wt.fromServerFormat(t.fieldPath)}function Jw(t){return t instanceof ot?function(n){if(n.op==="=="){if(sE(n.value))return{unaryFilter:{field:Bs(n.field),op:"IS_NAN"}};if(rE(n.value))return{unaryFilter:{field:Bs(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(sE(n.value))return{unaryFilter:{field:Bs(n.field),op:"IS_NOT_NAN"}};if(rE(n.value))return{unaryFilter:{field:Bs(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Bs(n.field),op:$M(n.op),value:n.value}}}(t):t instanceof Vn?function(n){const i=n.getFilters().map(r=>Jw(r));return i.length===1?i[0]:{compositeFilter:{op:QM(n.op),filters:i}}}(t):J(54877,{filter:t})}function XM(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Zw(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function eb(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e,n,i,r,s=ne.min(),a=ne.min(),l=It.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=i,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new ar(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ar(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WM{constructor(e){this.yt=e}}function JM(t){const e=GM({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?zm(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZM{constructor(){this.bn=new eV}addToCollectionParentIndex(e,n){return this.bn.add(n),z.resolve()}getCollectionParents(e,n){return z.resolve(this.bn.getEntries(n))}addFieldIndex(e,n){return z.resolve()}deleteFieldIndex(e,n){return z.resolve()}deleteAllFieldIndexes(e){return z.resolve()}createTargetIndexes(e,n){return z.resolve()}getDocumentsMatchingTarget(e,n){return z.resolve(null)}getIndexType(e,n){return z.resolve(0)}getFieldIndexes(e,n){return z.resolve([])}getNextCollectionGroupToUpdate(e){return z.resolve(null)}getMinOffset(e,n){return z.resolve(Ar.min())}getMinOffsetFromCollectionGroup(e,n){return z.resolve(Ar.min())}updateCollectionGroup(e,n,i){return z.resolve()}updateIndexEntries(e,n){return z.resolve()}}class eV{constructor(){this.index={}}add(e){const n=e.lastSegment(),i=e.popLast(),r=this.index[n]||new ft(Me.comparator),s=!r.has(i);return this.index[n]=r.add(i),s}has(e){const n=e.lastSegment(),i=e.popLast(),r=this.index[n];return r&&r.has(i)}getEntries(e){return(this.index[e]||new ft(Me.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vE={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},tb=41943040;class Kt{static withCacheSize(e){return new Kt(e,Kt.DEFAULT_COLLECTION_PERCENTILE,Kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Kt.DEFAULT_COLLECTION_PERCENTILE=10,Kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Kt.DEFAULT=new Kt(tb,Kt.DEFAULT_COLLECTION_PERCENTILE,Kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Kt.DISABLED=new Kt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Da(0)}static ar(){return new Da(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE="LruGarbageCollector",tV=1048576;function TE([t,e],[n,i]){const r=me(t,n);return r===0?me(e,i):r}class nV{constructor(e){this.Pr=e,this.buffer=new ft(TE),this.Tr=0}Er(){return++this.Tr}Ir(e){const n=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(n);else{const i=this.buffer.last();TE(n,i)<0&&(this.buffer=this.buffer.delete(i).add(n))}}get maxValue(){return this.buffer.last()[0]}}class iV{constructor(e,n,i){this.garbageCollector=e,this.asyncQueue=n,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){G(EE,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Ga(n)?G(EE,"Ignoring IndexedDB error during garbage collection: ",n):await ja(n)}await this.Ar(3e5)})}}class rV{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.dr(e).next(i=>Math.floor(n/100*i))}nthSequenceNumber(e,n){if(n===0)return z.resolve(Lh.ce);const i=new nV(n);return this.Vr.forEachTarget(e,r=>i.Ir(r.sequenceNumber)).next(()=>this.Vr.mr(e,r=>i.Ir(r))).next(()=>i.maxValue)}removeTargets(e,n,i){return this.Vr.removeTargets(e,n,i)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(G("LruGarbageCollector","Garbage collection skipped; disabled"),z.resolve(vE)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(G("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),vE):this.gr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,n){let i,r,s,a,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(G("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),r=this.params.maximumSequenceNumbersToCollect):r=m,a=Date.now(),this.nthSequenceNumber(e,r))).next(m=>(i=m,l=Date.now(),this.removeTargets(e,i,n))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,i))).next(m=>(c=Date.now(),xs()<=de.DEBUG&&G("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${r} in `+(l-a)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${m} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),z.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:m})))}}function sV(t,e){return new rV(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aV{constructor(){this.changes=new bs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Ot.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const i=this.changes.get(n);return i!==void 0?z.resolve(i):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oV{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lV{constructor(e,n,i,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,n){let i=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(i!==null&&Xo(i.mutation,r,sn.empty(),ze.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.getLocalViewOfDocuments(e,i,pe()).next(()=>i))}getLocalViewOfDocuments(e,n,i=pe()){const r=$r();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,i).next(s=>{let a=No();return s.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const i=$r();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,pe()))}populateOverlays(e,n,i){const r=[];return i.forEach(s=>{n.has(s)||r.push(s)}),this.documentOverlayCache.getOverlays(e,r).next(s=>{s.forEach((a,l)=>{n.set(a,l)})})}computeViews(e,n,i,r){let s=Mi();const a=Qo(),l=function(){return Qo()}();return n.forEach((u,c)=>{const f=i.get(c.key);r.has(c.key)&&(f===void 0||f.mutation instanceof Mr)?s=s.insert(c.key,c):f!==void 0?(a.set(c.key,f.mutation.getFieldMask()),Xo(f.mutation,c,f.mutation.getFieldMask(),ze.now())):a.set(c.key,sn.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,f)=>a.set(c,f)),n.forEach((c,f)=>l.set(c,new oV(f,a.get(c)??null))),l))}recalculateAndSaveOverlays(e,n){const i=Qo();let r=new Ye((a,l)=>a-l),s=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const l of a)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=i.get(u)||sn.empty();f=l.applyToLocalView(c,f),i.set(u,f);const m=(r.get(l.batchId)||pe()).add(u);r=r.insert(l.batchId,m)})}).next(()=>{const a=[],l=r.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,m=Lw();f.forEach(p=>{if(!s.has(p)){const y=Hw(n.get(p),i.get(p));y!==null&&m.set(p,y),s=s.add(p)}}),a.push(this.documentOverlayCache.saveOverlays(e,c,m))}return z.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,n,i,r){return uM(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Ow(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,i,r):this.getDocumentsMatchingCollectionQuery(e,n,i,r)}getNextDocuments(e,n,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,i,r).next(s=>{const a=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,i.largestBatchId,r-s.size):z.resolve($r());let l=ml,u=s;return a.next(c=>z.forEach(c,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?z.resolve():this.remoteDocumentCache.getEntry(e,f).next(p=>{u=u.insert(f,p)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,pe())).next(f=>({batchId:l,changes:Pw(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Y(n)).next(i=>{let r=No();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,i,r){const s=n.collectionGroup;let a=No();return this.indexManager.getCollectionParents(e,s).next(l=>z.forEach(l,u=>{const c=function(m,p){return new Ka(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,i,r).next(f=>{f.forEach((m,p)=>{a=a.insert(m,p)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,i,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,i.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,i,s,r))).next(a=>{s.forEach((u,c)=>{const f=c.getKey();a.get(f)===null&&(a=a.insert(f,Ot.newInvalidDocument(f)))});let l=No();return a.forEach((u,c)=>{const f=s.get(u);f!==void 0&&Xo(f.mutation,c,sn.empty(),ze.now()),qh(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uV{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,n){return z.resolve(this.Nr.get(n))}saveBundleMetadata(e,n){return this.Nr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:$n(r.createTime)}}(n)),z.resolve()}getNamedQuery(e,n){return z.resolve(this.Br.get(n))}saveNamedQuery(e,n){return this.Br.set(n.name,function(r){return{name:r.name,query:JM(r.bundledQuery),readTime:$n(r.readTime)}}(n)),z.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cV{constructor(){this.overlays=new Ye(Y.comparator),this.Lr=new Map}getOverlay(e,n){return z.resolve(this.overlays.get(n))}getOverlays(e,n){const i=$r();return z.forEach(n,r=>this.getOverlay(e,r).next(s=>{s!==null&&i.set(r,s)})).next(()=>i)}saveOverlays(e,n,i){return i.forEach((r,s)=>{this.St(e,n,s)}),z.resolve()}removeOverlaysForBatchId(e,n,i){const r=this.Lr.get(i);return r!==void 0&&(r.forEach(s=>this.overlays=this.overlays.remove(s)),this.Lr.delete(i)),z.resolve()}getOverlaysForCollection(e,n,i){const r=$r(),s=n.length+1,a=new Y(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>i&&r.set(u.getKey(),u)}return z.resolve(r)}getOverlaysForCollectionGroup(e,n,i,r){let s=new Ye((c,f)=>c-f);const a=this.overlays.getIterator();for(;a.hasNext();){const c=a.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>i){let f=s.get(c.largestBatchId);f===null&&(f=$r(),s=s.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=$r(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=r)););return z.resolve(l)}St(e,n,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.Lr.get(r.largestBatchId).delete(i.key);this.Lr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new CM(n,i));let s=this.Lr.get(n);s===void 0&&(s=pe(),this.Lr.set(n,s)),this.Lr.set(n,s.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hV{constructor(){this.sessionToken=It.EMPTY_BYTE_STRING}getSessionToken(e){return z.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,z.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(){this.kr=new ft(pt.qr),this.Kr=new ft(pt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,n){const i=new pt(e,n);this.kr=this.kr.add(i),this.Kr=this.Kr.add(i)}$r(e,n){e.forEach(i=>this.addReference(i,n))}removeReference(e,n){this.Wr(new pt(e,n))}Qr(e,n){e.forEach(i=>this.removeReference(i,n))}Gr(e){const n=new Y(new Me([])),i=new pt(n,e),r=new pt(n,e+1),s=[];return this.Kr.forEachInRange([i,r],a=>{this.Wr(a),s.push(a.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const n=new Y(new Me([])),i=new pt(n,e),r=new pt(n,e+1);let s=pe();return this.Kr.forEachInRange([i,r],a=>{s=s.add(a.key)}),s}containsKey(e){const n=new pt(e,0),i=this.kr.firstAfterOrEqual(n);return i!==null&&e.isEqual(i.key)}}class pt{constructor(e,n){this.key=e,this.Jr=n}static qr(e,n){return Y.comparator(e.key,n.key)||me(e.Jr,n.Jr)}static Ur(e,n){return me(e.Jr,n.Jr)||Y.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fV{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Yn=1,this.Hr=new ft(pt.qr)}checkEmpty(e){return z.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,i,r){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new IM(s,n,i,r);this.mutationQueue.push(a);for(const l of r)this.Hr=this.Hr.add(new pt(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return z.resolve(a)}lookupMutationBatch(e,n){return z.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const i=n+1,r=this.Xr(i),s=r<0?0:r;return z.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return z.resolve(this.mutationQueue.length===0?hg:this.Yn-1)}getAllMutationBatches(e){return z.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const i=new pt(n,0),r=new pt(n,Number.POSITIVE_INFINITY),s=[];return this.Hr.forEachInRange([i,r],a=>{const l=this.Zr(a.Jr);s.push(l)}),z.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let i=new ft(me);return n.forEach(r=>{const s=new pt(r,0),a=new pt(r,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([s,a],l=>{i=i.add(l.Jr)})}),z.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,n){const i=n.path,r=i.length+1;let s=i;Y.isDocumentKey(s)||(s=s.child(""));const a=new pt(new Y(s),0);let l=new ft(me);return this.Hr.forEachWhile(u=>{const c=u.key.path;return!!i.isPrefixOf(c)&&(c.length===r&&(l=l.add(u.Jr)),!0)},a),z.resolve(this.Yr(l))}Yr(e){const n=[];return e.forEach(i=>{const r=this.Zr(i);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Te(this.ei(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Hr;return z.forEach(n.mutations,r=>{const s=new pt(r.key,n.batchId);return i=i.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Hr=i})}nr(e){}containsKey(e,n){const i=new pt(n,0),r=this.Hr.firstAfterOrEqual(i);return z.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,z.resolve()}ei(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dV{constructor(e){this.ti=e,this.docs=function(){return new Ye(Y.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const i=n.key,r=this.docs.get(i),s=r?r.size:0,a=this.ti(n);return this.docs=this.docs.insert(i,{document:n.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const i=this.docs.get(n);return z.resolve(i?i.document.mutableCopy():Ot.newInvalidDocument(n))}getEntries(e,n){let i=Mi();return n.forEach(r=>{const s=this.docs.get(r);i=i.insert(r,s?s.document.mutableCopy():Ot.newInvalidDocument(r))}),z.resolve(i)}getDocumentsMatchingQuery(e,n,i,r){let s=Mi();const a=n.path,l=new Y(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!a.isPrefixOf(c.path))break;c.path.length>a.length+1||z2(x2(f),i)<=0||(r.has(f.key)||qh(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return z.resolve(s)}getAllFromCollectionGroup(e,n,i,r){J(9500)}ni(e,n){return z.forEach(this.docs,i=>n(i))}newChangeBuffer(e){return new mV(this)}getSize(e){return z.resolve(this.size)}}class mV extends aV{constructor(e){super(),this.Mr=e}applyChanges(e){const n=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?n.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(i)}),z.waitFor(n)}getFromCache(e,n){return this.Mr.getEntry(e,n)}getAllFromCache(e,n){return this.Mr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pV{constructor(e){this.persistence=e,this.ri=new bs(n=>mg(n),pg),this.lastRemoteSnapshotVersion=ne.min(),this.highestTargetId=0,this.ii=0,this.si=new Tg,this.targetCount=0,this.oi=Da._r()}forEachTarget(e,n){return this.ri.forEach((i,r)=>n(r)),z.resolve()}getLastRemoteSnapshotVersion(e){return z.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return z.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),z.resolve(this.highestTargetId)}setTargetsMetadata(e,n,i){return i&&(this.lastRemoteSnapshotVersion=i),n>this.ii&&(this.ii=n),z.resolve()}lr(e){this.ri.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.oi=new Da(n),this.highestTargetId=n),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,n){return this.lr(n),this.targetCount+=1,z.resolve()}updateTargetData(e,n){return this.lr(n),z.resolve()}removeTargetData(e,n){return this.ri.delete(n.target),this.si.Gr(n.targetId),this.targetCount-=1,z.resolve()}removeTargets(e,n,i){let r=0;const s=[];return this.ri.forEach((a,l)=>{l.sequenceNumber<=n&&i.get(l.targetId)===null&&(this.ri.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),r++)}),z.waitFor(s).next(()=>r)}getTargetCount(e){return z.resolve(this.targetCount)}getTargetData(e,n){const i=this.ri.get(n)||null;return z.resolve(i)}addMatchingKeys(e,n,i){return this.si.$r(n,i),z.resolve()}removeMatchingKeys(e,n,i){this.si.Qr(n,i);const r=this.persistence.referenceDelegate,s=[];return r&&n.forEach(a=>{s.push(r.markPotentiallyOrphaned(e,a))}),z.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.si.Gr(n),z.resolve()}getMatchingKeysForTargetId(e,n){const i=this.si.jr(n);return z.resolve(i)}containsKey(e,n){return z.resolve(this.si.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(e,n){this._i={},this.overlays={},this.ai=new Lh(0),this.ui=!1,this.ui=!0,this.ci=new hV,this.referenceDelegate=e(this),this.li=new pV(this),this.indexManager=new ZM,this.remoteDocumentCache=function(r){return new dV(r)}(i=>this.referenceDelegate.hi(i)),this.serializer=new WM(n),this.Pi=new uV(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new cV,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let i=this._i[e.toKey()];return i||(i=new fV(n,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,n,i){G("MemoryPersistence","Starting transaction:",e);const r=new gV(this.ai.next());return this.referenceDelegate.Ti(),i(r).next(s=>this.referenceDelegate.Ei(r).next(()=>s)).toPromise().then(s=>(r.raiseOnCommittedEvent(),s))}Ii(e,n){return z.or(Object.values(this._i).map(i=>()=>i.containsKey(e,n)))}}class gV extends q2{constructor(e){super(),this.currentSequenceNumber=e}}class Sg{constructor(e){this.persistence=e,this.Ri=new Tg,this.Ai=null}static Vi(e){return new Sg(e)}get di(){if(this.Ai)return this.Ai;throw J(60996)}addReference(e,n,i){return this.Ri.addReference(i,n),this.di.delete(i.toString()),z.resolve()}removeReference(e,n,i){return this.Ri.removeReference(i,n),this.di.add(i.toString()),z.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),z.resolve()}removeTarget(e,n){this.Ri.Gr(n.targetId).forEach(r=>this.di.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(s=>this.di.add(s.toString()))}).next(()=>i.removeTargetData(e,n))}Ti(){this.Ai=new Set}Ei(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return z.forEach(this.di,i=>{const r=Y.fromPath(i);return this.mi(e,r).next(s=>{s||n.removeEntry(r,ne.min())})}).next(()=>(this.Ai=null,n.apply(e)))}updateLimboDocument(e,n){return this.mi(e,n).next(i=>{i?this.di.delete(n.toString()):this.di.add(n.toString())})}hi(e){return 0}mi(e,n){return z.or([()=>z.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class Qc{constructor(e,n){this.persistence=e,this.fi=new bs(i=>j2(i.path),(i,r)=>i.isEqual(r)),this.garbageCollector=sV(this,n)}static Vi(e,n){return new Qc(e,n)}Ti(){}Ei(e){return z.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>n.next(r=>i+r))}pr(e){let n=0;return this.mr(e,i=>{n++}).next(()=>n)}mr(e,n){return z.forEach(this.fi,(i,r)=>this.wr(e,i,r).next(s=>s?z.resolve():n(r)))}removeTargets(e,n,i){return this.persistence.getTargetCache().removeTargets(e,n,i)}removeOrphanedDocuments(e,n){let i=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ni(e,a=>this.wr(e,a,n).next(l=>{l||(i++,s.removeEntry(a,ne.min()))})).next(()=>s.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,n){return this.fi.set(n,e.currentSequenceNumber),z.resolve()}removeTarget(e,n){const i=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,n,i){return this.fi.set(i,e.currentSequenceNumber),z.resolve()}removeReference(e,n,i){return this.fi.set(i,e.currentSequenceNumber),z.resolve()}updateLimboDocument(e,n){return this.fi.set(n,e.currentSequenceNumber),z.resolve()}hi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=nc(e.data.value)),n}wr(e,n,i){return z.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const r=this.fi.get(n);return z.resolve(r!==void 0&&r>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(e,n,i,r){this.targetId=e,this.fromCache=n,this.Ts=i,this.Es=r}static Is(e,n){let i=pe(),r=pe();for(const s of n.docChanges)switch(s.type){case 0:i=i.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Ag(e,n.fromCache,i,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yV{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _V{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return lO()?8:H2(Mt())>0?6:4}()}initialize(e,n){this.fs=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,i,r){const s={result:null};return this.gs(e,n).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ps(e,n,r,i).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new yV;return this.ys(e,n,a).next(l=>{if(s.result=l,this.As)return this.ws(e,n,a,l.size)})}).next(()=>s.result)}ws(e,n,i,r){return i.documentReadCount<this.Vs?(xs()<=de.DEBUG&&G("QueryEngine","SDK will not create cache indexes for query:",zs(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),z.resolve()):(xs()<=de.DEBUG&&G("QueryEngine","Query:",zs(n),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.ds*r?(xs()<=de.DEBUG&&G("QueryEngine","The SDK decides to create cache indexes for query:",zs(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Yn(n))):z.resolve())}gs(e,n){if(uE(n))return z.resolve(null);let i=Yn(n);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=zm(n,null,"F"),i=Yn(n)),this.indexManager.getDocumentsMatchingTarget(e,i).next(s=>{const a=pe(...s);return this.fs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,i).next(u=>{const c=this.Ss(n,l);return this.bs(n,c,a,u.readTime)?this.gs(e,zm(n,null,"F")):this.Ds(e,c,n,u)}))})))}ps(e,n,i,r){return uE(n)||r.isEqual(ne.min())?z.resolve(null):this.fs.getDocuments(e,i).next(s=>{const a=this.Ss(n,s);return this.bs(n,a,i,r)?z.resolve(null):(xs()<=de.DEBUG&&G("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),zs(n)),this.Ds(e,a,n,U2(r,ml)).next(l=>l))})}Ss(e,n){let i=new ft(Vw(e));return n.forEach((r,s)=>{qh(e,s)&&(i=i.add(s))}),i}bs(e,n,i,r){if(e.limit===null)return!1;if(i.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}ys(e,n,i){return xs()<=de.DEBUG&&G("QueryEngine","Using full collection scan to execute query:",zs(n)),this.fs.getDocumentsMatchingQuery(e,n,Ar.min(),i)}Ds(e,n,i,r){return this.fs.getDocumentsMatchingQuery(e,i,r).next(s=>(n.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg="LocalStore",vV=3e8;class EV{constructor(e,n,i,r){this.persistence=e,this.Cs=n,this.serializer=r,this.vs=new Ye(me),this.Fs=new bs(s=>mg(s),pg),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new lV(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.vs))}}function TV(t,e,n,i){return new EV(t,e,n,i)}async function ib(t,e){const n=ie(t);return await n.persistence.runTransaction("Handle user change","readonly",i=>{let r;return n.mutationQueue.getAllMutationBatches(i).next(s=>(r=s,n.Os(e),n.mutationQueue.getAllMutationBatches(i))).next(s=>{const a=[],l=[];let u=pe();for(const c of r){a.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of s){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(i,u).next(c=>({Ns:c,removedBatchIds:a,addedBatchIds:l}))})})}function SV(t,e){const n=ie(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),s=n.xs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const m=c.batch,p=m.keys();let y=z.resolve();return p.forEach(I=>{y=y.next(()=>f.getEntry(u,I)).next(N=>{const D=c.docVersions.get(I);Te(D!==null,48541),N.version.compareTo(D)<0&&(m.applyToRemoteDocument(N,c),N.isValidDocument()&&(N.setReadTime(c.commitVersion),f.addEntry(N)))})}),y.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,i,e,s).next(()=>s.apply(i)).next(()=>n.mutationQueue.performConsistencyCheck(i)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let u=pe();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(i,r))})}function rb(t){const e=ie(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.li.getLastRemoteSnapshotVersion(n))}function AV(t,e){const n=ie(t),i=e.snapshotVersion;let r=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=n.xs.newChangeBuffer({trackRemovals:!0});r=n.vs;const l=[];e.targetChanges.forEach((f,m)=>{const p=r.get(m);if(!p)return;l.push(n.li.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.li.addMatchingKeys(s,f.addedDocuments,m)));let y=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?y=y.withResumeToken(It.EMPTY_BYTE_STRING,ne.min()).withLastLimboFreeSnapshotVersion(ne.min()):f.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(f.resumeToken,i)),r=r.insert(m,y),function(N,D,v){return N.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=vV?!0:v.addedDocuments.size+v.modifiedDocuments.size+v.removedDocuments.size>0}(p,y,f)&&l.push(n.li.updateTargetData(s,y))});let u=Mi(),c=pe();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(wV(s,a,e.documentUpdates).next(f=>{u=f.Bs,c=f.Ls})),!i.isEqual(ne.min())){const f=n.li.getLastRemoteSnapshotVersion(s).next(m=>n.li.setTargetsMetadata(s,s.currentSequenceNumber,i));l.push(f)}return z.waitFor(l).next(()=>a.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.vs=r,s))}function wV(t,e,n){let i=pe(),r=pe();return n.forEach(s=>i=i.add(s)),e.getEntries(t,i).next(s=>{let a=Mi();return n.forEach((l,u)=>{const c=s.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(r=r.add(l)),u.isNoDocument()&&u.version.isEqual(ne.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):G(wg,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Bs:a,Ls:r}})}function bV(t,e){const n=ie(t);return n.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=hg),n.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function RV(t,e){const n=ie(t);return n.persistence.runTransaction("Allocate target","readwrite",i=>{let r;return n.li.getTargetData(i,e).next(s=>s?(r=s,z.resolve(r)):n.li.allocateTargetId(i).next(a=>(r=new ar(e,a,"TargetPurposeListen",i.currentSequenceNumber),n.li.addTargetData(i,r).next(()=>r))))}).then(i=>{const r=n.vs.get(i.targetId);return(r===null||i.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.vs=n.vs.insert(i.targetId,i),n.Fs.set(e,i.targetId)),i})}async function jm(t,e,n){const i=ie(t),r=i.vs.get(e),s=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",s,a=>i.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!Ga(a))throw a;G(wg,`Failed to update sequence numbers for target ${e}: ${a}`)}i.vs=i.vs.remove(e),i.Fs.delete(r.target)}function SE(t,e,n){const i=ie(t);let r=ne.min(),s=pe();return i.persistence.runTransaction("Execute query","readwrite",a=>function(u,c,f){const m=ie(u),p=m.Fs.get(f);return p!==void 0?z.resolve(m.vs.get(p)):m.li.getTargetData(c,f)}(i,a,Yn(e)).next(l=>{if(l)return r=l.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(a,l.targetId).next(u=>{s=u})}).next(()=>i.Cs.getDocumentsMatchingQuery(a,e,n?r:ne.min(),n?s:pe())).next(l=>(IV(i,fM(e),l),{documents:l,ks:s})))}function IV(t,e,n){let i=t.Ms.get(e)||ne.min();n.forEach((r,s)=>{s.readTime.compareTo(i)>0&&(i=s.readTime)}),t.Ms.set(e,i)}class AE{constructor(){this.activeTargetIds=_M()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class CV{constructor(){this.vo=new AE,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,i){}addLocalQueryTarget(e,n=!0){return n&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,n,i){this.Fo[e]=n}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new AE,Promise.resolve()}handleUserChange(e,n,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DV{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE="ConnectivityMonitor";class bE{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){G(wE,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){G(wE,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pu=null;function Gm(){return Pu===null?Pu=function(){return 268435456+Math.round(2147483648*Math.random())}():Pu++,"0x"+Pu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="RestConnection",NV={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class OV{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=n+"://"+e.host,this.Uo=`projects/${i}/databases/${r}`,this.$o=this.databaseId.database===jc?`project_id=${i}`:`project_id=${i}&database_id=${r}`}Wo(e,n,i,r,s){const a=Gm(),l=this.Qo(e,n.toUriEncodedString());G(yd,`Sending RPC '${e}' ${a}:`,l,i);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,r,s);const{host:c}=new URL(l),f=Ha(c);return this.zo(e,l,u,i,f).then(m=>(G(yd,`Received RPC '${e}' ${a}: `,m),m),m=>{throw us(yd,`RPC '${e}' ${a} failed with error: `,m,"url: ",l,"request:",i),m})}jo(e,n,i,r,s,a){return this.Wo(e,n,i,r,s)}Go(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fa}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,s)=>e[s]=r),i&&i.headers.forEach((r,s)=>e[s]=r)}Qo(e,n){const i=NV[e];let r=`${this.Ko}/v1/${n}:${i}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MV{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt="WebChannelConnection",To=(t,e,n)=>{t.listen(e,i=>{try{n(i)}catch(r){setTimeout(()=>{throw r},0)}})};class la extends OV{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!la.c_){const e=uw();To(e,lw.STAT_EVENT,n=>{n.stat===Mm.PROXY?G(Dt,"STAT_EVENT: detected buffering proxy"):n.stat===Mm.NOPROXY&&G(Dt,"STAT_EVENT: detected no buffering proxy")}),la.c_=!0}}zo(e,n,i,r,s){const a=Gm();return new Promise((l,u)=>{const c=new aw;c.setWithCredentials(!0),c.listenOnce(ow.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case tc.NO_ERROR:const m=c.getResponseJson();G(Dt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),l(m);break;case tc.TIMEOUT:G(Dt,`RPC '${e}' ${a} timed out`),u(new H(U.DEADLINE_EXCEEDED,"Request time out"));break;case tc.HTTP_ERROR:const p=c.getStatus();if(G(Dt,`RPC '${e}' ${a} failed with status:`,p,"response text:",c.getResponseText()),p>0){let y=c.getResponseJson();Array.isArray(y)&&(y=y[0]);const I=y==null?void 0:y.error;if(I&&I.status&&I.message){const N=function(v){const E=v.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(E)>=0?E:U.UNKNOWN}(I.status);u(new H(N,I.message))}else u(new H(U.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new H(U.UNAVAILABLE,"Connection failed."));break;default:J(9055,{l_:e,streamId:a,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{G(Dt,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(r);G(Dt,`RPC '${e}' ${a} sending request:`,r),c.send(n,"POST",f,i,15)})}T_(e,n,i){const r=Gm(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,n,i),l.encodeInitMessageHeaders=!0;const c=s.join("");G(Dt,`Creating RPC '${e}' stream ${r}: ${c}`,l);const f=a.createWebChannel(c,l);this.E_(f);let m=!1,p=!1;const y=new MV({Jo:I=>{p?G(Dt,`Not sending because RPC '${e}' stream ${r} is closed:`,I):(m||(G(Dt,`Opening RPC '${e}' stream ${r} transport.`),f.open(),m=!0),G(Dt,`RPC '${e}' stream ${r} sending:`,I),f.send(I))},Ho:()=>f.close()});return To(f,Do.EventType.OPEN,()=>{p||(G(Dt,`RPC '${e}' stream ${r} transport opened.`),y.i_())}),To(f,Do.EventType.CLOSE,()=>{p||(p=!0,G(Dt,`RPC '${e}' stream ${r} transport closed`),y.o_(),this.I_(f))}),To(f,Do.EventType.ERROR,I=>{p||(p=!0,us(Dt,`RPC '${e}' stream ${r} transport errored. Name:`,I.name,"Message:",I.message),y.o_(new H(U.UNAVAILABLE,"The operation could not be completed")))}),To(f,Do.EventType.MESSAGE,I=>{var N;if(!p){const D=I.data[0];Te(!!D,16349);const v=D,E=(v==null?void 0:v.error)||((N=v[0])==null?void 0:N.error);if(E){G(Dt,`RPC '${e}' stream ${r} received error:`,E);const A=E.status;let M=function(T){const _=it[T];if(_!==void 0)return jw(_)}(A),B=E.message;A==="NOT_FOUND"&&B.includes("database")&&B.includes("does not exist")&&B.includes(this.databaseId.database)&&us(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),M===void 0&&(M=U.INTERNAL,B="Unknown error status: "+A+" with message "+E.message),p=!0,y.o_(new H(M,B)),f.close()}else G(Dt,`RPC '${e}' stream ${r} received:`,D),y.__(D)}}),la.u_(),setTimeout(()=>{y.s_()},0),y}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(n=>n===e)}Go(e,n,i){super.Go(e,n,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return cw()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VV(t){return new la(t)}function _d(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(t){return new UM(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */la.c_=!1;class sb{constructor(e,n,i=1e3,r=1.5,s=6e4){this.Ci=e,this.timerId=n,this.R_=i,this.A_=r,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),r=Math.max(0,n-i);r>0&&G("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RE="PersistentStream";class ab{constructor(e,n,i,r,s,a,l,u){this.Ci=e,this.S_=i,this.b_=r,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new sb(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===U.RESOURCE_EXHAUSTED?(Oi(n.toString()),Oi("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(n)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.D_===n&&this.G_(i,r)},i=>{e(()=>{const r=new H(U.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(r)})})}G_(e,n){const i=this.Q_(this.D_);this.stream=this.j_(e,n),this.stream.Zo(()=>{i(()=>this.listener.Zo())}),this.stream.Yo(()=>{i(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(r=>{i(()=>this.z_(r))}),this.stream.onMessage(r=>{i(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return G(RE,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return n=>{this.Ci.enqueueAndForget(()=>this.D_===e?n():(G(RE,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class kV extends ab{constructor(e,n,i,r,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,i,r,a),this.serializer=s}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=BM(this.serializer,e),i=function(s){if(!("targetChange"in s))return ne.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?ne.min():a.readTime?$n(a.readTime):ne.min()}(e);return this.listener.H_(n,i)}Z_(e){const n={};n.database=Fm(this.serializer),n.addTarget=function(s,a){let l;const u=a.target;if(l=Um(u)?{documents:FM(s,u)}:{query:jM(s,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Yw(s,a.resumeToken);const c=Bm(s,a.expectedCount);c!==null&&(l.expectedCount=c)}else if(a.snapshotVersion.compareTo(ne.min())>0){l.readTime=$c(s,a.snapshotVersion.toTimestamp());const c=Bm(s,a.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const i=KM(this.serializer,e);i&&(n.labels=i),this.q_(n)}X_(e){const n={};n.database=Fm(this.serializer),n.removeTarget=e,this.q_(n)}}class PV extends ab{constructor(e,n,i,r,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,i,r,a),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=HM(e.writeResults,e.commitTime),i=$n(e.commitTime);return this.listener.na(i,n)}ra(){const e={};e.database=Fm(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(i=>qM(this.serializer,i))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LV{}class UV extends LV{constructor(e,n,i,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=i,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new H(U.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,i,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,qm(n,i),r,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new H(U.UNKNOWN,s.toString())})}jo(e,n,i,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.jo(e,qm(n,i),r,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new H(U.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function xV(t,e,n,i){return new UV(t,e,n,i)}class zV{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Oi(n),this.aa=!1):G("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs="RemoteStore";class BV{constructor(e,n,i,r,s){this.localStore=e,this.datastore=n,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(a=>{i.enqueueAndForget(async()=>{Rs(this)&&(G(cs,"Restarting streams for network reachability change."),await async function(u){const c=ie(u);c.Ia.add(4),await ql(c),c.Va.set("Unknown"),c.Ia.delete(4),await Yh(c)}(this))})}),this.Va=new zV(i,r)}}async function Yh(t){if(Rs(t))for(const e of t.Ra)await e(!0)}async function ql(t){for(const e of t.Ra)await e(!1)}function ob(t,e){const n=ie(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),Cg(n)?Ig(n):Ya(n).O_()&&Rg(n,e))}function bg(t,e){const n=ie(t),i=Ya(n);n.Ea.delete(e),i.O_()&&lb(n,e),n.Ea.size===0&&(i.O_()?i.L_():Rs(n)&&n.Va.set("Unknown"))}function Rg(t,e){if(t.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ne.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ya(t).Z_(e)}function lb(t,e){t.da.$e(e),Ya(t).X_(e)}function Ig(t){t.da=new VM({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ea.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Ya(t).start(),t.Va.ua()}function Cg(t){return Rs(t)&&!Ya(t).x_()&&t.Ea.size>0}function Rs(t){return ie(t).Ia.size===0}function ub(t){t.da=void 0}async function qV(t){t.Va.set("Online")}async function HV(t){t.Ea.forEach((e,n)=>{Rg(t,e)})}async function FV(t,e){ub(t),Cg(t)?(t.Va.ha(e),Ig(t)):t.Va.set("Unknown")}async function jV(t,e,n){if(t.Va.set("Online"),e instanceof Kw&&e.state===2&&e.cause)try{await async function(r,s){const a=s.cause;for(const l of s.targetIds)r.Ea.has(l)&&(await r.remoteSyncer.rejectListen(l,a),r.Ea.delete(l),r.da.removeTarget(l))}(t,e)}catch(i){G(cs,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Xc(t,i)}else if(e instanceof sc?t.da.Xe(e):e instanceof Gw?t.da.st(e):t.da.tt(e),!n.isEqual(ne.min()))try{const i=await rb(t.localStore);n.compareTo(i)>=0&&await function(s,a){const l=s.da.Tt(a);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ea.get(c);f&&s.Ea.set(c,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,c)=>{const f=s.Ea.get(u);if(!f)return;s.Ea.set(u,f.withResumeToken(It.EMPTY_BYTE_STRING,f.snapshotVersion)),lb(s,u);const m=new ar(f.target,u,c,f.sequenceNumber);Rg(s,m)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(i){G(cs,"Failed to raise snapshot:",i),await Xc(t,i)}}async function Xc(t,e,n){if(!Ga(e))throw e;t.Ia.add(1),await ql(t),t.Va.set("Offline"),n||(n=()=>rb(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{G(cs,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await Yh(t)})}function cb(t,e){return e().catch(n=>Xc(t,n,e))}async function $h(t){const e=ie(t),n=Ir(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:hg;for(;GV(e);)try{const r=await bV(e.localStore,i);if(r===null){e.Ta.length===0&&n.L_();break}i=r.batchId,KV(e,r)}catch(r){await Xc(e,r)}hb(e)&&fb(e)}function GV(t){return Rs(t)&&t.Ta.length<10}function KV(t,e){t.Ta.push(e);const n=Ir(t);n.O_()&&n.Y_&&n.ea(e.mutations)}function hb(t){return Rs(t)&&!Ir(t).x_()&&t.Ta.length>0}function fb(t){Ir(t).start()}async function YV(t){Ir(t).ra()}async function $V(t){const e=Ir(t);for(const n of t.Ta)e.ea(n.mutations)}async function QV(t,e,n){const i=t.Ta.shift(),r=_g.from(i,e,n);await cb(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await $h(t)}async function XV(t,e){e&&Ir(t).Y_&&await async function(i,r){if(function(a){return NM(a)&&a!==U.ABORTED}(r.code)){const s=i.Ta.shift();Ir(i).B_(),await cb(i,()=>i.remoteSyncer.rejectFailedWrite(s.batchId,r)),await $h(i)}}(t,e),hb(t)&&fb(t)}async function IE(t,e){const n=ie(t);n.asyncQueue.verifyOperationInProgress(),G(cs,"RemoteStore received new credentials");const i=Rs(n);n.Ia.add(3),await ql(n),i&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Yh(n)}async function WV(t,e){const n=ie(t);e?(n.Ia.delete(2),await Yh(n)):e||(n.Ia.add(2),await ql(n),n.Va.set("Unknown"))}function Ya(t){return t.ma||(t.ma=function(n,i,r){const s=ie(n);return s.sa(),new kV(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Zo:qV.bind(null,t),Yo:HV.bind(null,t),t_:FV.bind(null,t),H_:jV.bind(null,t)}),t.Ra.push(async e=>{e?(t.ma.B_(),Cg(t)?Ig(t):t.Va.set("Unknown")):(await t.ma.stop(),ub(t))})),t.ma}function Ir(t){return t.fa||(t.fa=function(n,i,r){const s=ie(n);return s.sa(),new PV(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),Yo:YV.bind(null,t),t_:XV.bind(null,t),ta:$V.bind(null,t),na:QV.bind(null,t)}),t.Ra.push(async e=>{e?(t.fa.B_(),await $h(t)):(await t.fa.stop(),t.Ta.length>0&&(G(cs,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,n,i,r,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=i,this.op=r,this.removalCallback=s,this.deferred=new Ti,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,i,r,s){const a=Date.now()+i,l=new Dg(e,n,a,r,s);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ng(t,e){if(Oi("AsyncQueue",`${e}: ${t}`),Ga(t))return new H(U.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{static emptySet(e){return new ua(e.comparator)}constructor(e){this.comparator=e?(n,i)=>e(n,i)||Y.comparator(n.key,i.key):(n,i)=>Y.comparator(n.key,i.key),this.keyedMap=No(),this.sortedSet=new Ye(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,i)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ua)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,s=i.getNext().key;if(!r.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const i=new ua;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=n,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(){this.ga=new Ye(Y.comparator)}track(e){const n=e.doc.key,i=this.ga.get(n);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(n,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(n,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(n):e.type===1&&i.type===2?this.ga=this.ga.insert(n,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):J(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,i)=>{e.push(i)}),e}}class Na{constructor(e,n,i,r,s,a,l,u,c){this.query=e,this.docs=n,this.oldDocs=i,this.docChanges=r,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,i,r,s){const a=[];return n.forEach(l=>{a.push({type:0,doc:l})}),new Na(e,n,ua.emptySet(n),a,i,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bh(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,i=e.docChanges;if(n.length!==i.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==i[r].type||!n[r].doc.isEqual(i[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JV{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class ZV{constructor(){this.queries=DE(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,i){const r=ie(n),s=r.queries;r.queries=DE(),s.forEach((a,l)=>{for(const u of l.Sa)u.onError(i)})})(this,new H(U.ABORTED,"Firestore shutting down"))}}function DE(){return new bs(t=>Mw(t),Bh)}async function Og(t,e){const n=ie(t);let i=3;const r=e.query;let s=n.queries.get(r);s?!s.ba()&&e.Da()&&(i=2):(s=new JV,i=e.Da()?0:1);try{switch(i){case 0:s.wa=await n.onListen(r,!0);break;case 1:s.wa=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(a){const l=Ng(a,`Initialization of query '${zs(e.query)}' failed`);return void e.onError(l)}n.queries.set(r,s),s.Sa.push(e),e.va(n.onlineState),s.wa&&e.Fa(s.wa)&&Vg(n)}async function Mg(t,e){const n=ie(t),i=e.query;let r=3;const s=n.queries.get(i);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?r=e.Da()?0:1:!s.ba()&&e.Da()&&(r=2))}switch(r){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}function ek(t,e){const n=ie(t);let i=!1;for(const r of e){const s=r.query,a=n.queries.get(s);if(a){for(const l of a.Sa)l.Fa(r)&&(i=!0);a.wa=r}}i&&Vg(n)}function tk(t,e,n){const i=ie(t),r=i.queries.get(e);if(r)for(const s of r.Sa)s.onError(n);i.queries.delete(e)}function Vg(t){t.Ca.forEach(e=>{e.next()})}var Km,NE;(NE=Km||(Km={})).Ma="default",NE.Cache="cache";class kg{constructor(e,n,i){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const r of e.docChanges)r.type!==3&&i.push(r);e=new Na(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const i=n!=="Offline";return(!this.options.qa||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Na.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Km.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e){this.key=e}}class mb{constructor(e){this.key=e}}class nk{constructor(e,n){this.query=e,this.Za=n,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=pe(),this.mutatedKeys=pe(),this.eu=Vw(e),this.tu=new ua(this.eu)}get nu(){return this.Za}ru(e,n){const i=n?n.iu:new CE,r=n?n.tu:this.tu;let s=n?n.mutatedKeys:this.mutatedKeys,a=r,l=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,c=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((f,m)=>{const p=r.get(f),y=qh(this.query,m)?m:null,I=!!p&&this.mutatedKeys.has(p.key),N=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let D=!1;p&&y?p.data.isEqual(y.data)?I!==N&&(i.track({type:3,doc:y}),D=!0):this.su(p,y)||(i.track({type:2,doc:y}),D=!0,(u&&this.eu(y,u)>0||c&&this.eu(y,c)<0)&&(l=!0)):!p&&y?(i.track({type:0,doc:y}),D=!0):p&&!y&&(i.track({type:1,doc:p}),D=!0,(u||c)&&(l=!0)),D&&(y?(a=a.add(y),s=N?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),i.track({type:1,doc:f})}return{tu:a,iu:i,bs:l,mutatedKeys:s}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,i,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,m)=>function(y,I){const N=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J(20277,{Vt:D})}};return N(y)-N(I)}(f.type,m.type)||this.eu(f.doc,m.doc)),this.ou(i),r=r??!1;const l=n&&!r?this._u():[],u=this.Ya.size===0&&this.current&&!r?1:0,c=u!==this.Xa;return this.Xa=u,a.length!==0||c?{snapshot:new Na(this.query,e.tu,s,a,e.mutatedKeys,u===0,c,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new CE,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Za=this.Za.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Za=this.Za.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=pe(),this.tu.forEach(i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))});const n=[];return e.forEach(i=>{this.Ya.has(i)||n.push(new mb(i))}),this.Ya.forEach(i=>{e.has(i)||n.push(new db(i))}),n}cu(e){this.Za=e.ks,this.Ya=pe();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Na.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Pg="SyncEngine";class ik{constructor(e,n,i){this.query=e,this.targetId=n,this.view=i}}class rk{constructor(e){this.key=e,this.hu=!1}}class sk{constructor(e,n,i,r,s,a){this.localStore=e,this.remoteStore=n,this.eventManager=i,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new bs(l=>Mw(l),Bh),this.Eu=new Map,this.Iu=new Set,this.Ru=new Ye(Y.comparator),this.Au=new Map,this.Vu=new Tg,this.du={},this.mu=new Map,this.fu=Da.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function ak(t,e,n=!0){const i=Eb(t);let r;const s=i.Tu.get(e);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.lu()):r=await pb(i,e,n,!0),r}async function ok(t,e){const n=Eb(t);await pb(n,e,!0,!1)}async function pb(t,e,n,i){const r=await RV(t.localStore,Yn(e)),s=r.targetId,a=t.sharedClientState.addLocalQueryTarget(s,n);let l;return i&&(l=await lk(t,e,s,a==="current",r.resumeToken)),t.isPrimaryClient&&n&&ob(t.remoteStore,r),l}async function lk(t,e,n,i,r){t.pu=(m,p,y)=>async function(N,D,v,E){let A=D.view.ru(v);A.bs&&(A=await SE(N.localStore,D.query,!1).then(({documents:T})=>D.view.ru(T,A)));const M=E&&E.targetChanges.get(D.targetId),B=E&&E.targetMismatches.get(D.targetId)!=null,F=D.view.applyChanges(A,N.isPrimaryClient,M,B);return ME(N,D.targetId,F.au),F.snapshot}(t,m,p,y);const s=await SE(t.localStore,e,!0),a=new nk(e,s.ks),l=a.ru(s.documents),u=Bl.createSynthesizedTargetChangeForCurrentChange(n,i&&t.onlineState!=="Offline",r),c=a.applyChanges(l,t.isPrimaryClient,u);ME(t,n,c.au);const f=new ik(e,n,a);return t.Tu.set(e,f),t.Eu.has(n)?t.Eu.get(n).push(e):t.Eu.set(n,[e]),c.snapshot}async function uk(t,e,n){const i=ie(t),r=i.Tu.get(e),s=i.Eu.get(r.targetId);if(s.length>1)return i.Eu.set(r.targetId,s.filter(a=>!Bh(a,e))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(r.targetId),i.sharedClientState.isActiveQueryTarget(r.targetId)||await jm(i.localStore,r.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(r.targetId),n&&bg(i.remoteStore,r.targetId),Ym(i,r.targetId)}).catch(ja)):(Ym(i,r.targetId),await jm(i.localStore,r.targetId,!0))}async function ck(t,e){const n=ie(t),i=n.Tu.get(e),r=n.Eu.get(i.targetId);n.isPrimaryClient&&r.length===1&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),bg(n.remoteStore,i.targetId))}async function hk(t,e,n){const i=_k(t);try{const r=await function(a,l){const u=ie(a),c=ze.now(),f=l.reduce((y,I)=>y.add(I.key),pe());let m,p;return u.persistence.runTransaction("Locally write mutations","readwrite",y=>{let I=Mi(),N=pe();return u.xs.getEntries(y,f).next(D=>{I=D,I.forEach((v,E)=>{E.isValidDocument()||(N=N.add(v))})}).next(()=>u.localDocuments.getOverlayedDocuments(y,I)).next(D=>{m=D;const v=[];for(const E of l){const A=bM(E,m.get(E.key).overlayedDocument);A!=null&&v.push(new Mr(E.key,A,ww(A.value.mapValue),zt.exists(!0)))}return u.mutationQueue.addMutationBatch(y,c,v,l)}).next(D=>{p=D;const v=D.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(y,D.batchId,v)})}).then(()=>({batchId:p.batchId,changes:Pw(m)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,l,u){let c=a.du[a.currentUser.toKey()];c||(c=new Ye(me)),c=c.insert(l,u),a.du[a.currentUser.toKey()]=c}(i,r.batchId,n),await Hl(i,r.changes),await $h(i.remoteStore)}catch(r){const s=Ng(r,"Failed to persist write");n.reject(s)}}async function gb(t,e){const n=ie(t);try{const i=await AV(n.localStore,e);e.targetChanges.forEach((r,s)=>{const a=n.Au.get(s);a&&(Te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?Te(a.hu,14607):r.removedDocuments.size>0&&(Te(a.hu,42227),a.hu=!1))}),await Hl(n,i,e)}catch(i){await ja(i)}}function OE(t,e,n){const i=ie(t);if(i.isPrimaryClient&&n===0||!i.isPrimaryClient&&n===1){const r=[];i.Tu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&r.push(l.snapshot)}),function(a,l){const u=ie(a);u.onlineState=l;let c=!1;u.queries.forEach((f,m)=>{for(const p of m.Sa)p.va(l)&&(c=!0)}),c&&Vg(u)}(i.eventManager,e),r.length&&i.Pu.H_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function fk(t,e,n){const i=ie(t);i.sharedClientState.updateQueryState(e,"rejected",n);const r=i.Au.get(e),s=r&&r.key;if(s){let a=new Ye(Y.comparator);a=a.insert(s,Ot.newNoDocument(s,ne.min()));const l=pe().add(s),u=new Gh(ne.min(),new Map,new Ye(me),a,l);await gb(i,u),i.Ru=i.Ru.remove(s),i.Au.delete(e),Lg(i)}else await jm(i.localStore,e,!1).then(()=>Ym(i,e,n)).catch(ja)}async function dk(t,e){const n=ie(t),i=e.batch.batchId;try{const r=await SV(n.localStore,e);_b(n,i,null),yb(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await Hl(n,r)}catch(r){await ja(r)}}async function mk(t,e,n){const i=ie(t);try{const r=await function(a,l){const u=ie(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(m=>(Te(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(c,m))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(i.localStore,e);_b(i,e,n),yb(i,e),i.sharedClientState.updateMutationState(e,"rejected",n),await Hl(i,r)}catch(r){await ja(r)}}function yb(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function _b(t,e,n){const i=ie(t);let r=i.du[i.currentUser.toKey()];if(r){const s=r.get(e);s&&(n?s.reject(n):s.resolve(),r=r.remove(e)),i.du[i.currentUser.toKey()]=r}}function Ym(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const i of t.Eu.get(e))t.Tu.delete(i),n&&t.Pu.yu(i,n);t.Eu.delete(e),t.isPrimaryClient&&t.Vu.Gr(e).forEach(i=>{t.Vu.containsKey(i)||vb(t,i)})}function vb(t,e){t.Iu.delete(e.path.canonicalString());const n=t.Ru.get(e);n!==null&&(bg(t.remoteStore,n),t.Ru=t.Ru.remove(e),t.Au.delete(n),Lg(t))}function ME(t,e,n){for(const i of n)i instanceof db?(t.Vu.addReference(i.key,e),pk(t,i)):i instanceof mb?(G(Pg,"Document no longer in limbo: "+i.key),t.Vu.removeReference(i.key,e),t.Vu.containsKey(i.key)||vb(t,i.key)):J(19791,{wu:i})}function pk(t,e){const n=e.key,i=n.path.canonicalString();t.Ru.get(n)||t.Iu.has(i)||(G(Pg,"New document in limbo: "+n),t.Iu.add(i),Lg(t))}function Lg(t){for(;t.Iu.size>0&&t.Ru.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new Y(Me.fromString(e)),i=t.fu.next();t.Au.set(i,new rk(n)),t.Ru=t.Ru.insert(n,i),ob(t.remoteStore,new ar(Yn(zh(n.path)),i,"TargetPurposeLimboResolution",Lh.ce))}}async function Hl(t,e,n){const i=ie(t),r=[],s=[],a=[];i.Tu.isEmpty()||(i.Tu.forEach((l,u)=>{a.push(i.pu(u,e,n).then(c=>{var f;if((c||n)&&i.isPrimaryClient){const m=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:f.current;i.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(c){r.push(c);const m=Ag.Is(u.targetId,c);s.push(m)}}))}),await Promise.all(a),i.Pu.H_(r),await async function(u,c){const f=ie(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>z.forEach(c,p=>z.forEach(p.Ts,y=>f.persistence.referenceDelegate.addReference(m,p.targetId,y)).next(()=>z.forEach(p.Es,y=>f.persistence.referenceDelegate.removeReference(m,p.targetId,y)))))}catch(m){if(!Ga(m))throw m;G(wg,"Failed to update sequence numbers: "+m)}for(const m of c){const p=m.targetId;if(!m.fromCache){const y=f.vs.get(p),I=y.snapshotVersion,N=y.withLastLimboFreeSnapshotVersion(I);f.vs=f.vs.insert(p,N)}}}(i.localStore,s))}async function gk(t,e){const n=ie(t);if(!n.currentUser.isEqual(e)){G(Pg,"User change. New user:",e.toKey());const i=await ib(n.localStore,e);n.currentUser=e,function(s,a){s.mu.forEach(l=>{l.forEach(u=>{u.reject(new H(U.CANCELLED,a))})}),s.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Hl(n,i.Ns)}}function yk(t,e){const n=ie(t),i=n.Au.get(e);if(i&&i.hu)return pe().add(i.key);{let r=pe();const s=n.Eu.get(e);if(!s)return r;for(const a of s){const l=n.Tu.get(a);r=r.unionWith(l.view.nu)}return r}}function Eb(t){const e=ie(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=gb.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=yk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=fk.bind(null,e),e.Pu.H_=ek.bind(null,e.eventManager),e.Pu.yu=tk.bind(null,e.eventManager),e}function _k(t){const e=ie(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=mk.bind(null,e),e}class Wc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Kh(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return TV(this.persistence,new _V,e.initialUser,this.serializer)}Cu(e){return new nb(Sg.Vi,this.serializer)}Du(e){return new CV}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Wc.provider={build:()=>new Wc};class vk extends Wc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Te(this.persistence.referenceDelegate instanceof Qc,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new iV(i,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Kt.withCacheSize(this.cacheSizeBytes):Kt.DEFAULT;return new nb(i=>Qc.Vi(i,n),this.serializer)}}class $m{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>OE(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=gk.bind(null,this.syncEngine),await WV(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ZV}()}createDatastore(e){const n=Kh(e.databaseInfo.databaseId),i=VV(e.databaseInfo);return xV(e.authCredentials,e.appCheckCredentials,i,n)}createRemoteStore(e){return function(i,r,s,a,l){return new BV(i,r,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,n=>OE(this.syncEngine,n,0),function(){return bE.v()?new bE:new DV}())}createSyncEngine(e,n){return function(r,s,a,l,u,c,f){const m=new sk(r,s,a,l,u,c);return f&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(r){const s=ie(r);G(cs,"RemoteStore shutting down."),s.Ia.add(5),await ql(s),s.Aa.shutdown(),s.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}$m.provider={build:()=>new $m};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Oi("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr="FirestoreClient";class Ek{constructor(e,n,i,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=i,this._databaseInfo=r,this.user=Nt.UNAUTHENTICATED,this.clientId=cg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(i,async a=>{G(Cr,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(G(Cr,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ti;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const i=Ng(n,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function vd(t,e){t.asyncQueue.verifyOperationInProgress(),G(Cr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let i=n.initialUser;t.setCredentialChangeListener(async r=>{i.isEqual(r)||(await ib(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function VE(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Tk(t);G(Cr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(i=>IE(e.remoteStore,i)),t.setAppCheckTokenChangeListener((i,r)=>IE(e.remoteStore,r)),t._onlineComponents=e}async function Tk(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){G(Cr,"Using user provided OfflineComponentProvider");try{await vd(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===U.FAILED_PRECONDITION||r.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;us("Error using user provided cache. Falling back to memory cache: "+n),await vd(t,new Wc)}}else G(Cr,"Using default OfflineComponentProvider"),await vd(t,new vk(void 0));return t._offlineComponents}async function Tb(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(G(Cr,"Using user provided OnlineComponentProvider"),await VE(t,t._uninitializedComponentsProvider._online)):(G(Cr,"Using default OnlineComponentProvider"),await VE(t,new $m))),t._onlineComponents}function Sk(t){return Tb(t).then(e=>e.syncEngine)}async function Jc(t){const e=await Tb(t),n=e.eventManager;return n.onListen=ak.bind(null,e.syncEngine),n.onUnlisten=uk.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=ok.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=ck.bind(null,e.syncEngine),n}function Ak(t,e,n,i){const r=new Ug(i),s=new kg(e,r,n);return t.asyncQueue.enqueueAndForget(async()=>Og(await Jc(t),s)),()=>{r.Nu(),t.asyncQueue.enqueueAndForget(async()=>Mg(await Jc(t),s))}}function wk(t,e,n={}){const i=new Ti;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,c){const f=new Ug({next:p=>{f.Nu(),a.enqueueAndForget(()=>Mg(s,m));const y=p.docs.has(l);!y&&p.fromCache?c.reject(new H(U.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&p.fromCache&&u&&u.source==="server"?c.reject(new H(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),m=new kg(zh(l.path),f,{includeMetadataChanges:!0,qa:!0});return Og(s,m)}(await Jc(t),t.asyncQueue,e,n,i)),i.promise}function bk(t,e,n={}){const i=new Ti;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,l,u,c){const f=new Ug({next:p=>{f.Nu(),a.enqueueAndForget(()=>Mg(s,m)),p.fromCache&&u.source==="server"?c.reject(new H(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),m=new kg(l,f,{includeMetadataChanges:!0,qa:!0});return Og(s,m)}(await Jc(t),t.asyncQueue,e,n,i)),i.promise}function Rk(t,e){const n=new Ti;return t.asyncQueue.enqueueAndForget(async()=>hk(await Sk(t),e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sb(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ik="ComponentProvider",kE=new Map;function Ck(t,e,n,i,r){return new Y2(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,Sb(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ab="firestore.googleapis.com",PE=!0;class LE{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new H(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ab,this.ssl=PE}else this.host=e.host,this.ssl=e.ssl??PE;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=tb;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<tV)throw new H(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}L2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Sb(e.experimentalLongPollingOptions??{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new H(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qh{constructor(e,n,i,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new LE({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new LE(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new R2;switch(i.type){case"firstParty":return new N2(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new H(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const i=kE.get(n);i&&(G(Ik,"Removing Datastore"),kE.delete(n),i.terminate())}(this),Promise.resolve()}}function Dk(t,e,n,i={}){var c;t=xt(t,Qh);const r=Ha(e),s=t._getSettings(),a={...s,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;r&&ag(`https://${l}`),s.host!==Ab&&s.host!==l&&us("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:l,ssl:r,emulatorOptions:i};if(!Di(u,a)&&(t._setSettings(u),i.mockUserToken)){let f,m;if(typeof i.mockUserToken=="string")f=i.mockUserToken,m=Nt.MOCK_USER;else{f=JA(i.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const p=i.mockUserToken.sub||i.mockUserToken.user_id;if(!p)throw new H(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Nt(p)}t._authCredentials=new I2(new fw(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Vr(this.firestore,e,this._query)}}class Je{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _r(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Je(this.firestore,e,this._key)}toJSON(){return{type:Je._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(xl(n,Je._jsonSchema))return new Je(e,i||null,new Y(Me.fromString(n.referencePath)))}}Je._jsonSchemaVersion="firestore/documentReference/1.0",Je._jsonSchema={type:ut("string",Je._jsonSchemaVersion),referencePath:ut("string")};class _r extends Vr{constructor(e,n,i){super(e,n,zh(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Je(this.firestore,null,new Y(e))}withConverter(e){return new _r(this.firestore,e,this._path)}}function S4(t,e,...n){if(t=ke(t),dw("collection","path",e),t instanceof Qh){const i=Me.fromString(e,...n);return Qv(i),new _r(t,null,i)}{if(!(t instanceof Je||t instanceof _r))throw new H(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(Me.fromString(e,...n));return Qv(i),new _r(t.firestore,null,i)}}function Nk(t,e,...n){if(t=ke(t),arguments.length===1&&(e=cg.newId()),dw("doc","path",e),t instanceof Qh){const i=Me.fromString(e,...n);return $v(i),new Je(t,null,new Y(i))}{if(!(t instanceof Je||t instanceof _r))throw new H(U.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(Me.fromString(e,...n));return $v(i),new Je(t.firestore,t instanceof _r?t.converter:null,new Y(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE="AsyncQueue";class xE{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new sb(this,"async_queue_retry"),this._c=()=>{const i=_d();i&&G(UE,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const n=_d();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=_d();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Ti;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Ga(e))throw e;G(UE,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(i=>{throw this.nc=i,this.rc=!1,Oi("INTERNAL UNHANDLED ERROR: ",zE(i)),i}).then(i=>(this.rc=!1,i))));return this.ac=n,n}enqueueAfterDelay(e,n,i){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const r=Dg.createAndSchedule(this,e,n,i,s=>this.hc(s));return this.tc.push(r),r}uc(){this.nc&&J(47125,{Pc:zE(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((n,i)=>n.targetTimeMs-i.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function zE(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Zn extends Qh{constructor(e,n,i,r){super(e,n,i,r),this.type="firestore",this._queue=new xE,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new xE(e),this._firestoreClient=void 0,await e}}}function A4(t,e){const n=typeof t=="object"?t:kh(),i=typeof t=="string"?t:jc,r=As(n,"firestore").getImmediate({identifier:i});if(!r._initialized){const s=QA("firestore");s&&Dk(r,...s)}return r}function Fl(t){if(t._terminated)throw new H(U.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||Ok(t),t._firestoreClient}function Ok(t){var i,r,s,a;const e=t._freezeSettings(),n=Ck(t._databaseId,((i=t._app)==null?void 0:i.options.appId)||"",t._persistenceKey,(r=t._app)==null?void 0:r.options.apiKey,e);t._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new Ek(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tn(It.fromBase64String(e))}catch(n){throw new H(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Tn(It.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Tn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(xl(e,Tn._jsonSchema))return Tn.fromBase64String(e.bytes)}}Tn._jsonSchemaVersion="firestore/bytes/1.0",Tn._jsonSchema={type:ut("string",Tn._jsonSchemaVersion),bytes:ut("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new wt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return me(this._lat,e._lat)||me(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Qn._jsonSchemaVersion}}static fromJSON(e){if(xl(e,Qn._jsonSchema))return new Qn(e.latitude,e.longitude)}}Qn._jsonSchemaVersion="firestore/geoPoint/1.0",Qn._jsonSchema={type:ut("string",Qn._jsonSchemaVersion),latitude:ut("number"),longitude:ut("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let s=0;s<i.length;++s)if(i[s]!==r[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Nn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(xl(e,Nn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new Nn(e.vectorValues);throw new H(U.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Nn._jsonSchemaVersion="firestore/vectorValue/1.0",Nn._jsonSchema={type:ut("string",Nn._jsonSchemaVersion),vectorValues:ut("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mk=/^__.*__$/;class Vk{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return this.fieldMask!==null?new Mr(e,this.data,this.fieldMask,n,this.fieldTransforms):new zl(e,this.data,n,this.fieldTransforms)}}class wb{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return new Mr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function bb(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J(40011,{dataSource:t})}}class Wh{constructor(e,n,i,r,s,a){this.settings=e,this.databaseId=n,this.serializer=i,this.ignoreUndefinedProperties=r,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Wh({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var r;const n=(r=this.path)==null?void 0:r.child(e),i=this.i({path:n,arrayElement:!1});return i.mc(e),i}fc(e){var r;const n=(r=this.path)==null?void 0:r.child(e),i=this.i({path:n,arrayElement:!1});return i.Ac(),i}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Zc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(bb(this.dataSource)&&Mk.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class kk{constructor(e,n,i){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=i||Kh(e)}A(e,n,i,r=!1){return new Wh({dataSource:e,methodName:n,targetDoc:i,path:wt.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function jl(t){const e=t._freezeSettings(),n=Kh(t._databaseId);return new kk(t._databaseId,!!e.ignoreUndefinedProperties,n)}function xg(t,e,n,i,r,s={}){const a=t.A(s.merge||s.mergeFields?2:0,e,n,r);Hg("Data must be an object, but it was:",a,i);const l=Db(i,a);let u,c;if(s.merge)u=new sn(a.fieldMask),c=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const p=hs(e,m,n);if(!a.contains(p))throw new H(U.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Mb(f,p)||f.push(p)}u=new sn(f),c=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,c=a.fieldTransforms;return new Vk(new Yt(l),u,c)}class Jh extends $a{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Jh}}function Rb(t,e,n){return new Wh({dataSource:3,targetDoc:e.settings.targetDoc,methodName:t._methodName,arrayElement:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class zg extends $a{_toFieldTransform(e){return new yg(e.path,new vl)}isEqual(e){return e instanceof zg}}class Bg extends $a{constructor(e,n){super(e),this.Sc=n}_toFieldTransform(e){const n=Rb(this,e,!0),i=this.Sc.map(s=>Is(s,n)),r=new Ia(i);return new yg(e.path,r)}isEqual(e){return e instanceof Bg&&Di(this.Sc,e.Sc)}}class qg extends $a{constructor(e,n){super(e),this.Sc=n}_toFieldTransform(e){const n=Rb(this,e,!0),i=this.Sc.map(s=>Is(s,n)),r=new Ca(i);return new yg(e.path,r)}isEqual(e){return e instanceof qg&&Di(this.Sc,e.Sc)}}function Ib(t,e,n,i){const r=t.A(1,e,n);Hg("Data must be an object, but it was:",r,i);const s=[],a=Yt.empty();Or(i,(u,c)=>{const f=Ob(e,u,n);c=ke(c);const m=r.fc(f);if(c instanceof Jh)s.push(f);else{const p=Is(c,m);p!=null&&(s.push(f),a.set(f,p))}});const l=new sn(s);return new wb(a,l,r.fieldTransforms)}function Cb(t,e,n,i,r,s){const a=t.A(1,e,n),l=[hs(e,i,n)],u=[r];if(s.length%2!=0)throw new H(U.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)l.push(hs(e,s[p])),u.push(s[p+1]);const c=[],f=Yt.empty();for(let p=l.length-1;p>=0;--p)if(!Mb(c,l[p])){const y=l[p];let I=u[p];I=ke(I);const N=a.fc(y);if(I instanceof Jh)c.push(y);else{const D=Is(I,N);D!=null&&(c.push(y),f.set(y,D))}}const m=new sn(c);return new wb(f,m,a.fieldTransforms)}function Pk(t,e,n,i=!1){return Is(n,t.A(i?4:3,e))}function Is(t,e){if(Nb(t=ke(t)))return Hg("Unsupported field value:",e,t),Db(t,e);if(t instanceof $a)return function(i,r){if(!bb(r.dataSource))throw r.yc(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.yc(`${i._methodName}() is not currently supported inside arrays`);const s=i._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(i,r){const s=[];let a=0;for(const l of i){let u=Is(l,r.gc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(t,e)}return function(i,r){if((i=ke(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return vM(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const s=ze.fromDate(i);return{timestampValue:$c(r.serializer,s)}}if(i instanceof ze){const s=new ze(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:$c(r.serializer,s)}}if(i instanceof Qn)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Tn)return{bytesValue:Yw(r.serializer,i._byteString)};if(i instanceof Je){const s=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(s))throw r.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Eg(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof Nn)return function(a,l){const u=a instanceof Nn?a.toArray():a;return{mapValue:{fields:{[Sw]:{stringValue:Aw},[Gc]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw l.yc("VectorValues must only contain numeric values.");return gg(l.serializer,f)})}}}}}}(i,r);if(eb(i))return i._toProto(r.serializer);throw r.yc(`Unsupported field value: ${Ph(i)}`)}(t,e)}function Db(t,e){const n={};return gw(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Or(t,(i,r)=>{const s=Is(r,e.dc(i));s!=null&&(n[i]=s)}),{mapValue:{fields:n}}}function Nb(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ze||t instanceof Qn||t instanceof Tn||t instanceof Je||t instanceof $a||t instanceof Nn||eb(t))}function Hg(t,e,n){if(!Nb(n)||!mw(n)){const i=Ph(n);throw i==="an object"?e.yc(t+" a custom object"):e.yc(t+" "+i)}}function hs(t,e,n){if((e=ke(e))instanceof Xh)return e._internalPath;if(typeof e=="string")return Ob(t,e);throw Zc("Field path arguments must be of type string or ",t,!1,void 0,n)}const Lk=new RegExp("[~\\*/\\[\\]]");function Ob(t,e,n){if(e.search(Lk)>=0)throw Zc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Xh(...e.split("."))._internalPath}catch{throw Zc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Zc(t,e,n,i,r){const s=i&&!i.isEmpty(),a=r!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${i}`),a&&(u+=` in document ${r}`),u+=")"),new H(U.INVALID_ARGUMENT,l+t+u)}function Mb(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{convertValue(e,n="none"){switch(Rr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return et(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(br(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw J(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const i={};return Or(e,(r,s)=>{i[r]=this.convertValue(s,n)}),i}convertVectorValue(e){var i,r,s;const n=(s=(r=(i=e.fields)==null?void 0:i[Gc].arrayValue)==null?void 0:r.values)==null?void 0:s.map(a=>et(a.doubleValue));return new Nn(n)}convertGeoPoint(e){return new Qn(et(e.latitude),et(e.longitude))}convertArray(e,n){return(e.values||[]).map(i=>this.convertValue(i,n))}convertServerTimestamp(e,n){switch(n){case"previous":const i=xh(e);return i==null?null:this.convertValue(i,n);case"estimate":return this.convertTimestamp(pl(e));default:return null}}convertTimestamp(e){const n=wr(e);return new ze(n.seconds,n.nanos)}convertDocumentKey(e,n){const i=Me.fromString(e);Te(Zw(i),9688,{name:e});const r=new gl(i.get(1),i.get(3)),s=new Y(i.popFirst(5));return r.isEqual(n)||Oi(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg extends Uk{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Je(this.firestore,null,n)}}function w4(){return new zg("serverTimestamp")}function b4(...t){return new Bg("arrayUnion",t)}function R4(...t){return new qg("arrayRemove",t)}const BE="@firebase/firestore",qE="4.13.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(t){return function(n,i){if(typeof n!="object"||n===null)return!1;const r=n;for(const s of i)if(s in r&&typeof r[s]=="function")return!0;return!1}(t,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vb{constructor(e,n,i,r,s){this._firestore=e,this._userDataWriter=n,this._key=i,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Je(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new xk(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(hs("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class xk extends Vb{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jg{}class Pb extends jg{}function I4(t,e,...n){let i=[];e instanceof jg&&i.push(e),i=i.concat(n),function(s){const a=s.filter(u=>u instanceof Gg).length,l=s.filter(u=>u instanceof Zh).length;if(a>1||a>0&&l>0)throw new H(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const r of i)t=r._apply(t);return t}class Zh extends Pb{constructor(e,n,i){super(),this._field=e,this._op=n,this._value=i,this.type="where"}static _create(e,n,i){return new Zh(e,n,i)}_apply(e){const n=this._parse(e);return Lb(e._query,n),new Vr(e.firestore,e.converter,xm(e._query,n))}_parse(e){const n=jl(e.firestore);return function(s,a,l,u,c,f,m){let p;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new H(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){jE(m,f);const I=[];for(const N of m)I.push(FE(u,s,N));p={arrayValue:{values:I}}}else p=FE(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||jE(m,f),p=Pk(l,a,m,f==="in"||f==="not-in");return ot.create(c,f,p)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function C4(t,e,n){const i=e,r=hs("where",t);return Zh._create(r,i,n)}class Gg extends jg{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Gg(e,n)}_parse(e){const n=this._queryConstraints.map(i=>i._parse(e)).filter(i=>i.getFilters().length>0);return n.length===1?n[0]:Vn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,s){let a=r;const l=s.getFlattenedFilters();for(const u of l)Lb(a,u),a=xm(a,u)}(e._query,n),new Vr(e.firestore,e.converter,xm(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Kg extends Pb{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Kg(e,n)}_apply(e){const n=function(r,s,a){if(r.startAt!==null)throw new H(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new H(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _l(s,a)}(e._query,this._field,this._direction);return new Vr(e.firestore,e.converter,hM(e._query,n))}}function D4(t,e="asc"){const n=e,i=hs("orderBy",t);return Kg._create(i,n)}function FE(t,e,n){if(typeof(n=ke(n))=="string"){if(n==="")throw new H(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ow(e)&&n.indexOf("/")!==-1)throw new H(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const i=e.path.child(Me.fromString(n));if(!Y.isDocumentKey(i))throw new H(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return iE(t,new Y(i))}if(n instanceof Je)return iE(t,n._key);throw new H(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ph(n)}.`)}function jE(t,e){if(!Array.isArray(t)||t.length===0)throw new H(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Lb(t,e){const n=function(r,s){for(const a of r)for(const l of a.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new H(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function Yg(t,e,n){let i;return i=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,i}class Mo{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ts extends Vb{constructor(e,n,i,r,s,a){super(e,n,i,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ac(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const i=this._document.data.field(hs("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new H(U.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=ts._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}ts._jsonSchemaVersion="firestore/documentSnapshot/1.0",ts._jsonSchema={type:ut("string",ts._jsonSchemaVersion),bundleSource:ut("string","DocumentSnapshot"),bundleName:ut("string"),bundle:ut("string")};class ac extends ts{data(e={}){return super.data(e)}}class ns{constructor(e,n,i,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new Mo(r.hasPendingWrites,r.fromCache),this.query=i}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(i=>{e.call(n,new ac(this._firestore,this._userDataWriter,i.key,i,new Mo(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(l=>{const u=new ac(r._firestore,r._userDataWriter,l.doc.key,l.doc,new Mo(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new ac(r._firestore,r._userDataWriter,l.doc.key,l.doc,new Mo(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,f=-1;return l.type!==0&&(c=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:zk(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new H(U.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ns._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=cg.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],i=[],r=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),i.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),r.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function zk(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J(61501,{type:t})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ns._jsonSchemaVersion="firestore/querySnapshot/1.0",ns._jsonSchema={type:ut("string",ns._jsonSchemaVersion),bundleSource:ut("string","QuerySnapshot"),bundleName:ut("string"),bundle:ut("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bk{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=jl(e)}set(e,n,i){this._verifyNotCommitted();const r=Ed(e,this._firestore),s=Yg(r.converter,n,i),a=xg(this._dataReader,"WriteBatch.set",r._key,s,r.converter!==null,i);return this._mutations.push(a.toMutation(r._key,zt.none())),this}update(e,n,i,...r){this._verifyNotCommitted();const s=Ed(e,this._firestore);let a;return a=typeof(n=ke(n))=="string"||n instanceof Xh?Cb(this._dataReader,"WriteBatch.update",s._key,n,i,r):Ib(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(a.toMutation(s._key,zt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=Ed(e,this._firestore);return this._mutations=this._mutations.concat(new jh(n._key,zt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new H(U.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ed(t,e){if((t=ke(t)).firestore!==e)throw new H(U.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N4(t){t=xt(t,Je);const e=xt(t.firestore,Zn),n=Fl(e);return wk(n,t._key).then(i=>Ub(e,t,i))}function O4(t){t=xt(t,Vr);const e=xt(t.firestore,Zn),n=Fl(e),i=new Fg(e);return kb(t._query),bk(n,t._query).then(r=>new ns(e,i,t,r))}function M4(t,e,n){t=xt(t,Je);const i=xt(t.firestore,Zn),r=Yg(t.converter,e,n),s=jl(i);return Gl(i,[xg(s,"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,zt.none())])}function V4(t,e,n,...i){t=xt(t,Je);const r=xt(t.firestore,Zn),s=jl(r);let a;return a=typeof(e=ke(e))=="string"||e instanceof Xh?Cb(s,"updateDoc",t._key,e,n,i):Ib(s,"updateDoc",t._key,e),Gl(r,[a.toMutation(t._key,zt.exists(!0))])}function k4(t){return Gl(xt(t.firestore,Zn),[new jh(t._key,zt.none())])}function P4(t,e){const n=xt(t.firestore,Zn),i=Nk(t),r=Yg(t.converter,e),s=jl(t.firestore);return Gl(n,[xg(s,"addDoc",i._key,r,t.converter!==null,{}).toMutation(i._key,zt.exists(!1))]).then(()=>i)}function L4(t,...e){var c,f,m;t=ke(t);let n={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||HE(e[i])||(n=e[i++]);const r={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(HE(e[i])){const p=e[i];e[i]=(c=p.next)==null?void 0:c.bind(p),e[i+1]=(f=p.error)==null?void 0:f.bind(p),e[i+2]=(m=p.complete)==null?void 0:m.bind(p)}let s,a,l;if(t instanceof Je)a=xt(t.firestore,Zn),l=zh(t._key.path),s={next:p=>{e[i]&&e[i](Ub(a,t,p))},error:e[i+1],complete:e[i+2]};else{const p=xt(t,Vr);a=xt(p.firestore,Zn),l=p._query;const y=new Fg(a);s={next:I=>{e[i]&&e[i](new ns(a,y,p,I))},error:e[i+1],complete:e[i+2]},kb(t._query)}const u=Fl(a);return Ak(u,l,r,s)}function Gl(t,e){const n=Fl(t);return Rk(n,e)}function Ub(t,e,n){const i=n.docs.get(e._key),r=new Fg(t);return new ts(t,r,e._key,i,new Mo(n.hasPendingWrites,n.fromCache),e.converter)}function U4(t){return t=xt(t,Zn),Fl(t),new Bk(t,e=>Gl(t,e))}(function(e,n=!0){b2(ws),Mn(new bn("firestore",(i,{instanceIdentifier:r,options:s})=>{const a=i.getProvider("app").getImmediate(),l=new Zn(new C2(i.getProvider("auth-internal")),new O2(a,i.getProvider("app-check-internal")),$2(a,r),a);return s={useFetchStreams:n,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Qt(BE,qE,e),Qt(BE,qE,"esm2020")})();var qk="firebase",Hk="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qt(qk,Hk,"app");function xb(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Fk=xb,zb=new Ss("auth","Firebase",xb());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh=new og("@firebase/auth");function jk(t,...e){eh.logLevel<=de.WARN&&eh.warn(`Auth (${ws}): ${t}`,...e)}function oc(t,...e){eh.logLevel<=de.ERROR&&eh.error(`Auth (${ws}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(t,...e){throw $g(t,...e)}function Xn(t,...e){return $g(t,...e)}function Bb(t,e,n){const i={...Fk(),[e]:n};return new Ss("auth","Firebase",i).create(e,{appName:t.name})}function Si(t){return Bb(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $g(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return zb.create(t,...e)}function W(t,e,...n){if(!t)throw $g(e,...n)}function pi(t){const e="INTERNAL ASSERTION FAILED: "+t;throw oc(e),new Error(e)}function Vi(t,e){t||pi(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Gk(){return GE()==="http:"||GE()==="https:"}function GE(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gk()||sO()||"connection"in navigator)?navigator.onLine:!0}function Yk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e,n){this.shortDelay=e,this.longDelay=n,Vi(n>e,"Short delay should be less than long delay!"),this.isMobile=nO()||aO()}get(){return Kk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(t,e){Vi(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;pi("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;pi("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;pi("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $k={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xk=new Kl(3e4,6e4);function Li(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function xn(t,e,n,i,r={}){return Hb(t,r,async()=>{let s={},a={};i&&(e==="GET"?a=i:s={body:JSON.stringify(i)});const l=Ul({key:t.config.apiKey,...a}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...s};return rO()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&Ha(t.emulatorConfig.host)&&(c.credentials="include"),qb.fetch()(await Fb(t,t.config.apiHost,n,l),c)})}async function Hb(t,e,n){t._canInitEmulator=!1;const i={...$k,...e};try{const r=new Jk(t),s=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Lu(t,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Lu(t,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Lu(t,"email-already-in-use",a);if(u==="USER_DISABLED")throw Lu(t,"user-disabled",a);const f=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Bb(t,f,c);kn(t,f)}}catch(r){if(r instanceof Un)throw r;kn(t,"network-request-failed",{message:String(r)})}}async function Yl(t,e,n,i,r={}){const s=await xn(t,e,n,i,r);return"mfaPendingCredential"in s&&kn(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function Fb(t,e,n,i){const r=`${e}${n}?${i}`,s=t,a=s.config.emulator?Qg(t.config,r):`${t.config.apiScheme}://${r}`;return Qk.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Wk(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Jk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(Xn(this.auth,"network-request-failed")),Xk.get())})}}function Lu(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=Xn(t,e,i);return r.customData._tokenResponse=n,r}function KE(t){return t!==void 0&&t.enterprise!==void 0}class Zk{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Wk(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function eP(t,e){return xn(t,"GET","/v2/recaptchaConfig",Li(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tP(t,e){return xn(t,"POST","/v1/accounts:delete",e)}async function th(t,e){return xn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function nP(t,e=!1){const n=ke(t),i=await n.getIdToken(e),r=Xg(i);W(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:r,token:i,authTime:Wo(Td(r.auth_time)),issuedAtTime:Wo(Td(r.iat)),expirationTime:Wo(Td(r.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Td(t){return Number(t)*1e3}function Xg(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return oc("JWT malformed, contained fewer than 3 sections"),null;try{const r=YA(n);return r?JSON.parse(r):(oc("Failed to decode base64 JWT payload"),null)}catch(r){return oc("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function YE(t){const e=Xg(t);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fs(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Un&&iP(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function iP({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wo(this.lastLoginAt),this.creationTime=Wo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nh(t){var m;const e=t.auth,n=await t.getIdToken(),i=await fs(t,th(e,{idToken:n}));W(i==null?void 0:i.users.length,e,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const s=(m=r.providerUserInfo)!=null&&m.length?jb(r.providerUserInfo):[],a=aP(t.providerData,s),l=t.isAnonymous,u=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),c=l?u:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Xm(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(t,f)}async function sP(t){const e=ke(t);await nh(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function aP(t,e){return[...t.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function jb(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oP(t,e){const n=await Hb(t,{},async()=>{const i=Ul({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,a=await Fb(t,r,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:i};return t.emulatorConfig&&Ha(t.emulatorConfig.host)&&(u.credentials="include"),qb.fetch()(a,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function lP(t,e){return xn(t,"POST","/v2/accounts:revokeToken",Li(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):YE(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){W(e.length!==0,"internal-error");const n=YE(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:r,expiresIn:s}=await oP(e,n);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:r,expirationTime:s}=n,a=new ca;return i&&(W(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&(W(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),s&&(W(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ca,this.toJSON())}_performRefresh(){return pi("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(t,e){W(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Cn{constructor({uid:e,auth:n,stsTokenManager:i,...r}){this.providerId="firebase",this.proactiveRefresh=new rP(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Xm(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await fs(this,this.stsTokenManager.getToken(this.auth,e));return W(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return nP(this,e)}reload(){return sP(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Cn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await nh(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nn(this.auth.app))return Promise.reject(Si(this.auth));const e=await this.getIdToken();return await fs(this,tP(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,r=n.email??void 0,s=n.phoneNumber??void 0,a=n.photoURL??void 0,l=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:m,emailVerified:p,isAnonymous:y,providerData:I,stsTokenManager:N}=n;W(m&&N,e,"internal-error");const D=ca.fromJSON(this.name,N);W(typeof m=="string",e,"internal-error"),ji(i,e.name),ji(r,e.name),W(typeof p=="boolean",e,"internal-error"),W(typeof y=="boolean",e,"internal-error"),ji(s,e.name),ji(a,e.name),ji(l,e.name),ji(u,e.name),ji(c,e.name),ji(f,e.name);const v=new Cn({uid:m,auth:e,email:r,emailVerified:p,displayName:i,isAnonymous:y,photoURL:a,phoneNumber:s,tenantId:l,stsTokenManager:D,createdAt:c,lastLoginAt:f});return I&&Array.isArray(I)&&(v.providerData=I.map(E=>({...E}))),u&&(v._redirectEventId=u),v}static async _fromIdTokenResponse(e,n,i=!1){const r=new ca;r.updateFromServerResponse(n);const s=new Cn({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await nh(s),s}static async _fromGetAccountInfoResponse(e,n,i){const r=n.users[0];W(r.localId!==void 0,"internal-error");const s=r.providerUserInfo!==void 0?jb(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(s!=null&&s.length),l=new ca;l.updateFromIdToken(i);const u=new Cn({uid:r.localId,auth:e,stsTokenManager:l,isAnonymous:a}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new Xm(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $E=new Map;function gi(t){Vi(t instanceof Function,"Expected a class definition");let e=$E.get(t);return e?(Vi(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,$E.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Gb.type="NONE";const QE=Gb;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(t,e,n){return`firebase:${t}:${e}:${n}`}class ha{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:r,name:s}=this.auth;this.fullUserKey=lc(this.userKey,r.apiKey,s),this.fullPersistenceKey=lc("persistence",r.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await th(this.auth,{idToken:e}).catch(()=>{});return n?Cn._fromGetAccountInfoResponse(this.auth,n,e):null}return Cn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new ha(gi(QE),e,i);const r=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=r[0]||gi(QE);const a=lc(i,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(a);if(f){let m;if(typeof f=="string"){const p=await th(e,{idToken:f}).catch(()=>{});if(!p)break;m=await Cn._fromGetAccountInfoResponse(e,p,f)}else m=Cn._fromJSON(e,f);c!==s&&(l=m),s=c;break}}catch{}const u=r.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new ha(s,e,i):(s=u[0],l&&await s._set(a,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(a)}catch{}})),new ha(s,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XE(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Qb(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kb(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Wb(e))return"Blackberry";if(Jb(e))return"Webos";if(Yb(e))return"Safari";if((e.includes("chrome/")||$b(e))&&!e.includes("edge/"))return"Chrome";if(Xb(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Kb(t=Mt()){return/firefox\//i.test(t)}function Yb(t=Mt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $b(t=Mt()){return/crios\//i.test(t)}function Qb(t=Mt()){return/iemobile/i.test(t)}function Xb(t=Mt()){return/android/i.test(t)}function Wb(t=Mt()){return/blackberry/i.test(t)}function Jb(t=Mt()){return/webos/i.test(t)}function Wg(t=Mt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function uP(t=Mt()){var e;return Wg(t)&&!!((e=window.navigator)!=null&&e.standalone)}function cP(){return oO()&&document.documentMode===10}function Zb(t=Mt()){return Wg(t)||Xb(t)||Jb(t)||Wb(t)||/windows phone/i.test(t)||Qb(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(t,e=[]){let n;switch(t){case"Browser":n=XE(Mt());break;case"Worker":n=`${XE(Mt())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ws}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hP{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=s=>new Promise((a,l)=>{try{const u=e(s);a(u)}catch(u){l(u)}});i.onAbort=n,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fP(t,e={}){return xn(t,"GET","/v2/passwordPolicy",Li(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dP=6;class mP{constructor(e){var i;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??dP,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pP{constructor(e,n,i,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new WE(this),this.idTokenSubscription=new WE(this),this.beforeStateQueue=new hP(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zb,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=gi(n)),this._initializationPromise=this.queue(async()=>{var i,r,s;if(!this._deleted&&(this.persistenceManager=await ha.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await th(this,{idToken:e}),i=await Cn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch{await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(nn(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(i=u.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await nh(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Yk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nn(this.app))return Promise.reject(Si(this));const n=e?ke(e):null;return n&&W(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nn(this.app)?Promise.reject(Si(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nn(this.app)?Promise.reject(Si(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gi(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await fP(this),n=new mP(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ss("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await lP(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&gi(e)||this._popupRedirectResolver;W(n,this,"argument-error"),this.redirectPersistenceManager=await ha.create(this,[gi(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,r){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,i,r);return()=>{a=!0,u()}}else{const u=e.addObserver(n);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eR(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var n;if(nn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&jk(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function kr(t){return ke(t)}class WE{constructor(e){this.auth=e,this.observer=null,this.addObserver=mO(n=>this.observer=n)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ef={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gP(t){ef=t}function tR(t){return ef.loadJS(t)}function yP(){return ef.recaptchaEnterpriseScript}function _P(){return ef.gapiScript}function vP(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class EP{constructor(){this.enterprise=new TP}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class TP{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const SP="recaptcha-enterprise",nR="NO_RECAPTCHA";class AP{constructor(e){this.type=SP,this.auth=kr(e)}async verify(e="verify",n=!1){async function i(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,l)=>{eP(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new Zk(u);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,a(c.siteKey)}}).catch(u=>{l(u)})})}function r(s,a,l){const u=window.grecaptcha;KE(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(c=>{a(c)}).catch(()=>{a(nR)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new EP().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{i(this.auth).then(l=>{if(!n&&KE(window.grecaptcha))r(l,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=yP();u.length!==0&&(u+=l),tR(u).then(()=>{r(l,s,a)}).catch(c=>{a(c)})}}).catch(l=>{a(l)})})}}async function JE(t,e,n,i=!1,r=!1){const s=new AP(t);let a;if(r)a=nR;else try{a=await s.verify(n)}catch{a=await s.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function ih(t,e,n,i,r){var s;if((s=t._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await JE(t,e,n,n==="getOobCode");return i(t,a)}else return i(t,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){const l=await JE(t,e,n,n==="getOobCode");return i(t,l)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wP(t,e){const n=As(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(Di(s,e??{}))return r;kn(r,"already-initialized")}return n.initialize({options:e})}function bP(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(gi);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function RP(t,e,n){const i=kr(t);W(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,s=iR(e),{host:a,port:l}=IP(e),u=l===null?"":`:${l}`,c={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!i._canInitEmulator){W(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),W(Di(c,i.config.emulator)&&Di(f,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=c,i.emulatorConfig=f,i.settings.appVerificationDisabledForTesting=!0,Ha(a)?ag(`${s}//${a}${u}`):CP()}function iR(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function IP(t){const e=iR(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const s=r[1];return{host:s,port:ZE(i.substr(s.length+1))}}else{const[s,a]=i.split(":");return{host:s,port:ZE(a)}}}function ZE(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function CP(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return pi("not implemented")}_getIdTokenResponse(e){return pi("not implemented")}_linkToIdToken(e,n){return pi("not implemented")}_getReauthenticationResolver(e){return pi("not implemented")}}async function DP(t,e){return xn(t,"POST","/v1/accounts:update",e)}async function NP(t,e){return xn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OP(t,e){return Yl(t,"POST","/v1/accounts:signInWithPassword",Li(t,e))}async function MP(t,e){return xn(t,"POST","/v1/accounts:sendOobCode",Li(t,e))}async function VP(t,e){return MP(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kP(t,e){return Yl(t,"POST","/v1/accounts:signInWithEmailLink",Li(t,e))}async function PP(t,e){return Yl(t,"POST","/v1/accounts:signInWithEmailLink",Li(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El extends Jg{constructor(e,n,i,r=null){super("password",i),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new El(e,n,"password")}static _fromEmailAndCode(e,n,i=null){return new El(e,n,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ih(e,n,"signInWithPassword",OP);case"emailLink":return kP(e,{email:this._email,oobCode:this._password});default:kn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const i={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ih(e,i,"signUpPassword",NP);case"emailLink":return PP(e,{idToken:n,email:this._email,oobCode:this._password});default:kn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(t,e){return Yl(t,"POST","/v1/accounts:signInWithIdp",Li(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LP="http://localhost";class ds extends Jg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ds(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):kn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r,...s}=n;if(!i||!r)return null;const a=new ds(i,r);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return fa(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,fa(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,fa(e,n)}buildRequest(){const e={requestUri:LP,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ul(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UP(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function xP(t){const e=Io(Co(t)).link,n=e?Io(Co(e)).deep_link_id:null,i=Io(Co(t)).deep_link_id;return(i?Io(Co(i)).link:null)||i||n||e||t}class Zg{constructor(e){const n=Io(Co(e)),i=n.apiKey??null,r=n.oobCode??null,s=UP(n.mode??null);W(i&&r&&s,"argument-error"),this.apiKey=i,this.operation=s,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=xP(e);try{return new Zg(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.providerId=Qa.PROVIDER_ID}static credential(e,n){return El._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const i=Zg.parseLink(n);return W(i,"argument-error"),El._fromEmailAndCode(e,i.code,i.tenantId)}}Qa.PROVIDER_ID="password";Qa.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qa.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rR{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l extends rR{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends $l{constructor(){super("facebook.com")}static credential(e){return ds._fromParams({providerId:Wi.PROVIDER_ID,signInMethod:Wi.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wi.credentialFromTaggedObject(e)}static credentialFromError(e){return Wi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wi.credential(e.oauthAccessToken)}catch{return null}}}Wi.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wi.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji extends $l{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ds._fromParams({providerId:Ji.PROVIDER_ID,signInMethod:Ji.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ji.credentialFromTaggedObject(e)}static credentialFromError(e){return Ji.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Ji.credential(n,i)}catch{return null}}}Ji.GOOGLE_SIGN_IN_METHOD="google.com";Ji.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi extends $l{constructor(){super("github.com")}static credential(e){return ds._fromParams({providerId:Zi.PROVIDER_ID,signInMethod:Zi.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zi.credentialFromTaggedObject(e)}static credentialFromError(e){return Zi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zi.credential(e.oauthAccessToken)}catch{return null}}}Zi.GITHUB_SIGN_IN_METHOD="github.com";Zi.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er extends $l{constructor(){super("twitter.com")}static credential(e,n){return ds._fromParams({providerId:er.PROVIDER_ID,signInMethod:er.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return er.credentialFromTaggedObject(e)}static credentialFromError(e){return er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return er.credential(n,i)}catch{return null}}}er.TWITTER_SIGN_IN_METHOD="twitter.com";er.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zP(t,e){return Yl(t,"POST","/v1/accounts:signUp",Li(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,r=!1){const s=await Cn._fromIdTokenResponse(e,i,r),a=eT(i);return new ms({user:s,providerId:a,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const r=eT(i);return new ms({user:e,providerId:r,_tokenResponse:i,operationType:n})}}function eT(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh extends Un{constructor(e,n,i,r){super(n.code,n.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,rh.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,r){return new rh(e,n,i,r)}}function sR(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?rh._fromErrorAndOperation(t,s,e,i):s})}async function BP(t,e,n=!1){const i=await fs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ms._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qP(t,e,n=!1){const{auth:i}=t;if(nn(i.app))return Promise.reject(Si(i));const r="reauthenticate";try{const s=await fs(t,sR(i,r,e,t),n);W(s.idToken,i,"internal-error");const a=Xg(s.idToken);W(a,i,"internal-error");const{sub:l}=a;return W(t.uid===l,i,"user-mismatch"),ms._forOperation(t,r,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&kn(i,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aR(t,e,n=!1){if(nn(t.app))return Promise.reject(Si(t));const i="signIn",r=await sR(t,i,e),s=await ms._fromIdTokenResponse(t,i,r);return n||await t._updateCurrentUser(s.user),s}async function HP(t,e){return aR(kr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oR(t){const e=kr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function x4(t,e,n){const i=kr(t);await ih(i,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",VP)}async function z4(t,e,n){if(nn(t.app))return Promise.reject(Si(t));const i=kr(t),a=await ih(i,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",zP).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&oR(t),u}),l=await ms._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(l.user),l}function B4(t,e,n){return nn(t.app)?Promise.reject(Si(t)):HP(ke(t),Qa.credential(e,n)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&oR(t),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FP(t,e){return xn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function q4(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const i=ke(t),s={idToken:await i.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},a=await fs(i,FP(i.auth,s));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;const l=i.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=i.displayName,l.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function H4(t,e){return jP(ke(t),null,e)}async function jP(t,e,n){const{auth:i}=t,s={idToken:await t.getIdToken(),returnSecureToken:!0};n&&(s.password=n);const a=await fs(t,DP(i,s));await t._updateTokensIfNecessary(a,!0)}function GP(t,e,n,i){return ke(t).onIdTokenChanged(e,n,i)}function KP(t,e,n){return ke(t).beforeAuthStateChanged(e,n)}function F4(t,e,n,i){return ke(t).onAuthStateChanged(e,n,i)}function j4(t){return ke(t).signOut()}const sh="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(sh,"1"),this.storage.removeItem(sh),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YP=1e3,$P=10;class uR extends lR{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zb(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),r=this.localCache[n];i!==r&&e(n,r,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const i=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!n&&this.localCache[i]===a||this.notifyListeners(i,a)},s=this.storage.getItem(i);cP()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,$P):r()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},YP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}uR.type="LOCAL";const QP=uR;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cR extends lR{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}cR.type="SESSION";const hR=cR;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const i=new tf(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:r,data:s}=n.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const l=Array.from(a).map(async c=>c(n.origin,s)),u=await XP(l);n.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}tf.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,a;return new Promise((l,u)=>{const c=ey("",20);r.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(m){const p=m;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(p.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(){return window}function JP(t){Wn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fR(){return typeof Wn().WorkerGlobalScope<"u"&&typeof Wn().importScripts=="function"}async function ZP(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function eL(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function tL(){return fR()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dR="firebaseLocalStorageDb",nL=1,ah="firebaseLocalStorage",mR="fbase_key";class Ql{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function nf(t,e){return t.transaction([ah],e?"readwrite":"readonly").objectStore(ah)}function iL(){const t=indexedDB.deleteDatabase(dR);return new Ql(t).toPromise()}function Wm(){const t=indexedDB.open(dR,nL);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(ah,{keyPath:mR})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(ah)?e(i):(i.close(),await iL(),e(await Wm()))})})}async function tT(t,e,n){const i=nf(t,!0).put({[mR]:e,value:n});return new Ql(i).toPromise()}async function rL(t,e){const n=nf(t,!1).get(e),i=await new Ql(n).toPromise();return i===void 0?null:i.value}function nT(t,e){const n=nf(t,!0).delete(e);return new Ql(n).toPromise()}const sL=800,aL=3;class pR{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Wm(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>aL)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fR()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=tf._getInstance(tL()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,i;if(this.activeServiceWorker=await ZP(),!this.activeServiceWorker)return;this.sender=new WP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||eL()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wm();return await tT(e,sh,"1"),await nT(e,sh),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>tT(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>rL(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>nT(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=nf(r,!1).getAll();return new Ql(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sL)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pR.type="LOCAL";const oL=pR;new Kl(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lL(t,e){return e?gi(e):(W(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty extends Jg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fa(e,this._buildIdpRequest())}_linkToIdToken(e,n){return fa(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return fa(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function uL(t){return aR(t.auth,new ty(t),t.bypassAuthState)}function cL(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),qP(n,new ty(t),t.bypassAuthState)}async function hL(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),BP(n,new ty(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,n,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:r,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:n,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uL;case"linkViaPopup":case"linkViaRedirect":return hL;case"reauthViaPopup":case"reauthViaRedirect":return cL;default:kn(this.auth,"internal-error")}}resolve(e){Vi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fL=new Kl(2e3,1e4);class ea extends gR{constructor(e,n,i,r,s){super(e,n,r,s),this.provider=i,this.authWindow=null,this.pollId=null,ea.currentPopupAction&&ea.currentPopupAction.cancel(),ea.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Vi(this.filter.length===1,"Popup operations only handle one event");const e=ey();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Xn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Xn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ea.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if((i=(n=this.authWindow)==null?void 0:n.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Xn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fL.get())};e()}}ea.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dL="pendingRedirect",uc=new Map;class mL extends gR{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=uc.get(this.auth._key());if(!e){try{const i=await pL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}uc.set(this.auth._key(),e)}return this.bypassAuthState||uc.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pL(t,e){const n=_L(e),i=yL(t);if(!await i._isAvailable())return!1;const r=await i._get(n)==="true";return await i._remove(n),r}function gL(t,e){uc.set(t._key(),e)}function yL(t){return gi(t._redirectPersistence)}function _L(t){return lc(dL,t.config.apiKey,t.name)}async function vL(t,e,n=!1){if(nn(t.app))return Promise.reject(Si(t));const i=kr(t),r=lL(i,e),a=await new mL(i,r,n).execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EL=10*60*1e3;class TL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!SL(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!yR(e)){const r=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";n.onError(Xn(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=EL&&this.cachedEventUids.clear(),this.cachedEventUids.has(iT(e))}saveEventToCache(e){this.cachedEventUids.add(iT(e)),this.lastProcessedEventTime=Date.now()}}function iT(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function yR({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function SL(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return yR(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AL(t,e={}){return xn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wL=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,bL=/^https?/;async function RL(t){if(t.config.emulator)return;const{authorizedDomains:e}=await AL(t);for(const n of e)try{if(IL(n))return}catch{}kn(t,"unauthorized-domain")}function IL(t){const e=Qm(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===i}if(!bL.test(n))return!1;if(wL.test(t))return i===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CL=new Kl(3e4,6e4);function rT(){const t=Wn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function DL(t){return new Promise((e,n)=>{var r,s,a;function i(){rT(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{rT(),n(Xn(t,"network-request-failed"))},timeout:CL.get()})}if((s=(r=Wn().gapi)==null?void 0:r.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=Wn().gapi)!=null&&a.load)i();else{const l=vP("iframefcb");return Wn()[l]=()=>{gapi.load?i():n(Xn(t,"network-request-failed"))},tR(`${_P()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw cc=null,e})}let cc=null;function NL(t){return cc=cc||DL(t),cc}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OL=new Kl(5e3,15e3),ML="__/auth/iframe",VL="emulator/auth/iframe",kL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},PL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LL(t){const e=t.config;W(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Qg(e,VL):`https://${t.config.authDomain}/${ML}`,i={apiKey:e.apiKey,appName:t.name,v:ws},r=PL.get(t.config.apiHost);r&&(i.eid=r);const s=t._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${Ul(i).slice(1)}`}async function UL(t){const e=await NL(t),n=Wn().gapi;return W(n,t,"internal-error"),e.open({where:document.body,url:LL(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kL,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});const a=Xn(t,"network-request-failed"),l=Wn().setTimeout(()=>{s(a)},OL.get());function u(){Wn().clearTimeout(l),r(i)}i.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zL=500,BL=600,qL="_blank",HL="http://localhost";class sT{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function FL(t,e,n,i=zL,r=BL){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const u={...xL,width:i.toString(),height:r.toString(),top:s,left:a},c=Mt().toLowerCase();n&&(l=$b(c)?qL:n),Kb(c)&&(e=e||HL,u.scrollbars="yes");const f=Object.entries(u).reduce((p,[y,I])=>`${p}${y}=${I},`,"");if(uP(c)&&l!=="_self")return jL(e||"",l),new sT(null);const m=window.open(e||"",l,f);W(m,t,"popup-blocked");try{m.focus()}catch{}return new sT(m)}function jL(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GL="__/auth/handler",KL="emulator/auth/handler",YL=encodeURIComponent("fac");async function aT(t,e,n,i,r,s){W(t.config.authDomain,t,"auth-domain-config-required"),W(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ws,eventId:r};if(e instanceof rR){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",dO(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof $l){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}t.tenantId&&(a.tid=t.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${YL}=${encodeURIComponent(u)}`:"";return`${$L(t)}?${Ul(l).slice(1)}${c}`}function $L({config:t}){return t.emulator?Qg(t,KL):`https://${t.authDomain}/${GL}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd="webStorageSupport";class QL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hR,this._completeRedirectFn=vL,this._overrideRedirectResult=gL}async _openPopup(e,n,i,r){var a;Vi((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await aT(e,n,i,Qm(),r);return FL(e,s,ey())}async _openRedirect(e,n,i,r){await this._originValidation(e);const s=await aT(e,n,i,Qm(),r);return JP(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:s}=this.eventManagers[n];return r?Promise.resolve(r):(Vi(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await UL(e),i=new TL(e);return n.register("authEvent",r=>(W(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Sd,{type:Sd},r=>{var a;const s=(a=r==null?void 0:r[0])==null?void 0:a[Sd];s!==void 0&&n(!!s),kn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=RL(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Zb()||Yb()||Wg()}}const XL=QL;var oT="@firebase/auth",lT="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JL(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZL(t){Mn(new bn("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=i.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eR(t)},c=new pP(i,r,s,u);return bP(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Mn(new bn("auth-internal",e=>{const n=kr(e.getProvider("auth").getImmediate());return(i=>new WL(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qt(oT,lT,JL(t)),Qt(oT,lT,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eU=5*60,tU=WA("authIdTokenMaxAge")||eU;let uT=null;const nU=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>tU)return;const r=n==null?void 0:n.token;uT!==r&&(uT=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function G4(t=kh()){const e=As(t,"auth");if(e.isInitialized())return e.getImmediate();const n=wP(t,{popupRedirectResolver:XL,persistence:[oL,QP,hR]}),i=WA("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(i,location.origin);if(location.origin===s.origin){const a=nU(s.toString());KP(n,a,()=>a(n.currentUser)),GP(n,l=>a(l))}}const r=$A("auth");return r&&RP(n,`http://${r}`),n}function iU(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}gP({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=r=>{const s=Xn("internal-error");s.customData=r,n(s)},i.type="text/javascript",i.charset="UTF-8",iU().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZL("Browser");const _R="@firebase/installations",ny="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=1e4,ER=`w:${ny}`,TR="FIS_v2",rU="https://firebaseinstallations.googleapis.com/v1",sU=60*60*1e3,aU="installations",oU="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lU={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ps=new Ss(aU,oU,lU);function SR(t){return t instanceof Un&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AR({projectId:t}){return`${rU}/projects/${t}/installations`}function wR(t){return{token:t.token,requestStatus:2,expiresIn:cU(t.expiresIn),creationTime:Date.now()}}async function bR(t,e){const i=(await e.json()).error;return ps.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function RR({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function uU(t,{refreshToken:e}){const n=RR(t);return n.append("Authorization",hU(e)),n}async function IR(t){const e=await t();return e.status>=500&&e.status<600?t():e}function cU(t){return Number(t.replace("s","000"))}function hU(t){return`${TR} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fU({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=AR(t),r=RR(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&r.append("x-firebase-client",c)}const a={fid:n,authVersion:TR,appId:t.appId,sdkVersion:ER},l={method:"POST",headers:r,body:JSON.stringify(a)},u=await IR(()=>fetch(i,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:wR(c.authToken)}}else throw await bR("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CR(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dU(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mU=/^[cdef][\w-]{21}$/,Jm="";function pU(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=gU(t);return mU.test(n)?n:Jm}catch{return Jm}}function gU(t){return dU(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DR=new Map;function NR(t,e){const n=rf(t);OR(n,e),yU(n,e)}function OR(t,e){const n=DR.get(t);if(n)for(const i of n)i(e)}function yU(t,e){const n=_U();n&&n.postMessage({key:t,fid:e}),vU()}let Qr=null;function _U(){return!Qr&&"BroadcastChannel"in self&&(Qr=new BroadcastChannel("[Firebase] FID Change"),Qr.onmessage=t=>{OR(t.data.key,t.data.fid)}),Qr}function vU(){DR.size===0&&Qr&&(Qr.close(),Qr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EU="firebase-installations-database",TU=1,gs="firebase-installations-store";let Ad=null;function iy(){return Ad||(Ad=Vh(EU,TU,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(gs)}}})),Ad}async function oh(t,e){const n=rf(t),r=(await iy()).transaction(gs,"readwrite"),s=r.objectStore(gs),a=await s.get(n);return await s.put(e,n),await r.done,(!a||a.fid!==e.fid)&&NR(t,e.fid),e}async function MR(t){const e=rf(t),i=(await iy()).transaction(gs,"readwrite");await i.objectStore(gs).delete(e),await i.done}async function sf(t,e){const n=rf(t),r=(await iy()).transaction(gs,"readwrite"),s=r.objectStore(gs),a=await s.get(n),l=e(a);return l===void 0?await s.delete(n):await s.put(l,n),await r.done,l&&(!a||a.fid!==l.fid)&&NR(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ry(t){let e;const n=await sf(t.appConfig,i=>{const r=SU(i),s=AU(t,r);return e=s.registrationPromise,s.installationEntry});return n.fid===Jm?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function SU(t){const e=t||{fid:pU(),registrationStatus:0};return VR(e)}function AU(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(ps.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=wU(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:bU(t)}:{installationEntry:e}}async function wU(t,e){try{const n=await fU(t,e);return oh(t.appConfig,n)}catch(n){throw SR(n)&&n.customData.serverCode===409?await MR(t.appConfig):await oh(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function bU(t){let e=await cT(t.appConfig);for(;e.registrationStatus===1;)await CR(100),e=await cT(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await ry(t);return i||n}return e}function cT(t){return sf(t,e=>{if(!e)throw ps.create("installation-not-found");return VR(e)})}function VR(t){return RU(t)?{fid:t.fid,registrationStatus:0}:t}function RU(t){return t.registrationStatus===1&&t.registrationTime+vR<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IU({appConfig:t,heartbeatServiceProvider:e},n){const i=CU(t,n),r=uU(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&r.append("x-firebase-client",c)}const a={installation:{sdkVersion:ER,appId:t.appId}},l={method:"POST",headers:r,body:JSON.stringify(a)},u=await IR(()=>fetch(i,l));if(u.ok){const c=await u.json();return wR(c)}else throw await bR("Generate Auth Token",u)}function CU(t,{fid:e}){return`${AR(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sy(t,e=!1){let n;const i=await sf(t.appConfig,s=>{if(!kR(s))throw ps.create("not-registered");const a=s.authToken;if(!e&&OU(a))return s;if(a.requestStatus===1)return n=DU(t,e),s;{if(!navigator.onLine)throw ps.create("app-offline");const l=VU(s);return n=NU(t,l),l}});return n?await n:i.authToken}async function DU(t,e){let n=await hT(t.appConfig);for(;n.authToken.requestStatus===1;)await CR(100),n=await hT(t.appConfig);const i=n.authToken;return i.requestStatus===0?sy(t,e):i}function hT(t){return sf(t,e=>{if(!kR(e))throw ps.create("not-registered");const n=e.authToken;return kU(n)?{...e,authToken:{requestStatus:0}}:e})}async function NU(t,e){try{const n=await IU(t,e),i={...e,authToken:n};return await oh(t.appConfig,i),n}catch(n){if(SR(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await MR(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await oh(t.appConfig,i)}throw n}}function kR(t){return t!==void 0&&t.registrationStatus===2}function OU(t){return t.requestStatus===2&&!MU(t)}function MU(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+sU}function VU(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function kU(t){return t.requestStatus===1&&t.requestTime+vR<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PU(t){const e=t,{installationEntry:n,registrationPromise:i}=await ry(e);return i?i.catch(console.error):sy(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LU(t,e=!1){const n=t;return await UU(n),(await sy(n,e)).token}async function UU(t){const{registrationPromise:e}=await ry(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xU(t){if(!t||!t.options)throw wd("App Configuration");if(!t.name)throw wd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw wd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function wd(t){return ps.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PR="installations",zU="installations-internal",BU=t=>{const e=t.getProvider("app").getImmediate(),n=xU(e),i=As(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},qU=t=>{const e=t.getProvider("app").getImmediate(),n=As(e,PR).getImmediate();return{getId:()=>PU(n),getToken:r=>LU(n,r)}};function HU(){Mn(new bn(PR,BU,"PUBLIC")),Mn(new bn(zU,qU,"PRIVATE"))}HU();Qt(_R,ny);Qt(_R,ny,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FU="/firebase-messaging-sw.js",jU="/firebase-cloud-messaging-push-scope",LR="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",GU="https://fcmregistrations.googleapis.com/v1",UR="google.c.a.c_id",KU="google.c.a.c_l",YU="google.c.a.ts",$U="google.c.a.e",fT=1e4;var dT;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(dT||(dT={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Tl;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Tl||(Tl={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function QU(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),r=new Uint8Array(i.length);for(let s=0;s<i.length;++s)r[s]=i.charCodeAt(s);return r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="fcm_token_details_db",XU=5,mT="fcm_token_object_Store";async function WU(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(bd))return null;let e=null;return(await Vh(bd,XU,{upgrade:async(i,r,s,a)=>{if(r<2||!i.objectStoreNames.contains(mT))return;const l=a.objectStore(mT),u=await l.index("fcmSenderId").get(t);if(await l.clear(),!!u){if(r===2){const c=u;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:ui(c.vapidKey)}}}else if(r===3){const c=u;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:ui(c.auth),p256dh:ui(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:ui(c.vapidKey)}}}else if(r===4){const c=u;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:ui(c.auth),p256dh:ui(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:ui(c.vapidKey)}}}}}})).close(),await fd(bd),await fd("fcm_vapid_details_db"),await fd("undefined"),JU(e)?e:null}function JU(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZU="firebase-messaging-database",ex=1,Sl="firebase-messaging-store";let Rd=null;function xR(){return Rd||(Rd=Vh(ZU,ex,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Sl)}}})),Rd}async function tx(t){const e=zR(t),i=await(await xR()).transaction(Sl).objectStore(Sl).get(e);if(i)return i;{const r=await WU(t.appConfig.senderId);if(r)return await ay(t,r),r}}async function ay(t,e){const n=zR(t),r=(await xR()).transaction(Sl,"readwrite");return await r.objectStore(Sl).put(e,n),await r.done,e}function zR({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nx={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Bt=new Ss("messaging","Messaging",nx);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ix(t,e){const n=await ly(t),i=BR(e),r={method:"POST",headers:n,body:JSON.stringify(i)};let s;try{s=await(await fetch(oy(t.appConfig),r)).json()}catch(a){throw Bt.create("token-subscribe-failed",{errorInfo:a==null?void 0:a.toString()})}if(s.error){const a=s.error.message;throw Bt.create("token-subscribe-failed",{errorInfo:a})}if(!s.token)throw Bt.create("token-subscribe-no-token");return s.token}async function rx(t,e){const n=await ly(t),i=BR(e.subscriptionOptions),r={method:"PATCH",headers:n,body:JSON.stringify(i)};let s;try{s=await(await fetch(`${oy(t.appConfig)}/${e.token}`,r)).json()}catch(a){throw Bt.create("token-update-failed",{errorInfo:a==null?void 0:a.toString()})}if(s.error){const a=s.error.message;throw Bt.create("token-update-failed",{errorInfo:a})}if(!s.token)throw Bt.create("token-update-no-token");return s.token}async function sx(t,e){const i={method:"DELETE",headers:await ly(t)};try{const s=await(await fetch(`${oy(t.appConfig)}/${e}`,i)).json();if(s.error){const a=s.error.message;throw Bt.create("token-unsubscribe-failed",{errorInfo:a})}}catch(r){throw Bt.create("token-unsubscribe-failed",{errorInfo:r==null?void 0:r.toString()})}}function oy({projectId:t}){return`${GU}/projects/${t}/registrations`}async function ly({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function BR({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const r={web:{endpoint:n,auth:e,p256dh:t}};return i!==LR&&(r.web.applicationPubKey=i),r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ax=7*24*60*60*1e3;async function ox(t){const e=await ux(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:ui(e.getKey("auth")),p256dh:ui(e.getKey("p256dh"))},i=await tx(t.firebaseDependencies);if(i){if(cx(i.subscriptionOptions,n))return Date.now()>=i.createTime+ax?lx(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await sx(t.firebaseDependencies,i.token)}catch{}return pT(t.firebaseDependencies,n)}else return pT(t.firebaseDependencies,n)}async function lx(t,e){try{const n=await rx(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await ay(t.firebaseDependencies,i),n}catch(n){throw n}}async function pT(t,e){const i={token:await ix(t,e),createTime:Date.now(),subscriptionOptions:e};return await ay(t,i),i.token}async function ux(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:QU(e)})}function cx(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,r=e.auth===t.auth,s=e.p256dh===t.p256dh;return n&&i&&r&&s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gT(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return hx(e,t),fx(e,t),dx(e,t),e}function hx(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const r=e.notification.image;r&&(t.notification.image=r);const s=e.notification.icon;s&&(t.notification.icon=s)}function fx(t,e){e.data&&(t.data=e.data)}function dx(t,e){var r,s,a,l;if(!e.fcmOptions&&!((r=e.notification)!=null&&r.click_action))return;t.fcmOptions={};const n=((s=e.fcmOptions)==null?void 0:s.link)??((a=e.notification)==null?void 0:a.click_action);n&&(t.fcmOptions.link=n);const i=(l=e.fcmOptions)==null?void 0:l.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mx(t){return typeof t=="object"&&!!t&&UR in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function px(t){if(!t||!t.options)throw Id("App Configuration Object");if(!t.name)throw Id("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw Id(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Id(t){return Bt.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gx{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=px(e);this.firebaseDependencies={app:e,appConfig:r,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yx(t){try{t.swRegistration=await navigator.serviceWorker.register(FU,{scope:jU}),t.swRegistration.update().catch(()=>{}),await _x(t.swRegistration)}catch(e){throw Bt.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function _x(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${fT} ms`)),fT),r=t.installing||t.waiting;t.active?(clearTimeout(i),e()):r?r.onstatechange=s=>{var a;((a=s.target)==null?void 0:a.state)==="activated"&&(r.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vx(t,e){if(!e&&!t.swRegistration&&await yx(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Bt.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ex(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=LR)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qR(t,e){if(!navigator)throw Bt.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Bt.create("permission-blocked");return await Ex(t,e==null?void 0:e.vapidKey),await vx(t,e==null?void 0:e.serviceWorkerRegistration),ox(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tx(t,e,n){const i=Sx(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[UR],message_name:n[KU],message_time:n[YU],message_device_time:Math.floor(Date.now()/1e3)})}function Sx(t){switch(t){case Tl.NOTIFICATION_CLICKED:return"notification_open";case Tl.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ax(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Tl.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(gT(n)):t.onMessageHandler.next(gT(n)));const i=n.data;mx(i)&&i[$U]==="1"&&await Tx(t,n.messageType,i)}const yT="@firebase/messaging",_T="0.12.25";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wx=t=>{const e=new gx(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>Ax(e,n)),e},bx=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>qR(e,i)}};function Rx(){Mn(new bn("messaging",wx,"PUBLIC")),Mn(new bn("messaging-internal",bx,"PRIVATE")),Qt(yT,_T),Qt(yT,_T,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ix(){try{await ew()}catch{return!1}return typeof window<"u"&&ZA()&&uO()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K4(t=kh()){return Ix().then(e=>{if(!e)throw Bt.create("unsupported-browser")},e=>{throw Bt.create("indexed-db-unsupported")}),As(ke(t),"messaging").getImmediate()}async function Y4(t,e){return t=ke(t),qR(t,e)}Rx();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HR="firebasestorage.googleapis.com",Cx="storageBucket",Dx=2*60*1e3,Nx=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii extends Un{constructor(e,n,i=0){super(Cd(e),`Firebase Storage: ${n} (${Cd(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ii.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Cd(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ei;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ei||(ei={}));function Cd(t){return"storage/"+t}function Ox(){const t="An unknown error occurred, please check the error payload for server response.";return new ii(ei.UNKNOWN,t)}function Mx(){return new ii(ei.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Vx(){return new ii(ei.CANCELED,"User canceled the upload/download.")}function kx(t){return new ii(ei.INVALID_URL,"Invalid URL '"+t+"'.")}function Px(t){return new ii(ei.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function vT(t){return new ii(ei.INVALID_ARGUMENT,t)}function FR(){return new ii(ei.APP_DELETED,"The Firebase app was deleted.")}function Lx(t){return new ii(ei.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=Dn.makeFromUrl(e,n)}catch{return new Dn(e,"")}if(i.path==="")return i;throw Px(e)}static makeFromUrl(e,n){let i=null;const r="([A-Za-z0-9.\\-_]+)";function s(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+r+a,"i"),u={bucket:1,path:3};function c(M){M.path_=decodeURIComponent(M.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",y=new RegExp(`^https?://${m}/${f}/b/${r}/o${p}`,"i"),I={bucket:1,path:3},N=n===HR?"(?:storage.googleapis.com|storage.cloud.google.com)":n,D="([^?#]*)",v=new RegExp(`^https?://${N}/${r}/${D}`,"i"),A=[{regex:l,indices:u,postModify:s},{regex:y,indices:I,postModify:c},{regex:v,indices:{bucket:1,path:2},postModify:c}];for(let M=0;M<A.length;M++){const B=A[M],F=B.regex.exec(e);if(F){const T=F[B.indices.bucket];let _=F[B.indices.path];_||(_=""),i=new Dn(T,_),B.postModify(i);break}}if(i==null)throw kx(e);return i}}class Ux{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xx(t,e,n){let i=1,r=null,s=null,a=!1,l=0;function u(){return l===2}let c=!1;function f(...D){c||(c=!0,e.apply(null,D))}function m(D){r=setTimeout(()=>{r=null,t(y,u())},D)}function p(){s&&clearTimeout(s)}function y(D,...v){if(c){p();return}if(D){p(),f.call(null,D,...v);return}if(u()||a){p(),f.call(null,D,...v);return}i<64&&(i*=2);let A;l===1?(l=2,A=0):A=(i+Math.random())*1e3,m(A)}let I=!1;function N(D){I||(I=!0,p(),!c&&(r!==null?(D||(l=2),clearTimeout(r),m(0)):D||(l=1)))}return m(0),s=setTimeout(()=>{a=!0,N(!0)},n),N}function zx(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bx(t){return t!==void 0}function ET(t,e,n,i){if(i<e)throw vT(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw vT(`Invalid value for '${t}'. Expected ${n} or less.`)}function qx(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const r=e(i)+"="+e(t[i]);n=n+r+"&"}return n=n.slice(0,-1),n}var lh;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(lh||(lh={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hx(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||r||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fx{constructor(e,n,i,r,s,a,l,u,c,f,m,p=!0,y=!1){this.url_=e,this.method_=n,this.headers_=i,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=m,this.retry=p,this.isUsingEmulator=y,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((I,N)=>{this.resolve_=I,this.reject_=N,this.start_()})}start_(){const e=(i,r)=>{if(r){i(!1,new Uu(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const a=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(a),this.pendingConnection_=null;const l=s.getErrorCode()===lh.NO_ERROR,u=s.getStatus();if(!l||Hx(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===lh.ABORT;i(!1,new Uu(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;i(!0,new Uu(c,s))})},n=(i,r)=>{const s=this.resolve_,a=this.reject_,l=r.connection;if(r.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());Bx(u)?s(u):s()}catch(u){a(u)}else if(l!==null){const u=Ox();u.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,u)):a(u)}else if(r.canceled){const u=this.appDelete_?FR():Vx();a(u)}else{const u=Mx();a(u)}};this.canceled_?n(!1,new Uu(!1,null,!0)):this.backoffId_=xx(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&zx(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Uu{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function jx(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function Gx(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Kx(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Yx(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function $x(t,e,n,i,r,s,a=!0,l=!1){const u=qx(t.urlParams),c=t.url+u,f=Object.assign({},t.headers);return Kx(f,e),jx(f,n),Gx(f,s),Yx(f,i),new Fx(c,t.method,f,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,a,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qx(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Xx(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,n){this._service=e,n instanceof Dn?this._location=n:this._location=Dn.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new uh(e,n)}get root(){const e=new Dn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Xx(this._location.path)}get storage(){return this._service}get parent(){const e=Qx(this._location.path);if(e===null)return null;const n=new Dn(this._location.bucket,e);return new uh(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Lx(e)}}function TT(t,e){const n=e==null?void 0:e[Cx];return n==null?null:Dn.makeFromBucketSpec(n,t)}function Wx(t,e,n,i={}){t.host=`${e}:${n}`;const r=Ha(e);r&&ag(`https://${t.host}/b`),t._isUsingEmulator=!0,t._protocol=r?"https":"http";const{mockUserToken:s}=i;s&&(t._overrideAuthToken=typeof s=="string"?s:JA(s,t.app.options.projectId))}class Jx{constructor(e,n,i,r,s,a=!1){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=a,this._bucket=null,this._host=HR,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Dx,this._maxUploadRetryTime=Nx,this._requests=new Set,r!=null?this._bucket=Dn.makeFromBucketSpec(r,this._host):this._bucket=TT(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Dn.makeFromBucketSpec(this._url,e):this._bucket=TT(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ET("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ET("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(nn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new uh(this,e)}_makeRequest(e,n,i,r,s=!0){if(this._deleted)return new Ux(FR());{const a=$x(e,this._appId,i,r,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,n){const[i,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,r).getPromise()}}const ST="@firebase/storage",AT="0.14.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR="storage";function $4(t=kh(),e){t=ke(t);const i=As(t,jR).getImmediate({identifier:e}),r=QA("storage");return r&&Zx(i,...r),i}function Zx(t,e,n,i={}){Wx(t,e,n,i)}function e4(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new Jx(n,i,r,e,ws)}function t4(){Mn(new bn(jR,e4,"PUBLIC").setMultipleInstances(!0)),Qt(ST,AT,""),Qt(ST,AT,"esm2020")}t4();class Xl{constructor(e=0,n="Network Error"){this.status=e,this.text=n}}const n4=()=>{if(!(typeof localStorage>"u"))return{get:t=>Promise.resolve(localStorage.getItem(t)),set:(t,e)=>Promise.resolve(localStorage.setItem(t,e)),remove:t=>Promise.resolve(localStorage.removeItem(t))}},Tt={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:n4()},uy=t=>t?typeof t=="string"?{publicKey:t}:t.toString()==="[object Object]"?t:{}:{},i4=(t,e="https://api.emailjs.com")=>{if(!t)return;const n=uy(t);Tt.publicKey=n.publicKey,Tt.blockHeadless=n.blockHeadless,Tt.storageProvider=n.storageProvider,Tt.blockList=n.blockList,Tt.limitRate=n.limitRate,Tt.origin=n.origin||e},GR=async(t,e,n={})=>{const i=await fetch(Tt.origin+t,{method:"POST",headers:n,body:e}),r=await i.text(),s=new Xl(i.status,r);if(i.ok)return s;throw s},KR=(t,e,n)=>{if(!t||typeof t!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!e||typeof e!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n||typeof n!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},r4=t=>{if(t&&t.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},YR=t=>t.webdriver||!t.languages||t.languages.length===0,$R=()=>new Xl(451,"Unavailable For Headless Browser"),s4=(t,e)=>{if(!Array.isArray(t))throw"The BlockList list has to be an array";if(typeof e!="string")throw"The BlockList watchVariable has to be a string"},a4=t=>{var e;return!((e=t.list)!=null&&e.length)||!t.watchVariable},o4=(t,e)=>t instanceof FormData?t.get(e):t[e],QR=(t,e)=>{if(a4(t))return!1;s4(t.list,t.watchVariable);const n=o4(e,t.watchVariable);return typeof n!="string"?!1:t.list.includes(n)},XR=()=>new Xl(403,"Forbidden"),l4=(t,e)=>{if(typeof t!="number"||t<0)throw"The LimitRate throttle has to be a positive number";if(e&&typeof e!="string")throw"The LimitRate ID has to be a non-empty string"},u4=async(t,e,n)=>{const i=Number(await n.get(t)||0);return e-Date.now()+i},WR=async(t,e,n)=>{if(!e.throttle||!n)return!1;l4(e.throttle,e.id);const i=e.id||t;return await u4(i,e.throttle,n)>0?!0:(await n.set(i,Date.now().toString()),!1)},JR=()=>new Xl(429,"Too Many Requests"),c4=async(t,e,n,i)=>{const r=uy(i),s=r.publicKey||Tt.publicKey,a=r.blockHeadless||Tt.blockHeadless,l=r.storageProvider||Tt.storageProvider,u={...Tt.blockList,...r.blockList},c={...Tt.limitRate,...r.limitRate};return a&&YR(navigator)?Promise.reject($R()):(KR(s,t,e),r4(n),n&&QR(u,n)?Promise.reject(XR()):await WR(location.pathname,c,l)?Promise.reject(JR()):GR("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:s,service_id:t,template_id:e,template_params:n}),{"Content-type":"application/json"}))},h4=t=>{if(!t||t.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},f4=t=>typeof t=="string"?document.querySelector(t):t,d4=async(t,e,n,i)=>{const r=uy(i),s=r.publicKey||Tt.publicKey,a=r.blockHeadless||Tt.blockHeadless,l=Tt.storageProvider||r.storageProvider,u={...Tt.blockList,...r.blockList},c={...Tt.limitRate,...r.limitRate};if(a&&YR(navigator))return Promise.reject($R());const f=f4(n);KR(s,t,e),h4(f);const m=new FormData(f);return QR(u,m)?Promise.reject(XR()):await WR(location.pathname,c,l)?Promise.reject(JR()):(m.append("lib_version","4.4.1"),m.append("service_id",t),m.append("template_id",e),m.append("user_id",s),GR("/api/v1.0/email/send-form",m))},Q4={init:i4,send:c4,sendForm:d4,EmailJSResponseStatus:Xl};var cy={};(function t(e,n,i,r){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),a=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=function(){if(!e.OffscreenCanvas)return!1;try{var k=new OffscreenCanvas(1,1),C=k.getContext("2d");C.fillRect(0,0,1,1);var K=k.transferToImageBitmap();C.createPattern(K,"no-repeat")}catch{return!1}return!0}();function u(){}function c(k){var C=n.exports.Promise,K=C!==void 0?C:e.Promise;return typeof K=="function"?new K(k):(k(u,u),null)}var f=function(k,C){return{transform:function(K){if(k)return K;if(C.has(K))return C.get(K);var $=new OffscreenCanvas(K.width,K.height),Q=$.getContext("2d");return Q.drawImage(K,0,0),C.set(K,$),$},clear:function(){C.clear()}}}(l,new Map),m=function(){var k=Math.floor(16.666666666666668),C,K,$={},Q=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(C=function(ee){var oe=Math.random();return $[oe]=requestAnimationFrame(function X(le){Q===le||Q+k-1<le?(Q=le,delete $[oe],ee()):$[oe]=requestAnimationFrame(X)}),oe},K=function(ee){$[ee]&&cancelAnimationFrame($[ee])}):(C=function(ee){return setTimeout(ee,k)},K=function(ee){return clearTimeout(ee)}),{frame:C,cancel:K}}(),p=function(){var k,C,K={};function $(Q){function ee(oe,X){Q.postMessage({options:oe||{},callback:X})}Q.init=function(X){var le=X.transferControlToOffscreen();Q.postMessage({canvas:le},[le])},Q.fire=function(X,le,Se){if(C)return ee(X,null),C;var Fe=Math.random().toString(36).slice(2);return C=c(function(Ce){function Pe(Ze){Ze.data.callback===Fe&&(delete K[Fe],Q.removeEventListener("message",Pe),C=null,f.clear(),Se(),Ce())}Q.addEventListener("message",Pe),ee(X,Fe),K[Fe]=Pe.bind(null,{data:{callback:Fe}})}),C},Q.reset=function(){Q.postMessage({reset:!0});for(var X in K)K[X](),delete K[X]}}return function(){if(k)return k;if(!i&&s){var Q=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{k=new Worker(URL.createObjectURL(new Blob([Q])))}catch{return typeof console<"u",null}$(k)}return k}}(),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function I(k,C){return C?C(k):k}function N(k){return k!=null}function D(k,C,K){return I(k&&N(k[C])?k[C]:y[C],K)}function v(k){return k<0?0:Math.floor(k)}function E(k,C){return Math.floor(Math.random()*(C-k))+k}function A(k){return parseInt(k,16)}function M(k){return k.map(B)}function B(k){var C=String(k).replace(/[^0-9a-f]/gi,"");return C.length<6&&(C=C[0]+C[0]+C[1]+C[1]+C[2]+C[2]),{r:A(C.substring(0,2)),g:A(C.substring(2,4)),b:A(C.substring(4,6))}}function F(k){var C=D(k,"origin",Object);return C.x=D(C,"x",Number),C.y=D(C,"y",Number),C}function T(k){k.width=document.documentElement.clientWidth,k.height=document.documentElement.clientHeight}function _(k){var C=k.getBoundingClientRect();k.width=C.width,k.height=C.height}function S(k){var C=document.createElement("canvas");return C.style.position="fixed",C.style.top="0px",C.style.left="0px",C.style.pointerEvents="none",C.style.zIndex=k,C}function b(k,C,K,$,Q,ee,oe,X,le){k.save(),k.translate(C,K),k.rotate(ee),k.scale($,Q),k.arc(0,0,1,oe,X,le),k.restore()}function R(k){var C=k.angle*(Math.PI/180),K=k.spread*(Math.PI/180);return{x:k.x,y:k.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:k.startVelocity*.5+Math.random()*k.startVelocity,angle2D:-C+(.5*K-Math.random()*K),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:k.color,shape:k.shape,tick:0,totalTicks:k.ticks,decay:k.decay,drift:k.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:k.gravity*3,ovalScalar:.6,scalar:k.scalar,flat:k.flat}}function O(k,C){C.x+=Math.cos(C.angle2D)*C.velocity+C.drift,C.y+=Math.sin(C.angle2D)*C.velocity+C.gravity,C.velocity*=C.decay,C.flat?(C.wobble=0,C.wobbleX=C.x+10*C.scalar,C.wobbleY=C.y+10*C.scalar,C.tiltSin=0,C.tiltCos=0,C.random=1):(C.wobble+=C.wobbleSpeed,C.wobbleX=C.x+10*C.scalar*Math.cos(C.wobble),C.wobbleY=C.y+10*C.scalar*Math.sin(C.wobble),C.tiltAngle+=.1,C.tiltSin=Math.sin(C.tiltAngle),C.tiltCos=Math.cos(C.tiltAngle),C.random=Math.random()+2);var K=C.tick++/C.totalTicks,$=C.x+C.random*C.tiltCos,Q=C.y+C.random*C.tiltSin,ee=C.wobbleX+C.random*C.tiltCos,oe=C.wobbleY+C.random*C.tiltSin;if(k.fillStyle="rgba("+C.color.r+", "+C.color.g+", "+C.color.b+", "+(1-K)+")",k.beginPath(),a&&C.shape.type==="path"&&typeof C.shape.path=="string"&&Array.isArray(C.shape.matrix))k.fill(ae(C.shape.path,C.shape.matrix,C.x,C.y,Math.abs(ee-$)*.1,Math.abs(oe-Q)*.1,Math.PI/10*C.wobble));else if(C.shape.type==="bitmap"){var X=Math.PI/10*C.wobble,le=Math.abs(ee-$)*.1,Se=Math.abs(oe-Q)*.1,Fe=C.shape.bitmap.width*C.scalar,Ce=C.shape.bitmap.height*C.scalar,Pe=new DOMMatrix([Math.cos(X)*le,Math.sin(X)*le,-Math.sin(X)*Se,Math.cos(X)*Se,C.x,C.y]);Pe.multiplySelf(new DOMMatrix(C.shape.matrix));var Ze=k.createPattern(f.transform(C.shape.bitmap),"no-repeat");Ze.setTransform(Pe),k.globalAlpha=1-K,k.fillStyle=Ze,k.fillRect(C.x-Fe/2,C.y-Ce/2,Fe,Ce),k.globalAlpha=1}else if(C.shape==="circle")k.ellipse?k.ellipse(C.x,C.y,Math.abs(ee-$)*C.ovalScalar,Math.abs(oe-Q)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI):b(k,C.x,C.y,Math.abs(ee-$)*C.ovalScalar,Math.abs(oe-Q)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI);else if(C.shape==="star")for(var fe=Math.PI/2*3,Ct=4*C.scalar,Vt=8*C.scalar,kt=C.x,dn=C.y,je=5,Oe=Math.PI/je;je--;)kt=C.x+Math.cos(fe)*Vt,dn=C.y+Math.sin(fe)*Vt,k.lineTo(kt,dn),fe+=Oe,kt=C.x+Math.cos(fe)*Ct,dn=C.y+Math.sin(fe)*Ct,k.lineTo(kt,dn),fe+=Oe;else k.moveTo(Math.floor(C.x),Math.floor(C.y)),k.lineTo(Math.floor(C.wobbleX),Math.floor(Q)),k.lineTo(Math.floor(ee),Math.floor(oe)),k.lineTo(Math.floor($),Math.floor(C.wobbleY));return k.closePath(),k.fill(),C.tick<C.totalTicks}function w(k,C,K,$,Q){var ee=C.slice(),oe=k.getContext("2d"),X,le,Se=c(function(Fe){function Ce(){X=le=null,oe.clearRect(0,0,$.width,$.height),f.clear(),Q(),Fe()}function Pe(){i&&!($.width===r.width&&$.height===r.height)&&($.width=k.width=r.width,$.height=k.height=r.height),!$.width&&!$.height&&(K(k),$.width=k.width,$.height=k.height),oe.clearRect(0,0,$.width,$.height),ee=ee.filter(function(Ze){return O(oe,Ze)}),ee.length?X=m.frame(Pe):Ce()}X=m.frame(Pe),le=Ce});return{addFettis:function(Fe){return ee=ee.concat(Fe),Se},canvas:k,promise:Se,reset:function(){X&&m.cancel(X),le&&le()}}}function $e(k,C){var K=!k,$=!!D(C||{},"resize"),Q=!1,ee=D(C,"disableForReducedMotion",Boolean),oe=s&&!!D(C||{},"useWorker"),X=oe?p():null,le=K?T:_,Se=k&&X?!!k.__confetti_initialized:!1,Fe=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ce;function Pe(fe,Ct,Vt){for(var kt=D(fe,"particleCount",v),dn=D(fe,"angle",Number),je=D(fe,"spread",Number),Oe=D(fe,"startVelocity",Number),Cs=D(fe,"decay",Number),af=D(fe,"gravity",Number),Wl=D(fe,"drift",Number),Jl=D(fe,"colors",M),Pr=D(fe,"ticks",Number),Xa=D(fe,"shapes"),Zl=D(fe,"scalar"),Wa=!!D(fe,"flat"),eu=F(fe),tu=kt,Ds=[],nu=k.width*eu.x,Lr=k.height*eu.y;tu--;)Ds.push(R({x:nu,y:Lr,angle:dn,spread:je,startVelocity:Oe,color:Jl[tu%Jl.length],shape:Xa[E(0,Xa.length)],ticks:Pr,decay:Cs,gravity:af,drift:Wl,scalar:Zl,flat:Wa}));return Ce?Ce.addFettis(Ds):(Ce=w(k,Ds,le,Ct,Vt),Ce.promise)}function Ze(fe){var Ct=ee||D(fe,"disableForReducedMotion",Boolean),Vt=D(fe,"zIndex",Number);if(Ct&&Fe)return c(function(Oe){Oe()});K&&Ce?k=Ce.canvas:K&&!k&&(k=S(Vt),document.body.appendChild(k)),$&&!Se&&le(k);var kt={width:k.width,height:k.height};X&&!Se&&X.init(k),Se=!0,X&&(k.__confetti_initialized=!0);function dn(){if(X){var Oe={getBoundingClientRect:function(){if(!K)return k.getBoundingClientRect()}};le(Oe),X.postMessage({resize:{width:Oe.width,height:Oe.height}});return}kt.width=kt.height=null}function je(){Ce=null,$&&(Q=!1,e.removeEventListener("resize",dn)),K&&k&&(document.body.contains(k)&&document.body.removeChild(k),k=null,Se=!1)}return $&&!Q&&(Q=!0,e.addEventListener("resize",dn,!1)),X?X.fire(fe,kt,je):Pe(fe,kt,je)}return Ze.reset=function(){X&&X.reset(),Ce&&Ce.reset()},Ze}var He;function j(){return He||(He=$e(null,{useWorker:!0,resize:!0})),He}function ae(k,C,K,$,Q,ee,oe){var X=new Path2D(k),le=new Path2D;le.addPath(X,new DOMMatrix(C));var Se=new Path2D;return Se.addPath(le,new DOMMatrix([Math.cos(oe)*Q,Math.sin(oe)*Q,-Math.sin(oe)*ee,Math.cos(oe)*ee,K,$])),Se}function te(k){if(!a)throw new Error("path confetti are not supported in this browser");var C,K;typeof k=="string"?C=k:(C=k.path,K=k.matrix);var $=new Path2D(C),Q=document.createElement("canvas"),ee=Q.getContext("2d");if(!K){for(var oe=1e3,X=oe,le=oe,Se=0,Fe=0,Ce,Pe,Ze=0;Ze<oe;Ze+=2)for(var fe=0;fe<oe;fe+=2)ee.isPointInPath($,Ze,fe,"nonzero")&&(X=Math.min(X,Ze),le=Math.min(le,fe),Se=Math.max(Se,Ze),Fe=Math.max(Fe,fe));Ce=Se-X,Pe=Fe-le;var Ct=10,Vt=Math.min(Ct/Ce,Ct/Pe);K=[Vt,0,0,Vt,-Math.round(Ce/2+X)*Vt,-Math.round(Pe/2+le)*Vt]}return{type:"path",path:C,matrix:K}}function be(k){var C,K=1,$="#000000",Q='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof k=="string"?C=k:(C=k.text,K="scalar"in k?k.scalar:K,Q="fontFamily"in k?k.fontFamily:Q,$="color"in k?k.color:$);var ee=10*K,oe=""+ee+"px "+Q,X=new OffscreenCanvas(ee,ee),le=X.getContext("2d");le.font=oe;var Se=le.measureText(C),Fe=Math.ceil(Se.actualBoundingBoxRight+Se.actualBoundingBoxLeft),Ce=Math.ceil(Se.actualBoundingBoxAscent+Se.actualBoundingBoxDescent),Pe=2,Ze=Se.actualBoundingBoxLeft+Pe,fe=Se.actualBoundingBoxAscent+Pe;Fe+=Pe+Pe,Ce+=Pe+Pe,X=new OffscreenCanvas(Fe,Ce),le=X.getContext("2d"),le.font=oe,le.fillStyle=$,le.fillText(C,Ze,fe);var Ct=1/K;return{type:"bitmap",bitmap:X.transferToImageBitmap(),matrix:[Ct,0,0,Ct,-Fe*Ct/2,-Ce*Ct/2]}}n.exports=function(){return j().apply(this,arguments)},n.exports.reset=function(){j().reset()},n.exports.create=$e,n.exports.shapeFromPath=te,n.exports.shapeFromText=be})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),cy,!1);const X4=cy.exports;cy.exports.create;export{H4 as A,Y4 as B,Pi as C,LA as D,dN as E,p4 as F,g4 as G,E4 as H,Q4 as I,z4 as J,B4 as K,FA as L,x4 as M,_4 as N,X4 as O,y4 as P,v4 as R,A4 as a,K4 as b,$4 as c,N4 as d,Nk as e,L4 as f,G4 as g,S4 as h,m2 as i,m4 as j,M4 as k,D4 as l,O4 as m,P4 as n,F4 as o,w4 as p,I4 as q,L as r,j4 as s,k4 as t,V4 as u,R4 as v,b4 as w,U4 as x,C4 as y,q4 as z};
