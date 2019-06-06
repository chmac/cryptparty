(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{208:function(e,t,n){e.exports=n(403)},213:function(e,t,n){},222:function(e,t){},224:function(e,t){},258:function(e,t){},259:function(e,t){},403:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),c=n.n(i),o=(n(213),n(53)),s=n(196),l=n(189),u=n(63),v=n(11),p=n(49),d=Object(p.a)(),m=n(22),y=n.n(m),E=n(38),f=n(55),h=n(70),b=n(35),g=n.n(b),O=n(32),w=n(43),j=new w.a({uri:"https://cryptparty-data.protocolsforhumanity.org/graphql"}),S=Object(h.a)(g.a).Curve,_=function(e){return g.a.util.encodeBase64(Object(O.decodeURLSafe)(e))},I=function(e,t){var n=S.deriveKeys(_(e),_(t));if(!n)throw new Error("Failed create encryption keys #5jKBfa");return S.createEncryptor(n)},N=function(e,t,n){return I(e,t).decrypt(n)};function k(){var e=Object(f.a)(["\n  mutation CreateEvent($_id: ID!, $content: String!) {\n    createEvent(event: { _id: $_id, content: $content }) {\n      success\n    }\n  }\n"]);return k=function(){return e},e}function x(){var e=Object(f.a)(["\n  query getEvent($_id: ID!) {\n    event(_id: $_id) {\n      _id\n      content\n      invitees {\n        _id\n        content\n        reply {\n          content\n        }\n      }\n    }\n  }\n"]);return x=function(){return e},e}var K=Object(h.a)(g.a),R=Object(w.b)(x()),M=function(e){try{return JSON.parse(e)}catch(t){throw new Error("Invalid Event data. #rpxQVx ".concat(t.message))}},C=function(){var e=Object(E.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=g.a.box.keyPair.fromSecretKey(Object(O.decodeURLSafe)(t)),e.abrupt("return",j.query({query:R,variables:{_id:Object(O.encodeURLSafe)(n.publicKey)},fetchPolicy:"network-only"}).catch(function(e){throw alert("Error getting event #QA3Ekl ".concat(e.message)),e}).then(function(e){var a=e.data.event;if(null===e.data.event)throw new Error("Could not load event #RMLJzZ");var r=K.decrypt(e.data.event.content,n.secretKey);return Object(v.a)({},M(r),{invitees:a.invitees&&a.invitees.length?a.invitees.map(function(e){var a=K.decrypt(e.content,n.secretKey),r=M(a),i=Object(v.a)({},r,{_id:e._id});if(!e.reply)return Object(v.a)({},i,{reply:null});var c=N(e._id,t,e.reply.content),o=JSON.parse(c);return Object(v.a)({},i,{reply:o})}):[]})}));case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),L=Object(w.b)(k()),T=function(){var e=Object(E.a)(y.a.mark(function e(t){var n,a,r,i,c;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=g.a.box.keyPair(),a=Object(O.encodeURLSafe)(n.secretKey),r=Object(O.encodeURLSafe)(n.publicKey),i=JSON.stringify(Object(v.a)({},t,{_id:r})),c=K.encrypt(i,n.secretKey),e.abrupt("return",j.mutate({mutation:L,variables:{_id:r,content:c}}).catch(function(e){throw alert("Error saving Event #SxA5gq ".concat(e.message)),e}).then(function(){return{secretKey:a,publicKey:r}}));case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),V={event:{description:""}},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/Events/SET_DESCRIPTION":var n=t.payload.description;return Object(v.a)({},e,{event:{description:n}})}return e},A=n(198),D=n(200);function W(){var e=Object(f.a)(["\n  mutation CreateInvite(\n    $_id: ID!\n    $eventId: ID!\n    $invite: String!\n    $invitee: String!\n  ) {\n    createInvite(\n      invite: {\n        _id: $_id\n        eventId: $eventId\n        invite: $invite\n        invitee: $invitee\n      }\n    ) {\n      success\n      invite {\n        _id\n      }\n    }\n  }\n"]);return W=function(){return e},e}function Y(){var e=Object(f.a)(["\n  query getInvite($_id: ID!) {\n    invite(_id: $_id) {\n      _id\n      content\n      reply {\n        content\n      }\n    }\n  }\n"]);return Y=function(){return e},e}var P,U=Object(h.a)(g.a),J=Object(w.b)(Y()),q=function(e){try{return JSON.parse(e)}catch(t){throw new Error("Invalid Invite data.  ".concat(t.message))}},B=function(){var e=Object(E.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=g.a.box.keyPair.fromSecretKey(Object(O.decodeURLSafe)(t)),e.abrupt("return",j.query({query:J,variables:{_id:Object(O.encodeURLSafe)(n.publicKey)}}).catch(function(e){throw alert("Error getting invite #Z1u1n9 ".concat(e.message)),e}).then(function(e){if(null===e.data.invite)throw new Error("Could not load invite #Yt3UxI");var a=U.decrypt(e.data.invite.content,n.secretKey),r=q(a),i=Object(v.a)({},r,{_id:e.data.invite._id});if(!e.data.invite.reply)return i;var c=N(i.event._id,t,e.data.invite.reply.content),o=q(c);return Object(v.a)({},i,{reply:o.reply})}));case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),G=Object(w.b)(W()),F=function(){var e=Object(E.a)(y.a.mark(function e(t,n,a){var r,i,c,o,s,l,u,v,p;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.invitees,r=Object(D.a)(n,["invitees"]),i=g.a.box.keyPair(),c=Object(O.encodeURLSafe)(i.secretKey),o=Object(O.encodeURLSafe)(i.publicKey),s=JSON.stringify({name:t,event:r}),l=U.encrypt(s,i.secretKey),u=JSON.stringify({eventId:n._id,name:t}),v=g.a.box.keyPair.fromSecretKey(Object(O.decodeURLSafe)(a)),p=U.encrypt(u,v.secretKey),e.abrupt("return",j.mutate({mutation:G,variables:{_id:o,eventId:n._id,invite:l,invitee:p}}).catch(function(e){throw alert("Error saving Event #SxA5gq ".concat(e.message)),e}).then(function(){return{invitee:{_id:o,eventId:n._id,name:t},keys:{secretKey:c,publicKey:o}}}));case 10:case"end":return e.stop()}},e)}));return function(t,n,a){return e.apply(this,arguments)}}(),X="cryptparty/ManageEvent/LOAD_EVENT",Z=function(e,t){return{type:X,payload:{secretKey:e,event:t}}},z={showSaveMessage:!1,isLoading:!0,isError:!1,error:"",secreteKey:"",event:{_id:"",description:"",invitees:[]}},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/ManageEvent/SET_SHOW_SAVE_MESSAGE":return Object(v.a)({},e,{showSaveMessage:t.payload.showSaveMessage});case X:return Object(v.a)({},e,{isLoading:!1,secreteKey:t.payload.secretKey,event:t.payload.event});case"cryptparty/ManageEvent/LOAD_EVENT_ERROR":return Object(v.a)({},e,{isLoading:!1,isError:!0,error:t.payload.error});case"cryptparty/ManageEvent/CREATE_INVITEE":return Object(v.a)({},e,{event:Object(v.a)({},e.event,{invitees:[].concat(Object(A.a)(e.event.invitees),[t.payload.invitee])})})}return e};function Q(){var e=Object(f.a)(["\n  mutation SendReplyMutation($eventId: ID!, $inviteId: ID!, $content: String!) {\n    sendReply(\n      reply: { eventId: $eventId, inviteId: $inviteId, content: $content }\n    ) {\n      success\n    }\n  }\n"]);return Q=function(){return e},e}!function(e){e[e.NO=0]="NO",e[e.YES=1]="YES",e[e.MAYBE=2]="MAYBE"}(P||(P={}));var ee=function(e){switch(e){case P.YES:return"Yes";case P.NO:return"No";case P.MAYBE:return"Maybe"}},te=Object(w.b)(Q()),ne=function(){var e=Object(E.a)(y.a.mark(function e(t,n,a,r){var i,c;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=JSON.stringify({reply:r}),o=i,c=I(t,a).encrypt(o),e.abrupt("return",j.mutate({mutation:te,variables:{eventId:t,inviteId:n,content:c}}).catch(function(e){throw alert("Error sending reply #JGdK73 ".concat(e.message)),e}).then(function(e){}));case 3:case"end":return e.stop()}var o},e)}));return function(t,n,a,r){return e.apply(this,arguments)}}(),ae=function(e,t){return{type:"cryptparty/ViewInvite/LOAD_INVITE",payload:{secretKey:t,invite:e}}},re="cryptparty/ViewInvite/SEND_REPLY",ie=function(e){return function(t,n){var a=n();ne(a.ViewInvite.invite.event._id,a.ViewInvite.invite._id,a.ViewInvite.secretKey,e).then(function(n){t(function(e){return{type:re,payload:{reply:e}}}(e))})}},ce={isOwner:!1,isLoading:!0,isError:!1,error:"",secretKey:"",invite:{_id:"",name:"",event:{_id:"",description:""},reply:void 0}},oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/ViewInvite/SET_IS_OWNER":return Object(v.a)({},e,{isOwner:t.payload.isOwner});case"cryptparty/ViewInvite/LOAD_INVITE":return Object(v.a)({},e,{isLoading:!1,secretKey:t.payload.secretKey,invite:t.payload.invite});case re:return Object(v.a)({},e,{invite:Object(v.a)({},e.invite,{reply:t.payload.reply})})}return e},se=Object(u.c)({CreateEvent:$,ManageEvent:H,ViewInvite:oe}),le="object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:u.d,ue=Object(u.e)(se,le(Object(u.a)(l.a))),ve=n(106),pe=n(197),de=n(452),me=n(8),ye=n(451),Ee=n(446),fe=n(436),he=n(108),be=n(449),ge=Object(me.a)(function(e){return Object(de.a)({inner:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.classes;return r.a.createElement(fe.a,{position:"static",color:"default"},r.a.createElement(be.a,{className:t.inner},r.a.createElement(he.a,{variant:"h6",component:"h1",color:"inherit"},"Zero Knowledge Party"),r.a.createElement(he.a,{variant:"h6",component:"h2",color:"inherit"},r.a.createElement(be.a,{fontSize:"0.8em"},"Encrypted parties since 2020"))))}),Oe=n(199),we=n(71),je=n.n(we),Se=n(447),_e=n(438),Ie=n(405),Ne=n(439),ke=Object(o.b)(function(e){return{event:e.CreateEvent.event}},function(e){return{setContent:function(t){e(function(e){return{type:"cryptparty/Events/SET_DESCRIPTION",payload:{description:e}}}(t))},createEvent:function(){e(function(e,t){var n=t().CreateEvent.event.description;T({description:n}).then(function(e){d.push("/m/".concat(e.secretKey,"/s"))})})}}})(Object(me.a)(function(e){return Object(de.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2),margin:e.spacing(2,0)}),heading:{margin:e.spacing(2,0)},p:{margin:e.spacing(2,0)},buttonGrid:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.classes,n=e.event,i=e.setContent,c=e.createEvent,o=Object(a.useState)(!1),s=Object(Oe.a)(o,2),l=s[0],u=s[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(he.a,{className:t.heading,variant:"h2"},"Create an event"),l?r.a.createElement(r.a.Fragment,null,r.a.createElement(Ie.a,{className:t.paper},r.a.createElement(je.a,{source:n.description})),r.a.createElement(he.a,{className:t.p},"Once published, this event cannot be edited."),r.a.createElement(_e.a,{container:!0,className:t.buttonGrid,spacing:2},r.a.createElement(_e.a,{item:!0,xs:6},r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"default",onClick:function(){u(!1)}},"Edit Again")),r.a.createElement(_e.a,{item:!0,xs:6},r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"secondary",onClick:function(){c()}},"Publish")))):r.a.createElement(r.a.Fragment,null,r.a.createElement(he.a,null,"Enter your event description"),r.a.createElement(Ie.a,{className:t.paper},r.a.createElement(Se.a,{id:"content",label:"Content",multiline:!0,rows:"16",fullWidth:!0,onChange:function(e){return i(e.target.value)},value:n.description}),r.a.createElement(he.a,null,"Supports markdown")),r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"primary",onClick:function(){u(!0)}},"Preview")))})),xe=n(442),Ke=n(443),Re=n(444),Me=n(450),Ce=Object(o.b)(function(e){return e.ManageEvent},function(e){return{setShowSaveMessage:function(t){e({type:"cryptparty/ManageEvent/SET_SHOW_SAVE_MESSAGE",payload:{showSaveMessage:t}})},loadEvent:function(t){e(function(e){return function(){var t=Object(E.a)(y.a.mark(function t(n){var a;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C(e);case 3:a=t.sent,n(Z(e,a)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n({type:"cryptparty/ManageEvent/LOAD_EVENT_ERROR",payload:{error:t.t0.message}});case 10:case"end":return t.stop()}},t,null,[[0,7]])}));return function(e){return t.apply(this,arguments)}}()}(t))},createInvite:function(){e(function(e,t){var n=t(),a=prompt("Who do you want to invite?");null!==a&&F(a,n.ManageEvent.event,n.ManageEvent.secreteKey).then(function(t){var n=t.keys,a=t.invitee;e(function(e){return{type:"cryptparty/ManageEvent/CREATE_INVITEE",payload:{invitee:e}}}(a)),d.push("/i/".concat(n.secretKey,"/o"))})})}}})(Object(me.a)(function(e){return Object(de.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2),margin:e.spacing(2,0)}),modal:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80vw",maxWidth:"400px"},heading:{margin:e.spacing(3,0)},p:{margin:e.spacing(1,0)}})})(function(e){var t=e.match,n=e.classes,i=e.loadEvent,c=t.params,o=c.key,s=c.action;if(Object(a.useEffect)(function(){i(o)},[i,o]),s&&"s"===s)return e.setShowSaveMessage(!0),r.a.createElement(ve.a,{to:"/m/".concat(o)});if(e.isLoading)return r.a.createElement("div",null,"Loading");if(e.isError)return r.a.createElement("div",null,r.a.createElement(he.a,{variant:"h2",color:"error"},"Error"),r.a.createElement(he.a,null,e.error));return r.a.createElement(r.a.Fragment,null,e.showSaveMessage?r.a.createElement(Me.a,{open:!0},r.a.createElement("div",{className:n.modal},r.a.createElement(Ie.a,{className:n.paper},r.a.createElement(he.a,{variant:"h2"},"Save this link"),r.a.createElement(he.a,{className:n.p},"This page (link) is the key to your event. There is no way to recover it.")," ",r.a.createElement(he.a,{className:n.p},"We recommend saving it somewhere offline and secure. Signal messenger could be a great option!"),r.a.createElement(Ne.a,{fullWidth:!0,variant:"contained",onClick:function(){e.setShowSaveMessage(!1)}},"Done")))):null,r.a.createElement(he.a,{className:n.p},"This link is your event. If you lose this page there is no way to recover it."),r.a.createElement(he.a,{className:n.p},"To invite a new person, create an invitation link for them. Each person gets their own invitation."),r.a.createElement(_e.a,{container:!0,justify:"flex-end"},r.a.createElement(_e.a,{item:!0,xs:12},r.a.createElement(Ne.a,{fullWidth:!0,color:"secondary",variant:"contained",onClick:e.createInvite},"Create New Invite Link"))),r.a.createElement(he.a,{className:n.heading,variant:"h2"},"Already invited"),r.a.createElement(Ie.a,{className:n.paper},r.a.createElement(he.a,null,"You created invite links for the following people."),r.a.createElement(xe.a,{dense:!0},e.event.invitees&&e.event.invitees.length?e.event.invitees.map(function(e){return r.a.createElement(Ke.a,{key:e._id},r.a.createElement(Re.a,null,e.name," -"," ",e.reply?"replied ".concat(ee(e.reply.reply)):"no reply"))}):r.a.createElement(Ke.a,null,r.a.createElement(Re.a,null,"Nobody so far...")))),r.a.createElement(he.a,{className:n.heading,variant:"h2"},"Your event"),r.a.createElement(Ie.a,{className:n.paper},r.a.createElement(je.a,{source:e.event.description})))})),Le=Object(o.b)(function(e){return e.ViewInvite},function(e){return{setIsOwner:function(t){e(function(e){return{type:"cryptparty/ViewInvite/SET_IS_OWNER",payload:{isOwner:e}}}(t))},loadInvite:function(t){e(function(e){return function(){var t=Object(E.a)(y.a.mark(function t(n,a){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:B(e).then(function(t){n(ae(t,e))});case 1:case"end":return t.stop()}},t)}));return function(e,n){return t.apply(this,arguments)}}()}(t))},sendRepy:function(t){e(ie(t))}}})(Object(me.a)(function(e){return Object(de.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2,0),margin:e.spacing(2,0)}),modal:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80vw",maxWidth:"400px"},p:{margin:e.spacing(2,0)},buttonGrid:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.match,n=e.classes,i=e.loadInvite,c=t.params,o=c.key,s=c.action;if(Object(a.useEffect)(function(){console.log("ViewInvite.scene useEffect #vXShRN"),i(o)},[i,o]),s&&"o"===s)return e.setIsOwner(!0),r.a.createElement(ve.a,{to:"/i/".concat(o)});if(e.isLoading)return r.a.createElement("div",null,"Loading");if(e.isError)return r.a.createElement("div",null,r.a.createElement(he.a,{variant:"h2",color:"error"},"Error"),r.a.createElement(he.a,null,e.error));return r.a.createElement(r.a.Fragment,null,e.isOwner?r.a.createElement(Me.a,{open:!0},r.a.createElement("div",{className:n.modal},r.a.createElement(Ie.a,{className:n.paper},r.a.createElement(he.a,{variant:"h2"},e.invite.name,"'s invitation"),r.a.createElement(he.a,{className:n.p},"This is ",e.invite.name,"'s invitation link. Send this link to"," ",e.invite.name,"."),r.a.createElement(Ne.a,{fullWidth:!0,variant:"contained",onClick:function(){window.history.back()}},"Back to my event")))):null,r.a.createElement(he.a,{variant:"h2"},"Dear ",e.invite.name),r.a.createElement(Ie.a,{className:n.paper},r.a.createElement(je.a,{source:e.invite.event.description})),void 0===e.invite.reply?r.a.createElement(he.a,{className:n.p},"You have not yet replied."):r.a.createElement(he.a,{className:n.p},"You have replied: ",ee(e.invite.reply)),r.a.createElement(r.a.Fragment,null,r.a.createElement(he.a,{className:n.p},void 0!==e.invite.reply?"Update your reply":"Are you coming?"),r.a.createElement(_e.a,{container:!0,className:n.buttonGrid,spacing:2},r.a.createElement(_e.a,{item:!0,xs:4},r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"primary",onClick:function(){e.sendRepy(P.NO)}},"No")),r.a.createElement(_e.a,{item:!0,xs:4},r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"default",onClick:function(){e.sendRepy(P.MAYBE)}},"Maybe")),r.a.createElement(_e.a,{item:!0,xs:4},r.a.createElement(Ne.a,{variant:"contained",fullWidth:!0,color:"secondary",onClick:function(){e.sendRepy(P.YES)}},"Yes")))))})),Te=n(453),Ve=n(445),$e=Object(pe.a)(),Ae=Object(Te.a)($e),De=Object(me.a)(function(e){return Object(de.a)({container:{flexGrow:1}})})(function(e){var t=e.classes;return r.a.createElement(Ve.a,{theme:Ae},r.a.createElement(ve.c,{history:d},r.a.createElement(ye.a,null),r.a.createElement(ge,null),r.a.createElement(Ee.a,{className:t.container},r.a.createElement(ve.b,{exact:!0,path:"/",component:ke}),r.a.createElement(ve.b,{path:"/m/:key/:action?",component:Ce}),r.a.createElement(ve.b,{path:"/i/:key/:action?",component:Le}))))}),We=function(){return r.a.createElement(o.a,{store:ue},r.a.createElement(s.a,{client:j},r.a.createElement(De,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(We,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[208,1,2]]]);
//# sourceMappingURL=main.ea20543a.chunk.js.map