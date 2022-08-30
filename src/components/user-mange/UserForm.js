import React, { forwardRef, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select
const UserForm = forwardRef((props, ref) => {
  const [isDisable, setIsDisable] = useState(false)

  useEffect(() => {
    //只要数组中的值发生改变，就会重新更新一遍
    setIsDisable(props.isUpdateDisable)
  }, [props.isUpdateDisable])
  const { roleId,region } = JSON.parse(localStorage.getItem("token"))  //读取token，并将转译成json  赋值给rolename username
  const roleObj = {
    "1": "superadmin",
    "2": "admin",
    "3": "editor"
  }
  const checkRegionDisable = (item) => {
    if (props.isUpdate) {
      if (roleObj[roleId] === 'superadmin') {
        return false  //禁用为假，不禁用
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === 'superadmin') {
        //如果你是超级管理员就不被禁用
        return false  //禁用为假，不禁用
      } else {
        // 否则 如果你当前的value=region就是false，就可选，分则就不可选
        return item.value!==region   //如果当前这项不等于region的话就被禁用
      }
    }
  }
  const checkRoleDisable = (item) => {
    if (props.isUpdate) {
      if (roleObj[roleId] === 'superadmin') {
        return false  //禁用为假，不禁用
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === 'superadmin') {
        //如果你是超级管理员就不被禁用
        return false  //禁用为假，不禁用
      } else {
        // 否则 如果你当前的value=region就是false，就可选，分则就不可选
        return roleObj[item.id]!=="editor"  //如果当前这项不等于3的话就不被禁用
      }
    }
  }
  return (
    <Form
      ref={ref}
      layout="vertical"

    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input the title of collection!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* 区域 */}
      <Form.Item name="region" label="区域" rules={isDisable ? [] : [
        {
          required: true,
          message: 'Please input the title of collection!',
        },
      ]}
      >
        <Select disabled={isDisable}>
          {
            props.regionList.map(item => {
              return <Option value={item.value} key={item.id} disabled={checkRegionDisable(item)}>{item.title}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: 'Please input the title of collection!', },]}
      >
        <Select placeholder="请选择区域管理员" onChange={(value) => {
          if (value === 1) {
            setIsDisable(true)
            ref.current.setFieldsValue({
              region: ""
            })
          } else {
            setIsDisable(false)
          }
        }}>
          {
            props.roleList.map(item => {
              return <Option value={item.id} key={item.id} disabled={checkRoleDisable(item)}>{item.roleName}</Option>
            })
          }
        </Select>
      </Form.Item>
    </Form>
  )
})
export default UserForm;