type SignalProps = {
  color: "red" | "yellow" | "green";
  compact?: boolean;
};

const Signal = ({ color, compact = false }: SignalProps) => {
  const activeLamp = {
    red: "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]",
    yellow: "bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]",
    green: "bg-emerald-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]",
  };

  const inactive = "bg-slate-700";

  return (
    <div className="flex flex-col items-center">
      {/* Signal Head */}
      <div
        className={`
          flex flex-col items-center rounded border border-slate-700 bg-slate-900
          ${compact ? "w-3 p-0.5 gap-px" : "w-4 p-0.5 gap-0.5"}
        `}
      >
        <div
          className={`${compact ? "h-1 w-1" : "h-1.5 w-1.5"} rounded-full ${
            color === "red" ? activeLamp.red : inactive
          }`}
        />

        <div
          className={`${compact ? "h-1 w-1" : "h-1.5 w-1.5"} rounded-full ${
            color === "yellow" ? activeLamp.yellow : inactive
          }`}
        />

        <div
          className={`${compact ? "h-1 w-1" : "h-1.5 w-1.5"} rounded-full ${
            color === "green" ? activeLamp.green : inactive
          }`}
        />
      </div>

      {/* Pole only for track signals */}
      {!compact && <div className="h-3 w-[2px] bg-slate-500" />}
    </div>
  );
};

export default Signal;
