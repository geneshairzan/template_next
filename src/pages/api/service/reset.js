import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { exec } from "child_process";

const handler = async (r, res) => {
  if (r.query.t != "!C7Umlw4HNRV!") {
    return res.status(401).json({ msg: "un autorized" });
  }
  const command = "sh ./reset.sh";

  const output = await executeCommand(command);
  return res.status(200).json({ output });
};

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      if (stderr) {
        console.warn(`Command stderr: ${stderr}`);
      }

      resolve(stdout);
    });
  });
}

export default serverMiddleware(handler);
// export default handler;
