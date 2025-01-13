import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ selected, onSelected }) {
  let user = useFetch({
    url: "user",
  });

  return (
    <UI.Col center p={2} gap={2}>
      <UI.Row
        sx={{
          width: "100%",
        }}
      >
        <UI.Text variant="h4" bold>
          Chats
        </UI.Text>
      </UI.Row>
      <Form.Text placeholder="search" fullWidth />
      <UI.Col width="100%">
        {user.data?.map((d) => (
          <UserItem key={d.id} data={d} onClick={() => onSelected(d)} active={selected?.id == d.id} />
        ))}
      </UI.Col>
    </UI.Col>
  );
}

function UserItem({ data, onClick, active }) {
  return (
    <UI.Row
      gap={1}
      width="100%"
      onClick={onClick}
      sx={{
        bgcolor: active && "#f9f9f9",
        p: 1,
        borderRadius: 2,
        "&:hover": {
          opacity: 0.8,
        },
      }}
    >
      <UI.Avatar alt={data?.name} />
      <UI.Col flexGrow={1}>
        <UI.Row spaced>
          <UI.Text variant="body" bold>
            {data?.name}
          </UI.Text>
          <UI.Text variant="body2">Yesterday</UI.Text>
        </UI.Row>
        <UI.Row>
          <UI.Text variant="body2">Some last chat text</UI.Text>
        </UI.Row>
      </UI.Col>
    </UI.Row>
  );
}
