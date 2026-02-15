import api from "./services/api"

export default {
    GetAll({page =1,limit=10,sort='asc'}){
        return api.get('/courses',{params:{
            page:page,
            limit:limit,
            sort:sort
        }});
    },
    GetAllByDepartment({departmentId,semesterNum}){
        return api.get('/courses-by-department/',{params:{
            departmentId,
            semesterNum
        }});
    },

    getUserCourses(){
        return api.get('/user-courses');
    },

    GetCourse(id){
        return api.get(`/courses/${id}`);
    },
    GetCourseDetails(id){
        return api.get(`/courses/details/${id}`);
    },
    create(data){
        return api.post('/courses',data);
    }
    ,
    update(id,data){
        return api.put(`/courses/${id}`,data);
    },
    CreateLecture(data){
        return api.post('/lectures',data);
    }

}