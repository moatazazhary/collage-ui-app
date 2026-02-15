<script setup>
import { useModalStore } from '../../../stores/modal.store';

    const modal = useModalStore();

</script>

<template>
    <div @click="modal.closeModal" :class="{'modal-active' : modal.IsActive,'modal-unactive' : !modal.IsActive}" class="z-40 w-full h-screen absolute flex items-end top-0 left-0 backdrop-blur-sm bg-[rgba(0,0,0,.1)]">
        <div @click.stop class="relative p-6 bg-white drop-shadow-2xl w-full rounded-t-3xl">
            <button type="button" @click="modal.closeModal" class="cursor-pointer flex items-center justify-center absolute top-5 left-5 bg-none outline-none border-none text-black-500 text-3xl"><i class="bx bx-x"></i></button>
            <slot></slot>
        </div>
    </div>
</template>


<style scoped>
    .modal-active{
        animation: active .2s linear forwards alternate;
    }

    .modal-unactive{
        animation: unactive .2s linear forwards alternate;
    }

    @keyframes active {
        from{
            transform: translateY(10px);
            opacity: 0;
        }to{
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes unactive {
        from{
            transform: translateY(0);
            opacity: 1;
        }to{
            transform: translateY(10px);
            opacity: 0;
        }
    }
</style>