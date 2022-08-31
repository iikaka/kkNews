import React,{useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {UserOutlined} from '@ant-design/icons';
// import {UploadOutlined,UserOutlined,VideoCameraOutlined,SettingOutlined } from '@ant-design/icons';
import './index.css'
import axios from 'axios';

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
// const menuItem=[
//   {
//     key:'/home',
//     title:'首页',
//     icon:<UserOutlined />
//   },
//   {
//     key:'/user-manage',
//     title:'用户管理',
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:'/user-manage/list',
//         title:'用户列表',
//         icon:<UserOutlined />
//       }
//     ]
//   },
//   {
//     key:'/right-manage',
//     title:'权限管理',
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:'/right-manage/role/list',
//         title:'角色列表',
//         icon:<UserOutlined />
//       },
//       {
//         key:'/right-manage/right/list',
//         title:'权限列表',
//         icon:<UserOutlined />
//       },
//     ]
//   },
// ]

const iconList={
  '/home':<UserOutlined />,
  '/user-manage/list':<UserOutlined />,
  '/right-manage/right/list':<UserOutlined />,
  '/right-manage/role/list':<UserOutlined />
  //……
}

function SideMenu(props) {
  const [menu,setMenu] = useState([])
  //获取数据
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
      console.log(res.data)
      setMenu(res.data)
    })
  },[])

  const checkPagemission=(item)=>{
    return item.pagepermisson === 1 //1有权限 允许访问
  }

//负责输出 item
  const renderMenu=(menulist)=>{
    return menulist.map(item=>{
        if(item.children?.length>0 && checkPagemission(item)){
          return getItem(item.title,item.key,iconList[item.key],renderMenu(item.children))
        }
        return  checkPagemission(item) && getItem(item.title, item.key, iconList[item.key])
      })
  }
  //设置跳转选择的页面
  const selectKeys=[props.location.pathname]
  // 截取需要的路径 用正则截取
  const openKeys=['/'+props.location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      {/* collapsed={true}折叠属性 */}
        <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo">新闻发布系统</div>
            <div style={{flex:1,"overflow":"auto"}}>
              <Menu 
                theme="dark"  
                mode="inline" 
                // defaultSelectedKeys={selectKeys} //唯一 跳转对应路径
                selectedKeys={selectKeys} //唯一 跳转对应路径 
                items={renderMenu(menu)}
                className='aaaaaaa'
                defaultOpenKeys={openKeys}//接收展开的数组 但是只需要的数组是一级目录就行
                onClick={(item)=>{props.history.push(item.key)}}
              >
              </Menu>
            </div>
        </div>
      </Sider>
  )
}
export default withRouter(SideMenu)