import React from "react";
import { Stack, Typography, Box, Button, Grid } from "@mui/material";
import UI from "@gh/ui";
import { datas } from "@/component/gendev/_data_recent";

export default function CRecentProejct({ isPrinting = false }) {
  return (
    <Stack width="100%" spacing={1}>
      <UI.Text variant="body1" color="cv.red" bold pt={2}>
        RECENT PROJECT
      </UI.Text>
      <UI.Row
        sx={{
          flexWrap: "wrap",
        }}
      >
        {datas.map((d, ix) => (
          <UI.Col
            key={ix}
            width="50%"
            sx={{
              my: 0.5,
            }}
          >
            <Card
              year={d.year}
              title={d.title}
              subtitle={d.subtitle}
              sector={d.sector}
              stacks={d.stacks}
              modules={d.modules}
              link={d.links}
            />
          </UI.Col>
        ))}
      </UI.Row>
    </Stack>
  );
}

function Card(props) {
  return (
    <UI.Row spacing={1}>
      <UI.Col center backgroundColor="cv.blue">
        <Typography
          variant="subtitle1"
          textAlign="left"
          color={"white"}
          component="span"
          sx={{
            px: 1,
          }}
        >
          {props.year}
        </Typography>
      </UI.Col>
      <UI.Col>
        <UI.Text variant="body2">{props.title}</UI.Text>
        <UI.Text variant="caption" mt={"-4px"}>
          {props.subtitle}
        </UI.Text>
      </UI.Col>
    </UI.Row>
  );
}
