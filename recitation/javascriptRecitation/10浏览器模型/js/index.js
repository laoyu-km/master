['./js/a.js', './js/b.js'].forEach(function (src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;

  script.onload = function () {
    console.log(src + ' 下载并解析完成');
  };

  script.onerror = function () {
    console.log(src + ' 下载或解析失败');
  };
  document.body.appendChild(script);
});
