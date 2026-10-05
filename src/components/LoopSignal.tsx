import Signal from "./Signal";

type SignalProps = {
  home: "red" | "yellow" | "green";
  track1: "red" | "yellow" | "green";
  track2: "red" | "yellow" | "green";
  track3: "red" | "yellow" | "green";
};

const LoopSignal = ({ home, track1, track2, track3 }: SignalProps) => {
  return (
    <div className="flex w-fit flex-col items-center gap-0.5">
      <div className="flex items-end gap-1">
        <div className="-rotate-45">
          <Signal color={track1} compact />
        </div>

        <Signal color={track2} compact />

        <div className="rotate-45">
          <Signal color={track3} compact />
        </div>
      </div>

      <Signal color={home} compact />
    </div>
  );
};

export default LoopSignal;
