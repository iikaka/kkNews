import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin} from 'antd'
import axios from 'axios'
import Home from './../../view/newssanbox/home/Home'
import Notmatch from './../../view/newssanbox/notmatch/Notmatch'
import RightList from './../../view/newssanbox/right-manger/RightList'
import RoleList from './../../view/newssanbox/right-manger/RoleList'
import UserList from './../../view/newssanbox/userlist/UserList'
import NewsAdd from '../../view/news-manage/NewsAdd'
import NewsDraft from '../../view/news-manage/NewsDraft'
import NewsCategory from '../../view/news-manage/NewsCategory'
import Audit from '../../view/audit-manage/Audit'
import AuditList from '../../view/audit-manage/AuditList'
import Unpublished from '../../view/publish-manage/Unpublished'
import Published from '../../view/publish-manage/Published'
import Sunset from '../../view/publish-manage/Sunset'
import NewsPreview from '../../view/news-manage/NewsPreview'
import NewsUpdate from '../../view/news-manage/NewsUpdate'
import { connect } from 'react-redux'
const LocalRouterMap = {
  "/home": Home,
  '/user-manage/list': UserList,
  '/right-manage/role/list': RoleList,
  '/right-manage/right/list': RightList,
  '/news-manage/add': NewsAdd,
  '/news-manage/draft': NewsDraft,
  '/news-manage/category': NewsCategory,
  '/audit-manage/audit': Audit,
  '/audit-manage/list': AuditList,
  '/publish-manage/unpublished': Unpublished,
  '/publish-manage/published': Published,
  '/publish-manage/sunset': Sunset,
  '/news-manage/preview/:id':NewsPreview,
  '/news-manage/update/:id':NewsUpdate
}

 function NewsRouter(props) {
  const [BackRouterList, setBackRouterList] = useState([])
  useEffect(() => {
    //发送多个请求，使用promise.all方法
    Promise.all([
      axios.get("http://localhost:3000/rights"),
      axios.get("http://localhost:3000/children"),
    ]).then(res => {
      // console.log("res",res);
      //res[0]是返回的promise对象
      setBackRouterList([...res[0].data, ...res[1].data]);
      console.log('BackRouterList', [...res[0].data, ...res[1].data]);
    })

  }, [])

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    //后台返回的item是后台数据，如果匹配路径 并且是开启就return返回，否则就不返回，如果路由关掉就会进不来
    return LocalRouterMap[item.key] &&( item.pagepermisson || item.routepermisson)
  }

  const checkPagePermission = (item) => {
    return rights.includes(item.key) //修改完权限后需重新登录
  }
  return (
    <Spin size="large" indicator={<LoadingOutlined />} spinning={props.isLoading} >
    <Switch>
      {
        BackRouterList.map(item => {
          
            if (checkRoute(item) && checkPagePermission(item)) {
              return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
            }
            return null
          
        })
      }
      <Redirect from='/' to='/home' exact />
      {
        BackRouterList.length > 0 && <Route path='*' component={Notmatch} />
      }
    </Switch>
    </Spin>
  )
}
const mapStateToProps = ({LoadingReducer:{isLoading}})=>({
   isLoading
})
export default connect(mapStateToProps)(NewsRouter)
