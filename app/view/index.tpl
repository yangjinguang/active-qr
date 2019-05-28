<html>
<head>
    <title>QR</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/public/css/index.css"/>
</head>
<body>
<!--    {% for item in list %}-->
<!--    <li class="item">-->
<!--        <a href="{{ item.url }}">{{ item.title }}</a>-->
<!--    </li>-->
<!--    {% endfor %}-->
<img src="{{qrImage}}">
<p>扫码入群，参加活动，每天白拿MTV</p>
<ul>
    {% for qr in qrs %}
    <li>{{qr.name}}: {{qr.times}}</li>
    {% endfor %}
</ul>
<a href="/settings">设置</a>
</body>
</html>
