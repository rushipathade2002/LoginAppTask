import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth.jsx";


export const Navbar = ()=>{
    const { isLoggedIn } =useAuth();
    return(
         <>
        <header>
            <div className="container">
            <div className="logo-brand">
                {/* <NavLink to="/"> <img src="/images/RPlogin1.png" className="logo"/> </NavLink> */}
            </div>
            <nav>
                <ul>
                    {/* <li><NavLink to="/">Home</NavLink></li> */}
                    {
                    isLoggedIn ? (
                            <li>
                                <NavLink to="/logout">Logout </NavLink>
                            </li>
                        )
                        : (
                            <>

                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>

                            </>
                        )
                    }
                    
                    
                    
                </ul>
            </nav>

            </div>
        </header>  
    </>
    );
}