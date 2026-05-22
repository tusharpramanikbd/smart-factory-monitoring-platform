import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import MachineDetailsPage from "./pages/MachineDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/machines/:id" element={<MachineDetailsPage />} />
    </Routes>
  );
}

export default App;
