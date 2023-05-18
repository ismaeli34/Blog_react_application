import React, { useEffect, useState } from "react";
import {
  Button,
  CardFooter,
  Card,
  CardBody,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());

    setLogin(isLoggedIn());
  }, []);

  return (
    <Card className="mt-2 border-0 shadow rounded-0">
      <CardBody>
        <h3 className="text-uppercase text-center">User Information</h3>

        <Container className="text-center">
          <img
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            src={
              user.image
                ? user.image
                : "https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar02-512.png"
            }
            alt="default_img"
            className="img-fluid"
          />
        </Container>

        <Table bordered hover responsive size="sm" className="mt-5 text-center">
          <tbody>
            <tr>
              <td>BLOG ID</td>
              <td>{user?.id}</td>
            </tr>

            <tr>
              <td>USER NAME</td>
              <td>{user?.name}</td>
            </tr>

            <tr>
              <td>USER EMAIL</td>
              <td>{user?.email}</td>
            </tr>

            <tr>
              <td>ABOUT</td>
              <td>{user?.about}</td>
            </tr>

            <tr>
              <td>ROLE</td>
              <td>
                {user?.roles.map((role) => {
                  return <div>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>

        {currentUser ? (
          currentUser.id == user.id ? (
            <CardFooter className="text-center">
              <Button color="warning">Update Profile</Button>
            </CardFooter>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
