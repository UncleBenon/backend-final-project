import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client.js';
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
    url: process.env["DATABASE_URL"],
    log: ['query', 'info', 'warn', 'error']
})

// import this for the prisma client, has to be done this way in v7+ aparently
export const prisma = new PrismaClient({ adapter })
