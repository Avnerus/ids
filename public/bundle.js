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

            /*
            this.socketController = new SocketController();
            this.socketController.init(); */
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
            $('.slider').unslider({
                autoplay: true,
                delay: 5000,
                arrows: false,
                infinite: true
            });
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
    console.log("Game->Load");
    game.load(function () {
        /*
        document.getElementById('start-container').style.display = "flex";
        document.getElementById('loading-container').style.display = "none";*/
        start();
    });
};

function start() {
    document.getElementById('splash-container').style.display = "none";
    //document.getElementById('game').appendChild(stats.dom);
    game.start();
    window.addEventListener('resize', resize, false);
    window.addEventListener('vrdisplaypresentchange', resize, true);
    game.resize();
    stats.begin();
    //requestAnimationFrame(animate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29uZmlnLmpzIiwiY2xpZW50L2dhbWUuanMiLCJjbGllbnQvaW5kZXguanMiLCJjbGllbnQvc29ja2V0LWNvbnRyb2xsZXIuanMiLCJub2RlX21vZHVsZXMvYWRkLWV2ZW50LWxpc3RlbmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvZnVsbHNjcmVlbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdGF0cy5qcy9idWlsZC9zdGF0cy5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7V0NBZSxBQUNKLEFBQ1A7WSxBQUZXLEFBRUg7QUFGRyxBQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREo7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBR0k7b0JBQUEsQUFBWSxRQUFROzhCQUNoQjs7Z0JBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjthQUFBLEFBQUssU0FBTCxBQUFjLEFBQ2Q7YUFBQSxBQUFLLFVBQUwsQUFBZSxBQUNsQjs7Ozs7K0JBQ007Z0JBQUEsQUFDRyx5Q0FESDt5Q0FBQTs7eUNBQUE7MENBQUE7OzBJQUFBO0FBQUE7O3VCQUFBO3VCQUVIOztpQkFBQSxBQUFLLFVBQVUsSUFBZixBQUFlLEFBQUksQUFDbkI7bUJBQUEsQUFBTyxTQUFTLEtBQWhCLEFBQXFCLEFBR3JCOztBQUdIOzs7Ozs7NkIsQUFFSSxRQUFRLEFBRVQ7O0FBRUg7Ozs7Z0NBRU8sQUFDSjtpQkFBQSxBQUFLLEFBQ0w7Y0FBQSxBQUFFLFdBQUYsQUFBYTswQkFDVCxBQUNjLEFBQ1Y7dUJBRkosQUFFVyxBQUNQO3dCQUhKLEFBR1ksQUFDUjswQkFMUixBQUNJLEFBSWMsQUFHckI7QUFQTyxBQUNJOzs7O2dDLEFBUUosSUFBSSxBQUNSO2lCQUFBLEFBQUssT0FBTCxBQUFZLEFBQ1o7aUJBQUEs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OztBQ0FyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICB3aWR0aDogMTkyMCxcbiAgICBoZWlnaHQ6IDEwODBcbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IFNvY2tldENvbnRyb2xsZXIgZnJvbSAnLi9zb2NrZXQtY29udHJvbGxlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIGNvbnN0cnVjdGVkIVwiKVxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIGNsYXNzIEN1c3RvbUVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge31cbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEN1c3RvbUVtaXR0ZXIoKTtcbiAgICAgICAgZ2xvYmFsLmV2ZW50cyA9IHRoaXMuZW1pdHRlcjtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc29ja2V0Q29udHJvbGxlciA9IG5ldyBTb2NrZXRDb250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMuc29ja2V0Q29udHJvbGxlci5pbml0KCk7ICovXG4gICAgfVxuXG4gICAgbG9hZChvbkxvYWQpIHtcblxuICAgICAgICBvbkxvYWQoKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICAkKCcuc2xpZGVyJykudW5zbGlkZXIoXG4gICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLCBcbiAgICAgICAgICAgICAgICBkZWxheTogNTAwMCxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYW5pbWF0ZShkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZShkdCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgIH1cblxuICAgIHJlc2l6ZSgpIHtcbiAgICB9XG59XG4iLCJ2YXIgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpLmRlZmF1bHQ7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKS5kZWZhdWx0O1xudmFyIFN0YXRzID0gcmVxdWlyZSgnc3RhdHMuanMnKTtcblxudmFyIGdhbWUgPSBuZXcgR2FtZShjb25maWcpO1xudmFyIHN0YXRzID0gbmV3IFN0YXRzKCk7XG5zdGF0cy5zaG93UGFuZWwoMCk7XG5cbnZhciBmdWxsc2NyZWVuID0gcmVxdWlyZSgnZnVsbHNjcmVlbicpO1xuXG5jb25zb2xlLmxvZyhcIkxvYWRpbmcuLi5cIik7XG5nYW1lLmluaXQoKTtcbnZhciBlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxudmFyIHN0YXJ0VGltZSA9IG51bGw7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzICYmIGNkaXZpbm9uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKW5maWcuY29udHJvbHMgPT0gXCJsb2NrZWRcIiAmJiBsb2NrLmF2YWlsYWJsZSgpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwb2ludGVyID0gbG9jayhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpKTtcblxuICAgICAgICAgICAgcG9pbnRlci5vbignYXR0YWluJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb2ludGVyIGF0dGFpbmVkIVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWdhbWUuc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHBvaW50ZXIucmVxdWVzdCgpOyBcbiAgICAgICAgfSovXG5cbiAgICAgICAgXG4gICAgICAgIGlmICgwICYmIGZ1bGxzY3JlZW4uYXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgIHZhciBmcyA9IGZ1bGxzY3JlZW4oZWwpO1xuXG4gICAgICAgICAgICBmcy5vbignYXR0YWluJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZ1bGwgc2NyZWVuIGF0dGFpbmVkIVwiKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHBvaW50ZXIpICE9ICd1bmRlZmluZWQnICYmICFnYW1lLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5yZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZzLnJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vc3RhcnQoKTsgXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJHYW1lLT5Mb2FkXCIpO1xuICAgIGdhbWUubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgLypcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyovXG4gICAgICAgc3RhcnQoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaC1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpLmFwcGVuZENoaWxkKHN0YXRzLmRvbSk7XG4gICAgZ2FtZS5zdGFydCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIHJlc2l6ZSwgdHJ1ZSk7XG4gICAgZ2FtZS5yZXNpemUoKTtcbiAgICBzdGF0cy5iZWdpbigpO1xuICAgIC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuXG5cbmZ1bmN0aW9uIGFuaW1hdGUodCkge1xuICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0O1xuICAgIHZhciBkdCA9IHQgLSBzdGFydFRpbWU7XG4gICAgc3RhcnRUaW1lID0gdDtcbiAgICBzdGF0cy5iZWdpbigpO1xuICAgIGdhbWUuYW5pbWF0ZShkdCk7XG4gICAgc3RhdHMuZW5kKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gICAgZ2FtZS5yZXNpemUoKTtcbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU29ja2V0IGNvbnRyb2xsZXIgY29uc3RydWN0ZWQhXCIpXG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly8xOTIuMTY4LjEuMTU6MzAwMCcpO1xuICAgIH1cbiAgICBlbWl0KG1lc3NhZ2UsIGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIG1lc3NhZ2UgXCIsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KG1lc3NhZ2UsIGFyZ3MpO1xuICAgIH1cblxuICAgIG9uKG1lc3NhZ2UsIGZ1bmMpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQub24obWVzc2FnZSwgZnVuYyk7XG4gICAgfVxufVxuIiwiYWRkRXZlbnRMaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lclxuYWRkRXZlbnRMaXN0ZW5lci5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lclxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZEV2ZW50TGlzdGVuZXJcblxudmFyIEV2ZW50cyA9IG51bGxcblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnROYW1lLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICBFdmVudHMgPSBFdmVudHMgfHwgKFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgP1xuICAgIHthZGQ6IHN0ZEF0dGFjaCwgcm06IHN0ZERldGFjaH0gOlxuICAgIHthZGQ6IG9sZElFQXR0YWNoLCBybTogb2xkSUVEZXRhY2h9XG4gIClcbiAgXG4gIHJldHVybiBFdmVudHMuYWRkKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKVxufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gIEV2ZW50cyA9IEV2ZW50cyB8fCAoXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA/XG4gICAge2FkZDogc3RkQXR0YWNoLCBybTogc3RkRGV0YWNofSA6XG4gICAge2FkZDogb2xkSUVBdHRhY2gsIHJtOiBvbGRJRURldGFjaH1cbiAgKVxuICBcbiAgcmV0dXJuIEV2ZW50cy5ybShlbCwgZXZlbnROYW1lLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSlcbn1cblxuZnVuY3Rpb24gc3RkQXR0YWNoKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSlcbn1cblxuZnVuY3Rpb24gc3RkRGV0YWNoKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSlcbn1cblxuZnVuY3Rpb24gb2xkSUVBdHRhY2goZWwsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgaWYodXNlQ2FwdHVyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IHVzZUNhcHR1cmUgaW4gb2xkSUUnKVxuICB9XG5cbiAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgbGlzdGVuZXIpXG59XG5cbmZ1bmN0aW9uIG9sZElFRGV0YWNoKGVsLCBldmVudE5hbWUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gIGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGxpc3RlbmVyKVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdWxsc2NyZWVuXG5mdWxsc2NyZWVuLmF2YWlsYWJsZSA9IGF2YWlsYWJsZVxuZnVsbHNjcmVlbi5lbmFibGVkID0gZW5hYmxlZFxuXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbnZhciBhZWwgPSByZXF1aXJlKCdhZGQtZXZlbnQtbGlzdGVuZXInKVxudmFyIHJlbCA9IGFlbC5yZW1vdmVFdmVudExpc3RlbmVyXG5cbmZ1bmN0aW9uIGF2YWlsYWJsZSgpIHtcbiAgcmV0dXJuICEhc2hpbShkb2N1bWVudC5ib2R5KVxufVxuXG5mdW5jdGlvbiBlbmFibGVkKCkge1xuICByZXR1cm4gISEoZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQgfHxcbiAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCB8fFxuICAgIGRvY3VtZW50Lm1vekZ1bGxzY3JlZW5FbmFibGVkIHx8XG4gICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZCk7XG59XG5cbmZ1bmN0aW9uIGZ1bGxzY3JlZW4oZWwpIHtcbiAgdmFyIGRvYyA9IGVsLm93bmVyRG9jdW1lbnRcbiAgICAsIGJvZHkgPSBkb2MuYm9keVxuICAgICwgcmZzID0gc2hpbShlbClcbiAgICAsIGVlID0gbmV3IEVFXG5cbiAgdmFyIHZlbmRvcnMgPSBbJycsICd3ZWJraXQnLCAnbW96J11cblxuICBmb3IodmFyIGkgPSAwLCBsZW4gPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgYWVsKGRvYywgdmVuZG9yc1tpXSArICdmdWxsc2NyZWVuY2hhbmdlJywgb25mdWxsc2NyZWVuY2hhbmdlKVxuICAgIGFlbChkb2MsIHZlbmRvcnNbaV0gKyAnZnVsbHNjcmVlbmVycm9yJywgb25mdWxsc2NyZWVuZXJyb3IpXG4gIH1cbiAgLy8gTVMgdXNlcyBkaWZmZXJlbnQgY2FzaW5nOlxuICBhZWwoZG9jLCAnTVNGdWxsc2NyZWVuQ2hhbmdlJywgb25mdWxsc2NyZWVuY2hhbmdlKVxuICBhZWwoZG9jLCAnTVNGdWxsc2NyZWVuRXJyb3InLCBvbmZ1bGxzY3JlZW5lcnJvcilcblxuICBlZS5yZWxlYXNlID0gcmVsZWFzZVxuICBlZS5yZXF1ZXN0ID0gcmVxdWVzdFxuICBlZS5kaXNwb3NlID0gZGlzcG9zZVxuICBlZS50YXJnZXQgPSBmdWxsc2NyZWVuZWxlbWVudFxuXG4gIGlmKCFzaGltKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGVlLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdmdWxsc2NyZWVuIGlzIG5vdCBzdXBwb3J0ZWQnKSlcbiAgICB9LCAwKVxuICB9XG4gIHJldHVybiBlZVxuXG4gIGZ1bmN0aW9uIG9uZnVsbHNjcmVlbmNoYW5nZSgpIHtcbiAgICBpZighZnVsbHNjcmVlbmVsZW1lbnQoKSkge1xuICAgICAgcmV0dXJuIGVlLmVtaXQoJ3JlbGVhc2UnKVxuICAgIH1cbiAgICBlZS5lbWl0KCdhdHRhaW4nKVxuICB9XG5cbiAgZnVuY3Rpb24gb25mdWxsc2NyZWVuZXJyb3IoKSB7XG4gICAgZWUuZW1pdCgnZXJyb3InKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVxdWVzdCgpIHtcbiAgICByZXR1cm4gcmZzLmFwcGx5KGVsLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlKCkge1xuXG4gICAgdmFyIGVsZW1lbnRfZXhpdCA9IChlbC5leGl0RnVsbHNjcmVlbiB8fFxuICAgICAgZWwud2Via2l0RXhpdEZ1bGxzY3JlZW4gfHxcbiAgICAgIGVsLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgIGVsLm1vekV4aXRGdWxsU2NyZWVuIHx8XG4gICAgICBlbC5tc0V4aXRGdWxsc2NyZWVuKTtcblxuICAgIGlmIChlbGVtZW50X2V4aXQpIHtcbiAgICAgIGVsZW1lbnRfZXhpdC5hcHBseShlbCwgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZG9jdW1lbnRfZXhpdCA9IChkb2MuZXhpdEZ1bGxzY3JlZW4gfHxcbiAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbiB8fFxuICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgIGRvYy5tb3pFeGl0RnVsbFNjcmVlbiB8fFxuICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4pO1xuXG4gICAgZG9jdW1lbnRfZXhpdC5hcHBseShkb2MsIGFyZ3VtZW50cyk7XG4gIH0gXG5cbiAgZnVuY3Rpb24gZnVsbHNjcmVlbmVsZW1lbnQoKSB7XG4gICAgcmV0dXJuICgwIHx8XG4gICAgICBkb2MuZnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgIGRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XG4gICAgICBkb2MubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgbnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHZlbmRvcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHJlbChkb2MsIHZlbmRvcnNbaV0gKyAnZnVsbHNjcmVlbmNoYW5nZScsIG9uZnVsbHNjcmVlbmNoYW5nZSlcbiAgICAgIHJlbChkb2MsIHZlbmRvcnNbaV0gKyAnZnVsbHNjcmVlbmVycm9yJywgb25mdWxsc2NyZWVuZXJyb3IpXG4gICAgfVxuICAgIC8vIE1TIHVzZXMgZGlmZmVyZW50IGNhc2luZzpcbiAgICByZWwoZG9jLCAnTVNGdWxsc2NyZWVuQ2hhbmdlJywgb25mdWxsc2NyZWVuY2hhbmdlKVxuICAgIHJlbChkb2MsICdNU0Z1bGxzY3JlZW5FcnJvcicsIG9uZnVsbHNjcmVlbmVycm9yKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNoaW0oZWwpIHtcbiAgcmV0dXJuIChlbC5yZXF1ZXN0RnVsbHNjcmVlbiB8fFxuICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIHx8XG4gICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICBlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKTtcbn1cbiIsIi8vIHN0YXRzLmpzIC0gaHR0cDovL2dpdGh1Yi5jb20vbXJkb29iL3N0YXRzLmpzXG52YXIgU3RhdHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBoKGEpe2MuYXBwZW5kQ2hpbGQoYS5kb20pO3JldHVybiBhfWZ1bmN0aW9uIGsoYSl7Zm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspYy5jaGlsZHJlbltkXS5zdHlsZS5kaXNwbGF5PWQ9PT1hP1wiYmxvY2tcIjpcIm5vbmVcIjtsPWF9dmFyIGw9MCxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yy5zdHlsZS5jc3NUZXh0PVwicG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MC45O3otaW5kZXg6MTAwMDBcIjtjLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKTtrKCsrbCVjLmNoaWxkcmVuLmxlbmd0aCl9LCExKTt2YXIgZz0ocGVyZm9ybWFuY2V8fERhdGUpLm5vdygpLGU9ZyxhPTAscj1oKG5ldyBTdGF0cy5QYW5lbChcIkZQU1wiLFwiIzBmZlwiLFwiIzAwMlwiKSksZj1oKG5ldyBTdGF0cy5QYW5lbChcIk1TXCIsXCIjMGYwXCIsXCIjMDIwXCIpKTtcbmlmKHNlbGYucGVyZm9ybWFuY2UmJnNlbGYucGVyZm9ybWFuY2UubWVtb3J5KXZhciB0PWgobmV3IFN0YXRzLlBhbmVsKFwiTUJcIixcIiNmMDhcIixcIiMyMDFcIikpO2soMCk7cmV0dXJue1JFVklTSU9OOjE2LGRvbTpjLGFkZFBhbmVsOmgsc2hvd1BhbmVsOmssYmVnaW46ZnVuY3Rpb24oKXtnPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCl9LGVuZDpmdW5jdGlvbigpe2ErKzt2YXIgYz0ocGVyZm9ybWFuY2V8fERhdGUpLm5vdygpO2YudXBkYXRlKGMtZywyMDApO2lmKGM+ZSsxRTMmJihyLnVwZGF0ZSgxRTMqYS8oYy1lKSwxMDApLGU9YyxhPTAsdCkpe3ZhciBkPXBlcmZvcm1hbmNlLm1lbW9yeTt0LnVwZGF0ZShkLnVzZWRKU0hlYXBTaXplLzEwNDg1NzYsZC5qc0hlYXBTaXplTGltaXQvMTA0ODU3Nil9cmV0dXJuIGN9LHVwZGF0ZTpmdW5jdGlvbigpe2c9dGhpcy5lbmQoKX0sZG9tRWxlbWVudDpjLHNldE1vZGU6a319O1xuU3RhdHMuUGFuZWw9ZnVuY3Rpb24oaCxrLGwpe3ZhciBjPUluZmluaXR5LGc9MCxlPU1hdGgucm91bmQsYT1lKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSxyPTgwKmEsZj00OCphLHQ9MyphLHU9MiphLGQ9MyphLG09MTUqYSxuPTc0KmEscD0zMCphLHE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtxLndpZHRoPXI7cS5oZWlnaHQ9ZjtxLnN0eWxlLmNzc1RleHQ9XCJ3aWR0aDo4MHB4O2hlaWdodDo0OHB4XCI7dmFyIGI9cS5nZXRDb250ZXh0KFwiMmRcIik7Yi5mb250PVwiYm9sZCBcIis5KmErXCJweCBIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZlwiO2IudGV4dEJhc2VsaW5lPVwidG9wXCI7Yi5maWxsU3R5bGU9bDtiLmZpbGxSZWN0KDAsMCxyLGYpO2IuZmlsbFN0eWxlPWs7Yi5maWxsVGV4dChoLHQsdSk7Yi5maWxsUmVjdChkLG0sbixwKTtiLmZpbGxTdHlsZT1sO2IuZ2xvYmFsQWxwaGE9Ljk7Yi5maWxsUmVjdChkLG0sbixwKTtyZXR1cm57ZG9tOnEsdXBkYXRlOmZ1bmN0aW9uKGYsXG52KXtjPU1hdGgubWluKGMsZik7Zz1NYXRoLm1heChnLGYpO2IuZmlsbFN0eWxlPWw7Yi5nbG9iYWxBbHBoYT0xO2IuZmlsbFJlY3QoMCwwLHIsbSk7Yi5maWxsU3R5bGU9aztiLmZpbGxUZXh0KGUoZikrXCIgXCIraCtcIiAoXCIrZShjKStcIi1cIitlKGcpK1wiKVwiLHQsdSk7Yi5kcmF3SW1hZ2UocSxkK2EsbSxuLWEscCxkLG0sbi1hLHApO2IuZmlsbFJlY3QoZCtuLWEsbSxhLHApO2IuZmlsbFN0eWxlPWw7Yi5nbG9iYWxBbHBoYT0uOTtiLmZpbGxSZWN0KGQrbi1hLG0sYSxlKCgxLWYvdikqcCkpfX19O1wib2JqZWN0XCI9PT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9U3RhdHMpO1xuIl19
