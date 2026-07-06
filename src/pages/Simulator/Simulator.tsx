import { railwayLine } from "../../constants/railwayData";
import Track from "../../components/Track";
import Station from "../../components/Station";

const Simulator = () => {
  return (
    <div className="flex-row  flex flex-wrap">
      {railwayLine.map((line) => (
        <div className="flex flex-row items-center">
          {line.type === "track" ? (
            <div>
              <Track name={line.data.name} id={line.data.id} />
            </div>
          ) : (
            <div>
              <Station stationName={line.data.name} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Simulator;
