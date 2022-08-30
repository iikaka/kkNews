import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import axios from 'axios';
import {
    UserOutlined,
    HomeOutlined,
    SolutionOutlined,
    HighlightOutlined,
    UserSwitchOutlined,
    FormOutlined,
    UnorderedListOutlined,
    FileDoneOutlined,
    DisconnectOutlined,
    FolderOpenOutlined,
    CheckSquareOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons';
import './index.css'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
const { Sider } = Layout

//返回一行侧边栏菜单有数据
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label
    }
}

//设置一个图标的映射数组
const iconList = {
    '/home': < HomeOutlined />,
    "/user-manage/list": < HighlightOutlined />,
    '/right-manage/role/list': < SolutionOutlined />,
    '/right-manage/right/list': < UserOutlined />,
   '/user-manage':<UserSwitchOutlined />,
   '/right-manage':<DisconnectOutlined />,
   "/news-manage":<FolderOpenOutlined />,
    '/news-manage/add':<FormOutlined />,
    '/news-manage/draft':<FileDoneOutlined />,
    '/news-manage/category':<UnorderedListOutlined />,
    "/audit-manage": <CheckSquareOutlined />,//审核管理
  "/publish-manage": <VerticalAlignTopOutlined />,//发布管理
}


function SizeMenu(props) {
    const [menu, setMenu] = useState([])
    useEffect(() => { //请求数据
        axios.get("http://localhost:3000/rights?_embed=children").then(res => {
            setMenu(res.data)
        })
    }, [])
    const {role:{rights}} = JSON.parse(localStorage.getItem("token"))  //读取token，并将转译成json  赋值给rolename username
    const checkPagePermission = (item) => {
        //作用就是通过这个字段来判断是不是又菜单栏这一项
        return item.pagepermisson === 1  && rights.includes(item.key)  //&判断是不是当前登录的权限列表
    }
    //遍历
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return getItem(item.title, item.key, iconList[item.key], renderMenu(item.children))
            }
            return checkPagePermission(item) && getItem(item.title, item.key, iconList[item.key],)
        })
    }

    const selectedKeys = [props.location.pathname]
    const openKeys = ['/' + props.location.pathname.split('/')[1]]
    return (
        <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
            <div style={{ display: "flex", height: "100%", flexDirection: 'column' }}>
                <div className="logo" >全球新闻发布系统</div>
                <div style={{ flex: "1", "overflow": "auto" }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKeys}
                        defaultOpenKeys={openKeys}
                        items={renderMenu(menu)} //菜单栏数据
                        onClick={(item) => {   //给他每天菜单添加点击事件，点击进行路由跳转
                            props.history.push(item.key);}}
                        
                    >
                         
                    </Menu>
            </div>
        </div>
        </Sider >
    )
}
const mapStatetoProps = ({CollapsedReducer:{isCollapsed}}) =>{
    return {
     isCollapsed
   }
 }
export default connect(mapStatetoProps)(withRouter(SizeMenu))
