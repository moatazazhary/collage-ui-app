<script setup>
import { onMounted, watch } from 'vue';
import { useAuthStore } from '../../../stores/authStore';
import { profileInfoSchema } from '../../../utils/validations/authValidations/profileInfoSchema';
import Title from '../../auth/components/title.vue';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import {useField, useForm} from 'vee-validate'

const auth = useAuthStore();

const {handleSubmit,errors} = useForm({
    validationSchema:profileInfoSchema,
    initialValues : auth.user,
})

const {value:email,errorMessage:emailError} = useField('email');
const {value:phone,errorMessage:phoneError} = useField('phone');


const onSubmit = handleSubmit((data)=>{
    console.log('data : ',data)
})


</script>

<template>

    <div class="p-6">
        <Title>المعلومات الشخصية</Title>

        <form @submit.prevent="onSubmit" class="mt-10 flex flex-col gap-5">
            <div class="w-full">
                <label for="" class="text-sm font-normal ">الإسم</label>
                <div  class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-user text-black-200'></i>
                    <input disabled v-model="auth.user.fullname"  placeholder="محمد عمر" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
                
            </div>

            <div class="w-full">
                <label for="" class="text-sm font-normal ">الرقم الجامعي</label>
                <div class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-id-card text-black-200'></i>
                    <input disabled v-model="auth.user.identifier" placeholder="18/11229114" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
                
            </div>

            <div class="w-full">
                <label for="" class="text-sm font-normal ">العنوان</label>
                <div  class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-target-lock text-black-200'></i>
                    <input disabled v-model="auth.user.address"  placeholder="شندي" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
                
            </div>

            <div class="w-full">
                <label for="" class="text-sm font-normal ">البريد الإلكتروني</label>
                <div :class="{'validation-error':emailError}" class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-envelope text-black-200'></i>
                    <input placeholder="example@gmail.com" v-model="email" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
                <ErrorSpan class="mt-5" v-if="emailError">{{emailError }}</ErrorSpan>
            </div>

            <div class="w-full">
                <label for="" class="text-sm font-normal ">رقم الهاتف</label>
                <div :class="{'validation-error':phoneError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-phone text-black-200'></i>
                    <input v-model="phone" placeholder="1xxxxxxxx" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                    <span class="text-sm text-black-500 border-r-2 pr-2 border-black-200">
                    249
                    </span>

                </div>
                <ErrorSpan class="mt-5" v-if="phoneError">{{phoneError }}</ErrorSpan>
                
            </div>

            <div class="mt-5">
                <SubmitBtn :loading="auth.loading">حفظ</SubmitBtn>
            </div>
        </form>
    </div>

</template>