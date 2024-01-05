import jwt from "jsonwebtoken";
import axios from "axios";

const hatoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1YmU3NjJkZjI3ZGM0ZDgwOTVkZDBkMTU5NDY3Y2JmYSIsImlhdCI6MTcwNDMwMjczNywiZXhwIjoyMDE5NjYyNzM3fQ.lDqhpzuoIUg-yKaDO_63D58xQ_CVVh4e57-wjxdwL3w";

export default async function handler(req, res) {
  // let raw = await fetch("https://ha.genesha.dev/api/states/switch.smart_plug_socket_1", {
  //   // mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${hatoken}`,
  //   },
  // });

  let raw = await axios({
    url: "https://ha.genesha.dev/api/states/switch.smart_plug_socket_1",
    headers: {
      authorization: `Bearer ${hatoken}`,
      "Content-Type": "application/json",

      // accept: "application/json",
      // "Accept-Language": "en-US,en;q=0.8",

      // "access-x": Md5.hashStr(accX + saltY),
      // "access-y": saltY,
      // "Cache-Control": "no-cache",
      // Pragma: "no-cache",
      // Expires: "0",
    },
  });

  console.log(raw);
  res.status(200).json(raw?.data);
}
