export const emailOptions = {
	name: "email",
	type: "text",
	options: {
		required: "Email is a required field",
		pattern: {
			value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: "Email is invalid",
		},
	},
};

export const passwordOptions = {
	name: "password",
	type: "password",
	options: {
		required: "Password is a required field",
		minLength: {
			value: 6,
			message: "Minimal length is 6",
		},
		maxLength: {
			value: 32,
			message: "Maximal length is 32",
		},
	},
};

export const givenNameOptions = {
	name: "givenName",
	type: "text",
	options: {
		required: "Given name is a required field",
		minLength: {
			value: 2,
			message: "Minimal length is 2",
		},
		maxLength: {
			value: 32,
			message: "Maximal value is 32",
		},
		pattern: {
			value: /^[A-zА-я]+$/,
			message: "Name should contain only letters",
		},
	},
};

export const familyNameOptions = {
	name: "familyName",
	type: "text",
	options: {
		required: "Family name is a required field",
		minLength: {
			value: 2,
			message: "Minimal length is 2",
		},
		maxLength: {
			value: 32,
			message: "Maximal value is 32",
		},
		pattern: {
			value: /^[A-zА-я]+$/,
			message: "Name should contain only letters",
		},
	},
};

export const usernameOptions = {
	name: "username",
	type: "text",
	options: {
		required: "Username is a required field",
		minLength: {
			value: 6,
			message: "Minimal length is 6",
		},
		maxLength: {
			value: 32,
			message: "Maximal length is 32",
		},
		pattern: {
			value: /^[A-z0-9_]*$/,
			message: "Username should contain only numbers, letters and _",
		},
	},
};

export const phoneOptions = {
	name: "phone",
	options: {
		required: "Required field",
		pattern: {
			value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
			message: "Phone is invalid",
		},
	},
};

export const emailAndPasswordOptions = [emailOptions, passwordOptions];

export const registerOptions = [
	givenNameOptions,
	familyNameOptions,
	usernameOptions,
	emailOptions,
	passwordOptions,
];
