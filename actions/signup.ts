"use server"
import bcrypt from "bcrypt"
import prisma from "@/lib/db"

interface SignupUser {
    name : string,
    email : string
    password : string,
}

export async function signup({name,email,password}:SignupUser){
    const otp = Math.floor(Math.random()*1000000).toString();
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        //check if user exists 
        //if exists check if verified 
        // if verified then show error and redirect to signin
        // if not verified then save new entries and send him to get verified
        //if user does not exists then below code
        const existingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(existingUser){
            if(existingUser.isVerified){
                return {
                    ok:false,
                    message: "User already exists"
                }
            }else{
                await prisma.user.update({
                    where:{
                        id : existingUser.id
                    },
                    data:{
                        name,
                        email,
                        password:hashedPassword,
                        verificationCode:otp,
                        verificationCodeExpiry:(Date.now()+3600000)
                    }
                })
                return {
                    ok: true,
                    id: existingUser.id,
                    message:"Signed up successfully"
                }
            }
        }
        const user = await prisma.user.create({data:{
            name,
            email,
            password : hashedPassword,
            verificationCode:otp,
            verificationCodeExpiry : (Date.now()+3600000),
        }})
    return {
        ok:true,
        id: user.id,
        message : "Signed up successfully"
    }
    }catch(err){
        return {
            ok:false,
            message : "Error while Signing up"
        }
    }
}


export async function resetOtpExpiry(id:string){
    try{
        await prisma.user.update({
            where:{id},
            data:{verificationCodeExpiry:Date.now()}
        })
        return {ok:true}
    }catch(err){
        return {ok:false}
    }
}