import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../lib/dbConnect";
import bcrypt from "bcrypt"

passport.use("local", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { email }, include: { accounts: true } })
            if (!user) {
                return done(null, false, { message: "User not found" })
            }
            if (!user.password) {
                return done(null, false, { message: "Login with google instead" })
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return done(null, false, { message: "Invalid password" })
            }

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }

)
)