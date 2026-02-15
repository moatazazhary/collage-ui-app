<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import Copyright from '../../core/components/Copyright.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import Logo from '../components/Logo.vue';
import Title from '../components/title.vue';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../../stores/authStore';
import { setPasswordShcema } from '../../../utils/validations/authValidations/setPasswordSchema';
import usePasswordInputControl from '../../../composables/usePasswordInputControl';
import ErrorSpan from '../../core/components/ErrorSpan.vue';

const auth = useAuthStore();

const {handleSubmit,errors} = useForm({
    validationSchema:setPasswordShcema
})

const {value:newPassword,errorMessage:newPasswordError} = useField('newPassword')
const {value:confirmPassword,errorMessage:confirmPasswordError} = useField('confirmPassword')


const {togglePassword,regester} = usePasswordInputControl()

const onSubmit = handleSubmit(async (data)=>{
    await auth.setPassword(auth.identifier,data.newPassword,data.confirmPassword);
})


const show1 = ref(false);
const show2 = ref(false);
function togglePass1(){
    show1.value = !show1.value
}

function togglePass2(){
    show2.value = !show2.value
}
</script>

<template>
    <div class="flex items-center h-screen">
        <Logo></Logo>
        <div class="py-10 px-8 md:p-40 md:w-full">
            <Title>تعيين كلمة المرور</Title>
            
            <form @submit.prevent="onSubmit" class="mt-10">
                <p class="text-xs font-normal mt-1 text-black-500">يرجى ملء الحقول أدناه لإعادة ضبط كلمة المرور الخاصة بك</p>
                <div class="mt-10">
                    <label for="" class="text-sm font-normal ">كلمة السر الجديدة</label>
                    <div :class="{'validation-error':newPasswordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-lock-alt text-black-200 ' ></i>
                        <input v-model="newPassword" placeholder="*******" :type="show1 ? 'text':'password'" class=" w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button @click="togglePass1" type="button" class="cursor-pointer outline-none bg-none border-none">
                            <i class="bx  text-black-200" :class="show1 ? 'bx-show':'bx-hide'"></i>
                        </button>
                    </div>
                    <ErrorSpan v-if="newPasswordError" class="mt-2">{{ newPasswordError }}</ErrorSpan>
                </div>

                <div class="mt-5">
                    <label for="" class="text-sm font-normal ">تأكيد كلمة السر</label>
                    <div :class="{'validation-error':confirmPasswordError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-lock-alt text-black-200 ' ></i>
                        <input v-model="confirmPassword" placeholder="*******" :type="show2 ? 'text':'password'" class=" w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button @click="togglePass2" type="button" class="cursor-pointer outline-none bg-none border-none">
                            <i class="bx  text-black-200" :class="show2 ? 'bx-show':'bx-hide'"></i>
                        </button>
                    </div>
                    <ErrorSpan v-if="confirmPasswordError" class="mt-2">{{ confirmPasswordError }}</ErrorSpan>
                </div>

                <div class="mt-10">
                    <SubmitBtn :loading="auth.loading">تعيين</SubmitBtn>
                </div>
            </form>

            
        </div>
    </div>

    <Copyright></Copyright>
</template>