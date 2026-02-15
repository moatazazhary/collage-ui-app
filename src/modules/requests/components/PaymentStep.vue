<script setup>
import { useField, useForm } from 'vee-validate';
import { useDropDown } from '../../../composables/useDropDown';
import dropdownLists from '../../../constants/dropdownLists';
import { useBankStore } from '../../../stores/bank.store';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import { ref, onMounted, computed } from 'vue';
import { paymentStepSchema } from '../../../utils/validations/degreeValidations.js/paymentStep';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useDegreeStore } from '../../../stores/degree.store';
import { useUploadImage } from '../../../composables/useUploadImage';

const {select,selectedItem,dropDownName,activeClass,openSelectList} = useDropDown();
const dropdowns = dropdownLists;

const degree = useDegreeStore();
const bank = useBankStore();

const {photos,readImage} = useUploadImage()

const {handleSubmit} = useForm({validationSchema:paymentStepSchema});
const {value:bankId,errorMessage:bankError} = useField('bankId');

const props = defineProps({
    nextStep : Function
})

const data = ref([])
onMounted(async ()=>{
    await bank.getAll();
    data.value = bank.data
})




    const bankName = ref('');

    const bankDetails = computed(()=>{
        const bank = data.value.filter(bank => bank.bankName === bankName.value)
        bankId.value = bank[0]?.id
        return bank;
    });

    const bankClasses = computed(()=>{
        switch(bankName.value){
            case 'بنك الخرطوم':
                return {class : 'from-red-700 via-red-500 to-red-600',icon:'bankak-logo.svg'}
            case 'بنك فيصل الإسلامي':
                return {class : 'from-purple-700 via-purple-500 to-purple-600',icon:'fawry-logo.svg'}
            case 'بنك امدرمان':
                return {class : 'from-emerald-700 via-emerald-500 to-emerald-600',icon:'ocash-logo.svg'}
            default :
                return {class:'',icon:''}
        }
    })

    const isCopied = ref(false);
    async function copyText (accountNum){
        await navigator.clipboard.writeText(accountNum);
        isCopied.value = true;
        setTimeout(() => {
            isCopied.value = false
        }, 1000);
    }

    const onSubmit = handleSubmit((data)=>{

        if(photos.paymentPhoto.file !== null){
            data.paymentPhoto = photos.paymentPhoto.file
            props.nextStep(data)
        }else{
            photos.paymentPhoto.file === null? photos.paymentPhoto.errors.length === 0 ?  photos.paymentPhoto.errors.push('الصورة مطلوبة'):'' : photos.paymentPhoto.errors = []
        }
    })
</script>

<template>
    <div  class="mt-5 rounded-lg shadow-lg shadow-light">
        <h5 class="text-sm font-medium text-black-700 text-center">الدفع</h5>

        <form @submit.prevent="onSubmit" class="mt-5">
            
            <div class="flex items-center mt-4 gap-3 p-4 rounded-lg shadow-lg bg-white shadow-light ">
                <h5 class="text-sm text-black-700 font-medium">الفاتورة</h5>
                <p class="text-xs text-black-500 font-normal mt-1">{{ degree.bill }} ج.س</p>
            </div>
            <div class="mt-5">
                <label for="" class="text-sm font-normal ">طريقة الدفع</label>
                <div class="relative mt-3">
                    <div :class="{'validation-error':bankError}" @click="openSelectList(dropdowns.PAYMENT_DROPDWON)" class=" relative input-box h-[52px] flex items-center cursor-pointer pr-2 pl-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                        <i class='bx bx-credit-card text-black-200'></i>
                        <input placeholder="بنكك" disabled :value="selectedItem" type="text" class="pointer-events-none w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                        <i :class="dropDownName ? 'bx-chevron-down':'bx-chevron-up'" class='bx text-2xl text-black-200'></i>
                    
                    </div>

                    <ErrorSpan class="mt-3" v-if="bankError">{{ bankError }}</ErrorSpan>

                    <div v-if="dropDownName === dropdowns.PAYMENT_DROPDWON" :class="activeClass" class="absolute left-0 w-full top-12 z-20 bg-white rounded-lg shadow-lg shadow-light">
                        <option v-for="bank in data" @click="select(bank.bankName) ,bankName = bank.bankName"  class="text-sm font-normal text-black-700 p-4 transition-colors cursor-pointer hover:bg-hover hover:text-secondary">{{ bank.bankName }}</option>

                    </div>
                </div>

                <div v-if="bankName" :class="bankClasses.class" class="relative bg-linear-to-br mt-5 p-5 rounded-xl shadow-lg shadow-light">
                    <img class="w-10 h-10 absolute top-5 left-5" :src="`../../../../public/icons/${bankClasses.icon}`" alt="">
                    <div>
                        <div class="flex items-center gap-5">
                            <h3 class="text-back font-semibold text-sm">{{ bankDetails[0]?.bankName }}</h3>
                            <button type="button" @click="copyText()" class="cursor-pointer text-back transition-colors flex items-center gap-2 px-3 py-2 outline-none border border-[rgba(255,255,255,.5)] rounded-lg backdrop-blur-2xl bg-[rgba(255,255,255,.04)] hover:text-primary-light ">
                                <i class="bx " :class="isCopied ? 'bx-check':'bx-copy'"></i>
                                <span class="font-normal text-xs">{{isCopied ? 'تم ':'نسخ'}}</span>
                            </button>
                        </div>
                        <div class="mt-5">
                            <p class="text-xs font-normal text-[#eee]"><strong>رقم الحساب : </strong>{{bankDetails[0]?.accountNumber}}</p>
                            <p class="mt-2 text-xs font-normal text-[#eee]"><strong>الإسم : </strong>{{ bankDetails[0]?.accountName }}</p>
                        </div>
                    </div>
                </div>

                
            </div>



            <div v-if="selectedItem" class="mt-5">
                <h5 class="text-sm font-normal text-black-700">صورة الإشعار</h5>
                <input id="paymentPhoto" accept="image/*" @change="readImage($event,'paymentPhoto')" type="file" hidden>
                <label v-if="photos.paymentPhoto.file === null" for="paymentPhoto" class="cursor-pointer flex items-center gap-3 mt-4 p-3 rounded-lg bg-hover border-2 border-dashed border-primary">
                    <i class="bx bx-images text-3xl text-black-200"></i>
                    <div>
                        <p class="text-xs font-medium text-primary">أضغط لرفع الصورة</p>
                        <span class="text-[10px] font-light text-black-500">JPG, PNG.JPEG ، فقط وتكون أقل من 1MB</span>
                    </div>
                </label>



                <div v-if="photos.paymentPhoto.file !== null" class="mt-4 p-3 rounded-lg bg-back border-2 border-hover">
                    <div class=" flex items-center justify-between  ">
                        <div class="flex items-center gap-3">
                            <i class="bx bx-images text-3xl text-secondary"></i>
                            <p class="text-xs font-medium text-black-500">{{photos.paymentPhoto.file?.name}}</p>
                        </div>
                        <span>
                            <i class="bx text-xl" :class="photos.paymentPhoto.uploading ? 'bx-time text-black-500':'bx-check text-success'"></i>
                        </span>

                    </div>
                    <div v-if="photos.paymentPhoto.uploading" class="mt-4 relative h-1 w-full bg-hover">
                        <span class="block absolute top-0 right-0 h-full bg-primary" :style="{width : photos.paymentPhoto.progress + '%'}"></span>
                    </div>
                </div>

                <ErrorSpan class="mt-3" v-if="photos.paymentPhoto.errors.length > 0" v-for="error in photos.paymentPhoto.errors" >{{ error }}</ErrorSpan>

            </div>

            <div class="mt-5">
                <SubmitBtn :loading="degree.loading">إرسال</SubmitBtn>
            </div>
        </form>
        
    </div>


    
</template>