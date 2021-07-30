import React, {Component} from 'react'
import {getImageSearch, getImgbb} from '../api.js'
import {Button} from 'reactstrap'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    };

    onImageChange = event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          image: URL.createObjectURL(img)
        });
      }
    };

    onAnalyse =async(taglist) => {
        try{
          console.log(this.state.url);
            //get user shopList
            if(this.state.url){
              taglist = await getImageSearch(this.state.url);
            }else{
              taglist = await getImageSearch(this.state.image.slice(5, this.state.image.length));
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
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={6}>
            <div>
              <img src={this.state.image} width='250'/>
              <h1>Select Image</h1>
              <input type="file" name="myImage" onChange={this.onImageChange} />
              <p>{this.state.image && this.state.image.slice(5,this.state.image.length)}</p>

              <input type="text" value={this.state.url} name="imageURL" onChange={this.onUrlChange} />

              <Button type="button" onClick={this.onAnalyse}>Analyse</Button>
              {this.state.tags && console.log("this is state"+ JSON.parse(this.state.tags).result.tags[0].tag.en)}
            </div>
            </Grid>

            <Grid container item xs={12} sm={6}>
              <Paper className="paper-image">
                <Grid container spacing={2}>
                  <Grid item xs>
                  <Typography noWrap>Most Probably: </Typography>
                    <Typography noWrap>Percentage Probability: 98%</Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Paper className="paper-image">
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Typography noWrap>May be: </Typography>
                    <Typography noWrap>Percentage Probability: 65%</Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Paper className="paper-image">
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Typography noWrap>Can also be: </Typography>
                    <Typography noWrap>Percentage Probability: 32%</Typography>
                  </Grid>
                </Grid>
              </Paper>
              <h5>NOTE: The above values are subject to the examples fed to the model and we don't guarantee 100% accuracy. However, you will be able to find the closest option based on the image entered. The options viewed do not restrict to just ingredients.</h5>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
  export default SearchImage;
  
