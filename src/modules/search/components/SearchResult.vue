<script setup>
    const props = defineProps({
        result:Object
    })


    
    const wordExtentions = ['.doc','.docx']
    const powerPointExtentions = ['.ppt','.pptx']
    const excelExtentions = ['.xls','.xlsx']
    const imageExtentions = ['.png','.jpg','.jpeg']


function getFileType(extension){

    if(wordExtentions.includes(extension))
        return 'Word'
    else if(powerPointExtentions.includes(extension))
        return 'PowerPoint'
    else if(imageExtentions.includes(extension))
        return 'Image'
    else if(excelExtentions.includes(extension))
        return 'Excel'
    else return 'pdf'
}
</script>

<template>
    <router-link :to="`/search/details/${props.result.id}`" class="cursor-pointer bg-white rounded-lg shadow-lg shadow-[rgba(0,0,0,.04)] p-4 flex items-center gap-5 transition-transform ease-in-out hover:-translate-y-1">
        <img class="w-14" :src="`../../../../public//icons/${getFileType(props.result.extension)}.svg`" alt="">
        <div>
            <h3 class="text-sm text-black-700 font-medium">{{ props.result.title }}</h3>
            <p class="text-xs font-normal text-black-500 mt-3">{{ props.result.department }}</p>
            
            <span class="mt-3 text-xs font-light text-black-500 flex items-center gap-2">
                <span>ملف {{getFileType(props.result.extension)}}</span>
                -
                <span>{{(props.result.size / 1024 / 1024).toLocaleString('en-US',{
                            minimumFractionDigits:2,
                            maximumFractionDigits:2
                        })+'MB'}}</span>
            </span>
        </div>
    </router-link>
</template>