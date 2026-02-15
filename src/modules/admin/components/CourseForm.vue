<script setup>
import { useForm,useField } from 'vee-validate';
import { studentSchema } from '../../../utils/validations/studentValidation/studentSchema';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useDropDown } from '../../../composables/useDropDown';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import { onMounted, reactive, ref } from 'vue';
import dropdownLists from '../../../constants/dropdownLists';
import { useDepartmentStore } from '../../../stores/department.store';
import { useSemesterStore } from '../../../stores/semester.store';
import { useDoctorStore } from '../../../stores/doctor.store';
import { createCourseSchema, updateCourseSchema } from '../../../utils/validations/courseValidations/createCourseSchema';
import { useCourseStore } from '../../../stores/course.store';


    const props = defineProps({
        update : Boolean,
        data : Object 
    });

    const semesterStore = useSemesterStore();
    const departmentStore = useDepartmentStore();
    const doctorStore = useDoctorStore();
    const courseStore = useCourseStore();

    const {openSelectList,closeSelectList,activeClass,dropDownName} = useDropDown();

    let departments = reactive([]);
    let semesters =reactive([]);
    let doctors = reactive([]);

    onMounted(async ()=>{
        await departmentStore.getAll();
        await semesterStore.getAll();
        await doctorStore.getAll();

        semesters = semesterStore.data;
        departments = departmentStore.data;
        doctors = doctorStore.doctorsData;
    });

    const {handleSubmit} = useForm({
        validationSchema : props.update ? updateCourseSchema:createCourseSchema,
        initialValues : props.update ? {name:props.data?.name,
            description:props.data?.description,
            semesterNum:props.data?.semesterNum
        } : ''
    });

    const departmentValue = ref('');
    const semesterValue = ref('');
    const doctorValue = ref('');

    if(props.update){
        semesterValue.value = props.data.semester
    }


    const {value:name, errorMessage:nameError} = useField('name');
    const {value:description,errorMessage:descriptionError} = useField('description');
    const {value:doctorId , errorMessage:doctorIdError} = useField('doctorId');
    const {value:isDoctorCurrent,errorMessage:isDoctorCurrentError} = useField('isDoctorCurrent');
    const {value:semesterNum,errorMessage:semesterIdError} = useField('semesterNum');
    const {value:departmentId,errorMessage:departmentIdError} = useField('departmentId');


    const onSubmit = handleSubmit(async (data)=>{
        props.update ? await courseStore.updateCourse(props.data.id,data) : await courseStore.addCourse(data);
    });

</script>

<template>
    <form @submit.prevent="onSubmit()">
        <div class="">
            <label for="" class="text-sm font-normal ">إسم المادة</label>
            <div :class="{'validation-error':nameError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <i class='bx bx-book text-black-200 ' ></i>
                <input v-model="name" placeholder="إدارة المخازن" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
            </div>
            <ErrorSpan v-if="nameError">{{ nameError }}</ErrorSpan>
        </div>


        <div class="mt-5">
            <label for="" class="text-sm font-normal ">وصف المادة</label>
            <div :class="{'validation-error':descriptionError}" class="mt-3 input-box h-auto flex items-center p-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <textarea v-model="description" rows="4" placeholder="" type="text" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 "></textarea>
            </div>
            <ErrorSpan v-if="descriptionError">{{ descriptionError }}</ErrorSpan>
        </div>



        <div v-if="!props.update" class="mt-5">
            <label for="" class="text-sm font-normal ">الدكتور</label>
            <div :class="{'validation-error':doctorIdError}" class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <div @click.stop="openSelectList(dropdownLists.SELECT_DOCTOR)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                    <i class='bx bx-user text-black-200 ' ></i>
                    <input :value="doctorValue" placeholder="اختر من اللستة" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                    <button  type="button" class="outline-none bg-none border-none">
                        <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                    </button>
                </div>

                <div @click="closeSelectList" v-if="dropDownName === dropdownLists.SELECT_DOCTOR" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                    <button v-for="doctor in doctors" @click="doctorValue = doctor.fullname ,doctorId = doctor.id" :key="doctor.fullname" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                        <span>د. {{ doctor.fullname }}</span>
                    </button>
                </div>
            </div>
            <ErrorSpan v-if="doctorIdError">{{ doctorIdError }}</ErrorSpan>
        </div>

        <div v-if="!props.update" class="mt-5 flex items-center gap-3">
            <input v-model="isDoctorCurrent" id="isCurrentDcotor" type="checkbox">
            <label for="isCurrentDcotor" class="text-xs font-medium">هل هو الدكتور الحالي؟</label>
        </div>

        <div class="mt-5 flex gap-3">
            <div class="">
                <label for="" class="text-sm font-normal ">الفصل الدراسي</label>
                <div :class="{'validation-error':semesterIdError}" class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <div @click.stop="openSelectList(dropdownLists.SELECT_SEMESTER_DROPDWON)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                        <i class='bx bx-book text-black-200 ' ></i>
                        <input :value="semesterValue" placeholder="الفصل الدراسي الأول" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button  type="button" class="outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                        </button>
                    </div>

                    <div @click="closeSelectList" v-if="dropDownName === dropdownLists.SELECT_SEMESTER_DROPDWON" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="semester in semesters" @click="semesterValue = semester.title,semesterNum = semester.semesterNum " :key="semester.semesterNum" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ semester.title }}</span>
                        </button>
                    </div>
                </div>
                <ErrorSpan v-if="semesterIdError">{{ semesterIdError }}</ErrorSpan>
            </div>

            <div v-if="!props.update" class="">
                <label for="" class="text-sm font-normal ">القسم</label>
                <div :class="{'validation-error':departmentIdError}" class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <div @click.stop="openSelectList(dropdownLists.SELECT_DEPARTMENT_DROPDWON)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                        <i class='bx bx-book text-black-200 ' ></i>
                        <input :value="departmentValue" placeholder="إدارة الأعمال" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button  type="button" class="outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                        </button>
                    </div>

                    <div @click="closeSelectList" v-if="dropDownName === dropdownLists.SELECT_DEPARTMENT_DROPDWON" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="department in departments" @click="departmentValue=department.title,departmentId = department.id" :key="department.id" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ department.title }}</span>
                        </button>

                    </div>
                </div>

                <ErrorSpan v-if="departmentIdError">{{ departmentIdError }}</ErrorSpan>
            </div>
        </div>

        <div class="mt-5">
            <SubmitBtn :loading="courseStore.loading">حفظ</SubmitBtn>
        </div>
    </form>
</template>