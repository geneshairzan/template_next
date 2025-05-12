import { Modal, Stack } from "@mui/material";
import Text from "./typography";
import Icon from "./icon";
import IconButton from "./iconButton";

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

export function ModalContainer(props) {
  return (
    <Stack
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        width: "60%",
        height: "60%",
        p: 2,
        ...props.sx,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text variant="h6" bold>
          {props.title}
        </Text>
        <IconButton name="close" onClick={props.onClose} />
      </Stack>
      {props.children}
    </Stack>
  );
}
