import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import { DeleteOutlined, SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../components/user-mange/UserForm'

export default function UserList() {

  const [data, setData] = useState([])
  const [isAddvisible, setIsAddvisible] = useState(false)
  const [isUpdatevisible, setIsUpdatevisible] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  const [isUpdateDisable, setIsUpdateDisable] = useState(false)
  const [current,setCurrent] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const { confirm } = Modal
  const {roleId,region,username} = JSON.parse(localStorage.getItem("token"))  //读取token，并将转译成json  赋值给rolename username
  
  useEffect(() => {
    const roleObj = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
   }
    axios.get("/users?_expand=role").then(res => {
      const list = res.data
      setData(roleObj[roleId]==="superadmin"?list:[
        ...list.filter(item=>item.username===username),
        ...list.filter(item=>item.region===region&&roleObj[roleId]==="editor")
      ])
    })
  }, [username,region,roleId])
  useEffect(() => {
    axios.get("/regions").then(res => {
      const list = res.data
      setregionList(list)
    })
  }, [])
  useEffect(() => {
    axios.get("/roles").then(res => {
      const list = res.data
      setroleList(list)
    })
  }, [])
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters:[
        ...regionList.map(item=>({
          text:item.title,
          value:item.value
        })),
        {
          text:"全球",
          value:"全球"
        }
      ],
      onFilter:(value,item)=>{
        if(value==='全球'){
          return item.region===""
        }
        return item.region===value
      },
      
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
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
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={()=>handdleChange(item)}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)}
            disabled={item.default}
          />
          {/* 更新 */}
          <Button type='primary' shape='circle' icon={<SettingOutlined />} style={{ marginLeft: "10px" }}
            disabled={item.default}
            onClick={()=>handleUpdate(item)}
          />
        </div>
      }
    },
  ]
  //更新
  const handleUpdate =(item)=>{
    //这里加定时的作用就是，能够让表单的数据同步刷新出来
    setIsUpdatevisible(true)
       setTimeout(()=>{
        if(item.roleId===1){
          //禁用
          setIsUpdateDisable(true)
        }else{
          //取消禁用
          setIsUpdateDisable(false)
        }
       //动态设定表单中的值
       updateForm.current.setFieldsValue(item)
       },0)
       setCurrent(item)
  }


  const handdleChange=(item)=>{
         console.log('item',item);
         item.roleState=!item.roleState; //将状态值取反
         setData([...data]) //同步到数据中
         //同步到后台
         axios.patch(`/users/${item.id}`,{
          roleState:item.roleState
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

      }
    })

  }

  //删除操作
  const deleteMethod = (item) => {
    // 当前页面同步状态  改变dataSource
    //如果data.id!==item.id的话就会删除
    setData(data.filter(data=>data.id!==item.id))
    axios.delete(`/users/${item.id}`)

  }
   //完成添加用户
  const addFormOk = () => {
    addForm.current.validateFields().then(value => {
      setIsAddvisible(false)  //模态框消失
      addForm.current.resetFields() //将数据重置                
      //post到后端，生成id，在设置data，方便后面的删除和更新
      axios.post(`/users`, {
        ...value,
        "roleState": true,
        "default": false
      }).then(res => {
  
        setData([...data,{
          ...res.data,
          role:roleList.filter(item=>item.id===value.roleId)[0]
        }]) //模态框消失，最新的数据同步更新
      })
    }).catch(err => {
    })
  }
 //更新用户
 const updateFormOk = () =>{
  updateForm.current.validateFields().then(value => {
      setIsUpdatevisible(false)
      setData(data.map(item=>{
         if(item.id===current.id){
          return {
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
         }
         return item
         
      }))
      setIsUpdateDisable(!isUpdateDisable)
      axios.patch(`/users/${current.id}`,value)
 })

}



  return (

    <div>
      <Button type='primary' onClick={() => {
        setIsAddvisible(true)
      }}>增加用户</Button>
      <Table columns={columns} dataSource={data}
        pagination={{
          pageSize: 5
        }}
        rowKey={(item) => item.id}
      />




      <Modal
        visible={isAddvisible}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setIsAddvisible(false)
        }}
        onOk={() => addFormOk()}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
      </Modal>

      <Modal
        visible={isUpdatevisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdatevisible(false)
          setIsUpdateDisable(!isUpdateDisable)
        }}
        onOk={() => updateFormOk()}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisable={isUpdateDisable} isUpdate={true}></UserForm>
      </Modal>
    </div>


  )
}
