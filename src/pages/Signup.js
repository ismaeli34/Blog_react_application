import { useEffect, useState } from "react";
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
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import { toast, ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";






const Signup = () => {

  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    about:''
  })
    const [error,setError]=useState({
      error:{},
      isError:false
    })
    useEffect(()=>{
      console.log(data);
    },[data])


    useEffect(()=>{

    })

    //resetting the form
    const resetData =()=>{
      setData({
        name:'',
        email:'',
        password:'',
        about:''

      })
    }

    const submitForm = (event)=>{
      event.preventDefault();
      if(error.isError){
        toast.error("Form data is invalid, correct all details and then submit");
        setError({...error,isError:false})
        return;
      }

    console.log(data);
      //data validate

      //call server api for sending the data.

      signUp(data).then((response)=>{
        console.log(response);
        console.log("success log");
        toast.success("User is registered sucessfully ! user id ", {
          position: toast.POSITION.TOP_CENTER
        } + response.id);
      }).catch((error)=>{
        console.log(error.response.data)
        console.log("Error log")
        //handle errors in a proper way
        setError({
          errors:error,
          isError:true
        })


      })

    }
 

    // handle change
    const handleChange = (event,property)=>{
      //dynamic setting the values
      setData({...data,[property]:event.target.value}) 
    }


  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {JSON.stringify(data)}
        <Col sm={{size:6,offset:3}} >
        <Card  color="dark"  inverse>
          <CardHeader>
            <h3> Fill Information to register</h3>
          </CardHeader>

          <CardBody>  
            {/* creating form */}

            <Form onSubmit={submitForm}>
              {/* Name field */}
              <FormGroup>
                <Label for="name">Enter Name</Label>
                <Input type="text" 
                
                onChange={(e)=>handleChange(e,'name')}
                value={data.name}
                invalid={error.errors?.response?.data?.name ? true : false}
                placeholder="Enter Here" />


            <FormFeedback>
              {error.errors?.response?.data?.name}
            </FormFeedback>

              </FormGroup>

              <FormGroup>
                <Label for="email">Enter Email</Label>
                <Input
                onChange={(e)=>handleChange(e,'email')}
                value={data.email}
                invalid={error.errors?.response?.data?.email ? true : false}
                 type="email" placeholder="Enter Here" />

                 <FormFeedback>
                  {error.errors?.response?.data?.email}
                 </FormFeedback>
              </FormGroup>

              

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                onChange={(e)=>handleChange(e,'password')}
                value={data.password}
                invalid={error.errors?.response?.data?.password ? true : false}
                type="password" id="password" placeholder="Enter here" />
              <FormFeedback>
                {error.errors?.response?.data?.password}
              </FormFeedback>

              </FormGroup>

              <FormGroup>
                <Label for="about">About me</Label>
                <Input 
                onChange={(e)=>handleChange(e,'about')} 
                value={data.about}
                invalid={error.errors?.response?.data?.about ? true : false}
                 style={{height:"250px"}} id="about" name="text" type="textarea" />
              <FormFeedback>
                {error.errors?.response?.data?.about}
              </FormFeedback>
              </FormGroup>

              <Container className="text-center">
                <Button outline color="light">Register</Button>
                <Button onClick={resetData} outline color="secondary" type="reset" className="ms-2">Reset</Button>

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

export default Signup;
