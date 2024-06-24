import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import {Navbar} from './components/Navbar';
import { Error } from "./pages/Error";
import { Home } from "./pages/Home" ;
import { Logout } from "./pages/Logout";


const App = ()=>{  
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes> 
    </BrowserRouter>
  </> ;
}

export default App;