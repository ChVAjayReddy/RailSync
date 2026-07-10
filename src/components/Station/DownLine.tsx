import { LuTrainTrack } from "react-icons/lu";
import { PiTrafficSignalFill } from "react-icons/pi";
import { IoTrain } from "react-icons/io5";

type SectionProps = {
  length: number;
  entrySignalColor: "red" | "yellow" | "green";
  exitSignalColor: "red" | "yellow" | "green";
  type: "home" | "outer" | "up" | "down" | "main" | "section";
  occupiedBy?: number;
};

const DownLine = ({
  length,
  entrySignalColor,
  exitSignalColor,
  type,
  occupiedBy,
}: SectionProps) => {
  const section = [];
  for (let i = 0; i < length; i++) {
    if (occupiedBy !== undefined && occupiedBy === i) {
      section.push(<IoTrain key={i} style={{ rotate: "45deg" }} />);
    } else {
      section.push(<LuTrainTrack key={i} style={{ rotate: "45deg" }} />);
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <PiTrafficSignalFill fill={entrySignalColor} />
        <span className="text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded">
          {type}
        </span>
        <PiTrafficSignalFill fill={exitSignalColor} />
      </div>
      <div className="flex flex-row">{section}</div>
    </div>
  );
};

export default DownLine;
