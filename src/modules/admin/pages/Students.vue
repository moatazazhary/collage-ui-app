<script setup>
import { onMounted, ref } from 'vue';
import { useStudentStore } from '../../../stores/student.store';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import AddButton from '../components/AddButton.vue';
import Modal from '../components/Modal.vue';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';

import Papa from 'papaparse'
import { useModalStore } from '../../../stores/modal.store';
import Modals from '../../../constants/modals';
import StudentForm from '../components/StudentForm.vue';
import { useDropDown } from '../../../composables/useDropDown';
import dropdownLists from '../../../constants/dropdownLists';
import Loading from '../../core/components/Loading.vue';

const studentStore = useStudentStore();
const modal = useModalStore();

onMounted(async()=>{
    await studentStore.getAll();
})


const {select,openSelectList,closeSelectList,activeClass,dropDownName,selectedItem} = useDropDown();
const update = ref(false)


function getFile(e){
    const file = e.target.files[0];

    Papa.parse(file,{
        encoding:"UTF-8",
        header:true,
        complete : (results)=>{
            console.log('results : ',results);
        }
    })
}


function createStatus(){
    update.value = false
}

async function getPage({page =1,limit=10,sort='asc'}={}){
    await student.getAll({
        page,
        limit,
        sort
    });
}

const student = ref('');
async function getStudent (id) {
    update.value = true;
    student.value = await studentStore.getStudent(id);
    closeSelectList();
    modal.toggleModal(Modals.ADD_STUDENT_MODAL)
}




</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                الطلاب
            </template>
            <template #description>
                هنا توجد لسته الطلاب وكل ما يمكنك فعله بهم
            </template>
        </SectionTitle>
        <AddButton :toggleModal="modal.toggleModal" :state="createStatus" :modalName="Modals.ADD_STUDENT_MODAL">
            إضافة طالب
        </AddButton>
    </div>
    

    <input type="file" hidden accept=".csv" @change="getFile($event)">

    <div v-if="studentStore.studentData.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
        <p class="text-xs mt-1 font-light text-black-500">لا يوجد طلاب مسجلون بعد...</p>
    </div>
    <Loading v-if="studentStore.loading"></Loading>
    <Pagination v-if="studentStore.studentData.length>0" :import-file="true" :get-page="getPage" :total-data="studentStore.totalData" :current-page="studentStore.currentPage" :total-pages="studentStore.totalPages">
        <template #table-header>
            <th>الإسم رباعي</th>
            <th>الرقم الجامعي</th>
            <th>الفصل الدراسي</th>
            <th>القسم</th>
            <th>إجراءات</th>
        </template>
        <template #table-body>
            <tr v-for="student in studentStore.studentData" class="text-xs cursor-default font-medium text-black-700 transition-colors hover:bg-hover hover:text-secondary">
                <td >{{ student.fullname }}</td>
                <td >{{ student.facultyNum }}</td>
                <td >{{student.semester}}</td>
                <td >{{ student.department }}</td>
                <td >
                    <div class="relative">
                        <button @click="openSelectList(dropdownLists.SELECT_OPTIONS_DROPDWON)" class="outline-none border-none bg-none cursor-pointer text-black-500 text-xl font-normal transition-colors hover:text-secondary">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div v-if="dropDownName === dropdownLists.SELECT_OPTIONS_DROPDWON" class=" absolute top-5 right-0 w-full bg-white shadow-lg shadow-light rounded-lg">
                            <button class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-show text-l"></i>
                                <span>عرض</span>
                            </button>
                            <button @click="getStudent(student.id)" class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-edit-alt text-l"></i>
                                <span>تعديل</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </template>
    </Pagination>


    <Modal v-if="modal.modalName === Modals.ADD_STUDENT_MODAL">
        <template #title>
            {{
                update?'تعديل طالب':'إضافة طالب'
            }}
        </template>
        <template #form>
            <StudentForm :update="update" :data="student" ></StudentForm>
        </template>
    </Modal>
</template>

