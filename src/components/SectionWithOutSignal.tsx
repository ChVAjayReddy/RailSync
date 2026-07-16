type sectionProps = {
  length: number;
  occupiedBy?: number;
};
import { LuTrainTrack } from "react-icons/lu";
import { IoTrain } from "react-icons/io5";
const SignalWithOutSignal = ({ length, occupiedBy }: sectionProps) => {
  const section = [];
  for (let i = 0; i < length; i++) {
    if (occupiedBy !== undefined && occupiedBy === i) {
      section.push(
        <IoTrain
          key={i}
          className="text-sky-600"
          style={{ rotate: "90deg" }}
        />,
      );
    } else {
      section.push(
        <LuTrainTrack
          key={i}
          className="text-slate-500"
          style={{ rotate: "45deg" }}
        />,
      );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2">
          {section}
        </div>
      </div>
    </div>
  );
};
export default SignalWithOutSignal;
