<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../../stores/authStore';
import { useStudentStore } from '../../../stores/student.store';
import { useDoctorStore } from '../../../stores/doctor.store';

const authStore = useAuthStore();
const studentStore = useStudentStore();
const doctorStore = useDoctorStore();

const student = ref('');
const doctor = ref('');
onMounted(async ()=>{

    console.log('auth admin : ',authStore.isAdmin)
     console.log('auth doctor : ',authStore.isDoctor)
      console.log('auth student : ',authStore.isStudent)
    const user = authStore.user;
    student.value = authStore.isStudent ? await studentStore.getStudent(user.userId) : '';
    doctor.value = authStore.isDoctor ? await doctorStore.getDoctor(user.userId) : '';

    authStore.user.department = student.value ? student.value.department : doctor.value.department;
})
</script>

<template>
    <div class="absolute px-6 py-4 left-1/2 -bottom-11/12 transform -translate-x-1/2 -translate-y-1/2 w-11/12 bg-back shadow-xl shadow-[rgba(0,0,0,.04)] rounded-lg">
        <div class="flex items-center justify-between">
            <img class="w-7" src="../../../../public/logo2.svg" alt="">
            <h3 class="text-xs font-medium text-black-700 text-center">بطاقة {{student ? 'طالب' :'دكتور'}}</h3>
            <img class="w-9" src="../../../../public/collage-logo.svg" alt="">
        </div>
        <hr class="my-2 text-[#eee]">
        <div class="mt-4 flex items-center justify-between">
            <div class="flex flex-col gap-3">
                <div class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold">الإسم :</label>
                    <span>{{ student ? student?.fullname : doctor?.fullname }}</span>
                </div>
                <div v-if="student" class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold">الفصل :</label>
                    <span>{{ student?.semester }}</span>
                </div>
                <div v-if="doctor" class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold">المسمى الوظيفي :</label>
                    <span>{{ doctor?.title }}</span>
                </div>
                <div v-if="student" class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold">الرقم الجامعي :</label>
                    <span>{{student?.facultyNum}}</span>
                </div>
                <div v-if="doctor" class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold"> البريد الإلكتروني :</label>
                    <span>{{doctor?.email}}</span>
                </div>
                <div class="text-[10px] flex flex-row gap-2 font-medium">
                    <label for="" class="font-semibold">القسم :</label>
                    <span>{{ student ? student?.department : doctor?.department }}</span>
                </div>
            </div>
            <img class="w-16 h-16 object-cover rounded-full " src="../../../../public/images/indian-male-man-svgrepo-com.svg" alt="">

        </div>
    </div>
</template>