import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditUser = () => {

    const {fullname,usermail,userpassword,userphone,usergender,users} = useSelector(state=> state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()

    const autoFillForm = ()=>{
        UserService.searchUser(id).then((res)=>{
            console.log(res.data[0])
             dispatch({type:"fullname",value:res.data[0].fullname})
             dispatch({type:"usermail",value:res.data[0].email})
             dispatch({type:"userpassword",value:res.data[0].passsword})
             dispatch({type:"userphone",value:res.data[0].phone})
             dispatch({type:"usergender",value:res.data[0].gender})
         })
    }

    useEffect(()=>{
       autoFillForm()
    },[])

    const submitHandler = (e) => {
        e.preventDefault();
        
    
        UserService.postUser(
            {
                _id : id,
                fullname:fullname,
                email:usermail,
                gender:usergender,
                phone:userphone,
                password:userpassword,
            }
    
        ).then((res)=>{
            console.log(res);
            if(res.status == 200){
                navigate("/list")
            }
        })
    }

    return (
        <div className="container m-2">
            <h3>Edit user</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="fullname">Fullname</label>
                    <input type="text" 
                        name="fullname"
                        id="fullname" 
                        className="form-control" 
                        placeholder="Edit FullName"
                        value={fullname} 
                        onChange= {(e)=> dispatch({type:"fullname",value:e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        name="email"
                        id="email" 
                        className="form-control" 
                        placeholder="Edit Email" 
                        value={usermail} 
                        onChange= {(e)=> dispatch({type:"usermail",value:e.target.value})}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        name="password"
                        id="password" 
                        className="form-control" 
                        placeholder="Edit Password" 
                        value={userpassword} 
                        onChange= {(e)=> dispatch({type:"userpassword",value:e.target.value})}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone No</label>
                    <input type="text" 
                        name="phone"
                        id="phone" 
                        className="form-control" 
                        placeholder="Edit Phone No"
                        value={userphone} 
                        onChange= {(e)=> dispatch({type:"userphone",value:e.target.value})}
 
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input type="radio" 
                            name="gender"
                            id="gender" 
                            className="form-check-input" 
                            value="Male" 
                            checked= {usergender === 'Male'}
                            onChange = {(e) => dispatch({type:"usergender",value:e.target.value})}
                        />
                        <label htmlFor="gender" className="form-check-lable">Male</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input type="radio" 
                            name="gender"
                            id="gender" 
                            className="form-check-input" 
                            value="Female" 
                            checked= {usergender === 'Female'}
                            onChange = {(e) => dispatch({type:"usergender",value:e.target.value})}
                        />
                        <label htmlFor="gender" className="form-check-lable">Female</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                        <input type="radio" 
                            name="gender"
                            id="gender" 
                            className="form-check-input" 
                            value="Others" 
                            checked= {usergender === 'Others'}
                            onChange = {(e) => dispatch({type:"usergender",value:e.target.value})}
                        />
                        <label htmlFor="gender" className="form-check-lable">Others</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit User" className="btn btn-primary" />
                </div>
            </form>
        </div>
        
        
    )
}

export default EditUser;