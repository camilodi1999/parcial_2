import { useEffect, useState } from "react";
import Space from "./space";
function SpacesList() {
  const [space, setSpace] = useState([]);

  useEffect(() => {
    const url =
      "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSpace(res);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="row" style={{ textAlign: "left" }}>
          <h1>My Spaces</h1>
        </div>
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              {space.map((s) => (
                <div className="col">
                  <Space space={s} key={s.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpacesList;
