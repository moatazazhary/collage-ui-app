import {z} from 'zod'
import {toTypedSchema} from '@vee-validate/zod'


export const setPasswordShcema = toTypedSchema(
    z.object({
        newPassword : z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب').superRefine((value,ctx)=>{
            if(!/[A-Z]/.test(value)){
                ctx.addIssue({
                    code : z.ZodIssueCode.custom,
                    message : 'يجب أن تحتوي على حرف كبير واحد على الأقل'
                })
            }

            if(!/[a-z]/.test(value)){
                ctx.addIssue({
                    code : z.ZodIssueCode.custom,
                    message : 'يجب أن تحتوي على حرف صغير واحد على الأقل'
                })
            }

            if(!/[0-9]/.test(value)){
                ctx.addIssue({
                    code : z.ZodIssueCode.custom,
                    message : 'يجب أن تحتوي على حرف رقم واحد على الأقل'
                })
            }

            if(!/[!@#%&]/.test(value)){
                ctx.addIssue({
                    code : z.ZodIssueCode.custom,
                    message : 'يجب أن تحتوي على رمز واحد على الأقل من هذه الرموز [! @ # % &]'
                })
            }

            if(value.length < 7){
                ctx.addIssue({
                    code : z.ZodIssueCode.custom,
                    message :'يجب أن تكون أكبر من 6 أحرف'
                })
            }
                
        }),
        confirmPassword: z.string('هذا الحقل مطلوب').min(1,'هذا الحقل مطلوب')
    }).refine(data=> data.confirmPassword === data.newPassword ,{message:'كلمة السر غير متطابقة',path:["confirmPassword"]})
)