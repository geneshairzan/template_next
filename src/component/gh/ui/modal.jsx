import { Modal, Stack } from "@mui/material";

export default function BasicModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        display: "flex",
        width: "100vw",
        bgcolor: "rgba(0,0,0,.1)",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          p: { xs: 1, md: 2 },
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      >
        {props.children}
      </Stack>
    </Modal>
  );
}
