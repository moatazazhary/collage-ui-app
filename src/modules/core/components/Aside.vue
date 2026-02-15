<script setup>

    import { useRoute } from 'vue-router';
import { useAuthStore } from '../../../stores/authStore';
    const authStore = useAuthStore();
    
    const route = useRoute();
</script>

<template>
    <aside class="fixed bottom-0 left-0 w-full z-20 p-6 pt-4 bg-primary md:relative md:w-auto md:h-screen md:overflow-hidden md:flex md:justify-center md:items-center">
        <nav class="flex flex-row gap-2 justify-between md:flex-col md:gap-10">
            <router-link to="/" end class="flex items-center gap-2 flex-col text-[10px] font-medium outline-none border-none cursor-pointer text-back transition-colors hover:text-primary-light">
                <i class='bx bx-home-alt text-xl' ></i>
                <span>الرئيسية</span>
            </router-link>
            <router-link v-if="authStore.isStudent" to="/courses" class="flex items-center gap-2 flex-col text-[10px] font-medium outline-none border-none cursor-pointer text-back transition-colors hover:text-primary-light">
                <i class='bx bx-book-open text-xl' ></i>
                <span>المحاضرات</span>
            </router-link>
            <router-link to="/myfiles" class="flex items-center gap-2 flex-col text-[10px] font-medium outline-none border-none cursor-pointer text-back transition-colors hover:text-primary-light">
                <i class='bx bx-file text-xl' ></i>
                <span>ملفاتي</span>
            </router-link>
            <router-link to="/profile" class="flex items-center gap-2 flex-col text-[10px] font-medium outline-none border-none cursor-pointer text-back transition-colors hover:text-primary-light">
                <i class='bx bx-user text-xl' ></i>
                <span>انت</span>
            </router-link>
        </nav>
    </aside>
</template>

<style scoped>
    .active-link{
        color: var(--color-primary-light);
    }
</style>