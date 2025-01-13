import UI from "@gh/ui";
import Chat from "./_chat";

export default function App({ active, socket }) {
  if (!active) return <Empty />;
  return <Chat active={active} socket={socket} />;
}

function Empty(params) {
  return (
    <UI.Col flexGrow={1} center gap={1}>
      <UI.Text variant="body1">No Chat selected</UI.Text>
      <UI.Text variant="body2" color="grey">
        Start chat by selecting user list
      </UI.Text>
    </UI.Col>
  );
}
