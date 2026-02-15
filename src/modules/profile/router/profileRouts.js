// import ChangePassword from "../pages/ChangePassword.vue";
// import Profile from "../pages/Profile.vue";
// import PersonalInfo from '../pages/PersonalInfo.vue'
// import MyRequests from '../pages/MyRequests.vue'
// import AboutPlatform from '../pages/AboutPlatform.vue'

export default [
    {path:'/change-password',component:()=>import("../pages/ChangePassword.vue"),meta:{requireAuth:true}},
    {path:'/personal-info',component:()=>import('../pages/PersonalInfo.vue'),meta:{requireAuth:true}},
    {path:'/myrequests',component:()=>import('../pages/MyRequests.vue'),meta:{requireAuth:true}},
    {path:'/about-platform',component:()=>import('../pages/AboutPlatform.vue'),meta:{requireAuth:true}}
]