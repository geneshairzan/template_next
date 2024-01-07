import { Modal, Stack } from "@mui/material";

export default function BasicModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <Stack
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          // transform: "translate(50%,-50%)",
        }}
      >
        {props.children}
      </Stack>
    </Modal>
  );
}
