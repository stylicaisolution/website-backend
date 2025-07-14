import express from 'express'
import { sendMail, sendOtpMail, verifyOtp } from '../controller/mailController.js'


const router = express.Router()

router.post('/',sendMail)

//Send mail for otp 
router.post('/send-otp',sendOtpMail)

//Verify otp 
router.post('/verify-otp',verifyOtp)

export default router