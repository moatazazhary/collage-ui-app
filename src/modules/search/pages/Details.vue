<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useFileStore } from '../../../stores/file.store';
import Title from '../../auth/components/title.vue';
import  UPLOAD_URL  from '../../../utils/helper';

import { useRoute } from 'vue-router';
    const fileStore = useFileStore();
    const route = useRoute();
    const file = ref('')
    onMounted(async ()=>{
        file.value = await fileStore.getFile(route.params.id)

        console.log('data :',file.value)
    })

function dateFormat(date='2024-09-10T03:30'){
    const stringHours = date.split('T')[1];
    const hourData = stringHours.split(':');
    const hour = hourData[0]
    const minute = hourData[1]
    const stringData = date.split('T')[0];
    const data = stringData.split('-');

    const year = data[0];
    const month = Number(data[1]);
    const day = data[2];

    let monthName = '';
    switch(month){
        case 1:
            monthName = 'يناير'
            break;
        case 2:
            monthName = 'فبراير'
            break;
        case 3:
            monthName = 'مارس'
            break;
        case 4:
            monthName = 'أبريل'
            break;
        case 5:
            monthName = 'مايو'
            break;
        case 6:
            monthName = 'يونيو'
            break;
        case 7:
            monthName = 'يوليو'
            break;
        case 8:
            monthName = 'أغسطس'
            break;
        case 9:
            monthName = 'سبتمبر'
            break;
        case 10:
            monthName = 'أكتوبر'
            break;
        case 11:
            monthName = 'نوفمبر'
            break;
        case 12:
            monthName = 'ديسمبر'
            break;
    }

    return `${day} ${monthName} ${year} - ${hour}:${minute}`;
}


const fileUrl = computed(()=>{
    if(!file.value.path) return '';
    return `${UPLOAD_URL}/${file.value?.path}`
})

</script>

<template>
    <div class="p-6 pb-14">
        <Title>التفاصيل</Title>

        <div v-if="file" class="mt-10">
            <div  class="mt-10 flex flex-col gap-3">
                <div class="mt-5 flex gap-6 flex-col md:flex-row md:gap-30 lg:gap-40">
                    <div>
                        <h2 class="text-l font-medium text-black-700"> البيانات الأساسية :</h2>
                        <div class="flex flex-col gap-3 mt-5">
                            <div class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700">رفع بواسطة  :</p>
                                <span class="text-xs font-normal text-black-500">{{file?.uploadedBy}}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700">نوع الملف :</p>
                                <span class="text-xs font-normal text-black-500">{{file?.type}}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700">امتداد الملف:</p>
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
                                <p class="text-xs font-medium text-black-700">تاريخ الرفع :</p>
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

                            <div v-if="file?.lectureName" class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700"> المحاضرة :</p>
                                <span class="text-xs font-normal text-black-500"> {{ file?.lectureName }}</span>
                            </div>

                            <div v-if="file?.type === 'بحث'" class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700"> المحاضرة :</p>
                                <span class="text-xs font-normal text-black-500"> {{ file?.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="mt-5">
                    <h2 class="text-l font-medium text-black-700"> الملف:</h2>
                    <div class="mt-5 max-w-11/12 max-h-full">
                        <iframe :src="fileUrl" width="100%" height="100%"></iframe>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>