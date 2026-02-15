<script setup>
const props = defineProps({
    uploadedFile:Object
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
    <div class="flex items-center justify-between bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.02)]">
        <div class="flex items-center gap-5">
            <img class="w-6" :src="`../../../../public/icons/${getFileType(uploadedFile?.extension)}.svg`" alt="">
            <div >
                <h5 class="text-sm text-black-700 font-medium">{{uploadedFile?.title}}</h5>
                <p class="text-xs text-black-500 font-normal mt-2">{{uploadedFile?.type}}</p>
            </div>
        </div>
    </div>
</template>