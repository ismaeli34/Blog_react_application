import { useParams } from "react-router-dom";
import { Container,Row,Col,Card,CardBody,CardText,Input,Button } from "reactstrap";
import Base from "../components/Base";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createComment, loadPost } from "../services/post-service";
import { BASE_URL } from "../services/Helper";
import { isLoggedIn } from "../auth";

const PostPage =()=>{
    const {postId}=useParams()
    const [post,setPost]=useState(null)
    const [comment,setComment]=useState({
        content:''
    })

    useEffect(()=>{
        //load post of postId
        loadPost(postId).then(data=>{
            setPost(data)
        }).catch(error=>{
            console.log(error);
            toast.error("Error in loading post")
        })
    })
    const printDate =(numbers)=>{

        return new Date(numbers).toLocaleDateString()
    }

    const submitPost = ()=>{
        if(!isLoggedIn()){
            toast.error("Need to login first");
            return;
        }

        if(comment.content.trim()===''){
            return
        }

        createComment(comment,post.postId)
        .then(data=>{
            console.log(data);
            toast.success("comment added");
            setPost({
                ...post,
                comments:post.comments.push(data)
            })
        }).catch(error=>{
            console.log(error); 
        })
    }


    return(
        <Base>
                <Container className="mt-4">
                    <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>)} 
                    <Row>

                            <Col md={{size:12}}>
                                <Card className="mt-3 ps-2 border-0 shadow">
                                    {
                                        (post) && (
                                            <CardBody>
                                            <CardText>Posted By <b>{post?.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                            <CardText>
                                                <span className="text-muted">Category: {post.category.categoryTitle}</span>
                                            </CardText>

                                            <div className="divider" 
                                            style={{width:'100%',height:'1px',background:'#e2e2e2'}}></div>
                                            
                                            
                                            <CardText className="mt-3">
                                            <h3> {post.title} </h3>
                                        </CardText>

                                        <div className="image-container mt-4 shadow " style={{width:'50%'}}>
                                            <img className="img-fluid" src={BASE_URL+'/post/image/'+post.imageName} alt="" />
                                        </div>

                                        <CardText className="mt-4" dangerouslySetInnerHTML={{__html:post.content}}>
                                            
                                        </CardText>
                                        
                                        </CardBody>
                                        )
                                    }


                                    

                                  
                                </Card>



                            
                            </Col>
                        </Row>


                        <Row className="mt-4">

                            <Col md={
                                {
                                    size:9,
                                    offset:1
                                }
                            
                            }>

                                <h3>Comments ({post ? post.comments.length : 0})</h3>

                                {
                                    post && post?.comments.map((c,index)=>(

                                        <Card key={index} className="mt-2 border-0">
                                            <CardBody>
                                                <CardText>
                                                {c.content}

                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    ))
                                }


                                <Card className="mt-4 border-0">
                                    <CardBody>
                                        <Input 
                                        value={comment.comment}
                                        onChange={(event)=>setComment({content:event.target.value})}
                                        type="textarea" placeholder="Enter your comments"></Input>

                                        <Button onClick={submitPost} color="primary" className="mt-2">Submit</Button>
                                    </CardBody>

                                </Card>

                            </Col>


               

                   

                        
                        </Row>
                    </Container>

        </Base>
        
    )
}


export default PostPage;