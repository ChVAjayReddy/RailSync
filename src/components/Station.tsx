import UpLine from "./Station/UpLine";
import MainLine from "./Station/MainLine";
import DownLine from "./Station/DownLine";
const Station = ({ stationName }: { stationName: string }) => {
  return (
    <div className="flex flex-col items-center w-max">
      <div>
        <UpLine stationName={stationName} />
      </div>
      <div>
        <MainLine />
      </div>
      <div>
        <DownLine />
      </div>
    </div>
  );
};
export default Station;
