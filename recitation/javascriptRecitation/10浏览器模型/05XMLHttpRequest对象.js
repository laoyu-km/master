const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.withCredentials = true;

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('get', 'https://www.163.com');
xhr.send(null);
