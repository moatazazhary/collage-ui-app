<script setup>

    defineProps({
        loading:Boolean,
    });

</script>

<template>
    <button type="submit" :disabled="loading" class="cursor-pointer shadow-lg outline-none border-none bg-primary rounded-lg text-back w-full py-3.5 text-sm font-medium transition-colors hover:bg-gradient disabled:bg-[#9da4d1] ">
        <slot v-if="!loading"></slot>
        <div v-if="loading" class="flex items-center gap-2 justify-center">
            <span>جاري </span>
            <i class='bx bx-loader-circle text-lg animate-spin'></i>
        </div>
    </button>
</template>