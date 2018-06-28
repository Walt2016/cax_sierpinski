(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _cax = require('./cax');

var _cax2 = _interopRequireDefault(_cax);

var _tpler = require('./tpler');

var _tpler2 = _interopRequireDefault(_tpler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = document.documentElement;
var w = screen.clientWidth;
var h = screen.clientHeight;
var stage = new _cax2.default.Stage(w, h, '#renderTo');
var graphics = new _cax2.default.Graphics();
stage.add(graphics);

var link = function link(vs, color) {
    graphics.beginPath();
    vs.forEach(function (t, i) {
        graphics[i === 0 ? "moveTo" : "lineTo"](t.x, t.y);
    });
    graphics.closePath().strokeStyle(color).stroke();
};
var linkGroup = function linkGroup(vsGroup, color) {
    vsGroup.forEach(function (vs) {
        link(vs, color);
    });
};
var sierpinski = function sierpinski(vertex) {
    var vs = vertex.vs,
        vsGroup = [vs];
    var invertices = function invertices(vs) {
        var vs2 = vertex.invertices(vs);
        if (vs2) {
            vsGroup.push(vs2);
            vs.forEach(function (t, i) {
                var vs3 = [t, vs2[i], vs2[i === 0 ? vs2.length - 1 : i - 1]];
                invertices(vs3);
            });
        }
    };
    invertices(vs);
    return vsGroup;
};
var o = {
    x: w / 2,
    y: h / 2,
    vx: (Math.random() * 2 - 1) * 1,
    vy: (Math.random() * 2 - 1) * 1
};
var opt = {
    r: 100,
    a: 45,
    num: 4,
    x: o.x,
    y: o.y
};
var angle = 0;
var update = function update(o, n) {
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;

    _.extend(opt, {
        a: angle++,
        num: n,
        r: r,
        x: o.x,
        y: o.y
    });
    var colors = _.color.circle(n);
    _.vertex(opt).vs.forEach(function (t, i) {
        var vt = _.vertex(_.extend(opt, { x: t.x, y: t.y }));
        linkGroup(sierpinski(vt), colors[i]);
    });
    stage.update();
};
var move = function move(o) {
    o.x += o.vx;
    o.y += o.vy;
    if (o.x >= w) {
        o.vx *= -1;
    }
    if (o.x <= 0) {
        o.vx *= -1;
    }
    if (o.y >= h) {
        o.vy *= -1;
    }
    if (o.y <= 0) {
        o.vy *= -1;
    }
};

var loop = function loop() {
    requestAnimationFrame(loop);
    // setTimeout(loop,17)
    move(o);
    graphics.fillStyle('rgba(0,0,0,0.05)').fillRect(0, 0, w, h);
    update(o, 4, 60);
};
_.vertex(opt).vs.forEach(function (t, i) {
    return update(t, i + 3);
});
setTimeout(loop, 2000);

},{"./cax":2,"./tpler":3}],2:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 *  cax v1.0.14
 *  By https://github.com/dntzhang 
 *  Github: https://github.com/dntzhang/cax
 *  MIT Licensed.
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["cax"] = factory();else root["cax"] = factory();
})(typeof self !== 'undefined' ? self : undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 16);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

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

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _graphics = __webpack_require__(3);

      var _graphics2 = _interopRequireDefault(_graphics);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Shape = function (_Graphics) {
        _inherits(Shape, _Graphics);

        function Shape() {
          _classCallCheck(this, Shape);

          return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).apply(this, arguments));
        }

        _createClass(Shape, [{
          key: 'draw',

          // constructor() {
          //     super()
          // }

          value: function draw() {}
        }, {
          key: 'render',
          value: function render(ctx) {
            this.clear();
            this.draw();
            _get(Shape.prototype.__proto__ || Object.getPrototypeOf(Shape.prototype), 'render', this).call(this, ctx);
          }
        }, {
          key: 'cache',
          value: function cache(x, y, width, height, debug) {
            x = x || 0;
            y = y || 0;
            width = width || this.width;
            height = height || this.height;
            if (typeof wx !== 'undefined' && wx.createCanvas) {
              this.cacheCanvas = wx.createCanvas();
            } else {
              this.cacheCanvas = document.createElement('canvas');
            }
            this.cacheCanvas.width = width;
            this.cacheCanvas.height = height;
            this.cacheCtx = this.cacheCanvas.getContext('2d');
            this.cacheCtx.setTransform(1, 0, 0, 1, x, y);

            if (debug) {
              this.cacheCtx.save();
              this.cacheCtx.fillStyle = 'red';
              this.cacheCtx.fillRect(0, 0, width, height);
              this.cacheCtx.restore();
            }

            this.render(this.cacheCtx);
          }
        }, {
          key: 'uncache',
          value: function uncache() {
            this.cacheCanvas = null;
          }
        }]);

        return Shape;
      }(_graphics2.default);

      exports.default = Shape;

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

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

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _displayObject = __webpack_require__(2);

      var _displayObject2 = _interopRequireDefault(_displayObject);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Group = function (_DisplayObject) {
        _inherits(Group, _DisplayObject);

        function Group(data) {
          _classCallCheck(this, Group);

          var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, data));

          _this.children = [];
          return _this;
        }

        _createClass(Group, [{
          key: 'add',
          value: function add(child) {
            var len = arguments.length;

            for (var i = 0; i < len; i++) {
              this.children.push(arguments[i]);
              arguments[i].parent = this;
            }
          }
        }, {
          key: 'addChildAt',
          value: function addChildAt(child, index) {
            var par = child.parent;
            par && par.removeChildAt(par.children.indexOf(child));
            child.parent = this;
            this.children.splice(index, 0, child);
          }
        }, {
          key: 'removeChildAt',
          value: function removeChildAt(index) {
            var child = this.children[index];
            if (child) {
              child.parent = null;
            }
            this.children.splice(index, 1);
          }
        }, {
          key: 'replace',
          value: function replace(current, pre) {
            var index = pre.parent.children.indexOf(pre);
            this.removeChildAt(index);
            this.addChildAt(current, index);
          }
        }, {
          key: 'remove',
          value: function remove(child) {
            var len = arguments.length;
            var cLen = this.children.length;

            for (var i = 0; i < len; i++) {
              for (var j = 0; j < cLen; j++) {
                if (child.id === this.children[j].id) {
                  child.parent = null;
                  this.children.splice(j, 1);
                  j--;
                  cLen--;
                }
              }
            }
          }
        }, {
          key: 'empty',
          value: function empty() {
            this.children.forEach(function (child) {
              child.parent = null;
            });
            this.children.length = 0;
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.empty();
            _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'destroy', this).call(this);
          }
        }]);

        return Group;
      }(_displayObject2.default);

      exports.default = Group;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

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

      var _matrix2d = __webpack_require__(20);

      var _matrix2d2 = _interopRequireDefault(_matrix2d);

      var _eventDispatcher = __webpack_require__(21);

      var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

      var _uid = __webpack_require__(22);

      var _uid2 = _interopRequireDefault(_uid);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var DisplayObject = function (_EventDispatcher) {
        _inherits(DisplayObject, _EventDispatcher);

        function DisplayObject() {
          _classCallCheck(this, DisplayObject);

          var _this = _possibleConstructorReturn(this, (DisplayObject.__proto__ || Object.getPrototypeOf(DisplayObject)).call(this));

          _this.alpha = _this.complexAlpha = _this.scaleX = _this.scaleY = 1;
          _this.x = _this.y = _this.rotation = _this.skewX = _this.skewY = _this.originX = _this.originY = 0;
          _this.cursor = null;
          _this.visible = true;
          _this._matrix = new _matrix2d2.default();
          _this._hitMatrix = new _matrix2d2.default();
          _this.id = _uid2.default.get();
          _this.clipGraphics = null;
          _this.clipRuleNonzero = true;
          return _this;
        }

        _createClass(DisplayObject, [{
          key: 'isVisible',
          value: function isVisible() {
            return this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0;
          }
        }, {
          key: 'initAABB',
          value: function initAABB() {
            if (this.width === undefined || this.height === undefined) {
              return;
            }

            var x = void 0,
                y = void 0,
                width = this.width,
                height = this.height,
                mtx = this._matrix,
                xA = width * mtx.a,
                xB = width * mtx.b,
                yC = height * mtx.c,
                yD = height * mtx.d,
                tx = mtx.tx,
                ty = mtx.ty,
                minX = tx,
                maxX = tx,
                minY = ty,
                maxY = ty;

            if ((x = xA + tx) < minX) {
              minX = x;
            } else if (x > maxX) {
              maxX = x;
            }
            if ((x = xA + yC + tx) < minX) {
              minX = x;
            } else if (x > maxX) {
              maxX = x;
            }
            if ((x = yC + tx) < minX) {
              minX = x;
            } else if (x > maxX) {
              maxX = x;
            }
            if ((y = xB + ty) < minY) {
              minY = y;
            } else if (y > maxY) {
              maxY = y;
            }
            if ((y = xB + yD + ty) < minY) {
              minY = y;
            } else if (y > maxY) {
              maxY = y;
            }
            if ((y = yD + ty) < minY) {
              minY = y;
            } else if (y > maxY) {
              maxY = y;
            }
            this.AABB = [minX, minY, maxX - minX, maxY - minY];
            this.rectPoints = [{
              x: tx,
              y: ty
            }, {
              x: xA + tx,
              y: xB + ty
            }, {
              x: xA + yC + tx,
              y: xB + yD + ty
            }, {
              x: yC + tx,
              y: yD + ty
            }];
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.parent.remove(this);
          }
        }, {
          key: 'hover',
          value: function hover(over, out, move) {
            this.on('mouseover', over);
            this.on('mouseout', out);
            move && this.on('mousemove', move);
          }

          // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip

        }, {
          key: 'clip',
          value: function clip(graphics, notClipRuleNonzero) {
            this.clipGraphics = graphics;
            this.clipRuleNonzero = !notClipRuleNonzero;
          }
        }, {
          key: 'unclip',
          value: function unclip() {
            this.clipGraphics = null;
          }
        }]);

        return DisplayObject;
      }(_eventDispatcher2.default);

      exports.default = DisplayObject;

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

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

      var _displayObject = __webpack_require__(2);

      var _displayObject2 = _interopRequireDefault(_displayObject);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var assMap = {
        fillStyle: true,
        strokeStyle: true,
        lineWidth: true,
        lineCap: true,
        lineDashOffset: true,
        lineJoin: true,
        miterLimit: true
      };

      var Graphics = function (_DisplayObject) {
        _inherits(Graphics, _DisplayObject);

        function Graphics() {
          _classCallCheck(this, Graphics);

          var _this = _possibleConstructorReturn(this, (Graphics.__proto__ || Object.getPrototypeOf(Graphics)).call(this));

          _this.cmds = [];
          _this.currentGradient = null;
          return _this;
        }

        _createClass(Graphics, [{
          key: 'clearRect',
          value: function clearRect() {
            this.cmds.push(['clearRect', arguments]);
            return this;
          }
        }, {
          key: 'rect',
          value: function rect() {
            this.cmds.push(['rect', arguments]);
            return this;
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.cmds.length = 0;
            return this;
          }
        }, {
          key: 'setLineDash',
          value: function setLineDash() {
            this.cmds.push(['setLineDash', arguments]);
            return this;
          }
        }, {
          key: 'strokeRect',
          value: function strokeRect() {
            this.cmds.push(['strokeRect', arguments]);
            return this;
          }
        }, {
          key: 'fillRect',
          value: function fillRect() {
            this.cmds.push(['fillRect', arguments]);
            return this;
          }
        }, {
          key: 'beginPath',
          value: function beginPath() {
            this.cmds.push(['beginPath', arguments]);
            return this;
          }
        }, {
          key: 'arc',
          value: function arc() {
            this.cmds.push(['arc', arguments]);
            return this;
          }
        }, {
          key: 'closePath',
          value: function closePath() {
            this.cmds.push(['closePath', arguments]);
            return this;
          }
        }, {
          key: 'fillStyle',
          value: function fillStyle() {
            this.cmds.push(['fillStyle', arguments]);
            return this;
          }
        }, {
          key: 'fill',
          value: function fill() {
            this.cmds.push(['fill', arguments]);
            return this;
          }
        }, {
          key: 'strokeStyle',
          value: function strokeStyle() {
            this.cmds.push(['strokeStyle', arguments]);
            return this;
          }
        }, {
          key: 'lineWidth',
          value: function lineWidth() {
            this.cmds.push(['lineWidth', arguments]);
            return this;
          }
        }, {
          key: 'lineCap',
          value: function lineCap() {
            this.cmds.push(['lineCap', arguments]);
            return this;
          }
        }, {
          key: 'lineDashOffset',
          value: function lineDashOffset() {
            this.cmds.push(['lineDashOffset', arguments]);
            return this;
          }
        }, {
          key: 'lineJoin',
          value: function lineJoin() {
            this.cmds.push(['lineJoin', arguments]);
            return this;
          }
        }, {
          key: 'miterLimit',
          value: function miterLimit() {
            this.cmds.push(['miterLimit', arguments]);
            return this;
          }
        }, {
          key: 'stroke',
          value: function stroke() {
            this.cmds.push(['stroke', arguments]);
            return this;
          }
        }, {
          key: 'moveTo',
          value: function moveTo() {
            this.cmds.push(['moveTo', arguments]);
            return this;
          }
        }, {
          key: 'lineTo',
          value: function lineTo() {
            this.cmds.push(['lineTo', arguments]);
            return this;
          }
        }, {
          key: 'bezierCurveTo',
          value: function bezierCurveTo() {
            this.cmds.push(['bezierCurveTo', arguments]);
            return this;
          }
        }, {
          key: 'quadraticCurveTo',
          value: function quadraticCurveTo() {
            this.cmds.push(['quadraticCurveTo', arguments]);
            return this;
          }
        }, {
          key: 'createRadialGradient',
          value: function createRadialGradient() {
            this.cmds.push(['createRadialGradient', arguments]);
            return this;
          }
        }, {
          key: 'createLinearGradient',
          value: function createLinearGradient() {
            this.cmds.push(['createLinearGradient', arguments]);
            return this;
          }
        }, {
          key: 'addColorStop',
          value: function addColorStop() {
            this.cmds.push(['addColorStop', arguments]);
            return this;
          }
        }, {
          key: 'fillGradient',
          value: function fillGradient() {
            this.cmds.push(['fillGradient']);
            return this;
          }
        }, {
          key: 'arcTo',
          value: function arcTo() {
            this.cmds.push(['arcTo', arguments]);
            return this;
          }
        }, {
          key: 'render',
          value: function render(ctx) {
            var _this2 = this;

            this.cmds.forEach(function (cmd) {
              var methodName = cmd[0];
              if (assMap[methodName]) {
                ctx[methodName] = cmd[1][0];
              } else if (methodName === 'addColorStop') {
                _this2.currentGradient && _this2.currentGradient.addColorStop(cmd[1][0], cmd[1][1]);
              } else if (methodName === 'fillGradient') {
                ctx.fillStyle = _this2.currentGradient;
              } else {
                var result = ctx[methodName].apply(ctx, Array.prototype.slice.call(cmd[1]));
                if (methodName === 'createRadialGradient' || methodName === 'createLinearGradient') {
                  _this2.currentGradient = result;
                }
              }
            });
          }
        }]);

        return Graphics;
      }(_displayObject2.default);

      exports.default = Graphics;

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

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

      var _displayObject = __webpack_require__(2);

      var _displayObject2 = _interopRequireDefault(_displayObject);

      var _util = __webpack_require__(9);

      var _util2 = _interopRequireDefault(_util);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var measureCtx = _util2.default.isWeapp || _util2.default.isWegame ? null : document.createElement('canvas').getContext('2d');

      var Text = function (_DisplayObject) {
        _inherits(Text, _DisplayObject);

        function Text(text, option) {
          _classCallCheck(this, Text);

          var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

          _this.text = text;
          option = option || {};
          _this.font = option.font;
          _this.color = option.color;

          _this.baseline = option.baseline || 'top';
          return _this;
        }

        _createClass(Text, [{
          key: 'getWidth',
          value: function getWidth() {
            measureCtx.font = this.font;
            return measureCtx.measureText(this.text).width;
          }
        }, {
          key: 'cache',
          value: function cache(x, y, width, height, debug) {
            x = x || 0;
            y = y || 0;
            width = width || this.width;
            height = height || this.height;
            if (typeof wx !== 'undefined' && wx.createCanvas) {
              this.cacheCanvas = wx.createCanvas();
            } else {
              this.cacheCanvas = document.createElement('canvas');
            }
            this.cacheCanvas.width = width;
            this.cacheCanvas.height = height;
            this.cacheCtx = this.cacheCanvas.getContext('2d');
            this.cacheCtx.setTransform(1, 0, 0, 1, x, y);
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.font = this.font;
            this.cacheCtx.textBaseline = this.baseline;

            if (debug) {
              this.cacheCtx.save();
              this.cacheCtx.fillStyle = 'red';
              this.cacheCtx.fillRect(0, 0, width, height);
              this.cacheCtx.restore();
            }

            this.cacheCtx.fillText(this.text, 0, 0);
          }
        }, {
          key: 'uncache',
          value: function uncache() {
            this.cacheCanvas = null;
          }
        }]);

        return Text;
      }(_displayObject2.default);

      exports.default = Text;

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

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

      var _displayObject = __webpack_require__(2);

      var _displayObject2 = _interopRequireDefault(_displayObject);

      var _util = __webpack_require__(9);

      var _util2 = _interopRequireDefault(_util);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Sprite = function (_DisplayObject) {
        _inherits(Sprite, _DisplayObject);

        function Sprite(option) {
          _classCallCheck(this, Sprite);

          var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

          _this.option = option;
          var len = _this.option.imgs.length;
          var count = 0;

          _this.imgMap = {};

          if (_util2.default.isWeapp) {
            _this.option.imgs.forEach(function (img) {
              _util2.default.getImageInWx(img, function (result) {
                _this.imgMap[img] = result.img;
                count++;
                if (count === len) {
                  _this.img = _this.imgMap[_this.option.imgs[0]];
                  _this.rect = [0, 0, result.width, result.height];
                }
              });
            });
          } else {
            if (typeof _this.option.imgs[0] === 'string') {
              var _len = _this.option.imgs.length;
              var loadedCount = 0;
              _this.option.imgs.forEach(function (src) {
                var img = _util2.default.isWegame ? wx.createImage() : new window.Image();
                img.onload = function () {
                  _this.imgMap[src] = img;
                  loadedCount++;
                  if (loadedCount === _len) {
                    _this.img = _this.imgMap[_this.option.imgs[0]];
                    _this.rect = [0, 0, _this.img.width, _this.img.height];
                  }
                };
                img.src = src;
              });
            } else {
              _this.rect = [0, 0, 0, 0];
              _this.img = _this.option.imgs[0];
            }
          }

          _this.x = option.x || 0;
          _this.y = option.y || 0;
          _this.currentFrameIndex = 0;
          _this.animationFrameIndex = 0;
          _this.currentAnimation = option.currentAnimation || null;

          _this.interval = 1e3 / option.framerate;

          _this.paused = false;
          _this.animationEnd = option.animationEnd || function () {};
          if (_this.currentAnimation) {
            if (option.playOnce) {
              _this.gotoAndPlayOnce(_this.currentAnimation);
            } else {
              _this.gotoAndPlay(_this.currentAnimation);
            }
          }
          return _this;
        }

        _createClass(Sprite, [{
          key: 'play',
          value: function play() {
            this.paused = false;
          }
        }, {
          key: 'pause',
          value: function pause() {
            this.paused = true;
          }
        }, {
          key: 'reset',
          value: function reset() {
            this.currentFrameIndex = 0;
            this.animationFrameIndex = 0;
          }
        }, {
          key: 'updateFrame',
          value: function updateFrame() {
            if (!this.paused) {
              var opt = this.option;
              this.dt = Date.now() - this.startTime;
              var frames = opt.animations[this.currentAnimation].frames;
              var len = frames.length;
              var index = Math.floor(this.dt / this.interval % len);
              this.rect = opt.frames[frames[index]];
              var rectLen = this.rect.length;

              rectLen > 4 && (this.originX = this.rect[2] * this.rect[4]);
              rectLen > 5 && (this.originY = this.rect[3] * this.rect[5]);
              rectLen > 6 && (this.img = this.imgMap[this.option.imgs[this.rect[6]]]);

              if (index === len - 1 && (!this.endTime || Date.now() - this.endTime > this.interval)) {
                this.endTime = Date.now();
                this.animationEnd();
                if (this._willDestroy) {
                  this.destroy();
                }
              }
            }
          }
        }, {
          key: 'gotoAndPlay',
          value: function gotoAndPlay(animation) {
            this.paused = false;
            this.reset();
            this.currentAnimation = animation;
            this.startTime = Date.now();
          }
        }, {
          key: 'gotoAndStop',
          value: function gotoAndStop(animation) {
            this.reset();
            this.paused = true;
            this.currentAnimation = animation;
            var opt = this.option;
            var frames = opt.animations[this.currentAnimation].frames;
            this.rect = opt.frames[frames[this.animationFrameIndex]];
            var rect = this.rect;
            this.width = rect[2];
            this.height = rect[3];
            var rectLen = rect.length;
            rectLen > 4 && (this.originX = rect[2] * rect[4]);
            rectLen > 5 && (this.originY = rect[3] * rect[5]);
            rectLen > 6 && (this.img = this.imgMap[this.option.imgs[rect[6]]]);
          }
        }, {
          key: 'gotoAndPlayOnce',
          value: function gotoAndPlayOnce(animation) {
            this.gotoAndPlay(animation);
            this._willDestroy = true;
          }
        }]);

        return Sprite;
      }(_displayObject2.default);

      exports.default = Sprite;

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

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

      var _displayObject = __webpack_require__(2);

      var _displayObject2 = _interopRequireDefault(_displayObject);

      var _util = __webpack_require__(9);

      var _util2 = _interopRequireDefault(_util);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Bitmap = function (_DisplayObject) {
        _inherits(Bitmap, _DisplayObject);

        function Bitmap(img, onLoad) {
          _classCallCheck(this, Bitmap);

          var _this = _possibleConstructorReturn(this, (Bitmap.__proto__ || Object.getPrototypeOf(Bitmap)).call(this));

          if (typeof img === 'string') {
            if (Bitmap.cache[img]) {
              _this.img = Bitmap.cache[img];
              _this.rect = [0, 0, _this.img.width, _this.img.height];
              onLoad && onLoad.call(_this);
              _this.width = _this.img.width;
              _this.height = _this.img.height;
            } else if (_util2.default.isWeapp) {
              _util2.default.getImageInWx(img, function (result) {
                _this.img = result.img;
                if (!_this.rect) {
                  _this.rect = [0, 0, result.width, result.height];
                }
                onLoad && onLoad.call(_this);
                Bitmap.cache[img] = result.img;
              });
            } else {
              _this.img = _util2.default.isWegame ? wx.createImage() : new window.Image();
              _this.visible = false;
              _this.img.onload = function () {
                _this.visible = true;
                if (!_this.rect) {
                  _this.rect = [0, 0, _this.img.width, _this.img.height];
                }
                _this.width = _this.img.width;
                _this.height = _this.img.height;
                onLoad && onLoad.call(_this);
                Bitmap.cache[img] = _this.img;
              };
              _this.img.src = img;
            }
          } else {
            _this.img = img;
            _this.rect = [0, 0, img.width, img.height];
            _this.width = img.width;
            _this.height = img.height;
            Bitmap.cache[img.src] = img;
          }
          return _this;
        }

        _createClass(Bitmap, [{
          key: 'clone',
          value: function clone() {
            var bitmap = new Bitmap(this.img);
            bitmap.x = this.x;
            bitmap.y = this.y;

            bitmap.scaleX = this.scaleX;
            bitmap.scaleY = this.scaleY;
            bitmap.rotation = this.rotation;
            bitmap.skewX = this.skewX;
            bitmap.skewY = this.skewY;
            bitmap.originX = this.originX;
            bitmap.originY = this.originY;
            bitmap.width = this.width;
            bitmap.height = this.height;

            return bitmap;
          }
        }]);

        return Bitmap;
      }(_displayObject2.default);

      Bitmap.cache = {};

      exports.default = Bitmap;

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

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

      var Event = function () {
        function Event() {
          _classCallCheck(this, Event);

          this.propagationStopped = false;
          this.stageX = null;
          this.stageY = null;
          this.pureEvent = null;
        }

        _createClass(Event, [{
          key: "stopPropagation",
          value: function stopPropagation() {
            this.propagationStopped = true;
          }
        }, {
          key: "preventDefault",
          value: function preventDefault() {
            this.pureEvent.preventDefault();
          }
        }]);

        return Event;
      }();

      exports.default = Event;

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

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

      var Render = function () {
        function Render() {
          _classCallCheck(this, Render);
        }

        _createClass(Render, [{
          key: "render",
          value: function render() {}
        }, {
          key: "renderGraphics",
          value: function renderGraphics() {}
        }, {
          key: "clear",
          value: function clear() {}
        }]);

        return Render;
      }();

      exports.default = Render;

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */
      (function (global) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        };

        exports.getImageInWx = getImageInWx;
        function getImageInWx(img, callback) {
          if (img.indexOf('https://') === -1 && img.indexOf('http://') === -1) {
            wx.getImageInfo({
              src: img,
              success: function success(info) {
                callback({
                  img: img,
                  width: info.width,
                  height: info.height
                });
              }
            });
          } else {
            wx.downloadFile({
              url: img,
              success: function success(res) {
                if (res.statusCode === 200) {
                  wx.getImageInfo({
                    src: res.tempFilePath,
                    success: function success(info) {
                      callback({
                        img: res.tempFilePath,
                        width: info.width,
                        height: info.height
                      });
                    }
                  });
                }
              }
            });
          }
        }

        function getGlobal() {
          if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
            if (typeof self !== 'undefined') {
              return self;
            } else if (typeof window !== 'undefined') {
              return window;
            } else if (typeof global !== 'undefined') {
              return global;
            }
            return function () {
              return this;
            }();
          }
          return global;
        }

        var root = getGlobal();

        exports.default = {
          getImageInWx: getImageInWx,
          root: root,
          isWeapp: typeof wx !== 'undefined' && !wx.createCanvas,
          isWegame: typeof wx !== 'undefined' && wx.createCanvas
        };
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(24));

      /***/
    },
    /* 10 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */
      (function (process) {

        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        };

        /**
         * Tween.js - Licensed under the MIT license
         * https://github.com/tweenjs/tween.js
         * ----------------------------------------------
         *
         * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
         * Thank you all, you're awesome!
         */

        var _Group = function _Group() {
          this._tweens = {};
          this._tweensAddedDuringUpdate = {};
        };

        _Group.prototype = {
          getAll: function getAll() {
            return Object.keys(this._tweens).map(function (tweenId) {
              return this._tweens[tweenId];
            }.bind(this));
          },

          removeAll: function removeAll() {
            this._tweens = {};
          },

          add: function add(tween) {
            this._tweens[tween.getId()] = tween;
            this._tweensAddedDuringUpdate[tween.getId()] = tween;
          },

          remove: function remove(tween) {
            delete this._tweens[tween.getId()];
            delete this._tweensAddedDuringUpdate[tween.getId()];
          },

          update: function update(time, preserve) {
            var tweenIds = Object.keys(this._tweens);

            if (tweenIds.length === 0) {
              return false;
            }

            time = time !== undefined ? time : TWEEN.now();

            // Tweens are updated in "batches". If you add a new tween during an update, then the
            // new tween will be updated in the next batch.
            // If you remove a tween during an update, it may or may not be updated. However,
            // if the removed tween was added during the current batch, then it will not be updated.
            while (tweenIds.length > 0) {
              this._tweensAddedDuringUpdate = {};

              for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];

                if (tween && tween.update(time) === false) {
                  tween._isPlaying = false;

                  if (!preserve) {
                    delete this._tweens[tweenIds[i]];
                  }
                }
              }

              tweenIds = Object.keys(this._tweensAddedDuringUpdate);
            }

            return true;
          }
        };

        var TWEEN = new _Group();

        TWEEN.Group = _Group;
        TWEEN._nextId = 0;
        TWEEN.nextId = function () {
          return TWEEN._nextId++;
        };

        // Include a performance.now polyfill.
        // In node.js, use process.hrtime.
        if (typeof window === 'undefined' && typeof process !== 'undefined') {
          if (typeof wx !== 'undefined') {
            TWEEN.now = Date.now;
          } else {
            TWEEN.now = function () {
              var time = process.hrtime();

              // Convert [seconds, nanoseconds] to milliseconds.
              return time[0] * 1000 + time[1] / 1000000;
            };
          }
        } else if (typeof window !== 'undefined' &&
        // In a browser, use window.performance.now if it is available.
        window.performance !== undefined && window.performance.now !== undefined) {
          // This must be bound, because directly assigning this function
          // leads to an invocation exception in Chrome.
          TWEEN.now = window.performance.now.bind(window.performance);
        } else if (Date.now !== undefined) {
          // Use Date.now if it is available.
          TWEEN.now = Date.now;
        } else {
          // Otherwise, use 'new Date().getTime()'.
          TWEEN.now = function () {
            return new Date().getTime();
          };
        }

        TWEEN.Tween = function (object, group) {
          this._object = object;
          this._valuesStart = {};
          this._valuesEnd = {};
          this._valuesStartRepeat = {};
          this._duration = 1000;
          this._repeat = 0;
          this._repeatDelayTime = undefined;
          this._yoyo = false;
          this._isPlaying = false;
          this._reversed = false;
          this._delayTime = 0;
          this._startTime = null;
          this._easingFunction = TWEEN.Easing.Linear.None;
          this._interpolationFunction = TWEEN.Interpolation.Linear;
          this._chainedTweens = [];
          this._onStartCallback = null;
          this._onStartCallbackFired = false;
          this._onUpdateCallback = null;
          this._onCompleteCallback = null;
          this._onStopCallback = null;
          this._group = group || TWEEN;
          this._id = TWEEN.nextId();
        };

        TWEEN.Tween.prototype = {
          getId: function getId() {
            return this._id;
          },

          isPlaying: function isPlaying() {
            return this._isPlaying;
          },

          to: function to(properties, duration) {
            this._valuesEnd = properties;

            if (duration !== undefined) {
              this._duration = duration;
            }

            return this;
          },

          start: function start(time) {
            this._group.add(this);

            this._isPlaying = true;

            this._onStartCallbackFired = false;

            this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
            this._startTime += this._delayTime;

            for (var property in this._valuesEnd) {
              // Check if an Array was provided as property value
              if (this._valuesEnd[property] instanceof Array) {
                if (this._valuesEnd[property].length === 0) {
                  continue;
                }

                // Create a local copy of the Array with the start value at the front
                this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
              }

              // If `to()` specifies a property that doesn't exist in the source object,
              // we should not set that property in the object
              if (this._object[property] === undefined) {
                continue;
              }

              // Save the starting value.
              this._valuesStart[property] = this._object[property];

              if (this._valuesStart[property] instanceof Array === false) {
                this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
              }

              this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
            }

            return this;
          },

          stop: function stop() {
            if (!this._isPlaying) {
              return this;
            }

            this._group.remove(this);
            this._isPlaying = false;

            if (this._onStopCallback !== null) {
              this._onStopCallback(this._object);
            }

            this.stopChainedTweens();
            return this;
          },

          end: function end() {
            this.update(this._startTime + this._duration);
            return this;
          },

          stopChainedTweens: function stopChainedTweens() {
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
              this._chainedTweens[i].stop();
            }
          },

          group: function group(group) {
            this._group = group;
            return this;
          },

          delay: function delay(amount) {
            this._delayTime = amount;
            return this;
          },

          repeat: function repeat(times) {
            this._repeat = times;
            return this;
          },

          repeatDelay: function repeatDelay(amount) {
            this._repeatDelayTime = amount;
            return this;
          },

          yoyo: function yoyo(yy) {
            this._yoyo = yy;
            return this;
          },

          easing: function easing(eas) {
            this._easingFunction = eas;
            return this;
          },

          interpolation: function interpolation(inter) {
            this._interpolationFunction = inter;
            return this;
          },

          chain: function chain() {
            this._chainedTweens = arguments;
            return this;
          },

          onStart: function onStart(callback) {
            this._onStartCallback = callback;
            return this;
          },

          onUpdate: function onUpdate(callback) {
            this._onUpdateCallback = callback;
            return this;
          },

          onComplete: function onComplete(callback) {
            this._onCompleteCallback = callback;
            return this;
          },

          onStop: function onStop(callback) {
            this._onStopCallback = callback;
            return this;
          },

          update: function update(time) {
            var property;
            var elapsed;
            var value;

            if (time < this._startTime) {
              return true;
            }

            if (this._onStartCallbackFired === false) {
              if (this._onStartCallback !== null) {
                this._onStartCallback(this._object);
              }

              this._onStartCallbackFired = true;
            }

            elapsed = (time - this._startTime) / this._duration;
            elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;

            value = this._easingFunction(elapsed);

            for (property in this._valuesEnd) {
              // Don't update properties that do not exist in the source object
              if (this._valuesStart[property] === undefined) {
                continue;
              }

              var start = this._valuesStart[property] || 0;
              var end = this._valuesEnd[property];

              if (end instanceof Array) {
                this._object[property] = this._interpolationFunction(end, value);
              } else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                if (typeof end === 'string') {
                  if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                    end = start + parseFloat(end);
                  } else {
                    end = parseFloat(end);
                  }
                }

                // Protect against non numeric properties.
                if (typeof end === 'number') {
                  this._object[property] = start + (end - start) * value;
                }
              }
            }

            if (this._onUpdateCallback !== null) {
              this._onUpdateCallback(this._object);
            }

            if (elapsed === 1) {
              if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                  this._repeat--;
                }

                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                  if (typeof this._valuesEnd[property] === 'string') {
                    this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                  }

                  if (this._yoyo) {
                    var tmp = this._valuesStartRepeat[property];

                    this._valuesStartRepeat[property] = this._valuesEnd[property];
                    this._valuesEnd[property] = tmp;
                  }

                  this._valuesStart[property] = this._valuesStartRepeat[property];
                }

                if (this._yoyo) {
                  this._reversed = !this._reversed;
                }

                if (this._repeatDelayTime !== undefined) {
                  this._startTime = time + this._repeatDelayTime;
                } else {
                  this._startTime = time + this._delayTime;
                }

                return true;
              } else {
                if (this._onCompleteCallback !== null) {
                  this._onCompleteCallback(this._object);
                }

                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                  // Make the chained tweens start exactly at the time they should,
                  // even if the `update()` method was called way past the duration of the tween
                  this._chainedTweens[i].start(this._startTime + this._duration);
                }

                return false;
              }
            }

            return true;
          }
        };

        TWEEN.Easing = {

          Linear: {

            None: function None(k) {
              return k;
            }

          },

          Quadratic: {

            In: function In(k) {
              return k * k;
            },

            Out: function Out(k) {
              return k * (2 - k);
            },

            InOut: function InOut(k) {
              if ((k *= 2) < 1) {
                return 0.5 * k * k;
              }

              return -0.5 * (--k * (k - 2) - 1);
            }

          },

          Cubic: {

            In: function In(k) {
              return k * k * k;
            },

            Out: function Out(k) {
              return --k * k * k + 1;
            },

            InOut: function InOut(k) {
              if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
              }

              return 0.5 * ((k -= 2) * k * k + 2);
            }

          },

          Quartic: {

            In: function In(k) {
              return k * k * k * k;
            },

            Out: function Out(k) {
              return 1 - --k * k * k * k;
            },

            InOut: function InOut(k) {
              if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
              }

              return -0.5 * ((k -= 2) * k * k * k - 2);
            }

          },

          Quintic: {

            In: function In(k) {
              return k * k * k * k * k;
            },

            Out: function Out(k) {
              return --k * k * k * k * k + 1;
            },

            InOut: function InOut(k) {
              if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
              }

              return 0.5 * ((k -= 2) * k * k * k * k + 2);
            }

          },

          Sinusoidal: {

            In: function In(k) {
              return 1 - Math.cos(k * Math.PI / 2);
            },

            Out: function Out(k) {
              return Math.sin(k * Math.PI / 2);
            },

            InOut: function InOut(k) {
              return 0.5 * (1 - Math.cos(Math.PI * k));
            }

          },

          Exponential: {

            In: function In(k) {
              return k === 0 ? 0 : Math.pow(1024, k - 1);
            },

            Out: function Out(k) {
              return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },

            InOut: function InOut(k) {
              if (k === 0) {
                return 0;
              }

              if (k === 1) {
                return 1;
              }

              if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
              }

              return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            }

          },

          Circular: {

            In: function In(k) {
              return 1 - Math.sqrt(1 - k * k);
            },

            Out: function Out(k) {
              return Math.sqrt(1 - --k * k);
            },

            InOut: function InOut(k) {
              if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
              }

              return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            }

          },

          Elastic: {

            In: function In(k) {
              if (k === 0) {
                return 0;
              }

              if (k === 1) {
                return 1;
              }

              return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            },

            Out: function Out(k) {
              if (k === 0) {
                return 0;
              }

              if (k === 1) {
                return 1;
              }

              return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
            },

            InOut: function InOut(k) {
              if (k === 0) {
                return 0;
              }

              if (k === 1) {
                return 1;
              }

              k *= 2;

              if (k < 1) {
                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
              }

              return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
            }

          },

          Back: {

            In: function In(k) {
              var s = 1.70158;

              return k * k * ((s + 1) * k - s);
            },

            Out: function Out(k) {
              var s = 1.70158;

              return --k * k * ((s + 1) * k + s) + 1;
            },

            InOut: function InOut(k) {
              var s = 1.70158 * 1.525;

              if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
              }

              return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            }

          },

          Bounce: {

            In: function In(k) {
              return 1 - TWEEN.Easing.Bounce.Out(1 - k);
            },

            Out: function Out(k) {
              if (k < 1 / 2.75) {
                return 7.5625 * k * k;
              } else if (k < 2 / 2.75) {
                return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
              } else if (k < 2.5 / 2.75) {
                return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
              } else {
                return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
              }
            },

            InOut: function InOut(k) {
              if (k < 0.5) {
                return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
              }

              return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            }

          }

        };

        TWEEN.Interpolation = {

          Linear: function Linear(v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = TWEEN.Interpolation.Utils.Linear;

            if (k < 0) {
              return fn(v[0], v[1], f);
            }

            if (k > 1) {
              return fn(v[m], v[m - 1], m - f);
            }

            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
          },

          Bezier: function Bezier(v, k) {
            var b = 0;
            var n = v.length - 1;
            var pw = Math.pow;
            var bn = TWEEN.Interpolation.Utils.Bernstein;

            for (var i = 0; i <= n; i++) {
              b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }

            return b;
          },

          CatmullRom: function CatmullRom(v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = TWEEN.Interpolation.Utils.CatmullRom;

            if (v[0] === v[m]) {
              if (k < 0) {
                i = Math.floor(f = m * (1 + k));
              }

              return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            } else {
              if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
              }

              if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
              }

              return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
          },

          Utils: {

            Linear: function Linear(p0, p1, t) {
              return (p1 - p0) * t + p0;
            },

            Bernstein: function Bernstein(n, i) {
              var fc = TWEEN.Interpolation.Utils.Factorial;

              return fc(n) / fc(i) / fc(n - i);
            },

            Factorial: function () {
              var a = [1];

              return function (n) {
                var s = 1;

                if (a[n]) {
                  return a[n];
                }

                for (var i = n; i > 1; i--) {
                  s *= i;
                }

                a[n] = s;
                return s;
              };
            }(),

            CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
              var v0 = (p2 - p0) * 0.5;
              var v1 = (p3 - p1) * 0.5;
              var t2 = t * t;
              var t3 = t * t2;

              return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            }

          }

        };

        // UMD (Universal Module Definition)
        (function (root) {
          if (typeof module !== 'undefined' && (false ? 'undefined' : _typeof(exports)) === 'object') {
            // Node.js
            module.exports = TWEEN;
          } else if (root !== undefined) {
            // Global variable
            root.TWEEN = TWEEN;
          }
        })(undefined);
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(17));

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

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

      var _tween = __webpack_require__(10);

      var _tween2 = _interopRequireDefault(_tween);

      var _rafInterval = __webpack_require__(12);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var To = function () {
        function To(element) {
          _classCallCheck(this, To);

          this.element = element;
          this.cmds = [];
          this.index = 0;
          this.tweens = [];
          this._pause = false;
          this.loop = (0, _rafInterval.setRafInterval)(function () {
            _tween2.default.update();
          }, 15);
          this.cycleCount = 0;
        }

        _createClass(To, [{
          key: 'to',
          value: function to(target, duration, easing) {
            this.cmds.push(['to']);
            if (arguments.length !== 0) {
              for (var key in target) {
                this.set(key, target[key], duration, easing);
              }
            }
            return this;
          }
        }, {
          key: 'set',
          value: function set(prop, value, duration, easing) {
            this.cmds[this.cmds.length - 1].push([prop, [value, duration, easing]]);
            return this;
          }
        }, {
          key: 'x',
          value: function x() {
            this.cmds[this.cmds.length - 1].push(['x', arguments]);
            return this;
          }
        }, {
          key: 'y',
          value: function y() {
            this.cmds[this.cmds.length - 1].push(['y', arguments]);
            return this;
          }
        }, {
          key: 'z',
          value: function z() {
            this.cmds[this.cmds.length - 1].push(['z', arguments]);
            return this;
          }
        }, {
          key: 'rotation',
          value: function rotation() {
            this.cmds[this.cmds.length - 1].push(['rotation', arguments]);
            return this;
          }
        }, {
          key: 'scaleX',
          value: function scaleX() {
            this.cmds[this.cmds.length - 1].push(['scaleX', arguments]);
            return this;
          }
        }, {
          key: 'scaleY',
          value: function scaleY() {
            this.cmds[this.cmds.length - 1].push(['scaleY', arguments]);
            return this;
          }
        }, {
          key: 'skewX',
          value: function skewX() {
            this.cmds[this.cmds.length - 1].push(['skewX', arguments]);
            return this;
          }
        }, {
          key: 'skewY',
          value: function skewY() {
            this.cmds[this.cmds.length - 1].push(['skewY', arguments]);
            return this;
          }
        }, {
          key: 'originX',
          value: function originX() {
            this.cmds[this.cmds.length - 1].push(['originX', arguments]);
            return this;
          }
        }, {
          key: 'originY',
          value: function originY() {
            this.cmds[this.cmds.length - 1].push(['originY', arguments]);
            return this;
          }
        }, {
          key: 'alpha',
          value: function alpha() {
            this.cmds[this.cmds.length - 1].push(['alpha', arguments]);
            return this;
          }
        }, {
          key: 'begin',
          value: function begin(fn) {
            this.cmds[this.cmds.length - 1].begin = fn;
            return this;
          }
        }, {
          key: 'progress',
          value: function progress(fn) {
            this.cmds[this.cmds.length - 1].progress = fn;
            return this;
          }
        }, {
          key: 'end',
          value: function end(fn) {
            this.cmds[this.cmds.length - 1].end = fn;
            return this;
          }
        }, {
          key: 'wait',
          value: function wait() {
            this.cmds.push(['wait', arguments]);
            return this;
          }
        }, {
          key: 'then',
          value: function then() {
            this.cmds.push(['then', arguments]);
            return this;
          }
        }, {
          key: 'cycle',
          value: function cycle() {
            this.cmds.push(['cycle', arguments]);
            return this;
          }
        }, {
          key: 'start',
          value: function start() {
            if (this._pause) return;
            var len = this.cmds.length;
            if (this.index < len) {
              this.exec(this.cmds[this.index], this.index === len - 1);
            } else {
              (0, _rafInterval.clearRafInterval)(this.loop);
            }
            return this;
          }
        }, {
          key: 'pause',
          value: function pause() {
            this._pause = true;
            for (var i = 0, len = this.tweens.length; i < len; i++) {
              this.tweens[i].pause();
            }
            if (this.currentTask === 'wait') {
              this.timeout -= new Date() - this.currentTaskBegin;
              this.currentTaskBegin = new Date();
            }
          }
        }, {
          key: 'toggle',
          value: function toggle() {
            if (this._pause) {
              this.play();
            } else {
              this.pause();
            }
          }
        }, {
          key: 'play',
          value: function play() {
            this._pause = false;
            for (var i = 0, len = this.tweens.length; i < len; i++) {
              this.tweens[i].play();
            }
            var self = this;
            if (this.currentTask === 'wait') {
              setTimeout(function () {
                if (self._pause) return;
                self.index++;
                self.start();
                if (self.index === self.cmds.length && self.complete) self.complete();
              }, this.timeout);
            }
          }
        }, {
          key: 'stop',
          value: function stop() {
            for (var i = 0, len = this.tweens.length; i < len; i++) {
              this.tweens[i].pause();
              _tween2.default.remove(this.tweens[i]);
            }
            this.cmds.length = 0;
          }
        }, {
          key: 'animate',
          value: function animate(name) {
            this.cmds = this.cmds.concat(To.animationMap[name] || []);
            return this;
          }
        }, {
          key: 'exec',
          value: function exec(cmd, last) {
            var len = cmd.length,
                self = this;
            this.currentTask = cmd[0];
            switch (this.currentTask) {
              case 'to':
                self.stepCompleteCount = 0;
                for (var i = 1; i < len; i++) {
                  var task = cmd[i];
                  var ease = task[1][2];
                  var target = {};
                  var prop = task[0];
                  target[prop] = task[1][0];

                  var t = new _tween2.default.Tween(this.element).to(target, task[1][1]).onStart(function () {
                    if (cmd.begin) cmd.begin.call(self.element, self.element);
                  }).onUpdate(function () {
                    if (cmd.progress) cmd.progress.call(self.element, self.element);
                    // self.element[prop] = this[prop];
                  }).easing(ease || _tween2.default.Easing.Linear.None).onComplete(function () {
                    self.stepCompleteCount++;
                    if (self.stepCompleteCount === len - 1) {
                      if (cmd.end) cmd.end.call(self.element, self.element);
                      if (last && self.complete) self.complete();
                      self.index++;
                      self.start();
                    }
                  }).start();
                  this.tweens.push(t);
                }
                break;
              case 'wait':
                this.currentTaskBegin = new Date();
                this.timeout = cmd[1][0];
                setTimeout(function () {
                  if (self._pause) return;
                  self.index++;
                  self.start();
                  if (cmd.end) cmd.end.call(self.element, self.element);
                  if (last && self.complete) self.complete();
                }, cmd[1][0]);
                break;
              case 'then':
                var arg = cmd[1][0];
                arg.index = 0;
                arg.complete = function () {
                  self.index++;
                  self.start();
                  if (last && self.complete) self.complete();
                };
                arg.start();
                break;
              case 'cycle':
                var count = cmd[1][1];
                if (count === undefined) {
                  self.index = cmd[1][0] || 0;
                  self.start();
                } else {
                  if (count && self.cycleCount === count) {
                    self.index++;
                    self.start();
                    if (last && self.complete) self.complete();
                  } else {
                    self.cycleCount++;
                    self.index = cmd[1][0];
                    self.start();
                  }
                }
                break;
            }
          }
        }]);

        return To;
      }();

      To.get = function (element) {
        var to = new To(element);
        return to;
      };

      To.animationMap = {};
      To.extend = function (animationName, cmds) {
        To.animationMap[animationName] = cmds;
      };

      exports.default = To;

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.setRafInterval = setRafInterval;
      exports.clearRafInterval = clearRafInterval;
      /*!
       *  raf-interval v0.3.0 By dntzhang
       *  Github: https://github.com/dntzhang/raf-interval
       *  MIT Licensed.
       */

      if (!Date.now) {
        Date.now = function now() {
          return new Date().getTime();
        };
      }

      var queue = [],
          id = -1,
          ticking = false,
          tickId = null,
          now = Date.now,
          lastTime = 0,
          vendors = ['ms', 'moz', 'webkit', 'o'],
          x = 0,
          isWeapp = typeof wx !== 'undefined' && !wx.createCanvas,
          isWegame = typeof wx !== 'undefined' && wx.createCanvas,
          isBrowser = typeof window !== 'undefined';

      var raf = isBrowser ? window.requestAnimationFrame : null;
      var caf = isBrowser ? window.cancelAnimationFrame : null;

      function mockRaf(callback, element) {
        var currTime = now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      }

      function mockCaf(id) {
        clearTimeout(id);
      }

      if (isBrowser) {
        window.setRafInterval = setRafInterval;
        window.clearRafInterval = clearRafInterval;

        for (; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!raf) {
          raf = mockRaf;
          caf = mockCaf;
          window.requestAnimationFrame = raf;
          window.cancelAnimationFrame = caf;
        }
      } else if (isWeapp) {
        raf = mockRaf;
        caf = mockCaf;
      } else if (isWegame) {
        raf = requestAnimationFrame;
        caf = cancelAnimationFrame;
      }

      function setRafInterval(fn, interval) {
        id++;
        queue.push({ id: id, fn: fn, interval: interval, lastTime: now() });
        if (!ticking) {
          var tick = function tick() {
            tickId = raf(tick);
            each(queue, function (item) {
              if (item.interval < 17 || now() - item.lastTime >= item.interval) {
                item.fn();
                item.lastTime = now();
              }
            });
          };
          ticking = true;
          tick();
        }
        return id;
      }

      function clearRafInterval(id) {
        var i = 0,
            len = queue.length;

        for (; i < len; i++) {
          if (id === queue[i].id) {
            queue.splice(i, 1);
            break;
          }
        }

        if (queue.length === 0) {
          caf(tickId);
          ticking = false;
        }
      }

      function each(arr, fn) {
        if (Array.prototype.forEach) {
          arr.forEach(fn);
        } else {
          var i = 0,
              len = arr.length;
          for (; i < len; i++) {
            fn(arr[i], i);
          }
        }
      }

      /***/
    },
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

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

      var _canvasRender = __webpack_require__(23);

      var _canvasRender2 = _interopRequireDefault(_canvasRender);

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Renderer = function () {
        function Renderer(canvasOrContext, width, height) {
          _classCallCheck(this, Renderer);

          this.renderList = [];
          if (arguments.length === 3) {
            this.renderer = new _canvasRender2.default(canvasOrContext, width, height);
          } else {
            this.renderer = new _canvasRender2.default(canvasOrContext);
          }

          this.ctx = this.renderer.ctx;
        }

        _createClass(Renderer, [{
          key: 'update',
          value: function update(stage) {
            var objs = this.renderList,
                engine = this.renderer;
            objs.length = 0;
            this.computeMatrix(stage);
            engine.clear();
            objs.forEach(function (obj) {
              engine.render(obj);
            });

            this.ctx.draw && this.ctx.draw();
          }
        }, {
          key: 'getHitRenderList',
          value: function getHitRenderList(stage) {
            var objs = this.renderList;
            objs.length = 0;
            this.computeMatrix(stage);
            return objs;
          }
        }, {
          key: 'computeMatrix',
          value: function computeMatrix(stage) {
            for (var i = 0, len = stage.children.length; i < len; i++) {
              this._computeMatrix(stage.children[i]);
            }
          }
        }, {
          key: 'initComplex',
          value: function initComplex(o) {
            o.complexCompositeOperation = this._getCompositeOperation(o);
            o.complexAlpha = this._getAlpha(o, 1);
          }
        }, {
          key: '_computeMatrix',
          value: function _computeMatrix(o, mtx) {
            if (!o.isVisible()) {
              return;
            }
            if (mtx) {
              o._matrix.initialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            } else {
              o._matrix.initialize(1, 0, 0, 1, 0, 0);
            }

            o._matrix.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.originX, o.originY);

            if (o instanceof _group2.default) {
              var list = o.children,
                  len = list.length,
                  i = 0;
              for (; i < len; i++) {
                this._computeMatrix(list[i], o._matrix);
              }
            } else {
              // if (o instanceof Graphics) {
              //   this.renderList.push(o)
              //   this.initComplex(o)
              // } else {
              o.initAABB();
              // if (this.isInStage(o)) {
              this.renderList.push(o);
              this.initComplex(o);
              // }
              // }
            }
          }
        }, {
          key: '_getCompositeOperation',
          value: function _getCompositeOperation(o) {
            if (o.compositeOperation) return o.compositeOperation;
            if (o.parent) return this._getCompositeOperation(o.parent);
          }
        }, {
          key: '_getAlpha',
          value: function _getAlpha(o, alpha) {
            var result = o.alpha * alpha;
            if (o.parent) {
              return this._getAlpha(o.parent, result);
            }
            return result;
          }
        }, {
          key: 'isInStage',
          value: function isInStage(o) {
            return this.collisionBetweenAABB(o.AABB, this.stage.AABB);
          }
        }, {
          key: 'collisionBetweenAABB',
          value: function collisionBetweenAABB(AABB1, AABB2) {
            var maxX = AABB1[0] + AABB1[2];
            if (maxX < AABB2[0]) return false;
            var minX = AABB1[0];
            if (minX > AABB2[0] + AABB2[2]) return false;
            var maxY = AABB1[1] + AABB1[3];
            if (maxY < AABB2[1]) return false;
            var minY = AABB1[1];
            if (minY > AABB2[1] + AABB2[3]) return false;
            return true;
          }
        }]);

        return Renderer;
      }();

      exports.default = Renderer;

      /***/
    },
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

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

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      var _renderer = __webpack_require__(13);

      var _renderer2 = _interopRequireDefault(_renderer);

      var _wxHitRender = __webpack_require__(26);

      var _wxHitRender2 = _interopRequireDefault(_wxHitRender);

      var _event = __webpack_require__(7);

      var _event2 = _interopRequireDefault(_event);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var WeStage = function (_Group) {
        _inherits(WeStage, _Group);

        function WeStage(width, height, id, page) {
          _classCallCheck(this, WeStage);

          var _this = _possibleConstructorReturn(this, (WeStage.__proto__ || Object.getPrototypeOf(WeStage)).call(this));

          var component = page.selectComponent('#' + id);
          component.setData({
            width: width,
            height: height
          });
          component.stage = _this;
          var canvasId = component.getCaxCanvasId();

          var ctx = wx.createCanvasContext(canvasId, component);
          var hitCtx = wx.createCanvasContext(canvasId + 'Hit', component);
          _this.renderer = new _renderer2.default(ctx, width, height);
          _this._hitRender = new _wxHitRender2.default(hitCtx, component, canvasId);
          _this._overObject = null;
          _this.ctx = ctx;

          _this.width = width;
          _this.height = height;
          return _this;
        }

        _createClass(WeStage, [{
          key: 'touchStartHandler',
          value: function touchStartHandler(evt) {
            var _this2 = this;

            var p1 = evt.changedTouches[0];

            evt.stageX = p1.x;
            evt.stageY = p1.y;

            this._getObjectUnderPoint(evt, function (obj) {
              _this2.willDragObject = obj;
              _this2._mouseDownX = evt.stageX;
              _this2._mouseDownY = evt.stageY;
              _this2.preStageX = evt.stageX;
              _this2.preStageY = evt.stageY;
            });
          }
        }, {
          key: 'touchMoveHandler',
          value: function touchMoveHandler(evt) {
            var _this3 = this;

            var p1 = evt.changedTouches[0];

            evt.stageX = p1.x;
            evt.stageY = p1.y;

            this._getObjectUnderPoint(evt, function (obj) {
              var mockEvt = new _event2.default();
              mockEvt.stageX = evt.stageX;
              mockEvt.stageY = evt.stageY;
              mockEvt.pureEvent = evt;

              if (_this3.willDragObject) {
                mockEvt.type = 'drag';
                mockEvt.dx = mockEvt.stageX - _this3.preStageX;
                mockEvt.dy = mockEvt.stageY - _this3.preStageY;
                _this3.preStageX = mockEvt.stageX;
                _this3.preStageY = mockEvt.stageY;
                _this3.willDragObject.dispatchEvent(mockEvt);
              }

              if (obj) {
                if (_this3._overObject === null) {
                  _this3._overObject = obj;
                } else {
                  if (obj.id !== _this3._overObject.id) {
                    _this3._overObject = obj;
                  } else {
                    mockEvt.type = 'touchmove';
                    obj.dispatchEvent(mockEvt);
                  }
                }
              } else if (_this3._overObject) {
                _this3._overObject = null;
              }
            });
          }
        }, {
          key: 'touchEndHandler',
          value: function touchEndHandler(evt) {
            var _this4 = this;

            var p1 = evt.changedTouches[0];

            evt.stageX = p1.x;
            evt.stageY = p1.y;

            var mockEvt = new _event2.default();
            mockEvt.stageX = evt.stageX;
            mockEvt.stageY = evt.stageY;

            mockEvt.pureEvent = evt;

            this._getObjectUnderPoint(evt, function (obj) {
              _this4._mouseUpX = evt.stageX;
              _this4._mouseUpY = evt.stageY;

              _this4.willDragObject = null;
              _this4.preStageX = null;
              _this4.preStageY = null;

              if (obj && Math.abs(_this4._mouseDownX - _this4._mouseUpX) < 30 && Math.abs(_this4._mouseDownY - _this4._mouseUpY) < 30) {
                mockEvt.type = 'tap';
                obj.dispatchEvent(mockEvt);
              }
            });
          }
        }, {
          key: '_handleMouseOut',
          value: function _handleMouseOut(evt) {
            this.dispatchEvent({
              pureEvent: evt,
              type: 'mouseout',
              stageX: evt.stageX,
              stageY: evt.stageY
            });
          }
        }, {
          key: '_getObjectUnderPoint',
          value: function _getObjectUnderPoint(evt, cb) {
            var list = this.renderer.getHitRenderList(this);
            this._hitRender.clear();
            this._hitRender.hit(list, evt, cb, list.length - 1);
          }
        }, {
          key: 'update',
          value: function update() {
            this.renderer.update(this);
          }
        }]);

        return WeStage;
      }(_group2.default);

      exports.default = WeStage;

      /***/
    },
    /* 15 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var RoundedRect = function (_Shape) {
        _inherits(RoundedRect, _Shape);

        function RoundedRect(width, height, r, option) {
          _classCallCheck(this, RoundedRect);

          var _this = _possibleConstructorReturn(this, (RoundedRect.__proto__ || Object.getPrototypeOf(RoundedRect)).call(this));

          _this.option = Object.assign({
            lineWidth: 1
          }, option);
          _this.r = r;
          _this.width = width;
          _this.height = height;
          return _this;
        }

        _createClass(RoundedRect, [{
          key: 'draw',
          value: function draw() {
            var width = this.width,
                height = this.height,
                r = this.r;

            var ax = r,
                ay = 0,
                bx = width,
                by = 0,
                cx = width,
                cy = height,
                dx = 0,
                dy = height,
                ex = 0,
                ey = 0;

            this.beginPath();

            this.moveTo(ax, ay);
            this.arcTo(bx, by, cx, cy, r);
            this.arcTo(cx, cy, dx, dy, r);
            this.arcTo(dx, dy, ex, ey, r);
            this.arcTo(ex, ey, ax, ay, r);

            if (this.option.fillStyle) {
              this.closePath();
              this.fillStyle(this.option.fillStyle);
              this.fill();
            }

            if (this.option.strokeStyle) {
              this.lineWidth(this.option.lineWidth);
              this.strokeStyle(this.option.strokeStyle);
              this.stroke();
            }
          }
        }]);

        return RoundedRect;
      }(_shape2.default);

      exports.default = RoundedRect;

      /***/
    },
    /* 16 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _tween = __webpack_require__(10);

      var _tween2 = _interopRequireDefault(_tween);

      var _to = __webpack_require__(11);

      var _to2 = _interopRequireDefault(_to);

      __webpack_require__(18);

      var _stage = __webpack_require__(19);

      var _stage2 = _interopRequireDefault(_stage);

      var _weStage = __webpack_require__(14);

      var _weStage2 = _interopRequireDefault(_weStage);

      var _graphics = __webpack_require__(3);

      var _graphics2 = _interopRequireDefault(_graphics);

      var _bitmap = __webpack_require__(6);

      var _bitmap2 = _interopRequireDefault(_bitmap);

      var _text = __webpack_require__(4);

      var _text2 = _interopRequireDefault(_text);

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      var _sprite = __webpack_require__(5);

      var _sprite2 = _interopRequireDefault(_sprite);

      var _roundedRect = __webpack_require__(15);

      var _roundedRect2 = _interopRequireDefault(_roundedRect);

      var _arrowPath = __webpack_require__(27);

      var _arrowPath2 = _interopRequireDefault(_arrowPath);

      var _ellipse = __webpack_require__(28);

      var _ellipse2 = _interopRequireDefault(_ellipse);

      var _button = __webpack_require__(29);

      var _button2 = _interopRequireDefault(_button);

      var _rect = __webpack_require__(30);

      var _rect2 = _interopRequireDefault(_rect);

      var _circle = __webpack_require__(31);

      var _circle2 = _interopRequireDefault(_circle);

      var _polygon = __webpack_require__(32);

      var _polygon2 = _interopRequireDefault(_polygon);

      var _equilateralPolygon = __webpack_require__(33);

      var _equilateralPolygon2 = _interopRequireDefault(_equilateralPolygon);

      var _rafInterval = __webpack_require__(12);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      _to2.default.easing = {
        linear: _tween2.default.Easing.Linear.None
      };

      var cax = {
        easing: {
          linear: _tween2.default.Easing.Linear.None
        },
        util: {
          randomInt: function randomInt(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
          }
        },

        Stage: _stage2.default,
        WeStage: _weStage2.default,
        Graphics: _graphics2.default,
        Bitmap: _bitmap2.default,
        Text: _text2.default,
        Group: _group2.default,
        Sprite: _sprite2.default,
        ArrowPath: _arrowPath2.default,
        Ellipse: _ellipse2.default,

        Button: _button2.default,

        RoundedRect: _roundedRect2.default,
        Rect: _rect2.default,
        Circle: _circle2.default,
        Polygon: _polygon2.default,
        EquilateralPolygon: _equilateralPolygon2.default,

        setInterval: _rafInterval.setRafInterval,
        clearInterval: _rafInterval.clearRafInterval,

        caxCanvasId: 0,
        TWEEN: _tween2.default,
        To: _to2.default
      };

      ['Quadratic', 'Cubic', 'Quartic', 'Quintic', 'Sinusoidal', 'Exponential', 'Circular', 'Elastic', 'Back', 'Bounce'].forEach(function (item) {
        var itemLower = item.toLowerCase();
        cax.easing[itemLower + 'In'] = _tween2.default.Easing[item].In;
        cax.easing[itemLower + 'Out'] = _tween2.default.Easing[item].Out;
        cax.easing[itemLower + 'InOut'] = _tween2.default.Easing[item].InOut;

        _to2.default.easing[itemLower + 'In'] = _tween2.default.Easing[item].In;
        _to2.default.easing[itemLower + 'Out'] = _tween2.default.Easing[item].Out;
        _to2.default.easing[itemLower + 'InOut'] = _tween2.default.Easing[item].InOut;
      });

      module.exports = cax;

      /***/
    },
    /* 17 */
    /***/function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /* 18 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _to = __webpack_require__(11);

      var _to2 = _interopRequireDefault(_to);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      _to2.default.extend('rubber', [['to', ['scaleX', {
        '0': 1.25,
        '1': 300
      }], ['scaleY', {
        '0': 0.75,
        '1': 300
      }]], ['to', ['scaleX', {
        '0': 0.75,
        '1': 100
      }], ['scaleY', {
        '0': 1.25,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 1.15,
        '1': 100
      }], ['scaleY', {
        '0': 0.85,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 0.95,
        '1': 150
      }], ['scaleY', {
        '0': 1.05,
        '1': 150
      }]], ['to', ['scaleX', {
        '0': 1.05,
        '1': 100
      }], ['scaleY', {
        '0': 0.95,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 1,
        '1': 250
      }], ['scaleY', {
        '0': 1,
        '1': 250
      }]]]);

      _to2.default.extend('bounceIn', [['to', ['scaleX', {
        '0': 0,
        '1': 0
      }], ['scaleY', {
        '0': 0,
        '1': 0
      }]], ['to', ['scaleX', {
        '0': 1.35,
        '1': 200
      }], ['scaleY', {
        '0': 1.35,
        '1': 200
      }]], ['to', ['scaleX', {
        '0': 0.9,
        '1': 100
      }], ['scaleY', {
        '0': 0.9,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 1.1,
        '1': 100
      }], ['scaleY', {
        '0': 1.1,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 0.95,
        '1': 100
      }], ['scaleY', {
        '0': 0.95,
        '1': 100
      }]], ['to', ['scaleX', {
        '0': 1,
        '1': 100
      }], ['scaleY', {
        '0': 1,
        '1': 100
      }]]]);

      _to2.default.extend('flipInX', [['to', ['rotateX', {
        '0': -90,
        '1': 0
      }]], ['to', ['rotateX', {
        '0': 20,
        '1': 300
      }]], ['to', ['rotateX', {
        '0': -20,
        '1': 300
      }]], ['to', ['rotateX', {
        '0': 10,
        '1': 300
      }]], ['to', ['rotateX', {
        '0': -5,
        '1': 300
      }]], ['to', ['rotateX', {
        '0': 0,
        '1': 300
      }]]]);

      _to2.default.extend('zoomOut', [['to', ['scaleX', {
        '0': 0,
        '1': 400
      }], ['scaleY', {
        '0': 0,
        '1': 400
      }]]]);

      /***/
    },
    /* 19 */
    /***/function (module, exports, __webpack_require__) {

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

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      var _renderer = __webpack_require__(13);

      var _renderer2 = _interopRequireDefault(_renderer);

      var _hitRender = __webpack_require__(25);

      var _hitRender2 = _interopRequireDefault(_hitRender);

      var _event = __webpack_require__(7);

      var _event2 = _interopRequireDefault(_event);

      var _weStage = __webpack_require__(14);

      var _weStage2 = _interopRequireDefault(_weStage);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Stage = function (_Group) {
        _inherits(Stage, _Group);

        function Stage(width, height, renderTo) {
          _classCallCheck(this, Stage);

          var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this));

          var len = arguments.length;
          _this.isWegame = typeof wx !== 'undefined' && wx.createCanvas;
          if (len === 0) {
            // wegame
            _this.canvas = wx.createCanvas();
            _this.disableMoveDetection = true;
          } else if (len === 4) {
            var _ret;

            // weapp
            return _ret = new _weStage2.default(arguments[0], arguments[1], arguments[2], arguments[3]), _possibleConstructorReturn(_this, _ret);
          } else {
            if (len === 1) {
              _this.canvas = typeof width === 'string' ? document.querySelector(width) : width;
            } else {
              _this.renderTo = typeof renderTo === 'string' ? document.querySelector(renderTo) : renderTo;
              if (_this.renderTo.tagName === 'CANVAS') {
                _this.canvas = _this.renderTo;
                _this.canvas.width = width;
                _this.canvas.height = height;
              } else {
                _this.canvas = document.createElement('canvas');
                _this.canvas.width = width;
                _this.canvas.height = height;
                _this.renderTo.appendChild(_this.canvas);
              }
            }
            // get rect again when trigger onscroll onresize event!?
            _this._boundingClientRect = _this.canvas.getBoundingClientRect();

            _this.offset = _this._getOffset(_this.canvas);
          }
          _this.renderer = new _renderer2.default(_this.canvas);
          if (_this.isWegame) {
            wx.onTouchStart(function (evt) {
              return _this._handleMouseDown(evt);
            });

            wx.onTouchMove(function (evt) {
              return _this._handleMouseMove(evt);
            });

            wx.onTouchEnd(function (evt) {
              return _this._handleMouseUp(evt);
            });
          } else {
            _this.canvas.addEventListener('click', function (evt) {
              return _this._handleClick(evt);
            });
            _this.canvas.addEventListener('mousedown', function (evt) {
              return _this._handleMouseDown(evt);
            });
            _this.canvas.addEventListener('mousemove', function (evt) {
              return _this._handleMouseMove(evt);
            });
            _this.canvas.addEventListener('mouseup', function (evt) {
              return _this._handleMouseUp(evt);
            });
            _this.canvas.addEventListener('mouseout', function (evt) {
              return _this._handleMouseOut(evt);
            });
            _this.canvas.addEventListener('touchstart', function (evt) {
              return _this._handleMouseDown(evt);
            });
            _this.canvas.addEventListener('touchmove', function (evt) {
              return _this._handleMouseMove(evt);
            });
            _this.canvas.addEventListener('touchend', function (evt) {
              return _this._handleMouseUp(evt);
            });

            _this.canvas.addEventListener('dblclick', function (evt) {
              return _this._handlDblClick(evt);
            });
            // this.addEvent(this.canvas, "mousewheel", this._handleMouseWheel.bind(this));
          }

          _this.borderTopWidth = 0;
          _this.borderLeftWidth = 0;

          _this.hitAABB = false;
          _this._hitRender = new _hitRender2.default();

          _this._overObject = null;

          _this._scaleX = 1;
          _this._scaleY = 1;

          _this._mouseDownX = 0;
          _this._mouseDownY = 0;

          _this._mouseUpX = 0;
          _this._mouseUpY = 0;

          _this.willDragObject = null;
          _this.preStageX = null;
          _this.preStageY = null;

          _this.width = _this.canvas.width;
          _this.height = _this.canvas.height;
          return _this;
        }

        _createClass(Stage, [{
          key: '_handlDblClick',
          value: function _handlDblClick(evt) {
            this._getObjectUnderPoint(evt);
          }
        }, {
          key: '_handleClick',
          value: function _handleClick(evt) {
            // this._computeStageXY(evt)
            if (Math.abs(this._mouseDownX - this._mouseUpX) < 20 && Math.abs(this._mouseDownY - this._mouseUpY) < 20) {
              this._getObjectUnderPoint(evt);
            }
          }
        }, {
          key: '_handleMouseDown',
          value: function _handleMouseDown(evt) {
            this.offset = this._getOffset(this.canvas);
            var obj = this._getObjectUnderPoint(evt);
            this.willDragObject = obj;
            this._mouseDownX = evt.stageX;
            this._mouseDownY = evt.stageY;
            this.preStageX = evt.stageX;
            this.preStageY = evt.stageY;
          }
        }, {
          key: 'scaleStage',
          value: function scaleStage(x, y) {
            this._scaleX = x;
            this._scaleY = y;
          }
        }, {
          key: '_handleMouseUp',
          value: function _handleMouseUp(evt) {
            var obj = this._getObjectUnderPoint(evt);
            this._computeStageXY(evt);
            this._mouseUpX = evt.stageX;
            this._mouseUpY = evt.stageY;

            var mockEvt = new _event2.default();
            mockEvt.stageX = evt.stageX;
            mockEvt.stageY = evt.stageY;
            mockEvt.pureEvent = evt;

            this.willDragObject = null;
            this.preStageX = null;
            this.preStageY = null;

            if (obj && Math.abs(this._mouseDownX - this._mouseUpX) < 30 && Math.abs(this._mouseDownY - this._mouseUpY) < 30) {
              mockEvt.type = 'tap';
              obj.dispatchEvent(mockEvt);
            }
          }
        }, {
          key: '_handleMouseOut',
          value: function _handleMouseOut(evt) {
            this._computeStageXY(evt);
            this.dispatchEvent({
              pureEvent: evt,
              type: 'mouseout',
              stageX: evt.stageX,
              stageY: evt.stageY
            });
          }
        }, {
          key: '_handleMouseMove',
          value: function _handleMouseMove(evt) {
            if (this.disableMoveDetection) return;
            var obj = this._getObjectUnderPoint(evt);
            var mockEvt = new _event2.default();
            mockEvt.stageX = evt.stageX;
            mockEvt.stageY = evt.stageY;
            mockEvt.pureEvent = evt;

            if (this.willDragObject) {
              mockEvt.type = 'drag';
              mockEvt.dx = mockEvt.stageX - this.preStageX;
              mockEvt.dy = mockEvt.stageY - this.preStageY;
              this.preStageX = mockEvt.stageX;
              this.preStageY = mockEvt.stageY;
              this.willDragObject.dispatchEvent(mockEvt);
            }

            if (obj) {
              if (this._overObject === null) {
                mockEvt.type = 'mouseover';
                obj.dispatchEvent(mockEvt);
                this._overObject = obj;
                this._setCursor(obj);
              } else {
                if (obj.id !== this._overObject.id) {
                  this._overObject.dispatchEvent({
                    pureEvent: evt,
                    type: 'mouseout',
                    stageX: evt.stageX,
                    stageY: evt.stageY
                  });
                  mockEvt.type = 'mouseover';
                  obj.dispatchEvent(mockEvt);
                  this._setCursor(obj);
                  this._overObject = obj;
                } else {
                  mockEvt.type = 'mousemove';
                  obj.dispatchEvent(mockEvt);
                  mockEvt.type = 'touchmove';
                  obj.dispatchEvent(mockEvt);
                }
              }
            } else if (this._overObject) {
              mockEvt.type = 'mouseout';
              this._overObject.dispatchEvent(mockEvt);
              this._overObject = null;
              this._setCursor({ cursor: 'default' });
            }
          }
        }, {
          key: '_setCursor',
          value: function _setCursor(obj) {
            if (obj.cursor) {
              this.canvas.style.cursor = obj.cursor;
            } else if (obj.parent) {
              this._setCursor(obj.parent);
            }
          }
        }, {
          key: '_getObjectUnderPoint',
          value: function _getObjectUnderPoint(evt) {
            this._computeStageXY(evt);
            if (this.hitAABB) {
              return this._hitRender.hitAABB(this, evt);
            } else {
              return this._hitRender.hitPixel(this, evt);
            }
          }
        }, {
          key: '_computeStageXY',
          value: function _computeStageXY(evt) {
            this._boundingClientRect = this.isWegame ? { left: 0, top: 0 } : this.canvas.getBoundingClientRect();
            if (evt.touches || evt.changedTouches) {
              var firstTouch = evt.touches[0] || evt.changedTouches[0];
              if (firstTouch) {
                evt.stageX = firstTouch.pageX - this.offset[0];
                evt.stageY = firstTouch.pageY - this.offset[1];
              }
            } else {
              evt.stageX = (evt.clientX - this._boundingClientRect.left - this.borderLeftWidth) / this._scaleX;
              evt.stageY = (evt.clientY - this._boundingClientRect.top - this.borderTopWidth) / this._scaleY;
            }
          }
        }, {
          key: '_getOffset',
          value: function _getOffset(el) {
            if (this.isWegame) {
              return [0, 0];
            }
            var _t = 0,
                _l = 0;
            if (document.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
              var box = el.getBoundingClientRect();
              _l = box.left;
              _t = box.top;
            } else {
              while (el.offsetParent) {
                _t += el.offsetTop;
                _l += el.offsetLeft;
                el = el.offsetParent;
              }
              return [_l, _t];
            }
            return [_l + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), _t + Math.max(document.documentElement.scrollTop, document.body.scrollTop)];
          }
        }, {
          key: 'update',
          value: function update() {
            this.renderer.update(this);
          }
        }, {
          key: 'on',
          value: function on(type, fn) {
            var _this2 = this;

            this.canvas.addEventListener(type, function (evt) {
              _this2._computeStageXY(evt);
              fn(evt);
            });
          }
        }, {
          key: 'off',
          value: function off(type, fn) {
            this.canvas.removeEventListener(type, fn);
          }
        }]);

        return Stage;
      }(_group2.default);

      exports.default = Stage;

      /***/
    },
    /* 20 */
    /***/function (module, exports, __webpack_require__) {

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

      var DEG_TO_RAD = 0.017453292519943295;

      var Matrix2D = function () {
        function Matrix2D(a, b, c, d, tx, ty) {
          _classCallCheck(this, Matrix2D);

          this.a = a == null ? 1 : a;
          this.b = b || 0;
          this.c = c || 0;
          this.d = d == null ? 1 : d;
          this.tx = tx || 0;
          this.ty = ty || 0;
          return this;
        }

        _createClass(Matrix2D, [{
          key: "identity",
          value: function identity() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
          }
        }, {
          key: "appendTransform",
          value: function appendTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
            if (rotation % 360) {
              var r = rotation * DEG_TO_RAD;
              var cos = Math.cos(r);
              var sin = Math.sin(r);
            } else {
              cos = 1;
              sin = 0;
            }
            if (skewX || skewY) {
              skewX *= DEG_TO_RAD;
              skewY *= DEG_TO_RAD;
              this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
              this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            } else {
              this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (originX || originY) {
              this.tx -= originX * this.a + originY * this.c;
              this.ty -= originX * this.b + originY * this.d;
            }
            return this;
          }
        }, {
          key: "append",
          value: function append(a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            this.a = a * a1 + b * c1;
            this.b = a * b1 + b * d1;
            this.c = c * a1 + d * c1;
            this.d = c * b1 + d * d1;
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
          }
        }, {
          key: "initialize",
          value: function initialize(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
          }
        }, {
          key: "setValues",
          value: function setValues(a, b, c, d, tx, ty) {
            this.a = a == null ? 1 : a;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d == null ? 1 : d;
            this.tx = tx || 0;
            this.ty = ty || 0;
            return this;
          }
        }, {
          key: "invert",
          value: function invert() {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;

            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
          }
        }, {
          key: "copy",
          value: function copy(matrix) {
            return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
          }
        }]);

        return Matrix2D;
      }();

      exports.default = Matrix2D;

      /***/
    },
    /* 21 */
    /***/function (module, exports, __webpack_require__) {

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

      var MOUSEOUT = 'mouseout';

      var EventDispatcher = function () {
        function EventDispatcher() {
          _classCallCheck(this, EventDispatcher);

          this._listeners = null;
          this._captureListeners = null;
        }

        _createClass(EventDispatcher, [{
          key: 'addEventListener',
          value: function addEventListener(type, listener, useCapture) {
            var listeners;
            if (useCapture) {
              listeners = this._captureListeners = this._captureListeners || {};
            } else {
              listeners = this._listeners = this._listeners || {};
            }
            var arr = listeners[type];
            if (arr) {
              this.removeEventListener(type, listener, useCapture);
            }
            arr = listeners[type]; // remove may have deleted the array
            if (!arr) {
              listeners[type] = [listener];
            } else {
              arr.push(listener);
            }
            return listener;
          }
        }, {
          key: 'removeEventListener',
          value: function removeEventListener(type, listener, useCapture) {
            var listeners = useCapture ? this._captureListeners : this._listeners;
            if (!listeners) {
              return;
            }
            var arr = listeners[type];
            if (!arr) {
              return;
            }

            arr.every(function (item, index) {
              if (item === listener) {
                arr.splice(index, 1);
                return false;
              }
              return true;
            });
          }
        }, {
          key: 'on',
          value: function on(type, listener, useCapture) {
            this.addEventListener(type, listener, useCapture);
          }
        }, {
          key: 'off',
          value: function off(type, listener, useCapture) {
            this.removeEventListener(type, listener, useCapture);
          }
        }, {
          key: 'dispatchEvent',
          value: function dispatchEvent(evt) {
            if (evt.type === MOUSEOUT || !this.parent) {
              this._dispatchEvent(evt, 0);
              this._dispatchEvent(evt, 1);
            } else {
              var top = this,
                  list = [top];
              while (top.parent) {
                list.push(top = top.parent);
              }
              var i,
                  l = list.length;

              // capture & atTarget
              for (i = l - 1; i >= 0 && !evt.propagationStopped; i--) {
                list[i]._dispatchEvent(evt, 0);
              }
              // bubbling
              for (i = 0; i < l && !evt.propagationStopped; i++) {
                list[i]._dispatchEvent(evt, 1);
              }
            }
          }
        }, {
          key: '_dispatchEvent',
          value: function _dispatchEvent(evt, type) {
            var _this = this;

            evt.target = this;
            if (this._captureListeners && type === 0) {
              var cls = this._captureListeners[evt.type];
              cls && cls.forEach(function (fn) {
                fn.call(_this, evt);
              });
            }

            if (this._listeners && type === 1) {
              var ls = this._listeners[evt.type];
              ls && ls.forEach(function (fn) {
                fn.call(_this, evt);
              });
            }
          }
        }]);

        return EventDispatcher;
      }();

      exports.default = EventDispatcher;

      /***/
    },
    /* 22 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var UID = {};

      UID._nextID = 0;

      UID.get = function () {
        return UID._nextID++;
      };

      exports.default = UID;

      /***/
    },
    /* 23 */
    /***/function (module, exports, __webpack_require__) {

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

      var _graphics = __webpack_require__(3);

      var _graphics2 = _interopRequireDefault(_graphics);

      var _render = __webpack_require__(8);

      var _render2 = _interopRequireDefault(_render);

      var _sprite = __webpack_require__(5);

      var _sprite2 = _interopRequireDefault(_sprite);

      var _bitmap = __webpack_require__(6);

      var _bitmap2 = _interopRequireDefault(_bitmap);

      var _text = __webpack_require__(4);

      var _text2 = _interopRequireDefault(_text);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var CanvasRender = function (_Render) {
        _inherits(CanvasRender, _Render);

        function CanvasRender(canvasOrContext, width, height) {
          _classCallCheck(this, CanvasRender);

          var _this = _possibleConstructorReturn(this, (CanvasRender.__proto__ || Object.getPrototypeOf(CanvasRender)).call(this));

          if (arguments.length === 3) {
            _this.ctx = canvasOrContext;
            _this.width = width;
            _this.height = height;
          } else {
            _this.ctx = canvasOrContext.getContext('2d');
            _this.width = canvasOrContext.width;
            _this.height = canvasOrContext.height;
          }
          return _this;
        }

        _createClass(CanvasRender, [{
          key: 'render',
          value: function render(obj) {
            var ctx = this.ctx;
            var ocg = obj.clipGraphics;
            ctx.save();
            ctx.globalCompositeOperation = obj.complexCompositeOperation;
            ctx.globalAlpha = obj.complexAlpha;
            if (ocg) {
              ctx.beginPath();
              ocg._matrix.copy(obj._matrix);
              ocg._matrix.appendTransform(ocg.x, ocg.y, ocg.scaleX, ocg.scaleY, ocg.rotation, ocg.skewX, ocg.skewY, ocg.originX, ocg.originY);
              ctx.setTransform(ocg._matrix.a, ocg._matrix.b, ocg._matrix.c, ocg._matrix.d, ocg._matrix.tx, ocg._matrix.ty);
              ocg.render(ctx);
              ctx.clip(obj.clipRuleNonzero ? 'nonzero' : 'evenodd');
            }
            ctx.setTransform(obj._matrix.a, obj._matrix.b, obj._matrix.c, obj._matrix.d, obj._matrix.tx, obj._matrix.ty);
            if (obj.cacheCanvas) {
              ctx.drawImage(obj.cacheCanvas, 0, 0);
            } else if (obj instanceof _graphics2.default) {
              obj.render(ctx);
            } else if (obj instanceof _sprite2.default && obj.rect) {
              obj.updateFrame();
              var rect = obj.rect;
              ctx.drawImage(obj.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
            } else if (obj instanceof _bitmap2.default && obj.rect) {
              var bRect = obj.rect;
              ctx.drawImage(obj.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
            } else if (obj instanceof _text2.default) {
              ctx.font = obj.font;
              ctx.fillStyle = obj.color;
              ctx.textBaseline = obj.baseline;
              ctx.fillText(obj.text, 0, 0);
            }
            ctx.restore();
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
          }
        }]);

        return CanvasRender;
      }(_render2.default);

      exports.default = CanvasRender;

      /***/
    },
    /* 24 */
    /***/function (module, exports) {

      var g;

      // This works in non-strict mode
      g = function () {
        return this;
      }();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if ((typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 25 */
    /***/function (module, exports, __webpack_require__) {

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

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      var _graphics = __webpack_require__(3);

      var _graphics2 = _interopRequireDefault(_graphics);

      var _render = __webpack_require__(8);

      var _render2 = _interopRequireDefault(_render);

      var _event = __webpack_require__(7);

      var _event2 = _interopRequireDefault(_event);

      var _sprite = __webpack_require__(5);

      var _sprite2 = _interopRequireDefault(_sprite);

      var _bitmap = __webpack_require__(6);

      var _bitmap2 = _interopRequireDefault(_bitmap);

      var _text = __webpack_require__(4);

      var _text2 = _interopRequireDefault(_text);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var HitRender = function (_Render) {
        _inherits(HitRender, _Render);

        function HitRender() {
          _classCallCheck(this, HitRender);

          var _this = _possibleConstructorReturn(this, (HitRender.__proto__ || Object.getPrototypeOf(HitRender)).call(this));

          if (typeof wx !== 'undefined' && wx.createCanvas) {
            _this.canvas = wx.createCanvas();
          } else {
            _this.canvas = document.createElement('canvas');
          }

          _this.canvas.width = 1;
          _this.canvas.height = 1;
          _this.ctx = _this.canvas.getContext('2d');

          // debug event
          // this.canvas.width = 441
          // this.canvas.height = 441
          // this.ctx = this.canvas.getContext('2d')
          // document.body.appendChild(this.canvas)

          _this.disableEvents = ['mouseover', 'mouseout', 'mousemove', 'touchmove'];
          return _this;
        }

        _createClass(HitRender, [{
          key: 'clear',
          value: function clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
          }
        }, {
          key: 'hitAABB',
          value: function hitAABB(o, evt, cb) {
            var list = o.children.slice(0),
                l = list.length;
            for (var i = l - 1; i >= 0; i--) {
              var child = list[i];
              // if (!this.isbindingEvent(child)) continue;
              var target = this._hitAABB(child, evt, cb);
              if (target) return target;
            }
          }
        }, {
          key: '_hitAABB',
          value: function _hitAABB(o, evt, cb) {
            if (!o.isVisible()) {
              return;
            }
            if (o instanceof _group2.default) {
              var list = o.children.slice(0),
                  l = list.length;
              for (var i = l - 1; i >= 0; i--) {
                var child = list[i];
                var target = this._hitAABB(child, evt);
                if (target) return target;
              }
            } else {
              if (o.AABB && this.checkPointInAABB(evt.stageX, evt.stageY, o.AABB)) {
                // this._bubbleEvent(o, type, evt);
                this._dispatchEvent(o, evt);
                return o;
              }
            }
          }
        }, {
          key: 'checkPointInAABB',
          value: function checkPointInAABB(x, y, AABB) {
            var minX = AABB[0];
            if (x < minX) return false;
            var minY = AABB[1];
            if (y < minY) return false;
            var maxX = minX + AABB[2];
            if (x > maxX) return false;
            var maxY = minY + AABB[3];
            if (y > maxY) return false;
            return true;
          }
        }, {
          key: 'hitPixel',
          value: function hitPixel(o, evt, cb) {
            var ctx = this.ctx;
            var mtx = o._hitMatrix;
            var list = o.children.slice(0),
                l = list.length;
            for (var i = l - 1; i >= 0; i--) {
              var child = list[i];
              mtx.initialize(1, 0, 0, 1, 0, 0);
              mtx.appendTransform(o.x - evt.stageX, o.y - evt.stageY, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.originX, o.originY);
              // if (!this.checkBoundEvent(child)) continue
              ctx.save();
              var target = this._hitPixel(child, evt, mtx, cb);
              ctx.restore();
              if (target) return target;
            }
          }

          // checkBoundEvent () {
          //   return true
          // }

        }, {
          key: '_hitPixel',
          value: function _hitPixel(o, evt, mtx, cb) {
            if (!o.isVisible()) return;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, 2, 2);
            if (mtx) {
              o._hitMatrix.initialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            } else {
              o._hitMatrix.initialize(1, 0, 0, 1, 0, 0);
            }
            mtx = o._hitMatrix;
            mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.originX, o.originY);
            if (o instanceof _group2.default) {
              var list = o.children.slice(0),
                  l = list.length;
              for (var i = l - 1; i >= 0; i--) {
                ctx.save();
                var target = this._hitPixel(list[i], evt, mtx, cb);
                if (target) return target;
                ctx.restore();
              }
            } else {
              var ocg = o.clipGraphics;
              if (ocg) {
                ctx.beginPath();
                ocg._matrix.copy(mtx);
                ocg._matrix.appendTransform(ocg.x, ocg.y, ocg.scaleX, ocg.scaleY, ocg.rotation, ocg.skewX, ocg.skewY, ocg.originX, ocg.originY);
                ctx.setTransform(ocg._matrix.a, ocg._matrix.b, ocg._matrix.c, ocg._matrix.d, ocg._matrix.tx, ocg._matrix.ty);
                ocg.render(ctx);
                ctx.clip(o.clipRuleNonzero ? 'nonzero' : 'evenodd');
              }
              ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
              if (o.cacheCanvas) {
                ctx.drawImage(o.cacheCanvas, 0, 0);
              } else if (o instanceof _graphics2.default) {
                ctx.globalCompositeOperation = o.complexCompositeOperation;
                ctx.globalAlpha = o.complexAlpha;
                o.render(ctx);
              } else if (o instanceof _sprite2.default && o.rect) {
                ctx.globalCompositeOperation = o.complexCompositeOperation;
                ctx.globalAlpha = o.complexAlpha;
                o.updateFrame();
                var rect = o.rect;
                ctx.drawImage(o.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
              } else if (o instanceof _bitmap2.default && o.rect) {
                ctx.globalCompositeOperation = o.complexCompositeOperation;
                ctx.globalAlpha = o.complexAlpha;
                var bRect = o.rect;
                ctx.drawImage(o.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
              } else if (o instanceof _text2.default) {
                ctx.globalCompositeOperation = o.complexCompositeOperation;
                ctx.globalAlpha = o.complexAlpha;

                ctx.font = o.font;
                ctx.fillStyle = o.color;
                ctx.textBaseline = o.baseline;
                ctx.fillText(o.text, 0, 0);
              }
            }

            if (ctx.getImageData(0, 0, 1, 1).data[3] > 1) {
              this._dispatchEvent(o, evt);
              return o;
            }
          }
        }, {
          key: '_dispatchEvent',
          value: function _dispatchEvent(obj, evt) {
            if (this.disableEvents.indexOf(evt.type) !== -1) return;
            var mockEvt = new _event2.default();
            mockEvt.stageX = evt.stageX;
            mockEvt.stageY = evt.stageY;
            mockEvt.pureEvent = evt;
            mockEvt.type = evt.type;
            obj.dispatchEvent(mockEvt);
          }
        }]);

        return HitRender;
      }(_render2.default);

      exports.default = HitRender;

      /***/
    },
    /* 26 */
    /***/function (module, exports, __webpack_require__) {

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

      var _graphics = __webpack_require__(3);

      var _graphics2 = _interopRequireDefault(_graphics);

      var _render = __webpack_require__(8);

      var _render2 = _interopRequireDefault(_render);

      var _event = __webpack_require__(7);

      var _event2 = _interopRequireDefault(_event);

      var _sprite = __webpack_require__(5);

      var _sprite2 = _interopRequireDefault(_sprite);

      var _bitmap = __webpack_require__(6);

      var _bitmap2 = _interopRequireDefault(_bitmap);

      var _text = __webpack_require__(4);

      var _text2 = _interopRequireDefault(_text);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var WxHitRender = function (_Render) {
        _inherits(WxHitRender, _Render);

        function WxHitRender(ctx, component, canvasId) {
          _classCallCheck(this, WxHitRender);

          var _this = _possibleConstructorReturn(this, (WxHitRender.__proto__ || Object.getPrototypeOf(WxHitRender)).call(this));

          _this.ctx = ctx;
          _this._isWeapp = true;
          _this._component = component;
          _this._hitCanvasId = canvasId + 'Hit';

          _this.disableEvents = ['mouseover', 'mouseout', 'mousemove', 'touchmove'];
          return _this;
        }

        _createClass(WxHitRender, [{
          key: 'clear',
          value: function clear() {
            this.ctx.clearRect(0, 0, 2, 2);
          }
        }, {
          key: 'hit',
          value: function hit(list, evt, cb, current) {
            var _this2 = this;

            var ctx = this.ctx;
            var obj = list[current];
            var mtx = obj._hitMatrix.initialize(1, 0, 0, 1, 0, 0);
            ctx.save();
            mtx.appendTransform(obj.x - evt.stageX, obj.y - evt.stageY, obj.scaleX, obj.scaleY, obj.rotation, obj.skewX, obj.skewY, obj.originX, obj.originY);
            ctx.globalCompositeOperation = obj.complexCompositeOperation;
            ctx.globalAlpha = obj.complexAlpha;
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            if (obj instanceof _graphics2.default) {
              obj.render(ctx);
            } else if (obj instanceof _sprite2.default && obj.rect) {
              obj.updateFrame();
              var rect = obj.rect;
              ctx.drawImage(obj.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
            } else if (obj instanceof _bitmap2.default && obj.rect) {
              var bRect = obj.rect;
              ctx.drawImage(obj.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
            } else if (obj instanceof _text2.default) {
              ctx.font = obj.font;
              ctx.fillStyle = obj.color;
              ctx.fillText(obj.text, 0, 0);
            }
            ctx.restore();
            current--;
            ctx.draw(false, function () {
              wx.canvasGetImageData({
                canvasId: _this2._hitCanvasId,
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                success: function success(res) {
                  if (res.data[3] > 1) {
                    _this2._dispatchEvent(obj, evt);
                    cb(obj);
                  } else {
                    if (current > -1) {
                      _this2.hit(list, evt, cb, current);
                    }
                  }
                }
              }, _this2._component);
            });
          }
        }, {
          key: '_dispatchEvent',
          value: function _dispatchEvent(obj, evt) {
            if (this.disableEvents.indexOf(evt.type) !== -1) return;
            var mockEvt = new _event2.default();
            mockEvt.stageX = evt.stageX;
            mockEvt.stageY = evt.stageY;
            mockEvt.pureEvent = evt;
            mockEvt.type = evt.type;
            obj.dispatchEvent(mockEvt);
          }
        }]);

        return WxHitRender;
      }(_render2.default);

      exports.default = WxHitRender;

      /***/
    },
    /* 27 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ArrowPath = function (_Shape) {
        _inherits(ArrowPath, _Shape);

        function ArrowPath(path, option) {
          _classCallCheck(this, ArrowPath);

          var _this = _possibleConstructorReturn(this, (ArrowPath.__proto__ || Object.getPrototypeOf(ArrowPath)).call(this));

          _this.path = path;
          _this.option = Object.assign({
            strokeStyle: 'black',
            lineWidth: 1
          }, option);
          return _this;
        }

        _createClass(ArrowPath, [{
          key: 'draw',
          value: function draw() {
            var path = this.path;
            this.beginPath();
            var len = path.length;
            if (len === 2) {
              this.drawArrow(path[0].x, path[0].y, path[1].x, path[1].y, 30, 10);
            } else {
              this.moveTo(path[0].x, path[0].y);
              for (var i = 1; i < len - 1; i++) {
                this.lineTo(path[i].x, path[i].y);
              }
              this.drawArrow(path[len - 2].x, path[len - 2].y, path[len - 1].x, path[len - 1].y, 30, 10);
            }

            this.stroke();
          }
        }, {
          key: 'drawArrow',
          value: function drawArrow(fromX, fromY, toX, toY, theta, headlen) {

            var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
                angle1 = (angle + theta) * Math.PI / 180,
                angle2 = (angle - theta) * Math.PI / 180,
                topX = headlen * Math.cos(angle1),
                topY = headlen * Math.sin(angle1),
                botX = headlen * Math.cos(angle2),
                botY = headlen * Math.sin(angle2);

            var arrowX = fromX - topX,
                arrowY = fromY - topY;

            this.moveTo(arrowX, arrowY);
            this.moveTo(fromX, fromY);
            this.lineTo(toX, toY);
            arrowX = toX + topX;
            arrowY = toY + topY;
            this.moveTo(arrowX, arrowY);
            this.lineTo(toX, toY);
            arrowX = toX + botX;
            arrowY = toY + botY;
            this.lineTo(arrowX, arrowY);
            this.strokeStyle(this.option.strokeStyle);
            this.lineWidth(this.option.lineWidth);
          }
        }]);

        return ArrowPath;
      }(_shape2.default);

      exports.default = ArrowPath;

      /***/
    },
    /* 28 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Ellipse = function (_Shape) {
        _inherits(Ellipse, _Shape);

        function Ellipse(width, height, option) {
          _classCallCheck(this, Ellipse);

          var _this = _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this));

          _this.option = option || {};
          _this.width = width;
          _this.height = height;
          return _this;
        }

        _createClass(Ellipse, [{
          key: 'draw',
          value: function draw() {
            var w = this.width;
            var h = this.height;
            var k = 0.5522848;
            var ox = w / 2 * k;
            var oy = h / 2 * k;
            var xe = w;
            var ye = h;
            var xm = w / 2;
            var ym = h / 2;

            this.beginPath();
            this.moveTo(0, ym);
            this.bezierCurveTo(0, ym - oy, xm - ox, 0, xm, 0);
            this.bezierCurveTo(xm + ox, 0, xe, ym - oy, xe, ym);
            this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            this.bezierCurveTo(xm - ox, ye, 0, ym + oy, 0, ym);

            if (this.option.strokeStyle) {
              if (this.option.lineWidth !== undefined) {
                this.lineWidth(this.option.lineWidth);
              }
              this.strokeStyle(this.option.strokeStyle);
              this.stroke();
            }

            if (this.option.fillStyle) {
              this.fillStyle(this.option.fillStyle);
              this.fill();
            }
          }
        }]);

        return Ellipse;
      }(_shape2.default);

      exports.default = Ellipse;

      /***/
    },
    /* 29 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _group = __webpack_require__(1);

      var _group2 = _interopRequireDefault(_group);

      var _text = __webpack_require__(4);

      var _text2 = _interopRequireDefault(_text);

      var _roundedRect = __webpack_require__(15);

      var _roundedRect2 = _interopRequireDefault(_roundedRect);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Button = function (_Group) {
        _inherits(Button, _Group);

        function Button(option) {
          _classCallCheck(this, Button);

          var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

          _this.width = option.width;
          _this.roundedRect = new _roundedRect2.default(option.width, option.height, option.r);
          _this.text = new _text2.default(option.text, {
            font: option.font,
            color: option.color
          });

          _this.text.x = option.width / 2 - _this.text.getWidth() / 2 * _this.text.scaleX;
          _this.text.y = option.height / 2 - 10 + 5 * _this.text.scaleY;
          _this.add(_this.roundedRect, _this.text);
          return _this;
        }

        return Button;
      }(_group2.default);

      exports.default = Button;

      /***/
    },
    /* 30 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Rect = function (_Shape) {
        _inherits(Rect, _Shape);

        function Rect(width, height, option) {
          _classCallCheck(this, Rect);

          var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this));

          _this.width = width;
          _this.height = height;
          _this.option = option || {};
          return _this;
        }

        _createClass(Rect, [{
          key: 'draw',
          value: function draw() {
            if (this.option.fillStyle) {
              this.fillStyle(this.option.fillStyle);
              this.fillRect(0, 0, this.width, this.height);
            }

            if (this.option.strokeStyle) {
              this.strokeStyle(this.option.strokeStyle);
              this.strokeRect(0, 0, this.width, this.height);
            }
          }
        }]);

        return Rect;
      }(_shape2.default);

      exports.default = Rect;

      /***/
    },
    /* 31 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Circle = function (_Shape) {
        _inherits(Circle, _Shape);

        function Circle(r, option) {
          _classCallCheck(this, Circle);

          var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

          _this.option = option || {};
          _this.r = r;

          _this._dp = Math.PI * 2;
          return _this;
        }

        _createClass(Circle, [{
          key: 'draw',
          value: function draw() {
            this.beginPath();
            this.arc(0, 0, this.r, 0, this._dp, false);

            if (this.option.strokeStyle) {
              if (this.option.lineWidth !== undefined) {
                this.lineWidth(this.option.lineWidth);
              }
              this.strokeStyle(this.option.strokeStyle);
              this.stroke();
            }

            if (this.option.fillStyle) {
              this.fillStyle(this.option.fillStyle);
              this.fill();
            }
          }
        }]);

        return Circle;
      }(_shape2.default);

      exports.default = Circle;

      /***/
    },
    /* 32 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Polygon = function (_Shape) {
        _inherits(Polygon, _Shape);

        function Polygon(vertex, options) {
          _classCallCheck(this, Polygon);

          var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

          _this.vertex = vertex || [];
          _this.options = options || {};
          _this.strokeColor = _this.options.strokeColor;
          _this.fillColor = _this.options.fillColor;
          return _this;
        }

        _createClass(Polygon, [{
          key: 'draw',
          value: function draw() {
            this.clear().beginPath();
            this.strokeStyle(this.strokeColor);
            this.moveTo(this.vertex[0][0], this.vertex[0][1]);

            for (var i = 1, len = this.vertex.length; i < len; i++) {
              this.lineTo(this.vertex[i][0], this.vertex[i][1]);
            }
            this.closePath();
            // 路径闭合
            //  if (this.options.strokeStyle) {
            //    this.strokeStyle = strokeStyle;
            // this.lineWidth(this.options.width);
            // this.lineJoin('round');
            // this.stroke();
            //  }
            if (this.strokeColor) {
              this.strokeStyle(this.strokeColor);
              this.stroke();
            }
            if (this.fillColor) {
              this.fillStyle(this.fillColor);
              this.fill();
            }
          }
        }]);

        return Polygon;
      }(_shape2.default);

      exports.default = Polygon;

      /***/
    },
    /* 33 */
    /***/function (module, exports, __webpack_require__) {

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

      var _shape = __webpack_require__(0);

      var _shape2 = _interopRequireDefault(_shape);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var EquilateralPolygon = function (_Shape) {
        _inherits(EquilateralPolygon, _Shape);

        function EquilateralPolygon(num, r, options) {
          _classCallCheck(this, EquilateralPolygon);

          var _this = _possibleConstructorReturn(this, (EquilateralPolygon.__proto__ || Object.getPrototypeOf(EquilateralPolygon)).call(this));

          _this.num = num;
          _this.r = r;
          _this.options = options || {};
          _this.strokeColor = options.strokeColor || 'black';
          _this.vertex = [];
          _this.initVertex();
          return _this;
        }

        _createClass(EquilateralPolygon, [{
          key: 'initVertex',
          value: function initVertex() {
            this.vertex.length = [];
            var num = this.num;
            var r = this.r;
            var i = void 0,
                startX = void 0,
                startY = void 0,
                newX = void 0,
                newY = void 0;

            if (num % 2 === 0) {
              startX = r * Math.cos(2 * Math.PI * 0 / num);
              startY = r * Math.sin(2 * Math.PI * 0 / num);

              this.vertex.push([startX, startY]);
              for (i = 1; i < num; i++) {
                newX = r * Math.cos(2 * Math.PI * i / num);
                newY = r * Math.sin(2 * Math.PI * i / num);

                this.vertex.push([newX, newY]);
              }
            } else {
              startX = r * Math.cos(2 * Math.PI * 0 / num - Math.PI / 2);
              startY = r * Math.sin(2 * Math.PI * 0 / num - Math.PI / 2);

              this.vertex.push([startX, startY]);
              for (i = 1; i < num; i++) {
                newX = r * Math.cos(2 * Math.PI * i / num - Math.PI / 2);
                newY = r * Math.sin(2 * Math.PI * i / num - Math.PI / 2);

                this.vertex.push([newX, newY]);
              }
            }
          }
        }, {
          key: 'draw',
          value: function draw() {
            this.beginPath();
            this.strokeStyle(this.strokeColor);
            this.moveTo(this.vertex[0][0], this.vertex[0][1]);

            for (var i = 1, len = this.vertex.length; i < len; i++) {
              this.lineTo(this.vertex[i][0], this.vertex[i][1]);
            }
            this.closePath();
            // 路径闭合
            //  if (this.options.strokeStyle) {
            //    this.strokeStyle = strokeStyle;
            // this.lineWidth(this.options.width);
            // this.lineJoin('round');
            this.stroke();
            //  }
            if (this.options.fillStyle) {
              this.fillStyle(this.options.fillStyle);
              this.fill();
            }
          }
        }]);

        return EquilateralPolygon;
      }(_shape2.default);

      exports.default = EquilateralPolygon;

      /***/
    }]
    /******/)
  );
});

},{}],3:[function(require,module,exports){
(function (Buffer){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//一个js开发框架
//template.event.canvas
//v0.8.20180625
;
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tpler', [], factory);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = factory();
    } else {
        if (root) {
            root.tpler = factory();
        } else {
            var _ = factory();
        }
    }
})(undefined, function () {
    var inBrowser = typeof window !== 'undefined';
    console.log("before inBrowser:" + inBrowser);
    var isSupportTouch = inBrowser ? function () {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }() : false;

    //类型
    var type = function type(o) {
        if (o === null) return 'null';
        var s = Object.prototype.toString.call(o);
        var t = s.match(/\[object (.*?)\]/)[1].toLowerCase();
        return t === 'number' ? isNaN(o) ? 'nan' : !isFinite(o) ? 'infinity' : t : t;
    };

    //继承私有属性 不包括原型方法 
    var extend = function extend(obj) {
        var len = arguments.length;
        if (len > 1) obj = obj || {};
        for (var i = 1; i < len; i++) {
            var source = arguments[i];
            if (source) {
                for (var prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        if (type(source[prop]) === "array") {
                            obj[prop] = extend([], source[prop]);
                        } else if (type(source[prop]) === "object") {
                            obj[prop] = extend({}, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    }
                }
            }
        }
        return obj;
    };

    //定义类属性    方法不允许枚举
    var createClass = function () {
        function defineProperties(target, props) {
            for (var key in props) {
                if (target.hasOwnProperty(key)) {
                    console.log(_.type(target) + " hasOwnProperty " + key);
                } else {
                    //不覆盖已有属性
                    var descriptor = {
                        key: key,
                        value: props[key],
                        enumerable: false,
                        configurable: true,
                        writable: true
                    };
                    Object.defineProperty(target, key, descriptor);
                }
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var screen = {
        x: 100,
        y: 100
    },
        envt;
    if (inBrowser) {
        var ua = window.navigator.userAgent.toLowerCase(),
            isIE = /msie|trident/.test(ua),
            isIE9 = !!~ua.indexOf('msie 9.0'),
            isEdge = !!~ua.indexOf('edge/'),
            isChrome = /chrome\/\d+/.test(ua) && !isEdge,
            weixin = /MicroMessenger/i.test(ua),
            isWxMiniProgram = /miniprogram/i.test(window.__wxjs_environment);

        var env = function () {
            var os = {},
                android = ua.match(/(Android)[\s\/]+([\d\.]+)/),
                ios = ua.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
                wp = ua.match(/(Windows\s+Phone)\s([\d\.]+)/),
                isWebkit = /WebKit\/[\d.]+/i.test(ua),
                isSafari = ios ? navigator.standalone ? isWebkit : /Safari/i.test(ua) && !/CriOS/i.test(ua) && !/MQQBrowser/i.test(ua) : false;
            if (android) {
                os.isAndroid = true;
                os.android = true;
                os.version = android[2];
            }
            if (ios) {
                os.isIOS = true;
                os.ios = true;
                os.version = ios[2].replace(/_/g, '.');
                os.ios7 = /^7/.test(os.version);
                os.ios11 = /^11/.test(os.version);
                if (ios[1] === 'iPad') {
                    os.ipad = true;
                } else if (ios[1] === 'iPhone') {
                    os.iphone = true;
                } else if (ios[1] === 'iPod') {
                    os.ipod = true;
                }
            }
            if (isWebkit) {
                os.webkit = true;
            }
            if (isSafari) {
                os.safari = true;
            }
            return os;
        }();
        envt = extend(env, {
            inBrowser: inBrowser,
            ua: ua,
            isIE: isIE,
            isIE9: isIE9,
            isEdge: isEdge,
            isChrome: isChrome,
            weixin: weixin,
            isWxMiniProgram: isWxMiniProgram
        });
        screen = {
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientHeight
        };
    }

    var _ = {
        envt: envt,
        screen: screen,
        type: type,
        extend: extend,
        createClass: createClass,

        isElement: function isElement(o) {
            return (/html.*?element/i.test(this.type(o))
            ); // htmlxxxElement
            //Illegal invocation:Element.prototype.nodeName
            // return o && (o.nodeType === 1 || o.nodeType === 9);
            //  1-ELEMENT 
            // 2-ATTRIBUTE 
            // 3-TEXT 
            // 4-CDATA 
            // 5-ENTITY REFERENCE 
            // 6-ENTITY 
            // 7-PI (processing instruction) 
            // 8-COMMENT 
            // 9-DOCUMENT 
            // 10-DOCUMENT TYPE 
            // 11-DOCUMENT FRAGMENT 
            // 12-NOTATION 
        },
        isDocument: function isDocument(o) {
            return (/document/i.test(this.type(o))
            );
            // return o && o.nodeName && o.nodeType === 9;
        },
        //对象类名
        objectName: function objectName(obj) {
            return _.isUndefined(obj) ? _.isUndefined(obj) : _.isNull(obj) ? _.isNull(obj) : obj.prototype.constructor ? obj.prototype.constructor.name : obj.__proto__.constructor.name;
        },
        //has(obj,"z.b.c")  key in obj
        has: function has(obj, key) {
            if (_.isObject(obj)) {
                if (_.isNumber(+key)) return obj.hasOwnProperty('' + key);
                var ks = key.split("."),
                    o = obj;
                while (key = ks.shift()) {
                    //trim
                    if (o && o.hasOwnProperty(key)) {
                        //Object.prototype.hasOwnProperty.call(this, k)
                        o = o[key];
                    } else {
                        return false;
                    }
                }
                return true;
            } else if (_.isArray(obj) || _.isString(obj)) {
                return !!~obj.indexOf(key); // >= 0
            }
            return false;
        },
        isJQuery: function isJQuery(o) {
            return o ? !!o.jquery : false;
        },
        keys: function keys(obj) {
            if (!_.isObject(obj)) return [];
            if (Object.keys) return Object.keys(obj);
            var arr = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) arr[arr.length] = key;
            }return arr;
        },
        //对象  数组 相等
        equal: function equal(a, b) {
            if (a === b) {
                return true;
            } else if (_.isArray(a) && _.isArray(b)) {
                return a.toString() === b.toString();
            } else if (_.isObject(a) && _.isObject(b)) {
                if (_.keys(a).length !== _.keys(b).length) return false;
                for (var k in a) {
                    if (!_.equal(a[k], b[k])) return false;
                }return true;
            } else if (_.type(a) === _.type(b)) {
                return a === b;
            }
            return false;
        },

        text: function text(obj) {
            //HTMLScriptElement.text  是一个属性，故用此方法
            if (_.isElement(obj)) return obj.innerText;
        },
        html: function html(obj) {
            if (_.isElement(obj)) return obj.innerHTML;
        },
        fast: function fast() {
            var len = arguments.length,
                args = new Array(len),
                //fast then Array.prototype.slice.call(arguments)
            times = 10000;
            while (len--) {
                args[len] = arguments[len];
            }var last = args[args.length - 1];
            if (_.isNumber(last)) {
                times = last;
                args.pop();
            }
            var _run = function _run(fn, times) {
                var word = 'run ' + fn.name + '{} ' + times + ' time' + (times > 1 ? 's' : '');
                console.time(word);
                while (times--) {
                    fn.apply(this, args);
                }console.timeEnd(word);
            };
            args.forEach(function (t) {
                t && _run.call(this, t, times);
            });
        },

        //位置信息  事件 Element
        pos: function pos(e, offset) {
            function Postion(x, y, el) {
                if (_.isDocument(el)) el = document.doctype ? window.document.documentElement : document.body;
                this.x = x;
                this.y = y;
                this.time = +new Date();
                this.el = el;
                this.width = el.clientWidth; //不包括边框   el.offsetWidth包括边框;
                this.height = el.clientHeight; //el.offsetHeight;
                this.scrollTop = el.scrollTop;
                this.scrollHeight = el.scrollHeight;
                this.offsetHeight = el.offsetHeight;
                this.top = y;
                this.left = x;
                this.right = x + this.width;
                this.bottom = y + this.height;
            }
            var offsetPos;
            if (_.isElement(offset) || _.isTouchEvent(e) || _.isMouseEvent(e)) {
                offsetPos = _.pos(offset);
            } else if (_.isObject(offset) && "Postion" === _.objectName(offset)) {
                // offset.__proto__.constructor.name ==
                offsetPos = offset;
            }
            if (_.isElement(e)) {
                var _pos = function _pos(el) {
                    var pos = new Postion(el.offsetLeft, el.offsetTop, el);
                    var target = el.offsetParent;
                    while (target) {
                        pos.x += target.offsetLeft;
                        pos.y += target.offsetTop;
                        target = target.offsetParent;
                    }
                    if (offsetPos) {
                        pos.x -= offsetPos.x;
                        pos.y -= offsetPos.y;
                    }
                    return pos;
                };

                //元素
                //手机不兼容
                // if (e.getBoundingClientRect) return e.getBoundingClientRect().toJSON();
                var el = e;

                return _pos(el);
            } else if (_.isTouchEvent(e) || _.isMouseEvent(e)) {
                //事件
                var ev = e,
                    x,
                    y,
                    el = ev.currentTarget; //(一般为parent /document)  ev.target; //
                var _touches = ev.touches && ev.touches.length > 0 ? ev.touches : ev.changedTouches;
                if (!_touches || _touches.length === 0) {
                    x = ev.clientX;
                    y = ev.clientY;
                } else {
                    var pos = _touches[0]; //第一个手指
                    x = pos.pageX;
                    y = pos.pageY;
                    // el = pos.target;
                    // if (_touches.length > 1) {  //多个手指
                    //     var ps = []
                    //     _touches.forEach(function(t) {
                    //         ps.push(new Postion(t.x, t.y, el);)
                    //     })
                    //     return ps;
                    // }
                }
                if (offsetPos) {
                    x -= offsetPos.x;
                    y -= offsetPos.y;
                }
                return new Postion(x, y, el);
            } else if (_.isString(e)) {
                return _.pos(_.query(e));
            }
        },
        //拖动事件
        drag: function drag(el) {
            toucher({
                el: el,
                type: "drag"
            });
        },
        //url信息
        parseUrl: function parseUrl(url) {
            var params = {},
                hash = location.hash,
                route = hash,
                url = url || window.location.href,
                domain,
                host,
                port;
            url.replace(/http[s]?:\/\/([^:]*?)(?::(\d+))?\//, function (d, h, p) {
                domain = d.substring(0, d.length - 1);
                host = h;
                port = p;
            });

            var getHash = function getHash() {
                var match = url.match(/#(.*)$/);
                return match ? match[1] : '';
            };
            var decodeFragment = function decodeFragment(fragment) {
                return decodeURI(fragment.replace(/%25/g, '%2525'));
            };
            var getSearch = function getSearch() {
                var match = location.href.replace(/#.*/, '').match(/\?.+/);
                return match ? match[0] : '';
            };
            var getPath = function getPath() {
                var path = decodeFragment(location.pathname + getSearch()).slice(0);
                return path.charAt(0) === '/' ? path.slice(1) : path;
            };
            var path = getPath();

            hash = getHash();
            // api.html?id=3&page=fff#events
            // api.html#events?id=3&page=fff
            // api.html#events/1122
            url.replace(/[?&](.+?)=([^&#]*)/g, function (_, k, v) {
                params[k] = decodeURI(v);
            });
            //#去重
            if (hash) {
                hash = hash.length > 1 ? hash.replace(/#+/g, "#") : "";
                route = hash.replace(/#/g, "");
            }
            return {
                params: params,
                hash: hash,
                route: route,
                path: path,
                domain: domain,
                host: host,
                port: port
            };
        },
        guid: 1,
        //  生成一个随机id
        uId: function uId() {
            return Math.random().toString(16).slice(2);
        },
        //随机id
        random: function random(possible, len, prefix) {
            if (_.isArray(possible)) {
                return possible[Math.random() * possible.length << 0];
            } else if (_.isNumber(possible)) {
                return Math.random() * possible << 0;
            } else {
                var str = prefix || "_",
                    len = len || 6,
                    possible = possible || "abcdefghijklmnopqrstuvwxyz"; //ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
                for (var i = 0; i < len; i++) {
                    str += possible.charAt(Math.random() * possible.length << 0);
                }
                return str;
            }
        },
        //规定范围内取值
        between: function between(left, right, val) {
            var len = arguments.length;
            if (len === 3) return _.min(right, _.max(left, val));
            if (len === 1) return left * Math.random() << 0;
            if (String(left).indexOf(".") === -1) return left + (right - left + 1) * Math.random() << 0;
            var n = String(left).split(".")[1].length;
            return +(left + (right - left) * Math.random()).toFixed(n);
        },
        //数组分组统计
        grpstats: function grpstats(arr) {
            var o = {};
            arr.forEach(function (t) {
                if (_.has(o, t)) {
                    o[t] += 1;
                } else {
                    o[t] = 1;
                }
            });
            return o;
        },
        //自动为ele生成一个随机id
        autoid: function autoid(ele, force) {
            var _autoid = function _autoid(ele) {
                if (_.isDocument(ele)) return ele;
                if (_.isElement(ele)) {
                    if (force) {
                        ele.setAttribute("id", _.random());
                    } else {
                        _.isEmpty(ele.id) && ele.setAttribute("id", _.random());
                    }
                }
                return ele;
            };
            return _.isArray(ele) ? ele.map(function (t) {
                return _autoid(t);
            }) : _autoid(ele);
        },
        //转化jquery =>Element
        jqToEl: function jqToEl(selector, callback) {
            if (_.isJQuery(selector)) {
                var result = [];
                selector.each(function (i, t) {
                    if (callback) {
                        result[result.length] = callback(t);
                    } else {
                        result[result.length] = t;
                    }
                });
                return result.length === 1 ? result[0] : result;
            }
        },
        //Array.prototype.find已经存在，所以使用query
        //返回结果
        //找不到 返回  []，与 closest addclass removeclass等统一[] ，方便链式写
        //找到数组 [el]，长度为1的时，返回 el  ，方便 siblings链式
        query: function query(selector) {
            var len = arguments.length,
                args = new Array(len);
            while (len--) {
                args[len] = arguments[len];
            }if (args.length > 1) selector = '' + args;
            if (_.isWindow(selector) || _.isDocument(selector)) return selector;
            if (_.isFunction(selector)) {
                selector();
                return [];
            }
            var _selectorFn = function _selectorFn(selector) {
                if (_.isElement(this)) {
                    _.autoid(this);
                    if (this.id) {
                        var arr = selector.split(",");
                        var base = "#" + this.id;
                        selector = base + arr.join("," + base) + "," + base + " " + arr.join("," + base + " ");
                    }
                }
                return selector;
            };
            if (_.isElement(selector)) {
                _.autoid(selector);
                if (_.isElement(this)) {
                    selector = "#" + selector.id;
                    selector = _selectorFn.call(this, selector);
                } else {
                    return selector;
                }
            } else if (_.isArray(selector)) {
                return selector.map(function (t) {
                    return _.query(t);
                });
            } else if (_.isJQuery(selector)) {
                //兼容JQuery
                return _.jqToEl(selector);
            } else {
                selector = _selectorFn.call(this, selector);
            }

            try {
                var eles = document.querySelectorAll(selector),
                    args = Array.prototype.slice.call(eles),
                    len = args.length;
                return len === 0 ? [] : len === 1 ? _.autoid(args[0]) : _.autoid(args);
            } catch (e) {
                console.log(e);
                //jQuery特有表达式 :filter
                var arr = selector.split(":");
                return arr.length > 1 ? _.query(arr[0]).filter(arr[1]) : [];
            }
        },

        // filters
        //JavaScript对象
        //JSON.parse() 和   $.parseJSON 必须遵从格式完好
        // 字符串必须符合严格的JSON格式，属性名称必须加双引号、字符串值也必须用双引号。
        //JSON标准不允许字符串中出现"控制字符"，例如：一个Tab或换行符。正确写法应该如下(使用两个反斜杠，以免被JS解析器直接转义\t或\n)：
        //格式不完好的json字符串处理 "{id:1}"
        //不必符合严格的JSON格式
        //非标准格式json
        json: function json(str) {
            if (_.isEmpty(str)) return {};
            try {
                return JSON.parse(str);
            } catch (e1) {
                console.log(e1);
                try {
                    return eval("(" + str + ")");
                } catch (e2) {
                    console.log(e2);
                    return e2;
                }
            }
            // for bad json string
            //`{name:hhoh}`
            // `{\"id:\'1\'}`
            //"{\"id\":'1'}"
            // `{name:a\"bcd}`
            // `{name:'a\"bcd'}`
            //`{id:1,name:'haha,hi:jjo',hh:{Id:33}}`
            // Bad JSON escape sequence 解决方案
            // var _parseObj = function() {
            //     var obj_re = /^{([\s\S]*?):([\s\S]*)}$/
            //     var result = {}
            //     str.replace(obj_re, function(macth, key, val) {
            //         result[key] = val
            //     })
            //     return result
            // }
            // //[{a:1,b:2},{c:3}]  [1,2,3]
            // var _parseArr=function(){
            //     var arr_re=/^\[[\s\S]*\]$/
            //     var result=[];

            // }
        },
        //首字母大写
        capitalize: function capitalize(word) {
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            if (len > 1) return _.capitalize.call(this, args);
            if (_.isArray(word)) return word.map(function (t) {
                return _.capitalize(t);
            });
            word = '' + word;
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        },
        //驼峰命名
        camelCase: function camelCase(word) {
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            if (len > 1) return args[0] + _.capitalize(args.slice(1)).join('');
            if (_.isArray(word)) return word[0] + _.capitalize(word.slice(1)).join('');
            return args[0];
        },
        //驼峰转下划线 underscodeCase
        camel2underscode: function camel2underscode(camelCase) {
            return camelCase.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();
        },
        //复制到剪贴板 只绑定click事件
        copy: function copy(ele, showUI) {
            var range = document.createRange();
            range.selectNode(ele);
            var selection = window.getSelection();
            selection.rangeCount > 0 && selection.removeAllRanges();
            selection.addRange(range);
            // document.execCommand('copy'); //ios系统无效
            try {
                if (document.execCommand('copy', showUI || false, null)) {
                    console.log("copy ok");
                    //success info
                } else {
                    //fail info
                    console.log("copy fail");
                }
            } catch (e) {
                //fail info
                console.log(e);
                console.log("unable to copy");
            }
        },
        // toArray: function(obj) {
        //     var arr = [];
        //     for (var key in obj) {
        //         arr.push({
        //             key: obj[key]
        //         })
        //     }
        //     return arr;
        // },
        //代替 JSON.stringify()
        stringify: function stringify(obj, ownProperty) {
            var str = "",
                k,
                v;
            if (_.isUndefined(obj)) {
                str = "undefined";
            } else if (_.isBoolean(obj)) {
                str = obj.valueOf() ? "true" : "false";
            } else if (_.isString(obj)) {
                str = "\"" + obj + "\"";
            } else if (_.isNumber(obj)) {
                str = obj.valueOf();
            } else if (_.isDocument(obj)) {
                str = "#document";
            } else if (_.isElement(obj)) {
                str = obj.tagName.toLowerCase();
                str += obj.id ? "#" + obj.id : "";
                str += obj.className ? "." + obj.className.replace(/\s+/g, ".") : "";
            } else if (_.isFunction(obj)) {
                if (obj.prototype) {
                    str = "function " + obj.prototype.constructor.name + "(){}";
                } else {
                    str = "function(){}";
                }
            } else if (_.isArray(obj)) {
                str = "[" + obj.map(function (t) {
                    return _.stringify(t);
                }) + "]";
            } else if (_.isMouseEvent(obj)) {
                str = "MouseEvent";
                str += "(" + _.stringify(obj.target) + ")";
            } else if (_.isTouchEvent(obj)) {
                str = "TouchEvent";
                str += "(" + _.stringify(obj.target) + ")";
            } else if (_.isNull(obj)) {
                str += "null";
            } else if (_.isDate(obj)) {
                str = _.time(obj).format();
            } else if (_.isDOMRect(obj)) {
                return _.stringify(obj.toJSON());
            } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object") {
                var sb = [];
                for (k in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, k)) {
                        sb.push("\"" + k + "\":");
                        v = obj[k];
                        if (_.isArray(v)) {
                            v.forEach(function (t) {
                                sb.push(_.stringify(t));
                            });
                        } else {
                            sb.push(_.stringify(v));
                        }
                        sb.push(",");
                    }
                }
                sb.pop();
                str = "{" + sb.join('') + "}";
            } else if (_.isInfinity(obj)) {
                str = "Infinity";
            } else {
                str = "unknowtype";
            }
            return str;
        },
        //符合格式的json字符串
        toJSONString: function toJSONString(json) {
            return _.isObject(json) ? JSON.stringify(json) : json;
        },
        isHtml: function isHtml(tpl) {
            return (/<(\S*?) [^>]*>.*?<\/\1>|<.*?\/?>/.test(tpl)
            );
        },
        preHtml: function preHtml(tpl) {
            // return tpl.replace(/\r\n?/g, "<br>");
            return tpl.replace(/\n/g, "<br>").replace(/\r/g, "<br>");
        },
        getBody: function getBody(content) {
            var matcher = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            return matcher && matcher.length > 1 ? matcher[1] : content;
        },
        // todo
        markdown: function markdown(tpl) {
            if (_.isEmpty(tpl)) {
                tpl = '# 标题  ## 标题2  \n' + '*粗体*  **粗体**  _斜体_ \n' + '***分割___分割---  \n' + '> 引用1 \n' + '> 引用2 \n' + '* 列表项目1 \n* 列表项目2 \n' + '- 列表项目1 \n- 列表项目2 \n' + '+ 列表1\n+ 列表2 \n ' + '1. 列表1\n2. 列表2 \n ' + "[1连接](www.xxx.com) [2连接](www.xxx.com) [3连接](www.xxx.com) [4连接](www.xxx.com) [5连接](www.xxx.com)\n" + '[Ivan Dementev][]\n' + '[Ivan Dementev]: https://github.com/DiVAN1x \n' + "|表格|字段1|字段2|\n|---|---|---|\n|你好|呵呵|吼吼|\n" + '`for(var i=0;i<10,i++) if(i>=5) alert("")`';
                console.log(tpl.replace(/\r?\n/g, "\\r\\n\r\n"));
            }

            //注意先后顺序
            var regs = [
            // 区块引用 >
            {
                tag: "blockquote",
                reg: /(>\s.+\r?\n)+/g
            },
            //表格 
            {
                tag: "table",
                reg: /(\|.+\|\r?\n)+/g
            },
            //标题 #
            {
                tag: "h6",
                reg: /#{6}\s(.+)/g
            }, {
                tag: "h5",
                reg: /#{5}\s(.+)/g
            }, {
                tag: "h4",
                reg: /#{4}\s(.+)/g
            }, {
                tag: "h3",
                reg: /#{3}\s(.+)/g
            }, {
                tag: "h2",
                reg: /#{2}\s(.+)/g
            }, {
                tag: "h1",
                reg: /#{1}\s(.+)/g
            },
            //连接
            // { tag: "img", reg: /\[img\]\((.*?)\)/g },
            {
                tag: "img",
                reg: /!\[(.*?)\]\((.*?)\)/g
            }, {
                tag: "marklink",
                reg: /\[(.*?)\]\[(.*?)\]/
            },

            //[Philipp A]: https://github.com/flying-sheep
            _defineProperty({
                tag: "ref"
            }, 'tag', /\[.*?\]:\s+(https?:\/\/.+)/), {
                tag: "a",
                reg: /\[(.*?)\]\((.*?)\)|(https?:\/\/.+)/g
            },

            // { tag: "a", reg: /\[(.*?)\]\((.*?)\)/g },
            // { tag: "a", reg: /(https?:\/\/.+)/g },

            //分隔
            {
                tag: "hr",
                reg: /[\*|\-|_]{3,}/g
            },
            //强调
            {
                tag: "strong",
                reg: /\*\*(.*?)\*\*/g
            }, {
                tag: "em",
                reg: /\*(.*?)\*/g
            },
            //斜体
            {
                tag: "i",
                reg: /[\s\n]_(.*?)_[\s|\n]/g
            },
            //列表
            // { tag: "ul", reg: /(\s+[\*-]\s.+\r?\n)+/g },
            // { tag: "ul", reg: /([\*-]\s.+(\r?\n|$))+/g }, //[\n]
            // { tag: "ul", reg: /([\*-]\s[\s\S]+)+/g },

            // { tag: "test", reg: /(\s*?-\s[^(-\s)]*)+/g },
            //\d+[.)][\n ]


            {
                tag: "ul",
                reg: /(?:-\s[\s\S]*)?-\s.*(\r?\n|$)/g
            }, {
                tag: "ul",
                reg: /(?:\*\s[\s\S]*)?\*\s.*(\r?\n|$)/g
            },
            // { tag: "ul", reg: /(\s*?-\s[\s\S]+(?:\r?\n|$))+/g },
            // { tag: "ul", reg: /(\s*?-\s.+[\r?\n|$])+|(\s*?\*\s.+[\r?\n|$])+/g },
            // { tag: "ul", reg: /(\s*?-\s.+[\r?\n|$])+/g },
            // { tag: "ul", reg: /(\s*?\*\s.+[\r?\n|$])+/g },


            // { tag: "ul", reg: /(-\s[^-]+)+(\r?\n|$)?/g },
            // { tag: "ul", reg: /(\*\s[^-]+)+?(\r?\n|$)?/g },
            // { tag: "ul", reg: /(\s{2,4}-\s[^-]+)+$?/g },
            // { tag: "ul", reg: /(-\s.+?(\r?\n|$))+/g },
            // { tag: "ul", reg: /(\*\s.+?(\r?\n|$))+/g },
            // { tag: "ul", reg: /(\-\s.+[\n]){1,}/g },
            // { tag: "ul", reg: /(-\s.+\r?\n){1,}/g },

            {
                tag: "ol",
                reg: /(\+\s.+\r?\n)+|(\d\.\s.+\r?\n)+/g
            },
            // { tag: "ol", reg: /(\+\s.+\r?\n)+/g },
            // { tag: "ol2", reg: /(\d\.\s.+\r?\n)+/g },

            // { tag: "ol", reg: /([\+|\d\.]\s.+\r?\n){1,}/g },

            {
                tag: "code",
                reg: /`([\s\S]+)`/g
            },

            //换行
            {
                tag: "br",
                reg: /\r?\n/g
            }];
            //var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

            var _start = function _start(tag, options) {
                var sb = [];
                sb.push('<');
                sb.push(tag);
                for (var key in options) {
                    sb.push(' ' + key + '="' + options[key] + '"');
                }
                sb.push('>');
                return sb.join('');
            };
            var _end = function _end(tag) {
                return '</' + tag + '>';
            };

            var _wrap = function _wrap(tag, text, options) {
                return text ? _start(tag, options) + text + _end(tag) : _start(tag, options);
            };

            var _replace = function _replace(tag, reg) {
                var self = this;
                return this.replace(reg, function (match, text, link, link2) {
                    switch (tag) {
                        case "ref":
                            return "";
                            break;
                        case "marklink":
                            link = link || text;
                            var reg = new RegExp('\\[' + link + '\\]\:(.*?)\\r?\\n', 'i');
                            var link2 = self.match(reg)[1];
                            self = self.replace(reg, "");
                            return _wrap("a", text, link2);
                            break;
                        case 'img':
                            return _wrap(tag, null, {
                                alt: text,
                                src: link
                            });
                            break;
                        case 'a':
                            return _wrap(tag, text || match, {
                                href: link || link2
                            });
                            break;
                        // case 'link':
                        //     return _wrap("a", text, { href: text })
                        //     break;
                        case 'br':
                        case 'hr':
                            return _wrap(tag);
                            break;
                        case "blockquote":
                            match = _.escape.call(match);
                            return _wrap(tag, match);
                            break;
                        case 'ul':
                            //\d+[.)][\n ]
                            // match = _replace.call(match, "childul", /(\s+[\*-]\s(.+)[\r?\n|$])+/g);

                            // match = match.replace(/(\s{2}-\s(.+)(?:\n|$))+/g, function(match) {
                            //     return _wrap(tag, match)
                            // })

                            match = _replace.call(match, "li", /[\*-]\s([\s\S]+?)(?:\n|$)/g);
                            // match = _replace.call(match, "li", /[\*-]\s([\s\S]+?)[\r?\n|$]/g); //递归
                            return _wrap(tag, match);
                            break;
                        case 'ol':
                            match = _replace.call(match, "li", /[(?:\d+\.)|\+]\s(.+)\r?\n/g); //递归
                            return _wrap(tag, match);
                            break;
                        // case 'ol':
                        //     match = _replace.call(match, "li", /\+\s(.+)\r?\n/g); //递归
                        //     return _wrap(tag, match)
                        //     break;
                        // case 'ol2':
                        //     match = _replace.call(match, "li", /\d\.\s(.+)\r?\n/g); //递归
                        //     return _wrap("ol", match)
                        //     break;
                        case "tr":
                            var tds = text.split("|").join("</td><td>");
                            tds = _wrap("td", tds);
                            return _wrap("tr", tds);
                            break;
                        case "table":
                            match = match.replace(/\|.*[\-]{3,}.*\|[\r?\n]/g, "");
                            var trs = _replace.call(match, "tr", /\|(.+)\|[\r?\n]/g); //递归
                            return _wrap(tag, trs);
                            break;
                        case "h1":
                            return _wrap(tag, text);
                            break;
                        case "i":
                            return _wrap(tag, text);
                            break;
                        case "li":
                            return _wrap(tag, text);
                            break;
                        case "code":
                            text = _.escape.call(text);
                            return _wrap(tag, text);
                            break;

                        default:
                            return _wrap(tag, text);
                            break;
                    }
                });
            };

            var reg, tag;
            for (var i = 0, len = regs.length; i < len; i++) {
                reg = regs[i].reg;
                tag = regs[i].tag;
                tpl = _replace.call(tpl, tag, reg);
            }
            return _wrap("article", tpl, {
                class: "markdown-body entry-content"
            });
        },
        // html: function(str) { //htmlspecialchars
        //     // var reg_http=/(((https?):\/\/)?)(((www\.)?([a-zA-Z0-9\-\.\_]+(\.[a-zA-Z]{2,4})))/;
        //     // var reg_http=/^(((https?):\/\/)?)(((www\.)?([a-zA-Z0-9\-\.\_]+(\.[a-zA-Z]{2,4})))/
        //     // var ip=/((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})/
        //     // var options=/(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?/
        //     // var r=/((?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}))(:(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}))?/

        //     if (/^(((https?):\/\/)?)(((www\.)?([a-zA-Z0-9\-\.\_]+(\.[a-zA-Z]{2,4})))|((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})|((?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}))(:(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}))?(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/g.test(str)) {
        //         return '<div class="link" style="color:#6D6DB7;">' + str + '</div>'
        //     } else {
        //         return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br/>');
        //     }
        // },
        isShow: function isShow(elem) {
            //display:none  elem.offsetWidth ==0  不占空间
            //opacity:0 elem.offsetWidth>0  占空间
            elem = _.isElement(elem) ? elem : _.query(elem);
            return elem.offsetWidth > 0 || elem.offsetHeight > 0;
        },
        isHide: function isHide(elem) {
            elem = _.isElement(elem) ? elem : _.query(elem);
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
        },
        hasClass: function hasClass(cls) {
            var elem = this;
            if (_.isJQuery(elem)) elem = elem.get(0);
            return _.isElement(elem) ? !!~elem.className.split(" ").indexOf(cls) : false;
        },
        addClass: function addClass(cls) {
            var elem = this,
                clsArr = Array.prototype.slice.call(arguments);
            if (clsArr.length === 1 && cls) clsArr = cls.split(" ");

            return function _addClass(elem) {
                if (_.isString(elem)) elem = _.query(elem);
                if (_.isElement(elem)) {
                    elem.className = _.uniq(elem.className.split(" ").concat(clsArr)).join(" "); //允许一次加多个样式
                } else if (_.isJQuery(elem)) {
                    elem.addClass(cls); //兼容jquery
                } else if (_.isArray(elem)) {
                    return elem.map(function (t) {
                        return _addClass(t);
                    });
                }
                return elem;
            }(elem);
        },
        removeClass: function removeClass(cls) {
            var elem = this;
            var clsArr = Array.prototype.slice.call(arguments);
            if (clsArr.length === 1 && cls) clsArr = cls.split(" ");
            clsArr.length > 1 && clsArr.forEach(function (t) {
                _.removeClass.call(elem, t);
            });

            return function _removeClass(elem) {
                if (_.isString(elem)) elem = _.query(elem);
                if (_.isElement(elem)) {
                    if (elem.hasClass(cls)) {
                        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                        elem.className = elem.className.replace(reg, ' ').trim();
                    }
                } else if (_.isJQuery(elem)) {
                    elem.removeClass(cls); //兼容jquery
                } else if (_.isArray(elem)) {
                    return elem.map(function (t) {
                        return _removeClass(t);
                    });
                }
                return elem;
            }(elem);
        },
        //悬停效果
        hover: function hover(cls, _callback) {
            var elem = this;
            toucher([{
                el: elem,
                type: "touchstart",
                callback: function callback(item, ev) {
                    item.addClass(cls);
                    // _.addClass.call(item, cls);
                }
            }, {
                el: elem,
                type: "touchend",
                callback: function callback(item, ev) {
                    item.removeClass(cls);
                    // _.removeClass.call(item, cls);
                    _callback && _callback.call(item, ev);
                }
            }]);
            return elem;
        },
        //tab栏切换
        tab: function tab(cls, _callback2) {
            var elem = this;
            toucher([{
                el: elem,
                type: "touchstart",
                callback: function callback(item, ev) {
                    item.addClass(cls).siblings().removeClass(cls);
                    _.$('#' + this.attr("target")).show().siblings().hide();
                }
            }, {
                el: elem,
                type: "touchend",
                callback: function callback(item, ev) {
                    _callback2 && _callback2.call(item, ev);
                }
            }]);
            return elem;
        },
        //数组切割
        slice: function slice(arr, size) {
            var args = Array.prototype.slice.call(arguments),
                //转换成数组
            len = args.length;
            if (len === 2 && _.isArray(arr) && _.isNumber(size)) {
                var result = [];
                for (var x = 0; x < Math.ceil(arr.length / size); x++) {
                    var start = x * size;
                    var end = start + size;
                    result.push(arr.slice(start, end));
                }
                return result;
            }
            return len === 0 ? null : len === 1 ? args[0] : args;
        },
        //判断是否有属性
        hasAttr: function hasAttr(attr) {
            var elem = this;
            if (_.isElement(elem)) {
                return !_.isNull(elem.getAttribute(attr));
            } else if (_.isJQuery(elem)) {
                return !_.isUndefined(elem.attr(attr));
            } else if (_.isString(elem)) {
                return _.hasAttr.call(_.query(elem), attr);
            } else {
                return false;
            }
        },

        //contenteditable是非标准的编辑，光标不能自动跳入，需要用脚本控制
        focus: function focus(editor) {
            editor.onfocus = function () {
                window.setTimeout(function () {
                    var sel, range;
                    try {
                        if (window.getSelection && document.createRange) {
                            range = document.createRange();
                            range.selectNodeContents(editor);
                            range.collapse(true);
                            range.setEnd(editor, editor.childNodes.length);
                            range.setStart(editor, editor.childNodes.length);
                            sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (document.body.createTextRange) {
                            range = document.body.createTextRange();
                            range.moveToElementText(editor);
                            range.collapse(true);
                            range.select();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }, 1);
            };
            editor.focus();
        },
        //图片状态
        isImgLoad: function isImgLoad(img) {
            return isIE ? img.readyState === 'complete' : img.complete;
        },
        loadImg: function loadImg(imgSrc, callback) {
            var originImg; //原图
            if (_.isImage(imgSrc)) {
                originImg = imgSrc;
            } else if (_.isCanvas(imgSrc)) {
                var canvas = imgSrc;
                originImg = new Image();
                originImg.src = canvas.toDataURL('image/jpeg'); //quality
            } else {
                originImg = new Image();
                // originImg.crossOrigin = ''; //支持CORS(Cross-Origin Resource Sharing)（跨域资源共享）
                originImg.src = imgSrc;
            }
            if (_.isImgLoad(originImg)) {
                callback && callback.call(originImg, originImg);
            } else {
                addEvent("load", originImg, function () {
                    // 支持对同一图片处理
                    callback && callback.call(originImg, originImg);
                });
                originImg.onerror = function (e) {
                    console.log("加载图片失败：" + e.path[0].src);
                };
            }
        },
        toDataURL: function toDataURL(imgSrc, callback) {
            var _toDataURL = function _toDataURL(originImg) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var width = originImg.width;
                var height = originImg.height;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(originImg, 0, 0, width, height);
                var img = new Image();
                img.onload = function () {
                    callback && callback(img);
                };
                img.src = canvas.toDataURL('image/jpeg'); //quality
            };
            _.loadImg(imgSrc, _toDataURL);
        },
        toCanvas: function toCanvas(imgSrc, callback) {
            var _toCanvas = function _toCanvas(originImg) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var width = originImg.width;
                var height = originImg.height;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(originImg, 0, 0, width, height);
                callback && callback(canvas);
            };
            _.loadImg(imgSrc, _toCanvas);
        },
        //切图
        //x轴n等分
        //y轴n等分
        cutImg: function cutImg(imgSrc, splitX, splitY, callback) {

            var splitX = _.isUndefined(splitX) ? 3 : splitX;
            var splitY = _.isUndefined(splitY) ? 3 : splitY;
            var _cutImg = function _cutImg(originImg) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var width = originImg.width;
                var height = originImg.height;
                canvas.width = width;
                canvas.height = height;
                //切图
                var imgArr = [];
                var swidth = width / splitX;
                var sheight = height / splitY;
                var index = 0;
                for (var j = 0; j < splitY; j++) {
                    for (var i = 0; i < splitX; i++) {
                        ctx.drawImage(originImg, i * swidth, j * sheight, swidth, sheight, 0, 0, width, height);
                        var img = new Image();
                        img.src = canvas.toDataURL('image/jpeg');
                        img.width = swidth;
                        img.height = sheight;
                        img.className = "thumbnail";
                        img.id = "_thumbnail_" + index++;
                        imgArr.push(img);
                    }
                }
                callback && callback(imgArr);
            };
            _.loadImg(imgSrc, _cutImg);
        },

        //缩放得到新图片 
        //img, width, height, quality callback
        //zoom 定义了width 或height ，zoom就失效了
        zipImg: function zipImg(options) {
            var canvas = document.createElement("canvas"),
                img = options.img,
                width = options.width,
                height = options.height,
                quality = options.quality,
                zoom = options.zoom,
                callback = options.callback;
            _.loadImg(img, function () {
                if (_.isUndefined(width) && _.isUndefined(height) && !_.isUndefined(zoom)) {
                    width = this.width * zoom;
                    height = this.height * zoom;
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, width, height);
                var newImg = new Image();
                newImg.src = canvas.toDataURL('image/jpeg', quality);
                _.loadImg(newImg, callback);
            });
        },
        //反色
        reverse: function reverse(imgSrc, callback) {
            var _reverse = function _reverse(originImg) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                var width = originImg.width;
                var height = originImg.height;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(originImg, 0, 0);
                var imgData = ctx.getImageData(0, 0, width, height);
                // 反转颜色
                for (var i = 0; i < imgData.data.length; i += 4) {
                    imgData.data[i] = 255 - imgData.data[i];
                    imgData.data[i + 1] = 255 - imgData.data[i + 1];
                    imgData.data[i + 2] = 255 - imgData.data[i + 2];
                    imgData.data[i + 3] = 255;
                }
                ctx.putImageData(imgData, 0, 0);
                var img = new Image();
                img.src = canvas.toDataURL('image/jpeg'); //quality
                callback && callback(img);
            };
            _.loadImg(imgSrc, _reverse);
        },
        masic: function masic(imgSrc, callback) {
            var _masic = function _masic(originImg) {};
        },
        //时序sequence ,间隔时间
        timeSeq: function timeSeq(arr, interval, callback) {
            arr.forEach(function (t, i) {
                setTimeout(function () {
                    callback && callback(t);
                }, (interval || 500) * i);
            });
        },
        background: function background(el, imgSrc) {
            var el = _.query(el);
            _.loadImg(imgSrc, function (img) {
                el.style.backgroundImage = 'url("' + img.src + '")';
            });
        },
        each: function each(obj, iterator, context) {
            if (obj == null) return obj;
            if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, length = obj.length; i < length; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) return;
                }
            } else {
                var keys = _.keys(obj);
                for (var i = 0, length = keys.length; i < length; i++) {
                    if (iterator.call(context, obj[keys[i]], keys[i], obj) === {}) return;
                }
            }
            return obj;
        },

        any: function any(obj, predicate, context) {
            predicate || (predicate = function predicate(value) {
                return value;
            });
            var result = false;
            if (obj == null) return result;
            if (Array.prototype.some && obj.some === Array.prototype.some) return obj.some(predicate, context);
            _.each(obj, function (value, index, list) {
                if (result || (result = predicate.call(context, value, index, list))) return {};
            });
            return !!result;
        },
        contains: function contains(obj, target) {
            if (obj == null) return false;
            if (obj == target) return true; //
            if (Array.prototype.indexOf && obj.indexOf === Array.prototype.indexOf) return !!~obj.indexOf(target);
            return _.any(obj, function (value) {
                return value === target;
            });
        },
        size: function size(obj) {
            if (obj == null) return 0;
            return obj.length === +obj.length ? obj.length : _.keys(obj).length;
        },
        filter: function filter(obj, predicate, context) {
            var results = [];
            if (obj == null) return results;
            if (Array.prototype.filter && obj.filter === Array.prototype.filter) return obj.filter(predicate, context);
            _.each(obj, function (value, index, list) {
                if (predicate.call(context, value, index, list)) results.push(value);
            });
            return results;
        },
        max: function max(array) {
            var len = arguments.length;
            if (len === 0) return 0;
            var args = new Array(len);
            while (len--) {
                args[len] = arguments[len];
            }return Math.max.apply(Math, _.flatten(args));
        },
        min: function min(array) {
            var len = arguments.length;
            if (len === 0) return 0;
            var args = new Array(len);
            while (len--) {
                args[len] = arguments[len];
            }return Math.min.apply(Math, _.flatten(args));
        },

        // define: function(obj, key) {
        //     Object.defineProperty(obj, key, {
        //         set: function(value) {
        //             //  针对 o.key = value 的set方法
        //             if (!datas[key]) {
        //                 obj.size++
        //             }
        //             datas[key] = value
        //         },
        //         get: function() {
        //             //  获取当前数据，如果当前数据有值，返回值并将当前属性值设置为undefined
        //             var res = undefined
        //             if (typeof datas[key] !== undefined) {
        //                 res = datas[key]
        //                 obj.size--
        //                     datas[key] = undefined
        //             }
        //             return res
        //         }
        //     })
        // },

        //克隆并 继承.可继承{}， 不能继承 undefined []
        clone: function clone(obj) {
            if (!_.isObject(obj)) return obj;
            if (_.isArray(obj)) return obj.slice();
            var len = arguments.length;
            var args = new Array(len);
            while (len--) {
                args[len] = arguments[len];
            }args.unshift({});
            return _.extend.apply(null, args);
        },
        // {key:value} => {value:key}  ，Invert the keys and values of an object. The values must be serializable.
        invert: function invert(obj) {
            var result = {};
            _.keys(obj).forEach(function (t) {
                result[obj[t]] = t;
            });
            return result;
        }
    };

    // _.upperCaseFirstAlphabet=function(str){
    //     return str.replace(/[a-z]/,function(m){
    //         return m.toUpperCase();
    //     })
    // }


    //show hide

    [{
        "key": "hide",
        "reverse": "show"
    }, {
        "key": "active",
        "reverse": "passive"
    }, {
        "key": "disabled",
        "reverse": "available"
    }, {
        "key": "fadeout",
        "reverse": "fadein",
        "type": "animate"
    }, {
        "key": "fadeoutup",
        "reverse": "fadeindown",
        "type": "animate"
    }, {
        "key": "fadeinup",
        "reverse": "fadeoutdown",
        "type": "animate"
    }, {
        "key": "fadeoutleft",
        "reverse": "fadeinright",
        "type": "animate"
    }, {
        "key": "fadeinleft",
        "reverse": "fadeoutright",
        "type": "animate"
    }].forEach(function (t) {
        _[t.key] = function () {
            var len = arguments.length,
                args;
            if (len === 0) {
                return;
            } else if (len === 1) {
                args = arguments[0];
            } else {
                args = new Array(len);
                while (len--) {
                    args[len] = arguments[len];
                }
            }
            if (t.type === "animate") {
                _.removeClass.call(args, t.reverse, "hide");
            }
            return _.addClass.call(args, t.key);
        };

        _[t.reverse] = function () {
            var len = arguments.length,
                args;
            if (len === 0) {
                return;
            } else if (len === 1) {
                args = arguments[0];
            } else {
                args = new Array(len);
                while (len--) {
                    args[len] = arguments[len];
                }
            }
            if (t.type === "animate") {
                _.addClass.call(args, t.reverse);
                return _.removeClass.call(args, t.key, "hide");
            }
            return _.removeClass.call(args, t.key);
        };
    });

    //去掉'Element' 'Object'，需单独处理
    //增加NodeList Arguments Window touchevent MouseEvent Screen  Infinity Date  DOMRect 
    ['Null', 'Undefined', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'NaN', 'Infinity', // 'Infinite',
    'NodeList', 'Arguments', 'Window', 'TouchEvent', 'MouseEvent', 'Screen', 'Date', 'DOMRect'].forEach(function (t) {
        _['is' + t] = function (o) {
            return _.type(o) === t.toLowerCase();
        };
    });
    // [object HTMLDivElement] is Object
    _.isObject = function (o) {
        return _.isElement(o) ? true : _.type(o) === "object";
    };
    //html Element
    ['Div', 'Image', 'Canvas'].forEach(function (t) {
        _['is' + t] = function (o) {
            return _.type(o) === 'html' + t.toLowerCase() + 'element';
        };
    });
    //空数组  空对象
    _.isEmpty = function (obj) {
        if (obj == null) return true; //undefined==null  undefined!==null
        if (_.isNumber(obj)) return false; //数字不为空 ，0也不为空
        if (_.isDate(obj)) return false; //日期
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0; //空数组
        if (_.isElement(obj)) return _.size(obj) === 0; //dom
        for (var key in obj) {
            if (_.has(obj, key)) return false;
        } //对象有属性
        return true;
    };
    _.uniq = _.unique = function (array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        _.each(initial, function (value, index) {
            if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.identity = function (value) {
        return value;
    };
    _.every = _.all = function (obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = true;
        if (obj == null) return result;
        if (Array.prototype.every && obj.every === Array.prototype.every) return obj.every(predicate, context);
        _.each(obj, function (value, index, list) {
            if (!(result = result && predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };

    _.intersection = function (array) {
        var rest = Array.prototype.slice.call(arguments, 1);
        return _.filter(_.uniq(array), function (item) {
            return _.every(rest, function (other) {
                return _.contains(other, item);
            });
        });
    };

    _.difference = function (array) {
        var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };
    _.without = function (array) {
        return _.difference(array, Array.prototype.slice.call(arguments, 1));
    };
    _.map = _.collect = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (Array.prototype.map && obj.map === Array.prototype.map) return obj.map(iterator, context);
        _.each(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
    _.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };

    //数组 和字符
    _.indexOf = function (str1, str2) {
        if (_.isUndefined(str1) || _.isUndefined(str2)) {
            return -1;
        } else {
            if (_.isAarray(str1)) {
                return str1.indexOf(str2);
            } else if (_.isString(str1)) {
                return str1.toLowerCase().indexOf(str2.toLowerCase());
            }
        }
    };

    //多维转移一维
    _.flatten = function (array, shallow) {
        var _flatten = function _flatten(input, shallow, output) {
            input.forEach(function (t) {
                if (_.isArray(t)) {
                    shallow ? output[output.length] = t : _flatten(t, shallow, output);
                } else {
                    output[output.length] = t;
                }
            });
            return output;
        };
        return _flatten(array, shallow, []);
    };
    //一维转二维 多维
    _.split = function (arr, len) {
        var arr2 = [],
            arr1 = [];
        arr.forEach(function (t, i) {
            arr1[arr1.length] = t;
            if (i % len === len - 1) {
                arr2[arr2.length] = arr1;
                arr1 = [];
            }
        });
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            args.unshift(arr2);
            return _.split.apply(this, args);
        }
        return arr2;
    };

    //对象取值   obj[a.b.c]
    _.getVal = function (obj, key) {
        function _getVal(obj, keyArr) {
            if (_.isUndefined(obj) || keyArr.length === 0) return "";
            var key = keyArr.shift();
            return keyArr.length === 0 ? obj[key] : _getVal(obj[key], keyArr);
        }
        return _.isArray(key) ? _getVal(obj, key) : _getVal(obj, key.split("."));
    };
    //setVal(obj, "a.b.d", { a: 1 })
    //setVal(obj, ["a","b","d"], 1 )
    _.setVal = function (obj, key, val) {
        var _setVal = function _setVal(obj, keyArr, val, output) {
            if (keyArr.length === 0) return obj = val;
            if (keyArr.length === 1) {
                obj[keyArr[0]] = val;
                return output || obj;
            }
            var key = keyArr.shift();
            obj[key] = _.isObject(obj[key]) ? obj[key] : {};
            return _setVal(obj[key], keyArr, val, obj);
        };
        return _.isArray(key) ? _setVal(obj, key, val, obj) : _setVal(obj, key.split("."), val, obj);
    };

    _.$ = _.query;

    // List of HTML entities for escaping.
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);

    // Regexes containing the keys and values listed immediately above.
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };

    //定义函数 'escape', 'unescape'
    //encodeHtml  decodeHtml 
    ['escape', 'unescape'].forEach(function (t) {
        _[t] = function (str) {
            return str == null ? '' : ('' + str).replace(entityRegexes[t], function (match) {
                return entityMap[t][match];
            });
        };
    });

    /**
     * 。。。。
     * 
     * @memberOf string
     * @param {Object} obj 要转换成查询字符串的对象
     * @return {String} 返回转换后的查询字符串
     */
    _.toQueryPair = function (key, value) {
        return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
    };

    /**
     * 。。。。
     * 
     * @memberOf string
     * @param {Object} obj 要转换成查询字符串的对象
     * @return {String} 返回转换后的查询字符串
     */
    _.toQueryString = function (obj) {
        var result = [];
        for (var key in obj) {
            result.push(_.toQueryPair(key, obj[key]));
        }return result.join("&");
    };

    _.ajax = function (uri) {
        var xmlHttp = false,
            done = false,
            invokeTimes = 0,
            type = type || 'GET',
            option = {
            method: "GET",
            data: null,
            arguments: null,
            success: function success() {},
            error: function error() {},
            complete: function complete() {},
            isAsync: true,
            timeout: 30000,
            contentType: null,
            // type: "xml"  //resultType
            dataType: "json"
        };

        var args = Array.prototype.slice.call(arguments),
            len = args.length;
        if (len >= 2) {
            if (_.isFunction(args[1])) {
                _.extend(option, {
                    success: args[1]
                });
            } else if (_.isObject(args[1])) {
                _.extend(option, args[1]);
                if (_.isObject(option.data)) option.data = _.toQueryString(option.data);
            }
        }

        len >= 3 && _.isFunction(args[2]) && _.extend(option, {
            error: args[2]
        });

        function createXmlHttpRequest() {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    xmlHttp = false;
                }
            }
            if (!xmlHttp && typeof XMLHttpRequest !== "undefined") xmlHttp = new XMLHttpRequest();
        }

        function sendXmlHttpRequest() {
            createXmlHttpRequest();
            if (xmlHttp) {
                try {

                    // xmlHttp.open(type, uri, true); ////false表示同步模式，true异步模式GET"GET"
                    // // xmlHttp.onreadyStateChange = handleStateChange; //chorme下未被调用，使用watchStateChange
                    // xmlHttp.onreadystatechange = handleStateChange;
                    // xmlHttp.send(null);
                    xmlHttp.onreadystatechange = handleStateChange;

                    if (option.method === "GET") {
                        if (option.data) {
                            uri += (!!~uri.indexOf("?") ? "&" : "?") + option.data;
                            option.data = null;
                        }
                        xmlHttp.open("GET", uri, option.isAsync);
                        xmlHttp.setRequestHeader("Content-Type", option.contentType || "text/plain;charset=UTF-8");
                        xmlHttp.send();
                    } else if (option.method === "POST") {
                        xmlHttp.open("POST", uri, option.isAsync);
                        xmlHttp.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded;charset=UTF-8");
                        xmlHttp.send(option.data);
                    } else {
                        xmlHttp.open(option.method, uri, option.isAsync);
                        xmlHttp.send();
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

        //回调函数 
        function handleStateChange() {
            if (done) return true;
            var o = {};
            var content = o.responseText = xmlHttp.responseText;
            o.responseXML = xmlHttp.responseXML;
            o.data = option.data;
            o.status = xmlHttp.status;
            o.uri = uri;
            o.arguments = option.arguments;
            if (option.dataType === 'json') {
                try {
                    content = o.responseJSON = JSON.parse(xmlHttp.responseText);
                } catch (e) {}
            }
            if (xmlHttp.readyState == 4) {
                switch (xmlHttp.status) {
                    case 200:
                        option.success.call(content, content);
                        break;
                    default:
                        var xmlHttpStatus = {
                            400: "错误的请求！\nError Code:400!",
                            403: "拒绝请求！\nError Code:403!",
                            404: "请求地址不存在！\nError Code:404!",
                            500: "内部错误！\nError Code:500!",
                            503: "服务不可用！\nError Code:503!"
                        };
                        var st = xmlHttpStatus[xmlHttp.status] ? xmlHttpStatus[xmlHttp.status] : "请求返回异常！\nError Code:" + xmlHttp.status;
                        console.log(st);
                        option.error(o);
                        break;
                }
                return done = true;
            } else {
                option.error(o);
                // There are five possible values
                // for readyState:
                var readyState = {
                    0: 'Uninitialized', //: The object has been created but the open() method hasn’ t been called.
                    1: 'Loading', //The open() method has been called but the request hasn’ t been sent.
                    2: 'Loaded', //The request has been sent.
                    3: 'Interactive', //A partial response has been received.
                    4: 'Complete' //All data has been received and the connection has been closed.
                };
                console.log(uri + " (" + readyState[xmlHttp.readyState] + ")");
                return false;
            }
            xmlHttp = null;
        }

        var watchStateChange = function watchStateChange() {
            if (done) {
                invokeTimes = 0;
                return;
            }
            if (invokeTimes >= 5) {
                //最多调用5次，超时
                console.log("请求超时");
                invokeTimes = 0;
                return;
            }
            invokeTimes++;
            done = handleStateChange();
            setTimeout(watchStateChange, 100 * (invokeTimes + 1));
        };

        sendXmlHttpRequest();

        //延迟监控
        setTimeout(watchStateChange, 15);
    };

    _.get = function (url, callback) {
        _.ajax(url, callback, "GET");
    };

    _.post = function (url, callback) {
        _.ajax(url, callback, "POST");
    };

    _.loading = function (loadEl, callback, animate) {
        if (_.isString(loadEl)) loadEl = _.query(loadEl);
        if (_.isElement(loadEl)) {
            var loadArr = ['~oo~', '^oo^', '^oo~', '~oo^'];
            var loadAnimationTimeout = false;
            var loadAnimation = function loadAnimation() {
                if (loadAnimationTimeout) return;
                setTimeout(function () {
                    loadEl.query(".tip").text(loadArr.random()); //"数据加载中 " + 
                    loadAnimation();
                }, 100);
            };
            animate && loadAnimation();

            setTimeout(function () {
                loadAnimationTimeout = true;
                loadEl.hide();
                callback && callback();
            }, 1000);
        }
    };

    _.loadFile = function (el, success, error) {
        var $file = el.query("data-file".brackets());

        var _success = function _success(elem, result) {
            if (_.isFunction(success)) {
                success.call(elem, elem, result);
            } else {
                elem.html(result);
            }
        };

        var _error = function _error(elem, result) {
            if (_.isFunction(error)) error.call(elem, elem, result);
        };

        if (_.isElement($file)) {
            _.ajax($file.attr("data-file"), function (result) {
                _success($file, result);
            }, function (result) {
                _error($file, result);
            });
        } else if (_.isArray($file)) {
            $file.forEach(function (t) {
                _.ajax(t.attr("data-file"), function (result) {
                    _success(t, result);
                }, function (result) {
                    _error(t, result);
                });
            });
        }
    };

    _.updateAfterImgLoad = function (id, fn) {
        var self = this;
        var $dom = _.query("#" + id);
        var $img = $dom.query("img");
        var t_img; // 定时器
        var isLoad = true; // 控制变量
        // 判断图片加载的函数
        function isImgLoad(callback) {
            $img.each(function () {
                // 找到为0就将isLoad设为false，并退出each
                if (this.height === 0) return isLoad = false;
            });
            // 为true，没有发现为0的。加载完毕
            if (isLoad) {
                clearTimeout(t_img); // 清除定时器
                // 回调函数
                callback();
                // 为false，因为找到了没有加载完成的图，将调用定时器递归
            } else {
                isLoad = true;
                t_img = setTimeout(function () {
                    isImgLoad(callback); // 递归扫描
                }, 500);
            }
        }

        if ($img && $img.length > 0) {
            //图片延迟加载时间
            isImgLoad(function () {
                // 加载完成
                // self.update(id);
                fn && fn();
            });
        }
    };

    //兼容  替代函数
    _.polyfill = function (obj, arr, fn) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var f = obj[arr[i]];
            if (_.isFunction(f)) return obj[arr[0]] = f;
        }
        return obj[arr[0]] = fn;
    };

    // _.polyfill(Element.prototype, ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function(s) {
    //     // return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    //     var matches = document.querySelectorAll(s), //(this.document || this.ownerDocument)
    //         i = matches.length;
    //     while (--i >= 0 && matches.item(i) !== this) {}
    //     return i > -1;
    // });


    _.selectorMatches = function (el, selector) {
        var p = Element.prototype;
        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
            return !!~Array.prototype.slice.call(document.querySelectorAll(s)).indexOf(this);
        };
        return f.call(el, selector);
    };

    _.closest = function (selector) {
        var el = this;
        while (el) {
            if (el && _.selectorMatches(el, selector)) return el;
            el = el.parentElement; //parentNode
        }
        return [];
    };

    // An internal function to generate lookup iterators.
    var lookupIterator = function lookupIterator(value) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return value;
        return _.property(value);
    };

    // Sort the object's values by a criterion produced by an iterator.
    _.sortBy = function (obj, iterator, context) {
        iterator = lookupIterator(iterator);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };

    //日期
    var _time = _.time = function () {
        function Time(dateValue) {
            if (!(this instanceof Time)) return new Time(dateValue);
            var t = this.date = this.constructor.toDate(dateValue);
            this.year = t.getFullYear();
            this.month = t.getMonth() + 1;
            this.day = t.getDate(); //日期 day_of_month
            this.hour = t.getHours();
            this.minute = t.getMinutes();
            this.second = t.getSeconds();
            this.msecond = t.getMilliseconds(); //毫秒 
            this.day_of_week = t.getDay() === 0 ? 7 : t.getDay(); //  星期几   What day is today
            // 中国的概念是周一是每周的开始, 周日12pm是每周结束.

            this.time = t.getTime();
            this.quarter = (t.getMonth() + 3) / 3 << 0; // //季度 
        }
        return createClass(Time, {
            // 转化为指定格式的String 
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
            // 例子： 
            // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
            // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
            format: function format(fmt) {
                var self = this;
                fmt = fmt || "yyyy-MM-dd hh:mm:ss.S";
                var date = this.date;
                var o = {
                    "y+|Y+": this.year, //年份4位特殊处理
                    "M+": this.month,
                    "d+|D+": this.day,
                    "h+|H+": this.hour,
                    "m+": this.minute,
                    "s+": this.second,
                    "q+": this.quarter,
                    "S": this.msecond
                };
                _.keys(o).forEach(function (k, i) {
                    var v = '' + o[k];
                    fmt = fmt.replace(new RegExp(k, 'g'), function (t) {
                        return i === 0 ? v.substr(4 - t.length) : t[1] ? self.constructor.zerofill(v) : v;
                    });
                });
                return fmt;
            },
            //设置当前时间  ，保持当前日期不变
            set: function set(str) {
                if (this.constructor.isTimeString(str)) str = this.format("yyyy-MM-dd") + " " + str;
                return this.constructor.toDate(str);
            },
            //当前时间
            setCurTime: function setCurTime() {
                return this.set(this.constructor().format("HH:mm:ss"));
            },
            add: function add(interval, number, date) {
                return this.constructor.add(interval, number, date);
            },
            utc: function utc() {
                return Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.msecond);
            },
            //时区
            zone: function zone() {
                return (this.time - this.utc()) / 3600000;
            },
            diff: function diff(interval, date1) {
                return this.constructor.diff(interval, this.date, date1);
            },

            //
            // weekOfMonth: function() {

            // },

            //一年中的第几周 WEEK_OF_Year WEEKNUM
            // 以周一为周首，周日为周末  以完整的一周计算，可能第一周不足7天
            //此处按7天一周计算 
            week: function week(dateStr) {
                var day_of_year = 0;
                var d = dateStr ? this.constructor(dateStr) : this;
                if (!d) return "";
                var years = d.year,
                    month = d.month - 1,
                    day = d.day,
                    days = [31, 28, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                //4年1闰
                if (Math.round(years / 4) === years / 4) days[1] = 29;
                days.forEach(function (t, i) {
                    if (i <= month) day_of_year += day + (i === 0 ? 0 : days[i - 1]);
                });
                return Math.ceil(day_of_year / 7);
            }
        }, {
            //_.time.toDate("09:30:00")
            //_.time.toDate(timeRange[0].begin.format("yyyy-MM-dd") + " " + (new Date()).format(" HH:mm:ss"))
            // 指定时间  hh:mm:ss     默认当天日期  
            // 指定日期  yyyy-MM-dd   默认时间 00:00:00  (非当前时间)  
            toDate: function toDate(str) {
                if (_.isDate(str)) {
                    return new Date(+str); //new
                } else if (_.isEmpty(str)) {
                    return new Date();
                } else if (/^\d*$/.test(str)) {
                    return new Date(+str);
                } else if (_.isString(str)) {
                    if (this.isTimeString(str)) str = this().format("yyyy-MM-dd") + " " + str;
                    return new Date(Date.parse(str.replace(/-/g, "/")));
                }
                return str;
            },
            // 时间格式 hh:mm:ss 
            isTimeString: function isTimeString(str) {
                return (/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.test(str)
                );
            },

            set: function set(date, time) {
                return this.toDate(time ? date + ' ' + time : date);
                // var self = this;

                // if (this.isTimeString(time)) {
                //     //时间补0
                //     time = time.replace(/\d{1,2}/g, function(t) {
                //         return self.zerofill(t)
                //     });
                //     // str.replace(reg, function(t, h, m, s) {
                //     //     console.log(t + ":----")
                //     //     console.log("h:" + h)
                //     //     console.log("m:" + m)
                //     //     console.log("s:" + s)
                //     //     return self.zerofill(t)
                //     // })
                //     //(new Date()).format("yyyy-MM-dd")
                //     date += ' ' + time;
                // }

                // return new Date(Date.parse(date.replace(/-/g, "/")));
            },
            //补0
            zerofill: function zerofill(n) {
                n = '' + n;
                return n[1] ? n : '0' + n;
            },
            //时长 格式化
            durationFormat: function durationFormat(duration) {
                var self = this;
                if (typeof duration !== 'number' || duration < 0) return "00:00";
                var hour = duration / 3600 << 0;
                duration %= 3600;
                var minute = duration / 60 << 0;
                duration %= 60;
                var second = duration << 0;
                var arr = [minute, second];
                if (hour > 0) arr.unshift(hour);
                return arr.map(function (n) {
                    return self.zerofill(n);
                }).join(':');
            },

            //映射短名字
            shortNameMap: function shortNameMap(s) {
                s = ('' + s).toLowerCase();
                var m = {
                    "y": "year",
                    "m": "month",
                    "d": "day",
                    "w": "week",
                    "h": "hour",
                    "n": "minute",
                    "min": "minute",
                    "s": "second",
                    "l": "msecond",
                    "ms": "msecond"
                };
                return s in m ? m[s] : s;
            },
            //时间间隔
            diff: function diff(interval, date1, date2) {
                var t1 = this(date1),
                    t2 = this(date2),
                    _diff = t1.time - t2.time,
                    seconds = 1000,
                    minutes = seconds * 60,
                    hours = minutes * 60,
                    days = hours * 24,
                    years = days * 365;

                switch (this.shortNameMap(interval)) {
                    case "year":
                        result = t1.year - t2.year; //_diff/years
                        break;
                    case "month":
                        result = (t1.year - t2.year) * 12 + (t1.month - t2.month);
                        break;
                    case "day":
                        result = Math.round(_diff / days);
                        break;
                    case "hour":
                        result = Math.round(_diff / hours);
                        break;
                    case "minute":
                        result = Math.round(_diff / minutes);
                        break;
                    case "second":
                        result = Math.round(_diff / seconds);
                        break;
                    case "msecond":
                        result = _diff;
                        break;
                    case "week":
                        result = Math.round(_diff / days) % 7;
                        break;
                    default:
                        result = "invalid";
                }
                return result;
            },
            add: function add(interval, number, date) {
                var date = this.toDate(date);
                switch (this.shortNameMap(interval)) {
                    case "year":
                        return new Date(date.setFullYear(date.getFullYear() + number));
                    case "month":
                        return new Date(date.setMonth(date.getMonth() + number));
                    case "day":
                        return new Date(date.setDate(date.getDate() + number));
                    case "week":
                        return new Date(date.setDate(date.getDate() + 7 * number));
                    case "hour":
                        return new Date(date.setHours(date.getHours() + number));
                    case "minute":
                        return new Date(date.setMinutes(date.getMinutes() + number));
                    case "second":
                        return new Date(date.setSeconds(date.getSeconds() + number));
                    case "msecond":
                        return new Date(date.setMilliseconds(date.getMilliseconds() + number));
                }
                return date;
            }

        });
    }();

    //颜色
    var _color = _.color = function () {
        //#fff #ffffff
        var isHex = function isHex(color) {
            return (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)
            );
        };
        //#fff
        var isHex3 = function isHex3(color) {
            return (/^#([0-9a-fA-f]{3})$/.test(color)
            );
        };
        //#ffffff
        var isHex6 = function isHex6(color) {
            return (/^#([0-9a-fA-f]{6})$/.test(color)
            );
        };
        var isRgba = function isRgba(color) {
            return (/^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g.test(color)
            );
        };

        var rgbaWrapper = function rgbaWrapper(rgbaArr) {
            //[1,1,1,1]
            return (rgbaArr.length === 4 ? 'rgba(' : 'rgb(') + rgbaArr + ')';
        };
        var rgbaArr = function rgbaArr(color) {
            //rgba(0,0,0,0.1)
            if (isRgba(color)) {
                return color.match(/0\.\d{1,2}|\d{1,3}/g).map(function (t) {
                    return +t;
                });
            } else if (isHex(color)) {
                if (color.length === 4) {
                    //#fff
                    return color.match(/[0-9a-fA-f]{1}/g).map(function (t) {
                        return '0x' + t + t << 0;
                    });
                } else {
                    //#ffffff
                    return color.match(/[0-9a-fA-f]{2}/g).map(function (t) {
                        return '0x' + t << 0;
                    });
                }
            } else if (_.isArray(color)) {
                return color;
            } else if (_.isNumber(color)) {
                color &= 0xFFFFFF;
                return [color >> 16 & 0xFF, color >> 8 & 0xFF, color & 0xFF];
            }
        };

        var Color = function Color(color, alpha) {
            if (!(this instanceof Color)) return new Color(color, alpha);
            // color = color || '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); //"#000";
            if (isRgba(color) || isHex(color)) {
                this.color = rgbaArr(color);
            } else {
                //分类颜色
                //红 100
                //绿 010
                //青 001 
                //黄 110 
                //紫 101
                //全彩 111
                //黑白灰 000
                var colorMap = {
                    red: [1, 0, 0],
                    green: [0, 1, 0],
                    syan: [0, 0, 1],
                    yellow: [1, 1, 0],
                    purple: [1, 0, 1],
                    gray: [0, 0, 0],
                    colorful: [1, 1, 1]
                };

                var arr = color in colorMap ? colorMap[color] : colorMap["colorful"];
                var r = arr[0],
                    g = arr[1],
                    b = arr[2];
                if (r & g & b === 1) {
                    //全彩
                    arr = arr.map(function (t) {
                        return Math.random() * 255 << 0;
                    });
                } else if (r & g & b === 0) {
                    //灰
                    var t = Math.random() * 255 << 0;
                    arr = [t, t, t];
                } else {
                    var rgb = 155;
                    var c = (Math.random() * (255 - rgb) << 0) + rgb;
                    arr = arr.map(function (t) {
                        return t === 1 ? (Math.random() * (255 - rgb) << 0) + rgb : Math.random() * (c / 2) << 0;
                    });
                }
                if (alpha) arr[arr.length] = alpha;
                this.color = arr;
            }
        };
        return createClass(Color, {
            toString: function toString() {
                return rgbaWrapper(this.color);
            },
            hsla: function hsla() {
                return "hsla(" + [Math.random() * 360 << 0] + ",50%,50%,0.5)";
            },
            hsl: function hsl() {
                //微信小程序不支持hsl
                return "hsl(" + [Math.random() * 360 << 0] + ",50%,50%)";
            },
            //深色  随机深色(rgb两位小于 80)，指定颜色加深
            dark: function dark(color, level) {
                color = color ? rgbaArr(color) : this.color;
                level = level || 0.5;
                return rgbaWrapper(color.map(function (t) {
                    return t * (1 - level) << 0;
                }));
            },
            deepdark: function deepdark() {
                return this.dark(null, 0.1);
            },
            //浅色  
            light: function light(color, level) {
                color = color ? rgbaArr(color) : this.color;
                level = level || 0.5;
                return rgbaWrapper(color.map(function (t) {
                    return t + (255 - t) * level << 0;
                }));
            },
            //透明度
            alpha: function alpha(a) {
                if (a) this.color[3] = a;
                return rgbaWrapper(this.color);
            },
            rgb: function rgb(color, alpha) {
                if (!color) return this.alpha(alpha);
                return this.constructor.rgb(color, alpha);
            },
            //混合
            mix: function mix(color1, color2) {
                var args = Array.prototype.slice.call(arguments);
                args[args.length] = this.rgb();
                return this.constructor.mix(args);
            },
            //rgb2hex
            hex: function hex(color) {
                return this.constructor.hex(color || this.color);
            },
            //色相环
            circle: function circle(len) {
                return this.constructor.circle(len);
            },
            //互补色
            complementary: function complementary(color) {
                return this.constructor.complementary(color || this.color);
            },
            //颜色过渡  gradient
            tween: function tween(color, step, easing) {
                return this.constructor.tween(this.color, color, step, easing);
            },
            // 灰度值的心理学公式  值越小越深 <192为深色
            grayLevel: function grayLevel(color) {
                color = color ? rgbaArr(color) : this.color;
                return 0.30 * color[0] + 0.59 * color[1] + 0.11 * color[2];
            },
            isDark: function isDark(color) {
                return this.grayLevel(color) < 192;
            },
            isLight: function isLight(color) {
                return !this.isDark(color);
            },
            //web安全色   
            webSafeColor: function webSafeColor(color) {
                if (!color) {
                    //216个安全色
                    var arr = ['00', '33', '66', '99', 'CC', 'FF'],
                        len = arr.length,
                        colorArr = [];
                    for (var r = 0; r < len; r++) {
                        for (var g = 0; g < len; g++) {
                            for (var b = 0; b < len; b++) {
                                colorArr[colorArr.length] = '#' + arr[r] + arr[g] + arr[b];
                            }
                        }
                    }return colorArr;
                }

                color = this.rgb(color);
                color = rgbaArr(color);
                //RGB值是51的倍数
                for (var i = 0; i < 3; i++) {
                    var q1 = Math.floor(color[i] / 51) * 51;
                    var q2 = Math.ceil(color[i] / 51) * 51;
                    if (Math.abs(q1 - color[i]) <= Math.abs(q2 - color[i])) color[i] = q1;else color[i] = q2;
                }
                return this.hex(rgbaWrapper(color));
            }
        },
        //静态方法
        {
            //混合  [c1,c2,c3]  或  color1, color2 
            mix: function mix(colorArr) {
                if (_.isArray(colorArr)) {
                    var len = colorArr.length,
                        arr = new Array(len);
                    for (var i = 0; i < len; i++) {
                        arr[i] = rgbaArr(colorArr[i]);
                    }
                    var _mix = arr[0].map(function (t, i) {
                        if (i === 3) {
                            for (var j = 1; j < len; j++) {
                                t += _.isUndefined(arr[j][i]) ? 1 : arr[j][i];
                            }
                            return (t / len).toFixed(2);
                        } else {
                            for (var j = 1; j < len; j++) {
                                t += arr[j][i];
                            }
                            return t / len << 0;
                        }
                    });
                    return rgbaWrapper(_mix);
                } else {
                    var len = arguments.length,
                        arr = [];
                    if (len === 0) return;
                    for (var i = 0; i < len; i++) {
                        arr[i] = rgbaArr(arguments[i]);
                    }
                    return this.mix.call(this, arr);
                }
            },
            //rgb2hex
            hex: function hex(color) {
                if (!color) return;
                if (isHex6(color)) return color;
                if (isHex3(color)) {
                    return color.replace(/[0-9a-fA-f]/g, function (m) {
                        return m + m;
                    });
                }

                function _hex(rgbaArr) {
                    return "#" + rgbaArr.map(function (t, i) {
                        return i > 2 ? null : ('0' + (+t).toString(16)).slice(-2);
                    }).join("");
                }
                return _hex(rgbaArr(color));
            },
            //hex2rgb
            rgb: function rgb(color, alpha) {
                if (!color) return;
                if (isRgba(color)) return color;
                var arr = rgbaArr(color);
                if (alpha) arr[3] = alpha;
                return rgbaWrapper(arr);
            },
            //互补色
            complementary: function complementary(color) {
                var arr = rgbaArr(color),
                    max = Math.max.apply(Math, arr),
                    //_.max
                min = Math.min.apply(Math, arr),
                    sum = max + min;
                arr = arr.map(function (t) {
                    return sum - t;
                });
                return rgbaWrapper(arr);
            },
            //色相环
            circle: function circle(len, alpha) {
                var a = 0,
                    step = 360 / len;
                var arr = [];
                for (var i = 0; i < len; i++) {
                    a += step;
                    var r = _.cos(a) * 127 + 128 << 0,
                        g = _.cos(a + 120) * 127 + 128 << 0,
                        b = _.cos(a + 240) * 127 + 128 << 0;
                    arr[arr.length] = rgbaWrapper(_.isUndefined(alpha) ? [r, g, b] : [r, g, b, alpha]);
                }
                return arr;
            },
            //颜色过渡  gradient
            tween: function tween(color1, color2, step, easing) {
                step = step || 1;
                easing = easing || "linear";
                var start = rgbaArr(color1),
                    end = rgbaArr(color2),
                    colorArr = [];
                for (var i = 0; i <= step; i++) {
                    var k = _.Easing[easing](i / step);
                    colorArr[colorArr.length] = rgbaWrapper(end.map(function (t, i) {
                        return i > 2 ? +(start[i] + (t - start[i]) * k).toFixed(2) : start[i] + (t - start[i]) * k << 0;
                    }));
                }
                return colorArr;
            },
            //深色  随机深色(rgb两位小于 80)，指定颜色加深
            dark: function dark(level) {
                var n = Math.random() * 3 << 0;
                return rgbaWrapper([255, 255, 255].map(function (t, i) {
                    return i !== n ? Math.random() * 80 << 0 : t * Math.random() << 0;
                }));
            },
            deepdark: function deepdark() {
                var n = Math.random() * 3 << 0;
                return rgbaWrapper([255, 255, 255].map(function (t, i) {
                    return i !== n ? Math.random() * 20 << 0 : t * Math.random() << 0;
                }));
            },
            //浅色  
            light: function light(level) {
                var n = Math.random() * 3 << 0;
                return rgbaWrapper([255, 255, 255].map(function (t, i) {
                    return i !== n ? 120 + Math.random() * 136 << 0 : t * Math.random() << 0;
                }));
            }
        });
    }();
    var _prototype = {};
    //原型扩展
    _prototype.obj = {
        //四则运算 "1+2"
        cmd: function cmd(str) {
            //在object 原型上扩展，会被in 枚举
            if (!_.isString(str)) {
                console.log("object.cmd need a string argument");
                return "";
            }
            var self = this,
                symbol = str.match(reg_operation_symbol),
                ps = [],
                _cmd = function _cmd(str) {
                if (symbol.length == 0) {
                    ps.push("self." + str);
                    return;
                }
                var first = symbol.shift();
                var pos = str.indexOf(first);
                var sub = str.substring(0, pos).trim();
                if (_.has(self, sub)) {
                    ps.push("self." + sub + first);
                } else {
                    ps.push(sub + first);
                }
                var surplus = str.substring(pos + first.length);
                _cmd(surplus);
            };
            _cmd(str);
            return eval(ps.join(''));
        }
    };

    //浮点运算
    _prototype.num = {
        isEqual: function isEqual(number, digits) {
            digits = digits == undefined ? 10 : digits; // 默认精度为10
            return this.toFixed(digits) === number.toFixed(digits);
        },
        add: function add(arg) {
            var r1, r2, m;
            try {
                r1 = arg.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
                r1 = 0;
            }
            try {
                r2 = this.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            // var result = (arg * m + this * m) / m

            var result = Math.round(arg * m + this * m) / m;

            // var result = (arg.mul(m) + this.mul(m)).div(m);

            result.isInfinity(function () {
                console.log(r1 + " " + r2 + " " + " " + this + " " + arg);
            });

            // if (result.toString().indexOf(".") > 0 && result.toString().split(".")[1].length > 5) {
            //     console.log("result:" + result);
            //     console.log(arg, this);
            //     // console.log(result.sub(Number(data[i - j][2])));
            // }
            return result;
        },

        //减法  
        sub: function sub(arg) {
            var r1, r2, m, n;
            try {
                r1 = this.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
                r1 = 0;
            }
            try {
                r2 = arg.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            //动态控制精度长度  
            n = r1 >= r2 ? r1 : r2;
            return ((this * m - arg * m) / m).toFixed(n);
        },

        //乘法  
        mul: function mul(arg) {
            var m = 0,
                s1 = arg.toString(),
                s2 = this.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {
                console.log(e);
            }
            try {
                m += s2.split(".")[1].length;
            } catch (e) {
                console.log(e);
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        //除法  
        div: function div(arg) {
            var t1 = 0,
                t2 = 0,
                r1,
                r2,
                result,
                m;
            try {
                t1 = this.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
            }
            try {
                t2 = arg.toString().split(".")[1].length;
            } catch (e) {
                console.log(e);
            }
            // with(Math) {
            //整数相除
            if (t2 === 0 && t1 === 0) {
                result = this / arg;
            } else {
                r1 = +this.toString().replace(".", "");
                r2 = +arg.toString().replace(".", "");

                // result =Math.round(r1 / r2)* m;

                if (t1 < t2) {
                    m = Math.pow(10, t2 - t1);
                    result = r1 / r2 * m;
                } else if (t1 > t2) {
                    m = Math.pow(10, t1 - t2);
                    result = Math.round(r1 / r2) / m;
                } else {
                    result = r1 / r2;
                }
            }
            result.isInfinity(function () {
                // console.log((r1 / r2),(t2 - t1))
                console.log(r1 + " " + r2 + " " + (t2 - t1) + " " + this + " " + arg);
            });

            // if(_.isNaN(result)){
            //     console.log(r1 + " " + r2 + " " + (t2 - t1) + " " + this);
            // }

            return result;
        },
        isInfinity: function isInfinity(callback) {
            var fn = function fn() {
                if (this.toString().indexOf(".") > 0 && this.toString().split(".")[1].length > 5) {
                    callback && callback.call(this);
                    return true;
                }
                return false;
            };
            return fn.call(this);
        }
    };

    //原型
    _prototype.str = {
        // trim: function() {
        //     return this.replace(/(^\s+)|(\s+$)/g, "");
        // },
        pound: function pound() {
            return "#" + this;
        },
        brackets: function brackets(ele) {
            if (!ele) {
                return "[" + this.split(",").join("],[") + "]"; //"[" + this + "]";
            } else {
                var id;
                if (_.isElement(ele)) {
                    _.autoid(ele);
                    id = ele.id;
                } else if (_.isString(ele)) {
                    id = ele;
                }
                // return "#" + id + "" + this.brackets() + "," + "#" + id + " " + this.brackets();
                var es = this.split(",");
                return "#" + id + "[" + es.join("],#" + id + "[") + "]" + "," + "#" + id + " [" + es.join("],#" + id + " [") + "]";
            }
        },
        // console.log('hihih {0}, ,{2}'.format('dfasda', '34324343','dffds34324'));
        format: function format() {
            var args = Array.prototype.slice.call(arguments),
                str = this;
            args.forEach(function (t) {
                str = str.replace(/{.*?}/, t);
            });
            return str;
        }
    };

    _prototype.dat = {
        format: function format(fmt) {
            return _time(this).format(fmt);
        }
    };
    _prototype.ele = {
        length: 1,
        // {
        //     value: 1,
        //     writable: false
        // },
        //兼容jquery  常用方法
        attr: function attr(key, value) {
            if (!_.isUndefined(value)) {
                this.setAttribute(key, value);
                return this;
            }
            return this.getAttribute(key);
        },
        remove: function remove() {
            if (this.parentNode) this.parentNode.removeChild(this);
        },
        empty: function empty() {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    this.removeChild(elem);
                    // Prevent memory leaks
                    // jQuery.cleanData(getAll(elem, false));
                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }
            return this;
        },
        removeAttr: function removeAttr(key) {
            var self = this,
                keys = key.split(","),
                len = keys.length;
            if (len === 1) {
                self.removeAttribute(key);
            } else {
                keys.forEach(function (t) {
                    self.removeAttribute(t);
                });
            }
            return self;
        },
        html: function html(str) {
            if (arguments.length === 0) {
                return this.innerHTML;
            } else {
                this.innerHTML = arguments[0];
                return this;
            }
        },
        //冲突：HTMLScriptElement.text  是一个属性  ，使用_.text代替
        text: function text(str) {
            if (str) this.innerText = str;
            return this.innerText;
        },
        val: function val(value) {
            if (value) {
                this.setAttribute("value", value);
                return this;
            }
            if (!!~["select", "input"].indexOf(this.tagName.toLowerCase())) return this.value;
            return this.getAttribute("value");
        },
        on: function on(type, fn) {
            addEvent(type, this, fn);
            return this;
        },
        off: function off(type, fn) {
            removeEvent(type, this, fn);
            return this;
        },
        trigger: function trigger(name) {
            console.log("event trigger");
            var ev = document.createEvent("UIEvents"); //HTMLEvents
            ev.initEvent(name, true, true);
            dispatchEvent(ev, this);
            return this;
        },
        //与array一致性
        each: function each(fn) {
            _.isFunction(fn) && fn.call(this, this, 0);
        },
        css: function css(opt) {
            //todo
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            var needpre = function needpre(str) {
                var reg = RegExp(['transform', 'transition', 'animation', 'box-shadow', 'flex'].join('|')); ////,'@keyframes'
                return reg.test(str);
            };
            var autoprefixer = function autoprefixer(key, val) {
                var self = this;
                if (needpre(key)) {
                    ['-webkit-', '-moz-', '-o-', ''].forEach(function (t) {
                        this.style[t + key] = val;
                    });
                } else {
                    this.style[key] = val;
                }
            };
            var keys = ['font-size', 'line-height', 'border-radius', 'border-width', 'padding', 'margin'];
            ['padding', 'margin', ''].forEach(function (pre) {
                keys = keys.concat(['top', 'left', 'bottom', 'right'].map(function (t) {
                    return pre ? pre + '-' + t : t;
                }));
            });
            ['max', 'min', ''].forEach(function (pre) {
                keys = keys.concat(['width', 'height'].map(function (t) {
                    return pre ? pre + '-' + t : t;
                }));
            });

            //单位
            var autounit = function autounit(key, val) {
                if (/^0$/.test(val)) return val;
                return !!~keys.indexOf(key) ? ("" + val).replace(/^\d+(\.\d+)?$/, function (match) {
                    return match + "px";
                }) : val;
            };

            if (len === 1) {
                if (_.isObject(opt)) {
                    for (key in opt) {
                        // css()
                        var val = opt[key];
                        val = autounit(key, val);
                        this.style[key] = val;
                        // autoprefixer.call(this, key, val);
                    }
                }
            } else if (len === 2) {
                // prop, val
                this.style[opt] = args[1];
                // autoprefixer.call(this, opt, arguments[1]);
            }
            return this;
        },
        width: function width() {
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            if (len === 1) {
                this.css({
                    width: args[0]
                });
            }
            return this.offsetWidth;
        },
        height: function height() {
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            if (len === 1) {
                this.css({
                    height: args[0]
                });
            }
            return this.offsetHeight;
        },
        pos: function pos(p) {
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            if (len === 1) {
                return this.css({
                    position: "absolute",
                    top: p.y,
                    left: p.x
                });
            }
            return _.pos.call(this, this);
        },
        outerWidth: function outerWidth() {
            return _.max(this.scrollWidth, this.offsetWidth, this.clientWidth) + Number(this.style.marginLeft) + Number(this.style.marginRight);
        },

        dir: function dir(elem, _dir, until) {
            var matched = [],
                truncate = until !== undefined;

            while ((elem = elem[_dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) break;
                    matched.push(elem);
                }
            }
            return matched;
        },
        parent: function parent() {
            return this.parentNode;
        },
        sibling: function sibling(n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        },
        siblings: function siblings() {
            return this.sibling((this.parentNode || {}).firstChild, this);
        },
        // neighbor: function() {
        //     return this.siblings();
        // },
        children: function children(elem) {
            return this.sibling(elem.firstChild);
        },
        //与array一致性
        first: function first() {
            return this;
        },
        last: function last() {
            return this;
        },
        filter: function filter(key) {
            switch (key) {
                case "visible":
                    return _.isShow(this) ? this : null;
                    break;
                case "hidden":
                    return _.isHide(this) ? this : null;
                    break;
                default:
                    return this;
            }
        },
        append: function append(elem) {
            if (_.isElement(elem)) {
                return this.appendChild(elem);
            } else if (_.isString(elem)) {
                this.innerHTML = this.innerHTML + elem;
            }
        },
        //tap事件
        onTap: function onTap(handler) {
            toucher({
                el: this,
                type: "tap",
                listener: handler
            });

            // var self = this,
            //     startX, startY, startTime, lastMoveY, lastMoveTime;


            // this.off("touchstart").on("touchstart", function(ev) {
            //     ev = ev || event; //兼容firefox  jquery :ev.originalEvent
            //     console.log(ev);
            //     var touch = ev;
            //     // self.addClass("active");
            //     ev.target.addClass("active");

            //     // ev.stopPropagation();
            //     startX = ev.touches[0].pageX; //clientX
            //     startY = ev.touches[0].pageY;
            //     startTime = new Date().getTime();
            // });
            // // 惯性移动
            // this.off("touchend").on("touchend", function(ev) {
            //     var endX, endY, nowTime;
            //     endX = ev.changedTouches[0].pageX;
            //     endY = ev.changedTouches[0].pageY;
            //     nowTime = new Date().getTime();
            //     ev.target.removeClass("active");

            //     var y = endY - startY;
            //     var x = endX - startX;
            //     var duration = nowTime - startTime; //滑动时间
            //     if (Math.abs(x) <= 5 && Math.abs(y) <= 5 && duration < 200) {
            //         handler && handler(ev);
            //         // Events.trigger("tap", ev.target, ev)
            //     } else {
            //         console.log("x:" + x + " y:" + y + " duration:" + duration);
            //     }
            // });
        }
    };

    ['hide', 'show', 'isHide', 'active', 'passive'].forEach(function (t) {
        //, 'pos'
        _prototype.ele[t] = function () {
            return _[t] && _[t].call(this, this);
        };
    });

    ['$', 'query', 'hover', 'tab', 'hasAttr', 'hasClass', 'addClass', 'removeClass', 'closest'].forEach(function (t) {
        _prototype.ele[t] = function () {
            return _[t] && _[t].apply(this, arguments);
        };
    });

    _prototype.arr = {
        //支持链式
        query: function query(selector) {
            var list = [];
            _.each(this, function (item) {
                if (_.isElement(item)) {
                    var ele = _.autoid(item).query(selector);
                    if (_.size(ele) >= 1) list.push(ele);
                }
            });
            return list.length === 1 ? list[0] : list;
        },
        // Array.prototype.each=Array.prototype.forEach.bind(this);
        each: function each(fn) {
            if (_.isFunction(fn)) {
                _.each(this, function (item, index) {
                    fn.call(item, item, index);
                });
            }
        },
        first: function first() {
            return this[0];
        },
        last: function last() {
            return this[this.length - 1];
        },
        random: function random() {
            return this[Math.random() * this.length << 0];
        },
        //乱序
        shuffle: function shuffle() {
            var len = this.length;
            for (var i = 0; i < len - 1; i++) {
                var index = Math.random() * (len - i) << 0;
                var temp = this[index];
                this[index] = this[len - i - 1];
                this[len - i - 1] = temp;
            }
        }

        // contains: function(a) {
        //     return this.indexOf(a) != -1;
        // },
        // uniq: function() {
        //     var ra = new Array();
        //     for (var i = 0; i < this.length; i++) {
        //         if (!ra.contains(this[i])) {
        //             ra.push(this[i]);
        //         }
        //     }
        //     return ra;
        // },
        // each: function(fn) {
        //     fn = fn || Function.K;
        //     var a = [];
        //     var args = Array.prototype.slice.call(arguments, 1);
        //     for (var i = 0; i < this.length; i++) {
        //         var res = fn.apply(this, [this[i], i].concat(args));
        //         if (res != null) a.push(res);
        //     }
        //     return a;
        // },

    };
    _prototype.arr.$ = _prototype.arr.query;

    ['attr', 'remove', 'removeAttr', 'removeClass', 'addClass', 'html', 'filter', 'append', 'on', 'off', 'trigger', 'css', 'addEvent', 'hide', 'show', 'active', 'passive', 'clearEvent', 'hover', 'tab', 'siblings'].forEach(function (t) {
        _prototype.arr[t] = function () {
            var args = Array.prototype.slice.call(arguments),
                len = args.length,
                arr = this;
            if (arr.length === 0) {
                return arr;
            } else if (len === 1 && _.isString(args[0])) {
                //getter
                var results = [];
                arr.forEach(function (el) {
                    _.isElement(el) && results.push(el[t].apply(el, args));
                });
                return results; //为了链式语法，空值返回[]
            } else {
                //setter
                arr.forEach(function (el) {
                    _.isElement(el) && el[t].apply(el, args);
                });
                return arr;
            }
        };
    });
    //扩展原型  函数  extend prototype
    // _.extproto = function(obj) {
    //     var args = Array.prototype.slice.call(arguments),
    //         len = args.length;
    //     for (var i = 1; i < len; i++) {
    //         var source = args[i];
    //         if (source) {
    //             try {
    //                 for (var prop in source) {
    //                     if (_.isObject(source[prop])) {
    //                         Object.defineProperty(obj, prop, source[prop]);
    //                     } else if (_.isFunction(source[prop])) {
    //                         if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
    //                             obj[prop] = source[prop];
    //                             //禁止被for in 枚举
    //                             var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    //                             descriptor.enumerable = false;
    //                             Object.defineProperty(obj, prop, descriptor);
    //                         } else {
    //                             console.log(obj, "obj hasOwnProperty " + prop)
    //                         }
    //                     } else {
    //                         // if (!obj.hasOwnProperty(prop)) {
    //                         if (!Object.prototype.hasOwnProperty.call(obj, prop)) obj[prop] = source[prop];

    //                     }
    //                 }

    //             } catch (e) {
    //                 console.log(e)
    //             }

    //         }
    //     }
    //     return obj;
    // };

    //原型扩展 
    if (inBrowser) {
        //, Element 小程序中不允许扩展dom
        // _.extproto(Element.prototype, _prototype.ele);
        createClass(Element, _prototype.ele);
    };
    //Date, _.type(t.prototype) ==function
    // _.extproto(Date.prototype, _prototype.dat);
    createClass(Date, _prototype.dat);
    //原型扩展 
    [Object, Number, String, Array, Boolean].forEach(function (t, i) {
        // var name = t.prototype.constructor.name.toLowerCase().slice(0, 3);
        var name = _.type(t.prototype).slice(0, 3);
        _prototype[name] = _prototype[name] || {};
        _prototype[name].log = function () {
            console.log(_.stringify(this)); //.valueOf()//原始值
        };
        // _.extproto(t.prototype, _prototype[name]);
        createClass(t, _prototype[name]);
    });

    /**
     * Base64 解加密
     *
     * @param  { String } stringToEncode/encodedData
     * @return { String } encodedData/stringDecode
     * **/
    var Base64_encode = _.encode = function (stringToEncode) {
        var encodeUTF8string = function encodeUTF8string(str) {
            return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            });
        };

        if (typeof window !== 'undefined') {
            if (typeof window.btoa !== 'undefined') window.btoa(encodeUTF8string(stringToEncode));
        } else {
            return new Buffer(stringToEncode).toString('base64');
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            enc = '',
            tmpArr = [];
        if (!stringToEncode) {
            return stringToEncode;
        }
        stringToEncode = encodeUTF8string(stringToEncode);
        do {
            o1 = stringToEncode.charCodeAt(i++);
            o2 = stringToEncode.charCodeAt(i++);
            o3 = stringToEncode.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < stringToEncode.length);
        enc = tmpArr.join('');
        var r = stringToEncode.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    };

    var Base64_decode = _.decode = function (encodedData) {
        var decodeUTF8string = function decodeUTF8string(str) {
            return decodeURIComponent(str.split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        };

        if (typeof window !== 'undefined') {
            if (typeof window.atob !== 'undefined') {
                return decodeUTF8string(window.atob(encodedData));
            }
        } else {
            return new Buffer(encodedData, 'base64').toString('utf-8');
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            dec = '',
            tmpArr = [];
        if (!encodedData) {
            return encodedData;
        }
        encodedData += '';
        do {
            // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(encodedData.charAt(i++));
            h2 = b64.indexOf(encodedData.charAt(i++));
            h3 = b64.indexOf(encodedData.charAt(i++));
            h4 = b64.indexOf(encodedData.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            if (h3 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1);
            } else if (h4 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < encodedData.length);
        dec = tmpArr.join('');
        return decodeUTF8string(dec.replace(/\0+$/, ''));
    };

    //  事件模块
    var addEvent = function addEvent(type, el, listener) {
        if (_.isFunction(listener)) {
            if (window.addEventListener) {
                el.addEventListener(type, listener, {
                    passive: false
                }); //false
            } else {
                el.attachEvent('on' + type, listener);
            }
            //store events
            if (!el.events) el.events = [];

            el.events.push({
                type: type,
                el: el,
                listener: listener
            }); //listener
        } else if (_.isArray(listener)) {
            listener.forEach(function (t) {
                addEvent(type, el, t);
            });
        }
    };

    var removeEvent = function removeEvent(type, el, listener) {
        if (!_.isElement(el)) return false;
        if (listener) {
            if (window.removeEventListener) {
                el.removeEventListener(type, listener, {
                    passive: false
                }); //false
            } else {
                el.detachEvent('on' + type, listener);
            }
            //delete event
            if (!el.events) {
                el.events = [];
            }
            var i = el.events.length;
            while (i--) {
                if (el.events[i].type === type && el.events[i].listener === listener) el.events.splice(i, 1);
            }
        } else {
            el.events && el.events.forEach(function (t) {
                removeEvent(t.type, t.el, t.listener);
            });
        }
    };
    var startPos = {},
        endPos = {},
        offset = {},
        _touchstar = isSupportTouch ? "touchstart" : "mousedown",
        _touchend = isSupportTouch ? "touchend" : "mouseup",
        _touchmove = isSupportTouch ? "touchmove" : "mousemove";
    //事件
    var Events = function () {
        var storeEvents = [];
        return {
            store: function store(o) {
                if (o) storeEvents.push(o);
                return storeEvents;
            },
            filter: function filter(obj) {
                return _.filter(storeEvents, function (item) {
                    var flag = true;
                    for (x in obj) {
                        if (item[x] !== obj[x]) flag = false;
                    }return flag;
                });
            },
            reset: function reset() {
                storeEvents = [];
            },
            on: function on(type, el, listener, once) {
                var self = this;
                if (!isSupportTouch && type === TAP) type = "click";

                switch (type) {
                    case TAP:
                        var startHandler = function startHandler(ev) {
                            startPos = _.pos(ev);
                        };
                        var endHandler = function endHandler(ev) {
                            endPos = _.pos(ev);
                            var x = endPos.x - startPos.x,
                                y = endPos.y - startPos.y,
                                duration = endPos.time - startPos.time;

                            if (Math.abs(x) <= 5 && Math.abs(y) <= 5 && duration < 200) {
                                //快击
                                if (_.isFunction(listener)) {
                                    listener.call(el, endPos.el, ev);
                                } else if (_.isArray(listener)) {
                                    listener.forEach(function (t) {
                                        t.call(el, endPos.el, ev);
                                    });
                                }
                                if (once) self.off(type, el);
                            }
                        };
                        addEvent(_touchstar, el, startHandler);
                        addEvent(_touchend, el, endHandler);
                        break;
                    case LONGTAP:
                        //长按
                        var _longtap;
                        var startHandler = function startHandler(ev) {
                            _longtap = setTimeout(function () {
                                if (_.isFunction(listener)) {
                                    listener.call(el, el, ev);
                                } else if (_.isArray(listener)) {
                                    listener.forEach(function (t) {
                                        t.call(el, el, ev);
                                    });
                                }
                                if (once) self.off(type, el);
                            }, 1000);
                        };
                        var endHandler = function endHandler(ev) {
                            _longtap && clearTimeout(_longtap);
                        };
                        addEvent(_touchstar, el, startHandler);
                        addEvent(_touchend, el, endHandler);
                        break;
                    case DRAG:
                    case "drag-y":
                    case "drag-x":
                        var isDragging;
                        var preventDefault = function preventDefault(ev) {
                            ev.preventDefault();
                        };

                        var maxLeft = document.documentElement.clientWidth - el.clientWidth;
                        var maxTop = document.documentElement.clientHeight - el.clientHeight;

                        var range = {
                            top: 0,
                            left: 0,
                            right: maxLeft,
                            bottom: maxTop
                        };

                        var _posInRange = function _posInRange(pos, range) {
                            var x = _.between(range.left, range.right, pos.x);
                            var y = _.between(range.top, range.bottom, pos.y);
                            return {
                                left: x,
                                top: y
                            };
                        };
                        var startHandler = function startHandler(ev) {
                            startPos = _.pos(ev);
                            offset = _.pos(el);
                            el.css({
                                position: "absolute",
                                cursor: "move"
                            });
                            isDragging = true;
                            //不准整屏移动
                            addEvent(_touchmove, document, preventDefault);
                        };
                        var moveHandler = function moveHandler(ev) {
                            endPos = _.pos(ev);
                            isDragging && function () {
                                var left = endPos.x - startPos.x + offset.x;
                                var top = endPos.y - startPos.y + offset.y;
                                left = _.between(0, maxLeft, left);
                                top = _.between(0, maxTop, top);

                                if (type !== "drag-y") el.css({
                                    left: left + "px"
                                });
                                if (type !== "drag-x") el.css({
                                    top: top + "px"
                                });
                            }();
                        };
                        var endHandler = function endHandler(ev) {
                            endPos = _.pos(ev);

                            isDragging = false;
                            //允许整屏移动
                            removeEvent(_touchmove, document, preventDefault);
                            _.isFunction(listener) && listener.call(el, endPos.el, ev);
                        };

                        addEvent("mouseover", el, function (ev) {
                            el.css({
                                cursor: "move"
                            });
                        });
                        addEvent("mouseout", el, function (ev) {
                            el.css({
                                cursor: "normal"
                            });
                        });
                        addEvent(_touchstar, el, startHandler);
                        addEvent(_touchmove, document, moveHandler);
                        addEvent(_touchend, document, endHandler);
                        break;
                    default:
                        var _handler = function _handler(ev) {
                            // var _call = function() {
                            //     if (_.isFunction(listener)) {
                            //         listener.call(el, el, ev);
                            //     } else if (_.isArray(listener)) {
                            //         listener.forEach(function(t) {
                            //             t.call(el, el, ev);
                            //         });
                            //     }
                            // }
                            // if (type === "mousedown") {
                            //     isDragging = true;
                            // } else if (type === "mouseup") {
                            //     isDragging = false;
                            // }
                            // if (type === "mousemove") {
                            //     isDragging && _call();
                            // } else {
                            //     _call();
                            // }

                            if (_.isFunction(listener)) {
                                listener.call(el, el, ev);
                            } else if (_.isArray(listener)) {
                                listener.forEach(function (t) {
                                    t.call(el, el, ev);
                                });
                            }
                            if (once) self.off(type, el);
                        };
                        addEvent(type, el, _handler);
                        break;
                }
            },
            off: function off(type, el, listener) {
                if (TAP === type) {
                    removeEvent(_touchstar, el);
                    removeEvent(_touchend, el);
                } else {
                    removeEvent(type, el, listener);
                }
            }
        };
    }();

    var toucher = _.toucher = function (options) {
        function Toucher(options) {
            if (!(this instanceof Toucher)) return new Toucher(options);
            var self = this;
            if (!options) {
                if (options === false) self.offEvent();
                return;
            }
            var es = [];
            var _option = function _option(opt) {
                var el = _.query(opt.el),
                    type = opt.type || "click",
                    clear = _.isUndefined(opt.clear) ? true : opt.clear,
                    //clear 打扫:加载新事件事情，清除掉之前的事件,
                listener = opt.listener || opt.callback,
                    once = opt.once || false; //事件只运行一次，运行一次就自行remove
                if (_.isElement(el)) {
                    if (el.nodeName.toLowerCase() === "input" && type === TAP) type = "click";
                    // var touchmap = {
                    //     "touchstart": isSupportTouch ? "touchstart" : "mousedown",
                    //     "touchend": isSupportTouch ? "touchend" : "mouseup",
                    //     "touchmove": isSupportTouch ? "touchmove" : "mousemove"
                    // }
                    // type = type in touchmap ? touchmap[type] : type;
                    // var isDragging = false;

                    clear && self.clear({
                        el: el,
                        type: type
                    });

                    es.push({
                        type: type,
                        el: el,
                        listener: listener,
                        once: once
                    });
                } else if (_.isArray(el)) {
                    el.forEach(function (t) {
                        _option(_.clone(opt, {
                            el: t
                        }));
                    });
                }
            };
            if (_.isArray(options)) {
                options.forEach(function (t) {
                    _option(t);
                });
            } else {
                _option(options);
            }

            self.onEvent(es);
        }
        return createClass(Toucher, {
            onEvent: function onEvent(es) {
                es.forEach(function (t) {
                    Events.store(t);
                    Events.on(t.type, t.el, t.listener, t.once);
                });
                return this;
            },
            offEvent: function offEvent(filter) {
                Events.filter(filter).forEach(function (t) {
                    Events.off(t.type, t.el);
                });
                return this;
            },
            clear: function clear(filter) {
                return this.offEvent(filter);
            }

        });
    }();

    // ['tap', 'longTap', 'doubleTap', 'pinch', 'spread', 'rotate', 'swipe', 'swipeUp', 'swipeDown', 'swpieLeft', 'swipeRight'].forEach(function(item) {
    //     toucher.prototype[item] = function(selector, fn) {
    //         var el = _.query(selector);
    //         if (_.isArray(el)) {
    //             el.forEach(function(t) {
    //                 toucher.prototype.on.call(this, item, t, fn.bind(t))
    //             });
    //         } else if (_.isElement(el)) {
    //             toucher.prototype.on.call(this, item, el, fn.bind(el))
    //         }
    //         // var args = Array.prototype.slice.call(arguments);
    //         // args.unshift(item);
    //         // toucher.prototype.on.apply(this, args)
    //     }
    // });


    //字符串遍历 解析 区别于正则获取解析 
    //用在解析 markdown  json xml等格式的字符串上
    //var w=walker({text:"bbb| fidld1|field2|field3|aaa \n |new| line|fff|"});
    //console.log(w.table)
    // var w = walker({ text: match });
    // var tbl = w.table
    // // console.log()
    // // var line = tbl[0];
    // // var str = ""
    // // for (var j = 0, cols = line.length; j < cols; j++) {
    // //     str += _wrap("td", line[j])
    // // }
    // // str = _wrap("tr", str);

    // // var tbody = ""
    // var line, str = "";
    // for (var x = 0, len = tbl.length; x < len; x++) {
    //     var str2 = "",
    //         line = tbl[x];
    //     for (var y = 0, cols = line.length; y < cols; y++) {
    //         str2 += _wrap("td", line[y])
    //     }
    //     str += _wrap("tr", str2);
    // }

    // str = _wrap("table", str);
    // return str;
    var walker = _.walker = function () {
        function Walker(options) {
            if (!(this instanceof Walker)) return new Walker(options);
            if (_.isString(options)) {
                this.text = options;
            } else if (_.isNumber(options)) {
                this.text = "" + options;
            } else if (_.isObject(options)) {
                this.text = options.text || "";
                this.debug = options.debug || false;
            } else {
                throw {
                    name: "input error",
                    messasge: "string or {text:\"\"} is required"
                };
            }
            this.max = this.text.length;
            this.line = 0;
            this.col = 0;
            this.pos = 0;
            this.ch = this.peek();
        }
        return createClass(Walker, {
            //公共属性
            escapee: {
                "\"": "\"",
                "\\": "\\",
                "/": "/",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "\t"
            },
            parseTable: function parseTable() {
                this.table = [];
                var find,
                    line = [];
                while (this.next()) {
                    find = this.until("|");
                    find && line.push(find);
                    if (this.ch === "\n" || this.pos >= this.max) {
                        this.table.push(line); //.slice(0)
                        line = [];
                    }
                }
                return this.table;
            },
            peek: function peek(step) {
                var token = this.text.charAt(this.pos);
                if (step) {
                    token = "";
                    for (var i = 0; i <= step; i++) {
                        token += this.text.charAt(this.pos + i >= this.max ? this.max : this.pos + i);
                    }
                }
                return token;
            },
            eof: function eof() {
                return this.peek() === '';
            },
            next: function next(current) {
                if (current && current !== this.ch) {
                    error("Expected '" + current + "' instead of '" + this.ch + "'");
                }
                this.ch = this.text.charAt(this.pos++);
                if (this.ch === '\n') {
                    this.line++;
                    this.col = 0;
                } else {
                    this.col++;
                }
                if (this.debug) this.token = this.peek(10);
                return this.ch;
            },
            back: function back() {
                return this.ch = this.text.charAt(this.pos--);
            },
            error: function error(m) {
                var token = "",
                    len = 10;
                while (len--) {
                    this.next();
                    token += this.ch;
                }

                var info = {
                    name: "SyntaxError",
                    message: m,
                    pos: this.pos,
                    ch: this.ch,
                    line: this.line,
                    col: this.col,
                    text: this.text,
                    token: token
                };
                // throw info;
                console.log(info);
            },
            info: function info() {
                return {
                    pos: this.pos,
                    ch: this.ch,
                    line: this.line,
                    col: this.col,
                    text: this.text
                };
            },
            until: function until(separator) {
                var value = "",
                    ch = this.ch;
                if (ch === separator) {
                    //开头
                    while (ch = this.next()) {
                        if (ch === separator) {
                            //结尾
                            this.back(); //回退
                            return value;
                        }
                        if (ch === "\n") {
                            value = "";
                            break;
                        }
                        value += ch;
                    }
                }
                return value;
            },
            json: function json() {
                return this._parseJson();
            },
            _parseJson: function _parseJson() {
                this._skipWhite();
                switch (this.ch) {
                    case "{":
                        return this._parseObj();
                        break;
                    case "[":
                        return this._parseArr();
                        break;
                    case ":":
                        return this._parseJson();
                        break;
                    case "\"":
                    case "\'":
                        return this._parseStr();
                        break;
                    default:
                        if (/[\d\.-]/.test(this.ch)) {
                            return this._parseNum();
                        } else {
                            return this._parseValue();
                        }
                        break;
                }
            },
            _parseObj: function _parseObj() {
                this._skipWhite();
                var obj = {},
                    key;
                if ("{" === this.ch) {
                    while (this.next()) {
                        this._skipWhite();
                        if (this.ch === "}") {
                            this.next();
                            return obj;
                        }
                        if (this.ch) {
                            key = this._parseKey();
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                this.error("Duplicate key '" + key + "'");
                                console.log(obj);
                            }
                            obj[key] = this._parseJson();
                        }
                    }
                }
                return obj;
            },
            _parseArr: function _parseArr() {
                this._skipWhite();
                var arr = [];
                if ("[" === this.ch) {
                    while (this.next()) {
                        this._skipWhite();
                        if (this.ch === "]") {
                            this.next();
                            return arr;
                        }
                        if (this.ch) {
                            var value = this._parseJson();
                            if (value) {
                                arr.push(value);
                                if (this.ch === "]") {
                                    this.next();
                                    return arr;
                                }
                            }
                        }
                    }
                }
                return arr;
            },
            _skipWhite: function _skipWhite() {
                while (this.ch && this.ch <= " ") {
                    this.next();
                }
            },
            _removeQuote: function _removeQuote(value) {
                return value.replace(/(?:^"(.*)"$)|(?:^'(.*)'$)/, "$1$2");
            },
            _parseKey: function _parseKey() {
                var value = this.ch;
                while (this.next()) {
                    if (this.ch === ":") {
                        this.next();
                        return this._removeQuote(value);
                    }
                    value += this.ch;
                }
                // this.error("Bad string");
            },
            _parseStr: function _parseStr() {
                this._skipWhite();
                var value = "",
                    starFlag = this.ch;
                if (!!~"\"\'".indexOf(starFlag)) {
                    while (this.next()) {
                        if (starFlag === this.ch) {
                            this.next();
                            return value;
                        }
                        if (this.ch === "\\") {
                            this.next();
                            if (this.escapee[this.ch]) {
                                value += this.escapee[this.ch];
                            }
                        }
                        value += this.ch;
                    }
                }
            },
            _parseNum: function _parseNum() {
                if (/[\d\.-]/.test(this.ch)) {
                    var value = this.ch;
                    while (this.next()) {
                        if (!!~",}]".indexOf(this.ch)) return value = +value;
                        value += this.ch;
                    }
                    return value;
                }
            },
            _parseValue: function _parseValue() {
                var value = this.ch;
                while (this.next()) {
                    if (!!~",}]".indexOf(this.ch)) {
                        return this._removeQuote(value);
                    }
                    value += this.ch;
                }
                return value;
            }
        });
    }();

    //调试
    // var log = window.log = _.log = console.log.bind(console);
    var debug = _.debug = function () {
        function Debug() {
            var div = document.createElement("div");
            div.className = "_console";
            var div_handle = document.createElement("div");
            div_handle.className = "_console_handle";
            div_handle.innerHTML = "debug";
            var div2 = document.createElement("div");
            div2.className = "_console_log";
            div.appendChild(div_handle);
            div.appendChild(div2);
            _.$("body").appendChild(div);

            console.log = function () {
                var len = arguments.length;
                template({
                    el: "._console_log",
                    act: "append",
                    template: '<div class="_item">{=result}</div>',
                    data: {
                        result: len === 1 ? arguments[0] : Array.prototype.slice.call(arguments)
                    },
                    callback: function callback() {
                        this.el.$("._item").removeAttr("style").last().css({
                            color: 'red'
                        }).scrollIntoView();
                    }
                });
            };

            toucher([{
                el: "._console",
                type: "touchstart",
                callback: function callback(item, ev) {
                    ev.preventDefault(); //阻止默认行为
                    ev.stopPropagation(); //停止事件冒泡，向上派发事件到document
                }
            }, {
                el: "._console_handle",
                type: "tap",
                callback: function callback(item, ev) {
                    var log = _.$("._console_log");

                    _.isShow(log) ? _.hide(log) : _.show(log);
                }
            }]);
        }

        //代理 只运行一次
        var instance;
        return function () {
            if (!instance) instance = new Debug();
            return instance;
        };
    }();

    //按次序循环
    var cycle = _.cycle = function () {
        var Cycle = function Cycle(values, index) {
            if (!(this instanceof Cycle)) return new Cycle(values, index);
            var args = Array.prototype.slice.call(arguments),
                len = args.length;
            this.index = 0; //默认第一个
            this.values = [];

            if (_.isArray(args[0])) {
                this.values = args[0];
            } else if (_.isObject(args[0])) {
                for (var key in args[0]) {
                    var obj = {};
                    obj[key] = args[0][key];
                    this.values.push(obj);
                }
            } else {
                this.values.push(args[0]);
            }
            if (len >= 2) {
                if (_.isNumber(args[0])) {
                    var start = args[0],
                        end = args[1];
                    for (var i = start; i <= end; i++) {
                        this.values.push(i);
                    }
                } else {
                    this.index = args[1];
                }
            }
            if (len === 3) this.text = args[2];
            this.length = this.values.length;
        };
        return createClass(Cycle, {
            next: function next() {
                return this.values[this.index = this.index + 1 >= this.length ? 0 : this.index + 1];
            },
            prev: function prev() {
                return this.values[this.index = this.index <= 0 ? this.length - 1 : this.index - 1];
            },
            current: function current() {
                return this.values[this.index = this.index === -1 ? 0 : this.index];
            },
            val: function val() {
                return this.current();
            },
            first: function first() {
                return this.length > 0 ? this.values[0] : null;
            },
            last: function last() {
                return this.length > 0 ? this.values[this.length - 1] : null;
            },
            text: function text(str) {
                this.text = str;
            },
            attr: function attr(opt) {
                for (var k in opt) {
                    this[k] = opt[k];
                }return this;
            }
        });
    }();

    _.sliderCycle = function (options) {
        var min = options.min,
            max = options.max,
            step = options.step,
            value = options.value,
            values = [],
            i = 0,
            t = min,
            index = 0;
        //判断小数位数
        // var n=step.toString().split(".")[1].length;
        var n = 0;
        step.toString().replace(/\d+(?:\.(\d+))?/, function (m, f) {
            if (f) n = f.length;
        });

        while (t <= max) {
            values.push(t);
            if (t === value) index = i;
            t = +(t + step).toFixed(n);
            i++;
        }
        return _.cycle(values, index).attr(options);
    };

    //polyfill  requestAnimationFrame
    inBrowser && function () {
        var lastTime = 0,
            vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
            var currTime = +new Date();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime)); //1000 / 60
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

        //IE10以前的版本，不支持为setTimeout()和setInterval()方法传递第三个参数
        if (document.all && !window.setTimeout.isPolyfill) {
            var __nativeST__ = window.setTimeout;
            window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
                var aArgs = Array.prototype.slice.call(arguments, 2);
                return __nativeST__(vCallback instanceof Function ? function () {
                    vCallback.apply(null, aArgs);
                } : vCallback, nDelay);
            };
            window.setTimeout.isPolyfill = true;
        }

        if (document.all && !window.setInterval.isPolyfill) {
            var __nativeSI__ = window.setInterval;
            window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
                var aArgs = Array.prototype.slice.call(arguments, 2);
                return __nativeSI__(vCallback instanceof Function ? function () {
                    vCallback.apply(null, aArgs);
                } : vCallback, nDelay);
            };
            window.setInterval.isPolyfill = true;
        }
    }();

    var PIx2 = Math.PI * 2; //- 0.0001;

    //弧度radian
    _.rad = function (a) {
        a %= 360;
        return a * Math.PI / 180;
    };
    //弧度转角度
    _.deg = function (rad) {
        return rad * (180 / Math.PI);
    };
    //正玄
    _.sin = function (a) {
        a %= 360;
        return Math.sin(a * Math.PI / 180);
    };
    //余玄
    _.cos = function (a) {
        a %= 360;
        return Math.cos(a * Math.PI / 180);
    };
    //正切
    _.tan = function (a) {
        a %= 360;
        return Math.tan(a * Math.PI / 180);
    };
    _.atan = function (a) {
        a %= 360;
        return Math.atan(a * Math.PI / 180);
    };
    //获取斐波那契数列
    //第三个数开始，每个数都是前两个数之和
    _.fibonacci = function (n) {
        if (n === 1) return [0];
        if (n === 2) return [0, 1];
        var arr = [0, 1];
        for (var i = 0; i < n - 2; i++) {
            arr[arr.length] = arr[i] + arr[i + 1];
        }return arr;
    };

    // //延迟 函数队列  (带参数)
    // var _queue = _.queue = function() {
    //     function Queue(fn) {
    //         if (!(this instanceof Queue)) return new Queue(fn);
    //         this.dataStore = [];
    //         this.speeds = {
    //             slow: 600,
    //             fast: 200,
    //             _default: 400
    //         };
    //         fn && this.push(fn)
    //     }
    //     return createClass(Queue, {
    //         push: function(fn) {
    //             // var self = this;
    //             // this.dataStore.push(function() {
    //             //     fn && fn()
    //             //     self.next()
    //             // })
    //             this.dataStore.push(fn);
    //         },
    //         shift: function() {
    //             return this.dataStore.shift();
    //         },
    //         //执行
    //         next: function() {
    //             var fn = this.shift();
    //             fn && fn();
    //             // fn && fn.call(this, this.next);
    //         },
    //         //延迟
    //         delay: function(fn, time) {
    //             var self = this;
    //             time = _.isNumber(time) ? time : time in this.speeds ? this.speeds[time] : this.speeds._default;
    //             this.push(function(next) {
    //                 setTimeout(function(i) {
    //                     fn && fn(i);
    //                     next && next.call(self);
    //                 }, time);
    //             })
    //             self.timeout && clearTimeout(self.timeout);
    //             self.timeout = setTimeout(function() {
    //                 self.next();
    //             }, 0)
    //         }
    //     })
    // }();

    //延迟函数队列
    var _delay = _.delay = function () {
        var stack = [],
            speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
            index = 0;
        var nextTimeout, fireTimeout;

        // opt={
        //     callback:调用函数,
        //     time:延迟时间,
        //     args:参数,
        //     loop:是否循环,
        // }
        function Delay(fn, time) {
            // if (!(this instanceof Delay)) return new Delay(fn, time);
            var self = this instanceof Delay ? this : Object.create(Delay.prototype);

            // currentTime = +new Date();
            fn && self.load.apply(self, arguments);
            self.stack = stack;
            self.index = index;
            return self;
        }

        createClass(Delay, {
            //填弹
            load: function load(_fn, time) {
                var self = this;
                // var fn=opt.fn;
                // var time=opt.time;
                // var args=opt.args;
                // var loop
                var args = Array.prototype.slice.call(arguments, 2);
                time = _.isNumber(time) ? time : time in speeds ? speeds[time] : speeds._default;
                _fn && stack.push({
                    fn: function fn() {
                        _fn && _fn.apply(null, args);
                        self.next.call(self);
                        // console.timeEnd("delay");
                        // console.log(args)
                        // console.time("delay");
                    },
                    time: time,
                    args: args //参数
                    // loop:loop
                });

                // if(+new Date() -currentTime <0)

                self.fire.call(self);
                return self;
            },
            //连续 发射
            next: function next() {
                this.index = index;
                var obj = stack[index++];
                if (obj) {
                    if (this.force) // true 规定时间内没执行完不执行
                        nextTimeout && clearTimeout(nextTimeout);
                    nextTimeout = setTimeout(obj.fn, obj.time); //
                }
            },
            //点火   重头开始执行   没执行完不执行  覆盖执行
            fire: function fire(i) {
                if (stack.length === 0) return this;
                index = _.isUndefined(i) ? 0 : _.between(0, stack.length, i);
                nextTimeout && clearTimeout(nextTimeout);
                fireTimeout && clearTimeout(fireTimeout);
                fireTimeout = setTimeout(function () {
                    var obj = stack[index++];
                    obj.fn && obj.fn.apply(null, obj.args);
                }, stack[index].time);
                return this;
                // console.time("delay");
            }
        });
        var instance;
        //代理
        return function () {
            if (instance) instance.load.apply(instance, arguments);else instance = Delay.apply(null, arguments);
            return instance;
        };
    }();

    //循环  按次数调用 接收参数
    var _loop = _.loop = function () {
        var Loop = function Loop(callback, times, delay) {
            if (!(this instanceof Loop)) return new Loop(callback, times, delay);
            this.times = times;
            this.callback = callback || function (i) {
                console.log(i);
            };
            this.delay = delay;
            this.run();
        };
        return createClass(Loop, {
            run: function run() {
                if (this.delay) {
                    for (var i = 0; i < this.times; i++) {
                        _.delay(this.callback, this.delay, i);
                    }
                } else {
                    for (var i = 0; i < this.times; i++) {
                        this.callback && this.callback(i);
                    }
                }
            }
        });
    }();

    //动画 不断重复 
    var _animate = _.animate = function () {
        var timmer, anId;

        function Animate(callback, timeInterval) {
            if (!(this instanceof Animate)) return new Animate(callback, timeInterval);
            this.stop();
            this.start(callback, timeInterval);
        }
        return createClass(Animate, {
            stop: function stop() {
                anId && inBrowser && cancelAnimationFrame(anId);
                timmer && clearTimeout(timmer);
            },
            start: function start(callback, timeInterval) {
                if (_.isUndefined(timeInterval) && inBrowser) {
                    (function update() {
                        anId = requestAnimationFrame(update);
                        callback && callback();
                    })();
                } else {
                    timeInterval = _.isUndefined(timeInterval) ? 17 : timeInterval;
                    (function update() {
                        timmer = setTimeout(update, timeInterval);
                        callback && callback();
                    })();
                }
            }
        });
        var intance;
        return function (callback, timeInterval) {
            if (intance) {
                intance.stop();
                intance.start(callback, timeInterval);
            } else {
                intance = Animate(callback, timeInterval);
            }
            return intance;
        };
    }();

    var Easing = _.Easing = {
        //定义域和值域均为[0, 1], 传入自变量x返回对应值y
        //先加速后减速
        ease: function ease(x) {
            // return -0.5*Math.cos(Math.PI * (2 - x)) + 0.5;
            if (x <= 0.5) return 2 * x * x;else if (x > 0.5) return -2 * x * x + 4 * x - 1;
        },

        // 初速度为0 ,一直加速
        easeIn: function easeIn(x) {
            return x * x;
        },

        //先慢慢加速1/3, 然后突然大提速, 最后减速
        ease2: function ease2(x) {
            return x < 1 / 3 ? x * x : -2 * x * x + 4 * x - 1;
        },

        //初速度较大, 一直减速, 缓冲动画
        easeOut: function easeOut(x) {
            return Math.pow(x, 0.8);
        },

        //碰撞动画
        collision: function collision(x) {
            var a, b; //a, b代表碰撞点的横坐标
            for (var i = 1, m = 20; i < m; i++) {
                a = 1 - 4 / 3 * Math.pow(0.5, i - 1);
                b = 1 - 4 / 3 * Math.pow(0.5, i);
                if (x >= a && x <= b) {
                    return Math.pow(3 * (x - (a + b) / 2), 2) + 1 - Math.pow(0.25, i - 1);
                }
            }
        },

        //弹性动画
        elastic: function elastic(x) {
            return -Math.pow(1 / 12, x) * Math.cos(Math.PI * 2.5 * x * x) + 1;
        },

        //匀速动画
        linear: function linear(x) {
            return x;
        },

        //断断续续加速减速
        wave: function wave(x) {
            return 1 / 12 * Math.sin(5 * Math.PI * x) + x;
        },

        //先向反方向移动一小段距离, 然后正方向移动, 并超过终点一小段, 然后回到终点
        opposite: function opposite(x) {
            return Math.sqrt(2) / 2 * Math.sin(3 * Math.PI / 2 * (x - 0.5)) + 0.5;
        }

        // 补间动画     直线运动 匀速 非匀速   曲线运动  路径动画
    };var _tween = _.tween = function () {
        function Tween(options) {
            if (!(this instanceof Tween)) return new Tween(options);
            this._start = options.start;
            this._end = options.to || options.end;
            this.callback = options.callback;
            this.duration = options.duration; //Math.ceil(options.duration / 17);
            this._repeat = options.repeat;
            this._yoyo = options.yoyo;
            this.type = options.type || "linear";
            // this.step = 0;
            this._deta = {};
            for (var key in this._end) {
                if (this._end.hasOwnProperty(key) && _.isNumber(this._end[key])) this._deta[key] = this._end[key] - this._start[key] || 0;
            }
            this._delayTime = options.delay || 0;
            this._startTime = +new Date(); // Date.now();
            this._startTime += this._delayTime;
            this.update();
        }
        return createClass(Tween, {
            //计算中间值
            calculate: function calculate(time) {
                var k = (time - this._startTime) / this.duration;
                k = this.duration === 0 || k > 1 ? 1 : k;

                var vk;
                if (_.isObject(this.type)) {
                    vk = {};
                    for (var key in this._deta) {
                        if (this._deta.hasOwnProperty(key)) {
                            vk[key] = Easing[this.type[key] || "linear"](k);
                        }
                    }
                } else {
                    vk = Easing[this.type](k);
                }

                //重复
                if (this._repeat) {
                    if (k === 1) {
                        this._startTime = time;
                        if (isFinite(this._repeat)) this._repeat--;
                        if (this._yoyo) {
                            // start end替换
                            var temp = this._start;
                            this._start = this._end;
                            this._end = temp;
                            for (var key in this._end) {
                                if (this._end.hasOwnProperty(key)) {
                                    this._deta[key] = this._end[key] - this._start[key] || 0;
                                }
                            }
                        }
                    }
                }
                var obj = {};
                for (var key in this._deta) {
                    if (this._deta.hasOwnProperty(key)) {
                        var v = _.isObject(vk) ? vk[key] : vk;
                        obj[key] = v * this._deta[key] + this._start[key];
                    }
                }
                return obj;
            },
            //更新
            update: function update() {
                var self = this,
                    time = +new Date(),
                    obj = this.calculate.call(this, time);

                if (time - this._startTime <= this.duration) {
                    this.callback(obj);
                    // requestAnimationFrame.call(this,this.update);
                    setTimeout(function () {
                        self.update.call(self);
                    }, 17);
                } else {
                    this.callback(obj);
                }
            }
        });
    }();

    //向量  空间计算工具
    var _vector = _.vector = function () {
        function Vector(opt) {
            if (!(this instanceof Vector)) return new Vector(opt);
            opt = opt || {};
            this.x = opt.x || 0;
            this.y = opt.y || 0;
            this.z = opt.z || 0;
        }
        return createClass(Vector, {
            // reset:function(){
            //     return this.constructor(this.opt);
            // },
            //相等 equals
            equal: function equal(v) {
                return v.x === this.x && v.y === this.y && v.z === this.z;
            },
            clone: function clone() {
                return Vector({
                    x: this.x,
                    y: this.y,
                    z: this.z
                });
            },
            //负向量 转180度  
            //negated
            neg: function neg() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                return this;
            },
            //法向量 normal vector 垂直向量 
            //Vector norm
            norm: function norm() {
                return Vector({
                    x: -this.y,
                    y: this.x
                });
            },
            //向量相加
            //Translate vector
            //translate(v1, v2):= v1.add(v2)
            add: function add(v) {
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                return this;
            },
            //向量相减
            sub: function sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                return this;
            },
            //缩放 scalar
            scale: function scale(s) {
                this.x *= s;
                this.y *= s;
                this.z *= s;
                return this;
            },
            //取模 向量长度  勾股定理
            //修改长度，改变向量的大小
            abs: function abs(len) {
                if (_.isUndefined(len)) return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                var abs = this.abs();
                if (abs === 0) {
                    //0向量
                    this.x = len;
                } else if (len !== abs) {
                    //abs !== 0 &&
                    this.scale(len / abs);
                }
                return this;
            },
            //方向 向量的角度
            deg: function deg(_deg) {
                if (_.isUndefined(_deg)) return this.radToDeg(Math.atan2(this.y, this.x));
                var r = this.abs();
                this.x = r * _.cos(_deg); // Math.cos(this.degToRad(deg));
                this.y = r * _.sin(_deg); //Math.sin(this.degToRad(deg));
                return this;
            },
            //方向 向量的弧度
            rad: function rad(_rad) {
                if (_.isUndefined(_rad)) return Math.atan2(this.y, this.x);
                var r = this.abs();
                this.x = r * Math.cos(_rad);
                this.y = r * Math.sin(_rad);
                return this;
            },
            //向量点积
            //Scale vector
            //scale(v1, factor):= v1.mul(factor)
            //Rotate vector around center
            //rotate(v, angle):= v.mul({abs: 1, arg: angle})
            //Rotate vector around a point
            //rotate(v, p, angle):= v.sub(p).mul({abs: 1, arg: angle}).add(p)
            mul: function mul(v) {
                return this.x * v.x || 0 + this.y * v.y || 0 + this.z * v.z || 0;
            },
            //夹角 根据两个向量夹角计算  Included angle
            ia: function ia(v) {
                return Math.acos(this.mul(v) / (this.abs() * v.abs()));
            },
            //是否垂直 Normal to
            isNorm: function isNorm(v) {
                return this.mul(v) === 0;
            },
            //角度转弧度
            degToRad: function degToRad(deg) {
                return deg * (Math.PI / 180);
            },
            //弧度转角度
            radToDeg: function radToDeg(rad) {
                return rad * (180 / Math.PI);
            },
            //向量的绕Z轴旋转
            rotate: function rotate(deg) {
                var ca = _.cos(deg),
                    sa = _.sin(deg),
                    x = this.x,
                    y = this.y,
                    rx = x * ca - y * sa,
                    ry = x * sa + y * ca;
                this.x = rx;
                this.y = ry;
                return this;
            },

            //三维向量的叉积，向量积
            cross: function cross(v) {
                var x = this.x,
                    y = this.y,
                    z = this.z;
                this.x = y * v.z - z * v.y;
                this.y = z * v.x - x * v.z;
                this.z = x * v.y - y * v.x;
                return this;
            },
            //向量分裂
            split: function split(n) {
                var vs = [];
                for (var i = 1; i <= n; i++) {
                    vs[vs.length] = this.clone().scale(i / (n + 1));
                }
                return vs;
            },
            // 绕XY轴旋转
            rotateXY: function rotateXY(a, b) {
                var ca = _.cos(a),
                    sa = _.sin(a),
                    cb = _.cos(b),
                    sb = _.sin(b);
                var x = this.x,
                    y = this.y,
                    z = this.z,
                    rz = y * sa + z * ca;
                this.y = y * ca - z * sa;
                this.z = x * -sb + rz * cb;
                this.x = x * cb + rz * sb;
                return this;
            },
            //透视比率 perspectiveRatio
            pr: function pr(viewDist) {
                viewDist = viewDist ? viewDist : 300;
                return viewDist / (this.z + viewDist);
            },
            //投射到屏幕上的二维点  project
            proj: function proj(pr) {
                pr = pr ? pr : this.pr();
                this.x *= pr;
                this.y *= pr;
                this.z = 0;
                return this;
            },

            //toPolar 转成极坐标
            toP: function toP(o) {
                var a = this.deg(),
                    r = this.abs();
                return _pointPolar({
                    a: a,
                    r: r,
                    o: o || this
                });
            }
        });
    }();

    // 极坐标点
    //输入：r,a ,o(x,y)
    //输出：x y  
    var _pointPolar = _.pointPolar = function () {
        function PointPolar(opt) {
            if (!(this instanceof PointPolar)) return new PointPolar(opt);
            _.extend(this, opt);
            var a = this.a = opt.a || 0,
                r = this.r = opt.r || 0,
                o = this.o = opt.o || {
                x: 0,
                y: 0,
                z: 0
            },
                p = this.xy(r, a, o);
            this.x = p.x;
            this.y = p.y;
        };
        return createClass(PointPolar, {
            //极坐标转xy坐标
            xy: function xy(r, a, o) {
                return {
                    x: o.x + r * _.cos(a),
                    y: o.y + r * _.sin(a)
                };
            },

            //toVector
            //向量 vector 以this为原点坐标 表示向量 p
            toV: function toV(p) {
                return p ? _vector({
                    x: p.x - this.x,
                    y: p.y - this.y
                }) : _vector({
                    x: this.x - this.o.x,
                    y: this.y - this.o.y
                });
            },
            //距离  勾股定律 向量取模 distance
            //distance(v1, v2):= v1.sub(v2).abs()
            // distance: function(p) {
            //     return this.toV(p).abs();
            // },
            dist: function dist(p) {
                return this.toV(p).abs();
            },
            clone: function clone(opt) {
                //会重新计算xy
                return PointPolar(_.extend({}, this, opt));
            },

            //(x,y)关于y=x的对称点是(y,x)
            //关于y=-x的对称点为 （-y,-x）
            //对称点 y=x是 线段（x,y）,(y,x)的垂直平分线
            //斜率k1*k2=-1 垂直平分线
            //中垂线是线段的一条对称轴
            //斜率 slope
            slope: function slope(p) {
                return (this.y - p.y) / (this.x - p.x);
            },
            //中点 middle, 求this和p的中点， p{x,y}
            mid: function mid(p) {
                //, ratio
                return this.toV(p).scale(0.5).toP(this);
            },
            //均分点meanSplit。分割n次，分割成n+1段
            split: function split(p, n) {
                var ps = [];
                for (var i = 1; i <= n; i++) {
                    ps[ps.length] = this.toV(p).scale(i / (n + 1)).toP(this);
                }return ps;
            },
            //镜像 镜像点，以p为镜像原点
            mirror: function mirror(p, ratio) {
                var v = this.toV(p);
                if (ratio) v.scale(ratio);
                return v.toP(p);
            },
            //经过点的平行线 parallel lines
            //经过t点的平行线
            // _parallel: function(p, t, k) {
            //     var v = this.toV(p);
            //     return v.scale(k).add(t);
            // },
            //经过t点的垂线
            //k为0时，中间控制点落在这条线段上，k为1时，中间控制点与直线的距离为这条线段的长度
            //curveness曲率
            // _vertical: function(p, t, k) {
            //     var v = this.toV(p);
            //     return v.norm().scale(k).add(t);
            // },

            //经过点的垂线

            //两点确定的直线上 移动距离
            //k=tanθ=sinA/cosA
            translate: function translate(p, d) {
                return this.toV(p).abs(d).toP(this);
            },
            trans: function trans(p, d) {
                return this.translate(p, d);
            },
            //vertical split line  ,垂点，曲率
            //垂直均分线，垂线上的点与垂点距离 
            vertical: function vertical(p, d) {
                return this.toV(p).norm().abs(d).toP(this);
            },
            norm: function norm(p, d) {
                return this.vertical(p, d);
            },
            //平移
            // _translateXY: function(x, y) {
            //     var o2 = {
            //         x: this.o.x + x || 0,
            //         y: this.o.y + y || 0
            //     }
            //     return this.clone({ o: o2 });
            // },
            // _translate: function(k, d, o) {
            //     var r = Math.sqrt(Math.pow(k, 2) + 1);
            //     var sina = k / r;
            //     var cosa = 1 / r;
            //     var o2 = {};
            //     o2.x = k * d * cosa + o.x;
            //     o2.y = k * d * sina + o.y;
            //     return this.clone({ o: o2 })
            // },
            //旋转 =rotateZ
            rotate: function rotate(a) {
                return this.clone({
                    a: (this.a + a) % 360
                });
            },
            rotateZ: function rotateZ(a) {
                return this.rotate(a);
            },
            rotateXY: function rotateXY(a, b) {
                return this.toV().rotateXY(a, b).proj().toP(this);
            },
            rotateX: function rotateX(a) {
                return this.rotateXY(a, 0);
            },
            rotateY: function rotateY(a) {
                return this.rotateXY(0, a);
            },
            scale: function scale(e) {
                return this.clone({
                    r: this.r * e
                });
            },
            add: function add(p) {
                this.x += p.x;
                this.y += p.y;
                return this;
            },
            //投射点
            proj: function proj(p, pr) {
                return this.toV(p).proj(pr).toP(this);
            },
            //透视比
            pr: function pr(p, d) {
                return this.toV(p).pr(d);
            },
            //初始化速度
            speed: function speed(s) {
                s = s || 1;
                this.vx = (Math.random() * 2 - 1) * s;
                this.vy = (Math.random() * 2 - 1) * s;
                return this;
            },
            speedPolar: function speedPolar() {
                s = s || 1;
                this.vr = (Math.random() * 2 - 1) * s;
                this.va = (Math.random() * 2 - 1) * s;
                return this;
            },
            // 移动
            move: function move() {
                if (this.vx) this.x += this.vx;
                if (this.vy) this.y += this.vy;

                if (this.vr) this.r += this.vr;
                if (this.va) this.a += this.va;
                return this;
            }
        });
    }();

    //点
    //直角坐标 xyz Coordinate
    var _point = _.point = function () {
        function Point(opt) {
            if (!(this instanceof Point)) return new Point(opt);
            this.x = opt.x || 0;
            this.y = opt.y || 0;
            this.z = opt.z || 0;
            this.r = opt.r;
            this.color = opt.color;
            this.speed = opt.speed || 1;
            this.vx = 0;
            this.vy = 0;
            this.vz = 0;
            this.spring = 0.01;
            //range
            this.left = opt.left || 0;
            this.right = opt.right || opt.width;
            this.top = opt.top || 0;
            this.bottom = opt.bottom || opt.height;

            this.speed();
        }
        return createClass(Point, {
            // spring: 0.01, //弹力
            friction: 0.9, //摩擦力
            //初始速度
            speed: function speed() {
                this.vx = (Math.random() * 2 - 1) * this.speed;
                this.vy = (Math.random() * 2 - 1) * this.speed;
                this.vz = (Math.random() * 2 - 1) * this.speed;
                this.spring = 0.01 + Math.random() * 0.04;
            },
            //移动目标
            target: function target(t) {
                this.translating = true;
                this.tx = t.x || 0;
                this.ty = t.y || 0;
                this.tz = t.z || 0;
                return this;
            },
            //跟随移动  位移过渡
            follow: function follow() {
                this.vx += (this.tx - this.x) * this.spring;
                this.vy += (this.ty - this.y) * this.spring;
                this.vz += (this.tz - this.z) * this.spring;

                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vz *= this.friction;

                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;
                //到达
                if (Math.abs(this.tx - this.x) < 5 && Math.abs(this.ty - this.y) < 5 && Math.abs(this.tz - this.z) < 5) {
                    this.translating = false;
                }
                return this;
            },

            //移动
            move: function move() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;
                // this.a=this.a*0.9;
                // this.vy+=0.22; //加速下落
                // this.vy += 0.01 * this.vx * this.vx; //*this.vx

                // this.vx+=0.41*this.vy

                return this.bound();
            },
            //回弹
            bound: function bound() {
                if (this.x < this.left || this.x > this.right) this.vx *= -1;
                if (this.y < this.top || this.y > this.bottom) this.vy *= -1;
                return this;
            },
            clone: function clone(opt) {
                // return this.constructor(_.extend({}, this, opt))
                return Point(_.extend({}, this, opt));
            }
        });
    }();

    //顶点  极坐标,等角切分
    //当r相同时  半径变化比率rRation=1  为正多边形
    //1 ,.05，两个数循环。形成星形  ，凹多边形
    //渐渐变大或变小 ，形成 螺旋线 
    //不等角切分 等距r  形成矩形  (未处理) 
    var _vertex = _.vertex = function () {
        function Vertex(options) {
            if (!(this instanceof Vertex)) return new Vertex(options);
            if (options) {
                this.po = this.centerPoint(options);
                this.vs = this.vertices(options);
            }
        }
        return createClass(Vertex, {
            //圆心
            centerPoint: function centerPoint(opt) {
                var o = {
                    x: opt.x || 0,
                    y: opt.y || 0
                };
                return _pointPolar({
                    o: o
                });
            },
            //顶点 polygon 多边形
            vertices: function vertices(opt) {
                var shape = opt.group || opt.shape,
                    r = opt.r || 100,
                    a = opt.a || 0,
                    x = opt.x,
                    y = opt.y,
                    rRatio = opt.rRatio || 1,
                    aRatio = opt.aRatio || 1,
                    turns = opt.turns || 1,
                    num = opt.num || 3,
                    po = this.po;

                //变化类型：加速 匀速
                var rRatioType = opt.rRatioType;
                // this.aRatioType = op.aRatioType;

                switch (shape) {
                    case "star":
                        rRatioType = "ac";
                        rRatio = [rRatio, 1 / rRatio];
                        break;
                    case "spiral":
                        r = 0.01;
                        turns = 30;
                        break;
                }
                var vs = [],
                    rRatioCycle = _.cycle(rRatio || 1),
                    rn = r,
                    an;
                for (var i = 0; i < num * turns; i++) {
                    switch (rRatioType) {
                        case "cv":
                            //case "constantvelocity": //匀速螺线 阿基米德螺线 渐开线
                            rn += r * (rRatioCycle.next() - 1);
                            break;
                        case "ac":
                            //加速螺旋 case "acceleration": 
                            rn = i === 0 ? r : i === 1 ? r * rRatioCycle.val() : rn * rRatioCycle.next();
                            break;
                        default:
                            if (_.isArray(rRatio)) {
                                //对称线
                                var len = rRatio.length;
                                rn = r * rRatio[i + 1 > len ? i % len : i];
                            } else {
                                rn = r * Math.pow(rRatio, i); //渐开线
                            }
                            break;
                    }

                    an = i * 360 / num + a;
                    vs[vs.length] = po.clone({
                        a: an,
                        r: rn
                    });
                }
                return vs;
            },
            //内接多边形 顶点
            invertices: function invertices(vs) {
                var vs = vs || this.vs,
                    len = vs.length;
                if (len < 2 || vs[0].dist(vs[1]) < 10) return false;
                return vs.map(function (t, i) {
                    return t.mid(vs[i + 1 < len ? i + 1 : 0]);
                });
            },
            regularVertices: function regularVertices(opt) {
                var num = opt.num,
                    po = this.po,
                    ia = 360 / num,
                    //夹角
                vs = [p];
                for (var i = 0; i < num; i++) {
                    vs[vs.length] = p = po.rotate(ia);
                }return vs;
            },
            //变形
            transform: function transform(opt) {
                return this.vs.map(function (t) {
                    return t.transform(opt);
                });
            },
            //可以改变   r a o，其他参数无效
            clone: function clone(opt) {
                return this.vs.map(function (t) {
                    return t.clone(opt);
                });
            },
            //旋转
            rotate: function rotate(a) {
                this.vs = this.vs.map(function (t) {
                    return t.rotate(a);
                });
                return this;
            },
            rotateXY: function rotateXY(a, b) {
                this.vs = this.vs.map(function (t) {
                    return t.rotateXY(a, b);
                });
                return this;
            },
            rotateX: function rotateX(a) {
                return this.rotateXY(a, 0);
            },
            rotateY: function rotateY(a) {
                return this.rotateXY(0, a);
            },
            add: function add(p) {
                this.vs = this.vs.map(function (t) {
                    return t.add(p);
                });
                return this;
            },
            //内切三角形  递归
            intriangle: function intriangle(vs) {
                var self = this,
                    vsGroup = [];
                (function _intriangle(vs) {
                    var vs2 = self.invertices(vs);
                    if (vs2) {
                        vsGroup.push(vs2);
                        vs.map(function (t, i) {
                            var vs3 = [t, vs2[i], vs2[i === 0 ? vs2.length - 1 : i - 1]];
                            _intriangle(vs3);
                        });
                    }
                })(vs);
                return vsGroup;
            },
            //螺旋
            spiral: function spiral(opt) {
                var po = this.po || this.centerPoint(opt),
                    vs = [po],
                    turns = opt.turns || 1,
                    r = opt.r;
                for (var i = 0; i < turns; i += 2) {
                    [[r * i, 0], [0, r * i], [-r * (i + 1), 0], [0, -r * (i + 1)]].forEach(function (t) {
                        vs.push(po.translateXY.apply(po, t));
                    });
                }
                return vs;
            }

        });
    }();

    //基础图形
    var _shape = _.shape = function () {
        function Shape(draw, opt) {
            if (!(this instanceof Shape)) return new Shape(draw, opt);
            if (draw) {
                this.draw = draw;
                this.canvas = draw.canvas;
                this.context = draw.context;
            }
            if (!opt) return;
            //图形合并
            [{
                k: "line",
                num: 2
            }, {
                k: "triangle",
                num: 3
            }, {
                k: "square",
                num: 4
            }].forEach(function (t) {
                if (t.k === opt.shape) {
                    opt.shape = "polygon";
                    opt.num = t.num;
                }
            });
            var shape = _.isUndefined(opt.shape) ? "polygon" : opt.shape,
                x = _.isUndefined(opt.x) ? this.canvas.width / 2 : opt.x,
                y = _.isUndefined(opt.y) ? this.canvas.height / 2 : opt.y,
                a = _.isUndefined(opt.a) ? 0 : opt.a;
            x += opt.offsetX || 0;
            y += opt.offsetY || 0;

            var opt = this.opt = _.clone(opt, {
                shape: shape,
                width: opt.r,
                height: opt.r,
                x: x,
                y: y,
                a: a
            });
            this.setup(opt);
        }
        return createClass(Shape, {
            setup: function setup(opt) {
                var opt = opt || this.opt,
                    shape = opt.shape;
                if (shape in this) {

                    if (opt.fractalMirror) return this.fractalMirror(opt);
                    if (opt.fractal) return this.fractal(opt);
                    if (opt.fractalIn) return this.fractalIn(opt);
                    //重新计算vs
                    this._vertex(opt);
                    if (opt.vertexRotate) return this.vertexRotate();
                    if (opt.vertexTransform) return this.vertexTransform();
                    return this[shape].call(this, opt);
                } else {
                    console.log(+"not support:" + shape);
                }
            },
            _vertex: function _vertex(opt) {
                var vertex = this.vertex = _.vertex(opt);
                this.vs = vertex.vs;
                this.po = vertex.po;
            },
            //计算量 计算量大，会致死锁，设置最大level5
            _calculatedAmount: function _calculatedAmount(opt) {
                var num = opt.num,
                    level = 5,
                    amount = 0;
                if (opt.fractal) {
                    while (level--) {
                        amount += Math.pow(num, level + 1);
                    }
                }
                return amount > 10000;
            },
            //分形 逐级缩小
            fractal: function fractal(opt) {
                var self = this;
                this.setup(_.clone(opt, {
                    fractal: false
                }));
                var fractalRatio = opt.fractalRatio || 0.618,
                    r = opt.r * fractalRatio; //ratio增大，计算量大，会致死锁，设置最大level5
                var minR = opt.minR || 5,
                    fractalLevel = opt.fractalLevel || 0,
                    maxLevel = _.isUndefined(opt.maxLevel) ? 5 : opt.maxLevel;
                fractalLevel++;
                var fractal = !(fractalLevel >= maxLevel || r < minR); // ? false : true;
                this.vs.forEach(function (t) {
                    var opt2 = _.clone(opt, {
                        x: t.x,
                        y: t.y,
                        r: r,
                        fractal: fractal,
                        fractalLevel: fractalLevel
                    });
                    self.setup(opt2);
                });
            },
            //分形  逐级放大
            fractalIn: function fractalIn(opt) {
                this.setup(_.clone(opt, {
                    fractalIn: false
                }));
                var fractalLevel = opt.fractalLevel || 0,
                    maxLevel = _.isUndefined(opt.maxLevel) ? 5 : opt.maxLevel;
                fractalLevel++;
                if (fractalLevel >= maxLevel) return;
                var vs = this.vs,
                    po = this.po;
                if (vs.length < 2) return;
                var v = vs[0].toV().add(vs[1].toV()); //计算上级r a，相连的向量和
                // var p = v.toP(po);
                var opt = _.clone(opt, {
                    r: v.abs(),
                    a: v.deg()
                }, {
                    fractalLevel: fractalLevel
                });
                this.setup(opt);
            },
            //顶点镜像分形
            fractalMirror: function fractalMirror(opt) {
                this.setup(_.clone(opt, {
                    fractalMirror: false
                }));
                var fractalLevel = opt.fractalLevel || 0,
                    maxLevel = _.isUndefined(opt.maxLevel) ? 5 : opt.maxLevel;
                fractalLevel++;
                if (fractalLevel >= maxLevel) return;
                var vertex = _.vertex(opt),
                    vs = vertex.vs,
                    po = vertex.po,
                    fractalRatio = opt.fractalRatio || 0.618,
                    minR = opt.minR || 5;
                vs.forEach(function (t, i) {
                    var o = po.mirror(t, fractalRatio);
                    if (o.r < minR) return;
                    var opt2 = _.clone(opt, {
                        r: o.r,
                        x: o.x,
                        y: o.y,
                        a: o.a + 180,
                        fractalLevel: fractalLevel
                    }); //,showMirror: showMirror
                    self.shape(opt2);
                });
            },
            color: function color(colorful) {
                if (colorful) {
                    var c = _color();
                    if (this.opt.fill) {
                        this.opt.color = c.rgba();
                    } else {
                        this.opt.color = c.rgb();
                    }
                }
                return this;
            },
            //平移
            // translate: function(x, y) {
            //     var opt = _.clone(this.opt, {
            //         x: this.opt.x + x,
            //         y: this.opt.y + y,
            //         offsetX: 0,
            //         offsetY: 0
            //     });
            //     return this.draw.shape(opt);
            // },
            // regularVertices: function(opt) {
            //     var p = _.point(opt)
            //     var num = opt.num;
            //     //夹角
            //     var ia = 360 / num;
            //     var vs = [p];
            //     for (var i = 0; i < num; i++) {
            //         vs.push(p = p.rotate(ia));
            //     }
            //     return vs;
            // },
            regularPolygon: function regularPolygon(opt) {
                var vs = _.vertex().regularVertices(opt);
                this.draw.link(vs, opt);
            },
            spiral: function spiral(opt) {
                var vs = _.vertex().spiral(opt);
                this.draw.link(vs, opt);
            },
            //斐波那契数列 螺旋
            fibonacci: function fibonacci(opt) {
                var num = opt.num,
                    fb = _.fibonacci(num),
                    sequence = opt.group.sequence,
                    clockwise = sequence === "clockwise",
                    ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r;
                this.draw.beginPath(opt);
                // var w = 2 * r;
                // ctx.beginPath();
                // ctx.beginPath();
                // ctx.moveTo(x, y);
                // ctx.lineTo(x + r, y);
                // //fb1
                // ctx.arc(x, y, r, 0, Math.PI * 2, true);
                // ctx.rect(x - r, y - r, w, w);
                // //fb3 1
                // ctx.rect(x + r, y - r, w, w);
                // ctx.arc(x + r, y - r, w, 0, Math.PI * 0.5, false); //顺时针
                // // ctx.arc(x+r,y-r,2*r,Math.PI * 1.5, Math.PI * 2,false);

                // //fb4 2
                // ctx.rect(x - r, y - r - 2 * w, 2 * w, 2 * w);
                // ctx.arc(x - r, y - r , 2 * w, Math.PI * 1.5, Math.PI * 2,false);
                // // ctx.arc(x-r,y-r,w,0, Math.PI * 0.5,false);//顺时针

                // // ctx.closePath();
                // this.render(opt);


                // 绘制曲线方法
                // @param prevR 这是斐波那契数列中前一位的数值，也就是上一截曲线的半径
                // @param n 这是斐波那契数列中的下标
                // @param r 这是斐波那契数列当前下标的值，也就是将画曲线的半径
                function _fibonacci(prevR, n, r) {
                    // var radius = r ; //r * 5
                    //五倍半径画，不然太小了

                    var startAngle = Math.PI,
                        endAngle = Math.PI * 0.5;
                    //每个半径只画1/4个圆，所以开始角度和结束角度刚好相差 1/4 * PI


                    //设置为逆时针方向画

                    //改变圆点坐标、开始角度和结束角度
                    //第三个元素的圆点坐标、开始角度和结束角度上面已经给出，所以从第四个元素开始改变圆点坐标、开始角度和结束角度，也就是从n > 2开始
                    if (n > 2) {
                        //下面坐标的改变可以参考上面的图和直接用canvas画的代码。
                        switch (n % 4) {
                            case 0:
                                x = x + prevR - r;
                                startAngle = 0;
                                endAngle = Math.PI * 1.5;
                                break;
                            case 1:
                                y = y - prevR + r;
                                startAngle = Math.PI * 1.5;
                                endAngle = Math.PI;
                                break;
                            case 2:
                                x = x - prevR + r;
                                startAngle = Math.PI;
                                endAngle = Math.PI * 0.5;
                                break;
                            case 3:
                                y = y + prevR - r;
                                startAngle = Math.PI * 0.5;
                                endAngle = 0;
                                break;
                        }
                    }
                    ctx.arc(x, y, r, startAngle, endAngle, true);
                    // ctx.rect(x-r, y-r, 2*r, 2*r);
                }

                for (var i = 0; i < fb.length; i++) {
                    //从第三个元素开始画，符合斐波那契数列的规律
                    if (i >= 2) {
                        _fibonacci(fb[i - 1], i, fb[i]);
                    }
                }

                this.draw.render(_.clone(opt, {
                    closed: false
                }));
                return this;
            },
            //螺旋
            // spiral: function(opt) {
            //     var ctx = this.context;
            //     var x = opt.x,
            //         y = opt.y,
            //         r = opt.r;
            //     ctx.beginPath();
            //     var r0 = 1;
            //     while (r0 < r) {
            //         r0 = r0 * 1.1
            //         ctx.arc(x, y, r0, r0, r0 + 1, true);
            //     }
            //     // ctx.closePath();
            //     this.render(opt);
            //     return this;
            // },
            //顶点
            vertices: function vertices(opt) {
                var self = this;
                this.vs.forEach(function (t) {
                    self.circle(_.clone(opt, {
                        x: t.x,
                        y: t.y,
                        r: 3,
                        text: ""
                    }));
                });

                //方法二
                // var shapeGroup = vs.map(function(t) {
                //     return {shape: _.clone(opt, { x: t.x, y: t.y, r: 3, text: "", shape: "circle" })}
                // })
                // this.draw.setup(shapeGroup)
            },
            //文本
            text: function text(opt) {
                var ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r || 12,
                    text = _.isUndefined(opt.text) ? opt.num : opt.text;
                ctx.fillStyle = opt.color || "#000";
                ctx.font = r + "px Verdana";
                var measure = ctx.measureText(text);
                ctx.fillText(text, x - measure.width / 2, y + r / 2);
            },
            //圆形
            circle: function circle(opt) {
                var ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r || 1,
                    sa = opt.sa || 0,
                    ea = opt.ea || Math.PI * 2;
                ctx.beginPath();
                ctx.arc(x, y, r, sa, ea, true);
                ctx.closePath();
                this.draw.fillstroke(opt);
                var text = opt.text;
                if (!_.isUndefined(text)) {
                    ctx.fillStyle = "#000";
                    ctx.font = "12px Verdana";
                    var measure = ctx.measureText(text);
                    ctx.fillText(text, x - measure.width / 2, y + r / 2);
                    // ctx.fillText(text, x - 4, y + 5);

                    // mPaint.setTextAlign(Paint.Align.CENTER);
                    // Paint.FontMetrics fm = mPaint.getFontMetrics();
                    // //假设已经计算出文字上下居中后Y轴的坐标为 ---> y;
                    // var textY = y + (fm.descent - fm.ascent) / 2 - fm.descent;
                    // canvas.drawText(text, X, textY, mPaint);
                }
                return this;
            },
            ball: function ball(opt) {
                var ctx = this.context;
                opt.fill = true;
                var x = opt.x,
                    y = opt.y,
                    r = opt.r;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.closePath();
                this.draw.fillstroke(opt);
            },
            //椭圆
            ellipse: function ellipse(opt) {
                var ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r,
                    a = opt.a || 2 * r,
                    b = opt.b || r;
                //选择a、b中的较大者作为arc方法的半径参数
                var r = a > b ? a : b;
                var ratioX = a / r; //横轴缩放比率
                var ratioY = b / r; //纵轴缩放比率
                ctx.scale(ratioX, ratioY); //进行缩放（均匀压缩）
                ctx.beginPath();
                //从椭圆的左端点开始逆时针绘制
                ctx.moveTo((x + a) / ratioX, y / ratioY);
                ctx.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
                ctx.closePath();
                this.draw.fillstroke(opt);
                return this;
            },
            //sector扇形
            sector: function sector(opt) {
                var ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r,
                    startAngle = opt.a,
                    endAngle,
                    anticlockwise = true; //逆时针方向
                if (anticlockwise) {
                    startAngle - Math.PI * 0.5;
                } else {
                    endAngle = startAngle + Math.PI * 0.5;
                }
                ctx.beginPath();
                ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
                ctx.closePath();
                this.draw.fillstroke(opt);
                return this;
            },
            //环形
            ring: function ring(opt) {
                var ctx = this.context,
                    x = opt.x,
                    y = opt.y,
                    r = opt.r,
                    r2 = r * opt.rRatio;
                this.draw.beginPath(opt);
                ctx.arc(x, y, r, 0, PIx2, false);
                ctx.moveTo(x + r2, y);
                ctx.arc(x, y, r2, PIx2, 0, true);
                this.draw.closePath(opt);
                this.draw.fillstroke(opt);

                // if (_.isObject(opt.group) && opt.group.group == "ring") {
                //     var shape = opt.shape.shape;
                //     this[shape] && this[shape](opt.shape)

                //     var r2 = opt.shape.r * opt.shape.rRatio;
                //     opt.shape = _.clone(opt.shape, { r: r2 });
                //     this[shape] && this[shape](opt)
                // } else {
                //     // var opt = this.default(opt.shape);
                //     // var c = this.central();
                //     ctx.beginPath();
                //     opt.r2 = opt.r * opt.rRatio;
                //     ctx.arc(opt.x, opt.y, opt.r, 0, PIx2, false);
                //     ctx.moveTo(opt.x + opt.r2, opt.y);
                //     ctx.arc(opt.x, opt.y, opt.r2, PIx2, 0, true);
                //     ctx.closePath();
                //     this.render(opt);
                // }
                return this;
            },
            //心形
            heart: function heart(opt) {
                var ctx = this.context;

                function heartPath(ctx) {
                    ctx.beginPath();
                    ctx.arc(-1, 0, 1, Math.PI, 0, false);
                    ctx.arc(1, 0, 1, Math.PI, 0, false);
                    ctx.bezierCurveTo(1.9, 1.2, 0.6, 1.6, 0, 3.0);
                    ctx.bezierCurveTo(-0.6, 1.6, -1.9, 1.2, -2, 0);
                    ctx.closePath();
                }
                var r = opt.r,
                    a = opt.a,
                    x = opt.x,
                    y = opt.y;
                // ctx.save();
                ctx.translate(x, y);
                ctx.rotate(_.rad(a));
                ctx.scale(r, r);
                heartPath(ctx);
                /*ctx.strokeStyle = "red"; ctx.lineWidth = "3px";*/
                // ctx.fillStyle = "red";
                // ctx.shadowColor = "gray";
                // ctx.shadowOffsetX = 5;
                // ctx.shadowOffsetY = 5;
                // ctx.shadowBlur = 5;
                // ctx.fill();
                this.draw.fillstroke(opt);
                // ctx.restore();
                return this;
            },
            //马蹄形 u形
            ushape: function ushape(opt) {},
            //v形
            vshape: function vshape(opt) {},
            //多边形
            polygon: function polygon(opt) {
                return this.draw.link(this.vs, opt);
            },
            //矩形
            rectangle: function rectangle(opt) {
                var ctx = this.context,
                    r = opt.r,
                    w = 2 * r * _.cos(45),
                    h = 2 * r * _.sin(45),
                    x = opt.x - w / 2,
                    y = opt.y - h / 2;
                this.draw.beginPath(opt);
                ctx.rect(x, y, w, h);
                this.draw.closePath(opt);
                this.draw.fillstroke(opt);
            },
            //菱形
            diamond: function diamond(opt) {
                opt.num = 4;
                if (_.isNumber(opt.rRatio)) {
                    opt.rRatio = [opt.rRatio, 1 / opt.rRatio];
                } else {
                    opt.rRatio = [0.5, 2];
                }
                opt.rRatioType = "ac";
                this.vs = _.vertex(opt).vs;
                return this.polygon(opt);
            },
            //星星
            star: function star(opt) {
                opt.shape = "star";
                this.vs = _.vertex(opt).vs;
                this.polygon(opt);
                return this;
            },
            //正五角星
            pentagram: function pentagram(opt) {
                var num = opt.num || 5,
                    //num of edge
                r = opt.r,
                    ratio = opt.ratio || 3 - 4 * Math.pow(_.sin(18), 2),
                    //正五角星2.61803
                vs = this.vs,
                    vs2 = [];
                for (var i = 0; i < num; i++) {
                    var p1 = vs[i];
                    var p2 = p1.clone({
                        a: p1.a + 180 / num,
                        r: r / ratio
                    });
                    vs2.push(p1);
                    vs2.push(p2);
                }
                return this.draw.link(vs2, opt);
            },
            //交叉线
            cross: function cross(opt) {
                var num = opt.num,
                    vsGroup = [],
                    vertex = this.vertex,
                    opt = _.clone(opt, {
                    num: opt.num * 2
                });
                // var vs = _.vertex(opt).vs; //改变num 需要重新计算
                var vs = vertex.vertices(opt);
                for (var i = 0; i < opt.num; i++) {
                    vsGroup.push([vs[i], vs[i + num]]);
                }return this.draw.linkGroup(vsGroup, opt);
            },
            //玫瑰花
            rose: function rose(opt) {
                var self = this,
                    vertex = this.vertex,
                    vs = vertex.vs,
                    vsGroup = [vs],
                    level = 0,
                    turns = opt.turns || 3;
                (function _rose(vs) {
                    if (level >= turns) return;
                    var r = opt.r / Math.pow(2, ++level);
                    var vs2 = vertex.clone({
                        r: r
                    });
                    vsGroup.push(vs2);
                    //断线
                    vs.map(function (t, i) {
                        var vs3 = [t, vs2[i + 1 === vs2.length ? 0 : i + 1]];
                        vsGroup.push(vs3);
                    });
                    _rose(vs2);
                })(vs);

                return self.draw.linkGroup(vsGroup, opt);
            },
            //太阳花
            sunflower: function sunflower(opt) {
                var interval = opt.interval || 2,
                    vsGroup = [],
                    vs = this.vs,
                    len = vs.length;
                for (var i = 0; i < len; i++) {
                    var vs2 = [];
                    vs2.push(vs[i]);
                    vs2.push(vs[(i + interval) % len]);
                    vsGroup.push(vs2);
                }
                return this.draw.linkGroup(vsGroup, opt);
            },
            //谢尔宾斯基三角形
            sierpinski: function sierpinski(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    vsGroup = [vs];
                //内切三角形
                (function _intriangle(vs) {
                    var vs2 = vertex.invertices(vs);
                    if (vs2) {
                        vsGroup.push(vs2);
                        vs.map(function (t, i) {
                            var vs3 = [t, vs2[i], vs2[i === 0 ? vs2.length - 1 : i - 1]];
                            _intriangle(vs3);
                        });
                    }
                })(vs);
                return this.draw.linkGroup(vsGroup, opt);
            },
            //谢尔宾斯基地毯
            carpet: function carpet(opt) {
                var self = this,
                    vertex = this.vertex,
                    vs = vertex.vs,
                    vsGroup = [vs],
                    num = opt.num;
                (function _carpet(opt) {
                    var r = opt.r;
                    if (r < 5) return;
                    var vertex = _.vertex(opt);
                    var r2 = r / 3;
                    var vs2 = vertex.clone({
                        r: r2
                    });
                    vsGroup.push(vs2);
                    var r3 = r * 2 / 3;
                    var vs3 = vertex.clone({
                        r: r3
                    });
                    var vs4 = [],
                        len = vs3.length;
                    vs3.forEach(function (t, i) {
                        vs4.push(t);
                        vs4.push(t.mid(vs3[i + 1 === len ? 0 : i + 1]));
                    });
                    vs4.forEach(function (t) {
                        var opt2 = _.clone(opt, {
                            r: r2,
                            x: t.x,
                            y: t.y
                        });
                        _carpet(opt2);
                    });
                })(opt);
                return self.draw.linkGroup(vsGroup, opt);
            },

            //内切 多边形
            inpolygon: function inpolygon(opt) {
                var self = this,
                    vertex = this.vertex,
                    vs = vertex.vs,
                    vsGroup = [vs];
                (function _inpolygon(vs) {
                    var vs2 = vertex.invertices(vs);
                    if (vs2) {
                        vsGroup.push(vs2);
                        _inpolygon(vs2);
                    }
                })(vs);
                return self.draw.linkGroup(vsGroup, opt);
            },
            //轴对称
            axialMirror: function axialMirror(opt) {
                var self = this,
                    vertex = this.vertex,
                    vs = vertex.vs,
                    po = vertex.po,
                    vsGroup = [vs],
                    a = opt.a,
                    num = opt.num,
                    r = opt.r,
                    an,
                    rn = 2 * r * _.cos(180 / num);
                vs.forEach(function (t, i) {
                    var p = po.clone({
                        a: t.a + 180 / num,
                        r: rn
                    });
                    var vs2 = vertex.clone({
                        o: {
                            x: p.x,
                            y: p.y
                        }
                    });
                    vsGroup.push(vs2);
                });
                return this.draw.linkGroup(vsGroup, opt);
            },
            //蜂巢
            comb: function comb(opt) {
                var self = this,
                    vsGroup = [];
                opt.num = 6;
                var vertex = this.vertex,
                    vs = vertex.vs,
                    po = vertex.po;
                vsGroup.push(vs);
                var a = opt.a,
                    num = opt.num,
                    r = opt.r;
                var _comb1 = function _comb1(n) {
                    var rn = 2 * n * r * _.cos(180 / num);
                    vs.forEach(function (t, i) {
                        var p = po.clone({
                            a: t.a + 180 / num,
                            r: rn
                        });
                        var vs2 = vertex.clone({
                            o: {
                                x: p.x,
                                y: p.y
                            }
                        });
                        vsGroup.push(vs2);
                    });
                };
                var _comb2 = function _comb2(n) {
                    var rn = 2 * n * r + r; //3 * r 
                    vs.forEach(function (t, i) {

                        var p = po.clone({
                            a: t.a,
                            r: rn
                        });
                        var vs2 = vertex.clone({
                            o: {
                                x: p.x,
                                y: p.y
                            }
                        });
                        vsGroup.push(vs2);
                    });
                };
                [1, 2, 3].forEach(function (n) {
                    _comb1(n);
                    _comb2(n);
                });

                return this.draw.linkGroup(vsGroup, opt);
            },
            // 勒洛三角形  reuleaux triangle
            reuleaux: function reuleaux(opt) {
                var self = this,
                    vertex = this.vertex,
                    vs = vertex.vs;
                this.draw.link(vs, opt);
                //边长
                var r = 2 * opt.r * _.sin(180 / opt.num);
                vs.forEach(function (t) {
                    self.circle(_.clone(opt, {
                        x: t.x,
                        y: t.y,
                        r: r,
                        text: ""
                    }));
                });
            },
            //佛珠
            beads: function beads(opt) {
                var self = this,
                    vs = this.vs,
                    len = vs.length,
                    r = opt.r * _.sin(180 / opt.num);
                vs.forEach(function (t, i) {
                    var p = t.mid(vs[i + 1 < len ? i + 1 : 0]);
                    self.circle(_.clone(opt, {
                        x: p.x,
                        y: p.y,
                        r: r,
                        text: ""
                    }));
                });
                this.draw.link(vs, opt);
            },
            // 科赫曲线  雪花曲线 todo
            kohn: function kohn(opt) {
                var self = this;
                var vs = this.vs;
                // return this.draw.link(vs, opt)

                var _kohn = function _kohn(p, p1) {
                    var ps = p.split(p1, 2);
                    var d = ps[0].dist(ps[1]) / Math.sqrt(2);
                    var m = ps[0].mid(ps[1]);
                    var p2 = m.vertical(ps[1], d);
                    ps.splice(1, 0, p2);
                    var ps2 = [p].concat(ps);
                    ps2.push(p1);
                    // return ps2;
                    if (d < 10) {
                        return ps2;
                    }

                    var ps3 = [];
                    var len = ps2.length;

                    ps2.forEach(function (t, i) {
                        if (i + 1 < len) {
                            var ps = _kohn(t, ps2[i + 1]);
                            if (i === len - 2) {
                                ps3 = ps3.concat(ps);
                            } else {
                                ps3 = ps3.concat(ps.slice(0, ps.length - 1));
                            }
                        }
                    });
                    return ps3;
                };

                // var vs2 = _kohn(vs[0], vs[1]);
                // var vs2=[];
                var vsGroup = [];
                var len = vs.length;
                vs.forEach(function (t, i) {
                    // if (i + 1 < vs.length) {
                    var t2 = vs[i + 1 === len ? 0 : i + 1];
                    vsGroup.push(_kohn(t, t2));
                    // self.draw.point({
                    //     x: t.x,
                    //     y: t.y,
                    //     text: i
                    // })
                    // self.draw.link(_kohn(t, t2), opt)
                    // }
                });
                this.draw.linkGroup(vsGroup, opt);
            },
            //等角射线
            ray: function ray(opt) {
                var vs = this.vs,
                    len = vs.length,
                    po = this.po,
                    vsGroup = [];
                if (opt.fillInterval) {
                    for (var i = 0; i < len; i += 2) {
                        vsGroup.push([po, vs[i], vs[i + 1 === len ? 0 : i + 1]]);
                    }
                } else {
                    vsGroup = vs.map(function (v, i) {
                        return [po, v];
                    });
                    opt.fill && vsGroup.push(vs);
                }
                return this.draw.linkGroup(vsGroup, opt);
            },
            //射线分形
            rayFractal: function rayFractal(opt) {
                var self = this,
                    vertex = _.vertex(opt),
                    vs = vertex.vs,
                    len = vs.length,
                    po = vertex.po,
                    vsGroup = [];
                var _ray = function _ray(opt) {
                    var vertex = _.vertex(opt),
                        vs = vertex.vs,
                        len = vs.length,
                        po = vertex.po,
                        vsGroup = [];
                    if (opt.fillInterval) {
                        for (var i = 0; i < len; i += 2) {
                            vsGroup.push([po, vs[i], vs[i + 1 === len ? 0 : i + 1]]);
                        }
                    } else {
                        vs.forEach(function (v, i) {
                            vsGroup.push([po, v]);
                        });
                        opt.fill && vsGroup.push(vs);
                    }
                    self.draw.linkGroup(vsGroup, opt);
                };
                vs.forEach(function (t) {
                    _ray(_.clone(opt, {
                        x: t.x,
                        y: t.y
                    }));
                });
            },

            //一笔画 画饼
            pie: function pie(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    len = vs.length,
                    po = this.po,
                    ctx = this.context;
                ctx.beginPath();
                var n = 2;
                vs.forEach(function (t, i) {
                    // if (opt.showVertices)
                    //     ctx.fillText('' + i, t.x, t.y); //+':'+parseInt(t.a)
                    var t1 = vs[i + n - 1 >= len ? i + n - 1 - len : i + n - 1];
                    if (i % n === 0) ctx.arc(po.x, po.y, opt.r, _.rad(t1.a), _.rad(t.a), true);
                });
                ctx.closePath();
                this.draw.render(opt, vs);
            },
            //太阳
            sun: function sun(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    len = vs.length,
                    po = vertex.po;
                if (len < 3) return;
                var vs2 = vs.map(function (t, i) {
                    var t2 = vs[i + 1 === len ? 0 : i + 1];
                    return t.toV().add(t2.toV()).toP(po);
                });
                var vs3 = [];
                vs.forEach(function (t, i) {
                    vs3.push(t);
                    vs3.push(vs2[i]);
                });
                this.draw.link(vs.concat(vs3), opt);
            },
            //风车
            windmill: function windmill(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    len = vs.length,
                    po = vertex.po;
                if (len < 3) return;
                var vs2 = vs.map(function (t, i) {
                    var t2, t3;
                    if (i + 1 === len) {
                        t2 = vs[0];
                        t3 = vs[1];
                    } else if (i + 2 === len) {
                        t2 = vs[i + 1];
                        t3 = vs[0];
                    } else {
                        t2 = vs[i + 1];
                        t3 = vs[i + 2];
                    }
                    return t.toV(t2).add(t.toV(t3)).toP(t);
                });
                var vs3 = [];
                vs.forEach(function (t, i) {
                    vs3.push(t);
                    vs3.push(vs2[i]);
                });
                this.draw.link(vs.concat(vs3), opt);
                //分形放大
                // opt.level=_.isUndefined(opt.level)?1:opt.level;
                // opt.level++;
                // if (opt.level > 5) return;
                // this.setup(_.clone(opt, v.toP()))
            },
            //曲线转角
            cornercurve: function cornercurve(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    len = vs.length,
                    ctx = this.context;
                ctx.beginPath();
                var ms = vs.map(function (t, i) {
                    var t1 = vs[i + 1 === len ? 0 : i + 1];
                    return t.mid(t1);
                });
                ms.forEach(function (t, i) {
                    var t1 = ms[i + 1 === len ? 0 : i + 1];
                    var p = vs[i + 1 === len ? 0 : i + 1];
                    ctx.moveTo(t.x, t.y);
                    ctx.quadraticCurveTo(p.x, p.y, t1.x, t1.y);
                });
                this.draw.render(opt, vs);
            },
            //爆炸曲线
            bomb: function bomb(opt) {
                var vertex = this.vertex,
                    vs = vertex.vs,
                    po = vertex.po,
                    len = vs.length,
                    ctx = this.context,
                    color = opt.color;

                ctx.beginPath();
                vs.forEach(function (t, i) {
                    var t1 = vs[i + 1 === len ? 0 : i + 1];
                    ctx.moveTo(t.x, t.y);
                    ctx.quadraticCurveTo(po.x, po.y, t1.x, t1.y);
                });
                this.draw.setStrokeStyle(ctx, color);
                ctx.stroke();
            }
        });
    }();

    //图形组合
    var _shapeGroup = _.group = function () {
        function ShapeGroup(draw, opt) {
            if (!(this instanceof ShapeGroup)) return new ShapeGroup(draw, opt);
            this.draw = draw;
            this.context = draw.context;
            this.canvas = draw.canvas;

            var r = opt.shape.r,
                colorful = opt.group.colorful,
                x = _.isUndefined(opt.group.x) ? this.canvas.width / 2 : opt.group.x,
                y = _.isUndefined(opt.group.y) ? this.canvas.height / 2 : opt.group.y,
                sr = r,
                width = r,
                height = r;

            if (opt.group) {
                if (!!~["mirror", "surround"].indexOf(opt.group.group)) {
                    width = opt.group.sr + r;
                    height = opt.group.sr + r;
                }
            }

            if (_.isUndefined(opt.group.a)) opt.group.a = 0;
            var colorArr = [],
                interval = opt.group.interval || 1,
                co = _.color(),
                len = opt.group.num || 360 / interval; //_.max(360 / interval, opt.group.num);

            switch (colorful) {
                case "circle":
                    //色相环
                    colorArr = _.color.circle(len);
                    break;
                case "gradient":
                    //渐变色
                    colorArr = _.color.tween(co.light(), co.dark(), len);
                    break;
                case "singleGradient":
                    //单色渐变
                    colorArr = _.color.tween(co.dark(), "#ffffff", len);
                    break;
                case "random":
                    //随机
                    for (var i = 0; i < len; i++) {
                        colorArr[colorArr.length] = _.color().hex();
                    }break;
                case "solid":
                    //单色
                    break;
                default:
                    break;
            }
            opt.group = _.clone(opt.group, {
                width: width,
                height: height,
                x: x,
                y: y,
                colorArr: colorArr
            });
            this.opt = opt;
            this.setup();
        }
        return createClass(ShapeGroup, {
            //图形
            shape: function shape(optShape) {
                return this.draw.shape(optShape);
            },
            color: function color(opt) {
                var colorful = opt.group.colorful,
                    fill = opt.shape.fill,
                    opt2 = {};
                if (colorful) opt2.color = _.color().rgb(); // fill ? _.color().rgba() : _.color().rgb();
                return opt2;
            },
            setup: function setup(opt) {
                var opt = opt || this.opt;
                if (opt.group) {
                    //重新计算vs
                    var vertex = this.vertex = _.vertex(opt.group);
                    this.vs = vertex.vs;
                    this.po = vertex.po;
                    return this.groups = this[opt.group.group](opt);
                } else {
                    return this.shape(opt.shape);
                }
            },
            //多边形
            polygon: function polygon(opt, vs) {
                var self = this,
                    groups = vs || this.vs,
                    po = this.po,
                    len = groups.length,
                    vertex = _.vertex(opt.shape),
                    a = opt.shape.a || 0,
                    //初始角
                vsGroup = [],
                    seq = opt.group.sequence; //顺时针逆时针
                switch (seq) {
                    case "clockwise":
                        break;
                    case "anticlockwise":
                        groups.reverse();
                        break;
                    case "shuffle":
                        groups.shuffle();
                        break;
                }
                return groups.map(function (t, i) {
                    opt.shape = _.clone(opt.shape, {
                        x: t.x,
                        y: t.y,
                        easing: false
                    });
                    if (opt.group.colorful !== "solid") {
                        var groupColor = opt.group.colorArr[i];
                        opt.shape = _.clone(opt.shape, {
                            color: groupColor,
                            lineColor: groupColor,
                            fillColor: groupColor
                        });
                    }
                    if (opt.group.rotation) {
                        //自转
                        opt.shape = _.clone(opt.shape, {
                            a: (a + i * 360 / len) % 360
                        });
                    }
                    var drawShape, vs;
                    if (opt.group.animate && opt.group.easing === "none") {
                        //动画
                        opt.shape.delay = i === 0 ? false : opt.group.animationInterval; //true
                        drawShape = self.shape(opt.shape);
                        vs = vertex.clone({
                            o: {
                                x: t.x,
                                y: t.y
                            }
                        });
                    } else {
                        drawShape = self.shape(opt.shape);
                        vs = drawShape.vs;
                    }

                    //半径
                    if (opt.group.showRadius) self.draw.link([po, t], opt.group);

                    //中心相连
                    if (opt.group.link) for (var j = i; j < len - 1; j++) {
                        self.draw.link([t, groups[j + 1]], opt.group);
                    } //相邻连线 neighbor
                    if (opt.group.neighborLink) self.draw.link([t, groups[i + 1 === len ? 0 : i + 1]]);

                    //顶点相连
                    if (opt.group.vertexLink) {
                        var vs0, vs2;
                        if (i === 0) {
                            vsGroup.push(vs);
                        } else if (i + 1 < len) {
                            vs2 = vsGroup.pop();
                            vs.forEach(function (t, i) {
                                self.draw.link([t, vs2[i]], opt.group);
                            });
                        } else if (i + 1 === len) {
                            vsGroup.forEach(function (t2) {
                                vs.forEach(function (t, i) {
                                    self.draw.link([t, t2[i]], opt.group);
                                });
                            });
                        }
                        vsGroup.push(vs);
                    };
                    //显示圆心编号
                    opt.group.identifierCenter && self.draw.point({
                        x: t.x,
                        y: t.y,
                        text: i
                    });

                    //锥线
                    opt.group.conic && vs.forEach(function (t) {
                        self.draw.link([po, t], opt.group);
                    });

                    return drawShape;
                });
            },
            //九宫格
            sudoku: function sudoku(opt) {
                var vertex = _.vertex(_.clone(opt.group, {
                    num: 8,
                    rRatio: [1, Math.sqrt(2)],
                    rRatioType: "default"
                })),
                    vs = [vertex.po].concat(vertex.vs);
                // vs.forEach(function(t,i){
                //     self.draw.point({x:t.x,y:t.y,r:3,text:i})
                // })
                opt.group.rotation = false;
                return this.polygon(opt, vs);
            },
            //分形
            fractal: function fractal(opt) {
                var self = this,
                    po = {
                    x: opt.group.x,
                    y: opt.group.y
                },
                    vertex = _.vertex(_.clone(opt.shape, po)),
                    vs = vertex.vs; //组合顶点
                vs.forEach(function (t) {
                    opt.shape = _.clone(opt.shape, {
                        x: t.x,
                        y: t.y
                    });
                    self.shape(opt.shape);
                });
            },
            // 锥形
            cone: function cone(opt) {
                var self = this,
                    groups = this.vs,
                    po = this.po,
                    len = groups.length,
                    vsGroup = [];
                groups.forEach(function (t) {
                    opt.shape = _.clone(opt.shape, {
                        x: t.x,
                        y: t.y
                    });
                    var drawShape = self.shape(opt.shape);
                    var vs = drawShape.vs;
                    vs.forEach(function (s) {
                        vsGroup.push([s, po]);
                    });
                });
                this.draw.linkGroup(vsGroup, opt.shape);
            },
            //柱形
            pillar: function pillar(opt) {
                opt.group.num = 2;
                opt.group.vertexLink = true;
                var vertex = this.vertex = _.vertex(opt.group);
                this.vs = vertex.vs;
                this.po = vertex.po;
                return this.polygon(opt);
            },
            //环形
            ring: function ring(opt) {
                this.shape(opt.shape);
                var r2 = opt.shape.r * 0.618; //opt.shape.rRatio;
                // opt.shape = _.clone(opt.shape, { r: r2 });
                this.shape(_.clone(opt.shape, {
                    r: r2
                }));
                // this.draw.shape(opt.shape);
                // this[shape] && this[shape](opt)


                // if (_.isObject(opt.group) && opt.group.group == "ring") {
                //     var shape = opt.shape.shape;
                //     this[shape] && this[shape](opt.shape)

                //     var r2 = opt.shape.r * opt.shape.rRatio;
                //     opt.shape = _.clone(opt.shape, { r: r2 });
                //     this[shape] && this[shape](opt)
                // } else {
                //     var opt = this.default(opt.shape);
                //     // var c = this.central();
                //     ctx.beginPath();
                //     opt.r2 = opt.r * opt.rRatio;
                //     ctx.arc(opt.x, opt.y, opt.r, 0, PIx2, false);
                //     ctx.moveTo(opt.x + opt.r2, opt.y);
                //     ctx.arc(opt.x, opt.y, opt.r2, PIx2, 0, true);
                //     ctx.closePath();
                //     this.render(opt);
                // }
                return this;
            },

            //环绕  回旋
            // 公转: revolution 自转: rotation
            surround: function surround(opt) {
                var self = this,
                    r = opt.shape.r,
                    rotation = opt.group.rotation,
                    //自转
                interval = opt.group.interval || 1,
                    //间隔
                spiral = opt.group.spiral,
                    //螺旋
                x = opt.group.x,
                    y = opt.group.y,
                    gr = opt.group.r; //环绕半径
                if (_.isUndefined(gr)) {
                    gr = r;
                    r = r / 3;
                }
                // var clockwise = opt.group.clockwise; //顺时针逆时针
                var sequence = opt.group.sequence,
                    clockwise = sequence === "clockwise",
                    sAngle,
                    eAngle,
                    sa = opt.group.a || 0;
                if (clockwise) {
                    sAngle = sa + 360;
                    eAngle = sa; //0;
                    if (spiral) sAngle = sAngle * spiral;
                } else {
                    sAngle = sa; //0;
                    eAngle = sa + 360;
                    if (spiral) eAngle = eAngle * spiral;
                }
                var a = sAngle,
                    animationInterval = opt.group.animationInterval || 5,
                    index = 0;
                (function _surround() {
                    if (r < 5) return;
                    if (clockwise) {
                        if (a <= eAngle) return;
                        a -= interval;
                        if (spiral) r = r * a / 360 / spiral; //回旋
                    } else {
                        if (a >= eAngle) return;
                        a += interval;
                        if (spiral) r = r * (eAngle - a) / 360 / spiral; //回旋
                    }
                    if (rotation) opt.shape.a = a; //自转
                    var opt2 = {
                        x: x + gr * _.sin(a),
                        y: y + gr * _.cos(a),
                        r: r
                        //颜色
                    };if (opt.group.colorArr.length > index) opt2.color = opt.group.colorArr[index++];

                    opt.shape = _.clone(opt.shape, opt2);

                    self.shape(opt.shape);
                    //显示半径
                    opt.group.showRadius && self.draw.link([{
                        x: x,
                        y: y
                    }, {
                        x: opt.shape.x,
                        y: opt.shape.y
                    }]);
                    //动画
                    opt.group.animate ? setTimeout(_surround, animationInterval) : _surround();
                })();
                //显示圆心
                if (opt.group.showCenter) {
                    self.draw.shape({
                        shape: "circle",
                        r: 3,
                        x: x,
                        y: y,
                        color: opt.group.colorArr[0], //_.rgb(),
                        fill: true
                    });
                }
                return self;
            },
            //同心
            concentric: function concentric(opt) {
                var self = this,
                    r = opt.shape.r,
                    interval = opt.group.interval || 1,
                    animationInterval = opt.group.animationInterval || 5;
                (function _concentric() {
                    if (r <= 0) return;
                    opt.shape = _.clone(opt.shape, self.color(opt), {
                        r: r
                    });
                    self.shape(opt.shape);
                    r = r - interval;
                    if (opt.group.animate) {
                        setTimeout(_concentric, animationInterval);
                    } else {
                        _concentric();
                    }
                })();
                return self;
            },
            //外切圆
            excircle: function excircle(opt) {
                this.shape(opt.shape);
                opt.shape = _.clone(opt.shape, {
                    shape: "circle",
                    text: ""
                });
                this.shape(opt.shape);
                return this;
            },
            //平铺
            repeat: function repeat(opt) {
                var self = this,
                    canvas = this.canvas,
                    w = canvas.width,
                    h = canvas.height,
                    r = opt.group.interval || opt.shape.r,
                    //间距
                mx = w % r,
                    my = h % r,
                    animate = opt.group.animate,
                    animationInterval = opt.group.animationInterval || 5,
                    sequence = opt.group.sequence,
                    clockwise = sequence === "clockwise",
                    rotation = opt.group.rotation,
                    //自转
                sa = opt.group.a || 0,
                    top = r + my / 2,
                    left = r + mx / 2,
                    right = w - r - mx / 2;
                opt.shape.y = top;
                if (clockwise) {
                    opt.shape.x = left;
                } else {
                    opt.shape.x = right;
                }
                if (rotation) {
                    //自转
                    opt.shape.a = sa;
                }
                var index = 0;
                (function _repeat() {
                    if (clockwise) {
                        if (opt.shape.x > w) {
                            return;
                        }
                        if (opt.shape.y > h) {
                            opt.shape.y = top;
                            opt.shape.x += 2 * r;
                        }
                    } else {
                        if (opt.shape.x < r) {
                            return;
                        }
                        if (opt.shape.y > h) {
                            opt.shape.y = top;
                            opt.shape.x -= 2 * r;
                        }
                    }
                    if (opt.group.colorArr.length > index) {
                        opt.shape.color = opt.group.colorArr[index++];
                    }
                    opt.shape = _.clone(opt.shape);
                    self.shape.call(self, opt.shape);
                    opt.shape.y += 2 * r;
                    if (animate) {
                        setTimeout(_repeat, animationInterval);
                    } else {
                        _repeat();
                    }
                })();
                return self;
            }

            // repeatX: function(opt) {
            //     opt.group.repeatX = true;
            //     repeat(opt)
            //     // var self = this;
            //     // var opt = this.default(opt);
            //     // var canvas = this.canvas;
            //     // var w = canvas.width,
            //     //     h = canvas.height;
            //     // var shape = opt.shape;
            //     // var r = opt.interval || opt.r; //间距
            //     // var mx = w % r;
            //     // opt.x = r + mx / 2;
            //     // while (opt.x < w) {
            //     //     // shape && self[shape].call(self, opt);
            //     //     this.shape(opt);
            //     //     opt.x += 2 * r;
            //     // }
            // },
            // repeatY: function(opt) {
            //     opt.group.repeatY = true;
            //     repeat(opt)
            //     // var self = this;
            //     // var opt = this.default(opt);
            //     // var canvas = this.canvas;
            //     // var w = canvas.width,
            //     //     h = canvas.height;
            //     // var shape = opt.shape;
            //     // var r = opt.interval || opt.r; //间距
            //     // var my = h % r;
            //     // opt.y = r + my / 2;
            //     // while (opt.y < h) {
            //     //     // shape && self[shape].call(self, opt);
            //     //     this.shape(opt);
            //     //     opt.y += 2 * r;
            //     // }
            // },
        });
    }();

    //运动
    //rotate move zoom  gravitate  jiggle  float circle ellips
    //组合运动 rotate_zoom
    var _motion = _.motion = function () {

        function Motion(draw, opt) {
            if (!(this instanceof Motion)) return new Motion(draw, opt);
            var self = this;
            this.draw = draw;
            this.motion = opt.motion.motion || "move";
            this.link = opt.motion.link;
            this.shadow = opt.motion.shadow;

            var speed = opt.motion.speed || 1,
                zoomSpeed = opt.motion.zoomSpeed || 1,
                num = opt.motion.num || 1,
                colorful = opt.motion.colorful,
                bounce = opt.motion.bounce,
                click = opt.motion.click,
                width = this.draw.width,
                height = this.draw.height;

            this.groups = [];
            this.a = 0;
            this.r = opt.motion.r || 100;
            //中心点
            this.centerX = width / 2;
            this.centerY = height / 2;
            var follow = _.isUndefined(opt.motion.follow) ? true : opt.motion.follow;

            //速度随机
            var _randomV = function _randomV(t) {
                return _.clone(t, {
                    vx: (Math.random() * 2 - 1) * speed,
                    vy: (Math.random() * 2 - 1) * speed,
                    bounce: bounce,
                    speed: speed,
                    zoomState: "in",
                    followSpeed: 0.01 + Math.random() * 0.04,
                    follow: follow,
                    click: click,
                    mass: t.r * t.r,
                    //range
                    top: 0,
                    left: 0,
                    right: width,
                    bottom: height,
                    animate: false,
                    lightState: 1,
                    zoomSpeed: zoomSpeed
                });
            };

            if (_.isArray(opt.shape)) {
                opt.shape.forEach(function (t) {
                    t = _randomV(t);
                    var item = draw.shape(t);
                    item.color(colorful);
                    this.groups[this.groups.length] = item;
                });
            } else {
                for (var i = 0; i < num; i++) {
                    opt.id = i;
                    var t;
                    if (opt.group) {
                        opt.group = _randomV(opt.group);
                        t = draw.group(opt);
                    } else {
                        opt.shape = _randomV(opt.shape);
                        t = draw.shape(opt.shape);
                        t.color(colorful);
                    }
                    this.groups[this.groups.length] = t;
                };
            }
            this.len = this.groups.length;
            // this.setup();
            this.animate = _.animate(self.setup.bind(self));
        }
        return createClass(Motion, {
            setup: function setup() {
                var self = this,
                    vsGroup = [],
                    groups = self.groups,
                    len = groups.length,
                    motion = self.motion;
                self.shadow ? self.draw.shadow() : self.draw.clear();

                groups.forEach(function (t, i) {
                    var opt = t.opt.group || t.opt;
                    motion.split("_").forEach(function (m) {
                        self[m] && self[m](opt);
                        self.follow(opt);
                    });
                    t.setup && t.setup();

                    if (self.link) {
                        //连接线，相互连接
                        for (var j = i; j < len - 1; j++) {
                            var t2 = groups[j + 1];
                            var vs = t.opt.group ? [t.opt.group, t2.opt.group] : [t.opt, t2.opt];
                            self.draw.link(vs);
                            // self.collide(t.opt,t2.opt);
                            //碰撞
                        }
                    }
                });
                self.draw.canvas.callback && self.draw.canvas.callback.call(self.draw.context, self.draw.context);
            },
            //停止
            stop: function stop() {
                this.animate && this.animate.stop();
            },
            //移动跟随 followmove
            follow: function follow(opt) {
                var mouse = this.draw.mouse;
                //移动中心点
                if (!!~["circle", "ellipse"].indexOf(this.motion)) {
                    //"spiral",
                    var self = this;
                    if (opt.follow && mouse) {
                        //移动跟随 
                        var dx = mouse.x - self.centerX;
                        var dy = mouse.y - self.centerY;
                        self.centerX += dx * opt.followSpeed;
                        self.centerY += dy * opt.followSpeed;
                    } else if (opt.click && mouse) {
                        //点击重绘
                        self.centerX = mouse.x;
                        self.centerY = mouse.y;
                    }
                } else {
                    if (opt.follow && mouse) {
                        var dx = mouse.x - opt.x;
                        var dy = mouse.y - opt.y;
                        opt.x += dx * opt.followSpeed;
                        opt.y += dy * opt.followSpeed;
                    } else if (opt.click && mouse) {
                        opt.x = mouse.x;
                        opt.y = mouse.y;
                    }
                }
            },
            //移动
            move: function move(opt) {
                opt.x += opt.vx || 1;
                opt.y += opt.vy || 1;
                this.bounce(opt);
            },
            //正弦函数运动公式 y = sin(x)
            sineMove: function sineMove(opt) {
                var self = this;
                opt.x += opt.vx > 0 ? 1 : -1;
                opt.y += _.sin(self.a) * self.r * (opt.vy > 0 ? 1 : -1);
                self.a += opt.speed;
                this.bounce(opt);
            },
            //反弹
            bounce: function bounce(opt) {
                if (opt.bounce) {
                    //碰壁反射 
                    if (opt.x < opt.left + opt.width) {
                        //碰到左边的边界
                        opt.x = opt.width;
                        opt.vx = -opt.vx;
                    } else if (opt.y < opt.top + opt.height) {
                        opt.y = opt.height;
                        opt.vy = -opt.vy;
                    } else if (opt.x > opt.right - opt.width) {
                        opt.x = opt.right - opt.width;
                        opt.vx = -opt.vx;
                    } else if (opt.y > opt.bottom - opt.height) {
                        opt.y = opt.bottom - opt.height;
                        opt.vy = -opt.vy;
                    }
                } else {
                    //左出右进  左进右出
                    if (opt.vx < 0 && opt.x < opt.left - opt.width) {
                        //碰到左边的边界
                        opt.x = opt.right + opt.r;
                    } else if (opt.vy < 0 && opt.y < opt.top - opt.height) {
                        opt.y = opt.bottom + opt.r;
                    } else if (opt.vx > 0 && opt.x > opt.right + opt.width) {
                        opt.x = opt.left - opt.r;
                    } else if (opt.vy > 0 && opt.y > opt.bottom + opt.height) {
                        opt.y = opt.top - opt.r;
                    }
                }
            },
            //碰撞
            collide: function collide(opt1, opt2) {
                var dx = opt1.x - opt2.x,
                    dy = opt1.y - opt2.y,
                    dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < opt2.r + opt1.r) {
                    //calculate angle, sine, and cosine
                    var angle = Math.atan2(dy, dx),
                        sin = Math.sin(angle),
                        cos = Math.cos(angle),

                    //rotate opt2's position
                    x0 = 0,
                        y0 = 0,

                    //rotate opt1's position
                    x1 = dx * cos + dy * sin,
                        y1 = dy * cos - dx * sin,

                    //rotate opt2's velocity
                    vx0 = opt2.vx * cos + opt2.vy * sin,
                        vy0 = opt2.vy * cos - opt2.vx * sin,

                    //rotate opt1's velocity
                    vx1 = opt1.vx * cos + opt1.vy * sin,
                        vy1 = opt1.vy * cos - opt1.vx * sin,

                    //collision reaction
                    vxTotal = vx0 - vx1;

                    vx0 = ((opt2.mass - opt1.mass) * vx0 + 2 * opt1.mass * vx1) / (opt2.mass + opt1.mass);
                    vx1 = vxTotal + vx0;
                    x0 += vx0;
                    x1 += vx1;
                    //rotate positions back
                    var x0Final = x0 * cos - y0 * sin,
                        y0Final = y0 * cos + x0 * sin,
                        x1Final = x1 * cos - y1 * sin,
                        y1Final = y1 * cos + x1 * sin;
                    //adjust positions to actual screen positions
                    opt1.x = opt2.x + x1Final;
                    opt1.y = opt2.y + y1Final;
                    opt2.x = opt2.x + x0Final;
                    opt2.y = opt2.y + y0Final;
                    //rotate velocities back
                    opt2.vx = vx0 * cos - vy0 * sin;
                    opt2.vy = vy0 * cos + vx0 * sin;
                    opt1.vx = vx1 * cos - vy1 * sin;
                    opt1.vy = vy1 * cos + vx1 * sin;
                }
            },
            //变形
            transform: function transform(opt) {
                opt.num += opt.speed;
            },
            //旋转
            rotate: function rotate(opt) {
                opt.a += opt.speed;
            },
            //飘忽不定
            jiggle: function jiggle(opt) {
                opt.x += Math.random() * 2 - 1;
                opt.y += Math.random() * 2 - 1;
                this.bounce(opt);
            },
            //漂浮
            float: function float(opt) {
                // 负相关
                var deta = Math.random() * 2 - 1;
                opt.vx += deta;
                opt.vy -= deta;
                opt.x += opt.vx || 1;
                opt.y += opt.vy || 1;
                this.bounce(opt);
            },
            //曲线
            curve: function curve(opt) {
                opt.x += opt.vx || 1;
                opt.y += opt.vy || 1;
                opt.vy += 0.01 * opt.vx * opt.vx;
                this.bounce(opt);
            },
            //重力运动 
            gravitate: function gravitate(opt) {
                opt.vy += 0.22; //加速下落
                opt.vx *= 0.998; //地面摩擦
                if (opt.y > opt.bottom - opt.height) {
                    opt.vy *= 0.96; //地面反弹减速
                }
                opt.bounce = true;
                this.move(opt);
            },
            //缩放
            zoom: function zoom(opt) {
                var minR = opt.minR || 1;
                var maxR = opt.maxR || opt.right / 2;
                var speed = opt.zoomSpeed || opt.speed || 1;
                if (opt.r >= maxR) {
                    opt.zoomState = "out";
                } else if (opt.r <= minR) {
                    opt.zoomState = "in";
                }
                if (opt.zoomState === "in") {
                    opt.r += speed;
                } else {
                    opt.r -= speed;
                }
            },
            //放大
            zoomin: function zoomin(opt) {
                opt.r += opt.speed || 1;
            },
            //放大
            zoomout: function zoomout(opt) {
                opt.r -= opt.speed || 1;
            },
            //绕圈
            circle: function circle(opt) {
                var self = this;
                opt.x = self.centerX + _.sin(self.a) * self.r;
                opt.y = self.centerY + _.cos(self.a) * self.r;
                self.a += opt.speed * 0.1;
            },
            //螺旋
            spiral: function spiral(opt) {
                var self = this;
                this.circle(opt);
                self.r += self.swell || 1;
                if (opt.x + opt.r > opt.right || opt.y + opt.r > opt.bottom) {
                    self.swell = -1;
                } else if (self.r < 1) {
                    self.swell = 1;
                }
            },
            //椭圆
            ellipse: function ellipse(opt) {
                var self = this;
                opt.x = self.centerX + Math.sin(self.a) * self.r;
                opt.y = self.centerY + Math.cos(self.a) * self.r * 2;
                self.a += opt.speed;
            },

            //发光
            light: function light(opt) {
                if (opt.shadowBlur >= 20) {
                    self.lightState = -1;
                } else if (opt.shadowBlur <= 0) {
                    self.lightState = 1;
                }
                opt.shadowBlur += opt.speed * self.lightState;
            },
            //跳动发光
            throbLight: function throbLight(opt) {
                var minR = opt.minR || 1;
                var maxR = opt.maxR || opt.right / 2;
                var maxShadowBlur = opt.maxShadowBlur || 10;
                var minShadowBlur = opt.minShadowBlur || 0;
                var speed = opt.speed || 1;
                var blurSpeed = speed * (maxShadowBlur - minShadowBlur) / (maxR - minR);
                if (opt.r >= maxR) {
                    opt.zoomState = "out";
                    opt.shadowBlur = maxShadowBlur;
                } else if (opt.r <= minR) {
                    opt.zoomState = "in";
                    opt.shadowBlur = minShadowBlur;
                }
                if (opt.zoomState === "in") {
                    opt.r += speed;
                    opt.shadowBlur += blurSpeed;
                } else {
                    opt.r -= speed;
                    opt.shadowBlur -= blurSpeed;
                }
            }
        });
    }();

    //轨迹 点阵图
    var _track = _.track = function () {
        function Track(draw, opt) {
            if (!(this instanceof Track)) return new Track(draw, opt);
            opt = opt || {};
            this.draw = draw;

            //策略
            this.strategy = opt.strategy || [opt.callback];
            this.strategyIndex = opt.strategyIndex || 0;
            this.strategyAutoChange = _.isUndefined(opt.strategyAutoChange) ? true : opt.strategyAutoChange;
            this.times = opt.times || 360;
            this.animate = opt.animate || opt.delay;
            this.delay = this.animate ? opt.delay || 10 : 0;
            this.colors = opt.colors;
            this.loop = _.isUndefined(opt.loop) ? true : opt.loop;
            this.strategyClear = _.isUndefined(opt.strategyClear) ? true : opt.strategyClear;
        }

        return createClass(Track, {
            run: function run() {
                var self = this;
                if (this.strategyAutoChange) {
                    var len = this.strategy.length;
                    this.strategy.forEach(function (t, index) {
                        var clear = function clear() {
                            if (index + 1 === len) {
                                if (self.loop) {
                                    self.draw.clear();
                                    _.delay();
                                }
                            } else {
                                self.strategyClear && self.draw.clear();
                            }
                        };
                        var update = function update(i) {
                            var p = t.call(self.draw, i);
                            self.draw.point({
                                x: p.x,
                                y: p.y,
                                r: 1,
                                color: self.colors[i]
                            });
                            if (i + 1 === self.times) {
                                clear();
                            }
                        };
                        _.loop(update, self.times, self.delay);
                    });
                } else {
                    var update = function update(i) {
                        var p = self.strategy[self.strategyIndex].call(self.draw, i);
                        self.draw.point({
                            x: p.x,
                            y: p.y,
                            r: 1,
                            color: self.colors[i]
                        });
                        if (i + 1 === self.times) {
                            if (self.loop) {
                                console.timeEnd("loop");
                                console.time("loop");
                                _.delay(self.draw.clear(), 4000);
                            }
                        }
                    };
                    console.time("loop");
                    _.loop(update, self.times, self.delay);
                }
            }
        });
    }();

    //轨迹策略
    var _tarckStrategy = _.tarckStrategy = function () {
        var trackColors = [];
        var trackTimes = 10;
        var TrackStrategy = function TrackStrategy(times, colors, strategyName) {
            if (!(this instanceof TrackStrategy)) return new TrackStrategy(times, colors, strategyName);
            trackTimes = times || 10;
            trackColors = colors;
            var ss = [],
                strategyIndex = 0,
                i = 0;
            for (var key in this.strategyObj) {
                if (key === strategyName) strategyIndex = i;
                ss[ss.length] = this.strategyObj[key];
                i++;
            }
            this.strategyIndex = strategyIndex;
            this.strategy = ss;
        };

        return createClass(TrackStrategy, {
            strategyObj: {
                //椭圆   椭圆方程ρ=ep (1-ecosθ)
                ellipse1: function ellipse1(i) {
                    var draw = this,
                        o = draw.o,
                        r = 100,
                        a = i * 360 / trackTimes;
                    var p = _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                    return _.pointPolar({
                        r: r * _.sin(a),
                        a: 0,
                        o: {
                            x: p.x,
                            y: p.y
                        }
                    });
                },
                ellipse2: function ellipse2(i) {
                    var draw = this,
                        o = draw.o,
                        r = 100,
                        a = i * 360 / trackTimes;
                    var p = _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                    return _.pointPolar({
                        r: r * _.sin(a),
                        a: 180,
                        o: {
                            x: p.x,
                            y: p.y
                        }
                    });
                },

                //繁花曲线 二级
                spiro: function spiro(i) {
                    var draw = this,
                        o = draw.o,
                        r = 100,
                        a = i * 360 / trackTimes,
                        r2 = 50,
                        k = 1 + r / r2;
                    var p = _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                    var rRatio = 1,
                        aRatio = -1,
                        a1 = k * a % 360;
                    return _.pointPolar({
                        r: r2 * rRatio,
                        a: a1 * aRatio,
                        o: {
                            x: p.x,
                            y: p.y
                        }
                    });
                },
                cose: function cose(i) {
                    var draw = this,
                        o = draw.o,
                        r = 50,
                        a = i * 360 / trackTimes,
                        r2 = 50,
                        k = 1 + r / r2;
                    var p = _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                    var a1 = k * a % 360;
                    return _.pointPolar({
                        r: r2 * (1 + _.cos(a1)),
                        a: a,
                        o: {
                            x: p.x,
                            y: p.y
                        }
                    });
                },
                //双纽线 ρ^2=2(a^2)*cos2θ
                lemniscate: function lemniscate(i) {
                    var draw = this,
                        a = i * 360 / trackTimes,
                        r = 100,
                        r = Math.sqrt(2 * Math.pow(r, 2) * _.cos(a * 2)),
                        o = draw.o;
                    return _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                },
                circle: function circle(i) {
                    var draw = this,
                        r = 100,
                        a = i * 360 / trackTimes,
                        o = draw.o;
                    return _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                },
                //笛卡尔心形线
                cardioid: function cardioid(i) {
                    var draw = this,
                        a = i * 360 / trackTimes,
                        r = 100 * (1 + _.sin(a)),
                        o = draw.o;
                    return _.pointPolar({
                        r: r,
                        a: a,
                        o: o
                    });
                },
                //螺旋
                spiral: function spiral(i) {
                    var draw = this,
                        o = draw.o,
                        r = 30,
                        a = 0,
                        interval = 0.1;

                    var turns = (draw.width / 2 - r) / interval / trackTimes;
                    return _.pointPolar({
                        r: r + interval * i * turns,
                        a: a + i * turns,
                        o: o
                    });
                }

            }
        });
    }();

    //可滑动进度条
    var _slider = _.slider = function () {
        function Slider(draw, opt) {
            if (!(this instanceof Slider)) return new Slider(draw, opt);
            opt = opt || {};
            var self = this,
                width = draw.width,
                color = this.color = opt.color || "#000";
            this.draw = draw;
            this.context = draw.context;
            this.canvas = draw.canvas;
            this.pause = opt.pause || false;
            this.x = opt.x || 30;
            this.y = opt.y || 10;
            this.height = opt.height || 20;
            this.width = opt.width || width - this.x * 2;
            this.max = opt.max || 100;
            this.min = opt.min || 0;
            this.loop = _.isUndefined(opt.loop) ? true : opt.loop;
            this.colors = opt.colors;
            this.timeInterval = _.isUndefined(opt.timeInterval) ? 200 : opt.timeInterval;

            //策略
            this.strategy = opt.strategy || [opt.callback];
            this.strategyIndex = opt.strategyIndex || 0;
            this.strategyAutoChange = _.isUndefined(opt.strategyAutoChange) ? true : opt.strategyAutoChange;

            this.callback = function (p) {
                // opt.callback && opt.callback.call(draw,p)
                var fn = self.strategy[self.strategyIndex];
                fn && fn.call(draw, p);
                self.render(p);
            };
            var progess = this.progess = opt.progess || this.min;
            this.render(progess);
            this.addEvent();
        }
        return createClass(Slider, {
            getColor: function getColor(progess) {
                return this.colors ? this.colors[(this.colors.length - 1) * (progess - this.min) / (this.max - this.min) << 0] : this.color;
            },
            render: function render(progess, color) {
                var self = this,
                    ctx = this.context,
                    x = this.x,
                    y = this.y,
                    height = this.height,
                    width = this.width,
                    max = this.max,
                    min = this.min;
                this.progess = progess;

                color = color || this.getColor(progess);

                ctx.beginPath();
                self.draw.setFillStyle(ctx, "#dedede");
                ctx.rect(x, y, width, height);
                ctx.fill();
                ctx.beginPath();
                self.draw.setFillStyle(ctx, color);
                ctx.rect(x, y, width * (progess - min) / (max - min), height);
                ctx.fill();
                ctx.beginPath();
                self.draw.setFillStyle(ctx, "#fff");
                ctx.rect(0, y, x, height);
                ctx.fill();
                self.draw.text({
                    x: x - 18,
                    y: y + height / 2,
                    text: progess,
                    r: 12
                });
            },
            addEvent: function addEvent() {
                var self = this,
                    x = this.x,
                    y = this.y,
                    height = this.height,
                    width = this.width,
                    max = this.max,
                    min = this.min,
                    isDragging = false;
                toucher([{
                    el: self.canvas,
                    type: _touchstar,
                    callback: function callback(item, ev) {
                        var pos = _.pos(ev);
                        if (pos.y < y + height && pos.y > y) {
                            self.pause = true;
                            i = min + (max - min) * (pos.x - x) / width << 0;
                            i = _.between(min, max, i);
                            self.callback && self.callback(i);
                            isDragging = true;
                        } else {
                            self.pause = !self.pause;
                        }
                    }
                }, {
                    el: self.canvas,
                    type: _touchmove,
                    callback: function callback(item, ev) {
                        var pos = _.pos(ev);
                        if (isDragging) {
                            self.pause = true;
                            i = min + (max - min) * (pos.x - x) / width << 0;
                            i = _.between(min, max, i);
                            self.callback && self.callback(i);
                        }
                    }
                }, {
                    el: self.canvas,
                    type: _touchend,
                    callback: function callback(item, ev) {
                        isDragging = false;
                    }
                }]);
            },
            run: function run() {
                var self = this,
                    max = this.max,
                    i = this.progess,
                    loop = this.loop,
                    timeInterval = this.timeInterval,
                    callback = this.callback;
                if (this.pause) {
                    callback && callback(i);
                } else {
                    _.animate(function () {
                        if (!self.pause) {
                            callback && callback(i++);
                            if (i === max + 1) {
                                i = self.progess = 0;
                                if (self.strategyAutoChange) self.strategyIndex = self.strategyIndex + 1 === self.strategy.length ? 0 : self.strategyIndex + 1;
                                if (!loop) self.pause = true;
                            }
                        } else {
                            i = self.progess;
                        }
                    }, timeInterval);
                }
            }
        });
    }();

    //播放策略
    var _sliderStrategy = _.sliderStrategy = function () {
        var sliderMax = 10;
        var sliderColors = [];
        var SliderStrategy = function SliderStrategy(max, colors, strategyName) {
            if (!(this instanceof SliderStrategy)) return new SliderStrategy(max, colors, strategyName);
            sliderMax = max || 10;
            sliderColors = colors || _.color.circle(max + 1);
            var ss = [],
                strategyIndex = 0,
                i = 0;
            for (var key in this.strategyObj) {
                if (key === strategyName) strategyIndex = i;
                ss[ss.length] = this.strategyObj[key];
                i++;
            }
            this.strategyIndex = strategyIndex;
            this.strategy = ss;
        };
        return createClass(SliderStrategy, {
            strategyObj: {

                sierpinskiGroup: function sierpinskiGroup(i) {
                    var draw = this;
                    draw.clear();
                    draw.group({
                        shape: {
                            shape: "sierpinski",
                            num: i,
                            r: 60,
                            a: 0,
                            lineWidth: 1
                        },
                        group: {
                            group: "polygon",
                            num: i,
                            r: 60,
                            rotation: true,
                            colorful: "circle"
                        }
                    });
                },
                spiral: function spiral(i) {
                    var draw = this,
                        width = draw.width,
                        height = draw.height,
                        ctx = draw.context,
                        interval = 1,
                        step = 1,
                        p = _.pointPolar({
                        o: draw.o
                    }),
                        ps = [p],
                        j = 0;
                    do {
                        var v = p.toV().rotate(i * 360 / sliderMax);
                        if (j % step === 0) {
                            var abs = v.abs();
                            v = v.abs(abs + interval);
                        }
                        p = v.toP(p);
                        ps[ps.length] = p;
                        j++;
                    } while (p.x > 0 && p.x < width && p.y > 0 && p.y < height);

                    draw.clear();
                    draw.setLineWidth(ctx, 1);
                    draw.setStrokeStyle(ctx, sliderColors[i]);
                    ctx.beginPath();
                    ps.forEach(function (t, i) {
                        draw.line(ctx, t, i == 0);
                    });
                    ctx.stroke();
                },
                spiralPolygon: function spiralPolygon(p) {
                    var draw = this,
                        width = draw.width,
                        height = draw.height,
                        r = 100,
                        num = 3,
                        inR = r * _.cos(180 / num),
                        v = _.vector({
                        x: width / 2,
                        y: height / 2
                    }),
                        n = Math.log(v.abs() / inR) / Math.log(1.05) << 0;
                    draw.clear();
                    _.loop(function (i) {
                        draw.shape({
                            shape: "cornercurve", //  polygon bomb cornercurve
                            num: num,
                            r: r * Math.pow(1.05, i),
                            a: i * 5 + p, //180 * _.sin(p),
                            color: sliderColors[p]
                        });
                    }, n);
                },
                vertexRotate: function vertexRotate(i) {
                    var draw = this,
                        width = draw.width,
                        height = draw.height,
                        ctx = draw.context;
                    var vs = _.vertex({
                        r: 100,
                        num: 5,
                        x: width / 2,
                        y: height / 2
                    }).vs;
                    var angle = i * 360 / sliderMax;
                    vs = vs.map(function (t, i) {
                        return t.rotate(angle * i);
                    });
                    draw.clear();
                    draw.setStrokeStyle(ctx, sliderColors[i]);
                    draw.link(vs);
                },
                diagonal: function diagonal(i) {
                    var draw = this;
                    draw.clear();
                    draw.shape({
                        shape: "polygon",
                        num: i,
                        r: 100,
                        color: sliderColors[i],
                        showDiagonal: true
                    });
                },
                triaGroup: function triaGroup(i) {
                    var draw = this;
                    draw.clear();
                    draw.group({
                        shape: {
                            shape: "polygon",
                            num: 3,
                            r: 60,
                            lineWidth: 2
                        },
                        group: {
                            group: "polygon",
                            num: i,
                            r: 60,
                            colorful: "circle",
                            rotation: true
                        }
                    });
                },
                rectGroup: function rectGroup(i) {
                    var draw = this;
                    draw.clear();
                    draw.group({
                        shape: {
                            shape: "polygon",
                            num: 4,
                            r: 60,
                            lineWidth: 2
                        },
                        group: {
                            group: "polygon",
                            num: i,
                            r: 60,
                            colorful: "circle",
                            rotation: true
                        }
                    });
                },
                bomb: function bomb(i) {
                    var draw = this,
                        width = draw.width,
                        height = draw.height,
                        ctx = draw.context;
                    var vertex = _.vertex({
                        shape: "ploygon",
                        num: i || 3,
                        r: 100,
                        x: width / 2,
                        y: height / 2
                    }),
                        vs = vertex.vs,
                        len = vs.length,
                        po = vertex.po;
                    draw.clear();
                    draw.setStrokeStyle(ctx, sliderColors[i]);
                    ctx.beginPath();
                    vs.forEach(function (t, i) {
                        var t1 = vs[i + 1 === len ? 0 : i + 1];
                        ctx.moveTo(t.x, t.y);
                        ctx.quadraticCurveTo(po.x, po.y, t1.x, t1.y);
                    });
                    ctx.stroke();
                }
            }
        });
    }();

    //画图 
    //基础图形组合，加动画
    var _draw = _.draw = function () {
        function Draw(options, canvas) {
            // componentInstance
            if (!(this instanceof Draw)) return new Draw(options, canvas);
            var self = this;

            if (canvas) {
                this.canvas = canvas;
                this.context = inBrowser ? this.canvas.getContext("2d") : canvas.context;
            } else {
                if (inBrowser) {
                    if (options.el) {
                        var el = _.$(options.el);
                        if (el.nodeName.toLowerCase() === "canvas") {
                            this.canvas = el;
                        } else {
                            this.canvas = document.createElement("canvas");
                            el.appendChild(this.canvas);
                        }
                    } else if (options.canvasid) {
                        this.canvas = _.$("#" + options.canvasid);
                        if (this.canvas.length === 0) {
                            this.canvas = document.createElement("canvas");
                            this.canvas.id = options.canvasid;
                        }
                    } else if (options.container || options.containerid) {
                        this.container = options.container ? _.$(options.container) : options.containerid ? _.$("#" + options.containerid) : document.documentElement;
                        if (this.container.length === 0) {
                            console.log("not found container:" + options.container);
                        } else {
                            if (this.container.$("canvas").length === 0) {
                                this.canvas = document.createElement("canvas");
                                this.container.appendChild(this.canvas);
                            } else {
                                this.canvas = this.container.$("canvas");
                            }
                        }
                    } else {
                        this.canvas = document.createElement("canvas");
                    }

                    this.context = this.canvas.getContext("2d");

                    var isDragging = false;
                    var startHnadler = function startHnadler(item, ev) {
                        var offset = _.pos(item);
                        var pos = _.pos(ev);
                        var mouse = self.mouse = {
                            x: pos.x - offset.x,
                            y: pos.y - offset.y
                        };
                        if (self.opt) {
                            if (!self.opt.motion) {
                                self.opt.shape.begin && self.clear();
                                if (self.opt.shape) self.opt.shape = _.extend(self.opt.shape, {
                                    x: mouse.x,
                                    y: mouse.y
                                });
                                if (self.opt.group) self.opt.group = _.extend(self.opt.group, {
                                    x: mouse.x,
                                    y: mouse.y
                                });
                                self.setup.call(self, self.opt);
                            }
                        }
                        isDragging = true;
                    };
                    var moveHandler = function moveHandler(item, ev) {
                        if (isDragging) {
                            var offset = _.pos(item);
                            var pos = _.pos(ev);
                            self.mouse = {
                                x: pos.x - offset.x,
                                y: pos.y - offset.y
                            };
                        }
                    };
                    var endHandler = function endHandler(item, ev) {
                        isDragging = false;
                    };

                    //事件
                    toucher([{
                        el: this.canvas,
                        type: "touchstart",
                        callback: function callback(item, ev) {
                            startHnadler(item, ev);
                        }
                    }, {
                        el: this.canvas,
                        type: "touchmove",
                        callback: function callback(item, ev) {
                            moveHandler(item, ev);
                        }
                    }, {
                        el: this.canvas,
                        type: "mousedown",
                        callback: function callback(item, ev) {
                            startHnadler(item, ev);
                        }
                    }, {
                        el: this.canvas,
                        type: "mousemove",
                        callback: function callback(item, ev) {
                            moveHandler(item, ev);
                        }
                    }, {
                        el: this.canvas,
                        type: "mouseup",
                        callback: function callback(item, ev) {
                            endHandler(item, ev);
                        }
                    }]);
                }
            }

            if (_.isObject(options)) {
                this.options = options;
                //全屏
                options.fullscreen ? this.fullscreen() : this.size(options);

                var bg = {};
                [{
                    k: "color",
                    v: "background-color"
                }, {
                    k: "color",
                    v: "background"
                }, {
                    k: "src",
                    v: "background-image"
                }, {
                    k: "size",
                    v: "background-size"
                }, {
                    k: "position",
                    v: "background-position"
                }, {
                    k: "repeat",
                    v: "background-repeat"
                }].forEach(function (t) {
                    if (t.v in options) bg[t.k] = options[t.v];
                });

                this.callback = options.callback;
                this.background(bg, this.callback);
            }
        }

        return createClass(Draw, {
            size: function size(opt) {
                var self = this;
                var container = this.container || document.documentElement;
                var _scale = opt.scale || 1; //||window.devicePixelRatio
                var _client = {
                    width: container.clientWidth,
                    height: container.clientHeight
                };

                var key = opt.ratio; //比率
                if (_.isString(key)) {
                    if (!!~key.indexOf(":")) {
                        key.replace(/(\d+):(\d+)/, function (match, x, y) {
                            _client.height = _client.width * y / x;
                        });
                    } else if (!isNaN(parseFloat(key))) {
                        _client.height = _client.width * parseFloat(key);
                    }
                } else if (_.isNumber(key)) {
                    _client.height = _client.width * key;
                };

                ["width", "height"].forEach(function (t) {
                    self[t] = self.canvas[t] = (t in opt ? opt[t] : _client[t]) * _scale;
                });
                //this.context.scale(_scale, _scale);
                this.o = {
                    x: this.width / 2,
                    y: this.height / 2
                };
                return this;
            },
            fullscreen: function fullscreen() {
                return this.size({
                    ratio: "fullscreen"
                });
            },
            background: function background(opt, callback) {
                var self = this,
                    canvas = self.canvas,
                    ctx = self.context,
                    src = opt.src,
                    size = opt.size,
                    position = opt.position,
                    repeat = opt.repeat,
                    color = opt.color;
                // callback = opt.callback;
                if (color) {
                    self.setFillStyle(ctx, color);
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                src && _.loadImg(src, function (img) {
                    var imgWidth = img.width,
                        imgHeight = img.height,
                        canvasWidth = canvas.width,
                        canvasHeight = canvas.height;

                    switch (size) {
                        case "cover":
                            //等比例缩放 盖住cover   auto原图 
                            var zoom = _.max(canvasWidth / imgWidth, canvasHeight / imgHeight),
                                newImgWidth = imgWidth * zoom,
                                newImgHeight = imgHeight * zoom;
                            if (position === 'center') {
                                var x = zoom <= 1 ? (canvasWidth - newImgWidth) / 2 : -(canvasWidth - newImgWidth) / 2,
                                    y = zoom <= 1 ? (canvasHeight - newImgHeight) / 2 : -(canvasHeight - newImgHeight) / 2;
                                ctx.drawImage(img, x, y, newImgWidth, newImgHeight);
                            } else {
                                ctx.drawImage(img, 0, 0, newImgWidth, newImgHeight);
                            }
                            break;
                        case "contain":
                            //等比例缩放 框内contain 
                            var zoom = _.min(canvasWidth / imgWidth, canvasHeight / imgHeight),
                                newImgWidth = imgWidth * zoom,
                                newImgHeight = imgHeight * zoom;
                            if (position === 'center') {
                                var x = (canvasWidth - newImgWidth) / 2,
                                    y = (canvasHeight - newImgHeight) / 2;
                                ctx.drawImage(img, x, y, newImgWidth, newImgHeight);
                            } else {
                                ctx.drawImage(img, 0, 0, newImgWidth, newImgHeight);
                            }

                            if (repeat === "repeat") {
                                _.zipImg({
                                    img: img,
                                    zoom: zoom,
                                    callback: function callback() {
                                        var bg = ctx.createPattern(this, 'repeat');
                                        self.setFillStyle(ctx, bg);
                                        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                                        ctx.fill();
                                    }
                                });
                            }
                            break;
                        case "stretch":
                            //stretch 拉伸铺满
                            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                            break;
                        case "auto":
                            ctx.drawImage(img, 0, 0);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0);
                            break;
                    }

                    callback && callback.call(self);
                });
                return this;
            },
            toImage: function toImage() {
                return this.canvas.toDataURL('image/jpeg');
            },
            toButton: function toButton(type) {
                return this.toElement({
                    className: "btn",
                    type: type
                });
            },
            toElement: function toElement(opt) {
                var tag = opt.tag || opt.nodeName || "div";
                var div = document.createElement(tag);
                div.className = opt.class || opt.className;
                switch (opt.type) {
                    case "img":
                        var img = document.createElement("img");
                        img.src = this.toImage();
                        div.appendChild(img);
                        break;
                    case "background":
                        div.style.backgroundImage = 'url(' + this.toImage() + ')';
                        break;
                    case "canvas":
                        var canvas = this.canvas;
                        var draw = Draw(this.options);
                        var imgData = this.context.getImageData(0, 0, canvas.width, canvas.height);
                        draw.context.putImageData(imgData, 0, 0);
                        div.appendChild(draw.canvas);
                        break;
                    default:
                        div.appendChild(this.canvas);
                        break;
                }
                return div;
            },
            save: function save() {
                this.context.save();
                return this;
            },
            restore: function restore() {
                this.context.restore();
                return this;
            },
            //样式   小程序写法 setXXX
            setFillStyle: function setFillStyle(ctx, color) {
                color = color || "#000000";
                ctx.fillStyle = color;
                ctx.setFillStyle && ctx.setFillStyle(color);
            },
            setStrokeStyle: function setStrokeStyle(ctx, color) {
                color = color || "#000000";
                ctx.strokeStyle = color;
                ctx.setStrokeStyle && ctx.setStrokeStyle(color);
            },
            setLineWidth: function setLineWidth(ctx, lineWidth) {
                var lineWidth = _.isUndefined(lineWidth) ? 0.5 : lineWidth;
                ctx.lineWidth = lineWidth;
                ctx.setLineWidth && ctx.setLineWidth(lineWidth);
            },
            setShadowBlur: function setShadowBlur(ctx, shadowBlur) {
                var shadowBlur = _.isUndefined(shadowBlur) ? 10 : shadowBlur;
                ctx.shadowBlur = shadowBlur;
                ctx.setShadowBlur && ctx.setShadowBlur(shadowBlur);
                ctx.shadowColor = "black";
            },
            setShadowColor: function setShadowColor(ctx, shadowColor) {
                var shadowColor = _.isUndefined(shadowColor) ? 10 : shadowColor;
                ctx.shadowColor = shadowColor;
                ctx.setShadowColor && ctx.setShadowColor(shadowColor);
            },
            // miter (默认) round (圆形) bevel (斜角)
            setLineJoin: function setLineJoin(ctx, lineJoin) {
                lineJoin = lineJoin || 'miter';
                ctx.lineJoin = lineJoin;
                ctx.setLineJoin && ctx.setLineJoin(lineJoin);
            },
            //透明
            setGlobalAlpha: function setGlobalAlpha(ctx, alpha) {
                alpha = alpha || 1;
                ctx.globalAlpha = alpha;
                ctx.setGlobalAlpha && ctx.setGlobalAlpha(alpha);
            },
            //图像合成方式
            setGlobalCompositeOperation: function setGlobalCompositeOperation(ctx, compositeOperation) {
                compositeOperation = compositeOperation || 'source-over';
                ctx.globalCompositeOperation = compositeOperation;
                ctx.setGlobalCompositeOperation && ctx.setGlobalCompositeOperation(compositeOperation);
            },

            set: function set(opt) {
                if (opt) {
                    var ctx = this.context;
                    if (opt.randomColor) opt.color = _.color().rgb();
                    this.setLineJoin(ctx, opt.lineJoin);
                    this.setLineWidth(ctx, opt.lineWidth);
                    this.setStrokeStyle(ctx, opt.lineColor || opt.color);
                    opt.shadowBlur && this.setShadowBlur(ctx, opt.shadowBlur);
                    opt.shadowColor && this.setShadowColor(ctx, opt.shadowColor);
                    this.setFillStyle(ctx, opt.color);
                }
                return this;
            },
            fill: function fill(opt) {
                opt && opt.fill && this.context.fill();
                return this;
            },
            stroke: function stroke(opt) {
                if (opt && opt.lineWidth === 0) return this;
                this.context.stroke();
                return this;
            },
            fillstroke: function fillstroke(opt) {
                return this.fill(opt).stroke(opt);
            },
            render: function render(opt, vs) {
                this.fillstroke(opt);
                if (opt) {
                    //显示外切圆
                    opt.showExcircle && this.excircle(opt);
                    //显示内切圆
                    opt.showIncircle && this.incircle(opt);
                    //显示半径
                    opt.showRadius && this.radius(vs, opt);
                    //显示顶点
                    (opt.showVertices || opt.identifierVertices) && this.vertices(vs, opt);
                    //显示圆心
                    opt.showCenter && this.centerPoint(opt);
                    //对角线
                    opt.showDiagonal && this.diagonal(vs, opt);
                    //间隔填色
                    opt.fillInterval && this.zebra(vs, opt);
                    //顶点镜像
                    opt.showMirror && this.mirror(vs, opt);
                    //标注夹角
                    opt.showAngle && this.includedAngle(vs, opt);
                }
                return this;
            },
            //图形闭合
            closePath: function closePath(opt) {
                var ctx = this.context;
                if (opt) {
                    var closed = _.isUndefined(opt.closed) ? true : opt.closed;
                    closed && ctx.closePath();
                } else {
                    ctx.closePath();
                }
                return this;
            },
            //新开画布
            beginPath: function beginPath(opt) {
                var ctx = this.context;
                if (opt) {
                    var begin = _.isUndefined(opt.begin) ? true : opt.begin;
                    begin && ctx.beginPath();
                } else {
                    ctx.beginPath();
                }
                return this;
            },
            shadow: function shadow(color) {
                var canvas = this.canvas,
                    ctx = this.context;

                if (!color) {
                    color = this.opt && this.opt.global ? this.opt.global.background : "#000";
                }
                //光影效果
                // var color = this.opt.global ? _.color().rgb(this.opt.global.background, 0.05) : 'rgba(0,0,0,0.05)';
                // this.setFillStyle(ctx, color);
                // ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.save();
                this.setGlobalCompositeOperation(ctx, 'source-over');
                this.setGlobalAlpha(ctx, 0.18);
                this.setFillStyle(ctx, color);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                return this;
            },
            clear: function clear(color) {
                var canvas = this.canvas,
                    ctx = this.context;
                if (color) {
                    //ctx.fillStyle = 'rgba(0,0,0,0.05)'; //光影效果
                    this.setFillStyle(ctx, color || this.options.background || "#ffffff");
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                return this;
            },
            //中心点
            central: function central() {
                return {
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2
                };
            },
            //默认参数
            default: function _default(opt) {
                var self = this;
                if (opt) {
                    if (_.isArray(opt)) {
                        return opt.map(function (t) {
                            return _.clone(self.default(), t);
                        });
                    } else {
                        return _.clone(this.default(), opt);
                    }
                } else {
                    return {
                        x: this.canvas.width / 2,
                        y: this.canvas.height / 2,
                        r: 10
                    };
                }
            },
            //短参数 映射
            shortName: function shortName(opt) {
                opt && [{
                    k: "n",
                    v: "num"
                }, {
                    k: "s",
                    v: "shape"
                }, {
                    k: "showA",
                    v: "showAngle"
                }, {
                    k: "showR",
                    v: "showRadius"
                }, {
                    k: "showV",
                    v: "showVertices"
                }, {
                    k: "showC",
                    v: "showCenter"
                }, {
                    k: "showEC",
                    v: "showExcircle"
                }, {
                    k: "showIC",
                    v: "showIncircle"
                }, {
                    k: "showD",
                    v: "showDiagonal"
                }, {
                    k: "showM",
                    v: "showMirror"
                }].forEach(function (t) {
                    if (!_.isUndefined(opt[t.k])) opt[t.v] = opt[t.k];
                });
                return opt;
            },
            //画直线
            line: function line(ctx, t, codition) {
                if (t) ctx[codition ? "moveTo" : "lineTo"](t.x, t.y);
            },
            //连线
            link: function link(vs, opt) {
                var self = this,
                    ctx = this.context,
                    len = vs.length;

                // ctx.translate(this.x, this.y); //将坐标移到this.x 和 this.y
                // ctx.rotate(this.rotation); //设置旋转角度
                this.beginPath(opt);
                var dashLength = opt && opt.dashed ? opt.dashLength : 5;

                if (opt && opt.dashed && !ctx.setLineDash) {
                    //虚线 兼容
                    vs.forEach(function (t, i) {
                        var t2 = vs[i + 1 === len ? 0 : i + 1];
                        var d = t.dist(t2);
                        var ps = t.split(t2, d / dashLength << 0);
                        ps.unshift(t);
                        ps.push(t2);
                        ps.forEach(function (t, i) {
                            self.line(ctx, t, i % 2 === 0);
                        });
                    });
                } else {
                    if (opt && ctx.setLineDash) {
                        if (opt.dashed) {
                            ctx.setLineDash([dashLength]);
                        } else if (opt.dashed === false) {
                            ctx.setLineDash([]);
                        }
                    }

                    //实线
                    vs.forEach(function (t, i) {
                        self.line(ctx, t, i === 0);
                    });
                }
                //曲线
                if (opt && opt.curve) {
                    var po = _pointPolar({
                        o: this.o
                    });
                    vs.forEach(function (t, i) {
                        var t1 = vs[i + 1 === len ? 0 : i + 1],
                            v1 = po.toV(t),
                            v2 = po.toV(t1);
                        var p = v1.add(v2).toP(po);

                        ctx.moveTo(t.x, t.y);
                        ctx.quadraticCurveTo(p.x, p.y, t1.x, t1.y);
                    });
                }
                //半圆弧
                if (opt && opt.semiarc) {
                    vs.forEach(function (t, i) {
                        var t1 = vs[i + 1 === len ? 0 : i + 1],
                            to = t.mid(t1),
                            v1 = to.toV(t),
                            v2 = to.toV(t1);
                        ctx.moveTo(t.x, t.y);
                        ctx.arc(to.x, to.y, v1.abs(), v1.rad(), v2.rad(), false);
                    });
                }

                self.closePath(opt);
                self.render(opt, vs);

                return this;
            },
            //夹角
            includedAngle: function includedAngle(vs, opt) {
                var self = this,
                    len = vs.length;

                function _includedAngle(t, i) {
                    var t1 = vs[i + 1 === len ? 0 : i + 1],
                        t2 = vs[i - 1 === -1 ? len - 1 : i - 1],
                        v1 = t.toV(t1),
                        v2 = t.toV(t2),
                        ia = Math.round(_.deg(v1.ia(v2)));
                    self.arc(t, 10, v1.rad(), v2.rad());
                    var p = t.toV().abs(opt.r + 15).toP(t.o);
                    return self.text({
                        x: p.x,
                        y: p.y,
                        text: ia + '°'
                    });
                }

                return opt.showAngle === "all" ? vs.map(function (t, i) {
                    return _includedAngle(t, i);
                }) : _includedAngle(vs[0], 0);
            },
            //画弧
            arc: function arc(t, r, sA, eA) {
                var ctx = this.context;
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.arc(t.x, t.y, r, sA, eA, false);
                this.fillstroke(this.opt);
            },
            // 外切圆
            excircle: function excircle(opt) {
                return this.shape(_.clone(opt, {
                    shape: "circle",
                    text: ""
                }));
            },
            //内切圆
            incircle: function incircle(opt) {
                var r = opt.r * _.cos(180 / opt.num);
                return this.shape(_.clone(opt, {
                    shape: "circle",
                    r: r,
                    text: ""
                }));
            },
            //旁切圆
            escribedcircle: function escribedcircle(opt) {},
            //三角形内切圆圆心坐标：
            // [ax1+bx2+cx3] / [a+b+c]， [ay1+by2+cy3] / [a+b+c]
            //半径 r=s/p  s=p(p-a)(p-b)([-c])^1/2
            // incircle: function(opt) {
            //     // var vs = this.vertices(opt);
            //     // var num=3,d=[],p=0;
            //     // for (var i = 0; i < num; i++) {
            //     //     d[i]=this.dist(vs[i],vs[i>=num?0:i+1]);
            //     //     p +=d[i];
            //     // }
            //     // p=p/2;
            // },
            //半径
            radius: function radius(vs, opt) {
                var ctx = this.context;
                var x = opt.x,
                    y = opt.y;
                ctx.beginPath();
                vs.forEach(function (t) {
                    ctx.moveTo(x, y);
                    ctx.lineTo(t.x, t.y);
                });
                this.fillstroke(opt);
            },
            //顶点
            vertices: function vertices(vs, opt) {
                var self = this;
                var verticesColor = _.color().rgb();

                var animate = opt.animate,
                    animationInterval = opt.animationInterval || 200;

                vs.forEach(function (t, i) {
                    t.fill = true;
                    if (opt.identifierVertices) {
                        t.r = 10;
                        t.text = i + 1;
                        t.color = "rgba(0,0,0,0.2)";
                    } else {
                        t.color = verticesColor;
                        t.r = 3;
                    }
                    animate ? _.delay(self.point, animationInterval, t) : self.point(t);
                });
            },
            //圆心
            centerPoint: function centerPoint(opt) {
                return this.point({
                    r: 3,
                    x: opt.x,
                    y: opt.y,
                    color: _.color().rgb(), //verticesColor,
                    fill: true
                });
            },
            //对角线  顶点相互连线
            diagonal: function diagonal(vs, opt) {
                var vs = vs || this.vertices(opt);
                var vsGroup = [];
                var len = vs.length;
                for (var i = 0; i < len - 2; i++) {
                    for (var j = i + 2; j < len; j++) {
                        if (!(i === 0 && j === len - 1)) vsGroup.push([vs[i], vs[j]]);
                    }
                }return this.linkGroup(vsGroup, _.clone(opt, {
                    showVertices: false
                }));
                // return this.draw.link(vs, opt);
            },
            //间隔填色
            zebra: function zebra(vs, opt) {
                var vs = vs || this.vertices(opt);
                var x = opt.x,
                    y = opt.y;
                var vsGroup = _.slice(vs, 2).map(function (t) {
                    return t.concat([{
                        x: x,
                        y: y
                    }]);
                });
                return this.linkGroup(vsGroup, _.clone(opt, {
                    fill: true,
                    showVertices: false,
                    showExcircle: false,
                    fillInterval: false
                }));
                // return this.draw.link(vs, opt);
            },
            //顶点镜像
            mirror: function mirror(vs, opt) {
                var self = this;
                // var vsGroup = [];
                // var vs = vs || this.vertices(opt);
                // vs.forEach(function(t) {
                //     var vs2 = []
                //     vs.forEach(function(t2) {
                //         t2.mirror && vs2.push(t2.mirror(t));
                //     })
                //     vsGroup.push(vs2);
                // });
                // this.linkGroup(vsGroup, _.clone(opt, { showMirror: false }));
                var vertex = _.vertex(opt);
                var po = vertex.po;
                vs.forEach(function (t, i) {
                    var o = po.mirror(t);
                    self.shape(_.clone(opt, {
                        x: o.x,
                        y: o.y,
                        a: o.a + 180,
                        showMirror: false
                    }));
                });
            },

            linkGroup: function linkGroup(vsGroup, opt) {
                var self = this;
                // console.log("图形个数：" + vsGroup.length)
                // var result = {
                //     num: vsGroup.length
                // }
                // self.callback && self.callback(result);
                if (opt && opt.animate) {
                    //动画
                    _.extend(opt, {
                        animate: false
                    });
                    var animationInterval = opt.animationInterval || 0;
                    vsGroup.forEach(function (t, i) {
                        // setTimeout(function() {
                        //     self.link(t, opt);
                        // }, animationInterval * i);
                        // _.delay(function() {
                        //     self.link(t, opt);
                        // }, animationInterval)

                        _.delay(self.link, animationInterval, t, opt);
                    });
                } else {
                    vsGroup.forEach(function (t) {
                        self.link(t, opt);
                    });
                }
                return self;
            },
            //文本标注
            text: function text(opt) {
                return this.shape(_.clone({
                    s: "text"
                }, opt));
            },
            //打点
            point: function point(opt) {
                return this.shape(_.clone({
                    s: "circle",
                    r: 6,
                    color: "rgba(0,0,0,0.2)",
                    fill: true
                }, opt));
            },
            //图形
            shape: function shape(opt) {
                var self = this;
                if (_.isArray(opt)) return opt.map(function (t) {
                    return self.shape(t);
                });

                opt = self.shortName(opt);
                opt = self.default(opt);
                if (opt.color === "random") opt.color = _.color().rgb();
                self.save().set(opt);
                if (opt.animate && opt.easing) {
                    _tween({
                        start: {
                            x: opt.x,
                            y: 0,
                            a: opt.a - 180
                        },
                        to: {
                            x: opt.x,
                            y: opt.y,
                            a: opt.a
                        },
                        duration: opt.animationInterval || 2000,
                        type: opt.easing, //动画类型
                        callback: function callback(o) {
                            self.clear();
                            self.shape(_.clone(opt, o, {
                                easing: false
                            }));
                        }
                    });
                }
                if (opt.delay) {
                    //延迟动画
                    return _.delay(self.shape, opt.delay, _.clone(opt, {
                        delay: false
                    }));
                    // return _.delay(function() {
                    //     self.shape(_.clone(opt, {
                    //         delay: false
                    //     }));
                    // }, opt.delay)
                }
                var s = _.shape(self, opt);
                if (opt.disappear) {
                    this.disappear(opt);
                }
                self.restore();
                return s;
            },
            //图形组合
            group: function group(opt) {
                var t;
                if (opt.group) {
                    opt.group = this.shortName(opt.group);
                    opt.group = this.default(opt.group);
                    // opt.group.compositeOperation && this.setGlobalCompositeOperation(opt.group.compositeOperation);

                    if (opt.group.animate && opt.group.easing && opt.group.easing !== "none") {
                        _tween({
                            start: {
                                r: opt.group.r + 100,
                                a: opt.group.a - 180
                            },
                            to: {
                                r: opt.group.r,
                                a: opt.group.a
                            },
                            duration: opt.group.animationInterval || 2000,
                            type: opt.group.easing, //动画类型
                            callback: function callback(o) {
                                _.extend(opt.group, o, {
                                    easing: false
                                }); //{ x: o.x, y: o.y,a }
                                self.clear();
                                t = _shapeGroup(self, opt);
                            }
                        });
                    } else {
                        t = _shapeGroup(this, opt);
                    }
                } else {
                    t = this.shape(opt.shape);
                }
                this.canvas.callback && this.canvas.callback.call(this.context, this.context);

                return t;
            },
            //运动
            motion: function motion(opt) {
                var self = this;
                opt.motion = this.shortName(opt.motion);

                //模拟鼠标点击，改变位置
                var _randomMouse = function _randomMouse() {
                    self.mouse = {
                        x: self.canvas.width * Math.random(),
                        y: self.canvas.height * Math.random()
                    };
                    self.mouseTimmer = setTimeout(_randomMouse, opt.motion.simulateInterval || 1000);
                };
                self.mouseTimmer && clearTimeout(self.mouseTimmer);
                opt.motion.simulate && _randomMouse();
                return _motion(this, opt);
            },
            //全局
            global: function global(opt) {
                if (!(opt && opt.global)) return this;
                //画布尺寸
                opt.global.backgroundSize && this.size({
                    ratio: opt.global.backgroundSize
                });
                var ctx = this.context;
                //透明
                this.setGlobalAlpha(ctx, opt.global.alpha);
                //图像混合方式
                opt.global.compositeOperation && this.setGlobalCompositeOperation(ctx, opt.global.compositeOperation);
                //背景色
                if (opt.global.showBackground && opt.global.background) {
                    this.setFillStyle(ctx, opt.global.background);
                    ctx.fillRect(0, 0, this.width, this.height);
                }
                //电影
                if (opt.global.movie !== "none") {
                    this[opt.global.movie](opt.group || opt.shape);
                    return false;
                }
                //网格
                if (opt.global.showGrid) {
                    if (opt.global.grid === "ecgGrid") this.ecgGrid(opt.global);else this.grid(opt.global);
                }
                return this;
            },
            //执行入口
            setup: function setup(opt) {
                var self = this;
                if (_.isArray(opt)) return opt.map(function (t) {
                    return self.setup.call(self, t);
                });

                this.opt = opt;
                if (this.global(opt)) {
                    if (opt.motion) return this.motion(opt);
                    return this.group(opt);
                }
            },
            verticesGroup: function verticesGroup(opt) {
                var self = this;
                var vs = self.vertices(opt.group);
                return vs.map(function (t) {
                    return self.vertices(_.clone(opt.shape, {
                        x: t.x,
                        y: t.y
                    }));
                });
            },
            //Canvas(画布)的translate(平移)、scale(缩放) 、rotate(旋转) 、skew(错切)
            //离散顶点 discrete  离散数列 discrete series
            //平移  translation 平移点阵 translational lattice;
            //canvas.translate() － 画布的平移：
            translate: function translate(opt, dx, dy) {
                var opt = this.default(opt);
                var vs = [];
                var interval = opt.interval || 10; //步距离
                var step = opt.step || 1; //步数
                var direction = opt.direction || 0; //平移方向
                var x = opt.x,
                    y = opt.y;
                var po = _.pointPolar({
                    o: {
                        x: opt.x,
                        y: opt.y
                    }
                });
                for (var i = 0; i < step; i++) {
                    var p = po.clone({
                        r: interval,
                        a: direction
                    });
                    vs.push(p);
                }
                return vs;
            },
            //坐标原点 origin of coordinates
            origin: function origin(p) {
                var ctx = this.context;
                if (p) {
                    ctx.translate(p.x, p.y);
                    return this;
                }
                return {
                    x: 0,
                    y: 0
                };
            },

            _grid: function _grid(color, interval) {
                var ctx = this.context;
                var w = this.width,
                    h = this.height;
                ctx.strokeStyle = color;
                ctx.strokeWidth = 1;
                ctx.beginPath();
                for (var x = 0.5; x < w; x += interval) {
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h);
                };
                for (var y = 0.5; y < h; y += interval) {
                    ctx.moveTo(0, y);
                    ctx.lineTo(w, y);
                };
                ctx.stroke();
            },

            //格子
            grid: function grid(opt) {
                opt = opt || {};
                var color = opt.background || opt.color || _.color().rgb();
                this._grid(color, 10);
            },
            //心电图网格
            ecgGrid: function ecgGrid(opt) {
                opt = opt || {};
                var self = this;
                var color = _.color();
                var a = opt.background || opt.color || color.rgb(),
                    b = color.light(a, 0.5),
                    c = color.light(b, 0.5);
                [c, b, a].forEach(function (t, i) {
                    self._grid.call(self, t, 3 * Math.pow(5, i));
                });
            },
            //刻度盘
            dial: function dial(opt) {
                var r = opt.r || 50,
                    longSticks = [],
                    shortSticks = [],
                    p = _.pointPolar({
                    r: r,
                    a: 0,
                    o: this.o
                });
                var TICK_WIDTH = 15;

                for (var a = 0, cnt = 0; a < 360; a += 180 / 64, ++cnt) {
                    if (cnt % 4 === 0) {
                        longSticks[longSticks.length] = [p.clone({
                            r: r - TICK_WIDTH,
                            a: a
                        }), p.clone({
                            r: r,
                            a: a
                        })];
                    } else {
                        shortSticks[shortSticks.length] = [p.clone({
                            r: r - TICK_WIDTH / 2,
                            a: a
                        }), p.clone({
                            r: r,
                            a: a
                        })];
                    }
                }
                // ctx.strokeStyle = TICK_LONG_STROKE_STYLE;
                this.linkGroup(longSticks, opt);
                this.linkGroup(shortSticks, opt);
            },
            // 反转颜色
            reverse: function reverse() {
                var canvas = this.canvas,
                    ctx = this.context,
                    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < imgData.data.length; i += 4) {
                    imgData.data[i] = 255 - imgData.data[i];
                    imgData.data[i + 1] = 255 - imgData.data[i + 1];
                    imgData.data[i + 2] = 255 - imgData.data[i + 2];
                    imgData.data[i + 3] = 255;
                }
                ctx.putImageData(imgData, 0, 0);
            },
            //粒子
            getPixels: function getPixels(num) {
                var canvas = this.canvas,
                    ctx = this.context,
                    width = this.width,
                    height = this.height,
                    imgData = ctx.getImageData(0, 0, width, height),
                    cols = num ? Math.sqrt(num * width / height) : 100,
                    rows = num ? Math.sqrt(num * height / width) : 100,
                    s_width = imgData.width / cols << 0,
                    s_heihgt = imgData.height / rows << 0;

                console.log(imgData.data.length);
                var ps = [];
                for (var i = 0; i < cols; i++) {
                    //imgData.width
                    for (var j = 0; j < rows; j++) {
                        //imgData.height
                        var pos = j * s_heihgt * imgData.width + i * s_width;
                        var r = imgData.data[pos * 4],
                            g = imgData.data[pos * 4 + 1],
                            b = imgData.data[pos * 4 + 2],
                            a = imgData.data[pos * 4 + 3],
                            //alpha 通道 (0-255; 0 是透明的，255 是完全可见的)
                        x = i * s_width,
                            //+ (Math.random() - 0.5) * 20,
                        y = j * s_heihgt; //+ (Math.random() - 0.5) * 20,
                        var color = "rgba(" + [r, g, b, Math.round(10 * a / 255) / 10] + ")";
                        if (a > 10) {
                            var p1 = _.point({
                                x: x,
                                y: y,
                                color: color,
                                r: 1
                            });
                            ps.push(p1);
                        }
                    }
                }
                return ps;
            },
            //粒子消散 particle
            disappear: function disappear(opt) {
                var self = this,
                    time = opt.disappear || 1000,
                    dots = this.getPixels(),
                    timeout;

                function _disappear() {
                    self.clear();
                    dots.forEach(function (t) {
                        self.point(t.move());
                    });
                    timeout = setTimeout(_disappear, 17);
                };
                setTimeout(function () {
                    _disappear();
                }, time);
                setTimeout(function () {
                    self.clear();
                    timeout && clearTimeout(timeout);
                }, time + 10000);
            },

            //星空  点和线
            starrySky: function starrySky(opt) {
                var self = this,
                    width = this.width,
                    height = this.height,
                    ctx = this.context,
                    num = opt.num || 10,
                    maxNum = opt.maxNum || 100;
                var p = _.point({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speed: opt.speed || 0.5,
                    height: height,
                    width: width,
                    color: 'rgba(0,0,0,0.2)',
                    r: 1
                });

                var _randomR = function _randomR() {
                    return Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3;
                };
                // var shadow = opt.shadow;
                var colorArr = _.color.circle(num);
                var ps = [];
                while (num--) {
                    ps[ps.length] = p.clone({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        r: _randomR(),
                        color: colorArr[num] //shadow ? color.light() : color.rgb(),
                    });
                }var lineMaxLength = opt.lineMaxLength || _.min(width / 4, 200); // 点之间产生连线的最大距离 threshold
                // var background = 'rgba(0,0,0,0.05)'; 
                var background = opt.background || _.color.deepdark();
                var Line = function Line(a, b) {
                    this.a = a;
                    this.b = b;
                    this.len = _.vector({
                        x: a.x - b.x,
                        y: a.y - b.y
                    }).abs();
                    this.life = this.len < lineMaxLength;
                    this.alptha = 1 - this.len / lineMaxLength;
                };

                function update() {
                    self.shadow();
                    var ls = [];
                    var len = ps.length;
                    ps.forEach(function (t, i) {
                        t.move();
                        self.point({
                            x: t.x,
                            y: t.y,
                            r: t.r,
                            color: t.color
                        });
                        for (var j = i + 1; j < len; j++) {
                            var li = new Line(t, ps[j]);
                            if (li.life) ls[ls.length] = li;
                        }
                    });
                    ls.forEach(function (t) {
                        self.setLineWidth(ctx, t.alptha * 2.5);
                        self.setStrokeStyle(ctx, color.mix(t.a.color, t.b.color));
                        // 'rgba(200,200,200,' + alptha + ')';
                        self.link([t.a, t.b]);
                    });
                }

                toucher([{
                    el: self.canvas,
                    callback: function callback(item, ev) {
                        var pos = _.pos(ev);
                        ps[ps.length] = p.clone({
                            x: pos.x,
                            y: pos.y,
                            r: _randomR(),
                            color: color.rgb()
                        });
                        ps.length >= maxNum && ps.shift();
                    }
                }, {
                    el: self.canvas,
                    type: "touchmove",
                    callback: function callback(item, ev) {
                        var pos = _.pos(ev);
                        var p = ps[ps.length - 1];
                        p.x = pos.x;
                        p.y = pos.y;
                    }
                }]);

                _.animate(function () {
                    update();
                    render();
                });
            },
            //烟花
            firework: function firework(opt) {
                opt = opt || {};
                var self = this,
                    ctx = this.context,
                    width = this.width,
                    height = this.height,
                    fs = [],
                    fws = [],
                    num = opt.num || 5,
                    range = 100,
                    colorArr = _.color.circle(num),
                    o = this.o;

                var Fire = function Fire() {
                    this.x = Math.random() * range / 2 - range / 4 + o.x;
                    this.y = Math.random() * range * 2 + height;
                    this.r = Math.random() + 0.5;
                    this.color = '#fd1';
                    this.vx = Math.random() - 0.5;
                    this.vy = -(Math.random() + 4);
                    this.ax = Math.random() * 0.02 - 0.01;
                    this.far = Math.random() * range + (o.y - range);
                    this.base = {
                        x: this.x,
                        y: this.y,
                        vx: this.vx
                    };
                };
                Fire.prototype.reset = function () {
                    this.y = this.base.y;
                    this.x = this.base.x;
                    this.vx = this.base.vx;
                    this.ax = Math.random() * 0.02 - 0.01;
                    this.reborn = false;
                };
                Fire.prototype.move = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx += this.ax;
                    if (this.y <= this.far) {
                        this.reborn = true;
                    }
                    return this;
                };

                var Firework = function Firework(fire, color) {
                    this.x = fire.x;
                    this.y = fire.y;
                    this.r = Math.random() + 1.5;
                    this.color = color;
                    this.vx = Math.random() * 5 - 2.5;
                    this.vy = Math.random() * -5 + 1.5;
                    this.ay = 0.05;
                    this.alpha = 1;
                    this.life = Math.round(Math.random() * range / 2) + range / 2;
                    this.base = {
                        life: this.life,
                        r: this.r
                    };
                };

                Firework.prototype.move = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy += this.ay;
                    this.alpha = this.life / this.base.life;
                    this.r = this.alpha * this.base.r;
                    this.alpha = this.alpha > 0.6 ? 1 : this.alpha;
                    this.life--;
                    if (this.life <= 0) this.die = true;
                    return this;
                };
                for (var i = 0; i < num; i++) {
                    fs[fs.length] = new Fire();
                }

                function update() {
                    fs.forEach(function (t, i) {
                        if (t.move().reborn) {
                            var len = 20;
                            while (len--) {
                                fws[fws.length] = new Firework(t, colorArr[i]);
                            }t.reset();
                        }
                    });

                    for (var i = fws.length - 1; i >= 0; i--) {
                        var fw = fws[i];
                        fw && fw.move().die && fws.splice(i, 1);
                    }
                }

                function render() {
                    self.shadow();
                    self.setGlobalCompositeOperation(ctx, 'screen');
                    self.setGlobalAlpha(ctx, 1);
                    fs.forEach(function (t) {
                        self.point({
                            x: t.x,
                            y: t.y,
                            r: t.r,
                            color: t.color
                        });
                    });
                    fws.forEach(function (t) {
                        self.setGlobalAlpha(ctx, t.alpha);
                        self.point({
                            x: t.x,
                            y: t.y,
                            r: t.r,
                            color: t.color
                        });
                    });
                }

                _.animate(function () {
                    update();
                    render();
                });
            },
            //下雨
            rain: function rain(opt) {
                opt = opt || {};
                var self = this,
                    ctx = this.context,
                    width = this.width,
                    height = this.height;

                //雨线
                var Line = function Line(x) {
                    var temp = 0.25 * (50 + Math.random() * 100);
                    this.speed = 2 * (Math.random() * 6 + 3);
                    this.die = false;
                    this.x = x;
                    this.y = -200;
                    this.h = temp;
                    this.color = _.color("gray").rgb(); //.rgba(0, 0, 0); //Math.floor(temp*255/75)
                };
                //雨点 
                var Drop = function Drop(x, y, color) {
                    this.die = false;
                    this.x = x;
                    this.y = y;
                    this.vx = (Math.random() - 0.5) * 8;
                    this.vy = Math.random() * -6 - 3;
                    this.r = Math.random() * 1.5 + 1, this.color = color;
                };
                //
                var gravity = 0.5; //重力
                var speedx = 0;
                var maxspeedx = 0;
                Drop.prototype.move = function () {
                    this.vx = this.vx + speedx / 2;
                    this.x = this.x + this.vx;
                    this.vy = this.vy + gravity;
                    this.y = this.y + this.vy;
                    if (this.y > height) {
                        this.die = true;
                    }
                };
                var dropList = [];
                var mousePos = [0, 0];

                function createDrops(x, y, color) {
                    var maxi = Math.floor(Math.random() * 5 + 5);
                    for (var i = 0; i < maxi; i++) {
                        dropList[dropList.length] = new Drop(x, y, color);
                    }
                }
                var ls = [];

                function update() {
                    dropList.forEach(function (t) {
                        t.move();
                    });
                    for (var i = dropList.length - 1; i >= 0; i--) {
                        if (dropList[i] && dropList[i].die) {
                            dropList.splice(i, 1);
                        }
                    }
                    speedx = speedx + (maxspeedx - speedx) / 50;

                    if (ls.length <= 50) ls[ls.length] = new Line(Math.random() * 2 * width - 0.5 * width);

                    var raindropLine = height - Math.random() * height / 5;
                    ls.forEach(function (t) {
                        if (t.y + t.h > raindropLine) {
                            if (Math.random() > 0.75) {
                                createDrops(t.x + speedx * t.h, t.y + t.h, t.color);
                                t.die = true;
                            }
                        }
                        if (t.y >= height) {
                            t.die = true;
                        } else {
                            t.y += t.speed;
                            t.x += t.speed * speedx;
                        }
                    });

                    for (var i = ls.length - 1; i >= 0; i--) {
                        ls[i] && ls[i].die && ls.splice(i, 1);
                    }
                }

                function render() {
                    self.shadow();

                    ls.forEach(function (t) {
                        ctx.strokeStyle = t.color;
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(t.x, t.y);
                        ctx.lineTo(t.x + speedx * t.h, t.y + t.h);
                        ctx.stroke();
                    });

                    dropList.forEach(function (t) {
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = t.color;
                        ctx.beginPath();
                        ctx.arc(t.x, t.y, t.r, Math.random() * Math.PI * 2, 1 * Math.PI);
                        ctx.stroke();
                    });
                }

                _.animate(function () {
                    update();
                    render();
                });
                toucher({
                    el: self.canvas,
                    type: "touchmove",
                    callback: function callback(e) {
                        mousePos[0] = e.clientX;
                        mousePos[1] = e.clientY;
                        maxspeedx = (e.clientX - width / 2) / (width / 2);
                    }
                });
            },
            // 随变
            vertexTransform: function vertexTransform(opt) {
                opt = this.default(opt);
                var self = this,
                    speed = 1,
                    ctx = this.context,
                    color = _.color().rgb();
                self.setStrokeStyle(ctx, color);

                function resetVs() {
                    var vs = _.vertex(opt).vs;
                    return vs.map(function (t) {
                        return _.extend(t, {
                            vx: (Math.random() * 2 - 1) * speed,
                            vy: (Math.random() * 2 - 1) * speed
                        });
                    });
                }
                var vs = resetVs(),
                    width = this.width,
                    height = this.height,
                    lineMaxLength = opt.lineMaxLength || _.min(width / 4, 200);
                var Line = function Line(a, b) {
                    this.a = a;
                    this.b = b;
                    this.len = _.vector({
                        x: a.x - b.x,
                        y: a.y - b.y
                    }).abs();
                    this.life = this.len < lineMaxLength;
                    this.alptha = 1 - this.len / lineMaxLength;
                };
                var ls = [];
                var len = vs.length;
                var po = _.vertex(opt).po;

                function update() {
                    self.shadow();
                    // self.setStrokeStyle(ctx, color)
                    vs.forEach(function (t, i) {
                        t.x += t.vx;
                        t.y += t.vy;

                        if (t.x < 0 || t.x > width) {
                            t.vx = -t.vx;
                        } else if (t.y < 0 || t.y > height) {
                            t.vy = -t.vy;
                        }

                        t1 = vs[i + 1 == len ? 0 : i + 1];
                        var li = new Line(t, t1);
                        ls[ls.length] = li;
                        if (ls.length > len) ls.shift();

                        if (li.alptha <= 0) {
                            t.vx = -t.vx;
                            t.vy = -t.vy;
                            // color = colorArr[j + 1 > len ? j = 0 : j++]
                        }
                    });
                    ctx.beginPath();
                    vs.forEach(function (t, i) {
                        var t1 = vs[i + 1 === len ? 0 : i + 1],
                            v1 = po.toV(t),
                            v2 = po.toV(t1);
                        var p = v1.add(v2).toP(po);

                        ctx.moveTo(t.x, t.y);
                        ctx.quadraticCurveTo(p.x, p.y, t1.x, t1.y);
                    });
                    ctx.stroke();
                }
                _.animate(update);
            },
            //转变
            vertexRotate: function vertexRotate(opt) {
                opt = this.default(opt);
                var self = this,
                    ctx = this.context,
                    vs = _.vertex(opt).vs,
                    num = opt.num || 10,
                    speed = 1,
                    color = _.color().rgb();
                self.setStrokeStyle(ctx, color);

                function update() {
                    self.shadow();
                    vs = vs.map(function (t, i) {
                        return t.rotate(i * speed);
                    });
                    self.link(vs);
                }
                _.animate(update);
            },

            //轨道
            track: function track(opt) {

                opt = opt || {};
                var times = opt.times || 360;
                var colors = _.color.circle(times + 1);
                var strategyName = opt.strategyName || opt.name || ""; //"sine"; // "sine"; //"lemniscate"
                var ts = _tarckStrategy(times, colors, strategyName);

                var trackConfig = _.extend({
                    times: times,
                    delay: 10,
                    colors: colors,
                    strategy: ts.strategy
                }, opt);
                if (strategyName) {
                    trackConfig.strategyAutoChange = false;
                    trackConfig.strategyIndex = ts.strategyIndex;
                }

                _track(draw, trackConfig).run();
            },

            //进度条 播放策略
            slider: function slider(opt) {
                var max = opt.max || 50;
                var strategyName = opt.strategyName || opt.name;
                var colors = _.color.circle(max + 1);
                var ss = _.sliderStrategy(max, colors, strategyName);
                var sliderConfig = {
                    max: max,
                    colors: colors,
                    progess: 1,
                    strategy: ss.strategy
                };
                if (strategyName) {
                    sliderConfig.strategyAutoChange = false;
                    sliderConfig.strategyIndex = ss.strategyIndex;
                }
                _.slider(draw, sliderConfig).run();
            },
            //圆内均匀分布的随机点
            randomPointInCircle: function randomPointInCircle(opt) {

                opt = opt || {};
                var self = this,
                    num = opt.num || 100,
                    r = opt.r || 100,
                    ps = [],
                    o = this.o;

                _.createClass(_.pointPolar, {
                    bound: function bound() {
                        if (this.toV().abs() > r) {
                            //圆内运动
                            //圆内相切反弹

                            //原路反弹
                            this.vx *= -1;
                            this.vy *= -1;

                            // this.va*=-1
                            // this.vr*=-1
                        }
                        return this;
                    }
                });

                for (var i = 0; i < num; i++) {
                    var p = _.pointPolar({
                        r: Math.sqrt(Math.random()) * r, //圆内平均分布 // r: random() * R, //中心多 //  
                        a: 360 * Math.random(),
                        o: o
                    });
                    ps[ps.length] = p.speed();
                }

                var update = function update() {
                    self.clear();
                    self.shape({
                        shape: "circle",
                        r: r
                    });
                    ps = ps.map(function (t) {
                        self.point({
                            x: t.x,
                            y: t.y,
                            r: 1
                        });
                        // return t.rotateXY(1,1)
                        // return t.rotate(1).move().bound()
                        return t.move().bound();
                    });
                };
                _.animate(update);
            }

        });
    }();

    // 解析draw.opt 文件
    var createOptCycle = _.createOptCycle = function (optJson) {
        var optCycle = {
            data: {},
            methods: {
                //自动增加
                autoNext: function autoNext(item, ev) {
                    if (inBrowser) {
                        var k = item.closest(".tab-body-item").attr("name");
                        var x = item.name;
                        var checked = item.checked;
                        optCycle.data[k][x].auto = checked;
                        console.log(x, checked);
                    }
                }
            },
            filters: {
                toggle: function toggle(val) {
                    return val === true ? "是" : "否";
                },
                color: function color(val) {
                    if (inBrowser) return val + '<div class="colorblock" style="background-color:' + val + '"></div>';
                    return val;
                }
            }
        };
        for (var k in optJson) {
            var o = optJson[k];
            if (_.isObject(o)) {
                optCycle.data[k] = {};
                for (var x in o) {
                    var val = o[x];
                    if (x === "switch") {
                        optCycle.data[k][x] = val;
                    } else {
                        var type = val.type;
                        var c = null;
                        switch (type) {
                            case "picker":
                            case "picker_multi":
                                c = _.cycle(val.values, val.index || 0);
                                break;
                            case "slider":
                                c = _.sliderCycle(val);
                                break;
                            case "color":
                            case "color_rgba":
                            case "color_rgb":
                                var len = val.length || 15;
                                var colorArr = ['#000', '#fff'].concat(_color().circle(len));
                                // while (len--) {
                                // if (type === "color_rgba") {
                                //     colorArr.push(co.rgba());
                                // } else if (type === "color_rgb") {
                                //     colorArr.push(co.rgb());
                                // } else {
                                //     colorArr.push(co.rgba());
                                // }
                                // }
                                c = _.cycle(colorArr, 0);
                                break;
                            case undefined:
                                if (_.isBoolean(val)) {
                                    c = _.cycle([{
                                        key: true,
                                        text: "是"
                                    }, {
                                        key: false,
                                        text: "否"
                                    }], val ? 0 : 1);
                                    c.type = "toggle";
                                    c.value = val;
                                } else if (_.isObject(val)) {
                                    if (_.isBoolean(val.value)) {
                                        c = _.cycle([{
                                            key: true,
                                            text: "是"
                                        }, {
                                            key: false,
                                            text: "否"
                                        }], val.value ? 0 : 1);
                                        c.type = "toggle";
                                        c.value = val.value;
                                    }
                                } else if (_.isString(val)) {
                                    optCycle.data[k][x] = val;
                                }
                                break;
                        }
                        if (c) {
                            if (val.text) c.text = val.text;
                            if (val.auto) c.auto = val.auto;
                            if (val.type) c.type = val.type;
                            optCycle.data[k][x] = c;
                        }
                    }
                }
            }
        }

        //init opt
        optCycle.init = function () {
            var opt = {};
            for (var k in optCycle.data) {
                var o = optCycle.data[k];
                if (_.isObject(o)) {
                    if (!!~["group", "motion"].indexOf(k)) {
                        if (o.switch === "off") continue;
                    }
                    opt[k] = {};
                    for (var x in o) {
                        var val = o[x];
                        if (_.isBoolean(val)) {
                            opt[k][x] = val;
                        } else if (_.isObject(val)) {
                            if (_.isBoolean(val.value)) {
                                opt[k][x] = val.value;
                                if (val.auto) {
                                    //自动变值下一个
                                    val.value = !val.value;
                                }
                            } else {
                                opt[k][x] = _.isObject(val.val()) ? val.val().key : val.val();
                                if (val.auto) {
                                    //自动变值下一个
                                    val.next && val.next();
                                }
                            }
                        } else if (_.isString(val)) {
                            opt[k][x] = val;
                        }
                    }
                }
            }
            return opt;
        };

        //view data
        optCycle.viewData = function () {
            var data = optCycle.data;
            var tabs = [];
            for (var k in data) {
                var tab = {
                    key: k,
                    items: [],
                    switch: "none",
                    active: false
                };
                tabs[tabs.length] = tab;

                var o = data[k];
                if (_.isObject(o)) {
                    for (var x in o) {
                        var val = o[x];
                        if (x === "text") {
                            tab[x] = val;
                        } else if (x === "switch") {
                            tab[x] = val;
                            tab[x + "Method"] = _.camelCase("next", k, x);
                        } else if (x === "active") {
                            tab[x] = val;
                        } else {
                            var item = {
                                key: x,
                                value: val,
                                text: x,
                                id: k + "_" + x
                            }; //method: _.camelCase("next", k, x),
                            if (_.isBoolean(val)) {
                                item.filter = "toggle";
                                item.value = optCycle.filters.toggle(val);
                            } else if (_.isNumber(val)) {
                                item.filter = "string";
                            } else if (_.isObject(val)) {
                                item = _.extend(item, val);
                                if (_.isBoolean(val.value)) {
                                    item.value = optCycle.filters.toggle(val.value);
                                } else {
                                    if (_.isObject(val.val())) {
                                        item.value = 'text' in val.val() ? val.val().text : val.val();
                                    } else {
                                        if (!!~["color", "lineColor", "background", "shadowColor"].indexOf(item.key)) {
                                            item.value = optCycle.filters.color(val.val());
                                        } else {
                                            item.value = val.val();
                                        }
                                    }
                                }
                            } else {
                                item.filter = x;
                            }
                            tab.items[tab.items.length] = item;
                        }
                    }
                }
            }
            return {
                tabs: tabs
            };
        };

        //设置值
        optCycle.setVal = function (key, value) {
            return _.setVal(optCycle.data, key, value);
        };
        optCycle.getVal = function (key) {
            return _.getVal(optCycle.data, key);
        };

        return optCycle;
    };

    //多线程 任务
    var tasker = _.tasker = function () {
        function Tasker(options) {
            if (!(this instanceof Tasker)) return new Tasker(options);
            var file = options.file;
            var data = this.data = options.data; //参数
            var callback = options.callback;
            if (typeof Worker !== "undefined") {
                if (typeof this.w === "undefined") {
                    this.w = new Worker(file);
                }
                this.w.addEventListener('message', function (event) {
                    //e.data为从worker线程得到的数据
                    console.log(event.data);
                    callback && callback(event.data);
                });
            }
        }
        return createClass(Tasker, {
            open: function open(name, cfg) {
                this.w.postMessage({
                    name: name,
                    act: "open",
                    cfg: _.clone(this.data, cfg)
                });
                console.log("task open: " + name);
                return this;
            },
            close: function close(name) {
                this.w.postMessage({
                    name: name,
                    act: "close"
                });
                console.log("task close: " + name);
                return this;
            }
        });
    }();

    //页面滚动  todo 兼容性有问题
    var scroller = _.scroller = function () {
        function Scroller(options) {
            if (!(this instanceof Scroller)) return new Scroller(options);
            var self = this;
            if (options) {
                var _scroll = function _scroll() {
                    toucher({
                        el: self.el, //document
                        type: "scroll",
                        callback: function callback() {
                            self.onScroll && self.onScroll.call(self.el);
                        }
                    });
                };
                self.root = document.body;
                if (_.isObject(options)) {
                    self.el = options.el ? _.query(options.el) : self.root;
                    self.onTop = options.onTop;
                    self.onBottom = options.onBottom;
                    self.onScroll = options.onScroll;
                } else if (_.isString(options)) {
                    self.el = _.query(options);
                } else if (_.isFunction(options)) {
                    self.el = self.root;
                    self.onScroll = options;
                }
                self.onScroll && _scroll();
            } else {
                self.el = self.root;
            }
            self.isRoot = !!~["HTMLHtmlElement", "HTMLBodyElement", 'htmldocument'].map(function (t) {
                return t.toLowerCase();
            }).indexOf(_.type(self.el));

            if (self.isRoot) {
                self.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            } else {
                self.scrollTop = self.el.scrollTop;
            }
        }
        return createClass(Scroller, {
            toView: function toView(el) {
                el = _.query(el) || this.el;
                el.scrollIntoView(); //只有此方法不会导致button的灵魂出窍
                //scroolTop=scrollHeight 和 scrollTo(0,h) //会导致 button失效，位置不对
            },
            atTop: function atTop() {
                //到顶 reach the top
                return this.el.scrollTop === 0;
            },
            atBottom: function atBottom() {
                //到底
                if (this.isRoot) {
                    return this.el.scrollTop + this.el.clientHeight === this.el.offsetHeight;
                } else {
                    return this.el.scrollTop + this.el.clientHeight === this.el.scrollHeight;
                }
            },

            toTop: function toTop(callback) {
                this.el.scrollTop = 0;
                callback && callback.call(this.el);
            },
            toBottom: function toBottom(callback) {
                var self = this;
                this.el.scrollTop = this.el.scrollHeight;
                callback && callback.call(this.el);
            },
            scrollpage: function scrollpage(direction, distance) {
                //方向  距离
                var self = this,
                    step = distance || 10;
                self.timer && clearTimeout(self.timer);
                self.srollerTimer && clearTimeout(self.srollerTimer);
                switch (direction) {
                    case "up":

                        self.el.scrollTop -= step;
                        break;
                    case "down":
                        self.el.scrollTop += step;
                        break;
                }
                if (!distance) {
                    self.timer = setTimeout(function () {
                        self.scrollpage.call(self, direction);
                    }, 17);
                }
            },
            to: function to(x, y) {
                window.scrollTo(x, y);
            },
            up: function up(distance) {
                this.scrollpage.call(this, "up", distance);
            },
            down: function down(distance) {
                this.scrollpage.call(this, "down", distance);
            },
            stop: function stop() {
                this.timer && clearTimeout(this.timer);
            }
        });
    }();

    //路由  todo
    // router({
    //     config:[{name:'',url:'#',template:'#tpl_id'}],
    //     pageAppend:function(){

    //     },
    //     defaultPage:"home"
    // })
    //router({"markdown":"markdown"})
    var router = _.router = function (options) {
        function Router(options) {
            if (!(this instanceof Router)) return new Router(options);
            this.pageStack = [];
            this.configs = [];
            this.pageAppend = function () {};
            this.defaultPage = null;
            this.pageIndex = 1;

            this.routes = {};
            this.defaultAction = "home";

            var self = this;
            if (options) {
                this.routes = options;
            }

            addEvent("hashchange", window, function () {
                var u = self.parseUrl();
                self._go(u.route);
            });

            if (history.state && history.state.pageIndex) {
                this.pageIndex = history.state.pageIndex;
            }

            this.pageIndex--;

            var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
            var page = self._find('url', url) || self.defaultPage;
            this._go(page);
        }
        return createClass(Router, {
            getAction: function getAction(route) {
                return this.routes[route] ? this.routes[route] : this.defaultAction;
            },
            ////////
            getSearch: function getSearch() {
                var match = location.href.replace(/#.*/, '').match(/\?.+/);
                return match ? match[0] : '';
            },

            // Gets the true hash value. Cannot use location.hash directly due to bug
            // in Firefox where location.hash will always be decoded.
            getHash: function getHash() {
                var match = location.href.match(/#(.*)$/);
                return match ? match[1] : '';
            },
            decodeFragment: function decodeFragment(fragment) {
                return decodeURI(fragment.replace(/%25/g, '%2525'));
            },
            getPath: function getPath() {
                var path = this.decodeFragment(location.pathname + this.getSearch()).slice(0); //this.root.length - 1
                return path.charAt(0) === '/' ? path.slice(1) : path;
            },
            parseUrl: function parseUrl() {
                var params = {},
                    href = location.href,
                    hash = location.hash,
                    route = hash;

                var getHash = function getHash() {
                    var match = location.href.match(/#(.*)$/);
                    return match ? match[1] : '';
                };
                var path = this.getPath();

                hash = getHash();
                // api.html?id=3&page=fff#events
                // api.html#events?id=3&page=fff
                // api.html#events/1122
                href.replace(/[?&](.+?)=([^&#]*)/g, function (_, k, v) {
                    params[k] = decodeURI(v);
                });
                //#去重
                if (hash) {
                    hash = hash.length > 1 ? hash.replace(/#+/g, "#") : "";
                    route = hash.replace(/#/g, "");
                }
                return {
                    params: params,
                    hash: hash,
                    route: route,
                    path: path
                };
            },

            ////
            push: function push(config) {
                this.configs.push(config);
                return this;
            },
            go: function go(to) {

                if (to) {
                    location.hash = to;
                }
            },
            _go: function _go(route) {
                this.pageIndex++;
                history.replaceState && history.replaceState({
                    pageIndex: this.pageIndex
                }, '', location.href);
                var a = this.getAction(route);

                if (_.isFunction(a)) {
                    a.call(this);
                } else {
                    console.log(a);
                }
                console.log(this.pageIndex);
            },
            back: function back() {
                history.back();
            },
            _back: function _back(config) {
                this.pageIndex--;
                var stack = this.pageStack.pop();
                if (!stack) {
                    return;
                }
                var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                var found = this._findInStack(url);
                if (!found) {
                    var $html = _.$(config.template).addClass('js_show').addClass(config.name);
                    $html.insertBefore(stack.dom);
                    if (!config.isBind) {
                        this._bind(config);
                    }
                    this.pageStack.push({
                        config: config,
                        dom: $html
                    });
                }
                return this;
            },
            _findInStack: function _findInStack(url) {
                var found = null;
                for (var i = 0, len = this.pageStack.length; i < len; i++) {
                    var stack = this.pageStack[i];
                    if (stack.config.url === url) {
                        found = stack;
                        break;
                    }
                }
                return found;
            },
            _find: function _find(key, value) {
                var page = null;
                for (var i = 0, len = this.configs.length; i < len; i++) {
                    if (this.configs[i][key] === value) {
                        page = this.configs[i];
                        break;
                    }
                }
                if (!page) {
                    var page = {
                        "template": value,
                        id: value,
                        url: value
                    };
                    page[key] = value;
                    this.push(page);
                }
                return page;
            },
            _bind: function _bind(page) {
                var events = page.events || {};
                for (var t in events) {
                    for (var type in events[t]) {
                        // this.$container.on(type, t, events[t][type]);
                    }
                }
                page.isBind = true;
            }
        });
    }();

    //模板标签  ([^|]+?[\|(string|file|image|time)]?     /{=([\s\S]+?)}/g; 
    var reg_tpl_tag = /{=(.*?)(?:\|(.*?))?}/g,
        reg_operation_symbol = /[\+|\-|\*|\/|\(|\)]+/g,
        //支持 加减乘除括号  operation symbol
    rootEl,
        $index = 1,
        $length = 1,
        toucher,
        customFilters = {},
        //扩展类型
    customSyntax = "",
        //书写语法   pre markdown  html text 文本格式类型
    customMethods = {},
        customDirectives = {},
        templateConfig = {},
        SYNTAX = "syntax",
        GROUP = "group",
        LAZY = "lazy",
        MORE = "more",
        DEFAULT = "default",
        DATA = "data",
        PAGESIZE = "pagesize",
        KEYWORD = "keyword",
        TEMPLATE = "template",
        NOLOOP = "noloop",
        LOOP = "loop",
        MODEL = "model",
        //双向绑定模型
    TAP = "tap",
        LONGTAP = "longtap",
        DRAG = "drag",
        ON = "on",
        //绑定事件
    BIND = "bind"; //单向绑定


    //标准过滤器
    var StandardFilters = {
        string: function string(val) {
            if (_.isArray(val) || _.isObject(val)) val = _.stringify(val); // val = JSON.stringify(val);
            return val;
        },
        //数组第一个
        first: function first(val) {
            if (_.isArray(val)) val = val[0];
            return val;
        },
        last: function last(val) {
            if (_.isArray(val)) val = val[val.length - 1];
            return val;
        },
        pre: function pre(val) {
            return _.preHtml(val);
        },
        //取整 四舍五入
        int: function int(val) {
            return _.isNumber(+val) ? Math.round(+val) : val;
        },
        number: function number(val) {
            return +val;
        },
        wan: function wan(val) {
            return +val > 10000 ? (+val / 10000).toFixed(1) + "万" : val;
        },
        fixed: function fixed(val) {
            return (+val).toFixed(1);
        },
        cent: function cent(val) {
            return (+val / 100).toFixed(2);
        },
        percent: function percent(val) {
            return Math.ceil(val * 100) + "%";
        },
        yearmonth: function yearmonth(val) {
            return new Date(+val).format("YYYY年MM月");
        },
        monthdaytime: function monthdaytime(val) {
            return new Date(+val).format("MM月DD日 HH:mm");
        },
        datetime: function datetime(val) {
            return new Date(+val).format("YYYY-MM-DD HH:mm");
        },
        date: function date(val) {
            return new Date(+val).format("YYYY-MM-DD");
        },
        time: function time(val) {
            return new Date(+val).format("HH:mm");
        },
        //默认头像
        avatar: function avatar(val) {
            return val ? ' style="background-image: url(' + val + ');"' : '';
        },

        file: function file(val) {
            ////文件加载  ajax加载 "/comein-files/" + val.substr(val.indexOf('Detail'), val.length)
            return "<div data-file='" + val + "'></div>";
        },
        text: function text(val) {
            return _.escape(val);
        }
    };
    ["markdown", "escape", "unescape"].forEach(function (t) {
        StandardFilters[t] = function (val) {
            return _[t](val);
        };
    });
    ['round', 'ceil', 'floor'].forEach(function (t) {
        StandardFilters[t] = function (val) {
            return _.isNumber(+val) ? Math[t](+val) : val;
        };
    });
    //调用过滤器 
    var callFilter = function callFilter(val, filter, data) {
        if (filter) {
            var self = this,
                _callFilter = function _callFilter(val, filterName, data) {
                var _filter = customFilters[filterName];
                if (_.isUndefined(_filter)) {
                    return val;
                } else if (_.isFunction(_filter)) {
                    val = _filter.call(self, val, data);
                } else {
                    try {
                        var fn = new Function("return (" + _filter + ".call(this,arguments[0]));");
                        val = fn.call(self, val, data);
                    } catch (e) {
                        console.log(e);
                        try {
                            var fn = new Function("data", "return (" + _filter + ");");
                            val = fn.call(self, val, data);
                        } catch (e) {
                            console.log(e);
                            val = _filter;
                        }
                    }
                }
                return val;
            };

            var fs = ("" + filter).split(","),
                len = fs.length;
            if (len > 0 && fs[len - 1] !== "string") {
                fs.push("string");
            }
            fs.forEach(function (t) {
                val = _callFilter.call(self, val, t, data);
            });
        }
        return val;
    };

    //preModel 预处理
    // <div model="name">this is a  model </div>
    //<div model="name">{=name} </div>
    var regModel = /<[^>]+?model=\"(.*?)\".*?(>.*?<)\/[^>]+?>/gi;
    var regbind = /<[^>]+?bind=\"(.*?)\".*?(>.*?<)\/[^>]+?>/gi;
    var preModel = function preModel(tpl) {
        var matcher = new RegExp([regModel.source, regbind.source].join('|') + '|$', 'gi');

        return tpl.replace(matcher, function (match, name, text, name2, text2) {
            name = name || name2;
            text = text || text2;
            return match.replace(text, ">{=" + name + "}<");
        });
    };

    //解析模板标签
    //{=name|filter}  /{=(.*?)(?:\|(.*?))?}/g
    var parseTag = _.parseTag = function (tpl, data) {
        var self = this;
        return tpl.replace(reg_tpl_tag, function (match, name, filter) {
            name = name.trim();
            filter = (filter || "string").trim();
            var val = "";
            try {
                if (filter.indexOf("$") === 0) {
                    //filter map
                    // filter = eval("data." + filter.substr(1));   //replace("$", ""));
                    filter = data[filter.substr(1)];
                }
                if ("$index" === name.toLowerCase()) {
                    return $index++;
                } else if ("$length" === name.toLowerCase()) {
                    return $length;
                } else if ("$this" === name.toLowerCase()) {
                    val = data;
                } else if (reg_operation_symbol.test(name)) {
                    val = data.cmd(name);
                } else {
                    val = _.getVal(data, name);
                }
            } catch (e) {
                console.log(e, data);
            }
            if (_.isUndefined(val)) val = "";
            return val = callFilter.call(self, val, filter, data);
        });
    };
    //解析模板
    //tpl, data, syntax, groupTpl, lazyTpl, moreTpl, defaultTpl, loop
    var parseTpl = _.parseTpl = function (cfg) {
        var self = cfg || this,
            tpl = self.tpl || getTpl(self.template),
            groupTpl = self.groupTpl,
            lazyTpl = self.lazyTpl,
            moreTpl = self.moreTpl,
            defaultTpl = self.defaultTpl,
            loop = self.loop,
            syntax = self.syntax,
            data = self.data;

        if (_.isEmpty(tpl) && _.isEmpty(groupTpl)) return "";
        if (tpl) tpl = preModel(tpl);

        $index = 1;
        var str = "";
        if (_.isUndefined(data)) {
            $length = 0;
            str = _.isUndefined(defaultTpl) ? tpl : defaultTpl;
        } else if (_.isArray(data)) {
            var $length = data.length;

            var loopNumber = Number(loop) || $length; //循环次数 NaN
            if ((moreTpl || lazyTpl) && loopNumber >= $length) loopNumber = 3;

            var ps = [],
                lastGroup = "",
                currGroup = "";

            for (var i = 0; i < $length; i++) {
                var item = data[i];
                if (!_.isUndefined(groupTpl)) {
                    //分组模板
                    currGroup = parseTag.call(self, groupTpl, item);
                    if (currGroup !== lastGroup) {
                        ps.push(currGroup);
                    }
                    lastGroup = currGroup;
                }

                if (i >= loopNumber) {
                    if (!_.isUndefined(moreTpl)) {
                        //更多模板
                        ps.push(parseTag.call(self, moreTpl, item));
                        break;
                    }

                    if (!_.isUndefined(lazyTpl)) {
                        //懒加载
                        ps.push(parseTag.call(self, lazyTpl, item));
                    } else {
                        break;
                    }
                } else {
                    if (tpl) ps.push(parseTag.call(self, tpl, item)); //模板
                }
            }
            str = ps.join('');
        } else if (_.isObject(data)) {
            $length = 1;
            if (tpl) str = parseTag.call(self, tpl, data);
        } else {
            $length = 1;
            str = tpl;
        }
        var syntax = syntax || customSyntax;
        var syntaxMap = {
            markdown: _.markdown,
            pre: _.preHtml
        };
        return syntax in syntaxMap ? syntaxMap[syntax](str) : str;
    };

    //根据名称取得tpl
    var getTpl = _.getTpl = function (tplId) {
        if (tplId) {
            var _tpl = _.query(tplId.pound());
            return _tpl && _tpl.length > 0 ? _.text(_tpl).trim() : null;
        }
        return null;
    };
    //elment的tpl
    var elTpl = function elTpl(name) {
        var tpl, id;
        if (_.hasAttr.call(this, name)) {
            id = this.attr(name);
            if (id === "this" || _.isEmpty(id)) {
                tpl = _.html(this).trim();
            } else {
                tpl = getTpl(id);
            }
        }
        return tpl;
    };

    //act : append html before 模板替换动作  默认是 html，模板内都替换
    //解析节点
    var parseEl = function parseEl() {
        var self = this,
            tpl,
            syntax,
            groupTpl,
            lazyTpl,
            moreTpl,
            defaultTpl,
            loop,
            el = self.el,
            data = self.data,
            act = self.act,
            keyword = self.keyword;
        self.tpl = self.template || elTpl.call(el, TEMPLATE);
        [GROUP, LAZY, MORE, DEFAULT].forEach(function (t) {
            if (self.templates && !_.isUndefined(self.templates[t])) {
                self[t + "Tpl"] = self.templates[t];
            } else {
                self[t + "Tpl"] = elTpl.call(el, t);
            }
        });
        if (self.tpl) {
            loop = "auto";
        } else if (self.groupTpl) {} else {
            tpl = el.html();
            loop = "1"; //非模板不循环
            if (!reg_tpl_tag.test(tpl)) {
                parseDirective.call(self, el, data);
                return false;
            }
        }
        if (_.hasAttr.call(el, SYNTAX)) syntax = el.attr(SYNTAX);
        if (_.hasAttr.call(el, NOLOOP)) loop = "1"; //数组不循环
        if (_.hasAttr.call(el, LOOP)) loop = el.attr(LOOP);
        if (_.hasAttr.call(el, PAGESIZE)) loop = el.attr(PAGESIZE); //分页
        if (_.hasAttr.call(el, DATA)) {
            //指定数据子对象
            var child = el.attr(DATA);
            // if (_.has(data, child)) data = eval("data." + child);
            if (_.has(data, child)) data = data[child];
        }
        if (_.isArray(data)) {
            //数组
            if (keyword && _.hasAttr.call(el, KEYWORD)) {
                //关键字查询
                var name = el.attr(KEYWORD);
                data = _.filter(data, function (item) {
                    var ks = name.split(",");
                    if (ks.length === 1) {
                        return _.has(_.getVal(item, name), keyword);
                    } else {
                        var flag = false;
                        ks.forEach(function (name) {
                            if (_.has(_.getVal(item, name), keyword)) flag = true;
                        });
                        return flag;
                    }
                });
            }
        }

        //计算长度
        if (_.isArray(data)) {
            $length = data.length;
        } else if (_.isUndefined(data)) {
            $length = 0;
        } else if (_.isObject(data)) {
            $length = 1;
        } else {
            $length = 1;
        }

        var tplConfig = _.clone(self, {
            data: data,
            loop: loop,
            syntax: syntax
        });
        var str = parseTpl.call(tplConfig);
        switch (act) {
            case "append":
                //兼容性处理
                // el = el.parentNode.lastElementChild || el.parentNode.lastChild;
                str = el.html() + str;
                break;
            case "before":
                str += el.html();
            default:
                break;
        }
        //如果tpl不是外部命名，区块dom内的html不需要重置,意味着之前通过dom操作获取的节点，在模板解析后还可以用。
        if (self.tpl || el.attr(TEMPLATE) || el.attr(GROUP)) el.html(str);
        parseDirective.call(self, el, data);
    };

    //标准指令
    var StandardDirectives = {};

    //指令解析
    var parseDirective = function parseDirective(elem, data) {
        var self = this,
            elemModel = elem.query(MODEL.brackets());
        var onHandler = function onHandler(item, ev) {
            if (_.isElement(this)) {
                var name = this.attr(ON),
                    method = self.methods[name]; //每个独立methods
                method && _.isFunction(method) && method.call(self, this, ev);
            }
        };

        var dragHandler = function dragHandler() {
            console.log("dragHandler");
        };
        StandardDirectives[ON] = onHandler;

        var type;
        _.each(StandardDirectives, function (fn, key) {
            if (key === DRAG) {
                type = DRAG;
            } else {
                type = TAP;
            }
            var el = _.$(key.brackets(elem));

            if (ON !== key) {
                var customHandler = function customHandler(item, ev) {
                    var method = self.methods["_on_" + key];
                    if (method && _.isFunction(method)) {
                        method.call(self, item, ev);
                    }
                };
                toucher({
                    el: el,
                    type: type,
                    clear: true,
                    listener: customHandler
                });
            } else {
                toucher({
                    el: el,
                    type: type,
                    clear: true,
                    listener: fn
                });
            }
        });

        //双向数据绑定
        elemModel && elemModel.length > 0 && elemModel.each(function (item, index) {
            var name = this.attr(MODEL),
                v = _.query(this).val();
            template.prototype[name] = v;
            var _result = _.clone(template.prototype);
            Object.defineProperty(template.prototype, name, {
                set: function set(newVal) {
                    //监控数据被修改
                    var oldVal = _result[name];
                    _result[name] = newVal;
                    if (newVal !== oldVal) {
                        template.prototype.apply(name, newVal);
                    }
                },
                get: function get() {
                    return _result[name];
                },
                enumerable: true,
                configurable: true
            });
        });

        //model change 数据绑定
        elemModel && elemModel.length > 0 && elemModel.on("keyup", function () {
            var v = _.query(this).val(),
                name = this.attr(MODEL);
            elem.query(MODEL.brackets()).html(v);
            console.log(v, name);

            template.prototype[name] = v;
        });
    };

    //模板构造函数 
    var template = _.template = function () {
        function Template(options) {
            if (!(this instanceof Template)) return new Template(options);
            var self = this,

            // args = Array.prototype.slice.call(arguments),
            len = arguments.length;
            self.methods = {};

            switch (len) {
                case 0:
                    if (_.isEmpty(self.el)) return;
                    break;
                case 1:
                    if (_.isArray(options)) {
                        return options.map(function (t) {
                            return template(t);
                        });
                    } else if (_.isObject(options)) {
                        _.each(options, function (v, k) {
                            switch (k) {
                                case "el":
                                    self.el = options.el;
                                    if (_.isString(self.el)) self.el = _.query(self.selector = self.el);
                                    if (_.isJQuery(self.el)) self.el = _.jqToEl(self.el, _.autoid);
                                    if (_.isElement(self.el) || _.isArray(self.el) && _.size(self.el) > 0) {
                                        rootEl = self.el;
                                    } else {
                                        console.log("not query el" + options.el);
                                        self.el = document.createElement("div");
                                        self.el.id = options.el.replace("#", "");
                                        if (options.template) {
                                            self.el.setAttribute("template", options.template.replace("#", ""));
                                        }
                                        if (options.container) {
                                            _.query(options.container).appendChild(self.el);
                                        } else {
                                            document.body.appendChild(self.el);
                                        }
                                        return false;
                                    }
                                    break;
                                case "data":
                                    self.data = _.isFunction(options.data) ? options.data() : options.data;

                                    if (_.isObject(self.data) || _.isArray(self.data)) {

                                        // try {
                                        //     console.log(self.data);
                                        //     var _result = _.clone(self.data);
                                        //     _.keys(self.data).forEach(function(key) {
                                        //         Object.defineProperty(self.data, key, {
                                        //             set: function(newVal) { //监控数据被修改
                                        //                 // var value=x;
                                        //                 console.log(_result[key], key);
                                        //                 var oldVal = _result[key];
                                        //                 console.log(self.data);
                                        //                 console.log("oldVal=" + oldVal);
                                        //                 _result[key] = newVal;
                                        //                 // result[key] = newVal;
                                        //                 console.log("newVal=" + newVal);
                                        //                 if (newVal != oldVal) {
                                        //                     self.apply(key, newVal);
                                        //                 }
                                        //             },
                                        //             get: function() {
                                        //                 console.log(_result[key], key);
                                        //                 return _result[key];
                                        //             },
                                        //             enumerable: true,
                                        //             configurable: true
                                        //         });

                                        //     })
                                        // } catch (e) {
                                        //     console.log(e);

                                        // }

                                    } else {
                                        self.data = {};
                                    }
                                    break;
                                case "syntax":
                                    self.syntax = customSyntax = options.syntax;
                                    break;
                                case "methods":
                                    self.methods = _.clone(customMethods, v);
                                    break;
                                default:
                                    self[k] = v;
                                    break;
                            }
                        });
                    }
                    break;
                default:
                    throw new Error("invalid options ,formate should be likes: {el:el,data:data}");
                    break;
            }

            customFilters = _.clone(StandardFilters, self.filters);
            _.extend(StandardDirectives, self.directives);
            // self = _.extend({ methods: {} }, self)
            _.each(self.directives, function (fn, key) {
                self.methods["_on_" + key] = fn;
            });
            options = _.extend(options, {
                el: self.el,
                methods: self.methods
            });
            //before render
            _.isFunction(self.before) && self.before.call(self, self.data);
            var el = self.el;
            if (self.act === "cloneBefore") {
                var cloneEl = _.autoid(self.el.cloneNode(true), true);
                self.el.parentNode.insertBefore(cloneEl, self.el);
                options.act = "";
                el = options.el = cloneEl;
            }
            if (self.act === "cloneAfter") {
                var cloneEl = _.autoid(self.el.cloneNode(true), true);
                self.el.parentNode.appendChild(cloneEl, self.el);
                options.act = "";
                el = options.el = cloneEl;
            }
            if (_.isElement(el)) {
                self.parser.call(options, el);
            } else if (_.isArray(el) && _.size(el) > 0) {
                el.forEach(function (t) {
                    self.parser.call(_.clone(options, {
                        el: t
                    }), t);
                });
            }
            //render ok
            _.isFunction(self.callback) && self.callback.call(options, self.data);

            //事件代理
            if (self.events) {
                if (_.isFunction(self.events)) {
                    toucher({
                        el: el,
                        type: "tap",
                        clear: true,
                        listener: self.events
                    });
                } else if (_.isObject(self.events)) {
                    var tp = [];
                    for (x in self.events) {
                        tp.push({
                            el: el,
                            type: x,
                            listener: self.events[x]
                        });
                    }
                    toucher(tp);
                }
            }
        }
        return createClass(Template, {
            parser: function parser(el) {
                var self = this;
                if (self.template || _.hasAttr.call(el, TEMPLATE) || _.hasAttr.call(el, GROUP)) {
                    parseEl.call(self);
                } else {
                    // parseEl.call(templateConfig); //self
                    //只解析[template][group]标签下的模板语言
                    var ts = el.query(TEMPLATE.brackets(), GROUP.brackets());
                    // _.isArray(ts) && ts.forEach(function(t) {
                    //     parseEl.call(_.clone(self, { el: t }));
                    // })
                    _.size(ts) > 0 && ts.each(function (item, index) {
                        parseEl.call(_.clone(self, {
                            el: item
                        }));
                    });
                }
            },
            //同步数据 [model]
            apply: function apply(key, value) {
                var _kv = function _kv(k, v) {
                    return k + "='" + v + "'";
                };
                var arr = [];
                arr.push(_kv(MODEL, key).brackets());
                arr.push(_kv(BIND, key).brackets());
                var selector = '' + arr; //"[" + MODEL + "='" + key + "'],[" + BIND + "='" + key + "']"
                rootEl.query(selector).each(function (item, index) {
                    console.log(this.tagName, item);
                    switch (this.tagName.toLowerCase()) {
                        case "div":
                            _.query(this).html(value);
                            break;
                        case "input":
                            _.query(this).val(value);
                            break;
                    }
                });
            }
        });
    }();

    //继承工具
    createClass(template, _);
    if (inBrowser) {
        if (!window._) window._ = _; //兼容 underscore
        window.tpler = _.template;
        window.toucher = _.toucher;
        window.walker = _.walker;
        window.router = _.router;
    }
    return template;
});

}).call(this,require("buffer").Buffer)
},{"buffer":5}],4:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],5:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (ArrayBuffer.isView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (ArrayBuffer.isView(buf)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":4,"ieee754":6}],6:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[1]);
