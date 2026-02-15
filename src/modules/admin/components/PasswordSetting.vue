<script setup>
import { ref } from 'vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';

    const show = ref(false);

    function togglePass(){
        show.value = !show.value
    }
</script>

<template>
     <form  class="mt-10 ">

            <div class="w-1/2 flex flex-col gap-5">
                <div class="w-full">
                    <label for="" class="text-sm font-normal ">كلمة السر الحالية</label>
                    <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-lock-alt text-black-200 ' ></i>
                        <input placeholder="*******" :type="show ? 'text':'password'" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button @click="togglePass" type="button" class="outline-none bg-none border-none">
                            <i class="bx  text-black-200" :class="show ? 'bx-show':'bx-hide'"></i>
                        </button>
                    </div>
                </div>

                <div class="w-full">
                    <label for="" class="text-sm font-normal ">كلمة السر الجديدة</label>
                    <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-lock-alt text-black-200 ' ></i>
                        <input placeholder="*******" :type="show ? 'text':'password'" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button @click="togglePass" type="button" class="outline-none bg-none border-none">
                            <i class="bx  text-black-200" :class="show ? 'bx-show':'bx-hide'"></i>
                        </button>
                    </div>
                </div>
                <div class="w-full">
                    <label for="" class="text-sm font-normal ">تأكيد كلمة السر</label>
                    <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-lock-alt text-black-200 ' ></i>
                        <input placeholder="*******" :type="show ? 'text':'password'" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button @click="togglePass" type="button" class="outline-none bg-none border-none">
                            <i class="bx  text-black-200" :class="show ? 'bx-show':'bx-hide'"></i>
                        </button>
                    </div>
                </div>

                <div class="mt-5">
                    <SubmitBtn>حفظ كلمة السر الجديدة</SubmitBtn>
                </div>
            </div>
        </form>
</template>