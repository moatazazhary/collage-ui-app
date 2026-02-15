<script setup>
import { computed, onMounted, ref } from 'vue';
import SectionTitle from '../components/SectionTitle.vue';
import Modal from '../components/Modal.vue';
import { useModalStore } from '../../../stores/modal.store';
import Modals from '../../../constants/modals';
import RequestNoteForm from '../components/RequestNoteForm.vue';
import { useRoute } from 'vue-router';


import  UPLOAD_URL  from '../../../utils/helper';
import { useFileStore } from '../../../stores/file.store';
import { useDate } from '../../../composables/useDate';

const fileStore = useFileStore();
const modal = useModalStore();

const router = useRoute();
const {dateFormat} = useDate();

const file = ref('');

onMounted(async()=>{
    file.value = await fileStore.getFile(router.params.id);
    console.log('data :',file.value)
})

const isRejectAction = ref(false);

async function submit(status=''){

    const result = isRejectAction.value ? await fileStore.reject(file.value.id,status) :  await fileStore.approve(file.value.id)
    
    if(result)
        file.value.status = result;
}


const fileUrl = computed(()=>{
    if(!file.value.path) return '';
    return `${UPLOAD_URL}/${file.value?.path}`
})




</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                تفاصيل الطلب
            </template>
            <template #description>
                هنا توجد تفاصيل الطلب المعني وكل ما يمكنك فعله به
            </template>
        </SectionTitle>
    </div>
    
    <div v-if="file" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">

        <div class="flex items-center gap-3">
            <h3 class="text-sm font-medium text-black-700">حالة الطلب :</h3>
            <span class="text-[10px] font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="file?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':file?.status === 'تم التأكيد' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{file?.status}}</span>
        </div>
        <div class="mt-5 flex gap-6 flex-col md:flex-row md:gap-30 lg:gap-40">
            <div>
                <h2 class="text-l font-medium text-black-700"> البيانات الأساسية :</h2>
                <div class="flex flex-col gap-3 mt-5">
                     <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">مقدم الطلب :</p>
                        <span class="text-xs font-normal text-black-500">{{file?.uploadedBy}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">نوع الطلب :</p>
                        <span class="text-xs font-normal text-black-500">{{file?.type}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">نوع الملف  :</p>
                        <span class="text-xs font-normal text-black-500">{{file?.extension}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">حجم الملف  :</p>
                        <span class="text-xs font-normal text-black-500">{{(file?.size / 1024 / 1024).toLocaleString('en-US',{
                            minimumFractionDigits:2,
                            maximumFractionDigits:2
                        })+'MB'}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">تاريخ الطلب :</p>
                        <span class="text-xs font-normal text-black-500">{{ dateFormat(file?.createdAt)}}</span>
                    </div>
                    
                </div>
            </div>

            <div>
                <div class="flex flex-col gap-3 mt-5">
                    <div v-if="file.department" class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> القسم :</p>
                        <span class="text-xs font-normal text-black-500">{{ file?.department }}</span>
                    </div>

                    <div v-if="file.semester" class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> الفضل الدراسي :</p>
                        <span class="text-xs font-normal text-black-500">{{ file?.semester }}</span>
                    </div>

                    <div v-if="file.courseName" class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> المادة :</p>
                        <span class="text-xs font-normal text-black-500"> {{ file?.courseName }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="file.status !== 'مرفوض' && file.status !== 'تم التأكيد' " class="mt-10 flex items-center gap-5">
            <button @click="submit(),isRejectAction = false" type="button" :disabled="fileStore.loading && !isRejectAction" class="cursor-pointer shadow-lg outline-none border-none bg-success-light rounded-lg text-success w-auto py-3.5 px-10 text-sm font-medium transition-colors hover:bg-success hover:text-success-light disabled:bg-[#9da4d1] ">
                <span v-if="fileStore.loading ? isRejectAction? true:false : true"> قبول</span>
                <div v-if="fileStore.loading && !isRejectAction" class="flex items-center gap-2 justify-center">
                    <span>جاري </span>
                    <i class='bx bx-loader-circle text-lg animate-spin'></i>
                </div>
            </button>

            <button @click="submit(file.status),isRejectAction = true" type="button" :disabled="fileStore.loading && isRejectAction" class="cursor-pointer shadow-lg outline-none border-none bg-alertIconback-red rounded-lg text-alertText-red w-auto py-3.5 px-10 text-sm font-medium transition-colors hover:bg-alertText-red hover:text-alertIconback-red disabled:bg-[#9da4d1] ">
                <span v-if="fileStore.loading ? isRejectAction? false:true : true"> رفض</span>
                <div v-if="fileStore.loading && isRejectAction" class="flex items-center gap-2 justify-center">
                    <span>جاري </span>
                    <i class='bx bx-loader-circle text-lg animate-spin'></i>
                </div>
            </button>
        </div>

        <div class="mt-5">
            <h2 class="text-l font-medium text-black-700"> الملف:</h2>
            <div class="mt-5 max-w-11/12 max-h-full">
                <iframe :src="fileUrl" width="100%" height="100%"></iframe>
            </div>  
        </div>



       

   
    </div>


    <!-- <div v-if="isImageModalActive" @click="isImageModalActive = false" :class="{'dropdown-active':isImageModalActive}" class="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-[rgba(0,0,0,.3)]">
        <img @click.stop class="absolute top-1/2 left-1/2 -translate-1/2 max-w-11/12 max-h-11/12 shadow-xl" :src="imageUrl" alt="">
    </div> -->

    <Modal v-if="modal.modalName === Modals.REJECT_DEGREE_REQUEST">
        <template #title>
            {{
                isRejectAction ? 'رفض الطلب' :'قبول الطلب'
            }}
        </template>
        <template #form>
            <RequestNoteForm :submit="submit" :reject="isRejectAction" :request-id="'something'"></RequestNoteForm>
        </template>
    </Modal>
</template>

