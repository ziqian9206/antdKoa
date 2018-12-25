module.export = `
<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name='viewport' content="width=device-width,initial-scale=1">
            <title>Koa server html</title>
            <link href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-grid.min.css" rel="stylesheet">
            <script src="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
        </head>
        <body>
            <h1>我的第一个标题<%= me %></h1>
            <p>我的第一个段落<%= you %></p>
        </body>
    </html>
`