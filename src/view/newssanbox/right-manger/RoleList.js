import React, { useEffect, useState } from 'react'
import { Button, Table, Modal,Tree } from 'antd'
import { DeleteOutlined, BarsOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function RoleList() {
  const [data, setData] = useState([]) //当前列表
  const [rightList,setRightList] =useState([])  //控件显示
  const [currentRights,setCurrentRights] =useState([])
  const [currentId,setCurrentId] =useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { confirm } = Modal
  useEffect(() => {
    axios.get('http://localhost:3000/roles').then(res => {
      console.log("aaaa", res.data)
      setData(res.data)
    })
  }, [])
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: "角色名称",
      dataIndex: "roleName"
    },
    {
      title: "操作",
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />}
            onClick={() => showComfire(item)}
          />
          <Button type='primary' shape='circle'
            icon={<BarsOutlined />}
            style={{ marginLeft: "10px" }}
            onClick={() =>{
              setIsModalVisible(true)
              setCurrentRights(item.rights)  //拿到当前的值
              setCurrentId(item.id)    //同步item.id
            }}
          ></Button>
        </div>
      }
    },
  ]
 //删除数据
  const showComfire = (item) => {
    confirm({
      title: "你确定要删除此数据吗？",
      onOk: () => {
        deleteMethod(item)
      },
      onCancel: () => {
        console.log("oncancel");
      }
    })
  }
  const deleteMethod = (item) => {
    setData(data.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:3000/roles/${item.id}`)
  }


  
   useEffect(()=>{
      axios.get('http://localhost:3000/rights?_embed=children').then(res=>{
        setRightList(res.data);
      })
   },[])
  //成功提示框
  const handleOk = () => {
    setIsModalVisible(false)
     //同步data
     setData(data.map(item=>{
       if(item.id===currentId){
        return {
          ...item,
          rights:currentRights
        }
       }
       return item
     }))
    //patch到后端
    axios.patch(`http://localhost:3000/roles/${currentId}`,{
      rights:currentRights
    })
  }
  //失败提示框 
  const handleCancel = () => {
    setIsModalVisible(false)
  }
 const onCheck = (checkedKeys) =>{
    setCurrentRights(checkedKeys.checked)
 }
  return (
    <div>
      <Table columns={columns} dataSource={data}
        rowKey={(item) => item.id}
      />
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
      checkable
      treeData={rightList}
      onCheck={onCheck}
      checkStrictly={true}
      checkedKeys={currentRights}
    />
      </Modal>
    </div>
  )
}
