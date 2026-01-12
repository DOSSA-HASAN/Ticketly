import jwt from "jsonwebtoken"
import { devLogger } from "./devLogger.js"

// Function to generate access token
export const generateAccessToken = (user) => {
    try {
        const payload = { id: user.id, role: user.role, email: user.email }

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "15m" })
        return accessToken

    } catch (error) {
        devLogger(`❌ Error occurred while generating access token: ${error}`)
        return null
    }
}

// Function to generate refresh token
export const generateRefreshToken = (user) => {
    try {
        const payload = { id: user.id, role: user.role, email: user.email }
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' })
        return refreshToken;
    } catch (error) {
        devLogger(`❌ Error occurred while generating access token: ${error}`)
        return null
    }
}