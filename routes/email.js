import express from 'express'
import { createEmail } from '../controller/emailController.js'


const router = express.Router()

router.post('/',createEmail)


export default router