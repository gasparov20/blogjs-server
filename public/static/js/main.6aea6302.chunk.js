(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{162:function(e,t,n){},167:function(e,t,n){},287:function(e,t,n){},289:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(30),s=n.n(c),o=(n(162),n(8)),i=(n(163),n(164),n(165),n(166),n(167),n(15)),l=n(37),u=n(17),j=n.n(u),d=n(20),p=n(344),b=n(354),m=n(1),h=function(e){return Object(m.jsx)("div",{children:Object(m.jsx)(b.a,{elevation:2,children:Object(m.jsx)("p",{style:{fontSize:"1.25rem",padding:"2rem"},children:e.text})})})},x=n(133),O=n(339),f=n(355),g=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(),s=Object(o.a)(c,2),i=s[0],l=s[1],u=Object(a.useRef)([]),p=Object(a.useCallback)(function(){var e=Object(d.a)(j.a.mark((function e(t){var n,a,c,s,o,i,d=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:"GET",a=d.length>2&&void 0!==d[2]?d[2]:null,c=d.length>3&&void 0!==d[3]?d[3]:{},r(!0),s=new AbortController,u.current.push(s),e.prev=6,e.next=9,fetch(t,{method:n,body:a,headers:c,signal:s.signal});case 9:return o=e.sent,e.next=12,o.json();case 12:if(i=e.sent,o.ok){e.next=16;break}throw console.log(o),new Error(i.message);case 16:return r(!1),e.abrupt("return",i);case 20:throw e.prev=20,e.t0=e.catch(6),l(e.t0.message),e.t0;case 24:r(!1);case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(a.useEffect)((function(){return function(){u.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:n,error:i,sendRequest:p,clearError:function(){l(null)}}},v=Object(a.createContext)({userName:null,fullName:null,userId:null,userType:null,isLoggedIn:!1,token:null,login:function(){},logout:function(){}}),y=(n(89),n(132)),w=n.n(y),C=function(e){var t=Object(a.useContext)(v),n=g(),r=(n.isLoading,n.error,n.sendRequest),c=(n.clearError,function(){var t=Object(d.a)(j.a.mark((function t(){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("".concat("http://localhost:5000/api/","api/posts/").concat(e.postID,"/comments/").concat(e.id),"DELETE");case 2:n=t.sent,e.refreshComments(n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}());return Object(m.jsxs)("div",{style:{justifyItems:"center"},children:[Object(m.jsxs)("p",{style:{display:"inline-block"},children:[Object(m.jsxs)("strong",{children:[e.creator,": "]}),e.comment]}),Object(m.jsx)("p",{style:{display:"inline-block",float:"right"},children:e.createdAt}),("admin"===t.userType||t.fullName===e.creator)&&Object(m.jsx)(w.a,{onClick:c,style:{display:"inline-block",float:"right"}})]},e.id)},S=function(e){return Object(m.jsx)("div",{children:e.comments.map((function(t){return Object(m.jsx)(C,{refreshComments:e.refreshComments,postID:e.postID,id:t.id,comment:t.comment,creator:t.creator,creatorID:t.creatorID},t.id)}))})},k=function(e){var t=g(),n=(t.isLoading,t.error,t.sendRequest),r=(t.clearError,Object(a.useState)([])),c=Object(o.a)(r,2),s=c[0],i=c[1],l=Object(a.useState)(""),u=Object(o.a)(l,2),p=u[0],h=u[1],x=Object(a.useState)(!1),y=Object(o.a)(x,2),w=y[0],C=y[1],k=Object(a.useContext)(v);Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("http://localhost:5000/api/","/posts/all"));case 2:return t=e.sent,e.next=5,t.text();case 5:n=e.sent,console.log("responseData: "),console.log(n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[s.length,e.id]);var T=function(){var e=Object(d.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var t=Object(d.a)(j.a.mark((function t(a){var r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("key pressed"),13!==a.keyCode){t.next=9;break}return console.log("enter pressed"),console.log("".concat("http://localhost:5000/api/","api/posts/").concat(e.id,"/comments/add")),t.next=6,n("".concat("http://localhost:5000/api/","api/posts/").concat(e.id,"/comments/add"),"POST",JSON.stringify({comment:p,creator:k.fullName,creatorID:k.userId}),{"Content-Type":"application/json"});case 6:r=t.sent,h(""),i(r);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(m.jsx)("div",{style:{marginBottom:"2rem"},children:Object(m.jsxs)(b.a,{style:{padding:"2rem",paddingBottom:"1rem"},elevation:2,children:[Object(m.jsxs)("div",{style:{paddingBottom:"1rem"},children:[Object(m.jsx)("div",{style:{display:"inline-block",fontSize:"1.5rem",fontWeight:"bold"},children:e.title}),Object(m.jsx)("div",{style:{fontStyle:"italic",display:"inline-block",fontSize:"0.75rem",marginLeft:"3rem"},children:e.author}),Object(m.jsx)("div",{style:{display:"inline-block",fontSize:"1.5rem",float:"right"},children:e.date})]}),Object(m.jsx)("div",{style:{paddingBottom:"1rem"},children:e.postBody}),Object(m.jsx)(f.a,{}),Object(m.jsx)("div",{style:{display:"inline-block",marginTop:"0.5rem"},children:Object(m.jsxs)("p",{onMouseEnter:function(){document.getElementById("root").style.cursor="pointer"},onMouseLeave:function(){document.getElementById("root").style.cursor=null},onClick:function(){C(!w)},children:["Comments (",s.length,")"]})}),Object(m.jsx)("div",{style:{display:"inline-block",marginTop:"0.5rem",float:"right"},children:"2 min read"}),w&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(S,{refreshComments:T,postID:e.id,comments:s}),k.isLoggedIn&&Object(m.jsx)(O.a,{onKeyDown:I,value:p,onChange:function(e){h(e.target.value)},fullWidth:!0,placeholder:"Type your comment and hit enter",style:{display:"inline-flex"}})]})]})})},T=function(e){return Object(m.jsx)("div",{style:{marginTop:"3rem"},children:e.posts.map((function(e){return Object(m.jsx)(k,{id:e.id,title:e.title,postBody:Object(m.jsx)(x.a,{content:e.postBody}),date:e.createdAt,author:e.creator},e.id)}))})},I=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useContext)(v),s=Object(i.f)();function l(){return(l=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s("/create");case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(){return(u=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("".concat("http://localhost:5000/api/","/posts/")),e.next=3,fetch("".concat("http://localhost:5000/api/","/posts/"),{method:"DELETE",headers:{"Content-Type":"application/json"}});case 3:e.sent,r([]);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(a.useEffect)(Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=function(){var e=Object(d.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("http://localhost:5000/api/","/posts/all"));case 3:return t=e.sent,e.next=6,t.text();case 6:n=e.sent,console.log("responseData: "),console.log(n),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),t();case 2:case"end":return e.stop()}}),e)}))),[n.length]);return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{children:[c.isLoggedIn&&Object(m.jsx)(p.a,{onClick:function(){return l.apply(this,arguments)},children:"Create Post"}),Object(m.jsx)(h,{text:"Vitae tortor condimentum lacinia quis vel eros donec ac. Duis at consectetur lorem donec massa. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Elit ut aliquam purus sit. Quisque egestas diam in arcu cursus euismod."}),Object(m.jsx)(T,{posts:n}),c.isLoggedIn&&"admin"===c.userType&&Object(m.jsx)(p.a,{onClick:function(){return u.apply(this,arguments)},children:"Delete All Posts"})]})})},E=n(347),D=n(348),N=n(349),L=n(136),q=n(343),F=Object(L.a)({palette:{primary:{main:"#ffffff"}}}),B=Object(L.a)({palette:{primary:{main:"#ffffff"}}}),P=function(){var e=Object(a.useContext)(v);return Object(m.jsx)(E.a,{position:"absolute",display:"flex",children:Object(m.jsxs)(D.a,{children:[Object(m.jsx)("div",{style:{display:"contents",float:"left"},children:Object(m.jsx)(q.a,{theme:F,children:Object(m.jsx)(N.a,{color:"primary",component:l.b,to:"/",style:{textDecoration:"none",flex:1,padding:"1rem",paddingLeft:"0"},variant:"h3",children:"blog.js"})})}),Object(m.jsxs)("div",{style:{display:"flex",float:"right"},children:[!e.isLoggedIn&&Object(m.jsxs)(r.a.Fragment,{children:[Object(m.jsx)(q.a,{theme:F,children:Object(m.jsx)(l.b,{to:"/login",children:Object(m.jsx)(p.a,{style:{float:"right"},color:"primary",children:"Login"})})}),Object(m.jsx)(q.a,{theme:B,children:Object(m.jsx)(l.b,{to:"/register",children:Object(m.jsx)(p.a,{style:{float:"right"},color:"primary",children:"Register"})})})]}),e.isLoggedIn&&Object(m.jsxs)(r.a.Fragment,{children:[Object(m.jsxs)("div",{style:{display:"inline-block",paddingRight:"5rem",justifyContent:"center"},children:["Hello, ",e.firstName]}),Object(m.jsx)(q.a,{theme:F,children:Object(m.jsx)(l.b,{to:"/logout",children:Object(m.jsx)(p.a,{style:{float:"right"},color:"primary",children:"Logout"})})})]})]})]})})},W=n(54),R=n(345),A=n(338),J=n(352),z=n(341),G=n(353),M=n(346),U=n(351),V=n(84),Y=n.n(V),H=n(350);function K(e){return Object(m.jsxs)(N.a,Object(W.a)(Object(W.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ","Andrew Gasparovich"," ",(new Date).getFullYear(),"."]}))}var Q=Object(L.a)(),X=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),l=s[0],u=s[1],b=Object(a.useContext)(v),h=g(),x=(h.isLoading,h.error,h.sendRequest),f=(h.clearError,Object(i.f)()),y=function(){var e=Object(d.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,x("".concat("http://localhost:5000/api/","/users/login"),"POST",JSON.stringify({email:n,password:l}),{"Content-Type":"application/json"});case 4:a=e.sent,b.login(a.userId,a.token,a.userName,a.userType,a.fullName),f("/"),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)(q.a,{theme:Q,children:Object(m.jsxs)(H.a,{className:"mainBody",component:"main",maxWidth:"xs",children:[Object(m.jsx)(A.a,{}),Object(m.jsxs)(U.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(m.jsx)(R.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(m.jsx)(Y.a,{})}),Object(m.jsx)(N.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(m.jsxs)(U.a,{component:"form",onSubmit:y,noValidate:!0,sx:{mt:1},children:[Object(m.jsx)(O.a,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,onChange:function(e){r(e.target.value)}}),Object(m.jsx)(O.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){u(e.target.value)}}),Object(m.jsx)(J.a,{control:Object(m.jsx)(z.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(m.jsx)(p.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),Object(m.jsxs)(M.a,{container:!0,children:[Object(m.jsx)(M.a,{item:!0,xs:!0,children:Object(m.jsx)(G.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(m.jsx)(M.a,{item:!0,children:Object(m.jsx)(G.a,{href:"../register",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]}),Object(m.jsx)(K,{sx:{mt:8,mb:4}})]})})};function Z(e){return Object(m.jsxs)(N.a,Object(W.a)(Object(W.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ",Object(m.jsx)(G.a,{color:"inherit",href:"https://mui.com/",children:"Your Website"})," ",(new Date).getFullYear(),"."]}))}var $=Object(L.a)(),_=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),l=s[0],u=s[1],b=Object(a.useState)(""),h=Object(o.a)(b,2),x=h[0],f=h[1],y=Object(a.useState)(""),w=Object(o.a)(y,2),C=w[0],S=w[1],k=Object(a.useContext)(v),T=g(),I=(T.isLoading,T.error,T.sendRequest),E=(T.clearError,Object(i.f)()),D=function(){var e=Object(d.a)(j.a.mark((function e(t){var a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=new FormData(t.currentTarget),console.log(a.values),e.prev=3,e.next=6,I("http://localhost:5000/api/users/register","POST",JSON.stringify({firstName:n,lastName:l,email:x,password:C,userType:"user"}),{"Content-Type":"application/json"});case 6:return e.sent,e.next=9,I("".concat("http://localhost:5000/api/","/users/login"),"POST",JSON.stringify({email:x,password:C}),{"Content-Type":"application/json"});case 9:r=e.sent,k.login(r.userId,r.token,r.userName,r.userType),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(3);case 15:E("/");case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)(q.a,{theme:$,children:Object(m.jsxs)(H.a,{component:"main",maxWidth:"xs",children:[Object(m.jsx)(A.a,{}),Object(m.jsxs)(U.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(m.jsx)(R.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(m.jsx)(Y.a,{})}),Object(m.jsx)(N.a,{component:"h1",variant:"h5",children:"Sign up"}),Object(m.jsxs)(U.a,{component:"form",noValidate:!0,onSubmit:D,sx:{mt:3},children:[Object(m.jsxs)(M.a,{container:!0,spacing:2,children:[Object(m.jsx)(M.a,{item:!0,xs:12,sm:6,children:Object(m.jsx)(O.a,{autoComplete:"given-name",name:"firstName",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0,value:n,onChange:function(e){r(e.target.value)}})}),Object(m.jsx)(M.a,{item:!0,xs:12,sm:6,children:Object(m.jsx)(O.a,{required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"family-name",value:l,onChange:function(e){u(e.target.value)}})}),Object(m.jsx)(M.a,{item:!0,xs:12,children:Object(m.jsx)(O.a,{required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",value:x,onChange:function(e){f(e.target.value)}})}),Object(m.jsx)(M.a,{item:!0,xs:12,children:Object(m.jsx)(O.a,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password",value:C,onChange:function(e){S(e.target.value)}})}),Object(m.jsx)(M.a,{item:!0,xs:12,children:Object(m.jsx)(J.a,{control:Object(m.jsx)(z.a,{value:"allowExtraEmails",color:"primary"}),label:"I want to receive inspiration, marketing promotions and updates via email."})})]}),Object(m.jsx)(p.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),Object(m.jsx)(M.a,{container:!0,justifyContent:"flex-end",children:Object(m.jsx)(M.a,{item:!0,children:Object(m.jsx)(G.a,{href:"#",variant:"body2",children:"Already have an account? Sign in"})})})]})]}),Object(m.jsx)(Z,{sx:{mt:5}})]})})},ee=n(135),te=n.n(ee),ne=(n(286),n(287),function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),l=s[0],u=s[1],b=g(),x=(b.isLoading,b.error,b.sendRequest),f=(b.clearError,Object(i.f)()),y=Object(a.useContext)(v),w=function(){var e=Object(d.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,x("".concat("http://localhost:5000/api/","api/users/").concat(y.userId),"GET");case 4:return a=e.sent,e.next=7,x("".concat("http://localhost:5000/api/","/posts/create"),"POST",JSON.stringify({title:""===l?"Test Post":l,postBody:""===n?"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.":n,creator:a.name,creatorID:y.userId,comments:[],reactions:[]}),{"Content-Type":"application/json"});case 7:e.sent,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:f("/");case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(h,{text:""}),Object(m.jsxs)("form",{onSubmit:w,children:[Object(m.jsx)("div",{style:{backgroundColor:"white"},children:Object(m.jsx)(O.a,{autoFocus:!0,type:"text",style:{display:"flex",marginBottom:"1rem"},id:"outlined-basic",variant:"outlined",placeholder:"Post title...",value:l,onChange:function(e){u(e.target.value)}})}),Object(m.jsx)("div",{style:{backgroundColor:"white"},children:Object(m.jsx)(te.a,{theme:"snow",placeholder:"Start creating your masterpiece...",value:n,onChange:function(e){r(e)}})}),Object(m.jsx)("div",{className:"container",children:Object(m.jsx)(p.a,{type:"submit",variant:"contained",size:"large",children:"Submit Post"})})]})]})}),ae=function(){var e,t=Object(a.useState)(!1),n=Object(o.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(!1),u=Object(o.a)(s,2),j=u[0],d=u[1],p=Object(a.useState)(""),b=Object(o.a)(p,2),h=b[0],x=b[1],O=Object(a.useState)(""),f=Object(o.a)(O,2),g=f[0],y=f[1],w=Object(a.useState)(""),C=Object(o.a)(w,2),S=C[0],k=C[1],T=Object(a.useCallback)((function(e,t,n,a,r){c(t),d(e),x(n),y(a),k(r),console.log("logged in! welcome, "+n+" ("+a+")")}),[]),E=Object(a.useCallback)((function(){c(null),d(null),x(null),y(null),console.log("logged out!")}),[]);return e=r?Object(m.jsx)(a.Fragment,{children:Object(m.jsxs)(i.c,{children:[Object(m.jsx)(i.a,{path:"/",element:Object(m.jsx)(I,{}),exact:!0}),Object(m.jsx)(i.a,{path:"/create",element:Object(m.jsx)(ne,{}),exact:!0})]})}):Object(m.jsx)(a.Fragment,{children:Object(m.jsxs)(i.c,{children:[Object(m.jsx)(i.a,{path:"/",element:Object(m.jsx)(I,{}),exact:!0}),Object(m.jsx)(i.a,{path:"/login",element:Object(m.jsx)(X,{}),exact:!0}),Object(m.jsx)(i.a,{path:"/register",element:Object(m.jsx)(_,{}),exact:!0})]})}),Object(m.jsx)(v.Provider,{value:{userId:j,fullName:S,firstName:h,userType:g,isLoggedIn:!!r,token:r,login:T,logout:E},children:Object(m.jsx)(l.a,{children:Object(m.jsxs)("div",{className:"mainBody",children:[Object(m.jsx)(P,{}),e]})})})},re=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,356)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(ae,{})}),document.getElementById("root")),re()},89:function(e,t){e.exports="http://localhost:5000/"}},[[289,1,2]]]);
//# sourceMappingURL=main.6aea6302.chunk.js.map