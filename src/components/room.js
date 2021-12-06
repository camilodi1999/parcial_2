import "../App.css";

function Room(props) {
  const room = props.room;
  const image = "./assets/" + room.name + ".png";
  return (
    <div
      className="card"
      style={{
        maxWidth: "13rem",
        height: "10rem",
      }}
      onClick={() => props.onClick(room)}
    >
      <div className="card-body" style={{ textAlign: "left" }}>
        <h5 className="card-title">{room.name}</h5>
      </div>
      <div style={{ paddingBottom: "1rem" }}>
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{ width: "5rem" }}
        />
      </div>
    </div>
  );
}

export default Room;
