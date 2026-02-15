<script setup>

const props = defineProps({
    otherFiles:Array
})
</script>

<template>
    <div  class="mt-10 transition-all">
        <div class="flex flex-col gap-3">
            <div v-if="props.otherFiles.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
                <p class="text-xs mt-1 font-normal text-black-500">لا توجد بيانات بعد...</p>
            </div>
            <div v-if="props.otherFiles.length > 0" v-for="item in props.otherFiles" class="flex items-center justify-between bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.02)]">
                <div class="flex items-center gap-5">
                    <img class="w-6" :src="`../../../../public/icons/${value}.svg`" alt="">
                    <div >
                        <h5 class="text-sm text-black-700 font-medium">{{item?.course?.name}}</h5>
                        <p class="text-xs text-black-500 font-normal mt-2">{{item?.file?.type}}</p>
                    </div>
                </div>
                <button class="outline-none border-none flex items-center gap-2 cursor-pointer text-2xl font-normal text-black-500 transition-colors hover:text-secondary">
                    <i class='bx bx-cloud-download'></i>
                </button>
            </div>
        </div>
    </div>
</template>