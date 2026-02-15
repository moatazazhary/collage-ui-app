<script setup>
import { onMounted, ref } from 'vue';
import Modals from '../../../constants/Modals';
import { useModalStore } from '../../../stores/modal.store';
import AddButton from '../components/AddButton.vue';
import Modal from '../components/Modal.vue';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
import CourseForm from '../components/CourseForm.vue';
import { useCourseStore } from '../../../stores/course.store';
import { useDropDown } from '../../../composables/useDropDown';
import dropdownLists from '../../../constants/dropdownLists';
import Loading from '../../core/components/Loading.vue';


const modal = useModalStore();
const courseStore = useCourseStore();


onMounted(async()=>{
    await courseStore.getAll();
})

const {openSelectList,closeSelectList,activeClass,dropDownName,selectedItem} = useDropDown();
const update = ref(false)


function createStatus(){
    update.value = false
}

async function getPage({page =1,limit=10,sort='asc'}={}){
    await courseStore.getAll({
        page,
        limit,
        sort
    });
}

const course = ref('');
async function getCourse (id) {
    update.value = true;
    course.value = await courseStore.getCourse(id);
    closeSelectList();
    modal.toggleModal(Modals.COURSE_MODAL)
}

</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                المواد
            </template>
            <template #description>
                هنا توجد لسته المواد وكل ما يمكنك فعله بهم
            </template>
        </SectionTitle>
        <AddButton :toggle-modal="modal.toggleModal" :state="createStatus" :modal-name="Modals.COURSE_MODAL">
            إضافة مادة
        </AddButton>
    </div>
    

    <div v-if="courseStore.coursesData.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
        <p class="text-xs mt-1 font-light text-black-500">لا توجد مواد مضافة بعد...</p>
    </div>
    
    <Loading v-if="courseStore.loading"></Loading>
    <Pagination v-if="courseStore.coursesData.length > 0" :import-file="false" :get-page="getPage" :total-data="courseStore.totalData" :current-page="courseStore.currentPage" :total-pages="courseStore.totalPages">
        <template #table-header>
            <th>عنوان المادة</th>
            <th>الفصل الدراسي</th>
            <th>القسم</th>
            <th>الدكتور</th>
            <th>إجراءات</th>
        </template>
        <template #table-body>
            <tr v-for="course in courseStore.coursesData" class="text-xs cursor-default font-medium text-black-700 transition-colors hover:bg-hover hover:text-secondary">
                <td >{{ course.name }}</td>
                <td >{{ course.semester }}</td>
                <td >{{ course.department }}</td>
                <td >
                    <span v-for="{name,id} in course.doctors">{{ name}}</span>
                </td>
                <td >
                    <div class="relative">
                        <button @click="openSelectList(dropdownLists.SELECT_OPTIONS_DROPDWON),selectedItem = course.id" class="outline-none border-none bg-none cursor-pointer text-black-500 text-xl font-normal transition-colors hover:text-secondary">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div v-if="dropDownName === dropdownLists.SELECT_OPTIONS_DROPDWON && selectedItem === course.id" :class="activeClass" class=" absolute top-5 right-0 w-full bg-white shadow-lg z-30 shadow-light rounded-lg">
                            <button class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-show text-l"></i>
                                <span>عرض</span>
                            </button>
                            <button @click="closeSelectList(),getCourse(course.id)" class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-edit-alt text-l"></i>
                                <span>تعديل</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </template>
    </Pagination>

    <Modal v-if="modal.modalName === Modals.COURSE_MODAL">
        <template #title>
           {{update?'تعديل مادة':'إضافة مادة'}}
        </template>
        <template #form>
            <CourseForm :update="update" :data="course" ></CourseForm>
        </template>
    </Modal>
    
</template>

