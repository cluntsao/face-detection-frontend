import React, { Component } from 'react';

// const server = "http://localhost:3001";
const server = "https://arcane-lake-33610.herokuapp.com"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })

  }

  submitChange = (e) => {
    e.preventDefault();

    const { email, name, password } = this.state;
    fetch(server + "/register", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data === "success") {
        this.props.onClick("SignIn");
      }
    })
    .catch(error => console.log)
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <main className="black-80 shadow-1 pa4 mt6">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
                type="text" 
                name="name" 
                id="name"
                value={name}
                required
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
                type="email" 
                name="email" 
                id="email"
                value={email}
                required
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
                type="password" 
                name="password" 
                id="password"
                value={password}
                required
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <div>
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib dim" 
              type="submit" 
              value="Register" 
              onClick={this.submitChange}
              // onClick={() => this.props.onClick('SignIn')}
            />
          </div>
        </form>
      </main>
    );
  }
}

export default Register;