import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { format } from "path";
import {z} from "zod"
//@ts-ignore
import {yt_rgx} from "youtube-regex"
import { constants } from "buffer";
import { db } from "@/app/db";
const CreatoStreamSchema=   z.object({

    creatorId:z.string(),
    url:z.string(),
   spaceId:z.string()
})
export async function POST(req:NextRequest,res:NextResponse){

    const session=await  getServerSession(authOptions);
    try{
        if(!session?.user){
            return NextResponse.json({
                message:"unauthraized user",
                user:session?.user,
                status:403
            })
        }
    //here is the main logic
//        const session=await getServerSession(authOptions);
        const user=session?.user;
        const data= CreatoStreamSchema.parse(await req.json());

        const isYT=yt_rgx().test(data.url);
        if(!isYT) {
            return NextResponse.json({
                message:"the yt link is not valid",
                status:403,
            })
        }
        const videoId = data.url ? data.url.match(yt_rgx)?.[1] : null;
        if (!isYT || !videoId) {
          return NextResponse.json(
            {
              message: "Invalid YouTube URL format",
            },
            {
              status: 400,
            },
          );
        }

        const stream = await db.stream.create({
            data: {
            creatorId: data.creatorId,
            url: data.url,
            spaceId: data.spaceId,
            videoId: videoId,
            },
        });

        return NextResponse.json({
            data:{
                message:"hello the streams is working "
            }
        })
} catch (error) {
    return NextResponse.json({
        message: "An error occurred",
        status: 500,
        error: error,
    });
}
}