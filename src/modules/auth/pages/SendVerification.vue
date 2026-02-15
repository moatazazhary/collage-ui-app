<script setup >
import Copyright from '../../core/components/Copyright.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import Logo from '../components/Logo.vue';
import Title from '../components/Title.vue';

import {useField,useForm} from 'vee-validate'
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useAuthStore } from '../../../stores/authStore';
import { sendVerificationSchema } from '../../../utils/validations/authValidations/sendVerification';
const auth = useAuthStore();
const {handleSubmit} = useForm({validationSchema : sendVerificationSchema,initialValues:auth.identifier && auth.identifier.includes('@') ? {email:auth.identifier} : ''});
const {value:email,errorMessage:emailError} = useField("email");


console.log('ide : ',auth.identifier)
const onSubmit = handleSubmit(async (data)=>{
    data.identifier = auth.identifier.includes('@') ? '' : auth.identifier;

    await auth.sendOTP(data.identifier,data.email);
})

</script>

<template>

    <div class="block md:flex items-center h-screen">
        <Logo></Logo>
    
        <div class="py-10 px-8 md:p-40 md:w-full">
            <Title>التحقق من البريد</Title>

            <form @submit.prevent="onSubmit()" class="mt-10">
                <div class="mt-10 ">
                    <label for="" class="text-sm font-normal ">البريد الإلكتروني</label>
                    <div :class="{'validation-error':emailError}" class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                        <i class='bx bx-envelope text-black-200'></i>
                        <input v-model="email" placeholder="example@gmail.com" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                    </div>
                    <ErrorSpan v-if="emailError" class="mt-2">{{ emailError }}</ErrorSpan>
                </div>

                <div class="mt-10">
                    <SubmitBtn :loading="auth.loading">أرسل الرمز</SubmitBtn>
                </div>
            </form>
        </div>
    </div>

    <Copyright></Copyright>
</template>