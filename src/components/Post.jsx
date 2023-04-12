import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {Card, CardBody, CardText,Button } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";


function Post({post={postId:0, title:"This is default post title",content:"this is default post content"},deletePost}) {
    
   const [user,setUser]=useState(null)
   const [login,setLogin]= useState(null)
   useEffect(()=>{
      setUser(getCurrentUserDetail())
      setLogin(isLoggedIn())
   },[])
   return ( 
    

        <Card className="border-0 shadow-sm mt-3 ">
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,130)+"..."}}>
                
            </CardText>
         <div>
            <Link className="btn btn-secondary border-0" to={'/post/'+ post.postId}>Read More</Link>

            {
               isLoggedIn && (user &&  user.id=== post.user.id? <Button onClick={()=> deletePost(post)} color="danger" className="ms-2">Delete</Button>:'')
            }

         
         </div>
        </CardBody>

     

        </Card>
        
        
     );
}

export default Post;