import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Base from '../components/Base';
import userContext from '../context/userContext';
import { loadPost } from '../services/post-service';
import {Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react";
import { loadAllCategories } from '../services/category-service';
import { useRef } from "react";
import { updatePost } from '../services/post-service';


const UpdateBlog=()=> {
  const editor = useRef(null)
  const [categories,setCategories] = useState([]) 


  const {blogId}=  useParams()
  const object = useContext(userContext);
  const navigate=useNavigate();
  const [post,setPost] =useState(null)

  useEffect(()=>{
    loadAllCategories().then((data)=>{
      console.log(data)
      setCategories(data)
  }).catch(error=>{
      console.log(error);
  })

    //Load the blog from database 
    console.log("BlogId",blogId);
    loadPost(blogId).then(data=>{
        setPost({...data,categoryId:data.category.categoryId})
    })
    .catch(error=>{
        console.log(error);
        toast.error("error in loading the blog"); 
    }) 
  },[])


  useEffect(()=>{
    if(!post){
        if(post?.user?.id != object?.user?.data.id){
            toast.error("this is not your post !!");
            navigate("/")
        }
    }

  },[post])


  const handleChange =(event,fieldName)=>{
    setPost({
      ...post,
      [fieldName]:event.target.value
    })

  }



  const updateBlogPost =(event)=>{
    event.preventDefault();
  console.log(post);


    updatePost({...post,category:{category:post.categoryId}}, post.postId)
    .then(res=>{
      console.log(res)
      toast.success("Post updated")
    })

    .catch(error=>{
      console.log(error) 
      toast.error("Error in Post")
    })

  }

  const updateHtml =()=>{
    return(
      <div className="wrapper">

      <Card className="shadow-sm border border-0 mt-2">
          <CardBody>
              <h3>Update Post ?</h3>

          <Form onSubmit={updateBlogPost}>
          
          <div className="mx-3">
              <Label for="title">Post title</Label>
              <Input name="title" 
              value={[post.title]} 
              className="rounded-0" 
              placeholder="Enter here" 
              onChange={(event)=>handleChange(event,'title')}
              type="text" id="title"></Input>
          </div>

          {/* <div className="mx-3 mt-2">
              <Label for="content">Post Content</Label>
              <Input 
              name="categoryId"
              onChange={fieldChanged}
              
              className="rounded-0" placeholder="Enter here" type="text" id="content"></Input>
          </div> */}

          <div className="mx-3 mt-2">

          <Label for="content">Post Content</Label>
              {/* <Input style={{height:'300px'}} className="rounded-0" placeholder="Enter here" type="textarea" id="content"></Input> */}

          <JoditEditor 
          ref={editor} 
          // value={post.content}

          value={post.content}

          onChange={newContent=>setPost({...post,content:newContent})}
          />
          </div>
          {/* file field */}
          <div className="mt-3">
          <Label for="image">Select Post banner</Label>
              <Input id="image" type="file" onChange={''}   multiple/>
          </div>

          <div className="mx-3 mt-2">

          <Label for="category">Post Category</Label>
              <Input 
              className="rounded-0" 
              placeholder="Enter here" 
              name="categoryId"
              onChange={''}
              value={post.categoryId}
            
              type="select" id="category" >

                  <option disabled value={0}>--Select Category--</option>
              
              {
                  categories.map((category)=>(

                      <option value={category.categoryId } key={category.categoryId}>
                          {category.categoryTitle} 
                      </option>
                  ))
              }

              </Input>
          </div>




          <Container className="text-center mx-3 mt-2">
              <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
              <Button className="rounded-0 ms-2" color="danger">Reset content</Button>

          </Container>

          </Form>
          </CardBody>


      </Card>


  </div>

    )
  }


  return (
    <Base>
    <Container>
    {post && updateHtml()}
    </Container>
    </Base>

  )
}

export default UpdateBlog;
