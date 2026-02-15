<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../../../stores/authStore';

const authStore = useAuthStore();
</script>

<template>
    <div class="mt-24 p-6">
        <h3 class="text-lg text-black-700 font-medium">استكشف</h3>
        <div v-if="authStore.isStudent" class="mt-5 grid grid-cols-2 gap-3 grid-rows-2">
            <router-link to="/courses" class="bg-alertback-yellow p-6 flex items-center gap-3 rounded-lg border-[0.1px] border-alertText-yellow">
                <i class='bx bx-book-open rounded-lg text-xl text-alertText-yellow bg-alertIconback-yellow p-2'></i>
                <h4 class="text-sm font-medium">المحاضرات</h4>
            </router-link>
            <router-link to="/courses" class="bg-[#ebecf5] p-6 flex items-center gap-3 rounded-lg border-[0.1px] border-primary">
                <i class='bx bx-book rounded-lg text-xl text-primary bg-[#c7cce5] p-2' ></i>
                <h4 class="text-sm font-medium">المواد</h4>
            </router-link>
            <router-link to="/search" class="bg-alertback-red p-6 flex items-center gap-3 rounded-lg border-[0.1px] border-alertText-red">
                <i class='bx bx-file rounded-lg text-xl text-alertText-red bg-alertIconback-red p-2'></i>
                <h4 class="text-sm font-medium">البحوث</h4>
            </router-link>
            <router-link to="/degree-apply" class="bg-[#f3fafa] p-6 flex items-center gap-3 rounded-lg border-[0.1px] border-success">
                <i class='bx bx-book-reader rounded-lg text-xl text-success bg-success-light p-2'></i>
                <h4 class="text-sm font-medium">قدّم لشهادة</h4>
            </router-link>
        </div>
        <p v-if="authStore.isDoctor" class="text-xs mt-5 leading-6 text-black-500 font-normal text-center">مرحباً بك في منصة كلية الإقتصاد والعلوم الإدارية <strong>د. {{authStore.user.fullname}}</strong> , هنا يمكنك رفع الملفات والمحاضرات عبر نافذة <strong>"ملفاتي"</strong> </p>
    </div>
</template>