import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/Sandbox/SideMenu'
import TopHeader from '../../components/Sandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'
export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>

      <Switch>
          <Route path='/home' component={Home} />
          <Route path='/user-manage/list' component={UserList} />
          <Route path='/user-manage/role/list' component={RoleList} />
          <Route path='/user-manage/right/list' component={RightList} />
          {/* 添加重定向 如果此时是/则to到home 加上 exact 实现精确匹配 */}
          <Redirect from='/' to='/home' exact />
          <Route path='*' component={NoPermission} />
      </Switch>
    </div>
  )
}
