<script setup>
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import ChangePassword from '../../profile/pages/ChangePassword.vue';
import AccountSetting from '../components/AccountSetting.vue';
import PasswordSetting from '../components/PasswordSetting.vue';
import PlatformSetting from '../components/PlatformSetting.vue';
import SectionTitle from '../components/SectionTitle.vue';
import { reactive, ref } from 'vue'; 


const tapName = ref('accountSetting')

</script>

<template>
    <SectionTitle>
        <template #title>
            الإعدادات
        </template>
        <template #description>
            هنا توجد الإعدادات وكل ما يمكنك فعله بهم
        </template>
    </SectionTitle>

    <div class="mt-5 rounded-lg bg-white shadow-lg shadow-light p-6">
        <p class="text-xs text-black-500">يأتي لاحقاً...</p>
    </div>

    <div v-if="false" class="mt-5 rounded-lg bg-white shadow-lg shadow-light p-6">
        <div class="flex items-center gap-10">
            <button @click="tapName = 'accountSetting'" :class="{'text-secondary':tapName === 'accountSetting'}" type="button" class="outline-none border-none bg-none text-sm flex items-center gap-2 font-medium text-black-500 cursor-pointer transition-colors hover:text-secondary">
                <i class="bx bx-user text-lg"></i>
                <span>إعدادات الحساب</span>
            </button>

            <button @click="tapName = 'password'" :class="{'text-secondary':tapName === 'password'}" type="button" class="outline-none border-none bg-none text-sm flex items-center gap-2 font-medium text-black-500 cursor-pointer transition-colors hover:text-secondary">
                <i class="bx bx-lock text-lg"></i>
                <span>كلمة المرور</span>
            </button>

             <button @click="tapName = 'platform'" type="button" :class="{'text-secondary':tapName === 'platform'}" class=" outline-none border-none bg-none text-sm flex items-center gap-2 font-medium text-black-500 cursor-pointer transition-colors hover:text-secondary">
                <i class="bx bx-lock text-lg"></i>
                <span>المنصة</span>
            </button>
        </div>
        <hr class="my-5 text-black-200">

        <AccountSetting v-if="tapName === 'accountSetting'"></AccountSetting>
        

        <PasswordSetting v-if="tapName === 'password'"></PasswordSetting>

        <PlatformSetting v-if="tapName === 'platform'"></PlatformSetting>
        
    </div>
</template>