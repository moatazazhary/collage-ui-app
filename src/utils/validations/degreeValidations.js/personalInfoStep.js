import { toTypedSchema } from "@vee-validate/zod";
import {z} from 'zod'


export const personalInfoStepSchema = toTypedSchema(
    z.object({
        fullnameEnglish : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^[A-Z a-z]+$/,'يجب إدخال أحرف إنجليزية فقط').min(15,'لا يمكن أن يكون أقل من 15 حرف'),
        degreeTypes : z.array(z.string('هذه البيانات مطلوبة')).min(1,'يجب إختيار نوع واحد على الأقل')
    }),
)