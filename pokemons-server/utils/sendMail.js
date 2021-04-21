// Dependencies
const sgMail = require("@sendgrid/mail");

// Api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (options) => {
	const { to, subject, html } = options;
	
	const message = {
		to,
		from: process.env.EMAIL_FROM,
		subject,
		html,
	};

	sgMail
		.send(message)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = sendMail;