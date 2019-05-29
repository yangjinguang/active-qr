{% extends "./layout.tpl" %}
{% block body %}
{% include "./header.tpl" %}
<div class="content pages-qr-add">
    <form method="post" action="/settings/qr-add-cb" enctype="multipart/form-data">
        {% if qr %}
        <input style="display: none" name="id" value="{{qr.id}}">
        {% endif %}
        <div class="form-group">
            <div class="form-label">名称</div>
            <div class="form-control">
                <input class="form-input" name="name" value="{{qr.name}}">
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
                <input class="form-input" type="number" name="timesLimit" value="{{qr.times_limit}}">
            </div>
        </div>
        <div class="form-group">
            <div class="form-label"></div>
            <div class="form-control">
                <button class="btn btn-primary" style="margin-right: 10px" type="submit">提交</button>
                <a class="btn" style="text-decoration: none" href="/settings">取消</a>
            </div>
        </div>
    </form>
</div>

{% endblock %}
