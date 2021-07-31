import React, {Component} from 'react'
import {getImageSearch, postImgbb} from '../api.js'
import {Button, Row, Col} from 'reactstrap'

class SearchImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        tags: null,
        url: '',
        error: null
      };
  
      this.onImageChange = this.onImageChange.bind(this);
      this.onUrlChange = this.onUrlChange.bind(this);
      this.onAnalyse = this.onAnalyse.bind(this);
    }
  
    onUrlChange = event => {
      console.log(event.target.value)
      this.setState({url: event.target.value});
      this.setState({
        image: event.target.value
      });
    };

    onImageChange = async(event) => {
      
    
      if (event.target.files && event.target.files[0]) {
        this.setState({
          url: event.target.files[0],
          image: event.target.files[0]
       });

      }
    };

    onAnalyse =async(taglist) => {
        try{
          console.log(this.state.url);
            //get user shopList
            if(this.state.url){
              taglist = await getImageSearch(this.state.url);
            }
            //console.log(taglist);
            this.setState({
                tags: taglist
             });
        }catch(err){
            this.setState({
                error: err
              });
        } 

        // getImgbb function
        // getImgbb(this.state.url);
      };
  
    render() {
      return (
        <div>
          <Row>
            <Col>                          
              <h1>Select Image</h1>
              <br></br>
              <input type="file" name="myImage" onChange={this.onImageChange} />
              
              <h4>OR</h4>
              
              <input type="text" value={this.state.url} name="imageURL" onChange={this.onUrlChange} />
            </Col>
           
          </Row>
        </div>
      );
    }
  }
  export default SearchImage;
  
