import axios from "axios";
import {store} from './../redux/store'

axios.defaults.baseURL='http://localhost:3000'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    //显示loading
     store.dispatch({
        type:"change_loading",
        payload:true
     })
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    //隐藏loading
     //payload ajax返回的数据
    store.dispatch({
        type:"change_loading",
        payload:false
     })
    return response;
  }, function (error) {
    //payload ajax返回的数据
    store.dispatch({
        type:"change_loading",
        payload:false
     })
    //隐藏loading
    return Promise.reject(error);
  });