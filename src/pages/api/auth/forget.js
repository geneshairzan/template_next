import prisma from "@gh/helper/orm";
import { getSimpleToken } from "@gh/helper/encryption";

import axios from "axios";

import { render } from "@react-email/render";
import WelcomeTemplate from "@/component/email/template/main";
import { sendEmail } from "@/component/email/mailer";

// export default async function handler(r, res) {
//   if (r.method == "POST") {
//     return res.status(200).json("response");
//   }
// }

export default async function handler(r, res) {
  if (r.method == "POST") {
    let user = await prisma.find("user", { email: r.body.email });

    if (user) {
      await prisma.findOrCreate("user", { email: r.body.email }, {}, { token: getSimpleToken() });
      //send email here
    }

    return res.status(200).json({ message: "ok", next: "passcode" });
  }
}
