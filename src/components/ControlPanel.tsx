import useTrackLineStore from "../stores/useTrackLineStore";
import type { SectionType, StationYard } from "../types/data";

const ControlPanel = () => {
  const startTrain = useTrackLineStore((state) => state.startTrain);
  const handleStationSignals = useTrackLineStore(
    (state) => state.handleStationSignals,
  );
  const trackLine: (StationYard | SectionType)[] = useTrackLineStore(
    (state) => state.trackLine,
  );

  return (
    <div>
      <button onClick={startTrain}>Start train</button>
      {trackLine.map((track, index) => {
        if (track.type === "station")
          return (
            <div key={`${track.name}-${index}`}>
              <p>Station {track.name}</p>
              {/* <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                onClick={() => handleStationSignals(index, "home")}
              >
                {track.homeSection.type}
              </button> */}
              {track.tracks.map((looptrack, trackIndex) => (
                <div key={`${track.name}-track-${trackIndex}`}>
                  <p>Track {trackIndex}</p>
                  <button
                    onClick={() =>
                      handleStationSignals(index, "entry", trackIndex)
                    }
                    style={{
                      backgroundColor: looptrack.entry.occupied
                        ? "red"
                        : "green",
                    }}
                  >
                    entry
                  </button>{" "}
                  <button
                    onClick={() =>
                      handleStationSignals(index, "exit", trackIndex)
                    }
                    style={{
                      backgroundColor: looptrack.exit.occupied
                        ? "red"
                        : "green",
                    }}
                  >
                    exit
                  </button>
                </div>
              ))}
            </div>
          );
      })}
    </div>
  );
};

export default ControlPanel;
