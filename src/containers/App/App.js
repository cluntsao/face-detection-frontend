import React, { Component } from 'react';
import './App.css';
import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';

// const serverPort = "http://localhost:3001";

const server = "https://arcane-lake-33610.herokuapp.com";


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'SignIn',
      user: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceArr = data['outputs'][0]['data']['regions'];
    // console.log(clarifaiFaceArr);


    const image = document.getElementById("inputImage");
    // console.log(image);

    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(`The height of pic is ${height} and the width is ${width}`);

    // Return an array of objects
    const locationArr =  clarifaiFaceArr.map(item => {
        let bbox = item['region_info']['bounding_box'];
        return {
          id: item.id,
          leftCol: bbox.left_col * width,
          topRow: bbox.top_row * height,
          rightCol: width - (bbox.right_col * width),
          bottomRow: height - (bbox.bottom_row * height)
        }
    })
    this.setState({box: locationArr});
  }

  displayFaceBox = (box) => {
    this.setState({box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input}, this.runModel);
  }

  runModel = () => {
      fetch(server + "/imageurl", {
        method: "post",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
          imageUrl: this.state.imageUrl
      })})
      .then(response => response.json())
      .then(response => {
        fetch(server + "/image", {
          method: "put",
          headers: {'Content-Type': "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState({
            user: Object.assign(this.state.user, {entries: count})
          })
        })


        this.calculateFaceLocation(response);
      })
      .catch(err => console.log(err))
  }

  routeChange = (route) => {
    switch (route) {
      case "Home":
        this.setState({route});
      break;

      case "SignIn":
        this.setState({
          route,
          input: '',
          imageUrl: '',
          user: {}
        });
      break;

      case "Register":
        this.setState({
          route
        })
      break;
      default:

    }

  }

  updateUserInfo = (obj) => {
    this.setState({
      user: Object.assign(this.state.user, obj)
    })
  }

  render() {
    const { imageUrl } = this.state;

    switch (this.state.route) {
      case 'Home':
        return (
          <div className="App">
            <Navigation onClick={this.routeChange} navContent={"Sign Out"}/>
            {(imageUrl) 
            ? <FaceRecognition box={this.state.box} picUrl={imageUrl}/> 
            : <Logo />}
            <ImageLinkForm 
              entries={this.state.user.entries} 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}
            />
          </div>
        )

      case "Register":
          return (
            <div className="App">
              <Navigation onClick={this.routeChange} navContent={"Sign In"}/>
              <Register onClick={this.routeChange}/>
            </div>
          )

      case "SignIn":
        return (
            <div className="App">
              <Navigation onClick={this.routeChange} navContent={"Sign Up"}/>
              <SignIn onClick={this.routeChange} updateUserInfo={this.updateUserInfo}/>
            </div>
          )
      
      default:

    }
  }
}

export default App;
