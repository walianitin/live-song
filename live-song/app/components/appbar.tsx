"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Appbar()
{   
    const session= useSession(); 

    return <div className="flex justify-between "  >
            <div>muzer</div>
            <div className="bg-blue-400 h-6 w-15">
             {session.data?.user &&  <button onClick={()=> signOut()}> logout </button>}
             {!session.data?.user &&  <button onClick={()=> signIn()}> signIn</button>}
            </div>
    </div>
}