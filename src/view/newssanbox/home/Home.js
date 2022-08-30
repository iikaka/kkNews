import React, { useEffect, useState, useRef } from 'react'
import { Card, Col, Row, Avatar, List, Drawer } from 'antd';
import { PieChartOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as Echarts from 'echarts'
import _ from 'lodash'
const { Meta } = Card;

export default function Home() {
  const [viewList, setviewList] = useState([])
  const [startList, setstartList] = useState([])
  const [allList, setallList] = useState([]) //管理数据
  const [visible, setVisible] = useState(false) //设置状态,改变抽屉的状态
  const [pieChrt, setpieChrt] = useState(null) //管理饼状图的状态
  const barRef = useRef() //柱状图
  const pieRef = useRef() //饼状图
  //用户浏览最多
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=8`).then(res => {
      console.log("ressssssss11111111111", res.data);
      setviewList(res.data)
    })
  }, [])

  //点赞数量最多
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=8`).then(res => {
      setstartList(res.data)
    })
  }, [])

  //柱状图信息
  useEffect(() => {
    //请求数据
    axios.get('/news?publishState=2&_expand=category').then(res => {

      renderbar(_.groupBy(res.data, item => item.category.title))//使用lodash中的groupBy方法 把回来的数据以item.category.title进行分组
      setallList(res.data)  //将数据保存下来
    })
    return () => {
      window.onresize = null
    }
  }, [])

  const renderbar = (obj) => { //柱状图
    //基于准备好的dom，来初始化的数据
    var myChart = Echarts.init(barRef.current);//barRef.current为真正的dom节点

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj), //传输过来的是obj，使用Object方法对key组成的数组
        axisLabel: {
          rotate: "60", //刻度标签旋转的角度，在类目轴上的类目标签显示不下的情况下可以旋转放置标签重叠，从-90度转为90度
          interval: 0
        }
      },
      yAxis: {
        //  minInterval:1  //y轴上的最小间隔？
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.onresize = () => {
      myChart.resize() //让柱状图随着页面的宽度自动缩放
    }
  }


  //饼状图
  const renderpie = (obj) => { //饼状图
    //数据处理工作
    var currentList = allList.filter(item => item.author === username) //将数据过滤出来
    var groupObj = _.groupBy(currentList, item => item.category.title) //使用lodash中的groupBy方法 把回来的数据以item.category.title进行分组
    var list = [];
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i]?.length //没有同步可选链 使用 for in 循环来遍历数据
      })
    }
    var myChart
    if (!pieChrt) { //如果为假的情况下，才回去init
      myChart = Echarts.init(pieRef.current);
      setpieChrt(myChart)
    } else {
      myChart = pieChrt //下次进入的时候直接piechart
    }
    var option;

    option = {
      title: {
        text: '个人信息图示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

  //获取用户信息
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最长浏览" bordered={true} >
            <List
              size='small'
              dataSource={viewList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size='small'
              dataSource={startList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="1.jpg"
              />
            }
            actions={[
              <PieChartOutlined key="setting" onClick={() => {
                setVisible(true)
                setTimeout(() => {  //因为init初始化是异步执行的，所有要把它放在setTimeout里面

                  renderpie() //init初始化
                }, 0)
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div >
                  <b>{region ? region : "全球"}</b>
                  <span style={{ marginLeft: "10px" }}> {roleName}</span>
                </div>
              }
            />
          </Card>


        </Col>
      </Row>
      {/* 抽屉 */}
      <Drawer
        title="个人新闻分类"
        placement="right"
        closable={true}
        onClose={() => { setVisible(false) }}
        visible={visible} width={500}>
        {/* 饼状图 */}
        <div ref={pieRef} style={{
          width: '100%',
          height: "400px",
          marginTop: "30px"
        }}></div>

      </Drawer>

      <div ref={barRef} style={{
        width: '100%',
        height: "400px",
        marginTop: "30px"
      }}></div>
    </div>
  )
}
