import useTrackLineStore from "../stores/useTrackLineStore";
import type { SectionType, StationYard } from "../types/data";
const ControlPanel = () => {
  const startTrain = useTrackLineStore((state) => state.startTrain);
  const trackLine: (StationYard | SectionType)[] = useTrackLineStore(
    (state) => state.trackLine,
  );
  return (
    <div>
      <button onClick={startTrain}>Start train</button>
      {trackLine.map((track, index) => {
        if (track.type === "station")
          return (
            <div>
              <p>Station {track.name}</p>
              <button>{track.homeSection.type}</button>
              {track.tracks.map((loop, index) => (
                <div>Track {index}</div>
              ))}
              <button>{track.outerSection.type}</button>
            </div>
          );
      })}
    </div>
  );
};
export default ControlPanel;
