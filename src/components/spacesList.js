import { useEffect, useState } from "react";
import Devices from "./devicesList";
import Room from "./room";
import Space from "./space";

import { FormattedMessage } from "react-intl";
import D3Chart from "./d3Chart";

function SpacesList() {
  const [space, setSpace] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [colRoom, setColRoom] = useState("");
  const [devices, setDevices] = useState([]);

  function selectSpace(selected) {
    setColRoom("");
    const url_room =
      "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

    if (!navigator.onLine) {
      if (localStorage.getItem("room" + selected.id) === null) {
        setRooms([]);
      } else {
        setRooms(JSON.parse(localStorage.getItem("room" + selected.id)));
      }
    } else {
      fetch(url_room)
        .then((res) => res.json())
        .then((res) => {
          const roomsFilter = res.filter((r) => r.homeId === selected.id);
          setRooms(roomsFilter);
          localStorage.setItem(
            "room" + selected.id,
            JSON.stringify(roomsFilter)
          );
        });
    }
  }

  function selectRoom(selected) {
    setDevices(selected.devices);
    setColRoom("-7");
  }

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("spaces") === null) {
      } else {
        setSpace(JSON.parse(localStorage.getItem("spaces")));
      }
    } else {
      const url =
        "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setSpace(res);
          localStorage.setItem("spaces", JSON.stringify(res));
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="row" style={{ textAlign: "left" }}>
          <h1>
            <FormattedMessage id="My Spaces" />
          </h1>
        </div>
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              {space.map((s) => (
                <div className="col" key={s.id}>
                  <Space space={s} key={s.id} onClick={selectSpace} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row" style={{ textAlign: "left" }}>
          {rooms.length > 0 ? (
            <h1>
              <FormattedMessage id="My Rooms" />
            </h1>
          ) : null}
        </div>
        <div className="row">
          <div className={"col" + colRoom}>
            <div className="row">
              {rooms.map((r) => (
                <div className="col" key={r.name}>
                  <Room room={r} key={r.id} onClick={selectRoom} />
                </div>
              ))}
            </div>
          </div>
          {colRoom !== "" ? <Devices devices={devices} /> : null}
        </div>
        {rooms.length > 0 ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h1>
                  <FormattedMessage id="Stats" />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <FormattedMessage id="Power usage" />
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="row">
          <div className="col">
            <D3Chart rooms={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpacesList;
