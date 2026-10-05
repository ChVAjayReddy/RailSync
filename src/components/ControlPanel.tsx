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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <h2 className="text-xl font-bold tracking-wide text-cyan-300">
          🎛 Control Panel
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Railway Signal Operator Console
        </p>

        <button
          onClick={startTrain}
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            py-2.5
            font-semibold
            text-white
            transition-all
            hover:scale-[1.02]
          "
        >
          🚆 Start Train
        </button>
      </div>

      {/* Stations */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {trackLine.map((track, stationIndex) => {
          if (track.type !== "station") return null;

          return (
            <div
              key={`${track.name}-${stationIndex}`}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
                backdrop-blur-xl
              "
            >
              {/* Station Name */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-cyan-300">🚉 {track.name}</h3>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                  {track.tracks.length} Tracks
                </span>
              </div>

              {/* Header */}
              <div className="grid grid-cols-3 items-center border-b border-white/10 pb-2 text-center">
                <div className="text-left text-xs font-semibold text-slate-400">
                  Track
                </div>

                <div className="text-xs font-bold text-emerald-300">ENTRY</div>

                <div className="text-xs font-bold text-rose-300">EXIT</div>
              </div>

              {/* Tracks */}
              <div className="mt-3 space-y-3">
                {track.tracks.map((loopTrack, trackIndex) => (
                  <div
                    key={trackIndex}
                    className="grid grid-cols-3 items-center"
                  >
                    {/* Track */}
                    <div className="font-medium text-slate-300">
                      T{trackIndex + 1}
                    </div>

                    {/* Entry */}
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleStationSignals(
                            stationIndex,
                            "entry",
                            trackIndex,
                          )
                        }
                        className={`
                          h-5
                          w-10
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            loopTrack.entry.occupied
                              ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                              : "bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                          }
                        `}
                      />
                    </div>

                    {/* Exit */}
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleStationSignals(stationIndex, "exit", trackIndex)
                        }
                        className={`
                          h-5
                          w-10
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            loopTrack.exit.occupied
                              ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                              : "bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                          }
                        `}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ControlPanel;
