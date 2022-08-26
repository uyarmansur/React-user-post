import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  UncontrolledDropdown,
  Button,
} from "reactstrap";

export default function Example() {
  const [post, setPost] = useState();
  const [isOpen, setOpen] = useState(false);
  const [existedToken,setExistedToken]=useState(localStorage.getItem('token'))

  const toggle = () => {
    setOpen((status) => !status);
  };

  const searchPosts = (event) => {
    const post = event.target.value;
    setPost(post);
  };
  const fetchSearchedPost = async () => {
    let url = `https://dummyjson.com/posts/search?q=${post}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setExistedToken(null)
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Main Page</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {existedToken ? (
              <Button onClick={logOut}>Logout</Button>
            ) : (
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink href="/posts/add">Add Post</NavLink>
            </NavItem>
            <NavItem>
              <Input
                type="text"
                placeholder="search..."
                onChange={searchPosts}
              ></Input>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <Button onClick={fetchSearchedPost}>
                <Link to={`/search/${post}`}>Search</Link>
              </Button>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
