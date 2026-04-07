import nodemailer from 'nodemailer';


    // 1. Create a test account
    let testAccount = await nodemailer.createTestAccount();

    console.log("Ethereal test account created:");
    console.log("User:", testAccount.user);
    console.log("Pass:", testAccount.pass);

    // 2. Create transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });


export default transporter;