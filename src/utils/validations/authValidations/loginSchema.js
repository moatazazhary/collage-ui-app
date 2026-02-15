import {z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'
export const loginSchema = toTypedSchema(
    z.object({
    identifier:z.string('الحقل مطلوب').min(10,'مسموح ب 10 أحرف على الأقل'),
    password : z.string('الحقل مطلوب').min(1,'الحقل مطلوب')
}).refine(data=>{
        const emailRegex = /^[a-zA-Z0-9_+-]+@(gmail\.com|outlook\.com|outlook\.sa|hotmail\.com)$/
    if(data.identifier.includes('@')){
        return emailRegex.test(data.identifier)
    }else
        return true;
},{message : 'البريد الإلكتروني غير صحيح',path:["identifier"]}).refine(data=>{
    const studentIdRegex = /^\d{2}\/\d{7,8}$/
    if(!data.identifier.includes('@')){
        return studentIdRegex.test(data.identifier)
    }else
        return true;
},{message : 'الرقم الجامعي غير صحيح',path:["identifier"]})
)