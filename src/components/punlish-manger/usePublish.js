import { useEffect, useState } from 'react'
import axios from 'axios'
import {notification} from 'antd'
function usePublish(type) {
    const [dataSource, setdataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            console.log(res.data);
            setdataSource(res.data)
        })
    }, [username, type])

    //发布
    const handlePublish = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {
            "publishState": 2,
            'publishTime':Date.now()
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    '您可以到 【发布管理/已发布】 中查看您的新闻',
                placement: "bottomRight",
            });
        })
    }
    //下线
    const handleSunset = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {
            "publishState":3
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    '您已经删除了已下线的新闻',
                placement: "bottomRight",
            });
        })
    }
    //删除
    const handleDelete = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))
        setdataSource(dataSource.filter(item => item.id !== id))
        axios.delete(`/news/${id}`).then(res => {
            notification.info({
                message: `通知`,
                description:
                    '您可以到 【发布管理/已删除】 中查看您的新闻',
                placement: "bottomRight",
            });
        })
    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}
export default usePublish