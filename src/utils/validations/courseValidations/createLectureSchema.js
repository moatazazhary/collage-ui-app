import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

export const createLectureSchema = toTypedSchema(
    z.object({
        courseId : z.string().min(1,{message : " الشخص مطلوب"}),
        title : z.string().min(1,{message : " العنوان مطلوب"}).min(10,'اسم المحاضرة لا يجب أن يكون أقل من 10 أحرف!')
    })
);
