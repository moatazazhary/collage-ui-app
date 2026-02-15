// import Login from './pages/Login.vue'
// import SendVerification from './pages/SendVerification.vue'
// import SetPassword from './pages/SetPassword.vue'
// import verification from './pages/VerificationOtp.vue'
// import NotFound from './pages/NotFound.vue'
// import NotAuthorize from './pages/NotAuthorize.vue'

export default [
    {path:'/login',component:()=>import('./pages/Login.vue')},
    {path:'/send-verification',name:'Send Verification',component:()=>import('./pages/SendVerification.vue'),meta:{fromBodyOnly:true}},
    {path:'/set-password',name:'Set Password',component:()=>import('./pages/SetPassword.vue'),meta:{fromBodyOnly:true}},
    {path:'/verification',name:'Verification',component:()=> import('./pages/VerificationOtp.vue'),meta:{fromBodyOnly:true}},
    {path:'/:pathMatch(.*)*',component:()=>import('./pages/NotFound.vue')},
    {path:'/not-found',name:'Not Found',component:()=>import('./pages/NotFound.vue'),meta:{fromBodyOnly:true}},
    {path:'/access-denied',name:'Access Denied',component:()=>import('./pages/NotAuthorize.vue'),meta:{fromBodyOnly:true}}

]