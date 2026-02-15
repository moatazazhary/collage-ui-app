<script setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import H2 from '../../core/components/H2.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import Copyright from '../../core/components/Copyright.vue';
import Logo from '../components/Logo.vue';
import { loginSchema } from '../../../utils/validations/authValidations/loginSchema';

import {useField,useForm} from 'vee-validate'
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useAuthStore } from '../../../stores/authStore';

const {handleSubmit} = useForm({validationSchema : loginSchema});

const {value:identifier,errorMessage:identifierError} = useField("identifier");
const {value:password,errorMessage:passwordError} = useField("password") 

const auth = useAuthStore();


if(auth.getCurrentIdentifier){
    identifier.value = auth.getCurrentIdentifier
}
const error = reactive({
    success : true,
    message : ''
});

const onSubmit = handleSubmit(async (data)=>{
    const response = await auth.login(data);
    if(response){
        error.message = response.message;
        error.success = response.success;
    }
})

    const show = ref(false);

    function togglePass(){
        show.value = !show.value
    }
</script>
<template>

    <div class="flex items-center h-screen">
        <Logo></Logo>
        <div class="p-10 w-full md:p-40 md:w-full">

            
            <!-- <img class="w-40 h-40 mx-auto drop-shadow-2xl" src="../../../../public/collage-logo.svg" alt="">
            <hr class="text-[#eee] h-0.5"> -->
            <div class="">
                <H2>تسجبل الدخول</H2>
                <p class="text-xs font-normal mt-1 text-black-500">مرحبًا، أهلاً بعودتك</p>
            
                <form @submit.prevent="onSubmit" class="mt-20">

                    <div v-if="!error.success" class="p-3 mb-4 rounded-lg bg-alertback-red">
                        <ErrorSpan>{{ error.message }}</ErrorSpan>
                    </div>

                    <div class="w-full">
                        <label for="" class="text-sm font-normal ">البريد الإلكتروني أو الرقم الجامعي</label>
                        <div :class="{'validation-error':identifierError}" class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                            <i class='bx bx-id-card text-black-200'></i>
                            <input v-model="identifier" placeholder="example@gmail.com OR 18/11229114" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                        </div>
                        
                        <ErrorSpan class="mt-2" v-if="identifierError">{{ identifierError }}</ErrorSpan>
                    </div>

                    <div class="mt-5">
                        <label for="" class="text-sm font-normal ">كلمة السر</label>
                        <div :class="{'validation-error':passwordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                            <i class='bx bx-lock-alt text-black-200 ' ></i>
                            <input v-model="password" placeholder="*******" :type="show ? 'text':'password'" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                            <button @click="togglePass" type="button" class="outline-none bg-none border-none">
                                <i class="bx  text-black-200" :class="show ? 'bx-show':'bx-hide'"></i>
                            </button>
                        </div>
                        <ErrorSpan class="mt-2" v-if="passwordError">{{ passwordError }}</ErrorSpan>
                    </div>
                    <div class="mt-10">
                    <SubmitBtn :loading="auth.loading">دخول</SubmitBtn>
                    </div>
                </form>
        </div>
        </div>
    </div>
    <Copyright></Copyright>
</template>



<style>

    .input-box:focus-within {
        transition: .3s all;
        border : 2px solid var(--color-primary);
        color: var(--color-primary);
    }
    .input-box:focus-within i {
        transition: .3s all;
        color: var(--color-primary);
    }
    .input-box input:focus{
        outline: none !important;
    }

</style>