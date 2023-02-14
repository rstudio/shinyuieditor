var qC = Object.defineProperty, ZC = Object.defineProperties;
var ex = Object.getOwnPropertyDescriptors;
var Ps = Object.getOwnPropertySymbols;
var Yg = Object.prototype.hasOwnProperty, Vg = Object.prototype.propertyIsEnumerable;
var Gg = Math.pow, Bf = (e, t, n) => t in e ? qC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, M = (e, t) => {
  for (var n in t || (t = {}))
    Yg.call(t, n) && Bf(e, n, t[n]);
  if (Ps)
    for (var n of Ps(t))
      Vg.call(t, n) && Bf(e, n, t[n]);
  return e;
}, Q = (e, t) => ZC(e, ex(t));
var at = (e, t) => {
  var n = {};
  for (var r in e)
    Yg.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Ps)
    for (var r of Ps(e))
      t.indexOf(r) < 0 && Vg.call(e, r) && (n[r] = e[r]);
  return n;
};
var $g = (e, t, n) => (Bf(e, typeof t != "symbol" ? t + "" : t, n), n);
var Ca = (e, t, n) => new Promise((r, i) => {
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
const tx = nx;
function nx() {
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
function rx(e) {
  return typeof e == "object" && e !== null;
}
function ix(e) {
  return rx(e) ? "path" in e : !1;
}
var ox = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function jh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function $0(e) {
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
var Cl = {}, ax = {
  get exports() {
    return Cl;
  },
  set exports(e) {
    Cl = e;
  }
}, wc = {}, J = {}, lx = {
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
var Zl = Symbol.for("react.element"), sx = Symbol.for("react.portal"), ux = Symbol.for("react.fragment"), cx = Symbol.for("react.strict_mode"), fx = Symbol.for("react.profiler"), dx = Symbol.for("react.provider"), px = Symbol.for("react.context"), hx = Symbol.for("react.forward_ref"), mx = Symbol.for("react.suspense"), gx = Symbol.for("react.memo"), vx = Symbol.for("react.lazy"), Hg = Symbol.iterator;
function yx(e) {
  return e === null || typeof e != "object" ? null : (e = Hg && e[Hg] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H0 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, J0 = Object.assign, Q0 = {};
function oa(e, t, n) {
  this.props = e, this.context = t, this.refs = Q0, this.updater = n || H0;
}
oa.prototype.isReactComponent = {};
oa.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
oa.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function K0() {
}
K0.prototype = oa.prototype;
function Yh(e, t, n) {
  this.props = e, this.context = t, this.refs = Q0, this.updater = n || H0;
}
var Vh = Yh.prototype = new K0();
Vh.constructor = Yh;
J0(Vh, oa.prototype);
Vh.isPureReactComponent = !0;
var Jg = Array.isArray, X0 = Object.prototype.hasOwnProperty, Gh = { current: null }, q0 = { key: !0, ref: !0, __self: !0, __source: !0 };
function Z0(e, t, n) {
  var r, i = {}, o = null, a = null;
  if (t != null)
    for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t)
      X0.call(t, r) && !q0.hasOwnProperty(r) && (i[r] = t[r]);
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
  return { $$typeof: Zl, type: e, key: o, ref: a, props: i, _owner: Gh.current };
}
function wx(e, t) {
  return { $$typeof: Zl, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function $h(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Zl;
}
function bx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Qg = /\/+/g;
function Uf(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? bx("" + e.key) : t.toString(36);
}
function ou(e, t, n, r, i) {
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
          case Zl:
          case sx:
            a = !0;
        }
    }
  if (a)
    return a = e, i = i(a), e = r === "" ? "." + Uf(a, 0) : r, Jg(i) ? (n = "", e != null && (n = e.replace(Qg, "$&/") + "/"), ou(i, t, n, "", function(u) {
      return u;
    })) : i != null && ($h(i) && (i = wx(i, n + (!i.key || a && a.key === i.key ? "" : ("" + i.key).replace(Qg, "$&/") + "/") + e)), t.push(i)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Jg(e))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var s = r + Uf(o, l);
      a += ou(o, t, n, s, i);
    }
  else if (s = yx(e), typeof s == "function")
    for (e = s.call(e), l = 0; !(o = e.next()).done; )
      o = o.value, s = r + Uf(o, l++), a += ou(o, t, n, s, i);
  else if (o === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function _s(e, t, n) {
  if (e == null)
    return e;
  var r = [], i = 0;
  return ou(e, r, "", "", function(o) {
    return t.call(n, o, i++);
  }), r;
}
function Sx(e) {
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
var It = { current: null }, au = { transition: null }, Ex = { ReactCurrentDispatcher: It, ReactCurrentBatchConfig: au, ReactCurrentOwner: Gh };
he.Children = { map: _s, forEach: function(e, t, n) {
  _s(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return _s(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return _s(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!$h(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
he.Component = oa;
he.Fragment = ux;
he.Profiler = fx;
he.PureComponent = Yh;
he.StrictMode = cx;
he.Suspense = mx;
he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ex;
he.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = J0({}, e.props), i = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = Gh.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
      var l = e.type.defaultProps;
    for (s in t)
      X0.call(t, s) && !q0.hasOwnProperty(s) && (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
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
  return { $$typeof: Zl, type: e.type, key: i, ref: o, props: r, _owner: a };
};
he.createContext = function(e) {
  return e = { $$typeof: px, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: dx, _context: e }, e.Consumer = e;
};
he.createElement = Z0;
he.createFactory = function(e) {
  var t = Z0.bind(null, e);
  return t.type = e, t;
};
he.createRef = function() {
  return { current: null };
};
he.forwardRef = function(e) {
  return { $$typeof: hx, render: e };
};
he.isValidElement = $h;
he.lazy = function(e) {
  return { $$typeof: vx, _payload: { _status: -1, _result: e }, _init: Sx };
};
he.memo = function(e, t) {
  return { $$typeof: gx, type: e, compare: t === void 0 ? null : t };
};
he.startTransition = function(e) {
  var t = au.transition;
  au.transition = {};
  try {
    e();
  } finally {
    au.transition = t;
  }
};
he.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
he.useCallback = function(e, t) {
  return It.current.useCallback(e, t);
};
he.useContext = function(e) {
  return It.current.useContext(e);
};
he.useDebugValue = function() {
};
he.useDeferredValue = function(e) {
  return It.current.useDeferredValue(e);
};
he.useEffect = function(e, t) {
  return It.current.useEffect(e, t);
};
he.useId = function() {
  return It.current.useId();
};
he.useImperativeHandle = function(e, t, n) {
  return It.current.useImperativeHandle(e, t, n);
};
he.useInsertionEffect = function(e, t) {
  return It.current.useInsertionEffect(e, t);
};
he.useLayoutEffect = function(e, t) {
  return It.current.useLayoutEffect(e, t);
};
he.useMemo = function(e, t) {
  return It.current.useMemo(e, t);
};
he.useReducer = function(e, t, n) {
  return It.current.useReducer(e, t, n);
};
he.useRef = function(e) {
  return It.current.useRef(e);
};
he.useState = function(e) {
  return It.current.useState(e);
};
he.useSyncExternalStore = function(e, t, n) {
  return It.current.useSyncExternalStore(e, t, n);
};
he.useTransition = function() {
  return It.current.useTransition();
};
he.version = "18.2.0";
(function(e) {
  e.exports = he;
})(lx);
const k = /* @__PURE__ */ jh(J);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ax = J, Cx = Symbol.for("react.element"), xx = Symbol.for("react.fragment"), kx = Object.prototype.hasOwnProperty, Ox = Ax.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Tx = { key: !0, ref: !0, __self: !0, __source: !0 };
function ew(e, t, n) {
  var r, i = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t)
    kx.call(t, r) && !Tx.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      i[r] === void 0 && (i[r] = t[r]);
  return { $$typeof: Cx, type: e, key: o, ref: a, props: i, _owner: Ox.current };
}
wc.Fragment = xx;
wc.jsx = ew;
wc.jsxs = ew;
(function(e) {
  e.exports = wc;
})(ax);
const et = Cl.Fragment, y = Cl.jsx, L = Cl.jsxs;
var si = {}, Ix = {
  get exports() {
    return si;
  },
  set exports(e) {
    si = e;
  }
}, an = {}, ep = {}, Px = {
  get exports() {
    return ep;
  },
  set exports(e) {
    ep = e;
  }
}, tw = {};
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
  function t(U, V) {
    var $ = U.length;
    U.push(V);
    e:
      for (; 0 < $; ) {
        var x = $ - 1 >>> 1, C = U[x];
        if (0 < i(C, V))
          U[x] = V, U[$] = C, $ = x;
        else
          break e;
      }
  }
  function n(U) {
    return U.length === 0 ? null : U[0];
  }
  function r(U) {
    if (U.length === 0)
      return null;
    var V = U[0], $ = U.pop();
    if ($ !== V) {
      U[0] = $;
      e:
        for (var x = 0, C = U.length, tt = C >>> 1; x < tt; ) {
          var Ge = 2 * (x + 1) - 1, Qe = U[Ge], me = Ge + 1, $e = U[me];
          if (0 > i(Qe, $))
            me < C && 0 > i($e, Qe) ? (U[x] = $e, U[me] = $, x = me) : (U[x] = Qe, U[Ge] = $, x = Ge);
          else if (me < C && 0 > i($e, $))
            U[x] = $e, U[me] = $, x = me;
          else
            break e;
        }
    }
    return V;
  }
  function i(U, V) {
    var $ = U.sortIndex - V.sortIndex;
    return $ !== 0 ? $ : U.id - V.id;
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
  function w(U) {
    for (var V = n(u); V !== null; ) {
      if (V.callback === null)
        r(u);
      else if (V.startTime <= U)
        r(u), V.sortIndex = V.expirationTime, t(s, V);
      else
        break;
      V = n(u);
    }
  }
  function E(U) {
    if (m = !1, w(U), !h)
      if (n(s) !== null)
        h = !0, te(O);
      else {
        var V = n(u);
        V !== null && fe(E, V.startTime - U);
      }
  }
  function O(U, V) {
    h = !1, m && (m = !1, g(T), T = -1), p = !0;
    var $ = d;
    try {
      for (w(V), f = n(s); f !== null && (!(f.expirationTime > V) || U && !I()); ) {
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
        var tt = !0;
      else {
        var Ge = n(u);
        Ge !== null && fe(E, Ge.startTime - V), tt = !1;
      }
      return tt;
    } finally {
      f = null, d = $, p = !1;
    }
  }
  var b = !1, A = null, T = -1, P = 5, _ = -1;
  function I() {
    return !(e.unstable_now() - _ < P);
  }
  function F() {
    if (A !== null) {
      var U = e.unstable_now();
      _ = U;
      var V = !0;
      try {
        V = A(!0, U);
      } finally {
        V ? B() : (b = !1, A = null);
      }
    } else
      b = !1;
  }
  var B;
  if (typeof v == "function")
    B = function() {
      v(F);
    };
  else if (typeof MessageChannel != "undefined") {
    var q = new MessageChannel(), re = q.port2;
    q.port1.onmessage = F, B = function() {
      re.postMessage(null);
    };
  } else
    B = function() {
      S(F, 0);
    };
  function te(U) {
    A = U, b || (b = !0, B());
  }
  function fe(U, V) {
    T = S(function() {
      U(e.unstable_now());
    }, V);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
    U.callback = null;
  }, e.unstable_continueExecution = function() {
    h || p || (h = !0, te(O));
  }, e.unstable_forceFrameRate = function(U) {
    0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < U ? Math.floor(1e3 / U) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(U) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var V = 3;
        break;
      default:
        V = d;
    }
    var $ = d;
    d = V;
    try {
      return U();
    } finally {
      d = $;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(U, V) {
    switch (U) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        U = 3;
    }
    var $ = d;
    d = U;
    try {
      return V();
    } finally {
      d = $;
    }
  }, e.unstable_scheduleCallback = function(U, V, $) {
    var x = e.unstable_now();
    switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? x + $ : x) : $ = x, U) {
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
    return C = $ + C, U = { id: c++, callback: V, priorityLevel: U, startTime: $, expirationTime: C, sortIndex: -1 }, $ > x ? (U.sortIndex = $, t(u, U), n(s) === null && U === n(u) && (m ? (g(T), T = -1) : m = !0, fe(E, $ - x))) : (U.sortIndex = C, t(s, U), h || p || (h = !0, te(O))), U;
  }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(U) {
    var V = d;
    return function() {
      var $ = d;
      d = V;
      try {
        return U.apply(this, arguments);
      } finally {
        d = $;
      }
    };
  };
})(tw);
(function(e) {
  e.exports = tw;
})(Px);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nw = J, nn = ep;
function z(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var rw = /* @__PURE__ */ new Set(), xl = {};
function Ki(e, t) {
  zo(e, t), zo(e + "Capture", t);
}
function zo(e, t) {
  for (xl[e] = t, e = 0; e < t.length; e++)
    rw.add(t[e]);
}
var kr = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), tp = Object.prototype.hasOwnProperty, _x = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Kg = {}, Xg = {};
function Nx(e) {
  return tp.call(Xg, e) ? !0 : tp.call(Kg, e) ? !1 : _x.test(e) ? Xg[e] = !0 : (Kg[e] = !0, !1);
}
function Dx(e, t, n, r) {
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
function Rx(e, t, n, r) {
  if (t === null || typeof t == "undefined" || Dx(e, t, n, r))
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
function Pt(e, t, n, r, i, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var ht = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ht[e] = new Pt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ht[t] = new Pt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ht[e] = new Pt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ht[e] = new Pt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ht[e] = new Pt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ht[e] = new Pt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ht[e] = new Pt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ht[e] = new Pt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ht[e] = new Pt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Hh = /[\-:]([a-z])/g;
function Jh(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Hh,
    Jh
  );
  ht[t] = new Pt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Hh, Jh);
  ht[t] = new Pt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Hh, Jh);
  ht[t] = new Pt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ht[e] = new Pt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ht.xlinkHref = new Pt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ht[e] = new Pt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Qh(e, t, n, r) {
  var i = ht.hasOwnProperty(t) ? ht[t] : null;
  (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Rx(t, n, i, r) && (n = null), r || i === null ? Nx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Dr = nw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ns = Symbol.for("react.element"), ho = Symbol.for("react.portal"), mo = Symbol.for("react.fragment"), Kh = Symbol.for("react.strict_mode"), np = Symbol.for("react.profiler"), iw = Symbol.for("react.provider"), ow = Symbol.for("react.context"), Xh = Symbol.for("react.forward_ref"), rp = Symbol.for("react.suspense"), ip = Symbol.for("react.suspense_list"), qh = Symbol.for("react.memo"), Br = Symbol.for("react.lazy"), aw = Symbol.for("react.offscreen"), qg = Symbol.iterator;
function xa(e) {
  return e === null || typeof e != "object" ? null : (e = qg && e[qg] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ze = Object.assign, zf;
function $a(e) {
  if (zf === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      zf = t && t[1] || "";
    }
  return `
` + zf + e;
}
var Wf = !1;
function jf(e, t) {
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
  return (e = e ? e.displayName || e.name : "") ? $a(e) : "";
}
function Lx(e) {
  switch (e.tag) {
    case 5:
      return $a(e.type);
    case 16:
      return $a("Lazy");
    case 13:
      return $a("Suspense");
    case 19:
      return $a("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = jf(e.type, !1), e;
    case 11:
      return e = jf(e.type.render, !1), e;
    case 1:
      return e = jf(e.type, !0), e;
    default:
      return "";
  }
}
function op(e) {
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
    case np:
      return "Profiler";
    case Kh:
      return "StrictMode";
    case rp:
      return "Suspense";
    case ip:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case ow:
        return (e.displayName || "Context") + ".Consumer";
      case iw:
        return (e._context.displayName || "Context") + ".Provider";
      case Xh:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case qh:
        return t = e.displayName || null, t !== null ? t : op(e.type) || "Memo";
      case Br:
        t = e._payload, e = e._init;
        try {
          return op(e(t));
        } catch (n) {
        }
    }
  return null;
}
function Fx(e) {
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
      return op(t);
    case 8:
      return t === Kh ? "StrictMode" : "Mode";
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
function ui(e) {
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
function lw(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Mx(e) {
  var t = lw(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function Ds(e) {
  e._valueTracker || (e._valueTracker = Mx(e));
}
function sw(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = lw(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ou(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined")
    return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function ap(e, t) {
  var n = t.checked;
  return ze({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function Zg(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ui(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function uw(e, t) {
  t = t.checked, t != null && Qh(e, "checked", t, !1);
}
function lp(e, t) {
  uw(e, t);
  var n = ui(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? sp(e, t.type, n) : t.hasOwnProperty("defaultValue") && sp(e, t.type, ui(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ev(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function sp(e, t, n) {
  (t !== "number" || Ou(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ha = Array.isArray;
function Oo(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var i = 0; i < n.length; i++)
      t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ui(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        e[i].selected = !0, r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function up(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(z(91));
  return ze({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function tv(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(z(92));
      if (Ha(n)) {
        if (1 < n.length)
          throw Error(z(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ui(n) };
}
function cw(e, t) {
  var n = ui(t.value), r = ui(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function nv(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function fw(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function cp(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? fw(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Rs, dw = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, i);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (Rs = Rs || document.createElement("div"), Rs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Rs.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function kl(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var il = {
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
}, Bx = ["Webkit", "ms", "Moz", "O"];
Object.keys(il).forEach(function(e) {
  Bx.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), il[t] = il[e];
  });
});
function pw(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || il.hasOwnProperty(e) && il[e] ? ("" + t).trim() : t + "px";
}
function hw(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = pw(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
}
var Ux = ze({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fp(e, t) {
  if (t) {
    if (Ux[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function dp(e, t) {
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
var pp = null;
function Zh(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var hp = null, To = null, Io = null;
function rv(e) {
  if (e = ns(e)) {
    if (typeof hp != "function")
      throw Error(z(280));
    var t = e.stateNode;
    t && (t = Cc(t), hp(e.stateNode, e.type, t));
  }
}
function mw(e) {
  To ? Io ? Io.push(e) : Io = [e] : To = e;
}
function gw() {
  if (To) {
    var e = To, t = Io;
    if (Io = To = null, rv(e), t)
      for (e = 0; e < t.length; e++)
        rv(t[e]);
  }
}
function vw(e, t) {
  return e(t);
}
function yw() {
}
var Yf = !1;
function ww(e, t, n) {
  if (Yf)
    return e(t, n);
  Yf = !0;
  try {
    return vw(e, t, n);
  } finally {
    Yf = !1, (To !== null || Io !== null) && (yw(), gw());
  }
}
function Ol(e, t) {
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
var mp = !1;
if (kr)
  try {
    var ka = {};
    Object.defineProperty(ka, "passive", { get: function() {
      mp = !0;
    } }), window.addEventListener("test", ka, ka), window.removeEventListener("test", ka, ka);
  } catch (e) {
    mp = !1;
  }
function zx(e, t, n, r, i, o, a, l, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var ol = !1, Tu = null, Iu = !1, gp = null, Wx = { onError: function(e) {
  ol = !0, Tu = e;
} };
function jx(e, t, n, r, i, o, a, l, s) {
  ol = !1, Tu = null, zx.apply(Wx, arguments);
}
function Yx(e, t, n, r, i, o, a, l, s) {
  if (jx.apply(this, arguments), ol) {
    if (ol) {
      var u = Tu;
      ol = !1, Tu = null;
    } else
      throw Error(z(198));
    Iu || (Iu = !0, gp = u);
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
function bw(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function iv(e) {
  if (Xi(e) !== e)
    throw Error(z(188));
}
function Vx(e) {
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
          return iv(i), e;
        if (o === r)
          return iv(i), t;
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
function Sw(e) {
  return e = Vx(e), e !== null ? Ew(e) : null;
}
function Ew(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Ew(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var Aw = nn.unstable_scheduleCallback, ov = nn.unstable_cancelCallback, Gx = nn.unstable_shouldYield, $x = nn.unstable_requestPaint, Je = nn.unstable_now, Hx = nn.unstable_getCurrentPriorityLevel, em = nn.unstable_ImmediatePriority, Cw = nn.unstable_UserBlockingPriority, Pu = nn.unstable_NormalPriority, Jx = nn.unstable_LowPriority, xw = nn.unstable_IdlePriority, bc = null, tr = null;
function Qx(e) {
  if (tr && typeof tr.onCommitFiberRoot == "function")
    try {
      tr.onCommitFiberRoot(bc, e, void 0, (e.current.flags & 128) === 128);
    } catch (t) {
    }
}
var zn = Math.clz32 ? Math.clz32 : qx, Kx = Math.log, Xx = Math.LN2;
function qx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Kx(e) / Xx | 0) | 0;
}
var Ls = 64, Fs = 4194304;
function Ja(e) {
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
    l !== 0 ? r = Ja(l) : (o &= a, o !== 0 && (r = Ja(o)));
  } else
    a = n & ~i, a !== 0 ? r = Ja(a) : o !== 0 && (r = Ja(o));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - zn(t), i = 1 << n, r |= e[n], t &= ~i;
  return r;
}
function Zx(e, t) {
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
function e2(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - zn(o), l = 1 << a, s = i[a];
    s === -1 ? (!(l & n) || l & r) && (i[a] = Zx(l, t)) : s <= t && (e.expiredLanes |= l), o &= ~l;
  }
}
function vp(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function kw() {
  var e = Ls;
  return Ls <<= 1, !(Ls & 4194240) && (Ls = 64), e;
}
function Vf(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function es(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - zn(t), e[t] = n;
}
function t2(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - zn(n), o = 1 << i;
    t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
  }
}
function tm(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - zn(n), i = 1 << r;
    i & t | e[r] & t && (e[r] |= t), n &= ~i;
  }
}
var ye = 0;
function Ow(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Tw, nm, Iw, Pw, _w, yp = !1, Ms = [], Xr = null, qr = null, Zr = null, Tl = /* @__PURE__ */ new Map(), Il = /* @__PURE__ */ new Map(), Wr = [], n2 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function av(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Xr = null;
      break;
    case "dragenter":
    case "dragleave":
      qr = null;
      break;
    case "mouseover":
    case "mouseout":
      Zr = null;
      break;
    case "pointerover":
    case "pointerout":
      Tl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Il.delete(t.pointerId);
  }
}
function Oa(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = ns(t), t !== null && nm(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
}
function r2(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return Xr = Oa(Xr, e, t, n, r, i), !0;
    case "dragenter":
      return qr = Oa(qr, e, t, n, r, i), !0;
    case "mouseover":
      return Zr = Oa(Zr, e, t, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return Tl.set(o, Oa(Tl.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, Il.set(o, Oa(Il.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function Nw(e) {
  var t = Di(e.target);
  if (t !== null) {
    var n = Xi(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = bw(n), t !== null) {
          e.blockedOn = t, _w(e.priority, function() {
            Iw(n);
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
function lu(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = wp(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      pp = r, n.target.dispatchEvent(r), pp = null;
    } else
      return t = ns(n), t !== null && nm(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function lv(e, t, n) {
  lu(e) && n.delete(t);
}
function i2() {
  yp = !1, Xr !== null && lu(Xr) && (Xr = null), qr !== null && lu(qr) && (qr = null), Zr !== null && lu(Zr) && (Zr = null), Tl.forEach(lv), Il.forEach(lv);
}
function Ta(e, t) {
  e.blockedOn === t && (e.blockedOn = null, yp || (yp = !0, nn.unstable_scheduleCallback(nn.unstable_NormalPriority, i2)));
}
function Pl(e) {
  function t(i) {
    return Ta(i, e);
  }
  if (0 < Ms.length) {
    Ta(Ms[0], e);
    for (var n = 1; n < Ms.length; n++) {
      var r = Ms[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Xr !== null && Ta(Xr, e), qr !== null && Ta(qr, e), Zr !== null && Ta(Zr, e), Tl.forEach(t), Il.forEach(t), n = 0; n < Wr.length; n++)
    r = Wr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Wr.length && (n = Wr[0], n.blockedOn === null); )
    Nw(n), n.blockedOn === null && Wr.shift();
}
var Po = Dr.ReactCurrentBatchConfig, Nu = !0;
function o2(e, t, n, r) {
  var i = ye, o = Po.transition;
  Po.transition = null;
  try {
    ye = 1, rm(e, t, n, r);
  } finally {
    ye = i, Po.transition = o;
  }
}
function a2(e, t, n, r) {
  var i = ye, o = Po.transition;
  Po.transition = null;
  try {
    ye = 4, rm(e, t, n, r);
  } finally {
    ye = i, Po.transition = o;
  }
}
function rm(e, t, n, r) {
  if (Nu) {
    var i = wp(e, t, n, r);
    if (i === null)
      ed(e, t, r, Du, n), av(e, r);
    else if (r2(i, e, t, n, r))
      r.stopPropagation();
    else if (av(e, r), t & 4 && -1 < n2.indexOf(e)) {
      for (; i !== null; ) {
        var o = ns(i);
        if (o !== null && Tw(o), o = wp(e, t, n, r), o === null && ed(e, t, r, Du, n), o === i)
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else
      ed(e, t, r, null, n);
  }
}
var Du = null;
function wp(e, t, n, r) {
  if (Du = null, e = Zh(r), e = Di(e), e !== null)
    if (t = Xi(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = bw(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Du = e, null;
}
function Dw(e) {
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
      switch (Hx()) {
        case em:
          return 1;
        case Cw:
          return 4;
        case Pu:
        case Jx:
          return 16;
        case xw:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Jr = null, im = null, su = null;
function Rw() {
  if (su)
    return su;
  var e, t = im, n = t.length, r, i = "value" in Jr ? Jr.value : Jr.textContent, o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++)
    ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === i[o - r]; r++)
    ;
  return su = i.slice(e, 1 < r ? 1 - r : void 0);
}
function uu(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Bs() {
  return !0;
}
function sv() {
  return !1;
}
function ln(e) {
  function t(n, r, i, o, a) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var l in e)
      e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Bs : sv, this.isPropagationStopped = sv, this;
  }
  return ze(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Bs);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Bs);
  }, persist: function() {
  }, isPersistent: Bs }), t;
}
var aa = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, om = ln(aa), ts = ze({}, aa, { view: 0, detail: 0 }), l2 = ln(ts), Gf, $f, Ia, Sc = ze({}, ts, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: am, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Ia && (Ia && e.type === "mousemove" ? (Gf = e.screenX - Ia.screenX, $f = e.screenY - Ia.screenY) : $f = Gf = 0, Ia = e), Gf);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : $f;
} }), uv = ln(Sc), s2 = ze({}, Sc, { dataTransfer: 0 }), u2 = ln(s2), c2 = ze({}, ts, { relatedTarget: 0 }), Hf = ln(c2), f2 = ze({}, aa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), d2 = ln(f2), p2 = ze({}, aa, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), h2 = ln(p2), m2 = ze({}, aa, { data: 0 }), cv = ln(m2), g2 = {
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
}, v2 = {
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
}, y2 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function w2(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = y2[e]) ? !!t[e] : !1;
}
function am() {
  return w2;
}
var b2 = ze({}, ts, { key: function(e) {
  if (e.key) {
    var t = g2[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = uu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? v2[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: am, charCode: function(e) {
  return e.type === "keypress" ? uu(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? uu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), S2 = ln(b2), E2 = ze({}, Sc, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), fv = ln(E2), A2 = ze({}, ts, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: am }), C2 = ln(A2), x2 = ze({}, aa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), k2 = ln(x2), O2 = ze({}, Sc, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), T2 = ln(O2), I2 = [9, 13, 27, 32], lm = kr && "CompositionEvent" in window, al = null;
kr && "documentMode" in document && (al = document.documentMode);
var P2 = kr && "TextEvent" in window && !al, Lw = kr && (!lm || al && 8 < al && 11 >= al), dv = String.fromCharCode(32), pv = !1;
function Fw(e, t) {
  switch (e) {
    case "keyup":
      return I2.indexOf(t.keyCode) !== -1;
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
function Mw(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var go = !1;
function _2(e, t) {
  switch (e) {
    case "compositionend":
      return Mw(t);
    case "keypress":
      return t.which !== 32 ? null : (pv = !0, dv);
    case "textInput":
      return e = t.data, e === dv && pv ? null : e;
    default:
      return null;
  }
}
function N2(e, t) {
  if (go)
    return e === "compositionend" || !lm && Fw(e, t) ? (e = Rw(), su = im = Jr = null, go = !1, e) : null;
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
      return Lw && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var D2 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function hv(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!D2[e.type] : t === "textarea";
}
function Bw(e, t, n, r) {
  mw(r), t = Ru(t, "onChange"), 0 < t.length && (n = new om("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ll = null, _l = null;
function R2(e) {
  Qw(e, 0);
}
function Ec(e) {
  var t = wo(e);
  if (sw(t))
    return e;
}
function L2(e, t) {
  if (e === "change")
    return t;
}
var Uw = !1;
if (kr) {
  var Jf;
  if (kr) {
    var Qf = "oninput" in document;
    if (!Qf) {
      var mv = document.createElement("div");
      mv.setAttribute("oninput", "return;"), Qf = typeof mv.oninput == "function";
    }
    Jf = Qf;
  } else
    Jf = !1;
  Uw = Jf && (!document.documentMode || 9 < document.documentMode);
}
function gv() {
  ll && (ll.detachEvent("onpropertychange", zw), _l = ll = null);
}
function zw(e) {
  if (e.propertyName === "value" && Ec(_l)) {
    var t = [];
    Bw(t, _l, e, Zh(e)), ww(R2, t);
  }
}
function F2(e, t, n) {
  e === "focusin" ? (gv(), ll = t, _l = n, ll.attachEvent("onpropertychange", zw)) : e === "focusout" && gv();
}
function M2(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ec(_l);
}
function B2(e, t) {
  if (e === "click")
    return Ec(t);
}
function U2(e, t) {
  if (e === "input" || e === "change")
    return Ec(t);
}
function z2(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var jn = typeof Object.is == "function" ? Object.is : z2;
function Nl(e, t) {
  if (jn(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!tp.call(t, i) || !jn(e[i], t[i]))
      return !1;
  }
  return !0;
}
function vv(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function yv(e, t) {
  var n = vv(e);
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
    n = vv(n);
  }
}
function Ww(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ww(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function jw() {
  for (var e = window, t = Ou(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Ou(e.document);
  }
  return t;
}
function sm(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function W2(e) {
  var t = jw(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Ww(n.ownerDocument.documentElement, n)) {
    if (r !== null && sm(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = yv(n, o);
        var a = yv(
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
var j2 = kr && "documentMode" in document && 11 >= document.documentMode, vo = null, bp = null, sl = null, Sp = !1;
function wv(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Sp || vo == null || vo !== Ou(r) || (r = vo, "selectionStart" in r && sm(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), sl && Nl(sl, r) || (sl = r, r = Ru(bp, "onSelect"), 0 < r.length && (t = new om("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = vo)));
}
function Us(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var yo = { animationend: Us("Animation", "AnimationEnd"), animationiteration: Us("Animation", "AnimationIteration"), animationstart: Us("Animation", "AnimationStart"), transitionend: Us("Transition", "TransitionEnd") }, Kf = {}, Yw = {};
kr && (Yw = document.createElement("div").style, "AnimationEvent" in window || (delete yo.animationend.animation, delete yo.animationiteration.animation, delete yo.animationstart.animation), "TransitionEvent" in window || delete yo.transitionend.transition);
function Ac(e) {
  if (Kf[e])
    return Kf[e];
  if (!yo[e])
    return e;
  var t = yo[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Yw)
      return Kf[e] = t[n];
  return e;
}
var Vw = Ac("animationend"), Gw = Ac("animationiteration"), $w = Ac("animationstart"), Hw = Ac("transitionend"), Jw = /* @__PURE__ */ new Map(), bv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mi(e, t) {
  Jw.set(e, t), Ki(t, [e]);
}
for (var Xf = 0; Xf < bv.length; Xf++) {
  var qf = bv[Xf], Y2 = qf.toLowerCase(), V2 = qf[0].toUpperCase() + qf.slice(1);
  mi(Y2, "on" + V2);
}
mi(Vw, "onAnimationEnd");
mi(Gw, "onAnimationIteration");
mi($w, "onAnimationStart");
mi("dblclick", "onDoubleClick");
mi("focusin", "onFocus");
mi("focusout", "onBlur");
mi(Hw, "onTransitionEnd");
zo("onMouseEnter", ["mouseout", "mouseover"]);
zo("onMouseLeave", ["mouseout", "mouseover"]);
zo("onPointerEnter", ["pointerout", "pointerover"]);
zo("onPointerLeave", ["pointerout", "pointerover"]);
Ki("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ki("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ki("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ki("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ki("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ki("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Qa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), G2 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qa));
function Sv(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Yx(r, t, void 0, e), e.currentTarget = null;
}
function Qw(e, t) {
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
          Sv(i, l, u), o = s;
        }
      else
        for (a = 0; a < r.length; a++) {
          if (l = r[a], s = l.instance, u = l.currentTarget, l = l.listener, s !== o && i.isPropagationStopped())
            break e;
          Sv(i, l, u), o = s;
        }
    }
  }
  if (Iu)
    throw e = gp, Iu = !1, gp = null, e;
}
function Oe(e, t) {
  var n = t[kp];
  n === void 0 && (n = t[kp] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Kw(t, e, 2, !1), n.add(r));
}
function Zf(e, t, n) {
  var r = 0;
  t && (r |= 4), Kw(n, e, r, t);
}
var zs = "_reactListening" + Math.random().toString(36).slice(2);
function Dl(e) {
  if (!e[zs]) {
    e[zs] = !0, rw.forEach(function(n) {
      n !== "selectionchange" && (G2.has(n) || Zf(n, !1, e), Zf(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[zs] || (t[zs] = !0, Zf("selectionchange", !1, t));
  }
}
function Kw(e, t, n, r) {
  switch (Dw(t)) {
    case 1:
      var i = o2;
      break;
    case 4:
      i = a2;
      break;
    default:
      i = rm;
  }
  n = i.bind(null, t, n, e), i = void 0, !mp || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
}
function ed(e, t, n, r, i) {
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
            if (a = Di(l), a === null)
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
  ww(function() {
    var u = o, c = Zh(n), f = [];
    e: {
      var d = Jw.get(e);
      if (d !== void 0) {
        var p = om, h = e;
        switch (e) {
          case "keypress":
            if (uu(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            p = S2;
            break;
          case "focusin":
            h = "focus", p = Hf;
            break;
          case "focusout":
            h = "blur", p = Hf;
            break;
          case "beforeblur":
          case "afterblur":
            p = Hf;
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
            p = uv;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = u2;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = C2;
            break;
          case Vw:
          case Gw:
          case $w:
            p = d2;
            break;
          case Hw:
            p = k2;
            break;
          case "scroll":
            p = l2;
            break;
          case "wheel":
            p = T2;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = h2;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = fv;
        }
        var m = (t & 4) !== 0, S = !m && e === "scroll", g = m ? d !== null ? d + "Capture" : null : d;
        m = [];
        for (var v = u, w; v !== null; ) {
          w = v;
          var E = w.stateNode;
          if (w.tag === 5 && E !== null && (w = E, g !== null && (E = Ol(v, g), E != null && m.push(Rl(v, E, w)))), S)
            break;
          v = v.return;
        }
        0 < m.length && (d = new p(d, h, null, n, c), f.push({ event: d, listeners: m }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", d && n !== pp && (h = n.relatedTarget || n.fromElement) && (Di(h) || h[Or]))
          break e;
        if ((p || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, p ? (h = n.relatedTarget || n.toElement, p = u, h = h ? Di(h) : null, h !== null && (S = Xi(h), h !== S || h.tag !== 5 && h.tag !== 6) && (h = null)) : (p = null, h = u), p !== h)) {
          if (m = uv, E = "onMouseLeave", g = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (m = fv, E = "onPointerLeave", g = "onPointerEnter", v = "pointer"), S = p == null ? d : wo(p), w = h == null ? d : wo(h), d = new m(E, v + "leave", p, n, c), d.target = S, d.relatedTarget = w, E = null, Di(c) === u && (m = new m(g, v + "enter", h, n, c), m.target = w, m.relatedTarget = S, E = m), S = E, p && h)
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
          p !== null && Ev(f, d, p, m, !1), h !== null && S !== null && Ev(f, S, h, m, !0);
        }
      }
      e: {
        if (d = u ? wo(u) : window, p = d.nodeName && d.nodeName.toLowerCase(), p === "select" || p === "input" && d.type === "file")
          var O = L2;
        else if (hv(d))
          if (Uw)
            O = U2;
          else {
            O = M2;
            var b = F2;
          }
        else
          (p = d.nodeName) && p.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (O = B2);
        if (O && (O = O(e, u))) {
          Bw(f, O, n, c);
          break e;
        }
        b && b(e, d, u), e === "focusout" && (b = d._wrapperState) && b.controlled && d.type === "number" && sp(d, "number", d.value);
      }
      switch (b = u ? wo(u) : window, e) {
        case "focusin":
          (hv(b) || b.contentEditable === "true") && (vo = b, bp = u, sl = null);
          break;
        case "focusout":
          sl = bp = vo = null;
          break;
        case "mousedown":
          Sp = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Sp = !1, wv(f, n, c);
          break;
        case "selectionchange":
          if (j2)
            break;
        case "keydown":
        case "keyup":
          wv(f, n, c);
      }
      var A;
      if (lm)
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
        go ? Fw(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Lw && n.locale !== "ko" && (go || T !== "onCompositionStart" ? T === "onCompositionEnd" && go && (A = Rw()) : (Jr = c, im = "value" in Jr ? Jr.value : Jr.textContent, go = !0)), b = Ru(u, T), 0 < b.length && (T = new cv(T, e, null, n, c), f.push({ event: T, listeners: b }), A ? T.data = A : (A = Mw(n), A !== null && (T.data = A)))), (A = P2 ? _2(e, n) : N2(e, n)) && (u = Ru(u, "onBeforeInput"), 0 < u.length && (c = new cv("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = A));
    }
    Qw(f, t);
  });
}
function Rl(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ru(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = Ol(e, n), o != null && r.unshift(Rl(e, o, i)), o = Ol(e, t), o != null && r.push(Rl(e, o, i))), e = e.return;
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
function Ev(e, t, n, r, i) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var l = n, s = l.alternate, u = l.stateNode;
    if (s !== null && s === r)
      break;
    l.tag === 5 && u !== null && (l = u, i ? (s = Ol(n, o), s != null && a.unshift(Rl(n, s, l))) : i || (s = Ol(n, o), s != null && a.push(Rl(n, s, l)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var $2 = /\r\n?/g, H2 = /\u0000|\uFFFD/g;
function Av(e) {
  return (typeof e == "string" ? e : "" + e).replace($2, `
`).replace(H2, "");
}
function Ws(e, t, n) {
  if (t = Av(t), Av(e) !== t && n)
    throw Error(z(425));
}
function Lu() {
}
var Ep = null, Ap = null;
function Cp(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var xp = typeof setTimeout == "function" ? setTimeout : void 0, J2 = typeof clearTimeout == "function" ? clearTimeout : void 0, Cv = typeof Promise == "function" ? Promise : void 0, Q2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cv != "undefined" ? function(e) {
  return Cv.resolve(null).then(e).catch(K2);
} : xp;
function K2(e) {
  setTimeout(function() {
    throw e;
  });
}
function td(e, t) {
  var n = t, r = 0;
  do {
    var i = n.nextSibling;
    if (e.removeChild(n), i && i.nodeType === 8)
      if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), Pl(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  Pl(t);
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
function xv(e) {
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
var la = Math.random().toString(36).slice(2), Xn = "__reactFiber$" + la, Ll = "__reactProps$" + la, Or = "__reactContainer$" + la, kp = "__reactEvents$" + la, X2 = "__reactListeners$" + la, q2 = "__reactHandles$" + la;
function Di(e) {
  var t = e[Xn];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Or] || n[Xn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = xv(e); e !== null; ) {
          if (n = e[Xn])
            return n;
          e = xv(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ns(e) {
  return e = e[Xn] || e[Or], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function wo(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(z(33));
}
function Cc(e) {
  return e[Ll] || null;
}
var Op = [], bo = -1;
function gi(e) {
  return { current: e };
}
function Ie(e) {
  0 > bo || (e.current = Op[bo], Op[bo] = null, bo--);
}
function xe(e, t) {
  bo++, Op[bo] = e.current, e.current = t;
}
var ci = {}, At = gi(ci), Ut = gi(!1), ji = ci;
function Wo(e, t) {
  var n = e.type.contextTypes;
  if (!n)
    return ci;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in n)
    i[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
}
function zt(e) {
  return e = e.childContextTypes, e != null;
}
function Fu() {
  Ie(Ut), Ie(At);
}
function kv(e, t, n) {
  if (At.current !== ci)
    throw Error(z(168));
  xe(At, t), xe(Ut, n);
}
function Xw(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in t))
      throw Error(z(108, Fx(e) || "Unknown", i));
  return ze({}, n, r);
}
function Mu(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ci, ji = At.current, xe(At, e), xe(Ut, Ut.current), !0;
}
function Ov(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(z(169));
  n ? (e = Xw(e, t, ji), r.__reactInternalMemoizedMergedChildContext = e, Ie(Ut), Ie(At), xe(At, e)) : Ie(Ut), xe(Ut, n);
}
var gr = null, xc = !1, nd = !1;
function qw(e) {
  gr === null ? gr = [e] : gr.push(e);
}
function Z2(e) {
  xc = !0, qw(e);
}
function vi() {
  if (!nd && gr !== null) {
    nd = !0;
    var e = 0, t = ye;
    try {
      var n = gr;
      for (ye = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      gr = null, xc = !1;
    } catch (i) {
      throw gr !== null && (gr = gr.slice(e + 1)), Aw(em, vi), i;
    } finally {
      ye = t, nd = !1;
    }
  }
  return null;
}
var So = [], Eo = 0, Bu = null, Uu = 0, fn = [], dn = 0, Yi = null, br = 1, Sr = "";
function Ti(e, t) {
  So[Eo++] = Uu, So[Eo++] = Bu, Bu = e, Uu = t;
}
function Zw(e, t, n) {
  fn[dn++] = br, fn[dn++] = Sr, fn[dn++] = Yi, Yi = e;
  var r = br;
  e = Sr;
  var i = 32 - zn(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - zn(t) + i;
  if (30 < o) {
    var a = i - i % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, i -= a, br = 1 << 32 - zn(t) + i | n << i | r, Sr = o + e;
  } else
    br = 1 << o | n << i | r, Sr = e;
}
function um(e) {
  e.return !== null && (Ti(e, 1), Zw(e, 1, 0));
}
function cm(e) {
  for (; e === Bu; )
    Bu = So[--Eo], So[Eo] = null, Uu = So[--Eo], So[Eo] = null;
  for (; e === Yi; )
    Yi = fn[--dn], fn[dn] = null, Sr = fn[--dn], fn[dn] = null, br = fn[--dn], fn[dn] = null;
}
var tn = null, qt = null, Re = !1, Bn = null;
function eb(e, t) {
  var n = hn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Tv(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, tn = e, qt = ei(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, tn = e, qt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Yi !== null ? { id: br, overflow: Sr } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = hn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, tn = e, qt = null, !0) : !1;
    default:
      return !1;
  }
}
function Tp(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ip(e) {
  if (Re) {
    var t = qt;
    if (t) {
      var n = t;
      if (!Tv(e, t)) {
        if (Tp(e))
          throw Error(z(418));
        t = ei(n.nextSibling);
        var r = tn;
        t && Tv(e, t) ? eb(r, n) : (e.flags = e.flags & -4097 | 2, Re = !1, tn = e);
      }
    } else {
      if (Tp(e))
        throw Error(z(418));
      e.flags = e.flags & -4097 | 2, Re = !1, tn = e;
    }
  }
}
function Iv(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  tn = e;
}
function js(e) {
  if (e !== tn)
    return !1;
  if (!Re)
    return Iv(e), Re = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Cp(e.type, e.memoizedProps)), t && (t = qt)) {
    if (Tp(e))
      throw tb(), Error(z(418));
    for (; t; )
      eb(e, t), t = ei(t.nextSibling);
  }
  if (Iv(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(z(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              qt = ei(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      qt = null;
    }
  } else
    qt = tn ? ei(e.stateNode.nextSibling) : null;
  return !0;
}
function tb() {
  for (var e = qt; e; )
    e = ei(e.nextSibling);
}
function jo() {
  qt = tn = null, Re = !1;
}
function fm(e) {
  Bn === null ? Bn = [e] : Bn.push(e);
}
var ek = Dr.ReactCurrentBatchConfig;
function Ln(e, t) {
  if (e && e.defaultProps) {
    t = ze({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var zu = gi(null), Wu = null, Ao = null, dm = null;
function pm() {
  dm = Ao = Wu = null;
}
function hm(e) {
  var t = zu.current;
  Ie(zu), e._currentValue = t;
}
function Pp(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function _o(e, t) {
  Wu = e, dm = Ao = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Mt = !0), e.firstContext = null);
}
function wn(e) {
  var t = e._currentValue;
  if (dm !== e)
    if (e = { context: e, memoizedValue: t, next: null }, Ao === null) {
      if (Wu === null)
        throw Error(z(308));
      Ao = e, Wu.dependencies = { lanes: 0, firstContext: e };
    } else
      Ao = Ao.next = e;
  return t;
}
var Ri = null;
function mm(e) {
  Ri === null ? Ri = [e] : Ri.push(e);
}
function nb(e, t, n, r) {
  var i = t.interleaved;
  return i === null ? (n.next = n, mm(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Tr(e, r);
}
function Tr(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ur = !1;
function gm(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function rb(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ar(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ti(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, ve & 2) {
    var i = r.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Tr(e, n);
  }
  return i = r.interleaved, i === null ? (t.next = t, mm(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Tr(e, n);
}
function cu(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tm(e, n);
  }
}
function Pv(e, t) {
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
function ju(e, t, n, r) {
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
              f = ze({}, f, d);
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
    Gi |= a, e.lanes = a, e.memoizedState = f;
  }
}
function _v(e, t, n) {
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
var ib = new nw.Component().refs;
function _p(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ze({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var kc = { isMounted: function(e) {
  return (e = e._reactInternals) ? Xi(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Tt(), i = ri(e), o = Ar(r, i);
  o.payload = t, n != null && (o.callback = n), t = ti(e, o, i), t !== null && (Wn(t, e, i, r), cu(t, e, i));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Tt(), i = ri(e), o = Ar(r, i);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ti(e, o, i), t !== null && (Wn(t, e, i, r), cu(t, e, i));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Tt(), r = ri(e), i = Ar(n, r);
  i.tag = 2, t != null && (i.callback = t), t = ti(e, i, r), t !== null && (Wn(t, e, r, n), cu(t, e, r));
} };
function Nv(e, t, n, r, i, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Nl(n, r) || !Nl(i, o) : !0;
}
function ob(e, t, n) {
  var r = !1, i = ci, o = t.contextType;
  return typeof o == "object" && o !== null ? o = wn(o) : (i = zt(t) ? ji : At.current, r = t.contextTypes, o = (r = r != null) ? Wo(e, i) : ci), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kc, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Dv(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kc.enqueueReplaceState(t, t.state, null);
}
function Np(e, t, n, r) {
  var i = e.stateNode;
  i.props = n, i.state = e.memoizedState, i.refs = ib, gm(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? i.context = wn(o) : (o = zt(t) ? ji : At.current, i.context = Wo(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (_p(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && kc.enqueueReplaceState(i, i.state, null), ju(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Pa(e, t, n) {
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
        l === ib && (l = i.refs = {}), a === null ? delete l[o] : l[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string")
      throw Error(z(284));
    if (!n._owner)
      throw Error(z(290, e));
  }
  return e;
}
function Ys(e, t) {
  throw e = Object.prototype.toString.call(t), Error(z(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Rv(e) {
  var t = e._init;
  return t(e._payload);
}
function ab(e) {
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
    return v === null || v.tag !== 6 ? (v = ud(w, g.mode, E), v.return = g, v) : (v = i(v, w), v.return = g, v);
  }
  function s(g, v, w, E) {
    var O = w.type;
    return O === mo ? c(g, v, w.props.children, E, w.key) : v !== null && (v.elementType === O || typeof O == "object" && O !== null && O.$$typeof === Br && Rv(O) === v.type) ? (E = i(v, w.props), E.ref = Pa(g, v, w), E.return = g, E) : (E = gu(w.type, w.key, w.props, null, g.mode, E), E.ref = Pa(g, v, w), E.return = g, E);
  }
  function u(g, v, w, E) {
    return v === null || v.tag !== 4 || v.stateNode.containerInfo !== w.containerInfo || v.stateNode.implementation !== w.implementation ? (v = cd(w, g.mode, E), v.return = g, v) : (v = i(v, w.children || []), v.return = g, v);
  }
  function c(g, v, w, E, O) {
    return v === null || v.tag !== 7 ? (v = Mi(w, g.mode, E, O), v.return = g, v) : (v = i(v, w), v.return = g, v);
  }
  function f(g, v, w) {
    if (typeof v == "string" && v !== "" || typeof v == "number")
      return v = ud("" + v, g.mode, w), v.return = g, v;
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Ns:
          return w = gu(v.type, v.key, v.props, null, g.mode, w), w.ref = Pa(g, null, v), w.return = g, w;
        case ho:
          return v = cd(v, g.mode, w), v.return = g, v;
        case Br:
          var E = v._init;
          return f(g, E(v._payload), w);
      }
      if (Ha(v) || xa(v))
        return v = Mi(v, g.mode, w, null), v.return = g, v;
      Ys(g, v);
    }
    return null;
  }
  function d(g, v, w, E) {
    var O = v !== null ? v.key : null;
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return O !== null ? null : l(g, v, "" + w, E);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Ns:
          return w.key === O ? s(g, v, w, E) : null;
        case ho:
          return w.key === O ? u(g, v, w, E) : null;
        case Br:
          return O = w._init, d(
            g,
            v,
            O(w._payload),
            E
          );
      }
      if (Ha(w) || xa(w))
        return O !== null ? null : c(g, v, w, E, null);
      Ys(g, w);
    }
    return null;
  }
  function p(g, v, w, E, O) {
    if (typeof E == "string" && E !== "" || typeof E == "number")
      return g = g.get(w) || null, l(v, g, "" + E, O);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Ns:
          return g = g.get(E.key === null ? w : E.key) || null, s(v, g, E, O);
        case ho:
          return g = g.get(E.key === null ? w : E.key) || null, u(v, g, E, O);
        case Br:
          var b = E._init;
          return p(g, v, w, b(E._payload), O);
      }
      if (Ha(E) || xa(E))
        return g = g.get(w) || null, c(v, g, E, O, null);
      Ys(v, E);
    }
    return null;
  }
  function h(g, v, w, E) {
    for (var O = null, b = null, A = v, T = v = 0, P = null; A !== null && T < w.length; T++) {
      A.index > T ? (P = A, A = null) : P = A.sibling;
      var _ = d(g, A, w[T], E);
      if (_ === null) {
        A === null && (A = P);
        break;
      }
      e && A && _.alternate === null && t(g, A), v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _, A = P;
    }
    if (T === w.length)
      return n(g, A), Re && Ti(g, T), O;
    if (A === null) {
      for (; T < w.length; T++)
        A = f(g, w[T], E), A !== null && (v = o(A, v, T), b === null ? O = A : b.sibling = A, b = A);
      return Re && Ti(g, T), O;
    }
    for (A = r(g, A); T < w.length; T++)
      P = p(A, g, T, w[T], E), P !== null && (e && P.alternate !== null && A.delete(P.key === null ? T : P.key), v = o(P, v, T), b === null ? O = P : b.sibling = P, b = P);
    return e && A.forEach(function(I) {
      return t(g, I);
    }), Re && Ti(g, T), O;
  }
  function m(g, v, w, E) {
    var O = xa(w);
    if (typeof O != "function")
      throw Error(z(150));
    if (w = O.call(w), w == null)
      throw Error(z(151));
    for (var b = O = null, A = v, T = v = 0, P = null, _ = w.next(); A !== null && !_.done; T++, _ = w.next()) {
      A.index > T ? (P = A, A = null) : P = A.sibling;
      var I = d(g, A, _.value, E);
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
      ), Re && Ti(g, T), O;
    if (A === null) {
      for (; !_.done; T++, _ = w.next())
        _ = f(g, _.value, E), _ !== null && (v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _);
      return Re && Ti(g, T), O;
    }
    for (A = r(g, A); !_.done; T++, _ = w.next())
      _ = p(A, g, T, _.value, E), _ !== null && (e && _.alternate !== null && A.delete(_.key === null ? T : _.key), v = o(_, v, T), b === null ? O = _ : b.sibling = _, b = _);
    return e && A.forEach(function(F) {
      return t(g, F);
    }), Re && Ti(g, T), O;
  }
  function S(g, v, w, E) {
    if (typeof w == "object" && w !== null && w.type === mo && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Ns:
          e: {
            for (var O = w.key, b = v; b !== null; ) {
              if (b.key === O) {
                if (O = w.type, O === mo) {
                  if (b.tag === 7) {
                    n(g, b.sibling), v = i(b, w.props.children), v.return = g, g = v;
                    break e;
                  }
                } else if (b.elementType === O || typeof O == "object" && O !== null && O.$$typeof === Br && Rv(O) === b.type) {
                  n(g, b.sibling), v = i(b, w.props), v.ref = Pa(g, b, w), v.return = g, g = v;
                  break e;
                }
                n(g, b);
                break;
              } else
                t(g, b);
              b = b.sibling;
            }
            w.type === mo ? (v = Mi(w.props.children, g.mode, E, w.key), v.return = g, g = v) : (E = gu(w.type, w.key, w.props, null, g.mode, E), E.ref = Pa(g, v, w), E.return = g, g = E);
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
            v = cd(w, g.mode, E), v.return = g, g = v;
          }
          return a(g);
        case Br:
          return b = w._init, S(g, v, b(w._payload), E);
      }
      if (Ha(w))
        return h(g, v, w, E);
      if (xa(w))
        return m(g, v, w, E);
      Ys(g, w);
    }
    return typeof w == "string" && w !== "" || typeof w == "number" ? (w = "" + w, v !== null && v.tag === 6 ? (n(g, v.sibling), v = i(v, w), v.return = g, g = v) : (n(g, v), v = ud(w, g.mode, E), v.return = g, g = v), a(g)) : n(g, v);
  }
  return S;
}
var Yo = ab(!0), lb = ab(!1), rs = {}, nr = gi(rs), Fl = gi(rs), Ml = gi(rs);
function Li(e) {
  if (e === rs)
    throw Error(z(174));
  return e;
}
function vm(e, t) {
  switch (xe(Ml, t), xe(Fl, e), xe(nr, rs), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : cp(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = cp(t, e);
  }
  Ie(nr), xe(nr, t);
}
function Vo() {
  Ie(nr), Ie(Fl), Ie(Ml);
}
function sb(e) {
  Li(Ml.current);
  var t = Li(nr.current), n = cp(t, e.type);
  t !== n && (xe(Fl, e), xe(nr, n));
}
function ym(e) {
  Fl.current === e && (Ie(nr), Ie(Fl));
}
var Me = gi(0);
function Yu(e) {
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
var rd = [];
function wm() {
  for (var e = 0; e < rd.length; e++)
    rd[e]._workInProgressVersionPrimary = null;
  rd.length = 0;
}
var fu = Dr.ReactCurrentDispatcher, id = Dr.ReactCurrentBatchConfig, Vi = 0, Ue = null, nt = null, lt = null, Vu = !1, ul = !1, Bl = 0, tk = 0;
function gt() {
  throw Error(z(321));
}
function bm(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!jn(e[n], t[n]))
      return !1;
  return !0;
}
function Sm(e, t, n, r, i, o) {
  if (Vi = o, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, fu.current = e === null || e.memoizedState === null ? ok : ak, e = n(r, i), ul) {
    o = 0;
    do {
      if (ul = !1, Bl = 0, 25 <= o)
        throw Error(z(301));
      o += 1, lt = nt = null, t.updateQueue = null, fu.current = lk, e = n(r, i);
    } while (ul);
  }
  if (fu.current = Gu, t = nt !== null && nt.next !== null, Vi = 0, lt = nt = Ue = null, Vu = !1, t)
    throw Error(z(300));
  return e;
}
function Em() {
  var e = Bl !== 0;
  return Bl = 0, e;
}
function Hn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return lt === null ? Ue.memoizedState = lt = e : lt = lt.next = e, lt;
}
function bn() {
  if (nt === null) {
    var e = Ue.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = nt.next;
  var t = lt === null ? Ue.memoizedState : lt.next;
  if (t !== null)
    lt = t, nt = e;
  else {
    if (e === null)
      throw Error(z(310));
    nt = e, e = { memoizedState: nt.memoizedState, baseState: nt.baseState, baseQueue: nt.baseQueue, queue: nt.queue, next: null }, lt === null ? Ue.memoizedState = lt = e : lt = lt.next = e;
  }
  return lt;
}
function Ul(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function od(e) {
  var t = bn(), n = t.queue;
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
      if ((Vi & c) === c)
        s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        s === null ? (l = s = f, a = r) : s = s.next = f, Ue.lanes |= c, Gi |= c;
      }
      u = u.next;
    } while (u !== null && u !== o);
    s === null ? a = r : s.next = l, jn(r, t.memoizedState) || (Mt = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    i = e;
    do
      o = i.lane, Ue.lanes |= o, Gi |= o, i = i.next;
    while (i !== e);
  } else
    i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ad(e) {
  var t = bn(), n = t.queue;
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
    jn(o, t.memoizedState) || (Mt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function ub() {
}
function cb(e, t) {
  var n = Ue, r = bn(), i = t(), o = !jn(r.memoizedState, i);
  if (o && (r.memoizedState = i, Mt = !0), r = r.queue, Am(pb.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || lt !== null && lt.memoizedState.tag & 1) {
    if (n.flags |= 2048, zl(9, db.bind(null, n, r, i, t), void 0, null), st === null)
      throw Error(z(349));
    Vi & 30 || fb(n, t, i);
  }
  return i;
}
function fb(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function db(e, t, n, r) {
  t.value = n, t.getSnapshot = r, hb(t) && mb(e);
}
function pb(e, t, n) {
  return n(function() {
    hb(t) && mb(e);
  });
}
function hb(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !jn(e, n);
  } catch (r) {
    return !0;
  }
}
function mb(e) {
  var t = Tr(e, 1);
  t !== null && Wn(t, e, 1, -1);
}
function Lv(e) {
  var t = Hn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ul, lastRenderedState: e }, t.queue = e, e = e.dispatch = ik.bind(null, Ue, e), [t.memoizedState, e];
}
function zl(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function gb() {
  return bn().memoizedState;
}
function du(e, t, n, r) {
  var i = Hn();
  Ue.flags |= e, i.memoizedState = zl(1 | t, n, void 0, r === void 0 ? null : r);
}
function Oc(e, t, n, r) {
  var i = bn();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (nt !== null) {
    var a = nt.memoizedState;
    if (o = a.destroy, r !== null && bm(r, a.deps)) {
      i.memoizedState = zl(t, n, o, r);
      return;
    }
  }
  Ue.flags |= e, i.memoizedState = zl(1 | t, n, o, r);
}
function Fv(e, t) {
  return du(8390656, 8, e, t);
}
function Am(e, t) {
  return Oc(2048, 8, e, t);
}
function vb(e, t) {
  return Oc(4, 2, e, t);
}
function yb(e, t) {
  return Oc(4, 4, e, t);
}
function wb(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function bb(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Oc(4, 4, wb.bind(null, t, e), n);
}
function Cm() {
}
function Sb(e, t) {
  var n = bn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bm(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Eb(e, t) {
  var n = bn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && bm(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ab(e, t, n) {
  return Vi & 21 ? (jn(n, t) || (n = kw(), Ue.lanes |= n, Gi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Mt = !0), e.memoizedState = n);
}
function nk(e, t) {
  var n = ye;
  ye = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = id.transition;
  id.transition = {};
  try {
    e(!1), t();
  } finally {
    ye = n, id.transition = r;
  }
}
function Cb() {
  return bn().memoizedState;
}
function rk(e, t, n) {
  var r = ri(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, xb(e))
    kb(t, n);
  else if (n = nb(e, t, n, r), n !== null) {
    var i = Tt();
    Wn(n, e, r, i), Ob(n, t, r);
  }
}
function ik(e, t, n) {
  var r = ri(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (xb(e))
    kb(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
      try {
        var a = t.lastRenderedState, l = o(a, n);
        if (i.hasEagerState = !0, i.eagerState = l, jn(l, a)) {
          var s = t.interleaved;
          s === null ? (i.next = i, mm(t)) : (i.next = s.next, s.next = i), t.interleaved = i;
          return;
        }
      } catch (u) {
      } finally {
      }
    n = nb(e, t, i, r), n !== null && (i = Tt(), Wn(n, e, r, i), Ob(n, t, r));
  }
}
function xb(e) {
  var t = e.alternate;
  return e === Ue || t !== null && t === Ue;
}
function kb(e, t) {
  ul = Vu = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ob(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tm(e, n);
  }
}
var Gu = { readContext: wn, useCallback: gt, useContext: gt, useEffect: gt, useImperativeHandle: gt, useInsertionEffect: gt, useLayoutEffect: gt, useMemo: gt, useReducer: gt, useRef: gt, useState: gt, useDebugValue: gt, useDeferredValue: gt, useTransition: gt, useMutableSource: gt, useSyncExternalStore: gt, useId: gt, unstable_isNewReconciler: !1 }, ok = { readContext: wn, useCallback: function(e, t) {
  return Hn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: wn, useEffect: Fv, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, du(
    4194308,
    4,
    wb.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return du(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return du(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Hn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Hn();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = rk.bind(null, Ue, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Hn();
  return e = { current: e }, t.memoizedState = e;
}, useState: Lv, useDebugValue: Cm, useDeferredValue: function(e) {
  return Hn().memoizedState = e;
}, useTransition: function() {
  var e = Lv(!1), t = e[0];
  return e = nk.bind(null, e[1]), Hn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Ue, i = Hn();
  if (Re) {
    if (n === void 0)
      throw Error(z(407));
    n = n();
  } else {
    if (n = t(), st === null)
      throw Error(z(349));
    Vi & 30 || fb(r, t, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return i.queue = o, Fv(pb.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, zl(9, db.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Hn(), t = st.identifierPrefix;
  if (Re) {
    var n = Sr, r = br;
    n = (r & ~(1 << 32 - zn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Bl++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = tk++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, ak = {
  readContext: wn,
  useCallback: Sb,
  useContext: wn,
  useEffect: Am,
  useImperativeHandle: bb,
  useInsertionEffect: vb,
  useLayoutEffect: yb,
  useMemo: Eb,
  useReducer: od,
  useRef: gb,
  useState: function() {
    return od(Ul);
  },
  useDebugValue: Cm,
  useDeferredValue: function(e) {
    var t = bn();
    return Ab(t, nt.memoizedState, e);
  },
  useTransition: function() {
    var e = od(Ul)[0], t = bn().memoizedState;
    return [e, t];
  },
  useMutableSource: ub,
  useSyncExternalStore: cb,
  useId: Cb,
  unstable_isNewReconciler: !1
}, lk = { readContext: wn, useCallback: Sb, useContext: wn, useEffect: Am, useImperativeHandle: bb, useInsertionEffect: vb, useLayoutEffect: yb, useMemo: Eb, useReducer: ad, useRef: gb, useState: function() {
  return ad(Ul);
}, useDebugValue: Cm, useDeferredValue: function(e) {
  var t = bn();
  return nt === null ? t.memoizedState = e : Ab(t, nt.memoizedState, e);
}, useTransition: function() {
  var e = ad(Ul)[0], t = bn().memoizedState;
  return [e, t];
}, useMutableSource: ub, useSyncExternalStore: cb, useId: Cb, unstable_isNewReconciler: !1 };
function Go(e, t) {
  try {
    var n = "", r = t;
    do
      n += Lx(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function ld(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Dp(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var sk = typeof WeakMap == "function" ? WeakMap : Map;
function Tb(e, t, n) {
  n = Ar(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Hu || (Hu = !0, Yp = r), Dp(e, t);
  }, n;
}
function Ib(e, t, n) {
  n = Ar(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      Dp(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Dp(e, t), typeof r != "function" && (ni === null ? ni = /* @__PURE__ */ new Set([this]) : ni.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Mv(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new sk();
    var i = /* @__PURE__ */ new Set();
    r.set(t, i);
  } else
    i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
  i.has(n) || (i.add(n), e = Ek.bind(null, e, t, n), t.then(e, e));
}
function Bv(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Uv(e, t, n, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ar(-1, 1), t.tag = 2, ti(n, t, 1))), n.lanes |= 1), e);
}
var uk = Dr.ReactCurrentOwner, Mt = !1;
function kt(e, t, n, r) {
  t.child = e === null ? lb(t, null, n, r) : Yo(t, e.child, n, r);
}
function zv(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return _o(t, i), r = Sm(e, t, n, r, o, i), n = Em(), e !== null && !Mt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ir(e, t, i)) : (Re && n && um(t), t.flags |= 1, kt(e, t, r, i), t.child);
}
function Wv(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Nm(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Pb(e, t, o, r, i)) : (e = gu(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & i)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Nl, n(a, r) && e.ref === t.ref)
      return Ir(e, t, i);
  }
  return t.flags |= 1, e = ii(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Pb(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Nl(o, r) && e.ref === t.ref)
      if (Mt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0)
        e.flags & 131072 && (Mt = !0);
      else
        return t.lanes = e.lanes, Ir(e, t, i);
  }
  return Rp(e, t, n, r, i);
}
function _b(e, t, n) {
  var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(xo, Qt), Qt |= n;
    else {
      if (!(n & 1073741824))
        return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, xe(xo, Qt), Qt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, xe(xo, Qt), Qt |= r;
    }
  else
    o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, xe(xo, Qt), Qt |= r;
  return kt(e, t, i, n), t.child;
}
function Nb(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Rp(e, t, n, r, i) {
  var o = zt(n) ? ji : At.current;
  return o = Wo(t, o), _o(t, i), n = Sm(e, t, n, r, o, i), r = Em(), e !== null && !Mt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ir(e, t, i)) : (Re && r && um(t), t.flags |= 1, kt(e, t, n, i), t.child);
}
function jv(e, t, n, r, i) {
  if (zt(n)) {
    var o = !0;
    Mu(t);
  } else
    o = !1;
  if (_o(t, i), t.stateNode === null)
    pu(e, t), ob(t, n, r), Np(t, n, r, i), r = !0;
  else if (e === null) {
    var a = t.stateNode, l = t.memoizedProps;
    a.props = l;
    var s = a.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = wn(u) : (u = zt(n) ? ji : At.current, u = Wo(t, u));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== r || s !== u) && Dv(t, a, r, u), Ur = !1;
    var d = t.memoizedState;
    a.state = d, ju(t, r, a, i), s = t.memoizedState, l !== r || d !== s || Ut.current || Ur ? (typeof c == "function" && (_p(t, n, c, r), s = t.memoizedState), (l = Ur || Nv(t, n, l, r, d, s, u)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), a.props = r, a.state = s, a.context = u, r = l) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, rb(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : Ln(t.type, l), a.props = u, f = t.pendingProps, d = a.context, s = n.contextType, typeof s == "object" && s !== null ? s = wn(s) : (s = zt(n) ? ji : At.current, s = Wo(t, s));
    var p = n.getDerivedStateFromProps;
    (c = typeof p == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== f || d !== s) && Dv(t, a, r, s), Ur = !1, d = t.memoizedState, a.state = d, ju(t, r, a, i);
    var h = t.memoizedState;
    l !== f || d !== h || Ut.current || Ur ? (typeof p == "function" && (_p(t, n, p, r), h = t.memoizedState), (u = Ur || Nv(t, n, u, r, d, h, s) || !1) ? (c || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, h, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, h, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), a.props = r, a.state = h, a.context = s, r = u) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Lp(e, t, n, r, o, i);
}
function Lp(e, t, n, r, i, o) {
  Nb(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a)
    return i && Ov(t, n, !1), Ir(e, t, o);
  r = t.stateNode, uk.current = t;
  var l = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Yo(t, e.child, null, o), t.child = Yo(t, null, l, o)) : kt(e, t, l, o), t.memoizedState = r.state, i && Ov(t, n, !0), t.child;
}
function Db(e) {
  var t = e.stateNode;
  t.pendingContext ? kv(e, t.pendingContext, t.pendingContext !== t.context) : t.context && kv(e, t.context, !1), vm(e, t.containerInfo);
}
function Yv(e, t, n, r, i) {
  return jo(), fm(i), t.flags |= 256, kt(e, t, n, r), t.child;
}
var Fp = { dehydrated: null, treeContext: null, retryLane: 0 };
function Mp(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Rb(e, t, n) {
  var r = t.pendingProps, i = Me.current, o = !1, a = (t.flags & 128) !== 0, l;
  if ((l = a) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), xe(Me, i & 1), e === null)
    return Ip(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Pc(a, r, 0, null), e = Mi(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Mp(n), t.memoizedState = Fp, e) : xm(t, a));
  if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null))
    return ck(e, t, a, r, l, i, n);
  if (o) {
    o = r.fallback, a = t.mode, i = e.child, l = i.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = ii(i, s), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = ii(l, o) : (o = Mi(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Mp(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Fp, r;
  }
  return o = e.child, e = o.sibling, r = ii(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function xm(e, t) {
  return t = Pc({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Vs(e, t, n, r) {
  return r !== null && fm(r), Yo(t, e.child, null, n), e = xm(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function ck(e, t, n, r, i, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ld(Error(z(422))), Vs(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Pc({ mode: "visible", children: r.children }, i, 0, null), o = Mi(o, i, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Yo(t, e.child, null, a), t.child.memoizedState = Mp(a), t.memoizedState = Fp, o);
  if (!(t.mode & 1))
    return Vs(e, t, a, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r)
      var l = r.dgst;
    return r = l, o = Error(z(419)), r = ld(o, r, void 0), Vs(e, t, a, r);
  }
  if (l = (a & e.childLanes) !== 0, Mt || l) {
    if (r = st, r !== null) {
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
      i = i & (r.suspendedLanes | a) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Tr(e, i), Wn(r, e, i, -1));
    }
    return _m(), r = ld(Error(z(421))), Vs(e, t, a, r);
  }
  return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Ak.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, qt = ei(i.nextSibling), tn = t, Re = !0, Bn = null, e !== null && (fn[dn++] = br, fn[dn++] = Sr, fn[dn++] = Yi, br = e.id, Sr = e.overflow, Yi = t), t = xm(t, r.children), t.flags |= 4096, t);
}
function Vv(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Pp(e.return, t, n);
}
function sd(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function Lb(e, t, n) {
  var r = t.pendingProps, i = r.revealOrder, o = r.tail;
  if (kt(e, t, r.children, n), r = Me.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Vv(e, n, t);
          else if (e.tag === 19)
            Vv(e, n, t);
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
  if (xe(Me, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          e = n.alternate, e !== null && Yu(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), sd(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Yu(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        sd(t, !0, n, null, o);
        break;
      case "together":
        sd(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function pu(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ir(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Gi |= t.lanes, !(n & t.childLanes))
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
function fk(e, t, n) {
  switch (t.tag) {
    case 3:
      Db(t), jo();
      break;
    case 5:
      sb(t);
      break;
    case 1:
      zt(t.type) && Mu(t);
      break;
    case 4:
      vm(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, i = t.memoizedProps.value;
      xe(zu, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (xe(Me, Me.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Rb(e, t, n) : (xe(Me, Me.current & 1), e = Ir(e, t, n), e !== null ? e.sibling : null);
      xe(Me, Me.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return Lb(e, t, n);
        t.flags |= 128;
      }
      if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), xe(Me, Me.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, _b(e, t, n);
  }
  return Ir(e, t, n);
}
var Fb, Bp, Mb, Bb;
Fb = function(e, t) {
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
Bp = function() {
};
Mb = function(e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = t.stateNode, Li(nr.current);
    var o = null;
    switch (n) {
      case "input":
        i = ap(e, i), r = ap(e, r), o = [];
        break;
      case "select":
        i = ze({}, i, { value: void 0 }), r = ze({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = up(e, i), r = up(e, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Lu);
    }
    fp(n, r);
    var a;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (a in l)
            l.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
        } else
          u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (xl.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
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
          u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, s != null && l !== s && (o = o || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (xl.hasOwnProperty(u) ? (s != null && u === "onScroll" && Oe("scroll", e), o || l === s || (o = [])) : (o = o || []).push(u, s));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Bb = function(e, t, n, r) {
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
function vt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
  else
    for (i = e.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function dk(e, t, n) {
  var r = t.pendingProps;
  switch (cm(t), t.tag) {
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
      return vt(t), null;
    case 1:
      return zt(t.type) && Fu(), vt(t), null;
    case 3:
      return r = t.stateNode, Vo(), Ie(Ut), Ie(At), wm(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (js(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Bn !== null && ($p(Bn), Bn = null))), Bp(e, t), vt(t), null;
    case 5:
      ym(t);
      var i = Li(Ml.current);
      if (n = t.type, e !== null && t.stateNode != null)
        Mb(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(z(166));
          return vt(t), null;
        }
        if (e = Li(nr.current), js(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Xn] = t, r[Ll] = o, e = (t.mode & 1) !== 0, n) {
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
              for (i = 0; i < Qa.length; i++)
                Oe(Qa[i], r);
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
              Zg(r, o), Oe("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Oe("invalid", r);
              break;
            case "textarea":
              tv(r, o), Oe("invalid", r);
          }
          fp(n, o), i = null;
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var l = o[a];
              a === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && Ws(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && Ws(
                r.textContent,
                l,
                e
              ), i = ["children", "" + l]) : xl.hasOwnProperty(a) && l != null && a === "onScroll" && Oe("scroll", r);
            }
          switch (n) {
            case "input":
              Ds(r), ev(r, o, !0);
              break;
            case "textarea":
              Ds(r), nv(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Lu);
          }
          r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = fw(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Xn] = t, e[Ll] = r, Fb(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = dp(n, r), n) {
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
                for (i = 0; i < Qa.length; i++)
                  Oe(Qa[i], e);
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
                Zg(e, r), i = ap(e, r), Oe("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, i = ze({}, r, { value: void 0 }), Oe("invalid", e);
                break;
              case "textarea":
                tv(e, r), i = up(e, r), Oe("invalid", e);
                break;
              default:
                i = r;
            }
            fp(n, i), l = i;
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var s = l[o];
                o === "style" ? hw(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && dw(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && kl(e, s) : typeof s == "number" && kl(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (xl.hasOwnProperty(o) ? s != null && o === "onScroll" && Oe("scroll", e) : s != null && Qh(e, o, s, a));
              }
            switch (n) {
              case "input":
                Ds(e), ev(e, r, !1);
                break;
              case "textarea":
                Ds(e), nv(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ui(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Oo(e, !!r.multiple, o, !1) : r.defaultValue != null && Oo(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Lu);
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
      return vt(t), null;
    case 6:
      if (e && t.stateNode != null)
        Bb(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(z(166));
        if (n = Li(Ml.current), Li(nr.current), js(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Xn] = t, (o = r.nodeValue !== n) && (e = tn, e !== null))
            switch (e.tag) {
              case 3:
                Ws(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ws(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Xn] = t, t.stateNode = r;
      }
      return vt(t), null;
    case 13:
      if (Ie(Me), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Re && qt !== null && t.mode & 1 && !(t.flags & 128))
          tb(), jo(), t.flags |= 98560, o = !1;
        else if (o = js(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o)
              throw Error(z(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(z(317));
            o[Xn] = t;
          } else
            jo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          vt(t), o = !1;
        } else
          Bn !== null && ($p(Bn), Bn = null), o = !0;
        if (!o)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Me.current & 1 ? rt === 0 && (rt = 3) : _m())), t.updateQueue !== null && (t.flags |= 4), vt(t), null);
    case 4:
      return Vo(), Bp(e, t), e === null && Dl(t.stateNode.containerInfo), vt(t), null;
    case 10:
      return hm(t.type._context), vt(t), null;
    case 17:
      return zt(t.type) && Fu(), vt(t), null;
    case 19:
      if (Ie(Me), o = t.memoizedState, o === null)
        return vt(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null)
        if (r)
          _a(o, !1);
        else {
          if (rt !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (a = Yu(e), a !== null) {
                for (t.flags |= 128, _a(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return xe(Me, Me.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null && Je() > $o && (t.flags |= 128, r = !0, _a(o, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = Yu(a), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _a(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Re)
              return vt(t), null;
          } else
            2 * Je() - o.renderingStartTime > $o && n !== 1073741824 && (t.flags |= 128, r = !0, _a(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Je(), t.sibling = null, n = Me.current, xe(Me, r ? n & 1 | 2 : n & 1), t) : (vt(t), null);
    case 22:
    case 23:
      return Pm(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Qt & 1073741824 && (vt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(z(156, t.tag));
}
function pk(e, t) {
  switch (cm(t), t.tag) {
    case 1:
      return zt(t.type) && Fu(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Vo(), Ie(Ut), Ie(At), wm(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ym(t), null;
    case 13:
      if (Ie(Me), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(z(340));
        jo();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ie(Me), null;
    case 4:
      return Vo(), null;
    case 10:
      return hm(t.type._context), null;
    case 22:
    case 23:
      return Pm(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Gs = !1, St = !1, hk = typeof WeakSet == "function" ? WeakSet : Set, K = null;
function Co(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        je(e, t, r);
      }
    else
      n.current = null;
}
function Up(e, t, n) {
  try {
    n();
  } catch (r) {
    je(e, t, r);
  }
}
var Gv = !1;
function mk(e, t) {
  if (Ep = Nu, e = jw(), sm(e)) {
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
  for (Ap = { focusedElem: e, selectionRange: n }, Nu = !1, K = t; K !== null; )
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
                  var m = h.memoizedProps, S = h.memoizedState, g = t.stateNode, v = g.getSnapshotBeforeUpdate(t.elementType === t.type ? m : Ln(t.type, m), S);
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
          je(t, t.return, E);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, K = e;
          break;
        }
        K = t.return;
      }
  return h = Gv, Gv = !1, h;
}
function cl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && Up(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Tc(e, t) {
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
function zp(e) {
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
function Ub(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Ub(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Xn], delete t[Ll], delete t[kp], delete t[X2], delete t[q2])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function zb(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function $v(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || zb(e.return))
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
function Wp(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Lu));
  else if (r !== 4 && (e = e.child, e !== null))
    for (Wp(e, t, n), e = e.sibling; e !== null; )
      Wp(e, t, n), e = e.sibling;
}
function jp(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (jp(e, t, n), e = e.sibling; e !== null; )
      jp(e, t, n), e = e.sibling;
}
var dt = null, Fn = !1;
function Mr(e, t, n) {
  for (n = n.child; n !== null; )
    Wb(e, t, n), n = n.sibling;
}
function Wb(e, t, n) {
  if (tr && typeof tr.onCommitFiberUnmount == "function")
    try {
      tr.onCommitFiberUnmount(bc, n);
    } catch (l) {
    }
  switch (n.tag) {
    case 5:
      St || Co(n, t);
    case 6:
      var r = dt, i = Fn;
      dt = null, Mr(e, t, n), dt = r, Fn = i, dt !== null && (Fn ? (e = dt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : dt.removeChild(n.stateNode));
      break;
    case 18:
      dt !== null && (Fn ? (e = dt, n = n.stateNode, e.nodeType === 8 ? td(e.parentNode, n) : e.nodeType === 1 && td(e, n), Pl(e)) : td(dt, n.stateNode));
      break;
    case 4:
      r = dt, i = Fn, dt = n.stateNode.containerInfo, Fn = !0, Mr(e, t, n), dt = r, Fn = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!St && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Up(n, t, a), i = i.next;
        } while (i !== r);
      }
      Mr(e, t, n);
      break;
    case 1:
      if (!St && (Co(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (l) {
          je(n, t, l);
        }
      Mr(e, t, n);
      break;
    case 21:
      Mr(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (St = (r = St) || n.memoizedState !== null, Mr(e, t, n), St = r) : Mr(e, t, n);
      break;
    default:
      Mr(e, t, n);
  }
}
function Hv(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new hk()), t.forEach(function(r) {
      var i = Ck.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function Nn(e, t) {
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
                dt = l.stateNode, Fn = !1;
                break e;
              case 3:
                dt = l.stateNode.containerInfo, Fn = !0;
                break e;
              case 4:
                dt = l.stateNode.containerInfo, Fn = !0;
                break e;
            }
            l = l.return;
          }
        if (dt === null)
          throw Error(z(160));
        Wb(o, a, i), dt = null, Fn = !1;
        var s = i.alternate;
        s !== null && (s.return = null), i.return = null;
      } catch (u) {
        je(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      jb(t, e), t = t.sibling;
}
function jb(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Nn(t, e), $n(e), r & 4) {
        try {
          cl(3, e, e.return), Tc(3, e);
        } catch (m) {
          je(e, e.return, m);
        }
        try {
          cl(5, e, e.return);
        } catch (m) {
          je(e, e.return, m);
        }
      }
      break;
    case 1:
      Nn(t, e), $n(e), r & 512 && n !== null && Co(n, n.return);
      break;
    case 5:
      if (Nn(t, e), $n(e), r & 512 && n !== null && Co(n, n.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          kl(i, "");
        } catch (m) {
          je(e, e.return, m);
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, l = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null)
          try {
            l === "input" && o.type === "radio" && o.name != null && uw(i, o), dp(l, a);
            var u = dp(l, o);
            for (a = 0; a < s.length; a += 2) {
              var c = s[a], f = s[a + 1];
              c === "style" ? hw(i, f) : c === "dangerouslySetInnerHTML" ? dw(i, f) : c === "children" ? kl(i, f) : Qh(i, c, f, u);
            }
            switch (l) {
              case "input":
                lp(i, o);
                break;
              case "textarea":
                cw(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var p = o.value;
                p != null ? Oo(i, !!o.multiple, p, !1) : d !== !!o.multiple && (o.defaultValue != null ? Oo(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : Oo(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ll] = o;
          } catch (m) {
            je(e, e.return, m);
          }
      }
      break;
    case 6:
      if (Nn(t, e), $n(e), r & 4) {
        if (e.stateNode === null)
          throw Error(z(162));
        i = e.stateNode, o = e.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (m) {
          je(e, e.return, m);
        }
      }
      break;
    case 3:
      if (Nn(t, e), $n(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          Pl(t.containerInfo);
        } catch (m) {
          je(e, e.return, m);
        }
      break;
    case 4:
      Nn(t, e), $n(e);
      break;
    case 13:
      Nn(t, e), $n(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Tm = Je())), r & 4 && Hv(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (St = (u = St) || c, Nn(t, e), St = u) : Nn(t, e), $n(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
          for (K = e, c = e.child; c !== null; ) {
            for (f = K = c; K !== null; ) {
              switch (d = K, p = d.child, d.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  cl(4, d, d.return);
                  break;
                case 1:
                  Co(d, d.return);
                  var h = d.stateNode;
                  if (typeof h.componentWillUnmount == "function") {
                    r = d, n = d.return;
                    try {
                      t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
                    } catch (m) {
                      je(r, n, m);
                    }
                  }
                  break;
                case 5:
                  Co(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    Qv(f);
                    continue;
                  }
              }
              p !== null ? (p.return = d, K = p) : Qv(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = e; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, s = f.memoizedProps.style, a = s != null && s.hasOwnProperty("display") ? s.display : null, l.style.display = pw("display", a));
                } catch (m) {
                  je(e, e.return, m);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (m) {
                  je(e, e.return, m);
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
      Nn(t, e), $n(e), r & 4 && Hv(e);
      break;
    case 21:
      break;
    default:
      Nn(
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
          if (zb(n)) {
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
          r.flags & 32 && (kl(i, ""), r.flags &= -33);
          var o = $v(e);
          jp(e, o, i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, l = $v(e);
          Wp(e, l, a);
          break;
        default:
          throw Error(z(161));
      }
    } catch (s) {
      je(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function gk(e, t, n) {
  K = e, Yb(e);
}
function Yb(e, t, n) {
  for (var r = (e.mode & 1) !== 0; K !== null; ) {
    var i = K, o = i.child;
    if (i.tag === 22 && r) {
      var a = i.memoizedState !== null || Gs;
      if (!a) {
        var l = i.alternate, s = l !== null && l.memoizedState !== null || St;
        l = Gs;
        var u = St;
        if (Gs = a, (St = s) && !u)
          for (K = i; K !== null; )
            a = K, s = a.child, a.tag === 22 && a.memoizedState !== null ? Kv(i) : s !== null ? (s.return = a, K = s) : Kv(i);
        for (; o !== null; )
          K = o, Yb(o), o = o.sibling;
        K = i, Gs = l, St = u;
      }
      Jv(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? (o.return = i, K = o) : Jv(e);
  }
}
function Jv(e) {
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
              St || Tc(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !St)
                if (n === null)
                  r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : Ln(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && _v(t, o, r);
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
                _v(t, a, n);
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
                    f !== null && Pl(f);
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
        St || t.flags & 512 && zp(t);
      } catch (d) {
        je(t, t.return, d);
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
function Qv(e) {
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
function Kv(e) {
  for (; K !== null; ) {
    var t = K;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Tc(4, t);
          } catch (s) {
            je(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              je(t, i, s);
            }
          }
          var o = t.return;
          try {
            zp(t);
          } catch (s) {
            je(t, o, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            zp(t);
          } catch (s) {
            je(t, a, s);
          }
      }
    } catch (s) {
      je(t, t.return, s);
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
var vk = Math.ceil, $u = Dr.ReactCurrentDispatcher, km = Dr.ReactCurrentOwner, gn = Dr.ReactCurrentBatchConfig, ve = 0, st = null, Ze = null, pt = 0, Qt = 0, xo = gi(0), rt = 0, Wl = null, Gi = 0, Ic = 0, Om = 0, fl = null, Lt = null, Tm = 0, $o = 1 / 0, mr = null, Hu = !1, Yp = null, ni = null, $s = !1, Qr = null, Ju = 0, dl = 0, Vp = null, hu = -1, mu = 0;
function Tt() {
  return ve & 6 ? Je() : hu !== -1 ? hu : hu = Je();
}
function ri(e) {
  return e.mode & 1 ? ve & 2 && pt !== 0 ? pt & -pt : ek.transition !== null ? (mu === 0 && (mu = kw()), mu) : (e = ye, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Dw(e.type)), e) : 1;
}
function Wn(e, t, n, r) {
  if (50 < dl)
    throw dl = 0, Vp = null, Error(z(185));
  es(e, n, r), (!(ve & 2) || e !== st) && (e === st && (!(ve & 2) && (Ic |= n), rt === 4 && jr(e, pt)), Wt(e, r), n === 1 && ve === 0 && !(t.mode & 1) && ($o = Je() + 500, xc && vi()));
}
function Wt(e, t) {
  var n = e.callbackNode;
  e2(e, t);
  var r = _u(e, e === st ? pt : 0);
  if (r === 0)
    n !== null && ov(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ov(n), t === 1)
      e.tag === 0 ? Z2(Xv.bind(null, e)) : qw(Xv.bind(null, e)), Q2(function() {
        !(ve & 6) && vi();
      }), n = null;
    else {
      switch (Ow(r)) {
        case 1:
          n = em;
          break;
        case 4:
          n = Cw;
          break;
        case 16:
          n = Pu;
          break;
        case 536870912:
          n = xw;
          break;
        default:
          n = Pu;
      }
      n = Xb(n, Vb.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Vb(e, t) {
  if (hu = -1, mu = 0, ve & 6)
    throw Error(z(327));
  var n = e.callbackNode;
  if (No() && e.callbackNode !== n)
    return null;
  var r = _u(e, e === st ? pt : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = Qu(e, r);
  else {
    t = r;
    var i = ve;
    ve |= 2;
    var o = $b();
    (st !== e || pt !== t) && (mr = null, $o = Je() + 500, Fi(e, t));
    do
      try {
        bk();
        break;
      } catch (l) {
        Gb(e, l);
      }
    while (1);
    pm(), $u.current = o, ve = i, Ze !== null ? t = 0 : (st = null, pt = 0, t = rt);
  }
  if (t !== 0) {
    if (t === 2 && (i = vp(e), i !== 0 && (r = i, t = Gp(e, i))), t === 1)
      throw n = Wl, Fi(e, 0), jr(e, r), Wt(e, Je()), n;
    if (t === 6)
      jr(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !yk(i) && (t = Qu(e, r), t === 2 && (o = vp(e), o !== 0 && (r = o, t = Gp(e, o))), t === 1))
        throw n = Wl, Fi(e, 0), jr(e, r), Wt(e, Je()), n;
      switch (e.finishedWork = i, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(z(345));
        case 2:
          Ii(e, Lt, mr);
          break;
        case 3:
          if (jr(e, r), (r & 130023424) === r && (t = Tm + 500 - Je(), 10 < t)) {
            if (_u(e, 0) !== 0)
              break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              Tt(), e.pingedLanes |= e.suspendedLanes & i;
              break;
            }
            e.timeoutHandle = xp(Ii.bind(null, e, Lt, mr), t);
            break;
          }
          Ii(e, Lt, mr);
          break;
        case 4:
          if (jr(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var a = 31 - zn(r);
            o = 1 << a, a = t[a], a > i && (i = a), r &= ~o;
          }
          if (r = i, r = Je() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * vk(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = xp(Ii.bind(null, e, Lt, mr), r);
            break;
          }
          Ii(e, Lt, mr);
          break;
        case 5:
          Ii(e, Lt, mr);
          break;
        default:
          throw Error(z(329));
      }
    }
  }
  return Wt(e, Je()), e.callbackNode === n ? Vb.bind(null, e) : null;
}
function Gp(e, t) {
  var n = fl;
  return e.current.memoizedState.isDehydrated && (Fi(e, t).flags |= 256), e = Qu(e, t), e !== 2 && (t = Lt, Lt = n, t !== null && $p(t)), e;
}
function $p(e) {
  Lt === null ? Lt = e : Lt.push.apply(Lt, e);
}
function yk(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!jn(o(), i))
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
function jr(e, t) {
  for (t &= ~Om, t &= ~Ic, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - zn(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Xv(e) {
  if (ve & 6)
    throw Error(z(327));
  No();
  var t = _u(e, 0);
  if (!(t & 1))
    return Wt(e, Je()), null;
  var n = Qu(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = vp(e);
    r !== 0 && (t = r, n = Gp(e, r));
  }
  if (n === 1)
    throw n = Wl, Fi(e, 0), jr(e, t), Wt(e, Je()), n;
  if (n === 6)
    throw Error(z(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ii(e, Lt, mr), Wt(e, Je()), null;
}
function Im(e, t) {
  var n = ve;
  ve |= 1;
  try {
    return e(t);
  } finally {
    ve = n, ve === 0 && ($o = Je() + 500, xc && vi());
  }
}
function $i(e) {
  Qr !== null && Qr.tag === 0 && !(ve & 6) && No();
  var t = ve;
  ve |= 1;
  var n = gn.transition, r = ye;
  try {
    if (gn.transition = null, ye = 1, e)
      return e();
  } finally {
    ye = r, gn.transition = n, ve = t, !(ve & 6) && vi();
  }
}
function Pm() {
  Qt = xo.current, Ie(xo);
}
function Fi(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, J2(n)), Ze !== null)
    for (n = Ze.return; n !== null; ) {
      var r = n;
      switch (cm(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Fu();
          break;
        case 3:
          Vo(), Ie(Ut), Ie(At), wm();
          break;
        case 5:
          ym(r);
          break;
        case 4:
          Vo();
          break;
        case 13:
          Ie(Me);
          break;
        case 19:
          Ie(Me);
          break;
        case 10:
          hm(r.type._context);
          break;
        case 22:
        case 23:
          Pm();
      }
      n = n.return;
    }
  if (st = e, Ze = e = ii(e.current, null), pt = Qt = t, rt = 0, Wl = null, Om = Ic = Gi = 0, Lt = fl = null, Ri !== null) {
    for (t = 0; t < Ri.length; t++)
      if (n = Ri[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var a = o.next;
          o.next = i, r.next = a;
        }
        n.pending = r;
      }
    Ri = null;
  }
  return e;
}
function Gb(e, t) {
  do {
    var n = Ze;
    try {
      if (pm(), fu.current = Gu, Vu) {
        for (var r = Ue.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        Vu = !1;
      }
      if (Vi = 0, lt = nt = Ue = null, ul = !1, Bl = 0, km.current = null, n === null || n.return === null) {
        rt = 1, Wl = t, Ze = null;
        break;
      }
      e: {
        var o = e, a = n.return, l = n, s = t;
        if (t = pt, l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var u = s, c = l, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var p = Bv(a);
          if (p !== null) {
            p.flags &= -257, Uv(p, a, l, o, t), p.mode & 1 && Mv(o, u, t), t = p, s = u;
            var h = t.updateQueue;
            if (h === null) {
              var m = /* @__PURE__ */ new Set();
              m.add(s), t.updateQueue = m;
            } else
              h.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Mv(o, u, t), _m();
              break e;
            }
            s = Error(z(426));
          }
        } else if (Re && l.mode & 1) {
          var S = Bv(a);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256), Uv(S, a, l, o, t), fm(Go(s, l));
            break e;
          }
        }
        o = s = Go(s, l), rt !== 4 && (rt = 2), fl === null ? fl = [o] : fl.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var g = Tb(o, s, t);
              Pv(o, g);
              break e;
            case 1:
              l = s;
              var v = o.type, w = o.stateNode;
              if (!(o.flags & 128) && (typeof v.getDerivedStateFromError == "function" || w !== null && typeof w.componentDidCatch == "function" && (ni === null || !ni.has(w)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var E = Ib(o, l, t);
                Pv(o, E);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Jb(n);
    } catch (O) {
      t = O, Ze === n && n !== null && (Ze = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function $b() {
  var e = $u.current;
  return $u.current = Gu, e === null ? Gu : e;
}
function _m() {
  (rt === 0 || rt === 3 || rt === 2) && (rt = 4), st === null || !(Gi & 268435455) && !(Ic & 268435455) || jr(st, pt);
}
function Qu(e, t) {
  var n = ve;
  ve |= 2;
  var r = $b();
  (st !== e || pt !== t) && (mr = null, Fi(e, t));
  do
    try {
      wk();
      break;
    } catch (i) {
      Gb(e, i);
    }
  while (1);
  if (pm(), ve = n, $u.current = r, Ze !== null)
    throw Error(z(261));
  return st = null, pt = 0, rt;
}
function wk() {
  for (; Ze !== null; )
    Hb(Ze);
}
function bk() {
  for (; Ze !== null && !Gx(); )
    Hb(Ze);
}
function Hb(e) {
  var t = Kb(e.alternate, e, Qt);
  e.memoizedProps = e.pendingProps, t === null ? Jb(e) : Ze = t, km.current = null;
}
function Jb(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = pk(n, t), n !== null) {
        n.flags &= 32767, Ze = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        rt = 6, Ze = null;
        return;
      }
    } else if (n = dk(n, t, Qt), n !== null) {
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
function Ii(e, t, n) {
  var r = ye, i = gn.transition;
  try {
    gn.transition = null, ye = 1, Sk(e, t, n, r);
  } finally {
    gn.transition = i, ye = r;
  }
  return null;
}
function Sk(e, t, n, r) {
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
  if (t2(e, o), e === st && (Ze = st = null, pt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || $s || ($s = !0, Xb(Pu, function() {
    return No(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = gn.transition, gn.transition = null;
    var a = ye;
    ye = 1;
    var l = ve;
    ve |= 4, km.current = null, mk(e, n), jb(n, e), W2(Ap), Nu = !!Ep, Ap = Ep = null, e.current = n, gk(n), $x(), ve = l, ye = a, gn.transition = o;
  } else
    e.current = n;
  if ($s && ($s = !1, Qr = e, Ju = i), o = e.pendingLanes, o === 0 && (ni = null), Qx(n.stateNode), Wt(e, Je()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (Hu)
    throw Hu = !1, e = Yp, Yp = null, e;
  return Ju & 1 && e.tag !== 0 && No(), o = e.pendingLanes, o & 1 ? e === Vp ? dl++ : (dl = 0, Vp = e) : dl = 0, vi(), null;
}
function No() {
  if (Qr !== null) {
    var e = Ow(Ju), t = gn.transition, n = ye;
    try {
      if (gn.transition = null, ye = 16 > e ? 16 : e, Qr === null)
        var r = !1;
      else {
        if (e = Qr, Qr = null, Ju = 0, ve & 6)
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
                      cl(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null)
                    f.return = c, K = f;
                  else
                    for (; K !== null; ) {
                      c = K;
                      var d = c.sibling, p = c.return;
                      if (Ub(c), c === u) {
                        K = null;
                        break;
                      }
                      if (d !== null) {
                        d.return = p, K = d;
                        break;
                      }
                      K = p;
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
                      cl(9, o, o.return);
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
                        Tc(9, l);
                    }
                  } catch (O) {
                    je(l, l.return, O);
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
        if (ve = i, vi(), tr && typeof tr.onPostCommitFiberRoot == "function")
          try {
            tr.onPostCommitFiberRoot(bc, e);
          } catch (O) {
          }
        r = !0;
      }
      return r;
    } finally {
      ye = n, gn.transition = t;
    }
  }
  return !1;
}
function qv(e, t, n) {
  t = Go(n, t), t = Tb(e, t, 1), e = ti(e, t, 1), t = Tt(), e !== null && (es(e, 1, t), Wt(e, t));
}
function je(e, t, n) {
  if (e.tag === 3)
    qv(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        qv(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ni === null || !ni.has(r))) {
          e = Go(n, e), e = Ib(t, e, 1), t = ti(t, e, 1), e = Tt(), t !== null && (es(t, 1, e), Wt(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Ek(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Tt(), e.pingedLanes |= e.suspendedLanes & n, st === e && (pt & n) === n && (rt === 4 || rt === 3 && (pt & 130023424) === pt && 500 > Je() - Tm ? Fi(e, 0) : Om |= n), Wt(e, t);
}
function Qb(e, t) {
  t === 0 && (e.mode & 1 ? (t = Fs, Fs <<= 1, !(Fs & 130023424) && (Fs = 4194304)) : t = 1);
  var n = Tt();
  e = Tr(e, t), e !== null && (es(e, t, n), Wt(e, n));
}
function Ak(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Qb(e, n);
}
function Ck(e, t) {
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
  r !== null && r.delete(t), Qb(e, n);
}
var Kb;
Kb = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ut.current)
      Mt = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return Mt = !1, fk(e, t, n);
      Mt = !!(e.flags & 131072);
    }
  else
    Mt = !1, Re && t.flags & 1048576 && Zw(t, Uu, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      pu(e, t), e = t.pendingProps;
      var i = Wo(t, At.current);
      _o(t, n), i = Sm(null, t, r, e, i, n);
      var o = Em();
      return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, zt(r) ? (o = !0, Mu(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, gm(t), i.updater = kc, t.stateNode = i, i._reactInternals = t, Np(t, r, e, n), t = Lp(null, t, r, !0, o, n)) : (t.tag = 0, Re && o && um(t), kt(null, t, i, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (pu(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = kk(r), e = Ln(r, e), i) {
          case 0:
            t = Rp(null, t, r, e, n);
            break e;
          case 1:
            t = jv(null, t, r, e, n);
            break e;
          case 11:
            t = zv(null, t, r, e, n);
            break e;
          case 14:
            t = Wv(null, t, r, Ln(r.type, e), n);
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
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ln(r, i), Rp(e, t, r, i, n);
    case 1:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ln(r, i), jv(e, t, r, i, n);
    case 3:
      e: {
        if (Db(t), e === null)
          throw Error(z(387));
        r = t.pendingProps, o = t.memoizedState, i = o.element, rb(e, t), ju(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated)
          if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = Go(Error(z(423)), t), t = Yv(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Go(Error(z(424)), t), t = Yv(e, t, r, n, i);
            break e;
          } else
            for (qt = ei(t.stateNode.containerInfo.firstChild), tn = t, Re = !0, Bn = null, n = lb(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (jo(), r === i) {
            t = Ir(e, t, n);
            break e;
          }
          kt(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return sb(t), e === null && Ip(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = i.children, Cp(r, i) ? a = null : o !== null && Cp(r, o) && (t.flags |= 32), Nb(e, t), kt(e, t, a, n), t.child;
    case 6:
      return e === null && Ip(t), null;
    case 13:
      return Rb(e, t, n);
    case 4:
      return vm(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Yo(t, null, r, n) : kt(e, t, r, n), t.child;
    case 11:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ln(r, i), zv(e, t, r, i, n);
    case 7:
      return kt(e, t, t.pendingProps, n), t.child;
    case 8:
      return kt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return kt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, a = i.value, xe(zu, r._currentValue), r._currentValue = a, o !== null)
          if (jn(o.value, a)) {
            if (o.children === i.children && !Ut.current) {
              t = Ir(e, t, n);
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
                      s = Ar(-1, n & -n), s.tag = 2;
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null ? s.next = s : (s.next = c.next, c.next = s), u.pending = s;
                      }
                    }
                    o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Pp(
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
                a.lanes |= n, l = a.alternate, l !== null && (l.lanes |= n), Pp(a, n, t), a = o.sibling;
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
        kt(e, t, i.children, n), t = t.child;
      }
      return t;
    case 9:
      return i = t.type, r = t.pendingProps.children, _o(t, n), i = wn(i), r = r(i), t.flags |= 1, kt(e, t, r, n), t.child;
    case 14:
      return r = t.type, i = Ln(r, t.pendingProps), i = Ln(r.type, i), Wv(e, t, r, i, n);
    case 15:
      return Pb(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ln(r, i), pu(e, t), t.tag = 1, zt(r) ? (e = !0, Mu(t)) : e = !1, _o(t, n), ob(t, r, i), Np(t, r, i, n), Lp(null, t, r, !0, e, n);
    case 19:
      return Lb(e, t, n);
    case 22:
      return _b(e, t, n);
  }
  throw Error(z(156, t.tag));
};
function Xb(e, t) {
  return Aw(e, t);
}
function xk(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function hn(e, t, n, r) {
  return new xk(e, t, n, r);
}
function Nm(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function kk(e) {
  if (typeof e == "function")
    return Nm(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Xh)
      return 11;
    if (e === qh)
      return 14;
  }
  return 2;
}
function ii(e, t) {
  var n = e.alternate;
  return n === null ? (n = hn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function gu(e, t, n, r, i, o) {
  var a = 2;
  if (r = e, typeof e == "function")
    Nm(e) && (a = 1);
  else if (typeof e == "string")
    a = 5;
  else
    e:
      switch (e) {
        case mo:
          return Mi(n.children, i, o, t);
        case Kh:
          a = 8, i |= 8;
          break;
        case np:
          return e = hn(12, n, t, i | 2), e.elementType = np, e.lanes = o, e;
        case rp:
          return e = hn(13, n, t, i), e.elementType = rp, e.lanes = o, e;
        case ip:
          return e = hn(19, n, t, i), e.elementType = ip, e.lanes = o, e;
        case aw:
          return Pc(n, i, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case iw:
                a = 10;
                break e;
              case ow:
                a = 9;
                break e;
              case Xh:
                a = 11;
                break e;
              case qh:
                a = 14;
                break e;
              case Br:
                a = 16, r = null;
                break e;
            }
          throw Error(z(130, e == null ? e : typeof e, ""));
      }
  return t = hn(a, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Mi(e, t, n, r) {
  return e = hn(7, e, r, t), e.lanes = n, e;
}
function Pc(e, t, n, r) {
  return e = hn(22, e, r, t), e.elementType = aw, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ud(e, t, n) {
  return e = hn(6, e, null, t), e.lanes = n, e;
}
function cd(e, t, n) {
  return t = hn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Ok(e, t, n, r, i) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vf(0), this.expirationTimes = Vf(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vf(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Dm(e, t, n, r, i, o, a, l, s) {
  return e = new Ok(e, t, n, l, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = hn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gm(o), e;
}
function Tk(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ho, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function qb(e) {
  if (!e)
    return ci;
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
          if (zt(t.type)) {
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
    if (zt(n))
      return Xw(e, n, t);
  }
  return t;
}
function Zb(e, t, n, r, i, o, a, l, s) {
  return e = Dm(n, r, !0, e, i, o, a, l, s), e.context = qb(null), n = e.current, r = Tt(), i = ri(n), o = Ar(r, i), o.callback = t != null ? t : null, ti(n, o, i), e.current.lanes = i, es(e, i, r), Wt(e, r), e;
}
function _c(e, t, n, r) {
  var i = t.current, o = Tt(), a = ri(i);
  return n = qb(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ar(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ti(i, t, a), e !== null && (Wn(e, i, a, o), cu(e, i, a)), a;
}
function Ku(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Zv(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Rm(e, t) {
  Zv(e, t), (e = e.alternate) && Zv(e, t);
}
function Ik() {
  return null;
}
var eS = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Lm(e) {
  this._internalRoot = e;
}
Nc.prototype.render = Lm.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(z(409));
  _c(e, t, null, null);
};
Nc.prototype.unmount = Lm.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    $i(function() {
      _c(null, e, null, null);
    }), t[Or] = null;
  }
};
function Nc(e) {
  this._internalRoot = e;
}
Nc.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Pw();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Wr.length && t !== 0 && t < Wr[n].priority; n++)
      ;
    Wr.splice(n, 0, e), n === 0 && Nw(e);
  }
};
function Fm(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Dc(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ey() {
}
function Pk(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var u = Ku(a);
        o.call(u);
      };
    }
    var a = Zb(t, r, e, 0, null, !1, !1, "", ey);
    return e._reactRootContainer = a, e[Or] = a.current, Dl(e.nodeType === 8 ? e.parentNode : e), $i(), a;
  }
  for (; i = e.lastChild; )
    e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function() {
      var u = Ku(s);
      l.call(u);
    };
  }
  var s = Dm(e, 0, !1, null, null, !1, !1, "", ey);
  return e._reactRootContainer = s, e[Or] = s.current, Dl(e.nodeType === 8 ? e.parentNode : e), $i(function() {
    _c(t, s, n, r);
  }), s;
}
function Rc(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var s = Ku(a);
        l.call(s);
      };
    }
    _c(t, a, e, i);
  } else
    a = Pk(n, t, e, i, r);
  return Ku(a);
}
Tw = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ja(t.pendingLanes);
        n !== 0 && (tm(t, n | 1), Wt(t, Je()), !(ve & 6) && ($o = Je() + 500, vi()));
      }
      break;
    case 13:
      $i(function() {
        var r = Tr(e, 1);
        if (r !== null) {
          var i = Tt();
          Wn(r, e, 1, i);
        }
      }), Rm(e, 1);
  }
};
nm = function(e) {
  if (e.tag === 13) {
    var t = Tr(e, 134217728);
    if (t !== null) {
      var n = Tt();
      Wn(t, e, 134217728, n);
    }
    Rm(e, 134217728);
  }
};
Iw = function(e) {
  if (e.tag === 13) {
    var t = ri(e), n = Tr(e, t);
    if (n !== null) {
      var r = Tt();
      Wn(n, e, t, r);
    }
    Rm(e, t);
  }
};
Pw = function() {
  return ye;
};
_w = function(e, t) {
  var n = ye;
  try {
    return ye = e, t();
  } finally {
    ye = n;
  }
};
hp = function(e, t, n) {
  switch (t) {
    case "input":
      if (lp(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Cc(r);
            if (!i)
              throw Error(z(90));
            sw(r), lp(r, i);
          }
        }
      }
      break;
    case "textarea":
      cw(e, n);
      break;
    case "select":
      t = n.value, t != null && Oo(e, !!n.multiple, t, !1);
  }
};
vw = Im;
yw = $i;
var _k = { usingClientEntryPoint: !1, Events: [ns, wo, Cc, mw, gw, Im] }, Na = { findFiberByHostInstance: Di, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, Nk = { bundleType: Na.bundleType, version: Na.version, rendererPackageName: Na.rendererPackageName, rendererConfig: Na.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Dr.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Sw(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Na.findFiberByHostInstance || Ik, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var Hs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Hs.isDisabled && Hs.supportsFiber)
    try {
      bc = Hs.inject(Nk), tr = Hs;
    } catch (e) {
    }
}
an.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _k;
an.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fm(t))
    throw Error(z(200));
  return Tk(e, t, null, n);
};
an.createRoot = function(e, t) {
  if (!Fm(e))
    throw Error(z(299));
  var n = !1, r = "", i = eS;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Dm(e, 1, !1, null, null, n, !1, r, i), e[Or] = t.current, Dl(e.nodeType === 8 ? e.parentNode : e), new Lm(t);
};
an.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(z(188)) : (e = Object.keys(e).join(","), Error(z(268, e)));
  return e = Sw(t), e = e === null ? null : e.stateNode, e;
};
an.flushSync = function(e) {
  return $i(e);
};
an.hydrate = function(e, t, n) {
  if (!Dc(t))
    throw Error(z(200));
  return Rc(null, e, t, !0, n);
};
an.hydrateRoot = function(e, t, n) {
  if (!Fm(e))
    throw Error(z(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", a = eS;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Zb(t, null, e, 1, n != null ? n : null, i, !1, o, a), e[Or] = t.current, Dl(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
        n,
        i
      );
  return new Nc(t);
};
an.render = function(e, t, n) {
  if (!Dc(t))
    throw Error(z(200));
  return Rc(null, e, t, !1, n);
};
an.unmountComponentAtNode = function(e) {
  if (!Dc(e))
    throw Error(z(40));
  return e._reactRootContainer ? ($i(function() {
    Rc(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Or] = null;
    });
  }), !0) : !1;
};
an.unstable_batchedUpdates = Im;
an.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Dc(n))
    throw Error(z(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(z(38));
  return Rc(e, t, n, !1, r);
};
an.version = "18.2.0-next-9e3b772b8-20220608";
(function(e) {
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  t(), e.exports = an;
})(Ix);
const Bi = /* @__PURE__ */ jh(si);
var tS, ty = si;
tS = ty.createRoot, ty.hydrateRoot;
const fd = console.log, Dk = {
  sendMsg: (e) => fd("Sending message to backend", e),
  incomingMsgs: {
    subscribe: (e, t) => (fd(`Request for subscription to ${e}:`, t), {
      unsubscribe: () => fd(`Request for removing subscription to ${e}:`, t)
    })
  },
  mode: "HTTPUV"
}, nS = k.createContext(Dk);
function Rk({
  children: e,
  sendMsg: t,
  incomingMsgs: n,
  mode: r
}) {
  return /* @__PURE__ */ y(nS.Provider, { value: { sendMsg: t, incomingMsgs: n, mode: r }, children: e });
}
function is() {
  return k.useContext(nS);
}
var N = {}, Lk = {
  get exports() {
    return N;
  },
  set exports(e) {
    N = e;
  }
}, Fk = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", Mk = Fk, Bk = Mk;
function rS() {
}
function iS() {
}
iS.resetWarningCache = rS;
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
    checkPropTypes: iS,
    resetWarningCache: rS
  };
  return n.PropTypes = n, n;
};
Lk.exports = Uk();
function oS(e) {
  return function(t) {
    return typeof t === e;
  };
}
var zk = oS("function"), Wk = function(e) {
  return e === null;
}, ny = function(e) {
  return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
}, ry = function(e) {
  return !jk(e) && !Wk(e) && (zk(e) || typeof e == "object");
}, jk = oS("undefined"), Hp = globalThis && globalThis.__values || function(e) {
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
    if (!Bt(e[r], t[r]))
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
function Gk(e, t) {
  var n, r, i, o;
  if (e.size !== t.size)
    return !1;
  try {
    for (var a = Hp(e.entries()), l = a.next(); !l.done; l = a.next()) {
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
    for (var u = Hp(e.entries()), c = u.next(); !c.done; c = u.next()) {
      var s = c.value;
      if (!Bt(s[1], t.get(s[0])))
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
function $k(e, t) {
  var n, r;
  if (e.size !== t.size)
    return !1;
  try {
    for (var i = Hp(e.entries()), o = i.next(); !o.done; o = i.next()) {
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
function Bt(e, t) {
  if (e === t)
    return !0;
  if (e && ry(e) && t && ry(t)) {
    if (e.constructor !== t.constructor)
      return !1;
    if (Array.isArray(e) && Array.isArray(t))
      return Yk(e, t);
    if (e instanceof Map && t instanceof Map)
      return Gk(e, t);
    if (e instanceof Set && t instanceof Set)
      return $k(e, t);
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t))
      return Vk(e, t);
    if (ny(e) && ny(t))
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
      if (!(o === "_owner" && e.$$typeof) && !Bt(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return Number.isNaN(e) && Number.isNaN(t) ? !0 : e === t;
}
var Hk = [
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
function Vn(e) {
  return function(t) {
    return Lc(t) === e;
  };
}
function Kk(e) {
  return Jk.includes(e);
}
function sa(e) {
  return function(t) {
    return typeof t === e;
  };
}
function Xk(e) {
  return Qk.includes(e);
}
function R(e) {
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
  if (R.array(e))
    return "Array";
  if (R.plainFunction(e))
    return "Function";
  var t = Lc(e);
  return t || "Object";
}
R.array = Array.isArray;
R.arrayOf = function(e, t) {
  return !R.array(e) && !R.function(t) ? !1 : e.every(function(n) {
    return t(n);
  });
};
R.asyncGeneratorFunction = function(e) {
  return Lc(e) === "AsyncGeneratorFunction";
};
R.asyncFunction = Vn("AsyncFunction");
R.bigint = sa("bigint");
R.boolean = function(e) {
  return e === !0 || e === !1;
};
R.date = Vn("Date");
R.defined = function(e) {
  return !R.undefined(e);
};
R.domElement = function(e) {
  return R.object(e) && !R.plainObject(e) && e.nodeType === 1 && R.string(e.nodeName) && Hk.every(function(t) {
    return t in e;
  });
};
R.empty = function(e) {
  return R.string(e) && e.length === 0 || R.array(e) && e.length === 0 || R.object(e) && !R.map(e) && !R.set(e) && Object.keys(e).length === 0 || R.set(e) && e.size === 0 || R.map(e) && e.size === 0;
};
R.error = Vn("Error");
R.function = sa("function");
R.generator = function(e) {
  return R.iterable(e) && R.function(e.next) && R.function(e.throw);
};
R.generatorFunction = Vn("GeneratorFunction");
R.instanceOf = function(e, t) {
  return !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
};
R.iterable = function(e) {
  return !R.nullOrUndefined(e) && R.function(e[Symbol.iterator]);
};
R.map = Vn("Map");
R.nan = function(e) {
  return Number.isNaN(e);
};
R.null = function(e) {
  return e === null;
};
R.nullOrUndefined = function(e) {
  return R.null(e) || R.undefined(e);
};
R.number = function(e) {
  return sa("number")(e) && !R.nan(e);
};
R.numericString = function(e) {
  return R.string(e) && e.length > 0 && !Number.isNaN(Number(e));
};
R.object = function(e) {
  return !R.nullOrUndefined(e) && (R.function(e) || typeof e == "object");
};
R.oneOf = function(e, t) {
  return R.array(e) ? e.indexOf(t) > -1 : !1;
};
R.plainFunction = Vn("Function");
R.plainObject = function(e) {
  if (Lc(e) !== "Object")
    return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.getPrototypeOf({});
};
R.primitive = function(e) {
  return R.null(e) || Xk(typeof e);
};
R.promise = Vn("Promise");
R.propertyOf = function(e, t, n) {
  if (!R.object(e) || !t)
    return !1;
  var r = e[t];
  return R.function(n) ? n(r) : R.defined(r);
};
R.regexp = Vn("RegExp");
R.set = Vn("Set");
R.string = sa("string");
R.symbol = sa("symbol");
R.undefined = sa("undefined");
R.weakMap = Vn("WeakMap");
R.weakSet = Vn("WeakSet");
function qk() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return e.every(function(n) {
    return R.string(n) || R.array(n) || R.plainObject(n);
  });
}
function Zk(e, t, n) {
  return aS(e, t) ? [e, t].every(R.array) ? !e.some(sy(n)) && t.some(sy(n)) : [e, t].every(R.plainObject) ? !Object.entries(e).some(ly(n)) && Object.entries(t).some(ly(n)) : t === n : !1;
}
function iy(e, t, n) {
  var r = n.actual, i = n.key, o = n.previous, a = n.type, l = er(e, i), s = er(t, i), u = [l, s].every(R.number) && (a === "increased" ? l < s : l > s);
  return R.undefined(r) || (u = u && s === r), R.undefined(o) || (u = u && l === o), u;
}
function oy(e, t, n) {
  var r = n.key, i = n.type, o = n.value, a = er(e, r), l = er(t, r), s = i === "added" ? a : l, u = i === "added" ? l : a;
  if (!R.nullOrUndefined(o)) {
    if (R.defined(s)) {
      if (R.array(s) || R.plainObject(s))
        return Zk(s, u, o);
    } else
      return Bt(u, o);
    return !1;
  }
  return [a, l].every(R.array) ? !u.every(Mm(s)) : [a, l].every(R.plainObject) ? eO(Object.keys(s), Object.keys(u)) : ![a, l].every(function(c) {
    return R.primitive(c) && R.defined(c);
  }) && (i === "added" ? !R.defined(a) && R.defined(l) : R.defined(a) && !R.defined(l));
}
function ay(e, t, n) {
  var r = n === void 0 ? {} : n, i = r.key, o = er(e, i), a = er(t, i);
  if (!aS(o, a))
    throw new TypeError("Inputs have different types");
  if (!qk(o, a))
    throw new TypeError("Inputs don't have length");
  return [o, a].every(R.plainObject) && (o = Object.keys(o), a = Object.keys(a)), [o, a];
}
function ly(e) {
  return function(t) {
    var n = t[0], r = t[1];
    return R.array(e) ? Bt(e, r) || e.some(function(i) {
      return Bt(i, r) || R.array(r) && Mm(r)(i);
    }) : R.plainObject(e) && e[n] ? !!e[n] && Bt(e[n], r) : Bt(e, r);
  };
}
function eO(e, t) {
  return t.some(function(n) {
    return !e.includes(n);
  });
}
function sy(e) {
  return function(t) {
    return R.array(e) ? e.some(function(n) {
      return Bt(n, t) || R.array(t) && Mm(t)(n);
    }) : Bt(e, t);
  };
}
function Da(e, t) {
  return R.array(e) ? e.some(function(n) {
    return Bt(n, t);
  }) : Bt(e, t);
}
function Mm(e) {
  return function(t) {
    return e.some(function(n) {
      return Bt(n, t);
    });
  };
}
function aS() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return e.every(R.array) || e.every(R.number) || e.every(R.plainObject) || e.every(R.string);
}
function er(e, t) {
  if (R.plainObject(e) || R.array(e)) {
    if (R.string(t)) {
      var n = t.split(".");
      return n.reduce(function(r, i) {
        return r && r[i];
      }, e);
    }
    return R.number(t) ? e[t] : e;
  }
  return e;
}
function jl(e, t) {
  if ([e, t].some(R.nullOrUndefined))
    throw new Error("Missing required parameters");
  if (![e, t].every(function(f) {
    return R.plainObject(f) || R.array(f);
  }))
    throw new Error("Expected plain objects or array");
  var n = function(f, d) {
    try {
      return oy(e, t, { key: f, type: "added", value: d });
    } catch (p) {
      return !1;
    }
  }, r = function(f, d, p) {
    try {
      var h = er(e, f), m = er(t, f), S = R.defined(d), g = R.defined(p);
      if (S || g) {
        var v = g ? Da(p, h) : !Da(d, h), w = Da(d, m);
        return v && w;
      }
      return [h, m].every(R.array) || [h, m].every(R.plainObject) ? !Bt(h, m) : h !== m;
    } catch (E) {
      return !1;
    }
  }, i = function(f, d, p) {
    if (!R.defined(f))
      return !1;
    try {
      var h = er(e, f), m = er(t, f), S = R.defined(p);
      return Da(d, h) && (S ? Da(p, m) : !S);
    } catch (g) {
      return !1;
    }
  }, o = function(f, d) {
    return R.defined(f) ? r(f, d) : !1;
  }, a = function(f, d, p) {
    if (!R.defined(f))
      return !1;
    try {
      return iy(e, t, { key: f, actual: d, previous: p, type: "decreased" });
    } catch (h) {
      return !1;
    }
  }, l = function(f) {
    try {
      var d = ay(e, t, { key: f }), p = d[0], h = d[1];
      return !!p.length && !h.length;
    } catch (m) {
      return !1;
    }
  }, s = function(f) {
    try {
      var d = ay(e, t, { key: f }), p = d[0], h = d[1];
      return !p.length && !!h.length;
    } catch (m) {
      return !1;
    }
  }, u = function(f, d, p) {
    if (!R.defined(f))
      return !1;
    try {
      return iy(e, t, { key: f, actual: d, previous: p, type: "increased" });
    } catch (h) {
      return !1;
    }
  }, c = function(f, d) {
    try {
      return oy(e, t, { key: f, type: "removed", value: d });
    } catch (p) {
      return !1;
    }
  };
  return { added: n, changed: r, changedFrom: i, changedTo: o, decreased: a, emptied: l, filled: s, increased: u, removed: c };
}
var tO = [
  "innerHTML",
  "ownerDocument",
  "style",
  "attributes",
  "nodeValue"
], nO = [
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
], rO = [
  "bigint",
  "boolean",
  "null",
  "number",
  "string",
  "symbol",
  "undefined"
];
function Fc(e) {
  const t = Object.prototype.toString.call(e).slice(8, -1);
  if (/HTML\w+Element/.test(t))
    return "HTMLElement";
  if (iO(t))
    return t;
}
function Gn(e) {
  return (t) => Fc(t) === e;
}
function iO(e) {
  return nO.includes(e);
}
function ua(e) {
  return (t) => typeof t === e;
}
function oO(e) {
  return rO.includes(e);
}
function H(e) {
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
  if (H.array(e))
    return "Array";
  if (H.plainFunction(e))
    return "Function";
  const t = Fc(e);
  return t || "Object";
}
H.array = Array.isArray;
H.arrayOf = (e, t) => !H.array(e) && !H.function(t) ? !1 : e.every((n) => t(n));
H.asyncGeneratorFunction = (e) => Fc(e) === "AsyncGeneratorFunction";
H.asyncFunction = Gn("AsyncFunction");
H.bigint = ua("bigint");
H.boolean = (e) => e === !0 || e === !1;
H.date = Gn("Date");
H.defined = (e) => !H.undefined(e);
H.domElement = (e) => H.object(e) && !H.plainObject(e) && e.nodeType === 1 && H.string(e.nodeName) && tO.every((t) => t in e);
H.empty = (e) => H.string(e) && e.length === 0 || H.array(e) && e.length === 0 || H.object(e) && !H.map(e) && !H.set(e) && Object.keys(e).length === 0 || H.set(e) && e.size === 0 || H.map(e) && e.size === 0;
H.error = Gn("Error");
H.function = ua("function");
H.generator = (e) => H.iterable(e) && H.function(e.next) && H.function(e.throw);
H.generatorFunction = Gn("GeneratorFunction");
H.instanceOf = (e, t) => !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
H.iterable = (e) => !H.nullOrUndefined(e) && H.function(e[Symbol.iterator]);
H.map = Gn("Map");
H.nan = (e) => Number.isNaN(e);
H.null = (e) => e === null;
H.nullOrUndefined = (e) => H.null(e) || H.undefined(e);
H.number = (e) => ua("number")(e) && !H.nan(e);
H.numericString = (e) => H.string(e) && e.length > 0 && !Number.isNaN(Number(e));
H.object = (e) => !H.nullOrUndefined(e) && (H.function(e) || typeof e == "object");
H.oneOf = (e, t) => H.array(e) ? e.indexOf(t) > -1 : !1;
H.plainFunction = Gn("Function");
H.plainObject = (e) => {
  if (Fc(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.getPrototypeOf({});
};
H.primitive = (e) => H.null(e) || oO(typeof e);
H.promise = Gn("Promise");
H.propertyOf = (e, t, n) => {
  if (!H.object(e) || !t)
    return !1;
  const r = e[t];
  return H.function(n) ? n(r) : H.defined(r);
};
H.regexp = Gn("RegExp");
H.set = Gn("Set");
H.string = ua("string");
H.symbol = ua("symbol");
H.undefined = ua("undefined");
H.weakMap = Gn("WeakMap");
H.weakSet = Gn("WeakSet");
var Ve = H, Jp = {}, aO = {
  get exports() {
    return Jp;
  },
  set exports(e) {
    Jp = e;
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
})(aO);
const lS = Jp;
var lO = new Error("Element already at target scroll position"), sO = new Error("Scroll cancelled"), uO = Math.min, uy = Date.now, cO = {
  left: cy("scrollLeft"),
  top: cy("scrollTop")
};
function cy(e) {
  return function(n, r, i, o) {
    i = i || {}, typeof i == "function" && (o = i, i = {}), typeof o != "function" && (o = dO);
    var a = uy(), l = n[e], s = i.ease || fO, u = isNaN(i.duration) ? 350 : +i.duration, c = !1;
    return l === r ? o(lO, n[e]) : requestAnimationFrame(d), f;
    function f() {
      c = !0;
    }
    function d(p) {
      if (c)
        return o(sO, n[e]);
      var h = uy(), m = uO(1, (h - a) / u), S = s(m);
      n[e] = S * (r - l) + l, m < 1 ? requestAnimationFrame(d) : requestAnimationFrame(function() {
        o(null, n[e]);
      });
    }
  };
}
function fO(e) {
  return 0.5 * (1 - Math.cos(Math.PI * e));
}
function dO() {
}
var Qp = {}, pO = {
  get exports() {
    return Qp;
  },
  set exports(e) {
    Qp = e;
  }
};
(function(e) {
  (function(t, n) {
    e.exports ? e.exports = n() : t.Scrollparent = n();
  })(ox, function() {
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
})(pO);
const sS = Qp;
var Yr = {}, hO = {
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
var ut = typeof Symbol == "function" && Symbol.for, Bm = ut ? Symbol.for("react.element") : 60103, Um = ut ? Symbol.for("react.portal") : 60106, Mc = ut ? Symbol.for("react.fragment") : 60107, Bc = ut ? Symbol.for("react.strict_mode") : 60108, Uc = ut ? Symbol.for("react.profiler") : 60114, zc = ut ? Symbol.for("react.provider") : 60109, Wc = ut ? Symbol.for("react.context") : 60110, zm = ut ? Symbol.for("react.async_mode") : 60111, jc = ut ? Symbol.for("react.concurrent_mode") : 60111, Yc = ut ? Symbol.for("react.forward_ref") : 60112, Vc = ut ? Symbol.for("react.suspense") : 60113, mO = ut ? Symbol.for("react.suspense_list") : 60120, Gc = ut ? Symbol.for("react.memo") : 60115, $c = ut ? Symbol.for("react.lazy") : 60116, gO = ut ? Symbol.for("react.block") : 60121, vO = ut ? Symbol.for("react.fundamental") : 60117, yO = ut ? Symbol.for("react.responder") : 60118, wO = ut ? Symbol.for("react.scope") : 60119;
function sn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Bm:
        switch (e = e.type, e) {
          case zm:
          case jc:
          case Mc:
          case Uc:
          case Bc:
          case Vc:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case Wc:
              case Yc:
              case $c:
              case Gc:
              case zc:
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
function uS(e) {
  return sn(e) === jc;
}
we.AsyncMode = zm;
we.ConcurrentMode = jc;
we.ContextConsumer = Wc;
we.ContextProvider = zc;
we.Element = Bm;
we.ForwardRef = Yc;
we.Fragment = Mc;
we.Lazy = $c;
we.Memo = Gc;
we.Portal = Um;
we.Profiler = Uc;
we.StrictMode = Bc;
we.Suspense = Vc;
we.isAsyncMode = function(e) {
  return uS(e) || sn(e) === zm;
};
we.isConcurrentMode = uS;
we.isContextConsumer = function(e) {
  return sn(e) === Wc;
};
we.isContextProvider = function(e) {
  return sn(e) === zc;
};
we.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Bm;
};
we.isForwardRef = function(e) {
  return sn(e) === Yc;
};
we.isFragment = function(e) {
  return sn(e) === Mc;
};
we.isLazy = function(e) {
  return sn(e) === $c;
};
we.isMemo = function(e) {
  return sn(e) === Gc;
};
we.isPortal = function(e) {
  return sn(e) === Um;
};
we.isProfiler = function(e) {
  return sn(e) === Uc;
};
we.isStrictMode = function(e) {
  return sn(e) === Bc;
};
we.isSuspense = function(e) {
  return sn(e) === Vc;
};
we.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Mc || e === jc || e === Uc || e === Bc || e === Vc || e === mO || typeof e == "object" && e !== null && (e.$$typeof === $c || e.$$typeof === Gc || e.$$typeof === zc || e.$$typeof === Wc || e.$$typeof === Yc || e.$$typeof === vO || e.$$typeof === yO || e.$$typeof === wO || e.$$typeof === gO);
};
we.typeOf = sn;
(function(e) {
  e.exports = we;
})(hO);
var bO = function(t) {
  return SO(t) && !EO(t);
};
function SO(e) {
  return !!e && typeof e == "object";
}
function EO(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || xO(e);
}
var AO = typeof Symbol == "function" && Symbol.for, CO = AO ? Symbol.for("react.element") : 60103;
function xO(e) {
  return e.$$typeof === CO;
}
function kO(e) {
  return Array.isArray(e) ? [] : {};
}
function Yl(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Ho(kO(e), e, t) : e;
}
function OO(e, t, n) {
  return e.concat(t).map(function(r) {
    return Yl(r, n);
  });
}
function TO(e, t) {
  if (!t.customMerge)
    return Ho;
  var n = t.customMerge(e);
  return typeof n == "function" ? n : Ho;
}
function IO(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function fy(e) {
  return Object.keys(e).concat(IO(e));
}
function cS(e, t) {
  try {
    return t in e;
  } catch (n) {
    return !1;
  }
}
function PO(e, t) {
  return cS(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function _O(e, t, n) {
  var r = {};
  return n.isMergeableObject(e) && fy(e).forEach(function(i) {
    r[i] = Yl(e[i], n);
  }), fy(t).forEach(function(i) {
    PO(e, i) || (cS(e, i) && n.isMergeableObject(t[i]) ? r[i] = TO(i, n)(e[i], t[i], n) : r[i] = Yl(t[i], n));
  }), r;
}
function Ho(e, t, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || OO, n.isMergeableObject = n.isMergeableObject || bO, n.cloneUnlessOtherwiseSpecified = Yl;
  var r = Array.isArray(t), i = Array.isArray(e), o = r === i;
  return o ? r ? n.arrayMerge(e, t, n) : _O(e, t, n) : Yl(t, n);
}
Ho.all = function(t, n) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(r, i) {
    return Ho(r, i, n);
  }, {});
};
var NO = Ho, qn = NO, fS = {};
Object.defineProperty(fS, "__esModule", { value: !0 });
var DO = "The typeValidator argument must be a function with the signature function(props, propName, componentName).", RO = "The error message is optional, but must be a string if provided.", LO = function(t, n, r, i) {
  return typeof t == "boolean" ? t : typeof t == "function" ? t(n, r, i) : !!t && !!t;
}, FO = function(t, n) {
  return Object.hasOwnProperty.call(t, n);
}, MO = function(t, n, r, i) {
  return i ? new Error(i) : new Error("Required " + t[n] + " `" + n + "`" + (" was not specified in `" + r + "`."));
}, BO = function(t, n) {
  if (typeof t != "function")
    throw new TypeError(DO);
  if (n && typeof n != "string")
    throw new TypeError(RO);
}, UO = function(t, n, r) {
  return BO(t, r), function(i, o, a) {
    for (var l = arguments.length, s = Array(3 < l ? l - 3 : 0), u = 3; u < l; u++)
      s[u - 3] = arguments[u];
    return LO(n, i, o, a) ? FO(i, o) ? t.apply(void 0, [i, o, a].concat(s)) : MO(i, o, a, r) : t.apply(void 0, [i, o, a].concat(s));
  };
}, dy = fS.default = UO;
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
var os = typeof window != "undefined" && typeof document != "undefined" && typeof navigator != "undefined", zO = function() {
  for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
    if (os && navigator.userAgent.indexOf(e[t]) >= 0)
      return 1;
  return 0;
}();
function WO(e) {
  var t = !1;
  return function() {
    t || (t = !0, window.Promise.resolve().then(function() {
      t = !1, e();
    }));
  };
}
function jO(e) {
  var t = !1;
  return function() {
    t || (t = !0, setTimeout(function() {
      t = !1, e();
    }, zO));
  };
}
var YO = os && window.Promise, VO = YO ? WO : jO;
function dS(e) {
  var t = {};
  return e && t.toString.call(e) === "[object Function]";
}
function qi(e, t) {
  if (e.nodeType !== 1)
    return [];
  var n = e.ownerDocument.defaultView, r = n.getComputedStyle(e, null);
  return t ? r[t] : r;
}
function Wm(e) {
  return e.nodeName === "HTML" ? e : e.parentNode || e.host;
}
function as(e) {
  if (!e)
    return document.body;
  switch (e.nodeName) {
    case "HTML":
    case "BODY":
      return e.ownerDocument.body;
    case "#document":
      return e.body;
  }
  var t = qi(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
  return /(auto|scroll|overlay)/.test(n + i + r) ? e : as(Wm(e));
}
function pS(e) {
  return e && e.referenceNode ? e.referenceNode : e;
}
var py = os && !!(window.MSInputMethodContext && document.documentMode), hy = os && /MSIE 10/.test(navigator.userAgent);
function ca(e) {
  return e === 11 ? py : e === 10 ? hy : py || hy;
}
function Jo(e) {
  if (!e)
    return document.documentElement;
  for (var t = ca(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling; )
    n = (e = e.nextElementSibling).offsetParent;
  var r = n && n.nodeName;
  return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(n.nodeName) !== -1 && qi(n, "position") === "static" ? Jo(n) : n;
}
function GO(e) {
  var t = e.nodeName;
  return t === "BODY" ? !1 : t === "HTML" || Jo(e.firstElementChild) === e;
}
function Kp(e) {
  return e.parentNode !== null ? Kp(e.parentNode) : e;
}
function Xu(e, t) {
  if (!e || !e.nodeType || !t || !t.nodeType)
    return document.documentElement;
  var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = n ? e : t, i = n ? t : e, o = document.createRange();
  o.setStart(r, 0), o.setEnd(i, 0);
  var a = o.commonAncestorContainer;
  if (e !== a && t !== a || r.contains(i))
    return GO(a) ? a : Jo(a);
  var l = Kp(e);
  return l.host ? Xu(l.host, t) : Xu(e, Kp(t).host);
}
function Qo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", n = t === "top" ? "scrollTop" : "scrollLeft", r = e.nodeName;
  if (r === "BODY" || r === "HTML") {
    var i = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || i;
    return o[n];
  }
  return e[n];
}
function $O(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Qo(t, "top"), i = Qo(t, "left"), o = n ? -1 : 1;
  return e.top += r * o, e.bottom += r * o, e.left += i * o, e.right += i * o, e;
}
function my(e, t) {
  var n = t === "x" ? "Left" : "Top", r = n === "Left" ? "Right" : "Bottom";
  return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"]);
}
function gy(e, t, n, r) {
  return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], ca(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
}
function hS(e) {
  var t = e.body, n = e.documentElement, r = ca(10) && getComputedStyle(n);
  return {
    height: gy("Height", t, n, r),
    width: gy("Width", t, n, r)
  };
}
var HO = function(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}, JO = function() {
  function e(t, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }
  return function(t, n, r) {
    return n && e(t.prototype, n), r && e(t, r), t;
  };
}(), Ko = function(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}, mn = Object.assign || function(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
  }
  return e;
};
function fi(e) {
  return mn({}, e, {
    right: e.left + e.width,
    bottom: e.top + e.height
  });
}
function Xp(e) {
  var t = {};
  try {
    if (ca(10)) {
      t = e.getBoundingClientRect();
      var n = Qo(e, "top"), r = Qo(e, "left");
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
  }, o = e.nodeName === "HTML" ? hS(e.ownerDocument) : {}, a = o.width || e.clientWidth || i.width, l = o.height || e.clientHeight || i.height, s = e.offsetWidth - a, u = e.offsetHeight - l;
  if (s || u) {
    var c = qi(e);
    s -= my(c, "x"), u -= my(c, "y"), i.width -= s, i.height -= u;
  }
  return fi(i);
}
function jm(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = ca(10), i = t.nodeName === "HTML", o = Xp(e), a = Xp(t), l = as(e), s = qi(t), u = parseFloat(s.borderTopWidth), c = parseFloat(s.borderLeftWidth);
  n && i && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
  var f = fi({
    top: o.top - a.top - u,
    left: o.left - a.left - c,
    width: o.width,
    height: o.height
  });
  if (f.marginTop = 0, f.marginLeft = 0, !r && i) {
    var d = parseFloat(s.marginTop), p = parseFloat(s.marginLeft);
    f.top -= u - d, f.bottom -= u - d, f.left -= c - p, f.right -= c - p, f.marginTop = d, f.marginLeft = p;
  }
  return (r && !n ? t.contains(l) : t === l && l.nodeName !== "BODY") && (f = $O(f, t)), f;
}
function QO(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = e.ownerDocument.documentElement, r = jm(e, n), i = Math.max(n.clientWidth, window.innerWidth || 0), o = Math.max(n.clientHeight, window.innerHeight || 0), a = t ? 0 : Qo(n), l = t ? 0 : Qo(n, "left"), s = {
    top: a - r.top + r.marginTop,
    left: l - r.left + r.marginLeft,
    width: i,
    height: o
  };
  return fi(s);
}
function mS(e) {
  var t = e.nodeName;
  if (t === "BODY" || t === "HTML")
    return !1;
  if (qi(e, "position") === "fixed")
    return !0;
  var n = Wm(e);
  return n ? mS(n) : !1;
}
function gS(e) {
  if (!e || !e.parentElement || ca())
    return document.documentElement;
  for (var t = e.parentElement; t && qi(t, "transform") === "none"; )
    t = t.parentElement;
  return t || document.documentElement;
}
function Ym(e, t, n, r) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, a = i ? gS(e) : Xu(e, pS(t));
  if (r === "viewport")
    o = QO(a, i);
  else {
    var l = void 0;
    r === "scrollParent" ? (l = as(Wm(t)), l.nodeName === "BODY" && (l = e.ownerDocument.documentElement)) : r === "window" ? l = e.ownerDocument.documentElement : l = r;
    var s = jm(l, a, i);
    if (l.nodeName === "HTML" && !mS(a)) {
      var u = hS(e.ownerDocument), c = u.height, f = u.width;
      o.top += s.top - s.marginTop, o.bottom = c + s.top, o.left += s.left - s.marginLeft, o.right = f + s.left;
    } else
      o = s;
  }
  n = n || 0;
  var d = typeof n == "number";
  return o.left += d ? n : n.left || 0, o.top += d ? n : n.top || 0, o.right -= d ? n : n.right || 0, o.bottom -= d ? n : n.bottom || 0, o;
}
function KO(e) {
  var t = e.width, n = e.height;
  return t * n;
}
function vS(e, t, n, r, i) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (e.indexOf("auto") === -1)
    return e;
  var a = Ym(n, r, o, i), l = {
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
    return mn({
      key: d
    }, l[d], {
      area: KO(l[d])
    });
  }).sort(function(d, p) {
    return p.area - d.area;
  }), u = s.filter(function(d) {
    var p = d.width, h = d.height;
    return p >= n.clientWidth && h >= n.clientHeight;
  }), c = u.length > 0 ? u[0].key : s[0].key, f = e.split("-")[1];
  return c + (f ? "-" + f : "");
}
function yS(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, i = r ? gS(t) : Xu(t, pS(n));
  return jm(n, i, r);
}
function wS(e) {
  var t = e.ownerDocument.defaultView, n = t.getComputedStyle(e), r = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0), i = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0), o = {
    width: e.offsetWidth + i,
    height: e.offsetHeight + r
  };
  return o;
}
function qu(e) {
  var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return e.replace(/left|right|bottom|top/g, function(n) {
    return t[n];
  });
}
function bS(e, t, n) {
  n = n.split("-")[0];
  var r = wS(e), i = {
    width: r.width,
    height: r.height
  }, o = ["right", "left"].indexOf(n) !== -1, a = o ? "top" : "left", l = o ? "left" : "top", s = o ? "height" : "width", u = o ? "width" : "height";
  return i[a] = t[a] + t[s] / 2 - r[s] / 2, n === l ? i[l] = t[l] - r[u] : i[l] = t[qu(l)], i;
}
function ls(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}
function XO(e, t, n) {
  if (Array.prototype.findIndex)
    return e.findIndex(function(i) {
      return i[t] === n;
    });
  var r = ls(e, function(i) {
    return i[t] === n;
  });
  return e.indexOf(r);
}
function SS(e, t, n) {
  var r = n === void 0 ? e : e.slice(0, XO(e, "name", n));
  return r.forEach(function(i) {
    i.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var o = i.function || i.fn;
    i.enabled && dS(o) && (t.offsets.popper = fi(t.offsets.popper), t.offsets.reference = fi(t.offsets.reference), t = o(t, i));
  }), t;
}
function qO() {
  if (!this.state.isDestroyed) {
    var e = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    e.offsets.reference = yS(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = vS(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = bS(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = SS(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
  }
}
function ES(e, t) {
  return e.some(function(n) {
    var r = n.name, i = n.enabled;
    return i && r === t;
  });
}
function Vm(e) {
  for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
    var i = t[r], o = i ? "" + i + n : e;
    if (typeof document.body.style[o] != "undefined")
      return o;
  }
  return null;
}
function ZO() {
  return this.state.isDestroyed = !0, ES(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[Vm("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function AS(e) {
  var t = e.ownerDocument;
  return t ? t.defaultView : window;
}
function CS(e, t, n, r) {
  var i = e.nodeName === "BODY", o = i ? e.ownerDocument.defaultView : e;
  o.addEventListener(t, n, { passive: !0 }), i || CS(as(o.parentNode), t, n, r), r.push(o);
}
function eT(e, t, n, r) {
  n.updateBound = r, AS(e).addEventListener("resize", n.updateBound, { passive: !0 });
  var i = as(e);
  return CS(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n;
}
function tT() {
  this.state.eventsEnabled || (this.state = eT(this.reference, this.options, this.state, this.scheduleUpdate));
}
function nT(e, t) {
  return AS(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
    n.removeEventListener("scroll", t.updateBound);
  }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}
function rT() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = nT(this.reference, this.state));
}
function Gm(e) {
  return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
}
function qp(e, t) {
  Object.keys(t).forEach(function(n) {
    var r = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(n) !== -1 && Gm(t[n]) && (r = "px"), e.style[n] = t[n] + r;
  });
}
function iT(e, t) {
  Object.keys(t).forEach(function(n) {
    var r = t[n];
    r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n);
  });
}
function oT(e) {
  return qp(e.instance.popper, e.styles), iT(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && qp(e.arrowElement, e.arrowStyles), e;
}
function aT(e, t, n, r, i) {
  var o = yS(i, t, e, n.positionFixed), a = vS(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
  return t.setAttribute("x-placement", a), qp(t, { position: n.positionFixed ? "fixed" : "absolute" }), n;
}
function lT(e, t) {
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
var sT = os && /Firefox/i.test(navigator.userAgent);
function uT(e, t) {
  var n = t.x, r = t.y, i = e.offsets.popper, o = ls(e.instance.modifiers, function(w) {
    return w.name === "applyStyle";
  }).gpuAcceleration;
  o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var a = o !== void 0 ? o : t.gpuAcceleration, l = Jo(e.instance.popper), s = Xp(l), u = {
    position: i.position
  }, c = lT(e, window.devicePixelRatio < 2 || !sT), f = n === "bottom" ? "top" : "bottom", d = r === "right" ? "left" : "right", p = Vm("transform"), h = void 0, m = void 0;
  if (f === "bottom" ? l.nodeName === "HTML" ? m = -l.clientHeight + c.bottom : m = -s.height + c.bottom : m = c.top, d === "right" ? l.nodeName === "HTML" ? h = -l.clientWidth + c.right : h = -s.width + c.right : h = c.left, a && p)
    u[p] = "translate3d(" + h + "px, " + m + "px, 0)", u[f] = 0, u[d] = 0, u.willChange = "transform";
  else {
    var S = f === "bottom" ? -1 : 1, g = d === "right" ? -1 : 1;
    u[f] = m * S, u[d] = h * g, u.willChange = f + ", " + d;
  }
  var v = {
    "x-placement": e.placement
  };
  return e.attributes = mn({}, v, e.attributes), e.styles = mn({}, u, e.styles), e.arrowStyles = mn({}, e.offsets.arrow, e.arrowStyles), e;
}
function xS(e, t, n) {
  var r = ls(e, function(l) {
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
function cT(e, t) {
  var n;
  if (!xS(e.instance.modifiers, "arrow", "keepTogether"))
    return e;
  var r = t.element;
  if (typeof r == "string") {
    if (r = e.instance.popper.querySelector(r), !r)
      return e;
  } else if (!e.instance.popper.contains(r))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
  var i = e.placement.split("-")[0], o = e.offsets, a = o.popper, l = o.reference, s = ["left", "right"].indexOf(i) !== -1, u = s ? "height" : "width", c = s ? "Top" : "Left", f = c.toLowerCase(), d = s ? "left" : "top", p = s ? "bottom" : "right", h = wS(r)[u];
  l[p] - h < a[f] && (e.offsets.popper[f] -= a[f] - (l[p] - h)), l[f] + h > a[p] && (e.offsets.popper[f] += l[f] + h - a[p]), e.offsets.popper = fi(e.offsets.popper);
  var m = l[f] + l[u] / 2 - h / 2, S = qi(e.instance.popper), g = parseFloat(S["margin" + c]), v = parseFloat(S["border" + c + "Width"]), w = m - e.offsets.popper[f] - g - v;
  return w = Math.max(Math.min(a[u] - h, w), 0), e.arrowElement = r, e.offsets.arrow = (n = {}, Ko(n, f, Math.round(w)), Ko(n, d, ""), n), e;
}
function fT(e) {
  return e === "end" ? "start" : e === "start" ? "end" : e;
}
var kS = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], dd = kS.slice(3);
function vy(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = dd.indexOf(e), r = dd.slice(n + 1).concat(dd.slice(0, n));
  return t ? r.reverse() : r;
}
var pd = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function dT(e, t) {
  if (ES(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
    return e;
  var n = Ym(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], i = qu(r), o = e.placement.split("-")[1] || "", a = [];
  switch (t.behavior) {
    case pd.FLIP:
      a = [r, i];
      break;
    case pd.CLOCKWISE:
      a = vy(r);
      break;
    case pd.COUNTERCLOCKWISE:
      a = vy(r, !0);
      break;
    default:
      a = t.behavior;
  }
  return a.forEach(function(l, s) {
    if (r !== l || a.length === s + 1)
      return e;
    r = e.placement.split("-")[0], i = qu(r);
    var u = e.offsets.popper, c = e.offsets.reference, f = Math.floor, d = r === "left" && f(u.right) > f(c.left) || r === "right" && f(u.left) < f(c.right) || r === "top" && f(u.bottom) > f(c.top) || r === "bottom" && f(u.top) < f(c.bottom), p = f(u.left) < f(n.left), h = f(u.right) > f(n.right), m = f(u.top) < f(n.top), S = f(u.bottom) > f(n.bottom), g = r === "left" && p || r === "right" && h || r === "top" && m || r === "bottom" && S, v = ["top", "bottom"].indexOf(r) !== -1, w = !!t.flipVariations && (v && o === "start" && p || v && o === "end" && h || !v && o === "start" && m || !v && o === "end" && S), E = !!t.flipVariationsByContent && (v && o === "start" && h || v && o === "end" && p || !v && o === "start" && S || !v && o === "end" && m), O = w || E;
    (d || g || O) && (e.flipped = !0, (d || g) && (r = a[s + 1]), O && (o = fT(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = mn({}, e.offsets.popper, bS(e.instance.popper, e.offsets.reference, e.placement)), e = SS(e.instance.modifiers, e, "flip"));
  }), e;
}
function pT(e) {
  var t = e.offsets, n = t.popper, r = t.reference, i = e.placement.split("-")[0], o = Math.floor, a = ["top", "bottom"].indexOf(i) !== -1, l = a ? "right" : "bottom", s = a ? "left" : "top", u = a ? "width" : "height";
  return n[l] < o(r[s]) && (e.offsets.popper[s] = o(r[s]) - n[u]), n[s] > o(r[l]) && (e.offsets.popper[s] = o(r[l])), e;
}
function hT(e, t, n, r) {
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
    var s = fi(l);
    return s[t] / 100 * o;
  } else if (a === "vh" || a === "vw") {
    var u = void 0;
    return a === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
  } else
    return o;
}
function mT(e, t, n, r) {
  var i = [0, 0], o = ["right", "left"].indexOf(r) !== -1, a = e.split(/(\+|\-)/).map(function(c) {
    return c.trim();
  }), l = a.indexOf(ls(a, function(c) {
    return c.search(/,|\s/) !== -1;
  }));
  a[l] && a[l].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var s = /\s*,\s*|\s+/, u = l !== -1 ? [a.slice(0, l).concat([a[l].split(s)[0]]), [a[l].split(s)[1]].concat(a.slice(l + 1))] : [a];
  return u = u.map(function(c, f) {
    var d = (f === 1 ? !o : o) ? "height" : "width", p = !1;
    return c.reduce(function(h, m) {
      return h[h.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (h[h.length - 1] = m, p = !0, h) : p ? (h[h.length - 1] += m, p = !1, h) : h.concat(m);
    }, []).map(function(h) {
      return hT(h, d, t, n);
    });
  }), u.forEach(function(c, f) {
    c.forEach(function(d, p) {
      Gm(d) && (i[f] += d * (c[p - 1] === "-" ? -1 : 1));
    });
  }), i;
}
function gT(e, t) {
  var n = t.offset, r = e.placement, i = e.offsets, o = i.popper, a = i.reference, l = r.split("-")[0], s = void 0;
  return Gm(+n) ? s = [+n, 0] : s = mT(n, o, a, l), l === "left" ? (o.top += s[0], o.left -= s[1]) : l === "right" ? (o.top += s[0], o.left += s[1]) : l === "top" ? (o.left += s[0], o.top -= s[1]) : l === "bottom" && (o.left += s[0], o.top += s[1]), e.popper = o, e;
}
function vT(e, t) {
  var n = t.boundariesElement || Jo(e.instance.popper);
  e.instance.reference === n && (n = Jo(n));
  var r = Vm("transform"), i = e.instance.popper.style, o = i.top, a = i.left, l = i[r];
  i.top = "", i.left = "", i[r] = "";
  var s = Ym(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
  i.top = o, i.left = a, i[r] = l, t.boundaries = s;
  var u = t.priority, c = e.offsets.popper, f = {
    primary: function(p) {
      var h = c[p];
      return c[p] < s[p] && !t.escapeWithReference && (h = Math.max(c[p], s[p])), Ko({}, p, h);
    },
    secondary: function(p) {
      var h = p === "right" ? "left" : "top", m = c[h];
      return c[p] > s[p] && !t.escapeWithReference && (m = Math.min(c[h], s[p] - (p === "right" ? c.width : c.height))), Ko({}, h, m);
    }
  };
  return u.forEach(function(d) {
    var p = ["left", "top"].indexOf(d) !== -1 ? "primary" : "secondary";
    c = mn({}, c, f[p](d));
  }), e.offsets.popper = c, e;
}
function yT(e) {
  var t = e.placement, n = t.split("-")[0], r = t.split("-")[1];
  if (r) {
    var i = e.offsets, o = i.reference, a = i.popper, l = ["bottom", "top"].indexOf(n) !== -1, s = l ? "left" : "top", u = l ? "width" : "height", c = {
      start: Ko({}, s, o[s]),
      end: Ko({}, s, o[s] + o[u] - a[u])
    };
    e.offsets.popper = mn({}, a, c[r]);
  }
  return e;
}
function wT(e) {
  if (!xS(e.instance.modifiers, "hide", "preventOverflow"))
    return e;
  var t = e.offsets.reference, n = ls(e.instance.modifiers, function(r) {
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
function bT(e) {
  var t = e.placement, n = t.split("-")[0], r = e.offsets, i = r.popper, o = r.reference, a = ["left", "right"].indexOf(n) !== -1, l = ["top", "left"].indexOf(n) === -1;
  return i[a ? "left" : "top"] = o[n] - (l ? i[a ? "width" : "height"] : 0), e.placement = qu(t), e.offsets.popper = fi(i), e;
}
var ST = {
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
    fn: yT
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
    fn: gT,
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
    fn: vT,
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
    fn: pT
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
    fn: cT,
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
    fn: dT,
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
    fn: bT
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
    fn: wT
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
    fn: uT,
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
    fn: oT,
    /** @prop {Function} */
    onLoad: aT,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
}, ET = {
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
  modifiers: ST
}, Hc = function() {
  function e(t, n) {
    var r = this, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    HO(this, e), this.scheduleUpdate = function() {
      return requestAnimationFrame(r.update);
    }, this.update = VO(this.update.bind(this)), this.options = mn({}, e.Defaults, i), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(mn({}, e.Defaults.modifiers, i.modifiers)).forEach(function(a) {
      r.options.modifiers[a] = mn({}, e.Defaults.modifiers[a] || {}, i.modifiers ? i.modifiers[a] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
      return mn({
        name: a
      }, r.options.modifiers[a]);
    }).sort(function(a, l) {
      return a.order - l.order;
    }), this.modifiers.forEach(function(a) {
      a.enabled && dS(a.onLoad) && a.onLoad(r.reference, r.popper, r.options, a, r.state);
    }), this.update();
    var o = this.options.eventsEnabled;
    o && this.enableEventListeners(), this.state.eventsEnabled = o;
  }
  return JO(e, [{
    key: "update",
    value: function() {
      return qO.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return ZO.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return tT.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return rT.call(this);
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
Hc.Utils = (typeof window != "undefined" ? window : global).PopperUtils;
Hc.placements = kS;
Hc.Defaults = ET;
const yy = Hc;
function wy(e, t) {
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
    t % 2 ? wy(Object(n), !0).forEach(function(r) {
      bt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wy(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ss(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function by(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function us(e, t, n) {
  return t && by(e.prototype, t), n && by(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function bt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function cs(e, t) {
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
  }), t && Zp(e, t);
}
function Zu(e) {
  return Zu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Zu(e);
}
function Zp(e, t) {
  return Zp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Zp(e, t);
}
function AT() {
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
function CT(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function OS(e, t) {
  if (e == null)
    return {};
  var n = CT(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function hr(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xT(e, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return hr(e);
}
function fs(e) {
  var t = AT();
  return function() {
    var r = Zu(e), i;
    if (t) {
      var o = Zu(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else
      i = r.apply(this, arguments);
    return xT(this, i);
  };
}
var kT = { flip: { padding: 20 }, preventOverflow: { padding: 10 } }, ge = { INIT: "init", IDLE: "idle", OPENING: "opening", OPEN: "open", CLOSING: "closing", ERROR: "error" }, yr = lS.canUseDOM, Ra = Bi.createPortal !== void 0;
function hd() {
  return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
}
function Js(e) {
  var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
  a && t && n && (console.groupCollapsed("%creact-floater: ".concat(t), "color: #9b00ff; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
    R.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
  }) : l.apply(console, [n]), console.groupEnd());
}
function OT(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  e.addEventListener(t, n, r);
}
function TT(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  e.removeEventListener(t, n, r);
}
function IT(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i;
  i = function(a) {
    n(a), TT(e, t, i);
  }, OT(e, t, i, r);
}
function Sy() {
}
var TS = /* @__PURE__ */ function(e) {
  cs(n, e);
  var t = fs(n);
  function n() {
    return ss(this, n), t.apply(this, arguments);
  }
  return us(n, [{ key: "componentDidMount", value: function() {
    yr && (this.node || this.appendNode(), Ra || this.renderPortal());
  } }, { key: "componentDidUpdate", value: function() {
    yr && (Ra || this.renderPortal());
  } }, { key: "componentWillUnmount", value: function() {
    !yr || !this.node || (Ra || Bi.unmountComponentAtNode(this.node), this.node && this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
  } }, { key: "appendNode", value: function() {
    var i = this.props, o = i.id, a = i.zIndex;
    this.node || (this.node = document.createElement("div"), o && (this.node.id = o), a && (this.node.style.zIndex = a), document.body.appendChild(this.node));
  } }, { key: "renderPortal", value: function() {
    if (!yr)
      return null;
    var i = this.props, o = i.children, a = i.setRef;
    if (this.node || this.appendNode(), Ra)
      return /* @__PURE__ */ Bi.createPortal(o, this.node);
    var l = Bi.unstable_renderSubtreeIntoContainer(this, o.length > 1 ? /* @__PURE__ */ k.createElement("div", null, o) : o[0], this.node);
    return a(l), null;
  } }, { key: "renderReact16", value: function() {
    var i = this.props, o = i.hasChildren, a = i.placement, l = i.target;
    return o ? this.renderPortal() : l || a === "center" ? this.renderPortal() : null;
  } }, { key: "render", value: function() {
    return Ra ? this.renderReact16() : null;
  } }]), n;
}(k.Component);
bt(TS, "propTypes", { children: N.oneOfType([N.element, N.array]), hasChildren: N.bool, id: N.oneOfType([N.string, N.number]), placement: N.string, setRef: N.func.isRequired, target: N.oneOfType([N.object, N.string]), zIndex: N.number });
var IS = /* @__PURE__ */ function(e) {
  cs(n, e);
  var t = fs(n);
  function n() {
    return ss(this, n), t.apply(this, arguments);
  }
  return us(n, [{ key: "parentStyle", get: function() {
    var i = this.props, o = i.placement, a = i.styles, l = a.arrow.length, s = { pointerEvents: "none", position: "absolute", width: "100%" };
    return o.startsWith("top") ? (s.bottom = 0, s.left = 0, s.right = 0, s.height = l) : o.startsWith("bottom") ? (s.left = 0, s.right = 0, s.top = 0, s.height = l) : o.startsWith("left") ? (s.right = 0, s.top = 0, s.bottom = 0) : o.startsWith("right") && (s.left = 0, s.top = 0), s;
  } }, { key: "render", value: function() {
    var i = this.props, o = i.placement, a = i.setArrowRef, l = i.styles, s = l.arrow, u = s.color, c = s.display, f = s.length, d = s.margin, p = s.position, h = s.spread, m = { display: c, position: p }, S, g = h, v = f;
    return o.startsWith("top") ? (S = "0,0 ".concat(g / 2, ",").concat(v, " ").concat(g, ",0"), m.bottom = 0, m.marginLeft = d, m.marginRight = d) : o.startsWith("bottom") ? (S = "".concat(g, ",").concat(v, " ").concat(g / 2, ",0 0,").concat(v), m.top = 0, m.marginLeft = d, m.marginRight = d) : o.startsWith("left") ? (v = h, g = f, S = "0,0 ".concat(g, ",").concat(v / 2, " 0,").concat(v), m.right = 0, m.marginTop = d, m.marginBottom = d) : o.startsWith("right") && (v = h, g = f, S = "".concat(g, ",").concat(v, " ").concat(g, ",0 0,").concat(v / 2), m.left = 0, m.marginTop = d, m.marginBottom = d), /* @__PURE__ */ k.createElement("div", { className: "__floater__arrow", style: this.parentStyle }, /* @__PURE__ */ k.createElement("span", { ref: a, style: m }, /* @__PURE__ */ k.createElement("svg", { width: g, height: v, version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ k.createElement("polygon", { points: S, fill: u }))));
  } }]), n;
}(k.Component);
bt(IS, "propTypes", { placement: N.string.isRequired, setArrowRef: N.func.isRequired, styles: N.object.isRequired });
var PT = ["color", "height", "width"], PS = function(t) {
  var n = t.handleClick, r = t.styles, i = r.color, o = r.height, a = r.width, l = OS(r, PT);
  return /* @__PURE__ */ k.createElement("button", { "aria-label": "close", onClick: n, style: l, type: "button" }, /* @__PURE__ */ k.createElement("svg", { width: "".concat(a, "px"), height: "".concat(o, "px"), viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, /* @__PURE__ */ k.createElement("g", null, /* @__PURE__ */ k.createElement("path", { d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z", fill: i }))));
};
PS.propTypes = { handleClick: N.func.isRequired, styles: N.object.isRequired };
var _S = function(t) {
  var n = t.content, r = t.footer, i = t.handleClick, o = t.open, a = t.positionWrapper, l = t.showCloseButton, s = t.title, u = t.styles, c = { content: /* @__PURE__ */ k.isValidElement(n) ? n : /* @__PURE__ */ k.createElement("div", { className: "__floater__content", style: u.content }, n) };
  return s && (c.title = /* @__PURE__ */ k.isValidElement(s) ? s : /* @__PURE__ */ k.createElement("div", { className: "__floater__title", style: u.title }, s)), r && (c.footer = /* @__PURE__ */ k.isValidElement(r) ? r : /* @__PURE__ */ k.createElement("div", { className: "__floater__footer", style: u.footer }, r)), (l || a) && !R.boolean(o) && (c.close = /* @__PURE__ */ k.createElement(PS, { styles: u.close, handleClick: i })), /* @__PURE__ */ k.createElement("div", { className: "__floater__container", style: u.container }, c.close, c.title, c.content, c.footer);
};
_S.propTypes = { content: N.node.isRequired, footer: N.node, handleClick: N.func.isRequired, open: N.bool, positionWrapper: N.bool.isRequired, showCloseButton: N.bool.isRequired, styles: N.object.isRequired, title: N.node };
var NS = /* @__PURE__ */ function(e) {
  cs(n, e);
  var t = fs(n);
  function n() {
    return ss(this, n), t.apply(this, arguments);
  }
  return us(n, [{ key: "style", get: function() {
    var i = this.props, o = i.disableAnimation, a = i.component, l = i.placement, s = i.hideArrow, u = i.status, c = i.styles, f = c.arrow.length, d = c.floater, p = c.floaterCentered, h = c.floaterClosing, m = c.floaterOpening, S = c.floaterWithAnimation, g = c.floaterWithComponent, v = {};
    return s || (l.startsWith("top") ? v.padding = "0 0 ".concat(f, "px") : l.startsWith("bottom") ? v.padding = "".concat(f, "px 0 0") : l.startsWith("left") ? v.padding = "0 ".concat(f, "px 0 0") : l.startsWith("right") && (v.padding = "0 0 0 ".concat(f, "px"))), [ge.OPENING, ge.OPEN].indexOf(u) !== -1 && (v = _e(_e({}, v), m)), u === ge.CLOSING && (v = _e(_e({}, v), h)), u === ge.OPEN && !o && (v = _e(_e({}, v), S)), l === "center" && (v = _e(_e({}, v), p)), a && (v = _e(_e({}, v), g)), _e(_e({}, d), v);
  } }, { key: "render", value: function() {
    var i = this.props, o = i.component, a = i.handleClick, l = i.hideArrow, s = i.setFloaterRef, u = i.status, c = {}, f = ["__floater"];
    return o ? /* @__PURE__ */ k.isValidElement(o) ? c.content = /* @__PURE__ */ k.cloneElement(o, { closeFn: a }) : c.content = o({ closeFn: a }) : c.content = /* @__PURE__ */ k.createElement(_S, this.props), u === ge.OPEN && f.push("__floater__open"), l || (c.arrow = /* @__PURE__ */ k.createElement(IS, this.props)), /* @__PURE__ */ k.createElement("div", { ref: s, className: f.join(" "), style: this.style }, /* @__PURE__ */ k.createElement("div", { className: "__floater__body" }, c.content, c.arrow));
  } }]), n;
}(k.Component);
bt(NS, "propTypes", { component: N.oneOfType([N.func, N.element]), content: N.node, disableAnimation: N.bool.isRequired, footer: N.node, handleClick: N.func.isRequired, hideArrow: N.bool.isRequired, open: N.bool, placement: N.string.isRequired, positionWrapper: N.bool.isRequired, setArrowRef: N.func.isRequired, setFloaterRef: N.func.isRequired, showCloseButton: N.bool, status: N.string.isRequired, styles: N.object.isRequired, title: N.node });
var DS = /* @__PURE__ */ function(e) {
  cs(n, e);
  var t = fs(n);
  function n() {
    return ss(this, n), t.apply(this, arguments);
  }
  return us(n, [{ key: "render", value: function() {
    var i = this.props, o = i.children, a = i.handleClick, l = i.handleMouseEnter, s = i.handleMouseLeave, u = i.setChildRef, c = i.setWrapperRef, f = i.style, d = i.styles, p;
    if (o)
      if (k.Children.count(o) === 1)
        if (!/* @__PURE__ */ k.isValidElement(o))
          p = /* @__PURE__ */ k.createElement("span", null, o);
        else {
          var h = R.function(o.type) ? "innerRef" : "ref";
          p = /* @__PURE__ */ k.cloneElement(k.Children.only(o), bt({}, h, u));
        }
      else
        p = o;
    return p ? /* @__PURE__ */ k.createElement("span", { ref: c, style: _e(_e({}, d), f), onClick: a, onMouseEnter: l, onMouseLeave: s }, p) : null;
  } }]), n;
}(k.Component);
bt(DS, "propTypes", { children: N.node, handleClick: N.func.isRequired, handleMouseEnter: N.func.isRequired, handleMouseLeave: N.func.isRequired, setChildRef: N.func.isRequired, setWrapperRef: N.func.isRequired, style: N.object, styles: N.object.isRequired });
var _T = { zIndex: 100 };
function NT(e) {
  var t = qn(_T, e.options || {});
  return { wrapper: { cursor: "help", display: "inline-flex", flexDirection: "column", zIndex: t.zIndex }, wrapperPosition: { left: -1e3, position: "absolute", top: -1e3, visibility: "hidden" }, floater: { display: "inline-block", filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))", maxWidth: 300, opacity: 0, position: "relative", transition: "opacity 0.3s", visibility: "hidden", zIndex: t.zIndex }, floaterOpening: { opacity: 1, visibility: "visible" }, floaterWithAnimation: { opacity: 1, transition: "opacity 0.3s, transform 0.2s", visibility: "visible" }, floaterWithComponent: { maxWidth: "100%" }, floaterClosing: { opacity: 0, visibility: "visible" }, floaterCentered: { left: "50%", position: "fixed", top: "50%", transform: "translate(-50%, -50%)" }, container: { backgroundColor: "#fff", color: "#666", minHeight: 60, minWidth: 200, padding: 20, position: "relative", zIndex: 10 }, title: { borderBottom: "1px solid #555", color: "#555", fontSize: 18, marginBottom: 5, paddingBottom: 6, paddingRight: 18 }, content: { fontSize: 15 }, close: { backgroundColor: "transparent", border: 0, borderRadius: 0, color: "#555", fontSize: 0, height: 15, outline: "none", padding: 10, position: "absolute", right: 0, top: 0, width: 15, WebkitAppearance: "none" }, footer: { borderTop: "1px solid #ccc", fontSize: 13, marginTop: 10, paddingTop: 5 }, arrow: { color: "#fff", display: "inline-flex", length: 16, margin: 8, position: "absolute", spread: 32 }, options: t };
}
var DT = ["arrow", "flip", "offset"], RT = ["position", "top", "right", "bottom", "left"], $m = /* @__PURE__ */ function(e) {
  cs(n, e);
  var t = fs(n);
  function n(r) {
    var i;
    return ss(this, n), i = t.call(this, r), bt(hr(i), "setArrowRef", function(o) {
      i.arrowRef = o;
    }), bt(hr(i), "setChildRef", function(o) {
      i.childRef = o;
    }), bt(hr(i), "setFloaterRef", function(o) {
      i.floaterRef = o;
    }), bt(hr(i), "setWrapperRef", function(o) {
      i.wrapperRef = o;
    }), bt(hr(i), "handleTransitionEnd", function() {
      var o = i.state.status, a = i.props.callback;
      i.wrapperPopper && i.wrapperPopper.instance.update(), i.setState({ status: o === ge.OPENING ? ge.OPEN : ge.IDLE }, function() {
        var l = i.state.status;
        a(l === ge.OPEN ? "open" : "close", i.props);
      });
    }), bt(hr(i), "handleClick", function() {
      var o = i.props, a = o.event, l = o.open;
      if (!R.boolean(l)) {
        var s = i.state, u = s.positionWrapper, c = s.status;
        (i.event === "click" || i.event === "hover" && u) && (Js({ title: "click", data: [{ event: a, status: c === ge.OPEN ? "closing" : "opening" }], debug: i.debug }), i.toggle());
      }
    }), bt(hr(i), "handleMouseEnter", function() {
      var o = i.props, a = o.event, l = o.open;
      if (!(R.boolean(l) || hd())) {
        var s = i.state.status;
        i.event === "hover" && s === ge.IDLE && (Js({ title: "mouseEnter", data: [{ key: "originalEvent", value: a }], debug: i.debug }), clearTimeout(i.eventDelayTimeout), i.toggle());
      }
    }), bt(hr(i), "handleMouseLeave", function() {
      var o = i.props, a = o.event, l = o.eventDelay, s = o.open;
      if (!(R.boolean(s) || hd())) {
        var u = i.state, c = u.status, f = u.positionWrapper;
        i.event === "hover" && (Js({ title: "mouseLeave", data: [{ key: "originalEvent", value: a }], debug: i.debug }), l ? [ge.OPENING, ge.OPEN].indexOf(c) !== -1 && !f && !i.eventDelayTimeout && (i.eventDelayTimeout = setTimeout(function() {
          delete i.eventDelayTimeout, i.toggle();
        }, l * 1e3)) : i.toggle(ge.IDLE));
      }
    }), i.state = { currentPlacement: r.placement, needsUpdate: !1, positionWrapper: r.wrapperOptions.position && !!r.target, status: ge.INIT, statusWrapper: ge.INIT }, i._isMounted = !1, i.hasMounted = !1, yr && window.addEventListener("load", function() {
      i.popper && i.popper.instance.update(), i.wrapperPopper && i.wrapperPopper.instance.update();
    }), i;
  }
  return us(n, [{ key: "componentDidMount", value: function() {
    if (yr) {
      var i = this.state.positionWrapper, o = this.props, a = o.children, l = o.open, s = o.target;
      this._isMounted = !0, Js({ title: "init", data: { hasChildren: !!a, hasTarget: !!s, isControlled: R.boolean(l), positionWrapper: i, target: this.target, floater: this.floaterRef }, debug: this.debug }), this.hasMounted || (this.initPopper(), this.hasMounted = !0), !a && s && R.boolean(l);
    }
  } }, { key: "componentDidUpdate", value: function(i, o) {
    if (yr) {
      var a = this.props, l = a.autoOpen, s = a.open, u = a.target, c = a.wrapperOptions, f = jl(o, this.state), d = f.changedFrom, p = f.changed;
      if (i.open !== s) {
        var h;
        R.boolean(s) && (h = s ? ge.OPENING : ge.CLOSING), this.toggle(h);
      }
      (i.wrapperOptions.position !== c.position || i.target !== u) && this.changeWrapperPosition(this.props), p("status", ge.IDLE) && s ? this.toggle(ge.OPEN) : d("status", ge.INIT, ge.IDLE) && l && this.toggle(ge.OPEN), this.popper && p("status", ge.OPENING) && this.popper.instance.update(), this.floaterRef && (p("status", ge.OPENING) || p("status", ge.CLOSING)) && IT(this.floaterRef, "transitionend", this.handleTransitionEnd), p("needsUpdate", !0) && this.rebuildPopper();
    }
  } }, { key: "componentWillUnmount", value: function() {
    yr && (this._isMounted = !1, this.popper && this.popper.instance.destroy(), this.wrapperPopper && this.wrapperPopper.instance.destroy());
  } }, { key: "initPopper", value: function() {
    var i = this, o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.target, a = this.state.positionWrapper, l = this.props, s = l.disableFlip, u = l.getPopper, c = l.hideArrow, f = l.offset, d = l.placement, p = l.wrapperOptions, h = d === "top" || d === "bottom" ? "flip" : ["right", "bottom-end", "top-end", "left", "top-start", "bottom-start"];
    if (d === "center")
      this.setState({ status: ge.IDLE });
    else if (o && this.floaterRef) {
      var m = this.options, S = m.arrow, g = m.flip, v = m.offset, w = OS(m, DT);
      new yy(o, this.floaterRef, { placement: d, modifiers: _e({ arrow: _e({ enabled: !c, element: this.arrowRef }, S), flip: _e({ enabled: !s, behavior: h }, g), offset: _e({ offset: "0, ".concat(f, "px") }, v) }, w), onCreate: function(b) {
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
      var E = R.undefined(p.offset) ? 0 : p.offset;
      new yy(this.target, this.wrapperRef, { placement: p.placement || d, modifiers: { arrow: { enabled: !1 }, offset: { offset: "0, ".concat(E, "px") }, flip: { enabled: !1 } }, onCreate: function(b) {
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
    R.undefined(i) || (a = i), this.setState({ status: a });
  } }, { key: "debug", get: function() {
    var i = this.props.debug;
    return i || !!global.ReactFloaterDebug;
  } }, { key: "event", get: function() {
    var i = this.props, o = i.disableHoverToClick, a = i.event;
    return a === "hover" && hd() && !o ? "click" : a;
  } }, { key: "options", get: function() {
    var i = this.props.options;
    return qn(kT, i || {});
  } }, { key: "styles", get: function() {
    var i = this, o = this.state, a = o.status, l = o.positionWrapper, s = o.statusWrapper, u = this.props.styles, c = qn(NT(u), u);
    if (l) {
      var f;
      [ge.IDLE].indexOf(a) === -1 || [ge.IDLE].indexOf(s) === -1 ? f = c.wrapperPosition : f = this.wrapperPopper.styles, c.wrapper = _e(_e({}, c.wrapper), f);
    }
    if (this.target) {
      var d = window.getComputedStyle(this.target);
      this.wrapperStyles ? c.wrapper = _e(_e({}, c.wrapper), this.wrapperStyles) : ["relative", "static"].indexOf(d.position) === -1 && (this.wrapperStyles = {}, l || (RT.forEach(function(p) {
        i.wrapperStyles[p] = d[p];
      }), c.wrapper = _e(_e({}, c.wrapper), this.wrapperStyles), this.target.style.position = "relative", this.target.style.top = "auto", this.target.style.right = "auto", this.target.style.bottom = "auto", this.target.style.left = "auto"));
    }
    return c;
  } }, { key: "target", get: function() {
    if (!yr)
      return null;
    var i = this.props.target;
    return i ? R.domElement(i) ? i : document.querySelector(i) : this.childRef || this.wrapperRef;
  } }, { key: "render", value: function() {
    var i = this.state, o = i.currentPlacement, a = i.positionWrapper, l = i.status, s = this.props, u = s.children, c = s.component, f = s.content, d = s.disableAnimation, p = s.footer, h = s.hideArrow, m = s.id, S = s.open, g = s.showCloseButton, v = s.style, w = s.target, E = s.title, O = /* @__PURE__ */ k.createElement(DS, { handleClick: this.handleClick, handleMouseEnter: this.handleMouseEnter, handleMouseLeave: this.handleMouseLeave, setChildRef: this.setChildRef, setWrapperRef: this.setWrapperRef, style: v, styles: this.styles.wrapper }, u), b = {};
    return a ? b.wrapperInPortal = O : b.wrapperAsChildren = O, /* @__PURE__ */ k.createElement("span", null, /* @__PURE__ */ k.createElement(TS, { hasChildren: !!u, id: m, placement: o, setRef: this.setFloaterRef, target: w, zIndex: this.styles.options.zIndex }, /* @__PURE__ */ k.createElement(NS, { component: c, content: f, disableAnimation: d, footer: p, handleClick: this.handleClick, hideArrow: h || o === "center", open: S, placement: o, positionWrapper: a, setArrowRef: this.setArrowRef, setFloaterRef: this.setFloaterRef, showCloseButton: g, status: l, styles: this.styles, title: E }), b.wrapperInPortal), b.wrapperAsChildren);
  } }]), n;
}(k.Component);
bt($m, "propTypes", { autoOpen: N.bool, callback: N.func, children: N.node, component: dy(N.oneOfType([N.func, N.element]), function(e) {
  return !e.content;
}), content: dy(N.node, function(e) {
  return !e.component;
}), debug: N.bool, disableAnimation: N.bool, disableFlip: N.bool, disableHoverToClick: N.bool, event: N.oneOf(["hover", "click"]), eventDelay: N.number, footer: N.node, getPopper: N.func, hideArrow: N.bool, id: N.oneOfType([N.string, N.number]), offset: N.number, open: N.bool, options: N.object, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto", "center"]), showCloseButton: N.bool, style: N.object, styles: N.object, target: N.oneOfType([N.object, N.string]), title: N.node, wrapperOptions: N.shape({ offset: N.number, placement: N.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto"]), position: N.bool }) });
bt($m, "defaultProps", { autoOpen: !1, callback: Sy, debug: !1, disableAnimation: !1, disableFlip: !1, disableHoverToClick: !1, event: "click", eventDelay: 0.4, getPopper: Sy, hideArrow: !1, offset: 15, placement: "bottom", showCloseButton: !1, styles: {}, target: null, wrapperOptions: { position: !1 } });
function Ey(e, t) {
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
    t % 2 ? Ey(Object(n), !0).forEach(function(r) {
      Z(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ey(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rr(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ay(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Lr(e, t, n) {
  return t && Ay(e.prototype, t), n && Ay(e, n), Object.defineProperty(e, "prototype", {
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
function Xt() {
  return Xt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Xt.apply(this, arguments);
}
function Zi(e, t) {
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
  }), t && eh(e, t);
}
function ec(e) {
  return ec = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ec(e);
}
function eh(e, t) {
  return eh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, eh(e, t);
}
function LT() {
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
function FT(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function tc(e, t) {
  if (e == null)
    return {};
  var n = FT(e, t), r, i;
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
function MT(e, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Be(e);
}
function eo(e) {
  var t = LT();
  return function() {
    var r = ec(e), i;
    if (t) {
      var o = ec(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else
      i = r.apply(this, arguments);
    return MT(this, i);
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
}, Ot = {
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
}, Vr = lS.canUseDOM, La = si.createPortal !== void 0;
function RS() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : navigator.userAgent, t = e;
  return typeof window == "undefined" ? t = "node" : document.documentMode ? t = "ie" : /Edge/.test(e) ? t = "edge" : Boolean(window.opera) || e.indexOf(" OPR/") >= 0 ? t = "opera" : typeof window.InstallTrigger != "undefined" ? t = "firefox" : window.chrome ? t = "chrome" : /(Version\/([0-9._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(e) && (t = "safari"), t;
}
function md(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
function Fa(e) {
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
function Cy(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function BT(e, t) {
  return !Ve.plainObject(e) || !Ve.array(t) ? !1 : Object.keys(e).every(function(n) {
    return t.indexOf(n) !== -1;
  });
}
function UT(e) {
  var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = e.replace(t, function(i, o, a, l) {
    return o + o + a + a + l + l;
  }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
  return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [];
}
function xy(e) {
  return e.disableBeacon || e.placement === "center";
}
function th(e, t) {
  var n, r = /* @__PURE__ */ J.isValidElement(e) || /* @__PURE__ */ J.isValidElement(t), i = Ve.undefined(e) || Ve.undefined(t);
  if (md(e) !== md(t) || r || i)
    return !1;
  if (Ve.domElement(e))
    return e.isSameNode(t);
  if (Ve.number(e))
    return e === t;
  if (Ve.function(e))
    return e.toString() === t.toString();
  for (var o in e)
    if (Cy(e, o)) {
      if (typeof e[o] == "undefined" || typeof t[o] == "undefined")
        return !1;
      if (n = md(e[o]), ["object", "array"].indexOf(n) !== -1 && th(e[o], t[o]) || n === "function" && th(e[o], t[o]))
        continue;
      if (e[o] !== t[o])
        return !1;
    }
  for (var a in t)
    if (Cy(t, a) && typeof e[a] == "undefined")
      return !1;
  return !0;
}
function ky() {
  return ["chrome", "safari", "firefox", "opera"].indexOf(RS()) === -1;
}
function Hi(e) {
  var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, l = i ? console.warn || console.error : console.log;
  a && (t && n ? (console.groupCollapsed("%creact-joyride: ".concat(t), "color: #ff0044; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(s) {
    Ve.plainObject(s) && s.key ? l.apply(console, [s.key, s.value]) : l.apply(console, [s]);
  }) : l.apply(console, [n]), console.groupEnd()) : console.error("Missing title or data props"));
}
var zT = {
  action: "",
  controlled: !1,
  index: 0,
  lifecycle: se.INIT,
  size: 0,
  status: de.IDLE
}, Oy = ["action", "index", "lifecycle", "status"];
function WT(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ function() {
    function i() {
      var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = a.continuous, s = l === void 0 ? !1 : l, u = a.stepIndex, c = a.steps, f = c === void 0 ? [] : c;
      Rr(this, i), Z(this, "listener", void 0), Z(this, "setSteps", function(d) {
        var p = o.getState(), h = p.size, m = p.status, S = {
          size: d.length,
          status: m
        };
        n.set("steps", d), m === de.WAITING && !h && d.length && (S.status = de.RUNNING), o.setState(S);
      }), Z(this, "addListener", function(d) {
        o.listener = d;
      }), Z(this, "update", function(d) {
        if (!BT(d, Oy))
          throw new Error("State is not valid. Valid keys: ".concat(Oy.join(", ")));
        o.setState(G({}, o.getNextState(G(G(G({}, o.getState()), d), {}, {
          action: d.action || ce.UPDATE
        }), !0)));
      }), Z(this, "start", function(d) {
        var p = o.getState(), h = p.index, m = p.size;
        o.setState(G(G({}, o.getNextState({
          action: ce.START,
          index: Ve.number(d) ? d : h
        }, !0)), {}, {
          status: m ? de.RUNNING : de.WAITING
        }));
      }), Z(this, "stop", function() {
        var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = o.getState(), h = p.index, m = p.status;
        [de.FINISHED, de.SKIPPED].indexOf(m) === -1 && o.setState(G(G({}, o.getNextState({
          action: ce.STOP,
          index: h + (d ? 1 : 0)
        })), {}, {
          status: de.PAUSED
        }));
      }), Z(this, "close", function() {
        var d = o.getState(), p = d.index, h = d.status;
        h === de.RUNNING && o.setState(G({}, o.getNextState({
          action: ce.CLOSE,
          index: p + 1
        })));
      }), Z(this, "go", function(d) {
        var p = o.getState(), h = p.controlled, m = p.status;
        if (!(h || m !== de.RUNNING)) {
          var S = o.getSteps()[d];
          o.setState(G(G({}, o.getNextState({
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
        p === de.RUNNING && o.setState(G({}, o.getNextState({
          action: ce.UPDATE,
          lifecycle: se.TOOLTIP
        })));
      }), Z(this, "prev", function() {
        var d = o.getState(), p = d.index, h = d.status;
        h === de.RUNNING && o.setState(G({}, o.getNextState({
          action: ce.PREV,
          index: p - 1
        })));
      }), Z(this, "reset", function() {
        var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = o.getState(), h = p.controlled;
        h || o.setState(G(G({}, o.getNextState({
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
        controlled: Ve.number(u),
        continuous: s,
        index: Ve.number(u) ? u : 0,
        lifecycle: se.INIT,
        status: f.length ? de.READY : de.IDLE
      }, !0), this.setSteps(f);
    }
    return Lr(i, [{
      key: "setState",
      value: function(a) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = G(G({}, s), a), c = u.action, f = u.index, d = u.lifecycle, p = u.size, h = u.status;
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
        } : G({}, zT);
      }
    }, {
      key: "getNextState",
      value: function(a) {
        var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.getState(), u = s.action, c = s.controlled, f = s.index, d = s.size, p = s.status, h = Ve.number(a.index) ? a.index : f, m = c && !l ? f : Math.min(Math.max(h, 0), d);
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
function LS(e) {
  return e ? e.getBoundingClientRect() : {};
}
function jT() {
  var e = document, t = e.body, n = e.documentElement;
  return !t || !n ? 0 : Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight);
}
function oi(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function YT(e) {
  return !e || e.nodeType !== 1 ? {} : getComputedStyle(e);
}
function Jc(e, t, n) {
  var r = sS(e);
  if (r.isSameNode(pl()))
    return n ? document : pl();
  var i = r.scrollHeight > r.offsetHeight;
  return !i && !t ? (r.style.overflow = "initial", pl()) : r;
}
function Qc(e, t) {
  if (!e)
    return !1;
  var n = Jc(e, t);
  return !n.isSameNode(pl());
}
function VT(e) {
  return e.offsetParent !== document.body;
}
function Xo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "fixed";
  if (!e || !(e instanceof HTMLElement))
    return !1;
  var n = e.nodeName;
  return n === "BODY" || n === "HTML" ? !1 : YT(e).position === t ? !0 : Xo(e.parentNode, t);
}
function GT(e) {
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
function $T(e, t, n) {
  var r = LS(e), i = Jc(e, n), o = Qc(e, n), a = 0;
  i instanceof HTMLElement && (a = i.scrollTop);
  var l = r.top + (!o && !Xo(e) ? a : 0);
  return Math.floor(l - t);
}
function nh(e) {
  return e instanceof HTMLElement ? e.offsetParent instanceof HTMLElement ? nh(e.offsetParent) + e.offsetTop : e.offsetTop : 0;
}
function HT(e, t, n) {
  if (!e)
    return 0;
  var r = sS(e), i = nh(e);
  return Qc(e, n) && !VT(e) && (i -= nh(r)), Math.floor(i - t);
}
function pl() {
  return document.scrollingElement || document.createElement("body");
}
function JT(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pl(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300;
  return new Promise(function(r, i) {
    var o = t.scrollTop, a = e > o ? e - o : o - e;
    cO.top(t, e, {
      duration: a < 100 ? 50 : n
    }, function(l) {
      return l && l.message !== "Element already at target scroll position" ? i(l) : r();
    });
  });
}
function QT(e) {
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
QT(function(e, t, n, r, i) {
  var o = e[t], a = o;
  if (!/* @__PURE__ */ k.isValidElement(o) && Yr.isValidElementType(o)) {
    var l = {
      ref: function() {
      },
      step: {}
    };
    a = /* @__PURE__ */ k.createElement(a, l);
  }
  if (Ve.string(o) || Ve.number(o) || !Yr.isValidElementType(o) || [Yr.Element, Yr.ForwardRef].indexOf(Yr.typeOf(a)) === -1)
    return new Error("Invalid ".concat(r, " `").concat(i, "` supplied to `").concat(n, "`. Expected a React class or forwardRef."));
});
var KT = {
  arrowColor: "#fff",
  backgroundColor: "#fff",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.5)",
  primaryColor: "#f04",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  zIndex: 100
}, Ma = {
  backgroundColor: "transparent",
  border: 0,
  borderRadius: 0,
  color: "#555",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: 1,
  padding: 8,
  WebkitAppearance: "none"
}, Ty = {
  borderRadius: 4,
  position: "absolute"
};
function XT() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = qn(KT, e.options || {}), n = 290;
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
    beacon: G(G({}, Ma), {}, {
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
      backgroundColor: "rgba(".concat(UT(t.primaryColor).join(","), ", 0.2)"),
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
    buttonNext: G(G({}, Ma), {}, {
      backgroundColor: t.primaryColor,
      borderRadius: 4,
      color: "#fff"
    }),
    buttonBack: G(G({}, Ma), {}, {
      color: t.primaryColor,
      marginLeft: "auto",
      marginRight: 5
    }),
    buttonClose: G(G({}, Ma), {}, {
      color: t.textColor,
      height: 14,
      padding: 15,
      position: "absolute",
      right: 0,
      top: 0,
      width: 14
    }),
    buttonSkip: G(G({}, Ma), {}, {
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
    spotlight: G(G({}, Ty), {}, {
      backgroundColor: "gray"
    }),
    spotlightLegacy: G(G({}, Ty), {}, {
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
  return qn(i, e);
}
var gd = {
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
function qT(e) {
  var t = ["beaconComponent", "disableCloseOnEsc", "disableOverlay", "disableOverlayClose", "disableScrolling", "disableScrollParentFix", "floaterProps", "hideBackButton", "hideCloseButton", "locale", "showProgress", "showSkipButton", "spotlightClicks", "spotlightPadding", "styles", "tooltipComponent"];
  return Object.keys(e).filter(function(n) {
    return t.indexOf(n) !== -1;
  }).reduce(function(n, r) {
    return n[r] = e[r], n;
  }, {});
}
function Ba(e, t) {
  if (!e)
    return null;
  var n = qn.all([qT(t), gd.step, e], {
    isMergeableObject: Ve.plainObject
  }), r = XT(qn(t.styles || {}, e.styles || {})), i = Qc(oi(e.target), n.disableScrollParentFix), o = qn.all([t.floaterProps || {}, gd.floaterProps, n.floaterProps || {}]);
  return o.offset = n.offset, o.styles = qn(o.styles || {}, r.floaterStyles || {}), delete r.floaterStyles, o.offset += t.spotlightPadding || e.spotlightPadding || 0, e.placementBeacon && (o.wrapperOptions.placement = e.placementBeacon), i && (o.options.preventOverflow.boundariesElement = "window"), G(G({}, n), {}, {
    locale: qn.all([gd.locale, t.locale || {}, n.locale || {}]),
    floaterProps: o,
    styles: r
  });
}
function FS(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return Ve.plainObject(e) ? e.target ? !0 : (Hi({
    title: "validateStep",
    data: "target is missing from the step",
    warn: !0,
    debug: t
  }), !1) : (Hi({
    title: "validateStep",
    data: "step must be an object",
    warn: !0,
    debug: t
  }), !1);
}
function Iy(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return Ve.array(e) ? e.every(function(n) {
    return FS(n, t);
  }) : (Hi({
    title: "validateSteps",
    data: "steps must be an array",
    warn: !0,
    debug: t
  }), !1);
}
var ZT = /* @__PURE__ */ Lr(function e(t) {
  var n = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Rr(this, e), Z(this, "element", void 0), Z(this, "options", void 0), Z(this, "canBeTabbed", function(i) {
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
  Zi(n, e);
  var t = eo(n);
  function n(r) {
    var i;
    if (Rr(this, n), i = t.call(this, r), Z(Be(i), "setBeaconRef", function(s) {
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
  return Lr(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this, o = this.props.shouldFocus;
      setTimeout(function() {
        Ve.domElement(i.beacon) && o && i.beacon.focus();
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
        c = /* @__PURE__ */ k.createElement("button", Xt({
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
function tI(e) {
  var t = e.styles;
  return /* @__PURE__ */ k.createElement("div", {
    key: "JoyrideSpotlight",
    className: "react-joyride__spotlight",
    style: t
  });
}
var nI = ["mixBlendMode", "zIndex"], rI = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n() {
    var r;
    Rr(this, n);
    for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return r = t.call.apply(t, [this].concat(o)), Z(Be(r), "_isMounted", !1), Z(Be(r), "state", {
      mouseOverSpotlight: !1,
      isScrolling: !1,
      showSpotlight: !0
    }), Z(Be(r), "handleMouseMove", function(l) {
      var s = r.state.mouseOverSpotlight, u = r.spotlightStyles, c = u.height, f = u.left, d = u.position, p = u.top, h = u.width, m = d === "fixed" ? l.clientY : l.pageY, S = d === "fixed" ? l.clientX : l.pageX, g = m >= p && m <= p + c, v = S >= f && S <= f + h, w = v && g;
      w !== s && r.updateState({
        mouseOverSpotlight: w
      });
    }), Z(Be(r), "handleScroll", function() {
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
        Xo(s, "sticky") && r.updateState({});
    }), Z(Be(r), "handleResize", function() {
      clearTimeout(r.resizeTimeout), r.resizeTimeout = setTimeout(function() {
        r._isMounted && r.forceUpdate();
      }, 100);
    }), r;
  }
  return Lr(n, [{
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
      var o = this, a = this.props, l = a.lifecycle, s = a.spotlightClicks, u = jl(i, this.props), c = u.changed;
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
      var i = this.state.showSpotlight, o = this.props, a = o.disableScrollParentFix, l = o.spotlightClicks, s = o.spotlightPadding, u = o.styles, c = o.target, f = oi(c), d = LS(f), p = Xo(f), h = $T(f, s, a);
      return G(G({}, ky() ? u.spotlightLegacy : u.spotlight), {}, {
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
      ky() && (h = d === "center" ? p.overlayLegacyCenter : p.overlayLegacy);
      var m = G({
        cursor: u ? "default" : "pointer",
        height: jT(),
        pointerEvents: o ? "none" : "auto"
      }, h), S = d !== "center" && a && /* @__PURE__ */ k.createElement(tI, {
        styles: this.spotlightStyles
      });
      if (RS() === "safari") {
        m.mixBlendMode, m.zIndex;
        var g = tc(m, nI);
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
}(k.Component), iI = ["styles"], oI = ["color", "height", "width"];
function aI(e) {
  var t = e.styles, n = tc(e, iI), r = t.color, i = t.height, o = t.width, a = tc(t, oI);
  return /* @__PURE__ */ k.createElement("button", Xt({
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
var lI = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n() {
    return Rr(this, n), t.apply(this, arguments);
  }
  return Lr(n, [{
    key: "render",
    value: function() {
      var i = this.props, o = i.backProps, a = i.closeProps, l = i.continuous, s = i.index, u = i.isLastStep, c = i.primaryProps, f = i.size, d = i.skipProps, p = i.step, h = i.tooltipProps, m = p.content, S = p.hideBackButton, g = p.hideCloseButton, v = p.hideFooter, w = p.showProgress, E = p.showSkipButton, O = p.title, b = p.styles, A = p.locale, T = A.back, P = A.close, _ = A.last, I = A.next, F = A.skip, B = {
        primary: P
      };
      return l && (B.primary = u ? _ : I, w && (B.primary = /* @__PURE__ */ k.createElement("span", null, B.primary, " (", s + 1, "/", f, ")"))), E && !u && (B.skip = /* @__PURE__ */ k.createElement("button", Xt({
        style: b.buttonSkip,
        type: "button",
        "aria-live": "off"
      }, d), F)), !S && s > 0 && (B.back = /* @__PURE__ */ k.createElement("button", Xt({
        style: b.buttonBack,
        type: "button"
      }, o), T)), B.close = !g && /* @__PURE__ */ k.createElement(aI, Xt({
        styles: b.buttonClose
      }, a)), /* @__PURE__ */ k.createElement("div", Xt({
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
      }, B.skip), B.back, /* @__PURE__ */ k.createElement("button", Xt({
        style: b.buttonNext,
        type: "button"
      }, c), B.primary)), B.close);
    }
  }]), n;
}(k.Component), sI = ["beaconComponent", "tooltipComponent"], uI = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n() {
    var r;
    Rr(this, n);
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
      var l = r.props, s = l.continuous, u = l.isLastStep, c = l.setTooltipRef, f = l.step, d = Fa(f.locale.back), p = Fa(f.locale.close), h = Fa(f.locale.last), m = Fa(f.locale.next), S = Fa(f.locale.skip), g = s ? m : p;
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
  return Lr(n, [{
    key: "render",
    value: function() {
      var i = this.props, o = i.continuous, a = i.index, l = i.isLastStep, s = i.size, u = i.step;
      u.beaconComponent;
      var c = u.tooltipComponent, f = tc(u, sI), d;
      if (c) {
        var p = G(G({}, this.getElementsProps()), {}, {
          continuous: o,
          index: a,
          isLastStep: l,
          size: s,
          step: f
        }), h = c;
        d = /* @__PURE__ */ k.createElement(h, p);
      } else
        d = /* @__PURE__ */ k.createElement(lI, Xt({}, this.getElementsProps(), {
          continuous: o,
          index: a,
          isLastStep: l,
          size: s,
          step: u
        }));
      return d;
    }
  }]), n;
}(k.Component), cI = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n() {
    return Rr(this, n), t.apply(this, arguments);
  }
  return Lr(n, [{
    key: "componentDidMount",
    value: function() {
      Vr && (La || this.renderReact15());
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      Vr && (La || this.renderReact15());
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      !Vr || !this.node || (La || Bi.unmountComponentAtNode(this.node), this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
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
      return this.node || this.appendNode(), Bi.unstable_renderSubtreeIntoContainer(this, i, this.node), null;
    }
  }, {
    key: "renderReact16",
    value: function() {
      if (!Vr || !La)
        return null;
      var i = this.props.children;
      return this.node || this.appendNode(), /* @__PURE__ */ Bi.createPortal(i, this.node);
    }
  }, {
    key: "render",
    value: function() {
      return La ? this.renderReact16() : null;
    }
  }]), n;
}(k.Component), fI = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n() {
    var r;
    Rr(this, n);
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
      var u = r.props, c = u.action, f = u.setPopper, d = u.update;
      s === "wrapper" ? r.beaconPopper = l : r.tooltipPopper = l, f(l, s), r.beaconPopper && r.tooltipPopper && d({
        action: c === ce.CLOSE ? ce.CLOSE : c,
        lifecycle: se.READY
      });
    }), r;
  }
  return Lr(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, o = i.debug, a = i.index;
      Hi({
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
      var o = this.props, a = o.action, l = o.callback, s = o.continuous, u = o.controlled, c = o.debug, f = o.index, d = o.lifecycle, p = o.size, h = o.status, m = o.step, S = o.update, g = jl(i, this.props), v = g.changed, w = g.changedFrom, E = {
        action: a,
        controlled: u,
        index: f,
        lifecycle: d,
        size: p,
        status: h
      }, O = s && a !== ce.CLOSE && (f > 0 || a === ce.PREV), b = v("action") || v("index") || v("lifecycle") || v("status"), A = w("lifecycle", [se.TOOLTIP, se.INIT], se.INIT), T = v("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
      if (T && (A || u) && l(G(G({}, E), {}, {
        index: i.index,
        lifecycle: se.COMPLETE,
        step: i.step,
        type: Ot.STEP_AFTER
      })), m.placement === "center" && h === de.RUNNING && v("index") && a !== ce.START && d === se.INIT && S({
        lifecycle: se.READY
      }), b) {
        var P = oi(m.target), _ = !!P, I = _ && GT(P);
        I ? (w("status", de.READY, de.RUNNING) || w("lifecycle", se.INIT, se.READY)) && l(G(G({}, E), {}, {
          step: m,
          type: Ot.STEP_BEFORE
        })) : (console.warn(_ ? "Target not visible" : "Target not mounted", m), l(G(G({}, E), {}, {
          type: Ot.TARGET_NOT_FOUND,
          step: m
        })), u || S({
          index: f + ([ce.PREV].indexOf(a) !== -1 ? -1 : 1)
        }));
      }
      w("lifecycle", se.INIT, se.READY) && S({
        lifecycle: xy(m) || O ? se.TOOLTIP : se.BEACON
      }), v("index") && Hi({
        title: "step:".concat(d),
        data: [{
          key: "props",
          value: this.props
        }],
        debug: c
      }), v("lifecycle", se.BEACON) && l(G(G({}, E), {}, {
        step: m,
        type: Ot.BEACON
      })), v("lifecycle", se.TOOLTIP) && (l(G(G({}, E), {}, {
        step: m,
        type: Ot.TOOLTIP
      })), this.scope = new ZT(this.tooltip, {
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
      return !!(xy(o) || a === se.TOOLTIP);
    }
  }, {
    key: "render",
    value: function() {
      var i = this.props, o = i.continuous, a = i.debug, l = i.helpers, s = i.index, u = i.lifecycle, c = i.nonce, f = i.shouldScroll, d = i.size, p = i.step, h = oi(p.target);
      return !FS(p) || !Ve.domElement(h) ? null : /* @__PURE__ */ k.createElement("div", {
        key: "JoyrideStep-".concat(s),
        className: "react-joyride__step"
      }, /* @__PURE__ */ k.createElement(cI, {
        id: "react-joyride-portal"
      }, /* @__PURE__ */ k.createElement(rI, Xt({}, p, {
        debug: a,
        lifecycle: u,
        onClickOverlay: this.handleClickOverlay
      }))), /* @__PURE__ */ k.createElement($m, Xt({
        component: /* @__PURE__ */ k.createElement(uI, {
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
        isPositioned: p.isFixed || Xo(h),
        open: this.open,
        placement: p.placement,
        target: p.target
      }, p.floaterProps), /* @__PURE__ */ k.createElement(eI, {
        beaconComponent: p.beaconComponent,
        locale: p.locale,
        nonce: c,
        onClickOrHover: this.handleClickHoverBeacon,
        shouldFocus: f,
        styles: p.styles
      })));
    }
  }]), n;
}(k.Component), MS = /* @__PURE__ */ function(e) {
  Zi(n, e);
  var t = eo(n);
  function n(r) {
    var i;
    return Rr(this, n), i = t.call(this, r), Z(Be(i), "initStore", function() {
      var o = i.props, a = o.debug, l = o.getHelpers, s = o.run, u = o.stepIndex;
      i.store = new WT(G(G({}, i.props), {}, {
        controlled: s && Ve.number(u)
      })), i.helpers = i.store.getHelpers();
      var c = i.store.addListener;
      return Hi({
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
      Ve.function(a) && a(o);
    }), Z(Be(i), "handleKeyboard", function(o) {
      var a = i.state, l = a.index, s = a.lifecycle, u = i.props.steps, c = u[l], f = window.Event ? o.which : o.keyCode;
      s === se.TOOLTIP && f === 27 && c && !c.disableCloseOnEsc && i.store.close();
    }), Z(Be(i), "syncState", function(o) {
      i.setState(o);
    }), Z(Be(i), "setPopper", function(o, a) {
      a === "wrapper" ? i.beaconPopper = o : i.tooltipPopper = o;
    }), Z(Be(i), "shouldScroll", function(o, a, l, s, u, c, f) {
      return !o && (a !== 0 || l || s === se.TOOLTIP) && u.placement !== "center" && (!u.isFixed || !Xo(c)) && // fixed steps don't need to scroll
      f.lifecycle !== s && [se.BEACON, se.TOOLTIP].indexOf(s) !== -1;
    }), i.state = i.initStore(), i;
  }
  return Lr(n, [{
    key: "componentDidMount",
    value: function() {
      if (Vr) {
        var i = this.props, o = i.disableCloseOnEsc, a = i.debug, l = i.run, s = i.steps, u = this.store.start;
        Iy(s, a) && l && u(), o || document.body.addEventListener("keydown", this.handleKeyboard, {
          passive: !0
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function(i, o) {
      if (Vr) {
        var a = this.state, l = a.action, s = a.controlled, u = a.index, c = a.lifecycle, f = a.status, d = this.props, p = d.debug, h = d.run, m = d.stepIndex, S = d.steps, g = i.steps, v = i.stepIndex, w = this.store, E = w.reset, O = w.setSteps, b = w.start, A = w.stop, T = w.update, P = jl(i, this.props), _ = P.changed, I = jl(o, this.state), F = I.changed, B = I.changedFrom, q = Ba(S[u], this.props), re = !th(g, S), te = Ve.number(m) && _("stepIndex"), fe = oi(q == null ? void 0 : q.target);
        if (re && (Iy(S, p) ? O(S) : console.warn("Steps are not valid", S)), _("run") && (h ? b(m) : A()), te) {
          var U = v < m ? ce.NEXT : ce.PREV;
          l === ce.STOP && (U = ce.START), [de.FINISHED, de.SKIPPED].indexOf(f) === -1 && T({
            action: l === ce.CLOSE ? ce.CLOSE : U,
            index: m,
            lifecycle: se.INIT
          });
        }
        !s && f === de.RUNNING && u === 0 && !fe && (T({
          index: u + 1
        }), this.callback(G(G({}, this.state), {}, {
          type: Ot.TARGET_NOT_FOUND,
          step: q
        })));
        var V = G(G({}, this.state), {}, {
          index: u,
          step: q
        }), $ = F("action", [ce.NEXT, ce.PREV, ce.SKIP, ce.CLOSE]);
        if ($ && F("status", de.PAUSED)) {
          var x = Ba(S[o.index], this.props);
          this.callback(G(G({}, V), {}, {
            index: o.index,
            lifecycle: se.COMPLETE,
            step: x,
            type: Ot.STEP_AFTER
          }));
        }
        if (F("status", [de.FINISHED, de.SKIPPED])) {
          var C = Ba(S[o.index], this.props);
          s || this.callback(G(G({}, V), {}, {
            index: o.index,
            lifecycle: se.COMPLETE,
            step: C,
            type: Ot.STEP_AFTER
          })), this.callback(G(G({}, V), {}, {
            index: o.index,
            // Return the last step when the tour is finished
            step: C,
            type: Ot.TOUR_END
          })), E();
        } else
          B("status", [de.IDLE, de.READY], de.RUNNING) ? this.callback(G(G({}, V), {}, {
            type: Ot.TOUR_START
          })) : F("status") ? this.callback(G(G({}, V), {}, {
            type: Ot.TOUR_STATUS
          })) : F("action", ce.RESET) && this.callback(G(G({}, V), {}, {
            type: Ot.TOUR_STATUS
          }));
        q && (this.scrollToStep(o), q.placement === "center" && f === de.RUNNING && l === ce.START && c === se.INIT && T({
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
      var o = this.state, a = o.index, l = o.lifecycle, s = o.status, u = this.props, c = u.debug, f = u.disableScrolling, d = u.disableScrollParentFix, p = u.scrollToFirstStep, h = u.scrollOffset, m = u.scrollDuration, S = u.steps, g = Ba(S[a], this.props);
      if (g) {
        var v = oi(g.target), w = this.shouldScroll(f, a, p, l, g, v, i);
        if (s === de.RUNNING && w) {
          var E = Qc(v, d), O = Jc(v, d), b = Math.floor(HT(v, h, d)) || 0;
          if (Hi({
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
            var _ = this.tooltipPopper, I = _.flipped, F = _.placement, B = _.popper;
            ["top", "right", "left"].indexOf(F) !== -1 && !I && !E ? b = Math.floor(B.top - h) : b -= g.spotlightPadding;
          }
          b = b >= 0 ? b : 0, s === de.RUNNING && JT(b, O, m);
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
      var i = this.state, o = i.index, a = i.status, l = this.props, s = l.continuous, u = l.debug, c = l.nonce, f = l.scrollToFirstStep, d = l.steps, p = Ba(d[o], this.props), h;
      return a === de.RUNNING && p && (h = /* @__PURE__ */ k.createElement(fI, Xt({}, this.state, {
        callback: this.callback,
        continuous: s,
        debug: u,
        setPopper: this.setPopper,
        helpers: this.helpers,
        nonce: c,
        shouldScroll: !p.disableScrolling && (o !== 0 || f),
        step: p,
        update: this.store.update
      }))), /* @__PURE__ */ k.createElement("div", {
        className: "react-joyride"
      }, h);
    }
  }]), n;
}(k.Component);
Z(MS, "defaultProps", {
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
const dI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAABq0lEQVRYhe2YsU7DMBCGvyDUDToxsuUREN27gUACBpZuvAMFXgBBH4KtCwMggWDrDuIRujIxAVuXMMRIbuU09vlKiMgnRYniO/uv4zv7mmRZRh1YDjHuX4+Lmsp+beJ6OThMvcde8rasmEaoNo1QbSRCL8mj3L7KmLUfhA4qEXoKDAV+PwyBk1AnidAMOAJGAt+R8Q3eZaRrdAIcAC8BPq/GZyIZMCaYPoAdoHC7shgD28ZHRGzUvwNb5h5jU4pGehoDu8Cno+3LtPnM+ly08ugzsM/0+psAe6YtGs2Eb0d0TGZwEnTM82AIrFvPamgLBbhYQJ/12esTVyky5yT/a8ye/os+/V8opKbKl9p8+qIZdRZjVeJco0Vor92mCvXkGOhrd6qd8HvkpQrAG4q7k+aMdoEr8kBMzHNXq3MtoRvADdCy3rXMu02NATSEpsAj0Ha0tYEHYxNFrNA14MncY2xKiRG6AtzjN1upsV2VDiYV2gLugE6ATwe4ZXodeyMRGhPRdmYIQiL0nDxfSumZPoKQJPwzc9mI/nEO4V/v9QuhEapNbYQGnfCr5BtYaFWUrHRSSwAAAABJRU5ErkJggg==", pI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAiElEQVRYhe3YwQmAIBhA4YxGaaZGaYhGaaZ2sauCB8MX9cP7bnaIxx9imHLOUwTz1wG9DKWFCV1aD/fzKpdPdlsaqikc21qtw0zUUJqhNENphtLChDaP0BcMH8NhJmoozVCaoTRDaYbSDKUZSuv5HyWuaYbfEX6if7iGrr5CmIkm7/BhhtIMpd2GuAxXhhY/aAAAAABJRU5ErkJggg==", hI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAhUlEQVRYhe3ZwQmAMBAAwZxYijVZikVYijXZS/zmoRDJQjjY+ZlHWE6RiFFrLRksswN6GUozlLa+LR7XPf1VcO5btNe5J1pKiY/1adJPtPXnef26E8N7pJmooTRDaYbSDKUZSjOUZiit5zxKGP5iSDNRQ2mG0gylGUpLExr+bIAZSksT+gD98QxXbjF/TQAAAABJRU5ErkJggg==", rh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAgklEQVRYhe3Y0QmAIBRA0Wc0SjM1SkM0SjO1i00gGl2MB/f+2sfhQSqWWmtkaPkbMJpQOqF0aaBr74PjuqftX+e+ldZamokKpRNKJ5ROKF0aaPcIjYjmsTazNBMVSieUbuSvb/XlQv16J0kzUaF0QumE0gmlSwMtPo3DCaUTSpcG+gDcmgtUpwOm6gAAAABJRU5ErkJggg==", BS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAjElEQVRYhe3ZwQmAMBBEUVcsxZosxSIsxZrsJZ4UIQYUh5WB/456+awhCRillM5B/3fAU4SqDa0X87odizeSWk7LNFbPbCZqE9r89Dcy97FqudlMlFA1QtUIVSNUzSb0zRGafou6spkooWqEqmVenD/tGjYTJVSNUDVC1QhVswnl4qwW/GwQI1TNJnQHKA8MWeSBgoAAAAAASUVORK5CYII=", US = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAkklEQVRYhe3ZwQmAMAyF4UQcxZkcxSEcxZncJV70UmlVfEYevO/ay0+KNKBHhDHo/g64S6Fofe1gWtbMjkOYmc3j4OUBzURpQqtXb/s1JDlddYlmogpFUyiaQtEUikYT2npCL5+1TDQTVSiaQtFaX/0Tb5dsLc7pFIqmUDSFoikUDfWEfr5k00zU9bMBTKFoNKEbp/QMWe71dFoAAAAASUVORK5CYII=", mI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVRYhe2ZwQ6CMBBEH8Yv9uDNsMabB38ZLxBRkdDtxlmSzqUktDAvs2yb0A3DwJ51UBuoVQNQqwGotXuAY8nk8+3hfc+8Vxtw3brwfjmt3lckYEAf9TBVCRlBEP8G6HiVjxEAoSqhMAhlCYVAFHUh3rtJrWwc+9n15u40Sb0PGJVJlCYwqXOuW5KNoysJdQKTDGcSWQDACZEJABwQ2QDgG2JVGQGgoF1nBCjqRtkAPs3bz5mjMgEUm4c8AC7z4N+JvWeipR3cbR70CVSZh/IEvGegpcSqzYMugRDzoAEIMw/+j9ireSlVmwddCYWYBw1AmHmArv3gEKsBqNUA1No9wBNu3jnWLc/KGQAAAABJRU5ErkJggg==", gI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAADT0lEQVRYhe2ZP2gUURDGf1ELSy/YpUrELt1BLHIpxAtCOO0SBP80woWAiGyxuWZB2eayxYIiSAJpTBPuQARtJNedacTrgk3IWYlWuVR2EouZl907Lwnue8cRyMDj7e3OMvO9mTfzvb2Rw8NDzrJcGLYDtnIOYNhy5gFcyvqiH8anqZSAMjADdIAmUAF+HvdCFHj/7UdmAKdICfiQ+n0FGAfmgJvAjitDg0ihaRLnK8AocA2oA1eBdZfGBhGBeZ1XosBb0esOsOCH8VdgConQRxfGBhGBgs71Ps/MvRlXxgYB4EDnXJ9nEzrvuTI2CABNnat+GB+B8MM4j1SlP8BnV8Zc74ExIK/XeWDPD+M6Eg2zN14D31wZdAlgDHiHbNIOsAK0kbSpqs5L4JlDm84ATCLlcQpoAbNR4HXMQz+M20ANiYqzCgRu9kB65f9xHiAKvDoSlQLSI0oO7AJuIrAOXAcaUeDNnqDXRspoFQHxXe83gQawkcW4bQSmgdvq3AKAH8a5dPVJizY209zGdTwC3gIPszhgC8A0pHoUeB11fIuk3gPgh/EEkkJEgVdBqIUZi6pWzOKALQCz0ibn8zo6fXSLfhgXAaLAa5uBpA9k7M62e8CsdFvnvqmTur/lh3GDboBm5ZtkEFsAvRHo/W3ENLdd+qfKJrCUxQFbAE3gFpIeLZJuW6SbzBmnQ+AX3ZFqcsIh5zSx3QMmf5eBfRJHq8dUojlkk9dSI7PzYA9gm6Q5HZCQtBawmtKrIGl1D3hqabNLXHTibeAuUhILQCcKPNMTlkGqDkm5fAJcdmAXcEunH+jc0nkRKKdKZx1JuetIyjkRVwBKCNMEWANQPpSjO5VMF76Poyi4ADAJvNfriq40fhiXEQATek0UeA0cR8EWgGGiF4E1c4jXtEmvfNpZp1GwBfCGhIkuwhHvqenz50hlOi4KZUv7VgBGgTvoJxMQJorU+RzSXV+ge4LuKJh71l8nbAAc0YbUAaaG8KNPwGO9t0FPFFyKDZXYQxwr6AcrEM6zizj/O6W7hvSIVT+M50m4USYClxZbLrREchYG+II4/6NHz5y2AhK6sQm8srRvDWAHuEGyoq0TdDcQgjejevuWtgEYOf+PbMhyDmDY8hfkuOfRCqd6WwAAAABJRU5ErkJggg==", vI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVRYhe2ZsQ7CMAxEr4gvZmBDXMXGwC+XgVQqERDbCbEr5ZaoalXdq+0kTqdlWbBnHbwN1GoAeGsAeGv3AMdfN8+3h+ZdVwDcXE8GP7hfTqrnW0UgN99NLQDczAP1AFvzM4xpU6MagNw8vz75R1kBQpgHCrPQF0nNW3eJqjTURiDMl1+liYDUvLWQTRGTRiDcl18lAQhrHigDhDYPlAGYxpDmAXkNhG2cSwBzGolXOoWTJIVCQ0hSiAgMIa0BIiiEZiVmGvOpNVfXgtfuhYhgkbDsRpnGUiS6NDfWfoAIEomajowIAFHbExPvEN1X7BanEsTnGuiiVudChBPENH5wOGsAeGsAeGv3AE8yEDlUwXXxqQAAAABJRU5ErkJggg==", yI = "_icon_1467k_1", wI = {
  icon: yI
}, bI = {
  undo: vI,
  redo: mI,
  tour: gI,
  alignTop: hI,
  alignBottom: pI,
  alignCenter: dI,
  alignSpread: rh,
  alignTextCenter: rh,
  alignTextLeft: BS,
  alignTextRight: US
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
var zS = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, Py = k.createContext && k.createContext(zS), ai = globalThis && globalThis.__assign || function() {
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
function WS(e) {
  return e && e.map(function(t, n) {
    return k.createElement(t.tag, ai({
      key: n
    }, t.attr), WS(t.child));
  });
}
function _t(e) {
  return function(t) {
    return k.createElement(AI, ai({
      attr: ai({}, e.attr)
    }, t), WS(e.child));
  };
}
function AI(e) {
  var t = function(n) {
    var r = e.attr, i = e.size, o = e.title, a = EI(e, ["attr", "size", "title"]), l = i || n.size || "1em", s;
    return n.className && (s = n.className), e.className && (s = (s ? s + " " : "") + e.className), k.createElement("svg", ai({
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
    }), o && k.createElement("title", null, o), e.children);
  };
  return Py !== void 0 ? k.createElement(Py.Consumer, null, function(n) {
    return t(n);
  }) : t(zS);
}
function CI(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" } }, { tag: "path", attr: { d: "M277 360h-42V235h42v125zm0-166h-42v-42h42v42z" } }] })(e);
}
const xI = (e) => /* @__PURE__ */ y(
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
), kI = (e) => /* @__PURE__ */ y(
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
), Kc = (e) => /* @__PURE__ */ L(
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
), OI = (e) => /* @__PURE__ */ y(
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
), TI = (e) => /* @__PURE__ */ y(
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
function Vt(...e) {
  return e.filter((t) => t).join(" ");
}
const II = "_button_1y00r_1", PI = "_regular_1y00r_26", _I = "_icon_1y00r_34", NI = "_transparent_1y00r_42", vd = {
  button: II,
  regular: PI,
  delete: "_delete_1y00r_30",
  icon: _I,
  transparent: NI
}, mt = (i) => {
  var o = i, { children: e, variant: t = "regular", className: n } = o, r = at(o, ["children", "variant", "className"]);
  const a = t ? Array.isArray(t) ? t.map((l) => vd[l]).join(" ") : vd[t] : "";
  return /* @__PURE__ */ y(
    "button",
    Q(M({
      className: Vt(vd.button, a, n)
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
] });
const LI = /* @__PURE__ */ L("div", { children: [
  "Drag elements from the elements palette into the app pane on the right to add them to your app. ",
  /* @__PURE__ */ y("br", {}),
  " In the app view, the areas available for the element to be dropped in will pulse with an",
  " ",
  /* @__PURE__ */ y("span", { className: "can-accept-drop", style: { padding: "2px" }, children: "orange outline." })
] }), FI = /* @__PURE__ */ L("div", { children: [
  /* @__PURE__ */ y("p", { children: "After selecting an element in your app, you can adjust the settings for that element in the properties pane." }),
  /* @__PURE__ */ y("p", { children: "Changes made will be automatically applied to your element both in the app view and your code so there's no need to save or submit these changes." })
] }), MI = [
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
    content: FI,
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
  const [e, t] = J.useState(0), [n, r] = J.useState(!1), i = J.useCallback((a) => {
    const { action: l, index: s, type: u } = a;
    (u === Ot.STEP_AFTER || u === Ot.TARGET_NOT_FOUND) && (l === ce.NEXT ? t(s + 1) : l === ce.PREV ? t(s - 1) : l === ce.CLOSE && r(!1)), u === Ot.TOUR_END && (l === ce.NEXT && (r(!1), t(0)), l === ce.SKIP && r(!1));
  }, []), o = J.useCallback(() => {
    r(!0);
  }, []);
  return /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ L(
      mt,
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
      MS,
      {
        callback: i,
        steps: MI,
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
const _y = "#e07189", UI = "#f6d5dc", zI = {
  options: {
    arrowColor: "var(--rstudio-white, white)",
    backgroundColor: "var(--rstudio-white, white)",
    primaryColor: "var(--rstudio-blue, steelblue)",
    textColor: "var(--rstudio-grey, black)"
  },
  beaconInner: {
    backgroundColor: _y
  },
  beaconOuter: {
    backgroundColor: UI,
    border: `2px solid ${_y}`
  }
};
var jS = WI;
function WI(e, t, n) {
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
var ih = {}, jI = {
  get exports() {
    return ih;
  },
  set exports(e) {
    ih = e;
  }
}, YS = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo = J;
function YI(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var VI = typeof Object.is == "function" ? Object.is : YI, GI = qo.useState, $I = qo.useEffect, HI = qo.useLayoutEffect, JI = qo.useDebugValue;
function QI(e, t) {
  var n = t(), r = GI({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, o = r[1];
  return HI(function() {
    i.value = n, i.getSnapshot = t, yd(i) && o({ inst: i });
  }, [e, n, t]), $I(function() {
    return yd(i) && o({ inst: i }), e(function() {
      yd(i) && o({ inst: i });
    });
  }, [e]), JI(n), n;
}
function yd(e) {
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
var XI = typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined" ? KI : QI;
YS.useSyncExternalStore = qo.useSyncExternalStore !== void 0 ? qo.useSyncExternalStore : XI;
(function(e) {
  e.exports = YS;
})(jI);
var oh = {}, qI = {
  get exports() {
    return oh;
  },
  set exports(e) {
    oh = e;
  }
}, VS = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xc = J, ZI = ih;
function eP(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var tP = typeof Object.is == "function" ? Object.is : eP, nP = ZI.useSyncExternalStore, rP = Xc.useRef, iP = Xc.useEffect, oP = Xc.useMemo, aP = Xc.useDebugValue;
VS.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
  var o = rP(null);
  if (o.current === null) {
    var a = { hasValue: !1, value: null };
    o.current = a;
  } else
    a = o.current;
  o = oP(function() {
    function s(p) {
      if (!u) {
        if (u = !0, c = p, p = r(p), i !== void 0 && a.hasValue) {
          var h = a.value;
          if (i(h, p))
            return f = h;
        }
        return f = p;
      }
      if (h = f, tP(c, p))
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
  var l = nP(e, o[0], o[1]);
  return iP(function() {
    a.hasValue = !0, a.value = l;
  }, [l]), aP(l), l;
};
(function(e) {
  e.exports = VS;
})(qI);
function lP(e) {
  e();
}
let GS = lP;
const sP = (e) => GS = e, uP = () => GS, di = /* @__PURE__ */ J.createContext(null);
function $S() {
  return J.useContext(di);
}
const cP = () => {
  throw new Error("uSES not initialized!");
};
let HS = cP;
const fP = (e) => {
  HS = e;
}, dP = (e, t) => e === t;
function pP(e = di) {
  const t = e === di ? $S : () => J.useContext(e);
  return function(r, i = dP) {
    const {
      store: o,
      subscription: a,
      getServerState: l
    } = t(), s = HS(a.addNestedSub, o.getState, l || o.getState, r, i);
    return J.useDebugValue(s), s;
  };
}
const fa = /* @__PURE__ */ pP();
var JS = Yr, hP = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, mP = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, QS = {};
QS[JS.ForwardRef] = hP;
QS[JS.Memo] = mP;
var Ny = {}, gP = {
  get exports() {
    return Ny;
  },
  set exports(e) {
    Ny = e;
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
var Hm = Symbol.for("react.element"), Jm = Symbol.for("react.portal"), qc = Symbol.for("react.fragment"), Zc = Symbol.for("react.strict_mode"), ef = Symbol.for("react.profiler"), tf = Symbol.for("react.provider"), nf = Symbol.for("react.context"), vP = Symbol.for("react.server_context"), rf = Symbol.for("react.forward_ref"), of = Symbol.for("react.suspense"), af = Symbol.for("react.suspense_list"), lf = Symbol.for("react.memo"), sf = Symbol.for("react.lazy"), yP = Symbol.for("react.offscreen"), KS;
KS = Symbol.for("react.module.reference");
function Cn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Hm:
        switch (e = e.type, e) {
          case qc:
          case ef:
          case Zc:
          case of:
          case af:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case vP:
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
      case Jm:
        return t;
    }
  }
}
be.ContextConsumer = nf;
be.ContextProvider = tf;
be.Element = Hm;
be.ForwardRef = rf;
be.Fragment = qc;
be.Lazy = sf;
be.Memo = lf;
be.Portal = Jm;
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
  return Cn(e) === nf;
};
be.isContextProvider = function(e) {
  return Cn(e) === tf;
};
be.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Hm;
};
be.isForwardRef = function(e) {
  return Cn(e) === rf;
};
be.isFragment = function(e) {
  return Cn(e) === qc;
};
be.isLazy = function(e) {
  return Cn(e) === sf;
};
be.isMemo = function(e) {
  return Cn(e) === lf;
};
be.isPortal = function(e) {
  return Cn(e) === Jm;
};
be.isProfiler = function(e) {
  return Cn(e) === ef;
};
be.isStrictMode = function(e) {
  return Cn(e) === Zc;
};
be.isSuspense = function(e) {
  return Cn(e) === of;
};
be.isSuspenseList = function(e) {
  return Cn(e) === af;
};
be.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === qc || e === ef || e === Zc || e === of || e === af || e === yP || typeof e == "object" && e !== null && (e.$$typeof === sf || e.$$typeof === lf || e.$$typeof === tf || e.$$typeof === nf || e.$$typeof === rf || e.$$typeof === KS || e.getModuleId !== void 0);
};
be.typeOf = Cn;
(function(e) {
  e.exports = be;
})(gP);
function wP() {
  const e = uP();
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
const Dy = {
  notify() {
  },
  get: () => []
};
function bP(e, t) {
  let n, r = Dy;
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
    n || (n = t ? t.addNestedSub(a) : e.subscribe(a), r = wP());
  }
  function u() {
    n && (n(), n = void 0, r.clear(), r = Dy);
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
const SP = typeof window != "undefined" && typeof window.document != "undefined" && typeof window.document.createElement != "undefined", EP = SP ? J.useLayoutEffect : J.useEffect;
function AP({
  store: e,
  context: t,
  children: n,
  serverState: r
}) {
  const i = J.useMemo(() => {
    const l = bP(e);
    return {
      store: e,
      subscription: l,
      getServerState: r ? () => r : void 0
    };
  }, [e, r]), o = J.useMemo(() => e.getState(), [e]);
  EP(() => {
    const {
      subscription: l
    } = i;
    return l.onStateChange = l.notifyNestedSubs, l.trySubscribe(), o !== e.getState() && l.notifyNestedSubs(), () => {
      l.tryUnsubscribe(), l.onStateChange = void 0;
    };
  }, [i, o]);
  const a = t || di;
  return /* @__PURE__ */ k.createElement(a.Provider, {
    value: i
  }, n);
}
function XS(e = di) {
  const t = (
    // @ts-ignore
    e === di ? $S : () => J.useContext(e)
  );
  return function() {
    const {
      store: r
    } = t();
    return r;
  };
}
const qS = /* @__PURE__ */ XS();
function CP(e = di) {
  const t = (
    // @ts-ignore
    e === di ? qS : XS(e)
  );
  return function() {
    return t().dispatch;
  };
}
const to = /* @__PURE__ */ CP();
fP(oh.useSyncExternalStoreWithSelector);
sP(si.unstable_batchedUpdates);
function Un(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  throw Error("[Immer] minified error nr: " + e + (n.length ? " " + n.map(function(i) {
    return "'" + i + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function pi(e) {
  return !!e && !!e[Ne];
}
function Pr(e) {
  var t;
  return !!e && (function(n) {
    if (!n || typeof n != "object")
      return !1;
    var r = Object.getPrototypeOf(n);
    if (r === null)
      return !0;
    var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
    return i === Object || typeof i == "function" && Function.toString.call(i) === DP;
  }(e) || Array.isArray(e) || !!e[zy] || !!(!((t = e.constructor) === null || t === void 0) && t[zy]) || Qm(e) || Km(e));
}
function Ji(e, t, n) {
  n === void 0 && (n = !1), da(e) === 0 ? (n ? Object.keys : Ro)(e).forEach(function(r) {
    n && typeof r == "symbol" || t(r, e[r], e);
  }) : e.forEach(function(r, i) {
    return t(i, r, e);
  });
}
function da(e) {
  var t = e[Ne];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : Qm(e) ? 2 : Km(e) ? 3 : 0;
}
function Do(e, t) {
  return da(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function xP(e, t) {
  return da(e) === 2 ? e.get(t) : e[t];
}
function ZS(e, t, n) {
  var r = da(e);
  r === 2 ? e.set(t, n) : r === 3 ? (e.delete(t), e.add(n)) : e[t] = n;
}
function eE(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function Qm(e) {
  return _P && e instanceof Map;
}
function Km(e) {
  return NP && e instanceof Set;
}
function Pi(e) {
  return e.o || e.t;
}
function Xm(e) {
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  var t = nE(e);
  delete t[Ne];
  for (var n = Ro(t), r = 0; r < n.length; r++) {
    var i = n[r], o = t[i];
    o.writable === !1 && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = { configurable: !0, writable: !0, enumerable: o.enumerable, value: e[i] });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function qm(e, t) {
  return t === void 0 && (t = !1), Zm(e) || pi(e) || !Pr(e) || (da(e) > 1 && (e.set = e.add = e.clear = e.delete = kP), Object.freeze(e), t && Ji(e, function(n, r) {
    return qm(r, !0);
  }, !0)), e;
}
function kP() {
  Un(2);
}
function Zm(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function rr(e) {
  var t = uh[e];
  return t || Un(18, e), t;
}
function OP(e, t) {
  uh[e] || (uh[e] = t);
}
function ah() {
  return Vl;
}
function wd(e, t) {
  t && (rr("Patches"), e.u = [], e.s = [], e.v = t);
}
function nc(e) {
  lh(e), e.p.forEach(TP), e.p = null;
}
function lh(e) {
  e === Vl && (Vl = e.l);
}
function Ry(e) {
  return Vl = { p: [], l: Vl, h: e, m: !0, _: 0 };
}
function TP(e) {
  var t = e[Ne];
  t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
}
function bd(e, t) {
  t._ = t.p.length;
  var n = t.p[0], r = e !== void 0 && e !== n;
  return t.h.g || rr("ES5").S(t, e, r), r ? (n[Ne].P && (nc(t), Un(4)), Pr(e) && (e = rc(t, e), t.l || ic(t, e)), t.u && rr("Patches").M(n[Ne].t, e, t.u, t.s)) : e = rc(t, n, []), nc(t), t.u && t.v(t.u, t.s), e !== tE ? e : void 0;
}
function rc(e, t, n) {
  if (Zm(t))
    return t;
  var r = t[Ne];
  if (!r)
    return Ji(t, function(o, a) {
      return Ly(e, r, t, o, a, n);
    }, !0), t;
  if (r.A !== e)
    return t;
  if (!r.P)
    return ic(e, r.t, !0), r.t;
  if (!r.I) {
    r.I = !0, r.A._--;
    var i = r.i === 4 || r.i === 5 ? r.o = Xm(r.k) : r.o;
    Ji(r.i === 3 ? new Set(i) : i, function(o, a) {
      return Ly(e, r, i, o, a, n);
    }), ic(e, i, !1), n && e.u && rr("Patches").R(r, n, e.u, e.s);
  }
  return r.o;
}
function Ly(e, t, n, r, i, o) {
  if (pi(i)) {
    var a = rc(e, i, o && t && t.i !== 3 && !Do(t.D, r) ? o.concat(r) : void 0);
    if (ZS(n, r, a), !pi(a))
      return;
    e.m = !1;
  }
  if (Pr(i) && !Zm(i)) {
    if (!e.h.F && e._ < 1)
      return;
    rc(e, i), t && t.A.l || ic(e, i);
  }
}
function ic(e, t, n) {
  n === void 0 && (n = !1), e.h.F && e.m && qm(t, n);
}
function Sd(e, t) {
  var n = e[Ne];
  return (n ? Pi(n) : e)[t];
}
function Fy(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n; ) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r)
        return r;
      n = Object.getPrototypeOf(n);
    }
}
function Gr(e) {
  e.P || (e.P = !0, e.l && Gr(e.l));
}
function Ed(e) {
  e.o || (e.o = Xm(e.t));
}
function sh(e, t, n) {
  var r = Qm(t) ? rr("MapSet").N(t, n) : Km(t) ? rr("MapSet").T(t, n) : e.g ? function(i, o) {
    var a = Array.isArray(i), l = { i: a ? 1 : 0, A: o ? o.A : ah(), P: !1, I: !1, D: {}, l: o, t: i, k: null, o: null, j: null, C: !1 }, s = l, u = Gl;
    a && (s = [l], u = Ka);
    var c = Proxy.revocable(s, u), f = c.revoke, d = c.proxy;
    return l.k = d, l.j = f, d;
  }(t, n) : rr("ES5").J(t, n);
  return (n ? n.A : ah()).p.push(r), r;
}
function IP(e) {
  return pi(e) || Un(22, e), function t(n) {
    if (!Pr(n))
      return n;
    var r, i = n[Ne], o = da(n);
    if (i) {
      if (!i.P && (i.i < 4 || !rr("ES5").K(i)))
        return i.t;
      i.I = !0, r = My(n, o), i.I = !1;
    } else
      r = My(n, o);
    return Ji(r, function(a, l) {
      i && xP(i.t, a) === l || ZS(r, a, t(l));
    }), o === 3 ? new Set(r) : r;
  }(e);
}
function My(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return Xm(e);
}
function PP() {
  function e(o, a) {
    var l = i[o];
    return l ? l.enumerable = a : i[o] = l = { configurable: !0, enumerable: a, get: function() {
      var s = this[Ne];
      return Gl.get(s, o);
    }, set: function(s) {
      var u = this[Ne];
      Gl.set(u, o, s);
    } }, l;
  }
  function t(o) {
    for (var a = o.length - 1; a >= 0; a--) {
      var l = o[a][Ne];
      if (!l.P)
        switch (l.i) {
          case 5:
            r(l) && Gr(l);
            break;
          case 4:
            n(l) && Gr(l);
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
        if (p ? p.t !== f : !eE(d, f))
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
  OP("ES5", { J: function(o, a) {
    var l = Array.isArray(o), s = function(c, f) {
      if (c) {
        for (var d = Array(f.length), p = 0; p < f.length; p++)
          Object.defineProperty(d, "" + p, e(p, !0));
        return d;
      }
      var h = nE(f);
      delete h[Ne];
      for (var m = Ro(h), S = 0; S < m.length; S++) {
        var g = m[S];
        h[g] = e(g, c || !!h[g].enumerable);
      }
      return Object.create(Object.getPrototypeOf(f), h);
    }(l, o), u = { i: l ? 5 : 4, A: a ? a.A : ah(), P: !1, I: !1, D: {}, l: a, t: o, k: s, o: null, O: !1, C: !1 };
    return Object.defineProperty(s, Ne, { value: u, writable: !0 }), s;
  }, S: function(o, a, l) {
    l ? pi(a) && a[Ne].A === o && t(o.p) : (o.u && function s(u) {
      if (u && typeof u == "object") {
        var c = u[Ne];
        if (c) {
          var f = c.t, d = c.k, p = c.D, h = c.i;
          if (h === 4)
            Ji(d, function(w) {
              w !== Ne && (f[w] !== void 0 || Do(f, w) ? p[w] || s(d[w]) : (p[w] = !0, Gr(c)));
            }), Ji(f, function(w) {
              d[w] !== void 0 || Do(d, w) || (p[w] = !1, Gr(c));
            });
          else if (h === 5) {
            if (r(c) && (Gr(c), p.length = !0), d.length < f.length)
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
var By, Vl, eg = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", _P = typeof Map != "undefined", NP = typeof Set != "undefined", Uy = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", tE = eg ? Symbol.for("immer-nothing") : ((By = {})["immer-nothing"] = !0, By), zy = eg ? Symbol.for("immer-draftable") : "__$immer_draftable", Ne = eg ? Symbol.for("immer-state") : "__$immer_state", DP = "" + Object.prototype.constructor, Ro = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Object.getOwnPropertyNames, nE = Object.getOwnPropertyDescriptors || function(e) {
  var t = {};
  return Ro(e).forEach(function(n) {
    t[n] = Object.getOwnPropertyDescriptor(e, n);
  }), t;
}, uh = {}, Gl = { get: function(e, t) {
  if (t === Ne)
    return e;
  var n = Pi(e);
  if (!Do(n, t))
    return function(i, o, a) {
      var l, s = Fy(o, a);
      return s ? "value" in s ? s.value : (l = s.get) === null || l === void 0 ? void 0 : l.call(i.k) : void 0;
    }(e, n, t);
  var r = n[t];
  return e.I || !Pr(r) ? r : r === Sd(e.t, t) ? (Ed(e), e.o[t] = sh(e.A.h, r, e)) : r;
}, has: function(e, t) {
  return t in Pi(e);
}, ownKeys: function(e) {
  return Reflect.ownKeys(Pi(e));
}, set: function(e, t, n) {
  var r = Fy(Pi(e), t);
  if (r != null && r.set)
    return r.set.call(e.k, n), !0;
  if (!e.P) {
    var i = Sd(Pi(e), t), o = i == null ? void 0 : i[Ne];
    if (o && o.t === n)
      return e.o[t] = n, e.D[t] = !1, !0;
    if (eE(n, i) && (n !== void 0 || Do(e.t, t)))
      return !0;
    Ed(e), Gr(e);
  }
  return e.o[t] === n && typeof n != "number" && (n !== void 0 || t in e.o) || (e.o[t] = n, e.D[t] = !0, !0);
}, deleteProperty: function(e, t) {
  return Sd(e.t, t) !== void 0 || t in e.t ? (e.D[t] = !1, Ed(e), Gr(e)) : delete e.D[t], e.o && delete e.o[t], !0;
}, getOwnPropertyDescriptor: function(e, t) {
  var n = Pi(e), r = Reflect.getOwnPropertyDescriptor(n, t);
  return r && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: r.enumerable, value: n[t] };
}, defineProperty: function() {
  Un(11);
}, getPrototypeOf: function(e) {
  return Object.getPrototypeOf(e.t);
}, setPrototypeOf: function() {
  Un(12);
} }, Ka = {};
Ji(Gl, function(e, t) {
  Ka[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), Ka.deleteProperty = function(e, t) {
  return Ka.set.call(this, e, t, void 0);
}, Ka.set = function(e, t, n) {
  return Gl.set.call(this, e[0], t, n, e[0]);
};
var RP = function() {
  function e(n) {
    var r = this;
    this.g = Uy, this.F = !0, this.produce = function(i, o, a) {
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
      if (typeof o != "function" && Un(6), a !== void 0 && typeof a != "function" && Un(7), Pr(i)) {
        var c = Ry(r), f = sh(r, i, void 0), d = !0;
        try {
          u = o(f), d = !1;
        } finally {
          d ? nc(c) : lh(c);
        }
        return typeof Promise != "undefined" && u instanceof Promise ? u.then(function(m) {
          return wd(c, a), bd(m, c);
        }, function(m) {
          throw nc(c), m;
        }) : (wd(c, a), bd(u, c));
      }
      if (!i || typeof i != "object") {
        if ((u = o(i)) === void 0 && (u = i), u === tE && (u = void 0), r.F && qm(u, !0), a) {
          var p = [], h = [];
          rr("Patches").M(i, u, p, h), a(p, h);
        }
        return u;
      }
      Un(21, i);
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
    Pr(n) || Un(8), pi(n) && (n = IP(n));
    var r = Ry(this), i = sh(this, n, void 0);
    return i[Ne].C = !0, lh(r), i;
  }, t.finishDraft = function(n, r) {
    var i = n && n[Ne], o = i.A;
    return wd(o, r), bd(void 0, o);
  }, t.setAutoFreeze = function(n) {
    this.F = n;
  }, t.setUseProxies = function(n) {
    n && !Uy && Un(20), this.g = n;
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
    var a = rr("Patches").$;
    return pi(n) ? a(n, r) : this.produce(n, function(l) {
      return a(l, r);
    });
  }, e;
}(), rn = new RP(), yi = rn.produce;
rn.produceWithPatches.bind(rn);
rn.setAutoFreeze.bind(rn);
rn.setUseProxies.bind(rn);
rn.applyPatches.bind(rn);
rn.createDraft.bind(rn);
rn.finishDraft.bind(rn);
function $l(e) {
  return $l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $l(e);
}
function LP(e, t) {
  if ($l(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if ($l(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function FP(e) {
  var t = LP(e, "string");
  return $l(t) === "symbol" ? t : String(t);
}
function MP(e, t, n) {
  return t = FP(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Wy(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function jy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wy(Object(n), !0).forEach(function(r) {
      MP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wy(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function wt(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var Yy = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Ad = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, oc = {
  INIT: "@@redux/INIT" + Ad(),
  REPLACE: "@@redux/REPLACE" + Ad(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Ad();
  }
};
function BP(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function rE(e, t, n) {
  var r;
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(wt(0));
  if (typeof t == "function" && typeof n == "undefined" && (n = t, t = void 0), typeof n != "undefined") {
    if (typeof n != "function")
      throw new Error(wt(1));
    return n(rE)(e, t);
  }
  if (typeof e != "function")
    throw new Error(wt(2));
  var i = e, o = t, a = [], l = a, s = !1;
  function u() {
    l === a && (l = a.slice());
  }
  function c() {
    if (s)
      throw new Error(wt(3));
    return o;
  }
  function f(m) {
    if (typeof m != "function")
      throw new Error(wt(4));
    if (s)
      throw new Error(wt(5));
    var S = !0;
    return u(), l.push(m), function() {
      if (S) {
        if (s)
          throw new Error(wt(6));
        S = !1, u();
        var v = l.indexOf(m);
        l.splice(v, 1), a = null;
      }
    };
  }
  function d(m) {
    if (!BP(m))
      throw new Error(wt(7));
    if (typeof m.type == "undefined")
      throw new Error(wt(8));
    if (s)
      throw new Error(wt(9));
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
      throw new Error(wt(10));
    i = m, d({
      type: oc.REPLACE
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
          throw new Error(wt(11));
        function w() {
          v.next && v.next(c());
        }
        w();
        var E = S(w);
        return {
          unsubscribe: E
        };
      }
    }, m[Yy] = function() {
      return this;
    }, m;
  }
  return d({
    type: oc.INIT
  }), r = {
    dispatch: d,
    subscribe: f,
    getState: c,
    replaceReducer: p
  }, r[Yy] = h, r;
}
function UP(e) {
  Object.keys(e).forEach(function(t) {
    var n = e[t], r = n(void 0, {
      type: oc.INIT
    });
    if (typeof r == "undefined")
      throw new Error(wt(12));
    if (typeof n(void 0, {
      type: oc.PROBE_UNKNOWN_ACTION()
    }) == "undefined")
      throw new Error(wt(13));
  });
}
function zP(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == "function" && (n[i] = e[i]);
  }
  var o = Object.keys(n), a;
  try {
    UP(n);
  } catch (l) {
    a = l;
  }
  return function(s, u) {
    if (s === void 0 && (s = {}), a)
      throw a;
    for (var c = !1, f = {}, d = 0; d < o.length; d++) {
      var p = o[d], h = n[p], m = s[p], S = h(m, u);
      if (typeof S == "undefined")
        throw u && u.type, new Error(wt(14));
      f[p] = S, c = c || S !== m;
    }
    return c = c || o.length !== Object.keys(s).length, c ? f : s;
  };
}
function ac() {
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
function WP() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    return function() {
      var i = r.apply(void 0, arguments), o = function() {
        throw new Error(wt(15));
      }, a = {
        getState: i.getState,
        dispatch: function() {
          return o.apply(void 0, arguments);
        }
      }, l = t.map(function(s) {
        return s(a);
      });
      return o = ac.apply(void 0, l)(i.dispatch), jy(jy({}, i), {}, {
        dispatch: o
      });
    };
  };
}
function iE(e) {
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
var oE = iE();
oE.withExtraArgument = iE;
const Vy = oE;
var jP = globalThis && globalThis.__extends || function() {
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
}(), ds = globalThis && globalThis.__generator || function(e, t) {
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
}, Hl = globalThis && globalThis.__spreadArray || function(e, t) {
  for (var n = 0, r = t.length, i = e.length; n < r; n++, i++)
    e[i] = t[n];
  return e;
}, YP = Object.defineProperty, VP = Object.defineProperties, GP = Object.getOwnPropertyDescriptors, Gy = Object.getOwnPropertySymbols, $P = Object.prototype.hasOwnProperty, HP = Object.prototype.propertyIsEnumerable, $y = function(e, t, n) {
  return t in e ? YP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
}, li = function(e, t) {
  for (var n in t || (t = {}))
    $P.call(t, n) && $y(e, n, t[n]);
  if (Gy)
    for (var r = 0, i = Gy(t); r < i.length; r++) {
      var n = i[r];
      HP.call(t, n) && $y(e, n, t[n]);
    }
  return e;
}, Cd = function(e, t) {
  return VP(e, GP(t));
}, ps = function(e, t, n) {
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
}, JP = typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? ac : ac.apply(null, arguments);
};
function QP(e) {
  if (typeof e != "object" || e === null)
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return t === n;
}
var KP = (
  /** @class */
  function(e) {
    jP(t, e);
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
      return n.length === 1 && Array.isArray(n[0]) ? new (t.bind.apply(t, Hl([void 0], n[0].concat(this))))() : new (t.bind.apply(t, Hl([void 0], n.concat(this))))();
    }, t;
  }(Array)
);
function ch(e) {
  return Pr(e) ? yi(e, function() {
  }) : e;
}
function XP(e) {
  return typeof e == "boolean";
}
function qP() {
  return function(t) {
    return ZP(t);
  };
}
function ZP(e) {
  e === void 0 && (e = {});
  var t = e.thunk, n = t === void 0 ? !0 : t;
  e.immutableCheck, e.serializableCheck;
  var r = new KP();
  return n && (XP(n) ? r.push(Vy) : r.push(Vy.withExtraArgument(n.extraArgument))), r;
}
var e_ = !0;
function t_(e) {
  var t = qP(), n = e || {}, r = n.reducer, i = r === void 0 ? void 0 : r, o = n.middleware, a = o === void 0 ? t() : o, l = n.devTools, s = l === void 0 ? !0 : l, u = n.preloadedState, c = u === void 0 ? void 0 : u, f = n.enhancers, d = f === void 0 ? void 0 : f, p;
  if (typeof i == "function")
    p = i;
  else if (QP(i))
    p = zP(i);
  else
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  var h = a;
  typeof h == "function" && (h = h(t));
  var m = WP.apply(void 0, h), S = ac;
  s && (S = JP(li({
    trace: !e_
  }, typeof s == "object" && s)));
  var g = [m];
  Array.isArray(d) ? g = Hl([m], d) : typeof d == "function" && (g = d(g));
  var v = S.apply(void 0, g);
  return rE(p, c, v);
}
function Cr(e, t) {
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
function aE(e) {
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
function n_(e) {
  return typeof e == "function";
}
function r_(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == "function" ? aE(t) : [t, n, r], o = i[0], a = i[1], l = i[2], s;
  if (n_(e))
    s = function() {
      return ch(e());
    };
  else {
    var u = ch(e);
    s = function() {
      return u;
    };
  }
  function c(f, d) {
    f === void 0 && (f = s());
    var p = Hl([
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
        if (pi(h)) {
          var S = h, g = m(S, d);
          return g === void 0 ? h : g;
        } else {
          if (Pr(h))
            return yi(h, function(v) {
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
function i_(e, t) {
  return e + "/" + t;
}
function tg(e) {
  var t = e.name;
  if (!t)
    throw new Error("`name` is a required option for createSlice");
  var n = typeof e.initialState == "function" ? e.initialState : ch(e.initialState), r = e.reducers || {}, i = Object.keys(r), o = {}, a = {}, l = {};
  i.forEach(function(c) {
    var f = r[c], d = i_(t, c), p, h;
    "reducer" in f ? (p = f.reducer, h = f.prepare) : p = f, o[c] = p, a[d] = p, l[c] = h ? Cr(d, h) : Cr(d);
  });
  function s() {
    var c = typeof e.extraReducers == "function" ? aE(e.extraReducers) : [e.extraReducers], f = c[0], d = f === void 0 ? {} : f, p = c[1], h = p === void 0 ? [] : p, m = c[2], S = m === void 0 ? void 0 : m, g = li(li({}, d), a);
    return r_(n, function(v) {
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
var o_ = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", lE = function(e) {
  e === void 0 && (e = 21);
  for (var t = "", n = e; n--; )
    t += o_[Math.random() * 64 | 0];
  return t;
}, a_ = [
  "name",
  "message",
  "stack",
  "code"
], xd = (
  /** @class */
  function() {
    function e(t, n) {
      this.payload = t, this.meta = n;
    }
    return e;
  }()
), Hy = (
  /** @class */
  function() {
    function e(t, n) {
      this.payload = t, this.meta = n;
    }
    return e;
  }()
), l_ = function(e) {
  if (typeof e == "object" && e !== null) {
    for (var t = {}, n = 0, r = a_; n < r.length; n++) {
      var i = r[n];
      typeof e[i] == "string" && (t[i] = e[i]);
    }
    return t;
  }
  return { message: String(e) };
};
(function() {
  function e(t, n, r) {
    var i = Cr(t + "/fulfilled", function(u, c, f, d) {
      return {
        payload: u,
        meta: Cd(li({}, d || {}), {
          arg: f,
          requestId: c,
          requestStatus: "fulfilled"
        })
      };
    }), o = Cr(t + "/pending", function(u, c, f) {
      return {
        payload: void 0,
        meta: Cd(li({}, f || {}), {
          arg: c,
          requestId: u,
          requestStatus: "pending"
        })
      };
    }), a = Cr(t + "/rejected", function(u, c, f, d, p) {
      return {
        payload: d,
        error: (r && r.serializeError || l_)(u || "Rejected"),
        meta: Cd(li({}, p || {}), {
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
        var p = r != null && r.idGenerator ? r.idGenerator(u) : lE(), h = new l(), m, S = new Promise(function(E, O) {
          return h.signal.addEventListener("abort", function() {
            return O({ name: "AbortError", message: m || "Aborted" });
          });
        }), g = !1;
        function v(E) {
          g && (m = E, h.abort());
        }
        var w = function() {
          return ps(this, null, function() {
            var E, O, b, A, T, P;
            return ds(this, function(_) {
              switch (_.label) {
                case 0:
                  return _.trys.push([0, 4, , 5]), A = (E = r == null ? void 0 : r.condition) == null ? void 0 : E.call(r, u, { getState: f, extra: d }), u_(A) ? [4, A] : [3, 2];
                case 1:
                  A = _.sent(), _.label = 2;
                case 2:
                  if (A === !1)
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  return g = !0, c(o(p, u, (O = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : O.call(r, { requestId: p, arg: u }, { getState: f, extra: d }))), [4, Promise.race([
                    S,
                    Promise.resolve(n(u, {
                      dispatch: c,
                      getState: f,
                      extra: d,
                      requestId: p,
                      signal: h.signal,
                      abort: v,
                      rejectWithValue: function(I, F) {
                        return new xd(I, F);
                      },
                      fulfillWithValue: function(I, F) {
                        return new Hy(I, F);
                      }
                    })).then(function(I) {
                      if (I instanceof xd)
                        throw I;
                      return I instanceof Hy ? i(I.payload, p, u, I.meta) : i(I, p, u);
                    })
                  ])];
                case 3:
                  return b = _.sent(), [3, 5];
                case 4:
                  return T = _.sent(), b = T instanceof xd ? a(null, p, u, T.payload, T.meta) : a(T, p, u), [3, 5];
                case 5:
                  return P = r && !r.dispatchConditionRejection && a.match(b) && b.meta.condition, P || c(b), [2, b];
              }
            });
          });
        }();
        return Object.assign(w, {
          abort: v,
          requestId: p,
          arg: u,
          unwrap: function() {
            return w.then(s_);
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
  return e.withTypes = e, e;
})();
function s_(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function u_(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var ng = function(e, t) {
  if (typeof e != "function")
    throw new TypeError(t + " is not a function");
}, c_ = function() {
}, rg = function(e, t) {
  return t === void 0 && (t = c_), e.catch(t), e;
}, sE = function(e, t) {
  e.addEventListener("abort", t, { once: !0 });
}, Lo = function(e, t) {
  var n = e.signal;
  n.aborted || ("reason" in n || Object.defineProperty(n, "reason", {
    enumerable: !0,
    value: t,
    configurable: !0,
    writable: !0
  }), e.abort(t));
}, f_ = "task", uE = "listener", cE = "completed", ig = "cancelled", d_ = "task-" + ig, p_ = "task-" + cE, fE = uE + "-" + ig, h_ = uE + "-" + cE, uf = (
  /** @class */
  function() {
    function e(t) {
      this.code = t, this.name = "TaskAbortError", this.message = f_ + " " + ig + " (reason: " + t + ")";
    }
    return e;
  }()
), Fo = function(e) {
  if (e.aborted)
    throw new uf(e.reason);
}, dE = function(e) {
  return rg(new Promise(function(t, n) {
    var r = function() {
      return n(new uf(e.reason));
    };
    e.aborted ? r() : sE(e, r);
  }));
}, m_ = function(e, t) {
  return ps(void 0, null, function() {
    var n, r;
    return ds(this, function(i) {
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
            status: r instanceof uf ? "cancelled" : "rejected",
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
}, lc = function(e) {
  return function(t) {
    return rg(Promise.race([dE(e), t]).then(function(n) {
      return Fo(e), n;
    }));
  };
}, pE = function(e) {
  var t = lc(e);
  return function(n) {
    return t(new Promise(function(r) {
      return setTimeout(r, n);
    }));
  };
}, g_ = Object.assign, Jy = {}, hs = "listenerMiddleware", v_ = function(e) {
  var t = function(n) {
    return sE(e, function() {
      return Lo(n, e.reason);
    });
  };
  return function(n) {
    ng(n, "taskExecutor");
    var r = new AbortController();
    t(r);
    var i = m_(function() {
      return ps(void 0, null, function() {
        var o;
        return ds(this, function(a) {
          switch (a.label) {
            case 0:
              return Fo(e), Fo(r.signal), [4, n({
                pause: lc(r.signal),
                delay: pE(r.signal),
                signal: r.signal
              })];
            case 1:
              return o = a.sent(), Fo(r.signal), [2, o];
          }
        });
      });
    }, function() {
      return Lo(r, p_);
    });
    return {
      result: lc(e)(i),
      cancel: function() {
        Lo(r, d_);
      }
    };
  };
}, y_ = function(e, t) {
  var n = function(r, i) {
    return ps(void 0, null, function() {
      var o, a, l, s;
      return ds(this, function(u) {
        switch (u.label) {
          case 0:
            Fo(t), o = function() {
            }, a = new Promise(function(c) {
              o = e({
                predicate: r,
                effect: function(f, d) {
                  d.unsubscribe(), c([
                    f,
                    d.getState(),
                    d.getOriginalState()
                  ]);
                }
              });
            }), l = [
              dE(t),
              a
            ], i != null && l.push(new Promise(function(c) {
              return setTimeout(c, i, null);
            })), u.label = 1;
          case 1:
            return u.trys.push([1, , 3, 4]), [4, Promise.race(l)];
          case 2:
            return s = u.sent(), Fo(t), [2, s];
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
    return rg(n(r, i));
  };
}, hE = function(e) {
  var t = e.type, n = e.actionCreator, r = e.matcher, i = e.predicate, o = e.effect;
  if (t)
    i = Cr(t).match;
  else if (n)
    t = n.type, i = n.match;
  else if (r)
    i = r;
  else if (!i)
    throw new Error("Creating or removing a listener requires one of the known fields for matching an action");
  return ng(o, "options.listener"), { predicate: i, type: t, effect: o };
}, w_ = function(e) {
  var t = hE(e), n = t.type, r = t.predicate, i = t.effect, o = lE(), a = {
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
}, b_ = function(e) {
  return function() {
    e.forEach(fh), e.clear();
  };
}, Qy = function(e, t, n) {
  try {
    e(t, n);
  } catch (r) {
    setTimeout(function() {
      throw r;
    }, 0);
  }
}, S_ = Cr(hs + "/add"), E_ = Cr(hs + "/removeAll"), A_ = Cr(hs + "/remove"), C_ = function() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  console.error.apply(console, Hl([hs + "/error"], e));
}, fh = function(e) {
  e.pending.forEach(function(t) {
    Lo(t, fE);
  });
};
function og(e) {
  var t = this;
  e === void 0 && (e = {});
  var n = /* @__PURE__ */ new Map(), r = e.extra, i = e.onError, o = i === void 0 ? C_ : i;
  ng(o, "onError");
  var a = function(p) {
    return p.unsubscribe = function() {
      return n.delete(p.id);
    }, n.set(p.id, p), function(h) {
      p.unsubscribe(), h != null && h.cancelActive && fh(p);
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
    return h || (h = w_(p)), a(h);
  }, u = function(p) {
    var h = hE(p), m = h.type, S = h.effect, g = h.predicate, v = l(function(w) {
      var E = typeof m == "string" ? w.type === m : w.predicate === g;
      return E && w.effect === S;
    });
    return v && (v.unsubscribe(), p.cancelActive && fh(v)), !!v;
  }, c = function(p, h, m, S) {
    return ps(t, null, function() {
      var g, v, w;
      return ds(this, function(E) {
        switch (E.label) {
          case 0:
            g = new AbortController(), v = y_(s, g.signal), E.label = 1;
          case 1:
            return E.trys.push([1, 3, 4, 5]), p.pending.add(g), [4, Promise.resolve(p.effect(h, g_({}, m, {
              getOriginalState: S,
              condition: function(O, b) {
                return v(O, b).then(Boolean);
              },
              take: v,
              delay: pE(g.signal),
              pause: lc(g.signal),
              extra: r,
              signal: g.signal,
              fork: v_(g.signal),
              unsubscribe: p.unsubscribe,
              subscribe: function() {
                n.set(p.id, p);
              },
              cancelActiveListeners: function() {
                p.pending.forEach(function(O, b, A) {
                  O !== g && (Lo(O, fE), A.delete(O));
                });
              }
            })))];
          case 2:
            return E.sent(), [3, 5];
          case 3:
            return w = E.sent(), w instanceof uf || Qy(o, w, {
              raisedBy: "effect"
            }), [3, 5];
          case 4:
            return Lo(g, h_), p.pending.delete(g), [
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
  }, f = b_(n), d = function(p) {
    return function(h) {
      return function(m) {
        if (S_.match(m))
          return s(m.payload);
        if (E_.match(m)) {
          f();
          return;
        }
        if (A_.match(m))
          return u(m.payload);
        var S = p.getState(), g = function() {
          if (S === Jy)
            throw new Error(hs + ": getOriginalState can only be called synchronously");
          return S;
        }, v;
        try {
          if (v = h(m), n.size > 0)
            for (var w = p.getState(), E = Array.from(n.values()), O = 0, b = E; O < b.length; O++) {
              var A = b[O], T = !1;
              try {
                T = A.predicate(m, w, S);
              } catch (P) {
                T = !1, Qy(o, P, {
                  raisedBy: "predicate"
                });
              }
              T && c(A, m, p, g);
            }
        } finally {
          S = Jy;
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
var Ky;
typeof queueMicrotask == "function" && queueMicrotask.bind(typeof window != "undefined" ? window : global);
PP();
const x_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEAElEQVR4nO3dvW4cVRyG8ceIj4KUcAfbIKIAFlIqXwEIylUiKmwp0KO5iK3S8SEnNAhrSxBwA25CEQckojTTcgchUkyxFDMLloVWLN53Z/6r59eMHU9W51jPnpXmyDN7i8UCadNeGHoA2k2GpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpYgXhx7Aupp5e/mf9oFbwAHwJnBt22PasKfAY+AUOAHOLv5wNp0MMaa1VV+xjoGHwGfATepHBd0cbtLN6SFwXCWmi8qtWBd8B3wAnANf0L27f5tNJ0//y3/uV77lk9b3AuP7+7XXCaOZt9eA63Sr8CfAYTNvXwc+3PgIg6qGdUwX1e/A+7Pp5Jdhh7M5/RvjAfCgmbdfAz/QzfUecDjk2NZR8aPwHbpf8Dk7FtVl/dzeA54DH9PNvYSKYd3uj1/uclRLs+nkV+Cr/tvbq84dk4phHfTHbwcdxXYt53qw8qwRqRjWfn88W3nWbnnUH/0oDHoJYDadnA89kG2ZTSfP+y9fHnQga6gYlgowLEUYliKqXiD9tz3D0ao01k0pGxb/bJmM7bW2+dqj5UehIiqvWJvYON7KJvSGX68EVyxFGJYiDEsRhqUIw1KEYSnCsBRhWIqofIHULZ0Rc8VSROUVyy2dEXPFUoRhKcKwFGFYijAsRRiWIgxLEYaliMoXSN3SGTFXLEVUXrHc0hmxsmFd9Yav2/zr5E3cnLbaX1P7UagIw1KEYSmiYlh/AjTztszd7a6qv/c7dE+tKKFiWMt7j+6vPGu3XO+PjwcdxRoqhnXaH28NOortWs71dOVZI1IxrJP+eKeZt28NOpItaObtDeBO/+3JqnPHpGJYZ8B94BXgx2bevj3scHL6N85PdHO9T6FbkFe9QHoIvEb3jJmfm3n7OfAN8GQ2nfwx6MiuqJm3rwJvAB8Bn9Ldgvt7Cj1HB2BvsSi1U3D5CvQxxX7h/8O92XRytJx3lUfMVfwovOgIeBe4S/dsv2eDjmYzntHN5S7d3I6qbedAwRVLNVRfsTRShqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYi/gL6TZmwrBJftQAAAABJRU5ErkJggg==", sc = (e, t) => Array.from({ length: e }, (n, r) => r), uc = (e, t) => {
  const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
  return Array.from({ length: n }, (i, o) => e + o * r);
};
function Xy(e) {
  let t = 1 / 0, n = -1 / 0;
  for (let o of e)
    o < t && (t = o), o > n && (n = o);
  const r = n - t, i = Array.isArray(e) ? e.length : e.size;
  return { minVal: t, maxVal: n, span: r, isSequence: r === i - 1 };
}
function Jl(e, t) {
  return [...new Array(t)].fill(e);
}
function k_(e, t) {
  return e.filter((n) => !t.includes(n));
}
function dh(e, t) {
  return [...e.slice(0, t), ...e.slice(t + 1)];
}
function Zo(e, t, n) {
  if (t < 0)
    throw new Error("Can't add item at a negative index");
  const r = [...e];
  return t > r.length - 1 && (r.length = t), r.splice(t, 0, n), r;
}
function O_(e, t, n) {
  if (n < 0)
    throw new Error("Can't add item at a negative index");
  if (t < 0 || t > e.length)
    throw new Error("Requested to move an element that is not in array");
  let r = [...e];
  const i = r[t];
  return r[t] = void 0, r = Zo(r, n, i), r.filter((o) => typeof o != "undefined");
}
function T_(e, t = ", ", n = " and ") {
  const r = e.length;
  if (r === 1)
    return e[0];
  const i = e[r - 1];
  return [...e].splice(0, r - 1).join(t) + n + i;
}
function I_(e) {
  return [...new Set(e)];
}
function hl(e) {
  return Array.isArray(e) ? e : [e];
}
const cf = ({
  type: e,
  name: t,
  className: n
}) => /* @__PURE__ */ L("code", { className: n, children: [
  /* @__PURE__ */ L("span", { style: { opacity: 0.55 }, children: [
    e,
    "$"
  ] }),
  /* @__PURE__ */ y("span", { children: t })
] });
const P_ = 4, __ = 25, N_ = sc(__).map((e) => /* @__PURE__ */ y("div", { className: "faux-row", children: sc(P_).map((t) => /* @__PURE__ */ y("div", { className: "faux-cell", children: "i" }, t)) }, e)), D_ = ({
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
        /* @__PURE__ */ y(cf, { type: "output", name: e.outputId })
      ] }),
      /* @__PURE__ */ y("div", { className: "faux-table-body", children: N_ })
    ]
  }
) })), R_ = {
  title: "DT Table",
  UiComponent: D_,
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
  iconSrc: x_,
  category: "Outputs",
  description: "`DataTable` table output"
}, L_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEO0lEQVR4nO3dsYqcVRiH8WeNrkXMDRgLixRWRjSiXoMWG0iUXIGNsii4wRsQTApD0EIvQBCJ2RD0GqIoRjthC4vsHaRxRcbi7MDk28kMgv+c92SfH2zxfbPFmZcnZ06+LWZjNpsh/d+e6L0APZ4MSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqWIJ3svYJ2db/aW3d4Etg5/3gCePby3Mfm96RcFjfj6feAe8CtwE7gFHEx+jyvvnJne6qp8WEucB64AtSaZ8wzwwuHPJWAPuAx813NR64z0UXgC+JQ20OMS1TJngBu0WZzovJaHGmnH+gTY6b2IQuazuNx1FQ8xyo51gaNRHQDXaWesUxw9n3B4b/FnxNdP0d7jdY6erXZosylnhLA2gc8m9/aB14Bt4A7tgPu4uk97j9u097w/ef0abUaljBDWReC5hesD4C3gbpfV9HUXeBP4a+HeaeDtLqtZYYSwtibXX3I8o5r7Dfhqcm+rwzpWGiGsVyfXX3dZRS3TGZzrsooVRvhf4fOT63LniQ7usPywX8YIO9bUkafOqmfEsDQAw1LECGesdX+oPa5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqUIw1LECGes0s9rOio9F3csRRiWIgxLESOcsUqdHQopPRd3LEUYliIMSxEjnLFKP6/pqPRc3LEUYViKMCxFjHDGKnV2KKT0XNyxFGFYijAsRYxwxir9vKaj0nNxx1KEYSnCsBQxwhmr1NmhkNJzccdShGEpwrAUMcIZq/Tzmo5Kz8UdSxGGpQjDUsQIZ6xSZ4dCSs/FHUsRhqWIEcPyK08GMEJYf9Ce2cx/Xu67nBJe58GZ/Nl1NUuMENbvk+tLXVZRy3QGP3dZxQojhLU7uX4XONthHVW8SJvBot0O61hphLC+Be4tXD8NfA+81GU1fZ0FfqDNYG6fNqNSRgjrAPhwcu808CPt+5DPAScf8ZoepZO093gN+In23hd9wINf5VvCCA9Iof2LvAp8tHBvk/YF3NsL96YPDdf9oXa016euUnC3gjF2rLmPgc97L6KQL2gzKWmksP4B3gcuAHud19LTHnAReI82k5JG+ShcdAO4TRvueeAV2rnjqZ6LCvqbdkD/BbhJ++gr//XFG7PZuo9x6b8b6aNQAzEsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliL+BXaHdHGUC5uqAAAAAElFTkSuQmCC", F_ = "_deleteButton_1en02_1", M_ = {
  deleteButton: F_
};
function mE({
  path: e,
  justIcon: t = !1,
  label: n = "Delete Node"
}) {
  const r = DC(e);
  return /* @__PURE__ */ L(
    mt,
    {
      className: M_.deleteButton,
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
const ag = k.forwardRef(
  (i, r) => {
    var o = i, { className: e = "", children: t } = o, n = at(o, ["className", "children"]);
    const a = e + " card";
    return /* @__PURE__ */ y("div", Q(M({ ref: r, className: a }, n), { children: t }));
  }
), B_ = k.forwardRef(
  (r, n) => {
    var i = r, { className: e = "" } = i, t = at(i, ["className"]);
    const o = e + " card-header";
    return /* @__PURE__ */ y("div", M({ ref: n, className: o }, t));
  }
), lg = k.createContext([
  null,
  (e) => {
  }
]);
function U_({
  children: e
}) {
  const t = k.useState(null);
  return /* @__PURE__ */ y(lg.Provider, { value: t, children: e });
}
function z_() {
  return k.useContext(lg);
}
function gE({
  nodeInfo: e,
  immovable: t = !1
}) {
  var a;
  const n = k.useRef(!1), [, r] = k.useContext(lg), i = k.useCallback(
    (l) => {
      n.current === !1 || t || (r(null), n.current = !1, document.body.removeEventListener("dragover", qy), document.body.removeEventListener("drop", i));
    },
    [t, r]
  ), o = k.useCallback(
    (l) => {
      l.stopPropagation(), r(e), n.current = !0, document.body.addEventListener("dragover", qy), document.body.addEventListener("drop", i);
    },
    [i, e, r]
  );
  return ((a = e.currentPath) == null ? void 0 : a.length) === 0 || t ? {} : {
    onDragStart: o,
    onDragEnd: i,
    draggable: !0
  };
}
function qy(e) {
  e.preventDefault();
}
function ar(e, t) {
  return [...e, t];
}
function ff(e) {
  return e.join("-");
}
const vE = tg({
  name: "selectedPath",
  initialState: [],
  reducers: {
    SET_SELECTION: (e, t) => t.payload.path,
    STEP_BACK_SELECTION: (e) => e === null || e.length === 0 ? null : (e.pop(), e)
  }
}), { SET_SELECTION: df, STEP_BACK_SELECTION: KU } = vE.actions;
function W_() {
  return fa((e) => e.selected_path);
}
const j_ = vE.reducer;
function sg() {
  const e = to(), t = fa((r) => r.selected_path), n = J.useCallback(
    (r) => {
      e(df({ path: r }));
    },
    [e]
  );
  return [t, n];
}
function Y_() {
  return fa((t) => t.selected_path);
}
function pa(e, t) {
  if (e === t)
    return !0;
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function V_(e, t, n = []) {
  if (e === t)
    return !0;
  const r = Object.keys(e).filter((o) => !n.includes(o)), i = Object.keys(t).filter((o) => !n.includes(o));
  if (!pa(r, i))
    return !1;
  for (let o of r)
    if (e[o] !== t[o])
      return !1;
  return !0;
}
function G_(e) {
  const [t, n] = sg(), r = k.useCallback(
    (o) => {
      o.stopPropagation(), n(e);
    },
    [e, n]
  ), i = Boolean(t && pa(t, e));
  return { onClick: r, isSelected: i };
}
function yE(e, t) {
  const n = gE({
    nodeInfo: { node: e, currentPath: t }
  }), { onClick: r, isSelected: i } = G_(t);
  return M({
    onClick: r,
    "data-sue-path": ff(t),
    "data-is-selected-node": i,
    "aria-label": e.uiName
  }, n);
}
const no = ({ path: e, node: t }) => {
  const { uiName: n, uiArguments: r, uiChildren: i } = t, o = on[n].UiComponent, a = yE(t, e);
  return /* @__PURE__ */ y(
    o,
    {
      wrapperProps: a,
      uiArguments: r,
      uiChildren: i,
      path: e
    }
  );
}, $_ = "_container_1a2os_1", H_ = "_withTitle_1a2os_13", J_ = "_panelTitle_1a2os_22", Q_ = "_contentHolder_1a2os_27", K_ = "_dropWatcher_1a2os_68", X_ = "_lastDropWatcher_1a2os_76", q_ = "_firstDropWatcher_1a2os_79", Z_ = "_middleDropWatcher_1a2os_90", e4 = "_onlyDropWatcher_1a2os_94", t4 = "_hoveringOverSwap_1a2os_99", n4 = "_availableToSwap_1a2os_100", r4 = "_pulse_1a2os_1", i4 = "_emptyGridCard_1a2os_144", o4 = "_emptyMessage_1a2os_161", Zt = {
  container: $_,
  withTitle: H_,
  panelTitle: J_,
  contentHolder: Q_,
  dropWatcher: K_,
  lastDropWatcher: X_,
  firstDropWatcher: q_,
  middleDropWatcher: Z_,
  onlyDropWatcher: e4,
  hoveringOverSwap: t4,
  availableToSwap: n4,
  pulse: r4,
  emptyGridCard: i4,
  emptyMessage: o4
};
function Ui(e) {
  return e.length;
}
function wE(e, t, n) {
  return n === 0 ? !0 : pa(e.slice(0, n), t.slice(0, n));
}
function a4(e, t) {
  const n = Ui(e), r = Ui(t);
  return n >= r ? !1 : wE(e, t, n);
}
function ug(e, t) {
  const n = e.length, r = t.length;
  if (n !== r)
    return !1;
  const i = n - 1;
  return !!pa(
    e.slice(0, i),
    t.slice(0, i)
  );
}
function bE({
  fromPath: e,
  toPath: t
}) {
  if (e == null)
    return !0;
  if (a4(e, t))
    return !1;
  if (ug(e, t)) {
    const n = e.length, r = e[n - 1], i = t[n - 1];
    if (r === i || r === i - 1)
      return !1;
  }
  return !0;
}
function pf({
  watcherRef: e,
  getCanAcceptDrop: t = () => !0,
  onDrop: n,
  onDragOver: r,
  canAcceptDropClass: i = "can-accept-drop",
  hoveringOverClass: o = "hovering-over"
}) {
  const [a, l] = z_(), {
    addCanAcceptDropHighlight: s,
    addHoveredOverHighlight: u,
    removeHoveredOverHighlight: c,
    removeAllHighlights: f
  } = l4({ watcherRef: e, canAcceptDropClass: i, hoveringOverClass: o }), d = a ? t(a) : !1, p = k.useCallback(
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
      d ? n(a) : console.error("Incompatable drag pairing"), l(null);
    },
    [
      d,
      a,
      n,
      c,
      l
    ]
  );
  k.useEffect(() => {
    const S = e.current;
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
    e
  ]);
}
function l4({
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
function s4({
  watcherRef: e,
  positionInChildren: t,
  parentPath: n
}) {
  const r = Df(), i = k.useCallback(
    ({ node: a, currentPath: l }) => Zy(a) !== null && bE({
      fromPath: l,
      toPath: [...n, t]
    }),
    [t, n]
  ), o = k.useCallback(
    ({ node: a, currentPath: l }) => {
      const s = Zy(a);
      if (!s)
        throw new Error("No node to place...");
      r({
        node: s,
        currentPath: l,
        path: ar(n, t)
      });
    },
    [t, n, r]
  );
  pf({
    watcherRef: e,
    getCanAcceptDrop: i,
    onDrop: o
  });
}
function Zy(e) {
  var n;
  const t = e.uiName;
  return t === "gridlayout::grid_card" && ((n = e.uiChildren) == null ? void 0 : n.length) === 1 ? e.uiChildren[0] : t.includes("gridlayout::grid_card") ? null : e;
}
const u4 = [
  "gridlayout::grid_card_text",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot"
];
function ph(e) {
  return u4.includes(e.uiName);
}
const SE = k.createContext(null);
function c4() {
  return k.useContext(SE);
}
function cg({
  containerRef: e,
  path: t,
  area: n
}) {
  const r = c4(), i = k.useCallback(
    ({ node: a, currentPath: l }) => l === void 0 || !ph(a) ? !1 : ug(l, t),
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
  pf({
    watcherRef: e,
    getCanAcceptDrop: i,
    onDrop: o,
    canAcceptDropClass: Zt.availableToSwap,
    hoveringOverClass: Zt.hoveringOverSwap
  });
}
const f4 = ({
  uiArguments: { area: e, item_gap: t, title: n },
  uiChildren: r,
  path: i,
  wrapperProps: o
}) => {
  var s;
  const a = k.useRef(null), l = (s = r == null ? void 0 : r.length) != null ? s : 0;
  return cg({ containerRef: a, area: e, path: i }), /* @__PURE__ */ L(
    ag,
    Q(M({
      className: Vt(
        Zt.container,
        n ? Zt.withTitle : null
      ),
      ref: a,
      style: {
        gridArea: e,
        "--item-gap": t
      }
    }, o), {
      children: [
        n ? /* @__PURE__ */ y(B_, { className: Zt.panelTitle, children: n }) : null,
        /* @__PURE__ */ L("div", { className: Zt.contentHolder, "data-alignment": "top", children: [
          /* @__PURE__ */ y(
            e1,
            {
              index: 0,
              parentPath: i,
              numChildren: l
            }
          ),
          l > 0 ? r == null ? void 0 : r.map((u, c) => /* @__PURE__ */ L(k.Fragment, { children: [
            /* @__PURE__ */ y(no, { path: ar(i, c), node: u }),
            /* @__PURE__ */ y(
              e1,
              {
                index: c + 1,
                numChildren: r.length,
                parentPath: i
              }
            )
          ] }, i.join(".") + c)) : /* @__PURE__ */ y(p4, { path: i })
        ] })
      ]
    })
  );
};
function e1({
  index: e,
  numChildren: t,
  parentPath: n
}) {
  const r = k.useRef(null);
  s4({
    watcherRef: r,
    positionInChildren: e,
    parentPath: n
  });
  const i = d4(e, t);
  return /* @__PURE__ */ y(
    "div",
    {
      ref: r,
      className: Vt(Zt.dropWatcher, i),
      role: "region",
      "aria-label": "drop watcher"
    }
  );
}
function d4(e, t) {
  return e === 0 && t === 0 ? Zt.onlyDropWatcher : e === 0 ? Zt.firstDropWatcher : e === t ? Zt.lastDropWatcher : Zt.middleDropWatcher;
}
function p4({ path: e }) {
  return /* @__PURE__ */ L("div", { className: Zt.emptyGridCard, children: [
    /* @__PURE__ */ y("span", { className: Zt.emptyMessage, children: "Empty grid card" }),
    /* @__PURE__ */ y(
      mE,
      {
        path: e,
        justIcon: !0,
        label: "Delete empty grid card"
      }
    )
  ] });
}
const h4 = {
  title: "Grid Card",
  UiComponent: f4,
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
  iconSrc: L_,
  category: "gridlayout",
  description: "The standard element for placing elements on the grid in a simple card container."
}, fg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAACYElEQVR4nO3cMYoUQQBA0RqRPYBn8E5GhqYbLiZeYDNzs428k1dwU8M2UGFZFmYUf/d013vRTEFDBZ+qomj6tCzLgP/t1dYT4JiERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEVCWCSERUJYJIRFQlgkhEXi9dYT+Fd3X78tz4ZOm0xkJffv3m49hb9ixSIhrPNuxhifxxjfxxiPv3/fbDqjHdjtVrii+zHG7ZP/t2OMH2OMj9tMZx+sWOe9f2Hsw+qz2BlhnffmwjGeEBYJYZEQFglhkRAWCWF1pr5YdUHamfpi1YrVmfpiVVidqS9WZwpr6jPP2mY6Y0195lnbTCvW1Geetc0U1tRnnrXNFBYrEhYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWiZnCerxwbOvnDmGmsB5eGPtyhc8dwkwv+t2NXx9n+/Ne1sMY49MVPncIp2V5/mG8ffBFv+s201bIioRF4khnrH3u6Zfb1VZvxSIhLBLCIrHb6waumxWLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi8RPaOk2ptnQzzIAAAAASUVORK5CYII=";
function m4(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z" } }] })(e);
}
const g4 = "_container_1rlbk_1", v4 = "_plotPlaceholder_1rlbk_5", y4 = "_label_1rlbk_19", hh = {
  container: g4,
  plotPlaceholder: v4,
  label: y4
};
function EE({ outputId: e }) {
  const t = J.useRef(null), n = w4(t), r = n === null ? 100 : Math.min(n.width, n.height);
  return /* @__PURE__ */ L(
    "div",
    {
      ref: t,
      className: hh.plotPlaceholder,
      "aria-label": "shiny::plotOutput placeholder",
      children: [
        /* @__PURE__ */ y(
          cf,
          {
            className: hh.label,
            type: "output",
            name: e
          }
        ),
        /* @__PURE__ */ y(
          m4,
          {
            size: `calc(${r}px - 80px)`
          }
        )
      ]
    }
  );
}
function w4(e) {
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
const b4 = "_gridCardPlot_1a94v_1", S4 = {
  gridCardPlot: b4
}, E4 = ({
  uiArguments: { outputId: e, area: t },
  path: n,
  wrapperProps: r
}) => {
  const i = J.useRef(null);
  return cg({ containerRef: i, area: t, path: n }), /* @__PURE__ */ y(
    ag,
    Q(M({
      ref: i,
      style: { gridArea: t },
      className: Vt(S4.gridCardPlot, "gridlayout-gridCardPlot")
    }, r), {
      children: /* @__PURE__ */ y(EE, { outputId: e != null ? e : t })
    })
  );
}, A4 = {
  title: "Grid Plot Card",
  UiComponent: E4,
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
  iconSrc: fg,
  category: "gridlayout",
  description: "A wrapper for `shiny::plotOutput()` that uses `gridlayout`-friendly sizing defaults. \n    For when you want to have a grid area filled entirely with a single plot."
}, C4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFn0lEQVR4nO3b4VHjRgCG4c+ZNMCV4BtVwJVgSjiiCqACJZRgogqgAuUoAZcAFShHC5RAfnh9rBdJFsaf8TrvM5MZzvZJTvxmtVovk5eXFwG79ttnvwEcJ8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcHi989+A2NMJpNRr6uadibpPnn4rC6LxXvP2XGsy7osbt97HJeXl5fPfguDjm3E+j7yMZgdTVhV056oO6KL8Bz26GjC0jKqvoAu9vlGcHxhrdxJiudVhLVnRxFW1bRTSbPoobvwz8o0TMaxJ0cRltZHq+e6LFZhPUePM2rt0bGEFUdzJ0l1WTxrfdT6ziR+f7JYxxoSLnHT6KG75Oc4ugtJ1zs4519ajpKn0cMLSYu6LN59/HC8U729q936mJ9tcugLbdLwAmnVtDd6jeepLouvyfM/9Rrem+cHjvtmgVTSk6QbrYecepZ0PmZRtmrai3C8Mc7DJV4SC6RWHWtXdx0vi1fLPzKJP9UytKGopOWSx33VtIMLs+F/iLFRSdKPMLJlIeuwtByp4nlTV1jpY9tO4uO/dyvpW10Wk7osJpK+dZznJtytvlE17bzjfVxL+hod84ukq+Q181zubrO+FFZN+6DXec5jXRbfel53r/XliC9hct+r53vHwctcCCYeVW7rsrjccNxnLb/PfOw55qmkh+ihRV0WZ4f+uWU7YoX/4PHkuWu06ntum1FrFUDv3Kkuiyst52G/ztNxJ5qe+7IvqnDMR63fcMz6RsJDkm1YensHtSmsj65pXQ8FEEl3QPwaKTvmhIt4Qj4gPe9p56sOSM7LDXEci7osnvpeWJfFc9W08dLDtGra7yM/1JXBS2f8XpI/n+o1+nR+NGo7T3ifa/OBv//gUrhz4Y5r06Q9lb7Gsp2mY1Sb9vwsvR2JjkauI1YaxU24fX/XMaqmnQ6NdB/wpNeIhlb7Hec+CNmNWAP7rrax702A/5uvlLILS7v9Mtn1xXRfQGPnadnL8VK4tpNBy0XF0R9Ysqa1zSR+jDisocvddMPz2cpqxOpau3pPVKu/k/x5p6NWeI+xp56fpQyWDbaV24j1nrWrPneS5nodVWY7nsQPLSmkywszjdhtEe6Cf0QPnWu7f/e9yWrE0vro8rzNr3V17NOSxk3iN068w41F/B6f4uWHjnPPNn1ZHaQj28EvU2QTVsfa1Ud+xy8Na8yugfmI3QXplpqu0Sh93zcdl89fwnPxeQcXgw9FNmHp7Vxo60tBGOniD+dk5Mgxr5r2IQ2satpZuCmIj/HY9Quu4dxxcCeSHqqmncffAVZNexK+1H5IDpHFpr8sdjf8+c+/U0k/o4d6dzKMFeKYRw8t6rI4i57v2t0w1pOW22p6byySDYpjXa12kx7655bLiLWLSXsqPcamXQNjz7nQhqgkKWynuRx6TeI8py3KuYS1s8vgSpinpJP/oRFkETbgXfWc/1rLbTVnY5dA6rK43XDMhZaj1MSw1maVxaUQ+cllxEJmCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCgsV/EcmMRmtHHXoAAAAASUVORK5CYII=", x4 = "_textPanel_525i2_1", k4 = {
  textPanel: x4
}, O4 = ({
  uiArguments: { content: e, area: t, alignment: n },
  path: r,
  wrapperProps: i
}) => {
  const o = J.useRef(null);
  return cg({ containerRef: o, area: t, path: r }), /* @__PURE__ */ y(
    ag,
    Q(M({
      ref: o,
      className: Vt(k4.textPanel, "gridlayout-textPanel"),
      style: { gridArea: t, justifyItems: n }
    }, i), {
      children: /* @__PURE__ */ y("h1", { children: e })
    })
  );
}, T4 = {
  title: "Grid Text Card",
  UiComponent: O4,
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
        start: { icon: BS, label: "left" },
        center: { icon: rh, label: "center" },
        end: { icon: US, label: "right" }
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
  iconSrc: C4,
  category: "gridlayout",
  description: "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics."
}, AE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEVklEQVR4nO3cwYpcRRiG4XeMjouYGzAuXGThyohG1GvQxQQSJVfgRhkUnOANCCYLh6ALvQBBQkxE9BqiKEZ3wixcZO4gm4xIu6geaE+PDMp8VZU67wNncc5ppqqrP7r++Q/0xmKxQDppj7WegMZksBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBRhsBTxeK2Bdr7aO+ryJrC1PF4Dnl5e25i8bvqTON5fv/8AuA/8AtwGvgEOJq/j2lvnppciqgXrCBeBa0Cddzq+p4DnlscVYA+4CnzdYjIttsJTwMeUN2yocs4Btyhrfar24C2+sT4CdhqMO1eHa3215qC1v7EusR6qA+AGpcY6w3r9wPLa6uH99ftnKGt4g/Xaaoey9tXUDNYm8Mnk2j7wCrAN3KUUoPp/HlDWcJuypvuT+7uUz6CKmsG6DDyzcn4AvAHcqziHubgHvA48XLl2Fniz1gRqBmtrcv45hirpV+CLybWtWoPXDNbLk/MvT/BvLyaHiukaX6g1cM3/Cp+dnFfb72fsLkcX+3EtH+msdYU1Dp8VKqLlI52T1OTrXv+uZrCOe5CqjCbr7laoCIOliFFqLLfZztQMlh92G7PrY2lgBksRo9RYbrOdsY81PvtYGofBUsQoNZbbbGfsY43PPpbGYbAUMUqN5TbbGftY47OPpXEYLEWMUmO5zXbGPtb47GNpHAZLEaPUWG6znbGPNT77WBqHwVLEKDVWD7+z3sv9LkoM+1jjs4+lcRgsRYxSYx33dT/3+9XZxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIUWqsnrbZnubSjH2s8dnH0jgMliJGqbF62mZ7mksz9rHGZx9L4zBYihilxuppm+1pLs3YxxqffSyNw2ApYpQaq6dttqe5NGMfa3z2sTQOg6WIlsHabDi2wmoG63dKYXt4vHiCf3tjcrTU01xe5Z9r/ketgWsG67fJ+ZWKY8/VdI1/qjVwzWDdmZy/DZyvOP7cPE9Z41V3ag1eM1g3gfsr508C3wEvVJzDXJwHvqes8aF9ymdQRc1gHQDvT66dBX4AdoELwOmK8xnNacoa7gI/UtZ21XvAw1qTqd15vwlcBz5YubYJbC+PQz3/Yt6jcH/qOhW/raBNu+FD4NMG487VZ5Q1r6pFsP4C3gUuAXsNxp+LPeAy8A5lzatq+RD6FvAt5c1fBF6i1AVPNJzTo+xPSoH+M3CbsvUdtJrMxmJx3PYs/Xc+K1SEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVKEwVLE32A0lLomuWLgAAAAAElFTkSuQmCC";
var hf = Xa;
function Xa(e) {
  let t = e;
  var n = {}.toString.call(e).slice(8, -1);
  if (n == "Set")
    return new Set([...e].map((i) => Xa(i)));
  if (n == "Map")
    return new Map([...e].map((i) => [Xa(i[0]), Xa(i[1])]));
  if (n == "Date")
    return new Date(e.getTime());
  if (n == "RegExp")
    return RegExp(e.source, I4(e));
  if (n == "Array" || n == "Object") {
    t = Array.isArray(e) ? [] : {};
    for (var r in e)
      t[r] = Xa(e[r]);
  }
  return t;
}
function I4(e) {
  if (typeof e.source.flags == "string")
    return e.source.flags;
  var t = [];
  return e.global && t.push("g"), e.ignoreCase && t.push("i"), e.multiline && t.push("m"), e.sticky && t.push("y"), e.unicode && t.push("u"), t.join("");
}
function ha(e) {
  const t = e.length, n = e[0].length;
  for (let r of e)
    if (r.length !== n)
      throw new Error("Inconsistant number of columns in matrix");
  return { numRows: t, numCols: n };
}
function P4(e, { index: t, arr: n, dir: r }) {
  const i = hf(e);
  switch (r) {
    case "rows":
      return Zo(i, t, n);
    case "cols":
      return i.map(
        (o, a) => Zo(o, t, n[a])
      );
  }
}
function _4(e, { index: t, dir: n }) {
  const r = hf(e);
  switch (n) {
    case "rows":
      return dh(r, t);
    case "cols":
      return r.map((i, o) => dh(i, t));
  }
}
const Yn = ".";
function dg(e) {
  const t = /* @__PURE__ */ new Map();
  return N4(e).forEach(({ itemRows: n, itemCols: r }, i) => {
    if (i === Yn)
      return;
    const o = Xy(n), a = Xy(r);
    t.set(i, {
      colStart: a.minVal,
      rowStart: o.minVal,
      colSpan: a.span + 1,
      rowSpan: o.span + 1,
      isValid: o.isSequence && a.isSequence
    });
  }), t;
}
function N4(e) {
  var i;
  const t = /* @__PURE__ */ new Map(), { numRows: n, numCols: r } = ha(e);
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
function D4(e, r) {
  var i = r, { name: t } = i, n = at(i, ["name"]);
  const { rowStart: o, colStart: a } = n, l = "rowEnd" in n ? n.rowEnd : o + n.rowSpan - 1, s = "colEnd" in n ? n.colEnd : a + n.colSpan - 1, u = hf(e.areas);
  for (let c = 0; c < u.length; c++) {
    const f = c >= o - 1 && c < l;
    for (let d = 0; d < u[0].length; d++) {
      const p = u[c][d], h = p === t;
      if (!(f && d >= a - 1 && d < s)) {
        h && (u[c][d] = Yn);
        continue;
      }
      if (p !== Yn && !h)
        throw new Error(
          `Can't add ${t} to layout, overlaps with item ${u[c][d]}.`
        );
      u[c][d] = t;
    }
  }
  return Q(M({}, e), { areas: u });
}
function mh(e, t) {
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
function R4({
  areas: e,
  row_sizes: t = ["1fr"],
  col_sizes: n = ["1fr"]
}) {
  const { numRows: r, numCols: i } = ha(e);
  return {
    rows: t1(r, t, "row"),
    cols: t1(i, n, "column")
  };
}
function t1(e, t, n) {
  if (!Array.isArray(t))
    return Jl(t, e);
  if (e !== t.length)
    throw new Error(
      `Number of ${n} sizes does not match the number of ${n}s in the areas template. 
    Either make sure they match or use a single ${n} size that will be repeated for all ${n}s.`
    );
  return t;
}
function CE(e, { afterIndex: t, size: n, dir: r }) {
  return yi(e, (i) => {
    const o = r === "rows" ? "cols" : "rows", a = R4(i);
    if (t > a[r].length)
      throw new Error(
        `Can't add a tract after index ${t}. Not enought tracts.`
      );
    if (t < 0)
      throw new Error("Cant add a tract at a negative index");
    const l = dg(i.areas);
    let s = Jl(Yn, a[o].length);
    l.forEach((u, c) => {
      const { itemStart: f, itemEnd: d } = mh(u, r);
      if (f <= t && d > t) {
        const h = mh(u, o);
        for (let m = h.itemStart - 1; m < h.itemEnd; m++)
          s[m] = c;
      }
    }), i.areas = P4(i.areas, {
      dir: r,
      index: t,
      arr: s
    }), i[r === "rows" ? "row_sizes" : "col_sizes"] = Zo(
      a[r],
      t,
      n
    );
  });
}
function L4({ areas: e }, t) {
  const { numRows: n, numCols: r } = ha(e);
  for (let i = 0; i < n; i++)
    for (let o = 0; o < r; o++)
      e[i][o] === t && (e[i][o] = Yn);
}
function xE(e, t) {
  let n = Array.isArray(t) ? t : [t];
  return yi(e, (r) => {
    for (let i of n)
      L4(r, i);
  });
}
function F4(e, t) {
  return xE(e, t);
}
function kE(e, t, n = !1) {
  const { dir: r, index: i } = t, o = t.index - 1;
  if (!n) {
    const s = OE(e.areas, t);
    if (s.length !== 0)
      throw new Error(
        `Can't remove ${r === "rows" ? "row" : "col"} ${i} as items ${T_(
          s
        )} are entirely contained within it.`
      );
  }
  const a = {
    areas: _4(e.areas, { index: o, dir: r })
  }, l = r === "rows" ? "row_sizes" : "col_sizes";
  return M4(e[l]) && (a[l] = dh(
    e[l],
    o
  )), M(M({}, e), a);
}
function OE(e, t) {
  const n = dg(e);
  return B4(n, t);
}
function M4(e) {
  return Array.isArray(e) && e.length > 1;
}
function B4(e, { index: t, dir: n }) {
  let r = [];
  return e.forEach((i, o) => {
    const a = mh(i, n);
    if (!a)
      return;
    const { itemStart: l, itemEnd: s } = a;
    l === t && l === s && r.push(o);
  }), r;
}
function U4(e, t, n) {
  return yi(e, ({ areas: r }) => {
    const { numRows: i, numCols: o } = ha(r);
    for (let a = 0; a < i; a++)
      for (let l = 0; l < o; l++)
        r[a][l] === t && (r[a][l] = n);
  });
}
function z4(e, { index: t, dir: n }, r) {
  return yi(e, (i) => {
    const o = n === "rows" ? "row_sizes" : "col_sizes";
    i[o][t - 1] = r;
  });
}
function W4(e, { item_a: t, item_b: n }) {
  return t === n ? e : yi(e, (r) => {
    const { n_rows: i, n_cols: o } = j4(r.areas);
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
function j4(e) {
  const t = e.length, n = e[0].length;
  return { n_rows: t, n_cols: n };
}
function Y4({
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
      f !== Yn && a.add(f);
    });
    const c = u.length;
    if (i === -1 && (i = c), i !== c)
      throw new Error(
        "Invalid layout definition. Not consistant number of columns in every row"
      );
  }
  if (!n)
    n = Jl("1fr", i);
  else if (n.length !== i)
    throw new Error("Column sizes vector doesn't match layout definition.");
  if (!t)
    t = Jl("1fr", o);
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
function V4(e) {
  const t = [];
  for (let n of e)
    t.push(n.trim().split(/\s+/));
  return t;
}
function TE(n) {
  var r = n, {
    areas: e
  } = r, t = at(r, [
    "areas"
  ]);
  return M({
    layout: $4(e)
  }, t);
}
function G4(n) {
  var r = n, {
    layout: e
  } = r, t = at(r, [
    "layout"
  ]);
  return M({
    areas: V4(e)
  }, t);
}
function $4(e) {
  const { numCols: t } = ha(e), n = [], r = Jl(-1, t);
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
function pg(e, t) {
  const n = G4(e);
  return TE(
    H4(n, t)
  );
}
function H4(e, t) {
  const n = e;
  switch (t.type) {
    case "ADD_ITEM":
    case "MOVE_ITEM":
      return D4(n, M({ name: t.name }, t.pos));
    case "RENAME_ITEM":
      return U4(n, t.oldName, t.newName);
    case "REMOVE_ITEM":
      return F4(n, t.name);
    case "REMOVE_ITEMS":
      return xE(n, t.names);
    case "SWAP_ITEMS":
      return W4(n, t);
    case "ADD_TRACT":
      return CE(n, t);
    case "REMOVE_TRACT":
      return kE(n, t);
    case "RESIZE_TRACT":
      return z4(
        n,
        { dir: t.dir, index: t.index },
        t.size
      );
    case "SET_GAP":
      return Q(M({}, hf(n)), { gap_size: t.size });
    default:
      throw console.error(t), new Error("Have yet to implement layout action type");
  }
}
function hg(e) {
  return e.uiChildren !== void 0;
}
function wi(e, t) {
  let n = e, r;
  for (r of t) {
    if (!hg(n))
      throw new Error("Somehow trying to enter a leaf node");
    n = n.uiChildren[r];
  }
  return n;
}
function IE(e) {
  return e.slice(0, e.length - 1);
}
function J4(e) {
  return e[e.length - 1];
}
function Q4(e) {
  let t = [];
  return e.forEach((n) => {
    if ("area" in n.uiArguments && n.uiArguments.area !== void 0) {
      const r = n.uiArguments.area;
      t.push(r);
    }
  }), t;
}
const K4 = [
  "gridlayout::grid_page",
  "gridlayout::grid_container"
];
function X4(e) {
  return K4.includes(e.uiName);
}
function PE(e, { path: t, node: n }) {
  var l;
  const r = NE({
    tree: e,
    pathToGridItem: t
  });
  if (r === null)
    return;
  const { gridPageNode: i } = r, o = Q4(i.uiChildren)[J4(t)], a = (l = n.uiArguments.area) != null ? l : Yn;
  o !== a && (i.uiArguments = pg(i.uiArguments, {
    type: "RENAME_ITEM",
    oldName: o,
    newName: a
  }));
}
function _E(e, { path: t }) {
  const n = NE({
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
  r.uiArguments = pg(r.uiArguments, {
    type: "REMOVE_ITEM",
    name: o
  });
}
function NE({
  tree: e,
  pathToGridItem: t
}) {
  if (t.length === 0)
    return null;
  const n = wi(e, t.slice(0, -1));
  if (!X4(n))
    return null;
  const r = n.uiChildren[t[t.length - 1]];
  return "area" in r.uiArguments ? {
    gridPageNode: n,
    gridItemNode: r
  } : null;
}
function q4(e, t) {
  const { numRows: n, numCols: r } = ha(e), i = [];
  for (let o = 0; o < n; o++)
    for (let a = 0; a < r; a++)
      e[o][a] === t && i.push({ row: o + 1, col: a + 1 });
  return i;
}
function Z4(e) {
  return q4(e, Yn);
}
function e3(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 640 512" }, child: [{ tag: "path", attr: { d: "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" } }] })(e);
}
function t3(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" } }] })(e);
}
function n1(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 256 512" }, child: [{ tag: "path", attr: { d: "M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z" } }] })(e);
}
function r1(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" } }] })(e);
}
function mg(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" } }] })(e);
}
function n3({
  gridLocation: { rowStart: e, rowSpan: t, colStart: n, colSpan: r },
  layoutAreas: i
}) {
  const o = e + t - 1, a = n + r - 1, l = uc(e, o), s = uc(n, a), u = t > 1, c = r > 1, f = [];
  return (i1({
    colRange: s,
    rowIndex: e - 1,
    layoutAreas: i
  }) || u) && f.push("up"), (i1({
    colRange: s,
    rowIndex: o + 1,
    layoutAreas: i
  }) || u) && f.push("down"), (o1({
    rowRange: l,
    colIndex: n - 1,
    layoutAreas: i
  }) || c) && f.push("left"), (o1({
    rowRange: l,
    colIndex: a + 1,
    layoutAreas: i
  }) || c) && f.push("right"), f;
}
function i1({
  colRange: e,
  rowIndex: t,
  layoutAreas: n
}) {
  return t < 1 || t > n.length ? !1 : e.every(
    (r) => n[t - 1][r - 1] === Yn
  );
}
function o1({
  rowRange: e,
  colIndex: t,
  layoutAreas: n
}) {
  return t < 1 || t > n[0].length ? !1 : e.every(
    (r) => n[r - 1][t - 1] === Yn
  );
}
const r3 = "_marker_mumaw_1", i3 = "_dragger_mumaw_32", o3 = "_move_mumaw_52", a1 = {
  marker: r3,
  dragger: i3,
  move: o3
};
function Ql({
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
function a3(e, t) {
  return typeof e == "undefined" && typeof t == "undefined" ? !0 : typeof e == "undefined" || typeof t == "undefined" ? !1 : ("colSpan" in e && (e = Ql(e)), "colSpan" in t && (t = Ql(t)), e.colStart === t.colStart && e.colEnd === t.colEnd && e.rowStart === t.rowStart && e.rowEnd === t.rowEnd);
}
function l3({
  row: e,
  col: t
}) {
  return `row${e}-col${t}`;
}
function s3({
  dragDirection: e,
  gridLocation: t,
  layoutAreas: n
}) {
  const { rowStart: r, rowEnd: i, colStart: o, colEnd: a } = Ql(t), l = n.length, s = n[0].length;
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
    const [O, b] = d ? [w, E] : [E, w];
    return n[O - 1][b - 1] !== Yn;
  }, g = uc(h, m), v = uc(u, c);
  for (let w of v)
    for (let E of g)
      if (S(w, E))
        return {
          shrinkExtent: f,
          growExtent: w + (p ? 1 : -1)
        };
  return { shrinkExtent: f, growExtent: c };
}
function DE(e, t, n) {
  const r = t < n ? t : n, i = t < n ? n : t;
  return e >= r && e <= i;
}
function u3({
  dir: e,
  gridContainerStyles: t,
  gridContainerBoundingRect: n
}) {
  const r = gh(t.getPropertyValue("gap")), o = gh(t.getPropertyValue("padding")) + r / 2, a = n[e === "rows" ? "y" : "x"], l = c3(t, e), s = l.length, u = [];
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
function c3(e, t) {
  return e.getPropertyValue(
    t === "rows" ? "grid-template-rows" : "grid-template-columns"
  ).split(" ").map(gh);
}
function gh(e) {
  return Number(e.replaceAll("px", ""));
}
function f3({
  mousePos: e,
  dragState: t
}) {
  const { dragHandle: n, tractExtents: r, gridItemExtent: i } = t, o = e[n === "down" || n === "up" ? "y" : "x"], a = r.find(
    ({ start: s, end: u }) => DE(o, s, u)
  );
  if (a === void 0)
    return;
  const l = d3[n];
  return i[l] = a.index, i;
}
const d3 = {
  right: "colEnd",
  left: "colStart",
  up: "rowStart",
  down: "rowEnd"
};
function p3({
  overlayRef: e,
  gridLocation: t,
  layoutAreas: n,
  onDragEnd: r
}) {
  const i = Ql(t), o = k.useRef(null), a = k.useCallback(
    (u) => {
      const c = e.current, f = o.current;
      if (!c || !f)
        throw new Error(
          "For some reason we are observing dragging when we shouldn't"
        );
      const d = f3({ mousePos: u, dragState: f });
      d && s1(c, d);
    },
    [e]
  ), l = k.useCallback(() => {
    const u = e.current, c = o.current;
    if (!u || !c)
      return;
    const f = c.gridItemExtent;
    a3(f, i) || r(f), u.classList.remove("dragging"), document.removeEventListener("mousemove", a), l1("on");
  }, [i, a, r, e]);
  return k.useCallback(
    (u) => {
      const c = e.current;
      if (!c)
        return;
      const f = c.parentElement;
      if (!f)
        return;
      const d = getComputedStyle(c.parentElement), p = f.getBoundingClientRect(), h = u === "down" || u === "up" ? "rows" : "cols", { shrinkExtent: m, growExtent: S } = s3({
        dragDirection: u,
        gridLocation: t,
        layoutAreas: n
      });
      o.current = {
        dragHandle: u,
        gridItemExtent: Ql(t),
        tractExtents: u3({
          dir: h,
          gridContainerStyles: d,
          gridContainerBoundingRect: p
        }).filter(({ index: g }) => DE(g, m, S))
      }, s1(e.current, o.current.gridItemExtent), c.classList.add("dragging"), document.addEventListener("mousemove", a), document.addEventListener("mouseup", l, { once: !0 }), l1("off");
    },
    [l, t, n, a, e]
  );
}
function l1(e) {
  var n;
  const t = (n = document.querySelector("body")) == null ? void 0 : n.classList;
  e === "off" ? t == null || t.add("disable-text-selection") : t == null || t.remove("disable-text-selection");
}
function s1(e, { rowStart: t, rowEnd: n, colStart: r, colEnd: i }) {
  e.style.setProperty("--drag-grid-row-start", String(t)), e.style.setProperty("--drag-grid-row-end", String(n + 1)), e.style.setProperty("--drag-grid-column-start", String(r)), e.style.setProperty("--drag-grid-column-end", String(i + 1));
}
function h3({
  area: e,
  gridLocation: t,
  areas: n,
  onNewPos: r
}) {
  if (typeof t == "undefined")
    throw new Error(`Item in ${e} is not in the location map`);
  const i = k.useRef(null), o = p3({
    overlayRef: i,
    gridLocation: t,
    layoutAreas: n,
    onDragEnd: r
  }), a = k.useMemo(
    () => n3({ gridLocation: t, layoutAreas: n }),
    [t, n]
  ), l = k.useMemo(() => {
    let s = [];
    for (let u of a)
      s.push(
        /* @__PURE__ */ y(
          "div",
          {
            className: Vt(a1.dragger, u),
            title: `resize ${e} ${u}`,
            onMouseDown: (c) => {
              u1(c), o(u);
            },
            children: m3[u]
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
      onClick: u1,
      className: a1.marker + " grid-area-overlay",
      children: l
    }
  );
}
function u1(e) {
  e.preventDefault(), e.stopPropagation();
}
const m3 = {
  up: /* @__PURE__ */ y(r1, {}),
  down: /* @__PURE__ */ y(r1, {}),
  left: /* @__PURE__ */ y(n1, {}),
  right: /* @__PURE__ */ y(n1, {})
}, g3 = "_ResizableGrid_i4cq9_1", v3 = {
  ResizableGrid: g3,
  "size-detection-cell": "_size-detection-cell_i4cq9_1"
}, y3 = /(^[\d|.]+)\s*(px|%|rem|fr)|(^auto$)/;
function w3(e) {
  return y3.test(e);
}
const b3 = /(px|%|rem|fr|auto)/g, S3 = /^[\d|.]*/g;
function cc(e) {
  var i, o;
  const t = ((i = e.match(b3)) == null ? void 0 : i[0]) || "px", n = (o = e.match(S3)) == null ? void 0 : o[0], r = n ? Number(n) : null;
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
function Ua(e) {
  return e.unit === "auto" ? "auto" : `${e.count}${e.unit}`;
}
const c1 = ["http", "https", "mailto", "tel"];
function E3(e) {
  const t = (e || "").trim(), n = t.charAt(0);
  if (n === "#" || n === "/")
    return t;
  const r = t.indexOf(":");
  if (r === -1)
    return t;
  let i = -1;
  for (; ++i < c1.length; ) {
    const o = c1[i];
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
var gg = function(t) {
  return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
};
function Mo(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? f1(e.position) : "start" in e || "end" in e ? f1(e) : "line" in e || "column" in e ? vh(e) : "";
}
function vh(e) {
  return d1(e && e.line) + ":" + d1(e && e.column);
}
function f1(e) {
  return vh(e && e.start) + "-" + vh(e && e.end);
}
function d1(e) {
  return e && typeof e == "number" ? e : 1;
}
let xn = class extends Error {
  /**
   * Create a message for `reason` at `place` from `origin`.
   *
   * When an error is passed in as `reason`, the `stack` is copied.
   *
   * @param {string|Error|VFileMessage} reason
   *   Reason for message.
   *   Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place at which the message occurred in a file.
   * @param {string} [origin]
   *   Place in code the message originates from (example `'my-package:my-rule-name'`)
   */
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
    n && ("type" in n || "position" in n ? n.position && (o = n.position) : "start" in n || "end" in n ? o = n : ("line" in n || "column" in n) && (o.start = n)), this.name = Mo(n) || "1:1", this.message = typeof t == "object" ? t.message : t, this.stack = "", typeof t == "object" && t.stack && (this.stack = t.stack), this.reason = this.message, this.fatal, this.line = o.start.line, this.column = o.start.column, this.position = o, this.source = i[0], this.ruleId = i[1], this.file, this.actual, this.expected, this.url, this.note;
  }
};
xn.prototype.file = "";
xn.prototype.name = "";
xn.prototype.reason = "";
xn.prototype.message = "";
xn.prototype.stack = "";
xn.prototype.fatal = null;
xn.prototype.column = null;
xn.prototype.line = null;
xn.prototype.source = null;
xn.prototype.ruleId = null;
xn.prototype.position = null;
const Jn = { basename: A3, dirname: C3, extname: x3, join: k3, sep: "/" };
function A3(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  ms(e);
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
function C3(e) {
  if (ms(e), e.length === 0)
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
function x3(e) {
  ms(e);
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
function k3(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    ms(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : O3(n);
}
function O3(e) {
  ms(e);
  const t = e.charCodeAt(0) === 47;
  let n = T3(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function T3(e, t) {
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
function ms(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const I3 = { cwd: P3 };
function P3() {
  return "/";
}
function yh(e) {
  return e !== null && typeof e == "object" && // @ts-expect-error: indexable.
  e.href && // @ts-expect-error: indexable.
  e.origin;
}
function _3(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!yh(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return N3(e);
}
function N3(e) {
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
const kd = ["history", "path", "basename", "stem", "extname", "dirname"];
let D3 = class {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
   * If `options` is a `URL`, it’s treated as `{path: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All fields in `options` are set on the newly created `VFile`.
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {Compatible} [value]
   */
  constructor(t) {
    let n;
    t ? typeof t == "string" || gg(t) ? n = { value: t } : yh(t) ? n = { path: t } : n = t : n = {}, this.data = {}, this.messages = [], this.history = [], this.cwd = I3.cwd(), this.value, this.stored, this.result, this.map;
    let r = -1;
    for (; ++r < kd.length; ) {
      const o = kd[r];
      o in n && n[o] !== void 0 && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      kd.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   * @param {string|URL} path
   */
  set path(t) {
    yh(t) && (t = _3(t)), Td(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path == "string" ? Jn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(t) {
    p1(this.basename, "dirname"), this.path = Jn.join(t || "", this.basename);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path == "string" ? Jn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(t) {
    Td(t, "basename"), Od(t, "basename"), this.path = Jn.join(this.dirname || "", t);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path == "string" ? Jn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(t) {
    if (Od(t, "extname"), p1(this.dirname, "extname"), t) {
      if (t.charCodeAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Jn.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path == "string" ? Jn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(t) {
    Td(t, "stem"), Od(t, "stem"), this.path = Jn.join(this.dirname || "", t + (this.extname || ""));
  }
  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8']
   *   When `value` is a `Buffer`, `encoding` is a character encoding to
   *   understand it as (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return (this.value || "").toString(t);
  }
  /**
   * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
   * associates it with the file by adding it to `vfile.messages` and setting
   * `message.file` to the current filepath.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new xn(t, n, r);
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Like `VFile#message()`, but associates an informational message where
   * `fatal` is set to `null`.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = null, i;
  }
  /**
   * Like `VFile#message()`, but associates a fatal message where `fatal` is
   * set to `true`, and then immediately throws it.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {never}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
};
function Od(e, t) {
  if (e && e.includes(Jn.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Jn.sep + "`"
    );
}
function Td(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function p1(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function h1(e) {
  if (e)
    throw e;
}
var vu = Object.prototype.hasOwnProperty, RE = Object.prototype.toString, m1 = Object.defineProperty, g1 = Object.getOwnPropertyDescriptor, v1 = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : RE.call(t) === "[object Array]";
}, y1 = function(t) {
  if (!t || RE.call(t) !== "[object Object]")
    return !1;
  var n = vu.call(t, "constructor"), r = t.constructor && t.constructor.prototype && vu.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i == "undefined" || vu.call(t, i);
}, w1 = function(t, n) {
  m1 && n.name === "__proto__" ? m1(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, b1 = function(t, n) {
  if (n === "__proto__")
    if (vu.call(t, n)) {
      if (g1)
        return g1(t, n).value;
    } else
      return;
  return t[n];
}, S1 = function e() {
  var t, n, r, i, o, a, l = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof l == "boolean" && (c = l, l = arguments[1] || {}, s = 2), (l == null || typeof l != "object" && typeof l != "function") && (l = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = b1(l, n), i = b1(t, n), l !== i && (c && i && (y1(i) || (o = v1(i))) ? (o ? (o = !1, a = r && v1(r) ? r : []) : a = r && y1(r) ? r : {}, w1(l, { name: n, newValue: e(c, a, i) })) : typeof i != "undefined" && w1(l, { name: n, newValue: i }));
  return l;
};
function wh(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function R3() {
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
      i = u, c ? L3(c, l)(...u) : a(null, ...u);
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
function L3(e, t) {
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
class kn extends Error {
  /**
   * Create a message for `reason` at `place` from `origin`.
   *
   * When an error is passed in as `reason`, the `stack` is copied.
   *
   * @param {string|Error|VFileMessage} reason
   *   Reason for message.
   *   Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place at which the message occurred in a file.
   * @param {string} [origin]
   *   Place in code the message originates from (example `'my-package:my-rule-name'`)
   */
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
    n && ("type" in n || "position" in n ? n.position && (o = n.position) : "start" in n || "end" in n ? o = n : ("line" in n || "column" in n) && (o.start = n)), this.name = Mo(n) || "1:1", this.message = typeof t == "object" ? t.message : t, this.stack = "", typeof t == "object" && t.stack && (this.stack = t.stack), this.reason = this.message, this.fatal, this.line = o.start.line, this.column = o.start.column, this.position = o, this.source = i[0], this.ruleId = i[1], this.file, this.actual, this.expected, this.url, this.note;
  }
}
kn.prototype.file = "";
kn.prototype.name = "";
kn.prototype.reason = "";
kn.prototype.message = "";
kn.prototype.stack = "";
kn.prototype.fatal = null;
kn.prototype.column = null;
kn.prototype.line = null;
kn.prototype.source = null;
kn.prototype.ruleId = null;
kn.prototype.position = null;
const Qn = { basename: F3, dirname: M3, extname: B3, join: U3, sep: "/" };
function F3(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  gs(e);
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
function M3(e) {
  if (gs(e), e.length === 0)
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
function B3(e) {
  gs(e);
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
function U3(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    gs(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : z3(n);
}
function z3(e) {
  gs(e);
  const t = e.charCodeAt(0) === 47;
  let n = W3(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function W3(e, t) {
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
function gs(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const j3 = { cwd: Y3 };
function Y3() {
  return "/";
}
function bh(e) {
  return e !== null && typeof e == "object" && // @ts-expect-error: indexable.
  e.href && // @ts-expect-error: indexable.
  e.origin;
}
function V3(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!bh(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return G3(e);
}
function G3(e) {
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
const Id = ["history", "path", "basename", "stem", "extname", "dirname"];
class $3 {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
   * If `options` is a `URL`, it’s treated as `{path: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All fields in `options` are set on the newly created `VFile`.
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {Compatible} [value]
   */
  constructor(t) {
    let n;
    t ? typeof t == "string" || gg(t) ? n = { value: t } : bh(t) ? n = { path: t } : n = t : n = {}, this.data = {}, this.messages = [], this.history = [], this.cwd = j3.cwd(), this.value, this.stored, this.result, this.map;
    let r = -1;
    for (; ++r < Id.length; ) {
      const o = Id[r];
      o in n && n[o] !== void 0 && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      Id.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   * @param {string|URL} path
   */
  set path(t) {
    bh(t) && (t = V3(t)), _d(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path == "string" ? Qn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(t) {
    E1(this.basename, "dirname"), this.path = Qn.join(t || "", this.basename);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path == "string" ? Qn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(t) {
    _d(t, "basename"), Pd(t, "basename"), this.path = Qn.join(this.dirname || "", t);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path == "string" ? Qn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(t) {
    if (Pd(t, "extname"), E1(this.dirname, "extname"), t) {
      if (t.charCodeAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Qn.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path == "string" ? Qn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(t) {
    _d(t, "stem"), Pd(t, "stem"), this.path = Qn.join(this.dirname || "", t + (this.extname || ""));
  }
  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8']
   *   When `value` is a `Buffer`, `encoding` is a character encoding to
   *   understand it as (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return (this.value || "").toString(t);
  }
  /**
   * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
   * associates it with the file by adding it to `vfile.messages` and setting
   * `message.file` to the current filepath.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new kn(t, n, r);
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Like `VFile#message()`, but associates an informational message where
   * `fatal` is set to `null`.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = null, i;
  }
  /**
   * Like `VFile#message()`, but associates a fatal message where `fatal` is
   * set to `true`, and then immediately throws it.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {never}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
}
function Pd(e, t) {
  if (e && e.includes(Qn.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Qn.sep + "`"
    );
}
function _d(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function E1(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
const H3 = FE().freeze(), LE = {}.hasOwnProperty;
function FE() {
  const e = R3(), t = [];
  let n = {}, r, i = -1;
  return o.data = a, o.Parser = void 0, o.Compiler = void 0, o.freeze = l, o.attachers = t, o.use = s, o.parse = u, o.stringify = c, o.run = f, o.runSync = d, o.process = p, o.processSync = h, o;
  function o() {
    const m = FE();
    let S = -1;
    for (; ++S < t.length; )
      m.use(...t[S]);
    return m.data(S1(!0, {}, n)), m;
  }
  function a(m, S) {
    return typeof m == "string" ? arguments.length === 2 ? (Rd("data", r), n[m] = S, o) : LE.call(n, m) && n[m] || null : m ? (Rd("data", r), n = m, o) : n;
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
    if (Rd("use", r), m != null)
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
      P ? (wh(P[1]) && wh(A) && (A = S1(!0, P[1], A)), P[1] = A) : t.push([...arguments]);
    }
  }
  function u(m) {
    o.freeze();
    const S = za(m), g = o.Parser;
    return Nd("parse", g), A1(g, "parse") ? new g(String(S), S).parse() : g(String(S), S);
  }
  function c(m, S) {
    o.freeze();
    const g = za(S), v = o.Compiler;
    return Dd("stringify", v), C1(m), A1(v, "compile") ? new v(m, g).compile() : v(m, g);
  }
  function f(m, S, g) {
    if (C1(m), o.freeze(), !g && typeof S == "function" && (g = S, S = void 0), !g)
      return new Promise(v);
    v(null, g);
    function v(w, E) {
      e.run(m, za(S), O);
      function O(b, A, T) {
        A = A || m, b ? E(b) : w ? w(A) : g(null, A, T);
      }
    }
  }
  function d(m, S) {
    let g, v;
    return o.run(m, S, w), x1("runSync", "run", v), g;
    function w(E, O) {
      h1(E), g = O, v = !0;
    }
  }
  function p(m, S) {
    if (o.freeze(), Nd("process", o.Parser), Dd("process", o.Compiler), !S)
      return new Promise(g);
    g(null, S);
    function g(v, w) {
      const E = za(m);
      o.run(o.parse(E), E, (b, A, T) => {
        if (b || !A || !T)
          O(b);
        else {
          const P = o.stringify(A, T);
          P == null || (K3(P) ? T.value = P : T.result = P), O(b, T);
        }
      });
      function O(b, A) {
        b || !A ? w(b) : v ? v(A) : S(null, A);
      }
    }
  }
  function h(m) {
    let S;
    o.freeze(), Nd("processSync", o.Parser), Dd("processSync", o.Compiler);
    const g = za(m);
    return o.process(g, v), x1("processSync", "process", S), g;
    function v(w) {
      S = !0, h1(w);
    }
  }
}
function A1(e, t) {
  return typeof e == "function" && // Prototypes do exist.
  // type-coverage:ignore-next-line
  e.prototype && // A function with keys in its prototype is probably a constructor.
  // Classes’ prototype methods are not enumerable, so we check if some value
  // exists in the prototype.
  // type-coverage:ignore-next-line
  (J3(e.prototype) || t in e.prototype);
}
function J3(e) {
  let t;
  for (t in e)
    if (LE.call(e, t))
      return !0;
  return !1;
}
function Nd(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Parser`");
}
function Dd(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Compiler`");
}
function Rd(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function C1(e) {
  if (!wh(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function x1(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function za(e) {
  return Q3(e) ? e : new $3(e);
}
function Q3(e) {
  return Boolean(
    e && typeof e == "object" && "message" in e && "messages" in e
  );
}
function K3(e) {
  return typeof e == "string" || gg(e);
}
function X3(e, t) {
  var { includeImageAlt: n = !0 } = t || {};
  return ME(e, n);
}
function ME(e, t) {
  return e && typeof e == "object" && // @ts-ignore looks like a literal.
  (e.value || // @ts-ignore looks like an image.
  (t ? e.alt : "") || // @ts-ignore looks like a parent.
  "children" in e && k1(e.children, t) || Array.isArray(e) && k1(e, t)) || "";
}
function k1(e, t) {
  for (var n = [], r = -1; ++r < e.length; )
    n[r] = ME(e[r], t);
  return n.join("");
}
function lr(e, t, n, r) {
  const i = e.length;
  let o = 0, a;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    a = Array.from(r), a.unshift(t, n), [].splice.apply(e, a);
  else
    for (n && [].splice.apply(e, [t, n]); o < r.length; )
      a = r.slice(o, o + 1e4), a.unshift(t, 0), [].splice.apply(e, a), o += 1e4, t += 1e4;
}
function pn(e, t) {
  return e.length > 0 ? (lr(e, e.length, 0, t), e) : t;
}
const O1 = {}.hasOwnProperty;
function q3(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Z3(t, e[n]);
  return t;
}
function Z3(e, t) {
  let n;
  for (n in t) {
    const i = (O1.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let a;
    for (a in o) {
      O1.call(i, a) || (i[a] = []);
      const l = o[a];
      eN(
        // @ts-expect-error Looks like a list.
        i[a],
        Array.isArray(l) ? l : l ? [l] : []
      );
    }
  }
}
function eN(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  lr(e, 0, 0, r);
}
const tN = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, Zn = bi(/[A-Za-z]/), Sh = bi(/\d/), nN = bi(/[\dA-Fa-f]/), en = bi(/[\dA-Za-z]/), rN = bi(/[!-/:-@[-`{-~]/), T1 = bi(/[#-'*+\--9=?A-Z^-~]/);
function Eh(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
function vn(e) {
  return e !== null && (e < 0 || e === 32);
}
function ne(e) {
  return e !== null && e < -2;
}
function qe(e) {
  return e === -2 || e === -1 || e === 32;
}
const iN = bi(/\s/), oN = bi(tN);
function bi(e) {
  return t;
  function t(n) {
    return n !== null && e.test(String.fromCharCode(n));
  }
}
function Ae(e, t, n, r) {
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
const aN = {
  tokenize: lN
};
function lN(e) {
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
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), Ae(e, t, "linePrefix");
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
    return ne(l) ? (e.consume(l), e.exit("chunkText"), o) : (e.consume(l), a);
  }
}
const sN = {
  tokenize: uN
}, I1 = {
  tokenize: cN
};
function uN(e) {
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
      return lr(
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
        return d(w);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return h(w);
      t.interrupt = Boolean(
        i.currentConstruct && !i._gfmTableDynamicInterruptHack
      );
    }
    return t.containerState = {}, e.check(
      I1,
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
      I1,
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
    return ne(w) ? (e.consume(w), S(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (e.consume(w), m);
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
      lr(
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
function cN(e, t, n) {
  return Ae(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function P1(e) {
  if (e === null || vn(e) || iN(e))
    return 1;
  if (oN(e))
    return 2;
}
function vg(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Ah = {
  name: "attention",
  tokenize: dN,
  resolveAll: fN
};
function fN(e, t) {
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
          _1(f, -s), _1(d, s), a = {
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
          }, e[r][1].end = Object.assign({}, a.start), e[n][1].start = Object.assign({}, l.end), u = [], e[r][1].end.offset - e[r][1].start.offset && (u = pn(u, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), u = pn(u, [
            ["enter", i, t],
            ["enter", a, t],
            ["exit", a, t],
            ["enter", o, t]
          ]), u = pn(
            u,
            vg(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), u = pn(u, [
            ["exit", o, t],
            ["enter", l, t],
            ["exit", l, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = pn(u, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : c = 0, lr(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function dN(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = P1(r);
  let o;
  return a;
  function a(s) {
    return e.enter("attentionSequence"), o = s, l(s);
  }
  function l(s) {
    if (s === o)
      return e.consume(s), l;
    const u = e.exit("attentionSequence"), c = P1(s), f = !c || c === 2 && i || n.includes(s), d = !i || i === 2 && c || n.includes(r);
    return u._open = Boolean(o === 42 ? f : f && (i || !d)), u._close = Boolean(o === 42 ? d : d && (c || !f)), t(s);
  }
}
function _1(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const pN = {
  name: "autolink",
  tokenize: hN
};
function hN(e, t, n) {
  let r = 1;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return Zn(h) ? (e.consume(h), a) : T1(h) ? u(h) : n(h);
  }
  function a(h) {
    return h === 43 || h === 45 || h === 46 || en(h) ? l(h) : u(h);
  }
  function l(h) {
    return h === 58 ? (e.consume(h), s) : (h === 43 || h === 45 || h === 46 || en(h)) && r++ < 32 ? (e.consume(h), l) : u(h);
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), p(h)) : h === null || h === 32 || h === 60 || Eh(h) ? n(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), r = 0, c) : T1(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return en(h) ? f(h) : n(h);
  }
  function f(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", p(h)) : d(h);
  }
  function d(h) {
    return (h === 45 || en(h)) && r++ < 63 ? (e.consume(h), h === 45 ? d : f) : n(h);
  }
  function p(h) {
    return e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t;
  }
}
const mf = {
  tokenize: mN,
  partial: !0
};
function mN(e, t, n) {
  return Ae(e, r, "linePrefix");
  function r(i) {
    return i === null || ne(i) ? t(i) : n(i);
  }
}
const BE = {
  name: "blockQuote",
  tokenize: gN,
  continuation: {
    tokenize: vN
  },
  exit: yN
};
function gN(e, t, n) {
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
function vN(e, t, n) {
  return Ae(
    e,
    e.attempt(BE, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function yN(e) {
  e.exit("blockQuote");
}
const UE = {
  name: "characterEscape",
  tokenize: wN
};
function wN(e, t, n) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return rN(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
}
const N1 = document.createElement("i");
function yg(e) {
  const t = "&" + e + ";";
  N1.innerHTML = t;
  const n = N1.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
const zE = {
  name: "characterReference",
  tokenize: bN
};
function bN(e, t, n) {
  const r = this;
  let i = 0, o, a;
  return l;
  function l(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
  }
  function s(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, a = en, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, a = nN, c) : (e.enter("characterReferenceValue"), o = 7, a = Sh, c(f));
  }
  function c(f) {
    let d;
    return f === 59 && i ? (d = e.exit("characterReferenceValue"), a === en && !yg(r.sliceSerialize(d)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t)) : a(f) && i++ < o ? (e.consume(f), c) : n(f);
  }
}
const D1 = {
  name: "codeFenced",
  tokenize: SN,
  concrete: !0
};
function SN(e, t, n) {
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
    return b === u ? (e.consume(b), s++, f) : (e.exit("codeFencedFenceSequence"), s < 3 ? n(b) : Ae(e, d, "whitespace")(b));
  }
  function d(b) {
    return b === null || ne(b) ? S(b) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === null || vn(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Ae(e, h, "whitespace")(b)) : b === 96 && b === u ? n(b) : (e.consume(b), p);
  }
  function h(b) {
    return b === null || ne(b) ? S(b) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), m(b));
  }
  function m(b) {
    return b === null || ne(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), S(b)) : b === 96 && b === u ? n(b) : (e.consume(b), m);
  }
  function S(b) {
    return e.exit("codeFencedFence"), r.interrupt ? t(b) : g(b);
  }
  function g(b) {
    return b === null ? w(b) : ne(b) ? e.attempt(
      o,
      e.attempt(
        i,
        w,
        l ? Ae(
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
    return b === null || ne(b) ? (e.exit("codeFlowValue"), g(b)) : (e.consume(b), v);
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
    return Ae(
      b,
      _,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function _(B) {
      return b.enter("codeFencedFence"), b.enter("codeFencedFenceSequence"), I(B);
    }
    function I(B) {
      return B === u ? (b.consume(B), P++, I) : P < s ? T(B) : (b.exit("codeFencedFenceSequence"), Ae(b, F, "whitespace")(B));
    }
    function F(B) {
      return B === null || ne(B) ? (b.exit("codeFencedFence"), A(B)) : T(B);
    }
  }
}
const Ld = {
  name: "codeIndented",
  tokenize: AN
}, EN = {
  tokenize: CN,
  partial: !0
};
function AN(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), Ae(e, o, "linePrefix", 4 + 1)(u);
  }
  function o(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? a(u) : n(u);
  }
  function a(u) {
    return u === null ? s(u) : ne(u) ? e.attempt(EN, a, s)(u) : (e.enter("codeFlowValue"), l(u));
  }
  function l(u) {
    return u === null || ne(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), l);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function CN(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return r.parser.lazy[r.now().line] ? n(a) : ne(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : Ae(e, o, "linePrefix", 4 + 1)(a);
  }
  function o(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(a) : ne(a) ? i(a) : n(a);
  }
}
const xN = {
  name: "codeText",
  tokenize: TN,
  resolve: kN,
  previous: ON
};
function kN(e) {
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
function ON(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function TN(e, t, n) {
  let r = 0, i, o;
  return a;
  function a(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), l(f);
  }
  function l(f) {
    return f === 96 ? (e.consume(f), r++, l) : (e.exit("codeTextSequence"), s(f));
  }
  function s(f) {
    return f === null ? n(f) : f === 96 ? (o = e.enter("codeTextSequence"), i = 0, c(f)) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), s) : ne(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || ne(f) ? (e.exit("codeTextData"), s(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (o.type = "codeTextData", u(f));
  }
}
function WE(e) {
  const t = {};
  let n = -1, r, i, o, a, l, s, u;
  for (; ++n < e.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = e[n], n && r[1].type === "chunkFlow" && e[n - 1][1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, IN(e, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o-- && (a = e[o], a[1].type === "lineEnding" || a[1].type === "lineEndingBlank"); )
        a[0] === "enter" && (i && (e[i][1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = o);
      i && (r[1].end = Object.assign({}, e[i][1].start), l = e.slice(i, n), l.unshift(r), lr(e, i, n - i + 1, l));
    }
  }
  return !u;
}
function IN(e, t) {
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
    s.unshift([v, v + g.length - 1]), lr(e, v, 2, g);
  }
  for (d = -1; ++d < s.length; )
    u[h + s[d][0]] = h + s[d][1], h += s[d][1] - s[d][0] - 1;
  return u;
}
const PN = {
  tokenize: DN,
  resolve: NN
}, _N = {
  tokenize: RN,
  partial: !0
};
function NN(e) {
  return WE(e), e;
}
function DN(e, t) {
  let n;
  return r;
  function r(l) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? o(l) : ne(l) ? e.check(
      _N,
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
function RN(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Ae(e, o, "linePrefix");
  }
  function o(a) {
    if (a === null || ne(a))
      return n(a);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(a) : e.interrupt(r.parser.constructs.flow, n, t)(a);
  }
}
function jE(e, t, n, r, i, o, a, l, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(g) {
    return g === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(g), e.exit(o), d) : g === null || g === 41 || Eh(g) ? n(g) : (e.enter(r), e.enter(a), e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), m(g));
  }
  function d(g) {
    return g === 62 ? (e.enter(o), e.consume(g), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), p(g));
  }
  function p(g) {
    return g === 62 ? (e.exit("chunkString"), e.exit(l), d(g)) : g === null || g === 60 || ne(g) ? n(g) : (e.consume(g), g === 92 ? h : p);
  }
  function h(g) {
    return g === 60 || g === 62 || g === 92 ? (e.consume(g), p) : p(g);
  }
  function m(g) {
    return g === 40 ? ++c > u ? n(g) : (e.consume(g), m) : g === 41 ? c-- ? (e.consume(g), m) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : g === null || vn(g) ? c ? n(g) : (e.exit("chunkString"), e.exit(l), e.exit(a), e.exit(r), t(g)) : Eh(g) ? n(g) : (e.consume(g), g === 92 ? S : m);
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
    p === 94 && !l && "_hiddenFootnoteSupport" in a.parser.constructs || l > 999 ? n(p) : p === 93 ? (e.exit(o), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : ne(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || ne(p) || l++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), s = s || !qe(p), p === 92 ? d : f);
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
    return d === a ? (e.exit(o), s(a)) : d === null ? n(d) : ne(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), Ae(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === a || d === null || ne(d) ? (e.exit("chunkString"), u(d)) : (e.consume(d), d === 92 ? f : c);
  }
  function f(d) {
    return d === a || d === 92 ? (e.consume(d), c) : c(d);
  }
}
function ml(e, t) {
  let n;
  return r;
  function r(i) {
    return ne(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : qe(i) ? Ae(
      e,
      r,
      n ? "linePrefix" : "lineSuffix"
    )(i) : t(i);
  }
}
function Bo(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const LN = {
  name: "definition",
  tokenize: MN
}, FN = {
  tokenize: BN,
  partial: !0
};
function MN(e, t, n) {
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
    return i = Bo(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), s === 58 ? (e.enter("definitionMarker"), e.consume(s), e.exit("definitionMarker"), ml(
      e,
      jE(
        e,
        e.attempt(
          FN,
          Ae(e, l, "whitespace"),
          Ae(e, l, "whitespace")
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
    return s === null || ne(s) ? (e.exit("definition"), r.parser.defined.includes(i) || r.parser.defined.push(i), t(s)) : n(s);
  }
}
function BN(e, t, n) {
  return r;
  function r(a) {
    return vn(a) ? ml(e, i)(a) : n(a);
  }
  function i(a) {
    return a === 34 || a === 39 || a === 40 ? VE(
      e,
      Ae(e, o, "whitespace"),
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(a) : n(a);
  }
  function o(a) {
    return a === null || ne(a) ? t(a) : n(a);
  }
}
const UN = {
  name: "hardBreakEscape",
  tokenize: zN
};
function zN(e, t, n) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(o), i;
  }
  function i(o) {
    return ne(o) ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const WN = {
  name: "headingAtx",
  tokenize: YN,
  resolve: jN
};
function jN(e, t) {
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
  }, lr(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", o, t],
    ["exit", o, t],
    ["exit", i, t]
  ])), e;
}
function YN(e, t, n) {
  const r = this;
  let i = 0;
  return o;
  function o(c) {
    return e.enter("atxHeading"), e.enter("atxHeadingSequence"), a(c);
  }
  function a(c) {
    return c === 35 && i++ < 6 ? (e.consume(c), a) : c === null || vn(c) ? (e.exit("atxHeadingSequence"), r.interrupt ? t(c) : l(c)) : n(c);
  }
  function l(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || ne(c) ? (e.exit("atxHeading"), t(c)) : qe(c) ? Ae(e, l, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), l(c));
  }
  function u(c) {
    return c === null || c === 35 || vn(c) ? (e.exit("atxHeadingText"), l(c)) : (e.consume(c), u);
  }
}
const VN = [
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
], R1 = ["pre", "script", "style", "textarea"], GN = {
  name: "htmlFlow",
  tokenize: JN,
  resolveTo: HN,
  concrete: !0
}, $N = {
  tokenize: QN,
  partial: !0
};
function HN(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function JN(e, t, n) {
  const r = this;
  let i, o, a, l, s;
  return u;
  function u(C) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(C), c;
  }
  function c(C) {
    return C === 33 ? (e.consume(C), f) : C === 47 ? (e.consume(C), h) : C === 63 ? (e.consume(C), i = 3, r.interrupt ? t : V) : Zn(C) ? (e.consume(C), a = String.fromCharCode(C), o = !0, m) : n(C);
  }
  function f(C) {
    return C === 45 ? (e.consume(C), i = 2, d) : C === 91 ? (e.consume(C), i = 5, a = "CDATA[", l = 0, p) : Zn(C) ? (e.consume(C), i = 4, r.interrupt ? t : V) : n(C);
  }
  function d(C) {
    return C === 45 ? (e.consume(C), r.interrupt ? t : V) : n(C);
  }
  function p(C) {
    return C === a.charCodeAt(l++) ? (e.consume(C), l === a.length ? r.interrupt ? t : I : p) : n(C);
  }
  function h(C) {
    return Zn(C) ? (e.consume(C), a = String.fromCharCode(C), m) : n(C);
  }
  function m(C) {
    return C === null || C === 47 || C === 62 || vn(C) ? C !== 47 && o && R1.includes(a.toLowerCase()) ? (i = 1, r.interrupt ? t(C) : I(C)) : VN.includes(a.toLowerCase()) ? (i = 6, C === 47 ? (e.consume(C), S) : r.interrupt ? t(C) : I(C)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : o ? v(C) : g(C)) : C === 45 || en(C) ? (e.consume(C), a += String.fromCharCode(C), m) : n(C);
  }
  function S(C) {
    return C === 62 ? (e.consume(C), r.interrupt ? t : I) : n(C);
  }
  function g(C) {
    return qe(C) ? (e.consume(C), g) : P(C);
  }
  function v(C) {
    return C === 47 ? (e.consume(C), P) : C === 58 || C === 95 || Zn(C) ? (e.consume(C), w) : qe(C) ? (e.consume(C), v) : P(C);
  }
  function w(C) {
    return C === 45 || C === 46 || C === 58 || C === 95 || en(C) ? (e.consume(C), w) : E(C);
  }
  function E(C) {
    return C === 61 ? (e.consume(C), O) : qe(C) ? (e.consume(C), E) : v(C);
  }
  function O(C) {
    return C === null || C === 60 || C === 61 || C === 62 || C === 96 ? n(C) : C === 34 || C === 39 ? (e.consume(C), s = C, b) : qe(C) ? (e.consume(C), O) : (s = null, A(C));
  }
  function b(C) {
    return C === null || ne(C) ? n(C) : C === s ? (e.consume(C), T) : (e.consume(C), b);
  }
  function A(C) {
    return C === null || C === 34 || C === 39 || C === 60 || C === 61 || C === 62 || C === 96 || vn(C) ? E(C) : (e.consume(C), A);
  }
  function T(C) {
    return C === 47 || C === 62 || qe(C) ? v(C) : n(C);
  }
  function P(C) {
    return C === 62 ? (e.consume(C), _) : n(C);
  }
  function _(C) {
    return qe(C) ? (e.consume(C), _) : C === null || ne(C) ? I(C) : n(C);
  }
  function I(C) {
    return C === 45 && i === 2 ? (e.consume(C), re) : C === 60 && i === 1 ? (e.consume(C), te) : C === 62 && i === 4 ? (e.consume(C), $) : C === 63 && i === 3 ? (e.consume(C), V) : C === 93 && i === 5 ? (e.consume(C), U) : ne(C) && (i === 6 || i === 7) ? e.check(
      $N,
      $,
      F
    )(C) : C === null || ne(C) ? F(C) : (e.consume(C), I);
  }
  function F(C) {
    return e.exit("htmlFlowData"), B(C);
  }
  function B(C) {
    return C === null ? x(C) : ne(C) ? e.attempt(
      {
        tokenize: q,
        partial: !0
      },
      B,
      x
    )(C) : (e.enter("htmlFlowData"), I(C));
  }
  function q(C, tt, Ge) {
    return Qe;
    function Qe($e) {
      return C.enter("lineEnding"), C.consume($e), C.exit("lineEnding"), me;
    }
    function me($e) {
      return r.parser.lazy[r.now().line] ? Ge($e) : tt($e);
    }
  }
  function re(C) {
    return C === 45 ? (e.consume(C), V) : I(C);
  }
  function te(C) {
    return C === 47 ? (e.consume(C), a = "", fe) : I(C);
  }
  function fe(C) {
    return C === 62 && R1.includes(a.toLowerCase()) ? (e.consume(C), $) : Zn(C) && a.length < 8 ? (e.consume(C), a += String.fromCharCode(C), fe) : I(C);
  }
  function U(C) {
    return C === 93 ? (e.consume(C), V) : I(C);
  }
  function V(C) {
    return C === 62 ? (e.consume(C), $) : C === 45 && i === 2 ? (e.consume(C), V) : I(C);
  }
  function $(C) {
    return C === null || ne(C) ? (e.exit("htmlFlowData"), x(C)) : (e.consume(C), $);
  }
  function x(C) {
    return e.exit("htmlFlow"), t(C);
  }
}
function QN(e, t, n) {
  return r;
  function r(i) {
    return e.exit("htmlFlowData"), e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), e.attempt(mf, t, n);
  }
}
const KN = {
  name: "htmlText",
  tokenize: XN
};
function XN(e, t, n) {
  const r = this;
  let i, o, a, l;
  return s;
  function s(x) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), u;
  }
  function u(x) {
    return x === 33 ? (e.consume(x), c) : x === 47 ? (e.consume(x), A) : x === 63 ? (e.consume(x), O) : Zn(x) ? (e.consume(x), _) : n(x);
  }
  function c(x) {
    return x === 45 ? (e.consume(x), f) : x === 91 ? (e.consume(x), o = "CDATA[", a = 0, S) : Zn(x) ? (e.consume(x), E) : n(x);
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
    return x === null ? n(x) : x === 45 ? (e.consume(x), m) : ne(x) ? (l = h, U(x)) : (e.consume(x), h);
  }
  function m(x) {
    return x === 45 ? (e.consume(x), $) : h(x);
  }
  function S(x) {
    return x === o.charCodeAt(a++) ? (e.consume(x), a === o.length ? g : S) : n(x);
  }
  function g(x) {
    return x === null ? n(x) : x === 93 ? (e.consume(x), v) : ne(x) ? (l = g, U(x)) : (e.consume(x), g);
  }
  function v(x) {
    return x === 93 ? (e.consume(x), w) : g(x);
  }
  function w(x) {
    return x === 62 ? $(x) : x === 93 ? (e.consume(x), w) : g(x);
  }
  function E(x) {
    return x === null || x === 62 ? $(x) : ne(x) ? (l = E, U(x)) : (e.consume(x), E);
  }
  function O(x) {
    return x === null ? n(x) : x === 63 ? (e.consume(x), b) : ne(x) ? (l = O, U(x)) : (e.consume(x), O);
  }
  function b(x) {
    return x === 62 ? $(x) : O(x);
  }
  function A(x) {
    return Zn(x) ? (e.consume(x), T) : n(x);
  }
  function T(x) {
    return x === 45 || en(x) ? (e.consume(x), T) : P(x);
  }
  function P(x) {
    return ne(x) ? (l = P, U(x)) : qe(x) ? (e.consume(x), P) : $(x);
  }
  function _(x) {
    return x === 45 || en(x) ? (e.consume(x), _) : x === 47 || x === 62 || vn(x) ? I(x) : n(x);
  }
  function I(x) {
    return x === 47 ? (e.consume(x), $) : x === 58 || x === 95 || Zn(x) ? (e.consume(x), F) : ne(x) ? (l = I, U(x)) : qe(x) ? (e.consume(x), I) : $(x);
  }
  function F(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || en(x) ? (e.consume(x), F) : B(x);
  }
  function B(x) {
    return x === 61 ? (e.consume(x), q) : ne(x) ? (l = B, U(x)) : qe(x) ? (e.consume(x), B) : I(x);
  }
  function q(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96 ? n(x) : x === 34 || x === 39 ? (e.consume(x), i = x, re) : ne(x) ? (l = q, U(x)) : qe(x) ? (e.consume(x), q) : (e.consume(x), i = void 0, fe);
  }
  function re(x) {
    return x === i ? (e.consume(x), te) : x === null ? n(x) : ne(x) ? (l = re, U(x)) : (e.consume(x), re);
  }
  function te(x) {
    return x === 62 || x === 47 || vn(x) ? I(x) : n(x);
  }
  function fe(x) {
    return x === null || x === 34 || x === 39 || x === 60 || x === 61 || x === 96 ? n(x) : x === 62 || vn(x) ? I(x) : (e.consume(x), fe);
  }
  function U(x) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), Ae(
      e,
      V,
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function V(x) {
    return e.enter("htmlTextData"), l(x);
  }
  function $(x) {
    return x === 62 ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(x);
  }
}
const wg = {
  name: "labelEnd",
  tokenize: r5,
  resolveTo: n5,
  resolveAll: t5
}, qN = {
  tokenize: i5
}, ZN = {
  tokenize: o5
}, e5 = {
  tokenize: a5
};
function t5(e) {
  let t = -1, n;
  for (; ++t < e.length; )
    n = e[t][1], (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
  return e;
}
function n5(e, t) {
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
  ], l = pn(l, e.slice(o + 1, o + r + 3)), l = pn(l, [["enter", c, t]]), l = pn(
    l,
    vg(
      t.parser.constructs.insideSpan.null,
      e.slice(o + r + 4, a - 3),
      t
    )
  ), l = pn(l, [
    ["exit", c, t],
    e[a - 2],
    e[a - 1],
    ["exit", u, t]
  ]), l = pn(l, e.slice(a + 1)), l = pn(l, [["exit", s, t]]), lr(e, o, e.length, l), e;
}
function r5(e, t, n) {
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
      Bo(
        r.sliceSerialize({
          start: o.end,
          end: r.now()
        })
      )
    ), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(c), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(c);
  }
  function s(c) {
    return c === 40 ? e.attempt(
      qN,
      t,
      a ? t : u
    )(c) : c === 91 ? e.attempt(
      ZN,
      t,
      a ? e.attempt(e5, t, u) : u
    )(c) : a ? t(c) : u(c);
  }
  function u(c) {
    return o._balanced = !0, n(c);
  }
}
function i5(e, t, n) {
  return r;
  function r(s) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(s), e.exit("resourceMarker"), ml(e, i);
  }
  function i(s) {
    return s === 41 ? l(s) : jE(
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
    return vn(s) ? ml(e, a)(s) : l(s);
  }
  function a(s) {
    return s === 34 || s === 39 || s === 40 ? VE(
      e,
      ml(e, l),
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
function o5(e, t, n) {
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
      Bo(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? t(a) : n(a);
  }
}
function a5(e, t, n) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
}
const l5 = {
  name: "labelStartImage",
  tokenize: s5,
  resolveAll: wg.resolveAll
};
function s5(e, t, n) {
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
const u5 = {
  name: "labelStartLink",
  tokenize: c5,
  resolveAll: wg.resolveAll
};
function c5(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Fd = {
  name: "lineEnding",
  tokenize: f5
};
function f5(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Ae(e, t, "linePrefix");
  }
}
const yu = {
  name: "thematicBreak",
  tokenize: d5
};
function d5(e, t, n) {
  let r = 0, i;
  return o;
  function o(s) {
    return e.enter("thematicBreak"), i = s, a(s);
  }
  function a(s) {
    return s === i ? (e.enter("thematicBreakSequence"), l(s)) : qe(s) ? Ae(e, a, "whitespace")(s) : r < 3 || s !== null && !ne(s) ? n(s) : (e.exit("thematicBreak"), t(s));
  }
  function l(s) {
    return s === i ? (e.consume(s), r++, l) : (e.exit("thematicBreakSequence"), a(s));
  }
}
const Rt = {
  name: "list",
  tokenize: m5,
  continuation: {
    tokenize: g5
  },
  exit: y5
}, p5 = {
  tokenize: w5,
  partial: !0
}, h5 = {
  tokenize: v5,
  partial: !0
};
function m5(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
  return l;
  function l(p) {
    const h = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (h === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Sh(p)) {
      if (r.containerState.type || (r.containerState.type = h, e.enter(h, {
        _container: !0
      })), h === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(yu, n, u)(p) : u(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return n(p);
  }
  function s(p) {
    return Sh(p) && ++a < 10 ? (e.consume(p), s) : (!r.interrupt || a < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : n(p);
  }
  function u(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      mf,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(
        p5,
        d,
        f
      )
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, o++, d(p);
  }
  function f(p) {
    return qe(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), d) : n(p);
  }
  function d(p) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function g5(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(mf, i, o);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Ae(
      e,
      t,
      "listItemIndent",
      r.containerState.size + 1
    )(l);
  }
  function o(l) {
    return r.containerState.furtherBlankLines || !qe(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(h5, t, a)(l));
  }
  function a(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, Ae(
      e,
      e.attempt(Rt, t, n),
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(l);
  }
}
function v5(e, t, n) {
  const r = this;
  return Ae(
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
function y5(e) {
  e.exit(this.containerState.type);
}
function w5(e, t, n) {
  const r = this;
  return Ae(
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
const L1 = {
  name: "setextUnderline",
  tokenize: S5,
  resolveTo: b5
};
function b5(e, t) {
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
function S5(e, t, n) {
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
    return c === o ? (e.consume(c), s) : (e.exit("setextHeadingLineSequence"), Ae(e, u, "lineSuffix")(c));
  }
  function u(c) {
    return c === null || ne(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const E5 = {
  tokenize: A5
};
function A5(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    mf,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      Ae(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(PN, i)
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
const C5 = {
  resolveAll: $E()
}, x5 = GE("string"), k5 = GE("text");
function GE(e) {
  return {
    tokenize: t,
    resolveAll: $E(
      e === "text" ? O5 : void 0
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
function $E(e) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(n, r) : n;
  }
}
function O5(e, t) {
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
function T5(e, t, n) {
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
    sliceStream: p,
    sliceSerialize: d,
    now: h,
    defineSkip: m,
    write: f
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && o.push(t), u;
  function f(I) {
    return a = pn(a, I), S(), a[a.length - 1] !== null ? [] : (T(t, 0), u.events = vg(o, u.events, u), u.events);
  }
  function d(I, F) {
    return P5(p(I), F);
  }
  function p(I) {
    return I5(a, I);
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
    ne(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, _()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = I;
  }
  function w(I, F) {
    const B = F || {};
    return B.type = I, B.start = h(), u.events.push(["enter", B, u]), l.push(B), B;
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
    return B;
    function B(q, re, te) {
      let fe, U, V, $;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        C(q)
      ) : "tokenize" in q ? C([q]) : x(q);
      function x(me) {
        return $e;
        function $e(ot) {
          const Pn = ot !== null && me[ot], _n = ot !== null && me.null, Ai = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Pn) ? Pn : Pn ? [Pn] : [],
            ...Array.isArray(_n) ? _n : _n ? [_n] : []
          ];
          return C(Ai)(ot);
        }
      }
      function C(me) {
        return fe = me, U = 0, me.length === 0 ? te : tt(me[U]);
      }
      function tt(me) {
        return $e;
        function $e(ot) {
          return $ = P(), V = me, me.partial || (u.currentConstruct = me), me.name && u.parser.constructs.disable.null.includes(me.name) ? Qe() : me.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            F ? Object.assign(Object.create(u), F) : u,
            s,
            Ge,
            Qe
          )(ot);
        }
      }
      function Ge(me) {
        return I(V, $), re;
      }
      function Qe(me) {
        return $.restore(), ++U < fe.length ? tt(fe[U]) : te;
      }
    }
  }
  function T(I, F) {
    I.resolveAll && !o.includes(I) && o.push(I), I.resolve && lr(
      u.events,
      F,
      u.events.length - F,
      I.resolve(u.events.slice(F), u)
    ), I.resolveTo && (u.events = I.resolveTo(u.events, u));
  }
  function P() {
    const I = h(), F = u.previous, B = u.currentConstruct, q = u.events.length, re = Array.from(l);
    return {
      restore: te,
      from: q
    };
    function te() {
      r = I, u.previous = F, u.currentConstruct = B, u.events.length = q, l = re, _();
    }
  }
  function _() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function I5(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let a;
  return n === i ? a = [e[n].slice(r, o)] : (a = e.slice(n, i), r > -1 && (a[0] = a[0].slice(r)), o > 0 && a.push(e[i].slice(0, o))), a;
}
function P5(e, t) {
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
const _5 = {
  [42]: Rt,
  [43]: Rt,
  [45]: Rt,
  [48]: Rt,
  [49]: Rt,
  [50]: Rt,
  [51]: Rt,
  [52]: Rt,
  [53]: Rt,
  [54]: Rt,
  [55]: Rt,
  [56]: Rt,
  [57]: Rt,
  [62]: BE
}, N5 = {
  [91]: LN
}, D5 = {
  [-2]: Ld,
  [-1]: Ld,
  [32]: Ld
}, R5 = {
  [35]: WN,
  [42]: yu,
  [45]: [L1, yu],
  [60]: GN,
  [61]: L1,
  [95]: yu,
  [96]: D1,
  [126]: D1
}, L5 = {
  [38]: zE,
  [92]: UE
}, F5 = {
  [-5]: Fd,
  [-4]: Fd,
  [-3]: Fd,
  [33]: l5,
  [38]: zE,
  [42]: Ah,
  [60]: [pN, KN],
  [91]: u5,
  [92]: [UN, UE],
  [93]: wg,
  [95]: Ah,
  [96]: xN
}, M5 = {
  null: [Ah, C5]
}, B5 = {
  null: [42, 95]
}, U5 = {
  null: []
}, z5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: B5,
  contentInitial: N5,
  disable: U5,
  document: _5,
  flow: R5,
  flowInitial: D5,
  insideSpan: M5,
  string: L5,
  text: F5
}, Symbol.toStringTag, { value: "Module" }));
function W5(e = {}) {
  const t = q3(
    // @ts-expect-error Same as above.
    [z5].concat(e.extensions || [])
  ), n = {
    defined: [],
    lazy: {},
    constructs: t,
    content: r(aN),
    document: r(sN),
    flow: r(E5),
    string: r(x5),
    text: r(k5)
  };
  return n;
  function r(i) {
    return o;
    function o(a) {
      return T5(n, i, a);
    }
  }
}
const F1 = /[\0\t\n\r]/g;
function j5() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, a, l) {
    const s = [];
    let u, c, f, d, p;
    for (o = t + o.toString(a), f = 0, t = "", n && (o.charCodeAt(0) === 65279 && f++, n = void 0); f < o.length; ) {
      if (F1.lastIndex = f, u = F1.exec(o), d = u && u.index !== void 0 ? u.index : o.length, p = o.charCodeAt(d), !u) {
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
function Y5(e) {
  for (; !WE(e); )
    ;
  return e;
}
function HE(e, t) {
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
const V5 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function G5(e) {
  return e.replace(V5, $5);
}
function $5(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return HE(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return yg(n) || e;
}
const Ch = {}.hasOwnProperty, H5 = (
  /**
   * @type {(
   *   ((value: Value, encoding: Encoding, options?: Options) => Root) &
   *   ((value: Value, options?: Options) => Root)
   * )}
   */
  /**
   * @param {Value} value
   * @param {Encoding} [encoding]
   * @param {Options} [options]
   * @returns {Root}
   */
  function(e, t, n) {
    return typeof t != "string" && (n = t, t = void 0), J5(n)(
      Y5(
        W5(n).document().write(j5()(e, t, !0))
      )
    );
  }
);
function J5(e = {}) {
  const t = JE(
    {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: s(Ci),
        autolinkProtocol: F,
        autolinkEmail: F,
        atxHeading: s(wa),
        blockQuote: s(Rf),
        characterEscape: F,
        characterReference: F,
        codeFenced: s(ya),
        codeFencedFenceInfo: u,
        codeFencedFenceMeta: u,
        codeIndented: s(ya, u),
        codeText: s(Lf, u),
        codeTextData: F,
        data: F,
        codeFlowValue: F,
        definition: s(Ff),
        definitionDestinationString: u,
        definitionLabelString: u,
        definitionTitleString: u,
        emphasis: s(As),
        hardBreakEscape: s(Cs),
        hardBreakTrailing: s(Cs),
        htmlFlow: s(xs, u),
        htmlFlowData: F,
        htmlText: s(xs, u),
        htmlTextData: F,
        image: s(dr),
        label: u,
        link: s(Ci),
        listItem: s(ks),
        listItemValue: m,
        listOrdered: s(ba, h),
        listUnordered: s(ba),
        paragraph: s(Sa),
        reference: me,
        referenceString: u,
        resourceDestinationString: u,
        resourceTitleString: u,
        setextHeading: s(wa),
        strong: s(Os),
        thematicBreak: s(Is)
      },
      exit: {
        atxHeading: f(),
        atxHeadingSequence: T,
        autolink: f(),
        autolinkEmail: Ai,
        autolinkProtocol: _n,
        blockQuote: f(),
        characterEscapeValue: B,
        characterReferenceMarkerHexadecimal: ot,
        characterReferenceMarkerNumeric: ot,
        characterReferenceValue: Pn,
        codeFenced: f(w),
        codeFencedFence: v,
        codeFencedFenceInfo: S,
        codeFencedFenceMeta: g,
        codeFlowValue: B,
        codeIndented: f(E),
        codeText: f(U),
        codeTextData: B,
        data: B,
        definition: f(),
        definitionDestinationString: A,
        definitionLabelString: O,
        definitionTitleString: b,
        emphasis: f(),
        hardBreakEscape: f(re),
        hardBreakTrailing: f(re),
        htmlFlow: f(te),
        htmlFlowData: B,
        htmlText: f(fe),
        htmlTextData: B,
        image: f($),
        label: C,
        labelText: x,
        lineEnding: q,
        link: f(V),
        listItem: f(),
        listOrdered: f(),
        listUnordered: f(),
        paragraph: f(),
        referenceString: $e,
        resourceDestinationString: tt,
        resourceTitleString: Ge,
        resource: Qe,
        setextHeading: f(I),
        setextHeadingLineSequence: _,
        setextHeadingText: P,
        strong: f(),
        thematicBreak: f()
      }
    },
    e.mdastExtensions || []
  ), n = {};
  return r;
  function r(D) {
    let Y = {
      type: "root",
      children: []
    };
    const oe = [Y], Ee = [], un = [], Ea = {
      stack: oe,
      tokenStack: Ee,
      config: t,
      enter: c,
      exit: d,
      buffer: u,
      resume: p,
      setData: o,
      getData: a
    };
    let ke = -1;
    for (; ++ke < D.length; )
      if (D[ke][1].type === "listOrdered" || D[ke][1].type === "listUnordered")
        if (D[ke][0] === "enter")
          un.push(ke);
        else {
          const ct = un.pop();
          ke = i(D, ct, ke);
        }
    for (ke = -1; ++ke < D.length; ) {
      const ct = t[D[ke][0]];
      Ch.call(ct, D[ke][1].type) && ct[D[ke][1].type].call(
        Object.assign(
          {
            sliceSerialize: D[ke][2].sliceSerialize
          },
          Ea
        ),
        D[ke][1]
      );
    }
    if (Ee.length > 0) {
      const ct = Ee[Ee.length - 1];
      (ct[1] || M1).call(Ea, void 0, ct[0]);
    }
    for (Y.position = {
      start: l(
        D.length > 0 ? D[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: l(
        D.length > 0 ? D[D.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    }, ke = -1; ++ke < t.transforms.length; )
      Y = t.transforms[ke](Y) || Y;
    return Y;
  }
  function i(D, Y, oe) {
    let Ee = Y - 1, un = -1, Ea = !1, ke, ct, ao, Aa;
    for (; ++Ee <= oe; ) {
      const He = D[Ee];
      if (He[1].type === "listUnordered" || He[1].type === "listOrdered" || He[1].type === "blockQuote" ? (He[0] === "enter" ? un++ : un--, Aa = void 0) : He[1].type === "lineEndingBlank" ? He[0] === "enter" && (ke && !Aa && !un && !ao && (ao = Ee), Aa = void 0) : He[1].type === "linePrefix" || He[1].type === "listItemValue" || He[1].type === "listItemMarker" || He[1].type === "listItemPrefix" || He[1].type === "listItemPrefixWhitespace" || (Aa = void 0), !un && He[0] === "enter" && He[1].type === "listItemPrefix" || un === -1 && He[0] === "exit" && (He[1].type === "listUnordered" || He[1].type === "listOrdered")) {
        if (ke) {
          let Mf = Ee;
          for (ct = void 0; Mf--; ) {
            const pr = D[Mf];
            if (pr[1].type === "lineEnding" || pr[1].type === "lineEndingBlank") {
              if (pr[0] === "exit")
                continue;
              ct && (D[ct][1].type = "lineEndingBlank", Ea = !0), pr[1].type = "lineEnding", ct = Mf;
            } else if (!(pr[1].type === "linePrefix" || pr[1].type === "blockQuotePrefix" || pr[1].type === "blockQuotePrefixWhitespace" || pr[1].type === "blockQuoteMarker" || pr[1].type === "listItemIndent"))
              break;
          }
          ao && (!ct || ao < ct) && (ke._spread = !0), ke.end = Object.assign(
            {},
            ct ? D[ct][1].start : He[1].end
          ), D.splice(ct || Ee, 0, ["exit", ke, He[2]]), Ee++, oe++;
        }
        He[1].type === "listItemPrefix" && (ke = {
          type: "listItem",
          // @ts-expect-error Patched
          _spread: !1,
          start: Object.assign({}, He[1].start)
        }, D.splice(Ee, 0, ["enter", ke, He[2]]), Ee++, oe++, ao = void 0, Aa = !0);
      }
    }
    return D[Y][1]._spread = Ea, oe;
  }
  function o(D, Y) {
    n[D] = Y;
  }
  function a(D) {
    return n[D];
  }
  function l(D) {
    return {
      line: D.line,
      column: D.column,
      offset: D.offset
    };
  }
  function s(D, Y) {
    return oe;
    function oe(Ee) {
      c.call(this, D(Ee), Ee), Y && Y.call(this, Ee);
    }
  }
  function u() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function c(D, Y, oe) {
    return this.stack[this.stack.length - 1].children.push(D), this.stack.push(D), this.tokenStack.push([Y, oe]), D.position = {
      start: l(Y.start)
    }, D;
  }
  function f(D) {
    return Y;
    function Y(oe) {
      D && D.call(this, oe), d.call(this, oe);
    }
  }
  function d(D, Y) {
    const oe = this.stack.pop(), Ee = this.tokenStack.pop();
    if (Ee)
      Ee[0].type !== D.type && (Y ? Y.call(this, D, Ee[0]) : (Ee[1] || M1).call(this, D, Ee[0]));
    else
      throw new Error(
        "Cannot close `" + D.type + "` (" + Mo({
          start: D.start,
          end: D.end
        }) + "): it’s not open"
      );
    return oe.position.end = l(D.end), oe;
  }
  function p() {
    return X3(this.stack.pop());
  }
  function h() {
    o("expectingFirstListItemValue", !0);
  }
  function m(D) {
    if (a("expectingFirstListItemValue")) {
      const Y = (
        /** @type {List} */
        this.stack[this.stack.length - 2]
      );
      Y.start = Number.parseInt(this.sliceSerialize(D), 10), o("expectingFirstListItemValue");
    }
  }
  function S() {
    const D = this.resume(), Y = (
      /** @type {Code} */
      this.stack[this.stack.length - 1]
    );
    Y.lang = D;
  }
  function g() {
    const D = this.resume(), Y = (
      /** @type {Code} */
      this.stack[this.stack.length - 1]
    );
    Y.meta = D;
  }
  function v() {
    a("flowCodeInside") || (this.buffer(), o("flowCodeInside", !0));
  }
  function w() {
    const D = this.resume(), Y = (
      /** @type {Code} */
      this.stack[this.stack.length - 1]
    );
    Y.value = D.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), o("flowCodeInside");
  }
  function E() {
    const D = this.resume(), Y = (
      /** @type {Code} */
      this.stack[this.stack.length - 1]
    );
    Y.value = D.replace(/(\r?\n|\r)$/g, "");
  }
  function O(D) {
    const Y = this.resume(), oe = (
      /** @type {Definition} */
      this.stack[this.stack.length - 1]
    );
    oe.label = Y, oe.identifier = Bo(
      this.sliceSerialize(D)
    ).toLowerCase();
  }
  function b() {
    const D = this.resume(), Y = (
      /** @type {Definition} */
      this.stack[this.stack.length - 1]
    );
    Y.title = D;
  }
  function A() {
    const D = this.resume(), Y = (
      /** @type {Definition} */
      this.stack[this.stack.length - 1]
    );
    Y.url = D;
  }
  function T(D) {
    const Y = (
      /** @type {Heading} */
      this.stack[this.stack.length - 1]
    );
    if (!Y.depth) {
      const oe = this.sliceSerialize(D).length;
      Y.depth = oe;
    }
  }
  function P() {
    o("setextHeadingSlurpLineEnding", !0);
  }
  function _(D) {
    const Y = (
      /** @type {Heading} */
      this.stack[this.stack.length - 1]
    );
    Y.depth = this.sliceSerialize(D).charCodeAt(0) === 61 ? 1 : 2;
  }
  function I() {
    o("setextHeadingSlurpLineEnding");
  }
  function F(D) {
    const Y = (
      /** @type {Parent} */
      this.stack[this.stack.length - 1]
    );
    let oe = Y.children[Y.children.length - 1];
    (!oe || oe.type !== "text") && (oe = Ts(), oe.position = {
      start: l(D.start)
    }, Y.children.push(oe)), this.stack.push(oe);
  }
  function B(D) {
    const Y = this.stack.pop();
    Y.value += this.sliceSerialize(D), Y.position.end = l(D.end);
  }
  function q(D) {
    const Y = this.stack[this.stack.length - 1];
    if (a("atHardBreak")) {
      const oe = Y.children[Y.children.length - 1];
      oe.position.end = l(D.end), o("atHardBreak");
      return;
    }
    !a("setextHeadingSlurpLineEnding") && t.canContainEols.includes(Y.type) && (F.call(this, D), B.call(this, D));
  }
  function re() {
    o("atHardBreak", !0);
  }
  function te() {
    const D = this.resume(), Y = (
      /** @type {HTML} */
      this.stack[this.stack.length - 1]
    );
    Y.value = D;
  }
  function fe() {
    const D = this.resume(), Y = (
      /** @type {HTML} */
      this.stack[this.stack.length - 1]
    );
    Y.value = D;
  }
  function U() {
    const D = this.resume(), Y = (
      /** @type {InlineCode} */
      this.stack[this.stack.length - 1]
    );
    Y.value = D;
  }
  function V() {
    const D = (
      /** @type {Link & {identifier: string, label: string}} */
      this.stack[this.stack.length - 1]
    );
    a("inReference") ? (D.type += "Reference", D.referenceType = a("referenceType") || "shortcut", delete D.url, delete D.title) : (delete D.identifier, delete D.label), o("referenceType");
  }
  function $() {
    const D = (
      /** @type {Image & {identifier: string, label: string}} */
      this.stack[this.stack.length - 1]
    );
    a("inReference") ? (D.type += "Reference", D.referenceType = a("referenceType") || "shortcut", delete D.url, delete D.title) : (delete D.identifier, delete D.label), o("referenceType");
  }
  function x(D) {
    const Y = (
      /** @type {(Link|Image) & {identifier: string, label: string}} */
      this.stack[this.stack.length - 2]
    ), oe = this.sliceSerialize(D);
    Y.label = G5(oe), Y.identifier = Bo(oe).toLowerCase();
  }
  function C() {
    const D = (
      /** @type {Fragment} */
      this.stack[this.stack.length - 1]
    ), Y = this.resume(), oe = (
      /** @type {(Link|Image) & {identifier: string, label: string}} */
      this.stack[this.stack.length - 1]
    );
    o("inReference", !0), oe.type === "link" ? oe.children = D.children : oe.alt = Y;
  }
  function tt() {
    const D = this.resume(), Y = (
      /** @type {Link|Image} */
      this.stack[this.stack.length - 1]
    );
    Y.url = D;
  }
  function Ge() {
    const D = this.resume(), Y = (
      /** @type {Link|Image} */
      this.stack[this.stack.length - 1]
    );
    Y.title = D;
  }
  function Qe() {
    o("inReference");
  }
  function me() {
    o("referenceType", "collapsed");
  }
  function $e(D) {
    const Y = this.resume(), oe = (
      /** @type {LinkReference|ImageReference} */
      this.stack[this.stack.length - 1]
    );
    oe.label = Y, oe.identifier = Bo(
      this.sliceSerialize(D)
    ).toLowerCase(), o("referenceType", "full");
  }
  function ot(D) {
    o("characterReferenceType", D.type);
  }
  function Pn(D) {
    const Y = this.sliceSerialize(D), oe = a("characterReferenceType");
    let Ee;
    oe ? (Ee = HE(
      Y,
      oe === "characterReferenceMarkerNumeric" ? 10 : 16
    ), o("characterReferenceType")) : Ee = yg(Y);
    const un = this.stack.pop();
    un.value += Ee, un.position.end = l(D.end);
  }
  function _n(D) {
    B.call(this, D);
    const Y = (
      /** @type {Link} */
      this.stack[this.stack.length - 1]
    );
    Y.url = this.sliceSerialize(D);
  }
  function Ai(D) {
    B.call(this, D);
    const Y = (
      /** @type {Link} */
      this.stack[this.stack.length - 1]
    );
    Y.url = "mailto:" + this.sliceSerialize(D);
  }
  function Rf() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ya() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Lf() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ff() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function As() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function wa() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function Cs() {
    return {
      type: "break"
    };
  }
  function xs() {
    return {
      type: "html",
      value: ""
    };
  }
  function dr() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ci() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ba(D) {
    return {
      type: "list",
      ordered: D.type === "listOrdered",
      start: null,
      // @ts-expect-error Patched.
      spread: D._spread,
      children: []
    };
  }
  function ks(D) {
    return {
      type: "listItem",
      // @ts-expect-error Patched.
      spread: D._spread,
      checked: null,
      children: []
    };
  }
  function Sa() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Os() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ts() {
    return {
      type: "text",
      value: ""
    };
  }
  function Is() {
    return {
      type: "thematicBreak"
    };
  }
}
function JE(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? JE(e, r) : Q5(e, r);
  }
  return e;
}
function Q5(e, t) {
  let n;
  for (n in t)
    if (Ch.call(t, n)) {
      const r = n === "canContainEols" || n === "transforms", o = (Ch.call(e, n) ? e[n] : void 0) || (e[n] = r ? [] : {}), a = t[n];
      a && (r ? e[n] = [...o, ...a] : Object.assign(o, a));
    }
}
function M1(e, t) {
  throw e ? new Error(
    "Cannot close `" + e.type + "` (" + Mo({
      start: e.start,
      end: e.end
    }) + "): a different token (`" + t.type + "`, " + Mo({
      start: t.start,
      end: t.end
    }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + Mo({
      start: t.start,
      end: t.end
    }) + ") is still open"
  );
}
function K5(e) {
  Object.assign(this, { Parser: (n) => {
    const r = (
      /** @type {Options} */
      this.data("settings")
    );
    return H5(
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
var it = (
  /**
  * @type {BuildVoid & BuildVoidWithProps & BuildLiteral & BuildLiteralWithProps & BuildParent & BuildParentWithProps}
  */
  /**
   * @param {string} type Type of node
   * @param {Props|ChildrenOrValue} [props] Additional properties for node (or `children` or `value`)
   * @param {ChildrenOrValue} [value] `children` or `value` of node
   * @returns {Node}
   */
  function(e, t, n) {
    var r = { type: String(e) };
    return n == null && (typeof t == "string" || Array.isArray(t)) ? n = t : Object.assign(r, t), Array.isArray(n) ? r.children = n : n != null && (r.value = String(n)), r;
  }
);
const wu = {}.hasOwnProperty;
function X5(e, t) {
  const n = t.data || {};
  return "value" in t && !(wu.call(n, "hName") || wu.call(n, "hProperties") || wu.call(n, "hChildren")) ? e.augment(t, it("text", t.value)) : e(t, "div", Ct(e, t));
}
function QE(e, t, n) {
  const r = t && t.type;
  let i;
  if (!r)
    throw new Error("Expected node, got `" + t + "`");
  return wu.call(e.handlers, r) ? i = e.handlers[r] : e.passThrough && e.passThrough.includes(r) ? i = q5 : i = e.unknownHandler, (typeof i == "function" ? i : X5)(e, t, n);
}
function q5(e, t) {
  return "children" in t ? Q(M({}, t), { children: Ct(e, t) }) : t;
}
function Ct(e, t) {
  const n = [];
  if ("children" in t) {
    const r = t.children;
    let i = -1;
    for (; ++i < r.length; ) {
      const o = QE(e, r[i], t);
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
const KE = (
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * Generate an assertion from a check.
   * @param {Test} [test]
   * When nullish, checks if `node` is a `Node`.
   * When `string`, works like passing `function (node) {return node.type === test}`.
   * When `function` checks if function passed the node is true.
   * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
   * When `array`, checks any one of the subtests pass.
   * @returns {AssertAnything}
   */
  function(e) {
    if (e == null)
      return nD;
    if (typeof e == "string")
      return tD(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Z5(e) : eD(e);
    if (typeof e == "function")
      return gf(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Z5(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = KE(e[n]);
  return gf(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].call(this, ...i))
        return !0;
    return !1;
  }
}
function eD(e) {
  return gf(t);
  function t(n) {
    let r;
    for (r in e)
      if (n[r] !== e[r])
        return !1;
    return !0;
  }
}
function tD(e) {
  return gf(t);
  function t(n) {
    return n && n.type === e;
  }
}
function gf(e) {
  return t;
  function t(...n) {
    return Boolean(e.call(this, ...n));
  }
}
function nD() {
  return !0;
}
const rD = !0, iD = "skip", B1 = !1, oD = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {import('./complex-types.js').Visitor<Node>} visitor
   * @param {boolean} [reverse=false]
   */
  function(e, t, n, r) {
    typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null);
    const i = KE(t), o = r ? -1 : 1;
    a(e, null, [])();
    function a(l, s, u) {
      const c = typeof l == "object" && l !== null ? l : {};
      let f;
      return typeof c.type == "string" && (f = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0, Object.defineProperty(d, "name", {
        value: "node (" + (c.type + (f ? "<" + f + ">" : "")) + ")"
      })), d;
      function d() {
        let p = [], h, m, S;
        if ((!t || i(l, s, u[u.length - 1] || null)) && (p = aD(n(l, u)), p[0] === B1))
          return p;
        if (l.children && p[0] !== iD)
          for (m = (r ? l.children.length : -1) + o, S = u.concat(l); m > -1 && m < l.children.length; ) {
            if (h = a(l.children[m], m, S)(), h[0] === B1)
              return h;
            m = typeof h[1] == "number" ? h[1] : m + o;
          }
        return p;
      }
    }
  }
);
function aD(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [rD, e] : [e];
}
const XE = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {import('./complex-types.js').Visitor} visitor
   * @param {boolean} [reverse]
   */
  function(e, t, n, r) {
    typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), oD(e, t, i, r);
    function i(o, a) {
      const l = a[a.length - 1];
      return n(
        o,
        l ? l.children.indexOf(o) : null,
        l
      );
    }
  }
), qE = eA("start"), ZE = eA("end");
function eA(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    return {
      line: r.line || null,
      column: r.column || null,
      offset: r.offset > -1 ? r.offset : null
    };
  }
}
function lD(e) {
  return !e || !e.position || !e.position.start || !e.position.start.line || !e.position.start.column || !e.position.end || !e.position.end.line || !e.position.end.column;
}
const U1 = {}.hasOwnProperty;
function sD(e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (!e || !e.type)
    throw new Error("mdast-util-definitions expected node");
  return XE(e, "definition", (r) => {
    const i = z1(r.identifier);
    i && !U1.call(t, i) && (t[i] = r);
  }), n;
  function n(r) {
    const i = z1(r);
    return i && U1.call(t, i) ? t[i] : null;
  }
}
function z1(e) {
  return String(e || "").toUpperCase();
}
function ma(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const o = e.charCodeAt(n);
    let a = "";
    if (o === 37 && en(e.charCodeAt(n + 1)) && en(e.charCodeAt(n + 2)))
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
function Er(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push(it("text", `
`)); ++r < e.length; )
    r && n.push(it("text", `
`)), n.push(e[r]);
  return t && e.length > 0 && n.push(it("text", `
`)), n;
}
function uD(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.footnoteOrder.length; ) {
    const r = e.footnoteById[e.footnoteOrder[t].toUpperCase()];
    if (!r)
      continue;
    const i = Ct(e, r), o = String(r.identifier), a = ma(o.toLowerCase());
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
      children: Er(i, !0)
    };
    r.position && (c.position = r.position), n.push(c);
  }
  return n.length === 0 ? null : {
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
        children: [it("text", e.footnoteLabel)]
      },
      { type: "text", value: `
` },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: Er(n, !0)
      },
      { type: "text", value: `
` }
    ]
  };
}
function cD(e, t) {
  return e(t, "blockquote", Er(Ct(e, t), !0));
}
function fD(e, t) {
  return [e(t, "br"), it("text", `
`)];
}
function dD(e, t) {
  const n = t.value ? t.value + `
` : "", r = t.lang && t.lang.match(/^[^ \t]+(?=[ \t]|$)/), i = {};
  r && (i.className = ["language-" + r]);
  const o = e(t, "code", i, [it("text", n)]);
  return t.meta && (o.data = { meta: t.meta }), e(t.position, "pre", [o]);
}
function pD(e, t) {
  return e(t, "del", Ct(e, t));
}
function hD(e, t) {
  return e(t, "em", Ct(e, t));
}
function tA(e, t) {
  const n = String(t.identifier), r = ma(n.toLowerCase()), i = e.footnoteOrder.indexOf(n);
  let o;
  i === -1 ? (e.footnoteOrder.push(n), e.footnoteCounts[n] = 1, o = e.footnoteOrder.length) : (e.footnoteCounts[n]++, o = i + 1);
  const a = e.footnoteCounts[n];
  return e(t, "sup", [
    e(
      t.position,
      "a",
      {
        href: "#" + e.clobberPrefix + "fn-" + r,
        id: e.clobberPrefix + "fnref-" + r + (a > 1 ? "-" + a : ""),
        dataFootnoteRef: !0,
        ariaDescribedBy: "footnote-label"
      },
      [it("text", String(o))]
    )
  ]);
}
function mD(e, t) {
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
  }, tA(e, {
    type: "footnoteReference",
    identifier: i,
    position: t.position
  });
}
function gD(e, t) {
  return e(t, "h" + t.depth, Ct(e, t));
}
function vD(e, t) {
  return e.dangerous ? e.augment(t, it("raw", t.value)) : null;
}
function nA(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return it("text", "![" + t.alt + r);
  const i = Ct(e, t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift(it("text", "["));
  const a = i[i.length - 1];
  return a && a.type === "text" ? a.value += r : i.push(it("text", r)), i;
}
function yD(e, t) {
  const n = e.definition(t.identifier);
  if (!n)
    return nA(e, t);
  const r = { src: ma(n.url || ""), alt: t.alt };
  return n.title !== null && n.title !== void 0 && (r.title = n.title), e(t, "img", r);
}
function wD(e, t) {
  const n = { src: ma(t.url), alt: t.alt };
  return t.title !== null && t.title !== void 0 && (n.title = t.title), e(t, "img", n);
}
function bD(e, t) {
  return e(t, "code", [it("text", t.value.replace(/\r?\n|\r/g, " "))]);
}
function SD(e, t) {
  const n = e.definition(t.identifier);
  if (!n)
    return nA(e, t);
  const r = { href: ma(n.url || "") };
  return n.title !== null && n.title !== void 0 && (r.title = n.title), e(t, "a", r, Ct(e, t));
}
function ED(e, t) {
  const n = { href: ma(t.url) };
  return t.title !== null && t.title !== void 0 && (n.title = t.title), e(t, "a", n, Ct(e, t));
}
function AD(e, t, n) {
  const r = Ct(e, t), i = n ? CD(n) : rA(t), o = {}, a = [];
  if (typeof t.checked == "boolean") {
    let u;
    r[0] && r[0].type === "element" && r[0].tagName === "p" ? u = r[0] : (u = e(null, "p", []), r.unshift(u)), u.children.length > 0 && u.children.unshift(it("text", " ")), u.children.unshift(
      e(null, "input", {
        type: "checkbox",
        checked: t.checked,
        disabled: !0
      })
    ), o.className = ["task-list-item"];
  }
  let l = -1;
  for (; ++l < r.length; ) {
    const u = r[l];
    (i || l !== 0 || u.type !== "element" || u.tagName !== "p") && a.push(it("text", `
`)), u.type === "element" && u.tagName === "p" && !i ? a.push(...u.children) : a.push(u);
  }
  const s = r[r.length - 1];
  return s && (i || !("tagName" in s) || s.tagName !== "p") && a.push(it("text", `
`)), e(t, "li", o, a);
}
function CD(e) {
  let t = e.spread;
  const n = e.children;
  let r = -1;
  for (; !t && ++r < n.length; )
    t = rA(n[r]);
  return Boolean(t);
}
function rA(e) {
  const t = e.spread;
  return t == null ? e.children.length > 1 : t;
}
function xD(e, t) {
  const n = {}, r = t.ordered ? "ol" : "ul", i = Ct(e, t);
  let o = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++o < i.length; ) {
    const a = i[o];
    if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  return e(t, r, n, Er(i, !0));
}
function kD(e, t) {
  return e(t, "p", Ct(e, t));
}
function OD(e, t) {
  return e.augment(t, it("root", Er(Ct(e, t))));
}
function TD(e, t) {
  return e(t, "strong", Ct(e, t));
}
function ID(e, t) {
  const n = t.children;
  let r = -1;
  const i = t.align || [], o = [];
  for (; ++r < n.length; ) {
    const a = n[r].children, l = r === 0 ? "th" : "td", s = [];
    let u = -1;
    const c = t.align ? i.length : a.length;
    for (; ++u < c; ) {
      const f = a[u];
      s.push(
        e(f, l, { align: i[u] }, f ? Ct(e, f) : [])
      );
    }
    o[r] = e(n[r], "tr", Er(s, !0));
  }
  return e(
    t,
    "table",
    Er(
      [e(o[0].position, "thead", Er([o[0]], !0))].concat(
        o[1] ? e(
          {
            start: qE(o[1]),
            end: ZE(o[o.length - 1])
          },
          "tbody",
          Er(o.slice(1), !0)
        ) : []
      ),
      !0
    )
  );
}
const W1 = 9, j1 = 32;
function PD(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      Y1(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push(Y1(t.slice(i), i > 0, !1)), o.join("");
}
function Y1(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === W1 || o === j1; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === W1 || o === j1; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function _D(e, t) {
  return e.augment(t, it("text", PD(String(t.value))));
}
function ND(e, t) {
  return e(t, "hr");
}
const DD = {
  blockquote: cD,
  break: fD,
  code: dD,
  delete: pD,
  emphasis: hD,
  footnoteReference: tA,
  footnote: mD,
  heading: gD,
  html: vD,
  imageReference: yD,
  image: wD,
  inlineCode: bD,
  linkReference: SD,
  link: ED,
  listItem: AD,
  list: xD,
  paragraph: kD,
  root: OD,
  strong: TD,
  table: ID,
  text: _D,
  thematicBreak: ND,
  toml: Qs,
  yaml: Qs,
  definition: Qs,
  footnoteDefinition: Qs
};
function Qs() {
  return null;
}
const RD = {}.hasOwnProperty;
function LD(e, t) {
  const n = t || {}, r = n.allowDangerousHtml || !1, i = {};
  return a.dangerous = r, a.clobberPrefix = n.clobberPrefix === void 0 || n.clobberPrefix === null ? "user-content-" : n.clobberPrefix, a.footnoteLabel = n.footnoteLabel || "Footnotes", a.footnoteLabelTagName = n.footnoteLabelTagName || "h2", a.footnoteLabelProperties = n.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a.footnoteBackLabel = n.footnoteBackLabel || "Back to content", a.definition = sD(e), a.footnoteById = i, a.footnoteOrder = [], a.footnoteCounts = {}, a.augment = o, a.handlers = M(M({}, DD), n.handlers), a.unknownHandler = n.unknownHandler, a.passThrough = n.passThrough, XE(e, "footnoteDefinition", (l) => {
    const s = String(l.identifier).toUpperCase();
    RD.call(i, s) || (i[s] = l);
  }), a;
  function o(l, s) {
    if (l && "data" in l && l.data) {
      const u = l.data;
      u.hName && (s.type !== "element" && (s = {
        type: "element",
        tagName: "",
        properties: {},
        children: []
      }), s.tagName = u.hName), s.type === "element" && u.hProperties && (s.properties = M(M({}, s.properties), u.hProperties)), "children" in s && s.children && u.hChildren && (s.children = u.hChildren);
    }
    if (l) {
      const u = "type" in l ? l : { position: l };
      lD(u) || (s.position = { start: qE(u), end: ZE(u) });
    }
    return s;
  }
  function a(l, s, u, c) {
    return Array.isArray(u) && (c = u, u = {}), o(l, {
      type: "element",
      tagName: s,
      properties: u || {},
      children: c || []
    });
  }
}
function iA(e, t) {
  const n = LD(e, t), r = QE(n, e, null), i = uD(n);
  return i && r.children.push(it("text", `
`), i), Array.isArray(r) ? { type: "root", children: r } : r;
}
const FD = (
  /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
  function(e, t) {
    return e && "run" in e ? BD(e, t) : UD(e || t);
  }
), MD = FD;
function BD(e, t) {
  return (n, r, i) => {
    e.run(iA(n, t), r, (o) => {
      i(o);
    });
  };
}
function UD(e) {
  return (t) => iA(t, e);
}
class vs {
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
vs.prototype.property = {};
vs.prototype.normal = {};
vs.prototype.space = null;
function oA(e, t) {
  const n = {}, r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new vs(n, r, t);
}
function xh(e) {
  return e.toLowerCase();
}
class On {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
On.prototype.space = null;
On.prototype.boolean = !1;
On.prototype.booleanish = !1;
On.prototype.overloadedBoolean = !1;
On.prototype.number = !1;
On.prototype.commaSeparated = !1;
On.prototype.spaceSeparated = !1;
On.prototype.commaOrSpaceSeparated = !1;
On.prototype.mustUseProperty = !1;
On.prototype.defined = !1;
let zD = 0;
const le = ro(), Xe = ro(), aA = ro(), W = ro(), Te = ro(), Uo = ro(), $t = ro();
function ro() {
  return Gg(2, ++zD);
}
const kh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: le,
  booleanish: Xe,
  commaOrSpaceSeparated: $t,
  commaSeparated: Uo,
  number: W,
  overloadedBoolean: aA,
  spaceSeparated: Te
}, Symbol.toStringTag, { value: "Module" })), Md = Object.keys(kh);
class bg extends On {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), V1(this, "space", i), typeof r == "number")
      for (; ++o < Md.length; ) {
        const a = Md[o];
        V1(this, Md[o], (r & kh[a]) === kh[a]);
      }
  }
}
bg.prototype.defined = !0;
function V1(e, t, n) {
  n && (e[t] = n);
}
const WD = {}.hasOwnProperty;
function ga(e) {
  const t = {}, n = {};
  let r;
  for (r in e.properties)
    if (WD.call(e.properties, r)) {
      const i = e.properties[r], o = new bg(
        r,
        e.transform(e.attributes || {}, r),
        i,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[xh(r)] = r, n[xh(o.attribute)] = r;
    }
  return new vs(t, n, e.space);
}
const lA = ga({
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
}), sA = ga({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function uA(e, t) {
  return t in e ? e[t] : t;
}
function cA(e, t) {
  return uA(e, t.toLowerCase());
}
const fA = ga({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: cA,
  properties: { xmlns: null, xmlnsXLink: null }
}), dA = ga({
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
}), jD = ga({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: cA,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Uo,
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
    coords: W | Uo,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: le,
    defer: le,
    dir: null,
    dirName: null,
    disabled: le,
    download: aA,
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
}), YD = ga({
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
  transform: uA,
  properties: {
    about: $t,
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
    g1: Uo,
    g2: Uo,
    glyphName: Uo,
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
    kernelMatrix: $t,
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
    property: $t,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: $t,
    rev: $t,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: $t,
    requiredFeatures: $t,
    requiredFonts: $t,
    requiredFormats: $t,
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
    strokeDashArray: $t,
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
    systemLanguage: $t,
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
    typeOf: $t,
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
}), VD = /^data[-\w.:]+$/i, G1 = /-[a-z]/g, GD = /[A-Z]/g;
function $D(e, t) {
  const n = xh(t);
  let r = t, i = On;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && VD.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(G1, JD);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!G1.test(o)) {
        let a = o.replace(GD, HD);
        a.charAt(0) !== "-" && (a = "-" + a), t = "data" + a;
      }
    }
    i = bg;
  }
  return new i(r, t);
}
function HD(e) {
  return "-" + e.toLowerCase();
}
function JD(e) {
  return e.charAt(1).toUpperCase();
}
const $1 = {
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
}, QD = oA([sA, lA, fA, dA, jD], "html"), KD = oA([sA, lA, fA, dA, YD], "svg"), pA = (
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * Generate an assertion from a check.
   * @param {Test} [test]
   * When nullish, checks if `node` is a `Node`.
   * When `string`, works like passing `function (node) {return node.type === test}`.
   * When `function` checks if function passed the node is true.
   * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
   * When `array`, checks any one of the subtests pass.
   * @returns {AssertAnything}
   */
  function(e) {
    if (e == null)
      return e6;
    if (typeof e == "string")
      return ZD(e);
    if (typeof e == "object")
      return Array.isArray(e) ? XD(e) : qD(e);
    if (typeof e == "function")
      return vf(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function XD(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = pA(e[n]);
  return vf(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].call(this, ...i))
        return !0;
    return !1;
  }
}
function qD(e) {
  return vf(t);
  function t(n) {
    let r;
    for (r in e)
      if (n[r] !== e[r])
        return !1;
    return !0;
  }
}
function ZD(e) {
  return vf(t);
  function t(n) {
    return n && n.type === e;
  }
}
function vf(e) {
  return t;
  function t(...n) {
    return Boolean(e.call(this, ...n));
  }
}
function e6() {
  return !0;
}
const t6 = !0, n6 = "skip", H1 = !1, r6 = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {import('./complex-types.js').Visitor<Node>} visitor
   * @param {boolean} [reverse=false]
   */
  function(e, t, n, r) {
    typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null);
    const i = pA(t), o = r ? -1 : 1;
    a(e, null, [])();
    function a(l, s, u) {
      const c = typeof l == "object" && l !== null ? l : {};
      let f;
      return typeof c.type == "string" && (f = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0, Object.defineProperty(d, "name", {
        value: "node (" + (c.type + (f ? "<" + f + ">" : "")) + ")"
      })), d;
      function d() {
        let p = [], h, m, S;
        if ((!t || i(l, s, u[u.length - 1] || null)) && (p = i6(n(l, u)), p[0] === H1))
          return p;
        if (l.children && p[0] !== n6)
          for (m = (r ? l.children.length : -1) + o, S = u.concat(l); m > -1 && m < l.children.length; ) {
            if (h = a(l.children[m], m, S)(), h[0] === H1)
              return h;
            m = typeof h[1] == "number" ? h[1] : m + o;
          }
        return p;
      }
    }
  }
);
function i6(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [t6, e] : [e];
}
const o6 = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {import('./complex-types.js').Visitor} visitor
   * @param {boolean} [reverse]
   */
  function(e, t, n, r) {
    typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), r6(e, t, i, r);
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
function a6(e) {
  if (e.allowedElements && e.disallowedElements)
    throw new TypeError(
      "Only one of `allowedElements` and `disallowedElements` should be defined"
    );
  if (e.allowedElements || e.disallowedElements || e.allowElement)
    return (t) => {
      o6(t, "element", (n, r, i) => {
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
var Oh = {}, l6 = {
  get exports() {
    return Oh;
  },
  set exports(e) {
    Oh = e;
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
var Sg = Symbol.for("react.element"), Eg = Symbol.for("react.portal"), yf = Symbol.for("react.fragment"), wf = Symbol.for("react.strict_mode"), bf = Symbol.for("react.profiler"), Sf = Symbol.for("react.provider"), Ef = Symbol.for("react.context"), s6 = Symbol.for("react.server_context"), Af = Symbol.for("react.forward_ref"), Cf = Symbol.for("react.suspense"), xf = Symbol.for("react.suspense_list"), kf = Symbol.for("react.memo"), Of = Symbol.for("react.lazy"), u6 = Symbol.for("react.offscreen"), hA;
hA = Symbol.for("react.module.reference");
function Tn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Sg:
        switch (e = e.type, e) {
          case yf:
          case bf:
          case wf:
          case Cf:
          case xf:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case s6:
              case Ef:
              case Af:
              case Of:
              case kf:
              case Sf:
                return e;
              default:
                return t;
            }
        }
      case Eg:
        return t;
    }
  }
}
Se.ContextConsumer = Ef;
Se.ContextProvider = Sf;
Se.Element = Sg;
Se.ForwardRef = Af;
Se.Fragment = yf;
Se.Lazy = Of;
Se.Memo = kf;
Se.Portal = Eg;
Se.Profiler = bf;
Se.StrictMode = wf;
Se.Suspense = Cf;
Se.SuspenseList = xf;
Se.isAsyncMode = function() {
  return !1;
};
Se.isConcurrentMode = function() {
  return !1;
};
Se.isContextConsumer = function(e) {
  return Tn(e) === Ef;
};
Se.isContextProvider = function(e) {
  return Tn(e) === Sf;
};
Se.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Sg;
};
Se.isForwardRef = function(e) {
  return Tn(e) === Af;
};
Se.isFragment = function(e) {
  return Tn(e) === yf;
};
Se.isLazy = function(e) {
  return Tn(e) === Of;
};
Se.isMemo = function(e) {
  return Tn(e) === kf;
};
Se.isPortal = function(e) {
  return Tn(e) === Eg;
};
Se.isProfiler = function(e) {
  return Tn(e) === bf;
};
Se.isStrictMode = function(e) {
  return Tn(e) === wf;
};
Se.isSuspense = function(e) {
  return Tn(e) === Cf;
};
Se.isSuspenseList = function(e) {
  return Tn(e) === xf;
};
Se.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === yf || e === bf || e === wf || e === Cf || e === xf || e === u6 || typeof e == "object" && e !== null && (e.$$typeof === Of || e.$$typeof === kf || e.$$typeof === Sf || e.$$typeof === Ef || e.$$typeof === Af || e.$$typeof === hA || e.getModuleId !== void 0);
};
Se.typeOf = Tn;
(function(e) {
  e.exports = Se;
})(l6);
const c6 = /* @__PURE__ */ jh(Oh);
function f6(e) {
  var t = (
    // @ts-ignore looks like a node.
    e && typeof e == "object" && e.type === "text" ? (
      // @ts-ignore looks like a text.
      e.value || ""
    ) : e
  );
  return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
}
function d6(e) {
  return e.join(" ").trim();
}
function p6(e, t) {
  const n = t || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
var J1 = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, h6 = /\n/g, m6 = /^\s*/, g6 = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, v6 = /^:\s*/, y6 = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, w6 = /^[;\s]*/, b6 = /^\s+|\s+$/g, S6 = `
`, Q1 = "/", K1 = "*", Ni = "", E6 = "comment", A6 = "declaration", C6 = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e)
    return [];
  t = t || {};
  var n = 1, r = 1;
  function i(h) {
    var m = h.match(h6);
    m && (n += m.length);
    var S = h.lastIndexOf(S6);
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
    s(m6);
  }
  function c(h) {
    var m;
    for (h = h || []; m = f(); )
      m !== !1 && h.push(m);
    return h;
  }
  function f() {
    var h = o();
    if (!(Q1 != e.charAt(0) || K1 != e.charAt(1))) {
      for (var m = 2; Ni != e.charAt(m) && (K1 != e.charAt(m) || Q1 != e.charAt(m + 1)); )
        ++m;
      if (m += 2, Ni === e.charAt(m - 1))
        return l("End of comment missing");
      var S = e.slice(2, m - 2);
      return r += 2, i(S), e = e.slice(m), r += 2, h({
        type: E6,
        comment: S
      });
    }
  }
  function d() {
    var h = o(), m = s(g6);
    if (m) {
      if (f(), !s(v6))
        return l("property missing ':'");
      var S = s(y6), g = h({
        type: A6,
        property: X1(m[0].replace(J1, Ni)),
        value: S ? X1(S[0].replace(J1, Ni)) : Ni
      });
      return s(w6), g;
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
function X1(e) {
  return e ? e.replace(b6, Ni) : Ni;
}
var x6 = C6;
function k6(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  for (var r, i = x6(e), o = typeof t == "function", a, l, s = 0, u = i.length; s < u; s++)
    r = i[s], a = r.property, l = r.value, o ? t(a, l, r) : l && (n || (n = {}), n[a] = l);
  return n;
}
var O6 = k6;
const Th = {}.hasOwnProperty, T6 = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
function mA(e, t) {
  const n = [];
  let r = -1, i;
  for (; ++r < t.children.length; )
    i = t.children[r], i.type === "element" ? n.push(I6(e, i, r, t)) : i.type === "text" ? (t.type !== "element" || !T6.has(t.tagName) || !f6(i)) && n.push(i.value) : i.type === "raw" && !e.options.skipHtml && n.push(i.value);
  return n;
}
function I6(e, t, n, r) {
  const i = e.options, o = e.schema, a = t.tagName, l = {};
  let s = o, u;
  if (o.space === "html" && a === "svg" && (s = KD, e.schema = s), t.properties)
    for (u in t.properties)
      Th.call(t.properties, u) && _6(l, u, t.properties[u], e);
  (a === "ol" || a === "ul") && e.listDepth++;
  const c = mA(e, t);
  (a === "ol" || a === "ul") && e.listDepth--, e.schema = o;
  const f = t.position || {
    start: { line: null, column: null, offset: null },
    end: { line: null, column: null, offset: null }
  }, d = i.components && Th.call(i.components, a) ? i.components[a] : a, p = typeof d == "string" || d === k.Fragment;
  if (!c6.isValidElementType(d))
    throw new TypeError(
      `Component for name \`${a}\` not defined or is not renderable`
    );
  if (l.key = [
    a,
    f.start.line,
    f.start.column,
    n
  ].join("-"), a === "a" && i.linkTarget && (l.target = typeof i.linkTarget == "function" ? i.linkTarget(
    String(l.href || ""),
    t.children,
    typeof l.title == "string" ? l.title : null
  ) : i.linkTarget), a === "a" && i.transformLinkUri && (l.href = i.transformLinkUri(
    String(l.href || ""),
    t.children,
    typeof l.title == "string" ? l.title : null
  )), !p && a === "code" && r.type === "element" && r.tagName !== "pre" && (l.inline = !0), !p && (a === "h1" || a === "h2" || a === "h3" || a === "h4" || a === "h5" || a === "h6") && (l.level = Number.parseInt(a.charAt(1), 10)), a === "img" && i.transformImageUri && (l.src = i.transformImageUri(
    String(l.src || ""),
    String(l.alt || ""),
    typeof l.title == "string" ? l.title : null
  )), !p && a === "li" && r.type === "element") {
    const h = P6(t);
    l.checked = h && h.properties ? Boolean(h.properties.checked) : null, l.index = Bd(r, t), l.ordered = r.tagName === "ol";
  }
  return !p && (a === "ol" || a === "ul") && (l.ordered = a === "ol", l.depth = e.listDepth), (a === "td" || a === "th") && (l.align && (l.style || (l.style = {}), l.style.textAlign = l.align, delete l.align), p || (l.isHeader = a === "th")), !p && a === "tr" && r.type === "element" && (l.isHeader = Boolean(r.tagName === "thead")), i.sourcePos && (l["data-sourcepos"] = R6(f)), !p && i.rawSourcePos && (l.sourcePosition = t.position), !p && i.includeElementIndex && (l.index = Bd(r, t), l.siblingCount = Bd(r)), p || (l.node = t), c.length > 0 ? k.createElement(d, l, c) : k.createElement(d, l);
}
function P6(e) {
  let t = -1;
  for (; ++t < e.children.length; ) {
    const n = e.children[t];
    if (n.type === "element" && n.tagName === "input")
      return n;
  }
  return null;
}
function Bd(e, t) {
  let n = -1, r = 0;
  for (; ++n < e.children.length && e.children[n] !== t; )
    e.children[n].type === "element" && r++;
  return r;
}
function _6(e, t, n, r) {
  const i = $D(r.schema, t);
  let o = n;
  o == null || o !== o || (Array.isArray(o) && (o = i.commaSeparated ? p6(o) : d6(o)), i.property === "style" && typeof o == "string" && (o = N6(o)), i.space && i.property ? e[Th.call($1, i.property) ? $1[i.property] : i.property] = o : i.attribute && (e[i.attribute] = o));
}
function N6(e) {
  const t = {};
  try {
    O6(e, n);
  } catch (r) {
  }
  return t;
  function n(r, i) {
    const o = r.slice(0, 4) === "-ms-" ? `ms-${r.slice(4)}` : r;
    t[o.replace(/-([a-z])/g, D6)] = i;
  }
}
function D6(e, t) {
  return t.toUpperCase();
}
function R6(e) {
  return [
    e.start.line,
    ":",
    e.start.column,
    "-",
    e.end.line,
    ":",
    e.end.column
  ].map((t) => String(t)).join("");
}
const q1 = {}.hasOwnProperty, L6 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ks = {
  plugins: { to: "plugins", id: "change-plugins-to-remarkplugins" },
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
function Ag(e) {
  for (const o in Ks)
    if (q1.call(Ks, o) && q1.call(e, o)) {
      const a = Ks[o];
      console.warn(
        `[react-markdown] Warning: please ${a.to ? `use \`${a.to}\` instead of` : "remove"} \`${o}\` (see <${L6}#${a.id}> for more info)`
      ), delete Ks[o];
    }
  const t = H3().use(K5).use(e.remarkPlugins || []).use(MD, Q(M({}, e.remarkRehypeOptions), {
    allowDangerousHtml: !0
  })).use(e.rehypePlugins || []).use(a6, e), n = new D3();
  typeof e.children == "string" ? n.value = e.children : e.children !== void 0 && e.children !== null && console.warn(
    `[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`
  );
  const r = t.runSync(t.parse(n), n);
  if (r.type !== "root")
    throw new TypeError("Expected a `root` node");
  let i = k.createElement(
    k.Fragment,
    {},
    mA({ options: e, schema: QD, listDepth: 0 }, r)
  );
  return e.className && (i = k.createElement("div", { className: e.className }, i)), i;
}
Ag.defaultProps = { transformLinkUri: E3 };
Ag.propTypes = {
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
var Z1 = function(t) {
  return t.reduce(function(n, r) {
    var i = r[0], o = r[1];
    return n[i] = o, n;
  }, {});
}, e0 = typeof window != "undefined" && window.document && window.document.createElement ? J.useLayoutEffect : J.useEffect, jt = "top", Sn = "bottom", En = "right", Yt = "left", Cg = "auto", ys = [jt, Sn, En, Yt], ea = "start", Kl = "end", F6 = "clippingParents", gA = "viewport", Wa = "popper", M6 = "reference", t0 = /* @__PURE__ */ ys.reduce(function(e, t) {
  return e.concat([t + "-" + ea, t + "-" + Kl]);
}, []), vA = /* @__PURE__ */ [].concat(ys, [Cg]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ea, t + "-" + Kl]);
}, []), B6 = "beforeRead", U6 = "read", z6 = "afterRead", W6 = "beforeMain", j6 = "main", Y6 = "afterMain", V6 = "beforeWrite", G6 = "write", $6 = "afterWrite", H6 = [B6, U6, z6, W6, j6, Y6, V6, G6, $6];
function sr(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function In(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Qi(e) {
  var t = In(e).Element;
  return e instanceof t || e instanceof Element;
}
function yn(e) {
  var t = In(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function xg(e) {
  if (typeof ShadowRoot == "undefined")
    return !1;
  var t = In(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function J6(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, i = t.attributes[n] || {}, o = t.elements[n];
    !yn(o) || !sr(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(a) {
      var l = i[a];
      l === !1 ? o.removeAttribute(a) : o.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Q6(e) {
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
      !yn(i) || !sr(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(s) {
        i.removeAttribute(s);
      }));
    });
  };
}
const K6 = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: J6,
  effect: Q6,
  requires: ["computeStyles"]
};
function ir(e) {
  return e.split("-")[0];
}
var zi = Math.max, fc = Math.min, ta = Math.round;
function Ih() {
  var e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function yA() {
  return !/^((?!chrome|android).)*safari/i.test(Ih());
}
function na(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), i = 1, o = 1;
  t && yn(e) && (i = e.offsetWidth > 0 && ta(r.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && ta(r.height) / e.offsetHeight || 1);
  var a = Qi(e) ? In(e) : window, l = a.visualViewport, s = !yA() && n, u = (r.left + (s && l ? l.offsetLeft : 0)) / i, c = (r.top + (s && l ? l.offsetTop : 0)) / o, f = r.width / i, d = r.height / o;
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
function kg(e) {
  var t = na(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function wA(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && xg(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function _r(e) {
  return In(e).getComputedStyle(e);
}
function X6(e) {
  return ["table", "td", "th"].indexOf(sr(e)) >= 0;
}
function Si(e) {
  return ((Qi(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Tf(e) {
  return sr(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (xg(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Si(e)
  );
}
function n0(e) {
  return !yn(e) || // https://github.com/popperjs/popper-core/issues/837
  _r(e).position === "fixed" ? null : e.offsetParent;
}
function q6(e) {
  var t = /firefox/i.test(Ih()), n = /Trident/i.test(Ih());
  if (n && yn(e)) {
    var r = _r(e);
    if (r.position === "fixed")
      return null;
  }
  var i = Tf(e);
  for (xg(i) && (i = i.host); yn(i) && ["html", "body"].indexOf(sr(i)) < 0; ) {
    var o = _r(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ws(e) {
  for (var t = In(e), n = n0(e); n && X6(n) && _r(n).position === "static"; )
    n = n0(n);
  return n && (sr(n) === "html" || sr(n) === "body" && _r(n).position === "static") ? t : n || q6(e) || t;
}
function Og(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function gl(e, t, n) {
  return zi(e, fc(t, n));
}
function Z6(e, t, n) {
  var r = gl(e, t, n);
  return r > n ? n : r;
}
function bA() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function SA(e) {
  return Object.assign({}, bA(), e);
}
function EA(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var eR = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, SA(typeof t != "number" ? t : EA(t, ys));
};
function tR(e) {
  var t, n = e.state, r = e.name, i = e.options, o = n.elements.arrow, a = n.modifiersData.popperOffsets, l = ir(n.placement), s = Og(l), u = [Yt, En].indexOf(l) >= 0, c = u ? "height" : "width";
  if (!(!o || !a)) {
    var f = eR(i.padding, n), d = kg(o), p = s === "y" ? jt : Yt, h = s === "y" ? Sn : En, m = n.rects.reference[c] + n.rects.reference[s] - a[s] - n.rects.popper[c], S = a[s] - n.rects.reference[s], g = ws(o), v = g ? s === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, w = m / 2 - S / 2, E = f[p], O = v - d[c] - f[h], b = v / 2 - d[c] / 2 + w, A = gl(E, b, O), T = s;
    n.modifiersData[r] = (t = {}, t[T] = A, t.centerOffset = A - b, t);
  }
}
function nR(e) {
  var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || wA(t.elements.popper, i) && (t.elements.arrow = i));
}
const rR = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: tR,
  effect: nR,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ra(e) {
  return e.split("-")[1];
}
var iR = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function oR(e) {
  var t = e.x, n = e.y, r = window, i = r.devicePixelRatio || 1;
  return {
    x: ta(t * i) / i || 0,
    y: ta(n * i) / i || 0
  };
}
function r0(e) {
  var t, n = e.popper, r = e.popperRect, i = e.placement, o = e.variation, a = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, d = a.x, p = d === void 0 ? 0 : d, h = a.y, m = h === void 0 ? 0 : h, S = typeof c == "function" ? c({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = S.x, m = S.y;
  var g = a.hasOwnProperty("x"), v = a.hasOwnProperty("y"), w = Yt, E = jt, O = window;
  if (u) {
    var b = ws(n), A = "clientHeight", T = "clientWidth";
    if (b === In(n) && (b = Si(n), _r(b).position !== "static" && l === "absolute" && (A = "scrollHeight", T = "scrollWidth")), b = b, i === jt || (i === Yt || i === En) && o === Kl) {
      E = Sn;
      var P = f && b === O && O.visualViewport ? O.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        b[A]
      );
      m -= P - r.height, m *= s ? 1 : -1;
    }
    if (i === Yt || (i === jt || i === Sn) && o === Kl) {
      w = En;
      var _ = f && b === O && O.visualViewport ? O.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        b[T]
      );
      p -= _ - r.width, p *= s ? 1 : -1;
    }
  }
  var I = Object.assign({
    position: l
  }, u && iR), F = c === !0 ? oR({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  if (p = F.x, m = F.y, s) {
    var B;
    return Object.assign({}, I, (B = {}, B[E] = v ? "0" : "", B[w] = g ? "0" : "", B.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", B));
  }
  return Object.assign({}, I, (t = {}, t[E] = v ? m + "px" : "", t[w] = g ? p + "px" : "", t.transform = "", t));
}
function aR(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, o = n.adaptive, a = o === void 0 ? !0 : o, l = n.roundOffsets, s = l === void 0 ? !0 : l, u = {
    placement: ir(t.placement),
    variation: ra(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, r0(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: s
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, r0(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const lR = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: aR,
  data: {}
};
var Xs = {
  passive: !0
};
function sR(e) {
  var t = e.state, n = e.instance, r = e.options, i = r.scroll, o = i === void 0 ? !0 : i, a = r.resize, l = a === void 0 ? !0 : a, s = In(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", n.update, Xs);
  }), l && s.addEventListener("resize", n.update, Xs), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", n.update, Xs);
    }), l && s.removeEventListener("resize", n.update, Xs);
  };
}
const uR = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: sR,
  data: {}
};
var cR = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function bu(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return cR[t];
  });
}
var fR = {
  start: "end",
  end: "start"
};
function i0(e) {
  return e.replace(/start|end/g, function(t) {
    return fR[t];
  });
}
function Tg(e) {
  var t = In(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ig(e) {
  return na(Si(e)).left + Tg(e).scrollLeft;
}
function dR(e, t) {
  var n = In(e), r = Si(e), i = n.visualViewport, o = r.clientWidth, a = r.clientHeight, l = 0, s = 0;
  if (i) {
    o = i.width, a = i.height;
    var u = yA();
    (u || !u && t === "fixed") && (l = i.offsetLeft, s = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: l + Ig(e),
    y: s
  };
}
function pR(e) {
  var t, n = Si(e), r = Tg(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, o = zi(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = zi(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + Ig(e), s = -r.scrollTop;
  return _r(i || n).direction === "rtl" && (l += zi(n.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: a,
    x: l,
    y: s
  };
}
function Pg(e) {
  var t = _r(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function AA(e) {
  return ["html", "body", "#document"].indexOf(sr(e)) >= 0 ? e.ownerDocument.body : yn(e) && Pg(e) ? e : AA(Tf(e));
}
function vl(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = AA(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = In(r), a = i ? [o].concat(o.visualViewport || [], Pg(r) ? r : []) : r, l = t.concat(a);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(vl(Tf(a)))
  );
}
function Ph(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function hR(e, t) {
  var n = na(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function o0(e, t, n) {
  return t === gA ? Ph(dR(e, n)) : Qi(t) ? hR(t, n) : Ph(pR(Si(e)));
}
function mR(e) {
  var t = vl(Tf(e)), n = ["absolute", "fixed"].indexOf(_r(e).position) >= 0, r = n && yn(e) ? ws(e) : e;
  return Qi(r) ? t.filter(function(i) {
    return Qi(i) && wA(i, r) && sr(i) !== "body";
  }) : [];
}
function gR(e, t, n, r) {
  var i = t === "clippingParents" ? mR(e) : [].concat(t), o = [].concat(i, [n]), a = o[0], l = o.reduce(function(s, u) {
    var c = o0(e, u, r);
    return s.top = zi(c.top, s.top), s.right = fc(c.right, s.right), s.bottom = fc(c.bottom, s.bottom), s.left = zi(c.left, s.left), s;
  }, o0(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function CA(e) {
  var t = e.reference, n = e.element, r = e.placement, i = r ? ir(r) : null, o = r ? ra(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, s;
  switch (i) {
    case jt:
      s = {
        x: a,
        y: t.y - n.height
      };
      break;
    case Sn:
      s = {
        x: a,
        y: t.y + t.height
      };
      break;
    case En:
      s = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Yt:
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
  var u = i ? Og(i) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case ea:
        s[u] = s[u] - (t[c] / 2 - n[c] / 2);
        break;
      case Kl:
        s[u] = s[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return s;
}
function Xl(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = r === void 0 ? e.placement : r, o = n.strategy, a = o === void 0 ? e.strategy : o, l = n.boundary, s = l === void 0 ? F6 : l, u = n.rootBoundary, c = u === void 0 ? gA : u, f = n.elementContext, d = f === void 0 ? Wa : f, p = n.altBoundary, h = p === void 0 ? !1 : p, m = n.padding, S = m === void 0 ? 0 : m, g = SA(typeof S != "number" ? S : EA(S, ys)), v = d === Wa ? M6 : Wa, w = e.rects.popper, E = e.elements[h ? v : d], O = gR(Qi(E) ? E : E.contextElement || Si(e.elements.popper), s, c, a), b = na(e.elements.reference), A = CA({
    reference: b,
    element: w,
    strategy: "absolute",
    placement: i
  }), T = Ph(Object.assign({}, w, A)), P = d === Wa ? T : b, _ = {
    top: O.top - P.top + g.top,
    bottom: P.bottom - O.bottom + g.bottom,
    left: O.left - P.left + g.left,
    right: P.right - O.right + g.right
  }, I = e.modifiersData.offset;
  if (d === Wa && I) {
    var F = I[i];
    Object.keys(_).forEach(function(B) {
      var q = [En, Sn].indexOf(B) >= 0 ? 1 : -1, re = [jt, Sn].indexOf(B) >= 0 ? "y" : "x";
      _[B] += F[re] * q;
    });
  }
  return _;
}
function vR(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding, l = n.flipVariations, s = n.allowedAutoPlacements, u = s === void 0 ? vA : s, c = ra(r), f = c ? l ? t0 : t0.filter(function(h) {
    return ra(h) === c;
  }) : ys, d = f.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  d.length === 0 && (d = f);
  var p = d.reduce(function(h, m) {
    return h[m] = Xl(e, {
      placement: m,
      boundary: i,
      rootBoundary: o,
      padding: a
    })[ir(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function yR(e) {
  if (ir(e) === Cg)
    return [];
  var t = bu(e);
  return [i0(e), t, i0(t)];
}
function wR(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !0 : a, s = n.fallbackPlacements, u = n.padding, c = n.boundary, f = n.rootBoundary, d = n.altBoundary, p = n.flipVariations, h = p === void 0 ? !0 : p, m = n.allowedAutoPlacements, S = t.options.placement, g = ir(S), v = g === S, w = s || (v || !h ? [bu(S)] : yR(S)), E = [S].concat(w).reduce(function(Ge, Qe) {
      return Ge.concat(ir(Qe) === Cg ? vR(t, {
        placement: Qe,
        boundary: c,
        rootBoundary: f,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : Qe);
    }, []), O = t.rects.reference, b = t.rects.popper, A = /* @__PURE__ */ new Map(), T = !0, P = E[0], _ = 0; _ < E.length; _++) {
      var I = E[_], F = ir(I), B = ra(I) === ea, q = [jt, Sn].indexOf(F) >= 0, re = q ? "width" : "height", te = Xl(t, {
        placement: I,
        boundary: c,
        rootBoundary: f,
        altBoundary: d,
        padding: u
      }), fe = q ? B ? En : Yt : B ? Sn : jt;
      O[re] > b[re] && (fe = bu(fe));
      var U = bu(fe), V = [];
      if (o && V.push(te[F] <= 0), l && V.push(te[fe] <= 0, te[U] <= 0), V.every(function(Ge) {
        return Ge;
      })) {
        P = I, T = !1;
        break;
      }
      A.set(I, V);
    }
    if (T)
      for (var $ = h ? 3 : 1, x = function(Qe) {
        var me = E.find(function($e) {
          var ot = A.get($e);
          if (ot)
            return ot.slice(0, Qe).every(function(Pn) {
              return Pn;
            });
        });
        if (me)
          return P = me, "break";
      }, C = $; C > 0; C--) {
        var tt = x(C);
        if (tt === "break")
          break;
      }
    t.placement !== P && (t.modifiersData[r]._skip = !0, t.placement = P, t.reset = !0);
  }
}
const bR = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: wR,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function a0(e, t, n) {
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
function l0(e) {
  return [jt, En, Sn, Yt].some(function(t) {
    return e[t] >= 0;
  });
}
function SR(e) {
  var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, o = t.modifiersData.preventOverflow, a = Xl(t, {
    elementContext: "reference"
  }), l = Xl(t, {
    altBoundary: !0
  }), s = a0(a, r), u = a0(l, i, o), c = l0(s), f = l0(u);
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
const ER = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: SR
};
function AR(e, t, n) {
  var r = ir(e), i = [Yt, jt].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = o[0], l = o[1];
  return a = a || 0, l = (l || 0) * i, [Yt, En].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function CR(e) {
  var t = e.state, n = e.options, r = e.name, i = n.offset, o = i === void 0 ? [0, 0] : i, a = vA.reduce(function(c, f) {
    return c[f] = AR(f, t.rects, o), c;
  }, {}), l = a[t.placement], s = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const xR = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: CR
};
function kR(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = CA({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const OR = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: kR,
  data: {}
};
function TR(e) {
  return e === "x" ? "y" : "x";
}
function IR(e) {
  var t = e.state, n = e.options, r = e.name, i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, l = a === void 0 ? !1 : a, s = n.boundary, u = n.rootBoundary, c = n.altBoundary, f = n.padding, d = n.tether, p = d === void 0 ? !0 : d, h = n.tetherOffset, m = h === void 0 ? 0 : h, S = Xl(t, {
    boundary: s,
    rootBoundary: u,
    padding: f,
    altBoundary: c
  }), g = ir(t.placement), v = ra(t.placement), w = !v, E = Og(g), O = TR(E), b = t.modifiersData.popperOffsets, A = t.rects.reference, T = t.rects.popper, P = typeof m == "function" ? m(Object.assign({}, t.rects, {
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
      var B, q = E === "y" ? jt : Yt, re = E === "y" ? Sn : En, te = E === "y" ? "height" : "width", fe = b[E], U = fe + S[q], V = fe - S[re], $ = p ? -T[te] / 2 : 0, x = v === ea ? A[te] : T[te], C = v === ea ? -T[te] : -A[te], tt = t.elements.arrow, Ge = p && tt ? kg(tt) : {
        width: 0,
        height: 0
      }, Qe = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : bA(), me = Qe[q], $e = Qe[re], ot = gl(0, A[te], Ge[te]), Pn = w ? A[te] / 2 - $ - ot - me - _.mainAxis : x - ot - me - _.mainAxis, _n = w ? -A[te] / 2 + $ + ot + $e + _.mainAxis : C + ot + $e + _.mainAxis, Ai = t.elements.arrow && ws(t.elements.arrow), Rf = Ai ? E === "y" ? Ai.clientTop || 0 : Ai.clientLeft || 0 : 0, ya = (B = I == null ? void 0 : I[E]) != null ? B : 0, Lf = fe + Pn - ya - Rf, Ff = fe + _n - ya, As = gl(p ? fc(U, Lf) : U, fe, p ? zi(V, Ff) : V);
      b[E] = As, F[E] = As - fe;
    }
    if (l) {
      var wa, Cs = E === "x" ? jt : Yt, xs = E === "x" ? Sn : En, dr = b[O], Ci = O === "y" ? "height" : "width", ba = dr + S[Cs], ks = dr - S[xs], Sa = [jt, Yt].indexOf(g) !== -1, Os = (wa = I == null ? void 0 : I[O]) != null ? wa : 0, Ts = Sa ? ba : dr - A[Ci] - T[Ci] - Os + _.altAxis, Is = Sa ? dr + A[Ci] + T[Ci] - Os - _.altAxis : ks, D = p && Sa ? Z6(Ts, dr, Is) : gl(p ? Ts : ba, dr, p ? Is : ks);
      b[O] = D, F[O] = D - dr;
    }
    t.modifiersData[r] = F;
  }
}
const PR = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: IR,
  requiresIfExists: ["offset"]
};
function _R(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function NR(e) {
  return e === In(e) || !yn(e) ? Tg(e) : _R(e);
}
function DR(e) {
  var t = e.getBoundingClientRect(), n = ta(t.width) / e.offsetWidth || 1, r = ta(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function RR(e, t, n) {
  n === void 0 && (n = !1);
  var r = yn(t), i = yn(t) && DR(t), o = Si(t), a = na(e, i, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((sr(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Pg(o)) && (l = NR(t)), yn(t) ? (s = na(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : o && (s.x = Ig(o))), {
    x: a.left + l.scrollLeft - s.x,
    y: a.top + l.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
function LR(e) {
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
function FR(e) {
  var t = LR(e);
  return H6.reduce(function(n, r) {
    return n.concat(t.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function MR(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function BR(e) {
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
var s0 = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function u0() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function UR(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, o = i === void 0 ? s0 : i;
  return function(l, s, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, s0, o),
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
          reference: Qi(l) ? vl(l) : l.contextElement ? vl(l.contextElement) : [],
          popper: vl(s)
        };
        var w = FR(BR([].concat(r, c.options.modifiers)));
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
          if (u0(v, w)) {
            c.rects = {
              reference: RR(v, ws(w), c.options.strategy === "fixed"),
              popper: kg(w)
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
                instance: p
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: MR(function() {
        return new Promise(function(S) {
          p.forceUpdate(), S(c);
        });
      }),
      destroy: function() {
        m(), d = !0;
      }
    };
    if (!u0(l, s))
      return p;
    p.setOptions(u).then(function(S) {
      !d && u.onFirstUpdate && u.onFirstUpdate(S);
    });
    function h() {
      c.orderedModifiers.forEach(function(S) {
        var g = S.name, v = S.options, w = v === void 0 ? {} : v, E = S.effect;
        if (typeof E == "function") {
          var O = E({
            state: c,
            name: g,
            instance: p,
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
    return p;
  };
}
var zR = [uR, OR, lR, K6, xR, bR, PR, rR, ER], WR = /* @__PURE__ */ UR({
  defaultModifiers: zR
}), jR = typeof Element != "undefined", YR = typeof Map == "function", VR = typeof Set == "function", GR = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Su(e, t) {
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
        if (!Su(e[r], t[r]))
          return !1;
      return !0;
    }
    var o;
    if (YR && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size)
        return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!t.has(r.value[0]))
          return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!Su(r.value[1], t.get(r.value[0])))
          return !1;
      return !0;
    }
    if (VR && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size)
        return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!t.has(r.value[0]))
          return !1;
      return !0;
    }
    if (GR && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
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
    if (jR && e instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && e.$$typeof) && !Su(e[i[r]], t[i[r]]))
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var $R = function(t, n) {
  try {
    return Su(t, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
}, HR = [], JR = function(t, n, r) {
  r === void 0 && (r = {});
  var i = J.useRef(null), o = {
    onFirstUpdate: r.onFirstUpdate,
    placement: r.placement || "bottom",
    strategy: r.strategy || "absolute",
    modifiers: r.modifiers || HR
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
      fn: function(p) {
        var h = p.state, m = Object.keys(h.elements);
        si.flushSync(function() {
          s({
            styles: Z1(m.map(function(S) {
              return [S, h.styles[S] || {}];
            })),
            attributes: Z1(m.map(function(S) {
              return [S, h.attributes[S]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []), c = J.useMemo(function() {
    var d = {
      onFirstUpdate: o.onFirstUpdate,
      placement: o.placement,
      strategy: o.strategy,
      modifiers: [].concat(o.modifiers, [u, {
        name: "applyStyles",
        enabled: !1
      }])
    };
    return $R(i.current, d) ? i.current || d : (i.current = d, d);
  }, [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, u]), f = J.useRef();
  return e0(function() {
    f.current && f.current.setOptions(c);
  }, [c]), e0(function() {
    if (!(t == null || n == null)) {
      var d = r.createPopper || WR, p = d(t, n, c);
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
const QR = "_popover_m2pq3_1", KR = "_textContent_m2pq3_11", XR = "_popperArrow_m2pq3_26", qR = "_popoverMarkdown_m2pq3_60", qs = {
  popover: QR,
  textContent: KR,
  popperArrow: XR,
  popoverMarkdown: qR
}, _g = ({
  placement: e = "right",
  showOn: t = "hover",
  popoverContent: n,
  contentIsMd: r = !1,
  bgColor: i,
  openDelayMs: o = 0,
  triggerEl: a
}) => {
  const [l, s] = k.useState(null), [u, c] = k.useState(null), [f, d] = k.useState(
    null
  ), { styles: p, attributes: h, update: m } = JR(
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
  ), S = k.useMemo(() => Q(M({}, p.popper), { backgroundColor: i }), [i, p.popper]), g = k.useMemo(() => {
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
  }, [o, u, t, m]), v = typeof n != "string" ? n : r ? /* @__PURE__ */ y(Ag, { className: qs.popoverMarkdown, children: n }) : /* @__PURE__ */ y("div", { className: qs.textContent, children: n });
  return /* @__PURE__ */ L(et, { children: [
    k.cloneElement(a, Q(M({}, g), {
      ref: s
    })),
    /* @__PURE__ */ L(
      "div",
      Q(M({
        ref: c,
        className: qs.popover,
        style: S
      }, h.popper), {
        children: [
          v,
          /* @__PURE__ */ y(
            "div",
            {
              ref: d,
              className: qs.popperArrow,
              style: p.arrow
            }
          )
        ]
      })
    )
  ] });
}, xA = (l) => {
  var s = l, {
    children: e,
    placement: t = "right",
    showOn: n = "hover",
    popoverContent: r,
    bgColor: i,
    openDelayMs: o = 0
  } = s, a = at(s, [
    "children",
    "placement",
    "showOn",
    "popoverContent",
    "bgColor",
    "openDelayMs"
  ]);
  return /* @__PURE__ */ y(
    _g,
    {
      placement: t,
      showOn: n,
      popoverContent: r,
      bgColor: i,
      openDelayMs: o,
      triggerEl: /* @__PURE__ */ y("button", Q(M({}, a), { children: e }))
    }
  );
}, ZR = "_infoIcon_15ri6_1", eL = "_container_15ri6_10", tL = "_header_15ri6_15", nL = "_info_15ri6_1", rL = "_unit_15ri6_27", iL = "_description_15ri6_31", fo = {
  infoIcon: ZR,
  container: eL,
  header: tL,
  info: nL,
  unit: rL,
  description: iL
}, oL = ({ units: e }) => /* @__PURE__ */ y(
  xA,
  {
    className: fo.infoIcon,
    popoverContent: /* @__PURE__ */ y(aL, { units: e }),
    openDelayMs: 500,
    placement: "auto",
    children: /* @__PURE__ */ y(CI, {})
  }
);
function aL({ units: e }) {
  return /* @__PURE__ */ L("div", { className: fo.container, children: [
    /* @__PURE__ */ y("div", { className: fo.header, children: "CSS size options" }),
    /* @__PURE__ */ y("div", { className: fo.info, children: e.map((t) => /* @__PURE__ */ L(k.Fragment, { children: [
      /* @__PURE__ */ y("div", { className: fo.unit, children: t }),
      /* @__PURE__ */ y("div", { className: fo.description, children: lL[t] })
    ] }, t)) })
  ] });
}
const lL = {
  "%": "Relative to percentage of container size",
  auto: "Let the content decide size",
  fr: "Relative unit. E.g. 2fr is twice the size of 1fr",
  px: "Screen pixels",
  rem: "Pixel size of app font. Typically 16 pixels."
}, sL = "_wrapper_3jy8f_1", uL = "_unitSelector_3jy8f_9", kA = {
  wrapper: sL,
  unitSelector: uL
};
function OA({
  unit: e,
  availableUnits: t,
  onChange: n
}) {
  return /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y(
      "select",
      {
        className: kA.unitSelector,
        "aria-label": "value-unit",
        name: "value-unit",
        value: e,
        onChange: (r) => n(r.target.value),
        children: t.map((r) => /* @__PURE__ */ y("option", { value: r, children: r }, r))
      }
    ),
    /* @__PURE__ */ y(oL, { units: t })
  ] });
}
function Nr(e) {
  return e + "-label";
}
function cL({
  id: e,
  label: t,
  value: n,
  onChange: r
}) {
  return /* @__PURE__ */ y(
    If,
    {
      id: e,
      "aria-label": t,
      "aria-labelledby": Nr(e),
      value: n,
      onChange: r
    }
  );
}
function If(l) {
  var s = l, {
    value: e,
    onChange: t,
    min: n = 0,
    max: r,
    step: i,
    disabled: o
  } = s, a = at(s, [
    "value",
    "onChange",
    "min",
    "max",
    "step",
    "disabled"
  ]);
  const { displayedVal: u, handleChange: c, handleBlur: f, incrementUp: d, incrementDown: p } = fL({
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
              onClick: d,
              type: "button",
              children: /* @__PURE__ */ y(TI, {})
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
function fL({
  min: e = -1 / 0,
  max: t = 1 / 0,
  step: n = 1,
  value: r,
  onChange: i
}) {
  const o = k.useCallback(
    (p) => (h) => {
      if (h.preventDefault(), typeof r != "number" || typeof n != "number")
        return;
      const m = r + (p === "up" ? 1 : -1) * n;
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
    (p) => {
      const h = p.target.value;
      u(
        (m) => Number(m) === Number(h) ? m : h
      ), i(Number(h));
    },
    [i]
  ), f = k.useCallback(() => {
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
function dL({
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
function Ei(a) {
  var l = a, {
    text: e,
    position: t = "down",
    size: n,
    children: r,
    variant: i = "icon"
  } = l, o = at(l, [
    "text",
    "position",
    "size",
    "children",
    "variant"
  ]);
  return /* @__PURE__ */ y(
    mt,
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
function c0(e, t) {
  const n = Math.abs(t - e) + 1, r = e < t ? 1 : -1;
  return Array.from({ length: n }, (i, o) => e + o * r);
}
function pL({
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
function f0(e) {
  return e.split(" ");
}
function hL(e) {
  const t = e.match(/"([.\w\s]+)"/g);
  if (!t)
    throw new Error("Can't parse area definition");
  return t.map((n) => n.replaceAll('"', "").split(" "));
}
function mL(e) {
  const t = f0(
    e.style.gridTemplateRows
  ), n = f0(
    e.style.gridTemplateColumns
  ), r = hL(e.style.gridTemplateAreas), i = e.style.getPropertyValue("--grid-gap");
  return {
    row_sizes: t,
    col_sizes: n,
    areas: r,
    gap_size: i
  };
}
function TA({
  container: e,
  dir: t
}) {
  return getComputedStyle(e).getPropertyValue(
    t === "rows" ? "grid-template-rows" : "grid-template-columns"
  ).split(" ").map((n) => Number(n.replaceAll("px", "")));
}
const _h = (e) => Number(e.toFixed(4)), dc = 40, gL = 0.15, IA = (e) => (t) => Math.round(t / e) * e, vL = 5, Pf = IA(vL), yL = 0.01, PA = IA(yL);
function wL(e, {
  pixelToFrRatio: t,
  beforeInfo: n,
  afterInfo: r
}) {
  const i = PA(e * t), o = n.count + i, a = r.count - i;
  return (i < 0 ? o / a : a / o) < gL ? "no-change" : {
    beforeSize: _h(o) + "fr",
    afterSize: _h(a) + "fr"
  };
}
function bL(e, { beforeInfo: t, afterInfo: n }) {
  const r = Pf(e), i = t.count + r, o = n.count - r;
  return i < dc || o < dc ? "no-change" : {
    beforeSize: i + "px",
    afterSize: o + "px"
  };
}
function SL(e, { beforeInfo: t }) {
  const n = t.count + e;
  return n < dc ? "no-change" : {
    beforeSize: Pf(n) + "px"
  };
}
function EL(e, { afterInfo: t }) {
  const n = t.count - e;
  return n < dc ? "no-change" : {
    afterSize: Pf(n) + "px"
  };
}
function AL(e, t) {
  const n = Nh(e), r = t === null ? "missing" : Nh(t);
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
function CL({
  container: e,
  index: t,
  dir: n,
  frCounts: r
}) {
  const i = TA({ container: e, dir: n }), o = i[t - 2], a = i[t - 1];
  return (r.before + r.after) / (a + o);
}
function xL({
  mousePosition: e,
  dir: t,
  index: n,
  container: r
}) {
  const i = t === "rows" ? "gridTemplateRows" : "gridTemplateColumns";
  let o = r.style[i].split(" ");
  const a = IL(o), l = TL(o);
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
  const d = AL(c, f);
  if (d.type === "unsupported")
    throw new Error("Unsupported drag type");
  r.classList.add("been-dragged");
  const p = Q(M({
    dir: t,
    mouseStart: NA(e, t),
    originalSizes: o,
    currentSizes: [...o],
    beforeIndex: s,
    afterIndex: u
  }, d), {
    pixelToFrRatio: 1
  });
  return d.type === "both-relative" && (p.pixelToFrRatio = CL({
    container: r,
    index: n,
    dir: t,
    frCounts: {
      before: d.beforeInfo.count,
      after: d.afterInfo.count
    }
  })), p;
}
function kL({
  mousePosition: e,
  drag: t,
  container: n
}) {
  const i = NA(e, t.dir) - t.mouseStart, o = [...t.originalSizes];
  let a;
  switch (t.type) {
    case "before-pixel":
      a = SL(i, t);
      break;
    case "after-pixel":
      a = EL(i, t);
      break;
    case "both-pixel":
      a = bL(i, t);
      break;
    case "both-relative":
      a = wL(i, t);
      break;
  }
  a !== "no-change" && (a.beforeSize && (o[t.beforeIndex] = a.beforeSize), a.afterSize && (o[t.afterIndex] = a.afterSize), t.currentSizes = o, t.dir === "cols" ? n.style.gridTemplateColumns = o.join(" ") : n.style.gridTemplateRows = o.join(" "));
}
function OL(e) {
  return e.match(/[0-9|.]+px/) !== null;
}
function _A(e) {
  return e.match(/[0-9|.]+fr/) !== null;
}
function Nh(e) {
  if (_A(e))
    return {
      type: "fr",
      count: Number(e.replace("fr", "")),
      value: e
    };
  if (OL(e))
    return {
      type: "pixel",
      count: Number(e.replace("px", "")),
      value: e
    };
  throw new Error("Unknown tract sizing unit: " + e);
}
function NA(e, t) {
  return t === "rows" ? e.clientY : e.clientX;
}
function TL(e) {
  return e.some((t) => _A(t));
}
function IL(e) {
  return e.some((t) => t === "auto");
}
const PL = "_tractInfoDisplay_cvtwo_1", _L = "_sizeWidget_cvtwo_61", NL = "_cssSizeInput_cvtwo_80", DL = "_hoverListener_cvtwo_94", RL = "_buttons_cvtwo_114", LL = "_tractAddButton_cvtwo_127", FL = "_deleteButton_cvtwo_128", $r = {
  tractInfoDisplay: PL,
  sizeWidget: _L,
  cssSizeInput: NL,
  hoverListener: DL,
  buttons: RL,
  tractAddButton: LL,
  deleteButton: FL
}, ML = ["fr", "px"];
function BL({
  dir: e,
  index: t,
  size: n,
  deletionConflicts: r,
  addTract: i,
  deleteTract: o,
  changeUnit: a,
  changeCount: l
}) {
  const { unit: s, count: u } = cc(n);
  return /* @__PURE__ */ L(
    "div",
    {
      className: $r.tractInfoDisplay,
      "data-drag-dir": e,
      style: {
        "--tract-index": t + 1
      },
      children: [
        /* @__PURE__ */ y("div", { className: $r.hoverListener }),
        /* @__PURE__ */ L("div", { className: $r.sizeWidget, onClick: WL, children: [
          /* @__PURE__ */ L("div", { className: $r.buttons, children: [
            /* @__PURE__ */ y(d0, { dir: e, onClick: () => i("before") }),
            /* @__PURE__ */ y(
              UL,
              {
                dir: e,
                onClick: o,
                deletionConflicts: r
              }
            ),
            /* @__PURE__ */ y(d0, { dir: e, onClick: () => i("after") })
          ] }),
          /* @__PURE__ */ L("div", { className: $r.cssSizeInput, children: [
            /* @__PURE__ */ y(
              If,
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
                availableUnits: ML,
                onChange: (c) => a(c)
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function UL({
  dir: e,
  onClick: t,
  deletionConflicts: n
}) {
  const r = e === "rows" ? "right" : "down", i = n.length === 0, o = i ? "Delete tract" : `Can't delete because the items ${n.join(
    ","
  )} are entirely contained in tract`;
  return /* @__PURE__ */ y(
    Ei,
    {
      className: $r.deleteButton,
      onClick: DA(i ? t : void 0),
      "data-enabled": i,
      text: o,
      size: "medium",
      position: r,
      children: /* @__PURE__ */ y(Kc, {})
    }
  );
}
function d0({
  dir: e,
  onClick: t
}) {
  const n = e === "rows" ? "right" : "down", r = e === "rows" ? "Add row" : "Add column";
  return /* @__PURE__ */ y(
    Ei,
    {
      className: $r.tractAddButton,
      onClick: DA(t),
      position: n,
      text: r,
      children: /* @__PURE__ */ y(mg, {})
    }
  );
}
function DA(e) {
  return function(t) {
    t.currentTarget.blur(), e == null || e();
  };
}
function zL(e, t) {
  let n = 0, r = 0;
  for (let i = 0; i < t.length; i++) {
    const { type: o, count: a } = Nh(t[i]);
    o === "fr" && (n += a, r += e[i]);
  }
  return n === 0 ? "NO_FR_UNITS" : n / r;
}
function p0({
  dir: e,
  sizes: t,
  getActualSizes: n,
  areas: r,
  onUpdate: i
}) {
  const o = J.useCallback(
    ({ dir: c, index: f }) => OE(r, {
      dir: c,
      index: f + 1
    }),
    [r]
  ), a = (c) => (f) => {
    const { unit: d } = cc(t[c]);
    i({
      type: "RESIZE",
      index: c,
      dir: e,
      size: `${f}${d}`
    });
  }, l = (c) => (f) => {
    const d = n(), { count: p } = cc(t[c]);
    let h = 1;
    f === "px" && (h = Pf(d[c]));
    const m = zL(d, t);
    f === "fr" && m !== "NO_FR_UNITS" && (h = _h(
      PA(p ? p * m : 1)
    )), i({ type: "RESIZE", index: c, dir: e, size: `${h}${f}` });
  }, s = (c) => (f) => i({
    type: "ADD",
    dir: e,
    index: f === "before" ? c : c + 1
  }), u = (c) => () => {
    i({ type: "DELETE", dir: e, index: c + 1 });
  };
  return /* @__PURE__ */ y(et, { children: t.map((c, f) => /* @__PURE__ */ y(
    BL,
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
function WL(e) {
  e.stopPropagation();
}
function h0(e, t) {
  e.querySelectorAll(`.${$r.tractInfoDisplay}`).forEach((n) => {
    n.style.display = t === "hide" ? "none" : "block";
  });
}
const jL = "_columnSizer_9b32k_1", YL = "_rowSizer_9b32k_2", m0 = {
  columnSizer: jL,
  rowSizer: YL
};
function g0({
  dir: e,
  index: t,
  onStartDrag: n
}) {
  return /* @__PURE__ */ y(
    "div",
    {
      className: e === "rows" ? m0.rowSizer : m0.columnSizer,
      title: `resize ${e === "rows" ? "rows" : "columns"} ${t - 1} and ${t}`,
      onMouseDown: (r) => n({ e: r, dir: e, index: t }),
      style: { [e === "rows" ? "gridRow" : "gridColumn"]: t }
    }
  );
}
function VL(e, t = "Ref is not yet initialized") {
  if (e.current === null)
    throw new Error(t);
  return e.current;
}
function GL({
  containerRef: e,
  onDragEnd: t
}) {
  return k.useCallback(
    ({
      e: r,
      dir: i,
      index: o
    }) => {
      const a = VL(
        e,
        "How are you dragging on an element without a container?"
      );
      r.preventDefault();
      const l = xL({
        mousePosition: r,
        dir: i,
        index: o,
        container: a
      }), { beforeIndex: s, afterIndex: u } = l, c = v0(a, {
        dir: i,
        index: s,
        size: l.currentSizes[s]
      }), f = v0(a, {
        dir: i,
        index: u,
        size: l.currentSizes[u]
      });
      $L(a, l.dir, {
        move: (d) => {
          kL({
            mousePosition: d,
            drag: l,
            container: a
          }), c.update(l.currentSizes[s]), f.update(l.currentSizes[u]);
        },
        end: () => {
          c.remove(), f.remove(), t && t(mL(a));
        }
      });
    },
    [e, t]
  );
}
function v0(e, { dir: t, index: n, size: r }) {
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
  }), a.innerHTML = r, i.appendChild(a), e.appendChild(i), h0(e, "hide"), {
    remove: () => {
      i.remove(), h0(e, "show");
    },
    update: (l) => {
      a.innerHTML = l;
    }
  };
}
function $L(e, t, n) {
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
function HL({
  areas: e,
  col_sizes: t,
  row_sizes: n,
  gap_size: r
}) {
  return {
    areas: e,
    gap_size: r,
    col_sizes: hl(t),
    row_sizes: hl(n)
  };
}
const JL = "1fr";
function QL(i) {
  var o = i, {
    className: e,
    children: t,
    onNewLayout: n
  } = o, r = at(o, [
    "className",
    "children",
    "onNewLayout"
  ]);
  r = HL(r);
  let { row_sizes: a, col_sizes: l } = r;
  const s = J.useRef(null), u = pL(r), c = l.length < 2 ? [] : c0(2, l.length), f = a.length < 2 ? [] : c0(2, a.length), d = GL({
    containerRef: s,
    onDragEnd: n
  }), p = [v3.ResizableGrid];
  e && p.push(e);
  const h = J.useCallback(
    (g) => {
      switch (g.type) {
        case "ADD":
          return CE(r, {
            afterIndex: g.index,
            dir: g.dir,
            size: JL
          });
        case "RESIZE":
          return KL(r, g);
        case "DELETE":
          return kE(r, g);
      }
    },
    [r]
  ), m = J.useCallback(
    (g) => n(h(g)),
    [h, n]
  ), S = J.useCallback((g) => {
    const v = s.current;
    return v ? TA({ container: v, dir: g }) : [];
  }, []);
  return /* @__PURE__ */ L(
    "div",
    {
      className: Vt(...p),
      ref: s,
      style: u,
      children: [
        c.map((g) => /* @__PURE__ */ y(
          g0,
          {
            dir: "cols",
            index: g,
            onStartDrag: d
          },
          "cols" + g
        )),
        f.map((g) => /* @__PURE__ */ y(
          g0,
          {
            dir: "rows",
            index: g,
            onStartDrag: d
          },
          "rows" + g
        )),
        t,
        /* @__PURE__ */ y(
          p0,
          {
            dir: "cols",
            sizes: l,
            getActualSizes: () => S("cols"),
            areas: r.areas,
            onUpdate: m
          }
        ),
        /* @__PURE__ */ y(
          p0,
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
function KL(e, { dir: t, index: n, size: r }) {
  return yi(e, (i) => {
    i[t === "rows" ? "row_sizes" : "col_sizes"][n] = r;
  });
}
function XL({
  gridRow: e,
  gridColumn: t,
  onDroppedNode: n
}) {
  const r = k.useRef(null);
  return pf({
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
const RA = 236;
function LA({
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
function va({
  children: e,
  className: t = ""
}) {
  return /* @__PURE__ */ y("h3", { className: t + " panel-title", children: e });
}
const qL = "_portalHolder_18ua3_1", ZL = "_portalModal_18ua3_11", eF = "_title_18ua3_21", tF = "_body_18ua3_25", nF = "_portalForm_18ua3_30", rF = "_portalFormInputs_18ua3_35", iF = "_portalFormFooter_18ua3_42", oF = "_validationMsg_18ua3_48", aF = "_infoText_18ua3_53", wr = {
  portalHolder: qL,
  portalModal: ZL,
  title: eF,
  body: tF,
  portalForm: nF,
  portalFormInputs: rF,
  portalFormFooter: iF,
  validationMsg: oF,
  infoText: aF
}, lF = ({ children: e, el: t = "div" }) => {
  const [n] = J.useState(document.createElement(t));
  return J.useEffect(() => (document.body.appendChild(n), () => {
    document.body.removeChild(n);
  }), [n]), si.createPortal(e, n);
};
function FA({
  children: e,
  title: t,
  label: n,
  onConfirm: r,
  onCancel: i
}) {
  return /* @__PURE__ */ y(lF, { children: /* @__PURE__ */ y(
    "div",
    {
      className: wr.portalHolder,
      onClick: () => i(),
      onKeyDown: (o) => {
        o.key === "Escape" && i();
      },
      children: /* @__PURE__ */ L(
        "div",
        {
          className: wr.portalModal,
          onClick: (o) => o.stopPropagation(),
          "aria-label": n != null ? n : "popup modal",
          children: [
            t ? /* @__PURE__ */ y(va, { className: wr.title, children: t }) : null,
            /* @__PURE__ */ y("div", { className: wr.body, children: e })
          ]
        }
      )
    }
  ) });
}
const Dh = Symbol("@ts-pattern/matcher"), y0 = "@ts-pattern/anonymous-select-key", w0 = (e) => Boolean(e && typeof e == "object"), Ud = (e) => e && !!e[Dh], qa = (e, t, n) => {
  if (w0(e)) {
    if (Ud(e)) {
      const r = e[Dh](), { matched: i, selections: o } = r.match(t);
      return i && o && Object.keys(o).forEach((a) => n(a, o[a])), i;
    }
    if (!w0(t))
      return !1;
    if (Array.isArray(e))
      return !!Array.isArray(t) && e.length === t.length && e.every((r, i) => qa(r, t[i], n));
    if (e instanceof Map)
      return t instanceof Map && Array.from(e.keys()).every((r) => qa(e.get(r), t.get(r), n));
    if (e instanceof Set) {
      if (!(t instanceof Set))
        return !1;
      if (e.size === 0)
        return t.size === 0;
      if (e.size === 1) {
        const [r] = Array.from(e.values());
        return Ud(r) ? Array.from(t.values()).every((i) => qa(r, i, n)) : t.has(r);
      }
      return Array.from(e.values()).every((r) => t.has(r));
    }
    return Object.keys(e).every((r) => {
      const i = e[r];
      return (r in t || Ud(o = i) && o[Dh]().matcherType === "optional") && qa(i, t[r], n);
      var o;
    });
  }
  return Object.is(t, e);
}, sF = (e) => new yl(e, []);
class yl {
  constructor(t, n) {
    this.value = void 0, this.cases = void 0, this.value = t, this.cases = n;
  }
  with(...t) {
    const n = t[t.length - 1], r = [t[0]], i = [];
    return t.length === 3 && typeof t[1] == "function" ? (r.push(t[0]), i.push(t[1])) : t.length > 2 && r.push(...t.slice(1, t.length - 1)), new yl(this.value, this.cases.concat([{ match: (o) => {
      let a = {};
      const l = Boolean(r.some((s) => qa(s, o, (u, c) => {
        a[u] = c;
      })) && i.every((s) => s(o)));
      return { matched: l, value: l && Object.keys(a).length ? y0 in a ? a[y0] : a : o };
    }, handler: n }]));
  }
  when(t, n) {
    return new yl(this.value, this.cases.concat([{ match: (r) => ({ matched: Boolean(t(r)), value: r }), handler: n }]));
  }
  otherwise(t) {
    return new yl(this.value, this.cases.concat([{ match: (n) => ({ matched: !0, value: n }), handler: t }])).run();
  }
  exhaustive() {
    return this.run();
  }
  run() {
    let t, n = this.value;
    for (let r = 0; r < this.cases.length; r++) {
      const i = this.cases[r], o = i.match(this.value);
      if (o.matched) {
        n = o.value, t = i.handler;
        break;
      }
    }
    if (!t) {
      let r;
      try {
        r = JSON.stringify(this.value);
      } catch (i) {
        r = this.value;
      }
      throw new Error(`Pattern matching error: no pattern matches value ${r}`);
    }
    return t(n, this.value);
  }
}
const uF = "_checkboxInput_7ym3w_1", cF = "_checkboxLabel_7ym3w_10", b0 = {
  checkboxInput: uF,
  checkboxLabel: cF
};
function fF({
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
        className: Vt("SUE-Input", b0.checkboxInput),
        id: i,
        "aria-labelledby": Nr(e),
        "aria-label": t,
        type: "checkbox",
        checked: n,
        onChange: o
      }
    ),
    /* @__PURE__ */ y(
      "label",
      {
        className: b0.checkboxLabel,
        htmlFor: i,
        "data-value": n ? "TRUE" : "FALSE",
        children: "Toggle"
      }
    )
  ] });
}
const dF = {
  fr: 1,
  px: 10,
  rem: 1,
  "%": 100
};
function pF({
  id: e,
  label: t,
  value: n,
  onChange: r,
  units: i = ["px", "rem", "%"]
}) {
  const { count: o, unit: a } = cc(n), l = k.useCallback(
    (c) => {
      if (c === void 0) {
        if (a !== "auto")
          throw new Error("Undefined count with auto units");
        r(Ua({ unit: a, count: null }));
        return;
      }
      if (a === "auto") {
        console.error("How did you change the count of an auto unit?");
        return;
      }
      r(Ua({ unit: a, count: c }));
    },
    [r, a]
  ), s = k.useCallback(
    (c) => {
      if (c === "auto") {
        r(
          Ua({
            unit: c,
            count: null
          })
        );
        return;
      }
      if (a === "auto") {
        r(
          Ua({ unit: c, count: dF[c] })
        );
        return;
      }
      r(Ua({ unit: c, count: o }));
    },
    [o, r, a]
  );
  i.includes(a) || i.push(a);
  const u = o === null;
  return /* @__PURE__ */ L(
    "div",
    {
      className: Vt("SUE-Input", kA.wrapper),
      "aria-label": t,
      "aria-labelledby": Nr(e),
      children: [
        /* @__PURE__ */ y(
          If,
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
function hF(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" } }, { tag: "path", attr: { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" } }] })(e);
}
var Rh = {}, mF = {
  get exports() {
    return Rh;
  },
  set exports(e) {
    Rh = e;
  }
};
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function S0(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ur(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? S0(Object(n), !0).forEach(function(r) {
      gF(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S0(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Eu(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Eu = function(t) {
    return typeof t;
  } : Eu = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Eu(e);
}
function gF(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function An() {
  return An = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, An.apply(this, arguments);
}
function vF(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function yF(e, t) {
  if (e == null)
    return {};
  var n = vF(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function wF(e) {
  return bF(e) || SF(e) || EF(e) || AF();
}
function bF(e) {
  if (Array.isArray(e))
    return Lh(e);
}
function SF(e) {
  if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function EF(e, t) {
  if (e) {
    if (typeof e == "string")
      return Lh(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Lh(e, t);
  }
}
function Lh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function AF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var CF = "1.15.0";
function xr(e) {
  if (typeof window != "undefined" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var Fr = xr(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), bs = xr(/Edge/i), E0 = xr(/firefox/i), wl = xr(/safari/i) && !xr(/chrome/i) && !xr(/android/i), MA = xr(/iP(ad|od|hone)/i), BA = xr(/chrome/i) && xr(/android/i), UA = {
  capture: !1,
  passive: !1
};
function pe(e, t, n) {
  e.addEventListener(t, n, !Fr && UA);
}
function ue(e, t, n) {
  e.removeEventListener(t, n, !Fr && UA);
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
function xF(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Mn(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && pc(e, t) : pc(e, t)) || r && e === n)
        return e;
      if (e === n)
        break;
    } while (e = xF(e));
  }
  return null;
}
var A0 = /\s+/g;
function Fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(A0, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(A0, " ");
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
function Wi(e, t) {
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
function zA(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function or() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function De(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, c, f;
    if (e !== window && e.parentNode && e !== or() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !Fr))
      do
        if (i && i.getBoundingClientRect && (X(i, "transform") !== "none" || n && X(i, "position") !== "static")) {
          var d = i.getBoundingClientRect();
          a -= d.top + parseInt(X(i, "border-top-width")), l -= d.left + parseInt(X(i, "border-left-width")), s = a + o.height, u = l + o.width;
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
function C0(e, t, n) {
  for (var r = Kr(e, !0), i = De(e)[t]; r; ) {
    var o = De(r)[n], a = void 0;
    if (n === "top" || n === "left" ? a = i >= o : a = i <= o, !a)
      return r;
    if (r === or())
      break;
    r = Kr(r, !1);
  }
  return !1;
}
function ia(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== ee.ghost && (r || a[o] !== ee.dragged) && Mn(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Ng(e, t) {
  for (var n = e.lastElementChild; n && (n === ee.ghost || X(n, "display") === "none" || t && !pc(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function Ye(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== ee.clone && (!t || pc(e, t)) && n++;
  return n;
}
function x0(e) {
  var t = 0, n = 0, r = or();
  if (e)
    do {
      var i = Wi(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function kF(e, t) {
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
    return or();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = X(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return or();
        if (r || t)
          return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return or();
}
function OF(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function zd(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var bl;
function WA(e, t) {
  return function() {
    if (!bl) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), bl = setTimeout(function() {
        bl = void 0;
      }, t);
    }
  };
}
function TF() {
  clearTimeout(bl), bl = void 0;
}
function jA(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Dg(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function k0(e, t) {
  X(e, "position", "absolute"), X(e, "top", t.top), X(e, "left", t.left), X(e, "width", t.width), X(e, "height", t.height);
}
function Wd(e) {
  X(e, "position", ""), X(e, "top", ""), X(e, "left", ""), X(e, "width", ""), X(e, "height", "");
}
var Et = "Sortable" + new Date().getTime();
function IF() {
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
            var o = ur({}, e[e.length - 1].rect);
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
      e.splice(kF(e, {
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
        m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && zd(d, f) && !zd(c, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = _F(h, d, p, i.options)), zd(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        X(r, "transition", ""), X(r, "transform", "");
        var l = Wi(this.el), s = l && l.a, u = l && l.d, c = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!c, r.animatingY = !!f, X(r, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = PF(r), X(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), X(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          X(r, "transition", ""), X(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function PF(e) {
  return e.offsetWidth;
}
function _F(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var so = [], jd = {
  initializeByDefault: !0
}, Ss = {
  mount: function(t) {
    for (var n in jd)
      jd.hasOwnProperty(n) && !(n in t) && (t[n] = jd[n]);
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
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ur({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](ur({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    so.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, An(r, u.defaults);
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
      typeof i.eventProperties == "function" && An(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return so.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function Za(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, f = e.newDraggableIndex, d = e.originalEvent, p = e.putSortable, h = e.extraEventProperties;
  if (t = t || n && n[Et], !!t) {
    var m, S = t.options, g = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Fr && !bs ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = c, m.newDraggableIndex = f, m.originalEvent = d, m.pullMode = p ? p.lastPutMode : void 0;
    var v = ur(ur({}, h), Ss.getEventProperties(r, t));
    for (var w in v)
      m[w] = v[w];
    n && n.dispatchEvent(m), S[g] && S[g].call(t, m);
  }
}
var NF = ["evt"], Nt = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = yF(r, NF);
  Ss.pluginEvent.bind(ee)(t, n, ur({
    dragEl: j,
    parentEl: We,
    ghostEl: ae,
    rootEl: Pe,
    nextEl: _i,
    lastDownEl: Au,
    cloneEl: Le,
    cloneHidden: Hr,
    dragStarted: el,
    putSortable: ft,
    activeSortable: ee.active,
    originalEvent: i,
    oldIndex: ko,
    oldDraggableIndex: Sl,
    newIndex: Jt,
    newDraggableIndex: zr,
    hideGhostForTarget: $A,
    unhideGhostForTarget: HA,
    cloneNowHidden: function() {
      Hr = !0;
    },
    cloneNowShown: function() {
      Hr = !1;
    },
    dispatchSortableEvent: function(l) {
      xt({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function xt(e) {
  Za(ur({
    putSortable: ft,
    cloneEl: Le,
    targetEl: j,
    rootEl: Pe,
    oldIndex: ko,
    oldDraggableIndex: Sl,
    newIndex: Jt,
    newDraggableIndex: zr
  }, e));
}
var j, We, ae, Pe, _i, Au, Le, Hr, ko, Jt, Sl, zr, Zs, ft, po = !1, hc = !1, mc = [], xi, Dn, Yd, Vd, O0, T0, el, uo, El, Al = !1, eu = !1, Cu, yt, Gd = [], Fh = !1, gc = [], _f = typeof document != "undefined", tu = MA, I0 = bs || Fr ? "cssFloat" : "float", DF = _f && !BA && !MA && "draggable" in document.createElement("div"), YA = function() {
  if (_f) {
    if (Fr)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), VA = function(t, n) {
  var r = X(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ia(t, 0, n), a = ia(t, 1, n), l = o && X(o), s = a && X(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + De(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + De(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[I0] === "none" || a && r[I0] === "none" && u + c > i) ? "vertical" : "horizontal";
}, RF = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, LF = function(t, n) {
  var r;
  return mc.some(function(i) {
    var o = i[Et].options.emptyInsertThreshold;
    if (!(!o || Ng(i))) {
      var a = De(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, GA = function(t) {
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
  (!i || Eu(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, $A = function() {
  !YA && ae && X(ae, "display", "none");
}, HA = function() {
  !YA && ae && X(ae, "display", "");
};
_f && !BA && document.addEventListener("click", function(e) {
  if (hc)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), hc = !1, !1;
}, !0);
var ki = function(t) {
  if (j) {
    t = t.touches ? t.touches[0] : t;
    var n = LF(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[Et]._onDragOver(r);
    }
  }
}, FF = function(t) {
  j && j.parentNode[Et]._isOutsideThisEl(t.target);
};
function ee(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = An({}, t), e[Et] = this;
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
      return VA(e, this.options);
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
    supportPointer: ee.supportPointer !== !1 && "PointerEvent" in window && !wl,
    emptyInsertThreshold: 5
  };
  Ss.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  GA(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : DF, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? pe(e, "pointerdown", this._onTapStart) : (pe(e, "mousedown", this._onTapStart), pe(e, "touchstart", this._onTapStart)), this.nativeDraggable && (pe(e, "dragover", this), pe(e, "dragenter", this)), mc.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), An(this, IF());
}
ee.prototype = /** @lends Sortable.prototype */
{
  constructor: ee,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (uo = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, j) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = i.filter;
      if (VF(r), !j && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && wl && s && s.tagName.toUpperCase() === "SELECT") && (s = Mn(s, i.draggable, r, !1), !(s && s.animated) && Au !== s)) {
        if (ko = Ye(s), Sl = Ye(s, i.draggable), typeof c == "function") {
          if (c.call(this, t, s, this)) {
            xt({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), Nt("filter", n, {
              evt: t
            }), o && t.cancelable && t.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(f) {
          if (f = Mn(u, f.trim(), r, !1), f)
            return xt({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), Nt("filter", n, {
              evt: t
            }), !0;
        }), c)) {
          o && t.cancelable && t.preventDefault();
          return;
        }
        i.handle && !Mn(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !j && r.parentNode === o) {
      var u = De(r);
      if (Pe = o, j = r, We = j.parentNode, _i = j.nextSibling, Au = r, Zs = a.group, ee.dragged = j, xi = {
        target: j,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, O0 = xi.clientX - u.left, T0 = xi.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, j.style["will-change"] = "all", s = function() {
        if (Nt("delayEnded", i, {
          evt: t
        }), ee.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !E0 && i.nativeDraggable && (j.draggable = !0), i._triggerDragStart(t, n), xt({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), Fe(j, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        zA(j, c.trim(), $d);
      }), pe(l, "dragover", ki), pe(l, "mousemove", ki), pe(l, "touchmove", ki), pe(l, "mouseup", i._onDrop), pe(l, "touchend", i._onDrop), pe(l, "touchcancel", i._onDrop), E0 && this.nativeDraggable && (this.options.touchStartThreshold = 4, j.draggable = !0), Nt("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(bs || Fr))) {
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
    j && $d(j), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    ue(t, "mouseup", this._disableDelayedDrag), ue(t, "touchend", this._disableDelayedDrag), ue(t, "touchcancel", this._disableDelayedDrag), ue(t, "mousemove", this._delayedDragTouchMoveHandler), ue(t, "touchmove", this._delayedDragTouchMoveHandler), ue(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? pe(document, "pointermove", this._onTouchMove) : n ? pe(document, "touchmove", this._onTouchMove) : pe(document, "mousemove", this._onTouchMove) : (pe(j, "dragend", this), pe(Pe, "dragstart", this._onDragStart));
    try {
      document.selection ? xu(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch (r) {
    }
  },
  _dragStarted: function(t, n) {
    if (po = !1, Pe && j) {
      Nt("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && pe(document, "dragover", FF);
      var r = this.options;
      !t && Fe(j, r.dragClass, !1), Fe(j, r.ghostClass, !0), ee.active = this, t && this._appendGhost(), xt({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Dn) {
      this._lastX = Dn.clientX, this._lastY = Dn.clientY, $A();
      for (var t = document.elementFromPoint(Dn.clientX, Dn.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Dn.clientX, Dn.clientY), t !== n); )
        n = t;
      if (j.parentNode[Et]._isOutsideThisEl(t), n)
        do {
          if (n[Et]) {
            var r = void 0;
            if (r = n[Et]._onDragOver({
              clientX: Dn.clientX,
              clientY: Dn.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = n.parentNode);
      HA();
    }
  },
  _onTouchMove: function(t) {
    if (xi) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = ae && Wi(ae, !0), l = ae && a && a.a, s = ae && a && a.d, u = tu && yt && x0(yt), c = (o.clientX - xi.clientX + i.x) / (l || 1) + (u ? u[0] - Gd[0] : 0) / (l || 1), f = (o.clientY - xi.clientY + i.y) / (s || 1) + (u ? u[1] - Gd[1] : 0) / (s || 1);
      if (!ee.active && !po) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (ae) {
        a ? (a.e += c - (Yd || 0), a.f += f - (Vd || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f
        };
        var d = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        X(ae, "webkitTransform", d), X(ae, "mozTransform", d), X(ae, "msTransform", d), X(ae, "transform", d), Yd = c, Vd = f, Dn = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!ae) {
      var t = this.options.fallbackOnBody ? document.body : Pe, n = De(j, !0, tu, !0, t), r = this.options;
      if (tu) {
        for (yt = t; X(yt, "position") === "static" && X(yt, "transform") === "none" && yt !== document; )
          yt = yt.parentNode;
        yt !== document.body && yt !== document.documentElement ? (yt === document && (yt = or()), n.top += yt.scrollTop, n.left += yt.scrollLeft) : yt = or(), Gd = x0(yt);
      }
      ae = j.cloneNode(!0), Fe(ae, r.ghostClass, !1), Fe(ae, r.fallbackClass, !0), Fe(ae, r.dragClass, !0), X(ae, "transition", ""), X(ae, "transform", ""), X(ae, "box-sizing", "border-box"), X(ae, "margin", 0), X(ae, "top", n.top), X(ae, "left", n.left), X(ae, "width", n.width), X(ae, "height", n.height), X(ae, "opacity", "0.8"), X(ae, "position", tu ? "absolute" : "fixed"), X(ae, "zIndex", "100000"), X(ae, "pointerEvents", "none"), ee.ghost = ae, t.appendChild(ae), X(ae, "transform-origin", O0 / parseInt(ae.style.width) * 100 + "% " + T0 / parseInt(ae.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (Nt("dragStart", this, {
      evt: t
    }), ee.eventCanceled) {
      this._onDrop();
      return;
    }
    Nt("setupClone", this), ee.eventCanceled || (Le = Dg(j), Le.removeAttribute("id"), Le.draggable = !1, Le.style["will-change"] = "", this._hideClone(), Fe(Le, this.options.chosenClass, !1), ee.clone = Le), r.cloneId = xu(function() {
      Nt("clone", r), !ee.eventCanceled && (r.options.removeCloneOnHide || Pe.insertBefore(Le, j), r._hideClone(), xt({
        sortable: r,
        name: "clone"
      }));
    }), !n && Fe(j, o.dragClass, !0), n ? (hc = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (ue(document, "mouseup", r._onDrop), ue(document, "touchend", r._onDrop), ue(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, j)), pe(document, "drop", r), X(j, "transform", "translateZ(0)")), po = !0, r._dragStartId = xu(r._dragStarted.bind(r, n, t)), pe(document, "selectstart", r), el = !0, wl && X(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = ee.active, c = Zs === s, f = l.sort, d = ft || u, p, h = this, m = !1;
    if (Fh)
      return;
    function S(U, V) {
      Nt(U, h, ur({
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
          return nu(Pe, n, j, i, x, De(x), t, C);
        },
        changed: w
      }, V));
    }
    function g() {
      S("dragOverAnimationCapture"), h.captureAnimationState(), h !== d && d.captureAnimationState();
    }
    function v(U) {
      return S("dragOverCompleted", {
        insertion: U
      }), U && (c ? u._hideClone() : u._showClone(h), h !== d && (Fe(j, ft ? ft.options.ghostClass : u.options.ghostClass, !1), Fe(j, l.ghostClass, !0)), ft !== h && h !== ee.active ? ft = h : h === ee.active && ft && (ft = null), d === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (r === j && !j.animated || r === n && !r.animated) && (uo = null), !l.dragoverBubble && !t.rootEl && r !== document && (j.parentNode[Et]._isOutsideThisEl(t.target), !U && ki(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function w() {
      Jt = Ye(j), zr = Ye(j, l.draggable), xt({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: Jt,
        newDraggableIndex: zr,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Mn(r, l.draggable, n, !0), S("dragOver"), ee.eventCanceled)
      return m;
    if (j.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return v(!1);
    if (hc = !1, u && !l.disabled && (c ? f || (a = We !== Pe) : ft === this || (this.lastPutMode = Zs.checkPull(this, u, j, t)) && s.checkPut(this, u, j, t))) {
      if (p = this._getDirection(t, r) === "vertical", i = De(j), S("dragOverValid"), ee.eventCanceled)
        return m;
      if (a)
        return We = Pe, g(), this._hideClone(), S("revert"), ee.eventCanceled || (_i ? Pe.insertBefore(j, _i) : Pe.appendChild(j)), v(!0);
      var E = Ng(n, l.draggable);
      if (!E || zF(t, p, this) && !E.animated) {
        if (E === j)
          return v(!1);
        if (E && n === t.target && (r = E), r && (o = De(r)), nu(Pe, n, j, i, r, o, t, !!r) !== !1)
          return g(), E && E.nextSibling ? n.insertBefore(j, E.nextSibling) : n.appendChild(j), We = n, w(), v(!0);
      } else if (E && UF(t, p, this)) {
        var O = ia(n, 0, l, !0);
        if (O === j)
          return v(!1);
        if (r = O, o = De(r), nu(Pe, n, j, i, r, o, t, !1) !== !1)
          return g(), n.insertBefore(j, O), We = n, w(), v(!0);
      } else if (r.parentNode === n) {
        o = De(r);
        var b = 0, A, T = j.parentNode !== n, P = !RF(j.animated && j.toRect || i, r.animated && r.toRect || o, p), _ = p ? "top" : "left", I = C0(r, "top", "top") || C0(j, "top", "top"), F = I ? I.scrollTop : void 0;
        uo !== r && (A = o[_], Al = !1, eu = !P && l.invertSwap || T), b = WF(t, r, o, p, P ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, eu, uo === r);
        var B;
        if (b !== 0) {
          var q = Ye(j);
          do
            q -= b, B = We.children[q];
          while (B && (X(B, "display") === "none" || B === ae));
        }
        if (b === 0 || B === r)
          return v(!1);
        uo = r, El = b;
        var re = r.nextElementSibling, te = !1;
        te = b === 1;
        var fe = nu(Pe, n, j, i, r, o, t, te);
        if (fe !== !1)
          return (fe === 1 || fe === -1) && (te = fe === 1), Fh = !0, setTimeout(BF, 30), g(), te && !re ? n.appendChild(j) : r.parentNode.insertBefore(j, te ? re : r), I && jA(I, 0, F - I.scrollTop), We = j.parentNode, A !== void 0 && !eu && (Cu = Math.abs(A - De(r)[_])), w(), v(!0);
      }
      if (n.contains(j))
        return v(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    ue(document, "mousemove", this._onTouchMove), ue(document, "touchmove", this._onTouchMove), ue(document, "pointermove", this._onTouchMove), ue(document, "dragover", ki), ue(document, "mousemove", ki), ue(document, "touchmove", ki);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    ue(t, "mouseup", this._onDrop), ue(t, "touchend", this._onDrop), ue(t, "pointerup", this._onDrop), ue(t, "touchcancel", this._onDrop), ue(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (Jt = Ye(j), zr = Ye(j, r.draggable), Nt("drop", this, {
      evt: t
    }), We = j && j.parentNode, Jt = Ye(j), zr = Ye(j, r.draggable), ee.eventCanceled) {
      this._nulling();
      return;
    }
    po = !1, eu = !1, Al = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Mh(this.cloneId), Mh(this._dragStartId), this.nativeDraggable && (ue(document, "drop", this), ue(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), wl && X(document.body, "user-select", ""), X(j, "transform", ""), t && (el && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), ae && ae.parentNode && ae.parentNode.removeChild(ae), (Pe === We || ft && ft.lastPutMode !== "clone") && Le && Le.parentNode && Le.parentNode.removeChild(Le), j && (this.nativeDraggable && ue(j, "dragend", this), $d(j), j.style["will-change"] = "", el && !po && Fe(j, ft ? ft.options.ghostClass : this.options.ghostClass, !1), Fe(j, this.options.chosenClass, !1), xt({
      sortable: this,
      name: "unchoose",
      toEl: We,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Pe !== We ? (Jt >= 0 && (xt({
      rootEl: We,
      name: "add",
      toEl: We,
      fromEl: Pe,
      originalEvent: t
    }), xt({
      sortable: this,
      name: "remove",
      toEl: We,
      originalEvent: t
    }), xt({
      rootEl: We,
      name: "sort",
      toEl: We,
      fromEl: Pe,
      originalEvent: t
    }), xt({
      sortable: this,
      name: "sort",
      toEl: We,
      originalEvent: t
    })), ft && ft.save()) : Jt !== ko && Jt >= 0 && (xt({
      sortable: this,
      name: "update",
      toEl: We,
      originalEvent: t
    }), xt({
      sortable: this,
      name: "sort",
      toEl: We,
      originalEvent: t
    })), ee.active && ((Jt == null || Jt === -1) && (Jt = ko, zr = Sl), xt({
      sortable: this,
      name: "end",
      toEl: We,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    Nt("nulling", this), Pe = j = We = ae = _i = Le = Au = Hr = xi = Dn = el = Jt = zr = ko = Sl = uo = El = ft = Zs = ee.dragged = ee.ghost = ee.clone = ee.active = null, gc.forEach(function(t) {
      t.checked = !0;
    }), gc.length = Yd = Vd = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        j && (this._onDragOver(t), MF(t));
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
      n = r[i], Mn(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || YF(n));
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
      Mn(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return Mn(t, n || this.options.draggable, this.el, !1);
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
    var i = Ss.modifyOption(this, t, n);
    typeof i != "undefined" ? r[t] = i : r[t] = n, t === "group" && GA(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    Nt("destroy", this);
    var t = this.el;
    t[Et] = null, ue(t, "mousedown", this._onTapStart), ue(t, "touchstart", this._onTapStart), ue(t, "pointerdown", this._onTapStart), this.nativeDraggable && (ue(t, "dragover", this), ue(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), mc.splice(mc.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Hr) {
      if (Nt("hideClone", this), ee.eventCanceled)
        return;
      X(Le, "display", "none"), this.options.removeCloneOnHide && Le.parentNode && Le.parentNode.removeChild(Le), Hr = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Hr) {
      if (Nt("showClone", this), ee.eventCanceled)
        return;
      j.parentNode == Pe && !this.options.group.revertClone ? Pe.insertBefore(Le, j) : _i ? Pe.insertBefore(Le, _i) : Pe.appendChild(Le), this.options.group.revertClone && this.animate(j, Le), X(Le, "display", ""), Hr = !1;
    }
  }
};
function MF(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function nu(e, t, n, r, i, o, a, l) {
  var s, u = e[Et], c = u.options.onMove, f;
  return window.CustomEvent && !Fr && !bs ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || De(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
}
function $d(e) {
  e.draggable = !1;
}
function BF() {
  Fh = !1;
}
function UF(e, t, n) {
  var r = De(ia(n.el, 0, n.options, !0)), i = 10;
  return t ? e.clientX < r.left - i || e.clientY < r.top && e.clientX < r.right : e.clientY < r.top - i || e.clientY < r.bottom && e.clientX < r.left;
}
function zF(e, t, n) {
  var r = De(Ng(n.el, n.options.draggable)), i = 10;
  return t ? e.clientX > r.right + i || e.clientX <= r.right && e.clientY > r.bottom && e.clientX >= r.left : e.clientX > r.right && e.clientY > r.top || e.clientX <= r.right && e.clientY > r.bottom + i;
}
function WF(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, f = r ? n.bottom : n.right, d = !1;
  if (!a) {
    if (l && Cu < u * i) {
      if (!Al && (El === 1 ? s > c + u * o / 2 : s < f - u * o / 2) && (Al = !0), Al)
        d = !0;
      else if (El === 1 ? s < c + Cu : s > f - Cu)
        return -El;
    } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return jF(t);
  }
  return d = d || a, d && (s < c + u * o / 2 || s > f - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function jF(e) {
  return Ye(j) < Ye(e) ? 1 : -1;
}
function YF(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function VF(e) {
  gc.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && gc.push(r);
  }
}
function xu(e) {
  return setTimeout(e, 0);
}
function Mh(e) {
  return clearTimeout(e);
}
_f && pe(document, "touchmove", function(e) {
  (ee.active || po) && e.cancelable && e.preventDefault();
});
ee.utils = {
  on: pe,
  off: ue,
  css: X,
  find: zA,
  is: function(t, n) {
    return !!Mn(t, n, t, !1);
  },
  extend: OF,
  throttle: WA,
  closest: Mn,
  toggleClass: Fe,
  clone: Dg,
  index: Ye,
  nextTick: xu,
  cancelNextTick: Mh,
  detectDirection: VA,
  getChild: ia
};
ee.get = function(e) {
  return e[Et];
};
ee.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (ee.utils = ur(ur({}, ee.utils), r.utils)), Ss.mount(r);
  });
};
ee.create = function(e, t) {
  return new ee(e, t);
};
ee.version = CF;
var Ke = [], tl, Bh, Uh = !1, Hd, Jd, vc, nl;
function GF() {
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
      this.sortable.nativeDraggable ? ue(document, "dragover", this._handleAutoScroll) : (ue(document, "pointermove", this._handleFallbackAutoScroll), ue(document, "touchmove", this._handleFallbackAutoScroll), ue(document, "mousemove", this._handleFallbackAutoScroll)), P0(), ku(), TF();
    },
    nulling: function() {
      vc = Bh = tl = Uh = nl = Hd = Jd = null, Ke.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (vc = n, r || this.options.forceAutoScrollFallback || bs || Fr || wl) {
        Qd(n, this.options, l, r);
        var s = Kr(l, !0);
        Uh && (!nl || o !== Hd || a !== Jd) && (nl && P0(), nl = setInterval(function() {
          var u = Kr(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, ku()), Qd(n, i.options, u, r);
        }, 10), Hd = o, Jd = a);
      } else {
        if (!this.options.bubbleScroll || Kr(l, !0) === or()) {
          ku();
          return;
        }
        Qd(n, this.options, Kr(l, !1), !1);
      }
    }
  }, An(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function ku() {
  Ke.forEach(function(e) {
    clearInterval(e.pid);
  }), Ke = [];
}
function P0() {
  clearInterval(nl);
}
var Qd = WA(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = or(), u = !1, c;
    Bh !== n && (Bh = n, ku(), tl = t.scroll, c = t.scrollFn, tl === !0 && (tl = Kr(n, !0)));
    var f = 0, d = tl;
    do {
      var p = d, h = De(p), m = h.top, S = h.bottom, g = h.left, v = h.right, w = h.width, E = h.height, O = void 0, b = void 0, A = p.scrollWidth, T = p.scrollHeight, P = X(p), _ = p.scrollLeft, I = p.scrollTop;
      p === s ? (O = w < A && (P.overflowX === "auto" || P.overflowX === "scroll" || P.overflowX === "visible"), b = E < T && (P.overflowY === "auto" || P.overflowY === "scroll" || P.overflowY === "visible")) : (O = w < A && (P.overflowX === "auto" || P.overflowX === "scroll"), b = E < T && (P.overflowY === "auto" || P.overflowY === "scroll"));
      var F = O && (Math.abs(v - i) <= a && _ + w < A) - (Math.abs(g - i) <= a && !!_), B = b && (Math.abs(S - o) <= a && I + E < T) - (Math.abs(m - o) <= a && !!I);
      if (!Ke[f])
        for (var q = 0; q <= f; q++)
          Ke[q] || (Ke[q] = {});
      (Ke[f].vx != F || Ke[f].vy != B || Ke[f].el !== p) && (Ke[f].el = p, Ke[f].vx = F, Ke[f].vy = B, clearInterval(Ke[f].pid), (F != 0 || B != 0) && (u = !0, Ke[f].pid = setInterval(function() {
        r && this.layer === 0 && ee.active._onTouchMove(vc);
        var re = Ke[this.layer].vy ? Ke[this.layer].vy * l : 0, te = Ke[this.layer].vx ? Ke[this.layer].vx * l : 0;
        typeof c == "function" && c.call(ee.dragged.parentNode[Et], te, re, e, vc, Ke[this.layer].el) !== "continue" || jA(Ke[this.layer].el, te, re);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && d !== s && (d = Kr(d, !1)));
    Uh = u;
  }
}, 30), JA = function(t) {
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
function Rg() {
}
Rg.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = ia(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: JA
};
An(Rg, {
  pluginName: "revertOnSpill"
});
function Lg() {
}
Lg.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: JA
};
An(Lg, {
  pluginName: "removeOnSpill"
});
var cn;
function $F() {
  function e() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return e.prototype = {
    dragStart: function(n) {
      var r = n.dragEl;
      cn = r;
    },
    dragOverValid: function(n) {
      var r = n.completed, i = n.target, o = n.onMove, a = n.activeSortable, l = n.changed, s = n.cancel;
      if (a.options.swap) {
        var u = this.sortable.el, c = this.options;
        if (i && i !== u) {
          var f = cn;
          o(i) !== !1 ? (Fe(i, c.swapClass, !0), cn = i) : cn = null, f && f !== cn && Fe(f, c.swapClass, !1);
        }
        l(), r(!0), s();
      }
    },
    drop: function(n) {
      var r = n.activeSortable, i = n.putSortable, o = n.dragEl, a = i || this.sortable, l = this.options;
      cn && Fe(cn, l.swapClass, !1), cn && (l.swap || i && i.options.swap) && o !== cn && (a.captureAnimationState(), a !== r && r.captureAnimationState(), HF(o, cn), a.animateAll(), a !== r && r.animateAll());
    },
    nulling: function() {
      cn = null;
    }
  }, An(e, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: cn
      };
    }
  });
}
function HF(e, t) {
  var n = e.parentNode, r = t.parentNode, i, o;
  !n || !r || n.isEqualNode(t) || r.isEqualNode(e) || (i = Ye(e), o = Ye(t), n.isEqualNode(r) && i < o && o++, n.insertBefore(t, n.children[i]), r.insertBefore(e, r.children[o]));
}
var ie = [], Ht = [], ja, Rn, Ya = !1, Dt = !1, co = !1, Ce, Va, ru;
function JF() {
  function e(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? pe(document, "pointerup", this._deselectMultiDrag) : (pe(document, "mouseup", this._deselectMultiDrag), pe(document, "touchend", this._deselectMultiDrag))), pe(document, "keydown", this._checkKeyDown), pe(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(i, o) {
        var a = "";
        ie.length && Rn === t ? ie.forEach(function(l, s) {
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
      Ce = r;
    },
    delayEnded: function() {
      this.isMultiDrag = ~ie.indexOf(Ce);
    },
    setupClone: function(n) {
      var r = n.sortable, i = n.cancel;
      if (this.isMultiDrag) {
        for (var o = 0; o < ie.length; o++)
          Ht.push(Dg(ie[o])), Ht[o].sortableIndex = ie[o].sortableIndex, Ht[o].draggable = !1, Ht[o].style["will-change"] = "", Fe(Ht[o], this.options.selectedClass, !1), ie[o] === Ce && Fe(Ht[o], this.options.chosenClass, !1);
        r._hideClone(), i();
      }
    },
    clone: function(n) {
      var r = n.sortable, i = n.rootEl, o = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || ie.length && Rn === r && (_0(!0, i), o("clone"), a()));
    },
    showClone: function(n) {
      var r = n.cloneNowShown, i = n.rootEl, o = n.cancel;
      this.isMultiDrag && (_0(!1, i), Ht.forEach(function(a) {
        X(a, "display", "");
      }), r(), ru = !1, o());
    },
    hideClone: function(n) {
      var r = this;
      n.sortable;
      var i = n.cloneNowHidden, o = n.cancel;
      this.isMultiDrag && (Ht.forEach(function(a) {
        X(a, "display", "none"), r.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), i(), ru = !0, o());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && Rn && Rn.multiDrag._deselectMultiDrag(), ie.forEach(function(r) {
        r.sortableIndex = Ye(r);
      }), ie = ie.sort(function(r, i) {
        return r.sortableIndex - i.sortableIndex;
      }), co = !0;
    },
    dragStarted: function(n) {
      var r = this, i = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (i.captureAnimationState(), this.options.animation)) {
          ie.forEach(function(a) {
            a !== Ce && X(a, "position", "absolute");
          });
          var o = De(Ce, !1, !0, !0);
          ie.forEach(function(a) {
            a !== Ce && k0(a, o);
          }), Dt = !0, Ya = !0;
        }
        i.animateAll(function() {
          Dt = !1, Ya = !1, r.options.animation && ie.forEach(function(a) {
            Wd(a);
          }), r.options.sort && iu();
        });
      }
    },
    dragOver: function(n) {
      var r = n.target, i = n.completed, o = n.cancel;
      Dt && ~ie.indexOf(r) && (i(!1), o());
    },
    revert: function(n) {
      var r = n.fromSortable, i = n.rootEl, o = n.sortable, a = n.dragRect;
      ie.length > 1 && (ie.forEach(function(l) {
        o.addAnimationState({
          target: l,
          rect: Dt ? De(l) : a
        }), Wd(l), l.fromRect = a, r.removeAnimationState(l);
      }), Dt = !1, QF(!this.options.removeCloneOnHide, i));
    },
    dragOverCompleted: function(n) {
      var r = n.sortable, i = n.isOwner, o = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, u = this.options;
      if (o) {
        if (i && a._hideClone(), Ya = !1, u.animation && ie.length > 1 && (Dt || !i && !a.options.sort && !s)) {
          var c = De(Ce, !1, !0, !0);
          ie.forEach(function(d) {
            d !== Ce && (k0(d, c), l.appendChild(d));
          }), Dt = !0;
        }
        if (!i)
          if (Dt || iu(), ie.length > 1) {
            var f = ru;
            a._showClone(r), a.options.animation && !ru && f && Ht.forEach(function(d) {
              a.addAnimationState({
                target: d,
                rect: Va
              }), d.fromRect = Va, d.thisAnimationDuration = null;
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
        Va = An({}, r);
        var a = Wi(Ce, !0);
        Va.top -= a.f, Va.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      Dt && (Dt = !1, iu());
    },
    drop: function(n) {
      var r = n.originalEvent, i = n.rootEl, o = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, u = n.putSortable, c = u || this.sortable;
      if (r) {
        var f = this.options, d = o.children;
        if (!co)
          if (f.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Fe(Ce, f.selectedClass, !~ie.indexOf(Ce)), ~ie.indexOf(Ce))
            ie.splice(ie.indexOf(Ce), 1), ja = null, Za({
              sortable: a,
              rootEl: i,
              name: "deselect",
              targetEl: Ce,
              originalEvent: r
            });
          else {
            if (ie.push(Ce), Za({
              sortable: a,
              rootEl: i,
              name: "select",
              targetEl: Ce,
              originalEvent: r
            }), r.shiftKey && ja && a.el.contains(ja)) {
              var p = Ye(ja), h = Ye(Ce);
              if (~p && ~h && p !== h) {
                var m, S;
                for (h > p ? (S = p, m = h) : (S = h, m = p + 1); S < m; S++)
                  ~ie.indexOf(d[S]) || (Fe(d[S], f.selectedClass, !0), ie.push(d[S]), Za({
                    sortable: a,
                    rootEl: i,
                    name: "select",
                    targetEl: d[S],
                    originalEvent: r
                  }));
              }
            } else
              ja = Ce;
            Rn = c;
          }
        if (co && this.isMultiDrag) {
          if (Dt = !1, (o[Et].options.sort || o !== i) && ie.length > 1) {
            var g = De(Ce), v = Ye(Ce, ":not(." + this.options.selectedClass + ")");
            if (!Ya && f.animation && (Ce.thisAnimationDuration = null), c.captureAnimationState(), !Ya && (f.animation && (Ce.fromRect = g, ie.forEach(function(E) {
              if (E.thisAnimationDuration = null, E !== Ce) {
                var O = Dt ? De(E) : g;
                E.fromRect = O, c.addAnimationState({
                  target: E,
                  rect: O
                });
              }
            })), iu(), ie.forEach(function(E) {
              d[v] ? o.insertBefore(E, d[v]) : o.appendChild(E), v++;
            }), s === Ye(Ce))) {
              var w = !1;
              ie.forEach(function(E) {
                if (E.sortableIndex !== Ye(E)) {
                  w = !0;
                  return;
                }
              }), w && l("update");
            }
            ie.forEach(function(E) {
              Wd(E);
            }), c.animateAll();
          }
          Rn = c;
        }
        (i === o || u && u.lastPutMode !== "clone") && Ht.forEach(function(E) {
          E.parentNode && E.parentNode.removeChild(E);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = co = !1, Ht.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), ue(document, "pointerup", this._deselectMultiDrag), ue(document, "mouseup", this._deselectMultiDrag), ue(document, "touchend", this._deselectMultiDrag), ue(document, "keydown", this._checkKeyDown), ue(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof co != "undefined" && co) && Rn === this.sortable && !(n && Mn(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; ie.length; ) {
          var r = ie[0];
          Fe(r, this.options.selectedClass, !1), ie.shift(), Za({
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
  }, An(e, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var r = n.parentNode[Et];
        !r || !r.options.multiDrag || ~ie.indexOf(n) || (Rn && Rn !== r && (Rn.multiDrag._deselectMultiDrag(), Rn = r), Fe(n, r.options.selectedClass, !0), ie.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var r = n.parentNode[Et], i = ie.indexOf(n);
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
        Dt && o !== Ce ? a = -1 : Dt ? a = Ye(o, ":not(." + n.options.selectedClass + ")") : a = Ye(o), i.push({
          multiDragElement: o,
          index: a
        });
      }), {
        items: wF(ie),
        clones: [].concat(Ht),
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
function QF(e, t) {
  ie.forEach(function(n, r) {
    var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
    i ? t.insertBefore(n, i) : t.appendChild(n);
  });
}
function _0(e, t) {
  Ht.forEach(function(n, r) {
    var i = t.children[n.sortableIndex + (e ? Number(r) : 0)];
    i ? t.insertBefore(n, i) : t.appendChild(n);
  });
}
function iu() {
  ie.forEach(function(e) {
    e !== Ce && e.parentNode && e.parentNode.removeChild(e);
  });
}
ee.mount(new GF());
ee.mount(Lg, Rg);
const KF = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MultiDrag: JF,
  Sortable: ee,
  Swap: $F,
  default: ee
}, Symbol.toStringTag, { value: "Module" })), XF = /* @__PURE__ */ $0(KF);
var zh = {}, qF = {
  get exports() {
    return zh;
  },
  set exports(e) {
    zh = e;
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
})(qF);
var ZF = "Invariant failed";
function e8(e, t) {
  if (!e)
    throw new Error(ZF);
}
const t8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: e8
}, Symbol.toStringTag, { value: "Module" })), n8 = /* @__PURE__ */ $0(t8);
(function(e) {
  var t = XF, n = zh, r = J, i = n8;
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
  function d(b, A) {
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
        const B = M({
          element: b.item,
          oldIndex: b.oldIndex,
          newIndex: b.newIndex
        }, P), q = M({
          element: b.swapItem,
          oldIndex: b.newIndex,
          newIndex: b.oldIndex
        }, P);
        _ = [
          B,
          q
        ];
        break;
      case "multidrag":
        _ = b.oldIndicies.map((re, te) => M({
          element: re.multiDragElement,
          oldIndex: re.index,
          newIndex: b.newIndicies[te].index
        }, P));
        break;
    }
    return g(_, A);
  }
  function p(b, A) {
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
    const _n = b, { list: A, setList: T, children: P, tag: _, style: I, className: F, clone: B, onAdd: q, onChange: re, onChoose: te, onClone: fe, onEnd: U, onFilter: V, onRemove: $, onSort: x, onStart: C, onUnchoose: tt, onUpdate: Ge, onMove: Qe, onSpill: me, onSelect: $e, onDeselect: ot } = _n;
    return at(_n, ["list", "setList", "children", "tag", "style", "className", "clone", "onAdd", "onChange", "onChoose", "onClone", "onEnd", "onFilter", "onRemove", "onSort", "onStart", "onUnchoose", "onUpdate", "onMove", "onSpill", "onSelect", "onDeselect"]);
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
      const { children: A, dataIdAttr: T, selectedClass: P = "sortable-selected", chosenClass: _ = "sortable-chosen", dragClass: I = "sortable-drag", fallbackClass: F = "sortable-falback", ghostClass: B = "sortable-ghost", swapClass: q = "sortable-swap-highlight", filter: re = "sortable-filter", list: te } = this.props;
      if (!A || A == null)
        return null;
      const fe = T || "data-id";
      return r.Children.map(A, (U, V) => {
        if (U === void 0)
          return;
        const $ = te[V] || {}, { className: x } = U.props, C = typeof re == "string" && {
          [re.replace(".", "")]: !!$.filtered
        }, tt = o(n)(x, M({
          [P]: $.selected,
          [_]: $.chosen
        }, C));
        return /* @__PURE__ */ (0, r.cloneElement)(U, {
          [fe]: U.key,
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
        const { onMove: B } = this.props, q = I.willInsertAfter || -1;
        if (!B)
          return q;
        const re = B(I, F, this.sortable, w);
        return typeof re == "undefined" ? !1 : re;
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
      ], F = d(A, I);
      c(F);
      const B = m(F, T, A, _).map((q) => Object.assign(q, {
        selected: !1
      }));
      P(B, this.sortable, w);
    }
    onRemove(A) {
      const { list: T, setList: P } = this.props, _ = S(A), I = d(A, T);
      f(I);
      let F = [
        ...T
      ];
      if (A.pullMode !== "clone")
        F = h(I, F);
      else {
        let B = I;
        switch (_) {
          case "multidrag":
            B = I.map((q, re) => Q(M({}, q), {
              element: A.clones[re]
            }));
            break;
          case "normal":
            B = I.map((q) => Q(M({}, q), {
              element: A.clone
            }));
            break;
          case "swap":
          default:
            o(i)(!0, `mode "${_}" cannot clone. Please remove "props.clone" from <ReactSortable/> when using the "${_}" plugin`);
        }
        c(B), I.forEach((q) => {
          const re = q.oldIndex, te = this.props.clone(q.item, A);
          F.splice(re, 1, te);
        });
      }
      F = F.map((B) => Object.assign(B, {
        selected: !1
      })), P(F, this.sortable, w);
    }
    onUpdate(A) {
      const { list: T, setList: P } = this.props, _ = d(A, T);
      c(_), f(_);
      const I = p(_, T);
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
        let B = I;
        return F === A.oldIndex && (B = Object.assign(I, {
          chosen: !0
        })), B;
      });
      P(_, this.sortable, w);
    }
    onUnchoose(A) {
      const { list: T, setList: P } = this.props, _ = T.map((I, F) => {
        let B = I;
        return F === A.oldIndex && (B = Object.assign(B, {
          chosen: !1
        })), B;
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
  $g(E, "defaultProps", {
    clone: (A) => A
  });
  var O = {};
  l(e.exports, O);
})(mF);
const r8 = "_container_xt7ji_1", i8 = "_list_xt7ji_6", o8 = "_item_xt7ji_15", a8 = "_keyField_xt7ji_29", l8 = "_valueField_xt7ji_34", s8 = "_header_xt7ji_39", u8 = "_dragHandle_xt7ji_45", c8 = "_deleteButton_xt7ji_55", f8 = "_addItemButton_xt7ji_65", d8 = "_separator_xt7ji_72", Gt = {
  container: r8,
  list: i8,
  item: o8,
  keyField: a8,
  valueField: l8,
  header: s8,
  dragHandle: u8,
  deleteButton: c8,
  addItemButton: f8,
  separator: d8
};
function p8(e) {
  return !(typeof e != "object" || Object.values(e).find(
    (n) => typeof n != "string"
  ));
}
function h8({
  id: e,
  label: t,
  value: n,
  onChange: r,
  newItemValue: i = { key: "myKey", value: "myValue" }
}) {
  const { state: o, setState: a, addItem: l, deleteItem: s } = m8({
    value: n,
    onChange: r,
    newItemValue: i
  });
  return /* @__PURE__ */ L(
    "div",
    {
      className: Gt.list,
      "aria-labelledby": Nr(e),
      "aria-label": t,
      children: [
        /* @__PURE__ */ L(
          "div",
          {
            className: Gt.item + " " + Gt.header,
            "aria-label": "Columns field labels",
            children: [
              /* @__PURE__ */ y("span", { className: Gt.keyField, children: "Key" }),
              /* @__PURE__ */ y("span", { className: Gt.valueField, children: "Value" })
            ]
          }
        ),
        /* @__PURE__ */ y(
          Rh.ReactSortable,
          {
            list: o,
            setList: a,
            handle: `.${Gt.dragHandle}`,
            children: o.map((u, c) => /* @__PURE__ */ L("div", { className: Gt.item, children: [
              /* @__PURE__ */ y("div", { className: Gt.dragHandle, title: "Reorder list", children: /* @__PURE__ */ y(hF, {}) }),
              /* @__PURE__ */ y(
                "input",
                {
                  title: "Key Field",
                  className: Gt.keyField,
                  type: "text",
                  value: u.key,
                  onChange: (f) => {
                    const d = [...o];
                    d[c] = Q(M({}, u), { key: f.target.value }), a(d);
                  }
                }
              ),
              /* @__PURE__ */ y("span", { className: Gt.separator, children: ":" }),
              /* @__PURE__ */ y(
                "input",
                {
                  title: "Value Field",
                  className: Gt.valueField,
                  type: "text",
                  value: u.value,
                  onChange: (f) => {
                    const d = [...o];
                    d[c] = Q(M({}, u), { value: f.target.value }), a(d);
                  }
                }
              ),
              /* @__PURE__ */ y(
                mt,
                {
                  className: Gt.deleteButton,
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
          mt,
          {
            className: Gt.addItemButton,
            onClick: () => l(),
            variant: ["icon", "transparent"],
            title: "Add new item",
            "aria-label": "Add new item to list",
            children: /* @__PURE__ */ y(mg, {})
          }
        )
      ]
    }
  );
}
function m8({
  value: e,
  onChange: t,
  newItemValue: n
}) {
  const [r, i] = k.useState(
    e !== void 0 ? Object.keys(e).map((l, s) => ({ id: s, key: l, value: e[l] })) : []
  );
  k.useEffect(() => {
    const l = g8(r);
    V_(l, e != null ? e : {}) || t(l);
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
function g8(e) {
  return e.reduce(
    (n, { key: r, value: i }) => (n[r] = i, n),
    {}
  );
}
const v8 = "__DEFAULT-DROPDOWN-CHOICE__";
function y8({
  id: e,
  label: t,
  choices: n,
  onChange: r,
  value: i
}) {
  k.useEffect(() => {
    i === v8 && r(n[0]), n.length > 0 && !n.includes(i) && r(n[0]);
  }, [r, n, i]);
  const o = (l) => {
    const s = l.target.selectedIndex;
    r(n[s]);
  }, a = I_(n);
  return a.length === 0 ? /* @__PURE__ */ y(
    "select",
    {
      title: `${t} selector`,
      "aria-labelledby": Nr(e),
      "aria-label": t,
      className: "OptionsDropdown SUE-Input",
      placeholder: "No available options"
    }
  ) : /* @__PURE__ */ y(
    "select",
    {
      title: `${t} selector`,
      "aria-labelledby": Nr(e),
      className: "OptionsDropdown SUE-Input",
      onChange: o,
      value: i,
      children: a.map((l) => /* @__PURE__ */ y("option", { value: l, children: l }, l))
    }
  );
}
const w8 = "_radioContainer_1regb_1", b8 = "_option_1regb_15", S8 = "_radioInput_1regb_22", E8 = "_radioLabel_1regb_26", A8 = "_icon_1regb_41", Ga = {
  radioContainer: w8,
  option: b8,
  radioInput: S8,
  radioLabel: E8,
  icon: A8
}, C8 = "__DEFAULT-RADIO-CHOICE__";
function x8({
  id: e,
  label: t,
  choices: n,
  value: r,
  onChange: i,
  optionsPerColumn: o
}) {
  const a = Object.keys(n);
  J.useEffect(() => {
    r === C8 && i(a[0]);
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
      className: Ga.radioContainer,
      "aria-labelledby": Nr(e),
      "aria-label": t,
      style: l,
      children: a.map((s) => {
        var d;
        const { icon: u, label: c = s } = (d = n[s]) != null ? d : {}, f = e + s;
        return /* @__PURE__ */ L("div", { className: Ga.option, children: [
          /* @__PURE__ */ y(
            "input",
            {
              className: Ga.radioInput,
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
              className: Ga.radioLabel,
              htmlFor: f,
              "data-name": c,
              children: typeof u == "string" ? /* @__PURE__ */ y("img", { src: u, alt: c, className: Ga.icon }) : u
            }
          )
        ] }, s);
      })
    }
  );
}
function k8({
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
      "aria-labelledby": Nr(e),
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
function O8(e) {
  return sF(e).with({ inputType: "string" }, (t) => /* @__PURE__ */ y(k8, M({}, t))).with({ inputType: "number" }, (t) => /* @__PURE__ */ y(cL, M({}, t))).with({ inputType: "cssMeasure" }, (t) => /* @__PURE__ */ y(pF, M({}, t))).with({ inputType: "boolean" }, (t) => /* @__PURE__ */ y(fF, M({}, t))).with({ inputType: "list" }, (t) => /* @__PURE__ */ y(h8, M({}, t))).with({ inputType: "dropdown" }, (t) => /* @__PURE__ */ y(y8, M({}, t))).with({ inputType: "radio" }, (t) => /* @__PURE__ */ y(x8, M({}, t))).otherwise(({ inputType: t }) => /* @__PURE__ */ L("div", { children: [
    "I don't know how to render the input of type ",
    t,
    " yet! Sorry."
  ] }));
}
function T8(e, t) {
  if (e === void 0)
    return !0;
  if (t === "number")
    return typeof e == "number";
  if (t === "string")
    return typeof e == "string";
  if (t === "cssMeasure")
    return w3(e);
  if (t === "boolean")
    return typeof e == "boolean";
  if (t === "list")
    return p8(e);
  if (t === "dropdown" || t === "radio")
    return typeof e == "string";
  throw new Error("Unimplemented argument type check", t);
}
function QA(n) {
  var r = n, { onUpdate: e } = r, t = at(r, ["onUpdate"]);
  var d;
  const i = t.value === void 0, o = t.optional, a = Nr(t.name), l = (d = t.label) != null ? d : t.name, s = () => e({
    type: "UPDATE",
    value: t.defaultValue
  }), u = (p) => e({ type: "UPDATE", value: p }), c = () => e({ type: "REMOVE" });
  let f;
  return t.value === void 0 ? t.optional ? f = /* @__PURE__ */ y(_8, { labelledBy: a }) : f = /* @__PURE__ */ y(
    P8,
    {
      name: t.name,
      onReset: s
    }
  ) : T8(t.value, t.inputType) ? f = /* @__PURE__ */ y(
    O8,
    M({
      label: l,
      id: t.name,
      onChange: u
    }, t)
  ) : f = /* @__PURE__ */ y(I8, { name: t.name, onReset: s }), /* @__PURE__ */ L("div", { className: "SUE-SettingsInput", children: [
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
function I8({
  name: e,
  onReset: t
}) {
  return /* @__PURE__ */ L("div", { className: "mismatched-argument-types", children: [
    "Argument for ",
    e,
    " of unsupported type.",
    /* @__PURE__ */ y(
      mt,
      {
        style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
        onClick: t,
        children: "Reset"
      }
    )
  ] });
}
function P8({
  name: e,
  onReset: t
}) {
  return /* @__PURE__ */ L("div", { className: "missing-required-argument-message", children: [
    'Required argument "',
    e,
    '" not provided.',
    /* @__PURE__ */ y(
      mt,
      {
        style: { padding: "0.25rem 0.5rem", marginInline: "0.25rem" },
        onClick: t,
        children: "Reset"
      }
    )
  ] });
}
function _8({ labelledBy: e }) {
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
function N8({
  onCancel: e,
  onDone: t,
  existingAreaNames: n
}) {
  const r = `area${n.length}`, [i, o] = k.useState(r), [a, l] = k.useState(null), s = k.useCallback(
    (c) => {
      c && c.preventDefault();
      const f = D8({
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
    FA,
    {
      title: "Name new grid area",
      label: "New grid area naming modal",
      onConfirm: () => t(i),
      onCancel: e,
      children: [
        /* @__PURE__ */ y("form", { className: wr.portalForm, onSubmit: s, children: /* @__PURE__ */ L("div", { className: wr.portalFormInputs, children: [
          /* @__PURE__ */ y("span", { className: wr.infoText, children: "Name for grid area needs to be unique, start with a letter, and contain only letters and numbers." }),
          /* @__PURE__ */ y(
            QA,
            {
              label: "Name of new grid area",
              name: "New-Item-Name",
              inputType: "string",
              onUpdate: u,
              value: i,
              defaultValue: r
            }
          ),
          a ? /* @__PURE__ */ y("div", { className: wr.validationMsg, children: a }) : null
        ] }) }),
        /* @__PURE__ */ L("div", { className: wr.portalFormFooter, children: [
          /* @__PURE__ */ y(mt, { variant: "delete", onClick: e, children: "Cancel" }),
          /* @__PURE__ */ y(mt, { onClick: () => s(), children: "Done" })
        ] })
      ]
    }
  );
}
function D8({
  name: e,
  existingAreaNames: t
}) {
  return e === "" ? "A name is needed for the grid area" : t.includes(e) ? `You already have an item with the name "${e}", all names
  need to be unique.` : e.match(/^[^a-zA-Z]/g) ? "Valid item names need to start with a character." : e.match(/\s/g) ? "Spaces not allowed in grid area names" : e.match(/[^\w]/g) ? "Only letters and numbers allowed in area names" : null;
}
function R8(e) {
  const t = to();
  return k.useCallback(
    (r) => {
      t(
        TC({
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
function L8({
  layout: e,
  row_sizes: t,
  col_sizes: n,
  gap_size: r
}) {
  return e = hl(e), t = hl(t), n = hl(n), {
    layout: e,
    row_sizes: t,
    col_sizes: n,
    gap_size: r
  };
}
const F8 = "_container_1hvsg_1", M8 = {
  container: F8
}, KA = ({
  uiArguments: e,
  uiChildren: t,
  path: n,
  wrapperProps: r
}) => {
  const i = L8(e), o = Df(), w = Y4(i), { uniqueAreas: a } = w, l = at(w, ["uniqueAreas"]), { areas: s } = l, u = R8(n), c = k.useMemo(
    () => dg(s),
    [s]
  ), [f, d] = k.useState(null), p = (E) => {
    const { node: O, currentPath: b, pos: A } = E, T = b !== void 0, P = ph(O);
    if (T && P && "area" in O.uiArguments && O.uiArguments.area) {
      const _ = O.uiArguments.area;
      h({ type: "MOVE_ITEM", name: _, pos: A });
      return;
    }
    d(E);
  }, h = (E) => {
    u(pg(i, E));
  }, m = k.useCallback(
    (E) => {
      u(
        TE(E)
      );
    },
    [u]
  ), S = a.map((E) => /* @__PURE__ */ y(
    h3,
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
    if (ph(O)) {
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
      path: ar(n, (T = t == null ? void 0 : t.length) != null ? T : 0),
      node: O,
      currentPath: b
    }), h({
      type: "ADD_ITEM",
      name: E,
      pos: A
    }), d(null);
  };
  return /* @__PURE__ */ L(SE.Provider, { value: h, children: [
    /* @__PURE__ */ y(
      "div",
      Q(M({
        style: g,
        className: M8.container
      }, r), {
        draggable: !1,
        onDragStart: () => {
        },
        children: /* @__PURE__ */ L(
          QL,
          Q(M({}, l), {
            onNewLayout: m,
            children: [
              Z4(s).map(({ row: E, col: O }) => /* @__PURE__ */ y(
                XL,
                {
                  gridRow: E,
                  gridColumn: O,
                  onDroppedNode: p
                },
                l3({ row: E, col: O })
              )),
              t == null ? void 0 : t.map((E, O) => /* @__PURE__ */ y(
                no,
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
      N8,
      {
        info: f,
        onCancel: () => d(null),
        onDone: (E) => v(E, f),
        existingAreaNames: a
      }
    ) : null
  ] });
};
const B8 = ({
  uiArguments: e,
  uiChildren: t,
  path: n,
  wrapperProps: r
}) => /* @__PURE__ */ y(
  KA,
  {
    uiArguments: e,
    uiChildren: t,
    path: n,
    wrapperProps: r
  }
), U8 = {
  title: "Grid Container",
  UiComponent: B8,
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
  iconSrc: AE,
  category: "Tabs",
  stateUpdateSubscribers: {
    UPDATE_NODE: PE,
    DELETE_NODE: _E
  },
  description: "A general container for arranging items using `gridlayout`"
}, z8 = (e) => /* @__PURE__ */ y(KA, M({}, e)), W8 = {
  title: "Grid Page",
  UiComponent: z8,
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
    UPDATE_NODE: PE,
    DELETE_NODE: _E
  },
  category: "gridlayout"
};
var V0, G0;
let j8 = ((G0 = (V0 = import.meta) == null ? void 0 : V0.env) == null ? void 0 : G0.MODE) === "development";
const Y8 = 11, V8 = $8(
  sc(Y8).map((e) => j8 ? e + 1 : Math.random())
).map((e) => `${Math.round(e * 100)}%`);
function G8({
  title: e = /* @__PURE__ */ y("span", { children: "My Plot" })
}) {
  return /* @__PURE__ */ y("div", { className: "PlotPlaceholder", children: /* @__PURE__ */ L("div", { className: "plot", children: [
    /* @__PURE__ */ y("div", { className: "title", children: e }),
    /* @__PURE__ */ y("div", { className: "plot-body", children: V8.map((t, n) => /* @__PURE__ */ y(
      "div",
      {
        className: "bar",
        style: { "--value": t }
      },
      `${n}-${t}`
    )) })
  ] }) });
}
function $8(e) {
  let i = -1 / 0, o = 1 / 0;
  for (let s of e)
    i = Math.max(i, s), o = Math.min(o, s);
  const a = i - o;
  return e.map((s) => ((s - o) / a + 0.1) * 0.85);
}
const H8 = ({
  uiArguments: { outputId: e, width: t = "100%", height: n = "400px" },
  wrapperProps: r
}) => /* @__PURE__ */ y(
  "div",
  Q(M({
    className: "plotlyPlotlyOutput",
    style: { height: n, width: t }
  }, r), {
    children: /* @__PURE__ */ y(
      G8,
      {
        title: /* @__PURE__ */ L("span", { className: "title-bar", children: [
          /* @__PURE__ */ y(cf, { type: "output", name: e }),
          /* @__PURE__ */ y("span", { className: "plotly-name", children: "Plotly" })
        ] })
      }
    )
  })
), J8 = {
  title: "Plotly Plot",
  UiComponent: H8,
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
  iconSrc: fg,
  category: "Plotting",
  description: "Output for interactive `plotly` plots."
}, Q8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADKUlEQVR4nO3cMY5VVQDG8Q8QaFyACiWFvVqwiyERjHuQAoohbsAEKLTARRiCYtgGxsR6So0LgAYIeRR3bmKGZ0Hi5zl3+P2S17xM8eXkP/e9meKc2e12gf/a2dEDOJ2ERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUCIsKYVEhLCqERYWwqBAWFcKiQlhUfDB6wD8d/nS07+0LSQ6OX1eTfHL83vvmeZI/k/ye5JckvyZ5efKH7n115X+etd9UYe1xLcm9JHOc1lgfJvn0+PV1kqMkd5L8PHLUv5n1o/BckrtZDk1U+11J8ijLOZ0bvOUtsz6xvktyOHrERqzndGfoihNmfGJ9GVG9q8Ms5zaN2cK6kOT70SM26odM9EfNbGFdT3J59IiNupTkxugRq9nCOhg9YOMORg9YzRbWF6MHbNznowesZgvro9EDNu7j0QNWs4V1cfSAjfPlndNNWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4rZwno2esDGvXX7zCizhfX36AEbN835zRbWH6MHbNzT0QNWs4X1ePSAjXs8esBqtrAeZrm1jnf3V5bzm8JsYb1Mcnv0iI26leTF6BGr2cJKlt+6+6NHbMz9TPS0SuYMK0m+TfJg9IiN+DHLeU1l1rBeJ7mZ5Za6vVcpk6Ms94l9k+W8pjLrHaSrR0meZDnAa0k+y3LB2PmRowZ5leUL+m9ZruN+mIn+IXrSmd1uN3oDp9CsH4VsnLCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIiwphUSEsKoRFhbCoEBYVwqJCWFQIi4o3LCE7MROKhbQAAAAASUVORK5CYII=";
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
const K8 = "_container_tyghz_1", X8 = {
  container: K8
}, q8 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const { label: n = "My Action Button", width: r } = e;
  return /* @__PURE__ */ y("div", Q(M({ className: X8.container }, t), { children: /* @__PURE__ */ y(mt, { style: r ? { width: r } : void 0, children: n }) }));
}, Z8 = {
  title: "Action Button",
  UiComponent: q8,
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
  iconSrc: Q8,
  category: "Inputs",
  description: "Creates an action button whose value is initially zero, and increments by one each time it is pressed."
}, eM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFS0lEQVR4nO3cz2vTdxzH8Vfb9VeIa7ta1FW2FqQ6pqLbEERhm0OGFzcPY0dhl+LFo4cd9gfsuIs77LDbkAljDqEiCoKszMMEcbqFsjm2OaW6ptClP2zNDvkms2n6I99vXqTp5/mAQJKmn3wPT76fJCTvpnw+L6DWmut9ANiYCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFs/V+wDq5cy5seX+1BNd4piILkt8+uGOmEs2pmDDKrNL0ilJ70h6NeFaP0m6IumspJ8TrtWw2AqlYUl3JJ1W8qgUrXE6WnO4Bus1pNDPWCclff7sHZ1tzepsa4m12PTcgqbnnhZvNkVrz0r6Mv4hNqaQw+pTYbuSJA1s7tB7r/Wpv6c90aJ/Tczq2x/Hde/RTPGus5IuShpPtHCDCXkrPCWpU5K297Rr+O3+xFFJUn+01vYXSmt1RM8VlJDDOly8cmxvr1qam2q2cEtzk47t6a34XKEIeSs8VLwy0NeZaKHRTFaX7xQ+ZRh+60Vt6W4vX/NQxX/cwEIOK1W80toS/2x18ea4rmUmlW5vKUVVYc1UxX/ewELeChMbzWR1LTMpSTp5aGspKhBWbJO5J/rm5iNJ0on9m/Vywu10oyGsmL76/oEk6cBAWgeHuut7MOsQYcUwmsnq18ezSre36Ojid3+IEFaVJnNPSu8Aj+/rVVeqtc5HtD4RVpWu/5LV1OyCdm9Lad/A8/U+nHWLsKrwMDtbehf47l62wJUQVhUu3XosSXpzqIuPFlZBWBWMZrI6c25M5394ULrv9/Fp3f47J0k6vLO7TkfWOAirzMyTp6XPp27cmyrFdfvPKUmFsxUv2FdHWGU6Wpv10eGtpds37k0t+oT9jUFesK8FYVWwqz+tE/s3l24Xz2C7t6V4bbVGhLWMg0PdOjCQXnTf3pfSyzwa5UIO65/ildzcQsUHHN3Tq3R74WvKWza1VvW51TNfUZaW+eXORhby12auSzouSXfv5/T6wKYlD+hKteqT9wdjLX7n/r/lzxWUkM9Y3xWvjNx6rGxuvmYLZ3PzGok+84pcqNniDSLkM9YXkj6WNDg5Pa/PLv+hI6/0aMeWlNpifvFvbiGvsYc5Xb07oamZ0vb6W/RcQQk5LKnwI4cRSZqaWdCF6N2f4TmCE/JWKEmXVPj1c8awdiZa+5Jh7XUv9DOWJF2VtFPSB5KOqPCLmrjfUc+p8EL9iqTzNTm6BkVY//s6uqAGQt8KYUJYsCAsWBAWLHjxvpRlol9oCKuAiX41xlbIRD+L0M9YTPQzCTksJvoZhbwVMtHPKOSwmOhnFPJWyEQ/o5DDYqKfUchbYWJM9FseYcXERL+VEVZMTPRbGWHFwES/1RFWlZjotzaEVSUm+q0NYVWBiX5rR1hVYKLf2hFWBUz0S46wyjDRrzYIqwwT/WqDsCpgol9yhLUMJvolE3JYTPQzCvlrM0z0Mwr5jMVEP6OQz1hM9DMKOSyJiX42IW+FEhP9bEI/Y0lM9LNoyufz9T4GbEChb4UwISxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLAgLFoQFC8KCBWHBgrBgQViwICxYEBYsCAsWhAULwoIFYcGCsGBBWLAgLFgQFiwICxaEBQvCggVhwYKwYEFYsCAsWBAWLP4DpWmTqmVmpDwAAAAASUVORK5CYII=", tM = "_container_162lp_1", nM = "_checkbox_162lp_14", Kd = {
  container: tM,
  checkbox: nM
}, rM = ({ uiArguments: e, wrapperProps: t }) => {
  const n = e.choices;
  return /* @__PURE__ */ L(
    "div",
    Q(M({
      className: Kd.container,
      style: { width: e.width }
    }, t), {
      children: [
        /* @__PURE__ */ y("label", { children: e.label }),
        /* @__PURE__ */ y("div", { children: Object.keys(n).map((r, i) => /* @__PURE__ */ y("div", { className: Kd.radio, children: /* @__PURE__ */ L("label", { className: Kd.checkbox, children: [
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
}, iM = {
  title: "Checkbox Group",
  UiComponent: rM,
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
  iconSrc: eM,
  category: "Inputs",
  description: "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values."
}, oM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAG+ElEQVR4nO3c228UZRyH8aeFCqULtW6lxW5FTWMqlNbKKZwC0RusxqRqrBrhRmNCNHphQuK/0CtjNEQDN5CYcFUSVGK8gUAgIlKtFRXRSFoKLW26pSeWbbte7HaZPfRk99fDu99P0oSZvrszLU9mZqe7b04kEkEk03LnewfETQpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0wsne8dsHTw+LXpDKsGdgK7gG3AI0DeDDc1CLQBPwNngXNAy1QPamyomOFmFg+nw5rC28C7wJYMPFcBUBn7ej227iLwJXAkA8+/6GRjWMXAIeBV4+1siX09DxwAbhtvb0HJmmus2GlnH9CMfVRerwCXgX2NDRVOn/68suaIdfD4tX3A0eT1S3JzqCorYH2ggLX+5azKX8qS3JwZPfe9kTGCQyN0BEO0tg/y241BRsci3iEB4OjB49dobKg4NqsfZJHIiUQiU49apDwX7yXAJaL/wXFVgQJeqCnG75vptfrkegbCfPNLD63tA8nfagc2AZ3g9sV7tpwKD+GJKjcH6mr87N+xJuNRAfh9eezfUUpdjZ+kg18gti/Oy4aw3gPqvSv2VvvZU1lkvuE9lUXsrfYnr64H3jff+DzLhrD2exc2lPvmJKpxeyqL2FDuS169b852YJ64HtZGPPepluTm8NLTxXO+Ey/VFie/INhC9FrLWa6/KtzpXagu91G4IrM/ct9QmCvtg5y/1kdnf5j62mK2PflgwpjC/KXUlPu4fL0/ed8uZXRnFhDXj1i7vAtVZQUZffK+oTCHT3fQ1Nw9YVTj1gdStr0r3ThXuB7WZu9C4KHlGXviu+ExDp/uoLM/DMDe9UUTRgUQKErZttOnQtfDKvUurMxfkrEn/vpyVzyqLY/5eLYq5dVfglWp216TsZ1ZgFwP6wHvwtIZ3lGfyIWrQS7+G735WbIyjxefWT3lY9Lczc/8DbQFxPWwMq4zGKKpuTu+/Nb2Upbn6deYTL+RGWq61BX/d31tMSUPLpvHvVm4FNYMXLga5J+eEABP+JdNerGe7RTWNPUNhfn+Sm98+Y3tpZOMFoU1Tef+DDIQGgWip8DCFU5fe8+awpqG67eHOXO1D4i+CtQpcGoKaxrO/H7/FPjcurn7A/Zi5vrfCqelMxii6VIX//SEeHPrap5+bFX8e9dvD9N6cwiAqjUrEr4nE1NYwBenO+LXT1/90MXwvbH46c57tNr9lI5W06VTIbBuTX7CclNzN53BUMrRau3D+ekeLmnoiAW8urWU7v62+D0qgO9aehLGVD+a8mY9mYTrR6yETzOERsYmHPjG9lJ8y+7/obj15lD8aFWyMm/W11ZJn9oBCM/qCRc418O66V24Mzw64cDCFXm8tvnhtN/bXlE46x1Js+2b6ca5wvWwEuZPuBUMTTQOgMoyH7ufTI2o9vHZvxJs772bvMrZd4+C+2Gd9S603hic8gHPVfkpWXn/rnp9bXFG3r3wW3vKts+mG+cK1y/ez3kXWtoGqKv2T/q+9+V5uXxUtzajO9E3PEJLW8qHV8+lG+sK149YPxGd9QWIXkCf/Ll7kuE2TjZ3M5J48f4jOhUuegnzNbS0DXDmj96JxmbcmT960x2tUuaQcE02hPU5cMK74lRLD+f/6jPf8Pm/+jiVdD8sti+fmW98nrl+jTXuANFP7JQBjEXgxOXb/N01TF2N32RSkG9bevg19Uh1I7YvzsuWsG4BH5N0Cvq1fYArHYNUl/uoChQQKFr2v6YxGh2LcGd4hPbe6DRGLW0D6W6IAnzc2FBxa5pTWC5q2RIWjQ0Vx2L/oZ8AD42vHx2L0Hy9n+bETylnWi/wYbbMjQXZMz+WVxnwKfDyHO1GE/AB0bmxEmh+LLfcIDp94zt4bkUYuBjbxsukicp1WXMqTONI7GsT96fj3sj/m447DHQQvW82Ph230/eppuL0qVDmTzaeCmUOKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMfEfzGeLdlIh8u4AAAAASUVORK5CYII=", aM = "_container_1x0tz_1", lM = "_label_1x0tz_10", N0 = {
  container: aM,
  label: lM
}, sM = ({
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
      className: N0.container + " shiny::checkbox",
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
        /* @__PURE__ */ y("span", { className: N0.label, children: r.label })
      ] })
    })
  );
}, uM = {
  title: "Checkbox Input",
  UiComponent: sM,
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
  iconSrc: oM,
  category: "Inputs",
  description: "Create a checkbox that can be used to specify logical values."
}, cM = ["shiny::tabPanel"];
function Fg(e) {
  return cM.includes(e.uiName);
}
function Mg(e) {
  return Fg(e) ? e.uiArguments.title : null;
}
function qA({ uiChildren: e }) {
  let t = [];
  return e == null || e.forEach((n) => {
    const r = Mg(n);
    r && t.push(r);
  }), t;
}
function ZA({ uiChildren: e }) {
  var n;
  const t = e == null ? void 0 : e[0];
  return t && (n = Mg(t)) != null ? n : "First Tab";
}
const fM = "_container_10z2l_1", dM = {
  container: fM
};
function eC(r) {
  var i = r, { title: e, children: t } = i, n = at(i, ["title", "children"]);
  return /* @__PURE__ */ y(
    "div",
    Q(M({
      className: dM.container,
      "data-tab-id": e,
      "aria-label": `tab panel ${e}`
    }, n), {
      children: t
    })
  );
}
function pM(e) {
  return typeof e == "function";
}
function hM(e, t) {
  return pM(e) ? e(t) : e;
}
function tC(e, t) {
  let n = {};
  for (let r in e) {
    const i = e[r];
    n[r] = hM(i, t);
  }
  return n;
}
function mM(e, t) {
  let n = {};
  for (let r in e) {
    const i = e[r];
    n[r] = tC(i, t);
  }
  return n;
}
function nC(e, t) {
  let n = {};
  for (let r in e) {
    const i = e[r], o = "optional" in i, a = "useDefaultIfOptional" in i && i.useDefaultIfOptional;
    o && !a || "defaultValue" in i && (n[r] = tC(
      e[r],
      t
    ).defaultValue);
  }
  return n;
}
const gM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADSklEQVR4nO3cv0vUYQDH8c/pmWfpmV1G0uAPjAqiyYqWoK1oDKq5PdqE9qaG/ozAKWjpL4jWoKayrcWtIgqiuAYd9LQo8u3zfO39ghvux/C54y3PV9Br9fv9SLttqPQA7U+GJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlRLv0gF9ZXlkdfGg6yf0k15PMJhnd6007+JrkXZInSR4l+bD5yYe3FgtMqkO1YQ1YSvIsydHSQwaMJTm7cbuT5FqSV0UXVaIJR2EvydPUF9WgE1nfOVl6SA2aENa9JDOlR/yhuSR3S4+oQROOwhs7PTjb6+TS4mTmp8cy0RlOe7iFD/n+o5+PX7/n7dqXPH/zMWufvu30sttJHuBjKteEsLZdAV85M5Vr53p7PqQ93EpvfCS98ckszXfz+MVaXr//PPiy//eKfZMmHIUHNt+ZO9rJ1QJRDWoPtXLzwrF0x7b9bNbw22pxTQhri/ML3fCH3p/pjAzl4kK39IwqNS6s2V6n9IQtTh4/WHpClRoX1pHxkdITtpieqGtPLRoXVnuoloNw3ehI4z7CPeGn8o9qC70WhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCVHFP6zu8M0y+0Lp91Xy226qCCtJv/SAXVbL+yn2B/kehUIYlhCGJUQt11i/uxaYunzqcPf0zKGFjfuf9mLQ39i4SP6xvLL6svCUarT6/VquM7WfeBQKYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQhiWEIYlhGEJYVhCGJYQhiWEYQlhWEIYlhCGJYRhCWFYQvwEAzs9K42yqRkAAAAASUVORK5CYII=";
function vM(e, {
  dropFilters: t = { rejectedNodes: [] },
  positionInChildren: n,
  parentPath: r,
  onDrop: i,
  processDropped: o = (a) => a
}) {
  const a = Df(), l = k.useCallback(
    ({ node: u, currentPath: c }) => yM(t, u) && bE({
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
          path: ar(r, n)
        });
      } else
        i(u);
    },
    [i, r, a, n, o]
  );
  pf({
    watcherRef: e,
    getCanAcceptDrop: l,
    onDrop: s
  });
}
function yM(e, t) {
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
function rC(r) {
  var i = r, { children: e, dropArgs: t } = i, n = at(i, ["children", "dropArgs"]);
  const o = k.useRef(null);
  return vM(o, t), /* @__PURE__ */ y("div", Q(M({ ref: o }, n), { children: e }));
}
function wM({
  uiChildren: e,
  parentPath: t
}) {
  return /* @__PURE__ */ y(et, { children: e.map((n, r) => {
    const i = ar(t, r);
    return /* @__PURE__ */ y(
      no,
      {
        path: i,
        node: n
      },
      ff(i)
    );
  }) });
}
const bM = "_container_fe3r8_1", SM = "_emptyTabPanelDropDetector_fe3r8_8", D0 = {
  container: bM,
  emptyTabPanelDropDetector: SM
}, iC = [
  "shiny::navbarPage",
  "shiny::tabPanel",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot",
  "gridlayout::grid_card_text"
], EM = {
  rejectedNodes: iC
}, AM = ({
  uiArguments: e,
  uiChildren: t,
  path: n,
  wrapperProps: r
}) => {
  const i = t && t.length > 0;
  return /* @__PURE__ */ y("div", Q(M({ className: D0.container }, r), { children: i ? /* @__PURE__ */ y(wM, { uiChildren: t, parentPath: n }) : /* @__PURE__ */ y(
    rC,
    {
      className: D0.emptyTabPanelDropDetector,
      dropArgs: {
        dropFilters: EM,
        positionInChildren: 0,
        parentPath: n,
        onDrop: "add-node"
      }
    }
  ) }));
}, oC = {
  title: "Tab Panel",
  UiComponent: AM,
  settingsInfo: {
    title: {
      label: "Title of panel",
      inputType: "string",
      defaultValue: "My Shiny App"
    }
  },
  acceptsChildren: !0,
  iconSrc: gM,
  category: "Tabs",
  description: "Panel containing content for tab-based interfaces like navbar pages"
};
function aC(e) {
  return Fg(e) ? e : Q(M({}, lC), {
    uiChildren: [e]
  });
}
const lC = {
  uiName: "shiny::tabPanel",
  uiArguments: nC(oC.settingsInfo),
  uiChildren: []
};
function Es(e) {
  return typeof e == "object" && e !== null;
}
function Bg(e) {
  return Es(e) && "uiName" in e && typeof e.uiName == "string" && e.uiName in on;
}
function CM(e, t) {
  return !e || !t ? !1 : pa(e, t);
}
const xM = "_container_qbb7e_1", kM = "_header_qbb7e_13", OM = "_tabContents_qbb7e_21", TM = "_pageTitle_qbb7e_26", IM = "_tabHolder_qbb7e_39", PM = "_tab_qbb7e_21", _M = "_newTabDropDetector_qbb7e_99", NM = "_addTabButton_qbb7e_104", DM = "_tabDropDetector_qbb7e_112", vr = {
  container: xM,
  header: kM,
  tabContents: OM,
  pageTitle: TM,
  tabHolder: IM,
  tab: PM,
  newTabDropDetector: _M,
  addTabButton: NM,
  tabDropDetector: DM
}, RM = {
  uiName: "unknownUiFunction",
  uiArguments: {
    text: "Dummy ui node for app previews"
  }
};
function LM(e) {
  const t = fa((r) => r.app_info);
  return k.useMemo(() => Bg(t) ? wi(t, e) : RM, [e, t]);
}
const FM = ({ name: e, isActive: t, index: n, parentPath: r }) => {
  const i = ar(r, n), [o] = sg(), a = LM(i), l = yE(a, i), s = CM(i, o);
  return /* @__PURE__ */ y(
    "div",
    Q(M({
      className: vr.tab,
      "data-active-tab": t,
      "data-selected-tab": s
    }, l), {
      style: { order: n },
      "aria-label": t ? `Active tab ${e}` : `Select ${e} tab`,
      children: e
    })
  );
}, MM = {
  rejectedNodes: iC.filter(
    (e) => e !== "shiny::tabPanel"
  )
};
function R0({
  index: e,
  parentPath: t,
  children: n,
  baseWidth: r
}) {
  return /* @__PURE__ */ y(
    rC,
    {
      className: vr.tabDropDetector,
      "aria-label": "tab drop detector",
      dropArgs: {
        parentPath: t,
        onDrop: "add-node",
        positionInChildren: e,
        processDropped: aC,
        dropFilters: MM
      },
      style: {
        "--baseWidth": r,
        order: e - 1
      },
      children: n
    }
  );
}
function BM(e, t = 0) {
  const [n, r] = k.useState(t);
  return k.useEffect(() => {
    e <= n && r(e - 1);
  }, [n, e]), { activeTab: n, setActiveTab: (o) => {
    r(o);
  } };
}
function sC(o) {
  var a = o, {
    path: e,
    title: t,
    children: n,
    className: r = ""
  } = a, i = at(a, [
    "path",
    "title",
    "children",
    "className"
  ]);
  const l = UM(n), s = l.length, u = Y_(), { activeTab: c, setActiveTab: f } = BM(l.length), d = Df(), p = (h) => {
    d({
      node: h ? aC(h) : lC,
      path: ar(e, s)
    });
  };
  return k.useEffect(() => {
    const h = ar(e, c);
    if (!u)
      return;
    Ui(u) >= Ui(h) && f(u[Ui(h) - 1]);
  }, [c, e, u, f]), /* @__PURE__ */ L("div", Q(M({ className: Vt(r, vr.container) }, i), { children: [
    /* @__PURE__ */ L("div", { className: vr.header, children: [
      /* @__PURE__ */ y("h1", { className: vr.pageTitle, children: t }),
      /* @__PURE__ */ L("div", { className: vr.tabHolder, "aria-label": "tabs container", children: [
        l.map((h, m) => /* @__PURE__ */ y(
          FM,
          {
            name: h,
            parentPath: e,
            isActive: m === c,
            index: m
          },
          h + m
        )),
        sc(s).map((h) => /* @__PURE__ */ y(
          R0,
          {
            parentPath: e,
            index: h,
            baseWidth: "10px"
          },
          h
        )),
        /* @__PURE__ */ y(
          R0,
          {
            parentPath: e,
            index: s,
            baseWidth: "25px",
            children: /* @__PURE__ */ y(
              jM,
              {
                className: vr.addTabButton,
                label: "Add new tab",
                onClick: (h) => {
                  h.stopPropagation(), p();
                }
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ y("div", { className: vr.tabContents, children: zM(n, c) })
  ] }));
}
function UM(e) {
  let t = [];
  return k.Children.forEach(e, (n) => {
    if (!k.isValidElement(n))
      return null;
    const r = n.props.title;
    typeof r == "string" && t.push(r);
  }), t;
}
function zM(e, t) {
  return k.Children.map(e, (n, r) => k.isValidElement(n) && typeof n.props.title == "string" ? /* @__PURE__ */ y("div", { className: vr.tabContents, "data-active-tab": r === t, children: n }) : n);
}
const WM = {
  display: "block"
};
function jM({
  label: e,
  onClick: t,
  className: n
}) {
  return /* @__PURE__ */ y(
    xA,
    {
      className: n,
      placement: "bottom",
      "aria-label": e,
      popoverContent: e,
      onClick: t,
      openDelayMs: 0,
      children: /* @__PURE__ */ y(mg, { style: WM })
    }
  );
}
const YM = "_noTabsMessage_130qz_1", uC = {
  noTabsMessage: YM
}, VM = ({
  uiArguments: { title: e },
  uiChildren: t,
  path: n,
  wrapperProps: r
}) => {
  var a;
  const o = ((a = t == null ? void 0 : t.length) != null ? a : 0) > 0;
  return /* @__PURE__ */ y(
    sC,
    Q(M({
      path: n,
      title: e,
      className: uC.container
    }, r), {
      children: t ? t.map((l, s) => {
        const u = ar(n, s), c = Fg(l) ? l.uiArguments.title : "unknown tab";
        return /* @__PURE__ */ y(eC, { title: c, children: /* @__PURE__ */ y(no, { path: u, node: l }) }, ff(u));
      }) : /* @__PURE__ */ y(GM, { hasChildren: o })
    })
  );
};
function GM({ hasChildren: e }) {
  return e ? null : /* @__PURE__ */ y("div", { className: uC.noTabsMessage, children: /* @__PURE__ */ y("span", { children: "Empty page. Drag elements or Tab Panel on to add content" }) });
}
const $M = {
  title: "Navbar Page",
  UiComponent: VM,
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
      defaultValue: (e) => e ? ZA(e) : "First Tab",
      choices: (e) => e ? qA(e) : ["First Tab"]
    }
  },
  acceptsChildren: !0,
  // iconSrc: icon,
  category: "layouts",
  description: "Layout an app with tab-based navigation"
}, HM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHvUlEQVR4nO3bXWxUaR3H8W9fpqWlMCXdbl+gCyvNRtkmLrAuFKQa3FUTEyuJ2iwhGKmJJmq80PTKeGdMmnij7h3UhOzS1Kgb8IYNWaIFW3aVLtGCbFMbWNvOlG7pDC1T5qUzXkxn6Htnuv0zZ4bfJ+GC01P65PCd5zx95kxeLBZDZKPlZ3oAkpsUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYqIw0wMAaOsaXHxoH/A6cAR4ESh70mNyuGngJnAF6AT65n+xvaU+E2NawBFhweOL0dY1eBpozexoHK8MODD352fAmfaW+u/Bsi/SjHBMWABtXYPnga8X5OfRWO/mpefKqHYXUVSoO/Z8oUgUrz/EjY+m6R30MxuNtbZ1DVa2t9Q3Z3psCXmxWCzTY0i8yk4Dre6SQr7bVENteXGGR5UdRn1Bft/twT8TAegAWp1wK3TKVLAXaC3Iz1NUaaotL+ZUUw2F+XkAp4hfy4xzSljHAQ7u3qqo1qGmvJgDu7cm/no8k2NJcEpYRwD27tyS6XFkrXnX7kgmx5HglMX7PoDt29KbrW7cecC59+5x6vPVfHr70h2J2yPTvP/fB/R7AsljX3jBzZcaKtjkWvia8gfCXPr3BO/fmU4e++qL2zjaUJHWmDZC76AfgMZ6d8rfU/v42jniVuiUsFwABfF1Qsquzf0HLCcR3WJ/G/Bz2xPgh6/VJePyB8Kc/usoY1PhBedevDnJgDfAD16tS2tcn8StkYec7xsHwF1SyJ7tm1P6vsLH167IZmTpcUpYaRnzBXnnXxMMTQRXPOfdW5PAwllnzBfkzR4vY1Nhej6cTB6/+qGPsakwDTWlfLuxmk2u/OS5QxNBbtx5wEu7tq74szaK1x/i3LUxonO/qJ+7NsaPXt1BtdsRraTFKWuslDwKR2nrGuTX7/xvwe1tsbvjM8lQ5t/KqsqL+dpn438f8D7+/ut347e/5pcrk7NYVXkxh+ZuRfenF85kFvyBCGe6RwlFosljoUiUM92j+AMR85+/0bJyxoL4WmliKrxsYDsrS1Z8W2PbZteSY7/4xvOr/qySooL1DTJF4dkYHVeWDygR3I9fq8NVkN5SIZOyKqxNrvwFwfzxPW/a/8ajcHxGqKvYtOp5t0em6Rn0U1ZcwJ4dqa1z1iMag7d6vXh8oRXP8fpDvNXr5eThGtJchmZMVoW1Ef4xFF/wv/z88mumy/0TXLwZX599qqKYE4eqcZcuneU2yvm+cW6NPFzzvMSi/tj+SrOxbKSnKqzL/fHthGN7n6EqhY3YoYkgb//zHq8bxnVsf2XWxJKOpyasxEx0bO8zNL5QvuJ5RxsqONpQwaNwlD/0eun3BOjs8T7RLYdckFW/Fa7X2e5RLt6c5PiBZ1eNar5NrnxONtVStcXF0ESQu+MztoPMMTk9Y/kDYTp7vNybjqy4O7+WyjIXY1NhZkKzBiOEt6+PJ3fa19JY786a22bOhpXYTX8YivL9L9auuKbyB8L88i93KSsuWHbbYXxuD8tqy6F5XyX+mciaC/g92zfTvC87ooIcvhV2zu2wf+dw9aoLdXepi6otLqaDs5ztHk1uRzwKRznbHX+bp2qLi52VJSbjzM+D4werVt1dr3YXcfxgVdZsNUCOzli9A77k2z1vXB5Z9pz5M9Q3P/csb1weod8ToP/PQ0vOO3Go2nS8RYX5tDbV8rt3h5dskrpLC2ltqs26p2iza7QpGpl8lNb5OytL+OlX6nhl18I12Cu7yvjJl3ektDXxSSUCmr+77irI49SRWtyl2ff6d8qjySHA9atv7U77CYdcc2vkIWf/7gHg5OGalJ9uCEWi/PxPQwDT7S31GX+wzSkvhT7gwMhkkOfWeKsl181fpKcaFcTf9plzc+NHlT6n3AqvANz4aHqt854KjfXutB7ygwXX7sqGD2gdnBJWJ8Qf3PP4Vn7GSpbn8YXmP/TYmcmxJDglrD6gIxKN0dHtYVRxpczjC9LRPUok/nRgB4s+FZ0pTgmL9pb6VuCCfybCby8Nc+GDjxm+H1zw4JvEhSJRhu8HufDBx/zm0nDiM4UX5q6hIzhl8Q5Ae0t9c1vX4OnZaKz16oCPqwO+TA8pWyQ/Yu8UTtluWHxoP3CC+EeZPgOUPukxOVwA+A/xhfqbwPX5X3TCJ6EdEZbkHsessSS3KCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMTE/wELMTAByexCJAAAAABJRU5ErkJggg==";
function cC({
  label: e,
  children: t
}) {
  return /* @__PURE__ */ L("div", { className: "LabeledInputCategory", children: [
    /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: e }) }),
    /* @__PURE__ */ y("section", { className: "grouped-inputs", children: t }),
    /* @__PURE__ */ y("div", { className: "divider-line" })
  ] });
}
const JM = "_container_yicbr_1", QM = {
  container: JM
}, KM = ({
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
      className: Vt(QM.container, "shiny::numericInput"),
      style: { width: r }
    }, t), {
      children: [
        /* @__PURE__ */ y("span", { children: n.label }),
        /* @__PURE__ */ y(
          If,
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
}, XM = {
  title: "Numeric Input",
  UiComponent: KM,
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
  settingsFormRender: ({ inputs: e }) => /* @__PURE__ */ L(et, { children: [
    e.inputId,
    e.label,
    /* @__PURE__ */ L(cC, { label: "Values", children: [
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
  iconSrc: HM,
  category: "Inputs",
  description: "An input control for entry of numeric values"
}, qM = ({
  uiArguments: { outputId: e, width: t = "300px", height: n = "200px" },
  wrapperProps: r
}) => /* @__PURE__ */ y(
  "div",
  Q(M({
    className: hh.container,
    style: { height: n, width: t }
  }, r), {
    children: /* @__PURE__ */ y(EE, { outputId: e })
  })
), ZM = {
  title: "Plot Output",
  UiComponent: qM,
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
  iconSrc: fg,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page."
}, e7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHz0lEQVR4nO3dT2yTBRjH8V+7UsbW/TGwMhyrQSsSEAcHTGDjwEkx6o00JCQm/jmY6ElTInIzojZ6UuJBD5oYtdGLEsbFOKMsGj1Ig7iANboNcIzKimvHtnath/d967v37boW+8C25/dJyLr+ebsuX/q2fd/3madYLIKo3ry3+weglYlhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCTCd7t/gNshGk9We9U+APvMr1sBdADIAbgIYBjAaQDfmF8XFYuEa/xJly+VYS3CA+BZAIcBhMpcvhrAFvPfQ+Z5lwAcA/AuAP4NGSgPy/kMEo0nHwPwDsoHVUkXgOMwYnw+Fgl/6bxCDc+SK4LqsOyi8eQRAK/az2tv8mHnXS24J7gG61v9aG5sQKFQRHoqj/RUHr+P30BiJINr2Zx1kxCAL6Lx5LFYJPzyrX4MSwnDAhCNJ98D8LT1fXuTD4/0rMUD3S3wehxX9noQbPUj2OrH5s4mPLx9LRKjk+hP/I30VN661pFoPNkZi4SfulWPYalR/64wGk++AltUW7ua8cL+EHaEykRVhscD7Ai14EXzNjZPmstWSXVY0XjycQBHre/7Nrfjid4NWO2r/dfi93lxcPd67L2v3X72UfM+1FEdFoC3rRM9oQAe27kOniqepRbiAfDojnXoCQXm3Uc0nlT3e9b8GutZmO/+2pt8OLAriHJNZWfm8O35NIYuZ5GaNF6kd7T6sa2rGb33tqF5dcO863sAHNgVxHBq2nrNFTLv67jgY1ly1P1PsnnJOrH/gbXwl1n9nb2YwRsnhzEwNIGx67PIF4rIF4r4Kz2Dr85dwxsnh3H2YsZ1O7/Pi0d61tnPOizxAJYyrWH1AugGgDuafc4X3QCMqD4aHMN0rrDgQqZzBXw0OFY2rp7uAO5oLq0Qus37VENrWPusEz2hFtfrquzMHD77cbyqj9CLAD77cRyZ6bl553s8xrLL3acGWsPqs06Eg2tcFw7+dr3iM5XTdK6A7y6kXec7lt3nusIKpjWs+60T69v8rgvPXcrWvMChy+7bOJZ9v+sKK5jWsEqvrJ3v6gDg6j+zNS/w6mTOdV5g/rI7al7oMqY1rLprqOZjekW0hpWyTmRn5lwXdrS6V4+LWRtwfySYmb/sqzUvdBnTGtY568SV6+7V3rau5poXuGWD+zaOZf9S80KXMa1hlfb4TI7fcF24J9yGxlXV/2oaV3mxd3O763zHsqvay3Sl0BrW19aJxEgGRccHVoHGBhx4sPwmHicPgAMPBhFonP8moFg0lm0zcNM/7TKkNaxBGPutYyKbQ2LU/cn59o0BHNrTWXFPh9U+Lw71dmL7xoDrssRoBhP/7QB40bxPNTRvhH4dxm7I6E+ksPXOJtf2wu3dAdwdXFPaCH11MocGrwcdLauwZUMz+ja7N0IDwGy+gP5Eyn7W64KPY0nyFJ3rAQXM/c+9AP6AuYfDjlAAB3d3VrX6q6QI4JPvx3Dmv9XgCIBNAAqajtLRuioEgAKA561vzoxkcOLnlOv1Vi2KAE6eSdmjAoyDK6rfPrRCaA4L5tE0pQMoTl9I48PBvzCTr72D2XwBn/5wBd+eT9vPfrXcETsaqA4LAGKR8FEA71vf/3opi7dOjeBMmXeL5RSLxrPdm6dG8PPwpP2iD8xlq6T5xXtJLBJ+JhpP/gHz2Ss9lcfH34+hP2E7/KvNX9r2l5mZw5Xrs8bhX6MZXMu4thO+FouEj9zaR7G0MCxTLBI+Fo0nz8J2wGp6Ko+BoQkMDE1Uu5gRLHDAqjbqV4V2sUj4BIx3cM/BiKRal83bbGJUBj5jOZjv4I4DOB6NJ+1DQbYBCJpXG4exvfE0gIFYJKxqc001GFYFZjCM5iZwVUgiGBaJYFgkgmGRCIZFIviusALHxw0LziDlxw1uDMshGk/WPIM0Gk+WZpDGImF9+yGVwVWhjTmD9E8YH5DWMofUmkH6p9Z5WE58xjJxBml9MSxwBqkE9atCziCVoTosziCVozoscAapGHUP2KaqGaS1smaQtjeVXr5aM0hV0RzWojNIbxZnkOoNa9EZpP8XZ5DqVHEGaT1wBqlOFWeQ1gtnkOpTcQZpvXAGqT4VZ5DWC2eQEtWZ1rAqziCtF84g1afiDNJ64QxSfSrOIK0XziDVp+IM0nrgDFKdFp1B+n9pn0GqNSzANhe0P5HC7E0MW1sIZ5DqDutdmBNl0lN5fP5TdX9GbjFFAJ//NG7fm3TEvC9VNIfFGaSCNIfFGaSCVIcFcAapFB6lA84glcCwTJxBWl+a/zLFQrww9lGPovqjoS/DPMQexpuCsjT9ZQo+Y7mVZpDC2Dlv0RmkULa5phoqn7FInvp3hSSDYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgkgmGRCIZFIhgWiWBYJIJhkQiGRSIYFolgWCSCYZEIhkUiGBaJYFgk4l83+MTmnohKqwAAAABJRU5ErkJggg==", t7 = "_container_sgn7c_1", L0 = {
  container: t7
}, n7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const n = e.choices, r = Object.keys(n), i = Object.values(n), [o, a] = k.useState(i[0]);
  return k.useEffect(() => {
    i.includes(o) || a(i[0]);
  }, [o, i]), /* @__PURE__ */ L(
    "div",
    Q(M({
      className: L0.container,
      style: { width: e.width }
    }, t), {
      children: [
        /* @__PURE__ */ y("label", { children: e.label }),
        /* @__PURE__ */ y("div", { children: i.map((l, s) => /* @__PURE__ */ y("div", { className: L0.radio, children: /* @__PURE__ */ L("label", { children: [
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
}, r7 = {
  title: "Radio Buttons",
  UiComponent: n7,
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
  iconSrc: e7,
  category: "Inputs",
  description: "Create a set of radio buttons used to select an item from a list."
}, i7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAHmUlEQVR4nO3b329T5x3H8Xec2Akm4GRZlB+sbbZ6rVboRKACwgattKFVqtQIaVo0Wk1bM6kX6+WUP2CXuVy3CyTIpGotCprGoJo0KVtFA1rY1CZoM5mUWSu0wXYWQmxIHPwj9i5MEpskrTPyzTmGz0viwvbx0ZPD2+d5fGxX5fN5RDabx+kByKNJYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSZqnB7Akr7B8IN37QN+CBwBdgP1Wz0ml5sDrgGXgDPAaPGD/T1BJ8a0zDVhwcrB6BsMnwJ6nR2N69UDB+//+zlwur8n+FNY80W65VwVFkDfYPg88Gq1p4quYIC9T9bTGvDhq9GsXSydzRFLpLn66Rwj4QSLuXxv32C4ub8n2O302ACq8vm802MAll9lp4DewLYafnK0jfaGWodHVRki8RS/GY6SWMgCDAC9Tk+FbjoNdAK91Z4qRbVB7Q21vHG0jRpPFcAbFI6lo9wU1gmAQ0/vVFT/h7aGWg4+vXPp5gknxwLuCusIQOdTOzZth7/4wyf0DYa5l8lt2j7drOjYHXFyHOCusPYB7GrU2QpgJJxgJJzY0HPaV46d41Ohm94VegGqC+uEx9r4zXnOj04DENhWw3O7tpf1vJqVY+ezGVn53HTGEiCWSPPelSlyecjl4b0rU8QSaaeHtWFuOmOV7YPQDJfDd5hLLS7fd6CjniPPNtKyxsI/MZ/h7D9mCEWTAOxp8/O9bzat2vZeJsdfQjN8OLEyBX3efjdbIpnl9HCEdHZlTZjO5jg9HOGt73yFgL9y/rsq7oz1znCEP12bLYkK4O/X5zh5MbLmQv3kxchyVAChaJKTFyMkkpnl+xLJDL8e+qwkquL9Fm9rIbOYZ+BShEQyu+qxpeAyi+645liOynkJADemFwhFk7Ts8PL64daSs8g7w4V4xj65Q9czDSXP2+7z8OreJvZ27OReJsfZkRihaJKhf87w/YOtAJz/aJqpuxn2tPnpfqGZgN8LwB/HpvlwIlGy7WbL5eHdkRjR+PpTXiyR5t2RGD/6VhuVsAytqLCeat627oerX2/1E4omWUgvrnqsOMI6r4fuF5oJvX+D8egCUDhbhaJJ6mur+UFXK3XelRP5K53NvNLZbPDXrDg/Os34zfkv3G5pUX98v+14NkNFhbVkZCLOX8MJpu6WNz0FtntLb/u9tOzwMnU3w1Q8xex8YT8dX6otiWqrHN/fXBGxbETFhbU05T2s7b7VAflrK27J6VoVFdbV63fWXWONTMQ5N3ar7H3NpwuL/DqfB+7PQsnU43GFfitUVFi35wpT1uFg4KHe/k/FU0zdzVBfW728SAe4fjvFvUxuy6fDcx9Pl32VvSsYqIhps6LO/dt81QD8O5YsuazwQWiGofHZdZ93diS2fLkgkcxw7qP/AvDtYOFD24Dfy4GOeuZSiyXbQuFdYd9gmN/9Lbbpf8+S7n3NZV1df27Xdrr3uT8qqLAzVudXdzI0PksomiT0+/+U/bxQNEno/Rsl932tqZbDzzYu3z72fBM3ZlJrbltfW82x55sebvCfw1MFJw618Ks/T657lb014OPEoZaKuNQAFXbGqvN6ePOldva0+Uvuf3l3I8c7v7zu817e3Vhy+0BHPT9+cVfJlBfwe/nZsSd48ZnAqm3ffKm9ZMq04Kvx0Hu0fc2r6wF/Db1H2yvqW7Ru+gZpHpz/EYDTYok0bw99tnyV3VtdxVvffYK2hvI+V176vnt/T9DRc5ubXgIZgMWcO0J3SmvAx2tdrXiqClPka12tZUdV9BnjnNkAy+SmNdYocPDmbIonm+qcHoujihfp5X5lBihen13b/FFtjJvOWJcArn7q+IvNFbqCAbqCgS/esEjRsbu06QPaIDeFdQbgSjhBNJ5yeiwVJxpPc2XlWtgZJ8cC7gprFBjI5vIMDEeJKK6yReMpBoYjZAvr0wEe+FW0E9wUFv09wV7gQmIhy9tDk1wYu8Xk7VTJF9+kIJ3NMXk7xYWxW/xyaHLpN4UX7h9Dx7lp8Q5Af0+wu28wfGoxl++9PBHn8kTc6SFViuWf2LuBm65jPXjXfuB1Cj9l+gbgf3CDx1wS+BeFhfpvgY+LH3T6eqBrwpJHi6vWWPLoUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYmJ/wEXIDDKviZ6oQAAAABJRU5ErkJggg==", o7 = "_container_1e5dd_1", a7 = {
  container: o7
}, l7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const n = e.choices, r = e.inputId;
  return /* @__PURE__ */ L("div", Q(M({ className: a7.container }, t), { children: [
    /* @__PURE__ */ y("label", { htmlFor: r, children: e.label }),
    /* @__PURE__ */ y("select", { id: r, children: Object.keys(n).map((i, o) => /* @__PURE__ */ y("option", { value: n[i], children: i }, i)) })
  ] }));
}, s7 = {
  title: "Select Input",
  UiComponent: l7,
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
  iconSrc: i7,
  category: "Inputs",
  description: "Create a select list that can be used to choose a single or multiple items from a list of values."
}, u7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEEklEQVR4nO3bT4iUdRzH8behaBI7ZiB1WLokemkvUVk3Ye2ShwjKS6cu1amTIXTpFKUEBR30FnSyQATrUAreDOwf5CEhL1vBhkGsGrK20nT4PQdZpnXn8fnM7PM87xd4cn/f+c3Dm2dmnnlm03A4RGrafdPegLrJsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEZunvYGkt05eudufbAX2Ay8AzwCPAgPgGrAAfAOcBs4Dt+427Oihx2rvtWs6HdYaNgOvAu8Aj4z4/wEwV/17DbgKvA98DPwzmS22Wx9fCvcA3wMnGB3VKLuAD4Bvgb2hfXVK38J6ErhAORPVMVetf7qxHXVUn8LaC5wFdt7jnAeBr/DMtaa+hLUFOEl579SEAfBZNVcj9CWsN6n/8vd/Hq/maoQ+hLUNOByafbiar1U2DYfDae9hHLuB94B5YGY9Cy799jefXvgjtqFXnn2YudkHYvMr14FzwBHgl/SDNaFNZ6w9wEXgRdYZFcDPizdjGwK4HJ5fmaE874uU47DhtSmsd4Ed4y76/a/l5ncywfmr7KAchw2vTWHN11m0dPN20/uY6PwRnpv0A9bRprBqWV75t9Xz26pNYZ2rs2jbluxTTM8f4etJP2AdbQrrbWBp3EWD7dnv2Qf3T/R7/CXKcdjw2hTWZWAfcAq4sd5Fszuzl5lmH5rIZawblOe9j3IcNry2XccaS3U/1kuUr19SXgY+B+/HulObzlh1naHcT5XwZzVfq/QhrGXgWGj2sWq+VulDWAAfAT81PPMS8GHDMzujL2GtAIco97I34RrlvdVKQ/M6py9hQfk0Nc+9v9+6ChygJZ/OpqVPYQF8R7k9+Yea638EnqLc+6419C0sgF8p96y/ASyuc80i8DolqoXQvjqlrz//ug0cBz4BDgLPA09Qflc4Q7n/aYHya54vgS/w099YOn2BVNPTx5dCTYBhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxFGJYiDEsRhqUIw1KEYSnCsBRhWIowLEUYliIMSxGGpQjDUoRhKcKwFGFYijAsRRiWIgxLEYalCMNShGEpwrAUYViKMCxF/Aek7Hy8USK+/wAAAABJRU5ErkJggg==", c7 = "_container_1f2js_1", f7 = "_sliderWrapper_1f2js_11", d7 = "_sliderInput_1f2js_16", Xd = {
  container: c7,
  sliderWrapper: f7,
  sliderInput: d7
}, p7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const n = M({}, e), { width: r = "200px" } = n, [i, o] = J.useState(n.value);
  return /* @__PURE__ */ L(
    "div",
    Q(M({
      className: Vt(Xd.container, "shiny::sliderInput"),
      style: { width: r }
    }, t), {
      children: [
        /* @__PURE__ */ y("div", { children: n.label }),
        /* @__PURE__ */ y("div", { className: Xd.sliderWrapper, children: /* @__PURE__ */ y(
          "input",
          {
            type: "range",
            min: n.min,
            max: n.max,
            value: i,
            onChange: (a) => o(Number(a.target.value)),
            className: "slider " + Xd.sliderInput,
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
          /* @__PURE__ */ y(cf, { type: "input", name: n.inputId }),
          " = ",
          i
        ] })
      ]
    })
  );
}, h7 = {
  title: "Slider Input",
  UiComponent: p7,
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
    /* @__PURE__ */ L(cC, { label: "Values", children: [
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
  iconSrc: u7,
  category: "Inputs",
  description: "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_"
}, fC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGBElEQVR4nO3dW4hVVRzH8e/cdMyZ8TIamZEXFA1CozQTougtqUBJLYkgeumlGAoa6TUqSKFE6qEeInoQRUwrqncjtCia0pepeSjSYKLwkpiOTtPDOsKZfc5c9JzfWmfv8/vAedh7z/BfZ81v9l5n7ctpGRsbw6zeWlM3wIrJwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEzCwTIJB8skHCyTcLBMwsEyCQfLJBwsk3CwTMLBMgkHyyQcLJNwsEyiPVah/gND1VbPADaXXhuBW0vrWjI/l320s7dXbr8AnAJ+AA4DnwAjmZ9j1xMrsqskogWrii3ALiDOOy2+LmB16bUDGAJ2Ah+naEyKQ2Eb8CbhDTtUOiuAQ4S+botdPMUe6w2gP0HdZnWtr3fGLBp7j7WVylCNAHsJY6xuKscPlNaVv7y9cns3oQ/3Ujm26if0fTQxgzUDeDuz7jSwAegDjhMGoHZjLhD6sI/Qp6cz2/cQ/gZRxAzWNuC2suUR4FFgIGIbmsUA8AhwuWzdYmB7rAbEDNbmzPJ7OFRKPwLvZ9ZtjlU8ZrDWZ5b3RazdrLJ9vC5W4ZifCpdmlqMd75vYcaoP9uVSntKpmBW24vC5QpNwsEwi5hhrqhOpppGk373HMgkHyyQcLJOIOcbymCqNppvHsgLLU7AWAm8Bg8AlwqedWK+LwAngVWCu+H0WQspLk6/HOuBLYEGi+rOAO0uvZ4FNhKDZBGLusbJ7genqBT4lXaiyFhPaMyd1Q6bpRvu9Jnk4FPYBi1I3ImMp8ELqRjSyPBwKH6+2cklvJxtXzGHZwll0d7bR3la/Dz9XR8c49+9Vfhm+yNc/n2P4fNXz5U8Cr9WtaMHkIVgVd/I8dMc8Nq3plRVsb2uht6uD3q45rFvWw75jw5w8VXHV9CpgP3A7+kuA/gKOAR8Cv4lr1UXMQ+FUNwRMZNwfbemCTh4WhiqrvbWF7ffeTM+siv/BdkLoY1xXtgB4jHDh3oPX+bs32u81ycMYa5z1y3uiz/h1drSyYXlP5KpVzQReJ+wlG1rugrWktzNJ3ZW33JSkbhWdwDOpGzGVPIyxxpnf1ZGk7sLuCesOAx8Rbl4YBkbrVLILWAk8DdyV2XZ/nWrI5O56rPbWNKccZ3ZU3bn/CTwFnBWUPA/8AXwFfECYnL1mPmFsN53Lu309ViObIND70YSq3H/AwSrrG/pmFAerNgOR6pyMVKduHKza/B6pzt+R6tSNr8eqzZVIdS7V8Lu+HiuHYj3E5GqkOnXjYJmEg2USuZvHsuvmeSwrDgfLJBwsk/A8VvF5HsuKo1Eum4l290idpWz3P5NsS3508B7LJDyPVXyex7LiaJQx1mT/RfMeWDW3Z/Wi2ctLy+djNKia0leyjfYfGBpI1Ya8aJRgTebM0cGzZ44Ons3F/XQWeB6r+DyPZcXhYJmEg2USnscqPs9jWXE4WCbhYJmE57GKz/NYVhwOlkmkDFZDPy3FahMzWIOMf9743RFrN6v7GN/nv8YqHDNYP2WWd0Ss3ayyffxdrMIxg3Uks/wcsDZi/WazhtDH5Y7EKh4zWAeBU2XLM4HPqXy+ptVuLfAFoY+vOU31JwNKxAzWCPBSZt1i4BtgD+GLmGZHbE/RzCb04R7gW0LflnsRuByrMbGvID0I7AZeLls3g/B9OX1l67KTelOdSPX2ye0m4t4K0kw3vAK8k6Bus3qX0OdRpQjWKOGbs7YCQwnqN4shYBvwPPV79vy0pbyZ4hDwGeHNbwHuIYwL0nxDQP5dIQzQvwcOEw5903kOvETL2Fhe7263RuZzhSbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm4WCZhINlEg6WSThYJuFgmYSDZRIOlkk4WCbhYJmEg2USDpZJOFgm8T/aaPEMWSCgvwAAAABJRU5ErkJggg==", m7 = ({
  uiArguments: e,
  uiChildren: t,
  path: n,
  wrapperProps: r
}) => {
  var o;
  const i = (o = t == null ? void 0 : t.length) != null ? o : 0;
  return /* @__PURE__ */ y(sC, Q(M({ path: n }, r), { children: i > 0 ? t == null ? void 0 : t.map((a, l) => {
    var c;
    const s = ar(n, l), u = (c = Mg(a)) != null ? c : "unknown tab";
    return /* @__PURE__ */ y(eC, { title: u, children: /* @__PURE__ */ y(no, { path: s, node: a }) }, ff(s));
  }) : /* @__PURE__ */ y("div", { style: { padding: "5px" }, children: /* @__PURE__ */ y("span", { children: "Empty tabset. Drag elements or Tab Panel on to add content" }) }) }));
}, g7 = {
  title: "Tabset Panel",
  UiComponent: m7,
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
      defaultValue: (e) => e ? ZA(e) : "First Tab",
      choices: (e) => e ? qA(e) : ["First Tab"]
    }
  },
  acceptsChildren: !0,
  iconSrc: fC,
  category: "Tabs",
  description: "A container filled with tabs"
}, v7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGaklEQVR4nO3c309TZxzH8TeFUqzVwhgRMJtsdppFXcQZnWb+uDEzMdEsWUZmvNh0iRe7NfwBu+Ryyy5MHEvMEoNZ5sQsWUJmFJfhFhWzVZewZv6YozBFqEKhLbS7KNRWIaLy3TnFz+uKltOTh5M3z3k47aEkk8kgMtc8Tg9A5ieFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmChzegBTmtsitDSF8h+vAz4AtgCrgIBDQ3OrYeAKcA441tIUuuTweAq4csZqboscAS4Ch4CNKKrpBMgem0PAxclj5hqumbGmNLdFTgK7Sz0lbAoFWftygNpgOeVlrvwdcExyPE1fLMnlm8N0RWJMpDMHmtsiNS1NoT1Ojw2gJJPJOD0GIHsqBI4AB4ILyvhoax31lT6HR1UceocSfNUZJTY6DtDa0hQ64PSY3DQNNAIHSj0liuoJ1Vf62L+1jjJPCcD+5rZIo9NjclNYewHeWr5YUT2FukofG5cvnnq418mxgLvC2gLQuGzRnO3w0++u0dwWYSyVnrN9ulnesdvi5DjAXWGtA1hapdnqadU/OHY6FebxApRm1wnyFMoeHLtyJ8cB7gpL5hHXXceajdPhAX6K3GM4MZF7bkNDgC0rq1gyzcI/NpLi+G8DhKNxAFbX+XnnjepHth1LpfkxPMDZntis9iszK7oZ62hnLz9cGSyICuDX68McPtM77UL98JneXFQA4Wicw2d6icVTuedi8RRfdPxdEFX+fvO3lccrqhnrxu1RwtE4SxZ52be5tmAWOdqZjaf72j02ragseN3Ccg+711aztmExY6k0x7v6CEfjdPw+wHsbawE4eeE2/fdTrK7zs2d9DUG/F4Dvu29ztidWsK08XlGFtaxmQcEb1fleq/UTjsYZTU488r38CCu8HvasryF86gZXo6NAdrYKR+MEfKW8v6mWCu+DiXxXYw27GmsMfpr5rajCmtLVM8TPkRj992d3egou9BY+9ntZsshL//0U/UMJBkey+2l4wVcQlTy9ogtr6pT3rBaWPxqQ36eo5kpRhXX5+r0Z11hdPUOc6L4z632NJLOL/IpyD4xkn4snno8r9P+Hogrr7nD2lLU5FHymP//7hxL0308R8JXmFukA1+8mGEuldTqcA0V1BBeUlwLwZ1+84LLC6fAAHVcHZ3zd8a6+3OWCWDzFiQv/AvB2KPumbdDvZUNDgOHERMG2kP2rsLktwje/9M35zzOfFdWM1fjKYjquDhKOxgl/+9esXxeOxgmfulHw3KvVPjavrMo93rGmmhsDiWm3DfhK2bGm+tkG/5wpqhmrwuvh4PZ6Vtf5C57fuaqKdxtfnPF1O1dVFTze0BDgw21LC055Qb+XT3a8xLYVwUe2Pbi9vuCUKY/npk+QZoAZr1PJ7Ex+EpeWppCj7+a7acZKAUyk3RF6MUqO59adw06OA9wV1iWAfwYTTo+jaPXFklNfXnFyHOCusM4BXL7p+C9b0co7duecHAe4K6xjAOcjMaJDmrWeVHQoyflI7pMZx5wcC7grrEtA63g6Q2tnlF7FNWvRoQStnb2MZ9enrW64K9pNYTF5P1x7bHSczztu0d59h1t3E/mLUpmUHE9z626C9u47fNZxa+qewnY33FMI7rrckLvUMHm7uCsOUBH5sqUp9LHTg5jiqrAe8iawj+ytTK8D/oc3eM7FgT/ILtS/Jvu/LnKcvh7omrBkfnHVGkvmD4UlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaY+A/iJMS/OUnuYwAAAABJRU5ErkJggg==", y7 = "_container_yicbr_1", w7 = {
  container: y7
}, b7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const n = "200px", r = "auto", i = M({}, e), [o, a] = J.useState(i.value);
  return J.useEffect(() => {
    a(i.value);
  }, [i.value]), /* @__PURE__ */ L(
    "div",
    Q(M({
      className: Vt(w7.container, "shiny::textInput"),
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
}, S7 = {
  title: "Text Input",
  UiComponent: b7,
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
  iconSrc: v7,
  category: "Inputs",
  description: "Create an input control for entry of unstructured text values."
}, E7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGh0lEQVR4nO3bv2skZQDG8W/8haBNIhbaqHu72Jv0olyw1CbZRfTsktJqk4CNgkVuF+wviIKNm2xz14kJ+AecsROUDWkE7W4LrQ4lFvNOMjOZ/ZXdJ/tGnw8cuezOvTNcvsw78+5k4ezsDLNZe2LeB2D/TQ7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbx1LwPIGthYWGm4zU7vXvARvj2qN2orc50BwVnZ2cjt9naP1EeQqlWvXrt+4wqLCv1CvBR+PuXwO9zPJaxOay4vQw8BF4M338MrAI/ze2IxuRrrLi9x0VUAEvAEfDGXI5mAg4rbn+XvLbIDYjLYcXtW+CXktejj8thxe1P4G3g15L3oo4r6ov3Zqd3G1gGtkn+I7NOgT2SZYTjCcfdJlmGqGRe3gO67UbtaIIxloG19LWwlLAHHLfq1b1JjmmIP4C3gB+A1wvvpXHdJrIL+oVx1l6uS7qO1ez0FoEDkv+wcey1G7XN4ovFdSxgJ4xbKW6b0W03auuD3gyxH3A59KJjYLNVr+ain2Id6yXK4wLoMySueaxjxToVHjJ+VAAbzU5vd8Q2lTDusKgA1pqd3kHZG81ObyOMMSoqSM5mh1v7J6P2N670zHUjpsXowspMMakjYL3dqC1k/wCbJGeF1HY40w1S4SKIu8CtzFjrJFNrai1ElD2uCnCvMGZxnFvhtdRiyb+Zxo2JK7qwyFyzED6GaTdq3eJG7UZtj2SxMGvUWe4UWGk3ajvtRu08pDD+Cvm4tgv/thjIanGcVr162qpXd0hCPT+mrf2TZWbnRsQVY1jZH8LQC+B2o9Ynf9YaNu30SWIovdAPY+1kx2p2estwfrbKRrsz7CK/Va92w/5Sk0zr44g+rujuCsOUMon+6E0AOM6eXQbsu9vs9PpcTJm3ScJdK2w68o6vVa8ujXlcVxX13WJ0YRU1O701kjNRhYs7vEFmcaF8zMUZJh0ve+12HM5u03ie5APld4FnpxxrkEXge+BN4GfRPgaKNqxwET/qTk8he1ZbLHyF/NR7VZ8C9RmMM8oLwBfAO9ewr5zowgrXMwfkr7XmJQ1qVksGqZUZjzfMa9e4r3PRhUVy95WNKl1hPy27O2x2epOueU3itPB1Vh6STFHX4cE17ScnqrDCqnY2krvtRm1n0PYi2aj7ha/F96/qM5KV9HXg6RmMN8gD4BPh+APFttyQO1Ndd1RhgTU77aXXU7mwRizEjuMv4APgGWBhij93gH8G7OMBSbiPpzzWK4nqjEX+hzru9DPtDzlrrTBeulbVJX8jsUF+hf2Srf2TR5mxdlr16tDtr+BD4GvgyZL35hoVxHfGmujMED7TG3dquh3uNAeNVSEfTzddVgjrX9kF0d0wbZfa2j8ZFOisRB0VxBdW9gewCByWfGa33Oz0tpud3iMuL1yOstvs9A6LgYV9/Eg+huI0XHx64rDZ6e2GIAHY2j+pbO2f7JLc1aaOik84TCn6qCDCx2bCWWjSYFK5x2cKj81MYjN8FpkTApzkQ+U+sNKqV8+n9Sl//esO8BUTRuXHZhKbjD917E2w7bjXbOtlUUHug+9xVt6PgdVsVFO6UlTzEl1Y7UatH36xdJ3kormoSzJNLZU93DfEafgccofLMaYfQC+VrZUVju+o3agthe3Ltt0jecBvZYZT4LCo7hNZVBDZVPh/cIWp8H3gGwZHVWdEVJ4Kreg5kjPglaOaF4cVt1dJ4iq6T8RRgcOKXQ/4rfDafSKPChxW7B6TPPLyHckzVZ9zA6ICX7ybiM9YJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJNwWCbhsEzCYZmEwzIJh2USDsskHJZJOCyTcFgm4bBMwmGZhMMyCYdlEg7LJByWSTgsk3BYJuGwTMJhmYTDMgmHZRIOyyQclkk4LJP4F7bdmR9UysBAAAAAAElFTkSuQmCC", A7 = "_container_1i6yi_1", C7 = {
  container: A7
}, x7 = ({
  uiArguments: e,
  wrapperProps: t
}) => /* @__PURE__ */ L("div", Q(M({ className: C7.container }, t), { children: [
  "Dynamic text from ",
  /* @__PURE__ */ L("code", { children: [
    "output$",
    e.outputId
  ] })
] })), k7 = {
  title: "Text Output",
  UiComponent: x7,
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
  iconSrc: E7,
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `
}, O7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAGT0lEQVR4nO3cy29UZRjH8e902tIbVFouNQpEQKLGCsEYUGJcGFHiQk2MxsTg0rgwulH/AmPiyoUoEdTgLdG4MJpoCJY7VTCgAQQpBVGm9+u0c+vcjosySENpC5ynp33n91k105PmafvNe86c87Yhz/MQ8VtJ0AOImxSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlphQWGJCYYkJhSUmFJaYUFhiQmGJCYUlJhSWmFBYYkJhiQmFJSYUlpgoDXoAv7z5dWvhw/XAK8CDwG1AVVAzTWIE6AQOA9uAnwHefX5lkDP5xrUV6y3gELAZuJOZGxXAHGAZ8BywC3g32HH85cyKBTwCvAOE5lWWeo/dWxe6q6GKuZWllISCHm0sD4incrR2J9l5oi/fF8uUAG8wGtiuYKfzh0sr1qtAaH51af71jUtC65bPo7Zq5kUFEAJqKsKsWVrDaxuXlCyYW5a79KmXg5zLTy6FtQHg8cb6kpqKcNCzTFlFWQmbGusLAz8U6DA+cimsxQCrFs/ky6rxLV9UWfiwPsg5/OTSNVYIRk8xQfOAU21xTrfHiY/kqKsuY/XSGpbWV4x7fPWcyzOXT9eM1lwKa0ZIpHPsONjJ3z3JMa8faBlk/Ypanr5/4Yy87vObS6fCwHnAF81XR1Xw67koO0/0Te9QAVFYPjrTkaC1a/yoCvafGWQomZ2miYKjsHzU0pmY9Jhc3qO1e+L4XKCwfJQYyU1+0HUcN5spLB/Nr57ae6G66jLjSYKnsHy0eulcQpO846upCLNyceXEBzlAYfmoobach1fdcs3Ph4Cn1y6kvNT9H7vuY/nsyTULqCwPs/tUP5mcd/n1eZWlPLV2AY231wQ43fRRWD4LAY/eM58HV87jXHeSRDpPXVUpdyyspDRcBHdGL1FYRqrKw0WzOo1HYQFDySyHzw1xsT9FuCTEikWVrFtRS1kRrTB+K/qwTkZifHOkm1Qmf/m1P9viNLdGeWnDrSyudea58LRy/+3JBA6cGeTzQ51joiroHc7wwe4I56/x3E8mVpRhecAPf/Tywx+9eBMcl0zn2b6vnROR2HSN5oyiCyuX9/jql04OnBmc0vHZnMeXzZ00n43aDuaYorrGSmXy7DjYwbnrfAic9+C7Yz1Ek1meuK+eyS7pPQ+OR2K0diUoD5ewZlkNS+rG3+TnqqIJK5rM8sn+djoG0zf8NfacHmAomeXZBxYRvsZuvfhIjs8Ojd2TdbBlkEfuns+mxvpJH/m4oijC6hpK8/G+dgYTN78P6uiFYYZTOTZvaLjq0cxAPMv2fe30DI+N1wP2nh6gdzjNC+sbiuI2hvPXWBd6U3zY1OZLVAUtnQm27mkjlvp/+0vXUJoPmiJXRXWlk5E4W3e3MZzStplZ7WQkxkd720ik/f9FRvpH2NIUoS+W4d++0XijU9gZerE/xfs/X6QreuOn5NnA2VNh89ko3//eQ36i+wk3qS+WYUtThHTWI529+l7YtQzEs2xpivDiQw2saph9f642Fc6tWB7w0/E+vjtmG1VBLJW7rqgKUpk8nx7o4Mj5IYOpgufcivXN4S6OXhgOeowpyeU9vv2tm97hTNCj+M65FWu2RHWlvX8NBD2C75wLa5a7/nPqDOVSWC48cxkMegC/uBTW8aAH8MHJoAfwi0thfR/0AD74MegB/OJSWNuAf4Ie4ib0Mvo9OMGlsKLAM4z+w9jZJgo8C/QHPYhfXAoL4HegEXib0Wuumbz9cwRoAd5jdOZ9gU7js5DnTcPtaSk6rq1YMkMoLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDEhMISEwpLTCgsMaGwxITCEhMKS0woLDGhsMSEwhITCktMKCwxobDExH/tpJ306UTa3AAAAABJRU5ErkJggg==", T7 = "_container_1xnzo_1", I7 = {
  container: T7
}, P7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const { outputId: n = "shiny-ui-output" } = e;
  return /* @__PURE__ */ y("div", Q(M({ className: I7.container }, t), { children: /* @__PURE__ */ L("div", { style: { gridArea: "1/1", placeSelf: "center" }, children: [
    "This is a a dynamic UI Output ",
    n,
    "!"
  ] }) }));
}, _7 = {
  title: "Dynamic UI Output",
  UiComponent: P7,
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
  iconSrc: O7,
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `
};
function N7(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attr: { d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z" } }] })(e);
}
function D7(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M881.7 187.4l-45.1-45.1a8.03 8.03 0 0 0-11.3 0L667.8 299.9l-54.7-54.7a7.94 7.94 0 0 0-13.5 4.7L576.1 439c-.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-.8 9.3-8.8 4.7-13.5l-54.7-54.7 157.6-157.6c3-3 3-8.1-.1-11.2zM439 576.1l-189.2 23.5c-6.6.8-9.3 8.9-4.7 13.5l54.7 54.7-157.5 157.5a8.03 8.03 0 0 0 0 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l157.6-157.6 54.7 54.7a7.94 7.94 0 0 0 13.5-4.7L447.9 585a7.9 7.9 0 0 0-8.9-8.9z" } }] })(e);
}
const R7 = "_categoryDivider_bdwku_1", L7 = {
  categoryDivider: R7
};
function F7({ children: e }) {
  return /* @__PURE__ */ y("div", { className: L7.categoryDivider, children: e });
}
function M7(e) {
  return e.replaceAll(/\(/g, `(
  `).replaceAll(/\)/g, `
)`).replaceAll(/\(\s+\)/g, "()").replaceAll(/,/g, `,
 `).replaceAll(/(\s+)$/g, "");
}
const B7 = 20, U7 = ({
  uiArguments: e,
  wrapperProps: t
}) => {
  const n = e.text.slice(0, B7).replaceAll(/\s$/g, "") + "...";
  return /* @__PURE__ */ y("div", Q(M({ className: "unknown-ui-function-display" }, t), { children: /* @__PURE__ */ L("div", { children: [
    "unknown ui output: ",
    /* @__PURE__ */ y("code", { children: n })
  ] }) }));
}, z7 = {
  title: "Unknown UI Function",
  UiComponent: U7,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function"
    }
  },
  settingsFormRender: ({ settings: e }) => /* @__PURE__ */ L("div", { className: "unknown-ui-function-settings", children: [
    /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ L("span", { className: "info-msg", children: [
      /* @__PURE__ */ y(N7, {}),
      "Unknown function call. Can't modify with visual editor."
    ] }) }),
    /* @__PURE__ */ y(F7, { children: /* @__PURE__ */ y("span", { children: "Code" }) }),
    /* @__PURE__ */ y("div", { className: "SUE-SettingsInput", children: /* @__PURE__ */ y("pre", { className: "code-holder", children: M7(e.text) }) })
  ] }),
  acceptsChildren: !1
}, on = {
  "shiny::actionButton": Z8,
  "shiny::numericInput": XM,
  "shiny::sliderInput": h7,
  "shiny::textInput": S7,
  "shiny::checkboxInput": uM,
  "shiny::checkboxGroupInput": iM,
  "shiny::selectInput": s7,
  "shiny::radioButtons": r7,
  "shiny::plotOutput": ZM,
  "shiny::textOutput": k7,
  "shiny::uiOutput": _7,
  "shiny::navbarPage": $M,
  "shiny::tabPanel": oC,
  "shiny::tabsetPanel": g7,
  "gridlayout::grid_page": W8,
  "gridlayout::grid_card": h4,
  "gridlayout::grid_card_text": T4,
  "gridlayout::grid_card_plot": A4,
  "gridlayout::grid_container": U8,
  "DT::DTOutput": R_,
  "plotly::plotlyOutput": J8,
  unknownUiFunction: z7
};
function W7(e, { path: t, node: n }) {
  const r = IE(t), i = t[t.length - 1], o = wi(e, r);
  if (!on[o.uiName].acceptsChildren)
    throw new Error(
      "Can't add a child to a non-container node. Check the path"
    );
  Array.isArray(o.uiChildren) || (o.uiChildren = []), o.uiChildren = Zo(
    o.uiChildren,
    i,
    n
  );
}
function dC(e, { path: t }) {
  const { parentNode: n, indexToNode: r } = j7(e, t);
  if (!hg(n))
    throw new Error("Somehow trying to enter a leaf node");
  n.uiChildren.splice(r, 1);
}
function j7(e, t) {
  const n = [...t], r = n.pop();
  if (typeof r == "undefined")
    throw new Error("Path to node must have at least one element");
  const i = n.length === 0 ? e : wi(e, n);
  if (!hg(i))
    throw new Error("Somehow trying to enter a leaf node");
  return { parentNode: i, indexToNode: r };
}
function Y7(e, { path: t, currentPath: n, node: r }) {
  const i = IE(t), o = t[t.length - 1], a = wi(e, i);
  if (!on[a.uiName].acceptsChildren)
    throw new Error(
      "Can't add a child to a non-container node. Check the path"
    );
  Array.isArray(a.uiChildren) || (a.uiChildren = []);
  const l = [...i, o];
  if (ug(n, l)) {
    const s = n[n.length - 1];
    a.uiChildren = O_(
      a.uiChildren,
      s,
      o
    );
    return;
  }
  dC(e, { path: n }), a.uiChildren = Zo(
    a.uiChildren,
    o,
    r
  );
}
function pC(e) {
  return "currentPath" in e && e.currentPath !== void 0;
}
function V7(e, t) {
  const { path: n, node: r } = t;
  if (pC(t)) {
    Y7(e, { path: n, currentPath: t.currentPath, node: r });
    return;
  }
  W7(e, { path: n, node: t.node });
}
function G7(e, { path: t, node: n }) {
  const r = wi(e, t);
  Object.assign(r, n);
}
const cr = {
  ui: "<UI>",
  libraries: "<LIBRARIES>"
}, $7 = /^\w+::/;
function H7(e) {
  if ($7.test(e))
    return e;
  const t = new RegExp(`^\\w+::${e}$`);
  for (const n in on)
    if (t.test(n))
      return n;
  throw new Error(
    `Unknown function ${e} made it passed the unknown function filter`
  );
}
function hC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function J7(e) {
  return Es(e) && "val" in e && ["string", "boolean", "number"].includes(typeof e.val);
}
function fr(e) {
  return Es(e) && "val" in e && Array.isArray(e.val);
}
function Q7(e) {
  return Es(e) && "name" in e;
}
class Ft extends Error {
  constructor({ message: t, cause: n }) {
    super(), this.name = "AST_PARSING_ERROR", this.message = t, this.cause = n;
  }
}
function K7(e) {
  return e[0].val === "c";
}
function X7(e) {
  const t = e[0].val;
  return t === "c" || t === "list";
}
function q7(e) {
  return fr(e) && K7(e.val);
}
function Z7(e) {
  return fr(e) && e.val[0].val === "list";
}
function e9(e) {
  try {
    return mC(e);
  } catch (t) {
    if (!(t instanceof Ft))
      throw t;
    return Nf({ node: e, explanation: t.message });
  }
}
function mC(e) {
  if (!fr(e))
    throw new Ft({
      message: "Tried to flatten a leaf/primative node"
    });
  const [t, ...n] = e.val;
  if (t.val !== "c")
    throw new Ft({
      message: "Tried to flatten non array as array"
    });
  return n.map(
    (r) => hC(r.val) ? r.val : mC(r)
  );
}
function t9(e) {
  if (!fr(e))
    throw new Ft({
      message: "Tried to flatten a leaf/primative node"
    });
  try {
    const [t, ...n] = e.val;
    if (t.val !== "list")
      throw new Ft({
        message: "Tried to flatten non array as array",
        cause: e
      });
    let r = {};
    return n.forEach(({ name: i, val: o }) => {
      if (typeof i != "string")
        throw new Ft({
          message: "All elements in list must have a name",
          cause: e
        });
      if (!hC(o))
        throw new Ft({
          message: "Nested lists are not supported",
          cause: e
        });
      r[i] = o;
    }), r;
  } catch (t) {
    if (!(t instanceof Ft))
      throw t;
    return Nf({ node: e, explanation: t.message });
  }
}
function n9(e, t) {
  const n = " ".repeat(t);
  return e.replaceAll(/\n/g, `
${n}`);
}
const gC = 2, r9 = " ".repeat(gC), Ug = 60, hi = `
${r9}`;
function vC(e) {
  const [t, ...n] = e;
  if (typeof t.val != "string")
    return "Unknown Ui Code";
  const r = n.map(
    (a) => `${a.name ? `${a.name} = ` : ""}${i9(a)}`
  ), i = yC({
    fn_name: t.val,
    fn_args_list: r,
    max_line_length_for_multi_args: X7(e) ? Ug : 0
  }), o = `,${i ? hi : " "}`;
  return `${t.val}(${i ? hi : ""}${r.join(o)}${i ? `
` : ""})`;
}
function yC({
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
function i9({ val: e, type: t }) {
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
      return ql(vC(e));
    case "u":
      return "<...>";
  }
}
function ql(e) {
  return n9(e, gC);
}
function Nf({
  node: e,
  explanation: t
}) {
  return {
    uiName: "unknownUiFunction",
    uiArguments: {
      text: fr(e) ? vC(e.val) : e.val,
      explanation: t
    }
  };
}
function zg(e) {
  const [t, ...n] = e.val;
  if (typeof t.val != "string")
    throw new Ft({
      message: "Invalid ui node, name is not a primative"
    });
  let r = {}, i = [];
  n.forEach((a) => {
    Q7(a) ? r[a.name] = o9(a) : i.push(a9(a));
  });
  const o = {
    uiName: H7(t.val),
    uiArguments: r
  };
  return i.length > 0 && (o.uiChildren = i), Bg(o) ? o : Nf({ node: e });
}
function o9(e) {
  return J7(e) ? e.val : q7(e) ? e9(e) : Z7(e) ? t9(e) : Nf({ node: e });
}
function a9(e, t) {
  if (!fr(e))
    throw new Ft({
      message: "Primative found in ui children of ui node."
    });
  return zg(e);
}
function l9(e, t) {
  if (!fr(e))
    return !1;
  const { val: n } = e;
  return n[0].val === "<-" || n[0].val === "=" ? t ? n[1].val === t : !0 : !1;
}
function wC(e) {
  return e.val[1];
}
function s9(e) {
  return e.val[2];
}
function yc(e) {
  let t = [];
  return e.forEach((n) => {
    if (l9(n)) {
      const r = wC(n);
      u9(r) ? t.push({
        name: r.val[2].val,
        is_output: !0,
        node: n
      }) : r.type === "s" && t.push({
        name: r.val,
        is_output: !1,
        node: n
      });
    }
    if (fr(n)) {
      const r = yc(n.val);
      t.push(...r);
    }
  }), t;
}
function u9(e) {
  if (!fr(e))
    return !1;
  const { val: t } = e;
  return t.length === 3 && t[1].val === "output" && typeof t[2].val == "string";
}
function bC(e) {
  return e.filter(({ is_output: t }) => t).reduce((t, { name: n, node: r }) => {
    var o;
    const { pos: i } = r;
    return i && (t[n] = [...(o = t[n]) != null ? o : [], i]), t;
  }, {});
}
function c9(e) {
  return !Boolean(e.pos) || !(wC(e).val === "ui") ? !1 : fr(s9(e));
}
function SC(e) {
  const t = e.find(
    ({ name: r, is_output: i }) => r === "ui" && !i
  );
  if (!t)
    throw new Ft({
      message: "No ui assignment node was found in provided ast"
    });
  const { node: n } = t;
  if (!c9(n))
    throw new Ft({
      message: "No position info attached to the ui assignment node",
      cause: n
    });
  return n;
}
function EC(e) {
  const t = e.find(
    ({ name: r, is_output: i }) => r === "server" && !i
  );
  if (!t)
    throw new Ft({
      message: "No server assignment node was found in provided ast"
    });
  const { node: n } = t;
  if (!n.pos)
    throw new Ft({
      message: "No position info attached to the ui assignment node",
      cause: n
    });
  return n;
}
function AC(e) {
  return e.app_type === "SINGLE-FILE" ? f9(e) : d9(e);
}
function f9({
  app: { ast: e }
}) {
  const t = yc(e), n = SC(t), r = EC(t), i = bC(t);
  return {
    app_type: "SINGLE-FILE",
    app: {
      ui_tree: zg(n.val[2]),
      ui_pos: n.pos,
      ui_assignment_operator: n.val[0].val,
      server_pos: r.pos,
      server_node: r,
      output_positions: i
    }
  };
}
function d9({
  ui: e,
  server: t
}) {
  const n = yc(e.ast), r = SC(n), i = yc(t.ast), o = EC(i), a = bC(i);
  return {
    app_type: "MULTI-FILE",
    ui: {
      ui_tree: zg(r.val[2]),
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
function CC(e) {
  return e.app_type === "SINGLE-FILE" ? p9(e) : m9(e);
}
function p9(e) {
  const t = AC(e), {
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
    const h = xC({ line: d, line_number: p, ui_pos: n });
    if (h === "Other") {
      c.push(d);
      return;
    }
    if (h === "Library") {
      const g = (S = (m = Wg.exec(d)) == null ? void 0 : m.groups) == null ? void 0 : S.library;
      g && g !== "shiny" && u.push(g);
    }
    if (h !== f)
      if (f = h, h === "UI")
        c.push(
          `ui ${r} ${cr.ui}`
        );
      else if (h === "Library")
        c.push(cr.libraries);
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
function h9({ ui_pos: e, ui_assignment_operator: t }, n) {
  const r = n.split(`
`);
  let i = ["shiny"], o = [], a;
  return r.forEach((l, s) => {
    var c, f;
    const u = xC({ line: l, line_number: s, ui_pos: e });
    if (u === "Other") {
      o.push(l);
      return;
    }
    if (u === "Library") {
      const d = (f = (c = Wg.exec(l)) == null ? void 0 : c.groups) == null ? void 0 : f.library;
      d && d !== "shiny" && i.push(d);
    }
    if (u !== a)
      if (a = u, u === "UI")
        o.push(
          `ui ${t} ${cr.ui}`
        );
      else if (u === "Library")
        o.push(cr.libraries);
      else
        throw new Error("Unknown line type");
  }), { code: o.join(`
`), libraries: i };
}
function m9(e) {
  const {
    ui: t,
    server: { output_positions: n, server_pos: r }
  } = AC(e);
  return {
    app_type: "MULTI-FILE",
    ui_tree: t.ui_tree,
    output_positions: n,
    server_pos: r,
    ui: h9(t, e.ui.script),
    server: {
      code: e.server.script
    }
  };
}
function g9(e, [t, n, r, i]) {
  return e >= t - 1 && e <= r - 1;
}
function xC({
  line: e,
  line_number: t,
  ui_pos: n
}) {
  return g9(t, n) ? "UI" : Wg.test(e) ? "Library" : "Other";
}
const Wg = new RegExp("^\\s*library\\((?<library>\\w+)\\)");
function kC(e) {
  var n;
  const t = /* @__PURE__ */ new Set();
  try {
    for (const r of Object.values(on)) {
      const i = (n = r == null ? void 0 : r.stateUpdateSubscribers) == null ? void 0 : n[e];
      i && t.add(i);
    }
    return t;
  } catch (r) {
    return t;
  }
}
const v9 = kC("DELETE_NODE"), y9 = kC("UPDATE_NODE"), OC = tg({
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
      const n = "ui_tree" in t.payload ? t.payload : CC(t.payload);
      return M({ mode: "MAIN" }, n);
    },
    SHOW_TEMPLATE_CHOOSER: (e, { payload: t }) => ({ mode: "TEMPLATE_CHOOSER", options: t }),
    SET_LOADING: (e) => ({ mode: "LOADING" }),
    UPDATE_NODE: (e, t) => {
      if (e.mode !== "MAIN")
        throw new Error("Tried to update a node when in template chooser mode");
      for (const n of y9)
        n(e.ui_tree, t.payload);
      G7(e.ui_tree, t.payload);
    },
    PLACE_NODE: (e, t) => {
      if (e.mode !== "MAIN")
        throw new Error("Tried to move a node when in template chooser mode");
      V7(e.ui_tree, t.payload);
    },
    DELETE_NODE: (e, t) => {
      if (e.mode !== "MAIN")
        throw new Error("Tried to delete a node when in template chooser mode");
      for (const n of v9)
        n(e.ui_tree, { path: t.payload.path });
      dC(e.ui_tree, t.payload);
    }
  }
}), {
  UPDATE_NODE: TC,
  PLACE_NODE: IC,
  DELETE_NODE: PC,
  SET_APP_INFO: w9,
  SET_FULL_STATE: _C,
  SHOW_TEMPLATE_CHOOSER: b9,
  SET_LOADING: ZU
} = OC.actions;
function Df() {
  const e = to();
  return k.useCallback(
    (n) => {
      e(IC(n));
    },
    [e]
  );
}
function NC() {
  return fa((e) => e.app_info);
}
const S9 = OC.reducer;
function DC(e) {
  const t = to();
  return J.useCallback(() => {
    e !== null && t(PC({ path: e }));
  }, [t, e]);
}
class E9 {
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
function A9(e) {
  const t = to(), [n, r] = k.useState(!1), [i, o] = k.useState(!1), a = k.useRef(
    new E9({ comparisonFn: C9 })
  );
  k.useEffect(() => {
    if (!e || e.mode === "LOADING")
      return;
    const c = a.current;
    c.addEntry(e), o(c.canGoBackwards()), r(c.canGoForwards());
  }, [e]);
  const l = k.useCallback(
    (c) => {
      t(_C({ state: c }));
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
function C9(e, t) {
  return typeof t == "undefined" ? !1 : t.mode === "LOADING" && e.mode === "LOADING" ? !0 : t.mode === "TEMPLATE_CHOOSER" && e.mode === "TEMPLATE_CHOOSER" ? JSON.stringify(t.options) === JSON.stringify(e.options) : e.mode === "MAIN" && t.mode === "MAIN" ? t.ui_tree === e.ui_tree : !1;
}
function RC(e, t) {
  const { ui_code: n, removed_namespaces: r } = LC(
    e,
    t
  );
  return { ui_code: n, library_calls: Array.from(r) };
}
function LC(e, t) {
  var c;
  const { uiName: n, uiArguments: r, uiChildren: i } = e, o = /* @__PURE__ */ new Set();
  if (FC(e))
    return {
      ui_code: MC(e),
      removed_namespaces: o
    };
  let a = n;
  if (t.remove_namespace) {
    const f = (c = a.match(/\w+(?=::)/)) == null ? void 0 : c[0];
    f && o.add(f), a = a.replace(/\w+::/, "");
  }
  const l = Object.keys(r).map(
    (f) => ql(
      `${f} = ${I9(r[f])}`
    )
  );
  i == null || i.forEach((f) => {
    const d = LC(f, t);
    d.removed_namespaces.forEach(
      (p) => o.add(p)
    ), l.push(ql(d.ui_code));
  });
  const s = yC({
    fn_name: n,
    fn_args_list: l,
    max_line_length_for_multi_args: Ug
  }), u = `,${s ? hi : " "}`;
  return {
    removed_namespaces: o,
    ui_code: `${a}(${s ? hi : ""}${l.join(u)}${s ? `
` : ""})`
  };
}
function FC(e) {
  return Es(e) && "uiName" in e && e.uiName === "unknownUiFunction";
}
function MC({
  uiArguments: e
}) {
  return e.text;
}
function x9(e) {
  return !(typeof e != "object" || Object.values(e).find(
    (n) => typeof n != "string"
  ));
}
function k9(e) {
  const t = Object.keys(e).map((o) => `"${o}" = "${e[o]}"`), r = t.reduce((o, a) => o + a.length, 0) + 6 > Ug, i = r ? `,${hi}` : ", ";
  return `list(${r ? hi : ""}${t.join(i)}${r ? `
` : ""})`;
}
function O9(e) {
  const t = e.map(T9);
  return `c(${hi}${t.join(`,${hi}`)}
)`;
}
function T9(e) {
  switch (typeof e) {
    case "string":
      return `"${e}"`;
    default:
      return String(e);
  }
}
function I9(e) {
  return Array.isArray(e) ? O9(e) : x9(e) ? k9(e) : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : FC(e) ? MC(e) : JSON.stringify(e);
}
function F0({
  ui_tree: e,
  libraries: t,
  code: n
}) {
  const { ui_code: r, library_calls: i } = RC(e, {
    remove_namespace: !0
  }), o = [...t];
  return i.forEach((a) => {
    t.includes(a) || o.push(a);
  }), n.replace(cr.ui, r).replace(cr.libraries, BC(o));
}
function BC(e) {
  return e.map((t) => `library(${t})`).join(`
`);
}
function jg(e, { include_info: t }) {
  const { app_type: n, ui_tree: r } = e;
  switch (n) {
    case "SINGLE-FILE":
      return M({
        app_type: n,
        app: F0(M({ ui_tree: r }, e.app))
      }, t && { info: e });
    case "MULTI-FILE":
      return M({
        app_type: n,
        ui: F0(M({ ui_tree: r }, e.ui)),
        server: e.server.code
      }, t && { info: e });
  }
}
function UC(e, t) {
  const n = e.length;
  let r = [];
  for (let i = 0; i <= n; i++) {
    const o = wi(t, e.slice(0, i));
    if (o === void 0)
      break;
    r.push(on[o.uiName].title);
  }
  return r;
}
function zC() {
  return /mac/i.test(window.navigator.platform);
}
function P9(e) {
  const t = J.useCallback(
    (n) => {
      !(n.target instanceof Element) || n.target.tagName !== "BODY" || (e.filter((r) => _9(n, r)).forEach(({ onPress: r }) => r()), n.defaultPrevented || n.stopPropagation());
    },
    [e]
  );
  J.useEffect(() => (document.addEventListener("keydown", t), () => {
    document.removeEventListener("keydown", t);
  }), [t]);
}
function _9(e, t) {
  return e.key === t.key && t.withCmdCtrl === (zC() ? e.metaKey : e.ctrlKey) && t.withShift === e.shiftKey;
}
function N9() {
  const { sendMsg: e, incomingMsgs: t, mode: n } = is(), r = NC(), i = W_(), o = to(), a = A9(r), l = DC(i), [s, u] = J.useState(null), c = J.useRef(null);
  P9([
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
    const d = t.subscribe("APP-INFO", (m) => {
      const S = "ui_tree" in m ? m : CC(m);
      o(w9(S)), c.current = M({ mode: "MAIN" }, S), console.log("Full app info", S);
    }), p = t.subscribe(
      "TEMPLATE_CHOOSER",
      (m) => {
        o(b9({ outputChoices: m })), c.current = {
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
  const f = J.useMemo(
    () => jS(e, 500, !0),
    [e]
  );
  return J.useEffect(() => {
    if (n !== "VSCODE" || !i || r.mode !== "MAIN")
      return;
    const d = UC(i, r.ui_tree);
    e({ path: "NODE-SELECTION", payload: d });
  }, [i, n, e, r]), J.useEffect(() => {
    if (!(r.mode === "LOADING" || r === c.current)) {
      if (r.mode === "TEMPLATE_CHOOSER") {
        e({ path: "ENTERED-TEMPLATE-SELECTOR" });
        return;
      }
      f({
        path: "UPDATED-APP",
        payload: jg(r, { include_info: !1 })
      });
    }
  }, [r, f, e]), {
    state: r,
    errorInfo: s,
    history: a
  };
}
function WC(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 16 16", fill: "currentColor" }, child: [{ tag: "path", attr: { fillRule: "evenodd", clipRule: "evenodd", d: "M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z" } }] })(e);
}
const D9 = "_appViewerHolder_zkojo_1", R9 = "_title_zkojo_55", L9 = "_appContainer_zkojo_89", F9 = "_previewFrame_zkojo_109", M9 = "_expandButton_zkojo_134", B9 = "_reloadButtonContainer_zkojo_135", U9 = "_reloadButton_zkojo_135", z9 = "_spin_zkojo_174", W9 = "_restartButton_zkojo_211", j9 = "_loadingMessage_zkojo_238", Y9 = "_error_zkojo_249", Kt = {
  appViewerHolder: D9,
  title: R9,
  appContainer: L9,
  previewFrame: F9,
  expandButton: M9,
  reloadButtonContainer: B9,
  reloadButton: U9,
  spin: z9,
  restartButton: W9,
  loadingMessage: j9,
  error: Y9
};
function V9(e) {
  return _t({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
function G9(e) {
  return _t({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" } }] })(e);
}
function $9(e) {
  return _t({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "circle", attr: { cx: "8", cy: "8", r: "8" } }] })(e);
}
function H9(e) {
  return _t({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", stroke: "#000", strokeWidth: "2", d: "M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M5,5 L19,19" } }] })(e);
}
const J9 = "_logs_xjp5l_2", Q9 = "_logsContents_xjp5l_25", K9 = "_expandTab_xjp5l_29", X9 = "_clearLogsButton_xjp5l_69", q9 = "_logLine_xjp5l_75", Z9 = "_noLogsMsg_xjp5l_81", eB = "_expandedLogs_xjp5l_93", tB = "_expandLogsButton_xjp5l_101", nB = "_unseenLogsNotification_xjp5l_108", rB = "_slidein_xjp5l_1", Oi = {
  logs: J9,
  logsContents: Q9,
  expandTab: K9,
  clearLogsButton: X9,
  logLine: q9,
  noLogsMsg: Z9,
  expandedLogs: eB,
  expandLogsButton: tB,
  unseenLogsNotification: nB,
  slidein: rB
};
function iB({
  appLogs: e,
  clearLogs: t
}) {
  const { logsExpanded: n, toggleLogExpansion: r, unseenLogs: i } = oB(e), o = e.length === 0;
  return /* @__PURE__ */ L("div", { className: Oi.logs, "data-expanded": n, children: [
    /* @__PURE__ */ L(
      "button",
      {
        className: Oi.expandTab,
        title: n ? "hide logs" : "show logs",
        onClick: r,
        children: [
          /* @__PURE__ */ y(
            $9,
            {
              className: Oi.unseenLogsNotification,
              "data-show": i
            }
          ),
          "App Logs",
          n ? /* @__PURE__ */ y(V9, {}) : /* @__PURE__ */ y(G9, {})
        ]
      }
    ),
    /* @__PURE__ */ L("div", { className: Oi.logsContents, children: [
      o ? /* @__PURE__ */ y("p", { className: Oi.noLogsMsg, children: "No recent logs" }) : e.map((a, l) => /* @__PURE__ */ y("p", { className: Oi.logLine, children: a }, l)),
      o ? null : /* @__PURE__ */ y(
        mt,
        {
          variant: "icon",
          title: "clear logs",
          className: Oi.clearLogsButton,
          onClick: t,
          children: /* @__PURE__ */ y(H9, {})
        }
      )
    ] })
  ] });
}
function oB(e) {
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
function Wh(r) {
  var i = r, {
    children: e,
    onClose: t
  } = i, n = at(i, [
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
const aB = "_show_btn_83j0t_1", lB = "_modal_83j0t_5", sB = "_title_83j0t_18", uB = "_description_83j0t_22", cB = "_code_holder_83j0t_26", fB = "_footer_83j0t_43", Kn = {
  show_btn: aB,
  modal: lB,
  title: sB,
  description: uB,
  code_holder: cB,
  footer: fB
};
function dB({
  info: e
}) {
  const t = jg(e, { include_info: !1 });
  return t.app_type === "SINGLE-FILE" ? /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y("h2", { className: Kn.title, children: "App script" }),
    /* @__PURE__ */ L("p", { className: Kn.description, children: [
      "The following code defines the currently being edited app. Copy and paste it to an ",
      /* @__PURE__ */ y("code", { children: "app.R" }),
      " file to use."
    ] }),
    /* @__PURE__ */ L("div", { className: Kn.code_holder, children: [
      /* @__PURE__ */ y("label", { children: "app.R" }),
      /* @__PURE__ */ y("pre", { children: t.app })
    ] })
  ] }) : /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y("h2", { className: Kn.title, children: "App scripts" }),
    /* @__PURE__ */ L("p", { className: Kn.description, children: [
      "The following code defines the currently being edited app. Copy and paste the ui and server scripts into ",
      /* @__PURE__ */ y("code", { children: "ui.R" }),
      " and",
      " ",
      /* @__PURE__ */ y("code", { children: "server.R" }),
      " files to use."
    ] }),
    /* @__PURE__ */ L("div", { className: Kn.code_holder, children: [
      /* @__PURE__ */ y("label", { children: "ui.R" }),
      /* @__PURE__ */ y("pre", { children: t.ui })
    ] }),
    /* @__PURE__ */ L("div", { className: Kn.code_holder, children: [
      /* @__PURE__ */ y("label", { children: "server.R" }),
      /* @__PURE__ */ y("pre", { children: t.server })
    ] })
  ] });
}
function pB() {
  const [e, t] = k.useState(!1), r = qS().getState().app_info;
  return r.mode !== "MAIN" ? null : /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y(va, { className: Kt.title, children: "Code" }),
    /* @__PURE__ */ y(
      Ei,
      {
        className: Kn.show_btn,
        text: "See current application code",
        position: "left",
        onClick: () => t((i) => !i),
        variant: "regular",
        children: "Get app script"
      }
    ),
    e ? /* @__PURE__ */ y(
      Wh,
      {
        className: Kn.modal,
        title: "App Script",
        onClose: () => t(!1),
        children: /* @__PURE__ */ L("form", { method: "dialog", children: [
          /* @__PURE__ */ y(dB, { info: r }),
          /* @__PURE__ */ y("div", { className: Kn.footer, children: /* @__PURE__ */ y(mt, { type: "submit", children: "Okay" }) })
        ] })
      }
    ) : null
  ] });
}
function hB() {
  const { sendMsg: e, incomingMsgs: t } = is(), [n, r] = k.useState("HIDDEN"), [i, o] = k.useState([]), [a, l] = k.useState(null);
  k.useEffect(() => {
    const p = t.subscribe(
      "APP-PREVIEW-STATUS",
      (S) => {
        l(null), r(S);
      }
    ), h = t.subscribe(
      "APP-PREVIEW-LOGS",
      (S) => {
        o(mB(S));
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
  const [s, u] = k.useState(
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to reset")
  ), [c, f] = k.useState(
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to stop")
  ), d = k.useCallback(() => {
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
function mB(e) {
  return Array.isArray(e) ? e : [e];
}
function gB() {
  const e = vB();
  return yB(e.width);
}
function vB() {
  const [e, t] = k.useState(M0()), n = k.useMemo(
    () => jS(() => {
      t(M0());
    }, 500),
    []
  );
  return k.useEffect(() => (window.addEventListener("resize", n), () => window.removeEventListener("resize", n)), [n]), e;
}
function yB(e) {
  const t = RA - jC * 2, n = e - YC * 2;
  return t / n;
}
function M0() {
  const { innerWidth: e, innerHeight: t } = window;
  return {
    width: e,
    height: t
  };
}
const jC = 16, YC = 55;
function wB() {
  const e = k.useRef(null), [t, n] = k.useState(!1), r = k.useCallback(() => {
    n((d) => !d);
  }, []), { appLoc: i, errors: o, appLogs: a, clearLogs: l, restartApp: s } = hB(), u = gB(), c = k.useCallback(
    (d) => {
      EB(d.currentTarget), !(!e.current || typeof i == "string") && (d.metaKey ? s() : e.current.src = i.url);
    },
    [i, s]
  );
  if (i === "HIDDEN")
    return /* @__PURE__ */ y(pB, {});
  const f = ({ isExpandedMode: d }) => /* @__PURE__ */ y("div", { className: Kt.reloadButtonContainer, children: /* @__PURE__ */ y(
    Ei,
    {
      text: `Reload app session (hold ${AB()} to restart app server also)`,
      className: Kt.reloadButton,
      onClick: c,
      position: d ? "right" : "up-right",
      children: /* @__PURE__ */ y(WC, {})
    }
  ) });
  return /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ L(va, { className: Kt.title, children: [
      /* @__PURE__ */ y(f, { isExpandedMode: !1 }),
      "App Preview"
    ] }),
    /* @__PURE__ */ y(
      "div",
      {
        className: Kt.appViewerHolder,
        "data-expanded": t,
        style: {
          "--app-scale-amnt": u,
          "--preview-inset-horizontal": `${jC}px`,
          "--expanded-inset-horizontal": `${YC}px`
        },
        children: o !== null ? /* @__PURE__ */ y(bB, { onClick: s }) : /* @__PURE__ */ L(et, { children: [
          /* @__PURE__ */ y(f, { isExpandedMode: !0 }),
          /* @__PURE__ */ L("div", { className: Kt.appContainer, children: [
            i === "LOADING" ? /* @__PURE__ */ y(SB, {}) : /* @__PURE__ */ y(
              "iframe",
              {
                className: Kt.previewFrame,
                src: i.url,
                title: "Application Preview",
                ref: e
              }
            ),
            /* @__PURE__ */ y(
              mt,
              {
                variant: "icon",
                className: Kt.expandButton,
                title: t ? "Shrink app preview" : "Expand app preview",
                onClick: r,
                children: t ? /* @__PURE__ */ y(D7, {}) : /* @__PURE__ */ y(t3, {})
              }
            )
          ] }),
          /* @__PURE__ */ y(iB, { appLogs: a, clearLogs: l })
        ] })
      }
    )
  ] });
}
function bB({ onClick: e }) {
  return /* @__PURE__ */ L("div", { className: Kt.appContainer, children: [
    /* @__PURE__ */ L("p", { children: [
      "App preview crashed.",
      /* @__PURE__ */ y("br", {}),
      " Try and restart?"
    ] }),
    /* @__PURE__ */ L(
      mt,
      {
        className: Kt.restartButton,
        title: "Restart app preview",
        onClick: e,
        children: [
          "Restart app preview ",
          /* @__PURE__ */ y(WC, {})
        ]
      }
    )
  ] });
}
function SB() {
  return /* @__PURE__ */ y("div", { className: Kt.loadingMessage, children: /* @__PURE__ */ y("h2", { children: "Loading app preview..." }) });
}
function EB(e) {
  const t = e.querySelector("svg");
  t == null || t.classList.add(Kt.spin), e.addEventListener(
    "animationend",
    () => t == null ? void 0 : t.classList.remove(Kt.spin),
    !1
  );
}
function AB() {
  return zC() ? "⌘" : "Alt";
}
const CB = (e) => /* @__PURE__ */ y(
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
), xB = {
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
}, kB = {
  title: "Chick Weights Grid",
  description: "Plots investigating the ChickWeights built-in dataset",
  uiTree: xB,
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
}, OB = {
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
}, TB = {
  title: "Chick Weights navbar",
  description: "Plots investigating the ChickWeights built-in dataset in a `navbarPage()` view",
  uiTree: OB,
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
}, IB = {
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
}, PB = {
  title: "Grid Geyser",
  description: "The classic geyser app in a gridlayout grid page",
  uiTree: IB,
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
}, VC = [
  PB,
  TB,
  kB
];
function _B(e) {
  const t = e.outputType === "SINGLE-FILE" ? NB(e) : DB(e);
  return jg(t, { include_info: !0 });
}
function NB({
  uiTree: e,
  otherCode: {
    uiExtra: t = "",
    serverExtra: n = "",
    serverFunctionBody: r = "",
    serverLibraries: i = []
  }
}) {
  const o = `${cr.libraries}

${t}
ui <- ${cr.ui}

${n}
server <- function(input, output) {
  ${ql(r)}
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
function DB({
  uiTree: e,
  otherCode: {
    uiExtra: t = "",
    serverExtra: n = "",
    serverFunctionBody: r = "",
    serverLibraries: i = []
  }
}) {
  const o = `${cr.libraries}

${t}
ui <- ${cr.ui}
`, a = `${BC(i)}

${n}
server <- function(input, output) {
  ${ql(r)}
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
const qd = 1260, B0 = 800;
function RB({
  uiTree: e,
  width_px: t
}) {
  const n = B0 * (t / qd), r = t / qd;
  return /* @__PURE__ */ y(
    "div",
    {
      className: "AppTemplatePreview",
      style: {
        width: `${t}px`,
        height: `${n}px`,
        "--full-w": `${qd}px`,
        "--full-h": `${B0}px`,
        "--shrink-ratio": r
      },
      children: /* @__PURE__ */ y("div", { className: "template-container", children: /* @__PURE__ */ y(no, { path: [], node: e }) })
    }
  );
}
function GC(e) {
  return e.uiName === "gridlayout::grid_page" ? "grid" : "navbarPage";
}
const LB = {
  grid: AE,
  navbarPage: fC
}, $C = 5, FB = {
  "--card-pad": `${$C}px`
};
function MB({
  info: { title: e, uiTree: t, description: n },
  onSelect: r,
  width_px: i,
  selected: o
}) {
  const a = GC(t), l = LB[a], s = i - 2 * $C;
  return /* @__PURE__ */ y(
    _g,
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
          style: FB,
          "data-selected": o,
          children: [
            /* @__PURE__ */ y("div", { className: "preview-container", children: /* @__PURE__ */ y(RB, { uiTree: t, width_px: s }) }),
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
function BB() {
  const { sendMsg: e } = is();
  return k.useCallback(
    (n) => {
      e({
        path: "UPDATED-APP",
        payload: _B(n)
      });
    },
    [e]
  );
}
const HC = ["grid", "navbarPage"];
function UB(e) {
  return VC.filter(({ uiTree: t }) => {
    const n = GC(t);
    return !!e.layoutTypes.includes(n);
  });
}
function zB({
  outputChoices: e
}) {
  const t = BB(), [n, r] = k.useState({
    layoutTypes: HC
  }), [i, o] = k.useState(
    null
  ), [a, l] = k.useState(
    e === "USER-CHOICE" ? "SINGLE-FILE" : e
  ), s = (f) => {
    o(
      (d) => d === f ? null : f
    );
  }, u = k.useMemo(
    () => UB(n),
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
        ({ title: p }) => p === i
      );
      if (!f)
        return;
      const d = RC(f.uiTree, {
        remove_namespace: !0
      });
      t(Q(M(M({}, f), d), {
        outputType: a
      }));
    }
  };
}
const WB = ["SINGLE-FILE", "MULTI-FILE"], jB = {
  "SINGLE-FILE": "Single file mode",
  "MULTI-FILE": "Multi file mode"
};
function YB({
  selectedOutput: e,
  setSelectedOutput: t
}) {
  return /* @__PURE__ */ L("form", { className: "App_TypeForm", children: [
    /* @__PURE__ */ y("legend", { children: "Generate app in:" }),
    WB.map((n) => {
      const r = jB[n];
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
const VB = {
  grid: "Grid",
  navbarPage: "Tabs"
};
function GB({
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
        /* @__PURE__ */ y("div", { className: "layout-options", children: HC.map((r) => {
          const i = VB[r], o = n.includes(r);
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
const JC = 294, $B = {
  "--card-w": `${JC}px`
};
function HB({
  selectedTemplate: e,
  setSelectedTemplate: t,
  templates: n = VC
}) {
  return n.length === 0 ? /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid empty-results", children: "No app templates fit current filters. Try broadening your search." }) : /* @__PURE__ */ y("div", { className: "TemplatePreviewGrid", style: $B, children: n.map((r) => /* @__PURE__ */ y(
    MB,
    {
      info: r,
      selected: r.title === e,
      onSelect: () => {
        t(r.title);
      },
      width_px: JC
    },
    r.title
  )) });
}
function JB(e) {
  const {
    filterState: t,
    setFilterState: n,
    shownTemplates: r,
    selectedTemplate: i,
    setSelectedTemplate: o,
    finishSelection: a,
    selectedOutput: l,
    setSelectedOutput: s
  } = zB(e), u = i !== null, c = u ? "Next" : "Select a template";
  return /* @__PURE__ */ y(
    LA,
    {
      main: /* @__PURE__ */ y(
        HB,
        {
          templates: r,
          selectedTemplate: i,
          setSelectedTemplate: o
        }
      ),
      left: /* @__PURE__ */ L(et, { children: [
        /* @__PURE__ */ y(va, { children: "Choose App Template" }),
        /* @__PURE__ */ L("div", { className: "TemplateChooserSidebar", children: [
          /* @__PURE__ */ y("section", { className: "instructions", children: "Hover over a template to see a description and what elements are used. Select the desired template and click next to edit." }),
          /* @__PURE__ */ y(
            GB,
            {
              filterState: t,
              setFilterState: n
            }
          ),
          e.outputChoices === "USER-CHOICE" ? /* @__PURE__ */ y(
            YB,
            {
              selectedOutput: l,
              setSelectedOutput: s
            }
          ) : null,
          /* @__PURE__ */ y(
            mt,
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
const QB = "_container_1d7pe_1", KB = {
  container: QB
};
function XB({
  goBackward: e,
  canGoBackward: t,
  goForward: n,
  canGoForward: r
}) {
  return /* @__PURE__ */ L("div", { className: Vt(KB.container, "undo-redo-buttons"), children: [
    /* @__PURE__ */ y(
      mt,
      {
        variant: ["transparent", "icon"],
        disabled: !t,
        "aria-label": "Undo last change",
        title: "Undo last change",
        onClick: e,
        children: /* @__PURE__ */ y(OI, { height: "100%" })
      }
    ),
    /* @__PURE__ */ y(
      mt,
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
function qB() {
  return fa(
    (t) => t.connected_to_server
  ) ? null : /* @__PURE__ */ y(FA, { onConfirm: () => {
  }, onCancel: () => {
  }, children: /* @__PURE__ */ y("p", { style: { color: "var(--red, pink)", textAlign: "center" }, children: "Lost connection to backend. Check console where editor was launched for details." }) });
}
const ZB = "_elementsPalette_qmlez_1", eU = "_OptionContainer_qmlez_18", tU = "_OptionItem_qmlez_24", nU = "_OptionIcon_qmlez_33", rU = "_OptionLabel_qmlez_41", rl = {
  elementsPalette: ZB,
  OptionContainer: eU,
  OptionItem: tU,
  OptionIcon: nU,
  OptionLabel: rU
};
function iU({ uiName: e }) {
  const {
    iconSrc: t,
    title: n,
    settingsInfo: r,
    description: i = n
  } = on[e], o = {
    uiName: e,
    uiArguments: nC(r)
  }, a = gE({ nodeInfo: { node: o } });
  return t === void 0 ? null : /* @__PURE__ */ y(
    _g,
    {
      popoverContent: i,
      contentIsMd: !0,
      openDelayMs: 500,
      triggerEl: /* @__PURE__ */ y("div", { className: rl.OptionContainer, children: /* @__PURE__ */ L(
        "div",
        Q(M({
          className: rl.OptionItem,
          "data-ui-name": e
        }, a), {
          children: [
            /* @__PURE__ */ y("img", { src: t, alt: n, className: rl.OptionIcon }),
            /* @__PURE__ */ y("label", { className: rl.OptionLabel, children: n })
          ]
        })
      ) })
    }
  );
}
const U0 = [
  "Inputs",
  "Outputs",
  "gridlayout",
  "uncategorized"
];
function oU(e, t) {
  var i, o;
  const n = U0.indexOf(
    ((i = on[e]) == null ? void 0 : i.category) || "uncategorized"
  ), r = U0.indexOf(
    ((o = on[t]) == null ? void 0 : o.category) || "uncategorized"
  );
  return n < r ? -1 : n > r ? 1 : 0;
}
function aU({
  availableUi: e = on
}) {
  const t = J.useMemo(
    () => Object.keys(e).sort(oU),
    [e]
  );
  return /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y(va, { children: "Elements" }),
    /* @__PURE__ */ y("div", { className: rl.elementsPalette, children: t.map((n) => /* @__PURE__ */ y(iU, { uiName: n }, n)) })
  ] });
}
function lU(e) {
  let t = [], n = {};
  for (let r in e)
    e[r].inputType === "omitted" ? t.push(r) : n[r] = e[r];
  return {
    omitted: t,
    nonOmittedFormInfo: n
  };
}
function sU({
  settings: e,
  settingsInfo: t,
  onSettingsChange: n
}) {
  const r = k_(
    Object.keys(e),
    Object.keys(t)
  );
  return r.length === 0 ? null : /* @__PURE__ */ L("section", { className: "unknown-arguments-list", children: [
    /* @__PURE__ */ y("div", { className: "divider-line", children: /* @__PURE__ */ y("label", { children: /* @__PURE__ */ y(
      dL,
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
              "aria-label": cU(e[i]),
              "data-balloon-pos": "left",
              style: { cursor: "inherit" },
              children: i
            }
          ),
          /* @__PURE__ */ y(
            Ei,
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
function uU(e) {
  return Bg(e) ? e.uiName === "unknownUiFunction" : !1;
}
const z0 = 50;
function cU(e) {
  let t = JSON.stringify(
    uU(e) ? e.uiArguments.text : e
  );
  return t.length > z0 + 4 && (t = t.substring(0, z0), t += "..."), "Value: " + t;
}
function fU(e) {
  const {
    settings: t,
    settingsInfo: n,
    onSettingsChange: r,
    renderInputs: i = ({ inputs: l }) => /* @__PURE__ */ y(et, { children: Object.values(l) })
  } = e, { nonOmittedFormInfo: o } = lU(n), a = {
    inputs: pU({
      settings: t,
      settingsInfo: o,
      onSettingsChange: r
    }),
    settings: t
  };
  return /* @__PURE__ */ L("form", { className: "FormBuilder", onSubmit: dU, children: [
    i(a),
    /* @__PURE__ */ y(sU, M({}, e))
  ] });
}
const dU = (e) => {
  e.preventDefault();
};
function pU({
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
    r[i] = /* @__PURE__ */ y(QA, M({}, l), i);
  }), r;
}
function hU({ node: e }) {
  const { sendMsg: t, mode: n } = is();
  if (n !== "VSCODE" || !e)
    return null;
  const { serverBindings: r } = on[e.uiName];
  return /* @__PURE__ */ L("div", { children: [
    /* @__PURE__ */ y(
      mU,
      {
        serverOutputInfo: r == null ? void 0 : r.outputs,
        node: e,
        sendMsg: t
      }
    ),
    /* @__PURE__ */ y(
      gU,
      {
        serverInputInfo: r == null ? void 0 : r.inputs,
        node: e,
        sendMsg: t
      }
    )
  ] });
}
function mU({
  serverOutputInfo: e,
  node: { uiArguments: t },
  sendMsg: n
}) {
  const r = NC();
  if (!(r.mode === "MAIN" && "output_positions" in r) || typeof e == "undefined")
    return null;
  const i = r.output_positions, o = r.server_pos, { outputIdKey: a, renderScaffold: l } = e, s = typeof a == "string" ? a : a(t), u = t[s];
  if (typeof u != "string")
    return null;
  const c = i[u];
  return /* @__PURE__ */ y(
    Ei,
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
function gU({
  serverInputInfo: e,
  node: { uiArguments: t },
  sendMsg: n
}) {
  if (typeof e == "undefined")
    return null;
  const { inputIdKey: r } = e, i = typeof r == "string" ? r : r(t), o = t[i];
  return typeof o != "string" ? null : /* @__PURE__ */ y(
    Ei,
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
const vU = "_container_1fh41_1", yU = "_node_1fh41_12", W0 = {
  container: vU,
  node: yU
};
function wU({
  tree: e,
  path: t,
  onSelect: n
}) {
  const r = UC(t, e), i = t.length;
  return /* @__PURE__ */ y("div", { className: W0.container, "aria-label": "Path to selected node", children: r.map((o, a) => {
    const l = a === i, s = bU(o);
    return /* @__PURE__ */ y(
      "div",
      {
        className: W0.node,
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
function bU(e) {
  return e.replace(/[a-z]+::/, "");
}
const SU = "_settingsPanel_a44hx_1", EU = "_currentElementAbout_a44hx_10", AU = "_settingsForm_a44hx_17", CU = "_settingsInputs_a44hx_24", xU = "_buttonsHolder_a44hx_28", kU = "_validationErrorMsg_a44hx_45", Zd = {
  settingsPanel: SU,
  currentElementAbout: EU,
  settingsForm: AU,
  settingsInputs: CU,
  buttonsHolder: xU,
  validationErrorMsg: kU
};
var OU = TU;
function TU(e, t) {
  var n = {};
  typeof t == "string" && (t = [].slice.call(arguments, 1));
  for (var r in e)
    (!e.hasOwnProperty || e.hasOwnProperty(r)) && t.indexOf(r) === -1 && (n[r] = e[r]);
  return n;
}
function IU(e) {
  const t = to(), [n, r] = sg(), [i, o] = J.useState(
    n !== null ? j0(e, n) : null
  ), a = J.useRef(!1), l = J.useCallback(
    (c) => {
      n && a.current && t(TC({ path: n, node: c }));
    },
    [t, n]
  );
  return J.useEffect(() => {
    if (a.current = !1, n === null) {
      o(null);
      return;
    }
    o(j0(e, n));
  }, [e, n]), J.useEffect(() => {
    i && l(i);
  }, [i, l]), {
    currentNode: i,
    updateArgumentsByName: (c, f) => {
      o(
        (d) => Q(M({}, d), {
          uiArguments: Q(M({}, d == null ? void 0 : d.uiArguments), { [c]: f })
        })
      ), a.current = !0;
    },
    deleteArgumentByName: (c) => {
      o((f) => {
        var d;
        return f === null ? f : Q(M({}, f), {
          uiArguments: OU(
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
function j0(...e) {
  try {
    return wi(...e);
  } catch (t) {
    return console.warn("Failed to get node. Args:", e), null;
  }
}
function PU({ tree: e }) {
  const {
    currentNode: t,
    updateArgumentsByName: n,
    deleteArgumentByName: r,
    selectedPath: i,
    setNodeSelection: o
  } = IU(e);
  if (i === null)
    return /* @__PURE__ */ y("div", { children: "Select an element to edit properties" });
  if (t === null)
    return /* @__PURE__ */ L("div", { children: [
      "Error finding requested node at path ",
      i.join(".")
    ] });
  const a = i.length === 0, { uiName: l, uiArguments: s } = t, u = on[l], c = mM(
    u.settingsInfo,
    t
  );
  return /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y(va, { children: "Properties" }),
    /* @__PURE__ */ L("div", { className: Zd.settingsPanel, children: [
      /* @__PURE__ */ y("div", { className: Zd.currentElementAbout, children: /* @__PURE__ */ y(
        wU,
        {
          tree: e,
          path: i,
          onSelect: o
        }
      ) }),
      /* @__PURE__ */ y(
        fU,
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
      /* @__PURE__ */ y(hU, { node: t }),
      /* @__PURE__ */ y("div", { className: Zd.buttonsHolder, children: a ? null : /* @__PURE__ */ y(mE, { path: i }) })
    ] })
  ] });
}
function _U() {
  const { sendMsg: e, mode: t } = is();
  return t !== "VSCODE" ? null : /* @__PURE__ */ L(et, { children: [
    /* @__PURE__ */ y(
      Ei,
      {
        text: "Open app code next to editor",
        onClick: () => {
          e({
            path: "OPEN-COMPANION-EDITOR",
            payload: "BESIDE"
          });
        },
        className: "OpenSideBySideWindowButton",
        children: /* @__PURE__ */ y(e3, {})
      }
    ),
    /* @__PURE__ */ y("div", { className: "divider" })
  ] });
}
const NU = {
  "--properties-panel-width": `${RA}px`
};
function DU() {
  const { state: e, errorInfo: t, history: n } = N9();
  let r;
  return t ? r = /* @__PURE__ */ L(Wh, { className: "message-mode", children: [
    /* @__PURE__ */ L("h2", { children: [
      "Error ",
      t.context ? `while ${t.context}` : ""
    ] }),
    /* @__PURE__ */ y("p", { className: "error-msg", children: t.msg })
  ] }) : e.mode === "LOADING" ? r = /* @__PURE__ */ y(Wh, { className: "message-mode", children: /* @__PURE__ */ y("h2", { children: "Loading initial state from server" }) }) : e.mode === "MAIN" ? r = /* @__PURE__ */ y(U_, { children: /* @__PURE__ */ y(
    LA,
    {
      main: /* @__PURE__ */ y(no, { node: e.ui_tree, path: [] }),
      left: /* @__PURE__ */ y(aU, {}),
      properties: /* @__PURE__ */ y(PU, { tree: e.ui_tree }),
      preview: /* @__PURE__ */ y(wB, {})
    }
  ) }) : r = /* @__PURE__ */ y(JB, M({}, e.options)), /* @__PURE__ */ L("div", { className: "EditorContainer", style: NU, children: [
    /* @__PURE__ */ L("header", { children: [
      /* @__PURE__ */ y(CB, { className: "shiny-logo" }),
      /* @__PURE__ */ y("h1", { className: "app-title", children: "Shiny UI Editor" }),
      /* @__PURE__ */ L("div", { className: "right", children: [
        e.mode === "MAIN" ? /* @__PURE__ */ L(et, { children: [
          /* @__PURE__ */ y(_U, {}),
          /* @__PURE__ */ y(BI, {})
        ] }) : null,
        /* @__PURE__ */ y("div", { className: "divider" }),
        /* @__PURE__ */ y(XB, M({}, n)),
        /* @__PURE__ */ y("div", { className: "spacer last" })
      ] })
    ] }),
    r,
    /* @__PURE__ */ y(qB, {})
  ] });
}
const RU = tg({
  name: "connectedToServer",
  initialState: !0,
  reducers: {
    DISCONNECTED_FROM_SERVER: (e, t) => !1
  }
}), LU = RU.reducer;
function FU(e, t) {
  const n = Math.min(e.length, t.length) - 1;
  return n <= 0 ? !0 : wE(e, t, n);
}
function MU({
  selectedPath: e,
  deletedPath: t
}) {
  if (e === null)
    return e;
  if (pa(t, e))
    return BU(e);
  if (e.length < t.length || !FU(e, t))
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
function BU(e) {
  return e.slice(0, e.length - 1);
}
const QC = og();
QC.startListening({
  actionCreator: PC,
  effect: (e, t) => Ca(void 0, null, function* () {
    const n = e.payload.path, r = t.getState().selected_path;
    if (r === null)
      return;
    const i = MU({
      selectedPath: r,
      deletedPath: n
    });
    t.dispatch(df({ path: i }));
  })
});
const UU = QC.middleware;
function zU({ fromPath: e, toPath: t }) {
  const n = Ui(e);
  if (Ui(t) < n)
    return t;
  const i = n - 1;
  if (e[i] > t[i])
    return t;
  const o = [...t];
  return o[i]--, o;
}
const KC = og();
KC.startListening({
  actionCreator: IC,
  effect: (e, t) => Ca(void 0, null, function* () {
    const n = e.payload;
    let r = n.path;
    pC(n) && (r = zU({
      fromPath: n.currentPath,
      toPath: r
    })), t.dispatch(df({ path: r }));
  })
});
const WU = KC.middleware, XC = og();
XC.startListening({
  actionCreator: _C,
  effect: (e, t) => Ca(void 0, null, function* () {
    t.dispatch(df({ path: [] }));
  })
});
const jU = XC.middleware, YU = t_({
  reducer: {
    app_info: S9,
    selected_path: j_,
    connected_to_server: LU
  },
  middleware: (e) => e().concat(UU).concat(WU).concat(jU)
});
function VU({ children: e }) {
  return /* @__PURE__ */ y(AP, { store: YU, children: e });
}
function GU(e) {
  return /* @__PURE__ */ y(VU, { children: /* @__PURE__ */ y(Rk, Q(M({}, e), { children: /* @__PURE__ */ y(DU, {}) })) });
}
function $U({
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
  tS(e).render(/* @__PURE__ */ y(GU, M({}, o)));
}
const HU = document.getElementById("root"), Y0 = !0;
Ca(void 0, null, function* () {
  try {
    const e = tx(), t = JU({
      messageDispatch: e,
      showMessages: Y0
    });
    $U({ container: HU, backendDispatch: t, showMessages: Y0 });
  } catch (e) {
  }
});
function JU({
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
    ix(l) ? i(l) : console.warn("Unknown message type", l);
  }), {
    sendMsg: (a) => {
      r("VSCode sendMsg()", a), n.postMessage(a);
    },
    incomingMsgs: { subscribe: e.subscribe },
    mode: "VSCODE"
  };
}
