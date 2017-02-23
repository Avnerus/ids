(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    width: 1920,
    height: 1080
};

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _socketController = require('./socket-controller');

var _socketController2 = _interopRequireDefault(_socketController);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        console.log("Game constructed!");
        this.config = config;
        this.started = false;
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var CustomEmitter = function (_EventEmitter) {
                _inherits(CustomEmitter, _EventEmitter);

                function CustomEmitter() {
                    _classCallCheck(this, CustomEmitter);

                    return _possibleConstructorReturn(this, (CustomEmitter.__proto__ || Object.getPrototypeOf(CustomEmitter)).apply(this, arguments));
                }

                return CustomEmitter;
            }(_events2.default);

            this.emitter = new CustomEmitter();
            global.events = this.emitter;

            this.socketController = new _socketController2.default();
            this.socketController.init();

            document.addEventListener('keydown', function (event) {
                // 87, 65, 83, 68
                var element = document.getElementById('key_' + event.keyCode);
                if (element) {
                    element.style["background-color"] = "white";
                    element.style.color = "black";
                }

                return false;
            }, false);

            document.addEventListener('keyup', function (event) {
                // 87, 65, 83, 68
                var element = document.getElementById('key_' + event.keyCode);
                if (element) {
                    element.style["background-color"] = "black";
                    element.style.color = "white";

                    _this2.socketController.emit("key-command", event.keyCode);
                }
                return false;
            }, false);
        }
    }, {
        key: 'load',
        value: function load(onLoad) {

            onLoad();
        }
    }, {
        key: 'start',
        value: function start() {
            this.resize();
        }
    }, {
        key: 'animate',
        value: function animate(dt) {
            this.update(dt);
            this.render();
        }
    }, {
        key: 'update',
        value: function update(dt) {}
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'resize',
        value: function resize() {}
    }]);

    return _class;
}();

exports.default = _class;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./socket-controller":4,"events":6}],3:[function(require,module,exports){
'use strict';

var Game = require('./game').default;
var config = require('./config').default;
var Stats = require('stats.js');

var game = new Game(config);
var stats = new Stats();
stats.showPanel(0);

var fullscreen = require('fullscreen');

console.log("Loading...");
game.init();
var el = document.documentElement;

var startTime = null;

window.onload = function () {
    document.getElementById('start-button').addEventListener('click', function (event) {
        /*
           if (!Modernizr.touchevents && cdivinonfig = require('./config')nfig.controls == "locked" && lock.available()) {
            
            var pointer = lock(document.getElementById('game'));
              pointer.on('attain', function() {
                console.log("Pointer attained!");
                if (!game.started) {
                    start();
                }
                });
                  pointer.request(); 
        }*/

        if (0 && fullscreen.available()) {
            var fs = fullscreen(el);

            fs.on('attain', function () {
                console.log("Full screen attained!");
                if (typeof pointer != 'undefined' && !game.started) {
                    pointer.request();
                } else {
                    if (!game.started) {
                        start();
                    }
                }
            });
            fs.request();
        } else {
            if (!game.started) {
                start();
            }
        }

        //start(); 
    });
    game.load(function () {
        /*
        document.getElementById('start-container').style.display = "flex";
        document.getElementById('loading-container').style.display = "none";*/
        start();
    });
};

function start() {
    document.getElementById('splash-container').style.display = "none";
    document.getElementById('game').appendChild(stats.dom);
    game.start();
    window.addEventListener('resize', resize, false);
    window.addEventListener('vrdisplaypresentchange', resize, true);
    game.resize();
    stats.begin();
    requestAnimationFrame(animate);
}

function animate(t) {
    if (!startTime) startTime = t;
    var dt = t - startTime;
    startTime = t;
    stats.begin();
    game.animate(dt);
    stats.end();
    requestAnimationFrame(animate);
}

function resize() {
    game.resize();
}

},{"./config":1,"./game":2,"fullscreen":7,"stats.js":8}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var SocketController = function () {
    function SocketController() {
        _classCallCheck(this, SocketController);

        console.log("Socket controller constructed!");
    }

    _createClass(SocketController, [{
        key: "init",
        value: function init() {
            this.socket = io('http://192.168.1.15:3000');
        }
    }, {
        key: "emit",
        value: function emit(message, args) {
            console.log("Sending message ", message);
            this.socket.emit(message, args);
        }
    }, {
        key: "on",
        value: function on(message, func) {
            this.socket.on(message, func);
        }
    }]);

    return SocketController;
}();

exports.default = SocketController;

},{}],5:[function(require,module,exports){
addEventListener.removeEventListener = removeEventListener
addEventListener.addEventListener = addEventListener

module.exports = addEventListener

var Events = null

function addEventListener(el, eventName, listener, useCapture) {
  Events = Events || (
    document.addEventListener ?
    {add: stdAttach, rm: stdDetach} :
    {add: oldIEAttach, rm: oldIEDetach}
  )
  
  return Events.add(el, eventName, listener, useCapture)
}

function removeEventListener(el, eventName, listener, useCapture) {
  Events = Events || (
    document.addEventListener ?
    {add: stdAttach, rm: stdDetach} :
    {add: oldIEAttach, rm: oldIEDetach}
  )
  
  return Events.rm(el, eventName, listener, useCapture)
}

function stdAttach(el, eventName, listener, useCapture) {
  el.addEventListener(eventName, listener, useCapture)
}

function stdDetach(el, eventName, listener, useCapture) {
  el.removeEventListener(eventName, listener, useCapture)
}

function oldIEAttach(el, eventName, listener, useCapture) {
  if(useCapture) {
    throw new Error('cannot useCapture in oldIE')
  }

  el.attachEvent('on' + eventName, listener)
}

function oldIEDetach(el, eventName, listener, useCapture) {
  el.detachEvent('on' + eventName, listener)
}

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],7:[function(require,module,exports){
module.exports = fullscreen
fullscreen.available = available
fullscreen.enabled = enabled

var EE = require('events').EventEmitter
var ael = require('add-event-listener')
var rel = ael.removeEventListener

function available() {
  return !!shim(document.body)
}

function enabled() {
  return !!(document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullscreenEnabled ||
    document.msFullscreenEnabled);
}

function fullscreen(el) {
  var doc = el.ownerDocument
    , body = doc.body
    , rfs = shim(el)
    , ee = new EE

  var vendors = ['', 'webkit', 'moz']

  for(var i = 0, len = vendors.length; i < len; ++i) {
    ael(doc, vendors[i] + 'fullscreenchange', onfullscreenchange)
    ael(doc, vendors[i] + 'fullscreenerror', onfullscreenerror)
  }
  // MS uses different casing:
  ael(doc, 'MSFullscreenChange', onfullscreenchange)
  ael(doc, 'MSFullscreenError', onfullscreenerror)

  ee.release = release
  ee.request = request
  ee.dispose = dispose
  ee.target = fullscreenelement

  if(!shim) {
    setTimeout(function() {
      ee.emit('error', new Error('fullscreen is not supported'))
    }, 0)
  }
  return ee

  function onfullscreenchange() {
    if(!fullscreenelement()) {
      return ee.emit('release')
    }
    ee.emit('attain')
  }

  function onfullscreenerror() {
    ee.emit('error')
  }

  function request() {
    return rfs.apply(el, arguments)
  }

  function release() {

    var element_exit = (el.exitFullscreen ||
      el.webkitExitFullscreen ||
      el.mozCancelFullScreen ||
      el.mozExitFullScreen ||
      el.msExitFullscreen);

    if (element_exit) {
      element_exit.apply(el, arguments);
      return;
    }

    var document_exit = (doc.exitFullscreen ||
      doc.webkitExitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.mozExitFullScreen ||
      doc.msExitFullscreen);

    document_exit.apply(doc, arguments);
  } 

  function fullscreenelement() {
    return (0 ||
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      null);
  }

  function dispose() {
    for(var i = 0, len = vendors.length; i < len; ++i) {
      rel(doc, vendors[i] + 'fullscreenchange', onfullscreenchange)
      rel(doc, vendors[i] + 'fullscreenerror', onfullscreenerror)
    }
    // MS uses different casing:
    rel(doc, 'MSFullscreenChange', onfullscreenchange)
    rel(doc, 'MSFullscreenError', onfullscreenerror)
  }
}

function shim(el) {
  return (el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen);
}

},{"add-event-listener":5,"events":6}],8:[function(require,module,exports){
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29uZmlnLmpzIiwiY2xpZW50L2dhbWUuanMiLCJjbGllbnQvaW5kZXguanMiLCJjbGllbnQvc29ja2V0LWNvbnRyb2xsZXIuanMiLCJub2RlX21vZHVsZXMvYWRkLWV2ZW50LWxpc3RlbmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvZnVsbHNjcmVlbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdGF0cy5qcy9idWlsZC9zdGF0cy5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7V0NBZSxBQUNKLEFBQ1A7WSxBQUZXLEFBRUg7QUFGRyxBQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREo7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBR0k7b0JBQUEsQUFBWSxRQUFROzhCQUNoQjs7Z0JBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjthQUFBLEFBQUssU0FBTCxBQUFjLEFBQ2Q7YUFBQSxBQUFLLFVBQUwsQUFBZSxBQUNsQjs7Ozs7K0JBQ007eUJBQUE7O2dCQUFBLEFBQ0cseUNBREg7eUNBQUE7O3lDQUFBOzBDQUFBOzswSUFBQTtBQUFBOzt1QkFBQTt1QkFFSDs7aUJBQUEsQUFBSyxVQUFVLElBQWYsQUFBZSxBQUFJLEFBQ25CO21CQUFBLEFBQU8sU0FBUyxLQUFoQixBQUFxQixBQUdyQjs7aUJBQUEsQUFBSyxtQkFBbUIsdUJBQXhCLEFBQ0E7aUJBQUEsQUFBSyxpQkFBTCxBQUFzQixBQUV0Qjs7cUJBQUEsQUFBUyxpQkFBVCxBQUEwQixXQUFXLFVBQUEsQUFBQyxPQUFVLEFBQzVDO0FBQ0E7b0JBQUksVUFBVSxTQUFBLEFBQVMsZUFBZSxTQUFTLE1BQS9DLEFBQWMsQUFBdUMsQUFDckQ7b0JBQUEsQUFBSSxTQUFTLEFBQ1Q7NEJBQUEsQUFBUSxNQUFSLEFBQWMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgd2lkdGg6IDE5MjAsXHJcbiAgICBoZWlnaHQ6IDEwODBcclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cydcclxuaW1wb3J0IFNvY2tldENvbnRyb2xsZXIgZnJvbSAnLi9zb2NrZXQtY29udHJvbGxlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgY29uc3RydWN0ZWQhXCIpXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNsYXNzIEN1c3RvbUVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge31cclxuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgQ3VzdG9tRW1pdHRlcigpO1xyXG4gICAgICAgIGdsb2JhbC5ldmVudHMgPSB0aGlzLmVtaXR0ZXI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnNvY2tldENvbnRyb2xsZXIgPSBuZXcgU29ja2V0Q29udHJvbGxlcigpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8gODcsIDY1LCA4MywgNjhcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5XycgKyBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8gODcsIDY1LCA4MywgNjhcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5XycgKyBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldENvbnRyb2xsZXIuZW1pdChcImtleS1jb21tYW5kXCIsIGV2ZW50LmtleUNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZChvbkxvYWQpIHtcclxuXHJcbiAgICAgICAgb25Mb2FkKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoZHQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKCkge1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBHYW1lID0gcmVxdWlyZSgnLi9nYW1lJykuZGVmYXVsdDtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJykuZGVmYXVsdDtcclxudmFyIFN0YXRzID0gcmVxdWlyZSgnc3RhdHMuanMnKTtcclxuXHJcbnZhciBnYW1lID0gbmV3IEdhbWUoY29uZmlnKTtcclxudmFyIHN0YXRzID0gbmV3IFN0YXRzKCk7XHJcbnN0YXRzLnNob3dQYW5lbCgwKTtcclxuXHJcbnZhciBmdWxsc2NyZWVuID0gcmVxdWlyZSgnZnVsbHNjcmVlbicpO1xyXG5cclxuY29uc29sZS5sb2coXCJMb2FkaW5nLi4uXCIpO1xyXG5nYW1lLmluaXQoKTtcclxudmFyIGVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxudmFyIHN0YXJ0VGltZSA9IG51bGw7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgICBpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cyAmJiBjZGl2aW5vbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyluZmlnLmNvbnRyb2xzID09IFwibG9ja2VkXCIgJiYgbG9jay5hdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBvaW50ZXIgPSBsb2NrKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykpO1xyXG5cclxuICAgICAgICAgICAgcG9pbnRlci5vbignYXR0YWluJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvaW50ZXIgYXR0YWluZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFnYW1lLnN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcG9pbnRlci5yZXF1ZXN0KCk7IFxyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAoMCAmJiBmdWxsc2NyZWVuLmF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIHZhciBmcyA9IGZ1bGxzY3JlZW4oZWwpO1xyXG5cclxuICAgICAgICAgICAgZnMub24oJ2F0dGFpbicsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZ1bGwgc2NyZWVuIGF0dGFpbmVkIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocG9pbnRlcikgIT0gJ3VuZGVmaW5lZCcgJiYgIWdhbWUuc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIucmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWUuc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZzLnJlcXVlc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWdhbWUuc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zdGFydCgpOyBcclxuICAgIH0pO1xyXG4gICAgZ2FtZS5sb2FkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZy1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7Ki9cclxuICAgICAgIHN0YXJ0KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BsYXNoLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykuYXBwZW5kQ2hpbGQoc3RhdHMuZG9tKTtcclxuICAgIGdhbWUuc3RhcnQoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgcmVzaXplLCB0cnVlKTtcclxuICAgIGdhbWUucmVzaXplKCk7XHJcbiAgICBzdGF0cy5iZWdpbigpO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZSh0KSB7XHJcbiAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdDtcclxuICAgIHZhciBkdCA9IHQgLSBzdGFydFRpbWU7XHJcbiAgICBzdGFydFRpbWUgPSB0O1xyXG4gICAgc3RhdHMuYmVnaW4oKTtcclxuICAgIGdhbWUuYW5pbWF0ZShkdCk7XHJcbiAgICBzdGF0cy5lbmQoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gICAgZ2FtZS5yZXNpemUoKTtcclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNvY2tldCBjb250cm9sbGVyIGNvbnN0cnVjdGVkIVwiKVxyXG4gICAgfVxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vMTkyLjE2OC4xLjE1OjMwMDAnKTtcclxuICAgIH1cclxuICAgIGVtaXQobWVzc2FnZSwgYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyBtZXNzYWdlIFwiLCBtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KG1lc3NhZ2UsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKG1lc3NhZ2UsIGZ1bmMpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihtZXNzYWdlLCBmdW5jKTtcclxuICAgIH1cclxufVxyXG4iLCJhZGRFdmVudExpc3RlbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyXG5hZGRFdmVudExpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyXG5cbm1vZHVsZS5leHBvcnRzID0gYWRkRXZlbnRMaXN0ZW5lclxuXG52YXIgRXZlbnRzID0gbnVsbFxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gIEV2ZW50cyA9IEV2ZW50cyB8fCAoXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA/XG4gICAge2FkZDogc3RkQXR0YWNoLCBybTogc3RkRGV0YWNofSA6XG4gICAge2FkZDogb2xkSUVBdHRhY2gsIHJtOiBvbGRJRURldGFjaH1cbiAgKVxuICBcbiAgcmV0dXJuIEV2ZW50cy5hZGQoZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgRXZlbnRzID0gRXZlbnRzIHx8IChcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID9cbiAgICB7YWRkOiBzdGRBdHRhY2gsIHJtOiBzdGREZXRhY2h9IDpcbiAgICB7YWRkOiBvbGRJRUF0dGFjaCwgcm06IG9sZElFRGV0YWNofVxuICApXG4gIFxuICByZXR1cm4gRXZlbnRzLnJtKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKVxufVxuXG5mdW5jdGlvbiBzdGRBdHRhY2goZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKVxufVxuXG5mdW5jdGlvbiBzdGREZXRhY2goZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKVxufVxuXG5mdW5jdGlvbiBvbGRJRUF0dGFjaChlbCwgZXZlbnROYW1lLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICBpZih1c2VDYXB0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgdXNlQ2FwdHVyZSBpbiBvbGRJRScpXG4gIH1cblxuICBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBsaXN0ZW5lcilcbn1cblxuZnVuY3Rpb24gb2xkSUVEZXRhY2goZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgbGlzdGVuZXIpXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bGxzY3JlZW5cbmZ1bGxzY3JlZW4uYXZhaWxhYmxlID0gYXZhaWxhYmxlXG5mdWxsc2NyZWVuLmVuYWJsZWQgPSBlbmFibGVkXG5cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxudmFyIGFlbCA9IHJlcXVpcmUoJ2FkZC1ldmVudC1saXN0ZW5lcicpXG52YXIgcmVsID0gYWVsLnJlbW92ZUV2ZW50TGlzdGVuZXJcblxuZnVuY3Rpb24gYXZhaWxhYmxlKCkge1xuICByZXR1cm4gISFzaGltKGRvY3VtZW50LmJvZHkpXG59XG5cbmZ1bmN0aW9uIGVuYWJsZWQoKSB7XG4gIHJldHVybiAhIShkb2N1bWVudC5mdWxsc2NyZWVuRW5hYmxlZCB8fFxuICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbmFibGVkIHx8XG4gICAgZG9jdW1lbnQubW96RnVsbHNjcmVlbkVuYWJsZWQgfHxcbiAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbmFibGVkKTtcbn1cblxuZnVuY3Rpb24gZnVsbHNjcmVlbihlbCkge1xuICB2YXIgZG9jID0gZWwub3duZXJEb2N1bWVudFxuICAgICwgYm9keSA9IGRvYy5ib2R5XG4gICAgLCByZnMgPSBzaGltKGVsKVxuICAgICwgZWUgPSBuZXcgRUVcblxuICB2YXIgdmVuZG9ycyA9IFsnJywgJ3dlYmtpdCcsICdtb3onXVxuXG4gIGZvcih2YXIgaSA9IDAsIGxlbiA9IHZlbmRvcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBhZWwoZG9jLCB2ZW5kb3JzW2ldICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbmZ1bGxzY3JlZW5jaGFuZ2UpXG4gICAgYWVsKGRvYywgdmVuZG9yc1tpXSArICdmdWxsc2NyZWVuZXJyb3InLCBvbmZ1bGxzY3JlZW5lcnJvcilcbiAgfVxuICAvLyBNUyB1c2VzIGRpZmZlcmVudCBjYXNpbmc6XG4gIGFlbChkb2MsICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBvbmZ1bGxzY3JlZW5jaGFuZ2UpXG4gIGFlbChkb2MsICdNU0Z1bGxzY3JlZW5FcnJvcicsIG9uZnVsbHNjcmVlbmVycm9yKVxuXG4gIGVlLnJlbGVhc2UgPSByZWxlYXNlXG4gIGVlLnJlcXVlc3QgPSByZXF1ZXN0XG4gIGVlLmRpc3Bvc2UgPSBkaXNwb3NlXG4gIGVlLnRhcmdldCA9IGZ1bGxzY3JlZW5lbGVtZW50XG5cbiAgaWYoIXNoaW0pIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZWUuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ2Z1bGxzY3JlZW4gaXMgbm90IHN1cHBvcnRlZCcpKVxuICAgIH0sIDApXG4gIH1cbiAgcmV0dXJuIGVlXG5cbiAgZnVuY3Rpb24gb25mdWxsc2NyZWVuY2hhbmdlKCkge1xuICAgIGlmKCFmdWxsc2NyZWVuZWxlbWVudCgpKSB7XG4gICAgICByZXR1cm4gZWUuZW1pdCgncmVsZWFzZScpXG4gICAgfVxuICAgIGVlLmVtaXQoJ2F0dGFpbicpXG4gIH1cblxuICBmdW5jdGlvbiBvbmZ1bGxzY3JlZW5lcnJvcigpIHtcbiAgICBlZS5lbWl0KCdlcnJvcicpXG4gIH1cblxuICBmdW5jdGlvbiByZXF1ZXN0KCkge1xuICAgIHJldHVybiByZnMuYXBwbHkoZWwsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG5cbiAgICB2YXIgZWxlbWVudF9leGl0ID0gKGVsLmV4aXRGdWxsc2NyZWVuIHx8XG4gICAgICBlbC53ZWJraXRFeGl0RnVsbHNjcmVlbiB8fFxuICAgICAgZWwubW96Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgZWwubW96RXhpdEZ1bGxTY3JlZW4gfHxcbiAgICAgIGVsLm1zRXhpdEZ1bGxzY3JlZW4pO1xuXG4gICAgaWYgKGVsZW1lbnRfZXhpdCkge1xuICAgICAgZWxlbWVudF9leGl0LmFwcGx5KGVsLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkb2N1bWVudF9leGl0ID0gKGRvYy5leGl0RnVsbHNjcmVlbiB8fFxuICAgICAgZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuIHx8XG4gICAgICBkb2MubW96Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgZG9jLm1vekV4aXRGdWxsU2NyZWVuIHx8XG4gICAgICBkb2MubXNFeGl0RnVsbHNjcmVlbik7XG5cbiAgICBkb2N1bWVudF9leGl0LmFwcGx5KGRvYywgYXJndW1lbnRzKTtcbiAgfSBcblxuICBmdW5jdGlvbiBmdWxsc2NyZWVuZWxlbWVudCgpIHtcbiAgICByZXR1cm4gKDAgfHxcbiAgICAgIGRvYy5mdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICBkb2MubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcbiAgICAgIGRvYy5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICBudWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gdmVuZG9ycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgcmVsKGRvYywgdmVuZG9yc1tpXSArICdmdWxsc2NyZWVuY2hhbmdlJywgb25mdWxsc2NyZWVuY2hhbmdlKVxuICAgICAgcmVsKGRvYywgdmVuZG9yc1tpXSArICdmdWxsc2NyZWVuZXJyb3InLCBvbmZ1bGxzY3JlZW5lcnJvcilcbiAgICB9XG4gICAgLy8gTVMgdXNlcyBkaWZmZXJlbnQgY2FzaW5nOlxuICAgIHJlbChkb2MsICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBvbmZ1bGxzY3JlZW5jaGFuZ2UpXG4gICAgcmVsKGRvYywgJ01TRnVsbHNjcmVlbkVycm9yJywgb25mdWxsc2NyZWVuZXJyb3IpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hpbShlbCkge1xuICByZXR1cm4gKGVsLnJlcXVlc3RGdWxsc2NyZWVuIHx8XG4gICAgZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcbiAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgIGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4pO1xufVxuIiwiLy8gc3RhdHMuanMgLSBodHRwOi8vZ2l0aHViLmNvbS9tcmRvb2Ivc3RhdHMuanNcbnZhciBTdGF0cz1mdW5jdGlvbigpe2Z1bmN0aW9uIGgoYSl7Yy5hcHBlbmRDaGlsZChhLmRvbSk7cmV0dXJuIGF9ZnVuY3Rpb24gayhhKXtmb3IodmFyIGQ9MDtkPGMuY2hpbGRyZW4ubGVuZ3RoO2QrKyljLmNoaWxkcmVuW2RdLnN0eWxlLmRpc3BsYXk9ZD09PWE/XCJibG9ja1wiOlwibm9uZVwiO2w9YX12YXIgbD0wLGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMFwiO2MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oYSl7YS5wcmV2ZW50RGVmYXVsdCgpO2soKytsJWMuY2hpbGRyZW4ubGVuZ3RoKX0sITEpO3ZhciBnPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCksZT1nLGE9MCxyPWgobmV3IFN0YXRzLlBhbmVsKFwiRlBTXCIsXCIjMGZmXCIsXCIjMDAyXCIpKSxmPWgobmV3IFN0YXRzLlBhbmVsKFwiTVNcIixcIiMwZjBcIixcIiMwMjBcIikpO1xuaWYoc2VsZi5wZXJmb3JtYW5jZSYmc2VsZi5wZXJmb3JtYW5jZS5tZW1vcnkpdmFyIHQ9aChuZXcgU3RhdHMuUGFuZWwoXCJNQlwiLFwiI2YwOFwiLFwiIzIwMVwiKSk7aygwKTtyZXR1cm57UkVWSVNJT046MTYsZG9tOmMsYWRkUGFuZWw6aCxzaG93UGFuZWw6ayxiZWdpbjpmdW5jdGlvbigpe2c9KHBlcmZvcm1hbmNlfHxEYXRlKS5ub3coKX0sZW5kOmZ1bmN0aW9uKCl7YSsrO3ZhciBjPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCk7Zi51cGRhdGUoYy1nLDIwMCk7aWYoYz5lKzFFMyYmKHIudXBkYXRlKDFFMyphLyhjLWUpLDEwMCksZT1jLGE9MCx0KSl7dmFyIGQ9cGVyZm9ybWFuY2UubWVtb3J5O3QudXBkYXRlKGQudXNlZEpTSGVhcFNpemUvMTA0ODU3NixkLmpzSGVhcFNpemVMaW1pdC8xMDQ4NTc2KX1yZXR1cm4gY30sdXBkYXRlOmZ1bmN0aW9uKCl7Zz10aGlzLmVuZCgpfSxkb21FbGVtZW50OmMsc2V0TW9kZTprfX07XG5TdGF0cy5QYW5lbD1mdW5jdGlvbihoLGssbCl7dmFyIGM9SW5maW5pdHksZz0wLGU9TWF0aC5yb3VuZCxhPWUod2luZG93LmRldmljZVBpeGVsUmF0aW98fDEpLHI9ODAqYSxmPTQ4KmEsdD0zKmEsdT0yKmEsZD0zKmEsbT0xNSphLG49NzQqYSxwPTMwKmEscT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3Eud2lkdGg9cjtxLmhlaWdodD1mO3Euc3R5bGUuY3NzVGV4dD1cIndpZHRoOjgwcHg7aGVpZ2h0OjQ4cHhcIjt2YXIgYj1xLmdldENvbnRleHQoXCIyZFwiKTtiLmZvbnQ9XCJib2xkIFwiKzkqYStcInB4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmXCI7Yi50ZXh0QmFzZWxpbmU9XCJ0b3BcIjtiLmZpbGxTdHlsZT1sO2IuZmlsbFJlY3QoMCwwLHIsZik7Yi5maWxsU3R5bGU9aztiLmZpbGxUZXh0KGgsdCx1KTtiLmZpbGxSZWN0KGQsbSxuLHApO2IuZmlsbFN0eWxlPWw7Yi5nbG9iYWxBbHBoYT0uOTtiLmZpbGxSZWN0KGQsbSxuLHApO3JldHVybntkb206cSx1cGRhdGU6ZnVuY3Rpb24oZixcbnYpe2M9TWF0aC5taW4oYyxmKTtnPU1hdGgubWF4KGcsZik7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPTE7Yi5maWxsUmVjdCgwLDAscixtKTtiLmZpbGxTdHlsZT1rO2IuZmlsbFRleHQoZShmKStcIiBcIitoK1wiIChcIitlKGMpK1wiLVwiK2UoZykrXCIpXCIsdCx1KTtiLmRyYXdJbWFnZShxLGQrYSxtLG4tYSxwLGQsbSxuLWEscCk7Yi5maWxsUmVjdChkK24tYSxtLGEscCk7Yi5maWxsU3R5bGU9bDtiLmdsb2JhbEFscGhhPS45O2IuZmlsbFJlY3QoZCtuLWEsbSxhLGUoKDEtZi92KSpwKSl9fX07XCJvYmplY3RcIj09PXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1TdGF0cyk7XG4iXX0=
