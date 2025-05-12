import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";

export default function App({ data, onClose }) {
  let detail = useFetch({
    url: "/super/moesif/userdetail",
    method: "post",
    data: {
      uid: data,
    },
  });

  if (!detail.data) return <UI.Loader />;

  return (
    <UI.Modal open>
      <UI.ModalContainer title="User Detail" onClose={onClose}>
        {!detail.data && <UI.Loader />}
        {detail.data && (
          <>
            <RowItem label="Id" value={detail?.data?.identified_user_id} />
            <RowItem label="Email" value={detail?.data.email} />
            <RowItem label="Name" value={detail?.data.name} />
            {console.log(detail.data?.company.subscriptions)}
            <UI.Text variant="h6" bold pt={2}>
              Subscriptions
            </UI.Text>
            <SubsRowItem />
            {detail.data?.company.subscriptions.map((d) => (
              <SubsRowItem data={d} />
            ))}
          </>
        )}
      </UI.ModalContainer>
    </UI.Modal>
  );
}

function RowItem({ label, value }) {
  return (
    <UI.Row>
      <UI.Text variant="body1" width={120}>
        {label}
      </UI.Text>
      <UI.Text variant="body1">: {value}</UI.Text>
    </UI.Row>
  );
}

function SubsRowItem({ data }) {
  return (
    <UI.Row
      gap={1}
      sx={{
        height: 42,
        alignItems: "center",
        ...(!data && {
          backgroundColor: "primary.main",
          fontWeight: "bold",
          color: "white",
        }),
        px: 2,
        borderBottom: "1px solid lightgrey",
      }}
    >
      <UI.Text variant="body1" width={240}>
        {!data ? "ID" : data?.subscription_id}
      </UI.Text>
      <UI.Text variant="body1" width={120} flex={1}>
        {!data ? "Start Date" : h.date.format(data.start_date)}
      </UI.Text>
      <UI.Text variant="body1" width={120} flex={1}>
        {!data ? "Name" : data.items[0]?.price.name}
      </UI.Text>

      <UI.Text variant="body1" flex={1}>
        {!data ? "Usage" : "???"}
      </UI.Text>
      <UI.Text variant="body1" flex={1}>
        {!data ? "Status" : data?.status}
      </UI.Text>
    </UI.Row>
  );
}
