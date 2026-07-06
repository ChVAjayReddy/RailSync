import { PiTrafficSignalFill } from "react-icons/pi";
import { trackLength } from "../constants/railwayData";
import { LuTrainTrack } from "react-icons/lu";

type TrackProps = {
  name: string;
  id: number;
};

const Track = ({ name, id }: TrackProps) => {
  const trackdivision = [];
  for (let i = 0; i < trackLength; i++) {
    trackdivision.push(<LuTrainTrack style={{ rotate: "45deg" }} />);
  }
  return (
    <div className="flex flex-col align-middle">
      <div>
        <PiTrafficSignalFill fill="green" />
      </div>
      <div className="flex">{trackdivision}</div>
    </div>
  );
};
export default Track;
