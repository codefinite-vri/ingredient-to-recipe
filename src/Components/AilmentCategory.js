import React,{useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import {getRemedies} from '../api.js';
import {Card, CardDeck}  from 'react-bootstrap'
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import './Ailment.css'

function AilmentCategory() {
    const [uniqueCategories,setUniqueCategories]=useState([])
    const [catgs,setCatgs] = useState([]);

  const fetchCategories=async()=>{
    try{
      const catgs = await getRemedies();
      //code to filter unique elements 
      const uniqueCatgs =  catgs.map(catgs => catgs.ailment_category).filter((value, index, self) => self.indexOf(value) === index)
      setUniqueCategories(uniqueCatgs)
      setCatgs(catgs);
    }catch(error){
      console.log(error);
    }  
  }
  
  useEffect(() => {
    fetchCategories();
  },[]);

  return (
        <div>
          <CardDeck className="card-deck" style={{paddingTop:'2rem'}}>
            { 
              uniqueCategories.map(c => 
                <Card className="text-center" style={{height: '8rem',borderRadius:"6rem"}}>
                  <Card.Body>
                    <LocalPharmacyIcon style={{ fontSize: 60, color: '#C90F03' }}/>
                    <Card.Title> 
                      <ul class="list-bul-no">
                    <Link class="noLink"
                    to={{ pathname: `/home-remedies/${c}`,
                          state: catgs}}>
                      <li class= 'navD' key={c}>{c}</li></Link>
                      </ul>
                    </Card.Title>
                  </Card.Body>
                </Card>
              )
            }
          </CardDeck>
        </div>
  );
}

export default AilmentCategory;