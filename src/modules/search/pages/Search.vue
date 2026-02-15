<script setup >
import Title from '../../auth/components/Title.vue';
import SearchForm from '../components/SearchForm.vue';
import SearchResult from '../components/SearchResult.vue';
import { useFileStore } from '../../../stores/file.store';

const fileStore = useFileStore();

</script>

<template>
    <div class="p-6 pb-14">
        <Title>أبحث</Title>
        
        <SearchForm></SearchForm>

        <div v-if="fileStore.searchData.length <=0" class="mt-10 bg-white p-4 rounded-lg shadow-lg shadow-light">
            <p class="text-xs mt-1 font-normal text-black-500">لا توجد بيانات بعد...</p>
        </div>
        <div v-if="fileStore.searchData.length > 0" class="mt-10">
           <!-- <Pagination :current-page="fileStore.currentPage" :total-data="fileStore.totalData" :total-pages="fileStore.totalPages" :import-file="false"> -->
                <h4 class="text-sm font-medium text-black-700">نتائج البحث : {{ fileStore.searchData.length }}</h4>
                <div  class="mt-10 flex flex-col gap-3">
                    <SearchResult v-for="result in fileStore.searchData" :result="result" ></SearchResult>
                </div>
           <!-- </Pagination> -->
        </div>
    </div>


</template>
