import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined;
};

const prismadb: any = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = prismadb;
export default prismadb;