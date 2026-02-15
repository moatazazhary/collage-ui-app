import { z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'


export const verificationSchema = toTypedSchema(
    z.object({
        otp1 : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        otp2 : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        otp3 : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        otp4 : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        otp5 : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
    })
)