import { reactive, ref } from "vue";

export function useUploadFile (){
    const files = reactive({
        Course:{file:null,progress : 0,uploading : false,errors:[]}
    });

    const loading = ref(false);
    
    const readFile = (event,key,type='')=>{
        const file = event.target.files[0];
        const maxSize = 4 * 1024 * 1024;
        const extension = file.name.split('.').pop().toLowerCase();

        const allowes = ['png','jpg','jpeg','doc','docx','ppt','pptx','xls','xlsx','pdf']

        if(!file)
            return;

        if(type){
            console.log('type : ',type)
            if(!['.doc','.docx','.ppt','.pptx','.xls','.xlsx','.pdf'].includes(extension)){
                files[key].errors.push("مسموح فقط برفع ملفات بهذه الإمتدادات : ['.doc','.docx','.ppt','.pptx','.xls','.xlsx','.pdf']");
                files[key].file = null;
                return;
            }
        }
        if(!allowes.includes(extension)){
            files[key].errors.push("مسموح فقط برفع ملفات بهذه الإمتدادات : ['png','jpg','jpeg','.doc','.docx','.ppt','.pptx','.xls','.xlsx','.pdf']");
            files[key].file = null;
            return;
        }

        if(file.size > maxSize){
            files[key].errors.push('حجم الملف كبير جداً ، يجب ألا يتخطى ال 4MB');
            files[key].file = null;
            return;
        }
            

        files[key].file = file;
        files[key].uploading = true;
        loading.value = true;

        const reader = new  FileReader()

        reader.onload = ()=>{

            const interval = setInterval(() => {
                files[key].progress += Math.random()*15;
                if(files[key].progress >= 100){
                    files[key].progress = 100;
                    clearInterval(interval);
                    loading.value = false
                }

                setTimeout(() => {
                    files[key].errors = []
                    files[key].uploading = false
                }, 1800);
            }, 200);
            
        }

        reader.readAsDataURL(file);
    }


    return {files,loading,readFile}
}