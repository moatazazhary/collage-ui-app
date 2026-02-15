// import Details from './pages/Details.vue'
// import Search from './pages/Search.vue'

export default [
    {path:'/search',component:()=> import('./pages/Search.vue'),meta:{requireAuth:true}},
    {path:'/search/details/:id',component:()=> import('./pages/Details.vue'),meta:{requireAuth:true}},
]