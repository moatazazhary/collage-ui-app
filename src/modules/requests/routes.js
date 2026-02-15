// import DegreeApply from './pages/DegreeApply.vue'

export default [
    {path:'/degree-apply',component:()=>import('./pages/DegreeApply.vue'),meta:{requireAuth:true}}
]