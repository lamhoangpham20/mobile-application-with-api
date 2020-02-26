import axios from 'axios';


let userInfo = {
  username: null,
  password: null
}

let myAuth = {
    authenticate: (username, password) => {      
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/jwt/loginForJWT', 
          {
              auth: {
              username: username,
              password: password
            }
          })
          .then(result => {
            userInfo = {
              username: username,
              password: password
            }   
            localStorage.setItem('cool-jwt', result.data.token);
            axios.get('http://localhost:4000/jwt/jwtProtectedResource',{
                headers: { Authorization: `Bearer ${localStorage.getItem('cool-jwt')}` }
            }).then(res=>{resolve(res.data);})
        })
          .catch(error => {
              console.log(error);
              reject();
            }
          )
      });
    },
    getAxiosAuth: () => {
      return {
        auth: userInfo
      }
    } 
}
export default myAuth;
