import React, { useState,useEffect } from 'react'
import {Table} from 'antd'
import axios from 'axios'
export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const columns=[]
  useEffect(()=>{
    axios.get('http://localhost:5000/roles').then(res=>{
      console.log(res.data)
    })
  },[])
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  )
}
