import React, { useState,useEffect } from 'react'
import {Table,Button, Modal,Tree} from 'antd'
import {DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import axios from 'axios'
const {confirm}=Modal
export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const [rightList,setrightList] = useState([])
  const [currentId,setcurrentId] = useState([])//点击的currentid
  const [currentRights,setcurrentRights] = useState([])
  const [isModalVisible,setisModalVisible]=useState(false)

  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render:(item)=>{
        return (
          <div>
            <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)} />
            <Button type='primary' shape='circle' icon={<EditOutlined />} 
                  onClick={()=>{
                    setisModalVisible(true) 
                    setcurrentRights(item.rights)
                    setcurrentId(item.id)
                  }}
            />
          </div>
        )
      }
    },
  ] 
  useEffect(()=>{
    axios.get('http://localhost:5000/roles').then(res=>{
      setdataSource(res.data)
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
      setrightList(res.data)
    })
  },[])
  const confirmMethod=(item)=>{
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        deleteMethod(item)
      },
      onCancel(){

      }
    })
  }
  const deleteMethod=(item)=>{
    console.log(item)
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/roles/${item.id}`)
  }

  //成功的处理函数
  const handleOk=()=>{
    console.log(currentRights);
    setisModalVisible(false)
    //同步dataSource
    setdataSource(dataSource.map(item=>{
      if(item.id===currentId){
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    //patch
    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })
  } 
  // 失败的处理函数
  const handleCancel=()=>{
    setisModalVisible(false)
  }
  //改变选中不选中
  const onCheck=(checkKeys)=>{
    setcurrentRights(checkKeys.checked)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}>
      </Table>
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />
      </Modal>
    </div>
  )
}
