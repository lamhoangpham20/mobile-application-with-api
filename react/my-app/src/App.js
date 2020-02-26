import React from 'react';
import logo from './logo.svg';
import Users from './components/Users';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import LoginView from './components/LoginView';
import AddProducts from './components/AddProducts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null
    }
  }
  componentDidMount = () => {
    fetch("http://localhost:4000/auth/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          isAuthenticated: true,
          user: responseJson.user,
        });
        console.log()
      })
      .catch(error => {
        this.setState({
          isAuthenticated: false,
          error: "Failed to authenticate user"
        });
      });
    const jwt = localStorage.getItem('cool-jwt');
        if (!jwt) {
          console.log('jwt')
        }
    
        axios.get('http://localhost:4000/jwt/jwtProtectedResource', { headers: { Authorization: `Bearer ${jwt}` } }).then(res => this.setState({
          user: res.data.user
        })).catch(err => {
          localStorage.removeItem('cool-jwt');
          console.log('delete jwt')
        });
      }
  onLogin = (users) => {
    this.setState({ isAuthenticated: true })
    this.setState({user : users})
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  };
  onLogout= ()=>
  {
    this.setState({ isAuthenticated: false });
    this.setState({ user: null});
    localStorage.removeItem('cool-jwt');
  }
  render() 
  {
    return (
      <Router>
        <Route path="/" exact render={routeProps => <Users user={this.state.user} {...routeProps} logout={this.onLogout} />} />
        <Route path="/login" exact render={routeProps => <LoginView user={this.state.user}
                                                                    loginSuccess={this.onLogin} loginFail={this.onLoginFail}
                                                                    redirectPathOnSuccess="/example" {...routeProps} />} />
        <Route path="/addproducts" exact render={routeProps => <AddProducts user={this.state.user} {...routeProps} />} />
      </Router>
    );
  }
}

export default App;
