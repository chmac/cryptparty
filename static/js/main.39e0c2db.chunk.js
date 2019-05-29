(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{208:function(e,t,n){e.exports=n(403)},213:function(e,t,n){},222:function(e,t){},224:function(e,t){},258:function(e,t){},259:function(e,t){},403:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),c=n.n(i),o=(n(213),n(53)),u=n(195),s=n(187),l=n(63),v=n(11),p=n(49),d=Object(p.a)(),m=n(22),y=n.n(m),E=n(38),f=n(55),b=n(70),O=n(35),h=n.n(O),g=n(32),w=n(43),j=Object({NODE_ENV:"production",PUBLIC_URL:"/cryptparty"}).GRAPHQL_URL||"http://localhost:4000/graphql",_=new w.a({uri:j}),I=Object(b.a)(h.a).Curve,N=function(e){return h.a.util.encodeBase64(Object(g.decodeURLSafe)(e))},S=function(e,t){var n=I.deriveKeys(N(e),N(t));if(!n)throw new Error("Failed create encryption keys #5jKBfa");return I.createEncryptor(n)},k=function(e,t,n){return S(e,t).decrypt(n)};function R(){var e=Object(f.a)(["\n  mutation CreateEvent($_id: ID!, $content: String!) {\n    createEvent(event: { _id: $_id, content: $content }) {\n      success\n    }\n  }\n"]);return R=function(){return e},e}function x(){var e=Object(f.a)(["\n  query getEvent($_id: ID!) {\n    event(_id: $_id) {\n      _id\n      content\n      invitees {\n        _id\n        content\n        reply {\n          content\n        }\n      }\n    }\n  }\n"]);return x=function(){return e},e}var K=Object(b.a)(h.a),L=Object(w.b)(x()),C=function(e){try{return JSON.parse(e)}catch(t){throw new Error("Invalid Event data. #rpxQVx ".concat(t.message))}},T=function(){var e=Object(E.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=h.a.box.keyPair.fromSecretKey(Object(g.decodeURLSafe)(t)),e.abrupt("return",_.query({query:L,variables:{_id:Object(g.encodeURLSafe)(n.publicKey)},fetchPolicy:"network-only"}).catch(function(e){throw alert("Error getting event #QA3Ekl ".concat(e.message)),e}).then(function(e){var a=e.data.event;if(null===e.data.event)throw new Error("Could not load event #RMLJzZ");var r=K.decrypt(e.data.event.content,n.secretKey);return Object(v.a)({},C(r),{invitees:a.invitees&&a.invitees.length?a.invitees.map(function(e){var a=K.decrypt(e.content,n.secretKey),r=C(a),i=Object(v.a)({},r,{_id:e._id});if(!e.reply)return Object(v.a)({},i,{reply:null});var c=k(e._id,t,e.reply.content),o=JSON.parse(c);return Object(v.a)({},i,{reply:o})}):[]})}));case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),$=Object(w.b)(R()),V=function(){var e=Object(E.a)(y.a.mark(function e(t){var n,a,r,i,c;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=h.a.box.keyPair(),a=Object(g.encodeURLSafe)(n.secretKey),r=Object(g.encodeURLSafe)(n.publicKey),i=JSON.stringify(Object(v.a)({},t,{_id:r})),c=K.encrypt(i,n.secretKey),e.abrupt("return",_.mutate({mutation:$,variables:{_id:r,content:c}}).catch(function(e){throw alert("Error saving Event #SxA5gq ".concat(e.message)),e}).then(function(){return{secretKey:a,publicKey:r}}));case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),D={event:{description:""}},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/Events/SET_DESCRIPTION":var n=t.payload.description;return Object(v.a)({},e,{event:{description:n}})}return e},A=n(197),U=n(199);function W(){var e=Object(f.a)(["\n  mutation CreateInvite(\n    $_id: ID!\n    $eventId: ID!\n    $invite: String!\n    $invitee: String!\n  ) {\n    createInvite(\n      invite: {\n        _id: $_id\n        eventId: $eventId\n        invite: $invite\n        invitee: $invitee\n      }\n    ) {\n      success\n      invite {\n        _id\n      }\n    }\n  }\n"]);return W=function(){return e},e}function P(){var e=Object(f.a)(["\n  query getInvite($_id: ID!) {\n    invite(_id: $_id) {\n      _id\n      content\n      reply {\n        content\n      }\n    }\n  }\n"]);return P=function(){return e},e}var Y,J=Object(b.a)(h.a),B=Object(w.b)(P()),q=function(e){try{return JSON.parse(e)}catch(t){throw new Error("Invalid Invite data.  ".concat(t.message))}},F=function(){var e=Object(E.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=h.a.box.keyPair.fromSecretKey(Object(g.decodeURLSafe)(t)),e.abrupt("return",_.query({query:B,variables:{_id:Object(g.encodeURLSafe)(n.publicKey)}}).catch(function(e){throw alert("Error getting invite #Z1u1n9 ".concat(e.message)),e}).then(function(e){if(null===e.data.invite)throw new Error("Could not load invite #Yt3UxI");var a=J.decrypt(e.data.invite.content,n.secretKey),r=q(a),i=Object(v.a)({},r,{_id:e.data.invite._id});if(!e.data.invite.reply)return i;var c=k(i.event._id,t,e.data.invite.reply.content),o=q(c);return Object(v.a)({},i,{reply:o.reply})}));case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),G=Object(w.b)(W()),X=function(){var e=Object(E.a)(y.a.mark(function e(t,n,a){var r,i,c,o,u,s,l,v,p;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.invitees,r=Object(U.a)(n,["invitees"]),i=h.a.box.keyPair(),c=Object(g.encodeURLSafe)(i.secretKey),o=Object(g.encodeURLSafe)(i.publicKey),u=JSON.stringify({name:t,event:r}),s=J.encrypt(u,i.secretKey),l=JSON.stringify({eventId:n._id,name:t}),v=h.a.box.keyPair.fromSecretKey(Object(g.decodeURLSafe)(a)),p=J.encrypt(l,v.secretKey),e.abrupt("return",_.mutate({mutation:G,variables:{_id:o,eventId:n._id,invite:s,invitee:p}}).catch(function(e){throw alert("Error saving Event #SxA5gq ".concat(e.message)),e}).then(function(){return{invitee:{_id:o,eventId:n._id,name:t},keys:{secretKey:c,publicKey:o}}}));case 10:case"end":return e.stop()}},e)}));return function(t,n,a){return e.apply(this,arguments)}}(),Q="cryptparty/ManageEvent/LOAD_EVENT",Z=function(e,t){return{type:Q,payload:{secretKey:e,event:t}}},z={isOwner:!1,isLoading:!0,isError:!1,error:"",secreteKey:"",event:{_id:"",description:"",invitees:[]}},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/ManageEvent/SET_IS_OWNER":return Object(v.a)({},e,{isOwner:t.payload.isOwner});case Q:return Object(v.a)({},e,{isLoading:!1,secreteKey:t.payload.secretKey,event:t.payload.event});case"cryptparty/ManageEvent/LOAD_EVENT_ERROR":return Object(v.a)({},e,{isLoading:!1,isError:!0,error:t.payload.error});case"cryptparty/ManageEvent/CREATE_INVITEE":return Object(v.a)({},e,{event:Object(v.a)({},e.event,{invitees:[].concat(Object(A.a)(e.event.invitees),[t.payload.invitee])})})}return e};function ee(){var e=Object(f.a)(["\n  mutation SendReplyMutation($eventId: ID!, $inviteId: ID!, $content: String!) {\n    sendReply(\n      reply: { eventId: $eventId, inviteId: $inviteId, content: $content }\n    ) {\n      success\n    }\n  }\n"]);return ee=function(){return e},e}!function(e){e[e.NO=0]="NO",e[e.YES=1]="YES",e[e.MAYBE=2]="MAYBE"}(Y||(Y={}));var te=function(e){switch(e){case Y.YES:return"Yes";case Y.NO:return"No";case Y.MAYBE:return"Maybe"}},ne=Object(w.b)(ee()),ae=function(){var e=Object(E.a)(y.a.mark(function e(t,n,a,r){var i,c;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=JSON.stringify({reply:r}),o=i,c=S(t,a).encrypt(o),e.abrupt("return",_.mutate({mutation:ne,variables:{eventId:t,inviteId:n,content:c}}).catch(function(e){throw alert("Error sending reply #JGdK73 ".concat(e.message)),e}).then(function(e){}));case 3:case"end":return e.stop()}var o},e)}));return function(t,n,a,r){return e.apply(this,arguments)}}(),re=function(e,t){return{type:"cryptparty/ViewInvite/LOAD_INVITE",payload:{secretKey:t,invite:e}}},ie="cryptparty/ViewInvite/SEND_REPLY",ce=function(e){return function(t,n){var a=n();ae(a.ViewInvite.invite.event._id,a.ViewInvite.invite._id,a.ViewInvite.secretKey,e).then(function(n){t(function(e){return{type:ie,payload:{reply:e}}}(e))})}},oe={isOwner:!1,isLoading:!0,isError:!1,error:"",secretKey:"",invite:{_id:"",name:"",event:{_id:"",description:""},reply:void 0}},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"cryptparty/ViewInvite/SET_IS_OWNER":return Object(v.a)({},e,{isOwner:t.payload.isOwner});case"cryptparty/ViewInvite/LOAD_INVITE":return Object(v.a)({},e,{isLoading:!1,secretKey:t.payload.secretKey,invite:t.payload.invite});case ie:return Object(v.a)({},e,{invite:Object(v.a)({},e.invite,{reply:t.payload.reply})})}return e},se=Object(l.c)({CreateEvent:M,ManageEvent:H,ViewInvite:ue}),le="object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:l.d,ve=Object(l.e)(se,le(Object(l.a)(s.a))),pe=n(192),de=n(196),me=n(452),ye=n(8),Ee=n(451),fe=n(446),be=n(436),Oe=n(107),he=n(449),ge=Object(ye.a)(function(e){return Object(me.a)({inner:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.classes;return r.a.createElement(be.a,{position:"static",color:"default"},r.a.createElement(he.a,{className:t.inner},r.a.createElement(Oe.a,{variant:"h6",component:"h1",color:"inherit"},"Zero Knowledge Party"),r.a.createElement(Oe.a,{variant:"h6",component:"h2",color:"inherit"},r.a.createElement(he.a,{fontSize:"0.8em"},"Encrypted parties since 2020"))))}),we=n(198),je=n(71),_e=n.n(je),Ie=n(447),Ne=n(438),Se=n(405),ke=n(439),Re=Object(o.b)(function(e){return{event:e.CreateEvent.event}},function(e){return{setContent:function(t){e(function(e){return{type:"cryptparty/Events/SET_DESCRIPTION",payload:{description:e}}}(t))},createEvent:function(){e(function(e,t){var n=t().CreateEvent.event.description;V({description:n}).then(function(e){d.push("/m/".concat(e.secretKey))})})}}})(Object(ye.a)(function(e){return Object(me.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2),margin:e.spacing(2,0)}),heading:{margin:e.spacing(2,0)},p:{margin:e.spacing(2,0)},buttonGrid:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.classes,n=e.event,i=e.setContent,c=e.createEvent,o=Object(a.useState)(!1),u=Object(we.a)(o,2),s=u[0],l=u[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe.a,{className:t.heading,variant:"h2"},"Create an event"),s?r.a.createElement(r.a.Fragment,null,r.a.createElement(Se.a,{className:t.paper},r.a.createElement(_e.a,{source:n.description})),r.a.createElement(Oe.a,{className:t.p},"Once published, this event cannot be edited."),r.a.createElement(Ne.a,{container:!0,className:t.buttonGrid,spacing:2},r.a.createElement(Ne.a,{item:!0,xs:6},r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"default",onClick:function(){l(!1)}},"Edit Again")),r.a.createElement(Ne.a,{item:!0,xs:6},r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"secondary",onClick:function(){c()}},"Publish")))):r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe.a,null,"Enter your event description"),r.a.createElement(Se.a,{className:t.paper},r.a.createElement(Ie.a,{id:"content",label:"Content",multiline:!0,rows:"16",fullWidth:!0,onChange:function(e){return i(e.target.value)},value:n.description}),r.a.createElement(Oe.a,null,"Supports markdown")),r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"primary",onClick:function(){l(!0)}},"Preview")))})),xe=n(442),Ke=n(443),Le=n(444),Ce=Object(o.b)(function(e){return e.ManageEvent},function(e){return{setIsOwner:function(t){e(function(e){return{type:"cryptparty/ManageEvent/SET_IS_OWNER",payload:{isOwner:e}}}(t))},loadEvent:function(t){e(function(e){return function(){var t=Object(E.a)(y.a.mark(function t(n){var a;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T(e);case 3:a=t.sent,n(Z(e,a)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n({type:"cryptparty/ManageEvent/LOAD_EVENT_ERROR",payload:{error:t.t0.message}});case 10:case"end":return t.stop()}},t,null,[[0,7]])}));return function(e){return t.apply(this,arguments)}}()}(t))},createInvite:function(){e(function(e,t){var n=t(),a=prompt("Who do you want to invite?");null!==a&&X(a,n.ManageEvent.event,n.ManageEvent.secreteKey).then(function(t){var n=t.keys,a=t.invitee;e(function(e){return{type:"cryptparty/ManageEvent/CREATE_INVITEE",payload:{invitee:e}}}(a)),d.push("/i/".concat(n.secretKey,"/o"))})})}}})(Object(ye.a)(function(e){return Object(me.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2),margin:e.spacing(2,0)}),heading:{margin:e.spacing(3,0)},p:{margin:e.spacing(1,0)}})})(function(e){var t=e.match,n=e.classes,i=e.loadEvent,c=t.params.key;if(Object(a.useEffect)(function(){i(c)},[i,c]),e.isLoading)return r.a.createElement("div",null,"Loading");if(e.isError)return r.a.createElement("div",null,r.a.createElement(Oe.a,{variant:"h2",color:"error"},"Error"),r.a.createElement(Oe.a,null,e.error));return r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe.a,{className:n.p,color:"secondary"},"Save this link."),r.a.createElement(Oe.a,{className:n.p},"This link is your event. If you lose this page there is no way to recover it."),r.a.createElement(Oe.a,{className:n.p},"To invite a new person, create an invitation link for them. Each person gets their own invitation."),r.a.createElement(Ne.a,{container:!0,justify:"flex-end"},r.a.createElement(Ne.a,{item:!0,xs:12},r.a.createElement(ke.a,{fullWidth:!0,color:"secondary",variant:"contained",onClick:e.createInvite},"Create New Invite Link"))),r.a.createElement(Oe.a,{className:n.heading,variant:"h2"},"Already invited"),r.a.createElement(Se.a,{className:n.paper},r.a.createElement(Oe.a,null,"You created invite links for the following people."),r.a.createElement(xe.a,{dense:!0},e.event.invitees&&e.event.invitees.length?e.event.invitees.map(function(e){return r.a.createElement(Ke.a,{key:e._id},r.a.createElement(Le.a,null,e.name," -"," ",e.reply?"replied ".concat(te(e.reply.reply)):"no reply"))}):r.a.createElement(Ke.a,null,r.a.createElement(Le.a,null,"Nobody so far...")))),r.a.createElement(Oe.a,{className:n.heading,variant:"h2"},"Your event"),r.a.createElement(Se.a,{className:n.paper},r.a.createElement(_e.a,{source:e.event.description})))})),Te=n(450),$e=Object(o.b)(function(e){return e.ViewInvite},function(e){return{setIsOwner:function(t){e(function(e){return{type:"cryptparty/ViewInvite/SET_IS_OWNER",payload:{isOwner:e}}}(t))},loadInvite:function(t){e(function(e){return function(){var t=Object(E.a)(y.a.mark(function t(n,a){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:F(e).then(function(t){n(re(t,e))});case 1:case"end":return t.stop()}},t)}));return function(e,n){return t.apply(this,arguments)}}()}(t))},sendRepy:function(t){e(ce(t))}}})(Object(ye.a)(function(e){return Object(me.a)({paper:Object(v.a)({},e.mixins.gutters(),{padding:e.spacing(2,0),margin:e.spacing(2,0)}),modal:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80vw",maxWidth:"400px"},p:{margin:e.spacing(2,0)},buttonGrid:Object(v.a)({},e.mixins.gutters())})})(function(e){var t=e.match,n=e.classes,i=e.loadInvite,c=t.params,o=c.key,u=c.action;if(Object(a.useEffect)(function(){console.log("ViewInvite.scene useEffect #vXShRN"),i(o)},[i,o]),u&&"o"===u)return e.setIsOwner(!0),r.a.createElement(pe.a,{to:"/i/".concat(o)});if(e.isLoading)return r.a.createElement("div",null,"Loading");if(e.isError)return r.a.createElement("div",null,r.a.createElement(Oe.a,{variant:"h2",color:"error"},"Error"),r.a.createElement(Oe.a,null,e.error));return r.a.createElement(r.a.Fragment,null,e.isOwner?r.a.createElement(Te.a,{open:!0},r.a.createElement("div",{className:n.modal},r.a.createElement(Se.a,{className:n.paper},r.a.createElement(Oe.a,{variant:"h2"},e.invite.name,"'s invitation"),r.a.createElement(Oe.a,{className:n.p},"This is ",e.invite.name,"'s invitation link. Send this link to"," ",e.invite.name,"."),r.a.createElement(ke.a,{fullWidth:!0,variant:"contained",onClick:function(){window.history.back()}},"Back to my event")))):null,r.a.createElement(Oe.a,{variant:"h2"},"Dear ",e.invite.name),r.a.createElement(Se.a,{className:n.paper},r.a.createElement(_e.a,{source:e.invite.event.description})),void 0===e.invite.reply?r.a.createElement(Oe.a,{className:n.p},"You have not yet replied."):r.a.createElement(Oe.a,{className:n.p},"You have replied: ",te(e.invite.reply)),r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe.a,{className:n.p},void 0!==e.invite.reply?"Update your reply":"Are you coming?"),r.a.createElement(Ne.a,{container:!0,className:n.buttonGrid,spacing:2},r.a.createElement(Ne.a,{item:!0,xs:4},r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"primary",onClick:function(){e.sendRepy(Y.NO)}},"No")),r.a.createElement(Ne.a,{item:!0,xs:4},r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"default",onClick:function(){e.sendRepy(Y.MAYBE)}},"Maybe")),r.a.createElement(Ne.a,{item:!0,xs:4},r.a.createElement(ke.a,{variant:"contained",fullWidth:!0,color:"secondary",onClick:function(){e.sendRepy(Y.YES)}},"Yes")))))})),Ve=n(453),De=n(445),Me=Object(de.a)(),Ae=Object(Ve.a)(Me),Ue=Object(ye.a)(function(e){return Object(me.a)({container:{flexGrow:1}})})(function(e){var t=e.classes;return r.a.createElement(De.a,{theme:Ae},r.a.createElement(pe.c,{history:d},r.a.createElement(Ee.a,null),r.a.createElement(ge,null),r.a.createElement(fe.a,{className:t.container},r.a.createElement(pe.b,{exact:!0,path:"/",component:Re}),r.a.createElement(pe.b,{path:"/m/:key",component:Ce}),r.a.createElement(pe.b,{path:"/i/:key/:action?",component:$e}))))}),We=function(){return r.a.createElement(o.a,{store:ve},r.a.createElement(u.a,{client:_},r.a.createElement(Ue,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(We,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[208,1,2]]]);
//# sourceMappingURL=main.39e0c2db.chunk.js.map