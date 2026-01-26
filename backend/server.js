import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import ticketRoutes from "./routes/ticket.route.js"
import { dbConnect } from "./lib/dbConnect.js"
import "./utils/passport.strategy.google.js"
import "./utils/passport.strategy.local.js"

await dbConnect()
const PORT = process.env.PORT

const app = express()

app.use(cors({
    origin: "*",
    credential: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/tickets", ticketRoutes)

app.listen(PORT, () => {
    console.log(`✅ Server started on port: ${PORT}`)
})