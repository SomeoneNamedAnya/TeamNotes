import Entrance from "./pages/Entrance/Entrance.jsx"
import Registration from "./pages/Registration/Registration.jsx"
import Home from "./pages/Home/Home.jsx"
import Group from "./pages/Group/Group.jsx"
import Invitation from "./pages/Invitation/Invitation.jsx"
import About from "./pages/About/About.jsx"
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
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/group" element={<Group />} />
            <Route path="/about" element={<About />} />
            
        </Routes>
      </Router>
    </div>
  );
}

export default App;
