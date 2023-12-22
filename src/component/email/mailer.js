import nodemailer from "nodemailer";

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "47e15db2010ce6",
    pass: process.env.SMTP_PASSWORD || "72b04f12b60241",
  },
};

// const smtpOptions = {
//   pool: true,
//   host: "mail.compoundcoffee.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER || "noreply@compoundcoffee.com",
//     pass: process.env.SMTP_PASSWORD || "N7l#~$7z(F4=",
//   },
// };

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  });
};
