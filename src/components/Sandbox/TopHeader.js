import React, { useState } from 'react'
import {MenuFoldOutlined,MenuUnfoldOutlined,} from '@ant-design/icons';
import { Layout } from 'antd';
const { Header } = Layout;
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {/* createElement创建组件 根据三目选择创建哪一个组件 */}
          {
            collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>
          }
    </Header>
  )
}
