import Section from "./Section";
import SignalWithOutSignal from "./SectionWithOutSignal";
import LoopSignal from "./LoopSignal";
import type { StationYard } from "../types/data";

type StationProps = {
  station: StationYard;
};

const Station = ({ station }: StationProps) => {
  return (
    <section className="station-yard" aria-label={`Station ${station.name}`}>
      <header className="station-yard-header">
        <span className="station-yard-mark">S</span>
        <div className="station-yard-title">
          <span className="station-yard-kicker">STATION {station.name}</span>
          {/* <h2>{station.name}</h2> */}
        </div>
        <span className="station-yard-platform-count">
          {station.tracks.length} PLATFORMS
        </span>
      </header>
      {/* 
      <div className="station-yard-labels" aria-hidden="true">
        <span>APPROACH</span>
        <span>PLATFORM TRACKS</span>
        <span>DEPARTURE</span>
      </div> */}

      <div className="station-yard-layout">
        <div className="station-yard-home">
          <span className="station-yard-track-label">HOME</span>
          <LoopSignal
            home={station.homeSection.occupied ? "red" : "green"}
            track1={station.tracks[0]?.entry.occupied ? "red" : "green"}
            track2={station.tracks[1]?.entry.occupied ? "red" : "green"}
            track3={station.tracks[2]?.entry.occupied ? "red" : "green"}
          />
          <SignalWithOutSignal
            length={station.homeSection.length}
            occupiedBy={station.homeSection.occupiedBy}
          />
        </div>

        <div className="station-yard-platforms">
          {station.tracks.map((track, index) => (
            <div className="station-platform-row" key={`platform-${index}`}>
              <span className="station-platform-label">P{index + 1}</span>
              <div className="station-platform-entry">
                <SignalWithOutSignal
                  length={track.entry.length}
                  occupiedBy={track.entry.occupiedBy}
                />
              </div>
              <div className="station-platform-exit">
                <Section
                  length={track.exit.length}
                  signalColor={track.exit.occupied ? "red" : "green"}
                  occupiedBy={track.exit.occupiedBy}
                  title="exit"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="station-yard-outer">
          <span className="station-yard-track-label">OUTER</span>
          <SignalWithOutSignal
            length={station.outerSection.length}
            occupiedBy={station.outerSection.occupiedBy}
          />
        </div>
      </div>

      {/* <footer className="station-yard-footer">
        <span>
          <i
            className={
              station.homeSection.occupied
                ? "yard-status-stop"
                : "yard-status-clear"
            }
          />
          HOME SIGNAL
        </span>
        <span>
          <i
            className={
              station.outerSection.occupied
                ? "yard-status-stop"
                : "yard-status-clear"
            }
          />
          OUTER SECTION
        </span>
      </footer> */}
    </section>
  );
};

export default Station;
