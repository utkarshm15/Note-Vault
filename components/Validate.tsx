"use client"
import { InputOTPControlled } from "@/components/Otp";
import axios from "axios"
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useParams, useRouter } from "next/navigation";
import { getUser } from "@/actions/validateUser";
import { resetOtpExpiry } from "@/actions/signup";
import { toast } from "@/components/ui/use-toast";
import { sendOtp } from "@/actions/sendOtp";
import { bigint } from "zod";

interface User{
    name:string,
    email:string,
    verificationCode: string,
    verificationCodeExpiry: bigint,
}
  
export  function Validate(){
    const [time,setTime] =useState(30);
    const [loading,setLoading] = useState(true);
    const [user,setUser] =useState<User>({
      name:"",
      email:"",
      verificationCode:"",
      verificationCodeExpiry: BigInt(0)
    });

    const [model,setModel] = useState(false);
    const param = useParams<{id:string}>();
    const router = useRouter();
    //create an action that takes user id as input and returns user's details
    //call that action 
    //check if verification code is expired if expired then create new one and then send req to post email api 
    //if not send req to post email api
    //compare otps
    //if same verify the user and rediect him to login
    //if not show apt error

    useEffect(()=>{
      async function data() {
        const res = await getUser(param.id);
        if(!res.ok){
        return <div>Error</div>
        }
        if(!res.user){
        return <div>Error</div>
      }    
        setUser(res.user)
        setLoading(false);
      }
      data()
    },[])
    
    if(loading){
      return <div className='flex space-x-2 justify-center items-center bg-white h-screen '>
    <span className='sr-only'>Loading...</span>
     <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
   <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
    }  
     

  
    
    

    return <div className="bg-slate-100 h-dvh pt-40">
    <div className="">
        <h1 className="text-center text-4xl p-4 font-bold ">Verify Yourself</h1>
        <p className="text-center text-xl p-2  ">We've sent you an OTP on the email you provided. Please enter the OTP to verify yourself.</p>
        <InputOTPControlled otp={user.verificationCode} otpExpiry={Number(user.verificationCodeExpiry)} id={param.id}></InputOTPControlled>
         
    </div>
    <AlertDialog open={model} onOpenChange={setModel}>
  <AlertDialogTrigger></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Maximum Limit Reached</AlertDialogTitle>
      <AlertDialogDescription>
        You have already requested for 3 OTP resends. Signup again to Continue.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={()=>router.push("/")}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
}