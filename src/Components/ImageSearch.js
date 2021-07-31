import React, {Component} from 'react'
import {getImageSearch, postImgbb} from '../api.js'
import {Button, Row, Col} from 'reactstrap'
import Alert from '@material-ui/lab/Alert';

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
        <>
        <h2 className="text-center mb-4 border-bottom-red">INGREDIENT RECOGNITION</h2>
        <div>
          <Row>
            <Col className='col-border'>
            <center>
              <h5>Upload Image</h5>
              <input type="file" className="width-fix" name="myImage" onChange={this.onImageChange} />
              <br/><br/>
              <h5>OR</h5>
              <br/>
              <h5>Add Hosted Image URL</h5>
              <input className="size-list" type="text" value={this.state.url} name="imageURL" onChange={this.onUrlChange} />
              {/* <br/><br/>
              <h5 className="size-list">NOTE: The values shown are subject to the examples fed to the model and we don't guarantee 100% accuracy. However, you will be able to find the closest option based on the image entered. The options viewed do not restrict to just ingredients.</h5> */}
              </center>  
            </Col>
            {this.state.url != ''?
            <>
              <Col className='col-border'><center>
              <div id="border-img">
              
                <img src={this.state.image} height="130" weight="130"/></div>
                <br></br>
                <Button type="button" onClick={this.onAnalyse} className='btn-red' >Analyse</Button></center>
                </Col>
                {this.state.tags?
                  <>
                    <Col className='col-border'>
                    <center>
                    <h2>TOP 3 POSSIBILITIES FOR THE INGREDIENT</h2>
                    <br/>
                    <ol className="size-list">                    
                    <Alert variant="filled"  icon={false} style={{marginBottom:'10px', backgroundColor:'#9B1003'}}>
                    <li className="uppercase-text">{JSON.parse(this.state.tags).result.tags[0].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[0].confidence.toFixed(2) +"%"}</li>
                    </Alert>
                    <Alert variant="filled" severity="warning" icon={false} style={{marginBottom:'10px' , backgroundColor:'#B90c0a'}}>
                    <li className="uppercase-text">{JSON.parse(this.state.tags).result.tags[1].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[1].confidence.toFixed(2) +"%"}</li>
                    </Alert>
                    <Alert variant="filled" severity="error" icon={false} style={{marginBottom:'10px', backgroundColor:'#E3242B'}}>
                    <li className="uppercase-text">{JSON.parse(this.state.tags).result.tags[2].tag.en + " with confidence: "+ JSON.parse(this.state.tags).result.tags[2].confidence.toFixed(2) +"%"}</li>
                    </Alert>
                    </ol>
                    </center>
                    </Col> 
                  </>
                :
                  <></>
                }
              </>
            :
              <></>  
            } 
          </Row>
        </div>
        </>
      );
    }
  }
  export default SearchImage;
  
