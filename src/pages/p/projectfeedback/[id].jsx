import React, { useState, useEffect } from "react";

import Form from "@gh/form";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import UI from "@gh/ui";
import { useRouter } from "next/router";
import useFetch from "@gh/helper/useFetch";

import PID from "./index";

export default function ModelForm(props) {
  const { query } = useRouter();
  if (!query?.id) return;
  return <MainForm id={query.id} />;
}

function MainForm({ id }) {
  const [hasSubmit, sethasSubmit] = useState(false);
  const refdata = useFetch({
    url: `project/${id}`,
    method: "get",
  });
  const [payload, setpayload] = useState({ project_id: id, name: "", overallscore: null });

  async function handleSubmit() {
    let res = await refdata.fetch({
      url: `projectfeedback`,
      method: "post",
      data: payload,
    });

    res && sethasSubmit(true);
  }

  if (!refdata.get()?.id) return <PID err />;
  if (hasSubmit) return <Complete />;

  return (
    <UI.Col center>
      <UI.Col maxWidth={600} spacing={2}>
        <UI.Col>
          <UI.Text variant="h5">Project</UI.Text>
          <UI.Text variant="h4" bold color="primary">
            {refdata.get()?.name}
          </UI.Text>
        </UI.Col>
        <Emotion value={payload.overallscore} onChange={(v) => setpayload({ ...payload, overallscore: v })} />
        <Form.Text
          label="Name"
          value={payload.name || ""}
          onChange={(v) => setpayload({ ...payload, name: v.target.value })}
          placeholder="please input your name"
        />
        <Form.Text
          label="Feedback"
          value={payload.feedback || ""}
          multiline
          rows={10}
          onChange={(v) => setpayload({ ...payload, feedback: v.target.value })}
          placeholder="please input your feedback"
        />
        <UI.Button onClick={handleSubmit} disabled={!payload.overallscore && !payload.feedback}>
          Submit
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}

function Complete(params) {
  const [counter, setCounter] = React.useState(5);
  const r = useRouter();

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      r.push("/");
      // navigate("/", true);
    }
  }, [counter]);

  return (
    <UI.Col center height="100dvh" spacing={3}>
      <UI.Text variant="h2" textAlign="center">
        Thank for your feedback :)
      </UI.Text>
      <UI.Text textAlign="center" color="grey">
        Back to homepage in <b>00:0{counter}</b>
      </UI.Text>
    </UI.Col>
  );
}

function Emotion(props) {
  const iconProps = { fontSize: 120 };

  const option = [
    {
      name: "sad",
      icon: SentimentDissatisfiedIcon,
      color: "#cc0000",
    },
    {
      name: "netral",
      color: "#002e52",
      icon: SentimentDissatisfiedIcon,
    },
    {
      name: "happy",
      color: "#247539",
      icon: SentimentDissatisfiedIcon,
    },
  ];

  return (
    <UI.Col spacing={1}>
      <UI.Text variant="h5">How's your overall feedback ? </UI.Text>
      <UI.Row justifyContent="space-between" spacing={2}>
        {option.map((O, ix) => (
          <UI.Col
            key={ix}
            sx={{
              bgcolor: props.value == ix ? O.color : "white",
              p: 2,
              border: `4px solid ${O.color}`,
              borderRadius: "50%",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => props.onChange(ix)}
          >
            <O.icon sx={{ ...iconProps, color: props.value != ix ? O.color : "white" }} />
          </UI.Col>
        ))}
      </UI.Row>
    </UI.Col>
  );
}
