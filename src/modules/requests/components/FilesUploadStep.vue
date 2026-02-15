<script setup>
import { useUploadImage } from '../../../composables/useUploadImage';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';

const {loading,photos,readImage} = useUploadImage()

const props = defineProps({
    nextStep : Function
})

const onSubmit = ()=>{
    loading.value = true;
    if(photos.personalPhoto.file !== null && photos.idPhoto.file !== null){
        
        props.nextStep({personalPhoto : photos.personalPhoto.file,idPhoto : photos.idPhoto.file})
        loading.value = false
        
    }else{
        photos.personalPhoto.file === null? photos.personalPhoto.errors.length === 0 ?  photos.personalPhoto.errors.push('الصورة مطلوبة'):'' : photos.personalPhoto.errors = []
        photos.idPhoto.file === null ? photos.idPhoto.errors.length === 0 ? photos.idPhoto.errors.push('الصورة مطلوبة'):'' :photos.idPhoto.errors = []
        loading.value = false
    }
    return;
}
</script>

<template>
    <div class="mt-5 rounded-lg shadow-lg shadow-light">
        <h5 class="text-sm font-medium text-black-700 text-center">رفع الصور</h5>

        <form @submit.prevent="onSubmit" class="mt-5">
            
            <div>
                <h5 class="text-sm font-normal text-black-700">الصورة الشخصية</h5>
                <input id="personalPhoto" accept="image/*" @change="readImage($event,'personalPhoto')" type="file" hidden>
                <label v-if="photos.personalPhoto.file === null" for="personalPhoto" class="cursor-pointer flex items-center gap-3 mt-4 p-3 rounded-lg bg-hover border-2 border-dashed border-primary">
                    <i class="bx bx-images text-3xl text-black-200"></i>
                    <div>
                        <p class="text-xs font-medium text-primary">أضغط لرفع الصورة</p>
                        <span class="text-[10px] font-light text-black-500">JPG, PNG.JPEG ، فقط وتكون أقل من 4MB</span>
                    </div>
                </label>

                <div v-if="photos.personalPhoto.file !== null" class="mt-4 p-3 rounded-lg bg-back border-2 border-hover">
                    <div class=" flex items-center justify-between  ">
                        <div class="flex items-center gap-3">
                            <i class="bx bx-images text-3xl text-secondary"></i>
                            <p class="text-xs font-medium text-black-500">{{photos.personalPhoto.file?.name}}</p>
                        </div>
                        <span>
                            <i class="bx text-xl" :class="photos.personalPhoto.uploading ? 'bx-time text-black-500':'bx-check text-success'"></i>
                        </span>

                    </div>
                    <div v-if="photos.personalPhoto.uploading" class="mt-4 relative h-1 w-full bg-hover">
                        <span class="block absolute top-0 right-0 h-full bg-primary" :style="{width : photos.personalPhoto.progress + '%'}"></span>
                    </div>
                </div>

                <ErrorSpan class="mt-3" v-if="photos.personalPhoto.errors.length > 0" v-for="error in photos.personalPhoto.errors" >{{ error }}</ErrorSpan>
            </div>

            <div class="mt-5">
                <h5 class="text-sm font-normal text-black-700">صورة الإثبات</h5>
                <input id="idPhoto" accept="image/*" @change="readImage($event,'idPhoto')" type="file" hidden>
                <label v-if="photos.idPhoto.file === null" for="idPhoto" class="cursor-pointer flex items-center gap-3 mt-4 p-3 rounded-lg bg-hover border-2 border-dashed border-primary">
                    <i class="bx bx-images text-3xl text-black-200"></i>
                    <div>
                        <p class="text-xs font-medium text-primary">أضغط لرفع الصورة</p>
                        <span class="text-[10px] font-light text-black-500">JPG, PNG.JPEG ، فقط وتكون أقل من 4MB</span>
                    </div>
                </label>

                <div v-if="photos.idPhoto.file !== null" class="mt-4 p-3 rounded-lg bg-back border-2 border-hover">
                    <div class=" flex items-center justify-between  ">
                        <div class="flex items-center gap-3">
                            <i class="bx bx-images text-3xl text-secondary"></i>
                            <p class="text-xs font-medium text-black-500">{{photos.idPhoto.file?.name}}</p>
                        </div>
                        <span>
                            <i class="bx text-xl" :class="photos.idPhoto.uploading ? 'bx-time text-black-500':'bx-check text-success'"></i>
                        </span>

                    </div>
                    <div v-if="photos.idPhoto.uploading" class="mt-4 relative h-1 w-full bg-hover">
                        <span class="block absolute top-0 right-0 h-full bg-primary" :style="{width : photos.idPhoto.progress + '%'}"></span>
                    </div>
                </div>

                <ErrorSpan class="mt-3" v-if="photos.idPhoto.errors.length > 0" v-for="error in photos.idPhoto.errors" >{{ error }}</ErrorSpan>

            </div>

            <div class="mt-5">
                <SubmitBtn :loading="loading">التالي</SubmitBtn>
            </div>
        </form>
        
    </div>
</template>