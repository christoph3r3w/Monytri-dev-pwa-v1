import{S as A,F as H,G as V,I as m,J as $,z as y,K as N,U as c,v as P,L as C,M as J,N as Q,O as W,d as X,h as x,P as k,Q as p,R as ee,T as ae,j as re,i as Y,V as q,W as M,X as U,k as te,Y as ne,Z as fe,_ as ie,a0 as se,C as j,a1 as ue,a2 as le,a3 as G,a4 as _e,B as ve,a5 as de,a6 as ce,a7 as oe,x as K,a8 as be,E as ge,a9 as he}from"./CIcFpKZC.js";import{c as ye}from"./XY3jfjSl.js";function S(f,u=null,g){if(typeof f!="object"||f===null||A in f)return f;const v=Q(f);if(v!==H&&v!==V)return f;var n=new Map,_=W(f),o=m(0);_&&n.set("length",m(f.length));var h;return new Proxy(f,{defineProperty(i,e,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&$();var t=n.get(e);return t===void 0?(t=m(a.value),n.set(e,t)):y(t,S(a.value,h)),!0},deleteProperty(i,e){var a=n.get(e);if(a===void 0)e in i&&n.set(e,m(c));else{if(_&&typeof e=="string"){var t=n.get("length"),r=Number(e);Number.isInteger(r)&&r<t.v&&y(t,r)}y(a,c),Z(o)}return!0},get(i,e,a){var d;if(e===A)return f;var t=n.get(e),r=e in i;if(t===void 0&&(!r||(d=N(i,e))!=null&&d.writable)&&(t=m(S(r?i[e]:c,h)),n.set(e,t)),t!==void 0){var s=P(t);return s===c?void 0:s}return Reflect.get(i,e,a)},getOwnPropertyDescriptor(i,e){var a=Reflect.getOwnPropertyDescriptor(i,e);if(a&&"value"in a){var t=n.get(e);t&&(a.value=P(t))}else if(a===void 0){var r=n.get(e),s=r==null?void 0:r.v;if(r!==void 0&&s!==c)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return a},has(i,e){var s;if(e===A)return!0;var a=n.get(e),t=a!==void 0&&a.v!==c||Reflect.has(i,e);if(a!==void 0||C!==null&&(!t||(s=N(i,e))!=null&&s.writable)){a===void 0&&(a=m(t?S(i[e],h):c),n.set(e,a));var r=P(a);if(r===c)return!1}return t},set(i,e,a,t){var E;var r=n.get(e),s=e in i;if(_&&e==="length")for(var d=a;d<r.v;d+=1){var R=n.get(d+"");R!==void 0?y(R,c):d in i&&(R=m(c),n.set(d+"",R))}r===void 0?(!s||(E=N(i,e))!=null&&E.writable)&&(r=m(void 0),y(r,S(a,h)),n.set(e,r)):(s=r.v!==c,y(r,S(a,h)));var b=Reflect.getOwnPropertyDescriptor(i,e);if(b!=null&&b.set&&b.set.call(t,a),!s){if(_&&typeof e=="string"){var w=n.get("length"),O=Number(e);Number.isInteger(O)&&O>=w.v&&y(w,O+1)}Z(o)}return!0},ownKeys(i){P(o);var e=Reflect.ownKeys(i).filter(r=>{var s=n.get(r);return s===void 0||s.v!==c});for(var[a,t]of n)t.v!==c&&!(a in i)&&e.push(a);return e},setPrototypeOf(){J()}})}function Z(f,u=1){y(f,f.v+u)}function Re(f,u,g=!1){x&&k();var v=f,n=null,_=null,o=c,h=g?p:0,i=!1;const e=(t,r=!0)=>{i=!0,a(r,t)},a=(t,r)=>{if(o===(o=t))return;let s=!1;if(x){const d=v.data===ee;!!o===d&&(v=ae(),re(v),Y(!1),s=!0)}o?(n?q(n):r&&(n=M(()=>r(v))),_&&U(_,()=>{_=null})):(_?q(_):r&&(_=M(()=>r(v))),n&&U(n,()=>{n=null})),s&&Y(!0)};X(()=>{i=!1,u(e),i||a(null,null)},h),x&&(v=te)}function z(f){for(var u=C,g=C;u!==null&&!(u.f&(ue|le));)u=u.parent;try{return G(u),f()}finally{G(g)}}function Ee(f,u,g,v){var B;var n=(g&_e)!==0,_=!ve||(g&de)!==0,o=(g&ce)!==0,h=(g&he)!==0,i=!1,e;o?[e,i]=ye(()=>f[u]):e=f[u];var a=A in f||oe in f,t=((B=N(f,u))==null?void 0:B.set)??(a&&o&&u in f?l=>f[u]=l:void 0),r=v,s=!0,d=!1,R=()=>(d=!0,s&&(s=!1,h?r=j(v):r=v),r);e===void 0&&v!==void 0&&(t&&_&&ne(),e=R(),t&&t(e));var b;if(_)b=()=>{var l=f[u];return l===void 0?R():(s=!0,d=!1,l)};else{var w=z(()=>(n?K:be)(()=>f[u]));w.f|=fe,b=()=>{var l=P(w);return l!==void 0&&(r=void 0),l===void 0?r:l}}if(!(g&ie))return b;if(t){var O=f.$$legacy;return function(l,I){return arguments.length>0?((!_||!I||O||i)&&t(I?b():l),l):b()}}var E=!1,F=!1,D=ge(e),T=z(()=>K(()=>{var l=b(),I=P(D);return E?(E=!1,F=!0,I):(F=!1,D.v=l)}));return n||(T.equals=se),function(l,I){if(arguments.length>0){const L=I?P(T):_&&o?S(l):l;return T.equals(L)||(E=!0,y(D,L),d&&r!==void 0&&(r=L),j(()=>P(T))),l}return P(T)}}export{Ee as a,Re as i,S as p};
