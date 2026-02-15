
// import MainPage from "../pages/MainPage.vue";
// import Profile from "../../profile/pages/Profile.vue"
// import MyFiles from "../../files/pages/MyFiles.vue"
// import Courses from "../../Courses/pages/Courses.vue"
// import MainLayout from "../layouts/MainLayout.vue";

export default [
    {path:'/',component:()=>import("../layouts/MainLayout.vue"),children:[
        {path:'',component:()=>import("../pages/MainPage.vue")},
        {path:'profile',component:()=>import("../../profile/pages/Profile.vue")},
        {path:'myfiles',component:()=>import("../../files/pages/MyFiles.vue")},
        {path:'courses',component:()=>import("../../Courses/pages/Courses.vue"),meta:{isDoctor:false,isStudent:true}}
    ],meta:{requireAuth:true,isAdmin:false}},

]