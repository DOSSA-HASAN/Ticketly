import express from "express"
import { verifyAccessToken } from "../utils/verifyTokens.js";
import {
    addTicket,
    blockTicket,
    deleteTicket,
    getAllTickets, getTicket,
    updateTicket
} from "../controllers/ticket.controller.js";

const router = express.Router()

router.use(verifyAccessToken)
router.post('ticket/add/', addTicket)
router.post('ticket/update/:id', updateTicket)
router.delete('ticket/delete/:id', deleteTicket)
router.post('ticket/block/:id', blockTicket)
router.post('ticket/all', getAllTickets)
router.post('ticket/:id', getTicket)

export default router