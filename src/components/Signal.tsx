import { PiTrafficSignalFill } from "react-icons/pi";
type SignalProps = {
  color: "red" | "yellow" | "green";
};
const Signal = ({ color }: SignalProps) => {
  return <PiTrafficSignalFill fill={color} />;
};
export default Signal;
