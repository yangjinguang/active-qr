<html>
<head>
    <title>QR</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/public/css/settings.css"/>
</head>
<body>
<table>
    <thead>
    <tr>
        <th>名称</th>
        <th>二维码</th>
        <th>访问次数</th>
        <th>访问次数限制</th>
        <th>状态</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    {% for qr in qrs %}
    <tr>
        <td>{{qr.name}}</td>
        <td>
            <img src="/public/qrs/{{qr.filename}}">
        </td>
        <td>{{qr.times}}</td>
        <td>{{qr.times_limit}}</td>
        <td>
            {% if qr.disabled %}
            已达到上限
            {% else %}
            正常
            {% endif %}
        </td>
        <td>
            <button>删除</button>
        </td>
    </tr>
    {% endfor %}

    </tbody>
</table>
<a href="/settings/qr-add">创建</a>

</body>
</html>
