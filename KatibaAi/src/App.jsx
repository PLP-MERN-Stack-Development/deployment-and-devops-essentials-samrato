import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  

  return (
    <div>
     <Router>
            <Routes>
               
                <Route path="/" element={<Signin/>} />
                <Route path="/home" element={<Home/>} />
               

                
            </Routes>    
    </Router>
    </div>
  )
}

export default App
