import React, { useEffect, useState,useRef } from 'react'
import { Button, Table, Switch, Modal } from 'antd'
import axios from 'axios'
import {DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'
const { confirm }=Modal

export default function UserList() {
  const [dataSource,setdataSource]=useState([])
  const [isAddVisible,setisAddVisible]=useState(false)
  const [roleList,setRoleList]=useState([])
  const [regionList,setregionList]=useState([])
  const [isUpdateVisible,setisUpdateVisible]=useState(false)
  const [current,setcurrent]=useState(null)
  const [isUpdateDisabled,setisUpdateDisabled]=useState(false)
  const addForm=useRef(null)
  const updateForm=useRef(null)

  useEffect(()=>{
    axios.get("http://localhost:5000/users?_expand=role").then(res=>{
      const list =res.data
      setdataSource(list)
    })
  })
  useEffect(()=>{
    axios.get("http://localhost:5000/regions").then(res=>{
      const list =res.data
      setregionList(list)
    })
  })
  useEffect(()=>{
    axios.get("http://localhost:5000/roles").then(res=>{
      const list =res.data
      setRoleList(list)
    })
  })
  const columns=[
    {
      title: '区域',
      dataIndex: 'region',
      filters:[
        ...regionList.map(item=>({
          text:item.title,
          value:item.value
        })), 
        {
          text:'全球',
          value:'全球'
        }
      ],
      onFilter:(value,item)=>{
        if(value==='全球'){
          return item.region===''
        }
        return item.region===value
      },
      render:(region)=>{
        return <b>{region===''?'全球':region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:(role)=>{
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState, item)=>{
        return <Switch checked={roleState} disabled={item.default} onChange={()=>handleChange(item)}></Switch>
      }
    },
    {
      title:'操作',
      render:(item)=>{
        return (
          <div>
            <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>{confirmMethod(item)}} disabled={item.default} />
            <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={()=>{haddleUpdate(item)}} disabled={item.default} />
          </div>
        )
      }
    }
  ];

  const haddleUpdate=(item)=>{
    //热更新
    setisUpdateVisible(true)
    setTimeout(()=>{
      if(item.roleId===1){
        //禁用
        setisUpdateDisabled(true)
      }else{
        //取消禁用
        setisUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
    },0)
    setcurrent(item)
  }
  const handleChange = (item) =>{
    // console.log(item)
    item.roleState = !item.roleState
    setdataSource([...dataSource])
    axios.patch(`http://localhost:5000/users/${item.id}`,{roleState:item.roleState})
  }
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
    //当前页面同步状态+后端同步
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)
  }
  const addFormOk=()=>{
    addForm.current.validateFields().then(value=>{
      setisAddVisible(false)
      addForm.current.resetFields()
        //post到后端，生成id，再设置DataSource，方便后面的删除和更新
        axios.post(`http://localhost:5000/users`,{
          ...value,
          "roleState": true,
          'default':false,
        }).then(res=>{
          console.log(res.data);
          setdataSource([...dataSource,{
            ...res.data,
            role:roleList.filter(item=>item.id===value.roleId)[0]
          }])
        })
      }).catch(err=>{
        console.log(err)
      })
  }
  //更新
  const updateFormOk=()=> {
    updateForm.current.validateFields().then(value=>{
      setisUpdateVisible(false)
      setdataSource(dataSource.map(item=>{
        if(item.id===current.id){
          return {
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        } 
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)
      axios.patch(`http://localhost:5000/users/${current.id}`,value)
      console.log(value)
    })
  }
  return (
    <div>
      <Button type='primary' onClick={()=>{setisAddVisible(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id} />
      {/* 表单 */}
      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={()=>{
          setisAddVisible(false)
          setisUpdateVisible(!isUpdateDisabled)
        }}
        onOk={() => addFormOk()}
          // console.log('add',addForm)
      >
      <UserForm regionList={regionList} roleList={roleList} ref={addForm} ></UserForm>
    </Modal>

    <Modal 
      visible={isUpdateVisible}
      title='更新用户'
      onText='更新'
      cancelText='取消'
      onCancel={()=>{
        setisUpdateVisible(false)
      }}
      onOk={()=>updateFormOk()}
    >
      <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled} ></UserForm>
    </Modal>
    </div>
  )
}
 