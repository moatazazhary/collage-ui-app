import { ref } from "vue";

export const loading = ref(false);

export const otpCodeHandler = ()=>{
    const otpInputs = document.querySelectorAll('.js-otp-inputs input');
    const mainInput = otpInputs[0];
    const totalInputs = otpInputs.length;
    mainInput.addEventListener("input",(e)=>{
        const value = e.target.value;
        if(!/^[0-9]$/.test(value)){
            e.target.value = '';
            return;
        }

        let placed = false;

        for (let i = totalInputs -1; i >= 1; i--) {
            if(!otpInputs[i].value){
                otpInputs[i].value = value;
                placed = true;
                break;
            }
            
        }

        if(!placed){
            mainInput.value = value;
            loading.value = true
        }
        else{
            mainInput.value = '';
            loading.value = false
        }
            
    })

    mainInput.addEventListener('keydown',(e)=>{
        if(e.key === 'Backspace'){
            if(mainInput.value){
                mainInput.value = '';
                loading.value = false
                return
            }
            for (let i = 0; i <= totalInputs -1; i++){
                if(otpInputs[i].value){
                    otpInputs[i].value = "";
                    break;
                }
            }
        }
    })
}