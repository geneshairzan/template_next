import { Typography, Stack, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function App(props) {
  // if (!props.label) return;
  return (
    <Stack direction={"row"} spacing={1} alignItems="center" width={props.width} flexShrink={0} pl={props.pl}>
      <Typography
        color="primary.dark"
        fontWeight={"bold"}
        variant="body2"
        pt={"2px"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {props.label}
      </Typography>
      {props.tip && (
        <Tooltip title={props.tip}>
          <InfoIcon
            sx={{
              bgcolor: "#1D4167",
              color: "#E9F6FB",
              borderRadius: "50%",
              p: 0,
              fontSize: 16,
            }}
          />
        </Tooltip>
      )}
    </Stack>
  );
}
