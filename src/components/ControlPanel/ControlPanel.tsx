import { ArrowUpRight, Play, TrainFront } from "lucide-react";
import useTrackLineStore from "../../stores/useTrackLineStore";
import { getTrainLocation } from "../../utils/trainLocation";

const ControlPanel = () => {
  const startTrain = useTrackLineStore((state) => state.startTrain);
  const handleStationSignals = useTrackLineStore(
    (state) => state.handleStationSignals,
  );
  const trackLine = useTrackLineStore((state) => state.trackLine);
  const trains = useTrackLineStore((state) => state.trains);

  return (
    <div className="operator-content">
      <button className="dispatch-button" type="button" onClick={startTrain}>
        <span className="dispatch-play">
          <Play size={14} fill="currentColor" />
        </span>
        <span className="dispatch-copy">
          <strong>Dispatch train</strong>
          <small>Start a new service on the line</small>
        </span>
        <ArrowUpRight className="dispatch-arrow" size={17} />
      </button>

      {/* <section className="console-section movement-section">
        <header className="console-section-header">
          <h3>Train movements</h3>
          <span>{trains.length.toString().padStart(2, "0")} ACTIVE</span>
        </header>
        {trains.length > 0 ? (
          <div className="movement-list">
            {trains.map((train) => (
              <div className="movement-item" key={train.id}>
                <span className="movement-icon">
                  <TrainFront size={15} />
                </span>
                <strong>Train {train.id}</strong>
                <span className="movement-position">
                  {getTrainLocation(train, trackLine)}
                </span>
                <i />
              </div>
            ))}
          </div>
        ) : (
          <p className="movement-empty">No trains currently on the network.</p>
        )}
      </section> */}

      <section className="console-section">
        <header className="console-section-header">
          <h3>Station signals</h3>
          <span>
            {trackLine.filter((track) => track.type === "station").length}{" "}
            STATIONS
          </span>
        </header>
        {/* <p className="console-hint">Select a signal to set its aspect.</p> */}

        <div className="signal-stations">
          {trackLine.map((station, stationIndex) => {
            if (station.type !== "station") return null;

            return (
              <article
                className="signal-station-card"
                key={`${station.name}-${stationIndex}`}
              >
                <header className="signal-station-header">
                  <span className="station-badge">{station.name}</span>
                  <div>
                    <strong>Station {station.name}</strong>
                    <small>{station.tracks.length} PLATFORM ROUTES</small>
                  </div>
                  <span className="station-connected">
                    {/* <i /> ONLINE */}
                  </span>
                </header>

                <div className="signal-table">
                  <div className="signal-table-heading">
                    <span>TRACK</span>
                    <span>ENTRY</span>
                    <span>EXIT</span>
                  </div>
                  {station.tracks.map((track, trackIndex) => (
                    <div
                      className="signal-table-row"
                      key={`track-${trackIndex}`}
                    >
                      <span className="signal-track-name">
                        T{trackIndex + 1}
                      </span>
                      <button
                        className={`signal-action${track.entry.occupied ? " signal-stop" : " signal-clear"}`}
                        type="button"
                        aria-label={`Station ${station.name} track ${trackIndex + 1} entry signal ${track.entry.occupied ? "stop" : "clear"}`}
                        aria-pressed={!track.entry.occupied}
                        onClick={() =>
                          handleStationSignals(
                            stationIndex,
                            "entry",
                            trackIndex,
                          )
                        }
                      >
                        <i />
                        {track.entry.occupied ? "STOP" : "CLEAR"}
                      </button>
                      <button
                        className={`signal-action${track.exit.occupied ? " signal-stop" : " signal-clear"}`}
                        type="button"
                        aria-label={`Station ${station.name} track ${trackIndex + 1} exit signal ${track.exit.occupied ? "stop" : "clear"}`}
                        aria-pressed={!track.exit.occupied}
                        onClick={() =>
                          handleStationSignals(stationIndex, "exit", trackIndex)
                        }
                      >
                        <i />
                        {track.exit.occupied ? "STOP" : "CLEAR"}
                      </button>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ControlPanel;
