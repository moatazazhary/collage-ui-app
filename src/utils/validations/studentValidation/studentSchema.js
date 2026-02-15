import { toTypedSchema } from "@vee-validate/zod";
import {z} from "zod";

export const studentSchema = toTypedSchema(
    z.object({
        fullname : z.string('هذا الحقل مطلوب').min(1,' هذا الحقل مطلوب').min(10,'لا يمكن أن يكون الإسم أقل من 10 أحرف'),
        email : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^[a-zA-Z0-9_+-]+@(gmail\.com|outlook\.com|outlook\.sa|hotmail\.com)$/,'البريد الإلكنروني غير صالح').optional(),
        phone : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').regex(/^(10|11|12|90|91|92|96|99)\d{7}$/,'رقم الهاتف غير صحيح').optional(),
        facultyNum : z.string('هذا الحقل مطلوب').regex(/^\d{2}\/\d{7,8}$/,'الرقم الجامعي غير صحيح'),
        address : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        semesterNum : z.number('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
        departmentId : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب')
    })
)


