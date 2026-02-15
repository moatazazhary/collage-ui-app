<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useDropDown } from '../../../composables/useDropDown';
import { useModalStore } from '../../../stores/modal.store';
import { useUploadImage } from '../../../composables/useUploadImage';
import { useUploadFile } from '../../../composables/useUploadFile';
import dropdownLists from '../../../constants/dropdownLists';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import { useField, useForm } from 'vee-validate';
import { createLectureSchema } from '../../../utils/validations/courseValidations/createLectureSchema';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useDepartmentStore } from '../../../stores/department.store';
import { useCourseStore } from '../../../stores/course.store';
import { useFileStore } from '../../../stores/file.store';
import { useSemesterStore } from '../../../stores/semester.store';

const props = defineProps({
    fileType:String,
    targetType:String
})
const modal = useModalStore();
const departmentStore = useDepartmentStore();
const semesterStore = useSemesterStore();
const courseStore = useCourseStore();
const fileStore = useFileStore();
const departments = ref('');
const semesters = ref('');
const courses = ref('');

const {loading,files,readFile} = useUploadFile()

const {handleSubmit} = useForm({
    validationSchema:createLectureSchema
})

const {value:title,errorMessage:titleError} = useField('title');
const {value:courseId,errorMessage:courseIdError} = useField('courseId');



// TODO: create the logic and get courses from backend by department
onMounted(async ()=>{
    await departmentStore.getAll();
    await semesterStore.getAll();
    departments.value = departmentStore.data;
    semesters.value = semesterStore.data;

    if(props.fileType !== 'محاضرة')
        title.value = 'anything to say'

})


const course = ref('');
const semester = ref('');
const data = reactive({
    semesterNum:'',
    departmentId:''
})

async function getCourses(){
    if(data.semesterNum && data.departmentId){
        courses.value = await courseStore.getCourseByDepartment(data);
    }
}

const {select,activeClass,selectedItem,dropDownName,closeSelectList,openSelectList} = useDropDown();


const onSubmit = handleSubmit(async (data)=>{
    loading.value = true;
    if(files.Course.file !== null){
        let lecture = '';
        if(props.fileType === 'محاضرة')
            lecture = await courseStore.addLecture(data);

        
        const formData = new FormData();
        
        formData.append('fileType',props.fileType);
        formData.append('targetType',props.targetType);
        formData.append('file',files.Course.file);
        switch(props.fileType){
            case 'محاضرة':
                    formData.append('targetId',lecture.id);
                break;
            case 'ملخص':
                    formData.append('targetId',data.courseId);
                break;
        }
        await fileStore.uploadFile(formData);
        modal.closeModal();
        loading.value = false
        
    }else{
        files.Course.file === null? files.Course.errors.length === 0 ? files.Course.errors.push('الصورة مطلوبة'):'' : files.Course.errors = []
        loading.value = false;
    }
})
</script>

<template>
    <form @submit.prevent="onSubmit" class="mt-10 pb-5">

            <div class="mt-5" @click="closeSelectList">
                <label for="" class="text-sm font-normal ">اختر السمستر</label>
                <div class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <div @click.stop="openSelectList(dropdownLists.SELECT_SEMESTER_FOR_FILES_DROPDWON)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                        <i class='bx bx-book text-black-200 ' ></i>
                        <input :value="semester" placeholder="السمستر الأول" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button  type="button" class="outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                        </button>
                    </div>

                    <div v-if="dropDownName === dropdownLists.SELECT_SEMESTER_FOR_FILES_DROPDWON" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="value in semesters" @click="semester = value.title,data.semesterNum = value.semesterNum,getCourses()" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ value.title }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-5" @click="closeSelectList">
                <label for="" class="text-sm font-normal ">اختر القسم</label>
                <div  class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <div @click.stop="openSelectList(dropdownLists.SELECT_DEPARTMENT_FOR_FILES_DROPDWON)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                        <i class='bx bx-book text-black-200 ' ></i>
                        <input :value="selectedItem" placeholder="إدارة الأعمال" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button  type="button" class="outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                        </button>
                    </div>

                    <div v-if="dropDownName === dropdownLists.SELECT_DEPARTMENT_FOR_FILES_DROPDWON" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="value in departments" @click="select(value.title),data.departmentId = value.id,getCourses()" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ value.title }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-5" @click="closeSelectList">
                <label for="" class="text-sm font-normal ">اختر المادة</label>
                <div :class="{'validation-error':courseIdError}" class="mt-3 relative  h-[52px]  px-2  border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                    <div  @click.stop="openSelectList(dropdownLists.SELECT_COURSE_FOR_FILES_DROPDWON)" class="h-full flex items-center gap-2 cursor-pointer input-box">
                        <i class='bx bx-book text-black-200 ' ></i>
                        <input :value="course" placeholder="إدارة المبيعات" class="pointer-events-none w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                        <button  type="button" class="outline-none bg-none border-none">
                            <i class="bx bx-chevron-down text-3xl text-black-200"></i>
                        </button>
                    </div>

                    <div v-if="dropDownName === dropdownLists.SELECT_COURSE_FOR_FILES_DROPDWON" :class="activeClass" class="z-20 w-full h-32 overflow-y-scroll absolute top-10 right-0 rounded-lg shadow-lg shadow-[rgba(0,0,0,.1)] bg-white">
                        <button v-for="value in courses" @click="course = value.name , courseId = value.id" type="button" class="w-full px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                            <span>{{ value.name }}</span>
                        </button>
                    </div>

                    <ErrorSpan v-if="courseIdError">{{ courseIdError }}</ErrorSpan>
                </div>
            </div>

            <div v-if="props.fileType === 'محاضرة'" class="w-full mt-5">
                <label for="" class="text-sm font-normal ">عنوان المحاضرة</label>
                <div :class="{'validation-error':titleError}"  class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-book-open text-black-200'></i>
                    <input v-model="title"  placeholder="مبادئ..." type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
                <ErrorSpan v-if="titleError">{{ titleError }}</ErrorSpan>
            </div>

            <div v-if="selectedItem" :class="selectedItem ? 'dropdown-active' : 'dropdown-unactive'" class="mt-10">
                <h5 class="text-sm font-normal text-black-700">أرفق الملف</h5>
                <input id="personalPhoto" @change="readFile($event,'Course',props.fileType === 'محاضرة' ?'محاضرة' : '')" type="file" hidden>
                <label v-if="files.Course.file === null" for="personalPhoto" class="cursor-pointer flex items-center gap-3 mt-4 p-3 rounded-lg bg-hover border-2 border-dashed border-primary">
                    <i class="bx bx-images text-3xl text-black-200"></i>
                    <div>
                        <p class="text-xs font-medium text-primary">أضغط لرفع الملف</p>
                        <span class="text-[10px] font-light text-black-500">يسمح برفع ملفات Word, PowerPoint , Excel , Images وألا تتخطى ال 4MB</span>
                    </div>
                </label>

                <div v-if="files.Course.file !== null" class="mt-4 p-3 rounded-lg bg-back border-2 border-hover">
                    <div class=" flex items-center justify-between  ">
                        <div class="flex items-center gap-3">
                            <i class="bx bx-images text-3xl text-secondary"></i>
                            <p class="text-xs font-medium text-black-500">{{files.Course.file?.name}}</p>
                        </div>
                        <span>
                            <i class="bx text-xl" :class="files.Course.uploading ? 'bx-time text-black-500':'bx-check text-success'"></i>
                        </span>

                    </div>
                    <div v-if="files.Course.uploading" class="mt-4 relative h-1 w-full bg-hover">
                        <span class="block absolute top-0 right-0 h-full bg-primary" :style="{width : files.Course.progress + '%'}"></span>
                    </div>
                </div>

                <ErrorSpan class="mt-3" v-if="files.Course.errors.length > 0" v-for="error in files.Course.errors" >{{ error }}</ErrorSpan>
            </div>

            <div class="mt-10 flex items-center flex-col gap-3">
                <SubmitBtn :loading="loading">حفظ</SubmitBtn>
                <button v-if="props.fileType === 'محاضرة'" @click="modal.closeModal" type="button" class="cursor-pointer shadow-lg outline-none border-none bg-none border border-hover rounded-lg text-black-700 w-full py-3.5 text-sm font-medium transition-color hover:text-black-500 ">
                    إلغاء
                </button>
            </div>
        </form>
</template>