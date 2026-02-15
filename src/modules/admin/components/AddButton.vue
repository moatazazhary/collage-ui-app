<script setup>

    const props = defineProps({
        toggleModal : Function,
        state : Function,
        modalName : String
    });

</script>

<template>
    <button @click="toggleModal(modalName),state()" class="outline-none border-none cursor-pointer rounded-lg shadow-xl bg-primary text-back text-sm font-normal py-2 px-4 flex items-center gap-2 transition-colors hover:bg-gradient">
        <i class="bx bx-plus text-xl"></i>
        <span><slot></slot></span>
    </button>
</template>