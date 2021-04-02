import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Footer from './components/views/Footer/Footer'
import NavBar from './components/views/NavBar/NavBar'
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
       
        <NavBar/>
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage,null)}/>
          <Route exact path="/login" component = {Auth(LoginPage,false)}/>
          <Route exact path="/register" component = {Auth(RegisterPage,false)}/>
        </Switch>
      </div>
      <Footer/>
    </Router>

  );
}


export default App;
