import React from 'react'
import {HashRouter,Redirect,Route, Switch} from 'react-router-dom'
import Login from '../view/login/Login'
import Detail from '../view/news/Detail'
import News from '../view/news/News'
import NewsSanbox from '../view/newssanbox/NewsSanbox'
export default function indexRouter() {
  return (
    <HashRouter>
        <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/news' exact component={News} />
        <Route path='/detail/:id' exact component={Detail} />
        {/* <Route path='/' component={NewsSanbox}/> */}
        <Route path='/' render={()=>
            localStorage.getItem('token')?
            <NewsSanbox></NewsSanbox>:
            <Redirect to='/login'/>
        }/>
        </Switch>
    </HashRouter>
  )
}
