import React, { useEffect, useState, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NewsEditor from '../../components/news-manage/NewsEditor';
const { Step } = Steps;
const { Option } = Select
export default function NewsUpdate(props) {
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [formInfo, setFormInfo] = useState({}) //存储的时对象信息
    const [content, setContent] = useState("") //存储的时content信息
    const NewsForm = useRef(null)
    // const [newsInfo, setnewsinfo] = useState(null)
    //获取token的值
    // const User = JSON.parse(localStorage.getItem("token"))
    //下一步
    const handleNext = () => {
        //更新状态
        if (current === 0) {//判断是第一步的时候，首先进行表单校验，通过表单校验后，才能放行

            //如果成功了走。then
            NewsForm.current.validateFields().then(res => {
                setFormInfo(res)  //收集res信息
                setCurrent(current + 1)
            }).catch(error => {
                console.log("error", error);
            })
        } else {
            //如果内容为空的话，就会弹出一个提示框，不为空就跳
            //或者为p标签时，要先去掉两端空格
            if (content === "" || content.trim() === "<p></p>") {
                message.error("新闻内容不能为空")
            } else {
                setCurrent(current + 1)
            }
        }

    }
    //上一步
    const handlePerv = () => {
        setCurrent(current - 1)
    }
    const layout = {
        labelCol: { sapn: 8 },
        wrapperCol: { span: 16 }
    }
    //获取下拉菜单中的数据
    useEffect(() => {
        axios.get("/categories").then(res => {
            setCategoryList(res.data);
        })
    }, [])

    //每个用户的详细信息
    useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then(res => {
               // setnewsinfo(res.data)  //数据请求成功后，将数据存储

               //需要将content显示初始值
               //需要将category显示初始值
               let {title,categoryId,content} = res.data
               NewsForm.current.setFieldsValue({
                  title,categoryId,
                 
               })
               setContent(content)
            })
    }, [props.match.params.id])
    //保存到草稿箱中，发送post请求
    const handdleSave = (auditState) => {
        axios.patch(`/news/${props.match.params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
        }).then(res => {
            props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                    `您可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您的新闻`,
                placement: "bottomRight",
            });
        })
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.history.goBack()}
                title="更新新闻"
            />
            <Steps current={current} >
                <Step title="基本信息" description="新闻标题,新闻标题" />
                <Step title="新闻内容" description="新闻主题内容" />
                <Step title="新闻提交" description="保存草稿或者提交内容" />
            </Steps>
            <div style={{ marginTop: "50px" }}>
                <div className={current === 0 ? "" : style.active}>
                    <Form
                        {...layout}
                        name="basic"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select>
                                {
                                    //遍历菜单栏中的数据
                                    categoryList.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </div>


                <div className={current === 1 ? "" : style.active}>

                    <NewsEditor getContent={(value) => {
                        //content收集子传父的信息
                        setContent(value)
                    }} content={content}></NewsEditor>
                </div>


                <div className={current === 2 ? "" : style.active}></div>


                <div style={{ marginTop: "50px" }}>
                    {
                        //当current>0的时候不能有上一步
                        current > 0 && <Button onClick={handlePerv}>上一步</Button>
                    }
                    {
                        //只有下标小于2的时候才会显示下一步 *
                        current < 2 && <Button type='primary' style={{ marginLeft: "10px" }} onClick={handleNext}>下一步</Button>
                    }
                    {
                        //如果===2，就会显示保存到草稿箱
                        current === 2 && <span>
                            <Button type='primary' style={{ marginLeft: "10px" }} onClick={() => handdleSave(0)}>保存到草稿箱</Button>
                            <Button danger style={{ marginLeft: "10px" }} onClick={() => handdleSave(1)}>提交审核</Button>
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}
