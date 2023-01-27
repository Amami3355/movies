// import React, { useState } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyle.css';
import axios from 'axios';



const LoginForm = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();


  function handleUserNameChange(e) {
    setusername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // function connectToServer() {
  //   fetch('http://localhost:8086/api/test/user')
  //     .then(response => { console.log(response) })
  //     .catch(error => { console.log("error") })
  // }

  const handleSubmit = (event) => {
    event.preventDefault();




    axios.post('/api/auth/signin', {
      username: username, password: password
    }, {
      withCredentials: true
    }).then(function (response) {
      return response;
    }).then(data => {
      console.log(data);
      localStorage.setItem('cookie', data.data.cookie);
      console.log(data.data.cookie)
      navigate('/');

    })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>
      <form className='login-form'
        method="post">
        <div className="form-group">
          <label for="username">User name</label>
          <input type="text"
            id="username" name="username"
            onChange={handleUserNameChange}
            placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password"
            id="password" name="password"
            onChange={handlePasswordChange}
            placeholder="Password" required />
        </div>
        <input type="submit" onClick={handleSubmit} value="Sign In" />
        <a href="/signup" className="sign-in-link">Create an account</a>
      </form>


      {alert === 'success' &&
        <div className="login-form alert alert-success mt-3" role="alert">
          A simple success alert—check it out!
        </div>
      }
      {alert === 'failed' &&
        <div className="login-form alert alert-danger mt-3" role="alert">
          A simple success alert—check it out!
        </div>
      }

    </>
  );
}

export default LoginForm;
