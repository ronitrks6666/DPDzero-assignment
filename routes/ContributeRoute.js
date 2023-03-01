const experss = require("express");
const router = experss.Router();
const ContributeDB = require('../models/contributeModel')







router.post('/v4/contribute' ,async (req,res)=>{

   try {
    const {Institute , year , semester , subject , gDrive} = req.body.data
    console.log(req.body.data)
    const contribute = new ContributeDB({
        Institute , year , semester , subject, gDrive
    })
    await contribute.save()
    console.log(contribute)
    res.json({msg:"Posted"})

   } catch (error) {
    res.json({error})
   }
})











module.exports = router;