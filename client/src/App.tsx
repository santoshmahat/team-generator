import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const TeamGeneration = lazy(() => import("./pages/TeamGeneration"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team-generation/:eventId" element={<TeamGeneration />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}