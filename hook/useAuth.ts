import React from "react"
import supabase from "@/lib/supabase"
import { Alert } from "react-native";


const useAuth = () => {
    const signUpWithOTP = async ({email,password}:{email:string,password:string}) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password : password

        });
        if(error){
            Alert.alert("Can't send the otp to the email signup fails!");
        }else{
            Alert.alert("Sended the otp to the email for verification !");
        }   
    }
    const varifyEmailOTP = async ({email,token,name}:{email:string,token:string,name:string})=>{
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})
        if(error){
            Alert.alert("Enter a valid otp !");
        }else{  
            const id = data.user?.id;
            const {data:UserProfile,error:creationError} = await supabase.from("UserProfile").insert({id:id,name:name}).eq("id",id);
            if(creationError){
                await supabase.auth.signOut();
                console.log(creationError);
                Alert.alert("Can't create the user in table ")
            }else{
                return UserProfile;
            }
        }
    }
    const signInUser = async({email,password}:{email:string,password:string})=>{
        const {data,error} = await supabase.auth.signInWithPassword({
            email,
            password 
        })
        if(error){
            Alert.alert("Can't login user ")
        }else{
            return await supabase.from("UserProfile").select("*").eq("id",data.user.id);
        }
    }
    return {
        signUpWithOTP,
        varifyEmailOTP,
        signInUser
    }
}
export default useAuth