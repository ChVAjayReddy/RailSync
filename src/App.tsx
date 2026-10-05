import { Activity, CircleDot, RadioTower, TrainFront } from "lucide-react";
import Alerts from "./components/Alerts";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Header from "./components/Layout/Header";
import Simulator from "./pages/Simulator/Simulator";
import useTrackLineStore from "./stores/useTrackLineStore";
import type { SectionType } from "./types/data";
import { getTrainLocation } from "./utils/trainLocation";
import "./App.css";

function App() {
  const trackLine = useTrackLineStore((state) => state.trackLine);
  const trains = useTrackLineStore((state) => state.trains);
  const alertMessage = useTrackLineStore((state) => state.alertMessage);
  const setAlertMessage = useTrackLineStore((state) => state.setAlertMessage);
  const sections = trackLine.filter(
    (track): track is SectionType => track.type === "section",
  );
  const occupiedSections = sections.filter(
    (section) => section.occupied,
  ).length;
  const stationCount = trackLine.filter(
    (track) => track.type === "station",
  ).length;

  return (
    <div className="operations-app">
      <Header />

      <main className="operations-main">
        <section className="page-intro">
          <div>
            {/* <p className="page-eyebrow">
              <span className="eyebrow-indicator" />
              NETWORK OPERATIONS
            </p> */}
            <h1>Control room</h1>
            {/* <p className="page-description">
              Monitor the line and manage station signals.
            </p> */}
          </div>
          <div className="heading-movements" aria-label="Train movements">
            <div className="heading-movements-title">
              <TrainFront size={15} />
              <span>TRAIN MOVEMENTS</span>
              <strong>{trains.length.toString().padStart(2, "0")}</strong>
            </div>
            {trains.length > 0 ? (
              <div className="heading-movement-list">
                {trains.map((train) => (
                  <div className="heading-movement" key={train.id}>
                    <span className="heading-movement-status" />
                    <strong>Train {train.id}</strong>
                    <span>{getTrainLocation(train, trackLine)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="heading-movements-empty">No trains on the network</p>
            )}
          </div>
        </section>

        <section className="overview-grid" aria-label="Network overview">
          <article className="overview-card">
            <span className="overview-icon icon-trains">
              <TrainFront size={18} />
            </span>
            <div className="overview-copy">
              <span>Active trains</span>
              <strong>{trains.length.toString().padStart(2, "0")}</strong>
            </div>
            {/* <span className="overview-detail">IN SERVICE</span> */}
          </article>
          <article className="overview-card">
            <span className="overview-icon icon-clear">
              <RadioTower size={17} />
            </span>
            <div className="overview-copy">
              <span>Clear sections</span>
              <strong>
                {(sections.length - occupiedSections)
                  .toString()
                  .padStart(2, "0")}
              </strong>
            </div>
            {/* <span className="overview-detail">OF {sections.length} BLOCKS</span> */}
          </article>
          <article className="overview-card">
            <span className="overview-icon icon-occupied">
              <CircleDot size={17} />
            </span>
            <div className="overview-copy">
              <span>Occupied sections</span>
              <strong>{occupiedSections.toString().padStart(2, "0")}</strong>
            </div>
            {/* <span className="overview-detail">TRACK CIRCUITS</span> */}
          </article>
          <article className="overview-card">
            <span className="overview-icon icon-stations">
              <Activity size={17} />
            </span>
            <div className="overview-copy">
              <span>No of Stations </span>
              <strong>{stationCount.toString().padStart(2, "0")}</strong>
            </div>
            {/* <span className="overview-detail">CONNECTED</span> */}
          </article>
        </section>

        <section className="workspace-grid">
          <section className="workspace-panel schematic-panel">
            <header className="workspace-panel-header">
              <div>
                <p className="panel-eyebrow">LIVE TRACK </p>
                {/* <h2>Line schematic</h2> */}
              </div>
              <span className="panel-live">{/* <span /> LIVE VIEW */}</span>
            </header>
            <div className="schematic-content">
              <Simulator />
            </div>
            <footer className="schematic-legend">
              <span>
                <i className="legend-symbol legend-track" /> TRACK
              </span>
              <span>
                <i className="legend-symbol legend-green" /> CLEAR
              </span>
              <span>
                <i className="legend-symbol legend-red" /> STOP / OCCUPIED
              </span>
              {/* <span className="legend-caption">SIGNAL ASPECTS UPDATE LIVE</span> */}
            </footer>
          </section>

          <aside className="workspace-panel operator-panel">
            <header className="workspace-panel-header operator-header">
              <span className="operator-icon">
                <RadioTower size={17} />
              </span>
              <div>
                {/* <p className="panel-eyebrow">ROUTE MANAGEMENT</p> */}
                <h2>Operator console</h2>
              </div>
              <span className="panel-live">{/* <span /> READY */}</span>
            </header>
            <ControlPanel />
          </aside>
        </section>

        {/* <footer className="app-footer">
          <span>
            <i /> SYSTEM OPERATIONAL
          </span>
          <span>
            RAILSYNC <b>·</b> RAILWAY SIGNAL SIMULATOR
          </span>
        </footer> */}
      </main>

      <Alerts
        isOpen={Boolean(alertMessage)}
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />
    </div>
  );
}

export default App;
