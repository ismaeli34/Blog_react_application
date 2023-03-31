import { useEffect } from "react";
import { Fragment } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { Container  } from "reactstrap";

const Home =() =>{




    return (
      <Base>
      <Container className="">
      <NewFeed/>

      </Container>
      </Base>
    )
}


export default Home;