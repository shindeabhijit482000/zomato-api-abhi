const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//create schema
const MealTypeSchema = new Schema({

    name: { type: String },
    content: { type: String },
    image: { type: String },
    meal_type: { type: Number },

});

//create model
const MealTyapesModel = mongoose.model("mealtype", MealTypeSchema, "mealtypes");

//exporet model
module.exports = MealTyapesModel;