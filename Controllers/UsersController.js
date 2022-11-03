const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');

module.exports.login = async(request, response) => {
    let data = request.body;



    try {


        let result = await UserModel.findOne({ email: data.email, });
        if (result == null) {
            response.status(200).send({
                status: false,
                message: "wrohg username ",
            });
        } else {
            let isValid = await bcrypt.compare(data.password, result.password);
            if (isValid) {
                response.status(200).send({
                    status: true,

                    message: "login successfuly",
                });
            } else {
                response.status(200).send({
                    status: false,
                    message: "wrohg password ",
                });
            }
        }
    } catch (error) {
        response.status(500).send({
            status: true,
            error,
        });
    }

};

module.exports.signUp = async(request, response) => {
    let data = request.body;
    try {

        let salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(data.password, salt);
        //create instance
        let newUser = new UserModel({
            full_name: data.full_name,
            email: data.email,
            mobile: data.mobile,
            password: newpassword,
        });

        //save methos
        let result = await newUser.save();
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