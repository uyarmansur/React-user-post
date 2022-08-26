import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col } from 'reactstrap'

export default function UserPosts() {
    const [userPosts,setUserPosts]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        fetch(`https://dummyjson.com/posts/user/${id}`)
        .then(res=>res.json())
        .then(data=>setUserPosts(data.posts))
         
    },[id])
    
  return (
    <div>
        {userPosts.map((item)=>(
            <Card key={item.id} style={{margin:'5px',textAlign:'center'}}>
                <CardText><h3>Title:</h3>{item.title}</CardText>
                <CardBody><h3>Post:</h3>{item.body}</CardBody>
                <Col xs='.col-6' style={{marginBottom:'5px'}}><Button ><Link to={`/posts/${item.id}`} style={{textDecoration:'none',color:'white'}}>Go Post</Link></Button></Col>
            </Card>
        ))}
        
    </div>
  )
}
