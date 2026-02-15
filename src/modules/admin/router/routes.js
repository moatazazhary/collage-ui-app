// import DashboardLayout from "../layouts/DashboardLayout.vue";
// import Overview from '../pages/Overview.vue'
// import Courses from '../pages/Courses.vue'
// import DegreeRequests from '../pages/DegreeRequests.vue'
// import Departments from '../pages/Departments.vue'
// import Semesters from '../pages/Semesters.vue'
// import Doctors from '../pages/Doctors.vue'
// import Students from '../pages/Students.vue'
// import Setting from '../pages/Setting.vue'
// import FileRequests from '../pages/FileRequests.vue'
// import DegreeRequestDetails from "../pages/DegreeRequestDetails.vue";
// import fileRequestDetails from "../pages/fileRequestDetails.vue";




export default [
    {path:'/admin',component:()=>import("../layouts/DashboardLayout.vue"),children:[
        {path:'',component:()=>import('../pages/Overview.vue')},
        {path:'courses',component:()=> import('../pages/Courses.vue')},
        {path:'degree-requests',component:()=> import('../pages/DegreeRequests.vue')},
        {path:'request-details/:id',component:()=>import("../pages/DegreeRequestDetails.vue")},
        {path:'file-details/:id',component:()=>import("../pages/fileRequestDetails.vue")},
        {path:'departments',component:()=>import('../pages/Departments.vue')},
        {path:'semesters',component:()=>import('../pages/Semesters.vue')},
        {path:'doctors',component:()=> import('../pages/Doctors.vue')},
        {path:'students',component:()=>import('../pages/Students.vue')},
        {path:'file-requests',component:()=>import('../pages/FileRequests.vue')},
        {path:'settings',component:()=>import('../pages/Setting.vue')},
        ],
        meta:{
            requireAuth:true,
            isAdmin:true
        }
    }
    ]