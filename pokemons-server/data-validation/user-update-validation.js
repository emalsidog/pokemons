// Dependencies
const { check } = require("express-validator");

validateUser = (method) => {
	switch (method) {
		case "updateName": {
			return [
				check("givenName")
					.not()
					.isEmpty()
					.withMessage("Given name can not be empty")
					.isLength({ min: 2, max: 32 })
					.withMessage("Given name should be between 2 and 32 characters long")
					.matches(/^[A-zА-я]+$/)
					.withMessage("Given name must be alphabetic."),
				check("familyName")
					.not()
					.isEmpty()
					.withMessage("Family name can not be empty")
					.isLength({ min: 2, max: 32 })
					.withMessage("Family name should be between 2 and 32 characters long")
					.matches(/^[A-zА-я]+$/)
					.withMessage("Family name must be alphabetic."),
			];
		}
		case "updateEmail": {
			return [
				check("email")
					.not()
					.isEmpty()
					.withMessage("Email can not be empty")
					.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
					.withMessage("Email is invalid"),
			]
		}
		case "updateUsername": {
			return [
				check("username")
					.not()
					.isEmpty()
					.withMessage("Username can not be empty")
					.isLength({ min: 6, max: 16 })
					.withMessage("Username should be between 6 and 16 characters long")
					.matches(/^[A-z0-9_]*$/)
					.withMessage("Username should contain only letters, numbers and _"),
			]
		}
		case "updatePhone": {
			return [
				check("phone")
					.not()
					.isEmpty()
					.withMessage("Phone can not be empty")
					.matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
					.withMessage("Phone is invalid"),
			]
		}
	}
};

module.exports = validateUser;
