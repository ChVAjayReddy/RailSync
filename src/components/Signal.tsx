// type SignalProps = {
//   color: "red" | "yellow" | "green";
// };
const Signal = () => {
  return (
    <div
      className="flex bg-black rounded-md"
      style={{
        width: "10px",
        height: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2px",
      }}
    >
      <div
        className="bg-red-500 rounded-md"
        style={{ width: "8px", height: "8px" }}
      ></div>
      <div
        className="bg-yellow-500 rounded-md"
        style={{ width: "8px", height: "8px" }}
      ></div>
      <div
        className="bg-green-500 rounded-md"
        style={{ width: "8px", height: "8px" }}
      ></div>
    </div>
  );
};
export default Signal;
