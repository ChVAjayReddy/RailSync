import { LuTrainTrack } from "react-icons/lu";
import SignalDot from "../SignalDot";
import { PiTrafficSignalFill } from "react-icons/pi";

const DownLine = () => {
  const positions: (boolean | number | string)[][] = [
    [
      false,
      false,
      90,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      180,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      90,
      false,
      false,
      false,
      false,
      false,
      "signal",
      180,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      45,
      45,
      45,
      45,
      45,
      45,
      false,
      false,
      false,
      false,
    ],
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {positions.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row ">
              {row.map((position, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center w-4 h-4"
                >
                  {position === "signal" ? (
                    <PiTrafficSignalFill fill="green" />
                  ) : (
                    <LuTrainTrack
                      style={{
                        visibility: position === false ? "hidden" : "visible",
                        transform:
                          typeof position === "number" && position !== 0
                            ? `rotate(${position}deg)`
                            : undefined,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DownLine;
