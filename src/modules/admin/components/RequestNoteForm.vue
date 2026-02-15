<script setup>
import { useForm,useField } from 'vee-validate';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import { requestNoteForm } from '../../../utils/validations/degreeValidations.js/requestNoteForm';
import { useDegreeStore } from '../../../stores/degree.store';
import { useModalStore } from '../../../stores/modal.store';


    const props = defineProps({
        requestId : String ,
        reject:Boolean,
        submit:Function
    });


    const {handleSubmit} = useForm({
        validationSchema : requestNoteForm
    });

    const modal = useModalStore();

    const degreeStore = useDegreeStore();
    const {value:notes, errorMessage:notesError} = useField('notes');

    const onSubmit = handleSubmit(async (data)=>{
        data.id = props.requestId;
        await props.submit(data);
        modal.closeModal();
    });

</script>

<template>
    <form @submit.prevent="onSubmit()">
        <div class="">
            <label for="" class="text-sm font-normal ">{{ 
                props.reject ? 'سبب الرفض (ملاحظات)' : 'توجيهات (ملاحظات)' }}</label>
            <div :class="{'validation-error':notesError}" class="mt-3 input-box h-auto flex items-center p-2 gap-2 border-2 text-xl font-normal bg-hover border-hover rounded-lg ">
                <textarea v-model="notes" rows="4" placeholder="" type="text" class="w-full h-full text-l outline-none border-none placeholder:text-xs text-gray-400 "></textarea>
            </div>
            <ErrorSpan v-if="notesError">{{ notesError }}</ErrorSpan>
        </div>

        <div class="mt-5">
            <SubmitBtn :loading="degreeStore.loading">تأكيد</SubmitBtn>
        </div>
    </form>
</template>