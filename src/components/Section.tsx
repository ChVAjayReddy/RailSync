import { LuTrainTrack } from "react-icons/lu";
import Signal from "./Signal";
type sectionProps = {
  length: number;
  signalColor: "red" | "yellow" | "green";
  signalType: "section" | "home" | "outer" | "up" | "down" | "main";
};
const Section = ({ length, signalColor, signalType }: sectionProps) => {
  const section = [];
  for (let i = 0; i < length; i++) {
    section.push(<LuTrainTrack key={i} style={{ rotate: "45deg" }} />);
  }
  return (
    <div className="flex flex-col gap-2">
      {signalType === "section" || signalType === "home" ? (
        <div className="flex flex-row gap-2 items-center ">
          <Signal color={signalColor} />
          <span className="text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded">
            {signalType}
          </span>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center  justify-end">
          <span className="text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded">
            {signalType}
          </span>
          <Signal color={signalColor} />
        </div>
      )}

      <div className="flex flex-row gap-1 text-gray-600">{section}</div>
    </div>
  );
};
export default Section;
