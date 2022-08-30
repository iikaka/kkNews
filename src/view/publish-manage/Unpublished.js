import { Button } from 'antd'
import React from 'react'
import {CloudUploadOutlined} from '@ant-design/icons'
import NewsPublish from '../../components/punlish-manger/NewsPublish'
import usePublish from '../../components/punlish-manger/usePublish'
export default function Unpublished() {
  //1====待发布的
   const {dataSource,handlePublish} =usePublish(1)
  return (
    <div>
      <NewsPublish dataSource={dataSource} 
      button={(id)=><Button type='primary' icon={<CloudUploadOutlined />} 
      onClick={()=>handlePublish(id)}
      >发布</Button>}>

      </NewsPublish>
      </div>
  )
}
