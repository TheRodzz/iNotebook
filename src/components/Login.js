import React, { useContext, useState } from 'react';
import '../Login.css'
import { Link, useHistory } from 'react-router-dom'
import { AlertContext } from '../context/AlertContext';

const Login = () => {
    const { showAlert, hideAlert } = useContext(AlertContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password })
        });
        const json = await response.json();
        // console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            showAlert("Logged in successfully", "success");
            setTimeout(() => {
                hideAlert();
            }, 1500);
        }
        else {
            showAlert("Invalid credentials", "danger");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card login-card">
                        <h2 className="card-header">Login</h2>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
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
                                <button type="submit" className="btn btn-primary my-2">
                                    Login
                                </button>
                            </form>
                            <p className='my-2'>Don't have an account? Click here to <Link to='signup'>sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
