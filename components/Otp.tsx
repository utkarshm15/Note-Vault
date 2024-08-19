"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"
import { verify } from "@/actions/validateUser"

export function InputOTPControlled({otp,otpExpiry,id}:{otp:string,otpExpiry:number,id:string}) {
  const [value, setValue] = React.useState("")
  const router = useRouter();

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value.length != 6 ? (
          <>Enter your one-time password.</>
        ) : (
          <button onClick={async()=>{
            if(otpExpiry-Date.now()<=0){
              toast({
                variant:"destructive",
                description:"Your OTP has expired, please signup again."
              })
            }else{
              if(otp===value){
                  const res = await verify(id);
                  if(!res.ok){
                    return toast({variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",})
                  }
                  toast({
                      title:"Verified successfully",
                      description:"Your account has been registered successfully."
                    })
                  router.push("/")
              }else{
                toast({
                  variant:"destructive",
                  title:"Invalid OTP",
                  description:"Please try again"
                })
              }
            }
          }} className="bg-green-400 rounded py-1 px-3 mt-2 text-white text-lg hover:bg-green-600">Verify</button>
        )}
      </div>
    </div>
  )
}
