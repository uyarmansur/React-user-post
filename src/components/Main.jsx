import React from "react";
import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Badge, Row, Col, Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

export default function Main() {
  const [users, setUsers] = useState([]);
  const handleDelete = () => {
    fetch("https://dummyjson.com/users/1", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log());
  };
  useEffect(() => {
    let url = "https://dummyjson.com/users";
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Row>
        
        {users?.users?.map((user) => (
        <Col sm={{ size: 'auto', offset: 1 }}>
          <ListGroup style={{textAlign:'center'}}>
            <ListGroupItem style={{width:'200px',margin:'5px'}}>
              <Card>
                <CardImg top width='50%' src={user.image}></CardImg>
              </Card>
              <Badge color='primary'><Link to={`/userposts/${user.id}`} style={{textDecoration:'none',margin:'5px',color:'white'}} key={user.id}>
                {user.firstName}
              </Link></Badge>
              <Badge
                color="danger"
                style={{ marginLeft: "15px",cursor:'pointer' }}
                onClick={handleDelete}
              >
                X
              </Badge>
            </ListGroupItem>
          </ListGroup>
        </Col>
      ))}
        
      </Row>
    </div>
  );
}

