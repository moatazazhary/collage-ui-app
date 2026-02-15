import { reactive, ref } from "vue";

export function useUploadImage (){
    const photos = reactive({
        personalPhoto :{file : null,progress : 0,uploading:false,errors:[]},
        idPhoto :{file : null,progress : 0,uploading:false,errors:[]},
        paymentPhoto:{file:null,progress : 0,uploading : false,errors:[]},
        Course:{file:null,progress : 0,uploading : false,errors:[]}
    });

    const loading = ref(false);
    
    const readImage = (event,key)=>{
        const file = event.target.files[0];
        const maxSize = 1 * 1024 * 1024;
        const extension = file.name.split('.').pop().toLowerCase();

        const allowes = ['png','jpg','jpeg'];

        if(!file)
            return;

        if(!allowes.includes(extension)){
            photos[key].errors.push('مسموح فقط بالصور بإمتداد .png ، .jpg ، .jpeg');
            photos[key].file = null;
            return;
        }

        if(file.size > maxSize){
            photos[key].errors.push('حجم الصورة كبير جداً ، يجب ألا يتخطى ال 2MB');
            photos[key].file = null;
            return;
        }
            

        photos[key].file = file;
        photos[key].uploading = true;
        loading.value = true;

        const reader = new  FileReader()

        reader.onload = ()=>{

            const interval = setInterval(() => {
                photos[key].progress += Math.random()*15;
                if(photos[key].progress >= 100){
                    photos[key].progress = 100;
                    clearInterval(interval);
                    loading.value = false
                }

                setTimeout(() => {
                    photos[key].errors = []
                    photos[key].uploading = false
                }, 1800);
            }, 200);
            
        }

        reader.readAsDataURL(file);
    }


    return {photos,loading,readImage}
}