// isLoggedIn => if token is their in localstorage then log in

export const isLoggedIn = ()=>{
 let data= localStorage.getItem("data")

 if(data==null){
    return false;
 }else{
    return true;
 }
}


// doLogin => we give token and we set the token in localstorage

export const doLogin = (data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}



//doLogout = remove data from localstorage

export const doLogout = (next)=>{
    localStorage.removeItem("data");
    next()
}

//getCurrentUser 

export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
       return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return undefined;
    }
}

export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null
    }

}