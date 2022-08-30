import React from 'react'
import {HashRouter, Route, Routes, Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandsBox from '../views/sandbox/NewsSandsBox'
export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
        <Route path='/login' exact component={Login} />
        </Switch>
    </HashRouter>
  )
}
