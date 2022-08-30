import React, { useState, useEffect } from 'react'
import { Table, Button, Modal,notification} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined,UploadOutlined,FormOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RightList(props) {
  const [data, setData] = useState([])
  const { confirm } = Modal
  const {username} = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
       const list=res.data
      setData(list)
    })
  }, [username])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      //列表跳转详情  列表点击之后跳转到详情页面,通过id区分
      render:(title,item)=>{
         return <a href={`#/news-manage/preview/${item.id}`}> {title} </a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '分类',
      dataIndex: 'category',
      render:(category)=>{
        return  category.title  //只是为了把对象显示在页面中
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)}
          />

            <Button  shape='circle' icon={<FormOutlined />} style={{ marginLeft: "10px" }}
            onClick={()=>{
              //当点击更新时会跳转到对应的路由上面
               props.history.push(`/news-manage/update/${item.id}`)
            }}
            />

          <Button  type='primary' shape='circle' icon={<UploadOutlined />} style={{ marginLeft: "10px" }}
            onClick={()=>handelCheck(item.id)}
            />
         
        </div>
      }
    },
  ]
 
   //发布
   const handelCheck = (id)=>{
     axios.patch(`/news/${id}`,{
       auditState:1
     }).then(res=>{
      props.history.push('/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                    `您可以到 审核列表 中查看您的新闻`,
                placement: "bottomRight",
            });
     })
   }

  const showConfirm = (item) => {
    confirm({
      title: "你确定要删除这一条数据吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteMethod(item)
      },
      onCancel: () => {
        console.log("oncancel");
      }
    })

  }

  //删除操作
  const deleteMethod = (item) => {
    console.log(item);
    // 当前页面同步状态  改变dataSource
    setData(data.filter(data => data.id !== item.id))
      axios.delete(`/news/${item.id}`)
  }

  return (
    <div>
      <Table columns={columns} dataSource={data}
        pagination={{
          pageSize: 5
        }}
        rowKey={item=>item.id}
      />
    </div>
  )
}
