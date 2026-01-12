import { ROLE } from "../generated/prisma/index.js"
import { prisma } from "../lib/dbConnect.js"
import { devLogger } from "../utils/devLogger.js"

// Function to add a ticket
export const addTicket = async (req, res) => {
    try {
        const { title, description, price, eventDate, location, quantity, sellerId } = req.body

        if (!title || !description || !price || !eventDate || eventDate < Date.now() || !location || !quantity || quantity < 1 || !sellerId) {
            return res.status(401).json({ message: "Missing required details to add a ticket" })
        }

        await prisma.ticket.create({
            data: {
                title, description, price, eventDate, location, quantity, sellerId
            }
        })

        return res.status(201).json({ message: "Ticket created" })


    } catch (error) {
        devLogger(`❌ Error occured while adding ticket ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Function to update a ticket
export const updateTicket = async (req, res) => {
    try {
        const userId = req.user.id // from verify middleware function
        const { id } = req.params // ticket id
        const data = req.body

        if (!userId) {
            return res.status(401).json({ message: "Invalid user id" })
        }

        if (!id) {
            return res.status(401).json({ message: "ticket not found" })
        }

        if (data) {
            return res.status(401).json({ message: "Invalid or no data found" })
        }

        const ticket = await prisma.ticket.findFirst({
            where: { id, sellerId: userId }
        })

        if (!ticket || !ticket.isAvailable) {
            return res.status(401).json({ message: "Ticket not found or you do not have permissions to update it" })
        }

        await prisma.ticket.update({
            where: { id: id, sellerId: userId },
            data
        })

        return res.status(200).json({ message: "Ticket updated successfully" })

    } catch (error) {
        devLogger(`❌ Error occured while updating ticket ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Function to delete a ticket
export const deleteTicket = async (req, res) => {
    try {
        const userId = req.user.id // users id
        const { id } = req.params // ticket id

        // If user id not provided
        if (!userId) {
            return res.status(401).json({ message: "Missing required identifier" })
        }

        // If ticket id not provided
        if (!id) {
            return res.status(401).json({ message: "Missing required identifier" })
        }

        const ticket = await prisma.ticket.findFirst({
            where: { id, sellerId: userId }
        })

        if (!ticket) {
            return res.status(401).json({ message: "Ticket not found or you do not have permissions to delete it" })
        }

        await prisma.ticket.delete({
            where: { id }
        })

    } catch (error) {
        devLogger(`❌ Error occured while deleting ticket ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Admin function to block ticket
export const blockTicket = async (req, res) => {
    try {
        const { role } = req.user
        const { id } = req.params // ticket id

        if (role === ROLE.ADMIN) {
            return res.status(401).json({ message: "Unauthorised: you do not have permissions to carry out this operation" })
        }

        if (!id) {
            return res.status(401).json({ message: "Missing ticket id" })
        }

        await prisma.ticket.update({
            where: { id },
            data: { isAvailable: false }
        })


    } catch (error) {
        devLogger(`❌ Error occured while blocking ticket ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany()

        if (!tickets) {
            return res.status(404).json({ message: "No tickets availale" })
        }

        return res.status(200).json({ tickets })

    } catch (error) {
        devLogger(`❌ Error occurred while getting all tickets`)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Get ticket by ID
export const getTicket = async (req, res) => {
    try {
        const { id } = req.params
        const ticket = await prisma.ticket.findUnique({
            where: { id }
        })

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" })
        }

        return res.status(200).json({ ticket })

    } catch (error) {
        devLogger(`❌ Error occurred while getting ticket`)
        return res.status(500).json({ message: "Internal server error" })
    }
}
