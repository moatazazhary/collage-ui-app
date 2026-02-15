import { toTypedSchema } from "@vee-validate/zod";
import {z} from "zod";

export const paymentStepSchema = toTypedSchema(
    z.object({
        bankId : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب'),
    }),
)