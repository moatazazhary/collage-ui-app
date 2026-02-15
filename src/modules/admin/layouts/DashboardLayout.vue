<script setup >
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';


</script>

<template>
    <div class="flex">
        <Aside></Aside>
        <div class="w-full overflow-y-scroll h-screen">
            <Header></Header>
            <div class="w-full p-6">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>



<style>
::-webkit-scrollbar{
    width: 7px;
    border-radius: 100px;
}
::-webkit-scrollbar-track{
    background-color: var(--color-hover); 
    border-radius: 100px;
}
::-webkit-scrollbar-thumb{
    background-color:var(--color-primary);
    border-radius: 100px;
} 

</style>