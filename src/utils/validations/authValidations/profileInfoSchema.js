import { z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'


export const profileInfoSchema = toTypedSchema(
    z.object({
        email : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^[a-zA-Z0-9_+-]+@(gmail\.com|outlook\.com|outlook\.sa|hotmail\.com)$/,{message : 'البريد الإلكتروني غير صحيح'}),
        phone : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^(10|11|12|90|91|92|96|99)\d{7}$/,{message : 'رقم الهاتف غير صحيح'})
    })
)