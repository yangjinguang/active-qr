{% extends "./layout.tpl" %}
{% block body %}
{% include "./header.tpl" %}
<div class="content page-settings">
    <div class="settings-header">
        <h4 style="margin-right: 20px">二维码列表</h4>
        <a class="btn btn-primary" href="/settings/qr-add">新建</a>
    </div>
    <table class="qrs-table">
        <thead>
        <tr>
            <th>名称</th>
            <th style="width: 220px">二维码</th>
            <th>访问次数</th>
            <th>访问次数限制</th>
            <th>状态</th>
            <th style="width: 180px">操作</th>
        </tr>
        </thead>
        <tbody>
        {% for qr in qrs %}
        <tr>
            <td>{{qr.name}}</td>
            <td>
                <img style="width: 200px;height: 200px" src="/public/qrs/{{qr.filename}}">
            </td>
            <td>{{qr.times}}</td>
            <td>{{qr.times_limit}}</td>
            <td>
                {% if qr.disabled %}
                <span class="text-error">已达到上限</span>
                {% elif qr.times > qr.times_limit - 10 %}
                <span class="text-warning">接近上限</span>
                {% else %}
                <span class="text-success">正常</span>
                {% endif %}
            </td>
            <td>
                <a class="btn btn-primary" href="/settings/qr-add?id={{qr.id}}" style="margin-right: 10px">编辑</a>
                <a class="btn btn-danger" href="/settings/qr-delete?id={{qr.id}}">删除</a>
            </td>
        </tr>
        {% endfor %}

        </tbody>
    </table>
</div>

{% endblock %}
