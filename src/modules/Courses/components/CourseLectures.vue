<script setup>
import UPLOAD_URL from '../../../utils/helper';

const props = defineProps({
    lectures:Array
});


</script>

<template>
    <div  class="mt-10 transition-all">
        <div class="flex flex-col gap-3">

            <div v-if="props.lectures.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
                <p class="text-xs mt-1 font-normal text-black-500">لا توجد بيانات بعد...</p>
            </div>
            <div v-if="props.lectures.length > 0" v-for="item in props.lectures" class="flex items-center justify-between bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.02)]">
                <div class="flex items-center gap-5">
                    <span class="rounded-full w-9 h-9 flex justify-center items-center bg-hover text-secondary">01</span>
                    <div >
                        <h5 class="text-sm text-black-700 font-medium">{{ item?.lecture?.title }}</h5>
                        <p class="text-xs text-black-500 font-normal mt-2">ملف {{item?.file?.extension}}</p>
                    </div>
                </div>
                <a :href="`${UPLOAD_URL}/${item?.file?.path}`" download class="outline-none border-none cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-cloud-download'></i>
                </a>
            </div>
        </div>
    </div>
</template>