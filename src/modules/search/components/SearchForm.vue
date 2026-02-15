<script setup>
import { useModalStore } from '../../../stores/modal.store';
import modals from '../../../constants/modals'
import { computed, onMounted, reactive, ref } from 'vue';
import { useFileStore } from '../../../stores/file.store';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import Modal from '../../core/components/Modal.vue';
import { useDepartmentStore } from '../../../stores/department.store';
const fileStore = useFileStore();
    const modal = useModalStore();
    const departmentStore = useDepartmentStore();

    const search = ref('');
    const filters=reactive({
        departments:[],
        sort:''
    });

    onMounted(async ()=>{
        await departmentStore.getAll();
    })
    async function onSearch (){

        if(search.value.trim()){
            await fileStore.search({
                search:search.value,
                sort:filters.sort,
                departments:filters.departments.map(d=>d)
            })
        }else{
            fileStore.searchData.length = []
        }
        modal.closeModal();
    }

    function selectItem(isSelected,title){
        isSelected ? filters.departments.push(title) : filters.departments.pop(title)
    }
</script>

<template>
    <form @submit.prevent="onSearch">
        <div class="mt-5">
            <div @click.stop class="mt-3 input-box h-[52px] flex items-center px-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <i class='bx bx-search-alt text-black-200 ' ></i>
                <input @blur="onSearch" v-model="search"  @click.stop placeholder="أبحث عن بحث" type="text" class=" w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 ">
                <button @click.stop="modal.toggleModal(modals.FILTER_MODAL)" type="button" class="relative cursor-pointer outline-none bg-none border-none">
                    <i  class="bx bx-filter-alt text-black-200"></i>
                    <span v-if="filters.departments.length > 0 || filters.sort"  class="absolute -top-1.5 -right-2 w-4 h-4 font-medium text-xs bg-primary-light rounded-full flex items-center justify-center text-back">{{filters.departments.length + (filters.sort ? 1 : 0)}}</span>
                </button>
                <button @click="togglePass" type="button" class="hidden outline-none bg-none border-none">
                    <i class="bx bx-x text-black-200"></i>
                </button>
            </div>
        </div>


        <Modal v-if="modal.modalName === modals.FILTER_MODAL">
            <h3 class="text-l font-medium text-black-700">تصفية</h3>
            <div class="mt-10">
                <h3 class="text-lg font-medium text-black-700">الأقسام</h3>
                <div class="mt-5 flex items-center flex-wrap gap-3">
                    <span v-for="department in departmentStore.data" @click="department.isSelected = !department.isSelected,selectItem(department.isSelected,department.title)" :class="department.isSelected ? 'border-secondary bg-hover':'border-black-200 bg-white'" class="cursor-pointer py-2 px-5 rounded-lg text-xs font-normal border ">{{ department.title }}</span>
                </div>
            </div>

            <div class="mt-10">
                <h3 class="text-lg font-medium text-black-700">ترتيب ب </h3>
                <div class="mt-5 flex items-center flex-wrap gap-3">
                    <span class="cursor-pointer py-2 px-5 rounded-lg text-xs font-normal border border-black-200 bg-white" @click="filters.sort = 'asc'" :class="filters.sort === 'asc'?'border-secondary bg-hover':'border-black-200 bg-white'">الأقدم</span>
                    <span class="cursor-pointer py-2 px-5 rounded-lg text-xs font-normal border border-black-200 bg-white" @click="filters.sort = 'desc'" :class="filters.sort === 'desc'?'border-secondary bg-hover':'border-black-200 bg-white'" >الأحدث</span>
                </div>
            </div>

            <div class="mt-10">
                <SubmitBtn>تطبيق الفلتر</SubmitBtn>
            </div>
        </Modal>
    </form>
</template>