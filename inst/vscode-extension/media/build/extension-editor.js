var VC = Object.defineProperty, GC = Object.defineProperties;
var HC = Object.getOwnPropertyDescriptors;
var Cs = Object.getOwnPropertySymbols;
var Rg = Object.prototype.hasOwnProperty, Lg = Object.prototype.propertyIsEnumerable;
var Fg = Math.pow, Rf = (e, t, n) => t in e ? VC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, M = (e, t) => {
  for (var n in t || (t = {}))
    Rg.call(t, n) && Rf(e, n, t[n]);
  if (Cs)
    for (var n of Cs(t))
      Lg.call(t, n) && Rf(e, n, t[n]);
  return e;
}, Q = (e, t) => GC(e, HC(t));
var it = (e, t) => {
  var n = {};
  for (var r in e)
    Rg.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Cs)
    for (var r of Cs(e))
      t.indexOf(r) < 0 && Lg.call(e, r) && (n[r] = e[r]);
  return n;
};
var $C = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Mg = (e, t, n) => (Rf(e, typeof t != "symbol" ? t + "" : t, n), n);
var wa = (e, t, n) => new Promise((r, i) => {
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
var FU = $C((gs) => {
  const JC = QC;
  function QC() {
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
  function KC(e) {
    return typeof e == "object" && e !== null;
  }
  function XC(e) {
    return KC(e) ? "path" in e : !1;
  }
  var qC = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
  function Dh(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function R0(e) {
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
  var yl = {}, ZC = {
    get exports() {
      return yl;
    },
    set exports(e) {
      yl = e;
    }
  }, mc = {}, J = {}, ex = {
    get exports() {
      return J;
    },
    set exports(e) {
      J = e;
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
  var $l = Symbol.for("react.element"), tx = Symbol.for("react.portal"), nx = Symbol.for("react.fragment"), rx = Symbol.for("react.strict_mode"), ix = Symbol.for("react.profiler"), ox = Symbol.for("react.provider"), ax = Symbol.for("react.context"), lx = Symbol.for("react.forward_ref"), sx = Symbol.for("react.suspense"), ux = Symbol.for("react.memo"), cx = Symbol.for("react.lazy"), Bg = Symbol.iterator;
  function fx(e) {
    return e === null || typeof e != "object" ? null : (e = Bg && e[Bg] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var L0 = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, F0 = Object.assign, M0 = {};
  function ta(e, t, n) {
    this.props = e, this.context = t, this.refs = M0, this.updater = n || L0;
  }
  ta.prototype.isReactComponent = {};
  ta.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  ta.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function B0() {
  }
  B0.prototype = ta.prototype;
  function Rh(e, t, n) {
    this.props = e, this.context = t, this.refs = M0, this.updater = n || L0;
  }
  var Lh = Rh.prototype = new B0();
  Lh.constructor = Rh;
  F0(Lh, ta.prototype);
  Lh.isPureReactComponent = !0;
  var Ug = Array.isArray, U0 = Object.prototype.hasOwnProperty, Fh = { current: null }, z0 = { key: !0, ref: !0, __self: !0, __source: !0 };
  function W0(e, t, n) {
    var r, i = {}, o = null, a = null;
    if (t != null)
      for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t)
        U0.call(t, r) && !z0.hasOwnProperty(r) && (i[r] = t[r]);
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
    return { $$typeof: $l, type: e, key: o, ref: a, props: i, _owner: Fh.current };
  }
  function px(e, t) {
    return { $$typeof: $l, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
  }
  function Mh(e) {
    return typeof e == "object" && e !== null && e.$$typeof === $l;
  }
  function dx(e) {
    var t = { "=": "=0", ":": "=2" };
    return "$" + e.replace(/[=:]/g, function(n) {
      return t[n];
    });
  }
  var zg = /\/+/g;
  function Lf(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? dx("" + e.key) : t.toString(36);
  }
  function Zs(e, t, n, r, i) {
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
            case $l:
            case tx:
              a = !0;
          }
      }
    if (a)
      return a = e, i = i(a), e = r === "" ? "." + Lf(a, 0) : r, Ug(i) ? (n = "", e != null && (n = e.replace(zg, "$&/") + "/"), Zs(i, t, n, "", function(u) {
        return u;
      })) : i != null && (Mh(i) && (i = px(i, n + (!i.key || a && a.key === i.key ? "" : ("" + i.key).replace(zg, "$&/") + "/") + e)), t.push(i)), 1;
    if (a = 0, r = r === "" ? "." : r + ":", Ug(e))
      for (var l = 0; l < e.length; l++) {
        o = e[l];
        var s = r + Lf(o, l);
        a += Zs(o, t, n, s, i);
      }
    else if (s = fx(e), typeof s == "function")
      for (e = s.call(e), l = 0; !(o = e.next()).done; )
        o = o.value, s = r + Lf(o, l++), a += Zs(o, t, n, s, i);
    else if (o === "object")
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return a;
  }
  function xs(e, t, n) {
    if (e == null)
      return e;
    var r = [], i = 0;
    return Zs(e, r, "", "", function(o) {
      return t.call(n, o, i++);
    }), r;
  }
  function hx(e) {
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
  var kt = { current: null }, eu = { transition: null }, mx = { ReactCurrentDispatcher: kt, ReactCurrentBatchConfig: eu, ReactCurrentOwner: Fh };
  he.Children = { map: xs, forEach: function(e, t, n) {
    xs(e, function() {
      t.apply(this, arguments);
    }, n);
  }, count: function(e) {
    var t = 0;
    return xs(e, function() {
      t++;
    }), t;
  }, toArray: function(e) {
    return xs(e, function(t) {
      return t;
    }) || [];
  }, only: function(e) {
    if (!Mh(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  } };
  he.Component = ta;
  he.Fragment = nx;
  he.Profiler = ix;
  he.PureComponent = Rh;
  he.StrictMode = rx;
  he.Suspense = sx;
  he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mx;
  he.cloneElement = function(e, t, n) {
    if (e == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = F0({}, e.props), i = e.key, o = e.ref, a = e._owner;
    if (t != null) {
      if (t.ref !== void 0 && (o = t.ref, a = Fh.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
        var l = e.type.defaultProps;
      for (s in t)
        U0.call(t, s) && !z0.hasOwnProperty(s) && (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
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
    return { $$typeof: $l, type: e.type, key: i, ref: o, props: r, _owner: a };
  };
  he.createContext = function(e) {
    return e = { $$typeof: ax, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ox, _context: e }, e.Consumer = e;
  };
  he.createElement = W0;
  he.createFactory = function(e) {
    var t = W0.bind(null, e);
    return t.type = e, t;
  };
  he.createRef = function() {
    return { current: null };
  };
  he.forwardRef = function(e) {
    return { $$typeof: lx, render: e };
  };
  he.isValidElement = Mh;
  he.lazy = function(e) {
    return { $$typeof: cx, _payload: { _status: -1, _result: e }, _init: hx };
  };
  he.memo = function(e, t) {
    return { $$typeof: ux, type: e, compare: t === void 0 ? null : t };
  };
  he.startTransition = function(e) {
    var t = eu.transition;
    eu.transition = {};
    try {
      e();
    } finally {
      eu.transition = t;
    }
  };
  he.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  };
  he.useCallback = function(e, t) {
    return kt.current.useCallback(e, t);
  };
  he.useContext = function(e) {
    return kt.current.useContext(e);
  };
  he.useDebugValue = function() {
  };
  he.useDeferredValue = function(e) {
    return kt.current.useDeferredValue(e);
  };
  he.useEffect = function(e, t) {
    return kt.current.useEffect(e, t);
  };
  he.useId = function() {
    return kt.current.useId();
  };
  he.useImperativeHandle = function(e, t, n) {
    return kt.current.useImperativeHandle(e, t, n);
  };
  he.useInsertionEffect = function(e, t) {
    return kt.current.useInsertionEffect(e, t);
  };
  he.useLayoutEffect = function(e, t) {
    return kt.current.useLayoutEffect(e, t);
  };
  he.useMemo = function(e, t) {
    return kt.current.useMemo(e, t);
  };
  he.useReducer = function(e, t, n) {
    return kt.current.useReducer(e, t, n);
  };
  he.useRef = function(e) {
    return kt.current.useRef(e);
  };
  he.useState = function(e) {
    return kt.current.useState(e);
  };
  he.useSyncExternalStore = function(e, t, n) {
    return kt.current.useSyncExternalStore(e, t, n);
  };
  he.useTransition = function() {
    return kt.current.useTransition();
  };
  he.version = "18.2.0";
  (function(e) {
    e.exports = he;
  })(ex);
  const k = /* @__PURE__ */ Dh(J);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var gx = J, vx = Symbol.for("react.element"), yx = Symbol.for("react.fragment"), wx = Object.prototype.hasOwnProperty, bx = gx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Sx = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j0(e, t, n) {
    var r, i = {}, o = null, a = null;
    n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
    for (r in t)
      wx.call(t, r) && !Sx.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
      for (r in t = e.defaultProps, t)
        i[r] === void 0 && (i[r] = t[r]);
    return { $$typeof: vx, type: e, key: o, ref: a, props: i, _owner: bx.current };
  }
  mc.Fragment = yx;
  mc.jsx = j0;
  mc.jsxs = j0;
  (function(e) {
    e.exports = mc;
  })(ZC);
  const et = yl.Fragment, y = yl.jsx, L = yl.jsxs;
  var oi = {}, Ex = {
    get exports() {
      return oi;
    },
    set exports(e) {
      oi = e;
    }
  }, nn = {}, $p = {}, Ax = {
    get exports() {
      return $p;
    },
    set exports(e) {
      $p = e;
    }
  }, Y0 = {};
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
      var H = B.length;
      B.push(V);
      e:
        for (; 0 < H; ) {
          var x = H - 1 >>> 1, C = B[x];
          if (0 < i(C, V))
            B[x] = V, B[H] = C, H = x;
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
      var V = B[0], H = B.pop();
      if (H !== V) {
        B[0] = H;
        e:
          for (var x = 0, C = B.length, tt = C >>> 1; x < tt; ) {
            var He = 2 * (x + 1) - 1, Qe = B[He], me = He + 1, We = B[me];
            if (0 > i(Qe, H))
              me < C && 0 > i(We, Qe) ? (B[x] = We, B[me] = H, x = me) : (B[x] = Qe, B[He] = H, x = He);
            else if (me < C && 0 > i(We, H))
              B[x] = We, B[me] = H, x = me;
            else
              break e;
          }
      }
      return V;
    }
    function i(B, V) {
      var H = B.sortIndex - V.sortIndex;
      return H !== 0 ? H : B.id - V.id;
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
    var s = [], u = [], c = 1, f = null, p = 3, d = !1, h = !1, m = !1, S = typeof setTimeout == "function" ? setTimeout : null, g = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate != "undefined" ? setImmediate : null;
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
          h = !0, ne(O);
        else {
          var V = n(u);
          V !== null && fe(E, V.startTime - B);
        }
    }
    function O(B, V) {
      h = !1, m && (m = !1, g(T), T = -1), d = !0;
      var H = p;
      try {
        for (w(V), f = n(s); f !== null && (!(f.expirationTime > V) || B && !I()); ) {
          var x = f.callback;
          if (typeof x == "function") {
            f.callback = null, p = f.priorityLevel;
            var C = x(f.expirationTime <= V);
            V = e.unstable_now(), typeof C == "function" ? f.callback = C : f === n(s) && r(s), w(V);
          } else
            r(s);
          f = n(s);
        }
        if (f !== null)
          var tt = !0;
        else {
          var He = n(u);
          He !== null && fe(E, He.startTime - V), tt = !1;
        }
        return tt;
      } finally {
        f = null, p = H, d = !1;
      }
    }
    var b = !1, A = null, T = -1, P = 5, _ = -1;
    function I() {
      return !(e.unstable_now() - _ < P);
    }
    function F() {
      if (A !== null) {
        var B = e.unstable_now();
        _ = B;
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
      var q = new MessageChannel(), oe = q.port2;
      q.port1.onmessage = F, U = function() {
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
      T = S(function() {
        B(e.unstable_now());
      }, V);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, e.unstable_continueExecution = function() {
      h || d || (h = !0, ne(O));
    }, e.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < B ? Math.floor(1e3 / B) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return p;
    }, e.unstable_getFirstCallbackNode = function() {
      return n(s);
    }, e.unstable_next = function(B) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = p;
      }
      var H = p;
      p = V;
      try {
        return B();
      } finally {
        p = H;
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
      var H = p;
      p = B;
      try {
        return V();
      } finally {
        p = H;
      }
    }, e.unstable_scheduleCallback = function(B, V, H) {
      var x = e.unstable_now();
      switch (typeof H == "object" && H !== null ? (H = H.delay, H = typeof H == "number" && 0 < H ? x + H : x) : H = x, B) {
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
      return C = H + C, B = { id: c++, callback: V, priorityLevel: B, startTime: H, expirationTime: C, sortIndex: -1 }, H > x ? (B.sortIndex = H, t(u, B), n(s) === null && B === n(u) && (m ? (g(T), T = -1) : m = !0, fe(E, H - x))) : (B.sortIndex = C, t(s, B), h || d || (h = !0, ne(O))), B;
    }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(B) {
      var V = p;
      return function() {
        var H = p;
        p = V;
        try {
          return B.apply(this, arguments);
        } finally {
          p = H;
        }
      };
    };
  })(Y0);
  (function(e) {
    e.exports = Y0;
  })(Ax);
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var V0 = J, Zt = $p;
  function z(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var G0 = /* @__PURE__ */ new Set(), wl = {};
  function $i(e, t) {
    Fo(e, t), Fo(e + "Capture", t);
  }
  function Fo(e, t) {
    for (wl[e] = t, e = 0; e < t.length; e++)
      G0.add(t[e]);
  }
  var Sr = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), Jp = Object.prototype.hasOwnProperty, Cx = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Wg = {}, jg = {};
  function xx(e) {
    return Jp.call(jg, e) ? !0 : Jp.call(Wg, e) ? !1 : Cx.test(e) ? jg[e] = !0 : (Wg[e] = !0, !1);
  }
  function kx(e, t, n, r) {
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
  function Ox(e, t, n, r) {
    if (t === null || typeof t == "undefined" || kx(e, t, n, r))
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
  var Bh = /[\-:]([a-z])/g;
  function Uh(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Bh,
      Uh
    );
    pt[t] = new Ot(t, 1, !1, e, null, !1, !1);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Bh, Uh);
    pt[t] = new Ot(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Bh, Uh);
    pt[t] = new Ot(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    pt[e] = new Ot(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  pt.xlinkHref = new Ot("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    pt[e] = new Ot(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function zh(e, t, n, r) {
    var i = pt.hasOwnProperty(t) ? pt[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ox(t, n, i, r) && (n = null), r || i === null ? xx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Tr = V0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ks = Symbol.for("react.element"), co = Symbol.for("react.portal"), fo = Symbol.for("react.fragment"), Wh = Symbol.for("react.strict_mode"), Qp = Symbol.for("react.profiler"), H0 = Symbol.for("react.provider"), $0 = Symbol.for("react.context"), jh = Symbol.for("react.forward_ref"), Kp = Symbol.for("react.suspense"), Xp = Symbol.for("react.suspense_list"), Yh = Symbol.for("react.memo"), Lr = Symbol.for("react.lazy"), J0 = Symbol.for("react.offscreen"), Yg = Symbol.iterator;
  function ba(e) {
    return e === null || typeof e != "object" ? null : (e = Yg && e[Yg] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ze = Object.assign, Ff;
  function Wa(e) {
    if (Ff === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ff = t && t[1] || "";
      }
    return `
` + Ff + e;
  }
  var Mf = !1;
  function Bf(e, t) {
    if (!e || Mf)
      return "";
    Mf = !0;
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
      Mf = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? Wa(e) : "";
  }
  function Tx(e) {
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
        return e = Bf(e.type, !1), e;
      case 11:
        return e = Bf(e.type.render, !1), e;
      case 1:
        return e = Bf(e.type, !0), e;
      default:
        return "";
    }
  }
  function qp(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case fo:
        return "Fragment";
      case co:
        return "Portal";
      case Qp:
        return "Profiler";
      case Wh:
        return "StrictMode";
      case Kp:
        return "Suspense";
      case Xp:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case $0:
          return (e.displayName || "Context") + ".Consumer";
        case H0:
          return (e._context.displayName || "Context") + ".Provider";
        case jh:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Yh:
          return t = e.displayName || null, t !== null ? t : qp(e.type) || "Memo";
        case Lr:
          t = e._payload, e = e._init;
          try {
            return qp(e(t));
          } catch (n) {
          }
      }
    return null;
  }
  function Ix(e) {
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
        return qp(t);
      case 8:
        return t === Wh ? "StrictMode" : "Mode";
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
  function ai(e) {
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
  function Q0(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Px(e) {
    var t = Q0(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  function Os(e) {
    e._valueTracker || (e._valueTracker = Px(e));
  }
  function K0(e) {
    if (!e)
      return !1;
    var t = e._valueTracker;
    if (!t)
      return !0;
    var n = t.getValue(), r = "";
    return e && (r = Q0(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function bu(e) {
    if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined")
      return null;
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  function Zp(e, t) {
    var n = t.checked;
    return ze({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
  }
  function Vg(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = ai(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function X0(e, t) {
    t = t.checked, t != null && zh(e, "checked", t, !1);
  }
  function ed(e, t) {
    X0(e, t);
    var n = ai(t.value), r = t.type;
    if (n != null)
      r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? td(e, t.type, n) : t.hasOwnProperty("defaultValue") && td(e, t.type, ai(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
  function td(e, t, n) {
    (t !== "number" || bu(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var ja = Array.isArray;
  function Co(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++)
        t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ai(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function nd(e, t) {
    if (t.dangerouslySetInnerHTML != null)
      throw Error(z(91));
    return ze({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Hg(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null)
          throw Error(z(92));
        if (ja(n)) {
          if (1 < n.length)
            throw Error(z(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: ai(n) };
  }
  function q0(e, t) {
    var n = ai(t.value), r = ai(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function $g(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Z0(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function rd(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Z0(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Ts, ew = function(e) {
    return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  }(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (Ts = Ts || document.createElement("div"), Ts.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ts.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; t.firstChild; )
        e.appendChild(t.firstChild);
    }
  });
  function bl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var qa = {
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
  }, _x = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qa).forEach(function(e) {
    _x.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), qa[t] = qa[e];
    });
  });
  function tw(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || qa.hasOwnProperty(e) && qa[e] ? ("" + t).trim() : t + "px";
  }
  function nw(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0, i = tw(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
      }
  }
  var Nx = ze({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function id(e, t) {
    if (t) {
      if (Nx[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
  function od(e, t) {
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
  var ad = null;
  function Vh(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ld = null, xo = null, ko = null;
  function Jg(e) {
    if (e = Kl(e)) {
      if (typeof ld != "function")
        throw Error(z(280));
      var t = e.stateNode;
      t && (t = bc(t), ld(e.stateNode, e.type, t));
    }
  }
  function rw(e) {
    xo ? ko ? ko.push(e) : ko = [e] : xo = e;
  }
  function iw() {
    if (xo) {
      var e = xo, t = ko;
      if (ko = xo = null, Jg(e), t)
        for (e = 0; e < t.length; e++)
          Jg(t[e]);
    }
  }
  function ow(e, t) {
    return e(t);
  }
  function aw() {
  }
  var Uf = !1;
  function lw(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return ow(e, t, n);
    } finally {
      Uf = !1, (xo !== null || ko !== null) && (aw(), iw());
    }
  }
  function Sl(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var r = bc(n);
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
  var sd = !1;
  if (Sr)
    try {
      var Sa = {};
      Object.defineProperty(Sa, "passive", { get: function() {
        sd = !0;
      } }), window.addEventListener("test", Sa, Sa), window.removeEventListener("test", Sa, Sa);
    } catch (e) {
      sd = !1;
    }
  function Dx(e, t, n, r, i, o, a, l, s) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (c) {
      this.onError(c);
    }
  }
  var Za = !1, Su = null, Eu = !1, ud = null, Rx = { onError: function(e) {
    Za = !0, Su = e;
  } };
  function Lx(e, t, n, r, i, o, a, l, s) {
    Za = !1, Su = null, Dx.apply(Rx, arguments);
  }
  function Fx(e, t, n, r, i, o, a, l, s) {
    if (Lx.apply(this, arguments), Za) {
      if (Za) {
        var u = Su;
        Za = !1, Su = null;
      } else
        throw Error(z(198));
      Eu || (Eu = !0, ud = u);
    }
  }
  function Ji(e) {
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
  function sw(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function Qg(e) {
    if (Ji(e) !== e)
      throw Error(z(188));
  }
  function Mx(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Ji(e), t === null)
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
            return Qg(i), e;
          if (o === r)
            return Qg(i), t;
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
  function uw(e) {
    return e = Mx(e), e !== null ? cw(e) : null;
  }
  function cw(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      var t = cw(e);
      if (t !== null)
        return t;
      e = e.sibling;
    }
    return null;
  }
  var fw = Zt.unstable_scheduleCallback, Kg = Zt.unstable_cancelCallback, Bx = Zt.unstable_shouldYield, Ux = Zt.unstable_requestPaint, Je = Zt.unstable_now, zx = Zt.unstable_getCurrentPriorityLevel, Gh = Zt.unstable_ImmediatePriority, pw = Zt.unstable_UserBlockingPriority, Au = Zt.unstable_NormalPriority, Wx = Zt.unstable_LowPriority, dw = Zt.unstable_IdlePriority, gc = null, Xn = null;
  function jx(e) {
    if (Xn && typeof Xn.onCommitFiberRoot == "function")
      try {
        Xn.onCommitFiberRoot(gc, e, void 0, (e.current.flags & 128) === 128);
      } catch (t) {
      }
  }
  var Fn = Math.clz32 ? Math.clz32 : Gx, Yx = Math.log, Vx = Math.LN2;
  function Gx(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yx(e) / Vx | 0) | 0;
  }
  var Is = 64, Ps = 4194304;
  function Ya(e) {
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
  function Cu(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
      return 0;
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
    if (a !== 0) {
      var l = a & ~i;
      l !== 0 ? r = Ya(l) : (o &= a, o !== 0 && (r = Ya(o)));
    } else
      a = n & ~i, a !== 0 ? r = Ya(a) : o !== 0 && (r = Ya(o));
    if (r === 0)
      return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0))
      return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
      for (e = e.entanglements, t &= r; 0 < t; )
        n = 31 - Fn(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function Hx(e, t) {
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
  function $x(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var a = 31 - Fn(o), l = 1 << a, s = i[a];
      s === -1 ? (!(l & n) || l & r) && (i[a] = Hx(l, t)) : s <= t && (e.expiredLanes |= l), o &= ~l;
    }
  }
  function cd(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function hw() {
    var e = Is;
    return Is <<= 1, !(Is & 4194240) && (Is = 64), e;
  }
  function zf(e) {
    for (var t = [], n = 0; 31 > n; n++)
      t.push(e);
    return t;
  }
  function Jl(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fn(t), e[t] = n;
  }
  function Jx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - Fn(n), o = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
    }
  }
  function Hh(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - Fn(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var ye = 0;
  function mw(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var gw, $h, vw, yw, ww, fd = !1, _s = [], Jr = null, Qr = null, Kr = null, El = /* @__PURE__ */ new Map(), Al = /* @__PURE__ */ new Map(), Br = [], Qx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Xg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Jr = null;
        break;
      case "dragenter":
      case "dragleave":
        Qr = null;
        break;
      case "mouseover":
      case "mouseout":
        Kr = null;
        break;
      case "pointerover":
      case "pointerout":
        El.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Al.delete(t.pointerId);
    }
  }
  function Ea(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Kl(t), t !== null && $h(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Kx(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return Jr = Ea(Jr, e, t, n, r, i), !0;
      case "dragenter":
        return Qr = Ea(Qr, e, t, n, r, i), !0;
      case "mouseover":
        return Kr = Ea(Kr, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return El.set(o, Ea(El.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, Al.set(o, Ea(Al.get(o) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function bw(e) {
    var t = Pi(e.target);
    if (t !== null) {
      var n = Ji(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = sw(n), t !== null) {
            e.blockedOn = t, ww(e.priority, function() {
              vw(n);
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
  function tu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = pd(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ad = r, n.target.dispatchEvent(r), ad = null;
      } else
        return t = Kl(n), t !== null && $h(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function qg(e, t, n) {
    tu(e) && n.delete(t);
  }
  function Xx() {
    fd = !1, Jr !== null && tu(Jr) && (Jr = null), Qr !== null && tu(Qr) && (Qr = null), Kr !== null && tu(Kr) && (Kr = null), El.forEach(qg), Al.forEach(qg);
  }
  function Aa(e, t) {
    e.blockedOn === t && (e.blockedOn = null, fd || (fd = !0, Zt.unstable_scheduleCallback(Zt.unstable_NormalPriority, Xx)));
  }
  function Cl(e) {
    function t(i) {
      return Aa(i, e);
    }
    if (0 < _s.length) {
      Aa(_s[0], e);
      for (var n = 1; n < _s.length; n++) {
        var r = _s[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Jr !== null && Aa(Jr, e), Qr !== null && Aa(Qr, e), Kr !== null && Aa(Kr, e), El.forEach(t), Al.forEach(t), n = 0; n < Br.length; n++)
      r = Br[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Br.length && (n = Br[0], n.blockedOn === null); )
      bw(n), n.blockedOn === null && Br.shift();
  }
  var Oo = Tr.ReactCurrentBatchConfig, xu = !0;
  function qx(e, t, n, r) {
    var i = ye, o = Oo.transition;
    Oo.transition = null;
    try {
      ye = 1, Jh(e, t, n, r);
    } finally {
      ye = i, Oo.transition = o;
    }
  }
  function Zx(e, t, n, r) {
    var i = ye, o = Oo.transition;
    Oo.transition = null;
    try {
      ye = 4, Jh(e, t, n, r);
    } finally {
      ye = i, Oo.transition = o;
    }
  }
  function Jh(e, t, n, r) {
    if (xu) {
      var i = pd(e, t, n, r);
      if (i === null)
        Kf(e, t, r, ku, n), Xg(e, r);
      else if (Kx(i, e, t, n, r))
        r.stopPropagation();
      else if (Xg(e, r), t & 4 && -1 < Qx.indexOf(e)) {
        for (; i !== null; ) {
          var o = Kl(i);
          if (o !== null && gw(o), o = pd(e, t, n, r), o === null && Kf(e, t, r, ku, n), o === i)
            break;
          i = o;
        }
        i !== null && r.stopPropagation();
      } else
        Kf(e, t, r, null, n);
    }
  }
  var ku = null;
  function pd(e, t, n, r) {
    if (ku = null, e = Vh(r), e = Pi(e), e !== null)
      if (t = Ji(e), t === null)
        e = null;
      else if (n = t.tag, n === 13) {
        if (e = sw(t), e !== null)
          return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else
        t !== e && (e = null);
    return ku = e, null;
  }
  function Sw(e) {
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
        switch (zx()) {
          case Gh:
            return 1;
          case pw:
            return 4;
          case Au:
          case Wx:
            return 16;
          case dw:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Gr = null, Qh = null, nu = null;
  function Ew() {
    if (nu)
      return nu;
    var e, t = Qh, n = t.length, r, i = "value" in Gr ? Gr.value : Gr.textContent, o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++)
      ;
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === i[o - r]; r++)
      ;
    return nu = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function ru(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ns() {
    return !0;
  }
  function Zg() {
    return !1;
  }
  function rn(e) {
    function t(n, r, i, o, a) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
      for (var l in e)
        e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ns : Zg, this.isPropagationStopped = Zg, this;
    }
    return ze(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ns);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ns);
    }, persist: function() {
    }, isPersistent: Ns }), t;
  }
  var na = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Kh = rn(na), Ql = ze({}, na, { view: 0, detail: 0 }), e2 = rn(Ql), Wf, jf, Ca, vc = ze({}, Ql, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Xh, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Ca && (Ca && e.type === "mousemove" ? (Wf = e.screenX - Ca.screenX, jf = e.screenY - Ca.screenY) : jf = Wf = 0, Ca = e), Wf);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : jf;
  } }), ev = rn(vc), t2 = ze({}, vc, { dataTransfer: 0 }), n2 = rn(t2), r2 = ze({}, Ql, { relatedTarget: 0 }), Yf = rn(r2), i2 = ze({}, na, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), o2 = rn(i2), a2 = ze({}, na, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), l2 = rn(a2), s2 = ze({}, na, { data: 0 }), tv = rn(s2), u2 = {
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
  }, c2 = {
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
  }, f2 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function p2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = f2[e]) ? !!t[e] : !1;
  }
  function Xh() {
    return p2;
  }
  var d2 = ze({}, Ql, { key: function(e) {
    if (e.key) {
      var t = u2[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    return e.type === "keypress" ? (e = ru(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? c2[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Xh, charCode: function(e) {
    return e.type === "keypress" ? ru(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ru(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), h2 = rn(d2), m2 = ze({}, vc, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), nv = rn(m2), g2 = ze({}, Ql, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Xh }), v2 = rn(g2), y2 = ze({}, na, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), w2 = rn(y2), b2 = ze({}, vc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), S2 = rn(b2), E2 = [9, 13, 27, 32], qh = Sr && "CompositionEvent" in window, el = null;
  Sr && "documentMode" in document && (el = document.documentMode);
  var A2 = Sr && "TextEvent" in window && !el, Aw = Sr && (!qh || el && 8 < el && 11 >= el), rv = String.fromCharCode(32), iv = !1;
  function Cw(e, t) {
    switch (e) {
      case "keyup":
        return E2.indexOf(t.keyCode) !== -1;
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
  function xw(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var po = !1;
  function C2(e, t) {
    switch (e) {
      case "compositionend":
        return xw(t);
      case "keypress":
        return t.which !== 32 ? null : (iv = !0, rv);
      case "textInput":
        return e = t.data, e === rv && iv ? null : e;
      default:
        return null;
    }
  }
  function x2(e, t) {
    if (po)
      return e === "compositionend" || !qh && Cw(e, t) ? (e = Ew(), nu = Qh = Gr = null, po = !1, e) : null;
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
        return Aw && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var k2 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function ov(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!k2[e.type] : t === "textarea";
  }
  function kw(e, t, n, r) {
    rw(r), t = Ou(t, "onChange"), 0 < t.length && (n = new Kh("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var tl = null, xl = null;
  function O2(e) {
    Mw(e, 0);
  }
  function yc(e) {
    var t = go(e);
    if (K0(t))
      return e;
  }
  function T2(e, t) {
    if (e === "change")
      return t;
  }
  var Ow = !1;
  if (Sr) {
    var Vf;
    if (Sr) {
      var Gf = "oninput" in document;
      if (!Gf) {
        var av = document.createElement("div");
        av.setAttribute("oninput", "return;"), Gf = typeof av.oninput == "function";
      }
      Vf = Gf;
    } else
      Vf = !1;
    Ow = Vf && (!document.documentMode || 9 < document.documentMode);
  }
  function lv() {
    tl && (tl.detachEvent("onpropertychange", Tw), xl = tl = null);
  }
  function Tw(e) {
    if (e.propertyName === "value" && yc(xl)) {
      var t = [];
      kw(t, xl, e, Vh(e)), lw(O2, t);
    }
  }
  function I2(e, t, n) {
    e === "focusin" ? (lv(), tl = t, xl = n, tl.attachEvent("onpropertychange", Tw)) : e === "focusout" && lv();
  }
  function P2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return yc(xl);
  }
  function _2(e, t) {
    if (e === "click")
      return yc(t);
  }
  function N2(e, t) {
    if (e === "input" || e === "change")
      return yc(t);
  }
  function D2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Bn = typeof Object.is == "function" ? Object.is : D2;
  function kl(e, t) {
    if (Bn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length)
      return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Jp.call(t, i) || !Bn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function sv(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function uv(e, t) {
    var n = sv(e);
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
      n = sv(n);
    }
  }
  function Iw(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Iw(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Pw() {
    for (var e = window, t = bu(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch (r) {
        n = !1;
      }
      if (n)
        e = t.contentWindow;
      else
        break;
      t = bu(e.document);
    }
    return t;
  }
  function Zh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function R2(e) {
    var t = Pw(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Iw(n.ownerDocument.documentElement, n)) {
      if (r !== null && Zh(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
          n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = uv(n, o);
          var a = uv(
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
  var L2 = Sr && "documentMode" in document && 11 >= document.documentMode, ho = null, dd = null, nl = null, hd = !1;
  function cv(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    hd || ho == null || ho !== bu(r) || (r = ho, "selectionStart" in r && Zh(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), nl && kl(nl, r) || (nl = r, r = Ou(dd, "onSelect"), 0 < r.length && (t = new Kh("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ho)));
  }
  function Ds(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var mo = { animationend: Ds("Animation", "AnimationEnd"), animationiteration: Ds("Animation", "AnimationIteration"), animationstart: Ds("Animation", "AnimationStart"), transitionend: Ds("Transition", "TransitionEnd") }, Hf = {}, _w = {};
  Sr && (_w = document.createElement("div").style, "AnimationEvent" in window || (delete mo.animationend.animation, delete mo.animationiteration.animation, delete mo.animationstart.animation), "TransitionEvent" in window || delete mo.transitionend.transition);
  function wc(e) {
    if (Hf[e])
      return Hf[e];
    if (!mo[e])
      return e;
    var t = mo[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in _w)
        return Hf[e] = t[n];
    return e;
  }
  var Nw = wc("animationend"), Dw = wc("animationiteration"), Rw = wc("animationstart"), Lw = wc("transitionend"), Fw = /* @__PURE__ */ new Map(), fv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function pi(e, t) {
    Fw.set(e, t), $i(t, [e]);
  }
  for (var $f = 0; $f < fv.length; $f++) {
    var Jf = fv[$f], F2 = Jf.toLowerCase(), M2 = Jf[0].toUpperCase() + Jf.slice(1);
    pi(F2, "on" + M2);
  }
  pi(Nw, "onAnimationEnd");
  pi(Dw, "onAnimationIteration");
  pi(Rw, "onAnimationStart");
  pi("dblclick", "onDoubleClick");
  pi("focusin", "onFocus");
  pi("focusout", "onBlur");
  pi(Lw, "onTransitionEnd");
  Fo("onMouseEnter", ["mouseout", "mouseover"]);
  Fo("onMouseLeave", ["mouseout", "mouseover"]);
  Fo("onPointerEnter", ["pointerout", "pointerover"]);
  Fo("onPointerLeave", ["pointerout", "pointerover"]);
  $i("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  $i("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  $i("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  $i("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  $i("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  $i("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Va = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), B2 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Va));
  function pv(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Fx(r, t, void 0, e), e.currentTarget = null;
  }
  function Mw(e, t) {
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
            pv(i, l, u), o = s;
          }
        else
          for (a = 0; a < r.length; a++) {
            if (l = r[a], s = l.instance, u = l.currentTarget, l = l.listener, s !== o && i.isPropagationStopped())
              break e;
            pv(i, l, u), o = s;
          }
      }
    }
    if (Eu)
      throw e = ud, Eu = !1, ud = null, e;
  }
  function Oe(e, t) {
    var n = t[wd];
    n === void 0 && (n = t[wd] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Bw(t, e, 2, !1), n.add(r));
  }
  function Qf(e, t, n) {
    var r = 0;
    t && (r |= 4), Bw(n, e, r, t);
  }
  var Rs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ol(e) {
    if (!e[Rs]) {
      e[Rs] = !0, G0.forEach(function(n) {
        n !== "selectionchange" && (B2.has(n) || Qf(n, !1, e), Qf(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Rs] || (t[Rs] = !0, Qf("selectionchange", !1, t));
    }
  }
  function Bw(e, t, n, r) {
    switch (Sw(t)) {
      case 1:
        var i = qx;
        break;
      case 4:
        i = Zx;
        break;
      default:
        i = Jh;
    }
    n = i.bind(null, t, n, e), i = void 0, !sd || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function Kf(e, t, n, r, i) {
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
              if (a = Pi(l), a === null)
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
    lw(function() {
      var u = o, c = Vh(n), f = [];
      e: {
        var p = Fw.get(e);
        if (p !== void 0) {
          var d = Kh, h = e;
          switch (e) {
            case "keypress":
              if (ru(n) === 0)
                break e;
            case "keydown":
            case "keyup":
              d = h2;
              break;
            case "focusin":
              h = "focus", d = Yf;
              break;
            case "focusout":
              h = "blur", d = Yf;
              break;
            case "beforeblur":
            case "afterblur":
              d = Yf;
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
              d = ev;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              d = n2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              d = v2;
              break;
            case Nw:
            case Dw:
            case Rw:
              d = o2;
              break;
            case Lw:
              d = w2;
              break;
            case "scroll":
              d = e2;
              break;
            case "wheel":
              d = S2;
              break;
            case "copy":
            case "cut":
            case "paste":
              d = l2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              d = nv;
          }
          var m = (t & 4) !== 0, S = !m && e === "scroll", g = m ? p !== null ? p + "Capture" : null : p;
          m = [];
          for (var v = u, w; v !== null; ) {
            w = v;
            var E = w.stateNode;
            if (w.tag === 5 && E !== null && (w = E, g !== null && (E = Sl(v, g), E != null && m.push(Tl(v, E, w)))), S)
              break;
            v = v.return;
          }
          0 < m.length && (p = new d(p, h, null, n, c), f.push({ event: p, listeners: m }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (p = e === "mouseover" || e === "pointerover", d = e === "mouseout" || e === "pointerout", p && n !== ad && (h = n.relatedTarget || n.fromElement) && (Pi(h) || h[Er]))
            break e;
          if ((d || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, d ? (h = n.relatedTarget || n.toElement, d = u, h = h ? Pi(h) : null, h !== null && (S = Ji(h), h !== S || h.tag !== 5 && h.tag !== 6) && (h = null)) : (d = null, h = u), d !== h)) {
            if (m = ev, E = "onMouseLeave", g = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (m = nv, E = "onPointerLeave", g = "onPointerEnter", v = "pointer"), S = d == null ? p : go(d), w = h == null ? p : go(h), p = new m(E, v + "leave", d, n, c), p.target = S, p.relatedTarget = w, E = null, Pi(c) === u && (m = new m(g, v + "enter", h, n, c), m.target = w, m.relatedTarget = S, E = m), S = E, d && h)
              t: {
                for (m = d, g = h, v = 0, w = m; w; w = io(w))
                  v++;
                for (w = 0, E = g; E; E = io(E))
                  w++;
                for (; 0 < v - w; )
                  m = io(m), v--;
                for (; 0 < w - v; )
                  g = io(g), w--;
                for (; v--; ) {
                  if (m === g || g !== null && m === g.alternate)
                    break t;
                  m = io(m), g = io(g);
                }
                m = null;
              }
            else
              m = null;
            d !== null && dv(f, p, d, m, !1), h !== null && S !== null && dv(f, S, h, m, !0);
          }
        }
        e: {
          if (p = u ? go(u) : window, d = p.nodeName && p.nodeName.toLowerCase(), d === "select" || d === "input" && p.type === "file")
            var O = T2;
          else if (ov(p))
            if (Ow)
              O = N2;
            else {
              O = P2;
              var b = I2;
            }
          else
            (d = p.nodeName) && d.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (O = _2);
          if (O && (O = O(e, u))) {
            kw(f, O, n, c);
            break e;
          }
          b && b(e, p, u), e === "focusout" && (b = p._wrapperState) && b.controlled && p.type === "number" && td(p, "number", p.value);
        }
        switch (b = u ? go(u) : window, e) {
          case "focusin":
            (ov(b) || b.contentEditable === "true") && (ho = b, dd = u, nl = null);
            break;
          case "focusout":
            nl = dd = ho = null;
            break;
          case "mousedown":
            hd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hd = !1, cv(f, n, c);
            break;
          case "selectionchange":
            if (L2)
              break;
          case "keydown":
          case "keyup":
            cv(f, n, c);
        }
        var A;
        if (qh)
          e: {
            switch (e) {
              case "compositionstart":
                var T = "onCompositionStart";
                break e;
              case "compositionend":
                T = "onCompositionEnd";
                break e;
              case "compositionupdate":
                T = "onCompositionUpdate";
                break e;
            }
            T = void 0;
          }
        else
          po ? Cw(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
        T && (Aw && n.locale !== "ko" && (po || T !== "onCompositionStart" ? T === "onCompositionEnd" && po && (A = Ew()) : (Gr = c, Qh = "value" in Gr ? Gr.value : Gr.textContent, po = !0)), b = Ou(u, T), 0 < b.length && (T = new tv(T, e, null, n, c), f.push({ event: T, listeners: b }), A ? T.data = A : (A = xw(n), A !== null && (T.data = A)))), (A = A2 ? C2(e, n) : x2(e, n)) && (u = Ou(u, "onBeforeInput"), 0 < u.length && (c = new tv("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = A));
      }
      Mw(f, t);
    });
  }
  function Tl(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ou(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, o = i.stateNode;
      i.tag === 5 && o !== null && (i = o, o = Sl(e, n), o != null && r.unshift(Tl(e, o, i)), o = Sl(e, t), o != null && r.push(Tl(e, o, i))), e = e.return;
    }
    return r;
  }
  function io(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function dv(e, t, n, r, i) {
    for (var o = t._reactName, a = []; n !== null && n !== r; ) {
      var l = n, s = l.alternate, u = l.stateNode;
      if (s !== null && s === r)
        break;
      l.tag === 5 && u !== null && (l = u, i ? (s = Sl(n, o), s != null && a.unshift(Tl(n, s, l))) : i || (s = Sl(n, o), s != null && a.push(Tl(n, s, l)))), n = n.return;
    }
    a.length !== 0 && e.push({ event: t, listeners: a });
  }
  var U2 = /\r\n?/g, z2 = /\u0000|\uFFFD/g;
  function hv(e) {
    return (typeof e == "string" ? e : "" + e).replace(U2, `
`).replace(z2, "");
  }
  function Ls(e, t, n) {
    if (t = hv(t), hv(e) !== t && n)
      throw Error(z(425));
  }
  function Tu() {
  }
  var md = null, gd = null;
  function vd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var yd = typeof setTimeout == "function" ? setTimeout : void 0, W2 = typeof clearTimeout == "function" ? clearTimeout : void 0, mv = typeof Promise == "function" ? Promise : void 0, j2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof mv != "undefined" ? function(e) {
    return mv.resolve(null).then(e).catch(Y2);
  } : yd;
  function Y2(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Xf(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (r === 0) {
            e.removeChild(i), Cl(t);
            return;
          }
          r--;
        } else
          n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    Cl(t);
  }
  function Xr(e) {
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
  function gv(e) {
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
  var ra = Math.random().toString(36).slice(2), $n = "__reactFiber$" + ra, Il = "__reactProps$" + ra, Er = "__reactContainer$" + ra, wd = "__reactEvents$" + ra, V2 = "__reactListeners$" + ra, G2 = "__reactHandles$" + ra;
  function Pi(e) {
    var t = e[$n];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Er] || n[$n]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = gv(e); e !== null; ) {
            if (n = e[$n])
              return n;
            e = gv(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Kl(e) {
    return e = e[$n] || e[Er], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function go(e) {
    if (e.tag === 5 || e.tag === 6)
      return e.stateNode;
    throw Error(z(33));
  }
  function bc(e) {
    return e[Il] || null;
  }
  var bd = [], vo = -1;
  function di(e) {
    return { current: e };
  }
  function Ie(e) {
    0 > vo || (e.current = bd[vo], bd[vo] = null, vo--);
  }
  function ke(e, t) {
    vo++, bd[vo] = e.current, e.current = t;
  }
  var li = {}, St = di(li), Ft = di(!1), Ui = li;
  function Mo(e, t) {
    var n = e.type.contextTypes;
    if (!n)
      return li;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, o;
    for (o in n)
      i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function Mt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Iu() {
    Ie(Ft), Ie(St);
  }
  function vv(e, t, n) {
    if (St.current !== li)
      throw Error(z(168));
    ke(St, t), ke(Ft, n);
  }
  function Uw(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function")
      return n;
    r = r.getChildContext();
    for (var i in r)
      if (!(i in t))
        throw Error(z(108, Ix(e) || "Unknown", i));
    return ze({}, n, r);
  }
  function Pu(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || li, Ui = St.current, ke(St, e), ke(Ft, Ft.current), !0;
  }
  function yv(e, t, n) {
    var r = e.stateNode;
    if (!r)
      throw Error(z(169));
    n ? (e = Uw(e, t, Ui), r.__reactInternalMemoizedMergedChildContext = e, Ie(Ft), Ie(St), ke(St, e)) : Ie(Ft), ke(Ft, n);
  }
  var pr = null, Sc = !1, qf = !1;
  function zw(e) {
    pr === null ? pr = [e] : pr.push(e);
  }
  function H2(e) {
    Sc = !0, zw(e);
  }
  function hi() {
    if (!qf && pr !== null) {
      qf = !0;
      var e = 0, t = ye;
      try {
        var n = pr;
        for (ye = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        pr = null, Sc = !1;
      } catch (i) {
        throw pr !== null && (pr = pr.slice(e + 1)), fw(Gh, hi), i;
      } finally {
        ye = t, qf = !1;
      }
    }
    return null;
  }
  var yo = [], wo = 0, _u = null, Nu = 0, ln = [], sn = 0, zi = null, gr = 1, vr = "";
  function xi(e, t) {
    yo[wo++] = Nu, yo[wo++] = _u, _u = e, Nu = t;
  }
  function Ww(e, t, n) {
    ln[sn++] = gr, ln[sn++] = vr, ln[sn++] = zi, zi = e;
    var r = gr;
    e = vr;
    var i = 32 - Fn(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - Fn(t) + i;
    if (30 < o) {
      var a = i - i % 5;
      o = (r & (1 << a) - 1).toString(32), r >>= a, i -= a, gr = 1 << 32 - Fn(t) + i | n << i | r, vr = o + e;
    } else
      gr = 1 << o | n << i | r, vr = e;
  }
  function em(e) {
    e.return !== null && (xi(e, 1), Ww(e, 1, 0));
  }
  function tm(e) {
    for (; e === _u; )
      _u = yo[--wo], yo[wo] = null, Nu = yo[--wo], yo[wo] = null;
    for (; e === zi; )
      zi = ln[--sn], ln[sn] = null, vr = ln[--sn], ln[sn] = null, gr = ln[--sn], ln[sn] = null;
  }
  var qt = null, Qt = null, Re = !1, Rn = null;
  function jw(e, t) {
    var n = cn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function wv(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, qt = e, Qt = Xr(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, qt = e, Qt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = zi !== null ? { id: gr, overflow: vr } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = cn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, qt = e, Qt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Sd(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Ed(e) {
    if (Re) {
      var t = Qt;
      if (t) {
        var n = t;
        if (!wv(e, t)) {
          if (Sd(e))
            throw Error(z(418));
          t = Xr(n.nextSibling);
          var r = qt;
          t && wv(e, t) ? jw(r, n) : (e.flags = e.flags & -4097 | 2, Re = !1, qt = e);
        }
      } else {
        if (Sd(e))
          throw Error(z(418));
        e.flags = e.flags & -4097 | 2, Re = !1, qt = e;
      }
    }
  }
  function bv(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
      e = e.return;
    qt = e;
  }
  function Fs(e) {
    if (e !== qt)
      return !1;
    if (!Re)
      return bv(e), Re = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !vd(e.type, e.memoizedProps)), t && (t = Qt)) {
      if (Sd(e))
        throw Yw(), Error(z(418));
      for (; t; )
        jw(e, t), t = Xr(t.nextSibling);
    }
    if (bv(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(z(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Qt = Xr(e.nextSibling);
                break e;
              }
              t--;
            } else
              n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Qt = null;
      }
    } else
      Qt = qt ? Xr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Yw() {
    for (var e = Qt; e; )
      e = Xr(e.nextSibling);
  }
  function Bo() {
    Qt = qt = null, Re = !1;
  }
  function nm(e) {
    Rn === null ? Rn = [e] : Rn.push(e);
  }
  var $2 = Tr.ReactCurrentBatchConfig;
  function _n(e, t) {
    if (e && e.defaultProps) {
      t = ze({}, t), e = e.defaultProps;
      for (var n in e)
        t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var Du = di(null), Ru = null, bo = null, rm = null;
  function im() {
    rm = bo = Ru = null;
  }
  function om(e) {
    var t = Du.current;
    Ie(Du), e._currentValue = t;
  }
  function Ad(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
        break;
      e = e.return;
    }
  }
  function To(e, t) {
    Ru = e, rm = bo = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Rt = !0), e.firstContext = null);
  }
  function mn(e) {
    var t = e._currentValue;
    if (rm !== e)
      if (e = { context: e, memoizedValue: t, next: null }, bo === null) {
        if (Ru === null)
          throw Error(z(308));
        bo = e, Ru.dependencies = { lanes: 0, firstContext: e };
      } else
        bo = bo.next = e;
    return t;
  }
  var _i = null;
  function am(e) {
    _i === null ? _i = [e] : _i.push(e);
  }
  function Vw(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, am(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Ar(e, r);
  }
  function Ar(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Fr = !1;
  function lm(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Gw(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function yr(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function qr(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
      return null;
    if (r = r.shared, ve & 2) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Ar(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, am(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Ar(e, n);
  }
  function iu(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Hh(e, n);
    }
  }
  function Sv(e, t) {
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
  function Lu(e, t, n, r) {
    var i = e.updateQueue;
    Fr = !1;
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
        var p = l.lane, d = l.eventTime;
        if ((r & p) === p) {
          c !== null && (c = c.next = {
            eventTime: d,
            lane: 0,
            tag: l.tag,
            payload: l.payload,
            callback: l.callback,
            next: null
          });
          e: {
            var h = e, m = l;
            switch (p = t, d = n, m.tag) {
              case 1:
                if (h = m.payload, typeof h == "function") {
                  f = h.call(d, f, p);
                  break e;
                }
                f = h;
                break e;
              case 3:
                h.flags = h.flags & -65537 | 128;
              case 0:
                if (h = m.payload, p = typeof h == "function" ? h.call(d, f, p) : h, p == null)
                  break e;
                f = ze({}, f, p);
                break e;
              case 2:
                Fr = !0;
            }
          }
          l.callback !== null && l.lane !== 0 && (e.flags |= 64, p = i.effects, p === null ? i.effects = [l] : p.push(l));
        } else
          d = { eventTime: d, lane: p, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (u = c = d, s = f) : c = c.next = d, a |= p;
        if (l = l.next, l === null) {
          if (l = i.shared.pending, l === null)
            break;
          p = l, l = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
        }
      } while (1);
      if (c === null && (s = f), i.baseState = s, i.firstBaseUpdate = u, i.lastBaseUpdate = c, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          a |= i.lane, i = i.next;
        while (i !== t);
      } else
        o === null && (i.shared.lanes = 0);
      ji |= a, e.lanes = a, e.memoizedState = f;
    }
  }
  function Ev(e, t, n) {
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
  var Hw = new V0.Component().refs;
  function Cd(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : ze({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Ec = { isMounted: function(e) {
    return (e = e._reactInternals) ? Ji(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = xt(), i = ei(e), o = yr(r, i);
    o.payload = t, n != null && (o.callback = n), t = qr(e, o, i), t !== null && (Mn(t, e, i, r), iu(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = xt(), i = ei(e), o = yr(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = qr(e, o, i), t !== null && (Mn(t, e, i, r), iu(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = xt(), r = ei(e), i = yr(n, r);
    i.tag = 2, t != null && (i.callback = t), t = qr(e, i, r), t !== null && (Mn(t, e, r, n), iu(t, e, r));
  } };
  function Av(e, t, n, r, i, o, a) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !kl(n, r) || !kl(i, o) : !0;
  }
  function $w(e, t, n) {
    var r = !1, i = li, o = t.contextType;
    return typeof o == "object" && o !== null ? o = mn(o) : (i = Mt(t) ? Ui : St.current, r = t.contextTypes, o = (r = r != null) ? Mo(e, i) : li), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ec, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function Cv(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ec.enqueueReplaceState(t, t.state, null);
  }
  function xd(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = Hw, lm(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = mn(o) : (o = Mt(t) ? Ui : St.current, i.context = Mo(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Cd(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Ec.enqueueReplaceState(i, i.state, null), Lu(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function xa(e, t, n) {
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
          l === Hw && (l = i.refs = {}), a === null ? delete l[o] : l[o] = a;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string")
        throw Error(z(284));
      if (!n._owner)
        throw Error(z(290, e));
    }
    return e;
  }
  function Ms(e, t) {
    throw e = Object.prototype.toString.call(t), Error(z(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function xv(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Jw(e) {
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
      return g = ti(g, v), g.index = 0, g.sibling = null, g;
    }
    function o(g, v, w) {
      return g.index = w, e ? (w = g.alternate, w !== null ? (w = w.index, w < v ? (g.flags |= 2, v) : w) : (g.flags |= 2, v)) : (g.flags |= 1048576, v);
    }
    function a(g) {
      return e && g.alternate === null && (g.flags |= 2), g;
    }
    function l(g, v, w, E) {
      return v === null || v.tag !== 6 ? (v = op(w, g.mode, E), v.return = g, v) : (v = i(v, w), v.return = g, v);
    }
    function s(g, v, w, E) {
      var O = w.type;
      return O === fo ? c(g, v, w.props.children, E, w.key) : v !== null && (v.elementType === O || typeof O == "object" && O !== null && O.$$typeof === Lr && xv(O) === v.type) ? (E = i(v, w.props), E.ref = xa(g, v, w), E.return = g, E) : (E = cu(w.type, w.key, w.props, null, g.mode, E), E.ref = xa(g, v, w), E.return = g, E);
    }
    function u(g, v, w, E) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== w.containerInfo || v.stateNode.implementation !== w.implementation ? (v = ap(w, g.mode, E), v.return = g, v) : (v = i(v, w.children || []), v.return = g, v);
    }
    function c(g, v, w, E, O) {
      return v === null || v.tag !== 7 ? (v = Ri(w, g.mode, E, O), v.return = g, v) : (v = i(v, w), v.return = g, v);
    }
    function f(g, v, w) {
      if (typeof v == "string" && v !== "" || typeof v == "number")
        return v = op("" + v, g.mode, w), v.return = g, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case ks:
            return w = cu(v.type, v.key, v.props, null, g.mode, w), w.ref = xa(g, null, v), w.return = g, w;
          case co:
            return v = ap(v, g.mode, w), v.return = g, v;
          case Lr:
            var E = v._init;
            return f(g, E(v._payload), w);
        }
        if (ja(v) || ba(v))
          return v = Ri(v, g.mode, w, null), v.return = g, v;
        Ms(g, v);
      }
      return null;
    }
    function p(g, v, w, E) {
      var O = v !== null ? v.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return O !== null ? null : l(g, v, "" + w, E);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ks:
            return w.key === O ? s(g, v, w, E) : null;
          case co:
            return w.key === O ? u(g, v, w, E) : null;
          case Lr:
            return O = w._init, p(
              g,
              v,
              O(w._payload),
              E
            );
        }
        if (ja(w) || ba(w))
          return O !== null ? null : c(g, v, w, E, null);
        Ms(g, w);
      }
      return null;
    }
    function d(g, v, w, E, O) {
      if (typeof E == "string" && E !== "" || typeof E == "number")
        return g = g.get(w) || null, l(v, g, "" + E, O);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ks:
            return g = g.get(E.key === null ? w : E.key) || null, s(v, g, E, O);
          case co:
            return g = g.get(E.key === null ? w : E.key) || null, u(v, g, E, O);
          case Lr:
            var b = E._init;
            return d(g, v, w, b(E._payload), O);
        }
        if (ja(E) || ba(E))
          return g = g.get(w) || null, c(v, g, E, O, null);
        Ms(v, E);
      }
      return null;
    }
    function h(g, v, w, E) {
      for (var O = null, b = null, A = v, T = v = 0, P = null; A !== null && T < w.length; T++) {
        A.index > T ? (P = A, A = null) : P = A.sibling;
        var _ = p(g, A, w[T], E);
        if (_ === null) {
          A === null && (A = P);
          break;
        }
        e && A && _.alternate === null && t(g, A), v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _, A = P;
      }
      if (T === w.length)
        return n(g, A), Re && xi(g, T), O;
      if (A === null) {
        for (; T < w.length; T++)
          A = f(g, w[T], E), A !== null && (v = o(A, v, T), b === null ? O = A : b.sibling = A, b = A);
        return Re && xi(g, T), O;
      }
      for (A = r(g, A); T < w.length; T++)
        P = d(A, g, T, w[T], E), P !== null && (e && P.alternate !== null && A.delete(P.key === null ? T : P.key), v = o(P, v, T), b === null ? O = P : b.sibling = P, b = P);
      return e && A.forEach(function(I) {
        return t(g, I);
      }), Re && xi(g, T), O;
    }
    function m(g, v, w, E) {
      var O = ba(w);
      if (typeof O != "function")
        throw Error(z(150));
      if (w = O.call(w), w == null)
        throw Error(z(151));
      for (var b = O = null, A = v, T = v = 0, P = null, _ = w.next(); A !== null && !_.done; T++, _ = w.next()) {
        A.index > T ? (P = A, A = null) : P = A.sibling;
        var I = p(g, A, _.value, E);
        if (I === null) {
          A === null && (A = P);
          break;
        }
        e && A && I.alternate === null && t(g, A), v = o(I, v, T), b === null ? O = I : b.sibling = I, b = I, A = P;
      }
      if (_.done)
        return n(
          g,
          A
        ), Re && xi(g, T), O;
      if (A === null) {
        for (; !_.done; T++, _ = w.next())
          _ = f(g, _.value, E), _ !== null && (v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _);
        return Re && xi(g, T), O;
      }
      for (A = r(g, A); !_.done; T++, _ = w.next())
        _ = d(A, g, T, _.value, E), _ !== null && (e && _.alternate !== null && A.delete(_.key === null ? T : _.key), v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _);
      return e && A.forEach(function(F) {
        return t(g, F);
      }), Re && xi(g, T), O;
    }
    function S(g, v, w, E) {
      if (typeof w == "object" && w !== null && w.type === fo && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ks:
            e: {
              for (var O = w.key, b = v; b !== null; ) {
                if (b.key === O) {
                  if (O = w.type, O === fo) {
                    if (b.tag === 7) {
                      n(g, b.sibling), v = i(b, w.props.children), v.return = g, g = v;
                      break e;
                    }
                  } else if (b.elementType === O || typeof O == "object" && O !== null && O.$$typeof === Lr && xv(O) === b.type) {
                    n(g, b.sibling), v = i(b, w.props), v.ref = xa(g, b, w), v.return = g, g = v;
                    break e;
                  }
                  n(g, b);
                  break;
                } else
                  t(g, b);
                b = b.sibling;
              }
              w.type === fo ? (v = Ri(w.props.children, g.mode, E, w.key), v.return = g, g = v) : (E = cu(w.type, w.key, w.props, null, g.mode, E), E.ref = xa(g, v, w), E.return = g, g = E);
            }
            return a(g);
          case co:
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
              v = ap(w, g.mode, E), v.return = g, g = v;
            }
            return a(g);
          case Lr:
            return b = w._init, S(g, v, b(w._payload), E);
        }
        if (ja(w))
          return h(g, v, w, E);
        if (ba(w))
          return m(g, v, w, E);
        Ms(g, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? (w = "" + w, v !== null && v.tag === 6 ? (n(g, v.sibling), v = i(v, w), v.return = g, g = v) : (n(g, v), v = op(w, g.mode, E), v.return = g, g = v), a(g)) : n(g, v);
    }
    return S;
  }
  var Uo = Jw(!0), Qw = Jw(!1), Xl = {}, qn = di(Xl), Pl = di(Xl), _l = di(Xl);
  function Ni(e) {
    if (e === Xl)
      throw Error(z(174));
    return e;
  }
  function sm(e, t) {
    switch (ke(_l, t), ke(Pl, e), ke(qn, Xl), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : rd(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = rd(t, e);
    }
    Ie(qn), ke(qn, t);
  }
  function zo() {
    Ie(qn), Ie(Pl), Ie(_l);
  }
  function Kw(e) {
    Ni(_l.current);
    var t = Ni(qn.current), n = rd(t, e.type);
    t !== n && (ke(Pl, e), ke(qn, n));
  }
  function um(e) {
    Pl.current === e && (Ie(qn), Ie(Pl));
  }
  var Me = di(0);
  function Fu(e) {
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
  var Zf = [];
  function cm() {
    for (var e = 0; e < Zf.length; e++)
      Zf[e]._workInProgressVersionPrimary = null;
    Zf.length = 0;
  }
  var ou = Tr.ReactCurrentDispatcher, ep = Tr.ReactCurrentBatchConfig, Wi = 0, Ue = null, nt = null, ot = null, Mu = !1, rl = !1, Nl = 0, J2 = 0;
  function ht() {
    throw Error(z(321));
  }
  function fm(e, t) {
    if (t === null)
      return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Bn(e[n], t[n]))
        return !1;
    return !0;
  }
  function pm(e, t, n, r, i, o) {
    if (Wi = o, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ou.current = e === null || e.memoizedState === null ? q2 : Z2, e = n(r, i), rl) {
      o = 0;
      do {
        if (rl = !1, Nl = 0, 25 <= o)
          throw Error(z(301));
        o += 1, ot = nt = null, t.updateQueue = null, ou.current = ek, e = n(r, i);
      } while (rl);
    }
    if (ou.current = Bu, t = nt !== null && nt.next !== null, Wi = 0, ot = nt = Ue = null, Mu = !1, t)
      throw Error(z(300));
    return e;
  }
  function dm() {
    var e = Nl !== 0;
    return Nl = 0, e;
  }
  function Vn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ot === null ? Ue.memoizedState = ot = e : ot = ot.next = e, ot;
  }
  function gn() {
    if (nt === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else
      e = nt.next;
    var t = ot === null ? Ue.memoizedState : ot.next;
    if (t !== null)
      ot = t, nt = e;
    else {
      if (e === null)
        throw Error(z(310));
      nt = e, e = { memoizedState: nt.memoizedState, baseState: nt.baseState, baseQueue: nt.baseQueue, queue: nt.queue, next: null }, ot === null ? Ue.memoizedState = ot = e : ot = ot.next = e;
    }
    return ot;
  }
  function Dl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function tp(e) {
    var t = gn(), n = t.queue;
    if (n === null)
      throw Error(z(311));
    n.lastRenderedReducer = e;
    var r = nt, i = r.baseQueue, o = n.pending;
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
        if ((Wi & c) === c)
          s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
        else {
          var f = {
            lane: c,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null
          };
          s === null ? (l = s = f, a = r) : s = s.next = f, Ue.lanes |= c, ji |= c;
        }
        u = u.next;
      } while (u !== null && u !== o);
      s === null ? a = r : s.next = l, Bn(r, t.memoizedState) || (Rt = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = s, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, Ue.lanes |= o, ji |= o, i = i.next;
      while (i !== e);
    } else
      i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function np(e) {
    var t = gn(), n = t.queue;
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
      Bn(o, t.memoizedState) || (Rt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Xw() {
  }
  function qw(e, t) {
    var n = Ue, r = gn(), i = t(), o = !Bn(r.memoizedState, i);
    if (o && (r.memoizedState = i, Rt = !0), r = r.queue, hm(tb.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ot !== null && ot.memoizedState.tag & 1) {
      if (n.flags |= 2048, Rl(9, eb.bind(null, n, r, i, t), void 0, null), at === null)
        throw Error(z(349));
      Wi & 30 || Zw(n, t, i);
    }
    return i;
  }
  function Zw(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function eb(e, t, n, r) {
    t.value = n, t.getSnapshot = r, nb(t) && rb(e);
  }
  function tb(e, t, n) {
    return n(function() {
      nb(t) && rb(e);
    });
  }
  function nb(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Bn(e, n);
    } catch (r) {
      return !0;
    }
  }
  function rb(e) {
    var t = Ar(e, 1);
    t !== null && Mn(t, e, 1, -1);
  }
  function kv(e) {
    var t = Vn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Dl, lastRenderedState: e }, t.queue = e, e = e.dispatch = X2.bind(null, Ue, e), [t.memoizedState, e];
  }
  function Rl(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function ib() {
    return gn().memoizedState;
  }
  function au(e, t, n, r) {
    var i = Vn();
    Ue.flags |= e, i.memoizedState = Rl(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Ac(e, t, n, r) {
    var i = gn();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (nt !== null) {
      var a = nt.memoizedState;
      if (o = a.destroy, r !== null && fm(r, a.deps)) {
        i.memoizedState = Rl(t, n, o, r);
        return;
      }
    }
    Ue.flags |= e, i.memoizedState = Rl(1 | t, n, o, r);
  }
  function Ov(e, t) {
    return au(8390656, 8, e, t);
  }
  function hm(e, t) {
    return Ac(2048, 8, e, t);
  }
  function ob(e, t) {
    return Ac(4, 2, e, t);
  }
  function ab(e, t) {
    return Ac(4, 4, e, t);
  }
  function lb(e, t) {
    if (typeof t == "function")
      return e = e(), t(e), function() {
        t(null);
      };
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function sb(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ac(4, 4, lb.bind(null, t, e), n);
  }
  function mm() {
  }
  function ub(e, t) {
    var n = gn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && fm(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function cb(e, t) {
    var n = gn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && fm(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function fb(e, t, n) {
    return Wi & 21 ? (Bn(n, t) || (n = hw(), Ue.lanes |= n, ji |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Rt = !0), e.memoizedState = n);
  }
  function Q2(e, t) {
    var n = ye;
    ye = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = ep.transition;
    ep.transition = {};
    try {
      e(!1), t();
    } finally {
      ye = n, ep.transition = r;
    }
  }
  function pb() {
    return gn().memoizedState;
  }
  function K2(e, t, n) {
    var r = ei(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, db(e))
      hb(t, n);
    else if (n = Vw(e, t, n, r), n !== null) {
      var i = xt();
      Mn(n, e, r, i), mb(n, t, r);
    }
  }
  function X2(e, t, n) {
    var r = ei(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (db(e))
      hb(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
        try {
          var a = t.lastRenderedState, l = o(a, n);
          if (i.hasEagerState = !0, i.eagerState = l, Bn(l, a)) {
            var s = t.interleaved;
            s === null ? (i.next = i, am(t)) : (i.next = s.next, s.next = i), t.interleaved = i;
            return;
          }
        } catch (u) {
        } finally {
        }
      n = Vw(e, t, i, r), n !== null && (i = xt(), Mn(n, e, r, i), mb(n, t, r));
    }
  }
  function db(e) {
    var t = e.alternate;
    return e === Ue || t !== null && t === Ue;
  }
  function hb(e, t) {
    rl = Mu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function mb(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Hh(e, n);
    }
  }
  var Bu = { readContext: mn, useCallback: ht, useContext: ht, useEffect: ht, useImperativeHandle: ht, useInsertionEffect: ht, useLayoutEffect: ht, useMemo: ht, useReducer: ht, useRef: ht, useState: ht, useDebugValue: ht, useDeferredValue: ht, useTransition: ht, useMutableSource: ht, useSyncExternalStore: ht, useId: ht, unstable_isNewReconciler: !1 }, q2 = { readContext: mn, useCallback: function(e, t) {
    return Vn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: mn, useEffect: Ov, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, au(
      4194308,
      4,
      lb.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return au(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return au(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Vn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Vn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = K2.bind(null, Ue, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Vn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: kv, useDebugValue: mm, useDeferredValue: function(e) {
    return Vn().memoizedState = e;
  }, useTransition: function() {
    var e = kv(!1), t = e[0];
    return e = Q2.bind(null, e[1]), Vn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = Ue, i = Vn();
    if (Re) {
      if (n === void 0)
        throw Error(z(407));
      n = n();
    } else {
      if (n = t(), at === null)
        throw Error(z(349));
      Wi & 30 || Zw(r, t, n);
    }
    i.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return i.queue = o, Ov(tb.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, Rl(9, eb.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Vn(), t = at.identifierPrefix;
    if (Re) {
      var n = vr, r = gr;
      n = (r & ~(1 << 32 - Fn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Nl++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else
      n = J2++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Z2 = {
    readContext: mn,
    useCallback: ub,
    useContext: mn,
    useEffect: hm,
    useImperativeHandle: sb,
    useInsertionEffect: ob,
    useLayoutEffect: ab,
    useMemo: cb,
    useReducer: tp,
    useRef: ib,
    useState: function() {
      return tp(Dl);
    },
    useDebugValue: mm,
    useDeferredValue: function(e) {
      var t = gn();
      return fb(t, nt.memoizedState, e);
    },
    useTransition: function() {
      var e = tp(Dl)[0], t = gn().memoizedState;
      return [e, t];
    },
    useMutableSource: Xw,
    useSyncExternalStore: qw,
    useId: pb,
    unstable_isNewReconciler: !1
  }, ek = { readContext: mn, useCallback: ub, useContext: mn, useEffect: hm, useImperativeHandle: sb, useInsertionEffect: ob, useLayoutEffect: ab, useMemo: cb, useReducer: np, useRef: ib, useState: function() {
    return np(Dl);
  }, useDebugValue: mm, useDeferredValue: function(e) {
    var t = gn();
    return nt === null ? t.memoizedState = e : fb(t, nt.memoizedState, e);
  }, useTransition: function() {
    var e = np(Dl)[0], t = gn().memoizedState;
    return [e, t];
  }, useMutableSource: Xw, useSyncExternalStore: qw, useId: pb, unstable_isNewReconciler: !1 };
  function Wo(e, t) {
    try {
      var n = "", r = t;
      do
        n += Tx(r), r = r.return;
      while (r);
      var i = n;
    } catch (o) {
      i = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function rp(e, t, n) {
    return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
  }
  function kd(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var tk = typeof WeakMap == "function" ? WeakMap : Map;
  function gb(e, t, n) {
    n = yr(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      zu || (zu = !0, Fd = r), kd(e, t);
    }, n;
  }
  function vb(e, t, n) {
    n = yr(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        kd(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      kd(e, t), typeof r != "function" && (Zr === null ? Zr = /* @__PURE__ */ new Set([this]) : Zr.add(this));
      var a = t.stack;
      this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
    }), n;
  }
  function Tv(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new tk();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else
      i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = mk.bind(null, e, t, n), t.then(e, e));
  }
  function Iv(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Pv(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = yr(-1, 1), t.tag = 2, qr(n, t, 1))), n.lanes |= 1), e);
  }
  var nk = Tr.ReactCurrentOwner, Rt = !1;
  function At(e, t, n, r) {
    t.child = e === null ? Qw(t, null, n, r) : Uo(t, e.child, n, r);
  }
  function _v(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return To(t, i), r = pm(e, t, n, r, o, i), n = dm(), e !== null && !Rt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Cr(e, t, i)) : (Re && n && em(t), t.flags |= 1, At(e, t, r, i), t.child);
  }
  function Nv(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Am(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, yb(e, t, o, r, i)) : (e = cu(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, !(e.lanes & i)) {
      var a = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : kl, n(a, r) && e.ref === t.ref)
        return Cr(e, t, i);
    }
    return t.flags |= 1, e = ti(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function yb(e, t, n, r, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (kl(o, r) && e.ref === t.ref)
        if (Rt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0)
          e.flags & 131072 && (Rt = !0);
        else
          return t.lanes = e.lanes, Cr(e, t, i);
    }
    return Od(e, t, n, r, i);
  }
  function wb(e, t, n) {
    var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ke(Eo, Ht), Ht |= n;
      else {
        if (!(n & 1073741824))
          return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ke(Eo, Ht), Ht |= e, null;
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, ke(Eo, Ht), Ht |= r;
      }
    else
      o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, ke(Eo, Ht), Ht |= r;
    return At(e, t, i, n), t.child;
  }
  function bb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Od(e, t, n, r, i) {
    var o = Mt(n) ? Ui : St.current;
    return o = Mo(t, o), To(t, i), n = pm(e, t, n, r, o, i), r = dm(), e !== null && !Rt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Cr(e, t, i)) : (Re && r && em(t), t.flags |= 1, At(e, t, n, i), t.child);
  }
  function Dv(e, t, n, r, i) {
    if (Mt(n)) {
      var o = !0;
      Pu(t);
    } else
      o = !1;
    if (To(t, i), t.stateNode === null)
      lu(e, t), $w(t, n, r), xd(t, n, r, i), r = !0;
    else if (e === null) {
      var a = t.stateNode, l = t.memoizedProps;
      a.props = l;
      var s = a.context, u = n.contextType;
      typeof u == "object" && u !== null ? u = mn(u) : (u = Mt(n) ? Ui : St.current, u = Mo(t, u));
      var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof a.getSnapshotBeforeUpdate == "function";
      f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== r || s !== u) && Cv(t, a, r, u), Fr = !1;
      var p = t.memoizedState;
      a.state = p, Lu(t, r, a, i), s = t.memoizedState, l !== r || p !== s || Ft.current || Fr ? (typeof c == "function" && (Cd(t, n, c, r), s = t.memoizedState), (l = Fr || Av(t, n, l, r, p, s, u)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), a.props = r, a.state = s, a.context = u, r = l) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      a = t.stateNode, Gw(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : _n(t.type, l), a.props = u, f = t.pendingProps, p = a.context, s = n.contextType, typeof s == "object" && s !== null ? s = mn(s) : (s = Mt(n) ? Ui : St.current, s = Mo(t, s));
      var d = n.getDerivedStateFromProps;
      (c = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== f || p !== s) && Cv(t, a, r, s), Fr = !1, p = t.memoizedState, a.state = p, Lu(t, r, a, i);
      var h = t.memoizedState;
      l !== f || p !== h || Ft.current || Fr ? (typeof d == "function" && (Cd(t, n, d, r), h = t.memoizedState), (u = Fr || Av(t, n, u, r, p, h, s) || !1) ? (c || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, h, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, h, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), a.props = r, a.state = h, a.context = s, r = u) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Td(e, t, n, r, o, i);
  }
  function Td(e, t, n, r, i, o) {
    bb(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a)
      return i && yv(t, n, !1), Cr(e, t, o);
    r = t.stateNode, nk.current = t;
    var l = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && a ? (t.child = Uo(t, e.child, null, o), t.child = Uo(t, null, l, o)) : At(e, t, l, o), t.memoizedState = r.state, i && yv(t, n, !0), t.child;
  }
  function Sb(e) {
    var t = e.stateNode;
    t.pendingContext ? vv(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vv(e, t.context, !1), sm(e, t.containerInfo);
  }
  function Rv(e, t, n, r, i) {
    return Bo(), nm(i), t.flags |= 256, At(e, t, n, r), t.child;
  }
  var Id = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Pd(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Eb(e, t, n) {
    var r = t.pendingProps, i = Me.current, o = !1, a = (t.flags & 128) !== 0, l;
    if ((l = a) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ke(Me, i & 1), e === null)
      return Ed(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = kc(a, r, 0, null), e = Ri(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Pd(n), t.memoizedState = Id, e) : gm(t, a));
    if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null))
      return rk(e, t, a, r, l, i, n);
    if (o) {
      o = r.fallback, a = t.mode, i = e.child, l = i.sibling;
      var s = { mode: "hidden", children: r.children };
      return !(a & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = ti(i, s), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = ti(l, o) : (o = Ri(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Pd(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Id, r;
    }
    return o = e.child, e = o.sibling, r = ti(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function gm(e, t) {
    return t = kc({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Bs(e, t, n, r) {
    return r !== null && nm(r), Uo(t, e.child, null, n), e = gm(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function rk(e, t, n, r, i, o, a) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = rp(Error(z(422))), Bs(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = kc({ mode: "visible", children: r.children }, i, 0, null), o = Ri(o, i, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Uo(t, e.child, null, a), t.child.memoizedState = Pd(a), t.memoizedState = Id, o);
    if (!(t.mode & 1))
      return Bs(e, t, a, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r)
        var l = r.dgst;
      return r = l, o = Error(z(419)), r = rp(o, r, void 0), Bs(e, t, a, r);
    }
    if (l = (a & e.childLanes) !== 0, Rt || l) {
      if (r = at, r !== null) {
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
        i = i & (r.suspendedLanes | a) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Ar(e, i), Mn(r, e, i, -1));
      }
      return Em(), r = rp(Error(z(421))), Bs(e, t, a, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = gk.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Qt = Xr(i.nextSibling), qt = t, Re = !0, Rn = null, e !== null && (ln[sn++] = gr, ln[sn++] = vr, ln[sn++] = zi, gr = e.id, vr = e.overflow, zi = t), t = gm(t, r.children), t.flags |= 4096, t);
  }
  function Lv(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Ad(e.return, t, n);
  }
  function ip(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
  }
  function Ab(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, o = r.tail;
    if (At(e, t, r.children, n), r = Me.current, r & 2)
      r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && e.flags & 128)
        e:
          for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && Lv(e, n, t);
            else if (e.tag === 19)
              Lv(e, n, t);
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
    if (ke(Me, r), !(t.mode & 1))
      t.memoizedState = null;
    else
      switch (i) {
        case "forwards":
          for (n = t.child, i = null; n !== null; )
            e = n.alternate, e !== null && Fu(e) === null && (i = n), n = n.sibling;
          n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ip(t, !1, i, n, o);
          break;
        case "backwards":
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (e = i.alternate, e !== null && Fu(e) === null) {
              t.child = i;
              break;
            }
            e = i.sibling, i.sibling = n, n = i, i = e;
          }
          ip(t, !0, n, null, o);
          break;
        case "together":
          ip(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function lu(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Cr(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ji |= t.lanes, !(n & t.childLanes))
      return null;
    if (e !== null && t.child !== e.child)
      throw Error(z(153));
    if (t.child !== null) {
      for (e = t.child, n = ti(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = ti(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function ik(e, t, n) {
    switch (t.tag) {
      case 3:
        Sb(t), Bo();
        break;
      case 5:
        Kw(t);
        break;
      case 1:
        Mt(t.type) && Pu(t);
        break;
      case 4:
        sm(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        ke(Du, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (ke(Me, Me.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Eb(e, t, n) : (ke(Me, Me.current & 1), e = Cr(e, t, n), e !== null ? e.sibling : null);
        ke(Me, Me.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, e.flags & 128) {
          if (r)
            return Ab(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ke(Me, Me.current), r)
          break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, wb(e, t, n);
    }
    return Cr(e, t, n);
  }
  var Cb, _d, xb, kb;
  Cb = function(e, t) {
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
  _d = function() {
  };
  xb = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, Ni(qn.current);
      var o = null;
      switch (n) {
        case "input":
          i = Zp(e, i), r = Zp(e, r), o = [];
          break;
        case "select":
          i = ze({}, i, { value: void 0 }), r = ze({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = nd(e, i), r = nd(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Tu);
      }
      id(n, r);
      var a;
      n = null;
      for (u in i)
        if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
          if (u === "style") {
            var l = i[u];
            for (a in l)
              l.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
          } else
            u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (wl.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
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
            u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, s != null && l !== s && (o = o || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (wl.hasOwnProperty(u) ? (s != null && u === "onScroll" && Oe("scroll", e), o || l === s || (o = [])) : (o = o || []).push(u, s));
      }
      n && (o = o || []).push("style", n);
      var u = o;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  };
  kb = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function ka(e, t) {
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
  function mt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t)
      for (var i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function ok(e, t, n) {
    var r = t.pendingProps;
    switch (tm(t), t.tag) {
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
        return mt(t), null;
      case 1:
        return Mt(t.type) && Iu(), mt(t), null;
      case 3:
        return r = t.stateNode, zo(), Ie(Ft), Ie(St), cm(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Fs(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Rn !== null && (Ud(Rn), Rn = null))), _d(e, t), mt(t), null;
      case 5:
        um(t);
        var i = Ni(_l.current);
        if (n = t.type, e !== null && t.stateNode != null)
          xb(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(z(166));
            return mt(t), null;
          }
          if (e = Ni(qn.current), Fs(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[$n] = t, r[Il] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                Oe("cancel", r), Oe("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Oe("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Va.length; i++)
                  Oe(Va[i], r);
                break;
              case "source":
                Oe("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Oe(
                  "error",
                  r
                ), Oe("load", r);
                break;
              case "details":
                Oe("toggle", r);
                break;
              case "input":
                Vg(r, o), Oe("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, Oe("invalid", r);
                break;
              case "textarea":
                Hg(r, o), Oe("invalid", r);
            }
            id(n, o), i = null;
            for (var a in o)
              if (o.hasOwnProperty(a)) {
                var l = o[a];
                a === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && Ls(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && Ls(
                  r.textContent,
                  l,
                  e
                ), i = ["children", "" + l]) : wl.hasOwnProperty(a) && l != null && a === "onScroll" && Oe("scroll", r);
              }
            switch (n) {
              case "input":
                Os(r), Gg(r, o, !0);
                break;
              case "textarea":
                Os(r), $g(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Tu);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            a = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Z0(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[$n] = t, e[Il] = r, Cb(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (a = od(n, r), n) {
                case "dialog":
                  Oe("cancel", e), Oe("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Oe("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Va.length; i++)
                    Oe(Va[i], e);
                  i = r;
                  break;
                case "source":
                  Oe("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  Oe(
                    "error",
                    e
                  ), Oe("load", e), i = r;
                  break;
                case "details":
                  Oe("toggle", e), i = r;
                  break;
                case "input":
                  Vg(e, r), i = Zp(e, r), Oe("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = ze({}, r, { value: void 0 }), Oe("invalid", e);
                  break;
                case "textarea":
                  Hg(e, r), i = nd(e, r), Oe("invalid", e);
                  break;
                default:
                  i = r;
              }
              id(n, i), l = i;
              for (o in l)
                if (l.hasOwnProperty(o)) {
                  var s = l[o];
                  o === "style" ? nw(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && ew(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && bl(e, s) : typeof s == "number" && bl(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (wl.hasOwnProperty(o) ? s != null && o === "onScroll" && Oe("scroll", e) : s != null && zh(e, o, s, a));
                }
              switch (n) {
                case "input":
                  Os(e), Gg(e, r, !1);
                  break;
                case "textarea":
                  Os(e), $g(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ai(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? Co(e, !!r.multiple, o, !1) : r.defaultValue != null && Co(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = Tu);
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
        return mt(t), null;
      case 6:
        if (e && t.stateNode != null)
          kb(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(z(166));
          if (n = Ni(_l.current), Ni(qn.current), Fs(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[$n] = t, (o = r.nodeValue !== n) && (e = qt, e !== null))
              switch (e.tag) {
                case 3:
                  Ls(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 && Ls(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            o && (t.flags |= 4);
          } else
            r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[$n] = t, t.stateNode = r;
        }
        return mt(t), null;
      case 13:
        if (Ie(Me), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Re && Qt !== null && t.mode & 1 && !(t.flags & 128))
            Yw(), Bo(), t.flags |= 98560, o = !1;
          else if (o = Fs(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o)
                throw Error(z(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                throw Error(z(317));
              o[$n] = t;
            } else
              Bo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            mt(t), o = !1;
          } else
            Rn !== null && (Ud(Rn), Rn = null), o = !0;
          if (!o)
            return t.flags & 65536 ? t : null;
        }
        return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Me.current & 1 ? rt === 0 && (rt = 3) : Em())), t.updateQueue !== null && (t.flags |= 4), mt(t), null);
      case 4:
        return zo(), _d(e, t), e === null && Ol(t.stateNode.containerInfo), mt(t), null;
      case 10:
        return om(t.type._context), mt(t), null;
      case 17:
        return Mt(t.type) && Iu(), mt(t), null;
      case 19:
        if (Ie(Me), o = t.memoizedState, o === null)
          return mt(t), null;
        if (r = (t.flags & 128) !== 0, a = o.rendering, a === null)
          if (r)
            ka(o, !1);
          else {
            if (rt !== 0 || e !== null && e.flags & 128)
              for (e = t.child; e !== null; ) {
                if (a = Fu(e), a !== null) {
                  for (t.flags |= 128, ka(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                    o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                  return ke(Me, Me.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null && Je() > jo && (t.flags |= 128, r = !0, ka(o, !1), t.lanes = 4194304);
          }
        else {
          if (!r)
            if (e = Fu(a), e !== null) {
              if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ka(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Re)
                return mt(t), null;
            } else
              2 * Je() - o.renderingStartTime > jo && n !== 1073741824 && (t.flags |= 128, r = !0, ka(o, !1), t.lanes = 4194304);
          o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Je(), t.sibling = null, n = Me.current, ke(Me, r ? n & 1 | 2 : n & 1), t) : (mt(t), null);
      case 22:
      case 23:
        return Sm(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ht & 1073741824 && (mt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : mt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(z(156, t.tag));
  }
  function ak(e, t) {
    switch (tm(t), t.tag) {
      case 1:
        return Mt(t.type) && Iu(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zo(), Ie(Ft), Ie(St), cm(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return um(t), null;
      case 13:
        if (Ie(Me), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(z(340));
          Bo();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ie(Me), null;
      case 4:
        return zo(), null;
      case 10:
        return om(t.type._context), null;
      case 22:
      case 23:
        return Sm(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Us = !1, wt = !1, lk = typeof WeakSet == "function" ? WeakSet : Set, K = null;
  function So(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ye(e, t, r);
        }
      else
        n.current = null;
  }
  function Nd(e, t, n) {
    try {
      n();
    } catch (r) {
      Ye(e, t, r);
    }
  }
  var Fv = !1;
  function sk(e, t) {
    if (md = xu, e = Pw(), Zh(e)) {
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
            var a = 0, l = -1, s = -1, u = 0, c = 0, f = e, p = null;
            t:
              for (; ; ) {
                for (var d; f !== n || i !== 0 && f.nodeType !== 3 || (l = a + i), f !== o || r !== 0 && f.nodeType !== 3 || (s = a + r), f.nodeType === 3 && (a += f.nodeValue.length), (d = f.firstChild) !== null; )
                  p = f, f = d;
                for (; ; ) {
                  if (f === e)
                    break t;
                  if (p === n && ++u === i && (l = a), p === o && ++c === r && (s = a), (d = f.nextSibling) !== null)
                    break;
                  f = p, p = f.parentNode;
                }
                f = d;
              }
            n = l === -1 || s === -1 ? null : { start: l, end: s };
          } else
            n = null;
        }
      n = n || { start: 0, end: 0 };
    } else
      n = null;
    for (gd = { focusedElem: e, selectionRange: n }, xu = !1, K = t; K !== null; )
      if (t = K, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, K = e;
      else
        for (; K !== null; ) {
          t = K;
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
                    var m = h.memoizedProps, S = h.memoizedState, g = t.stateNode, v = g.getSnapshotBeforeUpdate(t.elementType === t.type ? m : _n(t.type, m), S);
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
            Ye(t, t.return, E);
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, K = e;
            break;
          }
          K = t.return;
        }
    return h = Fv, Fv = !1, h;
  }
  function il(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.destroy;
          i.destroy = void 0, o !== void 0 && Nd(t, n, o);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function Cc(e, t) {
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
  function Dd(e) {
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
  function Ob(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ob(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[$n], delete t[Il], delete t[wd], delete t[V2], delete t[G2])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Tb(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Mv(e) {
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
  function Rd(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Tu));
    else if (r !== 4 && (e = e.child, e !== null))
      for (Rd(e, t, n), e = e.sibling; e !== null; )
        Rd(e, t, n), e = e.sibling;
  }
  function Ld(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
      for (Ld(e, t, n), e = e.sibling; e !== null; )
        Ld(e, t, n), e = e.sibling;
  }
  var ct = null, Nn = !1;
  function Dr(e, t, n) {
    for (n = n.child; n !== null; )
      Ib(e, t, n), n = n.sibling;
  }
  function Ib(e, t, n) {
    if (Xn && typeof Xn.onCommitFiberUnmount == "function")
      try {
        Xn.onCommitFiberUnmount(gc, n);
      } catch (l) {
      }
    switch (n.tag) {
      case 5:
        wt || So(n, t);
      case 6:
        var r = ct, i = Nn;
        ct = null, Dr(e, t, n), ct = r, Nn = i, ct !== null && (Nn ? (e = ct, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ct.removeChild(n.stateNode));
        break;
      case 18:
        ct !== null && (Nn ? (e = ct, n = n.stateNode, e.nodeType === 8 ? Xf(e.parentNode, n) : e.nodeType === 1 && Xf(e, n), Cl(e)) : Xf(ct, n.stateNode));
        break;
      case 4:
        r = ct, i = Nn, ct = n.stateNode.containerInfo, Nn = !0, Dr(e, t, n), ct = r, Nn = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!wt && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var o = i, a = o.destroy;
            o = o.tag, a !== void 0 && (o & 2 || o & 4) && Nd(n, t, a), i = i.next;
          } while (i !== r);
        }
        Dr(e, t, n);
        break;
      case 1:
        if (!wt && (So(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
          try {
            r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
          } catch (l) {
            Ye(n, t, l);
          }
        Dr(e, t, n);
        break;
      case 21:
        Dr(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (wt = (r = wt) || n.memoizedState !== null, Dr(e, t, n), wt = r) : Dr(e, t, n);
        break;
      default:
        Dr(e, t, n);
    }
  }
  function Bv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new lk()), t.forEach(function(r) {
        var i = vk.bind(null, e, r);
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
                  ct = l.stateNode, Nn = !1;
                  break e;
                case 3:
                  ct = l.stateNode.containerInfo, Nn = !0;
                  break e;
                case 4:
                  ct = l.stateNode.containerInfo, Nn = !0;
                  break e;
              }
              l = l.return;
            }
          if (ct === null)
            throw Error(z(160));
          Ib(o, a, i), ct = null, Nn = !1;
          var s = i.alternate;
          s !== null && (s.return = null), i.return = null;
        } catch (u) {
          Ye(i, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; )
        Pb(t, e), t = t.sibling;
  }
  function Pb(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Tn(t, e), Yn(e), r & 4) {
          try {
            il(3, e, e.return), Cc(3, e);
          } catch (m) {
            Ye(e, e.return, m);
          }
          try {
            il(5, e, e.return);
          } catch (m) {
            Ye(e, e.return, m);
          }
        }
        break;
      case 1:
        Tn(t, e), Yn(e), r & 512 && n !== null && So(n, n.return);
        break;
      case 5:
        if (Tn(t, e), Yn(e), r & 512 && n !== null && So(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            bl(i, "");
          } catch (m) {
            Ye(e, e.return, m);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, l = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null)
            try {
              l === "input" && o.type === "radio" && o.name != null && X0(i, o), od(l, a);
              var u = od(l, o);
              for (a = 0; a < s.length; a += 2) {
                var c = s[a], f = s[a + 1];
                c === "style" ? nw(i, f) : c === "dangerouslySetInnerHTML" ? ew(i, f) : c === "children" ? bl(i, f) : zh(i, c, f, u);
              }
              switch (l) {
                case "input":
                  ed(i, o);
                  break;
                case "textarea":
                  q0(i, o);
                  break;
                case "select":
                  var p = i._wrapperState.wasMultiple;
                  i._wrapperState.wasMultiple = !!o.multiple;
                  var d = o.value;
                  d != null ? Co(i, !!o.multiple, d, !1) : p !== !!o.multiple && (o.defaultValue != null ? Co(
                    i,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  ) : Co(i, !!o.multiple, o.multiple ? [] : "", !1));
              }
              i[Il] = o;
            } catch (m) {
              Ye(e, e.return, m);
            }
        }
        break;
      case 6:
        if (Tn(t, e), Yn(e), r & 4) {
          if (e.stateNode === null)
            throw Error(z(162));
          i = e.stateNode, o = e.memoizedProps;
          try {
            i.nodeValue = o;
          } catch (m) {
            Ye(e, e.return, m);
          }
        }
        break;
      case 3:
        if (Tn(t, e), Yn(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Cl(t.containerInfo);
          } catch (m) {
            Ye(e, e.return, m);
          }
        break;
      case 4:
        Tn(t, e), Yn(e);
        break;
      case 13:
        Tn(t, e), Yn(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (wm = Je())), r & 4 && Bv(e);
        break;
      case 22:
        if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (wt = (u = wt) || c, Tn(t, e), wt = u) : Tn(t, e), Yn(e), r & 8192) {
          if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
            for (K = e, c = e.child; c !== null; ) {
              for (f = K = c; K !== null; ) {
                switch (p = K, d = p.child, p.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    il(4, p, p.return);
                    break;
                  case 1:
                    So(p, p.return);
                    var h = p.stateNode;
                    if (typeof h.componentWillUnmount == "function") {
                      r = p, n = p.return;
                      try {
                        t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
                      } catch (m) {
                        Ye(r, n, m);
                      }
                    }
                    break;
                  case 5:
                    So(p, p.return);
                    break;
                  case 22:
                    if (p.memoizedState !== null) {
                      zv(f);
                      continue;
                    }
                }
                d !== null ? (d.return = p, K = d) : zv(f);
              }
              c = c.sibling;
            }
          e:
            for (c = null, f = e; ; ) {
              if (f.tag === 5) {
                if (c === null) {
                  c = f;
                  try {
                    i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, s = f.memoizedProps.style, a = s != null && s.hasOwnProperty("display") ? s.display : null, l.style.display = tw("display", a));
                  } catch (m) {
                    Ye(e, e.return, m);
                  }
                }
              } else if (f.tag === 6) {
                if (c === null)
                  try {
                    f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                  } catch (m) {
                    Ye(e, e.return, m);
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
        Tn(t, e), Yn(e), r & 4 && Bv(e);
        break;
      case 21:
        break;
      default:
        Tn(
          t,
          e
        ), Yn(e);
    }
  }
  function Yn(e) {
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
            r.flags & 32 && (bl(i, ""), r.flags &= -33);
            var o = Mv(e);
            Ld(e, o, i);
            break;
          case 3:
          case 4:
            var a = r.stateNode.containerInfo, l = Mv(e);
            Rd(e, l, a);
            break;
          default:
            throw Error(z(161));
        }
      } catch (s) {
        Ye(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function uk(e, t, n) {
    K = e, _b(e);
  }
  function _b(e, t, n) {
    for (var r = (e.mode & 1) !== 0; K !== null; ) {
      var i = K, o = i.child;
      if (i.tag === 22 && r) {
        var a = i.memoizedState !== null || Us;
        if (!a) {
          var l = i.alternate, s = l !== null && l.memoizedState !== null || wt;
          l = Us;
          var u = wt;
          if (Us = a, (wt = s) && !u)
            for (K = i; K !== null; )
              a = K, s = a.child, a.tag === 22 && a.memoizedState !== null ? Wv(i) : s !== null ? (s.return = a, K = s) : Wv(i);
          for (; o !== null; )
            K = o, _b(o), o = o.sibling;
          K = i, Us = l, wt = u;
        }
        Uv(e);
      } else
        i.subtreeFlags & 8772 && o !== null ? (o.return = i, K = o) : Uv(e);
    }
  }
  function Uv(e) {
    for (; K !== null; ) {
      var t = K;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                wt || Cc(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !wt)
                  if (n === null)
                    r.componentDidMount();
                  else {
                    var i = t.elementType === t.type ? n.memoizedProps : _n(t.type, n.memoizedProps);
                    r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var o = t.updateQueue;
                o !== null && Ev(t, o, r);
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
                  Ev(t, a, n);
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
                      f !== null && Cl(f);
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
          wt || t.flags & 512 && Dd(t);
        } catch (p) {
          Ye(t, t.return, p);
        }
      }
      if (t === e) {
        K = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, K = n;
        break;
      }
      K = t.return;
    }
  }
  function zv(e) {
    for (; K !== null; ) {
      var t = K;
      if (t === e) {
        K = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, K = n;
        break;
      }
      K = t.return;
    }
  }
  function Wv(e) {
    for (; K !== null; ) {
      var t = K;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Cc(4, t);
            } catch (s) {
              Ye(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                Ye(t, i, s);
              }
            }
            var o = t.return;
            try {
              Dd(t);
            } catch (s) {
              Ye(t, o, s);
            }
            break;
          case 5:
            var a = t.return;
            try {
              Dd(t);
            } catch (s) {
              Ye(t, a, s);
            }
        }
      } catch (s) {
        Ye(t, t.return, s);
      }
      if (t === e) {
        K = null;
        break;
      }
      var l = t.sibling;
      if (l !== null) {
        l.return = t.return, K = l;
        break;
      }
      K = t.return;
    }
  }
  var ck = Math.ceil, Uu = Tr.ReactCurrentDispatcher, vm = Tr.ReactCurrentOwner, pn = Tr.ReactCurrentBatchConfig, ve = 0, at = null, Ze = null, ft = 0, Ht = 0, Eo = di(0), rt = 0, Ll = null, ji = 0, xc = 0, ym = 0, ol = null, Nt = null, wm = 0, jo = 1 / 0, fr = null, zu = !1, Fd = null, Zr = null, zs = !1, Hr = null, Wu = 0, al = 0, Md = null, su = -1, uu = 0;
  function xt() {
    return ve & 6 ? Je() : su !== -1 ? su : su = Je();
  }
  function ei(e) {
    return e.mode & 1 ? ve & 2 && ft !== 0 ? ft & -ft : $2.transition !== null ? (uu === 0 && (uu = hw()), uu) : (e = ye, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Sw(e.type)), e) : 1;
  }
  function Mn(e, t, n, r) {
    if (50 < al)
      throw al = 0, Md = null, Error(z(185));
    Jl(e, n, r), (!(ve & 2) || e !== at) && (e === at && (!(ve & 2) && (xc |= n), rt === 4 && Ur(e, ft)), Bt(e, r), n === 1 && ve === 0 && !(t.mode & 1) && (jo = Je() + 500, Sc && hi()));
  }
  function Bt(e, t) {
    var n = e.callbackNode;
    $x(e, t);
    var r = Cu(e, e === at ? ft : 0);
    if (r === 0)
      n !== null && Kg(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Kg(n), t === 1)
        e.tag === 0 ? H2(jv.bind(null, e)) : zw(jv.bind(null, e)), j2(function() {
          !(ve & 6) && hi();
        }), n = null;
      else {
        switch (mw(r)) {
          case 1:
            n = Gh;
            break;
          case 4:
            n = pw;
            break;
          case 16:
            n = Au;
            break;
          case 536870912:
            n = dw;
            break;
          default:
            n = Au;
        }
        n = Ub(n, Nb.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Nb(e, t) {
    if (su = -1, uu = 0, ve & 6)
      throw Error(z(327));
    var n = e.callbackNode;
    if (Io() && e.callbackNode !== n)
      return null;
    var r = Cu(e, e === at ? ft : 0);
    if (r === 0)
      return null;
    if (r & 30 || r & e.expiredLanes || t)
      t = ju(e, r);
    else {
      t = r;
      var i = ve;
      ve |= 2;
      var o = Rb();
      (at !== e || ft !== t) && (fr = null, jo = Je() + 500, Di(e, t));
      do
        try {
          dk();
          break;
        } catch (l) {
          Db(e, l);
        }
      while (1);
      im(), Uu.current = o, ve = i, Ze !== null ? t = 0 : (at = null, ft = 0, t = rt);
    }
    if (t !== 0) {
      if (t === 2 && (i = cd(e), i !== 0 && (r = i, t = Bd(e, i))), t === 1)
        throw n = Ll, Di(e, 0), Ur(e, r), Bt(e, Je()), n;
      if (t === 6)
        Ur(e, r);
      else {
        if (i = e.current.alternate, !(r & 30) && !fk(i) && (t = ju(e, r), t === 2 && (o = cd(e), o !== 0 && (r = o, t = Bd(e, o))), t === 1))
          throw n = Ll, Di(e, 0), Ur(e, r), Bt(e, Je()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(z(345));
          case 2:
            ki(e, Nt, fr);
            break;
          case 3:
            if (Ur(e, r), (r & 130023424) === r && (t = wm + 500 - Je(), 10 < t)) {
              if (Cu(e, 0) !== 0)
                break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                xt(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = yd(ki.bind(null, e, Nt, fr), t);
              break;
            }
            ki(e, Nt, fr);
            break;
          case 4:
            if (Ur(e, r), (r & 4194240) === r)
              break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var a = 31 - Fn(r);
              o = 1 << a, a = t[a], a > i && (i = a), r &= ~o;
            }
            if (r = i, r = Je() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ck(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = yd(ki.bind(null, e, Nt, fr), r);
              break;
            }
            ki(e, Nt, fr);
            break;
          case 5:
            ki(e, Nt, fr);
            break;
          default:
            throw Error(z(329));
        }
      }
    }
    return Bt(e, Je()), e.callbackNode === n ? Nb.bind(null, e) : null;
  }
  function Bd(e, t) {
    var n = ol;
    return e.current.memoizedState.isDehydrated && (Di(e, t).flags |= 256), e = ju(e, t), e !== 2 && (t = Nt, Nt = n, t !== null && Ud(t)), e;
  }
  function Ud(e) {
    Nt === null ? Nt = e : Nt.push.apply(Nt, e);
  }
  function fk(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null))
          for (var r = 0; r < n.length; r++) {
            var i = n[r], o = i.getSnapshot;
            i = i.value;
            try {
              if (!Bn(o(), i))
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
  function Ur(e, t) {
    for (t &= ~ym, t &= ~xc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - Fn(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function jv(e) {
    if (ve & 6)
      throw Error(z(327));
    Io();
    var t = Cu(e, 0);
    if (!(t & 1))
      return Bt(e, Je()), null;
    var n = ju(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = cd(e);
      r !== 0 && (t = r, n = Bd(e, r));
    }
    if (n === 1)
      throw n = Ll, Di(e, 0), Ur(e, t), Bt(e, Je()), n;
    if (n === 6)
      throw Error(z(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, ki(e, Nt, fr), Bt(e, Je()), null;
  }
  function bm(e, t) {
    var n = ve;
    ve |= 1;
    try {
      return e(t);
    } finally {
      ve = n, ve === 0 && (jo = Je() + 500, Sc && hi());
    }
  }
  function Yi(e) {
    Hr !== null && Hr.tag === 0 && !(ve & 6) && Io();
    var t = ve;
    ve |= 1;
    var n = pn.transition, r = ye;
    try {
      if (pn.transition = null, ye = 1, e)
        return e();
    } finally {
      ye = r, pn.transition = n, ve = t, !(ve & 6) && hi();
    }
  }
  function Sm() {
    Ht = Eo.current, Ie(Eo);
  }
  function Di(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, W2(n)), Ze !== null)
      for (n = Ze.return; n !== null; ) {
        var r = n;
        switch (tm(r), r.tag) {
          case 1:
            r = r.type.childContextTypes, r != null && Iu();
            break;
          case 3:
            zo(), Ie(Ft), Ie(St), cm();
            break;
          case 5:
            um(r);
            break;
          case 4:
            zo();
            break;
          case 13:
            Ie(Me);
            break;
          case 19:
            Ie(Me);
            break;
          case 10:
            om(r.type._context);
            break;
          case 22:
          case 23:
            Sm();
        }
        n = n.return;
      }
    if (at = e, Ze = e = ti(e.current, null), ft = Ht = t, rt = 0, Ll = null, ym = xc = ji = 0, Nt = ol = null, _i !== null) {
      for (t = 0; t < _i.length; t++)
        if (n = _i[t], r = n.interleaved, r !== null) {
          n.interleaved = null;
          var i = r.next, o = n.pending;
          if (o !== null) {
            var a = o.next;
            o.next = i, r.next = a;
          }
          n.pending = r;
        }
      _i = null;
    }
    return e;
  }
  function Db(e, t) {
    do {
      var n = Ze;
      try {
        if (im(), ou.current = Bu, Mu) {
          for (var r = Ue.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          Mu = !1;
        }
        if (Wi = 0, ot = nt = Ue = null, rl = !1, Nl = 0, vm.current = null, n === null || n.return === null) {
          rt = 1, Ll = t, Ze = null;
          break;
        }
        e: {
          var o = e, a = n.return, l = n, s = t;
          if (t = ft, l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var u = s, c = l, f = c.tag;
            if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
              var p = c.alternate;
              p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
            }
            var d = Iv(a);
            if (d !== null) {
              d.flags &= -257, Pv(d, a, l, o, t), d.mode & 1 && Tv(o, u, t), t = d, s = u;
              var h = t.updateQueue;
              if (h === null) {
                var m = /* @__PURE__ */ new Set();
                m.add(s), t.updateQueue = m;
              } else
                h.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                Tv(o, u, t), Em();
                break e;
              }
              s = Error(z(426));
            }
          } else if (Re && l.mode & 1) {
            var S = Iv(a);
            if (S !== null) {
              !(S.flags & 65536) && (S.flags |= 256), Pv(S, a, l, o, t), nm(Wo(s, l));
              break e;
            }
          }
          o = s = Wo(s, l), rt !== 4 && (rt = 2), ol === null ? ol = [o] : ol.push(o), o = a;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var g = gb(o, s, t);
                Sv(o, g);
                break e;
              case 1:
                l = s;
                var v = o.type, w = o.stateNode;
                if (!(o.flags & 128) && (typeof v.getDerivedStateFromError == "function" || w !== null && typeof w.componentDidCatch == "function" && (Zr === null || !Zr.has(w)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var E = vb(o, l, t);
                  Sv(o, E);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Fb(n);
      } catch (O) {
        t = O, Ze === n && n !== null && (Ze = n = n.return);
        continue;
      }
      break;
    } while (1);
  }
  function Rb() {
    var e = Uu.current;
    return Uu.current = Bu, e === null ? Bu : e;
  }
  function Em() {
    (rt === 0 || rt === 3 || rt === 2) && (rt = 4), at === null || !(ji & 268435455) && !(xc & 268435455) || Ur(at, ft);
  }
  function ju(e, t) {
    var n = ve;
    ve |= 2;
    var r = Rb();
    (at !== e || ft !== t) && (fr = null, Di(e, t));
    do
      try {
        pk();
        break;
      } catch (i) {
        Db(e, i);
      }
    while (1);
    if (im(), ve = n, Uu.current = r, Ze !== null)
      throw Error(z(261));
    return at = null, ft = 0, rt;
  }
  function pk() {
    for (; Ze !== null; )
      Lb(Ze);
  }
  function dk() {
    for (; Ze !== null && !Bx(); )
      Lb(Ze);
  }
  function Lb(e) {
    var t = Bb(e.alternate, e, Ht);
    e.memoizedProps = e.pendingProps, t === null ? Fb(e) : Ze = t, vm.current = null;
  }
  function Fb(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, t.flags & 32768) {
        if (n = ak(n, t), n !== null) {
          n.flags &= 32767, Ze = n;
          return;
        }
        if (e !== null)
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          rt = 6, Ze = null;
          return;
        }
      } else if (n = ok(n, t, Ht), n !== null) {
        Ze = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ze = t;
        return;
      }
      Ze = t = e;
    } while (t !== null);
    rt === 0 && (rt = 5);
  }
  function ki(e, t, n) {
    var r = ye, i = pn.transition;
    try {
      pn.transition = null, ye = 1, hk(e, t, n, r);
    } finally {
      pn.transition = i, ye = r;
    }
    return null;
  }
  function hk(e, t, n, r) {
    do
      Io();
    while (Hr !== null);
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
    if (Jx(e, o), e === at && (Ze = at = null, ft = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zs || (zs = !0, Ub(Au, function() {
      return Io(), null;
    })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
      o = pn.transition, pn.transition = null;
      var a = ye;
      ye = 1;
      var l = ve;
      ve |= 4, vm.current = null, sk(e, n), Pb(n, e), R2(gd), xu = !!md, gd = md = null, e.current = n, uk(n), Ux(), ve = l, ye = a, pn.transition = o;
    } else
      e.current = n;
    if (zs && (zs = !1, Hr = e, Wu = i), o = e.pendingLanes, o === 0 && (Zr = null), jx(n.stateNode), Bt(e, Je()), t !== null)
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (zu)
      throw zu = !1, e = Fd, Fd = null, e;
    return Wu & 1 && e.tag !== 0 && Io(), o = e.pendingLanes, o & 1 ? e === Md ? al++ : (al = 0, Md = e) : al = 0, hi(), null;
  }
  function Io() {
    if (Hr !== null) {
      var e = mw(Wu), t = pn.transition, n = ye;
      try {
        if (pn.transition = null, ye = 16 > e ? 16 : e, Hr === null)
          var r = !1;
        else {
          if (e = Hr, Hr = null, Wu = 0, ve & 6)
            throw Error(z(331));
          var i = ve;
          for (ve |= 4, K = e.current; K !== null; ) {
            var o = K, a = o.child;
            if (K.flags & 16) {
              var l = o.deletions;
              if (l !== null) {
                for (var s = 0; s < l.length; s++) {
                  var u = l[s];
                  for (K = u; K !== null; ) {
                    var c = K;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        il(8, c, o);
                    }
                    var f = c.child;
                    if (f !== null)
                      f.return = c, K = f;
                    else
                      for (; K !== null; ) {
                        c = K;
                        var p = c.sibling, d = c.return;
                        if (Ob(c), c === u) {
                          K = null;
                          break;
                        }
                        if (p !== null) {
                          p.return = d, K = p;
                          break;
                        }
                        K = d;
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
                K = o;
              }
            }
            if (o.subtreeFlags & 2064 && a !== null)
              a.return = o, K = a;
            else
              e:
                for (; K !== null; ) {
                  if (o = K, o.flags & 2048)
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        il(9, o, o.return);
                    }
                  var g = o.sibling;
                  if (g !== null) {
                    g.return = o.return, K = g;
                    break e;
                  }
                  K = o.return;
                }
          }
          var v = e.current;
          for (K = v; K !== null; ) {
            a = K;
            var w = a.child;
            if (a.subtreeFlags & 2064 && w !== null)
              w.return = a, K = w;
            else
              e:
                for (a = v; K !== null; ) {
                  if (l = K, l.flags & 2048)
                    try {
                      switch (l.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Cc(9, l);
                      }
                    } catch (O) {
                      Ye(l, l.return, O);
                    }
                  if (l === a) {
                    K = null;
                    break e;
                  }
                  var E = l.sibling;
                  if (E !== null) {
                    E.return = l.return, K = E;
                    break e;
                  }
                  K = l.return;
                }
          }
          if (ve = i, hi(), Xn && typeof Xn.onPostCommitFiberRoot == "function")
            try {
              Xn.onPostCommitFiberRoot(gc, e);
            } catch (O) {
            }
          r = !0;
        }
        return r;
      } finally {
        ye = n, pn.transition = t;
      }
    }
    return !1;
  }
  function Yv(e, t, n) {
    t = Wo(n, t), t = gb(e, t, 1), e = qr(e, t, 1), t = xt(), e !== null && (Jl(e, 1, t), Bt(e, t));
  }
  function Ye(e, t, n) {
    if (e.tag === 3)
      Yv(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Yv(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Zr === null || !Zr.has(r))) {
            e = Wo(n, e), e = vb(t, e, 1), t = qr(t, e, 1), e = xt(), t !== null && (Jl(t, 1, e), Bt(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function mk(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = xt(), e.pingedLanes |= e.suspendedLanes & n, at === e && (ft & n) === n && (rt === 4 || rt === 3 && (ft & 130023424) === ft && 500 > Je() - wm ? Di(e, 0) : ym |= n), Bt(e, t);
  }
  function Mb(e, t) {
    t === 0 && (e.mode & 1 ? (t = Ps, Ps <<= 1, !(Ps & 130023424) && (Ps = 4194304)) : t = 1);
    var n = xt();
    e = Ar(e, t), e !== null && (Jl(e, t, n), Bt(e, n));
  }
  function gk(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Mb(e, n);
  }
  function vk(e, t) {
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
    r !== null && r.delete(t), Mb(e, n);
  }
  var Bb;
  Bb = function(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ft.current)
        Rt = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128))
          return Rt = !1, ik(e, t, n);
        Rt = !!(e.flags & 131072);
      }
    else
      Rt = !1, Re && t.flags & 1048576 && Ww(t, Nu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        lu(e, t), e = t.pendingProps;
        var i = Mo(t, St.current);
        To(t, n), i = pm(null, t, r, e, i, n);
        var o = dm();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Mt(r) ? (o = !0, Pu(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, lm(t), i.updater = Ec, t.stateNode = i, i._reactInternals = t, xd(t, r, e, n), t = Td(null, t, r, !0, o, n)) : (t.tag = 0, Re && o && em(t), At(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (lu(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = wk(r), e = _n(r, e), i) {
            case 0:
              t = Od(null, t, r, e, n);
              break e;
            case 1:
              t = Dv(null, t, r, e, n);
              break e;
            case 11:
              t = _v(null, t, r, e, n);
              break e;
            case 14:
              t = Nv(null, t, r, _n(r.type, e), n);
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
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _n(r, i), Od(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _n(r, i), Dv(e, t, r, i, n);
      case 3:
        e: {
          if (Sb(t), e === null)
            throw Error(z(387));
          r = t.pendingProps, o = t.memoizedState, i = o.element, Gw(e, t), Lu(t, r, null, n);
          var a = t.memoizedState;
          if (r = a.element, o.isDehydrated)
            if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
              i = Wo(Error(z(423)), t), t = Rv(e, t, r, n, i);
              break e;
            } else if (r !== i) {
              i = Wo(Error(z(424)), t), t = Rv(e, t, r, n, i);
              break e;
            } else
              for (Qt = Xr(t.stateNode.containerInfo.firstChild), qt = t, Re = !0, Rn = null, n = Qw(t, null, r, n), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Bo(), r === i) {
              t = Cr(e, t, n);
              break e;
            }
            At(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Kw(t), e === null && Ed(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = i.children, vd(r, i) ? a = null : o !== null && vd(r, o) && (t.flags |= 32), bb(e, t), At(e, t, a, n), t.child;
      case 6:
        return e === null && Ed(t), null;
      case 13:
        return Eb(e, t, n);
      case 4:
        return sm(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Uo(t, null, r, n) : At(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _n(r, i), _v(e, t, r, i, n);
      case 7:
        return At(e, t, t.pendingProps, n), t.child;
      case 8:
        return At(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return At(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, a = i.value, ke(Du, r._currentValue), r._currentValue = a, o !== null)
            if (Bn(o.value, a)) {
              if (o.children === i.children && !Ft.current) {
                t = Cr(e, t, n);
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
                        s = yr(-1, n & -n), s.tag = 2;
                        var u = o.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var c = u.pending;
                          c === null ? s.next = s : (s.next = c.next, c.next = s), u.pending = s;
                        }
                      }
                      o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ad(
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
                  a.lanes |= n, l = a.alternate, l !== null && (l.lanes |= n), Ad(a, n, t), a = o.sibling;
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
          At(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, To(t, n), i = mn(i), r = r(i), t.flags |= 1, At(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = _n(r, t.pendingProps), i = _n(r.type, i), Nv(e, t, r, i, n);
      case 15:
        return yb(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _n(r, i), lu(e, t), t.tag = 1, Mt(r) ? (e = !0, Pu(t)) : e = !1, To(t, n), $w(t, r, i), xd(t, r, i, n), Td(null, t, r, !0, e, n);
      case 19:
        return Ab(e, t, n);
      case 22:
        return wb(e, t, n);
    }
    throw Error(z(156, t.tag));
  };
  function Ub(e, t) {
    return fw(e, t);
  }
  function yk(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function cn(e, t, n, r) {
    return new yk(e, t, n, r);
  }
  function Am(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function wk(e) {
    if (typeof e == "function")
      return Am(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === jh)
        return 11;
      if (e === Yh)
        return 14;
    }
    return 2;
  }
  function ti(e, t) {
    var n = e.alternate;
    return n === null ? (n = cn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function cu(e, t, n, r, i, o) {
    var a = 2;
    if (r = e, typeof e == "function")
      Am(e) && (a = 1);
    else if (typeof e == "string")
      a = 5;
    else
      e:
        switch (e) {
          case fo:
            return Ri(n.children, i, o, t);
          case Wh:
            a = 8, i |= 8;
            break;
          case Qp:
            return e = cn(12, n, t, i | 2), e.elementType = Qp, e.lanes = o, e;
          case Kp:
            return e = cn(13, n, t, i), e.elementType = Kp, e.lanes = o, e;
          case Xp:
            return e = cn(19, n, t, i), e.elementType = Xp, e.lanes = o, e;
          case J0:
            return kc(n, i, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case H0:
                  a = 10;
                  break e;
                case $0:
                  a = 9;
                  break e;
                case jh:
                  a = 11;
                  break e;
                case Yh:
                  a = 14;
                  break e;
                case Lr:
                  a = 16, r = null;
                  break e;
              }
            throw Error(z(130, e == null ? e : typeof e, ""));
        }
    return t = cn(a, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Ri(e, t, n, r) {
    return e = cn(7, e, r, t), e.lanes = n, e;
  }
  function kc(e, t, n, r) {
    return e = cn(22, e, r, t), e.elementType = J0, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function op(e, t, n) {
    return e = cn(6, e, null, t), e.lanes = n, e;
  }
  function ap(e, t, n) {
    return t = cn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function bk(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = zf(0), this.expirationTimes = zf(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zf(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function Cm(e, t, n, r, i, o, a, l, s) {
    return e = new bk(e, t, n, l, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = cn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, lm(o), e;
  }
  function Sk(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: co, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function zb(e) {
    if (!e)
      return li;
    e = e._reactInternals;
    e: {
      if (Ji(e) !== e || e.tag !== 1)
        throw Error(z(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Mt(t.type)) {
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
      if (Mt(n))
        return Uw(e, n, t);
    }
    return t;
  }
  function Wb(e, t, n, r, i, o, a, l, s) {
    return e = Cm(n, r, !0, e, i, o, a, l, s), e.context = zb(null), n = e.current, r = xt(), i = ei(n), o = yr(r, i), o.callback = t != null ? t : null, qr(n, o, i), e.current.lanes = i, Jl(e, i, r), Bt(e, r), e;
  }
  function Oc(e, t, n, r) {
    var i = t.current, o = xt(), a = ei(i);
    return n = zb(n), t.context === null ? t.context = n : t.pendingContext = n, t = yr(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = qr(i, t, a), e !== null && (Mn(e, i, a, o), iu(e, i, a)), a;
  }
  function Yu(e) {
    if (e = e.current, !e.child)
      return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Vv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function xm(e, t) {
    Vv(e, t), (e = e.alternate) && Vv(e, t);
  }
  function Ek() {
    return null;
  }
  var jb = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function km(e) {
    this._internalRoot = e;
  }
  Tc.prototype.render = km.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw Error(z(409));
    Oc(e, t, null, null);
  };
  Tc.prototype.unmount = km.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Yi(function() {
        Oc(null, e, null, null);
      }), t[Er] = null;
    }
  };
  function Tc(e) {
    this._internalRoot = e;
  }
  Tc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = yw();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Br.length && t !== 0 && t < Br[n].priority; n++)
        ;
      Br.splice(n, 0, e), n === 0 && bw(e);
    }
  };
  function Om(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ic(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Gv() {
  }
  function Ak(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var u = Yu(a);
          o.call(u);
        };
      }
      var a = Wb(t, r, e, 0, null, !1, !1, "", Gv);
      return e._reactRootContainer = a, e[Er] = a.current, Ol(e.nodeType === 8 ? e.parentNode : e), Yi(), a;
    }
    for (; i = e.lastChild; )
      e.removeChild(i);
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var u = Yu(s);
        l.call(u);
      };
    }
    var s = Cm(e, 0, !1, null, null, !1, !1, "", Gv);
    return e._reactRootContainer = s, e[Er] = s.current, Ol(e.nodeType === 8 ? e.parentNode : e), Yi(function() {
      Oc(t, s, n, r);
    }), s;
  }
  function Pc(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
      var a = o;
      if (typeof i == "function") {
        var l = i;
        i = function() {
          var s = Yu(a);
          l.call(s);
        };
      }
      Oc(t, a, e, i);
    } else
      a = Ak(n, t, e, i, r);
    return Yu(a);
  }
  gw = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Ya(t.pendingLanes);
          n !== 0 && (Hh(t, n | 1), Bt(t, Je()), !(ve & 6) && (jo = Je() + 500, hi()));
        }
        break;
      case 13:
        Yi(function() {
          var r = Ar(e, 1);
          if (r !== null) {
            var i = xt();
            Mn(r, e, 1, i);
          }
        }), xm(e, 1);
    }
  };
  $h = function(e) {
    if (e.tag === 13) {
      var t = Ar(e, 134217728);
      if (t !== null) {
        var n = xt();
        Mn(t, e, 134217728, n);
      }
      xm(e, 134217728);
    }
  };
  vw = function(e) {
    if (e.tag === 13) {
      var t = ei(e), n = Ar(e, t);
      if (n !== null) {
        var r = xt();
        Mn(n, e, t, r);
      }
      xm(e, t);
    }
  };
  yw = function() {
    return ye;
  };
  ww = function(e, t) {
    var n = ye;
    try {
      return ye = e, t();
    } finally {
      ye = n;
    }
  };
  ld = function(e, t, n) {
    switch (t) {
      case "input":
        if (ed(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; )
            n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = bc(r);
              if (!i)
                throw Error(z(90));
              K0(r), ed(r, i);
            }
          }
        }
        break;
      case "textarea":
        q0(e, n);
        break;
      case "select":
        t = n.value, t != null && Co(e, !!n.multiple, t, !1);
    }
  };
  ow = bm;
  aw = Yi;
  var Ck = { usingClientEntryPoint: !1, Events: [Kl, go, bc, rw, iw, bm] }, Oa = { findFiberByHostInstance: Pi, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, xk = { bundleType: Oa.bundleType, version: Oa.version, rendererPackageName: Oa.rendererPackageName, rendererConfig: Oa.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Tr.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = uw(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Oa.findFiberByHostInstance || Ek, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
    var Ws = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ws.isDisabled && Ws.supportsFiber)
      try {
        gc = Ws.inject(xk), Xn = Ws;
      } catch (e) {
      }
  }
  nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ck;
  nn.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Om(t))
      throw Error(z(200));
    return Sk(e, t, null, n);
  };
  nn.createRoot = function(e, t) {
    if (!Om(e))
      throw Error(z(299));
    var n = !1, r = "", i = jb;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Cm(e, 1, !1, null, null, n, !1, r, i), e[Er] = t.current, Ol(e.nodeType === 8 ? e.parentNode : e), new km(t);
  };
  nn.findDOMNode = function(e) {
    if (e == null)
      return null;
    if (e.nodeType === 1)
      return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(z(188)) : (e = Object.keys(e).join(","), Error(z(268, e)));
    return e = uw(t), e = e === null ? null : e.stateNode, e;
  };
  nn.flushSync = function(e) {
    return Yi(e);
  };
  nn.hydrate = function(e, t, n) {
    if (!Ic(t))
      throw Error(z(200));
    return Pc(null, e, t, !0, n);
  };
  nn.hydrateRoot = function(e, t, n) {
    if (!Om(e))
      throw Error(z(405));
    var r = n != null && n.hydratedSources || null, i = !1, o = "", a = jb;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Wb(t, null, e, 1, n != null ? n : null, i, !1, o, a), e[Er] = t.current, Ol(e), r)
      for (e = 0; e < r.length; e++)
        n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
          n,
          i
        );
    return new Tc(t);
  };
  nn.render = function(e, t, n) {
    if (!Ic(t))
      throw Error(z(200));
    return Pc(null, e, t, !1, n);
  };
  nn.unmountComponentAtNode = function(e) {
    if (!Ic(e))
      throw Error(z(40));
    return e._reactRootContainer ? (Yi(function() {
      Pc(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Er] = null;
      });
    }), !0) : !1;
  };
  nn.unstable_batchedUpdates = bm;
  nn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Ic(n))
      throw Error(z(200));
    if (e == null || e._reactInternals === void 0)
      throw Error(z(38));
    return Pc(e, t, n, !1, r);
  };
  nn.version = "18.2.0-next-9e3b772b8-20220608";
  (function(e) {
    function t() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
        } catch (n) {
          console.error(n);
        }
    }
    t(), e.exports = nn;
  })(Ex);
  const Li = /* @__PURE__ */ Dh(oi);
  var Yb, Hv = oi;
  Yb = Hv.createRoot, Hv.hydrateRoot;
  const lp = console.log, kk = {
    sendMsg: (e) => lp("Sending message to backend", e),
    incomingMsgs: {
      subscribe: (e, t) => (lp(`Request for subscription to ${e}:`, t), {
        unsubscribe: () => lp(`Request for removing subscription to ${e}:`, t)
      })
    },
    mode: "HTTPUV"
  }, Vb = k.createContext(kk);
  function Ok({
    children: e,
    sendMsg: t,
    incomingMsgs: n,
    mode: r
  }) {
    return /* @__PURE__ */ y(Vb.Provider, { value: { sendMsg: t, incomingMsgs: n, mode: r }, children: e });
  }
  function ql() {
    return k.useContext(Vb);
  }
  var N = {}, Tk = {
    get exports() {
      return N;
    },
    set exports(e) {
      N = e;
    }
  }, Ik = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", Pk = Ik, _k = Pk;
  function Gb() {
  }
  function Hb() {
  }
  Hb.resetWarningCache = Gb;
  var Nk = function() {
    function e(r, i, o, a, l, s) {
      if (s !== _k) {
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
      checkPropTypes: Hb,
      resetWarningCache: Gb
    };
    return n.PropTypes = n, n;
  };
  Tk.exports = Nk();
  function $b(e) {
    return function(t) {
      return typeof t === e;
    };
  }
  var Dk = $b("function"), Rk = function(e) {
    return e === null;
  }, $v = function(e) {
    return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
  }, Jv = function(e) {
    return !Lk(e) && !Rk(e) && (Dk(e) || typeof e == "object");
  }, Lk = $b("undefined"), zd = globalThis && globalThis.__values || function(e) {
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
  function Fk(e, t) {
    var n = e.length;
    if (n !== t.length)
      return !1;
    for (var r = n; r-- !== 0; )
      if (!Lt(e[r], t[r]))
        return !1;
    return !0;
  }
  function Mk(e, t) {
    if (e.byteLength !== t.byteLength)
      return !1;
    for (var n = new DataView(e.buffer), r = new DataView(t.buffer), i = e.byteLength; i--; )
      if (n.getUint8(i) !== r.getUint8(i))
        return !1;
    return !0;
  }
  function Bk(e, t) {
    var n, r, i, o;
    if (e.size !== t.size)
      return !1;
    try {
      for (var a = zd(e.entries()), l = a.next(); !l.done; l = a.next()) {
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
      for (var u = zd(e.entries()), c = u.next(); !c.done; c = u.next()) {
        var s = c.value;
        if (!Lt(s[1], t.get(s[0])))
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
  function Uk(e, t) {
    var n, r;
    if (e.size !== t.size)
      return !1;
    try {
      for (var i = zd(e.entries()), o = i.next(); !o.done; o = i.next()) {
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
  function Lt(e, t) {
    if (e === t)
      return !0;
    if (e && Jv(e) && t && Jv(t)) {
      if (e.constructor !== t.constructor)
        return !1;
      if (Array.isArray(e) && Array.isArray(t))
        return Fk(e, t);
      if (e instanceof Map && t instanceof Map)
        return Bk(e, t);
      if (e instanceof Set && t instanceof Set)
        return Uk(e, t);
      if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t))
        return Mk(e, t);
      if ($v(e) && $v(t))
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
        if (!(o === "_owner" && e.$$typeof) && !Lt(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    return Number.isNaN(e) && Number.isNaN(t) ? !0 : e === t;
  }
  var zk = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ], Wk = [
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
  ], jk = [
    "bigint",
    "boolean",
    "null",
    "number",
    "string",
    "symbol",
    "undefined"
  ];
  function _c(e) {
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (/HTML\w+Element/.test(t))
      return "HTMLElement";
    if (Yk(t))
      return t;
  }
  function zn(e) {
    return function(t) {
      return _c(t) === e;
    };
  }
  function Yk(e) {
    return Wk.includes(e);
  }
  function ia(e) {
    return function(t) {
      return typeof t === e;
    };
  }
  function Vk(e) {
    return jk.includes(e);
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
    var t = _c(e);
    return t || "Object";
  }
  D.array = Array.isArray;
  D.arrayOf = function(e, t) {
    return !D.array(e) && !D.function(t) ? !1 : e.every(function(n) {
      return t(n);
    });
  };
  D.asyncGeneratorFunction = function(e) {
    return _c(e) === "AsyncGeneratorFunction";
  };
  D.asyncFunction = zn("AsyncFunction");
  D.bigint = ia("bigint");
  D.boolean = function(e) {
    return e === !0 || e === !1;
  };
  D.date = zn("Date");
  D.defined = function(e) {
    return !D.undefined(e);
  };
  D.domElement = function(e) {
    return D.object(e) && !D.plainObject(e) && e.nodeType === 1 && D.string(e.nodeName) && zk.every(function(t) {
      return t in e;
    });
  };
  D.empty = function(e) {
    return D.string(e) && e.length === 0 || D.array(e) && e.length === 0 || D.object(e) && !D.map(e) && !D.set(e) && Object.keys(e).length === 0 || D.set(e) && e.size === 0 || D.map(e) && e.size === 0;
  };
  D.error = zn("Error");
  D.function = ia("function");
  D.generator = function(e) {
    return D.iterable(e) && D.function(e.next) && D.function(e.throw);
  };
  D.generatorFunction = zn("GeneratorFunction");
  D.instanceOf = function(e, t) {
    return !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
  };
  D.iterable = function(e) {
    return !D.nullOrUndefined(e) && D.function(e[Symbol.iterator]);
  };
  D.map = zn("Map");
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
    return ia("number")(e) && !D.nan(e);
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
  D.plainFunction = zn("Function");
  D.plainObject = function(e) {
    if (_c(e) !== "Object")
      return !1;
    var t = Object.getPrototypeOf(e);
    return t === null || t === Object.getPrototypeOf({});
  };
  D.primitive = function(e) {
    return D.null(e) || Vk(typeof e);
  };
  D.promise = zn("Promise");
  D.propertyOf = function(e, t, n) {
    if (!D.object(e) || !t)
      return !1;
    var r = e[t];
    return D.function(n) ? n(r) : D.defined(r);
  };
  D.regexp = zn("RegExp");
  D.set = zn("Set");
  D.string = ia("string");
  D.symbol = ia("symbol");
  D.undefined = ia("undefined");
  D.weakMap = zn("WeakMap");
  D.weakSet = zn("WeakSet");
  function Gk() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e.every(function(n) {
      return D.string(n) || D.array(n) || D.plainObject(n);
    });
  }
  function Hk(e, t, n) {
    return Jb(e, t) ? [e, t].every(D.array) ? !e.some(Zv(n)) && t.some(Zv(n)) : [e, t].every(D.plainObject) ? !Object.entries(e).some(qv(n)) && Object.entries(t).some(qv(n)) : t === n : !1;
  }
  function Qv(e, t, n) {
    var r = n.actual, i = n.key, o = n.previous, a = n.type, l = Kn(e, i), s = Kn(t, i), u = [l, s].every(D.number) && (a === "increased" ? l < s : l > s);
    return D.undefined(r) || (u = u && s === r), D.undefined(o) || (u = u && l === o), u;
  }
  function Kv(e, t, n) {
    var r = n.key, i = n.type, o = n.value, a = Kn(e, r), l = Kn(t, r), s = i === "added" ? a : l, u = i === "added" ? l : a;
    if (!D.nullOrUndefined(o)) {
      if (D.defined(s)) {
        if (D.array(s) || D.plainObject(s))
          return Hk(s, u, o);
      } else
        return Lt(u, o);
      return !1;
    }
    return [a, l].every(D.array) ? !u.every(Tm(s)) : [a, l].every(D.plainObject) ? $k(Object.keys(s), Object.keys(u)) : ![a, l].every(function(c) {
      return D.primitive(c) && D.defined(c);
    }) && (i === "added" ? !D.defined(a) && D.defined(l) : D.defined(a) && !D.defined(l));
  }
  function Xv(e, t, n) {
    var r = n === void 0 ? {} : n, i = r.key, o = Kn(e, i), a = Kn(t, i);
    if (!Jb(o, a))
      throw new TypeError("Inputs have different types");
    if (!Gk(o, a))
      throw new TypeError("Inputs don't have length");
    return [o, a].every(D.plainObject) && (o = Object.keys(o), a = Object.keys(a)), [o, a];
  }
  function qv(e) {
    return function(t) {
      var n = t[0], r = t[1];
      return D.array(e) ? Lt(e, r) || e.some(function(i) {
        return Lt(i, r) || D.array(r) && Tm(r)(i);
      }) : D.plainObject(e) && e[n] ? !!e[n] && Lt(e[n], r) : Lt(e, r);
    };
  }
  function $k(e, t) {
    return t.some(function(n) {
      return !e.includes(n);
    });
  }
  function Zv(e) {
    return function(t) {
      return D.array(e) ? e.some(function(n) {
        return Lt(n, t) || D.array(t) && Tm(t)(n);
      }) : Lt(e, t);
    };
  }
  function Ta(e, t) {
    return D.array(e) ? e.some(function(n) {
      return Lt(n, t);
    }) : Lt(e, t);
  }
  function Tm(e) {
    return function(t) {
      return e.some(function(n) {
        return Lt(n, t);
      });
    };
  }
  function Jb() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e.every(D.array) || e.every(D.number) || e.every(D.plainObject) || e.every(D.string);
  }
  function Kn(e, t) {
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
    var n = function(f, p) {
      try {
        return Kv(e, t, { key: f, type: "added", value: p });
      } catch (d) {
        return !1;
      }
    }, r = function(f, p, d) {
      try {
        var h = Kn(e, f), m = Kn(t, f), S = D.defined(p), g = D.defined(d);
        if (S || g) {
          var v = g ? Ta(d, h) : !Ta(p, h), w = Ta(p, m);
          return v && w;
        }
        return [h, m].every(D.array) || [h, m].every(D.plainObject) ? !Lt(h, m) : h !== m;
      } catch (E) {
        return !1;
      }
    }, i = function(f, p, d) {
      if (!D.defined(f))
        return !1;
      try {
        var h = Kn(e, f), m = Kn(t, f), S = D.defined(d);
        return Ta(p, h) && (S ? Ta(d, m) : !S);
      } catch (g) {
        return !1;
      }
    }, o = function(f, p) {
      return D.defined(f) ? r(f, p) : !1;
    }, a = function(f, p, d) {
      if (!D.defined(f))
        return !1;
      try {
        return Qv(e, t, { key: f, actual: p, previous: d, type: "decreased" });
      } catch (h) {
        return !1;
      }
    }, l = function(f) {
      try {
        var p = Xv(e, t, { key: f }), d = p[0], h = p[1];
        return !!d.length && !h.length;
      } catch (m) {
        return !1;
      }
    }, s = function(f) {
      try {
        var p = Xv(e, t, { key: f }), d = p[0], h = p[1];
        return !d.length && !!h.length;
      } catch (m) {
        return !1;
      }
    }, u = function(f, p, d) {
      if (!D.defined(f))
        return !1;
      try {
        return Qv(e, t, { key: f, actual: p, previous: d, type: "increased" });
      } catch (h) {
        return !1;
      }
    }, c = function(f, p) {
      try {
        return Kv(e, t, { key: f, type: "removed", value: p });
      } catch (d) {
        return !1;
      }
    };
    return { added: n, changed: r, changedFrom: i, changedTo: o, decreased: a, emptied: l, filled: s, increased: u, removed: c };
  }
  var Jk = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ], Qk = [
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
  ], Kk = [
    "bigint",
    "boolean",
    "null",
    "number",
    "string",
    "symbol",
    "undefined"
  ];
  function Nc(e) {
    const t = Object.prototype.toString.call(e).slice(8, -1);
    if (/HTML\w+Element/.test(t))
      return "HTMLElement";
    if (Xk(t))
      return t;
  }
  function Wn(e) {
    return (t) => Nc(t) === e;
  }
  function Xk(e) {
    return Qk.includes(e);
  }
  function oa(e) {
    return (t) => typeof t === e;
  }
  function qk(e) {
    return Kk.includes(e);
  }
  function $(e) {
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
    if ($.array(e))
      return "Array";
    if ($.plainFunction(e))
      return "Function";
    const t = Nc(e);
    return t || "Object";
  }
  $.array = Array.isArray;
  $.arrayOf = (e, t) => !$.array(e) && !$.function(t) ? !1 : e.every((n) => t(n));
  $.asyncGeneratorFunction = (e) => Nc(e) === "AsyncGeneratorFunction";
  $.asyncFunction = Wn("AsyncFunction");
  $.bigint = oa("bigint");
  $.boolean = (e) => e === !0 || e === !1;
  $.date = Wn("Date");
  $.defined = (e) => !$.undefined(e);
  $.domElement = (e) => $.object(e) && !$.plainObject(e) && e.nodeType === 1 && $.string(e.nodeName) && Jk.every((t) => t in e);
  $.empty = (e) => $.string(e) && e.length === 0 || $.array(e) && e.length === 0 || $.object(e) && !$.map(e) && !$.set(e) && Object.keys(e).length === 0 || $.set(e) && e.size === 0 || $.map(e) && e.size === 0;
  $.error = Wn("Error");
  $.function = oa("function");
  $.generator = (e) => $.iterable(e) && $.function(e.next) && $.function(e.throw);
  $.generatorFunction = Wn("GeneratorFunction");
  $.instanceOf = (e, t) => !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
  $.iterable = (e) => !$.nullOrUndefined(e) && $.function(e[Symbol.iterator]);
  $.map = Wn("Map");
  $.nan = (e) => Number.isNaN(e);
  $.null = (e) => e === null;
  $.nullOrUndefined = (e) => $.null(e) || $.undefined(e);
  $.number = (e) => oa("number")(e) && !$.nan(e);
  $.numericString = (e) => $.string(e) && e.length > 0 && !Number.isNaN(Number(e));
  $.object = (e) => !$.nullOrUndefined(e) && ($.function(e) || typeof e == "object");
  $.oneOf = (e, t) => $.array(e) ? e.indexOf(t) > -1 : !1;
  $.plainFunction = Wn("Function");
  $.plainObject = (e) => {
    if (Nc(e) !== "Object")
      return !1;
    const t = Object.getPrototypeOf(e);
    return t === null || t === Object.getPrototypeOf({});
  };
  $.primitive = (e) => $.null(e) || qk(typeof e);
  $.promise = Wn("Promise");
  $.propertyOf = (e, t, n) => {
    if (!$.object(e) || !t)
      return !1;
    const r = e[t];
    return $.function(n) ? n(r) : $.defined(r);
  };
  $.regexp = Wn("RegExp");
  $.set = Wn("Set");
  $.string = oa("string");
  $.symbol = oa("symbol");
  $.undefined = oa("undefined");
  $.weakMap = Wn("WeakMap");
  $.weakSet = Wn("WeakSet");
  var Ge = $, Wd = {}, Zk = {
    get exports() {
      return Wd;
    },
    set exports(e) {
      Wd = e;
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
  })(Zk);
  const Qb = Wd;
  var eO = new Error("Element already at target scroll position"), tO = new Error("Scroll cancelled"), nO = Math.min, ey = Date.now, rO = {
    left: ty("scrollLeft"),
    top: ty("scrollTop")
  };
  function ty(e) {
    return function(n, r, i, o) {
      i = i || {}, typeof i == "function" && (o = i, i = {}), typeof o != "function" && (o = oO);
      var a = ey(), l = n[e], s = i.ease || iO, u = isNaN(i.duration) ? 350 : +i.duration, c = !1;
      return l === r ? o(eO, n[e]) : requestAnimationFrame(p), f;
      function f() {
        c = !0;
      }
      function p(d) {
        if (c)
          return o(tO, n[e]);
        var h = ey(), m = nO(1, (h - a) / u), S = s(m);
        n[e] = S * (r - l) + l, m < 1 ? requestAnimationFrame(p) : requestAnimationFrame(function() {
          o(null, n[e]);
        });
      }
    };
  }
  function iO(e) {
    return 0.5 * (1 - Math.cos(Math.PI * e));
  }
  function oO() {
  }
  var jd = {}, aO = {
    get exports() {
      return jd;
    },
    set exports(e) {
      jd = e;
    }
  };
  (function(e) {
    (function(t, n) {
      e.exports ? e.exports = n() : t.Scrollparent = n();
    })(qC, function() {
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
  })(aO);
  const Kb = jd;
  var zr = {}, lO = {
    get exports() {
      return zr;
    },
    set exports(e) {
      zr = e;
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
  var lt = typeof Symbol == "function" && Symbol.for, Im = lt ? Symbol.for("react.element") : 60103, Pm = lt ? Symbol.for("react.portal") : 60106, Dc = lt ? Symbol.for("react.fragment") : 60107, Rc = lt ? Symbol.for("react.strict_mode") : 60108, Lc = lt ? Symbol.for("react.profiler") : 60114, Fc = lt ? Symbol.for("react.provider") : 60109, Mc = lt ? Symbol.for("react.context") : 60110, _m = lt ? Symbol.for("react.async_mode") : 60111, Bc = lt ? Symbol.for("react.concurrent_mode") : 60111, Uc = lt ? Symbol.for("react.forward_ref") : 60112, zc = lt ? Symbol.for("react.suspense") : 60113, sO = lt ? Symbol.for("react.suspense_list") : 60120, Wc = lt ? Symbol.for("react.memo") : 60115, jc = lt ? Symbol.for("react.lazy") : 60116, uO = lt ? Symbol.for("react.block") : 60121, cO = lt ? Symbol.for("react.fundamental") : 60117, fO = lt ? Symbol.for("react.responder") : 60118, pO = lt ? Symbol.for("react.scope") : 60119;
  function on(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Im:
          switch (e = e.type, e) {
            case _m:
            case Bc:
            case Dc:
            case Lc:
            case Rc:
            case zc:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case Mc:
                case Uc:
                case jc:
                case Wc:
                case Fc:
                  return e;
                default:
                  return t;
              }
          }
        case Pm:
          return t;
      }
    }
  }
  function Xb(e) {
    return on(e) === Bc;
  }
  we.AsyncMode = _m;
  we.ConcurrentMode = Bc;
  we.ContextConsumer = Mc;
  we.ContextProvider = Fc;
  we.Element = Im;
  we.ForwardRef = Uc;
  we.Fragment = Dc;
  we.Lazy = jc;
  we.Memo = Wc;
  we.Portal = Pm;
  we.Profiler = Lc;
  we.StrictMode = Rc;
  we.Suspense = zc;
  we.isAsyncMode = function(e) {
    return Xb(e) || on(e) === _m;
  };
  we.isConcurrentMode = Xb;
  we.isContextConsumer = function(e) {
    return on(e) === Mc;
  };
  we.isContextProvider = function(e) {
    return on(e) === Fc;
  };
  we.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Im;
  };
  we.isForwardRef = function(e) {
    return on(e) === Uc;
  };
  we.isFragment = function(e) {
    return on(e) === Dc;
  };
  we.isLazy = function(e) {
    return on(e) === jc;
  };
  we.isMemo = function(e) {
    return on(e) === Wc;
  };
  we.isPortal = function(e) {
    return on(e) === Pm;
  };
  we.isProfiler = function(e) {
    return on(e) === Lc;
  };
  we.isStrictMode = function(e) {
    return on(e) === Rc;
  };
  we.isSuspense = function(e) {
    return on(e) === zc;
  };
  we.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Dc || e === Bc || e === Lc || e === Rc || e === zc || e === sO || typeof e == "object" && e !== null && (e.$$typeof === jc || e.$$typeof === Wc || e.$$typeof === Fc || e.$$typeof === Mc || e.$$typeof === Uc || e.$$typeof === cO || e.$$typeof === fO || e.$$typeof === pO || e.$$typeof === uO);
  };
  we.typeOf = on;
  (function(e) {
    e.exports = we;
  })(lO);
  var dO = function(t) {
    return hO(t) && !mO(t);
  };
  function hO(e) {
    return !!e && typeof e == "object";
  }
  function mO(e) {
    var t = Object.prototype.toString.call(e);
    return t === "[object RegExp]" || t === "[object Date]" || yO(e);
  }
  var gO = typeof Symbol == "function" && Symbol.for, vO = gO ? Symbol.for("react.element") : 60103;
  function yO(e) {
    return e.$$typeof === vO;
  }
  function wO(e) {
    return Array.isArray(e) ? [] : {};
  }
  function Ml(e, t) {
    return t.clone !== !1 && t.isMergeableObject(e) ? Yo(wO(e), e, t) : e;
  }
  function bO(e, t, n) {
    return e.concat(t).map(function(r) {
      return Ml(r, n);
    });
  }
  function SO(e, t) {
    if (!t.customMerge)
      return Yo;
    var n = t.customMerge(e);
    return typeof n == "function" ? n : Yo;
  }
  function EO(e) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
      return Object.propertyIsEnumerable.call(e, t);
    }) : [];
  }
  function ny(e) {
    return Object.keys(e).concat(EO(e));
  }
  function qb(e, t) {
    try {
      return t in e;
    } catch (n) {
      return !1;
    }
  }
  function AO(e, t) {
    return qb(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
  }
  function CO(e, t, n) {
    var r = {};
    return n.isMergeableObject(e) && ny(e).forEach(function(i) {
      r[i] = Ml(e[i], n);
    }), ny(t).forEach(function(i) {
      AO(e, i) || (qb(e, i) && n.isMergeableObject(t[i]) ? r[i] = SO(i, n)(e[i], t[i], n) : r[i] = Ml(t[i], n));
    }), r;
  }
  function Yo(e, t, n) {
    n = n || {}, n.arrayMerge = n.arrayMerge || bO, n.isMergeableObject = n.isMergeableObject || dO, n.cloneUnlessOtherwiseSpecified = Ml;
    var r = Array.isArray(t), i = Array.isArray(e), o = r === i;
    return o ? r ? n.arrayMerge(e, t, n) : CO(e, t, n) : Ml(t, n);
  }
  Yo.all = function(t, n) {
    if (!Array.isArray(t))
      throw new Error("first argument should be an array");
    return t.reduce(function(r, i) {
      return Yo(r, i, n);
    }, {});
  };
  var xO = Yo, Jn = xO, Zb = {};
  Object.defineProperty(Zb, "__esModule", { value: !0 });
  var kO = "The typeValidator argument must be a function with the signature function(props, propName, componentName).", OO = "The error message is optional, but must be a string if provided.", TO = function(t, n, r, i) {
    return typeof t == "boolean" ? t : typeof t == "function" ? t(n, r, i) : !!t && !!t;
  }, IO = function(t, n) {
    return Object.hasOwnProperty.call(t, n);
  }, PO = function(t, n, r, i) {
    return i ? new Error(i) : new Error("Required " + t[n] + " `" + n + "`" + (" was not specified in `" + r + "`."));
  }, _O = function(t, n) {
    if (typeof t != "function")
      throw new TypeError(kO);
    if (n && typeof n != "string")
      throw new TypeError(OO);
  }, NO = function(t, n, r) {
    return _O(t, r), function(i, o, a) {
      for (var l = arguments.length, s = Array(3 < l ? l - 3 : 0), u = 3; u < l; u++)
        s[u - 3] = arguments[u];
      return TO(n, i, o, a) ? IO(i, o) ? t.apply(void 0, [i, o, a].concat(s)) : PO(i, o, a, r) : t.apply(void 0, [i, o, a].concat(s));
    };
  }, ry = Zb.default = NO;
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
  var Zl = typeof window != "undefined" && typeof document != "undefined" && typeof navigator != "undefined", DO = function() {
    for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
      if (Zl && navigator.userAgent.indexOf(e[t]) >= 0)
        return 1;
    return 0;
  }();
  function RO(e) {
    var t = !1;
    return function() {
      t || (t = !0, window.Promise.resolve().then(function() {
        t = !1, e();
      }));
    };
  }
  function LO(e) {
    var t = !1;
    return function() {
      t || (t = !0, setTimeout(function() {
        t = !1, e();
      }, DO));
    };
  }
  var FO = Zl && window.Promise, MO = FO ? RO : LO;
  function eS(e) {
    var t = {};
    return e && t.toString.call(e) === "[object Function]";
  }
  function Qi(e, t) {
    if (e.nodeType !== 1)
      return [];
    var n = e.ownerDocument.defaultView, r = n.getComputedStyle(e, null);
    return t ? r[t] : r;
  }
  function Nm(e) {
    return e.nodeName === "HTML" ? e : e.parentNode || e.host;
  }
  function es(e) {
    if (!e)
      return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var t = Qi(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
    return /(auto|scroll|overlay)/.test(n + i + r) ? e : es(Nm(e));
  }
  function tS(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  var iy = Zl && !!(window.MSInputMethodContext && document.documentMode), oy = Zl && /MSIE 10/.test(navigator.userAgent);
  function aa(e) {
    return e === 11 ? iy : e === 10 ? oy : iy || oy;
  }
  function Vo(e) {
    if (!e)
      return document.documentElement;
    for (var t = aa(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling; )
      n = (e = e.nextElementSibling).offsetParent;
    var r = n && n.nodeName;
    return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(n.nodeName) !== -1 && Qi(n, "position") === "static" ? Vo(n) : n;
  }
  function BO(e) {
    var t = e.nodeName;
    return t === "BODY" ? !1 : t === "HTML" || Vo(e.firstElementChild) === e;
  }
  function Yd(e) {
    return e.parentNode !== null ? Yd(e.parentNode) : e;
  }
  function Vu(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType)
      return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = n ? e : t, i = n ? t : e, o = document.createRange();
    o.setStart(r, 0), o.setEnd(i, 0);
    var a = o.commonAncestorContainer;
    if (e !== a && t !== a || r.contains(i))
      return BO(a) ? a : Vo(a);
    var l = Yd(e);
    return l.host ? Vu(l.host, t) : Vu(e, Yd(t).host);
  }
  function Go(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", n = t === "top" ? "scrollTop" : "scrollLeft", r = e.nodeName;
    if (r === "BODY" || r === "HTML") {
      var i = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || i;
      return o[n];
    }
    return e[n];
  }
  function UO(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Go(t, "top"), i = Go(t, "left"), o = n ? -1 : 1;
    return e.top += r * o, e.bottom += r * o, e.left += i * o, e.right += i * o, e;
  }
  function ay(e, t) {
    var n = t === "x" ? "Left" : "Top", r = n === "Left" ? "Right" : "Bottom";
    return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"]);
  }
  function ly(e, t, n, r) {
    return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], aa(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
  }
  function nS(e) {
    var t = e.body, n = e.documentElement, r = aa(10) && getComputedStyle(n);
    return {
      height: ly("Height", t, n, r),
      width: ly("Width", t, n, r)
    };
  }
  var zO = function(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }, WO = function() {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), Ho = function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }, fn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  };
  function si(e) {
    return fn({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }
  function Vd(e) {
    var t = {};
    try {
      if (aa(10)) {
        t = e.getBoundingClientRect();
        var n = Go(e, "top"), r = Go(e, "left");
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
    }, o = e.nodeName === "HTML" ? nS(e.ownerDocument) : {}, a = o.width || e.clientWidth || i.width, l = o.height || e.clientHeight || i.height, s = e.offsetWidth - a, u = e.offsetHeight - l;
    if (s || u) {
      var c = Qi(e);
      s -= ay(c, "x"), u -= ay(c, "y"), i.width -= s, i.height -= u;
    }
    return si(i);
  }
  function Dm(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = aa(10), i = t.nodeName === "HTML", o = Vd(e), a = Vd(t), l = es(e), s = Qi(t), u = parseFloat(s.borderTopWidth), c = parseFloat(s.borderLeftWidth);
    n && i && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
    var f = si({
      top: o.top - a.top - u,
      left: o.left - a.left - c,
      width: o.width,
      height: o.height
    });
    if (f.marginTop = 0, f.marginLeft = 0, !r && i) {
      var p = parseFloat(s.marginTop), d = parseFloat(s.marginLeft);
      f.top -= u - p, f.bottom -= u - p, f.left -= c - d, f.right -= c - d, f.marginTop = p, f.marginLeft = d;
    }
    return (r && !n ? t.contains(l) : t === l && l.nodeName !== "BODY") && (f = UO(f, t)), f;
  }
  function jO(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = e.ownerDocument.documentElement, r = Dm(e, n), i = Math.max(n.clientWidth, window.innerWidth || 0), o = Math.max(n.clientHeight, window.innerHeight || 0), a = t ? 0 : Go(n), l = t ? 0 : Go(n, "left"), s = {
      top: a - r.top + r.marginTop,
      left: l - r.left + r.marginLeft,
      width: i,
      height: o
    };
    return si(s);
  }
  function rS(e) {
    var t = e.nodeName;
    if (t === "BODY" || t === "HTML")
      return !1;
    if (Qi(e, "position") === "fixed")
      return !0;
    var n = Nm(e);
    return n ? rS(n) : !1;
  }
  function iS(e) {
    if (!e || !e.parentElement || aa())
      return document.documentElement;
    for (var t = e.parentElement; t && Qi(t, "transform") === "none"; )
      t = t.parentElement;
    return t || document.documentElement;
  }
  function Rm(e, t, n, r) {
    var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, a = i ? iS(e) : Vu(e, tS(t));
    if (r === "viewport")
      o = jO(a, i);
    else {
      var l = void 0;
      r === "scrollParent" ? (l = es(Nm(t)), l.nodeName === "BODY" && (l = e.ownerDocument.documentElement)) : r === "window" ? l = e.ownerDocument.documentElement : l = r;
      var s = Dm(l, a, i);
      if (l.nodeName === "HTML" && !rS(a)) {
        var u = nS(e.ownerDocument), c = u.height, f = u.width;
        o.top += s.top - s.marginTop, o.bottom = c + s.top, o.left += s.left - s.marginLeft, o.right = f + s.left;
      } else
        o = s;
    }
    n = n || 0;
    var p = typeof n == "number";
    return o.left += p ? n : n.left || 0, o.top += p ? n : n.top || 0, o.right -= p ? n : n.right || 0, o.bottom -= p ? n : n.bottom || 0, o;
  }
  function YO(e) {
    var t = e.width, n = e.height;
    return t * n;
  }
  function oS(e, t, n, r, i) {
    var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
    if (e.indexOf("auto") === -1)
      return e;
    var a = Rm(n, r, o, i), l = {
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
    }, s = Object.keys(l).map(function(p) {
      return fn({
        key: p
      }, l[p], {
        area: YO(l[p])
      });
    }).sort(function(p, d) {
      return d.area - p.area;
    }), u = s.filter(function(p) {
      var d = p.width, h = p.height;
      return d >= n.clientWidth && h >= n.clientHeight;
    }), c = u.length > 0 ? u[0].key : s[0].key, f = e.split("-")[1];
    return c + (f ? "-" + f : "");
  }
  function aS(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, i = r ? iS(t) : Vu(t, tS(n));
    return Dm(n, i, r);
  }
  function lS(e) {
    var t = e.ownerDocument.defaultView, n = t.getComputedStyle(e), r = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0), i = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0), o = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + r
    };
    return o;
  }
  function Gu(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function(n) {
      return t[n];
    });
  }
  function sS(e, t, n) {
    n = n.split("-")[0];
    var r = lS(e), i = {
      width: r.width,
      height: r.height
    }, o = ["right", "left"].indexOf(n) !== -1, a = o ? "top" : "left", l = o ? "left" : "top", s = o ? "height" : "width", u = o ? "width" : "height";
    return i[a] = t[a] + t[s] / 2 - r[s] / 2, n === l ? i[l] = t[l] - r[u] : i[l] = t[Gu(l)], i;
  }
  function ts(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function VO(e, t, n) {
    if (Array.prototype.findIndex)
      return e.findIndex(function(i) {
        return i[t] === n;
      });
    var r = ts(e, function(i) {
      return i[t] === n;
    });
    return e.indexOf(r);
  }
  function uS(e, t, n) {
    var r = n === void 0 ? e : e.slice(0, VO(e, "name", n));
    return r.forEach(function(i) {
      i.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var o = i.function || i.fn;
      i.enabled && eS(o) && (t.offsets.popper = si(t.offsets.popper), t.offsets.reference = si(t.offsets.reference), t = o(t, i));
    }), t;
  }
  function GO() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = aS(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = oS(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = sS(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = uS(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }
  function cS(e, t) {
    return e.some(function(n) {
      var r = n.name, i = n.enabled;
      return i && r === t;
    });
  }
  function Lm(e) {
    for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
      var i = t[r], o = i ? "" + i + n : e;
      if (typeof document.body.style[o] != "undefined")
        return o;
    }
    return null;
  }
  function HO() {
    return this.state.isDestroyed = !0, cS(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[Lm("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }
  function fS(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function pS(e, t, n, r) {
    var i = e.nodeName === "BODY", o = i ? e.ownerDocument.defaultView : e;
    o.addEventListener(t, n, { passive: !0 }), i || pS(es(o.parentNode), t, n, r), r.push(o);
  }
  function $O(e, t, n, r) {
    n.updateBound = r, fS(e).addEventListener("resize", n.updateBound, { passive: !0 });
    var i = es(e);
    return pS(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n;
  }
  function JO() {
    this.state.eventsEnabled || (this.state = $O(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function QO(e, t) {
    return fS(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
      n.removeEventListener("scroll", t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }
  function KO() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = QO(this.reference, this.state));
  }
  function Fm(e) {
    return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function Gd(e, t) {
    Object.keys(t).forEach(function(n) {
      var r = "";
      ["width", "height", "top", "right", "bottom", "left"].indexOf(n) !== -1 && Fm(t[n]) && (r = "px"), e.style[n] = t[n] + r;
    });
  }
  function XO(e, t) {
    Object.keys(t).forEach(function(n) {
      var r = t[n];
      r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n);
    });
  }
  function qO(e) {
    return Gd(e.instance.popper, e.styles), XO(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Gd(e.arrowElement, e.arrowStyles), e;
  }
  function ZO(e, t, n, r, i) {
    var o = aS(i, t, e, n.positionFixed), a = oS(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
    return t.setAttribute("x-placement", a), Gd(t, { position: n.positionFixed ? "fixed" : "absolute" }), n;
  }
  function eT(e, t) {
    var n = e.offsets, r = n.popper, i = n.reference, o = Math.round, a = Math.floor, l = function(g) {
      return g;
    }, s = o(i.width), u = o(r.width), c = ["left", "right"].indexOf(e.placement) !== -1, f = e.placement.indexOf("-") !== -1, p = s % 2 === u % 2, d = s % 2 === 1 && u % 2 === 1, h = t ? c || f || p ? o : a : l, m = t ? o : l;
    return {
      left: h(d && !f && t ? r.left - 1 : r.left),
      top: m(r.top),
      bottom: m(r.bottom),
      right: h(r.right)
    };
  }
  var tT = Zl && /Firefox/i.test(navigator.userAgent);
  function nT(e, t) {
    var n = t.x, r = t.y, i = e.offsets.popper, o = ts(e.instance.modifiers, function(w) {
      return w.name === "applyStyle";
    }).gpuAcceleration;
    o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
    var a = o !== void 0 ? o : t.gpuAcceleration, l = Vo(e.instance.popper), s = Vd(l), u = {
      position: i.position
    }, c = eT(e, window.devicePixelRatio < 2 || !tT), f = n === "bottom" ? "top" : "bottom", p = r === "right" ? "left" : "right", d = Lm("transform"), h = void 0, m = void 0;
    if (f === "bottom" ? l.nodeName === "HTML" ? m = -l.clientHeight + c.bottom : m = -s.height + c.bottom : m = c.top, p === "right" ? l.nodeName === "HTML" ? h = -l.clientWidth + c.right : h = -s.width + c.right : h = c.left, a && d)
      u[d] = "translate3d(" + h + "px, " + m + "px, 0)", u[f] = 0, u[p] = 0, u.willChange = "transform";
    else {
      var S = f === "bottom" ? -1 : 1, g = p === "right" ? -1 : 1;
      u[f] = m * S, u[p] = h * g, u.willChange = f + ", " + p;
    }
    var v = {
      "x-placement": e.placement
    };
    return e.attributes = fn({}, v, e.attributes), e.styles = fn({}, u, e.styles), e.arrowStyles = fn({}, e.offsets.arrow, e.arrowStyles), e;
  }
  function dS(e, t, n) {
    var r = ts(e, function(l) {
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
  function rT(e, t) {
    var n;
    if (!dS(e.instance.modifiers, "arrow", "keepTogether"))
      return e;
    var r = t.element;
    if (typeof r == "string") {
      if (r = e.instance.popper.querySelector(r), !r)
        return e;
    } else if (!e.instance.popper.contains(r))
      return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
    var i = e.placement.split("-")[0], o = e.offsets, a = o.popper, l = o.reference, s = ["left", "right"].indexOf(i) !== -1, u = s ? "height" : "width", c = s ? "Top" : "Left", f = c.toLowerCase(), p = s ? "left" : "top", d = s ? "bottom" : "right", h = lS(r)[u];
    l[d] - h < a[f] && (e.offsets.popper[f] -= a[f] - (l[d] - h)), l[f] + h > a[d] && (e.offsets.popper[f] += l[f] + h - a[d]), e.offsets.popper = si(e.offsets.popper);
    var m = l[f] + l[u] / 2 - h / 2, S = Qi(e.instance.popper), g = parseFloat(S["margin" + c]), v = parseFloat(S["border" + c + "Width"]), w = m - e.offsets.popper[f] - g - v;
    return w = Math.max(Math.min(a[u] - h, w), 0), e.arrowElement = r, e.offsets.arrow = (n = {}, Ho(n, f, Math.round(w)), Ho(n, p, ""), n), e;
  }
  function iT(e) {
    return e === "end" ? "start" : e === "start" ? "end" : e;
  }
  var hS = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], sp = hS.slice(3);
  function sy(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = sp.indexOf(e), r = sp.slice(n + 1).concat(sp.slice(0, n));
    return t ? r.reverse() : r;
  }
  var up = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise"
  };
  function oT(e, t) {
    if (cS(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
      return e;
    var n = Rm(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], i = Gu(r), o = e.placement.split("-")[1] || "", a = [];
    switch (t.behavior) {
      case up.FLIP:
        a = [r, i];
        break;
      case up.CLOCKWISE:
        a = sy(r);
        break;
      case up.COUNTERCLOCKWISE:
        a = sy(r, !0);
        break;
      default:
        a = t.behavior;
    }
    return a.forEach(function(l, s) {
      if (r !== l || a.length === s + 1)
        return e;
      r = e.placement.split("-")[0], i = Gu(r);
      var u = e.offsets.popper, c = e.offsets.reference, f = Math.floor, p = r === "left" && f(u.right) > f(c.left) || r === "right" && f(u.left) < f(c.right) || r === "top" && f(u.bottom) > f(c.top) || r === "bottom" && f(u.top) < f(c.bottom), d = f(u.left) < f(n.left), h = f(u.right) > f(n.right), m = f(u.top) < f(n.top), S = f(u.bottom) > f(n.bottom), g = r === "left" && d || r === "right" && h || r === "top" && m || r === "bottom" && S, v = ["top", "bottom"].indexOf(r) !== -1, w = !!t.flipVariations && (v && o === "start" && d || v && o === "end" && h || !v && o === "start" && m || !v && o === "end" && S), E = !!t.flipVariationsByContent && (v && o === "start" && h || v && o === "end" && d || !v && o === "start" && S || !v && o === "end" && m), O = w || E;
      (p || g || O) && (e.flipped = !0, (p || g) && (r = a[s + 1]), O && (o = iT(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = fn({}, e.offsets.popper, sS(e.instance.popper, e.offsets.reference, e.placement)), e = uS(e.instance.modifiers, e, "flip"));
    }), e;
  }
  function aT(e) {
    var t = e.offsets, n = t.popper, r = t.reference, i = e.placement.split("-")[0], o = Math.floor, a = ["top", "bottom"].indexOf(i) !== -1, l = a ? "right" : "bottom", s = a ? "left" : "top", u = a ? "width" : "height";
    return n[l] < o(r[s]) && (e.offsets.popper[s] = o(r[s]) - n[u]), n[s] > o(r[l]) && (e.offsets.popper[s] = o(r[l])), e;
  }
  function lT(e, t, n, r) {
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
      var s = si(l);
      return s[t] / 100 * o;
    } else if (a === "vh" || a === "vw") {
      var u = void 0;
      return a === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
    } else
      return o;
  }
  function sT(e, t, n, r) {
    var i = [0, 0], o = ["right", "left"].indexOf(r) !== -1, a = e.split(/(\+|\-)/).map(function(c) {
      return c.trim();
    }), l = a.indexOf(ts(a, function(c) {
      return c.search(/,|\s/) !== -1;
    }));
    a[l] && a[l].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var s = /\s*,\s*|\s+/, u = l !== -1 ? [a.slice(0, l).concat([a[l].split(s)[0]]), [a[l].split(s)[1]].concat(a.slice(l + 1))] : [a];
    return u = u.map(function(c, f) {
      var p = (f === 1 ? !o : o) ? "height" : "width", d = !1;
      return c.reduce(function(h, m) {
        return h[h.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (h[h.length - 1] = m, d = !0, h) : d ? (h[h.length - 1] += m, d = !1, h) : h.concat(m);
      }, []).map(function(h) {
        return lT(h, p, t, n);
      });
    }), u.forEach(function(c, f) {
      c.forEach(function(p, d) {
        Fm(p) && (i[f] += p * (c[d - 1] === "-" ? -1 : 1));
      });
    }), i;
  }
  function uT(e, t) {
    var n = t.offset, r = e.placement, i = e.offsets, o = i.popper, a = i.reference, l = r.split("-")[0], s = void 0;
    return Fm(+n) ? s = [+n, 0] : s = sT(n, o, a, l), l === "left" ? (o.top += s[0], o.left -= s[1]) : l === "right" ? (o.top += s[0], o.left += s[1]) : l === "top" ? (o.left += s[0], o.top -= s[1]) : l === "bottom" && (o.left += s[0], o.top += s[1]), e.popper = o, e;
  }
  function cT(e, t) {
    var n = t.boundariesElement || Vo(e.instance.popper);
    e.instance.reference === n && (n = Vo(n));
    var r = Lm("transform"), i = e.instance.popper.style, o = i.top, a = i.left, l = i[r];
    i.top = "", i.left = "", i[r] = "";
    var s = Rm(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
    i.top = o, i.left = a, i[r] = l, t.boundaries = s;
    var u = t.priority, c = e.offsets.popper, f = {
      primary: function(d) {
        var h = c[d];
        return c[d] < s[d] && !t.escapeWithReference && (h = Math.max(c[d], s[d])), Ho({}, d, h);
      },
      secondary: function(d) {
        var h = d === "right" ? "left" : "top", m = c[h];
        return c[d] > s[d] && !t.escapeWithReference && (m = Math.min(c[h], s[d] - (d === "right" ? c.width : c.height))), Ho({}, h, m);
      }
    };
    return u.forEach(function(p) {
      var d = ["left", "top"].indexOf(p) !== -1 ? "primary" : "secondary";
      c = fn({}, c, f[d](p));
    }), e.offsets.popper = c, e;
  }
  function fT(e) {
    var t = e.placement, n = t.split("-")[0], r = t.split("-")[1];
    if (r) {
      var i = e.offsets, o = i.reference, a = i.popper, l = ["bottom", "top"].indexOf(n) !== -1, s = l ? "left" : "top", u = l ? "width" : "height", c = {
        start: Ho({}, s, o[s]),
        end: Ho({}, s, o[s] + o[u] - a[u])
      };
      e.offsets.popper = fn({}, a, c[r]);
    }
    return e;
  }
  function pT(e) {
    if (!dS(e.instance.modifiers, "hide", "preventOverflow"))
      return e;
    var t = e.offsets.reference, n = ts(e.instance.modifiers, function(r) {
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
  function dT(e) {
    var t = e.placement, n = t.split("-")[0], r = e.offsets, i = r.popper, o = r.reference, a = ["left", "right"].indexOf(n) !== -1, l = ["top", "left"].indexOf(n) === -1;
    return i[a ? "left" : "top"] = o[n] - (l ? i[a ? "width" : "height"] : 0), e.placement = Gu(t), e.offsets.popper = si(i), e;
  }
  var hT = {
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
      fn: fT
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
      fn: uT,
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
      fn: cT,
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
      fn: aT
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
      fn: rT,
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
      fn: oT,
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
      fn: dT
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
      fn: pT
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
      fn: nT,
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
      fn: qO,
      /** @prop {Function} */
      onLoad: ZO,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: void 0
    }
  }, mT = {
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
    modifiers: hT
  }, Yc = function() {
    function e(t, n) {
      var r = this, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      zO(this, e), this.scheduleUpdate = function() {
        return requestAnimationFrame(r.update);
      }, this.update = MO(this.update.bind(this)), this.options = fn({}, e.Defaults, i), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fn({}, e.Defaults.modifiers, i.modifiers)).forEach(function(a) {
        r.options.modifiers[a] = fn({}, e.Defaults.modifiers[a] || {}, i.modifiers ? i.modifiers[a] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
        return fn({
          name: a
        }, r.options.modifiers[a]);
      }).sort(function(a, l) {
        return a.order - l.order;
      }), this.modifiers.forEach(function(a) {
        a.enabled && eS(a.onLoad) && a.onLoad(r.reference, r.popper, r.options, a, r.state);
      }), this.update();
      var o = this.options.eventsEnabled;
      o && this.enableEventListeners(), this.state.eventsEnabled = o;
    }
    return WO(e, [{
      key: "update",
      value: function() {
        return GO.call(this);
      }
    }, {
      key: "destroy",
      value: function() {
        return HO.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function() {
        return JO.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function() {
        return KO.call(this);
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
  Yc.Utils = (typeof window != "undefined" ? window : global).PopperUtils;
  Yc.placements = hS;
  Yc.Defaults = mT;
  const uy = Yc;
  function cy(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function _e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? cy(Object(n), !0).forEach(function(r) {
        yt(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cy(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function ns(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function fy(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function rs(e, t, n) {
    return t && fy(e.prototype, t), n && fy(e, n), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function yt(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function is(e, t) {
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
    }), t && Hd(e, t);
  }
  function Hu(e) {
    return Hu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
      return n.__proto__ || Object.getPrototypeOf(n);
    }, Hu(e);
  }
  function Hd(e, t) {
    return Hd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
      return r.__proto__ = i, r;
    }, Hd(e, t);
  }
  function gT() {
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
  function vT(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function mS(e, t) {
    if (e == null)
      return {};
    var n = vT(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function cr(e) {
    if (e === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function yT(e, t) {
    if (t && (typeof t == "object" || typeof t == "function"))
      return t;
    if (t !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return cr(e);
  }
  function os(e) {
    var t = gT();
    return function() {
      var r = Hu(e), i;
      if (t) {
        var o = Hu(this).constructor;
        i = Reflect.construct(r, arguments, o);
      } else
        i = r.apply(this, arguments);
      return yT(this, i);
    };
  }
  var wT = { flip: { padding: 20 }, preventOverflow: { padding: 10 } }, ge = { INIT: "init", IDLE: "idle", OPENING: "opening", OPEN: "open", CLOSING: "closing", ERROR: "error" }, hr = Qb.canUseDOM, Ia = Li.createPortal !== void 0;
  function cp() {
    return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
  }
  function js(e) {
    var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
    a && t && n && (console.groupCollapsed("%creact-floater: ".concat(t), "color: #9b00ff; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
      D.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
    }) : l.apply(console, [n]), console.groupEnd());
  }
  function bT(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    e.addEventListener(t, n, r);
  }
  function ST(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    e.removeEventListener(t, n, r);
  }
  function ET(e, t, n) {
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i;
    i = function(a) {
      n(a), ST(e, t, i);
    }, bT(e, t, i, r);
  }
  function py() {
  }
  var gS = /* @__PURE__ */ function(e) {
    is(n, e);
    var t = os(n);
    function n() {
      return ns(this, n), t.apply(this, arguments);
    }
    return rs(n, [{ key: "componentDidMount", value: function() {
      hr && (this.node || this.appendNode(), Ia || this.renderPortal());
    } }, { key: "componentDidUpdate", value: function() {
      hr && (Ia || this.renderPortal());
    } }, { key: "componentWillUnmount", value: function() {
      !hr || !this.node || (Ia || Li.unmountComponentAtNode(this.node), this.node && this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
    } }, { key: "appendNode", value: function() {
      var i = this.props, o = i.id, a = i.zIndex;
      this.node || (this.node = document.createElement("div"), o && (this.node.id = o), a && (this.node.style.zIndex = a), document.body.appendChild(this.node));
    } }, { key: "renderPortal", value: function() {
      if (!hr)
        return null;
      var i = this.props, o = i.children, a = i.setRef;
      if (this.node || this.appendNode(), Ia)
        return /* @__PURE__ */ Li.createPortal(o, this.node);
      var l = Li.unstable_renderSubtreeIntoContainer(this, o.length > 1 ? /* @__PURE__ */ k.createElement("div", null, o) : o[0], this.node);
      return a(l), null;
    } }, { key: "renderReact16", value: function() {
      var i = this.props, o = i.hasChildren, a = i.placement, l = i.target;
      return o ? this.renderPortal() : l || a === "center" ? this.renderPortal() : null;
    } }, { key: "render", value: function() {
      return Ia ? this.renderReact16() : null;
    } }]), n;
  }(k.Component);
  yt(gS, "propTypes", { children: N.oneOfType([N.element, N.array]), hasChildren: N.bool, id: N.oneOfType([N.string, N.number]), placement: N.string, setRef: N.func.isRequired, target: N.oneOfType([N.object, N.string]), zIndex: N.number });
  var vS = /* @__PURE__ */ function(e) {
    is(n, e);
    var t = os(n);
    function n() {
      return ns(this, n), t.apply(this, arguments);
    }
    return rs(n, [{ key: "parentStyle", get: function() {
      var i = this.props, o = i.placement, a = i.styles, l = a.arrow.length, s = { pointerEvents: "none", position: "absolute", width: "100%" };
      return o.startsWith("top") ? (s.bottom = 0, s.left = 0, s.right = 0, s.height = l) : o.startsWith("bottom") ? (s.left = 0, s.right = 0, s.top = 0, s.height = l) : o.startsWith("left") ? (s.right = 0, s.top = 0, s.bottom = 0) : o.startsWith("right") && (s.left = 0, s.top = 0), s;
    } }, { key: "render", value: function() {
      var i = this.props, o = i.placement, a = i.setArrowRef, l = i.styles, s = l.arrow, u = s.color, c = s.display, f = s.length, p = s.margin, d = s.position, h = s.spread, m = { display: c, position: d }, S, g = h, v = f;
      return o.startsWith("top") ? (S = "0,0 ".concat(g / 2, ",").concat(v, " ").concat(g, ",0"), m.bottom = 0, m.marginLeft = p, m.marginRight = p) : o.startsWith("bottom") ? (S = "".concat(g, ",").concat(v, " ").concat(g / 2, ",0 0,").concat(v), m.top = 0, m.marginLeft = p, m.marginRight = p) : o.startsWith("left") ? (v = h, g = f, S = "0,0 ".concat(g, ",").concat(v / 2, " 0,").concat(v), m.right = 0, m.marginTop = p, m.marginBottom = p) : o.startsWith("right") && (v = h, g = f, S = "".concat(g, ",").concat(v, " ").concat(g, ",0 0,").concat(v / 2), m.left = 0, m.marginTop = p, m.marginBottom = p), /* @__PURE__ */ k.createElement("div", { className: "__floater__arrow", style: this.parentStyle }, /* @__PURE__ */ k.createElement("span", { ref: a, style: m }, /* @__PURE__ */ k.createElement("svg", { width: g, height: v, version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k.createElement("polygon", { points: S, fill: u }))));
    } }]), n;
  }(k.Component);
  yt(vS, "propTypes", { placement: N.string.isRequired, setArrowRef: N.func.isRequired, styles: N.object.isRequired });
  var AT = ["color", "height", "width"], yS = function(t) {
    var n = t.handleClick, r = t.styles, i = r.color, o = r.height, a = r.width, l = mS(r, AT);
    return /* @__PURE__ */ k.createElement("button", { "aria-label": "close", onClick: n, style: l, type: "button" }, /* @__PURE__ */ k.createElement("svg", { width: "".concat(a, "px"), height: "".concat(o, "px"), viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, /* @__PURE__ */ k.createElement("g", null, /* @__PURE__ */ k.createElement("path", { d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z", fill: i }))));
  };
  yS.propTypes = { handleClick: N.func.isRequired, styles: N.object.isRequired };
  var wS = function(t) {
    var n = t.content, r = t.footer, i = t.handleClick, o = t.open, a = t.positionWrapper, l = t.showCloseButton, s = t.title, u = t.styles, c = { content: /* @__PURE__ */ k.isValidElement(n) ? n : /* @__PURE__ */ k.createElement("div", { className: "__floater__content", style: u.content }, n) };
    return s && (c.title = /* @__PURE__ */ k.isValidElement(s) ? s : /* @__PURE__ */ k.createElement("div", { className: "__floater__title", style: u.title }, s)), r && (c.footer = /* @__PURE__ */ k.isValidElement(r) ? r : /* @__PURE__ */ k.createElement("div", { className: "__floater__footer", style: u.footer }, r)), (l || a) && !D.boolean(o) && (c.close = /* @__PURE__ */ k.createElement(yS, { styles: u.close, handleClick: i })), /* @__PURE__ */ k.createElement("div", { className: "__floater__container", style: u.container }, c.close, c.title, c.content, c.footer);
  };
  wS.propTypes = { content: N.node.isRequired, footer: N.node, handleClick: N.func.isRequired, open: N.bool, positionWrapper: N.bool.isRequired, showCloseButton: N.bool.isRequired, styles: N.object.isRequired, title: N.node };
  var bS = /* @__PURE__ */ function(e) {
    is(n, e);
    var t = os(n);
    function n() {
      return ns(this, n), t.apply(this, arguments);
    }
    return rs(n, [{ key: "style", get: function() {
      var i = this.props, o = i.disableAnimation, a = i.component, l = i.placement, s = i.hideArrow, u = i.status, c = i.styles, f = c.arrow.length, p = c.floater, d = c.floaterCentered, h = c.floaterClosing, m = c.floaterOpening, S = c.floaterWithAnimation, g = c.floaterWithComponent, v = {};
      return s || (l.startsWith("top") ? v.padding = "0 0 ".concat(f, "px") : l.startsWith("bottom") ? v.padding = "".concat(f, "px 0 0") : l.startsWith("left") ? v.padding = "0 ".concat(f, "px 0 0") : l.startsWith("right") && (v.padding = "0 0 0 ".concat(f, "px"))), [ge.OPENING, ge.OPEN].indexOf(u) !== -1 && (v = _e(_e({}, v), m)), u === ge.CLOSING && (v = _e(_e({}, v), h)), u === ge.OPEN && !o && (v = _e(_e({}, v), S)), l === "center" && (v = _e(_e({}, v), d)), a && (v = _e(_e({}, v), g)), _e(_e({}, p), v);
    } }, { key: "render", value: function() {
      var i = this.props, o = i.component, a = i.handleClick, l = i.hideArrow, s = i.setFloaterRef, u = i.status, c = {}, f = ["__floater"];
      return o ? /* @__PURE__ */ k.isValidElement(o) ? c.content = /* @__PURE__ */ k.cloneElement(o, { closeFn: a }) : c.content = o({ closeFn: a }) : c.content = /* @__PURE__ */ k.createElement(wS, this.props), u === ge.OPEN && f.push("__floater__open"), l || (c.arrow = /* @__PURE__ */ k.createElement(vS, this.props)), /* @__PURE__ */ k.createElement("div", { ref: s, className: f.join(" "), style: this.style }, /* @__PURE__ */ k.createElement("div", { className: "__floater__body" }, c.content, c.arrow));
    } }]), n;
  }(k.Component);
  yt(bS, "propTypes", { component: N.oneOfType([N.func, N.element]), content: N.node, disableAnimation: N.bool.isRequired, footer: N.node, handleClick: N.func.isRequired, hideArrow: N.bool.isRequired, open: N.bool, placement: N.string.isRequired, positionWrapper: N.bool.isRequired, setArrowRef: N.func.isRequired, setFloaterRef: N.func.isRequired, showCloseButton: N.bool, status: N.string.isRequired, styles: N.object.isRequired, title: N.node });
  var SS = /* @__PURE__ */ function(e) {
    is(n, e);
    var t = os(n);
    function n() {
      return ns(this, n), t.apply(this, arguments);
    }
    return rs(n, [{ key: "render", value: function() {
      var i = this.props, o = i.children, a = i.handleClick, l = i.handleMouseEnter, s = i.handleMouseLeave, u = i.setChildRef, c = i.setWrapperRef, f = i.style, p = i.styles, d;
      if (o)
        if (k.Children.count(o) === 1)
          if (!/* @__PURE__ */ k.isValidElement(o))
            d = /* @__PURE__ */ k.createElement("span", null, o);
          else {
            var h = D.function(o.type) ? "innerRef" : "ref";
            d = /* @__PURE__ */ k.cloneElement(k.Children.only(o), yt({}, h, u));
          }
        else
          d = o;
      return d ? /* @__PURE__ */ k.createElement("span", { ref: c, style: _e(_e({}, p), f), onClick: a, onMouseEnter: l, onMouseLeave: s }, d) : null;
    } }]), n;
  }(k.Component);
  yt(SS, "propTypes", { children: N.node, handleClick: N.func.isRequired, handleMouseEnter: N.func.isRequired, handleMouseLeave: N.func.isRequired, setChildRef: N.func.isRequired, setWrapperRef: N.func.isRequired, style: N.object, styles: N.object.isRequired });
  var CT = { zIndex: 100 };
  function xT(e) {
    var t = Jn(CT, e.options || {});
    return { wrapper: { cursor: "help", display: "inline-flex", flexDirection: "column", zIndex: t.zIndex }, wrapperPosition: { left: -1e3, position: "absolute", top: -1e3, visibility: "hidden" }, floater: { display: "inline-block", filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))", maxWidth: 300, opacity: 0, position: "relative", transition: "opacity 0.3s", visibility: "hidden", zIndex: t.zIndex }, floaterOpening: { opacity: 1, visibility: "visible" }, floaterWithAnimation: { opacity: 1, transition: "opacity 0.3s, transform 0.2s", visibility: "visible" }, floaterWithComponent: { maxWidth: "100%" }, floaterClosing: { opacity: 0, visibility: "visible" }, floaterCentered: { left: "50%", position: "fixed", top: "50%", transform: "translate(-50%, -50%)" }, container: { backgroundColor: "#fff", color: "#666", minHeight: 60, minWidth: 200, padding: 20, position: "relative", zIndex: 10 }, title: { borderBottom: "1px solid #555", color: "#555", fontSize: 18, marginBottom: 5, paddingBottom: 6, paddingRight: 18 }, content: { fontSize: 15 }, close: { backgroundColor: "transparent", border: 0, borderRadius: 0, color: "#555", fontSize: 0, height: 15, outline: "none", padding: 10, position: "absolute", right: 0, top: 0, width: 15, WebkitAppearance: "none" }, footer: { borderTop: "1px solid #ccc", fontSize: 13, marginTop: 10, paddingTop: 5 }, arrow: { color: "#fff", display: "inline-flex", length: 16, margin: 8, position: "absolute", spread: 32 }, options: t };
  }
  var kT = ["arrow", "flip", "offset"], OT = ["position", "top", "right", "bottom", "left"], Mm = /* @__PURE__ */ function(e) {
    is(n, e);
    var t = os(n);
    function n(r) {
      var i;
      return ns(this, n), i = t.call(this, r), yt(cr(i), "setArrowRef", function(o) {
        i.arrowRef = o;
      }), yt(cr(i), "setChildRef", function(o) {
        i.childRef = o;
      }), yt(cr(i), "setFloaterRef", function(o) {
        i.floaterRef = o;
      }), yt(cr(i), "setWrapperRef", function(o) {
        i.wrapperRef = o;
      }), yt(cr(i), "handleTransitionEnd", function() {
        var o = i.state.status, a = i.props.callback;
        i.wrapperPopper && i.wrapperPopper.instance.update(), i.setState({ status: o === ge.OPENING ? ge.OPEN : ge.IDLE }, function() {
          var l = i.state.status;
          a(l === ge.OPEN ? "open" : "close", i.props);
        });
      }), yt(cr(i), "handleClick", function() {
        var o = i.props, a = o.event, l = o.open;
        if (!D.boolean(l)) {
          var s = i.state, u = s.positionWrapper, c = s.status;
          (i.event === "click" || i.event === "hover" && u) && (js({ title: "click", data: [{ event: a, status: c === ge.OPEN ? "closing" : "opening" }], debug: i.debug }), i.toggle());
        }
      }), yt(cr(i), "handleMouseEnter", function() {
        var o = i.props, a = o.event, l = o.open;
        if (!(D.boolean(l) || cp())) {
          var s = i.state.status;
          i.event === "hover" && s === ge.IDLE && (js({ title: "mouseEnter", data: [{ key: "originalEvent", value: a }], debug: i.debug }), clearTimeout(i.eventDelayTimeout), i.toggle());
        }
      }), yt(cr(i), "handleMouseLeave", function() {
        var o = i.props, a = o.event, l = o.eventDelay, s = o.open;
        if (!(D.boolean(s) || cp())) {
          var u = i.state, c = u.status, f = u.positionWrapper;
          i.event === "hover" && (js({ title: "mouseLeave", data: [{ key: "originalEvent", value: a }], debug: i.debug }), l ? [ge.OPENING, ge.OPEN].indexOf(c) !== -1 && !f && !i.eventDelayTimeout && (i.eventDelayTimeout = setTimeout(function() {
            delete i.eventDelayTimeout, i.toggle();
          }, l * 1e3)) : i.toggle(ge.IDLE));
        }
      }), i.state = { currentPlacement: r.placement, needsUpdate: !1, positionWrapper: r.wrapperOptions.position && !!r.target, status: ge.INIT, statusWrapper: ge.INIT }, i._isMounted = !1, i.hasMounted = !1, hr && window.addEventListener("load", function() {
        i.popper && i.popper.instance.update(), i.wrapperPopper && i.wrapperPopper.instance.update();
      }), i;
    }
    return rs(n, [{ key: "componentDidMount", value: function() {
      if (hr) {
        var i = this.state.positionWrapper, o = this.props, a = o.children, l = o.open, s = o.target;
        this._isMounted = !0, js({ title: "init", data: { hasChildren: !!a, hasTarget: !!s, isControlled: D.boolean(l), positionWrapper: i, target: this.target, floater: this.floaterRef }, debug: this.debug }), this.hasMounted || (this.initPopper(), this.hasMounted = !0), !a && s && D.boolean(l);
      }
    } }, { key: "componentDidUpdate", value: function(i, o) {
      if (hr) {
        var a = this.props, l = a.autoOpen, s = a.open, u = a.target, c = a.wrapperOptions, f = Fl(o, this.state), p = f.changedFrom, d = f.changed;
        if (i.open !== s) {
          var h;
          D.boolean(s) && (h = s ? ge.OPENING : ge.CLOSING), this.toggle(h);
        }
        (i.wrapperOptions.position !== c.position || i.target !== u) && this.changeWrapperPosition(this.props), d("status", ge.IDLE) && s ? this.toggle(ge.OPEN) : p("status", ge.INIT, ge.IDLE) && l && this.toggle(ge.OPEN), this.popper && d("status", ge.OPENING) && this.popper.instance.update(), this.floaterRef && (d("status", ge.OPENING) || d("status", ge.CLOSING)) && ET(this.floaterRef, "transitionend", this.handleTransitionEnd), d("needsUpdate", !0) && this.rebuildPopper();
      }
    } }, { key: "componentWillUnmount", value: function() {
      hr && (this._isMounted = !1, this.popper && this.popper.instance.destroy(), this.wrapperPopper && this.wrapperPopper.instance.destroy());
    } }, { key: "initPopper", value: function() {
      var i = this, o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.target, a = this.state.positionWrapper, l = this.props, s = l.disableFlip, u = l.getPopper, c = l.hideArrow, f = l.offset, p = l.placement, d = l.wrapperOptions, h = p === "top" || p === "bottom" ? "flip" : ["right", "bottom-end", "top-end", "left", "top-start", "bottom-start"];
      if (p === "center")
        this.setState({ status: ge.IDLE });
      else if (o && this.floaterRef) {
        var m = this.options, S = m.arrow, g = m.flip, v = m.offset, w = mS(m, kT);
        new uy(o, this.floaterRef, { placement: p, modifiers: _e({ arrow: _e({ enabled: !c, element: this.arrowRef }, S), flip: _e({ enabled: !s, behavior: h }, g), offset: _e({ offset: "0, ".concat(f, "px") }, v) }, w), onCreate: function(b) {
          var A;
          if (i.popper = b, !((A = i.floaterRef) !== null && A !== void 0 && A.isConnected)) {
            i.setState({ needsUpdate: !0 });
            return;
          }
          u(b, "floater"), i._isMounted && i.setState({ currentPlacement: b.placement, status: ge.IDLE }), p !== b.placement && setTimeout(function() {
            b.instance.update();
          }, 1);
        }, onUpdate: function(b) {
          i.popper = b;
          var A = i.state.currentPlacement;
          i._isMounted && b.placement !== A && i.setState({ currentPlacement: b.placement });
        } });
      }
      if (a) {
        var E = D.undefined(d.offset) ? 0 : d.offset;
        new uy(this.target, this.wrapperRef, { placement: d.placement || p, modifiers: { arrow: { enabled: !1 }, offset: { offset: "0, ".concat(E, "px") }, flip: { enabled: !1 } }, onCreate: function(b) {
          i.wrapperPopper = b, i._isMounted && i.setState({ statusWrapper: ge.IDLE }), u(b, "wrapper"), p !== b.placement && setTimeout(function() {
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
      return a === "hover" && cp() && !o ? "click" : a;
    } }, { key: "options", get: function() {
      var i = this.props.options;
      return Jn(wT, i || {});
    } }, { key: "styles", get: function() {
      var i = this, o = this.state, a = o.status, l = o.positionWrapper, s = o.statusWrapper, u = this.props.styles, c = Jn(xT(u), u);
      if (l) {
        var f;
        [ge.IDLE].indexOf(a) === -1 || [ge.IDLE].indexOf(s) === -1 ? f = c.wrapperPosition : f = this.wrapperPopper.styles, c.wrapper = _e(_e({}, c.wrapper), f);
      }
      if (this.target) {
        var p = window.getComputedStyle(this.target);
        this.wrapperStyles ? c.wrapper = _e(_e({}, c.wrapper), this.wrapperStyles) : ["relative", "static"].indexOf(p.position) === -1 && (this.wrapperStyles = {}, l || (OT.forEach(function(d) {
          i.wrapperStyles[d] = p[d];
        }), c.wrapper = _e(_e({}, c.wrapper), this.wrapperStyles), this.target.style.position = "relative", this.target.style.top = "auto", this.target.style.right = "auto", this.target.style.bottom = "auto", this.target.style.left = "auto"));
      }
      return c;
    } }, { key: "target", get: function() {
      if (!hr)
        return null;
      var i = this.props.target;
      return i ? D.domElement(i) ? i : document.querySelector(i) : this.childRef || this.wrapperRef;
    } }, { key: "render", value: function() {
      var i = this.state, o = i.currentPlacement, a = i.positionWrapper, l = i.status, s = this.props, u = s.children, c = s.component, f = s.content, p = s.disableAnimation, d = s.footer, h = s.hideArrow, m = s.id, S = s.open, g = s.showCloseButton, v = s.style, w = s.target, E = s.title, O = /* @__PURE__ */ k.createElement(SS, { handleClick: this.handleClick, handleMouseEnter: this.handleMouseEnter, handleMouseLeave: this.handleMouseLeave, setChildRef: this.setChildRef, setWrapperRef: this.setWrapperRef, style: v, styles: this.styles.wrapper }, u), b = {};
      return a ? b.wrapperInPortal = O : b.wrapperAsChildren = O, /* @__PURE__ */ k.createElement("span", null, /* @__PURE__ */ k.createElement(gS, { hasChildren: !!u, id: m, placement: o, setRef: this.setFloaterRef, target: w, zIndex: this.styles.options.zIndex }, /* @__PURE__ */ k.createElement(bS, { component: c, content: f, disableAnimation: p, footer: d, handleClick: this.handleClick, hideArrow: h || o === "center", open: S, placement: o, positionWrapper: a, setArrowRef: this.setArrowRef, setFloaterRef: this.setFloaterRef, showCloseButton: g, status: l, styles: this.styles, title: E }), b.wrapperInPortal), b.wrapperAsChildren);
    } }]), n;
  }(k.Component);
  yt(Mm, "propTypes", { autoOpen: N.bool, callback: N.func, children: N.node, component: ry(N.oneOfType([N.func, N.element]), function(e) {
    return !e.content;
  }), content: ry(N.node, function(e) {
    return !e.component;
  }), debug: N.bool, disableAnimation: N.bool, disableFlip: N.bool, disableHoverToClick: N.bool, event: N.oneOf(["hover", "click"]), eventDelay: N.number, footer: N.node, getPopper: N.func, hideArrow: N.bool, id: N.oneOfType([N.string, N.number]), offset: N.number, open: N.bool, options: N.object, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto", "center"]), showCloseButton: N.bool, style: N.object, styles: N.object, target: N.oneOfType([N.object, N.string]), title: N.node, wrapperOptions: N.shape({ offset: N.number, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto"]), position: N.bool }) });
  yt(Mm, "defaultProps", { autoOpen: !1, callback: py, debug: !1, disableAnimation: !1, disableFlip: !1, disableHoverToClick: !1, event: "click", eventDelay: 0.4, getPopper: py, hideArrow: !1, offset: 15, placement: "bottom", showCloseButton: !1, styles: {}, target: null, wrapperOptions: { position: !1 } });
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
  function G(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? dy(Object(n), !0).forEach(function(r) {
        Z(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dy(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function Ir(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function hy(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function Pr(e, t, n) {
    return t && hy(e.prototype, t), n && hy(e, n), Object.defineProperty(e, "prototype", {
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
  function Jt() {
    return Jt = Object.assign ? Object.assign.bind() : function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }, Jt.apply(this, arguments);
  }
  function Ki(e, t) {
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
    }), t && $d(e, t);
  }
  function $u(e) {
    return $u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
      return n.__proto__ || Object.getPrototypeOf(n);
    }, $u(e);
  }
  function $d(e, t) {
    return $d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
      return r.__proto__ = i, r;
    }, $d(e, t);
  }
  function TT() {
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
  function IT(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function Ju(e, t) {
    if (e == null)
      return {};
    var n = IT(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function Be(e) {
    if (e === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function PT(e, t) {
    if (t && (typeof t == "object" || typeof t == "function"))
      return t;
    if (t !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return Be(e);
  }
  function Xi(e) {
    var t = TT();
    return function() {
      var r = $u(e), i;
      if (t) {
        var o = $u(this).constructor;
        i = Reflect.construct(r, arguments, o);
      } else
        i = r.apply(this, arguments);
      return PT(this, i);
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
  }, Ct = {
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
  }, pe = {
    IDLE: "idle",
    READY: "ready",
    WAITING: "waiting",
    RUNNING: "running",
    PAUSED: "paused",
    SKIPPED: "skipped",
    FINISHED: "finished",
    ERROR: "error"
  }, Wr = Qb.canUseDOM, Pa = oi.createPortal !== void 0;
  function ES() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : navigator.userAgent, t = e;
    return typeof window == "undefined" ? t = "node" : document.documentMode ? t = "ie" : /Edge/.test(e) ? t = "edge" : Boolean(window.opera) || e.indexOf(" OPR/") >= 0 ? t = "opera" : typeof window.InstallTrigger != "undefined" ? t = "firefox" : window.chrome ? t = "chrome" : /(Version\/([0-9._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(e) && (t = "safari"), t;
  }
  function fp(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function _a(e) {
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
  function my(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function _T(e, t) {
    return !Ge.plainObject(e) || !Ge.array(t) ? !1 : Object.keys(e).every(function(n) {
      return t.indexOf(n) !== -1;
    });
  }
  function NT(e) {
    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = e.replace(t, function(i, o, a, l) {
      return o + o + a + a + l + l;
    }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
    return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [];
  }
  function gy(e) {
    return e.disableBeacon || e.placement === "center";
  }
  function Jd(e, t) {
    var n, r = /* @__PURE__ */ J.isValidElement(e) || /* @__PURE__ */ J.isValidElement(t), i = Ge.undefined(e) || Ge.undefined(t);
    if (fp(e) !== fp(t) || r || i)
      return !1;
    if (Ge.domElement(e))
      return e.isSameNode(t);
    if (Ge.number(e))
      return e === t;
    if (Ge.function(e))
      return e.toString() === t.toString();
    for (var o in e)
      if (my(e, o)) {
        if (typeof e[o] == "undefined" || typeof t[o] == "undefined")
          return !1;
        if (n = fp(e[o]), ["object", "array"].indexOf(n) !== -1 && Jd(e[o], t[o]) || n === "function" && Jd(e[o], t[o]))
          continue;
        if (e[o] !== t[o])
          return !1;
      }
    for (var a in t)
      if (my(t, a) && typeof e[a] == "undefined")
        return !1;
    return !0;
  }
  function vy() {
    return ["chrome", "safari", "firefox", "opera"].indexOf(ES()) === -1;
  }
  function Vi(e) {
    var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
    a && (t && n ? (console.groupCollapsed("%creact-joyride: ".concat(t), "color: #ff0044; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
      Ge.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
    }) : l.apply(console, [n]), console.groupEnd()) : console.error("Missing title or data props"));
  }
  var DT = {
    action: "",
    controlled: !1,
    index: 0,
    lifecycle: se.INIT,
    size: 0,
    status: pe.IDLE
  }, yy = ["action", "index", "lifecycle", "status"];
  function RT(e) {
    var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ function() {
      function i() {
        var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = a.continuous, s = l === void 0 ? !1 : l, u = a.stepIndex, c = a.steps, f = c === void 0 ? [] : c;
        Ir(this, i), Z(this, "listener", void 0), Z(this, "setSteps", function(p) {
          var d = o.getState(), h = d.size, m = d.status, S = {
            size: p.length,
            status: m
          };
          n.set("steps", p), m === pe.WAITING && !h && p.length && (S.status = pe.RUNNING), o.setState(S);
        }), Z(this, "addListener", function(p) {
          o.listener = p;
        }), Z(this, "update", function(p) {
          if (!_T(p, yy))
            throw new Error("State is not valid. Valid keys: ".concat(yy.join(", ")));
          o.setState(G({}, o.getNextState(G(G(G({}, o.getState()), p), {}, {
            action: p.action || ce.UPDATE
          }), !0)));
        }), Z(this, "start", function(p) {
          var d = o.getState(), h = d.index, m = d.size;
          o.setState(G(G({}, o.getNextState({
            action: ce.START,
            index: Ge.number(p) ? p : h
          }, !0)), {}, {
            status: m ? pe.RUNNING : pe.WAITING
          }));
        }), Z(this, "stop", function() {
          var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, d = o.getState(), h = d.index, m = d.status;
          [pe.FINISHED, pe.SKIPPED].indexOf(m) === -1 && o.setState(G(G({}, o.getNextState({
            action: ce.STOP,
            index: h + (p ? 1 : 0)
          })), {}, {
            status: pe.PAUSED
          }));
        }), Z(this, "close", function() {
          var p = o.getState(), d = p.index, h = p.status;
          h === pe.RUNNING && o.setState(G({}, o.getNextState({
            action: ce.CLOSE,
            index: d + 1
          })));
        }), Z(this, "go", function(p) {
          var d = o.getState(), h = d.controlled, m = d.status;
          if (!(h || m !== pe.RUNNING)) {
            var S = o.getSteps()[p];
            o.setState(G(G({}, o.getNextState({
              action: ce.GO,
              index: p
            })), {}, {
              status: S ? m : pe.FINISHED
            }));
          }
        }), Z(this, "info", function() {
          return o.getState();
        }), Z(this, "next", function() {
          var p = o.getState(), d = p.index, h = p.status;
          h === pe.RUNNING && o.setState(o.getNextState({
            action: ce.NEXT,
            index: d + 1
          }));
        }), Z(this, "open", function() {
          var p = o.getState(), d = p.status;
          d === pe.RUNNING && o.setState(G({}, o.getNextState({
            action: ce.UPDATE,
            lifecycle: se.TOOLTIP
          })));
        }), Z(this, "prev", function() {
          var p = o.getState(), d = p.index, h = p.status;
          h === pe.RUNNING && o.setState(G({}, o.getNextState({
            action: ce.PREV,
            index: d - 1
          })));
        }), Z(this, "reset", function() {
          var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, d = o.getState(), h = d.controlled;
          h || o.setState(G(G({}, o.getNextState({
            action: ce.RESET,
            index: 0
          })), {}, {
            status: p ? pe.RUNNING : pe.READY
          }));
        }), Z(this, "skip", function() {
          var p = o.getState(), d = p.status;
          d === pe.RUNNING && o.setState({
            action: ce.SKIP,
            lifecycle: se.INIT,
            status: pe.SKIPPED
          });
        }), this.setState({
          action: ce.INIT,
          controlled: Ge.number(u),
          continuous: s,
          index: Ge.number(u) ? u : 0,
          lifecycle: se.INIT,
          status: f.length ? pe.READY : pe.IDLE
        }, !0), this.setSteps(f);
      }
      return Pr(i, [{
        key: "setState",
        value: function(a) {
          var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = G(G({}, s), a), c = u.action, f = u.index, p = u.lifecycle, d = u.size, h = u.status;
          t.set("action", c), t.set("index", f), t.set("lifecycle", p), t.set("size", d), t.set("status", h), l && (t.set("controlled", a.controlled), t.set("continuous", a.continuous)), this.listener && this.hasUpdatedState(s) && this.listener(this.getState());
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
          } : G({}, DT);
        }
      }, {
        key: "getNextState",
        value: function(a) {
          var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = s.action, c = s.controlled, f = s.index, p = s.size, d = s.status, h = Ge.number(a.index) ? a.index : f, m = c && !l ? f : Math.min(Math.max(h, 0), p);
          return {
            action: a.action || u,
            controlled: c,
            index: m,
            lifecycle: a.lifecycle || se.INIT,
            size: a.size || p,
            status: m === p ? pe.FINISHED : a.status || d
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
  function AS(e) {
    return e ? e.getBoundingClientRect() : {};
  }
  function LT() {
    var e = document, t = e.body, n = e.documentElement;
    return !t || !n ? 0 : Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight);
  }
  function ni(e) {
    return typeof e == "string" ? document.querySelector(e) : e;
  }
  function FT(e) {
    return !e || e.nodeType !== 1 ? {} : getComputedStyle(e);
  }
  function Vc(e, t, n) {
    var r = Kb(e);
    if (r.isSameNode(ll()))
      return n ? document : ll();
    var i = r.scrollHeight > r.offsetHeight;
    return !i && !t ? (r.style.overflow = "initial", ll()) : r;
  }
  function Gc(e, t) {
    if (!e)
      return !1;
    var n = Vc(e, t);
    return !n.isSameNode(ll());
  }
  function MT(e) {
    return e.offsetParent !== document.body;
  }
  function $o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "fixed";
    if (!e || !(e instanceof HTMLElement))
      return !1;
    var n = e.nodeName;
    return n === "BODY" || n === "HTML" ? !1 : FT(e).position === t ? !0 : $o(e.parentNode, t);
  }
  function BT(e) {
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
  function UT(e, t, n) {
    var r = AS(e), i = Vc(e, n), o = Gc(e, n), a = 0;
    i instanceof HTMLElement && (a = i.scrollTop);
    var l = r.top + (!o && !$o(e) ? a : 0);
    return Math.floor(l - t);
  }
  function Qd(e) {
    return e instanceof HTMLElement ? e.offsetParent instanceof HTMLElement ? Qd(e.offsetParent) + e.offsetTop : e.offsetTop : 0;
  }
  function zT(e, t, n) {
    if (!e)
      return 0;
    var r = Kb(e), i = Qd(e);
    return Gc(e, n) && !MT(e) && (i -= Qd(r)), Math.floor(i - t);
  }
  function ll() {
    return document.scrollingElement || document.createElement("body");
  }
  function WT(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ll(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300;
    return new Promise(function(r, i) {
      var o = t.scrollTop, a = e > o ? e - o : o - e;
      rO.top(t, e, {
        duration: a < 100 ? 50 : n
      }, function(l) {
        return l && l.message !== "Element already at target scroll position" ? i(l) : r();
      });
    });
  }
  function jT(e) {
    function t(r, i, o, a, l, s) {
      var u = a || "<<anonymous>>", c = s || o;
      if (i[o] == null)
        return r ? new Error("Required ".concat(l, " `").concat(c, "` was not specified in `").concat(u, "`.")) : null;
      for (var f = arguments.length, p = new Array(f > 6 ? f - 6 : 0), d = 6; d < f; d++)
        p[d - 6] = arguments[d];
      return e.apply(void 0, [i, o, u, l, c].concat(p));
    }
    var n = t.bind(null, !1);
    return n.isRequired = t.bind(null, !0), n;
  }
  jT(function(e, t, n, r, i) {
    var o = e[t], a = o;
    if (!/* @__PURE__ */ k.isValidElement(o) && zr.isValidElementType(o)) {
      var l = {
        ref: function() {
        },
        step: {}
      };
      a = /* @__PURE__ */ k.createElement(a, l);
    }
    if (Ge.string(o) || Ge.number(o) || !zr.isValidElementType(o) || [zr.Element, zr.ForwardRef].indexOf(zr.typeOf(a)) === -1)
      return new Error("Invalid ".concat(r, " `").concat(i, "` supplied to `").concat(n, "`. Expected a React class or forwardRef."));
  });
  var YT = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#f04",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    zIndex: 100
  }, Na = {
    backgroundColor: "transparent",
    border: 0,
    borderRadius: 0,
    color: "#555",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    padding: 8,
    WebkitAppearance: "none"
  }, wy = {
    borderRadius: 4,
    position: "absolute"
  };
  function VT() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = Jn(YT, e.options || {}), n = 290;
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
      beacon: G(G({}, Na), {}, {
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
        backgroundColor: "rgba(".concat(NT(t.primaryColor).join(","), ", 0.2)"),
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
      buttonNext: G(G({}, Na), {}, {
        backgroundColor: t.primaryColor,
        borderRadius: 4,
        color: "#fff"
      }),
      buttonBack: G(G({}, Na), {}, {
        color: t.primaryColor,
        marginLeft: "auto",
        marginRight: 5
      }),
      buttonClose: G(G({}, Na), {}, {
        color: t.textColor,
        height: 14,
        padding: 15,
        position: "absolute",
        right: 0,
        top: 0,
        width: 14
      }),
      buttonSkip: G(G({}, Na), {}, {
        color: t.textColor,
        fontSize: 14
      }),
      overlay: G(G({}, r), {}, {
        backgroundColor: t.overlayColor,
        mixBlendMode: "hard-light"
      }),
      overlayLegacy: G({}, r),
      overlayLegacyCenter: G(G({}, r), {}, {
        backgroundColor: t.overlayColor
      }),
      spotlight: G(G({}, wy), {}, {
        backgroundColor: "gray"
      }),
      spotlightLegacy: G(G({}, wy), {}, {
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
    return Jn(i, e);
  }
  var pp = {
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
  function GT(e) {
    var t = ["beaconComponent", "disableCloseOnEsc", "disableOverlay", "disableOverlayClose", "disableScrolling", "disableScrollParentFix", "floaterProps", "hideBackButton", "hideCloseButton", "locale", "showProgress", "showSkipButton", "spotlightClicks", "spotlightPadding", "styles", "tooltipComponent"];
    return Object.keys(e).filter(function(n) {
      return t.indexOf(n) !== -1;
    }).reduce(function(n, r) {
      return n[r] = e[r], n;
    }, {});
  }
  function Da(e, t) {
    if (!e)
      return null;
    var n = Jn.all([GT(t), pp.step, e], {
      isMergeableObject: Ge.plainObject
    }), r = VT(Jn(t.styles || {}, e.styles || {})), i = Gc(ni(e.target), n.disableScrollParentFix), o = Jn.all([t.floaterProps || {}, pp.floaterProps, n.floaterProps || {}]);
    return o.offset = n.offset, o.styles = Jn(o.styles || {}, r.floaterStyles || {}), delete r.floaterStyles, o.offset += t.spotlightPadding || e.spotlightPadding || 0, e.placementBeacon && (o.wrapperOptions.placement = e.placementBeacon), i && (o.options.preventOverflow.boundariesElement = "window"), G(G({}, n), {}, {
      locale: Jn.all([pp.locale, t.locale || {}, n.locale || {}]),
      floaterProps: o,
      styles: r
    });
  }
  function CS(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ge.plainObject(e) ? e.target ? !0 : (Vi({
      title: "validateStep",
      data: "target is missing from the step",
      warn: !0,
      debug: t
    }), !1) : (Vi({
      title: "validateStep",
      data: "step must be an object",
      warn: !0,
      debug: t
    }), !1);
  }
  function by(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ge.array(e) ? e.every(function(n) {
      return CS(n, t);
    }) : (Vi({
      title: "validateSteps",
      data: "steps must be an array",
      warn: !0,
      debug: t
    }), !1);
  }
  var HT = /* @__PURE__ */ Pr(function e(t) {
    var n = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Ir(this, e), Z(this, "element", void 0), Z(this, "options", void 0), Z(this, "canBeTabbed", function(i) {
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
  }), $T = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n(r) {
      var i;
      if (Ir(this, n), i = t.call(this, r), Z(Be(i), "setBeaconRef", function(s) {
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
    return Pr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this, o = this.props.shouldFocus;
        setTimeout(function() {
          Ge.domElement(i.beacon) && o && i.beacon.focus();
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
          c = /* @__PURE__ */ k.createElement(f, u);
        } else
          c = /* @__PURE__ */ k.createElement("button", Jt({
            key: "JoyrideBeacon",
            className: "react-joyride__beacon",
            style: s.beacon,
            type: "button"
          }, u), /* @__PURE__ */ k.createElement("span", {
            style: s.beaconInner
          }), /* @__PURE__ */ k.createElement("span", {
            style: s.beaconOuter
          }));
        return c;
      }
    }]), n;
  }(k.Component);
  function JT(e) {
    var t = e.styles;
    return /* @__PURE__ */ k.createElement("div", {
      key: "JoyrideSpotlight",
      className: "react-joyride__spotlight",
      style: t
    });
  }
  var QT = ["mixBlendMode", "zIndex"], KT = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n() {
      var r;
      Ir(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Be(r), "_isMounted", !1), Z(Be(r), "state", {
        mouseOverSpotlight: !1,
        isScrolling: !1,
        showSpotlight: !0
      }), Z(Be(r), "handleMouseMove", function(l) {
        var s = r.state.mouseOverSpotlight, u = r.spotlightStyles, c = u.height, f = u.left, p = u.position, d = u.top, h = u.width, m = p === "fixed" ? l.clientY : l.pageY, S = p === "fixed" ? l.clientX : l.pageX, g = m >= d && m <= d + c, v = S >= f && S <= f + h, w = v && g;
        w !== s && r.updateState({
          mouseOverSpotlight: w
        });
      }), Z(Be(r), "handleScroll", function() {
        var l = r.props.target, s = ni(l);
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
          $o(s, "sticky") && r.updateState({});
      }), Z(Be(r), "handleResize", function() {
        clearTimeout(r.resizeTimeout), r.resizeTimeout = setTimeout(function() {
          r._isMounted && r.forceUpdate();
        }, 100);
      }), r;
    }
    return Pr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this.props;
        i.debug, i.disableScrolling;
        var o = i.disableScrollParentFix, a = i.target, l = ni(a);
        this.scrollParent = Vc(l, o, !0), this._isMounted = !0, window.addEventListener("resize", this.handleResize);
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
        var i = this.state.showSpotlight, o = this.props, a = o.disableScrollParentFix, l = o.spotlightClicks, s = o.spotlightPadding, u = o.styles, c = o.target, f = ni(c), p = AS(f), d = $o(f), h = UT(f, s, a);
        return G(G({}, vy() ? u.spotlightLegacy : u.spotlight), {}, {
          height: Math.round(p.height + s * 2),
          left: Math.round(p.left - s),
          opacity: i ? 1 : 0,
          pointerEvents: l ? "none" : "auto",
          position: d ? "fixed" : "absolute",
          top: h,
          transition: "opacity 0.2s",
          width: Math.round(p.width + s * 2)
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
        var i = this.state, o = i.mouseOverSpotlight, a = i.showSpotlight, l = this.props, s = l.disableOverlay, u = l.disableOverlayClose, c = l.lifecycle, f = l.onClickOverlay, p = l.placement, d = l.styles;
        if (s || c !== se.TOOLTIP)
          return null;
        var h = d.overlay;
        vy() && (h = p === "center" ? d.overlayLegacyCenter : d.overlayLegacy);
        var m = G({
          cursor: u ? "default" : "pointer",
          height: LT(),
          pointerEvents: o ? "none" : "auto"
        }, h), S = p !== "center" && a && /* @__PURE__ */ k.createElement(JT, {
          styles: this.spotlightStyles
        });
        if (ES() === "safari") {
          m.mixBlendMode, m.zIndex;
          var g = Ju(m, QT);
          S = /* @__PURE__ */ k.createElement("div", {
            style: G({}, g)
          }, S), delete m.backgroundColor;
        }
        return /* @__PURE__ */ k.createElement("div", {
          className: "react-joyride__overlay",
          style: m,
          onClick: f
        }, S);
      }
    }]), n;
  }(k.Component), XT = ["styles"], qT = ["color", "height", "width"];
  function ZT(e) {
    var t = e.styles, n = Ju(e, XT), r = t.color, i = t.height, o = t.width, a = Ju(t, qT);
    return /* @__PURE__ */ k.createElement("button", Jt({
      style: a,
      type: "button"
    }, n), /* @__PURE__ */ k.createElement("svg", {
      width: typeof o == "number" ? "".concat(o, "px") : o,
      height: typeof i == "number" ? "".concat(i, "px") : i,
      viewBox: "0 0 18 18",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid"
    }, /* @__PURE__ */ k.createElement("g", null, /* @__PURE__ */ k.createElement("path", {
      d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
      fill: r
    }))));
  }
  var eI = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n() {
      return Ir(this, n), t.apply(this, arguments);
    }
    return Pr(n, [{
      key: "render",
      value: function() {
        var i = this.props, o = i.backProps, a = i.closeProps, l = i.continuous, s = i.index, u = i.isLastStep, c = i.primaryProps, f = i.size, p = i.skipProps, d = i.step, h = i.tooltipProps, m = d.content, S = d.hideBackButton, g = d.hideCloseButton, v = d.hideFooter, w = d.showProgress, E = d.showSkipButton, O = d.title, b = d.styles, A = d.locale, T = A.back, P = A.close, _ = A.last, I = A.next, F = A.skip, U = {
          primary: P
        };
        return l && (U.primary = u ? _ : I, w && (U.primary = /* @__PURE__ */ k.createElement("span", null, U.primary, " (", s + 1, "/", f, ")"))), E && !u && (U.skip = /* @__PURE__ */ k.createElement("button", Jt({
          style: b.buttonSkip,
          type: "button",
          "aria-live": "off"
        }, p), F)), !S && s > 0 && (U.back = /* @__PURE__ */ k.createElement("button", Jt({
          style: b.buttonBack,
          type: "button"
        }, o), T)), U.close = !g && /* @__PURE__ */ k.createElement(ZT, Jt({
          styles: b.buttonClose
        }, a)), /* @__PURE__ */ k.createElement("div", Jt({
          key: "JoyrideTooltip",
          className: "react-joyride__tooltip",
          style: b.tooltip
        }, h), /* @__PURE__ */ k.createElement("div", {
          style: b.tooltipContainer
        }, O && /* @__PURE__ */ k.createElement("h4", {
          style: b.tooltipTitle,
          "aria-label": O
        }, O), /* @__PURE__ */ k.createElement("div", {
          style: b.tooltipContent
        }, m)), !v && /* @__PURE__ */ k.createElement("div", {
          style: b.tooltipFooter
        }, /* @__PURE__ */ k.createElement("div", {
          style: b.tooltipFooterSpacer
        }, U.skip), U.back, /* @__PURE__ */ k.createElement("button", Jt({
          style: b.buttonNext,
          type: "button"
        }, c), U.primary)), U.close);
      }
    }]), n;
  }(k.Component), tI = ["beaconComponent", "tooltipComponent"], nI = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n() {
      var r;
      Ir(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Be(r), "handleClickBack", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.prev();
      }), Z(Be(r), "handleClickClose", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.close();
      }), Z(Be(r), "handleClickPrimary", function(l) {
        l.preventDefault();
        var s = r.props, u = s.continuous, c = s.helpers;
        if (!u) {
          c.close();
          return;
        }
        c.next();
      }), Z(Be(r), "handleClickSkip", function(l) {
        l.preventDefault();
        var s = r.props.helpers;
        s.skip();
      }), Z(Be(r), "getElementsProps", function() {
        var l = r.props, s = l.continuous, u = l.isLastStep, c = l.setTooltipRef, f = l.step, p = _a(f.locale.back), d = _a(f.locale.close), h = _a(f.locale.last), m = _a(f.locale.next), S = _a(f.locale.skip), g = s ? m : d;
        return u && (g = h), {
          backProps: {
            "aria-label": p,
            "data-action": "back",
            onClick: r.handleClickBack,
            role: "button",
            title: p
          },
          closeProps: {
            "aria-label": d,
            "data-action": "close",
            onClick: r.handleClickClose,
            role: "button",
            title: d
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
    return Pr(n, [{
      key: "render",
      value: function() {
        var i = this.props, o = i.continuous, a = i.index, l = i.isLastStep, s = i.size, u = i.step;
        u.beaconComponent;
        var c = u.tooltipComponent, f = Ju(u, tI), p;
        if (c) {
          var d = G(G({}, this.getElementsProps()), {}, {
            continuous: o,
            index: a,
            isLastStep: l,
            size: s,
            step: f
          }), h = c;
          p = /* @__PURE__ */ k.createElement(h, d);
        } else
          p = /* @__PURE__ */ k.createElement(eI, Jt({}, this.getElementsProps(), {
            continuous: o,
            index: a,
            isLastStep: l,
            size: s,
            step: u
          }));
        return p;
      }
    }]), n;
  }(k.Component), rI = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n() {
      return Ir(this, n), t.apply(this, arguments);
    }
    return Pr(n, [{
      key: "componentDidMount",
      value: function() {
        Wr && (Pa || this.renderReact15());
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        Wr && (Pa || this.renderReact15());
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        !Wr || !this.node || (Pa || Li.unmountComponentAtNode(this.node), this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
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
        if (!Wr)
          return null;
        var i = this.props.children;
        return this.node || this.appendNode(), Li.unstable_renderSubtreeIntoContainer(this, i, this.node), null;
      }
    }, {
      key: "renderReact16",
      value: function() {
        if (!Wr || !Pa)
          return null;
        var i = this.props.children;
        return this.node || this.appendNode(), /* @__PURE__ */ Li.createPortal(i, this.node);
      }
    }, {
      key: "render",
      value: function() {
        return Pa ? this.renderReact16() : null;
      }
    }]), n;
  }(k.Component), iI = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n() {
      var r;
      Ir(this, n);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return r = t.call.apply(t, [this].concat(o)), Z(Be(r), "scope", {
        removeScope: function() {
        }
      }), Z(Be(r), "handleClickHoverBeacon", function(l) {
        var s = r.props, u = s.step, c = s.update;
        l.type === "mouseenter" && u.event !== "hover" || c({
          lifecycle: se.TOOLTIP
        });
      }), Z(Be(r), "handleClickOverlay", function() {
        var l = r.props, s = l.helpers, u = l.step;
        u.disableOverlayClose || s.close();
      }), Z(Be(r), "setTooltipRef", function(l) {
        r.tooltip = l;
      }), Z(Be(r), "setPopper", function(l, s) {
        var u = r.props, c = u.action, f = u.setPopper, p = u.update;
        s === "wrapper" ? r.beaconPopper = l : r.tooltipPopper = l, f(l, s), r.beaconPopper && r.tooltipPopper && p({
          action: c === ce.CLOSE ? ce.CLOSE : c,
          lifecycle: se.READY
        });
      }), r;
    }
    return Pr(n, [{
      key: "componentDidMount",
      value: function() {
        var i = this.props, o = i.debug, a = i.index;
        Vi({
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
        var o = this.props, a = o.action, l = o.callback, s = o.continuous, u = o.controlled, c = o.debug, f = o.index, p = o.lifecycle, d = o.size, h = o.status, m = o.step, S = o.update, g = Fl(i, this.props), v = g.changed, w = g.changedFrom, E = {
          action: a,
          controlled: u,
          index: f,
          lifecycle: p,
          size: d,
          status: h
        }, O = s && a !== ce.CLOSE && (f > 0 || a === ce.PREV), b = v("action") || v("index") || v("lifecycle") || v("status"), A = w("lifecycle", [se.TOOLTIP, se.INIT], se.INIT), T = v("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
        if (T && (A || u) && l(G(G({}, E), {}, {
          index: i.index,
          lifecycle: se.COMPLETE,
          step: i.step,
          type: Ct.STEP_AFTER
        })), m.placement === "center" && h === pe.RUNNING && v("index") && a !== ce.START && p === se.INIT && S({
          lifecycle: se.READY
        }), b) {
          var P = ni(m.target), _ = !!P, I = _ && BT(P);
          I ? (w("status", pe.READY, pe.RUNNING) || w("lifecycle", se.INIT, se.READY)) && l(G(G({}, E), {}, {
            step: m,
            type: Ct.STEP_BEFORE
          })) : (console.warn(_ ? "Target not visible" : "Target not mounted", m), l(G(G({}, E), {}, {
            type: Ct.TARGET_NOT_FOUND,
            step: m
          })), u || S({
            index: f + ([ce.PREV].indexOf(a) !== -1 ? -1 : 1)
          }));
        }
        w("lifecycle", se.INIT, se.READY) && S({
          lifecycle: gy(m) || O ? se.TOOLTIP : se.BEACON
        }), v("index") && Vi({
          title: "step:".concat(p),
          data: [{
            key: "props",
            value: this.props
          }],
          debug: c
        }), v("lifecycle", se.BEACON) && l(G(G({}, E), {}, {
          step: m,
          type: Ct.BEACON
        })), v("lifecycle", se.TOOLTIP) && (l(G(G({}, E), {}, {
          step: m,
          type: Ct.TOOLTIP
        })), this.scope = new HT(this.tooltip, {
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
        return !!(gy(o) || a === se.TOOLTIP);
      }
    }, {
      key: "render",
      value: function() {
        var i = this.props, o = i.continuous, a = i.debug, l = i.helpers, s = i.index, u = i.lifecycle, c = i.nonce, f = i.shouldScroll, p = i.size, d = i.step, h = ni(d.target);
        return !CS(d) || !Ge.domElement(h) ? null : /* @__PURE__ */ k.createElement("div", {
          key: "JoyrideStep-".concat(s),
          className: "react-joyride__step"
        }, /* @__PURE__ */ k.createElement(rI, {
          id: "react-joyride-portal"
        }, /* @__PURE__ */ k.createElement(KT, Jt({}, d, {
          debug: a,
          lifecycle: u,
          onClickOverlay: this.handleClickOverlay
        }))), /* @__PURE__ */ k.createElement(Mm, Jt({
          component: /* @__PURE__ */ k.createElement(nI, {
            continuous: o,
            helpers: l,
            index: s,
            isLastStep: s + 1 === p,
            setTooltipRef: this.setTooltipRef,
            size: p,
            step: d
          }),
          debug: a,
          getPopper: this.setPopper,
          id: "react-joyride-step-".concat(s),
          isPositioned: d.isFixed || $o(h),
          open: this.open,
          placement: d.placement,
          target: d.target
        }, d.floaterProps), /* @__PURE__ */ k.createElement($T, {
          beaconComponent: d.beaconComponent,
          locale: d.locale,
          nonce: c,
          onClickOrHover: this.handleClickHoverBeacon,
          shouldFocus: f,
          styles: d.styles
        })));
      }
    }]), n;
  }(k.Component), xS = /* @__PURE__ */ function(e) {
    Ki(n, e);
    var t = Xi(n);
    function n(r) {
      var i;
      return Ir(this, n), i = t.call(this, r), Z(Be(i), "initStore", function() {
        var o = i.props, a = o.debug, l = o.getHelpers, s = o.run, u = o.stepIndex;
        i.store = new RT(G(G({}, i.props), {}, {
          controlled: s && Ge.number(u)
        })), i.helpers = i.store.getHelpers();
        var c = i.store.addListener;
        return Vi({
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
      }), Z(Be(i), "callback", function(o) {
        var a = i.props.callback;
        Ge.function(a) && a(o);
      }), Z(Be(i), "handleKeyboard", function(o) {
        var a = i.state, l = a.index, s = a.lifecycle, u = i.props.steps, c = u[l], f = window.Event ? o.which : o.keyCode;
        s === se.TOOLTIP && f === 27 && c && !c.disableCloseOnEsc && i.store.close();
      }), Z(Be(i), "syncState", function(o) {
        i.setState(o);
      }), Z(Be(i), "setPopper", function(o, a) {
        a === "wrapper" ? i.beaconPopper = o : i.tooltipPopper = o;
      }), Z(Be(i), "shouldScroll", function(o, a, l, s, u, c, f) {
        return !o && (a !== 0 || l || s === se.TOOLTIP) && u.placement !== "center" && (!u.isFixed || !$o(c)) && // fixed steps don't need to scroll
        f.lifecycle !== s && [se.BEACON, se.TOOLTIP].indexOf(s) !== -1;
      }), i.state = i.initStore(), i;
    }
    return Pr(n, [{
      key: "componentDidMount",
      value: function() {
        if (Wr) {
          var i = this.props, o = i.disableCloseOnEsc, a = i.debug, l = i.run, s = i.steps, u = this.store.start;
          by(s, a) && l && u(), o || document.body.addEventListener("keydown", this.handleKeyboard, {
            passive: !0
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function(i, o) {
        if (Wr) {
          var a = this.state, l = a.action, s = a.controlled, u = a.index, c = a.lifecycle, f = a.status, p = this.props, d = p.debug, h = p.run, m = p.stepIndex, S = p.steps, g = i.steps, v = i.stepIndex, w = this.store, E = w.reset, O = w.setSteps, b = w.start, A = w.stop, T = w.update, P = Fl(i, this.props), _ = P.changed, I = Fl(o, this.state), F = I.changed, U = I.changedFrom, q = Da(S[u], this.props), oe = !Jd(g, S), ne = Ge.number(m) && _("stepIndex"), fe = ni(q == null ? void 0 : q.target);
          if (oe && (by(S, d) ? O(S) : console.warn("Steps are not valid", S)), _("run") && (h ? b(m) : A()), ne) {
            var B = v < m ? ce.NEXT : ce.PREV;
            l === ce.STOP && (B = ce.START), [pe.FINISHED, pe.SKIPPED].indexOf(f) === -1 && T({
              action: l === ce.CLOSE ? ce.CLOSE : B,
              index: m,
              lifecycle: se.INIT
            });
          }
          !s && f === pe.RUNNING && u === 0 && !fe && (T({
            index: u + 1
          }), this.callback(G(G({}, this.state), {}, {
            type: Ct.TARGET_NOT_FOUND,
            step: q
          })));
          var V = G(G({}, this.state), {}, {
            index: u,
            step: q
          }), H = F("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
          if (H && F("status", pe.PAUSED)) {
            var x = Da(S[o.index], this.props);
            this.callback(G(G({}, V), {}, {
              index: o.index,
              lifecycle: se.COMPLETE,
              step: x,
              type: Ct.STEP_AFTER
            }));
          }
          if (F("status", [pe.FINISHED, pe.SKIPPED])) {
            var C = Da(S[o.index], this.props);
            s || this.callback(G(G({}, V), {}, {
              index: o.index,
              lifecycle: se.COMPLETE,
              step: C,
              type: Ct.STEP_AFTER
            })), this.callback(G(G({}, V), {}, {
              index: o.index,
              // Return the last step when the tour is finished
              step: C,
              type: Ct.TOUR_END
            })), E();
          } else
            U("status", [pe.IDLE, pe.READY], pe.RUNNING) ? this.callback(G(G({}, V), {}, {
              type: Ct.TOUR_START
            })) : F("status") ? this.callback(G(G({}, V), {}, {
              type: Ct.TOUR_STATUS
            })) : F("action", ce.RESET) && this.callback(G(G({}, V), {}, {
              type: Ct.TOUR_STATUS
            }));
          q && (this.scrollToStep(o), q.placement === "center" && f === pe.RUNNING && l === ce.START && c === se.INIT && T({
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
        var o = this.state, a = o.index, l = o.lifecycle, s = o.status, u = this.props, c = u.debug, f = u.disableScrolling, p = u.disableScrollParentFix, d = u.scrollToFirstStep, h = u.scrollOffset, m = u.scrollDuration, S = u.steps, g = Da(S[a], this.props);
        if (g) {
          var v = ni(g.target), w = this.shouldScroll(f, a, d, l, g, v, i);
          if (s === pe.RUNNING && w) {
            var E = Gc(v, p), O = Vc(v, p), b = Math.floor(zT(v, h, p)) || 0;
            if (Vi({
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
              var A = this.beaconPopper, T = A.placement, P = A.popper;
              ["bottom"].indexOf(T) === -1 && !E && (b = Math.floor(P.top - h));
            } else if (l === se.TOOLTIP && this.tooltipPopper) {
              var _ = this.tooltipPopper, I = _.flipped, F = _.placement, U = _.popper;
              ["top", "right", "left"].indexOf(F) !== -1 && !I && !E ? b = Math.floor(U.top - h) : b -= g.spotlightPadding;
            }
            b = b >= 0 ? b : 0, s === pe.RUNNING && WT(b, O, m);
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
        if (!Wr)
          return null;
        var i = this.state, o = i.index, a = i.status, l = this.props, s = l.continuous, u = l.debug, c = l.nonce, f = l.scrollToFirstStep, p = l.steps, d = Da(p[o], this.props), h;
        return a === pe.RUNNING && d && (h = /* @__PURE__ */ k.createElement(iI, Jt({}, this.state, {
          callback: this.callback,
          continuous: s,
          debug: u,
          setPopper: this.setPopper,
          helpers: this.helpers,
          nonce: c,
          shouldScroll: !d.disableScrolling && (o !== 0 || f),
          step: d,
          update: this.store.update
        }))), /* @__PURE__ */ k.createElement("div", {
          className: "react-joyride"
        }, h);
      }
    }]), n;
  }(k.Component);
  Z(xS, "defaultProps", {
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
  const oI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAABq0lEQVRYhe2YsU7DMBCGvyDUDToxsuUREN27gUACBpZuvAMFXgBBH4KtCwMggWDrDuIRujIxAVuXMMRIbuU09vlKiMgnRYniO/uv4zv7mmRZRh1YDjHuX4+Lmsp+beJ6OThMvcde8rasmEaoNo1QbSRCL8mj3L7KmLUfhA4qEXoKDAV+PwyBk1AnidAMOAJGAt+R8Q3eZaRrdAIcAC8BPq/GZyIZMCaYPoAdoHC7shgD28ZHRGzUvwNb5h5jU4pGehoDu8Cno+3LtPnM+ly08ugzsM/0+psAe6YtGs2Eb0d0TGZwEnTM82AIrFvPamgLBbhYQJ/12esTVyky5yT/a8ye/os+/V8opKbKl9p8+qIZdRZjVeJco0Vor92mCvXkGOhrd6qd8HvkpQrAG4q7k+aMdoEr8kBMzHNXq3MtoRvADdCy3rXMu02NATSEpsAj0Ha0tYEHYxNFrNA14MncY2xKiRG6AtzjN1upsV2VDiYV2gLugE6ATwe4ZXodeyMRGhPRdmYIQiL0nDxfSumZPoKQJPwzc9mI/nEO4V/v9QuhEapNbYQGnfCr5BtYaFWUrHRSSwAAAABJRU5ErkJggg==", aI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAiElEQVRYhe3YwQmAIBhA4YxGaaZGaYhGaaZ2sauCB8MX9cP7bnaIxx9imHLOUwTz1wG9DKWFCV1aD/fzKpdPdlsaqikc21qtw0zUUJqhNENphtLChDaP0BcMH8NhJmoozVCaoTRDaYbSDKUZSuv5HyWuaYbfEX6if7iGrr5CmIkm7/BhhtIMpd2GuAxXhhY/aAAAAABJRU5ErkJggg==", lI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAhUlEQVRYhe3ZwQmAMBAAwZxYijVZikVYijXZS/zmoRDJQjjY+ZlHWE6RiFFrLRksswN6GUozlLa+LR7XPf1VcO5btNe5J1pKiY/1adJPtPXnef26E8N7pJmooTRDaYbSDKUZSjOUZiit5zxKGP5iSDNRQ2mG0gylGUpLExr+bIAZSksT+gD98QxXbjF/TQAAAABJRU5ErkJggg==", Kd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAgklEQVRYhe3Y0QmAIBRA0Wc0SjM1SkM0SjO1i00gGl2MB/f+2sfhQSqWWmtkaPkbMJpQOqF0aaBr74PjuqftX+e+ldZamokKpRNKJ5ROKF0aaPcIjYjmsTazNBMVSieUbuSvb/XlQv16J0kzUaF0QumE0gmlSwMtPo3DCaUTSpcG+gDcmgtUpwOm6gAAAABJRU5ErkJggg==", kS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAjElEQVRYhe3ZwQmAMBBEUVcsxZosxSIsxZrsJZ4UIQYUh5WB/456+awhCRillM5B/3fAU4SqDa0X87odizeSWk7LNFbPbCZqE9r89Dcy97FqudlMlFA1QtUIVSNUzSb0zRGafou6spkooWqEqmVenD/tGjYTJVSNUDVC1QhVswnl4qwW/GwQI1TNJnQHKA8MWeSBgoAAAAAASUVORK5CYII=", OS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAkklEQVRYhe3ZwQmAMAyF4UQcxZkcxSEcxZncJV70UmlVfEYevO/ay0+KNKBHhDHo/g64S6Fofe1gWtbMjkOYmc3j4OUBzURpQqtXb/s1JDlddYlmogpFUyiaQtEUikYT2npCL5+1TDQTVSiaQtFaX/0Tb5dsLc7pFIqmUDSFoikUDfWEfr5k00zU9bMBTKFoNKEbp/QMWe71dFoAAAAASUVORK5CYII=", sI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVRYhe2ZwQ6CMBBEH8Yv9uDNsMabB38ZLxBRkdDtxlmSzqUktDAvs2yb0A3DwJ51UBuoVQNQqwGotXuAY8nk8+3hfc+8Vxtw3brwfjmt3lckYEAf9TBVCRlBEP8G6HiVjxEAoSqhMAhlCYVAFHUh3rtJrWwc+9n15u40Sb0PGJVJlCYwqXOuW5KNoysJdQKTDGcSWQDACZEJABwQ2QDgG2JVGQGgoF1nBCjqRtkAPs3bz5mjMgEUm4c8AC7z4N+JvWeipR3cbR70CVSZh/IEvGegpcSqzYMugRDzoAEIMw/+j9ireSlVmwddCYWYBw1AmHmArv3gEKsBqNUA1No9wBNu3jnWLc/KGQAAAABJRU5ErkJggg==", uI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAADT0lEQVRYhe2ZP2gUURDGf1ELSy/YpUrELt1BLHIpxAtCOO0SBP80woWAiGyxuWZB2eayxYIiSAJpTBPuQARtJNedacTrgk3IWYlWuVR2EouZl907Lwnue8cRyMDj7e3OMvO9mTfzvb2Rw8NDzrJcGLYDtnIOYNhy5gFcyvqiH8anqZSAMjADdIAmUAF+HvdCFHj/7UdmAKdICfiQ+n0FGAfmgJvAjitDg0ihaRLnK8AocA2oA1eBdZfGBhGBeZ1XosBb0esOsOCH8VdgConQRxfGBhGBgs71Ps/MvRlXxgYB4EDnXJ9nEzrvuTI2CABNnat+GB+B8MM4j1SlP8BnV8Zc74ExIK/XeWDPD+M6Eg2zN14D31wZdAlgDHiHbNIOsAK0kbSpqs5L4JlDm84ATCLlcQpoAbNR4HXMQz+M20ANiYqzCgRu9kB65f9xHiAKvDoSlQLSI0oO7AJuIrAOXAcaUeDNnqDXRspoFQHxXe83gQawkcW4bQSmgdvq3AKAH8a5dPVJizY209zGdTwC3gIPszhgC8A0pHoUeB11fIuk3gPgh/EEkkJEgVdBqIUZi6pWzOKALQCz0ibn8zo6fXSLfhgXAaLAa5uBpA9k7M62e8CsdFvnvqmTur/lh3GDboBm5ZtkEFsAvRHo/W3ENLdd+qfKJrCUxQFbAE3gFpIeLZJuW6SbzBmnQ+AX3ZFqcsIh5zSx3QMmf5eBfRJHq8dUojlkk9dSI7PzYA9gm6Q5HZCQtBawmtKrIGl1D3hqabNLXHTibeAuUhILQCcKPNMTlkGqDkm5fAJcdmAXcEunH+jc0nkRKKdKZx1JuetIyjkRVwBKCNMEWANQPpSjO5VMF76Poyi4ADAJvNfriq40fhiXEQATek0UeA0cR8EWgGGiF4E1c4jXtEmvfNpZp1GwBfCGhIkuwhHvqenz50hlOi4KZUv7VgBGgTvoJxMQJorU+RzSXV+ge4LuKJh71l8nbAAc0YbUAaaG8KNPwGO9t0FPFFyKDZXYQxwr6AcrEM6zizj/O6W7hvSIVT+M50m4USYClxZbLrREchYG+II4/6NHz5y2AhK6sQm8srRvDWAHuEGyoq0TdDcQgjejevuWtgEYOf+PbMhyDmDY8hfkuOfRCqd6WwAAAABJRU5ErkJggg==", cI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVRYhe2ZsQ7CMAxEr4gvZmBDXMXGwC+XgVQqERDbCbEr5ZaoalXdq+0kTqdlWbBnHbwN1GoAeGsAeGv3AMdfN8+3h+ZdVwDcXE8GP7hfTqrnW0UgN99NLQDczAP1AFvzM4xpU6MagNw8vz75R1kBQpgHCrPQF0nNW3eJqjTURiDMl1+liYDUvLWQTRGTRiDcl18lAQhrHigDhDYPlAGYxpDmAXkNhG2cSwBzGolXOoWTJIVCQ0hSiAgMIa0BIiiEZiVmGvOpNVfXgtfuhYhgkbDsRpnGUiS6NDfWfoAIEomajowIAFHbExPvEN1X7BanEsTnGuiiVudChBPENH5wOGsAeGsAeGv3AE8yEDlUwXXxqQAAAABJRU5ErkJggg==", fI = "_icon_1467k_1", pI = {
    icon: fI
  }, dI = {
    undo: cI,
    redo: sI,
    tour: uI,
    alignTop: lI,
    alignBottom: aI,
    alignCenter: oI,
    alignSpread: Kd,
    alignTextCenter: Kd,
    alignTextLeft: kS,
    alignTextRight: OS
  };
  function hI({
    id: e,
    alt: t = e,
    size: n
  }) {
    return /* @__PURE__ */ y(
      "img",
      {
        src: dI[e],
        alt: t,
        className: pI.icon,
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
  }, Sy = k.createContext && k.createContext(TS), ri = globalThis && globalThis.__assign || function() {
    return ri = Object.assign || function(e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) {
        t = arguments[n];
        for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
      return e;
    }, ri.apply(this, arguments);
  }, mI = globalThis && globalThis.__rest || function(e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
  };
  function IS(e) {
    return e && e.map(function(t, n) {
      return k.createElement(t.tag, ri({
        key: n
      }, t.attr), IS(t.child));
    });
  }
  function Tt(e) {
    return function(t) {
      return k.createElement(gI, ri({
        attr: ri({}, e.attr)
      }, t), IS(e.child));
    };
  }
  function gI(e) {
    var t = function(n) {
      var r = e.attr, i = e.size, o = e.title, a = mI(e, ["attr", "size", "title"]), l = i || n.size || "1em", s;
      return n.className && (s = n.className), e.className && (s = (s ? s + " " : "") + e.className), k.createElement("svg", ri({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, n.attr, r, a, {
        className: s,
        style: ri(ri({
          color: e.color || n.color
        }, n.style), e.style),
        height: l,
        width: l,
        xmlns: "http://www.w3.org/2000/svg"
      }), o && k.createElement("title", null, o), e.children);
    };
    return Sy !== void 0 ? k.createElement(Sy.Consumer, null, function(n) {
      return t(n);
    }) : t(TS);
  }
  function vI(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" } }, { tag: "path", attr: { d: "M277 360h-42V235h42v125zm0-166h-42v-42h42v42z" } }] })(e);
  }
  const yI = (e) => /* @__PURE__ */ y(
    "svg",
    Q(M({
      width: "1em",
      height: "1em",
      viewBox: "0 0 15 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, e), {
      children: /* @__PURE__ */ y("path", { d: "M7.38 7.477 14.432.691H.328L7.38 7.477Z", fill: "#75A8DB" })
    })
  ), wI = (e) => /* @__PURE__ */ y(
    "svg",
    Q(M({
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
  ), Hc = (e) => /* @__PURE__ */ L(
    "svg",
    Q(M({
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
  ), bI = (e) => /* @__PURE__ */ y(
    "svg",
    Q(M({
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
  ), SI = (e) => /* @__PURE__ */ y(
    "svg",
    Q(M({
      width: "1em",
      height: "1em",
      viewBox: "0 0 15 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, e), {
      children: /* @__PURE__ */ y("path", { d: "m7.38.477 7.052 6.786H.328L7.38.477Z", fill: "#75A8DB" })
    })
  );
  function Wt(...e) {
    return e.filter((t) => t).join(" ");
  }
  const EI = "_button_1y00r_1", AI = "_regular_1y00r_26", CI = "_icon_1y00r_34", xI = "_transparent_1y00r_42", dp = {
    button: EI,
    regular: AI,
    delete: "_delete_1y00r_30",
    icon: CI,
    transparent: xI
  }, dt = (i) => {
    var o = i, { children: e, variant: t = "regular", className: n } = o, r = it(o, ["children", "variant", "className"]);
    const a = t ? Array.isArray(t) ? t.map((l) => dp[l]).join(" ") : dp[t] : "";
    return /* @__PURE__ */ y(
      "button",
      Q(M({
        className: Wt(dp.button, a, n)
      }, r), {
        children: e
      })
    );
  }, kI = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "You can see how the changes impact your app with the app preview." }),
    /* @__PURE__ */ y("p", { children: "Click in the center of the preview to expand it to full screen to get a better view of your app." }),
    /* @__PURE__ */ y("p", { children: 'Any log messages from the app will be placed into the "App Logs" drawer.' })
  ] }), OI = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "The app view shows a skeleton view of the current state of your app's UI." }),
    /* @__PURE__ */ y("p", { children: "You can click on elements to select them or drag them around to move them." }),
    /* @__PURE__ */ y("p", { children: "Cards can be resized by dragging resize handles on the sides." }),
    /* @__PURE__ */ y("p", { children: "Rows and Columns can be resized by dragging between tracts and added by hovering over the left and top respectively to reveal the tract controls widget." }),
    /* @__PURE__ */ y("p", { children: /* @__PURE__ */ y("a", { href: "https://rstudio.github.io/shinyuieditor/articles/how-to.html#show-size-widget", children: "More info" }) })
  ] }), TI = /* @__PURE__ */ L("div", { children: [
    "Drag elements from the elements palette into the app pane on the right to add them to your app. ",
    /* @__PURE__ */ y("br", {}),
    " In the app view, the areas available for the element to be dropped in will pulse with an",
    " ",
    /* @__PURE__ */ y("span", { className: "can-accept-drop", style: { padding: "2px" }, children: "orange outline." })
  ] }), II = /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y("p", { children: "After selecting an element in your app, you can adjust the settings for that element in the properties pane." }),
    /* @__PURE__ */ y("p", { children: "Changes made will be automatically applied to your element both in the app view and your code so there's no need to save or submit these changes." })
  ] }), PI = [
    {
      target: ".app-view",
      content: OI,
      disableBeacon: !0
    },
    {
      target: ".elements-panel",
      content: TI,
      placement: "right-start",
      disableBeacon: !0
    },
    {
      target: ".properties-panel",
      content: II,
      placement: "left-start"
    },
    {
      target: ".app-preview",
      content: kI,
      placement: "top-start"
    },
    {
      target: ".undo-redo-buttons",
      content: "Mess something up? You can use the change history to undo or redo your changes",
      placement: "bottom"
    }
  ];
  function _I() {
    const [e, t] = J.useState(0), [n, r] = J.useState(!1), i = J.useCallback((a) => {
      const { action: l, index: s, type: u } = a;
      (u === Ct.STEP_AFTER || u === Ct.TARGET_NOT_FOUND) && (l === ce.NEXT ? t(s + 1) : l === ce.PREV ? t(s - 1) : l === ce.CLOSE && r(!1)), u === Ct.TOUR_END && (l === ce.NEXT && (r(!1), t(0)), l === ce.SKIP && r(!1));
    }, []), o = J.useCallback(() => {
      r(!0);
    }, []);
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ L(
        dt,
        {
          onClick: o,
          title: "Take a guided tour of app",
          variant: "transparent",
          children: [
            /* @__PURE__ */ y(hI, { id: "tour", size: "24px" }),
            "Tour App"
          ]
        }
      ),
      /* @__PURE__ */ y(
        xS,
        {
          callback: i,
          steps: PI,
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
          styles: DI
        }
      )
    ] });
  }
  const Ey = "#e07189", NI = "#f6d5dc", DI = {
    options: {
      arrowColor: "var(--rstudio-white, white)",
      backgroundColor: "var(--rstudio-white, white)",
      primaryColor: "var(--rstudio-blue, steelblue)",
      textColor: "var(--rstudio-grey, black)"
    },
    beaconInner: {
      backgroundColor: Ey
    },
    beaconOuter: {
      backgroundColor: NI,
      border: `2px solid ${Ey}`
    }
  };
  var PS = RI;
  function RI(e, t, n) {
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
  var Xd = {}, LI = {
    get exports() {
      return Xd;
    },
    set exports(e) {
      Xd = e;
    }
  }, _S = {};
  /**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Jo = J;
  function FI(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var MI = typeof Object.is == "function" ? Object.is : FI, BI = Jo.useState, UI = Jo.useEffect, zI = Jo.useLayoutEffect, WI = Jo.useDebugValue;
  function jI(e, t) {
    var n = t(), r = BI({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, o = r[1];
    return zI(function() {
      i.value = n, i.getSnapshot = t, hp(i) && o({ inst: i });
    }, [e, n, t]), UI(function() {
      return hp(i) && o({ inst: i }), e(function() {
        hp(i) && o({ inst: i });
      });
    }, [e]), WI(n), n;
  }
  function hp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !MI(e, n);
    } catch (r) {
      return !0;
    }
  }
  function YI(e, t) {
    return t();
  }
  var VI = typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined" ? YI : jI;
  _S.useSyncExternalStore = Jo.useSyncExternalStore !== void 0 ? Jo.useSyncExternalStore : VI;
  (function(e) {
    e.exports = _S;
  })(LI);
  var qd = {}, GI = {
    get exports() {
      return qd;
    },
    set exports(e) {
      qd = e;
    }
  }, NS = {};
  /**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var $c = J, HI = Xd;
  function $I(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var JI = typeof Object.is == "function" ? Object.is : $I, QI = HI.useSyncExternalStore, KI = $c.useRef, XI = $c.useEffect, qI = $c.useMemo, ZI = $c.useDebugValue;
  NS.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
    var o = KI(null);
    if (o.current === null) {
      var a = { hasValue: !1, value: null };
      o.current = a;
    } else
      a = o.current;
    o = qI(function() {
      function s(d) {
        if (!u) {
          if (u = !0, c = d, d = r(d), i !== void 0 && a.hasValue) {
            var h = a.value;
            if (i(h, d))
              return f = h;
          }
          return f = d;
        }
        if (h = f, JI(c, d))
          return h;
        var m = r(d);
        return i !== void 0 && i(h, m) ? h : (c = d, f = m);
      }
      var u = !1, c, f, p = n === void 0 ? null : n;
      return [function() {
        return s(t());
      }, p === null ? void 0 : function() {
        return s(p());
      }];
    }, [t, n, r, i]);
    var l = QI(e, o[0], o[1]);
    return XI(function() {
      a.hasValue = !0, a.value = l;
    }, [l]), ZI(l), l;
  };
  (function(e) {
    e.exports = NS;
  })(GI);
  function eP(e) {
    e();
  }
  let DS = eP;
  const tP = (e) => DS = e, nP = () => DS, ui = /* @__PURE__ */ J.createContext(null);
  function RS() {
    return J.useContext(ui);
  }
  const rP = () => {
    throw new Error("uSES not initialized!");
  };
  let LS = rP;
  const iP = (e) => {
    LS = e;
  }, oP = (e, t) => e === t;
  function aP(e = ui) {
    const t = e === ui ? RS : () => J.useContext(e);
    return function(r, i = oP) {
      const {
        store: o,
        subscription: a,
        getServerState: l
      } = t(), s = LS(a.addNestedSub, o.getState, l || o.getState, r, i);
      return J.useDebugValue(s), s;
    };
  }
  const la = /* @__PURE__ */ aP();
  var FS = zr, lP = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, sP = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, MS = {};
  MS[FS.ForwardRef] = lP;
  MS[FS.Memo] = sP;
  var Ay = {}, uP = {
    get exports() {
      return Ay;
    },
    set exports(e) {
      Ay = e;
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
  var Bm = Symbol.for("react.element"), Um = Symbol.for("react.portal"), Jc = Symbol.for("react.fragment"), Qc = Symbol.for("react.strict_mode"), Kc = Symbol.for("react.profiler"), Xc = Symbol.for("react.provider"), qc = Symbol.for("react.context"), cP = Symbol.for("react.server_context"), Zc = Symbol.for("react.forward_ref"), ef = Symbol.for("react.suspense"), tf = Symbol.for("react.suspense_list"), nf = Symbol.for("react.memo"), rf = Symbol.for("react.lazy"), fP = Symbol.for("react.offscreen"), BS;
  BS = Symbol.for("react.module.reference");
  function bn(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Bm:
          switch (e = e.type, e) {
            case Jc:
            case Kc:
            case Qc:
            case ef:
            case tf:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case cP:
                case qc:
                case Zc:
                case rf:
                case nf:
                case Xc:
                  return e;
                default:
                  return t;
              }
          }
        case Um:
          return t;
      }
    }
  }
  be.ContextConsumer = qc;
  be.ContextProvider = Xc;
  be.Element = Bm;
  be.ForwardRef = Zc;
  be.Fragment = Jc;
  be.Lazy = rf;
  be.Memo = nf;
  be.Portal = Um;
  be.Profiler = Kc;
  be.StrictMode = Qc;
  be.Suspense = ef;
  be.SuspenseList = tf;
  be.isAsyncMode = function() {
    return !1;
  };
  be.isConcurrentMode = function() {
    return !1;
  };
  be.isContextConsumer = function(e) {
    return bn(e) === qc;
  };
  be.isContextProvider = function(e) {
    return bn(e) === Xc;
  };
  be.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Bm;
  };
  be.isForwardRef = function(e) {
    return bn(e) === Zc;
  };
  be.isFragment = function(e) {
    return bn(e) === Jc;
  };
  be.isLazy = function(e) {
    return bn(e) === rf;
  };
  be.isMemo = function(e) {
    return bn(e) === nf;
  };
  be.isPortal = function(e) {
    return bn(e) === Um;
  };
  be.isProfiler = function(e) {
    return bn(e) === Kc;
  };
  be.isStrictMode = function(e) {
    return bn(e) === Qc;
  };
  be.isSuspense = function(e) {
    return bn(e) === ef;
  };
  be.isSuspenseList = function(e) {
    return bn(e) === tf;
  };
  be.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Jc || e === Kc || e === Qc || e === ef || e === tf || e === fP || typeof e == "object" && e !== null && (e.$$typeof === rf || e.$$typeof === nf || e.$$typeof === Xc || e.$$typeof === qc || e.$$typeof === Zc || e.$$typeof === BS || e.getModuleId !== void 0);
  };
  be.typeOf = bn;
  (function(e) {
    e.exports = be;
  })(uP);
  function pP() {
    const e = nP();
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
  const Cy = {
    notify() {
    },
    get: () => []
  };
  function dP(e, t) {
    let n, r = Cy;
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
      n || (n = t ? t.addNestedSub(a) : e.subscribe(a), r = pP());
    }
    function u() {
      n && (n(), n = void 0, r.clear(), r = Cy);
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
  const hP = typeof window != "undefined" && typeof window.document != "undefined" && typeof window.document.createElement != "undefined", mP = hP ? J.useLayoutEffect : J.useEffect;
  function gP({
    store: e,
    context: t,
    children: n,
    serverState: r
  }) {
    const i = J.useMemo(() => {
      const l = dP(e);
      return {
        store: e,
        subscription: l,
        getServerState: r ? () => r : void 0
      };
    }, [e, r]), o = J.useMemo(() => e.getState(), [e]);
    mP(() => {
      const {
        subscription: l
      } = i;
      return l.onStateChange = l.notifyNestedSubs, l.trySubscribe(), o !== e.getState() && l.notifyNestedSubs(), () => {
        l.tryUnsubscribe(), l.onStateChange = void 0;
      };
    }, [i, o]);
    const a = t || ui;
    return /* @__PURE__ */ k.createElement(a.Provider, {
      value: i
    }, n);
  }
  function US(e = ui) {
    const t = (
      // @ts-ignore
      e === ui ? RS : () => J.useContext(e)
    );
    return function() {
      const {
        store: r
      } = t();
      return r;
    };
  }
  const zS = /* @__PURE__ */ US();
  function vP(e = ui) {
    const t = (
      // @ts-ignore
      e === ui ? zS : US(e)
    );
    return function() {
      return t().dispatch;
    };
  }
  const qi = /* @__PURE__ */ vP();
  iP(qd.useSyncExternalStoreWithSelector);
  tP(oi.unstable_batchedUpdates);
  function Ln(e) {
    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      n[r - 1] = arguments[r];
    throw Error("[Immer] minified error nr: " + e + (n.length ? " " + n.map(function(i) {
      return "'" + i + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function ci(e) {
    return !!e && !!e[Ne];
  }
  function xr(e) {
    var t;
    return !!e && (function(n) {
      if (!n || typeof n != "object")
        return !1;
      var r = Object.getPrototypeOf(n);
      if (r === null)
        return !0;
      var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return i === Object || typeof i == "function" && Function.toString.call(i) === kP;
    }(e) || Array.isArray(e) || !!e[_y] || !!(!((t = e.constructor) === null || t === void 0) && t[_y]) || zm(e) || Wm(e));
  }
  function Gi(e, t, n) {
    n === void 0 && (n = !1), sa(e) === 0 ? (n ? Object.keys : _o)(e).forEach(function(r) {
      n && typeof r == "symbol" || t(r, e[r], e);
    }) : e.forEach(function(r, i) {
      return t(i, r, e);
    });
  }
  function sa(e) {
    var t = e[Ne];
    return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : zm(e) ? 2 : Wm(e) ? 3 : 0;
  }
  function Po(e, t) {
    return sa(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
  }
  function yP(e, t) {
    return sa(e) === 2 ? e.get(t) : e[t];
  }
  function WS(e, t, n) {
    var r = sa(e);
    r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
  }
  function jS(e, t) {
    return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
  }
  function zm(e) {
    return CP && e instanceof Map;
  }
  function Wm(e) {
    return xP && e instanceof Set;
  }
  function Oi(e) {
    return e.o || e.t;
  }
  function jm(e) {
    if (Array.isArray(e))
      return Array.prototype.slice.call(e);
    var t = VS(e);
    delete t[Ne];
    for (var n = _o(t), r = 0; r < n.length; r++) {
      var i = n[r], o = t[i];
      o.writable === !1 && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = { configurable: !0, writable: !0, enumerable: o.enumerable, value: e[i] });
    }
    return Object.create(Object.getPrototypeOf(e), t);
  }
  function Ym(e, t) {
    return t === void 0 && (t = !1), Vm(e) || ci(e) || !xr(e) || (sa(e) > 1 && (e.set = e.add = e.clear = e.delete = wP), Object.freeze(e), t && Gi(e, function(n, r) {
      return Ym(r, !0);
    }, !0)), e;
  }
  function wP() {
    Ln(2);
  }
  function Vm(e) {
    return e == null || typeof e != "object" || Object.isFrozen(e);
  }
  function Zn(e) {
    var t = nh[e];
    return t || Ln(18, e), t;
  }
  function bP(e, t) {
    nh[e] || (nh[e] = t);
  }
  function Zd() {
    return Bl;
  }
  function mp(e, t) {
    t && (Zn("Patches"), e.u = [], e.s = [], e.v = t);
  }
  function Qu(e) {
    eh(e), e.p.forEach(SP), e.p = null;
  }
  function eh(e) {
    e === Bl && (Bl = e.l);
  }
  function xy(e) {
    return Bl = { p: [], l: Bl, h: e, m: !0, _: 0 };
  }
  function SP(e) {
    var t = e[Ne];
    t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
  }
  function gp(e, t) {
    t._ = t.p.length;
    var n = t.p[0], r = e !== void 0 && e !== n;
    return t.h.g || Zn("ES5").S(t, e, r), r ? (n[Ne].P && (Qu(t), Ln(4)), xr(e) && (e = Ku(t, e), t.l || Xu(t, e)), t.u && Zn("Patches").M(n[Ne].t, e, t.u, t.s)) : e = Ku(t, n, []), Qu(t), t.u && t.v(t.u, t.s), e !== YS ? e : void 0;
  }
  function Ku(e, t, n) {
    if (Vm(t))
      return t;
    var r = t[Ne];
    if (!r)
      return Gi(t, function(l, s) {
        return ky(e, r, t, l, s, n);
      }, !0), t;
    if (r.A !== e)
      return t;
    if (!r.P)
      return Xu(e, r.t, !0), r.t;
    if (!r.I) {
      r.I = !0, r.A._--;
      var i = r.i === 4 || r.i === 5 ? r.o = jm(r.k) : r.o, o = i, a = !1;
      r.i === 3 && (o = new Set(i), i.clear(), a = !0), Gi(o, function(l, s) {
        return ky(e, r, i, l, s, n, a);
      }), Xu(e, i, !1), n && e.u && Zn("Patches").N(r, n, e.u, e.s);
    }
    return r.o;
  }
  function ky(e, t, n, r, i, o, a) {
    if (ci(i)) {
      var l = Ku(e, i, o && t && t.i !== 3 && !Po(t.R, r) ? o.concat(r) : void 0);
      if (WS(n, r, l), !ci(l))
        return;
      e.m = !1;
    } else
      a && n.add(i);
    if (xr(i) && !Vm(i)) {
      if (!e.h.D && e._ < 1)
        return;
      Ku(e, i), t && t.A.l || Xu(e, i);
    }
  }
  function Xu(e, t, n) {
    n === void 0 && (n = !1), !e.l && e.h.D && e.m && Ym(t, n);
  }
  function vp(e, t) {
    var n = e[Ne];
    return (n ? Oi(n) : e)[t];
  }
  function Oy(e, t) {
    if (t in e)
      for (var n = Object.getPrototypeOf(e); n; ) {
        var r = Object.getOwnPropertyDescriptor(n, t);
        if (r)
          return r;
        n = Object.getPrototypeOf(n);
      }
  }
  function jr(e) {
    e.P || (e.P = !0, e.l && jr(e.l));
  }
  function yp(e) {
    e.o || (e.o = jm(e.t));
  }
  function th(e, t, n) {
    var r = zm(t) ? Zn("MapSet").F(t, n) : Wm(t) ? Zn("MapSet").T(t, n) : e.g ? function(i, o) {
      var a = Array.isArray(i), l = { i: a ? 1 : 0, A: o ? o.A : Zd(), P: !1, I: !1, R: {}, l: o, t: i, k: null, o: null, j: null, C: !1 }, s = l, u = Ul;
      a && (s = [l], u = Ga);
      var c = Proxy.revocable(s, u), f = c.revoke, p = c.proxy;
      return l.k = p, l.j = f, p;
    }(t, n) : Zn("ES5").J(t, n);
    return (n ? n.A : Zd()).p.push(r), r;
  }
  function EP(e) {
    return ci(e) || Ln(22, e), function t(n) {
      if (!xr(n))
        return n;
      var r, i = n[Ne], o = sa(n);
      if (i) {
        if (!i.P && (i.i < 4 || !Zn("ES5").K(i)))
          return i.t;
        i.I = !0, r = Ty(n, o), i.I = !1;
      } else
        r = Ty(n, o);
      return Gi(r, function(a, l) {
        i && yP(i.t, a) === l || WS(r, a, t(l));
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
    return jm(e);
  }
  function AP() {
    function e(o, a) {
      var l = i[o];
      return l ? l.enumerable = a : i[o] = l = { configurable: !0, enumerable: a, get: function() {
        var s = this[Ne];
        return Ul.get(s, o);
      }, set: function(s) {
        var u = this[Ne];
        Ul.set(u, o, s);
      } }, l;
    }
    function t(o) {
      for (var a = o.length - 1; a >= 0; a--) {
        var l = o[a][Ne];
        if (!l.P)
          switch (l.i) {
            case 5:
              r(l) && jr(l);
              break;
            case 4:
              n(l) && jr(l);
          }
      }
    }
    function n(o) {
      for (var a = o.t, l = o.k, s = _o(l), u = s.length - 1; u >= 0; u--) {
        var c = s[u];
        if (c !== Ne) {
          var f = a[c];
          if (f === void 0 && !Po(a, c))
            return !0;
          var p = l[c], d = p && p[Ne];
          if (d ? d.t !== f : !jS(p, f))
            return !0;
        }
      }
      var h = !!a[Ne];
      return s.length !== _o(a).length + (h ? 0 : 1);
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
    bP("ES5", { J: function(o, a) {
      var l = Array.isArray(o), s = function(c, f) {
        if (c) {
          for (var p = Array(f.length), d = 0; d < f.length; d++)
            Object.defineProperty(p, "" + d, e(d, !0));
          return p;
        }
        var h = VS(f);
        delete h[Ne];
        for (var m = _o(h), S = 0; S < m.length; S++) {
          var g = m[S];
          h[g] = e(g, c || !!h[g].enumerable);
        }
        return Object.create(Object.getPrototypeOf(f), h);
      }(l, o), u = { i: l ? 5 : 4, A: a ? a.A : Zd(), P: !1, I: !1, R: {}, l: a, t: o, k: s, o: null, O: !1, C: !1 };
      return Object.defineProperty(s, Ne, { value: u, writable: !0 }), s;
    }, S: function(o, a, l) {
      l ? ci(a) && a[Ne].A === o && t(o.p) : (o.u && function s(u) {
        if (u && typeof u == "object") {
          var c = u[Ne];
          if (c) {
            var f = c.t, p = c.k, d = c.R, h = c.i;
            if (h === 4)
              Gi(p, function(w) {
                w !== Ne && (f[w] !== void 0 || Po(f, w) ? d[w] || s(p[w]) : (d[w] = !0, jr(c)));
              }), Gi(f, function(w) {
                p[w] !== void 0 || Po(p, w) || (d[w] = !1, jr(c));
              });
            else if (h === 5) {
              if (r(c) && (jr(c), d.length = !0), p.length < f.length)
                for (var m = p.length; m < f.length; m++)
                  d[m] = !1;
              else
                for (var S = f.length; S < p.length; S++)
                  d[S] = !0;
              for (var g = Math.min(p.length, f.length), v = 0; v < g; v++)
                p.hasOwnProperty(v) || (d[v] = !0), d[v] === void 0 && s(p[v]);
            }
          }
        }
      }(o.p[0]), t(o.p));
    }, K: function(o) {
      return o.i === 4 ? n(o) : r(o);
    } });
  }
  var Iy, Bl, Gm = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", CP = typeof Map != "undefined", xP = typeof Set != "undefined", Py = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", YS = Gm ? Symbol.for("immer-nothing") : ((Iy = {})["immer-nothing"] = !0, Iy), _y = Gm ? Symbol.for("immer-draftable") : "__$immer_draftable", Ne = Gm ? Symbol.for("immer-state") : "__$immer_state", kP = "" + Object.prototype.constructor, _o = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
  } : Object.getOwnPropertyNames, VS = Object.getOwnPropertyDescriptors || function(e) {
    var t = {};
    return _o(e).forEach(function(n) {
      t[n] = Object.getOwnPropertyDescriptor(e, n);
    }), t;
  }, nh = {}, Ul = { get: function(e, t) {
    if (t === Ne)
      return e;
    var n = Oi(e);
    if (!Po(n, t))
      return function(i, o, a) {
        var l, s = Oy(o, a);
        return s ? "value" in s ? s.value : (l = s.get) === null || l === void 0 ? void 0 : l.call(i.k) : void 0;
      }(e, n, t);
    var r = n[t];
    return e.I || !xr(r) ? r : r === vp(e.t, t) ? (yp(e), e.o[t] = th(e.A.h, r, e)) : r;
  }, has: function(e, t) {
    return t in Oi(e);
  }, ownKeys: function(e) {
    return Reflect.ownKeys(Oi(e));
  }, set: function(e, t, n) {
    var r = Oy(Oi(e), t);
    if (r != null && r.set)
      return r.set.call(e.k, n), !0;
    if (!e.P) {
      var i = vp(Oi(e), t), o = i == null ? void 0 : i[Ne];
      if (o && o.t === n)
        return e.o[t] = n, e.R[t] = !1, !0;
      if (jS(n, i) && (n !== void 0 || Po(e.t, t)))
        return !0;
      yp(e), jr(e);
    }
    return e.o[t] === n && (n !== void 0 || t in e.o) || Number.isNaN(n) && Number.isNaN(e.o[t]) || (e.o[t] = n, e.R[t] = !0), !0;
  }, deleteProperty: function(e, t) {
    return vp(e.t, t) !== void 0 || t in e.t ? (e.R[t] = !1, yp(e), jr(e)) : delete e.R[t], e.o && delete e.o[t], !0;
  }, getOwnPropertyDescriptor: function(e, t) {
    var n = Oi(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: r.enumerable, value: n[t] };
  }, defineProperty: function() {
    Ln(11);
  }, getPrototypeOf: function(e) {
    return Object.getPrototypeOf(e.t);
  }, setPrototypeOf: function() {
    Ln(12);
  } }, Ga = {};
  Gi(Ul, function(e, t) {
    Ga[e] = function() {
      return arguments[0] = arguments[0][0], t.apply(this, arguments);
    };
  }), Ga.deleteProperty = function(e, t) {
    return Ga.set.call(this, e, t, void 0);
  }, Ga.set = function(e, t, n) {
    return Ul.set.call(this, e[0], t, n, e[0]);
  };
  var OP = function() {
    function e(n) {
      var r = this;
      this.g = Py, this.D = !0, this.produce = function(i, o, a) {
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
              var O;
              return (O = o).call.apply(O, [S, E].concat(v));
            });
          };
        }
        var u;
        if (typeof o != "function" && Ln(6), a !== void 0 && typeof a != "function" && Ln(7), xr(i)) {
          var c = xy(r), f = th(r, i, void 0), p = !0;
          try {
            u = o(f), p = !1;
          } finally {
            p ? Qu(c) : eh(c);
          }
          return typeof Promise != "undefined" && u instanceof Promise ? u.then(function(m) {
            return mp(c, a), gp(m, c);
          }, function(m) {
            throw Qu(c), m;
          }) : (mp(c, a), gp(u, c));
        }
        if (!i || typeof i != "object") {
          if ((u = o(i)) === void 0 && (u = i), u === YS && (u = void 0), r.D && Ym(u, !0), a) {
            var d = [], h = [];
            Zn("Patches").M(i, u, d, h), a(d, h);
          }
          return u;
        }
        Ln(21, i);
      }, this.produceWithPatches = function(i, o) {
        if (typeof i == "function")
          return function(u) {
            for (var c = arguments.length, f = Array(c > 1 ? c - 1 : 0), p = 1; p < c; p++)
              f[p - 1] = arguments[p];
            return r.produceWithPatches(u, function(d) {
              return i.apply(void 0, [d].concat(f));
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
      xr(n) || Ln(8), ci(n) && (n = EP(n));
      var r = xy(this), i = th(this, n, void 0);
      return i[Ne].C = !0, eh(r), i;
    }, t.finishDraft = function(n, r) {
      var i = n && n[Ne], o = i.A;
      return mp(o, r), gp(void 0, o);
    }, t.setAutoFreeze = function(n) {
      this.D = n;
    }, t.setUseProxies = function(n) {
      n && !Py && Ln(20), this.g = n;
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
      var a = Zn("Patches").$;
      return ci(n) ? a(n, r) : this.produce(n, function(l) {
        return a(l, r);
      });
    }, e;
  }(), en = new OP(), mi = en.produce;
  en.produceWithPatches.bind(en);
  en.setAutoFreeze.bind(en);
  en.setUseProxies.bind(en);
  en.applyPatches.bind(en);
  en.createDraft.bind(en);
  en.finishDraft.bind(en);
  function zl(e) {
    return zl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t;
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, zl(e);
  }
  function TP(e, t) {
    if (zl(e) !== "object" || e === null)
      return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
      var r = n.call(e, t || "default");
      if (zl(r) !== "object")
        return r;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }
  function IP(e) {
    var t = TP(e, "string");
    return zl(t) === "symbol" ? t : String(t);
  }
  function PP(e, t, n) {
    return t = IP(t), t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function Ny(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function Dy(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? Ny(Object(n), !0).forEach(function(r) {
        PP(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ny(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function vt(e) {
    return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
  }
  var Ry = function() {
    return typeof Symbol == "function" && Symbol.observable || "@@observable";
  }(), wp = function() {
    return Math.random().toString(36).substring(7).split("").join(".");
  }, qu = {
    INIT: "@@redux/INIT" + wp(),
    REPLACE: "@@redux/REPLACE" + wp(),
    PROBE_UNKNOWN_ACTION: function() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + wp();
    }
  };
  function _P(e) {
    if (typeof e != "object" || e === null)
      return !1;
    for (var t = e; Object.getPrototypeOf(t) !== null; )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function GS(e, t, n) {
    var r;
    if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
      throw new Error(vt(0));
    if (typeof t == "function" && typeof n == "undefined" && (n = t, t = void 0), typeof n != "undefined") {
      if (typeof n != "function")
        throw new Error(vt(1));
      return n(GS)(e, t);
    }
    if (typeof e != "function")
      throw new Error(vt(2));
    var i = e, o = t, a = [], l = a, s = !1;
    function u() {
      l === a && (l = a.slice());
    }
    function c() {
      if (s)
        throw new Error(vt(3));
      return o;
    }
    function f(m) {
      if (typeof m != "function")
        throw new Error(vt(4));
      if (s)
        throw new Error(vt(5));
      var S = !0;
      return u(), l.push(m), function() {
        if (S) {
          if (s)
            throw new Error(vt(6));
          S = !1, u();
          var v = l.indexOf(m);
          l.splice(v, 1), a = null;
        }
      };
    }
    function p(m) {
      if (!_P(m))
        throw new Error(vt(7));
      if (typeof m.type == "undefined")
        throw new Error(vt(8));
      if (s)
        throw new Error(vt(9));
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
    function d(m) {
      if (typeof m != "function")
        throw new Error(vt(10));
      i = m, p({
        type: qu.REPLACE
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
            throw new Error(vt(11));
          function w() {
            v.next && v.next(c());
          }
          w();
          var E = S(w);
          return {
            unsubscribe: E
          };
        }
      }, m[Ry] = function() {
        return this;
      }, m;
    }
    return p({
      type: qu.INIT
    }), r = {
      dispatch: p,
      subscribe: f,
      getState: c,
      replaceReducer: d
    }, r[Ry] = h, r;
  }
  function NP(e) {
    Object.keys(e).forEach(function(t) {
      var n = e[t], r = n(void 0, {
        type: qu.INIT
      });
      if (typeof r == "undefined")
        throw new Error(vt(12));
      if (typeof n(void 0, {
        type: qu.PROBE_UNKNOWN_ACTION()
      }) == "undefined")
        throw new Error(vt(13));
    });
  }
  function DP(e) {
    for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
      var i = t[r];
      typeof e[i] == "function" && (n[i] = e[i]);
    }
    var o = Object.keys(n), a;
    try {
      NP(n);
    } catch (l) {
      a = l;
    }
    return function(s, u) {
      if (s === void 0 && (s = {}), a)
        throw a;
      for (var c = !1, f = {}, p = 0; p < o.length; p++) {
        var d = o[p], h = n[d], m = s[d], S = h(m, u);
        if (typeof S == "undefined")
          throw u && u.type, new Error(vt(14));
        f[d] = S, c = c || S !== m;
      }
      return c = c || o.length !== Object.keys(s).length, c ? f : s;
    };
  }
  function Zu() {
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
  function RP() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return function(r) {
      return function() {
        var i = r.apply(void 0, arguments), o = function() {
          throw new Error(vt(15));
        }, a = {
          getState: i.getState,
          dispatch: function() {
            return o.apply(void 0, arguments);
          }
        }, l = t.map(function(s) {
          return s(a);
        });
        return o = Zu.apply(void 0, l)(i.dispatch), Dy(Dy({}, i), {}, {
          dispatch: o
        });
      };
    };
  }
  function HS(e) {
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
  var $S = HS();
  $S.withExtraArgument = HS;
  const Ly = $S;
  var LP = globalThis && globalThis.__extends || function() {
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
  }(), as = globalThis && globalThis.__generator || function(e, t) {
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
  }, FP = Object.defineProperty, MP = Object.defineProperties, BP = Object.getOwnPropertyDescriptors, Fy = Object.getOwnPropertySymbols, UP = Object.prototype.hasOwnProperty, zP = Object.prototype.propertyIsEnumerable, My = function(e, t, n) {
    return t in e ? FP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
  }, ii = function(e, t) {
    for (var n in t || (t = {}))
      UP.call(t, n) && My(e, n, t[n]);
    if (Fy)
      for (var r = 0, i = Fy(t); r < i.length; r++) {
        var n = i[r];
        zP.call(t, n) && My(e, n, t[n]);
      }
    return e;
  }, bp = function(e, t) {
    return MP(e, BP(t));
  }, ls = function(e, t, n) {
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
  }, WP = typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length !== 0)
      return typeof arguments[0] == "object" ? Zu : Zu.apply(null, arguments);
  };
  function jP(e) {
    if (typeof e != "object" || e === null)
      return !1;
    var t = Object.getPrototypeOf(e);
    if (t === null)
      return !0;
    for (var n = t; Object.getPrototypeOf(n) !== null; )
      n = Object.getPrototypeOf(n);
    return t === n;
  }
  var YP = (
    /** @class */
    function(e) {
      LP(t, e);
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
  function rh(e) {
    return xr(e) ? mi(e, function() {
    }) : e;
  }
  function VP(e) {
    return typeof e == "boolean";
  }
  function GP() {
    return function(t) {
      return HP(t);
    };
  }
  function HP(e) {
    e === void 0 && (e = {});
    var t = e.thunk, n = t === void 0 ? !0 : t;
    e.immutableCheck, e.serializableCheck;
    var r = new YP();
    return n && (VP(n) ? r.push(Ly) : r.push(Ly.withExtraArgument(n.extraArgument))), r;
  }
  var $P = !0;
  function JP(e) {
    var t = GP(), n = e || {}, r = n.reducer, i = r === void 0 ? void 0 : r, o = n.middleware, a = o === void 0 ? t() : o, l = n.devTools, s = l === void 0 ? !0 : l, u = n.preloadedState, c = u === void 0 ? void 0 : u, f = n.enhancers, p = f === void 0 ? void 0 : f, d;
    if (typeof i == "function")
      d = i;
    else if (jP(i))
      d = DP(i);
    else
      throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    var h = a;
    typeof h == "function" && (h = h(t));
    var m = RP.apply(void 0, h), S = Zu;
    s && (S = WP(ii({
      trace: !$P
    }, typeof s == "object" && s)));
    var g = [m];
    Array.isArray(p) ? g = Wl([m], p) : typeof p == "function" && (g = p(g));
    var v = S.apply(void 0, g);
    return GS(d, c, v);
  }
  function wr(e, t) {
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++)
        r[i] = arguments[i];
      if (t) {
        var o = t.apply(void 0, r);
        if (!o)
          throw new Error("prepareAction did not return an object");
        return ii(ii({
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
  function JS(e) {
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
  function QP(e) {
    return typeof e == "function";
  }
  function KP(e, t, n, r) {
    n === void 0 && (n = []);
    var i = typeof t == "function" ? JS(t) : [t, n, r], o = i[0], a = i[1], l = i[2], s;
    if (QP(e))
      s = function() {
        return rh(e());
      };
    else {
      var u = rh(e);
      s = function() {
        return u;
      };
    }
    function c(f, p) {
      f === void 0 && (f = s());
      var d = Wl([
        o[p.type]
      ], a.filter(function(h) {
        var m = h.matcher;
        return m(p);
      }).map(function(h) {
        var m = h.reducer;
        return m;
      }));
      return d.filter(function(h) {
        return !!h;
      }).length === 0 && (d = [l]), d.reduce(function(h, m) {
        if (m)
          if (ci(h)) {
            var S = h, g = m(S, p);
            return g === void 0 ? h : g;
          } else {
            if (xr(h))
              return mi(h, function(v) {
                return m(v, p);
              });
            var g = m(h, p);
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
  function XP(e, t) {
    return e + "/" + t;
  }
  function Hm(e) {
    var t = e.name;
    if (!t)
      throw new Error("`name` is a required option for createSlice");
    var n = typeof e.initialState == "function" ? e.initialState : rh(e.initialState), r = e.reducers || {}, i = Object.keys(r), o = {}, a = {}, l = {};
    i.forEach(function(c) {
      var f = r[c], p = XP(t, c), d, h;
      "reducer" in f ? (d = f.reducer, h = f.prepare) : d = f, o[c] = d, a[p] = d, l[c] = h ? wr(p, h) : wr(p);
    });
    function s() {
      var c = typeof e.extraReducers == "function" ? JS(e.extraReducers) : [e.extraReducers], f = c[0], p = f === void 0 ? {} : f, d = c[1], h = d === void 0 ? [] : d, m = c[2], S = m === void 0 ? void 0 : m, g = ii(ii({}, p), a);
      return KP(n, function(v) {
        for (var w in g)
          v.addCase(w, g[w]);
        for (var E = 0, O = h; E < O.length; E++) {
          var b = O[E];
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
  var qP = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", QS = function(e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; )
      t += qP[Math.random() * 64 | 0];
    return t;
  }, ZP = [
    "name",
    "message",
    "stack",
    "code"
  ], Sp = (
    /** @class */
    function() {
      function e(t, n) {
        this.payload = t, this.meta = n;
      }
      return e;
    }()
  ), By = (
    /** @class */
    function() {
      function e(t, n) {
        this.payload = t, this.meta = n;
      }
      return e;
    }()
  ), e_ = function(e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = ZP; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  };
  (function() {
    function e(t, n, r) {
      var i = wr(t + "/fulfilled", function(u, c, f, p) {
        return {
          payload: u,
          meta: bp(ii({}, p || {}), {
            arg: f,
            requestId: c,
            requestStatus: "fulfilled"
          })
        };
      }), o = wr(t + "/pending", function(u, c, f) {
        return {
          payload: void 0,
          meta: bp(ii({}, f || {}), {
            arg: c,
            requestId: u,
            requestStatus: "pending"
          })
        };
      }), a = wr(t + "/rejected", function(u, c, f, p, d) {
        return {
          payload: p,
          error: (r && r.serializeError || e_)(u || "Rejected"),
          meta: bp(ii({}, d || {}), {
            arg: f,
            requestId: c,
            rejectedWithValue: !!p,
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
        return function(c, f, p) {
          var d = r != null && r.idGenerator ? r.idGenerator(u) : QS(), h = new l(), m;
          function S(v) {
            m = v, h.abort();
          }
          var g = function() {
            return ls(this, null, function() {
              var v, w, E, O, b, A, T;
              return as(this, function(P) {
                switch (P.label) {
                  case 0:
                    return P.trys.push([0, 4, , 5]), O = (v = r == null ? void 0 : r.condition) == null ? void 0 : v.call(r, u, { getState: f, extra: p }), n_(O) ? [4, O] : [3, 2];
                  case 1:
                    O = P.sent(), P.label = 2;
                  case 2:
                    if (O === !1 || h.signal.aborted)
                      throw {
                        name: "ConditionError",
                        message: "Aborted due to condition callback returning false."
                      };
                    return b = new Promise(function(_, I) {
                      return h.signal.addEventListener("abort", function() {
                        return I({
                          name: "AbortError",
                          message: m || "Aborted"
                        });
                      });
                    }), c(o(d, u, (w = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : w.call(r, { requestId: d, arg: u }, { getState: f, extra: p }))), [4, Promise.race([
                      b,
                      Promise.resolve(n(u, {
                        dispatch: c,
                        getState: f,
                        extra: p,
                        requestId: d,
                        signal: h.signal,
                        abort: S,
                        rejectWithValue: function(_, I) {
                          return new Sp(_, I);
                        },
                        fulfillWithValue: function(_, I) {
                          return new By(_, I);
                        }
                      })).then(function(_) {
                        if (_ instanceof Sp)
                          throw _;
                        return _ instanceof By ? i(_.payload, d, u, _.meta) : i(_, d, u);
                      })
                    ])];
                  case 3:
                    return E = P.sent(), [3, 5];
                  case 4:
                    return A = P.sent(), E = A instanceof Sp ? a(null, d, u, A.payload, A.meta) : a(A, d, u), [3, 5];
                  case 5:
                    return T = r && !r.dispatchConditionRejection && a.match(E) && E.meta.condition, T || c(E), [2, E];
                }
              });
            });
          }();
          return Object.assign(g, {
            abort: S,
            requestId: d,
            arg: u,
            unwrap: function() {
              return g.then(t_);
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
  function t_(e) {
    if (e.meta && e.meta.rejectedWithValue)
      throw e.payload;
    if (e.error)
      throw e.error;
    return e.payload;
  }
  function n_(e) {
    return e !== null && typeof e == "object" && typeof e.then == "function";
  }
  var $m = function(e, t) {
    if (typeof e != "function")
      throw new TypeError(t + " is not a function");
  }, ih = function() {
  }, KS = function(e, t) {
    return t === void 0 && (t = ih), e.catch(t), e;
  }, XS = function(e, t) {
    return e.addEventListener("abort", t, { once: !0 }), function() {
      return e.removeEventListener("abort", t);
    };
  }, No = function(e, t) {
    var n = e.signal;
    n.aborted || ("reason" in n || Object.defineProperty(n, "reason", {
      enumerable: !0,
      value: t,
      configurable: !0,
      writable: !0
    }), e.abort(t));
  }, r_ = "task", qS = "listener", ZS = "completed", Jm = "cancelled", i_ = "task-" + Jm, o_ = "task-" + ZS, eE = qS + "-" + Jm, a_ = qS + "-" + ZS, of = (
    /** @class */
    function() {
      function e(t) {
        this.code = t, this.name = "TaskAbortError", this.message = r_ + " " + Jm + " (reason: " + t + ")";
      }
      return e;
    }()
  ), Do = function(e) {
    if (e.aborted)
      throw new of(e.reason);
  };
  function tE(e, t) {
    var n = ih;
    return new Promise(function(r, i) {
      var o = function() {
        return i(new of(e.reason));
      };
      if (e.aborted) {
        o();
        return;
      }
      n = XS(e, o), t.finally(function() {
        return n();
      }).then(r, i);
    }).finally(function() {
      n = ih;
    });
  }
  var l_ = function(e, t) {
    return ls(void 0, null, function() {
      var n, r;
      return as(this, function(i) {
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
              status: r instanceof of ? "cancelled" : "rejected",
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
  }, ec = function(e) {
    return function(t) {
      return KS(tE(e, t).then(function(n) {
        return Do(e), n;
      }));
    };
  }, nE = function(e) {
    var t = ec(e);
    return function(n) {
      return t(new Promise(function(r) {
        return setTimeout(r, n);
      }));
    };
  }, s_ = Object.assign, Uy = {}, ss = "listenerMiddleware", u_ = function(e) {
    var t = function(n) {
      return XS(e, function() {
        return No(n, e.reason);
      });
    };
    return function(n) {
      $m(n, "taskExecutor");
      var r = new AbortController();
      t(r);
      var i = l_(function() {
        return ls(void 0, null, function() {
          var o;
          return as(this, function(a) {
            switch (a.label) {
              case 0:
                return Do(e), Do(r.signal), [4, n({
                  pause: ec(r.signal),
                  delay: nE(r.signal),
                  signal: r.signal
                })];
              case 1:
                return o = a.sent(), Do(r.signal), [2, o];
            }
          });
        });
      }, function() {
        return No(r, o_);
      });
      return {
        result: ec(e)(i),
        cancel: function() {
          No(r, i_);
        }
      };
    };
  }, c_ = function(e, t) {
    var n = function(r, i) {
      return ls(void 0, null, function() {
        var o, a, l, s;
        return as(this, function(u) {
          switch (u.label) {
            case 0:
              Do(t), o = function() {
              }, a = new Promise(function(c, f) {
                var p = e({
                  predicate: r,
                  effect: function(d, h) {
                    h.unsubscribe(), c([
                      d,
                      h.getState(),
                      h.getOriginalState()
                    ]);
                  }
                });
                o = function() {
                  p(), f();
                };
              }), l = [
                a
              ], i != null && l.push(new Promise(function(c) {
                return setTimeout(c, i, null);
              })), u.label = 1;
            case 1:
              return u.trys.push([1, , 3, 4]), [4, tE(t, Promise.race(l))];
            case 2:
              return s = u.sent(), Do(t), [2, s];
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
      return KS(n(r, i));
    };
  }, rE = function(e) {
    var t = e.type, n = e.actionCreator, r = e.matcher, i = e.predicate, o = e.effect;
    if (t)
      i = wr(t).match;
    else if (n)
      t = n.type, i = n.match;
    else if (r)
      i = r;
    else if (!i)
      throw new Error("Creating or removing a listener requires one of the known fields for matching an action");
    return $m(o, "options.listener"), { predicate: i, type: t, effect: o };
  }, f_ = function(e) {
    var t = rE(e), n = t.type, r = t.predicate, i = t.effect, o = QS(), a = {
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
  }, oh = function(e) {
    e.pending.forEach(function(t) {
      No(t, eE);
    });
  }, p_ = function(e) {
    return function() {
      e.forEach(oh), e.clear();
    };
  }, zy = function(e, t, n) {
    try {
      e(t, n);
    } catch (r) {
      setTimeout(function() {
        throw r;
      }, 0);
    }
  }, d_ = wr(ss + "/add"), h_ = wr(ss + "/removeAll"), m_ = wr(ss + "/remove"), g_ = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    console.error.apply(console, Wl([ss + "/error"], e));
  };
  function Qm(e) {
    var t = this;
    e === void 0 && (e = {});
    var n = /* @__PURE__ */ new Map(), r = e.extra, i = e.onError, o = i === void 0 ? g_ : i;
    $m(o, "onError");
    var a = function(d) {
      return d.unsubscribe = function() {
        return n.delete(d.id);
      }, n.set(d.id, d), function(h) {
        d.unsubscribe(), h != null && h.cancelActive && oh(d);
      };
    }, l = function(d) {
      for (var h = 0, m = Array.from(n.values()); h < m.length; h++) {
        var S = m[h];
        if (d(S))
          return S;
      }
    }, s = function(d) {
      var h = l(function(m) {
        return m.effect === d.effect;
      });
      return h || (h = f_(d)), a(h);
    }, u = function(d) {
      var h = rE(d), m = h.type, S = h.effect, g = h.predicate, v = l(function(w) {
        var E = typeof m == "string" ? w.type === m : w.predicate === g;
        return E && w.effect === S;
      });
      return v && (v.unsubscribe(), d.cancelActive && oh(v)), !!v;
    }, c = function(d, h, m, S) {
      return ls(t, null, function() {
        var g, v, w;
        return as(this, function(E) {
          switch (E.label) {
            case 0:
              g = new AbortController(), v = c_(s, g.signal), E.label = 1;
            case 1:
              return E.trys.push([1, 3, 4, 5]), d.pending.add(g), [4, Promise.resolve(d.effect(h, s_({}, m, {
                getOriginalState: S,
                condition: function(O, b) {
                  return v(O, b).then(Boolean);
                },
                take: v,
                delay: nE(g.signal),
                pause: ec(g.signal),
                extra: r,
                signal: g.signal,
                fork: u_(g.signal),
                unsubscribe: d.unsubscribe,
                subscribe: function() {
                  n.set(d.id, d);
                },
                cancelActiveListeners: function() {
                  d.pending.forEach(function(O, b, A) {
                    O !== g && (No(O, eE), A.delete(O));
                  });
                }
              })))];
            case 2:
              return E.sent(), [3, 5];
            case 3:
              return w = E.sent(), w instanceof of || zy(o, w, {
                raisedBy: "effect"
              }), [3, 5];
            case 4:
              return No(g, a_), d.pending.delete(g), [
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
    }, f = p_(n), p = function(d) {
      return function(h) {
        return function(m) {
          if (d_.match(m))
            return s(m.payload);
          if (h_.match(m)) {
            f();
            return;
          }
          if (m_.match(m))
            return u(m.payload);
          var S = d.getState(), g = function() {
            if (S === Uy)
              throw new Error(ss + ": getOriginalState can only be called synchronously");
            return S;
          }, v;
          try {
            if (v = h(m), n.size > 0)
              for (var w = d.getState(), E = Array.from(n.values()), O = 0, b = E; O < b.length; O++) {
                var A = b[O], T = !1;
                try {
                  T = A.predicate(m, w, S);
                } catch (P) {
                  T = !1, zy(o, P, {
                    raisedBy: "predicate"
                  });
                }
                T && c(A, m, d, g);
              }
          } finally {
            S = Uy;
          }
          return v;
        };
      };
    };
    return {
      middleware: p,
      startListening: s,
      stopListening: u,
      clearListeners: f
    };
  }
  var Wy;
  typeof queueMicrotask == "function" && queueMicrotask.bind(typeof window != "undefined" ? window : typeof global != "undefined" ? global : globalThis);
  AP();
  const v_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEAElEQVR4nO3dvW4cVRyG8ceIj4KUcAfbIKIAFlIqXwEIylUiKmwp0KO5iK3S8SEnNAhrSxBwA25CEQckojTTcgchUkyxFDMLloVWLN53Z/6r59eMHU9W51jPnpXmyDN7i8UCadNeGHoA2k2GpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpYgXhx7Aupp5e/mf9oFbwAHwJnBt22PasKfAY+AUOAHOLv5wNp0MMaa1VV+xjoGHwGfATepHBd0cbtLN6SFwXCWmi8qtWBd8B3wAnANf0L27f5tNJ0//y3/uV77lk9b3AuP7+7XXCaOZt9eA63Sr8CfAYTNvXwc+3PgIg6qGdUwX1e/A+7Pp5Jdhh7M5/RvjAfCgmbdfAz/QzfUecDjk2NZR8aPwHbpf8Dk7FtVl/dzeA54DH9PNvYSKYd3uj1/uclRLs+nkV+Cr/tvbq84dk4phHfTHbwcdxXYt53qw8qwRqRjWfn88W3nWbnnUH/0oDHoJYDadnA89kG2ZTSfP+y9fHnQga6gYlgowLEUYliKqXiD9tz3D0ao01k0pGxb/bJmM7bW2+dqj5UehIiqvWJvYON7KJvSGX68EVyxFGJYiDEsRhqUIw1KEYSnCsBRhWIqofIHULZ0Rc8VSROUVyy2dEXPFUoRhKcKwFGFYijAsRRiWIgxLEYaliMoXSN3SGTFXLEVUXrHc0hmxsmFd9Yav2/zr5E3cnLbaX1P7UagIw1KEYSmiYlh/AjTztszd7a6qv/c7dE+tKKFiWMt7j+6vPGu3XO+PjwcdxRoqhnXaH28NOortWs71dOVZI1IxrJP+eKeZt28NOpItaObtDeBO/+3JqnPHpGJYZ8B94BXgx2bevj3scHL6N85PdHO9T6FbkFe9QHoIvEb3jJmfm3n7OfAN8GQ2nfwx6MiuqJm3rwJvAB8Bn9Ldgvt7Cj1HB2BvsSi1U3D5CvQxxX7h/8O92XRytJx3lUfMVfwovOgIeBe4S/dsv2eDjmYzntHN5S7d3I6qbedAwRVLNVRfsTRShqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYi/gL6TZmwrBJftQAAAABJRU5ErkJggg==", tc = (e, t) => Array.from({ length: e }, (n, r) => r), nc = (e, t) => {
    const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
    return Array.from({ length: n }, (i, o) => e + o * r);
  };
  function jy(e) {
    let t = 1 / 0, n = -1 / 0;
    for (let o of e)
      o < t && (t = o), o > n && (n = o);
    const r = n - t, i = Array.isArray(e) ? e.length : e.size;
    return { minVal: t, maxVal: n, span: r, isSequence: r === i - 1 };
  }
  function jl(e, t) {
    return [...new Array(t)].fill(e);
  }
  function y_(e, t) {
    return e.filter((n) => !t.includes(n));
  }
  function ah(e, t) {
    return [...e.slice(0, t), ...e.slice(t + 1)];
  }
  function Qo(e, t, n) {
    if (t < 0)
      throw new Error("Can't add item at a negative index");
    const r = [...e];
    return t > r.length - 1 && (r.length = t), r.splice(t, 0, n), r;
  }
  function w_(e, t, n) {
    if (n < 0)
      throw new Error("Can't add item at a negative index");
    if (t < 0 || t > e.length)
      throw new Error("Requested to move an element that is not in array");
    let r = [...e];
    const i = r[t];
    return r[t] = void 0, r = Qo(r, n, i), r.filter((o) => typeof o != "undefined");
  }
  function b_(e, t = ", ", n = " and ") {
    const r = e.length;
    if (r === 1)
      return e[0];
    const i = e[r - 1];
    return [...e].splice(0, r - 1).join(t) + n + i;
  }
  function S_(e) {
    return [...new Set(e)];
  }
  function sl(e) {
    return Array.isArray(e) ? e : [e];
  }
  const af = ({
    type: e,
    name: t,
    className: n
  }) => /* @__PURE__ */ L("code", { className: n, children: [
    /* @__PURE__ */ L("span", { style: { opacity: 0.55 }, children: [
      e,
      "$"
    ] }),
    /* @__PURE__ */ y("span", { children: t })
  ] }), E_ = 4, A_ = 25, C_ = tc(A_).map((e) => /* @__PURE__ */ y("div", { className: "faux-row", children: tc(E_).map((t) => /* @__PURE__ */ y("div", { className: "faux-cell", children: "i" }, t)) }, e)), x_ = ({
    uiArguments: e,
    path: t,
    wrapperProps: n
  }) => /* @__PURE__ */ y("div", Q(M({ className: "dtDTOutput" }, n), { children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ y(af, { type: "output", name: e.outputId })
        ] }),
        /* @__PURE__ */ y("div", { className: "faux-table-body", children: C_ })
      ]
    }
  ) })), k_ = {
    title: "DT Table",
    UiComponent: x_,
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
    iconSrc: v_,
    category: "Outputs",
    description: "`DataTable` table output"
  }, O_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEO0lEQVR4nO3dsYqcVRiH8WeNrkXMDRgLixRWRjSiXoMWG0iUXIGNsii4wRsQTApD0EIvQBCJ2RD0GqIoRjthC4vsHaRxRcbi7MDk28kMgv+c92SfH2zxfbPFmZcnZ06+LWZjNpsh/d+e6L0APZ4MSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqWIJ3svYJ2db/aW3d4Etg5/3gCePby3Mfm96RcFjfj6feAe8CtwE7gFHEx+jyvvnJne6qp8WEucB64AtSaZ8wzwwuHPJWAPuAx813NR64z0UXgC+JQ20OMS1TJngBu0WZzovJaHGmnH+gTY6b2IQuazuNx1FQ8xyo51gaNRHQDXaWesUxw9n3B4b/FnxNdP0d7jdY6erXZosylnhLA2gc8m9/aB14Bt4A7tgPu4uk97j9u097w/ef0abUaljBDWReC5hesD4C3gbpfV9HUXeBP4a+HeaeDtLqtZYYSwtibXX3I8o5r7Dfhqcm+rwzpWGiGsVyfXX3dZRS3TGZzrsooVRvhf4fOT63LniQ7usPywX8YIO9bUkafOqmfEsDQAw1LECGesdX+oPa5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqUIw1LECGes0s9rOio9F3csRRiWIgxLESOcsUqdHQopPRd3LEUYliIMSxEjnLFKP6/pqPRc3LEUYViKMCxFjHDGKnV2KKT0XNyxFGFYijAsRYxwxir9vKaj0nNxx1KEYSnCsBQxwhmr1NmhkNJzccdShGEpwrAUMcIZq/Tzmo5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqWIEcPyK08GMEJYf9Ce2cx/Xu67nBJe58GZ/Nl1NUuMENbvk+tLXVZRy3QGP3dZxQojhLU7uX4XONthHVW8SJvBot0O61hphLC+Be4tXD8NfA+81GU1fZ0FfqDNYG6fNqNSRgjrAPhwcu808CPt+5DPAScf8ZoepZO093gN+In23hd9wINf5VvCCA9Iof2LvAp8tHBvk/YF3NsL96YPDdf9oXa016euUnC3gjF2rLmPgc97L6KQL2gzKWmksP4B3gcuAHud19LTHnAReI82k5JG+ShcdAO4TRvueeAV2rnjqZ6LCvqbdkD/BbhJ++gr//XFG7PZuo9x6b8b6aNQAzEsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliL+BXaHdHGUC5uqAAAAAElFTkSuQmCC", T_ = "_deleteButton_1en02_1", I_ = {
    deleteButton: T_
  };
  function iE({
    path: e,
    justIcon: t = !1,
    label: n = "Delete Node"
  }) {
    const r = xC(e);
    return /* @__PURE__ */ L(
      dt,
      {
        className: I_.deleteButton,
        onClick: (i) => {
          i.stopPropagation(), r();
        },
        "aria-label": n,
        title: n,
        variant: t ? "icon" : "delete",
        type: "button",
        children: [
          /* @__PURE__ */ y(Hc, {}),
          t ? null : "Delete Element"
        ]
      }
    );
  }
  const Km = k.forwardRef(
    (i, r) => {
      var o = i, { className: e = "", children: t } = o, n = it(o, ["className", "children"]);
      const a = e + " card";
      return /* @__PURE__ */ y("div", Q(M({ ref: r, className: a }, n), { children: t }));
    }
  ), P_ = k.forwardRef(
    (r, n) => {
      var i = r, { className: e = "" } = i, t = it(i, ["className"]);
      const o = e + " card-header";
      return /* @__PURE__ */ y("div", M({ ref: n, className: o }, t));
    }
  ), Xm = k.createContext([
    null,
    (e) => {
    }
  ]);
  function __({
    children: e
  }) {
    const t = k.useState(null);
    return /* @__PURE__ */ y(Xm.Provider, { value: t, children: e });
  }
  function N_() {
    return k.useContext(Xm);
  }
  function oE({
    nodeInfo: e,
    immovable: t = !1
  }) {
    var a;
    const n = k.useRef(!1), [, r] = k.useContext(Xm), i = k.useCallback(
      (l) => {
        n.current === !1 || t || (r(null), n.current = !1, document.body.removeEventListener("dragover", Yy), document.body.removeEventListener("drop", i));
      },
      [t, r]
    ), o = k.useCallback(
      (l) => {
        l.stopPropagation(), r(e), n.current = !0, document.body.addEventListener("dragover", Yy), document.body.addEventListener("drop", i);
      },
      [i, e, r]
    );
    return ((a = e.currentPath) == null ? void 0 : a.length) === 0 || t ? {} : {
      onDragStart: o,
      onDragEnd: i,
      draggable: !0
    };
  }
  function Yy(e) {
    e.preventDefault();
  }
  function nr(e, t) {
    return [...e, t];
  }
  function lf(e) {
    return e.join("-");
  }
  const aE = Hm({
    name: "selectedPath",
    initialState: [],
    reducers: {
      SET_SELECTION: (e, t) => t.payload.path,
      STEP_BACK_SELECTION: (e) => e === null || e.length === 0 ? null : (e.pop(), e)
    }
  }), { SET_SELECTION: sf, STEP_BACK_SELECTION: BU } = aE.actions;
  function D_() {
    return la((e) => e.selected_path);
  }
  const R_ = aE.reducer;
  function qm() {
    const e = qi(), t = la((r) => r.selected_path), n = J.useCallback(
      (r) => {
        e(sf({ path: r }));
      },
      [e]
    );
    return [t, n];
  }
  function L_() {
    return la((t) => t.selected_path);
  }
  function ua(e, t) {
    if (e === t)
      return !0;
    if (e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }
  function F_(e, t, n = []) {
    if (e === t)
      return !0;
    const r = Object.keys(e).filter((o) => !n.includes(o)), i = Object.keys(t).filter((o) => !n.includes(o));
    if (!ua(r, i))
      return !1;
    for (let o of r)
      if (e[o] !== t[o])
        return !1;
    return !0;
  }
  function M_(e) {
    const [t, n] = qm(), r = k.useCallback(
      (o) => {
        o.stopPropagation(), n(e);
      },
      [e, n]
    ), i = Boolean(t && ua(t, e));
    return { onClick: r, isSelected: i };
  }
  function lE(e, t) {
    const n = oE({
      nodeInfo: { node: e, currentPath: t }
    }), { onClick: r, isSelected: i } = M_(t);
    return M({
      onClick: r,
      "data-sue-path": lf(t),
      "data-is-selected-node": i,
      "aria-label": e.uiName
    }, n);
  }
  const Zi = ({ path: e, node: t }) => {
    const { uiName: n, uiArguments: r, uiChildren: i } = t, o = tn[n].UiComponent, a = lE(t, e);
    return /* @__PURE__ */ y(
      o,
      {
        wrapperProps: a,
        uiArguments: r,
        uiChildren: i,
        path: e
      }
    );
  }, B_ = "_container_1a2os_1", U_ = "_withTitle_1a2os_13", z_ = "_panelTitle_1a2os_22", W_ = "_contentHolder_1a2os_27", j_ = "_dropWatcher_1a2os_68", Y_ = "_lastDropWatcher_1a2os_76", V_ = "_firstDropWatcher_1a2os_79", G_ = "_middleDropWatcher_1a2os_90", H_ = "_onlyDropWatcher_1a2os_94", $_ = "_hoveringOverSwap_1a2os_99", J_ = "_availableToSwap_1a2os_100", Q_ = "_pulse_1a2os_1", K_ = "_emptyGridCard_1a2os_144", X_ = "_emptyMessage_1a2os_161", Kt = {
    container: B_,
    withTitle: U_,
    panelTitle: z_,
    contentHolder: W_,
    dropWatcher: j_,
    lastDropWatcher: Y_,
    firstDropWatcher: V_,
    middleDropWatcher: G_,
    onlyDropWatcher: H_,
    hoveringOverSwap: $_,
    availableToSwap: J_,
    pulse: Q_,
    emptyGridCard: K_,
    emptyMessage: X_
  };
  function Fi(e) {
    return e.length;
  }
  function sE(e, t, n) {
    return n === 0 ? !0 : ua(e.slice(0, n), t.slice(0, n));
  }
  function q_(e, t) {
    const n = Fi(e), r = Fi(t);
    return n >= r ? !1 : sE(e, t, n);
  }
  function Zm(e, t) {
    const n = e.length, r = t.length;
    if (n !== r)
      return !1;
    const i = n - 1;
    return !!ua(
      e.slice(0, i),
      t.slice(0, i)
    );
  }
  function uE({
    fromPath: e,
    toPath: t
  }) {
    if (e == null)
      return !0;
    if (q_(e, t))
      return !1;
    if (Zm(e, t)) {
      const n = e.length, r = e[n - 1], i = t[n - 1];
      if (r === i || r === i - 1)
        return !1;
    }
    return !0;
  }
  function uf({
    watcherRef: e,
    getCanAcceptDrop: t = () => !0,
    onDrop: n,
    onDragOver: r,
    canAcceptDropClass: i = "can-accept-drop",
    hoveringOverClass: o = "hovering-over"
  }) {
    const [a, l] = N_(), {
      addCanAcceptDropHighlight: s,
      addHoveredOverHighlight: u,
      removeHoveredOverHighlight: c,
      removeAllHighlights: f
    } = Z_({ watcherRef: e, canAcceptDropClass: i, hoveringOverClass: o }), p = a ? t(a) : !1, d = k.useCallback(
      (S) => {
        S.preventDefault(), S.stopPropagation(), u(), r == null || r();
      },
      [u, r]
    ), h = k.useCallback(
      (S) => {
        S.preventDefault(), c();
      },
      [c]
    ), m = k.useCallback(
      (S) => {
        if (S.stopPropagation(), c(), !a) {
          console.error("No dragged node in context but a drop was detected...");
          return;
        }
        p ? n(a) : console.error("Incompatable drag pairing"), l(null);
      },
      [
        p,
        a,
        n,
        c,
        l
      ]
    );
    k.useEffect(() => {
      const S = e.current;
      if (S)
        return p && (s(), S.addEventListener("dragenter", d), S.addEventListener("dragleave", h), S.addEventListener("dragover", d), S.addEventListener("drop", m)), () => {
          f(), S.removeEventListener("dragenter", d), S.removeEventListener("dragleave", h), S.removeEventListener("dragover", d), S.removeEventListener("drop", m);
        };
    }, [
      s,
      p,
      h,
      d,
      m,
      f,
      e
    ]);
  }
  function Z_({
    watcherRef: e,
    canAcceptDropClass: t,
    hoveringOverClass: n
  }) {
    const r = k.useCallback(() => {
      e.current && (e.current.classList.add(t), e.current.classList.add("can-accept-drop"));
    }, [t, e]), i = k.useCallback(() => {
      e.current && e.current.classList.add(n);
    }, [n, e]), o = k.useCallback(() => {
      e.current && e.current.classList.remove(n);
    }, [n, e]), a = k.useCallback(() => {
      e.current && (e.current.classList.remove(n), e.current.classList.remove(t), e.current.classList.remove("can-accept-drop"));
    }, [t, n, e]);
    return {
      addCanAcceptDropHighlight: r,
      addHoveredOverHighlight: i,
      removeHoveredOverHighlight: o,
      removeAllHighlights: a
    };
  }
  function e4({
    watcherRef: e,
    positionInChildren: t,
    parentPath: n
  }) {
    const r = If(), i = k.useCallback(
      ({ node: a, currentPath: l }) => Vy(a) !== null && uE({
        fromPath: l,
        toPath: [...n, t]
      }),
      [t, n]
    ), o = k.useCallback(
      ({ node: a, currentPath: l }) => {
        const s = Vy(a);
        if (!s)
          throw new Error("No node to place...");
        r({
          node: s,
          currentPath: l,
          path: nr(n, t)
        });
      },
      [t, n, r]
    );
    uf({
      watcherRef: e,
      getCanAcceptDrop: i,
      onDrop: o
    });
  }
  function Vy(e) {
    var n;
    const t = e.uiName;
    return t === "gridlayout::grid_card" && ((n = e.uiChildren) == null ? void 0 : n.length) === 1 ? e.uiChildren[0] : t.includes("gridlayout::grid_card") ? null : e;
  }
  const t4 = [
    "gridlayout::grid_card_text",
    "gridlayout::grid_card",
    "gridlayout::grid_card_plot"
  ];
  function lh(e) {
    return t4.includes(e.uiName);
  }
  const cE = k.createContext(null);
  function n4() {
    return k.useContext(cE);
  }
  function eg({
    containerRef: e,
    path: t,
    area: n
  }) {
    const r = n4(), i = k.useCallback(
      ({ node: a, currentPath: l }) => l === void 0 || !lh(a) ? !1 : Zm(l, t),
      [t]
    ), o = k.useCallback(
      (a) => {
        var s;
        if (!("area" in a.node.uiArguments)) {
          console.error("Invalid grid area swap drop", { dropInfo: a });
          return;
        }
        const l = (s = a.node.uiArguments.area) != null ? s : "__BAD_DROP__";
        r == null || r({ type: "SWAP_ITEMS", item_a: n, item_b: l });
      },
      [n, r]
    );
    uf({
      watcherRef: e,
      getCanAcceptDrop: i,
      onDrop: o,
      canAcceptDropClass: Kt.availableToSwap,
      hoveringOverClass: Kt.hoveringOverSwap
    });
  }
  const r4 = ({
    uiArguments: { area: e, item_gap: t, title: n },
    uiChildren: r,
    path: i,
    wrapperProps: o
  }) => {
    var s;
    const a = k.useRef(null), l = (s = r == null ? void 0 : r.length) != null ? s : 0;
    return eg({ containerRef: a, area: e, path: i }), /* @__PURE__ */ L(
      Km,
      Q(M({
        className: Wt(
          Kt.container,
          n ? Kt.withTitle : null
        ),
        ref: a,
        style: {
          gridArea: e,
          "--item-gap": t
        }
      }, o), {
        children: [
          n ? /* @__PURE__ */ y(P_, { className: Kt.panelTitle, children: n }) : null,
          /* @__PURE__ */ L("div", { className: Kt.contentHolder, "data-alignment": "top", children: [
            /* @__PURE__ */ y(
              Gy,
              {
                index: 0,
                parentPath: i,
                numChildren: l
              }
            ),
            l > 0 ? r == null ? void 0 : r.map((u, c) => /* @__PURE__ */ L(k.Fragment, { children: [
              /* @__PURE__ */ y(Zi, { path: nr(i, c), node: u }),
              /* @__PURE__ */ y(
                Gy,
                {
                  index: c + 1,
                  numChildren: r.length,
                  parentPath: i
                }
              )
            ] }, i.join(".") + c)) : /* @__PURE__ */ y(o4, { path: i })
          ] })
        ]
      })
    );
  };
  function Gy({
    index: e,
    numChildren: t,
    parentPath: n
  }) {
    const r = k.useRef(null);
    e4({
      watcherRef: r,
      positionInChildren: e,
      parentPath: n
    });
    const i = i4(e, t);
    return /* @__PURE__ */ y(
      "div",
      {
        ref: r,
        className: Wt(Kt.dropWatcher, i),
        role: "region",
        "aria-label": "drop watcher"
      }
    );
  }
  function i4(e, t) {
    return e === 0 && t === 0 ? Kt.onlyDropWatcher : e === 0 ? Kt.firstDropWatcher : e === t ? Kt.lastDropWatcher : Kt.middleDropWatcher;
  }
  function o4({ path: e }) {
    return /* @__PURE__ */ L("div", { className: Kt.emptyGridCard, children: [
      /* @__PURE__ */ y("span", { className: Kt.emptyMessage, children: "Empty grid card" }),
      /* @__PURE__ */ y(
        iE,
        {
          path: e,
          justIcon: !0,
          label: "Delete empty grid card"
        }
      )
    ] });
  }
  const a4 = {
    title: "Grid Card",
    UiComponent: r4,
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
    iconSrc: O_,
    category: "gridlayout",
    description: "The standard element for placing elements on the grid in a simple card container."
  }, tg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAACYElEQVR4nO3cMYoUQQBA0RqRPYBn8E5GhqYbLiZeYDNzs428k1dwU8M2UGFZFmYUf/d013vRTEFDBZ+qomj6tCzLgP/t1dYT4JiERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEXi9dYT+Fd3X78tz4ZOm0xkJffv3m49hb9ixSIhrPNuxhifxxjfxxiPv3/fbDqjHdjtVrii+zHG7ZP/t2OMH2OMj9tMZx+sWOe9f2Hsw+qz2BlhnffmwjGeEBYJYZEQFglhkRAWCWF1pr5YdUHamfpi1YrVmfpiVVidqS9WZwpr6jPP2mY6Y0195lnbTCvW1Geetc0U1tRnnrXNFBYrEhYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWiZnCerxwbOvnDmGmsB5eGPtyhc8dwkwv+t2NXx9n+/Ne1sMY49MVPncIp2V5/mG8ffBFv+s201bIioRF4khnrH3u6Zfb1VZvxSIhLBLCIrHb6waumxWLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi8RPaOk2ptnQzzIAAAAASUVORK5CYII=";
  function l4(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z" } }] })(e);
  }
  const s4 = "_container_1rlbk_1", u4 = "_plotPlaceholder_1rlbk_5", c4 = "_label_1rlbk_19", sh = {
    container: s4,
    plotPlaceholder: u4,
    label: c4
  };
  function fE({ outputId: e }) {
    const t = J.useRef(null), n = f4(t), r = n === null ? 100 : Math.min(n.width, n.height);
    return /* @__PURE__ */ L(
      "div",
      {
        ref: t,
        className: sh.plotPlaceholder,
        "aria-label": "shiny::plotOutput placeholder",
        children: [
          /* @__PURE__ */ y(
            af,
            {
              className: sh.label,
              type: "output",
              name: e
            }
          ),
          /* @__PURE__ */ y(
            l4,
            {
              size: `calc(${r}px - 80px)`
            }
          )
        ]
      }
    );
  }
  function f4(e) {
    const [t, n] = J.useState(null);
    return J.useEffect(() => {
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
  const p4 = "_gridCardPlot_1a94v_1", d4 = {
    gridCardPlot: p4
  }, h4 = ({
    uiArguments: { outputId: e, area: t },
    path: n,
    wrapperProps: r
  }) => {
    const i = J.useRef(null);
    return eg({ containerRef: i, area: t, path: n }), /* @__PURE__ */ y(
      Km,
      Q(M({
        ref: i,
        style: { gridArea: t },
        className: Wt(d4.gridCardPlot, "gridlayout-gridCardPlot")
      }, r), {
        children: /* @__PURE__ */ y(fE, { outputId: e != null ? e : t })
      })
    );
  }, m4 = {
    title: "Grid Plot Card",
    UiComponent: h4,
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
    iconSrc: tg,
    category: "gridlayout",
    description: "A wrapper for `shiny::plotOutput()` that uses `gridlayout`-friendly sizing defaults. \n    For when you want to have a grid area filled entirely with a single plot."
  }, g4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFn0lEQVR4nO3b4VHjRgCG4c+ZNMCV4BtVwJVgSjiiCqACJZRgogqgAuUoAZcAFShHC5RAfnh9rBdJFsaf8TrvM5MZzvZJTvxmtVovk5eXFwG79ttnvwEcJ8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcHi989+A2NMJpNRr6uadibpPnn4rC6LxXvP2XGsy7osbt97HJeXl5fPfguDjm3E+j7yMZgdTVhV056oO6KL8Bz26GjC0jKqvoAu9vlGcHxhrdxJiudVhLVnRxFW1bRTSbPoobvwz8o0TMaxJ0cRltZHq+e6LFZhPUePM2rt0bGEFUdzJ0l1WTxrfdT6ziR+f7JYxxoSLnHT6KG75Oc4ugtJ1zs4519ajpKn0cMLSYu6LN59/HC8U729q936mJ9tcugLbdLwAmnVtDd6jeepLouvyfM/9Rrem+cHjvtmgVTSk6QbrYecepZ0PmZRtmrai3C8Mc7DJV4SC6RWHWtXdx0vi1fLPzKJP9UytKGopOWSx33VtIMLs+F/iLFRSdKPMLJlIeuwtByp4nlTV1jpY9tO4uO/dyvpW10Wk7osJpK+dZznJtytvlE17bzjfVxL+hod84ukq+Q181zubrO+FFZN+6DXec5jXRbfel53r/XliC9hct+r53vHwctcCCYeVW7rsrjccNxnLb/PfOw55qmkh+ihRV0WZ4f+uWU7YoX/4PHkuWu06ntum1FrFUDv3Kkuiyst52G/ztNxJ5qe+7IvqnDMR63fcMz6RsJDkm1YensHtSmsj65pXQ8FEEl3QPwaKTvmhIt4Qj4gPe9p56sOSM7LDXEci7osnvpeWJfFc9W08dLDtGra7yM/1JXBS2f8XpI/n+o1+nR+NGo7T3ifa/OBv//gUrhz4Y5r06Q9lb7Gsp2mY1Sb9vwsvR2JjkauI1YaxU24fX/XMaqmnQ6NdB/wpNeIhlb7Hec+CNmNWAP7rrax702A/5uvlLILS7v9Mtn1xXRfQGPnadnL8VK4tpNBy0XF0R9Ysqa1zSR+jDisocvddMPz2cpqxOpau3pPVKu/k/x5p6NWeI+xp56fpQyWDbaV24j1nrWrPneS5nodVWY7nsQPLSmkywszjdhtEe6Cf0QPnWu7f/e9yWrE0vro8rzNr3V17NOSxk3iN068w41F/B6f4uWHjnPPNn1ZHaQj28EvU2QTVsfa1Ud+xy8Na8yugfmI3QXplpqu0Sh93zcdl89fwnPxeQcXgw9FNmHp7Vxo60tBGOniD+dk5Mgxr5r2IQ2satpZuCmIj/HY9Quu4dxxcCeSHqqmncffAVZNexK+1H5IDpHFpr8sdjf8+c+/U0k/o4d6dzKMFeKYRw8t6rI4i57v2t0w1pOW22p6byySDYpjXa12kx7655bLiLWLSXsqPcamXQNjz7nQhqgkKWynuRx6TeI8py3KuYS1s8vgSpinpJP/oRFkETbgXfWc/1rLbTVnY5dA6rK43XDMhZaj1MSw1maVxaUQ+cllxEJmCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCgsV/EcmMRmtHHXoAAAAASUVORK5CYII=", v4 = "_textPanel_525i2_1", y4 = {
    textPanel: v4
  }, w4 = ({
    uiArguments: { content: e, area: t, alignment: n },
    path: r,
    wrapperProps: i
  }) => {
    const o = J.useRef(null);
    return eg({ containerRef: o, area: t, path: r }), /* @__PURE__ */ y(
      Km,
      Q(M({
        ref: o,
        className: Wt(y4.textPanel, "gridlayout-textPanel"),
        style: { gridArea: t, justifyItems: n }
      }, i), {
        children: /* @__PURE__ */ y("h1", { children: e })
      })
    );
  }, b4 = {
    title: "Grid Text Card",
    UiComponent: w4,
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
          start: { icon: kS, label: "left" },
          center: { icon: Kd, label: "center" },
          end: { icon: OS, label: "right" }
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
    iconSrc: g4,
    category: "gridlayout",
    description: "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics."
  }, pE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEVklEQVR4nO3cwYpcRRiG4XeMjouYGzAuXGThyohG1GvQxQQSJVfgRhkUnOANCCYLh6ALvQBBQkxE9BqiKEZ3wixcZO4gm4xIu6geaE+PDMp8VZU67wNncc5ppqqrP7r++Q/0xmKxQDppj7WegMZksBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBTxeK2Bdr7aO+ryJrC1PF4Dnl5e25i8bvqTON5fv/8AuA/8AtwGvgEOJq/j2lvnppciqgXrCBeBa0Cddzq+p4DnlscVYA+4CnzdYjIttsJTwMeUN2yocs4Btyhrfar24C2+sT4CdhqMO1eHa3215qC1v7EusR6qA+AGpcY6w3r9wPLa6uH99ftnKGt4g/Xaaoey9tXUDNYm8Mnk2j7wCrAN3KUUoPp/HlDWcJuypvuT+7uUz6CKmsG6DDyzcn4AvAHcqziHubgHvA48XLl2Fniz1gRqBmtrcv45hirpV+CLybWtWoPXDNbLk/MvT/BvLyaHiukaX6g1cM3/Cp+dnFfb72fsLkcX+3EtH+msdYU1Dp8VKqLlI52T1OTrXv+uZrCOe5CqjCbr7laoCIOliFFqLLfZztQMlh92G7PrY2lgBksRo9RYbrOdsY81PvtYGofBUsQoNZbbbGfsY43PPpbGYbAUMUqN5TbbGftY47OPpXEYLEWMUmO5zXbGPtb47GNpHAZLEaPUWG6znbGPNT77WBqHwVLEKDVWD7+z3sv9LkoM+1jjs4+lcRgsRYxSYx33dT/3+9XZxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIUWqsnrbZnubSjH2s8dnH0jgMliJGqbF62mZ7mksz9rHGZx9L4zBYihilxuppm+1pLs3YxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIlsHabDi2wmoG63dKYXt4vHiCf3tjcrTU01xe5Z9r/ketgWsG67fJ+ZWKY8/VdI1/qjVwzWDdmZy/DZyvOP7cPE9Z41V3ag1eM1g3gfsr508C3wEvVJzDXJwHvqes8aF9ymdQRc1gHQDvT66dBX4AdoELwOmK8xnNacoa7gI/UtZ21XvAw1qTqd15vwlcBz5YubYJbC+PQz3/Yt6jcH/qOhW/raBNu+FD4NMG487VZ5Q1r6pFsP4C3gUuAXsNxp+LPeAy8A5lzatq+RD6FvAt5c1fBF6i1AVPNJzTo+xPSoH+M3CbsvUdtJrMxmJx3PYs/Xc+K1SEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVLE32A0lLomuWLgAAAAAElFTkSuQmCC";
  var cf = Ha;
  function Ha(e) {
    let t = e;
    var n = {}.toString.call(e).slice(8, -1);
    if (n == "Set")
      return new Set([...e].map((i) => Ha(i)));
    if (n == "Map")
      return new Map([...e].map((i) => [Ha(i[0]), Ha(i[1])]));
    if (n == "Date")
      return new Date(e.getTime());
    if (n == "RegExp")
      return RegExp(e.source, S4(e));
    if (n == "Array" || n == "Object") {
      t = Array.isArray(e) ? [] : {};
      for (var r in e)
        t[r] = Ha(e[r]);
    }
    return t;
  }
  function S4(e) {
    if (typeof e.source.flags == "string")
      return e.source.flags;
    var t = [];
    return e.global && t.push("g"), e.ignoreCase && t.push("i"), e.multiline && t.push("m"), e.sticky && t.push("y"), e.unicode && t.push("u"), t.join("");
  }
  function ca(e) {
    const t = e.length, n = e[0].length;
    for (let r of e)
      if (r.length !== n)
        throw new Error("Inconsistant number of columns in matrix");
    return { numRows: t, numCols: n };
  }
  function E4(e, { index: t, arr: n, dir: r }) {
    const i = cf(e);
    switch (r) {
      case "rows":
        return Qo(i, t, n);
      case "cols":
        return i.map(
          (o, a) => Qo(o, t, n[a])
        );
    }
  }
  function A4(e, { index: t, dir: n }) {
    const r = cf(e);
    switch (n) {
      case "rows":
        return ah(r, t);
      case "cols":
        return r.map((i, o) => ah(i, t));
    }
  }
  const Un = ".";
  function ng(e) {
    const t = /* @__PURE__ */ new Map();
    return C4(e).forEach(({ itemRows: n, itemCols: r }, i) => {
      if (i === Un)
        return;
      const o = jy(n), a = jy(r);
      t.set(i, {
        colStart: a.minVal,
        rowStart: o.minVal,
        colSpan: a.span + 1,
        rowSpan: o.span + 1,
        isValid: o.isSequence && a.isSequence
      });
    }), t;
  }
  function C4(e) {
    var i;
    const t = /* @__PURE__ */ new Map(), { numRows: n, numCols: r } = ca(e);
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
  function x4(e, r) {
    var i = r, { name: t } = i, n = it(i, ["name"]);
    const { rowStart: o, colStart: a } = n, l = "rowEnd" in n ? n.rowEnd : o + n.rowSpan - 1, s = "colEnd" in n ? n.colEnd : a + n.colSpan - 1, u = cf(e.areas);
    for (let c = 0; c < u.length; c++) {
      const f = c >= o - 1 && c < l;
      for (let p = 0; p < u[0].length; p++) {
        const d = u[c][p], h = d === t;
        if (!(f && p >= a - 1 && p < s)) {
          h && (u[c][p] = Un);
          continue;
        }
        if (d !== Un && !h)
          throw new Error(
            `Can't add ${t} to layout, overlaps with item ${u[c][p]}.`
          );
        u[c][p] = t;
      }
    }
    return Q(M({}, e), { areas: u });
  }
  function uh(e, t) {
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
  function k4({
    areas: e,
    row_sizes: t = ["1fr"],
    col_sizes: n = ["1fr"]
  }) {
    const { numRows: r, numCols: i } = ca(e);
    return {
      rows: Hy(r, t, "row"),
      cols: Hy(i, n, "column")
    };
  }
  function Hy(e, t, n) {
    if (!Array.isArray(t))
      return jl(t, e);
    if (e !== t.length)
      throw new Error(
        `Number of ${n} sizes does not match the number of ${n}s in the areas template. 
    Either make sure they match or use a single ${n} size that will be repeated for all ${n}s.`
      );
    return t;
  }
  function dE(e, { afterIndex: t, size: n, dir: r }) {
    return mi(e, (i) => {
      const o = r === "rows" ? "cols" : "rows", a = k4(i);
      if (t > a[r].length)
        throw new Error(
          `Can't add a tract after index ${t}. Not enought tracts.`
        );
      if (t < 0)
        throw new Error("Cant add a tract at a negative index");
      const l = ng(i.areas);
      let s = jl(Un, a[o].length);
      l.forEach((u, c) => {
        const { itemStart: f, itemEnd: p } = uh(u, r);
        if (f <= t && p > t) {
          const h = uh(u, o);
          for (let m = h.itemStart - 1; m < h.itemEnd; m++)
            s[m] = c;
        }
      }), i.areas = E4(i.areas, {
        dir: r,
        index: t,
        arr: s
      }), i[r === "rows" ? "row_sizes" : "col_sizes"] = Qo(
        a[r],
        t,
        n
      );
    });
  }
  function O4({ areas: e }, t) {
    const { numRows: n, numCols: r } = ca(e);
    for (let i = 0; i < n; i++)
      for (let o = 0; o < r; o++)
        e[i][o] === t && (e[i][o] = Un);
  }
  function hE(e, t) {
    let n = Array.isArray(t) ? t : [t];
    return mi(e, (r) => {
      for (let i of n)
        O4(r, i);
    });
  }
  function T4(e, t) {
    return hE(e, t);
  }
  function mE(e, t, n = !1) {
    const { dir: r, index: i } = t, o = t.index - 1;
    if (!n) {
      const s = gE(e.areas, t);
      if (s.length !== 0)
        throw new Error(
          `Can't remove ${r === "rows" ? "row" : "col"} ${i} as items ${b_(
            s
          )} are entirely contained within it.`
        );
    }
    const a = {
      areas: A4(e.areas, { index: o, dir: r })
    }, l = r === "rows" ? "row_sizes" : "col_sizes";
    return I4(e[l]) && (a[l] = ah(
      e[l],
      o
    )), M(M({}, e), a);
  }
  function gE(e, t) {
    const n = ng(e);
    return P4(n, t);
  }
  function I4(e) {
    return Array.isArray(e) && e.length > 1;
  }
  function P4(e, { index: t, dir: n }) {
    let r = [];
    return e.forEach((i, o) => {
      const a = uh(i, n);
      if (!a)
        return;
      const { itemStart: l, itemEnd: s } = a;
      l === t && l === s && r.push(o);
    }), r;
  }
  function _4(e, t, n) {
    return mi(e, ({ areas: r }) => {
      const { numRows: i, numCols: o } = ca(r);
      for (let a = 0; a < i; a++)
        for (let l = 0; l < o; l++)
          r[a][l] === t && (r[a][l] = n);
    });
  }
  function N4(e, { index: t, dir: n }, r) {
    return mi(e, (i) => {
      const o = n === "rows" ? "row_sizes" : "col_sizes";
      i[o][t - 1] = r;
    });
  }
  function D4(e, { item_a: t, item_b: n }) {
    return t === n ? e : mi(e, (r) => {
      const { n_rows: i, n_cols: o } = R4(r.areas);
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
  function R4(e) {
    const t = e.length, n = e[0].length;
    return { n_rows: t, n_cols: n };
  }
  function L4({
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
        f !== Un && a.add(f);
      });
      const c = u.length;
      if (i === -1 && (i = c), i !== c)
        throw new Error(
          "Invalid layout definition. Not consistant number of columns in every row"
        );
    }
    if (!n)
      n = jl("1fr", i);
    else if (n.length !== i)
      throw new Error("Column sizes vector doesn't match layout definition.");
    if (!t)
      t = jl("1fr", o);
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
  function F4(e) {
    const t = [];
    for (let n of e)
      t.push(n.trim().split(/\s+/));
    return t;
  }
  function vE(n) {
    var r = n, {
      areas: e
    } = r, t = it(r, [
      "areas"
    ]);
    return M({
      layout: B4(e)
    }, t);
  }
  function M4(n) {
    var r = n, {
      layout: e
    } = r, t = it(r, [
      "layout"
    ]);
    return M({
      areas: F4(e)
    }, t);
  }
  function B4(e) {
    const { numCols: t } = ca(e), n = [], r = jl(-1, t);
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
  function rg(e, t) {
    const n = M4(e);
    return vE(
      U4(n, t)
    );
  }
  function U4(e, t) {
    const n = e;
    switch (t.type) {
      case "ADD_ITEM":
      case "MOVE_ITEM":
        return x4(n, M({ name: t.name }, t.pos));
      case "RENAME_ITEM":
        return _4(n, t.oldName, t.newName);
      case "REMOVE_ITEM":
        return T4(n, t.name);
      case "REMOVE_ITEMS":
        return hE(n, t.names);
      case "SWAP_ITEMS":
        return D4(n, t);
      case "ADD_TRACT":
        return dE(n, t);
      case "REMOVE_TRACT":
        return mE(n, t);
      case "RESIZE_TRACT":
        return N4(
          n,
          { dir: t.dir, index: t.index },
          t.size
        );
      case "SET_GAP":
        return Q(M({}, cf(n)), { gap_size: t.size });
      default:
        throw console.error(t), new Error("Have yet to implement layout action type");
    }
  }
  function ig(e) {
    return e.uiChildren !== void 0;
  }
  function gi(e, t) {
    let n = e, r;
    for (r of t) {
      if (!ig(n))
        throw new Error("Somehow trying to enter a leaf node");
      n = n.uiChildren[r];
    }
    return n;
  }
  function yE(e) {
    return e.slice(0, e.length - 1);
  }
  function z4(e) {
    return e[e.length - 1];
  }
  function W4(e) {
    let t = [];
    return e.forEach((n) => {
      if ("area" in n.uiArguments && n.uiArguments.area !== void 0) {
        const r = n.uiArguments.area;
        t.push(r);
      }
    }), t;
  }
  const j4 = [
    "gridlayout::grid_page",
    "gridlayout::grid_container"
  ];
  function Y4(e) {
    return j4.includes(e.uiName);
  }
  function wE(e, { path: t, node: n }) {
    var l;
    const r = SE({
      tree: e,
      pathToGridItem: t
    });
    if (r === null)
      return;
    const { gridPageNode: i } = r, o = W4(i.uiChildren)[z4(t)], a = (l = n.uiArguments.area) != null ? l : Un;
    o !== a && (i.uiArguments = rg(i.uiArguments, {
      type: "RENAME_ITEM",
      oldName: o,
      newName: a
    }));
  }
  function bE(e, { path: t }) {
    const n = SE({
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
    r.uiArguments = rg(r.uiArguments, {
      type: "REMOVE_ITEM",
      name: o
    });
  }
  function SE({
    tree: e,
    pathToGridItem: t
  }) {
    if (t.length === 0)
      return null;
    const n = gi(e, t.slice(0, -1));
    if (!Y4(n))
      return null;
    const r = n.uiChildren[t[t.length - 1]];
    return "area" in r.uiArguments ? {
      gridPageNode: n,
      gridItemNode: r
    } : null;
  }
  function V4(e, t) {
    const { numRows: n, numCols: r } = ca(e), i = [];
    for (let o = 0; o < n; o++)
      for (let a = 0; a < r; a++)
        e[o][a] === t && i.push({ row: o + 1, col: a + 1 });
    return i;
  }
  function G4(e) {
    return V4(e, Un);
  }
  function H4(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 640 512" }, child: [{ tag: "path", attr: { d: "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" } }] })(e);
  }
  function $4(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" } }] })(e);
  }
  function $y(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 256 512" }, child: [{ tag: "path", attr: { d: "M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z" } }] })(e);
  }
  function Jy(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" } }] })(e);
  }
  function og(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" } }] })(e);
  }
  function J4({
    gridLocation: { rowStart: e, rowSpan: t, colStart: n, colSpan: r },
    layoutAreas: i
  }) {
    const o = e + t - 1, a = n + r - 1, l = nc(e, o), s = nc(n, a), u = t > 1, c = r > 1, f = [];
    return (Qy({
      colRange: s,
      rowIndex: e - 1,
      layoutAreas: i
    }) || u) && f.push("up"), (Qy({
      colRange: s,
      rowIndex: o + 1,
      layoutAreas: i
    }) || u) && f.push("down"), (Ky({
      rowRange: l,
      colIndex: n - 1,
      layoutAreas: i
    }) || c) && f.push("left"), (Ky({
      rowRange: l,
      colIndex: a + 1,
      layoutAreas: i
    }) || c) && f.push("right"), f;
  }
  function Qy({
    colRange: e,
    rowIndex: t,
    layoutAreas: n
  }) {
    return t < 1 || t > n.length ? !1 : e.every(
      (r) => n[t - 1][r - 1] === Un
    );
  }
  function Ky({
    rowRange: e,
    colIndex: t,
    layoutAreas: n
  }) {
    return t < 1 || t > n[0].length ? !1 : e.every(
      (r) => n[r - 1][t - 1] === Un
    );
  }
  const Q4 = "_marker_mumaw_1", K4 = "_dragger_mumaw_32", X4 = "_move_mumaw_52", Xy = {
    marker: Q4,
    dragger: K4,
    move: X4
  };
  function Yl({
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
  function q4(e, t) {
    return typeof e == "undefined" && typeof t == "undefined" ? !0 : typeof e == "undefined" || typeof t == "undefined" ? !1 : ("colSpan" in e && (e = Yl(e)), "colSpan" in t && (t = Yl(t)), e.colStart === t.colStart && e.colEnd === t.colEnd && e.rowStart === t.rowStart && e.rowEnd === t.rowEnd);
  }
  function Z4({
    row: e,
    col: t
  }) {
    return `row${e}-col${t}`;
  }
  function e3({
    dragDirection: e,
    gridLocation: t,
    layoutAreas: n
  }) {
    const { rowStart: r, rowEnd: i, colStart: o, colEnd: a } = Yl(t), l = n.length, s = n[0].length;
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
    const p = e === "up" || e === "down", d = e === "left" || e === "up", [h, m] = p ? [o, a] : [r, i], S = (w, E) => {
      const [O, b] = p ? [w, E] : [E, w];
      return n[O - 1][b - 1] !== Un;
    }, g = nc(h, m), v = nc(u, c);
    for (let w of v)
      for (let E of g)
        if (S(w, E))
          return {
            shrinkExtent: f,
            growExtent: w + (d ? 1 : -1)
          };
    return { shrinkExtent: f, growExtent: c };
  }
  function EE(e, t, n) {
    const r = t < n ? t : n, i = t < n ? n : t;
    return e >= r && e <= i;
  }
  function t3({
    dir: e,
    gridContainerStyles: t,
    gridContainerBoundingRect: n
  }) {
    const r = ch(t.getPropertyValue("gap")), o = ch(t.getPropertyValue("padding")) + r / 2, a = n[e === "rows" ? "y" : "x"], l = n3(t, e), s = l.length, u = [];
    for (let c = 0; c < l.length; c++) {
      const f = c === 0, p = f ? a : u[c - 1].end, d = f || c === s - 1, h = l[c] + (d ? o : r);
      u.push({
        // tracts are indexed starting at 1 to match how css indexes tracts
        index: c + 1,
        start: p,
        end: p + h
      });
    }
    return u;
  }
  function n3(e, t) {
    return e.getPropertyValue(
      t === "rows" ? "grid-template-rows" : "grid-template-columns"
    ).split(" ").map(ch);
  }
  function ch(e) {
    return Number(e.replaceAll("px", ""));
  }
  function r3({
    mousePos: e,
    dragState: t
  }) {
    const { dragHandle: n, tractExtents: r, gridItemExtent: i } = t, o = e[n === "down" || n === "up" ? "y" : "x"], a = r.find(
      ({ start: s, end: u }) => EE(o, s, u)
    );
    if (a === void 0)
      return;
    const l = i3[n];
    return i[l] = a.index, i;
  }
  const i3 = {
    right: "colEnd",
    left: "colStart",
    up: "rowStart",
    down: "rowEnd"
  };
  function o3({
    overlayRef: e,
    gridLocation: t,
    layoutAreas: n,
    onDragEnd: r
  }) {
    const i = Yl(t), o = k.useRef(null), a = k.useCallback(
      (u) => {
        const c = e.current, f = o.current;
        if (!c || !f)
          throw new Error(
            "For some reason we are observing dragging when we shouldn't"
          );
        const p = r3({ mousePos: u, dragState: f });
        p && Zy(c, p);
      },
      [e]
    ), l = k.useCallback(() => {
      const u = e.current, c = o.current;
      if (!u || !c)
        return;
      const f = c.gridItemExtent;
      q4(f, i) || r(f), u.classList.remove("dragging"), document.removeEventListener("mousemove", a), qy("on");
    }, [i, a, r, e]);
    return k.useCallback(
      (u) => {
        const c = e.current;
        if (!c)
          return;
        const f = c.parentElement;
        if (!f)
          return;
        const p = getComputedStyle(c.parentElement), d = f.getBoundingClientRect(), h = u === "down" || u === "up" ? "rows" : "cols", { shrinkExtent: m, growExtent: S } = e3({
          dragDirection: u,
          gridLocation: t,
          layoutAreas: n
        });
        o.current = {
          dragHandle: u,
          gridItemExtent: Yl(t),
          tractExtents: t3({
            dir: h,
            gridContainerStyles: p,
            gridContainerBoundingRect: d
          }).filter(({ index: g }) => EE(g, m, S))
        }, Zy(e.current, o.current.gridItemExtent), c.classList.add("dragging"), document.addEventListener("mousemove", a), document.addEventListener("mouseup", l, { once: !0 }), qy("off");
      },
      [l, t, n, a, e]
    );
  }
  function qy(e) {
    var n;
    const t = (n = document.querySelector("body")) == null ? void 0 : n.classList;
    e === "off" ? t == null || t.add("disable-text-selection") : t == null || t.remove("disable-text-selection");
  }
  function Zy(e, { rowStart: t, rowEnd: n, colStart: r, colEnd: i }) {
    e.style.setProperty("--drag-grid-row-start", String(t)), e.style.setProperty("--drag-grid-row-end", String(n + 1)), e.style.setProperty("--drag-grid-column-start", String(r)), e.style.setProperty("--drag-grid-column-end", String(i + 1));
  }
  function a3({
    area: e,
    gridLocation: t,
    areas: n,
    onNewPos: r
  }) {
    if (typeof t == "undefined")
      throw new Error(`Item in ${e} is not in the location map`);
    const i = k.useRef(null), o = o3({
      overlayRef: i,
      gridLocation: t,
      layoutAreas: n,
      onDragEnd: r
    }), a = k.useMemo(
      () => J4({ gridLocation: t, layoutAreas: n }),
      [t, n]
    ), l = k.useMemo(() => {
      let s = [];
      for (let u of a)
        s.push(
          /* @__PURE__ */ y(
            "div",
            {
              className: Wt(Xy.dragger, u),
              title: `resize ${e} ${u}`,
              onMouseDown: (c) => {
                e1(c), o(u);
              },
              children: l3[u]
            },
            u
          )
        );
      return s;
    }, [e, a, o]);
    return k.useEffect(() => {
      var s;
      (s = i.current) == null || s.style.setProperty("--grid-area", e);
    }, [e]), /* @__PURE__ */ y(
      "div",
      {
        ref: i,
        onClick: e1,
        className: Xy.marker + " grid-area-overlay",
        children: l
      }
    );
  }
  function e1(e) {
    e.preventDefault(), e.stopPropagation();
  }
  const l3 = {
    up: /* @__PURE__ */ y(Jy, {}),
    down: /* @__PURE__ */ y(Jy, {}),
    left: /* @__PURE__ */ y($y, {}),
    right: /* @__PURE__ */ y($y, {})
  }, s3 = "_ResizableGrid_i4cq9_1", u3 = {
    ResizableGrid: s3,
    "size-detection-cell": "_size-detection-cell_i4cq9_1"
  }, c3 = /(^[\d|.]+)\s*(px|%|rem|fr)|(^auto$)/;
  function f3(e) {
    return c3.test(e);
  }
  const p3 = /(px|%|rem|fr|auto)/g, d3 = /^[\d|.]*/g;
  function rc(e) {
    var i, o;
    const t = ((i = e.match(p3)) == null ? void 0 : i[0]) || "px", n = (o = e.match(d3)) == null ? void 0 : o[0], r = n ? Number(n) : null;
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
  function Ra(e) {
    return e.unit === "auto" ? "auto" : `${e.count}${e.unit}`;
  }
  const t1 = ["http", "https", "mailto", "tel"];
  function h3(e) {
    const t = (e || "").trim(), n = t.charAt(0);
    if (n === "#" || n === "/")
      return t;
    const r = t.indexOf(":");
    if (r === -1)
      return t;
    let i = -1;
    for (; ++i < t1.length; ) {
      const o = t1[i];
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
  var AE = function(t) {
    return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
  };
  function ul(e) {
    return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? n1(e.position) : "start" in e || "end" in e ? n1(e) : "line" in e || "column" in e ? fh(e) : "";
  }
  function fh(e) {
    return r1(e && e.line) + ":" + r1(e && e.column);
  }
  function n1(e) {
    return fh(e && e.start) + "-" + fh(e && e.end);
  }
  function r1(e) {
    return e && typeof e == "number" ? e : 1;
  }
  class Sn extends Error {
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
      n && ("type" in n || "position" in n ? n.position && (o = n.position) : "start" in n || "end" in n ? o = n : ("line" in n || "column" in n) && (o.start = n)), this.name = ul(n) || "1:1", this.message = typeof t == "object" ? t.message : t, this.stack = "", typeof t == "object" && t.stack && (this.stack = t.stack), this.reason = this.message, this.fatal, this.line = o.start.line, this.column = o.start.column, this.position = o, this.source = i[0], this.ruleId = i[1], this.file, this.actual, this.expected, this.url, this.note;
    }
  }
  Sn.prototype.file = "";
  Sn.prototype.name = "";
  Sn.prototype.reason = "";
  Sn.prototype.message = "";
  Sn.prototype.stack = "";
  Sn.prototype.fatal = null;
  Sn.prototype.column = null;
  Sn.prototype.line = null;
  Sn.prototype.source = null;
  Sn.prototype.ruleId = null;
  Sn.prototype.position = null;
  const Gn = { basename: m3, dirname: g3, extname: v3, join: y3, sep: "/" };
  function m3(e, t) {
    if (t !== void 0 && typeof t != "string")
      throw new TypeError('"ext" argument must be a string');
    us(e);
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
  function g3(e) {
    if (us(e), e.length === 0)
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
  function v3(e) {
    us(e);
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
  function y3(...e) {
    let t = -1, n;
    for (; ++t < e.length; )
      us(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
    return n === void 0 ? "." : w3(n);
  }
  function w3(e) {
    us(e);
    const t = e.charCodeAt(0) === 47;
    let n = b3(e, !t);
    return n.length === 0 && !t && (n = "."), n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
  }
  function b3(e, t) {
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
  function us(e) {
    if (typeof e != "string")
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(e)
      );
  }
  const S3 = { cwd: E3 };
  function E3() {
    return "/";
  }
  function ph(e) {
    return e !== null && typeof e == "object" && // @ts-expect-error: indexable.
    e.href && // @ts-expect-error: indexable.
    e.origin;
  }
  function A3(e) {
    if (typeof e == "string")
      e = new URL(e);
    else if (!ph(e)) {
      const t = new TypeError(
        'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
      );
      throw t.code = "ERR_INVALID_ARG_TYPE", t;
    }
    if (e.protocol !== "file:") {
      const t = new TypeError("The URL must be of scheme file");
      throw t.code = "ERR_INVALID_URL_SCHEME", t;
    }
    return C3(e);
  }
  function C3(e) {
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
  const Ep = ["history", "path", "basename", "stem", "extname", "dirname"];
  class CE {
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
      t ? typeof t == "string" || x3(t) ? n = { value: t } : ph(t) ? n = { path: t } : n = t : n = {}, this.data = {}, this.messages = [], this.history = [], this.cwd = S3.cwd(), this.value, this.stored, this.result, this.map;
      let r = -1;
      for (; ++r < Ep.length; ) {
        const o = Ep[r];
        o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
      }
      let i;
      for (i in n)
        Ep.includes(i) || (this[i] = n[i]);
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
      ph(t) && (t = A3(t)), Cp(t, "path"), this.path !== t && this.history.push(t);
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
      i1(this.basename, "dirname"), this.path = Gn.join(t || "", this.basename);
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
      Cp(t, "basename"), Ap(t, "basename"), this.path = Gn.join(this.dirname || "", t);
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
      if (Ap(t, "extname"), i1(this.dirname, "extname"), t) {
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
      Cp(t, "stem"), Ap(t, "stem"), this.path = Gn.join(this.dirname || "", t + (this.extname || ""));
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
      const i = new Sn(t, n, r);
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
  function Ap(e, t) {
    if (e && e.includes(Gn.sep))
      throw new Error(
        "`" + t + "` cannot be a path: did not expect `" + Gn.sep + "`"
      );
  }
  function Cp(e, t) {
    if (!e)
      throw new Error("`" + t + "` cannot be empty");
  }
  function i1(e, t) {
    if (!e)
      throw new Error("Setting `" + t + "` requires `path` to be set too");
  }
  function x3(e) {
    return AE(e);
  }
  function o1(e) {
    if (e)
      throw e;
  }
  var fu = Object.prototype.hasOwnProperty, xE = Object.prototype.toString, a1 = Object.defineProperty, l1 = Object.getOwnPropertyDescriptor, s1 = function(t) {
    return typeof Array.isArray == "function" ? Array.isArray(t) : xE.call(t) === "[object Array]";
  }, u1 = function(t) {
    if (!t || xE.call(t) !== "[object Object]")
      return !1;
    var n = fu.call(t, "constructor"), r = t.constructor && t.constructor.prototype && fu.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r)
      return !1;
    var i;
    for (i in t)
      ;
    return typeof i == "undefined" || fu.call(t, i);
  }, c1 = function(t, n) {
    a1 && n.name === "__proto__" ? a1(t, n.name, {
      enumerable: !0,
      configurable: !0,
      value: n.newValue,
      writable: !0
    }) : t[n.name] = n.newValue;
  }, f1 = function(t, n) {
    if (n === "__proto__")
      if (fu.call(t, n)) {
        if (l1)
          return l1(t, n).value;
      } else
        return;
    return t[n];
  }, p1 = function e() {
    var t, n, r, i, o, a, l = arguments[0], s = 1, u = arguments.length, c = !1;
    for (typeof l == "boolean" && (c = l, l = arguments[1] || {}, s = 2), (l == null || typeof l != "object" && typeof l != "function") && (l = {}); s < u; ++s)
      if (t = arguments[s], t != null)
        for (n in t)
          r = f1(l, n), i = f1(t, n), l !== i && (c && i && (u1(i) || (o = s1(i))) ? (o ? (o = !1, a = r && s1(r) ? r : []) : a = r && u1(r) ? r : {}, c1(l, { name: n, newValue: e(c, a, i) })) : typeof i != "undefined" && c1(l, { name: n, newValue: i }));
    return l;
  };
  function dh(e) {
    if (typeof e != "object" || e === null)
      return !1;
    const t = Object.getPrototypeOf(e);
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
  }
  function k3() {
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
        i = u, c ? O3(c, l)(...u) : a(null, ...u);
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
  function O3(e, t) {
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
  const T3 = OE().freeze(), kE = {}.hasOwnProperty;
  function OE() {
    const e = k3(), t = [];
    let n = {}, r, i = -1;
    return o.data = a, o.Parser = void 0, o.Compiler = void 0, o.freeze = l, o.attachers = t, o.use = s, o.parse = u, o.stringify = c, o.run = f, o.runSync = p, o.process = d, o.processSync = h, o;
    function o() {
      const m = OE();
      let S = -1;
      for (; ++S < t.length; )
        m.use(...t[S]);
      return m.data(p1(!0, {}, n)), m;
    }
    function a(m, S) {
      return typeof m == "string" ? arguments.length === 2 ? (Op("data", r), n[m] = S, o) : kE.call(n, m) && n[m] || null : m ? (Op("data", r), n = m, o) : n;
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
      if (Op("use", r), m != null)
        if (typeof m == "function")
          O(m, ...S);
        else if (typeof m == "object")
          Array.isArray(m) ? E(m) : w(m);
        else
          throw new TypeError("Expected usable value, not `" + m + "`");
      return g && (n.settings = Object.assign(n.settings || {}, g)), o;
      function v(b) {
        if (typeof b == "function")
          O(b);
        else if (typeof b == "object")
          if (Array.isArray(b)) {
            const [A, ...T] = b;
            O(A, ...T);
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
              const T = b[A];
              v(T);
            }
          else
            throw new TypeError("Expected a list of plugins, not `" + b + "`");
      }
      function O(b, A) {
        let T = -1, P;
        for (; ++T < t.length; )
          if (t[T][0] === b) {
            P = t[T];
            break;
          }
        P ? (dh(P[1]) && dh(A) && (A = p1(!0, P[1], A)), P[1] = A) : t.push([...arguments]);
      }
    }
    function u(m) {
      o.freeze();
      const S = La(m), g = o.Parser;
      return xp("parse", g), d1(g, "parse") ? new g(String(S), S).parse() : g(String(S), S);
    }
    function c(m, S) {
      o.freeze();
      const g = La(S), v = o.Compiler;
      return kp("stringify", v), h1(m), d1(v, "compile") ? new v(m, g).compile() : v(m, g);
    }
    function f(m, S, g) {
      if (h1(m), o.freeze(), !g && typeof S == "function" && (g = S, S = void 0), !g)
        return new Promise(v);
      v(null, g);
      function v(w, E) {
        e.run(m, La(S), O);
        function O(b, A, T) {
          A = A || m, b ? E(b) : w ? w(A) : g(null, A, T);
        }
      }
    }
    function p(m, S) {
      let g, v;
      return o.run(m, S, w), m1("runSync", "run", v), g;
      function w(E, O) {
        o1(E), g = O, v = !0;
      }
    }
    function d(m, S) {
      if (o.freeze(), xp("process", o.Parser), kp("process", o.Compiler), !S)
        return new Promise(g);
      g(null, S);
      function g(v, w) {
        const E = La(m);
        o.run(o.parse(E), E, (b, A, T) => {
          if (b || !A || !T)
            O(b);
          else {
            const P = o.stringify(A, T);
            P == null || (_3(P) ? T.value = P : T.result = P), O(b, T);
          }
        });
        function O(b, A) {
          b || !A ? w(b) : v ? v(A) : S(null, A);
        }
      }
    }
    function h(m) {
      let S;
      o.freeze(), xp("processSync", o.Parser), kp("processSync", o.Compiler);
      const g = La(m);
      return o.process(g, v), m1("processSync", "process", S), g;
      function v(w) {
        S = !0, o1(w);
      }
    }
  }
  function d1(e, t) {
    return typeof e == "function" && // Prototypes do exist.
    // type-coverage:ignore-next-line
    e.prototype && // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    // type-coverage:ignore-next-line
    (I3(e.prototype) || t in e.prototype);
  }
  function I3(e) {
    let t;
    for (t in e)
      if (kE.call(e, t))
        return !0;
    return !1;
  }
  function xp(e, t) {
    if (typeof t != "function")
      throw new TypeError("Cannot `" + e + "` without `Parser`");
  }
  function kp(e, t) {
    if (typeof t != "function")
      throw new TypeError("Cannot `" + e + "` without `Compiler`");
  }
  function Op(e, t) {
    if (t)
      throw new Error(
        "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
      );
  }
  function h1(e) {
    if (!dh(e) || typeof e.type != "string")
      throw new TypeError("Expected node, got `" + e + "`");
  }
  function m1(e, t, n) {
    if (!n)
      throw new Error(
        "`" + e + "` finished async. Use `" + t + "` instead"
      );
  }
  function La(e) {
    return P3(e) ? e : new CE(e);
  }
  function P3(e) {
    return Boolean(
      e && typeof e == "object" && "message" in e && "messages" in e
    );
  }
  function _3(e) {
    return typeof e == "string" || AE(e);
  }
  function N3(e, t) {
    const n = (t || {}).includeImageAlt;
    return TE(
      e,
      typeof n == "boolean" ? n : !0
    );
  }
  function TE(e, t) {
    return D3(e) && ("value" in e && e.value || t && "alt" in e && e.alt || "children" in e && g1(e.children, t)) || Array.isArray(e) && g1(e, t) || "";
  }
  function g1(e, t) {
    const n = [];
    let r = -1;
    for (; ++r < e.length; )
      n[r] = TE(e[r], t);
    return n.join("");
  }
  function D3(e) {
    return Boolean(e && typeof e == "object");
  }
  function rr(e, t, n, r) {
    const i = e.length;
    let o = 0, a;
    if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
      a = Array.from(r), a.unshift(t, n), [].splice.apply(e, a);
    else
      for (n && [].splice.apply(e, [t, n]); o < r.length; )
        a = r.slice(o, o + 1e4), a.unshift(t, 0), [].splice.apply(e, a), o += 1e4, t += 1e4;
  }
  function un(e, t) {
    return e.length > 0 ? (rr(e, e.length, 0, t), e) : t;
  }
  const v1 = {}.hasOwnProperty;
  function R3(e) {
    const t = {};
    let n = -1;
    for (; ++n < e.length; )
      L3(t, e[n]);
    return t;
  }
  function L3(e, t) {
    let n;
    for (n in t) {
      const i = (v1.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
      let a;
      for (a in o) {
        v1.call(i, a) || (i[a] = []);
        const l = o[a];
        F3(
          // @ts-expect-error Looks like a list.
          i[a],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
    }
  }
  function F3(e, t) {
    let n = -1;
    const r = [];
    for (; ++n < t.length; )
      (t[n].add === "after" ? e : r).push(t[n]);
    rr(e, 0, 0, r);
  }
  const M3 = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, Qn = vi(/[A-Za-z]/), hh = vi(/\d/), B3 = vi(/[\dA-Fa-f]/), Xt = vi(/[\dA-Za-z]/), U3 = vi(/[!-/:-@[-`{-~]/), y1 = vi(/[#-'*+\--9=?A-Z^-~]/);
  function mh(e) {
    return (
      // Special whitespace codes (which have negative values), C0 and Control
      // character DEL
      e !== null && (e < 32 || e === 127)
    );
  }
  function dn(e) {
    return e !== null && (e < 0 || e === 32);
  }
  function re(e) {
    return e !== null && e < -2;
  }
  function qe(e) {
    return e === -2 || e === -1 || e === 32;
  }
  const z3 = vi(/\s/), W3 = vi(M3);
  function vi(e) {
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
      return qe(s) ? (e.enter(n), l(s)) : t(s);
    }
    function l(s) {
      return qe(s) && o++ < i ? (e.consume(s), l) : (e.exit(n), t(s));
    }
  }
  const j3 = {
    tokenize: Y3
  };
  function Y3(e) {
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
  const V3 = {
    tokenize: G3
  }, w1 = {
    tokenize: H3
  };
  function G3(e) {
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
        let O = E, b;
        for (; O--; )
          if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
            b = t.events[O][1].end;
            break;
          }
        g(r);
        let A = E;
        for (; A < t.events.length; )
          t.events[A][1].end = Object.assign({}, b), A++;
        return rr(
          t.events,
          O + 1,
          0,
          t.events.slice(E)
        ), t.events.length = A, u(w);
      }
      return l(w);
    }
    function u(w) {
      if (r === n.length) {
        if (!i)
          return p(w);
        if (i.currentConstruct && i.currentConstruct.concrete)
          return h(w);
        t.interrupt = Boolean(
          i.currentConstruct && !i._gfmTableDynamicInterruptHack
        );
      }
      return t.containerState = {}, e.check(
        w1,
        c,
        f
      )(w);
    }
    function c(w) {
      return i && v(), g(r), p(w);
    }
    function f(w) {
      return t.parser.lazy[t.now().line] = r !== n.length, a = t.now().offset, h(w);
    }
    function p(w) {
      return t.containerState = {}, e.attempt(
        w1,
        d,
        h
      )(w);
    }
    function d(w) {
      return r++, n.push([t.currentConstruct, t.containerState]), p(w);
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
      const O = t.sliceStream(w);
      if (E && O.push(null), w.previous = o, o && (o.next = w), o = w, i.defineSkip(w.start), i.write(O), t.parser.lazy[w.start.line]) {
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
        let T = A, P, _;
        for (; T--; )
          if (t.events[T][0] === "exit" && t.events[T][1].type === "chunkFlow") {
            if (P) {
              _ = t.events[T][1].end;
              break;
            }
            P = !0;
          }
        for (g(r), b = A; b < t.events.length; )
          t.events[b][1].end = Object.assign({}, _), b++;
        rr(
          t.events,
          T + 1,
          0,
          t.events.slice(A)
        ), t.events.length = b;
      }
    }
    function g(w) {
      let E = n.length;
      for (; E-- > w; ) {
        const O = n[E];
        t.containerState = O[1], O[0].exit.call(t, e);
      }
      n.length = w;
    }
    function v() {
      i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
    }
  }
  function H3(e, t, n) {
    return Ce(
      e,
      e.attempt(this.parser.constructs.document, t, n),
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function b1(e) {
    if (e === null || dn(e) || z3(e))
      return 1;
    if (W3(e))
      return 2;
  }
  function ag(e, t, n) {
    const r = [];
    let i = -1;
    for (; ++i < e.length; ) {
      const o = e[i].resolveAll;
      o && !r.includes(o) && (t = o(t, n), r.push(o));
    }
    return t;
  }
  const gh = {
    name: "attention",
    tokenize: J3,
    resolveAll: $3
  };
  function $3(e, t) {
    let n = -1, r, i, o, a, l, s, u, c;
    for (; ++n < e.length; )
      if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
        for (r = n; r--; )
          if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
          t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
            if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
              continue;
            s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
            const f = Object.assign({}, e[r][1].end), p = Object.assign({}, e[n][1].start);
            S1(f, -s), S1(p, s), a = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: f,
              end: Object.assign({}, e[r][1].end)
            }, l = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, e[n][1].start),
              end: p
            }, o = {
              type: s > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, e[r][1].end),
              end: Object.assign({}, e[n][1].start)
            }, i = {
              type: s > 1 ? "strong" : "emphasis",
              start: Object.assign({}, a.start),
              end: Object.assign({}, l.end)
            }, e[r][1].end = Object.assign({}, a.start), e[n][1].start = Object.assign({}, l.end), u = [], e[r][1].end.offset - e[r][1].start.offset && (u = un(u, [
              ["enter", e[r][1], t],
              ["exit", e[r][1], t]
            ])), u = un(u, [
              ["enter", i, t],
              ["enter", a, t],
              ["exit", a, t],
              ["enter", o, t]
            ]), u = un(
              u,
              ag(
                t.parser.constructs.insideSpan.null,
                e.slice(r + 1, n),
                t
              )
            ), u = un(u, [
              ["exit", o, t],
              ["enter", l, t],
              ["exit", l, t],
              ["exit", i, t]
            ]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = un(u, [
              ["enter", e[n][1], t],
              ["exit", e[n][1], t]
            ])) : c = 0, rr(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
            break;
          }
      }
    for (n = -1; ++n < e.length; )
      e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
    return e;
  }
  function J3(e, t) {
    const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = b1(r);
    let o;
    return a;
    function a(s) {
      return e.enter("attentionSequence"), o = s, l(s);
    }
    function l(s) {
      if (s === o)
        return e.consume(s), l;
      const u = e.exit("attentionSequence"), c = b1(s), f = !c || c === 2 && i || n.includes(s), p = !i || i === 2 && c || n.includes(r);
      return u._open = Boolean(o === 42 ? f : f && (i || !p)), u._close = Boolean(o === 42 ? p : p && (c || !f)), t(s);
    }
  }
  function S1(e, t) {
    e.column += t, e.offset += t, e._bufferIndex += t;
  }
  const Q3 = {
    name: "autolink",
    tokenize: K3
  };
  function K3(e, t, n) {
    let r = 1;
    return i;
    function i(h) {
      return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
    }
    function o(h) {
      return Qn(h) ? (e.consume(h), a) : y1(h) ? u(h) : n(h);
    }
    function a(h) {
      return h === 43 || h === 45 || h === 46 || Xt(h) ? l(h) : u(h);
    }
    function l(h) {
      return h === 58 ? (e.consume(h), s) : (h === 43 || h === 45 || h === 46 || Xt(h)) && r++ < 32 ? (e.consume(h), l) : u(h);
    }
    function s(h) {
      return h === 62 ? (e.exit("autolinkProtocol"), d(h)) : h === null || h === 32 || h === 60 || mh(h) ? n(h) : (e.consume(h), s);
    }
    function u(h) {
      return h === 64 ? (e.consume(h), r = 0, c) : y1(h) ? (e.consume(h), u) : n(h);
    }
    function c(h) {
      return Xt(h) ? f(h) : n(h);
    }
    function f(h) {
      return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", d(h)) : p(h);
    }
    function p(h) {
      return (h === 45 || Xt(h)) && r++ < 63 ? (e.consume(h), h === 45 ? p : f) : n(h);
    }
    function d(h) {
      return e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t;
    }
  }
  const ff = {
    tokenize: X3,
    partial: !0
  };
  function X3(e, t, n) {
    return Ce(e, r, "linePrefix");
    function r(i) {
      return i === null || re(i) ? t(i) : n(i);
    }
  }
  const IE = {
    name: "blockQuote",
    tokenize: q3,
    continuation: {
      tokenize: Z3
    },
    exit: eN
  };
  function q3(e, t, n) {
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
      return qe(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(a));
    }
  }
  function Z3(e, t, n) {
    return Ce(
      e,
      e.attempt(IE, t, n),
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function eN(e) {
    e.exit("blockQuote");
  }
  const PE = {
    name: "characterEscape",
    tokenize: tN
  };
  function tN(e, t, n) {
    return r;
    function r(o) {
      return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
    }
    function i(o) {
      return U3(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
    }
  }
  const E1 = document.createElement("i");
  function lg(e) {
    const t = "&" + e + ";";
    E1.innerHTML = t;
    const n = E1.textContent;
    return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
  }
  const _E = {
    name: "characterReference",
    tokenize: nN
  };
  function nN(e, t, n) {
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
      return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, a = B3, c) : (e.enter("characterReferenceValue"), o = 7, a = hh, c(f));
    }
    function c(f) {
      let p;
      return f === 59 && i ? (p = e.exit("characterReferenceValue"), a === Xt && !lg(r.sliceSerialize(p)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t)) : a(f) && i++ < o ? (e.consume(f), c) : n(f);
    }
  }
  const A1 = {
    name: "codeFenced",
    tokenize: rN,
    concrete: !0
  };
  function rN(e, t, n) {
    const r = this, i = {
      tokenize: O,
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
      return b === u ? (e.consume(b), s++, f) : (e.exit("codeFencedFenceSequence"), s < 3 ? n(b) : Ce(e, p, "whitespace")(b));
    }
    function p(b) {
      return b === null || re(b) ? S(b) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
        contentType: "string"
      }), d(b));
    }
    function d(b) {
      return b === null || dn(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Ce(e, h, "whitespace")(b)) : b === 96 && b === u ? n(b) : (e.consume(b), d);
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
    function E(b, A, T) {
      const P = this;
      return _;
      function _(F) {
        return b.enter("lineEnding"), b.consume(F), b.exit("lineEnding"), I;
      }
      function I(F) {
        return P.parser.lazy[P.now().line] ? T(F) : A(F);
      }
    }
    function O(b, A, T) {
      let P = 0;
      return Ce(
        b,
        _,
        "linePrefix",
        this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      );
      function _(U) {
        return b.enter("codeFencedFence"), b.enter("codeFencedFenceSequence"), I(U);
      }
      function I(U) {
        return U === u ? (b.consume(U), P++, I) : P < s ? T(U) : (b.exit("codeFencedFenceSequence"), Ce(b, F, "whitespace")(U));
      }
      function F(U) {
        return U === null || re(U) ? (b.exit("codeFencedFence"), A(U)) : T(U);
      }
    }
  }
  const Tp = {
    name: "codeIndented",
    tokenize: oN
  }, iN = {
    tokenize: aN,
    partial: !0
  };
  function oN(e, t, n) {
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
      return u === null ? s(u) : re(u) ? e.attempt(iN, a, s)(u) : (e.enter("codeFlowValue"), l(u));
    }
    function l(u) {
      return u === null || re(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), l);
    }
    function s(u) {
      return e.exit("codeIndented"), t(u);
    }
  }
  function aN(e, t, n) {
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
  const lN = {
    name: "codeText",
    tokenize: cN,
    resolve: sN,
    previous: uN
  };
  function sN(e) {
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
  function uN(e) {
    return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function cN(e, t, n) {
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
  function NE(e) {
    const t = {};
    let n = -1, r, i, o, a, l, s, u;
    for (; ++n < e.length; ) {
      for (; n in t; )
        n = t[n];
      if (r = e[n], n && r[1].type === "chunkFlow" && e[n - 1][1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
        for (; ++o < s.length && s[o][1].type !== "content"; )
          s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
      if (r[0] === "enter")
        r[1].contentType && (Object.assign(t, fN(e, n)), n = t[n], u = !0);
      else if (r[1]._container) {
        for (o = n, i = void 0; o-- && (a = e[o], a[1].type === "lineEnding" || a[1].type === "lineEndingBlank"); )
          a[0] === "enter" && (i && (e[i][1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = o);
        i && (r[1].end = Object.assign({}, e[i][1].start), l = e.slice(i, n), l.unshift(r), rr(e, i, n - i + 1, l));
      }
    }
    return !u;
  }
  function fN(e, t) {
    const n = e[t][1], r = e[t][2];
    let i = t - 1;
    const o = [], a = n._tokenizer || r.parser[n.contentType](n.start), l = a.events, s = [], u = {};
    let c, f, p = -1, d = n, h = 0, m = 0;
    const S = [m];
    for (; d; ) {
      for (; e[++i][1] !== d; )
        ;
      o.push(i), d._tokenizer || (c = r.sliceStream(d), d.next || c.push(null), f && a.defineSkip(d.start), d._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(c), d._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), f = d, d = d.next;
    }
    for (d = n; ++p < l.length; )
      // Find a void token that includes a break.
      l[p][0] === "exit" && l[p - 1][0] === "enter" && l[p][1].type === l[p - 1][1].type && l[p][1].start.line !== l[p][1].end.line && (m = p + 1, S.push(m), d._tokenizer = void 0, d.previous = void 0, d = d.next);
    for (a.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : S.pop(), p = S.length; p--; ) {
      const g = l.slice(S[p], S[p + 1]), v = o.pop();
      s.unshift([v, v + g.length - 1]), rr(e, v, 2, g);
    }
    for (p = -1; ++p < s.length; )
      u[h + s[p][0]] = h + s[p][1], h += s[p][1] - s[p][0] - 1;
    return u;
  }
  const pN = {
    tokenize: mN,
    resolve: hN
  }, dN = {
    tokenize: gN,
    partial: !0
  };
  function hN(e) {
    return NE(e), e;
  }
  function mN(e, t) {
    let n;
    return r;
    function r(l) {
      return e.enter("content"), n = e.enter("chunkContent", {
        contentType: "content"
      }), i(l);
    }
    function i(l) {
      return l === null ? o(l) : re(l) ? e.check(
        dN,
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
  function gN(e, t, n) {
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
  function DE(e, t, n, r, i, o, a, l, s) {
    const u = s || Number.POSITIVE_INFINITY;
    let c = 0;
    return f;
    function f(g) {
      return g === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(g), e.exit(o), p) : g === null || g === 41 || mh(g) ? n(g) : (e.enter(r), e.enter(a), e.enter(l), e.enter("chunkString", {
        contentType: "string"
      }), m(g));
    }
    function p(g) {
      return g === 62 ? (e.enter(o), e.consume(g), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
        contentType: "string"
      }), d(g));
    }
    function d(g) {
      return g === 62 ? (e.exit("chunkString"), e.exit(l), p(g)) : g === null || g === 60 || re(g) ? n(g) : (e.consume(g), g === 92 ? h : d);
    }
    function h(g) {
      return g === 60 || g === 62 || g === 92 ? (e.consume(g), d) : d(g);
    }
    function m(g) {
      return g === 40 ? ++c > u ? n(g) : (e.consume(g), m) : g === 41 ? c-- ? (e.consume(g), m) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : g === null || dn(g) ? c ? n(g) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : mh(g) ? n(g) : (e.consume(g), g === 92 ? S : m);
    }
    function S(g) {
      return g === 40 || g === 41 || g === 92 ? (e.consume(g), m) : m(g);
    }
  }
  function RE(e, t, n, r, i, o) {
    const a = this;
    let l = 0, s;
    return u;
    function u(d) {
      return e.enter(r), e.enter(i), e.consume(d), e.exit(i), e.enter(o), c;
    }
    function c(d) {
      return d === null || d === 91 || d === 93 && !s || /* To do: remove in the future once we’ve switched from
       * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
       * which doesn’t need this */
      /* Hidden footnotes hook */
      /* c8 ignore next 3 */
      d === 94 && !l && "_hiddenFootnoteSupport" in a.parser.constructs || l > 999 ? n(d) : d === 93 ? (e.exit(o), e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : re(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("chunkString", {
        contentType: "string"
      }), f(d));
    }
    function f(d) {
      return d === null || d === 91 || d === 93 || re(d) || l++ > 999 ? (e.exit("chunkString"), c(d)) : (e.consume(d), s = s || !qe(d), d === 92 ? p : f);
    }
    function p(d) {
      return d === 91 || d === 92 || d === 93 ? (e.consume(d), l++, f) : f(d);
    }
  }
  function LE(e, t, n, r, i, o) {
    let a;
    return l;
    function l(p) {
      return e.enter(r), e.enter(i), e.consume(p), e.exit(i), a = p === 40 ? 41 : p, s;
    }
    function s(p) {
      return p === a ? (e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : (e.enter(o), u(p));
    }
    function u(p) {
      return p === a ? (e.exit(o), s(a)) : p === null ? n(p) : re(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), Ce(e, u, "linePrefix")) : (e.enter("chunkString", {
        contentType: "string"
      }), c(p));
    }
    function c(p) {
      return p === a || p === null || re(p) ? (e.exit("chunkString"), u(p)) : (e.consume(p), p === 92 ? f : c);
    }
    function f(p) {
      return p === a || p === 92 ? (e.consume(p), c) : c(p);
    }
  }
  function cl(e, t) {
    let n;
    return r;
    function r(i) {
      return re(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : qe(i) ? Ce(
        e,
        r,
        n ? "linePrefix" : "lineSuffix"
      )(i) : t(i);
    }
  }
  function Ro(e) {
    return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  const vN = {
    name: "definition",
    tokenize: wN
  }, yN = {
    tokenize: bN,
    partial: !0
  };
  function wN(e, t, n) {
    const r = this;
    let i;
    return o;
    function o(s) {
      return e.enter("definition"), RE.call(
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
      return i = Ro(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      ), s === 58 ? (e.enter("definitionMarker"), e.consume(s), e.exit("definitionMarker"), cl(
        e,
        DE(
          e,
          e.attempt(
            yN,
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
  function bN(e, t, n) {
    return r;
    function r(a) {
      return dn(a) ? cl(e, i)(a) : n(a);
    }
    function i(a) {
      return a === 34 || a === 39 || a === 40 ? LE(
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
  const SN = {
    name: "hardBreakEscape",
    tokenize: EN
  };
  function EN(e, t, n) {
    return r;
    function r(o) {
      return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(o), i;
    }
    function i(o) {
      return re(o) ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(o)) : n(o);
    }
  }
  const AN = {
    name: "headingAtx",
    tokenize: xN,
    resolve: CN
  };
  function CN(e, t) {
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
    }, rr(e, r, n - r + 1, [
      ["enter", i, t],
      ["enter", o, t],
      ["exit", o, t],
      ["exit", i, t]
    ])), e;
  }
  function xN(e, t, n) {
    const r = this;
    let i = 0;
    return o;
    function o(c) {
      return e.enter("atxHeading"), e.enter("atxHeadingSequence"), a(c);
    }
    function a(c) {
      return c === 35 && i++ < 6 ? (e.consume(c), a) : c === null || dn(c) ? (e.exit("atxHeadingSequence"), r.interrupt ? t(c) : l(c)) : n(c);
    }
    function l(c) {
      return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || re(c) ? (e.exit("atxHeading"), t(c)) : qe(c) ? Ce(e, l, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
    }
    function s(c) {
      return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), l(c));
    }
    function u(c) {
      return c === null || c === 35 || dn(c) ? (e.exit("atxHeadingText"), l(c)) : (e.consume(c), u);
    }
  }
  const kN = [
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
  ], C1 = ["pre", "script", "style", "textarea"], ON = {
    name: "htmlFlow",
    tokenize: PN,
    resolveTo: IN,
    concrete: !0
  }, TN = {
    tokenize: _N,
    partial: !0
  };
  function IN(e) {
    let t = e.length;
    for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
      ;
    return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
  }
  function PN(e, t, n) {
    const r = this;
    let i, o, a, l, s;
    return u;
    function u(C) {
      return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(C), c;
    }
    function c(C) {
      return C === 33 ? (e.consume(C), f) : C === 47 ? (e.consume(C), h) : C === 63 ? (e.consume(C), i = 3, r.interrupt ? t : V) : Qn(C) ? (e.consume(C), a = String.fromCharCode(C), o = !0, m) : n(C);
    }
    function f(C) {
      return C === 45 ? (e.consume(C), i = 2, p) : C === 91 ? (e.consume(C), i = 5, a = "CDATA[", l = 0, d) : Qn(C) ? (e.consume(C), i = 4, r.interrupt ? t : V) : n(C);
    }
    function p(C) {
      return C === 45 ? (e.consume(C), r.interrupt ? t : V) : n(C);
    }
    function d(C) {
      return C === a.charCodeAt(l++) ? (e.consume(C), l === a.length ? r.interrupt ? t : I : d) : n(C);
    }
    function h(C) {
      return Qn(C) ? (e.consume(C), a = String.fromCharCode(C), m) : n(C);
    }
    function m(C) {
      return C === null || C === 47 || C === 62 || dn(C) ? C !== 47 && o && C1.includes(a.toLowerCase()) ? (i = 1, r.interrupt ? t(C) : I(C)) : kN.includes(a.toLowerCase()) ? (i = 6, C === 47 ? (e.consume(C), S) : r.interrupt ? t(C) : I(C)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : o ? v(C) : g(C)) : C === 45 || Xt(C) ? (e.consume(C), a += String.fromCharCode(C), m) : n(C);
    }
    function S(C) {
      return C === 62 ? (e.consume(C), r.interrupt ? t : I) : n(C);
    }
    function g(C) {
      return qe(C) ? (e.consume(C), g) : P(C);
    }
    function v(C) {
      return C === 47 ? (e.consume(C), P) : C === 58 || C === 95 || Qn(C) ? (e.consume(C), w) : qe(C) ? (e.consume(C), v) : P(C);
    }
    function w(C) {
      return C === 45 || C === 46 || C === 58 || C === 95 || Xt(C) ? (e.consume(C), w) : E(C);
    }
    function E(C) {
      return C === 61 ? (e.consume(C), O) : qe(C) ? (e.consume(C), E) : v(C);
    }
    function O(C) {
      return C === null || C === 60 || C === 61 || C === 62 || C === 96 ? n(C) : C === 34 || C === 39 ? (e.consume(C), s = C, b) : qe(C) ? (e.consume(C), O) : (s = null, A(C));
    }
    function b(C) {
      return C === null || re(C) ? n(C) : C === s ? (e.consume(C), T) : (e.consume(C), b);
    }
    function A(C) {
      return C === null || C === 34 || C === 39 || C === 60 || C === 61 || C === 62 || C === 96 || dn(C) ? E(C) : (e.consume(C), A);
    }
    function T(C) {
      return C === 47 || C === 62 || qe(C) ? v(C) : n(C);
    }
    function P(C) {
      return C === 62 ? (e.consume(C), _) : n(C);
    }
    function _(C) {
      return qe(C) ? (e.consume(C), _) : C === null || re(C) ? I(C) : n(C);
    }
    function I(C) {
      return C === 45 && i === 2 ? (e.consume(C), oe) : C === 60 && i === 1 ? (e.consume(C), ne) : C === 62 && i === 4 ? (e.consume(C), H) : C === 63 && i === 3 ? (e.consume(C), V) : C === 93 && i === 5 ? (e.consume(C), B) : re(C) && (i === 6 || i === 7) ? e.check(
        TN,
        H,
        F
      )(C) : C === null || re(C) ? F(C) : (e.consume(C), I);
    }
    function F(C) {
      return e.exit("htmlFlowData"), U(C);
    }
    function U(C) {
      return C === null ? x(C) : re(C) ? e.attempt(
        {
          tokenize: q,
          partial: !0
        },
        U,
        x
      )(C) : (e.enter("htmlFlowData"), I(C));
    }
    function q(C, tt, He) {
      return Qe;
      function Qe(We) {
        return C.enter("lineEnding"), C.consume(We), C.exit("lineEnding"), me;
      }
      function me(We) {
        return r.parser.lazy[r.now().line] ? He(We) : tt(We);
      }
    }
    function oe(C) {
      return C === 45 ? (e.consume(C), V) : I(C);
    }
    function ne(C) {
      return C === 47 ? (e.consume(C), a = "", fe) : I(C);
    }
    function fe(C) {
      return C === 62 && C1.includes(a.toLowerCase()) ? (e.consume(C), H) : Qn(C) && a.length < 8 ? (e.consume(C), a += String.fromCharCode(C), fe) : I(C);
    }
    function B(C) {
      return C === 93 ? (e.consume(C), V) : I(C);
    }
    function V(C) {
      return C === 62 ? (e.consume(C), H) : C === 45 && i === 2 ? (e.consume(C), V) : I(C);
    }
    function H(C) {
      return C === null || re(C) ? (e.exit("htmlFlowData"), x(C)) : (e.consume(C), H);
    }
    function x(C) {
      return e.exit("htmlFlow"), t(C);
    }
  }
  function _N(e, t, n) {
    return r;
    function r(i) {
      return e.exit("htmlFlowData"), e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), e.attempt(ff, t, n);
    }
  }
  const NN = {
    name: "htmlText",
    tokenize: DN
  };
  function DN(e, t, n) {
    const r = this;
    let i, o, a, l;
    return s;
    function s(x) {
      return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), u;
    }
    function u(x) {
      return x === 33 ? (e.consume(x), c) : x === 47 ? (e.consume(x), A) : x === 63 ? (e.consume(x), O) : Qn(x) ? (e.consume(x), _) : n(x);
    }
    function c(x) {
      return x === 45 ? (e.consume(x), f) : x === 91 ? (e.consume(x), o = "CDATA[", a = 0, S) : Qn(x) ? (e.consume(x), E) : n(x);
    }
    function f(x) {
      return x === 45 ? (e.consume(x), p) : n(x);
    }
    function p(x) {
      return x === null || x === 62 ? n(x) : x === 45 ? (e.consume(x), d) : h(x);
    }
    function d(x) {
      return x === null || x === 62 ? n(x) : h(x);
    }
    function h(x) {
      return x === null ? n(x) : x === 45 ? (e.consume(x), m) : re(x) ? (l = h, B(x)) : (e.consume(x), h);
    }
    function m(x) {
      return x === 45 ? (e.consume(x), H) : h(x);
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
      return x === 62 ? H(x) : x === 93 ? (e.consume(x), w) : g(x);
    }
    function E(x) {
      return x === null || x === 62 ? H(x) : re(x) ? (l = E, B(x)) : (e.consume(x), E);
    }
    function O(x) {
      return x === null ? n(x) : x === 63 ? (e.consume(x), b) : re(x) ? (l = O, B(x)) : (e.consume(x), O);
    }
    function b(x) {
      return x === 62 ? H(x) : O(x);
    }
    function A(x) {
      return Qn(x) ? (e.consume(x), T) : n(x);
    }
    function T(x) {
      return x === 45 || Xt(x) ? (e.consume(x), T) : P(x);
    }
    function P(x) {
      return re(x) ? (l = P, B(x)) : qe(x) ? (e.consume(x), P) : H(x);
    }
    function _(x) {
      return x === 45 || Xt(x) ? (e.consume(x), _) : x === 47 || x === 62 || dn(x) ? I(x) : n(x);
    }
    function I(x) {
      return x === 47 ? (e.consume(x), H) : x === 58 || x === 95 || Qn(x) ? (e.consume(x), F) : re(x) ? (l = I, B(x)) : qe(x) ? (e.consume(x), I) : H(x);
    }
    function F(x) {
      return x === 45 || x === 46 || x === 58 || x === 95 || Xt(x) ? (e.consume(x), F) : U(x);
    }
    function U(x) {
      return x === 61 ? (e.consume(x), q) : re(x) ? (l = U, B(x)) : qe(x) ? (e.consume(x), U) : I(x);
    }
    function q(x) {
      return x === null || x === 60 || x === 61 || x === 62 || x === 96 ? n(x) : x === 34 || x === 39 ? (e.consume(x), i = x, oe) : re(x) ? (l = q, B(x)) : qe(x) ? (e.consume(x), q) : (e.consume(x), i = void 0, fe);
    }
    function oe(x) {
      return x === i ? (e.consume(x), ne) : x === null ? n(x) : re(x) ? (l = oe, B(x)) : (e.consume(x), oe);
    }
    function ne(x) {
      return x === 62 || x === 47 || dn(x) ? I(x) : n(x);
    }
    function fe(x) {
      return x === null || x === 34 || x === 39 || x === 60 || x === 61 || x === 96 ? n(x) : x === 62 || dn(x) ? I(x) : (e.consume(x), fe);
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
    function H(x) {
      return x === 62 ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(x);
    }
  }
  const sg = {
    name: "labelEnd",
    tokenize: UN,
    resolveTo: BN,
    resolveAll: MN
  }, RN = {
    tokenize: zN
  }, LN = {
    tokenize: WN
  }, FN = {
    tokenize: jN
  };
  function MN(e) {
    let t = -1, n;
    for (; ++t < e.length; )
      n = e[t][1], (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
    return e;
  }
  function BN(e, t) {
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
    ], l = un(l, e.slice(o + 1, o + r + 3)), l = un(l, [["enter", c, t]]), l = un(
      l,
      ag(
        t.parser.constructs.insideSpan.null,
        e.slice(o + r + 4, a - 3),
        t
      )
    ), l = un(l, [
      ["exit", c, t],
      e[a - 2],
      e[a - 1],
      ["exit", u, t]
    ]), l = un(l, e.slice(a + 1)), l = un(l, [["exit", s, t]]), rr(e, o, e.length, l), e;
  }
  function UN(e, t, n) {
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
        Ro(
          r.sliceSerialize({
            start: o.end,
            end: r.now()
          })
        )
      ), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(c), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(c);
    }
    function s(c) {
      return c === 40 ? e.attempt(
        RN,
        t,
        a ? t : u
      )(c) : c === 91 ? e.attempt(
        LN,
        t,
        a ? e.attempt(FN, t, u) : u
      )(c) : a ? t(c) : u(c);
    }
    function u(c) {
      return o._balanced = !0, n(c);
    }
  }
  function zN(e, t, n) {
    return r;
    function r(s) {
      return e.enter("resource"), e.enter("resourceMarker"), e.consume(s), e.exit("resourceMarker"), cl(e, i);
    }
    function i(s) {
      return s === 41 ? l(s) : DE(
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
      return dn(s) ? cl(e, a)(s) : l(s);
    }
    function a(s) {
      return s === 34 || s === 39 || s === 40 ? LE(
        e,
        cl(e, l),
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
  function WN(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return RE.call(
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
        Ro(
          r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
        )
      ) ? t(a) : n(a);
    }
  }
  function jN(e, t, n) {
    return r;
    function r(o) {
      return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
    }
    function i(o) {
      return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
    }
  }
  const YN = {
    name: "labelStartImage",
    tokenize: VN,
    resolveAll: sg.resolveAll
  };
  function VN(e, t, n) {
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
  const GN = {
    name: "labelStartLink",
    tokenize: HN,
    resolveAll: sg.resolveAll
  };
  function HN(e, t, n) {
    const r = this;
    return i;
    function i(a) {
      return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), o;
    }
    function o(a) {
      return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
    }
  }
  const Ip = {
    name: "lineEnding",
    tokenize: $N
  };
  function $N(e, t) {
    return n;
    function n(r) {
      return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Ce(e, t, "linePrefix");
    }
  }
  const pu = {
    name: "thematicBreak",
    tokenize: JN
  };
  function JN(e, t, n) {
    let r = 0, i;
    return o;
    function o(s) {
      return e.enter("thematicBreak"), i = s, a(s);
    }
    function a(s) {
      return s === i ? (e.enter("thematicBreakSequence"), l(s)) : qe(s) ? Ce(e, a, "whitespace")(s) : r < 3 || s !== null && !re(s) ? n(s) : (e.exit("thematicBreak"), t(s));
    }
    function l(s) {
      return s === i ? (e.consume(s), r++, l) : (e.exit("thematicBreakSequence"), a(s));
    }
  }
  const _t = {
    name: "list",
    tokenize: XN,
    continuation: {
      tokenize: qN
    },
    exit: e5
  }, QN = {
    tokenize: t5,
    partial: !0
  }, KN = {
    tokenize: ZN,
    partial: !0
  };
  function XN(e, t, n) {
    const r = this, i = r.events[r.events.length - 1];
    let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
    return l;
    function l(d) {
      const h = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
      if (h === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : hh(d)) {
        if (r.containerState.type || (r.containerState.type = h, e.enter(h, {
          _container: !0
        })), h === "listUnordered")
          return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(pu, n, u)(d) : u(d);
        if (!r.interrupt || d === 49)
          return e.enter("listItemPrefix"), e.enter("listItemValue"), s(d);
      }
      return n(d);
    }
    function s(d) {
      return hh(d) && ++a < 10 ? (e.consume(d), s) : (!r.interrupt || a < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), u(d)) : n(d);
    }
    function u(d) {
      return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
        ff,
        // Can’t be empty when interrupting.
        r.interrupt ? n : c,
        e.attempt(
          QN,
          p,
          f
        )
      );
    }
    function c(d) {
      return r.containerState.initialBlankLine = !0, o++, p(d);
    }
    function f(d) {
      return qe(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), p) : n(d);
    }
    function p(d) {
      return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
    }
  }
  function qN(e, t, n) {
    const r = this;
    return r.containerState._closeFlow = void 0, e.check(ff, i, o);
    function i(l) {
      return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Ce(
        e,
        t,
        "listItemIndent",
        r.containerState.size + 1
      )(l);
    }
    function o(l) {
      return r.containerState.furtherBlankLines || !qe(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(KN, t, a)(l));
    }
    function a(l) {
      return r.containerState._closeFlow = !0, r.interrupt = void 0, Ce(
        e,
        e.attempt(_t, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(l);
    }
  }
  function ZN(e, t, n) {
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
  function e5(e) {
    e.exit(this.containerState.type);
  }
  function t5(e, t, n) {
    const r = this;
    return Ce(
      e,
      i,
      "listItemPrefixWhitespace",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
    );
    function i(o) {
      const a = r.events[r.events.length - 1];
      return !qe(o) && a && a[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
    }
  }
  const x1 = {
    name: "setextUnderline",
    tokenize: r5,
    resolveTo: n5
  };
  function n5(e, t) {
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
  function r5(e, t, n) {
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
  const i5 = {
    tokenize: o5
  };
  function o5(e) {
    const t = this, n = e.attempt(
      // Try to parse a blank line.
      ff,
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
            e.attempt(pN, i)
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
  const a5 = {
    resolveAll: ME()
  }, l5 = FE("string"), s5 = FE("text");
  function FE(e) {
    return {
      tokenize: t,
      resolveAll: ME(
        e === "text" ? u5 : void 0
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
        let p = -1;
        if (f)
          for (; ++p < f.length; ) {
            const d = f[p];
            if (!d.previous || d.previous.call(r, r.previous))
              return !0;
          }
        return !1;
      }
    }
  }
  function ME(e) {
    return t;
    function t(n, r) {
      let i = -1, o;
      for (; ++i <= n.length; )
        o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
      return e ? e(n, r) : n;
    }
  }
  function u5(e, t) {
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
  function c5(e, t, n) {
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
      attempt: A(O),
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
      sliceStream: d,
      sliceSerialize: p,
      now: h,
      defineSkip: m,
      write: f
    };
    let c = t.tokenize.call(u, s);
    return t.resolveAll && o.push(t), u;
    function f(I) {
      return a = un(a, I), S(), a[a.length - 1] !== null ? [] : (T(t, 0), u.events = ag(o, u.events, u), u.events);
    }
    function p(I, F) {
      return p5(d(I), F);
    }
    function d(I) {
      return f5(a, I);
    }
    function h() {
      return Object.assign({}, r);
    }
    function m(I) {
      i[I.line] = I.column, _();
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
      re(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, _()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = I;
    }
    function w(I, F) {
      const U = F || {};
      return U.type = I, U.start = h(), u.events.push(["enter", U, u]), l.push(U), U;
    }
    function E(I) {
      const F = l.pop();
      return F.end = h(), u.events.push(["exit", F, u]), F;
    }
    function O(I, F) {
      T(I, F.from);
    }
    function b(I, F) {
      F.restore();
    }
    function A(I, F) {
      return U;
      function U(q, oe, ne) {
        let fe, B, V, H;
        return Array.isArray(q) ? (
          /* c8 ignore next 1 */
          C(q)
        ) : "tokenize" in q ? C([q]) : x(q);
        function x(me) {
          return We;
          function We(st) {
            const xn = st !== null && me[st], kn = st !== null && me.null, bi = [
              // To do: add more extension tests.
              /* c8 ignore next 2 */
              ...Array.isArray(xn) ? xn : xn ? [xn] : [],
              ...Array.isArray(kn) ? kn : kn ? [kn] : []
            ];
            return C(bi)(st);
          }
        }
        function C(me) {
          return fe = me, B = 0, me.length === 0 ? ne : tt(me[B]);
        }
        function tt(me) {
          return We;
          function We(st) {
            return H = P(), V = me, me.partial || (u.currentConstruct = me), me.name && u.parser.constructs.disable.null.includes(me.name) ? Qe() : me.tokenize.call(
              // If we do have fields, create an object w/ `context` as its
              // prototype.
              // This allows a “live binding”, which is needed for `interrupt`.
              F ? Object.assign(Object.create(u), F) : u,
              s,
              He,
              Qe
            )(st);
          }
        }
        function He(me) {
          return I(V, H), oe;
        }
        function Qe(me) {
          return H.restore(), ++B < fe.length ? tt(fe[B]) : ne;
        }
      }
    }
    function T(I, F) {
      I.resolveAll && !o.includes(I) && o.push(I), I.resolve && rr(
        u.events,
        F,
        u.events.length - F,
        I.resolve(u.events.slice(F), u)
      ), I.resolveTo && (u.events = I.resolveTo(u.events, u));
    }
    function P() {
      const I = h(), F = u.previous, U = u.currentConstruct, q = u.events.length, oe = Array.from(l);
      return {
        restore: ne,
        from: q
      };
      function ne() {
        r = I, u.previous = F, u.currentConstruct = U, u.events.length = q, l = oe, _();
      }
    }
    function _() {
      r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
    }
  }
  function f5(e, t) {
    const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
    let a;
    return n === i ? a = [e[n].slice(r, o)] : (a = e.slice(n, i), r > -1 && (a[0] = a[0].slice(r)), o > 0 && a.push(e[i].slice(0, o))), a;
  }
  function p5(e, t) {
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
  const d5 = {
    [42]: _t,
    [43]: _t,
    [45]: _t,
    [48]: _t,
    [49]: _t,
    [50]: _t,
    [51]: _t,
    [52]: _t,
    [53]: _t,
    [54]: _t,
    [55]: _t,
    [56]: _t,
    [57]: _t,
    [62]: IE
  }, h5 = {
    [91]: vN
  }, m5 = {
    [-2]: Tp,
    [-1]: Tp,
    [32]: Tp
  }, g5 = {
    [35]: AN,
    [42]: pu,
    [45]: [x1, pu],
    [60]: ON,
    [61]: x1,
    [95]: pu,
    [96]: A1,
    [126]: A1
  }, v5 = {
    [38]: _E,
    [92]: PE
  }, y5 = {
    [-5]: Ip,
    [-4]: Ip,
    [-3]: Ip,
    [33]: YN,
    [38]: _E,
    [42]: gh,
    [60]: [Q3, NN],
    [91]: GN,
    [92]: [SN, PE],
    [93]: sg,
    [95]: gh,
    [96]: lN
  }, w5 = {
    null: [gh, a5]
  }, b5 = {
    null: [42, 95]
  }, S5 = {
    null: []
  }, E5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    attentionMarkers: b5,
    contentInitial: h5,
    disable: S5,
    document: d5,
    flow: g5,
    flowInitial: m5,
    insideSpan: w5,
    string: v5,
    text: y5
  }, Symbol.toStringTag, { value: "Module" }));
  function A5(e = {}) {
    const t = R3(
      // @ts-expect-error Same as above.
      [E5].concat(e.extensions || [])
    ), n = {
      defined: [],
      lazy: {},
      constructs: t,
      content: r(j3),
      document: r(V3),
      flow: r(i5),
      string: r(l5),
      text: r(s5)
    };
    return n;
    function r(i) {
      return o;
      function o(a) {
        return c5(n, i, a);
      }
    }
  }
  const k1 = /[\0\t\n\r]/g;
  function C5() {
    let e = 1, t = "", n = !0, r;
    return i;
    function i(o, a, l) {
      const s = [];
      let u, c, f, p, d;
      for (o = t + o.toString(a), f = 0, t = "", n && (o.charCodeAt(0) === 65279 && f++, n = void 0); f < o.length; ) {
        if (k1.lastIndex = f, u = k1.exec(o), p = u && u.index !== void 0 ? u.index : o.length, d = o.charCodeAt(p), !u) {
          t = o.slice(f);
          break;
        }
        if (d === 10 && f === p && r)
          s.push(-3), r = void 0;
        else
          switch (r && (s.push(-5), r = void 0), f < p && (s.push(o.slice(f, p)), e += p - f), d) {
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
        f = p + 1;
      }
      return l && (r && s.push(-5), t && s.push(t), s.push(null)), s;
    }
  }
  function x5(e) {
    for (; !NE(e); )
      ;
    return e;
  }
  function BE(e, t) {
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
  const k5 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  function O5(e) {
    return e.replace(k5, T5);
  }
  function T5(e, t, n) {
    if (t)
      return t;
    if (n.charCodeAt(0) === 35) {
      const i = n.charCodeAt(1), o = i === 120 || i === 88;
      return BE(n.slice(o ? 2 : 1), o ? 16 : 10);
    }
    return lg(n) || e;
  }
  const UE = {}.hasOwnProperty, I5 = (
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
      return typeof t != "string" && (n = t, t = void 0), P5(n)(
        x5(
          // @ts-expect-error: micromark types need to accept `null`.
          A5(n).document().write(C5()(e, t, !0))
        )
      );
    }
  );
  function P5(e) {
    const t = {
      transforms: [],
      canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
      enter: {
        autolink: l(jn),
        autolinkProtocol: I,
        autolinkEmail: I,
        atxHeading: l(ha),
        blockQuote: l(bi),
        characterEscape: I,
        characterReference: I,
        codeFenced: l(vs),
        codeFencedFenceInfo: s,
        codeFencedFenceMeta: s,
        codeIndented: l(vs, s),
        codeText: l(ys, s),
        codeTextData: I,
        data: I,
        codeFlowValue: I,
        definition: l(Pf),
        definitionDestinationString: s,
        definitionLabelString: s,
        definitionTitleString: s,
        emphasis: l(_f),
        hardBreakEscape: l(ma),
        hardBreakTrailing: l(ma),
        htmlFlow: l(ws, s),
        htmlFlowData: I,
        htmlText: l(ws, s),
        htmlTextData: I,
        image: l(Nf),
        label: s,
        link: l(jn),
        listItem: l(bs),
        listItemValue: h,
        listOrdered: l(Si, d),
        listUnordered: l(Si),
        paragraph: l(Ss),
        reference: Qe,
        referenceString: s,
        resourceDestinationString: s,
        resourceTitleString: s,
        setextHeading: l(ha),
        strong: l(ga),
        thematicBreak: l(As)
      },
      exit: {
        atxHeading: c(),
        atxHeadingSequence: A,
        autolink: c(),
        autolinkEmail: kn,
        autolinkProtocol: xn,
        blockQuote: c(),
        characterEscapeValue: F,
        characterReferenceMarkerHexadecimal: We,
        characterReferenceMarkerNumeric: We,
        characterReferenceValue: st,
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
        definitionTitleString: O,
        emphasis: c(),
        hardBreakEscape: c(q),
        hardBreakTrailing: c(q),
        htmlFlow: c(oe),
        htmlFlowData: F,
        htmlText: c(ne),
        htmlTextData: F,
        image: c(V),
        label: x,
        labelText: H,
        lineEnding: U,
        link: c(B),
        listItem: c(),
        listOrdered: c(),
        listUnordered: c(),
        paragraph: c(),
        referenceString: me,
        resourceDestinationString: C,
        resourceTitleString: tt,
        resource: He,
        setextHeading: c(_),
        setextHeadingLineSequence: P,
        setextHeadingText: T,
        strong: c(),
        thematicBreak: c()
      }
    };
    zE(t, (e || {}).mdastExtensions || []);
    const n = {};
    return r;
    function r(R) {
      let j = {
        type: "root",
        children: []
      };
      const te = {
        stack: [j],
        tokenStack: [],
        config: t,
        enter: u,
        exit: f,
        buffer: s,
        resume: p,
        setData: o,
        getData: a
      }, Ee = [];
      let Ae = -1;
      for (; ++Ae < R.length; )
        if (R[Ae][1].type === "listOrdered" || R[Ae][1].type === "listUnordered")
          if (R[Ae][0] === "enter")
            Ee.push(Ae);
          else {
            const On = Ee.pop();
            Ae = i(R, On, Ae);
          }
      for (Ae = -1; ++Ae < R.length; ) {
        const On = t[R[Ae][0]];
        UE.call(On, R[Ae][1].type) && On[R[Ae][1].type].call(
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
        const On = te.tokenStack[te.tokenStack.length - 1];
        (On[1] || O1).call(te, void 0, On[0]);
      }
      for (j.position = {
        start: Rr(
          R.length > 0 ? R[0][1].start : {
            line: 1,
            column: 1,
            offset: 0
          }
        ),
        end: Rr(
          R.length > 0 ? R[R.length - 2][1].end : {
            line: 1,
            column: 1,
            offset: 0
          }
        )
      }, Ae = -1; ++Ae < t.transforms.length; )
        j = t.transforms[Ae](j) || j;
      return j;
    }
    function i(R, j, te) {
      let Ee = j - 1, Ae = -1, On = !1, Nr, sr, va, ya;
      for (; ++Ee <= te; ) {
        const $e = R[Ee];
        if ($e[1].type === "listUnordered" || $e[1].type === "listOrdered" || $e[1].type === "blockQuote" ? ($e[0] === "enter" ? Ae++ : Ae--, ya = void 0) : $e[1].type === "lineEndingBlank" ? $e[0] === "enter" && (Nr && !ya && !Ae && !va && (va = Ee), ya = void 0) : $e[1].type === "linePrefix" || $e[1].type === "listItemValue" || $e[1].type === "listItemMarker" || $e[1].type === "listItemPrefix" || $e[1].type === "listItemPrefixWhitespace" || (ya = void 0), !Ae && $e[0] === "enter" && $e[1].type === "listItemPrefix" || Ae === -1 && $e[0] === "exit" && ($e[1].type === "listUnordered" || $e[1].type === "listOrdered")) {
          if (Nr) {
            let Df = Ee;
            for (sr = void 0; Df--; ) {
              const ur = R[Df];
              if (ur[1].type === "lineEnding" || ur[1].type === "lineEndingBlank") {
                if (ur[0] === "exit")
                  continue;
                sr && (R[sr][1].type = "lineEndingBlank", On = !0), ur[1].type = "lineEnding", sr = Df;
              } else if (!(ur[1].type === "linePrefix" || ur[1].type === "blockQuotePrefix" || ur[1].type === "blockQuotePrefixWhitespace" || ur[1].type === "blockQuoteMarker" || ur[1].type === "listItemIndent"))
                break;
            }
            va && (!sr || va < sr) && (Nr._spread = !0), Nr.end = Object.assign(
              {},
              sr ? R[sr][1].start : $e[1].end
            ), R.splice(sr || Ee, 0, ["exit", Nr, $e[2]]), Ee++, te++;
          }
          $e[1].type === "listItemPrefix" && (Nr = {
            type: "listItem",
            // @ts-expect-error Patched
            _spread: !1,
            start: Object.assign({}, $e[1].start)
          }, R.splice(Ee, 0, ["enter", Nr, $e[2]]), Ee++, te++, va = void 0, ya = !0);
        }
      }
      return R[j][1]._spread = On, te;
    }
    function o(R, j) {
      n[R] = j;
    }
    function a(R) {
      return n[R];
    }
    function l(R, j) {
      return te;
      function te(Ee) {
        u.call(this, R(Ee), Ee), j && j.call(this, Ee);
      }
    }
    function s() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function u(R, j, te) {
      return this.stack[this.stack.length - 1].children.push(R), this.stack.push(R), this.tokenStack.push([j, te]), R.position = {
        start: Rr(j.start)
      }, R;
    }
    function c(R) {
      return j;
      function j(te) {
        R && R.call(this, te), f.call(this, te);
      }
    }
    function f(R, j) {
      const te = this.stack.pop(), Ee = this.tokenStack.pop();
      if (Ee)
        Ee[0].type !== R.type && (j ? j.call(this, R, Ee[0]) : (Ee[1] || O1).call(this, R, Ee[0]));
      else
        throw new Error(
          "Cannot close `" + R.type + "` (" + ul({
            start: R.start,
            end: R.end
          }) + "): it’s not open"
        );
      return te.position.end = Rr(R.end), te;
    }
    function p() {
      return N3(this.stack.pop());
    }
    function d() {
      o("expectingFirstListItemValue", !0);
    }
    function h(R) {
      if (a("expectingFirstListItemValue")) {
        const j = this.stack[this.stack.length - 2];
        j.start = Number.parseInt(this.sliceSerialize(R), 10), o("expectingFirstListItemValue");
      }
    }
    function m() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.lang = R;
    }
    function S() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.meta = R;
    }
    function g() {
      a("flowCodeInside") || (this.buffer(), o("flowCodeInside", !0));
    }
    function v() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.value = R.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), o("flowCodeInside");
    }
    function w() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.value = R.replace(/(\r?\n|\r)$/g, "");
    }
    function E(R) {
      const j = this.resume(), te = this.stack[this.stack.length - 1];
      te.label = j, te.identifier = Ro(
        this.sliceSerialize(R)
      ).toLowerCase();
    }
    function O() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.title = R;
    }
    function b() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.url = R;
    }
    function A(R) {
      const j = this.stack[this.stack.length - 1];
      if (!j.depth) {
        const te = this.sliceSerialize(R).length;
        j.depth = te;
      }
    }
    function T() {
      o("setextHeadingSlurpLineEnding", !0);
    }
    function P(R) {
      const j = this.stack[this.stack.length - 1];
      j.depth = this.sliceSerialize(R).charCodeAt(0) === 61 ? 1 : 2;
    }
    function _() {
      o("setextHeadingSlurpLineEnding");
    }
    function I(R) {
      const j = this.stack[this.stack.length - 1];
      let te = j.children[j.children.length - 1];
      (!te || te.type !== "text") && (te = Es(), te.position = {
        start: Rr(R.start)
      }, j.children.push(te)), this.stack.push(te);
    }
    function F(R) {
      const j = this.stack.pop();
      j.value += this.sliceSerialize(R), j.position.end = Rr(R.end);
    }
    function U(R) {
      const j = this.stack[this.stack.length - 1];
      if (a("atHardBreak")) {
        const te = j.children[j.children.length - 1];
        te.position.end = Rr(R.end), o("atHardBreak");
        return;
      }
      !a("setextHeadingSlurpLineEnding") && t.canContainEols.includes(j.type) && (I.call(this, R), F.call(this, R));
    }
    function q() {
      o("atHardBreak", !0);
    }
    function oe() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.value = R;
    }
    function ne() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.value = R;
    }
    function fe() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.value = R;
    }
    function B() {
      const R = this.stack[this.stack.length - 1];
      if (a("inReference")) {
        const j = a("referenceType") || "shortcut";
        R.type += "Reference", R.referenceType = j, delete R.url, delete R.title;
      } else
        delete R.identifier, delete R.label;
      o("referenceType");
    }
    function V() {
      const R = this.stack[this.stack.length - 1];
      if (a("inReference")) {
        const j = a("referenceType") || "shortcut";
        R.type += "Reference", R.referenceType = j, delete R.url, delete R.title;
      } else
        delete R.identifier, delete R.label;
      o("referenceType");
    }
    function H(R) {
      const j = this.sliceSerialize(R), te = this.stack[this.stack.length - 2];
      te.label = O5(j), te.identifier = Ro(j).toLowerCase();
    }
    function x() {
      const R = this.stack[this.stack.length - 1], j = this.resume(), te = this.stack[this.stack.length - 1];
      if (o("inReference", !0), te.type === "link") {
        const Ee = R.children;
        te.children = Ee;
      } else
        te.alt = j;
    }
    function C() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.url = R;
    }
    function tt() {
      const R = this.resume(), j = this.stack[this.stack.length - 1];
      j.title = R;
    }
    function He() {
      o("inReference");
    }
    function Qe() {
      o("referenceType", "collapsed");
    }
    function me(R) {
      const j = this.resume(), te = this.stack[this.stack.length - 1];
      te.label = j, te.identifier = Ro(
        this.sliceSerialize(R)
      ).toLowerCase(), o("referenceType", "full");
    }
    function We(R) {
      o("characterReferenceType", R.type);
    }
    function st(R) {
      const j = this.sliceSerialize(R), te = a("characterReferenceType");
      let Ee;
      te ? (Ee = BE(
        j,
        te === "characterReferenceMarkerNumeric" ? 10 : 16
      ), o("characterReferenceType")) : Ee = lg(j);
      const Ae = this.stack.pop();
      Ae.value += Ee, Ae.position.end = Rr(R.end);
    }
    function xn(R) {
      F.call(this, R);
      const j = this.stack[this.stack.length - 1];
      j.url = this.sliceSerialize(R);
    }
    function kn(R) {
      F.call(this, R);
      const j = this.stack[this.stack.length - 1];
      j.url = "mailto:" + this.sliceSerialize(R);
    }
    function bi() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function vs() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function ys() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function Pf() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function _f() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function ha() {
      return {
        type: "heading",
        depth: void 0,
        children: []
      };
    }
    function ma() {
      return {
        type: "break"
      };
    }
    function ws() {
      return {
        type: "html",
        value: ""
      };
    }
    function Nf() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function jn() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function Si(R) {
      return {
        type: "list",
        ordered: R.type === "listOrdered",
        start: null,
        // @ts-expect-error Patched.
        spread: R._spread,
        children: []
      };
    }
    function bs(R) {
      return {
        type: "listItem",
        // @ts-expect-error Patched.
        spread: R._spread,
        checked: null,
        children: []
      };
    }
    function Ss() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function ga() {
      return {
        type: "strong",
        children: []
      };
    }
    function Es() {
      return {
        type: "text",
        value: ""
      };
    }
    function As() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function Rr(e) {
    return {
      line: e.line,
      column: e.column,
      offset: e.offset
    };
  }
  function zE(e, t) {
    let n = -1;
    for (; ++n < t.length; ) {
      const r = t[n];
      Array.isArray(r) ? zE(e, r) : _5(e, r);
    }
  }
  function _5(e, t) {
    let n;
    for (n in t)
      if (UE.call(t, n)) {
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
      "Cannot close `" + e.type + "` (" + ul({
        start: e.start,
        end: e.end
      }) + "): a different token (`" + t.type + "`, " + ul({
        start: t.start,
        end: t.end
      }) + ") is open"
    ) : new Error(
      "Cannot close document, a token (`" + t.type + "`, " + ul({
        start: t.start,
        end: t.end
      }) + ") is still open"
    );
  }
  function N5(e) {
    Object.assign(this, { Parser: (n) => {
      const r = (
        /** @type {Options} */
        this.data("settings")
      );
      return I5(
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
  function D5(e, t) {
    const n = {
      type: "element",
      tagName: "blockquote",
      properties: {},
      children: e.wrap(e.all(t), !0)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function R5(e, t) {
    const n = { type: "element", tagName: "br", properties: {}, children: [] };
    return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
  }
  function L5(e, t) {
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
  function F5(e, t) {
    const n = {
      type: "element",
      tagName: "del",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function M5(e, t) {
    const n = {
      type: "element",
      tagName: "em",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function fa(e) {
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
  function WE(e, t) {
    const n = String(t.identifier).toUpperCase(), r = fa(n.toLowerCase()), i = e.footnoteOrder.indexOf(n);
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
  function B5(e, t) {
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
    }, WE(e, {
      type: "footnoteReference",
      identifier: i,
      position: t.position
    });
  }
  function U5(e, t) {
    const n = {
      type: "element",
      tagName: "h" + t.depth,
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function z5(e, t) {
    if (e.dangerous) {
      const n = { type: "raw", value: t.value };
      return e.patch(t, n), e.applyData(t, n);
    }
    return null;
  }
  function jE(e, t) {
    const n = t.referenceType;
    let r = "]";
    if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
      return { type: "text", value: "![" + t.alt + r };
    const i = e.all(t), o = i[0];
    o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
    const a = i[i.length - 1];
    return a && a.type === "text" ? a.value += r : i.push({ type: "text", value: r }), i;
  }
  function W5(e, t) {
    const n = e.definition(t.identifier);
    if (!n)
      return jE(e, t);
    const r = { src: fa(n.url || ""), alt: t.alt };
    n.title !== null && n.title !== void 0 && (r.title = n.title);
    const i = { type: "element", tagName: "img", properties: r, children: [] };
    return e.patch(t, i), e.applyData(t, i);
  }
  function j5(e, t) {
    const n = { src: fa(t.url) };
    t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
    const r = { type: "element", tagName: "img", properties: n, children: [] };
    return e.patch(t, r), e.applyData(t, r);
  }
  function Y5(e, t) {
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
  function V5(e, t) {
    const n = e.definition(t.identifier);
    if (!n)
      return jE(e, t);
    const r = { href: fa(n.url || "") };
    n.title !== null && n.title !== void 0 && (r.title = n.title);
    const i = {
      type: "element",
      tagName: "a",
      properties: r,
      children: e.all(t)
    };
    return e.patch(t, i), e.applyData(t, i);
  }
  function G5(e, t) {
    const n = { href: fa(t.url) };
    t.title !== null && t.title !== void 0 && (n.title = t.title);
    const r = {
      type: "element",
      tagName: "a",
      properties: n,
      children: e.all(t)
    };
    return e.patch(t, r), e.applyData(t, r);
  }
  function H5(e, t, n) {
    const r = e.all(t), i = n ? $5(n) : YE(t), o = {}, a = [];
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
  function $5(e) {
    let t = !1;
    if (e.type === "list") {
      t = e.spread || !1;
      const n = e.children;
      let r = -1;
      for (; !t && ++r < n.length; )
        t = YE(n[r]);
    }
    return t;
  }
  function YE(e) {
    const t = e.spread;
    return t == null ? e.children.length > 1 : t;
  }
  function J5(e, t) {
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
  function Q5(e, t) {
    const n = {
      type: "element",
      tagName: "p",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  function K5(e, t) {
    const n = { type: "root", children: e.wrap(e.all(t)) };
    return e.patch(t, n), e.applyData(t, n);
  }
  function X5(e, t) {
    const n = {
      type: "element",
      tagName: "strong",
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const ug = VE("start"), cg = VE("end");
  function q5(e) {
    return { start: ug(e), end: cg(e) };
  }
  function VE(e) {
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
  function Z5(e, t) {
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
      }, l = ug(t.children[1]), s = cg(t.children[t.children.length - 1]);
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
  function eD(e, t, n) {
    const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, l = a ? a.length : t.children.length;
    let s = -1;
    const u = [];
    for (; ++s < l; ) {
      const f = t.children[s], p = {}, d = a ? a[s] : void 0;
      d && (p.align = d);
      let h = { type: "element", tagName: o, properties: p, children: [] };
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
  function tD(e, t) {
    const n = {
      type: "element",
      tagName: "td",
      // Assume body cell.
      properties: {},
      children: e.all(t)
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const T1 = 9, I1 = 32;
  function nD(e) {
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
      for (; o === T1 || o === I1; )
        r++, o = e.codePointAt(r);
    }
    if (n) {
      let o = e.codePointAt(i - 1);
      for (; o === T1 || o === I1; )
        i--, o = e.codePointAt(i - 1);
    }
    return i > r ? e.slice(r, i) : "";
  }
  function rD(e, t) {
    const n = { type: "text", value: nD(String(t.value)) };
    return e.patch(t, n), e.applyData(t, n);
  }
  function iD(e, t) {
    const n = {
      type: "element",
      tagName: "hr",
      properties: {},
      children: []
    };
    return e.patch(t, n), e.applyData(t, n);
  }
  const oD = {
    blockquote: D5,
    break: R5,
    code: L5,
    delete: F5,
    emphasis: M5,
    footnoteReference: WE,
    footnote: B5,
    heading: U5,
    html: z5,
    imageReference: W5,
    image: j5,
    inlineCode: Y5,
    linkReference: V5,
    link: G5,
    listItem: H5,
    list: J5,
    paragraph: Q5,
    root: K5,
    strong: X5,
    table: Z5,
    tableCell: tD,
    tableRow: eD,
    text: rD,
    thematicBreak: iD,
    toml: Ys,
    yaml: Ys,
    definition: Ys,
    footnoteDefinition: Ys
  };
  function Ys() {
    return null;
  }
  const GE = (
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
        return uD;
      if (typeof e == "string")
        return sD(e);
      if (typeof e == "object")
        return Array.isArray(e) ? aD(e) : lD(e);
      if (typeof e == "function")
        return pf(e);
      throw new Error("Expected function, string, or object as test");
    }
  );
  function aD(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.length; )
      t[n] = GE(e[n]);
    return pf(r);
    function r(...i) {
      let o = -1;
      for (; ++o < t.length; )
        if (t[o].call(this, ...i))
          return !0;
      return !1;
    }
  }
  function lD(e) {
    return pf(t);
    function t(n) {
      let r;
      for (r in e)
        if (n[r] !== e[r])
          return !1;
      return !0;
    }
  }
  function sD(e) {
    return pf(t);
    function t(n) {
      return n && n.type === e;
    }
  }
  function pf(e) {
    return t;
    function t(n, ...r) {
      return Boolean(
        n && typeof n == "object" && "type" in n && // @ts-expect-error: fine.
        Boolean(e.call(this, n, ...r))
      );
    }
  }
  function uD() {
    return !0;
  }
  const cD = !0, _1 = !1, fD = "skip", pD = (
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
      const i = GE(t), o = r ? -1 : 1;
      a(e, void 0, [])();
      function a(l, s, u) {
        const c = l && typeof l == "object" ? l : {};
        if (typeof c.type == "string") {
          const p = (
            // `hast`
            typeof c.tagName == "string" ? c.tagName : (
              // `xast`
              typeof c.name == "string" ? c.name : void 0
            )
          );
          Object.defineProperty(f, "name", {
            value: "node (" + (l.type + (p ? "<" + p + ">" : "")) + ")"
          });
        }
        return f;
        function f() {
          let p = [], d, h, m;
          if ((!t || i(l, s, u[u.length - 1] || null)) && (p = dD(n(l, u)), p[0] === _1))
            return p;
          if (l.children && p[0] !== fD)
            for (h = (r ? l.children.length : -1) + o, m = u.concat(l); h > -1 && h < l.children.length; ) {
              if (d = a(l.children[h], h, m)(), d[0] === _1)
                return d;
              h = typeof d[1] == "number" ? d[1] : h + o;
            }
          return p;
        }
      }
    }
  );
  function dD(e) {
    return Array.isArray(e) ? e : typeof e == "number" ? [cD, e] : [e];
  }
  const HE = (
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
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), pD(e, t, i, r);
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
  function hD(e) {
    return !e || !e.position || !e.position.start || !e.position.start.line || !e.position.start.column || !e.position.end || !e.position.end.line || !e.position.end.column;
  }
  const N1 = {}.hasOwnProperty;
  function mD(e) {
    const t = /* @__PURE__ */ Object.create(null);
    if (!e || !e.type)
      throw new Error("mdast-util-definitions expected node");
    return HE(e, "definition", (r) => {
      const i = D1(r.identifier);
      i && !N1.call(t, i) && (t[i] = r);
    }), n;
    function n(r) {
      const i = D1(r);
      return i && N1.call(t, i) ? t[i] : null;
    }
  }
  function D1(e) {
    return String(e || "").toUpperCase();
  }
  const ic = {}.hasOwnProperty;
  function gD(e, t) {
    const n = t || {}, r = n.allowDangerousHtml || !1, i = {};
    return a.dangerous = r, a.clobberPrefix = n.clobberPrefix === void 0 || n.clobberPrefix === null ? "user-content-" : n.clobberPrefix, a.footnoteLabel = n.footnoteLabel || "Footnotes", a.footnoteLabelTagName = n.footnoteLabelTagName || "h2", a.footnoteLabelProperties = n.footnoteLabelProperties || {
      className: ["sr-only"]
    }, a.footnoteBackLabel = n.footnoteBackLabel || "Back to content", a.unknownHandler = n.unknownHandler, a.passThrough = n.passThrough, a.handlers = M(M({}, oD), n.handlers), a.definition = mD(e), a.footnoteById = i, a.footnoteOrder = [], a.footnoteCounts = {}, a.patch = vD, a.applyData = yD, a.one = l, a.all = s, a.wrap = bD, a.augment = o, HE(e, "footnoteDefinition", (u) => {
      const c = String(u.identifier).toUpperCase();
      ic.call(i, c) || (i[c] = u);
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
        hD(f) || (c.position = { start: ug(f), end: cg(f) });
      }
      return c;
    }
    function a(u, c, f, p) {
      return Array.isArray(f) && (p = f, f = {}), o(u, {
        type: "element",
        tagName: c,
        properties: f || {},
        children: p || []
      });
    }
    function l(u, c) {
      return $E(a, u, c);
    }
    function s(u) {
      return fg(a, u);
    }
  }
  function vD(e, t) {
    e.position && (t.position = q5(e));
  }
  function yD(e, t) {
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
  function $E(e, t, n) {
    const r = t && t.type;
    if (!r)
      throw new Error("Expected node, got `" + t + "`");
    return ic.call(e.handlers, r) ? e.handlers[r](e, t, n) : e.passThrough && e.passThrough.includes(r) ? "children" in t ? Q(M({}, t), { children: fg(e, t) }) : t : e.unknownHandler ? e.unknownHandler(e, t, n) : wD(e, t);
  }
  function fg(e, t) {
    const n = [];
    if ("children" in t) {
      const r = t.children;
      let i = -1;
      for (; ++i < r.length; ) {
        const o = $E(e, r[i], t);
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
  function wD(e, t) {
    const n = t.data || {}, r = "value" in t && !(ic.call(n, "hProperties") || ic.call(n, "hChildren")) ? { type: "text", value: t.value } : {
      type: "element",
      tagName: "div",
      properties: {},
      children: fg(e, t)
    };
    return e.patch(t, r), e.applyData(t, r);
  }
  function bD(e, t) {
    const n = [];
    let r = -1;
    for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
      r && n.push({ type: "text", value: `
` }), n.push(e[r]);
    return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
  }
  function SD(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.footnoteOrder.length; ) {
      const r = e.footnoteById[e.footnoteOrder[n]];
      if (!r)
        continue;
      const i = e.all(r), o = String(r.identifier).toUpperCase(), a = fa(o.toLowerCase());
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
            properties: Q(M({}, JSON.parse(JSON.stringify(e.footnoteLabelProperties))), {
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
  function JE(e, t) {
    const n = gD(e, t), r = n.one(e, null), i = SD(n);
    return i && r.children.push({ type: "text", value: `
` }, i), Array.isArray(r) ? { type: "root", children: r } : r;
  }
  const ED = (
    /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
    function(e, t) {
      return e && "run" in e ? CD(e, t) : xD(e || t);
    }
  ), AD = ED;
  function CD(e, t) {
    return (n, r, i) => {
      e.run(JE(n, t), r, (o) => {
        i(o);
      });
    };
  }
  function xD(e) {
    return (t) => JE(t, e);
  }
  class cs {
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
  cs.prototype.property = {};
  cs.prototype.normal = {};
  cs.prototype.space = null;
  function QE(e, t) {
    const n = {}, r = {};
    let i = -1;
    for (; ++i < e.length; )
      Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
    return new cs(n, r, t);
  }
  function vh(e) {
    return e.toLowerCase();
  }
  class En {
    /**
     * @constructor
     * @param {string} property
     * @param {string} attribute
     */
    constructor(t, n) {
      this.property = t, this.attribute = n;
    }
  }
  En.prototype.space = null;
  En.prototype.boolean = !1;
  En.prototype.booleanish = !1;
  En.prototype.overloadedBoolean = !1;
  En.prototype.number = !1;
  En.prototype.commaSeparated = !1;
  En.prototype.spaceSeparated = !1;
  En.prototype.commaOrSpaceSeparated = !1;
  En.prototype.mustUseProperty = !1;
  En.prototype.defined = !1;
  let kD = 0;
  const le = eo(), Xe = eo(), KE = eo(), W = eo(), Te = eo(), Lo = eo(), Yt = eo();
  function eo() {
    return Fg(2, ++kD);
  }
  const yh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    boolean: le,
    booleanish: Xe,
    commaOrSpaceSeparated: Yt,
    commaSeparated: Lo,
    number: W,
    overloadedBoolean: KE,
    spaceSeparated: Te
  }, Symbol.toStringTag, { value: "Module" })), Pp = Object.keys(yh);
  class pg extends En {
    /**
     * @constructor
     * @param {string} property
     * @param {string} attribute
     * @param {number|null} [mask]
     * @param {string} [space]
     */
    constructor(t, n, r, i) {
      let o = -1;
      if (super(t, n), R1(this, "space", i), typeof r == "number")
        for (; ++o < Pp.length; ) {
          const a = Pp[o];
          R1(this, Pp[o], (r & yh[a]) === yh[a]);
        }
    }
  }
  pg.prototype.defined = !0;
  function R1(e, t, n) {
    n && (e[t] = n);
  }
  const OD = {}.hasOwnProperty;
  function pa(e) {
    const t = {}, n = {};
    let r;
    for (r in e.properties)
      if (OD.call(e.properties, r)) {
        const i = e.properties[r], o = new pg(
          r,
          e.transform(e.attributes || {}, r),
          i,
          e.space
        );
        e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[vh(r)] = r, n[vh(o.attribute)] = r;
      }
    return new cs(t, n, e.space);
  }
  const XE = pa({
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
  }), qE = pa({
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
  });
  function ZE(e, t) {
    return t in e ? e[t] : t;
  }
  function eA(e, t) {
    return ZE(e, t.toLowerCase());
  }
  const tA = pa({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: eA,
    properties: { xmlns: null, xmlnsXLink: null }
  }), nA = pa({
    transform(e, t) {
      return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: Xe,
      ariaAutoComplete: null,
      ariaBusy: Xe,
      ariaChecked: Xe,
      ariaColCount: W,
      ariaColIndex: W,
      ariaColSpan: W,
      ariaControls: Te,
      ariaCurrent: null,
      ariaDescribedBy: Te,
      ariaDetails: null,
      ariaDisabled: Xe,
      ariaDropEffect: Te,
      ariaErrorMessage: null,
      ariaExpanded: Xe,
      ariaFlowTo: Te,
      ariaGrabbed: Xe,
      ariaHasPopup: null,
      ariaHidden: Xe,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: Te,
      ariaLevel: W,
      ariaLive: null,
      ariaModal: Xe,
      ariaMultiLine: Xe,
      ariaMultiSelectable: Xe,
      ariaOrientation: null,
      ariaOwns: Te,
      ariaPlaceholder: null,
      ariaPosInSet: W,
      ariaPressed: Xe,
      ariaReadOnly: Xe,
      ariaRelevant: null,
      ariaRequired: Xe,
      ariaRoleDescription: Te,
      ariaRowCount: W,
      ariaRowIndex: W,
      ariaRowSpan: W,
      ariaSelected: Xe,
      ariaSetSize: W,
      ariaSort: null,
      ariaValueMax: W,
      ariaValueMin: W,
      ariaValueNow: W,
      ariaValueText: null,
      role: null
    }
  }), TD = pa({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    transform: eA,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: Lo,
      acceptCharset: Te,
      accessKey: Te,
      action: null,
      allow: null,
      allowFullScreen: le,
      allowPaymentRequest: le,
      allowUserMedia: le,
      alt: null,
      as: null,
      async: le,
      autoCapitalize: null,
      autoComplete: Te,
      autoFocus: le,
      autoPlay: le,
      capture: le,
      charSet: null,
      checked: le,
      cite: null,
      className: Te,
      cols: W,
      colSpan: null,
      content: null,
      contentEditable: Xe,
      controls: le,
      controlsList: Te,
      coords: W | Lo,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: le,
      defer: le,
      dir: null,
      dirName: null,
      disabled: le,
      download: KE,
      draggable: Xe,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: le,
      formTarget: null,
      headers: Te,
      height: W,
      hidden: le,
      high: W,
      href: null,
      hrefLang: null,
      htmlFor: Te,
      httpEquiv: Te,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: le,
      itemId: null,
      itemProp: Te,
      itemRef: Te,
      itemScope: le,
      itemType: Te,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: le,
      low: W,
      manifest: null,
      max: null,
      maxLength: W,
      media: null,
      method: null,
      min: null,
      minLength: W,
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
      optimum: W,
      pattern: null,
      ping: Te,
      placeholder: null,
      playsInline: le,
      poster: null,
      preload: null,
      readOnly: le,
      referrerPolicy: null,
      rel: Te,
      required: le,
      reversed: le,
      rows: W,
      rowSpan: W,
      sandbox: Te,
      scope: null,
      scoped: le,
      seamless: le,
      selected: le,
      shape: null,
      size: W,
      sizes: null,
      slot: null,
      span: W,
      spellCheck: Xe,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: W,
      step: null,
      style: null,
      tabIndex: W,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: le,
      useMap: null,
      value: Xe,
      width: W,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: Te,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: W,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: W,
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
      hSpace: W,
      // `<img>` and `<object>`
      leftMargin: W,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: W,
      // `<body>`
      marginWidth: W,
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
      rightMargin: W,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: Xe,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: W,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: W,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: le,
      disableRemotePlayback: le,
      prefix: null,
      property: null,
      results: W,
      security: null,
      unselectable: null
    }
  }), ID = pa({
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
    transform: ZE,
    properties: {
      about: Yt,
      accentHeight: W,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: W,
      amplitude: W,
      arabicForm: null,
      ascent: W,
      attributeName: null,
      attributeType: null,
      azimuth: W,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: W,
      by: null,
      calcMode: null,
      capHeight: W,
      className: Te,
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
      descent: W,
      diffuseConstant: W,
      direction: null,
      display: null,
      dur: null,
      divisor: W,
      dominantBaseline: null,
      download: le,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: W,
      enableBackground: null,
      end: null,
      event: null,
      exponent: W,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: W,
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
      g1: Lo,
      g2: Lo,
      glyphName: Lo,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: W,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: W,
      horizOriginX: W,
      horizOriginY: W,
      id: null,
      ideographic: W,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: W,
      k: W,
      k1: W,
      k2: W,
      k3: W,
      k4: W,
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
      limitingConeAngle: W,
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
      mediaSize: W,
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
      overlinePosition: W,
      overlineThickness: W,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: W,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: Te,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: W,
      pointsAtY: W,
      pointsAtZ: W,
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
      specularConstant: W,
      specularExponent: W,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: W,
      strikethroughThickness: W,
      string: null,
      stroke: null,
      strokeDashArray: Yt,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: W,
      strokeOpacity: W,
      strokeWidth: null,
      style: null,
      surfaceScale: W,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Yt,
      tabIndex: W,
      tableValues: null,
      target: null,
      targetX: W,
      targetY: W,
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
      underlinePosition: W,
      underlineThickness: W,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: W,
      values: null,
      vAlphabetic: W,
      vMathematical: W,
      vectorEffect: null,
      vHanging: W,
      vIdeographic: W,
      version: null,
      vertAdvY: W,
      vertOriginX: W,
      vertOriginY: W,
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
      xHeight: W,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null
    }
  }), PD = /^data[-\w.:]+$/i, L1 = /-[a-z]/g, _D = /[A-Z]/g;
  function ND(e, t) {
    const n = vh(t);
    let r = t, i = En;
    if (n in e.normal)
      return e.property[e.normal[n]];
    if (n.length > 4 && n.slice(0, 4) === "data" && PD.test(t)) {
      if (t.charAt(4) === "-") {
        const o = t.slice(5).replace(L1, RD);
        r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
      } else {
        const o = t.slice(4);
        if (!L1.test(o)) {
          let a = o.replace(_D, DD);
          a.charAt(0) !== "-" && (a = "-" + a), t = "data" + a;
        }
      }
      i = pg;
    }
    return new i(r, t);
  }
  function DD(e) {
    return "-" + e.toLowerCase();
  }
  function RD(e) {
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
  }, LD = QE([qE, XE, tA, nA, TD], "html"), FD = QE([qE, XE, tA, nA, ID], "svg"), rA = (
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
        return zD;
      if (typeof e == "string")
        return UD(e);
      if (typeof e == "object")
        return Array.isArray(e) ? MD(e) : BD(e);
      if (typeof e == "function")
        return df(e);
      throw new Error("Expected function, string, or object as test");
    }
  );
  function MD(e) {
    const t = [];
    let n = -1;
    for (; ++n < e.length; )
      t[n] = rA(e[n]);
    return df(r);
    function r(...i) {
      let o = -1;
      for (; ++o < t.length; )
        if (t[o].call(this, ...i))
          return !0;
      return !1;
    }
  }
  function BD(e) {
    return df(t);
    function t(n) {
      let r;
      for (r in e)
        if (n[r] !== e[r])
          return !1;
      return !0;
    }
  }
  function UD(e) {
    return df(t);
    function t(n) {
      return n && n.type === e;
    }
  }
  function df(e) {
    return t;
    function t(n, ...r) {
      return Boolean(
        n && typeof n == "object" && "type" in n && // @ts-expect-error: fine.
        Boolean(e.call(this, n, ...r))
      );
    }
  }
  function zD() {
    return !0;
  }
  const WD = !0, M1 = !1, jD = "skip", YD = (
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
      const i = rA(t), o = r ? -1 : 1;
      a(e, void 0, [])();
      function a(l, s, u) {
        const c = l && typeof l == "object" ? l : {};
        if (typeof c.type == "string") {
          const p = (
            // `hast`
            typeof c.tagName == "string" ? c.tagName : (
              // `xast`
              typeof c.name == "string" ? c.name : void 0
            )
          );
          Object.defineProperty(f, "name", {
            value: "node (" + (l.type + (p ? "<" + p + ">" : "")) + ")"
          });
        }
        return f;
        function f() {
          let p = [], d, h, m;
          if ((!t || i(l, s, u[u.length - 1] || null)) && (p = VD(n(l, u)), p[0] === M1))
            return p;
          if (l.children && p[0] !== jD)
            for (h = (r ? l.children.length : -1) + o, m = u.concat(l); h > -1 && h < l.children.length; ) {
              if (d = a(l.children[h], h, m)(), d[0] === M1)
                return d;
              h = typeof d[1] == "number" ? d[1] : h + o;
            }
          return p;
        }
      }
    }
  );
  function VD(e) {
    return Array.isArray(e) ? e : typeof e == "number" ? [WD, e] : [e];
  }
  const GD = (
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
      typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), YD(e, t, i, r);
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
  function HD(e) {
    if (e.allowedElements && e.disallowedElements)
      throw new TypeError(
        "Only one of `allowedElements` and `disallowedElements` should be defined"
      );
    if (e.allowedElements || e.disallowedElements || e.allowElement)
      return (t) => {
        GD(t, "element", (n, r, i) => {
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
  var wh = {}, $D = {
    get exports() {
      return wh;
    },
    set exports(e) {
      wh = e;
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
  var dg = Symbol.for("react.element"), hg = Symbol.for("react.portal"), hf = Symbol.for("react.fragment"), mf = Symbol.for("react.strict_mode"), gf = Symbol.for("react.profiler"), vf = Symbol.for("react.provider"), yf = Symbol.for("react.context"), JD = Symbol.for("react.server_context"), wf = Symbol.for("react.forward_ref"), bf = Symbol.for("react.suspense"), Sf = Symbol.for("react.suspense_list"), Ef = Symbol.for("react.memo"), Af = Symbol.for("react.lazy"), QD = Symbol.for("react.offscreen"), iA;
  iA = Symbol.for("react.module.reference");
  function An(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case dg:
          switch (e = e.type, e) {
            case hf:
            case gf:
            case mf:
            case bf:
            case Sf:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case JD:
                case yf:
                case wf:
                case Af:
                case Ef:
                case vf:
                  return e;
                default:
                  return t;
              }
          }
        case hg:
          return t;
      }
    }
  }
  Se.ContextConsumer = yf;
  Se.ContextProvider = vf;
  Se.Element = dg;
  Se.ForwardRef = wf;
  Se.Fragment = hf;
  Se.Lazy = Af;
  Se.Memo = Ef;
  Se.Portal = hg;
  Se.Profiler = gf;
  Se.StrictMode = mf;
  Se.Suspense = bf;
  Se.SuspenseList = Sf;
  Se.isAsyncMode = function() {
    return !1;
  };
  Se.isConcurrentMode = function() {
    return !1;
  };
  Se.isContextConsumer = function(e) {
    return An(e) === yf;
  };
  Se.isContextProvider = function(e) {
    return An(e) === vf;
  };
  Se.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === dg;
  };
  Se.isForwardRef = function(e) {
    return An(e) === wf;
  };
  Se.isFragment = function(e) {
    return An(e) === hf;
  };
  Se.isLazy = function(e) {
    return An(e) === Af;
  };
  Se.isMemo = function(e) {
    return An(e) === Ef;
  };
  Se.isPortal = function(e) {
    return An(e) === hg;
  };
  Se.isProfiler = function(e) {
    return An(e) === gf;
  };
  Se.isStrictMode = function(e) {
    return An(e) === mf;
  };
  Se.isSuspense = function(e) {
    return An(e) === bf;
  };
  Se.isSuspenseList = function(e) {
    return An(e) === Sf;
  };
  Se.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === hf || e === gf || e === mf || e === bf || e === Sf || e === QD || typeof e == "object" && e !== null && (e.$$typeof === Af || e.$$typeof === Ef || e.$$typeof === vf || e.$$typeof === yf || e.$$typeof === wf || e.$$typeof === iA || e.getModuleId !== void 0);
  };
  Se.typeOf = An;
  (function(e) {
    e.exports = Se;
  })($D);
  const KD = /* @__PURE__ */ Dh(wh);
  function XD(e) {
    const t = (
      // @ts-expect-error looks like a node.
      e && typeof e == "object" && e.type === "text" ? (
        // @ts-expect-error looks like a text.
        e.value || ""
      ) : e
    );
    return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
  }
  function qD(e) {
    return e.join(" ").trim();
  }
  function ZD(e, t) {
    const n = t || {};
    return (e[e.length - 1] === "" ? [...e, ""] : e).join(
      (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
    ).trim();
  }
  var oc = {}, e6 = {
    get exports() {
      return oc;
    },
    set exports(e) {
      oc = e;
    }
  }, B1 = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, t6 = /\n/g, n6 = /^\s*/, r6 = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, i6 = /^:\s*/, o6 = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, a6 = /^[;\s]*/, l6 = /^\s+|\s+$/g, s6 = `
`, U1 = "/", z1 = "*", Ii = "", u6 = "comment", c6 = "declaration", f6 = function(e, t) {
    if (typeof e != "string")
      throw new TypeError("First argument must be a string");
    if (!e)
      return [];
    t = t || {};
    var n = 1, r = 1;
    function i(h) {
      var m = h.match(t6);
      m && (n += m.length);
      var S = h.lastIndexOf(s6);
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
      s(n6);
    }
    function c(h) {
      var m;
      for (h = h || []; m = f(); )
        m !== !1 && h.push(m);
      return h;
    }
    function f() {
      var h = o();
      if (!(U1 != e.charAt(0) || z1 != e.charAt(1))) {
        for (var m = 2; Ii != e.charAt(m) && (z1 != e.charAt(m) || U1 != e.charAt(m + 1)); )
          ++m;
        if (m += 2, Ii === e.charAt(m - 1))
          return l("End of comment missing");
        var S = e.slice(2, m - 2);
        return r += 2, i(S), e = e.slice(m), r += 2, h({
          type: u6,
          comment: S
        });
      }
    }
    function p() {
      var h = o(), m = s(r6);
      if (m) {
        if (f(), !s(i6))
          return l("property missing ':'");
        var S = s(o6), g = h({
          type: c6,
          property: W1(m[0].replace(B1, Ii)),
          value: S ? W1(S[0].replace(B1, Ii)) : Ii
        });
        return s(a6), g;
      }
    }
    function d() {
      var h = [];
      c(h);
      for (var m; m = p(); )
        m !== !1 && (h.push(m), c(h));
      return h;
    }
    return u(), d();
  };
  function W1(e) {
    return e ? e.replace(l6, Ii) : Ii;
  }
  var p6 = f6;
  function oA(e, t) {
    var n = null;
    if (!e || typeof e != "string")
      return n;
    for (var r, i = p6(e), o = typeof t == "function", a, l, s = 0, u = i.length; s < u; s++)
      r = i[s], a = r.property, l = r.value, o ? t(a, l, r) : l && (n || (n = {}), n[a] = l);
    return n;
  }
  e6.exports = oA;
  oc.default = oA;
  const d6 = oc, bh = {}.hasOwnProperty, h6 = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
  function aA(e, t) {
    const n = [];
    let r = -1, i;
    for (; ++r < t.children.length; )
      i = t.children[r], i.type === "element" ? n.push(m6(e, i, r, t)) : i.type === "text" ? (t.type !== "element" || !h6.has(t.tagName) || !XD(i)) && n.push(i.value) : i.type === "raw" && !e.options.skipHtml && n.push(i.value);
    return n;
  }
  function m6(e, t, n, r) {
    const i = e.options, o = i.transformLinkUri === void 0 ? h3 : i.transformLinkUri, a = e.schema, l = t.tagName, s = {};
    let u = a, c;
    if (a.space === "html" && l === "svg" && (u = FD, e.schema = u), t.properties)
      for (c in t.properties)
        bh.call(t.properties, c) && v6(s, c, t.properties[c], e);
    (l === "ol" || l === "ul") && e.listDepth++;
    const f = aA(e, t);
    (l === "ol" || l === "ul") && e.listDepth--, e.schema = a;
    const p = t.position || {
      start: { line: null, column: null, offset: null },
      end: { line: null, column: null, offset: null }
    }, d = i.components && bh.call(i.components, l) ? i.components[l] : l, h = typeof d == "string" || d === k.Fragment;
    if (!KD.isValidElementType(d))
      throw new TypeError(
        `Component for name \`${l}\` not defined or is not renderable`
      );
    if (s.key = [
      l,
      p.start.line,
      p.start.column,
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
      const m = g6(t);
      s.checked = m && m.properties ? Boolean(m.properties.checked) : null, s.index = _p(r, t), s.ordered = r.tagName === "ol";
    }
    return !h && (l === "ol" || l === "ul") && (s.ordered = l === "ol", s.depth = e.listDepth), (l === "td" || l === "th") && (s.align && (s.style || (s.style = {}), s.style.textAlign = s.align, delete s.align), h || (s.isHeader = l === "th")), !h && l === "tr" && r.type === "element" && (s.isHeader = Boolean(r.tagName === "thead")), i.sourcePos && (s["data-sourcepos"] = b6(p)), !h && i.rawSourcePos && (s.sourcePosition = t.position), !h && i.includeElementIndex && (s.index = _p(r, t), s.siblingCount = _p(r)), h || (s.node = t), f.length > 0 ? k.createElement(d, s, f) : k.createElement(d, s);
  }
  function g6(e) {
    let t = -1;
    for (; ++t < e.children.length; ) {
      const n = e.children[t];
      if (n.type === "element" && n.tagName === "input")
        return n;
    }
    return null;
  }
  function _p(e, t) {
    let n = -1, r = 0;
    for (; ++n < e.children.length && e.children[n] !== t; )
      e.children[n].type === "element" && r++;
    return r;
  }
  function v6(e, t, n, r) {
    const i = ND(r.schema, t);
    let o = n;
    o == null || o !== o || (Array.isArray(o) && (o = i.commaSeparated ? ZD(o) : qD(o)), i.property === "style" && typeof o == "string" && (o = y6(o)), i.space && i.property ? e[bh.call(F1, i.property) ? F1[i.property] : i.property] = o : i.attribute && (e[i.attribute] = o));
  }
  function y6(e) {
    const t = {};
    try {
      d6(e, n);
    } catch (r) {
    }
    return t;
    function n(r, i) {
      const o = r.slice(0, 4) === "-ms-" ? `ms-${r.slice(4)}` : r;
      t[o.replace(/-([a-z])/g, w6)] = i;
    }
  }
  function w6(e, t) {
    return t.toUpperCase();
  }
  function b6(e) {
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
  const j1 = {}.hasOwnProperty, S6 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Vs = {
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
  function lA(e) {
    for (const o in Vs)
      if (j1.call(Vs, o) && j1.call(e, o)) {
        const a = Vs[o];
        console.warn(
          `[react-markdown] Warning: please ${a.to ? `use \`${a.to}\` instead of` : "remove"} \`${o}\` (see <${S6}#${a.id}> for more info)`
        ), delete Vs[o];
      }
    const t = T3().use(N5).use(e.remarkPlugins || []).use(AD, Q(M({}, e.remarkRehypeOptions), {
      allowDangerousHtml: !0
    })).use(e.rehypePlugins || []).use(HD, e), n = new CE();
    typeof e.children == "string" ? n.value = e.children : e.children !== void 0 && e.children !== null && console.warn(
      `[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`
    );
    const r = t.runSync(t.parse(n), n);
    if (r.type !== "root")
      throw new TypeError("Expected a `root` node");
    let i = k.createElement(
      k.Fragment,
      {},
      aA({ options: e, schema: LD, listDepth: 0 }, r)
    );
    return e.className && (i = k.createElement("div", { className: e.className }, i)), i;
  }
  lA.propTypes = {
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
  var Y1 = function(t) {
    return t.reduce(function(n, r) {
      var i = r[0], o = r[1];
      return n[i] = o, n;
    }, {});
  }, V1 = typeof window != "undefined" && window.document && window.document.createElement ? J.useLayoutEffect : J.useEffect, Ut = "top", vn = "bottom", yn = "right", zt = "left", mg = "auto", fs = [Ut, vn, yn, zt], Ko = "start", Vl = "end", E6 = "clippingParents", sA = "viewport", Fa = "popper", A6 = "reference", G1 = /* @__PURE__ */ fs.reduce(function(e, t) {
    return e.concat([t + "-" + Ko, t + "-" + Vl]);
  }, []), uA = /* @__PURE__ */ [].concat(fs, [mg]).reduce(function(e, t) {
    return e.concat([t, t + "-" + Ko, t + "-" + Vl]);
  }, []), C6 = "beforeRead", x6 = "read", k6 = "afterRead", O6 = "beforeMain", T6 = "main", I6 = "afterMain", P6 = "beforeWrite", _6 = "write", N6 = "afterWrite", D6 = [C6, x6, k6, O6, T6, I6, P6, _6, N6];
  function ir(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function Cn(e) {
    if (e == null)
      return window;
    if (e.toString() !== "[object Window]") {
      var t = e.ownerDocument;
      return t && t.defaultView || window;
    }
    return e;
  }
  function Hi(e) {
    var t = Cn(e).Element;
    return e instanceof t || e instanceof Element;
  }
  function hn(e) {
    var t = Cn(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement;
  }
  function gg(e) {
    if (typeof ShadowRoot == "undefined")
      return !1;
    var t = Cn(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
  }
  function R6(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(n) {
      var r = t.styles[n] || {}, i = t.attributes[n] || {}, o = t.elements[n];
      !hn(o) || !ir(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(a) {
        var l = i[a];
        l === !1 ? o.removeAttribute(a) : o.setAttribute(a, l === !0 ? "" : l);
      }));
    });
  }
  function L6(e) {
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
        !hn(i) || !ir(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(s) {
          i.removeAttribute(s);
        }));
      });
    };
  }
  const F6 = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: R6,
    effect: L6,
    requires: ["computeStyles"]
  };
  function er(e) {
    return e.split("-")[0];
  }
  var Mi = Math.max, ac = Math.min, Xo = Math.round;
  function Sh() {
    var e = navigator.userAgentData;
    return e != null && e.brands ? e.brands.map(function(t) {
      return t.brand + "/" + t.version;
    }).join(" ") : navigator.userAgent;
  }
  function cA() {
    return !/^((?!chrome|android).)*safari/i.test(Sh());
  }
  function qo(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    var r = e.getBoundingClientRect(), i = 1, o = 1;
    t && hn(e) && (i = e.offsetWidth > 0 && Xo(r.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && Xo(r.height) / e.offsetHeight || 1);
    var a = Hi(e) ? Cn(e) : window, l = a.visualViewport, s = !cA() && n, u = (r.left + (s && l ? l.offsetLeft : 0)) / i, c = (r.top + (s && l ? l.offsetTop : 0)) / o, f = r.width / i, p = r.height / o;
    return {
      width: f,
      height: p,
      top: c,
      right: u + f,
      bottom: c + p,
      left: u,
      x: u,
      y: c
    };
  }
  function vg(e) {
    var t = qo(e), n = e.offsetWidth, r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: n,
      height: r
    };
  }
  function fA(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t))
      return !0;
    if (n && gg(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r))
          return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function kr(e) {
    return Cn(e).getComputedStyle(e);
  }
  function M6(e) {
    return ["table", "td", "th"].indexOf(ir(e)) >= 0;
  }
  function yi(e) {
    return ((Hi(e) ? e.ownerDocument : (
      // $FlowFixMe[prop-missing]
      e.document
    )) || window.document).documentElement;
  }
  function Cf(e) {
    return ir(e) === "html" ? e : (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      e.parentNode || // DOM Element detected
      (gg(e) ? e.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      yi(e)
    );
  }
  function H1(e) {
    return !hn(e) || // https://github.com/popperjs/popper-core/issues/837
    kr(e).position === "fixed" ? null : e.offsetParent;
  }
  function B6(e) {
    var t = /firefox/i.test(Sh()), n = /Trident/i.test(Sh());
    if (n && hn(e)) {
      var r = kr(e);
      if (r.position === "fixed")
        return null;
    }
    var i = Cf(e);
    for (gg(i) && (i = i.host); hn(i) && ["html", "body"].indexOf(ir(i)) < 0; ) {
      var o = kr(i);
      if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
        return i;
      i = i.parentNode;
    }
    return null;
  }
  function ps(e) {
    for (var t = Cn(e), n = H1(e); n && M6(n) && kr(n).position === "static"; )
      n = H1(n);
    return n && (ir(n) === "html" || ir(n) === "body" && kr(n).position === "static") ? t : n || B6(e) || t;
  }
  function yg(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function fl(e, t, n) {
    return Mi(e, ac(t, n));
  }
  function U6(e, t, n) {
    var r = fl(e, t, n);
    return r > n ? n : r;
  }
  function pA() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  function dA(e) {
    return Object.assign({}, pA(), e);
  }
  function hA(e, t) {
    return t.reduce(function(n, r) {
      return n[r] = e, n;
    }, {});
  }
  var z6 = function(t, n) {
    return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
      placement: n.placement
    })) : t, dA(typeof t != "number" ? t : hA(t, fs));
  };
  function W6(e) {
    var t, n = e.state, r = e.name, i = e.options, o = n.elements.arrow, a = n.modifiersData.popperOffsets, l = er(n.placement), s = yg(l), u = [zt, yn].indexOf(l) >= 0, c = u ? "height" : "width";
    if (!(!o || !a)) {
      var f = z6(i.padding, n), p = vg(o), d = s === "y" ? Ut : zt, h = s === "y" ? vn : yn, m = n.rects.reference[c] + n.rects.reference[s] - a[s] - n.rects.popper[c], S = a[s] - n.rects.reference[s], g = ps(o), v = g ? s === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, w = m / 2 - S / 2, E = f[d], O = v - p[c] - f[h], b = v / 2 - p[c] / 2 + w, A = fl(E, b, O), T = s;
      n.modifiersData[r] = (t = {}, t[T] = A, t.centerOffset = A - b, t);
    }
  }
  function j6(e) {
    var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
    i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || fA(t.elements.popper, i) && (t.elements.arrow = i));
  }
  const Y6 = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: W6,
    effect: j6,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function Zo(e) {
    return e.split("-")[1];
  }
  var V6 = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function G6(e) {
    var t = e.x, n = e.y, r = window, i = r.devicePixelRatio || 1;
    return {
      x: Xo(t * i) / i || 0,
      y: Xo(n * i) / i || 0
    };
  }
  function $1(e) {
    var t, n = e.popper, r = e.popperRect, i = e.placement, o = e.variation, a = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, p = a.x, d = p === void 0 ? 0 : p, h = a.y, m = h === void 0 ? 0 : h, S = typeof c == "function" ? c({
      x: d,
      y: m
    }) : {
      x: d,
      y: m
    };
    d = S.x, m = S.y;
    var g = a.hasOwnProperty("x"), v = a.hasOwnProperty("y"), w = zt, E = Ut, O = window;
    if (u) {
      var b = ps(n), A = "clientHeight", T = "clientWidth";
      if (b === Cn(n) && (b = yi(n), kr(b).position !== "static" && l === "absolute" && (A = "scrollHeight", T = "scrollWidth")), b = b, i === Ut || (i === zt || i === yn) && o === Vl) {
        E = vn;
        var P = f && b === O && O.visualViewport ? O.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          b[A]
        );
        m -= P - r.height, m *= s ? 1 : -1;
      }
      if (i === zt || (i === Ut || i === vn) && o === Vl) {
        w = yn;
        var _ = f && b === O && O.visualViewport ? O.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          b[T]
        );
        d -= _ - r.width, d *= s ? 1 : -1;
      }
    }
    var I = Object.assign({
      position: l
    }, u && V6), F = c === !0 ? G6({
      x: d,
      y: m
    }) : {
      x: d,
      y: m
    };
    if (d = F.x, m = F.y, s) {
      var U;
      return Object.assign({}, I, (U = {}, U[E] = v ? "0" : "", U[w] = g ? "0" : "", U.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + m + "px)" : "translate3d(" + d + "px, " + m + "px, 0)", U));
    }
    return Object.assign({}, I, (t = {}, t[E] = v ? m + "px" : "", t[w] = g ? d + "px" : "", t.transform = "", t));
  }
  function H6(e) {
    var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, o = n.adaptive, a = o === void 0 ? !0 : o, l = n.roundOffsets, s = l === void 0 ? !0 : l, u = {
      placement: er(t.placement),
      variation: Zo(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed"
    };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, $1(Object.assign({}, u, {
      offsets: t.modifiersData.popperOffsets,
      position: t.options.strategy,
      adaptive: a,
      roundOffsets: s
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, $1(Object.assign({}, u, {
      offsets: t.modifiersData.arrow,
      position: "absolute",
      adaptive: !1,
      roundOffsets: s
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement
    });
  }
  const $6 = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: H6,
    data: {}
  };
  var Gs = {
    passive: !0
  };
  function J6(e) {
    var t = e.state, n = e.instance, r = e.options, i = r.scroll, o = i === void 0 ? !0 : i, a = r.resize, l = a === void 0 ? !0 : a, s = Cn(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return o && u.forEach(function(c) {
      c.addEventListener("scroll", n.update, Gs);
    }), l && s.addEventListener("resize", n.update, Gs), function() {
      o && u.forEach(function(c) {
        c.removeEventListener("scroll", n.update, Gs);
      }), l && s.removeEventListener("resize", n.update, Gs);
    };
  }
  const Q6 = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {
    },
    effect: J6,
    data: {}
  };
  var K6 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function du(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
      return K6[t];
    });
  }
  var X6 = {
    start: "end",
    end: "start"
  };
  function J1(e) {
    return e.replace(/start|end/g, function(t) {
      return X6[t];
    });
  }
  function wg(e) {
    var t = Cn(e), n = t.pageXOffset, r = t.pageYOffset;
    return {
      scrollLeft: n,
      scrollTop: r
    };
  }
  function bg(e) {
    return qo(yi(e)).left + wg(e).scrollLeft;
  }
  function q6(e, t) {
    var n = Cn(e), r = yi(e), i = n.visualViewport, o = r.clientWidth, a = r.clientHeight, l = 0, s = 0;
    if (i) {
      o = i.width, a = i.height;
      var u = cA();
      (u || !u && t === "fixed") && (l = i.offsetLeft, s = i.offsetTop);
    }
    return {
      width: o,
      height: a,
      x: l + bg(e),
      y: s
    };
  }
  function Z6(e) {
    var t, n = yi(e), r = wg(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, o = Mi(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = Mi(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + bg(e), s = -r.scrollTop;
    return kr(i || n).direction === "rtl" && (l += Mi(n.clientWidth, i ? i.clientWidth : 0) - o), {
      width: o,
      height: a,
      x: l,
      y: s
    };
  }
  function Sg(e) {
    var t = kr(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r);
  }
  function mA(e) {
    return ["html", "body", "#document"].indexOf(ir(e)) >= 0 ? e.ownerDocument.body : hn(e) && Sg(e) ? e : mA(Cf(e));
  }
  function pl(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = mA(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = Cn(r), a = i ? [o].concat(o.visualViewport || [], Sg(r) ? r : []) : r, l = t.concat(a);
    return i ? l : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(pl(Cf(a)))
    );
  }
  function Eh(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height
    });
  }
  function eR(e, t) {
    var n = qo(e, !1, t === "fixed");
    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
  }
  function Q1(e, t, n) {
    return t === sA ? Eh(q6(e, n)) : Hi(t) ? eR(t, n) : Eh(Z6(yi(e)));
  }
  function tR(e) {
    var t = pl(Cf(e)), n = ["absolute", "fixed"].indexOf(kr(e).position) >= 0, r = n && hn(e) ? ps(e) : e;
    return Hi(r) ? t.filter(function(i) {
      return Hi(i) && fA(i, r) && ir(i) !== "body";
    }) : [];
  }
  function nR(e, t, n, r) {
    var i = t === "clippingParents" ? tR(e) : [].concat(t), o = [].concat(i, [n]), a = o[0], l = o.reduce(function(s, u) {
      var c = Q1(e, u, r);
      return s.top = Mi(c.top, s.top), s.right = ac(c.right, s.right), s.bottom = ac(c.bottom, s.bottom), s.left = Mi(c.left, s.left), s;
    }, Q1(e, a, r));
    return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
  }
  function gA(e) {
    var t = e.reference, n = e.element, r = e.placement, i = r ? er(r) : null, o = r ? Zo(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, s;
    switch (i) {
      case Ut:
        s = {
          x: a,
          y: t.y - n.height
        };
        break;
      case vn:
        s = {
          x: a,
          y: t.y + t.height
        };
        break;
      case yn:
        s = {
          x: t.x + t.width,
          y: l
        };
        break;
      case zt:
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
    var u = i ? yg(i) : null;
    if (u != null) {
      var c = u === "y" ? "height" : "width";
      switch (o) {
        case Ko:
          s[u] = s[u] - (t[c] / 2 - n[c] / 2);
          break;
        case Vl:
          s[u] = s[u] + (t[c] / 2 - n[c] / 2);
          break;
      }
    }
    return s;
  }
  function Gl(e, t) {
    t === void 0 && (t = {});
    var n = t, r = n.placement, i = r === void 0 ? e.placement : r, o = n.strategy, a = o === void 0 ? e.strategy : o, l = n.boundary, s = l === void 0 ? E6 : l, u = n.rootBoundary, c = u === void 0 ? sA : u, f = n.elementContext, p = f === void 0 ? Fa : f, d = n.altBoundary, h = d === void 0 ? !1 : d, m = n.padding, S = m === void 0 ? 0 : m, g = dA(typeof S != "number" ? S : hA(S, fs)), v = p === Fa ? A6 : Fa, w = e.rects.popper, E = e.elements[h ? v : p], O = nR(Hi(E) ? E : E.contextElement || yi(e.elements.popper), s, c, a), b = qo(e.elements.reference), A = gA({
      reference: b,
      element: w,
      strategy: "absolute",
      placement: i
    }), T = Eh(Object.assign({}, w, A)), P = p === Fa ? T : b, _ = {
      top: O.top - P.top + g.top,
      bottom: P.bottom - O.bottom + g.bottom,
      left: O.left - P.left + g.left,
      right: P.right - O.right + g.right
    }, I = e.modifiersData.offset;
    if (p === Fa && I) {
      var F = I[i];
      Object.keys(_).forEach(function(U) {
        var q = [yn, vn].indexOf(U) >= 0 ? 1 : -1, oe = [Ut, vn].indexOf(U) >= 0 ? "y" : "x";
        _[U] += F[oe] * q;
      });
    }
    return _;
  }
  function rR(e, t) {
    t === void 0 && (t = {});
    var n = t, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding, l = n.flipVariations, s = n.allowedAutoPlacements, u = s === void 0 ? uA : s, c = Zo(r), f = c ? l ? G1 : G1.filter(function(h) {
      return Zo(h) === c;
    }) : fs, p = f.filter(function(h) {
      return u.indexOf(h) >= 0;
    });
    p.length === 0 && (p = f);
    var d = p.reduce(function(h, m) {
      return h[m] = Gl(e, {
        placement: m,
        boundary: i,
        rootBoundary: o,
        padding: a
      })[er(m)], h;
    }, {});
    return Object.keys(d).sort(function(h, m) {
      return d[h] - d[m];
    });
  }
  function iR(e) {
    if (er(e) === mg)
      return [];
    var t = du(e);
    return [J1(e), t, J1(t)];
  }
  function oR(e) {
    var t = e.state, n = e.options, r = e.name;
    if (!t.modifiersData[r]._skip) {
      for (var i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !0 : a, s = n.fallbackPlacements, u = n.padding, c = n.boundary, f = n.rootBoundary, p = n.altBoundary, d = n.flipVariations, h = d === void 0 ? !0 : d, m = n.allowedAutoPlacements, S = t.options.placement, g = er(S), v = g === S, w = s || (v || !h ? [du(S)] : iR(S)), E = [S].concat(w).reduce(function(He, Qe) {
        return He.concat(er(Qe) === mg ? rR(t, {
          placement: Qe,
          boundary: c,
          rootBoundary: f,
          padding: u,
          flipVariations: h,
          allowedAutoPlacements: m
        }) : Qe);
      }, []), O = t.rects.reference, b = t.rects.popper, A = /* @__PURE__ */ new Map(), T = !0, P = E[0], _ = 0; _ < E.length; _++) {
        var I = E[_], F = er(I), U = Zo(I) === Ko, q = [Ut, vn].indexOf(F) >= 0, oe = q ? "width" : "height", ne = Gl(t, {
          placement: I,
          boundary: c,
          rootBoundary: f,
          altBoundary: p,
          padding: u
        }), fe = q ? U ? yn : zt : U ? vn : Ut;
        O[oe] > b[oe] && (fe = du(fe));
        var B = du(fe), V = [];
        if (o && V.push(ne[F] <= 0), l && V.push(ne[fe] <= 0, ne[B] <= 0), V.every(function(He) {
          return He;
        })) {
          P = I, T = !1;
          break;
        }
        A.set(I, V);
      }
      if (T)
        for (var H = h ? 3 : 1, x = function(Qe) {
          var me = E.find(function(We) {
            var st = A.get(We);
            if (st)
              return st.slice(0, Qe).every(function(xn) {
                return xn;
              });
          });
          if (me)
            return P = me, "break";
        }, C = H; C > 0; C--) {
          var tt = x(C);
          if (tt === "break")
            break;
        }
      t.placement !== P && (t.modifiersData[r]._skip = !0, t.placement = P, t.reset = !0);
    }
  }
  const aR = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: oR,
    requiresIfExists: ["offset"],
    data: {
      _skip: !1
    }
  };
  function K1(e, t, n) {
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
    return [Ut, yn, vn, zt].some(function(t) {
      return e[t] >= 0;
    });
  }
  function lR(e) {
    var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, o = t.modifiersData.preventOverflow, a = Gl(t, {
      elementContext: "reference"
    }), l = Gl(t, {
      altBoundary: !0
    }), s = K1(a, r), u = K1(l, i, o), c = X1(s), f = X1(u);
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
  const sR = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: lR
  };
  function uR(e, t, n) {
    var r = er(e), i = [zt, Ut].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, {
      placement: e
    })) : n, a = o[0], l = o[1];
    return a = a || 0, l = (l || 0) * i, [zt, yn].indexOf(r) >= 0 ? {
      x: l,
      y: a
    } : {
      x: a,
      y: l
    };
  }
  function cR(e) {
    var t = e.state, n = e.options, r = e.name, i = n.offset, o = i === void 0 ? [0, 0] : i, a = uA.reduce(function(c, f) {
      return c[f] = uR(f, t.rects, o), c;
    }, {}), l = a[t.placement], s = l.x, u = l.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
  }
  const fR = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: cR
  };
  function pR(e) {
    var t = e.state, n = e.name;
    t.modifiersData[n] = gA({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement
    });
  }
  const dR = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: pR,
    data: {}
  };
  function hR(e) {
    return e === "x" ? "y" : "x";
  }
  function mR(e) {
    var t = e.state, n = e.options, r = e.name, i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !1 : a, s = n.boundary, u = n.rootBoundary, c = n.altBoundary, f = n.padding, p = n.tether, d = p === void 0 ? !0 : p, h = n.tetherOffset, m = h === void 0 ? 0 : h, S = Gl(t, {
      boundary: s,
      rootBoundary: u,
      padding: f,
      altBoundary: c
    }), g = er(t.placement), v = Zo(t.placement), w = !v, E = yg(g), O = hR(E), b = t.modifiersData.popperOffsets, A = t.rects.reference, T = t.rects.popper, P = typeof m == "function" ? m(Object.assign({}, t.rects, {
      placement: t.placement
    })) : m, _ = typeof P == "number" ? {
      mainAxis: P,
      altAxis: P
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, P), I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, F = {
      x: 0,
      y: 0
    };
    if (b) {
      if (o) {
        var U, q = E === "y" ? Ut : zt, oe = E === "y" ? vn : yn, ne = E === "y" ? "height" : "width", fe = b[E], B = fe + S[q], V = fe - S[oe], H = d ? -T[ne] / 2 : 0, x = v === Ko ? A[ne] : T[ne], C = v === Ko ? -T[ne] : -A[ne], tt = t.elements.arrow, He = d && tt ? vg(tt) : {
          width: 0,
          height: 0
        }, Qe = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : pA(), me = Qe[q], We = Qe[oe], st = fl(0, A[ne], He[ne]), xn = w ? A[ne] / 2 - H - st - me - _.mainAxis : x - st - me - _.mainAxis, kn = w ? -A[ne] / 2 + H + st + We + _.mainAxis : C + st + We + _.mainAxis, bi = t.elements.arrow && ps(t.elements.arrow), vs = bi ? E === "y" ? bi.clientTop || 0 : bi.clientLeft || 0 : 0, ys = (U = I == null ? void 0 : I[E]) != null ? U : 0, Pf = fe + xn - ys - vs, _f = fe + kn - ys, ha = fl(d ? ac(B, Pf) : B, fe, d ? Mi(V, _f) : V);
        b[E] = ha, F[E] = ha - fe;
      }
      if (l) {
        var ma, ws = E === "x" ? Ut : zt, Nf = E === "x" ? vn : yn, jn = b[O], Si = O === "y" ? "height" : "width", bs = jn + S[ws], Ss = jn - S[Nf], ga = [Ut, zt].indexOf(g) !== -1, Es = (ma = I == null ? void 0 : I[O]) != null ? ma : 0, As = ga ? bs : jn - A[Si] - T[Si] - Es + _.altAxis, R = ga ? jn + A[Si] + T[Si] - Es - _.altAxis : Ss, j = d && ga ? U6(As, jn, R) : fl(d ? As : bs, jn, d ? R : Ss);
        b[O] = j, F[O] = j - jn;
      }
      t.modifiersData[r] = F;
    }
  }
  const gR = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: mR,
    requiresIfExists: ["offset"]
  };
  function vR(e) {
    return {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop
    };
  }
  function yR(e) {
    return e === Cn(e) || !hn(e) ? wg(e) : vR(e);
  }
  function wR(e) {
    var t = e.getBoundingClientRect(), n = Xo(t.width) / e.offsetWidth || 1, r = Xo(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1;
  }
  function bR(e, t, n) {
    n === void 0 && (n = !1);
    var r = hn(t), i = hn(t) && wR(t), o = yi(t), a = qo(e, i, n), l = {
      scrollLeft: 0,
      scrollTop: 0
    }, s = {
      x: 0,
      y: 0
    };
    return (r || !r && !n) && ((ir(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    Sg(o)) && (l = yR(t)), hn(t) ? (s = qo(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : o && (s.x = bg(o))), {
      x: a.left + l.scrollLeft - s.x,
      y: a.top + l.scrollTop - s.y,
      width: a.width,
      height: a.height
    };
  }
  function SR(e) {
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
  function ER(e) {
    var t = SR(e);
    return D6.reduce(function(n, r) {
      return n.concat(t.filter(function(i) {
        return i.phase === r;
      }));
    }, []);
  }
  function AR(e) {
    var t;
    return function() {
      return t || (t = new Promise(function(n) {
        Promise.resolve().then(function() {
          t = void 0, n(e());
        });
      })), t;
    };
  }
  function CR(e) {
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
  var q1 = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function Z1() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function(r) {
      return !(r && typeof r.getBoundingClientRect == "function");
    });
  }
  function xR(e) {
    e === void 0 && (e = {});
    var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, o = i === void 0 ? q1 : i;
    return function(l, s, u) {
      u === void 0 && (u = o);
      var c = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, q1, o),
        modifiersData: {},
        elements: {
          reference: l,
          popper: s
        },
        attributes: {},
        styles: {}
      }, f = [], p = !1, d = {
        state: c,
        setOptions: function(g) {
          var v = typeof g == "function" ? g(c.options) : g;
          m(), c.options = Object.assign({}, o, c.options, v), c.scrollParents = {
            reference: Hi(l) ? pl(l) : l.contextElement ? pl(l.contextElement) : [],
            popper: pl(s)
          };
          var w = ER(CR([].concat(r, c.options.modifiers)));
          return c.orderedModifiers = w.filter(function(E) {
            return E.enabled;
          }), h(), d.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function() {
          if (!p) {
            var g = c.elements, v = g.reference, w = g.popper;
            if (Z1(v, w)) {
              c.rects = {
                reference: bR(v, ps(w), c.options.strategy === "fixed"),
                popper: vg(w)
              }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(_) {
                return c.modifiersData[_.name] = Object.assign({}, _.data);
              });
              for (var E = 0; E < c.orderedModifiers.length; E++) {
                if (c.reset === !0) {
                  c.reset = !1, E = -1;
                  continue;
                }
                var O = c.orderedModifiers[E], b = O.fn, A = O.options, T = A === void 0 ? {} : A, P = O.name;
                typeof b == "function" && (c = b({
                  state: c,
                  options: T,
                  name: P,
                  instance: d
                }) || c);
              }
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: AR(function() {
          return new Promise(function(S) {
            d.forceUpdate(), S(c);
          });
        }),
        destroy: function() {
          m(), p = !0;
        }
      };
      if (!Z1(l, s))
        return d;
      d.setOptions(u).then(function(S) {
        !p && u.onFirstUpdate && u.onFirstUpdate(S);
      });
      function h() {
        c.orderedModifiers.forEach(function(S) {
          var g = S.name, v = S.options, w = v === void 0 ? {} : v, E = S.effect;
          if (typeof E == "function") {
            var O = E({
              state: c,
              name: g,
              instance: d,
              options: w
            }), b = function() {
            };
            f.push(O || b);
          }
        });
      }
      function m() {
        f.forEach(function(S) {
          return S();
        }), f = [];
      }
      return d;
    };
  }
  var kR = [Q6, dR, $6, F6, fR, aR, gR, Y6, sR], OR = /* @__PURE__ */ xR({
    defaultModifiers: kR
  }), TR = typeof Element != "undefined", IR = typeof Map == "function", PR = typeof Set == "function", _R = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function hu(e, t) {
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
          if (!hu(e[r], t[r]))
            return !1;
        return !0;
      }
      var o;
      if (IR && e instanceof Map && t instanceof Map) {
        if (e.size !== t.size)
          return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!t.has(r.value[0]))
            return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!hu(r.value[1], t.get(r.value[0])))
            return !1;
        return !0;
      }
      if (PR && e instanceof Set && t instanceof Set) {
        if (e.size !== t.size)
          return !1;
        for (o = e.entries(); !(r = o.next()).done; )
          if (!t.has(r.value[0]))
            return !1;
        return !0;
      }
      if (_R && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
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
      if (TR && e instanceof Element)
        return !1;
      for (r = n; r-- !== 0; )
        if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && e.$$typeof) && !hu(e[i[r]], t[i[r]]))
          return !1;
      return !0;
    }
    return e !== e && t !== t;
  }
  var NR = function(t, n) {
    try {
      return hu(t, n);
    } catch (r) {
      if ((r.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw r;
    }
  }, DR = [], RR = function(t, n, r) {
    r === void 0 && (r = {});
    var i = J.useRef(null), o = {
      onFirstUpdate: r.onFirstUpdate,
      placement: r.placement || "bottom",
      strategy: r.strategy || "absolute",
      modifiers: r.modifiers || DR
    }, a = J.useState({
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
    }), l = a[0], s = a[1], u = J.useMemo(function() {
      return {
        name: "updateState",
        enabled: !0,
        phase: "write",
        fn: function(d) {
          var h = d.state, m = Object.keys(h.elements);
          oi.flushSync(function() {
            s({
              styles: Y1(m.map(function(S) {
                return [S, h.styles[S] || {}];
              })),
              attributes: Y1(m.map(function(S) {
                return [S, h.attributes[S]];
              }))
            });
          });
        },
        requires: ["computeStyles"]
      };
    }, []), c = J.useMemo(function() {
      var p = {
        onFirstUpdate: o.onFirstUpdate,
        placement: o.placement,
        strategy: o.strategy,
        modifiers: [].concat(o.modifiers, [u, {
          name: "applyStyles",
          enabled: !1
        }])
      };
      return NR(i.current, p) ? i.current || p : (i.current = p, p);
    }, [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, u]), f = J.useRef();
    return V1(function() {
      f.current && f.current.setOptions(c);
    }, [c]), V1(function() {
      if (!(t == null || n == null)) {
        var p = r.createPopper || OR, d = p(t, n, c);
        return f.current = d, function() {
          d.destroy(), f.current = null;
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
  const LR = "_popover_m2pq3_1", FR = "_textContent_m2pq3_11", MR = "_popperArrow_m2pq3_26", BR = "_popoverMarkdown_m2pq3_60", Hs = {
    popover: LR,
    textContent: FR,
    popperArrow: MR,
    popoverMarkdown: BR
  }, Eg = ({
    placement: e = "right",
    showOn: t = "hover",
    popoverContent: n,
    contentIsMd: r = !1,
    bgColor: i,
    openDelayMs: o = 0,
    triggerEl: a
  }) => {
    const [l, s] = k.useState(null), [u, c] = k.useState(null), [f, p] = k.useState(
      null
    ), { styles: d, attributes: h, update: m } = RR(
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
    ), S = k.useMemo(() => Q(M({}, d.popper), { backgroundColor: i }), [i, d.popper]), g = k.useMemo(() => {
      let w;
      function E() {
        w = setTimeout(() => {
          m == null || m(), u == null || u.setAttribute("data-show", "");
        }, o);
      }
      function O() {
        clearTimeout(w), u == null || u.removeAttribute("data-show");
      }
      return {
        [t === "hover" ? "onMouseEnter" : "onClick"]: () => E(),
        onMouseLeave: () => O(),
        // Some popover items are interactable with and in this case we don't want
        // the popover to stay up if the user has decided to interact with it
        onPointerDown: () => O()
      };
    }, [o, u, t, m]), v = typeof n != "string" ? n : r ? /* @__PURE__ */ y(lA, { className: Hs.popoverMarkdown, children: n }) : /* @__PURE__ */ y("div", { className: Hs.textContent, children: n });
    return /* @__PURE__ */ L(et, { children: [
      k.cloneElement(a, Q(M({}, g), {
        ref: s
      })),
      /* @__PURE__ */ L(
        "div",
        Q(M({
          ref: c,
          className: Hs.popover,
          style: S
        }, h.popper), {
          children: [
            v,
            /* @__PURE__ */ y(
              "div",
              {
                ref: p,
                className: Hs.popperArrow,
                style: d.arrow
              }
            )
          ]
        })
      )
    ] });
  }, vA = (l) => {
    var s = l, {
      children: e,
      placement: t = "right",
      showOn: n = "hover",
      popoverContent: r,
      bgColor: i,
      openDelayMs: o = 0
    } = s, a = it(s, [
      "children",
      "placement",
      "showOn",
      "popoverContent",
      "bgColor",
      "openDelayMs"
    ]);
    return /* @__PURE__ */ y(
      Eg,
      {
        placement: t,
        showOn: n,
        popoverContent: r,
        bgColor: i,
        openDelayMs: o,
        triggerEl: /* @__PURE__ */ y("button", Q(M({}, a), { children: e }))
      }
    );
  }, UR = "_infoIcon_15ri6_1", zR = "_container_15ri6_10", WR = "_header_15ri6_15", jR = "_info_15ri6_1", YR = "_unit_15ri6_27", VR = "_description_15ri6_31", so = {
    infoIcon: UR,
    container: zR,
    header: WR,
    info: jR,
    unit: YR,
    description: VR
  }, GR = ({ units: e }) => /* @__PURE__ */ y(
    vA,
    {
      className: so.infoIcon,
      popoverContent: /* @__PURE__ */ y(HR, { units: e }),
      openDelayMs: 500,
      placement: "auto",
      children: /* @__PURE__ */ y(vI, {})
    }
  );
  function HR({ units: e }) {
    return /* @__PURE__ */ L("div", { className: so.container, children: [
      /* @__PURE__ */ y("div", { className: so.header, children: "CSS size options" }),
      /* @__PURE__ */ y("div", { className: so.info, children: e.map((t) => /* @__PURE__ */ L(k.Fragment, { children: [
        /* @__PURE__ */ y("div", { className: so.unit, children: t }),
        /* @__PURE__ */ y("div", { className: so.description, children: $R[t] })
      ] }, t)) })
    ] });
  }
  const $R = {
    "%": "Relative to percentage of container size",
    auto: "Let the content decide size",
    fr: "Relative unit. E.g. 2fr is twice the size of 1fr",
    px: "Screen pixels",
    rem: "Pixel size of app font. Typically 16 pixels."
  }, JR = "_wrapper_3jy8f_1", QR = "_unitSelector_3jy8f_9", yA = {
    wrapper: JR,
    unitSelector: QR
  };
  function wA({
    unit: e,
    availableUnits: t,
    onChange: n
  }) {
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(
        "select",
        {
          className: yA.unitSelector,
          "aria-label": "value-unit",
          name: "value-unit",
          value: e,
          onChange: (r) => n(r.target.value),
          children: t.map((r) => /* @__PURE__ */ y("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ y(GR, { units: t })
    ] });
  }
  function Or(e) {
    return e + "-label";
  }
  function KR({
    id: e,
    label: t,
    value: n,
    onChange: r
  }) {
    return /* @__PURE__ */ y(
      xf,
      {
        id: e,
        "aria-label": t,
        "aria-labelledby": Or(e),
        value: n,
        onChange: r
      }
    );
  }
  function xf(l) {
    var s = l, {
      value: e,
      onChange: t,
      min: n = 0,
      max: r,
      step: i,
      disabled: o
    } = s, a = it(s, [
      "value",
      "onChange",
      "min",
      "max",
      "step",
      "disabled"
    ]);
    const { displayedVal: u, handleChange: c, handleBlur: f, incrementUp: p, incrementDown: d } = XR({
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
            Q(M({}, a), {
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
                onClick: p,
                type: "button",
                children: /* @__PURE__ */ y(SI, {})
              }
            ),
            /* @__PURE__ */ y(
              "button",
              {
                className: "down-button",
                "aria-label": "Increment number down",
                onClick: d,
                type: "button",
                children: /* @__PURE__ */ y(yI, {})
              }
            )
          ] })
        ]
      }
    );
  }
  function XR({
    min: e = -1 / 0,
    max: t = 1 / 0,
    step: n = 1,
    value: r,
    onChange: i
  }) {
    const o = k.useCallback(
      (d) => (h) => {
        if (h.preventDefault(), typeof r != "number" || typeof n != "number")
          return;
        const m = r + (d === "up" ? 1 : -1) * n;
        typeof e == "number" && e > m || typeof t == "number" && t < m || i(m);
      },
      [t, e, i, n, r]
    ), a = k.useMemo(
      () => o("up"),
      [o]
    ), l = k.useMemo(
      () => o("down"),
      [o]
    ), [s, u] = k.useState(r);
    k.useEffect(() => u(r), [r]);
    const c = k.useCallback(
      (d) => {
        const h = d.target.value;
        u(
          (m) => Number(m) === Number(h) ? m : h
        ), i(Number(h));
      },
      [i]
    ), f = k.useCallback(() => {
      u((d) => Number(d).toString());
    }, []);
    return {
      incrementUp: a,
      incrementDown: l,
      handleChange: c,
      displayedVal: s === 0 || s === null ? "" : s,
      handleBlur: f
    };
  }
  function qR({
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
  function wi(a) {
    var l = a, {
      text: e,
      position: t = "down",
      size: n,
      children: r,
      variant: i = "icon"
    } = l, o = it(l, [
      "text",
      "position",
      "size",
      "children",
      "variant"
    ]);
    return /* @__PURE__ */ y(
      dt,
      Q(M({
        "aria-label": e,
        "data-balloon-pos": t,
        "data-balloon-length": n,
        variant: i
      }, o), {
        children: r
      })
    );
  }
  function e0(e, t) {
    const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
    return Array.from({ length: n }, (i, o) => e + o * r);
  }
  function ZR({
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
  function t0(e) {
    return e.split(" ");
  }
  function eL(e) {
    const t = e.match(/"([.\w\s]+)"/g);
    if (!t)
      throw new Error("Can't parse area definition");
    return t.map((n) => n.replaceAll('"', "").split(" "));
  }
  function tL(e) {
    const t = t0(
      e.style.gridTemplateRows
    ), n = t0(
      e.style.gridTemplateColumns
    ), r = eL(e.style.gridTemplateAreas), i = e.style.getPropertyValue("--grid-gap");
    return {
      row_sizes: t,
      col_sizes: n,
      areas: r,
      gap_size: i
    };
  }
  function bA({
    container: e,
    dir: t
  }) {
    return getComputedStyle(e).getPropertyValue(
      t === "rows" ? "grid-template-rows" : "grid-template-columns"
    ).split(" ").map((n) => Number(n.replaceAll("px", "")));
  }
  const Ah = (e) => Number(e.toFixed(4)), lc = 40, nL = 0.15, SA = (e) => (t) => Math.round(t / e) * e, rL = 5, kf = SA(rL), iL = 0.01, EA = SA(iL);
  function oL(e, {
    pixelToFrRatio: t,
    beforeInfo: n,
    afterInfo: r
  }) {
    const i = EA(e * t), o = n.count + i, a = r.count - i;
    return (i < 0 ? o / a : a / o) < nL ? "no-change" : {
      beforeSize: Ah(o) + "fr",
      afterSize: Ah(a) + "fr"
    };
  }
  function aL(e, { beforeInfo: t, afterInfo: n }) {
    const r = kf(e), i = t.count + r, o = n.count - r;
    return i < lc || o < lc ? "no-change" : {
      beforeSize: i + "px",
      afterSize: o + "px"
    };
  }
  function lL(e, { beforeInfo: t }) {
    const n = t.count + e;
    return n < lc ? "no-change" : {
      beforeSize: kf(n) + "px"
    };
  }
  function sL(e, { afterInfo: t }) {
    const n = t.count - e;
    return n < lc ? "no-change" : {
      afterSize: kf(n) + "px"
    };
  }
  function uL(e, t) {
    const n = Ch(e), r = t === null ? "missing" : Ch(t);
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
  function cL({
    container: e,
    index: t,
    dir: n,
    frCounts: r
  }) {
    const i = bA({ container: e, dir: n }), o = i[t - 2], a = i[t - 1];
    return (r.before + r.after) / (a + o);
  }
  function fL({
    mousePosition: e,
    dir: t,
    index: n,
    container: r
  }) {
    const i = t === "rows" ? "gridTemplateRows" : "gridTemplateColumns";
    let o = r.style[i].split(" ");
    const a = mL(o), l = hL(o);
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
    const p = uL(c, f);
    if (p.type === "unsupported")
      throw new Error("Unsupported drag type");
    r.classList.add("been-dragged");
    const d = Q(M({
      dir: t,
      mouseStart: CA(e, t),
      originalSizes: o,
      currentSizes: [...o],
      beforeIndex: s,
      afterIndex: u
    }, p), {
      pixelToFrRatio: 1
    });
    return p.type === "both-relative" && (d.pixelToFrRatio = cL({
      container: r,
      index: n,
      dir: t,
      frCounts: {
        before: p.beforeInfo.count,
        after: p.afterInfo.count
      }
    })), d;
  }
  function pL({
    mousePosition: e,
    drag: t,
    container: n
  }) {
    const i = CA(e, t.dir) - t.mouseStart, o = [...t.originalSizes];
    let a;
    switch (t.type) {
      case "before-pixel":
        a = lL(i, t);
        break;
      case "after-pixel":
        a = sL(i, t);
        break;
      case "both-pixel":
        a = aL(i, t);
        break;
      case "both-relative":
        a = oL(i, t);
        break;
    }
    a !== "no-change" && (a.beforeSize && (o[t.beforeIndex] = a.beforeSize), a.afterSize && (o[t.afterIndex] = a.afterSize), t.currentSizes = o, t.dir === "cols" ? n.style.gridTemplateColumns = o.join(" ") : n.style.gridTemplateRows = o.join(" "));
  }
  function dL(e) {
    return e.match(/[0-9|.]+px/) !== null;
  }
  function AA(e) {
    return e.match(/[0-9|.]+fr/) !== null;
  }
  function Ch(e) {
    if (AA(e))
      return {
        type: "fr",
        count: Number(e.replace("fr", "")),
        value: e
      };
    if (dL(e))
      return {
        type: "pixel",
        count: Number(e.replace("px", "")),
        value: e
      };
    throw new Error("Unknown tract sizing unit: " + e);
  }
  function CA(e, t) {
    return t === "rows" ? e.clientY : e.clientX;
  }
  function hL(e) {
    return e.some((t) => AA(t));
  }
  function mL(e) {
    return e.some((t) => t === "auto");
  }
  const gL = "_tractInfoDisplay_cvtwo_1", vL = "_sizeWidget_cvtwo_61", yL = "_cssSizeInput_cvtwo_80", wL = "_hoverListener_cvtwo_94", bL = "_buttons_cvtwo_114", SL = "_tractAddButton_cvtwo_127", EL = "_deleteButton_cvtwo_128", Yr = {
    tractInfoDisplay: gL,
    sizeWidget: vL,
    cssSizeInput: yL,
    hoverListener: wL,
    buttons: bL,
    tractAddButton: SL,
    deleteButton: EL
  }, AL = ["fr", "px"];
  function CL({
    dir: e,
    index: t,
    size: n,
    deletionConflicts: r,
    addTract: i,
    deleteTract: o,
    changeUnit: a,
    changeCount: l
  }) {
    const { unit: s, count: u } = rc(n);
    return /* @__PURE__ */ L(
      "div",
      {
        className: Yr.tractInfoDisplay,
        "data-drag-dir": e,
        style: {
          "--tract-index": t + 1
        },
        children: [
          /* @__PURE__ */ y("div", { className: Yr.hoverListener }),
          /* @__PURE__ */ L("div", { className: Yr.sizeWidget, onClick: OL, children: [
            /* @__PURE__ */ L("div", { className: Yr.buttons, children: [
              /* @__PURE__ */ y(n0, { dir: e, onClick: () => i("before") }),
              /* @__PURE__ */ y(
                xL,
                {
                  dir: e,
                  onClick: o,
                  deletionConflicts: r
                }
              ),
              /* @__PURE__ */ y(n0, { dir: e, onClick: () => i("after") })
            ] }),
            /* @__PURE__ */ L("div", { className: Yr.cssSizeInput, children: [
              /* @__PURE__ */ y(
                xf,
                {
                  name: "value-count",
                  "aria-label": "value-count",
                  value: u,
                  onChange: l,
                  min: 0
                }
              ),
              /* @__PURE__ */ y(
                wA,
                {
                  unit: s,
                  availableUnits: AL,
                  onChange: (c) => a(c)
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
  function xL({
    dir: e,
    onClick: t,
    deletionConflicts: n
  }) {
    const r = e === "rows" ? "right" : "down", i = n.length === 0, o = i ? "Delete tract" : `Can't delete because the items ${n.join(
      ","
    )} are entirely contained in tract`;
    return /* @__PURE__ */ y(
      wi,
      {
        className: Yr.deleteButton,
        onClick: xA(i ? t : void 0),
        "data-enabled": i,
        text: o,
        size: "medium",
        position: r,
        children: /* @__PURE__ */ y(Hc, {})
      }
    );
  }
  function n0({
    dir: e,
    onClick: t
  }) {
    const n = e === "rows" ? "right" : "down", r = e === "rows" ? "Add row" : "Add column";
    return /* @__PURE__ */ y(
      wi,
      {
        className: Yr.tractAddButton,
        onClick: xA(t),
        position: n,
        text: r,
        children: /* @__PURE__ */ y(og, {})
      }
    );
  }
  function xA(e) {
    return function(t) {
      t.currentTarget.blur(), e == null || e();
    };
  }
  function kL(e, t) {
    let n = 0, r = 0;
    for (let i = 0; i < t.length; i++) {
      const { type: o, count: a } = Ch(t[i]);
      o === "fr" && (n += a, r += e[i]);
    }
    return n === 0 ? "NO_FR_UNITS" : n / r;
  }
  function r0({
    dir: e,
    sizes: t,
    getActualSizes: n,
    areas: r,
    onUpdate: i
  }) {
    const o = J.useCallback(
      ({ dir: c, index: f }) => gE(r, {
        dir: c,
        index: f + 1
      }),
      [r]
    ), a = (c) => (f) => {
      const { unit: p } = rc(t[c]);
      i({
        type: "RESIZE",
        index: c,
        dir: e,
        size: `${f}${p}`
      });
    }, l = (c) => (f) => {
      const p = n(), { count: d } = rc(t[c]);
      let h = 1;
      f === "px" && (h = kf(p[c]));
      const m = kL(p, t);
      f === "fr" && m !== "NO_FR_UNITS" && (h = Ah(
        EA(d ? d * m : 1)
      )), i({ type: "RESIZE", index: c, dir: e, size: `${h}${f}` });
    }, s = (c) => (f) => i({
      type: "ADD",
      dir: e,
      index: f === "before" ? c : c + 1
    }), u = (c) => () => {
      i({ type: "DELETE", dir: e, index: c + 1 });
    };
    return /* @__PURE__ */ y(et, { children: t.map((c, f) => /* @__PURE__ */ y(
      CL,
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
  function OL(e) {
    e.stopPropagation();
  }
  function i0(e, t) {
    e.querySelectorAll(`.${Yr.tractInfoDisplay}`).forEach((n) => {
      n.style.display = t === "hide" ? "none" : "block";
    });
  }
  const TL = "_columnSizer_9b32k_1", IL = "_rowSizer_9b32k_2", o0 = {
    columnSizer: TL,
    rowSizer: IL
  };
  function a0({
    dir: e,
    index: t,
    onStartDrag: n
  }) {
    return /* @__PURE__ */ y(
      "div",
      {
        className: e === "rows" ? o0.rowSizer : o0.columnSizer,
        title: `resize ${e === "rows" ? "rows" : "columns"} ${t - 1} and ${t}`,
        onMouseDown: (r) => n({ e: r, dir: e, index: t }),
        style: { [e === "rows" ? "gridRow" : "gridColumn"]: t }
      }
    );
  }
  function PL(e, t = "Ref is not yet initialized") {
    if (e.current === null)
      throw new Error(t);
    return e.current;
  }
  function _L({
    containerRef: e,
    onDragEnd: t
  }) {
    return k.useCallback(
      ({
        e: r,
        dir: i,
        index: o
      }) => {
        const a = PL(
          e,
          "How are you dragging on an element without a container?"
        );
        r.preventDefault();
        const l = fL({
          mousePosition: r,
          dir: i,
          index: o,
          container: a
        }), { beforeIndex: s, afterIndex: u } = l, c = l0(a, {
          dir: i,
          index: s,
          size: l.currentSizes[s]
        }), f = l0(a, {
          dir: i,
          index: u,
          size: l.currentSizes[u]
        });
        NL(a, l.dir, {
          move: (p) => {
            pL({
              mousePosition: p,
              drag: l,
              container: a
            }), c.update(l.currentSizes[s]), f.update(l.currentSizes[u]);
          },
          end: () => {
            c.remove(), f.remove(), t && t(tL(a));
          }
        });
      },
      [e, t]
    );
  }
  function l0(e, { dir: t, index: n, size: r }) {
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
    }), a.innerHTML = r, i.appendChild(a), e.appendChild(i), i0(e, "hide"), {
      remove: () => {
        i.remove(), i0(e, "show");
      },
      update: (l) => {
        a.innerHTML = l;
      }
    };
  }
  function NL(e, t, n) {
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
  function DL({
    areas: e,
    col_sizes: t,
    row_sizes: n,
    gap_size: r
  }) {
    return {
      areas: e,
      gap_size: r,
      col_sizes: sl(t),
      row_sizes: sl(n)
    };
  }
  const RL = "1fr";
  function LL(i) {
    var o = i, {
      className: e,
      children: t,
      onNewLayout: n
    } = o, r = it(o, [
      "className",
      "children",
      "onNewLayout"
    ]);
    r = DL(r);
    let { row_sizes: a, col_sizes: l } = r;
    const s = J.useRef(null), u = ZR(r), c = l.length < 2 ? [] : e0(2, l.length), f = a.length < 2 ? [] : e0(2, a.length), p = _L({
      containerRef: s,
      onDragEnd: n
    }), d = [u3.ResizableGrid];
    e && d.push(e);
    const h = J.useCallback(
      (g) => {
        switch (g.type) {
          case "ADD":
            return dE(r, {
              afterIndex: g.index,
              dir: g.dir,
              size: RL
            });
          case "RESIZE":
            return FL(r, g);
          case "DELETE":
            return mE(r, g);
        }
      },
      [r]
    ), m = J.useCallback(
      (g) => n(h(g)),
      [h, n]
    ), S = J.useCallback((g) => {
      const v = s.current;
      return v ? bA({ container: v, dir: g }) : [];
    }, []);
    return /* @__PURE__ */ L(
      "div",
      {
        className: Wt(...d),
        ref: s,
        style: u,
        children: [
          c.map((g) => /* @__PURE__ */ y(
            a0,
            {
              dir: "cols",
              index: g,
              onStartDrag: p
            },
            "cols" + g
          )),
          f.map((g) => /* @__PURE__ */ y(
            a0,
            {
              dir: "rows",
              index: g,
              onStartDrag: p
            },
            "rows" + g
          )),
          t,
          /* @__PURE__ */ y(
            r0,
            {
              dir: "cols",
              sizes: l,
              getActualSizes: () => S("cols"),
              areas: r.areas,
              onUpdate: m
            }
          ),
          /* @__PURE__ */ y(
            r0,
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
  function FL(e, { dir: t, index: n, size: r }) {
    return mi(e, (i) => {
      i[t === "rows" ? "row_sizes" : "col_sizes"][n] = r;
    });
  }
  function ML({
    gridRow: e,
    gridColumn: t,
    onDroppedNode: n
  }) {
    const r = k.useRef(null);
    return uf({
      watcherRef: r,
      getCanAcceptDrop: (i) => i.node.uiName !== "gridlayout::grid_container",
      onDrop: (i) => {
        n(Q(M({}, i), {
          pos: {
            rowStart: e,
            rowEnd: e,
            colStart: t,
            colEnd: t
          }
        }));
      }
    }), /* @__PURE__ */ y(
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
  const kA = 236;
  function OA({
    main: e,
    properties: t,
    preview: n,
    left: r
  }) {
    return /* @__PURE__ */ y(et, { children: /* @__PURE__ */ L("div", { className: "EditorSkeleton", children: [
      /* @__PURE__ */ y("div", { className: "elements-panel panel", children: r }),
      /* @__PURE__ */ y("div", { className: "app-view", children: e }),
      /* @__PURE__ */ y("div", { className: "properties-panel panel", children: t }),
      /* @__PURE__ */ y("div", { className: "app-preview panel", children: n })
    ] }) });
  }
  function da({
    children: e,
    className: t = ""
  }) {
    return /* @__PURE__ */ y("h3", { className: t + " panel-title", children: e });
  }
  const BL = "_portalHolder_18ua3_1", UL = "_portalModal_18ua3_11", zL = "_title_18ua3_21", WL = "_body_18ua3_25", jL = "_portalForm_18ua3_30", YL = "_portalFormInputs_18ua3_35", VL = "_portalFormFooter_18ua3_42", GL = "_validationMsg_18ua3_48", HL = "_infoText_18ua3_53", mr = {
    portalHolder: BL,
    portalModal: UL,
    title: zL,
    body: WL,
    portalForm: jL,
    portalFormInputs: YL,
    portalFormFooter: VL,
    validationMsg: GL,
    infoText: HL
  }, $L = ({ children: e, el: t = "div" }) => {
    const [n] = J.useState(document.createElement(t));
    return J.useEffect(() => (document.body.appendChild(n), () => {
      document.body.removeChild(n);
    }), [n]), oi.createPortal(e, n);
  };
  function TA({
    children: e,
    title: t,
    label: n,
    onConfirm: r,
    onCancel: i
  }) {
    return /* @__PURE__ */ y($L, { children: /* @__PURE__ */ y(
      "div",
      {
        className: mr.portalHolder,
        onClick: () => i(),
        onKeyDown: (o) => {
          o.key === "Escape" && i();
        },
        children: /* @__PURE__ */ L(
          "div",
          {
            className: mr.portalModal,
            onClick: (o) => o.stopPropagation(),
            "aria-label": n != null ? n : "popup modal",
            children: [
              t ? /* @__PURE__ */ y(da, { className: mr.title, children: t }) : null,
              /* @__PURE__ */ y("div", { className: mr.body, children: e })
            ]
          }
        )
      }
    ) });
  }
  var sc = Symbol("@ts-pattern/matcher"), s0 = "@ts-pattern/anonymous-select-key", u0 = function(e) {
    return Boolean(e && typeof e == "object");
  }, Np = function(e) {
    return e && !!e[sc];
  }, JL = function e(t, n, r) {
    if (u0(t)) {
      if (Np(t)) {
        var i = t[sc]().match(n), o = i.matched, a = i.selections;
        return o && a && Object.keys(a).forEach(function(s) {
          return r(s, a[s]);
        }), o;
      }
      if (!u0(n))
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
          return Np(l) ? Array.from(n.values()).every(function(s) {
            return e(l, s, r);
          }) : n.has(l);
        }
        return Array.from(t.values()).every(function(s) {
          return n.has(s);
        });
      }
      return Object.keys(t).every(function(s) {
        var u, c = t[s];
        return (s in n || Np(u = c) && u[sc]().matcherType === "optional") && e(c, n[s], r);
      });
    }
    return Object.is(n, t);
  };
  function to(e) {
    var t;
    return (t = {})[sc] = function() {
      return { match: function(n) {
        return { matched: Boolean(e(n)) };
      } };
    }, t;
  }
  to(function(e) {
    return !0;
  });
  to(function(e) {
    return typeof e == "string";
  });
  to(function(e) {
    return typeof e == "number";
  });
  to(function(e) {
    return typeof e == "boolean";
  });
  to(function(e) {
    return typeof e == "bigint";
  });
  to(function(e) {
    return typeof e == "symbol";
  });
  to(function(e) {
    return e == null;
  });
  var QL = function(e) {
    return new KL(e, []);
  }, KL = /* @__PURE__ */ function() {
    function e(n, r) {
      this.value = void 0, this.cases = void 0, this.value = n, this.cases = r;
    }
    var t = e.prototype;
    return t.with = function() {
      var n = [].slice.call(arguments), r = n[n.length - 1], i = [n[0]], o = [];
      return n.length === 3 && typeof n[1] == "function" ? (i.push(n[0]), o.push(n[1])) : n.length > 2 && i.push.apply(i, n.slice(1, n.length - 1)), new e(this.value, this.cases.concat([{ match: function(a) {
        var l = {}, s = Boolean(i.some(function(u) {
          return JL(u, a, function(c, f) {
            l[c] = f;
          });
        }) && o.every(function(u) {
          return u(a);
        }));
        return { matched: s, value: s && Object.keys(l).length ? s0 in l ? l[s0] : l : a };
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
  const XL = "_checkboxInput_7ym3w_1", qL = "_checkboxLabel_7ym3w_10", c0 = {
    checkboxInput: XL,
    checkboxLabel: qL
  };
  function ZL({
    id: e,
    label: t,
    value: n,
    onChange: r
  }) {
    const i = `${e}-checkbox-input`, o = (a) => r(a.target.checked);
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(
        "input",
        {
          className: Wt("SUE-Input", c0.checkboxInput),
          id: i,
          "aria-labelledby": Or(e),
          "aria-label": t,
          type: "checkbox",
          checked: n,
          onChange: o
        }
      ),
      /* @__PURE__ */ y(
        "label",
        {
          className: c0.checkboxLabel,
          htmlFor: i,
          "data-value": n ? "TRUE" : "FALSE",
          children: "Toggle"
        }
      )
    ] });
  }
  const eF = {
    fr: 1,
    px: 10,
    rem: 1,
    "%": 100
  };
  function tF({
    id: e,
    label: t,
    value: n,
    onChange: r,
    units: i = ["px", "rem", "%"]
  }) {
    const { count: o, unit: a } = rc(n), l = k.useCallback(
      (c) => {
        if (c === void 0) {
          if (a !== "auto")
            throw new Error("Undefined count with auto units");
          r(Ra({ unit: a, count: null }));
          return;
        }
        if (a === "auto") {
          console.error("How did you change the count of an auto unit?");
          return;
        }
        r(Ra({ unit: a, count: c }));
      },
      [r, a]
    ), s = k.useCallback(
      (c) => {
        if (c === "auto") {
          r(
            Ra({
              unit: c,
              count: null
            })
          );
          return;
        }
        if (a === "auto") {
          r(
            Ra({ unit: c, count: eF[c] })
          );
          return;
        }
        r(Ra({ unit: c, count: o }));
      },
      [o, r, a]
    );
    i.includes(a) || i.push(a);
    const u = o === null;
    return /* @__PURE__ */ L(
      "div",
      {
        className: Wt("SUE-Input", yA.wrapper),
        "aria-label": t,
        "aria-labelledby": Or(e),
        children: [
          /* @__PURE__ */ y(
            xf,
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
            wA,
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
  function nF(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } }, { tag: "path", attr: { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" } }] })(e);
  }
  var xh = {}, rF = {
    get exports() {
      return xh;
    },
    set exports(e) {
      xh = e;
    }
  };
  /**!
   * Sortable 1.15.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function f0(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function or(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2 ? f0(Object(n), !0).forEach(function(r) {
        iF(e, r, n[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f0(Object(n)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
      });
    }
    return e;
  }
  function mu(e) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mu = function(t) {
      return typeof t;
    } : mu = function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, mu(e);
  }
  function iF(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function wn() {
    return wn = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }, wn.apply(this, arguments);
  }
  function oF(e, t) {
    if (e == null)
      return {};
    var n = {}, r = Object.keys(e), i, o;
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function aF(e, t) {
    if (e == null)
      return {};
    var n = oF(e, t), r, i;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (i = 0; i < o.length; i++)
        r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
    }
    return n;
  }
  function lF(e) {
    return sF(e) || uF(e) || cF(e) || fF();
  }
  function sF(e) {
    if (Array.isArray(e))
      return kh(e);
  }
  function uF(e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null)
      return Array.from(e);
  }
  function cF(e, t) {
    if (e) {
      if (typeof e == "string")
        return kh(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
        return Array.from(e);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return kh(e, t);
    }
  }
  function kh(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++)
      r[n] = e[n];
    return r;
  }
  function fF() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var pF = "1.15.0";
  function br(e) {
    if (typeof window != "undefined" && window.navigator)
      return !!/* @__PURE__ */ navigator.userAgent.match(e);
  }
  var _r = br(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ds = br(/Edge/i), p0 = br(/firefox/i), dl = br(/safari/i) && !br(/chrome/i) && !br(/android/i), IA = br(/iP(ad|od|hone)/i), PA = br(/chrome/i) && br(/android/i), _A = {
    capture: !1,
    passive: !1
  };
  function de(e, t, n) {
    e.addEventListener(t, n, !_r && _A);
  }
  function ue(e, t, n) {
    e.removeEventListener(t, n, !_r && _A);
  }
  function uc(e, t) {
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
  function dF(e) {
    return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
  }
  function Dn(e, t, n, r) {
    if (e) {
      n = n || document;
      do {
        if (t != null && (t[0] === ">" ? e.parentNode === n && uc(e, t) : uc(e, t)) || r && e === n)
          return e;
        if (e === n)
          break;
      } while (e = dF(e));
    }
    return null;
  }
  var d0 = /\s+/g;
  function Fe(e, t, n) {
    if (e && t)
      if (e.classList)
        e.classList[n ? "add" : "remove"](t);
      else {
        var r = (" " + e.className + " ").replace(d0, " ").replace(" " + t + " ", " ");
        e.className = (r + (n ? " " + t : "")).replace(d0, " ");
      }
  }
  function X(e, t, n) {
    var r = e && e.style;
    if (r) {
      if (n === void 0)
        return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
      !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
    }
  }
  function Bi(e, t) {
    var n = "";
    if (typeof e == "string")
      n = e;
    else
      do {
        var r = X(e, "transform");
        r && r !== "none" && (n = r + " " + n);
      } while (!t && (e = e.parentNode));
    var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return i && new i(n);
  }
  function NA(e, t, n) {
    if (e) {
      var r = e.getElementsByTagName(t), i = 0, o = r.length;
      if (n)
        for (; i < o; i++)
          n(r[i], i);
      return r;
    }
    return [];
  }
  function tr() {
    var e = document.scrollingElement;
    return e || document.documentElement;
  }
  function De(e, t, n, r, i) {
    if (!(!e.getBoundingClientRect && e !== window)) {
      var o, a, l, s, u, c, f;
      if (e !== window && e.parentNode && e !== tr() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !_r))
        do
          if (i && i.getBoundingClientRect && (X(i, "transform") !== "none" || n && X(i, "position") !== "static")) {
            var p = i.getBoundingClientRect();
            a -= p.top + parseInt(X(i, "border-top-width")), l -= p.left + parseInt(X(i, "border-left-width")), s = a + o.height, u = l + o.width;
            break;
          }
        while (i = i.parentNode);
      if (r && e !== window) {
        var d = Bi(i || e), h = d && d.a, m = d && d.d;
        d && (a /= m, l /= h, f /= h, c /= m, s = a + c, u = l + f);
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
  function h0(e, t, n) {
    for (var r = $r(e, !0), i = De(e)[t]; r; ) {
      var o = De(r)[n], a = void 0;
      if (n === "top" || n === "left" ? a = i >= o : a = i <= o, !a)
        return r;
      if (r === tr())
        break;
      r = $r(r, !1);
    }
    return !1;
  }
  function ea(e, t, n, r) {
    for (var i = 0, o = 0, a = e.children; o < a.length; ) {
      if (a[o].style.display !== "none" && a[o] !== ee.ghost && (r || a[o] !== ee.dragged) && Dn(a[o], n.draggable, e, !1)) {
        if (i === t)
          return a[o];
        i++;
      }
      o++;
    }
    return null;
  }
  function Ag(e, t) {
    for (var n = e.lastElementChild; n && (n === ee.ghost || X(n, "display") === "none" || t && !uc(n, t)); )
      n = n.previousElementSibling;
    return n || null;
  }
  function Ve(e, t) {
    var n = 0;
    if (!e || !e.parentNode)
      return -1;
    for (; e = e.previousElementSibling; )
      e.nodeName.toUpperCase() !== "TEMPLATE" && e !== ee.clone && (!t || uc(e, t)) && n++;
    return n;
  }
  function m0(e) {
    var t = 0, n = 0, r = tr();
    if (e)
      do {
        var i = Bi(e), o = i.a, a = i.d;
        t += e.scrollLeft * o, n += e.scrollTop * a;
      } while (e !== r && (e = e.parentNode));
    return [t, n];
  }
  function hF(e, t) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        for (var r in t)
          if (t.hasOwnProperty(r) && t[r] === e[n][r])
            return Number(n);
      }
    return -1;
  }
  function $r(e, t) {
    if (!e || !e.getBoundingClientRect)
      return tr();
    var n = e, r = !1;
    do
      if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
        var i = X(n);
        if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
          if (!n.getBoundingClientRect || n === document.body)
            return tr();
          if (r || t)
            return n;
          r = !0;
        }
      }
    while (n = n.parentNode);
    return tr();
  }
  function mF(e, t) {
    if (e && t)
      for (var n in t)
        t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function Dp(e, t) {
    return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
  }
  var hl;
  function DA(e, t) {
    return function() {
      if (!hl) {
        var n = arguments, r = this;
        n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), hl = setTimeout(function() {
          hl = void 0;
        }, t);
      }
    };
  }
  function gF() {
    clearTimeout(hl), hl = void 0;
  }
  function RA(e, t, n) {
    e.scrollLeft += t, e.scrollTop += n;
  }
  function Cg(e) {
    var t = window.Polymer, n = window.jQuery || window.Zepto;
    return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
  }
  function g0(e, t) {
    X(e, "position", "absolute"), X(e, "top", t.top), X(e, "left", t.left), X(e, "width", t.width), X(e, "height", t.height);
  }
  function Rp(e) {
    X(e, "position", ""), X(e, "top", ""), X(e, "left", ""), X(e, "width", ""), X(e, "height", "");
  }
  var bt = "Sortable" + new Date().getTime();
  function vF() {
    var e = [], t;
    return {
      captureAnimationState: function() {
        if (e = [], !!this.options.animation) {
          var r = [].slice.call(this.el.children);
          r.forEach(function(i) {
            if (!(X(i, "display") === "none" || i === ee.ghost)) {
              e.push({
                target: i,
                rect: De(i)
              });
              var o = or({}, e[e.length - 1].rect);
              if (i.thisAnimationDuration) {
                var a = Bi(i, !0);
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
        e.splice(hF(e, {
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
          var s = 0, u = l.target, c = u.fromRect, f = De(u), p = u.prevFromRect, d = u.prevToRect, h = l.rect, m = Bi(u, !0);
          m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Dp(p, f) && !Dp(c, f) && // Make sure animatingRect is on line between toRect & fromRect
          (h.top - f.top) / (h.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = wF(h, p, d, i.options)), Dp(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
            u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
          }, s), u.thisAnimationDuration = s);
        }), clearTimeout(t), o ? t = setTimeout(function() {
          typeof r == "function" && r();
        }, a) : typeof r == "function" && r(), e = [];
      },
      animate: function(r, i, o, a) {
        if (a) {
          X(r, "transition", ""), X(r, "transform", "");
          var l = Bi(this.el), s = l && l.a, u = l && l.d, c = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
          r.animatingX = !!c, r.animatingY = !!f, X(r, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = yF(r), X(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), X(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
            X(r, "transition", ""), X(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
          }, a);
        }
      }
    };
  }
  function yF(e) {
    return e.offsetWidth;
  }
  function wF(e, t, n, r) {
    return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
  }
  var oo = [], Lp = {
    initializeByDefault: !0
  }, hs = {
    mount: function(t) {
      for (var n in Lp)
        Lp.hasOwnProperty(n) && !(n in t) && (t[n] = Lp[n]);
      oo.forEach(function(r) {
        if (r.pluginName === t.pluginName)
          throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
      }), oo.push(t);
    },
    pluginEvent: function(t, n, r) {
      var i = this;
      this.eventCanceled = !1, r.cancel = function() {
        i.eventCanceled = !0;
      };
      var o = t + "Global";
      oo.forEach(function(a) {
        n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](or({
          sortable: n
        }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](or({
          sortable: n
        }, r)));
      });
    },
    initializePlugins: function(t, n, r, i) {
      oo.forEach(function(l) {
        var s = l.pluginName;
        if (!(!t.options[s] && !l.initializeByDefault)) {
          var u = new l(t, n, t.options);
          u.sortable = t, u.options = t.options, t[s] = u, wn(r, u.defaults);
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
      return oo.forEach(function(i) {
        typeof i.eventProperties == "function" && wn(r, i.eventProperties.call(n[i.pluginName], t));
      }), r;
    },
    modifyOption: function(t, n, r) {
      var i;
      return oo.forEach(function(o) {
        t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
      }), i;
    }
  };
  function $a(e) {
    var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, d = e.putSortable, h = e.extraEventProperties;
    if (t = t || n && n[bt], !!t) {
      var m, S = t.options, g = "on" + r.charAt(0).toUpperCase() + r.substr(1);
      window.CustomEvent && !_r && !ds ? m = new CustomEvent(r, {
        bubbles: !0,
        cancelable: !0
      }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = c, m.newDraggableIndex = f, m.originalEvent = p, m.pullMode = d ? d.lastPutMode : void 0;
      var v = or(or({}, h), hs.getEventProperties(r, t));
      for (var w in v)
        m[w] = v[w];
      n && n.dispatchEvent(m), S[g] && S[g].call(t, m);
    }
  }
  var bF = ["evt"], It = function(t, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = aF(r, bF);
    hs.pluginEvent.bind(ee)(t, n, or({
      dragEl: Y,
      parentEl: je,
      ghostEl: ae,
      rootEl: Pe,
      nextEl: Ti,
      lastDownEl: gu,
      cloneEl: Le,
      cloneHidden: Vr,
      dragStarted: Ja,
      putSortable: ut,
      activeSortable: ee.active,
      originalEvent: i,
      oldIndex: Ao,
      oldDraggableIndex: ml,
      newIndex: Gt,
      newDraggableIndex: Mr,
      hideGhostForTarget: BA,
      unhideGhostForTarget: UA,
      cloneNowHidden: function() {
        Vr = !0;
      },
      cloneNowShown: function() {
        Vr = !1;
      },
      dispatchSortableEvent: function(l) {
        Et({
          sortable: n,
          name: l,
          originalEvent: i
        });
      }
    }, o));
  };
  function Et(e) {
    $a(or({
      putSortable: ut,
      cloneEl: Le,
      targetEl: Y,
      rootEl: Pe,
      oldIndex: Ao,
      oldDraggableIndex: ml,
      newIndex: Gt,
      newDraggableIndex: Mr
    }, e));
  }
  var Y, je, ae, Pe, Ti, gu, Le, Vr, Ao, Gt, ml, Mr, $s, ut, uo = !1, cc = !1, fc = [], Ei, In, Fp, Mp, v0, y0, Ja, ao, gl, vl = !1, Js = !1, vu, gt, Bp = [], Oh = !1, pc = [], Of = typeof document != "undefined", Qs = IA, w0 = ds || _r ? "cssFloat" : "float", SF = Of && !PA && !IA && "draggable" in document.createElement("div"), LA = function() {
    if (Of) {
      if (_r)
        return !1;
      var e = document.createElement("x");
      return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
    }
  }(), FA = function(t, n) {
    var r = X(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ea(t, 0, n), a = ea(t, 1, n), l = o && X(o), s = a && X(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + De(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + De(a).width;
    if (r.display === "flex")
      return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    if (r.display === "grid")
      return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    if (o && l.float && l.float !== "none") {
      var f = l.float === "left" ? "left" : "right";
      return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
    }
    return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[w0] === "none" || a && r[w0] === "none" && u + c > i) ? "vertical" : "horizontal";
  }, EF = function(t, n, r) {
    var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
    return i === l || o === s || i + a / 2 === l + u / 2;
  }, AF = function(t, n) {
    var r;
    return fc.some(function(i) {
      var o = i[bt].options.emptyInsertThreshold;
      if (!(!o || Ag(i))) {
        var a = De(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
        if (l && s)
          return r = i;
      }
    }), r;
  }, MA = function(t) {
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
        var p = (a ? l : s).options.group.name;
        return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
      };
    }
    var r = {}, i = t.group;
    (!i || mu(i) != "object") && (i = {
      name: i
    }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
  }, BA = function() {
    !LA && ae && X(ae, "display", "none");
  }, UA = function() {
    !LA && ae && X(ae, "display", "");
  };
  Of && !PA && document.addEventListener("click", function(e) {
    if (cc)
      return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), cc = !1, !1;
  }, !0);
  var Ai = function(t) {
    if (Y) {
      t = t.touches ? t.touches[0] : t;
      var n = AF(t.clientX, t.clientY);
      if (n) {
        var r = {};
        for (var i in t)
          t.hasOwnProperty(i) && (r[i] = t[i]);
        r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[bt]._onDragOver(r);
      }
    }
  }, CF = function(t) {
    Y && Y.parentNode[bt]._isOutsideThisEl(t.target);
  };
  function ee(e, t) {
    if (!(e && e.nodeType && e.nodeType === 1))
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
    this.el = e, this.options = t = wn({}, t), e[bt] = this;
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
        return FA(e, this.options);
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
      supportPointer: ee.supportPointer !== !1 && "PointerEvent" in window && !dl,
      emptyInsertThreshold: 5
    };
    hs.initializePlugins(this, e, n);
    for (var r in n)
      !(r in t) && (t[r] = n[r]);
    MA(t);
    for (var i in this)
      i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
    this.nativeDraggable = t.forceFallback ? !1 : SF, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? de(e, "pointerdown", this._onTapStart) : (de(e, "mousedown", this._onTapStart), de(e, "touchstart", this._onTapStart)), this.nativeDraggable && (de(e, "dragover", this), de(e, "dragenter", this)), fc.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), wn(this, vF());
  }
  ee.prototype = /** @lends Sortable.prototype */
  {
    constructor: ee,
    _isOutsideThisEl: function(t) {
      !this.el.contains(t) && t !== this.el && (ao = null);
    },
    _getDirection: function(t, n) {
      return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, Y) : this.options.direction;
    },
    _onTapStart: function(t) {
      if (t.cancelable) {
        var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = i.filter;
        if (NF(r), !Y && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && dl && s && s.tagName.toUpperCase() === "SELECT") && (s = Dn(s, i.draggable, r, !1), !(s && s.animated) && gu !== s)) {
          if (Ao = Ve(s), ml = Ve(s, i.draggable), typeof c == "function") {
            if (c.call(this, t, s, this)) {
              Et({
                sortable: n,
                rootEl: u,
                name: "filter",
                targetEl: s,
                toEl: r,
                fromEl: r
              }), It("filter", n, {
                evt: t
              }), o && t.cancelable && t.preventDefault();
              return;
            }
          } else if (c && (c = c.split(",").some(function(f) {
            if (f = Dn(u, f.trim(), r, !1), f)
              return Et({
                sortable: n,
                rootEl: f,
                name: "filter",
                targetEl: s,
                fromEl: r,
                toEl: r
              }), It("filter", n, {
                evt: t
              }), !0;
          }), c)) {
            o && t.cancelable && t.preventDefault();
            return;
          }
          i.handle && !Dn(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
        }
      }
    },
    _prepareDragStart: function(t, n, r) {
      var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
      if (r && !Y && r.parentNode === o) {
        var u = De(r);
        if (Pe = o, Y = r, je = Y.parentNode, Ti = Y.nextSibling, gu = r, $s = a.group, ee.dragged = Y, Ei = {
          target: Y,
          clientX: (n || t).clientX,
          clientY: (n || t).clientY
        }, v0 = Ei.clientX - u.left, y0 = Ei.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, Y.style["will-change"] = "all", s = function() {
          if (It("delayEnded", i, {
            evt: t
          }), ee.eventCanceled) {
            i._onDrop();
            return;
          }
          i._disableDelayedDragEvents(), !p0 && i.nativeDraggable && (Y.draggable = !0), i._triggerDragStart(t, n), Et({
            sortable: i,
            name: "choose",
            originalEvent: t
          }), Fe(Y, a.chosenClass, !0);
        }, a.ignore.split(",").forEach(function(c) {
          NA(Y, c.trim(), Up);
        }), de(l, "dragover", Ai), de(l, "mousemove", Ai), de(l, "touchmove", Ai), de(l, "mouseup", i._onDrop), de(l, "touchend", i._onDrop), de(l, "touchcancel", i._onDrop), p0 && this.nativeDraggable && (this.options.touchStartThreshold = 4, Y.draggable = !0), It("delayStart", this, {
          evt: t
        }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(ds || _r))) {
          if (ee.eventCanceled) {
            this._onDrop();
            return;
          }
          de(l, "mouseup", i._disableDelayedDrag), de(l, "touchend", i._disableDelayedDrag), de(l, "touchcancel", i._disableDelayedDrag), de(l, "mousemove", i._delayedDragTouchMoveHandler), de(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && de(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
        } else
          s();
      }
    },
    _delayedDragTouchMoveHandler: function(t) {
      var n = t.touches ? t.touches[0] : t;
      Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
    },
    _disableDelayedDrag: function() {
      Y && Up(Y), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function() {
      var t = this.el.ownerDocument;
      ue(t, "mouseup", this._disableDelayedDrag), ue(t, "touchend", this._disableDelayedDrag), ue(t, "touchcancel", this._disableDelayedDrag), ue(t, "mousemove", this._delayedDragTouchMoveHandler), ue(t, "touchmove", this._delayedDragTouchMoveHandler), ue(t, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function(t, n) {
      n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? de(document, "pointermove", this._onTouchMove) : n ? de(document, "touchmove", this._onTouchMove) : de(document, "mousemove", this._onTouchMove) : (de(Y, "dragend", this), de(Pe, "dragstart", this._onDragStart));
      try {
        document.selection ? yu(function() {
          document.selection.empty();
        }) : window.getSelection().removeAllRanges();
      } catch (r) {
      }
    },
    _dragStarted: function(t, n) {
      if (uo = !1, Pe && Y) {
        It("dragStarted", this, {
          evt: n
        }), this.nativeDraggable && de(document, "dragover", CF);
        var r = this.options;
        !t && Fe(Y, r.dragClass, !1), Fe(Y, r.ghostClass, !0), ee.active = this, t && this._appendGhost(), Et({
          sortable: this,
          name: "start",
          originalEvent: n
        });
      } else
        this._nulling();
    },
    _emulateDragOver: function() {
      if (In) {
        this._lastX = In.clientX, this._lastY = In.clientY, BA();
        for (var t = document.elementFromPoint(In.clientX, In.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(In.clientX, In.clientY), t !== n); )
          n = t;
        if (Y.parentNode[bt]._isOutsideThisEl(t), n)
          do {
            if (n[bt]) {
              var r = void 0;
              if (r = n[bt]._onDragOver({
                clientX: In.clientX,
                clientY: In.clientY,
                target: t,
                rootEl: n
              }), r && !this.options.dragoverBubble)
                break;
            }
            t = n;
          } while (n = n.parentNode);
        UA();
      }
    },
    _onTouchMove: function(t) {
      if (Ei) {
        var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = ae && Bi(ae, !0), l = ae && a && a.a, s = ae && a && a.d, u = Qs && gt && m0(gt), c = (o.clientX - Ei.clientX + i.x) / (l || 1) + (u ? u[0] - Bp[0] : 0) / (l || 1), f = (o.clientY - Ei.clientY + i.y) / (s || 1) + (u ? u[1] - Bp[1] : 0) / (s || 1);
        if (!ee.active && !uo) {
          if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
            return;
          this._onDragStart(t, !0);
        }
        if (ae) {
          a ? (a.e += c - (Fp || 0), a.f += f - (Mp || 0)) : a = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: c,
            f
          };
          var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
          X(ae, "webkitTransform", p), X(ae, "mozTransform", p), X(ae, "msTransform", p), X(ae, "transform", p), Fp = c, Mp = f, In = o;
        }
        t.cancelable && t.preventDefault();
      }
    },
    _appendGhost: function() {
      if (!ae) {
        var t = this.options.fallbackOnBody ? document.body : Pe, n = De(Y, !0, Qs, !0, t), r = this.options;
        if (Qs) {
          for (gt = t; X(gt, "position") === "static" && X(gt, "transform") === "none" && gt !== document; )
            gt = gt.parentNode;
          gt !== document.body && gt !== document.documentElement ? (gt === document && (gt = tr()), n.top += gt.scrollTop, n.left += gt.scrollLeft) : gt = tr(), Bp = m0(gt);
        }
        ae = Y.cloneNode(!0), Fe(ae, r.ghostClass, !1), Fe(ae, r.fallbackClass, !0), Fe(ae, r.dragClass, !0), X(ae, "transition", ""), X(ae, "transform", ""), X(ae, "box-sizing", "border-box"), X(ae, "margin", 0), X(ae, "top", n.top), X(ae, "left", n.left), X(ae, "width", n.width), X(ae, "height", n.height), X(ae, "opacity", "0.8"), X(ae, "position", Qs ? "absolute" : "fixed"), X(ae, "zIndex", "100000"), X(ae, "pointerEvents", "none"), ee.ghost = ae, t.appendChild(ae), X(ae, "transform-origin", v0 / parseInt(ae.style.width) * 100 + "% " + y0 / parseInt(ae.style.height) * 100 + "%");
      }
    },
    _onDragStart: function(t, n) {
      var r = this, i = t.dataTransfer, o = r.options;
      if (It("dragStart", this, {
        evt: t
      }), ee.eventCanceled) {
        this._onDrop();
        return;
      }
      It("setupClone", this), ee.eventCanceled || (Le = Cg(Y), Le.removeAttribute("id"), Le.draggable = !1, Le.style["will-change"] = "", this._hideClone(), Fe(Le, this.options.chosenClass, !1), ee.clone = Le), r.cloneId = yu(function() {
        It("clone", r), !ee.eventCanceled && (r.options.removeCloneOnHide || Pe.insertBefore(Le, Y), r._hideClone(), Et({
          sortable: r,
          name: "clone"
        }));
      }), !n && Fe(Y, o.dragClass, !0), n ? (cc = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (ue(document, "mouseup", r._onDrop), ue(document, "touchend", r._onDrop), ue(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, Y)), de(document, "drop", r), X(Y, "transform", "translateZ(0)")), uo = !0, r._dragStartId = yu(r._dragStarted.bind(r, n, t)), de(document, "selectstart", r), Ja = !0, dl && X(document.body, "user-select", "none");
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function(t) {
      var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = ee.active, c = $s === s, f = l.sort, p = ut || u, d, h = this, m = !1;
      if (Oh)
        return;
      function S(B, V) {
        It(B, h, or({
          evt: t,
          isOwner: c,
          axis: d ? "vertical" : "horizontal",
          revert: a,
          dragRect: i,
          targetRect: o,
          canSort: f,
          fromSortable: p,
          target: r,
          completed: v,
          onMove: function(x, C) {
            return Ks(Pe, n, Y, i, x, De(x), t, C);
          },
          changed: w
        }, V));
      }
      function g() {
        S("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
      }
      function v(B) {
        return S("dragOverCompleted", {
          insertion: B
        }), B && (c ? u._hideClone() : u._showClone(h), h !== p && (Fe(Y, ut ? ut.options.ghostClass : u.options.ghostClass, !1), Fe(Y, l.ghostClass, !0)), ut !== h && h !== ee.active ? ut = h : h === ee.active && ut && (ut = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
          S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
        }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === Y && !Y.animated || r === n && !r.animated) && (ao = null), !l.dragoverBubble && !t.rootEl && r !== document && (Y.parentNode[bt]._isOutsideThisEl(t.target), !B && Ai(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
      }
      function w() {
        Gt = Ve(Y), Mr = Ve(Y, l.draggable), Et({
          sortable: h,
          name: "change",
          toEl: n,
          newIndex: Gt,
          newDraggableIndex: Mr,
          originalEvent: t
        });
      }
      if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Dn(r, l.draggable, n, !0), S("dragOver"), ee.eventCanceled)
        return m;
      if (Y.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
        return v(!1);
      if (cc = !1, u && !l.disabled && (c ? f || (a = je !== Pe) : ut === this || (this.lastPutMode = $s.checkPull(this, u, Y, t)) && s.checkPut(this, u, Y, t))) {
        if (d = this._getDirection(t, r) === "vertical", i = De(Y), S("dragOverValid"), ee.eventCanceled)
          return m;
        if (a)
          return je = Pe, g(), this._hideClone(), S("revert"), ee.eventCanceled || (Ti ? Pe.insertBefore(Y, Ti) : Pe.appendChild(Y)), v(!0);
        var E = Ag(n, l.draggable);
        if (!E || TF(t, d, this) && !E.animated) {
          if (E === Y)
            return v(!1);
          if (E && n === t.target && (r = E), r && (o = De(r)), Ks(Pe, n, Y, i, r, o, t, !!r) !== !1)
            return g(), E && E.nextSibling ? n.insertBefore(Y, E.nextSibling) : n.appendChild(Y), je = n, w(), v(!0);
        } else if (E && OF(t, d, this)) {
          var O = ea(n, 0, l, !0);
          if (O === Y)
            return v(!1);
          if (r = O, o = De(r), Ks(Pe, n, Y, i, r, o, t, !1) !== !1)
            return g(), n.insertBefore(Y, O), je = n, w(), v(!0);
        } else if (r.parentNode === n) {
          o = De(r);
          var b = 0, A, T = Y.parentNode !== n, P = !EF(Y.animated && Y.toRect || i, r.animated && r.toRect || o, d), _ = d ? "top" : "left", I = h0(r, "top", "top") || h0(Y, "top", "top"), F = I ? I.scrollTop : void 0;
          ao !== r && (A = o[_], vl = !1, Js = !P && l.invertSwap || T), b = IF(t, r, o, d, P ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Js, ao === r);
          var U;
          if (b !== 0) {
            var q = Ve(Y);
            do
              q -= b, U = je.children[q];
            while (U && (X(U, "display") === "none" || U === ae));
          }
          if (b === 0 || U === r)
            return v(!1);
          ao = r, gl = b;
          var oe = r.nextElementSibling, ne = !1;
          ne = b === 1;
          var fe = Ks(Pe, n, Y, i, r, o, t, ne);
          if (fe !== !1)
            return (fe === 1 || fe === -1) && (ne = fe === 1), Oh = !0, setTimeout(kF, 30), g(), ne && !oe ? n.appendChild(Y) : r.parentNode.insertBefore(Y, ne ? oe : r), I && RA(I, 0, F - I.scrollTop), je = Y.parentNode, A !== void 0 && !Js && (vu = Math.abs(A - De(r)[_])), w(), v(!0);
        }
        if (n.contains(Y))
          return v(!1);
      }
      return !1;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function() {
      ue(document, "mousemove", this._onTouchMove), ue(document, "touchmove", this._onTouchMove), ue(document, "pointermove", this._onTouchMove), ue(document, "dragover", Ai), ue(document, "mousemove", Ai), ue(document, "touchmove", Ai);
    },
    _offUpEvents: function() {
      var t = this.el.ownerDocument;
      ue(t, "mouseup", this._onDrop), ue(t, "touchend", this._onDrop), ue(t, "pointerup", this._onDrop), ue(t, "touchcancel", this._onDrop), ue(document, "selectstart", this);
    },
    _onDrop: function(t) {
      var n = this.el, r = this.options;
      if (Gt = Ve(Y), Mr = Ve(Y, r.draggable), It("drop", this, {
        evt: t
      }), je = Y && Y.parentNode, Gt = Ve(Y), Mr = Ve(Y, r.draggable), ee.eventCanceled) {
        this._nulling();
        return;
      }
      uo = !1, Js = !1, vl = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Th(this.cloneId), Th(this._dragStartId), this.nativeDraggable && (ue(document, "drop", this), ue(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dl && X(document.body, "user-select", ""), X(Y, "transform", ""), t && (Ja && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), ae && ae.parentNode && ae.parentNode.removeChild(ae), (Pe === je || ut && ut.lastPutMode !== "clone") && Le && Le.parentNode && Le.parentNode.removeChild(Le), Y && (this.nativeDraggable && ue(Y, "dragend", this), Up(Y), Y.style["will-change"] = "", Ja && !uo && Fe(Y, ut ? ut.options.ghostClass : this.options.ghostClass, !1), Fe(Y, this.options.chosenClass, !1), Et({
        sortable: this,
        name: "unchoose",
        toEl: je,
        newIndex: null,
        newDraggableIndex: null,
        originalEvent: t
      }), Pe !== je ? (Gt >= 0 && (Et({
        rootEl: je,
        name: "add",
        toEl: je,
        fromEl: Pe,
        originalEvent: t
      }), Et({
        sortable: this,
        name: "remove",
        toEl: je,
        originalEvent: t
      }), Et({
        rootEl: je,
        name: "sort",
        toEl: je,
        fromEl: Pe,
        originalEvent: t
      }), Et({
        sortable: this,
        name: "sort",
        toEl: je,
        originalEvent: t
      })), ut && ut.save()) : Gt !== Ao && Gt >= 0 && (Et({
        sortable: this,
        name: "update",
        toEl: je,
        originalEvent: t
      }), Et({
        sortable: this,
        name: "sort",
        toEl: je,
        originalEvent: t
      })), ee.active && ((Gt == null || Gt === -1) && (Gt = Ao, Mr = ml), Et({
        sortable: this,
        name: "end",
        toEl: je,
        originalEvent: t
      }), this.save()))), this._nulling();
    },
    _nulling: function() {
      It("nulling", this), Pe = Y = je = ae = Ti = Le = gu = Vr = Ei = In = Ja = Gt = Mr = Ao = ml = ao = gl = ut = $s = ee.dragged = ee.ghost = ee.clone = ee.active = null, pc.forEach(function(t) {
        t.checked = !0;
      }), pc.length = Fp = Mp = 0;
    },
    handleEvent: function(t) {
      switch (t.type) {
        case "drop":
        case "dragend":
          this._onDrop(t);
          break;
        case "dragenter":
        case "dragover":
          Y && (this._onDragOver(t), xF(t));
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
        n = r[i], Dn(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || _F(n));
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
        Dn(l, this.options.draggable, i, !1) && (r[o] = l);
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
      return Dn(t, n || this.options.draggable, this.el, !1);
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
      var i = hs.modifyOption(this, t, n);
      typeof i != "undefined" ? r[t] = i : r[t] = n, t === "group" && MA(r);
    },
    /**
     * Destroy
     */
    destroy: function() {
      It("destroy", this);
      var t = this.el;
      t[bt] = null, ue(t, "mousedown", this._onTapStart), ue(t, "touchstart", this._onTapStart), ue(t, "pointerdown", this._onTapStart), this.nativeDraggable && (ue(t, "dragover", this), ue(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
        n.removeAttribute("draggable");
      }), this._onDrop(), this._disableDelayedDragEvents(), fc.splice(fc.indexOf(this.el), 1), this.el = t = null;
    },
    _hideClone: function() {
      if (!Vr) {
        if (It("hideClone", this), ee.eventCanceled)
          return;
        X(Le, "display", "none"), this.options.removeCloneOnHide && Le.parentNode && Le.parentNode.removeChild(Le), Vr = !0;
      }
    },
    _showClone: function(t) {
      if (t.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (Vr) {
        if (It("showClone", this), ee.eventCanceled)
          return;
        Y.parentNode == Pe && !this.options.group.revertClone ? Pe.insertBefore(Le, Y) : Ti ? Pe.insertBefore(Le, Ti) : Pe.appendChild(Le), this.options.group.revertClone && this.animate(Y, Le), X(Le, "display", ""), Vr = !1;
      }
    }
  };
  function xF(e) {
    e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
  }
  function Ks(e, t, n, r, i, o, a, l) {
    var s, u = e[bt], c = u.options.onMove, f;
    return window.CustomEvent && !_r && !ds ? s = new CustomEvent("move", {
      bubbles: !0,
      cancelable: !0
    }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || De(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
  }
  function Up(e) {
    e.draggable = !1;
  }
  function kF() {
    Oh = !1;
  }
  function OF(e, t, n) {
    var r = De(ea(n.el, 0, n.options, !0)), i = 10;
    return t ? e.clientX < r.left - i || e.clientY < r.top && e.clientX < r.right : e.clientY < r.top - i || e.clientY < r.bottom && e.clientX < r.left;
  }
  function TF(e, t, n) {
    var r = De(Ag(n.el, n.options.draggable)), i = 10;
    return t ? e.clientX > r.right + i || e.clientX <= r.right && e.clientY > r.bottom && e.clientX >= r.left : e.clientX > r.right && e.clientY > r.top || e.clientX <= r.right && e.clientY > r.bottom + i;
  }
  function IF(e, t, n, r, i, o, a, l) {
    var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
    if (!a) {
      if (l && vu < u * i) {
        if (!vl && (gl === 1 ? s > c + u * o / 2 : s < f - u * o / 2) && (vl = !0), vl)
          p = !0;
        else if (gl === 1 ? s < c + vu : s > f - vu)
          return -gl;
      } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
        return PF(t);
    }
    return p = p || a, p && (s < c + u * o / 2 || s > f - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
  }
  function PF(e) {
    return Ve(Y) < Ve(e) ? 1 : -1;
  }
  function _F(e) {
    for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
      r += t.charCodeAt(n);
    return r.toString(36);
  }
  function NF(e) {
    pc.length = 0;
    for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
      var r = t[n];
      r.checked && pc.push(r);
    }
  }
  function yu(e) {
    return setTimeout(e, 0);
  }
  function Th(e) {
    return clearTimeout(e);
  }
  Of && de(document, "touchmove", function(e) {
    (ee.active || uo) && e.cancelable && e.preventDefault();
  });
  ee.utils = {
    on: de,
    off: ue,
    css: X,
    find: NA,
    is: function(t, n) {
      return !!Dn(t, n, t, !1);
    },
    extend: mF,
    throttle: DA,
    closest: Dn,
    toggleClass: Fe,
    clone: Cg,
    index: Ve,
    nextTick: yu,
    cancelNextTick: Th,
    detectDirection: FA,
    getChild: ea
  };
  ee.get = function(e) {
    return e[bt];
  };
  ee.mount = function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
      if (!r.prototype || !r.prototype.constructor)
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
      r.utils && (ee.utils = or(or({}, ee.utils), r.utils)), hs.mount(r);
    });
  };
  ee.create = function(e, t) {
    return new ee(e, t);
  };
  ee.version = pF;
  var Ke = [], Qa, Ih, Ph = !1, zp, Wp, dc, Ka;
  function DF() {
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
        this.sortable.nativeDraggable ? de(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? de(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? de(document, "touchmove", this._handleFallbackAutoScroll) : de(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function(n) {
        var r = n.originalEvent;
        !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
      },
      drop: function() {
        this.sortable.nativeDraggable ? ue(document, "dragover", this._handleAutoScroll) : (ue(document, "pointermove", this._handleFallbackAutoScroll), ue(document, "touchmove", this._handleFallbackAutoScroll), ue(document, "mousemove", this._handleFallbackAutoScroll)), b0(), wu(), gF();
      },
      nulling: function() {
        dc = Ih = Qa = Ph = Ka = zp = Wp = null, Ke.length = 0;
      },
      _handleFallbackAutoScroll: function(n) {
        this._handleAutoScroll(n, !0);
      },
      _handleAutoScroll: function(n, r) {
        var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
        if (dc = n, r || this.options.forceAutoScrollFallback || ds || _r || dl) {
          jp(n, this.options, l, r);
          var s = $r(l, !0);
          Ph && (!Ka || o !== zp || a !== Wp) && (Ka && b0(), Ka = setInterval(function() {
            var u = $r(document.elementFromPoint(o, a), !0);
            u !== s && (s = u, wu()), jp(n, i.options, u, r);
          }, 10), zp = o, Wp = a);
        } else {
          if (!this.options.bubbleScroll || $r(l, !0) === tr()) {
            wu();
            return;
          }
          jp(n, this.options, $r(l, !1), !1);
        }
      }
    }, wn(e, {
      pluginName: "scroll",
      initializeByDefault: !0
    });
  }
  function wu() {
    Ke.forEach(function(e) {
      clearInterval(e.pid);
    }), Ke = [];
  }
  function b0() {
    clearInterval(Ka);
  }
  var jp = DA(function(e, t, n, r) {
    if (t.scroll) {
      var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = tr(), u = !1, c;
      Ih !== n && (Ih = n, wu(), Qa = t.scroll, c = t.scrollFn, Qa === !0 && (Qa = $r(n, !0)));
      var f = 0, p = Qa;
      do {
        var d = p, h = De(d), m = h.top, S = h.bottom, g = h.left, v = h.right, w = h.width, E = h.height, O = void 0, b = void 0, A = d.scrollWidth, T = d.scrollHeight, P = X(d), _ = d.scrollLeft, I = d.scrollTop;
        d === s ? (O = w < A && (P.overflowX === "auto" || P.overflowX === "scroll" || P.overflowX === "visible"), b = E < T && (P.overflowY === "auto" || P.overflowY === "scroll" || P.overflowY === "visible")) : (O = w < A && (P.overflowX === "auto" || P.overflowX === "scroll"), b = E < T && (P.overflowY === "auto" || P.overflowY === "scroll"));
        var F = O && (Math.abs(v - i) <= a && _ + w < A) - (Math.abs(g - i) <= a && !!_), U = b && (Math.abs(S - o) <= a && I + E < T) - (Math.abs(m - o) <= a && !!I);
        if (!Ke[f])
          for (var q = 0; q <= f; q++)
            Ke[q] || (Ke[q] = {});
        (Ke[f].vx != F || Ke[f].vy != U || Ke[f].el !== d) && (Ke[f].el = d, Ke[f].vx = F, Ke[f].vy = U, clearInterval(Ke[f].pid), (F != 0 || U != 0) && (u = !0, Ke[f].pid = setInterval(function() {
          r && this.layer === 0 && ee.active._onTouchMove(dc);
          var oe = Ke[this.layer].vy ? Ke[this.layer].vy * l : 0, ne = Ke[this.layer].vx ? Ke[this.layer].vx * l : 0;
          typeof c == "function" && c.call(ee.dragged.parentNode[bt], ne, oe, e, dc, Ke[this.layer].el) !== "continue" || RA(Ke[this.layer].el, ne, oe);
        }.bind({
          layer: f
        }), 24))), f++;
      } while (t.bubbleScroll && p !== s && (p = $r(p, !1)));
      Ph = u;
    }
  }, 30), zA = function(t) {
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
  function xg() {
  }
  xg.prototype = {
    startIndex: null,
    dragStart: function(t) {
      var n = t.oldDraggableIndex;
      this.startIndex = n;
    },
    onSpill: function(t) {
      var n = t.dragEl, r = t.putSortable;
      this.sortable.captureAnimationState(), r && r.captureAnimationState();
      var i = ea(this.sortable.el, this.startIndex, this.options);
      i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
    },
    drop: zA
  };
  wn(xg, {
    pluginName: "revertOnSpill"
  });
  function kg() {
  }
  kg.prototype = {
    onSpill: function(t) {
      var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
      i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
    },
    drop: zA
  };
  wn(kg, {
    pluginName: "removeOnSpill"
  });
  var an;
  function RF() {
    function e() {
      this.defaults = {
        swapClass: "sortable-swap-highlight"
      };
    }
    return e.prototype = {
      dragStart: function(n) {
        var r = n.dragEl;
        an = r;
      },
      dragOverValid: function(n) {
        var r = n.completed, i = n.target, o = n.onMove, a = n.activeSortable, l = n.changed, s = n.cancel;
        if (a.options.swap) {
          var u = this.sortable.el, c = this.options;
          if (i && i !== u) {
            var f = an;
            o(i) !== !1 ? (Fe(i, c.swapClass, !0), an = i) : an = null, f && f !== an && Fe(f, c.swapClass, !1);
          }
          l(), r(!0), s();
        }
      },
      drop: function(n) {
        var r = n.activeSortable, i = n.putSortable, o = n.dragEl, a = i || this.sortable, l = this.options;
        an && Fe(an, l.swapClass, !1), an && (l.swap || i && i.options.swap) && o !== an && (a.captureAnimationState(), a !== r && r.captureAnimationState(), LF(o, an), a.animateAll(), a !== r && r.animateAll());
      },
      nulling: function() {
        an = null;
      }
    }, wn(e, {
      pluginName: "swap",
      eventProperties: function() {
        return {
          swapItem: an
        };
      }
    });
  }
  function LF(e, t) {
    var n = e.parentNode, r = t.parentNode, i, o;
    !n || !r || n.isEqualNode(t) || r.isEqualNode(e) || (i = Ve(e), o = Ve(t), n.isEqualNode(r) && i < o && o++, n.insertBefore(t, n.children[i]), r.insertBefore(e, r.children[o]));
  }
  var ie = [], Vt = [], Ma, Pn, Ba = !1, Pt = !1, lo = !1, xe, Ua, Xs;
  function FF() {
    function e(t) {
      for (var n in this)
        n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
      t.options.avoidImplicitDeselect || (t.options.supportPointer ? de(document, "pointerup", this._deselectMultiDrag) : (de(document, "mouseup", this._deselectMultiDrag), de(document, "touchend", this._deselectMultiDrag))), de(document, "keydown", this._checkKeyDown), de(document, "keyup", this._checkKeyUp), this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        avoidImplicitDeselect: !1,
        setData: function(i, o) {
          var a = "";
          ie.length && Pn === t ? ie.forEach(function(l, s) {
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
            Vt.push(Cg(ie[o])), Vt[o].sortableIndex = ie[o].sortableIndex, Vt[o].draggable = !1, Vt[o].style["will-change"] = "", Fe(Vt[o], this.options.selectedClass, !1), ie[o] === xe && Fe(Vt[o], this.options.chosenClass, !1);
          r._hideClone(), i();
        }
      },
      clone: function(n) {
        var r = n.sortable, i = n.rootEl, o = n.dispatchSortableEvent, a = n.cancel;
        this.isMultiDrag && (this.options.removeCloneOnHide || ie.length && Pn === r && (S0(!0, i), o("clone"), a()));
      },
      showClone: function(n) {
        var r = n.cloneNowShown, i = n.rootEl, o = n.cancel;
        this.isMultiDrag && (S0(!1, i), Vt.forEach(function(a) {
          X(a, "display", "");
        }), r(), Xs = !1, o());
      },
      hideClone: function(n) {
        var r = this;
        n.sortable;
        var i = n.cloneNowHidden, o = n.cancel;
        this.isMultiDrag && (Vt.forEach(function(a) {
          X(a, "display", "none"), r.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
        }), i(), Xs = !0, o());
      },
      dragStartGlobal: function(n) {
        n.sortable, !this.isMultiDrag && Pn && Pn.multiDrag._deselectMultiDrag(), ie.forEach(function(r) {
          r.sortableIndex = Ve(r);
        }), ie = ie.sort(function(r, i) {
          return r.sortableIndex - i.sortableIndex;
        }), lo = !0;
      },
      dragStarted: function(n) {
        var r = this, i = n.sortable;
        if (this.isMultiDrag) {
          if (this.options.sort && (i.captureAnimationState(), this.options.animation)) {
            ie.forEach(function(a) {
              a !== xe && X(a, "position", "absolute");
            });
            var o = De(xe, !1, !0, !0);
            ie.forEach(function(a) {
              a !== xe && g0(a, o);
            }), Pt = !0, Ba = !0;
          }
          i.animateAll(function() {
            Pt = !1, Ba = !1, r.options.animation && ie.forEach(function(a) {
              Rp(a);
            }), r.options.sort && qs();
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
          }), Rp(l), l.fromRect = a, r.removeAnimationState(l);
        }), Pt = !1, MF(!this.options.removeCloneOnHide, i));
      },
      dragOverCompleted: function(n) {
        var r = n.sortable, i = n.isOwner, o = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, u = this.options;
        if (o) {
          if (i && a._hideClone(), Ba = !1, u.animation && ie.length > 1 && (Pt || !i && !a.options.sort && !s)) {
            var c = De(xe, !1, !0, !0);
            ie.forEach(function(p) {
              p !== xe && (g0(p, c), l.appendChild(p));
            }), Pt = !0;
          }
          if (!i)
            if (Pt || qs(), ie.length > 1) {
              var f = Xs;
              a._showClone(r), a.options.animation && !Xs && f && Vt.forEach(function(p) {
                a.addAnimationState({
                  target: p,
                  rect: Ua
                }), p.fromRect = Ua, p.thisAnimationDuration = null;
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
          Ua = wn({}, r);
          var a = Bi(xe, !0);
          Ua.top -= a.f, Ua.left -= a.e;
        }
      },
      dragOverAnimationComplete: function() {
        Pt && (Pt = !1, qs());
      },
      drop: function(n) {
        var r = n.originalEvent, i = n.rootEl, o = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, u = n.putSortable, c = u || this.sortable;
        if (r) {
          var f = this.options, p = o.children;
          if (!lo)
            if (f.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Fe(xe, f.selectedClass, !~ie.indexOf(xe)), ~ie.indexOf(xe))
              ie.splice(ie.indexOf(xe), 1), Ma = null, $a({
                sortable: a,
                rootEl: i,
                name: "deselect",
                targetEl: xe,
                originalEvent: r
              });
            else {
              if (ie.push(xe), $a({
                sortable: a,
                rootEl: i,
                name: "select",
                targetEl: xe,
                originalEvent: r
              }), r.shiftKey && Ma && a.el.contains(Ma)) {
                var d = Ve(Ma), h = Ve(xe);
                if (~d && ~h && d !== h) {
                  var m, S;
                  for (h > d ? (S = d, m = h) : (S = h, m = d + 1); S < m; S++)
                    ~ie.indexOf(p[S]) || (Fe(p[S], f.selectedClass, !0), ie.push(p[S]), $a({
                      sortable: a,
                      rootEl: i,
                      name: "select",
                      targetEl: p[S],
                      originalEvent: r
                    }));
                }
              } else
                Ma = xe;
              Pn = c;
            }
          if (lo && this.isMultiDrag) {
            if (Pt = !1, (o[bt].options.sort || o !== i) && ie.length > 1) {
              var g = De(xe), v = Ve(xe, ":not(." + this.options.selectedClass + ")");
              if (!Ba && f.animation && (xe.thisAnimationDuration = null), c.captureAnimationState(), !Ba && (f.animation && (xe.fromRect = g, ie.forEach(function(E) {
                if (E.thisAnimationDuration = null, E !== xe) {
                  var O = Pt ? De(E) : g;
                  E.fromRect = O, c.addAnimationState({
                    target: E,
                    rect: O
                  });
                }
              })), qs(), ie.forEach(function(E) {
                p[v] ? o.insertBefore(E, p[v]) : o.appendChild(E), v++;
              }), s === Ve(xe))) {
                var w = !1;
                ie.forEach(function(E) {
                  if (E.sortableIndex !== Ve(E)) {
                    w = !0;
                    return;
                  }
                }), w && l("update");
              }
              ie.forEach(function(E) {
                Rp(E);
              }), c.animateAll();
            }
            Pn = c;
          }
          (i === o || u && u.lastPutMode !== "clone") && Vt.forEach(function(E) {
            E.parentNode && E.parentNode.removeChild(E);
          });
        }
      },
      nullingGlobal: function() {
        this.isMultiDrag = lo = !1, Vt.length = 0;
      },
      destroyGlobal: function() {
        this._deselectMultiDrag(), ue(document, "pointerup", this._deselectMultiDrag), ue(document, "mouseup", this._deselectMultiDrag), ue(document, "touchend", this._deselectMultiDrag), ue(document, "keydown", this._checkKeyDown), ue(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function(n) {
        if (!(typeof lo != "undefined" && lo) && Pn === this.sortable && !(n && Dn(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
          for (; ie.length; ) {
            var r = ie[0];
            Fe(r, this.options.selectedClass, !1), ie.shift(), $a({
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
    }, wn(e, {
      // Static methods & properties
      pluginName: "multiDrag",
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function(n) {
          var r = n.parentNode[bt];
          !r || !r.options.multiDrag || ~ie.indexOf(n) || (Pn && Pn !== r && (Pn.multiDrag._deselectMultiDrag(), Pn = r), Fe(n, r.options.selectedClass, !0), ie.push(n));
        },
        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function(n) {
          var r = n.parentNode[bt], i = ie.indexOf(n);
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
          Pt && o !== xe ? a = -1 : Pt ? a = Ve(o, ":not(." + n.options.selectedClass + ")") : a = Ve(o), i.push({
            multiDragElement: o,
            index: a
          });
        }), {
          items: lF(ie),
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
  function MF(e, t) {
    ie.forEach(function(n, r) {
      var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
      i ? t.insertBefore(n, i) : t.appendChild(n);
    });
  }
  function S0(e, t) {
    Vt.forEach(function(n, r) {
      var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
      i ? t.insertBefore(n, i) : t.appendChild(n);
    });
  }
  function qs() {
    ie.forEach(function(e) {
      e !== xe && e.parentNode && e.parentNode.removeChild(e);
    });
  }
  ee.mount(new DF());
  ee.mount(kg, xg);
  const BF = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    MultiDrag: FF,
    Sortable: ee,
    Swap: RF,
    default: ee
  }, Symbol.toStringTag, { value: "Module" })), UF = /* @__PURE__ */ R0(BF);
  var _h = {}, zF = {
    get exports() {
      return _h;
    },
    set exports(e) {
      _h = e;
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
  })(zF);
  var WF = "Invariant failed";
  function jF(e, t) {
    if (!e)
      throw new Error(WF);
  }
  const YF = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: jF
  }, Symbol.toStringTag, { value: "Module" })), VF = /* @__PURE__ */ R0(YF);
  (function(e) {
    var t = UF, n = _h, r = J, i = VF;
    function o(b) {
      return b && b.__esModule ? b.default : b;
    }
    function a(b, A, T, P) {
      Object.defineProperty(b, A, { get: T, set: P, enumerable: !0, configurable: !0 });
    }
    function l(b, A) {
      return Object.keys(A).forEach(function(T) {
        T === "default" || T === "__esModule" || b.hasOwnProperty(T) || Object.defineProperty(b, T, {
          enumerable: !0,
          get: function() {
            return A[T];
          }
        });
      }), b;
    }
    a(e.exports, "Sortable", () => $882b6d93070905b3$re_export$Sortable), a(e.exports, "Direction", () => $882b6d93070905b3$re_export$Direction), a(e.exports, "DOMRect", () => $882b6d93070905b3$re_export$DOMRect), a(e.exports, "GroupOptions", () => $882b6d93070905b3$re_export$GroupOptions), a(e.exports, "MoveEvent", () => $882b6d93070905b3$re_export$MoveEvent), a(e.exports, "Options", () => $882b6d93070905b3$re_export$Options), a(e.exports, "PullResult", () => $882b6d93070905b3$re_export$PullResult), a(e.exports, "PutResult", () => $882b6d93070905b3$re_export$PutResult), a(e.exports, "SortableEvent", () => $882b6d93070905b3$re_export$SortableEvent), a(e.exports, "SortableOptions", () => $882b6d93070905b3$re_export$SortableOptions), a(e.exports, "Utils", () => $882b6d93070905b3$re_export$Utils), a(e.exports, "ReactSortable", () => E);
    function s(b) {
      b.parentElement !== null && b.parentElement.removeChild(b);
    }
    function u(b, A, T) {
      const P = b.children[T] || null;
      b.insertBefore(A, P);
    }
    function c(b) {
      b.forEach((A) => s(A.element));
    }
    function f(b) {
      b.forEach((A) => {
        u(A.parentElement, A.element, A.oldIndex);
      });
    }
    function p(b, A) {
      const T = S(b), P = {
        parentElement: b.from
      };
      let _ = [];
      switch (T) {
        case "normal":
          _ = [
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
          }, P), q = M({
            element: b.swapItem,
            oldIndex: b.newIndex,
            newIndex: b.oldIndex
          }, P);
          _ = [
            U,
            q
          ];
          break;
        case "multidrag":
          _ = b.oldIndicies.map((oe, ne) => M({
            element: oe.multiDragElement,
            oldIndex: oe.index,
            newIndex: b.newIndicies[ne].index
          }, P));
          break;
      }
      return g(_, A);
    }
    function d(b, A) {
      const T = h(b, A);
      return m(b, T);
    }
    function h(b, A) {
      const T = [
        ...A
      ];
      return b.concat().reverse().forEach((P) => T.splice(P.oldIndex, 1)), T;
    }
    function m(b, A, T, P) {
      const _ = [
        ...A
      ];
      return b.forEach((I) => {
        const F = P && T && P(I.item, T);
        _.splice(I.newIndex, 0, F || I.item);
      }), _;
    }
    function S(b) {
      return b.oldIndicies && b.oldIndicies.length > 0 ? "multidrag" : b.swapItem ? "swap" : "normal";
    }
    function g(b, A) {
      return b.map((P) => Q(M({}, P), {
        item: A[P.oldIndex]
      })).sort((P, _) => P.oldIndex - _.oldIndex);
    }
    function v(b) {
      const kn = b, { list: A, setList: T, children: P, tag: _, style: I, className: F, clone: U, onAdd: q, onChange: oe, onChoose: ne, onClone: fe, onEnd: B, onFilter: V, onRemove: H, onSort: x, onStart: C, onUnchoose: tt, onUpdate: He, onMove: Qe, onSpill: me, onSelect: We, onDeselect: st } = kn;
      return it(kn, ["list", "setList", "children", "tag", "style", "className", "clone", "onAdd", "onChange", "onChoose", "onClone", "onEnd", "onFilter", "onRemove", "onSort", "onStart", "onUnchoose", "onUpdate", "onMove", "onSpill", "onSelect", "onDeselect"]);
    }
    const w = {
      dragging: null
    };
    class E extends r.Component {
      constructor(A) {
        super(A), this.ref = /* @__PURE__ */ (0, r.createRef)();
        const T = [
          ...A.list
        ].map((P) => Object.assign(P, {
          chosen: !1,
          selected: !1
        }));
        A.setList(T, this.sortable, w), o(i)(
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
        const { tag: A, style: T, className: P, id: _ } = this.props, I = {
          style: T,
          className: P,
          id: _
        }, F = !A || A === null ? "div" : A;
        return /* @__PURE__ */ (0, r.createElement)(F, M({
          // @todo - find a way (perhaps with the callback) to allow AntD components to work
          ref: this.ref
        }, I), this.getChildren());
      }
      getChildren() {
        const { children: A, dataIdAttr: T, selectedClass: P = "sortable-selected", chosenClass: _ = "sortable-chosen", dragClass: I = "sortable-drag", fallbackClass: F = "sortable-falback", ghostClass: U = "sortable-ghost", swapClass: q = "sortable-swap-highlight", filter: oe = "sortable-filter", list: ne } = this.props;
        if (!A || A == null)
          return null;
        const fe = T || "data-id";
        return r.Children.map(A, (B, V) => {
          if (B === void 0)
            return;
          const H = ne[V] || {}, { className: x } = B.props, C = typeof oe == "string" && {
            [oe.replace(".", "")]: !!H.filtered
          }, tt = o(n)(x, M({
            [P]: H.selected,
            [_]: H.chosen
          }, C));
          return /* @__PURE__ */ (0, r.cloneElement)(B, {
            [fe]: B.key,
            className: tt
          });
        });
      }
      /** Appends the `sortable` property to this component */
      get sortable() {
        const A = this.ref.current;
        if (A === null)
          return null;
        const T = Object.keys(A).find((P) => P.includes("Sortable"));
        return T ? A[T] : null;
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
        ], T = [
          "onChange",
          "onClone",
          "onFilter",
          "onSort"
        ], P = v(this.props);
        A.forEach((I) => P[I] = this.prepareOnHandlerPropAndDOM(I)), T.forEach((I) => P[I] = this.prepareOnHandlerProp(I));
        const _ = (I, F) => {
          const { onMove: U } = this.props, q = I.willInsertAfter || -1;
          if (!U)
            return q;
          const oe = U(I, F, this.sortable, w);
          return typeof oe == "undefined" ? !1 : oe;
        };
        return Q(M({}, P), {
          onMove: _
        });
      }
      /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
      prepareOnHandlerPropAndDOM(A) {
        return (T) => {
          this.callOnHandlerProp(T, A), this[A](T);
        };
      }
      /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
      prepareOnHandlerProp(A) {
        return (T) => {
          this.callOnHandlerProp(T, A);
        };
      }
      /** Calls the `props.on[Handler]` function */
      callOnHandlerProp(A, T) {
        const P = this.props[T];
        P && P(A, this.sortable, w);
      }
      // SORTABLE DOM HANDLING
      onAdd(A) {
        const { list: T, setList: P, clone: _ } = this.props, I = [
          ...w.dragging.props.list
        ], F = p(A, I);
        c(F);
        const U = m(F, T, A, _).map((q) => Object.assign(q, {
          selected: !1
        }));
        P(U, this.sortable, w);
      }
      onRemove(A) {
        const { list: T, setList: P } = this.props, _ = S(A), I = p(A, T);
        f(I);
        let F = [
          ...T
        ];
        if (A.pullMode !== "clone")
          F = h(I, F);
        else {
          let U = I;
          switch (_) {
            case "multidrag":
              U = I.map((q, oe) => Q(M({}, q), {
                element: A.clones[oe]
              }));
              break;
            case "normal":
              U = I.map((q) => Q(M({}, q), {
                element: A.clone
              }));
              break;
            case "swap":
            default:
              o(i)(!0, `mode "${_}" cannot clone. Please remove "props.clone" from <ReactSortable/> when using the "${_}" plugin`);
          }
          c(U), I.forEach((q) => {
            const oe = q.oldIndex, ne = this.props.clone(q.item, A);
            F.splice(oe, 1, ne);
          });
        }
        F = F.map((U) => Object.assign(U, {
          selected: !1
        })), P(F, this.sortable, w);
      }
      onUpdate(A) {
        const { list: T, setList: P } = this.props, _ = p(A, T);
        c(_), f(_);
        const I = d(_, T);
        return P(I, this.sortable, w);
      }
      onStart() {
        w.dragging = this;
      }
      onEnd() {
        w.dragging = null;
      }
      onChoose(A) {
        const { list: T, setList: P } = this.props, _ = T.map((I, F) => {
          let U = I;
          return F === A.oldIndex && (U = Object.assign(I, {
            chosen: !0
          })), U;
        });
        P(_, this.sortable, w);
      }
      onUnchoose(A) {
        const { list: T, setList: P } = this.props, _ = T.map((I, F) => {
          let U = I;
          return F === A.oldIndex && (U = Object.assign(U, {
            chosen: !1
          })), U;
        });
        P(_, this.sortable, w);
      }
      onSpill(A) {
        const { removeOnSpill: T, revertOnSpill: P } = this.props;
        T && !P && s(A.item);
      }
      onSelect(A) {
        const { list: T, setList: P } = this.props, _ = T.map((I) => Object.assign(I, {
          selected: !1
        }));
        A.newIndicies.forEach((I) => {
          const F = I.index;
          if (F === -1) {
            console.log(`"${A.type}" had indice of "${I.index}", which is probably -1 and doesn't usually happen here.`), console.log(A);
            return;
          }
          _[F].selected = !0;
        }), P(_, this.sortable, w);
      }
      onDeselect(A) {
        const { list: T, setList: P } = this.props, _ = T.map((I) => Object.assign(I, {
          selected: !1
        }));
        A.newIndicies.forEach((I) => {
          const F = I.index;
          F !== -1 && (_[F].selected = !0);
        }), P(_, this.sortable, w);
      }
    }
    /* eslint-disable-next-line */
    Mg(E, "defaultProps", {
      clone: (A) => A
    });
    var O = {};
    l(e.exports, O);
  })(rF);
  const GF = "_container_xt7ji_1", HF = "_list_xt7ji_6", $F = "_item_xt7ji_15", JF = "_keyField_xt7ji_29", QF = "_valueField_xt7ji_34", KF = "_header_xt7ji_39", XF = "_dragHandle_xt7ji_45", qF = "_deleteButton_xt7ji_55", ZF = "_addItemButton_xt7ji_65", e8 = "_separator_xt7ji_72", jt = {
    container: GF,
    list: HF,
    item: $F,
    keyField: JF,
    valueField: QF,
    header: KF,
    dragHandle: XF,
    deleteButton: qF,
    addItemButton: ZF,
    separator: e8
  };
  function t8(e) {
    return !(typeof e != "object" || Object.values(e).find(
      (n) => typeof n != "string"
    ));
  }
  function n8({
    id: e,
    label: t,
    value: n,
    onChange: r,
    newItemValue: i = { key: "myKey", value: "myValue" }
  }) {
    const { state: o, setState: a, addItem: l, deleteItem: s } = r8({
      value: n,
      onChange: r,
      newItemValue: i
    });
    return /* @__PURE__ */ L(
      "div",
      {
        className: jt.list,
        "aria-labelledby": Or(e),
        "aria-label": t,
        children: [
          /* @__PURE__ */ L(
            "div",
            {
              className: jt.item + " " + jt.header,
              "aria-label": "Columns field labels",
              children: [
                /* @__PURE__ */ y("span", { className: jt.keyField, children: "Key" }),
                /* @__PURE__ */ y("span", { className: jt.valueField, children: "Value" })
              ]
            }
          ),
          /* @__PURE__ */ y(
            xh.ReactSortable,
            {
              list: o,
              setList: a,
              handle: `.${jt.dragHandle}`,
              children: o.map((u, c) => /* @__PURE__ */ L("div", { className: jt.item, children: [
                /* @__PURE__ */ y("div", { className: jt.dragHandle, title: "Reorder list", children: /* @__PURE__ */ y(nF, {}) }),
                /* @__PURE__ */ y(
                  "input",
                  {
                    title: "Key Field",
                    className: jt.keyField,
                    type: "text",
                    value: u.key,
                    onChange: (f) => {
                      const p = [...o];
                      p[c] = Q(M({}, u), { key: f.target.value }), a(p);
                    }
                  }
                ),
                /* @__PURE__ */ y("span", { className: jt.separator, children: ":" }),
                /* @__PURE__ */ y(
                  "input",
                  {
                    title: "Value Field",
                    className: jt.valueField,
                    type: "text",
                    value: u.value,
                    onChange: (f) => {
                      const p = [...o];
                      p[c] = Q(M({}, u), { value: f.target.value }), a(p);
                    }
                  }
                ),
                /* @__PURE__ */ y(
                  dt,
                  {
                    className: jt.deleteButton,
                    onClick: () => s(u.id),
                    variant: ["icon", "transparent"],
                    title: `Delete ${u.value}`,
                    children: /* @__PURE__ */ y(Hc, {})
                  }
                )
              ] }, u.id))
            }
          ),
          /* @__PURE__ */ y(
            dt,
            {
              className: jt.addItemButton,
              onClick: () => l(),
              variant: ["icon", "transparent"],
              title: "Add new item",
              "aria-label": "Add new item to list",
              children: /* @__PURE__ */ y(og, {})
            }
          )
        ]
      }
    );
  }
  function r8({
    value: e,
    onChange: t,
    newItemValue: n
  }) {
    const [r, i] = k.useState(
      e !== void 0 ? Object.keys(e).map((l, s) => ({ id: s, key: l, value: e[l] })) : []
    );
    k.useEffect(() => {
      const l = i8(r);
      F_(l, e != null ? e : {}) || t(l);
    }, [t, r, e]);
    const o = k.useCallback((l) => {
      i((s) => s.filter(({ id: u }) => u !== l));
    }, []), a = k.useCallback(() => {
      i(
        (l) => [...l, M({ id: -1 }, n)].map((s, u) => Q(M({}, s), {
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
  function i8(e) {
    return e.reduce(
      (n, { key: r, value: i }) => (n[r] = i, n),
      {}
    );
  }
  const o8 = "__DEFAULT-DROPDOWN-CHOICE__";
  function a8({
    id: e,
    label: t,
    choices: n,
    onChange: r,
    value: i
  }) {
    k.useEffect(() => {
      i === o8 && r(n[0]), n.length > 0 && !n.includes(i) && r(n[0]);
    }, [r, n, i]);
    const o = (l) => {
      const s = l.target.selectedIndex;
      r(n[s]);
    }, a = S_(n);
    return a.length === 0 ? /* @__PURE__ */ y(
      "select",
      {
        title: `${t} selector`,
        "aria-labelledby": Or(e),
        "aria-label": t,
        className: "OptionsDropdown SUE-Input",
        placeholder: "No available options"
      }
    ) : /* @__PURE__ */ y(
      "select",
      {
        title: `${t} selector`,
        "aria-labelledby": Or(e),
        className: "OptionsDropdown SUE-Input",
        onChange: o,
        value: i,
        children: a.map((l) => /* @__PURE__ */ y("option", { value: l, children: l }, l))
      }
    );
  }
  const l8 = "_radioContainer_1regb_1", s8 = "_option_1regb_15", u8 = "_radioInput_1regb_22", c8 = "_radioLabel_1regb_26", f8 = "_icon_1regb_41", za = {
    radioContainer: l8,
    option: s8,
    radioInput: u8,
    radioLabel: c8,
    icon: f8
  }, p8 = "__DEFAULT-RADIO-CHOICE__";
  function d8({
    id: e,
    label: t,
    choices: n,
    value: r,
    onChange: i,
    optionsPerColumn: o
  }) {
    const a = Object.keys(n);
    J.useEffect(() => {
      r === p8 && i(a[0]);
    }, [a, r, i]);
    const l = J.useMemo(
      () => ({
        gridTemplateColumns: o ? `repeat(${o}, 1fr)` : void 0
      }),
      [o]
    );
    return /* @__PURE__ */ y(
      "fieldset",
      {
        className: za.radioContainer,
        "aria-labelledby": Or(e),
        "aria-label": t,
        style: l,
        children: a.map((s) => {
          var p;
          const { icon: u, label: c = s } = (p = n[s]) != null ? p : {}, f = e + s;
          return /* @__PURE__ */ L("div", { className: za.option, children: [
            /* @__PURE__ */ y(
              "input",
              {
                className: za.radioInput,
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
                className: za.radioLabel,
                htmlFor: f,
                "data-name": c,
                children: typeof u == "string" ? /* @__PURE__ */ y("img", { src: u, alt: c, className: za.icon }) : u
              }
            )
          ] }, s);
        })
      }
    );
  }
  function h8({
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
        "aria-labelledby": Or(e),
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
  function m8(e) {
    return QL(e).with({ inputType: "string" }, (t) => /* @__PURE__ */ y(h8, M({}, t))).with({ inputType: "number" }, (t) => /* @__PURE__ */ y(KR, M({}, t))).with({ inputType: "cssMeasure" }, (t) => /* @__PURE__ */ y(tF, M({}, t))).with({ inputType: "boolean" }, (t) => /* @__PURE__ */ y(ZL, M({}, t))).with({ inputType: "list" }, (t) => /* @__PURE__ */ y(n8, M({}, t))).with({ inputType: "dropdown" }, (t) => /* @__PURE__ */ y(a8, M({}, t))).with({ inputType: "radio" }, (t) => /* @__PURE__ */ y(d8, M({}, t))).otherwise(({ inputType: t }) => /* @__PURE__ */ L("div", { children: [
      "I don't know how to render the input of type ",
      t,
      " yet! Sorry."
    ] }));
  }
  function g8(e, t) {
    if (e === void 0)
      return !0;
    if (t === "number")
      return typeof e == "number";
    if (t === "string")
      return typeof e == "string";
    if (t === "cssMeasure")
      return f3(e);
    if (t === "boolean")
      return typeof e == "boolean";
    if (t === "list")
      return t8(e);
    if (t === "dropdown" || t === "radio")
      return typeof e == "string";
    throw new Error("Unimplemented argument type check", t);
  }
  function WA(n) {
    var r = n, { onUpdate: e } = r, t = it(r, ["onUpdate"]);
    var p;
    const i = t.value === void 0, o = t.optional, a = Or(t.name), l = (p = t.label) != null ? p : t.name, s = () => e({
      type: "UPDATE",
      value: t.defaultValue
    }), u = (d) => e({ type: "UPDATE", value: d }), c = () => e({ type: "REMOVE" });
    let f;
    return t.value === void 0 ? t.optional ? f = /* @__PURE__ */ y(w8, { labelledBy: a }) : f = /* @__PURE__ */ y(
      y8,
      {
        name: t.name,
        onReset: s
      }
    ) : g8(t.value, t.inputType) ? f = /* @__PURE__ */ y(
      m8,
      M({
        label: l,
        id: t.name,
        onChange: u
      }, t)
    ) : f = /* @__PURE__ */ y(v8, { name: t.name, onReset: s }), /* @__PURE__ */ L("div", { className: "SUE-SettingsInput", children: [
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
  function v8({
    name: e,
    onReset: t
  }) {
    return /* @__PURE__ */ L("div", { className: "mismatched-argument-types", children: [
      "Argument for ",
      e,
      " of unsupported type.",
      /* @__PURE__ */ y(
        dt,
        {
          style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
          onClick: t,
          children: "Reset"
        }
      )
    ] });
  }
  function y8({
    name: e,
    onReset: t
  }) {
    return /* @__PURE__ */ L("div", { className: "missing-required-argument-message", children: [
      'Required argument "',
      e,
      '" not provided.',
      /* @__PURE__ */ y(
        dt,
        {
          style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
          onClick: t,
          children: "Reset"
        }
      )
    ] });
  }
  function w8({ labelledBy: e }) {
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
  function b8({
    onCancel: e,
    onDone: t,
    existingAreaNames: n
  }) {
    const r = `area${n.length}`, [i, o] = k.useState(r), [a, l] = k.useState(null), s = k.useCallback(
      (c) => {
        c && c.preventDefault();
        const f = S8({
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
    ), u = k.useCallback((c) => {
      c.type !== "REMOVE" && (l(null), o(c.value));
    }, []);
    return /* @__PURE__ */ L(
      TA,
      {
        title: "Name new grid area",
        label: "New grid area naming modal",
        onConfirm: () => t(i),
        onCancel: e,
        children: [
          /* @__PURE__ */ y("form", { className: mr.portalForm, onSubmit: s, children: /* @__PURE__ */ L("div", { className: mr.portalFormInputs, children: [
            /* @__PURE__ */ y("span", { className: mr.infoText, children: "Name for grid area needs to be unique, start with a letter, and contain only letters and numbers." }),
            /* @__PURE__ */ y(
              WA,
              {
                label: "Name of new grid area",
                name: "New-Item-Name",
                inputType: "string",
                onUpdate: u,
                value: i,
                defaultValue: r
              }
            ),
            a ? /* @__PURE__ */ y("div", { className: mr.validationMsg, children: a }) : null
          ] }) }),
          /* @__PURE__ */ L("div", { className: mr.portalFormFooter, children: [
            /* @__PURE__ */ y(dt, { variant: "delete", onClick: e, children: "Cancel" }),
            /* @__PURE__ */ y(dt, { onClick: () => s(), children: "Done" })
          ] })
        ]
      }
    );
  }
  function S8({
    name: e,
    existingAreaNames: t
  }) {
    return e === "" ? "A name is needed for the grid area" : t.includes(e) ? `You already have an item with the name "${e}", all names
  need to be unique.` : e.match(/^[^a-zA-Z]/g) ? "Valid item names need to start with a character." : e.match(/\s/g) ? "Spaces not allowed in grid area names" : e.match(/[^\w]/g) ? "Only letters and numbers allowed in area names" : null;
  }
  function E8(e) {
    const t = qi();
    return k.useCallback(
      (r) => {
        t(
          bC({
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
  function A8({
    layout: e,
    row_sizes: t,
    col_sizes: n,
    gap_size: r
  }) {
    return e = sl(e), t = sl(t), n = sl(n), {
      layout: e,
      row_sizes: t,
      col_sizes: n,
      gap_size: r
    };
  }
  const C8 = "_container_1hvsg_1", x8 = {
    container: C8
  }, jA = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    const i = A8(e), o = If(), w = L4(i), { uniqueAreas: a } = w, l = it(w, ["uniqueAreas"]), { areas: s } = l, u = E8(n), c = k.useMemo(
      () => ng(s),
      [s]
    ), [f, p] = k.useState(null), d = (E) => {
      const { node: O, currentPath: b, pos: A } = E, T = b !== void 0, P = lh(O);
      if (T && P && "area" in O.uiArguments && O.uiArguments.area) {
        const _ = O.uiArguments.area;
        h({ type: "MOVE_ITEM", name: _, pos: A });
        return;
      }
      p(E);
    }, h = (E) => {
      u(rg(i, E));
    }, m = k.useCallback(
      (E) => {
        u(
          vE(E)
        );
      },
      [u]
    ), S = a.map((E) => /* @__PURE__ */ y(
      a3,
      {
        area: E,
        areas: s,
        gridLocation: c.get(E),
        onNewPos: (O) => h({ type: "MOVE_ITEM", name: E, pos: O })
      },
      E
    )), g = {
      "--gap": i.gap_size,
      "--row-gutter": "150px",
      "--col-gutter": "100px",
      "--pad": "8px"
    }, v = (E, { node: O, currentPath: b, pos: A }) => {
      var T;
      if (lh(O)) {
        const P = Q(M({}, O.uiArguments), {
          area: E
        });
        O.uiArguments = P;
      } else
        O = {
          uiName: "gridlayout::grid_card",
          uiArguments: { area: E },
          uiChildren: [O]
        };
      o({
        // Place in the last position
        path: nr(n, (T = t == null ? void 0 : t.length) != null ? T : 0),
        node: O,
        currentPath: b
      }), h({
        type: "ADD_ITEM",
        name: E,
        pos: A
      }), p(null);
    };
    return /* @__PURE__ */ L(cE.Provider, { value: h, children: [
      /* @__PURE__ */ y(
        "div",
        Q(M({
          style: g,
          className: x8.container
        }, r), {
          draggable: !1,
          onDragStart: () => {
          },
          children: /* @__PURE__ */ L(
            LL,
            Q(M({}, l), {
              onNewLayout: m,
              children: [
                G4(s).map(({ row: E, col: O }) => /* @__PURE__ */ y(
                  ML,
                  {
                    gridRow: E,
                    gridColumn: O,
                    onDroppedNode: d
                  },
                  Z4({ row: E, col: O })
                )),
                t == null ? void 0 : t.map((E, O) => /* @__PURE__ */ y(
                  Zi,
                  {
                    path: [...n, O],
                    node: E
                  },
                  n.join(".") + O
                )),
                S
              ]
            })
          )
        })
      ),
      f ? /* @__PURE__ */ y(
        b8,
        {
          info: f,
          onCancel: () => p(null),
          onDone: (E) => v(E, f),
          existingAreaNames: a
        }
      ) : null
    ] });
  }, k8 = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    jA,
    {
      uiArguments: e,
      uiChildren: t,
      path: n,
      wrapperProps: r
    }
  ), O8 = {
    title: "Grid Container",
    UiComponent: k8,
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
    iconSrc: pE,
    category: "Tabs",
    stateUpdateSubscribers: {
      UPDATE_NODE: wE,
      DELETE_NODE: bE
    },
    description: "A general container for arranging items using `gridlayout`"
  }, T8 = (e) => /* @__PURE__ */ y(jA, M({}, e)), I8 = {
    title: "Grid Page",
    UiComponent: T8,
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
      UPDATE_NODE: wE,
      DELETE_NODE: bE
    },
    category: "gridlayout"
  }, P8 = 11, _8 = D8(
    tc(P8).map((e) => Math.random())
  ).map((e) => `${Math.round(e * 100)}%`);
  function N8({
    title: e = /* @__PURE__ */ y("span", { children: "My Plot" })
  }) {
    return /* @__PURE__ */ y("div", { className: "PlotPlaceholder", children: /* @__PURE__ */ L("div", { className: "plot", children: [
      /* @__PURE__ */ y("div", { className: "title", children: e }),
      /* @__PURE__ */ y("div", { className: "plot-body", children: _8.map((t, n) => /* @__PURE__ */ y(
        "div",
        {
          className: "bar",
          style: { "--value": t }
        },
        `${n}-${t}`
      )) })
    ] }) });
  }
  function D8(e) {
    let i = -1 / 0, o = 1 / 0;
    for (let s of e)
      i = Math.max(i, s), o = Math.min(o, s);
    const a = i - o;
    return e.map((s) => ((s - o) / a + 0.1) * 0.85);
  }
  const R8 = ({
    uiArguments: { outputId: e, width: t = "100%", height: n = "400px" },
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    "div",
    Q(M({
      className: "plotlyPlotlyOutput",
      style: { height: n, width: t }
    }, r), {
      children: /* @__PURE__ */ y(
        N8,
        {
          title: /* @__PURE__ */ L("span", { className: "title-bar", children: [
            /* @__PURE__ */ y(af, { type: "output", name: e }),
            /* @__PURE__ */ y("span", { className: "plotly-name", children: "Plotly" })
          ] })
        }
      )
    })
  ), L8 = {
    title: "Plotly Plot",
    UiComponent: R8,
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
    iconSrc: tg,
    category: "Plotting",
    description: "Output for interactive `plotly` plots."
  }, F8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADKUlEQVR4nO3cMY5VVQDG8Q8QaFyACiWFvVqwiyERjHuQAoohbsAEKLTARRiCYtgGxsR6So0LgAYIeRR3bmKGZ0Hi5zl3+P2S17xM8eXkP/e9meKc2e12gf/a2dEDOJ2ERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUfDB6wD8d/nS07+0LSQ6OX1eTfHL83vvmeZI/k/ye5JckvyZ5efKH7n115X+etd9UYe1xLcm9JHOc1lgfJvn0+PV1kqMkd5L8PHLUv5n1o/BckrtZDk1U+11J8ijLOZ0bvOUtsz6xvktyOHrERqzndGfoihNmfGJ9GVG9q8Ms5zaN2cK6kOT70SM26odM9EfNbGFdT3J59IiNupTkxugRq9nCOhg9YOMORg9YzRbWF6MHbNznowesZgvro9EDNu7j0QNWs4V1cfSAjfPlndNNWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4rZwno2esDGvXX7zCizhfX36AEbN835zRbWH6MHbNzT0QNWs4X1ePSAjXs8esBqtrAeZrm1jnf3V5bzm8JsYb1Mcnv0iI26leTF6BGr2cJKlt+6+6NHbMz9TPS0SuYMK0m+TfJg9IiN+DHLeU1l1rBeJ7mZ5Za6vVcpk6Ms94l9k+W8pjLrHaSrR0meZDnAa0k+y3LB2PmRowZ5leUL+m9ZruN+mIn+IXrSmd1uN3oDp9CsH4VsnLCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4o3LCE7MROKhbQAAAAASUVORK5CYII=";
  function YA(e, t) {
    return {
      label: e,
      inputType: "string",
      defaultValue: t
    };
  }
  function no(e) {
    return YA("Input ID", e);
  }
  function ro(e) {
    return YA("Label text", e);
  }
  const M8 = "_container_tyghz_1", B8 = {
    container: M8
  }, U8 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const { label: n = "My Action Button", width: r } = e;
    return /* @__PURE__ */ y("div", Q(M({ className: B8.container }, t), { children: /* @__PURE__ */ y(dt, { style: r ? { width: r } : void 0, children: n }) }));
  }, z8 = {
    title: "Action Button",
    UiComponent: U8,
    settingsInfo: {
      inputId: no("myButton"),
      label: ro("My Button"),
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
    iconSrc: F8,
    category: "Inputs",
    description: "Creates an action button whose value is initially zero, and increments by one each time it is pressed."
  }, W8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFS0lEQVR4nO3cz2vTdxzH8Vfb9VeIa7ta1FW2FqQ6pqLbEERhm0OGFzcPY0dhl+LFo4cd9gfsuIs77LDbkAljDqEiCoKszMMEcbqFsjm2OaW6ptClP2zNDvkms2n6I99vXqTp5/mAQJKmn3wPT76fJCTvpnw+L6DWmut9ANiYCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFs/V+wDq5cy5seX+1BNd4piILkt8+uGOmEs2pmDDKrNL0ilJ70h6NeFaP0m6IumspJ8TrtWw2AqlYUl3JJ1W8qgUrXE6WnO4Bus1pNDPWCclff7sHZ1tzepsa4m12PTcgqbnnhZvNkVrz0r6Mv4hNqaQw+pTYbuSJA1s7tB7r/Wpv6c90aJ/Tczq2x/Hde/RTPGus5IuShpPtHCDCXkrPCWpU5K297Rr+O3+xFFJUn+01vYXSmt1RM8VlJDDOly8cmxvr1qam2q2cEtzk47t6a34XKEIeSs8VLwy0NeZaKHRTFaX7xQ+ZRh+60Vt6W4vX/NQxX/cwEIOK1W80toS/2x18ea4rmUmlW5vKUVVYc1UxX/ewELeChMbzWR1LTMpSTp5aGspKhBWbJO5J/rm5iNJ0on9m/Vywu10oyGsmL76/oEk6cBAWgeHuut7MOsQYcUwmsnq18ezSre36Ojid3+IEFaVJnNPSu8Aj+/rVVeqtc5HtD4RVpWu/5LV1OyCdm9Lad/A8/U+nHWLsKrwMDtbehf47l62wJUQVhUu3XosSXpzqIuPFlZBWBWMZrI6c25M5394ULrv9/Fp3f47J0k6vLO7TkfWOAirzMyTp6XPp27cmyrFdfvPKUmFsxUv2FdHWGU6Wpv10eGtpds37k0t+oT9jUFesK8FYVWwqz+tE/s3l24Xz2C7t6V4bbVGhLWMg0PdOjCQXnTf3pfSyzwa5UIO65/ildzcQsUHHN3Tq3R74WvKWza1VvW51TNfUZaW+eXORhby12auSzouSXfv5/T6wKYlD+hKteqT9wdjLX7n/r/lzxWUkM9Y3xWvjNx6rGxuvmYLZ3PzGok+84pcqNniDSLkM9YXkj6WNDg5Pa/PLv+hI6/0aMeWlNpifvFvbiGvsYc5Xb07oamZ0vb6W/RcQQk5LKnwI4cRSZqaWdCF6N2f4TmCE/JWKEmXVPj1c8awdiZa+5Jh7XUv9DOWJF2VtFPSB5KOqPCLmrjfUc+p8EL9iqTzNTm6BkVY//s6uqAGQt8KYUJYsCAsWBAWLHjxvpRlol9oCKuAiX41xlbIRD+L0M9YTPQzCTksJvoZhbwVMtHPKOSwmOhnFPJWyEQ/o5DDYqKfUchbYWJM9FseYcXERL+VEVZMTPRbGWHFwES/1RFWlZjotzaEVSUm+q0NYVWBiX5rR1hVYKLf2hFWBUz0S46wyjDRrzYIqwwT/WqDsCpgol9yhLUMJvolE3JYTPQzCvlrM0z0Mwr5jMVEP6OQz1hM9DMKOSyJiX42IW+FEhP9bEI/Y0lM9LNoyufz9T4GbEChb4UwISxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLP4DpWmTqmVmpDwAAAAASUVORK5CYII=", j8 = "_container_162lp_1", Y8 = "_checkbox_162lp_14", Yp = {
    container: j8,
    checkbox: Y8
  }, V8 = ({ uiArguments: e, wrapperProps: t }) => {
    const n = e.choices;
    return /* @__PURE__ */ L(
      "div",
      Q(M({
        className: Yp.container,
        style: { width: e.width }
      }, t), {
        children: [
          /* @__PURE__ */ y("label", { children: e.label }),
          /* @__PURE__ */ y("div", { children: Object.keys(n).map((r, i) => /* @__PURE__ */ y("div", { className: Yp.radio, children: /* @__PURE__ */ L("label", { className: Yp.checkbox, children: [
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
  }, G8 = {
    title: "Checkbox Group",
    UiComponent: V8,
    settingsInfo: {
      inputId: no("myCheckboxGroup"),
      label: ro("Checkbox Group"),
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
    iconSrc: W8,
    category: "Inputs",
    description: "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values."
  }, H8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAG+ElEQVR4nO3c228UZRyH8aeFCqULtW6lxW5FTWMqlNbKKZwC0RusxqRqrBrhRmNCNHphQuK/0CtjNEQDN5CYcFUSVGK8gUAgIlKtFRXRSFoKLW26pSeWbbte7HaZPfRk99fDu99P0oSZvrszLU9mZqe7b04kEkEk03LnewfETQpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0wsne8dsHTw+LXpDKsGdgK7gG3AI0DeDDc1CLQBPwNngXNAy1QPamyomOFmFg+nw5rC28C7wJYMPFcBUBn7ej227iLwJXAkA8+/6GRjWMXAIeBV4+1siX09DxwAbhtvb0HJmmus2GlnH9CMfVRerwCXgX2NDRVOn/68suaIdfD4tX3A0eT1S3JzqCorYH2ggLX+5azKX8qS3JwZPfe9kTGCQyN0BEO0tg/y241BRsci3iEB4OjB49dobKg4NqsfZJHIiUQiU49apDwX7yXAJaL/wXFVgQJeqCnG75vptfrkegbCfPNLD63tA8nfagc2AZ3g9sV7tpwKD+GJKjcH6mr87N+xJuNRAfh9eezfUUpdjZ+kg18gti/Oy4aw3gPqvSv2VvvZU1lkvuE9lUXsrfYnr64H3jff+DzLhrD2exc2lPvmJKpxeyqL2FDuS169b852YJ64HtZGPPepluTm8NLTxXO+Ey/VFie/INhC9FrLWa6/KtzpXagu91G4IrM/ct9QmCvtg5y/1kdnf5j62mK2PflgwpjC/KXUlPu4fL0/ed8uZXRnFhDXj1i7vAtVZQUZffK+oTCHT3fQ1Nw9YVTj1gdStr0r3ThXuB7WZu9C4KHlGXviu+ExDp/uoLM/DMDe9UUTRgUQKErZttOnQtfDKvUurMxfkrEn/vpyVzyqLY/5eLYq5dVfglWp216TsZ1ZgFwP6wHvwtIZ3lGfyIWrQS7+G735WbIyjxefWT3lY9Lczc/8DbQFxPWwMq4zGKKpuTu+/Nb2Upbn6deYTL+RGWq61BX/d31tMSUPLpvHvVm4FNYMXLga5J+eEABP+JdNerGe7RTWNPUNhfn+Sm98+Y3tpZOMFoU1Tef+DDIQGgWip8DCFU5fe8+awpqG67eHOXO1D4i+CtQpcGoKaxrO/H7/FPjcurn7A/Zi5vrfCqelMxii6VIX//SEeHPrap5+bFX8e9dvD9N6cwiAqjUrEr4nE1NYwBenO+LXT1/90MXwvbH46c57tNr9lI5W06VTIbBuTX7CclNzN53BUMrRau3D+ekeLmnoiAW8urWU7v62+D0qgO9aehLGVD+a8mY9mYTrR6yETzOERsYmHPjG9lJ8y+7/obj15lD8aFWyMm/W11ZJn9oBCM/qCRc418O66V24Mzw64cDCFXm8tvnhtN/bXlE46x1Js+2b6ca5wvWwEuZPuBUMTTQOgMoyH7ufTI2o9vHZvxJs772bvMrZd4+C+2Gd9S603hic8gHPVfkpWXn/rnp9bXFG3r3wW3vKts+mG+cK1y/ez3kXWtoGqKv2T/q+9+V5uXxUtzajO9E3PEJLW8qHV8+lG+sK149YPxGd9QWIXkCf/Ll7kuE2TjZ3M5J48f4jOhUuegnzNbS0DXDmj96JxmbcmT960x2tUuaQcE02hPU5cMK74lRLD+f/6jPf8Pm/+jiVdD8sti+fmW98nrl+jTXuANFP7JQBjEXgxOXb/N01TF2N32RSkG9bevg19Uh1I7YvzsuWsG4BH5N0Cvq1fYArHYNUl/uoChQQKFr2v6YxGh2LcGd4hPbe6DRGLW0D6W6IAnzc2FBxa5pTWC5q2RIWjQ0Vx2L/oZ8AD42vHx2L0Hy9n+bETylnWi/wYbbMjQXZMz+WVxnwKfDyHO1GE/AB0bmxEmh+LLfcIDp94zt4bkUYuBjbxsukicp1WXMqTONI7GsT96fj3sj/m447DHQQvW82Ph230/eppuL0qVDmTzaeCmUOKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMfEfzGeLdlIh8u4AAAAASUVORK5CYII=", $8 = "_container_1x0tz_1", J8 = "_label_1x0tz_10", E0 = {
    container: $8,
    label: J8
  }, Q8 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    var a;
    const n = (a = e.width) != null ? a : "auto", r = M({}, e), [i, o] = J.useState(r.value);
    return J.useEffect(() => {
      o(r.value);
    }, [r.value]), /* @__PURE__ */ y(
      "div",
      Q(M({
        className: E0.container + " shiny::checkbox",
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
          /* @__PURE__ */ y("span", { className: E0.label, children: r.label })
        ] })
      })
    );
  }, K8 = {
    title: "Checkbox Input",
    UiComponent: Q8,
    settingsInfo: {
      inputId: no("myCheckboxInput"),
      label: ro("Checkbox Input"),
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
    iconSrc: H8,
    category: "Inputs",
    description: "Create a checkbox that can be used to specify logical values."
  }, X8 = ["shiny::tabPanel"];
  function Og(e) {
    return X8.includes(e.uiName);
  }
  function Tg(e) {
    return Og(e) ? e.uiArguments.title : null;
  }
  function VA({ uiChildren: e }) {
    let t = [];
    return e == null || e.forEach((n) => {
      const r = Tg(n);
      r && t.push(r);
    }), t;
  }
  function GA({ uiChildren: e }) {
    var n;
    const t = e == null ? void 0 : e[0];
    return t && (n = Tg(t)) != null ? n : "First Tab";
  }
  const q8 = "_container_10z2l_1", Z8 = {
    container: q8
  };
  function HA(r) {
    var i = r, { title: e, children: t } = i, n = it(i, ["title", "children"]);
    return /* @__PURE__ */ y(
      "div",
      Q(M({
        className: Z8.container,
        "data-tab-id": e,
        "aria-label": `tab panel ${e}`
      }, n), {
        children: t
      })
    );
  }
  function eM(e) {
    return typeof e == "function";
  }
  function tM(e, t) {
    return eM(e) ? e(t) : e;
  }
  function $A(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r];
      n[r] = tM(i, t);
    }
    return n;
  }
  function nM(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r];
      n[r] = $A(i, t);
    }
    return n;
  }
  function JA(e, t) {
    let n = {};
    for (let r in e) {
      const i = e[r], o = "optional" in i, a = "useDefaultIfOptional" in i && i.useDefaultIfOptional;
      o && !a || "defaultValue" in i && (n[r] = $A(
        e[r],
        t
      ).defaultValue);
    }
    return n;
  }
  const rM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADSklEQVR4nO3cv0vUYQDH8c/pmWfpmV1G0uAPjAqiyYqWoK1oDKq5PdqE9qaG/ozAKWjpL4jWoKayrcWtIgqiuAYd9LQo8u3zfO39ghvux/C54y3PV9Br9fv9SLttqPQA7U+GJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlRLv0gF9ZXlkdfGg6yf0k15PMJhnd6007+JrkXZInSR4l+bD5yYe3FgtMqkO1YQ1YSvIsydHSQwaMJTm7cbuT5FqSV0UXVaIJR2EvydPUF9WgE1nfOVl6SA2aENa9JDOlR/yhuSR3S4+oQROOwhs7PTjb6+TS4mTmp8cy0RlOe7iFD/n+o5+PX7/n7dqXPH/zMWufvu30sttJHuBjKteEsLZdAV85M5Vr53p7PqQ93EpvfCS98ckszXfz+MVaXr//PPiy//eKfZMmHIUHNt+ZO9rJ1QJRDWoPtXLzwrF0x7b9bNbw22pxTQhri/ML3fCH3p/pjAzl4kK39IwqNS6s2V6n9IQtTh4/WHpClRoX1pHxkdITtpieqGtPLRoXVnuoloNw3ehI4z7CPeGn8o9qC70WhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCVHFP6zu8M0y+0Lp91Xy226qCCtJv/SAXVbL+yn2B/kehUIYlhCGJUQt11i/uxaYunzqcPf0zKGFjfuf9mLQ39i4SP6xvLL6svCUarT6/VquM7WfeBQKYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQvwEAzs9K42yqRkAAAAASUVORK5CYII=";
  function iM(e, {
    dropFilters: t = { rejectedNodes: [] },
    positionInChildren: n,
    parentPath: r,
    onDrop: i,
    processDropped: o = (a) => a
  }) {
    const a = If(), l = k.useCallback(
      ({ node: u, currentPath: c }) => oM(t, u) && uE({
        fromPath: c,
        toPath: [...r, n]
      }),
      [t, r, n]
    ), s = k.useCallback(
      (u) => {
        if (i === "add-node") {
          const { node: c, currentPath: f } = u;
          a({
            node: o(c),
            currentPath: f,
            path: nr(r, n)
          });
        } else
          i(u);
      },
      [i, r, a, n, o]
    );
    uf({
      watcherRef: e,
      getCanAcceptDrop: l,
      onDrop: s
    });
  }
  function oM(e, t) {
    if (t === void 0)
      return !1;
    if ("getCanAcceptDrop" in e)
      return e.getCanAcceptDrop(t);
    if ("acceptedNodes" in e)
      return e.acceptedNodes.includes(t.uiName);
    if ("rejectedNodes" in e)
      return !e.rejectedNodes.includes(t.uiName);
    throw new Error(
      "Unexpected drop filter setup. Check accepted and rejected node types."
    );
  }
  function QA(r) {
    var i = r, { children: e, dropArgs: t } = i, n = it(i, ["children", "dropArgs"]);
    const o = k.useRef(null);
    return iM(o, t), /* @__PURE__ */ y("div", Q(M({ ref: o }, n), { children: e }));
  }
  function aM({
    uiChildren: e,
    parentPath: t
  }) {
    return /* @__PURE__ */ y(et, { children: e.map((n, r) => {
      const i = nr(t, r);
      return /* @__PURE__ */ y(
        Zi,
        {
          path: i,
          node: n
        },
        lf(i)
      );
    }) });
  }
  const lM = "_container_fe3r8_1", sM = "_emptyTabPanelDropDetector_fe3r8_8", A0 = {
    container: lM,
    emptyTabPanelDropDetector: sM
  }, KA = [
    "shiny::navbarPage",
    "shiny::tabPanel",
    "gridlayout::grid_card",
    "gridlayout::grid_card_plot",
    "gridlayout::grid_card_text"
  ], uM = {
    rejectedNodes: KA
  }, cM = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    const i = t && t.length > 0;
    return /* @__PURE__ */ y("div", Q(M({ className: A0.container }, r), { children: i ? /* @__PURE__ */ y(aM, { uiChildren: t, parentPath: n }) : /* @__PURE__ */ y(
      QA,
      {
        className: A0.emptyTabPanelDropDetector,
        dropArgs: {
          dropFilters: uM,
          positionInChildren: 0,
          parentPath: n,
          onDrop: "add-node"
        }
      }
    ) }));
  }, XA = {
    title: "Tab Panel",
    UiComponent: cM,
    settingsInfo: {
      title: {
        label: "Title of panel",
        inputType: "string",
        defaultValue: "My Shiny App"
      }
    },
    acceptsChildren: !0,
    iconSrc: rM,
    category: "Tabs",
    description: "Panel containing content for tab-based interfaces like navbar pages"
  };
  function qA(e) {
    return Og(e) ? e : Q(M({}, ZA), {
      uiChildren: [e]
    });
  }
  const ZA = {
    uiName: "shiny::tabPanel",
    uiArguments: JA(XA.settingsInfo),
    uiChildren: []
  };
  function ms(e) {
    return typeof e == "object" && e !== null;
  }
  function Ig(e) {
    return ms(e) && "uiName" in e && typeof e.uiName == "string" && e.uiName in tn;
  }
  function fM(e, t) {
    return !e || !t ? !1 : ua(e, t);
  }
  const pM = "_container_qbb7e_1", dM = "_header_qbb7e_13", hM = "_tabContents_qbb7e_21", mM = "_pageTitle_qbb7e_26", gM = "_tabHolder_qbb7e_39", vM = "_tab_qbb7e_21", yM = "_newTabDropDetector_qbb7e_99", wM = "_addTabButton_qbb7e_104", bM = "_tabDropDetector_qbb7e_112", dr = {
    container: pM,
    header: dM,
    tabContents: hM,
    pageTitle: mM,
    tabHolder: gM,
    tab: vM,
    newTabDropDetector: yM,
    addTabButton: wM,
    tabDropDetector: bM
  }, SM = {
    uiName: "unknownUiFunction",
    uiArguments: {
      text: "Dummy ui node for app previews"
    }
  };
  function EM(e) {
    const t = la((r) => r.app_info);
    return k.useMemo(() => Ig(t) ? gi(t, e) : SM, [e, t]);
  }
  const AM = ({ name: e, isActive: t, index: n, parentPath: r }) => {
    const i = nr(r, n), [o] = qm(), a = EM(i), l = lE(a, i), s = fM(i, o);
    return /* @__PURE__ */ y(
      "div",
      Q(M({
        className: dr.tab,
        "data-active-tab": t,
        "data-selected-tab": s
      }, l), {
        style: { order: n },
        "aria-label": t ? `Active tab ${e}` : `Select ${e} tab`,
        children: e
      })
    );
  }, CM = {
    rejectedNodes: KA.filter(
      (e) => e !== "shiny::tabPanel"
    )
  };
  function C0({
    index: e,
    parentPath: t,
    children: n,
    baseWidth: r
  }) {
    return /* @__PURE__ */ y(
      QA,
      {
        className: dr.tabDropDetector,
        "aria-label": "tab drop detector",
        dropArgs: {
          parentPath: t,
          onDrop: "add-node",
          positionInChildren: e,
          processDropped: qA,
          dropFilters: CM
        },
        style: {
          "--baseWidth": r,
          order: e - 1
        },
        children: n
      }
    );
  }
  function xM(e, t = 0) {
    const [n, r] = k.useState(t);
    return k.useEffect(() => {
      e <= n && r(e - 1);
    }, [n, e]), { activeTab: n, setActiveTab: (o) => {
      r(o);
    } };
  }
  function eC(o) {
    var a = o, {
      path: e,
      title: t,
      children: n,
      className: r = ""
    } = a, i = it(a, [
      "path",
      "title",
      "children",
      "className"
    ]);
    const l = kM(n), s = l.length, u = L_(), { activeTab: c, setActiveTab: f } = xM(l.length), p = If(), d = (h) => {
      p({
        node: h ? qA(h) : ZA,
        path: nr(e, s)
      });
    };
    return k.useEffect(() => {
      const h = nr(e, c);
      if (!u)
        return;
      Fi(u) >= Fi(h) && f(u[Fi(h) - 1]);
    }, [c, e, u, f]), /* @__PURE__ */ L("div", Q(M({ className: Wt(r, dr.container) }, i), { children: [
      /* @__PURE__ */ L("div", { className: dr.header, children: [
        /* @__PURE__ */ y("h1", { className: dr.pageTitle, children: t }),
        /* @__PURE__ */ L("div", { className: dr.tabHolder, "aria-label": "tabs container", children: [
          l.map((h, m) => /* @__PURE__ */ y(
            AM,
            {
              name: h,
              parentPath: e,
              isActive: m === c,
              index: m
            },
            h + m
          )),
          tc(s).map((h) => /* @__PURE__ */ y(
            C0,
            {
              parentPath: e,
              index: h,
              baseWidth: "10px"
            },
            h
          )),
          /* @__PURE__ */ y(
            C0,
            {
              parentPath: e,
              index: s,
              baseWidth: "25px",
              children: /* @__PURE__ */ y(
                IM,
                {
                  className: dr.addTabButton,
                  label: "Add new tab",
                  onClick: (h) => {
                    h.stopPropagation(), d();
                  }
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ y("div", { className: dr.tabContents, children: OM(n, c) })
    ] }));
  }
  function kM(e) {
    let t = [];
    return k.Children.forEach(e, (n) => {
      if (!k.isValidElement(n))
        return null;
      const r = n.props.title;
      typeof r == "string" && t.push(r);
    }), t;
  }
  function OM(e, t) {
    return k.Children.map(e, (n, r) => k.isValidElement(n) && typeof n.props.title == "string" ? /* @__PURE__ */ y("div", { className: dr.tabContents, "data-active-tab": r === t, children: n }) : n);
  }
  const TM = {
    display: "block"
  };
  function IM({
    label: e,
    onClick: t,
    className: n
  }) {
    return /* @__PURE__ */ y(
      vA,
      {
        className: n,
        placement: "bottom",
        "aria-label": e,
        popoverContent: e,
        onClick: t,
        openDelayMs: 0,
        children: /* @__PURE__ */ y(og, { style: TM })
      }
    );
  }
  const PM = "_noTabsMessage_130qz_1", tC = {
    noTabsMessage: PM
  }, _M = ({
    uiArguments: { title: e },
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    var a;
    const o = ((a = t == null ? void 0 : t.length) != null ? a : 0) > 0;
    return /* @__PURE__ */ y(
      eC,
      Q(M({
        path: n,
        title: e,
        className: tC.container
      }, r), {
        children: t ? t.map((l, s) => {
          const u = nr(n, s), c = Og(l) ? l.uiArguments.title : "unknown tab";
          return /* @__PURE__ */ y(HA, { title: c, children: /* @__PURE__ */ y(Zi, { path: u, node: l }) }, lf(u));
        }) : /* @__PURE__ */ y(NM, { hasChildren: o })
      })
    );
  };
  function NM({ hasChildren: e }) {
    return e ? null : /* @__PURE__ */ y("div", { className: tC.noTabsMessage, children: /* @__PURE__ */ y("span", { children: "Empty page. Drag elements or Tab Panel on to add content" }) });
  }
  const DM = {
    title: "Navbar Page",
    UiComponent: _M,
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
        defaultValue: (e) => e ? GA(e) : "First Tab",
        choices: (e) => e ? VA(e) : ["First Tab"]
      }
    },
    acceptsChildren: !0,
    // iconSrc: icon,
    category: "layouts",
    description: "Layout an app with tab-based navigation"
  }, RM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHvUlEQVR4nO3bXWxUaR3H8W9fpqWlMCXdbl+gCyvNRtkmLrAuFKQa3FUTEyuJ2iwhGKmJJmq80PTKeGdMmnij7h3UhOzS1Kgb8IYNWaIFW3aVLtGCbFMbWNvOlG7pDC1T5qUzXkxn6Htnuv0zZ4bfJ+GC01P65PCd5zx95kxeLBZDZKPlZ3oAkpsUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYqIw0wMAaOsaXHxoH/A6cAR4ESh70mNyuGngJnAF6AT65n+xvaU+E2NawBFhweOL0dY1eBpozexoHK8MODD352fAmfaW+u/Bsi/SjHBMWABtXYPnga8X5OfRWO/mpefKqHYXUVSoO/Z8oUgUrz/EjY+m6R30MxuNtbZ1DVa2t9Q3Z3psCXmxWCzTY0i8yk4Dre6SQr7bVENteXGGR5UdRn1Bft/twT8TAegAWp1wK3TKVLAXaC3Iz1NUaaotL+ZUUw2F+XkAp4hfy4xzSljHAQ7u3qqo1qGmvJgDu7cm/no8k2NJcEpYRwD27tyS6XFkrXnX7kgmx5HglMX7PoDt29KbrW7cecC59+5x6vPVfHr70h2J2yPTvP/fB/R7AsljX3jBzZcaKtjkWvia8gfCXPr3BO/fmU4e++qL2zjaUJHWmDZC76AfgMZ6d8rfU/v42jniVuiUsFwABfF1Qsquzf0HLCcR3WJ/G/Bz2xPgh6/VJePyB8Kc/usoY1PhBedevDnJgDfAD16tS2tcn8StkYec7xsHwF1SyJ7tm1P6vsLH167IZmTpcUpYaRnzBXnnXxMMTQRXPOfdW5PAwllnzBfkzR4vY1Nhej6cTB6/+qGPsakwDTWlfLuxmk2u/OS5QxNBbtx5wEu7tq74szaK1x/i3LUxonO/qJ+7NsaPXt1BtdsRraTFKWuslDwKR2nrGuTX7/xvwe1tsbvjM8lQ5t/KqsqL+dpn438f8D7+/ut347e/5pcrk7NYVXkxh+ZuRfenF85kFvyBCGe6RwlFosljoUiUM92j+AMR85+/0bJyxoL4WmliKrxsYDsrS1Z8W2PbZteSY7/4xvOr/qySooL1DTJF4dkYHVeWDygR3I9fq8NVkN5SIZOyKqxNrvwFwfzxPW/a/8ajcHxGqKvYtOp5t0em6Rn0U1ZcwJ4dqa1z1iMag7d6vXh8oRXP8fpDvNXr5eThGtJchmZMVoW1Ef4xFF/wv/z88mumy/0TXLwZX599qqKYE4eqcZcuneU2yvm+cW6NPFzzvMSi/tj+SrOxbKSnKqzL/fHthGN7n6EqhY3YoYkgb//zHq8bxnVsf2XWxJKOpyasxEx0bO8zNL5QvuJ5RxsqONpQwaNwlD/0eun3BOjs8T7RLYdckFW/Fa7X2e5RLt6c5PiBZ1eNar5NrnxONtVStcXF0ESQu+MztoPMMTk9Y/kDYTp7vNybjqy4O7+WyjIXY1NhZkKzBiOEt6+PJ3fa19JY786a22bOhpXYTX8YivL9L9auuKbyB8L88i93KSsuWHbbYXxuD8tqy6F5XyX+mciaC/g92zfTvC87ooIcvhV2zu2wf+dw9aoLdXepi6otLqaDs5ztHk1uRzwKRznbHX+bp2qLi52VJSbjzM+D4werVt1dr3YXcfxgVdZsNUCOzli9A77k2z1vXB5Z9pz5M9Q3P/csb1weod8ToP/PQ0vOO3Go2nS8RYX5tDbV8rt3h5dskrpLC2ltqs26p2iza7QpGpl8lNb5OytL+OlX6nhl18I12Cu7yvjJl3ektDXxSSUCmr+77irI49SRWtyl2ff6d8qjySHA9atv7U77CYdcc2vkIWf/7gHg5OGalJ9uCEWi/PxPQwDT7S31GX+wzSkvhT7gwMhkkOfWeKsl181fpKcaFcTf9plzc+NHlT6n3AqvANz4aHqt854KjfXutB7ygwXX7sqGD2gdnBJWJ8Qf3PP4Vn7GSpbn8YXmP/TYmcmxJDglrD6gIxKN0dHtYVRxpczjC9LRPUok/nRgB4s+FZ0pTgmL9pb6VuCCfybCby8Nc+GDjxm+H1zw4JvEhSJRhu8HufDBx/zm0nDiM4UX5q6hIzhl8Q5Ae0t9c1vX4OnZaKz16oCPqwO+TA8pWyQ/Yu8UTtluWHxoP3CC+EeZPgOUPukxOVwA+A/xhfqbwPX5X3TCJ6EdEZbkHsessSS3KCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMTE/wELMTAByexCJAAAAABJRU5ErkJggg==";
  function nC({
    label: e,
    children: t
  }) {
    return /* @__PURE__ */ L("div", { className: "LabeledInputCategory", children: [
      /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: e }) }),
      /* @__PURE__ */ y("section", { className: "grouped-inputs", children: t }),
      /* @__PURE__ */ y("div", { className: "divider-line" })
    ] });
  }
  const LM = "_container_yicbr_1", FM = {
    container: LM
  }, MM = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    var a;
    const n = M({}, e), r = (a = n.width) != null ? a : "200px", [i, o] = J.useState(n.value);
    return J.useEffect(() => {
      o(n.value);
    }, [n.value]), /* @__PURE__ */ L(
      "div",
      Q(M({
        className: Wt(FM.container, "shiny::numericInput"),
        style: { width: r }
      }, t), {
        children: [
          /* @__PURE__ */ y("span", { children: n.label }),
          /* @__PURE__ */ y(
            xf,
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
  }, BM = {
    title: "Numeric Input",
    UiComponent: MM,
    settingsInfo: {
      inputId: no("myNumericInput"),
      label: ro("Numeric Input"),
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
    settingsFormRender: ({ inputs: e }) => /* @__PURE__ */ L(et, { children: [
      e.inputId,
      e.label,
      /* @__PURE__ */ L(nC, { label: "Values", children: [
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
    iconSrc: RM,
    category: "Inputs",
    description: "An input control for entry of numeric values"
  }, UM = ({
    uiArguments: { outputId: e, width: t = "300px", height: n = "200px" },
    wrapperProps: r
  }) => /* @__PURE__ */ y(
    "div",
    Q(M({
      className: sh.container,
      style: { height: n, width: t }
    }, r), {
      children: /* @__PURE__ */ y(fE, { outputId: e })
    })
  ), zM = {
    title: "Plot Output",
    UiComponent: UM,
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
    iconSrc: tg,
    category: "Outputs",
    description: "Render a `renderPlot()` within an application page."
  }, WM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHz0lEQVR4nO3dT2yTBRjH8V+7UsbW/TGwMhyrQSsSEAcHTGDjwEkx6o00JCQm/jmY6ElTInIzojZ6UuJBD5oYtdGLEsbFOKMsGj1Ig7iANboNcIzKimvHtnath/d967v37boW+8C25/dJyLr+ebsuX/q2fd/3madYLIKo3ry3+weglYlhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCTCd7t/gNshGk9We9U+APvMr1sBdADIAbgIYBjAaQDfmF8XFYuEa/xJly+VYS3CA+BZAIcBhMpcvhrAFvPfQ+Z5lwAcA/AuAP4NGSgPy/kMEo0nHwPwDsoHVUkXgOMwYnw+Fgl/6bxCDc+SK4LqsOyi8eQRAK/az2tv8mHnXS24J7gG61v9aG5sQKFQRHoqj/RUHr+P30BiJINr2Zx1kxCAL6Lx5LFYJPzyrX4MSwnDAhCNJ98D8LT1fXuTD4/0rMUD3S3wehxX9noQbPUj2OrH5s4mPLx9LRKjk+hP/I30VN661pFoPNkZi4SfulWPYalR/64wGk++AltUW7ua8cL+EHaEykRVhscD7Ai14EXzNjZPmstWSXVY0XjycQBHre/7Nrfjid4NWO2r/dfi93lxcPd67L2v3X72UfM+1FEdFoC3rRM9oQAe27kOniqepRbiAfDojnXoCQXm3Uc0nlT3e9b8GutZmO/+2pt8OLAriHJNZWfm8O35NIYuZ5GaNF6kd7T6sa2rGb33tqF5dcO863sAHNgVxHBq2nrNFTLv67jgY1ly1P1PsnnJOrH/gbXwl1n9nb2YwRsnhzEwNIGx67PIF4rIF4r4Kz2Dr85dwxsnh3H2YsZ1O7/Pi0d61tnPOizxAJYyrWH1AugGgDuafc4X3QCMqD4aHMN0rrDgQqZzBXw0OFY2rp7uAO5oLq0Qus37VENrWPusEz2hFtfrquzMHD77cbyqj9CLAD77cRyZ6bl553s8xrLL3acGWsPqs06Eg2tcFw7+dr3iM5XTdK6A7y6kXec7lt3nusIKpjWs+60T69v8rgvPXcrWvMChy+7bOJZ9v+sKK5jWsEqvrJ3v6gDg6j+zNS/w6mTOdV5g/rI7al7oMqY1rLprqOZjekW0hpWyTmRn5lwXdrS6V4+LWRtwfySYmb/sqzUvdBnTGtY568SV6+7V3rau5poXuGWD+zaOZf9S80KXMa1hlfb4TI7fcF24J9yGxlXV/2oaV3mxd3O763zHsqvay3Sl0BrW19aJxEgGRccHVoHGBhx4sPwmHicPgAMPBhFonP8moFg0lm0zcNM/7TKkNaxBGPutYyKbQ2LU/cn59o0BHNrTWXFPh9U+Lw71dmL7xoDrssRoBhP/7QB40bxPNTRvhH4dxm7I6E+ksPXOJtf2wu3dAdwdXFPaCH11MocGrwcdLauwZUMz+ja7N0IDwGy+gP5Eyn7W64KPY0nyFJ3rAQXM/c+9AP6AuYfDjlAAB3d3VrX6q6QI4JPvx3Dmv9XgCIBNAAqajtLRuioEgAKA561vzoxkcOLnlOv1Vi2KAE6eSdmjAoyDK6rfPrRCaA4L5tE0pQMoTl9I48PBvzCTr72D2XwBn/5wBd+eT9vPfrXcETsaqA4LAGKR8FEA71vf/3opi7dOjeBMmXeL5RSLxrPdm6dG8PPwpP2iD8xlq6T5xXtJLBJ+JhpP/gHz2Ss9lcfH34+hP2E7/KvNX9r2l5mZw5Xrs8bhX6MZXMu4thO+FouEj9zaR7G0MCxTLBI+Fo0nz8J2wGp6Ko+BoQkMDE1Uu5gRLHDAqjbqV4V2sUj4BIx3cM/BiKRal83bbGJUBj5jOZjv4I4DOB6NJ+1DQbYBCJpXG4exvfE0gIFYJKxqc001GFYFZjCM5iZwVUgiGBaJYFgkgmGRCIZFIviusALHxw0LziDlxw1uDMshGk/WPIM0Gk+WZpDGImF9+yGVwVWhjTmD9E8YH5DWMofUmkH6p9Z5WE58xjJxBml9MSxwBqkE9atCziCVoTosziCVozoscAapGHUP2KaqGaS1smaQtjeVXr5aM0hV0RzWojNIbxZnkOoNa9EZpP8XZ5DqVHEGaT1wBqlOFWeQ1gtnkOpTcQZpvXAGqT4VZ5DWC2eQEtWZ1rAqziCtF84g1afiDNJ64QxSfSrOIK0XziDVp+IM0nrgDFKdFp1B+n9pn0GqNSzANhe0P5HC7E0MW1sIZ5DqDutdmBNl0lN5fP5TdX9GbjFFAJ//NG7fm3TEvC9VNIfFGaSCNIfFGaSCVIcFcAapFB6lA84glcCwTJxBWl+a/zLFQrww9lGPovqjoS/DPMQexpuCsjT9ZQo+Y7mVZpDC2Dlv0RmkULa5phoqn7FInvp3hSSDYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgk4l83+MTmnohKqwAAAABJRU5ErkJggg==", jM = "_container_sgn7c_1", x0 = {
    container: jM
  }, YM = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.choices, r = Object.keys(n), i = Object.values(n), [o, a] = k.useState(i[0]);
    return k.useEffect(() => {
      i.includes(o) || a(i[0]);
    }, [o, i]), /* @__PURE__ */ L(
      "div",
      Q(M({
        className: x0.container,
        style: { width: e.width }
      }, t), {
        children: [
          /* @__PURE__ */ y("label", { children: e.label }),
          /* @__PURE__ */ y("div", { children: i.map((l, s) => /* @__PURE__ */ y("div", { className: x0.radio, children: /* @__PURE__ */ L("label", { children: [
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
  }, VM = {
    title: "Radio Buttons",
    UiComponent: YM,
    settingsInfo: {
      inputId: no("myRadioButtons"),
      label: ro("Radio Buttons"),
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
    iconSrc: WM,
    category: "Inputs",
    description: "Create a set of radio buttons used to select an item from a list."
  }, GM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHmUlEQVR4nO3b329T5x3H8Xec2Akm4GRZlB+sbbZ6rVboRKACwgattKFVqtQIaVo0Wk1bM6kX6+WUP2CXuVy3CyTIpGotCprGoJo0KVtFA1rY1CZoM5mUWSu0wXYWQmxIHPwj9i5MEpskrTPyzTmGz0viwvbx0ZPD2+d5fGxX5fN5RDabx+kByKNJYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSZqnB7Akr7B8IN37QN+CBwBdgP1Wz0ml5sDrgGXgDPAaPGD/T1BJ8a0zDVhwcrB6BsMnwJ6nR2N69UDB+//+zlwur8n+FNY80W65VwVFkDfYPg88Gq1p4quYIC9T9bTGvDhq9GsXSydzRFLpLn66Rwj4QSLuXxv32C4ub8n2O302ACq8vm802MAll9lp4DewLYafnK0jfaGWodHVRki8RS/GY6SWMgCDAC9Tk+FbjoNdAK91Z4qRbVB7Q21vHG0jRpPFcAbFI6lo9wU1gmAQ0/vVFT/h7aGWg4+vXPp5gknxwLuCusIQOdTOzZth7/4wyf0DYa5l8lt2j7drOjYHXFyHOCusPYB7GrU2QpgJJxgJJzY0HPaV46d41Ohm94VegGqC+uEx9r4zXnOj04DENhWw3O7tpf1vJqVY+ezGVn53HTGEiCWSPPelSlyecjl4b0rU8QSaaeHtWFuOmOV7YPQDJfDd5hLLS7fd6CjniPPNtKyxsI/MZ/h7D9mCEWTAOxp8/O9bzat2vZeJsdfQjN8OLEyBX3efjdbIpnl9HCEdHZlTZjO5jg9HOGt73yFgL9y/rsq7oz1znCEP12bLYkK4O/X5zh5MbLmQv3kxchyVAChaJKTFyMkkpnl+xLJDL8e+qwkquL9Fm9rIbOYZ+BShEQyu+qxpeAyi+645liOynkJADemFwhFk7Ts8PL64daSs8g7w4V4xj65Q9czDSXP2+7z8OreJvZ27OReJsfZkRihaJKhf87w/YOtAJz/aJqpuxn2tPnpfqGZgN8LwB/HpvlwIlGy7WbL5eHdkRjR+PpTXiyR5t2RGD/6VhuVsAytqLCeat627oerX2/1E4omWUgvrnqsOMI6r4fuF5oJvX+D8egCUDhbhaJJ6mur+UFXK3XelRP5K53NvNLZbPDXrDg/Os34zfkv3G5pUX98v+14NkNFhbVkZCLOX8MJpu6WNz0FtntLb/u9tOzwMnU3w1Q8xex8YT8dX6otiWqrHN/fXBGxbETFhbU05T2s7b7VAflrK27J6VoVFdbV63fWXWONTMQ5N3ar7H3NpwuL/DqfB+7PQsnU43GFfitUVFi35wpT1uFg4KHe/k/FU0zdzVBfW728SAe4fjvFvUxuy6fDcx9Pl32VvSsYqIhps6LO/dt81QD8O5YsuazwQWiGofHZdZ93diS2fLkgkcxw7qP/AvDtYOFD24Dfy4GOeuZSiyXbQuFdYd9gmN/9Lbbpf8+S7n3NZV1df27Xdrr3uT8qqLAzVudXdzI0PksomiT0+/+U/bxQNEno/Rsl932tqZbDzzYu3z72fBM3ZlJrbltfW82x55sebvCfw1MFJw618Ks/T657lb014OPEoZaKuNQAFXbGqvN6ePOldva0+Uvuf3l3I8c7v7zu817e3Vhy+0BHPT9+cVfJlBfwe/nZsSd48ZnAqm3ffKm9ZMq04Kvx0Hu0fc2r6wF/Db1H2yvqW7Ru+gZpHpz/EYDTYok0bw99tnyV3VtdxVvffYK2hvI+V176vnt/T9DRc5ubXgIZgMWcO0J3SmvAx2tdrXiqClPka12tZUdV9BnjnNkAy+SmNdYocPDmbIonm+qcHoujihfp5X5lBihen13b/FFtjJvOWJcArn7q+IvNFbqCAbqCgS/esEjRsbu06QPaIDeFdQbgSjhBNJ5yeiwVJxpPc2XlWtgZJ8cC7gprFBjI5vIMDEeJKK6yReMpBoYjZAvr0wEe+FW0E9wUFv09wV7gQmIhy9tDk1wYu8Xk7VTJF9+kIJ3NMXk7xYWxW/xyaHLpN4UX7h9Dx7lp8Q5Af0+wu28wfGoxl++9PBHn8kTc6SFViuWf2LuBm65jPXjXfuB1Cj9l+gbgf3CDx1wS+BeFhfpvgY+LH3T6eqBrwpJHi6vWWPLoUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYmJ/wEXIDDKviZ6oQAAAABJRU5ErkJggg==", HM = "_container_1e5dd_1", $M = {
    container: HM
  }, JM = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.choices, r = e.inputId;
    return /* @__PURE__ */ L("div", Q(M({ className: $M.container }, t), { children: [
      /* @__PURE__ */ y("label", { htmlFor: r, children: e.label }),
      /* @__PURE__ */ y("select", { id: r, children: Object.keys(n).map((i, o) => /* @__PURE__ */ y("option", { value: n[i], children: i }, i)) })
    ] }));
  }, QM = {
    title: "Select Input",
    UiComponent: JM,
    settingsInfo: {
      inputId: no("mySelectInput"),
      label: ro("Select Input"),
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
    iconSrc: GM,
    category: "Inputs",
    description: "Create a select list that can be used to choose a single or multiple items from a list of values."
  }, KM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEEklEQVR4nO3bT4iUdRzH8behaBI7ZiB1WLokemkvUVk3Ye2ShwjKS6cu1amTIXTpFKUEBR30FnSyQATrUAreDOwf5CEhL1vBhkGsGrK20nT4PQdZpnXn8fnM7PM87xd4cn/f+c3Dm2dmnnlm03A4RGrafdPegLrJsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEZunvYGkt05eudufbAX2Ay8AzwCPAgPgGrAAfAOcBs4Dt+427Oihx2rvtWs6HdYaNgOvAu8Aj4z4/wEwV/17DbgKvA98DPwzmS22Wx9fCvcA3wMnGB3VKLuAD4Bvgb2hfXVK38J6ErhAORPVMVetf7qxHXVUn8LaC5wFdt7jnAeBr/DMtaa+hLUFOEl579SEAfBZNVcj9CWsN6n/8vd/Hq/maoQ+hLUNOByafbiar1U2DYfDae9hHLuB94B5YGY9Cy799jefXvgjtqFXnn2YudkHYvMr14FzwBHgl/SDNaFNZ6w9wEXgRdYZFcDPizdjGwK4HJ5fmaE874uU47DhtSmsd4Ed4y76/a/l5ncywfmr7KAchw2vTWHN11m0dPN20/uY6PwRnpv0A9bRprBqWV75t9Xz26pNYZ2rs2jbluxTTM8f4etJP2AdbQrrbWBp3EWD7dnv2Qf3T/R7/CXKcdjw2hTWZWAfcAq4sd5Fszuzl5lmH5rIZawblOe9j3IcNry2XccaS3U/1kuUr19SXgY+B+/HulObzlh1naHcT5XwZzVfq/QhrGXgWGj2sWq+VulDWAAfAT81PPMS8GHDMzujL2GtAIco97I34RrlvdVKQ/M6py9hQfk0Nc+9v9+6ChygJZ/OpqVPYQF8R7k9+Yea638EnqLc+6419C0sgF8p96y/ASyuc80i8DolqoXQvjqlrz//ug0cBz4BDgLPA09Qflc4Q7n/aYHya54vgS/w099YOn2BVNPTx5dCTYBhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxF/Aek7Hy8USK+/wAAAABJRU5ErkJggg==", XM = "_container_1f2js_1", qM = "_sliderWrapper_1f2js_11", ZM = "_sliderInput_1f2js_16", Vp = {
    container: XM,
    sliderWrapper: qM,
    sliderInput: ZM
  }, e7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = M({}, e), { width: r = "200px" } = n, [i, o] = J.useState(n.value);
    return /* @__PURE__ */ L(
      "div",
      Q(M({
        className: Wt(Vp.container, "shiny::sliderInput"),
        style: { width: r }
      }, t), {
        children: [
          /* @__PURE__ */ y("div", { children: n.label }),
          /* @__PURE__ */ y("div", { className: Vp.sliderWrapper, children: /* @__PURE__ */ y(
            "input",
            {
              type: "range",
              min: n.min,
              max: n.max,
              value: i,
              onChange: (a) => o(Number(a.target.value)),
              className: "slider " + Vp.sliderInput,
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
            /* @__PURE__ */ y(af, { type: "input", name: n.inputId }),
            " = ",
            i
          ] })
        ]
      })
    );
  }, t7 = {
    title: "Slider Input",
    UiComponent: e7,
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
    settingsFormRender: ({ inputs: e }) => /* @__PURE__ */ L(et, { children: [
      e.inputId,
      e.label,
      /* @__PURE__ */ L(nC, { label: "Values", children: [
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
    iconSrc: KM,
    category: "Inputs",
    description: "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_"
  }, rC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGBElEQVR4nO3dW4hVVRzH8e/cdMyZ8TIamZEXFA1CozQTougtqUBJLYkgeumlGAoa6TUqSKFE6qEeInoQRUwrqncjtCia0pepeSjSYKLwkpiOTtPDOsKZfc5c9JzfWmfv8/vAedh7z/BfZ81v9l5n7ctpGRsbw6zeWlM3wIrJwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEyiPVah/gND1VbPADaXXhuBW0vrWjI/l320s7dXbr8AnAJ+AA4DnwAjmZ9j1xMrsqskogWrii3ALiDOOy2+LmB16bUDGAJ2Ah+naEyKQ2Eb8CbhDTtUOiuAQ4S+botdPMUe6w2gP0HdZnWtr3fGLBp7j7WVylCNAHsJY6xuKscPlNaVv7y9cns3oQ/3Ujm26if0fTQxgzUDeDuz7jSwAegDjhMGoHZjLhD6sI/Qp6cz2/cQ/gZRxAzWNuC2suUR4FFgIGIbmsUA8AhwuWzdYmB7rAbEDNbmzPJ7OFRKPwLvZ9ZtjlU8ZrDWZ5b3RazdrLJ9vC5W4ZifCpdmlqMd75vYcaoP9uVSntKpmBW24vC5QpNwsEwi5hhrqhOpppGk373HMgkHyyQcLJOIOcbymCqNppvHsgLLU7AWAm8Bg8AlwqedWK+LwAngVWCu+H0WQspLk6/HOuBLYEGi+rOAO0uvZ4FNhKDZBGLusbJ7genqBT4lXaiyFhPaMyd1Q6bpRvu9Jnk4FPYBi1I3ImMp8ELqRjSyPBwKH6+2cklvJxtXzGHZwll0d7bR3la/Dz9XR8c49+9Vfhm+yNc/n2P4fNXz5U8Cr9WtaMHkIVgVd/I8dMc8Nq3plRVsb2uht6uD3q45rFvWw75jw5w8VXHV9CpgP3A7+kuA/gKOAR8Cv4lr1UXMQ+FUNwRMZNwfbemCTh4WhiqrvbWF7ffeTM+siv/BdkLoY1xXtgB4jHDh3oPX+bs32u81ycMYa5z1y3uiz/h1drSyYXlP5KpVzQReJ+wlG1rugrWktzNJ3ZW33JSkbhWdwDOpGzGVPIyxxpnf1ZGk7sLuCesOAx8Rbl4YBkbrVLILWAk8DdyV2XZ/nWrI5O56rPbWNKccZ3ZU3bn/CTwFnBWUPA/8AXwFfECYnL1mPmFsN53Lu309ViObIND70YSq3H/AwSrrG/pmFAerNgOR6pyMVKduHKza/B6pzt+R6tSNr8eqzZVIdS7V8Lu+HiuHYj3E5GqkOnXjYJmEg2USuZvHsuvmeSwrDgfLJBwsk/A8VvF5HsuKo1Eum4l290idpWz3P5NsS3508B7LJDyPVXyex7LiaJQx1mT/RfMeWDW3Z/Wi2ctLy+djNKia0leyjfYfGBpI1Ya8aJRgTebM0cGzZ44Ons3F/XQWeB6r+DyPZcXhYJmEg2USnscqPs9jWXE4WCbhYJmE57GKz/NYVhwOlkmkDFZDPy3FahMzWIOMf9743RFrN6v7GN/nv8YqHDNYP2WWd0Ss3ayyffxdrMIxg3Uks/wcsDZi/WazhtDH5Y7EKh4zWAeBU2XLM4HPqXy+ptVuLfAFoY+vOU31JwNKxAzWCPBSZt1i4BtgD+GLmGZHbE/RzCb04R7gW0LflnsRuByrMbGvID0I7AZeLls3g/B9OX1l67KTelOdSPX2ye0m4t4K0kw3vAK8k6Bus3qX0OdRpQjWKOGbs7YCQwnqN4shYBvwPPV79vy0pbyZ4hDwGeHNbwHuIYwL0nxDQP5dIQzQvwcOEw5903kOvETL2Fhe7263RuZzhSbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm8T/aaPEMWSCgvwAAAABJRU5ErkJggg==", n7 = ({
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }) => {
    var o;
    const i = (o = t == null ? void 0 : t.length) != null ? o : 0;
    return /* @__PURE__ */ y(eC, Q(M({ path: n }, r), { children: i > 0 ? t == null ? void 0 : t.map((a, l) => {
      var c;
      const s = nr(n, l), u = (c = Tg(a)) != null ? c : "unknown tab";
      return /* @__PURE__ */ y(HA, { title: u, children: /* @__PURE__ */ y(Zi, { path: s, node: a }) }, lf(s));
    }) : /* @__PURE__ */ y("div", { style: { padding: "5px" }, children: /* @__PURE__ */ y("span", { children: "Empty tabset. Drag elements or Tab Panel on to add content" }) }) }));
  }, r7 = {
    title: "Tabset Panel",
    UiComponent: n7,
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
        defaultValue: (e) => e ? GA(e) : "First Tab",
        choices: (e) => e ? VA(e) : ["First Tab"]
      }
    },
    acceptsChildren: !0,
    iconSrc: rC,
    category: "Tabs",
    description: "A container filled with tabs"
  }, i7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGaklEQVR4nO3c309TZxzH8TeFUqzVwhgRMJtsdppFXcQZnWb+uDEzMdEsWUZmvNh0iRe7NfwBu+Ryyy5MHEvMEoNZ5sQsWUJmFJfhFhWzVZewZv6YozBFqEKhLbS7KNRWIaLy3TnFz+uKltOTh5M3z3k47aEkk8kgMtc8Tg9A5ieFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmChzegBTmtsitDSF8h+vAz4AtgCrgIBDQ3OrYeAKcA441tIUuuTweAq4csZqboscAS4Ch4CNKKrpBMgem0PAxclj5hqumbGmNLdFTgK7Sz0lbAoFWftygNpgOeVlrvwdcExyPE1fLMnlm8N0RWJMpDMHmtsiNS1NoT1Ojw2gJJPJOD0GIHsqBI4AB4ILyvhoax31lT6HR1UceocSfNUZJTY6DtDa0hQ64PSY3DQNNAIHSj0liuoJ1Vf62L+1jjJPCcD+5rZIo9NjclNYewHeWr5YUT2FukofG5cvnnq418mxgLvC2gLQuGzRnO3w0++u0dwWYSyVnrN9ulnesdvi5DjAXWGtA1hapdnqadU/OHY6FebxApRm1wnyFMoeHLtyJ8cB7gpL5hHXXceajdPhAX6K3GM4MZF7bkNDgC0rq1gyzcI/NpLi+G8DhKNxAFbX+XnnjepHth1LpfkxPMDZntis9iszK7oZ62hnLz9cGSyICuDX68McPtM77UL98JneXFQA4Wicw2d6icVTuedi8RRfdPxdEFX+fvO3lccrqhnrxu1RwtE4SxZ52be5tmAWOdqZjaf72j02ragseN3Ccg+711aztmExY6k0x7v6CEfjdPw+wHsbawE4eeE2/fdTrK7zs2d9DUG/F4Dvu29ztidWsK08XlGFtaxmQcEb1fleq/UTjsYZTU488r38CCu8HvasryF86gZXo6NAdrYKR+MEfKW8v6mWCu+DiXxXYw27GmsMfpr5rajCmtLVM8TPkRj992d3egou9BY+9ntZsshL//0U/UMJBkey+2l4wVcQlTy9ogtr6pT3rBaWPxqQ36eo5kpRhXX5+r0Z11hdPUOc6L4z632NJLOL/IpyD4xkn4snno8r9P+Hogrr7nD2lLU5FHymP//7hxL0308R8JXmFukA1+8mGEuldTqcA0V1BBeUlwLwZ1+84LLC6fAAHVcHZ3zd8a6+3OWCWDzFiQv/AvB2KPumbdDvZUNDgOHERMG2kP2rsLktwje/9M35zzOfFdWM1fjKYjquDhKOxgl/+9esXxeOxgmfulHw3KvVPjavrMo93rGmmhsDiWm3DfhK2bGm+tkG/5wpqhmrwuvh4PZ6Vtf5C57fuaqKdxtfnPF1O1dVFTze0BDgw21LC055Qb+XT3a8xLYVwUe2Pbi9vuCUKY/npk+QZoAZr1PJ7Ex+EpeWppCj7+a7acZKAUyk3RF6MUqO59adw06OA9wV1iWAfwYTTo+jaPXFklNfXnFyHOCusM4BXL7p+C9b0co7duecHAe4K6xjAOcjMaJDmrWeVHQoyflI7pMZx5wcC7grrEtA63g6Q2tnlF7FNWvRoQStnb2MZ9enrW64K9pNYTF5P1x7bHSczztu0d59h1t3E/mLUpmUHE9z626C9u47fNZxa+qewnY33FMI7rrckLvUMHm7uCsOUBH5sqUp9LHTg5jiqrAe8iawj+ytTK8D/oc3eM7FgT/ILtS/Jvu/LnKcvh7omrBkfnHVGkvmD4UlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaY+A/iJMS/OUnuYwAAAABJRU5ErkJggg==", o7 = "_container_yicbr_1", a7 = {
    container: o7
  }, l7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = "200px", r = "auto", i = M({}, e), [o, a] = J.useState(i.value);
    return J.useEffect(() => {
      a(i.value);
    }, [i.value]), /* @__PURE__ */ L(
      "div",
      Q(M({
        className: Wt(a7.container, "shiny::textInput"),
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
  }, s7 = {
    title: "Text Input",
    UiComponent: l7,
    settingsInfo: {
      inputId: no("myTextInput"),
      label: ro("Text Input"),
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
    iconSrc: i7,
    category: "Inputs",
    description: "Create an input control for entry of unstructured text values."
  }, u7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGh0lEQVR4nO3bv2skZQDG8W/8haBNIhbaqHu72Jv0olyw1CbZRfTsktJqk4CNgkVuF+wviIKNm2xz14kJ+AecsROUDWkE7W4LrQ4lFvNOMjOZ/ZXdJ/tGnw8cuezOvTNcvsw78+5k4ezsDLNZe2LeB2D/TQ7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbx1LwPIGthYWGm4zU7vXvARvj2qN2orc50BwVnZ2cjt9naP1EeQqlWvXrt+4wqLCv1CvBR+PuXwO9zPJaxOay4vQw8BF4M338MrAI/ze2IxuRrrLi9x0VUAEvAEfDGXI5mAg4rbn+XvLbIDYjLYcXtW+CXktejj8thxe1P4G3g15L3oo4r6ov3Zqd3G1gGtkn+I7NOgT2SZYTjCcfdJlmGqGRe3gO67UbtaIIxloG19LWwlLAHHLfq1b1JjmmIP4C3gB+A1wvvpXHdJrIL+oVx1l6uS7qO1ez0FoEDkv+wcey1G7XN4ovFdSxgJ4xbKW6b0W03auuD3gyxH3A59KJjYLNVr+ain2Id6yXK4wLoMySueaxjxToVHjJ+VAAbzU5vd8Q2lTDusKgA1pqd3kHZG81ObyOMMSoqSM5mh1v7J6P2N670zHUjpsXowspMMakjYL3dqC1k/wCbJGeF1HY40w1S4SKIu8CtzFjrJFNrai1ElD2uCnCvMGZxnFvhtdRiyb+Zxo2JK7qwyFyzED6GaTdq3eJG7UZtj2SxMGvUWe4UWGk3ajvtRu08pDD+Cvm4tgv/thjIanGcVr162qpXd0hCPT+mrf2TZWbnRsQVY1jZH8LQC+B2o9Ynf9YaNu30SWIovdAPY+1kx2p2estwfrbKRrsz7CK/Va92w/5Sk0zr44g+rujuCsOUMon+6E0AOM6eXQbsu9vs9PpcTJm3ScJdK2w68o6vVa8ujXlcVxX13WJ0YRU1O701kjNRhYs7vEFmcaF8zMUZJh0ve+12HM5u03ie5APld4FnpxxrkEXge+BN4GfRPgaKNqxwET/qTk8he1ZbLHyF/NR7VZ8C9RmMM8oLwBfAO9ewr5zowgrXMwfkr7XmJQ1qVksGqZUZjzfMa9e4r3PRhUVy95WNKl1hPy27O2x2epOueU3itPB1Vh6STFHX4cE17ScnqrDCqnY2krvtRm1n0PYi2aj7ha/F96/qM5KV9HXg6RmMN8gD4BPh+APFttyQO1Ndd1RhgTU77aXXU7mwRizEjuMv4APgGWBhij93gH8G7OMBSbiPpzzWK4nqjEX+hzru9DPtDzlrrTBeulbVJX8jsUF+hf2Srf2TR5mxdlr16tDtr+BD4GvgyZL35hoVxHfGmujMED7TG3dquh3uNAeNVSEfTzddVgjrX9kF0d0wbZfa2j8ZFOisRB0VxBdW9gewCByWfGa33Oz0tpud3iMuL1yOstvs9A6LgYV9/Eg+huI0XHx64rDZ6e2GIAHY2j+pbO2f7JLc1aaOik84TCn6qCDCx2bCWWjSYFK5x2cKj81MYjN8FpkTApzkQ+U+sNKqV8+n9Sl//esO8BUTRuXHZhKbjD917E2w7bjXbOtlUUHug+9xVt6PgdVsVFO6UlTzEl1Y7UatH36xdJ3kormoSzJNLZU93DfEafgccofLMaYfQC+VrZUVju+o3agthe3Ltt0jecBvZYZT4LCo7hNZVBDZVPh/cIWp8H3gGwZHVWdEVJ4Kreg5kjPglaOaF4cVt1dJ4iq6T8RRgcOKXQ/4rfDafSKPChxW7B6TPPLyHckzVZ9zA6ICX7ybiM9YJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJP4F7bdmR9UysBAAAAAAElFTkSuQmCC", c7 = "_container_1i6yi_1", f7 = {
    container: c7
  }, p7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => /* @__PURE__ */ L("div", Q(M({ className: f7.container }, t), { children: [
    "Dynamic text from ",
    /* @__PURE__ */ L("code", { children: [
      "output$",
      e.outputId
    ] })
  ] })), d7 = {
    title: "Text Output",
    UiComponent: p7,
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
    iconSrc: u7,
    category: "Outputs",
    description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `
  }, h7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGT0lEQVR4nO3cy29UZRjH8e902tIbVFouNQpEQKLGCsEYUGJcGFHiQk2MxsTg0rgwulH/AmPiyoUoEdTgLdG4MJpoCJY7VTCgAQQpBVGm9+u0c+vcjosySENpC5ynp33n91k105PmafvNe86c87Yhz/MQ8VtJ0AOImxSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlpgoDXoAv7z5dWvhw/XAK8CDwG1AVVAzTWIE6AQOA9uAnwHefX5lkDP5xrUV6y3gELAZuJOZGxXAHGAZ8BywC3g32HH85cyKBTwCvAOE5lWWeo/dWxe6q6GKuZWllISCHm0sD4incrR2J9l5oi/fF8uUAG8wGtiuYKfzh0sr1qtAaH51af71jUtC65bPo7Zq5kUFEAJqKsKsWVrDaxuXlCyYW5a79KmXg5zLTy6FtQHg8cb6kpqKcNCzTFlFWQmbGusLAz8U6DA+cimsxQCrFs/ky6rxLV9UWfiwPsg5/OTSNVYIRk8xQfOAU21xTrfHiY/kqKsuY/XSGpbWV4x7fPWcyzOXT9eM1lwKa0ZIpHPsONjJ3z3JMa8faBlk/Ypanr5/4Yy87vObS6fCwHnAF81XR1Xw67koO0/0Te9QAVFYPjrTkaC1a/yoCvafGWQomZ2miYKjsHzU0pmY9Jhc3qO1e+L4XKCwfJQYyU1+0HUcN5spLB/Nr57ae6G66jLjSYKnsHy0eulcQpO846upCLNyceXEBzlAYfmoobach1fdcs3Ph4Cn1y6kvNT9H7vuY/nsyTULqCwPs/tUP5mcd/n1eZWlPLV2AY231wQ43fRRWD4LAY/eM58HV87jXHeSRDpPXVUpdyyspDRcBHdGL1FYRqrKw0WzOo1HYQFDySyHzw1xsT9FuCTEikWVrFtRS1kRrTB+K/qwTkZifHOkm1Qmf/m1P9viNLdGeWnDrSyudea58LRy/+3JBA6cGeTzQ51joiroHc7wwe4I56/x3E8mVpRhecAPf/Tywx+9eBMcl0zn2b6vnROR2HSN5oyiCyuX9/jql04OnBmc0vHZnMeXzZ00n43aDuaYorrGSmXy7DjYwbnrfAic9+C7Yz1Ek1meuK+eyS7pPQ+OR2K0diUoD5ewZlkNS+rG3+TnqqIJK5rM8sn+djoG0zf8NfacHmAomeXZBxYRvsZuvfhIjs8Ojd2TdbBlkEfuns+mxvpJH/m4oijC6hpK8/G+dgYTN78P6uiFYYZTOTZvaLjq0cxAPMv2fe30DI+N1wP2nh6gdzjNC+sbiuI2hvPXWBd6U3zY1OZLVAUtnQm27mkjlvp/+0vXUJoPmiJXRXWlk5E4W3e3MZzStplZ7WQkxkd720ik/f9FRvpH2NIUoS+W4d++0XijU9gZerE/xfs/X6QreuOn5NnA2VNh89ko3//eQ36i+wk3qS+WYUtThHTWI529+l7YtQzEs2xpivDiQw2saph9f642Fc6tWB7w0/E+vjtmG1VBLJW7rqgKUpk8nx7o4Mj5IYOpgufcivXN4S6OXhgOeowpyeU9vv2tm97hTNCj+M65FWu2RHWlvX8NBD2C75wLa5a7/nPqDOVSWC48cxkMegC/uBTW8aAH8MHJoAfwi0thfR/0AD74MegB/OJSWNuAf4Ie4ib0Mvo9OMGlsKLAM4z+w9jZJgo8C/QHPYhfXAoL4HegEXib0Wuumbz9cwRoAd5jdOZ9gU7js5DnTcPtaSk6rq1YMkMoLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDExH/tpJ306UTa3AAAAABJRU5ErkJggg==", m7 = "_container_1xnzo_1", g7 = {
    container: m7
  }, v7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const { outputId: n = "shiny-ui-output" } = e;
    return /* @__PURE__ */ y("div", Q(M({ className: g7.container }, t), { children: /* @__PURE__ */ L("div", { style: { gridArea: "1/1", placeSelf: "center" }, children: [
      "This is a a dynamic UI Output ",
      n,
      "!"
    ] }) }));
  }, y7 = {
    title: "Dynamic UI Output",
    UiComponent: v7,
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
    iconSrc: h7,
    category: "Outputs",
    description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `
  };
  function w7(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attr: { d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z" } }] })(e);
  }
  function b7(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M881.7 187.4l-45.1-45.1a8.03 8.03 0 0 0-11.3 0L667.8 299.9l-54.7-54.7a7.94 7.94 0 0 0-13.5 4.7L576.1 439c-.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-.8 9.3-8.8 4.7-13.5l-54.7-54.7 157.6-157.6c3-3 3-8.1-.1-11.2zM439 576.1l-189.2 23.5c-6.6.8-9.3 8.9-4.7 13.5l54.7 54.7-157.5 157.5a8.03 8.03 0 0 0 0 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l157.6-157.6 54.7 54.7a7.94 7.94 0 0 0 13.5-4.7L447.9 585a7.9 7.9 0 0 0-8.9-8.9z" } }] })(e);
  }
  const S7 = "_categoryDivider_bdwku_1", E7 = {
    categoryDivider: S7
  };
  function A7({ children: e }) {
    return /* @__PURE__ */ y("div", { className: E7.categoryDivider, children: e });
  }
  function C7(e) {
    return e.replaceAll(/\(/g, `(
  `).replaceAll(/\)/g, `
)`).replaceAll(/\(\s+\)/g, "()").replaceAll(/,/g, `,
 `).replaceAll(/(\s+)$/g, "");
  }
  const x7 = 20, k7 = ({
    uiArguments: e,
    wrapperProps: t
  }) => {
    const n = e.text.slice(0, x7).replaceAll(/\s$/g, "") + "...";
    return /* @__PURE__ */ y("div", Q(M({ className: "unknown-ui-function-display" }, t), { children: /* @__PURE__ */ L("div", { children: [
      "unknown ui output: ",
      /* @__PURE__ */ y("code", { children: n })
    ] }) }));
  }, O7 = {
    title: "Unknown UI Function",
    UiComponent: k7,
    settingsInfo: {
      text: {
        inputType: "omitted",
        defaultValue: "Unknown Ui Function"
      }
    },
    settingsFormRender: ({ settings: e }) => /* @__PURE__ */ L("div", { className: "unknown-ui-function-settings", children: [
      /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ L("span", { className: "info-msg", children: [
        /* @__PURE__ */ y(w7, {}),
        "Unknown function call. Can't modify with visual editor."
      ] }) }),
      /* @__PURE__ */ y(A7, { children: /* @__PURE__ */ y("span", { children: "Code" }) }),
      /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ y("pre", { className: "code-holder", children: C7(e.text) }) })
    ] }),
    acceptsChildren: !1
  }, tn = {
    "shiny::actionButton": z8,
    "shiny::numericInput": BM,
    "shiny::sliderInput": t7,
    "shiny::textInput": s7,
    "shiny::checkboxInput": K8,
    "shiny::checkboxGroupInput": G8,
    "shiny::selectInput": QM,
    "shiny::radioButtons": VM,
    "shiny::plotOutput": zM,
    "shiny::textOutput": d7,
    "shiny::uiOutput": y7,
    "shiny::navbarPage": DM,
    "shiny::tabPanel": XA,
    "shiny::tabsetPanel": r7,
    "gridlayout::grid_page": I8,
    "gridlayout::grid_card": a4,
    "gridlayout::grid_card_text": b4,
    "gridlayout::grid_card_plot": m4,
    "gridlayout::grid_container": O8,
    "DT::DTOutput": k_,
    "plotly::plotlyOutput": L8,
    unknownUiFunction: O7
  };
  function T7(e, { path: t, node: n }) {
    const r = yE(t), i = t[t.length - 1], o = gi(e, r);
    if (!tn[o.uiName].acceptsChildren)
      throw new Error(
        "Can't add a child to a non-container node. Check the path"
      );
    Array.isArray(o.uiChildren) || (o.uiChildren = []), o.uiChildren = Qo(
      o.uiChildren,
      i,
      n
    );
  }
  function iC(e, { path: t }) {
    const { parentNode: n, indexToNode: r } = I7(e, t);
    if (!ig(n))
      throw new Error("Somehow trying to enter a leaf node");
    n.uiChildren.splice(r, 1);
  }
  function I7(e, t) {
    const n = [...t], r = n.pop();
    if (typeof r == "undefined")
      throw new Error("Path to node must have at least one element");
    const i = n.length === 0 ? e : gi(e, n);
    if (!ig(i))
      throw new Error("Somehow trying to enter a leaf node");
    return { parentNode: i, indexToNode: r };
  }
  function P7(e, { path: t, currentPath: n, node: r }) {
    const i = yE(t), o = t[t.length - 1], a = gi(e, i);
    if (!tn[a.uiName].acceptsChildren)
      throw new Error(
        "Can't add a child to a non-container node. Check the path"
      );
    Array.isArray(a.uiChildren) || (a.uiChildren = []);
    const l = [...i, o];
    if (Zm(n, l)) {
      const s = n[n.length - 1];
      a.uiChildren = w_(
        a.uiChildren,
        s,
        o
      );
      return;
    }
    iC(e, { path: n }), a.uiChildren = Qo(
      a.uiChildren,
      o,
      r
    );
  }
  function oC(e) {
    return "currentPath" in e && e.currentPath !== void 0;
  }
  function _7(e, t) {
    const { path: n, node: r } = t;
    if (oC(t)) {
      P7(e, { path: n, currentPath: t.currentPath, node: r });
      return;
    }
    T7(e, { path: n, node: t.node });
  }
  function N7(e, { path: t, node: n }) {
    const r = gi(e, t);
    Object.assign(r, n);
  }
  const ar = {
    ui: "<UI>",
    libraries: "<LIBRARIES>"
  }, D7 = /^\w+::/;
  function R7(e) {
    if (D7.test(e))
      return e;
    const t = new RegExp(`^\\w+::${e}$`);
    for (const n in tn)
      if (t.test(n))
        return n;
    throw new Error(
      `Unknown function ${e} made it passed the unknown function filter`
    );
  }
  function aC(e) {
    return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
  }
  function L7(e) {
    return ms(e) && "val" in e && ["string", "boolean", "number"].includes(typeof e.val);
  }
  function lr(e) {
    return ms(e) && "val" in e && Array.isArray(e.val);
  }
  function F7(e) {
    return ms(e) && "name" in e;
  }
  class Dt extends Error {
    constructor({ message: t, cause: n }) {
      super(), this.name = "AST_PARSING_ERROR", this.message = t, this.cause = n;
    }
  }
  function M7(e) {
    return e[0].val === "c";
  }
  function B7(e) {
    const t = e[0].val;
    return t === "c" || t === "list";
  }
  function U7(e) {
    return lr(e) && M7(e.val);
  }
  function z7(e) {
    return lr(e) && e.val[0].val === "list";
  }
  function W7(e) {
    try {
      return lC(e);
    } catch (t) {
      if (!(t instanceof Dt))
        throw t;
      return Tf({ node: e, explanation: t.message });
    }
  }
  function lC(e) {
    if (!lr(e))
      throw new Dt({
        message: "Tried to flatten a leaf/primative node"
      });
    const [t, ...n] = e.val;
    if (t.val !== "c")
      throw new Dt({
        message: "Tried to flatten non array as array"
      });
    return n.map(
      (r) => aC(r.val) ? r.val : lC(r)
    );
  }
  function j7(e) {
    if (!lr(e))
      throw new Dt({
        message: "Tried to flatten a leaf/primative node"
      });
    try {
      const [t, ...n] = e.val;
      if (t.val !== "list")
        throw new Dt({
          message: "Tried to flatten non array as array",
          cause: e
        });
      let r = {};
      return n.forEach(({ name: i, val: o }) => {
        if (typeof i != "string")
          throw new Dt({
            message: "All elements in list must have a name",
            cause: e
          });
        if (!aC(o))
          throw new Dt({
            message: "Nested lists are not supported",
            cause: e
          });
        r[i] = o;
      }), r;
    } catch (t) {
      if (!(t instanceof Dt))
        throw t;
      return Tf({ node: e, explanation: t.message });
    }
  }
  function Y7(e, t) {
    const n = " ".repeat(t);
    return e.replaceAll(/\n/g, `
${n}`);
  }
  const sC = 2, V7 = " ".repeat(sC), Pg = 60, fi = `
${V7}`;
  function uC(e) {
    const [t, ...n] = e;
    if (typeof t.val != "string")
      return "Unknown Ui Code";
    const r = n.map(
      (a) => `${a.name ? `${a.name} = ` : ""}${G7(a)}`
    ), i = cC({
      fn_name: t.val,
      fn_args_list: r,
      max_line_length_for_multi_args: B7(e) ? Pg : 0
    }), o = `,${i ? fi : " "}`;
    return `${t.val}(${i ? fi : ""}${r.join(o)}${i ? `
` : ""})`;
  }
  function cC({
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
  function G7({ val: e, type: t }) {
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
        return Hl(uC(e));
      case "u":
        return "<...>";
    }
  }
  function Hl(e) {
    return Y7(e, sC);
  }
  function Tf({
    node: e,
    explanation: t
  }) {
    return {
      uiName: "unknownUiFunction",
      uiArguments: {
        text: lr(e) ? uC(e.val) : e.val,
        explanation: t
      }
    };
  }
  function _g(e) {
    const [t, ...n] = e.val;
    if (typeof t.val != "string")
      throw new Dt({
        message: "Invalid ui node, name is not a primative"
      });
    let r = {}, i = [];
    n.forEach((a) => {
      F7(a) ? r[a.name] = H7(a) : i.push($7(a));
    });
    const o = {
      uiName: R7(t.val),
      uiArguments: r
    };
    return i.length > 0 && (o.uiChildren = i), Ig(o) ? o : Tf({ node: e });
  }
  function H7(e) {
    return L7(e) ? e.val : U7(e) ? W7(e) : z7(e) ? j7(e) : Tf({ node: e });
  }
  function $7(e, t) {
    if (!lr(e))
      throw new Dt({
        message: "Primative found in ui children of ui node."
      });
    return _g(e);
  }
  function J7(e, t) {
    if (!lr(e))
      return !1;
    const { val: n } = e;
    return n[0].val === "<-" || n[0].val === "=" ? t ? n[1].val === t : !0 : !1;
  }
  function fC(e) {
    return e.val[1];
  }
  function Q7(e) {
    return e.val[2];
  }
  function hc(e) {
    let t = [];
    return e.forEach((n) => {
      if (J7(n)) {
        const r = fC(n);
        K7(r) ? t.push({
          name: r.val[2].val,
          is_output: !0,
          node: n
        }) : r.type === "s" && t.push({
          name: r.val,
          is_output: !1,
          node: n
        });
      }
      if (lr(n)) {
        const r = hc(n.val);
        t.push(...r);
      }
    }), t;
  }
  function K7(e) {
    if (!lr(e))
      return !1;
    const { val: t } = e;
    return t.length === 3 && t[1].val === "output" && typeof t[2].val == "string";
  }
  function pC(e) {
    return e.filter(({ is_output: t }) => t).reduce((t, { name: n, node: r }) => {
      var o;
      const { pos: i } = r;
      return i && (t[n] = [...(o = t[n]) != null ? o : [], i]), t;
    }, {});
  }
  function X7(e) {
    return !Boolean(e.pos) || !(fC(e).val === "ui") ? !1 : lr(Q7(e));
  }
  function dC(e) {
    const t = e.find(
      ({ name: r, is_output: i }) => r === "ui" && !i
    );
    if (!t)
      throw new Dt({
        message: "No ui assignment node was found in provided ast"
      });
    const { node: n } = t;
    if (!X7(n))
      throw new Dt({
        message: "No position info attached to the ui assignment node",
        cause: n
      });
    return n;
  }
  function hC(e) {
    const t = e.find(
      ({ name: r, is_output: i }) => r === "server" && !i
    );
    if (!t)
      throw new Dt({
        message: "No server assignment node was found in provided ast"
      });
    const { node: n } = t;
    if (!n.pos)
      throw new Dt({
        message: "No position info attached to the ui assignment node",
        cause: n
      });
    return n;
  }
  function mC(e) {
    return e.app_type === "SINGLE-FILE" ? q7(e) : Z7(e);
  }
  function q7({
    app: { ast: e }
  }) {
    const t = hc(e), n = dC(t), r = hC(t), i = pC(t);
    return {
      app_type: "SINGLE-FILE",
      app: {
        ui_tree: _g(n.val[2]),
        ui_pos: n.pos,
        ui_assignment_operator: n.val[0].val,
        server_pos: r.pos,
        server_node: r,
        output_positions: i
      }
    };
  }
  function Z7({
    ui: e,
    server: t
  }) {
    const n = hc(e.ast), r = dC(n), i = hc(t.ast), o = hC(i), a = pC(i);
    return {
      app_type: "MULTI-FILE",
      ui: {
        ui_tree: _g(r.val[2]),
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
  function gC(e) {
    return e.app_type === "SINGLE-FILE" ? e9(e) : n9(e);
  }
  function e9(e) {
    const t = mC(e), {
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
    return s.forEach((p, d) => {
      var m, S;
      const h = vC({ line: p, line_number: d, ui_pos: n });
      if (h === "Other") {
        c.push(p);
        return;
      }
      if (h === "Library") {
        const g = (S = (m = Ng.exec(p)) == null ? void 0 : m.groups) == null ? void 0 : S.library;
        g && g !== "shiny" && u.push(g);
      }
      if (h !== f)
        if (f = h, h === "UI")
          c.push(
            `ui ${r} ${ar.ui}`
          );
        else if (h === "Library")
          c.push(ar.libraries);
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
  function t9({ ui_pos: e, ui_assignment_operator: t }, n) {
    const r = n.split(`
`);
    let i = ["shiny"], o = [], a;
    return r.forEach((l, s) => {
      var c, f;
      const u = vC({ line: l, line_number: s, ui_pos: e });
      if (u === "Other") {
        o.push(l);
        return;
      }
      if (u === "Library") {
        const p = (f = (c = Ng.exec(l)) == null ? void 0 : c.groups) == null ? void 0 : f.library;
        p && p !== "shiny" && i.push(p);
      }
      if (u !== a)
        if (a = u, u === "UI")
          o.push(
            `ui ${t} ${ar.ui}`
          );
        else if (u === "Library")
          o.push(ar.libraries);
        else
          throw new Error("Unknown line type");
    }), { code: o.join(`
`), libraries: i };
  }
  function n9(e) {
    const {
      ui: t,
      server: { output_positions: n, server_pos: r }
    } = mC(e);
    return {
      app_type: "MULTI-FILE",
      ui_tree: t.ui_tree,
      output_positions: n,
      server_pos: r,
      ui: t9(t, e.ui.script),
      server: {
        code: e.server.script
      }
    };
  }
  function r9(e, [t, n, r, i]) {
    return e >= t - 1 && e <= r - 1;
  }
  function vC({
    line: e,
    line_number: t,
    ui_pos: n
  }) {
    return r9(t, n) ? "UI" : Ng.test(e) ? "Library" : "Other";
  }
  const Ng = new RegExp("^\\s*library\\((?<library>\\w+)\\)");
  function yC(e) {
    var n;
    const t = /* @__PURE__ */ new Set();
    try {
      for (const r of Object.values(tn)) {
        const i = (n = r == null ? void 0 : r.stateUpdateSubscribers) == null ? void 0 : n[e];
        i && t.add(i);
      }
      return t;
    } catch (r) {
      return t;
    }
  }
  const i9 = yC("DELETE_NODE"), o9 = yC("UPDATE_NODE"), wC = Hm({
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
        const n = "ui_tree" in t.payload ? t.payload : gC(t.payload);
        return M({ mode: "MAIN" }, n);
      },
      SHOW_TEMPLATE_CHOOSER: (e, { payload: t }) => ({ mode: "TEMPLATE_CHOOSER", options: t }),
      SET_LOADING: (e) => ({ mode: "LOADING" }),
      UPDATE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to update a node when in template chooser mode");
        for (const n of o9)
          n(e.ui_tree, t.payload);
        N7(e.ui_tree, t.payload);
      },
      PLACE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to move a node when in template chooser mode");
        _7(e.ui_tree, t.payload);
      },
      DELETE_NODE: (e, t) => {
        if (e.mode !== "MAIN")
          throw new Error("Tried to delete a node when in template chooser mode");
        for (const n of i9)
          n(e.ui_tree, { path: t.payload.path });
        iC(e.ui_tree, t.payload);
      }
    }
  }), {
    UPDATE_NODE: bC,
    PLACE_NODE: SC,
    DELETE_NODE: EC,
    SET_APP_INFO: a9,
    SET_FULL_STATE: AC,
    SHOW_TEMPLATE_CHOOSER: l9,
    SET_LOADING: UU
  } = wC.actions;
  function If() {
    const e = qi();
    return k.useCallback(
      (n) => {
        e(SC(n));
      },
      [e]
    );
  }
  function CC() {
    return la((e) => e.app_info);
  }
  const s9 = wC.reducer;
  function xC(e) {
    const t = qi();
    return J.useCallback(() => {
      e !== null && t(EC({ path: e }));
    }, [t, e]);
  }
  class u9 {
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
  function c9(e) {
    const t = qi(), [n, r] = k.useState(!1), [i, o] = k.useState(!1), a = k.useRef(
      new u9({ comparisonFn: f9 })
    );
    k.useEffect(() => {
      if (!e || e.mode === "LOADING")
        return;
      const c = a.current;
      c.addEntry(e), o(c.canGoBackwards()), r(c.canGoForwards());
    }, [e]);
    const l = k.useCallback(
      (c) => {
        t(AC({ state: c }));
      },
      [t]
    ), s = k.useCallback(() => {
      try {
        l(a.current.goBackwards());
      } catch (c) {
      }
    }, [l]), u = k.useCallback(() => {
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
  function f9(e, t) {
    return typeof t == "undefined" ? !1 : t.mode === "LOADING" && e.mode === "LOADING" ? !0 : t.mode === "TEMPLATE_CHOOSER" && e.mode === "TEMPLATE_CHOOSER" ? JSON.stringify(t.options) === JSON.stringify(e.options) : e.mode === "MAIN" && t.mode === "MAIN" ? t.ui_tree === e.ui_tree : !1;
  }
  function kC(e, t) {
    const { ui_code: n, removed_namespaces: r } = OC(
      e,
      t
    );
    return { ui_code: n, library_calls: Array.from(r) };
  }
  function OC(e, t) {
    var c;
    const { uiName: n, uiArguments: r, uiChildren: i } = e, o = /* @__PURE__ */ new Set();
    if (TC(e))
      return {
        ui_code: IC(e),
        removed_namespaces: o
      };
    let a = n;
    if (t.remove_namespace) {
      const f = (c = a.match(/\w+(?=::)/)) == null ? void 0 : c[0];
      f && o.add(f), a = a.replace(/\w+::/, "");
    }
    const l = Object.keys(r).map(
      (f) => Hl(
        `${f} = ${g9(r[f])}`
      )
    );
    i == null || i.forEach((f) => {
      const p = OC(f, t);
      p.removed_namespaces.forEach(
        (d) => o.add(d)
      ), l.push(Hl(p.ui_code));
    });
    const s = cC({
      fn_name: n,
      fn_args_list: l,
      max_line_length_for_multi_args: Pg
    }), u = `,${s ? fi : " "}`;
    return {
      removed_namespaces: o,
      ui_code: `${a}(${s ? fi : ""}${l.join(u)}${s ? `
` : ""})`
    };
  }
  function TC(e) {
    return ms(e) && "uiName" in e && e.uiName === "unknownUiFunction";
  }
  function IC({
    uiArguments: e
  }) {
    return e.text;
  }
  function p9(e) {
    return !(typeof e != "object" || Object.values(e).find(
      (n) => typeof n != "string"
    ));
  }
  function d9(e) {
    const t = Object.keys(e).map((o) => `"${o}" = "${e[o]}"`), r = t.reduce((o, a) => o + a.length, 0) + 6 > Pg, i = r ? `,${fi}` : ", ";
    return `list(${r ? fi : ""}${t.join(i)}${r ? `
` : ""})`;
  }
  function h9(e) {
    const t = e.map(m9);
    return `c(${fi}${t.join(`,${fi}`)}
)`;
  }
  function m9(e) {
    switch (typeof e) {
      case "string":
        return `"${e}"`;
      default:
        return String(e);
    }
  }
  function g9(e) {
    return Array.isArray(e) ? h9(e) : p9(e) ? d9(e) : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : TC(e) ? IC(e) : JSON.stringify(e);
  }
  function k0({
    ui_tree: e,
    libraries: t,
    code: n
  }) {
    const { ui_code: r, library_calls: i } = kC(e, {
      remove_namespace: !0
    }), o = [...t];
    return i.forEach((a) => {
      t.includes(a) || o.push(a);
    }), n.replace(ar.ui, r).replace(ar.libraries, PC(o));
  }
  function PC(e) {
    return e.map((t) => `library(${t})`).join(`
`);
  }
  function Dg(e, { include_info: t }) {
    const { app_type: n, ui_tree: r } = e;
    switch (n) {
      case "SINGLE-FILE":
        return M({
          app_type: n,
          app: k0(M({ ui_tree: r }, e.app))
        }, t && { info: e });
      case "MULTI-FILE":
        return M({
          app_type: n,
          ui: k0(M({ ui_tree: r }, e.ui)),
          server: e.server.code
        }, t && { info: e });
    }
  }
  function _C(e, t) {
    const n = e.length;
    let r = [];
    for (let i = 0; i <= n; i++) {
      const o = gi(t, e.slice(0, i));
      if (o === void 0)
        break;
      r.push(tn[o.uiName].title);
    }
    return r;
  }
  function NC() {
    return /mac/i.test(window.navigator.platform);
  }
  function v9(e) {
    const t = J.useCallback(
      (n) => {
        !(n.target instanceof Element) || n.target.tagName !== "BODY" || (e.filter((r) => y9(n, r)).forEach(({ onPress: r }) => r()), n.defaultPrevented || n.stopPropagation());
      },
      [e]
    );
    J.useEffect(() => (document.addEventListener("keydown", t), () => {
      document.removeEventListener("keydown", t);
    }), [t]);
  }
  function y9(e, t) {
    return e.key === t.key && t.withCmdCtrl === (NC() ? e.metaKey : e.ctrlKey) && t.withShift === e.shiftKey;
  }
  function w9() {
    const { sendMsg: e, incomingMsgs: t, mode: n } = ql(), r = CC(), i = D_(), o = qi(), a = c9(r), l = xC(i), [s, u] = J.useState(null), c = J.useRef(null);
    v9([
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
    ]), J.useEffect(() => {
      const p = t.subscribe("APP-INFO", (m) => {
        const S = "ui_tree" in m ? m : gC(m);
        o(a9(S)), c.current = M({ mode: "MAIN" }, S), console.log("Full app info", S);
      }), d = t.subscribe(
        "TEMPLATE_CHOOSER",
        (m) => {
          o(l9({ outputChoices: m })), c.current = {
            mode: "TEMPLATE_CHOOSER",
            options: { outputChoices: m }
          };
        }
      ), h = t.subscribe(
        "BACKEND-ERROR",
        u
      );
      return e({ path: "READY-FOR-STATE" }), () => {
        p.unsubscribe(), d.unsubscribe(), h.unsubscribe();
      };
    }, [t, o, e]);
    const f = J.useMemo(
      () => PS(e, 500, !0),
      [e]
    );
    return J.useEffect(() => {
      if (n !== "VSCODE" || !i || r.mode !== "MAIN")
        return;
      const p = _C(i, r.ui_tree);
      e({ path: "NODE-SELECTION", payload: p });
    }, [i, n, e, r]), J.useEffect(() => {
      if (!(r.mode === "LOADING" || r === c.current)) {
        if (r.mode === "TEMPLATE_CHOOSER") {
          e({ path: "ENTERED-TEMPLATE-SELECTOR" });
          return;
        }
        f({
          path: "UPDATED-APP",
          payload: Dg(r, { include_info: !1 })
        });
      }
    }, [r, f, e]), {
      state: r,
      errorInfo: s,
      history: a
    };
  }
  function DC(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 16 16", fill: "currentColor" }, child: [{ tag: "path", attr: { fillRule: "evenodd", clipRule: "evenodd", d: "M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z" } }] })(e);
  }
  const b9 = "_appViewerHolder_zkojo_1", S9 = "_title_zkojo_55", E9 = "_appContainer_zkojo_89", A9 = "_previewFrame_zkojo_109", C9 = "_expandButton_zkojo_134", x9 = "_reloadButtonContainer_zkojo_135", k9 = "_reloadButton_zkojo_135", O9 = "_spin_zkojo_174", T9 = "_restartButton_zkojo_211", I9 = "_loadingMessage_zkojo_238", P9 = "_error_zkojo_249", $t = {
    appViewerHolder: b9,
    title: S9,
    appContainer: E9,
    previewFrame: A9,
    expandButton: C9,
    reloadButtonContainer: x9,
    reloadButton: k9,
    spin: O9,
    restartButton: T9,
    loadingMessage: I9,
    error: P9
  };
  function _9(e) {
    return Tt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
  }
  function N9(e) {
    return Tt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" } }] })(e);
  }
  function D9(e) {
    return Tt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "circle", attr: { cx: "8", cy: "8", r: "8" } }] })(e);
  }
  function R9(e) {
    return Tt({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", stroke: "#000", strokeWidth: "2", d: "M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M5,5 L19,19" } }] })(e);
  }
  const L9 = "_logs_xjp5l_2", F9 = "_logsContents_xjp5l_25", M9 = "_expandTab_xjp5l_29", B9 = "_clearLogsButton_xjp5l_69", U9 = "_logLine_xjp5l_75", z9 = "_noLogsMsg_xjp5l_81", W9 = "_expandedLogs_xjp5l_93", j9 = "_expandLogsButton_xjp5l_101", Y9 = "_unseenLogsNotification_xjp5l_108", V9 = "_slidein_xjp5l_1", Ci = {
    logs: L9,
    logsContents: F9,
    expandTab: M9,
    clearLogsButton: B9,
    logLine: U9,
    noLogsMsg: z9,
    expandedLogs: W9,
    expandLogsButton: j9,
    unseenLogsNotification: Y9,
    slidein: V9
  };
  function G9({
    appLogs: e,
    clearLogs: t
  }) {
    const { logsExpanded: n, toggleLogExpansion: r, unseenLogs: i } = H9(e), o = e.length === 0;
    return /* @__PURE__ */ L("div", { className: Ci.logs, "data-expanded": n, children: [
      /* @__PURE__ */ L(
        "button",
        {
          className: Ci.expandTab,
          title: n ? "hide logs" : "show logs",
          onClick: r,
          children: [
            /* @__PURE__ */ y(
              D9,
              {
                className: Ci.unseenLogsNotification,
                "data-show": i
              }
            ),
            "App Logs",
            n ? /* @__PURE__ */ y(_9, {}) : /* @__PURE__ */ y(N9, {})
          ]
        }
      ),
      /* @__PURE__ */ L("div", { className: Ci.logsContents, children: [
        o ? /* @__PURE__ */ y("p", { className: Ci.noLogsMsg, children: "No recent logs" }) : e.map((a, l) => /* @__PURE__ */ y("p", { className: Ci.logLine, children: a }, l)),
        o ? null : /* @__PURE__ */ y(
          dt,
          {
            variant: "icon",
            title: "clear logs",
            className: Ci.clearLogsButton,
            onClick: t,
            children: /* @__PURE__ */ y(R9, {})
          }
        )
      ] })
    ] });
  }
  function H9(e) {
    const [t, n] = k.useState(!1), [r, i] = k.useState(!1), [o, a] = k.useState(
      null
    ), [l, s] = k.useState(
      new Date()
    ), u = k.useCallback(() => {
      if (t) {
        n(!1), a(new Date());
        return;
      }
      n(!0), i(!1);
    }, [t]);
    return k.useEffect(() => {
      s(new Date());
    }, [e]), k.useEffect(() => {
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
  function Nh(r) {
    var i = r, {
      children: e,
      onClose: t
    } = i, n = it(i, [
      "children",
      "onClose"
    ]);
    const o = k.useRef(null);
    return k.useEffect(() => {
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
    }, [t]), /* @__PURE__ */ y("dialog", Q(M({}, n), { ref: o, onClose: t, children: e }));
  }
  const $9 = "_show_btn_83j0t_1", J9 = "_modal_83j0t_5", Q9 = "_title_83j0t_18", K9 = "_description_83j0t_22", X9 = "_code_holder_83j0t_26", q9 = "_footer_83j0t_43", Hn = {
    show_btn: $9,
    modal: J9,
    title: Q9,
    description: K9,
    code_holder: X9,
    footer: q9
  };
  function Z9({
    info: e
  }) {
    const t = Dg(e, { include_info: !1 });
    return t.app_type === "SINGLE-FILE" ? /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y("h2", { className: Hn.title, children: "App script" }),
      /* @__PURE__ */ L("p", { className: Hn.description, children: [
        "The following code defines the currently being edited app. Copy and paste it to an ",
        /* @__PURE__ */ y("code", { children: "app.R" }),
        " file to use."
      ] }),
      /* @__PURE__ */ L("div", { className: Hn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "app.R" }),
        /* @__PURE__ */ y("pre", { children: t.app })
      ] })
    ] }) : /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y("h2", { className: Hn.title, children: "App scripts" }),
      /* @__PURE__ */ L("p", { className: Hn.description, children: [
        "The following code defines the currently being edited app. Copy and paste the ui and server scripts into ",
        /* @__PURE__ */ y("code", { children: "ui.R" }),
        " and",
        " ",
        /* @__PURE__ */ y("code", { children: "server.R" }),
        " files to use."
      ] }),
      /* @__PURE__ */ L("div", { className: Hn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "ui.R" }),
        /* @__PURE__ */ y("pre", { children: t.ui })
      ] }),
      /* @__PURE__ */ L("div", { className: Hn.code_holder, children: [
        /* @__PURE__ */ y("label", { children: "server.R" }),
        /* @__PURE__ */ y("pre", { children: t.server })
      ] })
    ] });
  }
  function eB() {
    const [e, t] = k.useState(!1), r = zS().getState().app_info;
    return r.mode !== "MAIN" ? null : /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(da, { className: $t.title, children: "Code" }),
      /* @__PURE__ */ y(
        wi,
        {
          className: Hn.show_btn,
          text: "See current application code",
          position: "left",
          onClick: () => t((i) => !i),
          variant: "regular",
          children: "Get app script"
        }
      ),
      e ? /* @__PURE__ */ y(
        Nh,
        {
          className: Hn.modal,
          title: "App Script",
          onClose: () => t(!1),
          children: /* @__PURE__ */ L("form", { method: "dialog", children: [
            /* @__PURE__ */ y(Z9, { info: r }),
            /* @__PURE__ */ y("div", { className: Hn.footer, children: /* @__PURE__ */ y(dt, { type: "submit", children: "Okay" }) })
          ] })
        }
      ) : null
    ] });
  }
  function tB() {
    const { sendMsg: e, incomingMsgs: t } = ql(), [n, r] = k.useState("HIDDEN"), [i, o] = k.useState([]), [a, l] = k.useState(null);
    k.useEffect(() => {
      const d = t.subscribe(
        "APP-PREVIEW-STATUS",
        (S) => {
          l(null), r(S);
        }
      ), h = t.subscribe(
        "APP-PREVIEW-LOGS",
        (S) => {
          o(nB(S));
        }
      ), m = t.subscribe(
        "APP-PREVIEW-CRASH",
        (S) => {
          l(S);
        }
      );
      return e({ path: "APP-PREVIEW-REQUEST" }), u(() => () => e({ path: "APP-PREVIEW-RESTART" })), f(() => () => e({ path: "APP-PREVIEW-STOP" })), () => {
        d.unsubscribe(), h.unsubscribe(), m.unsubscribe();
      };
    }, [t, e]);
    const [s, u] = k.useState(
      // eslint-disable-next-line no-console
      () => () => console.warn("No app running to reset")
    ), [c, f] = k.useState(
      // eslint-disable-next-line no-console
      () => () => console.warn("No app running to stop")
    ), p = k.useCallback(() => {
      o([]);
    }, []);
    return {
      appLogs: i,
      clearLogs: p,
      restartApp: s,
      stopApp: c,
      appLoc: n,
      errors: a
    };
  }
  function nB(e) {
    return Array.isArray(e) ? e : [e];
  }
  function rB() {
    const e = iB();
    return oB(e.width);
  }
  function iB() {
    const [e, t] = k.useState(O0()), n = k.useMemo(
      () => PS(() => {
        t(O0());
      }, 500),
      []
    );
    return k.useEffect(() => (window.addEventListener("resize", n), () => window.removeEventListener("resize", n)), [n]), e;
  }
  function oB(e) {
    const t = kA - RC * 2, n = e - LC * 2;
    return t / n;
  }
  function O0() {
    const { innerWidth: e, innerHeight: t } = window;
    return {
      width: e,
      height: t
    };
  }
  const RC = 16, LC = 55;
  function aB() {
    const e = k.useRef(null), [t, n] = k.useState(!1), r = k.useCallback(() => {
      n((p) => !p);
    }, []), { appLoc: i, errors: o, appLogs: a, clearLogs: l, restartApp: s } = tB(), u = rB(), c = k.useCallback(
      (p) => {
        uB(p.currentTarget), !(!e.current || typeof i == "string") && (p.metaKey ? s() : e.current.src = i.url);
      },
      [i, s]
    );
    if (i === "HIDDEN")
      return /* @__PURE__ */ y(eB, {});
    const f = ({ isExpandedMode: p }) => /* @__PURE__ */ y("div", { className: $t.reloadButtonContainer, children: /* @__PURE__ */ y(
      wi,
      {
        text: `Reload app session (hold ${cB()} to restart app server also)`,
        className: $t.reloadButton,
        onClick: c,
        position: p ? "right" : "up-right",
        children: /* @__PURE__ */ y(DC, {})
      }
    ) });
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ L(da, { className: $t.title, children: [
        /* @__PURE__ */ y(f, { isExpandedMode: !1 }),
        "App Preview"
      ] }),
      /* @__PURE__ */ y(
        "div",
        {
          className: $t.appViewerHolder,
          "data-expanded": t,
          style: {
            "--app-scale-amnt": u,
            "--preview-inset-horizontal": `${RC}px`,
            "--expanded-inset-horizontal": `${LC}px`
          },
          children: o !== null ? /* @__PURE__ */ y(lB, { onClick: s }) : /* @__PURE__ */ L(et, { children: [
            /* @__PURE__ */ y(f, { isExpandedMode: !0 }),
            /* @__PURE__ */ L("div", { className: $t.appContainer, children: [
              i === "LOADING" ? /* @__PURE__ */ y(sB, {}) : /* @__PURE__ */ y(
                "iframe",
                {
                  className: $t.previewFrame,
                  src: i.url,
                  title: "Application Preview",
                  ref: e
                }
              ),
              /* @__PURE__ */ y(
                dt,
                {
                  variant: "icon",
                  className: $t.expandButton,
                  title: t ? "Shrink app preview" : "Expand app preview",
                  onClick: r,
                  children: t ? /* @__PURE__ */ y(b7, {}) : /* @__PURE__ */ y($4, {})
                }
              )
            ] }),
            /* @__PURE__ */ y(G9, { appLogs: a, clearLogs: l })
          ] })
        }
      )
    ] });
  }
  function lB({ onClick: e }) {
    return /* @__PURE__ */ L("div", { className: $t.appContainer, children: [
      /* @__PURE__ */ L("p", { children: [
        "App preview crashed.",
        /* @__PURE__ */ y("br", {}),
        " Try and restart?"
      ] }),
      /* @__PURE__ */ L(
        dt,
        {
          className: $t.restartButton,
          title: "Restart app preview",
          onClick: e,
          children: [
            "Restart app preview ",
            /* @__PURE__ */ y(DC, {})
          ]
        }
      )
    ] });
  }
  function sB() {
    return /* @__PURE__ */ y("div", { className: $t.loadingMessage, children: /* @__PURE__ */ y("h2", { children: "Loading app preview..." }) });
  }
  function uB(e) {
    const t = e.querySelector("svg");
    t == null || t.classList.add($t.spin), e.addEventListener(
      "animationend",
      () => t == null ? void 0 : t.classList.remove($t.spin),
      !1
    );
  }
  function cB() {
    return NC() ? "⌘" : "Alt";
  }
  const fB = (e) => /* @__PURE__ */ y(
    "svg",
    Q(M({
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
  ), pB = {
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
  }, dB = {
    title: "Chick Weights Grid",
    description: "Plots investigating the ChickWeights built-in dataset",
    uiTree: pB,
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
  }, hB = {
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
  }, mB = {
    title: "Chick Weights navbar",
    description: "Plots investigating the ChickWeights built-in dataset in a `navbarPage()` view",
    uiTree: hB,
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
  }, gB = {
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
  }, vB = {
    title: "Grid Geyser",
    description: "The classic geyser app in a gridlayout grid page",
    uiTree: gB,
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
  }, FC = [
    vB,
    mB,
    dB
  ];
  function yB(e) {
    const t = e.outputType === "SINGLE-FILE" ? wB(e) : bB(e);
    return Dg(t, { include_info: !0 });
  }
  function wB({
    uiTree: e,
    otherCode: {
      uiExtra: t = "",
      serverExtra: n = "",
      serverFunctionBody: r = "",
      serverLibraries: i = []
    }
  }) {
    const o = `${ar.libraries}

${t}
ui <- ${ar.ui}

${n}
server <- function(input, output) {
  ${Hl(r)}
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
  function bB({
    uiTree: e,
    otherCode: {
      uiExtra: t = "",
      serverExtra: n = "",
      serverFunctionBody: r = "",
      serverLibraries: i = []
    }
  }) {
    const o = `${ar.libraries}

${t}
ui <- ${ar.ui}
`, a = `${PC(i)}

${n}
server <- function(input, output) {
  ${Hl(r)}
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
  const Gp = 1260, T0 = 800;
  function SB({
    uiTree: e,
    width_px: t
  }) {
    const n = T0 * (t / Gp), r = t / Gp;
    return /* @__PURE__ */ y(
      "div",
      {
        className: "AppTemplatePreview",
        style: {
          width: `${t}px`,
          height: `${n}px`,
          "--full-w": `${Gp}px`,
          "--full-h": `${T0}px`,
          "--shrink-ratio": r
        },
        children: /* @__PURE__ */ y("div", { className: "template-container", children: /* @__PURE__ */ y(Zi, { path: [], node: e }) })
      }
    );
  }
  function MC(e) {
    return e.uiName === "gridlayout::grid_page" ? "grid" : "navbarPage";
  }
  const EB = {
    grid: pE,
    navbarPage: rC
  }, BC = 5, AB = {
    "--card-pad": `${BC}px`
  };
  function CB({
    info: { title: e, uiTree: t, description: n },
    onSelect: r,
    width_px: i,
    selected: o
  }) {
    const a = MC(t), l = EB[a], s = i - 2 * BC;
    return /* @__PURE__ */ y(
      Eg,
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
            style: AB,
            "data-selected": o,
            children: [
              /* @__PURE__ */ y("div", { className: "preview-container", children: /* @__PURE__ */ y(SB, { uiTree: t, width_px: s }) }),
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
  function xB() {
    const { sendMsg: e } = ql();
    return k.useCallback(
      (n) => {
        e({
          path: "UPDATED-APP",
          payload: yB(n)
        });
      },
      [e]
    );
  }
  const UC = ["grid", "navbarPage"];
  function kB(e) {
    return FC.filter(({ uiTree: t }) => {
      const n = MC(t);
      return !!e.layoutTypes.includes(n);
    });
  }
  function OB({
    outputChoices: e
  }) {
    const t = xB(), [n, r] = k.useState({
      layoutTypes: UC
    }), [i, o] = k.useState(
      null
    ), [a, l] = k.useState(
      e === "USER-CHOICE" ? "SINGLE-FILE" : e
    ), s = (f) => {
      o(
        (p) => p === f ? null : f
      );
    }, u = k.useMemo(
      () => kB(n),
      [n]
    );
    return k.useEffect(() => {
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
          ({ title: d }) => d === i
        );
        if (!f)
          return;
        const p = kC(f.uiTree, {
          remove_namespace: !0
        });
        t(Q(M(M({}, f), p), {
          outputType: a
        }));
      }
    };
  }
  const TB = ["SINGLE-FILE", "MULTI-FILE"], IB = {
    "SINGLE-FILE": "Single file mode",
    "MULTI-FILE": "Multi file mode"
  };
  function PB({
    selectedOutput: e,
    setSelectedOutput: t
  }) {
    return /* @__PURE__ */ L("form", { className: "App_TypeForm", children: [
      /* @__PURE__ */ y("legend", { children: "Generate app in:" }),
      TB.map((n) => {
        const r = IB[n];
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
  const _B = {
    grid: "Grid",
    navbarPage: "Tabs"
  };
  function NB({
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
          /* @__PURE__ */ y("div", { className: "layout-options", children: UC.map((r) => {
            const i = _B[r], o = n.includes(r);
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
                    t(Q(M({}, e), {
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
  const zC = 294, DB = {
    "--card-w": `${zC}px`
  };
  function RB({
    selectedTemplate: e,
    setSelectedTemplate: t,
    templates: n = FC
  }) {
    return n.length === 0 ? /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid empty-results", children: "No app templates fit current filters. Try broadening your search." }) : /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid", style: DB, children: n.map((r) => /* @__PURE__ */ y(
      CB,
      {
        info: r,
        selected: r.title === e,
        onSelect: () => {
          t(r.title);
        },
        width_px: zC
      },
      r.title
    )) });
  }
  function LB(e) {
    const {
      filterState: t,
      setFilterState: n,
      shownTemplates: r,
      selectedTemplate: i,
      setSelectedTemplate: o,
      finishSelection: a,
      selectedOutput: l,
      setSelectedOutput: s
    } = OB(e), u = i !== null, c = u ? "Next" : "Select a template";
    return /* @__PURE__ */ y(
      OA,
      {
        main: /* @__PURE__ */ y(
          RB,
          {
            templates: r,
            selectedTemplate: i,
            setSelectedTemplate: o
          }
        ),
        left: /* @__PURE__ */ L(et, { children: [
          /* @__PURE__ */ y(da, { children: "Choose App Template" }),
          /* @__PURE__ */ L("div", { className: "TemplateChooserSidebar", children: [
            /* @__PURE__ */ y("section", { className: "instructions", children: "Hover over a template to see a description and what elements are used. Select the desired template and click next to edit." }),
            /* @__PURE__ */ y(
              NB,
              {
                filterState: t,
                setFilterState: n
              }
            ),
            e.outputChoices === "USER-CHOICE" ? /* @__PURE__ */ y(
              PB,
              {
                selectedOutput: l,
                setSelectedOutput: s
              }
            ) : null,
            /* @__PURE__ */ y(
              dt,
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
  const FB = "_container_1d7pe_1", MB = {
    container: FB
  };
  function BB({
    goBackward: e,
    canGoBackward: t,
    goForward: n,
    canGoForward: r
  }) {
    return /* @__PURE__ */ L("div", { className: Wt(MB.container, "undo-redo-buttons"), children: [
      /* @__PURE__ */ y(
        dt,
        {
          variant: ["transparent", "icon"],
          disabled: !t,
          "aria-label": "Undo last change",
          title: "Undo last change",
          onClick: e,
          children: /* @__PURE__ */ y(bI, { height: "100%" })
        }
      ),
      /* @__PURE__ */ y(
        dt,
        {
          variant: ["transparent", "icon"],
          disabled: !r,
          "aria-label": "Redo last change",
          title: "Redo last change",
          onClick: n,
          children: /* @__PURE__ */ y(wI, { height: "100%" })
        }
      )
    ] });
  }
  function UB() {
    return la(
      (t) => t.connected_to_server
    ) ? null : /* @__PURE__ */ y(TA, { onConfirm: () => {
    }, onCancel: () => {
    }, children: /* @__PURE__ */ y("p", { style: { color: "var(--red, pink)", textAlign: "center" }, children: "Lost connection to backend. Check console where editor was launched for details." }) });
  }
  const zB = "_elementsPalette_qmlez_1", WB = "_OptionContainer_qmlez_18", jB = "_OptionItem_qmlez_24", YB = "_OptionIcon_qmlez_33", VB = "_OptionLabel_qmlez_41", Xa = {
    elementsPalette: zB,
    OptionContainer: WB,
    OptionItem: jB,
    OptionIcon: YB,
    OptionLabel: VB
  };
  function GB({ uiName: e }) {
    const {
      iconSrc: t,
      title: n,
      settingsInfo: r,
      description: i = n
    } = tn[e], o = {
      uiName: e,
      uiArguments: JA(r)
    }, a = oE({ nodeInfo: { node: o } });
    return t === void 0 ? null : /* @__PURE__ */ y(
      Eg,
      {
        popoverContent: i,
        contentIsMd: !0,
        openDelayMs: 500,
        triggerEl: /* @__PURE__ */ y("div", { className: Xa.OptionContainer, children: /* @__PURE__ */ L(
          "div",
          Q(M({
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
  const I0 = [
    "Inputs",
    "Outputs",
    "gridlayout",
    "uncategorized"
  ];
  function HB(e, t) {
    var i, o;
    const n = I0.indexOf(
      ((i = tn[e]) == null ? void 0 : i.category) || "uncategorized"
    ), r = I0.indexOf(
      ((o = tn[t]) == null ? void 0 : o.category) || "uncategorized"
    );
    return n < r ? -1 : n > r ? 1 : 0;
  }
  function $B({
    availableUi: e = tn
  }) {
    const t = J.useMemo(
      () => Object.keys(e).sort(HB),
      [e]
    );
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(da, { children: "Elements" }),
      /* @__PURE__ */ y("div", { className: Xa.elementsPalette, children: t.map((n) => /* @__PURE__ */ y(GB, { uiName: n }, n)) })
    ] });
  }
  function JB(e) {
    let t = [], n = {};
    for (let r in e)
      e[r].inputType === "omitted" ? t.push(r) : n[r] = e[r];
    return {
      omitted: t,
      nonOmittedFormInfo: n
    };
  }
  function QB({
    settings: e,
    settingsInfo: t,
    onSettingsChange: n
  }) {
    const r = y_(
      Object.keys(e),
      Object.keys(t)
    );
    return r.length === 0 ? null : /* @__PURE__ */ L("section", { className: "unknown-arguments-list", children: [
      /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: /* @__PURE__ */ y(
        qR,
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
                "aria-label": XB(e[i]),
                "data-balloon-pos": "left",
                style: { cursor: "inherit" },
                children: i
              }
            ),
            /* @__PURE__ */ y(
              wi,
              {
                text: `Remove ${i} argument`,
                onClick: () => n(i, { type: "REMOVE" }),
                type: "button",
                position: "left",
                children: /* @__PURE__ */ y(Hc, {})
              }
            )
          ]
        },
        i
      )) })
    ] });
  }
  function KB(e) {
    return Ig(e) ? e.uiName === "unknownUiFunction" : !1;
  }
  const P0 = 50;
  function XB(e) {
    let t = JSON.stringify(
      KB(e) ? e.uiArguments.text : e
    );
    return t.length > P0 + 4 && (t = t.substring(0, P0), t += "..."), "Value: " + t;
  }
  function qB(e) {
    const {
      settings: t,
      settingsInfo: n,
      onSettingsChange: r,
      renderInputs: i = ({ inputs: l }) => /* @__PURE__ */ y(et, { children: Object.values(l) })
    } = e, { nonOmittedFormInfo: o } = JB(n), a = {
      inputs: eU({
        settings: t,
        settingsInfo: o,
        onSettingsChange: r
      }),
      settings: t
    };
    return /* @__PURE__ */ L("form", { className: "FormBuilder", onSubmit: ZB, children: [
      i(a),
      /* @__PURE__ */ y(QB, M({}, e))
    ] });
  }
  const ZB = (e) => {
    e.preventDefault();
  };
  function eU({
    settings: e,
    settingsInfo: t,
    onSettingsChange: n
  }) {
    const r = {};
    return Object.keys(t).forEach((i) => {
      const o = t[i], a = e[i], l = Q(M({}, o), {
        name: i,
        value: a,
        onUpdate: (s) => n(i, s)
      });
      r[i] = /* @__PURE__ */ y(WA, M({}, l), i);
    }), r;
  }
  function tU({ node: e }) {
    const { sendMsg: t, mode: n } = ql();
    if (n !== "VSCODE" || !e)
      return null;
    const { serverBindings: r } = tn[e.uiName];
    return /* @__PURE__ */ L("div", { children: [
      /* @__PURE__ */ y(
        nU,
        {
          serverOutputInfo: r == null ? void 0 : r.outputs,
          node: e,
          sendMsg: t
        }
      ),
      /* @__PURE__ */ y(
        rU,
        {
          serverInputInfo: r == null ? void 0 : r.inputs,
          node: e,
          sendMsg: t
        }
      )
    ] });
  }
  function nU({
    serverOutputInfo: e,
    node: { uiArguments: t },
    sendMsg: n
  }) {
    const r = CC();
    if (!(r.mode === "MAIN" && "output_positions" in r) || typeof e == "undefined")
      return null;
    const i = r.output_positions, o = r.server_pos, { outputIdKey: a, renderScaffold: l } = e, s = typeof a == "string" ? a : a(t), u = t[s];
    if (typeof u != "string")
      return null;
    const c = i[u];
    return /* @__PURE__ */ y(
      wi,
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
  function rU({
    serverInputInfo: e,
    node: { uiArguments: t },
    sendMsg: n
  }) {
    if (typeof e == "undefined")
      return null;
    const { inputIdKey: r } = e, i = typeof r == "string" ? r : r(t), o = t[i];
    return typeof o != "string" ? null : /* @__PURE__ */ y(
      wi,
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
  const iU = "_container_1fh41_1", oU = "_node_1fh41_12", _0 = {
    container: iU,
    node: oU
  };
  function aU({
    tree: e,
    path: t,
    onSelect: n
  }) {
    const r = _C(t, e), i = t.length;
    return /* @__PURE__ */ y("div", { className: _0.container, "aria-label": "Path to selected node", children: r.map((o, a) => {
      const l = a === i, s = lU(o);
      return /* @__PURE__ */ y(
        "div",
        {
          className: _0.node,
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
  function lU(e) {
    return e.replace(/[a-z]+::/, "");
  }
  const sU = "_settingsPanel_a44hx_1", uU = "_currentElementAbout_a44hx_10", cU = "_settingsForm_a44hx_17", fU = "_settingsInputs_a44hx_24", pU = "_buttonsHolder_a44hx_28", dU = "_validationErrorMsg_a44hx_45", Hp = {
    settingsPanel: sU,
    currentElementAbout: uU,
    settingsForm: cU,
    settingsInputs: fU,
    buttonsHolder: pU,
    validationErrorMsg: dU
  };
  var hU = mU;
  function mU(e, t) {
    var n = {};
    typeof t == "string" && (t = [].slice.call(arguments, 1));
    for (var r in e)
      (!e.hasOwnProperty || e.hasOwnProperty(r)) && t.indexOf(r) === -1 && (n[r] = e[r]);
    return n;
  }
  function gU(e) {
    const t = qi(), [n, r] = qm(), [i, o] = J.useState(
      n !== null ? N0(e, n) : null
    ), a = J.useRef(!1), l = J.useCallback(
      (c) => {
        n && a.current && t(bC({ path: n, node: c }));
      },
      [t, n]
    );
    return J.useEffect(() => {
      if (a.current = !1, n === null) {
        o(null);
        return;
      }
      o(N0(e, n));
    }, [e, n]), J.useEffect(() => {
      i && l(i);
    }, [i, l]), {
      currentNode: i,
      updateArgumentsByName: (c, f) => {
        o(
          (p) => Q(M({}, p), {
            uiArguments: Q(M({}, p == null ? void 0 : p.uiArguments), { [c]: f })
          })
        ), a.current = !0;
      },
      deleteArgumentByName: (c) => {
        o((f) => {
          var p;
          return f === null ? f : Q(M({}, f), {
            uiArguments: hU(
              (p = f.uiArguments) != null ? p : {},
              c
            )
          });
        }), a.current = !0;
      },
      selectedPath: n,
      setNodeSelection: r
    };
  }
  function N0(...e) {
    try {
      return gi(...e);
    } catch (t) {
      return console.warn("Failed to get node. Args:", e), null;
    }
  }
  function vU({ tree: e }) {
    const {
      currentNode: t,
      updateArgumentsByName: n,
      deleteArgumentByName: r,
      selectedPath: i,
      setNodeSelection: o
    } = gU(e);
    if (i === null)
      return /* @__PURE__ */ y("div", { children: "Select an element to edit properties" });
    if (t === null)
      return /* @__PURE__ */ L("div", { children: [
        "Error finding requested node at path ",
        i.join(".")
      ] });
    const a = i.length === 0, { uiName: l, uiArguments: s } = t, u = tn[l], c = nM(
      u.settingsInfo,
      t
    );
    return /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(da, { children: "Properties" }),
      /* @__PURE__ */ L("div", { className: Hp.settingsPanel, children: [
        /* @__PURE__ */ y("div", { className: Hp.currentElementAbout, children: /* @__PURE__ */ y(
          aU,
          {
            tree: e,
            path: i,
            onSelect: o
          }
        ) }),
        /* @__PURE__ */ y(
          qB,
          {
            settings: s,
            settingsInfo: c,
            renderInputs: u.settingsFormRender,
            onSettingsChange: (f, p) => {
              switch (p.type) {
                case "UPDATE":
                  n(f, p.value);
                  return;
                case "REMOVE":
                  r(f);
                  return;
              }
            }
          }
        ),
        /* @__PURE__ */ y(tU, { node: t }),
        /* @__PURE__ */ y("div", { className: Hp.buttonsHolder, children: a ? null : /* @__PURE__ */ y(iE, { path: i }) })
      ] })
    ] });
  }
  function yU() {
    const { sendMsg: e, mode: t } = ql();
    return t !== "VSCODE" ? null : /* @__PURE__ */ L(et, { children: [
      /* @__PURE__ */ y(
        wi,
        {
          text: "Open app code next to editor",
          onClick: () => {
            e({
              path: "OPEN-COMPANION-EDITOR",
              payload: "BESIDE"
            });
          },
          className: "OpenSideBySideWindowButton",
          children: /* @__PURE__ */ y(H4, {})
        }
      ),
      /* @__PURE__ */ y("div", { className: "divider" })
    ] });
  }
  const wU = {
    "--properties-panel-width": `${kA}px`
  };
  function bU() {
    const { state: e, errorInfo: t, history: n } = w9();
    let r;
    return t ? r = /* @__PURE__ */ L(Nh, { className: "message-mode", children: [
      /* @__PURE__ */ L("h2", { children: [
        "Error ",
        t.context ? `while ${t.context}` : ""
      ] }),
      /* @__PURE__ */ y("p", { className: "error-msg", children: t.msg })
    ] }) : e.mode === "LOADING" ? r = /* @__PURE__ */ y(Nh, { className: "message-mode", children: /* @__PURE__ */ y("h2", { children: "Loading initial state from server" }) }) : e.mode === "MAIN" ? r = /* @__PURE__ */ y(__, { children: /* @__PURE__ */ y(
      OA,
      {
        main: /* @__PURE__ */ y(Zi, { node: e.ui_tree, path: [] }),
        left: /* @__PURE__ */ y($B, {}),
        properties: /* @__PURE__ */ y(vU, { tree: e.ui_tree }),
        preview: /* @__PURE__ */ y(aB, {})
      }
    ) }) : r = /* @__PURE__ */ y(LB, M({}, e.options)), /* @__PURE__ */ L("div", { className: "EditorContainer", style: wU, children: [
      /* @__PURE__ */ L("header", { children: [
        /* @__PURE__ */ y(fB, { className: "shiny-logo" }),
        /* @__PURE__ */ y("h1", { className: "app-title", children: "Shiny UI Editor" }),
        /* @__PURE__ */ L("div", { className: "right", children: [
          e.mode === "MAIN" ? /* @__PURE__ */ L(et, { children: [
            /* @__PURE__ */ y(yU, {}),
            /* @__PURE__ */ y(_I, {})
          ] }) : null,
          /* @__PURE__ */ y("div", { className: "divider" }),
          /* @__PURE__ */ y(BB, M({}, n)),
          /* @__PURE__ */ y("div", { className: "spacer last" })
        ] })
      ] }),
      r,
      /* @__PURE__ */ y(UB, {})
    ] });
  }
  const SU = Hm({
    name: "connectedToServer",
    initialState: !0,
    reducers: {
      DISCONNECTED_FROM_SERVER: (e, t) => !1
    }
  }), EU = SU.reducer;
  function AU(e, t) {
    const n = Math.min(e.length, t.length) - 1;
    return n <= 0 ? !0 : sE(e, t, n);
  }
  function CU({
    selectedPath: e,
    deletedPath: t
  }) {
    if (e === null)
      return e;
    if (ua(t, e))
      return xU(e);
    if (e.length < t.length || !AU(e, t))
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
  function xU(e) {
    return e.slice(0, e.length - 1);
  }
  const WC = Qm();
  WC.startListening({
    actionCreator: EC,
    effect: (e, t) => wa(gs, null, function* () {
      const n = e.payload.path, r = t.getState().selected_path;
      if (r === null)
        return;
      const i = CU({
        selectedPath: r,
        deletedPath: n
      });
      t.dispatch(sf({ path: i }));
    })
  });
  const kU = WC.middleware;
  function OU({ fromPath: e, toPath: t }) {
    const n = Fi(e);
    if (Fi(t) < n)
      return t;
    const i = n - 1;
    if (e[i] > t[i])
      return t;
    const o = [...t];
    return o[i]--, o;
  }
  const jC = Qm();
  jC.startListening({
    actionCreator: SC,
    effect: (e, t) => wa(gs, null, function* () {
      const n = e.payload;
      let r = n.path;
      oC(n) && (r = OU({
        fromPath: n.currentPath,
        toPath: r
      })), t.dispatch(sf({ path: r }));
    })
  });
  const TU = jC.middleware, YC = Qm();
  YC.startListening({
    actionCreator: AC,
    effect: (e, t) => wa(gs, null, function* () {
      t.dispatch(sf({ path: [] }));
    })
  });
  const IU = YC.middleware, PU = JP({
    reducer: {
      app_info: s9,
      selected_path: R_,
      connected_to_server: EU
    },
    middleware: (e) => e().concat(kU).concat(TU).concat(IU)
  });
  function _U({ children: e }) {
    return /* @__PURE__ */ y(gP, { store: PU, children: e });
  }
  function NU(e) {
    return /* @__PURE__ */ y(_U, { children: /* @__PURE__ */ y(Ok, Q(M({}, e), { children: /* @__PURE__ */ y(bU, {}) })) });
  }
  function DU({
    container: e,
    backendDispatch: { sendMsg: t, incomingMsgs: n, mode: r },
    showMessages: i
  }) {
    const o = i ? {
      sendMsg: t,
      incomingMsgs: {
        subscribe: (l, s) => (console.log(`backendMsgs.subscribe("${l}", ...)`), n.subscribe(l, s))
      },
      mode: r
    } : {
      sendMsg: t,
      incomingMsgs: n,
      mode: r
    };
    Yb(e).render(/* @__PURE__ */ y(NU, M({}, o)));
  }
  const RU = document.getElementById("root"), D0 = !0;
  wa(gs, null, function* () {
    try {
      const e = JC(), t = LU({
        messageDispatch: e,
        showMessages: D0
      });
      DU({ container: RU, backendDispatch: t, showMessages: D0 });
    } catch (e) {
    }
  });
  function LU({
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
      XC(l) ? i(l) : console.warn("Unknown message type", l);
    }), {
      sendMsg: (a) => {
        r("VSCode sendMsg()", a), n.postMessage(a);
      },
      incomingMsgs: { subscribe: e.subscribe },
      mode: "VSCODE"
    };
  }
});
export default FU();
