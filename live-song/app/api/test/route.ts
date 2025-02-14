import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
   // const token= await getToken({req,secret:process.env.NEXTAUTH_SECRET})
    console.log("Session:", token); // Debugging: Log the session
  
    try {
      if (!session?.user) {
        return NextResponse.json({
          message: "Unauthorized user",
          user: session?.user,
          status: 403,
        });
      }
  
      // Rest of your logic...
    } catch (error) {
      return NextResponse.json({
        message: "An error occurred",
        status: 500,
        error: error,
      });
    }
  }