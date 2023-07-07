import React, { useState } from 'react';
import '../Signup.css'; // Import custom CSS file
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    e.preventDefault();

    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName: username, password: password, name: name})
    });
    const json = await response.json();
    // console.log(json)
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        history.push("/");
    }
    else{
        alert("Invalid credentials")
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card signup-card">
            <h2 className="card-header">Sign Up</h2>
            <div className="card-body">
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    required
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    required
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    required
                    minLength={5}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
