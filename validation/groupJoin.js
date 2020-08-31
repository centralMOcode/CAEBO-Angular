const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateGroupJoinInput(data) {
    let errors = {};

    // Convert empty fields to empty string so we can use validator functions
    data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.group_id = !isEmpty(data.group_id) ? data.group_id : "";

    if (Validator.isEmpty(data.user_id)){
        errors.user_id = "User ID field is required";
    }

    if (Validator.isEmpty(data.group_id)){
        errors.group_id = "Group ID field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}