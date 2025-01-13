import UI from "@gh/ui";

export default function App(props) {
  return (
    <UI.Col
      py={2}
      px={1}
      flexGrow={1}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <UI.Col gap={2}>
        <UI.IconButton name="menu" />
        <UI.IconButton name="chat" />
      </UI.Col>
      <UI.Col gap={2}>
        <UI.IconButton name="settings" />
      </UI.Col>
    </UI.Col>
  );
}
