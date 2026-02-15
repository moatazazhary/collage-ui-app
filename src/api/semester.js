import api from "./services/api"


export default {
    GetAllSemesters(){
        return api.get('/semesters')
    }
}