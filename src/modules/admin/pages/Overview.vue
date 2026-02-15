<script setup >
import {  onMounted, ref} from 'vue';
import SectionTitle from '../components/SectionTitle.vue';
import { useDashboardStore } from '../../../stores/dashboard.store';
import AxisChart from '../components/AxisChart.vue';
import Loading from '../../core/components/Loading.vue';

const dashboardStore = useDashboardStore();


const kpis = ref('');
const filesStatusSummary = ref('');
const degreeStatusSummary = ref('');
const fileActivitySummary = ref('');

function prepareChart (object,type,title,...backColors){
    return {
        data:Object.values(object),
        labels:Object.keys(object),
        type,
        title:title,
        backColors:backColors
        
    }
}
onMounted(async()=>{
    kpis.value = await dashboardStore.getKpis();
    const FileSummarydata = await dashboardStore.getFileStatusSummary();
    const degreeSummaryData = await dashboardStore.getDegreeStatusSummary();
    const fileSummary = await dashboardStore.getFileActivitySummary();

    filesStatusSummary.value = prepareChart(FileSummarydata,'bar','توزيع طلبات الملفات حسب الحالة','#c8aa3e','#009689','#e9101a')
    degreeStatusSummary.value =  prepareChart(degreeSummaryData,'bar','توزيع طلبات الشهادات حسب الحالة','#c8aa3e','#c8aa3e','#009689','#e9101a')
    fileActivitySummary.value = prepareChart(fileSummary,'line','نشاط طلبات الملفات خلال آخر 30 يوم','#e3b618')
})

</script>

<template>
    <SectionTitle>
        <template #title>
            مرحباً : المدير
        </template>
        <template #description>
            هنا نظرة عامة عن كل شئ
        </template>
    </SectionTitle>

    <Loading v-if="dashboardStore.loading"></Loading>
    <div>
        <div class="mt-5 grid grid-cols-2 items-center gap-3 md:grid-cols-4">
            <div class="rounded-lg shadow-lg shadow-light bg-white p-4">
                <div class="flex items-center gap-3">
                    <i class="bx bx-user p-2 rounded-lg bg-alertback-yellow text-alertText-yellow"></i>
                    <h2 class="text-sm font-medium text-black-500">الطلاب</h2>
                </div>
                <h3 class="text-black-700 text-lg text-center mt-2 font-semibold">{{kpis?.students}}</h3>
            </div>

            <div class="rounded-lg shadow-lg shadow-light bg-white p-4">
                <div class="flex items-center gap-3">
                    <i class="bx bx-file-blank p-2 rounded-lg bg-alertback-red text-alertText-red"></i>
                    <h2 class="text-sm font-medium text-black-500">ملفات بإنتظار المراجعة</h2>
                </div>
                <h3 class="text-black-700 text-lg text-center mt-2 font-semibold">{{kpis?.pendingFiles}}</h3>
            </div>

            <div class="rounded-lg shadow-lg shadow-light bg-white p-4">
                <div class="flex items-center gap-3">
                    <i class="bx bx-book-open p-2 rounded-lg bg-success-light text-success"></i>
                    <h2 class="text-sm font-medium text-black-500">طلبات شهادات بإنتظار الموافقة</h2>
                </div>
                <h3 class="text-black-700 text-lg text-center mt-2 font-semibold">{{kpis?.pendingDegrees}}</h3>
            </div>
            <div class="rounded-lg shadow-lg shadow-light bg-white p-4">
                <div class="flex items-center gap-3">
                    <i class="bx bx-book p-2 rounded-lg bg-hover text-primary"></i>
                    <h2 class="text-sm font-medium text-black-500">إجمالي المحاضرات</h2>
                </div>
                <h3 class="text-black-700 text-lg text-center mt-2 font-semibold">{{kpis?.lectures}}</h3>
            </div>
        </div>
    
        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div class="rounded-lg shadow-lg shadow-light bg-white p-4 ">
                <AxisChart v-if="filesStatusSummary" :background-colors="filesStatusSummary.backColors" :chart-title="filesStatusSummary.title" :chart-type="filesStatusSummary.type" :data="filesStatusSummary.data" :labels="filesStatusSummary.labels" ></AxisChart>
            </div>

            <div class="rounded-lg shadow-lg shadow-light bg-white p-4 ">
                <AxisChart v-if="degreeStatusSummary" :background-colors="degreeStatusSummary.backColors" :chart-title="degreeStatusSummary.title" :chart-type="degreeStatusSummary.type" :data="degreeStatusSummary.data" :labels="degreeStatusSummary.labels" ></AxisChart>

            </div>

            <!-- <div class="rounded-lg shadow-lg shadow-light bg-white p-4">
            </div> -->

            <!-- <canvas ref="canvas"></canvas> -->
        </div>
        <div class="mt-5 rounded-lg shadow-lg shadow-light bg-white p-4 ">
                <AxisChart v-if="fileActivitySummary" :background-colors="fileActivitySummary.backColors" :chart-title="fileActivitySummary.title" :chart-type="fileActivitySummary.type" :data="fileActivitySummary.data" :labels="fileActivitySummary.labels" ></AxisChart>
        </div>
    </div>
</template>

<style>
    .validation-error{
        border : 1.5px solid #ff6467;
        outline: 1.5px #ff6467 ;
    }
    .validation-error  i{
        color: #ff6467;
    }

    .input-box:focus-within {
        transition: .3s all;
        border : 2px solid var(--color-primary);
        color: var(--color-primary);
    }
    .input-box:focus-within i {
        transition: .3s all;
        color: var(--color-primary);
    }
    .input-box input:focus{
        outline: none !important;
    }

</style>