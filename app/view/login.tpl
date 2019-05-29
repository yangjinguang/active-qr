{% extends "./layout.tpl" %}
{% block body %}
<div class="content page-login">
    <div class="login-card">
        <h2 class="text-primary">登陆</h2>
        <form class="login-form" method="post" action="/login">

            <div class="form-group">
                <div class="form-control">
                    <input class="form-input" name="username" placeholder="用户名">
                </div>
            </div>
            <div class="form-group">
                <div class="form-control">
                    <input class="form-input" type="password" name="password" placeholder="密码">
                </div>
            </div>
            <div class="form-group">
                <div class="form-control">
                    <button class="btn btn-primary" style="width: 100%" type="submit">登陆</button>
                </div>
            </div>
        </form>
    </div>

</div>

{% endblock %}
