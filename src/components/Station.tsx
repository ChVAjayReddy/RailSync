import Section from "./Section";
import type { StationYard } from "../types/data";
import SignalWithOutSignal from "./SectionWithOutSignal";
import LoopSignal from "./LoopSignal";
type StationProps = {
  station: StationYard;
};
const Station = ({ station }: StationProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <LoopSignal
        home={station.homeSection.occupied ? "red" : "green"}
        track1={station.tracks[0].entry.occupied ? "red" : "green"}
        track2={station.tracks[1].entry.occupied ? "red" : "green"}
        track3={station.tracks[2].entry.occupied ? "red" : "green"}
      />

      <div className="flex flex-row items-center gap-2">
        <SignalWithOutSignal
          length={station.homeSection.length}
          occupiedBy={station.homeSection.occupiedBy}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row">
            <SignalWithOutSignal
              length={station.tracks[0].entry.length}
              occupiedBy={station.tracks[0].entry.occupiedBy}
            />
            <Section
              length={station.tracks[0].exit.length}
              signalColor={station.tracks[0].exit.occupied ? "red" : "green"}
              occupiedBy={station.tracks[0].exit.occupiedBy}
              title="exit"
            />{" "}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row">
            <SignalWithOutSignal
              length={station.tracks[1].entry.length}
              occupiedBy={station.tracks[1].entry.occupiedBy}
            />
            <Section
              length={station.tracks[1].exit.length}
              signalColor={station.tracks[1].exit.occupied ? "red" : "green"}
              occupiedBy={station.tracks[1].exit.occupiedBy}
              title="exit"
            />{" "}
          </div>
        </div>{" "}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row">
            <SignalWithOutSignal
              length={station.tracks[2].entry.length}
              occupiedBy={station.tracks[2].entry.occupiedBy}
            />
            <Section
              length={station.tracks[2].exit.length}
              signalColor={station.tracks[2].exit.occupied ? "red" : "green"}
              occupiedBy={station.tracks[2].exit.occupiedBy}
              title="exit"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SignalWithOutSignal
          length={station.outerSection.length}
          occupiedBy={station.outerSection.occupiedBy}
        />
      </div>
    </div>
  );
};
export default Station;
