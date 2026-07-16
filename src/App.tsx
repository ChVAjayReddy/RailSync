import Simulator from "./pages/Simulator/Simulator";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import ControlPanel from "./components/ControlPanel";
import Alerts from "./components/Alerts";
import useTrackLineStore from "./stores/useTrackLineStore";

function App() {
  const alertMessage = useTrackLineStore((state) => state.alertMessage);
  const setAlertMessage = useTrackLineStore((state) => state.setAlertMessage);

  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulator</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm overflow-auto">
              <Simulator />
            </div>
            <ControlPanel />
          </div>
        </main>
      </div>
      <Alerts
        isOpen={Boolean(alertMessage)}
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />
    </div>
  );
}

export default App;
