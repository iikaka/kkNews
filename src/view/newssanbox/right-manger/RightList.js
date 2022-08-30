import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RightList() {
  const [data, setData] = useState([])
  const { confirm } = Modal
  useEffect(() => {
    axios.get("http://localhost:3000/rights?_embed=children").then(res => {
      console.log('resser', res.data);
      const list = res.data
      //使用forEach来判断childen是否为空
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      })
      list[0].children = list[0].children.length === 0 ? '' : list[0].children
      setData(list)
    })
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
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
      render: (key) => {
        return <Tag color="#f50">{key}</Tag>
      }

    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)}
          />

          {/* 编辑按钮 */}
          <Popover content={<div style={{ textAlign: "center" }}>
            <Switch checked={item.pagepermisson} 
              onChange={()=>switchMethod(item)}
              
            ></Switch>
          </div>} title="页面配置项"
            trigger={item.pagepermisson === undefined ? "" : "click"}>
            <Button type='primary' shape='circle' icon={<SettingOutlined />} style={{ marginLeft: "10px" }}
              disabled={item.pagepermisson===undefined}
            />
          </Popover>
        </div>
      }
    },
  ]
 const  switchMethod = (item) =>{
     //判断如果为1就是开启，否则为关闭
      item.pagepermisson = item.pagepermisson===1?0 : 1;
      console.log(item.pagepermisson);
      setData([...data]) //将数据重新刷新

      if(item.grade===1){
          axios.patch(`http://localhost:3000/rights/${item.id}`,{
            pagepermisson:item.pagepermisson
          })
      }else{
        axios.patch(`http://localhost:3000/children/${item.id}`,{
          pagepermisson:item.pagepermisson
        })
      }
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
    if (item.grade === 1) { //判断 如果grade是1的话就直接删除
      setData(data.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:3000/rights/${item.id}`)
    } else { //如果是二级的话，首先过滤出一级的数据，在从一级的数据中过滤出子元素，然后点击的时候就会删除
      let list = data.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setData([...data])
      axios.delete(`http://localhost:3000/children/${item.id}`)

    }
  }

  return (
    <div>
      <Table columns={columns} dataSource={data}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}
