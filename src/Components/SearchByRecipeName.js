import React, { useState } from 'react'
import { Form, FormControl, Button, Container}  from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search';
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
        <div style={{maxWidth:"400px" , padding:"20px"}}>
          <Form onKeyDown={handleKeyDown} inline className="form-center display-block">
            <FormControl type="text" placeholder="Search" value={searchTerm} className="mr-sm-2 inp display-block" onChange={handleChange}/>
            <Button type="button" onClick={handleClick} className="btn-red"><SearchIcon className="white-icon"/></Button>
          </Form>
        </div>
        </Container>

        </>
    )
} 