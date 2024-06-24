import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { toast } from "react-toastify";


const URL = 'http://localhost:5000/api/auth/login';

export const Login = () =>{
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const [user, setUser] = useState({
        email:"",
        password:"",
    });

    const handleInput = (event)=>{
        let name = event.target.name;
        let value = event.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    }

    const handleSubmit =async (event)=>{
        event.preventDefault();
        try {
            const response = await fetch(URL,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user),
            })

            // console.log("login form", response);
            const res_data=await response.json();

            if(response.ok){
                // store the token in localstorage
                storeTokenInLS(res_data.token);
                toast.success("Login successful");
                // navigate to home page
                navigate("/");
                setUser({email:"",password:""});
                
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            
        } catch (error) {
            console.log("Error: ", error) ;
            
        }
    }




    return <>
        <section>
            <main>
                <div className="justify-content-center align-items-center flex-column login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="justify-content-center align-content-center login ">
                        <h1 className="text-center mb-5">Login</h1>
                        
                            <div>
                                <label htmlFor="email">Email : </label><br/>
                                    <input type="email" name="email" placeholder="Your Email..." id="email" required autoComplete="on" value={user.email} onChange={handleInput}/>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password : </label><br/>
                                    <input type="password" name="password" placeholder="Password..." id="Password" required autoComplete="on" value={user.password} onChange={handleInput}/>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-submit"> Login Now</button>
                        </div>
                        <div className="forgot-password mt-2">
                            <Link to="/forgot-password" >Forgot Password?</Link>
                        </div>
                        <div className="mt-2">
                            <span>Don`t have an Account, </span>
                            <Link to="/register">Register Now</Link>
                        </div>

                    </form>
                </div>

            </main>
        </section>
    </>
}


