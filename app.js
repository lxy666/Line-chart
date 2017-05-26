/**
 * Created by yu on 2017/5/23.
 */
var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view', {
    map: {html: 'ejs'}
});

var koa_static = require('koa-static-server');
var service = require('./service/tmp.js');
var querystring = require('querystring');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));
app.use(controller.get('/tmp', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var tem = params.tem;
    var hum = params.hum;
    var sun = params.sun;
    var rfid = params.rfid;
    this.body = yield service.tmp(tem, hum, sun, rfid);
}));

app.use(controller.get('/select_info', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    this.body = yield service.select_info(start,end);
}));

app.use(controller.get('/index.html', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}));

//设置3000端口监听事件
app.listen(3000);
