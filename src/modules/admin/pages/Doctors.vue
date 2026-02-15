<script setup>
import { onMounted, ref } from 'vue';
import { useDoctorStore } from '../../../stores/doctor.store';
import AddButton from '../components/AddButton.vue';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
import Modal from '../components/Modal.vue';
import { useModalStore } from '../../../stores/modal.store';
import Modals from '../../../constants/modals';
import DoctorForm from '../components/doctorForm.vue';
import { useDropDown } from '../../../composables/useDropDown';
import dropdownLists from '../../../constants/dropdownLists';
import Loading from '../../core/components/Loading.vue';

const doctorStore = useDoctorStore();
const modal = useModalStore();

const update = ref(false);
const doctor = ref('');


const {select,openSelectList,closeSelectList,activeClass,dropDownName,selectedItem} = useDropDown();

function createStatus(){
    update.value = false
}
onMounted(async()=>{
    await doctorStore.getAll();
})


async function getPage({page =1,limit=10,sort='asc'}={}){
    await doctorStore.getAll({
        page,
        limit,
        sort
    });
}

async function getDoctor (id) {
    update.value = true;
    doctor.value = await doctorStore.getDoctor(id);
    console.log('doctor : ',doctor.value)
    modal.toggleModal(Modals.ADD_DOCTOR_MODAL);

}
</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                هيئة التدريس
            </template>
            <template #description>
                هنا توجد لسته هيئة التدريس وكل ما يمكنك فعله بهم
            </template>
        </SectionTitle>
        <AddButton :toggle-modal="modal.toggleModal" :state="createStatus" :modalName="Modals.ADD_DOCTOR_MODAL" >
            إضافة دكتور
        </AddButton>
    </div>

    <div v-if="doctorStore.doctorsData.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
        <p class="text-xs mt-1 font-light text-black-500">لا يوجد أفراد هيئة تدريس مسجلون بعد...</p>
    </div>

    <Loading v-if="doctorStore.loading"></Loading>
    <Pagination v-if="doctorStore.doctorsData.length>0" :import-file="true" :get-page="getPage" :current-page="doctorStore.currentPage" :total-data="doctorStore.totalData" :total-pages="doctorStore.totalPages">
        <template #table-header>
            <th>الإسم رباعي</th>
            <th>الرتبة</th>
            <th>الرقم المكتبي</th>
            <th>القسم</th>
            <th>البريد الإلكتروني</th>
            <th>إجراءات</th>
        </template>
        <template #table-body>
            <tr v-for="doctor in doctorStore.doctorsData" class="text-xs cursor-default font-medium text-black-700 transition-colors hover:bg-hover hover:text-secondary">
                <td >د. {{ doctor.fullname }}</td>
                <td >{{  doctor.title }}</td>
                <td >{{doctor.officeNum}}</td>
                <td >{{ doctor.department }}</td>
                <td >{{ doctor.email }}</td>
                <td >
                    <div class="relative">
                        <button @click="openSelectList(dropdownLists.SELECT_OPTIONS_DROPDWON),selectedItem = doctor.id" class="outline-none border-none bg-none cursor-pointer text-black-500 text-xl font-normal transition-colors hover:text-secondary">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div v-if="dropDownName === dropdownLists.SELECT_OPTIONS_DROPDWON && selectedItem === doctor.id" :class="activeClass" class=" absolute top-5 right-0 w-full bg-white shadow-lg z-30 shadow-light rounded-lg">
                            <button class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-show text-l"></i>
                                <span>عرض</span>
                            </button>
                            <button @click="closeSelectList(),getDoctor(doctor.userId)" class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-edit-alt text-l"></i>
                                <span>تعديل</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </template>
    </Pagination>


      <Modal v-if="modal.modalName === Modals.ADD_DOCTOR_MODAL">
        <template #title>
            {{
                update?'تعديل دكتور':'إضافة دكتور'
            }}
        </template>
        <template #form>
            <DoctorForm :update="update" :data="doctor" ></DoctorForm>
        </template>
    </Modal>
</template>

