import { Clock3, TrainFront } from "lucide-react";
import { useEffect, useState } from "react";
import useTrackLineStore from "../../stores/useTrackLineStore";

const formatTime = () =>
  new Date().toLocaleTimeString("en-IN", {
    hour12: false,
  });

const Header = () => {
  const [time, setTime] = useState(formatTime);
  const trainCount = useTrackLineStore((state) => state.trains.length);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="RailSync home">
        <span className="brand-mark">
          <TrainFront size={20} />
        </span>
        <span className="brand-text">
          <strong>
            RAIL<span>SYNC</span>
          </strong>
          <small>RAILWAY CONTROL SYSTEM</small>
        </span>
      </a>

      {/* <div className="topbar-context">
        <span className="topbar-simulation"><Activity size={14} /> SIMULATION ACTIVE</span>
        <span className="topbar-divider" />
        <span className="topbar-location">CENTRAL OPERATIONS</span>
      </div> */}

      <div className="topbar-info">
        <div className="topbar-clock">
          <Clock3 size={15} />
          <span>{time}</span>
          <small>LOCAL</small>
        </div>
        <span className="topbar-divider" />
        <div className="topbar-trains">
          <TrainFront size={15} />
          <strong>{trainCount.toString().padStart(2, "0")}</strong>
          <small>TRAINS</small>
        </div>
      </div>
    </header>
  );
};

export default Header;
