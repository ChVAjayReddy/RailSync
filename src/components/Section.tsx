import { LuTrainTrack } from "react-icons/lu";
import { IoTrain } from "react-icons/io5";
import Signal from "./Signal";
type sectionProps = {
  length: number;
  signalColor: "red" | "yellow" | "green";
  occupiedBy?: number;
};
const Section = ({ length, signalColor, occupiedBy }: sectionProps) => {
  const section = [];
  for (let i = 0; i < length; i++) {
    if (occupiedBy !== undefined && occupiedBy === i) {
      section.push(<IoTrain key={i} style={{ rotate: "90deg" }} />);
    } else {
      section.push(<LuTrainTrack key={i} style={{ rotate: "45deg" }} />);
    }
  }
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row gap-2 items-center ">
        <Signal color={signalColor} />
      </div>

      <div className="flex flex-row gap-1 text-gray-600">{section}</div>
    </div>
  );
};
export default Section;
