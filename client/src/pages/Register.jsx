import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { toast } from "react-toastify";

const URL = 'http://localhost:5000/api/auth/register';

export const Register = () =>{

    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        username:"",
        email:"",
        DateOfBirth:"",
        password:"",
    });



    // handling the input values
    const handleInput =(e)=>{
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    }

    // handling form submission
    const handleSubmit =async (e)=>{
        e.preventDefault();
        // alert(user);
        console.log(user);

        try {
            const response =await fetch(URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        });

             const res_data=await response.json();
             console.log(res_data.extraDetails);

            if(response.ok){
                // store the token in localstorage
                storeTokenInLS(res_data.token);
                
                setUser({username:"",
                        email:"",
                        DateOfBirth:"",
                        password:""
                    });
                toast.success("Registration successful");
                navigate("/");
            }
            else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            // navigate to the login page
        } catch (error) {
            console.log("Register..",error)
        }
        


    }


    return <>
        <section>
            <main>
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="justify-content-center align-content-center login ">
                        <h1 className="text-center mb-5">Registration Form</h1>
                            <div>
                                    <label htmlFor="username">Name : </label><br/>
                                    <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="username" 
                                    id="username" 
                                    required 
                                    autoComplete="on" 
                                    defaultValue={user.username} 
                                    onChange={handleInput} />

                                </div>
                                <div>
                                    <label htmlFor="email">Email :</label><br/>
                                    <input type="email" name="email" placeholder="Enter Your email" id="email" required autoComplete="on" defaultValue={user.email} onChange={handleInput}/>
                                </div>
                                <div>
                                    <label htmlFor="Phone">Date of Birth :</label><br/>
                                    <input type="date" name="DateOfBirth"  id="DateOfBirth" required defaultValue={user.DateOfBirth} onChange={handleInput}/>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password : </label><br/>
                                    <input type="password" name="password" placeholder="Password" id="Password" required autoComplete="on" defaultValue={user.password} onChange={handleInput}/>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-submit"> Register Now</button>
                            <div>
                               
                        <div className="mt-2">
                            <span> Already have an account, </span>
                            <Link to="/login">Login Now</Link>
                        </div>
                        </div>
                        </div>
                        </form>
                         </div>
    </main>
    </section>
    </>
}
