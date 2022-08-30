import React, { useState } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined,UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Dropdown,Menu,Space,Avatar } from 'antd';
import  {withRouter} from 'react-router-dom'
const { Header } = Layout

 function TopHeader(props) {
  const [collapsed, setCollApsed] = useState(false)
  const changeCollapsed = () => {
    setCollApsed(!collapsed)
  }

  //下拉菜单
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              超级管理员
            </a>
          ),
        },
        {
          key: '2',
          danger: true,
          onClick:()=>handelclick(),
          label: (
            <a target="_blank" rel="noopener noreferrer" >
             退出
            </a>
          ),
          icon: <SettingOutlined />,
          disabled: true,
        },
        
      ]}
    />
  );
  const handelclick =()=>{
    console.log("aaa");
  }
  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}
    >
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }

      <div style={{ float: "right" }}>
        <span style={{ marginRight:"10px"}}>欢迎小段回来</span>
        <Dropdown overlay={menu}>
          <a  >
            <Space>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
export default withRouter(TopHeader)
