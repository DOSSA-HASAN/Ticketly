import { PrismaClient } from "../generated/prisma/index.js"

export const prisma = new PrismaClient()

export const dbConnect = async () => {
    try {
        await prisma.$connect()
        console.log("✔ Connected to database")
    } catch (error) {
        console.error("❌ Error occurred while conecting to database", error)
    }
}