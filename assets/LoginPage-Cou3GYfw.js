import{d as _,i as w,r as P,c as p,o as y,f as I,e as i,n as a,g as r,b as c,h as $,u as L,m as C,p as E,q as x,_ as V}from"./index-CrAxCzrP.js";import{u as j,P as f,a as k}from"./PotInputBase-BuHi_cn9.js";import{u as B,P as U,a as b}from"./PotIcon-CX_t0_LZ.js";const F=_({__name:"LoginPage",setup(H){const u=k(),g=w(),t=P(!0),o=j({login:[u.REQUIRED()],password:[u.REQUIRED()]}),l=p(()=>o.values.value),m=p(()=>B({"password-hidden":t.value}));function d(e,s){o.changeField(e,String(s)),o.validateField(e)}function v(){if(!o.validate())return;const e=C.find(s=>s.login===l.value.login&&s.password===l.value.password);if(!e){alert("Неверный логин или пароль");return}g.setUser(e),E.push({name:x.HOME}),console.log("test")}return(e,s)=>(y(),I("main",{class:a([e.$style.LoginPage,m.value])},[i("div",{class:a(e.$style.form)},[i("h1",{class:a(e.$style.title)},"Авторизация",2),i("div",{class:a(e.$style.fields)},[r(f,{value:l.value.login,spellcheck:"false",placeholder:"Логин",onInput:s[0]||(s[0]=n=>d("login",n))},null,8,["value"]),r(f,{value:l.value.password,type:t.value?"password":"text",placeholder:"Пароль",onInput:s[2]||(s[2]=n=>d("password",n))},{append:c(()=>[r(U,{class:a(e.$style.passwordIcon),icon:"eye",size:"32",onClick:s[1]||(s[1]=n=>t.value=!t.value)},null,8,["class"])]),_:1},8,["value","type"])],2),r(b,{disabled:!L(o).isValid.value,onClick:v},{default:c(()=>s[3]||(s[3]=[$(" Вход ")])),_:1},8,["disabled"])],2)],2))}}),R="_LoginPage_1j8xr_348",S="_passwordIcon_1j8xr_357",h="_title_1j8xr_361",M="_form_1j8xr_370",N="_fields_1j8xr_381",z={LoginPage:R,passwordIcon:S,title:h,form:M,fields:N},D={$style:z},O=V(F,[["__cssModules",D]]);export{O as default};
