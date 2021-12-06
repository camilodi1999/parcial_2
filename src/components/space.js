import "../App.css";

function Space(props) {
  const space = props.space;
  const image = "./assets/" + space.type + ".png";
  return (
    <div className="card" onClick={() => props.onClick(space)}>
      <div style={{ padding: "1rem" }}>
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{ width: "6rem" }}
        />
      </div>
      <div
        className="card-body"
        style={{ textAlign: "left", paddingBottom: "2rem" }}
      >
        <h5 className="card-title">{space.name}</h5>
        <p className="card-text">{space.address}</p>
      </div>
    </div>
  );
}

export default Space;
