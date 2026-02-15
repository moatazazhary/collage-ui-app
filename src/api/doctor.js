import api from "./services/api"

export default {
    getAllDoctors({page =1,limit=10,sort='asc'}){
        return api.get('/doctors',{params:{
            page:page,
            limit:limit,
            sort:sort
        }});
    },

    create(data){
        return api.post('/doctors',data);
    },
    update(id,data){
        return api.put(`/doctors/${id}`,data);
    },
    GetDoctor(id){
        return api.get(`/doctors/${id}`);
    }

}