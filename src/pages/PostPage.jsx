import { useParams } from "react-router-dom";
import { Container,Row,Col,Card,CardBody,CardText } from "reactstrap";
import Base from "../components/Base";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { loadPost } from "../services/post-service";
import { BASE_URL } from "../services/Helper";

const PostPage =()=>{


    const {postId}=useParams()
    const [post,setPost]=useState(null)

    useEffect(()=>{
        //load post of postId
        loadPost(postId).then(data=>{
            console.log(data);
            setPost(data)
        }).catch(error=>{
            console.log(error);
            toast.error("Error in loading post")
        })
    })

    const printDate =(numbers)=>{

        return new Date(numbers).toLocaleDateString()
    }


    return(
        <Base>

                    <Container className="mt-4">
                        <Link to="/">Home</Link>


                        <Row>

                            <Col md={{size:12}}>
                                <Card className="mt-3">
                                    {
                                        (post) && (
                                            <CardBody>
                                            <CardText>Posted By <b>{post?.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                            <CardText>
                                                <span className="text-muted">Category: {post.category.categoryTitle}</span>
                                            </CardText>
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
                    </Container>

        </Base>
        
    )
}


export default PostPage;