import { LuTrainTrack } from "react-icons/lu";
import { TrainFront } from "lucide-react";

type SectionProps = {
  length: number;

  occupiedBy?: number;
};

const SignalWithOutSignal = ({
  length,

  occupiedBy,
}: SectionProps) => {
  return (
    <div className="flex flex-col items-start self-end">
      {/* Track */}
      <div
        className="
          flex
          items-center
          gap-0.5

         
        "
      >
        {Array.from({ length }).map((_, index) => (
          <span className="rail-position" key={index}>
            <LuTrainTrack
              color="white"
              style={{ rotate: "45deg" }}
            />
            {occupiedBy === index && (
              <TrainFront
                className="attached-train"
                aria-label="Train on track"
                strokeWidth={2.4}
                style={{ rotate: "90deg" }}
              />
            )}
          </span>
        ))}

        {/* Exit Signal */}
      </div>
    </div>
  );
};

export default SignalWithOutSignal;
