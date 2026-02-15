<script setup>
import { useAlertStore } from '../../../stores/alert.store';

    const alert = useAlertStore();

</script>

<template>

    <div :class="alert.activeClass,alert.alertClass" class="absolute top-5 left-1/2 -translate-x-1/2 py-3 px-4 rounded-lg border-[1.5px] flex items-center z-40 justify-center gap-2">
        <i class="bx text-xl" :class="alert.iconClass"></i>
        <p class="text-xs font-normal">{{ alert.message }}</p>
    </div>


</template>


<style scoped>
    .active{
        animation: active .3s linear forwards alternate;
    }

    .un-active{
        animation: un-active .3s linear forwards alternate;
    }

    @keyframes active {
        from{
            transform: translateY(-10px);
            opacity: 0;
        }to{
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes un-active {
        from{
            transform: translateY(0);
            opacity: 1;
        }to{
            transform: translateY(-10px);
            opacity: 0;
        }
    }
</style>