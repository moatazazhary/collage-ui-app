import { z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'


export const sendVerificationSchema = toTypedSchema(
    z.object({
        email : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^[a-zA-Z0-9_+-]+@(gmail\.com|outlook\.com|outlook\.sa|hotmail\.com)$/,{message : 'البريد الإلكتروني غير صحيح'}),
    })
)