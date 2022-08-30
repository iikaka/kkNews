import React from 'react'
import NewsPublish from '../../components/punlish-manger/NewsPublish'
import usePublish from '../../components/punlish-manger/usePublish'
import { Button } from 'antd'
import { ApiOutlined } from '@ant-design/icons';
export default function Published() {
 //2====以发布的
    const {dataSource,handleSunset} = usePublish(2)
  return (
    <div>
      <NewsPublish dataSource={dataSource} 
      button={(id)=><Button type='primary' icon={<ApiOutlined />} 
       onClick={()=>handleSunset(id)}
      >下线</Button>}>

      </NewsPublish>
    </div>
  )
}
