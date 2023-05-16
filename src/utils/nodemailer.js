import nodemailer from 'nodemailer';

async function sendEmail(toEmail, subject, message) {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const mailOptions = {
        to: toEmail,
        from: process.env.EMAIL_USERNAME || 'Jamshidbek',
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error.message);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}

export default sendEmail;
