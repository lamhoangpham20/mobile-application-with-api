import React from 'react';
import Auth from './Auth';

export default function LoginView(props) {

  function login(event)
  {    
    event.preventDefault();    
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSuccess(result.user);
          props.history.push('/');
        })
      .catch(() => {
        props.loginFail();
      })
    
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
       Please give your username and password to login
      </div>

      <form onSubmit={ login }>
        <div>
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <a href={`http://localhost:4000/auth/google`}><button>Google</button></a>
      <a href={`http://localhost:4000/auth/facebook`}><button>Facebook</button></a>



    </div>
  )
}