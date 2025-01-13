import { Stack } from "@mui/material";

export default function App({ center, spaced = false, ...props }) {
  return (
    <Stack
      direction={"row"}
      alignItems={center ? "center" : ""}
      justifyContent={center ? "center" : ""}
      sx={{
        ...props.sx,
        ...(spaced && {
          justifyContent: "space-between",
          alignItems: "center",
        }),
      }}
      {...props}
    >
      {props.children}
    </Stack>
  );
}
