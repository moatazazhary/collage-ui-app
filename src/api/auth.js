import api from "./services/api"


export default{


    UserProfile(){
        return api.get('/auth/profile')
    },

    FetchProfile(){
        return api.get('/auth/me');
    },

    Login(identifier,password){
        return api.post('/auth/login',{identifier,password})
    },

    Logout(){
        return api.post('/auth/logout')
    },

    ChangePassword(oldPassword,newPassword,confirmPassword){
        return api.post('/auth/change-password',{
            oldPassword,
            newPassword,
            confirmPassword
        })
    },

    SendOTP(identifier,email){
        return api.post('/auth/sendOtp',{identifier,email})
    },

    VerifyOTP(otp,email){
        return api.post('/auth/verifyOtp',{otp,email})
    },

    ResetPassword(email,password,confirmPassword){
        return api.post('/auth/reset-password',{
            email,
            password,
            confirmPassword
        })
    },



}