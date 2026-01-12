import passport from "passport"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGenerator.js"
import { prisma } from "../lib/dbConnect.js"
import { devLogger } from "../utils/devLogger.js"
import bcrypt from "bcrypt"

// Used for login with credentials
export const passportLocalStrategy = (req, res, next) => {
    passport.authenticate("local", { session: false }, async (err, user, info) => {
        try {

            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(401).json({ message: info.message || "Login failed" })
            }
            const payload = { id: user.id, role: user.role, email: user.email }

            const accessToken = generateAccessToken(payload)
            const refreshToken = generateRefreshToken(payload)

            const account = await prisma.account.findFirst({
                where: { userId: user.id, provider: "CREDENTIALS" }
            })

            if (!account) {
                await prisma.account.create({
                    data: {
                        provider: "CREDENTIALS",
                        accessToken,
                        refreshToken,
                        userId: user.id
                    }
                })
            } else {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        accessToken,
                        refreshToken
                    }
                })
            }

            return res.status(200).json({ message: "logged in successfully", token: accessToken, refreshToken })
        } catch (error) {
            return next(error)
        }
    })
}

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (user) {
            return res.status(409).json({ message: "User already exists, try loggin in" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        await prisma.account.create({
            data: {
                provider: "CREDENTIALS",
                accessToken: "",
                refreshToken: "",
                userId: newUser.id
            }
        })

        return res.status(201).json({ message: "Account created" })
    } catch (error) {
        devLogger(`❌ Error occured while creating user: ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Function to log user out
export const logout = async (req, res) => {
    try {
        const { id } = req.user
        // Access token will be removed from frontend
        const account = await prisma.account.updateMany({
            where: { id },
            data: {
                accessToken: null,
                refreshToken: null
            }
        })

        return res.status(200).json({ message: "User logged out successfully" })

    } catch (error) {
        devLogger(`❌ Error occured while logging out: ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}