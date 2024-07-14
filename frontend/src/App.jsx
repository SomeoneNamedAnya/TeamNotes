import Entrance from "./pages/Entrance/Entrance.jsx"
import Registration from "./pages/Registration/Registration.jsx"
import Home from "./pages/Home/Home.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
       <Router>
      <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/entrance" element={<Entrance />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
