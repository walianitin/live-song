
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import prisma from "./db";
import { NextResponse } from "next/server";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params: any) {
      console.log("SignIn callback triggered", params);
      if (!params.user.email) {
        return false;
      }
      try {
        await prisma.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
        console.log("User created successfully");
      } catch (e: any) {
        console.error("Error creating user:", e.message);
        throw new Error("Failed to create user");
      }
      return true;
    },
  },
};