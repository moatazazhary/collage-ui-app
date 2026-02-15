<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { otpCodeHandler,loading } from '../services/otpCodeHandler';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import Title from '../components/Title.vue';
import Copyright from '../../core/components/Copyright.vue';
import Logo from '../components/Logo.vue';
import { useAuthStore } from '../../../stores/authStore';

const auth = useAuthStore();

const timeLeft = ref(5*60);

let interval = null;

const formatedTime = computed(()=>{
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = Math.floor(timeLeft.value % 60);

    return (
        String(minutes).padStart(2,'0') + ":"+ String(seconds).padStart(2,'0')
    )
})


async function otpCode(){
    const inputs = document.querySelectorAll('.js-otp-inputs input');
    
    let values = '';
    for(let index = inputs.length - 1; index >= 0; index--) {
        values += inputs[index].value
    }

    if(values.length < 6){
        loading.value = false;
        return ;
    }
    loading.value = false;
    await auth.verifyOTP(parseInt(values),auth.identifier);
}

function maskEmail(email){
    const [name,domain] = email.split('@');
    if(name.length <=4){
        return name[0] + '***@'+domain;
    }

    const first = name.slice(0,2);
    const last = name.slice(-2);
    return `${first}***${last}@${domain}`;
}


watch(loading,async ()=>{
    if(loading.value)
        await otpCode();
})
onMounted(()=>{
    otpCodeHandler();
    interval = setInterval(() => {
        if(timeLeft.value > 0)
            timeLeft.value--;
        else
            clearInterval(interval);

    }, 1000);


})

onBeforeUnmount(()=>{
    clearInterval(interval);
})
</script>

<template>

     <div class="flex items-center h-screen">
        <Logo></Logo>
        <div class="py-10 px-8 md:p-40 md:w-full">
            <Title>
                تأكيد رمز ال OTP
            </Title>

            <form @submit.prevent="otpCode()" class="mt-10">
                <p class="text-l font-normal mt-1 text-black-500">لقد أرسلنا رمز التحقق إلى <strong class=" text-black-700">{{maskEmail(auth.identifier)}}</strong></p>

                <div class="js-otp-inputs mt-10 flex items-center justify-center gap-1 flex-row md:justify-start">
                    <input  type="text" inputmode="numeric" pattern="[0-9]*"  maxlength="1" placeholder="-"  class=" w-14  h-14  text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">
                    <input  type="text" maxlength="1" placeholder="-" disabled class="w-14  h-14 text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">
                    <input  type="text" maxlength="1" placeholder="-" disabled class="w-14  h-14 text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">
                    <input  type="text" maxlength="1" placeholder="-" disabled class="w-14  h-14 text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">
                    <input  type="text" maxlength="1" placeholder="-" disabled class="w-14  h-14  text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">
                    <input  type="text" maxlength="1" placeholder="-" disabled class="w-14  h-14  text-l border-[1.5px] placeholder:text-xs border-black-100 text-center rounded-2xl text-gray-400 ">

                </div>

                <div class="text-xs flex items-center gap-2 font-normal mt-10">
                    <span class="text-secondary font-medium text-l">{{formatedTime}}</span>
                    <button class="text-black-500 outline-none border-none">إعادة إرسال الرمز ؟</button>
                </div>

                <div class="mt-10">
                    <SubmitBtn :loading="auth.loading">تحقق</SubmitBtn>
                </div>
            </form>
        </div>
    </div>
    <Copyright></Copyright>
</template>