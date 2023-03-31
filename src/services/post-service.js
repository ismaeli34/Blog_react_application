import { privateAxios } from "./Helper"
import { myAxios } from "./Helper";

//create post function
export const createPost =(postData)=>{

    // console.log(postData);

return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=> response.data);

}


// get all posts
export const loadAllPosts=(pageNumber,pageSize)=>{

    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>response.data)
}

//load single post of given id

export const loadPost =(postId)=>{
    return myAxios.get("posts/"+postId).then((response)=>response.data);
}