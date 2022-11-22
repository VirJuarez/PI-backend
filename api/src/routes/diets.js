const express = require ("express");
const router = express.Router();
const {Recipe, Diet} = require("../db");



router.get("/", async function(req,res){
    try{
        let dietas = await Diet.findAll();
        res.send(dietas)
    }
    catch(e){
        res.status(404).send(e.message)
    }
})


module.exports = router;