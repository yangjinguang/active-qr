<html>
<head>
    <title>QR</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/public/css/settings.css"/>
</head>
<body>
<form method="post" action="/settings/qr-add-cb" enctype="multipart/form-data">
    <div class="form-group">
        <div class="form-label">名称</div>
        <div class="form-control">
            <input name="name">
        </div>
    </div>
    <div class="form-group">
        <div class="form-label">二维码</div>
        <div class="form-control">
            <input type="file" name="qrFile">
        </div>
    </div>
    <div class="form-group">
        <div class="form-label">访问次数限制</div>
        <div class="form-control">
            <input type="number" name="timesLimit">
        </div>
    </div>
    <div class="form-group">
        <div class="form-label"></div>
        <div class="form-control">
            <button type="submit">提交</button>
        </div>
    </div>
</form>

</body>
</html>
