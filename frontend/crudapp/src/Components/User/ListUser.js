import { useEffect } from "react";
import UserService from "../../Services/UserService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const ListUser =()=>{

     const dispatch = useDispatch();
     const navigate = useNavigate();

      const getUserData=()=>{
        UserService.getUser().then((res)=>{
                // console.log(res.data);
                dispatch({type:"users", value: res.data})
            }); 
      };
    
    const {users} = useSelector((state)=>state);
    console.log(users)
    
      
    useEffect(()=>{
        // UserService.getUser().then((res)=>{
        //     // console.log(res.data);
        //     dispatch({type:"users", value: res.data})
        // });
        getUserData();
    },[]);

    const deleteUserHandler= (id)=>{
       console.log(id);
       UserService.deleteUser(id).then((res)=>{
           getUserData()
           navigate("/list");
       });
    };



    return (
        <div className="container">
            <table className="table table-striped">
             <thead>
                 <tr>
                     <th>FullName</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Actions</th>
                 </tr>
             </thead>
             <tbody>
                 {users.map((user)=>(
                    <tr key={user._id}>
                     <td>{user.fullname}</td>
                     <td>{user.email}</td>
                     <td>{user.phone}</td>
                     <td>
                         <Link to={`/edit/${user._id}`} className="btn btn-warning m-1">
                             Edit
                         </Link>
                         <button type="button" onClick={()=>deleteUserHandler(user._id)} className="btn btn-danger m-1">
                             Delete
                         </button>
                     </td>
                 </tr>

                 ))}
                 
             </tbody>
            </table>
        </div>
    );
};
export default ListUser;