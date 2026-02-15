import {createWebHistory,createRouter} from 'vue-router'
import coreRoutes from './core/router/index'
import profileRoutes from './profile/router/profileRouts'
import searchRoutes from './search/routes'
import degreeApplyRoutes from './requests/routes'
import coursesRouts from './Courses/routes'
import adminRoutes from './admin/router/routes'
import authRoutes from './auth/routes'



const routes = [
    ...coreRoutes,
    ...searchRoutes,
    ...profileRoutes,
    ...degreeApplyRoutes,
    ...coursesRouts,
    ...adminRoutes,
    ...authRoutes
]



const router = createRouter({
    linkExactActiveClass :'active-link',
    history : createWebHistory(),
    routes
})


router.beforeEach(async (to ,from,next)=>{
    const {useAuthStore} = await import('../stores/authStore')
    const auth = useAuthStore();

    if(to.path === '/login' && auth.isLoggedIn){
        return next('/')
    }
    if(to.meta.fromBodyOnly){
        console.log('body check :')
        const allowed = auth.consumeRoute(to.name);
        if(!allowed)
            return next('/') 
    }
    if(!auth.sessionChecked){
        await auth.checkSession();
    }

    if(to.meta.requireAuth && !auth.isLoggedIn){
        return next('/login')
    }

    if( to.meta.isDoctor && !auth.isDoctor){
        console.log('doctor : ')
        auth.allowRoute('Access Denied');
        return next({name:'Access Denied',state:{allowed:true}})
    }

    if(to.meta.isStudent && !auth.isStudent){
        console.log('student : ')
        auth.allowRoute('Access Denied');
        return next({name:'Access Denied',state:{allowed:true}})
    }

    if(to.meta.isAdmin && !auth.isAdmin){
        console.log('admin : ')
        auth.allowRoute('Access Denied');
        return next({name:'Access Denied',state:{allowed:true}})
    }
    next();
})


export default router;