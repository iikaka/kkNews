import React from 'react'
import { Layout, Dropdown, Menu, Avatar, Space,Image } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const { Header } = Layout;

function TopHeader(props) {
  console.log(props);
  // const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    //setCollapsed(!collapsed) 
    props.changeCollapsed()
  }

const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))  //读取token，并将转译成json  赋值给rolename username
  
const menu = (
    <Menu>
      <Menu.Item >
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem('token')
        props.history.replace('/login')
      }}>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}
    >
      {
        props.isCollapsed? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }

      <div style={{ float: "right" }}>
        <span style={{ marginRight: "10px" }}>欢迎 <span style={{color:"#1890ff"}}> {username}</span> 回来</span>
        <Dropdown overlay={menu}>
          <Space>
            <Avatar src={
              <Image 
              src="https://joeschmoe.io/api/v1/random"
              style={{
                width: 32,
              }}
              />
            }  />
          </Space>
        </Dropdown>
      </div>
    </Header>

  )
}
/*
  connect(
    mapStatetoProps
    mapStateDispath
  )(被包装的组件)
*/

const mapStatetoProps = ({CollapsedReducer:{isCollapsed}}) =>{
   return {
    isCollapsed
  }
}
const mapDispatchToProps ={
   changeCollapsed(){
    return {
      type:"change_collapsed"
    }
   }
}
export default connect(mapStatetoProps,mapDispatchToProps)(withRouter(TopHeader))