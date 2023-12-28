import React, { useState, useEffect } from "react";

import Form from "@gh/form";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import UI from "@gh/ui";
import { useRouter } from "next/router";

export default function PID({ err = false }) {
  const router = useRouter();

  const [pid, setpid] = useState("");
  const msg = [
    "You're about to submit a feedback into project. Please enter the Project ID before continue",
    "Something wrong with your Project ID. Please enter correct Project ID before continue",
  ];

  function projectRedirect() {
    router.push("/p/projectfeedback/" + pid);
  }

  return (
    <UI.Col spacing={2} center height="100dvh">
      <UI.Col spacing={2} center width="100%" maxWidth={600}>
        <UI.Text variant="h5" grow={1} bold color="primary">
          PROJECT FEEDBACK
        </UI.Text>
        <UI.Text grow={1}>{err ? msg[1] : msg[0]}</UI.Text>
        <Form.Text fullWidth label="" placeholder="Project ID" value={pid} onChange={(e) => setpid(e?.target.value)} />
        <UI.Button fullWidth onClick={projectRedirect}>
          Lets go
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}
