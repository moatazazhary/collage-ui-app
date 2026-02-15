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
import { useStudentStore } from '../../../stores/student.store';


    const props = defineProps({
        update : Boolean,
        data : Object 
    });

    const semesterStore = useSemesterStore();
    const departmentStore = useDepartmentStore();
    const studentStore = useStudentStore();

    const {openSelectList,closeSelectList,activeClass,dropDownName} = useDropDown();

    let departments = reactive([]);
    let semesters =reactive([]);

    onMounted(async ()=>{
        await departmentStore.getAll();
        await semesterStore.getAll();

        semesters = semesterStore.data;
        departments = departmentStore.data;
    });

    const {handleSubmit} = useForm({
        validationSchema : studentSchema,
        initialValues : props.update ? props.data : null
    });

    const departmentValue = ref('');
    const semesterValue = ref('');
    

    const {value:fullname, errorMessage:fullnameError} = useField('fullname');
    const {value:phone,errorMessage:phoneError} = useField('phone');
    const {value:email,errorMessage:emailError} = useField('email');

    const {value:address , errorMessage:addressError} = useField('address');
    const {value:facultyNum,errorMessage:facultyNumError} = useField('facultyNum');
    const {value:semesterNum,errorMessage:semesterIdError} = useField('semesterNum');
    const {value:departmentId,errorMessage:departmentIdError} = useField('departmentId');

    if(props.update){
        departmentValue.value = props.data.department;
        semesterValue.value = props.data.semester;
        phone.value = props.data.phone ? phone.value : undefined;
        email.value = props.data.email ? email.value : undefined;
    }
    const onSubmit = handleSubmit(async (data)=>{
        props.update ? await studentStore.updateStudent(props.data.id,data) :await studentStore.addStudent(data);
    });

</script>

<template>
    <form @submit.prevent="onSubmit()">
        <div class="flex gap-3 w-full">
            <div class="">
                <label for="" class="text-sm font-normal ">الإسم</label>
                <div :class="{'validation-error':fullnameError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-user text-black-200 ' ></i>
                    <input v-model="fullname" placeholder="محمد عمر حسن" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                </div>
                <ErrorSpan v-if="fullnameError">{{ fullnameError }}</ErrorSpan>
            </div>

            <div class="">
                <label for="" class="text-sm font-normal ">الرقم الجامعي</label>
                <div :class="{'validation-error':facultyNumError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-id-card text-black-200 ' ></i>
                    <input v-model="facultyNum" placeholder="18/11229114" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                </div>
                <ErrorSpan v-if="facultyNumError">{{ facultyNumError }}</ErrorSpan>
            </div>
        </div>

        <div class="mt-5 flex gap-3 w-full">
            <div class="">
                <label for="" class="text-sm font-normal ">العنوان</label>
                <div :class="{'validation-error':addressError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <i class='bx bx-target-lock text-black-200 ' ></i>
                    <input v-model="address" placeholder="شندي" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                </div>
                <ErrorSpan v-if="addressError">{{ addressError }}</ErrorSpan>
            </div>


        </div>
        <div class="">
            <label for="" class="text-sm font-normal ">رقم الهاتف</label>
            <div :class="{'validation-error':phoneError}" class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <i class='bx bx-phone text-black-200 ' ></i>
                <input v-model="phone" placeholder="122002200" type="text" class="w-full h-full text-l  border-none placeholder:text-xs text-gray-400 ">
                <span class="text-sm text-black-500 border-r-2 pr-2 border-black-200">
                249
                </span>
            </div>
            <ErrorSpan v-if="phoneError">{{ phoneError }}</ErrorSpan>
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

            <div class="">
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
            <SubmitBtn :loading="studentStore.loading">حفظ</SubmitBtn>
        </div>
    </form>
</template>