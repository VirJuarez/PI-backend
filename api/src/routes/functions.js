const axios = require ("axios");
const {Recipe, Diet} = require("../db.js");
const { Sequelize, where, Op } = require('sequelize');
const e = require("express");
const YOUR_API_KEY = process.env.YOUR_API_KEY;


module.exports = {

    getRecipies_api : async function() {
        const recipesAPI = await axios.get ("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5");
        //const recipesAPI = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`); 
        const recipes = await recipesAPI.data.results.map(a =>{ 
            return {name: a.title, 
                healthscore:a.healthScore, 
                id:a.id, 
                dishtype:a.dishTypes, 
                diets: a.diets, 
                summary:a.summary, 
                image:a.image, 
                steps:a.analyzedInstructions[0]?.steps.map((e)=>{return {number: e.number, step:e.step}}) }})
        return recipes
        
    },

    getRecipies_name: function(name, array){
        const recipesxname = array.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
        return recipesxname
    },

    getRecipies_api_id: function(id, array){
        const recipesxid = array.filter(a => a.id.toString() === id);
        return recipesxid
    },

    getRecipies_db: function(){
        const db = Recipe.findAll({include: {
            model: Diet,
            through: {
              attributes: []
            }}});
        return db
    },

    getRecipies_db_id : async (id) => {
        const recipes = await Recipe.findByPk(id,{
            include: {
                model: Diet,
                through: {
                  attributes: []
                }}});
        return recipes
    },




    

}

    