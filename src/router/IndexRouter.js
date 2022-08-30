import React from 'react'
import {HashRouter, Redirect, Route,Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
export default function IndexRouter() {
  return (
      <HashRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' render={()=>
            localStorage.getItem('token')?
            <NewsSandBox></NewsSandBox>:
            <Redirect to='/login'/>
            //权限鉴定 如果token验证正确,则进入新闻后台系统页面，否则重新进入登录界面
        }/>
        </Switch>
      </HashRouter>
  )
}
