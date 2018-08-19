const utilsAjax = (function() {
  var serialize = function (data) {
    if (data instanceof Object) {
      let attrs = Object.keys(data);
      let arr = [];
      for (let i = 0, len = attrs.length; i < len; i++) {
        arr.push(encodeURI(attrs[i]) + '=' + encodeURI(data[attrs[i]]));
      }
      return arr.join('&');

    } else {
      return '';
    }
  }
  var ajax = function ({ url, method, data = ''} = {}) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      let sendData = serialize(data);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr === 304) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.status);
          }
        }
      }
      if (method === 'get' || method === 'GET') {
        let sendUrl = sendData.length?(`${url}?${sendData}`):url;
        xhr.open('get',sendUrl,  true);
        xhr.send();
      } else if (method === 'post' || method === 'POST') {
        xhr.open('post', url,  true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(serialize(sendData));
      }
    });
  }
  return {
    ajax
  }
})();

export default utilsAjax;