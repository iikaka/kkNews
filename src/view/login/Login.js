import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import './Login.css';
import axios from 'axios';
import Particles from 'react-particles-js/umd/particles';
export default function Login(props) {
  const onFinish = (value) =>{
    console.log(value);
     axios.get(`http://localhost:3000/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role`)
     .then(res=>{
      console.log(res.data);
      if(res.data.length===0){//如果查询的长度为0，就说明里面没有数据
          message.error("用户名或密码不匹配")
      }else{
        localStorage.setItem("token",JSON.stringify(res.data[0])) //保存token字段，对json进行格式化处理
        props.history.push("/")//进行路由跳转，写"/"是因为要重定向到home页面
      }
     })
}
  return (
    <div style={{ background: 'rgb(35,39,65)', height: "100%",overflow:'hidden' }}>
        <Particles height={document.documentElement} 
            params={
              {
                "background": {
                  "color": {
                    "value": "#323031"
                  },
                  "position": "50% 50%",
                  "repeat": "no-repeat",
                  "size": "cover"
                },
                "fullScreen": {
                  "zIndex": 1
                },
                "interactivity": {
                  "events": {
                    "onClick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "onHover": {
                      "enable": true,
                      "mode": "bubble",
                      "parallax": {
                        "force": 60
                      }
                    }
                  },
                  "modes": {
                    "attract": {
                      "distance": 200,
                      "duration": 0.4,
                      "easing": "ease-out-quad",
                      "factor": 1,
                      "maxSpeed": 50,
                      "speed": 1
                    },
                    "bounce": {
                      "distance": 200
                    },
                    "bubble": {
                      "distance": 400,
                      "duration": 2,
                      "mix": false,
                      "opacity": 1,
                      "size": 40,
                      "divs": {
                        "distance": 200,
                        "duration": 0.4,
                        "mix": false,
                        "selectors": []
                      }
                    },
                    "connect": {
                      "distance": 80,
                      "links": {
                        "opacity": 0.5
                      },
                      "radius": 60
                    },
                    "grab": {
                      "distance": 400,
                      "links": {
                        "blink": false,
                        "consent": false,
                        "opacity": 1
                      }
                    },
                    "push": {
                      "default": true,
                      "groups": [],
                      "quantity": 4
                    },
                    "remove": {
                      "quantity": 2
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4,
                      "factor": 100,
                      "speed": 1,
                      "maxSpeed": 50,
                      "easing": "ease-out-quad",
                      "divs": {
                        "distance": 200,
                        "duration": 0.4,
                        "factor": 100,
                        "speed": 1,
                        "maxSpeed": 50,
                        "easing": "ease-out-quad",
                        "selectors": []
                      }
                    },
                    "trail": {
                      "delay": 1,
                      "pauseOnStop": false,
                      "quantity": 1
                    },
                    "light": {
                      "area": {
                        "gradient": {
                          "start": {
                            "value": "#ffffff"
                          },
                          "stop": {
                            "value": "#000000"
                          }
                        },
                        "radius": 1000
                      },
                      "shadow": {
                        "color": {
                          "value": "#000000"
                        },
                        "length": 2000
                      }
                    }
                  }
                },
                "particles": {
                  "color": {
                    "value": "#ffffff"
                  },
                  "move": {
                    "attract": {
                      "rotate": {
                        "x": 600,
                        "y": 1200
                      }
                    },
                    "enable": true,
                    "outModes": {
                      "default": "bounce",
                      "bottom": "bounce",
                      "left": "bounce",
                      "right": "bounce",
                      "top": "bounce"
                    },
                    "speed": 6
                  },
                  "number": {
                    "density": {
                      "enable": true
                    },
                    "value": 170
                  },
                  "opacity": {
                    "animation": {
                      "speed": 1,
                      "minimumValue": 0.1
                    }
                  },
                  "shape": {
                    "options": {
                      "character": {
                        "fill": false,
                        "font": "Verdana",
                        "style": "",
                        "value": "*",
                        "weight": "400"
                      },
                      "char": {
                        "fill": false,
                        "font": "Verdana",
                        "style": "",
                        "value": "*",
                        "weight": "400"
                      },
                      "polygon": {
                        "nb_sides": 5
                      },
                      "star": {
                        "nb_sides": 5
                      },
                      "image": {
                        "height": 32,
                        "replace_color": true,
                        "src": "/logo192.png",
                        "width": 32
                      },
                      "images": {
                        "height": 32,
                        "replace_color": true,
                        "src": "https://particles.js.org/images/sars-cov-2.png",
                        "width": 32
                      }
                    },
                    "type": "image"
                  },
                  "size": {
                    "value": 16,
                    "animation": {
                      "speed": 40,
                      "minimumValue": 0.1
                    }
                  },
                  "stroke": {
                    "color": {
                      "value": "#000000",
                      "animation": {
                        "h": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "decay": 0,
                          "sync": true
                        },
                        "s": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "decay": 0,
                          "sync": true
                        },
                        "l": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "decay": 0,
                          "sync": true
                        }
                      }
                    }
                  },
                  "life": {
                    "count": 0,
                    "delay": {
                      "random": {
                        "enable": false,
                        "minimumValue": 0
                      },
                      "value": 0,
                      "sync": false
                    },
                    "duration": {
                      "random": {
                        "enable": false,
                        "minimumValue": 0.0001
                      },
                      "value": 0,
                      "sync": false
                    }
                  },
                  "roll": {
                    "darken": {
                      "enable": false,
                      "value": 0
                    },
                    "enable": false,
                    "enlighten": {
                      "enable": false,
                      "value": 0
                    },
                    "mode": "vertical",
                    "speed": 25
                  },
                  "tilt": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0
                    },
                    "value": 0,
                    "animation": {
                      "enable": false,
                      "speed": 0,
                      "decay": 0,
                      "sync": false
                    },
                    "direction": "clockwise",
                    "enable": false
                  },
                  "twinkle": {
                    "lines": {
                      "enable": false,
                      "frequency": 0.05,
                      "opacity": 1
                    },
                    "particles": {
                      "enable": false,
                      "frequency": 0.05,
                      "opacity": 1
                    }
                  },
                  "wobble": {
                    "distance": 5,
                    "enable": false,
                    "speed": {
                      "angle": 50,
                      "move": 10
                    }
                  },
                  "orbit": {
                    "animation": {
                      "count": 0,
                      "enable": false,
                      "speed": 1,
                      "decay": 0,
                      "sync": false
                    },
                    "enable": false,
                    "opacity": 1,
                    "rotation": {
                      "random": {
                        "enable": false,
                        "minimumValue": 0
                      },
                      "value": 45
                    },
                    "width": 1
                  },
                  "links": {
                    "blink": false,
                    "color": {
                      "value": "#323031"
                    },
                    "consent": false,
                    "distance": 150,
                    "enable": false,
                    "frequency": 1,
                    "opacity": 0.4,
                    "shadow": {
                      "blur": 5,
                      "color": {
                        "value": "#000"
                      },
                      "enable": false
                    },
                    "triangles": {
                      "enable": false,
                      "frequency": 1
                    },
                    "width": 1,
                    "warp": false
                  },
                  "repulse": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0
                    },
                    "value": 0,
                    "enabled": false,
                    "distance": 1,
                    "duration": 1,
                    "factor": 1,
                    "speed": 1
                  }
                }
              }
            } />
        <div className="formContainer">
        <div className='logintitle'>全球新闻发布管理系统</div>
        <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!', },]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true,message: 'Please input your Password!',},]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
        </div>
    </div>
  )
}
