import React, { useState } from 'react'
import { MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu,Layout,Avatar } from 'antd';
const { Header } = Layout;
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed =()=>{
    setCollapsed(!collapsed)
  }//折叠组件小图标
  const menu=(
    <Menu items={[
      {
        key: '1',
        label: (
          <a target="_blank" href="#">
            超级管理员
          </a>
        ),
      },
      {
        key: '4',
        danger: true,
        label: '退出',
      }
    ]} />
  )//下拉菜单栏
  return (
    <Header className="site-layout-background" style={{ padding:'0 16px'}}>
      {/* createElement创建组件 根据三目选择创建哪一个组件 */}
          {
            collapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
          }
          <div style={{float:"right"}}>
            <span>欢迎admin回来</span>
            <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
    </Header>
  )
}
