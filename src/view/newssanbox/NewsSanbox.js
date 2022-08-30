import React, { useEffect } from 'react'
import SizeMenu from '../../components/sanbox/SizeMenu'
import TopHeader from '../../components/sanbox/TopHeader'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//css
import './NewsSanbox.css'
//antd
import { Layout } from 'antd'
import NewsRouter from '../../components/sanbox/NewsRouter'
const { Content } = Layout
export default function NewsSanbox() {
  NProgress.start()
  useEffect(()=>{//当路由发生改变，匹配到外层路由时就会触发
     NProgress.done() //数据加载完成进度条消失
  })
  return (
    <Layout >
      <SizeMenu></SizeMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>


        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:"auto"
          }}
        >
         <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  )
}
