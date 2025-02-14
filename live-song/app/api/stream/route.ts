import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

import { z} from "zod"
//@ts-ignore

import  db  from "@/app/lib/db";
const createStreamSchema=z.object({

    creatorId:z.string(),
    url:z.string(),
   spaceId:z.string()
})
export async function POST(req:NextRequest,res:NextResponse){
    console.log(await res.json());
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
        const data= createStreamSchema.parse(await req.json());
        console.log("stream is trigerred")
            try{
                const isYT=yt_rgx().test(data.url);
                if(!isYT) {
                    return NextResponse.json({
                        message:"the yt link is not valid",
                        status:403,
                    })
                }
        }catch(e){
            return NextResponse.json({
                message:"error in the yt regex"
            })
        }
                
        const videoId = data.url ? data.url.match(yt_rgx)?.[1] : null;
        if (!videoId) {
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
            id: data.creatorId,
            url: data.url,
            spaceId: data.spaceId,
            //@ts-ignore
            videoId:videoId
            },
        });

        return NextResponse.json({
            data:{
                message:"stream created ",
                streamId:stream.id
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