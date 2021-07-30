import React,{useRef, useState, useEffect} from 'react';
import { Form, Card, Button, Alert, Container} from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext'
import {Row, Col} from 'react-bootstrap'
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {getShopList, addShopList, delShopList} from '../api.js'

export default function ShoppingList() {
    const itemRef = useRef();
    const [error, setError] = useState("");
    const [shopList, setShopList] = useState({Items: [],
                                             _id: NaN,
                                             userID: "User Not Logged In"});
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const fetchShopList=async()=>{
        try{
            //get user shopList
            var shopList = await getShopList(currentUser.email);
            setShopList(shopList);
        }catch(error){
            setError(error);
        }  
      }
      
      useEffect(() => {
        fetchShopList();
      },[]);

    async function addItem(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            //shoplist update
            var shopList = await addShopList(currentUser.email,itemRef.current.value);
            itemRef.current.value='';
            //console.log(shopList);
            if(shopList._id){
                setShopList(shopList);
            }else{
                setError(shopList.userID);
            }
            setLoading(false);
        }catch(error){
            itemRef.current.value='';
            setError(error);
        }
    }

    async function delItem(item){
        try{
            setError('');
            setLoading(true);
            //shoplist update
            var shopList = await delShopList(currentUser.email,item);
            setShopList(shopList);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    return (
        <div>
           <>
           <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
                >
                     <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Shopping List</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={addItem} className="form-centered">
                    <Form.Group id="addItem">
                        <Form.Label>Add Item</Form.Label>
                        <Form.Control type="text" ref={itemRef} required placeholder="Item Name"/>
                    </Form.Group>             

                    <Button disabled={loading} className=" btn-red btn-margin" type="submit">
                        <AddCircleIcon/>
                    </Button>
                </Form>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body className="text-center">
            <Col>
            {shopList.Items.length>0 ? shopList.Items.map(item=>
                <Row>
                    <Col>{item}</Col>
                    <Col><Button variant="light" onClick={()=>delItem(item)} disabled={loading}><ClearIcon /></Button></Col>
                </Row>
                )
                :
                "Your Shopping List is Empty."
            } 
            </Col>
            
            </Card.Body>
        </Card>
        </div>
        </Container>
        </>
        </div>
    )
}