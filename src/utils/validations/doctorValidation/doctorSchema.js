import { toTypedSchema } from "@vee-validate/zod";
import {z} from "zod";

export const doctorSchema = toTypedSchema(
    z.object({
        fullname : z.string('هذا الحقل مطلوب').min(1,' هذا الحقل مطلوب').min(10,'لا يمكن أن يكون الإسم أقل من 10 أحرف'),
        email : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^[a-zA-Z0-9_+-]+@(gmail\.com|outlook\.com|outlook\.sa|hotmail\.com)$/,'البريد الإلكنروني غير صالح'),
        phone : z.string('هذا الحقل مطلوب').regex(/^(10|11|12|90|91|92|96|99)\d{7}$/,'رقم الهاتف غير صحيح'),
        title : z.string().min(5,{message:"لا يمكن أن تكون الرتبة أقل من 5 خانات"}),
        address : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        officeNum : z.number('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        departmentId : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب')
    })
)