import Entrance from "./pages/Entrance/Entrance.jsx"
import Registration from "./pages/Registration/Registration.jsx"
import Home from "./pages/Home/Home.jsx"
import Group from "./pages/Group/Group.jsx"
import Invitation from "./pages/Invitation/Invitation.jsx"
import About from "./pages/About/About.jsx"
import Wating from "./pages/Group/Waiting.jsx"
import Participants from "./pages/Group/Participants.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Entrance from "./Entrance/Entrance.jsx"
import MainPage from "./MainPage/MainPage.jsx"
import Auth from "./Entrance/Auth.jsx"
import CreaateGroup from "./CreateGroup.jsx"

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
            <Route path="/participants" element={<Participants />} />
            <Route path="/wating" element={<Wating />} />
            
        </Routes>
      </Router>
    </div>
  );
}

export default App;
