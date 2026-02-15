<script setup lang="ts">
import Copyright from '../components/Copyright.vue';
import Loading from '../components/Loading.vue';

</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <div class="flex items-center flex-col justify-center">
            <img class="w-40 h-40 mx-auto drop-shadow-2xl block" src="../../../../public/collage-logo.svg" alt="">
            <h2 class="mt-3 text-lg text-black-700 font-medium">كلية الإقتصاد والعلوم الإدارية</h2>
            <Loading></Loading>
        </div>
        <Copyright></Copyright>
    </div>
   
</template>