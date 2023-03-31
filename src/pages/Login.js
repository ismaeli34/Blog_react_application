import Base from "../components/Base";
import {
  CardHeader,
  Form,
  Container,
  Card,
  CardBody,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate()

const [loginDetail,setLoginDetail]=useState({
  username:'',
  password:''
})

const handleChange=(event,field)=>{
  let actualValue=event.target.value
  setLoginDetail({...loginDetail,[field]:actualValue})
}

const handleFormSubmit = (event)=>{
  event.preventDefault(); //prevent the form from submitting
  console.log(loginDetail);
  if(loginDetail.username.trim() == '' || loginDetail.password.trim() =='' ){
    toast.error("username and password is required")
    return;
  }

  //  submit the data to server to generate token

  loginUser(loginDetail).then((data)=>{
    console.log(data)

    //save data to local storage
    doLogin(data,()=>{
      console.log("login details is saved to local storage")
      //redirect to user dashboard page.

      navigate("/user/dashboard");
       
      

    })

    toast.success("Login success")
  }).catch(error =>{
    console.log(error)
    if(error.response.status==400 || error.response.status ==404){
      toast.error(error.response.data.message)
    } else{
      toast.error("Something went wrong on server !!")
    }
  })
  
}


const handleReset =() =>{
  setLoginDetail({
    username:'',
    password:''
  })
}



  return (
    <Base>

    <Container>

    
    <Row className="mt-4">

      <Col sm={{size:6,offset:3}}>

        <Card color="dark" inverse>
        <CardHeader>

          <h3>Login here !!</h3>
        </CardHeader>


        <CardBody>

      <Form onSubmit={handleFormSubmit}>
      {/* Email field */}


      <FormGroup>
      <Label for="email">Enter Email
      </Label>

      <Input onChange={(e)=>handleChange(e,'username')} value={loginDetail.username} type="email" id="email"></Input>

      </FormGroup>

      <FormGroup>
      <Label for="password">Enter password
      </Label>

      <Input onChange={(e)=>handleChange(e,'password')} value={loginDetail.password} type="password" id="password"></Input>
      </FormGroup>


      <Container className="text-center">

      <Button color="light" outline>Login !!</Button>
      <Button onClick={handleReset} outline color="secondary" className="ms-2">Reset</Button>


      </Container>

      </Form>

        </CardBody>

        </Card>
      
      </Col>



    </Row>

    </Container>
     
    </Base>
  );
};

export default Login;
