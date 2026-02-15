<script setup>
import { reactive } from 'vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';

    const photos = reactive({
        personalPhoto :{file : null,progress : 0,uploading:false},
        idPhoto :{file : null,progress : 0,uploading:false},
        paymentPhoto : {file:null,progress : 0,uploading : false}
    });

    
    const readImage = (event,key)=>{
        const file = event.target.files[0];
        if(!file)
            return;

        photos[key].file = file;
        photos[key].uploading = true;

        const reader = new  FileReader()

        reader.onload = ()=>{

            const interval = setInterval(() => {
                photos[key].progress += Math.random()*15;
                if(photos[key].progress >= 100){
                    photos[key].progress = 100;
                    clearInterval(interval);
                }

                setTimeout(() => {
                    photos[key].uploading = false
                }, 1800);
            }, 200);
            
        }

        reader.readAsDataURL(file);
    }
</script>

<template>
    <form action="">
            <div class="">
                <h5 class="text-sm font-normal text-black-700">الصورة الشخصية</h5>
                <input id="personalPhoto" accept="image/*" @change="readImage($event,'personalPhoto')" type="file" hidden>
                <label v-if="photos.personalPhoto.file === null" for="personalPhoto" class="w-32 h-28 cursor-pointer flex items-center flex-col gap-2 mt-4 p-3 rounded-lg bg-hover border-2 border-dashed border-primary">
                    <i class="bx bx-images text-2xl text-black-200"></i>
                    <div class="text-center">
                        <p class="text-[10px] font-medium text-primary">أضغط لرفع الصورة</p>
                        <span class="text-[9px] leading-4 mt-1 block font-light text-black-500">JPG, PNG.JPEG ، فقط وتكون أقل من 4MB</span>
                    </div>
                </label>

                <div v-if="photos.personalPhoto.file !== null" class="mt-4 p-3 rounded-lg bg-back border-2 border-hover">
                    <div class=" flex items-center justify-between  ">
                        <div class="flex items-center gap-3">
                            <i class="bx bx-images text-3xl text-secondary"></i>
                            <p class="text-xs font-medium text-black-500">kjzhfhs.png</p>
                        </div>
                        <span>
                            <i class="bx text-xl" :class="photos.personalPhoto.uploading ? 'bx-time text-black-500':'bx-check text-success'"></i>
                        </span>

                    </div>
                    <div v-if="photos.personalPhoto.uploading" class="mt-4 relative h-1 w-full bg-hover">
                        <span class="block absolute top-0 right-0 h-full bg-primary" :style="{width : photos.personalPhoto.progress + '%'}"></span>
                    </div>
                </div>
            </div>

            <hr class="my-5 text-black-200">
        
            <div>
                <div class="flex gap-3 w-full">
                    <div class="">
                        <label for="" class="text-sm font-normal ">الإسم</label>
                        <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                            <i class='bx bx-user text-black-200 ' ></i>
                            <input placeholder="محمد عمر حسن" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                        </div>
                    </div>

                    <div class="">
                        <label for="" class="text-sm font-normal ">الرقم الجامعي</label>
                        <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                            <i class='bx bx-id-card text-black-200 ' ></i>
                            <input placeholder="18/11229114" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                        </div>
                    </div>
                </div>

                <div class="mt-5 flex gap-3 w-full">
                    <div class="">
                        <label for="" class="text-sm font-normal ">العنوان</label>
                        <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                            <i class='bx bx-target-lock text-black-200 ' ></i>
                            <input placeholder="شندي" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                        </div>
                    </div>

                    <div class="">
                        <label for="" class="text-sm font-normal ">البريد الإلكتروني</label>
                        <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                            <i class='bx bx-envelope text-black-200 ' ></i>
                            <input placeholder="example@gmail.com" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                        </div>
                    </div>

                </div>

                <div class="mt-5 w-fit">
                    <label for="" class="text-sm font-normal ">رقم الهاتف</label>
                    <div class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                        <i class='bx bx-phone text-black-200 ' ></i>
                        <input placeholder="18/11229114" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                        <span class="text-sm text-black-500 border-r-2 pr-2 border-black-200">
                        249
                        </span>
                    </div>
                </div>

                <div class="mt-5 w-5/12">
                    <SubmitBtn>حفظ</SubmitBtn>
                </div>
            </div>

        </form>
</template>