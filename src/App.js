
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { createBrowserHistory } from "history";

import DashboardPage from './pages/DashboardPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LeaderBoardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';



const customHistory = createBrowserHistory();



class App extends React.Component {


  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Router history={customHistory}>
        <Switch >
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path='/dashboard' component={DashboardPage}></Route>
          <Route exact path='/leader-board' component={LeaderBoardPage}></Route>
          <Route exact path='/profile' component={ProfilePage}></Route>
          <Route exact path='/signin' component={SignInPage}></Route>
          <Route exact path='/signup' component={SignUpPage}></Route>

        </Switch >
      </Router>
    );
  }
}

export default App;
