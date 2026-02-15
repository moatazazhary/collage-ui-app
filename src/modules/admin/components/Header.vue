<script setup>
import { onMounted, ref } from 'vue';
import { useDate } from '../../../composables/useDate';
import { useAsideStore } from '../../../stores/asideStore';
import dropdownLists from '../../../constants/dropdownLists';
import { useDropDown } from '../../../composables/useDropDown';
import { useAuthStore } from '../../../stores/authStore';

const {dateFormat} = useDate();
const {openSelectList,closeSelectList,activeClass,dropDownName} = useDropDown();
const asideStore = useAsideStore();
const auth = useAuthStore();
const date = ref(new Date());

async function logout(){
    closeSelectList()
    await auth.logout();
}
onMounted(()=>{
    date.value = new Date()
})
</script>
<template>
    <header class=" flex items-center justify-between bg-white shadow-lg shadow-light py-3 px-6">
        <div class="flex items-center gap-5">
            <div class="md:hidden">
                <i @click="asideStore.open()" class='bx bx-menu rounded-full p-1 border border-black-100 text-3xl transition-colors hover:border-secondary hover:text-secondary ' ></i>
            </div>
            <div class="flex items-center text-xs font-normal text-black-500 gap-2">
                <i class="bx bx-calendar text-lg"></i>
                <span>{{dateFormat(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`)}}</span>
            </div>
        </div>
        <div>
            <!-- TODO: add notifications -->
            <div class="relative">
                <img @click="openSelectList(dropdownLists.LOGOUT_DROPDOWN)" class="cursor-pointer w-10 h-10 object-cover" src="../../../../public/images/indian-male-man-svgrepo-com.svg" alt="">
                <div v-if="dropDownName === dropdownLists.LOGOUT_DROPDOWN" :class="activeClass" @click.stop class="z-20 absolute top-10 left-0 rounded-lg shadow-lg shadow-light bg-white">

                    <button @click="logout" class="px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                        <i class="bx bx-book text-lg"></i>
                        <span>خروج</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>