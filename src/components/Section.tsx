import { LuTrainTrack } from "react-icons/lu";
import { TrainFront } from "lucide-react";
import Signal from "./Signal";

type SectionProps = {
  length: number;
  signalColor: "red" | "yellow" | "green";
  occupiedBy?: number;
  title?: string;
};

const Section = ({ length, signalColor, occupiedBy, title }: SectionProps) => {
  const isMainLineSection = title !== "exit";

  return (
    <div className={isMainLineSection ? "mainline-section" : "flex flex-col items-start self-end"}>
      {isMainLineSection && (
        <div className="mainline-section-heading">
          <span>TRACK SECTION</span>
          <span className={signalColor === "red" ? "section-occupancy occupied" : "section-occupancy clear"}>
            <i />
            {signalColor === "red" ? "OCCUPIED" : "CLEAR"}
          </span>
        </div>
      )}

      <div className={isMainLineSection ? "mainline-section-track" : "flex flex-col items-start self-end"}>
        {/* Entry Signal */}
        {title !== "exit" && (
          <div>
            <Signal color={signalColor} />
          </div>
        )}
        {title === "exit" && (
          <div className="flex flex-row self-end">
            <Signal color={signalColor} />
          </div>
        )}

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
        </div>
        {/* Exit Signal */}
      </div>
    </div>
  );
};

export default Section;
