import SignalToggle from "./SignalToggle";
import type { StationYard } from "../../types/data";

type StationCardProps = {
  station: StationYard;
  stationIndex: number;
  handleStationSignals: (
    stationIndex: number,
    signalType: "entry" | "exit",
    trackIndex: number,
  ) => void;
};

const StationCard = ({
  station,
  stationIndex,
  handleStationSignals,
}: StationCardProps) => {
  return (
    <div
      className="
      w-full
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
    
      transition-all
      duration-300
      hover:bg-white/10
      hover:border-cyan-400/30
      hover:shadow-cyan-500/10
    "
    >
      <div className="flex flex-row items-center justify-between gap-8">
        {/* Station Name */}
        <div className="min-w-[150px]">
          <h2 className="text-xl font-bold tracking-wide text-black">
            🚉 Station {station.name}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {station.tracks.length} Tracks
          </p>
        </div>

        {/* Entry Signals */}
        <div className="flex flex-row items-center gap-4">
          <span
            className="
            rounded-lg
            border border-emerald-400/30
            bg-emerald-500/15
            px-3
            py-1
            text-xs
            font-bold
            tracking-wider
            text-emerald-700          "
          >
            ENTRY
          </span>

          <div
            className="
            flex flex-row
            items-center
            gap-4

            rounded-xl
            border border-white/10
            bg-black/20
            px-4
            py-3
          "
          >
            {station.tracks.map((track, index) => (
              <div
                key={`entry-${index}`}
                className="flex flex-row items-center gap-2"
              >
                <span
                  className="
                  rounded-md
                  bg-cyan-500/15
                  px-2
                  py-1
                  text-xs
                  font-bold
                  text-yellow
                "
                >
                  T{index + 1}
                </span>

                <SignalToggle
                  occupied={track.entry.occupied}
                  onClick={() =>
                    handleStationSignals(stationIndex, "entry", index)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-14 w-px bg-white/10"></div>

        {/* Exit Signals */}
        <div className="flex flex-row items-center gap-4">
          <span
            className="
            rounded-lg
            border border-rose-400/30
            bg-rose-500/15
            px-3
            py-1
            text-xs
            font-bold
            tracking-wider
            text-red-700
          "
          >
            EXIT
          </span>

          <div
            className="
            flex flex-row
            items-center
            gap-4

            rounded-xl
            border border-white/10
            bg-black/20
            px-4
            py-3
          "
          >
            {station.tracks.map((track, index) => (
              <div
                key={`exit-${index}`}
                className="flex flex-row items-center gap-2"
              >
                <span
                  className="
                  rounded-md
                  bg-cyan-500/15
                  px-2
                  py-1
                  text-xs
                  font-bold
                  text-yellow
                "
                >
                  T{index + 1}
                </span>

                <SignalToggle
                  occupied={track.exit.occupied}
                  onClick={() =>
                    handleStationSignals(stationIndex, "exit", index)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
