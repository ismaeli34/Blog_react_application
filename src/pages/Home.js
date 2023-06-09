import { useEffect } from "react";
import { Fragment } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { Container  } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import {Row, Col} from "reactstrap";

const Home =() =>{




    return (
      <Base>
      <Container className="mt-3">
      <Row>
        <Col md={2} className="pt-3">
        <CategorySideMenu/>
        </Col>
        <Col md={10}>
      <NewFeed/>
        </Col>
      </Row>

      </Container>
      </Base>
    )
}


export default Home;