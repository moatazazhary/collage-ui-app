<script setup>

const props = defineProps({
    course:Object
})
</script>

<template>
    <div class="group p-3 cursor-pointer flex items-center justify-between rounded-lg bg-back shadow-lg shadow-[rgba(0,0,0,.03)] hover:shadow-[rgba(0,0,0,.04)] transition-colors">
        <h5 class="text-sm font-medium text-black-700 group-hover:text-secondary transition-colors">{{ props.course?.name }}</h5>
        <i class='bx bx-chevron-left text-3xl text-black-200 group-hover:text-secondary transition-colors' ></i>
    </div>
</template>