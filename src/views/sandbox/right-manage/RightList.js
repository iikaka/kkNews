import React, { useEffect, useState } from 'react'
import { Table,Tag,Button,Modal,Popover,Switch } from 'antd'
import {DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import axios from 'axios'
const {confirm} =Modal
export default function RightList() {
  const [dataSource,setdataSource]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
      const list=res.data
      list.forEach(item=>{
        if(item.children.length===0){
          item.children=''
        }
      })
      setdataSource(list)
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color='orange'>{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button danger  shape="circle" icon={<DeleteOutlined />} onClick={()=>{confirmMethod(item)}} />
          <Popover content={
            <div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
            </div>} 
            title='页面配置项' 
            trigger={
              item.pagepermisson===undefined?'':'click'
            }
          >
          <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
          </Popover>
        </div>
      }
    },
  ];
  const switchMethod = (item) =>{
    item.pagepermisson=item.pagepermisson===1?0:1
    setdataSource([...dataSource])
    if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }
  const confirmMethod=(item)=>{
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  //删除
  const deleteMethod=(item)=>{
    console.log(item)
    //当前页面同步状态+后端同步
    if(item.grade===1){
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      axios.delete(`http://localhost:5000/rights/${item.id}`)
    }else{
      console.log(item.rightId)
      let list =dataSource.filter(data=>data.id===item.rightId)//找到要删除的数据 一级数据
      list[0].children=list[0].children.filter(data=>data.id!==item.id) //要删除的二级数据 如果相同就删除
      console.log(list)
      setdataSource([...dataSource])
    }
  }

  return (
    <div>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{pageSize:5}} 
      />
    </div>
  )
}
