import express from 'express'
import { createContact,getContact} from '../controller/contactController.js'

const router = express.Router()


//For Creating new form data
router.post('/',createContact)
router.get('/get',getContact)


export default router