const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserInput(data) {
    let errors = {};

    // Convert empty fields to empty string so we can use validator functions
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }

    if (Validator.isEmpty(data.first_name)){
        errors.first_name = "First name field is required";
    }

    if (Validator.isEmpty(data.last_name)){
        errors.last_name = "Last name field is required";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}