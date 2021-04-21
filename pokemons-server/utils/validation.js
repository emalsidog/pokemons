// Dependencies
const { check } = require("express-validator");

validate = (method) => {
	switch (method) {
		case "register": {
			return [
				check("givenName")
					.not()
					.isEmpty()
					.withMessage("Given name can not be empty")
					.isLength({ min: 2, max: 32 })
					.withMessage("Given name should be between 2 and 32 characters long")
					.matches(/^[A-zА-я\s]+$/)
					.withMessage("Given name must be alphabetic."),
				check("familyName")
					.not()
					.isEmpty()
					.withMessage("Family name can not be empty")
					.isLength({ min: 2, max: 32 })
					.withMessage("Family name should be between 2 and 32 characters long")
					.matches(/^[A-zА-я]+$/)
					.withMessage("Family name must be alphabetic."),
				check("email")
					.not()
					.isEmpty()
					.withMessage("Email can not be empty")
					.isEmail()
					.withMessage("Email is invalid"),
				check("username")
					.not()
					.isEmpty()
					.withMessage("Username can not be empty")
					.matches(/^[A-z0-9_]*$/)
					.withMessage("Username should contain only letters, numbers and _"),
				check("password")
					.not()
					.isEmpty()
					.withMessage("Password can not be empty")
					.isLength({ min: 6, max: 32 })
                    .withMessage("Password should be between 6 and 32 characters long."),
				check("confirmPassword")
					.not()
					.isEmpty()
					.withMessage("Password can not be empty"),
			];
		}
        case "login": {
            return [
                check("email")
                    .not()
                    .isEmpty()
                    .withMessage("Email can not be empty")
                    .isEmail()
                    .withMessage("Email is invalid"),
                check("password")
					.not()
					.isEmpty()
					.withMessage("Password can not be empty")
					.isLength({ min: 6, max: 32 })
                    .withMessage("Password should be between 6 and 32 characters long."),
            ]   
        }
        case "forgot": {
            return [
                check("email")
                    .not()
                    .isEmpty()
                    .withMessage("Email can not be empty")
                    .isEmail()
                    .withMessage("Email is invalid"),
            ]
        }
        case "reset": {
            return [
				check("password")
					.not()
					.isEmpty()
					.withMessage("Password can not be empty")
					.isLength({ min: 6, max: 32 })
                    .withMessage("Password should be between 6 and 32 characters long."),
            ]
        }
	}
};

module.exports = validate;
