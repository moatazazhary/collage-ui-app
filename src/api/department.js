import api from "./services/api"


export default {
    GetAllDepartments(){
        return api.get('/departments')
    }
}