import UI from "@gh/ui";

export default function UserInfo({ data }) {
  return (
    <UI.Row
      gap={1}
      width="100%"
      sx={{
        p: 2,
        borderBottom: "1px solid lightGrey",
      }}
      alignItems="center"
    >
      <UI.Avatar alt={data?.name} />
      <UI.Col flexGrow={1}>
        <UI.Text variant="body" bold>
          {data?.name}
        </UI.Text>
        <UI.Text variant="body2">Some last chat text</UI.Text>
      </UI.Col>
      <UI.IconButton name="search" />
    </UI.Row>
  );
}
