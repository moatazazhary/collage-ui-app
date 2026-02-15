<script setup>
import { useModalStore } from '../../../stores/modal.store';


    const modal = useModalStore();


</script>

<template>
    <div @click="modal.closeModal" :class="{'dropdown-active':modal.IsActive , 'dropdown-unactive':!modal.IsActive}" class="z-40 absolute flex items-center justify-center w-full h-full right-0 top-0 backdrop-blur-sm bg-hover">
        <div @click.stop class="relative p-6 bg-white shadow-lg shadow-light rounded-lg">
            <i @click="modal.closeModal" class="bx bx-x text-xl text-black-500 transition-colors hover:text-secondary cursor-pointer absolute top-6 left-6"></i>
            <h3 class="text-l font-medium text-black-700">
                <slot name="title"></slot>
            </h3>
                            
            <div class="mt-10">
                <slot name="form">

                </slot>
            </div>
        </div>
    </div>
</template>