let request = require("request-promise");

module.exports = async (req, res, next) =>
{
    try
    {
        let secret = process.env.GCAPTCHA_SECRET;
        let captchaKey = req.query.captcha;
        let response = await request.post({
            method: 'POST',
            uri: 'https://www.google.com/recaptcha/api/siteverify',
            form: {
                secret: secret,
                response: captchaKey
            },
            json: true
        });

        if (!response.success)
        {
            return res.status(400).send({message: "Invalid captcha key"})
        }

        next();
    }
    catch (err)
    {
        return res.status(500).send({message: "Captcha validation failed"})
    }
}