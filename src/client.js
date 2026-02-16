import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client.js';

const adapter = new PrismaBetterSqlite3({
    url: "file:./prisma/dev.db"
})

// import this for the prisma client, has to be done this way in v7+ aparently
export const prisma = new PrismaClient({ adapter })
