# MIME

MIME: Multipurpose Internet Mail Extentions

## MIME 类型

- 通用结构： type/subtype

- MIME的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。

### 独立类型

- 独立类型表明了对文件的分类，可以是如下之一：

|类型|描述|典型示例|
|:---:|:---:|:---:|
|text|表明文件是普通文本，理论上是人类可读|text/plain, text/html, text/css, text/javascript|
|image|表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型|image/gif, image/png, image/jpeg, image/svg+xml, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon|
|audio|表明是某种音频文件|audio/wave, audio/wav, audio/x-wav, audio/x-pn-wavaudio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav|
|video|表明是某种视频文件|video/webm, video/ogg, application/ogg|
|application|表明是某种二进制数据|application/octet-stream, application/json, application/x-www-rorm-urlencoded, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml,  application/pdf, application/json|

- 对于text文件类型若没有特定的subtype，就使用 text/plain。类似的，二进制文件没有特定或已知的 subtype，即使用 application/octet-stream。

### Multipart 类型

- multipart/form-data : 用于联系 HTML Forms 和 POST 方法

如下所示的表单:

```html
<form action="http://localhost:8000/" method="post" enctype="multipart/form-data">
  <input type="text" name="myTextField">
  <input type="checkbox" name="myCheckBox">Check</input>
  <input type="file" name="myFile">
  <button>Send the file</button>
</form>
```
会发送这样的请求:
```
POST / HTTP/1.1
Host: localhost:8000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------8721656041911415653955004498
Content-Length: 465

-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myTextField"

Test
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myCheckBox"

on
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myFile"; filename="test.txt"
Content-Type: text/plain

Simple file.
-----------------------------8721656041911415653955004498--
```

- multipart/byteranges : 使用状态码206 Partial Content来发送整个文件的子集
```
HTTP/1.1 206 Partial Content
Accept-Ranges: bytes
Content-Type: multipart/byteranges; boundary=3d6b6a416f9b5
Content-Length: 385

--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 100-200/1270

eta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="vieport" content
--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 300-400/1270

-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica
--3d6b6a416f9b5--
```

- HTTP对不能处理的复合文件使用特殊的方式：将信息直接传送给浏览器（这时可能会建立一个“另存为”窗口，但是却不知道如何去显示内联文件。）

### form 的常用提交类型

- 在Form元素的语法中，EncType表明提交数据的格式 用 Enctype 属性指定将数据回发到服务器时浏览器使用的编码类型。

- form的enctype属性为编码方式，常用有两种： application/x-www-form-urlencoded和multipart/form-data

- 默认为application/x-www-form-urlencoded。当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url。

- 当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符。

#### application/x-www-form-urlencoded：

- 窗体数据被编码为名称/值对。这是标准的编码格式。

#### multipart/form-data：

- 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。

#### text/plain：

- 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。

#### application/json

发送 ajax请求中 content-type:application/json,这样也能在后台接受前台提交的数据，其实这个时候前端提交的数据是 json格式的字符串，后端要用@requestbody注解来接收。

