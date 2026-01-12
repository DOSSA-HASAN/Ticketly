import jwt from "jsonwebtoken"
// Function to verify access token
export const verifyAccessToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "No token found" })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token" })
        }

        req.user = decoded
        next()


    } catch (error) {
        devLogger(`❌ Error occurred while verifying access token: ${error}`)
    }
}

// Function to verify refresh token
export const verifyRefreshToken = (req, res, next) => {
    try {
        const refreshToken = req.headers["x-refresh-token"]
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token found" })
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }
        req.user = decoded
        next()

    } catch (error) {
        devLogger(`❌ Error occurred while verifying refresh token: ${error}`)
        return res.status(401).json({ message: "Invalid or expired token" })
    }

}