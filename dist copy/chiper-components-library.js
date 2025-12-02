import * as m from "react";
import hr, { forwardRef as xr, createElement as ze } from "react";
import "react-dom";
var we = { exports: {} }, de = {};
var nr;
function dt() {
  if (nr) return de;
  nr = 1;
  var e = hr, r = Symbol.for("react.element"), n = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(l, d, p) {
    var u, h = {}, x = null, N = null;
    p !== void 0 && (x = "" + p), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (N = d.ref);
    for (u in d) o.call(d, u) && !a.hasOwnProperty(u) && (h[u] = d[u]);
    if (l && l.defaultProps) for (u in d = l.defaultProps, d) h[u] === void 0 && (h[u] = d[u]);
    return { $$typeof: r, type: l, key: x, ref: N, props: h, _owner: s.current };
  }
  return de.Fragment = n, de.jsx = c, de.jsxs = c, de;
}
var ue = {};
var or;
function ut() {
  return or || (or = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = hr, r = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), N = Symbol.for("react.offscreen"), S = Symbol.iterator, j = "@@iterator";
    function w(t) {
      if (t === null || typeof t != "object")
        return null;
      var f = S && t[S] || t[j];
      return typeof f == "function" ? f : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(t) {
      {
        for (var f = arguments.length, b = new Array(f > 1 ? f - 1 : 0), g = 1; g < f; g++)
          b[g - 1] = arguments[g];
        $("error", t, b);
      }
    }
    function $(t, f, b) {
      {
        var g = y.ReactDebugCurrentFrame, E = g.getStackAddendum();
        E !== "" && (f += "%s", b = b.concat([E]));
        var T = b.map(function(k) {
          return String(k);
        });
        T.unshift("Warning: " + f), Function.prototype.apply.call(console[t], console, T);
      }
    }
    var V = !1, X = !1, me = !1, be = !1, he = !1, Z;
    Z = Symbol.for("react.module.reference");
    function se(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === a || he || t === s || t === p || t === u || be || t === N || V || X || me || typeof t == "object" && t !== null && (t.$$typeof === x || t.$$typeof === h || t.$$typeof === c || t.$$typeof === l || t.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === Z || t.getModuleId !== void 0));
    }
    function ae(t, f, b) {
      var g = t.displayName;
      if (g)
        return g;
      var E = f.displayName || f.name || "";
      return E !== "" ? b + "(" + E + ")" : b;
    }
    function P(t) {
      return t.displayName || "Context";
    }
    function D(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case p:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case l:
            var f = t;
            return P(f) + ".Consumer";
          case c:
            var b = t;
            return P(b._context) + ".Provider";
          case d:
            return ae(t, t.render, "ForwardRef");
          case h:
            var g = t.displayName || null;
            return g !== null ? g : D(t.type) || "Memo";
          case x: {
            var E = t, T = E._payload, k = E._init;
            try {
              return D(k(T));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, G = 0, q, ie, Q, U, le, L, We;
    function Ve() {
    }
    Ve.__reactDisabledLog = !0;
    function $r() {
      {
        if (G === 0) {
          q = console.log, ie = console.info, Q = console.warn, U = console.error, le = console.group, L = console.groupCollapsed, We = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: Ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        G++;
      }
    }
    function Mr() {
      {
        if (G--, G === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, t, {
              value: q
            }),
            info: M({}, t, {
              value: ie
            }),
            warn: M({}, t, {
              value: Q
            }),
            error: M({}, t, {
              value: U
            }),
            group: M({}, t, {
              value: le
            }),
            groupCollapsed: M({}, t, {
              value: L
            }),
            groupEnd: M({}, t, {
              value: We
            })
          });
        }
        G < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Se = y.ReactCurrentDispatcher, Ee;
    function xe(t, f, b) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (E) {
            var g = E.stack.trim().match(/\n( *(at )?)/);
            Ee = g && g[1] || "";
          }
        return `
` + Ee + t;
      }
    }
    var _e = !1, ge;
    {
      var Lr = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new Lr();
    }
    function De(t, f) {
      if (!t || _e)
        return "";
      {
        var b = ge.get(t);
        if (b !== void 0)
          return b;
      }
      var g;
      _e = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var T;
      T = Se.current, Se.current = null, $r();
      try {
        if (f) {
          var k = function() {
            throw Error();
          };
          if (Object.defineProperty(k.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(k, []);
            } catch (z) {
              g = z;
            }
            Reflect.construct(t, [], k);
          } else {
            try {
              k.call();
            } catch (z) {
              g = z;
            }
            t.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (z) {
            g = z;
          }
          t();
        }
      } catch (z) {
        if (z && g && typeof z.stack == "string") {
          for (var C = z.stack.split(`
`), F = g.stack.split(`
`), O = C.length - 1, I = F.length - 1; O >= 1 && I >= 0 && C[O] !== F[I]; )
            I--;
          for (; O >= 1 && I >= 0; O--, I--)
            if (C[O] !== F[I]) {
              if (O !== 1 || I !== 1)
                do
                  if (O--, I--, I < 0 || C[O] !== F[I]) {
                    var W = `
` + C[O].replace(" at new ", " at ");
                    return t.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", t.displayName)), typeof t == "function" && ge.set(t, W), W;
                  }
                while (O >= 1 && I >= 0);
              break;
            }
        }
      } finally {
        _e = !1, Se.current = T, Mr(), Error.prepareStackTrace = E;
      }
      var re = t ? t.displayName || t.name : "", J = re ? xe(re) : "";
      return typeof t == "function" && ge.set(t, J), J;
    }
    function Wr(t, f, b) {
      return De(t, !1);
    }
    function Vr(t) {
      var f = t.prototype;
      return !!(f && f.isReactComponent);
    }
    function ve(t, f, b) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return De(t, Vr(t));
      if (typeof t == "string")
        return xe(t);
      switch (t) {
        case p:
          return xe("Suspense");
        case u:
          return xe("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case d:
            return Wr(t.render);
          case h:
            return ve(t.type, f, b);
          case x: {
            var g = t, E = g._payload, T = g._init;
            try {
              return ve(T(E), f, b);
            } catch {
            }
          }
        }
      return "";
    }
    var ce = Object.prototype.hasOwnProperty, Be = {}, Ge = y.ReactDebugCurrentFrame;
    function ye(t) {
      if (t) {
        var f = t._owner, b = ve(t.type, t._source, f ? f.type : null);
        Ge.setExtraStackFrame(b);
      } else
        Ge.setExtraStackFrame(null);
    }
    function Dr(t, f, b, g, E) {
      {
        var T = Function.call.bind(ce);
        for (var k in t)
          if (T(t, k)) {
            var C = void 0;
            try {
              if (typeof t[k] != "function") {
                var F = Error((g || "React class") + ": " + b + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw F.name = "Invariant Violation", F;
              }
              C = t[k](f, k, g, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              C = O;
            }
            C && !(C instanceof Error) && (ye(E), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", g || "React class", b, k, typeof C), ye(null)), C instanceof Error && !(C.message in Be) && (Be[C.message] = !0, ye(E), R("Failed %s type: %s", b, C.message), ye(null));
          }
      }
    }
    var Br = Array.isArray;
    function Pe(t) {
      return Br(t);
    }
    function Gr(t) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, b = f && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return b;
      }
    }
    function Ur(t) {
      try {
        return Ue(t), !1;
      } catch {
        return !0;
      }
    }
    function Ue(t) {
      return "" + t;
    }
    function Ye(t) {
      if (Ur(t))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gr(t)), Ue(t);
    }
    var He = y.ReactCurrentOwner, Yr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ke, qe;
    function Hr(t) {
      if (ce.call(t, "ref")) {
        var f = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Kr(t) {
      if (ce.call(t, "key")) {
        var f = Object.getOwnPropertyDescriptor(t, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function qr(t, f) {
      typeof t.ref == "string" && He.current;
    }
    function Jr(t, f) {
      {
        var b = function() {
          Ke || (Ke = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        b.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function Xr(t, f) {
      {
        var b = function() {
          qe || (qe = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        b.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var Zr = function(t, f, b, g, E, T, k) {
      var C = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: f,
        ref: b,
        props: k,
        // Record the component responsible for creating this element.
        _owner: T
      };
      return C._store = {}, Object.defineProperty(C._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(C, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.defineProperty(C, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
    };
    function Qr(t, f, b, g, E) {
      {
        var T, k = {}, C = null, F = null;
        b !== void 0 && (Ye(b), C = "" + b), Kr(f) && (Ye(f.key), C = "" + f.key), Hr(f) && (F = f.ref, qr(f, E));
        for (T in f)
          ce.call(f, T) && !Yr.hasOwnProperty(T) && (k[T] = f[T]);
        if (t && t.defaultProps) {
          var O = t.defaultProps;
          for (T in O)
            k[T] === void 0 && (k[T] = O[T]);
        }
        if (C || F) {
          var I = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          C && Jr(k, I), F && Xr(k, I);
        }
        return Zr(t, C, F, E, g, He.current, k);
      }
    }
    var Te = y.ReactCurrentOwner, Je = y.ReactDebugCurrentFrame;
    function ee(t) {
      if (t) {
        var f = t._owner, b = ve(t.type, t._source, f ? f.type : null);
        Je.setExtraStackFrame(b);
      } else
        Je.setExtraStackFrame(null);
    }
    var Ae;
    Ae = !1;
    function Oe(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function Xe() {
      {
        if (Te.current) {
          var t = D(Te.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function et(t) {
      return "";
    }
    var Ze = {};
    function rt(t) {
      {
        var f = Xe();
        if (!f) {
          var b = typeof t == "string" ? t : t.displayName || t.name;
          b && (f = `

Check the top-level render call using <` + b + ">.");
        }
        return f;
      }
    }
    function Qe(t, f) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var b = rt(f);
        if (Ze[b])
          return;
        Ze[b] = !0;
        var g = "";
        t && t._owner && t._owner !== Te.current && (g = " It was passed a child from " + D(t._owner.type) + "."), ee(t), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, g), ee(null);
      }
    }
    function er(t, f) {
      {
        if (typeof t != "object")
          return;
        if (Pe(t))
          for (var b = 0; b < t.length; b++) {
            var g = t[b];
            Oe(g) && Qe(g, f);
          }
        else if (Oe(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var E = w(t);
          if (typeof E == "function" && E !== t.entries)
            for (var T = E.call(t), k; !(k = T.next()).done; )
              Oe(k.value) && Qe(k.value, f);
        }
      }
    }
    function tt(t) {
      {
        var f = t.type;
        if (f == null || typeof f == "string")
          return;
        var b;
        if (typeof f == "function")
          b = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === h))
          b = f.propTypes;
        else
          return;
        if (b) {
          var g = D(f);
          Dr(b, t.props, "prop", g, t);
        } else if (f.PropTypes !== void 0 && !Ae) {
          Ae = !0;
          var E = D(f);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function nt(t) {
      {
        for (var f = Object.keys(t.props), b = 0; b < f.length; b++) {
          var g = f[b];
          if (g !== "children" && g !== "key") {
            ee(t), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", g), ee(null);
            break;
          }
        }
        t.ref !== null && (ee(t), R("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
      }
    }
    var rr = {};
    function tr(t, f, b, g, E, T) {
      {
        var k = se(t);
        if (!k) {
          var C = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var F = et();
          F ? C += F : C += Xe();
          var O;
          t === null ? O = "null" : Pe(t) ? O = "array" : t !== void 0 && t.$$typeof === r ? (O = "<" + (D(t.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?") : O = typeof t, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, C);
        }
        var I = Qr(t, f, b, E, T);
        if (I == null)
          return I;
        if (k) {
          var W = f.children;
          if (W !== void 0)
            if (g)
              if (Pe(W)) {
                for (var re = 0; re < W.length; re++)
                  er(W[re], t);
                Object.freeze && Object.freeze(W);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              er(W, t);
        }
        if (ce.call(f, "key")) {
          var J = D(t), z = Object.keys(f).filter(function(ct) {
            return ct !== "key";
          }), Ie = z.length > 0 ? "{key: someKey, " + z.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rr[J + Ie]) {
            var lt = z.length > 0 ? "{" + z.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ie, J, lt, J), rr[J + Ie] = !0;
          }
        }
        return t === o ? nt(I) : tt(I), I;
      }
    }
    function ot(t, f, b) {
      return tr(t, f, b, !0);
    }
    function st(t, f, b) {
      return tr(t, f, b, !1);
    }
    var at = st, it = ot;
    ue.Fragment = o, ue.jsx = at, ue.jsxs = it;
  })()), ue;
}
var sr;
function ft() {
  return sr || (sr = 1, process.env.NODE_ENV === "production" ? we.exports = dt() : we.exports = ut()), we.exports;
}
var i = ft();
function gr(e) {
  var r, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (r = 0; r < s; r++) e[r] && (n = gr(e[r])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function vr() {
  for (var e, r, n = 0, o = "", s = arguments.length; n < s; n++) (e = arguments[n]) && (r = gr(e)) && (o && (o += " "), o += r);
  return o;
}
const Me = "-", pt = (e) => {
  const r = bt(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (c) => {
      const l = c.split(Me);
      return l[0] === "" && l.length !== 1 && l.shift(), yr(l, r) || mt(c);
    },
    getConflictingClassGroupIds: (c, l) => {
      const d = n[c] || [];
      return l && o[c] ? [...d, ...o[c]] : d;
    }
  };
}, yr = (e, r) => {
  if (e.length === 0)
    return r.classGroupId;
  const n = e[0], o = r.nextPart.get(n), s = o ? yr(e.slice(1), o) : void 0;
  if (s)
    return s;
  if (r.validators.length === 0)
    return;
  const a = e.join(Me);
  return r.validators.find(({
    validator: c
  }) => c(a))?.classGroupId;
}, ar = /^\[(.+)\]$/, mt = (e) => {
  if (ar.test(e)) {
    const r = ar.exec(e)[1], n = r?.substring(0, r.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, bt = (e) => {
  const {
    theme: r,
    prefix: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return xt(Object.entries(e.classGroups), n).forEach(([a, c]) => {
    $e(c, o, a, r);
  }), o;
}, $e = (e, r, n, o) => {
  e.forEach((s) => {
    if (typeof s == "string") {
      const a = s === "" ? r : ir(r, s);
      a.classGroupId = n;
      return;
    }
    if (typeof s == "function") {
      if (ht(s)) {
        $e(s(o), r, n, o);
        return;
      }
      r.validators.push({
        validator: s,
        classGroupId: n
      });
      return;
    }
    Object.entries(s).forEach(([a, c]) => {
      $e(c, ir(r, a), n, o);
    });
  });
}, ir = (e, r) => {
  let n = e;
  return r.split(Me).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, ht = (e) => e.isThemeGetter, xt = (e, r) => r ? e.map(([n, o]) => {
  const s = o.map((a) => typeof a == "string" ? r + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([c, l]) => [r + c, l])) : a);
  return [n, s];
}) : e, gt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const s = (a, c) => {
    n.set(a, c), r++, r > e && (r = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let c = n.get(a);
      if (c !== void 0)
        return c;
      if ((c = o.get(a)) !== void 0)
        return s(a, c), c;
    },
    set(a, c) {
      n.has(a) ? n.set(a, c) : s(a, c);
    }
  };
}, wr = "!", vt = (e) => {
  const {
    separator: r,
    experimentalParseClassName: n
  } = e, o = r.length === 1, s = r[0], a = r.length, c = (l) => {
    const d = [];
    let p = 0, u = 0, h;
    for (let w = 0; w < l.length; w++) {
      let y = l[w];
      if (p === 0) {
        if (y === s && (o || l.slice(w, w + a) === r)) {
          d.push(l.slice(u, w)), u = w + a;
          continue;
        }
        if (y === "/") {
          h = w;
          continue;
        }
      }
      y === "[" ? p++ : y === "]" && p--;
    }
    const x = d.length === 0 ? l : l.substring(u), N = x.startsWith(wr), S = N ? x.substring(1) : x, j = h && h > u ? h - u : void 0;
    return {
      modifiers: d,
      hasImportantModifier: N,
      baseClassName: S,
      maybePostfixModifierPosition: j
    };
  };
  return n ? (l) => n({
    className: l,
    parseClassName: c
  }) : c;
}, yt = (e) => {
  if (e.length <= 1)
    return e;
  const r = [];
  let n = [];
  return e.forEach((o) => {
    o[0] === "[" ? (r.push(...n.sort(), o), n = []) : n.push(o);
  }), r.push(...n.sort()), r;
}, wt = (e) => ({
  cache: gt(e.cacheSize),
  parseClassName: vt(e),
  ...pt(e)
}), Ct = /\s+/, jt = (e, r) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: s
  } = r, a = [], c = e.trim().split(Ct);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const p = c[d], {
      modifiers: u,
      hasImportantModifier: h,
      baseClassName: x,
      maybePostfixModifierPosition: N
    } = n(p);
    let S = !!N, j = o(S ? x.substring(0, N) : x);
    if (!j) {
      if (!S) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (j = o(x), !j) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      S = !1;
    }
    const w = yt(u).join(":"), y = h ? w + wr : w, R = y + j;
    if (a.includes(R))
      continue;
    a.push(R);
    const $ = s(j, S);
    for (let V = 0; V < $.length; ++V) {
      const X = $[V];
      a.push(y + X);
    }
    l = p + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function kt() {
  let e = 0, r, n, o = "";
  for (; e < arguments.length; )
    (r = arguments[e++]) && (n = Cr(r)) && (o && (o += " "), o += n);
  return o;
}
const Cr = (e) => {
  if (typeof e == "string")
    return e;
  let r, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (r = Cr(e[o])) && (n && (n += " "), n += r);
  return n;
};
function Rt(e, ...r) {
  let n, o, s, a = c;
  function c(d) {
    const p = r.reduce((u, h) => h(u), e());
    return n = wt(p), o = n.cache.get, s = n.cache.set, a = l, l(d);
  }
  function l(d) {
    const p = o(d);
    if (p)
      return p;
    const u = jt(d, n);
    return s(d, u), u;
  }
  return function() {
    return a(kt.apply(null, arguments));
  };
}
const A = (e) => {
  const r = (n) => n[e] || [];
  return r.isThemeGetter = !0, r;
}, jr = /^\[(?:([a-z-]+):)?(.+)\]$/i, Nt = /^\d+\/\d+$/, St = /* @__PURE__ */ new Set(["px", "full", "screen"]), Et = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, _t = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Pt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, At = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, B = (e) => ne(e) || St.has(e) || Nt.test(e), Y = (e) => oe(e, "length", Wt), ne = (e) => !!e && !Number.isNaN(Number(e)), Fe = (e) => oe(e, "number", ne), fe = (e) => !!e && Number.isInteger(Number(e)), Ot = (e) => e.endsWith("%") && ne(e.slice(0, -1)), v = (e) => jr.test(e), H = (e) => Et.test(e), It = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ft = (e) => oe(e, It, kr), zt = (e) => oe(e, "position", kr), $t = /* @__PURE__ */ new Set(["image", "url"]), Mt = (e) => oe(e, $t, Dt), Lt = (e) => oe(e, "", Vt), pe = () => !0, oe = (e, r, n) => {
  const o = jr.exec(e);
  return o ? o[1] ? typeof r == "string" ? o[1] === r : r.has(o[1]) : n(o[2]) : !1;
}, Wt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  _t.test(e) && !Pt.test(e)
), kr = () => !1, Vt = (e) => Tt.test(e), Dt = (e) => At.test(e), Bt = () => {
  const e = A("colors"), r = A("spacing"), n = A("blur"), o = A("brightness"), s = A("borderColor"), a = A("borderRadius"), c = A("borderSpacing"), l = A("borderWidth"), d = A("contrast"), p = A("grayscale"), u = A("hueRotate"), h = A("invert"), x = A("gap"), N = A("gradientColorStops"), S = A("gradientColorStopPositions"), j = A("inset"), w = A("margin"), y = A("opacity"), R = A("padding"), $ = A("saturate"), V = A("scale"), X = A("sepia"), me = A("skew"), be = A("space"), he = A("translate"), Z = () => ["auto", "contain", "none"], se = () => ["auto", "hidden", "clip", "visible", "scroll"], ae = () => ["auto", v, r], P = () => [v, r], D = () => ["", B, Y], M = () => ["auto", ne, v], G = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], q = () => ["solid", "dashed", "dotted", "double", "none"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], U = () => ["", "0", v], le = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [ne, v];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [pe],
      spacing: [B, Y],
      blur: ["none", "", H, v],
      brightness: L(),
      borderColor: [e],
      borderRadius: ["none", "", "full", H, v],
      borderSpacing: P(),
      borderWidth: D(),
      contrast: L(),
      grayscale: U(),
      hueRotate: L(),
      invert: U(),
      gap: P(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ot, Y],
      inset: ae(),
      margin: ae(),
      opacity: L(),
      padding: P(),
      saturate: L(),
      scale: L(),
      sepia: U(),
      skew: L(),
      space: P(),
      translate: P()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [H]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": le()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": le()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...G(), v]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: se()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": se()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": se()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Z()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [j]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [j]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [j]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [j]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [j]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [j]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [j]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [j]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [j]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", fe, v]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ae()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", v]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: U()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: U()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", fe, v]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [pe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", fe, v]
        }, v]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": M()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": M()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [pe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [fe, v]
        }, v]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": M()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": M()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", v]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", v]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [x]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [x]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [x]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...Q()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Q(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...Q(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [R]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [R]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [R]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [R]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [R]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [R]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [R]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [R]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [R]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [w]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [w]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [w]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [w]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [w]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [w]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [w]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [w]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [w]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [be]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [be]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", v, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [v, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [v, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [H]
        }, H]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [v, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [v, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [v, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [v, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", H, Y]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Fe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [pe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", v]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ne, Fe]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", B, v]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", v]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", v]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [y]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...q(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", B, Y]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", B, v]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: P()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", v]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", v]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [y]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...G(), zt]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ft]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Mt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [S]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [N]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [N]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [N]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...q(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: q()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [s]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [s]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [s]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [s]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [s]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [s]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [s]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [s]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [s]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [s]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...q()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [B, v]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [B, Y]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: D()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [B, Y]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", H, Lt]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [pe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ie(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ie()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", H, v]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [p]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [h]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [$]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [X]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [p]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [h]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [$]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [X]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [c]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [c]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [c]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", v]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: L()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", v]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: L()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", v]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [V]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [V]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [V]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [fe, v]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [he]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [he]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [me]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [me]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", v]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", v]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": P()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", v]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [B, Y, Fe]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Gt = /* @__PURE__ */ Rt(Bt);
function _(...e) {
  return Gt(vr(e));
}
const Ut = m.forwardRef(
  ({
    title: e,
    description: r,
    icon: n,
    action: o,
    onClick: s,
    className: a,
    ...c
  }, l) => /* @__PURE__ */ i.jsxs(
    "div",
    {
      ref: l,
      onClick: s,
      className: _(
        "bg-white border border-[#ecebf0] rounded-xl p-5 flex gap-2",
        s && "cursor-pointer hover:shadow-md transition-shadow",
        a
      ),
      style: { width: "350px" },
      ...c,
      children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-center shrink-0", children: n }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ i.jsx(
            "h3",
            {
              className: "text-base leading-5 font-semibold text-[#312e4d] capitalize",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: e
            }
          ),
          /* @__PURE__ */ i.jsx(
            "p",
            {
              className: "text-sm leading-[18px] font-normal text-[#575385]",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: r
            }
          ),
          o && /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: (d) => {
                d.stopPropagation(), o.onClick();
              },
              className: "text-sm leading-[18px] font-semibold text-[#00995a] hover:underline self-start",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: o.label
            }
          )
        ] })
      ]
    }
  )
);
Ut.displayName = "ActionCard";
const Yt = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ht = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, n, o) => o ? o.toUpperCase() : n.toLowerCase()
), lr = (e) => {
  const r = Ht(e);
  return r.charAt(0).toUpperCase() + r.slice(1);
}, Rr = (...e) => e.filter((r, n, o) => !!r && r.trim() !== "" && o.indexOf(r) === n).join(" ").trim(), Kt = (e) => {
  for (const r in e)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
};
var qt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Jt = xr(
  ({
    color: e = "currentColor",
    size: r = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: s = "",
    children: a,
    iconNode: c,
    ...l
  }, d) => ze(
    "svg",
    {
      ref: d,
      ...qt,
      width: r,
      height: r,
      stroke: e,
      strokeWidth: o ? Number(n) * 24 / Number(r) : n,
      className: Rr("lucide", s),
      ...!a && !Kt(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...c.map(([p, u]) => ze(p, u)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
const K = (e, r) => {
  const n = xr(
    ({ className: o, ...s }, a) => ze(Jt, {
      ref: a,
      iconNode: r,
      className: Rr(
        `lucide-${Yt(lr(e))}`,
        `lucide-${e}`,
        o
      ),
      ...s
    })
  );
  return n.displayName = lr(e), n;
};
const Xt = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Zt = K("circle-check-big", Xt);
const Qt = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], en = K("circle-check", Qt);
const rn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], cr = K("info", rn);
const tn = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], nn = K("package", tn);
const on = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
], sn = K("receipt-text", on);
const an = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], ln = K("route", an);
const cn = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Nr = K("triangle-alert", cn);
const dn = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], un = K("x", dn), fn = m.forwardRef(
  ({
    variant: e = "information",
    title: r,
    description: n,
    icon: o,
    className: s,
    ...a
  }, c) => {
    const d = {
      warning: {
        container: "bg-[#fff3e8]",
        text: "text-[#d48620]",
        icon: /* @__PURE__ */ i.jsx(Nr, { size: 24, className: "text-[#d48620]" })
      },
      information: {
        container: "bg-[#e3f2ff]",
        text: "text-[#4087fb]",
        icon: /* @__PURE__ */ i.jsx(cr, { size: 24, className: "text-[#4087fb]" })
      },
      grey: {
        container: "bg-[#f4f4f4]",
        text: "text-[#6e6f6e]",
        icon: /* @__PURE__ */ i.jsx(cr, { size: 24, className: "text-[#202020]" })
      }
    }[e], p = o || d.icon;
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: c,
        className: _(
          "flex items-center gap-3 p-4 rounded-lg",
          d.container,
          d.text,
          s
        ),
        role: "alert",
        "aria-live": "polite",
        ...a,
        children: [
          /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0", children: p }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-0 flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "font-semibold text-sm leading-[18px]", children: r }),
            /* @__PURE__ */ i.jsx("div", { className: "font-normal text-sm leading-[18px]", children: n })
          ] })
        ]
      }
    );
  }
);
fn.displayName = "BannerAlerts";
function dr(e, r) {
  if (typeof e == "function")
    return e(r);
  e != null && (e.current = r);
}
function Le(...e) {
  return (r) => {
    let n = !1;
    const o = e.map((s) => {
      const a = dr(s, r);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let s = 0; s < o.length; s++) {
          const a = o[s];
          typeof a == "function" ? a() : dr(e[s], null);
        }
      };
  };
}
function Sr(...e) {
  return m.useCallback(Le(...e), e);
}
var pn = Symbol.for("react.lazy"), Ce = m[" use ".trim().toString()];
function mn(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Er(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === pn && "_payload" in e && mn(e._payload);
}
// @__NO_SIDE_EFFECTS__
function bn(e) {
  const r = /* @__PURE__ */ xn(e), n = m.forwardRef((o, s) => {
    let { children: a, ...c } = o;
    Er(a) && typeof Ce == "function" && (a = Ce(a._payload));
    const l = m.Children.toArray(a), d = l.find(vn);
    if (d) {
      const p = d.props.children, u = l.map((h) => h === d ? m.Children.count(p) > 1 ? m.Children.only(null) : m.isValidElement(p) ? p.props.children : null : h);
      return /* @__PURE__ */ i.jsx(r, { ...c, ref: s, children: m.isValidElement(p) ? m.cloneElement(p, void 0, u) : null });
    }
    return /* @__PURE__ */ i.jsx(r, { ...c, ref: s, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var hn = /* @__PURE__ */ bn("Slot");
// @__NO_SIDE_EFFECTS__
function xn(e) {
  const r = m.forwardRef((n, o) => {
    let { children: s, ...a } = n;
    if (Er(s) && typeof Ce == "function" && (s = Ce(s._payload)), m.isValidElement(s)) {
      const c = wn(s), l = yn(a, s.props);
      return s.type !== m.Fragment && (l.ref = o ? Le(o, c) : c), m.cloneElement(s, l);
    }
    return m.Children.count(s) > 1 ? m.Children.only(null) : null;
  });
  return r.displayName = `${e}.SlotClone`, r;
}
var gn = Symbol("radix.slottable");
function vn(e) {
  return m.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === gn;
}
function yn(e, r) {
  const n = { ...r };
  for (const o in r) {
    const s = e[o], a = r[o];
    /^on[A-Z]/.test(o) ? s && a ? n[o] = (...l) => {
      const d = a(...l);
      return s(...l), d;
    } : s && (n[o] = s) : o === "style" ? n[o] = { ...s, ...a } : o === "className" && (n[o] = [s, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function wn(e) {
  let r = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = r && "isReactWarning" in r && r.isReactWarning;
  return n ? e.ref : (r = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = r && "isReactWarning" in r && r.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const ur = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, fr = vr, Cn = (e, r) => (n) => {
  var o;
  if (r?.variants == null) return fr(e, n?.class, n?.className);
  const { variants: s, defaultVariants: a } = r, c = Object.keys(s).map((p) => {
    const u = n?.[p], h = a?.[p];
    if (u === null) return null;
    const x = ur(u) || ur(h);
    return s[p][x];
  }), l = n && Object.entries(n).reduce((p, u) => {
    let [h, x] = u;
    return x === void 0 || (p[h] = x), p;
  }, {}), d = r == null || (o = r.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((p, u) => {
    let { class: h, className: x, ...N } = u;
    return Object.entries(N).every((S) => {
      let [j, w] = S;
      return Array.isArray(w) ? w.includes({
        ...a,
        ...l
      }[j]) : {
        ...a,
        ...l
      }[j] === w;
    }) ? [
      ...p,
      h,
      x
    ] : p;
  }, []);
  return fr(e, c, d, n?.class, n?.className);
}, pr = Cn(
  "inline-flex items-center justify-center gap-2 rounded font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#00b56b] text-white border border-[#00b56b] hover:bg-[#00995a] hover:border-[#00995a] active:bg-[#007a48] active:border-[#007a48] disabled:bg-[#e0e0e0] disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]",
        secondary: "bg-transparent text-[#312e4d] border border-[#00b56b] hover:bg-[#e6f8ef] hover:border-[#00995a] active:bg-[#00b56b]/10 active:border-[#007a48] disabled:bg-transparent disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]",
        alert: "bg-[#ff305f] text-white border border-[#a80023] hover:bg-[#d4002c] hover:border-[#a80023] active:bg-[#a80023] active:border-[#a80023] disabled:bg-[#e0e0e0] disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]",
        ghost: "bg-transparent text-[#00995a] border-0 hover:bg-[#e6f8ef] hover:text-[#00995a] active:bg-[#00b56b]/10 active:text-[#007a48] disabled:bg-transparent disabled:text-[#9e9e9e]",
        plain: "bg-transparent text-[#00995a] border-0 p-0 h-auto hover:text-[#00995a] hover:underline active:text-[#007a48] disabled:text-[#9e9e9e] disabled:no-underline"
      },
      size: {
        small: "h-8 px-3 py-2 text-sm",
        medium: "h-9 px-4 py-2 text-sm",
        large: "h-11 px-5 py-2.5 text-base"
      },
      iconOnly: {
        true: "aspect-square"
      }
    },
    compoundVariants: [
      {
        size: "small",
        iconOnly: !0,
        className: "h-8 w-8 p-0"
      },
      {
        size: "medium",
        iconOnly: !0,
        className: "h-10 w-10 p-0"
      },
      {
        size: "large",
        iconOnly: !0,
        className: "h-11 w-11 p-0"
      },
      {
        variant: "plain",
        size: "small",
        className: "h-auto px-0 py-0"
      },
      {
        variant: "plain",
        size: "medium",
        className: "h-auto px-0 py-0"
      },
      {
        variant: "plain",
        size: "large",
        className: "h-auto px-0 py-0"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium",
      iconOnly: !1
    }
  }
), jn = m.forwardRef(
  ({
    className: e,
    variant: r,
    size: n,
    iconOnly: o,
    asChild: s = !1,
    leftIcon: a,
    rightIcon: c,
    children: l,
    ...d
  }, p) => {
    const u = s ? hn : "button";
    return s ? /* @__PURE__ */ i.jsx(
      u,
      {
        className: _(pr({ variant: r, size: n, iconOnly: o, className: e })),
        ref: p,
        ...d,
        children: l
      }
    ) : /* @__PURE__ */ i.jsxs(
      u,
      {
        className: _(pr({ variant: r, size: n, iconOnly: o, className: e })),
        ref: p,
        ...d,
        children: [
          a && !o && /* @__PURE__ */ i.jsx("span", { className: "inline-flex shrink-0", children: a }),
          o && a || l,
          c && !o && /* @__PURE__ */ i.jsx("span", { className: "inline-flex shrink-0", children: c })
        ]
      }
    );
  }
);
jn.displayName = "Button";
const te = {
  largeDark: "https://www.figma.com/api/mcp/asset/4d8371e7-dff3-4ec8-bbce-b93185151f4c",
  largeLight: "https://www.figma.com/api/mcp/asset/8a7267d5-2fb8-494e-a13a-3795b42fde22",
  smallDark: "https://www.figma.com/api/mcp/asset/9d2e5067-f587-40b6-b0a5-5ce6da0aad4c",
  smallLight: "https://www.figma.com/api/mcp/asset/f01bbe9b-2dae-44fe-892f-97ff47e10e8e",
  gradientLarge: "https://www.figma.com/api/mcp/asset/972e7e1a-3343-4868-9c4d-97d6dfce3ce8"
}, kn = m.forwardRef(
  ({
    size: e = "large",
    mode: r = "dark",
    gradient: n = !1,
    className: o,
    alt: s = "Chiperos Logo",
    ...a
  }, c) => {
    const l = () => n && e === "large" ? te.gradientLarge : e === "large" && r === "dark" ? te.largeDark : e === "large" && r === "light" ? te.largeLight : e === "small" && r === "dark" ? te.smallDark : e === "small" && r === "light" ? te.smallLight : te.largeDark, d = {
      large: { width: 143, height: 32 },
      small: { width: 40, height: 32 }
    }, { width: p, height: u } = d[e];
    return /* @__PURE__ */ i.jsx(
      "img",
      {
        ref: c,
        src: l(),
        alt: s,
        width: p,
        height: u,
        className: _("inline-block", o),
        ...a
      }
    );
  }
);
kn.displayName = "BrandIcons";
const Rn = m.forwardRef(
  ({
    columns: e,
    gap: r = 4,
    tabletColumns: n,
    mobileColumns: o = 1,
    children: s,
    className: a,
    style: c,
    ...l
  }, d) => {
    const p = () => typeof r == "number" ? `gap-${r}` : "", u = () => {
      const x = [];
      return x.push(`grid-cols-${o}`), n && x.push(`md:grid-cols-${n}`), x.push(`lg:grid-cols-${e}`), x.join(" ");
    }, h = typeof r == "string" ? { gap: r, ...c } : c;
    return /* @__PURE__ */ i.jsx(
      "div",
      {
        ref: d,
        className: _(
          "grid w-full",
          p(),
          u(),
          a
        ),
        style: h,
        ...l,
        children: m.Children.map(s, (x) => m.isValidElement(x) ? m.cloneElement(x, {
          ...x.props,
          className: _("w-full", x.props.className)
        }) : x)
      }
    );
  }
);
Rn.displayName = "CardsGrid";
const Nn = m.forwardRef(
  ({
    title: e,
    description: r,
    icon: n,
    iconBackground: o = "#e6f8ef",
    onClick: s,
    className: a,
    ...c
  }, l) => /* @__PURE__ */ i.jsxs(
    "div",
    {
      ref: l,
      onClick: s,
      className: _(
        "bg-white border border-[#ecebf0] rounded-lg p-8 flex flex-col items-center gap-8 w-96",
        s && "cursor-pointer hover:shadow-md transition-shadow",
        a
      ),
      ...c,
      children: [
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "flex items-center justify-center rounded-lg shrink-0",
            style: {
              width: "56px",
              height: "56px",
              backgroundColor: o
            },
            children: n
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2 items-center text-center", style: { width: "300px" }, children: [
          /* @__PURE__ */ i.jsx(
            "h3",
            {
              className: "text-2xl leading-8 font-medium text-[#312e4d]",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: e
            }
          ),
          /* @__PURE__ */ i.jsx(
            "p",
            {
              className: "text-base leading-5 font-normal text-[#575385]",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: r
            }
          )
        ] })
      ]
    }
  )
);
Nn.displayName = "FeatureCard";
const Sn = m.forwardRef(
  ({
    icon: e,
    primaryText: r,
    primaryTextColor: n = "#312e4d",
    secondaryText: o,
    secondaryTextColor: s = "#575385",
    rightIcon: a,
    className: c,
    ...l
  }, d) => /* @__PURE__ */ i.jsxs(
    "div",
    {
      ref: d,
      className: _(
        "flex items-center justify-between w-full",
        c
      ),
      ...l,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ i.jsx("div", { className: "shrink-0", children: e }),
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: "text-xs leading-[14px] font-normal whitespace-nowrap",
              style: {
                fontFamily: "Causten Round, sans-serif",
                color: n
              },
              children: r
            }
          ),
          o && /* @__PURE__ */ i.jsx(
            "span",
            {
              className: "text-xs leading-[14px] font-normal whitespace-nowrap",
              style: {
                fontFamily: "Causten Round, sans-serif",
                color: s
              },
              children: o
            }
          )
        ] }),
        a && /* @__PURE__ */ i.jsx("div", { className: "shrink-0", children: a })
      ]
    }
  )
);
Sn.displayName = "KPIComparisonCustom";
const En = ({ className: e }) => /* @__PURE__ */ i.jsxs(
  "svg",
  {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    children: [
      /* @__PURE__ */ i.jsx(
        "path",
        {
          d: "M11 3L6.5 7.5L4 5L1 8",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "path",
        {
          d: "M8 3H11V6",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ]
  }
), _n = ({ className: e }) => /* @__PURE__ */ i.jsxs(
  "svg",
  {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    children: [
      /* @__PURE__ */ i.jsx(
        "path",
        {
          d: "M11 9L6.5 4.5L4 7L1 4",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "path",
        {
          d: "M8 9H11V6",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ]
  }
), Pn = ({ className: e }) => /* @__PURE__ */ i.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    children: [
      /* @__PURE__ */ i.jsx(
        "circle",
        {
          cx: "8",
          cy: "8",
          r: "6.375",
          stroke: "currentColor",
          strokeWidth: "1.25"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "path",
        {
          d: "M8 4.5V8.5",
          stroke: "currentColor",
          strokeWidth: "1.25",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "circle",
        {
          cx: "8",
          cy: "11",
          r: "0.5",
          fill: "currentColor"
        }
      )
    ]
  }
), _r = m.forwardRef(
  ({
    percentage: e,
    trend: r,
    label: n = "KPI comparison",
    showWarning: o = !1,
    className: s,
    ...a
  }, c) => {
    const l = r === "positive", d = e > 0 ? `+${e.toFixed(1)}%` : `${e.toFixed(1)}%`;
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: c,
        className: _(
          "flex items-center justify-between w-full",
          s
        ),
        ...a,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1", children: [
            l ? /* @__PURE__ */ i.jsx(En, { className: "text-[#00995a] shrink-0" }) : /* @__PURE__ */ i.jsx(_n, { className: "text-[#d4002c] shrink-0" }),
            /* @__PURE__ */ i.jsx(
              "span",
              {
                className: _(
                  "text-xs leading-[14px] font-normal whitespace-nowrap",
                  l ? "text-[#00995a]" : "text-[#d4002c]"
                ),
                style: { fontFamily: "Causten Round, sans-serif" },
                children: d
              }
            ),
            /* @__PURE__ */ i.jsx(
              "span",
              {
                className: "text-xs leading-[14px] font-normal text-[#575385] whitespace-nowrap",
                style: { fontFamily: "Causten Round, sans-serif" },
                children: n
              }
            )
          ] }),
          o && /* @__PURE__ */ i.jsx(Pn, { className: "text-[#d4002c] shrink-0" })
        ]
      }
    );
  }
);
_r.displayName = "KPIComparison";
const mr = {
  default: {
    bg: "#f4f4f4",
    border: "#c6c6c6",
    text: "#6e6f6e"
  },
  red: {
    bg: "#ffecf0",
    border: "#ff8ea7",
    text: "#ff305f"
  },
  green: {
    bg: "#e6f7f0",
    border: "#8ed9b8",
    text: "#00995a"
  },
  blue: {
    bg: "#e8f4fd",
    border: "#8ec9ed",
    text: "#0066cc"
  },
  yellow: {
    bg: "#fff9e6",
    border: "#ffd966",
    text: "#cc8800"
  }
}, Tn = m.forwardRef(
  ({
    title: e,
    content: r,
    description: n,
    footer: o,
    tag: s,
    icon: a,
    onClick: c,
    className: l,
    ...d
  }, p) => {
    const u = s ? mr[s.variant || "default"] : mr.default;
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: p,
        onClick: c,
        className: _(
          "bg-white border border-[#ecebf0] rounded-xl p-5 px-8 flex gap-2",
          c && "cursor-pointer hover:shadow-md transition-shadow",
          l
        ),
        ...d,
        children: [
          /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-center shrink-0", children: a }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2 w-full", children: [
              /* @__PURE__ */ i.jsx(
                "h3",
                {
                  className: "text-base leading-5 font-medium text-[#575385] flex-1 min-w-0",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: e
                }
              ),
              s && /* @__PURE__ */ i.jsx(
                "span",
                {
                  className: "px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border shrink-0",
                  style: {
                    backgroundColor: u.bg,
                    borderColor: u.border,
                    color: u.text,
                    fontFamily: "Causten Round, sans-serif"
                  },
                  children: s.label
                }
              )
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "min-w-0", children: r }),
            n && /* @__PURE__ */ i.jsx("div", { className: "min-w-0", children: n }),
            o && /* @__PURE__ */ i.jsx("div", { className: "min-w-0", children: o })
          ] })
        ]
      }
    );
  }
);
Tn.displayName = "KPICardCustom";
const An = ({ color: e = "#312e4d" }) => /* @__PURE__ */ i.jsx(
  Nr,
  {
    size: 32,
    color: e,
    strokeWidth: 2
  }
), On = m.forwardRef(
  ({
    title: e,
    value: r,
    unit: n = "%",
    total: o,
    description: s,
    comparison: a,
    tag: c,
    icon: l,
    iconColor: d = "primary",
    bodyText: p,
    button: u,
    onClick: h,
    className: x,
    ...N
  }, S) => {
    const j = {
      primary: "#312e4d",
      error: "#d4002c",
      brand: "#00995a"
    }, y = {
      default: {
        bg: "#f4f4f4",
        border: "#c6c6c6",
        text: "#6e6f6e"
      },
      red: {
        bg: "#ffecf0",
        border: "#ff8ea7",
        text: "#ff305f"
      }
    }[c?.variant || "default"];
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: S,
        onClick: h,
        className: _(
          "bg-white border border-[#ecebf0] rounded-xl p-5 px-8 flex gap-2",
          h && "cursor-pointer hover:shadow-md transition-shadow",
          x
        ),
        ...N,
        children: [
          /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-center shrink-0", children: l || /* @__PURE__ */ i.jsx(An, { color: j[d] }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2 w-full", children: [
              /* @__PURE__ */ i.jsx(
                "h3",
                {
                  className: "text-base leading-5 font-medium text-[#575385] flex-1 min-w-0",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: e
                }
              ),
              c && /* @__PURE__ */ i.jsx(
                "span",
                {
                  className: "px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border shrink-0",
                  style: {
                    backgroundColor: y.bg,
                    borderColor: y.border,
                    color: y.text,
                    fontFamily: "Causten Round, sans-serif"
                  },
                  children: c.label
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-1", children: [
              /* @__PURE__ */ i.jsx(
                "span",
                {
                  className: "text-xl leading-[22px] font-semibold text-[#312e4d]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: r
                }
              ),
              o !== void 0 ? /* @__PURE__ */ i.jsxs(
                "span",
                {
                  className: "text-base leading-[18px] font-medium text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: [
                    "/",
                    o
                  ]
                }
              ) : n ? /* @__PURE__ */ i.jsx(
                "span",
                {
                  className: "text-xs leading-[18px] font-medium text-[#312e4d]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: n
                }
              ) : null,
              s && /* @__PURE__ */ i.jsx(
                "span",
                {
                  className: "text-sm leading-[18px] font-normal text-[#575385] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-right",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: s
                }
              )
            ] }),
            p && /* @__PURE__ */ i.jsx(
              "p",
              {
                className: "text-sm leading-[18px] font-normal text-[#575385]",
                style: { fontFamily: "Causten Round, sans-serif" },
                children: p
              }
            ),
            a && /* @__PURE__ */ i.jsx(
              _r,
              {
                percentage: a.percentage,
                trend: a.trend,
                label: a.label,
                showWarning: a.showWarning
              }
            ),
            u && /* @__PURE__ */ i.jsx(
              "button",
              {
                onClick: (R) => {
                  R.stopPropagation(), u.onClick?.();
                },
                className: "text-sm leading-[18px] font-semibold text-[#00995a] text-left self-start hover:underline",
                style: { fontFamily: "Causten Round, sans-serif" },
                children: u.label
              }
            )
          ] })
        ]
      }
    );
  }
);
On.displayName = "KPICard";
const In = m.forwardRef(
  ({
    type: e = "spinner",
    show: r = !0,
    variant: n = "active",
    size: o = 48,
    width: s = 230,
    className: a,
    ...c
  }, l) => {
    if (!r)
      return null;
    const p = {
      active: "#00b56b",
      disabled: "#a29fba"
    }[n];
    return e === "spinner" ? /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: l,
        className: _("inline-flex items-center justify-center", a),
        role: "status",
        "aria-label": "Cargando",
        ...c,
        children: [
          /* @__PURE__ */ i.jsx(
            "div",
            {
              className: "rounded-full animate-spin",
              style: {
                width: o,
                height: o,
                border: "4px solid transparent",
                borderTopColor: p,
                borderRightColor: p
              }
            }
          ),
          /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: "Cargando..." })
        ]
      }
    ) : /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: l,
        className: _("relative overflow-hidden rounded-full bg-gray-200", a),
        style: {
          width: s,
          height: 8
        },
        role: "progressbar",
        "aria-label": "Cargando",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        ...c,
        children: [
          /* @__PURE__ */ i.jsx(
            "div",
            {
              className: "absolute top-0 left-0 h-full rounded-full",
              style: {
                backgroundColor: p,
                animation: "linear-progress 1.5s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: "Cargando..." })
        ]
      }
    );
  }
);
In.displayName = "Loader";
const Fn = m.forwardRef(
  ({
    title: e,
    description: r,
    value: n,
    selected: o = !1,
    onSelect: s,
    disabled: a,
    className: c,
    ...l
  }, d) => {
    const p = () => {
      !a && s && s(n);
    };
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: d,
        onClick: p,
        className: _(
          "bg-white border border-solid rounded-xl p-4 flex flex-col gap-1 transition-all cursor-pointer",
          o ? "border-[#00b56b]" : "border-[#ecebf0]",
          a && "opacity-50 cursor-not-allowed",
          !a && "hover:shadow-sm",
          c
        ),
        ...l,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex gap-3 items-center h-6", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-center shrink-0 w-6 h-6", children: /* @__PURE__ */ i.jsx(
              "div",
              {
                className: _(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  o ? "border-[#00995a]" : "border-[#a29fba]"
                ),
                children: o && /* @__PURE__ */ i.jsx("div", { className: "w-3 h-3 rounded-full bg-[#00995a]" })
              }
            ) }),
            /* @__PURE__ */ i.jsx(
              "h3",
              {
                className: "text-base leading-5 font-medium text-[#312e4d] flex-1",
                style: { fontFamily: "Causten Round, sans-serif" },
                children: e
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "pl-9", children: /* @__PURE__ */ i.jsx(
            "p",
            {
              className: "text-sm leading-[18px] font-normal text-[#575385]",
              style: { fontFamily: "Causten Round, sans-serif" },
              children: r
            }
          ) })
        ]
      }
    );
  }
);
Fn.displayName = "OptionCard";
const br = {
  default: {
    bg: "#f4f4f4",
    border: "#c6c6c6",
    text: "#6e6f6e"
  },
  red: {
    bg: "#ffecf0",
    border: "#ff8ea7",
    text: "#ff305f"
  },
  green: {
    bg: "#e6f7f0",
    border: "#8ed9b8",
    text: "#00995a"
  },
  blue: {
    bg: "#e8f4fd",
    border: "#8ec9ed",
    text: "#0066cc"
  }
}, zn = m.forwardRef(
  ({
    title: e,
    count: r,
    countLabel: n = "orders",
    infoLine1: o,
    infoLine2: s,
    icon: a,
    badge: c,
    button: l,
    className: d,
    ...p
  }, u) => {
    const h = c ? br[c.variant || "default"] : br.default;
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: u,
        className: _(
          "bg-white border border-[#ecebf0] rounded-xl p-5 flex gap-2",
          d
        ),
        ...p,
        children: [
          /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-center shrink-0", children: a }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex gap-2 items-start justify-end min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col gap-1 min-w-0", children: [
              /* @__PURE__ */ i.jsx(
                "h3",
                {
                  className: "text-base leading-5 font-medium text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: e
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-1", children: [
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: "text-xl leading-[22px] font-semibold text-[#312e4d]",
                    style: { fontFamily: "Causten Round, sans-serif" },
                    children: r
                  }
                ),
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: "text-base leading-[18px] font-medium text-[#575385]",
                    style: { fontFamily: "Causten Round, sans-serif" },
                    children: n
                  }
                )
              ] }),
              o && /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "text-xs leading-normal font-normal text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: o
                }
              ),
              s && /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "text-xs leading-normal font-normal text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: s
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 items-end justify-end pb-[33px]", children: [
              c && /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: (x) => {
                    x.stopPropagation(), c.onClick?.();
                  },
                  disabled: !c.onClick,
                  className: _(
                    "px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border transition-opacity",
                    c.onClick && "hover:opacity-80 cursor-pointer"
                  ),
                  style: {
                    fontFamily: "Causten Round, sans-serif",
                    height: "24px",
                    backgroundColor: h.bg,
                    borderColor: h.border,
                    color: h.text
                  },
                  children: c.label
                }
              ),
              l && /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: (x) => {
                    x.stopPropagation(), l.onClick?.();
                  },
                  className: "text-sm leading-[18px] font-semibold text-[#00995a] hover:underline",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: l.label
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
);
zn.displayName = "OrderCardCustom";
const je = "#00995a", ke = 32, Re = 2, $n = () => /* @__PURE__ */ i.jsx(
  sn,
  {
    size: ke,
    color: je,
    strokeWidth: Re
  }
), Mn = () => /* @__PURE__ */ i.jsx(
  nn,
  {
    size: ke,
    color: je,
    strokeWidth: Re
  }
), Ln = () => /* @__PURE__ */ i.jsx(
  ln,
  {
    size: ke,
    color: je,
    strokeWidth: Re
  }
), Wn = () => /* @__PURE__ */ i.jsx(
  en,
  {
    size: ke,
    color: je,
    strokeWidth: Re
  }
), Vn = {
  received: {
    title: "Received",
    icon: $n
  },
  picking: {
    title: "Picking",
    icon: Mn
  },
  dispatched: {
    title: "Dispatched",
    icon: Ln
  },
  delivered: {
    title: "Delivered",
    icon: Wn
  }
}, Dn = m.forwardRef(
  ({
    state: e,
    count: r,
    countLabel: n = "orders",
    grossSales: o,
    netSales: s,
    hasDelays: a = !1,
    delayCount: c,
    onDelaysClick: l,
    onFilterClick: d,
    icon: p,
    currencySymbol: u = "$",
    className: h,
    ...x
  }, N) => {
    const S = Vn[e], j = p || S.icon, w = (y) => `${u}${y.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: N,
        className: _(
          "bg-white border border-[#ecebf0] rounded-xl p-5 flex gap-2",
          h
        ),
        ...x,
        children: [
          /* @__PURE__ */ i.jsx("div", { className: "flex items-start justify-center shrink-0", children: typeof j == "function" ? /* @__PURE__ */ i.jsx(j, {}) : j }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex gap-2 items-start justify-end min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col gap-1 min-w-0", children: [
              /* @__PURE__ */ i.jsx(
                "h3",
                {
                  className: "text-base leading-5 font-medium text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: S.title
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-1", children: [
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: "text-xl leading-[22px] font-semibold text-[#312e4d]",
                    style: { fontFamily: "Causten Round, sans-serif" },
                    children: r
                  }
                ),
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: "text-base leading-[18px] font-medium text-[#575385]",
                    style: { fontFamily: "Causten Round, sans-serif" },
                    children: n
                  }
                )
              ] }),
              /* @__PURE__ */ i.jsxs(
                "div",
                {
                  className: "flex gap-1 text-xs leading-normal font-light text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: [
                    /* @__PURE__ */ i.jsx("span", { children: "Gross Sales:" }),
                    /* @__PURE__ */ i.jsx("span", { children: w(o) })
                  ]
                }
              ),
              /* @__PURE__ */ i.jsxs(
                "div",
                {
                  className: "flex gap-1 text-xs leading-normal font-light text-[#575385]",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: [
                    /* @__PURE__ */ i.jsx("span", { children: "Net Sales:" }),
                    /* @__PURE__ */ i.jsx("span", { children: w(s) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 items-end justify-end pl-12 pb-[33px]", children: [
              a && /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: (y) => {
                    y.stopPropagation(), l?.();
                  },
                  className: "px-2 rounded-2xl text-[12px] leading-[18px] font-light border bg-[#ffecf0] border-[#ff8ea7] text-[#ff305f] hover:opacity-80 transition-opacity",
                  style: { fontFamily: "Causten Round, sans-serif", height: "24px" },
                  children: c ? `${c} Delays` : "Delays"
                }
              ),
              d && /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: (y) => {
                    y.stopPropagation(), d();
                  },
                  className: "text-sm leading-[18px] font-medium text-[#00995a] hover:underline",
                  style: { fontFamily: "Causten Round, sans-serif" },
                  children: "Filter"
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
);
Dn.displayName = "OrderCard";
const ho = ({
  currentPage: e,
  totalPages: r,
  onPageChange: n
}) => {
  const o = () => {
    e > 1 && n(e - 1);
  }, s = () => {
    e < r && n(e + 1);
  }, a = (d) => {
    n(d);
  }, l = (() => {
    const d = [];
    if (r <= 6)
      for (let u = 1; u <= r; u++)
        d.push(u);
    else if (d.push(1), e <= 3) {
      for (let u = 2; u <= 4; u++)
        d.push(u);
      d.push("..."), d.push(r);
    } else if (e >= r - 2) {
      d.push("...");
      for (let u = r - 2; u <= r; u++)
        d.push(u);
    } else {
      d.push("...");
      for (let u = e - 1; u <= e + 1; u++)
        d.push(u);
      d.push("..."), d.push(r);
    }
    return d;
  })();
  return /* @__PURE__ */ i.jsxs("div", { className: "flex gap-1.5 items-center", children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        onClick: o,
        disabled: e === 1,
        className: _(
          "border rounded bg-transparent p-1 flex items-center justify-center w-[28px] h-[28px]",
          e === 1 ? "border-[#ecebf0] cursor-not-allowed" : "border-[#ecebf0] cursor-pointer hover:bg-gray-50"
        ),
        children: /* @__PURE__ */ i.jsx("i", { className: "tabler-chevron-left text-sm text-[#312e4d]" })
      }
    ),
    l.map((d, p) => {
      if (d === "...")
        return /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "border border-[#ecebf0] rounded p-1 h-[28px] w-[28px] flex items-center justify-center",
            children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-[#575385] text-center", children: "..." })
          },
          `ellipsis-${p}`
        );
      const u = d, h = u === e;
      return /* @__PURE__ */ i.jsx(
        "button",
        {
          onClick: () => a(u),
          className: _(
            "border rounded bg-transparent p-1 h-[28px] w-[28px] flex items-center justify-center px-1",
            h ? "border-[#a29fba] bg-white" : "border-[#ecebf0] hover:bg-gray-50"
          ),
          children: /* @__PURE__ */ i.jsx(
            "p",
            {
              className: _(
                "text-xs text-center",
                h ? "text-[#312e4d]" : "text-[#a29fba]"
              ),
              children: u
            }
          )
        },
        u
      );
    }),
    /* @__PURE__ */ i.jsx(
      "button",
      {
        onClick: s,
        disabled: e === r,
        className: _(
          "border rounded bg-transparent p-1 flex items-center justify-center h-[28px]",
          e === r ? "border-[#ecebf0] cursor-not-allowed" : "border-[#ecebf0] cursor-pointer hover:bg-gray-50"
        ),
        children: /* @__PURE__ */ i.jsx("i", { className: "tabler-chevron-right text-sm text-[#312e4d]" })
      }
    )
  ] });
};
function Bn(e, r, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(s) {
    if (e?.(s), n === !1 || !s.defaultPrevented)
      return r?.(s);
  };
}
function Gn(e, r = []) {
  let n = [];
  function o(a, c) {
    const l = m.createContext(c), d = n.length;
    n = [...n, c];
    const p = (h) => {
      const { scope: x, children: N, ...S } = h, j = x?.[e]?.[d] || l, w = m.useMemo(() => S, Object.values(S));
      return /* @__PURE__ */ i.jsx(j.Provider, { value: w, children: N });
    };
    p.displayName = a + "Provider";
    function u(h, x) {
      const N = x?.[e]?.[d] || l, S = m.useContext(N);
      if (S) return S;
      if (c !== void 0) return c;
      throw new Error(`\`${h}\` must be used within \`${a}\``);
    }
    return [p, u];
  }
  const s = () => {
    const a = n.map((c) => m.createContext(c));
    return function(l) {
      const d = l?.[e] || a;
      return m.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: d } }),
        [l, d]
      );
    };
  };
  return s.scopeName = e, [o, Un(s, ...r)];
}
function Un(...e) {
  const r = e[0];
  if (e.length === 1) return r;
  const n = () => {
    const o = e.map((s) => ({
      useScope: s(),
      scopeName: s.scopeName
    }));
    return function(a) {
      const c = o.reduce((l, { useScope: d, scopeName: p }) => {
        const h = d(a)[`__scope${p}`];
        return { ...l, ...h };
      }, {});
      return m.useMemo(() => ({ [`__scope${r.scopeName}`]: c }), [c]);
    };
  };
  return n.scopeName = r.scopeName, n;
}
var Pr = globalThis?.document ? m.useLayoutEffect : () => {
}, Yn = m[" useInsertionEffect ".trim().toString()] || Pr;
function Hn({
  prop: e,
  defaultProp: r,
  onChange: n = () => {
  },
  caller: o
}) {
  const [s, a, c] = Kn({
    defaultProp: r,
    onChange: n
  }), l = e !== void 0, d = l ? e : s;
  {
    const u = m.useRef(e !== void 0);
    m.useEffect(() => {
      const h = u.current;
      h !== l && console.warn(
        `${o} is changing from ${h ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = l;
    }, [l, o]);
  }
  const p = m.useCallback(
    (u) => {
      if (l) {
        const h = qn(u) ? u(e) : u;
        h !== e && c.current?.(h);
      } else
        a(u);
    },
    [l, e, a, c]
  );
  return [d, p];
}
function Kn({
  defaultProp: e,
  onChange: r
}) {
  const [n, o] = m.useState(e), s = m.useRef(n), a = m.useRef(r);
  return Yn(() => {
    a.current = r;
  }, [r]), m.useEffect(() => {
    s.current !== n && (a.current?.(n), s.current = n);
  }, [n, s]), [n, o, a];
}
function qn(e) {
  return typeof e == "function";
}
function Jn(e) {
  const r = m.useRef({ value: e, previous: e });
  return m.useMemo(() => (r.current.value !== e && (r.current.previous = r.current.value, r.current.value = e), r.current.previous), [e]);
}
function Xn(e) {
  const [r, n] = m.useState(void 0);
  return Pr(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((s) => {
        if (!Array.isArray(s) || !s.length)
          return;
        const a = s[0];
        let c, l;
        if ("borderBoxSize" in a) {
          const d = a.borderBoxSize, p = Array.isArray(d) ? d[0] : d;
          c = p.inlineSize, l = p.blockSize;
        } else
          c = e.offsetWidth, l = e.offsetHeight;
        n({ width: c, height: l });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), r;
}
// @__NO_SIDE_EFFECTS__
function Zn(e) {
  const r = /* @__PURE__ */ Qn(e), n = m.forwardRef((o, s) => {
    const { children: a, ...c } = o, l = m.Children.toArray(a), d = l.find(ro);
    if (d) {
      const p = d.props.children, u = l.map((h) => h === d ? m.Children.count(p) > 1 ? m.Children.only(null) : m.isValidElement(p) ? p.props.children : null : h);
      return /* @__PURE__ */ i.jsx(r, { ...c, ref: s, children: m.isValidElement(p) ? m.cloneElement(p, void 0, u) : null });
    }
    return /* @__PURE__ */ i.jsx(r, { ...c, ref: s, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Qn(e) {
  const r = m.forwardRef((n, o) => {
    const { children: s, ...a } = n;
    if (m.isValidElement(s)) {
      const c = no(s), l = to(a, s.props);
      return s.type !== m.Fragment && (l.ref = o ? Le(o, c) : c), m.cloneElement(s, l);
    }
    return m.Children.count(s) > 1 ? m.Children.only(null) : null;
  });
  return r.displayName = `${e}.SlotClone`, r;
}
var eo = Symbol("radix.slottable");
function ro(e) {
  return m.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === eo;
}
function to(e, r) {
  const n = { ...r };
  for (const o in r) {
    const s = e[o], a = r[o];
    /^on[A-Z]/.test(o) ? s && a ? n[o] = (...l) => {
      const d = a(...l);
      return s(...l), d;
    } : s && (n[o] = s) : o === "style" ? n[o] = { ...s, ...a } : o === "className" && (n[o] = [s, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function no(e) {
  let r = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = r && "isReactWarning" in r && r.isReactWarning;
  return n ? e.ref : (r = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = r && "isReactWarning" in r && r.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var oo = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Tr = oo.reduce((e, r) => {
  const n = /* @__PURE__ */ Zn(`Primitive.${r}`), o = m.forwardRef((s, a) => {
    const { asChild: c, ...l } = s, d = c ? n : r;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ i.jsx(d, { ...l, ref: a });
  });
  return o.displayName = `Primitive.${r}`, { ...e, [r]: o };
}, {}), Ne = "Switch", [so] = Gn(Ne), [ao, io] = so(Ne), Ar = m.forwardRef(
  (e, r) => {
    const {
      __scopeSwitch: n,
      name: o,
      checked: s,
      defaultChecked: a,
      required: c,
      disabled: l,
      value: d = "on",
      onCheckedChange: p,
      form: u,
      ...h
    } = e, [x, N] = m.useState(null), S = Sr(r, ($) => N($)), j = m.useRef(!1), w = x ? u || !!x.closest("form") : !0, [y, R] = Hn({
      prop: s,
      defaultProp: a ?? !1,
      onChange: p,
      caller: Ne
    });
    return /* @__PURE__ */ i.jsxs(ao, { scope: n, checked: y, disabled: l, children: [
      /* @__PURE__ */ i.jsx(
        Tr.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": c,
          "data-state": zr(y),
          "data-disabled": l ? "" : void 0,
          disabled: l,
          value: d,
          ...h,
          ref: S,
          onClick: Bn(e.onClick, ($) => {
            R((V) => !V), w && (j.current = $.isPropagationStopped(), j.current || $.stopPropagation());
          })
        }
      ),
      w && /* @__PURE__ */ i.jsx(
        Fr,
        {
          control: x,
          bubbles: !j.current,
          name: o,
          value: d,
          checked: y,
          required: c,
          disabled: l,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Ar.displayName = Ne;
var Or = "SwitchThumb", Ir = m.forwardRef(
  (e, r) => {
    const { __scopeSwitch: n, ...o } = e, s = io(Or, n);
    return /* @__PURE__ */ i.jsx(
      Tr.span,
      {
        "data-state": zr(s.checked),
        "data-disabled": s.disabled ? "" : void 0,
        ...o,
        ref: r
      }
    );
  }
);
Ir.displayName = Or;
var lo = "SwitchBubbleInput", Fr = m.forwardRef(
  ({
    __scopeSwitch: e,
    control: r,
    checked: n,
    bubbles: o = !0,
    ...s
  }, a) => {
    const c = m.useRef(null), l = Sr(c, a), d = Jn(n), p = Xn(r);
    return m.useEffect(() => {
      const u = c.current;
      if (!u) return;
      const h = window.HTMLInputElement.prototype, N = Object.getOwnPropertyDescriptor(
        h,
        "checked"
      ).set;
      if (d !== n && N) {
        const S = new Event("click", { bubbles: o });
        N.call(u, n), u.dispatchEvent(S);
      }
    }, [d, n, o]), /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...s,
        tabIndex: -1,
        ref: l,
        style: {
          ...s.style,
          ...p,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Fr.displayName = lo;
function zr(e) {
  return e ? "checked" : "unchecked";
}
var co = Ar, uo = Ir;
const fo = m.forwardRef(
  ({
    status: e = !1,
    disabled: r = !1,
    onChange: n,
    className: o,
    ...s
  }, a) => /* @__PURE__ */ i.jsx(
    co,
    {
      ref: a,
      checked: e,
      onCheckedChange: n,
      disabled: r,
      className: _(
        "relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00995a] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e ? "bg-[#00995a]" : "bg-[#e0e0e0]",
        o
      ),
      ...s,
      children: /* @__PURE__ */ i.jsx(
        uo,
        {
          className: _(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out",
            e ? "translate-x-5" : "translate-x-0"
          )
        }
      )
    }
  )
);
fo.displayName = "Switcher";
const po = m.forwardRef(
  ({
    type: e = "light",
    text: r,
    icon: n,
    onClose: o,
    className: s,
    ...a
  }, c) => {
    const d = {
      light: {
        container: "bg-[#ecebf0]",
        text: "text-[#575385]",
        iconColor: "text-[#312e4d]",
        closeColor: "text-[#312e4d]"
      },
      dark: {
        container: "bg-[#3f3c5e]",
        text: "text-white",
        iconColor: "text-white",
        closeColor: "text-white"
      }
    }[e], p = /* @__PURE__ */ i.jsx(
      Zt,
      {
        size: 16,
        className: d.iconColor
      }
    );
    return /* @__PURE__ */ i.jsxs(
      "div",
      {
        ref: c,
        className: _(
          "flex items-center gap-3 p-3 rounded",
          d.container,
          s
        ),
        role: "status",
        "aria-live": "polite",
        ...a,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0", children: n || p }),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: _(
                  "text-base leading-5 whitespace-nowrap",
                  d.text
                ),
                children: r
              }
            )
          ] }),
          o && /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              onClick: o,
              className: _(
                "flex-shrink-0 opacity-99 hover:opacity-100 transition-opacity",
                d.closeColor
              ),
              "aria-label": "Cerrar notificación",
              children: /* @__PURE__ */ i.jsx(un, { size: 12 })
            }
          )
        ]
      }
    );
  }
);
po.displayName = "Toasts";
export {
  Ut as ActionCard,
  fn as BannerAlerts,
  kn as BrandIcons,
  jn as Button,
  Rn as CardsGrid,
  Nn as FeatureCard,
  On as KPICard,
  Tn as KPICardCustom,
  _r as KPIComparison,
  Sn as KPIComparisonCustom,
  te as LOGO_ASSETS,
  In as Loader,
  Fn as OptionCard,
  Dn as OrderCard,
  zn as OrderCardCustom,
  ho as PaginationLib,
  fo as Switcher,
  po as Toasts,
  pr as buttonVariants
};
//# sourceMappingURL=chiper-components-library.js.map
