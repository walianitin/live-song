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
   
    const session=await  getServerSession(authOptions);
    try{
        if(!session?.user){
            return NextResponse.json({
                message:"unauthraized user",
                user:session?.user,
                status:403
            })
        }

        const user=session?.user;
        const data= createStreamSchema.parse(await req.json());

       //1 user authicated krna hai
       //2 data parse ..
       //3 check whether the url link is working or not
            // check whehter the given link is of youtube or not
       //4 the url need to parse from the youtubeapi lib to extract the you tube video id
       //5 check  whether the above 2 are ok or not
       //6 create a stream where userId : creatorId addedby:user.id, createAt :{logic}
       //check whter the user id creator or not
       //check for the dublicate of the song
       //rate limit for the non creator user
       //
       //7 store the thumbnail 
       //8 then create a stream with all this data table 

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
    console.error(error)
    return NextResponse.json({
        message: "An error occurred",
        status: 500,
        error: error,
    });
}
}