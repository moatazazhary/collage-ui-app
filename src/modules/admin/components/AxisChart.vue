
<script setup>

import {
  Chart as ChartJs,BarController,LineController,Filler,LineElement,Title,Tooltip,Legend,BarElement,PointElement,CategoryScale,LinearScale
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { useChart } from '../../../composables/useChart';
import { onMounted, ref, watch } from 'vue';

ChartJs.register(Title,Tooltip,Legend,BarController,Filler,BarElement,CategoryScale,LinearScale,LineController,PointElement,LineElement,ChartDataLabels);

const {axisChartOptions} = useChart();

const props = defineProps({
    data:Array,
    labels:Array,
    chartType:String,
    chartTitle:String,
    backgroundColors:Array
})

const chartRef = ref(null)
let chartInstance = null
onMounted(async()=>{

    let datasetOpions = {};
    switch(props.chartType){
        case 'bar':
            datasetOpions = {
                borderWidth: 1,
                backgroundColor:props.backgroundColors,
            }
            break;
        case 'line':
            datasetOpions = {
                borderWidth: 2,
                borderColor:props.backgroundColors,
                fill:true,
                tension:0.9,
                pointRadius:3,
                pointHoverRadius:7,
                backgroundColor:'#fcf7e7'
            }
            break;
    }
    const chartData = ref({
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                
                ...datasetOpions
            }
        ]
    })

    const ctx = chartRef.value.getContext('2d')
    chartInstance = new ChartJs(ctx, {
            type: `${props.chartType}`,
            data: chartData.value,
            options: axisChartOptions(true,props.chartTitle)
        })
    })

watch([props.data,props.labels], (newData,newLabels) => {
    console.log('newData : ',newData)
     console.log('newLabels : ',newLabels)
  if(chartInstance){
    chartInstance.data.labels = newData
    chartInstance.data.datasets[0].data = newLabels
    chartInstance.update()
  }
})


</script>

<template>
    <div class="w-full h-full" >
        <canvas ref="chartRef"></canvas>
    </div>
</template>