import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Example() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    return () => {
      toast.error('🦄 Wow firstly you must login!');
    };
  }, []);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
  };
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
        // expiresInMins: 60, // optional
      }),

    });

    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    if(localStorage.getItem('token')!==null){
      navigate('/')
      window.location.reload()

    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">
          Email
        </Label>
        <Input
          type="text"
          name="text"
          id="exampleName"
          placeholder="Your User"
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="don't tell!"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button onClick={fetchData}>Submit</Button>
    </Form>
  );
}
