import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
  Container,
  Label,
  Input,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  ListGroupItem,
  List,
  ListGroup,
} from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Cards() {
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const [edittedPost, setEdit] = useState();
  const [modalComment,setModalComment]=useState(false)
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    let url = `https://dummyjson.com/posts/${id}`;
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setEdit(data);
    };
    fetchData();
  }, [id]);
  const handleTitleChange = (event) => {
    const title = event.target.value;
    setEdit(title);
  };
  const handleEditClick = () => {
    fetch(`https://dummyjson.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: { edittedPost },
      }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/");
      } else {
        alert("Hata oluştu!");
      }
    });
  };

  const toggle = () => {
    setModal(!modal);

  };
  const toggleComment = () => {
    setModalComment(!modalComment);

  };
  useEffect(() => {
    let token = localStorage.getItem("token");

    const fetchData = () => {
      fetch(`https://dummyjson.com/posts/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => response.json())
        .then((data) => setPosts(data));
    };
    fetchData();
    const fetchComments = () => {
      fetch(`https://dummyjson.com/posts/${id}/comments`)
        .then((res) => res.json())
        .then((data) => setComments(data?.comments));
    };
    fetchComments();
  }, [id]);
  const handleCommentChange = (event) => {
    const addComment = event.target.value;
    setNewComment(addComment);
  };

  const handleClick = () => {
    fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: newComment,
        postId: 3,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setComments([...comments, data]));
    console.log(newComment);
    console.log(comments);
    setNewComment("");
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <Container style={{ display: "flex", alignItems: "center" }}>
              <h3>Title:</h3>
              <h4>{posts?.title}</h4>
            </Container>
          </CardTitle>
          <CardSubtitle style={{ alignItems: "center", display: "flex" }}>
            <h4>Topic:</h4>
            {posts?.tags.join()}
          </CardSubtitle>
          <CardText>
            <Container>{posts?.body}</Container>
          </CardText>
          <h3>Comments:</h3>
          {comments?.map((item) => (
            <Container key={item.id}>
              <List>
                <ListGroup>
                  <h5>Anonymus:</h5>
                  <ListGroupItem>{item.body}</ListGroupItem>
                </ListGroup>
              </List>
            </Container>
          ))}
          <div style={{ display: "flex" }}>
            <Button color="primary" onClick={toggle}>
              Edit Post
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Write Your Title</Label>
                    <Input
                      type="text"
                      placeholder="Write Your Body..."
                      onChange={handleTitleChange}
                      value={edittedPost?.title}
                      style={{ textAlign: "center" }}
                    ></Input>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleEditClick}>
                  Edit
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Button color="primary" onClick={toggleComment}>
              Add Comment
            </Button>
            <Modal isOpen={modalComment} toggle={toggleComment}>
              <ModalHeader toggle={toggleComment}>Modal title</ModalHeader>
              <ModalBody>
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Label>Add Your Comment</Label>
                    <Input
                      type="text"
                      placeholder="Comment..."
                      onChange={handleCommentChange}
                      value={newComment}
                    ></Input>
                  </Form>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleClick} disabled={newComment === ""}>
                  Add
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Button style={{ marginTop: "5px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Go Main Page
              </Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
