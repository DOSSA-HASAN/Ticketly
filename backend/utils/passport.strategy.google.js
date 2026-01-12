import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import { prisma } from "../lib/dbConnect.js";

// Shared function to find or create user
const findOrCreateUser = async (profile, done) => {
    try {
        const email = profile.emails[0].value
        const providerId = profile.id

        let user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: profile.displayName,
                    accounts: {
                        create: {
                            provider: "GOOGLE",
                            providerId: providerId
                        }
                    }
                },
                include: { accounts: true }
            })
        }
        return done(null, user)
    } catch (error) {
        return done(error, null)
    }
}

// STRATEGY 1: for web redirects
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => findOrCreateUser(profile, done)
))

// STRATEGY 2: for flutter 
passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID
},
    (parsedToken, googleId, done) => {
        const profile = {
            id: googleId,
            emails: [{ value: parsedToken.payload.email }],
            displayName: parsedToken.payload.name
        }
        return findOrCreateUser(profile, done)
    }
))