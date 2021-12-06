import "../App.css";

import { FormattedMessage } from "react-intl";

function Devices(props) {
  const devices = props.devices;
  return (
    <div className="col-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">
              {" "}
              <FormattedMessage id="Device" />
            </th>
            <th scope="col">
              {" "}
              <FormattedMessage id="Value" />
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d, b) => {
            return (
              <tr key={b}>
                <th scope="row"> {b + 1} </th>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.desired.value + ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Devices;
