import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TeamGeneration from "./pages/TeamGeneration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-generation/:eventId" element={<TeamGeneration />} />
      </Routes>
    </BrowserRouter>

  )
}
