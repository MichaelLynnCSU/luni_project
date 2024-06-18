"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _puppeteer = _interopRequireDefault(require("puppeteer"));
var _referResumeAndAnswer = _interopRequireDefault(require("./referResumeAndAnswer.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var fillWorkableForm = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(link, resumeData, data) {
    var browser, page, formButton, cookieButton, firstName, lastName, email, phone, _iterator, _step, exp, addButton, title, company, summary, saveButton, _iterator2, _step2, ed, _addButton, school, fieldOfStudy, degree, resumeInput, sections, fields, questions, _iterator3, _step3, field, questionElem, q, textarea, yesno, radio, optionsArray, options, _iterator5, _step5, option, text, i, response, _iterator4, _step4, _field, _textarea, _yesno, _radio, _optionsArray, _iterator6, _step6, _option, _text, submitButton, clicked;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _puppeteer["default"].launch({
            headless: false
          });
        case 2:
          browser = _context.sent;
          _context.next = 5;
          return browser.newPage();
        case 5:
          page = _context.sent;
          _context.prev = 6;
          _context.next = 9;
          return page["goto"]("https://jobs.workable.com".concat(link));
        case 9:
          _context.next = 11;
          return page.$("[data-ui='overview-apply-now']");
        case 11:
          formButton = _context.sent;
          _context.next = 14;
          return formButton.click();
        case 14:
          _context.next = 16;
          return new Promise(function (r) {
            return setTimeout(r, 2000);
          });
        case 16:
          _context.next = 18;
          return page.waitForSelector("[data-ui='cookie-consent-accept']");
        case 18:
          cookieButton = _context.sent;
          _context.next = 21;
          return cookieButton.click();
        case 21:
          _context.next = 23;
          return page.$("[data-ui='firstname']");
        case 23:
          firstName = _context.sent;
          _context.next = 26;
          return page.$("[data-ui='lastname']");
        case 26:
          lastName = _context.sent;
          _context.next = 29;
          return page.$("[data-ui='email']");
        case 29:
          email = _context.sent;
          _context.next = 32;
          return firstName.type(data.firstName);
        case 32:
          _context.next = 34;
          return lastName.type(data.lastName);
        case 34:
          _context.next = 36;
          return email.type(data.email);
        case 36:
          _context.prev = 36;
          _context.next = 39;
          return page.waitForSelector("[name='phone']", {
            timeout: 3000
          });
        case 39:
          phone = _context.sent;
          _context.next = 42;
          return page.$("[name='phone']");
        case 42:
          phone = _context.sent;
          _context.next = 45;
          return phone.type("+971");
        case 45:
          _context.next = 47;
          return phone.type("");
        case 47:
          _context.next = 49;
          return phone.type(data.phone);
        case 49:
          _context.next = 53;
          break;
        case 51:
          _context.prev = 51;
          _context.t0 = _context["catch"](36);
        case 53:
          _iterator = _createForOfIteratorHelper(data.experience);
          _context.prev = 54;
          _iterator.s();
        case 56:
          if ((_step = _iterator.n()).done) {
            _context.next = 96;
            break;
          }
          exp = _step.value;
          _context.prev = 58;
          _context.next = 61;
          return page.waitForSelector("[aria-label='Add Experience']", {
            timeout: 3000
          });
        case 61:
          addButton = _context.sent;
          _context.next = 64;
          return page.$("[aria-label='Add Experience']");
        case 64:
          addButton = _context.sent;
          _context.next = 67;
          return addButton.click();
        case 67:
          _context.next = 69;
          return page.$("[name='title']");
        case 69:
          title = _context.sent;
          _context.next = 72;
          return page.$("[name='company']");
        case 72:
          company = _context.sent;
          _context.next = 75;
          return page.$("[name='summary']");
        case 75:
          summary = _context.sent;
          _context.next = 78;
          return title.type(exp.title);
        case 78:
          _context.next = 80;
          return company.type(exp.company);
        case 80:
          _context.next = 82;
          return summary.type(exp.summary);
        case 82:
          _context.next = 84;
          return page.$("[data-ui='save-section']");
        case 84:
          saveButton = _context.sent;
          _context.next = 87;
          return saveButton.click();
        case 87:
          _context.next = 89;
          return new Promise(function (r) {
            return setTimeout(r, 500);
          });
        case 89:
          _context.next = 94;
          break;
        case 91:
          _context.prev = 91;
          _context.t1 = _context["catch"](58);
          return _context.abrupt("break", 96);
        case 94:
          _context.next = 56;
          break;
        case 96:
          _context.next = 101;
          break;
        case 98:
          _context.prev = 98;
          _context.t2 = _context["catch"](54);
          _iterator.e(_context.t2);
        case 101:
          _context.prev = 101;
          _iterator.f();
          return _context.finish(101);
        case 104:
          _iterator2 = _createForOfIteratorHelper(data.education);
          _context.prev = 105;
          _iterator2.s();
        case 107:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 150;
            break;
          }
          ed = _step2.value;
          _context.prev = 109;
          _context.next = 112;
          return page.waitForSelector("[aria-label='Add Education']", {
            timeout: 3000
          });
        case 112:
          _addButton = _context.sent;
          _context.next = 115;
          return page.waitForSelector("[aria-label='Add Education']");
        case 115:
          _addButton = _context.sent;
          _context.next = 118;
          return _addButton.click();
        case 118:
          _context.next = 120;
          return page.waitForSelector("[name='school']");
        case 120:
          school = _context.sent;
          _context.next = 123;
          return page.waitForSelector("[name='field_of_study']");
        case 123:
          fieldOfStudy = _context.sent;
          _context.next = 126;
          return page.waitForSelector("[name='degree']");
        case 126:
          degree = _context.sent;
          _context.next = 129;
          return school.type(ed.school);
        case 129:
          _context.next = 131;
          return fieldOfStudy.type(ed.fieldOfStudy);
        case 131:
          _context.next = 133;
          return degree.type(ed.degree);
        case 133:
          _context.next = 135;
          return page.keyboard.press("Tab");
        case 135:
          _context.next = 137;
          return page.keyboard.press("Tab");
        case 137:
          _context.next = 139;
          return page.keyboard.press("Tab");
        case 139:
          _context.next = 141;
          return page.keyboard.press("Enter");
        case 141:
          _context.next = 143;
          return new Promise(function (r) {
            return setTimeout(r, 500);
          });
        case 143:
          _context.next = 148;
          break;
        case 145:
          _context.prev = 145;
          _context.t3 = _context["catch"](109);
          return _context.abrupt("break", 150);
        case 148:
          _context.next = 107;
          break;
        case 150:
          _context.next = 155;
          break;
        case 152:
          _context.prev = 152;
          _context.t4 = _context["catch"](105);
          _iterator2.e(_context.t4);
        case 155:
          _context.prev = 155;
          _iterator2.f();
          return _context.finish(155);
        case 158:
          _context.next = 160;
          return page.waitForSelector("[data-ui='resume']");
        case 160:
          resumeInput = _context.sent;
          _context.next = 163;
          return resumeInput.uploadFile("./Moamen_Resume.pdf");
        case 163:
          _context.next = 165;
          return page.$$("[data-ui='section']");
        case 165:
          sections = _context.sent;
          _context.next = 168;
          return sections[2].$$(".styles__field--3JEd1");
        case 168:
          fields = _context.sent;
          questions = []; // Array containing the specific questions
          // Get the specific questions from the form
          _iterator3 = _createForOfIteratorHelper(fields);
          _context.prev = 171;
          _iterator3.s();
        case 173:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 224;
            break;
          }
          field = _step3.value;
          _context.next = 177;
          return field.waitForSelector("strong.styles__strong--2kqW6");
        case 177:
          _context.next = 179;
          return _context.sent.getProperty("innerText");
        case 179:
          questionElem = _context.sent;
          q = questionElem.toString().replace("JSHandle:", "");
          if (!(q === "*")) {
            _context.next = 188;
            break;
          }
          _context.next = 184;
          return field.$$("strong.styles__strong--2kqW6");
        case 184:
          _context.next = 186;
          return _context.sent[1].getProperty("innerText");
        case 186:
          questionElem = _context.sent;
          q = questionElem.toString().replace("JSHandle:", "");
        case 188:
          _context.next = 190;
          return field.$("textarea");
        case 190:
          textarea = _context.sent;
          _context.next = 193;
          return field.$("[data-ui='option']");
        case 193:
          yesno = _context.sent;
          _context.next = 196;
          return field.$("input[type='radio']");
        case 196:
          radio = _context.sent;
          _context.next = 199;
          return field.$$("label span");
        case 199:
          optionsArray = _context.sent;
          options = [];
          if (!radio) {
            _context.next = 221;
            break;
          }
          _iterator5 = _createForOfIteratorHelper(optionsArray);
          _context.prev = 203;
          _iterator5.s();
        case 205:
          if ((_step5 = _iterator5.n()).done) {
            _context.next = 213;
            break;
          }
          option = _step5.value;
          _context.next = 209;
          return option.getProperty("innerText");
        case 209:
          text = _context.sent.toString().replace("JSHandle:", "");
          options.push(text);
        case 211:
          _context.next = 205;
          break;
        case 213:
          _context.next = 218;
          break;
        case 215:
          _context.prev = 215;
          _context.t5 = _context["catch"](203);
          _iterator5.e(_context.t5);
        case 218:
          _context.prev = 218;
          _iterator5.f();
          return _context.finish(218);
        case 221:
          questions.push({
            question: q,
            type: textarea ? "text" : yesno ? "yes/no" : radio ? "radio-button" : null,
            options: radio ? options : null
          });
        case 222:
          _context.next = 173;
          break;
        case 224:
          _context.next = 229;
          break;
        case 226:
          _context.prev = 226;
          _context.t6 = _context["catch"](171);
          _iterator3.e(_context.t6);
        case 229:
          _context.prev = 229;
          _iterator3.f();
          return _context.finish(229);
        case 232:
          i = 0;
          _context.next = 235;
          return (0, _referResumeAndAnswer["default"])(questions, resumeData);
        case 235:
          response = _context.sent;
          console.log(response);
          // Now answer each of the questions, one by one
          _iterator4 = _createForOfIteratorHelper(fields);
          _context.prev = 238;
          _iterator4.s();
        case 240:
          if ((_step4 = _iterator4.n()).done) {
            _context.next = 304;
            break;
          }
          _field = _step4.value;
          _context.next = 244;
          return _field.$("textarea");
        case 244:
          _textarea = _context.sent;
          _context.next = 247;
          return _field.$("[data-ui='option']");
        case 247:
          _yesno = _context.sent;
          _context.next = 250;
          return _field.$("input[type='radio']");
        case 250:
          _radio = _context.sent;
          if (!_textarea) {
            _context.next = 256;
            break;
          }
          _context.next = 254;
          return _textarea.type(response[i].answer);
        case 254:
          _context.next = 256;
          return page.keyboard.press("Tab");
        case 256:
          if (!_yesno) {
            _context.next = 272;
            break;
          }
          _context.next = 259;
          return page.keyboard.press("Space");
        case 259:
          if (!(response[i].answer === "yes" || response[i].answer === "YES")) {
            _context.next = 265;
            break;
          }
          console.log("clicking yes");
          _context.next = 263;
          return new Promise(function (r) {
            return setTimeout(r, 1000);
          });
        case 263:
          _context.next = 270;
          break;
        case 265:
          console.log("clicking no");
          _context.next = 268;
          return page.keyboard.press("ArrowRight");
        case 268:
          _context.next = 270;
          return new Promise(function (r) {
            return setTimeout(r, 1000);
          });
        case 270:
          _context.next = 272;
          return page.keyboard.press("Tab");
        case 272:
          if (!_radio) {
            _context.next = 301;
            break;
          }
          _context.next = 275;
          return _field.$$("label span");
        case 275:
          _optionsArray = _context.sent;
          _iterator6 = _createForOfIteratorHelper(_optionsArray);
          _context.prev = 277;
          _iterator6.s();
        case 279:
          if ((_step6 = _iterator6.n()).done) {
            _context.next = 291;
            break;
          }
          _option = _step6.value;
          _context.next = 283;
          return _option.getProperty("innerText");
        case 283:
          _text = _context.sent.toString().replace("JSHandle:", "");
          if (!(response[i].answer === _text)) {
            _context.next = 289;
            break;
          }
          _context.next = 287;
          return _option.click();
        case 287:
          _context.next = 289;
          return new Promise(function (r) {
            return setTimeout(r, 1000);
          });
        case 289:
          _context.next = 279;
          break;
        case 291:
          _context.next = 296;
          break;
        case 293:
          _context.prev = 293;
          _context.t7 = _context["catch"](277);
          _iterator6.e(_context.t7);
        case 296:
          _context.prev = 296;
          _iterator6.f();
          return _context.finish(296);
        case 299:
          _context.next = 301;
          return page.keyboard.press("Tab");
        case 301:
          i = i + 1;
        case 302:
          _context.next = 240;
          break;
        case 304:
          _context.next = 309;
          break;
        case 306:
          _context.prev = 306;
          _context.t8 = _context["catch"](238);
          _iterator4.e(_context.t8);
        case 309:
          _context.prev = 309;
          _iterator4.f();
          return _context.finish(309);
        case 312:
          _context.next = 314;
          return page.waitForSelector("[data-ui='application-form-submit']");
        case 314:
          submitButton = _context.sent;
          _context.next = 317;
          return submitButton.click();
        case 317:
          clicked = _context.sent;
          if (clicked) {
            console.log('Workable Submit button clicked successfully');
          } else {
            console.log('Workable submit button click failed');
          }
          _context.next = 321;
          return new Promise(function (r) {
            return setTimeout(r, 30000);
          });
        case 321:
          _context.next = 323;
          return browser.close();
        case 323:
          return _context.abrupt("return", "done");
        case 326:
          _context.prev = 326;
          _context.t9 = _context["catch"](6);
          console.log(_context.t9);
          return _context.abrupt("return", {
            error: JSON.stringify(_context.t9)
          });
        case 330:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 326], [36, 51], [54, 98, 101, 104], [58, 91], [105, 152, 155, 158], [109, 145], [171, 226, 229, 232], [203, 215, 218, 221], [238, 306, 309, 312], [277, 293, 296, 299]]);
  }));
  return function fillWorkableForm(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = fillWorkableForm;