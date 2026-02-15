import api from "./services/api"

export default {
    OverView(){
        return api.get('/dashboard/overview');
    },
    FileStatusSummary(){
        return api.get('/dashboard/files-status-summary');
    },
     DegreeStatusSummary(){
        return api.get('/dashboard/degrees-status-summary');
    },
    FileActivitySummary(){
        return api.get('/dashboard/files-activity-summary');
    }
}