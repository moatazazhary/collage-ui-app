<script setup>
import { ref, watch } from 'vue';
import dropdownLists from '../../../constants/dropdownLists';
import { useDropDown } from '../../../composables/useDropDown';

 const {openSelectList,closeSelectList,activeClass,dropDownName} = useDropDown();

    const props = defineProps({
        importFile : Boolean,
        totalData:Number,
        currentPage:Number,
        totalPages:Number,
        getPage:Function
    });




const limit = ref(10);
const page = ref(1);


watch([page,limit],()=>{
    props.getPage({
        page:page.value,
        limit:limit.value
    })
});

    


</script>

<template>
    <div class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
        <div class="flex justify-between items-center">

            <div class="">
                <div class="cursor-pointer relative w-16 input-box h-8  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg">

                    <div @click.stop="openSelectList(dropdownLists.SELECT_LIMIT)" class="flex items-center cursor-pointer gap-2">
                        <input placeholder="10" :value="limit" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button type="button" class=" cursor-pointer outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-black-200"></i>
                        </button>
                    </div>

                    <div @click="closeSelectList" v-if="dropDownName === dropdownLists.SELECT_LIMIT" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="value in 10" @click="limit=value" :key="value" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ value }}</span>
                        </button>
                    </div>
                </div>

            </div>
            
            <div class="flex items-center gap-3">
                <div class="">
                    <div class="cursor-pointer w-24 input-box h-8 flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <input placeholder="All" value="All" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button type="button" class=" cursor-pointer outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-black-200"></i>
                        </button>
                    </div>
                </div> 
                <div class="">
                    <button v-if="importFile" class="outline-none border-none cursor-pointer rounded-lg shadow-xl bg-primary text-back text-xs font-normal py-2 px-4 flex items-center gap-2 transition-colors hover:bg-gradient">
                        <i class="bx bx-cloud-download text-l"></i>
                        <span>إستيراد</span>
                    </button>
                </div>
            </div>
        </div>
        <hr class="text-black-100 my-5">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="text-xs border-b border-black-100 text-right text-black-500">
                    <slot name="table-header">

                    </slot>
                
                </thead>
                <tbody>
                        <slot name="table-body">
                        </slot>
                </tbody>
            </table>
        </div>

        <hr class="text-black-100 my-5">
        <div v-if="totalPages>1" class="flex items-center justify-center gap-4">
            <!-- go to start -->
            <button @click="page=1" class="cursor-pointer outline-none border border-black-200 rounded-lg py-1.5 text-black-500 px-4 text-xs font-normal">البداية</button>
            <!-- prevuse button -->
            <button v-if="currentPage>1" @click="page--" class="outline-none rounded-full flex items-center justify-center p-1.5 cursor-pointer transition-colors text-black-500 font-normal bg-hover hover:bg-primary hover:text-back hover:shadow-xl"><i class="bx bx-chevron-right text-xl"></i></button>
            <!-- pages numbers buttons -->
            <div class="flex items-center gap-1.5">
                <button v-for="value in totalPages" @click="page = value" :class="value=== currentPage ? 'bg-primary text-back shadow-xl': 'text-black-500'" class="outline-none rounded-full flex items-center justify-center w-6 text-xs h-6 cursor-pointer transition-colors  font-normal bg-hover hover:bg-primary hover:text-back hover:shadow-xl">{{ value }}</button>
            </div>
            <!-- next button -->
            <button v-if="totalPages>1 && totalPages != currentPage" @click="page++" class="outline-none rounded-full flex items-center justify-center p-1.5 cursor-pointer transition-colors text-black-500 font-normal bg-hover hover:bg-primary hover:text-back hover:shadow-xl"><i class="bx bx-chevron-left text-xl"></i></button>

            <!-- go to end -->
            <button @click="page = totalPages" class="cursor-pointer outline-none border border-black-200 rounded-lg py-1.5 text-black-500 px-4 text-xs font-normal">النهاية</button>
        </div>
    </div>
</template>

<style>

    th{
        padding: 10px;
    }
    td{
        padding: 15px 10px;
    }
</style>