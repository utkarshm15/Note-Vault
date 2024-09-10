import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./db"
import bcrypt from "bcrypt"

export const authOptions = {
    providers : [
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email : {label:"Email"},
                password : {label:"Password",type:"password"}
            },
            async authorize(credentials) {
                if(!credentials){
                    return null
                }
                
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                try{
                    const existingUser = await prisma.user.findFirst({where:{email:credentials?.email}})
                    if(!existingUser){
                        throw new Error("User does not exist")
                    }
                    const res = await bcrypt.compare(hashedPassword,existingUser.password)
                    if(!res){
                        throw new Error("Invalid Password")
                    }
                    
                    
                    return {
                        id: existingUser.id,
                        email: existingUser.email,
                        name : existingUser.name
                    }
                }catch(err:any){                    
                    throw new Error(err.message)
                }
            },
        })
    ],
    pages:{
        signIn: "/login"
    }
}