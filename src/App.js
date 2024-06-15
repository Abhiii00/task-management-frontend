import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import config from './utils/config'
import Cookies from "js-cookie";
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))

const loginData = (!Cookies.get('Task-Management-Cookies')) ? {} : JSON.parse(Cookies.get('Task-Management-Cookies'));


function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path={`${config.baseUrl}login`} component={Login} />
        
          {loginData && loginData?._id!=null ?
          <Route path={`${config.baseUrl}`} component={Layout} />
          :<Route path={`${config.baseUrl}`} component={Login} />}

          <Redirect exact from="/" to="/login" />
          
        </Switch>
      </Router>
    </>
  )
}

export default App
