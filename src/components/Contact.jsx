import React,{useState} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'


export default function Contact() {
    const [title,setTitle]=useState()
    const handleTitleChange=(event)=>{
        const title=event.target.value 
        setTitle(title)
    }
    

    const handleSubmit=(event)=>{
        event.preventDefault()
    }
    const handleClick= async ()=>{
        fetch('https://dummyjson.com/posts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: title,
    userId: 5,
    /* other post data */
  })
})
.then(res => res.json())
.then(console.log);
    }
    return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>
                    Write Your Title
            </Label>
            <Input type='text' placeholder='Write Your Title...' onChange={handleTitleChange}>

            </Input>
            
        </FormGroup>
        <Button onClick={handleClick}>Enter Your Post</Button>
      </Form>
    </div>
  )
}
