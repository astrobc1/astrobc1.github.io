import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Hobbies from "./components/Hobbies";
import DevNotes from "./components/Notes";
import LightRays from './components/LightRays';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App" id="scroll" style={{ 
        position: "relative", 
        overflow: "hidden",
        backgroundColor: "transparent",
        minHeight: "100vh",
        overscrollBehavior: "none"
      }}>
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "#0a0a0a"
        }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#9b0de8"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
          </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/notes" element={<DevNotes />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
