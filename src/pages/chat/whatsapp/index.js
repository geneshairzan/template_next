import UI from "@gh/ui";
import Whatsup from "@/component/chatui/whatsup";

export default function App(props) {
  return (
    <UI.Col
      center
      sx={{
        flex: 1,
        padding: 2,
      }}
    >
      <UI.Col
        center
        sx={{
          maxWidth: 1280,
          width: "100vw",
          flex: 1,
        }}
      >
        <Whatsup />
      </UI.Col>
    </UI.Col>
  );
}
