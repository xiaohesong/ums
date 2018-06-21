// 这里这个是将远程的图片转换成base64。 非canvas情况.


// bad practice
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

// better
export function base64Url(url) {
  return new Promise(async(resolve, reject) => {
    const promise = await fetch(url)
    const file = await promise.blob()

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async() => {
      resolve(reader.result)
    }
  })
}

const url = 'http://img15.3lian.com/2015/f1/38/d/41.jpg'
const image = await base64Url(url)

