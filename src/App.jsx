import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ManualQuiz from "./pages/ManualQuiz";
import VoiceQuiz from "./pages/VoiceQuiz";
import Summary from "./pages/Summary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manual" element={<ManualQuiz />} />
      <Route path="/voice" element={<VoiceQuiz />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}

export default App;