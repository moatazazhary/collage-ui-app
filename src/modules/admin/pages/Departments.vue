<script setup>
import { onMounted } from 'vue';
import { useDepartmentStore } from '../../../stores/department.store';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
import Loading from '../../core/components/Loading.vue';


const departmentStore = useDepartmentStore();

onMounted(async ()=>{
    await departmentStore.getAll();
})
</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                الأقسام
            </template>
            <template #description>
                هنا توجد لسته الأقسام وكل ما يمكنك فعله بهم
            </template>
        </SectionTitle>
        <!-- <AddButton>
            إضافة قسم
        </AddButton> -->
    </div>
    
    <Loading v-if="departmentStore.loading"></Loading>
    <Pagination>
        <template #table-header>
            <th>الإسم</th>
            <th>عدد الطلاب</th>
             <th>عدد الدكاترة</th>
            <th>إجراءات</th>
        </template>
        <template #table-body>
            <tr v-for="department in departmentStore.data" class="text-xs cursor-default font-medium text-black-700 transition-colors hover:bg-hover hover:text-secondary">
                <td >{{ department.title }}</td>
                <td >{{department.students.length}}</td>
                <td >{{department.doctors.length}}</td>
                <td >
                    <div class="relative">
                        <button class="outline-none border-none bg-none cursor-pointer text-black-500 text-xl font-normal transition-colors hover:text-secondary">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div v-if="false" class=" absolute top-5 right-0 w-full bg-white shadow-lg shadow-light rounded-lg">
                            <button class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-show text-l"></i>
                                <span>عرض</span>
                            </button>
                            <button class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-edit-alt text-l"></i>
                                <span>تعديل</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </template>
    </Pagination>
</template>

