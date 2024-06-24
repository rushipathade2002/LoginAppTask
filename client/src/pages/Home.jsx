// import {Navbar} from '../components/Navbar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Home = () =>{
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

   

    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/api/auth/delete/${id}`)
        .then(()=>{
            toast.success("User Delete Successfully")
            getAllUsers()
        })

        } catch (err) {
        console.error(err.response.data.message);
        }
        console.log(id);
    };
        const getAllUsers = async ()=>{
         const res = await axios.get("http://localhost:5000/api/auth/users",{
            headers:{
                authorization:authorizationToken
            }
        });
        setUsers(res.data);
        // console.log(res.data);
    } 
    console.log(users);
    
    useEffect(()=>{
        getAllUsers()
        console.log(users);
    },[])

    return (
    <>

        <main>
            <div className="container text-center">
                <div className="row ">
                    <div className="col-md-12 text-center"><h2>Register Users</h2> </div>
                    <div className="col-md-8 justify-content-center align-content-center align-items-center">
                        <table className="table table-hover table-responsive-md table-active">
                            <tr key="heading">
                                <th>SN</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Action</th>
                            </tr>
                            {
                                users && users.map((user, index)=>{
                                    
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.DateOfBirth}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={()=>handleDelete(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>       
        </main>
    
    </>
    );
}