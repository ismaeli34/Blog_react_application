import React from "react";
import { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

function ProfileInfo() {

    const user =useContext(userContext);

    return ( 
        
        <Base>

        <div>Profile info</div>
        <h1>Welcome {user.name}</h1>
        
        </Base>

        
     );
}

export default ProfileInfo;