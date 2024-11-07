import { PrismaClient } from '@prisma/client';

console.log("inside db.ts");

// Singleton pattern to ensure only one instance of PrismaClient is created
const prismaClientSingleton = () => {
  console.log("PrismaClient instantiated");
  return new PrismaClient();
};

// TypeScript declaration for the global `prisma` variable
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient based on the environment
const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  // In development, set `globalThis.prisma` to reuse the PrismaClient instance
  globalThis.prisma = prisma;
}

export default prisma;
