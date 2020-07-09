/*!
 * connect
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var debug = require('debug')('connect:dispatcher');
var EventEmitter = require('events').EventEmitter;
var finalhandler = require('finalhandler');
var http = require('http');
var merge = require('utils-merge');
var parseUrl = require('parseurl');

/**
 * Module exports.
 * @public
 */

module.exports = createServer;

/**
 * Module variables.
 * @private
 */

var env = process.env.NODE_ENV || 'development';
var proto = {};

/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)) }

/**
 * Create a new connect server.
 *
 * @return {function}
 * @public
 */

function createServer() {
  function app(req, res, next) { app.handle(req, res, next); }//这里调用了proto的handle方法，这里的next不是下面的那个next，而是out
  merge(app, proto);//合并proto对象的方法
  merge(app, EventEmitter.prototype);//继承事件处理
  app.route = '/';//应对子应用的情况?
  app.stack = [];//存放所有挂载的中间件，格式{route, handle}
  return app;
}

/**
 * Utilize the given middleware `handle` to the given `route`,
 * defaulting to _/_. This "route" is the mount-point for the
 * middleware, when given a value other than _/_ the middleware
 * is only effective when that segment is present in the request's
 * pathname.
 *
 * For example if we were to mount a function at _/admin_, it would
 * be invoked on _/admin_, and _/admin/settings_, however it would
 * not be invoked for _/_, or _/posts_.
 *
 * @param {String|Function|Server} route, callback or server
 * @param {Function|Server} callback or server
 * @return {Server} for chaining
 * @public
 */
// 挂载中间件，全局或具体路径，默认'/'
proto.use = function use(route, fn) {
  var handle = fn;
  var path = route;

  // default route to '/'
  if (typeof route !== 'string') {
    handle = route;
    path = '/';
  }

  // wrap sub-apps 子应用
  if (typeof handle.handle === 'function') {
    var server = handle;
    server.route = path;//这个route有什么用？子应用也可以作为一个中间件挂载，所以也有route、handle
    handle = function (req, res, next) {
      server.handle(req, res, next);//调用子应用的handle
    };
  }

  // wrap vanilla http.Servers
  if (handle instanceof http.Server) {
    //继承自event的方法，获取名为request的所有事件监听器
    handle = handle.listeners('request')[0];//获取第一个request监听器
  }

  // strip trailing slash 去掉最后的’/‘
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }

  // add the middleware
  debug('use %s %s', path || '/', handle.name || 'anonymous');
  this.stack.push({ route: path, handle: handle });

  return this;
};

/**
 * Handle server requests, punting them down
 * the middleware stack.
 *
 * @private
 */
// 处理一个请求，会调用挂载的所有中间件
proto.handle = function handle(req, res, out) {
  var index = 0;
  var protohost = getProtohost(req.url) || '';
  var removed = '';
  var slashAdded = false;//是否在路由开头加了'/'
  var stack = this.stack;

  // final function handler 最后的处理函数，这个跟子应用那也用到了
  var done = out || finalhandler(req, res, {
    env: env,
    onerror: logerror
  });

  // store the original URL
  req.originalUrl = req.originalUrl || req.url;

  //调用一个个中间件
  function next(err) {
    //在调用下一个中间件时，还原处理过的req.url
    if (slashAdded) {
      req.url = req.url.substr(1);//去掉第一个字符，如果加了’/‘
      slashAdded = false;
    }

    if (removed.length !== 0) {
      req.url = protohost + removed + req.url.substr(protohost.length);
      removed = '';
    }

    // next callback 取出下一个中间件
    var layer = stack[index++];

    // all done
    if (!layer) {
      defer(done, err);
      return;
    }

    // 匹配url和路由
    // route data
    var path = parseUrl(req).pathname || '/';
    var route = layer.route;

    console.log('next>>>', path, route, path.length > route.length && path[route.length]);

    // skip this layer if the route doesn't match
    // 比较请求的url和中间件的route，指定了长度并转为小写
    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      return next(err);
    }

    // skip if route match does not border "/", ".", or end
    // 匹配上了，但只是path里包含了route，不是route的子路径
    var c = path.length > route.length && path[route.length];
    if (c && c !== '/' && c !== '.') {
      return next(err);
    }

    // trim off the part of the url that matches the route
    // 修改req.url，去掉匹配过的路由，或者在开头增加'/'
    if (route.length !== 0 && route !== '/') {
      removed = route;
      // 修改了req.url，只剩下protohost + 没匹配的部分，为了子应用的情况（继续匹配路由）
      req.url = protohost + req.url.substr(protohost.length + removed.length);

      // ensure leading slash 确保以'/'开头，为什么？什么时候会出现这种情况？
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }
    }

    // call the layer handle
    call(layer.handle, route, err, req, res, next);
  }

  next();
};

/**
 * Listen for connections.
 *
 * This method takes the same arguments
 * as node's `http.Server#listen()`.
 *
 * HTTP and HTTPS:
 *
 * If you run your application both as HTTP
 * and HTTPS you may wrap them individually,
 * since your Connect "server" is really just
 * a JavaScript `Function`.
 *
 *      var connect = require('connect')
 *        , http = require('http')
 *        , https = require('https');
 *
 *      var app = connect();
 *
 *      http.createServer(app).listen(80);
 *      https.createServer(options, app).listen(443);
 *
 * @return {http.Server}
 * @api public
 */

proto.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

/**
 * Invoke a route handle.
 * @private
 */
// 调用一个中间件
function call(handle, route, err, req, res, next) {
  var arity = handle.length;//要传的函数形参个数（不包含有默认值的）
  var error = err;
  var hasError = Boolean(err);

  debug('%s %s : %s', handle.name || '<anonymous>', route, req.originalUrl);

  try {
    if (hasError && arity === 4) {
      // error-handling middleware
      handle(err, req, res, next);//错误处理中间件，接收4个参数
      return;
    } else if (!hasError && arity < 4) {
      // request-handling middleware
      handle(req, res, next); //中间件处理，可以由中间件调用next继续调用下一个或抛出错误
      return;
    }
  } catch (e) {
    // replace the error
    error = e;//只有这一个地方给error赋值了，这里捕获的是中间件处理时的异常，也有可能是上面中间件处理时穿进去的error
  }

  // continue 没有中间件处理，自己调用next 什么时候会这样？出错时
  next(error);
}

/**
 * Log error using console.error.
 *
 * @param {Error} err
 * @private
 */
// 打印错误信息
function logerror(err) {
  if (env !== 'test') console.error(err.stack || err.toString());
}

/**
 * Get get protocol + host for a URL.
 *
 * @param {string} url
 * @private
 */
// 返回url里的协议和主机
// https://www.npmjs.com/package/debug -> https://www.npmjs.com
function getProtohost(url) {
  if (url.length === 0 || url[0] === '/') {
    return undefined;
  }

  var searchIndex = url.indexOf('?');
  var pathLength = searchIndex !== -1
    ? searchIndex
    : url.length;
  var fqdnIndex = url.substr(0, pathLength).indexOf('://');

  return fqdnIndex !== -1
    ? url.substr(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined;
}
