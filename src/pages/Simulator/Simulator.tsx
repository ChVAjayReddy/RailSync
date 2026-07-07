import { trackLine } from "../../constants/railwayData";
import Section from "../../components/Section";
const Simulator = () => {
  return (
    <div className="flex flex-col gap-4 p-4 flex-wrap">
      {trackLine.map((track, trackIdx) => (
        <div
          key={trackIdx}
          className="flex flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div className="flex flex-row gap-2">
            {track.SectionsBeforeYard.map((section, idx) => (
              <div key={idx} className="flex items-center">
                <Section
                  length={section.length}
                  signalColor={section.signalColor}
                  signalType={section.signalType}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center gap-2">
            <Section
              length={track.stationYard.homeSignalSection.length}
              signalColor={track.stationYard.homeSignalSection.signalColor}
              signalType={track.stationYard.homeSignalSection.signalType}
            />
            <div className="flex flex-col gap-2">
              <Section
                length={track.stationYard.upLineSections.length}
                signalColor={track.stationYard.upLineSections.signalColor}
                signalType={track.stationYard.upLineSections.signalType}
              />
              <Section
                length={track.stationYard.mainLineSections.length}
                signalColor={track.stationYard.mainLineSections.signalColor}
                signalType={track.stationYard.mainLineSections.signalType}
              />
              <Section
                length={track.stationYard.downLineSections.length}
                signalColor={track.stationYard.downLineSections.signalColor}
                signalType={track.stationYard.downLineSections.signalType}
              />
            </div>
            <Section
              length={track.stationYard.outerSignalSection.length}
              signalColor={track.stationYard.outerSignalSection.signalColor}
              signalType={track.stationYard.outerSignalSection.signalType}
            />
          </div>
          <div className="flex flex-row gap-2">
            {track.SectionsBeforeYard.map((section, idx) => (
              <div key={idx} className="flex items-center">
                <Section
                  length={section.length}
                  signalColor={section.signalColor}
                  signalType={section.signalType}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Simulator;
