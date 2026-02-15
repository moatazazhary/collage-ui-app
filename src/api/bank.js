import api from "./services/api"

export default {
    GetAllBanks(){
        return api.get('/banks');
    }
}