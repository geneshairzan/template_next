import UI from "@gh/ui";

export default function App(props) {
  return (
    <UI.Col
      p={2}
      sx={{
        bgcolor: "grey",
        gap: 2,
      }}
    >
      <UI.Text variant="h2" color="primary">
        Chat
      </UI.Text>
      <UI.Col
        sx={{
          width: 300,
          height: 120,
          bgcolor: "lightGrey",
          borderRadius: 2,
        }}
      ></UI.Col>
      <UI.Col
        sx={{
          width: 300,
          height: 120,
          bgcolor: "lightGrey",
          borderRadius: 2,
        }}
      ></UI.Col>
      <UI.Col
        sx={{
          width: 300,
          height: 120,
          bgcolor: "lightGrey",
          borderRadius: 2,
          alignSelf: "flex-end",
        }}
      ></UI.Col>
    </UI.Col>
  );
}
