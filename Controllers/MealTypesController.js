const MealTypesModel = require('../models/MealTypesModel')
module.exports.getMealTypeList = async(request, response) => {

    try {
        let result = await MealTypesModel.find()
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