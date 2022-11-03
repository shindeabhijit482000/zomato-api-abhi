const LocationModel = require('../models/LocationModel')
module.exports.getLocationList = async(request, response) => {

    try {
        let result = await LocationModel.find()
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