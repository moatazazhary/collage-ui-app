<script setup>
import { onMounted, ref } from 'vue';
import Title from '../../auth/components/Title.vue';
import CourseLectures from '../components/CourseLectures.vue';
import CourseFiles from '../components/CourseFiles.vue';
import { useCourseStore } from '../../../stores/course.store';
import { useRoute } from 'vue-router';

const courseStore = useCourseStore();
    const pageName = ref('details');
    const course = ref('');
    const lectures = ref('');
    const otherFiles = ref('');
    const route = useRoute();
    onMounted(async()=>{
        course.value = await courseStore.getCourseDetails(route.params.id);
        lectures.value = course.value.materials?.filter(m=>m?.file?.type === 'محاضرة');
        otherFiles.value = course.value.materials?.filter(m=>m?.file?.type !== 'محاضرة');
    })
</script>

<template>
    
    <div class="p-6 pb-28">
        <Title></Title>
        <div class="mt-5">
            <h4 class="text-lg font-medium text-black-700">{{ course.name }}</h4>
            <p class="text-xs font-normal mt-3 text-black-500">بواسطة  <strong v-if="course.doctors?.length > 0" class="text-primary">د. {{ course.doctors?.map(d=>d.user?.fullname)[0] }}</strong></p>
            <div class="mt-5 flex items-center gap-3">
                <div class="flex items-center text-sm font-light gap-1 text-black-500">
                    <i class="bx bx-file text-xl "></i>
                    <span class="">{{course.materials?.map(m=>m?.file).length + course.exams?.map(m=>m?.file).length}}</span>
                    <span>ملفات</span>
                </div>
                <div class="flex items-center text-sm gap-1 font-light text-black-500">
                    <i class="bx bx-book-open text-xl"></i>
                    <span>{{course.materials?.map(m=>m?.file?.type === 'محاضرة').length}}</span>
                    <span>محاضرات</span>
                </div>
            </div>

            <hr class="my-6 text-hover">

            <div class="flex items-center justify-center">
                <button @click="pageName = 'details'" class="outline-none border-noone bg-none text-sm font-medium py-3 px-6 border-b-2 border-black-200 text-black-500 cursor-pointer transition-colors hover:text-secondary hover:border-secondary" :class="pageName === 'details'?'text-secondary border-secondary':''">تفاصيل</button>
                <button @click="pageName = 'lectures'" class="outline-none border-noone bg-none text-sm font-medium py-3 px-6 border-b-2 border-black-200 text-black-500 cursor-pointer transition-colors hover:text-secondary hover:border-secondary" :class="pageName === 'lectures'?'text-secondary border-secondary':''">محاضرات</button>
                <button @click="pageName = 'files'" class="outline-none border-noone bg-none text-sm font-medium py-3 px-6 border-b-2 border-black-200 text-black-500 cursor-pointer transition-colors hover:text-secondary hover:border-secondary" :class="pageName === 'files'?'text-secondary border-secondary':''">ملفات أخرى</button>
            </div>

            <div v-if="pageName === 'details'" class="mt-10 transition-all">
                <p class="text-xs text-right leading-7 text-black-500 font-normal">{{ course.description }}</p>
            </div>

            <CourseLectures v-if="pageName === 'lectures'" :lectures="lectures"></CourseLectures>

            <CourseFiles v-if="pageName === 'files'" :other-files="otherFiles"></CourseFiles>

        </div>
    </div>
</template>