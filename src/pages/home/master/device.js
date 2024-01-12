import UI from "@gh/ui";
import Devices from "@/component/app/smart/roomDevices";
import useFetch from "@gh/helper/useFetch";

export default function App(props) {
  const device = useFetch({ url: `family/device` });
  const room = useFetch({ url: `family/room` });
  function roomMap(d) {
    return { ...d, room: room?.get()?.find((dx) => dx.id == d.room_id)?.name || "no room" };
  }

  return (
    <UI.Stack>
      <Devices
        data={device
          ?.get()
          ?.filter((d) => d.status_id != 2)
          .map(roomMap)}
        allList
      />
    </UI.Stack>
  );
}
