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
      
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.slice(23, reader.result.length));
        reader.onerror = error => reject(error);
      });
      
      if (event.target.files && event.target.files[0]) {
        let img = await toBase64(event.target.files[0])
        let imgLink = await postImgbb(img);
        console.log(imgLink.imgurl);
        this.setState({
          url: imgLink.imgurl,
          image: imgLink.imgurl
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
            {this.state.url != ''?
              <Col>
                <img src={this.state.image} height="200" weight="200"/>
                <br></br>
                <Button type="button" onClick={this.onAnalyse}>Analyse</Button>
                {this.state.tags?
                  <>
                    <br></br> 
                    <ol>
                    <lh>Top 3 contendors!!</lh>
                    <li>{JSON.parse(this.state.tags).result.tags[0].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[0].confidence.toFixed(2) +"%"}</li>
                    <li>{JSON.parse(this.state.tags).result.tags[1].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[1].confidence.toFixed(2) +"%"}</li>
                    <li>{JSON.parse(this.state.tags).result.tags[2].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[2].confidence.toFixed(2) +"%"}</li>
                    </ol>
                  </>
                :
                  <></>
                }
              </Col>
            :
              <></>  
            } 
          </Row>
        </div>
      );
    }
  }
  export default SearchImage;
  
