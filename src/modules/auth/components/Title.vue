<script setup lang="ts">

import { useRouter } from 'vue-router';
import H2 from '../../core/components/H2.vue';

    const router = useRouter();

    function goBack(){
        window.history.length > 1 ? router.back() : router.push('/');
    }


</script>

<template>
    <div class="cursor-pointer flex items-center gap-4 ">
        <i @click="goBack" class='bx bx-chevron-right rounded-full p-1 border border-black-100 text-3xl transition-colors hover:border-secondary hover:text-secondary' ></i>
        <H2><slot></slot></H2>
    </div>
</template>