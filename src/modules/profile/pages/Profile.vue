<script setup >
    import { useAuthStore } from '../../../stores/authStore';
    const auth = useAuthStore();

    console.log('user : ',auth.user)
</script>

<template>

    <div>
        <div id="div" class=" bg-linear-to-r from-primary to-gradient relative p-6 h-72 w-full bg-primary rounded-bl-3xl rounded-br-3xl">
            <div class="flex items-center gap-2">
                <i class='bx bx-user text-back text-xl' ></i>
                <h3 class="text-xs font-normal text-back">حسابي</h3>
            </div> 

            <div class="absolute top-8/12 left-1/2 -translate-1/2 text-center flex items-center justify-center flex-col">
                <img class="w-20 h-20 border-2 border-back rounded-full object-cover" src="../../../../public/images/indian-male-man-svgrepo-com.svg" alt="">
                <h3 class="mt-4 text-xs font-semibold text-back">{{ auth.isDoctor ? 'د. ' + auth.user?.fullname  : auth.user?.fullname }}</h3>
                <p class="text-xs font-normal text-primary-light mt-2">قسم {{ auth.user?.department ?? 'غير محدد' }}</p>
            </div>
        </div>
    
        <h3 class="p-6 text-lg font-medium text-black-700">عام</h3>

        <div class=" flex flex-col gap-2">
            <router-link to="/personal-info" class=" px-6 py-3 cursor-pointer flex items-center justify-between rounded-lg transition-colors hover:bg-hover">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary"><i class="bx bx-user"></i></span>
                    <h5 class="text-sm text-black-700 font-medium">المعلومات الشخصية</h5>
                </div>
                <button class="outline-none border-none cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-chevron-left'></i>
                </button>
            </router-link>

            <router-link to="/myrequests" class=" px-6 py-3 cursor-pointer flex items-center justify-between rounded-lg transition-colors hover:bg-hover">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary"><i class="bx bx-book-open"></i></span>
                    <h5 class="text-sm text-black-700 font-medium">طلبات الشهادات والملفات</h5>
                </div>
                <button class="outline-none border-none cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-chevron-left'></i>
                </button>
            </router-link>

            <router-link to="/change-password" class=" px-6 py-3 cursor-pointer flex items-center justify-between rounded-lg transition-colors hover:bg-hover">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary"><i class="bx bx-lock"></i></span>
                    <h5 class="text-sm text-black-700 font-medium">تغيير كلمة المرور</h5>
                </div>
                <button class="outline-none border-none cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-chevron-left'></i>
                </button>
            </router-link>
        </div>

        <h3 class="p-6 text-lg font-medium text-black-700">أخرى</h3>

        <router-link to="/about-platform" class=" flex flex-col gap-2">
            <div class=" px-6 py-3 cursor-pointer flex items-center justify-between rounded-lg transition-colors hover:bg-hover">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary"><i class="bx bx-info-circle"></i></span>
                    <h5 class="text-sm text-black-700 font-medium">عن المنصة</h5>
                </div>
                <button class="outline-none border-none cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-chevron-left'></i>
                </button>
            </div>
        </router-link>

        <div class=" flex flex-col gap-2">
            <div @click="auth.logout" class=" px-6 py-3 cursor-pointer flex items-center justify-between rounded-lg transition-colors hover:bg-hover">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary"><i class="bx bx-log-in-circle"></i></span>
                    <h5 class="text-sm text-black-700 font-medium">تسجيل الخروج</h5>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

#div{

/* Create repeating dots using radial-gradient */
background-image: radial-gradient(rgba(255,255,255,.2) 5%, transparent 4%);

/* Size of each repeating tile */
background-size: 20px 20px;

/* Optional: center dots in each tile */
background-position: 0 0;
}
</style>