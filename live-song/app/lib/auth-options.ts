
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import prisma from "./db";
import { NextResponse } from "next/server";


export const authOptions={
 providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID??" ",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET??""
        })
      ],callback:{
        async signIn(params:any){
          if(!params.user.email) {return false}
          try {
            await prisma.user.create({
              data:{
                email:params.user.email,
                provider:"Google"
              }
            })
          }catch(e:any){
            return NextResponse.json({
              message:"error in the lib auth option callback",
              error:e.message,
            })
          }
          return true;

        }
      }
}