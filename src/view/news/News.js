import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import _ from 'lodash'
export default function News() {
    const [list,setlist] = useState([])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            console.log('数据', Object.entries(_.groupBy(res.data,item=>item.category.title)));
            setlist(Object.entries(_.groupBy(res.data,item=>item.category.title))) //使用object.entries包装后成为二维数组


        })
    }, [])
    return (
        <div style={{
            width: "95%",
            margin: "0px auto"
        }}>
            <PageHeader
                className="site-page-header"
                title="全球大新闻"
                subTitle="查看新闻"
            />
            {/* //card表格 */}
            <div className="site-card-wrapper">
                <Row gutter={[16, 16]}>
                   {
                    //使用map方法去遍历里面的数据，根据返回数据的key值，来决定渲染多少个表格
                    //item这里是当作key值
                       list.map(item=>
                        <Col span={8} key={item[0]}> 
                        <Card title={item[0]} bordered={true} hoverable={true} >
                            <List
                                size="large"
                                //item[1] 通过list还会继续遍历，里面的data是最终的数据
                                dataSource={item[1]}
                                pagination={{
                                    pageSize: 2
                                }}
                                renderItem={(data) => <List.Item><a href={`#/detail/${data.id}`}>{data.title}</a></List.Item>}
                            />
                        </Card>
                    </Col>
                       )
                   }
                </Row>
            </div>
        </div>
    )
}
