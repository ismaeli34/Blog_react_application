import React, { useEffect,useState } from "react";
import {Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import {getCurrentUserDetail}from "../auth/index" 
import { toast } from "react-toastify";


const AddPost =()=>{

    const editor = useRef(null)
   const[content,setContent]  =useState('')

    const [categories,setCategories] = useState([]) 

    const [user,setUser] = useState(undefined);

    const [post, setPost] =useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [image,setImage]=useState(null);

    const config = {
        placeholder:"Start Typing.."
    }

 

    useEffect(()=>{

        setUser(getCurrentUserDetail())

        loadAllCategories().then((data)=>{
            console.log(data)
            setCategories(data)
        }).catch(error=>{
            console.log(error);
        })

    },[])


    const fieldChanged =(event)=>{
        // console.log(event.target.value) 
        setPost({...post,[event.target.name]:event.target.value})
    }


    const contentFieldChange =(data)=>{
        setPost({...post,'content':data})
    }

    //create post
    const createPost=(event)=>{
        event.preventDefault();
        // console.log(post);
        if(post.title.trim()===''){
            alert("post is required")
            return;
        }

        if(post.content.trim()===''){
            alert("post content is required");
            return;
        }

        if(post.categoryId===''){
            alert("select some category !!")
            return;
        }

        //submit the form on server
        post['userId']=user.id
        doCreatePost(post).then(data=>{


            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image uploaded")
            })
            toast.success("Post created");
        setPost({
                title:'',
                content:'',
                categoryId: ''
            })
    
        }).catch((error)=>{

            toast.error("Error in uploading image")
            console.log(error);
        })

   



    }


    const handleFileChange = (event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0]);
    }


    return (
        <div className="wrapper">

            <Card className="shadow-sm border border-0 mt-2">
                <CardBody>
                    <h3>What is going on in your mind ?</h3>
                </CardBody>

                <Form onSubmit={createPost}>
                
                <div className="mx-3">
                    <Label for="title">Post title</Label>
                    <Input name="title" onChange={fieldChanged} className="rounded-0" placeholder="Enter here" type="text" id="title"></Input>
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
                value={post.content}
                onChange={contentFieldChange}
                />
                </div>

                {/* file field */}

                <div className="mt-3">
                <Label for="image">Select Post banner</Label>
                    <Input id="image" type="file" onChange={handleFileChange}   multiple/>
                </div>

                <div className="mx-3 mt-2">

                <Label for="category">Post Category</Label>
                    <Input 
                    className="rounded-0" 
                    placeholder="Enter here" 
                    name="categoryId"
                    onChange={fieldChanged}
                    defaultValue={0}
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
                    <Button type="submit" className="rounded-0" color="primary">Create a Post</Button>
                    <Button className="rounded-0 ms-2" color="danger">Reset content</Button>

                </Container>

                </Form>

                {content}
            </Card>

        {/* <h1>This is add post component </h1>
        <p>We are going to develop add article form here.</p> */}

        </div>
    )
}


export default AddPost