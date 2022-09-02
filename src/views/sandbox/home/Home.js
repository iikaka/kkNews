import React from 'react'
import { Button } from 'antd'
// import axios from 'axios'
export default function Home() {

  const ajax=()=>{
    // // 取数据
    // axios.get('http://localhost:8000/posts').then(res=>{
    //   console.log(res.data)
    // })

    // // 增数据
    // axios.post('http://localhost:8000/posts',{
    //   title:'123',
    //   author:'kawa'
    // })

    //更新数据 put
    // axios.put('http://localhost:8000/posts/1',{
    //   title:'1-修改'
    // })

    // //更新数据 patch
    // axios.patch('http://localhost:8000/posts/1',{
    //   title:'11-修改-11'
    // })

    // 删除数据 delete
    // axios.delete('http://localhost:8000/posts/1')

    // _embed 固定的 向下关联的数据 
    // axios.get('http://localhost:8000/posts?_embed=comments').then(res=>{
    //   console.log(res.data)
    // })

    // _expand 固定的 向上查询的数据
    // axios.get('http://localhost:8000/comments?_expand=post').then(res=>{
    //   console.log(res.data)
    // })
  }
  return (
    <div>
      <Button type='primary' onClick={ajax}>Button</Button>
    </div>
  )
}
