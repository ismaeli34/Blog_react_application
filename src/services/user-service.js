import { myAxios } from "./Helper"; 

export const signUp = (user)=>{

    return myAxios
    .post("/register",user)
    .then((response)=>response.data);

};


export const loginUser = (loginDetail)=>{

    return myAxios
    .post('/auth/login',loginDetail).then((response)=>response.data)
}

export const getUser=(userId)=>{
    return myAxios.get(`/users/${userId}`).then(res=>res.data);
}
