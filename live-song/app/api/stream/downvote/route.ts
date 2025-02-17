import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import db from "@/app/lib/db"
import { use } from "react";


const DownvoteSchema=z.object({
    spaceId:z.string(),
    streamId:z.string()
})

export async function  POST(req:NextRequest){
    const session =await getServerSession(authOptions);
    if(!session?.user)
    {
        return NextResponse.json({
            messaage:"unauthenticated",
        })
    }
    const user=session.user
    try{
        const data= DownvoteSchema.parse(await req.json);
        await db.upvote.delete({
         where:{
            userId_streamId:
         {
                userId: user.email ?? "",
                streamId:data.streamId,
         }
        }
        })
        return NextResponse.json({
            message:"done",
        })
    }catch(e){
        return NextResponse.json({
            message:"error while downvoting"
        })
    }
}