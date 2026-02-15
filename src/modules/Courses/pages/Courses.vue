<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCourseStore } from '../../../stores/course.store';
import Title from '../../auth/components/title.vue';
import CourseItem from '../components/CourseItem.vue';
import Loading from '../../core/components/Loading.vue';

const courseStore = useCourseStore();

const courses = ref('');

onMounted(async()=>{
    courses.value = await courseStore.getUserCourses();
})
</script>

<template>

    <div>
        <Loading v-if="courseStore.loading"></Loading>
        <div class="p-6 pb-28">
            <Title>المواد</Title>
            <div class="mt-14">
                <div>
                    <i class='bx bx-book rounded-lg text-3xl text-primary bg-[#c7cce5] p-3'></i>
                    <h4 class="mt-3 text-l font-medium">{{ courses?.semester }}</h4>
                    <p class="mt-2 text-xs font-normal text-black-500">هنا قائمة بكل مواد السمستر</p>
                </div>

                <div v-if="courses.courses?.length <=0 " class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
                    <p class="text-xs mt-1 font-normal text-black-500">لا توجد محاضرات بعد...</p>
                </div>
                <div v-if="courses.courses?.length > 0 " class="mt-10 flex flex-col gap-3 p-3 rounded-lg bg-hover">
                    <CourseItem v-for="value in courses.courses" :course="value"></CourseItem>
                </div>
            </div>
        </div>
    </div>
  
</template>