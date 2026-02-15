<script setup >
import { ref ,reactive, onMounted, computed} from 'vue';
import Title from '../../auth/components/title.vue';
import Modal from '../../core/components/Modal.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import UploadingFile from '../components/UploadingFile.vue';
import modals from '../../../constants/Modals';
import { useDropDown } from '../../../composables/useDropDown';
import dropdownLists from '../../../constants/dropdownLists';
import { useModalStore } from '../../../stores/modal.store';
import UploadForm from '../components/UploadForm.vue';

import { useAuthStore } from '../../../stores/authStore';
import { useFileStore } from '../../../stores/file.store';
import Loading from '../../core/components/Loading.vue';


const authStore = useAuthStore();
const fileStore = useFileStore();
const modal = useModalStore();
const {select,activeClass,selectedItem,dropDownName,closeSelectList,openSelectList} = useDropDown();

const fileType =  ref('');
const targetType = computed(()=>{
    switch(fileType.value){
        case 'محاضرة':
            return 'lecture';
        case 'ملخص':
            return 'course';
        case 'إمتحان':
            return 'exam';
        case 'بحث':
            return 'research';
    }
})
const roles = ref('');
onMounted(()=>{
    roles.value = authStore.user.roles.map(r=>r.role.name)
    fileStore.getUserFiles();
    roles.value = authStore.user.roles.map(r=>r.role.name)
})

</script>

<template>
    <div class="p-6" @click="closeSelectList">
        <Title>ملفاتي</Title>
        <div class="mt-10">
            <div class="relative">
                <button type="button" @click.stop="openSelectList(dropdownLists.ADD_FILES_DROPDWON)" class="flex items-center gap-2 cursor-pointer outline-none text-black-500 text-sm font-medium transition-colors hover:text-secondary">
                    <i class="bx bx-cloud-upload text-xl"></i>
                    <span>رفع ملفات</span>
                </button>
                <div v-if="dropDownName === dropdownLists.ADD_FILES_DROPDWON" :class="activeClass" @click.stop class="z-20 absolute top-6 right-0 rounded-lg shadow-lg shadow-light bg-white">
                    <button @click="fileType = 'ملخص',modal.toggleModal(modals.ADD_FILES_MODAL),closeSelectList()" class="px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                        <i class="bx bx-book text-lg"></i>
                        <span>ملخص</span>
                    </button>

                    <button v-if="roles.includes('دكتور')" @click="fileType = 'محاضرة',modal.toggleModal(modals.ADD_FILES_MODAL),closeSelectList()" class="px-7 py-3 flex items-center gap-2 cursor-pointer outline-none text-black-500 text-xs font-normal transition-colors hover:bg-hover hover:text-secondary">
                        <i class="bx bx-book text-lg"></i>
                        <span>محاضرة</span>
                    </button>
                </div>
            </div>

            <div v-if="fileStore.filesData.length <=0 " class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
                <p class="text-xs mt-1 font-normal text-black-500">لا توجد بيانات بعد...</p>
            </div>
            <Loading v-if="fileStore.loading > 0"></Loading>
            <div v-if="fileStore.filesData.length " class="mt-10">
                <h3 class="text-sm font-medium text-black-700">ملفاتي المرفوعة : {{ fileStore.filesData.length }}</h3>
                
                <div class="mt-5 flex flex-col gap-3">
                    <UploadingFile v-for="value in fileStore.filesData" :uploaded-file="value"></UploadingFile>
                </div>
            </div>
        </div>
        
    <Modal v-if="modal.modalName === modals.ADD_FILES_MODAL">
        <Title>رفع ملف</Title>
        <UploadForm :file-type="fileType" :target-type="targetType"></UploadForm>
    </Modal>
    </div>


</template>