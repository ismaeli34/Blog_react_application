import React, { useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText, 
  } from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';



const CustomNavbar = (args) => {

  let navigate =useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const[login,setLogin]= useState(false)
  const [user,setUser]=useState(undefined)

  useEffect(()=>{
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())

  },[login])


  const logout=()=>{
    doLogout(()=>{

      //logged out

      setLogin(false)
      navigate("/")
    })
  }

  return (
    <div >
     <div>
      <Navbar className='px-5' color="dark" dark expand="md" fixed="">
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

          <NavItem>
              <NavLink tag={ReactLink} to="/">News Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/contact-us">Contact us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>LinkedIn</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>

            {/* when loggedin then show this */}


       
          {
            login && (
              <>


          <NavItem>
              <NavLink tag={ReactLink} to="/user/profile-info"  >
                Profile Info
              </NavLink>
            </NavItem>

              <NavItem>
              <NavLink onClick={logout} >
                Logout
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard " >
                {user.email}
              </NavLink>
            </NavItem> 


            </>
               
            )
          }

            {/* not logged in then show this */}
          {
            !login &&(
              <>
                  <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
              </>
            )

          }

      

          </Nav>
         </Collapse>
      </Navbar>
    </div>

    </div>
  );
};

export default CustomNavbar;
