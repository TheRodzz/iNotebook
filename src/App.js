import './App.css';
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Signup from './components/Signup';
import { AlertProvider } from './context/AlertContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <NoteState>
          <Router>
            <Navbar />
            <Alert/>
            <h1>iNotebook</h1>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </Router>
        </NoteState>
      </AlertProvider>
    </div >
  );
}

export default App;
