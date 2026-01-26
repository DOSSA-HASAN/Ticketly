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

router.post("/google/token", (req, res, next) => {
    // We use a custom callback to "catch" the error message from Passport
    passport.authenticate("google-id-token", { session: false }, (err, user, info) => {
        if (err) {
            console.error("RENDER AUTH ERROR:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!user) {
            // THIS IS THE KEY: 'info' contains the real reason (e.g., 'jwt audience invalid')
            console.log("GOOGLE REJECTION REASON:", info);
            return res.status(401).json({
                message: "Unauthorized",
                reason: info?.message || "No specific info"
            });
        }

        // If successful, manually log the user in and move to your token generator
        req.user = user;
        handleAuthSucess(user, res, next);
    })(req, res, next);
});

export default router