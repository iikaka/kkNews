import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
export default function Detail(props) {
    const [newsInfo, setnewsinfo] = useState(null)
    useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then(res => {
                setnewsinfo({
                    ...res.data,
                    view: res.data.view + 1 //每次刷新之后访问量就会+1

                })  //数据请求成功后，将数据存储

                //每次加完1，就要同步到后端
                return res.data
            }).then(res=>{ //真正实现了同步到了后端，每次刷新就会+1
                axios.patch(`/news/${props.match.params.id}`,{
                    view: res.view + 1
                })
            })
    }, [props.match.params.id])

    const handleStatr = ()=>{ //每次点击完点赞量就会+1
        setnewsinfo({  //每次点击的时候，调用handleStatr这个函数，然后...展开setInfo 重新赋值
            ...newsInfo,
            star: newsInfo.star + 1 //每次刷新之后访问量就会+1
        })  
        axios.patch(`/news/${props.match.params.id}`,{
            star:newsInfo.star + 1 //同步到后端，每次更新后都会加载当前的值
        })
    }
    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={<div>
                            {newsInfo.category.title}
                            <HeartTwoTone twoToneColor="#eb2f96" onClick={()=>handleStatr()}/>
                        </div>
                        }

                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">
                                {
                                    //如果有发布时间直接输出 否则就是-
                                    newsInfo.publishTime ? moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                        </Descriptions>



                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="访问数量"><span style={{color:"#090"}}>{newsInfo.view}</span></Descriptions.Item>
                            <Descriptions.Item label="点赞数量"><span style={{color:"#090"}}>{newsInfo.star}</span></Descriptions.Item>
                            <Descriptions.Item label="评论数量">0</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <div dangerouslySetInnerHTML={{
                        __html: newsInfo.content
                    }} style={{
                        margin: "0px 24px",
                        borderTop: "1px solid gray",
                        borderBottom: "1px solid gray"
                    }}>

                    </div>
                </div>
            }
        </div>
    )
}
