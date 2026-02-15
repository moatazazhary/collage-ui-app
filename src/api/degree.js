import api from "./services/api"

export default {
    getAllDegreeTypes(){
        return api.get('/degree-types');
    },
    GetAllRequests({page =1,limit=10,sort='asc'}){
        return api.get('/degrees',{params:{
            page:page,
            limit:limit,
            sort:sort
        }});
    },
    GetUserDegreeRequests(){
        return api.get('/degrees/user-requests')
    },
    
    GetRequest(id){
        return api.get(`/degrees/${id}`);
    },

    Open(id){
        return api.post(`/degrees/open/${id}`);
    },
    Approve(id,data){
        return api.post(`/degrees/approve/${id}`,data);
    },
    Reject(id,data){
        return api.post(`/degrees/reject/${id}`,data);
    },
    RequestDegree(request){
        return api.post('/degrees/request',request);
    }
}