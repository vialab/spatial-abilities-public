let NodeMailer = require("nodemailer");
let {Mail} = require("../../config.json");

module.exports = {
	SendErrorNotification
};

let Transport = NodeMailer.createTransport({
	host: Mail.Server,
	port: Mail.Port
});

async function SendErrorNotification()
{
	let info = await Transport.sendMail({
		from: Mail.NotifyEmail,
		to: Mail.NotifyEmail,
		subject: "Errors Detected in vis study",
		text: "", // plain text body
		html: "", // html body
	});
}