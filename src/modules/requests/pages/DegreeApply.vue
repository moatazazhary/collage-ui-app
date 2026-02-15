<script setup lang="ts">
import Title from '../../auth/components/title.vue';
import Stepper from '../components/Stepper.vue';
</script>

<template>
    <div class="p-6 pb-14">
        <Title>التقديم للشهادة</Title>
        <div class="mt-14">
            <div>
                <i class='bx bx-book-reader rounded-lg text-3xl text-success bg-success-light p-3'></i>
                <h4 class="mt-3 text-l font-medium">التقديم للشهادة</h4>
                <p class="mt-2 text-xs font-normal text-black-500">هنا يمكنك التقديم لشهادة عن طريق إكمال الخطوات </p>
            </div>

            <div class="mt-5">
                <Stepper></Stepper>
            </div>
        </div>
    </div>
</template>

