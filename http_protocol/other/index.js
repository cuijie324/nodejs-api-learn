/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = onHeaders

/**
 * Create a replacement writeHead method.
 *
 * @param {function} prevWriteHead
 * @param {function} listener
 * @private
 */

function createWriteHead (prevWriteHead, listener) {
  var fired = false //多次调用？
  console.log('>>>>', fired);

  // return function with core name and argument list
  return function writeHead (statusCode) {
    // set headers from arguments 把要设置的头设置上
    var args = setWriteHeadHeaders.apply(this, arguments)
    console.log('args', args, this.statusCode, fired);

    // fire listener
    if (!fired) {
      fired = true
      listener.call(this)

      // pass-along an updated status code
      if (typeof args[0] === 'number' && this.statusCode !== args[0]) {
        args[0] = this.statusCode
        args.length = 1
      }
    }

    prevWriteHead.apply(this, args)
  }
}

/**
 * Execute a listener when a response is about to write headers.
 *
 * @param {object} res
 * @return {function} listener
 * @public
 */

function onHeaders (res, listener) {
  if (!res) {
    throw new TypeError('argument res is required')
  }

  if (typeof listener !== 'function') {
    throw new TypeError('argument listener must be a function')
  }

  //替换了默认的res.writeHead，在最后调用
  res.writeHead = createWriteHead(res.writeHead, listener)
}

/**
 * Set headers contained in array on the response object.
 *
 * @param {object} res
 * @param {array} headers
 * @private
 */

function setHeadersFromArray (res, headers) {
  for (var i = 0; i < headers.length; i++) {
    res.setHeader(headers[i][0], headers[i][1])
  }
}

/**
 * Set headers contained in object on the response object.
 *
 * @param {object} res
 * @param {object} headers
 * @private
 */

function setHeadersFromObject (res, headers) {
  var keys = Object.keys(headers)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    if (k) res.setHeader(k, headers[k])
  }
}

/**
 * Set headers and other properties on the response object.
 *
 * @param {number} statusCode
 * @private
 */

function setWriteHeadHeaders (statusCode) {
  var length = arguments.length
  //writeHeaders(statusCode, statusMessage, headers);//第二个参数可能是响应码消息，所有要判断headers是从哪开始的
  var headerIndex = length > 1 && typeof arguments[1] === 'string'
    ? 2
    : 1

  //取出要设置的headers
  var headers = length >= headerIndex + 1
    ? arguments[headerIndex]
    : undefined

  this.statusCode = statusCode

  if (Array.isArray(headers)) {
    // handle array case
    setHeadersFromArray(this, headers)
  } else if (headers) {
    // handle object case
    setHeadersFromObject(this, headers)
  }

  // copy leading arguments 把前面几个参数拷出来了
  var args = new Array(Math.min(length, headerIndex))
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i]
  }

  return args
}
