import axios from 'axios'
const USER_BASE_URL = 'http://localhost:3000/user';
const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token"),
};

class UserService{
    loginUser(credentials){
        return axios.post(USER_BASE_URL+"/login", credentials);

        // fetch(
        //     'url',{
        //         method:'POST',
        //         headers:{

        //         },
        //         body:{}
        //     }
        // )
    }

    getUser(){
        console.log(headers)
        return axios.get(USER_BASE_URL,{headers:headers})
    }

    postUser(users){
        console.log(headers);
        return axios.post(USER_BASE_URL, users, {headers:headers})
    }

    deleteUser(id){
        console.log(headers);
        return axios.delete(USER_BASE_URL+"/"+id, {headers:headers})
    }
}

export default new UserService();