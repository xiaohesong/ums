// 这里这个是将远程的图片转换成base64。 非canvas情况.

export function base64Url(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

const url = 'http://img15.3lian.com/2015/f1/38/d/41.jpg'
base64Url(url, (result) => {
    console.log("result base64 url was", result)
})
