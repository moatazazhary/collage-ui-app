import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';


export const createCourseSchema = toTypedSchema(
    z.object({
        name : z.string("اسم الكورس مطلوب").min(1,{message : "اسم الكورس مطلوب"}).min(10,'لا يمكن ان يكون لسم المادة أقل من 10 أحرف'),
        description : z.string(" التفاصيل مطلوبة").min(1,{message : " التفاصيل مطلوبة"}).min(20,'لا يمكن ان يكون الوصف أقل من 20 حرف').max(750,'الحد 750 حرف'),
        departmentId : z.string("القسم مطلوب").min(1,{message : "القسم مطلوب"}),
        semesterNum : z.number(" السمستر مطلوب").min(1,{message : " السمستر مطلوب"}),
        doctorId : z.string().min(0,{message : " الدكتور مطلوب"}),
        isDoctorCurrent : z.boolean().default(false)
    })
);


export const updateCourseSchema = toTypedSchema(
    z.object({
        name : z.string("اسم الكورس مطلوب").min(1,{message : "اسم الكورس مطلوب"}).min(10,'لا يمكن ان يكون لسم المادة أقل من 10 أحرف'),
        description : z.string(" التفاصيل مطلوبة").min(1,{message : " التفاصيل مطلوبة"}).min(20,'لا يمكن ان يكون الوصف أقل من 20 حرف').max(750,'الحد 750 حرف'),
        semesterNum : z.number(" السمستر مطلوب").min(1,{message : " السمستر مطلوب"}),
    })
)