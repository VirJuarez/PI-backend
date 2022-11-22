const express = require("express");
const { getRecipies_api, getRecipies_name, getRecipies_api_id, getRecipies_db_id, getRecipies_db } = require("./functions");
const router = express.Router();
const axios = require ("axios");
const {Recipe, Diet} = require("../db");



//RUTA TRAE TODAS LAS DIETAS - Y POR NOMBRE
router.get("/",async function(req,res){
    let name = req.query.name;
    try{
            const api= await getRecipies_api();
            const db = await getRecipies_db();
            const recetas = api.concat(db);
        if(name){
            const recipesxname = recetas.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
            if(recipesxname.length === 0){throw Error ("No recipe found")}
            res.send(recipesxname)
        }else{res.send(recetas)}    
    }catch(e){
        res.status(404).send(e.message);
    }
})

//RUTA TRAE DIETAS POR ID
router.get(`/:id`, async function(req,res){
    let id=req.params.id;
    try{
        if (id.includes("-")){
            const receta = []
            receta.push(await getRecipies_db_id(id));
            if (receta.length === 0) throw new Error ("No hay receta con el id indicado");
            res.send(receta)

        }else{
            const api = await getRecipies_api();
            const recetaxid = await getRecipies_api_id(id,api);
            if (recetaxid.length === 0) throw new Error ("No hay receta con el id indicado");
            res.send(recetaxid);
        }
    }
    catch(e){
        res.status(404).send(e.message)
    }
})


//RUTA CREATE NUEVA RECETA
router.post(`/`, async function(req,res){
    let {name,summary,healthscore,steps, diets, image, dishtype} = req.body
    try{
        if(!name || !summary){ throw new Error ("Falta completar campos obligatorios")}
        const newR = await Recipe.create({name,summary,healthscore,steps, image, dishtype});
        for(let i=0; i<diets.length; i++){
            const newD = await Diet.findOrCreate({where: {name:diets[i]}})
            await newR.addDiet(newD[0].id)
        }
        res.send("Receta creada correctamente")
    }
    catch(e){
        res.status(404).send(e.message)
    }
})







module.exports = router;