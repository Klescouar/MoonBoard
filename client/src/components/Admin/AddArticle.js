import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UploadImage from './UlploadImage';

class AddArticle extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { title: '', image: '', link: '' };
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getFileName = fileName => {
    console.log(fileName);
    this.setState({
      image: fileName
    });
  };

  submit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="AddArticle">
        <h1>Ajouter un article</h1>
        <div className="AddArticle__Form">
          <div className="AddArticle__Form__Title">
            <TextField
              id="standard-name"
              label="Title de l'article"
              className="AddArticle__Form__Title__Input"
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="normal"
            />
          </div>
          <div className="AddArticle__Form__UploadImage">
            <UploadImage getFileName={this.getFileName} />
          </div>
          <TextField
            id="standard-name"
            label="Lien Soundcloud"
            className="AddArticle__Form__Input"
            value={this.state.link}
            onChange={this.handleChange('link')}
            margin="normal"
          />
          <Button
            onClick={this.submit}
            variant="outlined"
            className="AddArticle__Form__Submit"
          >
            Envoyer
          </Button>
        </div>
      </div>
    );
  }
}

export default AddArticle;
