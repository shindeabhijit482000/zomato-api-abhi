const { request, response } = require('express');
const RestaurantModel = require('../models/RestaurantModel')

module.exports.home = (request, response) => {
    response.status(200).send({
        status: true,
    });
};
module.exports.getRestaurantList = async(request, response) => {
    //read a data====> find()
    try {
        let result = await RestaurantModel.find()
        response.status(200).send({
            status: true,
            result
        });
    } catch (error) {
        response.status(500).send({
            status: true,
            error,
        });
    }
};


module.exports.getRestaurantListByLocId = async(request, response) => {
    let loc_id = request.params.loc_id
    try {
        let result = await RestaurantModel.find({ location_id: loc_id })
        response.status(200).send({
            status: true,
            result,
        });
    } catch (error) {
        response.status(500).send({
            status: true,
            error,
        });
    }
};

module.exports.getRestaurantDetailsById = async(request, response) => {
    let rest_id = request.params.id
    try {
        let result = await RestaurantModel.findOne({ _id: rest_id });
        if (result) {
            response.status(200).send({
                status: true,
                result,
            });
        } else {
            response.status(200).send({
                status: false,
                message: "restaurant not found",
            });
        }
    } catch (error) {
        response.status(500).send({
            status: false,
            error,
            message: "servar error,contact to admin",
        });
    }
};

module.exports.filterData = async(request, response) => {
    let { meal_type, location, cuisine, hcost, lcost, sort, page, } = request.body;

    //sort==>1 low to high
    //sort==>-1 high to low
    if (sort === undefined) {
        sort = 1;
    }

    if (page === undefined) {
        page = 1;
    }

    let perPage = 2;

    let startIndex = page * perPage - perPage;
    let endIndex = page * perPage;

    let filter = {};
    if (location !== undefined) filter["location_id"] = location;
    if (meal_type !== undefined) filter["mealtype_id"] = meal_type;
    if (cuisine !== undefined) filter["cuisine_id"] = { $in: cuisine };
    if (hcost !== undefined && lcost !== undefined) filter["min_price"] = { $gte: lcost, $lte: hcost };

    console.log(filter);
    let result = await RestaurantModel.find(filter, {
        name: 1,
        city: 1,
        locality: 1,
        min_price: 1,
        cuisine: 1,
        image: 1,
    }).sort({
        min_price: sort,
    });

    let newResult = result.slice(startIndex, endIndex);

    response.status(200).send({
        status: true,
        newResult,
    });
};