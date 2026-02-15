<script setup>
import { onBeforeMount } from 'vue';
import { useAsideStore } from '../../../stores/asideStore';

    const asideStore = useAsideStore();

    onBeforeMount(()=>{
        asideStore.close();
    })

    // @click="asideStore.close" :class="`${asideStore.activeClass} md:minu-active ${asideStore.isOpen ? 'w-full' : 'w-auto'}`"
</script>

<template>
    <aside @click="asideStore.close" :class="`${asideStore.activeClass} ${asideStore.isOpen ? 'w-full' : 'w-auto'}`" class=" translate-x-64 z-30 h-full bg-hover backdrop-blur-sm fixed md:relative md:translate-x-0 md:w-auto md:h-auto  md:block">
        <div @click.stop class="h-screen overflow-hidden w-64 p-6 bg-white shadow-lg shadow-light">
            <div class="flex items-center flex-col text-center gap-2">
                <img class="w-20" src="../../../../public/collage-logo.svg" alt="">
                <h3 class="text-xs font-medium text-black-700">كلية الإقتصاد والعلوم الإدارية</h3>
            </div>
            <hr class="text-black-100 my-10">

            <nav class="mt-10 flex justify-center flex-col gap-3"> 
                <router-link @click="asideStore.close" to="/admin"  class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-bar-chart text-lg"></i>
                    <span>نظرة عامة</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/degree-requests" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-book-open text-lg"></i>
                    <span>طلبات الشهادات</span>
                </router-link>
                <router-link @click="asideStore.close" to="/admin/file-requests" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-file-blank text-lg"></i>
                    <span>طلبات الملفات</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/students" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-user text-lg"></i>
                    <span>الطلاب</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/doctors" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-bar-chart text-lg"></i>
                    <span>هيئة التدريس</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/courses" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-book text-lg"></i>
                    <span>المواد</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/departments" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-collection text-lg"></i>
                    <span>الأقسام</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/semesters" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-shape-square text-lg"></i>
                    <span>السمسترات</span>
                </router-link>

                <router-link @click="asideStore.close" to="/admin/settings" class="flex items-center gap-2 text-sm font-normal py-2 px-3 rounded-lg text-black-500 transition-colors hover:bg-hover hover:text-secondary">
                    <i class="bx bx-cog text-lg"></i>
                    <span>الإعدادات</span>
                </router-link>

            </nav>
        </div>
    </aside>
</template>

<style scoped>
    .active-link{
        color: var(--color-primary-light);
        background-color: var(--color-hover);
    }


    .menu-active{
        animation: menu-active .2s linear forwards alternate;
    }

    .menu-unactive{
        animation: menu-unactive .2s linear forwards alternate;
    }

    @keyframes menu-active {
        from{
            transform: translateX(256px);
            opacity: 0;
        }to{
            transform: translateX(-256px);
            opacity: 1;
        }
    }

    @keyframes menu-unactive {
        from{
            transform: translateX(-256px);
            opacity: 1;
        }to{
            transform: translateX(256px);
            opacity: 0;
        }
    }
</style>