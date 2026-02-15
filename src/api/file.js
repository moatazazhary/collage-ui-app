import api from "./services/api"

import qs from 'qs';

export default {
    GetAll({page =1,limit=10,sort='asc'}){
        return api.get('/files',{params:{
            page:page,
            limit:limit,
            sort:sort
        }});
    },
    GetUserRequests(){
        return api.get('/user-requests/');
    },

    GetFile(id){
        return api.get(`/files/${id}`);
    },

    Approve(id){
        return api.post(`/files/approve/${id}`);
    },
    Reject(id,status){
        return api.post(`/files/reject/${id}`,{params:{
            status:status
        }});
    },
    search({search = null ,departments=null,page =1,limit=10,sort='asc'}){
        
        return api.get('/search',{
            params:{
                search,
                departments,
                page,
                limit,
                sort
            },paramsSerializer:params=> qs.stringify(params,{
                arrayFormat:'repeat'
            })
        })
    },
    uploadFile(data){
        return api.post('/files',data)
    },

    getUserFiles(){
        return api.get('/user-files');
    }
    // create(data){
    //     return api.post('/courses',data);
    // }
    // ,
    // update(id,data){
    //     return api.put(`/courses/${id}`,data);
    // }

}