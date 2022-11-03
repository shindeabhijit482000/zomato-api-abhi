const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//create schema
const MenuItemsSchema = new Schema({

    name: { type: String },
    description: { type: String },
    ingridients: { type: Array },
    restaurantId: { type: String },
    image: { type: String },
    qty: { type: Number },
    price: { type: Number }
});

//create model
const MenuItemsModel = mongoose.model("menuitem", MenuItemsSchema, "menuitems");

//exporet model
module.exports = MenuItemsModel;