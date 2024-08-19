"use server"

import prisma from "@/lib/db"

export async function getUser(id:string){
    try{
        const user = await prisma.user.findFirst({
            where:{
                id
            },
            select:{
                name:true,
                email:true,
                verificationCode:true,
                verificationCodeExpiry:true
            }
        })
        return {
            ok:true,
            user
        }
    }catch(err){
        return {
            ok:false
        }
    }
}

export async function verify(id:string){
    try{
        await prisma.user.update({
            where:{
                id
            },
            data:{
                isVerified:true
            }
        })
        return {ok:true}
    }catch(err){
        return {ok:false}
    }
}