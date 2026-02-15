<script setup>
import Aside from '../components/Aside.vue'

</script>

<template>
    <!-- main layout -->
    <div class="md:flex md:w-full">
        <Aside></Aside>

        <router-view class="w-full" />
    </div>
</template>

<style scoped>

#div{

    /* Create repeating dots using radial-gradient */
    background-image: radial-gradient(rgba(255,255,255,.2) 5%, transparent 4%);

    /* Size of each repeating tile */
    background-size: 20px 20px;

    /* Optional: center dots in each tile */
    background-position: 0 0;
}
</style>