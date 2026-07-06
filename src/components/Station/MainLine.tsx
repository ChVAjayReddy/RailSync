import { LuTrainTrack } from "react-icons/lu";

const MainLine = () => {
  const positions: (boolean | number)[][] = [
    [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45],
  ];
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row">
        {positions[0].map((position, index) => (
          <LuTrainTrack
            key={index}
            style={{
              transform:
                typeof position === "number" && position !== 0
                  ? `rotate(${position}deg)`
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default MainLine;
