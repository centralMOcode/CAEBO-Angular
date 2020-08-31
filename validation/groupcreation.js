const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateGroupInput(data) {
    let errors = {};

    // If field is empty, convert to empty string so wecan use Validator.
    data.group_name = !isEmpty(data.group_name) ? data.group_name: "";

    // Check email
    if (Validator.isEmpty(data.group_name)) {
        errors.group_name = "Group name field required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};