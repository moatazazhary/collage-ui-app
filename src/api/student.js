import api from "./services/api"

export default {
    GetAllStudents({page =1,limit=10,sort='asc'}){
        return api.get('/students',{params:{
            page:page,
            limit:limit,
            sort:sort
        }});
    },
    GetStudent(id){
        return api.get(`/students/${id}`);
    },

    create(data){
        return api.post('/students',data);
    },
    update(id,data){
        return api.put(`/students/${id}`,data);
    }

}