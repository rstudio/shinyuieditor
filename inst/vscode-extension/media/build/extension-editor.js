var QC = Object.defineProperty, KC = Object.defineProperties;
var qC = Object.getOwnPropertyDescriptors;
var _s = Object.getOwnPropertySymbols;
var Mg = Object.prototype.hasOwnProperty, Fg = Object.prototype.propertyIsEnumerable;
var Bg = Math.pow, Uf = (e, t, n) => t in e ? QC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, M = (e, t) => {
  for (var n in t || (t = {}))
    Mg.call(t, n) && Uf(e, n, t[n]);
  if (_s)
    for (var n of _s(t))
      Fg.call(t, n) && Uf(e, n, t[n]);
  return e;
}, H = (e, t) => KC(e, qC(t));
var Le = (e, t) => {
  var n = {};
  for (var r in e)
    Mg.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && _s)
    for (var r of _s(e))
      t.indexOf(r) < 0 && Fg.call(e, r) && (n[r] = e[r]);
  return n;
};
var XC = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Ug = (e, t, n) => (Uf(e, typeof t != "symbol" ? t + "" : t, n), n);
var ao = (e, t, n) => new Promise((r, i) => {
  var o = (s) => {
    try {
      l(n.next(s));
    } catch (u) {
      i(u);
    }
  }, a = (s) => {
    try {
      l(n.throw(s));
    } catch (u) {
      i(u);
    }
  }, l = (s) => s.done ? r(s.value) : Promise.resolve(s.value).then(o, a);
  l((n = n.apply(e, t)).next());
});
var Tz = XC((ws) => {
  const L0 = ZC;
  function ZC() {
    const e = {};
    return {
      subscribe: (t, n) => (e[t] === void 0 && (e[t] = /* @__PURE__ */ new Set()), e[t].add(n), {
        unsubscribe: () => {
          e[t].delete(n);
        }
      }),
      dispatch: (t, n) => {
        var r;
        (r = e[t]) == null || r.forEach((i) => i(n));
      }
    };
  }
  function ex(e) {
    return typeof e == "object" && e !== null;
  }
  function tx(e) {
    return ex(e) ? "path" in e : !1;
  }
  var nx = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
  function Bh(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function M0(e) {
    if (e.__esModule)
      return e;
    var t = e.default;
    if (typeof t == "function") {
      var n = function r() {
        if (this instanceof r) {
          var i = [null];
          i.push.apply(i, arguments);
          var o = Function.bind.apply(t, i);
          return new o();
        }
        return t.apply(this, arguments);
      };
      n.prototype = t.prototype;
    } else
      n = {};
    return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(n, r, i.get ? i : {
        enumerable: !0,
        get: function() {
          return e[r];
        }
      });
    }), n;
  }
  var wl = {}, rx = {
    get exports() {
      return wl;
    },
    set exports(e) {
      wl = e;
    }
  }, wc = {}, K = {}, ix = {
    get exports() {
      return K;
    },
    set exports(e) {
      K = e;
    }
  }, he = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Jl = Symbol.for("react.element"), ox = Symbol.for("react.portal"), ax = Symbol.for("react.fragment"), lx = Symbol.for("react.strict_mode"), sx = Symbol.for("react.profiler"), ux = Symbol.for("react.provider"), cx = Symbol.for("react.context"), fx = Symbol.for("react.forward_ref"), dx = Symbol.for("react.suspense"), px = Symbol.for("react.memo"), hx = Symbol.for("react.lazy"), zg = Symbol.iterator;
  function mx(e) {
    return e === null || typeof e != "object" ? null : (e = zg && e[zg] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var F0 = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, B0 = Object.assign, U0 = {};
  function ia(e, t, n) {
    this.props = e, this.context = t, this.refs = U0, this.updater = n || F0;
  }
  ia.prototype.isReactComponent = {};
  ia.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  ia.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function z0() {
  }
  z0.prototype = ia.prototype;
  function Uh(e, t, n) {
    this.props = e, this.context = t, this.refs = U0, this.updater = n || F0;
  }
  var zh = Uh.prototype = new z0();
  zh.constructor = Uh;
  B0(zh, ia.prototype);
  zh.isPureReactComponent = !0;
  var jg = Array.isArray, j0 = Object.prototype.hasOwnProperty, jh = { current: null }, W0 = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Y0(e, t, n) {
    var r, i = {}, o = null, a = null;
    if (t != null)
      for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t)
        j0.call(t, r) && !W0.hasOwnProperty(r) && (i[r] = t[r]);
    var l = arguments.length - 2;
    if (l === 1)
      i.children = n;
    else if (1 < l) {
      for (var s = Array(l), u = 0; u < l; u++)
        s[u] = arguments[u + 2];
      i.children = s;
    }
    if (e && e.defaultProps)
      for (r in l = e.defaultProps, l)
        i[r] === void 0 && (i[r] = l[r]);
    return { $$typeof: Jl, type: e, key: o, ref: a, props: i, _owner: jh.current };
  }
  function gx(e, t) {
    return { $$typeof: Jl, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
  }
  function Wh(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Jl;
  }
  function vx(e) {
    var t = { "=": "=0", ":": "=2" };
    return "$" + e.replace(/[=:]/g, function(n) {
      return t[n];
    });
  }
  var Wg = /\/+/g;
  function zf(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? vx("" + e.key) : t.toString(36);
  }
  function nu(e, t, n, r, i) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var a = !1;
    if (e === null)
      a = !0;
    else
      switch (o) {
        case "string":
        case "number":
          a = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case Jl:
            case ox:
              a = !0;
          }
      }
    if (a)
      return a = e, i = i(a), e = r === "" ? "." + zf(a, 0) : r, jg(i) ? (n = "", e != null && (n = e.replace(Wg, "$&/") + "/"), nu(i, t, n, "", function(u) {
        return u;
      })) : i != null && (Wh(i) && (i = gx(i, n + (!i.key || a && a.key === i.key ? "" : ("" + i.key).replace(Wg, "$&/") + "/") + e)), t.push(i)), 1;
    if (a = 0, r = r === "" ? "." : r + ":", jg(e))
      for (var l = 0; l < e.length; l++) {
        o = e[l];
        var s = r + zf(o, l);
        a += nu(o, t, n, s, i);
      }
    else if (s = mx(e), typeof s == "function")
      for (e = s.call(e), l = 0; !(o = e.next()).done; )
        o = o.value, s = r + zf(o, l++), a += nu(o, t, n, s, i);
    else if (o === "object")
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return a;
  }
  function Os(e, t, n) {
    if (e == null)
      return e;
    var r = [], i = 0;
    return nu(e, r, "", "", function(o) {
      return t.call(n, o, i++);
    }), r;
  }
  function yx(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t(), t.then(function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
      }, function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
      }), e._status === -1 && (e._status = 0, e._result = t);
    }
    if (e._status === 1)
      return e._result.default;
    throw e._result;
  }
  var _t = { current: null }, ru = { transition: null }, wx = { ReactCurrentDispatcher: _t, ReactCurrentBatchConfig: ru, ReactCurrentOwner: jh };
  he.Children = { map: Os, forEach: function(e, t, n) {
    Os(e, function() {
      t.apply(this, arguments);
    }, n);
  }, count: function(e) {
    var t = 0;
    return Os(e, function() {
      t++;
    }), t;
  }, toArray: function(e) {
    return Os(e, function(t) {
      return t;
    }) || [];
  }, only: function(e) {
    if (!Wh(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  } };
  he.Component = ia;
  he.Fragment = ax;
  he.Profiler = sx;
  he.PureComponent = Uh;
  he.StrictMode = lx;
  he.Suspense = dx;
  he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wx;
  he.cloneElement = function(e, t, n) {
    if (e == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = B0({}, e.props), i = e.key, o = e.ref, a = e._owner;
    if (t != null) {
      if (t.ref !== void 0 && (o = t.ref, a = jh.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
        var l = e.type.defaultProps;
      for (s in t)
        j0.call(t, s) && !W0.hasOwnProperty(s) && (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1)
      r.children = n;
    else if (1 < s) {
      l = Array(s);
      for (var u = 0; u < s; u++)
        l[u] = arguments[u + 2];
      r.children = l;
    }
    return { $$typeof: Jl, type: e.type, key: i, ref: o, props: r, _owner: a };
  };
  he.createContext = function(e) {
    return e = { $$typeof: cx, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ux, _context: e }, e.Consumer = e;
  };
  he.createElement = Y0;
  he.createFactory = function(e) {
    var t = Y0.bind(null, e);
    return t.type = e, t;
  };
  he.createRef = function() {
    return { current: null };
  };
  he.forwardRef = function(e) {
    return { $$typeof: fx, render: e };
  };
  he.isValidElement = Wh;
  he.lazy = function(e) {
    return { $$typeof: hx, _payload: { _status: -1, _result: e }, _init: yx };
  };
  he.memo = function(e, t) {
    return { $$typeof: px, type: e, compare: t === void 0 ? null : t };
  };
  he.startTransition = function(e) {
    var t = ru.transition;
    ru.transition = {};
    try {
      e();
    } finally {
      ru.transition = t;
    }
  };
  he.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  };
  he.useCallback = function(e, t) {
    return _t.current.useCallback(e, t);
  };
  he.useContext = function(e) {
    return _t.current.useContext(e);
  };
  he.useDebugValue = function() {
  };
  he.useDeferredValue = function(e) {
    return _t.current.useDeferredValue(e);
  };
  he.useEffect = function(e, t) {
    return _t.current.useEffect(e, t);
  };
  he.useId = function() {
    return _t.current.useId();
  };
  he.useImperativeHandle = function(e, t, n) {
    return _t.current.useImperativeHandle(e, t, n);
  };
  he.useInsertionEffect = function(e, t) {
    return _t.current.useInsertionEffect(e, t);
  };
  he.useLayoutEffect = function(e, t) {
    return _t.current.useLayoutEffect(e, t);
  };
  he.useMemo = function(e, t) {
    return _t.current.useMemo(e, t);
  };
  he.useReducer = function(e, t, n) {
    return _t.current.useReducer(e, t, n);
  };
  he.useRef = function(e) {
    return _t.current.useRef(e);
  };
  he.useState = function(e) {
    return _t.current.useState(e);
  };
  he.useSyncExternalStore = function(e, t, n) {
    return _t.current.useSyncExternalStore(e, t, n);
  };
  he.useTransition = function() {
    return _t.current.useTransition();
  };
  he.version = "18.2.0";
  (function(e) {
    e.exports = he;
  })(ix);
  const _ = /* @__PURE__ */ Bh(K);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var bx = K, Sx = Symbol.for("react.element"), Ex = Symbol.for("react.fragment"), Ax = Object.prototype.hasOwnProperty, Cx = bx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, xx = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V0(e, t, n) {
    var r, i = {}, o = null, a = null;
    n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
    for (r in t)
      Ax.call(t, r) && !xx.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
      for (r in t = e.defaultProps, t)
        i[r] === void 0 && (i[r] = t[r]);
    return { $$typeof: Sx, type: e, key: o, ref: a, props: i, _owner: Cx.current };
  }
  wc.Fragment = Ex;
  wc.jsx = V0;
  wc.jsxs = V0;
  (function(e) {
    e.exports = wc;
  })(rx);
  const Ge = wl.Fragment, y = wl.jsx, L = wl.jsxs;
  var ui = {}, kx = {
    get exports() {
      return ui;
    },
    set exports(e) {
      ui = e;
    }
  }, on = {}, Xd = {}, _x = {
    get exports() {
      return Xd;
    },
    set exports(e) {
      Xd = e;
    }
  }, $0 = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(e) {
    function t(B, V) {
      var G = B.length;
      B.push(V);
      e:
        for (; 0 < G; ) {
          var x = G - 1 >>> 1, C = B[x];
          if (0 < i(C, V))
            B[x] = V, B[G] = C, G = x;
          else
            break e;
        }
    }
    function n(B) {
      return B.length === 0 ? null : B[0];
    }
    function r(B) {
      if (B.length === 0)
        return null;
      var V = B[0], G = B.pop();
      if (G !== V) {
        B[0] = G;
        e:
          for (var x = 0, C = B.length, rt = C >>> 1; x < rt; ) {
            var Je = 2 * (x + 1) - 1, qe = B[Je], me = Je + 1, We = B[me];
            if (0 > i(qe, G))
              me < C && 0 > i(We, qe) ? (B[x] = We, B[me] = G, x = me) : (B[x] = qe, B[Je] = G, x = Je);
            else if (me < C && 0 > i(We, G))
              B[x] = We, B[me] = G, x = me;
            else
              break e;
          }
      }
      return V;
    }
    function i(B, V) {
      var G = B.sortIndex - V.sortIndex;
      return G !== 0 ? G : B.id - V.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var o = performance;
      e.unstable_now = function() {
        return o.now();
      };
    } else {
      var a = Date, l = a.now();
      e.unstable_now = function() {
        return a.now() - l;
      };
    }
    var s = [], u = [], c = 1, f = null, d = 3, p = !1, h = !1, m = !1, S = typeof setTimeout == "function" ? setTimeout : null, g = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate != "undefined" ? setImmediate : null;
    typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function w(B) {
      for (var V = n(u); V !== null; ) {
        if (V.callback === null)
          r(u);
        else if (V.startTime <= B)
          r(u), V.sortIndex = V.expirationTime, t(s, V);
        else
          break;
        V = n(u);
      }
    }
    function E(B) {
      if (m = !1, w(B), !h)
        if (n(s) !== null)
          h = !0, ne(k);
        else {
          var V = n(u);
          V !== null && fe(E, V.startTime - B);
        }
    }
    function k(B, V) {
      h = !1, m && (m = !1, g(O), O = -1), p = !0;
      var G = d;
      try {
        for (w(V), f = n(s); f !== null && (!(f.expirationTime > V) || B && !I()); ) {
          var x = f.callback;
          if (typeof x == "function") {
            f.callback = null, d = f.priorityLevel;
            var C = x(f.expirationTime <= V);
            V = e.unstable_now(), typeof C == "function" ? f.callback = C : f === n(s) && r(s), w(V);
          } else
            r(s);
          f = n(s);
        }
        if (f !== null)
          var rt = !0;
        else {
          var Je = n(u);
          Je !== null && fe(E, Je.startTime - V), rt = !1;
        }
        return rt;
      } finally {
        f = null, d = G, p = !1;
      }
    }
    var b = !1, A = null, O = -1, T = 5, P = -1;
    function I() {
      return !(e.unstable_now() - P < T);
    }
    function F() {
      if (A !== null) {
        var B = e.unstable_now();
        P = B;
        var V = !0;
        try {
          V = A(!0, B);
        } finally {
          V ? U() : (b = !1, A = null);
        }
      } else
        b = !1;
    }
    var U;
    if (typeof v == "function")
      U = function() {
        v(F);
      };
    else if (typeof MessageChannel != "undefined") {
      var X = new MessageChannel(), oe = X.port2;
      X.port1.onmessage = F, U = function() {
        oe.postMessage(null);
      };
    } else
      U = function() {
        S(F, 0);
      };
    function ne(B) {
      A = B, b || (b = !0, U());
    }
    function fe(B, V) {
      O = S(function() {
        B(e.unstable_now());
      }, V);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, e.unstable_continueExecution = function() {
      h || p || (h = !0, ne(k));
    }, e.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < B ? Math.floor(1e3 / B) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return d;
    }, e.unstable_getFirstCallbackNode = function() {
      return n(s);
    }, e.unstable_next = function(B) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = d;
      }
      var G = d;
      d = V;
      try {
        return B();
      } finally {
        d = G;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(B, V) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var G = d;
      d = B;
      try {
        return V();
      } finally {
        d = G;
      }
    }, e.unstable_scheduleCallback = function(B, V, G) {
      var x = e.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? x + G : x) : G = x, B) {
        case 1:
          var C = -1;
          break;
        case 2:
          C = 250;
          break;
        case 5:
          C = 1073741823;
          break;
        case 4:
          C = 1e4;
          break;
        default:
          C = 5e3;
      }
      return C = G + C, B = { id: c++, callback: V, priorityLevel: B, startTime: G, expirationTime: C, sortIndex: -1 }, G > x ? (B.sortIndex = G, t(u, B), n(s) === null && B === n(u) && (m ? (g(O), O = -1) : m = !0, fe(E, G - x))) : (B.sortIndex = C, t(s, B), h || p || (h = !0, ne(k))), B;
    }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(B) {
      var V = d;
      return function() {
        var G = d;
        d = V;
        try {
          return B.apply(this, arguments);
        } finally {
          d = G;
        }
      };
    };
  })($0);
  (function(e) {
    e.exports = $0;
  })(_x);
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var H0 = K, en = Xd;
  function z(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var G0 = /* @__PURE__ */ new Set(), bl = {};
  function qi(e, t) {
    Uo(e, t), Uo(e + "Capture", t);
  }
  function Uo(e, t) {
    for (bl[e] = t, e = 0; e < t.length; e++)
      G0.add(t[e]);
  }
  var Ar = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), Zd = Object.prototype.hasOwnProperty, Ox = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yg = {}, Vg = {};
  function Ix(e) {
    return Zd.call(Vg, e) ? !0 : Zd.call(Yg, e) ? !1 : Ox.test(e) ? Vg[e] = !0 : (Yg[e] = !0, !1);
  }
  function Tx(e, t, n, r) {
    if (n !== null && n.type === 0)
      return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Px(e, t, n, r) {
    if (t === null || typeof t == "undefined" || Tx(e, t, n, r))
      return !0;
    if (r)
      return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function Ot(e, t, n, r, i, o, a) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
  }
  var pt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    pt[e] = new Ot(e, 0, !1, e, null, !1, !1);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    pt[t] = new Ot(t, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    pt[e] = new Ot(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    pt[e] = new Ot(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    pt[e] = new Ot(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    pt[e] = new Ot(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function(e) {
    pt[e] = new Ot(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    pt[e] = new Ot(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function(e) {
    pt[e] = new Ot(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Yh = /[\-:]([a-z])/g;
  function Vh(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Yh,
      Vh
    );
    pt[t] = new Ot(t, 1, !1, e, null, !1, !1);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Yh, Vh);
    pt[t] = new Ot(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Yh, Vh);
    pt[t] = new Ot(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    pt[e] = new Ot(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  pt.xlinkHref = new Ot("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    pt[e] = new Ot(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function $h(e, t, n, r) {
    var i = pt.hasOwnProperty(t) ? pt[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Px(t, n, i, r) && (n = null), r || i === null ? Ix(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Tr = H0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Is = Symbol.for("react.element"), ho = Symbol.for("react.portal"), mo = Symbol.for("react.fragment"), Hh = Symbol.for("react.strict_mode"), ep = Symbol.for("react.profiler"), J0 = Symbol.for("react.provider"), Q0 = Symbol.for("react.context"), Gh = Symbol.for("react.forward_ref"), tp = Symbol.for("react.suspense"), np = Symbol.for("react.suspense_list"), Jh = Symbol.for("react.memo"), Br = Symbol.for("react.lazy"), K0 = Symbol.for("react.offscreen"), $g = Symbol.iterator;
  function Sa(e) {
    return e === null || typeof e != "object" ? null : (e = $g && e[$g] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var je = Object.assign, jf;
  function Wa(e) {
    if (jf === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        jf = t && t[1] || "";
      }
    return `
` + jf + e;
  }
  var Wf = !1;
  function Yf(e, t) {
    if (!e || Wf)
      return "";
    Wf = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (u) {
            var r = u;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (u) {
            r = u;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (u) {
          r = u;
        }
        e();
      }
    } catch (u) {
      if (u && r && typeof u.stack == "string") {
        for (var i = u.stack.split(`
`), o = r.stack.split(`
`), a = i.length - 1, l = o.length - 1; 1 <= a && 0 <= l && i[a] !== o[l]; )
          l--;
        for (; 1 <= a && 0 <= l; a--, l--)
          if (i[a] !== o[l]) {
            if (a !== 1 || l !== 1)
              do
                if (a--, l--, 0 > l || i[a] !== o[l]) {
                  var s = `
` + i[a].replace(" at new ", " at ");
                  return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
                }
              while (1 <= a && 0 <= l);
            break;
          }
      }
    } finally {
      Wf = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? Wa(e) : "";
  }
  function Nx(e) {
    switch (e.tag) {
      case 5:
        return Wa(e.type);
      case 16:
        return Wa("Lazy");
      case 13:
        return Wa("Suspense");
      case 19:
        return Wa("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = Yf(e.type, !1), e;
      case 11:
        return e = Yf(e.type.render, !1), e;
      case 1:
        return e = Yf(e.type, !0), e;
      default:
        return "";
    }
  }
  function rp(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case mo:
        return "Fragment";
      case ho:
        return "Portal";
      case ep:
        return "Profiler";
      case Hh:
        return "StrictMode";
      case tp:
        return "Suspense";
      case np:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Q0:
          return (e.displayName || "Context") + ".Consumer";
        case J0:
          return (e._context.displayName || "Context") + ".Provider";
        case Gh:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Jh:
          return t = e.displayName || null, t !== null ? t : rp(e.type) || "Memo";
        case Br:
          t = e._payload, e = e._init;
          try {
            return rp(e(t));
          } catch (n) {
          }
      }
    return null;
  }
  function Dx(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return rp(t);
      case 8:
        return t === Hh ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function")
          return t.displayName || t.name || null;
        if (typeof t == "string")
          return t;
    }
    return null;
  }
  function ci(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function q0(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Rx(e) {
    var t = q0(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n != "undefined" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(a) {
        r = "" + a, o.call(this, a);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(a) {
        r = "" + a;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Ts(e) {
    e._valueTracker || (e._valueTracker = Rx(e));
  }
  function X0(e) {
    if (!e)
      return !1;
    var t = e._valueTracker;
    if (!t)
      return !0;
    var n = t.getValue(), r = "";
    return e && (r = q0(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Au(e) {
    if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined")
      return null;
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  function ip(e, t) {
    var n = t.checked;
    return je({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
  }
  function Hg(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = ci(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Z0(e, t) {
    t = t.checked, t != null && $h(e, "checked", t, !1);
  }
  function op(e, t) {
    Z0(e, t);
    var n = ci(t.value), r = t.type;
    if (n != null)
      r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? ap(e, t.type, n) : t.hasOwnProperty("defaultValue") && ap(e, t.type, ci(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Gg(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
        return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function ap(e, t, n) {
    (t !== "number" || Au(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Ya = Array.isArray;
  function _o(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++)
        t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ci(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lp(e, t) {
    if (t.dangerouslySetInnerHTML != null)
      throw Error(z(91));
    return je({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Jg(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null)
          throw Error(z(92));
        if (Ya(n)) {
          if (1 < n.length)
            throw Error(z(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: ci(n) };
  }
  function ew(e, t) {
    var n = ci(t.value), r = ci(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Qg(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function tw(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function sp(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? tw(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Ps, nw = function(e) {
    return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  }(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (Ps = Ps || document.createElement("div"), Ps.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ps.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; t.firstChild; )
        e.appendChild(t.firstChild);
    }
  });
  function Sl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Za = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Lx = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Za).forEach(function(e) {
    Lx.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Za[t] = Za[e];
    });
  });
  function rw(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Za.hasOwnProperty(e) && Za[e] ? ("" + t).trim() : t + "px";
  }
  function iw(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0, i = rw(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
      }
  }
  var Mx = je({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function up(e, t) {
    if (t) {
      if (Mx[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(z(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw Error(z(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
          throw Error(z(61));
      }
      if (t.style != null && typeof t.style != "object")
        throw Error(z(62));
    }
  }
  function cp(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var fp = null;
  function Qh(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var dp = null, Oo = null, Io = null;
  function Kg(e) {
    if (e = ql(e)) {
      if (typeof dp != "function")
        throw Error(z(280));
      var t = e.stateNode;
      t && (t = Cc(t), dp(e.stateNode, e.type, t));
    }
  }
  function ow(e) {
    Oo ? Io ? Io.push(e) : Io = [e] : Oo = e;
  }
  function aw() {
    if (Oo) {
      var e = Oo, t = Io;
      if (Io = Oo = null, Kg(e), t)
        for (e = 0; e < t.length; e++)
          Kg(t[e]);
    }
  }
  function lw(e, t) {
    return e(t);
  }
  function sw() {
  }
  var Vf = !1;
  function uw(e, t, n) {
    if (Vf)
      return e(t, n);
    Vf = !0;
    try {
      return lw(e, t, n);
    } finally {
      Vf = !1, (Oo !== null || Io !== null) && (sw(), aw());
    }
  }
  function El(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var r = Cc(n);
    if (r === null)
      return null;
    n = r[t];
    e:
      switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
          break e;
        default:
          e = !1;
      }
    if (e)
      return null;
    if (n && typeof n != "function")
      throw Error(z(231, t, typeof n));
    return n;
  }
  var pp = !1;
  if (Ar)
    try {
      var Ea = {};
      Object.defineProperty(Ea, "passive", { get: function() {
        pp = !0;
      } }), window.addEventListener("test", Ea, Ea), window.removeEventListener("test", Ea, Ea);
    } catch (e) {
      pp = !1;
    }
  function Fx(e, t, n, r, i, o, a, l, s) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (c) {
      this.onError(c);
    }
  }
  var el = !1, Cu = null, xu = !1, hp = null, Bx = { onError: function(e) {
    el = !0, Cu = e;
  } };
  function Ux(e, t, n, r, i, o, a, l, s) {
    el = !1, Cu = null, Fx.apply(Bx, arguments);
  }
  function zx(e, t, n, r, i, o, a, l, s) {
    if (Ux.apply(this, arguments), el) {
      if (el) {
        var u = Cu;
        el = !1, Cu = null;
      } else
        throw Error(z(198));
      xu || (xu = !0, hp = u);
    }
  }
  function Xi(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      e = t;
      do
        t = e, t.flags & 4098 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function cw(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function qg(e) {
    if (Xi(e) !== e)
      throw Error(z(188));
  }
  function jx(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Xi(e), t === null)
        throw Error(z(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null)
        break;
      var o = i.alternate;
      if (o === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === n)
            return qg(i), e;
          if (o === r)
            return qg(i), t;
          o = o.sibling;
        }
        throw Error(z(188));
      }
      if (n.return !== r.return)
        n = i, r = o;
      else {
        for (var a = !1, l = i.child; l; ) {
          if (l === n) {
            a = !0, n = i, r = o;
            break;
          }
          if (l === r) {
            a = !0, r = i, n = o;
            break;
          }
          l = l.sibling;
        }
        if (!a) {
          for (l = o.child; l; ) {
            if (l === n) {
              a = !0, n = o, r = i;
              break;
            }
            if (l === r) {
              a = !0, r = o, n = i;
              break;
            }
            l = l.sibling;
          }
          if (!a)
            throw Error(z(189));
        }
      }
      if (n.alternate !== r)
        throw Error(z(190));
    }
    if (n.tag !== 3)
      throw Error(z(188));
    return n.stateNode.current === n ? e : t;
  }
  function fw(e) {
    return e = jx(e), e !== null ? dw(e) : null;
  }
  function dw(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      var t = dw(e);
      if (t !== null)
        return t;
      e = e.sibling;
    }
    return null;
  }
  var pw = en.unstable_scheduleCallback, Xg = en.unstable_cancelCallback, Wx = en.unstable_shouldYield, Yx = en.unstable_requestPaint, Ke = en.unstable_now, Vx = en.unstable_getCurrentPriorityLevel, Kh = en.unstable_ImmediatePriority, hw = en.unstable_UserBlockingPriority, ku = en.unstable_NormalPriority, $x = en.unstable_LowPriority, mw = en.unstable_IdlePriority, bc = null, Zn = null;
  function Hx(e) {
    if (Zn && typeof Zn.onCommitFiberRoot == "function")
      try {
        Zn.onCommitFiberRoot(bc, e, void 0, (e.current.flags & 128) === 128);
      } catch (t) {
      }
  }
  var Bn = Math.clz32 ? Math.clz32 : Qx, Gx = Math.log, Jx = Math.LN2;
  function Qx(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Gx(e) / Jx | 0) | 0;
  }
  var Ns = 64, Ds = 4194304;
  function Va(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function _u(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
      return 0;
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
    if (a !== 0) {
      var l = a & ~i;
      l !== 0 ? r = Va(l) : (o &= a, o !== 0 && (r = Va(o)));
    } else
      a = n & ~i, a !== 0 ? r = Va(a) : o !== 0 && (r = Va(o));
    if (r === 0)
      return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0))
      return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
      for (e = e.entanglements, t &= r; 0 < t; )
        n = 31 - Bn(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function Kx(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function qx(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var a = 31 - Bn(o), l = 1 << a, s = i[a];
      s === -1 ? (!(l & n) || l & r) && (i[a] = Kx(l, t)) : s <= t && (e.expiredLanes |= l), o &= ~l;
    }
  }
  function mp(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function gw() {
    var e = Ns;
    return Ns <<= 1, !(Ns & 4194240) && (Ns = 64), e;
  }
  function $f(e) {
    for (var t = [], n = 0; 31 > n; n++)
      t.push(e);
    return t;
  }
  function Ql(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Bn(t), e[t] = n;
  }
  function Xx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - Bn(n), o = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
    }
  }
  function qh(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - Bn(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var ye = 0;
  function vw(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var yw, Xh, ww, bw, Sw, gp = !1, Rs = [], qr = null, Xr = null, Zr = null, Al = /* @__PURE__ */ new Map(), Cl = /* @__PURE__ */ new Map(), jr = [], Zx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Zg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        qr = null;
        break;
      case "dragenter":
      case "dragleave":
        Xr = null;
        break;
      case "mouseover":
      case "mouseout":
        Zr = null;
        break;
      case "pointerover":
      case "pointerout":
        Al.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cl.delete(t.pointerId);
    }
  }
  function Aa(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = ql(t), t !== null && Xh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function e2(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return qr = Aa(qr, e, t, n, r, i), !0;
      case "dragenter":
        return Xr = Aa(Xr, e, t, n, r, i), !0;
      case "mouseover":
        return Zr = Aa(Zr, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return Al.set(o, Aa(Al.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, Cl.set(o, Aa(Cl.get(o) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function Ew(e) {
    var t = Ri(e.target);
    if (t !== null) {
      var n = Xi(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = cw(n), t !== null) {
            e.blockedOn = t, Sw(e.priority, function() {
              ww(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function iu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = vp(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        fp = r, n.target.dispatchEvent(r), fp = null;
      } else
        return t = ql(n), t !== null && Xh(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function ev(e, t, n) {
    iu(e) && n.delete(t);
  }
  function t2() {
    gp = !1, qr !== null && iu(qr) && (qr = null), Xr !== null && iu(Xr) && (Xr = null), Zr !== null && iu(Zr) && (Zr = null), Al.forEach(ev), Cl.forEach(ev);
  }
  function Ca(e, t) {
    e.blockedOn === t && (e.blockedOn = null, gp || (gp = !0, en.unstable_scheduleCallback(en.unstable_NormalPriority, t2)));
  }
  function xl(e) {
    function t(i) {
      return Ca(i, e);
    }
    if (0 < Rs.length) {
      Ca(Rs[0], e);
      for (var n = 1; n < Rs.length; n++) {
        var r = Rs[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (qr !== null && Ca(qr, e), Xr !== null && Ca(Xr, e), Zr !== null && Ca(Zr, e), Al.forEach(t), Cl.forEach(t), n = 0; n < jr.length; n++)
      r = jr[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < jr.length && (n = jr[0], n.blockedOn === null); )
      Ew(n), n.blockedOn === null && jr.shift();
  }
  var To = Tr.ReactCurrentBatchConfig, Ou = !0;
  function n2(e, t, n, r) {
    var i = ye, o = To.transition;
    To.transition = null;
    try {
      ye = 1, Zh(e, t, n, r);
    } finally {
      ye = i, To.transition = o;
    }
  }
  function r2(e, t, n, r) {
    var i = ye, o = To.transition;
    To.transition = null;
    try {
      ye = 4, Zh(e, t, n, r);
    } finally {
      ye = i, To.transition = o;
    }
  }
  function Zh(e, t, n, r) {
    if (Ou) {
      var i = vp(e, t, n, r);
      if (i === null)
        td(e, t, r, Iu, n), Zg(e, r);
      else if (e2(i, e, t, n, r))
        r.stopPropagation();
      else if (Zg(e, r), t & 4 && -1 < Zx.indexOf(e)) {
        for (; i !== null; ) {
          var o = ql(i);
          if (o !== null && yw(o), o = vp(e, t, n, r), o === null && td(e, t, r, Iu, n), o === i)
            break;
          i = o;
        }
        i !== null && r.stopPropagation();
      } else
        td(e, t, r, null, n);
    }
  }
  var Iu = null;
  function vp(e, t, n, r) {
    if (Iu = null, e = Qh(r), e = Ri(e), e !== null)
      if (t = Xi(e), t === null)
        e = null;
      else if (n = t.tag, n === 13) {
        if (e = cw(t), e !== null)
          return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else
        t !== e && (e = null);
    return Iu = e, null;
  }
  function Aw(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Vx()) {
          case Kh:
            return 1;
          case hw:
            return 4;
          case ku:
          case $x:
            return 16;
          case mw:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Jr = null, em = null, ou = null;
  function Cw() {
    if (ou)
      return ou;
    var e, t = em, n = t.length, r, i = "value" in Jr ? Jr.value : Jr.textContent, o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++)
      ;
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === i[o - r]; r++)
      ;
    return ou = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function au(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ls() {
    return !0;
  }
  function tv() {
    return !1;
  }
  function an(e) {
    function t(n, r, i, o, a) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
      for (var l in e)
        e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ls : tv, this.isPropagationStopped = tv, this;
    }
    return je(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ls);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ls);
    }, persist: function() {
    }, isPersistent: Ls }), t;
  }
  var oa = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, tm = an(oa), Kl = je({}, oa, { view: 0, detail: 0 }), i2 = an(Kl), Hf, Gf, xa, Sc = je({}, Kl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: nm, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== xa && (xa && e.type === "mousemove" ? (Hf = e.screenX - xa.screenX, Gf = e.screenY - xa.screenY) : Gf = Hf = 0, xa = e), Hf);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Gf;
  } }), nv = an(Sc), o2 = je({}, Sc, { dataTransfer: 0 }), a2 = an(o2), l2 = je({}, Kl, { relatedTarget: 0 }), Jf = an(l2), s2 = je({}, oa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), u2 = an(s2), c2 = je({}, oa, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), f2 = an(c2), d2 = je({}, oa, { data: 0 }), rv = an(d2), p2 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, h2 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, m2 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function g2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = m2[e]) ? !!t[e] : !1;
  }
  function nm() {
    return g2;
  }
  var v2 = je({}, Kl, { key: function(e) {
    if (e.key) {
      var t = p2[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    return e.type === "keypress" ? (e = au(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h2[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: nm, charCode: function(e) {
    return e.type === "keypress" ? au(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? au(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), y2 = an(v2), w2 = je({}, Sc, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), iv = an(w2), b2 = je({}, Kl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: nm }), S2 = an(b2), E2 = je({}, oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), A2 = an(E2), C2 = je({}, Sc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), x2 = an(C2), k2 = [9, 13, 27, 32], rm = Ar && "CompositionEvent" in window, tl = null;
  Ar && "documentMode" in document && (tl = document.documentMode);
  var _2 = Ar && "TextEvent" in window && !tl, xw = Ar && (!rm || tl && 8 < tl && 11 >= tl), ov = String.fromCharCode(32), av = !1;
  function kw(e, t) {
    switch (e) {
      case "keyup":
        return k2.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function _w(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var go = !1;
  function O2(e, t) {
    switch (e) {
      case "compositionend":
        return _w(t);
      case "keypress":
        return t.which !== 32 ? null : (av = !0, ov);
      case "textInput":
        return e = t.data, e === ov && av ? null : e;
      default:
        return null;
    }
  }
  function I2(e, t) {
    if (go)
      return e === "compositionend" || !rm && kw(e, t) ? (e = Cw(), ou = em = Jr = null, go = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return xw && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var T2 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function lv(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!T2[e.type] : t === "textarea";
  }
  function Ow(e, t, n, r) {
    ow(r), t = Tu(t, "onChange"), 0 < t.length && (n = new tm("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var nl = null, kl = null;
  function P2(e) {
    Uw(e, 0);
  }
  function Ec(e) {
    var t = wo(e);
    if (X0(t))
      return e;
  }
  function N2(e, t) {
    if (e === "change")
      return t;
  }
  var Iw = !1;
  if (Ar) {
    var Qf;
    if (Ar) {
      var Kf = "oninput" in document;
      if (!Kf) {
        var sv = document.createElement("div");
        sv.setAttribute("oninput", "return;"), Kf = typeof sv.oninput == "function";
      }
      Qf = Kf;
    } else
      Qf = !1;
    Iw = Qf && (!document.documentMode || 9 < document.documentMode);
  }
  function uv() {
    nl && (nl.detachEvent("onpropertychange", Tw), kl = nl = null);
  }
  function Tw(e) {
    if (e.propertyName === "value" && Ec(kl)) {
      var t = [];
      Ow(t, kl, e, Qh(e)), uw(P2, t);
    }
  }
  function D2(e, t, n) {
    e === "focusin" ? (uv(), nl = t, kl = n, nl.attachEvent("onpropertychange", Tw)) : e === "focusout" && uv();
  }
  function R2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ec(kl);
  }
  function L2(e, t) {
    if (e === "click")
      return Ec(t);
  }
  function M2(e, t) {
    if (e === "input" || e === "change")
      return Ec(t);
  }
  function F2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var zn = typeof Object.is == "function" ? Object.is : F2;
  function _l(e, t) {
    if (zn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length)
      return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Zd.call(t, i) || !zn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function cv(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function fv(e, t) {
    var n = cv(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t)
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = cv(n);
    }
  }
  function Pw(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pw(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Nw() {
    for (var e = window, t = Au(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch (r) {
        n = !1;
      }
      if (n)
        e = t.contentWindow;
      else
        break;
      t = Au(e.document);
    }
    return t;
  }
  function im(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function B2(e) {
    var t = Nw(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Pw(n.ownerDocument.documentElement, n)) {
      if (r !== null && im(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
          n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = fv(n, o);
          var a = fv(
            n,
            r
          );
          i && a && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; )
        e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var U2 = Ar && "documentMode" in document && 11 >= document.documentMode, vo = null, yp = null, rl = null, wp = !1;
  function dv(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    wp || vo == null || vo !== Au(r) || (r = vo, "selectionStart" in r && im(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), rl && _l(rl, r) || (rl = r, r = Tu(yp, "onSelect"), 0 < r.length && (t = new tm("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = vo)));
  }
  function Ms(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var yo = { animationend: Ms("Animation", "AnimationEnd"), animationiteration: Ms("Animation", "AnimationIteration"), animationstart: Ms("Animation", "AnimationStart"), transitionend: Ms("Transition", "TransitionEnd") }, qf = {}, Dw = {};
  Ar && (Dw = document.createElement("div").style, "AnimationEvent" in window || (delete yo.animationend.animation, delete yo.animationiteration.animation, delete yo.animationstart.animation), "TransitionEvent" in window || delete yo.transitionend.transition);
  function Ac(e) {
    if (qf[e])
      return qf[e];
    if (!yo[e])
      return e;
    var t = yo[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Dw)
        return qf[e] = t[n];
    return e;
  }
  var Rw = Ac("animationend"), Lw = Ac("animationiteration"), Mw = Ac("animationstart"), Fw = Ac("transitionend"), Bw = /* @__PURE__ */ new Map(), pv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function gi(e, t) {
    Bw.set(e, t), qi(t, [e]);
  }
  for (var Xf = 0; Xf < pv.length; Xf++) {
    var Zf = pv[Xf], z2 = Zf.toLowerCase(), j2 = Zf[0].toUpperCase() + Zf.slice(1);
    gi(z2, "on" + j2);
  }
  gi(Rw, "onAnimationEnd");
  gi(Lw, "onAnimationIteration");
  gi(Mw, "onAnimationStart");
  gi("dblclick", "onDoubleClick");
  gi("focusin", "onFocus");
  gi("focusout", "onBlur");
  gi(Fw, "onTransitionEnd");
  Uo("onMouseEnter", ["mouseout", "mouseover"]);
  Uo("onMouseLeave", ["mouseout", "mouseover"]);
  Uo("onPointerEnter", ["pointerout", "pointerover"]);
  Uo("onPointerLeave", ["pointerout", "pointerover"]);
  qi("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  qi("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  qi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  qi("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  qi("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  qi("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var $a = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), W2 = new Set("cancel close invalid load scroll toggle".split(" ").concat($a));
  function hv(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, zx(r, t, void 0, e), e.currentTarget = null;
  }
  function Uw(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var a = r.length - 1; 0 <= a; a--) {
            var l = r[a], s = l.instance, u = l.currentTarget;
            if (l = l.listener, s !== o && i.isPropagationStopped())
              break e;
            hv(i, l, u), o = s;
          }
        else
          for (a = 0; a < r.length; a++) {
            if (l = r[a], s = l.instance, u = l.currentTarget, l = l.listener, s !== o && i.isPropagationStopped())
              break e;
            hv(i, l, u), o = s;
          }
      }
    }
    if (xu)
      throw e = hp, xu = !1, hp = null, e;
  }
  function _e(e, t) {
    var n = t[Cp];
    n === void 0 && (n = t[Cp] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (zw(t, e, 2, !1), n.add(r));
  }
  function ed(e, t, n) {
    var r = 0;
    t && (r |= 4), zw(n, e, r, t);
  }
  var Fs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ol(e) {
    if (!e[Fs]) {
      e[Fs] = !0, G0.forEach(function(n) {
        n !== "selectionchange" && (W2.has(n) || ed(n, !1, e), ed(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Fs] || (t[Fs] = !0, ed("selectionchange", !1, t));
    }
  }
  function zw(e, t, n, r) {
    switch (Aw(t)) {
      case 1:
        var i = n2;
        break;
      case 4:
        i = r2;
        break;
      default:
        i = Zh;
    }
    n = i.bind(null, t, n, e), i = void 0, !pp || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function td(e, t, n, r, i) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e:
        for (; ; ) {
          if (r === null)
            return;
          var a = r.tag;
          if (a === 3 || a === 4) {
            var l = r.stateNode.containerInfo;
            if (l === i || l.nodeType === 8 && l.parentNode === i)
              break;
            if (a === 4)
              for (a = r.return; a !== null; ) {
                var s = a.tag;
                if ((s === 3 || s === 4) && (s = a.stateNode.containerInfo, s === i || s.nodeType === 8 && s.parentNode === i))
                  return;
                a = a.return;
              }
            for (; l !== null; ) {
              if (a = Ri(l), a === null)
                return;
              if (s = a.tag, s === 5 || s === 6) {
                r = o = a;
                continue e;
              }
              l = l.parentNode;
            }
          }
          r = r.return;
        }
    uw(function() {
      var u = o, c = Qh(n), f = [];
      e: {
        var d = Bw.get(e);
        if (d !== void 0) {
          var p = tm, h = e;
          switch (e) {
            case "keypress":
              if (au(n) === 0)
                break e;
            case "keydown":
            case "keyup":
              p = y2;
              break;
            case "focusin":
              h = "focus", p = Jf;
              break;
            case "focusout":
              h = "blur", p = Jf;
              break;
            case "beforeblur":
            case "afterblur":
              p = Jf;
              break;
            case "click":
              if (n.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = nv;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = a2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = S2;
              break;
            case Rw:
            case Lw:
            case Mw:
              p = u2;
              break;
            case Fw:
              p = A2;
              break;
            case "scroll":
              p = i2;
              break;
            case "wheel":
              p = x2;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = f2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = iv;
          }
          var m = (t & 4) !== 0, S = !m && e === "scroll", g = m ? d !== null ? d + "Capture" : null : d;
          m = [];
          for (var v = u, w; v !== null; ) {
            w = v;
            var E = w.stateNode;
            if (w.tag === 5 && E !== null && (w = E, g !== null && (E = El(v, g), E != null && m.push(Il(v, E, w)))), S)
              break;
            v = v.return;
          }
          0 < m.length && (d = new p(d, h, null, n, c), f.push({ event: d, listeners: m }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (d = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", d && n !== fp && (h = n.relatedTarget || n.fromElement) && (Ri(h) || h[Cr]))
            break e;
          if ((p || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, p ? (h = n.relatedTarget || n.toElement, p = u, h = h ? Ri(h) : null, h !== null && (S = Xi(h), h !== S || h.tag !== 5 && h.tag !== 6) && (h = null)) : (p = null, h = u), p !== h)) {
            if (m = nv, E = "onMouseLeave", g = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (m = iv, E = "onPointerLeave", g = "onPointerEnter", v = "pointer"), S = p == null ? d : wo(p), w = h == null ? d : wo(h), d = new m(E, v + "leave", p, n, c), d.target = S, d.relatedTarget = w, E = null, Ri(c) === u && (m = new m(g, v + "enter", h, n, c), m.target = w, m.relatedTarget = S, E = m), S = E, p && h)
              t: {
                for (m = p, g = h, v = 0, w = m; w; w = lo(w))
                  v++;
                for (w = 0, E = g; E; E = lo(E))
                  w++;
                for (; 0 < v - w; )
                  m = lo(m), v--;
                for (; 0 < w - v; )
                  g = lo(g), w--;
                for (; v--; ) {
                  if (m === g || g !== null && m === g.alternate)
                    break t;
                  m = lo(m), g = lo(g);
                }
                m = null;
              }
            else
              m = null;
            p !== null && mv(f, d, p, m, !1), h !== null && S !== null && mv(f, S, h, m, !0);
          }
        }
        e: {
          if (d = u ? wo(u) : window, p = d.nodeName && d.nodeName.toLowerCase(), p === "select" || p === "input" && d.type === "file")
            var k = N2;
          else if (lv(d))
            if (Iw)
              k = M2;
            else {
              k = R2;
              var b = D2;
            }
          else
            (p = d.nodeName) && p.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (k = L2);
          if (k && (k = k(e, u))) {
            Ow(f, k, n, c);
            break e;
          }
          b && b(e, d, u), e === "focusout" && (b = d._wrapperState) && b.controlled && d.type === "number" && ap(d, "number", d.value);
        }
        switch (b = u ? wo(u) : window, e) {
          case "focusin":
            (lv(b) || b.contentEditable === "true") && (vo = b, yp = u, rl = null);
            break;
          case "focusout":
            rl = yp = vo = null;
            break;
          case "mousedown":
            wp = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            wp = !1, dv(f, n, c);
            break;
          case "selectionchange":
            if (U2)
              break;
          case "keydown":
          case "keyup":
            dv(f, n, c);
        }
        var A;
        if (rm)
          e: {
            switch (e) {
              case "compositionstart":
                var O = "onCompositionStart";
                break e;
              case "compositionend":
                O = "onCompositionEnd";
                break e;
              case "compositionupdate":
                O = "onCompositionUpdate";
                break e;
            }
            O = void 0;
          }
        else
          go ? kw(e, n) && (O = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
        O && (xw && n.locale !== "ko" && (go || O !== "onCompositionStart" ? O === "onCompositionEnd" && go && (A = Cw()) : (Jr = c, em = "value" in Jr ? Jr.value : Jr.textContent, go = !0)), b = Tu(u, O), 0 < b.length && (O = new rv(O, e, null, n, c), f.push({ event: O, listeners: b }), A ? O.data = A : (A = _w(n), A !== null && (O.data = A)))), (A = _2 ? O2(e, n) : I2(e, n)) && (u = Tu(u, "onBeforeInput"), 0 < u.length && (c = new rv("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = A));
      }
      Uw(f, t);
    });
  }
  function Il(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Tu(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, o = i.stateNode;
      i.tag === 5 && o !== null && (i = o, o = El(e, n), o != null && r.unshift(Il(e, o, i)), o = El(e, t), o != null && r.push(Il(e, o, i))), e = e.return;
    }
    return r;
  }
  function lo(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function mv(e, t, n, r, i) {
    for (var o = t._reactName, a = []; n !== null && n !== r; ) {
      var l = n, s = l.alternate, u = l.stateNode;
      if (s !== null && s === r)
        break;
      l.tag === 5 && u !== null && (l = u, i ? (s = El(n, o), s != null && a.unshift(Il(n, s, l))) : i || (s = El(n, o), s != null && a.push(Il(n, s, l)))), n = n.return;
    }
    a.length !== 0 && e.push({ event: t, listeners: a });
  }
  var Y2 = /\r\n?/g, V2 = /\u0000|\uFFFD/g;
  function gv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Y2, `
`).replace(V2, "");
  }
  function Bs(e, t, n) {
    if (t = gv(t), gv(e) !== t && n)
      throw Error(z(425));
  }
  function Pu() {
  }
  var bp = null, Sp = null;
  function Ep(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ap = typeof setTimeout == "function" ? setTimeout : void 0, $2 = typeof clearTimeout == "function" ? clearTimeout : void 0, vv = typeof Promise == "function" ? Promise : void 0, H2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof vv != "undefined" ? function(e) {
    return vv.resolve(null).then(e).catch(G2);
  } : Ap;
  function G2(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function nd(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (r === 0) {
            e.removeChild(i), xl(t);
            return;
          }
          r--;
        } else
          n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    xl(t);
  }
  function ei(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3)
        break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?")
          break;
        if (t === "/$")
          return null;
      }
    }
    return e;
  }
  function yv(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0)
            return e;
          t--;
        } else
          n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var aa = Math.random().toString(36).slice(2), Qn = "__reactFiber$" + aa, Tl = "__reactProps$" + aa, Cr = "__reactContainer$" + aa, Cp = "__reactEvents$" + aa, J2 = "__reactListeners$" + aa, Q2 = "__reactHandles$" + aa;
  function Ri(e) {
    var t = e[Qn];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Cr] || n[Qn]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = yv(e); e !== null; ) {
            if (n = e[Qn])
              return n;
            e = yv(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ql(e) {
    return e = e[Qn] || e[Cr], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function wo(e) {
    if (e.tag === 5 || e.tag === 6)
      return e.stateNode;
    throw Error(z(33));
  }
  function Cc(e) {
    return e[Tl] || null;
  }
  var xp = [], bo = -1;
  function vi(e) {
    return { current: e };
  }
  function Ie(e) {
    0 > bo || (e.current = xp[bo], xp[bo] = null, bo--);
  }
  function ke(e, t) {
    bo++, xp[bo] = e.current, e.current = t;
  }
  var fi = {}, Et = vi(fi), Ft = vi(!1), Yi = fi;
  function zo(e, t) {
    var n = e.type.contextTypes;
    if (!n)
      return fi;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, o;
    for (o in n)
      i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function Bt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Nu() {
    Ie(Ft), Ie(Et);
  }
  function wv(e, t, n) {
    if (Et.current !== fi)
      throw Error(z(168));
    ke(Et, t), ke(Ft, n);
  }
  function jw(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function")
      return n;
    r = r.getChildContext();
    for (var i in r)
      if (!(i in t))
        throw Error(z(108, Dx(e) || "Unknown", i));
    return je({}, n, r);
  }
  function Du(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fi, Yi = Et.current, ke(Et, e), ke(Ft, Ft.current), !0;
  }
  function bv(e, t, n) {
    var r = e.stateNode;
    if (!r)
      throw Error(z(169));
    n ? (e = jw(e, t, Yi), r.__reactInternalMemoizedMergedChildContext = e, Ie(Ft), Ie(Et), ke(Et, e)) : Ie(Ft), ke(Ft, n);
  }
  var hr = null, xc = !1, rd = !1;
  function Ww(e) {
    hr === null ? hr = [e] : hr.push(e);
  }
  function K2(e) {
    xc = !0, Ww(e);
  }
  function yi() {
    if (!rd && hr !== null) {
      rd = !0;
      var e = 0, t = ye;
      try {
        var n = hr;
        for (ye = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        hr = null, xc = !1;
      } catch (i) {
        throw hr !== null && (hr = hr.slice(e + 1)), pw(Kh, yi), i;
      } finally {
        ye = t, rd = !1;
      }
    }
    return null;
  }
  var So = [], Eo = 0, Ru = null, Lu = 0, un = [], cn = 0, Vi = null, yr = 1, wr = "";
  function Ii(e, t) {
    So[Eo++] = Lu, So[Eo++] = Ru, Ru = e, Lu = t;
  }
  function Yw(e, t, n) {
    un[cn++] = yr, un[cn++] = wr, un[cn++] = Vi, Vi = e;
    var r = yr;
    e = wr;
    var i = 32 - Bn(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - Bn(t) + i;
    if (30 < o) {
      var a = i - i % 5;
      o = (r & (1 << a) - 1).toString(32), r >>= a, i -= a, yr = 1 << 32 - Bn(t) + i | n << i | r, wr = o + e;
    } else
      yr = 1 << o | n << i | r, wr = e;
  }
  function om(e) {
    e.return !== null && (Ii(e, 1), Yw(e, 1, 0));
  }
  function am(e) {
    for (; e === Ru; )
      Ru = So[--Eo], So[Eo] = null, Lu = So[--Eo], So[Eo] = null;
    for (; e === Vi; )
      Vi = un[--cn], un[cn] = null, wr = un[--cn], un[cn] = null, yr = un[--cn], un[cn] = null;
  }
  var Zt = null, Kt = null, Re = !1, Mn = null;
  function Vw(e, t) {
    var n = dn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Sv(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Zt = e, Kt = ei(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Zt = e, Kt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vi !== null ? { id: yr, overflow: wr } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = dn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Zt = e, Kt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function kp(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function _p(e) {
    if (Re) {
      var t = Kt;
      if (t) {
        var n = t;
        if (!Sv(e, t)) {
          if (kp(e))
            throw Error(z(418));
          t = ei(n.nextSibling);
          var r = Zt;
          t && Sv(e, t) ? Vw(r, n) : (e.flags = e.flags & -4097 | 2, Re = !1, Zt = e);
        }
      } else {
        if (kp(e))
          throw Error(z(418));
        e.flags = e.flags & -4097 | 2, Re = !1, Zt = e;
      }
    }
  }
  function Ev(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
      e = e.return;
    Zt = e;
  }
  function Us(e) {
    if (e !== Zt)
      return !1;
    if (!Re)
      return Ev(e), Re = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ep(e.type, e.memoizedProps)), t && (t = Kt)) {
      if (kp(e))
        throw $w(), Error(z(418));
      for (; t; )
        Vw(e, t), t = ei(t.nextSibling);
    }
    if (Ev(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(z(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Kt = ei(e.nextSibling);
                break e;
              }
              t--;
            } else
              n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Kt = null;
      }
    } else
      Kt = Zt ? ei(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $w() {
    for (var e = Kt; e; )
      e = ei(e.nextSibling);
  }
  function jo() {
    Kt = Zt = null, Re = !1;
  }
  function lm(e) {
    Mn === null ? Mn = [e] : Mn.push(e);
  }
  var q2 = Tr.ReactCurrentBatchConfig;
  function Dn(e, t) {
    if (e && e.defaultProps) {
      t = je({}, t), e = e.defaultProps;
      for (var n in e)
        t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var Mu = vi(null), Fu = null, Ao = null, sm = null;
  function um() {
    sm = Ao = Fu = null;
  }
  function cm(e) {
    var t = Mu.current;
    Ie(Mu), e._currentValue = t;
  }
  function Op(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
        break;
      e = e.return;
    }
  }
  function Po(e, t) {
    Fu = e, sm = Ao = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Lt = !0), e.firstContext = null);
  }
  function vn(e) {
    var t = e._currentValue;
    if (sm !== e)
      if (e = { context: e, memoizedValue: t, next: null }, Ao === null) {
        if (Fu === null)
          throw Error(z(308));
        Ao = e, Fu.dependencies = { lanes: 0, firstContext: e };
      } else
        Ao = Ao.next = e;
    return t;
  }
  var Li = null;
  function fm(e) {
    Li === null ? Li = [e] : Li.push(e);
  }
  function Hw(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, fm(t)) : (n.next = i.next, i.next = n), t.interleaved = n, xr(e, r);
  }
  function xr(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ur = !1;
  function dm(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Gw(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function br(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ti(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
      return null;
    if (r = r.shared, ve & 2) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, xr(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, fm(r)) : (t.next = i.next, i.next = t), r.interleaved = t, xr(e, n);
  }
  function lu(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, qh(e, n);
    }
  }
  function Av(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var i = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var a = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? i = o = a : o = o.next = a, n = n.next;
        } while (n !== null);
        o === null ? i = o = t : o = o.next = t;
      } else
        i = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Bu(e, t, n, r) {
    var i = e.updateQueue;
    Ur = !1;
    var o = i.firstBaseUpdate, a = i.lastBaseUpdate, l = i.shared.pending;
    if (l !== null) {
      i.shared.pending = null;
      var s = l, u = s.next;
      s.next = null, a === null ? o = u : a.next = u, a = s;
      var c = e.alternate;
      c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== a && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = s));
    }
    if (o !== null) {
      var f = i.baseState;
      a = 0, c = u = s = null, l = o;
      do {
        var d = l.lane, p = l.eventTime;
        if ((r & d) === d) {
          c !== null && (c = c.next = {
            eventTime: p,
            lane: 0,
            tag: l.tag,
            payload: l.payload,
            callback: l.callback,
            next: null
          });
          e: {
            var h = e, m = l;
            switch (d = t, p = n, m.tag) {
              case 1:
                if (h = m.payload, typeof h == "function") {
                  f = h.call(p, f, d);
                  break e;
                }
                f = h;
                break e;
              case 3:
                h.flags = h.flags & -65537 | 128;
              case 0:
                if (h = m.payload, d = typeof h == "function" ? h.call(p, f, d) : h, d == null)
                  break e;
                f = je({}, f, d);
                break e;
              case 2:
                Ur = !0;
            }
          }
          l.callback !== null && l.lane !== 0 && (e.flags |= 64, d = i.effects, d === null ? i.effects = [l] : d.push(l));
        } else
          p = { eventTime: p, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (u = c = p, s = f) : c = c.next = p, a |= d;
        if (l = l.next, l === null) {
          if (l = i.shared.pending, l === null)
            break;
          d = l, l = d.next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null;
        }
      } while (1);
      if (c === null && (s = f), i.baseState = s, i.firstBaseUpdate = u, i.lastBaseUpdate = c, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          a |= i.lane, i = i.next;
        while (i !== t);
      } else
        o === null && (i.shared.lanes = 0);
      Hi |= a, e.lanes = a, e.memoizedState = f;
    }
  }
  function Cv(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
      for (t = 0; t < e.length; t++) {
        var r = e[t], i = r.callback;
        if (i !== null) {
          if (r.callback = null, r = n, typeof i != "function")
            throw Error(z(191, i));
          i.call(r);
        }
      }
  }
  var Jw = new H0.Component().refs;
  function Ip(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : je({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var kc = { isMounted: function(e) {
    return (e = e._reactInternals) ? Xi(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = kt(), i = ri(e), o = br(r, i);
    o.payload = t, n != null && (o.callback = n), t = ti(e, o, i), t !== null && (Un(t, e, i, r), lu(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = kt(), i = ri(e), o = br(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ti(e, o, i), t !== null && (Un(t, e, i, r), lu(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = kt(), r = ri(e), i = br(n, r);
    i.tag = 2, t != null && (i.callback = t), t = ti(e, i, r), t !== null && (Un(t, e, r, n), lu(t, e, r));
  } };
  function xv(e, t, n, r, i, o, a) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !_l(n, r) || !_l(i, o) : !0;
  }
  function Qw(e, t, n) {
    var r = !1, i = fi, o = t.contextType;
    return typeof o == "object" && o !== null ? o = vn(o) : (i = Bt(t) ? Yi : Et.current, r = t.contextTypes, o = (r = r != null) ? zo(e, i) : fi), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kc, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function kv(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kc.enqueueReplaceState(t, t.state, null);
  }
  function Tp(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = Jw, dm(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = vn(o) : (o = Bt(t) ? Yi : Et.current, i.context = zo(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ip(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && kc.enqueueReplaceState(i, i.state, null), Bu(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function ka(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1)
            throw Error(z(309));
          var r = n.stateNode;
        }
        if (!r)
          throw Error(z(147, e));
        var i = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
          var l = i.refs;
          l === Jw && (l = i.refs = {}), a === null ? delete l[o] : l[o] = a;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string")
        throw Error(z(284));
      if (!n._owner)
        throw Error(z(290, e));
    }
    return e;
  }
  function zs(e, t) {
    throw e = Object.prototype.toString.call(t), Error(z(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function _v(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Kw(e) {
    function t(g, v) {
      if (e) {
        var w = g.deletions;
        w === null ? (g.deletions = [v], g.flags |= 16) : w.push(v);
      }
    }
    function n(g, v) {
      if (!e)
        return null;
      for (; v !== null; )
        t(g, v), v = v.sibling;
      return null;
    }
    function r(g, v) {
      for (g = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? g.set(v.key, v) : g.set(v.index, v), v = v.sibling;
      return g;
    }
    function i(g, v) {
      return g = ii(g, v), g.index = 0, g.sibling = null, g;
    }
    function o(g, v, w) {
      return g.index = w, e ? (w = g.alternate, w !== null ? (w = w.index, w < v ? (g.flags |= 2, v) : w) : (g.flags |= 2, v)) : (g.flags |= 1048576, v);
    }
    function a(g) {
      return e && g.alternate === null && (g.flags |= 2), g;
    }
    function l(g, v, w, E) {
      return v === null || v.tag !== 6 ? (v = cd(w, g.mode, E), v.return = g, v) : (v = i(v, w), v.return = g, v);
    }
    function s(g, v, w, E) {
      var k = w.type;
      return k === mo ? c(g, v, w.props.children, E, w.key) : v !== null && (v.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Br && _v(k) === v.type) ? (E = i(v, w.props), E.ref = ka(g, v, w), E.return = g, E) : (E = pu(w.type, w.key, w.props, null, g.mode, E), E.ref = ka(g, v, w), E.return = g, E);
    }
    function u(g, v, w, E) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== w.containerInfo || v.stateNode.implementation !== w.implementation ? (v = fd(w, g.mode, E), v.return = g, v) : (v = i(v, w.children || []), v.return = g, v);
    }
    function c(g, v, w, E, k) {
      return v === null || v.tag !== 7 ? (v = Bi(w, g.mode, E, k), v.return = g, v) : (v = i(v, w), v.return = g, v);
    }
    function f(g, v, w) {
      if (typeof v == "string" && v !== "" || typeof v == "number")
        return v = cd("" + v, g.mode, w), v.return = g, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case Is:
            return w = pu(v.type, v.key, v.props, null, g.mode, w), w.ref = ka(g, null, v), w.return = g, w;
          case ho:
            return v = fd(v, g.mode, w), v.return = g, v;
          case Br:
            var E = v._init;
            return f(g, E(v._payload), w);
        }
        if (Ya(v) || Sa(v))
          return v = Bi(v, g.mode, w, null), v.return = g, v;
        zs(g, v);
      }
      return null;
    }
    function d(g, v, w, E) {
      var k = v !== null ? v.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return k !== null ? null : l(g, v, "" + w, E);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Is:
            return w.key === k ? s(g, v, w, E) : null;
          case ho:
            return w.key === k ? u(g, v, w, E) : null;
          case Br:
            return k = w._init, d(
              g,
              v,
              k(w._payload),
              E
            );
        }
        if (Ya(w) || Sa(w))
          return k !== null ? null : c(g, v, w, E, null);
        zs(g, w);
      }
      return null;
    }
    function p(g, v, w, E, k) {
      if (typeof E == "string" && E !== "" || typeof E == "number")
        return g = g.get(w) || null, l(v, g, "" + E, k);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Is:
            return g = g.get(E.key === null ? w : E.key) || null, s(v, g, E, k);
          case ho:
            return g = g.get(E.key === null ? w : E.key) || null, u(v, g, E, k);
          case Br:
            var b = E._init;
            return p(g, v, w, b(E._payload), k);
        }
        if (Ya(E) || Sa(E))
          return g = g.get(w) || null, c(v, g, E, k, null);
        zs(v, E);
      }
      return null;
    }
    function h(g, v, w, E) {
      for (var k = null, b = null, A = v, O = v = 0, T = null; A !== null && O < w.length; O++) {
        A.index > O ? (T = A, A = null) : T = A.sibling;
        var P = d(g, A, w[O], E);
        if (P === null) {
          A === null && (A = T);
          break;
        }
        e && A && P.alternate === null && t(g, A), v = o(P, v, O), b === null ? k = P : b.sibling = P, b = P, A = T;
      }
      if (O === w.length)
        return n(g, A), Re && Ii(g, O), k;
      if (A === null) {
        for (; O < w.length; O++)
          A = f(g, w[O], E), A !== null && (v = o(A, v, O), b === null ? k = A : b.sibling = A, b = A);
        return Re && Ii(g, O), k;
      }
      for (A = r(g, A); O < w.length; O++)
        T = p(A, g, O, w[O], E), T !== null && (e && T.alternate !== null && A.delete(T.key === null ? O : T.key), v = o(T, v, O), b === null ? k = T : b.sibling = T, b = T);
      return e && A.forEach(function(I) {
        return t(g, I);
      }), Re && Ii(g, O), k;
    }
    function m(g, v, w, E) {
      var k = Sa(w);
      if (typeof k != "function")
        throw Error(z(150));
      if (w = k.call(w), w == null)
        throw Error(z(151));
      for (var b = k = null, A = v, O = v = 0, T = null, P = w.next(); A !== null && !P.done; O++, P = w.next()) {
        A.index > O ? (T = A, A = null) : T = A.sibling;
        var I = d(g, A, P.value, E);
        if (I === null) {
          A === null && (A = T);
          break;
        }
        e && A && I.alternate === null && t(g, A), v = o(I, v, O), b === null ? k = I : b.sibling = I, b = I, A = T;
      }
      if (P.done)
        return n(
          g,
          A
        ), Re && Ii(g, O), k;
      if (A === null) {
        for (; !P.done; O++, P = w.next())
          P = f(g, P.value, E), P !== null && (v = o(P, v, O), b === null ? k = P : b.sibling = P, b = P);
        return Re && Ii(g, O), k;
      }
      for (A = r(g, A); !P.done; O++, P = w.next())
        P = p(A, g, O, P.value, E), P !== null && (e && P.alternate !== null && A.delete(P.key === null ? O : P.key), v = o(P, v, O), b === null ? k = P : b.sibling = P, b = P);
      return e && A.forEach(function(F) {
        return t(g, F);
      }), Re && Ii(g, O), k;
    }
    function S(g, v, w, E) {
      if (typeof w == "object" && w !== null && w.type === mo && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Is:
            e: {
              for (var k = w.key, b = v; b !== null; ) {
                if (b.key === k) {
                  if (k = w.type, k === mo) {
                    if (b.tag === 7) {
                      n(g, b.sibling), v = i(b, w.props.children), v.return = g, g = v;
                      break e;
                    }
                  } else if (b.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Br && _v(k) === b.type) {
                    n(g, b.sibling), v = i(b, w.props), v.ref = ka(g, b, w), v.return = g, g = v;
                    break e;
                  }
                  n(g, b);
                  break;
                } else
                  t(g, b);
                b = b.sibling;
              }
              w.type === mo ? (v = Bi(w.props.children, g.mode, E, w.key), v.return = g, g = v) : (E = pu(w.type, w.key, w.props, null, g.mode, E), E.ref = ka(g, v, w), E.return = g, g = E);
            }
            return a(g);
          case ho:
            e: {
              for (b = w.key; v !== null; ) {
                if (v.key === b)
                  if (v.tag === 4 && v.stateNode.containerInfo === w.containerInfo && v.stateNode.implementation === w.implementation) {
                    n(g, v.sibling), v = i(v, w.children || []), v.return = g, g = v;
                    break e;
                  } else {
                    n(g, v);
                    break;
                  }
                else
                  t(g, v);
                v = v.sibling;
              }
              v = fd(w, g.mode, E), v.return = g, g = v;
            }
            return a(g);
          case Br:
            return b = w._init, S(g, v, b(w._payload), E);
        }
        if (Ya(w))
          return h(g, v, w, E);
        if (Sa(w))
          return m(g, v, w, E);
        zs(g, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? (w = "" + w, v !== null && v.tag === 6 ? (n(g, v.sibling), v = i(v, w), v.return = g, g = v) : (n(g, v), v = cd(w, g.mode, E), v.return = g, g = v), a(g)) : n(g, v);
    }
    return S;
  }
  var Wo = Kw(!0), qw = Kw(!1), Xl = {}, er = vi(Xl), Pl = vi(Xl), Nl = vi(Xl);
  function Mi(e) {
    if (e === Xl)
      throw Error(z(174));
    return e;
  }
  function pm(e, t) {
    switch (ke(Nl, t), ke(Pl, e), ke(er, Xl), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : sp(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = sp(t, e);
    }
    Ie(er), ke(er, t);
  }
  function Yo() {
    Ie(er), Ie(Pl), Ie(Nl);
  }
  function Xw(e) {
    Mi(Nl.current);
    var t = Mi(er.current), n = sp(t, e.type);
    t !== n && (ke(Pl, e), ke(er, n));
  }
  function hm(e) {
    Pl.current === e && (Ie(er), Ie(Pl));
  }
  var Be = vi(0);
  function Uu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var id = [];
  function mm() {
    for (var e = 0; e < id.length; e++)
      id[e]._workInProgressVersionPrimary = null;
    id.length = 0;
  }
  var su = Tr.ReactCurrentDispatcher, od = Tr.ReactCurrentBatchConfig, $i = 0, ze = null, it = null, at = null, zu = !1, il = !1, Dl = 0, X2 = 0;
  function mt() {
    throw Error(z(321));
  }
  function gm(e, t) {
    if (t === null)
      return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!zn(e[n], t[n]))
        return !1;
    return !0;
  }
  function vm(e, t, n, r, i, o) {
    if ($i = o, ze = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, su.current = e === null || e.memoizedState === null ? nk : rk, e = n(r, i), il) {
      o = 0;
      do {
        if (il = !1, Dl = 0, 25 <= o)
          throw Error(z(301));
        o += 1, at = it = null, t.updateQueue = null, su.current = ik, e = n(r, i);
      } while (il);
    }
    if (su.current = ju, t = it !== null && it.next !== null, $i = 0, at = it = ze = null, zu = !1, t)
      throw Error(z(300));
    return e;
  }
  function ym() {
    var e = Dl !== 0;
    return Dl = 0, e;
  }
  function Hn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return at === null ? ze.memoizedState = at = e : at = at.next = e, at;
  }
  function yn() {
    if (it === null) {
      var e = ze.alternate;
      e = e !== null ? e.memoizedState : null;
    } else
      e = it.next;
    var t = at === null ? ze.memoizedState : at.next;
    if (t !== null)
      at = t, it = e;
    else {
      if (e === null)
        throw Error(z(310));
      it = e, e = { memoizedState: it.memoizedState, baseState: it.baseState, baseQueue: it.baseQueue, queue: it.queue, next: null }, at === null ? ze.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  function Rl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ad(e) {
    var t = yn(), n = t.queue;
    if (n === null)
      throw Error(z(311));
    n.lastRenderedReducer = e;
    var r = it, i = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var a = i.next;
        i.next = o.next, o.next = a;
      }
      r.baseQueue = i = o, n.pending = null;
    }
    if (i !== null) {
      o = i.next, r = r.baseState;
      var l = a = null, s = null, u = o;
      do {
        var c = u.lane;
        if (($i & c) === c)
          s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
        else {
          var f = {
            lane: c,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null
          };
          s === null ? (l = s = f, a = r) : s = s.next = f, ze.lanes |= c, Hi |= c;
        }
        u = u.next;
      } while (u !== null && u !== o);
      s === null ? a = r : s.next = l, zn(r, t.memoizedState) || (Lt = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = s, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, ze.lanes |= o, Hi |= o, i = i.next;
      while (i !== e);
    } else
      i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function ld(e) {
    var t = yn(), n = t.queue;
    if (n === null)
      throw Error(z(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, o = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var a = i = i.next;
      do
        o = e(o, a.action), a = a.next;
      while (a !== i);
      zn(o, t.memoizedState) || (Lt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Zw() {
  }
  function eb(e, t) {
    var n = ze, r = yn(), i = t(), o = !zn(r.memoizedState, i);
    if (o && (r.memoizedState = i, Lt = !0), r = r.queue, wm(rb.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || at !== null && at.memoizedState.tag & 1) {
      if (n.flags |= 2048, Ll(9, nb.bind(null, n, r, i, t), void 0, null), lt === null)
        throw Error(z(349));
      $i & 30 || tb(n, t, i);
    }
    return i;
  }
  function tb(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function nb(e, t, n, r) {
    t.value = n, t.getSnapshot = r, ib(t) && ob(e);
  }
  function rb(e, t, n) {
    return n(function() {
      ib(t) && ob(e);
    });
  }
  function ib(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !zn(e, n);
    } catch (r) {
      return !0;
    }
  }
  function ob(e) {
    var t = xr(e, 1);
    t !== null && Un(t, e, 1, -1);
  }
  function Ov(e) {
    var t = Hn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Rl, lastRenderedState: e }, t.queue = e, e = e.dispatch = tk.bind(null, ze, e), [t.memoizedState, e];
  }
  function Ll(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function ab() {
    return yn().memoizedState;
  }
  function uu(e, t, n, r) {
    var i = Hn();
    ze.flags |= e, i.memoizedState = Ll(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function _c(e, t, n, r) {
    var i = yn();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (it !== null) {
      var a = it.memoizedState;
      if (o = a.destroy, r !== null && gm(r, a.deps)) {
        i.memoizedState = Ll(t, n, o, r);
        return;
      }
    }
    ze.flags |= e, i.memoizedState = Ll(1 | t, n, o, r);
  }
  function Iv(e, t) {
    return uu(8390656, 8, e, t);
  }
  function wm(e, t) {
    return _c(2048, 8, e, t);
  }
  function lb(e, t) {
    return _c(4, 2, e, t);
  }
  function sb(e, t) {
    return _c(4, 4, e, t);
  }
  function ub(e, t) {
    if (typeof t == "function")
      return e = e(), t(e), function() {
        t(null);
      };
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function cb(e, t, n) {
    return n = n != null ? n.concat([e]) : null, _c(4, 4, ub.bind(null, t, e), n);
  }
  function bm() {
  }
  function fb(e, t) {
    var n = yn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && gm(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function db(e, t) {
    var n = yn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && gm(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function pb(e, t, n) {
    return $i & 21 ? (zn(n, t) || (n = gw(), ze.lanes |= n, Hi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Lt = !0), e.memoizedState = n);
  }
  function Z2(e, t) {
    var n = ye;
    ye = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = od.transition;
    od.transition = {};
    try {
      e(!1), t();
    } finally {
      ye = n, od.transition = r;
    }
  }
  function hb() {
    return yn().memoizedState;
  }
  function ek(e, t, n) {
    var r = ri(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, mb(e))
      gb(t, n);
    else if (n = Hw(e, t, n, r), n !== null) {
      var i = kt();
      Un(n, e, r, i), vb(n, t, r);
    }
  }
  function tk(e, t, n) {
    var r = ri(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (mb(e))
      gb(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
        try {
          var a = t.lastRenderedState, l = o(a, n);
          if (i.hasEagerState = !0, i.eagerState = l, zn(l, a)) {
            var s = t.interleaved;
            s === null ? (i.next = i, fm(t)) : (i.next = s.next, s.next = i), t.interleaved = i;
            return;
          }
        } catch (u) {
        } finally {
        }
      n = Hw(e, t, i, r), n !== null && (i = kt(), Un(n, e, r, i), vb(n, t, r));
    }
  }
  function mb(e) {
    var t = e.alternate;
    return e === ze || t !== null && t === ze;
  }
  function gb(e, t) {
    il = zu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function vb(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, qh(e, n);
    }
  }
  var ju = { readContext: vn, useCallback: mt, useContext: mt, useEffect: mt, useImperativeHandle: mt, useInsertionEffect: mt, useLayoutEffect: mt, useMemo: mt, useReducer: mt, useRef: mt, useState: mt, useDebugValue: mt, useDeferredValue: mt, useTransition: mt, useMutableSource: mt, useSyncExternalStore: mt, useId: mt, unstable_isNewReconciler: !1 }, nk = { readContext: vn, useCallback: function(e, t) {
    return Hn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: vn, useEffect: Iv, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, uu(
      4194308,
      4,
      ub.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return uu(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return uu(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Hn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Hn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = ek.bind(null, ze, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Hn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Ov, useDebugValue: bm, useDeferredValue: function(e) {
    return Hn().memoizedState = e;
  }, useTransition: function() {
    var e = Ov(!1), t = e[0];
    return e = Z2.bind(null, e[1]), Hn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ze, i = Hn();
    if (Re) {
      if (n === void 0)
        throw Error(z(407));
      n = n();
    } else {
      if (n = t(), lt === null)
        throw Error(z(349));
      $i & 30 || tb(r, t, n);
    }
    i.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return i.queue = o, Iv(rb.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, Ll(9, nb.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Hn(), t = lt.identifierPrefix;
    if (Re) {
      var n = wr, r = yr;
      n = (r & ~(1 << 32 - Bn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Dl++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else
      n = X2++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, rk = {
    readContext: vn,
    useCallback: fb,
    useContext: vn,
    useEffect: wm,
    useImperativeHandle: cb,
    useInsertionEffect: lb,
    useLayoutEffect: sb,
    useMemo: db,
    useReducer: ad,
    useRef: ab,
    useState: function() {
      return ad(Rl);
    },
    useDebugValue: bm,
    useDeferredValue: function(e) {
      var t = yn();
      return pb(t, it.memoizedState, e);
    },
    useTransition: function() {
      var e = ad(Rl)[0], t = yn().memoizedState;
      return [e, t];
    },
    useMutableSource: Zw,
    useSyncExternalStore: eb,
    useId: hb,
    unstable_isNewReconciler: !1
  }, ik = { readContext: vn, useCallback: fb, useContext: vn, useEffect: wm, useImperativeHandle: cb, useInsertionEffect: lb, useLayoutEffect: sb, useMemo: db, useReducer: ld, useRef: ab, useState: function() {
    return ld(Rl);
  }, useDebugValue: bm, useDeferredValue: function(e) {
    var t = yn();
    return it === null ? t.memoizedState = e : pb(t, it.memoizedState, e);
  }, useTransition: function() {
    var e = ld(Rl)[0], t = yn().memoizedState;
    return [e, t];
  }, useMutableSource: Zw, useSyncExternalStore: eb, useId: hb, unstable_isNewReconciler: !1 };
  function Vo(e, t) {
    try {
      var n = "", r = t;
      do
        n += Nx(r), r = r.return;
      while (r);
      var i = n;
    } catch (o) {
      i = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function sd(e, t, n) {
    return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
  }
  function Pp(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var ok = typeof WeakMap == "function" ? WeakMap : Map;
  function yb(e, t, n) {
    n = br(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Yu || (Yu = !0, jp = r), Pp(e, t);
    }, n;
  }
  function wb(e, t, n) {
    n = br(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        Pp(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      Pp(e, t), typeof r != "function" && (ni === null ? ni = /* @__PURE__ */ new Set([this]) : ni.add(this));
      var a = t.stack;
      this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
    }), n;
  }
  function Tv(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new ok();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else
      i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = wk.bind(null, e, t, n), t.then(e, e));
  }
  function Pv(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Nv(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = br(-1, 1), t.tag = 2, ti(n, t, 1))), n.lanes |= 1), e);
  }
  var ak = Tr.ReactCurrentOwner, Lt = !1;
  function Ct(e, t, n, r) {
    t.child = e === null ? qw(t, null, n, r) : Wo(t, e.child, n, r);
  }
  function Dv(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return Po(t, i), r = vm(e, t, n, r, o, i), n = ym(), e !== null && !Lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, kr(e, t, i)) : (Re && n && om(t), t.flags |= 1, Ct(e, t, r, i), t.child);
  }
  function Rv(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Om(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, bb(e, t, o, r, i)) : (e = pu(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, !(e.lanes & i)) {
      var a = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : _l, n(a, r) && e.ref === t.ref)
        return kr(e, t, i);
    }
    return t.flags |= 1, e = ii(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function bb(e, t, n, r, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (_l(o, r) && e.ref === t.ref)
        if (Lt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0)
          e.flags & 131072 && (Lt = !0);
        else
          return t.lanes = e.lanes, kr(e, t, i);
    }
    return Np(e, t, n, r, i);
  }
  function Sb(e, t, n) {
    var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ke(xo, Ht), Ht |= n;
      else {
        if (!(n & 1073741824))
          return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ke(xo, Ht), Ht |= e, null;
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, ke(xo, Ht), Ht |= r;
      }
    else
      o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, ke(xo, Ht), Ht |= r;
    return Ct(e, t, i, n), t.child;
  }
  function Eb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Np(e, t, n, r, i) {
    var o = Bt(n) ? Yi : Et.current;
    return o = zo(t, o), Po(t, i), n = vm(e, t, n, r, o, i), r = ym(), e !== null && !Lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, kr(e, t, i)) : (Re && r && om(t), t.flags |= 1, Ct(e, t, n, i), t.child);
  }
  function Lv(e, t, n, r, i) {
    if (Bt(n)) {
      var o = !0;
      Du(t);
    } else
      o = !1;
    if (Po(t, i), t.stateNode === null)
      cu(e, t), Qw(t, n, r), Tp(t, n, r, i), r = !0;
    else if (e === null) {
      var a = t.stateNode, l = t.memoizedProps;
      a.props = l;
      var s = a.context, u = n.contextType;
      typeof u == "object" && u !== null ? u = vn(u) : (u = Bt(n) ? Yi : Et.current, u = zo(t, u));
      var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof a.getSnapshotBeforeUpdate == "function";
      f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== r || s !== u) && kv(t, a, r, u), Ur = !1;
      var d = t.memoizedState;
      a.state = d, Bu(t, r, a, i), s = t.memoizedState, l !== r || d !== s || Ft.current || Ur ? (typeof c == "function" && (Ip(t, n, c, r), s = t.memoizedState), (l = Ur || xv(t, n, l, r, d, s, u)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), a.props = r, a.state = s, a.context = u, r = l) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      a = t.stateNode, Gw(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : Dn(t.type, l), a.props = u, f = t.pendingProps, d = a.context, s = n.contextType, typeof s == "object" && s !== null ? s = vn(s) : (s = Bt(n) ? Yi : Et.current, s = zo(t, s));
      var p = n.getDerivedStateFromProps;
      (c = typeof p == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== f || d !== s) && kv(t, a, r, s), Ur = !1, d = t.memoizedState, a.state = d, Bu(t, r, a, i);
      var h = t.memoizedState;
      l !== f || d !== h || Ft.current || Ur ? (typeof p == "function" && (Ip(t, n, p, r), h = t.memoizedState), (u = Ur || xv(t, n, u, r, d, h, s) || !1) ? (c || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, h, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, h, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), a.props = r, a.state = h, a.context = s, r = u) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Dp(e, t, n, r, o, i);
  }
  function Dp(e, t, n, r, i, o) {
    Eb(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a)
      return i && bv(t, n, !1), kr(e, t, o);
    r = t.stateNode, ak.current = t;
    var l = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && a ? (t.child = Wo(t, e.child, null, o), t.child = Wo(t, null, l, o)) : Ct(e, t, l, o), t.memoizedState = r.state, i && bv(t, n, !0), t.child;
  }
  function Ab(e) {
    var t = e.stateNode;
    t.pendingContext ? wv(e, t.pendingContext, t.pendingContext !== t.context) : t.context && wv(e, t.context, !1), pm(e, t.containerInfo);
  }
  function Mv(e, t, n, r, i) {
    return jo(), lm(i), t.flags |= 256, Ct(e, t, n, r), t.child;
  }
  var Rp = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Lp(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Cb(e, t, n) {
    var r = t.pendingProps, i = Be.current, o = !1, a = (t.flags & 128) !== 0, l;
    if ((l = a) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ke(Be, i & 1), e === null)
      return _p(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Tc(a, r, 0, null), e = Bi(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Lp(n), t.memoizedState = Rp, e) : Sm(t, a));
    if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null))
      return lk(e, t, a, r, l, i, n);
    if (o) {
      o = r.fallback, a = t.mode, i = e.child, l = i.sibling;
      var s = { mode: "hidden", children: r.children };
      return !(a & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = ii(i, s), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = ii(l, o) : (o = Bi(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Lp(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Rp, r;
    }
    return o = e.child, e = o.sibling, r = ii(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function Sm(e, t) {
    return t = Tc({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function js(e, t, n, r) {
    return r !== null && lm(r), Wo(t, e.child, null, n), e = Sm(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function lk(e, t, n, r, i, o, a) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = sd(Error(z(422))), js(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Tc({ mode: "visible", children: r.children }, i, 0, null), o = Bi(o, i, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Wo(t, e.child, null, a), t.child.memoizedState = Lp(a), t.memoizedState = Rp, o);
    if (!(t.mode & 1))
      return js(e, t, a, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r)
        var l = r.dgst;
      return r = l, o = Error(z(419)), r = sd(o, r, void 0), js(e, t, a, r);
    }
    if (l = (a & e.childLanes) !== 0, Lt || l) {
      if (r = lt, r !== null) {
        switch (a & -a) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        i = i & (r.suspendedLanes | a) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, xr(e, i), Un(r, e, i, -1));
      }
      return _m(), r = sd(Error(z(421))), js(e, t, a, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = bk.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Kt = ei(i.nextSibling), Zt = t, Re = !0, Mn = null, e !== null && (un[cn++] = yr, un[cn++] = wr, un[cn++] = Vi, yr = e.id, wr = e.overflow, Vi = t), t = Sm(t, r.children), t.flags |= 4096, t);
  }
  function Fv(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Op(e.return, t, n);
  }
  function ud(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
  }
  function xb(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, o = r.tail;
    if (Ct(e, t, r.children, n), r = Be.current, r & 2)
      r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && e.flags & 128)
        e:
          for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && Fv(e, n, t);
            else if (e.tag === 19)
              Fv(e, n, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t)
              break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
      r &= 1;
    }
    if (ke(Be, r), !(t.mode & 1))
      t.memoizedState = null;
    else
      switch (i) {
        case "forwards":
          for (n = t.child, i = null; n !== null; )
            e = n.alternate, e !== null && Uu(e) === null && (i = n), n = n.sibling;
          n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ud(t, !1, i, n, o);
          break;
        case "backwards":
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (e = i.alternate, e !== null && Uu(e) === null) {
              t.child = i;
              break;
            }
            e = i.sibling, i.sibling = n, n = i, i = e;
          }
          ud(t, !0, n, null, o);
          break;
        case "together":
          ud(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function cu(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function kr(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Hi |= t.lanes, !(n & t.childLanes))
      return null;
    if (e !== null && t.child !== e.child)
      throw Error(z(153));
    if (t.child !== null) {
      for (e = t.child, n = ii(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = ii(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function sk(e, t, n) {
    switch (t.tag) {
      case 3:
        Ab(t), jo();
        break;
      case 5:
        Xw(t);
        break;
      case 1:
        Bt(t.type) && Du(t);
        break;
      case 4:
        pm(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        ke(Mu, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (ke(Be, Be.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Cb(e, t, n) : (ke(Be, Be.current & 1), e = kr(e, t, n), e !== null ? e.sibling : null);
        ke(Be, Be.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, e.flags & 128) {
          if (r)
            return xb(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ke(Be, Be.current), r)
          break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Sb(e, t, n);
    }
    return kr(e, t, n);
  }
  var kb, Mp, _b, Ob;
  kb = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6)
        e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t)
        break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t)
          return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  };
  Mp = function() {
  };
  _b = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, Mi(er.current);
      var o = null;
      switch (n) {
        case "input":
          i = ip(e, i), r = ip(e, r), o = [];
          break;
        case "select":
          i = je({}, i, { value: void 0 }), r = je({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = lp(e, i), r = lp(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Pu);
      }
      up(n, r);
      var a;
      n = null;
      for (u in i)
        if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
          if (u === "style") {
            var l = i[u];
            for (a in l)
              l.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
          } else
            u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (bl.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
      for (u in r) {
        var s = r[u];
        if (l = i != null ? i[u] : void 0, r.hasOwnProperty(u) && s !== l && (s != null || l != null))
          if (u === "style")
            if (l) {
              for (a in l)
                !l.hasOwnProperty(a) || s && s.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
              for (a in s)
                s.hasOwnProperty(a) && l[a] !== s[a] && (n || (n = {}), n[a] = s[a]);
            } else
              n || (o || (o = []), o.push(
                u,
                n
              )), n = s;
          else
            u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, s != null && l !== s && (o = o || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (bl.hasOwnProperty(u) ? (s != null && u === "onScroll" && _e("scroll", e), o || l === s || (o = [])) : (o = o || []).push(u, s));
      }
      n && (o = o || []).push("style", n);
      var u = o;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  };
  Ob = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function _a(e, t) {
    if (!Re)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function gt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t)
      for (var i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function uk(e, t, n) {
    var r = t.pendingProps;
    switch (am(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return gt(t), null;
      case 1:
        return Bt(t.type) && Nu(), gt(t), null;
      case 3:
        return r = t.stateNode, Yo(), Ie(Ft), Ie(Et), mm(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Us(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Mn !== null && (Vp(Mn), Mn = null))), Mp(e, t), gt(t), null;
      case 5:
        hm(t);
        var i = Mi(Nl.current);
        if (n = t.type, e !== null && t.stateNode != null)
          _b(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(z(166));
            return gt(t), null;
          }
          if (e = Mi(er.current), Us(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[Qn] = t, r[Tl] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                _e("cancel", r), _e("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                _e("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < $a.length; i++)
                  _e($a[i], r);
                break;
              case "source":
                _e("error", r);
                break;
              case "img":
              case "image":
              case "link":
                _e(
                  "error",
                  r
                ), _e("load", r);
                break;
              case "details":
                _e("toggle", r);
                break;
              case "input":
                Hg(r, o), _e("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, _e("invalid", r);
                break;
              case "textarea":
                Jg(r, o), _e("invalid", r);
            }
            up(n, o), i = null;
            for (var a in o)
              if (o.hasOwnProperty(a)) {
                var l = o[a];
                a === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && Bs(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && Bs(
                  r.textContent,
                  l,
                  e
                ), i = ["children", "" + l]) : bl.hasOwnProperty(a) && l != null && a === "onScroll" && _e("scroll", r);
              }
            switch (n) {
              case "input":
                Ts(r), Gg(r, o, !0);
                break;
              case "textarea":
                Ts(r), Qg(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Pu);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            a = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = tw(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Qn] = t, e[Tl] = r, kb(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (a = cp(n, r), n) {
                case "dialog":
                  _e("cancel", e), _e("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  _e("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < $a.length; i++)
                    _e($a[i], e);
                  i = r;
                  break;
                case "source":
                  _e("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  _e(
                    "error",
                    e
                  ), _e("load", e), i = r;
                  break;
                case "details":
                  _e("toggle", e), i = r;
                  break;
                case "input":
                  Hg(e, r), i = ip(e, r), _e("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = je({}, r, { value: void 0 }), _e("invalid", e);
                  break;
                case "textarea":
                  Jg(e, r), i = lp(e, r), _e("invalid", e);
                  break;
                default:
                  i = r;
              }
              up(n, i), l = i;
              for (o in l)
                if (l.hasOwnProperty(o)) {
                  var s = l[o];
                  o === "style" ? iw(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && nw(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Sl(e, s) : typeof s == "number" && Sl(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (bl.hasOwnProperty(o) ? s != null && o === "onScroll" && _e("scroll", e) : s != null && $h(e, o, s, a));
                }
              switch (n) {
                case "input":
                  Ts(e), Gg(e, r, !1);
                  break;
                case "textarea":
                  Ts(e), Qg(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ci(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? _o(e, !!r.multiple, o, !1) : r.defaultValue != null && _o(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = Pu);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return gt(t), null;
      case 6:
        if (e && t.stateNode != null)
          Ob(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(z(166));
          if (n = Mi(Nl.current), Mi(er.current), Us(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Qn] = t, (o = r.nodeValue !== n) && (e = Zt, e !== null))
              switch (e.tag) {
                case 3:
                  Bs(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 && Bs(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            o && (t.flags |= 4);
          } else
            r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Qn] = t, t.stateNode = r;
        }
        return gt(t), null;
      case 13:
        if (Ie(Be), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Re && Kt !== null && t.mode & 1 && !(t.flags & 128))
            $w(), jo(), t.flags |= 98560, o = !1;
          else if (o = Us(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o)
                throw Error(z(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                throw Error(z(317));
              o[Qn] = t;
            } else
              jo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            gt(t), o = !1;
          } else
            Mn !== null && (Vp(Mn), Mn = null), o = !0;
          if (!o)
            return t.flags & 65536 ? t : null;
        }
        return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Be.current & 1 ? ot === 0 && (ot = 3) : _m())), t.updateQueue !== null && (t.flags |= 4), gt(t), null);
      case 4:
        return Yo(), Mp(e, t), e === null && Ol(t.stateNode.containerInfo), gt(t), null;
      case 10:
        return cm(t.type._context), gt(t), null;
      case 17:
        return Bt(t.type) && Nu(), gt(t), null;
      case 19:
        if (Ie(Be), o = t.memoizedState, o === null)
          return gt(t), null;
        if (r = (t.flags & 128) !== 0, a = o.rendering, a === null)
          if (r)
            _a(o, !1);
          else {
            if (ot !== 0 || e !== null && e.flags & 128)
              for (e = t.child; e !== null; ) {
                if (a = Uu(e), a !== null) {
                  for (t.flags |= 128, _a(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                    o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                  return ke(Be, Be.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null && Ke() > $o && (t.flags |= 128, r = !0, _a(o, !1), t.lanes = 4194304);
          }
        else {
          if (!r)
            if (e = Uu(a), e !== null) {
              if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _a(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Re)
                return gt(t), null;
            } else
              2 * Ke() - o.renderingStartTime > $o && n !== 1073741824 && (t.flags |= 128, r = !0, _a(o, !1), t.lanes = 4194304);
          o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ke(), t.sibling = null, n = Be.current, ke(Be, r ? n & 1 | 2 : n & 1), t) : (gt(t), null);
      case 22:
      case 23:
        return km(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ht & 1073741824 && (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(z(156, t.tag));
  }
  function ck(e, t) {
    switch (am(t), t.tag) {
      case 1:
        return Bt(t.type) && Nu(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Yo(), Ie(Ft), Ie(Et), mm(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return hm(t), null;
      case 13:
        if (Ie(Be), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(z(340));
          jo();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ie(Be), null;
      case 4:
        return Yo(), null;
      case 10:
        return cm(t.type._context), null;
      case 22:
      case 23:
        return km(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ws = !1, bt = !1, fk = typeof WeakSet == "function" ? WeakSet : Set, Q = null;
  function Co(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ve(e, t, r);
        }
      else
        n.current = null;
  }
  function Fp(e, t, n) {
    try {
      n();
    } catch (r) {
      Ve(e, t, r);
    }
  }
  var Bv = !1;
  function dk(e, t) {
    if (bp = Ou, e = Nw(), im(e)) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var i = r.anchorOffset, o = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, o.nodeType;
            } catch (E) {
              n = null;
              break e;
            }
            var a = 0, l = -1, s = -1, u = 0, c = 0, f = e, d = null;
            t:
              for (; ; ) {
                for (var p; f !== n || i !== 0 && f.nodeType !== 3 || (l = a + i), f !== o || r !== 0 && f.nodeType !== 3 || (s = a + r), f.nodeType === 3 && (a += f.nodeValue.length), (p = f.firstChild) !== null; )
                  d = f, f = p;
                for (; ; ) {
                  if (f === e)
                    break t;
                  if (d === n && ++u === i && (l = a), d === o && ++c === r && (s = a), (p = f.nextSibling) !== null)
                    break;
                  f = d, d = f.parentNode;
                }
                f = p;
              }
            n = l === -1 || s === -1 ? null : { start: l, end: s };
          } else
            n = null;
        }
      n = n || { start: 0, end: 0 };
    } else
      n = null;
    for (Sp = { focusedElem: e, selectionRange: n }, Ou = !1, Q = t; Q !== null; )
      if (t = Q, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Q = e;
      else
        for (; Q !== null; ) {
          t = Q;
          try {
            var h = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (h !== null) {
                    var m = h.memoizedProps, S = h.memoizedState, g = t.stateNode, v = g.getSnapshotBeforeUpdate(t.elementType === t.type ? m : Dn(t.type, m), S);
                    g.__reactInternalSnapshotBeforeUpdate = v;
                  }
                  break;
                case 3:
                  var w = t.stateNode.containerInfo;
                  w.nodeType === 1 ? w.textContent = "" : w.nodeType === 9 && w.documentElement && w.removeChild(w.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(z(163));
              }
          } catch (E) {
            Ve(t, t.return, E);
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Q = e;
            break;
          }
          Q = t.return;
        }
    return h = Bv, Bv = !1, h;
  }
  function ol(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.destroy;
          i.destroy = void 0, o !== void 0 && Fp(t, n, o);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function Oc(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Bp(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Ib(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ib(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qn], delete t[Tl], delete t[Cp], delete t[J2], delete t[Q2])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Tb(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Uv(e) {
    e:
      for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Tb(e.return))
            return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4)
            continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2))
          return e.stateNode;
      }
  }
  function Up(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Pu));
    else if (r !== 4 && (e = e.child, e !== null))
      for (Up(e, t, n), e = e.sibling; e !== null; )
        Up(e, t, n), e = e.sibling;
  }
  function zp(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
      for (zp(e, t, n), e = e.sibling; e !== null; )
        zp(e, t, n), e = e.sibling;
  }
  var ft = null, Rn = !1;
  function Mr(e, t, n) {
    for (n = n.child; n !== null; )
      Pb(e, t, n), n = n.sibling;
  }
  function Pb(e, t, n) {
    if (Zn && typeof Zn.onCommitFiberUnmount == "function")
      try {
        Zn.onCommitFiberUnmount(bc, n);
      } catch (l) {
      }
    switch (n.tag) {
      case 5:
        bt || Co(n, t);
      case 6:
        var r = ft, i = Rn;
        ft = null, Mr(e, t, n), ft = r, Rn = i, ft !== null && (Rn ? (e = ft, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ft.removeChild(n.stateNode));
        break;
      case 18:
        ft !== null && (Rn ? (e = ft, n = n.stateNode, e.nodeType === 8 ? nd(e.parentNode, n) : e.nodeType === 1 && nd(e, n), xl(e)) : nd(ft, n.stateNode));
        break;
      case 4:
        r = ft, i = Rn, ft = n.stateNode.containerInfo, Rn = !0, Mr(e, t, n), ft = r, Rn = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!bt && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var o = i, a = o.destroy;
            o = o.tag, a !== void 0 && (o & 2 || o & 4) && Fp(n, t, a), i = i.next;
          } while (i !== r);
        }
        Mr(e, t, n);
        break;
      case 1:
        if (!bt && (Co(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
          try {
            r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
          } catch (l) {
            Ve(n, t, l);
          }
        Mr(e, t, n);
        break;
      case 21:
        Mr(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (bt = (r = bt) || n.memoizedState !== null, Mr(e, t, n), bt = r) : Mr(e, t, n);
        break;
      default:
        Mr(e, t, n);
    }
  }
  function zv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new fk()), t.forEach(function(r) {
        var i = Sk.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function Tn(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        try {
          var o = e, a = t, l = a;
          e:
            for (; l !== null; ) {
              switch (l.tag) {
                case 5:
                  ft = l.stateNode, Rn = !1;
                  break e;
                case 3:
                  ft = l.stateNode.containerInfo, Rn = !0;
                  break e;
                case 4:
                  ft = l.stateNode.containerInfo, Rn = !0;
                  break e;
              }
              l = l.return;
            }
          if (ft === null)
            throw Error(z(160));
          Pb(o, a, i), ft = null, Rn = !1;
          var s = i.alternate;
          s !== null && (s.return = null), i.return = null;
        } catch (u) {
          Ve(i, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; )
        Nb(t, e), t = t.sibling;
  }
  function Nb(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Tn(t, e), $n(e), r & 4) {
          try {
            ol(3, e, e.return), Oc(3, e);
          } catch (m) {
            Ve(e, e.return, m);
          }
          try {
            ol(5, e, e.return);
          } catch (m) {
            Ve(e, e.return, m);
          }
        }
        break;
      case 1:
        Tn(t, e), $n(e), r & 512 && n !== null && Co(n, n.return);
        break;
      case 5:
        if (Tn(t, e), $n(e), r & 512 && n !== null && Co(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            Sl(i, "");
          } catch (m) {
            Ve(e, e.return, m);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, l = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null)
            try {
              l === "input" && o.type === "radio" && o.name != null && Z0(i, o), cp(l, a);
              var u = cp(l, o);
              for (a = 0; a < s.length; a += 2) {
                var c = s[a], f = s[a + 1];
                c === "style" ? iw(i, f) : c === "dangerouslySetInnerHTML" ? nw(i, f) : c === "children" ? Sl(i, f) : $h(i, c, f, u);
              }
              switch (l) {
                case "input":
                  op(i, o);
                  break;
                case "textarea":
                  ew(i, o);
                  break;
                case "select":
                  var d = i._wrapperState.wasMultiple;
                  i._wrapperState.wasMultiple = !!o.multiple;
                  var p = o.value;
                  p != null ? _o(i, !!o.multiple, p, !1) : d !== !!o.multiple && (o.defaultValue != null ? _o(
                    i,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  ) : _o(i, !!o.multiple, o.multiple ? [] : "", !1));
              }
              i[Tl] = o;
            } catch (m) {
              Ve(e, e.return, m);
            }
        }
        break;
      case 6:
        if (Tn(t, e), $n(e), r & 4) {
          if (e.stateNode === null)
            throw Error(z(162));
          i = e.stateNode, o = e.memoizedProps;
          try {
            i.nodeValue = o;
          } catch (m) {
            Ve(e, e.return, m);
          }
        }
        break;
      case 3:
        if (Tn(t, e), $n(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            xl(t.containerInfo);
          } catch (m) {
            Ve(e, e.return, m);
          }
        break;
      case 4:
        Tn(t, e), $n(e);
        break;
      case 13:
        Tn(t, e), $n(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Cm = Ke())), r & 4 && zv(e);
        break;
      case 22:
        if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (bt = (u = bt) || c, Tn(t, e), bt = u) : Tn(t, e), $n(e), r & 8192) {
          if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
            for (Q = e, c = e.child; c !== null; ) {
              for (f = Q = c; Q !== null; ) {
                switch (d = Q, p = d.child, d.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ol(4, d, d.return);
                    break;
                  case 1:
                    Co(d, d.return);
                    var h = d.stateNode;
                    if (typeof h.componentWillUnmount == "function") {
                      r = d, n = d.return;
                      try {
                        t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
                      } catch (m) {
                        Ve(r, n, m);
                      }
                    }
                    break;
                  case 5:
                    Co(d, d.return);
                    break;
                  case 22:
                    if (d.memoizedState !== null) {
                      Wv(f);
                      continue;
                    }
                }
                p !== null ? (p.return = d, Q = p) : Wv(f);
              }
              c = c.sibling;
            }
          e:
            for (c = null, f = e; ; ) {
              if (f.tag === 5) {
                if (c === null) {
                  c = f;
                  try {
                    i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, s = f.memoizedProps.style, a = s != null && s.hasOwnProperty("display") ? s.display : null, l.style.display = rw("display", a));
                  } catch (m) {
                    Ve(e, e.return, m);
                  }
                }
              } else if (f.tag === 6) {
                if (c === null)
                  try {
                    f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                  } catch (m) {
                    Ve(e, e.return, m);
                  }
              } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e)
                break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break e;
                c === f && (c = null), f = f.return;
              }
              c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
            }
        }
        break;
      case 19:
        Tn(t, e), $n(e), r & 4 && zv(e);
        break;
      case 21:
        break;
      default:
        Tn(
          t,
          e
        ), $n(e);
    }
  }
  function $n(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Tb(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(z(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (Sl(i, ""), r.flags &= -33);
            var o = Uv(e);
            zp(e, o, i);
            break;
          case 3:
          case 4:
            var a = r.stateNode.containerInfo, l = Uv(e);
            Up(e, l, a);
            break;
          default:
            throw Error(z(161));
        }
      } catch (s) {
        Ve(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function pk(e, t, n) {
    Q = e, Db(e);
  }
  function Db(e, t, n) {
    for (var r = (e.mode & 1) !== 0; Q !== null; ) {
      var i = Q, o = i.child;
      if (i.tag === 22 && r) {
        var a = i.memoizedState !== null || Ws;
        if (!a) {
          var l = i.alternate, s = l !== null && l.memoizedState !== null || bt;
          l = Ws;
          var u = bt;
          if (Ws = a, (bt = s) && !u)
            for (Q = i; Q !== null; )
              a = Q, s = a.child, a.tag === 22 && a.memoizedState !== null ? Yv(i) : s !== null ? (s.return = a, Q = s) : Yv(i);
          for (; o !== null; )
            Q = o, Db(o), o = o.sibling;
          Q = i, Ws = l, bt = u;
        }
        jv(e);
      } else
        i.subtreeFlags & 8772 && o !== null ? (o.return = i, Q = o) : jv(e);
    }
  }
  function jv(e) {
    for (; Q !== null; ) {
      var t = Q;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                bt || Oc(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !bt)
                  if (n === null)
                    r.componentDidMount();
                  else {
                    var i = t.elementType === t.type ? n.memoizedProps : Dn(t.type, n.memoizedProps);
                    r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var o = t.updateQueue;
                o !== null && Cv(t, o, r);
                break;
              case 3:
                var a = t.updateQueue;
                if (a !== null) {
                  if (n = null, t.child !== null)
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Cv(t, a, n);
                }
                break;
              case 5:
                var l = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = l;
                  var s = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      s.autoFocus && n.focus();
                      break;
                    case "img":
                      s.src && (n.src = s.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var u = t.alternate;
                  if (u !== null) {
                    var c = u.memoizedState;
                    if (c !== null) {
                      var f = c.dehydrated;
                      f !== null && xl(f);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(z(163));
            }
          bt || t.flags & 512 && Bp(t);
        } catch (d) {
          Ve(t, t.return, d);
        }
      }
      if (t === e) {
        Q = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, Q = n;
        break;
      }
      Q = t.return;
    }
  }
  function Wv(e) {
    for (; Q !== null; ) {
      var t = Q;
      if (t === e) {
        Q = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Q = n;
        break;
      }
      Q = t.return;
    }
  }
  function Yv(e) {
    for (; Q !== null; ) {
      var t = Q;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Oc(4, t);
            } catch (s) {
              Ve(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                Ve(t, i, s);
              }
            }
            var o = t.return;
            try {
              Bp(t);
            } catch (s) {
              Ve(t, o, s);
            }
            break;
          case 5:
            var a = t.return;
            try {
              Bp(t);
            } catch (s) {
              Ve(t, a, s);
            }
        }
      } catch (s) {
        Ve(t, t.return, s);
      }
      if (t === e) {
        Q = null;
        break;
      }
      var l = t.sibling;
      if (l !== null) {
        l.return = t.return, Q = l;
        break;
      }
      Q = t.return;
    }
  }
  var hk = Math.ceil, Wu = Tr.ReactCurrentDispatcher, Em = Tr.ReactCurrentOwner, hn = Tr.ReactCurrentBatchConfig, ve = 0, lt = null, tt = null, dt = 0, Ht = 0, xo = vi(0), ot = 0, Ml = null, Hi = 0, Ic = 0, Am = 0, al = null, Dt = null, Cm = 0, $o = 1 / 0, pr = null, Yu = !1, jp = null, ni = null, Ys = !1, Qr = null, Vu = 0, ll = 0, Wp = null, fu = -1, du = 0;
  function kt() {
    return ve & 6 ? Ke() : fu !== -1 ? fu : fu = Ke();
  }
  function ri(e) {
    return e.mode & 1 ? ve & 2 && dt !== 0 ? dt & -dt : q2.transition !== null ? (du === 0 && (du = gw()), du) : (e = ye, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Aw(e.type)), e) : 1;
  }
  function Un(e, t, n, r) {
    if (50 < ll)
      throw ll = 0, Wp = null, Error(z(185));
    Ql(e, n, r), (!(ve & 2) || e !== lt) && (e === lt && (!(ve & 2) && (Ic |= n), ot === 4 && Wr(e, dt)), Ut(e, r), n === 1 && ve === 0 && !(t.mode & 1) && ($o = Ke() + 500, xc && yi()));
  }
  function Ut(e, t) {
    var n = e.callbackNode;
    qx(e, t);
    var r = _u(e, e === lt ? dt : 0);
    if (r === 0)
      n !== null && Xg(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Xg(n), t === 1)
        e.tag === 0 ? K2(Vv.bind(null, e)) : Ww(Vv.bind(null, e)), H2(function() {
          !(ve & 6) && yi();
        }), n = null;
      else {
        switch (vw(r)) {
          case 1:
            n = Kh;
            break;
          case 4:
            n = hw;
            break;
          case 16:
            n = ku;
            break;
          case 536870912:
            n = mw;
            break;
          default:
            n = ku;
        }
        n = jb(n, Rb.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Rb(e, t) {
    if (fu = -1, du = 0, ve & 6)
      throw Error(z(327));
    var n = e.callbackNode;
    if (No() && e.callbackNode !== n)
      return null;
    var r = _u(e, e === lt ? dt : 0);
    if (r === 0)
      return null;
    if (r & 30 || r & e.expiredLanes || t)
      t = $u(e, r);
    else {
      t = r;
      var i = ve;
      ve |= 2;
      var o = Mb();
      (lt !== e || dt !== t) && (pr = null, $o = Ke() + 500, Fi(e, t));
      do
        try {
          vk();
          break;
        } catch (l) {
          Lb(e, l);
        }
      while (1);
      um(), Wu.current = o, ve = i, tt !== null ? t = 0 : (lt = null, dt = 0, t = ot);
    }
    if (t !== 0) {
      if (t === 2 && (i = mp(e), i !== 0 && (r = i, t = Yp(e, i))), t === 1)
        throw n = Ml, Fi(e, 0), Wr(e, r), Ut(e, Ke()), n;
      if (t === 6)
        Wr(e, r);
      else {
        if (i = e.current.alternate, !(r & 30) && !mk(i) && (t = $u(e, r), t === 2 && (o = mp(e), o !== 0 && (r = o, t = Yp(e, o))), t === 1))
          throw n = Ml, Fi(e, 0), Wr(e, r), Ut(e, Ke()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(z(345));
          case 2:
            Ti(e, Dt, pr);
            break;
          case 3:
            if (Wr(e, r), (r & 130023424) === r && (t = Cm + 500 - Ke(), 10 < t)) {
              if (_u(e, 0) !== 0)
                break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                kt(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = Ap(Ti.bind(null, e, Dt, pr), t);
              break;
            }
            Ti(e, Dt, pr);
            break;
          case 4:
            if (Wr(e, r), (r & 4194240) === r)
              break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var a = 31 - Bn(r);
              o = 1 << a, a = t[a], a > i && (i = a), r &= ~o;
            }
            if (r = i, r = Ke() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * hk(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Ap(Ti.bind(null, e, Dt, pr), r);
              break;
            }
            Ti(e, Dt, pr);
            break;
          case 5:
            Ti(e, Dt, pr);
            break;
          default:
            throw Error(z(329));
        }
      }
    }
    return Ut(e, Ke()), e.callbackNode === n ? Rb.bind(null, e) : null;
  }
  function Yp(e, t) {
    var n = al;
    return e.current.memoizedState.isDehydrated && (Fi(e, t).flags |= 256), e = $u(e, t), e !== 2 && (t = Dt, Dt = n, t !== null && Vp(t)), e;
  }
  function Vp(e) {
    Dt === null ? Dt = e : Dt.push.apply(Dt, e);
  }
  function mk(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null))
          for (var r = 0; r < n.length; r++) {
            var i = n[r], o = i.getSnapshot;
            i = i.value;
            try {
              if (!zn(o(), i))
                return !1;
            } catch (a) {
              return !1;
            }
          }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e)
          break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Wr(e, t) {
    for (t &= ~Am, t &= ~Ic, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - Bn(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function Vv(e) {
    if (ve & 6)
      throw Error(z(327));
    No();
    var t = _u(e, 0);
    if (!(t & 1))
      return Ut(e, Ke()), null;
    var n = $u(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = mp(e);
      r !== 0 && (t = r, n = Yp(e, r));
    }
    if (n === 1)
      throw n = Ml, Fi(e, 0), Wr(e, t), Ut(e, Ke()), n;
    if (n === 6)
      throw Error(z(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ti(e, Dt, pr), Ut(e, Ke()), null;
  }
  function xm(e, t) {
    var n = ve;
    ve |= 1;
    try {
      return e(t);
    } finally {
      ve = n, ve === 0 && ($o = Ke() + 500, xc && yi());
    }
  }
  function Gi(e) {
    Qr !== null && Qr.tag === 0 && !(ve & 6) && No();
    var t = ve;
    ve |= 1;
    var n = hn.transition, r = ye;
    try {
      if (hn.transition = null, ye = 1, e)
        return e();
    } finally {
      ye = r, hn.transition = n, ve = t, !(ve & 6) && yi();
    }
  }
  function km() {
    Ht = xo.current, Ie(xo);
  }
  function Fi(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, $2(n)), tt !== null)
      for (n = tt.return; n !== null; ) {
        var r = n;
        switch (am(r), r.tag) {
          case 1:
            r = r.type.childContextTypes, r != null && Nu();
            break;
          case 3:
            Yo(), Ie(Ft), Ie(Et), mm();
            break;
          case 5:
            hm(r);
            break;
          case 4:
            Yo();
            break;
          case 13:
            Ie(Be);
            break;
          case 19:
            Ie(Be);
            break;
          case 10:
            cm(r.type._context);
            break;
          case 22:
          case 23:
            km();
        }
        n = n.return;
      }
    if (lt = e, tt = e = ii(e.current, null), dt = Ht = t, ot = 0, Ml = null, Am = Ic = Hi = 0, Dt = al = null, Li !== null) {
      for (t = 0; t < Li.length; t++)
        if (n = Li[t], r = n.interleaved, r !== null) {
          n.interleaved = null;
          var i = r.next, o = n.pending;
          if (o !== null) {
            var a = o.next;
            o.next = i, r.next = a;
          }
          n.pending = r;
        }
      Li = null;
    }
    return e;
  }
  function Lb(e, t) {
    do {
      var n = tt;
      try {
        if (um(), su.current = ju, zu) {
          for (var r = ze.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          zu = !1;
        }
        if ($i = 0, at = it = ze = null, il = !1, Dl = 0, Em.current = null, n === null || n.return === null) {
          ot = 1, Ml = t, tt = null;
          break;
        }
        e: {
          var o = e, a = n.return, l = n, s = t;
          if (t = dt, l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var u = s, c = l, f = c.tag;
            if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
              var d = c.alternate;
              d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
            }
            var p = Pv(a);
            if (p !== null) {
              p.flags &= -257, Nv(p, a, l, o, t), p.mode & 1 && Tv(o, u, t), t = p, s = u;
              var h = t.updateQueue;
              if (h === null) {
                var m = /* @__PURE__ */ new Set();
                m.add(s), t.updateQueue = m;
              } else
                h.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                Tv(o, u, t), _m();
                break e;
              }
              s = Error(z(426));
            }
          } else if (Re && l.mode & 1) {
            var S = Pv(a);
            if (S !== null) {
              !(S.flags & 65536) && (S.flags |= 256), Nv(S, a, l, o, t), lm(Vo(s, l));
              break e;
            }
          }
          o = s = Vo(s, l), ot !== 4 && (ot = 2), al === null ? al = [o] : al.push(o), o = a;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var g = yb(o, s, t);
                Av(o, g);
                break e;
              case 1:
                l = s;
                var v = o.type, w = o.stateNode;
                if (!(o.flags & 128) && (typeof v.getDerivedStateFromError == "function" || w !== null && typeof w.componentDidCatch == "function" && (ni === null || !ni.has(w)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var E = wb(o, l, t);
                  Av(o, E);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Bb(n);
      } catch (k) {
        t = k, tt === n && n !== null && (tt = n = n.return);
        continue;
      }
      break;
    } while (1);
  }
  function Mb() {
    var e = Wu.current;
    return Wu.current = ju, e === null ? ju : e;
  }
  function _m() {
    (ot === 0 || ot === 3 || ot === 2) && (ot = 4), lt === null || !(Hi & 268435455) && !(Ic & 268435455) || Wr(lt, dt);
  }
  function $u(e, t) {
    var n = ve;
    ve |= 2;
    var r = Mb();
    (lt !== e || dt !== t) && (pr = null, Fi(e, t));
    do
      try {
        gk();
        break;
      } catch (i) {
        Lb(e, i);
      }
    while (1);
    if (um(), ve = n, Wu.current = r, tt !== null)
      throw Error(z(261));
    return lt = null, dt = 0, ot;
  }
  function gk() {
    for (; tt !== null; )
      Fb(tt);
  }
  function vk() {
    for (; tt !== null && !Wx(); )
      Fb(tt);
  }
  function Fb(e) {
    var t = zb(e.alternate, e, Ht);
    e.memoizedProps = e.pendingProps, t === null ? Bb(e) : tt = t, Em.current = null;
  }
  function Bb(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, t.flags & 32768) {
        if (n = ck(n, t), n !== null) {
          n.flags &= 32767, tt = n;
          return;
        }
        if (e !== null)
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          ot = 6, tt = null;
          return;
        }
      } else if (n = uk(n, t, Ht), n !== null) {
        tt = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        tt = t;
        return;
      }
      tt = t = e;
    } while (t !== null);
    ot === 0 && (ot = 5);
  }
  function Ti(e, t, n) {
    var r = ye, i = hn.transition;
    try {
      hn.transition = null, ye = 1, yk(e, t, n, r);
    } finally {
      hn.transition = i, ye = r;
    }
    return null;
  }
  function yk(e, t, n, r) {
    do
      No();
    while (Qr !== null);
    if (ve & 6)
      throw Error(z(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null)
      return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
      throw Error(z(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Xx(e, o), e === lt && (tt = lt = null, dt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ys || (Ys = !0, jb(ku, function() {
      return No(), null;
    })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
      o = hn.transition, hn.transition = null;
      var a = ye;
      ye = 1;
      var l = ve;
      ve |= 4, Em.current = null, dk(e, n), Nb(n, e), B2(Sp), Ou = !!bp, Sp = bp = null, e.current = n, pk(n), Yx(), ve = l, ye = a, hn.transition = o;
    } else
      e.current = n;
    if (Ys && (Ys = !1, Qr = e, Vu = i), o = e.pendingLanes, o === 0 && (ni = null), Hx(n.stateNode), Ut(e, Ke()), t !== null)
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Yu)
      throw Yu = !1, e = jp, jp = null, e;
    return Vu & 1 && e.tag !== 0 && No(), o = e.pendingLanes, o & 1 ? e === Wp ? ll++ : (ll = 0, Wp = e) : ll = 0, yi(), null;
  }
  function No() {
    if (Qr !== null) {
      var e = vw(Vu), t = hn.transition, n = ye;
      try {
        if (hn.transition = null, ye = 16 > e ? 16 : e, Qr === null)
          var r = !1;
        else {
          if (e = Qr, Qr = null, Vu = 0, ve & 6)
            throw Error(z(331));
          var i = ve;
          for (ve |= 4, Q = e.current; Q !== null; ) {
            var o = Q, a = o.child;
            if (Q.flags & 16) {
              var l = o.deletions;
              if (l !== null) {
                for (var s = 0; s < l.length; s++) {
                  var u = l[s];
                  for (Q = u; Q !== null; ) {
                    var c = Q;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ol(8, c, o);
                    }
                    var f = c.child;
                    if (f !== null)
                      f.return = c, Q = f;
                    else
                      for (; Q !== null; ) {
                        c = Q;
                        var d = c.sibling, p = c.return;
                        if (Ib(c), c === u) {
                          Q = null;
                          break;
                        }
                        if (d !== null) {
                          d.return = p, Q = d;
                          break;
                        }
                        Q = p;
                      }
                  }
                }
                var h = o.alternate;
                if (h !== null) {
                  var m = h.child;
                  if (m !== null) {
                    h.child = null;
                    do {
                      var S = m.sibling;
                      m.sibling = null, m = S;
                    } while (m !== null);
                  }
                }
                Q = o;
              }
            }
            if (o.subtreeFlags & 2064 && a !== null)
              a.return = o, Q = a;
            else
              e:
                for (; Q !== null; ) {
                  if (o = Q, o.flags & 2048)
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ol(9, o, o.return);
                    }
                  var g = o.sibling;
                  if (g !== null) {
                    g.return = o.return, Q = g;
                    break e;
                  }
                  Q = o.return;
                }
          }
          var v = e.current;
          for (Q = v; Q !== null; ) {
            a = Q;
            var w = a.child;
            if (a.subtreeFlags & 2064 && w !== null)
              w.return = a, Q = w;
            else
              e:
                for (a = v; Q !== null; ) {
                  if (l = Q, l.flags & 2048)
                    try {
                      switch (l.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Oc(9, l);
                      }
                    } catch (k) {
                      Ve(l, l.return, k);
                    }
                  if (l === a) {
                    Q = null;
                    break e;
                  }
                  var E = l.sibling;
                  if (E !== null) {
                    E.return = l.return, Q = E;
                    break e;
                  }
                  Q = l.return;
                }
          }
          if (ve = i, yi(), Zn && typeof Zn.onPostCommitFiberRoot == "function")
            try {
              Zn.onPostCommitFiberRoot(bc, e);
            } catch (k) {
            }
          r = !0;
        }
        return r;
      } finally {
        ye = n, hn.transition = t;
      }
    }
    return !1;
  }
  function $v(e, t, n) {
    t = Vo(n, t), t = yb(e, t, 1), e = ti(e, t, 1), t = kt(), e !== null && (Ql(e, 1, t), Ut(e, t));
  }
  function Ve(e, t, n) {
    if (e.tag === 3)
      $v(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          $v(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ni === null || !ni.has(r))) {
            e = Vo(n, e), e = wb(t, e, 1), t = ti(t, e, 1), e = kt(), t !== null && (Ql(t, 1, e), Ut(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function wk(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = kt(), e.pingedLanes |= e.suspendedLanes & n, lt === e && (dt & n) === n && (ot === 4 || ot === 3 && (dt & 130023424) === dt && 500 > Ke() - Cm ? Fi(e, 0) : Am |= n), Ut(e, t);
  }
  function Ub(e, t) {
    t === 0 && (e.mode & 1 ? (t = Ds, Ds <<= 1, !(Ds & 130023424) && (Ds = 4194304)) : t = 1);
    var n = kt();
    e = xr(e, t), e !== null && (Ql(e, t, n), Ut(e, n));
  }
  function bk(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Ub(e, n);
  }
  function Sk(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(z(314));
    }
    r !== null && r.delete(t), Ub(e, n);
  }
  var zb;
  zb = function(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ft.current)
        Lt = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128))
          return Lt = !1, sk(e, t, n);
        Lt = !!(e.flags & 131072);
      }
    else
      Lt = !1, Re && t.flags & 1048576 && Yw(t, Lu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        cu(e, t), e = t.pendingProps;
        var i = zo(t, Et.current);
        Po(t, n), i = vm(null, t, r, e, i, n);
        var o = ym();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Bt(r) ? (o = !0, Du(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, dm(t), i.updater = kc, t.stateNode = i, i._reactInternals = t, Tp(t, r, e, n), t = Dp(null, t, r, !0, o, n)) : (t.tag = 0, Re && o && om(t), Ct(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (cu(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = Ak(r), e = Dn(r, e), i) {
            case 0:
              t = Np(null, t, r, e, n);
              break e;
            case 1:
              t = Lv(null, t, r, e, n);
              break e;
            case 11:
              t = Dv(null, t, r, e, n);
              break e;
            case 14:
              t = Rv(null, t, r, Dn(r.type, e), n);
              break e;
          }
          throw Error(z(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Dn(r, i), Np(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Dn(r, i), Lv(e, t, r, i, n);
      case 3:
        e: {
          if (Ab(t), e === null)
            throw Error(z(387));
          r = t.pendingProps, o = t.memoizedState, i = o.element, Gw(e, t), Bu(t, r, null, n);
          var a = t.memoizedState;
          if (r = a.element, o.isDehydrated)
            if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
              i = Vo(Error(z(423)), t), t = Mv(e, t, r, n, i);
              break e;
            } else if (r !== i) {
              i = Vo(Error(z(424)), t), t = Mv(e, t, r, n, i);
              break e;
            } else
              for (Kt = ei(t.stateNode.containerInfo.firstChild), Zt = t, Re = !0, Mn = null, n = qw(t, null, r, n), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (jo(), r === i) {
              t = kr(e, t, n);
              break e;
            }
            Ct(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Xw(t), e === null && _p(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = i.children, Ep(r, i) ? a = null : o !== null && Ep(r, o) && (t.flags |= 32), Eb(e, t), Ct(e, t, a, n), t.child;
      case 6:
        return e === null && _p(t), null;
      case 13:
        return Cb(e, t, n);
      case 4:
        return pm(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Wo(t, null, r, n) : Ct(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Dn(r, i), Dv(e, t, r, i, n);
      case 7:
        return Ct(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ct(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ct(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, a = i.value, ke(Mu, r._currentValue), r._currentValue = a, o !== null)
            if (zn(o.value, a)) {
              if (o.children === i.children && !Ft.current) {
                t = kr(e, t, n);
                break e;
              }
            } else
              for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                var l = o.dependencies;
                if (l !== null) {
                  a = o.child;
                  for (var s = l.firstContext; s !== null; ) {
                    if (s.context === r) {
                      if (o.tag === 1) {
                        s = br(-1, n & -n), s.tag = 2;
                        var u = o.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var c = u.pending;
                          c === null ? s.next = s : (s.next = c.next, c.next = s), u.pending = s;
                        }
                      }
                      o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Op(
                        o.return,
                        n,
                        t
                      ), l.lanes |= n;
                      break;
                    }
                    s = s.next;
                  }
                } else if (o.tag === 10)
                  a = o.type === t.type ? null : o.child;
                else if (o.tag === 18) {
                  if (a = o.return, a === null)
                    throw Error(z(341));
                  a.lanes |= n, l = a.alternate, l !== null && (l.lanes |= n), Op(a, n, t), a = o.sibling;
                } else
                  a = o.child;
                if (a !== null)
                  a.return = o;
                else
                  for (a = o; a !== null; ) {
                    if (a === t) {
                      a = null;
                      break;
                    }
                    if (o = a.sibling, o !== null) {
                      o.return = a.return, a = o;
                      break;
                    }
                    a = a.return;
                  }
                o = a;
              }
          Ct(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, Po(t, n), i = vn(i), r = r(i), t.flags |= 1, Ct(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = Dn(r, t.pendingProps), i = Dn(r.type, i), Rv(e, t, r, i, n);
      case 15:
        return bb(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Dn(r, i), cu(e, t), t.tag = 1, Bt(r) ? (e = !0, Du(t)) : e = !1, Po(t, n), Qw(t, r, i), Tp(t, r, i, n), Dp(null, t, r, !0, e, n);
      case 19:
        return xb(e, t, n);
      case 22:
        return Sb(e, t, n);
    }
    throw Error(z(156, t.tag));
  };
  function jb(e, t) {
    return pw(e, t);
  }
  function Ek(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function dn(e, t, n, r) {
    return new Ek(e, t, n, r);
  }
  function Om(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ak(e) {
    if (typeof e == "function")
      return Om(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Gh)
        return 11;
      if (e === Jh)
        return 14;
    }
    return 2;
  }
  function ii(e, t) {
    var n = e.alternate;
    return n === null ? (n = dn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function pu(e, t, n, r, i, o) {
    var a = 2;
    if (r = e, typeof e == "function")
      Om(e) && (a = 1);
    else if (typeof e == "string")
      a = 5;
    else
      e:
        switch (e) {
          case mo:
            return Bi(n.children, i, o, t);
          case Hh:
            a = 8, i |= 8;
            break;
          case ep:
            return e = dn(12, n, t, i | 2), e.elementType = ep, e.lanes = o, e;
          case tp:
            return e = dn(13, n, t, i), e.elementType = tp, e.lanes = o, e;
          case np:
            return e = dn(19, n, t, i), e.elementType = np, e.lanes = o, e;
          case K0:
            return Tc(n, i, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case J0:
                  a = 10;
                  break e;
                case Q0:
                  a = 9;
                  break e;
                case Gh:
                  a = 11;
                  break e;
                case Jh:
                  a = 14;
                  break e;
                case Br:
                  a = 16, r = null;
                  break e;
              }
            throw Error(z(130, e == null ? e : typeof e, ""));
        }
    return t = dn(a, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Bi(e, t, n, r) {
    return e = dn(7, e, r, t), e.lanes = n, e;
  }
  function Tc(e, t, n, r) {
    return e = dn(22, e, r, t), e.elementType = K0, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function cd(e, t, n) {
    return e = dn(6, e, null, t), e.lanes = n, e;
  }
  function fd(e, t, n) {
    return t = dn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Ck(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $f(0), this.expirationTimes = $f(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $f(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function Im(e, t, n, r, i, o, a, l, s) {
    return e = new Ck(e, t, n, l, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = dn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, dm(o), e;
  }
  function xk(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ho, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Wb(e) {
    if (!e)
      return fi;
    e = e._reactInternals;
    e: {
      if (Xi(e) !== e || e.tag !== 1)
        throw Error(z(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Bt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(z(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Bt(n))
        return jw(e, n, t);
    }
    return t;
  }
  function Yb(e, t, n, r, i, o, a, l, s) {
    return e = Im(n, r, !0, e, i, o, a, l, s), e.context = Wb(null), n = e.current, r = kt(), i = ri(n), o = br(r, i), o.callback = t != null ? t : null, ti(n, o, i), e.current.lanes = i, Ql(e, i, r), Ut(e, r), e;
  }
  function Pc(e, t, n, r) {
    var i = t.current, o = kt(), a = ri(i);
    return n = Wb(n), t.context === null ? t.context = n : t.pendingContext = n, t = br(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ti(i, t, a), e !== null && (Un(e, i, a, o), lu(e, i, a)), a;
  }
  function Hu(e) {
    if (e = e.current, !e.child)
      return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Hv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Tm(e, t) {
    Hv(e, t), (e = e.alternate) && Hv(e, t);
  }
  function kk() {
    return null;
  }
  var Vb = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Pm(e) {
    this._internalRoot = e;
  }
  Nc.prototype.render = Pm.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw Error(z(409));
    Pc(e, t, null, null);
  };
  Nc.prototype.unmount = Pm.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Gi(function() {
        Pc(null, e, null, null);
      }), t[Cr] = null;
    }
  };
  function Nc(e) {
    this._internalRoot = e;
  }
  Nc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = bw();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < jr.length && t !== 0 && t < jr[n].priority; n++)
        ;
      jr.splice(n, 0, e), n === 0 && Ew(e);
    }
  };
  function Nm(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Dc(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Gv() {
  }
  function _k(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var u = Hu(a);
          o.call(u);
        };
      }
      var a = Yb(t, r, e, 0, null, !1, !1, "", Gv);
      return e._reactRootContainer = a, e[Cr] = a.current, Ol(e.nodeType === 8 ? e.parentNode : e), Gi(), a;
    }
    for (; i = e.lastChild; )
      e.removeChild(i);
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var u = Hu(s);
        l.call(u);
      };
    }
    var s = Im(e, 0, !1, null, null, !1, !1, "", Gv);
    return e._reactRootContainer = s, e[Cr] = s.current, Ol(e.nodeType === 8 ? e.parentNode : e), Gi(function() {
      Pc(t, s, n, r);
    }), s;
  }
  function Rc(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
      var a = o;
      if (typeof i == "function") {
        var l = i;
        i = function() {
          var s = Hu(a);
          l.call(s);
        };
      }
      Pc(t, a, e, i);
    } else
      a = _k(n, t, e, i, r);
    return Hu(a);
  }
  yw = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Va(t.pendingLanes);
          n !== 0 && (qh(t, n | 1), Ut(t, Ke()), !(ve & 6) && ($o = Ke() + 500, yi()));
        }
        break;
      case 13:
        Gi(function() {
          var r = xr(e, 1);
          if (r !== null) {
            var i = kt();
            Un(r, e, 1, i);
          }
        }), Tm(e, 1);
    }
  };
  Xh = function(e) {
    if (e.tag === 13) {
      var t = xr(e, 134217728);
      if (t !== null) {
        var n = kt();
        Un(t, e, 134217728, n);
      }
      Tm(e, 134217728);
    }
  };
  ww = function(e) {
    if (e.tag === 13) {
      var t = ri(e), n = xr(e, t);
      if (n !== null) {
        var r = kt();
        Un(n, e, t, r);
      }
      Tm(e, t);
    }
  };
  bw = function() {
    return ye;
  };
  Sw = function(e, t) {
    var n = ye;
    try {
      return ye = e, t();
    } finally {
      ye = n;
    }
  };
  dp = function(e, t, n) {
    switch (t) {
      case "input":
        if (op(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; )
            n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Cc(r);
              if (!i)
                throw Error(z(90));
              X0(r), op(r, i);
            }
          }
        }
        break;
      case "textarea":
        ew(e, n);
        break;
      case "select":
        t = n.value, t != null && _o(e, !!n.multiple, t, !1);
    }
  };
  lw = xm;
  sw = Gi;
  var Ok = { usingClientEntryPoint: !1, Events: [ql, wo, Cc, ow, aw, xm] }, Oa = { findFiberByHostInstance: Ri, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, Ik = { bundleType: Oa.bundleType, version: Oa.version, rendererPackageName: Oa.rendererPackageName, rendererConfig: Oa.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Tr.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = fw(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Oa.findFiberByHostInstance || kk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
    var Vs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vs.isDisabled && Vs.supportsFiber)
      try {
        bc = Vs.inject(Ik), Zn = Vs;
      } catch (e) {
      }
  }
  on.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ok;
  on.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Nm(t))
      throw Error(z(200));
    return xk(e, t, null, n);
  };
  on.createRoot = function(e, t) {
    if (!Nm(e))
      throw Error(z(299));
    var n = !1, r = "", i = Vb;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Im(e, 1, !1, null, null, n, !1, r, i), e[Cr] = t.current, Ol(e.nodeType === 8 ? e.parentNode : e), new Pm(t);
  };
  on.findDOMNode = function(e) {
    if (e == null)
      return null;
    if (e.nodeType === 1)
      return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(z(188)) : (e = Object.keys(e).join(","), Error(z(268, e)));
    return e = fw(t), e = e === null ? null : e.stateNode, e;
  };
  on.flushSync = function(e) {
    return Gi(e);
  };
  on.hydrate = function(e, t, n) {
    if (!Dc(t))
      throw Error(z(200));
    return Rc(null, e, t, !0, n);
  };
  on.hydrateRoot = function(e, t, n) {
    if (!Nm(e))
      throw Error(z(405));
    var r = n != null && n.hydratedSources || null, i = !1, o = "", a = Vb;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Yb(t, null, e, 1, n != null ? n : null, i, !1, o, a), e[Cr] = t.current, Ol(e), r)
      for (e = 0; e < r.length; e++)
        n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
          n,
          i
        );
    return new Nc(t);
  };
  on.render = function(e, t, n) {
    if (!Dc(t))
      throw Error(z(200));
    return Rc(null, e, t, !1, n);
  };
  on.unmountComponentAtNode = function(e) {
    if (!Dc(e))
      throw Error(z(40));
    return e._reactRootContainer ? (Gi(function() {
      Rc(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Cr] = null;
      });
    }), !0) : !1;
  };
  on.unstable_batchedUpdates = xm;
  on.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Dc(n))
      throw Error(z(200));
    if (e == null || e._reactInternals === void 0)
      throw Error(z(38));
    return Rc(e, t, n, !1, r);
  };
  on.version = "18.2.0-next-9e3b772b8-20220608";
  (function(e) {
    function t() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
        } catch (n) {
          console.error(n);
        }
    }
    t(), e.exports = on;
  })(kx);
  const Ui = /* @__PURE__ */ Bh(ui);
  var $b, Jv = ui;
  $b = Jv.createRoot, Jv.hydrateRoot;
  function Tk(e) {
    return ao(this, null, function* () {
      return new Promise((t) => {
        fetch("/testing-tree").then((n) => n.json()).then((n) => {
          t(n);
        }).catch((n) => {
          console.error("/testing-tree error", n), t(e);
        });
      });
    });
  }
  function Pk({
    messageDispatch: e,
    showMessages: t,
    defaultTree: n
  }) {
    const r = t ? console.log : (...o) => {
    };
    return {
      sendMsg: (o) => {
        switch (r("Static sendMsg()", o), o.path) {
          case "READY-FOR-STATE": {
            Tk(n).then((a) => {
              a === "TEMPLATE_CHOOSER" ? e.dispatch("TEMPLATE_CHOOSER", "USER-CHOICE") : e.dispatch("APP-INFO", {
                ui_tree: a,
                app_type: "SINGLE-FILE",
                app: {
                  code: Nk,
                  libraries: ["shiny"]
                }
              });
            });
            return;
          }
          case "UPDATED-APP": {
            o.payload.info && e.dispatch("APP-INFO", o.payload.info);
            return;
          }
          case "APP-PREVIEW-REQUEST":
            return;
        }
      },
      incomingMsgs: e,
      mode: "STATIC"
    };
  }
  const Nk = `
<LIBRARIES>

ui <- <UI>

server <- function(input, output) {

}

shinyApp(ui, server)
`, dd = console.log, Dk = {
    sendMsg: (e) => dd("Sending message to backend", e),
    incomingMsgs: {
      subscribe: (e, t) => (dd(`Request for subscription to ${e}:`, t), {
        unsubscribe: () => dd(`Request for removing subscription to ${e}:`, t)
      })
    },
    mode: "HTTPUV"
  }, Hb = _.createContext(Dk);
  function Rk({
    children: e,
    sendMsg: t,
    incomingMsgs: n,
    mode: r
  }) {
    return /* @__PURE__ */ y(Hb.Provider, { value: { sendMsg: t, incomingMsgs: n, mode: r }, children: e });
  }
  function Zl() {
    return _.useContext(Hb);
  }
  var N = {}, Lk = {
    get exports() {
      return N;
    },
    set exports(e) {
      N = e;
    }
  }, Mk = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", Fk = Mk, Bk = Fk;
  function Gb() {
  }
  function Jb() {
  }
  Jb.resetWarningCache = Gb;
  var Uk = function() {
    function e(r, i, o, a, l, s) {
      if (s !== Bk) {
        var u = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw u.name = "Invariant Violation", u;
      }
    }
    e.isRequired = e;
    function t() {
      return e;
    }
    var n = {
      array: e,
      bigint: e,
      bool: e,
      func: e,
      number: e,
      object: e,
      string: e,
      symbol: e,
      any: e,
      arrayOf: t,
      element: e,
      elementType: e,
      instanceOf: t,
      node: e,
      objectOf: t,
      oneOf: t,
      oneOfType: t,
      shape: t,
      exact: t,
      checkPropTypes: Jb,
      resetWarningCache: Gb
    };
    return n.PropTypes = n, n;
  };
  Lk.exports = Uk();
  function Qb(e) {
    return function(t) {
      return typeof t === e;
    };
  }
  var zk = Qb("function"), jk = function(e) {
    return e === null;
  }, Qv = function(e) {
    return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
  }, Kv = function(e) {
    return !Wk(e) && !jk(e) && (zk(e) || typeof e == "object");
  }, Wk = Qb("undefined"), $p = globalThis && globalThis.__values || function(e) {
    var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
    if (n)
      return n.call(e);
    if (e && typeof e.length == "number")
      return {
        next: function() {
          return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
        }
      };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  function Yk(e, t) {
    var n = e.length;
    if (n !== t.length)
      return !1;
    for (var r = n; r-- !== 0; )
      if (!Mt(e[r], t[r]))
        return !1;
    return !0;
  }
  function Vk(e, t) {
    if (e.byteLength !== t.byteLength)
      return !1;
    for (var n = new DataView(e.buffer), r = new DataView(t.buffer), i = e.byteLength; i--; )
      if (n.getUint8(i) !== r.getUint8(i))
        return !1;
    return !0;
  }
  function $k(e, t) {
    var n, r, i, o;
    if (e.size !== t.size)
      return !1;
    try {
      for (var a = $p(e.entries()), l = a.next(); !l.done; l = a.next()) {
        var s = l.value;
        if (!t.has(s[0]))
          return !1;
      }
    } catch (f) {
      n = { error: f };
    } finally {
      try {
        l && !l.done && (r = a.return) && r.call(a);
      } finally {
        if (n)
          throw n.error;
      }
    }
    try {
      for (var u = $p(e.entries()), c = u.next(); !c.done; c = u.next()) {
        var s = c.value;
        if (!Mt(s[1], t.get(s[0])))
          return !1;
      }
    } catch (f) {
      i = { error: f };
    } finally {
      try {
        c && !c.done && (o = u.return) && o.call(u);
      } finally {
        if (i)
          throw i.error;
      }
    }
    return !0;
  }
  function Hk(e, t) {
    var n, r;
    if (e.size !== t.size)
      return !1;
    try {
      for (var i = $p(e.entries()), o = i.next(); !o.done; o = i.next()) {
        var a = o.value;
        if (!t.has(a[0]))
          return !1;
      }
    } catch (l) {
      n = { error: l };
    } finally {
      try {
        o && !o.done && (r = i.return) && r.call(i);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return !0;
  }
  function Mt(e, t) {
    if (e === t)
      return !0;
    if (e && Kv(e) && t && Kv(t)) {
      if (e.constructor !== t.constructor)
        return !1;
      if (Array.isArray(e) && Array.isArray(t))
        return Yk(e, t);
      if (e instanceof Map && t instanceof Map)
        return $k(e, t);
      if (e instanceof Set && t instanceof Set)
        return Hk(e, t);
      if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t))
        return Vk(e, t);
      if (Qv(e) && Qv(t))
        return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf)
        return e.valueOf() === t.valueOf();
      if (e.toString !== Object.prototype.toString)
        return e.toString() === t.toString();
      var n = Object.keys(e), r = Object.keys(t);
      if (n.length !== r.length)
        return !1;
      for (var i = n.length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, n[i]))
          return !1;
      for (var i = n.length; i-- !== 0; ) {
        var o = n[i];
        if (!(o === "_owner" && e.$$typeof) && !Mt(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    return Number.isNaN(e) && Number.isNaN(t) ? !0 : e === t;
  }
  var Gk = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ], Jk = [
    "Array",
    "ArrayBuffer",
    "AsyncFunction",
    "AsyncGenerator",
    "AsyncGeneratorFunction",
    "Date",
    "Error",
    "Function",
    "Generator",
    "GeneratorFunction",
    "HTMLElement",
    "Map",
    "Object",
    "Promise",
    "RegExp",
    "Set",
    "WeakMap",
    "WeakSet"
  ], Qk = [
    "bigint",
    "boolean",
    "null",
    "number",
    "string",
    "symbol",
    "undefined"
  ];
  function Lc(e) {
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (/HTML\w+Element/.test(t))
      return "HTMLElement";
    if (Kk(t))
      return t;
  }
  function Wn(e) {
    return function(t) {
      return Lc(t) === e;
    };
  }
  function Kk(e) {
    return Jk.includes(e);
  }
  function la(e) {
    return function(t) {
      return typeof t === e;
    };
  }
  function qk(e) {
    return Qk.includes(e);
  }
  function D(e) {
    if (e === null)
      return "null";
    switch (typeof e) {
      case "bigint":
        return "bigint";
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "symbol":
        return "symbol";
      case "undefined":
        return "undefined";
    }
    if (D.array(e))
      return "Array";
    if (D.plainFunction(e))
      return "Function";
    var t = Lc(e);
    return t || "Object";
  }
  D.array = Array.isArray;
  D.arrayOf = function(e, t) {
    return !D.array(e) && !D.function(t) ? !1 : e.every(function(n) {
      return t(n);
    });
  };
  D.asyncGeneratorFunction = function(e) {
    return Lc(e) === "AsyncGeneratorFunction";
  };
  D.asyncFunction = Wn("AsyncFunction");
  D.bigint = la("bigint");
  D.boolean = function(e) {
    return e === !0 || e === !1;
  };
  D.date = Wn("Date");
  D.defined = function(e) {
    return !D.undefined(e);
  };
  D.domElement = function(e) {
    return D.object(e) && !D.plainObject(e) && e.nodeType === 1 && D.string(e.nodeName) && Gk.every(function(t) {
      return t in e;
    });
  };
  D.empty = function(e) {
    return D.string(e) && e.length === 0 || D.array(e) && e.length === 0 || D.object(e) && !D.map(e) && !D.set(e) && Object.keys(e).length === 0 || D.set(e) && e.size === 0 || D.map(e) && e.size === 0;
  };
  D.error = Wn("Error");
  D.function = la("function");
  D.generator = function(e) {
    return D.iterable(e) && D.function(e.next) && D.function(e.throw);
  };
  D.generatorFunction = Wn("GeneratorFunction");
  D.instanceOf = function(e, t) {
    return !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
  };
  D.iterable = function(e) {
    return !D.nullOrUndefined(e) && D.function(e[Symbol.iterator]);
  };
  D.map = Wn("Map");
  D.nan = function(e) {
    return Number.isNaN(e);
  };
  D.null = function(e) {
    return e === null;
  };
  D.nullOrUndefined = function(e) {
    return D.null(e) || D.undefined(e);
  };
  D.number = function(e) {
    return la("number")(e) && !D.nan(e);
  };
  D.numericString = function(e) {
    return D.string(e) && e.length > 0 && !Number.isNaN(Number(e));
  };
  D.object = function(e) {
    return !D.nullOrUndefined(e) && (D.function(e) || typeof e == "object");
  };
  D.oneOf = function(e, t) {
    return D.array(e) ? e.indexOf(t) > -1 : !1;
  };
  D.plainFunction = Wn("Function");
  D.plainObject = function(e) {
    if (Lc(e) !== "Object")
      return !1;
    var t = Object.getPrototypeOf(e);
    return t === null || t === Object.getPrototypeOf({});
  };
  D.primitive = function(e) {
    return D.null(e) || qk(typeof e);
  };
  D.promise = Wn("Promise");
  D.propertyOf = function(e, t, n) {
    if (!D.object(e) || !t)
      return !1;
    var r = e[t];
    return D.function(n) ? n(r) : D.defined(r);
  };
  D.regexp = Wn("RegExp");
  D.set = Wn("Set");
  D.string = la("string");
  D.symbol = la("symbol");
  D.undefined = la("undefined");
  D.weakMap = Wn("WeakMap");
  D.weakSet = Wn("WeakSet");
  function Xk() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e.every(function(n) {
      return D.string(n) || D.array(n) || D.plainObject(n);
    });
  }
  function Zk(e, t, n) {
    return Kb(e, t) ? [e, t].every(D.array) ? !e.some(ty(n)) && t.some(ty(n)) : [e, t].every(D.plainObject) ? !Object.entries(e).some(ey(n)) && Object.entries(t).some(ey(n)) : t === n : !1;
  }
  function qv(e, t, n) {
    var r = n.actual, i = n.key, o = n.previous, a = n.type, l = Xn(e, i), s = Xn(t, i), u = [l, s].every(D.number) && (a === "increased" ? l < s : l > s);
    return D.undefined(r) || (u = u && s === r), D.undefined(o) || (u = u && l === o), u;
  }
  function Xv(e, t, n) {
    var r = n.key, i = n.type, o = n.value, a = Xn(e, r), l = Xn(t, r), s = i === "added" ? a : l, u = i === "added" ? l : a;
    if (!D.nullOrUndefined(o)) {
      if (D.defined(s)) {
        if (D.array(s) || D.plainObject(s))
          return Zk(s, u, o);
      } else
        return Mt(u, o);
      return !1;
    }
    return [a, l].every(D.array) ? !u.every(Dm(s)) : [a, l].every(D.plainObject) ? e_(Object.keys(s), Object.keys(u)) : ![a, l].every(function(c) {
      return D.primitive(c) && D.defined(c);
    }) && (i === "added" ? !D.defined(a) && D.defined(l) : D.defined(a) && !D.defined(l));
  }
  function Zv(e, t, n) {
    var r = n === void 0 ? {} : n, i = r.key, o = Xn(e, i), a = Xn(t, i);
    if (!Kb(o, a))
      throw new TypeError("Inputs have different types");
    if (!Xk(o, a))
      throw new TypeError("Inputs don't have length");
    return [o, a].every(D.plainObject) && (o = Object.keys(o), a = Object.keys(a)), [o, a];
  }
  function ey(e) {
    return function(t) {
      var n = t[0], r = t[1];
      return D.array(e) ? Mt(e, r) || e.some(function(i) {
        return Mt(i, r) || D.array(r) && Dm(r)(i);
      }) : D.plainObject(e) && e[n] ? !!e[n] && Mt(e[n], r) : Mt(e, r);
    };
  }
  function e_(e, t) {
    return t.some(function(n) {
      return !e.includes(n);
    });
  }
  function ty(e) {
    return function(t) {
      return D.array(e) ? e.some(function(n) {
        return Mt(n, t) || D.array(t) && Dm(t)(n);
      }) : Mt(e, t);
    };
  }
  function Ia(e, t) {
    return D.array(e) ? e.some(function(n) {
      return Mt(n, t);
    }) : Mt(e, t);
  }
  function Dm(e) {
    return function(t) {
      return e.some(function(n) {
        return Mt(n, t);
      });
    };
  }
  function Kb() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e.every(D.array) || e.every(D.number) || e.every(D.plainObject) || e.every(D.string);
  }
  function Xn(e, t) {
    if (D.plainObject(e) || D.array(e)) {
      if (D.string(t)) {
        var n = t.split(".");
        return n.reduce(function(r, i) {
          return r && r[i];
        }, e);
      }
      return D.number(t) ? e[t] : e;
    }
    return e;
  }
  function Fl(e, t) {
    if ([e, t].some(D.nullOrUndefined))
      throw new Error("Missing required parameters");
    if (![e, t].every(function(f) {
      return D.plainObject(f) || D.array(f);
    }))
      throw new Error("Expected plain objects or array");
    var n = function(f, d) {
      try {
        return Xv(e, t, { key: f, type: "added", value: d });
      } catch (p) {
        return !1;
      }
    }, r = function(f, d, p) {
      try {
        var h = Xn(e, f), m = Xn(t, f), S = D.defined(d), g = D.defined(p);
        if (S || g) {
          var v = g ? Ia(p, h) : !Ia(d, h), w = Ia(d, m);
          return v && w;
        }
        return [h, m].every(D.array) || [h, m].every(D.plainObject) ? !Mt(h, m) : h !== m;
      } catch (E) {
        return !1;
      }
    }, i = function(f, d, p) {
      if (!D.defined(f))
        return !1;
      try {
        var h = Xn(e, f), m = Xn(t, f), S = D.defined(p);
        return Ia(d, h) && (S ? Ia(p, m) : !S);
      } catch (g) {
        return !1;
      }
    }, o = function(f, d) {
      return D.defined(f) ? r(f, d) : !1;
    }, a = function(f, d, p) {
      if (!D.defined(f))
        return !1;
      try {
        return qv(e, t, { key: f, actual: d, previous: p, type: "decreased" });
      } catch (h) {
        return !1;
      }
    }, l = function(f) {
      try {
        var d = Zv(e, t, { key: f }), p = d[0], h = d[1];
        return !!p.length && !h.length;
      } catch (m) {
        return !1;
      }
    }, s = function(f) {
      try {
        var d = Zv(e, t, { key: f }), p = d[0], h = d[1];
        return !p.length && !!h.length;
      } catch (m) {
        return !1;
      }
    }, u = function(f, d, p) {
      if (!D.defined(f))
        return !1;
      try {
        return qv(e, t, { key: f, actual: d, previous: p, type: "increased" });
      } catch (h) {
        return !1;
      }
    }, c = function(f, d) {
      try {
        return Xv(e, t, { key: f, type: "removed", value: d });
      } catch (p) {
        return !1;
      }
    };
    return { added: n, changed: r, changedFrom: i, changedTo: o, decreased: a, emptied: l, filled: s, increased: u, removed: c };
  }
  var t_ = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ], n_ = [
    "Array",
    "ArrayBuffer",
    "AsyncFunction",
    "AsyncGenerator",
    "AsyncGeneratorFunction",
    "Date",
    "Error",
    "Function",
    "Generator",
    "GeneratorFunction",
    "HTMLElement",
    "Map",
    "Object",
    "Promise",
    "RegExp",
    "Set",
    "WeakMap",
    "WeakSet"
  ], r_ = [
    "bigint",
    "boolean",
    "null",
    "number",
    "string",
    "symbol",
    "undefined"
  ];
  function Mc(e) {
    const t = Object.prototype.toString.call(e).slice(8, -1);
    if (/HTML\w+Element/.test(t))
      return "HTMLElement";
    if (i_(t))
      return t;
  }
  function Yn(e) {
    return (t) => Mc(t) === e;
  }
  function i_(e) {
    return n_.includes(e);
  }
  function sa(e) {
    return (t) => typeof t === e;
  }
  function o_(e) {
    return r_.includes(e);
  }
  function J(e) {
    if (e === null)
      return "null";
    switch (typeof e) {
      case "bigint":
        return "bigint";
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "symbol":
        return "symbol";
      case "undefined":
        return "undefined";
    }
    if (J.array(e))
      return "Array";
    if (J.plainFunction(e))
      return "Function";
    const t = Mc(e);
    return t || "Object";
  }
  J.array = Array.isArray;
  J.arrayOf = (e, t) => !J.array(e) && !J.function(t) ? !1 : e.every((n) => t(n));
  J.asyncGeneratorFunction = (e) => Mc(e) === "AsyncGeneratorFunction";
  J.asyncFunction = Yn("AsyncFunction");
  J.bigint = sa("bigint");
  J.boolean = (e) => e === !0 || e === !1;
  J.date = Yn("Date");
  J.defined = (e) => !J.undefined(e);
  J.domElement = (e) => J.object(e) && !J.plainObject(e) && e.nodeType === 1 && J.string(e.nodeName) && t_.every((t) => t in e);
  J.empty = (e) => J.string(e) && e.length === 0 || J.array(e) && e.length === 0 || J.object(e) && !J.map(e) && !J.set(e) && Object.keys(e).length === 0 || J.set(e) && e.size === 0 || J.map(e) && e.size === 0;
  J.error = Yn("Error");
  J.function = sa("function");
  J.generator = (e) => J.iterable(e) && J.function(e.next) && J.function(e.throw);
  J.generatorFunction = Yn("GeneratorFunction");
  J.instanceOf = (e, t) => !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
  J.iterable = (e) => !J.nullOrUndefined(e) && J.function(e[Symbol.iterator]);
  J.map = Yn("Map");
  J.nan = (e) => Number.isNaN(e);
  J.null = (e) => e === null;
  J.nullOrUndefined = (e) => J.null(e) || J.undefined(e);
  J.number = (e) => sa("number")(e) && !J.nan(e);
  J.numericString = (e) => J.string(e) && e.length > 0 && !Number.isNaN(Number(e));
  J.object = (e) => !J.nullOrUndefined(e) && (J.function(e) || typeof e == "object");
  J.oneOf = (e, t) => J.array(e) ? e.indexOf(t) > -1 : !1;
  J.plainFunction = Yn("Function");
  J.plainObject = (e) => {
    if (Mc(e) !== "Object")
      return !1;
    const t = Object.getPrototypeOf(e);
    return t === null || t === Object.getPrototypeOf({});
  };
  J.primitive = (e) => J.null(e) || o_(typeof e);
  J.promise = Yn("Promise");
  J.propertyOf = (e, t, n) => {
    if (!J.object(e) || !t)
      return !1;
    const r = e[t];
    return J.function(n) ? n(r) : J.defined(r);
  };
  J.regexp = Yn("RegExp");
  J.set = Yn("Set");
  J.string = sa("string");
  J.symbol = sa("symbol");
  J.undefined = sa("undefined");
  J.weakMap = Yn("WeakMap");
  J.weakSet = Yn("WeakSet");
  var He = J, Hp = {}, a_ = {
    get exports() {
      return Hp;
    },
    set exports(e) {
      Hp = e;
    }
  };
  /*!
    Copyright (c) 2015 Jed Watson.
    Based on code that is Copyright 2013-2015, Facebook, Inc.
    All rights reserved.
  */
  (function(e) {
    (function() {
      var t = !!(typeof window != "undefined" && window.document && window.document.createElement), n = {
        canUseDOM: t,
        canUseWorkers: typeof Worker != "undefined",
        canUseEventListeners: t && !!(window.addEventListener || window.attachEvent),
        canUseViewport: t && !!window.screen
      };
      e.exports ? e.exports = n : window.ExecutionEnvironment = n;
    })();
  })(a_);
  const qb = Hp;
  var l_ = new Error("Element already at target scroll position"), s_ = new Error("Scroll cancelled"), u_ = Math.min, ny = Date.now, c_ = {
    left: ry("scrollLeft"),
    top: ry("scrollTop")
  };
  function ry(e) {
    return function(n, r, i, o) {
      i = i || {}, typeof i == "function" && (o = i, i = {}), typeof o != "function" && (o = d_);
      var a = ny(), l = n[e], s = i.ease || f_, u = isNaN(i.duration) ? 350 : +i.duration, c = !1;
      return l === r ? o(l_, n[e]) : requestAnimationFrame(d), f;
      function f() {
        c = !0;
      }
      function d(p) {
        if (c)
          return o(s_, n[e]);
        var h = ny(), m = u_(1, (h - a) / u), S = s(m);
        n[e] = S * (r - l) + l, m < 1 ? requestAnimationFrame(d) : requestAnimationFrame(function() {
          o(null, n[e]);
        });
      }
    };
  }
  function f_(e) {
    return 0.5 * (1 - Math.cos(Math.PI * e));
  }
  function d_() {
  }
  var Gp = {}, p_ = {
    get exports() {
      return Gp;
    },
    set exports(e) {
      Gp = e;
    }
  };
  (function(e) {
    (function(t, n) {
      e.exports ? e.exports = n() : t.Scrollparent = n();
    })(nx, function() {
      var t = /(auto|scroll)/, n = function(l, s) {
        return l.parentNode === null ? s : n(l.parentNode, s.concat([l]));
      }, r = function(l, s) {
        return getComputedStyle(l, null).getPropertyValue(s);
      }, i = function(l) {
        return r(l, "overflow") + r(l, "overflow-y") + r(l, "overflow-x");
      }, o = function(l) {
        return t.test(i(l));
      }, a = function(l) {
        if (l instanceof HTMLElement || l instanceof SVGElement) {
          for (var s = n(l.parentNode, []), u = 0; u < s.length; u += 1)
            if (o(s[u]))
              return s[u];
          return document.scrollingElement || document.documentElement;
        }
      };
      return a;
    });
  })(p_);
  const Xb = Gp;
  var Yr = {}, h_ = {
    get exports() {
      return Yr;
    },
    set exports(e) {
      Yr = e;
    }
  }, we = {};
  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var st = typeof Symbol == "function" && Symbol.for, Rm = st ? Symbol.for("react.element") : 60103, Lm = st ? Symbol.for("react.portal") : 60106, Fc = st ? Symbol.for("react.fragment") : 60107, Bc = st ? Symbol.for("react.strict_mode") : 60108, Uc = st ? Symbol.for("react.profiler") : 60114, zc = st ? Symbol.for("react.provider") : 60109, jc = st ? Symbol.for("react.context") : 60110, Mm = st ? Symbol.for("react.async_mode") : 60111, Wc = st ? Symbol.for("react.concurrent_mode") : 60111, Yc = st ? Symbol.for("react.forward_ref") : 60112, Vc = st ? Symbol.for("react.suspense") : 60113, m_ = st ? Symbol.for("react.suspense_list") : 60120, $c = st ? Symbol.for("react.memo") : 60115, Hc = st ? Symbol.for("react.lazy") : 60116, g_ = st ? Symbol.for("react.block") : 60121, v_ = st ? Symbol.for("react.fundamental") : 60117, y_ = st ? Symbol.for("react.responder") : 60118, w_ = st ? Symbol.for("react.scope") : 60119;
  function ln(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Rm:
          switch (e = e.type, e) {
            case Mm:
            case Wc:
            case Fc:
            case Uc:
            case Bc:
            case Vc:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case jc:
                case Yc:
                case Hc:
                case $c:
                case zc:
                  return e;
                default:
                  return t;
              }
          }
        case Lm:
          return t;
      }
    }
  }
  function Zb(e) {
    return ln(e) === Wc;
  }
  we.AsyncMode = Mm;
  we.ConcurrentMode = Wc;
  we.ContextConsumer = jc;
  we.ContextProvider = zc;
  we.Element = Rm;
  we.ForwardRef = Yc;
  we.Fragment = Fc;
  we.Lazy = Hc;
  we.Memo = $c;
  we.Portal = Lm;
  we.Profiler = Uc;
  we.StrictMode = Bc;
  we.Suspense = Vc;
  we.isAsyncMode = function(e) {
    return Zb(e) || ln(e) === Mm;
  };
  we.isConcurrentMode = Zb;
  we.isContextConsumer = function(e) {
    return ln(e) === jc;
  };
  we.isContextProvider = function(e) {
    return ln(e) === zc;
  };
  we.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Rm;
  };
  we.isForwardRef = function(e) {
    return ln(e) === Yc;
  };
  we.isFragment = function(e) {
    return ln(e) === Fc;
  };
  we.isLazy = function(e) {
    return ln(e) === Hc;
  };
  we.isMemo = function(e) {
    return ln(e) === $c;
  };
  we.isPortal = function(e) {
    return ln(e) === Lm;
  };
  we.isProfiler = function(e) {
    return ln(e) === Uc;
  };
  we.isStrictMode = function(e) {
    return ln(e) === Bc;
  };
  we.isSuspense = function(e) {
    return ln(e) === Vc;
  };
  we.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Fc || e === Wc || e === Uc || e === Bc || e === Vc || e === m_ || typeof e == "object" && e !== null && (e.$$typeof === Hc || e.$$typeof === $c || e.$$typeof === zc || e.$$typeof === jc || e.$$typeof === Yc || e.$$typeof === v_ || e.$$typeof === y_ || e.$$typeof === w_ || e.$$typeof === g_);
  };
  we.typeOf = ln;
  (function(e) {
    e.exports = we;
  })(h_);
  var b_ = function(t) {
    return S_(t) && !E_(t);
  };
  function S_(e) {
    return !!e && typeof e == "object";
  }
  function E_(e) {
    var t = Object.prototype.toString.call(e);
    return t === "[object RegExp]" || t === "[object Date]" || x_(e);
  }
  var A_ = typeof Symbol == "function" && Symbol.for, C_ = A_ ? Symbol.for("react.element") : 60103;
  function x_(e) {
    return e.$$typeof === C_;
  }
  function k_(e) {
    return Array.isArray(e) ? [] : {};
  }
  function Bl(e, t) {
    return t.clone !== !1 && t.isMergeableObject(e) ? Ho(k_(e), e, t) : e;
  }
  function __(e, t, n) {
    return e.concat(t).map(function(r) {
      return Bl(r, n);
    });
  }
  function O_(e, t) {
    if (!t.customMerge)
      return Ho;
    var n = t.customMerge(e);
    return typeof n == "function" ? n : Ho;
  }
  function I_(e) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
      return Object.propertyIsEnumerable.call(e, t);
    }) : [];
  }
  function iy(e) {
    return Object.keys(e).concat(I_(e));
  }
  function eS(e, t) {
    try {
      return t in e;
    } catch (n) {
      return !1;
    }
  }
  function T_(e, t) {
    return eS(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
  }
  function P_(e, t, n) {
    var r = {};
    return n.isMergeableObject(e) && iy(e).forEach(function(i) {
      r[i] = Bl(e[i], n);
    }), iy(t).forEach(function(i) {
      T_(e, i) || (eS(e, i) && n.isMergeableObject(t[i]) ? r[i] = O_(i, n)(e[i], t[i], n) : r[i] = Bl(t[i], n));
    }), r;
  }
  function Ho(e, t, n) {
    n = n || {}, n.arrayMerge = n.arrayMerge || __, n.isMergeableObject = n.isMergeableObject || b_, n.cloneUnlessOtherwiseSpecified = Bl;
    var r = Array.isArray(t), i = Array.isArray(e), o = r === i;
    return o ? r ? n.arrayMerge(e, t, n) : P_(e, t, n) : Bl(t, n);
  }
  Ho.all = function(t, n) {
    if (!Array.isArray(t))
      throw new Error("first argument should be an array");
    return t.reduce(function(r, i) {
      return Ho(r, i, n);
    }, {});
  };
  var N_ = Ho, Kn = N_, tS = {};
  Object.defineProperty(tS, "__esModule", { value: !0 });
  var D_ = "The typeValidator argument must be a function with the signature function(props, propName, componentName).", R_ = "The error message is optional, but must be a string if provided.", L_ = function(t, n, r, i) {
    return typeof t == "boolean" ? t : typeof t == "function" ? t(n, r, i) : !!t && !!t;
  }, M_ = function(t, n) {
    return Object.hasOwnProperty.call(t, n);
  }, F_ = function(t, n, r, i) {
    return i ? new Error(i) : new Error("Required " + t[n] + " `" + n + "`" + (" was not specified in `" + r + "`."));
  }, B_ = function(t, n) {
    if (typeof t != "function")
      throw new TypeError(D_);
    if (n && typeof n != "string")
      throw new TypeError(R_);
  }, U_ = function(t, n, r) {
    return B_(t, r), function(i, o, a) {
      for (var l = arguments.length, s = Array(3 < l ? l - 3 : 0), u = 3; u < l; u++)
        s[u - 3] = arguments[u];
      return L_(n, i, o, a) ? M_(i, o) ? t.apply(void 0, [i, o, a].concat(s)) : F_(i, o, a, r) : t.apply(void 0, [i, o, a].concat(s));
    };
  }, oy = tS.default = U_;
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var es = typeof window != "undefined" && typeof document != "undefined" && typeof navigator != "undefined", z_ = function() {
    for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
      if (es && navigator.userAgent.indexOf(e[t]) >= 0)
        return 1;
    return 0;
  }();
  function j_(e) {
    var t = !1;
    return function() {
      t || (t = !0, window.Promise.resolve().then(function() {
        t = !1, e();
      }));
    };
  }
  function W_(e) {
    var t = !1;
    return function() {
      t || (t = !0, setTimeout(function() {
        t = !1, e();
      }, z_));
    };
  }
  var Y_ = es && window.Promise, V_ = Y_ ? j_ : W_;
  function nS(e) {
    var t = {};
    return e && t.toString.call(e) === "[object Function]";
  }
  function Zi(e, t) {
    if (e.nodeType !== 1)
      return [];
    var n = e.ownerDocument.defaultView, r = n.getComputedStyle(e, null);
    return t ? r[t] : r;
  }
  function Fm(e) {
    return e.nodeName === "HTML" ? e : e.parentNode || e.host;
  }
  function ts(e) {
    if (!e)
      return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var t = Zi(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
    return /(auto|scroll|overlay)/.test(n + i + r) ? e : ts(Fm(e));
  }
  function rS(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  var ay = es && !!(window.MSInputMethodContext && document.documentMode), ly = es && /MSIE 10/.test(navigator.userAgent);
  function ua(e) {
    return e === 11 ? ay : e === 10 ? ly : ay || ly;
  }
  function Go(e) {
    if (!e)
      return document.documentElement;
    for (var t = ua(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling; )
      n = (e = e.nextElementSibling).offsetParent;
    var r = n && n.nodeName;
    return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(n.nodeName) !== -1 && Zi(n, "position") === "static" ? Go(n) : n;
  }
  function $_(e) {
    var t = e.nodeName;
    return t === "BODY" ? !1 : t === "HTML" || Go(e.firstElementChild) === e;
  }
  function Jp(e) {
    return e.parentNode !== null ? Jp(e.parentNode) : e;
  }
  function Gu(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType)
      return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = n ? e : t, i = n ? t : e, o = document.createRange();
    o.setStart(r, 0), o.setEnd(i, 0);
    var a = o.commonAncestorContainer;
    if (e !== a && t !== a || r.contains(i))
      return $_(a) ? a : Go(a);
    var l = Jp(e);
    return l.host ? Gu(l.host, t) : Gu(e, Jp(t).host);
  }
  function Jo(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", n = t === "top" ? "scrollTop" : "scrollLeft", r = e.nodeName;
    if (r === "BODY" || r === "HTML") {
      var i = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || i;
      return o[n];
    }
    return e[n];
  }
  function H_(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Jo(t, "top"), i = Jo(t, "left"), o = n ? -1 : 1;
    return e.top += r * o, e.bottom += r * o, e.left += i * o, e.right += i * o, e;
  }
  function sy(e, t) {
    var n = t === "x" ? "Left" : "Top", r = n === "Left" ? "Right" : "Bottom";
    return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"]);
  }
  function uy(e, t, n, r) {
    return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], ua(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
  }
  function iS(e) {
    var t = e.body, n = e.documentElement, r = ua(10) && getComputedStyle(n);
    return {
      height: uy("Height", t, n, r),
      width: uy("Width", t, n, r)
    };
  }
  var G_ = function(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }, J_ = function() {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), Qo = function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }, pn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  };
  function di(e) {
    return pn({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }
  function Qp(e) {
    var t = {};
    try {
      if (ua(10)) {
        t = e.getBoundingClientRect();
        var n = Jo(e, "top"), r = Jo(e, "left");
        t.top += n, t.left += r, t.bottom += n, t.right += r;
      } else
        t = e.getBoundingClientRect();
    } catch (f) {
    }
    var i = {
      left: t.left,
      top: t.top,
      width: t.right - t.left,
      height: t.bottom - t.top
    }, o = e.nodeName === "HTML" ? iS(e.ownerDocument) : {}, a = o.width || e.clientWidth || i.width, l = o.height || e.clientHeight || i.height, s = e.offsetWidth - a, u = e.offsetHeight - l;
    if (s || u) {
      var c = Zi(e);
      s -= sy(c, "x"), u -= sy(c, "y"), i.width -= s, i.height -= u;
    }
    return di(i);
  }
  function Bm(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = ua(10), i = t.nodeName === "HTML", o = Qp(e), a = Qp(t), l = ts(e), s = Zi(t), u = parseFloat(s.borderTopWidth), c = parseFloat(s.borderLeftWidth);
    n && i && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
    var f = di({
      top: o.top - a.top - u,
      left: o.left - a.left - c,
      width: o.width,
      height: o.height
    });
    if (f.marginTop = 0, f.marginLeft = 0, !r && i) {
      var d = parseFloat(s.marginTop), p = parseFloat(s.marginLeft);
      f.top -= u - d, f.bottom -= u - d, f.left -= c - p, f.right -= c - p, f.marginTop = d, f.marginLeft = p;
    }
    return (r && !n ? t.contains(l) : t === l && l.nodeName !== "BODY") && (f = H_(f, t)), f;
  }
  function Q_(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = e.ownerDocument.documentElement, r = Bm(e, n), i = Math.max(n.clientWidth, window.innerWidth || 0), o = Math.max(n.clientHeight, window.innerHeight || 0), a = t ? 0 : Jo(n), l = t ? 0 : Jo(n, "left"), s = {
      top: a - r.top + r.marginTop,
      left: l - r.left + r.marginLeft,
      width: i,
      height: o
    };
    return di(s);
  }
  function oS(e) {
    var t = e.nodeName;
    if (t === "BODY" || t === "HTML")
      return !1;
    if (Zi(e, "position") === "fixed")
      return !0;
    var n = Fm(e);
    return n ? oS(n) : !1;
  }
  function aS(e) {
    if (!e || !e.parentElement || ua())
      return document.documentElement;
    for (var t = e.parentElement; t && Zi(t, "transform") === "none"; )
      t = t.parentElement;
    return t || document.documentElement;
  }
  function Um(e, t, n, r) {
    var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, a = i ? aS(e) : Gu(e, rS(t));
    if (r === "viewport")
      o = Q_(a, i);
    else {
      var l = void 0;
      r === "scrollParent" ? (l = ts(Fm(t)), l.nodeName === "BODY" && (l = e.ownerDocument.documentElement)) : r === "window" ? l = e.ownerDocument.documentElement : l = r;
      var s = Bm(l, a, i);
      if (l.nodeName === "HTML" && !oS(a)) {
        var u = iS(e.ownerDocument), c = u.height, f = u.width;
        o.top += s.top - s.marginTop, o.bottom = c + s.top, o.left += s.left - s.marginLeft, o.right = f + s.left;
      } else
        o = s;
    }
    n = n || 0;
    var d = typeof n == "number";
    return o.left += d ? n : n.left || 0, o.top += d ? n : n.top || 0, o.right -= d ? n : n.right || 0, o.bottom -= d ? n : n.bottom || 0, o;
  }
  function K_(e) {
    var t = e.width, n = e.height;
    return t * n;
  }
  function lS(e, t, n, r, i) {
    var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
    if (e.indexOf("auto") === -1)
      return e;
    var a = Um(n, r, o, i), l = {
      top: {
        width: a.width,
        height: t.top - a.top
      },
      right: {
        width: a.right - t.right,
        height: a.height
      },
      bottom: {
        width: a.width,
        height: a.bottom - t.bottom
      },
      left: {
        width: t.left - a.left,
        height: a.height
      }
    }, s = Object.keys(l).map(function(d) {
      return pn({
        key: d
      }, l[d], {
        area: K_(l[d])
      });
    }).sort(function(d, p) {
      return p.area - d.area;
    }), u = s.filter(function(d) {
      var p = d.width, h = d.height;
      return p >= n.clientWidth && h >= n.clientHeight;
    }), c = u.length > 0 ? u[0].key : s[0].key, f = e.split("-")[1];
    return c + (f ? "-" + f : "");
  }
  function sS(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, i = r ? aS(t) : Gu(t, rS(n));
    return Bm(n, i, r);
  }
  function uS(e) {
    var t = e.ownerDocument.defaultView, n = t.getComputedStyle(e), r = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0), i = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0), o = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + r
    };
    return o;
  }
  function Ju(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function(n) {
      return t[n];
    });
  }
  function cS(e, t, n) {
    n = n.split("-")[0];
    var r = uS(e), i = {
      width: r.width,
      height: r.height
    }, o = ["right", "left"].indexOf(n) !== -1, a = o ? "top" : "left", l = o ? "left" : "top", s = o ? "height" : "width", u = o ? "width" : "height";
    return i[a] = t[a] + t[s] / 2 - r[s] / 2, n === l ? i[l] = t[l] - r[u] : i[l] = t[Ju(l)], i;
  }
  function ns(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function q_(e, t, n) {
    if (Array.prototype.findIndex)
      return e.findIndex(function(i) {
        return i[t] === n;
      });
    var r = ns(e, function(i) {
      return i[t] === n;
    });
    return e.indexOf(r);
  }
  function fS(e, t, n) {
    var r = n === void 0 ? e : e.slice(0, q_(e, "name", n));
    return r.forEach(function(i) {
      i.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var o = i.function || i.fn;
      i.enabled && nS(o) && (t.offsets.popper = di(t.offsets.popper), t.offsets.reference = di(t.offsets.reference), t = o(t, i));
    }), t;
  }
  function X_() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = sS(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = lS(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = cS(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = fS(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }
  function dS(e, t) {
    return e.some(function(n) {
      var r = n.name, i = n.enabled;
      return i && r === t;
    });
  }
  function zm(e) {
    for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
      var i = t[r], o = i ? "" + i + n : e;
      if (typeof document.body.style[o] != "undefined")
        return o;
    }
    return null;
  }
  function Z_() {
    return this.state.isDestroyed = !0, dS(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[zm("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }
  function pS(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function hS(e, t, n, r) {
    var i = e.nodeName === "BODY", o = i ? e.ownerDocument.defaultView : e;
    o.addEventListener(t, n, { passive: !0 }), i || hS(ts(o.parentNode), t, n, r), r.push(o);
  }
  function eO(e, t, n, r) {
    n.updateBound = r, pS(e).addEventListener("resize", n.updateBound, { passive: !0 });
    var i = ts(e);
    return hS(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n;
  }
  function tO() {
    this.state.eventsEnabled || (this.state = eO(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function nO(e, t) {
    return pS(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
      n.removeEventListener("scroll", t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }
  function rO() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = nO(this.reference, this.state));
  }
  function jm(e) {
    return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function Kp(e, t) {
    Object.keys(t).forEach(function(n) {
      var r = "";
      ["width", "height", "top", "right", "bottom", "left"].indexOf(n) !== -1 && jm(t[n]) && (r = "px"), e.style[n] = t[n] + r;
    });
  }
  function iO(e, t) {
    Object.keys(t).forEach(function(n) {
      var r = t[n];
      r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n);
    });
  }
  function oO(e) {
    return Kp(e.instance.popper, e.styles), iO(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Kp(e.arrowElement, e.arrowStyles), e;
  }
  function aO(e, t, n, r, i) {
    var o = sS(i, t, e, n.positionFixed), a = lS(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
    return t.setAttribute("x-placement", a), Kp(t, { position: n.positionFixed ? "fixed" : "absolute" }), n;
  }
  function lO(e, t) {
    var n = e.offsets, r = n.popper, i = n.reference, o = Math.round, a = Math.floor, l = function(g) {
      return g;
    }, s = o(i.width), u = o(r.width), c = ["left", "right"].indexOf(e.placement) !== -1, f = e.placement.indexOf("-") !== -1, d = s % 2 === u % 2, p = s % 2 === 1 && u % 2 === 1, h = t ? c || f || d ? o : a : l, m = t ? o : l;
    return {
      left: h(p && !f && t ? r.left - 1 : r.left),
      top: m(r.top),
      bottom: m(r.bottom),
      right: h(r.right)
    };
  }
  var sO = es && /Firefox/i.test(navigator.userAgent);
  function uO(e, t) {
    var n = t.x, r = t.y, i = e.offsets.popper, o = ns(e.instance.modifiers, function(w) {
      return w.name === "applyStyle";
    }).gpuAcceleration;
    o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
    var a = o !== void 0 ? o : t.gpuAcceleration, l = Go(e.instance.popper), s = Qp(l), u = {
      position: i.position
    }, c = lO(e, window.devicePixelRatio < 2 || !sO), f = n === "bottom" ? "top" : "bottom", d = r === "right" ? "left" : "right", p = zm("transform"), h = void 0, m = void 0;
    if (f === "bottom" ? l.nodeName === "HTML" ? m = -l.clientHeight + c.bottom : m = -s.height + c.bottom : m = c.top, d === "right" ? l.nodeName === "HTML" ? h = -l.clientWidth + c.right : h = -s.width + c.right : h = c.left, a && p)
      u[p] = "translate3d(" + h + "px, " + m + "px, 0)", u[f] = 0, u[d] = 0, u.willChange = "transform";
    else {
      var S = f === "bottom" ? -1 : 1, g = d === "right" ? -1 : 1;
      u[f] = m * S, u[d] = h * g, u.willChange = f + ", " + d;
    }
    var v = {
      "x-placement": e.placement
    };
    return e.attributes = pn({}, v, e.attributes), e.styles = pn({}, u, e.styles), e.arrowStyles = pn({}, e.offsets.arrow, e.arrowStyles), e;
  }
  function mS(e, t, n) {
    var r = ns(e, function(l) {
      var s = l.name;
      return s === t;
    }), i = !!r && e.some(function(l) {
      return l.name === n && l.enabled && l.order < r.order;
    });
    if (!i) {
      var o = "`" + t + "`", a = "`" + n + "`";
      console.warn(a + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
    }
    return i;
  }
  function cO(e, t) {
    var n;
    if (!mS(e.instance.modifiers, "arrow", "keepTogether"))
      return e;
    var r = t.element;
    if (typeof r == "string") {
      if (r = e.instance.popper.querySelector(r), !r)
        return e;
    } else if (!e.instance.popper.contains(r))
      return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
    var i = e.placement.split("-")[0], o = e.offsets, a = o.popper, l = o.reference, s = ["left", "right"].indexOf(i) !== -1, u = s ? "height" : "width", c = s ? "Top" : "Left", f = c.toLowerCase(), d = s ? "left" : "top", p = s ? "bottom" : "right", h = uS(r)[u];
    l[p] - h < a[f] && (e.offsets.popper[f] -= a[f] - (l[p] - h)), l[f] + h > a[p] && (e.offsets.popper[f] += l[f] + h - a[p]), e.offsets.popper = di(e.offsets.popper);
    var m = l[f] + l[u] / 2 - h / 2, S = Zi(e.instance.popper), g = parseFloat(S["margin" + c]), v = parseFloat(S["border" + c + "Width"]), w = m - e.offsets.popper[f] - g - v;
    return w = Math.max(Math.min(a[u] - h, w), 0), e.arrowElement = r, e.offsets.arrow = (n = {}, Qo(n, f, Math.round(w)), Qo(n, d, ""), n), e;
  }
  function fO(e) {
    return e === "end" ? "start" : e === "start" ? "end" : e;
  }
  var gS = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], pd = gS.slice(3);
  function cy(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = pd.indexOf(e), r = pd.slice(n + 1).concat(pd.slice(0, n));
    return t ? r.reverse() : r;
  }
  var hd = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise"
  };
  function dO(e, t) {
    if (dS(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
      return e;
    var n = Um(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], i = Ju(r), o = e.placement.split("-")[1] || "", a = [];
    switch (t.behavior) {
      case hd.FLIP:
        a = [r, i];
        break;
      case hd.CLOCKWISE:
        a = cy(r);
        break;
      case hd.COUNTERCLOCKWISE:
        a = cy(r, !0);
        break;
      default:
        a = t.behavior;
    }
    return a.forEach(function(l, s) {
      if (r !== l || a.length === s + 1)
        return e;
      r = e.placement.split("-")[0], i = Ju(r);
      var u = e.offsets.popper, c = e.offsets.reference, f = Math.floor, d = r === "left" && f(u.right) > f(c.left) || r === "right" && f(u.left) < f(c.right) || r === "top" && f(u.bottom) > f(c.top) || r === "bottom" && f(u.top) < f(c.bottom), p = f(u.left) < f(n.left), h = f(u.right) > f(n.right), m = f(u.top) < f(n.top), S = f(u.bottom) > f(n.bottom), g = r === "left" && p || r === "right" && h || r === "top" && m || r === "bottom" && S, v = ["top", "bottom"].indexOf(r) !== -1, w = !!t.flipVariations && (v && o === "start" && p || v && o === "end" && h || !v && o === "start" && m || !v && o === "end" && S), E = !!t.flipVariationsByContent && (v && o === "start" && h || v && o === "end" && p || !v && o === "start" && S || !v && o === "end" && m), k = w || E;
      (d || g || k) && (e.flipped = !0, (d || g) && (r = a[s + 1]), k && (o = fO(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = pn({}, e.offsets.popper, cS(e.instance.popper, e.offsets.reference, e.placement)), e = fS(e.instance.modifiers, e, "flip"));
    }), e;
  }
  function pO(e) {
    var t = e.offsets, n = t.popper, r = t.reference, i = e.placement.split("-")[0], o = Math.floor, a = ["top", "bottom"].indexOf(i) !== -1, l = a ? "right" : "bottom", s = a ? "left" : "top", u = a ? "width" : "height";
    return n[l] < o(r[s]) && (e.offsets.popper[s] = o(r[s]) - n[u]), n[s] > o(r[l]) && (e.offsets.popper[s] = o(r[l])), e;
  }
  function hO(e, t, n, r) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), o = +i[1], a = i[2];
    if (!o)
      return e;
    if (a.indexOf("%") === 0) {
      var l = void 0;
      switch (a) {
        case "%p":
          l = n;
          break;
        case "%":
        case "%r":
        default:
          l = r;
      }
      var s = di(l);
      return s[t] / 100 * o;
    } else if (a === "vh" || a === "vw") {
      var u = void 0;
      return a === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
    } else
      return o;
  }
  function mO(e, t, n, r) {
    var i = [0, 0], o = ["right", "left"].indexOf(r) !== -1, a = e.split(/(\+|\-)/).map(function(c) {
      return c.trim();
    }), l = a.indexOf(ns(a, function(c) {
      return c.search(/,|\s/) !== -1;
    }));
    a[l] && a[l].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var s = /\s*,\s*|\s+/, u = l !== -1 ? [a.slice(0, l).concat([a[l].split(s)[0]]), [a[l].split(s)[1]].concat(a.slice(l + 1))] : [a];
    return u = u.map(function(c, f) {
      var d = (f === 1 ? !o : o) ? "height" : "width", p = !1;
      return c.reduce(function(h, m) {
        return h[h.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (h[h.length - 1] = m, p = !0, h) : p ? (h[h.length - 1] += m, p = !1, h) : h.concat(m);
      }, []).map(function(h) {
        return hO(h, d, t, n);
      });
    }), u.forEach(function(c, f) {
      c.forEach(function(d, p) {
        jm(d) && (i[f] += d * (c[p - 1] === "-" ? -1 : 1));
      });
    }), i;
  }
  function gO(e, t) {
    var n = t.offset, r = e.placement, i = e.offsets, o = i.popper, a = i.reference, l = r.split("-")[0], s = void 0;
    return jm(+n) ? s = [+n, 0] : s = mO(n, o, a, l), l === "left" ? (o.top += s[0], o.left -= s[1]) : l === "right" ? (o.top += s[0], o.left += s[1]) : l === "top" ? (o.left += s[0], o.top -= s[1]) : l === "bottom" && (o.left += s[0], o.top += s[1]), e.popper = o, e;
  }
  function vO(e, t) {
    var n = t.boundariesElement || Go(e.instance.popper);
    e.instance.reference === n && (n = Go(n));
    var r = zm("transform"), i = e.instance.popper.style, o = i.top, a = i.left, l = i[r];
    i.top = "", i.left = "", i[r] = "";
    var s = Um(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
    i.top = o, i.left = a, i[r] = l, t.boundaries = s;
    var u = t.priority, c = e.offsets.popper, f = {
      primary: function(p) {
        var h = c[p];
        return c[p] < s[p] && !t.escapeWithReference && (h = Math.max(c[p], s[p])), Qo({}, p, h);
      },
      secondary: function(p) {
        var h = p === "right" ? "left" : "top", m = c[h];
        return c[p] > s[p] && !t.escapeWithReference && (m = Math.min(c[h], s[p] - (p === "right" ? c.width : c.height))), Qo({}, h, m);
      }
    };
    return u.forEach(function(d) {
      var p = ["left", "top"].indexOf(d) !== -1 ? "primary" : "secondary";
      c = pn({}, c, f[p](d));
    }), e.offsets.popper = c, e;
  }
  function yO(e) {
    var t = e.placement, n = t.split("-")[0], r = t.split("-")[1];
    if (r) {
      var i = e.offsets, o = i.reference, a = i.popper, l = ["bottom", "top"].indexOf(n) !== -1, s = l ? "left" : "top", u = l ? "width" : "height", c = {
        start: Qo({}, s, o[s]),
        end: Qo({}, s, o[s] + o[u] - a[u])
      };
      e.offsets.popper = pn({}, a, c[r]);
    }
    return e;
  }
  function wO(e) {
    if (!mS(e.instance.modifiers, "hide", "preventOverflow"))
      return e;
    var t = e.offsets.reference, n = ns(e.instance.modifiers, function(r) {
      return r.name === "preventOverflow";
    }).boundaries;
    if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
      if (e.hide === !0)
        return e;
      e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
    } else {
      if (e.hide === !1)
        return e;
      e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
    }
    return e;
  }
  function bO(e) {
    var t = e.placement, n = t.split("-")[0], r = e.offsets, i = r.popper, o = r.reference, a = ["left", "right"].indexOf(n) !== -1, l = ["top", "left"].indexOf(n) === -1;
    return i[a ? "left" : "top"] = o[n] - (l ? i[a ? "width" : "height"] : 0), e.placement = Ju(t), e.offsets.popper = di(i), e;
  }
  var SO = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: yO
    },
    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: gO,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },
    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: vO,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ["left", "right", "top", "bottom"],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: "scrollParent"
    },
    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: pO
    },
    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: cO,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: "[x-arrow]"
    },
    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: dO,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: "flip",
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: "viewport",
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: !1,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: !1
    },
    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: !1,
      /** @prop {ModifierFn} */
      fn: bO
    },
    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: wO
    },
    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: uO,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: !0,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: "bottom",
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: "right"
    },
    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: oO,
      /** @prop {Function} */
      onLoad: aO,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: void 0
    }
  }, EO = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: "bottom",
    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: !1,
    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: !0,
    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: !1,
    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function() {
    },
    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function() {
    },
    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: SO
  }, Gc = function() {
    function e(t, n) {
      var r = this, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      G_(this, e), this.scheduleUpdate = function() {
        return requestAnimationFrame(r.update);
      }, this.update = V_(this.update.bind(this)), this.options = pn({}, e.Defaults, i), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(pn({}, e.Defaults.modifiers, i.modifiers)).forEach(function(a) {
        r.options.modifiers[a] = pn({}, e.Defaults.modifiers[a] || {}, i.modifiers ? i.modifiers[a] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
        return pn({
          name: a
        }, r.options.modifiers[a]);
      }).sort(function(a, l) {
        return a.order - l.order;
      }), this.modifiers.forEach(function(a) {
        a.enabled && nS(a.onLoad) && a.onLoad(r.reference, r.popper, r.options, a, r.state);
      }), this.update();
      var o = this.options.eventsEnabled;
      o && this.enableEventListeners(), this.state.eventsEnabled = o;
    }
    return J_(e, [{
      key: "update",
      value: function() {
        return X_.call(this);
      }
    }, {
      key: "destroy",
      value: function() {
        return Z_.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function() {
        return tO.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function() {
        return rO.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */
      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */
    }]), e;
  }();
  Gc.Utils = (typeof window != "undefined" ? window : global).PopperUtils;
  Gc.placements = gS;
  Gc.Defaults = EO;
  const fy = Gc;
  function dy(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function Pe(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? dy(Object(n), !0).forEach(function(r) {
        wt(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dy(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function rs(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function py(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function is(e, t, n) {
    return t && py(e.prototype, t), n && py(e, n), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function wt(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function os(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(e, "prototype", {
      writable: !1
    }), t && qp(e, t);
  }
  function Qu(e) {
    return Qu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
      return n.__proto__ || Object.getPrototypeOf(n);
    }, Qu(e);
  }
  function qp(e, t) {
    return qp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
      return r.__proto__ = i, r;
    }, qp(e, t);
  }
  function AO() {
    if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function")
      return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch (e) {
      return !1;
    }
  }
  function CO(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function vS(e, t) {
    if (e == null)
      return {};
    var n = CO(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function dr(e) {
    if (e === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function xO(e, t) {
    if (t && (typeof t == "object" || typeof t == "function"))
      return t;
    if (t !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return dr(e);
  }
  function as(e) {
    var t = AO();
    return function() {
      var r = Qu(e), i;
      if (t) {
        var o = Qu(this).constructor;
        i = Reflect.construct(r, arguments, o);
      } else
        i = r.apply(this, arguments);
      return xO(this, i);
    };
  }
  var kO = { flip: { padding: 20 }, preventOverflow: { padding: 10 } }, ge = { INIT: "init", IDLE: "idle", OPENING: "opening", OPEN: "open", CLOSING: "closing", ERROR: "error" }, gr = qb.canUseDOM, Ta = Ui.createPortal !== void 0;
  function md() {
    return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
  }
  function $s(e) {
    var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
    a && t && n && (console.groupCollapsed("%creact-floater: ".concat(t), "color: #9b00ff; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
      D.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
    }) : l.apply(console, [n]), console.groupEnd());
  }
  function _O(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    e.addEventListener(t, n, r);
  }
  function OO(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    e.removeEventListener(t, n, r);
  }
  function IO(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i;
    i = function(a) {
      n(a), OO(e, t, i);
    }, _O(e, t, i, r);
  }
  function hy() {
  }
  var yS = /* @__PURE__ */ function(e) {
    os(n, e);
    var t = as(n);
    function n() {
      return rs(this, n), t.apply(this, arguments);
    }
    return is(n, [{ key: "componentDidMount", value: function() {
      gr && (this.node || this.appendNode(), Ta || this.renderPortal());
    } }, { key: "componentDidUpdate", value: function() {
      gr && (Ta || this.renderPortal());
    } }, { key: "componentWillUnmount", value: function() {
      !gr || !this.node || (Ta || Ui.unmountComponentAtNode(this.node), this.node && this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
    } }, { key: "appendNode", value: function() {
      var i = this.props, o = i.id, a = i.zIndex;
      this.node || (this.node = document.createElement("div"), o && (this.node.id = o), a && (this.node.style.zIndex = a), document.body.appendChild(this.node));
    } }, { key: "renderPortal", value: function() {
      if (!gr)
        return null;
      var i = this.props, o = i.children, a = i.setRef;
      if (this.node || this.appendNode(), Ta)
        return /* @__PURE__ */ Ui.createPortal(o, this.node);
      var l = Ui.unstable_renderSubtreeIntoContainer(this, o.length > 1 ? /* @__PURE__ */ _.createElement("div", null, o) : o[0], this.node);
      return a(l), null;
    } }, { key: "renderReact16", value: function() {
      var i = this.props, o = i.hasChildren, a = i.placement, l = i.target;
      return o ? this.renderPortal() : l || a === "center" ? this.renderPortal() : null;
    } }, { key: "render", value: function() {
      return Ta ? this.renderReact16() : null;
    } }]), n;
  }(_.Component);
  wt(yS, "propTypes", { children: N.oneOfType([N.element, N.array]), hasChildren: N.bool, id: N.oneOfType([N.string, N.number]), placement: N.string, setRef: N.func.isRequired, target: N.oneOfType([N.object, N.string]), zIndex: N.number });
  var wS = /* @__PURE__ */ function(e) {
    os(n, e);
    var t = as(n);
    function n() {
      return rs(this, n), t.apply(this, arguments);
    }
    return is(n, [{ key: "parentStyle", get: function() {
      var i = this.props, o = i.placement, a = i.styles, l = a.arrow.length, s = { pointerEvents: "none", position: "absolute", width: "100%" };
      return o.startsWith("top") ? (s.bottom = 0, s.left = 0, s.right = 0, s.height = l) : o.startsWith("bottom") ? (s.left = 0, s.right = 0, s.top = 0, s.height = l) : o.startsWith("left") ? (s.right = 0, s.top = 0, s.bottom = 0) : o.startsWith("right") && (s.left = 0, s.top = 0), s;
    } }, { key: "render", value: function() {
      var i = this.props, o = i.placement, a = i.setArrowRef, l = i.styles, s = l.arrow, u = s.color, c = s.display, f = s.length, d = s.margin, p = s.position, h = s.spread, m = { display: c, position: p }, S, g = h, v = f;
      return o.startsWith("top") ? (S = "0,0 ".concat(g / 2, ",").concat(v, " ").concat(g, ",0"), m.bottom = 0, m.marginLeft = d, m.marginRight = d) : o.startsWith("bottom") ? (S = "".concat(g, ",").concat(v, " ").concat(g / 2, ",0 0,").concat(v), m.top = 0, m.marginLeft = d, m.marginRight = d) : o.startsWith("left") ? (v = h, g = f, S = "0,0 ".concat(g, ",").concat(v / 2, " 0,").concat(v), m.right = 0, m.marginTop = d, m.marginBottom = d) : o.startsWith("right") && (v = h, g = f, S = "".concat(g, ",").concat(v, " ").concat(g, ",0 0,").concat(v / 2), m.left = 0, m.marginTop = d, m.marginBottom = d), /* @__PURE__ */ _.createElement("div", { className: "__floater__arrow", style: this.parentStyle }, /* @__PURE__ */ _.createElement("span", { ref: a, style: m }, /* @__PURE__ */ _.createElement("svg", { width: g, height: v, version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ _.createElement("polygon", { points: S, fill: u }))));
    } }]), n;
  }(_.Component);
  wt(wS, "propTypes", { placement: N.string.isRequired, setArrowRef: N.func.isRequired, styles: N.object.isRequired });
  var TO = ["color", "height", "width"], bS = function(t) {
    var n = t.handleClick, r = t.styles, i = r.color, o = r.height, a = r.width, l = vS(r, TO);
    return /* @__PURE__ */ _.createElement("button", { "aria-label": "close", onClick: n, style: l, type: "button" }, /* @__PURE__ */ _.createElement("svg", { width: "".concat(a, "px"), height: "".concat(o, "px"), viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, /* @__PURE__ */ _.createElement("g", null, /* @__PURE__ */ _.createElement("path", { d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z", fill: i }))));
  };
  bS.propTypes = { handleClick: N.func.isRequired, styles: N.object.isRequired };
  var SS = function(t) {
    var n = t.content, r = t.footer, i = t.handleClick, o = t.open, a = t.positionWrapper, l = t.showCloseButton, s = t.title, u = t.styles, c = { content: /* @__PURE__ */ _.isValidElement(n) ? n : /* @__PURE__ */ _.createElement("div", { className: "__floater__content", style: u.content }, n) };
    return s && (c.title = /* @__PURE__ */ _.isValidElement(s) ? s : /* @__PURE__ */ _.createElement("div", { className: "__floater__title", style: u.title }, s)), r && (c.footer = /* @__PURE__ */ _.isValidElement(r) ? r : /* @__PURE__ */ _.createElement("div", { className: "__floater__footer", style: u.footer }, r)), (l || a) && !D.boolean(o) && (c.close = /* @__PURE__ */ _.createElement(bS, { styles: u.close, handleClick: i })), /* @__PURE__ */ _.createElement("div", { className: "__floater__container", style: u.container }, c.close, c.title, c.content, c.footer);
  };
  SS.propTypes = { content: N.node.isRequired, footer: N.node, handleClick: N.func.isRequired, open: N.bool, positionWrapper: N.bool.isRequired, showCloseButton: N.bool.isRequired, styles: N.object.isRequired, title: N.node };
  var ES = /* @__PURE__ */ function(e) {
    os(n, e);
    var t = as(n);
    function n() {
      return rs(this, n), t.apply(this, arguments);
    }
    return is(n, [{ key: "style", get: function() {
      var i = this.props, o = i.disableAnimation, a = i.component, l = i.placement, s = i.hideArrow, u = i.status, c = i.styles, f = c.arrow.length, d = c.floater, p = c.floaterCentered, h = c.floaterClosing, m = c.floaterOpening, S = c.floaterWithAnimation, g = c.floaterWithComponent, v = {};
      return s || (l.startsWith("top") ? v.padding = "0 0 ".concat(f, "px") : l.startsWith("bottom") ? v.padding = "".concat(f, "px 0 0") : l.startsWith("left") ? v.padding = "0 ".concat(f, "px 0 0") : l.startsWith("right") && (v.padding = "0 0 0 ".concat(f, "px"))), [ge.OPENING, ge.OPEN].indexOf(u) !== -1 && (v = Pe(Pe({}, v), m)), u === ge.CLOSING && (v = Pe(Pe({}, v), h)), u === ge.OPEN && !o && (v = Pe(Pe({}, v), S)), l === "center" && (v = Pe(Pe({}, v), p)), a && (v = Pe(Pe({}, v), g)), Pe(Pe({}, d), v);
    } }, { key: "render", value: function() {
      var i = this.props, o = i.component, a = i.handleClick, l = i.hideArrow, s = i.setFloaterRef, u = i.status, c = {}, f = ["__floater"];
      return o ? /* @__PURE__ */ _.isValidElement(o) ? c.content = /* @__PURE__ */ _.cloneElement(o, { closeFn: a }) : c.content = o({ closeFn: a }) : c.content = /* @__PURE__ */ _.createElement(SS, this.props), u === ge.OPEN && f.push("__floater__open"), l || (c.arrow = /* @__PURE__ */ _.createElement(wS, this.props)), /* @__PURE__ */ _.createElement("div", { ref: s, className: f.join(" "), style: this.style }, /* @__PURE__ */ _.createElement("div", { className: "__floater__body" }, c.content, c.arrow));
    } }]), n;
  }(_.Component);
  wt(ES, "propTypes", { component: N.oneOfType([N.func, N.element]), content: N.node, disableAnimation: N.bool.isRequired, footer: N.node, handleClick: N.func.isRequired, hideArrow: N.bool.isRequired, open: N.bool, placement: N.string.isRequired, positionWrapper: N.bool.isRequired, setArrowRef: N.func.isRequired, setFloaterRef: N.func.isRequired, showCloseButton: N.bool, status: N.string.isRequired, styles: N.object.isRequired, title: N.node });
  var AS = /* @__PURE__ */ function(e) {
    os(n, e);
    var t = as(n);
    function n() {
      return rs(this, n), t.apply(this, arguments);
    }
    return is(n, [{ key: "render", value: function() {
      var i = this.props, o = i.children, a = i.handleClick, l = i.handleMouseEnter, s = i.handleMouseLeave, u = i.setChildRef, c = i.setWrapperRef, f = i.style, d = i.styles, p;
      if (o)
        if (_.Children.count(o) === 1)
          if (!/* @__PURE__ */ _.isValidElement(o))
            p = /* @__PURE__ */ _.createElement("span", null, o);
          else {
            var h = D.function(o.type) ? "innerRef" : "ref";
            p = /* @__PURE__ */ _.cloneElement(_.Children.only(o), wt({}, h, u));
          }
        else
          p = o;
      return p ? /* @__PURE__ */ _.createElement("span", { ref: c, style: Pe(Pe({}, d), f), onClick: a, onMouseEnter: l, onMouseLeave: s }, p) : null;
    } }]), n;
  }(_.Component);
  wt(AS, "propTypes", { children: N.node, handleClick: N.func.isRequired, handleMouseEnter: N.func.isRequired, handleMouseLeave: N.func.isRequired, setChildRef: N.func.isRequired, setWrapperRef: N.func.isRequired, style: N.object, styles: N.object.isRequired });
  var PO = { zIndex: 100 };
  function NO(e) {
    var t = Kn(PO, e.options || {});
    return { wrapper: { cursor: "help", display: "inline-flex", flexDirection: "column", zIndex: t.zIndex }, wrapperPosition: { left: -1e3, position: "absolute", top: -1e3, visibility: "hidden" }, floater: { display: "inline-block", filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))", maxWidth: 300, opacity: 0, position: "relative", transition: "opacity 0.3s", visibility: "hidden", zIndex: t.zIndex }, floaterOpening: { opacity: 1, visibility: "visible" }, floaterWithAnimation: { opacity: 1, transition: "opacity 0.3s, transform 0.2s", visibility: "visible" }, floaterWithComponent: { maxWidth: "100%" }, floaterClosing: { opacity: 0, visibility: "visible" }, floaterCentered: { left: "50%", position: "fixed", top: "50%", transform: "translate(-50%, -50%)" }, container: { backgroundColor: "#fff", color: "#666", minHeight: 60, minWidth: 200, padding: 20, position: "relative", zIndex: 10 }, title: { borderBottom: "1px solid #555", color: "#555", fontSize: 18, marginBottom: 5, paddingBottom: 6, paddingRight: 18 }, content: { fontSize: 15 }, close: { backgroundColor: "transparent", border: 0, borderRadius: 0, color: "#555", fontSize: 0, height: 15, outline: "none", padding: 10, position: "absolute", right: 0, top: 0, width: 15, WebkitAppearance: "none" }, footer: { borderTop: "1px solid #ccc", fontSize: 13, marginTop: 10, paddingTop: 5 }, arrow: { color: "#fff", display: "inline-flex", length: 16, margin: 8, position: "absolute", spread: 32 }, options: t };
  }
  var DO = ["arrow", "flip", "offset"], RO = ["position", "top", "right", "bottom", "left"], Wm = /* @__PURE__ */ function(e) {
    os(n, e);
    var t = as(n);
    function n(r) {
      var i;
      return rs(this, n), i = t.call(this, r), wt(dr(i), "setArrowRef", function(o) {
        i.arrowRef = o;
      }), wt(dr(i), "setChildRef", function(o) {
        i.childRef = o;
      }), wt(dr(i), "setFloaterRef", function(o) {
        i.floaterRef = o;
      }), wt(dr(i), "setWrapperRef", function(o) {
        i.wrapperRef = o;
      }), wt(dr(i), "handleTransitionEnd", function() {
        var o = i.state.status, a = i.props.callback;
        i.wrapperPopper && i.wrapperPopper.instance.update(), i.setState({ status: o === ge.OPENING ? ge.OPEN : ge.IDLE }, function() {
          var l = i.state.status;
          a(l === ge.OPEN ? "open" : "close", i.props);
        });
      }), wt(dr(i), "handleClick", function() {
        var o = i.props, a = o.event, l = o.open;
        if (!D.boolean(l)) {
          var s = i.state, u = s.positionWrapper, c = s.status;
          (i.event === "click" || i.event === "hover" && u) && ($s({ title: "click", data: [{ event: a, status: c === ge.OPEN ? "closing" : "opening" }], debug: i.debug }), i.toggle());
        }
      }), wt(dr(i), "handleMouseEnter", function() {
        var o = i.props, a = o.event, l = o.open;
        if (!(D.boolean(l) || md())) {
          var s = i.state.status;
          i.event === "hover" && s === ge.IDLE && ($s({ title: "mouseEnter", data: [{ key: "originalEvent", value: a }], debug: i.debug }), clearTimeout(i.eventDelayTimeout), i.toggle());
        }
      }), wt(dr(i), "handleMouseLeave", function() {
        var o = i.props, a = o.event, l = o.eventDelay, s = o.open;
        if (!(D.boolean(s) || md())) {
          var u = i.state, c = u.status, f = u.positionWrapper;
          i.event === "hover" && ($s({ title: "mouseLeave", data: [{ key: "originalEvent", value: a }], debug: i.debug }), l ? [ge.OPENING, ge.OPEN].indexOf(c) !== -1 && !f && !i.eventDelayTimeout && (i.eventDelayTimeout = setTimeout(function() {
            delete i.eventDelayTimeout, i.toggle();
          }, l * 1e3)) : i.toggle(ge.IDLE));
        }
      }), i.state = { currentPlacement: r.placement, needsUpdate: !1, positionWrapper: r.wrapperOptions.position && !!r.target, status: ge.INIT, statusWrapper: ge.INIT }, i._isMounted = !1, i.hasMounted = !1, gr && window.addEventListener("load", function() {
        i.popper && i.popper.instance.update(), i.wrapperPopper && i.wrapperPopper.instance.update();
      }), i;
    }
    return is(n, [{ key: "componentDidMount", value: function() {
      if (gr) {
        var i = this.state.positionWrapper, o = this.props, a = o.children, l = o.open, s = o.target;
        this._isMounted = !0, $s({ title: "init", data: { hasChildren: !!a, hasTarget: !!s, isControlled: D.boolean(l), positionWrapper: i, target: this.target, floater: this.floaterRef }, debug: this.debug }), this.hasMounted || (this.initPopper(), this.hasMounted = !0), !a && s && D.boolean(l);
      }
    } }, { key: "componentDidUpdate", value: function(i, o) {
      if (gr) {
        var a = this.props, l = a.autoOpen, s = a.open, u = a.target, c = a.wrapperOptions, f = Fl(o, this.state), d = f.changedFrom, p = f.changed;
        if (i.open !== s) {
          var h;
          D.boolean(s) && (h = s ? ge.OPENING : ge.CLOSING), this.toggle(h);
        }
        (i.wrapperOptions.position !== c.position || i.target !== u) && this.changeWrapperPosition(this.props), p("status", ge.IDLE) && s ? this.toggle(ge.OPEN) : d("status", ge.INIT, ge.IDLE) && l && this.toggle(ge.OPEN), this.popper && p("status", ge.OPENING) && this.popper.instance.update(), this.floaterRef && (p("status", ge.OPENING) || p("status", ge.CLOSING)) && IO(this.floaterRef, "transitionend", this.handleTransitionEnd), p("needsUpdate", !0) && this.rebuildPopper();
      }
    } }, { key: "componentWillUnmount", value: function() {
      gr && (this._isMounted = !1, this.popper && this.popper.instance.destroy(), this.wrapperPopper && this.wrapperPopper.instance.destroy());
    } }, { key: "initPopper", value: function() {
      var i = this, o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.target, a = this.state.positionWrapper, l = this.props, s = l.disableFlip, u = l.getPopper, c = l.hideArrow, f = l.offset, d = l.placement, p = l.wrapperOptions, h = d === "top" || d === "bottom" ? "flip" : ["right", "bottom-end", "top-end", "left", "top-start", "bottom-start"];
      if (d === "center")
        this.setState({ status: ge.IDLE });
      else if (o && this.floaterRef) {
        var m = this.options, S = m.arrow, g = m.flip, v = m.offset, w = vS(m, DO);
        new fy(o, this.floaterRef, { placement: d, modifiers: Pe({ arrow: Pe({ enabled: !c, element: this.arrowRef }, S), flip: Pe({ enabled: !s, behavior: h }, g), offset: Pe({ offset: "0, ".concat(f, "px") }, v) }, w), onCreate: function(b) {
          var A;
          if (i.popper = b, !((A = i.floaterRef) !== null && A !== void 0 && A.isConnected)) {
            i.setState({ needsUpdate: !0 });
            return;
          }
          u(b, "floater"), i._isMounted && i.setState({ currentPlacement: b.placement, status: ge.IDLE }), d !== b.placement && setTimeout(function() {
            b.instance.update();
          }, 1);
        }, onUpdate: function(b) {
          i.popper = b;
          var A = i.state.currentPlacement;
          i._isMounted && b.placement !== A && i.setState({ currentPlacement: b.placement });
        } });
      }
      if (a) {
        var E = D.undefined(p.offset) ? 0 : p.offset;
        new fy(this.target, this.wrapperRef, { placement: p.placement || d, modifiers: { arrow: { enabled: !1 }, offset: { offset: "0, ".concat(E, "px") }, flip: { enabled: !1 } }, onCreate: function(b) {
          i.wrapperPopper = b, i._isMounted && i.setState({ statusWrapper: ge.IDLE }), u(b, "wrapper"), d !== b.placement && setTimeout(function() {
            b.instance.update();
          }, 1);
        } });
      }
    } }, { key: "rebuildPopper", value: function() {
      var i = this;
      this.floaterRefInterval = setInterval(function() {
        var o;
        (o = i.floaterRef) !== null && o !== void 0 && o.isConnected && (clearInterval(i.floaterRefInterval), i.setState({ needsUpdate: !1 }), i.initPopper());
      }, 50);
    } }, { key: "changeWrapperPosition", value: function(i) {
      var o = i.target, a = i.wrapperOptions;
      this.setState({ positionWrapper: a.position && !!o });
    } }, { key: "toggle", value: function(i) {
      var o = this.state.status, a = o === ge.OPEN ? ge.CLOSING : ge.OPENING;
      D.undefined(i) || (a = i), this.setState({ status: a });
    } }, { key: "debug", get: function() {
      var i = this.props.debug;
      return i || !!global.ReactFloaterDebug;
    } }, { key: "event", get: function() {
      var i = this.props, o = i.disableHoverToClick, a = i.event;
      return a === "hover" && md() && !o ? "click" : a;
    } }, { key: "options", get: function() {
      var i = this.props.options;
      return Kn(kO, i || {});
    } }, { key: "styles", get: function() {
      var i = this, o = this.state, a = o.status, l = o.positionWrapper, s = o.statusWrapper, u = this.props.styles, c = Kn(NO(u), u);
      if (l) {
        var f;
        [ge.IDLE].indexOf(a) === -1 || [ge.IDLE].indexOf(s) === -1 ? f = c.wrapperPosition : f = this.wrapperPopper.styles, c.wrapper = Pe(Pe({}, c.wrapper), f);
      }
      if (this.target) {
        var d = window.getComputedStyle(this.target);
        this.wrapperStyles ? c.wrapper = Pe(Pe({}, c.wrapper), this.wrapperStyles) : ["relative", "static"].indexOf(d.position) === -1 && (this.wrapperStyles = {}, l || (RO.forEach(function(p) {
          i.wrapperStyles[p] = d[p];
        }), c.wrapper = Pe(Pe({}, c.wrapper), this.wrapperStyles), this.target.style.position = "relative", this.target.style.top = "auto", this.target.style.right = "auto", this.target.style.bottom = "auto", this.target.style.left = "auto"));
      }
      return c;
    } }, { key: "target", get: function() {
      if (!gr)
        return null;
      var i = this.props.target;
      return i ? D.domElement(i) ? i : document.querySelector(i) : this.childRef || this.wrapperRef;
    } }, { key: "render", value: function() {
      var i = this.state, o = i.currentPlacement, a = i.positionWrapper, l = i.status, s = this.props, u = s.children, c = s.component, f = s.content, d = s.disableAnimation, p = s.footer, h = s.hideArrow, m = s.id, S = s.open, g = s.showCloseButton, v = s.style, w = s.target, E = s.title, k = /* @__PURE__ */ _.createElement(AS, { handleClick: this.handleClick, handleMouseEnter: this.handleMouseEnter, handleMouseLeave: this.handleMouseLeave, setChildRef: this.setChildRef, setWrapperRef: this.setWrapperRef, style: v, styles: this.styles.wrapper }, u), b = {};
      return a ? b.wrapperInPortal = k : b.wrapperAsChildren = k, /* @__PURE__ */ _.createElement("span", null, /* @__PURE__ */ _.createElement(yS, { hasChildren: !!u, id: m, placement: o, setRef: this.setFloaterRef, target: w, zIndex: this.styles.options.zIndex }, /* @__PURE__ */ _.createElement(ES, { component: c, content: f, disableAnimation: d, footer: p, handleClick: this.handleClick, hideArrow: h || o === "center", open: S, placement: o, positionWrapper: a, setArrowRef: this.setArrowRef, setFloaterRef: this.setFloaterRef, showCloseButton: g, status: l, styles: this.styles, title: E }), b.wrapperInPortal), b.wrapperAsChildren);
    } }]), n;
  }(_.Component);
  wt(Wm, "propTypes", { autoOpen: N.bool, callback: N.func, children: N.node, component: oy(N.oneOfType([N.func, N.element]), function(e) {
    return !e.content;
  }), content: oy(N.node, function(e) {
    return !e.component;
  }), debug: N.bool, disableAnimation: N.bool, disableFlip: N.bool, disableHoverToClick: N.bool, event: N.oneOf(["hover", "click"]), eventDelay: N.number, footer: N.node, getPopper: N.func, hideArrow: N.bool, id: N.oneOfType([N.string, N.number]), offset: N.number, open: N.bool, options: N.object, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto", "center"]), showCloseButton: N.bool, style: N.object, styles: N.object, target: N.oneOfType([N.object, N.string]), title: N.node, wrapperOptions: N.shape({ offset: N.number, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto"]), position: N.bool }) });
  wt(Wm, "defaultProps", { autoOpen: !1, callback: hy, debug: !1, disableAnimation: !1, disableFlip: !1, disableHoverToClick: !1, event: "click", eventDelay: 0.4, getPopper: hy, hideArrow: !1, offset: 15, placement: "bottom", showCloseButton: !1, styles: {}, target: null, wrapperOptions: { position: !1 } });
  function my(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function $(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? my(Object(n), !0).forEach(function(r) {
        Z(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : my(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function Pr(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function gy(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function Nr(e, t, n) {
    return t && gy(e.prototype, t), n && gy(e, n), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function Z(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function Qt() {
    return Qt = Object.assign ? Object.assign.bind() : function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }, Qt.apply(this, arguments);
  }
  function eo(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(e, "prototype", {
      writable: !1
    }), t && Xp(e, t);
  }
  function Ku(e) {
    return Ku = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
      return n.__proto__ || Object.getPrototypeOf(n);
    }, Ku(e);
  }
  function Xp(e, t) {
    return Xp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
      return r.__proto__ = i, r;
    }, Xp(e, t);
  }
  function LO() {
    if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function")
      return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch (e) {
      return !1;
    }
  }
  function MO(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function qu(e, t) {
    if (e == null)
      return {};
    var n = MO(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function Ue(e) {
    if (e === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function FO(e, t) {
    if (t && (typeof t == "object" || typeof t == "function"))
      return t;
    if (t !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return Ue(e);
  }
  function to(e) {
    var t = LO();
    return function() {
      var r = Ku(e), i;
      if (t) {
        var o = Ku(this).constructor;
        i = Reflect.construct(r, arguments, o);
      } else
        i = r.apply(this, arguments);
      return FO(this, i);
    };
  }
  var ce = {
    INIT: "init",
    START: "start",
    STOP: "stop",
    RESET: "reset",
    PREV: "prev",
    NEXT: "next",
    GO: "go",
    CLOSE: "close",
    SKIP: "skip",
    UPDATE: "update"
  }, xt = {
    TOUR_START: "tour:start",
    STEP_BEFORE: "step:before",
    BEACON: "beacon",
    TOOLTIP: "tooltip",
    STEP_AFTER: "step:after",
    TOUR_END: "tour:end",
    TOUR_STATUS: "tour:status",
    TARGET_NOT_FOUND: "error:target_not_found",
    ERROR: "error"
  }, se = {
    INIT: "init",
    READY: "ready",
    BEACON: "beacon",
    TOOLTIP: "tooltip",
    COMPLETE: "complete",
    ERROR: "error"
  }, de = {
    IDLE: "idle",
    READY: "ready",
    WAITING: "waiting",
    RUNNING: "running",
    PAUSED: "paused",
    SKIPPED: "skipped",
    FINISHED: "finished",
    ERROR: "error"
  }, Vr = qb.canUseDOM, Pa = ui.createPortal !== void 0;
  function CS() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : navigator.userAgent, t = e;
    return typeof window == "undefined" ? t = "node" : document.documentMode ? t = "ie" : /Edge/.test(e) ? t = "edge" : Boolean(window.opera) || e.indexOf(" OPR/") >= 0 ? t = "opera" : typeof window.InstallTrigger != "undefined" ? t = "firefox" : window.chrome ? t = "chrome" : /(Version\/([0-9._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(e) && (t = "safari"), t;
  }
  function gd(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function Na(e) {
    var t = [], n = function r(i) {
      if (typeof i == "string" || typeof i == "number")
        t.push(i);
      else if (Array.isArray(i))
        i.forEach(function(a) {
          return r(a);
        });
      else if (i && i.props) {
        var o = i.props.children;
        Array.isArray(o) ? o.forEach(function(a) {
          return r(a);
        }) : r(o);
      }
    };
    return n(e), t.join(" ").trim();
  }
  function vy(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function BO(e, t) {
    return !He.plainObject(e) || !He.array(t) ? !1 : Object.keys(e).every(function(n) {
      return t.indexOf(n) !== -1;
    });
  }
  function UO(e) {
    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = e.replace(t, function(i, o, a, l) {
      return o + o + a + a + l + l;
    }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
    return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [];
  }
  function yy(e) {
    return e.disableBeacon || e.placement === "center";
  }
  function Zp(e, t) {
    var n, r = /* @__PURE__ */ K.isValidElement(e) || /* @__PURE__ */ K.isValidElement(t), i = He.undefined(e) || He.undefined(t);
    if (gd(e) !== gd(t) || r || i)
      return !1;
    if (He.domElement(e))
      return e.isSameNode(t);
    if (He.number(e))
      return e === t;
    if (He.function(e))
      return e.toString() === t.toString();
    for (var o in e)
      if (vy(e, o)) {
        if (typeof e[o] == "undefined" || typeof t[o] == "undefined")
          return !1;
        if (n = gd(e[o]), ["object", "array"].indexOf(n) !== -1 && Zp(e[o], t[o]) || n === "function" && Zp(e[o], t[o]))
          continue;
        if (e[o] !== t[o])
          return !1;
      }
    for (var a in t)
      if (vy(t, a) && typeof e[a] == "undefined")
        return !1;
    return !0;
  }
  function wy() {
    return ["chrome", "safari", "firefox", "opera"].indexOf(CS()) === -1;
  }
  function Ji(e) {
    var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
    a && (t && n ? (console.groupCollapsed("%creact-joyride: ".concat(t), "color: #ff0044; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
      He.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
    }) : l.apply(console, [n]), console.groupEnd()) : console.error("Missing title or data props"));
  }
  var zO = {
    action: "",
    controlled: !1,
    index: 0,
    lifecycle: se.INIT,
    size: 0,
    status: de.IDLE
  }, by = ["action", "index", "lifecycle", "status"];
  function jO(e) {
    var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ function() {
      function i() {
        var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = a.continuous, s = l === void 0 ? !1 : l, u = a.stepIndex, c = a.steps, f = c === void 0 ? [] : c;
        Pr(this, i), Z(this, "listener", void 0), Z(this, "setSteps", function(d) {
          var p = o.getState(), h = p.size, m = p.status, S = {
            size: d.length,
            status: m
          };
          n.set("steps", d), m === de.WAITING && !h && d.length && (S.status = de.RUNNING), o.setState(S);
        }), Z(this, "addListener", function(d) {
          o.listener = d;
        }), Z(this, "update", function(d) {
          if (!BO(d, by))
            throw new Error("State is not valid. Valid keys: ".concat(by.join(", ")));
          o.setState($({}, o.getNextState($($($({}, o.getState()), d), {}, {
            action: d.action || ce.UPDATE
          }), !0)));
        }), Z(this, "start", function(d) {
          var p = o.getState(), h = p.index, m = p.size;
          o.setState($($({}, o.getNextState({
            action: ce.START,
            index: He.number(d) ? d : h
          }, !0)), {}, {
            status: m ? de.RUNNING : de.WAITING
          }));
        }), Z(this, "stop", function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = o.getState(), h = p.index, m = p.status;
          [de.FINISHED, de.SKIPPED].indexOf(m) === -1 && o.setState($($({}, o.getNextState({
            action: ce.STOP,
            index: h + (d ? 1 : 0)
          })), {}, {
            status: de.PAUSED
          }));
        }), Z(this, "close", function() {
          var d = o.getState(), p = d.index, h = d.status;
          h === de.RUNNING && o.setState($({}, o.getNextState({
            action: ce.CLOSE,
            index: p + 1
          })));
        }), Z(this, "go", function(d) {
          var p = o.getState(), h = p.controlled, m = p.status;
          if (!(h || m !== de.RUNNING)) {
            var S = o.getSteps()[d];
            o.setState($($({}, o.getNextState({
              action: ce.GO,
              index: d
            })), {}, {
              status: S ? m : de.FINISHED
            }));
          }
        }), Z(this, "info", function() {
          return o.getState();
        }), Z(this, "next", function() {
          var d = o.getState(), p = d.index, h = d.status;
          h === de.RUNNING && o.setState(o.getNextState({
            action: ce.NEXT,
            index: p + 1
          }));
        }), Z(this, "open", function() {
          var d = o.getState(), p = d.status;
          p === de.RUNNING && o.setState($({}, o.getNextState({
            action: ce.UPDATE,
            lifecycle: se.TOOLTIP
          })));
        }), Z(this, "prev", function() {
          var d = o.getState(), p = d.index, h = d.status;
          h === de.RUNNING && o.setState($({}, o.getNextState({
            action: ce.PREV,
            index: p - 1
          })));
        }), Z(this, "reset", function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = o.getState(), h = p.controlled;
          h || o.setState($($({}, o.getNextState({
            action: ce.RESET,
            index: 0
          })), {}, {
            status: d ? de.RUNNING : de.READY
          }));
        }), Z(this, "skip", function() {
          var d = o.getState(), p = d.status;
          p === de.RUNNING && o.setState({
            action: ce.SKIP,
            lifecycle: se.INIT,
            status: de.SKIPPED
          });
        }), this.setState({
          action: ce.INIT,
          controlled: He.number(u),
          continuous: s,
          index: He.number(u) ? u : 0,
          lifecycle: se.INIT,
          status: f.length ? de.READY : de.IDLE
        }, !0), this.setSteps(f);
      }
      return Nr(i, [{
        key: "setState",
        value: function(a) {
          var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = $($({}, s), a), c = u.action, f = u.index, d = u.lifecycle, p = u.size, h = u.status;
          t.set("action", c), t.set("index", f), t.set("lifecycle", d), t.set("size", p), t.set("status", h), l && (t.set("controlled", a.controlled), t.set("continuous", a.continuous)), this.listener && this.hasUpdatedState(s) && this.listener(this.getState());
        }
      }, {
        key: "getState",
        value: function() {
          return t.size ? {
            action: t.get("action") || "",
            controlled: t.get("controlled") || !1,
            index: parseInt(t.get("index"), 10),
            lifecycle: t.get("lifecycle") || "",
            size: t.get("size") || 0,
            status: t.get("status") || ""
          } : $({}, zO);
        }
      }, {
        key: "getNextState",
        value: function(a) {
          var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = s.action, c = s.controlled, f = s.index, d = s.size, p = s.status, h = He.number(a.index) ? a.index : f, m = c && !l ? f : Math.min(Math.max(h, 0), d);
          return {
            action: a.action || u,
            controlled: c,
            index: m,
            lifecycle: a.lifecycle || se.INIT,
            size: a.size || d,
            status: m === d ? de.FINISHED : a.status || p
          };
        }
      }, {
        key: "hasUpdatedState",
        value: function(a) {
          var l = JSON.stringify(a), s = JSON.stringify(this.getState());
          return l !== s;
        }
      }, {
        key: "getSteps",
        value: function() {
          var a = n.get("steps");
          return Array.isArray(a) ? a : [];
        }
      }, {
        key: "getHelpers",
        value: function() {
          return {
            close: this.close,
            go: this.go,
            info: this.info,
            next: this.next,
            open: this.open,
            prev: this.prev,
            reset: this.reset,
            skip: this.skip
          };
        }
      }]), i;
    }();
    return new r(e);
  }
  function xS(e) {
    return e ? e.getBoundingClientRect() : {};
  }
  function WO() {
    var e = document, t = e.body, n = e.documentElement;
    return !t || !n ? 0 : Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight);
  }
  function oi(e) {
    return typeof e == "string" ? document.querySelector(e) : e;
  }
  function YO(e) {
    return !e || e.nodeType !== 1 ? {} : getComputedStyle(e);
  }
  function Jc(e, t, n) {
    var r = Xb(e);
    if (r.isSameNode(sl()))
      return n ? document : sl();
    var i = r.scrollHeight > r.offsetHeight;
    return !i && !t ? (r.style.overflow = "initial", sl()) : r;
  }
  function Qc(e, t) {
    if (!e)
      return !1;
    var n = Jc(e, t);
    return !n.isSameNode(sl());
  }
  function VO(e) {
    return e.offsetParent !== document.body;
  }
  function Ko(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "fixed";
    if (!e || !(e instanceof HTMLElement))
      return !1;
    var n = e.nodeName;
    return n === "BODY" || n === "HTML" ? !1 : YO(e).position === t ? !0 : Ko(e.parentNode, t);
  }
  function $O(e) {
    if (!e)
      return !1;
    for (var t = e; t && t !== document.body; ) {
      if (t instanceof HTMLElement) {
        var n = getComputedStyle(t), r = n.display, i = n.visibility;
        if (r === "none" || i === "hidden")
          return !1;
      }
      t = t.parentNode;
    }
    return !0;
  }
  function HO(e, t, n) {
    var r = xS(e), i = Jc(e, n), o = Qc(e, n), a = 0;
    i instanceof HTMLElement && (a = i.scrollTop);
    var l = r.top + (!o && !Ko(e) ? a : 0);
    return Math.floor(l - t);
  }
  function eh(e) {
    return e instanceof HTMLElement ? e.offsetParent instanceof HTMLElement ? eh(e.offsetParent) + e.offsetTop : e.offsetTop : 0;
  }
  function GO(e, t, n) {
    if (!e)
      return 0;
    var r = Xb(e), i = eh(e);
    return Qc(e, n) && !VO(e) && (i -= eh(r)), Math.floor(i - t);
  }
  function sl() {
    return document.scrollingElement || document.createElement("body");
  }
  function JO(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : sl(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300;
    return new Promise(function(r, i) {
      var o = t.scrollTop, a = e > o ? e - o : o - e;
      c_.top(t, e, {
        duration: a < 100 ? 50 : n
      }, function(l) {
        return l && l.message !== "Element already at target scroll position" ? i(l) : r();
      });
    });
  }
  function QO(e) {
    function t(r, i, o, a, l, s) {
      var u = a || "<<anonymous>>", c = s || o;
      if (i[o] == null)
        return r ? new Error("Required ".concat(l, " `").concat(c, "` was not specified in `").concat(u, "`.")) : null;
      for (var f = arguments.length, d = new Array(f > 6 ? f - 6 : 0), p = 6; p < f; p++)
        d[p - 6] = arguments[p];
      return e.apply(void 0, [i, o, u, l, c].concat(d));
    }
    var n = t.bind(null, !1);
    return n.isRequired = t.bind(null, !0), n;
  }
  QO(function(e, t, n, r, i) {
    var o = e[t], a = o;
    if (!/* @__PURE__ */ _.isValidElement(o) && Yr.isValidElementType(o)) {
      var l = {
        ref: function() {
        },
        step: {}
      };
      a = /* @__PURE__ */ _.createElement(a, l);
    }
    if (He.string(o) || He.number(o) || !Yr.isValidElementType(o) || [Yr.Element, Yr.ForwardRef].indexOf(Yr.typeOf(a)) === -1)
      return new Error("Invalid ".concat(r, " `").concat(i, "` supplied to `").concat(n, "`. Expected a React class or forwardRef."));
  });
  var KO = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#f04",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    zIndex: 100
  }, Da = {
    backgroundColor: "transparent",
    border: 0,
    borderRadius: 0,
    color: "#555",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    padding: 8,
    WebkitAppearance: "none"
  }, Sy = {
    borderRadius: 4,
    position: "absolute"
  };
  function qO() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = Kn(KO, e.options || {}), n = 290;
    window.innerWidth > 480 && (n = 380), t.width && (window.innerWidth < t.width ? n = window.innerWidth - 30 : n = t.width);
    var r = {
      bottom: 0,
      left: 0,
      overflow: "hidden",
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: t.zIndex
    }, i = {
      beacon: $($({}, Da), {}, {
        display: "inline-block",
        height: t.beaconSize,
        position: "relative",
        width: t.beaconSize,
        zIndex: t.zIndex
      }),
      beaconInner: {
        animation: "joyride-beacon-inner 1.2s infinite ease-in-out",
        backgroundColor: t.primaryColor,
        borderRadius: "50%",
        display: "block",
        height: "50%",
        left: "50%",
        opacity: 0.7,
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
      },
      beaconOuter: {
        animation: "joyride-beacon-outer 1.2s infinite ease-in-out",
        backgroundColor: "rgba(".concat(UO(t.primaryColor).join(","), ", 0.2)"),
        border: "2px solid ".concat(t.primaryColor),
        borderRadius: "50%",
        boxSizing: "border-box",
        display: "block",
        height: "100%",
        left: 0,
        opacity: 0.9,
        position: "absolute",
        top: 0,
        transformOrigin: "center",
        width: "100%"
      },
      tooltip: {
        backgroundColor: t.backgroundColor,
        borderRadius: 5,
        boxSizing: "border-box",
        color: t.textColor,
        fontSize: 16,
        maxWidth: "100%",
        padding: 15,
        position: "relative",
        width: n
      },
      tooltipContainer: {
        lineHeight: 1.4,
        textAlign: "center"
      },
      tooltipTitle: {
        fontSize: 18,
        margin: 0
      },
      tooltipContent: {
        padding: "20px 10px"
      },
      tooltipFooter: {
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 15
      },
      tooltipFooterSpacer: {
        flex: 1
      },
      buttonNext: $($({}, Da), {}, {
        backgroundColor: t.primaryColor,
        borderRadius: 4,
        color: "#fff"
      }),
      buttonBack: $($({}, Da), {}, {
        color: t.primaryColor,
        marginLeft: "auto",
        marginRight: 5
      }),
      buttonClose: $($({}, Da), {}, {
        color: t.textColor,
        height: 14,
        padding: 15,
        position: "absolute",
        right: 0,
        top: 0,
        width: 14
      }),
      buttonSkip: $($({}, Da), {}, {
        color: t.textColor,
        fontSize: 14
      }),
      overlay: $($({}, r), {}, {
        backgroundColor: t.overlayColor,
        mixBlendMode: "hard-light"
      }),
      overlayLegacy: $({}, r),
      overlayLegacyCenter: $($({}, r), {}, {
        backgroundColor: t.overlayColor
      }),
      spotlight: $($({}, Sy), {}, {
        backgroundColor: "gray"
      }),
      spotlightLegacy: $($({}, Sy), {}, {
        boxShadow: "0 0 0 9999px ".concat(t.overlayColor, ", ").concat(t.spotlightShadow)
      }),
      floaterStyles: {
        arrow: {
          color: t.arrowColor
        },
        options: {
          zIndex: t.zIndex + 100
        }
      },
      options: t
    };
    return Kn(i, e);
  }
  var vd = {
    floaterProps: {
      options: {
        preventOverflow: {
          boundariesElement: "scrollParent"
        }
      },
      wrapperOptions: {
        offset: -18,
        position: !0
      }
    },
    locale: {
      back: "Back",
      close: "Close",
      last: "Last",
      next: "Next",
      open: "Open the dialog",
      skip: "Skip"
    },
    step: {
      event: "click",
      placement: "bottom",
      offset: 10
    }
  };
  function XO(e) {
    var t = ["beaconComponent", "disableCloseOnEsc", "disableOverlay", "disableOverlayClose", "disableScrolling", "disableScrollParentFix", "floaterProps", "hideBackButton", "hideCloseButton", "locale", "showProgress", "showSkipButton", "spotlightClicks", "spotlightPadding", "styles", "tooltipComponent"];
    return Object.keys(e).filter(function(n) {
      return t.indexOf(n) !== -1;
    }).reduce(function(n, r) {
      return n[r] = e[r], n;
    }, {});
  }
  function Ra(e, t) {
    if (!e)
      return null;
    var n = Kn.all([XO(t), vd.step, e], {
      isMergeableObject: He.plainObject
    }), r = qO(Kn(t.styles || {}, e.styles || {})), i = Qc(oi(e.target), n.disableScrollParentFix), o = Kn.all([t.floaterProps || {}, vd.floaterProps, n.floaterProps || {}]);
    return o.offset = n.offset, o.styles = Kn(o.styles || {}, r.floaterStyles || {}), delete r.floaterStyles, o.offset += t.spotlightPadding || e.spotlightPadding || 0, e.placementBeacon && (o.wrapperOptions.placement = e.placementBeacon), i && (o.options.preventOverflow.boundariesElement = "window"), $($({}, n), {}, {
      locale: Kn.all([vd.locale, t.locale || {}, n.locale || {}]),
      floaterProps: o,
      styles: r
    });
  }
  function kS(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return He.plainObject(e) ? e.target ? !0 : (Ji({
      title: "validateStep",
      data: "target is missing from the step",
      warn: !0,
      debug: t
    }), !1) : (Ji({
      title: "validateStep",
      data: "step must be an object",
      warn: !0,
      debug: t
    }), !1);
  }
  function Ey(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return He.array(e) ? e.every(function(n) {
      return kS(n, t);
    }) : (Ji({
      title: "validateSteps",
      data: "steps must be an array",
      warn: !0,
      debug: t
    }), !1);
  }
  var ZO = /* @__PURE__ */ Nr(function e(t) {
    var n = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Pr(this, e), Z(this, "element", void 0), Z(this, "options", void 0), Z(this, "canBeTabbed", function(i) {
      var o = i.tabIndex;
      (o === null || o < 0) && (o = void 0);
      var a = isNaN(o);
      return !a && n.canHaveFocus(i);
    }), Z(this, "canHaveFocus", function(i) {
      var o = /input|select|textarea|button|object/, a = i.nodeName.toLowerCase(), l = o.test(a) && !i.getAttribute("disabled") || a === "a" && !!i.getAttribute("href");
      return l && n.isVisible(i);
    }), Z(this, "findValidTabElements", function() {
      return [].slice.call(n.element.querySelectorAll("*"), 0).filter(n.canBeTabbed);
    }), Z(this, "handleKeyDown", function(i) {
      var o = n.options.keyCode, a = o === void 0 ? 9 : o;
      i.keyCode === a && n.interceptTab(i);
    }), Z(this, "interceptTab", function(i) {
      var o = n.findValidTabElements();
      if (o.length) {
        i.preventDefault();
        var a = i.shiftKey, l = o.indexOf(document.activeElement);
        l === -1 || !a && l + 1 === o.length ? l = 0 : a && l === 0 ? l = o.length - 1 : l += a ? -1 : 1, o[l].focus();
      }
    }), Z(this, "isHidden", function(i) {
      var o = i.offsetWidth <= 0 && i.offsetHeight <= 0, a = window.getComputedStyle(i);
      return o && !i.innerHTML ? !0 : o && a.getPropertyValue("overflow") !== "visible" || a.getPropertyValue("display") === "none";
    }), Z(this, "isVisible", function(i) {
      for (var o = i; o; )
        if (o instanceof HTMLElement) {
          if (o === document.body)
            break;
          if (n.isHidden(o))
            return !1;
          o = o.parentNode;
        }
      return !0;
    }), Z(this, "removeScope", function() {
      window.removeEventListener("keydown", n.handleKeyDown);
    }), Z(this, "checkFocus", function(i) {
      document.activeElement !== i && (i.focus(), window.requestAnimationFrame(function() {
        return n.checkFocus(i);
      }));
    }), Z(this, "setFocus", function() {
      var i = n.options.selector;
      if (i) {
        var o = n.element.querySelector(i);
        o && window.requestAnimationFrame(function() {
          return n.checkFocus(o);
        });
      }
    }), !(t instanceof HTMLElement))
      throw new TypeError("Invalid parameter: element must be an HTMLElement");
    this.element = t, this.options = r, window.addEventListener("keydown", this.handleKeyDown, !1), this.setFocus();
  }), eI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n(r) {
      var i;
      if (Pr(this, n), i = t.call(this, r), Z(Ue(i), "setBeaconRef", function(s) {
        i.beacon = s;
      }), !r.beaconComponent) {
        var o = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style"), l = `
        @keyframes joyride-beacon-inner {
          20% {
            opacity: 0.9;
          }
        
          90% {
            opacity: 0.7;
          }
        }
        
        @keyframes joyride-beacon-outer {
          0% {
            transform: scale(1);
          }
        
          45% {
            opacity: 0.7;
            transform: scale(0.75);
          }
        
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }
      `;
        a.type = "text/css", a.id = "joyride-beacon-animation", r.nonce !== void 0 && a.setAttribute("nonce", r.nonce), a.appendChild(document.createTextNode(l)), o.appendChild(a);
      }
      return i;
    }
    return Nr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this, o = this.props.shouldFocus;
        setTimeout(function() {
          He.domElement(i.beacon) && o && i.beacon.focus();
        }, 0);
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        var i = document.getElementById("joyride-beacon-animation");
        i && i.parentNode.removeChild(i);
      }
    }, {
      key: "render",
      value: function() {
        var i = this.props, o = i.beaconComponent, a = i.locale, l = i.onClickOrHover, s = i.styles, u = {
          "aria-label": a.open,
          onClick: l,
          onMouseEnter: l,
          ref: this.setBeaconRef,
          title: a.open
        }, c;
        if (o) {
          var f = o;
          c = /* @__PURE__ */ _.createElement(f, u);
        } else
          c = /* @__PURE__ */ _.createElement("button", Qt({
            key: "JoyrideBeacon",
            className: "react-joyride__beacon",
            style: s.beacon,
            type: "button"
          }, u), /* @__PURE__ */ _.createElement("span", {
            style: s.beaconInner
          }), /* @__PURE__ */ _.createElement("span", {
            style: s.beaconOuter
          }));
        return c;
      }
    }]), n;
  }(_.Component);
  function tI(e) {
    var t = e.styles;
    return /* @__PURE__ */ _.createElement("div", {
      key: "JoyrideSpotlight",
      className: "react-joyride__spotlight",
      style: t
    });
  }
  var nI = ["mixBlendMode", "zIndex"], rI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n() {
      var r;
      Pr(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Ue(r), "_isMounted", !1), Z(Ue(r), "state", {
        mouseOverSpotlight: !1,
        isScrolling: !1,
        showSpotlight: !0
      }), Z(Ue(r), "handleMouseMove", function(l) {
        var s = r.state.mouseOverSpotlight, u = r.spotlightStyles, c = u.height, f = u.left, d = u.position, p = u.top, h = u.width, m = d === "fixed" ? l.clientY : l.pageY, S = d === "fixed" ? l.clientX : l.pageX, g = m >= p && m <= p + c, v = S >= f && S <= f + h, w = v && g;
        w !== s && r.updateState({
          mouseOverSpotlight: w
        });
      }), Z(Ue(r), "handleScroll", function() {
        var l = r.props.target, s = oi(l);
        if (r.scrollParent !== document) {
          var u = r.state.isScrolling;
          u || r.updateState({
            isScrolling: !0,
            showSpotlight: !1
          }), clearTimeout(r.scrollTimeout), r.scrollTimeout = setTimeout(function() {
            r.updateState({
              isScrolling: !1,
              showSpotlight: !0
            });
          }, 50);
        } else
          Ko(s, "sticky") && r.updateState({});
      }), Z(Ue(r), "handleResize", function() {
        clearTimeout(r.resizeTimeout), r.resizeTimeout = setTimeout(function() {
          r._isMounted && r.forceUpdate();
        }, 100);
      }), r;
    }
    return Nr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this.props;
        i.debug, i.disableScrolling;
        var o = i.disableScrollParentFix, a = i.target, l = oi(a);
        this.scrollParent = Jc(l, o, !0), this._isMounted = !0, window.addEventListener("resize", this.handleResize);
      }
    }, {
      key: "componentDidUpdate",
      value: function(i) {
        var o = this, a = this.props, l = a.lifecycle, s = a.spotlightClicks, u = Fl(i, this.props), c = u.changed;
        c("lifecycle", se.TOOLTIP) && (this.scrollParent.addEventListener("scroll", this.handleScroll, {
          passive: !0
        }), setTimeout(function() {
          var f = o.state.isScrolling;
          f || o.updateState({
            showSpotlight: !0
          });
        }, 100)), (c("spotlightClicks") || c("disableOverlay") || c("lifecycle")) && (s && l === se.TOOLTIP ? window.addEventListener("mousemove", this.handleMouseMove, !1) : l !== se.TOOLTIP && window.removeEventListener("mousemove", this.handleMouseMove));
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this._isMounted = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("resize", this.handleResize), clearTimeout(this.resizeTimeout), clearTimeout(this.scrollTimeout), this.scrollParent.removeEventListener("scroll", this.handleScroll);
      }
    }, {
      key: "spotlightStyles",
      get: function() {
        var i = this.state.showSpotlight, o = this.props, a = o.disableScrollParentFix, l = o.spotlightClicks, s = o.spotlightPadding, u = o.styles, c = o.target, f = oi(c), d = xS(f), p = Ko(f), h = HO(f, s, a);
        return $($({}, wy() ? u.spotlightLegacy : u.spotlight), {}, {
          height: Math.round(d.height + s * 2),
          left: Math.round(d.left - s),
          opacity: i ? 1 : 0,
          pointerEvents: l ? "none" : "auto",
          position: p ? "fixed" : "absolute",
          top: h,
          transition: "opacity 0.2s",
          width: Math.round(d.width + s * 2)
        });
      }
    }, {
      key: "updateState",
      value: function(i) {
        this._isMounted && this.setState(i);
      }
    }, {
      key: "render",
      value: function() {
        var i = this.state, o = i.mouseOverSpotlight, a = i.showSpotlight, l = this.props, s = l.disableOverlay, u = l.disableOverlayClose, c = l.lifecycle, f = l.onClickOverlay, d = l.placement, p = l.styles;
        if (s || c !== se.TOOLTIP)
          return null;
        var h = p.overlay;
        wy() && (h = d === "center" ? p.overlayLegacyCenter : p.overlayLegacy);
        var m = $({
          cursor: u ? "default" : "pointer",
          height: WO(),
          pointerEvents: o ? "none" : "auto"
        }, h), S = d !== "center" && a && /* @__PURE__ */ _.createElement(tI, {
          styles: this.spotlightStyles
        });
        if (CS() === "safari") {
          m.mixBlendMode, m.zIndex;
          var g = qu(m, nI);
          S = /* @__PURE__ */ _.createElement("div", {
            style: $({}, g)
          }, S), delete m.backgroundColor;
        }
        return /* @__PURE__ */ _.createElement("div", {
          className: "react-joyride__overlay",
          style: m,
          onClick: f
        }, S);
      }
    }]), n;
  }(_.Component), iI = ["styles"], oI = ["color", "height", "width"];
  function aI(e) {
    var t = e.styles, n = qu(e, iI), r = t.color, i = t.height, o = t.width, a = qu(t, oI);
    return /* @__PURE__ */ _.createElement("button", Qt({
      style: a,
      type: "button"
    }, n), /* @__PURE__ */ _.createElement("svg", {
      width: typeof o == "number" ? "".concat(o, "px") : o,
      height: typeof i == "number" ? "".concat(i, "px") : i,
      viewBox: "0 0 18 18",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid"
    }, /* @__PURE__ */ _.createElement("g", null, /* @__PURE__ */ _.createElement("path", {
      d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
      fill: r
    }))));
  }
  var lI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n() {
      return Pr(this, n), t.apply(this, arguments);
    }
    return Nr(n, [{
      key: "render",
      value: function() {
        var i = this.props, o = i.backProps, a = i.closeProps, l = i.continuous, s = i.index, u = i.isLastStep, c = i.primaryProps, f = i.size, d = i.skipProps, p = i.step, h = i.tooltipProps, m = p.content, S = p.hideBackButton, g = p.hideCloseButton, v = p.hideFooter, w = p.showProgress, E = p.showSkipButton, k = p.title, b = p.styles, A = p.locale, O = A.back, T = A.close, P = A.last, I = A.next, F = A.skip, U = {
          primary: T
        };
        return l && (U.primary = u ? P : I, w && (U.primary = /* @__PURE__ */ _.createElement("span", null, U.primary, " (", s + 1, "/", f, ")"))), E && !u && (U.skip = /* @__PURE__ */ _.createElement("button", Qt({
          style: b.buttonSkip,
          type: "button",
          "aria-live": "off"
        }, d), F)), !S && s > 0 && (U.back = /* @__PURE__ */ _.createElement("button", Qt({
          style: b.buttonBack,
          type: "button"
        }, o), O)), U.close = !g && /* @__PURE__ */ _.createElement(aI, Qt({
          styles: b.buttonClose
        }, a)), /* @__PURE__ */ _.createElement("div", Qt({
          key: "JoyrideTooltip",
          className: "react-joyride__tooltip",
          style: b.tooltip
        }, h), /* @__PURE__ */ _.createElement("div", {
          style: b.tooltipContainer
        }, k && /* @__PURE__ */ _.createElement("h4", {
          style: b.tooltipTitle,
          "aria-label": k
        }, k), /* @__PURE__ */ _.createElement("div", {
          style: b.tooltipContent
        }, m)), !v && /* @__PURE__ */ _.createElement("div", {
          style: b.tooltipFooter
        }, /* @__PURE__ */ _.createElement("div", {
          style: b.tooltipFooterSpacer
        }, U.skip), U.back, /* @__PURE__ */ _.createElement("button", Qt({
          style: b.buttonNext,
          type: "button"
        }, c), U.primary)), U.close);
      }
    }]), n;
  }(_.Component), sI = ["beaconComponent", "tooltipComponent"], uI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n() {
      var r;
      Pr(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Ue(r), "handleClickBack", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.prev();
      }), Z(Ue(r), "handleClickClose", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.close();
      }), Z(Ue(r), "handleClickPrimary", function(l) {
        l.preventDefault();
        var s = r.props, u = s.continuous, c = s.helpers;
        if (!u) {
          c.close();
          return;
        }
        c.next();
      }), Z(Ue(r), "handleClickSkip", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.skip();
      }), Z(Ue(r), "getElementsProps", function() {
        var l = r.props, s = l.continuous, u = l.isLastStep, c = l.setTooltipRef, f = l.step, d = Na(f.locale.back), p = Na(f.locale.close), h = Na(f.locale.last), m = Na(f.locale.next), S = Na(f.locale.skip), g = s ? m : p;
        return u && (g = h), {
          backProps: {
            "aria-label": d,
            "data-action": "back",
            onClick: r.handleClickBack,
            role: "button",
            title: d
          },
          closeProps: {
            "aria-label": p,
            "data-action": "close",
            onClick: r.handleClickClose,
            role: "button",
            title: p
          },
          primaryProps: {
            "aria-label": g,
            "data-action": "primary",
            onClick: r.handleClickPrimary,
            role: "button",
            title: g
          },
          skipProps: {
            "aria-label": S,
            "data-action": "skip",
            onClick: r.handleClickSkip,
            role: "button",
            title: S
          },
          tooltipProps: {
            "aria-modal": !0,
            ref: c,
            role: "alertdialog"
          }
        };
      }), r;
    }
    return Nr(n, [{
      key: "render",
      value: function() {
        var i = this.props, o = i.continuous, a = i.index, l = i.isLastStep, s = i.size, u = i.step;
        u.beaconComponent;
        var c = u.tooltipComponent, f = qu(u, sI), d;
        if (c) {
          var p = $($({}, this.getElementsProps()), {}, {
            continuous: o,
            index: a,
            isLastStep: l,
            size: s,
            step: f
          }), h = c;
          d = /* @__PURE__ */ _.createElement(h, p);
        } else
          d = /* @__PURE__ */ _.createElement(lI, Qt({}, this.getElementsProps(), {
            continuous: o,
            index: a,
            isLastStep: l,
            size: s,
            step: u
          }));
        return d;
      }
    }]), n;
  }(_.Component), cI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n() {
      return Pr(this, n), t.apply(this, arguments);
    }
    return Nr(n, [{
      key: "componentDidMount",
      value: function() {
        Vr && (Pa || this.renderReact15());
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        Vr && (Pa || this.renderReact15());
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        !Vr || !this.node || (Pa || Ui.unmountComponentAtNode(this.node), this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
      }
    }, {
      key: "appendNode",
      value: function() {
        var i = this.props.id;
        this.node || (this.node = document.createElement("div"), i && (this.node.id = i), document.body.appendChild(this.node));
      }
    }, {
      key: "renderReact15",
      value: function() {
        if (!Vr)
          return null;
        var i = this.props.children;
        return this.node || this.appendNode(), Ui.unstable_renderSubtreeIntoContainer(this, i, this.node), null;
      }
    }, {
      key: "renderReact16",
      value: function() {
        if (!Vr || !Pa)
          return null;
        var i = this.props.children;
        return this.node || this.appendNode(), /* @__PURE__ */ Ui.createPortal(i, this.node);
      }
    }, {
      key: "render",
      value: function() {
        return Pa ? this.renderReact16() : null;
      }
    }]), n;
  }(_.Component), fI = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n() {
      var r;
      Pr(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Ue(r), "scope", {
        removeScope: function() {
        }
      }), Z(Ue(r), "handleClickHoverBeacon", function(l) {
        var s = r.props, u = s.step, c = s.update;
        l.type === "mouseenter" && u.event !== "hover" || c({
          lifecycle: se.TOOLTIP
        });
      }), Z(Ue(r), "handleClickOverlay", function() {
        var l = r.props, s = l.helpers, u = l.step;
        u.disableOverlayClose || s.close();
      }), Z(Ue(r), "setTooltipRef", function(l) {
        r.tooltip = l;
      }), Z(Ue(r), "setPopper", function(l, s) {
        var u = r.props, c = u.action, f = u.setPopper, d = u.update;
        s === "wrapper" ? r.beaconPopper = l : r.tooltipPopper = l, f(l, s), r.beaconPopper && r.tooltipPopper && d({
          action: c === ce.CLOSE ? ce.CLOSE : c,
          lifecycle: se.READY
        });
      }), r;
    }
    return Nr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this.props, o = i.debug, a = i.index;
        Ji({
          title: "step:".concat(a),
          data: [{
            key: "props",
            value: this.props
          }],
          debug: o
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function(i) {
        var o = this.props, a = o.action, l = o.callback, s = o.continuous, u = o.controlled, c = o.debug, f = o.index, d = o.lifecycle, p = o.size, h = o.status, m = o.step, S = o.update, g = Fl(i, this.props), v = g.changed, w = g.changedFrom, E = {
          action: a,
          controlled: u,
          index: f,
          lifecycle: d,
          size: p,
          status: h
        }, k = s && a !== ce.CLOSE && (f > 0 || a === ce.PREV), b = v("action") || v("index") || v("lifecycle") || v("status"), A = w("lifecycle", [se.TOOLTIP, se.INIT], se.INIT), O = v("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
        if (O && (A || u) && l($($({}, E), {}, {
          index: i.index,
          lifecycle: se.COMPLETE,
          step: i.step,
          type: xt.STEP_AFTER
        })), m.placement === "center" && h === de.RUNNING && v("index") && a !== ce.START && d === se.INIT && S({
          lifecycle: se.READY
        }), b) {
          var T = oi(m.target), P = !!T, I = P && $O(T);
          I ? (w("status", de.READY, de.RUNNING) || w("lifecycle", se.INIT, se.READY)) && l($($({}, E), {}, {
            step: m,
            type: xt.STEP_BEFORE
          })) : (console.warn(P ? "Target not visible" : "Target not mounted", m), l($($({}, E), {}, {
            type: xt.TARGET_NOT_FOUND,
            step: m
          })), u || S({
            index: f + ([ce.PREV].indexOf(a) !== -1 ? -1 : 1)
          }));
        }
        w("lifecycle", se.INIT, se.READY) && S({
          lifecycle: yy(m) || k ? se.TOOLTIP : se.BEACON
        }), v("index") && Ji({
          title: "step:".concat(d),
          data: [{
            key: "props",
            value: this.props
          }],
          debug: c
        }), v("lifecycle", se.BEACON) && l($($({}, E), {}, {
          step: m,
          type: xt.BEACON
        })), v("lifecycle", se.TOOLTIP) && (l($($({}, E), {}, {
          step: m,
          type: xt.TOOLTIP
        })), this.scope = new ZO(this.tooltip, {
          selector: "[data-action=primary]"
        }), this.scope.setFocus()), w("lifecycle", [se.TOOLTIP, se.INIT], se.INIT) && (this.scope.removeScope(), delete this.beaconPopper, delete this.tooltipPopper);
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.scope.removeScope();
      }
      /**
       * Beacon click/hover event listener
       *
       * @param {Event} e
       */
    }, {
      key: "open",
      get: function() {
        var i = this.props, o = i.step, a = i.lifecycle;
        return !!(yy(o) || a === se.TOOLTIP);
      }
    }, {
      key: "render",
      value: function() {
        var i = this.props, o = i.continuous, a = i.debug, l = i.helpers, s = i.index, u = i.lifecycle, c = i.nonce, f = i.shouldScroll, d = i.size, p = i.step, h = oi(p.target);
        return !kS(p) || !He.domElement(h) ? null : /* @__PURE__ */ _.createElement("div", {
          key: "JoyrideStep-".concat(s),
          className: "react-joyride__step"
        }, /* @__PURE__ */ _.createElement(cI, {
          id: "react-joyride-portal"
        }, /* @__PURE__ */ _.createElement(rI, Qt({}, p, {
          debug: a,
          lifecycle: u,
          onClickOverlay: this.handleClickOverlay
        }))), /* @__PURE__ */ _.createElement(Wm, Qt({
          component: /* @__PURE__ */ _.createElement(uI, {
            continuous: o,
            helpers: l,
            index: s,
            isLastStep: s + 1 === d,
            setTooltipRef: this.setTooltipRef,
            size: d,
            step: p
          }),
          debug: a,
          getPopper: this.setPopper,
          id: "react-joyride-step-".concat(s),
          isPositioned: p.isFixed || Ko(h),
          open: this.open,
          placement: p.placement,
          target: p.target
        }, p.floaterProps), /* @__PURE__ */ _.createElement(eI, {
          beaconComponent: p.beaconComponent,
          locale: p.locale,
          nonce: c,
          onClickOrHover: this.handleClickHoverBeacon,
          shouldFocus: f,
          styles: p.styles
        })));
      }
    }]), n;
  }(_.Component), _S = /* @__PURE__ */ function(e) {
    eo(n, e);
    var t = to(n);
    function n(r) {
      var i;
      return Pr(this, n), i = t.call(this, r), Z(Ue(i), "initStore", function() {
        var o = i.props, a = o.debug, l = o.getHelpers, s = o.run, u = o.stepIndex;
        i.store = new jO($($({}, i.props), {}, {
          controlled: s && He.number(u)
        })), i.helpers = i.store.getHelpers();
        var c = i.store.addListener;
        return Ji({
          title: "init",
          data: [{
            key: "props",
            value: i.props
          }, {
            key: "state",
            value: i.state
          }],
          debug: a
        }), c(i.syncState), l(i.helpers), i.store.getState();
      }), Z(Ue(i), "callback", function(o) {
        var a = i.props.callback;
        He.function(a) && a(o);
      }), Z(Ue(i), "handleKeyboard", function(o) {
        var a = i.state, l = a.index, s = a.lifecycle, u = i.props.steps, c = u[l], f = window.Event ? o.which : o.keyCode;
        s === se.TOOLTIP && f === 27 && c && !c.disableCloseOnEsc && i.store.close();
      }), Z(Ue(i), "syncState", function(o) {
        i.setState(o);
      }), Z(Ue(i), "setPopper", function(o, a) {
        a === "wrapper" ? i.beaconPopper = o : i.tooltipPopper = o;
      }), Z(Ue(i), "shouldScroll", function(o, a, l, s, u, c, f) {
        return !o && (a !== 0 || l || s === se.TOOLTIP) && u.placement !== "center" && (!u.isFixed || !Ko(c)) && // fixed steps don't need to scroll
        f.lifecycle !== s && [se.BEACON, se.TOOLTIP].indexOf(s) !== -1;
      }), i.state = i.initStore(), i;
    }
    return Nr(n, [{
      key: "componentDidMount",
      value: function() {
        if (Vr) {
          var i = this.props, o = i.disableCloseOnEsc, a = i.debug, l = i.run, s = i.steps, u = this.store.start;
          Ey(s, a) && l && u(), o || document.body.addEventListener("keydown", this.handleKeyboard, {
            passive: !0
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function(i, o) {
        if (Vr) {
          var a = this.state, l = a.action, s = a.controlled, u = a.index, c = a.lifecycle, f = a.status, d = this.props, p = d.debug, h = d.run, m = d.stepIndex, S = d.steps, g = i.steps, v = i.stepIndex, w = this.store, E = w.reset, k = w.setSteps, b = w.start, A = w.stop, O = w.update, T = Fl(i, this.props), P = T.changed, I = Fl(o, this.state), F = I.changed, U = I.changedFrom, X = Ra(S[u], this.props), oe = !Zp(g, S), ne = He.number(m) && P("stepIndex"), fe = oi(X == null ? void 0 : X.target);
          if (oe && (Ey(S, p) ? k(S) : console.warn("Steps are not valid", S)), P("run") && (h ? b(m) : A()), ne) {
            var B = v < m ? ce.NEXT : ce.PREV;
            l === ce.STOP && (B = ce.START), [de.FINISHED, de.SKIPPED].indexOf(f) === -1 && O({
              action: l === ce.CLOSE ? ce.CLOSE : B,
              index: m,
              lifecycle: se.INIT
            });
          }
          !s && f === de.RUNNING && u === 0 && !fe && (O({
            index: u + 1
          }), this.callback($($({}, this.state), {}, {
            type: xt.TARGET_NOT_FOUND,
            step: X
          })));
          var V = $($({}, this.state), {}, {
            index: u,
            step: X
          }), G = F("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
          if (G && F("status", de.PAUSED)) {
            var x = Ra(S[o.index], this.props);
            this.callback($($({}, V), {}, {
              index: o.index,
              lifecycle: se.COMPLETE,
              step: x,
              type: xt.STEP_AFTER
            }));
          }
          if (F("status", [de.FINISHED, de.SKIPPED])) {
            var C = Ra(S[o.index], this.props);
            s || this.callback($($({}, V), {}, {
              index: o.index,
              lifecycle: se.COMPLETE,
              step: C,
              type: xt.STEP_AFTER
            })), this.callback($($({}, V), {}, {
              index: o.index,
              // Return the last step when the tour is finished
              step: C,
              type: xt.TOUR_END
            })), E();
          } else
            U("status", [de.IDLE, de.READY], de.RUNNING) ? this.callback($($({}, V), {}, {
              type: xt.TOUR_START
            })) : F("status") ? this.callback($($({}, V), {}, {
              type: xt.TOUR_STATUS
            })) : F("action", ce.RESET) && this.callback($($({}, V), {}, {
              type: xt.TOUR_STATUS
            }));
          X && (this.scrollToStep(o), X.placement === "center" && f === de.RUNNING && l === ce.START && c === se.INIT && O({
            lifecycle: se.READY
          }));
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        var i = this.props.disableCloseOnEsc;
        i || document.body.removeEventListener("keydown", this.handleKeyboard);
      }
    }, {
      key: "scrollToStep",
      value: function(i) {
        var o = this.state, a = o.index, l = o.lifecycle, s = o.status, u = this.props, c = u.debug, f = u.disableScrolling, d = u.disableScrollParentFix, p = u.scrollToFirstStep, h = u.scrollOffset, m = u.scrollDuration, S = u.steps, g = Ra(S[a], this.props);
        if (g) {
          var v = oi(g.target), w = this.shouldScroll(f, a, p, l, g, v, i);
          if (s === de.RUNNING && w) {
            var E = Qc(v, d), k = Jc(v, d), b = Math.floor(GO(v, h, d)) || 0;
            if (Ji({
              title: "scrollToStep",
              data: [{
                key: "index",
                value: a
              }, {
                key: "lifecycle",
                value: l
              }, {
                key: "status",
                value: s
              }],
              debug: c
            }), l === se.BEACON && this.beaconPopper) {
              var A = this.beaconPopper, O = A.placement, T = A.popper;
              ["bottom"].indexOf(O) === -1 && !E && (b = Math.floor(T.top - h));
            } else if (l === se.TOOLTIP && this.tooltipPopper) {
              var P = this.tooltipPopper, I = P.flipped, F = P.placement, U = P.popper;
              ["top", "right", "left"].indexOf(F) !== -1 && !I && !E ? b = Math.floor(U.top - h) : b -= g.spotlightPadding;
            }
            b = b >= 0 ? b : 0, s === de.RUNNING && JO(b, k, m);
          }
        }
      }
      /**
       * Trigger the callback.
       *
       * @private
       * @param {Object} data
       */
    }, {
      key: "render",
      value: function() {
        if (!Vr)
          return null;
        var i = this.state, o = i.index, a = i.status, l = this.props, s = l.continuous, u = l.debug, c = l.nonce, f = l.scrollToFirstStep, d = l.steps, p = Ra(d[o], this.props), h;
        return a === de.RUNNING && p && (h = /* @__PURE__ */ _.createElement(fI, Qt({}, this.state, {
          callback: this.callback,
          continuous: s,
          debug: u,
          setPopper: this.setPopper,
          helpers: this.helpers,
          nonce: c,
          shouldScroll: !p.disableScrolling && (o !== 0 || f),
          step: p,
          update: this.store.update
        }))), /* @__PURE__ */ _.createElement("div", {
          className: "react-joyride"
        }, h);
      }
    }]), n;
  }(_.Component);
  Z(_S, "defaultProps", {
    continuous: !1,
    debug: !1,
    disableCloseOnEsc: !1,
    disableOverlay: !1,
    disableOverlayClose: !1,
    disableScrolling: !1,
    disableScrollParentFix: !1,
    getHelpers: function() {
    },
    hideBackButton: !1,
    run: !0,
    scrollOffset: 20,
    scrollDuration: 300,
    scrollToFirstStep: !1,
    showSkipButton: !1,
    showProgress: !1,
    spotlightClicks: !1,
    spotlightPadding: 10,
    steps: []
  });
  const dI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAABq0lEQVRYhe2YsU7DMBCGvyDUDToxsuUREN27gUACBpZuvAMFXgBBH4KtCwMggWDrDuIRujIxAVuXMMRIbuU09vlKiMgnRYniO/uv4zv7mmRZRh1YDjHuX4+Lmsp+beJ6OThMvcde8rasmEaoNo1QbSRCL8mj3L7KmLUfhA4qEXoKDAV+PwyBk1AnidAMOAJGAt+R8Q3eZaRrdAIcAC8BPq/GZyIZMCaYPoAdoHC7shgD28ZHRGzUvwNb5h5jU4pGehoDu8Cno+3LtPnM+ly08ugzsM/0+psAe6YtGs2Eb0d0TGZwEnTM82AIrFvPamgLBbhYQJ/12esTVyky5yT/a8ye/os+/V8opKbKl9p8+qIZdRZjVeJco0Vor92mCvXkGOhrd6qd8HvkpQrAG4q7k+aMdoEr8kBMzHNXq3MtoRvADdCy3rXMu02NATSEpsAj0Ha0tYEHYxNFrNA14MncY2xKiRG6AtzjN1upsV2VDiYV2gLugE6ATwe4ZXodeyMRGhPRdmYIQiL0nDxfSumZPoKQJPwzc9mI/nEO4V/v9QuhEapNbYQGnfCr5BtYaFWUrHRSSwAAAABJRU5ErkJggg==", pI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAiElEQVRYhe3YwQmAIBhA4YxGaaZGaYhGaaZ2sauCB8MX9cP7bnaIxx9imHLOUwTz1wG9DKWFCV1aD/fzKpdPdlsaqikc21qtw0zUUJqhNENphtLChDaP0BcMH8NhJmoozVCaoTRDaYbSDKUZSuv5HyWuaYbfEX6if7iGrr5CmIkm7/BhhtIMpd2GuAxXhhY/aAAAAABJRU5ErkJggg==", hI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAhUlEQVRYhe3ZwQmAMBAAwZxYijVZikVYijXZS/zmoRDJQjjY+ZlHWE6RiFFrLRksswN6GUozlLa+LR7XPf1VcO5btNe5J1pKiY/1adJPtPXnef26E8N7pJmooTRDaYbSDKUZSjOUZiit5zxKGP5iSDNRQ2mG0gylGUpLExr+bIAZSksT+gD98QxXbjF/TQAAAABJRU5ErkJggg==", th = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAgklEQVRYhe3Y0QmAIBRA0Wc0SjM1SkM0SjO1i00gGl2MB/f+2sfhQSqWWmtkaPkbMJpQOqF0aaBr74PjuqftX+e+ldZamokKpRNKJ5ROKF0aaPcIjYjmsTazNBMVSieUbuSvb/XlQv16J0kzUaF0QumE0gmlSwMtPo3DCaUTSpcG+gDcmgtUpwOm6gAAAABJRU5ErkJggg==", OS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAjElEQVRYhe3ZwQmAMBBEUVcsxZosxSIsxZrsJZ4UIQYUh5WB/456+awhCRillM5B/3fAU4SqDa0X87odizeSWk7LNFbPbCZqE9r89Dcy97FqudlMlFA1QtUIVSNUzSb0zRGafou6spkooWqEqmVenD/tGjYTJVSNUDVC1QhVswnl4qwW/GwQI1TNJnQHKA8MWeSBgoAAAAAASUVORK5CYII=", IS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAkklEQVRYhe3ZwQmAMAyF4UQcxZkcxSEcxZncJV70UmlVfEYevO/ay0+KNKBHhDHo/g64S6Fofe1gWtbMjkOYmc3j4OUBzURpQqtXb/s1JDlddYlmogpFUyiaQtEUikYT2npCL5+1TDQTVSiaQtFaX/0Tb5dsLc7pFIqmUDSFoikUDfWEfr5k00zU9bMBTKFoNKEbp/QMWe71dFoAAAAASUVORK5CYII=", mI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVRYhe2ZwQ6CMBBEH8Yv9uDNsMabB38ZLxBRkdDtxlmSzqUktDAvs2yb0A3DwJ51UBuoVQNQqwGotXuAY8nk8+3hfc+8Vxtw3brwfjmt3lckYEAf9TBVCRlBEP8G6HiVjxEAoSqhMAhlCYVAFHUh3rtJrWwc+9n15u40Sb0PGJVJlCYwqXOuW5KNoysJdQKTDGcSWQDACZEJABwQ2QDgG2JVGQGgoF1nBCjqRtkAPs3bz5mjMgEUm4c8AC7z4N+JvWeipR3cbR70CVSZh/IEvGegpcSqzYMugRDzoAEIMw/+j9ireSlVmwddCYWYBw1AmHmArv3gEKsBqNUA1No9wBNu3jnWLc/KGQAAAABJRU5ErkJggg==", gI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAADT0lEQVRYhe2ZP2gUURDGf1ELSy/YpUrELt1BLHIpxAtCOO0SBP80woWAiGyxuWZB2eayxYIiSAJpTBPuQARtJNedacTrgk3IWYlWuVR2EouZl907Lwnue8cRyMDj7e3OMvO9mTfzvb2Rw8NDzrJcGLYDtnIOYNhy5gFcyvqiH8anqZSAMjADdIAmUAF+HvdCFHj/7UdmAKdICfiQ+n0FGAfmgJvAjitDg0ihaRLnK8AocA2oA1eBdZfGBhGBeZ1XosBb0esOsOCH8VdgConQRxfGBhGBgs71Ps/MvRlXxgYB4EDnXJ9nEzrvuTI2CABNnat+GB+B8MM4j1SlP8BnV8Zc74ExIK/XeWDPD+M6Eg2zN14D31wZdAlgDHiHbNIOsAK0kbSpqs5L4JlDm84ATCLlcQpoAbNR4HXMQz+M20ANiYqzCgRu9kB65f9xHiAKvDoSlQLSI0oO7AJuIrAOXAcaUeDNnqDXRspoFQHxXe83gQawkcW4bQSmgdvq3AKAH8a5dPVJizY209zGdTwC3gIPszhgC8A0pHoUeB11fIuk3gPgh/EEkkJEgVdBqIUZi6pWzOKALQCz0ibn8zo6fXSLfhgXAaLAa5uBpA9k7M62e8CsdFvnvqmTur/lh3GDboBm5ZtkEFsAvRHo/W3ENLdd+qfKJrCUxQFbAE3gFpIeLZJuW6SbzBmnQ+AX3ZFqcsIh5zSx3QMmf5eBfRJHq8dUojlkk9dSI7PzYA9gm6Q5HZCQtBawmtKrIGl1D3hqabNLXHTibeAuUhILQCcKPNMTlkGqDkm5fAJcdmAXcEunH+jc0nkRKKdKZx1JuetIyjkRVwBKCNMEWANQPpSjO5VMF76Poyi4ADAJvNfriq40fhiXEQATek0UeA0cR8EWgGGiF4E1c4jXtEmvfNpZp1GwBfCGhIkuwhHvqenz50hlOi4KZUv7VgBGgTvoJxMQJorU+RzSXV+ge4LuKJh71l8nbAAc0YbUAaaG8KNPwGO9t0FPFFyKDZXYQxwr6AcrEM6zizj/O6W7hvSIVT+M50m4USYClxZbLrREchYG+II4/6NHz5y2AhK6sQm8srRvDWAHuEGyoq0TdDcQgjejevuWtgEYOf+PbMhyDmDY8hfkuOfRCqd6WwAAAABJRU5ErkJggg==", vI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVRYhe2ZsQ7CMAxEr4gvZmBDXMXGwC+XgVQqERDbCbEr5ZaoalXdq+0kTqdlWbBnHbwN1GoAeGsAeGv3AMdfN8+3h+ZdVwDcXE8GP7hfTqrnW0UgN99NLQDczAP1AFvzM4xpU6MagNw8vz75R1kBQpgHCrPQF0nNW3eJqjTURiDMl1+liYDUvLWQTRGTRiDcl18lAQhrHigDhDYPlAGYxpDmAXkNhG2cSwBzGolXOoWTJIVCQ0hSiAgMIa0BIiiEZiVmGvOpNVfXgtfuhYhgkbDsRpnGUiS6NDfWfoAIEomajowIAFHbExPvEN1X7BanEsTnGuiiVudChBPENH5wOGsAeGsAeGv3AE8yEDlUwXXxqQAAAABJRU5ErkJggg==", yI = "_icon_1467k_1", wI = {
    icon: yI
  }, bI = {
    undo: vI,
    redo: mI,
    tour: gI,
    alignTop: hI,
    alignBottom: pI,
    alignCenter: dI,
    alignSpread: th,
    alignTextCenter: th,
    alignTextLeft: OS,
    alignTextRight: IS
  };
  function SI({
    id: e,
    alt: t = e,
    size: n
  }) {
    return /* @__PURE__ */ y(
      "img",
      {
        src: bI[e],
        alt: t,
        className: wI.icon,
        style: n ? { height: n } : {}
      }
    );
  }
  var TS = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0
  }, Ay = _.createContext && _.createContext(TS), ai = globalThis && globalThis.__assign || function() {
    return ai = Object.assign || function(e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) {
        t = arguments[n];
        for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
      return e;
    }, ai.apply(this, arguments);
  }, EI = globalThis && globalThis.__rest || function(e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
  };
  function PS(e) {
    return e && e.map(function(t, n) {
      return _.createElement(t.tag, ai({
        key: n
      }, t.attr), PS(t.child));
    });
  }
  function It(e) {
    return function(t) {
      return _.createElement(AI, ai({
        attr: ai({}, e.attr)
      }, t), PS(e.child));
    };
  }
  function AI(e) {
    var t = function(n) {
      var r = e.attr, i = e.size, o = e.title, a = EI(e, ["attr", "size", "title"]), l = i || n.size || "1em", s;
      return n.className && (s = n.className), e.className && (s = (s ? s + " " : "") + e.className), _.createElement("svg", ai({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, n.attr, r, a, {
        className: s,
        style: ai(ai({
          color: e.color || n.color
        }, n.style), e.style),
        height: l,
        width: l,
        xmlns: "http://www.w3.org/2000/svg"
      }), o && _.createElement("title", null, o), e.children);
    };
    return Ay !== void 0 ? _.createElement(Ay.Consumer, null, function(n) {
      return t(n);
    }) : t(TS);
  }
  function CI(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" } }, { tag: "path", attr: { d: "M277 360h-42V235h42v125zm0-166h-42v-42h42v42z" } }] })(e);
  }
  const xI = (e) => /* @__PURE__ */ y(
    "svg",
    H(M({
      width: "1em",
      height: "1em",
      viewBox: "0 0 15 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, e), {
      children: /* @__PURE__ */ y("path", { d: "M7.38 7.477 14.432.691H.328L7.38 7.477Z", fill: "#75A8DB" })
    })
  ), kI = (e) => /* @__PURE__ */ y(
    "svg",
    H(M({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 49 40",
      width: "1em",
      height: "1em"
    }, e), {
      children: /* @__PURE__ */ y(
        "path",
        {
          stroke: "currentColor",
          strokeWidth: 2,
          d: "M27.42 8.115h2.074l10.592 11.414v1.052L28.705 32.04H27.4v-5.954H13.328l.105-11.975 13.988-.058V8.115Z"
        }
      )
    })
  ), Kc = (e) => /* @__PURE__ */ L(
    "svg",
    H(M({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 16 20",
      width: "1em",
      height: "1em"
    }, e), {
      children: [
        /* @__PURE__ */ y(
          "path",
          {
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: 1.5,
            d: "M0 4h16"
          }
        ),
        /* @__PURE__ */ y(
          "path",
          {
            stroke: "currentColor",
            strokeLinejoin: "round",
            d: "M5.5 6.5 6 16m2-9.5V16m2.5-9.5L10 16"
          }
        ),
        /* @__PURE__ */ y(
          "path",
          {
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: 1.5,
            d: "M5.5 4.5v-2l1.5-1h2l1.5 1v2m-8 0 .5 12 1.5 2h7l1.5-2 .5-12"
          }
        )
      ]
    })
  ), _I = (e) => /* @__PURE__ */ y(
    "svg",
    H(M({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 44 40",
      width: "1em",
      height: "1em"
    }, e), {
      children: /* @__PURE__ */ y(
        "path",
        {
          stroke: "currentColor",
          strokeWidth: 2,
          d: "M17.08 8.115h-2.074L4.414 19.529v1.052L15.795 32.04H17.1v-5.954h14.072l-.105-11.975-13.988-.058V8.115Z"
        }
      )
    })
  ), OI = (e) => /* @__PURE__ */ y(
    "svg",
    H(M({
      width: "1em",
      height: "1em",
      viewBox: "0 0 15 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, e), {
      children: /* @__PURE__ */ y("path", { d: "m7.38.477 7.052 6.786H.328L7.38.477Z", fill: "#75A8DB" })
    })
  );
  function nt(...e) {
    return e.filter((t) => t).join(" ");
  }
  const II = "_button_1y00r_1", TI = "_regular_1y00r_26", PI = "_icon_1y00r_34", NI = "_transparent_1y00r_42", yd = {
    button: II,
    regular: TI,
    delete: "_delete_1y00r_30",
    icon: PI,
    transparent: NI
  }, ht = (i) => {
    var o = i, { children: e, variant: t = "regular", className: n } = o, r = Le(o, ["children", "variant", "className"]);
    const a = t ? Array.isArray(t) ? t.map((l) => yd[l]).join(" ") : yd[t] : "";
    return /* @__PURE__ */ y(
      "button",
      H(M({
        className: nt(yd.button, a, n)
      }, r), {
        children: e
      })
    );
  }, DI = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "You can see how the changes impact your app with the app preview." }),
    /* @__PURE__ */ y("p", { children: "Click in the center of the preview to expand it to full screen to get a better view of your app." }),
    /* @__PURE__ */ y("p", { children: 'Any log messages from the app will be placed into the "App Logs" drawer.' })
  ] }), RI = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "The app view shows a skeleton view of the current state of your app's UI." }),
    /* @__PURE__ */ y("p", { children: "You can click on elements to select them or drag them around to move them." }),
    /* @__PURE__ */ y("p", { children: "Cards can be resized by dragging resize handles on the sides." }),
    /* @__PURE__ */ y("p", { children: "Rows and Columns can be resized by dragging between tracts and added by hovering over the left and top respectively to reveal the tract controls widget." }),
    /* @__PURE__ */ y("p", { children: /* @__PURE__ */ y("a", { href: "https://rstudio.github.io/shinyuieditor/articles/how-to.html#show-size-widget", children: "More info" }) })
  ] }), LI = /* @__PURE__ */ L("div", { children: [
    "Drag elements from the elements palette into the app pane on the right to add them to your app. ",
    /* @__PURE__ */ y("br", {}),
    " In the app view, the areas available for the element to be dropped in will pulse with an",
    " ",
    /* @__PURE__ */ y("span", { className: "can-accept-drop", style: { padding: "2px" }, children: "orange outline." })
  ] }), MI = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "After selecting an element in your app, you can adjust the settings for that element in the properties pane." }),
    /* @__PURE__ */ y("p", { children: "Changes made will be automatically applied to your element both in the app view and your code so there's no need to save or submit these changes." })
  ] }), FI = [
    {
      target: ".app-view",
      content: RI,
      disableBeacon: !0
    },
    {
      target: ".elements-panel",
      content: LI,
      placement: "right-start",
      disableBeacon: !0
    },
    {
      target: ".properties-panel",
      content: MI,
      placement: "left-start"
    },
    {
      target: ".app-preview",
      content: DI,
      placement: "top-start"
    },
    {
      target: ".undo-redo-buttons",
      content: "Mess something up? You can use the change history to undo or redo your changes",
      placement: "bottom"
    }
  ];
  function BI() {
    const [e, t] = K.useState(0), [n, r] = K.useState(!1), i = K.useCallback((a) => {
      const { action: l, index: s, type: u } = a;
      (u === xt.STEP_AFTER || u === xt.TARGET_NOT_FOUND) && (l === ce.NEXT ? t(s + 1) : l === ce.PREV ? t(s - 1) : l === ce.CLOSE && r(!1)), u === xt.TOUR_END && (l === ce.NEXT && (r(!1), t(0)), l === ce.SKIP && r(!1));
    }, []), o = K.useCallback(() => {
      r(!0);
    }, []);
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ L(
        ht,
        {
          onClick: o,
          title: "Take a guided tour of app",
          variant: "transparent",
          children: [
            /* @__PURE__ */ y(SI, { id: "tour", size: "24px" }),
            "Tour App"
          ]
        }
      ),
      /* @__PURE__ */ y(
        _S,
        {
          callback: i,
          steps: FI,
          stepIndex: e,
          run: n,
          continuous: !0,
          showProgress: !0,
          showSkipButton: !0,
          disableScrolling: !0,
          locale: {
            next: "Next",
            back: "Back",
            close: "Close",
            last: "Let's go!",
            open: "Open the dialog",
            skip: "Skip tour"
          },
          styles: zI
        }
      )
    ] });
  }
  const Cy = "#e07189", UI = "#f6d5dc", zI = {
    options: {
      arrowColor: "var(--rstudio-white, white)",
      backgroundColor: "var(--rstudio-white, white)",
      primaryColor: "var(--rstudio-blue, steelblue)",
      textColor: "var(--rstudio-grey, black)"
    },
    beaconInner: {
      backgroundColor: Cy
    },
    beaconOuter: {
      backgroundColor: UI,
      border: `2px solid ${Cy}`
    }
  };
  var NS = jI;
  function jI(e, t, n) {
    var r = null, i = null, o = function() {
      r && (clearTimeout(r), i = null, r = null);
    }, a = function() {
      var s = i;
      o(), s && s();
    }, l = function() {
      if (!t)
        return e.apply(this, arguments);
      var s = this, u = arguments, c = n && !r;
      if (o(), i = function() {
        e.apply(s, u);
      }, r = setTimeout(function() {
        if (r = null, !c) {
          var f = i;
          return i = null, f();
        }
      }, t), c)
        return i();
    };
    return l.cancel = o, l.flush = a, l;
  }
  var nh = {}, WI = {
    get exports() {
      return nh;
    },
    set exports(e) {
      nh = e;
    }
  }, DS = {};
  /**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var qo = K;
  function YI(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var VI = typeof Object.is == "function" ? Object.is : YI, $I = qo.useState, HI = qo.useEffect, GI = qo.useLayoutEffect, JI = qo.useDebugValue;
  function QI(e, t) {
    var n = t(), r = $I({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, o = r[1];
    return GI(function() {
      i.value = n, i.getSnapshot = t, wd(i) && o({ inst: i });
    }, [e, n, t]), HI(function() {
      return wd(i) && o({ inst: i }), e(function() {
        wd(i) && o({ inst: i });
      });
    }, [e]), JI(n), n;
  }
  function wd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !VI(e, n);
    } catch (r) {
      return !0;
    }
  }
  function KI(e, t) {
    return t();
  }
  var qI = typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined" ? KI : QI;
  DS.useSyncExternalStore = qo.useSyncExternalStore !== void 0 ? qo.useSyncExternalStore : qI;
  (function(e) {
    e.exports = DS;
  })(WI);
  var rh = {}, XI = {
    get exports() {
      return rh;
    },
    set exports(e) {
      rh = e;
    }
  }, RS = {};
  /**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var qc = K, ZI = nh;
  function eT(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var tT = typeof Object.is == "function" ? Object.is : eT, nT = ZI.useSyncExternalStore, rT = qc.useRef, iT = qc.useEffect, oT = qc.useMemo, aT = qc.useDebugValue;
  RS.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
    var o = rT(null);
    if (o.current === null) {
      var a = { hasValue: !1, value: null };
      o.current = a;
    } else
      a = o.current;
    o = oT(function() {
      function s(p) {
        if (!u) {
          if (u = !0, c = p, p = r(p), i !== void 0 && a.hasValue) {
            var h = a.value;
            if (i(h, p))
              return f = h;
          }
          return f = p;
        }
        if (h = f, tT(c, p))
          return h;
        var m = r(p);
        return i !== void 0 && i(h, m) ? h : (c = p, f = m);
      }
      var u = !1, c, f, d = n === void 0 ? null : n;
      return [function() {
        return s(t());
      }, d === null ? void 0 : function() {
        return s(d());
      }];
    }, [t, n, r, i]);
    var l = nT(e, o[0], o[1]);
    return iT(function() {
      a.hasValue = !0, a.value = l;
    }, [l]), aT(l), l;
  };
  (function(e) {
    e.exports = RS;
  })(XI);
  function lT(e) {
    e();
  }
  let LS = lT;
  const sT = (e) => LS = e, uT = () => LS, pi = /* @__PURE__ */ K.createContext(null);
  function MS() {
    return K.useContext(pi);
  }
  const cT = () => {
    throw new Error("uSES not initialized!");
  };
  let FS = cT;
  const fT = (e) => {
    FS = e;
  }, dT = (e, t) => e === t;
  function pT(e = pi) {
    const t = e === pi ? MS : () => K.useContext(e);
    return function(r, i = dT) {
      const {
        store: o,
        subscription: a,
        getServerState: l
      } = t(), s = FS(a.addNestedSub, o.getState, l || o.getState, r, i);
      return K.useDebugValue(s), s;
    };
  }
  const ls = /* @__PURE__ */ pT();
  var BS = Yr, hT = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, mT = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, US = {};
  US[BS.ForwardRef] = hT;
  US[BS.Memo] = mT;
  var xy = {}, gT = {
    get exports() {
      return xy;
    },
    set exports(e) {
      xy = e;
    }
  }, be = {};
  /**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Ym = Symbol.for("react.element"), Vm = Symbol.for("react.portal"), Xc = Symbol.for("react.fragment"), Zc = Symbol.for("react.strict_mode"), ef = Symbol.for("react.profiler"), tf = Symbol.for("react.provider"), nf = Symbol.for("react.context"), vT = Symbol.for("react.server_context"), rf = Symbol.for("react.forward_ref"), of = Symbol.for("react.suspense"), af = Symbol.for("react.suspense_list"), lf = Symbol.for("react.memo"), sf = Symbol.for("react.lazy"), yT = Symbol.for("react.offscreen"), zS;
  zS = Symbol.for("react.module.reference");
  function En(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Ym:
          switch (e = e.type, e) {
            case Xc:
            case ef:
            case Zc:
            case of:
            case af:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case vT:
                case nf:
                case rf:
                case sf:
                case lf:
                case tf:
                  return e;
                default:
                  return t;
              }
          }
        case Vm:
          return t;
      }
    }
  }
  be.ContextConsumer = nf;
  be.ContextProvider = tf;
  be.Element = Ym;
  be.ForwardRef = rf;
  be.Fragment = Xc;
  be.Lazy = sf;
  be.Memo = lf;
  be.Portal = Vm;
  be.Profiler = ef;
  be.StrictMode = Zc;
  be.Suspense = of;
  be.SuspenseList = af;
  be.isAsyncMode = function() {
    return !1;
  };
  be.isConcurrentMode = function() {
    return !1;
  };
  be.isContextConsumer = function(e) {
    return En(e) === nf;
  };
  be.isContextProvider = function(e) {
    return En(e) === tf;
  };
  be.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Ym;
  };
  be.isForwardRef = function(e) {
    return En(e) === rf;
  };
  be.isFragment = function(e) {
    return En(e) === Xc;
  };
  be.isLazy = function(e) {
    return En(e) === sf;
  };
  be.isMemo = function(e) {
    return En(e) === lf;
  };
  be.isPortal = function(e) {
    return En(e) === Vm;
  };
  be.isProfiler = function(e) {
    return En(e) === ef;
  };
  be.isStrictMode = function(e) {
    return En(e) === Zc;
  };
  be.isSuspense = function(e) {
    return En(e) === of;
  };
  be.isSuspenseList = function(e) {
    return En(e) === af;
  };
  be.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Xc || e === ef || e === Zc || e === of || e === af || e === yT || typeof e == "object" && e !== null && (e.$$typeof === sf || e.$$typeof === lf || e.$$typeof === tf || e.$$typeof === nf || e.$$typeof === rf || e.$$typeof === zS || e.getModuleId !== void 0);
  };
  be.typeOf = En;
  (function(e) {
    e.exports = be;
  })(gT);
  function wT() {
    const e = uT();
    let t = null, n = null;
    return {
      clear() {
        t = null, n = null;
      },
      notify() {
        e(() => {
          let r = t;
          for (; r; )
            r.callback(), r = r.next;
        });
      },
      get() {
        let r = [], i = t;
        for (; i; )
          r.push(i), i = i.next;
        return r;
      },
      subscribe(r) {
        let i = !0, o = n = {
          callback: r,
          next: null,
          prev: n
        };
        return o.prev ? o.prev.next = o : t = o, function() {
          !i || t === null || (i = !1, o.next ? o.next.prev = o.prev : n = o.prev, o.prev ? o.prev.next = o.next : t = o.next);
        };
      }
    };
  }
  const ky = {
    notify() {
    },
    get: () => []
  };
  function bT(e, t) {
    let n, r = ky;
    function i(f) {
      return s(), r.subscribe(f);
    }
    function o() {
      r.notify();
    }
    function a() {
      c.onStateChange && c.onStateChange();
    }
    function l() {
      return Boolean(n);
    }
    function s() {
      n || (n = t ? t.addNestedSub(a) : e.subscribe(a), r = wT());
    }
    function u() {
      n && (n(), n = void 0, r.clear(), r = ky);
    }
    const c = {
      addNestedSub: i,
      notifyNestedSubs: o,
      handleChangeWrapper: a,
      isSubscribed: l,
      trySubscribe: s,
      tryUnsubscribe: u,
      getListeners: () => r
    };
    return c;
  }
  const ST = typeof window != "undefined" && typeof window.document != "undefined" && typeof window.document.createElement != "undefined", ET = ST ? K.useLayoutEffect : K.useEffect;
  function AT({
    store: e,
    context: t,
    children: n,
    serverState: r
  }) {
    const i = K.useMemo(() => {
      const l = bT(e);
      return {
        store: e,
        subscription: l,
        getServerState: r ? () => r : void 0
      };
    }, [e, r]), o = K.useMemo(() => e.getState(), [e]);
    ET(() => {
      const {
        subscription: l
      } = i;
      return l.onStateChange = l.notifyNestedSubs, l.trySubscribe(), o !== e.getState() && l.notifyNestedSubs(), () => {
        l.tryUnsubscribe(), l.onStateChange = void 0;
      };
    }, [i, o]);
    const a = t || pi;
    return /* @__PURE__ */ _.createElement(a.Provider, {
      value: i
    }, n);
  }
  function jS(e = pi) {
    const t = (
      // @ts-ignore
      e === pi ? MS : () => K.useContext(e)
    );
    return function() {
      const {
        store: r
      } = t();
      return r;
    };
  }
  const WS = /* @__PURE__ */ jS();
  function CT(e = pi) {
    const t = (
      // @ts-ignore
      e === pi ? WS : jS(e)
    );
    return function() {
      return t().dispatch;
    };
  }
  const Dr = /* @__PURE__ */ CT();
  fT(rh.useSyncExternalStoreWithSelector);
  sT(ui.unstable_batchedUpdates);
  function Fn(e) {
    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      n[r - 1] = arguments[r];
    throw Error("[Immer] minified error nr: " + e + (n.length ? " " + n.map(function(i) {
      return "'" + i + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function hi(e) {
    return !!e && !!e[Ne];
  }
  function _r(e) {
    var t;
    return !!e && (function(n) {
      if (!n || typeof n != "object")
        return !1;
      var r = Object.getPrototypeOf(n);
      if (r === null)
        return !0;
      var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return i === Object || typeof i == "function" && Function.toString.call(i) === DT;
    }(e) || Array.isArray(e) || !!e[Dy] || !!(!((t = e.constructor) === null || t === void 0) && t[Dy]) || $m(e) || Hm(e));
  }
  function Qi(e, t, n) {
    n === void 0 && (n = !1), ca(e) === 0 ? (n ? Object.keys : Ro)(e).forEach(function(r) {
      n && typeof r == "symbol" || t(r, e[r], e);
    }) : e.forEach(function(r, i) {
      return t(i, r, e);
    });
  }
  function ca(e) {
    var t = e[Ne];
    return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : $m(e) ? 2 : Hm(e) ? 3 : 0;
  }
  function Do(e, t) {
    return ca(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
  }
  function xT(e, t) {
    return ca(e) === 2 ? e.get(t) : e[t];
  }
  function YS(e, t, n) {
    var r = ca(e);
    r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
  }
  function VS(e, t) {
    return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
  }
  function $m(e) {
    return PT && e instanceof Map;
  }
  function Hm(e) {
    return NT && e instanceof Set;
  }
  function Pi(e) {
    return e.o || e.t;
  }
  function Gm(e) {
    if (Array.isArray(e))
      return Array.prototype.slice.call(e);
    var t = HS(e);
    delete t[Ne];
    for (var n = Ro(t), r = 0; r < n.length; r++) {
      var i = n[r], o = t[i];
      o.writable === !1 && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = { configurable: !0, writable: !0, enumerable: o.enumerable, value: e[i] });
    }
    return Object.create(Object.getPrototypeOf(e), t);
  }
  function Jm(e, t) {
    return t === void 0 && (t = !1), Qm(e) || hi(e) || !_r(e) || (ca(e) > 1 && (e.set = e.add = e.clear = e.delete = kT), Object.freeze(e), t && Qi(e, function(n, r) {
      return Jm(r, !0);
    }, !0)), e;
  }
  function kT() {
    Fn(2);
  }
  function Qm(e) {
    return e == null || typeof e != "object" || Object.isFrozen(e);
  }
  function tr(e) {
    var t = lh[e];
    return t || Fn(18, e), t;
  }
  function _T(e, t) {
    lh[e] || (lh[e] = t);
  }
  function ih() {
    return Ul;
  }
  function bd(e, t) {
    t && (tr("Patches"), e.u = [], e.s = [], e.v = t);
  }
  function Xu(e) {
    oh(e), e.p.forEach(OT), e.p = null;
  }
  function oh(e) {
    e === Ul && (Ul = e.l);
  }
  function _y(e) {
    return Ul = { p: [], l: Ul, h: e, m: !0, _: 0 };
  }
  function OT(e) {
    var t = e[Ne];
    t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
  }
  function Sd(e, t) {
    t._ = t.p.length;
    var n = t.p[0], r = e !== void 0 && e !== n;
    return t.h.g || tr("ES5").S(t, e, r), r ? (n[Ne].P && (Xu(t), Fn(4)), _r(e) && (e = Zu(t, e), t.l || ec(t, e)), t.u && tr("Patches").M(n[Ne].t, e, t.u, t.s)) : e = Zu(t, n, []), Xu(t), t.u && t.v(t.u, t.s), e !== $S ? e : void 0;
  }
  function Zu(e, t, n) {
    if (Qm(t))
      return t;
    var r = t[Ne];
    if (!r)
      return Qi(t, function(l, s) {
        return Oy(e, r, t, l, s, n);
      }, !0), t;
    if (r.A !== e)
      return t;
    if (!r.P)
      return ec(e, r.t, !0), r.t;
    if (!r.I) {
      r.I = !0, r.A._--;
      var i = r.i === 4 || r.i === 5 ? r.o = Gm(r.k) : r.o, o = i, a = !1;
      r.i === 3 && (o = new Set(i), i.clear(), a = !0), Qi(o, function(l, s) {
        return Oy(e, r, i, l, s, n, a);
      }), ec(e, i, !1), n && e.u && tr("Patches").N(r, n, e.u, e.s);
    }
    return r.o;
  }
  function Oy(e, t, n, r, i, o, a) {
    if (hi(i)) {
      var l = Zu(e, i, o && t && t.i !== 3 && !Do(t.R, r) ? o.concat(r) : void 0);
      if (YS(n, r, l), !hi(l))
        return;
      e.m = !1;
    } else
      a && n.add(i);
    if (_r(i) && !Qm(i)) {
      if (!e.h.D && e._ < 1)
        return;
      Zu(e, i), t && t.A.l || ec(e, i);
    }
  }
  function ec(e, t, n) {
    n === void 0 && (n = !1), !e.l && e.h.D && e.m && Jm(t, n);
  }
  function Ed(e, t) {
    var n = e[Ne];
    return (n ? Pi(n) : e)[t];
  }
  function Iy(e, t) {
    if (t in e)
      for (var n = Object.getPrototypeOf(e); n; ) {
        var r = Object.getOwnPropertyDescriptor(n, t);
        if (r)
          return r;
        n = Object.getPrototypeOf(n);
      }
  }
  function $r(e) {
    e.P || (e.P = !0, e.l && $r(e.l));
  }
  function Ad(e) {
    e.o || (e.o = Gm(e.t));
  }
  function ah(e, t, n) {
    var r = $m(t) ? tr("MapSet").F(t, n) : Hm(t) ? tr("MapSet").T(t, n) : e.g ? function(i, o) {
      var a = Array.isArray(i), l = { i: a ? 1 : 0, A: o ? o.A : ih(), P: !1, I: !1, R: {}, l: o, t: i, k: null, o: null, j: null, C: !1 }, s = l, u = zl;
      a && (s = [l], u = Ha);
      var c = Proxy.revocable(s, u), f = c.revoke, d = c.proxy;
      return l.k = d, l.j = f, d;
    }(t, n) : tr("ES5").J(t, n);
    return (n ? n.A : ih()).p.push(r), r;
  }
  function IT(e) {
    return hi(e) || Fn(22, e), function t(n) {
      if (!_r(n))
        return n;
      var r, i = n[Ne], o = ca(n);
      if (i) {
        if (!i.P && (i.i < 4 || !tr("ES5").K(i)))
          return i.t;
        i.I = !0, r = Ty(n, o), i.I = !1;
      } else
        r = Ty(n, o);
      return Qi(r, function(a, l) {
        i && xT(i.t, a) === l || YS(r, a, t(l));
      }), o === 3 ? new Set(r) : r;
    }(e);
  }
  function Ty(e, t) {
    switch (t) {
      case 2:
        return new Map(e);
      case 3:
        return Array.from(e);
    }
    return Gm(e);
  }
  function TT() {
    function e(o, a) {
      var l = i[o];
      return l ? l.enumerable = a : i[o] = l = { configurable: !0, enumerable: a, get: function() {
        var s = this[Ne];
        return zl.get(s, o);
      }, set: function(s) {
        var u = this[Ne];
        zl.set(u, o, s);
      } }, l;
    }
    function t(o) {
      for (var a = o.length - 1; a >= 0; a--) {
        var l = o[a][Ne];
        if (!l.P)
          switch (l.i) {
            case 5:
              r(l) && $r(l);
              break;
            case 4:
              n(l) && $r(l);
          }
      }
    }
    function n(o) {
      for (var a = o.t, l = o.k, s = Ro(l), u = s.length - 1; u >= 0; u--) {
        var c = s[u];
        if (c !== Ne) {
          var f = a[c];
          if (f === void 0 && !Do(a, c))
            return !0;
          var d = l[c], p = d && d[Ne];
          if (p ? p.t !== f : !VS(d, f))
            return !0;
        }
      }
      var h = !!a[Ne];
      return s.length !== Ro(a).length + (h ? 0 : 1);
    }
    function r(o) {
      var a = o.k;
      if (a.length !== o.t.length)
        return !0;
      var l = Object.getOwnPropertyDescriptor(a, a.length - 1);
      if (l && !l.get)
        return !0;
      for (var s = 0; s < a.length; s++)
        if (!a.hasOwnProperty(s))
          return !0;
      return !1;
    }
    var i = {};
    _T("ES5", { J: function(o, a) {
      var l = Array.isArray(o), s = function(c, f) {
        if (c) {
          for (var d = Array(f.length), p = 0; p < f.length; p++)
            Object.defineProperty(d, "" + p, e(p, !0));
          return d;
        }
        var h = HS(f);
        delete h[Ne];
        for (var m = Ro(h), S = 0; S < m.length; S++) {
          var g = m[S];
          h[g] = e(g, c || !!h[g].enumerable);
        }
        return Object.create(Object.getPrototypeOf(f), h);
      }(l, o), u = { i: l ? 5 : 4, A: a ? a.A : ih(), P: !1, I: !1, R: {}, l: a, t: o, k: s, o: null, O: !1, C: !1 };
      return Object.defineProperty(s, Ne, { value: u, writable: !0 }), s;
    }, S: function(o, a, l) {
      l ? hi(a) && a[Ne].A === o && t(o.p) : (o.u && function s(u) {
        if (u && typeof u == "object") {
          var c = u[Ne];
          if (c) {
            var f = c.t, d = c.k, p = c.R, h = c.i;
            if (h === 4)
              Qi(d, function(w) {
                w !== Ne && (f[w] !== void 0 || Do(f, w) ? p[w] || s(d[w]) : (p[w] = !0, $r(c)));
              }), Qi(f, function(w) {
                d[w] !== void 0 || Do(d, w) || (p[w] = !1, $r(c));
              });
            else if (h === 5) {
              if (r(c) && ($r(c), p.length = !0), d.length < f.length)
                for (var m = d.length; m < f.length; m++)
                  p[m] = !1;
              else
                for (var S = f.length; S < d.length; S++)
                  p[S] = !0;
              for (var g = Math.min(d.length, f.length), v = 0; v < g; v++)
                d.hasOwnProperty(v) || (p[v] = !0), p[v] === void 0 && s(d[v]);
            }
          }
        }
      }(o.p[0]), t(o.p));
    }, K: function(o) {
      return o.i === 4 ? n(o) : r(o);
    } });
  }
  var Py, Ul, Km = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", PT = typeof Map != "undefined", NT = typeof Set != "undefined", Ny = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", $S = Km ? Symbol.for("immer-nothing") : ((Py = {})["immer-nothing"] = !0, Py), Dy = Km ? Symbol.for("immer-draftable") : "__$immer_draftable", Ne = Km ? Symbol.for("immer-state") : "__$immer_state", DT = "" + Object.prototype.constructor, Ro = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
  } : Object.getOwnPropertyNames, HS = Object.getOwnPropertyDescriptors || function(e) {
    var t = {};
    return Ro(e).forEach(function(n) {
      t[n] = Object.getOwnPropertyDescriptor(e, n);
    }), t;
  }, lh = {}, zl = { get: function(e, t) {
    if (t === Ne)
      return e;
    var n = Pi(e);
    if (!Do(n, t))
      return function(i, o, a) {
        var l, s = Iy(o, a);
        return s ? "value" in s ? s.value : (l = s.get) === null || l === void 0 ? void 0 : l.call(i.k) : void 0;
      }(e, n, t);
    var r = n[t];
    return e.I || !_r(r) ? r : r === Ed(e.t, t) ? (Ad(e), e.o[t] = ah(e.A.h, r, e)) : r;
  }, has: function(e, t) {
    return t in Pi(e);
  }, ownKeys: function(e) {
    return Reflect.ownKeys(Pi(e));
  }, set: function(e, t, n) {
    var r = Iy(Pi(e), t);
    if (r != null && r.set)
      return r.set.call(e.k, n), !0;
    if (!e.P) {
      var i = Ed(Pi(e), t), o = i == null ? void 0 : i[Ne];
      if (o && o.t === n)
        return e.o[t] = n, e.R[t] = !1, !0;
      if (VS(n, i) && (n !== void 0 || Do(e.t, t)))
        return !0;
      Ad(e), $r(e);
    }
    return e.o[t] === n && (n !== void 0 || t in e.o) || Number.isNaN(n) && Number.isNaN(e.o[t]) || (e.o[t] = n, e.R[t] = !0), !0;
  }, deleteProperty: function(e, t) {
    return Ed(e.t, t) !== void 0 || t in e.t ? (e.R[t] = !1, Ad(e), $r(e)) : delete e.R[t], e.o && delete e.o[t], !0;
  }, getOwnPropertyDescriptor: function(e, t) {
    var n = Pi(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: r.enumerable, value: n[t] };
  }, defineProperty: function() {
    Fn(11);
  }, getPrototypeOf: function(e) {
    return Object.getPrototypeOf(e.t);
  }, setPrototypeOf: function() {
    Fn(12);
  } }, Ha = {};
  Qi(zl, function(e, t) {
    Ha[e] = function() {
      return arguments[0] = arguments[0][0], t.apply(this, arguments);
    };
  }), Ha.deleteProperty = function(e, t) {
    return Ha.set.call(this, e, t, void 0);
  }, Ha.set = function(e, t, n) {
    return zl.set.call(this, e[0], t, n, e[0]);
  };
  var RT = function() {
    function e(n) {
      var r = this;
      this.g = Ny, this.D = !0, this.produce = function(i, o, a) {
        if (typeof i == "function" && typeof o != "function") {
          var l = o;
          o = i;
          var s = r;
          return function(m) {
            var S = this;
            m === void 0 && (m = l);
            for (var g = arguments.length, v = Array(g > 1 ? g - 1 : 0), w = 1; w < g; w++)
              v[w - 1] = arguments[w];
            return s.produce(m, function(E) {
              var k;
              return (k = o).call.apply(k, [S, E].concat(v));
            });
          };
        }
        var u;
        if (typeof o != "function" && Fn(6), a !== void 0 && typeof a != "function" && Fn(7), _r(i)) {
          var c = _y(r), f = ah(r, i, void 0), d = !0;
          try {
            u = o(f), d = !1;
          } finally {
            d ? Xu(c) : oh(c);
          }
          return typeof Promise != "undefined" && u instanceof Promise ? u.then(function(m) {
            return bd(c, a), Sd(m, c);
          }, function(m) {
            throw Xu(c), m;
          }) : (bd(c, a), Sd(u, c));
        }
        if (!i || typeof i != "object") {
          if ((u = o(i)) === void 0 && (u = i), u === $S && (u = void 0), r.D && Jm(u, !0), a) {
            var p = [], h = [];
            tr("Patches").M(i, u, p, h), a(p, h);
          }
          return u;
        }
        Fn(21, i);
      }, this.produceWithPatches = function(i, o) {
        if (typeof i == "function")
          return function(u) {
            for (var c = arguments.length, f = Array(c > 1 ? c - 1 : 0), d = 1; d < c; d++)
              f[d - 1] = arguments[d];
            return r.produceWithPatches(u, function(p) {
              return i.apply(void 0, [p].concat(f));
            });
          };
        var a, l, s = r.produce(i, o, function(u, c) {
          a = u, l = c;
        });
        return typeof Promise != "undefined" && s instanceof Promise ? s.then(function(u) {
          return [u, a, l];
        }) : [s, a, l];
      }, typeof (n == null ? void 0 : n.useProxies) == "boolean" && this.setUseProxies(n.useProxies), typeof (n == null ? void 0 : n.autoFreeze) == "boolean" && this.setAutoFreeze(n.autoFreeze);
    }
    var t = e.prototype;
    return t.createDraft = function(n) {
      _r(n) || Fn(8), hi(n) && (n = IT(n));
      var r = _y(this), i = ah(this, n, void 0);
      return i[Ne].C = !0, oh(r), i;
    }, t.finishDraft = function(n, r) {
      var i = n && n[Ne], o = i.A;
      return bd(o, r), Sd(void 0, o);
    }, t.setAutoFreeze = function(n) {
      this.D = n;
    }, t.setUseProxies = function(n) {
      n && !Ny && Fn(20), this.g = n;
    }, t.applyPatches = function(n, r) {
      var i;
      for (i = r.length - 1; i >= 0; i--) {
        var o = r[i];
        if (o.path.length === 0 && o.op === "replace") {
          n = o.value;
          break;
        }
      }
      i > -1 && (r = r.slice(i + 1));
      var a = tr("Patches").$;
      return hi(n) ? a(n, r) : this.produce(n, function(l) {
        return a(l, r);
      });
    }, e;
  }(), tn = new RT(), wi = tn.produce;
  tn.produceWithPatches.bind(tn);
  tn.setAutoFreeze.bind(tn);
  tn.setUseProxies.bind(tn);
  tn.applyPatches.bind(tn);
  tn.createDraft.bind(tn);
  tn.finishDraft.bind(tn);
  function jl(e) {
    return jl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t;
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, jl(e);
  }
  function LT(e, t) {
    if (jl(e) !== "object" || e === null)
      return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
      var r = n.call(e, t || "default");
      if (jl(r) !== "object")
        return r;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }
  function MT(e) {
    var t = LT(e, "string");
    return jl(t) === "symbol" ? t : String(t);
  }
  function FT(e, t, n) {
    return t = MT(t), t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function Ry(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function Ly(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? Ry(Object(n), !0).forEach(function(r) {
        FT(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ry(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function yt(e) {
    return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
  }
  var My = function() {
    return typeof Symbol == "function" && Symbol.observable || "@@observable";
  }(), Cd = function() {
    return Math.random().toString(36).substring(7).split("").join(".");
  }, tc = {
    INIT: "@@redux/INIT" + Cd(),
    REPLACE: "@@redux/REPLACE" + Cd(),
    PROBE_UNKNOWN_ACTION: function() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + Cd();
    }
  };
  function BT(e) {
    if (typeof e != "object" || e === null)
      return !1;
    for (var t = e; Object.getPrototypeOf(t) !== null; )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function GS(e, t, n) {
    var r;
    if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
      throw new Error(yt(0));
    if (typeof t == "function" && typeof n == "undefined" && (n = t, t = void 0), typeof n != "undefined") {
      if (typeof n != "function")
        throw new Error(yt(1));
      return n(GS)(e, t);
    }
    if (typeof e != "function")
      throw new Error(yt(2));
    var i = e, o = t, a = [], l = a, s = !1;
    function u() {
      l === a && (l = a.slice());
    }
    function c() {
      if (s)
        throw new Error(yt(3));
      return o;
    }
    function f(m) {
      if (typeof m != "function")
        throw new Error(yt(4));
      if (s)
        throw new Error(yt(5));
      var S = !0;
      return u(), l.push(m), function() {
        if (S) {
          if (s)
            throw new Error(yt(6));
          S = !1, u();
          var v = l.indexOf(m);
          l.splice(v, 1), a = null;
        }
      };
    }
    function d(m) {
      if (!BT(m))
        throw new Error(yt(7));
      if (typeof m.type == "undefined")
        throw new Error(yt(8));
      if (s)
        throw new Error(yt(9));
      try {
        s = !0, o = i(o, m);
      } finally {
        s = !1;
      }
      for (var S = a = l, g = 0; g < S.length; g++) {
        var v = S[g];
        v();
      }
      return m;
    }
    function p(m) {
      if (typeof m != "function")
        throw new Error(yt(10));
      i = m, d({
        type: tc.REPLACE
      });
    }
    function h() {
      var m, S = f;
      return m = {
        /**
         * The minimal observable subscription method.
         * @param {Object} observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns {subscription} An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe: function(v) {
          if (typeof v != "object" || v === null)
            throw new Error(yt(11));
          function w() {
            v.next && v.next(c());
          }
          w();
          var E = S(w);
          return {
            unsubscribe: E
          };
        }
      }, m[My] = function() {
        return this;
      }, m;
    }
    return d({
      type: tc.INIT
    }), r = {
      dispatch: d,
      subscribe: f,
      getState: c,
      replaceReducer: p
    }, r[My] = h, r;
  }
  function UT(e) {
    Object.keys(e).forEach(function(t) {
      var n = e[t], r = n(void 0, {
        type: tc.INIT
      });
      if (typeof r == "undefined")
        throw new Error(yt(12));
      if (typeof n(void 0, {
        type: tc.PROBE_UNKNOWN_ACTION()
      }) == "undefined")
        throw new Error(yt(13));
    });
  }
  function zT(e) {
    for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
      var i = t[r];
      typeof e[i] == "function" && (n[i] = e[i]);
    }
    var o = Object.keys(n), a;
    try {
      UT(n);
    } catch (l) {
      a = l;
    }
    return function(s, u) {
      if (s === void 0 && (s = {}), a)
        throw a;
      for (var c = !1, f = {}, d = 0; d < o.length; d++) {
        var p = o[d], h = n[p], m = s[p], S = h(m, u);
        if (typeof S == "undefined")
          throw u && u.type, new Error(yt(14));
        f[p] = S, c = c || S !== m;
      }
      return c = c || o.length !== Object.keys(s).length, c ? f : s;
    };
  }
  function nc() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return t.length === 0 ? function(r) {
      return r;
    } : t.length === 1 ? t[0] : t.reduce(function(r, i) {
      return function() {
        return r(i.apply(void 0, arguments));
      };
    });
  }
  function jT() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return function(r) {
      return function() {
        var i = r.apply(void 0, arguments), o = function() {
          throw new Error(yt(15));
        }, a = {
          getState: i.getState,
          dispatch: function() {
            return o.apply(void 0, arguments);
          }
        }, l = t.map(function(s) {
          return s(a);
        });
        return o = nc.apply(void 0, l)(i.dispatch), Ly(Ly({}, i), {}, {
          dispatch: o
        });
      };
    };
  }
  function JS(e) {
    var t = function(r) {
      var i = r.dispatch, o = r.getState;
      return function(a) {
        return function(l) {
          return typeof l == "function" ? l(i, o, e) : a(l);
        };
      };
    };
    return t;
  }
  var QS = JS();
  QS.withExtraArgument = JS;
  const Fy = QS;
  var WT = globalThis && globalThis.__extends || function() {
    var e = function(t, n) {
      return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
        r.__proto__ = i;
      } || function(r, i) {
        for (var o in i)
          Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
      }, e(t, n);
    };
    return function(t, n) {
      if (typeof n != "function" && n !== null)
        throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
      e(t, n);
      function r() {
        this.constructor = t;
      }
      t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
    };
  }(), ss = globalThis && globalThis.__generator || function(e, t) {
    var n = { label: 0, sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    }, trys: [], ops: [] }, r, i, o, a;
    return a = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
      return this;
    }), a;
    function l(u) {
      return function(c) {
        return s([u, c]);
      };
    }
    function s(u) {
      if (r)
        throw new TypeError("Generator is already executing.");
      for (; n; )
        try {
          if (r = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
            return o;
          switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
            case 0:
            case 1:
              o = u;
              break;
            case 4:
              return n.label++, { value: u[1], done: !1 };
            case 5:
              n.label++, i = u[1], u = [0];
              continue;
            case 7:
              u = n.ops.pop(), n.trys.pop();
              continue;
            default:
              if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                n = 0;
                continue;
              }
              if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
                n.label = u[1];
                break;
              }
              if (u[0] === 6 && n.label < o[1]) {
                n.label = o[1], o = u;
                break;
              }
              if (o && n.label < o[2]) {
                n.label = o[2], n.ops.push(u);
                break;
              }
              o[2] && n.ops.pop(), n.trys.pop();
              continue;
          }
          u = t.call(e, n);
        } catch (c) {
          u = [6, c], i = 0;
        } finally {
          r = o = 0;
        }
      if (u[0] & 5)
        throw u[1];
      return { value: u[0] ? u[1] : void 0, done: !0 };
    }
  }, Wl = globalThis && globalThis.__spreadArray || function(e, t) {
    for (var n = 0, r = t.length, i = e.length; n < r; n++, i++)
      e[i] = t[n];
    return e;
  }, YT = Object.defineProperty, VT = Object.defineProperties, $T = Object.getOwnPropertyDescriptors, By = Object.getOwnPropertySymbols, HT = Object.prototype.hasOwnProperty, GT = Object.prototype.propertyIsEnumerable, Uy = function(e, t, n) {
    return t in e ? YT(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
  }, li = function(e, t) {
    for (var n in t || (t = {}))
      HT.call(t, n) && Uy(e, n, t[n]);
    if (By)
      for (var r = 0, i = By(t); r < i.length; r++) {
        var n = i[r];
        GT.call(t, n) && Uy(e, n, t[n]);
      }
    return e;
  }, xd = function(e, t) {
    return VT(e, $T(t));
  }, us = function(e, t, n) {
    return new Promise(function(r, i) {
      var o = function(s) {
        try {
          l(n.next(s));
        } catch (u) {
          i(u);
        }
      }, a = function(s) {
        try {
          l(n.throw(s));
        } catch (u) {
          i(u);
        }
      }, l = function(s) {
        return s.done ? r(s.value) : Promise.resolve(s.value).then(o, a);
      };
      l((n = n.apply(e, t)).next());
    });
  }, JT = typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length !== 0)
      return typeof arguments[0] == "object" ? nc : nc.apply(null, arguments);
  };
  function QT(e) {
    if (typeof e != "object" || e === null)
      return !1;
    var t = Object.getPrototypeOf(e);
    if (t === null)
      return !0;
    for (var n = t; Object.getPrototypeOf(n) !== null; )
      n = Object.getPrototypeOf(n);
    return t === n;
  }
  var KT = (
    /** @class */
    function(e) {
      WT(t, e);
      function t() {
        for (var n = [], r = 0; r < arguments.length; r++)
          n[r] = arguments[r];
        var i = e.apply(this, n) || this;
        return Object.setPrototypeOf(i, t.prototype), i;
      }
      return Object.defineProperty(t, Symbol.species, {
        get: function() {
          return t;
        },
        enumerable: !1,
        configurable: !0
      }), t.prototype.concat = function() {
        for (var n = [], r = 0; r < arguments.length; r++)
          n[r] = arguments[r];
        return e.prototype.concat.apply(this, n);
      }, t.prototype.prepend = function() {
        for (var n = [], r = 0; r < arguments.length; r++)
          n[r] = arguments[r];
        return n.length === 1 && Array.isArray(n[0]) ? new (t.bind.apply(t, Wl([void 0], n[0].concat(this))))() : new (t.bind.apply(t, Wl([void 0], n.concat(this))))();
      }, t;
    }(Array)
  );
  function sh(e) {
    return _r(e) ? wi(e, function() {
    }) : e;
  }
  function qT(e) {
    return typeof e == "boolean";
  }
  function XT() {
    return function(t) {
      return ZT(t);
    };
  }
  function ZT(e) {
    e === void 0 && (e = {});
    var t = e.thunk, n = t === void 0 ? !0 : t;
    e.immutableCheck, e.serializableCheck;
    var r = new KT();
    return n && (qT(n) ? r.push(Fy) : r.push(Fy.withExtraArgument(n.extraArgument))), r;
  }
  var eP = !0;
  function tP(e) {
    var t = XT(), n = e || {}, r = n.reducer, i = r === void 0 ? void 0 : r, o = n.middleware, a = o === void 0 ? t() : o, l = n.devTools, s = l === void 0 ? !0 : l, u = n.preloadedState, c = u === void 0 ? void 0 : u, f = n.enhancers, d = f === void 0 ? void 0 : f, p;
    if (typeof i == "function")
      p = i;
    else if (QT(i))
      p = zT(i);
    else
      throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    var h = a;
    typeof h == "function" && (h = h(t));
    var m = jT.apply(void 0, h), S = nc;
    s && (S = JT(li({
      trace: !eP
    }, typeof s == "object" && s)));
    var g = [m];
    Array.isArray(d) ? g = Wl([m], d) : typeof d == "function" && (g = d(g));
    var v = S.apply(void 0, g);
    return GS(p, c, v);
  }
  function Sr(e, t) {
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++)
        r[i] = arguments[i];
      if (t) {
        var o = t.apply(void 0, r);
        if (!o)
          throw new Error("prepareAction did not return an object");
        return li(li({
          type: e,
          payload: o.payload
        }, "meta" in o && { meta: o.meta }), "error" in o && { error: o.error });
      }
      return { type: e, payload: r[0] };
    }
    return n.toString = function() {
      return "" + e;
    }, n.type = e, n.match = function(r) {
      return r.type === e;
    }, n;
  }
  function KS(e) {
    var t = {}, n = [], r, i = {
      addCase: function(o, a) {
        var l = typeof o == "string" ? o : o.type;
        if (l in t)
          throw new Error("addCase cannot be called with two reducers for the same action type");
        return t[l] = a, i;
      },
      addMatcher: function(o, a) {
        return n.push({ matcher: o, reducer: a }), i;
      },
      addDefaultCase: function(o) {
        return r = o, i;
      }
    };
    return e(i), [t, n, r];
  }
  function nP(e) {
    return typeof e == "function";
  }
  function rP(e, t, n, r) {
    n === void 0 && (n = []);
    var i = typeof t == "function" ? KS(t) : [t, n, r], o = i[0], a = i[1], l = i[2], s;
    if (nP(e))
      s = function() {
        return sh(e());
      };
    else {
      var u = sh(e);
      s = function() {
        return u;
      };
    }
    function c(f, d) {
      f === void 0 && (f = s());
      var p = Wl([
        o[d.type]
      ], a.filter(function(h) {
        var m = h.matcher;
        return m(d);
      }).map(function(h) {
        var m = h.reducer;
        return m;
      }));
      return p.filter(function(h) {
        return !!h;
      }).length === 0 && (p = [l]), p.reduce(function(h, m) {
        if (m)
          if (hi(h)) {
            var S = h, g = m(S, d);
            return g === void 0 ? h : g;
          } else {
            if (_r(h))
              return wi(h, function(v) {
                return m(v, d);
              });
            var g = m(h, d);
            if (g === void 0) {
              if (h === null)
                return h;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return g;
          }
        return h;
      }, f);
    }
    return c.getInitialState = s, c;
  }
  function iP(e, t) {
    return e + "/" + t;
  }
  function uf(e) {
    var t = e.name;
    if (!t)
      throw new Error("`name` is a required option for createSlice");
    var n = typeof e.initialState == "function" ? e.initialState : sh(e.initialState), r = e.reducers || {}, i = Object.keys(r), o = {}, a = {}, l = {};
    i.forEach(function(c) {
      var f = r[c], d = iP(t, c), p, h;
      "reducer" in f ? (p = f.reducer, h = f.prepare) : p = f, o[c] = p, a[d] = p, l[c] = h ? Sr(d, h) : Sr(d);
    });
    function s() {
      var c = typeof e.extraReducers == "function" ? KS(e.extraReducers) : [e.extraReducers], f = c[0], d = f === void 0 ? {} : f, p = c[1], h = p === void 0 ? [] : p, m = c[2], S = m === void 0 ? void 0 : m, g = li(li({}, d), a);
      return rP(n, function(v) {
        for (var w in g)
          v.addCase(w, g[w]);
        for (var E = 0, k = h; E < k.length; E++) {
          var b = k[E];
          v.addMatcher(b.matcher, b.reducer);
        }
        S && v.addDefaultCase(S);
      });
    }
    var u;
    return {
      name: t,
      reducer: function(c, f) {
        return u || (u = s()), u(c, f);
      },
      actions: l,
      caseReducers: o,
      getInitialState: function() {
        return u || (u = s()), u.getInitialState();
      }
    };
  }
  var oP = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", qS = function(e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; )
      t += oP[Math.random() * 64 | 0];
    return t;
  }, aP = [
    "name",
    "message",
    "stack",
    "code"
  ], kd = (
    /** @class */
    function() {
      function e(t, n) {
        this.payload = t, this.meta = n;
      }
      return e;
    }()
  ), zy = (
    /** @class */
    function() {
      function e(t, n) {
        this.payload = t, this.meta = n;
      }
      return e;
    }()
  ), lP = function(e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = aP; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  };
  (function() {
    function e(t, n, r) {
      var i = Sr(t + "/fulfilled", function(u, c, f, d) {
        return {
          payload: u,
          meta: xd(li({}, d || {}), {
            arg: f,
            requestId: c,
            requestStatus: "fulfilled"
          })
        };
      }), o = Sr(t + "/pending", function(u, c, f) {
        return {
          payload: void 0,
          meta: xd(li({}, f || {}), {
            arg: c,
            requestId: u,
            requestStatus: "pending"
          })
        };
      }), a = Sr(t + "/rejected", function(u, c, f, d, p) {
        return {
          payload: d,
          error: (r && r.serializeError || lP)(u || "Rejected"),
          meta: xd(li({}, p || {}), {
            arg: f,
            requestId: c,
            rejectedWithValue: !!d,
            requestStatus: "rejected",
            aborted: (u == null ? void 0 : u.name) === "AbortError",
            condition: (u == null ? void 0 : u.name) === "ConditionError"
          })
        };
      }), l = typeof AbortController != "undefined" ? AbortController : (
        /** @class */
        function() {
          function u() {
            this.signal = {
              aborted: !1,
              addEventListener: function() {
              },
              dispatchEvent: function() {
                return !1;
              },
              onabort: function() {
              },
              removeEventListener: function() {
              },
              reason: void 0,
              throwIfAborted: function() {
              }
            };
          }
          return u.prototype.abort = function() {
          }, u;
        }()
      );
      function s(u) {
        return function(c, f, d) {
          var p = r != null && r.idGenerator ? r.idGenerator(u) : qS(), h = new l(), m;
          function S(v) {
            m = v, h.abort();
          }
          var g = function() {
            return us(this, null, function() {
              var v, w, E, k, b, A, O;
              return ss(this, function(T) {
                switch (T.label) {
                  case 0:
                    return T.trys.push([0, 4, , 5]), k = (v = r == null ? void 0 : r.condition) == null ? void 0 : v.call(r, u, { getState: f, extra: d }), uP(k) ? [4, k] : [3, 2];
                  case 1:
                    k = T.sent(), T.label = 2;
                  case 2:
                    if (k === !1 || h.signal.aborted)
                      throw {
                        name: "ConditionError",
                        message: "Aborted due to condition callback returning false."
                      };
                    return b = new Promise(function(P, I) {
                      return h.signal.addEventListener("abort", function() {
                        return I({
                          name: "AbortError",
                          message: m || "Aborted"
                        });
                      });
                    }), c(o(p, u, (w = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : w.call(r, { requestId: p, arg: u }, { getState: f, extra: d }))), [4, Promise.race([
                      b,
                      Promise.resolve(n(u, {
                        dispatch: c,
                        getState: f,
                        extra: d,
                        requestId: p,
                        signal: h.signal,
                        abort: S,
                        rejectWithValue: function(P, I) {
                          return new kd(P, I);
                        },
                        fulfillWithValue: function(P, I) {
                          return new zy(P, I);
                        }
                      })).then(function(P) {
                        if (P instanceof kd)
                          throw P;
                        return P instanceof zy ? i(P.payload, p, u, P.meta) : i(P, p, u);
                      })
                    ])];
                  case 3:
                    return E = T.sent(), [3, 5];
                  case 4:
                    return A = T.sent(), E = A instanceof kd ? a(null, p, u, A.payload, A.meta) : a(A, p, u), [3, 5];
                  case 5:
                    return O = r && !r.dispatchConditionRejection && a.match(E) && E.meta.condition, O || c(E), [2, E];
                }
              });
            });
          }();
          return Object.assign(g, {
            abort: S,
            requestId: p,
            arg: u,
            unwrap: function() {
              return g.then(sP);
            }
          });
        };
      }
      return Object.assign(s, {
        pending: o,
        rejected: a,
        fulfilled: i,
        typePrefix: t
      });
    }
    return e.withTypes = function() {
      return e;
    }, e;
  })();
  function sP(e) {
    if (e.meta && e.meta.rejectedWithValue)
      throw e.payload;
    if (e.error)
      throw e.error;
    return e.payload;
  }
  function uP(e) {
    return e !== null && typeof e == "object" && typeof e.then == "function";
  }
  var qm = function(e, t) {
    if (typeof e != "function")
      throw new TypeError(t + " is not a function");
  }, uh = function() {
  }, XS = function(e, t) {
    return t === void 0 && (t = uh), e.catch(t), e;
  }, ZS = function(e, t) {
    return e.addEventListener("abort", t, { once: !0 }), function() {
      return e.removeEventListener("abort", t);
    };
  }, Lo = function(e, t) {
    var n = e.signal;
    n.aborted || ("reason" in n || Object.defineProperty(n, "reason", {
      enumerable: !0,
      value: t,
      configurable: !0,
      writable: !0
    }), e.abort(t));
  }, cP = "task", eE = "listener", tE = "completed", Xm = "cancelled", fP = "task-" + Xm, dP = "task-" + tE, nE = eE + "-" + Xm, pP = eE + "-" + tE, cf = (
    /** @class */
    function() {
      function e(t) {
        this.code = t, this.name = "TaskAbortError", this.message = cP + " " + Xm + " (reason: " + t + ")";
      }
      return e;
    }()
  ), Mo = function(e) {
    if (e.aborted)
      throw new cf(e.reason);
  };
  function rE(e, t) {
    var n = uh;
    return new Promise(function(r, i) {
      var o = function() {
        return i(new cf(e.reason));
      };
      if (e.aborted) {
        o();
        return;
      }
      n = ZS(e, o), t.finally(function() {
        return n();
      }).then(r, i);
    }).finally(function() {
      n = uh;
    });
  }
  var hP = function(e, t) {
    return us(void 0, null, function() {
      var n, r;
      return ss(this, function(i) {
        switch (i.label) {
          case 0:
            return i.trys.push([0, 3, 4, 5]), [4, Promise.resolve()];
          case 1:
            return i.sent(), [4, e()];
          case 2:
            return n = i.sent(), [2, {
              status: "ok",
              value: n
            }];
          case 3:
            return r = i.sent(), [2, {
              status: r instanceof cf ? "cancelled" : "rejected",
              error: r
            }];
          case 4:
            return t == null || t(), [
              7
              /*endfinally*/
            ];
          case 5:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, rc = function(e) {
    return function(t) {
      return XS(rE(e, t).then(function(n) {
        return Mo(e), n;
      }));
    };
  }, iE = function(e) {
    var t = rc(e);
    return function(n) {
      return t(new Promise(function(r) {
        return setTimeout(r, n);
      }));
    };
  }, mP = Object.assign, jy = {}, cs = "listenerMiddleware", gP = function(e) {
    var t = function(n) {
      return ZS(e, function() {
        return Lo(n, e.reason);
      });
    };
    return function(n) {
      qm(n, "taskExecutor");
      var r = new AbortController();
      t(r);
      var i = hP(function() {
        return us(void 0, null, function() {
          var o;
          return ss(this, function(a) {
            switch (a.label) {
              case 0:
                return Mo(e), Mo(r.signal), [4, n({
                  pause: rc(r.signal),
                  delay: iE(r.signal),
                  signal: r.signal
                })];
              case 1:
                return o = a.sent(), Mo(r.signal), [2, o];
            }
          });
        });
      }, function() {
        return Lo(r, dP);
      });
      return {
        result: rc(e)(i),
        cancel: function() {
          Lo(r, fP);
        }
      };
    };
  }, vP = function(e, t) {
    var n = function(r, i) {
      return us(void 0, null, function() {
        var o, a, l, s;
        return ss(this, function(u) {
          switch (u.label) {
            case 0:
              Mo(t), o = function() {
              }, a = new Promise(function(c, f) {
                var d = e({
                  predicate: r,
                  effect: function(p, h) {
                    h.unsubscribe(), c([
                      p,
                      h.getState(),
                      h.getOriginalState()
                    ]);
                  }
                });
                o = function() {
                  d(), f();
                };
              }), l = [
                a
              ], i != null && l.push(new Promise(function(c) {
                return setTimeout(c, i, null);
              })), u.label = 1;
            case 1:
              return u.trys.push([1, , 3, 4]), [4, rE(t, Promise.race(l))];
            case 2:
              return s = u.sent(), Mo(t), [2, s];
            case 3:
              return o(), [
                7
                /*endfinally*/
              ];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    return function(r, i) {
      return XS(n(r, i));
    };
  }, oE = function(e) {
    var t = e.type, n = e.actionCreator, r = e.matcher, i = e.predicate, o = e.effect;
    if (t)
      i = Sr(t).match;
    else if (n)
      t = n.type, i = n.match;
    else if (r)
      i = r;
    else if (!i)
      throw new Error("Creating or removing a listener requires one of the known fields for matching an action");
    return qm(o, "options.listener"), { predicate: i, type: t, effect: o };
  }, yP = function(e) {
    var t = oE(e), n = t.type, r = t.predicate, i = t.effect, o = qS(), a = {
      id: o,
      effect: i,
      type: n,
      predicate: r,
      pending: /* @__PURE__ */ new Set(),
      unsubscribe: function() {
        throw new Error("Unsubscribe not initialized");
      }
    };
    return a;
  }, ch = function(e) {
    e.pending.forEach(function(t) {
      Lo(t, nE);
    });
  }, wP = function(e) {
    return function() {
      e.forEach(ch), e.clear();
    };
  }, Wy = function(e, t, n) {
    try {
      e(t, n);
    } catch (r) {
      setTimeout(function() {
        throw r;
      }, 0);
    }
  }, bP = Sr(cs + "/add"), SP = Sr(cs + "/removeAll"), EP = Sr(cs + "/remove"), AP = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    console.error.apply(console, Wl([cs + "/error"], e));
  };
  function Zm(e) {
    var t = this;
    e === void 0 && (e = {});
    var n = /* @__PURE__ */ new Map(), r = e.extra, i = e.onError, o = i === void 0 ? AP : i;
    qm(o, "onError");
    var a = function(p) {
      return p.unsubscribe = function() {
        return n.delete(p.id);
      }, n.set(p.id, p), function(h) {
        p.unsubscribe(), h != null && h.cancelActive && ch(p);
      };
    }, l = function(p) {
      for (var h = 0, m = Array.from(n.values()); h < m.length; h++) {
        var S = m[h];
        if (p(S))
          return S;
      }
    }, s = function(p) {
      var h = l(function(m) {
        return m.effect === p.effect;
      });
      return h || (h = yP(p)), a(h);
    }, u = function(p) {
      var h = oE(p), m = h.type, S = h.effect, g = h.predicate, v = l(function(w) {
        var E = typeof m == "string" ? w.type === m : w.predicate === g;
        return E && w.effect === S;
      });
      return v && (v.unsubscribe(), p.cancelActive && ch(v)), !!v;
    }, c = function(p, h, m, S) {
      return us(t, null, function() {
        var g, v, w;
        return ss(this, function(E) {
          switch (E.label) {
            case 0:
              g = new AbortController(), v = vP(s, g.signal), E.label = 1;
            case 1:
              return E.trys.push([1, 3, 4, 5]), p.pending.add(g), [4, Promise.resolve(p.effect(h, mP({}, m, {
                getOriginalState: S,
                condition: function(k, b) {
                  return v(k, b).then(Boolean);
                },
                take: v,
                delay: iE(g.signal),
                pause: rc(g.signal),
                extra: r,
                signal: g.signal,
                fork: gP(g.signal),
                unsubscribe: p.unsubscribe,
                subscribe: function() {
                  n.set(p.id, p);
                },
                cancelActiveListeners: function() {
                  p.pending.forEach(function(k, b, A) {
                    k !== g && (Lo(k, nE), A.delete(k));
                  });
                }
              })))];
            case 2:
              return E.sent(), [3, 5];
            case 3:
              return w = E.sent(), w instanceof cf || Wy(o, w, {
                raisedBy: "effect"
              }), [3, 5];
            case 4:
              return Lo(g, pP), p.pending.delete(g), [
                7
                /*endfinally*/
              ];
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, f = wP(n), d = function(p) {
      return function(h) {
        return function(m) {
          if (bP.match(m))
            return s(m.payload);
          if (SP.match(m)) {
            f();
            return;
          }
          if (EP.match(m))
            return u(m.payload);
          var S = p.getState(), g = function() {
            if (S === jy)
              throw new Error(cs + ": getOriginalState can only be called synchronously");
            return S;
          }, v;
          try {
            if (v = h(m), n.size > 0)
              for (var w = p.getState(), E = Array.from(n.values()), k = 0, b = E; k < b.length; k++) {
                var A = b[k], O = !1;
                try {
                  O = A.predicate(m, w, S);
                } catch (T) {
                  O = !1, Wy(o, T, {
                    raisedBy: "predicate"
                  });
                }
                O && c(A, m, p, g);
              }
          } finally {
            S = jy;
          }
          return v;
        };
      };
    };
    return {
      middleware: d,
      startListening: s,
      stopListening: u,
      clearListeners: f
    };
  }
  var Yy;
  typeof queueMicrotask == "function" && queueMicrotask.bind(typeof window != "undefined" ? window : typeof global != "undefined" ? global : globalThis);
  TT();
  const eg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEO0lEQVR4nO3dsYqcVRiH8WeNrkXMDRgLixRWRjSiXoMWG0iUXIGNsii4wRsQTApD0EIvQBCJ2RD0GqIoRjthC4vsHaRxRcbi7MDk28kMgv+c92SfH2zxfbPFmZcnZ06+LWZjNpsh/d+e6L0APZ4MSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqWIJ3svYJ2db/aW3d4Etg5/3gCePby3Mfm96RcFjfj6feAe8CtwE7gFHEx+jyvvnJne6qp8WEucB64AtSaZ8wzwwuHPJWAPuAx813NR64z0UXgC+JQ20OMS1TJngBu0WZzovJaHGmnH+gTY6b2IQuazuNx1FQ8xyo51gaNRHQDXaWesUxw9n3B4b/FnxNdP0d7jdY6erXZosylnhLA2gc8m9/aB14Bt4A7tgPu4uk97j9u097w/ef0abUaljBDWReC5hesD4C3gbpfV9HUXeBP4a+HeaeDtLqtZYYSwtibXX3I8o5r7Dfhqcm+rwzpWGiGsVyfXX3dZRS3TGZzrsooVRvhf4fOT63LniQ7usPywX8YIO9bUkafOqmfEsDQAw1LECGesdX+oPa5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqUIw1LECGes0s9rOio9F3csRRiWIgxLESOcsUqdHQopPRd3LEUYliIMSxEjnLFKP6/pqPRc3LEUYViKMCxFjHDGKnV2KKT0XNyxFGFYijAsRYxwxir9vKaj0nNxx1KEYSnCsBQxwhmr1NmhkNJzccdShGEpwrAUMcIZq/Tzmo5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqWIEcPyK08GMEJYf9Ce2cx/Xu67nBJe58GZ/Nl1NUuMENbvk+tLXVZRy3QGP3dZxQojhLU7uX4XONthHVW8SJvBot0O61hphLC+Be4tXD8NfA+81GU1fZ0FfqDNYG6fNqNSRgjrAPhwcu808CPt+5DPAScf8ZoepZO093gN+In23hd9wINf5VvCCA9Iof2LvAp8tHBvk/YF3NsL96YPDdf9oXa016euUnC3gjF2rLmPgc97L6KQL2gzKWmksP4B3gcuAHud19LTHnAReI82k5JG+ShcdAO4TRvueeAV2rnjqZ6LCvqbdkD/BbhJ++gr//XFG7PZuo9x6b8b6aNQAzEsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliL+BXaHdHGUC5uqAAAAAElFTkSuQmCC", aE = uf({
    name: "currentlyDraggedNode",
    initialState: null,
    reducers: {
      SET_DRAGGED: (e, t) => t.payload.node_info,
      UNSET_DRAGGED: (e) => null
    }
  }), { SET_DRAGGED: CP, UNSET_DRAGGED: xP } = aE.actions;
  function kP() {
    return ls((e) => e.currentlyDraggedNode);
  }
  function _P() {
    const e = Dr();
    return (t) => e(CP({ node_info: t }));
  }
  function lE() {
    const e = Dr();
    return () => e(xP());
  }
  const OP = aE.reducer;
  function sE({
    nodeInfo: e,
    immovable: t = !1
  }) {
    var l;
    const n = _.useRef(!1), r = _P(), i = lE(), o = _.useCallback(
      (s) => {
        n.current === !1 || t || (i(), n.current = !1, document.body.removeEventListener("dragover", Vy), document.body.removeEventListener("drop", o));
      },
      [t, i]
    ), a = _.useCallback(
      (s) => {
        s.stopPropagation(), r(e), n.current = !0, document.body.addEventListener("dragover", Vy), document.body.addEventListener("drop", o);
      },
      [o, e, r]
    );
    return ((l = e.currentPath) == null ? void 0 : l.length) === 0 || t ? (console.log("Triggered case of root note having drag disabled"), null) : {
      onDragStart: a,
      onDragEnd: o,
      draggable: !0
    };
  }
  function Vy(e) {
    e.preventDefault();
  }
  function nn(e, t) {
    return [...e, t];
  }
  function ff(e) {
    return e.join("-");
  }
  const uE = uf({
    name: "selectedPath",
    initialState: [],
    reducers: {
      SET_SELECTION: (e, t) => t.payload.path,
      STEP_BACK_SELECTION: (e) => e === null || e.length === 0 ? null : (e.pop(), e)
    }
  }), { SET_SELECTION: df, STEP_BACK_SELECTION: Nz } = uE.actions;
  function fs() {
    return ls((e) => e.selected_path);
  }
  function cE() {
    const e = Dr();
    return _.useCallback(
      (n) => {
        e(df({ path: n }));
      },
      [e]
    );
  }
  const IP = uE.reducer;
  function fa(e, t) {
    if (e === t)
      return !0;
    if (e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }
  function TP(e, t, n = []) {
    if (e === t)
      return !0;
    const r = Object.keys(e).filter((o) => !n.includes(o)), i = Object.keys(t).filter((o) => !n.includes(o));
    if (!fa(r, i))
      return !1;
    for (let o of r)
      if (e[o] !== t[o])
        return !1;
    return !0;
  }
  function PP(e) {
    const t = fs(), n = cE(), r = _.useCallback(
      (o) => {
        o.stopPropagation(), n(e);
      },
      [e, n]
    ), i = Boolean(t && fa(t, e));
    return { onClick: r, isSelected: i };
  }
  function fE({
    node: e,
    path: t,
    canDrag: n
  }) {
    const r = sE({
      nodeInfo: { node: e, currentPath: t }
    }), { onClick: i, isSelected: o } = PP(t);
    return M({
      onClick: i,
      "data-sue-path": ff(t),
      "data-is-selected-node": o,
      "aria-label": e.uiName
    }, n ? r : {});
  }
  const sr = ({ path: e, node: t, canDrag: n = !0 }) => {
    const { uiName: r, uiArguments: i, uiChildren: o } = t, a = rn[r].UiComponent, l = fE({ path: e, node: t, canDrag: n });
    return /* @__PURE__ */ y(
      a,
      {
        wrapperProps: l,
        uiArguments: i,
        uiChildren: o != null ? o : [],
        path: e
      }
    );
  };
  function zi(e) {
    return e.length;
  }
  function dE(e, t, n) {
    return n === 0 ? !0 : fa(e.slice(0, n), t.slice(0, n));
  }
  function NP(e, t) {
    const n = zi(e), r = zi(t);
    return n >= r ? !1 : dE(e, t, n);
  }
  function tg(e, t) {
    const n = e.length, r = t.length;
    if (n !== r)
      return !1;
    const i = n - 1;
    return !!fa(
      e.slice(0, i),
      t.slice(0, i)
    );
  }
  function pE({
    fromPath: e,
    toPath: t
  }) {
    if (e == null)
      return !0;
    if (NP(e, t))
      return !1;
    if (tg(e, t)) {
      const n = e.length, r = e[n - 1], i = t[n - 1];
      if (r === i || r === i - 1)
        return !1;
    }
    return !0;
  }
  function DP({
    child: e,
    wrapper: t
  }) {
    if (typeof t == "function") {
      const n = t(e);
      n !== null && (t = n);
    }
    return H(M({}, t), {
      uiChildren: [e]
    });
  }
  function pf() {
    const e = Dr();
    return _.useCallback(
      (o) => {
        var a = o, {
          wrappingNode: n,
          node: r
        } = a, i = Le(a, [
          "wrappingNode",
          "node"
        ]);
        n && (r = DP({ child: r, wrapper: n })), e(xC(M({ node: r }, i)));
      },
      [e]
    );
  }
  function ng({
    getCanAcceptDrop: e = () => !0,
    onDrop: t,
    onDragOver: n,
    canAcceptDropClass: r = "can-accept-drop",
    hoveringOverClass: i = "hovering-over"
  }) {
    const o = _.useRef(null), a = kP(), l = lE(), {
      addCanAcceptDropHighlight: s,
      addHoveredOverHighlight: u,
      removeHoveredOverHighlight: c,
      removeAllHighlights: f
    } = RP({ watcherRef: o, canAcceptDropClass: r, hoveringOverClass: i }), d = a ? e(a) : !1, p = _.useCallback(
      (S) => {
        S.preventDefault(), S.stopPropagation(), u(), n == null || n();
      },
      [u, n]
    ), h = _.useCallback(
      (S) => {
        S.preventDefault(), c();
      },
      [c]
    ), m = _.useCallback(
      (S) => {
        if (S.stopPropagation(), c(), !a) {
          console.error("No dragged node in context but a drop was detected...");
          return;
        }
        d ? t(a) : console.error("Incompatable drag pairing"), l();
      },
      [
        d,
        a,
        t,
        c,
        l
      ]
    );
    return _.useEffect(() => {
      const S = o.current;
      if (S)
        return d && (s(), S.addEventListener("dragenter", p), S.addEventListener("dragleave", h), S.addEventListener("dragover", p), S.addEventListener("drop", m)), () => {
          f(), S.removeEventListener("dragenter", p), S.removeEventListener("dragleave", h), S.removeEventListener("dragover", p), S.removeEventListener("drop", m);
        };
    }, [
      s,
      d,
      h,
      p,
      m,
      f,
      o
    ]), o;
  }
  function RP({
    watcherRef: e,
    canAcceptDropClass: t,
    hoveringOverClass: n
  }) {
    const r = _.useCallback(() => {
      e.current && (e.current.classList.add(t), e.current.classList.add("can-accept-drop"));
    }, [t, e]), i = _.useCallback(() => {
      e.current && e.current.classList.add(n);
    }, [n, e]), o = _.useCallback(() => {
      e.current && e.current.classList.remove(n);
    }, [n, e]), a = _.useCallback(() => {
      e.current && (e.current.classList.remove(n), e.current.classList.remove(t), e.current.classList.remove("can-accept-drop"));
    }, [t, n, e]);
    return {
      addCanAcceptDropHighlight: r,
      addHoveredOverHighlight: i,
      removeHoveredOverHighlight: o,
      removeAllHighlights: a
    };
  }
  function si(l) {
    var s = l, {
      index: e,
      parentPath: t,
      dropHandlerArgs: n,
      className: r = "",
      wrappingNode: i,
      dropFilters: o
    } = s, a = Le(s, [
      "index",
      "parentPath",
      "dropHandlerArgs",
      "className",
      "wrappingNode",
      "dropFilters"
    ]);
    const u = pf(), c = ng(M({
      onDrop: (d) => {
        u(H(M({}, d), {
          path: nn(t, e),
          wrappingNode: i
        }));
      },
      getCanAcceptDrop: (d) => {
        const { node: p, currentPath: h } = d;
        return pE({
          fromPath: h,
          toPath: [...t, e]
        }) ? o ? "accepted" in o ? p.uiName in o.accepted : !(p.uiName in o.rejected) : !0 : !1;
      }
    }, n)), f = typeof r == "string" ? r : r(e);
    return /* @__PURE__ */ y("div", H(M({ ref: c, className: f }, a), { "data-index": e }));
  }
  const LP = "_container_1csjk_1", MP = "_muted_text_1csjk_7", FP = "_card_body_1csjk_13", BP = "_empty_msg_1csjk_26", UP = "_drop_watcher_1csjk_34", zP = "_missing_card_element_1csjk_44", jP = "_card_header_1csjk_62", WP = "_card_footer_1csjk_65", Jt = {
    container: LP,
    muted_text: MP,
    card_body: FP,
    empty_msg: BP,
    drop_watcher: UP,
    missing_card_element: zP,
    card_header: jP,
    card_footer: WP
  };
  function hE(n) {
    var r = n, {
      className: e
    } = r, t = Le(r, [
      "className"
    ]);
    return /* @__PURE__ */ y(
      "div",
      M({
        className: nt(e, "card-body", Jt.card_body)
      }, t)
    );
  }
  function mE(n) {
    var r = n, {
      className: e
    } = r, t = Le(r, [
      "className"
    ]);
    return /* @__PURE__ */ y(
      "div",
      M({
        className: nt(e, "card-footer", Jt.card_footer)
      }, t)
    );
  }
  function YP(n) {
    var r = n, {
      className: e
    } = r, t = Le(r, [
      "className"
    ]);
    return /* @__PURE__ */ y(
      "div",
      M({
        className: nt(e, "card-header", Jt.card_header)
      }, t)
    );
  }
  const VP = /* @__PURE__ */ new Set([
    "bslib::card_body",
    "bslib::card_header",
    "bslib::card_footer"
  ]), $P = {
    uiName: "bslib::card_header",
    uiArguments: {}
  }, HP = { uiName: "bslib::card_body", uiArguments: {} }, GP = {
    uiName: "bslib::card_footer",
    uiArguments: {}
  };
  function gE(e, t) {
    let n = null, r = null, i = null, o = 0;
    return e.forEach((a) => {
      const { uiName: l } = a;
      if (!VP.has(l)) {
        console.warn("Unknown child of a grid card seen. Ignoring", a);
        return;
      }
      const s = /* @__PURE__ */ y(
        sr,
        {
          node: a,
          path: nn(t, o),
          canDrag: !1
        }
      );
      o++, l === "bslib::card_header" ? n = s : l === "bslib::card_body" ? r = s : l === "bslib::card_footer" && (i = s);
    }), /* @__PURE__ */ L(Ge, { children: [
      n != null ? n : /* @__PURE__ */ y(YP, { className: Jt.missing_card_element, children: /* @__PURE__ */ y(
        si,
        {
          className: Jt.drop_watcher,
          index: o,
          parentPath: t,
          wrappingNode: $P
        }
      ) }),
      r != null ? r : /* @__PURE__ */ y(hE, { className: Jt.missing_card_element, children: /* @__PURE__ */ y(
        si,
        {
          className: Jt.drop_watcher,
          index: o,
          parentPath: t,
          wrappingNode: HP
        }
      ) }),
      i != null ? i : /* @__PURE__ */ y(mE, { className: Jt.missing_card_element, children: /* @__PURE__ */ y(
        si,
        {
          className: Jt.drop_watcher,
          index: o,
          parentPath: t,
          wrappingNode: GP
        }
      ) })
    ] });
  }
  const JP = ({
    uiArguments: e,
    uiChildren: t = [],
    path: n,
    wrapperProps: r
  }) => /* @__PURE__ */ y("div", H(M({ className: nt("card", Jt.container) }, r), { children: gE(t, n) })), QP = "_container_nezv9_1", KP = "_withTitle_nezv9_13", qP = "_panelTitle_nezv9_22", XP = "_contentHolder_nezv9_27", ZP = "_dropWatcher_nezv9_68", e4 = "_lastDropWatcher_nezv9_76", t4 = "_firstDropWatcher_nezv9_79", n4 = "_middleDropWatcher_nezv9_90", r4 = "_onlyDropWatcher_nezv9_94", i4 = "_hoveringOverSwap_nezv9_99", o4 = "_availableToSwap_nezv9_100", a4 = "_pulse_nezv9_1", l4 = "_emptyGridCard_nezv9_144", s4 = "_emptyMessage_nezv9_161", qt = {
    container: QP,
    withTitle: KP,
    panelTitle: qP,
    contentHolder: XP,
    dropWatcher: ZP,
    lastDropWatcher: e4,
    firstDropWatcher: t4,
    middleDropWatcher: n4,
    onlyDropWatcher: r4,
    hoveringOverSwap: i4,
    availableToSwap: o4,
    pulse: a4,
    emptyGridCard: l4,
    emptyMessage: s4
  };
  function ic({
    index: e,
    numChildren: t,
    parentPath: n
  }) {
    const r = c4({
      positionInChildren: e,
      parentPath: n
    }), i = u4(e, t);
    return /* @__PURE__ */ y(
      si,
      {
        className: nt(qt.dropWatcher, i),
        index: e,
        parentPath: n,
        dropHandlerArgs: r
      }
    );
  }
  function u4(e, t) {
    return e === 0 && t === 0 ? qt.onlyDropWatcher : e === 0 ? qt.firstDropWatcher : e === t ? qt.lastDropWatcher : qt.middleDropWatcher;
  }
  function c4({
    positionInChildren: e,
    parentPath: t
  }) {
    const n = pf(), r = _.useCallback(
      ({ node: o, currentPath: a }) => $y(o) !== null && pE({
        fromPath: a,
        toPath: [...t, e]
      }),
      [e, t]
    ), i = _.useCallback(
      ({ node: o, currentPath: a }) => {
        const l = $y(o);
        if (!l)
          throw new Error("No node to place...");
        n({
          node: l,
          currentPath: a,
          path: nn(t, e)
        });
      },
      [e, t, n]
    );
    return {
      getCanAcceptDrop: r,
      onDrop: i
    };
  }
  function $y(e) {
    var n;
    const t = e.uiName;
    return t === "gridlayout::grid_card" && ((n = e.uiChildren) == null ? void 0 : n.length) === 1 ? e.uiChildren[0] : t.includes("gridlayout::grid_card") ? null : e;
  }
  const f4 = {
    title: "Card Body",
    UiComponent: d4,
    settingsInfo: {
      title: {
        label: "Name of node",
        inputType: "string",
        defaultValue: "NODE NAME"
      }
    },
    acceptsChildren: !0,
    category: "Cards",
    description: "body holder for bslib cards"
  };
  function d4({
    uiArguments: e,
    uiChildren: t = [],
    path: n,
    wrapperProps: r
  }) {
    const i = t.length;
    return /* @__PURE__ */ L(hE, H(M({}, r), { children: [
      /* @__PURE__ */ y(
        ic,
        {
          index: 0,
          parentPath: n,
          numChildren: i
        }
      ),
      i > 0 ? t == null ? void 0 : t.map((o, a) => /* @__PURE__ */ L(_.Fragment, { children: [
        /* @__PURE__ */ y(sr, { path: nn(n, a), node: o }),
        /* @__PURE__ */ y(
          ic,
          {
            index: a + 1,
            numChildren: t.length,
            parentPath: n
          }
        )
      ] }, n.join(".") + a)) : /* @__PURE__ */ y("div", { className: Jt.empty_msg })
    ] }));
  }
  function vE({
    dropPanelClass: e = Jt.drop_watcher,
    uiChildren: t = [],
    path: n,
    showOnEmpty: r
  }) {
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(si, { className: e, index: 0, parentPath: n, children: t.length === 0 ? r : null }),
      t.map((i, o) => /* @__PURE__ */ L(_.Fragment, { children: [
        /* @__PURE__ */ y(sr, { path: nn(n, o), node: i }),
        /* @__PURE__ */ y(
          si,
          {
            className: e,
            index: o + 1,
            parentPath: n
          }
        )
      ] }, n.join(".") + o))
    ] });
  }
  const p4 = {
    title: "Card Footer",
    UiComponent: h4,
    settingsInfo: {
      title: {
        label: "Name of node",
        inputType: "string",
        defaultValue: "NODE NAME"
      }
    },
    acceptsChildren: !0,
    category: "Cards",
    description: "Header for bslib cards"
  };
  function h4({
    uiArguments: e,
    uiChildren: t = [],
    path: n,
    wrapperProps: r
  }) {
    return /* @__PURE__ */ y(mE, H(M({}, r), { children: /* @__PURE__ */ y(vE, { uiChildren: t, path: n }) }));
  }
  const m4 = (e) => {
    const { uiArguments: t, uiChildren: n, path: r, wrapperProps: i } = e;
    return /* @__PURE__ */ y(
      "div",
      H(M({
        className: nt(Jt.card_header, "card-header")
      }, i), {
        children: /* @__PURE__ */ y(vE, { uiChildren: n, path: r })
      })
    );
  }, g4 = {
    title: "Card Header",
    UiComponent: m4,
    settingsInfo: {},
    acceptsChildren: !0,
    category: "Cards",
    description: "Header for bslib cards"
  }, v4 = {
    title: "Card",
    UiComponent: JP,
    settingsInfo: {},
    acceptsChildren: !0,
    iconSrc: eg,
    category: "Containers",
    description: "Bootstrap card with smart fill behavior"
  }, y4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEA0lEQVR4nO3du24cZRyG8ceIQ0FKuINtEBEHK1IqXwEIylUiKmwp0KO5iK3ScZATGoQ1JQi4ATehiAMSEc223EGIFFMsxcyCZaEVG++7M//V82vGa49X32c9+400I8/sLRYLpE17YegBaDcZliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliJeHHoA62ra+eVv7QO3gAPgTeDatse0YU+Ax8ApcAKcXfzhbDoZYkxrq75iHQMPgc+Am9SPCro53KSb00PguEpMF5VbsS74DvgAOAe+oPt0/zabTp78n1/uV77lk9b3AuP7573XCaNp59eA63Sr8CfAYdPOXwc+3PgIg6qGdUwX1R/A+7Pp5Jdhh7M5/QfjAfCgaedfAz/QzfUecDjk2NZR8VD4Lt0f+Jwdi+qyfm7vAc+Aj+nmXkLFsG732y93Oaql2XTyK/BV//L2qn3HpGJYB/3220FHsV3LuR6s3GtEKoa132/PVu61Wx71Ww+FQS8BzKaT86EHsi2z6eRZ/+XLgw5kDRXDUgGGpQjDUkTVE6T/dc1wtCqNdVPKhsW/l0zG9l7bfO/R8lCoiMor1iYuHG/lIvSG368EVyxFGJYiDEsRhqUIw1KEYSnCsBRhWIqofILUSzoj5oqliMorlpd0RswVSxGGpQjDUoRhKcKwFGFYijAsRRiWIiqfIPWSzoi5Yimi8orlJZ0RKxvWVW/4us3/Tt7EzWmr/Te1h0JFGJYiDEsRFcP6C6Bp52XubndV/b3foXtqRQkVw1ree3R/5V675Xq/fTzoKNZQMazTfntr0FFs13Kupyv3GpGKYZ302ztNO3970JFsQdPO3wLu9C9PVu07JhXDOgPuA68APzbt/J1hh5PTf3B+opvrfQrdgrzqCdJD4DW6Z8z83LTzz4FvgN9n08mfg47sipp2/irwBvAR8CndLbi/p9BzdAD2FotSVwoun4E+ptgf/Dncm00nR8t5V3nEXMVD4UVHwA3gLt2z/Z4OOprNeEo3l7vAjdl0cjTscJ5PuRVLNVRfsTRShqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYi/gbCBJi6eIkmgAAAAABJRU5ErkJggg==", oc = (e, t) => Array.from({ length: e }, (n, r) => r), ac = (e, t) => {
    const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
    return Array.from({ length: n }, (i, o) => e + o * r);
  };
  function Hy(e) {
    let t = 1 / 0, n = -1 / 0;
    for (let o of e)
      o < t && (t = o), o > n && (n = o);
    const r = n - t, i = Array.isArray(e) ? e.length : e.size;
    return { minVal: t, maxVal: n, span: r, isSequence: r === i - 1 };
  }
  function Yl(e, t) {
    return [...new Array(t)].fill(e);
  }
  function w4(e, t) {
    return e.filter((n) => !t.includes(n));
  }
  function fh(e, t) {
    return [...e.slice(0, t), ...e.slice(t + 1)];
  }
  function Xo(e, t, n) {
    if (t < 0)
      throw new Error("Can't add item at a negative index");
    const r = [...e];
    return t > r.length - 1 && (r.length = t), r.splice(t, 0, n), r;
  }
  function b4(e, t, n) {
    if (n < 0)
      throw new Error("Can't add item at a negative index");
    if (t < 0 || t > e.length)
      throw new Error("Requested to move an element that is not in array");
    let r = [...e];
    const i = r[t];
    return r[t] = void 0, r = Xo(r, n, i), r.filter((o) => typeof o != "undefined");
  }
  function S4(e, t = ", ", n = " and ") {
    const r = e.length;
    if (r === 1)
      return e[0];
    const i = e[r - 1];
    return [...e].splice(0, r - 1).join(t) + n + i;
  }
  function E4(e) {
    return [...new Set(e)];
  }
  function ul(e) {
    return Array.isArray(e) ? e : [e];
  }
  const hf = ({
    type: e,
    name: t,
    className: n
  }) => /* @__PURE__ */ L("code", { className: n, children: [
    /* @__PURE__ */ L("span", { style: { opacity: 0.55 }, children: [
      e,
      "$"
    ] }),
    /* @__PURE__ */ y("span", { children: t })
  ] }), A4 = 4, C4 = 25, x4 = oc(C4).map((e) => /* @__PURE__ */ y("div", { className: "faux-row", children: oc(A4).map((t) => /* @__PURE__ */ y("div", { className: "faux-cell", children: "i" }, t)) }, e)), k4 = ({
    uiArguments: e,
    path: t,
    wrapperProps: n
  }) => /* @__PURE__ */ y("div", H(M({ className: "dtDTOutput" }, n), { children: /* @__PURE__ */ L(
    "div",
    {
      className: "faux-table",
      style: {
        "--table-w": e.width,
        "--table-h": e.height
      },
      children: [
        /* @__PURE__ */ L("div", { className: "faux-header", children: [
          "Table: ",
          /* @__PURE__ */ y(hf, { type: "output", name: e.outputId })
        ] }),
        /* @__PURE__ */ y("div", { className: "faux-table-body", children: x4 })
      ]
    }
  ) })), _4 = {
    title: "DT Table",
    UiComponent: k4,
    settingsInfo: {
      outputId: {
        inputType: "string",
        label: "Output ID",
        defaultValue: "myTable"
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"],
        optional: !0,
        useDefaultIfOptional: !0
      },
      height: {
        label: "Height",
        inputType: "cssMeasure",
        defaultValue: "auto",
        optional: !0
      }
    },
    serverBindings: {
      outputs: {
        outputIdKey: "outputId",
        renderScaffold: `renderDT({
  iris
})`
      }
    },
    acceptsChildren: !0,
    iconSrc: y4,
    category: "Outputs",
    description: "`DataTable` table output"
  }, O4 = [
    "gridlayout::grid_card_text",
    "gridlayout::grid_card",
    "gridlayout::grid_card_panel",
    "gridlayout::grid_card_plot"
  ];
  function dh(e) {
    return O4.includes(e.uiName);
  }
  const yE = _.createContext(null);
  function I4() {
    return _.useContext(yE);
  }
  function mf({
    path: e,
    area: t
  }) {
    const n = I4(), r = _.useCallback(
      ({ node: o, currentPath: a }) => a === void 0 || !dh(o) ? !1 : tg(a, e),
      [e]
    ), i = _.useCallback(
      (o) => {
        var l;
        if (!("area" in o.node.uiArguments)) {
          console.error("Invalid grid area swap drop", { dropInfo: o });
          return;
        }
        const a = (l = o.node.uiArguments.area) != null ? l : "__BAD_DROP__";
        n == null || n({ type: "SWAP_ITEMS", item_a: t, item_b: a });
      },
      [t, n]
    );
    return ng({
      getCanAcceptDrop: r,
      onDrop: i,
      canAcceptDropClass: qt.availableToSwap,
      hoveringOverClass: qt.hoveringOverSwap
    });
  }
  const T4 = "_container_1a2os_1", P4 = "_withTitle_1a2os_13", N4 = "_panelTitle_1a2os_22", D4 = "_contentHolder_1a2os_27", R4 = "_dropWatcher_1a2os_68", L4 = "_lastDropWatcher_1a2os_76", M4 = "_firstDropWatcher_1a2os_79", F4 = "_middleDropWatcher_1a2os_90", B4 = "_onlyDropWatcher_1a2os_94", U4 = "_hoveringOverSwap_1a2os_99", z4 = "_availableToSwap_1a2os_100", j4 = "_pulse_1a2os_1", W4 = "_emptyGridCard_1a2os_144", Y4 = "_emptyMessage_1a2os_161", V4 = {
    container: T4,
    withTitle: P4,
    panelTitle: N4,
    contentHolder: D4,
    dropWatcher: R4,
    lastDropWatcher: L4,
    firstDropWatcher: M4,
    middleDropWatcher: F4,
    onlyDropWatcher: B4,
    hoveringOverSwap: U4,
    availableToSwap: z4,
    pulse: j4,
    emptyGridCard: W4,
    emptyMessage: Y4
  }, $4 = (e) => {
    const l = e, {
      uiArguments: s
    } = l, u = s, { area: t } = u, n = Le(u, ["area"]), {
      uiChildren: r = [],
      path: i,
      wrapperProps: o
    } = l, a = mf({ area: t, path: i });
    return /* @__PURE__ */ y(
      "div",
      H(M({
        ref: a,
        style: { gridArea: t },
        className: nt("card", V4.container)
      }, o), {
        children: gE(r, i)
      })
    );
  }, H4 = {
    title: "Grid Card Panel",
    UiComponent: $4,
    settingsInfo: {
      area: {
        label: "Name of grid area",
        inputType: "string",
        defaultValue: "default-area"
      }
    },
    acceptsChildren: !0,
    iconSrc: eg,
    category: "gridlayout",
    description: "bslib styled card for grid layouts"
  }, G4 = "_deleteButton_1en02_1", J4 = {
    deleteButton: G4
  };
  function wE({
    path: e,
    justIcon: t = !1,
    label: n = "Delete Node"
  }) {
    const r = IC(e);
    return /* @__PURE__ */ L(
      ht,
      {
        className: J4.deleteButton,
        onClick: (i) => {
          i.stopPropagation(), r();
        },
        "aria-label": n,
        title: n,
        variant: t ? "icon" : "delete",
        type: "button",
        children: [
          /* @__PURE__ */ y(Kc, {}),
          t ? null : "Delete Element"
        ]
      }
    );
  }
  const rg = _.forwardRef(
    (i, r) => {
      var o = i, { className: e = "", children: t } = o, n = Le(o, ["className", "children"]);
      const a = e + " card";
      return /* @__PURE__ */ y("div", H(M({ ref: r, className: a }, n), { children: t }));
    }
  ), Q4 = _.forwardRef(
    (r, n) => {
      var i = r, { className: e = "" } = i, t = Le(i, ["className"]);
      const o = e + " card-header";
      return /* @__PURE__ */ y("div", M({ ref: n, className: o }, t));
    }
  ), K4 = ({
    uiArguments: { area: e, item_gap: t, title: n },
    uiChildren: r,
    path: i,
    wrapperProps: o
  }) => {
    var s;
    const a = (s = r == null ? void 0 : r.length) != null ? s : 0, l = mf({ area: e, path: i });
    return /* @__PURE__ */ L(
      rg,
      H(M({
        className: nt(
          qt.container,
          n ? qt.withTitle : null
        ),
        ref: l,
        style: {
          gridArea: e,
          "--item-gap": t
        }
      }, o), {
        children: [
          n ? /* @__PURE__ */ y(Q4, { className: qt.panelTitle, children: n }) : null,
          /* @__PURE__ */ L("div", { className: qt.contentHolder, "data-alignment": "top", children: [
            /* @__PURE__ */ y(
              ic,
              {
                index: 0,
                parentPath: i,
                numChildren: a
              }
            ),
            a > 0 ? r == null ? void 0 : r.map((u, c) => /* @__PURE__ */ L(_.Fragment, { children: [
              /* @__PURE__ */ y(sr, { path: nn(i, c), node: u }),
              /* @__PURE__ */ y(
                ic,
                {
                  index: c + 1,
                  numChildren: r.length,
                  parentPath: i
                }
              )
            ] }, i.join(".") + c)) : /* @__PURE__ */ y(q4, { path: i })
          ] })
        ]
      })
    );
  };
  function q4({ path: e }) {
    return /* @__PURE__ */ L("div", { className: qt.emptyGridCard, children: [
      /* @__PURE__ */ y("span", { className: qt.emptyMessage, children: "Empty grid card" }),
      /* @__PURE__ */ y(
        wE,
        {
          path: e,
          justIcon: !0,
          label: "Delete empty grid card"
        }
      )
    ] });
  }
  const X4 = {
    title: "Grid Card",
    UiComponent: K4,
    settingsInfo: {
      area: {
        label: "Name of grid area",
        inputType: "string",
        defaultValue: "default-area"
      },
      title: {
        inputType: "string",
        label: "Panel title",
        defaultValue: "My Card",
        optional: !0
      },
      item_gap: {
        inputType: "cssMeasure",
        label: "Gap size between contents",
        defaultValue: "10px",
        units: ["px", "rem"],
        optional: !0
      }
    },
    acceptsChildren: !0,
    iconSrc: eg,
    category: "gridlayout",
    description: "The standard element for placing elements on the grid in a simple card container."
  }, ig = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAACYElEQVR4nO3cMYoUQQBA0RqRPYBn8E5GhqYbLiZeYDNzs428k1dwU8M2UGFZFmYUf/d013vRTEFDBZ+qomj6tCzLgP/t1dYT4JiERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEXi9dYT+Fd3X78tz4ZOm0xkJffv3m49hb9ixSIhrPNuxhifxxjfxxiPv3/fbDqjHdjtVrii+zHG7ZP/t2OMH2OMj9tMZx+sWOe9f2Hsw+qz2BlhnffmwjGeEBYJYZEQFglhkRAWCWF1pr5YdUHamfpi1YrVmfpiVVidqS9WZwpr6jPP2mY6Y0195lnbTCvW1Geetc0U1tRnnrXNFBYrEhYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWiZnCerxwbOvnDmGmsB5eGPtyhc8dwkwv+t2NXx9n+/Ne1sMY49MVPncIp2V5/mG8ffBFv+s201bIioRF4khnrH3u6Zfb1VZvxSIhLBLCIrHb6waumxWLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi8RPaOk2ptnQzzIAAAAASUVORK5CYII=";
  function Z4(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z" } }] })(e);
  }
  const e3 = "_container_1rlbk_1", t3 = "_plotPlaceholder_1rlbk_5", n3 = "_label_1rlbk_19", ph = {
    container: e3,
    plotPlaceholder: t3,
    label: n3
  };
  function bE({ outputId: e }) {
    const t = K.useRef(null), n = r3(t), r = n === null ? 100 : Math.min(n.width, n.height);
    return /* @__PURE__ */ L(
      "div",
      {
        ref: t,
        className: ph.plotPlaceholder,
        "aria-label": "shiny::plotOutput placeholder",
        children: [
          /* @__PURE__ */ y(
            hf,
            {
              className: ph.label,
              type: "output",
              name: e
            }
          ),
          /* @__PURE__ */ y(
            Z4,
            {
              size: `calc(${r}px - 80px)`
            }
          )
        ]
      }
    );
  }
  function r3(e) {
    const [t, n] = K.useState(null);
    return K.useEffect(() => {
      if (typeof ResizeObserver == "undefined")
        return;
      const r = new ResizeObserver((i) => {
        if (!e.current)
          return;
        const { offsetHeight: o, offsetWidth: a } = e.current;
        n({ width: a, height: o });
      });
      return e.current && r.observe(e.current), () => r.disconnect();
    }, [e]), t;
  }
  const i3 = "_gridCardPlot_1a94v_1", o3 = {
    gridCardPlot: i3
  }, a3 = ({
    uiArguments: { outputId: e, area: t },
    path: n,
    wrapperProps: r
  }) => {
    const i = mf({ area: t, path: n });
    return /* @__PURE__ */ y(
      rg,
      H(M({
        ref: i,
        style: { gridArea: t },
        className: nt(o3.gridCardPlot, "gridlayout-gridCardPlot")
      }, r), {
        children: /* @__PURE__ */ y(bE, { outputId: e != null ? e : t })
      })
    );
  }, l3 = {
    title: "Grid Plot Card",
    UiComponent: a3,
    settingsInfo: {
      area: {
        label: "Name of grid area",
        inputType: "string",
        defaultValue: "default-area"
      },
      outputId: {
        label: "Output ID",
        inputType: "string",
        defaultValue: (e) => e && "area" in e.uiArguments ? e.uiArguments.area : "MyPlot",
        optional: !0
      }
    },
    // If the outputId is undefined we use the area as our id but otherwise we use the standard
    serverBindings: {
      outputs: {
        outputIdKey: (e) => e.outputId ? "outputId" : "area",
        renderScaffold: `renderPlot({
  #Plot code goes here
  $0plot(rnorm(100))
})`
      }
    },
    acceptsChildren: !1,
    iconSrc: ig,
    category: "gridlayout",
    description: "A wrapper for `shiny::plotOutput()` that uses `gridlayout`-friendly sizing defaults. \n    For when you want to have a grid area filled entirely with a single plot."
  }, s3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFn0lEQVR4nO3b4VHjRgCG4c+ZNMCV4BtVwJVgSjiiCqACJZRgogqgAuUoAZcAFShHC5RAfnh9rBdJFsaf8TrvM5MZzvZJTvxmtVovk5eXFwG79ttnvwEcJ8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcHi989+A2NMJpNRr6uadibpPnn4rC6LxXvP2XGsy7osbt97HJeXl5fPfguDjm3E+j7yMZgdTVhV056oO6KL8Bz26GjC0jKqvoAu9vlGcHxhrdxJiudVhLVnRxFW1bRTSbPoobvwz8o0TMaxJ0cRltZHq+e6LFZhPUePM2rt0bGEFUdzJ0l1WTxrfdT6ziR+f7JYxxoSLnHT6KG75Oc4ugtJ1zs4519ajpKn0cMLSYu6LN59/HC8U729q936mJ9tcugLbdLwAmnVtDd6jeepLouvyfM/9Rrem+cHjvtmgVTSk6QbrYecepZ0PmZRtmrai3C8Mc7DJV4SC6RWHWtXdx0vi1fLPzKJP9UytKGopOWSx33VtIMLs+F/iLFRSdKPMLJlIeuwtByp4nlTV1jpY9tO4uO/dyvpW10Wk7osJpK+dZznJtytvlE17bzjfVxL+hod84ukq+Q181zubrO+FFZN+6DXec5jXRbfel53r/XliC9hct+r53vHwctcCCYeVW7rsrjccNxnLb/PfOw55qmkh+ihRV0WZ4f+uWU7YoX/4PHkuWu06ntum1FrFUDv3Kkuiyst52G/ztNxJ5qe+7IvqnDMR63fcMz6RsJDkm1YensHtSmsj65pXQ8FEEl3QPwaKTvmhIt4Qj4gPe9p56sOSM7LDXEci7osnvpeWJfFc9W08dLDtGra7yM/1JXBS2f8XpI/n+o1+nR+NGo7T3ifa/OBv//gUrhz4Y5r06Q9lb7Gsp2mY1Sb9vwsvR2JjkauI1YaxU24fX/XMaqmnQ6NdB/wpNeIhlb7Hec+CNmNWAP7rrax702A/5uvlLILS7v9Mtn1xXRfQGPnadnL8VK4tpNBy0XF0R9Ysqa1zSR+jDisocvddMPz2cpqxOpau3pPVKu/k/x5p6NWeI+xp56fpQyWDbaV24j1nrWrPneS5nodVWY7nsQPLSmkywszjdhtEe6Cf0QPnWu7f/e9yWrE0vro8rzNr3V17NOSxk3iN068w41F/B6f4uWHjnPPNn1ZHaQj28EvU2QTVsfa1Ud+xy8Na8yugfmI3QXplpqu0Sh93zcdl89fwnPxeQcXgw9FNmHp7Vxo60tBGOniD+dk5Mgxr5r2IQ2satpZuCmIj/HY9Quu4dxxcCeSHqqmncffAVZNexK+1H5IDpHFpr8sdjf8+c+/U0k/o4d6dzKMFeKYRw8t6rI4i57v2t0w1pOW22p6byySDYpjXa12kx7655bLiLWLSXsqPcamXQNjz7nQhqgkKWynuRx6TeI8py3KuYS1s8vgSpinpJP/oRFkETbgXfWc/1rLbTVnY5dA6rK43XDMhZaj1MSw1maVxaUQ+cllxEJmCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCgsV/EcmMRmtHHXoAAAAASUVORK5CYII=", u3 = "_textPanel_525i2_1", c3 = {
    textPanel: u3
  }, f3 = ({
    uiArguments: { content: e, area: t, alignment: n },
    path: r,
    wrapperProps: i
  }) => {
    const o = mf({ area: t, path: r });
    return /* @__PURE__ */ y(
      rg,
      H(M({
        ref: o,
        className: nt(c3.textPanel, "gridlayout-textPanel"),
        style: { gridArea: t, justifyItems: n }
      }, i), {
        children: /* @__PURE__ */ y("h1", { children: e })
      })
    );
  }, d3 = {
    title: "Grid Text Card",
    UiComponent: f3,
    settingsInfo: {
      content: {
        label: "Panel text",
        inputType: "string",
        defaultValue: "Text for card"
      },
      alignment: {
        label: "Text alignment",
        inputType: "radio",
        defaultValue: "start",
        choices: {
          start: { icon: OS, label: "left" },
          center: { icon: th, label: "center" },
          end: { icon: IS, label: "right" }
        }
      },
      area: {
        label: "Name of grid area",
        inputType: "string",
        defaultValue: "default-area"
      },
      is_title: {
        label: "Use text as website title",
        inputType: "boolean",
        defaultValue: !1,
        optional: !0
      }
    },
    acceptsChildren: !1,
    iconSrc: s3,
    category: "gridlayout",
    description: "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics."
  }, SE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEVklEQVR4nO3cwYpcRRiG4XeMjouYGzAuXGThyohG1GvQxQQSJVfgRhkUnOANCCYLh6ALvQBBQkxE9BqiKEZ3wixcZO4gm4xIu6geaE+PDMp8VZU67wNncc5ppqqrP7r++Q/0xmKxQDppj7WegMZksBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBTxeK2Bdr7aO+ryJrC1PF4Dnl5e25i8bvqTON5fv/8AuA/8AtwGvgEOJq/j2lvnppciqgXrCBeBa0Cddzq+p4DnlscVYA+4CnzdYjIttsJTwMeUN2yocs4Btyhrfar24C2+sT4CdhqMO1eHa3215qC1v7EusR6qA+AGpcY6w3r9wPLa6uH99ftnKGt4g/Xaaoey9tXUDNYm8Mnk2j7wCrAN3KUUoPp/HlDWcJuypvuT+7uUz6CKmsG6DDyzcn4AvAHcqziHubgHvA48XLl2Fniz1gRqBmtrcv45hirpV+CLybWtWoPXDNbLk/MvT/BvLyaHiukaX6g1cM3/Cp+dnFfb72fsLkcX+3EtH+msdYU1Dp8VKqLlI52T1OTrXv+uZrCOe5CqjCbr7laoCIOliFFqLLfZztQMlh92G7PrY2lgBksRo9RYbrOdsY81PvtYGofBUsQoNZbbbGfsY43PPpbGYbAUMUqN5TbbGftY47OPpXEYLEWMUmO5zXbGPtb47GNpHAZLEaPUWG6znbGPNT77WBqHwVLEKDVWD7+z3sv9LkoM+1jjs4+lcRgsRYxSYx33dT/3+9XZxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIUWqsnrbZnubSjH2s8dnH0jgMliJGqbF62mZ7mksz9rHGZx9L4zBYihilxuppm+1pLs3YxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIlsHabDi2wmoG63dKYXt4vHiCf3tjcrTU01xe5Z9r/ketgWsG67fJ+ZWKY8/VdI1/qjVwzWDdmZy/DZyvOP7cPE9Z41V3ag1eM1g3gfsr508C3wEvVJzDXJwHvqes8aF9ymdQRc1gHQDvT66dBX4AdoELwOmK8xnNacoa7gI/UtZ21XvAw1qTqd15vwlcBz5YubYJbC+PQz3/Yt6jcH/qOhW/raBNu+FD4NMG487VZ5Q1r6pFsP4C3gUuAXsNxp+LPeAy8A5lzatq+RD6FvAt5c1fBF6i1AVPNJzTo+xPSoH+M3CbsvUdtJrMxmJx3PYs/Xc+K1SEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVLE32A0lLomuWLgAAAAAElFTkSuQmCC";
  var gf = Ga;
  function Ga(e) {
    let t = e;
    var n = {}.toString.call(e).slice(8, -1);
    if (n == "Set")
      return new Set([...e].map((i) => Ga(i)));
    if (n == "Map")
      return new Map([...e].map((i) => [Ga(i[0]), Ga(i[1])]));
    if (n == "Date")
      return new Date(e.getTime());
    if (n == "RegExp")
      return RegExp(e.source, p3(e));
    if (n == "Array" || n == "Object") {
      t = Array.isArray(e) ? [] : {};
      for (var r in e)
        t[r] = Ga(e[r]);
    }
    return t;
  }
  function p3(e) {
    if (typeof e.source.flags == "string")
      return e.source.flags;
    var t = [];
    return e.global && t.push("g"), e.ignoreCase && t.push("i"), e.multiline && t.push("m"), e.sticky && t.push("y"), e.unicode && t.push("u"), t.join("");
  }
  function da(e) {
    const t = e.length, n = e[0].length;
    for (let r of e)
      if (r.length !== n)
        throw new Error("Inconsistant number of columns in matrix");
    return { numRows: t, numCols: n };
  }
  function h3(e, { index: t, arr: n, dir: r }) {
    const i = gf(e);
    switch (r) {
      case "rows":
        return Xo(i, t, n);
      case "cols":
        return i.map(
          (o, a) => Xo(o, t, n[a])
        );
    }
  }
  function m3(e, { index: t, dir: n }) {
    const r = gf(e);
    switch (n) {
      case "rows":
        return fh(r, t);
      case "cols":
        return r.map((i, o) => fh(i, t));
    }
  }
  const jn = ".";
  function og(e) {
    const t = /* @__PURE__ */ new Map();
    return g3(e).forEach(({ itemRows: n, itemCols: r }, i) => {
      if (i === jn)
        return;
      const o = Hy(n), a = Hy(r);
      t.set(i, {
        colStart: a.minVal,
        rowStart: o.minVal,
        colSpan: a.span + 1,
        rowSpan: o.span + 1,
        isValid: o.isSequence && a.isSequence
      });
    }), t;
  }
  function g3(e) {
    var i;
    const t = /* @__PURE__ */ new Map(), { numRows: n, numCols: r } = da(e);
    for (let o = 0; o < n; o++)
      for (let a = 0; a < r; a++) {
        const l = e[o][a], s = (i = t.get(l)) != null ? i : {
          itemRows: /* @__PURE__ */ new Set(),
          itemCols: /* @__PURE__ */ new Set()
        };
        s.itemRows.add(o + 1), s.itemCols.add(a + 1), t.set(l, s);
      }
    return t;
  }
  function v3(e, r) {
    var i = r, { name: t } = i, n = Le(i, ["name"]);
    const { rowStart: o, colStart: a } = n, l = "rowEnd" in n ? n.rowEnd : o + n.rowSpan - 1, s = "colEnd" in n ? n.colEnd : a + n.colSpan - 1, u = gf(e.areas);
    for (let c = 0; c < u.length; c++) {
      const f = c >= o - 1 && c < l;
      for (let d = 0; d < u[0].length; d++) {
        const p = u[c][d], h = p === t;
        if (!(f && d >= a - 1 && d < s)) {
          h && (u[c][d] = jn);
          continue;
        }
        if (p !== jn && !h)
          throw new Error(
            `Can't add ${t} to layout, overlaps with item ${u[c][d]}.`
          );
        u[c][d] = t;
      }
    }
    return H(M({}, e), { areas: u });
  }
  function hh(e, t) {
    switch (t) {
      case "rows":
        return {
          itemStart: e.rowStart,
          itemEnd: e.rowStart + e.rowSpan - 1
        };
      case "cols":
        return {
          itemStart: e.colStart,
          itemEnd: e.colStart + e.colSpan - 1
        };
    }
  }
  function y3({
    areas: e,
    row_sizes: t = ["1fr"],
    col_sizes: n = ["1fr"]
  }) {
    const { numRows: r, numCols: i } = da(e);
    return {
      rows: Gy(r, t, "row"),
      cols: Gy(i, n, "column")
    };
  }
  function Gy(e, t, n) {
    if (!Array.isArray(t))
      return Yl(t, e);
    if (e !== t.length)
      throw new Error(
        `Number of ${n} sizes does not match the number of ${n}s in the areas template. 
    Either make sure they match or use a single ${n} size that will be repeated for all ${n}s.`
      );
    return t;
  }
  function EE(e, { afterIndex: t, size: n, dir: r }) {
    return wi(e, (i) => {
      const o = r === "rows" ? "cols" : "rows", a = y3(i);
      if (t > a[r].length)
        throw new Error(
          `Can't add a tract after index ${t}. Not enought tracts.`
        );
      if (t < 0)
        throw new Error("Cant add a tract at a negative index");
      const l = og(i.areas);
      let s = Yl(jn, a[o].length);
      l.forEach((u, c) => {
        const { itemStart: f, itemEnd: d } = hh(u, r);
        if (f <= t && d > t) {
          const h = hh(u, o);
          for (let m = h.itemStart - 1; m < h.itemEnd; m++)
            s[m] = c;
        }
      }), i.areas = h3(i.areas, {
        dir: r,
        index: t,
        arr: s
      }), i[r === "rows" ? "row_sizes" : "col_sizes"] = Xo(
        a[r],
        t,
        n
      );
    });
  }
  function w3({ areas: e }, t) {
    const { numRows: n, numCols: r } = da(e);
    for (let i = 0; i < n; i++)
      for (let o = 0; o < r; o++)
        e[i][o] === t && (e[i][o] = jn);
  }
  function AE(e, t) {
    let n = Array.isArray(t) ? t : [t];
    return wi(e, (r) => {
      for (let i of n)
        w3(r, i);
    });
  }
  function b3(e, t) {
    return AE(e, t);
  }
  function CE(e, t, n = !1) {
    const { dir: r, index: i } = t, o = t.index - 1;
    if (!n) {
      const s = xE(e.areas, t);
      if (s.length !== 0)
        throw new Error(
          `Can't remove ${r === "rows" ? "row" : "col"} ${i} as items ${S4(
            s
          )} are entirely contained within it.`
        );
    }
    const a = {
      areas: m3(e.areas, { index: o, dir: r })
    }, l = r === "rows" ? "row_sizes" : "col_sizes";
    return S3(e[l]) && (a[l] = fh(
      e[l],
      o
    )), M(M({}, e), a);
  }
  function xE(e, t) {
    const n = og(e);
    return E3(n, t);
  }
  function S3(e) {
    return Array.isArray(e) && e.length > 1;
  }
  function E3(e, { index: t, dir: n }) {
    let r = [];
    return e.forEach((i, o) => {
      const a = hh(i, n);
      if (!a)
        return;
      const { itemStart: l, itemEnd: s } = a;
      l === t && l === s && r.push(o);
    }), r;
  }
  function A3(e, t, n) {
    return wi(e, ({ areas: r }) => {
      const { numRows: i, numCols: o } = da(r);
      for (let a = 0; a < i; a++)
        for (let l = 0; l < o; l++)
          r[a][l] === t && (r[a][l] = n);
    });
  }
  function C3(e, { index: t, dir: n }, r) {
    return wi(e, (i) => {
      const o = n === "rows" ? "row_sizes" : "col_sizes";
      i[o][t - 1] = r;
    });
  }
  function x3(e, { item_a: t, item_b: n }) {
    return t === n ? e : wi(e, (r) => {
      const { n_rows: i, n_cols: o } = k3(r.areas);
      let a = !1, l = !1;
      for (let s = 0; s < i; s++) {
        const u = r.areas[s];
        for (let c = 0; c < o; c++) {
          const f = u[c];
          f === t ? (u[c] = n, a = !0) : f === n && (u[c] = t, l = !0);
        }
      }
      if (!a || !l)
        throw new Error(
          "Attempted an invalid swap. " + (a ? "" : `Item "${t}" is not in layout.`) + (l ? "" : `Item "${n}" is not in layout.`)
        );
    });
  }
  function k3(e) {
    const t = e.length, n = e[0].length;
    return { n_rows: t, n_cols: n };
  }
  function _3({
    layout: e,
    row_sizes: t,
    col_sizes: n,
    gap_size: r
  }) {
    let i = -1;
    const o = e.length, a = /* @__PURE__ */ new Set(), l = [];
    for (let s of e) {
      const u = s.trim().split(/\s+/);
      l.push(u), u.forEach((f) => {
        f !== jn && a.add(f);
      });
      const c = u.length;
      if (i === -1 && (i = c), i !== c)
        throw new Error(
          "Invalid layout definition. Not consistant number of columns in every row"
        );
    }
    if (!n)
      n = Yl("1fr", i);
    else if (n.length !== i)
      throw new Error("Column sizes vector doesn't match layout definition.");
    if (!t)
      t = Yl("1fr", o);
    else if (t.length !== o)
      throw new Error("Row sizes vector doesn't match layout definition.");
    return {
      uniqueAreas: [...a],
      areas: l,
      col_sizes: n,
      row_sizes: t,
      gap_size: r != null ? r : "12px"
    };
  }
  function O3(e) {
    const t = [];
    for (let n of e)
      t.push(n.trim().split(/\s+/));
    return t;
  }
  function kE(n) {
    var r = n, {
      areas: e
    } = r, t = Le(r, [
      "areas"
    ]);
    return M({
      layout: T3(e)
    }, t);
  }
  function I3(n) {
    var r = n, {
      layout: e
    } = r, t = Le(r, [
      "layout"
    ]);
    return M({
      areas: O3(e)
    }, t);
  }
  function T3(e) {
    const { numCols: t } = da(e), n = [], r = Yl(-1, t);
    for (let i of e)
      for (let o = 0; o < t; o++)
        r[o] = Math.max(r[o], i[o].length);
    for (let i of e)
      n.push(
        i.reduce(
          (o, a, l) => o + a.padEnd(r[l], " ") + (l < t - 1 ? " " : ""),
          ""
        )
      );
    return n;
  }
  function ag(e, t) {
    const n = I3(e);
    return kE(
      P3(n, t)
    );
  }
  function P3(e, t) {
    const n = e;
    switch (t.type) {
      case "ADD_ITEM":
      case "MOVE_ITEM":
        return v3(n, M({ name: t.name }, t.pos));
      case "RENAME_ITEM":
        return A3(n, t.oldName, t.newName);
      case "REMOVE_ITEM":
        return b3(n, t.name);
      case "REMOVE_ITEMS":
        return AE(n, t.names);
      case "SWAP_ITEMS":
        return x3(n, t);
      case "ADD_TRACT":
        return EE(n, t);
      case "REMOVE_TRACT":
        return CE(n, t);
      case "RESIZE_TRACT":
        return C3(
          n,
          { dir: t.dir, index: t.index },
          t.size
        );
      case "SET_GAP":
        return H(M({}, gf(n)), { gap_size: t.size });
      default:
        throw console.error(t), new Error("Have yet to implement layout action type");
    }
  }
  function lg(e) {
    return e.uiChildren !== void 0;
  }
  function bi(e, t) {
    let n = e, r;
    for (r of t) {
      if (!lg(n))
        throw new Error("Somehow trying to enter a leaf node");
      n = n.uiChildren[r];
    }
    return n;
  }
  function _E(e) {
    return e.slice(0, e.length - 1);
  }
  function N3(e) {
    return e[e.length - 1];
  }
  function D3(e) {
    let t = [];
    return e.forEach((n) => {
      if ("area" in n.uiArguments && n.uiArguments.area !== void 0) {
        const r = n.uiArguments.area;
        t.push(r);
      }
    }), t;
  }
  const R3 = [
    "gridlayout::grid_page",
    "gridlayout::grid_container"
  ];
  function L3(e) {
    return R3.includes(e.uiName);
  }
  function OE(e, { path: t, node: n }) {
    var l;
    const r = TE({
      tree: e,
      pathToGridItem: t
    });
    if (r === null)
      return;
    const { gridPageNode: i } = r, o = D3(i.uiChildren)[N3(t)], a = (l = n.uiArguments.area) != null ? l : jn;
    o !== a && (i.uiArguments = ag(i.uiArguments, {
      type: "RENAME_ITEM",
      oldName: o,
      newName: a
    }));
  }
  function IE(e, { path: t }) {
    const n = TE({
      tree: e,
      pathToGridItem: t
    });
    if (n === null)
      return;
    const { gridPageNode: r, gridItemNode: i } = n, o = i.uiArguments.area;
    if (!o) {
      console.error("Deleted node appears to not have a grid area, ignoring");
      return;
    }
    r.uiArguments = ag(r.uiArguments, {
      type: "REMOVE_ITEM",
      name: o
    });
  }
  function TE({
    tree: e,
    pathToGridItem: t
  }) {
    if (t.length === 0)
      return null;
    const n = bi(e, t.slice(0, -1));
    if (!L3(n))
      return null;
    const r = n.uiChildren[t[t.length - 1]];
    return "area" in r.uiArguments ? {
      gridPageNode: n,
      gridItemNode: r
    } : null;
  }
  function M3(e, t) {
    const { numRows: n, numCols: r } = da(e), i = [];
    for (let o = 0; o < n; o++)
      for (let a = 0; a < r; a++)
        e[o][a] === t && i.push({ row: o + 1, col: a + 1 });
    return i;
  }
  function F3(e) {
    return M3(e, jn);
  }
  function B3(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 640 512" }, child: [{ tag: "path", attr: { d: "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" } }] })(e);
  }
  function U3(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" } }] })(e);
  }
  function Jy(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 256 512" }, child: [{ tag: "path", attr: { d: "M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z" } }] })(e);
  }
  function Qy(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" } }] })(e);
  }
  function sg(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" } }] })(e);
  }
  function z3({
    gridLocation: { rowStart: e, rowSpan: t, colStart: n, colSpan: r },
    layoutAreas: i
  }) {
    const o = e + t - 1, a = n + r - 1, l = ac(e, o), s = ac(n, a), u = t > 1, c = r > 1, f = [];
    return (Ky({
      colRange: s,
      rowIndex: e - 1,
      layoutAreas: i
    }) || u) && f.push("up"), (Ky({
      colRange: s,
      rowIndex: o + 1,
      layoutAreas: i
    }) || u) && f.push("down"), (qy({
      rowRange: l,
      colIndex: n - 1,
      layoutAreas: i
    }) || c) && f.push("left"), (qy({
      rowRange: l,
      colIndex: a + 1,
      layoutAreas: i
    }) || c) && f.push("right"), f;
  }
  function Ky({
    colRange: e,
    rowIndex: t,
    layoutAreas: n
  }) {
    return t < 1 || t > n.length ? !1 : e.every(
      (r) => n[t - 1][r - 1] === jn
    );
  }
  function qy({
    rowRange: e,
    colIndex: t,
    layoutAreas: n
  }) {
    return t < 1 || t > n[0].length ? !1 : e.every(
      (r) => n[r - 1][t - 1] === jn
    );
  }
  const j3 = "_marker_mumaw_1", W3 = "_dragger_mumaw_32", Y3 = "_move_mumaw_52", Xy = {
    marker: j3,
    dragger: W3,
    move: Y3
  };
  function Vl({
    rowStart: e,
    rowSpan: t,
    colStart: n,
    colSpan: r
  }) {
    return {
      rowStart: e,
      rowEnd: e + t - 1,
      colStart: n,
      colEnd: n + r - 1
    };
  }
  function V3(e, t) {
    return typeof e == "undefined" && typeof t == "undefined" ? !0 : typeof e == "undefined" || typeof t == "undefined" ? !1 : ("colSpan" in e && (e = Vl(e)), "colSpan" in t && (t = Vl(t)), e.colStart === t.colStart && e.colEnd === t.colEnd && e.rowStart === t.rowStart && e.rowEnd === t.rowEnd);
  }
  function $3({
    row: e,
    col: t
  }) {
    return `row${e}-col${t}`;
  }
  function H3({
    dragDirection: e,
    gridLocation: t,
    layoutAreas: n
  }) {
    const { rowStart: r, rowEnd: i, colStart: o, colEnd: a } = Vl(t), l = n.length, s = n[0].length;
    let u, c, f;
    switch (e) {
      case "up":
        if (r === 1)
          return { shrinkExtent: i, growExtent: 1 };
        u = r - 1, c = 1, f = i;
        break;
      case "left":
        if (o === 1)
          return { shrinkExtent: a, growExtent: 1 };
        u = o - 1, c = 1, f = a;
        break;
      case "down":
        if (i === l)
          return { shrinkExtent: r, growExtent: l };
        u = i + 1, c = l, f = r;
        break;
      case "right":
        if (a === s)
          return { shrinkExtent: o, growExtent: s };
        u = a + 1, c = s, f = o;
        break;
    }
    const d = e === "up" || e === "down", p = e === "left" || e === "up", [h, m] = d ? [o, a] : [r, i], S = (w, E) => {
      const [k, b] = d ? [w, E] : [E, w];
      return n[k - 1][b - 1] !== jn;
    }, g = ac(h, m), v = ac(u, c);
    for (let w of v)
      for (let E of g)
        if (S(w, E))
          return {
            shrinkExtent: f,
            growExtent: w + (p ? 1 : -1)
          };
    return { shrinkExtent: f, growExtent: c };
  }
  function PE(e, t, n) {
    const r = t < n ? t : n, i = t < n ? n : t;
    return e >= r && e <= i;
  }
  function G3({
    dir: e,
    gridContainerStyles: t,
    gridContainerBoundingRect: n
  }) {
    const r = mh(t.getPropertyValue("gap")), o = mh(t.getPropertyValue("padding")) + r / 2, a = n[e === "rows" ? "y" : "x"], l = J3(t, e), s = l.length, u = [];
    for (let c = 0; c < l.length; c++) {
      const f = c === 0, d = f ? a : u[c - 1].end, p = f || c === s - 1, h = l[c] + (p ? o : r);
      u.push({
        // tracts are indexed starting at 1 to match how css indexes tracts
        index: c + 1,
        start: d,
        end: d + h
      });
    }
    return u;
  }
  function J3(e, t) {
    return e.getPropertyValue(
      t === "rows" ? "grid-template-rows" : "grid-template-columns"
    ).split(" ").map(mh);
  }
  function mh(e) {
    return Number(e.replaceAll("px", ""));
  }
  function Q3({
    mousePos: e,
    dragState: t
  }) {
    const { dragHandle: n, tractExtents: r, gridItemExtent: i } = t, o = e[n === "down" || n === "up" ? "y" : "x"], a = r.find(
      ({ start: s, end: u }) => PE(o, s, u)
    );
    if (a === void 0)
      return;
    const l = K3[n];
    return i[l] = a.index, i;
  }
  const K3 = {
    right: "colEnd",
    left: "colStart",
    up: "rowStart",
    down: "rowEnd"
  };
  function q3({
    overlayRef: e,
    gridLocation: t,
    layoutAreas: n,
    onDragEnd: r
  }) {
    const i = Vl(t), o = _.useRef(null), a = _.useCallback(
      (u) => {
        const c = e.current, f = o.current;
        if (!c || !f)
          throw new Error(
            "For some reason we are observing dragging when we shouldn't"
          );
        const d = Q3({ mousePos: u, dragState: f });
        d && e1(c, d);
      },
      [e]
    ), l = _.useCallback(() => {
      const u = e.current, c = o.current;
      if (!u || !c)
        return;
      const f = c.gridItemExtent;
      V3(f, i) || r(f), u.classList.remove("dragging"), document.removeEventListener("mousemove", a), Zy("on");
    }, [i, a, r, e]);
    return _.useCallback(
      (u) => {
        const c = e.current;
        if (!c)
          return;
        const f = c.parentElement;
        if (!f)
          return;
        const d = getComputedStyle(c.parentElement), p = f.getBoundingClientRect(), h = u === "down" || u === "up" ? "rows" : "cols", { shrinkExtent: m, growExtent: S } = H3({
          dragDirection: u,
          gridLocation: t,
          layoutAreas: n
        });
        o.current = {
          dragHandle: u,
          gridItemExtent: Vl(t),
          tractExtents: G3({
            dir: h,
            gridContainerStyles: d,
            gridContainerBoundingRect: p
          }).filter(({ index: g }) => PE(g, m, S))
        }, e1(e.current, o.current.gridItemExtent), c.classList.add("dragging"), document.addEventListener("mousemove", a), document.addEventListener("mouseup", l, { once: !0 }), Zy("off");
      },
      [l, t, n, a, e]
    );
  }
  function Zy(e) {
    var n;
    const t = (n = document.querySelector("body")) == null ? void 0 : n.classList;
    e === "off" ? t == null || t.add("disable-text-selection") : t == null || t.remove("disable-text-selection");
  }
  function e1(e, { rowStart: t, rowEnd: n, colStart: r, colEnd: i }) {
    e.style.setProperty("--drag-grid-row-start", String(t)), e.style.setProperty("--drag-grid-row-end", String(n + 1)), e.style.setProperty("--drag-grid-column-start", String(r)), e.style.setProperty("--drag-grid-column-end", String(i + 1));
  }
  function X3({
    area: e,
    gridLocation: t,
    areas: n,
    onNewPos: r
  }) {
    if (typeof t == "undefined")
      throw new Error(`Item in ${e} is not in the location map`);
    const i = _.useRef(null), o = q3({
      overlayRef: i,
      gridLocation: t,
      layoutAreas: n,
      onDragEnd: r
    }), a = _.useMemo(
      () => z3({ gridLocation: t, layoutAreas: n }),
      [t, n]
    ), l = _.useMemo(() => {
      let s = [];
      for (let u of a)
        s.push(
          /* @__PURE__ */ y(
            "div",
            {
              className: nt(Xy.dragger, u),
              title: `resize ${e} ${u}`,
              onMouseDown: (c) => {
                t1(c), o(u);
              },
              children: Z3[u]
            },
            u
          )
        );
      return s;
    }, [e, a, o]);
    return _.useEffect(() => {
      var s;
      (s = i.current) == null || s.style.setProperty("--grid-area", e);
    }, [e]), /* @__PURE__ */ y(
      "div",
      {
        ref: i,
        onClick: t1,
        className: Xy.marker + " grid-area-overlay",
        children: l
      }
    );
  }
  function t1(e) {
    e.preventDefault(), e.stopPropagation();
  }
  const Z3 = {
    up: /* @__PURE__ */ y(Qy, {}),
    down: /* @__PURE__ */ y(Qy, {}),
    left: /* @__PURE__ */ y(Jy, {}),
    right: /* @__PURE__ */ y(Jy, {})
  }, eN = "_ResizableGrid_i4cq9_1", tN = {
    ResizableGrid: eN,
    "size-detection-cell": "_size-detection-cell_i4cq9_1"
  }, nN = /(^[\d|.]+)\s*(px|%|rem|fr)|(^auto$)/;
  function rN(e) {
    return nN.test(e);
  }
  const iN = /(px|%|rem|fr|auto)/g, oN = /^[\d|.]*/g;
  function lc(e) {
    var i, o;
    const t = ((i = e.match(iN)) == null ? void 0 : i[0]) || "px", n = (o = e.match(oN)) == null ? void 0 : o[0], r = n ? Number(n) : null;
    if (t === "auto") {
      if (r !== null)
        throw new Error("Cant have a count value with auto units.");
      return { count: null, unit: "auto" };
    }
    if (r === null)
      throw new Error("You must have a count for non-auto units.");
    if (t === "fr" && r < 0)
      throw new Error(`Can't have a negative count with ${t} units.`);
    return { count: r, unit: t };
  }
  function La(e) {
    return e.unit === "auto" ? "auto" : `${e.count}${e.unit}`;
  }
  const n1 = ["http", "https", "mailto", "tel"];
  function aN(e) {
    const t = (e || "").trim(), n = t.charAt(0);
    if (n === "#" || n === "/")
      return t;
    const r = t.indexOf(":");
    if (r === -1)
      return t;
    let i = -1;
    for (; ++i < n1.length; ) {
      const o = n1[i];
      if (r === o.length && t.slice(0, o.length).toLowerCase() === o)
        return t;
    }
    return i = t.indexOf("?"), i !== -1 && r > i || (i = t.indexOf("#"), i !== -1 && r > i) ? t : "javascript:void(0)";
  }
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  var NE = function(t) {
    return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
  };
  function cl(e) {
    return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? r1(e.position) : "start" in e || "end" in e ? r1(e) : "line" in e || "column" in e ? gh(e) : "";
  }
  function gh(e) {
    return i1(e && e.line) + ":" + i1(e && e.column);
  }
  function r1(e) {
    return gh(e && e.start) + "-" + gh(e && e.end);
  }
  function i1(e) {
    return e && typeof e == "number" ? e : 1;
  }
  class An extends Error {
    /**
     * Create a message for `reason` at `place` from `origin`.
     *
     * When an error is passed in as `reason`, the `stack` is copied.
     *
     * @param {string | Error | VFileMessage} reason
     *   Reason for message, uses the stack and message of the error if given.
     *
     *   > 👉 **Note**: you should use markdown.
     * @param {Node | NodeLike | Position | Point | null | undefined} [place]
     *   Place in file where the message occurred.
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns
     *   Instance of `VFileMessage`.
     */
    // To do: next major: expose `undefined` everywhere instead of `null`.
    constructor(t, n, r) {
      const i = [null, null];
      let o = {
        // @ts-expect-error: we always follows the structure of `position`.
        start: { line: null, column: null },
        // @ts-expect-error: "
        end: { line: null, column: null }
      };
      if (super(), typeof n == "string" && (r = n, n = void 0), typeof r == "string") {
        const a = r.indexOf(":");
        a === -1 ? i[1] = r : (i[0] = r.slice(0, a), i[1] = r.slice(a + 1));
      }
      n && ("type" in n || "position" in n ? n.position && (o = n.position) : "start" in n || "end" in n ? o = n : ("line" in n || "column" in n) && (o.start = n)), this.name = cl(n) || "1:1", this.message = typeof t == "object" ? t.message : t, this.stack = "", typeof t == "object" && t.stack && (this.stack = t.stack), this.reason = this.message, this.fatal, this.line = o.start.line, this.column = o.start.column, this.position = o, this.source = i[0], this.ruleId = i[1], this.file, this.actual, this.expected, this.url, this.note;
    }
  }
  An.prototype.file = "";
  An.prototype.name = "";
  An.prototype.reason = "";
  An.prototype.message = "";
  An.prototype.stack = "";
  An.prototype.fatal = null;
  An.prototype.column = null;
  An.prototype.line = null;
  An.prototype.source = null;
  An.prototype.ruleId = null;
  An.prototype.position = null;
  const Gn = { basename: lN, dirname: sN, extname: uN, join: cN, sep: "/" };
  function lN(e, t) {
    if (t !== void 0 && typeof t != "string")
      throw new TypeError('"ext" argument must be a string');
    ds(e);
    let n = 0, r = -1, i = e.length, o;
    if (t === void 0 || t.length === 0 || t.length > e.length) {
      for (; i--; )
        if (e.charCodeAt(i) === 47) {
          if (o) {
            n = i + 1;
            break;
          }
        } else
          r < 0 && (o = !0, r = i + 1);
      return r < 0 ? "" : e.slice(n, r);
    }
    if (t === e)
      return "";
    let a = -1, l = t.length - 1;
    for (; i--; )
      if (e.charCodeAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else
        a < 0 && (o = !0, a = i + 1), l > -1 && (e.charCodeAt(i) === t.charCodeAt(l--) ? l < 0 && (r = i) : (l = -1, r = a));
    return n === r ? r = a : r < 0 && (r = e.length), e.slice(n, r);
  }
  function sN(e) {
    if (ds(e), e.length === 0)
      return ".";
    let t = -1, n = e.length, r;
    for (; --n; )
      if (e.charCodeAt(n) === 47) {
        if (r) {
          t = n;
          break;
        }
      } else
        r || (r = !0);
    return t < 0 ? e.charCodeAt(0) === 47 ? "/" : "." : t === 1 && e.charCodeAt(0) === 47 ? "//" : e.slice(0, t);
  }
  function uN(e) {
    ds(e);
    let t = e.length, n = -1, r = 0, i = -1, o = 0, a;
    for (; t--; ) {
      const l = e.charCodeAt(t);
      if (l === 47) {
        if (a) {
          r = t + 1;
          break;
        }
        continue;
      }
      n < 0 && (a = !0, n = t + 1), l === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
    }
    return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
    o === 0 || // The (right-most) trimmed path component is exactly `..`.
    o === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
  }
  function cN(...e) {
    let t = -1, n;
    for (; ++t < e.length; )
      ds(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
    return n === void 0 ? "." : fN(n);
  }
  function fN(e) {
    ds(e);
    const t = e.charCodeAt(0) === 47;
    let n = dN(e, !t);
    return n.length === 0 && !t && (n = "."), n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
  }
  function dN(e, t) {
    let n = "", r = 0, i = -1, o = 0, a = -1, l, s;
    for (; ++a <= e.length; ) {
      if (a < e.length)
        l = e.charCodeAt(a);
      else {
        if (l === 47)
          break;
        l = 47;
      }
      if (l === 47) {
        if (!(i === a - 1 || o === 1))
          if (i !== a - 1 && o === 2) {
            if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
              if (n.length > 2) {
                if (s = n.lastIndexOf("/"), s !== n.length - 1) {
                  s < 0 ? (n = "", r = 0) : (n = n.slice(0, s), r = n.length - 1 - n.lastIndexOf("/")), i = a, o = 0;
                  continue;
                }
              } else if (n.length > 0) {
                n = "", r = 0, i = a, o = 0;
                continue;
              }
            }
            t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
          } else
            n.length > 0 ? n += "/" + e.slice(i + 1, a) : n = e.slice(i + 1, a), r = a - i - 1;
        i = a, o = 0;
      } else
        l === 46 && o > -1 ? o++ : o = -1;
    }
    return n;
  }
  function ds(e) {
    if (typeof e != "string")
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(e)
      );
  }
  const pN = { cwd: hN };
  function hN() {
    return "/";
  }
  function vh(e) {
    return e !== null && typeof e == "object" && // @ts-expect-error: indexable.
    e.href && // @ts-expect-error: indexable.
    e.origin;
  }
  function mN(e) {
    if (typeof e == "string")
      e = new URL(e);
    else if (!vh(e)) {
      const t = new TypeError(
        'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
      );
      throw t.code = "ERR_INVALID_ARG_TYPE", t;
    }
    if (e.protocol !== "file:") {
      const t = new TypeError("The URL must be of scheme file");
      throw t.code = "ERR_INVALID_URL_SCHEME", t;
    }
    return gN(e);
  }
  function gN(e) {
    if (e.hostname !== "") {
      const r = new TypeError(
        'File URL host must be "localhost" or empty on darwin'
      );
      throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
    }
    const t = e.pathname;
    let n = -1;
    for (; ++n < t.length; )
      if (t.charCodeAt(n) === 37 && t.charCodeAt(n + 1) === 50) {
        const r = t.charCodeAt(n + 2);
        if (r === 70 || r === 102) {
          const i = new TypeError(
            "File URL path must not include encoded / characters"
          );
          throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
        }
      }
    return decodeURIComponent(t);
  }
  const _d = ["history", "path", "basename", "stem", "extname", "dirname"];
  class DE {
    /**
     * Create a new virtual file.
     *
     * `options` is treated as:
     *
     * *   `string` or `Buffer` — `{value: options}`
     * *   `URL` — `{path: options}`
     * *   `VFile` — shallow copies its data over to the new file
     * *   `object` — all fields are shallow copied over to the new file
     *
     * Path related fields are set in the following order (least specific to
     * most specific): `history`, `path`, `basename`, `stem`, `extname`,
     * `dirname`.
     *
     * You cannot set `dirname` or `extname` without setting either `history`,
     * `path`, `basename`, or `stem` too.
     *
     * @param {Compatible | null | undefined} [value]
     *   File value.
     * @returns
     *   New instance.
     */
    constructor(t) {
      let n;
      t ? typeof t == "string" || vN(t) ? n = { value: t } : vh(t) ? n = { path: t } : n = t : n = {}, this.data = {}, this.messages = [], this.history = [], this.cwd = pN.cwd(), this.value, this.stored, this.result, this.map;
      let r = -1;
      for (; ++r < _d.length; ) {
        const o = _d[r];
        o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
      }
      let i;
      for (i in n)
        _d.includes(i) || (this[i] = n[i]);
    }
    /**
     * Get the full path (example: `'~/index.min.js'`).
     *
     * @returns {string}
     */
    get path() {
      return this.history[this.history.length - 1];
    }
    /**
     * Set the full path (example: `'~/index.min.js'`).
     *
     * Cannot be nullified.
     * You can set a file URL (a `URL` object with a `file:` protocol) which will
     * be turned into a path with `url.fileURLToPath`.
     *
     * @param {string | URL} path
     */
    set path(t) {
      vh(t) && (t = mN(t)), Id(t, "path"), this.path !== t && this.history.push(t);
    }
    /**
     * Get the parent path (example: `'~'`).
     */
    get dirname() {
      return typeof this.path == "string" ? Gn.dirname(this.path) : void 0;
    }
    /**
     * Set the parent path (example: `'~'`).
     *
     * Cannot be set if there’s no `path` yet.
     */
    set dirname(t) {
      o1(this.basename, "dirname"), this.path = Gn.join(t || "", this.basename);
    }
    /**
     * Get the basename (including extname) (example: `'index.min.js'`).
     */
    get basename() {
      return typeof this.path == "string" ? Gn.basename(this.path) : void 0;
    }
    /**
     * Set basename (including extname) (`'index.min.js'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be nullified (use `file.path = file.dirname` instead).
     */
    set basename(t) {
      Id(t, "basename"), Od(t, "basename"), this.path = Gn.join(this.dirname || "", t);
    }
    /**
     * Get the extname (including dot) (example: `'.js'`).
     */
    get extname() {
      return typeof this.path == "string" ? Gn.extname(this.path) : void 0;
    }
    /**
     * Set the extname (including dot) (example: `'.js'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be set if there’s no `path` yet.
     */
    set extname(t) {
      if (Od(t, "extname"), o1(this.dirname, "extname"), t) {
        if (t.charCodeAt(0) !== 46)
          throw new Error("`extname` must start with `.`");
        if (t.includes(".", 1))
          throw new Error("`extname` cannot contain multiple dots");
      }
      this.path = Gn.join(this.dirname, this.stem + (t || ""));
    }
    /**
     * Get the stem (basename w/o extname) (example: `'index.min'`).
     */
    get stem() {
      return typeof this.path == "string" ? Gn.basename(this.path, this.extname) : void 0;
    }
    /**
     * Set the stem (basename w/o extname) (example: `'index.min'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be nullified (use `file.path = file.dirname` instead).
     */
    set stem(t) {
      Id(t, "stem"), Od(t, "stem"), this.path = Gn.join(this.dirname || "", t + (this.extname || ""));
    }
    /**
     * Serialize the file.
     *
     * @param {BufferEncoding | null | undefined} [encoding='utf8']
     *   Character encoding to understand `value` as when it’s a `Buffer`
     *   (default: `'utf8'`).
     * @returns {string}
     *   Serialized file.
     */
    toString(t) {
      return (this.value || "").toString(t || void 0);
    }
    /**
     * Create a warning message associated with the file.
     *
     * Its `fatal` is set to `false` and `file` is set to the current file path.
     * Its added to `file.messages`.
     *
     * @param {string | Error | VFileMessage} reason
     *   Reason for message, uses the stack and message of the error if given.
     * @param {Node | NodeLike | Position | Point | null | undefined} [place]
     *   Place in file where the message occurred.
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {VFileMessage}
     *   Message.
     */
    message(t, n, r) {
      const i = new An(t, n, r);
      return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
    }
    /**
     * Create an info message associated with the file.
     *
     * Its `fatal` is set to `null` and `file` is set to the current file path.
     * Its added to `file.messages`.
     *
     * @param {string | Error | VFileMessage} reason
     *   Reason for message, uses the stack and message of the error if given.
     * @param {Node | NodeLike | Position | Point | null | undefined} [place]
     *   Place in file where the message occurred.
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {VFileMessage}
     *   Message.
     */
    info(t, n, r) {
      const i = this.message(t, n, r);
      return i.fatal = null, i;
    }
    /**
     * Create a fatal error associated with the file.
     *
     * Its `fatal` is set to `true` and `file` is set to the current file path.
     * Its added to `file.messages`.
     *
     * > 👉 **Note**: a fatal error means that a file is no longer processable.
     *
     * @param {string | Error | VFileMessage} reason
     *   Reason for message, uses the stack and message of the error if given.
     * @param {Node | NodeLike | Position | Point | null | undefined} [place]
     *   Place in file where the message occurred.
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {never}
     *   Message.
     * @throws {VFileMessage}
     *   Message.
     */
    fail(t, n, r) {
      const i = this.message(t, n, r);
      throw i.fatal = !0, i;
    }
  }
  function Od(e, t) {
    if (e && e.includes(Gn.sep))
      throw new Error(
        "`" + t + "` cannot be a path: did not expect `" + Gn.sep + "`"
      );
  }
  function Id(e, t) {
    if (!e)
      throw new Error("`" + t + "` cannot be empty");
  }
  function o1(e, t) {
    if (!e)
      throw new Error("Setting `" + t + "` requires `path` to be set too");
  }
  function vN(e) {
    return NE(e);
  }
  function a1(e) {
    if (e)
      throw e;
  }
  var hu = Object.prototype.hasOwnProperty, RE = Object.prototype.toString, l1 = Object.defineProperty, s1 = Object.getOwnPropertyDescriptor, u1 = function(t) {
    return typeof Array.isArray == "function" ? Array.isArray(t) : RE.call(t) === "[object Array]";
  }, c1 = function(t) {
    if (!t || RE.call(t) !== "[object Object]")
      return !1;
    var n = hu.call(t, "constructor"), r = t.constructor && t.constructor.prototype && hu.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r)
      return !1;
    var i;
    for (i in t)
      ;
    return typeof i == "undefined" || hu.call(t, i);
  }, f1 = function(t, n) {
    l1 && n.name === "__proto__" ? l1(t, n.name, {
      enumerable: !0,
      configurable: !0,
      value: n.newValue,
      writable: !0
    }) : t[n.name] = n.newValue;
  }, d1 = function(t, n) {
    if (n === "__proto__")
      if (hu.call(t, n)) {
        if (s1)
          return s1(t, n).value;
      } else
        return;
    return t[n];
  }, p1 = function e() {
    var t, n, r, i, o, a, l = arguments[0], s = 1, u = arguments.length, c = !1;
    for (typeof l == "boolean" && (c = l, l = arguments[1] || {}, s = 2), (l == null || typeof l != "object" && typeof l != "function") && (l = {}); s < u; ++s)
      if (t = arguments[s], t != null)
        for (n in t)
          r = d1(l, n), i = d1(t, n), l !== i && (c && i && (c1(i) || (o = u1(i))) ? (o ? (o = !1, a = r && u1(r) ? r : []) : a = r && c1(r) ? r : {}, f1(l, { name: n, newValue: e(c, a, i) })) : typeof i != "undefined" && f1(l, { name: n, newValue: i }));
    return l;
  };
  function yh(e) {
    if (typeof e != "object" || e === null)
      return !1;
    const t = Object.getPrototypeOf(e);
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
  }
  function yN() {
    const e = [], t = { run: n, use: r };
    return t;
    function n(...i) {
      let o = -1;
      const a = i.pop();
      if (typeof a != "function")
        throw new TypeError("Expected function as last argument, not " + a);
      l(null, ...i);
      function l(s, ...u) {
        const c = e[++o];
        let f = -1;
        if (s) {
          a(s);
          return;
        }
        for (; ++f < i.length; )
          (u[f] === null || u[f] === void 0) && (u[f] = i[f]);
        i = u, c ? wN(c, l)(...u) : a(null, ...u);
      }
    }
    function r(i) {
      if (typeof i != "function")
        throw new TypeError(
          "Expected `middelware` to be a function, not " + i
        );
      return e.push(i), t;
    }
  }
  function wN(e, t) {
    let n;
    return r;
    function r(...a) {
      const l = e.length > a.length;
      let s;
      l && a.push(i);
      try {
        s = e.apply(this, a);
      } catch (u) {
        const c = (
          /** @type {Error} */
          u
        );
        if (l && n)
          throw c;
        return i(c);
      }
      l || (s instanceof Promise ? s.then(o, i) : s instanceof Error ? i(s) : o(s));
    }
    function i(a, ...l) {
      n || (n = !0, t(a, ...l));
    }
    function o(a) {
      i(null, a);
    }
  }
  const bN = ME().freeze(), LE = {}.hasOwnProperty;
  function ME() {
    const e = yN(), t = [];
    let n = {}, r, i = -1;
    return o.data = a, o.Parser = void 0, o.Compiler = void 0, o.freeze = l, o.attachers = t, o.use = s, o.parse = u, o.stringify = c, o.run = f, o.runSync = d, o.process = p, o.processSync = h, o;
    function o() {
      const m = ME();
      let S = -1;
      for (; ++S < t.length; )
        m.use(...t[S]);
      return m.data(p1(!0, {}, n)), m;
    }
    function a(m, S) {
      return typeof m == "string" ? arguments.length === 2 ? (Nd("data", r), n[m] = S, o) : LE.call(n, m) && n[m] || null : m ? (Nd("data", r), n = m, o) : n;
    }
    function l() {
      if (r)
        return o;
      for (; ++i < t.length; ) {
        const [m, ...S] = t[i];
        if (S[0] === !1)
          continue;
        S[0] === !0 && (S[0] = void 0);
        const g = m.call(o, ...S);
        typeof g == "function" && e.use(g);
      }
      return r = !0, i = Number.POSITIVE_INFINITY, o;
    }
    function s(m, ...S) {
      let g;
      if (Nd("use", r), m != null)
        if (typeof m == "function")
          k(m, ...S);
        else if (typeof m == "object")
          Array.isArray(m) ? E(m) : w(m);
        else
          throw new TypeError("Expected usable value, not `" + m + "`");
      return g && (n.settings = Object.assign(n.settings || {}, g)), o;
      function v(b) {
        if (typeof b == "function")
          k(b);
        else if (typeof b == "object")
          if (Array.isArray(b)) {
            const [A, ...O] = b;
            k(A, ...O);
          } else
            w(b);
        else
          throw new TypeError("Expected usable value, not `" + b + "`");
      }
      function w(b) {
        E(b.plugins), b.settings && (g = Object.assign(g || {}, b.settings));
      }
      function E(b) {
        let A = -1;
        if (b != null)
          if (Array.isArray(b))
            for (; ++A < b.length; ) {
              const O = b[A];
              v(O);
            }
          else
            throw new TypeError("Expected a list of plugins, not `" + b + "`");
      }
      function k(b, A) {
        let O = -1, T;
        for (; ++O < t.length; )
          if (t[O][0] === b) {
            T = t[O];
            break;
          }
        T ? (yh(T[1]) && yh(A) && (A = p1(!0, T[1], A)), T[1] = A) : t.push([...arguments]);
      }
    }
    function u(m) {
      o.freeze();
      const S = Ma(m), g = o.Parser;
      return Td("parse", g), h1(g, "parse") ? new g(String(S), S).parse() : g(String(S), S);
    }
    function c(m, S) {
      o.freeze();
      const g = Ma(S), v = o.Compiler;
      return Pd("stringify", v), m1(m), h1(v, "compile") ? new v(m, g).compile() : v(m, g);
    }
    function f(m, S, g) {
      if (m1(m), o.freeze(), !g && typeof S == "function" && (g = S, S = void 0), !g)
        return new Promise(v);
      v(null, g);
      function v(w, E) {
        e.run(m, Ma(S), k);
        function k(b, A, O) {
          A = A || m, b ? E(b) : w ? w(A) : g(null, A, O);
        }
      }
    }
    function d(m, S) {
      let g, v;
      return o.run(m, S, w), g1("runSync", "run", v), g;
      function w(E, k) {
        a1(E), g = k, v = !0;
      }
    }
    function p(m, S) {
      if (o.freeze(), Td("process", o.Parser), Pd("process", o.Compiler), !S)
        return new Promise(g);
      g(null, S);
      function g(v, w) {
        const E = Ma(m);
        o.run(o.parse(E), E, (b, A, O) => {
          if (b || !A || !O)
            k(b);
          else {
            const T = o.stringify(A, O);
            T == null || (AN(T) ? O.value = T : O.result = T), k(b, O);
          }
        });
        function k(b, A) {
          b || !A ? w(b) : v ? v(A) : S(null, A);
        }
      }
    }
    function h(m) {
      let S;
      o.freeze(), Td("processSync", o.Parser), Pd("processSync", o.Compiler);
      const g = Ma(m);
      return o.process(g, v), g1("processSync", "process", S), g;
      function v(w) {
        S = !0, a1(w);
      }
    }
  }
  function h1(e, t) {
    return typeof e == "function" && // Prototypes do exist.
    // type-coverage:ignore-next-line
    e.prototype && // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    // type-coverage:ignore-next-line
    (SN(e.prototype) || t in e.prototype);
  }
  function SN(e) {
    let t;
    for (t in e)
      if (LE.call(e, t))
        return !0;
    return !1;
  }
  function Td(e, t) {
    if (typeof t != "function")
      throw new TypeError("Cannot `" + e + "` without `Parser`");
  }
  function Pd(e, t) {
    if (typeof t != "function")
      throw new TypeError("Cannot `" + e + "` without `Compiler`");
  }
  function Nd(e, t) {
    if (t)
      throw new Error(
        "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
      );
  }
  function m1(e) {
    if (!yh(e) || typeof e.type != "string")
      throw new TypeError("Expected node, got `" + e + "`");
  }
  function g1(e, t, n) {
    if (!n)
      throw new Error(
        "`" + e + "` finished async. Use `" + t + "` instead"
      );
  }
  function Ma(e) {
    return EN(e) ? e : new DE(e);
  }
  function EN(e) {
    return Boolean(
      e && typeof e == "object" && "message" in e && "messages" in e
    );
  }
  function AN(e) {
    return typeof e == "string" || NE(e);
  }
  function CN(e, t) {
    const n = (t || {}).includeImageAlt;
    return FE(
      e,
      typeof n == "boolean" ? n : !0
    );
  }
  function FE(e, t) {
    return xN(e) && ("value" in e && e.value || t && "alt" in e && e.alt || "children" in e && v1(e.children, t)) || Array.isArray(e) && v1(e, t) || "";
  }
  function v1(e, t) {
    const n = [];
    let r = -1;
    for (; ++r < e.length; )
      n[r] = FE(e[r], t);
    return n.join("");
  }
  function xN(e) {
    return Boolean(e && typeof e == "object");
  }
  function ir(e, t, n, r) {
    const i = e.length;
    let o = 0, a;
    if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
      a = Array.from(r), a.unshift(t, n), [].splice.apply(e, a);
    else
      for (n && [].splice.apply(e, [t, n]); o < r.length; )
        a = r.slice(o, o + 1e4), a.unshift(t, 0), [].splice.apply(e, a), o += 1e4, t += 1e4;
  }
  function fn(e, t) {
    return e.length > 0 ? (ir(e, e.length, 0, t), e) : t;
  }
  const y1 = {}.hasOwnProperty;
  function kN(e) {
    const t = {};
    let n = -1;
    for (; ++n < e.length; )
      _N(t, e[n]);
    return t;
  }
  function _N(e, t) {
    let n;
    for (n in t) {
      const i = (y1.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
      let a;
      for (a in o) {
        y1.call(i, a) || (i[a] = []);
        const l = o[a];
        ON(
          // @ts-expect-error Looks like a list.
          i[a],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
    }
  }
  function ON(e, t) {
    let n = -1;
    const r = [];
    for (; ++n < t.length; )
      (t[n].add === "after" ? e : r).push(t[n]);
    ir(e, 0, 0, r);
  }
  const IN = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, qn = Si(/[A-Za-z]/), wh = Si(/\d/), TN = Si(/[\dA-Fa-f]/), Xt = Si(/[\dA-Za-z]/), PN = Si(/[!-/:-@[-`{-~]/), w1 = Si(/[#-'*+\--9=?A-Z^-~]/);
  function bh(e) {
    return (
      // Special whitespace codes (which have negative values), C0 and Control
      // character DEL
      e !== null && (e < 32 || e === 127)
    );
  }
  function mn(e) {
    return e !== null && (e < 0 || e === 32);
  }
  function re(e) {
    return e !== null && e < -2;
  }
  function et(e) {
    return e === -2 || e === -1 || e === 32;
  }
  const NN = Si(/\s/), DN = Si(IN);
  function Si(e) {
    return t;
    function t(n) {
      return n !== null && e.test(String.fromCharCode(n));
    }
  }
  function Ce(e, t, n, r) {
    const i = r ? r - 1 : Number.POSITIVE_INFINITY;
    let o = 0;
    return a;
    function a(s) {
      return et(s) ? (e.enter(n), l(s)) : t(s);
    }
    function l(s) {
      return et(s) && o++ < i ? (e.consume(s), l) : (e.exit(n), t(s));
    }
  }
  const RN = {
    tokenize: LN
  };
  function LN(e) {
    const t = e.attempt(
      this.parser.constructs.contentInitial,
      r,
      i
    );
    let n;
    return t;
    function r(l) {
      if (l === null) {
        e.consume(l);
        return;
      }
      return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), Ce(e, t, "linePrefix");
    }
    function i(l) {
      return e.enter("paragraph"), o(l);
    }
    function o(l) {
      const s = e.enter("chunkText", {
        contentType: "text",
        previous: n
      });
      return n && (n.next = s), n = s, a(l);
    }
    function a(l) {
      if (l === null) {
        e.exit("chunkText"), e.exit("paragraph"), e.consume(l);
        return;
      }
      return re(l) ? (e.consume(l), e.exit("chunkText"), o) : (e.consume(l), a);
    }
  }
  const MN = {
    tokenize: FN
  }, b1 = {
    tokenize: BN
  };
  function FN(e) {
    const t = this, n = [];
    let r = 0, i, o, a;
    return l;
    function l(w) {
      if (r < n.length) {
        const E = n[r];
        return t.containerState = E[1], e.attempt(
          E[0].continuation,
          s,
          u
        )(w);
      }
      return u(w);
    }
    function s(w) {
      if (r++, t.containerState._closeFlow) {
        t.containerState._closeFlow = void 0, i && v();
        const E = t.events.length;
        let k = E, b;
        for (; k--; )
          if (t.events[k][0] === "exit" && t.events[k][1].type === "chunkFlow") {
            b = t.events[k][1].end;
            break;
          }
        g(r);
        let A = E;
        for (; A < t.events.length; )
          t.events[A][1].end = Object.assign({}, b), A++;
        return ir(
          t.events,
          k + 1,
          0,
          t.events.slice(E)
        ), t.events.length = A, u(w);
      }
      return l(w);
    }
    function u(w) {
      if (r === n.length) {
        if (!i)
          return d(w);
        if (i.currentConstruct && i.currentConstruct.concrete)
          return h(w);
        t.interrupt = Boolean(
          i.currentConstruct && !i._gfmTableDynamicInterruptHack
        );
      }
      return t.containerState = {}, e.check(
        b1,
        c,
        f
      )(w);
    }
    function c(w) {
      return i && v(), g(r), d(w);
    }
    function f(w) {
      return t.parser.lazy[t.now().line] = r !== n.length, a = t.now().offset, h(w);
    }
    function d(w) {
      return t.containerState = {}, e.attempt(
        b1,
        p,
        h
      )(w);
    }
    function p(w) {
      return r++, n.push([t.currentConstruct, t.containerState]), d(w);
    }
    function h(w) {
      if (w === null) {
        i && v(), g(0), e.consume(w);
        return;
      }
      return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
        contentType: "flow",
        previous: o,
        _tokenizer: i
      }), m(w);
    }
    function m(w) {
      if (w === null) {
        S(e.exit("chunkFlow"), !0), g(0), e.consume(w);
        return;
      }
      return re(w) ? (e.consume(w), S(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (e.consume(w), m);
    }
    function S(w, E) {
      const k = t.sliceStream(w);
      if (E && k.push(null), w.previous = o, o && (o.next = w), o = w, i.defineSkip(w.start), i.write(k), t.parser.lazy[w.start.line]) {
        let b = i.events.length;
        for (; b--; )
          if (
            // The token starts before the line ending…
            i.events[b][1].start.offset < a && // …and either is not ended yet…
            (!i.events[b][1].end || // …or ends after it.
            i.events[b][1].end.offset > a)
          )
            return;
        const A = t.events.length;
        let O = A, T, P;
        for (; O--; )
          if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
            if (T) {
              P = t.events[O][1].end;
              break;
            }
            T = !0;
          }
        for (g(r), b = A; b < t.events.length; )
          t.events[b][1].end = Object.assign({}, P), b++;
        ir(
          t.events,
          O + 1,
          0,
          t.events.slice(A)
        ), t.events.length = b;
      }
    }
    function g(w) {
      let E = n.length;
      for (; E-- > w; ) {
        const k = n[E];
        t.containerState = k[1], k[0].exit.call(t, e);
      }
      n.length = w;
    }
    function v() {
      i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
    }
  }
  function BN(e, t, n) {
    return Ce(
      e,
      e.attempt(this.parser.constructs.document, t, n),
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function S1(e) {
    if (e === null || mn(e) || NN(e))
      return 1;
    if (DN(e))
      return 2;
  }
  function ug(e, t, n) {
    const r = [];
    let i = -1;
    for (; ++i < e.length; ) {
      const o = e[i].resolveAll;
      o && !r.includes(o) && (t = o(t, n), r.push(o));
    }
    return t;
  }
  const Sh = {
    name: "attention",
    tokenize: zN,
    resolveAll: UN
  };
  function UN(e, t) {
    let n = -1, r, i, o, a, l, s, u, c;
    for (; ++n < e.length; )
      if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
        for (r = n; r--; )
          if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
          t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
            if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
              continue;
            s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
            const f = Object.assign({}, e[r][1].end), d = Object.assign({}, e[n][1].start);
            E1(f, -s), E1(d, s), a = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: f,
              end: Object.assign({}, e[r][1].end)
            }, l = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, e[n][1].start),
              end: d
            }, o = {
              type: s > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, e[r][1].end),
              end: Object.assign({}, e[n][1].start)
            }, i = {
              type: s > 1 ? "strong" : "emphasis",
              start: Object.assign({}, a.start),
              end: Object.assign({}, l.end)
            }, e[r][1].end = Object.assign({}, a.start), e[n][1].start = Object.assign({}, l.end), u = [], e[r][1].end.offset - e[r][1].start.offset && (u = fn(u, [
              ["enter", e[r][1], t],
              ["exit", e[r][1], t]
            ])), u = fn(u, [
              ["enter", i, t],
              ["enter", a, t],
              ["exit", a, t],
              ["enter", o, t]
            ]), u = fn(
              u,
              ug(
                t.parser.constructs.insideSpan.null,
                e.slice(r + 1, n),
                t
              )
            ), u = fn(u, [
              ["exit", o, t],
              ["enter", l, t],
              ["exit", l, t],
              ["exit", i, t]
            ]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = fn(u, [
              ["enter", e[n][1], t],
              ["exit", e[n][1], t]
            ])) : c = 0, ir(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
            break;
          }
      }
    for (n = -1; ++n < e.length; )
      e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
    return e;
  }
  function zN(e, t) {
    const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = S1(r);
    let o;
    return a;
    function a(s) {
      return e.enter("attentionSequence"), o = s, l(s);
    }
    function l(s) {
      if (s === o)
        return e.consume(s), l;
      const u = e.exit("attentionSequence"), c = S1(s), f = !c || c === 2 && i || n.includes(s), d = !i || i === 2 && c || n.includes(r);
      return u._open = Boolean(o === 42 ? f : f && (i || !d)), u._close = Boolean(o === 42 ? d : d && (c || !f)), t(s);
    }
  }
  function E1(e, t) {
    e.column += t, e.offset += t, e._bufferIndex += t;
  }
  const jN = {
    name: "autolink",
    tokenize: WN
  };
  function WN(e, t, n) {
    let r = 1;
    return i;
    function i(h) {
      return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
    }
    function o(h) {
      return qn(h) ? (e.consume(h), a) : w1(h) ? u(h) : n(h);
    }
    function a(h) {
      return h === 43 || h === 45 || h === 46 || Xt(h) ? l(h) : u(h);
    }
    function l(h) {
      return h === 58 ? (e.consume(h), s) : (h === 43 || h === 45 || h === 46 || Xt(h)) && r++ < 32 ? (e.consume(h), l) : u(h);
    }
    function s(h) {
      return h === 62 ? (e.exit("autolinkProtocol"), p(h)) : h === null || h === 32 || h === 60 || bh(h) ? n(h) : (e.consume(h), s);
    }
    function u(h) {
      return h === 64 ? (e.consume(h), r = 0, c) : w1(h) ? (e.consume(h), u) : n(h);
    }
    function c(h) {
      return Xt(h) ? f(h) : n(h);
    }
    function f(h) {
      return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", p(h)) : d(h);
    }
    function d(h) {
      return (h === 45 || Xt(h)) && r++ < 63 ? (e.consume(h), h === 45 ? d : f) : n(h);
    }
    function p(h) {
      return e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t;
    }
  }
  const vf = {
    tokenize: YN,
    partial: !0
  };
  function YN(e, t, n) {
    return Ce(e, r, "linePrefix");
    function r(i) {
      return i === null || re(i) ? t(i) : n(i);
    }
  }
  const BE = {
    name: "blockQuote",
    tokenize: VN,
    continuation: {
      tokenize: $N
    },
    exit: HN
  };
  function VN(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      if (a === 62) {
        const l = r.containerState;
        return l.open || (e.enter("blockQuote", {
          _container: !0
        }), l.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), o;
      }
      return n(a);
    }
    function o(a) {
      return et(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(a));
    }
  }
  function $N(e, t, n) {
    return Ce(
      e,
      e.attempt(BE, t, n),
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function HN(e) {
    e.exit("blockQuote");
  }
  const UE = {
    name: "characterEscape",
    tokenize: GN
  };
  function GN(e, t, n) {
    return r;
    function r(o) {
      return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
    }
    function i(o) {
      return PN(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
    }
  }
  const A1 = document.createElement("i");
  function cg(e) {
    const t = "&" + e + ";";
    A1.innerHTML = t;
    const n = A1.textContent;
    return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
  }
  const zE = {
    name: "characterReference",
    tokenize: JN
  };
  function JN(e, t, n) {
    const r = this;
    let i = 0, o, a;
    return l;
    function l(f) {
      return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
    }
    function s(f) {
      return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, a = Xt, c(f));
    }
    function u(f) {
      return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, a = TN, c) : (e.enter("characterReferenceValue"), o = 7, a = wh, c(f));
    }
    function c(f) {
      let d;
      return f === 59 && i ? (d = e.exit("characterReferenceValue"), a === Xt && !cg(r.sliceSerialize(d)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t)) : a(f) && i++ < o ? (e.consume(f), c) : n(f);
    }
  }
  const C1 = {
    name: "codeFenced",
    tokenize: QN,
    concrete: !0
  };
  function QN(e, t, n) {
    const r = this, i = {
      tokenize: k,
      partial: !0
    }, o = {
      tokenize: E,
      partial: !0
    }, a = this.events[this.events.length - 1], l = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0;
    let s = 0, u;
    return c;
    function c(b) {
      return e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u = b, f(b);
    }
    function f(b) {
      return b === u ? (e.consume(b), s++, f) : (e.exit("codeFencedFenceSequence"), s < 3 ? n(b) : Ce(e, d, "whitespace")(b));
    }
    function d(b) {
      return b === null || re(b) ? S(b) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
        contentType: "string"
      }), p(b));
    }
    function p(b) {
      return b === null || mn(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Ce(e, h, "whitespace")(b)) : b === 96 && b === u ? n(b) : (e.consume(b), p);
    }
    function h(b) {
      return b === null || re(b) ? S(b) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
        contentType: "string"
      }), m(b));
    }
    function m(b) {
      return b === null || re(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), S(b)) : b === 96 && b === u ? n(b) : (e.consume(b), m);
    }
    function S(b) {
      return e.exit("codeFencedFence"), r.interrupt ? t(b) : g(b);
    }
    function g(b) {
      return b === null ? w(b) : re(b) ? e.attempt(
        o,
        e.attempt(
          i,
          w,
          l ? Ce(
            e,
            g,
            "linePrefix",
            l + 1
          ) : g
        ),
        w
      )(b) : (e.enter("codeFlowValue"), v(b));
    }
    function v(b) {
      return b === null || re(b) ? (e.exit("codeFlowValue"), g(b)) : (e.consume(b), v);
    }
    function w(b) {
      return e.exit("codeFenced"), t(b);
    }
    function E(b, A, O) {
      const T = this;
      return P;
      function P(F) {
        return b.enter("lineEnding"), b.consume(F), b.exit("lineEnding"), I;
      }
      function I(F) {
        return T.parser.lazy[T.now().line] ? O(F) : A(F);
      }
    }
    function k(b, A, O) {
      let T = 0;
      return Ce(
        b,
        P,
        "linePrefix",
        this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      );
      function P(U) {
        return b.enter("codeFencedFence"), b.enter("codeFencedFenceSequence"), I(U);
      }
      function I(U) {
        return U === u ? (b.consume(U), T++, I) : T < s ? O(U) : (b.exit("codeFencedFenceSequence"), Ce(b, F, "whitespace")(U));
      }
      function F(U) {
        return U === null || re(U) ? (b.exit("codeFencedFence"), A(U)) : O(U);
      }
    }
  }
  const Dd = {
    name: "codeIndented",
    tokenize: qN
  }, KN = {
    tokenize: XN,
    partial: !0
  };
  function qN(e, t, n) {
    const r = this;
    return i;
    function i(u) {
      return e.enter("codeIndented"), Ce(e, o, "linePrefix", 4 + 1)(u);
    }
    function o(u) {
      const c = r.events[r.events.length - 1];
      return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? a(u) : n(u);
    }
    function a(u) {
      return u === null ? s(u) : re(u) ? e.attempt(KN, a, s)(u) : (e.enter("codeFlowValue"), l(u));
    }
    function l(u) {
      return u === null || re(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), l);
    }
    function s(u) {
      return e.exit("codeIndented"), t(u);
    }
  }
  function XN(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return r.parser.lazy[r.now().line] ? n(a) : re(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : Ce(e, o, "linePrefix", 4 + 1)(a);
    }
    function o(a) {
      const l = r.events[r.events.length - 1];
      return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(a) : re(a) ? i(a) : n(a);
    }
  }
  const ZN = {
    name: "codeText",
    tokenize: nD,
    resolve: eD,
    previous: tD
  };
  function eD(e) {
    let t = e.length - 4, n = 3, r, i;
    if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
      for (r = n; ++r < t; )
        if (e[r][1].type === "codeTextData") {
          e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
          break;
        }
    }
    for (r = n - 1, t++; ++r <= t; )
      i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
    return e;
  }
  function tD(e) {
    return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function nD(e, t, n) {
    let r = 0, i, o;
    return a;
    function a(f) {
      return e.enter("codeText"), e.enter("codeTextSequence"), l(f);
    }
    function l(f) {
      return f === 96 ? (e.consume(f), r++, l) : (e.exit("codeTextSequence"), s(f));
    }
    function s(f) {
      return f === null ? n(f) : f === 96 ? (o = e.enter("codeTextSequence"), i = 0, c(f)) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), s) : re(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(f));
    }
    function u(f) {
      return f === null || f === 32 || f === 96 || re(f) ? (e.exit("codeTextData"), s(f)) : (e.consume(f), u);
    }
    function c(f) {
      return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (o.type = "codeTextData", u(f));
    }
  }
  function jE(e) {
    const t = {};
    let n = -1, r, i, o, a, l, s, u;
    for (; ++n < e.length; ) {
      for (; n in t; )
        n = t[n];
      if (r = e[n], n && r[1].type === "chunkFlow" && e[n - 1][1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
        for (; ++o < s.length && s[o][1].type !== "content"; )
          s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
      if (r[0] === "enter")
        r[1].contentType && (Object.assign(t, rD(e, n)), n = t[n], u = !0);
      else if (r[1]._container) {
        for (o = n, i = void 0; o-- && (a = e[o], a[1].type === "lineEnding" || a[1].type === "lineEndingBlank"); )
          a[0] === "enter" && (i && (e[i][1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = o);
        i && (r[1].end = Object.assign({}, e[i][1].start), l = e.slice(i, n), l.unshift(r), ir(e, i, n - i + 1, l));
      }
    }
    return !u;
  }
  function rD(e, t) {
    const n = e[t][1], r = e[t][2];
    let i = t - 1;
    const o = [], a = n._tokenizer || r.parser[n.contentType](n.start), l = a.events, s = [], u = {};
    let c, f, d = -1, p = n, h = 0, m = 0;
    const S = [m];
    for (; p; ) {
      for (; e[++i][1] !== p; )
        ;
      o.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), f && a.defineSkip(p.start), p._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(c), p._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), f = p, p = p.next;
    }
    for (p = n; ++d < l.length; )
      // Find a void token that includes a break.
      l[d][0] === "exit" && l[d - 1][0] === "enter" && l[d][1].type === l[d - 1][1].type && l[d][1].start.line !== l[d][1].end.line && (m = d + 1, S.push(m), p._tokenizer = void 0, p.previous = void 0, p = p.next);
    for (a.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : S.pop(), d = S.length; d--; ) {
      const g = l.slice(S[d], S[d + 1]), v = o.pop();
      s.unshift([v, v + g.length - 1]), ir(e, v, 2, g);
    }
    for (d = -1; ++d < s.length; )
      u[h + s[d][0]] = h + s[d][1], h += s[d][1] - s[d][0] - 1;
    return u;
  }
  const iD = {
    tokenize: lD,
    resolve: aD
  }, oD = {
    tokenize: sD,
    partial: !0
  };
  function aD(e) {
    return jE(e), e;
  }
  function lD(e, t) {
    let n;
    return r;
    function r(l) {
      return e.enter("content"), n = e.enter("chunkContent", {
        contentType: "content"
      }), i(l);
    }
    function i(l) {
      return l === null ? o(l) : re(l) ? e.check(
        oD,
        a,
        o
      )(l) : (e.consume(l), i);
    }
    function o(l) {
      return e.exit("chunkContent"), e.exit("content"), t(l);
    }
    function a(l) {
      return e.consume(l), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
        contentType: "content",
        previous: n
      }), n = n.next, i;
    }
  }
  function sD(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Ce(e, o, "linePrefix");
    }
    function o(a) {
      if (a === null || re(a))
        return n(a);
      const l = r.events[r.events.length - 1];
      return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(a) : e.interrupt(r.parser.constructs.flow, n, t)(a);
    }
  }
  function WE(e, t, n, r, i, o, a, l, s) {
    const u = s || Number.POSITIVE_INFINITY;
    let c = 0;
    return f;
    function f(g) {
      return g === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(g), e.exit(o), d) : g === null || g === 41 || bh(g) ? n(g) : (e.enter(r), e.enter(a), e.enter(l), e.enter("chunkString", {
        contentType: "string"
      }), m(g));
    }
    function d(g) {
      return g === 62 ? (e.enter(o), e.consume(g), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
        contentType: "string"
      }), p(g));
    }
    function p(g) {
      return g === 62 ? (e.exit("chunkString"), e.exit(l), d(g)) : g === null || g === 60 || re(g) ? n(g) : (e.consume(g), g === 92 ? h : p);
    }
    function h(g) {
      return g === 60 || g === 62 || g === 92 ? (e.consume(g), p) : p(g);
    }
    function m(g) {
      return g === 40 ? ++c > u ? n(g) : (e.consume(g), m) : g === 41 ? c-- ? (e.consume(g), m) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : g === null || mn(g) ? c ? n(g) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : bh(g) ? n(g) : (e.consume(g), g === 92 ? S : m);
    }
    function S(g) {
      return g === 40 || g === 41 || g === 92 ? (e.consume(g), m) : m(g);
    }
  }
  function YE(e, t, n, r, i, o) {
    const a = this;
    let l = 0, s;
    return u;
    function u(p) {
      return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(o), c;
    }
    function c(p) {
      return p === null || p === 91 || p === 93 && !s || /* To do: remove in the future once we’ve switched from
       * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
       * which doesn’t need this */
      /* Hidden footnotes hook */
      /* c8 ignore next 3 */
      p === 94 && !l && "_hiddenFootnoteSupport" in a.parser.constructs || l > 999 ? n(p) : p === 93 ? (e.exit(o), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : re(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
        contentType: "string"
      }), f(p));
    }
    function f(p) {
      return p === null || p === 91 || p === 93 || re(p) || l++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), s = s || !et(p), p === 92 ? d : f);
    }
    function d(p) {
      return p === 91 || p === 92 || p === 93 ? (e.consume(p), l++, f) : f(p);
    }
  }
  function VE(e, t, n, r, i, o) {
    let a;
    return l;
    function l(d) {
      return e.enter(r), e.enter(i), e.consume(d), e.exit(i), a = d === 40 ? 41 : d, s;
    }
    function s(d) {
      return d === a ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : (e.enter(o), u(d));
    }
    function u(d) {
      return d === a ? (e.exit(o), s(a)) : d === null ? n(d) : re(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), Ce(e, u, "linePrefix")) : (e.enter("chunkString", {
        contentType: "string"
      }), c(d));
    }
    function c(d) {
      return d === a || d === null || re(d) ? (e.exit("chunkString"), u(d)) : (e.consume(d), d === 92 ? f : c);
    }
    function f(d) {
      return d === a || d === 92 ? (e.consume(d), c) : c(d);
    }
  }
  function fl(e, t) {
    let n;
    return r;
    function r(i) {
      return re(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : et(i) ? Ce(
        e,
        r,
        n ? "linePrefix" : "lineSuffix"
      )(i) : t(i);
    }
  }
  function Fo(e) {
    return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  const uD = {
    name: "definition",
    tokenize: fD
  }, cD = {
    tokenize: dD,
    partial: !0
  };
  function fD(e, t, n) {
    const r = this;
    let i;
    return o;
    function o(s) {
      return e.enter("definition"), YE.call(
        r,
        e,
        a,
        n,
        "definitionLabel",
        "definitionLabelMarker",
        "definitionLabelString"
      )(s);
    }
    function a(s) {
      return i = Fo(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      ), s === 58 ? (e.enter("definitionMarker"), e.consume(s), e.exit("definitionMarker"), fl(
        e,
        WE(
          e,
          e.attempt(
            cD,
            Ce(e, l, "whitespace"),
            Ce(e, l, "whitespace")
          ),
          n,
          "definitionDestination",
          "definitionDestinationLiteral",
          "definitionDestinationLiteralMarker",
          "definitionDestinationRaw",
          "definitionDestinationString"
        )
      )) : n(s);
    }
    function l(s) {
      return s === null || re(s) ? (e.exit("definition"), r.parser.defined.includes(i) || r.parser.defined.push(i), t(s)) : n(s);
    }
  }
  function dD(e, t, n) {
    return r;
    function r(a) {
      return mn(a) ? fl(e, i)(a) : n(a);
    }
    function i(a) {
      return a === 34 || a === 39 || a === 40 ? VE(
        e,
        Ce(e, o, "whitespace"),
        n,
        "definitionTitle",
        "definitionTitleMarker",
        "definitionTitleString"
      )(a) : n(a);
    }
    function o(a) {
      return a === null || re(a) ? t(a) : n(a);
    }
  }
  const pD = {
    name: "hardBreakEscape",
    tokenize: hD
  };
  function hD(e, t, n) {
    return r;
    function r(o) {
      return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(o), i;
    }
    function i(o) {
      return re(o) ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(o)) : n(o);
    }
  }
  const mD = {
    name: "headingAtx",
    tokenize: vD,
    resolve: gD
  };
  function gD(e, t) {
    let n = e.length - 2, r = 3, i, o;
    return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
      type: "atxHeadingText",
      start: e[r][1].start,
      end: e[n][1].end
    }, o = {
      type: "chunkText",
      start: e[r][1].start,
      end: e[n][1].end,
      // @ts-expect-error Constants are fine to assign.
      contentType: "text"
    }, ir(e, r, n - r + 1, [
      ["enter", i, t],
      ["enter", o, t],
      ["exit", o, t],
      ["exit", i, t]
    ])), e;
  }
  function vD(e, t, n) {
    const r = this;
    let i = 0;
    return o;
    function o(c) {
      return e.enter("atxHeading"), e.enter("atxHeadingSequence"), a(c);
    }
    function a(c) {
      return c === 35 && i++ < 6 ? (e.consume(c), a) : c === null || mn(c) ? (e.exit("atxHeadingSequence"), r.interrupt ? t(c) : l(c)) : n(c);
    }
    function l(c) {
      return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || re(c) ? (e.exit("atxHeading"), t(c)) : et(c) ? Ce(e, l, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
    }
    function s(c) {
      return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), l(c));
    }
    function u(c) {
      return c === null || c === 35 || mn(c) ? (e.exit("atxHeadingText"), l(c)) : (e.consume(c), u);
    }
  }
  const yD = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ], x1 = ["pre", "script", "style", "textarea"], wD = {
    name: "htmlFlow",
    tokenize: ED,
    resolveTo: SD,
    concrete: !0
  }, bD = {
    tokenize: AD,
    partial: !0
  };
  function SD(e) {
    let t = e.length;
    for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
      ;
    return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
  }
  function ED(e, t, n) {
    const r = this;
    let i, o, a, l, s;
    return u;
    function u(C) {
      return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(C), c;
    }
    function c(C) {
      return C === 33 ? (e.consume(C), f) : C === 47 ? (e.consume(C), h) : C === 63 ? (e.consume(C), i = 3, r.interrupt ? t : V) : qn(C) ? (e.consume(C), a = String.fromCharCode(C), o = !0, m) : n(C);
    }
    function f(C) {
      return C === 45 ? (e.consume(C), i = 2, d) : C === 91 ? (e.consume(C), i = 5, a = "CDATA[", l = 0, p) : qn(C) ? (e.consume(C), i = 4, r.interrupt ? t : V) : n(C);
    }
    function d(C) {
      return C === 45 ? (e.consume(C), r.interrupt ? t : V) : n(C);
    }
    function p(C) {
      return C === a.charCodeAt(l++) ? (e.consume(C), l === a.length ? r.interrupt ? t : I : p) : n(C);
    }
    function h(C) {
      return qn(C) ? (e.consume(C), a = String.fromCharCode(C), m) : n(C);
    }
    function m(C) {
      return C === null || C === 47 || C === 62 || mn(C) ? C !== 47 && o && x1.includes(a.toLowerCase()) ? (i = 1, r.interrupt ? t(C) : I(C)) : yD.includes(a.toLowerCase()) ? (i = 6, C === 47 ? (e.consume(C), S) : r.interrupt ? t(C) : I(C)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : o ? v(C) : g(C)) : C === 45 || Xt(C) ? (e.consume(C), a += String.fromCharCode(C), m) : n(C);
    }
    function S(C) {
      return C === 62 ? (e.consume(C), r.interrupt ? t : I) : n(C);
    }
    function g(C) {
      return et(C) ? (e.consume(C), g) : T(C);
    }
    function v(C) {
      return C === 47 ? (e.consume(C), T) : C === 58 || C === 95 || qn(C) ? (e.consume(C), w) : et(C) ? (e.consume(C), v) : T(C);
    }
    function w(C) {
      return C === 45 || C === 46 || C === 58 || C === 95 || Xt(C) ? (e.consume(C), w) : E(C);
    }
    function E(C) {
      return C === 61 ? (e.consume(C), k) : et(C) ? (e.consume(C), E) : v(C);
    }
    function k(C) {
      return C === null || C === 60 || C === 61 || C === 62 || C === 96 ? n(C) : C === 34 || C === 39 ? (e.consume(C), s = C, b) : et(C) ? (e.consume(C), k) : (s = null, A(C));
    }
    function b(C) {
      return C === null || re(C) ? n(C) : C === s ? (e.consume(C), O) : (e.consume(C), b);
    }
    function A(C) {
      return C === null || C === 34 || C === 39 || C === 60 || C === 61 || C === 62 || C === 96 || mn(C) ? E(C) : (e.consume(C), A);
    }
    function O(C) {
      return C === 47 || C === 62 || et(C) ? v(C) : n(C);
    }
    function T(C) {
      return C === 62 ? (e.consume(C), P) : n(C);
    }
    function P(C) {
      return et(C) ? (e.consume(C), P) : C === null || re(C) ? I(C) : n(C);
    }
    function I(C) {
      return C === 45 && i === 2 ? (e.consume(C), oe) : C === 60 && i === 1 ? (e.consume(C), ne) : C === 62 && i === 4 ? (e.consume(C), G) : C === 63 && i === 3 ? (e.consume(C), V) : C === 93 && i === 5 ? (e.consume(C), B) : re(C) && (i === 6 || i === 7) ? e.check(
        bD,
        G,
        F
      )(C) : C === null || re(C) ? F(C) : (e.consume(C), I);
    }
    function F(C) {
      return e.exit("htmlFlowData"), U(C);
    }
    function U(C) {
      return C === null ? x(C) : re(C) ? e.attempt(
        {
          tokenize: X,
          partial: !0
        },
        U,
        x
      )(C) : (e.enter("htmlFlowData"), I(C));
    }
    function X(C, rt, Je) {
      return qe;
      function qe(We) {
        return C.enter("lineEnding"), C.consume(We), C.exit("lineEnding"), me;
      }
      function me(We) {
        return r.parser.lazy[r.now().line] ? Je(We) : rt(We);
      }
    }
    function oe(C) {
      return C === 45 ? (e.consume(C), V) : I(C);
    }
    function ne(C) {
      return C === 47 ? (e.consume(C), a = "", fe) : I(C);
    }
    function fe(C) {
      return C === 62 && x1.includes(a.toLowerCase()) ? (e.consume(C), G) : qn(C) && a.length < 8 ? (e.consume(C), a += String.fromCharCode(C), fe) : I(C);
    }
    function B(C) {
      return C === 93 ? (e.consume(C), V) : I(C);
    }
    function V(C) {
      return C === 62 ? (e.consume(C), G) : C === 45 && i === 2 ? (e.consume(C), V) : I(C);
    }
    function G(C) {
      return C === null || re(C) ? (e.exit("htmlFlowData"), x(C)) : (e.consume(C), G);
    }
    function x(C) {
      return e.exit("htmlFlow"), t(C);
    }
  }
  function AD(e, t, n) {
    return r;
    function r(i) {
      return e.exit("htmlFlowData"), e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), e.attempt(vf, t, n);
    }
  }
  const CD = {
    name: "htmlText",
    tokenize: xD
  };
  function xD(e, t, n) {
    const r = this;
    let i, o, a, l;
    return s;
    function s(x) {
      return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), u;
    }
    function u(x) {
      return x === 33 ? (e.consume(x), c) : x === 47 ? (e.consume(x), A) : x === 63 ? (e.consume(x), k) : qn(x) ? (e.consume(x), P) : n(x);
    }
    function c(x) {
      return x === 45 ? (e.consume(x), f) : x === 91 ? (e.consume(x), o = "CDATA[", a = 0, S) : qn(x) ? (e.consume(x), E) : n(x);
    }
    function f(x) {
      return x === 45 ? (e.consume(x), d) : n(x);
    }
    function d(x) {
      return x === null || x === 62 ? n(x) : x === 45 ? (e.consume(x), p) : h(x);
    }
    function p(x) {
      return x === null || x === 62 ? n(x) : h(x);
    }
    function h(x) {
      return x === null ? n(x) : x === 45 ? (e.consume(x), m) : re(x) ? (l = h, B(x)) : (e.consume(x), h);
    }
    function m(x) {
      return x === 45 ? (e.consume(x), G) : h(x);
    }
    function S(x) {
      return x === o.charCodeAt(a++) ? (e.consume(x), a === o.length ? g : S) : n(x);
    }
    function g(x) {
      return x === null ? n(x) : x === 93 ? (e.consume(x), v) : re(x) ? (l = g, B(x)) : (e.consume(x), g);
    }
    function v(x) {
      return x === 93 ? (e.consume(x), w) : g(x);
    }
    function w(x) {
      return x === 62 ? G(x) : x === 93 ? (e.consume(x), w) : g(x);
    }
    function E(x) {
      return x === null || x === 62 ? G(x) : re(x) ? (l = E, B(x)) : (e.consume(x), E);
    }
    function k(x) {
      return x === null ? n(x) : x === 63 ? (e.consume(x), b) : re(x) ? (l = k, B(x)) : (e.consume(x), k);
    }
    function b(x) {
      return x === 62 ? G(x) : k(x);
    }
    function A(x) {
      return qn(x) ? (e.consume(x), O) : n(x);
    }
    function O(x) {
      return x === 45 || Xt(x) ? (e.consume(x), O) : T(x);
    }
    function T(x) {
      return re(x) ? (l = T, B(x)) : et(x) ? (e.consume(x), T) : G(x);
    }
    function P(x) {
      return x === 45 || Xt(x) ? (e.consume(x), P) : x === 47 || x === 62 || mn(x) ? I(x) : n(x);
    }
    function I(x) {
      return x === 47 ? (e.consume(x), G) : x === 58 || x === 95 || qn(x) ? (e.consume(x), F) : re(x) ? (l = I, B(x)) : et(x) ? (e.consume(x), I) : G(x);
    }
    function F(x) {
      return x === 45 || x === 46 || x === 58 || x === 95 || Xt(x) ? (e.consume(x), F) : U(x);
    }
    function U(x) {
      return x === 61 ? (e.consume(x), X) : re(x) ? (l = U, B(x)) : et(x) ? (e.consume(x), U) : I(x);
    }
    function X(x) {
      return x === null || x === 60 || x === 61 || x === 62 || x === 96 ? n(x) : x === 34 || x === 39 ? (e.consume(x), i = x, oe) : re(x) ? (l = X, B(x)) : et(x) ? (e.consume(x), X) : (e.consume(x), i = void 0, fe);
    }
    function oe(x) {
      return x === i ? (e.consume(x), ne) : x === null ? n(x) : re(x) ? (l = oe, B(x)) : (e.consume(x), oe);
    }
    function ne(x) {
      return x === 62 || x === 47 || mn(x) ? I(x) : n(x);
    }
    function fe(x) {
      return x === null || x === 34 || x === 39 || x === 60 || x === 61 || x === 96 ? n(x) : x === 62 || mn(x) ? I(x) : (e.consume(x), fe);
    }
    function B(x) {
      return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), Ce(
        e,
        V,
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      );
    }
    function V(x) {
      return e.enter("htmlTextData"), l(x);
    }
    function G(x) {
      return x === 62 ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(x);
    }
  }
  const fg = {
    name: "labelEnd",
    tokenize: PD,
    resolveTo: TD,
    resolveAll: ID
  }, kD = {
    tokenize: ND
  }, _D = {
    tokenize: DD
  }, OD = {
    tokenize: RD
  };
  function ID(e) {
    let t = -1, n;
    for (; ++t < e.length; )
      n = e[t][1], (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
    return e;
  }
  function TD(e, t) {
    let n = e.length, r = 0, i, o, a, l;
    for (; n--; )
      if (i = e[n][1], o) {
        if (i.type === "link" || i.type === "labelLink" && i._inactive)
          break;
        e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
      } else if (a) {
        if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
          r = 2;
          break;
        }
      } else
        i.type === "labelEnd" && (a = n);
    const s = {
      type: e[o][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, e[o][1].start),
      end: Object.assign({}, e[e.length - 1][1].end)
    }, u = {
      type: "label",
      start: Object.assign({}, e[o][1].start),
      end: Object.assign({}, e[a][1].end)
    }, c = {
      type: "labelText",
      start: Object.assign({}, e[o + r + 2][1].end),
      end: Object.assign({}, e[a - 2][1].start)
    };
    return l = [
      ["enter", s, t],
      ["enter", u, t]
    ], l = fn(l, e.slice(o + 1, o + r + 3)), l = fn(l, [["enter", c, t]]), l = fn(
      l,
      ug(
        t.parser.constructs.insideSpan.null,
        e.slice(o + r + 4, a - 3),
        t
      )
    ), l = fn(l, [
      ["exit", c, t],
      e[a - 2],
      e[a - 1],
      ["exit", u, t]
    ]), l = fn(l, e.slice(a + 1)), l = fn(l, [["exit", s, t]]), ir(e, o, e.length, l), e;
  }
  function PD(e, t, n) {
    const r = this;
    let i = r.events.length, o, a;
    for (; i--; )
      if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
        o = r.events[i][1];
        break;
      }
    return l;
    function l(c) {
      return o ? o._inactive ? u(c) : (a = r.parser.defined.includes(
        Fo(
          r.sliceSerialize({
            start: o.end,
            end: r.now()
          })
        )
      ), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(c), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(c);
    }
    function s(c) {
      return c === 40 ? e.attempt(
        kD,
        t,
        a ? t : u
      )(c) : c === 91 ? e.attempt(
        _D,
        t,
        a ? e.attempt(OD, t, u) : u
      )(c) : a ? t(c) : u(c);
    }
    function u(c) {
      return o._balanced = !0, n(c);
    }
  }
  function ND(e, t, n) {
    return r;
    function r(s) {
      return e.enter("resource"), e.enter("resourceMarker"), e.consume(s), e.exit("resourceMarker"), fl(e, i);
    }
    function i(s) {
      return s === 41 ? l(s) : WE(
        e,
        o,
        n,
        "resourceDestination",
        "resourceDestinationLiteral",
        "resourceDestinationLiteralMarker",
        "resourceDestinationRaw",
        "resourceDestinationString",
        32
      )(s);
    }
    function o(s) {
      return mn(s) ? fl(e, a)(s) : l(s);
    }
    function a(s) {
      return s === 34 || s === 39 || s === 40 ? VE(
        e,
        fl(e, l),
        n,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString"
      )(s) : l(s);
    }
    function l(s) {
      return s === 41 ? (e.enter("resourceMarker"), e.consume(s), e.exit("resourceMarker"), e.exit("resource"), t) : n(s);
    }
  }
  function DD(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return YE.call(
        r,
        e,
        o,
        n,
        "reference",
        "referenceMarker",
        "referenceString"
      )(a);
    }
    function o(a) {
      return r.parser.defined.includes(
        Fo(
          r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
        )
      ) ? t(a) : n(a);
    }
  }
  function RD(e, t, n) {
    return r;
    function r(o) {
      return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
    }
    function i(o) {
      return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
    }
  }
  const LD = {
    name: "labelStartImage",
    tokenize: MD,
    resolveAll: fg.resolveAll
  };
  function MD(e, t, n) {
    const r = this;
    return i;
    function i(l) {
      return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(l), e.exit("labelImageMarker"), o;
    }
    function o(l) {
      return l === 91 ? (e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelImage"), a) : n(l);
    }
    function a(l) {
      return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
    }
  }
  const FD = {
    name: "labelStartLink",
    tokenize: BD,
    resolveAll: fg.resolveAll
  };
  function BD(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), o;
    }
    function o(a) {
      return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
    }
  }
  const Rd = {
    name: "lineEnding",
    tokenize: UD
  };
  function UD(e, t) {
    return n;
    function n(r) {
      return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Ce(e, t, "linePrefix");
    }
  }
  const mu = {
    name: "thematicBreak",
    tokenize: zD
  };
  function zD(e, t, n) {
    let r = 0, i;
    return o;
    function o(s) {
      return e.enter("thematicBreak"), i = s, a(s);
    }
    function a(s) {
      return s === i ? (e.enter("thematicBreakSequence"), l(s)) : et(s) ? Ce(e, a, "whitespace")(s) : r < 3 || s !== null && !re(s) ? n(s) : (e.exit("thematicBreak"), t(s));
    }
    function l(s) {
      return s === i ? (e.consume(s), r++, l) : (e.exit("thematicBreakSequence"), a(s));
    }
  }
  const Nt = {
    name: "list",
    tokenize: YD,
    continuation: {
      tokenize: VD
    },
    exit: HD
  }, jD = {
    tokenize: GD,
    partial: !0
  }, WD = {
    tokenize: $D,
    partial: !0
  };
  function YD(e, t, n) {
    const r = this, i = r.events[r.events.length - 1];
    let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
    return l;
    function l(p) {
      const h = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
      if (h === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : wh(p)) {
        if (r.containerState.type || (r.containerState.type = h, e.enter(h, {
          _container: !0
        })), h === "listUnordered")
          return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(mu, n, u)(p) : u(p);
        if (!r.interrupt || p === 49)
          return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
      }
      return n(p);
    }
    function s(p) {
      return wh(p) && ++a < 10 ? (e.consume(p), s) : (!r.interrupt || a < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : n(p);
    }
    function u(p) {
      return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
        vf,
        // Can’t be empty when interrupting.
        r.interrupt ? n : c,
        e.attempt(
          jD,
          d,
          f
        )
      );
    }
    function c(p) {
      return r.containerState.initialBlankLine = !0, o++, d(p);
    }
    function f(p) {
      return et(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), d) : n(p);
    }
    function d(p) {
      return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
    }
  }
  function VD(e, t, n) {
    const r = this;
    return r.containerState._closeFlow = void 0, e.check(vf, i, o);
    function i(l) {
      return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Ce(
        e,
        t,
        "listItemIndent",
        r.containerState.size + 1
      )(l);
    }
    function o(l) {
      return r.containerState.furtherBlankLines || !et(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(WD, t, a)(l));
    }
    function a(l) {
      return r.containerState._closeFlow = !0, r.interrupt = void 0, Ce(
        e,
        e.attempt(Nt, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(l);
    }
  }
  function $D(e, t, n) {
    const r = this;
    return Ce(
      e,
      i,
      "listItemIndent",
      r.containerState.size + 1
    );
    function i(o) {
      const a = r.events[r.events.length - 1];
      return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === r.containerState.size ? t(o) : n(o);
    }
  }
  function HD(e) {
    e.exit(this.containerState.type);
  }
  function GD(e, t, n) {
    const r = this;
    return Ce(
      e,
      i,
      "listItemPrefixWhitespace",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
    );
    function i(o) {
      const a = r.events[r.events.length - 1];
      return !et(o) && a && a[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
    }
  }
  const k1 = {
    name: "setextUnderline",
    tokenize: QD,
    resolveTo: JD
  };
  function JD(e, t) {
    let n = e.length, r, i, o;
    for (; n--; )
      if (e[n][0] === "enter") {
        if (e[n][1].type === "content") {
          r = n;
          break;
        }
        e[n][1].type === "paragraph" && (i = n);
      } else
        e[n][1].type === "content" && e.splice(n, 1), !o && e[n][1].type === "definition" && (o = n);
    const a = {
      type: "setextHeading",
      start: Object.assign({}, e[i][1].start),
      end: Object.assign({}, e[e.length - 1][1].end)
    };
    return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", a, t]), e.splice(o + 1, 0, ["exit", e[r][1], t]), e[r][1].end = Object.assign({}, e[o][1].end)) : e[r][1] = a, e.push(["exit", a, t]), e;
  }
  function QD(e, t, n) {
    const r = this;
    let i = r.events.length, o, a;
    for (; i--; )
      if (r.events[i][1].type !== "lineEnding" && r.events[i][1].type !== "linePrefix" && r.events[i][1].type !== "content") {
        a = r.events[i][1].type === "paragraph";
        break;
      }
    return l;
    function l(c) {
      return !r.parser.lazy[r.now().line] && (r.interrupt || a) ? (e.enter("setextHeadingLine"), e.enter("setextHeadingLineSequence"), o = c, s(c)) : n(c);
    }
    function s(c) {
      return c === o ? (e.consume(c), s) : (e.exit("setextHeadingLineSequence"), Ce(e, u, "lineSuffix")(c));
    }
    function u(c) {
      return c === null || re(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
    }
  }
  const KD = {
    tokenize: qD
  };
  function qD(e) {
    const t = this, n = e.attempt(
      // Try to parse a blank line.
      vf,
      r,
      // Try to parse initial flow (essentially, only code).
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        Ce(
          e,
          e.attempt(
            this.parser.constructs.flow,
            i,
            e.attempt(iD, i)
          ),
          "linePrefix"
        )
      )
    );
    return n;
    function r(o) {
      if (o === null) {
        e.consume(o);
        return;
      }
      return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
    }
    function i(o) {
      if (o === null) {
        e.consume(o);
        return;
      }
      return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
    }
  }
  const XD = {
    resolveAll: HE()
  }, ZD = $E("string"), e5 = $E("text");
  function $E(e) {
    return {
      tokenize: t,
      resolveAll: HE(
        e === "text" ? t5 : void 0
      )
    };
    function t(n) {
      const r = this, i = this.parser.constructs[e], o = n.attempt(i, a, l);
      return a;
      function a(c) {
        return u(c) ? o(c) : l(c);
      }
      function l(c) {
        if (c === null) {
          n.consume(c);
          return;
        }
        return n.enter("data"), n.consume(c), s;
      }
      function s(c) {
        return u(c) ? (n.exit("data"), o(c)) : (n.consume(c), s);
      }
      function u(c) {
        if (c === null)
          return !0;
        const f = i[c];
        let d = -1;
        if (f)
          for (; ++d < f.length; ) {
            const p = f[d];
            if (!p.previous || p.previous.call(r, r.previous))
              return !0;
          }
        return !1;
      }
    }
  }
  function HE(e) {
    return t;
    function t(n, r) {
      let i = -1, o;
      for (; ++i <= n.length; )
        o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
      return e ? e(n, r) : n;
    }
  }
  function t5(e, t) {
    let n = 0;
    for (; ++n <= e.length; )
      if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
        const r = e[n - 1][1], i = t.sliceStream(r);
        let o = i.length, a = -1, l = 0, s;
        for (; o--; ) {
          const u = i[o];
          if (typeof u == "string") {
            for (a = u.length; u.charCodeAt(a - 1) === 32; )
              l++, a--;
            if (a)
              break;
            a = -1;
          } else if (u === -2)
            s = !0, l++;
          else if (u !== -1) {
            o++;
            break;
          }
        }
        if (l) {
          const u = {
            type: n === e.length || s || l < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              line: r.end.line,
              column: r.end.column - l,
              offset: r.end.offset - l,
              _index: r.start._index + o,
              _bufferIndex: o ? a : r.start._bufferIndex + a
            },
            end: Object.assign({}, r.end)
          };
          r.end = Object.assign({}, u.start), r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(
            n,
            0,
            ["enter", u, t],
            ["exit", u, t]
          ), n += 2);
        }
        n++;
      }
    return e;
  }
  function n5(e, t, n) {
    let r = Object.assign(
      n ? Object.assign({}, n) : {
        line: 1,
        column: 1,
        offset: 0
      },
      {
        _index: 0,
        _bufferIndex: -1
      }
    );
    const i = {}, o = [];
    let a = [], l = [];
    const s = {
      consume: v,
      enter: w,
      exit: E,
      attempt: A(k),
      check: A(b),
      interrupt: A(b, {
        interrupt: !0
      })
    }, u = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser: e,
      sliceStream: p,
      sliceSerialize: d,
      now: h,
      defineSkip: m,
      write: f
    };
    let c = t.tokenize.call(u, s);
    return t.resolveAll && o.push(t), u;
    function f(I) {
      return a = fn(a, I), S(), a[a.length - 1] !== null ? [] : (O(t, 0), u.events = ug(o, u.events, u), u.events);
    }
    function d(I, F) {
      return i5(p(I), F);
    }
    function p(I) {
      return r5(a, I);
    }
    function h() {
      return Object.assign({}, r);
    }
    function m(I) {
      i[I.line] = I.column, P();
    }
    function S() {
      let I;
      for (; r._index < a.length; ) {
        const F = a[r._index];
        if (typeof F == "string")
          for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < F.length; )
            g(F.charCodeAt(r._bufferIndex));
        else
          g(F);
      }
    }
    function g(I) {
      c = c(I);
    }
    function v(I) {
      re(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, P()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = I;
    }
    function w(I, F) {
      const U = F || {};
      return U.type = I, U.start = h(), u.events.push(["enter", U, u]), l.push(U), U;
    }
    function E(I) {
      const F = l.pop();
      return F.end = h(), u.events.push(["exit", F, u]), F;
    }
    function k(I, F) {
      O(I, F.from);
    }
    function b(I, F) {
      F.restore();
    }
    function A(I, F) {
      return U;
      function U(X, oe, ne) {
        let fe, B, V, G;
        return Array.isArray(X) ? (
          /* c8 ignore next 1 */
          C(X)
        ) : "tokenize" in X ? C([X]) : x(X);
        function x(me) {
          return We;
          function We(ut) {
            const _n = ut !== null && me[ut], On = ut !== null && me.null, Ci = [
              // To do: add more extension tests.
              /* c8 ignore next 2 */
              ...Array.isArray(_n) ? _n : _n ? [_n] : [],
              ...Array.isArray(On) ? On : On ? [On] : []
            ];
            return C(Ci)(ut);
          }
        }
        function C(me) {
          return fe = me, B = 0, me.length === 0 ? ne : rt(me[B]);
        }
        function rt(me) {
          return We;
          function We(ut) {
            return G = T(), V = me, me.partial || (u.currentConstruct = me), me.name && u.parser.constructs.disable.null.includes(me.name) ? qe() : me.tokenize.call(
              // If we do have fields, create an object w/ `context` as its
              // prototype.
              // This allows a “live binding”, which is needed for `interrupt`.
              F ? Object.assign(Object.create(u), F) : u,
              s,
              Je,
              qe
            )(ut);
          }
        }
        function Je(me) {
          return I(V, G), oe;
        }
        function qe(me) {
          return G.restore(), ++B < fe.length ? rt(fe[B]) : ne;
        }
      }
    }
    function O(I, F) {
      I.resolveAll && !o.includes(I) && o.push(I), I.resolve && ir(
        u.events,
        F,
        u.events.length - F,
        I.resolve(u.events.slice(F), u)
      ), I.resolveTo && (u.events = I.resolveTo(u.events, u));
    }
    function T() {
      const I = h(), F = u.previous, U = u.currentConstruct, X = u.events.length, oe = Array.from(l);
      return {
        restore: ne,
        from: X
      };
      function ne() {
        r = I, u.previous = F, u.currentConstruct = U, u.events.length = X, l = oe, P();
      }
    }
    function P() {
      r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
    }
  }
  function r5(e, t) {
    const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
    let a;
    return n === i ? a = [e[n].slice(r, o)] : (a = e.slice(n, i), r > -1 && (a[0] = a[0].slice(r)), o > 0 && a.push(e[i].slice(0, o))), a;
  }
  function i5(e, t) {
    let n = -1;
    const r = [];
    let i;
    for (; ++n < e.length; ) {
      const o = e[n];
      let a;
      if (typeof o == "string")
        a = o;
      else
        switch (o) {
          case -5: {
            a = "\r";
            break;
          }
          case -4: {
            a = `
`;
            break;
          }
          case -3: {
            a = `\r
`;
            break;
          }
          case -2: {
            a = t ? " " : "	";
            break;
          }
          case -1: {
            if (!t && i)
              continue;
            a = " ";
            break;
          }
          default:
            a = String.fromCharCode(o);
        }
      i = o === -2, r.push(a);
    }
    return r.join("");
  }
  const o5 = {
    [42]: Nt,
    [43]: Nt,
    [45]: Nt,
    [48]: Nt,
    [49]: Nt,
    [50]: Nt,
    [51]: Nt,
    [52]: Nt,
    [53]: Nt,
    [54]: Nt,
    [55]: Nt,
    [56]: Nt,
    [57]: Nt,
    [62]: BE
  }, a5 = {
    [91]: uD
  }, l5 = {
    [-2]: Dd,
    [-1]: Dd,
    [32]: Dd
  }, s5 = {
    [35]: mD,
    [42]: mu,
    [45]: [k1, mu],
    [60]: wD,
    [61]: k1,
    [95]: mu,
    [96]: C1,
    [126]: C1
  }, u5 = {
    [38]: zE,
    [92]: UE
  }, c5 = {
    [-5]: Rd,
    [-4]: Rd,
    [-3]: Rd,
    [33]: LD,
    [38]: zE,
    [42]: Sh,
    [60]: [jN, CD],
    [91]: FD,
    [92]: [pD, UE],
    [93]: fg,
    [95]: Sh,
    [96]: ZN
  }, f5 = {
    null: [Sh, XD]
  }, d5 = {
    null: [42, 95]
  }, p5 = {
    null: []
  }, h5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    attentionMarkers: d5,
    contentInitial: a5,
    disable: p5,
    document: o5,
    flow: s5,
    flowInitial: l5,
    insideSpan: f5,
    string: u5,
    text: c5
  }, Symbol.toStringTag, { value: "Module" }));
  function m5(e = {}) {
    const t = kN(
      // @ts-expect-error Same as above.
      [h5].concat(e.extensions || [])
    ), n = {
      defined: [],
      lazy: {},
      constructs: t,
      content: r(RN),
      document: r(MN),
      flow: r(KD),
      string: r(ZD),
      text: r(e5)
    };
    return n;
    function r(i) {
      return o;
      function o(a) {
        return n5(n, i, a);
      }
    }
  }
  const _1 = /[\0\t\n\r]/g;
  function g5() {
    let e = 1, t = "", n = !0, r;
    return i;
    function i(o, a, l) {
      const s = [];
      let u, c, f, d, p;
      for (o = t + o.toString(a), f = 0, t = "", n && (o.charCodeAt(0) === 65279 && f++, n = void 0); f < o.length; ) {
        if (_1.lastIndex = f, u = _1.exec(o), d = u && u.index !== void 0 ? u.index : o.length, p = o.charCodeAt(d), !u) {
          t = o.slice(f);
          break;
        }
        if (p === 10 && f === d && r)
          s.push(-3), r = void 0;
        else
          switch (r && (s.push(-5), r = void 0), f < d && (s.push(o.slice(f, d)), e += d - f), p) {
            case 0: {
              s.push(65533), e++;
              break;
            }
            case 9: {
              for (c = Math.ceil(e / 4) * 4, s.push(-2); e++ < c; )
                s.push(-1);
              break;
            }
            case 10: {
              s.push(-4), e = 1;
              break;
            }
            default:
              r = !0, e = 1;
          }
        f = d + 1;
      }
      return l && (r && s.push(-5), t && s.push(t), s.push(null)), s;
    }
  }
  function v5(e) {
    for (; !jE(e); )
      ;
    return e;
  }
  function GE(e, t) {
    const n = Number.parseInt(e, t);
    return (
      // C0 except for HT, LF, FF, CR, space
      n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of the basic block and C1 controls.
      n > 126 && n < 160 || // Lone high surrogates and low surrogates.
      n > 55295 && n < 57344 || // Noncharacters.
      n > 64975 && n < 65008 || (n & 65535) === 65535 || (n & 65535) === 65534 || // Out of range
      n > 1114111 ? "�" : String.fromCharCode(n)
    );
  }
  const y5 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  function w5(e) {
    return e.replace(y5, b5);
  }
  function b5(e, t, n) {
    if (t)
      return t;
    if (n.charCodeAt(0) === 35) {
      const i = n.charCodeAt(1), o = i === 120 || i === 88;
      return GE(n.slice(o ? 2 : 1), o ? 16 : 10);
    }
    return cg(n) || e;
  }
  const JE = {}.hasOwnProperty, S5 = (
    /**
     * @type {(
     *   ((value: Value, encoding: Encoding, options?: Options | null | undefined) => Root) &
     *   ((value: Value, options?: Options | null | undefined) => Root)
     * )}
     */
    /**
     * @param {Value} value
     * @param {Encoding | Options | null | undefined} [encoding]
     * @param {Options | null | undefined} [options]
     * @returns {Root}
     */
    function(e, t, n) {
      return typeof t != "string" && (n = t, t = void 0), E5(n)(
        v5(
          // @ts-expect-error: micromark types need to accept `null`.
          m5(n).document().write(g5()(e, t, !0))
        )
      );
    }
  );
  function E5(e) {
    const t = {
      transforms: [],
      canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
      enter: {
        autolink: l(Vn),
        autolinkProtocol: I,
        autolinkEmail: I,
        atxHeading: l(ga),
        blockQuote: l(Ci),
        characterEscape: I,
        characterReference: I,
        codeFenced: l(bs),
        codeFencedFenceInfo: s,
        codeFencedFenceMeta: s,
        codeIndented: l(bs, s),
        codeText: l(Ss, s),
        codeTextData: I,
        data: I,
        codeFlowValue: I,
        definition: l(Lf),
        definitionDestinationString: s,
        definitionLabelString: s,
        definitionTitleString: s,
        emphasis: l(Mf),
        hardBreakEscape: l(va),
        hardBreakTrailing: l(va),
        htmlFlow: l(Es, s),
        htmlFlowData: I,
        htmlText: l(Es, s),
        htmlTextData: I,
        image: l(Ff),
        label: s,
        link: l(Vn),
        listItem: l(As),
        listItemValue: h,
        listOrdered: l(xi, p),
        listUnordered: l(xi),
        paragraph: l(Cs),
        reference: qe,
        referenceString: s,
        resourceDestinationString: s,
        resourceTitleString: s,
        setextHeading: l(ga),
        strong: l(ya),
        thematicBreak: l(ks)
      },
      exit: {
        atxHeading: c(),
        atxHeadingSequence: A,
        autolink: c(),
        autolinkEmail: On,
        autolinkProtocol: _n,
        blockQuote: c(),
        characterEscapeValue: F,
        characterReferenceMarkerHexadecimal: We,
        characterReferenceMarkerNumeric: We,
        characterReferenceValue: ut,
        codeFenced: c(v),
        codeFencedFence: g,
        codeFencedFenceInfo: m,
        codeFencedFenceMeta: S,
        codeFlowValue: F,
        codeIndented: c(w),
        codeText: c(fe),
        codeTextData: F,
        data: F,
        definition: c(),
        definitionDestinationString: b,
        definitionLabelString: E,
        definitionTitleString: k,
        emphasis: c(),
        hardBreakEscape: c(X),
        hardBreakTrailing: c(X),
        htmlFlow: c(oe),
        htmlFlowData: F,
        htmlText: c(ne),
        htmlTextData: F,
        image: c(V),
        label: x,
        labelText: G,
        lineEnding: U,
        link: c(B),
        listItem: c(),
        listOrdered: c(),
        listUnordered: c(),
        paragraph: c(),
        referenceString: me,
        resourceDestinationString: C,
        resourceTitleString: rt,
        resource: Je,
        setextHeading: c(P),
        setextHeadingLineSequence: T,
        setextHeadingText: O,
        strong: c(),
        thematicBreak: c()
      }
    };
    QE(t, (e || {}).mdastExtensions || []);
    const n = {};
    return r;
    function r(R) {
      let W = {
        type: "root",
        children: []
      };
      const te = {
        stack: [W],
        tokenStack: [],
        config: t,
        enter: u,
        exit: f,
        buffer: s,
        resume: d,
        setData: o,
        getData: a
      }, Ee = [];
      let Ae = -1;
      for (; ++Ae < R.length; )
        if (R[Ae][1].type === "listOrdered" || R[Ae][1].type === "listUnordered")
          if (R[Ae][0] === "enter")
            Ee.push(Ae);
          else {
            const In = Ee.pop();
            Ae = i(R, In, Ae);
          }
      for (Ae = -1; ++Ae < R.length; ) {
        const In = t[R[Ae][0]];
        JE.call(In, R[Ae][1].type) && In[R[Ae][1].type].call(
          Object.assign(
            {
              sliceSerialize: R[Ae][2].sliceSerialize
            },
            te
          ),
          R[Ae][1]
        );
      }
      if (te.tokenStack.length > 0) {
        const In = te.tokenStack[te.tokenStack.length - 1];
        (In[1] || O1).call(te, void 0, In[0]);
      }
      for (W.position = {
        start: Fr(
          R.length > 0 ? R[0][1].start : {
            line: 1,
            column: 1,
            offset: 0
          }
        ),
        end: Fr(
          R.length > 0 ? R[R.length - 2][1].end : {
            line: 1,
            column: 1,
            offset: 0
          }
        )
      }, Ae = -1; ++Ae < t.transforms.length; )
        W = t.transforms[Ae](W) || W;
      return W;
    }
    function i(R, W, te) {
      let Ee = W - 1, Ae = -1, In = !1, Lr, cr, wa, ba;
      for (; ++Ee <= te; ) {
        const Qe = R[Ee];
        if (Qe[1].type === "listUnordered" || Qe[1].type === "listOrdered" || Qe[1].type === "blockQuote" ? (Qe[0] === "enter" ? Ae++ : Ae--, ba = void 0) : Qe[1].type === "lineEndingBlank" ? Qe[0] === "enter" && (Lr && !ba && !Ae && !wa && (wa = Ee), ba = void 0) : Qe[1].type === "linePrefix" || Qe[1].type === "listItemValue" || Qe[1].type === "listItemMarker" || Qe[1].type === "listItemPrefix" || Qe[1].type === "listItemPrefixWhitespace" || (ba = void 0), !Ae && Qe[0] === "enter" && Qe[1].type === "listItemPrefix" || Ae === -1 && Qe[0] === "exit" && (Qe[1].type === "listUnordered" || Qe[1].type === "listOrdered")) {
          if (Lr) {
            let Bf = Ee;
            for (cr = void 0; Bf--; ) {
              const fr = R[Bf];
              if (fr[1].type === "lineEnding" || fr[1].type === "lineEndingBlank") {
                if (fr[0] === "exit")
                  continue;
                cr && (R[cr][1].type = "lineEndingBlank", In = !0), fr[1].type = "lineEnding", cr = Bf;
              } else if (!(fr[1].type === "linePrefix" || fr[1].type === "blockQuotePrefix" || fr[1].type === "blockQuotePrefixWhitespace" || fr[1].type === "blockQuoteMarker" || fr[1].type === "listItemIndent"))
                break;
            }
            wa && (!cr || wa < cr) && (Lr._spread = !0), Lr.end = Object.assign(
              {},
              cr ? R[cr][1].start : Qe[1].end
            ), R.splice(cr || Ee, 0, ["exit", Lr, Qe[2]]), Ee++, te++;
          }
          Qe[1].type === "listItemPrefix" && (Lr = {
            type: "listItem",
            // @ts-expect-error Patched
            _spread: !1,
            start: Object.assign({}, Qe[1].start)
          }, R.splice(Ee, 0, ["enter", Lr, Qe[2]]), Ee++, te++, wa = void 0, ba = !0);
        }
      }
      return R[W][1]._spread = In, te;
    }
    function o(R, W) {
      n[R] = W;
    }
    function a(R) {
      return n[R];
    }
    function l(R, W) {
      return te;
      function te(Ee) {
        u.call(this, R(Ee), Ee), W && W.call(this, Ee);
      }
    }
    function s() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function u(R, W, te) {
      return this.stack[this.stack.length - 1].children.push(R), this.stack.push(R), this.tokenStack.push([W, te]), R.position = {
        start: Fr(W.start)
      }, R;
    }
    function c(R) {
      return W;
      function W(te) {
        R && R.call(this, te), f.call(this, te);
      }
    }
    function f(R, W) {
      const te = this.stack.pop(), Ee = this.tokenStack.pop();
      if (Ee)
        Ee[0].type !== R.type && (W ? W.call(this, R, Ee[0]) : (Ee[1] || O1).call(this, R, Ee[0]));
      else
        throw new Error(
          "Cannot close `" + R.type + "` (" + cl({
            start: R.start,
            end: R.end
          }) + "): it’s not open"
        );
      return te.position.end = Fr(R.end), te;
    }
    function d() {
      return CN(this.stack.pop());
    }
    function p() {
      o("expectingFirstListItemValue", !0);
    }
    function h(R) {
      if (a("expectingFirstListItemValue")) {
        const W = this.stack[this.stack.length - 2];
        W.start = Number.parseInt(this.sliceSerialize(R), 10), o("expectingFirstListItemValue");
      }
    }
    function m() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.lang = R;
    }
    function S() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.meta = R;
    }
    function g() {
      a("flowCodeInside") || (this.buffer(), o("flowCodeInside", !0));
    }
    function v() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.value = R.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), o("flowCodeInside");
    }
    function w() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.value = R.replace(/(\r?\n|\r)$/g, "");
    }
    function E(R) {
      const W = this.resume(), te = this.stack[this.stack.length - 1];
      te.label = W, te.identifier = Fo(
        this.sliceSerialize(R)
      ).toLowerCase();
    }
    function k() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.title = R;
    }
    function b() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.url = R;
    }
    function A(R) {
      const W = this.stack[this.stack.length - 1];
      if (!W.depth) {
        const te = this.sliceSerialize(R).length;
        W.depth = te;
      }
    }
    function O() {
      o("setextHeadingSlurpLineEnding", !0);
    }
    function T(R) {
      const W = this.stack[this.stack.length - 1];
      W.depth = this.sliceSerialize(R).charCodeAt(0) === 61 ? 1 : 2;
    }
    function P() {
      o("setextHeadingSlurpLineEnding");
    }
    function I(R) {
      const W = this.stack[this.stack.length - 1];
      let te = W.children[W.children.length - 1];
      (!te || te.type !== "text") && (te = xs(), te.position = {
        start: Fr(R.start)
      }, W.children.push(te)), this.stack.push(te);
    }
    function F(R) {
      const W = this.stack.pop();
      W.value += this.sliceSerialize(R), W.position.end = Fr(R.end);
    }
    function U(R) {
      const W = this.stack[this.stack.length - 1];
      if (a("atHardBreak")) {
        const te = W.children[W.children.length - 1];
        te.position.end = Fr(R.end), o("atHardBreak");
        return;
      }
      !a("setextHeadingSlurpLineEnding") && t.canContainEols.includes(W.type) && (I.call(this, R), F.call(this, R));
    }
    function X() {
      o("atHardBreak", !0);
    }
    function oe() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.value = R;
    }
    function ne() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.value = R;
    }
    function fe() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.value = R;
    }
    function B() {
      const R = this.stack[this.stack.length - 1];
      if (a("inReference")) {
        const W = a("referenceType") || "shortcut";
        R.type += "Reference", R.referenceType = W, delete R.url, delete R.title;
      } else
        delete R.identifier, delete R.label;
      o("referenceType");
    }
    function V() {
      const R = this.stack[this.stack.length - 1];
      if (a("inReference")) {
        const W = a("referenceType") || "shortcut";
        R.type += "Reference", R.referenceType = W, delete R.url, delete R.title;
      } else
        delete R.identifier, delete R.label;
      o("referenceType");
    }
    function G(R) {
      const W = this.sliceSerialize(R), te = this.stack[this.stack.length - 2];
      te.label = w5(W), te.identifier = Fo(W).toLowerCase();
    }
    function x() {
      const R = this.stack[this.stack.length - 1], W = this.resume(), te = this.stack[this.stack.length - 1];
      if (o("inReference", !0), te.type === "link") {
        const Ee = R.children;
        te.children = Ee;
      } else
        te.alt = W;
    }
    function C() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.url = R;
    }
    function rt() {
      const R = this.resume(), W = this.stack[this.stack.length - 1];
      W.title = R;
    }
    function Je() {
      o("inReference");
    }
    function qe() {
      o("referenceType", "collapsed");
    }
    function me(R) {
      const W = this.resume(), te = this.stack[this.stack.length - 1];
      te.label = W, te.identifier = Fo(
        this.sliceSerialize(R)
      ).toLowerCase(), o("referenceType", "full");
    }
    function We(R) {
      o("characterReferenceType", R.type);
    }
    function ut(R) {
      const W = this.sliceSerialize(R), te = a("characterReferenceType");
      let Ee;
      te ? (Ee = GE(
        W,
        te === "characterReferenceMarkerNumeric" ? 10 : 16
      ), o("characterReferenceType")) : Ee = cg(W);
      const Ae = this.stack.pop();
      Ae.value += Ee, Ae.position.end = Fr(R.end);
    }
    function _n(R) {
      F.call(this, R);
      const W = this.stack[this.stack.length - 1];
      W.url = this.sliceSerialize(R);
    }
    function On(R) {
      F.call(this, R);
      const W = this.stack[this.stack.length - 1];
      W.url = "mailto:" + this.sliceSerialize(R);
    }
    function Ci() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function bs() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function Ss() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function Lf() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function Mf() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function ga() {
      return {
        type: "heading",
        depth: void 0,
        children: []
      };
    }
    function va() {
      return {
        type: "break"
      };
    }
    function Es() {
      return {
        type: "html",
        value: ""
      };
    }
    function Ff() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function Vn() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function xi(R) {
      return {
        type: "list",
        ordered: R.type === "listOrdered",
        start: null,
        // @ts-expect-error Patched.
        spread: R._spread,
        children: []
      };
    }
    function As(R) {
      return {
        type: "listItem",
        // @ts-expect-error Patched.
        spread: R._spread,
        checked: null,
        children: []
      };
    }
    function Cs() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function ya() {
      return {
        type: "strong",
        children: []
      };
    }
    function xs() {
      return {
        type: "text",
        value: ""
      };
    }
    function ks() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function Fr(e) {
    return {
      line: e.line,
      column: e.column,
      offset: e.offset
    };
  }
  function QE(e, t) {
    let n = -1;
    for (; ++n < t.length; ) {
      const r = t[n];
      Array.isArray(r) ? QE(e, r) : A5(e, r);
    }
  }
  function A5(e, t) {
    let n;
    for (n in t)
      if (JE.call(t, n)) {
        if (n === "canContainEols") {
          const r = t[n];
          r && e[n].push(...r);
        } else if (n === "transforms") {
          const r = t[n];
          r && e[n].push(...r);
        } else if (n === "enter" || n === "exit") {
          const r = t[n];
          r && Object.assign(e[n], r);
        }
      }
  }
  function O1(e, t) {
    throw e ? new Error(
      "Cannot close `" + e.type + "` (" + cl({
        start: e.start,
        end: e.end
      }) + "): a different token (`" + t.type + "`, " + cl({
        start: t.start,
        end: t.end
      }) + ") is open"
    ) : new Error(
      "Cannot close document, a token (`" + t.type + "`, " + cl({
        start: t.start,
        end: t.end
      }) + ") is still open"
    );
  }
  function C5(e) {
    Object.assign(this, { Parser: (n) => {
      const r = (
        /** @type {Options} */
        this.data("settings")
      );
      return S5(
        n,
        Object.assign({}, r, e, {
          // Note: these options are not in the readme.
          // The goal is for them to be set by plugins on `data` instead of being
          // passed by users.
          extensions: this.data("micromarkExtensions") || [],
          mdastExtensions: this.data("fromMarkdownExtensions") || []
        })
      );
    } });
  }
  function x5(e, t) {
    const n = {
      type: "element",
      tagName: "blockquote",
      properties: {},
      children: e.wrap(e.all(t), !0)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function k5(e, t) {
    const n = { type: "element", tagName: "br", properties: {}, children: [] };
    return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
  }
  function _5(e, t) {
    const n = t.value ? t.value + `
` : "", r = t.lang ? t.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null, i = {};
    r && (i.className = ["language-" + r]);
    let o = {
      type: "element",
      tagName: "code",
      properties: i,
      children: [{ type: "text", value: n }]
    };
    return t.meta && (o.data = { meta: t.meta }), e.patch(t, o), o = e.applyData(t, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(t, o), o;
  }
  function O5(e, t) {
    const n = {
      type: "element",
      tagName: "del",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function I5(e, t) {
    const n = {
      type: "element",
      tagName: "em",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function pa(e) {
    const t = [];
    let n = -1, r = 0, i = 0;
    for (; ++n < e.length; ) {
      const o = e.charCodeAt(n);
      let a = "";
      if (o === 37 && Xt(e.charCodeAt(n + 1)) && Xt(e.charCodeAt(n + 2)))
        i = 2;
      else if (o < 128)
        /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (a = String.fromCharCode(o));
      else if (o > 55295 && o < 57344) {
        const l = e.charCodeAt(n + 1);
        o < 56320 && l > 56319 && l < 57344 ? (a = String.fromCharCode(o, l), i = 1) : a = "�";
      } else
        a = String.fromCharCode(o);
      a && (t.push(e.slice(r, n), encodeURIComponent(a)), r = n + i + 1, a = ""), i && (n += i, i = 0);
    }
    return t.join("") + e.slice(r);
  }
  function KE(e, t) {
    const n = String(t.identifier).toUpperCase(), r = pa(n.toLowerCase()), i = e.footnoteOrder.indexOf(n);
    let o;
    i === -1 ? (e.footnoteOrder.push(n), e.footnoteCounts[n] = 1, o = e.footnoteOrder.length) : (e.footnoteCounts[n]++, o = i + 1);
    const a = e.footnoteCounts[n], l = {
      type: "element",
      tagName: "a",
      properties: {
        href: "#" + e.clobberPrefix + "fn-" + r,
        id: e.clobberPrefix + "fnref-" + r + (a > 1 ? "-" + a : ""),
        dataFootnoteRef: !0,
        ariaDescribedBy: ["footnote-label"]
      },
      children: [{ type: "text", value: String(o) }]
    };
    e.patch(t, l);
    const s = {
      type: "element",
      tagName: "sup",
      properties: {},
      children: [l]
    };
    return e.patch(t, s), e.applyData(t, s);
  }
  function T5(e, t) {
    const n = e.footnoteById;
    let r = 1;
    for (; r in n; )
      r++;
    const i = String(r);
    return n[i] = {
      type: "footnoteDefinition",
      identifier: i,
      children: [{ type: "paragraph", children: t.children }],
      position: t.position
    }, KE(e, {
      type: "footnoteReference",
      identifier: i,
      position: t.position
    });
  }
  function P5(e, t) {
    const n = {
      type: "element",
      tagName: "h" + t.depth,
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function N5(e, t) {
    if (e.dangerous) {
      const n = { type: "raw", value: t.value };
      return e.patch(t, n), e.applyData(t, n);
    }
    return null;
  }
  function qE(e, t) {
    const n = t.referenceType;
    let r = "]";
    if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
      return { type: "text", value: "![" + t.alt + r };
    const i = e.all(t), o = i[0];
    o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
    const a = i[i.length - 1];
    return a && a.type === "text" ? a.value += r : i.push({ type: "text", value: r }), i;
  }
  function D5(e, t) {
    const n = e.definition(t.identifier);
    if (!n)
      return qE(e, t);
    const r = { src: pa(n.url || ""), alt: t.alt };
    n.title !== null && n.title !== void 0 && (r.title = n.title);
    const i = { type: "element", tagName: "img", properties: r, children: [] };
    return e.patch(t, i), e.applyData(t, i);
  }
  function R5(e, t) {
    const n = { src: pa(t.url) };
    t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
    const r = { type: "element", tagName: "img", properties: n, children: [] };
    return e.patch(t, r), e.applyData(t, r);
  }
  function L5(e, t) {
    const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
    e.patch(t, n);
    const r = {
      type: "element",
      tagName: "code",
      properties: {},
      children: [n]
    };
    return e.patch(t, r), e.applyData(t, r);
  }
  function M5(e, t) {
    const n = e.definition(t.identifier);
    if (!n)
      return qE(e, t);
    const r = { href: pa(n.url || "") };
    n.title !== null && n.title !== void 0 && (r.title = n.title);
    const i = {
      type: "element",
      tagName: "a",
      properties: r,
      children: e.all(t)
    };
    return e.patch(t, i), e.applyData(t, i);
  }
  function F5(e, t) {
    const n = { href: pa(t.url) };
    t.title !== null && t.title !== void 0 && (n.title = t.title);
    const r = {
      type: "element",
      tagName: "a",
      properties: n,
      children: e.all(t)
    };
    return e.patch(t, r), e.applyData(t, r);
  }
  function B5(e, t, n) {
    const r = e.all(t), i = n ? U5(n) : XE(t), o = {}, a = [];
    if (typeof t.checked == "boolean") {
      const c = r[0];
      let f;
      c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: t.checked, disabled: !0 },
        children: []
      }), o.className = ["task-list-item"];
    }
    let l = -1;
    for (; ++l < r.length; ) {
      const c = r[l];
      (i || l !== 0 || c.type !== "element" || c.tagName !== "p") && a.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? a.push(...c.children) : a.push(c);
    }
    const s = r[r.length - 1];
    s && (i || s.type !== "element" || s.tagName !== "p") && a.push({ type: "text", value: `
` });
    const u = { type: "element", tagName: "li", properties: o, children: a };
    return e.patch(t, u), e.applyData(t, u);
  }
  function U5(e) {
    let t = !1;
    if (e.type === "list") {
      t = e.spread || !1;
      const n = e.children;
      let r = -1;
      for (; !t && ++r < n.length; )
        t = XE(n[r]);
    }
    return t;
  }
  function XE(e) {
    const t = e.spread;
    return t == null ? e.children.length > 1 : t;
  }
  function z5(e, t) {
    const n = {}, r = e.all(t);
    let i = -1;
    for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
      const a = r[i];
      if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
        n.className = ["contains-task-list"];
        break;
      }
    }
    const o = {
      type: "element",
      tagName: t.ordered ? "ol" : "ul",
      properties: n,
      children: e.wrap(r, !0)
    };
    return e.patch(t, o), e.applyData(t, o);
  }
  function j5(e, t) {
    const n = {
      type: "element",
      tagName: "p",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function W5(e, t) {
    const n = { type: "root", children: e.wrap(e.all(t)) };
    return e.patch(t, n), e.applyData(t, n);
  }
  function Y5(e, t) {
    const n = {
      type: "element",
      tagName: "strong",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const dg = ZE("start"), pg = ZE("end");
  function V5(e) {
    return { start: dg(e), end: pg(e) };
  }
  function ZE(e) {
    return t;
    function t(n) {
      const r = n && n.position && n.position[e] || {};
      return {
        // @ts-expect-error: in practice, null is allowed.
        line: r.line || null,
        // @ts-expect-error: in practice, null is allowed.
        column: r.column || null,
        // @ts-expect-error: in practice, null is allowed.
        offset: r.offset > -1 ? r.offset : null
      };
    }
  }
  function $5(e, t) {
    const n = e.all(t), r = n.shift(), i = [];
    if (r) {
      const a = {
        type: "element",
        tagName: "thead",
        properties: {},
        children: e.wrap([r], !0)
      };
      e.patch(t.children[0], a), i.push(a);
    }
    if (n.length > 0) {
      const a = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(n, !0)
      }, l = dg(t.children[1]), s = pg(t.children[t.children.length - 1]);
      l.line && s.line && (a.position = { start: l, end: s }), i.push(a);
    }
    const o = {
      type: "element",
      tagName: "table",
      properties: {},
      children: e.wrap(i, !0)
    };
    return e.patch(t, o), e.applyData(t, o);
  }
  function H5(e, t, n) {
    const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, l = a ? a.length : t.children.length;
    let s = -1;
    const u = [];
    for (; ++s < l; ) {
      const f = t.children[s], d = {}, p = a ? a[s] : void 0;
      p && (d.align = p);
      let h = { type: "element", tagName: o, properties: d, children: [] };
      f && (h.children = e.all(f), e.patch(f, h), h = e.applyData(t, h)), u.push(h);
    }
    const c = {
      type: "element",
      tagName: "tr",
      properties: {},
      children: e.wrap(u, !0)
    };
    return e.patch(t, c), e.applyData(t, c);
  }
  function G5(e, t) {
    const n = {
      type: "element",
      tagName: "td",
      // Assume body cell.
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const I1 = 9, T1 = 32;
  function J5(e) {
    const t = String(e), n = /\r?\n|\r/g;
    let r = n.exec(t), i = 0;
    const o = [];
    for (; r; )
      o.push(
        P1(t.slice(i, r.index), i > 0, !0),
        r[0]
      ), i = r.index + r[0].length, r = n.exec(t);
    return o.push(P1(t.slice(i), i > 0, !1)), o.join("");
  }
  function P1(e, t, n) {
    let r = 0, i = e.length;
    if (t) {
      let o = e.codePointAt(r);
      for (; o === I1 || o === T1; )
        r++, o = e.codePointAt(r);
    }
    if (n) {
      let o = e.codePointAt(i - 1);
      for (; o === I1 || o === T1; )
        i--, o = e.codePointAt(i - 1);
    }
    return i > r ? e.slice(r, i) : "";
  }
  function Q5(e, t) {
    const n = { type: "text", value: J5(String(t.value)) };
    return e.patch(t, n), e.applyData(t, n);
  }
  function K5(e, t) {
    const n = {
      type: "element",
      tagName: "hr",
      properties: {},
      children: []
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const q5 = {
    blockquote: x5,
    break: k5,
    code: _5,
    delete: O5,
    emphasis: I5,
    footnoteReference: KE,
    footnote: T5,
    heading: P5,
    html: N5,
    imageReference: D5,
    image: R5,
    inlineCode: L5,
    linkReference: M5,
    link: F5,
    listItem: B5,
    list: z5,
    paragraph: j5,
    root: W5,
    strong: Y5,
    table: $5,
    tableCell: G5,
    tableRow: H5,
    text: Q5,
    thematicBreak: K5,
    toml: Hs,
    yaml: Hs,
    definition: Hs,
    footnoteDefinition: Hs
  };
  function Hs() {
    return null;
  }
  const eA = (
    /**
     * @type {(
     *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
     *   ((test?: Test) => AssertAnything)
     * )}
     */
    /**
     * @param {Test} [test]
     * @returns {AssertAnything}
     */
    function(e) {
      if (e == null)
        return tR;
      if (typeof e == "string")
        return eR(e);
      if (typeof e == "object")
        return Array.isArray(e) ? X5(e) : Z5(e);
      if (typeof e == "function")
        return yf(e);
      throw new Error("Expected function, string, or object as test");
    }
  );
  function X5(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.length; )
      t[n] = eA(e[n]);
    return yf(r);
    function r(...i) {
      let o = -1;
      for (; ++o < t.length; )
        if (t[o].call(this, ...i))
          return !0;
      return !1;
    }
  }
  function Z5(e) {
    return yf(t);
    function t(n) {
      let r;
      for (r in e)
        if (n[r] !== e[r])
          return !1;
      return !0;
    }
  }
  function eR(e) {
    return yf(t);
    function t(n) {
      return n && n.type === e;
    }
  }
  function yf(e) {
    return t;
    function t(n, ...r) {
      return Boolean(
        n && typeof n == "object" && "type" in n && // @ts-expect-error: fine.
        Boolean(e.call(this, n, ...r))
      );
    }
  }
  function tR() {
    return !0;
  }
  const nR = !0, N1 = !1, rR = "skip", iR = (
    /**
     * @type {(
     *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
     *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
     * )}
     */
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {Visitor<Node>} visitor
     * @param {boolean | null | undefined} [reverse]
     * @returns {void}
     */
    function(e, t, n, r) {
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null);
      const i = eA(t), o = r ? -1 : 1;
      a(e, void 0, [])();
      function a(l, s, u) {
        const c = l && typeof l == "object" ? l : {};
        if (typeof c.type == "string") {
          const d = (
            // `hast`
            typeof c.tagName == "string" ? c.tagName : (
              // `xast`
              typeof c.name == "string" ? c.name : void 0
            )
          );
          Object.defineProperty(f, "name", {
            value: "node (" + (l.type + (d ? "<" + d + ">" : "")) + ")"
          });
        }
        return f;
        function f() {
          let d = [], p, h, m;
          if ((!t || i(l, s, u[u.length - 1] || null)) && (d = oR(n(l, u)), d[0] === N1))
            return d;
          if (l.children && d[0] !== rR)
            for (h = (r ? l.children.length : -1) + o, m = u.concat(l); h > -1 && h < l.children.length; ) {
              if (p = a(l.children[h], h, m)(), p[0] === N1)
                return p;
              h = typeof p[1] == "number" ? p[1] : h + o;
            }
          return d;
        }
      }
    }
  );
  function oR(e) {
    return Array.isArray(e) ? e : typeof e == "number" ? [nR, e] : [e];
  }
  const tA = (
    /**
     * @type {(
     *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
     *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
     * )}
     */
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {Visitor} visitor
     * @param {boolean | null | undefined} [reverse]
     * @returns {void}
     */
    function(e, t, n, r) {
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), iR(e, t, i, r);
      function i(o, a) {
        const l = a[a.length - 1];
        return n(
          o,
          l ? l.children.indexOf(o) : null,
          l
        );
      }
    }
  );
  function aR(e) {
    return !e || !e.position || !e.position.start || !e.position.start.line || !e.position.start.column || !e.position.end || !e.position.end.line || !e.position.end.column;
  }
  const D1 = {}.hasOwnProperty;
  function lR(e) {
    const t = /* @__PURE__ */ Object.create(null);
    if (!e || !e.type)
      throw new Error("mdast-util-definitions expected node");
    return tA(e, "definition", (r) => {
      const i = R1(r.identifier);
      i && !D1.call(t, i) && (t[i] = r);
    }), n;
    function n(r) {
      const i = R1(r);
      return i && D1.call(t, i) ? t[i] : null;
    }
  }
  function R1(e) {
    return String(e || "").toUpperCase();
  }
  const sc = {}.hasOwnProperty;
  function sR(e, t) {
    const n = t || {}, r = n.allowDangerousHtml || !1, i = {};
    return a.dangerous = r, a.clobberPrefix = n.clobberPrefix === void 0 || n.clobberPrefix === null ? "user-content-" : n.clobberPrefix, a.footnoteLabel = n.footnoteLabel || "Footnotes", a.footnoteLabelTagName = n.footnoteLabelTagName || "h2", a.footnoteLabelProperties = n.footnoteLabelProperties || {
      className: ["sr-only"]
    }, a.footnoteBackLabel = n.footnoteBackLabel || "Back to content", a.unknownHandler = n.unknownHandler, a.passThrough = n.passThrough, a.handlers = M(M({}, q5), n.handlers), a.definition = lR(e), a.footnoteById = i, a.footnoteOrder = [], a.footnoteCounts = {}, a.patch = uR, a.applyData = cR, a.one = l, a.all = s, a.wrap = dR, a.augment = o, tA(e, "footnoteDefinition", (u) => {
      const c = String(u.identifier).toUpperCase();
      sc.call(i, c) || (i[c] = u);
    }), a;
    function o(u, c) {
      if (u && "data" in u && u.data) {
        const f = u.data;
        f.hName && (c.type !== "element" && (c = {
          type: "element",
          tagName: "",
          properties: {},
          children: []
        }), c.tagName = f.hName), c.type === "element" && f.hProperties && (c.properties = M(M({}, c.properties), f.hProperties)), "children" in c && c.children && f.hChildren && (c.children = f.hChildren);
      }
      if (u) {
        const f = "type" in u ? u : { position: u };
        aR(f) || (c.position = { start: dg(f), end: pg(f) });
      }
      return c;
    }
    function a(u, c, f, d) {
      return Array.isArray(f) && (d = f, f = {}), o(u, {
        type: "element",
        tagName: c,
        properties: f || {},
        children: d || []
      });
    }
    function l(u, c) {
      return nA(a, u, c);
    }
    function s(u) {
      return hg(a, u);
    }
  }
  function uR(e, t) {
    e.position && (t.position = V5(e));
  }
  function cR(e, t) {
    let n = t;
    if (e && e.data) {
      const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
      typeof r == "string" && (n.type === "element" ? n.tagName = r : n = {
        type: "element",
        tagName: r,
        properties: {},
        children: []
      }), n.type === "element" && o && (n.properties = M(M({}, n.properties), o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
    }
    return n;
  }
  function nA(e, t, n) {
    const r = t && t.type;
    if (!r)
      throw new Error("Expected node, got `" + t + "`");
    return sc.call(e.handlers, r) ? e.handlers[r](e, t, n) : e.passThrough && e.passThrough.includes(r) ? "children" in t ? H(M({}, t), { children: hg(e, t) }) : t : e.unknownHandler ? e.unknownHandler(e, t, n) : fR(e, t);
  }
  function hg(e, t) {
    const n = [];
    if ("children" in t) {
      const r = t.children;
      let i = -1;
      for (; ++i < r.length; ) {
        const o = nA(e, r[i], t);
        if (o) {
          if (i && r[i - 1].type === "break" && (!Array.isArray(o) && o.type === "text" && (o.value = o.value.replace(/^\s+/, "")), !Array.isArray(o) && o.type === "element")) {
            const a = o.children[0];
            a && a.type === "text" && (a.value = a.value.replace(/^\s+/, ""));
          }
          Array.isArray(o) ? n.push(...o) : n.push(o);
        }
      }
    }
    return n;
  }
  function fR(e, t) {
    const n = t.data || {}, r = "value" in t && !(sc.call(n, "hProperties") || sc.call(n, "hChildren")) ? { type: "text", value: t.value } : {
      type: "element",
      tagName: "div",
      properties: {},
      children: hg(e, t)
    };
    return e.patch(t, r), e.applyData(t, r);
  }
  function dR(e, t) {
    const n = [];
    let r = -1;
    for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
      r && n.push({ type: "text", value: `
` }), n.push(e[r]);
    return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
  }
  function pR(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.footnoteOrder.length; ) {
      const r = e.footnoteById[e.footnoteOrder[n]];
      if (!r)
        continue;
      const i = e.all(r), o = String(r.identifier).toUpperCase(), a = pa(o.toLowerCase());
      let l = 0;
      const s = [];
      for (; ++l <= e.footnoteCounts[o]; ) {
        const f = {
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + e.clobberPrefix + "fnref-" + a + (l > 1 ? "-" + l : ""),
            dataFootnoteBackref: !0,
            className: ["data-footnote-backref"],
            ariaLabel: e.footnoteBackLabel
          },
          children: [{ type: "text", value: "↩" }]
        };
        l > 1 && f.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(l) }]
        }), s.length > 0 && s.push({ type: "text", value: " " }), s.push(f);
      }
      const u = i[i.length - 1];
      if (u && u.type === "element" && u.tagName === "p") {
        const f = u.children[u.children.length - 1];
        f && f.type === "text" ? f.value += " " : u.children.push({ type: "text", value: " " }), u.children.push(...s);
      } else
        i.push(...s);
      const c = {
        type: "element",
        tagName: "li",
        properties: { id: e.clobberPrefix + "fn-" + a },
        children: e.wrap(i, !0)
      };
      e.patch(r, c), t.push(c);
    }
    if (t.length !== 0)
      return {
        type: "element",
        tagName: "section",
        properties: { dataFootnotes: !0, className: ["footnotes"] },
        children: [
          {
            type: "element",
            tagName: e.footnoteLabelTagName,
            properties: H(M({}, JSON.parse(JSON.stringify(e.footnoteLabelProperties))), {
              id: "footnote-label"
            }),
            children: [{ type: "text", value: e.footnoteLabel }]
          },
          { type: "text", value: `
` },
          {
            type: "element",
            tagName: "ol",
            properties: {},
            children: e.wrap(t, !0)
          },
          { type: "text", value: `
` }
        ]
      };
  }
  function rA(e, t) {
    const n = sR(e, t), r = n.one(e, null), i = pR(n);
    return i && r.children.push({ type: "text", value: `
` }, i), Array.isArray(r) ? { type: "root", children: r } : r;
  }
  const hR = (
    /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
    function(e, t) {
      return e && "run" in e ? gR(e, t) : vR(e || t);
    }
  ), mR = hR;
  function gR(e, t) {
    return (n, r, i) => {
      e.run(rA(n, t), r, (o) => {
        i(o);
      });
    };
  }
  function vR(e) {
    return (t) => rA(t, e);
  }
  class ps {
    /**
     * @constructor
     * @param {Properties} property
     * @param {Normal} normal
     * @param {string} [space]
     */
    constructor(t, n, r) {
      this.property = t, this.normal = n, r && (this.space = r);
    }
  }
  ps.prototype.property = {};
  ps.prototype.normal = {};
  ps.prototype.space = null;
  function iA(e, t) {
    const n = {}, r = {};
    let i = -1;
    for (; ++i < e.length; )
      Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
    return new ps(n, r, t);
  }
  function Eh(e) {
    return e.toLowerCase();
  }
  class Cn {
    /**
     * @constructor
     * @param {string} property
     * @param {string} attribute
     */
    constructor(t, n) {
      this.property = t, this.attribute = n;
    }
  }
  Cn.prototype.space = null;
  Cn.prototype.boolean = !1;
  Cn.prototype.booleanish = !1;
  Cn.prototype.overloadedBoolean = !1;
  Cn.prototype.number = !1;
  Cn.prototype.commaSeparated = !1;
  Cn.prototype.spaceSeparated = !1;
  Cn.prototype.commaOrSpaceSeparated = !1;
  Cn.prototype.mustUseProperty = !1;
  Cn.prototype.defined = !1;
  let yR = 0;
  const le = no(), Ze = no(), oA = no(), j = no(), Oe = no(), Bo = no(), Yt = no();
  function no() {
    return Bg(2, ++yR);
  }
  const Ah = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    boolean: le,
    booleanish: Ze,
    commaOrSpaceSeparated: Yt,
    commaSeparated: Bo,
    number: j,
    overloadedBoolean: oA,
    spaceSeparated: Oe
  }, Symbol.toStringTag, { value: "Module" })), Ld = Object.keys(Ah);
  class mg extends Cn {
    /**
     * @constructor
     * @param {string} property
     * @param {string} attribute
     * @param {number|null} [mask]
     * @param {string} [space]
     */
    constructor(t, n, r, i) {
      let o = -1;
      if (super(t, n), L1(this, "space", i), typeof r == "number")
        for (; ++o < Ld.length; ) {
          const a = Ld[o];
          L1(this, Ld[o], (r & Ah[a]) === Ah[a]);
        }
    }
  }
  mg.prototype.defined = !0;
  function L1(e, t, n) {
    n && (e[t] = n);
  }
  const wR = {}.hasOwnProperty;
  function ha(e) {
    const t = {}, n = {};
    let r;
    for (r in e.properties)
      if (wR.call(e.properties, r)) {
        const i = e.properties[r], o = new mg(
          r,
          e.transform(e.attributes || {}, r),
          i,
          e.space
        );
        e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[Eh(r)] = r, n[Eh(o.attribute)] = r;
      }
    return new ps(t, n, e.space);
  }
  const aA = ha({
    space: "xlink",
    transform(e, t) {
      return "xlink:" + t.slice(5).toLowerCase();
    },
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    }
  }), lA = ha({
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
  });
  function sA(e, t) {
    return t in e ? e[t] : t;
  }
  function uA(e, t) {
    return sA(e, t.toLowerCase());
  }
  const cA = ha({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: uA,
    properties: { xmlns: null, xmlnsXLink: null }
  }), fA = ha({
    transform(e, t) {
      return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: Ze,
      ariaAutoComplete: null,
      ariaBusy: Ze,
      ariaChecked: Ze,
      ariaColCount: j,
      ariaColIndex: j,
      ariaColSpan: j,
      ariaControls: Oe,
      ariaCurrent: null,
      ariaDescribedBy: Oe,
      ariaDetails: null,
      ariaDisabled: Ze,
      ariaDropEffect: Oe,
      ariaErrorMessage: null,
      ariaExpanded: Ze,
      ariaFlowTo: Oe,
      ariaGrabbed: Ze,
      ariaHasPopup: null,
      ariaHidden: Ze,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: Oe,
      ariaLevel: j,
      ariaLive: null,
      ariaModal: Ze,
      ariaMultiLine: Ze,
      ariaMultiSelectable: Ze,
      ariaOrientation: null,
      ariaOwns: Oe,
      ariaPlaceholder: null,
      ariaPosInSet: j,
      ariaPressed: Ze,
      ariaReadOnly: Ze,
      ariaRelevant: null,
      ariaRequired: Ze,
      ariaRoleDescription: Oe,
      ariaRowCount: j,
      ariaRowIndex: j,
      ariaRowSpan: j,
      ariaSelected: Ze,
      ariaSetSize: j,
      ariaSort: null,
      ariaValueMax: j,
      ariaValueMin: j,
      ariaValueNow: j,
      ariaValueText: null,
      role: null
    }
  }), bR = ha({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    transform: uA,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: Bo,
      acceptCharset: Oe,
      accessKey: Oe,
      action: null,
      allow: null,
      allowFullScreen: le,
      allowPaymentRequest: le,
      allowUserMedia: le,
      alt: null,
      as: null,
      async: le,
      autoCapitalize: null,
      autoComplete: Oe,
      autoFocus: le,
      autoPlay: le,
      capture: le,
      charSet: null,
      checked: le,
      cite: null,
      className: Oe,
      cols: j,
      colSpan: null,
      content: null,
      contentEditable: Ze,
      controls: le,
      controlsList: Oe,
      coords: j | Bo,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: le,
      defer: le,
      dir: null,
      dirName: null,
      disabled: le,
      download: oA,
      draggable: Ze,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: le,
      formTarget: null,
      headers: Oe,
      height: j,
      hidden: le,
      high: j,
      href: null,
      hrefLang: null,
      htmlFor: Oe,
      httpEquiv: Oe,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: le,
      itemId: null,
      itemProp: Oe,
      itemRef: Oe,
      itemScope: le,
      itemType: Oe,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: le,
      low: j,
      manifest: null,
      max: null,
      maxLength: j,
      media: null,
      method: null,
      min: null,
      minLength: j,
      multiple: le,
      muted: le,
      name: null,
      nonce: null,
      noModule: le,
      noValidate: le,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: le,
      optimum: j,
      pattern: null,
      ping: Oe,
      placeholder: null,
      playsInline: le,
      poster: null,
      preload: null,
      readOnly: le,
      referrerPolicy: null,
      rel: Oe,
      required: le,
      reversed: le,
      rows: j,
      rowSpan: j,
      sandbox: Oe,
      scope: null,
      scoped: le,
      seamless: le,
      selected: le,
      shape: null,
      size: j,
      sizes: null,
      slot: null,
      span: j,
      spellCheck: Ze,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: j,
      step: null,
      style: null,
      tabIndex: j,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: le,
      useMap: null,
      value: Ze,
      width: j,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: Oe,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: j,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: j,
      // `<body>`
      cellPadding: null,
      // `<table>`
      cellSpacing: null,
      // `<table>`
      char: null,
      // Several table elements. When `align=char`, sets the character to align on
      charOff: null,
      // Several table elements. When `char`, offsets the alignment
      classId: null,
      // `<object>`
      clear: null,
      // `<br>`. Use CSS `clear` instead
      code: null,
      // `<object>`
      codeBase: null,
      // `<object>`
      codeType: null,
      // `<object>`
      color: null,
      // `<font>` and `<hr>`. Use CSS instead
      compact: le,
      // Lists. Use CSS to reduce space between items instead
      declare: le,
      // `<object>`
      event: null,
      // `<script>`
      face: null,
      // `<font>`. Use CSS instead
      frame: null,
      // `<table>`
      frameBorder: null,
      // `<iframe>`. Use CSS `border` instead
      hSpace: j,
      // `<img>` and `<object>`
      leftMargin: j,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: j,
      // `<body>`
      marginWidth: j,
      // `<body>`
      noResize: le,
      // `<frame>`
      noHref: le,
      // `<area>`. Use no href instead of an explicit `nohref`
      noShade: le,
      // `<hr>`. Use background-color and height instead of borders
      noWrap: le,
      // `<td>` and `<th>`
      object: null,
      // `<applet>`
      profile: null,
      // `<head>`
      prompt: null,
      // `<isindex>`
      rev: null,
      // `<link>`
      rightMargin: j,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: Ze,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: j,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: j,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: le,
      disableRemotePlayback: le,
      prefix: null,
      property: null,
      results: j,
      security: null,
      unselectable: null
    }
  }), SR = ha({
    space: "svg",
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      // These were camelcased in Tiny. Now lowercased in SVG 2
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin"
    },
    transform: sA,
    properties: {
      about: Yt,
      accentHeight: j,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: j,
      amplitude: j,
      arabicForm: null,
      ascent: j,
      attributeName: null,
      attributeType: null,
      azimuth: j,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: j,
      by: null,
      calcMode: null,
      capHeight: j,
      className: Oe,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: j,
      diffuseConstant: j,
      direction: null,
      display: null,
      dur: null,
      divisor: j,
      dominantBaseline: null,
      download: le,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: j,
      enableBackground: null,
      end: null,
      event: null,
      exponent: j,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: j,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: Bo,
      g2: Bo,
      glyphName: Bo,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: j,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: j,
      horizOriginX: j,
      horizOriginY: j,
      id: null,
      ideographic: j,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: j,
      k: j,
      k1: j,
      k2: j,
      k3: j,
      k4: j,
      kernelMatrix: Yt,
      kernelUnitLength: null,
      keyPoints: null,
      // SEMI_COLON_SEPARATED
      keySplines: null,
      // SEMI_COLON_SEPARATED
      keyTimes: null,
      // SEMI_COLON_SEPARATED
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: j,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: j,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: j,
      overlineThickness: j,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: j,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: Oe,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: j,
      pointsAtY: j,
      pointsAtZ: j,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: Yt,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: Yt,
      rev: Yt,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: Yt,
      requiredFeatures: Yt,
      requiredFonts: Yt,
      requiredFormats: Yt,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: j,
      specularExponent: j,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: j,
      strikethroughThickness: j,
      string: null,
      stroke: null,
      strokeDashArray: Yt,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: j,
      strokeOpacity: j,
      strokeWidth: null,
      style: null,
      surfaceScale: j,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Yt,
      tabIndex: j,
      tableValues: null,
      target: null,
      targetX: j,
      targetY: j,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: Yt,
      to: null,
      transform: null,
      u1: null,
      u2: null,
      underlinePosition: j,
      underlineThickness: j,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: j,
      values: null,
      vAlphabetic: j,
      vMathematical: j,
      vectorEffect: null,
      vHanging: j,
      vIdeographic: j,
      version: null,
      vertAdvY: j,
      vertOriginX: j,
      vertOriginY: j,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: j,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null
    }
  }), ER = /^data[-\w.:]+$/i, M1 = /-[a-z]/g, AR = /[A-Z]/g;
  function CR(e, t) {
    const n = Eh(t);
    let r = t, i = Cn;
    if (n in e.normal)
      return e.property[e.normal[n]];
    if (n.length > 4 && n.slice(0, 4) === "data" && ER.test(t)) {
      if (t.charAt(4) === "-") {
        const o = t.slice(5).replace(M1, kR);
        r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
      } else {
        const o = t.slice(4);
        if (!M1.test(o)) {
          let a = o.replace(AR, xR);
          a.charAt(0) !== "-" && (a = "-" + a), t = "data" + a;
        }
      }
      i = mg;
    }
    return new i(r, t);
  }
  function xR(e) {
    return "-" + e.toLowerCase();
  }
  function kR(e) {
    return e.charAt(1).toUpperCase();
  }
  const F1 = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink"
  }, _R = iA([lA, aA, cA, fA, bR], "html"), OR = iA([lA, aA, cA, fA, SR], "svg"), dA = (
    /**
     * @type {(
     *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
     *   ((test?: Test) => AssertAnything)
     * )}
     */
    /**
     * @param {Test} [test]
     * @returns {AssertAnything}
     */
    function(e) {
      if (e == null)
        return NR;
      if (typeof e == "string")
        return PR(e);
      if (typeof e == "object")
        return Array.isArray(e) ? IR(e) : TR(e);
      if (typeof e == "function")
        return wf(e);
      throw new Error("Expected function, string, or object as test");
    }
  );
  function IR(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.length; )
      t[n] = dA(e[n]);
    return wf(r);
    function r(...i) {
      let o = -1;
      for (; ++o < t.length; )
        if (t[o].call(this, ...i))
          return !0;
      return !1;
    }
  }
  function TR(e) {
    return wf(t);
    function t(n) {
      let r;
      for (r in e)
        if (n[r] !== e[r])
          return !1;
      return !0;
    }
  }
  function PR(e) {
    return wf(t);
    function t(n) {
      return n && n.type === e;
    }
  }
  function wf(e) {
    return t;
    function t(n, ...r) {
      return Boolean(
        n && typeof n == "object" && "type" in n && // @ts-expect-error: fine.
        Boolean(e.call(this, n, ...r))
      );
    }
  }
  function NR() {
    return !0;
  }
  const DR = !0, B1 = !1, RR = "skip", LR = (
    /**
     * @type {(
     *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
     *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
     * )}
     */
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {Visitor<Node>} visitor
     * @param {boolean | null | undefined} [reverse]
     * @returns {void}
     */
    function(e, t, n, r) {
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null);
      const i = dA(t), o = r ? -1 : 1;
      a(e, void 0, [])();
      function a(l, s, u) {
        const c = l && typeof l == "object" ? l : {};
        if (typeof c.type == "string") {
          const d = (
            // `hast`
            typeof c.tagName == "string" ? c.tagName : (
              // `xast`
              typeof c.name == "string" ? c.name : void 0
            )
          );
          Object.defineProperty(f, "name", {
            value: "node (" + (l.type + (d ? "<" + d + ">" : "")) + ")"
          });
        }
        return f;
        function f() {
          let d = [], p, h, m;
          if ((!t || i(l, s, u[u.length - 1] || null)) && (d = MR(n(l, u)), d[0] === B1))
            return d;
          if (l.children && d[0] !== RR)
            for (h = (r ? l.children.length : -1) + o, m = u.concat(l); h > -1 && h < l.children.length; ) {
              if (p = a(l.children[h], h, m)(), p[0] === B1)
                return p;
              h = typeof p[1] == "number" ? p[1] : h + o;
            }
          return d;
        }
      }
    }
  );
  function MR(e) {
    return Array.isArray(e) ? e : typeof e == "number" ? [DR, e] : [e];
  }
  const FR = (
    /**
     * @type {(
     *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
     *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
     * )}
     */
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {Visitor} visitor
     * @param {boolean | null | undefined} [reverse]
     * @returns {void}
     */
    function(e, t, n, r) {
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), LR(e, t, i, r);
      function i(o, a) {
        const l = a[a.length - 1];
        return n(
          o,
          l ? l.children.indexOf(o) : null,
          l
        );
      }
    }
  );
  function BR(e) {
    if (e.allowedElements && e.disallowedElements)
      throw new TypeError(
        "Only one of `allowedElements` and `disallowedElements` should be defined"
      );
    if (e.allowedElements || e.disallowedElements || e.allowElement)
      return (t) => {
        FR(t, "element", (n, r, i) => {
          const o = (
            /** @type {Element|Root} */
            i
          );
          let a;
          if (e.allowedElements ? a = !e.allowedElements.includes(n.tagName) : e.disallowedElements && (a = e.disallowedElements.includes(n.tagName)), !a && e.allowElement && typeof r == "number" && (a = !e.allowElement(n, r, o)), a && typeof r == "number")
            return e.unwrapDisallowed && n.children ? o.children.splice(r, 1, ...n.children) : o.children.splice(r, 1), r;
        });
      };
  }
  var Ch = {}, UR = {
    get exports() {
      return Ch;
    },
    set exports(e) {
      Ch = e;
    }
  }, Se = {};
  /**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var gg = Symbol.for("react.element"), vg = Symbol.for("react.portal"), bf = Symbol.for("react.fragment"), Sf = Symbol.for("react.strict_mode"), Ef = Symbol.for("react.profiler"), Af = Symbol.for("react.provider"), Cf = Symbol.for("react.context"), zR = Symbol.for("react.server_context"), xf = Symbol.for("react.forward_ref"), kf = Symbol.for("react.suspense"), _f = Symbol.for("react.suspense_list"), Of = Symbol.for("react.memo"), If = Symbol.for("react.lazy"), jR = Symbol.for("react.offscreen"), pA;
  pA = Symbol.for("react.module.reference");
  function xn(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case gg:
          switch (e = e.type, e) {
            case bf:
            case Ef:
            case Sf:
            case kf:
            case _f:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case zR:
                case Cf:
                case xf:
                case If:
                case Of:
                case Af:
                  return e;
                default:
                  return t;
              }
          }
        case vg:
          return t;
      }
    }
  }
  Se.ContextConsumer = Cf;
  Se.ContextProvider = Af;
  Se.Element = gg;
  Se.ForwardRef = xf;
  Se.Fragment = bf;
  Se.Lazy = If;
  Se.Memo = Of;
  Se.Portal = vg;
  Se.Profiler = Ef;
  Se.StrictMode = Sf;
  Se.Suspense = kf;
  Se.SuspenseList = _f;
  Se.isAsyncMode = function() {
    return !1;
  };
  Se.isConcurrentMode = function() {
    return !1;
  };
  Se.isContextConsumer = function(e) {
    return xn(e) === Cf;
  };
  Se.isContextProvider = function(e) {
    return xn(e) === Af;
  };
  Se.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === gg;
  };
  Se.isForwardRef = function(e) {
    return xn(e) === xf;
  };
  Se.isFragment = function(e) {
    return xn(e) === bf;
  };
  Se.isLazy = function(e) {
    return xn(e) === If;
  };
  Se.isMemo = function(e) {
    return xn(e) === Of;
  };
  Se.isPortal = function(e) {
    return xn(e) === vg;
  };
  Se.isProfiler = function(e) {
    return xn(e) === Ef;
  };
  Se.isStrictMode = function(e) {
    return xn(e) === Sf;
  };
  Se.isSuspense = function(e) {
    return xn(e) === kf;
  };
  Se.isSuspenseList = function(e) {
    return xn(e) === _f;
  };
  Se.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === bf || e === Ef || e === Sf || e === kf || e === _f || e === jR || typeof e == "object" && e !== null && (e.$$typeof === If || e.$$typeof === Of || e.$$typeof === Af || e.$$typeof === Cf || e.$$typeof === xf || e.$$typeof === pA || e.getModuleId !== void 0);
  };
  Se.typeOf = xn;
  (function(e) {
    e.exports = Se;
  })(UR);
  const WR = /* @__PURE__ */ Bh(Ch);
  function YR(e) {
    const t = (
      // @ts-expect-error looks like a node.
      e && typeof e == "object" && e.type === "text" ? (
        // @ts-expect-error looks like a text.
        e.value || ""
      ) : e
    );
    return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
  }
  function VR(e) {
    return e.join(" ").trim();
  }
  function $R(e, t) {
    const n = t || {};
    return (e[e.length - 1] === "" ? [...e, ""] : e).join(
      (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
    ).trim();
  }
  var uc = {}, HR = {
    get exports() {
      return uc;
    },
    set exports(e) {
      uc = e;
    }
  }, U1 = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, GR = /\n/g, JR = /^\s*/, QR = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, KR = /^:\s*/, qR = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, XR = /^[;\s]*/, ZR = /^\s+|\s+$/g, e6 = `
`, z1 = "/", j1 = "*", Di = "", t6 = "comment", n6 = "declaration", r6 = function(e, t) {
    if (typeof e != "string")
      throw new TypeError("First argument must be a string");
    if (!e)
      return [];
    t = t || {};
    var n = 1, r = 1;
    function i(h) {
      var m = h.match(GR);
      m && (n += m.length);
      var S = h.lastIndexOf(e6);
      r = ~S ? h.length - S : r + h.length;
    }
    function o() {
      var h = { line: n, column: r };
      return function(m) {
        return m.position = new a(h), u(), m;
      };
    }
    function a(h) {
      this.start = h, this.end = { line: n, column: r }, this.source = t.source;
    }
    a.prototype.content = e;
    function l(h) {
      var m = new Error(
        t.source + ":" + n + ":" + r + ": " + h
      );
      if (m.reason = h, m.filename = t.source, m.line = n, m.column = r, m.source = e, !t.silent)
        throw m;
    }
    function s(h) {
      var m = h.exec(e);
      if (m) {
        var S = m[0];
        return i(S), e = e.slice(S.length), m;
      }
    }
    function u() {
      s(JR);
    }
    function c(h) {
      var m;
      for (h = h || []; m = f(); )
        m !== !1 && h.push(m);
      return h;
    }
    function f() {
      var h = o();
      if (!(z1 != e.charAt(0) || j1 != e.charAt(1))) {
        for (var m = 2; Di != e.charAt(m) && (j1 != e.charAt(m) || z1 != e.charAt(m + 1)); )
          ++m;
        if (m += 2, Di === e.charAt(m - 1))
          return l("End of comment missing");
        var S = e.slice(2, m - 2);
        return r += 2, i(S), e = e.slice(m), r += 2, h({
          type: t6,
          comment: S
        });
      }
    }
    function d() {
      var h = o(), m = s(QR);
      if (m) {
        if (f(), !s(KR))
          return l("property missing ':'");
        var S = s(qR), g = h({
          type: n6,
          property: W1(m[0].replace(U1, Di)),
          value: S ? W1(S[0].replace(U1, Di)) : Di
        });
        return s(XR), g;
      }
    }
    function p() {
      var h = [];
      c(h);
      for (var m; m = d(); )
        m !== !1 && (h.push(m), c(h));
      return h;
    }
    return u(), p();
  };
  function W1(e) {
    return e ? e.replace(ZR, Di) : Di;
  }
  var i6 = r6;
  function hA(e, t) {
    var n = null;
    if (!e || typeof e != "string")
      return n;
    for (var r, i = i6(e), o = typeof t == "function", a, l, s = 0, u = i.length; s < u; s++)
      r = i[s], a = r.property, l = r.value, o ? t(a, l, r) : l && (n || (n = {}), n[a] = l);
    return n;
  }
  HR.exports = hA;
  uc.default = hA;
  const o6 = uc, xh = {}.hasOwnProperty, a6 = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
  function mA(e, t) {
    const n = [];
    let r = -1, i;
    for (; ++r < t.children.length; )
      i = t.children[r], i.type === "element" ? n.push(l6(e, i, r, t)) : i.type === "text" ? (t.type !== "element" || !a6.has(t.tagName) || !YR(i)) && n.push(i.value) : i.type === "raw" && !e.options.skipHtml && n.push(i.value);
    return n;
  }
  function l6(e, t, n, r) {
    const i = e.options, o = i.transformLinkUri === void 0 ? aN : i.transformLinkUri, a = e.schema, l = t.tagName, s = {};
    let u = a, c;
    if (a.space === "html" && l === "svg" && (u = OR, e.schema = u), t.properties)
      for (c in t.properties)
        xh.call(t.properties, c) && u6(s, c, t.properties[c], e);
    (l === "ol" || l === "ul") && e.listDepth++;
    const f = mA(e, t);
    (l === "ol" || l === "ul") && e.listDepth--, e.schema = a;
    const d = t.position || {
      start: { line: null, column: null, offset: null },
      end: { line: null, column: null, offset: null }
    }, p = i.components && xh.call(i.components, l) ? i.components[l] : l, h = typeof p == "string" || p === _.Fragment;
    if (!WR.isValidElementType(p))
      throw new TypeError(
        `Component for name \`${l}\` not defined or is not renderable`
      );
    if (s.key = [
      l,
      d.start.line,
      d.start.column,
      n
    ].join("-"), l === "a" && i.linkTarget && (s.target = typeof i.linkTarget == "function" ? i.linkTarget(
      String(s.href || ""),
      t.children,
      typeof s.title == "string" ? s.title : null
    ) : i.linkTarget), l === "a" && o && (s.href = o(
      String(s.href || ""),
      t.children,
      typeof s.title == "string" ? s.title : null
    )), !h && l === "code" && r.type === "element" && r.tagName !== "pre" && (s.inline = !0), !h && (l === "h1" || l === "h2" || l === "h3" || l === "h4" || l === "h5" || l === "h6") && (s.level = Number.parseInt(l.charAt(1), 10)), l === "img" && i.transformImageUri && (s.src = i.transformImageUri(
      String(s.src || ""),
      String(s.alt || ""),
      typeof s.title == "string" ? s.title : null
    )), !h && l === "li" && r.type === "element") {
      const m = s6(t);
      s.checked = m && m.properties ? Boolean(m.properties.checked) : null, s.index = Md(r, t), s.ordered = r.tagName === "ol";
    }
    return !h && (l === "ol" || l === "ul") && (s.ordered = l === "ol", s.depth = e.listDepth), (l === "td" || l === "th") && (s.align && (s.style || (s.style = {}), s.style.textAlign = s.align, delete s.align), h || (s.isHeader = l === "th")), !h && l === "tr" && r.type === "element" && (s.isHeader = Boolean(r.tagName === "thead")), i.sourcePos && (s["data-sourcepos"] = d6(d)), !h && i.rawSourcePos && (s.sourcePosition = t.position), !h && i.includeElementIndex && (s.index = Md(r, t), s.siblingCount = Md(r)), h || (s.node = t), f.length > 0 ? _.createElement(p, s, f) : _.createElement(p, s);
  }
  function s6(e) {
    let t = -1;
    for (; ++t < e.children.length; ) {
      const n = e.children[t];
      if (n.type === "element" && n.tagName === "input")
        return n;
    }
    return null;
  }
  function Md(e, t) {
    let n = -1, r = 0;
    for (; ++n < e.children.length && e.children[n] !== t; )
      e.children[n].type === "element" && r++;
    return r;
  }
  function u6(e, t, n, r) {
    const i = CR(r.schema, t);
    let o = n;
    o == null || o !== o || (Array.isArray(o) && (o = i.commaSeparated ? $R(o) : VR(o)), i.property === "style" && typeof o == "string" && (o = c6(o)), i.space && i.property ? e[xh.call(F1, i.property) ? F1[i.property] : i.property] = o : i.attribute && (e[i.attribute] = o));
  }
  function c6(e) {
    const t = {};
    try {
      o6(e, n);
    } catch (r) {
    }
    return t;
    function n(r, i) {
      const o = r.slice(0, 4) === "-ms-" ? `ms-${r.slice(4)}` : r;
      t[o.replace(/-([a-z])/g, f6)] = i;
    }
  }
  function f6(e, t) {
    return t.toUpperCase();
  }
  function d6(e) {
    return [
      e.start.line,
      ":",
      e.start.column,
      "-",
      e.end.line,
      ":",
      e.end.column
    ].map(String).join("");
  }
  const Y1 = {}.hasOwnProperty, p6 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Gs = {
    plugins: { to: "remarkPlugins", id: "change-plugins-to-remarkplugins" },
    renderers: { to: "components", id: "change-renderers-to-components" },
    astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
    allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
    escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
    source: { to: "children", id: "change-source-to-children" },
    allowNode: {
      to: "allowElement",
      id: "replace-allownode-allowedtypes-and-disallowedtypes"
    },
    allowedTypes: {
      to: "allowedElements",
      id: "replace-allownode-allowedtypes-and-disallowedtypes"
    },
    disallowedTypes: {
      to: "disallowedElements",
      id: "replace-allownode-allowedtypes-and-disallowedtypes"
    },
    includeNodeIndex: {
      to: "includeElementIndex",
      id: "change-includenodeindex-to-includeelementindex"
    }
  };
  function gA(e) {
    for (const o in Gs)
      if (Y1.call(Gs, o) && Y1.call(e, o)) {
        const a = Gs[o];
        console.warn(
          `[react-markdown] Warning: please ${a.to ? `use \`${a.to}\` instead of` : "remove"} \`${o}\` (see <${p6}#${a.id}> for more info)`
        ), delete Gs[o];
      }
    const t = bN().use(C5).use(e.remarkPlugins || []).use(mR, H(M({}, e.remarkRehypeOptions), {
      allowDangerousHtml: !0
    })).use(e.rehypePlugins || []).use(BR, e), n = new DE();
    typeof e.children == "string" ? n.value = e.children : e.children !== void 0 && e.children !== null && console.warn(
      `[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`
    );
    const r = t.runSync(t.parse(n), n);
    if (r.type !== "root")
      throw new TypeError("Expected a `root` node");
    let i = _.createElement(
      _.Fragment,
      {},
      mA({ options: e, schema: _R, listDepth: 0 }, r)
    );
    return e.className && (i = _.createElement("div", { className: e.className }, i)), i;
  }
  gA.propTypes = {
    // Core options:
    children: N.string,
    // Layout options:
    className: N.string,
    // Filter options:
    allowElement: N.func,
    allowedElements: N.arrayOf(N.string),
    disallowedElements: N.arrayOf(N.string),
    unwrapDisallowed: N.bool,
    // Plugin options:
    remarkPlugins: N.arrayOf(
      N.oneOfType([
        N.object,
        N.func,
        N.arrayOf(
          N.oneOfType([
            N.bool,
            N.string,
            N.object,
            N.func,
            N.arrayOf(
              // prettier-ignore
              // type-coverage:ignore-next-line
              N.any
            )
          ])
        )
      ])
    ),
    rehypePlugins: N.arrayOf(
      N.oneOfType([
        N.object,
        N.func,
        N.arrayOf(
          N.oneOfType([
            N.bool,
            N.string,
            N.object,
            N.func,
            N.arrayOf(
              // prettier-ignore
              // type-coverage:ignore-next-line
              N.any
            )
          ])
        )
      ])
    ),
    // Transform options:
    sourcePos: N.bool,
    rawSourcePos: N.bool,
    skipHtml: N.bool,
    includeElementIndex: N.bool,
    transformLinkUri: N.oneOfType([N.func, N.bool]),
    linkTarget: N.oneOfType([N.func, N.string]),
    transformImageUri: N.func,
    components: N.object
  };
  var V1 = function(t) {
    return t.reduce(function(n, r) {
      var i = r[0], o = r[1];
      return n[i] = o, n;
    }, {});
  }, $1 = typeof window != "undefined" && window.document && window.document.createElement ? K.useLayoutEffect : K.useEffect, zt = "top", wn = "bottom", bn = "right", jt = "left", yg = "auto", hs = [zt, wn, bn, jt], Zo = "start", $l = "end", h6 = "clippingParents", vA = "viewport", Fa = "popper", m6 = "reference", H1 = /* @__PURE__ */ hs.reduce(function(e, t) {
    return e.concat([t + "-" + Zo, t + "-" + $l]);
  }, []), yA = /* @__PURE__ */ [].concat(hs, [yg]).reduce(function(e, t) {
    return e.concat([t, t + "-" + Zo, t + "-" + $l]);
  }, []), g6 = "beforeRead", v6 = "read", y6 = "afterRead", w6 = "beforeMain", b6 = "main", S6 = "afterMain", E6 = "beforeWrite", A6 = "write", C6 = "afterWrite", x6 = [g6, v6, y6, w6, b6, S6, E6, A6, C6];
  function or(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function kn(e) {
    if (e == null)
      return window;
    if (e.toString() !== "[object Window]") {
      var t = e.ownerDocument;
      return t && t.defaultView || window;
    }
    return e;
  }
  function Ki(e) {
    var t = kn(e).Element;
    return e instanceof t || e instanceof Element;
  }
  function gn(e) {
    var t = kn(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement;
  }
  function wg(e) {
    if (typeof ShadowRoot == "undefined")
      return !1;
    var t = kn(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
  }
  function k6(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(n) {
      var r = t.styles[n] || {}, i = t.attributes[n] || {}, o = t.elements[n];
      !gn(o) || !or(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(a) {
        var l = i[a];
        l === !1 ? o.removeAttribute(a) : o.setAttribute(a, l === !0 ? "" : l);
      }));
    });
  }
  function _6(e) {
    var t = e.state, n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
      Object.keys(t.elements).forEach(function(r) {
        var i = t.elements[r], o = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = a.reduce(function(s, u) {
          return s[u] = "", s;
        }, {});
        !gn(i) || !or(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(s) {
          i.removeAttribute(s);
        }));
      });
    };
  }
  const O6 = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: k6,
    effect: _6,
    requires: ["computeStyles"]
  };
  function nr(e) {
    return e.split("-")[0];
  }
  var ji = Math.max, cc = Math.min, ea = Math.round;
  function kh() {
    var e = navigator.userAgentData;
    return e != null && e.brands ? e.brands.map(function(t) {
      return t.brand + "/" + t.version;
    }).join(" ") : navigator.userAgent;
  }
  function wA() {
    return !/^((?!chrome|android).)*safari/i.test(kh());
  }
  function ta(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    var r = e.getBoundingClientRect(), i = 1, o = 1;
    t && gn(e) && (i = e.offsetWidth > 0 && ea(r.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && ea(r.height) / e.offsetHeight || 1);
    var a = Ki(e) ? kn(e) : window, l = a.visualViewport, s = !wA() && n, u = (r.left + (s && l ? l.offsetLeft : 0)) / i, c = (r.top + (s && l ? l.offsetTop : 0)) / o, f = r.width / i, d = r.height / o;
    return {
      width: f,
      height: d,
      top: c,
      right: u + f,
      bottom: c + d,
      left: u,
      x: u,
      y: c
    };
  }
  function bg(e) {
    var t = ta(e), n = e.offsetWidth, r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: n,
      height: r
    };
  }
  function bA(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t))
      return !0;
    if (n && wg(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r))
          return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function Or(e) {
    return kn(e).getComputedStyle(e);
  }
  function I6(e) {
    return ["table", "td", "th"].indexOf(or(e)) >= 0;
  }
  function Ei(e) {
    return ((Ki(e) ? e.ownerDocument : (
      // $FlowFixMe[prop-missing]
      e.document
    )) || window.document).documentElement;
  }
  function Tf(e) {
    return or(e) === "html" ? e : (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      e.parentNode || // DOM Element detected
      (wg(e) ? e.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      Ei(e)
    );
  }
  function G1(e) {
    return !gn(e) || // https://github.com/popperjs/popper-core/issues/837
    Or(e).position === "fixed" ? null : e.offsetParent;
  }
  function T6(e) {
    var t = /firefox/i.test(kh()), n = /Trident/i.test(kh());
    if (n && gn(e)) {
      var r = Or(e);
      if (r.position === "fixed")
        return null;
    }
    var i = Tf(e);
    for (wg(i) && (i = i.host); gn(i) && ["html", "body"].indexOf(or(i)) < 0; ) {
      var o = Or(i);
      if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
        return i;
      i = i.parentNode;
    }
    return null;
  }
  function ms(e) {
    for (var t = kn(e), n = G1(e); n && I6(n) && Or(n).position === "static"; )
      n = G1(n);
    return n && (or(n) === "html" || or(n) === "body" && Or(n).position === "static") ? t : n || T6(e) || t;
  }
  function Sg(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function dl(e, t, n) {
    return ji(e, cc(t, n));
  }
  function P6(e, t, n) {
    var r = dl(e, t, n);
    return r > n ? n : r;
  }
  function SA() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  function EA(e) {
    return Object.assign({}, SA(), e);
  }
  function AA(e, t) {
    return t.reduce(function(n, r) {
      return n[r] = e, n;
    }, {});
  }
  var N6 = function(t, n) {
    return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
      placement: n.placement
    })) : t, EA(typeof t != "number" ? t : AA(t, hs));
  };
  function D6(e) {
    var t, n = e.state, r = e.name, i = e.options, o = n.elements.arrow, a = n.modifiersData.popperOffsets, l = nr(n.placement), s = Sg(l), u = [jt, bn].indexOf(l) >= 0, c = u ? "height" : "width";
    if (!(!o || !a)) {
      var f = N6(i.padding, n), d = bg(o), p = s === "y" ? zt : jt, h = s === "y" ? wn : bn, m = n.rects.reference[c] + n.rects.reference[s] - a[s] - n.rects.popper[c], S = a[s] - n.rects.reference[s], g = ms(o), v = g ? s === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, w = m / 2 - S / 2, E = f[p], k = v - d[c] - f[h], b = v / 2 - d[c] / 2 + w, A = dl(E, b, k), O = s;
      n.modifiersData[r] = (t = {}, t[O] = A, t.centerOffset = A - b, t);
    }
  }
  function R6(e) {
    var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
    i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || bA(t.elements.popper, i) && (t.elements.arrow = i));
  }
  const L6 = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: D6,
    effect: R6,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function na(e) {
    return e.split("-")[1];
  }
  var M6 = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function F6(e) {
    var t = e.x, n = e.y, r = window, i = r.devicePixelRatio || 1;
    return {
      x: ea(t * i) / i || 0,
      y: ea(n * i) / i || 0
    };
  }
  function J1(e) {
    var t, n = e.popper, r = e.popperRect, i = e.placement, o = e.variation, a = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, d = a.x, p = d === void 0 ? 0 : d, h = a.y, m = h === void 0 ? 0 : h, S = typeof c == "function" ? c({
      x: p,
      y: m
    }) : {
      x: p,
      y: m
    };
    p = S.x, m = S.y;
    var g = a.hasOwnProperty("x"), v = a.hasOwnProperty("y"), w = jt, E = zt, k = window;
    if (u) {
      var b = ms(n), A = "clientHeight", O = "clientWidth";
      if (b === kn(n) && (b = Ei(n), Or(b).position !== "static" && l === "absolute" && (A = "scrollHeight", O = "scrollWidth")), b = b, i === zt || (i === jt || i === bn) && o === $l) {
        E = wn;
        var T = f && b === k && k.visualViewport ? k.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          b[A]
        );
        m -= T - r.height, m *= s ? 1 : -1;
      }
      if (i === jt || (i === zt || i === wn) && o === $l) {
        w = bn;
        var P = f && b === k && k.visualViewport ? k.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          b[O]
        );
        p -= P - r.width, p *= s ? 1 : -1;
      }
    }
    var I = Object.assign({
      position: l
    }, u && M6), F = c === !0 ? F6({
      x: p,
      y: m
    }) : {
      x: p,
      y: m
    };
    if (p = F.x, m = F.y, s) {
      var U;
      return Object.assign({}, I, (U = {}, U[E] = v ? "0" : "", U[w] = g ? "0" : "", U.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", U));
    }
    return Object.assign({}, I, (t = {}, t[E] = v ? m + "px" : "", t[w] = g ? p + "px" : "", t.transform = "", t));
  }
  function B6(e) {
    var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, o = n.adaptive, a = o === void 0 ? !0 : o, l = n.roundOffsets, s = l === void 0 ? !0 : l, u = {
      placement: nr(t.placement),
      variation: na(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed"
    };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, J1(Object.assign({}, u, {
      offsets: t.modifiersData.popperOffsets,
      position: t.options.strategy,
      adaptive: a,
      roundOffsets: s
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, J1(Object.assign({}, u, {
      offsets: t.modifiersData.arrow,
      position: "absolute",
      adaptive: !1,
      roundOffsets: s
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement
    });
  }
  const U6 = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: B6,
    data: {}
  };
  var Js = {
    passive: !0
  };
  function z6(e) {
    var t = e.state, n = e.instance, r = e.options, i = r.scroll, o = i === void 0 ? !0 : i, a = r.resize, l = a === void 0 ? !0 : a, s = kn(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return o && u.forEach(function(c) {
      c.addEventListener("scroll", n.update, Js);
    }), l && s.addEventListener("resize", n.update, Js), function() {
      o && u.forEach(function(c) {
        c.removeEventListener("scroll", n.update, Js);
      }), l && s.removeEventListener("resize", n.update, Js);
    };
  }
  const j6 = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {
    },
    effect: z6,
    data: {}
  };
  var W6 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function gu(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
      return W6[t];
    });
  }
  var Y6 = {
    start: "end",
    end: "start"
  };
  function Q1(e) {
    return e.replace(/start|end/g, function(t) {
      return Y6[t];
    });
  }
  function Eg(e) {
    var t = kn(e), n = t.pageXOffset, r = t.pageYOffset;
    return {
      scrollLeft: n,
      scrollTop: r
    };
  }
  function Ag(e) {
    return ta(Ei(e)).left + Eg(e).scrollLeft;
  }
  function V6(e, t) {
    var n = kn(e), r = Ei(e), i = n.visualViewport, o = r.clientWidth, a = r.clientHeight, l = 0, s = 0;
    if (i) {
      o = i.width, a = i.height;
      var u = wA();
      (u || !u && t === "fixed") && (l = i.offsetLeft, s = i.offsetTop);
    }
    return {
      width: o,
      height: a,
      x: l + Ag(e),
      y: s
    };
  }
  function $6(e) {
    var t, n = Ei(e), r = Eg(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, o = ji(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = ji(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + Ag(e), s = -r.scrollTop;
    return Or(i || n).direction === "rtl" && (l += ji(n.clientWidth, i ? i.clientWidth : 0) - o), {
      width: o,
      height: a,
      x: l,
      y: s
    };
  }
  function Cg(e) {
    var t = Or(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r);
  }
  function CA(e) {
    return ["html", "body", "#document"].indexOf(or(e)) >= 0 ? e.ownerDocument.body : gn(e) && Cg(e) ? e : CA(Tf(e));
  }
  function pl(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = CA(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = kn(r), a = i ? [o].concat(o.visualViewport || [], Cg(r) ? r : []) : r, l = t.concat(a);
    return i ? l : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(pl(Tf(a)))
    );
  }
  function _h(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height
    });
  }
  function H6(e, t) {
    var n = ta(e, !1, t === "fixed");
    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
  }
  function K1(e, t, n) {
    return t === vA ? _h(V6(e, n)) : Ki(t) ? H6(t, n) : _h($6(Ei(e)));
  }
  function G6(e) {
    var t = pl(Tf(e)), n = ["absolute", "fixed"].indexOf(Or(e).position) >= 0, r = n && gn(e) ? ms(e) : e;
    return Ki(r) ? t.filter(function(i) {
      return Ki(i) && bA(i, r) && or(i) !== "body";
    }) : [];
  }
  function J6(e, t, n, r) {
    var i = t === "clippingParents" ? G6(e) : [].concat(t), o = [].concat(i, [n]), a = o[0], l = o.reduce(function(s, u) {
      var c = K1(e, u, r);
      return s.top = ji(c.top, s.top), s.right = cc(c.right, s.right), s.bottom = cc(c.bottom, s.bottom), s.left = ji(c.left, s.left), s;
    }, K1(e, a, r));
    return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
  }
  function xA(e) {
    var t = e.reference, n = e.element, r = e.placement, i = r ? nr(r) : null, o = r ? na(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, s;
    switch (i) {
      case zt:
        s = {
          x: a,
          y: t.y - n.height
        };
        break;
      case wn:
        s = {
          x: a,
          y: t.y + t.height
        };
        break;
      case bn:
        s = {
          x: t.x + t.width,
          y: l
        };
        break;
      case jt:
        s = {
          x: t.x - n.width,
          y: l
        };
        break;
      default:
        s = {
          x: t.x,
          y: t.y
        };
    }
    var u = i ? Sg(i) : null;
    if (u != null) {
      var c = u === "y" ? "height" : "width";
      switch (o) {
        case Zo:
          s[u] = s[u] - (t[c] / 2 - n[c] / 2);
          break;
        case $l:
          s[u] = s[u] + (t[c] / 2 - n[c] / 2);
          break;
      }
    }
    return s;
  }
  function Hl(e, t) {
    t === void 0 && (t = {});
    var n = t, r = n.placement, i = r === void 0 ? e.placement : r, o = n.strategy, a = o === void 0 ? e.strategy : o, l = n.boundary, s = l === void 0 ? h6 : l, u = n.rootBoundary, c = u === void 0 ? vA : u, f = n.elementContext, d = f === void 0 ? Fa : f, p = n.altBoundary, h = p === void 0 ? !1 : p, m = n.padding, S = m === void 0 ? 0 : m, g = EA(typeof S != "number" ? S : AA(S, hs)), v = d === Fa ? m6 : Fa, w = e.rects.popper, E = e.elements[h ? v : d], k = J6(Ki(E) ? E : E.contextElement || Ei(e.elements.popper), s, c, a), b = ta(e.elements.reference), A = xA({
      reference: b,
      element: w,
      strategy: "absolute",
      placement: i
    }), O = _h(Object.assign({}, w, A)), T = d === Fa ? O : b, P = {
      top: k.top - T.top + g.top,
      bottom: T.bottom - k.bottom + g.bottom,
      left: k.left - T.left + g.left,
      right: T.right - k.right + g.right
    }, I = e.modifiersData.offset;
    if (d === Fa && I) {
      var F = I[i];
      Object.keys(P).forEach(function(U) {
        var X = [bn, wn].indexOf(U) >= 0 ? 1 : -1, oe = [zt, wn].indexOf(U) >= 0 ? "y" : "x";
        P[U] += F[oe] * X;
      });
    }
    return P;
  }
  function Q6(e, t) {
    t === void 0 && (t = {});
    var n = t, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding, l = n.flipVariations, s = n.allowedAutoPlacements, u = s === void 0 ? yA : s, c = na(r), f = c ? l ? H1 : H1.filter(function(h) {
      return na(h) === c;
    }) : hs, d = f.filter(function(h) {
      return u.indexOf(h) >= 0;
    });
    d.length === 0 && (d = f);
    var p = d.reduce(function(h, m) {
      return h[m] = Hl(e, {
        placement: m,
        boundary: i,
        rootBoundary: o,
        padding: a
      })[nr(m)], h;
    }, {});
    return Object.keys(p).sort(function(h, m) {
      return p[h] - p[m];
    });
  }
  function K6(e) {
    if (nr(e) === yg)
      return [];
    var t = gu(e);
    return [Q1(e), t, Q1(t)];
  }
  function q6(e) {
    var t = e.state, n = e.options, r = e.name;
    if (!t.modifiersData[r]._skip) {
      for (var i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !0 : a, s = n.fallbackPlacements, u = n.padding, c = n.boundary, f = n.rootBoundary, d = n.altBoundary, p = n.flipVariations, h = p === void 0 ? !0 : p, m = n.allowedAutoPlacements, S = t.options.placement, g = nr(S), v = g === S, w = s || (v || !h ? [gu(S)] : K6(S)), E = [S].concat(w).reduce(function(Je, qe) {
        return Je.concat(nr(qe) === yg ? Q6(t, {
          placement: qe,
          boundary: c,
          rootBoundary: f,
          padding: u,
          flipVariations: h,
          allowedAutoPlacements: m
        }) : qe);
      }, []), k = t.rects.reference, b = t.rects.popper, A = /* @__PURE__ */ new Map(), O = !0, T = E[0], P = 0; P < E.length; P++) {
        var I = E[P], F = nr(I), U = na(I) === Zo, X = [zt, wn].indexOf(F) >= 0, oe = X ? "width" : "height", ne = Hl(t, {
          placement: I,
          boundary: c,
          rootBoundary: f,
          altBoundary: d,
          padding: u
        }), fe = X ? U ? bn : jt : U ? wn : zt;
        k[oe] > b[oe] && (fe = gu(fe));
        var B = gu(fe), V = [];
        if (o && V.push(ne[F] <= 0), l && V.push(ne[fe] <= 0, ne[B] <= 0), V.every(function(Je) {
          return Je;
        })) {
          T = I, O = !1;
          break;
        }
        A.set(I, V);
      }
      if (O)
        for (var G = h ? 3 : 1, x = function(qe) {
          var me = E.find(function(We) {
            var ut = A.get(We);
            if (ut)
              return ut.slice(0, qe).every(function(_n) {
                return _n;
              });
          });
          if (me)
            return T = me, "break";
        }, C = G; C > 0; C--) {
          var rt = x(C);
          if (rt === "break")
            break;
        }
      t.placement !== T && (t.modifiersData[r]._skip = !0, t.placement = T, t.reset = !0);
    }
  }
  const X6 = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: q6,
    requiresIfExists: ["offset"],
    data: {
      _skip: !1
    }
  };
  function q1(e, t, n) {
    return n === void 0 && (n = {
      x: 0,
      y: 0
    }), {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x
    };
  }
  function X1(e) {
    return [zt, bn, wn, jt].some(function(t) {
      return e[t] >= 0;
    });
  }
  function Z6(e) {
    var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, o = t.modifiersData.preventOverflow, a = Hl(t, {
      elementContext: "reference"
    }), l = Hl(t, {
      altBoundary: !0
    }), s = q1(a, r), u = q1(l, i, o), c = X1(s), f = X1(u);
    t.modifiersData[n] = {
      referenceClippingOffsets: s,
      popperEscapeOffsets: u,
      isReferenceHidden: c,
      hasPopperEscaped: f
    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": c,
      "data-popper-escaped": f
    });
  }
  const eL = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Z6
  };
  function tL(e, t, n) {
    var r = nr(e), i = [jt, zt].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, {
      placement: e
    })) : n, a = o[0], l = o[1];
    return a = a || 0, l = (l || 0) * i, [jt, bn].indexOf(r) >= 0 ? {
      x: l,
      y: a
    } : {
      x: a,
      y: l
    };
  }
  function nL(e) {
    var t = e.state, n = e.options, r = e.name, i = n.offset, o = i === void 0 ? [0, 0] : i, a = yA.reduce(function(c, f) {
      return c[f] = tL(f, t.rects, o), c;
    }, {}), l = a[t.placement], s = l.x, u = l.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
  }
  const rL = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: nL
  };
  function iL(e) {
    var t = e.state, n = e.name;
    t.modifiersData[n] = xA({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement
    });
  }
  const oL = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: iL,
    data: {}
  };
  function aL(e) {
    return e === "x" ? "y" : "x";
  }
  function lL(e) {
    var t = e.state, n = e.options, r = e.name, i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !1 : a, s = n.boundary, u = n.rootBoundary, c = n.altBoundary, f = n.padding, d = n.tether, p = d === void 0 ? !0 : d, h = n.tetherOffset, m = h === void 0 ? 0 : h, S = Hl(t, {
      boundary: s,
      rootBoundary: u,
      padding: f,
      altBoundary: c
    }), g = nr(t.placement), v = na(t.placement), w = !v, E = Sg(g), k = aL(E), b = t.modifiersData.popperOffsets, A = t.rects.reference, O = t.rects.popper, T = typeof m == "function" ? m(Object.assign({}, t.rects, {
      placement: t.placement
    })) : m, P = typeof T == "number" ? {
      mainAxis: T,
      altAxis: T
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, T), I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, F = {
      x: 0,
      y: 0
    };
    if (b) {
      if (o) {
        var U, X = E === "y" ? zt : jt, oe = E === "y" ? wn : bn, ne = E === "y" ? "height" : "width", fe = b[E], B = fe + S[X], V = fe - S[oe], G = p ? -O[ne] / 2 : 0, x = v === Zo ? A[ne] : O[ne], C = v === Zo ? -O[ne] : -A[ne], rt = t.elements.arrow, Je = p && rt ? bg(rt) : {
          width: 0,
          height: 0
        }, qe = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : SA(), me = qe[X], We = qe[oe], ut = dl(0, A[ne], Je[ne]), _n = w ? A[ne] / 2 - G - ut - me - P.mainAxis : x - ut - me - P.mainAxis, On = w ? -A[ne] / 2 + G + ut + We + P.mainAxis : C + ut + We + P.mainAxis, Ci = t.elements.arrow && ms(t.elements.arrow), bs = Ci ? E === "y" ? Ci.clientTop || 0 : Ci.clientLeft || 0 : 0, Ss = (U = I == null ? void 0 : I[E]) != null ? U : 0, Lf = fe + _n - Ss - bs, Mf = fe + On - Ss, ga = dl(p ? cc(B, Lf) : B, fe, p ? ji(V, Mf) : V);
        b[E] = ga, F[E] = ga - fe;
      }
      if (l) {
        var va, Es = E === "x" ? zt : jt, Ff = E === "x" ? wn : bn, Vn = b[k], xi = k === "y" ? "height" : "width", As = Vn + S[Es], Cs = Vn - S[Ff], ya = [zt, jt].indexOf(g) !== -1, xs = (va = I == null ? void 0 : I[k]) != null ? va : 0, ks = ya ? As : Vn - A[xi] - O[xi] - xs + P.altAxis, R = ya ? Vn + A[xi] + O[xi] - xs - P.altAxis : Cs, W = p && ya ? P6(ks, Vn, R) : dl(p ? ks : As, Vn, p ? R : Cs);
        b[k] = W, F[k] = W - Vn;
      }
      t.modifiersData[r] = F;
    }
  }
  const sL = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: lL,
    requiresIfExists: ["offset"]
  };
  function uL(e) {
    return {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop
    };
  }
  function cL(e) {
    return e === kn(e) || !gn(e) ? Eg(e) : uL(e);
  }
  function fL(e) {
    var t = e.getBoundingClientRect(), n = ea(t.width) / e.offsetWidth || 1, r = ea(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1;
  }
  function dL(e, t, n) {
    n === void 0 && (n = !1);
    var r = gn(t), i = gn(t) && fL(t), o = Ei(t), a = ta(e, i, n), l = {
      scrollLeft: 0,
      scrollTop: 0
    }, s = {
      x: 0,
      y: 0
    };
    return (r || !r && !n) && ((or(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    Cg(o)) && (l = cL(t)), gn(t) ? (s = ta(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : o && (s.x = Ag(o))), {
      x: a.left + l.scrollLeft - s.x,
      y: a.top + l.scrollTop - s.y,
      width: a.width,
      height: a.height
    };
  }
  function pL(e) {
    var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
    e.forEach(function(o) {
      t.set(o.name, o);
    });
    function i(o) {
      n.add(o.name);
      var a = [].concat(o.requires || [], o.requiresIfExists || []);
      a.forEach(function(l) {
        if (!n.has(l)) {
          var s = t.get(l);
          s && i(s);
        }
      }), r.push(o);
    }
    return e.forEach(function(o) {
      n.has(o.name) || i(o);
    }), r;
  }
  function hL(e) {
    var t = pL(e);
    return x6.reduce(function(n, r) {
      return n.concat(t.filter(function(i) {
        return i.phase === r;
      }));
    }, []);
  }
  function mL(e) {
    var t;
    return function() {
      return t || (t = new Promise(function(n) {
        Promise.resolve().then(function() {
          t = void 0, n(e());
        });
      })), t;
    };
  }
  function gL(e) {
    var t = e.reduce(function(n, r) {
      var i = n[r.name];
      return n[r.name] = i ? Object.assign({}, i, r, {
        options: Object.assign({}, i.options, r.options),
        data: Object.assign({}, i.data, r.data)
      }) : r, n;
    }, {});
    return Object.keys(t).map(function(n) {
      return t[n];
    });
  }
  var Z1 = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function e0() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function(r) {
      return !(r && typeof r.getBoundingClientRect == "function");
    });
  }
  function vL(e) {
    e === void 0 && (e = {});
    var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, o = i === void 0 ? Z1 : i;
    return function(l, s, u) {
      u === void 0 && (u = o);
      var c = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Z1, o),
        modifiersData: {},
        elements: {
          reference: l,
          popper: s
        },
        attributes: {},
        styles: {}
      }, f = [], d = !1, p = {
        state: c,
        setOptions: function(g) {
          var v = typeof g == "function" ? g(c.options) : g;
          m(), c.options = Object.assign({}, o, c.options, v), c.scrollParents = {
            reference: Ki(l) ? pl(l) : l.contextElement ? pl(l.contextElement) : [],
            popper: pl(s)
          };
          var w = hL(gL([].concat(r, c.options.modifiers)));
          return c.orderedModifiers = w.filter(function(E) {
            return E.enabled;
          }), h(), p.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function() {
          if (!d) {
            var g = c.elements, v = g.reference, w = g.popper;
            if (e0(v, w)) {
              c.rects = {
                reference: dL(v, ms(w), c.options.strategy === "fixed"),
                popper: bg(w)
              }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(P) {
                return c.modifiersData[P.name] = Object.assign({}, P.data);
              });
              for (var E = 0; E < c.orderedModifiers.length; E++) {
                if (c.reset === !0) {
                  c.reset = !1, E = -1;
                  continue;
                }
                var k = c.orderedModifiers[E], b = k.fn, A = k.options, O = A === void 0 ? {} : A, T = k.name;
                typeof b == "function" && (c = b({
                  state: c,
                  options: O,
                  name: T,
                  instance: p
                }) || c);
              }
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: mL(function() {
          return new Promise(function(S) {
            p.forceUpdate(), S(c);
          });
        }),
        destroy: function() {
          m(), d = !0;
        }
      };
      if (!e0(l, s))
        return p;
      p.setOptions(u).then(function(S) {
        !d && u.onFirstUpdate && u.onFirstUpdate(S);
      });
      function h() {
        c.orderedModifiers.forEach(function(S) {
          var g = S.name, v = S.options, w = v === void 0 ? {} : v, E = S.effect;
          if (typeof E == "function") {
            var k = E({
              state: c,
              name: g,
              instance: p,
              options: w
            }), b = function() {
            };
            f.push(k || b);
          }
        });
      }
      function m() {
        f.forEach(function(S) {
          return S();
        }), f = [];
      }
      return p;
    };
  }
  var yL = [j6, oL, U6, O6, rL, X6, sL, L6, eL], wL = /* @__PURE__ */ vL({
    defaultModifiers: yL
  }), bL = typeof Element != "undefined", SL = typeof Map == "function", EL = typeof Set == "function", AL = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function vu(e, t) {
    if (e === t)
      return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      if (e.constructor !== t.constructor)
        return !1;
      var n, r, i;
      if (Array.isArray(e)) {
        if (n = e.length, n != t.length)
          return !1;
        for (r = n; r-- !== 0; )
          if (!vu(e[r], t[r]))
            return !1;
        return !0;
      }
      var o;
      if (SL && e instanceof Map && t instanceof Map) {
        if (e.size !== t.size)
          return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!t.has(r.value[0]))
            return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!vu(r.value[1], t.get(r.value[0])))
            return !1;
        return !0;
      }
      if (EL && e instanceof Set && t instanceof Set) {
        if (e.size !== t.size)
          return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!t.has(r.value[0]))
            return !1;
        return !0;
      }
      if (AL && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
        if (n = e.length, n != t.length)
          return !1;
        for (r = n; r-- !== 0; )
          if (e[r] !== t[r])
            return !1;
        return !0;
      }
      if (e.constructor === RegExp)
        return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf)
        return e.valueOf() === t.valueOf();
      if (e.toString !== Object.prototype.toString)
        return e.toString() === t.toString();
      if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, i[r]))
          return !1;
      if (bL && e instanceof Element)
        return !1;
      for (r = n; r-- !== 0; )
        if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && e.$$typeof) && !vu(e[i[r]], t[i[r]]))
          return !1;
      return !0;
    }
    return e !== e && t !== t;
  }
  var CL = function(t, n) {
    try {
      return vu(t, n);
    } catch (r) {
      if ((r.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw r;
    }
  }, xL = [], kL = function(t, n, r) {
    r === void 0 && (r = {});
    var i = K.useRef(null), o = {
      onFirstUpdate: r.onFirstUpdate,
      placement: r.placement || "bottom",
      strategy: r.strategy || "absolute",
      modifiers: r.modifiers || xL
    }, a = K.useState({
      styles: {
        popper: {
          position: o.strategy,
          left: "0",
          top: "0"
        },
        arrow: {
          position: "absolute"
        }
      },
      attributes: {}
    }), l = a[0], s = a[1], u = K.useMemo(function() {
      return {
        name: "updateState",
        enabled: !0,
        phase: "write",
        fn: function(p) {
          var h = p.state, m = Object.keys(h.elements);
          ui.flushSync(function() {
            s({
              styles: V1(m.map(function(S) {
                return [S, h.styles[S] || {}];
              })),
              attributes: V1(m.map(function(S) {
                return [S, h.attributes[S]];
              }))
            });
          });
        },
        requires: ["computeStyles"]
      };
    }, []), c = K.useMemo(function() {
      var d = {
        onFirstUpdate: o.onFirstUpdate,
        placement: o.placement,
        strategy: o.strategy,
        modifiers: [].concat(o.modifiers, [u, {
          name: "applyStyles",
          enabled: !1
        }])
      };
      return CL(i.current, d) ? i.current || d : (i.current = d, d);
    }, [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, u]), f = K.useRef();
    return $1(function() {
      f.current && f.current.setOptions(c);
    }, [c]), $1(function() {
      if (!(t == null || n == null)) {
        var d = r.createPopper || wL, p = d(t, n, c);
        return f.current = p, function() {
          p.destroy(), f.current = null;
        };
      }
    }, [t, n, r.createPopper]), {
      state: f.current ? f.current.state : null,
      styles: l.styles,
      attributes: l.attributes,
      update: f.current ? f.current.update : null,
      forceUpdate: f.current ? f.current.forceUpdate : null
    };
  };
  const _L = "_popover_m2pq3_1", OL = "_textContent_m2pq3_11", IL = "_popperArrow_m2pq3_26", TL = "_popoverMarkdown_m2pq3_60", Qs = {
    popover: _L,
    textContent: OL,
    popperArrow: IL,
    popoverMarkdown: TL
  }, xg = ({
    placement: e = "right",
    showOn: t = "hover",
    popoverContent: n,
    contentIsMd: r = !1,
    bgColor: i,
    openDelayMs: o = 0,
    triggerEl: a
  }) => {
    const [l, s] = _.useState(null), [u, c] = _.useState(null), [f, d] = _.useState(
      null
    ), { styles: p, attributes: h, update: m } = kL(
      l,
      u,
      {
        placement: e,
        modifiers: [
          { name: "arrow", options: { element: f } },
          { name: "offset", options: { offset: [0, 10] } }
        ],
        strategy: "fixed"
      }
    ), S = _.useMemo(() => H(M({}, p.popper), { backgroundColor: i }), [i, p.popper]), g = _.useMemo(() => {
      let w;
      function E() {
        w = setTimeout(() => {
          m == null || m(), u == null || u.setAttribute("data-show", "");
        }, o);
      }
      function k() {
        clearTimeout(w), u == null || u.removeAttribute("data-show");
      }
      return {
        [t === "hover" ? "onMouseEnter" : "onClick"]: () => E(),
        onMouseLeave: () => k(),
        // Some popover items are interactable with and in this case we don't want
        // the popover to stay up if the user has decided to interact with it
        onPointerDown: () => k()
      };
    }, [o, u, t, m]), v = typeof n != "string" ? n : r ? /* @__PURE__ */ y(gA, { className: Qs.popoverMarkdown, children: n }) : /* @__PURE__ */ y("div", { className: Qs.textContent, children: n });
    return /* @__PURE__ */ L(Ge, { children: [
      _.cloneElement(a, H(M({}, g), {
        ref: s
      })),
      /* @__PURE__ */ L(
        "div",
        H(M({
          ref: c,
          className: Qs.popover,
          style: S
        }, h.popper), {
          children: [
            v,
            /* @__PURE__ */ y(
              "div",
              {
                ref: d,
                className: Qs.popperArrow,
                style: p.arrow
              }
            )
          ]
        })
      )
    ] });
  }, kA = (l) => {
    var s = l, {
      children: e,
      placement: t = "right",
      showOn: n = "hover",
      popoverContent: r,
      bgColor: i,
      openDelayMs: o = 0
    } = s, a = Le(s, [
      "children",
      "placement",
      "showOn",
      "popoverContent",
      "bgColor",
      "openDelayMs"
    ]);
    return /* @__PURE__ */ y(
      xg,
      {
        placement: t,
        showOn: n,
        popoverContent: r,
        bgColor: i,
        openDelayMs: o,
        triggerEl: /* @__PURE__ */ y("button", H(M({}, a), { children: e }))
      }
    );
  }, PL = "_infoIcon_15ri6_1", NL = "_container_15ri6_10", DL = "_header_15ri6_15", RL = "_info_15ri6_1", LL = "_unit_15ri6_27", ML = "_description_15ri6_31", fo = {
    infoIcon: PL,
    container: NL,
    header: DL,
    info: RL,
    unit: LL,
    description: ML
  }, FL = ({ units: e }) => /* @__PURE__ */ y(
    kA,
    {
      className: fo.infoIcon,
      popoverContent: /* @__PURE__ */ y(BL, { units: e }),
      openDelayMs: 500,
      placement: "auto",
      children: /* @__PURE__ */ y(CI, {})
    }
  );
  function BL({ units: e }) {
    return /* @__PURE__ */ L("div", { className: fo.container, children: [
      /* @__PURE__ */ y("div", { className: fo.header, children: "CSS size options" }),
      /* @__PURE__ */ y("div", { className: fo.info, children: e.map((t) => /* @__PURE__ */ L(_.Fragment, { children: [
        /* @__PURE__ */ y("div", { className: fo.unit, children: t }),
        /* @__PURE__ */ y("div", { className: fo.description, children: UL[t] })
      ] }, t)) })
    ] });
  }
  const UL = {
    "%": "Relative to percentage of container size",
    auto: "Let the content decide size",
    fr: "Relative unit. E.g. 2fr is twice the size of 1fr",
    px: "Screen pixels",
    rem: "Pixel size of app font. Typically 16 pixels."
  }, zL = "_wrapper_3jy8f_1", jL = "_unitSelector_3jy8f_9", _A = {
    wrapper: zL,
    unitSelector: jL
  };
  function OA({
    unit: e,
    availableUnits: t,
    onChange: n
  }) {
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(
        "select",
        {
          className: _A.unitSelector,
          "aria-label": "value-unit",
          name: "value-unit",
          value: e,
          onChange: (r) => n(r.target.value),
          children: t.map((r) => /* @__PURE__ */ y("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ y(FL, { units: t })
    ] });
  }
  function Ir(e) {
    return e + "-label";
  }
  function WL({
    id: e,
    label: t,
    value: n,
    onChange: r
  }) {
    return /* @__PURE__ */ y(
      Pf,
      {
        id: e,
        "aria-label": t,
        "aria-labelledby": Ir(e),
        value: n,
        onChange: r
      }
    );
  }
  function Pf(l) {
    var s = l, {
      value: e,
      onChange: t,
      min: n = 0,
      max: r,
      step: i,
      disabled: o
    } = s, a = Le(s, [
      "value",
      "onChange",
      "min",
      "max",
      "step",
      "disabled"
    ]);
    const { displayedVal: u, handleChange: c, handleBlur: f, incrementUp: d, incrementDown: p } = YL({
      min: n,
      max: r,
      step: i,
      value: e,
      onChange: t
    });
    return /* @__PURE__ */ L(
      "div",
      {
        className: "NumberInput SUE-Input",
        "aria-disabled": o,
        onBlur: f,
        children: [
          /* @__PURE__ */ y(
            "input",
            H(M({}, a), {
              className: "input-field",
              type: "number",
              placeholder: "0",
              value: u,
              min: n,
              max: r,
              step: i,
              disabled: o,
              onChange: c
            })
          ),
          /* @__PURE__ */ L("div", { className: "incrementer-buttons", children: [
            /* @__PURE__ */ y(
              "button",
              {
                className: "up-button",
                "aria-label": "Increment number up",
                onClick: d,
                type: "button",
                children: /* @__PURE__ */ y(OI, {})
              }
            ),
            /* @__PURE__ */ y(
              "button",
              {
                className: "down-button",
                "aria-label": "Increment number down",
                onClick: p,
                type: "button",
                children: /* @__PURE__ */ y(xI, {})
              }
            )
          ] })
        ]
      }
    );
  }
  function YL({
    min: e = -1 / 0,
    max: t = 1 / 0,
    step: n = 1,
    value: r,
    onChange: i
  }) {
    const o = _.useCallback(
      (p) => (h) => {
        if (h.preventDefault(), typeof r != "number" || typeof n != "number")
          return;
        const m = r + (p === "up" ? 1 : -1) * n;
        typeof e == "number" && e > m || typeof t == "number" && t < m || i(m);
      },
      [t, e, i, n, r]
    ), a = _.useMemo(
      () => o("up"),
      [o]
    ), l = _.useMemo(
      () => o("down"),
      [o]
    ), [s, u] = _.useState(r);
    _.useEffect(() => u(r), [r]);
    const c = _.useCallback(
      (p) => {
        const h = p.target.value;
        u(
          (m) => Number(m) === Number(h) ? m : h
        ), i(Number(h));
      },
      [i]
    ), f = _.useCallback(() => {
      u((p) => Number(p).toString());
    }, []);
    return {
      incrementUp: a,
      incrementDown: l,
      handleChange: c,
      displayedVal: s === 0 || s === null ? "" : s,
      handleBlur: f
    };
  }
  function VL({
    text: e,
    position: t = "down",
    size: n,
    children: r
  }) {
    return /* @__PURE__ */ y(
      "span",
      {
        "aria-label": e,
        "data-balloon-pos": t,
        "data-balloon-length": n,
        children: r
      }
    );
  }
  function Ai(a) {
    var l = a, {
      text: e,
      position: t = "down",
      size: n,
      children: r,
      variant: i = "icon"
    } = l, o = Le(l, [
      "text",
      "position",
      "size",
      "children",
      "variant"
    ]);
    return /* @__PURE__ */ y(
      ht,
      H(M({
        "aria-label": e,
        "data-balloon-pos": t,
        "data-balloon-length": n,
        variant: i
      }, o), {
        children: r
      })
    );
  }
  function t0(e, t) {
    const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
    return Array.from({ length: n }, (i, o) => e + o * r);
  }
  function $L({
    areas: e,
    row_sizes: t,
    col_sizes: n,
    gap_size: r
  }) {
    return {
      gridTemplateAreas: e.map((i) => `"${i.join(" ")}"`).join(` 
 `),
      gridTemplateRows: t.join(" "),
      gridTemplateColumns: n.join(" "),
      "--grid-gap": r
    };
  }
  function n0(e) {
    return e.split(" ");
  }
  function HL(e) {
    const t = e.match(/"([.\w\s]+)"/g);
    if (!t)
      throw new Error("Can't parse area definition");
    return t.map((n) => n.replaceAll('"', "").split(" "));
  }
  function GL(e) {
    const t = n0(
      e.style.gridTemplateRows
    ), n = n0(
      e.style.gridTemplateColumns
    ), r = HL(e.style.gridTemplateAreas), i = e.style.getPropertyValue("--grid-gap");
    return {
      row_sizes: t,
      col_sizes: n,
      areas: r,
      gap_size: i
    };
  }
  function IA({
    container: e,
    dir: t
  }) {
    return getComputedStyle(e).getPropertyValue(
      t === "rows" ? "grid-template-rows" : "grid-template-columns"
    ).split(" ").map((n) => Number(n.replaceAll("px", "")));
  }
  const Oh = (e) => Number(e.toFixed(4)), fc = 40, JL = 0.15, TA = (e) => (t) => Math.round(t / e) * e, QL = 5, Nf = TA(QL), KL = 0.01, PA = TA(KL);
  function qL(e, {
    pixelToFrRatio: t,
    beforeInfo: n,
    afterInfo: r
  }) {
    const i = PA(e * t), o = n.count + i, a = r.count - i;
    return (i < 0 ? o / a : a / o) < JL ? "no-change" : {
      beforeSize: Oh(o) + "fr",
      afterSize: Oh(a) + "fr"
    };
  }
  function XL(e, { beforeInfo: t, afterInfo: n }) {
    const r = Nf(e), i = t.count + r, o = n.count - r;
    return i < fc || o < fc ? "no-change" : {
      beforeSize: i + "px",
      afterSize: o + "px"
    };
  }
  function ZL(e, { beforeInfo: t }) {
    const n = t.count + e;
    return n < fc ? "no-change" : {
      beforeSize: Nf(n) + "px"
    };
  }
  function eM(e, { afterInfo: t }) {
    const n = t.count - e;
    return n < fc ? "no-change" : {
      afterSize: Nf(n) + "px"
    };
  }
  function tM(e, t) {
    const n = Ih(e), r = t === null ? "missing" : Ih(t);
    if (n.type === "pixel" && (r === "missing" || r.type === "fr"))
      return {
        type: "before-pixel",
        beforeInfo: n
      };
    if (r === "missing")
      throw new Error(
        "Somehow have a final tract drag without a pixel valued tract before...."
      );
    return n.type === "pixel" && r.type === "pixel" ? {
      type: "both-pixel",
      beforeInfo: n,
      afterInfo: r
    } : n.type === "fr" && r.type === "pixel" ? {
      type: "after-pixel",
      afterInfo: r
    } : n.type === "fr" && r.type === "fr" ? {
      type: "both-relative",
      beforeInfo: n,
      afterInfo: r
    } : { type: "unsupported" };
  }
  function nM({
    container: e,
    index: t,
    dir: n,
    frCounts: r
  }) {
    const i = IA({ container: e, dir: n }), o = i[t - 2], a = i[t - 1];
    return (r.before + r.after) / (a + o);
  }
  function rM({
    mousePosition: e,
    dir: t,
    index: n,
    container: r
  }) {
    const i = t === "rows" ? "gridTemplateRows" : "gridTemplateColumns";
    let o = r.style[i].split(" ");
    const a = lM(o), l = aM(o);
    a && !l && (o = getComputedStyle(r).getPropertyValue(
      t === "rows" ? "grid-template-rows" : "grid-template-columns"
    ).split(" ").slice(0, o.length), r.style[i] = o.join(" ")), a && l && console.warn(
      "There's a mixture of auto and relative units in the grid. This may cause funky behavior on resize. To prevent this switch to only relative or auto units"
    );
    const s = n - 2, u = s + 1;
    let c = o[s], f = u >= o.length ? null : o[u];
    if (c === "auto" || f === "auto") {
      const h = getComputedStyle(r).getPropertyValue(
        t === "rows" ? "grid-template-rows" : "grid-template-columns"
      ).split(" ");
      c === "auto" && (c = h[s], o[s] = c), f === "auto" && (f = h[u], o[u] = f), r.style[i] = h.join(" ");
    }
    const d = tM(c, f);
    if (d.type === "unsupported")
      throw new Error("Unsupported drag type");
    r.classList.add("been-dragged");
    const p = H(M({
      dir: t,
      mouseStart: DA(e, t),
      originalSizes: o,
      currentSizes: [...o],
      beforeIndex: s,
      afterIndex: u
    }, d), {
      pixelToFrRatio: 1
    });
    return d.type === "both-relative" && (p.pixelToFrRatio = nM({
      container: r,
      index: n,
      dir: t,
      frCounts: {
        before: d.beforeInfo.count,
        after: d.afterInfo.count
      }
    })), p;
  }
  function iM({
    mousePosition: e,
    drag: t,
    container: n
  }) {
    const i = DA(e, t.dir) - t.mouseStart, o = [...t.originalSizes];
    let a;
    switch (t.type) {
      case "before-pixel":
        a = ZL(i, t);
        break;
      case "after-pixel":
        a = eM(i, t);
        break;
      case "both-pixel":
        a = XL(i, t);
        break;
      case "both-relative":
        a = qL(i, t);
        break;
    }
    a !== "no-change" && (a.beforeSize && (o[t.beforeIndex] = a.beforeSize), a.afterSize && (o[t.afterIndex] = a.afterSize), t.currentSizes = o, t.dir === "cols" ? n.style.gridTemplateColumns = o.join(" ") : n.style.gridTemplateRows = o.join(" "));
  }
  function oM(e) {
    return e.match(/[0-9|.]+px/) !== null;
  }
  function NA(e) {
    return e.match(/[0-9|.]+fr/) !== null;
  }
  function Ih(e) {
    if (NA(e))
      return {
        type: "fr",
        count: Number(e.replace("fr", "")),
        value: e
      };
    if (oM(e))
      return {
        type: "pixel",
        count: Number(e.replace("px", "")),
        value: e
      };
    throw new Error("Unknown tract sizing unit: " + e);
  }
  function DA(e, t) {
    return t === "rows" ? e.clientY : e.clientX;
  }
  function aM(e) {
    return e.some((t) => NA(t));
  }
  function lM(e) {
    return e.some((t) => t === "auto");
  }
  const sM = "_tractInfoDisplay_cvtwo_1", uM = "_sizeWidget_cvtwo_61", cM = "_cssSizeInput_cvtwo_80", fM = "_hoverListener_cvtwo_94", dM = "_buttons_cvtwo_114", pM = "_tractAddButton_cvtwo_127", hM = "_deleteButton_cvtwo_128", Hr = {
    tractInfoDisplay: sM,
    sizeWidget: uM,
    cssSizeInput: cM,
    hoverListener: fM,
    buttons: dM,
    tractAddButton: pM,
    deleteButton: hM
  }, mM = ["fr", "px"];
  function gM({
    dir: e,
    index: t,
    size: n,
    deletionConflicts: r,
    addTract: i,
    deleteTract: o,
    changeUnit: a,
    changeCount: l
  }) {
    const { unit: s, count: u } = lc(n);
    return /* @__PURE__ */ L(
      "div",
      {
        className: Hr.tractInfoDisplay,
        "data-drag-dir": e,
        style: {
          "--tract-index": t + 1
        },
        children: [
          /* @__PURE__ */ y("div", { className: Hr.hoverListener }),
          /* @__PURE__ */ L("div", { className: Hr.sizeWidget, onClick: wM, children: [
            /* @__PURE__ */ L("div", { className: Hr.buttons, children: [
              /* @__PURE__ */ y(r0, { dir: e, onClick: () => i("before") }),
              /* @__PURE__ */ y(
                vM,
                {
                  dir: e,
                  onClick: o,
                  deletionConflicts: r
                }
              ),
              /* @__PURE__ */ y(r0, { dir: e, onClick: () => i("after") })
            ] }),
            /* @__PURE__ */ L("div", { className: Hr.cssSizeInput, children: [
              /* @__PURE__ */ y(
                Pf,
                {
                  name: "value-count",
                  "aria-label": "value-count",
                  value: u,
                  onChange: l,
                  min: 0
                }
              ),
              /* @__PURE__ */ y(
                OA,
                {
                  unit: s,
                  availableUnits: mM,
                  onChange: (c) => a(c)
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
  function vM({
    dir: e,
    onClick: t,
    deletionConflicts: n
  }) {
    const r = e === "rows" ? "right" : "down", i = n.length === 0, o = i ? "Delete tract" : `Can't delete because the items ${n.join(
      ","
    )} are entirely contained in tract`;
    return /* @__PURE__ */ y(
      Ai,
      {
        className: Hr.deleteButton,
        onClick: RA(i ? t : void 0),
        "data-enabled": i,
        text: o,
        size: "medium",
        position: r,
        children: /* @__PURE__ */ y(Kc, {})
      }
    );
  }
  function r0({
    dir: e,
    onClick: t
  }) {
    const n = e === "rows" ? "right" : "down", r = e === "rows" ? "Add row" : "Add column";
    return /* @__PURE__ */ y(
      Ai,
      {
        className: Hr.tractAddButton,
        onClick: RA(t),
        position: n,
        text: r,
        children: /* @__PURE__ */ y(sg, {})
      }
    );
  }
  function RA(e) {
    return function(t) {
      t.currentTarget.blur(), e == null || e();
    };
  }
  function yM(e, t) {
    let n = 0, r = 0;
    for (let i = 0; i < t.length; i++) {
      const { type: o, count: a } = Ih(t[i]);
      o === "fr" && (n += a, r += e[i]);
    }
    return n === 0 ? "NO_FR_UNITS" : n / r;
  }
  function i0({
    dir: e,
    sizes: t,
    getActualSizes: n,
    areas: r,
    onUpdate: i
  }) {
    const o = K.useCallback(
      ({ dir: c, index: f }) => xE(r, {
        dir: c,
        index: f + 1
      }),
      [r]
    ), a = (c) => (f) => {
      const { unit: d } = lc(t[c]);
      i({
        type: "RESIZE",
        index: c,
        dir: e,
        size: `${f}${d}`
      });
    }, l = (c) => (f) => {
      const d = n(), { count: p } = lc(t[c]);
      let h = 1;
      f === "px" && (h = Nf(d[c]));
      const m = yM(d, t);
      f === "fr" && m !== "NO_FR_UNITS" && (h = Oh(
        PA(p ? p * m : 1)
      )), i({ type: "RESIZE", index: c, dir: e, size: `${h}${f}` });
    }, s = (c) => (f) => i({
      type: "ADD",
      dir: e,
      index: f === "before" ? c : c + 1
    }), u = (c) => () => {
      i({ type: "DELETE", dir: e, index: c + 1 });
    };
    return /* @__PURE__ */ y(Ge, { children: t.map((c, f) => /* @__PURE__ */ y(
      gM,
      {
        index: f,
        dir: e,
        addTract: s(f),
        deleteTract: u(f),
        changeUnit: l(f),
        changeCount: a(f),
        size: c,
        deletionConflicts: o({ dir: e, index: f })
      },
      e + f
    )) });
  }
  function wM(e) {
    e.stopPropagation();
  }
  function o0(e, t) {
    e.querySelectorAll(`.${Hr.tractInfoDisplay}`).forEach((n) => {
      n.style.display = t === "hide" ? "none" : "block";
    });
  }
  const bM = "_columnSizer_9b32k_1", SM = "_rowSizer_9b32k_2", a0 = {
    columnSizer: bM,
    rowSizer: SM
  };
  function l0({
    dir: e,
    index: t,
    onStartDrag: n
  }) {
    return /* @__PURE__ */ y(
      "div",
      {
        className: e === "rows" ? a0.rowSizer : a0.columnSizer,
        title: `resize ${e === "rows" ? "rows" : "columns"} ${t - 1} and ${t}`,
        onMouseDown: (r) => n({ e: r, dir: e, index: t }),
        style: { [e === "rows" ? "gridRow" : "gridColumn"]: t }
      }
    );
  }
  function EM(e, t = "Ref is not yet initialized") {
    if (e.current === null)
      throw new Error(t);
    return e.current;
  }
  function AM({
    containerRef: e,
    onDragEnd: t
  }) {
    return _.useCallback(
      ({
        e: r,
        dir: i,
        index: o
      }) => {
        const a = EM(
          e,
          "How are you dragging on an element without a container?"
        );
        r.preventDefault();
        const l = rM({
          mousePosition: r,
          dir: i,
          index: o,
          container: a
        }), { beforeIndex: s, afterIndex: u } = l, c = s0(a, {
          dir: i,
          index: s,
          size: l.currentSizes[s]
        }), f = s0(a, {
          dir: i,
          index: u,
          size: l.currentSizes[u]
        });
        CM(a, l.dir, {
          move: (d) => {
            iM({
              mousePosition: d,
              drag: l,
              container: a
            }), c.update(l.currentSizes[s]), f.update(l.currentSizes[u]);
          },
          end: () => {
            c.remove(), f.remove(), t && t(GL(a));
          }
        });
      },
      [e, t]
    );
  }
  function s0(e, { dir: t, index: n, size: r }) {
    const i = document.createElement("div"), o = t === "rows" ? {
      gridRow: String(n + 1),
      gridColumn: "1",
      flexDirection: "row"
    } : {
      gridColumn: String(n + 1),
      gridRow: "1",
      flexDirection: "column"
    };
    Object.assign(i.style, o, {
      zIndex: "1",
      display: "flex",
      alignItems: "center"
    });
    const a = document.createElement("div");
    return Object.assign(a.style, {
      padding: "3px 7px",
      borderRadius: "var(--corner-radius)",
      backgroundColor: "var(--light-grey, pink)"
    }), a.innerHTML = r, i.appendChild(a), e.appendChild(i), o0(e, "hide"), {
      remove: () => {
        i.remove(), o0(e, "show");
      },
      update: (l) => {
        a.innerHTML = l;
      }
    };
  }
  function CM(e, t, n) {
    const r = document.createElement("div");
    Object.assign(r.style, {
      position: "fixed",
      inset: "0px",
      zIndex: "3",
      // Keep the cursor consistant with the appropriate direction resizer to let
      // the user know they're in "drag mode"
      cursor: t === "rows" ? "ns-resize" : "ew-resize"
    }), e.appendChild(r);
    const i = () => {
      o(), n.end();
    };
    r.addEventListener("mousemove", n.move), r.addEventListener("mouseup", i), r.addEventListener("mouseleave", i);
    function o() {
      r.removeEventListener("mousemove", n.move), r.removeEventListener("mouseup", i), r.removeEventListener("mouseleave", i), r.remove();
    }
  }
  function xM({
    areas: e,
    col_sizes: t,
    row_sizes: n,
    gap_size: r
  }) {
    return {
      areas: e,
      gap_size: r,
      col_sizes: ul(t),
      row_sizes: ul(n)
    };
  }
  const kM = "1fr";
  function _M(i) {
    var o = i, {
      className: e,
      children: t,
      onNewLayout: n
    } = o, r = Le(o, [
      "className",
      "children",
      "onNewLayout"
    ]);
    r = xM(r);
    let { row_sizes: a, col_sizes: l } = r;
    const s = K.useRef(null), u = $L(r), c = l.length < 2 ? [] : t0(2, l.length), f = a.length < 2 ? [] : t0(2, a.length), d = AM({
      containerRef: s,
      onDragEnd: n
    }), p = [tN.ResizableGrid];
    e && p.push(e);
    const h = K.useCallback(
      (g) => {
        switch (g.type) {
          case "ADD":
            return EE(r, {
              afterIndex: g.index,
              dir: g.dir,
              size: kM
            });
          case "RESIZE":
            return OM(r, g);
          case "DELETE":
            return CE(r, g);
        }
      },
      [r]
    ), m = K.useCallback(
      (g) => n(h(g)),
      [h, n]
    ), S = K.useCallback((g) => {
      const v = s.current;
      return v ? IA({ container: v, dir: g }) : [];
    }, []);
    return /* @__PURE__ */ L(
      "div",
      {
        className: nt(...p),
        ref: s,
        style: u,
        children: [
          c.map((g) => /* @__PURE__ */ y(
            l0,
            {
              dir: "cols",
              index: g,
              onStartDrag: d
            },
            "cols" + g
          )),
          f.map((g) => /* @__PURE__ */ y(
            l0,
            {
              dir: "rows",
              index: g,
              onStartDrag: d
            },
            "rows" + g
          )),
          t,
          /* @__PURE__ */ y(
            i0,
            {
              dir: "cols",
              sizes: l,
              getActualSizes: () => S("cols"),
              areas: r.areas,
              onUpdate: m
            }
          ),
          /* @__PURE__ */ y(
            i0,
            {
              dir: "rows",
              sizes: a,
              getActualSizes: () => S("rows"),
              areas: r.areas,
              onUpdate: m
            }
          )
        ]
      }
    );
  }
  function OM(e, { dir: t, index: n, size: r }) {
    return wi(e, (i) => {
      i[t === "rows" ? "row_sizes" : "col_sizes"][n] = r;
    });
  }
  function IM({
    gridRow: e,
    gridColumn: t,
    onDroppedNode: n
  }) {
    const r = ng({
      getCanAcceptDrop: (i) => i.node.uiName !== "gridlayout::grid_container",
      onDrop: (i) => {
        n(H(M({}, i), {
          pos: {
            rowStart: e,
            rowEnd: e,
            colStart: t,
            colEnd: t
          }
        }));
      }
    });
    return /* @__PURE__ */ y(
      "div",
      {
        className: "grid-cell",
        ref: r,
        "data-cell-pos": e + "-" + t,
        style: {
          gridRow: e,
          gridColumn: t,
          // By insetting a tiny bit we ensure that the cells won't peak out from
          // behind any item placed over them
          margin: "2px"
        }
      }
    );
  }
  const LA = 236;
  function MA({
    main: e,
    properties: t,
    preview: n,
    left: r
  }) {
    return /* @__PURE__ */ y(Ge, { children: /* @__PURE__ */ L("div", { className: "EditorSkeleton", children: [
      /* @__PURE__ */ y("div", { className: "elements-panel panel", children: r }),
      /* @__PURE__ */ y("div", { className: "app-view", children: e }),
      /* @__PURE__ */ y("div", { className: "properties-panel panel", children: t }),
      /* @__PURE__ */ y("div", { className: "app-preview panel", children: n })
    ] }) });
  }
  function ma({
    children: e,
    className: t = ""
  }) {
    return /* @__PURE__ */ y("h3", { className: t + " panel-title", children: e });
  }
  const TM = "_portalHolder_18ua3_1", PM = "_portalModal_18ua3_11", NM = "_title_18ua3_21", DM = "_body_18ua3_25", RM = "_portalForm_18ua3_30", LM = "_portalFormInputs_18ua3_35", MM = "_portalFormFooter_18ua3_42", FM = "_validationMsg_18ua3_48", BM = "_infoText_18ua3_53", vr = {
    portalHolder: TM,
    portalModal: PM,
    title: NM,
    body: DM,
    portalForm: RM,
    portalFormInputs: LM,
    portalFormFooter: MM,
    validationMsg: FM,
    infoText: BM
  }, UM = ({ children: e, el: t = "div" }) => {
    const [n] = K.useState(document.createElement(t));
    return K.useEffect(() => (document.body.appendChild(n), () => {
      document.body.removeChild(n);
    }), [n]), ui.createPortal(e, n);
  };
  function FA({
    children: e,
    title: t,
    label: n,
    onConfirm: r,
    onCancel: i
  }) {
    return /* @__PURE__ */ y(UM, { children: /* @__PURE__ */ y(
      "div",
      {
        className: vr.portalHolder,
        onClick: () => i(),
        onKeyDown: (o) => {
          o.key === "Escape" && i();
        },
        children: /* @__PURE__ */ L(
          "div",
          {
            className: vr.portalModal,
            onClick: (o) => o.stopPropagation(),
            "aria-label": n != null ? n : "popup modal",
            children: [
              t ? /* @__PURE__ */ y(ma, { className: vr.title, children: t }) : null,
              /* @__PURE__ */ y("div", { className: vr.body, children: e })
            ]
          }
        )
      }
    ) });
  }
  var dc = Symbol("@ts-pattern/matcher"), u0 = "@ts-pattern/anonymous-select-key", c0 = function(e) {
    return Boolean(e && typeof e == "object");
  }, Fd = function(e) {
    return e && !!e[dc];
  }, zM = function e(t, n, r) {
    if (c0(t)) {
      if (Fd(t)) {
        var i = t[dc]().match(n), o = i.matched, a = i.selections;
        return o && a && Object.keys(a).forEach(function(s) {
          return r(s, a[s]);
        }), o;
      }
      if (!c0(n))
        return !1;
      if (Array.isArray(t))
        return !!Array.isArray(n) && t.length === n.length && t.every(function(s, u) {
          return e(s, n[u], r);
        });
      if (t instanceof Map)
        return n instanceof Map && Array.from(t.keys()).every(function(s) {
          return e(t.get(s), n.get(s), r);
        });
      if (t instanceof Set) {
        if (!(n instanceof Set))
          return !1;
        if (t.size === 0)
          return n.size === 0;
        if (t.size === 1) {
          var l = Array.from(t.values())[0];
          return Fd(l) ? Array.from(n.values()).every(function(s) {
            return e(l, s, r);
          }) : n.has(l);
        }
        return Array.from(t.values()).every(function(s) {
          return n.has(s);
        });
      }
      return Object.keys(t).every(function(s) {
        var u, c = t[s];
        return (s in n || Fd(u = c) && u[dc]().matcherType === "optional") && e(c, n[s], r);
      });
    }
    return Object.is(n, t);
  };
  function ro(e) {
    var t;
    return (t = {})[dc] = function() {
      return { match: function(n) {
        return { matched: Boolean(e(n)) };
      } };
    }, t;
  }
  ro(function(e) {
    return !0;
  });
  ro(function(e) {
    return typeof e == "string";
  });
  ro(function(e) {
    return typeof e == "number";
  });
  ro(function(e) {
    return typeof e == "boolean";
  });
  ro(function(e) {
    return typeof e == "bigint";
  });
  ro(function(e) {
    return typeof e == "symbol";
  });
  ro(function(e) {
    return e == null;
  });
  var jM = function(e) {
    return new WM(e, []);
  }, WM = /* @__PURE__ */ function() {
    function e(n, r) {
      this.value = void 0, this.cases = void 0, this.value = n, this.cases = r;
    }
    var t = e.prototype;
    return t.with = function() {
      var n = [].slice.call(arguments), r = n[n.length - 1], i = [n[0]], o = [];
      return n.length === 3 && typeof n[1] == "function" ? (i.push(n[0]), o.push(n[1])) : n.length > 2 && i.push.apply(i, n.slice(1, n.length - 1)), new e(this.value, this.cases.concat([{ match: function(a) {
        var l = {}, s = Boolean(i.some(function(u) {
          return zM(u, a, function(c, f) {
            l[c] = f;
          });
        }) && o.every(function(u) {
          return u(a);
        }));
        return { matched: s, value: s && Object.keys(l).length ? u0 in l ? l[u0] : l : a };
      }, handler: r }]));
    }, t.when = function(n, r) {
      return new e(this.value, this.cases.concat([{ match: function(i) {
        return { matched: Boolean(n(i)), value: i };
      }, handler: r }]));
    }, t.otherwise = function(n) {
      return new e(this.value, this.cases.concat([{ match: function(r) {
        return { matched: !0, value: r };
      }, handler: n }])).run();
    }, t.exhaustive = function() {
      return this.run();
    }, t.run = function() {
      for (var n = this.value, r = void 0, i = 0; i < this.cases.length; i++) {
        var o = this.cases[i], a = o.match(this.value);
        if (a.matched) {
          n = a.value, r = o.handler;
          break;
        }
      }
      if (!r) {
        var l;
        try {
          l = JSON.stringify(this.value);
        } catch (s) {
          l = this.value;
        }
        throw new Error("Pattern matching error: no pattern matches value " + l);
      }
      return r(n, this.value);
    }, e;
  }();
  const YM = "_checkboxInput_7ym3w_1", VM = "_checkboxLabel_7ym3w_10", f0 = {
    checkboxInput: YM,
    checkboxLabel: VM
  };
  function $M({
    id: e,
    label: t,
    value: n,
    onChange: r
  }) {
    const i = `${e}-checkbox-input`, o = (a) => r(a.target.checked);
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(
        "input",
        {
          className: nt("SUE-Input", f0.checkboxInput),
          id: i,
          "aria-labelledby": Ir(e),
          "aria-label": t,
          type: "checkbox",
          checked: n,
          onChange: o
        }
      ),
      /* @__PURE__ */ y(
        "label",
        {
          className: f0.checkboxLabel,
          htmlFor: i,
          "data-value": n ? "TRUE" : "FALSE",
          children: "Toggle"
        }
      )
    ] });
  }
  const HM = {
    fr: 1,
    px: 10,
    rem: 1,
    "%": 100
  };
  function GM({
    id: e,
    label: t,
    value: n,
    onChange: r,
    units: i = ["px", "rem", "%"]
  }) {
    const { count: o, unit: a } = lc(n), l = _.useCallback(
      (c) => {
        if (c === void 0) {
          if (a !== "auto")
            throw new Error("Undefined count with auto units");
          r(La({ unit: a, count: null }));
          return;
        }
        if (a === "auto") {
          console.error("How did you change the count of an auto unit?");
          return;
        }
        r(La({ unit: a, count: c }));
      },
      [r, a]
    ), s = _.useCallback(
      (c) => {
        if (c === "auto") {
          r(
            La({
              unit: c,
              count: null
            })
          );
          return;
        }
        if (a === "auto") {
          r(
            La({ unit: c, count: HM[c] })
          );
          return;
        }
        r(La({ unit: c, count: o }));
      },
      [o, r, a]
    );
    i.includes(a) || i.push(a);
    const u = o === null;
    return /* @__PURE__ */ L(
      "div",
      {
        className: nt("SUE-Input", _A.wrapper),
        "aria-label": t,
        "aria-labelledby": Ir(e),
        children: [
          /* @__PURE__ */ y(
            Pf,
            {
              name: "value-count",
              "aria-label": "value-count",
              value: o,
              disabled: u,
              onChange: l,
              min: 0
            }
          ),
          /* @__PURE__ */ y(
            OA,
            {
              unit: a,
              availableUnits: i,
              onChange: s
            }
          )
        ]
      }
    );
  }
  function JM(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } }, { tag: "path", attr: { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" } }] })(e);
  }
  var Th = {}, QM = {
    get exports() {
      return Th;
    },
    set exports(e) {
      Th = e;
    }
  };
  /**!
   * Sortable 1.15.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function d0(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function ar(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? d0(Object(n), !0).forEach(function(r) {
        KM(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d0(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function yu(e) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? yu = function(t) {
      return typeof t;
    } : yu = function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, yu(e);
  }
  function KM(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function Sn() {
    return Sn = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }, Sn.apply(this, arguments);
  }
  function qM(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function XM(e, t) {
    if (e == null)
      return {};
    var n = qM(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function ZM(e) {
    return eF(e) || tF(e) || nF(e) || rF();
  }
  function eF(e) {
    if (Array.isArray(e))
      return Ph(e);
  }
  function tF(e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null)
      return Array.from(e);
  }
  function nF(e, t) {
    if (e) {
      if (typeof e == "string")
        return Ph(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
        return Array.from(e);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return Ph(e, t);
    }
  }
  function Ph(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++)
      r[n] = e[n];
    return r;
  }
  function rF() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var iF = "1.15.0";
  function Er(e) {
    if (typeof window != "undefined" && window.navigator)
      return !!/* @__PURE__ */ navigator.userAgent.match(e);
  }
  var Rr = Er(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), gs = Er(/Edge/i), p0 = Er(/firefox/i), hl = Er(/safari/i) && !Er(/chrome/i) && !Er(/android/i), BA = Er(/iP(ad|od|hone)/i), UA = Er(/chrome/i) && Er(/android/i), zA = {
    capture: !1,
    passive: !1
  };
  function pe(e, t, n) {
    e.addEventListener(t, n, !Rr && zA);
  }
  function ue(e, t, n) {
    e.removeEventListener(t, n, !Rr && zA);
  }
  function pc(e, t) {
    if (t) {
      if (t[0] === ">" && (t = t.substring(1)), e)
        try {
          if (e.matches)
            return e.matches(t);
          if (e.msMatchesSelector)
            return e.msMatchesSelector(t);
          if (e.webkitMatchesSelector)
            return e.webkitMatchesSelector(t);
        } catch (n) {
          return !1;
        }
      return !1;
    }
  }
  function oF(e) {
    return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
  }
  function Ln(e, t, n, r) {
    if (e) {
      n = n || document;
      do {
        if (t != null && (t[0] === ">" ? e.parentNode === n && pc(e, t) : pc(e, t)) || r && e === n)
          return e;
        if (e === n)
          break;
      } while (e = oF(e));
    }
    return null;
  }
  var h0 = /\s+/g;
  function Fe(e, t, n) {
    if (e && t)
      if (e.classList)
        e.classList[n ? "add" : "remove"](t);
      else {
        var r = (" " + e.className + " ").replace(h0, " ").replace(" " + t + " ", " ");
        e.className = (r + (n ? " " + t : "")).replace(h0, " ");
      }
  }
  function q(e, t, n) {
    var r = e && e.style;
    if (r) {
      if (n === void 0)
        return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
      !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
    }
  }
  function Wi(e, t) {
    var n = "";
    if (typeof e == "string")
      n = e;
    else
      do {
        var r = q(e, "transform");
        r && r !== "none" && (n = r + " " + n);
      } while (!t && (e = e.parentNode));
    var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return i && new i(n);
  }
  function jA(e, t, n) {
    if (e) {
      var r = e.getElementsByTagName(t), i = 0, o = r.length;
      if (n)
        for (; i < o; i++)
          n(r[i], i);
      return r;
    }
    return [];
  }
  function rr() {
    var e = document.scrollingElement;
    return e || document.documentElement;
  }
  function De(e, t, n, r, i) {
    if (!(!e.getBoundingClientRect && e !== window)) {
      var o, a, l, s, u, c, f;
      if (e !== window && e.parentNode && e !== rr() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !Rr))
        do
          if (i && i.getBoundingClientRect && (q(i, "transform") !== "none" || n && q(i, "position") !== "static")) {
            var d = i.getBoundingClientRect();
            a -= d.top + parseInt(q(i, "border-top-width")), l -= d.left + parseInt(q(i, "border-left-width")), s = a + o.height, u = l + o.width;
            break;
          }
        while (i = i.parentNode);
      if (r && e !== window) {
        var p = Wi(i || e), h = p && p.a, m = p && p.d;
        p && (a /= m, l /= h, f /= h, c /= m, s = a + c, u = l + f);
      }
      return {
        top: a,
        left: l,
        bottom: s,
        right: u,
        width: f,
        height: c
      };
    }
  }
  function m0(e, t, n) {
    for (var r = Kr(e, !0), i = De(e)[t]; r; ) {
      var o = De(r)[n], a = void 0;
      if (n === "top" || n === "left" ? a = i >= o : a = i <= o, !a)
        return r;
      if (r === rr())
        break;
      r = Kr(r, !1);
    }
    return !1;
  }
  function ra(e, t, n, r) {
    for (var i = 0, o = 0, a = e.children; o < a.length; ) {
      if (a[o].style.display !== "none" && a[o] !== ee.ghost && (r || a[o] !== ee.dragged) && Ln(a[o], n.draggable, e, !1)) {
        if (i === t)
          return a[o];
        i++;
      }
      o++;
    }
    return null;
  }
  function kg(e, t) {
    for (var n = e.lastElementChild; n && (n === ee.ghost || q(n, "display") === "none" || t && !pc(n, t)); )
      n = n.previousElementSibling;
    return n || null;
  }
  function $e(e, t) {
    var n = 0;
    if (!e || !e.parentNode)
      return -1;
    for (; e = e.previousElementSibling; )
      e.nodeName.toUpperCase() !== "TEMPLATE" && e !== ee.clone && (!t || pc(e, t)) && n++;
    return n;
  }
  function g0(e) {
    var t = 0, n = 0, r = rr();
    if (e)
      do {
        var i = Wi(e), o = i.a, a = i.d;
        t += e.scrollLeft * o, n += e.scrollTop * a;
      } while (e !== r && (e = e.parentNode));
    return [t, n];
  }
  function aF(e, t) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        for (var r in t)
          if (t.hasOwnProperty(r) && t[r] === e[n][r])
            return Number(n);
      }
    return -1;
  }
  function Kr(e, t) {
    if (!e || !e.getBoundingClientRect)
      return rr();
    var n = e, r = !1;
    do
      if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
        var i = q(n);
        if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
          if (!n.getBoundingClientRect || n === document.body)
            return rr();
          if (r || t)
            return n;
          r = !0;
        }
      }
    while (n = n.parentNode);
    return rr();
  }
  function lF(e, t) {
    if (e && t)
      for (var n in t)
        t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function Bd(e, t) {
    return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
  }
  var ml;
  function WA(e, t) {
    return function() {
      if (!ml) {
        var n = arguments, r = this;
        n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), ml = setTimeout(function() {
          ml = void 0;
        }, t);
      }
    };
  }
  function sF() {
    clearTimeout(ml), ml = void 0;
  }
  function YA(e, t, n) {
    e.scrollLeft += t, e.scrollTop += n;
  }
  function _g(e) {
    var t = window.Polymer, n = window.jQuery || window.Zepto;
    return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
  }
  function v0(e, t) {
    q(e, "position", "absolute"), q(e, "top", t.top), q(e, "left", t.left), q(e, "width", t.width), q(e, "height", t.height);
  }
  function Ud(e) {
    q(e, "position", ""), q(e, "top", ""), q(e, "left", ""), q(e, "width", ""), q(e, "height", "");
  }
  var St = "Sortable" + new Date().getTime();
  function uF() {
    var e = [], t;
    return {
      captureAnimationState: function() {
        if (e = [], !!this.options.animation) {
          var r = [].slice.call(this.el.children);
          r.forEach(function(i) {
            if (!(q(i, "display") === "none" || i === ee.ghost)) {
              e.push({
                target: i,
                rect: De(i)
              });
              var o = ar({}, e[e.length - 1].rect);
              if (i.thisAnimationDuration) {
                var a = Wi(i, !0);
                a && (o.top -= a.f, o.left -= a.e);
              }
              i.fromRect = o;
            }
          });
        }
      },
      addAnimationState: function(r) {
        e.push(r);
      },
      removeAnimationState: function(r) {
        e.splice(aF(e, {
          target: r
        }), 1);
      },
      animateAll: function(r) {
        var i = this;
        if (!this.options.animation) {
          clearTimeout(t), typeof r == "function" && r();
          return;
        }
        var o = !1, a = 0;
        e.forEach(function(l) {
          var s = 0, u = l.target, c = u.fromRect, f = De(u), d = u.prevFromRect, p = u.prevToRect, h = l.rect, m = Wi(u, !0);
          m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Bd(d, f) && !Bd(c, f) && // Make sure animatingRect is on line between toRect & fromRect
          (h.top - f.top) / (h.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = fF(h, d, p, i.options)), Bd(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
            u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
          }, s), u.thisAnimationDuration = s);
        }), clearTimeout(t), o ? t = setTimeout(function() {
          typeof r == "function" && r();
        }, a) : typeof r == "function" && r(), e = [];
      },
      animate: function(r, i, o, a) {
        if (a) {
          q(r, "transition", ""), q(r, "transform", "");
          var l = Wi(this.el), s = l && l.a, u = l && l.d, c = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
          r.animatingX = !!c, r.animatingY = !!f, q(r, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = cF(r), q(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), q(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
            q(r, "transition", ""), q(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
          }, a);
        }
      }
    };
  }
  function cF(e) {
    return e.offsetWidth;
  }
  function fF(e, t, n, r) {
    return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
  }
  var so = [], zd = {
    initializeByDefault: !0
  }, vs = {
    mount: function(t) {
      for (var n in zd)
        zd.hasOwnProperty(n) && !(n in t) && (t[n] = zd[n]);
      so.forEach(function(r) {
        if (r.pluginName === t.pluginName)
          throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
      }), so.push(t);
    },
    pluginEvent: function(t, n, r) {
      var i = this;
      this.eventCanceled = !1, r.cancel = function() {
        i.eventCanceled = !0;
      };
      var o = t + "Global";
      so.forEach(function(a) {
        n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ar({
          sortable: n
        }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](ar({
          sortable: n
        }, r)));
      });
    },
    initializePlugins: function(t, n, r, i) {
      so.forEach(function(l) {
        var s = l.pluginName;
        if (!(!t.options[s] && !l.initializeByDefault)) {
          var u = new l(t, n, t.options);
          u.sortable = t, u.options = t.options, t[s] = u, Sn(r, u.defaults);
        }
      });
      for (var o in t.options)
        if (t.options.hasOwnProperty(o)) {
          var a = this.modifyOption(t, o, t.options[o]);
          typeof a != "undefined" && (t.options[o] = a);
        }
    },
    getEventProperties: function(t, n) {
      var r = {};
      return so.forEach(function(i) {
        typeof i.eventProperties == "function" && Sn(r, i.eventProperties.call(n[i.pluginName], t));
      }), r;
    },
    modifyOption: function(t, n, r) {
      var i;
      return so.forEach(function(o) {
        t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
      }), i;
    }
  };
  function Ja(e) {
    var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, f = e.newDraggableIndex, d = e.originalEvent, p = e.putSortable, h = e.extraEventProperties;
    if (t = t || n && n[St], !!t) {
      var m, S = t.options, g = "on" + r.charAt(0).toUpperCase() + r.substr(1);
      window.CustomEvent && !Rr && !gs ? m = new CustomEvent(r, {
        bubbles: !0,
        cancelable: !0
      }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = c, m.newDraggableIndex = f, m.originalEvent = d, m.pullMode = p ? p.lastPutMode : void 0;
      var v = ar(ar({}, h), vs.getEventProperties(r, t));
      for (var w in v)
        m[w] = v[w];
      n && n.dispatchEvent(m), S[g] && S[g].call(t, m);
    }
  }
  var dF = ["evt"], Tt = function(t, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = XM(r, dF);
    vs.pluginEvent.bind(ee)(t, n, ar({
      dragEl: Y,
      parentEl: Ye,
      ghostEl: ae,
      rootEl: Te,
      nextEl: Ni,
      lastDownEl: wu,
      cloneEl: Me,
      cloneHidden: Gr,
      dragStarted: Qa,
      putSortable: ct,
      activeSortable: ee.active,
      originalEvent: i,
      oldIndex: ko,
      oldDraggableIndex: gl,
      newIndex: $t,
      newDraggableIndex: zr,
      hideGhostForTarget: GA,
      unhideGhostForTarget: JA,
      cloneNowHidden: function() {
        Gr = !0;
      },
      cloneNowShown: function() {
        Gr = !1;
      },
      dispatchSortableEvent: function(l) {
        At({
          sortable: n,
          name: l,
          originalEvent: i
        });
      }
    }, o));
  };
  function At(e) {
    Ja(ar({
      putSortable: ct,
      cloneEl: Me,
      targetEl: Y,
      rootEl: Te,
      oldIndex: ko,
      oldDraggableIndex: gl,
      newIndex: $t,
      newDraggableIndex: zr
    }, e));
  }
  var Y, Ye, ae, Te, Ni, wu, Me, Gr, ko, $t, gl, zr, Ks, ct, po = !1, hc = !1, mc = [], ki, Pn, jd, Wd, y0, w0, Qa, uo, vl, yl = !1, qs = !1, bu, vt, Yd = [], Nh = !1, gc = [], Df = typeof document != "undefined", Xs = BA, b0 = gs || Rr ? "cssFloat" : "float", pF = Df && !UA && !BA && "draggable" in document.createElement("div"), VA = function() {
    if (Df) {
      if (Rr)
        return !1;
      var e = document.createElement("x");
      return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
    }
  }(), $A = function(t, n) {
    var r = q(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ra(t, 0, n), a = ra(t, 1, n), l = o && q(o), s = a && q(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + De(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + De(a).width;
    if (r.display === "flex")
      return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    if (r.display === "grid")
      return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    if (o && l.float && l.float !== "none") {
      var f = l.float === "left" ? "left" : "right";
      return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
    }
    return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[b0] === "none" || a && r[b0] === "none" && u + c > i) ? "vertical" : "horizontal";
  }, hF = function(t, n, r) {
    var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
    return i === l || o === s || i + a / 2 === l + u / 2;
  }, mF = function(t, n) {
    var r;
    return mc.some(function(i) {
      var o = i[St].options.emptyInsertThreshold;
      if (!(!o || kg(i))) {
        var a = De(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
        if (l && s)
          return r = i;
      }
    }), r;
  }, HA = function(t) {
    function n(o, a) {
      return function(l, s, u, c) {
        var f = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
        if (o == null && (a || f))
          return !0;
        if (o == null || o === !1)
          return !1;
        if (a && o === "clone")
          return o;
        if (typeof o == "function")
          return n(o(l, s, u, c), a)(l, s, u, c);
        var d = (a ? l : s).options.group.name;
        return o === !0 || typeof o == "string" && o === d || o.join && o.indexOf(d) > -1;
      };
    }
    var r = {}, i = t.group;
    (!i || yu(i) != "object") && (i = {
      name: i
    }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
  }, GA = function() {
    !VA && ae && q(ae, "display", "none");
  }, JA = function() {
    !VA && ae && q(ae, "display", "");
  };
  Df && !UA && document.addEventListener("click", function(e) {
    if (hc)
      return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), hc = !1, !1;
  }, !0);
  var _i = function(t) {
    if (Y) {
      t = t.touches ? t.touches[0] : t;
      var n = mF(t.clientX, t.clientY);
      if (n) {
        var r = {};
        for (var i in t)
          t.hasOwnProperty(i) && (r[i] = t[i]);
        r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[St]._onDragOver(r);
      }
    }
  }, gF = function(t) {
    Y && Y.parentNode[St]._isOutsideThisEl(t.target);
  };
  function ee(e, t) {
    if (!(e && e.nodeType && e.nodeType === 1))
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
    this.el = e, this.options = t = Sn({}, t), e[St] = this;
    var n = {
      group: null,
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: !1,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: !0,
      direction: function() {
        return $A(e, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      easing: null,
      setData: function(a, l) {
        a.setData("Text", l.textContent);
      },
      dropBubble: !1,
      dragoverBubble: !1,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: !1,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: !1,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: !1,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: ee.supportPointer !== !1 && "PointerEvent" in window && !hl,
      emptyInsertThreshold: 5
    };
    vs.initializePlugins(this, e, n);
    for (var r in n)
      !(r in t) && (t[r] = n[r]);
    HA(t);
    for (var i in this)
      i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
    this.nativeDraggable = t.forceFallback ? !1 : pF, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? pe(e, "pointerdown", this._onTapStart) : (pe(e, "mousedown", this._onTapStart), pe(e, "touchstart", this._onTapStart)), this.nativeDraggable && (pe(e, "dragover", this), pe(e, "dragenter", this)), mc.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Sn(this, uF());
  }
  ee.prototype = /** @lends Sortable.prototype */
  {
    constructor: ee,
    _isOutsideThisEl: function(t) {
      !this.el.contains(t) && t !== this.el && (uo = null);
    },
    _getDirection: function(t, n) {
      return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, Y) : this.options.direction;
    },
    _onTapStart: function(t) {
      if (t.cancelable) {
        var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = i.filter;
        if (CF(r), !Y && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && hl && s && s.tagName.toUpperCase() === "SELECT") && (s = Ln(s, i.draggable, r, !1), !(s && s.animated) && wu !== s)) {
          if (ko = $e(s), gl = $e(s, i.draggable), typeof c == "function") {
            if (c.call(this, t, s, this)) {
              At({
                sortable: n,
                rootEl: u,
                name: "filter",
                targetEl: s,
                toEl: r,
                fromEl: r
              }), Tt("filter", n, {
                evt: t
              }), o && t.cancelable && t.preventDefault();
              return;
            }
          } else if (c && (c = c.split(",").some(function(f) {
            if (f = Ln(u, f.trim(), r, !1), f)
              return At({
                sortable: n,
                rootEl: f,
                name: "filter",
                targetEl: s,
                fromEl: r,
                toEl: r
              }), Tt("filter", n, {
                evt: t
              }), !0;
          }), c)) {
            o && t.cancelable && t.preventDefault();
            return;
          }
          i.handle && !Ln(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
        }
      }
    },
    _prepareDragStart: function(t, n, r) {
      var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
      if (r && !Y && r.parentNode === o) {
        var u = De(r);
        if (Te = o, Y = r, Ye = Y.parentNode, Ni = Y.nextSibling, wu = r, Ks = a.group, ee.dragged = Y, ki = {
          target: Y,
          clientX: (n || t).clientX,
          clientY: (n || t).clientY
        }, y0 = ki.clientX - u.left, w0 = ki.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, Y.style["will-change"] = "all", s = function() {
          if (Tt("delayEnded", i, {
            evt: t
          }), ee.eventCanceled) {
            i._onDrop();
            return;
          }
          i._disableDelayedDragEvents(), !p0 && i.nativeDraggable && (Y.draggable = !0), i._triggerDragStart(t, n), At({
            sortable: i,
            name: "choose",
            originalEvent: t
          }), Fe(Y, a.chosenClass, !0);
        }, a.ignore.split(",").forEach(function(c) {
          jA(Y, c.trim(), Vd);
        }), pe(l, "dragover", _i), pe(l, "mousemove", _i), pe(l, "touchmove", _i), pe(l, "mouseup", i._onDrop), pe(l, "touchend", i._onDrop), pe(l, "touchcancel", i._onDrop), p0 && this.nativeDraggable && (this.options.touchStartThreshold = 4, Y.draggable = !0), Tt("delayStart", this, {
          evt: t
        }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(gs || Rr))) {
          if (ee.eventCanceled) {
            this._onDrop();
            return;
          }
          pe(l, "mouseup", i._disableDelayedDrag), pe(l, "touchend", i._disableDelayedDrag), pe(l, "touchcancel", i._disableDelayedDrag), pe(l, "mousemove", i._delayedDragTouchMoveHandler), pe(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && pe(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
        } else
          s();
      }
    },
    _delayedDragTouchMoveHandler: function(t) {
      var n = t.touches ? t.touches[0] : t;
      Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
    },
    _disableDelayedDrag: function() {
      Y && Vd(Y), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function() {
      var t = this.el.ownerDocument;
      ue(t, "mouseup", this._disableDelayedDrag), ue(t, "touchend", this._disableDelayedDrag), ue(t, "touchcancel", this._disableDelayedDrag), ue(t, "mousemove", this._delayedDragTouchMoveHandler), ue(t, "touchmove", this._delayedDragTouchMoveHandler), ue(t, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function(t, n) {
      n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? pe(document, "pointermove", this._onTouchMove) : n ? pe(document, "touchmove", this._onTouchMove) : pe(document, "mousemove", this._onTouchMove) : (pe(Y, "dragend", this), pe(Te, "dragstart", this._onDragStart));
      try {
        document.selection ? Su(function() {
          document.selection.empty();
        }) : window.getSelection().removeAllRanges();
      } catch (r) {
      }
    },
    _dragStarted: function(t, n) {
      if (po = !1, Te && Y) {
        Tt("dragStarted", this, {
          evt: n
        }), this.nativeDraggable && pe(document, "dragover", gF);
        var r = this.options;
        !t && Fe(Y, r.dragClass, !1), Fe(Y, r.ghostClass, !0), ee.active = this, t && this._appendGhost(), At({
          sortable: this,
          name: "start",
          originalEvent: n
        });
      } else
        this._nulling();
    },
    _emulateDragOver: function() {
      if (Pn) {
        this._lastX = Pn.clientX, this._lastY = Pn.clientY, GA();
        for (var t = document.elementFromPoint(Pn.clientX, Pn.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Pn.clientX, Pn.clientY), t !== n); )
          n = t;
        if (Y.parentNode[St]._isOutsideThisEl(t), n)
          do {
            if (n[St]) {
              var r = void 0;
              if (r = n[St]._onDragOver({
                clientX: Pn.clientX,
                clientY: Pn.clientY,
                target: t,
                rootEl: n
              }), r && !this.options.dragoverBubble)
                break;
            }
            t = n;
          } while (n = n.parentNode);
        JA();
      }
    },
    _onTouchMove: function(t) {
      if (ki) {
        var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = ae && Wi(ae, !0), l = ae && a && a.a, s = ae && a && a.d, u = Xs && vt && g0(vt), c = (o.clientX - ki.clientX + i.x) / (l || 1) + (u ? u[0] - Yd[0] : 0) / (l || 1), f = (o.clientY - ki.clientY + i.y) / (s || 1) + (u ? u[1] - Yd[1] : 0) / (s || 1);
        if (!ee.active && !po) {
          if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
            return;
          this._onDragStart(t, !0);
        }
        if (ae) {
          a ? (a.e += c - (jd || 0), a.f += f - (Wd || 0)) : a = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: c,
            f
          };
          var d = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
          q(ae, "webkitTransform", d), q(ae, "mozTransform", d), q(ae, "msTransform", d), q(ae, "transform", d), jd = c, Wd = f, Pn = o;
        }
        t.cancelable && t.preventDefault();
      }
    },
    _appendGhost: function() {
      if (!ae) {
        var t = this.options.fallbackOnBody ? document.body : Te, n = De(Y, !0, Xs, !0, t), r = this.options;
        if (Xs) {
          for (vt = t; q(vt, "position") === "static" && q(vt, "transform") === "none" && vt !== document; )
            vt = vt.parentNode;
          vt !== document.body && vt !== document.documentElement ? (vt === document && (vt = rr()), n.top += vt.scrollTop, n.left += vt.scrollLeft) : vt = rr(), Yd = g0(vt);
        }
        ae = Y.cloneNode(!0), Fe(ae, r.ghostClass, !1), Fe(ae, r.fallbackClass, !0), Fe(ae, r.dragClass, !0), q(ae, "transition", ""), q(ae, "transform", ""), q(ae, "box-sizing", "border-box"), q(ae, "margin", 0), q(ae, "top", n.top), q(ae, "left", n.left), q(ae, "width", n.width), q(ae, "height", n.height), q(ae, "opacity", "0.8"), q(ae, "position", Xs ? "absolute" : "fixed"), q(ae, "zIndex", "100000"), q(ae, "pointerEvents", "none"), ee.ghost = ae, t.appendChild(ae), q(ae, "transform-origin", y0 / parseInt(ae.style.width) * 100 + "% " + w0 / parseInt(ae.style.height) * 100 + "%");
      }
    },
    _onDragStart: function(t, n) {
      var r = this, i = t.dataTransfer, o = r.options;
      if (Tt("dragStart", this, {
        evt: t
      }), ee.eventCanceled) {
        this._onDrop();
        return;
      }
      Tt("setupClone", this), ee.eventCanceled || (Me = _g(Y), Me.removeAttribute("id"), Me.draggable = !1, Me.style["will-change"] = "", this._hideClone(), Fe(Me, this.options.chosenClass, !1), ee.clone = Me), r.cloneId = Su(function() {
        Tt("clone", r), !ee.eventCanceled && (r.options.removeCloneOnHide || Te.insertBefore(Me, Y), r._hideClone(), At({
          sortable: r,
          name: "clone"
        }));
      }), !n && Fe(Y, o.dragClass, !0), n ? (hc = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (ue(document, "mouseup", r._onDrop), ue(document, "touchend", r._onDrop), ue(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, Y)), pe(document, "drop", r), q(Y, "transform", "translateZ(0)")), po = !0, r._dragStartId = Su(r._dragStarted.bind(r, n, t)), pe(document, "selectstart", r), Qa = !0, hl && q(document.body, "user-select", "none");
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function(t) {
      var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = ee.active, c = Ks === s, f = l.sort, d = ct || u, p, h = this, m = !1;
      if (Nh)
        return;
      function S(B, V) {
        Tt(B, h, ar({
          evt: t,
          isOwner: c,
          axis: p ? "vertical" : "horizontal",
          revert: a,
          dragRect: i,
          targetRect: o,
          canSort: f,
          fromSortable: d,
          target: r,
          completed: v,
          onMove: function(x, C) {
            return Zs(Te, n, Y, i, x, De(x), t, C);
          },
          changed: w
        }, V));
      }
      function g() {
        S("dragOverAnimationCapture"), h.captureAnimationState(), h !== d && d.captureAnimationState();
      }
      function v(B) {
        return S("dragOverCompleted", {
          insertion: B
        }), B && (c ? u._hideClone() : u._showClone(h), h !== d && (Fe(Y, ct ? ct.options.ghostClass : u.options.ghostClass, !1), Fe(Y, l.ghostClass, !0)), ct !== h && h !== ee.active ? ct = h : h === ee.active && ct && (ct = null), d === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
          S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
        }), h !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (r === Y && !Y.animated || r === n && !r.animated) && (uo = null), !l.dragoverBubble && !t.rootEl && r !== document && (Y.parentNode[St]._isOutsideThisEl(t.target), !B && _i(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
      }
      function w() {
        $t = $e(Y), zr = $e(Y, l.draggable), At({
          sortable: h,
          name: "change",
          toEl: n,
          newIndex: $t,
          newDraggableIndex: zr,
          originalEvent: t
        });
      }
      if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Ln(r, l.draggable, n, !0), S("dragOver"), ee.eventCanceled)
        return m;
      if (Y.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
        return v(!1);
      if (hc = !1, u && !l.disabled && (c ? f || (a = Ye !== Te) : ct === this || (this.lastPutMode = Ks.checkPull(this, u, Y, t)) && s.checkPut(this, u, Y, t))) {
        if (p = this._getDirection(t, r) === "vertical", i = De(Y), S("dragOverValid"), ee.eventCanceled)
          return m;
        if (a)
          return Ye = Te, g(), this._hideClone(), S("revert"), ee.eventCanceled || (Ni ? Te.insertBefore(Y, Ni) : Te.appendChild(Y)), v(!0);
        var E = kg(n, l.draggable);
        if (!E || bF(t, p, this) && !E.animated) {
          if (E === Y)
            return v(!1);
          if (E && n === t.target && (r = E), r && (o = De(r)), Zs(Te, n, Y, i, r, o, t, !!r) !== !1)
            return g(), E && E.nextSibling ? n.insertBefore(Y, E.nextSibling) : n.appendChild(Y), Ye = n, w(), v(!0);
        } else if (E && wF(t, p, this)) {
          var k = ra(n, 0, l, !0);
          if (k === Y)
            return v(!1);
          if (r = k, o = De(r), Zs(Te, n, Y, i, r, o, t, !1) !== !1)
            return g(), n.insertBefore(Y, k), Ye = n, w(), v(!0);
        } else if (r.parentNode === n) {
          o = De(r);
          var b = 0, A, O = Y.parentNode !== n, T = !hF(Y.animated && Y.toRect || i, r.animated && r.toRect || o, p), P = p ? "top" : "left", I = m0(r, "top", "top") || m0(Y, "top", "top"), F = I ? I.scrollTop : void 0;
          uo !== r && (A = o[P], yl = !1, qs = !T && l.invertSwap || O), b = SF(t, r, o, p, T ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, qs, uo === r);
          var U;
          if (b !== 0) {
            var X = $e(Y);
            do
              X -= b, U = Ye.children[X];
            while (U && (q(U, "display") === "none" || U === ae));
          }
          if (b === 0 || U === r)
            return v(!1);
          uo = r, vl = b;
          var oe = r.nextElementSibling, ne = !1;
          ne = b === 1;
          var fe = Zs(Te, n, Y, i, r, o, t, ne);
          if (fe !== !1)
            return (fe === 1 || fe === -1) && (ne = fe === 1), Nh = !0, setTimeout(yF, 30), g(), ne && !oe ? n.appendChild(Y) : r.parentNode.insertBefore(Y, ne ? oe : r), I && YA(I, 0, F - I.scrollTop), Ye = Y.parentNode, A !== void 0 && !qs && (bu = Math.abs(A - De(r)[P])), w(), v(!0);
        }
        if (n.contains(Y))
          return v(!1);
      }
      return !1;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function() {
      ue(document, "mousemove", this._onTouchMove), ue(document, "touchmove", this._onTouchMove), ue(document, "pointermove", this._onTouchMove), ue(document, "dragover", _i), ue(document, "mousemove", _i), ue(document, "touchmove", _i);
    },
    _offUpEvents: function() {
      var t = this.el.ownerDocument;
      ue(t, "mouseup", this._onDrop), ue(t, "touchend", this._onDrop), ue(t, "pointerup", this._onDrop), ue(t, "touchcancel", this._onDrop), ue(document, "selectstart", this);
    },
    _onDrop: function(t) {
      var n = this.el, r = this.options;
      if ($t = $e(Y), zr = $e(Y, r.draggable), Tt("drop", this, {
        evt: t
      }), Ye = Y && Y.parentNode, $t = $e(Y), zr = $e(Y, r.draggable), ee.eventCanceled) {
        this._nulling();
        return;
      }
      po = !1, qs = !1, yl = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Dh(this.cloneId), Dh(this._dragStartId), this.nativeDraggable && (ue(document, "drop", this), ue(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), hl && q(document.body, "user-select", ""), q(Y, "transform", ""), t && (Qa && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), ae && ae.parentNode && ae.parentNode.removeChild(ae), (Te === Ye || ct && ct.lastPutMode !== "clone") && Me && Me.parentNode && Me.parentNode.removeChild(Me), Y && (this.nativeDraggable && ue(Y, "dragend", this), Vd(Y), Y.style["will-change"] = "", Qa && !po && Fe(Y, ct ? ct.options.ghostClass : this.options.ghostClass, !1), Fe(Y, this.options.chosenClass, !1), At({
        sortable: this,
        name: "unchoose",
        toEl: Ye,
        newIndex: null,
        newDraggableIndex: null,
        originalEvent: t
      }), Te !== Ye ? ($t >= 0 && (At({
        rootEl: Ye,
        name: "add",
        toEl: Ye,
        fromEl: Te,
        originalEvent: t
      }), At({
        sortable: this,
        name: "remove",
        toEl: Ye,
        originalEvent: t
      }), At({
        rootEl: Ye,
        name: "sort",
        toEl: Ye,
        fromEl: Te,
        originalEvent: t
      }), At({
        sortable: this,
        name: "sort",
        toEl: Ye,
        originalEvent: t
      })), ct && ct.save()) : $t !== ko && $t >= 0 && (At({
        sortable: this,
        name: "update",
        toEl: Ye,
        originalEvent: t
      }), At({
        sortable: this,
        name: "sort",
        toEl: Ye,
        originalEvent: t
      })), ee.active && (($t == null || $t === -1) && ($t = ko, zr = gl), At({
        sortable: this,
        name: "end",
        toEl: Ye,
        originalEvent: t
      }), this.save()))), this._nulling();
    },
    _nulling: function() {
      Tt("nulling", this), Te = Y = Ye = ae = Ni = Me = wu = Gr = ki = Pn = Qa = $t = zr = ko = gl = uo = vl = ct = Ks = ee.dragged = ee.ghost = ee.clone = ee.active = null, gc.forEach(function(t) {
        t.checked = !0;
      }), gc.length = jd = Wd = 0;
    },
    handleEvent: function(t) {
      switch (t.type) {
        case "drop":
        case "dragend":
          this._onDrop(t);
          break;
        case "dragenter":
        case "dragover":
          Y && (this._onDragOver(t), vF(t));
          break;
        case "selectstart":
          t.preventDefault();
          break;
      }
    },
    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function() {
      for (var t = [], n, r = this.el.children, i = 0, o = r.length, a = this.options; i < o; i++)
        n = r[i], Ln(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || AF(n));
      return t;
    },
    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function(t, n) {
      var r = {}, i = this.el;
      this.toArray().forEach(function(o, a) {
        var l = i.children[a];
        Ln(l, this.options.draggable, i, !1) && (r[o] = l);
      }, this), n && this.captureAnimationState(), t.forEach(function(o) {
        r[o] && (i.removeChild(r[o]), i.appendChild(r[o]));
      }), n && this.animateAll();
    },
    /**
     * Save the current sorting
     */
    save: function() {
      var t = this.options.store;
      t && t.set && t.set(this);
    },
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function(t, n) {
      return Ln(t, n || this.options.draggable, this.el, !1);
    },
    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function(t, n) {
      var r = this.options;
      if (n === void 0)
        return r[t];
      var i = vs.modifyOption(this, t, n);
      typeof i != "undefined" ? r[t] = i : r[t] = n, t === "group" && HA(r);
    },
    /**
     * Destroy
     */
    destroy: function() {
      Tt("destroy", this);
      var t = this.el;
      t[St] = null, ue(t, "mousedown", this._onTapStart), ue(t, "touchstart", this._onTapStart), ue(t, "pointerdown", this._onTapStart), this.nativeDraggable && (ue(t, "dragover", this), ue(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
        n.removeAttribute("draggable");
      }), this._onDrop(), this._disableDelayedDragEvents(), mc.splice(mc.indexOf(this.el), 1), this.el = t = null;
    },
    _hideClone: function() {
      if (!Gr) {
        if (Tt("hideClone", this), ee.eventCanceled)
          return;
        q(Me, "display", "none"), this.options.removeCloneOnHide && Me.parentNode && Me.parentNode.removeChild(Me), Gr = !0;
      }
    },
    _showClone: function(t) {
      if (t.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (Gr) {
        if (Tt("showClone", this), ee.eventCanceled)
          return;
        Y.parentNode == Te && !this.options.group.revertClone ? Te.insertBefore(Me, Y) : Ni ? Te.insertBefore(Me, Ni) : Te.appendChild(Me), this.options.group.revertClone && this.animate(Y, Me), q(Me, "display", ""), Gr = !1;
      }
    }
  };
  function vF(e) {
    e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
  }
  function Zs(e, t, n, r, i, o, a, l) {
    var s, u = e[St], c = u.options.onMove, f;
    return window.CustomEvent && !Rr && !gs ? s = new CustomEvent("move", {
      bubbles: !0,
      cancelable: !0
    }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || De(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
  }
  function Vd(e) {
    e.draggable = !1;
  }
  function yF() {
    Nh = !1;
  }
  function wF(e, t, n) {
    var r = De(ra(n.el, 0, n.options, !0)), i = 10;
    return t ? e.clientX < r.left - i || e.clientY < r.top && e.clientX < r.right : e.clientY < r.top - i || e.clientY < r.bottom && e.clientX < r.left;
  }
  function bF(e, t, n) {
    var r = De(kg(n.el, n.options.draggable)), i = 10;
    return t ? e.clientX > r.right + i || e.clientX <= r.right && e.clientY > r.bottom && e.clientX >= r.left : e.clientX > r.right && e.clientY > r.top || e.clientX <= r.right && e.clientY > r.bottom + i;
  }
  function SF(e, t, n, r, i, o, a, l) {
    var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, f = r ? n.bottom : n.right, d = !1;
    if (!a) {
      if (l && bu < u * i) {
        if (!yl && (vl === 1 ? s > c + u * o / 2 : s < f - u * o / 2) && (yl = !0), yl)
          d = !0;
        else if (vl === 1 ? s < c + bu : s > f - bu)
          return -vl;
      } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
        return EF(t);
    }
    return d = d || a, d && (s < c + u * o / 2 || s > f - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
  }
  function EF(e) {
    return $e(Y) < $e(e) ? 1 : -1;
  }
  function AF(e) {
    for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
      r += t.charCodeAt(n);
    return r.toString(36);
  }
  function CF(e) {
    gc.length = 0;
    for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
      var r = t[n];
      r.checked && gc.push(r);
    }
  }
  function Su(e) {
    return setTimeout(e, 0);
  }
  function Dh(e) {
    return clearTimeout(e);
  }
  Df && pe(document, "touchmove", function(e) {
    (ee.active || po) && e.cancelable && e.preventDefault();
  });
  ee.utils = {
    on: pe,
    off: ue,
    css: q,
    find: jA,
    is: function(t, n) {
      return !!Ln(t, n, t, !1);
    },
    extend: lF,
    throttle: WA,
    closest: Ln,
    toggleClass: Fe,
    clone: _g,
    index: $e,
    nextTick: Su,
    cancelNextTick: Dh,
    detectDirection: $A,
    getChild: ra
  };
  ee.get = function(e) {
    return e[St];
  };
  ee.mount = function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
      if (!r.prototype || !r.prototype.constructor)
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
      r.utils && (ee.utils = ar(ar({}, ee.utils), r.utils)), vs.mount(r);
    });
  };
  ee.create = function(e, t) {
    return new ee(e, t);
  };
  ee.version = iF;
  var Xe = [], Ka, Rh, Lh = !1, $d, Hd, vc, qa;
  function xF() {
    function e() {
      this.defaults = {
        scroll: !0,
        forceAutoScrollFallback: !1,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: !0
      };
      for (var t in this)
        t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
    }
    return e.prototype = {
      dragStarted: function(n) {
        var r = n.originalEvent;
        this.sortable.nativeDraggable ? pe(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? pe(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? pe(document, "touchmove", this._handleFallbackAutoScroll) : pe(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function(n) {
        var r = n.originalEvent;
        !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
      },
      drop: function() {
        this.sortable.nativeDraggable ? ue(document, "dragover", this._handleAutoScroll) : (ue(document, "pointermove", this._handleFallbackAutoScroll), ue(document, "touchmove", this._handleFallbackAutoScroll), ue(document, "mousemove", this._handleFallbackAutoScroll)), S0(), Eu(), sF();
      },
      nulling: function() {
        vc = Rh = Ka = Lh = qa = $d = Hd = null, Xe.length = 0;
      },
      _handleFallbackAutoScroll: function(n) {
        this._handleAutoScroll(n, !0);
      },
      _handleAutoScroll: function(n, r) {
        var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
        if (vc = n, r || this.options.forceAutoScrollFallback || gs || Rr || hl) {
          Gd(n, this.options, l, r);
          var s = Kr(l, !0);
          Lh && (!qa || o !== $d || a !== Hd) && (qa && S0(), qa = setInterval(function() {
            var u = Kr(document.elementFromPoint(o, a), !0);
            u !== s && (s = u, Eu()), Gd(n, i.options, u, r);
          }, 10), $d = o, Hd = a);
        } else {
          if (!this.options.bubbleScroll || Kr(l, !0) === rr()) {
            Eu();
            return;
          }
          Gd(n, this.options, Kr(l, !1), !1);
        }
      }
    }, Sn(e, {
      pluginName: "scroll",
      initializeByDefault: !0
    });
  }
  function Eu() {
    Xe.forEach(function(e) {
      clearInterval(e.pid);
    }), Xe = [];
  }
  function S0() {
    clearInterval(qa);
  }
  var Gd = WA(function(e, t, n, r) {
    if (t.scroll) {
      var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = rr(), u = !1, c;
      Rh !== n && (Rh = n, Eu(), Ka = t.scroll, c = t.scrollFn, Ka === !0 && (Ka = Kr(n, !0)));
      var f = 0, d = Ka;
      do {
        var p = d, h = De(p), m = h.top, S = h.bottom, g = h.left, v = h.right, w = h.width, E = h.height, k = void 0, b = void 0, A = p.scrollWidth, O = p.scrollHeight, T = q(p), P = p.scrollLeft, I = p.scrollTop;
        p === s ? (k = w < A && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), b = E < O && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (k = w < A && (T.overflowX === "auto" || T.overflowX === "scroll"), b = E < O && (T.overflowY === "auto" || T.overflowY === "scroll"));
        var F = k && (Math.abs(v - i) <= a && P + w < A) - (Math.abs(g - i) <= a && !!P), U = b && (Math.abs(S - o) <= a && I + E < O) - (Math.abs(m - o) <= a && !!I);
        if (!Xe[f])
          for (var X = 0; X <= f; X++)
            Xe[X] || (Xe[X] = {});
        (Xe[f].vx != F || Xe[f].vy != U || Xe[f].el !== p) && (Xe[f].el = p, Xe[f].vx = F, Xe[f].vy = U, clearInterval(Xe[f].pid), (F != 0 || U != 0) && (u = !0, Xe[f].pid = setInterval(function() {
          r && this.layer === 0 && ee.active._onTouchMove(vc);
          var oe = Xe[this.layer].vy ? Xe[this.layer].vy * l : 0, ne = Xe[this.layer].vx ? Xe[this.layer].vx * l : 0;
          typeof c == "function" && c.call(ee.dragged.parentNode[St], ne, oe, e, vc, Xe[this.layer].el) !== "continue" || YA(Xe[this.layer].el, ne, oe);
        }.bind({
          layer: f
        }), 24))), f++;
      } while (t.bubbleScroll && d !== s && (d = Kr(d, !1)));
      Lh = u;
    }
  }, 30), QA = function(t) {
    var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
    if (n) {
      var u = r || o;
      l();
      var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, f = document.elementFromPoint(c.clientX, c.clientY);
      s(), u && !u.el.contains(f) && (a("spill"), this.onSpill({
        dragEl: i,
        putSortable: r
      }));
    }
  };
  function Og() {
  }
  Og.prototype = {
    startIndex: null,
    dragStart: function(t) {
      var n = t.oldDraggableIndex;
      this.startIndex = n;
    },
    onSpill: function(t) {
      var n = t.dragEl, r = t.putSortable;
      this.sortable.captureAnimationState(), r && r.captureAnimationState();
      var i = ra(this.sortable.el, this.startIndex, this.options);
      i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
    },
    drop: QA
  };
  Sn(Og, {
    pluginName: "revertOnSpill"
  });
  function Ig() {
  }
  Ig.prototype = {
    onSpill: function(t) {
      var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
      i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
    },
    drop: QA
  };
  Sn(Ig, {
    pluginName: "removeOnSpill"
  });
  var sn;
  function kF() {
    function e() {
      this.defaults = {
        swapClass: "sortable-swap-highlight"
      };
    }
    return e.prototype = {
      dragStart: function(n) {
        var r = n.dragEl;
        sn = r;
      },
      dragOverValid: function(n) {
        var r = n.completed, i = n.target, o = n.onMove, a = n.activeSortable, l = n.changed, s = n.cancel;
        if (a.options.swap) {
          var u = this.sortable.el, c = this.options;
          if (i && i !== u) {
            var f = sn;
            o(i) !== !1 ? (Fe(i, c.swapClass, !0), sn = i) : sn = null, f && f !== sn && Fe(f, c.swapClass, !1);
          }
          l(), r(!0), s();
        }
      },
      drop: function(n) {
        var r = n.activeSortable, i = n.putSortable, o = n.dragEl, a = i || this.sortable, l = this.options;
        sn && Fe(sn, l.swapClass, !1), sn && (l.swap || i && i.options.swap) && o !== sn && (a.captureAnimationState(), a !== r && r.captureAnimationState(), _F(o, sn), a.animateAll(), a !== r && r.animateAll());
      },
      nulling: function() {
        sn = null;
      }
    }, Sn(e, {
      pluginName: "swap",
      eventProperties: function() {
        return {
          swapItem: sn
        };
      }
    });
  }
  function _F(e, t) {
    var n = e.parentNode, r = t.parentNode, i, o;
    !n || !r || n.isEqualNode(t) || r.isEqualNode(e) || (i = $e(e), o = $e(t), n.isEqualNode(r) && i < o && o++, n.insertBefore(t, n.children[i]), r.insertBefore(e, r.children[o]));
  }
  var ie = [], Vt = [], Ba, Nn, Ua = !1, Pt = !1, co = !1, xe, za, eu;
  function OF() {
    function e(t) {
      for (var n in this)
        n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
      t.options.avoidImplicitDeselect || (t.options.supportPointer ? pe(document, "pointerup", this._deselectMultiDrag) : (pe(document, "mouseup", this._deselectMultiDrag), pe(document, "touchend", this._deselectMultiDrag))), pe(document, "keydown", this._checkKeyDown), pe(document, "keyup", this._checkKeyUp), this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        avoidImplicitDeselect: !1,
        setData: function(i, o) {
          var a = "";
          ie.length && Nn === t ? ie.forEach(function(l, s) {
            a += (s ? ", " : "") + l.textContent;
          }) : a = o.textContent, i.setData("Text", a);
        }
      };
    }
    return e.prototype = {
      multiDragKeyDown: !1,
      isMultiDrag: !1,
      delayStartGlobal: function(n) {
        var r = n.dragEl;
        xe = r;
      },
      delayEnded: function() {
        this.isMultiDrag = ~ie.indexOf(xe);
      },
      setupClone: function(n) {
        var r = n.sortable, i = n.cancel;
        if (this.isMultiDrag) {
          for (var o = 0; o < ie.length; o++)
            Vt.push(_g(ie[o])), Vt[o].sortableIndex = ie[o].sortableIndex, Vt[o].draggable = !1, Vt[o].style["will-change"] = "", Fe(Vt[o], this.options.selectedClass, !1), ie[o] === xe && Fe(Vt[o], this.options.chosenClass, !1);
          r._hideClone(), i();
        }
      },
      clone: function(n) {
        var r = n.sortable, i = n.rootEl, o = n.dispatchSortableEvent, a = n.cancel;
        this.isMultiDrag && (this.options.removeCloneOnHide || ie.length && Nn === r && (E0(!0, i), o("clone"), a()));
      },
      showClone: function(n) {
        var r = n.cloneNowShown, i = n.rootEl, o = n.cancel;
        this.isMultiDrag && (E0(!1, i), Vt.forEach(function(a) {
          q(a, "display", "");
        }), r(), eu = !1, o());
      },
      hideClone: function(n) {
        var r = this;
        n.sortable;
        var i = n.cloneNowHidden, o = n.cancel;
        this.isMultiDrag && (Vt.forEach(function(a) {
          q(a, "display", "none"), r.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
        }), i(), eu = !0, o());
      },
      dragStartGlobal: function(n) {
        n.sortable, !this.isMultiDrag && Nn && Nn.multiDrag._deselectMultiDrag(), ie.forEach(function(r) {
          r.sortableIndex = $e(r);
        }), ie = ie.sort(function(r, i) {
          return r.sortableIndex - i.sortableIndex;
        }), co = !0;
      },
      dragStarted: function(n) {
        var r = this, i = n.sortable;
        if (this.isMultiDrag) {
          if (this.options.sort && (i.captureAnimationState(), this.options.animation)) {
            ie.forEach(function(a) {
              a !== xe && q(a, "position", "absolute");
            });
            var o = De(xe, !1, !0, !0);
            ie.forEach(function(a) {
              a !== xe && v0(a, o);
            }), Pt = !0, Ua = !0;
          }
          i.animateAll(function() {
            Pt = !1, Ua = !1, r.options.animation && ie.forEach(function(a) {
              Ud(a);
            }), r.options.sort && tu();
          });
        }
      },
      dragOver: function(n) {
        var r = n.target, i = n.completed, o = n.cancel;
        Pt && ~ie.indexOf(r) && (i(!1), o());
      },
      revert: function(n) {
        var r = n.fromSortable, i = n.rootEl, o = n.sortable, a = n.dragRect;
        ie.length > 1 && (ie.forEach(function(l) {
          o.addAnimationState({
            target: l,
            rect: Pt ? De(l) : a
          }), Ud(l), l.fromRect = a, r.removeAnimationState(l);
        }), Pt = !1, IF(!this.options.removeCloneOnHide, i));
      },
      dragOverCompleted: function(n) {
        var r = n.sortable, i = n.isOwner, o = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, u = this.options;
        if (o) {
          if (i && a._hideClone(), Ua = !1, u.animation && ie.length > 1 && (Pt || !i && !a.options.sort && !s)) {
            var c = De(xe, !1, !0, !0);
            ie.forEach(function(d) {
              d !== xe && (v0(d, c), l.appendChild(d));
            }), Pt = !0;
          }
          if (!i)
            if (Pt || tu(), ie.length > 1) {
              var f = eu;
              a._showClone(r), a.options.animation && !eu && f && Vt.forEach(function(d) {
                a.addAnimationState({
                  target: d,
                  rect: za
                }), d.fromRect = za, d.thisAnimationDuration = null;
              });
            } else
              a._showClone(r);
        }
      },
      dragOverAnimationCapture: function(n) {
        var r = n.dragRect, i = n.isOwner, o = n.activeSortable;
        if (ie.forEach(function(l) {
          l.thisAnimationDuration = null;
        }), o.options.animation && !i && o.multiDrag.isMultiDrag) {
          za = Sn({}, r);
          var a = Wi(xe, !0);
          za.top -= a.f, za.left -= a.e;
        }
      },
      dragOverAnimationComplete: function() {
        Pt && (Pt = !1, tu());
      },
      drop: function(n) {
        var r = n.originalEvent, i = n.rootEl, o = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, u = n.putSortable, c = u || this.sortable;
        if (r) {
          var f = this.options, d = o.children;
          if (!co)
            if (f.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Fe(xe, f.selectedClass, !~ie.indexOf(xe)), ~ie.indexOf(xe))
              ie.splice(ie.indexOf(xe), 1), Ba = null, Ja({
                sortable: a,
                rootEl: i,
                name: "deselect",
                targetEl: xe,
                originalEvent: r
              });
            else {
              if (ie.push(xe), Ja({
                sortable: a,
                rootEl: i,
                name: "select",
                targetEl: xe,
                originalEvent: r
              }), r.shiftKey && Ba && a.el.contains(Ba)) {
                var p = $e(Ba), h = $e(xe);
                if (~p && ~h && p !== h) {
                  var m, S;
                  for (h > p ? (S = p, m = h) : (S = h, m = p + 1); S < m; S++)
                    ~ie.indexOf(d[S]) || (Fe(d[S], f.selectedClass, !0), ie.push(d[S]), Ja({
                      sortable: a,
                      rootEl: i,
                      name: "select",
                      targetEl: d[S],
                      originalEvent: r
                    }));
                }
              } else
                Ba = xe;
              Nn = c;
            }
          if (co && this.isMultiDrag) {
            if (Pt = !1, (o[St].options.sort || o !== i) && ie.length > 1) {
              var g = De(xe), v = $e(xe, ":not(." + this.options.selectedClass + ")");
              if (!Ua && f.animation && (xe.thisAnimationDuration = null), c.captureAnimationState(), !Ua && (f.animation && (xe.fromRect = g, ie.forEach(function(E) {
                if (E.thisAnimationDuration = null, E !== xe) {
                  var k = Pt ? De(E) : g;
                  E.fromRect = k, c.addAnimationState({
                    target: E,
                    rect: k
                  });
                }
              })), tu(), ie.forEach(function(E) {
                d[v] ? o.insertBefore(E, d[v]) : o.appendChild(E), v++;
              }), s === $e(xe))) {
                var w = !1;
                ie.forEach(function(E) {
                  if (E.sortableIndex !== $e(E)) {
                    w = !0;
                    return;
                  }
                }), w && l("update");
              }
              ie.forEach(function(E) {
                Ud(E);
              }), c.animateAll();
            }
            Nn = c;
          }
          (i === o || u && u.lastPutMode !== "clone") && Vt.forEach(function(E) {
            E.parentNode && E.parentNode.removeChild(E);
          });
        }
      },
      nullingGlobal: function() {
        this.isMultiDrag = co = !1, Vt.length = 0;
      },
      destroyGlobal: function() {
        this._deselectMultiDrag(), ue(document, "pointerup", this._deselectMultiDrag), ue(document, "mouseup", this._deselectMultiDrag), ue(document, "touchend", this._deselectMultiDrag), ue(document, "keydown", this._checkKeyDown), ue(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function(n) {
        if (!(typeof co != "undefined" && co) && Nn === this.sortable && !(n && Ln(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
          for (; ie.length; ) {
            var r = ie[0];
            Fe(r, this.options.selectedClass, !1), ie.shift(), Ja({
              sortable: this.sortable,
              rootEl: this.sortable.el,
              name: "deselect",
              targetEl: r,
              originalEvent: n
            });
          }
      },
      _checkKeyDown: function(n) {
        n.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
      },
      _checkKeyUp: function(n) {
        n.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
      }
    }, Sn(e, {
      // Static methods & properties
      pluginName: "multiDrag",
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function(n) {
          var r = n.parentNode[St];
          !r || !r.options.multiDrag || ~ie.indexOf(n) || (Nn && Nn !== r && (Nn.multiDrag._deselectMultiDrag(), Nn = r), Fe(n, r.options.selectedClass, !0), ie.push(n));
        },
        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function(n) {
          var r = n.parentNode[St], i = ie.indexOf(n);
          !r || !r.options.multiDrag || !~i || (Fe(n, r.options.selectedClass, !1), ie.splice(i, 1));
        }
      },
      eventProperties: function() {
        var n = this, r = [], i = [];
        return ie.forEach(function(o) {
          r.push({
            multiDragElement: o,
            index: o.sortableIndex
          });
          var a;
          Pt && o !== xe ? a = -1 : Pt ? a = $e(o, ":not(." + n.options.selectedClass + ")") : a = $e(o), i.push({
            multiDragElement: o,
            index: a
          });
        }), {
          items: ZM(ie),
          clones: [].concat(Vt),
          oldIndicies: r,
          newIndicies: i
        };
      },
      optionListeners: {
        multiDragKey: function(n) {
          return n = n.toLowerCase(), n === "ctrl" ? n = "Control" : n.length > 1 && (n = n.charAt(0).toUpperCase() + n.substr(1)), n;
        }
      }
    });
  }
  function IF(e, t) {
    ie.forEach(function(n, r) {
      var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
      i ? t.insertBefore(n, i) : t.appendChild(n);
    });
  }
  function E0(e, t) {
    Vt.forEach(function(n, r) {
      var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
      i ? t.insertBefore(n, i) : t.appendChild(n);
    });
  }
  function tu() {
    ie.forEach(function(e) {
      e !== xe && e.parentNode && e.parentNode.removeChild(e);
    });
  }
  ee.mount(new xF());
  ee.mount(Ig, Og);
  const TF = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    MultiDrag: OF,
    Sortable: ee,
    Swap: kF,
    default: ee
  }, Symbol.toStringTag, { value: "Module" })), PF = /* @__PURE__ */ M0(TF);
  var Mh = {}, NF = {
    get exports() {
      return Mh;
    },
    set exports(e) {
      Mh = e;
    }
  };
  /*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  (function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function n() {
        for (var r = [], i = 0; i < arguments.length; i++) {
          var o = arguments[i];
          if (o) {
            var a = typeof o;
            if (a === "string" || a === "number")
              r.push(o);
            else if (Array.isArray(o)) {
              if (o.length) {
                var l = n.apply(null, o);
                l && r.push(l);
              }
            } else if (a === "object")
              if (o.toString === Object.prototype.toString)
                for (var s in o)
                  t.call(o, s) && o[s] && r.push(s);
              else
                r.push(o.toString());
          }
        }
        return r.join(" ");
      }
      e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
    })();
  })(NF);
  var DF = "Invariant failed";
  function RF(e, t) {
    if (!e)
      throw new Error(DF);
  }
  const LF = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: RF
  }, Symbol.toStringTag, { value: "Module" })), MF = /* @__PURE__ */ M0(LF);
  (function(e) {
    var t = PF, n = Mh, r = K, i = MF;
    function o(b) {
      return b && b.__esModule ? b.default : b;
    }
    function a(b, A, O, T) {
      Object.defineProperty(b, A, { get: O, set: T, enumerable: !0, configurable: !0 });
    }
    function l(b, A) {
      return Object.keys(A).forEach(function(O) {
        O === "default" || O === "__esModule" || b.hasOwnProperty(O) || Object.defineProperty(b, O, {
          enumerable: !0,
          get: function() {
            return A[O];
          }
        });
      }), b;
    }
    a(e.exports, "Sortable", () => $882b6d93070905b3$re_export$Sortable), a(e.exports, "Direction", () => $882b6d93070905b3$re_export$Direction), a(e.exports, "DOMRect", () => $882b6d93070905b3$re_export$DOMRect), a(e.exports, "GroupOptions", () => $882b6d93070905b3$re_export$GroupOptions), a(e.exports, "MoveEvent", () => $882b6d93070905b3$re_export$MoveEvent), a(e.exports, "Options", () => $882b6d93070905b3$re_export$Options), a(e.exports, "PullResult", () => $882b6d93070905b3$re_export$PullResult), a(e.exports, "PutResult", () => $882b6d93070905b3$re_export$PutResult), a(e.exports, "SortableEvent", () => $882b6d93070905b3$re_export$SortableEvent), a(e.exports, "SortableOptions", () => $882b6d93070905b3$re_export$SortableOptions), a(e.exports, "Utils", () => $882b6d93070905b3$re_export$Utils), a(e.exports, "ReactSortable", () => E);
    function s(b) {
      b.parentElement !== null && b.parentElement.removeChild(b);
    }
    function u(b, A, O) {
      const T = b.children[O] || null;
      b.insertBefore(A, T);
    }
    function c(b) {
      b.forEach((A) => s(A.element));
    }
    function f(b) {
      b.forEach((A) => {
        u(A.parentElement, A.element, A.oldIndex);
      });
    }
    function d(b, A) {
      const O = S(b), T = {
        parentElement: b.from
      };
      let P = [];
      switch (O) {
        case "normal":
          P = [
            {
              element: b.item,
              newIndex: b.newIndex,
              oldIndex: b.oldIndex,
              parentElement: b.from
            }
          ];
          break;
        case "swap":
          const U = M({
            element: b.item,
            oldIndex: b.oldIndex,
            newIndex: b.newIndex
          }, T), X = M({
            element: b.swapItem,
            oldIndex: b.newIndex,
            newIndex: b.oldIndex
          }, T);
          P = [
            U,
            X
          ];
          break;
        case "multidrag":
          P = b.oldIndicies.map((oe, ne) => M({
            element: oe.multiDragElement,
            oldIndex: oe.index,
            newIndex: b.newIndicies[ne].index
          }, T));
          break;
      }
      return g(P, A);
    }
    function p(b, A) {
      const O = h(b, A);
      return m(b, O);
    }
    function h(b, A) {
      const O = [
        ...A
      ];
      return b.concat().reverse().forEach((T) => O.splice(T.oldIndex, 1)), O;
    }
    function m(b, A, O, T) {
      const P = [
        ...A
      ];
      return b.forEach((I) => {
        const F = T && O && T(I.item, O);
        P.splice(I.newIndex, 0, F || I.item);
      }), P;
    }
    function S(b) {
      return b.oldIndicies && b.oldIndicies.length > 0 ? "multidrag" : b.swapItem ? "swap" : "normal";
    }
    function g(b, A) {
      return b.map((T) => H(M({}, T), {
        item: A[T.oldIndex]
      })).sort((T, P) => T.oldIndex - P.oldIndex);
    }
    function v(b) {
      const On = b, { list: A, setList: O, children: T, tag: P, style: I, className: F, clone: U, onAdd: X, onChange: oe, onChoose: ne, onClone: fe, onEnd: B, onFilter: V, onRemove: G, onSort: x, onStart: C, onUnchoose: rt, onUpdate: Je, onMove: qe, onSpill: me, onSelect: We, onDeselect: ut } = On;
      return Le(On, ["list", "setList", "children", "tag", "style", "className", "clone", "onAdd", "onChange", "onChoose", "onClone", "onEnd", "onFilter", "onRemove", "onSort", "onStart", "onUnchoose", "onUpdate", "onMove", "onSpill", "onSelect", "onDeselect"]);
    }
    const w = {
      dragging: null
    };
    class E extends r.Component {
      constructor(A) {
        super(A), this.ref = /* @__PURE__ */ (0, r.createRef)();
        const O = [
          ...A.list
        ].map((T) => Object.assign(T, {
          chosen: !1,
          selected: !1
        }));
        A.setList(O, this.sortable, w), o(i)(
          //@ts-expect-error: Doesn't exist. Will deprecate soon.
          !A.plugins,
          `
Plugins prop is no longer supported.
Instead, mount it with "Sortable.mount(new MultiDrag())"
Please read the updated README.md at https://github.com/SortableJS/react-sortablejs.
      `
        );
      }
      componentDidMount() {
        if (this.ref.current === null)
          return;
        const A = this.makeOptions();
        o(t).create(this.ref.current, A);
      }
      componentDidUpdate(A) {
        A.disabled !== this.props.disabled && this.sortable && this.sortable.option("disabled", this.props.disabled);
      }
      render() {
        const { tag: A, style: O, className: T, id: P } = this.props, I = {
          style: O,
          className: T,
          id: P
        }, F = !A || A === null ? "div" : A;
        return /* @__PURE__ */ (0, r.createElement)(F, M({
          // @todo - find a way (perhaps with the callback) to allow AntD components to work
          ref: this.ref
        }, I), this.getChildren());
      }
      getChildren() {
        const { children: A, dataIdAttr: O, selectedClass: T = "sortable-selected", chosenClass: P = "sortable-chosen", dragClass: I = "sortable-drag", fallbackClass: F = "sortable-falback", ghostClass: U = "sortable-ghost", swapClass: X = "sortable-swap-highlight", filter: oe = "sortable-filter", list: ne } = this.props;
        if (!A || A == null)
          return null;
        const fe = O || "data-id";
        return r.Children.map(A, (B, V) => {
          if (B === void 0)
            return;
          const G = ne[V] || {}, { className: x } = B.props, C = typeof oe == "string" && {
            [oe.replace(".", "")]: !!G.filtered
          }, rt = o(n)(x, M({
            [T]: G.selected,
            [P]: G.chosen
          }, C));
          return /* @__PURE__ */ (0, r.cloneElement)(B, {
            [fe]: B.key,
            className: rt
          });
        });
      }
      /** Appends the `sortable` property to this component */
      get sortable() {
        const A = this.ref.current;
        if (A === null)
          return null;
        const O = Object.keys(A).find((T) => T.includes("Sortable"));
        return O ? A[O] : null;
      }
      /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */
      makeOptions() {
        const A = [
          "onAdd",
          "onChoose",
          "onDeselect",
          "onEnd",
          "onRemove",
          "onSelect",
          "onSpill",
          "onStart",
          "onUnchoose",
          "onUpdate"
        ], O = [
          "onChange",
          "onClone",
          "onFilter",
          "onSort"
        ], T = v(this.props);
        A.forEach((I) => T[I] = this.prepareOnHandlerPropAndDOM(I)), O.forEach((I) => T[I] = this.prepareOnHandlerProp(I));
        const P = (I, F) => {
          const { onMove: U } = this.props, X = I.willInsertAfter || -1;
          if (!U)
            return X;
          const oe = U(I, F, this.sortable, w);
          return typeof oe == "undefined" ? !1 : oe;
        };
        return H(M({}, T), {
          onMove: P
        });
      }
      /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
      prepareOnHandlerPropAndDOM(A) {
        return (O) => {
          this.callOnHandlerProp(O, A), this[A](O);
        };
      }
      /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
      prepareOnHandlerProp(A) {
        return (O) => {
          this.callOnHandlerProp(O, A);
        };
      }
      /** Calls the `props.on[Handler]` function */
      callOnHandlerProp(A, O) {
        const T = this.props[O];
        T && T(A, this.sortable, w);
      }
      // SORTABLE DOM HANDLING
      onAdd(A) {
        const { list: O, setList: T, clone: P } = this.props, I = [
          ...w.dragging.props.list
        ], F = d(A, I);
        c(F);
        const U = m(F, O, A, P).map((X) => Object.assign(X, {
          selected: !1
        }));
        T(U, this.sortable, w);
      }
      onRemove(A) {
        const { list: O, setList: T } = this.props, P = S(A), I = d(A, O);
        f(I);
        let F = [
          ...O
        ];
        if (A.pullMode !== "clone")
          F = h(I, F);
        else {
          let U = I;
          switch (P) {
            case "multidrag":
              U = I.map((X, oe) => H(M({}, X), {
                element: A.clones[oe]
              }));
              break;
            case "normal":
              U = I.map((X) => H(M({}, X), {
                element: A.clone
              }));
              break;
            case "swap":
            default:
              o(i)(!0, `mode "${P}" cannot clone. Please remove "props.clone" from <ReactSortable/> when using the "${P}" plugin`);
          }
          c(U), I.forEach((X) => {
            const oe = X.oldIndex, ne = this.props.clone(X.item, A);
            F.splice(oe, 1, ne);
          });
        }
        F = F.map((U) => Object.assign(U, {
          selected: !1
        })), T(F, this.sortable, w);
      }
      onUpdate(A) {
        const { list: O, setList: T } = this.props, P = d(A, O);
        c(P), f(P);
        const I = p(P, O);
        return T(I, this.sortable, w);
      }
      onStart() {
        w.dragging = this;
      }
      onEnd() {
        w.dragging = null;
      }
      onChoose(A) {
        const { list: O, setList: T } = this.props, P = O.map((I, F) => {
          let U = I;
          return F === A.oldIndex && (U = Object.assign(I, {
            chosen: !0
          })), U;
        });
        T(P, this.sortable, w);
      }
      onUnchoose(A) {
        const { list: O, setList: T } = this.props, P = O.map((I, F) => {
          let U = I;
          return F === A.oldIndex && (U = Object.assign(U, {
            chosen: !1
          })), U;
        });
        T(P, this.sortable, w);
      }
      onSpill(A) {
        const { removeOnSpill: O, revertOnSpill: T } = this.props;
        O && !T && s(A.item);
      }
      onSelect(A) {
        const { list: O, setList: T } = this.props, P = O.map((I) => Object.assign(I, {
          selected: !1
        }));
        A.newIndicies.forEach((I) => {
          const F = I.index;
          if (F === -1) {
            console.log(`"${A.type}" had indice of "${I.index}", which is probably -1 and doesn't usually happen here.`), console.log(A);
            return;
          }
          P[F].selected = !0;
        }), T(P, this.sortable, w);
      }
      onDeselect(A) {
        const { list: O, setList: T } = this.props, P = O.map((I) => Object.assign(I, {
          selected: !1
        }));
        A.newIndicies.forEach((I) => {
          const F = I.index;
          F !== -1 && (P[F].selected = !0);
        }), T(P, this.sortable, w);
      }
    }
    /* eslint-disable-next-line */
    Ug(E, "defaultProps", {
      clone: (A) => A
    });
    var k = {};
    l(e.exports, k);
  })(QM);
  const FF = "_container_xt7ji_1", BF = "_list_xt7ji_6", UF = "_item_xt7ji_15", zF = "_keyField_xt7ji_29", jF = "_valueField_xt7ji_34", WF = "_header_xt7ji_39", YF = "_dragHandle_xt7ji_45", VF = "_deleteButton_xt7ji_55", $F = "_addItemButton_xt7ji_65", HF = "_separator_xt7ji_72", Wt = {
    container: FF,
    list: BF,
    item: UF,
    keyField: zF,
    valueField: jF,
    header: WF,
    dragHandle: YF,
    deleteButton: VF,
    addItemButton: $F,
    separator: HF
  };
  function GF(e) {
    return !(typeof e != "object" || Object.values(e).find(
      (n) => typeof n != "string"
    ));
  }
  function JF({
    id: e,
    label: t,
    value: n,
    onChange: r,
    newItemValue: i = { key: "myKey", value: "myValue" }
  }) {
    const { state: o, setState: a, addItem: l, deleteItem: s } = QF({
      value: n,
      onChange: r,
      newItemValue: i
    });
    return /* @__PURE__ */ L(
      "div",
      {
        className: Wt.list,
        "aria-labelledby": Ir(e),
        "aria-label": t,
        children: [
          /* @__PURE__ */ L(
            "div",
            {
              className: Wt.item + " " + Wt.header,
              "aria-label": "Columns field labels",
              children: [
                /* @__PURE__ */ y("span", { className: Wt.keyField, children: "Key" }),
                /* @__PURE__ */ y("span", { className: Wt.valueField, children: "Value" })
              ]
            }
          ),
          /* @__PURE__ */ y(
            Th.ReactSortable,
            {
              list: o,
              setList: a,
              handle: `.${Wt.dragHandle}`,
              children: o.map((u, c) => /* @__PURE__ */ L("div", { className: Wt.item, children: [
                /* @__PURE__ */ y("div", { className: Wt.dragHandle, title: "Reorder list", children: /* @__PURE__ */ y(JM, {}) }),
                /* @__PURE__ */ y(
                  "input",
                  {
                    title: "Key Field",
                    className: Wt.keyField,
                    type: "text",
                    value: u.key,
                    onChange: (f) => {
                      const d = [...o];
                      d[c] = H(M({}, u), { key: f.target.value }), a(d);
                    }
                  }
                ),
                /* @__PURE__ */ y("span", { className: Wt.separator, children: ":" }),
                /* @__PURE__ */ y(
                  "input",
                  {
                    title: "Value Field",
                    className: Wt.valueField,
                    type: "text",
                    value: u.value,
                    onChange: (f) => {
                      const d = [...o];
                      d[c] = H(M({}, u), { value: f.target.value }), a(d);
                    }
                  }
                ),
                /* @__PURE__ */ y(
                  ht,
                  {
                    className: Wt.deleteButton,
                    onClick: () => s(u.id),
                    variant: ["icon", "transparent"],
                    title: `Delete ${u.value}`,
                    children: /* @__PURE__ */ y(Kc, {})
                  }
                )
              ] }, u.id))
            }
          ),
          /* @__PURE__ */ y(
            ht,
            {
              className: Wt.addItemButton,
              onClick: () => l(),
              variant: ["icon", "transparent"],
              title: "Add new item",
              "aria-label": "Add new item to list",
              children: /* @__PURE__ */ y(sg, {})
            }
          )
        ]
      }
    );
  }
  function QF({
    value: e,
    onChange: t,
    newItemValue: n
  }) {
    const [r, i] = _.useState(
      e !== void 0 ? Object.keys(e).map((l, s) => ({ id: s, key: l, value: e[l] })) : []
    );
    _.useEffect(() => {
      const l = KF(r);
      TP(l, e != null ? e : {}) || t(l);
    }, [t, r, e]);
    const o = _.useCallback((l) => {
      i((s) => s.filter(({ id: u }) => u !== l));
    }, []), a = _.useCallback(() => {
      i(
        (l) => [...l, M({ id: -1 }, n)].map((s, u) => H(M({}, s), {
          id: u
        }))
      );
    }, [n]);
    return {
      state: r,
      setState: i,
      deleteItem: o,
      addItem: a
    };
  }
  function KF(e) {
    return e.reduce(
      (n, { key: r, value: i }) => (n[r] = i, n),
      {}
    );
  }
  const qF = "__DEFAULT-DROPDOWN-CHOICE__";
  function XF({
    id: e,
    label: t,
    choices: n,
    onChange: r,
    value: i
  }) {
    _.useEffect(() => {
      i === qF && r(n[0]), n.length > 0 && !n.includes(i) && r(n[0]);
    }, [r, n, i]);
    const o = (l) => {
      const s = l.target.selectedIndex;
      r(n[s]);
    }, a = E4(n);
    return a.length === 0 ? /* @__PURE__ */ y(
      "select",
      {
        title: `${t} selector`,
        "aria-labelledby": Ir(e),
        "aria-label": t,
        className: "OptionsDropdown SUE-Input",
        placeholder: "No available options"
      }
    ) : /* @__PURE__ */ y(
      "select",
      {
        title: `${t} selector`,
        "aria-labelledby": Ir(e),
        className: "OptionsDropdown SUE-Input",
        onChange: o,
        value: i,
        children: a.map((l) => /* @__PURE__ */ y("option", { value: l, children: l }, l))
      }
    );
  }
  const ZF = "_radioContainer_1regb_1", e8 = "_option_1regb_15", t8 = "_radioInput_1regb_22", n8 = "_radioLabel_1regb_26", r8 = "_icon_1regb_41", ja = {
    radioContainer: ZF,
    option: e8,
    radioInput: t8,
    radioLabel: n8,
    icon: r8
  }, i8 = "__DEFAULT-RADIO-CHOICE__";
  function o8({
    id: e,
    label: t,
    choices: n,
    value: r,
    onChange: i,
    optionsPerColumn: o
  }) {
    const a = Object.keys(n);
    K.useEffect(() => {
      r === i8 && i(a[0]);
    }, [a, r, i]);
    const l = K.useMemo(
      () => ({
        gridTemplateColumns: o ? `repeat(${o}, 1fr)` : void 0
      }),
      [o]
    );
    return /* @__PURE__ */ y(
      "fieldset",
      {
        className: ja.radioContainer,
        "aria-labelledby": Ir(e),
        "aria-label": t,
        style: l,
        children: a.map((s) => {
          var d;
          const { icon: u, label: c = s } = (d = n[s]) != null ? d : {}, f = e + s;
          return /* @__PURE__ */ L("div", { className: ja.option, children: [
            /* @__PURE__ */ y(
              "input",
              {
                className: ja.radioInput,
                name: e,
                id: f,
                type: "radio",
                value: s,
                onChange: () => i(s),
                checked: s === r
              }
            ),
            /* @__PURE__ */ y(
              "label",
              {
                className: ja.radioLabel,
                htmlFor: f,
                "data-name": c,
                children: typeof u == "string" ? /* @__PURE__ */ y("img", { src: u, alt: c, className: ja.icon }) : u
              }
            )
          ] }, s);
        })
      }
    );
  }
  function a8({
    id: e,
    label: t,
    value: n,
    onChange: r
  }) {
    return /* @__PURE__ */ y(
      "input",
      {
        className: "SUE-Input",
        "aria-label": t,
        "aria-labelledby": Ir(e),
        id: e,
        type: "text",
        value: n,
        onChange: (i) => {
          const o = i.target.value;
          r(o);
        }
      }
    );
  }
  function l8(e) {
    return jM(e).with({ inputType: "string" }, (t) => /* @__PURE__ */ y(a8, M({}, t))).with({ inputType: "number" }, (t) => /* @__PURE__ */ y(WL, M({}, t))).with({ inputType: "cssMeasure" }, (t) => /* @__PURE__ */ y(GM, M({}, t))).with({ inputType: "boolean" }, (t) => /* @__PURE__ */ y($M, M({}, t))).with({ inputType: "list" }, (t) => /* @__PURE__ */ y(JF, M({}, t))).with({ inputType: "dropdown" }, (t) => /* @__PURE__ */ y(XF, M({}, t))).with({ inputType: "radio" }, (t) => /* @__PURE__ */ y(o8, M({}, t))).otherwise(({ inputType: t }) => /* @__PURE__ */ L("div", { children: [
      "I don't know how to render the input of type ",
      t,
      " yet! Sorry."
    ] }));
  }
  function s8(e, t) {
    if (e === void 0)
      return !0;
    if (t === "number")
      return typeof e == "number";
    if (t === "string")
      return typeof e == "string";
    if (t === "cssMeasure")
      return rN(e);
    if (t === "boolean")
      return typeof e == "boolean";
    if (t === "list")
      return GF(e);
    if (t === "dropdown" || t === "radio")
      return typeof e == "string";
    throw new Error("Unimplemented argument type check", t);
  }
  function KA(n) {
    var r = n, { onUpdate: e } = r, t = Le(r, ["onUpdate"]);
    var d;
    const i = t.value === void 0, o = t.optional, a = Ir(t.name), l = (d = t.label) != null ? d : t.name, s = () => e({
      type: "UPDATE",
      value: t.defaultValue
    }), u = (p) => e({ type: "UPDATE", value: p }), c = () => e({ type: "REMOVE" });
    let f;
    return t.value === void 0 ? t.optional ? f = /* @__PURE__ */ y(f8, { labelledBy: a }) : f = /* @__PURE__ */ y(
      c8,
      {
        name: t.name,
        onReset: s
      }
    ) : s8(t.value, t.inputType) ? f = /* @__PURE__ */ y(
      l8,
      M({
        label: l,
        id: t.name,
        onChange: u
      }, t)
    ) : f = /* @__PURE__ */ y(u8, { name: t.name, onReset: s }), /* @__PURE__ */ L("div", { className: "SUE-SettingsInput", children: [
      /* @__PURE__ */ L("div", { className: "info", "data-unset": i, children: [
        o ? /* @__PURE__ */ y(
          "input",
          {
            type: "checkbox",
            checked: !i,
            title: `Use ${t.name} argument`,
            "aria-label": `Use ${t.name} argument`,
            onChange: i ? s : c
          }
        ) : null,
        /* @__PURE__ */ y("label", { id: a, children: l })
      ] }),
      f
    ] });
  }
  function u8({
    name: e,
    onReset: t
  }) {
    return /* @__PURE__ */ L("div", { className: "mismatched-argument-types", children: [
      "Argument for ",
      e,
      " of unsupported type.",
      /* @__PURE__ */ y(
        ht,
        {
          style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
          onClick: t,
          children: "Reset"
        }
      )
    ] });
  }
  function c8({
    name: e,
    onReset: t
  }) {
    return /* @__PURE__ */ L("div", { className: "missing-required-argument-message", children: [
      'Required argument "',
      e,
      '" not provided.',
      /* @__PURE__ */ y(
        ht,
        {
          style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
          onClick: t,
          children: "Reset"
        }
      )
    ] });
  }
  function f8({ labelledBy: e }) {
    return /* @__PURE__ */ y(
      "input",
      {
        className: "unset-argument SUE-Input",
        "aria-labelledby": e,
        placeholder: "Default",
        disabled: !0
      }
    );
  }
  function d8({
    onCancel: e,
    onDone: t,
    existingAreaNames: n
  }) {
    const r = `area${n.length}`, [i, o] = _.useState(r), [a, l] = _.useState(null), s = _.useCallback(
      (c) => {
        c && c.preventDefault();
        const f = p8({
          name: i,
          existingAreaNames: n
        });
        if (f) {
          l(f);
          return;
        }
        t(i);
      },
      [n, i, t]
    ), u = _.useCallback((c) => {
      c.type !== "REMOVE" && (l(null), o(c.value));
    }, []);
    return /* @__PURE__ */ L(
      FA,
      {
        title: "Name new grid area",
        label: "New grid area naming modal",
        onConfirm: () => t(i),
        onCancel: e,
        children: [
          /* @__PURE__ */ y("form", { className: vr.portalForm, onSubmit: s, children: /* @__PURE__ */ L("div", { className: vr.portalFormInputs, children: [
            /* @__PURE__ */ y("span", { className: vr.infoText, children: "Name for grid area needs to be unique, start with a letter, and contain only letters and numbers." }),
            /* @__PURE__ */ y(
              KA,
              {
                label: "Name of new grid area",
                name: "New-Item-Name",
                inputType: "string",
                onUpdate: u,
                value: i,
                defaultValue: r
              }
            ),
            a ? /* @__PURE__ */ y("div", { className: vr.validationMsg, children: a }) : null
          ] }) }),
          /* @__PURE__ */ L("div", { className: vr.portalFormFooter, children: [
            /* @__PURE__ */ y(ht, { variant: "delete", onClick: e, children: "Cancel" }),
            /* @__PURE__ */ y(ht, { onClick: () => s(), children: "Done" })
          ] })
        ]
      }
    );
  }
  function p8({
    name: e,
    existingAreaNames: t
  }) {
    return e === "" ? "A name is needed for the grid area" : t.includes(e) ? `You already have an item with the name "${e}", all names
  need to be unique.` : e.match(/^[^a-zA-Z]/g) ? "Valid item names need to start with a character." : e.match(/\s/g) ? "Spaces not allowed in grid area names" : e.match(/[^\w]/g) ? "Only letters and numbers allowed in area names" : null;
  }
  function h8(e) {
    const t = Dr();
    return _.useCallback(
      (r) => {
        t(
          CC({
            path: e,
            node: {
              uiArguments: r
            }
          })
        );
      },
      [t, e]
    );
  }
  function m8({
    layout: e,
    row_sizes: t,
    col_sizes: n,
    gap_size: r
  }) {
    return e = ul(e), t = ul(t), n = ul(n), {
      layout: e,
      row_sizes: t,
      col_sizes: n,
      gap_size: r
    };
  }
  const g8 = "_container_1hvsg_1", v8 = {
    container: g8
  }, qA = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    const i = m8(e), o = pf(), w = _3(i), { uniqueAreas: a } = w, l = Le(w, ["uniqueAreas"]), { areas: s } = l, u = h8(n), c = _.useMemo(
      () => og(s),
      [s]
    ), [f, d] = _.useState(null), p = (E) => {
      const { node: k, currentPath: b, pos: A } = E, O = b !== void 0, T = dh(k);
      if (O && T && "area" in k.uiArguments && k.uiArguments.area) {
        const P = k.uiArguments.area;
        h({ type: "MOVE_ITEM", name: P, pos: A });
        return;
      }
      d(E);
    }, h = (E) => {
      u(ag(i, E));
    }, m = _.useCallback(
      (E) => {
        u(
          kE(E)
        );
      },
      [u]
    ), S = a.map((E) => /* @__PURE__ */ y(
      X3,
      {
        area: E,
        areas: s,
        gridLocation: c.get(E),
        onNewPos: (k) => h({ type: "MOVE_ITEM", name: E, pos: k })
      },
      E
    )), g = {
      "--gap": i.gap_size,
      "--row-gutter": "150px",
      "--col-gutter": "100px",
      "--pad": "8px"
    }, v = (E, { node: k, currentPath: b, pos: A }) => {
      var T;
      const O = dh(k);
      if (O) {
        const P = H(M({}, k.uiArguments), {
          area: E
        });
        k.uiArguments = P;
      }
      o({
        // Place in the last position
        path: nn(n, (T = t == null ? void 0 : t.length) != null ? T : 0),
        node: k,
        wrappingNode: O ? void 0 : {
          uiName: "gridlayout::grid_card",
          uiArguments: { area: E }
        },
        currentPath: b
      }), h({
        type: "ADD_ITEM",
        name: E,
        pos: A
      }), d(null);
    };
    return /* @__PURE__ */ L(yE.Provider, { value: h, children: [
      /* @__PURE__ */ y(
        "div",
        H(M({
          style: g,
          className: v8.container
        }, r), {
          draggable: !1,
          onDragStart: () => {
          },
          children: /* @__PURE__ */ L(
            _M,
            H(M({}, l), {
              onNewLayout: m,
              children: [
                F3(s).map(({ row: E, col: k }) => /* @__PURE__ */ y(
                  IM,
                  {
                    gridRow: E,
                    gridColumn: k,
                    onDroppedNode: p
                  },
                  $3({ row: E, col: k })
                )),
                t == null ? void 0 : t.map((E, k) => /* @__PURE__ */ y(
                  sr,
                  {
                    path: [...n, k],
                    node: E
                  },
                  n.join(".") + k
                )),
                S
              ]
            })
          )
        })
      ),
      f ? /* @__PURE__ */ y(
        d8,
        {
          info: f,
          onCancel: () => d(null),
          onDone: (E) => v(E, f),
          existingAreaNames: a
        }
      ) : null
    ] });
  }, y8 = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    qA,
    {
      uiArguments: e,
      uiChildren: t,
      path: n,
      wrapperProps: r
    }
  ), w8 = {
    title: "Grid Container",
    UiComponent: y8,
    settingsInfo: {
      gap_size: {
        label: "Width",
        inputType: "cssMeasure",
        defaultValue: "10px",
        units: ["px", "rem"]
      },
      layout: {
        inputType: "omitted",
        defaultValue: [". .", ". ."]
      },
      row_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
      col_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] }
    },
    acceptsChildren: !0,
    iconSrc: SE,
    category: "Tabs",
    stateUpdateSubscribers: {
      UPDATE_NODE: OE,
      DELETE_NODE: IE
    },
    description: "A general container for arranging items using `gridlayout`"
  }, b8 = (e) => /* @__PURE__ */ y(qA, M({}, e)), S8 = {
    title: "Grid Page",
    UiComponent: b8,
    acceptsChildren: !0,
    settingsInfo: {
      gap_size: {
        label: "Width",
        inputType: "cssMeasure",
        defaultValue: "10px",
        units: ["px", "rem"]
      },
      layout: {
        inputType: "omitted",
        defaultValue: [". .", ". ."]
      },
      row_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
      col_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] }
    },
    stateUpdateSubscribers: {
      UPDATE_NODE: OE,
      DELETE_NODE: IE
    },
    category: "gridlayout"
  }, E8 = 11, A8 = x8(
    oc(E8).map((e) => Math.random())
  ).map((e) => `${Math.round(e * 100)}%`);
  function C8({
    title: e = /* @__PURE__ */ y("span", { children: "My Plot" })
  }) {
    return /* @__PURE__ */ y("div", { className: "PlotPlaceholder", children: /* @__PURE__ */ L("div", { className: "plot", children: [
      /* @__PURE__ */ y("div", { className: "title", children: e }),
      /* @__PURE__ */ y("div", { className: "plot-body", children: A8.map((t, n) => /* @__PURE__ */ y(
        "div",
        {
          className: "bar",
          style: { "--value": t }
        },
        `${n}-${t}`
      )) })
    ] }) });
  }
  function x8(e) {
    let i = -1 / 0, o = 1 / 0;
    for (let s of e)
      i = Math.max(i, s), o = Math.min(o, s);
    const a = i - o;
    return e.map((s) => ((s - o) / a + 0.1) * 0.85);
  }
  const k8 = ({
    uiArguments: { outputId: e, width: t = "100%", height: n = "400px" },
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    "div",
    H(M({
      className: "plotlyPlotlyOutput",
      style: { height: n, width: t }
    }, r), {
      children: /* @__PURE__ */ y(
        C8,
        {
          title: /* @__PURE__ */ L("span", { className: "title-bar", children: [
            /* @__PURE__ */ y(hf, { type: "output", name: e }),
            /* @__PURE__ */ y("span", { className: "plotly-name", children: "Plotly" })
          ] })
        }
      )
    })
  ), _8 = {
    title: "Plotly Plot",
    UiComponent: k8,
    settingsInfo: {
      outputId: {
        inputType: "string",
        label: "Output ID for plot",
        defaultValue: "plot"
      },
      width: {
        label: "Width",
        inputType: "cssMeasure",
        defaultValue: "100%"
      },
      height: {
        label: "Height",
        inputType: "cssMeasure",
        defaultValue: "400px"
      }
    },
    serverBindings: {
      outputs: {
        outputIdKey: "outputId",
        renderScaffold: `renderPlotly({
  plot_ly(z = ~volcano, type = "surface")
})`
      }
    },
    acceptsChildren: !1,
    iconSrc: ig,
    category: "Plotting",
    description: "Output for interactive `plotly` plots."
  }, O8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADKUlEQVR4nO3cMY5VVQDG8Q8QaFyACiWFvVqwiyERjHuQAoohbsAEKLTARRiCYtgGxsR6So0LgAYIeRR3bmKGZ0Hi5zl3+P2S17xM8eXkP/e9meKc2e12gf/a2dEDOJ2ERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUfDB6wD8d/nS07+0LSQ6OX1eTfHL83vvmeZI/k/ye5JckvyZ5efKH7n115X+etd9UYe1xLcm9JHOc1lgfJvn0+PV1kqMkd5L8PHLUv5n1o/BckrtZDk1U+11J8ijLOZ0bvOUtsz6xvktyOHrERqzndGfoihNmfGJ9GVG9q8Ms5zaN2cK6kOT70SM26odM9EfNbGFdT3J59IiNupTkxugRq9nCOhg9YOMORg9YzRbWF6MHbNznowesZgvro9EDNu7j0QNWs4V1cfSAjfPlndNNWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4rZwno2esDGvXX7zCizhfX36AEbN835zRbWH6MHbNzT0QNWs4X1ePSAjXs8esBqtrAeZrm1jnf3V5bzm8JsYb1Mcnv0iI26leTF6BGr2cJKlt+6+6NHbMz9TPS0SuYMK0m+TfJg9IiN+DHLeU1l1rBeJ7mZ5Za6vVcpk6Ms94l9k+W8pjLrHaSrR0meZDnAa0k+y3LB2PmRowZ5leUL+m9ZruN+mIn+IXrSmd1uN3oDp9CsH4VsnLCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4o3LCE7MROKhbQAAAAASUVORK5CYII=";
  function XA(e, t) {
    return {
      label: e,
      inputType: "string",
      defaultValue: t
    };
  }
  function io(e) {
    return XA("Input ID", e);
  }
  function oo(e) {
    return XA("Label text", e);
  }
  const I8 = "_container_tyghz_1", T8 = {
    container: I8
  }, P8 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const { label: n = "My Action Button", width: r } = e;
    return /* @__PURE__ */ y("div", H(M({ className: T8.container }, t), { children: /* @__PURE__ */ y(ht, { style: r ? { width: r } : void 0, children: n }) }));
  }, N8 = {
    title: "Action Button",
    UiComponent: P8,
    settingsInfo: {
      inputId: io("myButton"),
      label: oo("My Button"),
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"]
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: O8,
    category: "Inputs",
    description: "Creates an action button whose value is initially zero, and increments by one each time it is pressed."
  }, D8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEtklEQVR4nO3cP2zcVADH8V8QA2QrEh2RqCxRiY2OYQplpFvikY0qS0YndK9UvMFSyASjCRMIiUopU7tRtiJUWWEHiW6VYDkGP+sOp07Of37yXd73I0XxucmLh6/8bPfubcxmMwFje2XqA8DlRFiwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsHh16gOYSlaUbf90JXz18Tx8nZGnSc8h11O0YTVcl7Qn6QNJ7w4c66mkh5LuS/p94Fhri6lQui3pN0n7Gh6Vwhj7YczbI4y3lmI/Y30s6cvGvtbpbAmL0+hGGPsfSV/3HG9txRzWm6qmq9pjSft5mvw6ZNCsKN+T9IWkrbDrvqQfJf01ZNx1E/NUuCfp9bD9RNL20KgkKYyxLemXsOu18LeiEnNY7y9sf5qnyb9jDRzGutPyt6IQ81S4tbD9eMhAWVEeSDoILz/M0+RJY8yts791ucV8xtqsN/I0edF3kKwov5J0L7yso2qOuXnmFy+5mMMaLJypPgkvd+uoQFi9ZUV5TfMz1WGeJidTHs+qIaz+vg3fj/M0+WzSI1lBhNVDmAJvqHqQejjx4awkwuooTIH1HeBhnianUx7PqiKs7g5U/bfNSZ4mR1MfzKoirA6yoryh+V0gU+A5CKub+i7wiEcL54v5yXurcHF+T9Ud327Yd1PSzfAj3AVegDNWQ1aUVzQ/M+1kRVk/VtgJ34+4YL8YYTXkafJc0u7Crp3GE3Yu2JdAWC+Rp8mx/n9xXp/BTri2Wg5htQhP048bu5uv0SLmsP6uN7KifKPlZw41f5vyaZfnVuFardb3rc5rK+a7wkeSboXtjyR90/yBcJHeFt1Fbi1sP+o5xtqK+Yz1w8L23awo3xpr4DDW3YVd34819rrYmM1mUx/DJMIHVk8lvR12/akqhp8l9X3j36aqzybekXQ17PtD0jU+sBqXPUk/he2rkj43/Y3oxDwVStIDVWeYZ4axn4WxHxjGXnmxn7Gkaup7R9WT9W1Vn6jp+x71F6ou1B9K+m6Uo1tThDV3LJ5TjSb2qRAmhAULwoIFYcGCi/ezLCv6xYawKqzoNzKmQlb0s4j9jMWKfiYxh8WKfkYxT4Ws6GcUc1is6GcU81TIin5GMZ+xWNHPKOawBmNFv3aE1RMr+p2PsPpjRb9zEFYPrOh3McLqiBX9lkNY3bGi3xIIqwNW9FseYXXDin5LivnJeytW9BuOM1YDK/qNg7AaWNFvHIT1EqzoNxxhtWBFv2FiDosV/YxivitkRT+jmM9YrOhnxIp+rOhnEfNUKLGin03MU6HEin42sZ+xJFb0s4j2GgtesU+FMCEsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiz+AwEFRrQUQeonAAAAAElFTkSuQmCC", R8 = "_container_162lp_1", L8 = "_checkbox_162lp_14", Jd = {
    container: R8,
    checkbox: L8
  }, M8 = ({ uiArguments: e, wrapperProps: t }) => {
    const n = e.choices;
    return /* @__PURE__ */ L(
      "div",
      H(M({
        className: Jd.container,
        style: { width: e.width }
      }, t), {
        children: [
          /* @__PURE__ */ y("label", { children: e.label }),
          /* @__PURE__ */ y("div", { children: Object.keys(n).map((r, i) => /* @__PURE__ */ y("div", { className: Jd.radio, children: /* @__PURE__ */ L("label", { className: Jd.checkbox, children: [
            /* @__PURE__ */ y(
              "input",
              {
                type: "checkbox",
                name: n[r],
                value: n[r],
                defaultChecked: i === 0
              }
            ),
            /* @__PURE__ */ y("span", { children: r })
          ] }) }, r)) })
        ]
      })
    );
  }, F8 = {
    title: "Checkbox Group",
    UiComponent: M8,
    settingsInfo: {
      inputId: io("myCheckboxGroup"),
      label: oo("Checkbox Group"),
      choices: {
        label: "Choices",
        inputType: "list",
        defaultValue: {
          "choice a": "a",
          "choice b": "b"
        }
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: D8,
    category: "Inputs",
    description: "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values."
  }, B8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGAUlEQVR4nO3cz2scZQDG8W+sjQf1UBH80Z7qBjwVZNuCUMFDLx5E25hsQOtFUUoF9bDTtH+AbTaggkppoRd7yZpie29uFYS2UfGaNRfbWvHQix5MkXiYN2Yyidnddp7s7jvPBxY6k915X+iX2TeT3RlaXl7GrGgP9XoCFieHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbxcK8noJQ0W508bQ9wAHgJeBF4Ftje5VB/Ab8CPwFXge+An9u9qFGrdDnM4Ig6rDbeAd4D9hdwrEeB58NjIuy7BpwDzhdw/IFTxrCeBM4Ab4jH2R8erwBHgT/E4/WVsq2xjgA/oo8qaxT4IYxdGmU6Yx0Bvt5g/xJwOTy+B243apWlbg6cNFuPAbuAF4BDwGvAcOYpuzJjX+jm2INqaHl5uddzkMks3p8CbpD+B2ddApJGrdLRKr+LcSvAFHA496ObwF7gd/DiPQZnWBvVP8DJRq3SUAwWQh1Nmq0E+ATYFn60K8wlH1x0yrDGOkb69pQliyorjHEyt/sQ8IF67F4rQ1hv57YvbkVUK8JYF3O7o1/Ixx5WlbXXqZaAj3swj4/C2Cv2k661ohX7GutAbnu2UavcbPeioaGhjgeozyzsBsZIL7buBiYbtcpU9jmNWuVW0mx9A7yVm9uNjgcaMLGfsV7KbV8u8uAhqivAaUJU0xMjU//z9PzY+blFJfaw9uW2rxd14PrMwg7SqHaHXVObRAXrz05RvxXGHtbTue07BR77LKtRzU5PjEy2ef5vue1nCpxL34k9rOzVbxq1yt9FHLQ+s3CcdF0FsAi83+41G1zN7/YTFAMl9rAKV59ZqJKuqVaMT0+M3O3VfPqVw+re2cy/J6cnRuZ7NpM+5rC6EN4Cq2Fzvs1ivdQcVofCpYXjmV3jvZrLIHBYnTsO7Aj/npyeGFns5WT6ncPqQH1m4SDplXWARb8FtuewOpN9C3RUHYj9b4UdSZqtKulve1XSa1LnVn4WzlYHw+bc9MTIufVHsDyfsVJXWP1t72z47W+Fz1b3wWes1ByrV9IBTtdnFuZIF+vZs9Xcls9sQPmMBTRqlXEgf6HzNGvPVrNbN6PBF3tYf2Y3kmbr8U2eOw5k/zSTXVstPujaKmm2hnO77j3I8fpd7GF1/ImCRq2y2R+Ti1iw58fOzy0qsYeVv3/Cns2e3KhVZtk4oiLCyn/+KtpPj0L8YV3Nbb/ewWsmST8K8992QZ9eyI+dn1tUYv/CapW1Z4Yl4LlOPvde8Dx2Ar8Aj2R272vUKtGetWI/Y82T3vVlxTDwaQ/m8Rlro7qO3woHXv5+DWNJs1XfqsHDWGO53RvdQyIqZQjrK9Z/Q+ZU0mzJv42cNFvHgFO53ZeBL9Vj91pZrrwfJf3Gzs6wvQ34Imm2Xib9HqDipiCnWH+7pFthLtErS1h3gBOsfwsaBV5Nmq1Z0jvPzAO3GrVKVxcvk2ZrO2m0VdJ7M4yR+yJHcIJivynUt8oSFqzel+pz4InM/mHgzfAAOr53aTfuAh9SkntjQTnWWFkXSC+SfruFY14KY5YmKihfWJCuc0aBd1l7KaJo18IYh0lvuFYqZXorzDsfHntZvR13lfu7Hfc94DbpGm3ldtxRX6dqJ+or79Y7ZXwrtC3gsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDssk/gWz/xACdMer2wAAAABJRU5ErkJggg==", U8 = "_container_1x0tz_1", z8 = "_label_1x0tz_10", A0 = {
    container: U8,
    label: z8
  }, j8 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    var a;
    const n = (a = e.width) != null ? a : "auto", r = M({}, e), [i, o] = K.useState(r.value);
    return K.useEffect(() => {
      o(r.value);
    }, [r.value]), /* @__PURE__ */ y(
      "div",
      H(M({
        className: A0.container + " shiny::checkbox",
        style: { width: n }
      }, t), {
        children: /* @__PURE__ */ L("label", { htmlFor: r.inputId, children: [
          /* @__PURE__ */ y(
            "input",
            {
              id: r.inputId,
              type: "checkbox",
              checked: i,
              onChange: (l) => o(l.target.checked)
            }
          ),
          /* @__PURE__ */ y("span", { className: A0.label, children: r.label })
        ] })
      })
    );
  }, W8 = {
    title: "Checkbox Input",
    UiComponent: j8,
    settingsInfo: {
      inputId: io("myCheckboxInput"),
      label: oo("Checkbox Input"),
      value: {
        inputType: "boolean",
        label: "Starting value",
        defaultValue: !1
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"]
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: B8,
    category: "Inputs",
    description: "Create a checkbox that can be used to specify logical values."
  }, Y8 = ["shiny::tabPanel"];
  function ZA(e) {
    return Y8.includes(e.uiName);
  }
  function Tg(e) {
    return ZA(e) ? e.uiArguments.title : null;
  }
  function eC({ uiChildren: e }) {
    let t = [];
    return e == null || e.forEach((n) => {
      const r = Tg(n);
      r && t.push(r);
    }), t;
  }
  function tC({ uiChildren: e }) {
    var n;
    const t = e == null ? void 0 : e[0];
    return t && (n = Tg(t)) != null ? n : "First Tab";
  }
  const V8 = "_container_10z2l_1", $8 = {
    container: V8
  };
  function nC(r) {
    var i = r, { title: e, children: t } = i, n = Le(i, ["title", "children"]);
    return /* @__PURE__ */ y(
      "div",
      H(M({
        className: $8.container,
        "data-tab-id": e,
        "aria-label": `tab panel ${e}`
      }, n), {
        children: t
      })
    );
  }
  function ys(e) {
    return typeof e == "object" && e !== null;
  }
  function Pg(e) {
    return ys(e) && "uiName" in e && typeof e.uiName == "string" && e.uiName in rn;
  }
  function H8(e, t) {
    return !e || !t ? !1 : fa(e, t);
  }
  const G8 = "_container_qbb7e_1", J8 = "_header_qbb7e_13", Q8 = "_tabContents_qbb7e_21", K8 = "_pageTitle_qbb7e_26", q8 = "_tabHolder_qbb7e_39", X8 = "_tab_qbb7e_21", Z8 = "_newTabDropDetector_qbb7e_99", e7 = "_addTabButton_qbb7e_104", t7 = "_tabDropDetector_qbb7e_112", mr = {
    container: G8,
    header: J8,
    tabContents: Q8,
    pageTitle: K8,
    tabHolder: q8,
    tab: X8,
    newTabDropDetector: Z8,
    addTabButton: e7,
    tabDropDetector: t7
  }, n7 = {
    uiName: "unknownUiFunction",
    uiArguments: {
      text: "Dummy ui node for app previews"
    }
  };
  function r7(e) {
    const t = ls((r) => r.app_info);
    return _.useMemo(() => Pg(t) ? bi(t, e) : n7, [e, t]);
  }
  const i7 = ({ name: e, isActive: t, index: n, parentPath: r }) => {
    const i = nn(r, n), o = fs(), a = r7(i), l = fE({
      node: a,
      path: i,
      canDrag: !0
    }), s = H8(i, o);
    return /* @__PURE__ */ y(
      "div",
      H(M({
        className: mr.tab,
        "data-active-tab": t,
        "data-selected-tab": s
      }, l), {
        style: { order: n },
        "aria-label": t ? `Active tab ${e}` : `Select ${e} tab`,
        children: e
      })
    );
  };
  function o7({
    uiChildren: e,
    parentPath: t
  }) {
    return /* @__PURE__ */ y(Ge, { children: e.map((n, r) => {
      const i = nn(t, r);
      return /* @__PURE__ */ y(
        sr,
        {
          path: i,
          node: n
        },
        ff(i)
      );
    }) });
  }
  const a7 = "_container_fe3r8_1", l7 = "_emptyTabPanelDropDetector_fe3r8_8", C0 = {
    container: a7,
    emptyTabPanelDropDetector: l7
  }, rC = [
    "shiny::navbarPage",
    "shiny::tabPanel",
    "gridlayout::grid_card",
    "gridlayout::grid_card_plot",
    "gridlayout::grid_card_text"
  ], s7 = {
    rejected: rC
  }, u7 = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    const i = t && t.length > 0;
    return /* @__PURE__ */ y("div", H(M({ className: C0.container }, r), { children: i ? /* @__PURE__ */ y(o7, { uiChildren: t, parentPath: n }) : /* @__PURE__ */ y(
      si,
      {
        className: C0.emptyTabPanelDropDetector,
        index: 0,
        parentPath: n,
        dropFilters: s7
      }
    ) }));
  }, c7 = {
    rejected: rC.filter(
      (e) => e !== "shiny::tabPanel"
    )
  }, f7 = ({ uiName: e }) => e !== "shiny::tabPanel" ? {
    uiName: "shiny::tabPanel",
    uiArguments: { title: "Tab Panel" }
  } : null;
  function x0({
    index: e,
    parentPath: t,
    children: n,
    baseWidth: r
  }) {
    return /* @__PURE__ */ y(
      si,
      {
        className: mr.tabDropDetector,
        "aria-label": "tab drop detector",
        parentPath: t,
        index: e,
        dropFilters: c7,
        wrappingNode: f7,
        style: {
          "--baseWidth": r,
          order: e - 1
        },
        children: n
      }
    );
  }
  function d7(e, t = 0) {
    const [n, r] = _.useState(t);
    return _.useEffect(() => {
      e <= n && r(e - 1);
    }, [n, e]), { activeTab: n, setActiveTab: (o) => {
      r(o);
    } };
  }
  function iC(o) {
    var a = o, {
      path: e,
      title: t,
      children: n,
      className: r = ""
    } = a, i = Le(a, [
      "path",
      "title",
      "children",
      "className"
    ]);
    const l = h7(n), s = l.length, u = fs(), { activeTab: c, setActiveTab: f } = d7(l.length), d = pf();
    return _.useEffect(() => {
      const p = nn(e, c);
      if (!u)
        return;
      zi(u) >= zi(p) && f(u[zi(p) - 1]);
    }, [c, e, u, f]), /* @__PURE__ */ L("div", H(M({ className: nt(r, mr.container) }, i), { children: [
      /* @__PURE__ */ L("div", { className: mr.header, children: [
        /* @__PURE__ */ y("h1", { className: mr.pageTitle, children: t }),
        /* @__PURE__ */ L("div", { className: mr.tabHolder, "aria-label": "tabs container", children: [
          l.map((p, h) => /* @__PURE__ */ y(
            i7,
            {
              name: p,
              parentPath: e,
              isActive: h === c,
              index: h
            },
            p + h
          )),
          oc(s).map((p) => /* @__PURE__ */ y(
            x0,
            {
              parentPath: e,
              index: p,
              baseWidth: "10px"
            },
            p
          )),
          /* @__PURE__ */ y(
            x0,
            {
              parentPath: e,
              index: s,
              baseWidth: "25px",
              children: /* @__PURE__ */ y(
                v7,
                {
                  className: mr.addTabButton,
                  label: "Add new tab",
                  onClick: (p) => {
                    p.stopPropagation(), d({
                      path: nn(e, s),
                      node: p7
                    });
                  }
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ y("div", { className: mr.tabContents, children: m7(n, c) })
    ] }));
  }
  const p7 = {
    uiName: "shiny::tabPanel",
    uiArguments: { title: "Empty Tab" },
    uiChildren: []
  };
  function h7(e) {
    let t = [];
    return _.Children.forEach(e, (n) => {
      if (!_.isValidElement(n))
        return null;
      const r = n.props.title;
      typeof r == "string" && t.push(r);
    }), t;
  }
  function m7(e, t) {
    return _.Children.map(e, (n, r) => _.isValidElement(n) && typeof n.props.title == "string" ? /* @__PURE__ */ y("div", { className: mr.tabContents, "data-active-tab": r === t, children: n }) : n);
  }
  const g7 = {
    display: "block"
  };
  function v7({
    label: e,
    onClick: t,
    className: n
  }) {
    return /* @__PURE__ */ y(
      kA,
      {
        className: n,
        placement: "bottom",
        "aria-label": e,
        popoverContent: e,
        onClick: t,
        openDelayMs: 0,
        children: /* @__PURE__ */ y(sg, { style: g7 })
      }
    );
  }
  const y7 = "_noTabsMessage_130qz_1", oC = {
    noTabsMessage: y7
  }, w7 = ({
    uiArguments: { title: e },
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    var a;
    const o = ((a = t == null ? void 0 : t.length) != null ? a : 0) > 0;
    return /* @__PURE__ */ y(
      iC,
      H(M({
        path: n,
        title: e,
        className: oC.container
      }, r), {
        children: t ? t.map((l, s) => {
          const u = nn(n, s), c = ZA(l) ? l.uiArguments.title : "unknown tab";
          return /* @__PURE__ */ y(nC, { title: c, children: /* @__PURE__ */ y(sr, { path: u, node: l }) }, ff(u));
        }) : /* @__PURE__ */ y(b7, { hasChildren: o })
      })
    );
  };
  function b7({ hasChildren: e }) {
    return e ? null : /* @__PURE__ */ y("div", { className: oC.noTabsMessage, children: /* @__PURE__ */ y("span", { children: "Empty page. Drag elements or Tab Panel on to add content" }) });
  }
  const S7 = {
    title: "Navbar Page",
    UiComponent: w7,
    settingsInfo: {
      title: {
        inputType: "string",
        label: "Page title",
        defaultValue: "navbar-page"
      },
      collapsible: {
        label: "Collapse navigation on mobile",
        inputType: "boolean",
        defaultValue: !1
      },
      id: {
        inputType: "string",
        label: "Id for tabset",
        defaultValue: "tabset-default-id",
        optional: !0
      },
      selected: {
        inputType: "dropdown",
        optional: !0,
        label: "Selected tab on load",
        defaultValue: (e) => e ? tC(e) : "First Tab",
        choices: (e) => e ? eC(e) : ["First Tab"]
      }
    },
    acceptsChildren: !0,
    // iconSrc: icon,
    category: "layouts",
    description: "Layout an app with tab-based navigation"
  }, E7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGlUlEQVR4nO3cz28UZRzH8XdFIRE8lOhJTs30YATUlgQv3OCipiYkMEU9CSn+CJ7caf8EmF6IJlYa0IviDiQmGvFSbhxEQ1GCxMOOPeHVPQgkNCH18DzTbne72267387s9vNKNtvuzm6fDO8+++zslL6FhQVEOu2pvAcgvUlhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJp7OewAAUZLW3zQEnAAOAS8DuzZ7TAX3ALgH3AC+A27X3hmHQR5jWqYQYdW5CJzMexAFtws46C+fApeAU7mOqE7RwvoBGAHmgS9xv41/xmHwINdRFUyUpLuAvbhZ/QPcL+ILwNt5jqtWkcK6iIvqH+CtOAz+yHc4xeV/0W4CN6Mk/Rr4CbfvLlGQ2b4oi/fXcDtkHkXVFr+v3gQeA+/j9mXuijJjveOvL2ylqFZ407JmtQv0OAzuREk6DZzB7cvfNzy4DSrKjHXIX1/OdRTdLdt3h1putUmKMmMN+evbLbeqEyXpGHABOD45Oni1/v5SuXIMGAMO19w8DUxMjg5WFxYWap9rADgLHKvZ9lwcBhPtjKlDPvTXU208JpulCvFSWJQZ6xmAOAzm23zcWLM7SuXKGHCF5VFlj7lVKlf6sxt8VDMsjwpgPErSW22OaaNGgM/9ZWStD4rD4LH/crvFoNpVlLDaEiXpcJSkM8Bwi83G/fW5ydHBvsnRwT7gADAHDNTcn207AFwHdsdhULvtsJ8ZN8M+4Ftgm79c9rd1na4KK0rS/ihJF4BbNM5Ei0rlymF8KJOjg4svZZOjg7NA9n3t47OZ6nQcBlWAOAxmcS+b+Oeytgf4meWfMuz0t+3ZhJ/fUUVZY63HNO4fvCGwydHB60Bfk8fN1d8Qh8HuVX5Wte3RtedZ4BorB5QF9zrwyHgcHdNVYfnZZDGYKEmvrONpsrXVbKuNoiTNFv5VoOGNQQdtw33CsL/FNvv8NkeBJ4Zj6ZiuCqtDsvXS9Ep3Rkl6lqX11yxwPA6Dhlmugz5jbYv0bFH/keFYOqar1lgbVSpXssMJE369tZph4IJ/12jlY9wsvJZLV0QFWygsH9U4LqpzzbaLw2DCvyvcjXuXOIw7bCFt2BJhlcqVGVxUp1tFVSsOg2ocBkdYOuTQ9F2oNOrpNVapXBnAzTYDNDk6vwbZca/+1TZcpy9YOtK+mim65OWwZ8PyUc3ggjjSbE3l109/A9Umhx2y9ZXVIYczwIusvoD/0W/bFXr5pbB2pmq6UPfv+OaA/ihJZ6Ik7YfFg7Ez/jnm4jC4bjTOJ7gzEu622OYu8C5dcqgBenTGKpUr4yx93DNTKldW2qyKW6ADnMbNboeBf+tOZ6kCx21Guugh8AbwC40HSe/7+7rqLNpenbFafYbYwM9GB2g8EHoVOOA/3rGWBVR7dP0R7iS++5vw8zuqr/bUkbxESTqPO8NhxzrOcOhaTU70GwG+918fxa2tGtT/JY4/D/4/4EEcBs91bpTrU5QZKzsPa6jlVltDtkj/hCZRNbHXX9/r+IjWoShh3fDXJ3IdRXFM4Q5DtCPbdzdabrVJivJSOIT7XO4xcDAOgzs5D6mrREm6H/gN2AEMx2HQ1pm4FooyY90GvsLtmGtRkr6a73C6R5Skr+BOq9mB24e5RwXFOtxwEnget3j9NUrSKeAb4K84DB7mOrKCiZJ0J/AS8B7uqP123HqsEH9TCMV5Kaz9Vn9i375lf2JfhP+7oSgvhbVO4Y4pncetu7rmrMlN9Ai3b87j9lWh/t8GKMiMJb2niDOW9ACFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmPgfvKFXQMGTndIAAAAASUVORK5CYII=";
  function aC({
    label: e,
    children: t
  }) {
    return /* @__PURE__ */ L("div", { className: "LabeledInputCategory", children: [
      /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: e }) }),
      /* @__PURE__ */ y("section", { className: "grouped-inputs", children: t }),
      /* @__PURE__ */ y("div", { className: "divider-line" })
    ] });
  }
  const A7 = "_container_yicbr_1", C7 = {
    container: A7
  }, x7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    var a;
    const n = M({}, e), r = (a = n.width) != null ? a : "200px", [i, o] = K.useState(n.value);
    return K.useEffect(() => {
      o(n.value);
    }, [n.value]), /* @__PURE__ */ L(
      "div",
      H(M({
        className: nt(C7.container, "shiny::numericInput"),
        style: { width: r }
      }, t), {
        children: [
          /* @__PURE__ */ y("span", { children: n.label }),
          /* @__PURE__ */ y(
            Pf,
            {
              type: "number",
              value: i,
              onChange: o,
              min: n.min,
              max: n.max,
              step: n.step
            }
          )
        ]
      })
    );
  }, k7 = {
    title: "Numeric Input",
    UiComponent: x7,
    settingsInfo: {
      inputId: io("myNumericInput"),
      label: oo("Numeric Input"),
      min: {
        label: "Min",
        inputType: "number",
        defaultValue: 0,
        optional: !0
      },
      max: {
        label: "Max",
        inputType: "number",
        defaultValue: 10,
        optional: !0
      },
      value: {
        label: "Start value",
        inputType: "number",
        defaultValue: 5
      },
      step: {
        inputType: "number",
        label: "Step size",
        defaultValue: 1,
        optional: !0
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"],
        optional: !0
      }
    },
    settingsFormRender: ({ inputs: e }) => /* @__PURE__ */ L(Ge, { children: [
      e.inputId,
      e.label,
      /* @__PURE__ */ L(aC, { label: "Values", children: [
        e.min,
        e.max,
        e.value,
        e.step
      ] }),
      e.width
    ] }),
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: E7,
    category: "Inputs",
    description: "An input control for entry of numeric values"
  }, _7 = ({
    uiArguments: { outputId: e, width: t = "300px", height: n = "200px" },
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    "div",
    H(M({
      className: ph.container,
      style: { height: n, width: t }
    }, r), {
      children: /* @__PURE__ */ y(bE, { outputId: e })
    })
  ), O7 = {
    title: "Plot Output",
    UiComponent: _7,
    settingsInfo: {
      outputId: {
        inputType: "string",
        label: "Output ID for plot",
        defaultValue: "plot"
      },
      width: {
        label: "Width",
        inputType: "cssMeasure",
        defaultValue: "100%"
      },
      height: {
        label: "Height",
        inputType: "cssMeasure",
        defaultValue: "400px"
      }
    },
    serverBindings: {
      outputs: {
        outputIdKey: "outputId",
        renderScaffold: `renderPlot({
  #Plot code goes here
  $0plot(rnorm(100))
})`
      }
    },
    acceptsChildren: !1,
    iconSrc: ig,
    category: "Outputs",
    description: "Render a `renderPlot()` within an application page."
  }, I7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGa0lEQVR4nO3dT6hUZRjH8e9EZAu1TVoQXVIuZKkEbXVjm1rUhZAco1b9WQhJ/2CumW0qNW8LixIhIVpEOlaESos21ULXRSm4mEovJfhnpQWVdKfF+w7zztzXO+fOnMfrzPP7wOWeOefc95x7+XHeM++857mVZrOJSNluWugTkNGkYIkJBUtMKFhiQsESEwqWmFCwxISCJSYULDGhYIkJBUtMKFhiQsESEwqWmFCwxISCJSYULDGhYIkJBUtMKFhiQsESEwqWmFCwxISCJSYULDGhYIkJBUtMKFhiQsESEwqWmFCwxISCJSYULDGhYIkJBUtMKFhiQsESEwqWmFCwxISCJSYULDFx80KfwEKo1RtFd10PbIjf7weWAVeB34GzwHHg+/i9p6nq+DzPdHi5DFYPFWALMAmMZbYvAlbFr4fjuj+AXcB+QP9DBnWF3R4DzgD7yIfqWu6KP3MGmCj9rIaQgtW2HThKZ6CmgXcIV6a7gVuBJcB9wCNx22/J/mPAEWDndTjfG5q6wuAA8FzyehrYBhyeqo7/17XvP8Dp+PVNrd54HagSQtYK5XbgTuBZy5O+kSlY8BadoToKPD1VHb9S5IenquMzwMFavXEM+Ah4Mm56BjgHvFHiuQ4N713hBLAjef0+8HjRUKWmquN/Ak8Be5PVO3B6z1Xx+I8wk+GGs7S7rzrhajPoH6QCHCR0jxC61RXAjKfhBs9XrC20QzVN6A5zobqdMJTwE/B3/PoReDNu69aMbU3H12PxWK54DtZr6XLsyrptBBpx37WEMaxFwAOEe6df4j4dYluTyarJ7n1GnddgrSMMH0DoDg9l9tkIfA7cNkc7S+M+s8IFHI5tE4+1rq8zHVJeg7UhWT4U39mllgEfE+6XeqnEfZenK2ObaWDTY448r8Fanyx/l9m+lXA1Kmop8FJmfdr2+sz2keU1WGuS5ZOZ7f0METyaWZe2vSazfWR5DVb6bu5SZvuqPtq8N7PuYrK8rI82h5bXYFn4d6FP4EbiNVjpVSo3FnW6jzZ/zaxLr1IXM9tHltdgnUqWV2e2H+2jza8z63rdy40sr8FKZ3w+lNn+IXB5Hu1dBt7LrE+HGArNMh0VXoP1bbJcrdUb3X+HC4TZCUU+N2zGfS+kK2Ob1WRVblhjZHkN1gnCvHWAe4BNmX2+jOvnmulwBXgi7tttU2ybeKwTfZzn0PIaLAgT81r21OqNxZl9vgBWArsJ90hXgb+AH4C347ZZoYpt7bnGsVzwHKz9dM5AOED+I5xLhBmha4FbgMXAg4QPoXNjYJXYVjpzYn9pZz0kPM8gnSF8dHMkvt4MnAdeyXx2WEit3qgA78a2WrbGY7ni+YoFYVghffDhReCrWr2xZL4Nxe7vU+DVZPVO+hu6GHqer1gtO4A7aM97nwBO1uqNScLDFHNebeK7v02Ee6r0CZ9P6Jz27IqCFTxPeIyrdfUaI0wv3lOrNz4jDBWcoj2ksJwwsLqBEKqVXe3tJtyXuaVgte0CfiYMjrauPGOEx8C2FWxjmnBP5bL7S3m/x+p2jPDgwwu03zEWcS7+zAoUKkBXrJwZwuPy++gsCrKa9izRC4Su8Tihm3T1cU0RCtbcjqPQ9EVdoZhQsMSEgiUmFCwxoWCJCb0rnFupNUg9UbBmUw3SEqgr7KQapCVRsNpUg7RE6goD1SAtmYKlGqQmvHeFqkFqxHuwPkiW68DL/c53B5iqjjcJU5PrXcdw93d29wsnZtUgjcEYSGxDNUgX+gQWUJEapH1RDVK/wSpSg3RQqkHqUK8apANTDVKfetUgLYtqkDpzvepWqQapM71qkJZFNUhFyuQ1WL1qkJZFNUid6VWDtCyqQepMrxqkZVENUmd61SAdmGqQ+lSkBumgVIPUqSI1SPuiGqS+gzWrBmks9TiQ2Ib7GqSeg9WqQdqyGdg7yP2WapC2eQ4WqAapGc15Vw1SEwpWoBqkJVOw2lSDtETe77G6qQZpSXTFmk01SEtQaTZVw0LKp65QTChYYkLBEhMKlphQsMSEgiUmFCwxoWCJCQVLTChYYkLBEhMKlphQsMSEgiUmFCwxoWCJCQVLTChYYkLBEhMKlphQsMSEgiUmFCwxoWCJCQVLTChYYkLBEhMKlphQsMSEgiUmFCwxoWCJCQVLTChYYkLBEhMKlphQsMSEgiUmFCwxoWCJCQVLTPwPfv2SDtx+O9MAAAAASUVORK5CYII=", T7 = "_container_sgn7c_1", k0 = {
    container: T7
  }, P7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.choices, r = Object.keys(n), i = Object.values(n), [o, a] = _.useState(i[0]);
    return _.useEffect(() => {
      i.includes(o) || a(i[0]);
    }, [o, i]), /* @__PURE__ */ L(
      "div",
      H(M({
        className: k0.container,
        style: { width: e.width }
      }, t), {
        children: [
          /* @__PURE__ */ y("label", { children: e.label }),
          /* @__PURE__ */ y("div", { children: i.map((l, s) => /* @__PURE__ */ y("div", { className: k0.radio, children: /* @__PURE__ */ L("label", { children: [
            /* @__PURE__ */ y(
              "input",
              {
                type: "radio",
                name: e.inputId,
                value: l,
                onChange: (u) => a(u.target.value),
                checked: l === o
              }
            ),
            /* @__PURE__ */ y("span", { children: r[s] })
          ] }) }, l)) })
        ]
      })
    );
  }, N7 = {
    title: "Radio Buttons",
    UiComponent: P7,
    settingsInfo: {
      inputId: io("myRadioButtons"),
      label: oo("Radio Buttons"),
      choices: {
        label: "Choices",
        inputType: "list",
        defaultValue: {
          "choice a": "a",
          "choice b": "b"
        }
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"],
        optional: !0,
        useDefaultIfOptional: !0
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: I7,
    category: "Inputs",
    description: "Create a set of radio buttons used to select an item from a list."
  }, D7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGcElEQVR4nO3cz28UZRzH8feKSgJcSvTmqU4PRkClJMQDt3JRgyeZop6EUH8ET+6UP4FOL0QTsA3oRXEHThLxUm4cRGNRROJhh57wSi9AAoash+cZmC5L2U3323m2/bySzbK7T9eH8d1nprNTaq1WC5F+e6bqCcjapLDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITz1Y9gUKS5e1P7QQOAHuAV4Etqz2nwN0GrgOXgB+AK+UX0ziqYk4PBRNWm1PAwaonEbgtwG5/+wI4DRyqdEYlIYb1I7APuA98jftu/DuNo9uVziowSZZvAbbhVvWPcd+ILwLvVjmvQmhhncJF9S/wThpHf1Y7nXD5b7TLwOUky78FfsJtu9MEsNqHdPD+Bm6D3EdR9cRvq7eBe8BHuG1ZqZBWrPf9/cx6iqrDDy1dKx+gp3F0NcnyWeAIblv+seLJrUBIYe3x92d6+aJarfbE1+qN5i1gCNg6PT6y2GlMq9Xq5T8XujO4sPY8baC1kHaFO/39lWVHrR+f+FsvilWq8l1hSGE9B5DG0f2qJxKAfcBX/rav2y9K4+ie/+PzFpPqRUhhibMd+B7Y4G9n/HMDJaRjrK4lWX4MOAwM1RvN4ulzwNT0+Mh8hy8Zrjeax4Ax//gicLR9bJLlQ0Dx3kveN42jTu/bby8BP7P0U4bN/rk3gZurMIe+GLgVK8nyOWASd1Be9h4wV280258HmONRVPg/z9UbzeHS+w4Dv7M0qofv61+3tAm4gIurXRHcJuM59M1AhZVk+RguigVgVxpHtenxkdr0+EgNtwoN8XgYAIvAhB+3tTT2WGnMDDDsX3s5jaNaGkc1YLbD2H7bgPuEYccyY7b7MRsM59E3A7UrTOPoIvCk8wsXcdF1WrH2F7u96fGRxXqjOQHc8OOL1WoMF+D+NI4enppI42gCmOjbX6KzL+nuIL04qP/UdjorN1BhFZIsn8StTMOlY6zlLJQfTI+PLNQbzQVgOMnyUdxKBTBfjmoVfeZva8bAheWPscaeOvDpOgVURVRr0kCFlWT5YR4dY+1P42i+OPNebzQn6e04qNhlLnZ4TlZooA7eebTLml3Jj//1RrPY/S2mcbQAFO816k85rLYTQKvL24kK5tezQQurWF3GygH4c1STy3zd2eLUgr+f8c/PAvi4zuFWrLPlUwtJls8kWd5Ksvxs//4ajzkCnO9i3Hk/NngDtSvEhTCJ2x3eSrKcLg/ex4AbbWPnganS46PAaDG27aqDRf+6lQe4KxJ+4cln2a8BH/ixwRuoFcv/xLYXd2qhbIrl/8dPtT0+B+wtX/HgV61d+FWsfax/3dId4C06n12/6V8bmKtoa6FcNpJkeQvAn5RcNzpcj7Udd2VocZb9Lu7jnL/aB3b6hYlQtmNIK9Z/AEmWV/7JfMWu4a5jf+BvB+gQVSf+OngIYGULKaziOqydy45aH4qD9M/p7qC+sM3fX+/7jHoUUliX/P2BSmcRjpP0fmqh2HaXlh21CkI6xtqJ+0ntHrA7jaOrFU9poCRZvgP4DdgIjKZxVOmVuCGtWFeAb3Ab5kKS5a9XO53BkWT5a7jLajbitmHll3eHdh7rIPAC7lP8X5MsPwl8B/yTxtGdSmcWmCTLNwOvAB/iro1/Hnc8VvnvFEJYu8LyQ/2Kfe+W/Ip91f92Q0i7wrJDuJOVx3HHXXcrnU2Y7uK2zXHctgrm322AgFYsWVtCXbFkwCksMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDExP/hwWjHA5DRAwAAAABJRU5ErkJggg==", R7 = "_container_1e5dd_1", L7 = {
    container: R7
  }, M7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.choices, r = e.inputId;
    return /* @__PURE__ */ L("div", H(M({ className: L7.container }, t), { children: [
      /* @__PURE__ */ y("label", { htmlFor: r, children: e.label }),
      /* @__PURE__ */ y("select", { id: r, children: Object.keys(n).map((i, o) => /* @__PURE__ */ y("option", { value: n[i], children: i }, i)) })
    ] }));
  }, F7 = {
    title: "Select Input",
    UiComponent: M7,
    settingsInfo: {
      inputId: io("mySelectInput"),
      label: oo("Select Input"),
      choices: {
        label: "Choices",
        inputType: "list",
        defaultValue: {
          "choice a": "a",
          "choice b": "b"
        }
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: D7,
    category: "Inputs",
    description: "Create a select list that can be used to choose a single or multiple items from a list of values."
  }, B7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAES0lEQVR4nO3aP4gcZRyH8eckosWRQ4uAhaYJmCqNJmIpaGWiVl5voykV3QSSwuIscioqCNHu2rWSqIUIsdMiRkEbi2v8A4FYJUfAf7AW72xy6no32Zvvju/u84FhE5J597e5h93Mu7M0Go2QunZH3wNoPhmWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSliX98DJA2Gm7v9lbuAx4BngEeBg8AKcA34AfgS+BD4HPhtt8XWVw9NPeu8meuwdrAPeA54Fbhvwp+vAEea43ngKnAOeBf4fTYj1m0RPwofBC4D7zM5qkkOAG8Cl4DDobnmyqKFdRT4gvJONI0jzfmPdDbRnFqksA4DnwH37nGde4BP8Z1rR4sS1p3AkPJ/py6sAB8062qCpdFo1PcMrbS4wtvJy8DrHY2y3SvAG4F1/6W2K84a37FOABeBLWDU8khERbNu2xmmPbaAi4Ph5vHQa4ioLaw14AJl72m551lmZZnyej8aDDfX+h6mrZrCOg6caX59CtgPLLU4NsJzbbScY9pjP3C6ea4zg+HmifDr6URNYb3UPJ4G1ikfEW08lBnnpofD629RNmdPNb9/Mfx8nagprPEP8PxtnvdA14P8w/3h9cfeax7TIXeiprCm1dUWQ1/rj40v35dm9Hx7UlNYXzWPL9zmede7HmTG64+dbB4vzej59qSmsN5qHs9R9o/aXhX+lBnnpp/D6y8DA8rrhlv/Dv9rtW2QrnHrynARvba+euhs30O0UdM7FsBZ4GnK/VE3ep5lVm5QXu9TtUQFdd6PdaE52rqbctPegcAsv1CuOn8NrP03tX2lU81H4TS2fb+Y+q5wsH3d2n74SbV9FE7rHeDbjtf8Dni74zXnxqKE9QewSrmXvQvXgGebdTXBooQF8D3wOOX+9b24CjzRrKf/sEhhQdlkPQp8PeX53wDHqGSTsk+LFhbAj5R71k8CV1qec4Wy43+McoWpXdS43dCFPylf6m5Qbsd5knIXxEHKbSrXKQFdBj4BPmYGWwrzZK63G9SfRfwo1AwYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNSxF+9/aKLFqf7gQAAAABJRU5ErkJggg==", U7 = "_container_1f2js_1", z7 = "_sliderWrapper_1f2js_11", j7 = "_sliderInput_1f2js_16", Qd = {
    container: U7,
    sliderWrapper: z7,
    sliderInput: j7
  }, W7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = M({}, e), { width: r = "200px" } = n, [i, o] = K.useState(n.value);
    return /* @__PURE__ */ L(
      "div",
      H(M({
        className: nt(Qd.container, "shiny::sliderInput"),
        style: { width: r }
      }, t), {
        children: [
          /* @__PURE__ */ y("div", { children: n.label }),
          /* @__PURE__ */ y("div", { className: Qd.sliderWrapper, children: /* @__PURE__ */ y(
            "input",
            {
              type: "range",
              min: n.min,
              max: n.max,
              value: i,
              onChange: (a) => o(Number(a.target.value)),
              className: "slider " + Qd.sliderInput,
              "aria-label": "slider input",
              "data-min": n.min,
              "data-max": n.max,
              draggable: !0,
              onDragStartCapture: (a) => {
                a.stopPropagation(), a.preventDefault();
              }
            }
          ) }),
          /* @__PURE__ */ L("div", { children: [
            /* @__PURE__ */ y(hf, { type: "input", name: n.inputId }),
            " = ",
            i
          ] })
        ]
      })
    );
  }, Y7 = {
    title: "Slider Input",
    UiComponent: W7,
    settingsInfo: {
      inputId: {
        label: "Input ID",
        inputType: "string",
        defaultValue: "inputId"
      },
      label: {
        label: "Label text",
        inputType: "string",
        defaultValue: "Slider Input"
      },
      min: {
        label: "Min",
        inputType: "number",
        defaultValue: 0
      },
      max: {
        label: "Max",
        inputType: "number",
        defaultValue: 10
      },
      value: {
        label: "Start",
        inputType: "number",
        defaultValue: 5
      },
      step: {
        inputType: "number",
        label: "Step size",
        defaultValue: 1,
        optional: !0
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"],
        optional: !0,
        useDefaultIfOptional: !0
      }
    },
    settingsFormRender: ({ inputs: e }) => /* @__PURE__ */ L(Ge, { children: [
      e.inputId,
      e.label,
      /* @__PURE__ */ L(aC, { label: "Values", children: [
        e.min,
        e.max,
        e.value,
        e.step
      ] }),
      e.width
    ] }),
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: B7,
    category: "Inputs",
    description: "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_"
  }, V7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADSklEQVR4nO3cv0vUYQDH8c/pmWfpmV1G0uAPjAqiyYqWoK1oDKq5PdqE9qaG/ozAKWjpL4jWoKayrcWtIgqiuAYd9LQo8u3zfO39ghvux/C54y3PV9Br9fv9SLttqPQA7U+GJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlRLv0gF9ZXlkdfGg6yf0k15PMJhnd6007+JrkXZInSR4l+bD5yYe3FgtMqkO1YQ1YSvIsydHSQwaMJTm7cbuT5FqSV0UXVaIJR2EvydPUF9WgE1nfOVl6SA2aENa9JDOlR/yhuSR3S4+oQROOwhs7PTjb6+TS4mTmp8cy0RlOe7iFD/n+o5+PX7/n7dqXPH/zMWufvu30sttJHuBjKteEsLZdAV85M5Vr53p7PqQ93EpvfCS98ckszXfz+MVaXr//PPiy//eKfZMmHIUHNt+ZO9rJ1QJRDWoPtXLzwrF0x7b9bNbw22pxTQhri/ML3fCH3p/pjAzl4kK39IwqNS6s2V6n9IQtTh4/WHpClRoX1pHxkdITtpieqGtPLRoXVnuoloNw3ehI4z7CPeGn8o9qC70WhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCVHFP6zu8M0y+0Lp91Xy226qCCtJv/SAXVbL+yn2B/kehUIYlhCGJUQt11i/uxaYunzqcPf0zKGFjfuf9mLQ39i4SP6xvLL6svCUarT6/VquM7WfeBQKYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQvwEAzs9K42yqRkAAAAASUVORK5CYII=", $7 = {
    title: "Tab Panel",
    UiComponent: u7,
    settingsInfo: {
      title: {
        label: "Title of panel",
        inputType: "string",
        defaultValue: "My Shiny App"
      }
    },
    acceptsChildren: !0,
    iconSrc: V7,
    category: "Tabs",
    description: "Panel containing content for tab-based interfaces like navbar pages"
  }, lC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGBElEQVR4nO3dW4hVVRzH8e/cdMyZ8TIamZEXFA1CozQTougtqUBJLYkgeumlGAoa6TUqSKFE6qEeInoQRUwrqncjtCia0pepeSjSYKLwkpiOTtPDOsKZfc5c9JzfWmfv8/vAedh7z/BfZ81v9l5n7ctpGRsbw6zeWlM3wIrJwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEyiPVah/gND1VbPADaXXhuBW0vrWjI/l320s7dXbr8AnAJ+AA4DnwAjmZ9j1xMrsqskogWrii3ALiDOOy2+LmB16bUDGAJ2Ah+naEyKQ2Eb8CbhDTtUOiuAQ4S+botdPMUe6w2gP0HdZnWtr3fGLBp7j7WVylCNAHsJY6xuKscPlNaVv7y9cns3oQ/3Ujm26if0fTQxgzUDeDuz7jSwAegDjhMGoHZjLhD6sI/Qp6cz2/cQ/gZRxAzWNuC2suUR4FFgIGIbmsUA8AhwuWzdYmB7rAbEDNbmzPJ7OFRKPwLvZ9ZtjlU8ZrDWZ5b3RazdrLJ9vC5W4ZifCpdmlqMd75vYcaoP9uVSntKpmBW24vC5QpNwsEwi5hhrqhOpppGk373HMgkHyyQcLJOIOcbymCqNppvHsgLLU7AWAm8Bg8AlwqedWK+LwAngVWCu+H0WQspLk6/HOuBLYEGi+rOAO0uvZ4FNhKDZBGLusbJ7genqBT4lXaiyFhPaMyd1Q6bpRvu9Jnk4FPYBi1I3ImMp8ELqRjSyPBwKH6+2cklvJxtXzGHZwll0d7bR3la/Dz9XR8c49+9Vfhm+yNc/n2P4fNXz5U8Cr9WtaMHkIVgVd/I8dMc8Nq3plRVsb2uht6uD3q45rFvWw75jw5w8VXHV9CpgP3A7+kuA/gKOAR8Cv4lr1UXMQ+FUNwRMZNwfbemCTh4WhiqrvbWF7ffeTM+siv/BdkLoY1xXtgB4jHDh3oPX+bs32u81ycMYa5z1y3uiz/h1drSyYXlP5KpVzQReJ+wlG1rugrWktzNJ3ZW33JSkbhWdwDOpGzGVPIyxxpnf1ZGk7sLuCesOAx8Rbl4YBkbrVLILWAk8DdyV2XZ/nWrI5O56rPbWNKccZ3ZU3bn/CTwFnBWUPA/8AXwFfECYnL1mPmFsN53Lu309ViObIND70YSq3H/AwSrrG/pmFAerNgOR6pyMVKduHKza/B6pzt+R6tSNr8eqzZVIdS7V8Lu+HiuHYj3E5GqkOnXjYJmEg2USuZvHsuvmeSwrDgfLJBwsk/A8VvF5HsuKo1Eum4l290idpWz3P5NsS3508B7LJDyPVXyex7LiaJQx1mT/RfMeWDW3Z/Wi2ctLy+djNKia0leyjfYfGBpI1Ya8aJRgTebM0cGzZ44Ons3F/XQWeB6r+DyPZcXhYJmEg2USnscqPs9jWXE4WCbhYJmE57GKz/NYVhwOlkmkDFZDPy3FahMzWIOMf9743RFrN6v7GN/nv8YqHDNYP2WWd0Ss3ayyffxdrMIxg3Uks/wcsDZi/WazhtDH5Y7EKh4zWAeBU2XLM4HPqXy+ptVuLfAFoY+vOU31JwNKxAzWCPBSZt1i4BtgD+GLmGZHbE/RzCb04R7gW0LflnsRuByrMbGvID0I7AZeLls3g/B9OX1l67KTelOdSPX2ye0m4t4K0kw3vAK8k6Bus3qX0OdRpQjWKOGbs7YCQwnqN4shYBvwPPV79vy0pbyZ4hDwGeHNbwHuIYwL0nxDQP5dIQzQvwcOEw5903kOvETL2Fhe7263RuZzhSbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm8T/aaPEMWSCgvwAAAABJRU5ErkJggg==", H7 = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    var o;
    const i = (o = t == null ? void 0 : t.length) != null ? o : 0;
    return /* @__PURE__ */ y(iC, H(M({ path: n }, r), { children: i > 0 ? t == null ? void 0 : t.map((a, l) => {
      var c;
      const s = nn(n, l), u = (c = Tg(a)) != null ? c : "unknown tab";
      return /* @__PURE__ */ y(nC, { title: u, children: /* @__PURE__ */ y(sr, { path: s, node: a }) }, ff(s));
    }) : /* @__PURE__ */ y("div", { style: { padding: "5px" }, children: /* @__PURE__ */ y("span", { children: "Empty tabset. Drag elements or Tab Panel on to add content" }) }) }));
  }, G7 = {
    title: "Tabset Panel",
    UiComponent: H7,
    settingsInfo: {
      id: {
        inputType: "string",
        label: "Id for tabset",
        defaultValue: "tabset-default-id",
        optional: !0
      },
      selected: {
        inputType: "dropdown",
        optional: !0,
        label: "Selected tab on load",
        defaultValue: (e) => e ? tC(e) : "First Tab",
        choices: (e) => e ? eC(e) : ["First Tab"]
      }
    },
    acceptsChildren: !0,
    iconSrc: lC,
    category: "Tabs",
    description: "A container filled with tabs"
  }, J7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGaklEQVR4nO3c309TZxzH8TeFUqzVwhgRMJtsdppFXcQZnWb+uDEzMdEsWUZmvNh0iRe7NfwBu+Ryyy5MHEvMEoNZ5sQsWUJmFJfhFhWzVZewZv6YozBFqEKhLbS7KNRWIaLy3TnFz+uKltOTh5M3z3k47aEkk8kgMtc8Tg9A5ieFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmChzegBTmtsitDSF8h+vAz4AtgCrgIBDQ3OrYeAKcA441tIUuuTweAq4csZqboscAS4Ch4CNKKrpBMgem0PAxclj5hqumbGmNLdFTgK7Sz0lbAoFWftygNpgOeVlrvwdcExyPE1fLMnlm8N0RWJMpDMHmtsiNS1NoT1Ojw2gJJPJOD0GIHsqBI4AB4ILyvhoax31lT6HR1UceocSfNUZJTY6DtDa0hQ64PSY3DQNNAIHSj0liuoJ1Vf62L+1jjJPCcD+5rZIo9NjclNYewHeWr5YUT2FukofG5cvnnq418mxgLvC2gLQuGzRnO3w0++u0dwWYSyVnrN9ulnesdvi5DjAXWGtA1hapdnqadU/OHY6FebxApRm1wnyFMoeHLtyJ8cB7gpL5hHXXceajdPhAX6K3GM4MZF7bkNDgC0rq1gyzcI/NpLi+G8DhKNxAFbX+XnnjepHth1LpfkxPMDZntis9iszK7oZ62hnLz9cGSyICuDX68McPtM77UL98JneXFQA4Wicw2d6icVTuedi8RRfdPxdEFX+fvO3lccrqhnrxu1RwtE4SxZ52be5tmAWOdqZjaf72j02ragseN3Ccg+711aztmExY6k0x7v6CEfjdPw+wHsbawE4eeE2/fdTrK7zs2d9DUG/F4Dvu29ztidWsK08XlGFtaxmQcEb1fleq/UTjsYZTU488r38CCu8HvasryF86gZXo6NAdrYKR+MEfKW8v6mWCu+DiXxXYw27GmsMfpr5rajCmtLVM8TPkRj992d3egou9BY+9ntZsshL//0U/UMJBkey+2l4wVcQlTy9ogtr6pT3rBaWPxqQ36eo5kpRhXX5+r0Z11hdPUOc6L4z632NJLOL/IpyD4xkn4snno8r9P+Hogrr7nD2lLU5FHymP//7hxL0308R8JXmFukA1+8mGEuldTqcA0V1BBeUlwLwZ1+84LLC6fAAHVcHZ3zd8a6+3OWCWDzFiQv/AvB2KPumbdDvZUNDgOHERMG2kP2rsLktwje/9M35zzOfFdWM1fjKYjquDhKOxgl/+9esXxeOxgmfulHw3KvVPjavrMo93rGmmhsDiWm3DfhK2bGm+tkG/5wpqhmrwuvh4PZ6Vtf5C57fuaqKdxtfnPF1O1dVFTze0BDgw21LC055Qb+XT3a8xLYVwUe2Pbi9vuCUKY/npk+QZoAZr1PJ7Ex+EpeWppCj7+a7acZKAUyk3RF6MUqO59adw06OA9wV1iWAfwYTTo+jaPXFklNfXnFyHOCusM4BXL7p+C9b0co7duecHAe4K6xjAOcjMaJDmrWeVHQoyflI7pMZx5wcC7grrEtA63g6Q2tnlF7FNWvRoQStnb2MZ9enrW64K9pNYTF5P1x7bHSczztu0d59h1t3E/mLUpmUHE9z626C9u47fNZxa+qewnY33FMI7rrckLvUMHm7uCsOUBH5sqUp9LHTg5jiqrAe8iawj+ytTK8D/oc3eM7FgT/ILtS/Jvu/LnKcvh7omrBkfnHVGkvmD4UlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaY+A/iJMS/OUnuYwAAAABJRU5ErkJggg==", Q7 = "_container_yicbr_1", K7 = {
    container: Q7
  }, q7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = "200px", r = "auto", i = M({}, e), [o, a] = K.useState(i.value);
    return K.useEffect(() => {
      a(i.value);
    }, [i.value]), /* @__PURE__ */ L(
      "div",
      H(M({
        className: nt(K7.container, "shiny::textInput"),
        style: { height: r, width: n }
      }, t), {
        children: [
          /* @__PURE__ */ y("label", { htmlFor: i.inputId, children: i.label }),
          /* @__PURE__ */ y(
            "input",
            {
              id: i.inputId,
              type: "text",
              value: o,
              onChange: (l) => a(l.target.value),
              placeholder: i.placeholder
            }
          )
        ]
      })
    );
  }, X7 = {
    title: "Text Input",
    UiComponent: q7,
    settingsInfo: {
      inputId: io("myTextInput"),
      label: oo("Text Input"),
      value: {
        inputType: "string",
        label: "Starting text",
        defaultValue: ""
      },
      placeholder: {
        inputType: "string",
        label: "Empty input placeholder",
        defaultValue: "placeholder text",
        optional: !0
      },
      width: {
        inputType: "cssMeasure",
        label: "Width",
        defaultValue: "100%",
        units: ["%", "px", "rem"],
        optional: !0
      }
    },
    serverBindings: {
      inputs: {
        inputIdKey: "inputId"
      }
    },
    acceptsChildren: !1,
    iconSrc: J7,
    category: "Inputs",
    description: "Create an input control for entry of unstructured text values."
  }, Z7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGh0lEQVR4nO3bv2skZQDG8W/8haBNIhbaqHu72Jv0olyw1CbZRfTsktJqk4CNgkVuF+wviIKNm2xz14kJ+AecsROUDWkE7W4LrQ4lFvNOMjOZ/ZXdJ/tGnw8cuezOvTNcvsw78+5k4ezsDLNZe2LeB2D/TQ7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbx1LwPIGthYWGm4zU7vXvARvj2qN2orc50BwVnZ2cjt9naP1EeQqlWvXrt+4wqLCv1CvBR+PuXwO9zPJaxOay4vQw8BF4M338MrAI/ze2IxuRrrLi9x0VUAEvAEfDGXI5mAg4rbn+XvLbIDYjLYcXtW+CXktejj8thxe1P4G3g15L3oo4r6ov3Zqd3G1gGtkn+I7NOgT2SZYTjCcfdJlmGqGRe3gO67UbtaIIxloG19LWwlLAHHLfq1b1JjmmIP4C3gB+A1wvvpXHdJrIL+oVx1l6uS7qO1ez0FoEDkv+wcey1G7XN4ovFdSxgJ4xbKW6b0W03auuD3gyxH3A59KJjYLNVr+ain2Id6yXK4wLoMySueaxjxToVHjJ+VAAbzU5vd8Q2lTDusKgA1pqd3kHZG81ObyOMMSoqSM5mh1v7J6P2N670zHUjpsXowspMMakjYL3dqC1k/wCbJGeF1HY40w1S4SKIu8CtzFjrJFNrai1ElD2uCnCvMGZxnFvhtdRiyb+Zxo2JK7qwyFyzED6GaTdq3eJG7UZtj2SxMGvUWe4UWGk3ajvtRu08pDD+Cvm4tgv/thjIanGcVr162qpXd0hCPT+mrf2TZWbnRsQVY1jZH8LQC+B2o9Ynf9YaNu30SWIovdAPY+1kx2p2estwfrbKRrsz7CK/Va92w/5Sk0zr44g+rujuCsOUMon+6E0AOM6eXQbsu9vs9PpcTJm3ScJdK2w68o6vVa8ujXlcVxX13WJ0YRU1O701kjNRhYs7vEFmcaF8zMUZJh0ve+12HM5u03ie5APld4FnpxxrkEXge+BN4GfRPgaKNqxwET/qTk8he1ZbLHyF/NR7VZ8C9RmMM8oLwBfAO9ewr5zowgrXMwfkr7XmJQ1qVksGqZUZjzfMa9e4r3PRhUVy95WNKl1hPy27O2x2epOueU3itPB1Vh6STFHX4cE17ScnqrDCqnY2krvtRm1n0PYi2aj7ha/F96/qM5KV9HXg6RmMN8gD4BPh+APFttyQO1Ndd1RhgTU77aXXU7mwRizEjuMv4APgGWBhij93gH8G7OMBSbiPpzzWK4nqjEX+hzru9DPtDzlrrTBeulbVJX8jsUF+hf2Srf2TR5mxdlr16tDtr+BD4GvgyZL35hoVxHfGmujMED7TG3dquh3uNAeNVSEfTzddVgjrX9kF0d0wbZfa2j8ZFOisRB0VxBdW9gewCByWfGa33Oz0tpud3iMuL1yOstvs9A6LgYV9/Eg+huI0XHx64rDZ6e2GIAHY2j+pbO2f7JLc1aaOik84TCn6qCDCx2bCWWjSYFK5x2cKj81MYjN8FpkTApzkQ+U+sNKqV8+n9Sl//esO8BUTRuXHZhKbjD917E2w7bjXbOtlUUHug+9xVt6PgdVsVFO6UlTzEl1Y7UatH36xdJ3kormoSzJNLZU93DfEafgccofLMaYfQC+VrZUVju+o3agthe3Ltt0jecBvZYZT4LCo7hNZVBDZVPh/cIWp8H3gGwZHVWdEVJ4Kreg5kjPglaOaF4cVt1dJ4iq6T8RRgcOKXQ/4rfDafSKPChxW7B6TPPLyHckzVZ9zA6ICX7ybiM9YJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJP4F7bdmR9UysBAAAAAAElFTkSuQmCC", e9 = "_container_1i6yi_1", t9 = {
    container: e9
  }, n9 = ({
    uiArguments: e,
    wrapperProps: t
  }) => /* @__PURE__ */ L("div", H(M({ className: t9.container }, t), { children: [
    "Dynamic text from ",
    /* @__PURE__ */ L("code", { children: [
      "output$",
      e.outputId
    ] })
  ] })), r9 = {
    title: "Text Output",
    UiComponent: n9,
    settingsInfo: {
      outputId: {
        label: "Output ID",
        inputType: "string",
        defaultValue: "textOutput"
      }
    },
    serverBindings: {
      outputs: {
        outputIdKey: "outputId",
        renderScaffold: `renderText({
  "Hello, World"
})`
      }
    },
    acceptsChildren: !1,
    iconSrc: Z7,
    category: "Outputs",
    description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `
  }, i9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFGElEQVR4nO3cW4iUZRzH8e9o2ZGkpKOUFylBURCUnQuLki4qtBPd1E0lkVERGh1vogIvKugiwou6S8sIKoQwKwmjugnEICLIIMospL3oIFHTxTNLtuge9P3NM/PO9wPLLLPv7P5398v7vjP7vNvpdrtITZtVewC1k2EpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDqk9QFNWr/9m/N0LgXuAi4D5wJG1ZprCHmAn8BmwFngfYM2tC2vO1Ji27bEeBrYCtwOLGNyoAA4DFgC3AJuANXXHaVabwroCeJbyPf0A3A2cStkrdwbsbRZwEnAb8HVv/lXA1c3+SOppU1j3UX5p3wLnUg4v3wN/1xxqP7rAT8A6YDHwVe/+FdUmalibwrqkd/sksKvmIDM0BjzRe//imoM0qU1hndi73VR1igOzpXc7r+oUDWrNs0LKYRDKIaa2DnA9cB0llh3AeuDT/Wz/c+92TnyyPmlTWINiHvAWcNmE+x8AXgbuZTDP+xrVpkPhIOhQ9kwToxq3Aniqf+PUY1jNuha4aoptHgJO6cMsVRlWs5ZOY5s5wJXpQWozrGYd1/B2Q8uwmvXdNLfbkRxiEBhWs9YB/0yxzS5gcx9mqcqwmrUdeH6Sj3eBlcBv/RmnHsNq3irgceCPCff/CNwMvNH3iSrwBdLmdYGngZeAJZQT9R3Ax8Cf9cbqL8PK2Q28WXuIWgyrOJnyqvj5wF/AB5RlNxMPZ5omw4LlwCvAMXvddwPlJHsZ8GWNoYbdqJ+8Pwhs4P9RjVtEOS+6vK8TtcSohtUBnuu9dSbZ7ljgPeDGfgzVJqMY1hzgNcreajoOp6xYWBmbqIVG7RxrLmWt1JIZPm428CJlVcJjlJcUJjMLuImy0uF3Ssifz/BrDrVRCms+sBE45yA+xyOUuO6iPHvcl+MpLzPsvSbrfsrlXY8y9Z98WmFUDoVnAp9wcFGNuwN4Bzh6Hx9bQDnhn7jQr0O55nEDcEQDMwy8UQjrUsov+7QGP+dS4EP+u4ADSrxbgTMmedwy4CPKNYWt1vawllOu2kmsfzqPEtJC4AJKvPOn8bjFlIsqzgrMNDDaHNZK4HXKs7qU0ylxbWZm8S7oPe6axFCDoI1hdYBnKM/iZvfh650AHHUAj5sLvAvc2ew4g6GNzwpfpfxTkGFwKOVvkotqD9K0Nu6xhiWqva2uPUDT2hjWMGvNa1xtCmus9gAN+LX2AE1pU1jbag/QgO21B2hKm8J6u/YADdhYe4CmtCmstUz/ur5B9Avle2iFNoU1RvmTyc7agxyAMcpqiN21B2lKm8IC+AI4m3KVzDYGe836Hsr/H32BMvOWSbceMp1ud6qlRdLMtW2PpQFhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUsS/YEGHz1NNdrMAAAAASUVORK5CYII=", o9 = "_container_1xnzo_1", a9 = {
    container: o9
  }, l9 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const { outputId: n = "shiny-ui-output" } = e;
    return /* @__PURE__ */ y("div", H(M({ className: a9.container }, t), { children: /* @__PURE__ */ L("div", { style: { gridArea: "1/1", placeSelf: "center" }, children: [
      "This is a a dynamic UI Output ",
      n,
      "!"
    ] }) }));
  }, s9 = {
    title: "Dynamic UI Output",
    UiComponent: l9,
    settingsInfo: {
      outputId: {
        label: "Output ID",
        inputType: "string",
        defaultValue: "dynamicUiOutput"
      }
    },
    serverBindings: {
      outputs: {
        outputIdKey: "outputId",
        renderScaffold: `renderUI({
  h1("Hello, World")
})`
      }
    },
    acceptsChildren: !1,
    iconSrc: i9,
    category: "Outputs",
    description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `
  };
  function u9(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attr: { d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z" } }] })(e);
  }
  function c9(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M881.7 187.4l-45.1-45.1a8.03 8.03 0 0 0-11.3 0L667.8 299.9l-54.7-54.7a7.94 7.94 0 0 0-13.5 4.7L576.1 439c-.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-.8 9.3-8.8 4.7-13.5l-54.7-54.7 157.6-157.6c3-3 3-8.1-.1-11.2zM439 576.1l-189.2 23.5c-6.6.8-9.3 8.9-4.7 13.5l54.7 54.7-157.5 157.5a8.03 8.03 0 0 0 0 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l157.6-157.6 54.7 54.7a7.94 7.94 0 0 0 13.5-4.7L447.9 585a7.9 7.9 0 0 0-8.9-8.9z" } }] })(e);
  }
  const f9 = "_categoryDivider_bdwku_1", d9 = {
    categoryDivider: f9
  };
  function p9({ children: e }) {
    return /* @__PURE__ */ y("div", { className: d9.categoryDivider, children: e });
  }
  function h9(e) {
    return e.replaceAll(/\(/g, `(
  `).replaceAll(/\)/g, `
)`).replaceAll(/\(\s+\)/g, "()").replaceAll(/,/g, `,
 `).replaceAll(/(\s+)$/g, "");
  }
  const m9 = 20, g9 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.text.slice(0, m9).replaceAll(/\s$/g, "") + "...";
    return /* @__PURE__ */ y("div", H(M({ className: "unknown-ui-function-display" }, t), { children: /* @__PURE__ */ L("div", { children: [
      "unknown ui output: ",
      /* @__PURE__ */ y("code", { children: n })
    ] }) }));
  }, v9 = {
    title: "Unknown UI Function",
    UiComponent: g9,
    settingsInfo: {
      text: {
        inputType: "omitted",
        defaultValue: "Unknown Ui Function"
      }
    },
    settingsFormRender: ({ settings: e }) => /* @__PURE__ */ L("div", { className: "unknown-ui-function-settings", children: [
      /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ L("span", { className: "info-msg", children: [
        /* @__PURE__ */ y(u9, {}),
        "Unknown function call. Can't modify with visual editor."
      ] }) }),
      /* @__PURE__ */ y(p9, { children: /* @__PURE__ */ y("span", { children: "Code" }) }),
      /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ y("pre", { className: "code-holder", children: h9(e.text) }) })
    ] }),
    acceptsChildren: !1
  }, rn = {
    "shiny::actionButton": N8,
    "shiny::numericInput": k7,
    "shiny::sliderInput": Y7,
    "shiny::textInput": X7,
    "shiny::checkboxInput": W8,
    "shiny::checkboxGroupInput": F8,
    "shiny::selectInput": F7,
    "shiny::radioButtons": N7,
    "shiny::plotOutput": O7,
    "shiny::textOutput": r9,
    "shiny::uiOutput": s9,
    "shiny::navbarPage": S7,
    "shiny::tabPanel": $7,
    "shiny::tabsetPanel": G7,
    "gridlayout::grid_page": S8,
    "gridlayout::grid_card": X4,
    "gridlayout::grid_card_panel": H4,
    "gridlayout::grid_card_text": d3,
    "gridlayout::grid_card_plot": l3,
    "gridlayout::grid_container": w8,
    "DT::DTOutput": _4,
    "bslib::card": v4,
    "bslib::card_body": f4,
    "bslib::card_header": g4,
    "bslib::card_footer": p4,
    "plotly::plotlyOutput": _8,
    unknownUiFunction: v9
  };
  function y9(e, { path: t, node: n }) {
    const r = _E(t), i = t[t.length - 1], o = bi(e, r);
    if (!rn[o.uiName].acceptsChildren)
      throw new Error(
        "Can't add a child to a non-container node. Check the path"
      );
    Array.isArray(o.uiChildren) || (o.uiChildren = []), o.uiChildren = Xo(
      o.uiChildren,
      i,
      n
    );
  }
  function sC(e, { path: t }) {
    const { parentNode: n, indexToNode: r } = w9(e, t);
    if (!lg(n))
      throw new Error("Somehow trying to enter a leaf node");
    n.uiChildren.splice(r, 1);
  }
  function w9(e, t) {
    const n = [...t], r = n.pop();
    if (typeof r == "undefined")
      throw new Error("Path to node must have at least one element");
    const i = n.length === 0 ? e : bi(e, n);
    if (!lg(i))
      throw new Error("Somehow trying to enter a leaf node");
    return { parentNode: i, indexToNode: r };
  }
  function b9(e, { path: t, currentPath: n, node: r }) {
    const i = _E(t), o = t[t.length - 1], a = bi(e, i);
    if (!rn[a.uiName].acceptsChildren)
      throw new Error(
        "Can't add a child to a non-container node. Check the path"
      );
    Array.isArray(a.uiChildren) || (a.uiChildren = []);
    const l = [...i, o];
    if (tg(n, l)) {
      const s = n[n.length - 1];
      a.uiChildren = b4(
        a.uiChildren,
        s,
        o
      );
      return;
    }
    sC(e, { path: n }), a.uiChildren = Xo(
      a.uiChildren,
      o,
      r
    );
  }
  function uC(e) {
    return "currentPath" in e && e.currentPath !== void 0;
  }
  function S9(e, t) {
    const { path: n, node: r } = t;
    if (uC(t)) {
      b9(e, { path: n, currentPath: t.currentPath, node: r });
      return;
    }
    y9(e, { path: n, node: r });
  }
  function E9(e, { path: t, node: n }) {
    const r = bi(e, t);
    Object.assign(r, n);
  }
  const lr = {
    ui: "<UI>",
    libraries: "<LIBRARIES>"
  }, A9 = /^\w+::/;
  function C9(e) {
    if (A9.test(e))
      return e;
    const t = new RegExp(`^\\w+::${e}$`);
    for (const n in rn)
      if (t.test(n))
        return n;
    throw new Error(
      `Unknown function ${e} made it passed the unknown function filter`
    );
  }
  function cC(e) {
    return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
  }
  function x9(e) {
    return ys(e) && "val" in e && ["string", "boolean", "number"].includes(typeof e.val);
  }
  function ur(e) {
    return ys(e) && "val" in e && Array.isArray(e.val);
  }
  function k9(e) {
    return ys(e) && "name" in e;
  }
  class Rt extends Error {
    constructor({ message: t, cause: n }) {
      super(), this.name = "AST_PARSING_ERROR", this.message = t, this.cause = n;
    }
  }
  function _9(e) {
    return e[0].val === "c";
  }
  function O9(e) {
    const t = e[0].val;
    return t === "c" || t === "list";
  }
  function I9(e) {
    return ur(e) && _9(e.val);
  }
  function T9(e) {
    return ur(e) && e.val[0].val === "list";
  }
  function P9(e) {
    try {
      return fC(e);
    } catch (t) {
      if (!(t instanceof Rt))
        throw t;
      return Rf({ node: e, explanation: t.message });
    }
  }
  function fC(e) {
    if (!ur(e))
      throw new Rt({
        message: "Tried to flatten a leaf/primative node"
      });
    const [t, ...n] = e.val;
    if (t.val !== "c")
      throw new Rt({
        message: "Tried to flatten non array as array"
      });
    return n.map(
      (r) => cC(r.val) ? r.val : fC(r)
    );
  }
  function N9(e) {
    if (!ur(e))
      throw new Rt({
        message: "Tried to flatten a leaf/primative node"
      });
    try {
      const [t, ...n] = e.val;
      if (t.val !== "list")
        throw new Rt({
          message: "Tried to flatten non array as array",
          cause: e
        });
      let r = {};
      return n.forEach(({ name: i, val: o }) => {
        if (typeof i != "string")
          throw new Rt({
            message: "All elements in list must have a name",
            cause: e
          });
        if (!cC(o))
          throw new Rt({
            message: "Nested lists are not supported",
            cause: e
          });
        r[i] = o;
      }), r;
    } catch (t) {
      if (!(t instanceof Rt))
        throw t;
      return Rf({ node: e, explanation: t.message });
    }
  }
  function D9(e, t) {
    const n = " ".repeat(t);
    return e.replaceAll(/\n/g, `
${n}`);
  }
  const dC = 2, R9 = " ".repeat(dC), Ng = 60, mi = `
${R9}`;
  function pC(e) {
    const [t, ...n] = e;
    if (typeof t.val != "string")
      return "Unknown Ui Code";
    const r = n.map(
      (a) => `${a.name ? `${a.name} = ` : ""}${L9(a)}`
    ), i = hC({
      fn_name: t.val,
      fn_args_list: r,
      max_line_length_for_multi_args: O9(e) ? Ng : 0
    }), o = `,${i ? mi : " "}`;
    return `${t.val}(${i ? mi : ""}${r.join(o)}${i ? `
` : ""})`;
  }
  function hC({
    fn_name: e,
    fn_args_list: t,
    max_line_length_for_multi_args: n
  }) {
    if (t.some(
      (a) => a.includes(`
`)
    ))
      return !0;
    if (n === 0)
      return t.length > 1;
    const i = t.reduce(
      //Add two to account for length of comma and space separating elements
      (a, l) => a + l.length + 2,
      0
    ), o = e.length + 2;
    return i + o > n;
  }
  function L9({ val: e, type: t }) {
    switch (t) {
      case "b":
        return e ? "TRUE" : "FALSE";
      case "c":
        return `"${e}"`;
      case "m":
        return "";
      case "n":
        return String(e);
      case "s":
        return e;
      case "e":
        return Gl(pC(e));
      case "u":
        return "<...>";
    }
  }
  function Gl(e) {
    return D9(e, dC);
  }
  function Rf({
    node: e,
    explanation: t
  }) {
    return {
      uiName: "unknownUiFunction",
      uiArguments: {
        text: ur(e) ? pC(e.val) : e.val,
        explanation: t
      }
    };
  }
  function Dg(e) {
    const [t, ...n] = e.val;
    if (typeof t.val != "string")
      throw new Rt({
        message: "Invalid ui node, name is not a primative"
      });
    let r = {}, i = [];
    n.forEach((a) => {
      k9(a) ? r[a.name] = M9(a) : i.push(F9(a));
    });
    const o = {
      uiName: C9(t.val),
      uiArguments: r
    };
    return i.length > 0 && (o.uiChildren = i), Pg(o) ? o : Rf({ node: e });
  }
  function M9(e) {
    return x9(e) ? e.val : I9(e) ? P9(e) : T9(e) ? N9(e) : Rf({ node: e });
  }
  function F9(e, t) {
    if (!ur(e))
      throw new Rt({
        message: "Primative found in ui children of ui node."
      });
    return Dg(e);
  }
  function B9(e, t) {
    if (!ur(e))
      return !1;
    const { val: n } = e;
    return n[0].val === "<-" || n[0].val === "=" ? t ? n[1].val === t : !0 : !1;
  }
  function mC(e) {
    return e.val[1];
  }
  function U9(e) {
    return e.val[2];
  }
  function yc(e) {
    let t = [];
    return e.forEach((n) => {
      if (B9(n)) {
        const r = mC(n);
        z9(r) ? t.push({
          name: r.val[2].val,
          is_output: !0,
          node: n
        }) : r.type === "s" && t.push({
          name: r.val,
          is_output: !1,
          node: n
        });
      }
      if (ur(n)) {
        const r = yc(n.val);
        t.push(...r);
      }
    }), t;
  }
  function z9(e) {
    if (!ur(e))
      return !1;
    const { val: t } = e;
    return t.length === 3 && t[1].val === "output" && typeof t[2].val == "string";
  }
  function gC(e) {
    return e.filter(({ is_output: t }) => t).reduce((t, { name: n, node: r }) => {
      var o;
      const { pos: i } = r;
      return i && (t[n] = [...(o = t[n]) != null ? o : [], i]), t;
    }, {});
  }
  function j9(e) {
    return !Boolean(e.pos) || !(mC(e).val === "ui") ? !1 : ur(U9(e));
  }
  function vC(e) {
    const t = e.find(
      ({ name: r, is_output: i }) => r === "ui" && !i
    );
    if (!t)
      throw new Rt({
        message: "No ui assignment node was found in provided ast"
      });
    const { node: n } = t;
    if (!j9(n))
      throw new Rt({
        message: "No position info attached to the ui assignment node",
        cause: n
      });
    return n;
  }
  function yC(e) {
    const t = e.find(
      ({ name: r, is_output: i }) => r === "server" && !i
    );
    if (!t)
      throw new Rt({
        message: "No server assignment node was found in provided ast"
      });
    const { node: n } = t;
    if (!n.pos)
      throw new Rt({
        message: "No position info attached to the ui assignment node",
        cause: n
      });
    return n;
  }
  function wC(e) {
    return e.app_type === "SINGLE-FILE" ? W9(e) : Y9(e);
  }
  function W9({
    app: { ast: e }
  }) {
    const t = yc(e), n = vC(t), r = yC(t), i = gC(t);
    return {
      app_type: "SINGLE-FILE",
      app: {
        ui_tree: Dg(n.val[2]),
        ui_pos: n.pos,
        ui_assignment_operator: n.val[0].val,
        server_pos: r.pos,
        server_node: r,
        output_positions: i
      }
    };
  }
  function Y9({
    ui: e,
    server: t
  }) {
    const n = yc(e.ast), r = vC(n), i = yc(t.ast), o = yC(i), a = gC(i);
    return {
      app_type: "MULTI-FILE",
      ui: {
        ui_tree: Dg(r.val[2]),
        ui_pos: r.pos,
        ui_assignment_operator: r.val[0].val
      },
      server: {
        server_node: o,
        output_positions: a,
        server_pos: o.pos
      }
    };
  }
  function bC(e) {
    return e.app_type === "SINGLE-FILE" ? V9(e) : H9(e);
  }
  function V9(e) {
    const t = wC(e), {
      app: {
        ui_pos: n,
        ui_assignment_operator: r,
        ui_tree: i,
        output_positions: o,
        server_pos: a
      }
    } = t, s = e.app.script.split(`
`);
    let u = ["shiny"], c = [], f;
    return s.forEach((d, p) => {
      var m, S;
      const h = SC({ line: d, line_number: p, ui_pos: n });
      if (h === "Other") {
        c.push(d);
        return;
      }
      if (h === "Library") {
        const g = (S = (m = Rg.exec(d)) == null ? void 0 : m.groups) == null ? void 0 : S.library;
        g && g !== "shiny" && u.push(g);
      }
      if (h !== f)
        if (f = h, h === "UI")
          c.push(
            `ui ${r} ${lr.ui}`
          );
        else if (h === "Library")
          c.push(lr.libraries);
        else
          throw new Error("Unknown line type");
    }), {
      app_type: "SINGLE-FILE",
      ui_tree: i,
      output_positions: o,
      server_pos: a,
      app: {
        code: c.join(`
`),
        libraries: u
      }
    };
  }
  function $9({ ui_pos: e, ui_assignment_operator: t }, n) {
    const r = n.split(`
`);
    let i = ["shiny"], o = [], a;
    return r.forEach((l, s) => {
      var c, f;
      const u = SC({ line: l, line_number: s, ui_pos: e });
      if (u === "Other") {
        o.push(l);
        return;
      }
      if (u === "Library") {
        const d = (f = (c = Rg.exec(l)) == null ? void 0 : c.groups) == null ? void 0 : f.library;
        d && d !== "shiny" && i.push(d);
      }
      if (u !== a)
        if (a = u, u === "UI")
          o.push(
            `ui ${t} ${lr.ui}`
          );
        else if (u === "Library")
          o.push(lr.libraries);
        else
          throw new Error("Unknown line type");
    }), { code: o.join(`
`), libraries: i };
  }
  function H9(e) {
    const {
      ui: t,
      server: { output_positions: n, server_pos: r }
    } = wC(e);
    return {
      app_type: "MULTI-FILE",
      ui_tree: t.ui_tree,
      output_positions: n,
      server_pos: r,
      ui: $9(t, e.ui.script),
      server: {
        code: e.server.script
      }
    };
  }
  function G9(e, [t, n, r, i]) {
    return e >= t - 1 && e <= r - 1;
  }
  function SC({
    line: e,
    line_number: t,
    ui_pos: n
  }) {
    return G9(t, n) ? "UI" : Rg.test(e) ? "Library" : "Other";
  }
  const Rg = new RegExp("^\\s*library\\((?<library>\\w+)\\)");
  function EC(e) {
    var n;
    const t = /* @__PURE__ */ new Set();
    try {
      for (const r of Object.values(rn)) {
        const i = (n = r == null ? void 0 : r.stateUpdateSubscribers) == null ? void 0 : n[e];
        i && t.add(i);
      }
      return t;
    } catch (r) {
      return t;
    }
  }
  const J9 = EC("DELETE_NODE"), Q9 = EC("UPDATE_NODE"), AC = uf({
    name: "state",
    initialState: {
      mode: "LOADING"
    },
    reducers: {
      // This is used to teleport to a given state wholesale. E.g. undo-redo
      SET_FULL_STATE: (e, t) => t.payload.state,
      // This will initialize a state while also making sure the arguments match
      // what we expect in the app
      SET_APP_INFO: (e, t) => {
        const n = "ui_tree" in t.payload ? t.payload : bC(t.payload);
        return M({ mode: "MAIN" }, n);
      },
      SHOW_TEMPLATE_CHOOSER: (e, { payload: t }) => ({ mode: "TEMPLATE_CHOOSER", options: t }),
      SET_LOADING: (e) => ({ mode: "LOADING" }),
      UPDATE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to update a node when in template chooser mode");
        for (const n of Q9)
          n(e.ui_tree, t.payload);
        E9(e.ui_tree, t.payload);
      },
      PLACE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to move a node when in template chooser mode");
        S9(e.ui_tree, t.payload);
      },
      DELETE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to delete a node when in template chooser mode");
        for (const n of J9)
          n(e.ui_tree, { path: t.payload.path });
        sC(e.ui_tree, t.payload);
      }
    }
  }), {
    UPDATE_NODE: CC,
    PLACE_NODE: xC,
    DELETE_NODE: kC,
    SET_APP_INFO: K9,
    SET_FULL_STATE: _C,
    SHOW_TEMPLATE_CHOOSER: q9,
    SET_LOADING: Dz
  } = AC.actions;
  function OC() {
    return ls((e) => e.app_info);
  }
  const X9 = AC.reducer;
  function IC(e) {
    const t = Dr();
    return K.useCallback(() => {
      e !== null && t(kC({ path: e }));
    }, [t, e]);
  }
  class Z9 {
    constructor({
      comparisonFn: t
    }) {
      this.stack = [], this.stepsBack = 0, this.lastRequested = null, this.isSameFn = t;
    }
    isEntryFromHistory(t) {
      return this.lastRequested ? this.isSameFn(t, this.lastRequested) : !1;
    }
    lastEntry() {
      return this.stack[this.stack.length - 1];
    }
    isDuplicateOfLastEntry(t) {
      return this.isSameFn(t, this.lastEntry());
    }
    startNewHistoryBranch() {
      this.stack = this.stack.slice(0, -this.stepsBack), this.stepsBack = 0;
    }
    addEntry(t) {
      this.isEntryFromHistory(t) || this.isDuplicateOfLastEntry(t) || (this.stepsBack > 0 && this.startNewHistoryBranch(), this.stack = [...this.stack, t]);
    }
    canGoBackwards() {
      return this.stack.length === 1 ? !1 : this.stack.length - this.stepsBack > 1;
    }
    canGoForwards() {
      return this.stepsBack > 0;
    }
    getEntryFromHistory(t) {
      this.stepsBack -= t;
      const n = this.stack.length, r = n - this.stepsBack - 1;
      if (r < 0)
        throw new Error("Requested history entry too far backwards.");
      if (r > n)
        throw new Error(
          `Not enough entries in history to go ${t} steps forward`
        );
      return this.lastRequested = this.stack[r], this.lastRequested;
    }
    goBackwards() {
      if (!this.canGoBackwards())
        throw new Error("Can't go backwards. At first entry in history");
      return this.getEntryFromHistory(-1);
    }
    goForwards() {
      if (!this.canGoForwards())
        throw new Error("Can't go forwards. At latest entry in history");
      return this.getEntryFromHistory(1);
    }
  }
  function eB(e) {
    const t = Dr(), [n, r] = _.useState(!1), [i, o] = _.useState(!1), a = _.useRef(
      new Z9({ comparisonFn: tB })
    );
    _.useEffect(() => {
      if (!e || e.mode === "LOADING")
        return;
      const c = a.current;
      c.addEntry(e), o(c.canGoBackwards()), r(c.canGoForwards());
    }, [e]);
    const l = _.useCallback(
      (c) => {
        t(_C({ state: c }));
      },
      [t]
    ), s = _.useCallback(() => {
      try {
        l(a.current.goBackwards());
      } catch (c) {
      }
    }, [l]), u = _.useCallback(() => {
      try {
        l(a.current.goForwards());
      } catch (c) {
      }
    }, [l]);
    return {
      goBackward: s,
      goForward: u,
      canGoBackward: i,
      canGoForward: n
    };
  }
  function tB(e, t) {
    return typeof t == "undefined" ? !1 : t.mode === "LOADING" && e.mode === "LOADING" ? !0 : t.mode === "TEMPLATE_CHOOSER" && e.mode === "TEMPLATE_CHOOSER" ? JSON.stringify(t.options) === JSON.stringify(e.options) : e.mode === "MAIN" && t.mode === "MAIN" ? t.ui_tree === e.ui_tree : !1;
  }
  function TC(e, t) {
    const { ui_code: n, removed_namespaces: r } = PC(
      e,
      t
    );
    return { ui_code: n, library_calls: Array.from(r) };
  }
  function PC(e, t) {
    var c;
    const { uiName: n, uiArguments: r, uiChildren: i } = e, o = /* @__PURE__ */ new Set();
    if (NC(e))
      return {
        ui_code: DC(e),
        removed_namespaces: o
      };
    let a = n;
    if (t.remove_namespace) {
      const f = (c = a.match(/\w+(?=::)/)) == null ? void 0 : c[0];
      f && o.add(f), a = a.replace(/\w+::/, "");
    }
    const l = Object.keys(r).map(
      (f) => Gl(
        `${f} = ${aB(r[f])}`
      )
    );
    i == null || i.forEach((f) => {
      const d = PC(f, t);
      d.removed_namespaces.forEach(
        (p) => o.add(p)
      ), l.push(Gl(d.ui_code));
    });
    const s = hC({
      fn_name: n,
      fn_args_list: l,
      max_line_length_for_multi_args: Ng
    }), u = `,${s ? mi : " "}`;
    return {
      removed_namespaces: o,
      ui_code: `${a}(${s ? mi : ""}${l.join(u)}${s ? `
` : ""})`
    };
  }
  function NC(e) {
    return ys(e) && "uiName" in e && e.uiName === "unknownUiFunction";
  }
  function DC({
    uiArguments: e
  }) {
    return e.text;
  }
  function nB(e) {
    return !(typeof e != "object" || Object.values(e).find(
      (n) => typeof n != "string"
    ));
  }
  function rB(e) {
    const t = Object.keys(e).map((o) => `"${o}" = "${e[o]}"`), r = t.reduce((o, a) => o + a.length, 0) + 6 > Ng, i = r ? `,${mi}` : ", ";
    return `list(${r ? mi : ""}${t.join(i)}${r ? `
` : ""})`;
  }
  function iB(e) {
    const t = e.map(oB);
    return `c(${mi}${t.join(`,${mi}`)}
)`;
  }
  function oB(e) {
    switch (typeof e) {
      case "string":
        return `"${e}"`;
      default:
        return String(e);
    }
  }
  function aB(e) {
    return Array.isArray(e) ? iB(e) : nB(e) ? rB(e) : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : NC(e) ? DC(e) : JSON.stringify(e);
  }
  function _0({
    ui_tree: e,
    libraries: t,
    code: n
  }) {
    const { ui_code: r, library_calls: i } = TC(e, {
      remove_namespace: !0
    }), o = [...t];
    return i.forEach((a) => {
      t.includes(a) || o.push(a);
    }), n.replace(lr.ui, r).replace(lr.libraries, RC(o));
  }
  function RC(e) {
    return e.map((t) => `library(${t})`).join(`
`);
  }
  function Lg(e, { include_info: t }) {
    const { app_type: n, ui_tree: r } = e;
    switch (n) {
      case "SINGLE-FILE":
        return M({
          app_type: n,
          app: _0(M({ ui_tree: r }, e.app))
        }, t && { info: e });
      case "MULTI-FILE":
        return M({
          app_type: n,
          ui: _0(M({ ui_tree: r }, e.ui)),
          server: e.server.code
        }, t && { info: e });
    }
  }
  function LC(e, t) {
    const n = e.length;
    let r = [];
    for (let i = 0; i <= n; i++) {
      const o = bi(t, e.slice(0, i));
      if (o === void 0)
        break;
      r.push(rn[o.uiName].title);
    }
    return r;
  }
  function MC() {
    return /mac/i.test(window.navigator.platform);
  }
  function lB(e) {
    const t = K.useCallback(
      (n) => {
        !(n.target instanceof Element) || n.target.tagName !== "BODY" || (e.filter((r) => sB(n, r)).forEach(({ onPress: r }) => r()), n.defaultPrevented || n.stopPropagation());
      },
      [e]
    );
    K.useEffect(() => (document.addEventListener("keydown", t), () => {
      document.removeEventListener("keydown", t);
    }), [t]);
  }
  function sB(e, t) {
    return e.key === t.key && t.withCmdCtrl === (MC() ? e.metaKey : e.ctrlKey) && t.withShift === e.shiftKey;
  }
  function uB() {
    const { sendMsg: e, incomingMsgs: t, mode: n } = Zl(), r = OC(), i = fs(), o = Dr(), a = eB(r), l = IC(i), [s, u] = K.useState(null), c = K.useRef(null);
    lB([
      {
        key: "z",
        withCmdCtrl: !0,
        withShift: !1,
        onPress: a.goBackward
      },
      {
        key: "z",
        withCmdCtrl: !0,
        withShift: !0,
        onPress: a.goForward
      },
      {
        key: "Backspace",
        onPress: l,
        withCmdCtrl: !1,
        withShift: !1
      }
    ]), K.useEffect(() => {
      const d = t.subscribe("APP-INFO", (m) => {
        const S = "ui_tree" in m ? m : bC(m);
        o(K9(S)), c.current = M({ mode: "MAIN" }, S), console.log("Full app info", S);
      }), p = t.subscribe(
        "TEMPLATE_CHOOSER",
        (m) => {
          o(q9({ outputChoices: m })), c.current = {
            mode: "TEMPLATE_CHOOSER",
            options: { outputChoices: m }
          };
        }
      ), h = t.subscribe(
        "BACKEND-ERROR",
        u
      );
      return e({ path: "READY-FOR-STATE" }), () => {
        d.unsubscribe(), p.unsubscribe(), h.unsubscribe();
      };
    }, [t, o, e]);
    const f = K.useMemo(
      () => NS(e, 500, !0),
      [e]
    );
    return K.useEffect(() => {
      if (n !== "VSCODE" || !i || r.mode !== "MAIN")
        return;
      const d = LC(i, r.ui_tree);
      e({ path: "NODE-SELECTION", payload: d });
    }, [i, n, e, r]), K.useEffect(() => {
      if (!(r.mode === "LOADING" || r === c.current)) {
        if (r.mode === "TEMPLATE_CHOOSER") {
          e({ path: "ENTERED-TEMPLATE-SELECTOR" });
          return;
        }
        f({
          path: "UPDATED-APP",
          payload: Lg(r, { include_info: !1 })
        });
      }
    }, [r, f, e]), {
      state: r,
      errorInfo: s,
      history: a
    };
  }
  function FC(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 16 16", fill: "currentColor" }, child: [{ tag: "path", attr: { fillRule: "evenodd", clipRule: "evenodd", d: "M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z" } }] })(e);
  }
  const cB = "_appViewerHolder_zkojo_1", fB = "_title_zkojo_55", dB = "_appContainer_zkojo_89", pB = "_previewFrame_zkojo_109", hB = "_expandButton_zkojo_134", mB = "_reloadButtonContainer_zkojo_135", gB = "_reloadButton_zkojo_135", vB = "_spin_zkojo_174", yB = "_restartButton_zkojo_211", wB = "_loadingMessage_zkojo_238", bB = "_error_zkojo_249", Gt = {
    appViewerHolder: cB,
    title: fB,
    appContainer: dB,
    previewFrame: pB,
    expandButton: hB,
    reloadButtonContainer: mB,
    reloadButton: gB,
    spin: vB,
    restartButton: yB,
    loadingMessage: wB,
    error: bB
  };
  function SB(e) {
    return It({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
  }
  function EB(e) {
    return It({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" } }] })(e);
  }
  function AB(e) {
    return It({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "circle", attr: { cx: "8", cy: "8", r: "8" } }] })(e);
  }
  function CB(e) {
    return It({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", stroke: "#000", strokeWidth: "2", d: "M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M5,5 L19,19" } }] })(e);
  }
  const xB = "_logs_xjp5l_2", kB = "_logsContents_xjp5l_25", _B = "_expandTab_xjp5l_29", OB = "_clearLogsButton_xjp5l_69", IB = "_logLine_xjp5l_75", TB = "_noLogsMsg_xjp5l_81", PB = "_expandedLogs_xjp5l_93", NB = "_expandLogsButton_xjp5l_101", DB = "_unseenLogsNotification_xjp5l_108", RB = "_slidein_xjp5l_1", Oi = {
    logs: xB,
    logsContents: kB,
    expandTab: _B,
    clearLogsButton: OB,
    logLine: IB,
    noLogsMsg: TB,
    expandedLogs: PB,
    expandLogsButton: NB,
    unseenLogsNotification: DB,
    slidein: RB
  };
  function LB({
    appLogs: e,
    clearLogs: t
  }) {
    const { logsExpanded: n, toggleLogExpansion: r, unseenLogs: i } = MB(e), o = e.length === 0;
    return /* @__PURE__ */ L("div", { className: Oi.logs, "data-expanded": n, children: [
      /* @__PURE__ */ L(
        "button",
        {
          className: Oi.expandTab,
          title: n ? "hide logs" : "show logs",
          onClick: r,
          children: [
            /* @__PURE__ */ y(
              AB,
              {
                className: Oi.unseenLogsNotification,
                "data-show": i
              }
            ),
            "App Logs",
            n ? /* @__PURE__ */ y(SB, {}) : /* @__PURE__ */ y(EB, {})
          ]
        }
      ),
      /* @__PURE__ */ L("div", { className: Oi.logsContents, children: [
        o ? /* @__PURE__ */ y("p", { className: Oi.noLogsMsg, children: "No recent logs" }) : e.map((a, l) => /* @__PURE__ */ y("p", { className: Oi.logLine, children: a }, l)),
        o ? null : /* @__PURE__ */ y(
          ht,
          {
            variant: "icon",
            title: "clear logs",
            className: Oi.clearLogsButton,
            onClick: t,
            children: /* @__PURE__ */ y(CB, {})
          }
        )
      ] })
    ] });
  }
  function MB(e) {
    const [t, n] = _.useState(!1), [r, i] = _.useState(!1), [o, a] = _.useState(
      null
    ), [l, s] = _.useState(
      new Date()
    ), u = _.useCallback(() => {
      if (t) {
        n(!1), a(new Date());
        return;
      }
      n(!0), i(!1);
    }, [t]);
    return _.useEffect(() => {
      s(new Date());
    }, [e]), _.useEffect(() => {
      if (t || e.length === 0) {
        i(!1);
        return;
      }
      if (o === null || o < l) {
        i(!0);
        return;
      }
    }, [e.length, t, o, l]), { logsExpanded: t, toggleLogExpansion: u, unseenLogs: r };
  }
  function Fh(r) {
    var i = r, {
      children: e,
      onClose: t
    } = i, n = Le(i, [
      "children",
      "onClose"
    ]);
    const o = _.useRef(null);
    return _.useEffect(() => {
      if (!o.current || typeof t == "undefined")
        return;
      const a = o.current;
      function l(s) {
        s.target === a && (t == null || t());
      }
      a.addEventListener("click", l);
      try {
        a.showModal();
      } catch (s) {
      }
      return () => {
        a.removeEventListener("click", l);
      };
    }, [t]), /* @__PURE__ */ y("dialog", H(M({}, n), { ref: o, onClose: t, children: e }));
  }
  const FB = "_show_btn_83j0t_1", BB = "_modal_83j0t_5", UB = "_title_83j0t_18", zB = "_description_83j0t_22", jB = "_code_holder_83j0t_26", WB = "_footer_83j0t_43", Jn = {
    show_btn: FB,
    modal: BB,
    title: UB,
    description: zB,
    code_holder: jB,
    footer: WB
  };
  function YB({
    info: e
  }) {
    const t = Lg(e, { include_info: !1 });
    return t.app_type === "SINGLE-FILE" ? /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y("h2", { className: Jn.title, children: "App script" }),
      /* @__PURE__ */ L("p", { className: Jn.description, children: [
        "The following code defines the currently being edited app. Copy and paste it to an ",
        /* @__PURE__ */ y("code", { children: "app.R" }),
        " file to use."
      ] }),
      /* @__PURE__ */ L("div", { className: Jn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "app.R" }),
        /* @__PURE__ */ y("pre", { children: t.app })
      ] })
    ] }) : /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y("h2", { className: Jn.title, children: "App scripts" }),
      /* @__PURE__ */ L("p", { className: Jn.description, children: [
        "The following code defines the currently being edited app. Copy and paste the ui and server scripts into ",
        /* @__PURE__ */ y("code", { children: "ui.R" }),
        " and",
        " ",
        /* @__PURE__ */ y("code", { children: "server.R" }),
        " files to use."
      ] }),
      /* @__PURE__ */ L("div", { className: Jn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "ui.R" }),
        /* @__PURE__ */ y("pre", { children: t.ui })
      ] }),
      /* @__PURE__ */ L("div", { className: Jn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "server.R" }),
        /* @__PURE__ */ y("pre", { children: t.server })
      ] })
    ] });
  }
  function VB() {
    const [e, t] = _.useState(!1), r = WS().getState().app_info;
    return r.mode !== "MAIN" ? null : /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(ma, { className: Gt.title, children: "Code" }),
      /* @__PURE__ */ y(
        Ai,
        {
          className: Jn.show_btn,
          text: "See current application code",
          position: "left",
          onClick: () => t((i) => !i),
          variant: "regular",
          children: "Get app script"
        }
      ),
      e ? /* @__PURE__ */ y(
        Fh,
        {
          className: Jn.modal,
          title: "App Script",
          onClose: () => t(!1),
          children: /* @__PURE__ */ L("form", { method: "dialog", children: [
            /* @__PURE__ */ y(YB, { info: r }),
            /* @__PURE__ */ y("div", { className: Jn.footer, children: /* @__PURE__ */ y(ht, { type: "submit", children: "Okay" }) })
          ] })
        }
      ) : null
    ] });
  }
  function $B() {
    const { sendMsg: e, incomingMsgs: t } = Zl(), [n, r] = _.useState("HIDDEN"), [i, o] = _.useState([]), [a, l] = _.useState(null);
    _.useEffect(() => {
      const p = t.subscribe(
        "APP-PREVIEW-STATUS",
        (S) => {
          l(null), r(S);
        }
      ), h = t.subscribe(
        "APP-PREVIEW-LOGS",
        (S) => {
          o(HB(S));
        }
      ), m = t.subscribe(
        "APP-PREVIEW-CRASH",
        (S) => {
          l(S);
        }
      );
      return e({ path: "APP-PREVIEW-REQUEST" }), u(() => () => e({ path: "APP-PREVIEW-RESTART" })), f(() => () => e({ path: "APP-PREVIEW-STOP" })), () => {
        p.unsubscribe(), h.unsubscribe(), m.unsubscribe();
      };
    }, [t, e]);
    const [s, u] = _.useState(
      // eslint-disable-next-line no-console
      () => () => console.warn("No app running to reset")
    ), [c, f] = _.useState(
      // eslint-disable-next-line no-console
      () => () => console.warn("No app running to stop")
    ), d = _.useCallback(() => {
      o([]);
    }, []);
    return {
      appLogs: i,
      clearLogs: d,
      restartApp: s,
      stopApp: c,
      appLoc: n,
      errors: a
    };
  }
  function HB(e) {
    return Array.isArray(e) ? e : [e];
  }
  function GB() {
    const e = JB();
    return QB(e.width);
  }
  function JB() {
    const [e, t] = _.useState(O0()), n = _.useMemo(
      () => NS(() => {
        t(O0());
      }, 500),
      []
    );
    return _.useEffect(() => (window.addEventListener("resize", n), () => window.removeEventListener("resize", n)), [n]), e;
  }
  function QB(e) {
    const t = LA - BC * 2, n = e - UC * 2;
    return t / n;
  }
  function O0() {
    const { innerWidth: e, innerHeight: t } = window;
    return {
      width: e,
      height: t
    };
  }
  const BC = 16, UC = 55;
  function KB() {
    const e = _.useRef(null), [t, n] = _.useState(!1), r = _.useCallback(() => {
      n((d) => !d);
    }, []), { appLoc: i, errors: o, appLogs: a, clearLogs: l, restartApp: s } = $B(), u = GB(), c = _.useCallback(
      (d) => {
        ZB(d.currentTarget), !(!e.current || typeof i == "string") && (d.metaKey ? s() : e.current.src = i.url);
      },
      [i, s]
    );
    if (i === "HIDDEN")
      return /* @__PURE__ */ y(VB, {});
    const f = ({ isExpandedMode: d }) => /* @__PURE__ */ y("div", { className: Gt.reloadButtonContainer, children: /* @__PURE__ */ y(
      Ai,
      {
        text: `Reload app session (hold ${eU()} to restart app server also)`,
        className: Gt.reloadButton,
        onClick: c,
        position: d ? "right" : "up-right",
        children: /* @__PURE__ */ y(FC, {})
      }
    ) });
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ L(ma, { className: Gt.title, children: [
        /* @__PURE__ */ y(f, { isExpandedMode: !1 }),
        "App Preview"
      ] }),
      /* @__PURE__ */ y(
        "div",
        {
          className: Gt.appViewerHolder,
          "data-expanded": t,
          style: {
            "--app-scale-amnt": u,
            "--preview-inset-horizontal": `${BC}px`,
            "--expanded-inset-horizontal": `${UC}px`
          },
          children: o !== null ? /* @__PURE__ */ y(qB, { onClick: s }) : /* @__PURE__ */ L(Ge, { children: [
            /* @__PURE__ */ y(f, { isExpandedMode: !0 }),
            /* @__PURE__ */ L("div", { className: Gt.appContainer, children: [
              i === "LOADING" ? /* @__PURE__ */ y(XB, {}) : /* @__PURE__ */ y(
                "iframe",
                {
                  className: Gt.previewFrame,
                  src: i.url,
                  title: "Application Preview",
                  ref: e
                }
              ),
              /* @__PURE__ */ y(
                ht,
                {
                  variant: "icon",
                  className: Gt.expandButton,
                  title: t ? "Shrink app preview" : "Expand app preview",
                  onClick: r,
                  children: t ? /* @__PURE__ */ y(c9, {}) : /* @__PURE__ */ y(U3, {})
                }
              )
            ] }),
            /* @__PURE__ */ y(LB, { appLogs: a, clearLogs: l })
          ] })
        }
      )
    ] });
  }
  function qB({ onClick: e }) {
    return /* @__PURE__ */ L("div", { className: Gt.appContainer, children: [
      /* @__PURE__ */ L("p", { children: [
        "App preview crashed.",
        /* @__PURE__ */ y("br", {}),
        " Try and restart?"
      ] }),
      /* @__PURE__ */ L(
        ht,
        {
          className: Gt.restartButton,
          title: "Restart app preview",
          onClick: e,
          children: [
            "Restart app preview ",
            /* @__PURE__ */ y(FC, {})
          ]
        }
      )
    ] });
  }
  function XB() {
    return /* @__PURE__ */ y("div", { className: Gt.loadingMessage, children: /* @__PURE__ */ y("h2", { children: "Loading app preview..." }) });
  }
  function ZB(e) {
    const t = e.querySelector("svg");
    t == null || t.classList.add(Gt.spin), e.addEventListener(
      "animationend",
      () => t == null ? void 0 : t.classList.remove(Gt.spin),
      !1
    );
  }
  function eU() {
    return MC() ? "⌘" : "Alt";
  }
  const tU = (e) => /* @__PURE__ */ y(
    "svg",
    H(M({
      viewBox: "0 0 168 114",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "Shiny Logo"
    }, e), {
      children: /* @__PURE__ */ y(
        "path",
        {
          opacity: 0.9,
          d: "M17.524 62.626c-.898-.027-.3 0 0 0Zm-.027 0c-.871-.027-.49 0-.19 0h.462-.272c.272.027.19 0 0 0Zm.244 0c9.497.218 19.43-1.986 22.313-13.279 1.878-7.293-2.802-12.599-6.938-17.932-.028-.027-.055-.054-.055-.109-.163-.68-4.653-4.816-5.904-6.367 0-.027-.028-.027-.055-.055-.599-.435-1.224-2.64-1.524-3.864a3.323 3.323 0 0 1-.027-1.55c1.089-5.552 1.687-9.606 9.061-8.409 5.306.871 2.558 8.653 5.415 9.415h.055c1.714.164 5.06-3.945 5.55-5.333 1.905-5.388-9.088-8.68-12.435-8.463-6.72.408-11.129 4.055-13.823 10.068-4.952 11.075 4.3 18.45 9.905 26.041 4.245 5.742 4.054 10.857-1.143 15.782-5.714 5.415-12.354-2.04-13.116-7.292-.68-4.816-.625-8.163-4.653-2.04-3.728 5.686.11 13.088 7.374 13.387ZM167.266 36.34v.055a13.555 13.555 0 0 1-.762 3.428 27.79 27.79 0 0 1-2.693 5.306c-1.334 2.041-2.041 2.857-3.429 4.653-2.612 3.402-4.626 5.932-7.674 9.17-4.244 4.49-8.979 9.633-14.149 13.306-7.374 5.28-16.68 6.722-25.497 7.538-25.796 2.34-63.755 5.823-71.755 33.741-.054.164-.19.245-.354.191-.081-.027-.136-.055-.163-.136-7.837-13.388-24.68-23.211-40.3-22.748-.162.027-.299-.055-.326-.218-.027-.163.055-.3.218-.327 40.218-19.972 81.306-10.394 124.735-18.15 10.857-1.931 19.972-9.06 26.53-17.632 2.504-3.238 5.715-5.986 7.919-9.442.353-.572 2.176-5.116-.653-3.184-4.381 2.966-8.082 6.64-12.844 8.953a5.605 5.605 0 0 1-.707.299c-.082.027-.137.109-.164.19a27.286 27.286 0 0 1-2.857 6.368 18.325 18.325 0 0 1-5.66 5.632c-2.122 1.415-4.598 2.232-7.129 2.422-.354.027-.68.027-1.034.027-2.014 0-3.32-.163-4.871-.952-1.986-1.034-2.612-2.721-2.748-4.762-.082-1.224.68-2.558 1.306-3.565.626-1.006 1.633-2.122 2.34-2.421l.055-.028c3.537-2.612 9.551-2.802 13.632-3.918.109-.027.191-.109.191-.19l2.041-7.456c.054-.163-.055-.3-.191-.354a.301.301 0 0 0-.299.109 40.263 40.263 0 0 1-3.402 4.326c-1.605 1.688-2.857 2.721-3.809 3.102a11.152 11.152 0 0 1-3.374.708c-1.361.082-2.531-.463-3.429-1.605-.898-1.143-1.388-2.83-1.496-5.062a8.521 8.521 0 0 1 0-1.197.312.312 0 0 0-.191-.354.313.313 0 0 0-.354.19c-.435.844-.87 1.633-1.306 2.34-1.279 2.232-2.884 4.273-4.707 6.096-1.796 1.796-3.538 2.748-5.143 2.857-3.021.19-4.653-1.523-4.871-5.115-.218-3.429 1.143-10.477 4.082-20.98.163-.462.217-.952.19-1.415-.054-.952-.598-1.333-1.714-1.252a6.312 6.312 0 0 0-3.51 1.47 12.19 12.19 0 0 0-3.021 3.837c-.898 1.632-1.687 3.32-2.421 5.034a42.75 42.75 0 0 0-1.878 5.823c-.544 2.204-1.007 4.054-1.306 5.496a144.944 144.944 0 0 0-.925 4.708c-.218 1.143-.463 2.557-.517 2.775l-.055.218-7.483.49-.027-.272c-.054-.654.49-2.966 1.578-7.02l-.653 1.142a29.066 29.066 0 0 1-4.68 6.095c-1.796 1.796-3.537 2.749-5.143 2.857h-.326c-2.64 0-4.136-2.068-4.381-6.15-.055-.816-.082-1.632-.055-2.475a.312.312 0 0 0-.19-.354.312.312 0 0 0-.354.19c-4.109 7.538-7.81 11.347-11.238 11.565-3.02.19-4.653-1.605-4.898-5.36-.272-4.164.87-10.26 3.401-18.096.545-1.932.79-3.265.735-3.973-.082-1.088-.571-1.224-.98-1.224h-.108c-.354.027-1.116.245-2.722 1.252a14.477 14.477 0 0 0-3.646 3.4c-1.17 1.525-2.095 3.239-2.775 5.035-.708 1.905-1.28 3.565-1.687 4.952-.408 1.388-.817 3.102-1.225 5.062-.408 1.959-.762 3.646-1.088 4.898a73.777 73.777 0 0 0-.98 4.353l-.054.218-7.184.462c-.163 0-.3-.108-.3-.272v-.108c1.062-3.674 2.559-9.633 4.463-17.688 1.905-8.054 3.647-14.503 5.061-19.129 1.225-4.027 2.667-8 4.354-11.836a32.438 32.438 0 0 1 5.225-8.273c2.04-2.285 4.326-3.51 6.748-3.673 2.558-.163 3.919 1.116 4.109 3.755.109 1.769-.408 4.136-1.524 7.102-2.04 5.252-5.442 11.374-10.15 18.204a.296.296 0 0 0 0 .408c.11.11.3.11.409 0a16.315 16.315 0 0 1 2.612-1.66c1.36-.707 2.857-1.115 4.408-1.251 2.912-.19 4.463 1.143 4.653 3.945a8.216 8.216 0 0 1-.326 3.048c-.273.898-.572 1.96-.926 3.13-.326 1.17-.598 2.149-.816 2.884-.218.761-.49 1.768-.844 3.047-.353 1.28-.625 2.395-.789 3.266-.49 2.204-.68 3.972-.598 5.251.109 1.633.762 1.633.98 1.633h.081c2.748-.163 5.986-4.953 9.66-14.204.027-.055.027-.082.054-.136a64.454 64.454 0 0 1 3.184-8.925c1.524-3.347 3.374-5.116 5.551-5.252l4.354-.218c.163 0 .299.109.299.272a.31.31 0 0 1-.082.218c-.68.653-1.578 2.395-2.666 5.197-1.143 3.02-1.932 5.089-2.45 6.476-.516 1.443-1.115 3.402-1.74 5.85-.627 2.45-.899 4.409-.79 5.878.136 1.932.87 1.932 1.116 1.932h.081c.381-.027 1.089-.299 2.368-1.47a14.924 14.924 0 0 0 2.53-3.02c.653-1.06 1.36-2.394 2.15-4.027.79-1.632 1.47-3.047 2.04-4.245.627-1.279.872-1.714 1.035-1.877l.354-.653c1.333-5.388 1.959-9.17 1.823-11.266a2.31 2.31 0 0 0-.245-1.034c-.082-.108-.082-.299.054-.38a.387.387 0 0 1 .163-.055l3.02-.19c1.77-.11 2.885 0 3.457.38.571.381.925 1.007.952 1.66a9.83 9.83 0 0 1-.19 1.987c-.028.163.081.3.245.326.081.028.19-.027.244-.081 3.402-3.538 6.939-5.442 10.585-5.66 2.912-.19 4.49 1.197 4.654 4.109.054.925 0 1.85-.191 2.775-.19.925-.653 2.721-1.469 5.497-1.715 5.959-2.531 9.959-2.395 11.918.082 1.388.626 1.551 1.034 1.551h.082c.381-.027 1.088-.3 2.34-1.496a17.296 17.296 0 0 0 2.558-3.075 43.208 43.208 0 0 0 2.177-3.973c.789-1.578 1.442-2.993 2.013-4.19.191-.436.354-.762.49-1.035 0-.027.027-.027.027-.054.789-3.32 1.714-6.068 2.776-8.19 1.224-2.504 2.612-4.164 4.081-4.98 1.47-.816 3.483-1.279 6.068-1.442a.58.58 0 0 1 .626.517v.054c.027.3-.136.626-.462 1.034-1.824 1.987-3.592 5.497-5.307 10.45-1.714 4.952-2.448 9.115-2.258 12.435.109 1.523.49 2.313 1.143 2.313h.054c1.606-.11 3.647-2.096 6.014-5.932a50.108 50.108 0 0 0 5.442-11.674c.163-.544.381-1.306.68-2.34.3-1.034.517-1.714.626-2.095.109-.381.327-.925.599-1.606.19-.544.462-1.034.789-1.496.218-.245.544-.572.925-.98.381-.408.816-.707 1.333-.87a19.15 19.15 0 0 1 3.919-.735l3.02-.19c.136-.055.3.026.354.162.054.137-.027.3-.163.354l-.055.055c-1.36 1.06-2.694 3.591-3.945 7.537-1.034 3.347-1.905 6.449-2.585 9.197a295.694 295.694 0 0 1-1.279 5.034c-.164.599-.517 2.068-1.061 4.3a177.514 177.514 0 0 1-1.062 4.19c-.054.136 0 .3.136.354.082.027.191.027.272-.055a43.638 43.638 0 0 0 8.164-6.313c1.387-1.387 11.918-13.088 12.408-5.66l.054.327ZM66.503 2.708c-1.06.054-2.938 1.687-5.768 8.98-1.96 5.033-3.864 10.775-5.687 17.087-.055.164.054.3.19.354.109.027.245 0 .327-.109 4.898-7.483 8.299-13.714 10.095-18.585 1.115-3.32 1.633-5.523 1.578-6.503-.082-1.197-.544-1.197-.68-1.197l-.055-.027ZM137.17 54c.054-.136-.027-.3-.163-.354a.173.173 0 0 0-.163 0c-1.47.3-2.939.544-4.381.898-2.041.49-5.143.98-6.722 2.694-.027.027-.027.054-.054.082-.272.598-.326 1.55-.272 2.748.054.844.871 1.633 1.578 2.204a3.24 3.24 0 0 0 2.313.68c3.211-.244 5.85-3.238 7.864-8.952ZM88.517 18.98c1.742-.082 3.918-.735 4.435-3.32.245-1.17-.462-2.504-.898-2.885-.435-.38-1.034-.544-1.823-.49-.789.055-1.741.545-2.64 1.389-1.196 1.115-1.142 2.72-.761 3.782.354.898.98 1.496 1.687 1.524Z",
          fill: "#fff"
        }
      )
    })
  ), nU = {
    uiName: "gridlayout::grid_page",
    uiArguments: {
      row_sizes: ["70px", "1fr", "1fr"],
      col_sizes: ["250px", "1fr"],
      gap_size: "1rem",
      layout: ["header header", "sidebar linePlots", "dists dists"]
    },
    uiChildren: [
      {
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "sidebar",
          title: "Settings",
          item_gap: "12px"
        },
        uiChildren: [
          {
            uiName: "shiny::sliderInput",
            uiArguments: {
              inputId: "numChicks",
              label: "Number of Chicks",
              min: 1,
              max: 15,
              value: 5,
              width: "100%",
              step: 1
            }
          },
          {
            uiName: "shiny::radioButtons",
            uiArguments: {
              inputId: "distFacet",
              label: "Facet Distribution By",
              choices: {
                "Diet Type": "Diet",
                "Measure Time": "Time"
              }
            }
          }
        ]
      },
      {
        uiName: "gridlayout::grid_card_text",
        uiArguments: {
          area: "header",
          content: "Chick Weights",
          alignment: "center",
          is_title: !1
        }
      },
      {
        uiName: "gridlayout::grid_card_plot",
        uiArguments: {
          area: "dists"
        }
      },
      {
        uiName: "gridlayout::grid_card_plot",
        uiArguments: {
          area: "linePlots"
        }
      }
    ]
  }, rU = {
    title: "Chick Weights Grid",
    description: "Plots investigating the ChickWeights built-in dataset",
    uiTree: nU,
    otherCode: {
      serverLibraries: ["ggplot2"],
      serverFunctionBody: ` 
output$linePlots <- renderPlot({
  obs_to_include <- as.integer(ChickWeight$Chick) <= input$numChicks
  chicks <- ChickWeight[obs_to_include, ]

  ggplot(
    chicks,
    aes(
      x = Time,
      y = weight,
      group = Chick
    )
  ) +
    geom_line(alpha = 0.5) +
    ggtitle("Chick weights over time")
})

output$dists <- renderPlot({
  ggplot(
    ChickWeight,
    aes(x = weight)
  ) +
    facet_wrap(input$distFacet) +
    geom_density(fill = "#fa551b", color = "#ee6331") +
    ggtitle("Distribution of weights by diet")
})`
    }
  }, iU = {
    uiName: "shiny::navbarPage",
    uiArguments: {
      title: "Chick Weights",
      selected: "Line Plots",
      collapsible: !0,
      theme: {
        uiName: "unknownUiFunction",
        uiArguments: {
          text: "bslib::bs_theme()"
        }
      }
    },
    uiChildren: [
      {
        uiName: "shiny::tabPanel",
        uiArguments: {
          title: "Line Plots"
        },
        uiChildren: [
          {
            uiName: "gridlayout::grid_container",
            uiArguments: {
              row_sizes: ["1fr"],
              col_sizes: ["250px", "1fr"],
              gap_size: "10px",
              layout: ["num_chicks linePlots"]
            },
            uiChildren: [
              {
                uiName: "gridlayout::grid_card",
                uiArguments: {
                  area: "num_chicks"
                },
                uiChildren: [
                  {
                    uiName: "shiny::sliderInput",
                    uiArguments: {
                      inputId: "numChicks",
                      label: "Number of chicks",
                      min: 1,
                      max: 15,
                      value: 5,
                      step: 1,
                      width: "100%"
                    }
                  }
                ]
              },
              {
                uiName: "gridlayout::grid_card_plot",
                uiArguments: {
                  area: "linePlots"
                }
              }
            ]
          }
        ]
      },
      {
        uiName: "shiny::tabPanel",
        uiArguments: {
          title: "Distributions"
        },
        uiChildren: [
          {
            uiName: "gridlayout::grid_container",
            uiArguments: {
              row_sizes: ["165px", "1fr"],
              col_sizes: ["1fr"],
              gap_size: "10px",
              layout: ["facetOption", "dists"]
            },
            uiChildren: [
              {
                uiName: "gridlayout::grid_card_plot",
                uiArguments: {
                  area: "dists"
                }
              },
              {
                uiName: "gridlayout::grid_card",
                uiArguments: {
                  area: "facetOption",
                  title: "Distribution Plot Options"
                },
                uiChildren: [
                  {
                    uiName: "shiny::radioButtons",
                    uiArguments: {
                      inputId: "distFacet",
                      label: "Facet distribution by",
                      choices: {
                        "Diet Option": "Diet",
                        "Measure Time": "Time"
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }, oU = {
    title: "Chick Weights navbar",
    description: "Plots investigating the ChickWeights built-in dataset in a `navbarPage()` view",
    uiTree: iU,
    otherCode: {
      serverLibraries: ["ggplot2"],
      serverFunctionBody: ` 
output$linePlots <- renderPlot({
  obs_to_include <- as.integer(ChickWeight$Chick) <= input$numChicks
  chicks <- ChickWeight[obs_to_include, ]

  ggplot(
    chicks,
    aes(
      x = Time,
      y = weight,
      group = Chick
    )
  ) +
    geom_line(alpha = 0.5) +
    ggtitle("Chick weights over time")
})

output$dists <- renderPlot({
  ggplot(
    ChickWeight,
    aes(x = weight)
  ) +
    facet_wrap(input$distFacet) +
    geom_density(fill = "#fa551b", color = "#ee6331") +
    ggtitle("Distribution of weights by diet")
})
`
    }
  }, aU = {
    uiName: "gridlayout::grid_page",
    uiArguments: {
      layout: [
        "header  header   header",
        "sidebar bluePlot bluePlot",
        "table   table    plotly",
        "table   table    plotly"
      ],
      row_sizes: ["100px", "1fr", "1fr", "1fr"],
      col_sizes: ["250px", "0.59fr", "1.41fr"],
      gap_size: "1rem"
    },
    uiChildren: [
      {
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "sidebar",
          title: "Settings",
          item_gap: "12px"
        },
        uiChildren: [
          {
            uiName: "shiny::sliderInput",
            uiArguments: {
              inputId: "bins",
              label: "Number of Bins",
              min: 12,
              max: 100,
              value: 30,
              width: "100%"
            }
          },
          {
            uiName: "shiny::numericInput",
            uiArguments: {
              inputId: "numRows",
              label: "Number of table rows",
              value: 10,
              min: 1,
              step: 1,
              width: "100%"
            }
          }
        ]
      },
      {
        uiName: "gridlayout::grid_card_text",
        uiArguments: {
          area: "header",
          content: "Geysers!",
          alignment: "start",
          is_title: !1
        }
      },
      {
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "table",
          title: "Table",
          // scrollable: true,
          item_gap: "12px"
        },
        uiChildren: [
          {
            uiName: "DT::DTOutput",
            uiArguments: {
              outputId: "myTable",
              width: "100%"
            }
          }
        ]
      },
      {
        uiName: "gridlayout::grid_card_plot",
        uiArguments: {
          area: "bluePlot"
        }
      },
      {
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "plotly",
          title: "Interactive Plot"
        },
        uiChildren: [
          {
            uiName: "plotly::plotlyOutput",
            uiArguments: {
              outputId: "distPlot",
              width: "100%",
              height: "100%"
            }
          }
        ]
      }
    ]
  }, lU = {
    title: "Grid Geyser",
    description: "The classic geyser app in a gridlayout grid page",
    uiTree: aU,
    otherCode: {
      serverLibraries: ["plotly"],
      serverFunctionBody: ` 
output$distPlot <- renderPlotly({
  # generate bins based on input$bins from ui.R
  plot_ly(x = ~ faithful[, 2], type = "histogram")
})

output$bluePlot <- renderPlot({
  # generate bins based on input$bins from ui.R
  x <- faithful[, 2]
  bins <- seq(min(x), max(x), length.out = input$bins + 1)

  # draw the histogram with the specified number of bins
  hist(x, breaks = bins, col = "steelblue", border = "white")
})

output$myTable <- renderDT({
  head(faithful, input$numRows)
})`
    }
  }, zC = [
    lU,
    oU,
    rU
  ];
  function sU(e) {
    const t = e.outputType === "SINGLE-FILE" ? uU(e) : cU(e);
    return Lg(t, { include_info: !0 });
  }
  function uU({
    uiTree: e,
    otherCode: {
      uiExtra: t = "",
      serverExtra: n = "",
      serverFunctionBody: r = "",
      serverLibraries: i = []
    }
  }) {
    const o = `${lr.libraries}

${t}
ui <- ${lr.ui}

${n}
server <- function(input, output) {
  ${Gl(r)}
}

shinyApp(ui, server)
  
`;
    return {
      app_type: "SINGLE-FILE",
      ui_tree: e,
      app: {
        code: o,
        libraries: ["shiny", ...i]
      }
    };
  }
  function cU({
    uiTree: e,
    otherCode: {
      uiExtra: t = "",
      serverExtra: n = "",
      serverFunctionBody: r = "",
      serverLibraries: i = []
    }
  }) {
    const o = `${lr.libraries}

${t}
ui <- ${lr.ui}
`, a = `${RC(i)}

${n}
server <- function(input, output) {
  ${Gl(r)}
}
`;
    return {
      app_type: "MULTI-FILE",
      ui_tree: e,
      ui: {
        code: o,
        libraries: ["shiny", ...i]
      },
      server: {
        code: a
      }
    };
  }
  const Kd = 1260, I0 = 800;
  function fU({
    uiTree: e,
    width_px: t
  }) {
    const n = I0 * (t / Kd), r = t / Kd;
    return /* @__PURE__ */ y(
      "div",
      {
        className: "AppTemplatePreview",
        style: {
          width: `${t}px`,
          height: `${n}px`,
          "--full-w": `${Kd}px`,
          "--full-h": `${I0}px`,
          "--shrink-ratio": r
        },
        children: /* @__PURE__ */ y("div", { className: "template-container", children: /* @__PURE__ */ y(sr, { path: [], node: e }) })
      }
    );
  }
  function jC(e) {
    return e.uiName === "gridlayout::grid_page" ? "grid" : "navbarPage";
  }
  const dU = {
    grid: SE,
    navbarPage: lC
  }, WC = 5, pU = {
    "--card-pad": `${WC}px`
  };
  function hU({
    info: { title: e, uiTree: t, description: n },
    onSelect: r,
    width_px: i,
    selected: o
  }) {
    const a = jC(t), l = dU[a], s = i - 2 * WC;
    return /* @__PURE__ */ y(
      xg,
      {
        placement: "bottom",
        popoverContent: n,
        openDelayMs: 400,
        triggerEl: /* @__PURE__ */ L(
          "article",
          {
            className: "AppTemplateCard",
            "aria-label": "App template preview card",
            onClick: r,
            style: pU,
            "data-selected": o,
            children: [
              /* @__PURE__ */ y("div", { className: "preview-container", children: /* @__PURE__ */ y(fU, { uiTree: t, width_px: s }) }),
              /* @__PURE__ */ L("footer", { children: [
                /* @__PURE__ */ y("span", { children: e }),
                /* @__PURE__ */ y(
                  "img",
                  {
                    src: l,
                    alt: `${a} layout icon`,
                    title: `${a} layout app`,
                    className: "layout-icon"
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }
  function mU() {
    const { sendMsg: e } = Zl();
    return _.useCallback(
      (n) => {
        e({
          path: "UPDATED-APP",
          payload: sU(n)
        });
      },
      [e]
    );
  }
  const YC = ["grid", "navbarPage"];
  function gU(e) {
    return zC.filter(({ uiTree: t }) => {
      const n = jC(t);
      return !!e.layoutTypes.includes(n);
    });
  }
  function vU({
    outputChoices: e
  }) {
    const t = mU(), [n, r] = _.useState({
      layoutTypes: YC
    }), [i, o] = _.useState(
      null
    ), [a, l] = _.useState(
      e === "USER-CHOICE" ? "SINGLE-FILE" : e
    ), s = (f) => {
      o(
        (d) => d === f ? null : f
      );
    }, u = _.useMemo(
      () => gU(n),
      [n]
    );
    return _.useEffect(() => {
      i && !u.map((f) => f.title).includes(i) && o(null);
    }, [i, u]), {
      filterState: n,
      setFilterState: r,
      shownTemplates: u,
      selectedTemplate: i,
      setSelectedTemplate: s,
      selectedOutput: a,
      setSelectedOutput: l,
      finishSelection: () => {
        const f = u.find(
          ({ title: p }) => p === i
        );
        if (!f)
          return;
        const d = TC(f.uiTree, {
          remove_namespace: !0
        });
        t(H(M(M({}, f), d), {
          outputType: a
        }));
      }
    };
  }
  const yU = ["SINGLE-FILE", "MULTI-FILE"], wU = {
    "SINGLE-FILE": "Single file mode",
    "MULTI-FILE": "Multi file mode"
  };
  function bU({
    selectedOutput: e,
    setSelectedOutput: t
  }) {
    return /* @__PURE__ */ L("form", { className: "App_TypeForm", children: [
      /* @__PURE__ */ y("legend", { children: "Generate app in:" }),
      yU.map((n) => {
        const r = wU[n];
        return /* @__PURE__ */ L("div", { className: "labeled-form-option", children: [
          /* @__PURE__ */ y(
            "input",
            {
              type: "radio",
              id: `${n}-choice`,
              name: r,
              value: n,
              checked: n === e,
              onChange: (i) => t(n)
            }
          ),
          /* @__PURE__ */ y("label", { htmlFor: `${n}-choice`, children: r })
        ] }, n);
      })
    ] });
  }
  const SU = {
    grid: "Grid",
    navbarPage: "Tabs"
  };
  function EU({
    filterState: e,
    setFilterState: t
  }) {
    const { layoutTypes: n } = e;
    return /* @__PURE__ */ y(
      "form",
      {
        className: "TemplateFiltersForm",
        onSubmit: (r) => {
          r.preventDefault();
        },
        children: /* @__PURE__ */ L("fieldset", { "aria-label": "App layout type filters", children: [
          /* @__PURE__ */ y("legend", { children: "Show templates based on selected layouts:" }),
          /* @__PURE__ */ y("div", { className: "layout-options", children: YC.map((r) => {
            const i = SU[r], o = n.includes(r);
            return /* @__PURE__ */ L("div", { className: "labeled-form-option", children: [
              /* @__PURE__ */ y(
                "input",
                {
                  type: "checkbox",
                  id: `${r}-choice`,
                  name: i,
                  value: r,
                  checked: o,
                  onChange: () => {
                    t(H(M({}, e), {
                      layoutTypes: o ? n.filter((a) => a !== r) : [...n, r]
                    }));
                  }
                }
              ),
              /* @__PURE__ */ y("label", { htmlFor: `${r}-choice`, children: i })
            ] }, r);
          }) })
        ] })
      }
    );
  }
  const VC = 294, AU = {
    "--card-w": `${VC}px`
  };
  function CU({
    selectedTemplate: e,
    setSelectedTemplate: t,
    templates: n = zC
  }) {
    return n.length === 0 ? /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid empty-results", children: "No app templates fit current filters. Try broadening your search." }) : /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid", style: AU, children: n.map((r) => /* @__PURE__ */ y(
      hU,
      {
        info: r,
        selected: r.title === e,
        onSelect: () => {
          t(r.title);
        },
        width_px: VC
      },
      r.title
    )) });
  }
  function xU(e) {
    const {
      filterState: t,
      setFilterState: n,
      shownTemplates: r,
      selectedTemplate: i,
      setSelectedTemplate: o,
      finishSelection: a,
      selectedOutput: l,
      setSelectedOutput: s
    } = vU(e), u = i !== null, c = u ? "Next" : "Select a template";
    return /* @__PURE__ */ y(
      MA,
      {
        main: /* @__PURE__ */ y(
          CU,
          {
            templates: r,
            selectedTemplate: i,
            setSelectedTemplate: o
          }
        ),
        left: /* @__PURE__ */ L(Ge, { children: [
          /* @__PURE__ */ y(ma, { children: "Choose App Template" }),
          /* @__PURE__ */ L("div", { className: "TemplateChooserSidebar", children: [
            /* @__PURE__ */ y("section", { className: "instructions", children: "Hover over a template to see a description and what elements are used. Select the desired template and click next to edit." }),
            /* @__PURE__ */ y(
              EU,
              {
                filterState: t,
                setFilterState: n
              }
            ),
            e.outputChoices === "USER-CHOICE" ? /* @__PURE__ */ y(
              bU,
              {
                selectedOutput: l,
                setSelectedOutput: s
              }
            ) : null,
            /* @__PURE__ */ y(
              ht,
              {
                disabled: !u,
                onClick: a,
                "aria-label": u ? "Start editor with selected template" : "Need to select a template to proceed",
                "data-balloon-pos": "right",
                children: c
              }
            )
          ] })
        ] })
      }
    );
  }
  const kU = "_container_1d7pe_1", _U = {
    container: kU
  };
  function OU({
    goBackward: e,
    canGoBackward: t,
    goForward: n,
    canGoForward: r
  }) {
    return /* @__PURE__ */ L("div", { className: nt(_U.container, "undo-redo-buttons"), children: [
      /* @__PURE__ */ y(
        ht,
        {
          variant: ["transparent", "icon"],
          disabled: !t,
          "aria-label": "Undo last change",
          title: "Undo last change",
          onClick: e,
          children: /* @__PURE__ */ y(_I, { height: "100%" })
        }
      ),
      /* @__PURE__ */ y(
        ht,
        {
          variant: ["transparent", "icon"],
          disabled: !r,
          "aria-label": "Redo last change",
          title: "Redo last change",
          onClick: n,
          children: /* @__PURE__ */ y(kI, { height: "100%" })
        }
      )
    ] });
  }
  function IU() {
    return ls(
      (t) => t.connected_to_server
    ) ? null : /* @__PURE__ */ y(FA, { onConfirm: () => {
    }, onCancel: () => {
    }, children: /* @__PURE__ */ y("p", { style: { color: "var(--red, pink)", textAlign: "center" }, children: "Lost connection to backend. Check console where editor was launched for details." }) });
  }
  const TU = "_elementsPalette_qmlez_1", PU = "_OptionContainer_qmlez_18", NU = "_OptionItem_qmlez_24", DU = "_OptionIcon_qmlez_33", RU = "_OptionLabel_qmlez_41", Xa = {
    elementsPalette: TU,
    OptionContainer: PU,
    OptionItem: NU,
    OptionIcon: DU,
    OptionLabel: RU
  };
  function LU(e) {
    return typeof e == "function";
  }
  function MU(e, t) {
    return LU(e) ? e(t) : e;
  }
  function $C(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r];
      n[r] = MU(i, t);
    }
    return n;
  }
  function FU(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r];
      n[r] = $C(i, t);
    }
    return n;
  }
  function BU(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r], o = "optional" in i, a = "useDefaultIfOptional" in i && i.useDefaultIfOptional;
      o && !a || "defaultValue" in i && (n[r] = $C(
        e[r],
        t
      ).defaultValue);
    }
    return n;
  }
  function UU({ uiName: e }) {
    const {
      iconSrc: t,
      title: n,
      settingsInfo: r,
      description: i = n
    } = rn[e], o = {
      uiName: e,
      uiArguments: BU(r)
    }, a = sE({ nodeInfo: { node: o } });
    return t === void 0 ? null : /* @__PURE__ */ y(
      xg,
      {
        popoverContent: i,
        contentIsMd: !0,
        openDelayMs: 500,
        triggerEl: /* @__PURE__ */ y("div", { className: Xa.OptionContainer, children: /* @__PURE__ */ L(
          "div",
          H(M({
            className: Xa.OptionItem,
            "data-ui-name": e
          }, a), {
            children: [
              /* @__PURE__ */ y("img", { src: t, alt: n, className: Xa.OptionIcon }),
              /* @__PURE__ */ y("label", { className: Xa.OptionLabel, children: n })
            ]
          })
        ) })
      }
    );
  }
  const T0 = [
    "Inputs",
    "Outputs",
    "gridlayout",
    "uncategorized"
  ];
  function zU(e, t) {
    var i, o;
    const n = T0.indexOf(
      ((i = rn[e]) == null ? void 0 : i.category) || "uncategorized"
    ), r = T0.indexOf(
      ((o = rn[t]) == null ? void 0 : o.category) || "uncategorized"
    );
    return n < r ? -1 : n > r ? 1 : 0;
  }
  function jU({
    availableUi: e = rn
  }) {
    const t = K.useMemo(
      () => Object.keys(e).sort(zU),
      [e]
    );
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(ma, { children: "Elements" }),
      /* @__PURE__ */ y("div", { className: Xa.elementsPalette, children: t.map((n) => /* @__PURE__ */ y(UU, { uiName: n }, n)) })
    ] });
  }
  function WU(e) {
    let t = [], n = {};
    for (let r in e)
      e[r].inputType === "omitted" ? t.push(r) : n[r] = e[r];
    return {
      omitted: t,
      nonOmittedFormInfo: n
    };
  }
  function YU({
    settings: e,
    settingsInfo: t,
    onSettingsChange: n
  }) {
    const r = w4(
      Object.keys(e),
      Object.keys(t)
    );
    return r.length === 0 ? null : /* @__PURE__ */ L("section", { className: "unknown-arguments-list", children: [
      /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: /* @__PURE__ */ y(
        VL,
        {
          text: "Arguments present in UI code but not known about or editable by the shinyuieditor",
          position: "left",
          size: "fit",
          children: "Unknown arguments"
        }
      ) }) }),
      /* @__PURE__ */ y("ul", { className: "unknown-form-fields", "aria-label": "Unknown arguments list", children: r.map((i) => /* @__PURE__ */ L(
        "li",
        {
          className: "unknown-argument",
          "aria-label": "Unknown argument",
          style: { cursor: "default" },
          children: [
            /* @__PURE__ */ y(
              "code",
              {
                "aria-label": $U(e[i]),
                "data-balloon-pos": "left",
                style: { cursor: "inherit" },
                children: i
              }
            ),
            /* @__PURE__ */ y(
              Ai,
              {
                text: `Remove ${i} argument`,
                onClick: () => n(i, { type: "REMOVE" }),
                type: "button",
                position: "left",
                children: /* @__PURE__ */ y(Kc, {})
              }
            )
          ]
        },
        i
      )) })
    ] });
  }
  function VU(e) {
    return Pg(e) ? e.uiName === "unknownUiFunction" : !1;
  }
  const P0 = 50;
  function $U(e) {
    let t = JSON.stringify(
      VU(e) ? e.uiArguments.text : e
    );
    return t.length > P0 + 4 && (t = t.substring(0, P0), t += "..."), "Value: " + t;
  }
  function HU(e) {
    const {
      settings: t,
      settingsInfo: n,
      onSettingsChange: r,
      renderInputs: i = ({ inputs: l }) => /* @__PURE__ */ y(Ge, { children: Object.values(l) })
    } = e, { nonOmittedFormInfo: o } = WU(n), a = {
      inputs: JU({
        settings: t,
        settingsInfo: o,
        onSettingsChange: r
      }),
      settings: t
    };
    return /* @__PURE__ */ L("form", { className: "FormBuilder", onSubmit: GU, children: [
      i(a),
      /* @__PURE__ */ y(YU, M({}, e))
    ] });
  }
  const GU = (e) => {
    e.preventDefault();
  };
  function JU({
    settings: e,
    settingsInfo: t,
    onSettingsChange: n
  }) {
    const r = {};
    return Object.keys(t).forEach((i) => {
      const o = t[i], a = e[i], l = H(M({}, o), {
        name: i,
        value: a,
        onUpdate: (s) => n(i, s)
      });
      r[i] = /* @__PURE__ */ y(KA, M({}, l), i);
    }), r;
  }
  function QU({ node: e }) {
    const { sendMsg: t, mode: n } = Zl();
    if (n !== "VSCODE" || !e)
      return null;
    const { serverBindings: r } = rn[e.uiName];
    return /* @__PURE__ */ L("div", { children: [
      /* @__PURE__ */ y(
        KU,
        {
          serverOutputInfo: r == null ? void 0 : r.outputs,
          node: e,
          sendMsg: t
        }
      ),
      /* @__PURE__ */ y(
        qU,
        {
          serverInputInfo: r == null ? void 0 : r.inputs,
          node: e,
          sendMsg: t
        }
      )
    ] });
  }
  function KU({
    serverOutputInfo: e,
    node: { uiArguments: t },
    sendMsg: n
  }) {
    const r = OC();
    if (!(r.mode === "MAIN" && "output_positions" in r) || typeof e == "undefined")
      return null;
    const i = r.output_positions, o = r.server_pos, { outputIdKey: a, renderScaffold: l } = e, s = typeof a == "string" ? a : a(t), u = t[s];
    if (typeof u != "string")
      return null;
    const c = i[u];
    return /* @__PURE__ */ y(
      Ai,
      {
        text: c ? "Show output declaration in app script" : "Create output binding in app server",
        position: "left",
        variant: "regular",
        onClick: () => {
          n(c ? {
            path: "SHOW-APP-LINES",
            payload: c
          } : {
            path: "INSERT-SNIPPET",
            payload: {
              snippet: `
output\\$${u} <- ${l}`,
              below_line: o[2] - 1
            }
          });
        },
        children: c ? "Show in server" : "Generate server code"
      }
    );
  }
  function qU({
    serverInputInfo: e,
    node: { uiArguments: t },
    sendMsg: n
  }) {
    if (typeof e == "undefined")
      return null;
    const { inputIdKey: r } = e, i = typeof r == "string" ? r : r(t), o = t[i];
    return typeof o != "string" ? null : /* @__PURE__ */ y(
      Ai,
      {
        text: `Find uses of bound input (input$${o}) in app script`,
        position: "left",
        variant: "regular",
        onClick: () => {
          n({
            path: "FIND-INPUT-USES",
            payload: { type: "Input", inputId: o }
          });
        },
        children: "Find in server"
      }
    );
  }
  const XU = "_container_1fh41_1", ZU = "_node_1fh41_12", N0 = {
    container: XU,
    node: ZU
  };
  function ez({
    tree: e,
    path: t,
    onSelect: n
  }) {
    const r = LC(t, e), i = t.length;
    return /* @__PURE__ */ y("div", { className: N0.container, "aria-label": "Path to selected node", children: r.map((o, a) => {
      const l = a === i, s = tz(o);
      return /* @__PURE__ */ y(
        "div",
        {
          className: N0.node,
          "aria-label": l ? "current selection" : "ancestor of selection",
          onClick: (
            // Only run selection callback when selection will change current
            // state. Otherwise it will just loose any changes to settings the
            // user has made without changing anything meaningful
            l ? void 0 : () => n(t.slice(0, a))
          ),
          children: s
        },
        o + a
      );
    }) });
  }
  function tz(e) {
    return e.replace(/[a-z]+::/, "");
  }
  const nz = "_settingsPanel_a44hx_1", rz = "_currentElementAbout_a44hx_10", iz = "_settingsForm_a44hx_17", oz = "_settingsInputs_a44hx_24", az = "_buttonsHolder_a44hx_28", lz = "_validationErrorMsg_a44hx_45", qd = {
    settingsPanel: nz,
    currentElementAbout: rz,
    settingsForm: iz,
    settingsInputs: oz,
    buttonsHolder: az,
    validationErrorMsg: lz
  };
  var sz = uz;
  function uz(e, t) {
    var n = {};
    typeof t == "string" && (t = [].slice.call(arguments, 1));
    for (var r in e)
      (!e.hasOwnProperty || e.hasOwnProperty(r)) && t.indexOf(r) === -1 && (n[r] = e[r]);
    return n;
  }
  function cz(e) {
    const t = Dr(), n = fs(), r = cE(), [i, o] = K.useState(
      n !== null ? D0(e, n) : null
    ), a = K.useRef(!1), l = K.useCallback(
      (c) => {
        n && a.current && t(CC({ path: n, node: c }));
      },
      [t, n]
    );
    return K.useEffect(() => {
      if (a.current = !1, n === null) {
        o(null);
        return;
      }
      o(D0(e, n));
    }, [e, n]), K.useEffect(() => {
      i && l(i);
    }, [i, l]), {
      currentNode: i,
      updateArgumentsByName: (c, f) => {
        o(
          (d) => H(M({}, d), {
            uiArguments: H(M({}, d == null ? void 0 : d.uiArguments), { [c]: f })
          })
        ), a.current = !0;
      },
      deleteArgumentByName: (c) => {
        o((f) => {
          var d;
          return f === null ? f : H(M({}, f), {
            uiArguments: sz(
              (d = f.uiArguments) != null ? d : {},
              c
            )
          });
        }), a.current = !0;
      },
      selectedPath: n,
      setNodeSelection: r
    };
  }
  function D0(...e) {
    try {
      return bi(...e);
    } catch (t) {
      return console.warn("Failed to get node. Args:", e), null;
    }
  }
  function fz({ tree: e }) {
    const {
      currentNode: t,
      updateArgumentsByName: n,
      deleteArgumentByName: r,
      selectedPath: i,
      setNodeSelection: o
    } = cz(e);
    if (i === null)
      return /* @__PURE__ */ y("div", { children: "Select an element to edit properties" });
    if (t === null)
      return /* @__PURE__ */ L("div", { children: [
        "Error finding requested node at path ",
        i.join(".")
      ] });
    const a = i.length === 0, { uiName: l, uiArguments: s } = t, u = rn[l], c = FU(
      u.settingsInfo,
      t
    );
    return /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(ma, { children: "Properties" }),
      /* @__PURE__ */ L("div", { className: qd.settingsPanel, children: [
        /* @__PURE__ */ y("div", { className: qd.currentElementAbout, children: /* @__PURE__ */ y(
          ez,
          {
            tree: e,
            path: i,
            onSelect: o
          }
        ) }),
        /* @__PURE__ */ y(
          HU,
          {
            settings: s,
            settingsInfo: c,
            renderInputs: u.settingsFormRender,
            onSettingsChange: (f, d) => {
              switch (d.type) {
                case "UPDATE":
                  n(f, d.value);
                  return;
                case "REMOVE":
                  r(f);
                  return;
              }
            }
          }
        ),
        /* @__PURE__ */ y(QU, { node: t }),
        /* @__PURE__ */ y("div", { className: qd.buttonsHolder, children: a ? null : /* @__PURE__ */ y(wE, { path: i }) })
      ] })
    ] });
  }
  function dz() {
    const { sendMsg: e, mode: t } = Zl();
    return t !== "VSCODE" ? null : /* @__PURE__ */ L(Ge, { children: [
      /* @__PURE__ */ y(
        Ai,
        {
          text: "Open app code next to editor",
          onClick: () => {
            e({
              path: "OPEN-COMPANION-EDITOR",
              payload: "BESIDE"
            });
          },
          className: "OpenSideBySideWindowButton",
          children: /* @__PURE__ */ y(B3, {})
        }
      ),
      /* @__PURE__ */ y("div", { className: "divider" })
    ] });
  }
  const pz = {
    "--properties-panel-width": `${LA}px`
  };
  function hz() {
    const { state: e, errorInfo: t, history: n } = uB();
    let r;
    return t ? r = /* @__PURE__ */ L(Fh, { className: "message-mode", children: [
      /* @__PURE__ */ L("h2", { children: [
        "Error ",
        t.context ? `while ${t.context}` : ""
      ] }),
      /* @__PURE__ */ y("p", { className: "error-msg", children: t.msg })
    ] }) : e.mode === "LOADING" ? r = /* @__PURE__ */ y(Fh, { className: "message-mode", children: /* @__PURE__ */ y("h2", { children: "Loading initial state from server" }) }) : e.mode === "MAIN" ? r = /* @__PURE__ */ y(
      MA,
      {
        main: /* @__PURE__ */ y(sr, { node: e.ui_tree, path: [], canDrag: !1 }),
        left: /* @__PURE__ */ y(jU, {}),
        properties: /* @__PURE__ */ y(fz, { tree: e.ui_tree }),
        preview: /* @__PURE__ */ y(KB, {})
      }
    ) : r = /* @__PURE__ */ y(xU, M({}, e.options)), /* @__PURE__ */ L("div", { className: "EditorContainer", style: pz, children: [
      /* @__PURE__ */ L("header", { children: [
        /* @__PURE__ */ y(tU, { className: "shiny-logo" }),
        /* @__PURE__ */ y("h1", { className: "app-title", children: "Shiny UI Editor" }),
        /* @__PURE__ */ L("div", { className: "right", children: [
          e.mode === "MAIN" ? /* @__PURE__ */ L(Ge, { children: [
            /* @__PURE__ */ y(dz, {}),
            /* @__PURE__ */ y(BI, {})
          ] }) : null,
          /* @__PURE__ */ y("div", { className: "divider" }),
          /* @__PURE__ */ y(OU, M({}, n)),
          /* @__PURE__ */ y("div", { className: "spacer last" })
        ] })
      ] }),
      r,
      /* @__PURE__ */ y(IU, {})
    ] });
  }
  const mz = uf({
    name: "connectedToServer",
    initialState: !0,
    reducers: {
      DISCONNECTED_FROM_SERVER: (e, t) => !1
    }
  }), gz = mz.reducer;
  function vz(e, t) {
    const n = Math.min(e.length, t.length) - 1;
    return n <= 0 ? !0 : dE(e, t, n);
  }
  function yz({
    selectedPath: e,
    deletedPath: t
  }) {
    if (e === null)
      return e;
    if (fa(t, e))
      return wz(e);
    if (e.length < t.length || !vz(e, t))
      return e;
    const n = t.length - 1;
    if (n < 0)
      return [];
    const r = t[n], i = e[n];
    if (r > i)
      return e;
    const o = [...e], a = i - 1;
    return a < 0 || (o[n] = a), o;
  }
  function wz(e) {
    return e.slice(0, e.length - 1);
  }
  const HC = Zm();
  HC.startListening({
    actionCreator: kC,
    effect: (e, t) => ao(ws, null, function* () {
      const n = e.payload.path, r = t.getState().selected_path;
      if (r === null)
        return;
      const i = yz({
        selectedPath: r,
        deletedPath: n
      });
      t.dispatch(df({ path: i }));
    })
  });
  const bz = HC.middleware;
  function Sz({ fromPath: e, toPath: t }) {
    const n = zi(e);
    if (zi(t) < n)
      return t;
    const i = n - 1;
    if (e[i] >= t[i])
      return t;
    const o = [...t];
    return o[i]--, o;
  }
  const GC = Zm();
  GC.startListening({
    actionCreator: xC,
    effect: (e, t) => ao(ws, null, function* () {
      const n = e.payload;
      let r = n.path;
      uC(n) && (r = Sz({
        fromPath: n.currentPath,
        toPath: r
      })), t.dispatch(df({ path: r }));
    })
  });
  const Ez = GC.middleware, JC = Zm();
  JC.startListening({
    actionCreator: _C,
    effect: (e, t) => ao(ws, null, function* () {
      t.dispatch(df({ path: [] }));
    })
  });
  const Az = JC.middleware, Cz = tP({
    reducer: {
      app_info: X9,
      selected_path: IP,
      connected_to_server: gz,
      currentlyDraggedNode: OP
    },
    middleware: (e) => e().concat(bz).concat(Ez).concat(Az)
  });
  function xz({ children: e }) {
    return /* @__PURE__ */ y(AT, { store: Cz, children: e });
  }
  function kz({
    showMessages: e = !0,
    defaultTree: t,
    backendDispatch: { sendMsg: n, incomingMsgs: r, mode: i } = Pk({
      messageDispatch: L0(),
      showMessages: e,
      defaultTree: t != null ? t : "TEMPLATE_CHOOSER"
    })
  }) {
    return /* @__PURE__ */ y(xz, { children: /* @__PURE__ */ y(Rk, H(M({}, e ? {
      sendMsg: n,
      incomingMsgs: {
        subscribe: (a, l) => (console.log(`backendMsgs.subscribe("${a}", ...)`), r.subscribe(a, l))
      },
      mode: i
    } : {
      sendMsg: n,
      incomingMsgs: r,
      mode: i
    }), { children: /* @__PURE__ */ y(hz, {}) })) });
  }
  function _z({
    container: e,
    showMessages: t,
    backendDispatch: n
  }) {
    $b(e).render(
      /* @__PURE__ */ y(kz, { backendDispatch: n, showMessages: t })
    );
  }
  const Oz = document.getElementById("root"), R0 = !0;
  ao(ws, null, function* () {
    try {
      const e = L0(), t = Iz({
        messageDispatch: e,
        showMessages: R0
      });
      _z({ container: Oz, backendDispatch: t, showMessages: R0 });
    } catch (e) {
    }
  });
  function Iz({
    messageDispatch: e,
    showMessages: t
  }) {
    const n = acquireVsCodeApi(), r = t ? console.log : (...a) => {
    }, i = (a) => {
      r("VSCode backend msg:", a);
      const { path: l, payload: s } = a;
      e.dispatch(l, s);
    };
    return window.addEventListener("message", (a) => {
      const l = a.data;
      tx(l) ? i(l) : console.warn("Unknown message type", l);
    }), {
      sendMsg: (a) => {
        r("VSCode sendMsg()", a), n.postMessage(a);
      },
      incomingMsgs: { subscribe: e.subscribe },
      mode: "VSCODE"
    };
  }
});
export default Tz();
