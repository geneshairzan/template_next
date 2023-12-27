import nodemailer from "nodemailer";

// Replace with your SMTP credentials
// const smtpOptions = {
//   host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
//   port: parseInt(process.env.SMTP_PORT || "2525"),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER || "47e15db2010ce6",
//     pass: process.env.SMTP_PASSWORD || "72b04f12b60241",
//   },
// };

const smtpOptions = {
  // pool: true,
  host: "mail.mygank.com",
  port: 465,
  secure: false,
  // requireTLS: true,
  ignoreTLS: true,
  auth: {
    user: "gip@mygank.com",
    pass: "Jan@8BL*j$y,",
  },
  // tls: {
  //   // ciphers: "SSLv3",
  //   rejectUnauthorized: false,
  // },
};

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log("Your config is correct");
  });

  return await transporter.sendMail({
    from: "gip@mygank.com",
    ...data,
  });
};
