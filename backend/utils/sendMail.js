import { createTransport } from "nodemailer";

export const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

// email, subject, text
export const sendMail = async (to, subject, body) => {
    await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        text: body
    })
}