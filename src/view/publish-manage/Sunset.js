import React from 'react'
import NewsPublish from '../../components/punlish-manger/NewsPublish'
import usePublish from '../../components/punlish-manger/usePublish'
import { Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';
export default function Sunset() {
 //3====以下线的
    const {dataSource,handleDelete} = usePublish(3)
  return (
    <div>
      <NewsPublish dataSource={dataSource}
       button={(id)=><Button danger icon={<CloseCircleOutlined />} onClick={()=>handleDelete(id)}>删除</Button>}>

       </NewsPublish>
    </div>
  )
}
