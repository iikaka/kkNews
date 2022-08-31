import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {UploadOutlined,UserOutlined,VideoCameraOutlined,SettingOutlined } from '@ant-design/icons';
import './index.css'

const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
//模拟数组结构
const menuItem=[
  {
    key:'/home',
    title:'首页',
    icon:<UserOutlined />
  },
  {
    key:'/user-manage',
    title:'用户管理',
    icon:<UserOutlined />,
    children:[
      {
        key:'/user-manage/list',
        title:'用户列表',
        icon:<UserOutlined />
      }
    ]
  },
  {
    key:'/right-manage',
    title:'权限管理',
    icon:<UserOutlined />,
    children:[
      {
        key:'/right-manage/role/list',
        title:'角色列表',
        icon:<UserOutlined />
      },
      {
        key:'/right-manage/right/list',
        title:'权限列表',
        icon:<UserOutlined />
      },
    ]
  },
]
function SideMenu(props) {
//负责输出 item
  const renderMenu=(menulist)=>{
    return menulist.map(item=>{
        if(item.children){
          return getItem(item.title,item.key,item.icon,renderMenu(item.children))
        }
        return  getItem(item.title, item.key, item.icon,)
      })
  }
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      {/* collapsed={true}折叠属性 */}
        <div className="logo">新闻发布系统</div>
          <Menu 
            theme="dark"  
            mode="inline" 
            defaultSelectedKeys={['1']}  
            items={renderMenu(menuItem)}
            onClick={(item)=>{props.history.push(item.key)}}
          >
          </Menu>
      </Sider>
  )
}
export default withRouter(SideMenu)