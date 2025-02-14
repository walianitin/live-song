import { PrismaClient } from "@prisma/client";


const prismaClienSingleton=()=>{
    return new PrismaClient();
}

type prismaClienSingleton=ReturnType<typeof prismaClienSingleton>;
const globalForPrisma=globalThis as unknown as{
    prisma:prismaClienSingleton | undefined;
};

const prisma= globalForPrisma.prisma?? prismaClienSingleton();

export  default prisma;
 
if(process.env.NODE_ENV!=="production" ) globalForPrisma.prisma==prisma
// this insts the best ,we should make a singleton hovere here