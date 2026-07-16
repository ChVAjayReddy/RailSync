import Signal from "./Signal";
type SignalProps = {
  home: "red" | "yellow" | "green";
  track1: "red" | "yellow" | "green";
  track2: "red" | "yellow" | "green";
  track3: "red" | "yellow" | "green";
};
const LoopSignal = ({ home, track1, track2, track3 }: SignalProps) => {
  return (
    <div className="flex flex-col w-fit">
      <div className="flex flex-row">
        <div style={{ rotate: "-45deg" }}>
          <Signal color={track1}></Signal>
        </div>
        <div>
          <Signal color={track2}></Signal>
        </div>
        <div style={{ rotate: "45deg" }}>
          <Signal color={track3}></Signal>
        </div>
      </div>
      <div className="flex justify-center">
        <Signal color={home}></Signal>
      </div>
    </div>
  );
};
export default LoopSignal;
