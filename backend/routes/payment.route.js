import express from "express"
import {verifyAccessToken} from "../utils/verifyTokens.js";
import {initiatePayment, verifyPayment} from "../controllers/payment.controller.js";

const router = express.Router()

router.use(verifyAccessToken)

router.post('payment/init', initiatePayment)
router.post('payment/verify', verifyPayment)