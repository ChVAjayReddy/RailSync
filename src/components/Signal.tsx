type SignalProps = {
  color: "red" | "yellow" | "green";
};

const Signal = ({ color }: SignalProps) => {
  const lampMap = {
    red: "bg-red-500 shadow-[0_0_14px_rgba(248,113,113,0.75)]",
    yellow: "bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.7)]",
    green: "bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.72)]",
  };

  return (
    <div className="flex h-16 w-10 flex-col items-center justify-center gap-1 rounded-2xl border border-slate-300 bg-slate-900 px-2 py-2 shadow-inner">
      <div
        className={`h-3 w-3 rounded-full ${color === "red" ? lampMap[color] : "bg-slate-700"}`}
      />
      <div
        className={`h-3 w-3 rounded-full ${color === "green" ? lampMap[color] : "bg-slate-700"}`}
      />
      <div
        className={`h-3 w-3 rounded-full ${color === "yellow" ? lampMap[color] : "bg-slate-700"}`}
      />
    </div>
  );
};

export default Signal;
