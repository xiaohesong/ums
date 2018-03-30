import axios from 'axios'
import {message} from 'antd'

const API_URL = process.env.REACT_APP_API_URL
const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'my-token': 'my-token',
  }
});

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export const get = (path, params={}) => {
  const searchParams = Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&')
  return instance.get(`${API_URL}/${path}?${searchParams}`,{
    headers: {
      'my-token': 'my-token',
    }
  })
  .then(response => response.data)
  .catch(function (error) {
    handleError(error)
  });
}

export const post = (path, params) => {
  console.log("post form value is", params);
  var formData = new FormData();

  for (var filed in params) {
      formData.append(filed, params[filed]);
  }
  return instance({
    method: 'post',
    url: `${API_URL}/${path}`,
    data: formData,
    headers: {
      'my-token': 'my-token',
    }
  })
  .then(response => response.data)
  .catch(function (error) {
    handleError(error)
  });
}




function handleError(error) {
  if (error.response) {
      console.log("Error Response", error.response);
      checkReturnStatus(error.response)
    } else if (error.request) {
      console.log("Request Error", error.request);
    } else {
      console.log('Error', error.message);
    }
}


function checkReturnStatus(res) {
    let errors;
    switch (res.status) {
        case 500:
            console.log("500错误");
            message.error('服务器内部错误', 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 404:
            message.error("请求的资源不存在,请确认是否存在该资源!", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 400:
            const msg = res.data && res.data.msg
            message.error(msg || '请求的参数存在问题!', 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 401:
            message.error("登录会话过期,请重新登录", 5)
            cleanCookieWhenLogout()
            break;
        case 403:
            message.error("无权限访问", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
      default:
    }
}

export function cleanCookieWhenLogout() {
  localStorage.clear()
  window.location.href = '/login'
}
