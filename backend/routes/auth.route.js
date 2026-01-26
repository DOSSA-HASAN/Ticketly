import express from "express"
import { passportLocalStrategy } from "../controllers/auth.controller.js"
import passport from "passport"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGenerator.js"
import { prisma } from "../lib/dbConnect.js"

const router = express.Router()

router.post("/login", passportLocalStrategy)

const handleAuthSucess = async (user, res, next) => {
    try {
        const payload = { id: user.id, email: user.email, role: user.role }
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        // Find if this account is already linked
        const account = await prisma.account.findFirst({
            where: { userId: user.id, provider: "GOOGLE" }
        })

        if (!account) {
            await prisma.account.create({
                data: {
                    userId: user.id,
                    provider: "GOOGLE",
                    providerId: user.googleId || user.accounts?.[0]?.providerId,
                    refreshToken,
                    accessToken
                }
            })
        } else {
            await prisma.account.update({
                where: { id: account.id },
                data: { refreshToken, accessToken }
            })
        }

        return res.status(200).json({
            message: "Login success",
            user,
            token: accessToken,
            refreshToken
        })
    } catch (e) {
        return next(e)
    }
}

router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", { session: false }),
    (req, res, next) => handleAuthSucess(req.user, res, next)
)

router.post("/google/token", passport.authenticate("google-id-token", { session: false }),
    (req, res, next) => handleAuthSucess(req.user, res, next)
)

export default router