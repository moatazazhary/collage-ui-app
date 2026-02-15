<script setup>
import { onMounted, ref } from 'vue';
import { useDegreeStore } from '../../../stores/degree.store';
import { useFileStore } from '../../../stores/file.store';
import Title from '../../auth/components/Title.vue';
import { useDropDown } from '../../../composables/useDropDown';
const fileStore = useFileStore();
const degreeStore = useDegreeStore();

const fileRequests = ref([]);
const degreeRequests = ref([]);
const currentCard = ref('');

const {openSelectList,dropDownName,closeSelectList,activeClass} = useDropDown();
function toggle(id){
    if(currentCard.value)
        if(currentCard.value === id){
            currentCard.value = '';
            closeSelectList();
            return
        }
    
    currentCard.value = id;
    openSelectList('any');

}
onMounted(async()=>{
    fileRequests.value = await fileStore.getUserRequests();
    degreeRequests.value = await degreeStore.getUserDegreeRequests();
});

</script>

<template>

    <div class="p-6">
        <Title>طلبات الشهادات والملفات</Title>

        <div v-if="fileRequests?.length <=0 && degreeRequests?.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
            <p class="text-xs mt-1 font-normal text-black-500">لا توجد بيانات بعد...</p>
        </div>

        <div v-if="fileRequests?.length > 0 || degreeRequests?.length > 0" class="mt-10 flex gap-3 flex-col">


            <div v-if="degreeRequests.length > 0" v-for="request in degreeRequests" class="bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.02)]">
                <div class="flex justify-between ">
                    <div class="flex items-center gap-5">
                        <i class="bx bx-book-open text-2xl text-black-200"></i>
                        <div >
                            <h5 class="text-sm text-black-700 font-medium">طلب شهادة بكالوريوس</h5>
                            <p class="text-xs text-black-500 font-normal mt-2">شهادة</p>
                        </div>
                    </div>
                    <div class="w-24 flex justify-end">
                        <span class="text-xs text-center font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="request?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':request?.status === 'مكتمل' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{request?.status}}</span>

                    </div>
                </div>
                <hr class="text-black-100 my-5">
                <div >   
                    <div  @click="openSelectList(request.id)" class="cursor-pointer flex items-center justify-between text-black-500">
                        <h4 class="text-sm font-normal">تفاصيل </h4>
                        <i class="bx  text-xl " :class="dropDownName === request.id ? 'bx-minus':'bx-plus'"></i>
                    </div>
                    <div v-if="dropDownName === request.id" :class="activeClass"  class="bg-hover p-5 rounded-lg mt-3">
                        <p v-if="request?.notes" class="text-black-500 text-xs font-light">
                           {{request?.notes}}
                        </p>

                        <p v-else class="text-black-500 text-xs font-light">
                            لا توجد بيانات
                        </p>
                    </div>
                </div>
            </div>


            <div v-if="fileRequests.length > 0" v-for="request in fileRequests" class=" bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.02)]">
                <div class="flex justify-between">
                    <div class="flex items-center gap-5">
                        <i class="bx bx-file text-2xl text-black-200"></i>
                        <div >
                            <h5 class="text-sm text-black-700 font-medium">{{ request?.title }}</h5>
                            <p class="text-xs text-black-500 font-normal mt-2">{{request?.type}}</p>
                        </div>
                    </div>
                    <div class="w-24 flex justify-end">
                        <span class="text-xs text-center font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="request?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':request?.status === 'تم التأكيد' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{request?.status}}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>