<script setup>
import { computed, onMounted, ref } from 'vue';
import { useDegreeStore } from '../../../stores/degree.store';
import SectionTitle from '../components/SectionTitle.vue';
import Modal from '../components/Modal.vue';
import { useModalStore } from '../../../stores/modal.store';
import Modals from '../../../constants/Modals';
import RequestNoteForm from '../components/RequestNoteForm.vue';
import { useRoute } from 'vue-router';


import  UPLOAD_URL  from '../../../utils/helper';
import { useDate } from '../../../composables/useDate';

const degreeStore = useDegreeStore();
const modal = useModalStore();

const router = useRoute();
const {dateFormat} = useDate();

const degree = ref('');

onMounted(async()=>{
    degree.value = await degreeStore.getDegreeRequest(router.params.id);

    if(degree.value.status === 'قيد الإنتظار'){
        degree.value.status = await degreeStore.open(degree.value.id)
    }
})

const isRejectAction = ref(false);

async function submit(data){
    const result = isRejectAction.value ? await degreeStore.reject(degree.value.id,data) :  await degreeStore.approve(degree.value.id,data)
    if(result){
        degree.value.status = result.status;
        degree.value.notes = result.notes;
    }
}

const personalPhotoUrl = computed(()=>{
    if(!degree.value.personalPhoto) return '';
    return `${UPLOAD_URL}/${degree.value?.personalPhoto}`
})

const idCardPhotoUrl = computed(()=>{
    if(!degree.value.idCardPhoto) return '';
    return `${UPLOAD_URL}/${degree.value?.idCardPhoto}`
})

const paymentPhotoUrl = computed(()=>{
    if(!degree.value.paymentPhoto) return '';
    return `${UPLOAD_URL}/${degree.value?.paymentPhoto}`
})



const isImageModalActive = ref(false);


const imageUrl = ref('');
function openImageModal(url){
    imageUrl.value = url;
    isImageModalActive.value = true
}


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
    
    <div v-if="degree" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">

        <div class="flex items-center gap-3">
            <h3 class="text-sm font-medium text-black-700">حالة الطلب :</h3>
            <span class="text-[10px] font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="degree?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':degree?.status === 'مكتمل' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{degree?.status}}</span>
        </div>

        <div v-if="degree.status === 'مرفوض' || degree.status === 'مكتمل'" class="mt-5">
            <h3 class="text-sm font-medium text-black-700">{{ degree.status === 'مرفوض'? 'سبب الرفض :' : 'ارشادات القبول :' }}</h3>
            <span class="mt-2 text-[10px] font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="degree?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':degree?.status === 'مكتمل' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{degree?.notes}}</span>
        </div>
        <div class="mt-5 flex gap-6 flex-col md:flex-row md:gap-30 lg:gap-40">
            <div>
                <h2 class="text-l font-medium text-black-700"> البيانات الشخصية :</h2>
                <div class="flex flex-col gap-3 mt-5">
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">الإسم بالعربي :</p>
                        <span class="text-xs font-normal text-black-500">{{degree?.fullnameArabic}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">الإسم بالإنجليزي :</p>
                        <span class="text-xs font-normal text-black-500">{{degree?.fullnameEnglish}}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700">تاريخ الطلب :</p>
                        <span class="text-xs font-normal text-black-500">{{ dateFormat(degree?.createdAt)}}</span>
                    </div>
                    
                </div>
            </div>

            <div>
                <h2 class="text-l font-medium text-black-700"> بيانات الدفع :</h2>
                <div class="flex flex-col gap-3 mt-5">
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> البنك :</p>
                        <span class="text-xs font-normal text-black-500">{{ degree?.bank }}</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> رقم الحساب :</p>
                        <span class="text-xs font-normal text-black-500">{{ degree?.accountNumber }}</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <p class="text-xs font-medium text-black-700"> الفاتورة :</p>
                        <span class="text-xs font-normal text-black-500"> {{ degree?.totalPrice +' '+ 'ج.س' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <h2 class="text-l font-medium text-black-700"> أنواع الشهادات المطلوبة :</h2>
            <div class="flex flex-row flex-wrap gap-3 mt-5">
                <span v-for="type in degree?.degreeTypes" class="text-[10px] font-medium px-2 w-fit h-fit py-1 rounded-lg border text-primary border-primary bg-[#ebecf5]">{{type}}</span>
            </div>
        </div>

        <div class="mt-5">
            <h2 class="text-l font-medium text-black-700"> المستندات :</h2>
            <div class="flex items-center gap-10 flex-wrap mt-5">

                <div>
                    <p class="text-xs font-medium text-black-700">الصورة الشخصية :</p>
                    <img  @click="openImageModal(personalPhotoUrl)" class="object-cover w-60 h-60 rounded-xl mt-3" :src="personalPhotoUrl" alt="">
                </div>
                <div>
                    <p class="text-xs font-medium text-black-700">صورة الإثبات :</p>
                    <img  @click="openImageModal(idCardPhotoUrl)" class="object-cover w-60 h-60 rounded-xl mt-3" :src="idCardPhotoUrl" alt="">
                </div>

                <div class="">
                    <p class="text-xs font-medium text-black-700">صورة الإشعار :</p>
                    <img @click="openImageModal(paymentPhotoUrl)" class="object-cover w-60 h-60 rounded-xl mt-3" :src="paymentPhotoUrl" alt="">
                </div>
            </div>
        </div>


        <div v-if="degree.status !== 'مرفوض' && degree.status !== 'مكتمل' " class="mt-10 flex items-center gap-5">
            <button @click="modal.toggleModal(Modals.REJECT_DEGREE_REQUEST),isRejectAction = false" type="button" :disabled="degreeStore.loading && !isRejectAction" class="cursor-pointer shadow-lg outline-none border-none bg-success-light rounded-lg text-success w-auto py-3.5 px-10 text-sm font-medium transition-colors hover:bg-success hover:text-success-light disabled:bg-[#9da4d1] ">
                <span v-if="degreeStore.loading ? isRejectAction? true:false : true"> قبول</span>
                <div v-if="degreeStore.loading && !isRejectAction" class="flex items-center gap-2 justify-center">
                    <span>جاري </span>
                    <i class='bx bx-loader-circle text-lg animate-spin'></i>
                </div>
            </button>

            <button @click="modal.toggleModal(Modals.REJECT_DEGREE_REQUEST),isRejectAction = true" type="button" :disabled="degreeStore.loading && isRejectAction" class="cursor-pointer shadow-lg outline-none border-none bg-alertIconback-red rounded-lg text-alertText-red w-auto py-3.5 px-10 text-sm font-medium transition-colors hover:bg-alertText-red hover:text-alertIconback-red disabled:bg-[#9da4d1] ">
                <span v-if="degreeStore.loading ? isRejectAction? false:true : true"> رفض</span>
                <div v-if="degreeStore.loading && isRejectAction" class="flex items-center gap-2 justify-center">
                    <span>جاري </span>
                    <i class='bx bx-loader-circle text-lg animate-spin'></i>
                </div>
            </button>
        </div>

   
    </div>


    <div v-if="isImageModalActive" @click="isImageModalActive = false" :class="{'dropdown-active':isImageModalActive}" class="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-[rgba(0,0,0,.3)]">
        <img @click.stop class="absolute top-1/2 left-1/2 -translate-1/2 max-w-11/12 max-h-11/12 shadow-xl" :src="imageUrl" alt="">
    </div>

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

