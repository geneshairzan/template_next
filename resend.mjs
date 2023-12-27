import { Resend } from "resend";

const resend = new Resend("re_25BdviFk_4WriT9411miNnPMuawsyByok");

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "genesha.irzan@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});
