import React, { useState } from 'react'
import { Form, FormControl, Button, Container}  from 'react-bootstrap'
import { useHistory} from 'react-router-dom'


export default function SearchByName(){
  const [searchTerm,setSearchTerm] = useState('')
  const history = useHistory();
  const handleChange = (event)=>{
    setSearchTerm(event.target.value)
  }


  const handleClick = () =>{
    history.push({
      pathname: '/recipes',
      state: { mode : 'Recipe', search : searchTerm}});
  }

  const handleKeyDown = (keyEvent) =>{
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

    return(
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{padding:'0 0 0 0'}}
      >
            <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
        <Form onKeyDown={handleKeyDown} inline className="form-center">
          <FormControl type="text" placeholder="Search" value={searchTerm}
           className="mr-sm-2 inp" onChange={handleChange}/>
          <Button type="button" variant="outline-success" onClick={handleClick} >Search</Button>
        </Form>
        </div>
        </Container>

        </>
    )
}