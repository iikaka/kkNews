import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/Sandbox/SideMenu'
import TopHeader from '../../components/Sandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'
import './NewsSandBox.css'
import { Layout } from 'antd'
const {  Content } = Layout;
export default function NewsSandBox() {
  return (
    <Layout>
      {/* 左侧导航菜单栏 */}
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        {/* 头部标签栏 */}
        <TopHeader></TopHeader>
        {/* 内容 */}
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
              <Route path='/home' component={Home} />
              <Route path='/user-manage/list' component={UserList} />
              <Route path='/right-manage/role/list' component={RoleList} />
              <Route path='/right-manage/right/list' component={RightList} />
              {/* 添加重定向 如果此时是/则to到home 加上 exact 实现精确匹配 */}
              <Redirect from='/' to='/home' exact />
              <Route path='*' component={NoPermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
