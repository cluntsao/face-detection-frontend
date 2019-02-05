import React, { Component } from 'react';
// const server = "http://localhost:3001";
const server = "https://arcane-lake-33610.herokuapp.com"

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
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
    const { email, password } = this.state;
    fetch(server + "/signin", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.msg === "success") {
        this.props.updateUserInfo(res);
        this.props.onClick("Home");
      }
    })
    .catch(error => console.log)  

  }

  render() {
    const { email, password } = this.state;

    return (
      <main className="black-80 shadow-1 pa4 mt6">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 tc" 
                type="email" 
                name="email" 
                id="email"
                value={email} 
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
                onChange={this.handleInputChange}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
          </fieldset>
          <div>
            <button 
              className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib dim"  
              value="Sign in" 
              onClick={this.submitChange}
            > 
            Sign in
            </button>
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db pointer" onClick={() => this.props.onClick('Register')}>Sign up</p>
            <p className="f6 link dim black db pointer">Forgot your password?</p>
          </div>
        </form>
      </main>
    );
  }
  
}

export default SignIn;