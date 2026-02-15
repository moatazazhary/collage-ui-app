import { reactive } from "vue";

export default function() {
    const status = reactive({});

    function regester(id){

        status[id] = status[id] ? status[id] : {type:'password',icon:'bx-hide'}
        return status[id];
    }
    

    function togglePassword(id){
        if (!status[id]) return;

        if(status[id].type === 'password'){
            status[id].type = 'text'
            status[id].icon = 'bx-show'
        }else{
            status[id].type = 'password'
            status[id].icon = 'bx-hide'
        }
    }

    return {togglePassword,regester}
}