import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function(){
    const session = await getServerSession(authOptions);
    return <div>
        {JSON.stringify(session)}
    </div>
}