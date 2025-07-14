import EMAIL from "../models/EMAIL.js"

export const createEmail = async (req, res, next) =>{
    try{
       const newemail = new EMAIL({...req.body})

       await newemail.save()
       res.status(200).json({message:"new email created."})
    }catch(err){
         next(err)
    }
}