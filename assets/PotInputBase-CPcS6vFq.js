const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PotIcon-BaTU6f8o.js","assets/index-C1LIssbb.js","assets/PotIcon-BYj4q91i.css"])))=>i.map(i=>d[i]);
import{h,b as $,E as z,c as M,u as T,d as k}from"./PotIcon-BaTU6f8o.js";import{r as b,c as p,v as D,d as L,A as S,E as F,o as E,f as N,x as I,a as A,n as y,u as R,k as C,e as O,y as U,z as q,B as G,C as j,_ as w}from"./index-C1LIssbb.js";const V={required:"Это обязательное поле",dateRange:"Дата начала должна быть позже даты окончания",incorrect:"Неверный формат"};function ee(){return{REQUIRED:(r=V.required)=>o=>o?null:r,DATE_VALID:(r=V.incorrect)=>o=>(h.isMoment(o)||typeof o=="string")&&h(o).isValid()?null:r,DATE_RANGE:(r=V.dateRange,o)=>(a,e)=>{if(!o)throw new Error("[useValidators/DATE_RANGE]: from, to fields names missing");const u=e==null?void 0:e[o==null?void 0:o[0]],s=e==null?void 0:e[o==null?void 0:o[1]];return!u||!s||!(u instanceof Date)||!(s instanceof Date)||u.getTime()<s.getTime()?null:r}}}function te(r={},o={}){const a=b({}),e=b({});a.value={...o};const u=p(()=>!Object.values(e.value).some(Boolean));function s(n){const c=r[n];if(!Array.isArray(c))return null;let i=null;const v=a.value[n];for(const g of c)if(i=g(v,a.value),i)break;return e.value={...e.value,[n]:i},i}function l(){let n=!0;for(const c in r){const i=s(c);n=n&&!i}return n}function m(n,c){return a.value={...a.value,[n]:c},s(n)}function d(n){return a.value={...a.value,...n},l()}function _(n){return a.value={...n},l()}return l(),{values:D(a),errors:D(e),isValid:u,change:_,update:d,validate:l,validateField:s,changeField:m}}const Q=["value","disabled"],Y=L({__name:"PotInputBase",props:{value:{},modelValue:{},formatter:{},parser:{},devices:{default:()=>S},radius:{default:$.ROUNDED_B},size:{default:z.MEDIUM},color:{default:F.PRIMARY},icon:{},preicon:{},disabled:{type:Boolean,default:!1}},emits:["input","change","update:modelValue"],setup(r,{emit:o}){const a=G(()=>j(()=>import("./PotIcon-BaTU6f8o.js").then(t=>t.e),__vite__mapDeps([0,1,2]))),e=r,u=o,s=b(!1),l=p(()=>typeof e.value=="string"?e.value:e.modelValue),m=p(()=>typeof e.formatter=="function"?e.formatter(l.value):typeof l.value=="string"||typeof l.value=="number"?String(l.value):""),d=p(()=>M({size:e.size,color:e.color,radius:e.radius},e.devices)),_=p(()=>T({...d.value.value,color:!!e.color,focused:s.value,disabled:e.disabled})),n=p(()=>k(d.value.value.color??void 0));function c(t){t.stopPropagation();const f=t.target,P=B(f.value);u("update:modelValue",P),u("input",P)}function i(t){t.stopPropagation();const f=t.target;u("change",B(f.value))}function v(){s.value=!0}function g(){s.value=!1}function B(t){return typeof e.parser=="function"?e.parser(t):t}return(t,f)=>(E(),N("label",{class:y([t.$style.PotInputBase,"pot-input-base",_.value]),style:q(n.value)},[I(t.$slots,"prepend"),t.preicon?(E(),A(R(a),{key:0,class:y([t.$style.icon,"pot-input-base__icon","pot-input-base__icon_left"]),icon:t.preicon},null,8,["class","icon"])):C("",!0),O("input",U({value:m.value,class:[t.$style.input,"pot-input-base__target"],disabled:t.disabled},t.$attrs,{onInput:c,onChange:i,onFocus:v,onBlur:g}),null,16,Q),t.icon?(E(),A(R(a),{key:1,class:y([t.$style.icon,"pot-input-base__icon","pot-input-base__icon_right"]),icon:t.icon},null,8,["class","icon"])):C("",!0),I(t.$slots,"append")],6))}}),H="_PotInputBase_10xz0_348",J="_input_10xz0_364",K="_icon_10xz0_370",W={PotInputBase:H,input:J,icon:K},X={$style:W},oe=w(Y,[["__cssModules",X]]);export{oe as P,ee as a,te as u};
