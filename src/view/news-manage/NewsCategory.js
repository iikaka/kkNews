import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal,  Table,Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RightList() {
  const [data, setData] = useState([])
  const { confirm } = Modal
  useEffect(() => {
    axios.get("/categories").then(res => {
      setData(res.data)
    })
  }, [])
  //是否可编辑
  const handleSave = (record)=>{
    setData(data.map(item=>{
      if(item.id===record.id){
        return {
           id:item.id,
           title:record.title,
           value:record.title
        }
      }
        return item
      
    }))
    axios.patch(`/categories/${record.id}`,{
        title:record.title,
        value:record.title
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave,
      }),
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)}
          />
        </div>
      }
    },
  ]

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
    setData(data.filter(data => data.id !== item.id))
    axios.delete(`/categories/${item.id}`)
  }

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  
    return (
      <div>
        <Table columns={columns} dataSource={data}
          pagination={{
            pageSize: 5
          }}
          rowKey={item => item.id}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
        />
      </div>
    )
  }
