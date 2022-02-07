!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : 'object' == typeof exports
    ? (exports['@clean-js/presenter'] = e())
    : (t['@clean-js/presenter'] = e());
})(this, function () {
  return (() => {
    var t = {
        646: function (t) {
          t.exports = (() => {
            'use strict';
            var t = {
                d: (e, n) => {
                  for (var r in n)
                    t.o(n, r) &&
                      !t.o(e, r) &&
                      Object.defineProperty(e, r, {
                        enumerable: !0,
                        get: n[r],
                      });
                },
                o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
                r: (t) => {
                  'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                      value: 'Module',
                    }),
                    Object.defineProperty(t, '__esModule', { value: !0 });
                },
              },
              e = {};
            t.r(e),
              t.d(e, {
                container: () => f,
                inject: () => r,
                injectable: () => i,
                singleton: () => u,
              });
            const n = Symbol('InjectToken'),
              r = (t) => (e, r, o) => {
                const i = Reflect.getOwnMetadata(n, e) || {};
                (i[o] = { token: t }), Reflect.defineMetadata(n, i, e);
              },
              o = new Map(),
              i = () => (t) => {
                const e = Reflect.getMetadata('design:paramtypes', t) || [];
                o.set(t, e);
              },
              s = new Map(),
              c = new Map(),
              u = () => (t) => {
                i()(t), s.set(t, !0);
              };
            class a {
              constructor() {
                (this.__debug = !1), (this.__RegisterMap = new Map());
              }
              static singleton() {
                return a._instance || (a._instance = new a()), a._instance;
              }
              resolve(t) {
                this.__debug &&
                  (s.forEach((t, e) => {
                    console.log('------singletonMarks'),
                      console.log(`${e} = ${t}`),
                      console.log('------singletonMarks');
                  }),
                  c.forEach((t, e) => {
                    console.log('------singletonMap'),
                      console.log(`${e} = ${t}`),
                      console.log('------singletonMap');
                  }),
                  o.forEach((t, e) => {
                    console.log('------paramTypesMap'),
                      console.log(`${e} = ${t}`),
                      console.log('------paramTypesMap');
                  }),
                  this.__RegisterMap.forEach((t, e) => {
                    console.log('------__RegisterMap'),
                      console.log(`${e} = ${t}`),
                      console.log('------__RegisterMap');
                  }));
                const e = s.get(t);
                if (e) {
                  const e = c.get(t);
                  if (e) return e;
                }
                const r = o.get(t);
                if (Array.isArray(r) && r.length) {
                  const o = Reflect.getMetadata(n, t);
                  o &&
                    (this.__debug && console.log(o, r, 'injectTokens'),
                    Object.keys(o).forEach((t) => {
                      const { token: e } = o[t];
                      r[+t] = this.__RegisterMap.get(e);
                    }));
                  const i = new t(...r.map((t) => this.resolve(t)));
                  return e && c.set(t, i), i;
                }
                const i = new t();
                return e && c.set(t, i), i;
              }
              register(t, e) {
                e.useClass && this.__RegisterMap.set(t, e.useClass);
              }
              debug(t) {
                'lujs' === t && (this.__debug = !0);
              }
            }
            const f = a.singleton();
            return e;
          })();
        },
        451: (t) => {
          'use strict';
          var e = Object.prototype.hasOwnProperty,
            n = '~';
          function r() {}
          function o(t, e, n) {
            (this.fn = t), (this.context = e), (this.once = n || !1);
          }
          function i(t, e, r, i, s) {
            if ('function' != typeof r)
              throw new TypeError('The listener must be a function');
            var c = new o(r, i || t, s),
              u = n ? n + e : e;
            return (
              t._events[u]
                ? t._events[u].fn
                  ? (t._events[u] = [t._events[u], c])
                  : t._events[u].push(c)
                : ((t._events[u] = c), t._eventsCount++),
              t
            );
          }
          function s(t, e) {
            0 == --t._eventsCount ? (t._events = new r()) : delete t._events[e];
          }
          function c() {
            (this._events = new r()), (this._eventsCount = 0);
          }
          Object.create &&
            ((r.prototype = Object.create(null)),
            new r().__proto__ || (n = !1)),
            (c.prototype.eventNames = function () {
              var t,
                r,
                o = [];
              if (0 === this._eventsCount) return o;
              for (r in (t = this._events))
                e.call(t, r) && o.push(n ? r.slice(1) : r);
              return Object.getOwnPropertySymbols
                ? o.concat(Object.getOwnPropertySymbols(t))
                : o;
            }),
            (c.prototype.listeners = function (t) {
              var e = n ? n + t : t,
                r = this._events[e];
              if (!r) return [];
              if (r.fn) return [r.fn];
              for (var o = 0, i = r.length, s = new Array(i); o < i; o++)
                s[o] = r[o].fn;
              return s;
            }),
            (c.prototype.listenerCount = function (t) {
              var e = n ? n + t : t,
                r = this._events[e];
              return r ? (r.fn ? 1 : r.length) : 0;
            }),
            (c.prototype.emit = function (t, e, r, o, i, s) {
              var c = n ? n + t : t;
              if (!this._events[c]) return !1;
              var u,
                a,
                f = this._events[c],
                l = arguments.length;
              if (f.fn) {
                switch (
                  (f.once && this.removeListener(t, f.fn, void 0, !0), l)
                ) {
                  case 1:
                    return f.fn.call(f.context), !0;
                  case 2:
                    return f.fn.call(f.context, e), !0;
                  case 3:
                    return f.fn.call(f.context, e, r), !0;
                  case 4:
                    return f.fn.call(f.context, e, r, o), !0;
                  case 5:
                    return f.fn.call(f.context, e, r, o, i), !0;
                  case 6:
                    return f.fn.call(f.context, e, r, o, i, s), !0;
                }
                for (a = 1, u = new Array(l - 1); a < l; a++)
                  u[a - 1] = arguments[a];
                f.fn.apply(f.context, u);
              } else {
                var p,
                  h = f.length;
                for (a = 0; a < h; a++)
                  switch (
                    (f[a].once && this.removeListener(t, f[a].fn, void 0, !0),
                    l)
                  ) {
                    case 1:
                      f[a].fn.call(f[a].context);
                      break;
                    case 2:
                      f[a].fn.call(f[a].context, e);
                      break;
                    case 3:
                      f[a].fn.call(f[a].context, e, r);
                      break;
                    case 4:
                      f[a].fn.call(f[a].context, e, r, o);
                      break;
                    default:
                      if (!u)
                        for (p = 1, u = new Array(l - 1); p < l; p++)
                          u[p - 1] = arguments[p];
                      f[a].fn.apply(f[a].context, u);
                  }
              }
              return !0;
            }),
            (c.prototype.on = function (t, e, n) {
              return i(this, t, e, n, !1);
            }),
            (c.prototype.once = function (t, e, n) {
              return i(this, t, e, n, !0);
            }),
            (c.prototype.removeListener = function (t, e, r, o) {
              var i = n ? n + t : t;
              if (!this._events[i]) return this;
              if (!e) return s(this, i), this;
              var c = this._events[i];
              if (c.fn)
                c.fn !== e ||
                  (o && !c.once) ||
                  (r && c.context !== r) ||
                  s(this, i);
              else {
                for (var u = 0, a = [], f = c.length; u < f; u++)
                  (c[u].fn !== e ||
                    (o && !c[u].once) ||
                    (r && c[u].context !== r)) &&
                    a.push(c[u]);
                a.length
                  ? (this._events[i] = 1 === a.length ? a[0] : a)
                  : s(this, i);
              }
              return this;
            }),
            (c.prototype.removeAllListeners = function (t) {
              var e;
              return (
                t
                  ? ((e = n ? n + t : t), this._events[e] && s(this, e))
                  : ((this._events = new r()), (this._eventsCount = 0)),
                this
              );
            }),
            (c.prototype.off = c.prototype.removeListener),
            (c.prototype.addListener = c.prototype.on),
            (c.prefixed = n),
            (c.EventEmitter = c),
            (t.exports = c);
        },
      },
      e = {};
    function n(r) {
      var o = e[r];
      if (void 0 !== o) return o.exports;
      var i = (e[r] = { exports: {} });
      return t[r].call(i.exports, i, i.exports, n), i.exports;
    }
    (n.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return n.d(e, { a: e }), e;
    }),
      (n.d = (t, e) => {
        for (var r in e)
          n.o(e, r) &&
            !n.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
      }),
      (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (n.r = (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      });
    var r = {};
    return (
      (() => {
        'use strict';
        n.r(r),
          n.d(r, {
            Presenter: () => st,
            PresenterFactor: () => ut,
            container: () => ct.container,
            entry: () => rt,
            inject: () => ct.inject,
            injectable: () => ct.injectable,
            singleton: () => ct.singleton,
          });
        var t = n(451),
          e = n.n(t);
        function o(t) {
          for (
            var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1;
            r < e;
            r++
          )
            n[r - 1] = arguments[r];
          throw Error(
            '[Immer] minified error nr: ' +
              t +
              (n.length
                ? ' ' +
                  n
                    .map(function (t) {
                      return "'" + t + "'";
                    })
                    .join(',')
                : '') +
              '. Find the full error at: https://bit.ly/3cXEKWf',
          );
        }
        function i(t) {
          return !!t && !!t[J];
        }
        function s(t) {
          return (
            !!t &&
            ((function (t) {
              if (!t || 'object' != typeof t) return !1;
              var e = Object.getPrototypeOf(t);
              if (null === e) return !0;
              var n =
                Object.hasOwnProperty.call(e, 'constructor') && e.constructor;
              return (
                n === Object ||
                ('function' == typeof n && Function.toString.call(n) === q)
              );
            })(t) ||
              Array.isArray(t) ||
              !!t[X] ||
              !!t.constructor[X] ||
              h(t) ||
              v(t))
          );
        }
        function c(t, e, n) {
          void 0 === n && (n = !1),
            0 === u(t)
              ? (n ? Object.keys : B)(t).forEach(function (r) {
                  (n && 'symbol' == typeof r) || e(r, t[r], t);
                })
              : t.forEach(function (n, r) {
                  return e(r, n, t);
                });
        }
        function u(t) {
          var e = t[J];
          return e
            ? e.i > 3
              ? e.i - 4
              : e.i
            : Array.isArray(t)
            ? 1
            : h(t)
            ? 2
            : v(t)
            ? 3
            : 0;
        }
        function a(t, e) {
          return 2 === u(t)
            ? t.has(e)
            : Object.prototype.hasOwnProperty.call(t, e);
        }
        function f(t, e) {
          return 2 === u(t) ? t.get(e) : t[e];
        }
        function l(t, e, n) {
          var r = u(t);
          2 === r
            ? t.set(e, n)
            : 3 === r
            ? (t.delete(e), t.add(n))
            : (t[e] = n);
        }
        function p(t, e) {
          return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
        }
        function h(t) {
          return N && t instanceof Map;
        }
        function v(t) {
          return U && t instanceof Set;
        }
        function y(t) {
          return t.o || t.t;
        }
        function d(t) {
          if (Array.isArray(t)) return Array.prototype.slice.call(t);
          var e = G(t);
          delete e[J];
          for (var n = B(e), r = 0; r < n.length; r++) {
            var o = n[r],
              i = e[o];
            !1 === i.writable && ((i.writable = !0), (i.configurable = !0)),
              (i.get || i.set) &&
                (e[o] = {
                  configurable: !0,
                  writable: !0,
                  enumerable: i.enumerable,
                  value: t[o],
                });
          }
          return Object.create(Object.getPrototypeOf(t), e);
        }
        function b(t, e) {
          return (
            void 0 === e && (e = !1),
            _(t) ||
              i(t) ||
              !s(t) ||
              (u(t) > 1 && (t.set = t.add = t.clear = t.delete = g),
              Object.freeze(t),
              e &&
                c(
                  t,
                  function (t, e) {
                    return b(e, !0);
                  },
                  !0,
                )),
            t
          );
        }
        function g() {
          o(2);
        }
        function _(t) {
          return null == t || 'object' != typeof t || Object.isFrozen(t);
        }
        function m(t) {
          var e = H[t];
          return e || o(18, t), e;
        }
        function w() {
          return z;
        }
        function O(t, e) {
          e && (m('Patches'), (t.u = []), (t.s = []), (t.v = e));
        }
        function P(t) {
          j(t), t.p.forEach(x), (t.p = null);
        }
        function j(t) {
          t === z && (z = t.l);
        }
        function S(t) {
          return (z = { p: [], l: z, h: t, m: !0, _: 0 });
        }
        function x(t) {
          var e = t[J];
          0 === e.i || 1 === e.i ? e.j() : (e.O = !0);
        }
        function A(t, e) {
          e._ = e.p.length;
          var n = e.p[0],
            r = void 0 !== t && t !== n;
          return (
            e.h.g || m('ES5').S(e, t, r),
            r
              ? (n[J].P && (P(e), o(4)),
                s(t) && ((t = M(e, t)), e.l || E(e, t)),
                e.u && m('Patches').M(n[J], t, e.u, e.s))
              : (t = M(e, n, [])),
            P(e),
            e.u && e.v(e.u, e.s),
            t !== V ? t : void 0
          );
        }
        function M(t, e, n) {
          if (_(e)) return e;
          var r = e[J];
          if (!r)
            return (
              c(
                e,
                function (o, i) {
                  return D(t, r, e, o, i, n);
                },
                !0,
              ),
              e
            );
          if (r.A !== t) return e;
          if (!r.P) return E(t, r.t, !0), r.t;
          if (!r.I) {
            (r.I = !0), r.A._--;
            var o = 4 === r.i || 5 === r.i ? (r.o = d(r.k)) : r.o;
            c(3 === r.i ? new Set(o) : o, function (e, i) {
              return D(t, r, o, e, i, n);
            }),
              E(t, o, !1),
              n && t.u && m('Patches').R(r, n, t.u, t.s);
          }
          return r.o;
        }
        function D(t, e, n, r, o, c) {
          if (i(o)) {
            var u = M(
              t,
              o,
              c && e && 3 !== e.i && !a(e.D, r) ? c.concat(r) : void 0,
            );
            if ((l(n, r, u), !i(u))) return;
            t.m = !1;
          }
          if (s(o) && !_(o)) {
            if (!t.h.F && t._ < 1) return;
            M(t, o), (e && e.A.l) || E(t, o);
          }
        }
        function E(t, e, n) {
          void 0 === n && (n = !1), t.h.F && t.m && b(e, n);
        }
        function k(t, e) {
          var n = t[J];
          return (n ? y(n) : t)[e];
        }
        function R(t, e) {
          if (e in t)
            for (var n = Object.getPrototypeOf(t); n; ) {
              var r = Object.getOwnPropertyDescriptor(n, e);
              if (r) return r;
              n = Object.getPrototypeOf(n);
            }
        }
        function T(t) {
          t.P || ((t.P = !0), t.l && T(t.l));
        }
        function F(t) {
          t.o || (t.o = d(t.t));
        }
        function $(t, e, n) {
          var r = h(e)
            ? m('MapSet').N(e, n)
            : v(e)
            ? m('MapSet').T(e, n)
            : t.g
            ? (function (t, e) {
                var n = Array.isArray(t),
                  r = {
                    i: n ? 1 : 0,
                    A: e ? e.A : w(),
                    P: !1,
                    I: !1,
                    D: {},
                    l: e,
                    t,
                    k: null,
                    o: null,
                    j: null,
                    C: !1,
                  },
                  o = r,
                  i = Q;
                n && ((o = [r]), (i = Y));
                var s = Proxy.revocable(o, i),
                  c = s.revoke,
                  u = s.proxy;
                return (r.k = u), (r.j = c), u;
              })(e, n)
            : m('ES5').J(e, n);
          return (n ? n.A : w()).p.push(r), r;
        }
        function C(t) {
          return (
            i(t) || o(22, t),
            (function t(e) {
              if (!s(e)) return e;
              var n,
                r = e[J],
                o = u(e);
              if (r) {
                if (!r.P && (r.i < 4 || !m('ES5').K(r))) return r.t;
                (r.I = !0), (n = L(e, o)), (r.I = !1);
              } else n = L(e, o);
              return (
                c(n, function (e, o) {
                  (r && f(r.t, e) === o) || l(n, e, t(o));
                }),
                3 === o ? new Set(n) : n
              );
            })(t)
          );
        }
        function L(t, e) {
          switch (e) {
            case 2:
              return new Map(t);
            case 3:
              return Array.from(t);
          }
          return d(t);
        }
        var I,
          z,
          K = 'undefined' != typeof Symbol && 'symbol' == typeof Symbol('x'),
          N = 'undefined' != typeof Map,
          U = 'undefined' != typeof Set,
          W =
            'undefined' != typeof Proxy &&
            void 0 !== Proxy.revocable &&
            'undefined' != typeof Reflect,
          V = K
            ? Symbol.for('immer-nothing')
            : (((I = {})['immer-nothing'] = !0), I),
          X = K ? Symbol.for('immer-draftable') : '__$immer_draftable',
          J = K ? Symbol.for('immer-state') : '__$immer_state',
          q =
            ('undefined' != typeof Symbol && Symbol.iterator,
            '' + Object.prototype.constructor),
          B =
            'undefined' != typeof Reflect && Reflect.ownKeys
              ? Reflect.ownKeys
              : void 0 !== Object.getOwnPropertySymbols
              ? function (t) {
                  return Object.getOwnPropertyNames(t).concat(
                    Object.getOwnPropertySymbols(t),
                  );
                }
              : Object.getOwnPropertyNames,
          G =
            Object.getOwnPropertyDescriptors ||
            function (t) {
              var e = {};
              return (
                B(t).forEach(function (n) {
                  e[n] = Object.getOwnPropertyDescriptor(t, n);
                }),
                e
              );
            },
          H = {},
          Q = {
            get: function (t, e) {
              if (e === J) return t;
              var n = y(t);
              if (!a(n, e))
                return (function (t, e, n) {
                  var r,
                    o = R(e, n);
                  return o
                    ? 'value' in o
                      ? o.value
                      : null === (r = o.get) || void 0 === r
                      ? void 0
                      : r.call(t.k)
                    : void 0;
                })(t, n, e);
              var r = n[e];
              return t.I || !s(r)
                ? r
                : r === k(t.t, e)
                ? (F(t), (t.o[e] = $(t.A.h, r, t)))
                : r;
            },
            has: function (t, e) {
              return e in y(t);
            },
            ownKeys: function (t) {
              return Reflect.ownKeys(y(t));
            },
            set: function (t, e, n) {
              var r = R(y(t), e);
              if (null == r ? void 0 : r.set) return r.set.call(t.k, n), !0;
              if (!t.P) {
                var o = k(y(t), e),
                  i = null == o ? void 0 : o[J];
                if (i && i.t === n) return (t.o[e] = n), (t.D[e] = !1), !0;
                if (p(n, o) && (void 0 !== n || a(t.t, e))) return !0;
                F(t), T(t);
              }
              return (
                (t.o[e] === n &&
                  'number' != typeof n &&
                  (void 0 !== n || e in t.o)) ||
                ((t.o[e] = n), (t.D[e] = !0), !0)
              );
            },
            deleteProperty: function (t, e) {
              return (
                void 0 !== k(t.t, e) || e in t.t
                  ? ((t.D[e] = !1), F(t), T(t))
                  : delete t.D[e],
                t.o && delete t.o[e],
                !0
              );
            },
            getOwnPropertyDescriptor: function (t, e) {
              var n = y(t),
                r = Reflect.getOwnPropertyDescriptor(n, e);
              return r
                ? {
                    writable: !0,
                    configurable: 1 !== t.i || 'length' !== e,
                    enumerable: r.enumerable,
                    value: n[e],
                  }
                : r;
            },
            defineProperty: function () {
              o(11);
            },
            getPrototypeOf: function (t) {
              return Object.getPrototypeOf(t.t);
            },
            setPrototypeOf: function () {
              o(12);
            },
          },
          Y = {};
        c(Q, function (t, e) {
          Y[t] = function () {
            return (arguments[0] = arguments[0][0]), e.apply(this, arguments);
          };
        }),
          (Y.deleteProperty = function (t, e) {
            return Q.deleteProperty.call(this, t[0], e);
          }),
          (Y.set = function (t, e, n) {
            return Q.set.call(this, t[0], e, n, t[0]);
          });
        var Z = (function () {
            function t(t) {
              var e = this;
              (this.g = W),
                (this.F = !0),
                (this.produce = function (t, n, r) {
                  if ('function' == typeof t && 'function' != typeof n) {
                    var i = n;
                    n = t;
                    var c = e;
                    return function (t) {
                      var e = this;
                      void 0 === t && (t = i);
                      for (
                        var r = arguments.length,
                          o = Array(r > 1 ? r - 1 : 0),
                          s = 1;
                        s < r;
                        s++
                      )
                        o[s - 1] = arguments[s];
                      return c.produce(t, function (t) {
                        var r;
                        return (r = n).call.apply(r, [e, t].concat(o));
                      });
                    };
                  }
                  var u;
                  if (
                    ('function' != typeof n && o(6),
                    void 0 !== r && 'function' != typeof r && o(7),
                    s(t))
                  ) {
                    var a = S(e),
                      f = $(e, t, void 0),
                      l = !0;
                    try {
                      (u = n(f)), (l = !1);
                    } finally {
                      l ? P(a) : j(a);
                    }
                    return 'undefined' != typeof Promise && u instanceof Promise
                      ? u.then(
                          function (t) {
                            return O(a, r), A(t, a);
                          },
                          function (t) {
                            throw (P(a), t);
                          },
                        )
                      : (O(a, r), A(u, a));
                  }
                  if (!t || 'object' != typeof t) {
                    if ((u = n(t)) === V) return;
                    return void 0 === u && (u = t), e.F && b(u, !0), u;
                  }
                  o(21, t);
                }),
                (this.produceWithPatches = function (t, n) {
                  return 'function' == typeof t
                    ? function (n) {
                        for (
                          var r = arguments.length,
                            o = Array(r > 1 ? r - 1 : 0),
                            i = 1;
                          i < r;
                          i++
                        )
                          o[i - 1] = arguments[i];
                        return e.produceWithPatches(n, function (e) {
                          return t.apply(void 0, [e].concat(o));
                        });
                      }
                    : [
                        e.produce(t, n, function (t, e) {
                          (r = t), (o = e);
                        }),
                        r,
                        o,
                      ];
                  var r, o;
                }),
                'boolean' == typeof (null == t ? void 0 : t.useProxies) &&
                  this.setUseProxies(t.useProxies),
                'boolean' == typeof (null == t ? void 0 : t.autoFreeze) &&
                  this.setAutoFreeze(t.autoFreeze);
            }
            var e = t.prototype;
            return (
              (e.createDraft = function (t) {
                s(t) || o(8), i(t) && (t = C(t));
                var e = S(this),
                  n = $(this, t, void 0);
                return (n[J].C = !0), j(e), n;
              }),
              (e.finishDraft = function (t, e) {
                var n = (t && t[J]).A;
                return O(n, e), A(void 0, n);
              }),
              (e.setAutoFreeze = function (t) {
                this.F = t;
              }),
              (e.setUseProxies = function (t) {
                t && !W && o(20), (this.g = t);
              }),
              (e.applyPatches = function (t, e) {
                var n;
                for (n = e.length - 1; n >= 0; n--) {
                  var r = e[n];
                  if (0 === r.path.length && 'replace' === r.op) {
                    t = r.value;
                    break;
                  }
                }
                n > -1 && (e = e.slice(n + 1));
                var o = m('Patches').$;
                return i(t)
                  ? o(t, e)
                  : this.produce(t, function (t) {
                      return o(t, e);
                    });
              }),
              t
            );
          })(),
          tt = new Z(),
          et = tt.produce;
        tt.produceWithPatches.bind(tt),
          tt.setAutoFreeze.bind(tt),
          tt.setUseProxies.bind(tt),
          tt.applyPatches.bind(tt),
          tt.createDraft.bind(tt),
          tt.finishDraft.bind(tt);
        const nt = et;
        const rt = new (class {
          constructor() {
            this.useDevTool = !1;
          }
          init({ useDevTool: t }) {
            (this.useDevTool = t), ot.connect();
          }
        })();
        const ot = new (class {
            constructor() {
              (this.name = '@clean-js/presenter'),
                (this.store = {}),
                (this.instance = null);
            }
            connect() {
              var t;
              const e =
                null === (t = window) || void 0 === t
                  ? void 0
                  : t.__REDUX_DEVTOOLS_EXTENSION__;
              e
                ? rt.useDevTool &&
                  (this.instance = e.connect({ name: this.name }))
                : console.warn('place install redux devtool');
            }
            init(t, e) {
              null !== this.instance &&
                ((this.store[e] = t),
                this.instance.send(
                  {
                    type: `[${e}]:initState`,
                    updatedAt: new Date().toLocaleString(),
                  },
                  this.store,
                ));
            }
            send(t, e) {
              null !== this.instance &&
                ((this.store[e] = t),
                this.instance.send(
                  {
                    type: `[${e}]:setState`,
                    updatedAt: new Date().toLocaleString(),
                  },
                  this.store,
                ));
            }
            remove(t) {
              null !== this.instance &&
                (delete this.store[t],
                this.instance.send(
                  {
                    type: `[${t}]:removeModel`,
                    updatedAt: new Date().toLocaleString(),
                  },
                  this.store,
                ));
            }
          })(),
          it = 'modelChange';
        class st {
          constructor() {
            this.__emitter = new (e())();
          }
          get state() {
            if (void 0 === this._state) throw Error('place defined state');
            return this._state;
          }
          set state(t) {
            if (void 0 !== this._state) throw Error('please use setState');
            this._state = b(t, !0);
          }
          setState(t) {
            let e;
            (e = 'function' == typeof t ? nt(this._state, t) : b(t, !0)),
              (this._state = e),
              ot.send(this._state, this.constructor.name),
              this.__emitter.emit(it, this._state);
          }
          subscribe(t) {
            return (
              this.__emitter.on(it, t),
              {
                unsubscribe: () => {
                  this.__emitter.off(it, t);
                },
              }
            );
          }
          updateView() {
            throw Error('Please use adapter to bind view');
          }
          __init() {
            ot.init(this.state, this.constructor.name);
          }
          __destroy() {
            ot.remove(this.constructor.name);
          }
          __useAutoUpdate() {
            const { unsubscribe: t } = this.subscribe(() => {
              this.updateView();
            });
            return { unsubscribe: t };
          }
        }
        var ct = n(646);
        class ut {
          static get(t) {
            return ct.container.resolve(t);
          }
        }
      })(),
      r
    );
  })();
});
