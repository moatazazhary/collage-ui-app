<script setup>
import { computed ,reactive} from 'vue';
import usePasswordInputControl from '../../../composables/usePasswordInputControl';
import Title from '../../auth/components/title.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';

import {useField,useForm} from 'vee-validate'
import { changePassShcema } from '../../../utils/validations/authValidations/changePasswordSchema';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useAuthStore } from '../../../stores/authStore';

const auth = useAuthStore();
const {handleSubmit,errors} = useForm({
    validationSchema:changePassShcema
})


const {value:oldPassword,errorMessage:oldPasswordError} = useField('oldPassword');
const {value:newPassword,errorMessage:newPasswordError} = useField('newPassword')
const {value:confirmPassword,errorMessage:confirmPasswordError} = useField('confirmPassword')


const error = reactive({
    success : true,
    message : ''
});


const {togglePassword,regester} = usePasswordInputControl()

const onSubmit = handleSubmit(async (data)=>{
    const response = await auth.changePassword(data);

    if(!response.success){
        error.success = response.success;
        error.message = response.message;
    }
})

</script>

<template>

    <div class="p-6">
        <Title>تغيير كلمة السر</Title>

        <form @submit.prevent="onSubmit" class="mt-10 flex flex-col gap-5">
            <div v-if="!error.success" class="p-3 mb-4 rounded-lg bg-alertback-red">
                <ErrorSpan>{{ error.message }}</ErrorSpan>
            </div>
            <div class="w-full">
                <label for="" class="text-sm font-normal ">كلمة السر الحالية</label>
                <div :class="{'validation-error':oldPasswordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-lock-alt text-black-200 ' ></i>
                    <input v-model="oldPassword" placeholder="*******" type="password"  autocomplete="new-password" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                    <button v-if="false" @click="togglePassword('password1')" type="button" class="outline-none bg-none border-none">
                        <i class="bx  text-black-200" :class="regester('password1').icon"></i>
                    </button>
                </div>

                <ErrorSpan class="mt-5" v-if="oldPasswordError">{{ oldPasswordError }}</ErrorSpan>
            </div>

            <div class="w-full">
                <label for="" class="text-sm font-normal ">كلمة السر الجديدة</label>
                <div :class="{'validation-error':newPasswordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-lock-alt text-black-200 ' ></i> 
                    <input v-model="newPassword" placeholder="*******" type="password" autocomplete="false" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                    <button v-if="false" @click="togglePassword('password2')" type="button" class="outline-none bg-none border-none">
                        <i class="bx  text-black-200" :class="regester('password2').icon"></i>
                    </button>
                </div>
                 <ErrorSpan class="mt-5" v-if="newPasswordError" >{{ newPasswordError }}</ErrorSpan>
            </div>
            <div class="w-full">
                <label for="" class="text-sm font-normal ">تأكيد كلمة السر</label>
                <div :class="{'validation-error':confirmPasswordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-lock-alt text-black-200 ' ></i>
                    <input v-model="confirmPassword" placeholder="*******" type="password" autocomplete="new-password" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                    <button v-if="false" @click="togglePassword('password3')" type="button" class="outline-none bg-none border-none">
                        <i class="bx  text-black-200" :class="regester('password3').icon"></i>
                    </button>
                </div>
                <ErrorSpan class="mt-5" v-if="confirmPasswordError">{{ confirmPasswordError }}</ErrorSpan>
            </div>

            <div class="mt-5">
                <SubmitBtn :loading="auth.loading" >حفظ كلمة السر الجديدة</SubmitBtn>
            </div>
        </form>
    </div>

</template>