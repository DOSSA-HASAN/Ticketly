// import { prisma } from "../lib/dbConnect.js"
// import { devLogger } from "../utils/devLogger.js"
// import { sendMail } from "../utils/sendMail.js";
// import { logout } from "./auth.controller.js";
// import crypto from "crypto";
// import bcrypt from "bcrypt";

// // Function to generate otp to reset email
// export const generateEmailChangeOtp = async (req, res) => {
//     try {
//         const { id, email } = req.user
//         // Check if the user exists
//         const user = await prisma.user.findUnique({
//             where: { email }
//         })

//         if (!user) {
//             return res.status(401).json({ message: "User with email address does not exist" })
//         }

//         // generate a 6-digit (string) otp
//         const otp = crypto.randomInt(100000, 1000000).toString()

//         const body = `Hey there ${user.email} here is your OTP to change your email address: ${otp}. If you did not request for this ignore this email`
//         await sendMail(user.email, "OTP Request To Change Email", body)
//         return res.status(200).json({ message: "Change email otp sent successfully" })

//     } catch (error) {
//         devLogger(`❌ Error occured while generating email change otp: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }
// // Function to verify email reset otp
// export const verifyEmailChangeOtp = async (req, res) => {
//     try {
//         const { id, email } = req.user
//         const { otp } = req.body

//         if (!otp) {
//             return res.status(400).json({ message: "Missing OTP" })
//         }

//         // Allows 3rd attempt as final, 4th attempt deletes otp
//         if (Number(await redisClient.get(`email_otp_attempts:${id}`)) >= 3) {
//             await redisClient.del(`email_change_otp:${id}`)
//             await redisClient.del(`email_otp_attempts:${id}`)
//             return res.status(429).json({ message: "You have made too many attempts please try again later" })
//         }

//         const storedOtp = await redisClient.get(`email_change_otp:${id}`)

//         if (storedOtp !== otp) {
//             await redisClient.incr(`email_otp_attempts:${id}`)
//             return res.status(410).json("Invalid or Expired OTP, you may request for a new one")
//         }

//         if (otp === storedOtp) {
//             await redisClient.set(`email_otp_verified:${id}`, "true")
//             // Delete keys so otp is not reusable
//             await redisClient.del(`email_otp_attempts:${id}`)
//             await redisClient.del(`email_change_otp:${id}`)
//         }
//         return res.status(200).json({ message: "OTP verified successfully" })

//     } catch (error) {
//         devLogger(`❌ Error occured while verify OTP to change email: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }
// // Function to change email if otp was verified and is valid in redis
// export const changeEmail = async (req, res) => {
//     try {
//         const { email } = req.body
//         const { id } = req.user

//         // Check is the user still allowed to change email
//         const isOTPVerified = await redisClient.get(`email_otp_verified:${id}`)
//         if (isOTPVerified === "false") {
//             return res.status(401).json({ message: "OTP not verified, try again" })
//         }

//         await prisma.user.update({
//             where: { id },
//             data: { email }
//         })

//         // Log the user out once they change their email
//         await logout()
//         return res.status(200).json({ message: "Email updated successfully" })

//     } catch (error) {
//         devLogger(`❌ Error occured while changing email: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }

// // Function to generate otp to reset password
// export const generateChangePasswordOTP = async (req, res) => {
//     try {
//         const { id } = req.user

//         const user = await prisma.user.findFirst({
//             where: { id }
//         })
//         if (!user) {
//             return res.status(401).json({ message: "User not found" })
//         }
//         // generate otp
//         const otp = crypto.randomInt(100000, 1000000)
//         // set otp in redis
//         await redisClient.set(`password_change_otp:${id}`, `${otp}`, "EX", 900)
//         // set attempts
//         await redisClient.set(`password_change_otp_attempts:${id}`, 0, "EX", 900)
//         // set otp verified
//         await redisClient.set(`password_change_otp_verified:${id}`, "false", "EX", 300)

//         // send otp as email
//         const body = `Hey ${user.email}, here is your OTP to change your password: ${otp}. Ignore this message if you did not request for an OTP`
//         await sendMail(user.email, "Requested OTP To Change Password", body)

//         return res.status(200).json({ message: "OTP to reset password sent successfully" })

//     } catch (error) {
//         devLogger(`❌ Error occured while generating reset password otp: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }
// // Function to verify reset password otp
// export const verifyChangePasswordOtp = async (req, res) => {
//     try {
//         const { otp } = req.body
//         const { id } = req.user

//         if (!otp) {
//             return res.status(401).json({ message: "No otp provided" })
//         }

//         // If user has tried wrong otp 3 times already
//         if (Number(await redisClient.get(`password_change_otp_attempts:${id}`)) >= 3) {
//             await redisClient.del(`password_change_otp:${id}`)
//             await redisClient.del(`password_change_otp_attempts:${id}`)
//             await redisClient.del(`password_change_otp_verified:${id}`)
//             return res.status(401).json({ message: "You have tried to many times, please try again later" })
//         }

//         const storedOtp = await redisClient.get(`password_change_otp:${id}`)
//         if (storedOtp !== otp) {
//             await redisClient.incr(`password_change_otp_attempts:${id}`)
//             return res.status(410).json({ message: "Expired or invalid OTP" })
//         }

//         if (storedOtp === otp) {
//             await redisClient.set(`password_change_otp_verified:${id}`, "true")
//             await redisClient.del(`password_change_otp:${id}`)
//             await redisClient.del(`password_change_otp_attempts:${id}`)
//         }

//         return res.status(200).json({ message: "Change password OTP verified successfully" })
//     } catch (error) {
//         devLogger(`❌ Error occurred while verifying change password OTP: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }
// // Function to change password if reset password otp was verified and is valid in redis
// export const changePassword = async (req, res) => {
//     try {
//         const { password } = req.body // The new password
//         const { id } = req.user

//         if (!password) {
//             return res.status(401).json({ message: "No new password provided" })
//         }

//         // Check if user had verified the otp and its valid (true)
//         if (await redisClient.get(`password_change_otp_verified:${id}`) === "false") {
//             return res.status(403).json({ message: "Timeout, try again by requesting for a new OTP" })
//         }

//         // hash the password using bcrypt
//         const hashedPassword = await bcrypt.hash(password, 10)

//         // Updating the password
//         await prisma.user.update({
//             where: { id },
//             data: { password: hashedPassword }
//         })
//         // Log the user out
//         await logout();
//         return res.status(200).json({ message: "Password changed successfully, login again" })

//     } catch (error) {
//         devLogger(`❌ Error occurred while changing password: ${error}`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }

// export const updateUserName = async (req, res) => {
//     try {
//         const { name } = req.body
//         const { id } = req.user

//         const updatedUser = await prisma.user.update({
//             where: { id },
//             data: { name }
//         })

//         const { password: _, ...userWithoutPassword } = updatedUser
//         return res.status(200).json({ message: "Name changed", ...userWithoutPassword })
//     } catch (error) {
//         devLogger(`❌ Error occurred while changing user's name`)
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }