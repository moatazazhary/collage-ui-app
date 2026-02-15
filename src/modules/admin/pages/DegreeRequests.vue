<script setup>
import { onMounted } from 'vue';
import { useDegreeStore } from '../../../stores/degree.store';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
import dropdownLists from '../../../constants/dropdownLists';
import { useDropDown } from '../../../composables/useDropDown';
import Modal from '../components/Modal.vue';
import { useModalStore } from '../../../stores/modal.store';
import Modals from '../../../constants/Modals';
import Loading from '../../core/components/Loading.vue';
import { useDate } from '../../../composables/useDate';


const degreeStore = useDegreeStore();
const modal = useModalStore();

const {openSelectList,activeClass,dropDownName,selectedItem} = useDropDown();

const {dateFormat} = useDate();

onMounted(async()=>{
    await degreeStore.getAll();

})

async function getPage({page =1,limit=10,sort='asc'}={}){
    await degreeStore.getAll({
        page,
        limit,
        sort
    });
}
</script>

<template>

    <div class="flex items-center justify-between">
        <SectionTitle>
            <template #title>
                طلبات الشهادات
            </template>
            <template #description>
                هنا توجد لسته طلبات الشهادات وكل ما يمكنك فعله بهم
            </template>
        </SectionTitle>
    </div>
    
    <div v-if="degreeStore.requestsData.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
        <p class="text-xs mt-1 font-light text-black-500">لا توجد طلبات شهادات بعد...</p>
    </div>
    <Loading v-if="degreeStore.loading"></Loading>
    <Pagination v-if="degreeStore.requestsData.length > 0" :import-file="false" :get-page="getPage" :total-data="degreeStore.totalData" :current-page="degreeStore.currentPage" :total-pages="degreeStore.totalPages">
        <template #table-header>
            <th>مقدم الطلب</th>
            <th>تاريخ الطلب</th>
            <th>نوع الشهادة</th>
            <th>الحالة</th>
            <th>إجراءات</th>
        </template>
        <template #table-body>
            <tr  v-for="request in degreeStore.requestsData" class="text-xs cursor-pointer font-medium text-black-700 transition-colors hover:bg-hover hover:text-secondary">
                <td >{{ request.fullnameArabic }}</td>
                <td >{{dateFormat(request.createdAt)}}</td>
                <td class="grid grid-cols-1 gap-2 w-fit md:grid-cols-2">
                    <span v-for="value in request.degreeTypes" class="text-[10px] font-medium px-2 w-fit h-fit py-1 text-center rounded-lg border text-primary border-primary bg-[#ebecf5]">{{ value }}</span>
                </td>
                <td >
                    <!-- <span class="text-xs font-medium px-3  h-fit py-1 rounded-lg border text-alertText-yellow border-alertText-yellow bg-alertback-yellow">{{ request.status }}</span> -->
                    <span class="text-[10px] text-center font-medium px-2 w-fit h-fit py-1 rounded-lg border" :class="request?.status === 'مرفوض' ? 'text-alertText-red border-alertText-red bg-alertback-red':request?.status === 'مكتمل' ? 'text-success border-success bg-success-light':'text-alertText-yellow border-alertText-yellow bg-alertback-yellow'">{{request?.status}}</span>

                </td>
                <td @click.stop class="cursor-default">
                    <div class="relative">
                        <button @click="openSelectList(dropdownLists.SELECT_OPTIONS_DROPDWON),selectedItem = request.id" class="outline-none border-none bg-none cursor-pointer text-black-500 text-xl font-normal transition-colors hover:text-secondary">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div v-if="dropDownName === dropdownLists.SELECT_OPTIONS_DROPDWON && selectedItem === request.id" :class="activeClass" class=" absolute top-5 right-0 w-full bg-white shadow-lg z-30 shadow-light rounded-lg">
                            <router-link :to="`/admin/request-details/${request.id}`" class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-show text-l"></i>
                                <span>معاينة</span>
                            </router-link>
                            <!-- <button @click="closeSelectList(),getDoctor(doctor.id)" class="cursor-pointer w-full outline-none border-none flex items-center gap-2 text-black-500 bg-none py-2 px-4 rounded-lg font-normal text-xs transition-colors hover:bg-hover hover:text-secondary">
                                <i class="bx bx-edit-alt text-l"></i>
                                <span>تعديل</span>
                            </button> -->
                        </div>
                    </div>
                </td>
            </tr >
        </template>
    </Pagination>


     <Modal v-if="modal.modalName === Modals.DEGREE_REQUEST_DETAILS">
        <template #title>
            {{
               'تفاصيل الطلب'
            }}
        </template>
        <template #form>
            <div class="flex gap-10">
                <div>
                    <div>
                        <h2 class="text-l font-medium text-black-700"> بيانات الطلب :</h2>
                        <div class="flex flex-col gap-3 mt-5">
                            <div v-for="value in 4" class="flex items-center gap-1">
                                <p class="text-xs font-medium text-black-700">الإسم بالعربي :</p>
                                <span class="text-xs font-normal text-black-500">فلان الفلاني ابن علان العلاني</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-l font-medium text-black-700"> المستندات :</h2>
                        <div class=" mt-5">

                            <div>
                                <p class="text-xs font-medium text-black-700">صورة الإثبات :</p>
                                <img class="object-cover" style="width: 200px; height: 300px;" src="../../../../public/images/Styles=3.svg" alt="">
                            </div>
                            <div>
                                <p class="text-xs font-medium text-black-700">صورة الإشعار :</p>
                                <img class="w-52" src="../../../../public/images/Styles=3.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                     <div >
                        <p class="text-xs font-medium text-black-700">الصورة الشخصية :</p>
                        <img class="w-52" src="../../../../public/images/Styles=3.svg" alt="">
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

