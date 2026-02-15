import { toTypedSchema } from "@vee-validate/zod";
import {z} from 'zod'


export const requestNoteForm = toTypedSchema(
    z.object({
        notes : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').min(15,'لا يمكن أن يكون أقل من 15 حرف'),
    }),
)